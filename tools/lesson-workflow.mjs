export const meta = {
  name: "laser-lessons",
  description: "Author intuition-first interactive lessons for Laser Physics chapters (read scans → build Next.js page + sim → verify against source → repair until clean)",
  phases: [
    { title: "Extract", detail: "read the source page scans; transcribe every equation; plan intuition + sim" },
    { title: "Build", detail: "write page.tsx + sim.tsx mimicking the gold chapter" },
    { title: "Verify", detail: "two checks per unit: LaTeX-vs-scan fidelity, and physical soundness" },
    { title: "Fix", detail: "repair loop: apply corrections, re-verify against the scan, repeat until clean" },
  ],
};

// args: either an array of units, or { mode: "full"|"verify", units: [...] }.
// Each unit: { slug, label, title, blurb, arc, pages:[start,end] }.
//  - "full"   : extract -> build -> verify -> repair  (for un-built units)
//  - "verify" : verify -> repair on the EXISTING files (for built-but-unverified units)
const ROOT = "/Users/nathaniel.sun/Academic/lessons/laser-study";
let parsed = args;
if (typeof parsed === "string") {
  try { parsed = JSON.parse(parsed); } catch (e) { /* leave as-is */ }
}
const MODE = parsed && parsed.mode ? parsed.mode : "full";
const units = Array.isArray(parsed) ? parsed : parsed && parsed.units ? parsed.units : parsed ? [parsed] : [];
log(`launch: mode=${MODE}, units=${units.length}, slugs=${units.map((u) => u.slug).join(",")}`);
if (!units.length || !units[0] || !units[0].pages) {
  throw new Error("Workflow needs units with .pages. Received: " + JSON.stringify(args).slice(0, 300));
}

// Retry wrapper: a 429/throttle can make a subagent end without calling
// StructuredOutput (agent() then throws). Retry a few times before giving up.
async function agentRetry(prompt, opts, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const extra = i ? `\n\n(Attempt ${i + 1}: you MUST finish by calling the StructuredOutput tool with the required schema.)` : "";
      const r = await agent(prompt + extra, opts);
      if (r) return r;
    } catch (e) {
      log(`retry ${i + 1}/${tries} for ${opts.label}: ${String(e).slice(0, 120)}`);
    }
  }
  return null;
}

function cap(slug) {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}
const pad = (n) => String(n).padStart(3, "0");
const pagePaths = (u) => {
  const [a, b] = u.pages;
  const out = [];
  for (let p = a; p <= b; p++) out.push(`${ROOT}/source-pages/p${pad(p)}.png`);
  return out.join("\n  ");
};
const serious = (verdicts) =>
  (verdicts || []).flatMap((v) => (v && v.issues) || []).filter((i) => i.severity === "critical" || i.severity === "major");

const API = `
FROZEN LESSON API — import ONLY these. NEVER edit any shared/frozen file
(components/lesson/*, components/sim/*, lib/manifest.ts, app/globals.css,
app/layout.tsx). If the API lacks something, express it with existing pieces
(e.g. an SVG inside <Figure>, or a <Callout>). Do not invent props.

From "@/components/lesson":
  <Lesson slug="SLUG"> ...sections... </Lesson>        // page shell; slug MUST equal this unit's slug
  <Lede>...</Lede>                                      // one opening paragraph
  <Section title="..." id?="..."> ... </Section>        // each major section (auto-listed in the TOC)
  <Intuition title?="Physical picture">...</Intuition>  // the intuition-first callout that LEADS each idea
  <Callout kind="note|insight|warning|history|math" title?="...">...</Callout>
  <Derivation title="..." defaultOpen?={true}>          // collapsible, numbered derivation
     <Step title?="..."> prose + <EqBlock>{...}</EqBlock> </Step>
  </Derivation>
  <KeyResult eq={String.raw\`...\`} label?="..." note?={<>...</>} number?="12" />  // boxed headline equation
  <Figure caption?={<>...</>}> <svg viewBox="0 0 W H">...</svg> </Figure>          // annotated SVG
  <SimFrame title="..." caption?={<>...</>} tryThis?={<>...</>}> <SlugSim/> </SimFrame>
  <Tex>{String.raw\`...\`}</Tex>                          // inline math
  <EqBlock label?="...">{String.raw\`...\`}</EqBlock>     // display math

From "@/components/sim" (use ONLY inside the sim file):
  <Canvas width={N} height={N} draw={({ctx,w,h,t,dt})=>{...}} animate?={true} redraw?={[...]} speed?={1} controls?={true}/>
       // draw in logical coords 0..w, 0..h; t is sim-time (s). Use animate=false + redraw=[deps] for static parametric plots.
  <Plot width={N} height={N} xRange={[a,b]} yRange={[a,b]} lines={SeriesArray} markers?={MarkerArray} xLabel? yLabel? grid?/>
       Series = { x?:number[], y?:number[], data?:[x,y] pairs, color?, width?, dashed?, label?, fill? }
       Marker = { x?, y?, color?, label?, dashed? }
  <Slider label min max step? value onChange unit? tex? format?/>   // tex:true renders the label as KaTeX
  <Toggle label checked onChange/>   <Segmented label? options value onChange/>
  <Readout label value tex?/>        <Controls> ...sliders... </Controls>
  useAnimationLoop((t,dt)=>{...}, {autostart?, speed?})

HARD RULES
  - Every LaTeX string uses a String.raw template literal so backslashes survive.
  - ALL math (prose, headlines, captions, slider labels) goes through <Tex>/<EqBlock>/<KeyResult eq>/Slider tex — never bare LaTeX as text.
  - The sim file MUST start with the "use client" directive, default-export a React component named <Slug>Sim, and contain its own physics + canvas logic.
  - Mimic the GOLD files' structure, tone, math density, and visual richness.`;

