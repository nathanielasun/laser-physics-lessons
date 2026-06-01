"use client";

/**
 * Appendix F — Zeeman laser gain spectrum: σ+ / σ- competition vs magnetic field.
 *
 * A laser in a magnetic field Zeeman-splits its single line into a right- (σ+)
 * and a left- (σ-) circularly polarized component, separated by the magnetic
 * tuning δ = gμ_B H/ħ (Eq. 16). This appendix computes the gain medium's
 * polarization to third order in the field; the headline (Eq. 15) splits the σ+
 * response into a SELF-saturation piece (∝E_+³, the mode eating its own gain)
 * and a CROSS-saturation piece (∝E_+E_-², the σ- mode stealing σ+ gain), each
 * shaped by Lorentzians of the detuning and of δ.
 *
 *   LINEAR gain per component (1st order, Doppler-averaged) is governing-eq #4:
 *       G_±(ν) ∝ Im ∫dv W(v) / [γ + i(ω0 ± δ/2 − ν − Kv)]  =  Im Z(υ_±),
 *   which, in normalized variables Δ_± = (ω0 ± δ/2 − ν)/Ku, g = γ/Ku, is the
 *   plasma-dispersion function Z exactly (the appC/appD Faddeeva form, reused
 *   verbatim here — w(0)=1 ⇒ Im Z(0)=√π is the verified anchor).
 *
 *   SATURATION is the honest promotion of Eq. 15 into a spectrum: the swept ν
 *   enters the Lorentzians, so the third-order term subtracts gain at each
 *   component's OWN center (self → a Lamb dip) plus a cross term with TWO source
 *   pieces — a RESONANT part weighted by L(δ) and a δ-INDEPENDENT shared-lower-
 *   level part at line center:
 *       G_±^sat(ν) = G_±^lin(ν)
 *                    − S·P(J)·I·[ (1+L_±(ν))            // self  (∝E_±³ in Eq.15)
 *                                + (L(δ)·L_±(ν) + L(ν−ω0)) ], // cross (∝E_±E_∓²)
 *   with L_±(ν)=γ²/(γ²+(ν−center_±)²), center_± = ω0 ± δ/2, L(δ)=γ²/(γ²+δ²),
 *   and L(ν−ω0)=γ²/(γ²+ν²) the line-center floor. As H grows, the RESONANT cross
 *   piece L(δ)→0, but the shared-lower-level floor L(ν−ω0) survives: the two modes
 *   WEAKEN their coupling toward a floor — they do NOT fully decouple. (In the toy
 *   J=1→0 case σ+ and σ− share the SAME lower level J=0,m=0, so an incoherent
 *   cross-saturation through that depleted population persists at any splitting;
 *   in Eq. 15 it is the δ-independent 𝒟(ω0−ν0) term.) That is "competition tuned
 *   by δ" — surfaced as a readout and visible in the sum.
 *
 *   J enters ONLY as the F-3 closed-form sum-rule prefactor (the headline of F-3),
 *       P(J) = (1/60) J(J+1)(2J+1)(2J²+2J+1),     P(1)=½, P(0)=0,
 *   normalized to P(1)=½ so J=1 (the toy J=1→0 case) is the unit of comparison.
 *
 * Intensity I = E_+² = E_-² is an INPUT slider (perturbation theory only — the
 * field is not solved self-consistently), so large I exaggerates dip depth; this
 * is the leading-order regime, exactly as in the chapter's fidelity note.
 *
 * Panels:
 *   TOP    — gain Im(P) vs detuning: σ+, σ-, and their bold sum; a dashed
 *            unsaturated (I=0) sum overlay shows saturation eating the gain.
 *   BOTTOM — dispersion Re(P) (frequency pulling) for the same components, and a
 *            velocity-hole inset showing the σ+/σ- holes split by δ in W(v).
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Segmented, Controls, Readout, Series } from "@/components/sim";

// ── Faddeeva w(z) = exp(-z²) erfc(-iz), Im(z) ≥ 0 (Hui–Armstrong–Wray 1978) ──
// Uniformly accurate in the upper half-plane incl. the real axis — our regime,
// since γ ≥ 0 keeps the argument in Im ≥ 0. Verified anchor: w(0)=1 ⇒ Im Z(0)=√π.
const HAW_A = [
  122.607931777104326, 214.382388694706425, 181.928533092181549,
  93.155580458138441, 30.180142196210589, 5.912626209773153, 0.564189583562615,
];
const HAW_B = [
  122.607931773875350, 352.730625110963558, 457.334478783897737,
  348.703917719495792, 170.354001821091472, 53.992906912940207,
  10.479857114260399, 1.0,
];

function faddeeva(x: number, y: number): [number, number] {
  const tr = y;
  const ti = -x;
  let nr = HAW_A[6];
  let ni = 0;
  for (let k = 5; k >= 0; k--) {
    const r = nr * tr - ni * ti + HAW_A[k];
    const im = nr * ti + ni * tr;
    nr = r;
    ni = im;
  }
  let dr = HAW_B[7];
  let di = 0;
  for (let k = 6; k >= 0; k--) {
    const r = dr * tr - di * ti + HAW_B[k];
    const im = dr * ti + di * tr;
    dr = r;
    di = im;
  }
  const den = dr * dr + di * di;
  return [(nr * dr + ni * di) / den, (ni * dr - nr * di) / den];
}

const SQRTPI = Math.sqrt(Math.PI);

// Z(υ), υ = γ + i(ω−ν), in normalized variables Δ=(ω−ν)/Ku, g=γ/Ku:
// Z = i√π · w(ζ), ζ = −Δ + i g.  i√π·(wr + i wi) = √π(−wi + i wr).
// Im Z = gain (absorption/amplification);  Re Z = dispersion (index, pulling).
function Zfn(Delta: number, g: number): { zr: number; zi: number } {
  const [wr, wi] = faddeeva(-Delta, g);
  return { zr: -SQRTPI * wi, zi: SQRTPI * wr };
}

// F-3 sum-rule polynomial, normalized to P(1) = ½ (the toy J=1→0 unit).
function sumRule(J: number): number {
  return (1 / 60) * J * (J + 1) * (2 * J + 1) * (2 * J * J + 2 * J + 1);
}

export default function AppFSim() {
  // All frequencies in units of γ (the homogeneous half-width). δ = gμ_B H/ħ is
  // taken linear in the H slider with gμ_B/ħ folded into the scaling kH.
  const [H, setH] = useState(2.0); // applied magnetic field (arb.; sets δ)
  const [Ku, setKu] = useState(6.0); // Doppler width  (in units of γ)
  const [gamma, setGamma] = useState(1.0); // dipole decay γ (homogeneous half-width)
  const [gammaA, setGammaA] = useState(1.0); // upper-level decay γ_a (self-sat strength)
  const [gammaB, setGammaB] = useState(1.0); // lower-level decay γ_b
  const [I, setI] = useState(1.0); // field intensity E_+² = E_-²  (0 = pure linear)
  const [J, setJ] = useState(1); // upper-level angular momentum (F-3 prefactor)
  const [det, setDet] = useState(0.0); // marker detuning (ν − ω0) in units of γ
  const [showHoles, setShowHoles] = useState(true);
  const [showSplit, setShowSplit] = useState<"both" | "plus" | "minus">("both");

  const kH = 1.0; // gμ_B/ħ scaling: δ = kH·H (units of γ)
  const delta = kH * H; // magnetic (Zeeman) tuning δ
  const g = gamma / Ku; // γ/Ku — Doppler regime knob
  const cPlus = +delta / 2; // σ+ component sits at ν − ω0 = +δ/2
  const cMinus = -delta / 2; // σ- component sits at ν − ω0 = −δ/2
  const P = sumRule(J); // F-3 closed-form prefactor (P(0)=0 guard built in)

  const N = 420;
  const XMAX = 10; // sweep (ν − ω0) over [−10γ, 10γ]

  // Lorentzian L(x) = γ²/(γ²+x²), all in units of γ (so γ ≡ gamma here).
  const Lor = (x: number) => (gamma * gamma) / (gamma * gamma + x * x);
  const Ldelta = Lor(delta); // RESONANT cross-coupling weight L(δ) — dies as H grows

  // Linear gain of one circular component at detuning x = (ν−ω0):
  //   Δ_± = (center_± − x)/Ku, then Im Z(Δ_±, g).
  const Glin = (x: number, center: number) => {
    const Delta = (center - x) / Ku;
    return Zfn(Delta, g).zi; // Im Z ∝ gain
  };
  const Dlin = (x: number, center: number) => {
    const Delta = (center - x) / Ku;
    return Zfn(Delta, g).zr; // Re Z ∝ dispersion
  };

  // Self-saturation prefactor 2γ_ab(γ γ_a γ_b)⁻¹ from Eq.15 with γ_ab=γ, so the
  // γ_ab in the numerator cancels the γ in the denominator: 2/(γ_a γ_b). This is
  // genuinely γ-independent (γ_ab≡γ by Eq.20 / glossary), so it must NOT scale
  // with the γ slider.
  const selfWeight = 2 / (gammaA * gammaB);
  // Overall third-order saturation scale; tuned so I~1, J=1 carves a clear dip
  // without driving the gain negative at modest pump. Perturbative leading term.
  const Sscale = 0.06;

  // Saturated gain of a component centered at `center`, its partner at `other`.
  //   self  ∝ E_±² · selfWeight · (1 + L_±(ν))               (Eq.15 self term)
  //   cross ∝ E_∓² · ( L(δ)·L_±(ν)  +  L(ν−ω0) )             (Eq.15 cross term)
  // The cross term has TWO source pieces: a RESONANT part weighted by L(δ) (dies
  // as the field splits the lines) plus a δ-INDEPENDENT shared-lower-level part
  // 𝒮(ω0−ν0) parked at LINE CENTER (x=0) — depletion of the J=0 level shared by
  // σ±, which survives at any splitting. So the coupling floors, it never vanishes.
  const Gsat = (x: number, center: number) => {
    const lin = Glin(x, center);
    if (I <= 0) return lin;
    const Lself = Lor(x - center); // L_±(ν): peaks at the component's OWN center
    const Lcenter = Lor(x); // shared-lower-level piece, parked at line center
    const self = I * selfWeight * (1 + Lself); // burns its own gain → Lamb dip
    const cross = I * (Ldelta * Lself + Lcenter); // resonant (dies w/ δ) + floor
    return lin - Sscale * P * (self + cross);
  };

  // ── TOP panel: gain Im(P) for σ+, σ-, and their sum (+ unsaturated overlay) ──
  const gainLines = useMemo<Series[]>(() => {
    const xs: number[] = [];
    const gp: number[] = [];
    const gm: number[] = [];
    const gs: number[] = [];
    const glin: number[] = []; // unsaturated sum (I=0) reference
    for (let i = 0; i <= N; i++) {
      const x = -XMAX + (2 * XMAX * i) / N;
      xs.push(x);
      const sp = Gsat(x, cPlus);
      const sm = Gsat(x, cMinus);
      gp.push(sp);
      gm.push(sm);
      gs.push(sp + sm);
      glin.push(Glin(x, cPlus) + Glin(x, cMinus));
    }
    const out: Series[] = [];
    out.push({ x: xs, y: glin, color: "#94a3b8", width: 1.6, dashed: true, label: "unsaturated  Σ (I=0)" });
    if (showSplit !== "minus")
      out.push({ x: xs, y: gp, color: "#4f46e5", width: 2.2, label: "σ+  (Δm=+1)" });
    if (showSplit !== "plus")
      out.push({ x: xs, y: gm, color: "#0891b2", width: 2.2, label: "σ−  (Δm=−1)" });
    out.push({ x: xs, y: gs, color: "#e11d48", width: 2.8, label: "Σ  total gain" });
    return out;
  }, [delta, g, Ku, gamma, gammaA, gammaB, I, J, showSplit]);

  const gainRange = useMemo<[number, number]>(() => {
    let lo = 0;
    let hi = 0;
    for (let i = 0; i <= N; i++) {
      const x = -XMAX + (2 * XMAX * i) / N;
      const sp = Gsat(x, cPlus);
      const sm = Gsat(x, cMinus);
      lo = Math.min(lo, sp, sm, sp + sm);
      hi = Math.max(hi, sp, sm, sp + sm, Glin(x, cPlus) + Glin(x, cMinus));
    }
    const pad = 0.1 * (hi - lo || 1);
    return [lo - pad, hi + pad];
  }, [delta, g, Ku, gamma, gammaA, gammaB, I, J]);

  // ── BOTTOM panel: dispersion Re(P) for the two components and their sum ──────
  const dispLines = useMemo<Series[]>(() => {
    const xs: number[] = [];
    const dp: number[] = [];
    const dm: number[] = [];
    const ds: number[] = [];
    for (let i = 0; i <= N; i++) {
      const x = -XMAX + (2 * XMAX * i) / N;
      xs.push(x);
      const a = Dlin(x, cPlus);
      const b = Dlin(x, cMinus);
      dp.push(a);
      dm.push(b);
      ds.push(a + b);
    }
    const out: Series[] = [];
    if (showSplit !== "minus")
      out.push({ x: xs, y: dp, color: "#4f46e5", width: 2.0, label: "σ+ dispersion" });
    if (showSplit !== "plus")
      out.push({ x: xs, y: dm, color: "#0891b2", width: 2.0, label: "σ− dispersion" });
    out.push({ x: xs, y: ds, color: "#d97706", width: 2.4, label: "Σ" });
    return out;
  }, [delta, g, Ku, showSplit]);

  const dispRange = useMemo<[number, number]>(() => {
    let m = 0;
    for (let i = 0; i <= N; i++) {
      const x = -XMAX + (2 * XMAX * i) / N;
      m = Math.max(m, Math.abs(Dlin(x, cPlus) + Dlin(x, cMinus)));
    }
    const pad = 1.15 * (m || 1);
    return [-pad, pad];
  }, [delta, g, Ku]);

  // ── INSET: Maxwellian W(v) with σ+ / σ- velocity holes split by δ ────────────
  const drawInset = ({ ctx, w, h }: any) => {
    ctx.clearRect(0, 0, w, h);
    const padL = 8;
    const padR = 8;
    const padT = 18;
    const padB = 22;
    const vmax = 3; // plot v/u from −3..3
    const sx = (vu: number) => padL + ((vu + vmax) / (2 * vmax)) * (w - padL - padR);
    const base = h - padB;
    const top = padT;
    const W0 = (vu: number) => Math.exp(-vu * vu); // Maxwellian (unit peak)

    // Each running wave is resonant with the velocity group v/u = (center−ν)/Ku.
    // With the marker at detuning `det`, the σ± holes sit at hp/hm; their split
    // scales with δ. Saturation depth ∝ I·P(J).
    const hp = (cPlus - det) / Ku;
    const hm = (cMinus - det) / Ku;
    const holeW = Math.max(g, 0.14);
    const depth = Math.min(0.85, 0.18 * I * P * Sscale * 30);
    const hole = (vu: number) =>
      depth * (Math.exp(-(((vu - hp) / holeW) ** 2)) + Math.exp(-(((vu - hm) / holeW) ** 2)));
    const profile = (vu: number) =>
      showHoles ? Math.max(0, W0(vu) * (1 - Math.min(0.95, hole(vu)))) : W0(vu);

    // filled carved Maxwellian
    ctx.beginPath();
    ctx.moveTo(sx(-vmax), base);
    for (let i = 0; i <= 200; i++) {
      const vu = -vmax + (2 * vmax * i) / 200;
      ctx.lineTo(sx(vu), base - (base - top) * profile(vu));
    }
    ctx.lineTo(sx(vmax), base);
    ctx.closePath();
    ctx.fillStyle = "#c7d2fe55";
    ctx.fill();

    // dashed reference: full Maxwellian
    ctx.strokeStyle = "#cbd5e1";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const vu = -vmax + (2 * vmax * i) / 200;
      const yy = base - (base - top) * W0(vu);
      i ? ctx.lineTo(sx(vu), yy) : ctx.moveTo(sx(vu), yy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // carved profile outline
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const vu = -vmax + (2 * vmax * i) / 200;
      const yy = base - (base - top) * profile(vu);
      i ? ctx.lineTo(sx(vu), yy) : ctx.moveTo(sx(vu), yy);
    }
    ctx.stroke();

    // hole markers: σ+ (indigo) and σ- (cyan)
    if (showHoles) {
      const mark = (vu: number, col: string, lab: string) => {
        ctx.strokeStyle = col;
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.3;
        ctx.beginPath();
        ctx.moveTo(sx(vu), top);
        ctx.lineTo(sx(vu), base);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = col;
        ctx.font = "600 10px ui-sans-serif, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(lab, sx(vu), top - 5);
      };
      mark(hp, "#4f46e5", "σ+");
      mark(hm, "#0891b2", "σ−");
    }

    // axis
    ctx.strokeStyle = "#9aa3b2";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, base);
    ctx.lineTo(w - padR, base);
    ctx.stroke();
    ctx.fillStyle = "#5b6473";
    ctx.font = "11px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("v / u", w / 2, h - 6);
    ctx.fillText("0", sx(0), base + 13);
    ctx.fillStyle = "#1f2733";
    ctx.font = "600 11px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("W(v): holes split by δ", padL + 2, top - 6);
  };

  // ── Readouts ────────────────────────────────────────────────────────────────
  const peakPlus = useMemo(() => {
    let best = -Infinity;
    let at = 0;
    for (let i = 0; i <= 600; i++) {
      const x = -XMAX + (2 * XMAX * i) / 600;
      const v = Gsat(x, cPlus);
      if (v > best) { best = v; at = x; }
    }
    return { val: best, at };
  }, [delta, g, Ku, gamma, gammaA, gammaB, I, J]);
  const peakMinus = useMemo(() => {
    let best = -Infinity;
    let at = 0;
    for (let i = 0; i <= 600; i++) {
      const x = -XMAX + (2 * XMAX * i) / 600;
      const v = Gsat(x, cMinus);
      if (v > best) { best = v; at = x; }
    }
    return { val: best, at };
  }, [delta, g, Ku, gamma, gammaA, gammaB, I, J]);

  const sumCenter = Gsat(0, cPlus) + Gsat(0, cMinus);
  const sumLinCenter = Glin(0, cPlus) + Glin(0, cMinus);
  // Lamb-dip contrast on the sum: (peak − center)/peak over the right half.
  const sumContrast = useMemo(() => {
    const center = sumCenter;
    let peak = center;
    for (let i = 0; i <= 600; i++) {
      const x = (XMAX * i) / 600;
      peak = Math.max(peak, Gsat(x, cPlus) + Gsat(x, cMinus));
    }
    return peak !== 0 ? (peak - center) / Math.abs(peak) : 0;
  }, [delta, g, Ku, gamma, gammaA, gammaB, I, J]);

  const markerGain = Gsat(det, cPlus) + Gsat(det, cMinus);

  return (
    <div>
      {/* TOP — gain Im(P): σ+, σ-, sum */}
      <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
        Gain&nbsp;&nbsp;Im&thinsp;𝒫(ν) — σ+ and σ− split by δ, with their sum
      </div>
      <Plot
        width={660}
        height={250}
        xRange={[-XMAX, XMAX]}
        yRange={gainRange}
        xLabel="detuning  (ν − ω₀) / γ"
        yLabel="gain"
        lines={gainLines}
        markers={[
          { x: cPlus, color: "#c7d2fe", dashed: true },
          { x: cMinus, color: "#a5f3fc", dashed: true },
          { x: det, color: "#e11d48" },
          { y: 0, color: "#e2e8f0", dashed: false },
        ]}
      />

      {/* BOTTOM — dispersion Re(P) + velocity-hole inset */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1rem", marginTop: "0.9rem", alignItems: "end" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Dispersion&nbsp;&nbsp;Re&thinsp;𝒫(ν) — frequency pulling
          </div>
          <Plot
            width={400}
            height={210}
            xRange={[-XMAX, XMAX]}
            yRange={dispRange}
            xLabel="(ν − ω₀) / γ"
            yLabel="Re 𝒫"
            lines={dispLines}
            markers={[
              { x: cPlus, color: "#c7d2fe", dashed: true },
              { x: cMinus, color: "#a5f3fc", dashed: true },
              { x: det, color: "#e11d48" },
              { y: 0, color: "#e2e8f0", dashed: false },
            ]}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>Velocity holes</div>
          <Canvas width={260} height={200} draw={drawInset} animate={false} redraw={[delta, g, I, J, det, showHoles]} />
        </div>
      </div>

      <Controls>
        <Slider
          label={String.raw`H\ \ (\delta=g\mu_B H/\hbar)`}
          tex
          min={0}
          max={5}
          step={0.05}
          value={H}
          onChange={setH}
          unit="arb."
        />
        <Slider label={String.raw`Ku`} tex min={1} max={30} step={0.5} value={Ku} onChange={setKu} unit="γ" />
        <Slider label={String.raw`\gamma`} tex min={0.2} max={5} step={0.05} value={gamma} onChange={setGamma} unit="arb." />
        <Slider label={String.raw`\gamma_a`} tex min={0.2} max={5} step={0.05} value={gammaA} onChange={setGammaA} unit="arb." />
        <Slider label={String.raw`\gamma_b`} tex min={0.2} max={5} step={0.05} value={gammaB} onChange={setGammaB} unit="arb." />
        <Slider label={String.raw`I=E_+^2=E_-^2`} tex min={0} max={5} step={0.05} value={I} onChange={setI} unit="arb." />
        <Slider
          label={String.raw`J\ \text{(upper level)}`}
          tex
          min={0}
          max={4}
          step={1}
          value={J}
          onChange={(v) => setJ(Math.round(v))}
          unit=""
        />
        <Slider
          label={String.raw`(\nu-\omega_0)/\gamma\ \text{(marker)}`}
          tex
          min={-XMAX}
          max={XMAX}
          step={0.1}
          value={det}
          onChange={setDet}
          unit=""
        />
        <Toggle label="show velocity holes" checked={showHoles} onChange={setShowHoles} />
        <Segmented
          label="components"
          options={[
            { value: "both", label: "σ+ & σ−" },
            { value: "plus", label: "σ+ only" },
            { value: "minus", label: "σ− only" },
          ]}
          value={showSplit}
          onChange={setShowSplit}
        />
        <Readout label={String.raw`\delta=g\mu_B H/\hbar`} tex value={`${delta.toFixed(2)} γ`} />
        <Readout label={String.raw`\text{σ± peak separation}`} tex value={`${Math.abs(peakPlus.at - peakMinus.at).toFixed(2)} γ`} />
        <Readout label={String.raw`L(\delta)\text{: resonant cross-coupling}`} tex value={Ldelta.toFixed(3)} />
        <Readout
          label={String.raw`\text{central gain } \Sigma(\nu{=}\omega_0)`}
          tex
          value={`${sumCenter.toFixed(2)} (lin ${sumLinCenter.toFixed(2)})`}
        />
        <Readout label={String.raw`\text{Lamb-dip contrast}`} tex value={`${(100 * sumContrast).toFixed(1)}%`} />
        <Readout label={String.raw`\Sigma\ \text{at marker}`} tex value={markerGain.toFixed(2)} />
        <Readout
          label={String.raw`P(J)=\tfrac1{60}J(J{+}1)(2J{+}1)(2J^2{+}2J{+}1)`}
          tex
          value={`${P.toFixed(3)} (×P(1)=0.5)`}
        />
      </Controls>
    </div>
  );
}