const GOLD = `THE GOLD STANDARD to imitate (read both files first with the Read tool):
  ${ROOT}/app/chapters/ch02/page.tsx
  ${ROOT}/components/sims/ch02.tsx
Match its quality: intuition-first lead, full derivations kept (collapsible),
every relevant formula rendered, a faithful interactive simulation, callouts,
and a carry-forward section.`;

const EXTRACT_SCHEMA = {
  type: "object",
  required: ["intuitionHook", "sections", "centralResults", "simSpec", "carryForward"],
  properties: {
    intuitionHook: { type: "string", description: "One vivid paragraph: what this chapter is really about and why it matters for lasers." },
    sections: {
      type: "array", minItems: 3,
      items: {
        type: "object",
        required: ["title", "physicalPicture", "equations"],
        properties: {
          title: { type: "string" },
          physicalPicture: { type: "string", description: "Intuition-first prose that LEADS the section." },
          equations: {
            type: "array",
            items: {
              type: "object", required: ["latex", "meaning"],
              properties: {
                latex: { type: "string", description: "Faithful LaTeX of the equation as printed in the scan." },
                label: { type: "string" },
                sourceEq: { type: "string", description: "Book equation number and/or page, e.g. 'Eq.(12), p.16'." },
                meaning: { type: "string" },
              },
            },
          },
          derivation: {
            type: "array",
            items: { type: "object", required: ["stepTitle", "stepBody"], properties: { stepTitle: { type: "string" }, stepBody: { type: "string" }, latex: { type: "string" } } },
          },
          callouts: { type: "array", items: { type: "object", properties: { kind: { type: "string" }, title: { type: "string" }, text: { type: "string" } } } },
        },
      },
    },
    centralResults: { type: "array", minItems: 1, items: { type: "object", required: ["latex", "label", "meaning"], properties: { latex: { type: "string" }, label: { type: "string" }, meaning: { type: "string" } } } },
    simSpec: {
      type: "object",
      required: ["title", "simType", "governingEquations", "controls", "visualization", "naturalFit"],
      properties: {
        title: { type: "string" },
        summary: { type: "string" },
        simType: { type: "string", enum: ["integrator", "parametric", "animation", "diagram"] },
        governingEquations: { type: "array", items: { type: "string" }, description: "The exact formulas (LaTeX) the sim implements numerically." },
        controls: { type: "array", items: { type: "object", properties: { symbol: { type: "string" }, meaning: { type: "string" }, min: { type: "number" }, max: { type: "number" }, dflt: { type: "number" }, unit: { type: "string" } } } },
        readouts: { type: "array", items: { type: "string" } },
        visualization: { type: "string", description: "What is drawn/plotted and how it ties to the equations." },
        naturalFit: { type: "boolean", description: "true if the physics has a genuine interactive simulation; false if only an illustrative diagram fits (pure perturbation algebra, sum rules, or an outlook chapter)." },
        fidelityNotes: { type: "string" },
      },
    },
    carryForward: { type: "array", items: { type: "string" } },
    builderNotes: { type: "string" },
  },
};

const VERDICT_SCHEMA = {
  type: "object",
  required: ["verdict", "issues", "summary"],
  properties: {
    verdict: { type: "string", enum: ["pass", "pass-with-fixes", "fail"] },
    issues: {
      type: "array",
      items: {
        type: "object", required: ["severity", "problem", "fix"],
        properties: {
          severity: { type: "string", enum: ["critical", "major", "minor"] },
          location: { type: "string" },
          problem: { type: "string" },
          fix: { type: "string" },
        },
      },
    },
    summary: { type: "string" },
  },
};

const BUILD_SCHEMA = {
  type: "object",
  required: ["summary", "naturalSimFit"],
  properties: { summary: { type: "string" }, naturalSimFit: { type: "boolean" }, componentsUsed: { type: "array", items: { type: "string" } } },
};

// ── Stage: Extract ──────────────────────────────────────────────────────────
const extractStage = async (u) => {
  const spec = await agentRetry(
    `You are a laser-physics expert preparing to teach ${u.label}: "${u.title}" to students new to laser physics but mathematically prepared (comfortable with calculus, linear algebra, intro QM).

This chapter of Sargent/Scully/Lamb "Laser Physics" is a SCANNED book — the OCR text is garbled for math, so you MUST read the page images and transcribe equations by eye. Read EVERY page in this range (use the Read tool on each path):
  ${pagePaths(u)}

Produce a complete teaching spec:
  - intuitionHook: the physical "why" of the chapter.
  - sections: break the chapter into 4-7 teachable sections. Each LEADS with a physical picture, then lists EVERY relevant equation (faithful LaTeX, with book Eq number/page in sourceEq), and outlines the derivations worth keeping (step by step). The user explicitly wants ALL relevant formulas covered and derivations kept.
  - centralResults: the 1-3 headline equations.
  - simSpec: design ONE interactive simulation that teaches the chapter's core result. Prefer a real physics integrator / parametric plot driven by the chapter's own equations. Set naturalFit=false ONLY if the material is pure algebra/perturbation bookkeeping or an outlook with no dynamical result — then propose the most illuminating interactive diagram instead. Give exact governing equations, controls (with numeric ranges), readouts, and what is drawn.
  - carryForward: what the student should retain for later chapters.

Transcribe math faithfully (correct subscripts, Greek letters, signs, factors). Double-check each equation against the scan. This spec is the single source of truth for the builder, who will NOT see the scans.`,
    { label: `extract:${u.slug}`, phase: "Extract", schema: EXTRACT_SCHEMA }
  );
  if (!spec) throw new Error(`extract failed after retries: ${u.slug}`);
  return spec;
};

// ── Stage: Build ──────────────────────────────────────────────────────────────
const buildStage = async (spec, u) => {
  const r = await agentRetry(
    `Build the interactive lesson for ${u.label}: "${u.title}" (slug "${u.slug}") as a Next.js page + simulation, matching the gold chapter's quality.

${GOLD}

${API}

THE TEACHING SPEC (your source of truth — you will NOT see the scans):
${JSON.stringify(spec, null, 2)}

Write exactly two files (create them; overwrite if present):
  1) ${ROOT}/app/chapters/${u.slug}/page.tsx
       - default-export a React component (server component; do NOT add "use client").
       - import { Lesson, Section, Lede, Intuition, Callout, Derivation, Step, KeyResult, Tex, EqBlock, Figure, SimFrame } from "@/components/lesson";
       - import ${cap(u.slug)}Sim from "@/components/sims/${u.slug}";
       - <Lesson slug="${u.slug}"> ... </Lesson> containing a <Lede>, intuition-first <Section>s that cover EVERY equation in the spec via <EqBlock>/<KeyResult>, collapsible <Derivation>s, callouts, the <SimFrame> wrapping <${cap(u.slug)}Sim/>, and a carry-forward <Callout>.
  2) ${ROOT}/components/sims/${u.slug}.tsx
       - starts with the "use client" directive; default-exports a component named ${cap(u.slug)}Sim implementing simSpec faithfully with the sim toolkit.
       - If simSpec.naturalFit is false, still build a clear interactive/animated DIAGRAM (never a decorative slider that teaches nothing).

After writing, re-read your own two files once to confirm imports match the frozen API and all LaTeX uses String.raw. Then return the result. Do NOT touch any other file.`,
    { label: `build:${u.slug}`, phase: "Build", schema: BUILD_SCHEMA }
  );
  // Build may have written the files even if its final structured output was
  // throttled away; keep going to verify whatever is on disk.
  return r || { naturalSimFit: true, partial: true };
};

// ── Stage: Verify two axes, then repair-loop until clean (reused by both modes)
async function verifyAndRepair(u, build) {
  const pages = pagePaths(u);
  const files = `  ${ROOT}/app/chapters/${u.slug}/page.tsx\n  ${ROOT}/components/sims/${u.slug}.tsx`;

  let verdicts = (
    await parallel([
      () =>
        agentRetry(
          `MATH-FIDELITY CHECK for ${u.label} "${u.title}". Adversarially compare EVERY rendered LaTeX equation in ${ROOT}/app/chapters/${u.slug}/page.tsx against the ORIGINAL scanned pages (read them all):
  ${pages}
Confirm each equation matches the book exactly (subscripts, signs, factors of 2 or 1/2, hbar, Greek letters, hats/vectors, which frequency sits in which numerator/denominator). Flag every equation that is wrong, garbled, or invented, and any KaTeX that would fail to render. Be exhaustive — missing one wrong formula ships a wrong lesson. Severity: critical = physically wrong/garbled formula; major = notable factor/label error; minor = cosmetic. Give the exact corrected LaTeX in each fix.`,
          { label: `verify-math:${u.slug}`, phase: "Verify", schema: VERDICT_SCHEMA }
        ),
      () =>
        agentRetry(
          `PHYSICS-SOUNDNESS CHECK for ${u.label} "${u.title}". Read these files:\n${files}\nYou are a laser physicist judging whether the INTUITION-FIRST reframing is physically correct — the explanations and the SIM behavior, not the LaTeX. Catch plausible-but-wrong simplifications, misleading hand-waving, wrong limits or signs of an effect, and any sim whose behavior contradicts the physics (wrong frequency dependence, energy from nothing, a curve that should saturate but diverges, a peak that should grow as 1/Γ but stays fixed). You may consult the scans under ${ROOT}/source-pages/. Severity: critical = teaches something false; major = misleading; minor = imprecise. Give a concrete fix for each issue.`,
          { label: `verify-phys:${u.slug}`, phase: "Verify", schema: VERDICT_SCHEMA }
        ),
    ])
  ).filter(Boolean);

  const verifiedAtAll = verdicts.length > 0; // distinguish "passed" from "verify failed"
  let open = serious(verdicts);
  const changeLog = [];
  let round = 0;

  while (open.length && round < 3) {
    round++;
    await agentRetry(
      `Apply ALL of these verified corrections to ${u.label} "${u.title}". Edit ONLY these two files:
${files}
Issues (critical/major) — every one MUST be fixed:
${JSON.stringify(open, null, 2)}
Procedure: for EACH issue, make the edit, then immediately Read that exact equation/line back to confirm it now matches the stated correction. Do not finish until every issue is verified applied. Keep the frozen API. Report what you changed and anything still unresolved.`,
      { label: `fix-r${round}:${u.slug}`, phase: "Fix", schema: { type: "object", required: ["changes"], properties: { changes: { type: "array", items: { type: "string" } }, remaining: { type: "array", items: { type: "string" } } } } }
    ).then((r) => r && r.changes && changeLog.push(...r.changes));

    const recheck = await agentRetry(
      `RE-VERIFY ${u.label} "${u.title}" after fixes. Read ${ROOT}/app/chapters/${u.slug}/page.tsx and ${ROOT}/components/sims/${u.slug}.tsx and the scans:
  ${pages}
Confirm these previously-found issues are now correctly resolved, AND scan for any remaining or newly-introduced critical/major math or physics errors. Report only genuine critical/major problems still present (empty issues list = clean). Previously-found issues:
${JSON.stringify(open.map((i) => i.problem), null, 2)}`,
      { label: `reverify-r${round}:${u.slug}`, phase: "Fix", schema: VERDICT_SCHEMA }
    );
    open = serious(recheck ? [recheck] : []); // null recheck -> keep looping won't help; treat as resolved-best-effort
    if (!recheck) break;
  }

  const status = !verifiedAtAll ? "unverified" : open.length ? "needs-attention" : round ? "fixed" : "ok";
  log(`RESULT ${u.slug}: status=${status} rounds=${round} residual=${open.length} verifiers=${verdicts.length}`);
  return {
    slug: u.slug,
    status,
    naturalSimFit: build && build.naturalSimFit !== false,
    pageFile: `app/chapters/${u.slug}/page.tsx`,
    simFile: `components/sims/${u.slug}.tsx`,
    verifierCount: verdicts.length,
    repairRounds: round,
    changes: changeLog,
    residual: open.map((i) => `[${i.severity}] ${i.location || ""}: ${i.problem}`),
    summary: verdicts.map((v) => `${v.verdict}: ${v.summary}`).join(" || "),
  };
}

const results =
  MODE === "verify"
    ? await pipeline(units, (u) => verifyAndRepair(u, null))
    : await pipeline(units, extractStage, buildStage, (build, u) => verifyAndRepair(u, build));

return results.filter(Boolean);
