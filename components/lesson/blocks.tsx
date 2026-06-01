import { ReactNode } from "react";
import { TexBlock } from "./Tex";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/**
 * A top-level lesson section. Renders an <h2> anchor that the Lesson shell
 * picks up (via [data-section]) to build the side table of contents.
 */
export function Section({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: ReactNode;
}) {
  const anchor = id || slugify(title);
  return (
    <section className="section" id={anchor}>
      <h2 className="section-h" data-section data-title={title}>
        <a href={`#${anchor}`} className="section-anchor" aria-label={`Link to ${title}`}>
          #
        </a>
        {title}
      </h2>
      {children}
    </section>
  );
}

/** "Physical picture" lead-in — the intuition-first hook for a section. */
export function Intuition({ title = "Physical picture", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="callout callout-intuition">
      <div className="callout-label">{title}</div>
      <div className="callout-body">{children}</div>
    </aside>
  );
}

type CalloutKind = "note" | "insight" | "warning" | "history" | "math";
const CALLOUT_LABEL: Record<CalloutKind, string> = {
  note: "Note",
  insight: "Key insight",
  warning: "Watch out",
  history: "History",
  math: "Math aside",
};

/** Generic callout. kind ∈ note | insight | warning | history | math */
export function Callout({
  kind = "note",
  title,
  children,
}: {
  kind?: CalloutKind;
  title?: string;
  children: ReactNode;
}) {
  return (
    <aside className={`callout callout-${kind}`}>
      <div className="callout-label">{title || CALLOUT_LABEL[kind]}</div>
      <div className="callout-body">{children}</div>
    </aside>
  );
}

/**
 * A boxed, emphasized final result. Pass the equation as a raw LaTeX string.
 * <KeyResult label="Rabi frequency" eq={String.raw`\Omega=\frac{\wp E_0}{\hbar}`} note="..." />
 */
export function KeyResult({
  eq,
  label,
  note,
  number,
}: {
  eq: string;
  label?: string;
  note?: ReactNode;
  number?: string;
}) {
  return (
    <div className="keyresult">
      {label ? <div className="keyresult-label">{label}</div> : null}
      <TexBlock label={number}>{eq}</TexBlock>
      {note ? <div className="keyresult-note">{note}</div> : null}
    </div>
  );
}

/** Wrap an inline <svg> (or any visual) with a numbered caption. */
export function Figure({ caption, children }: { caption?: ReactNode; children: ReactNode }) {
  return (
    <figure className="figure">
      <div className="figure-body">{children}</div>
      {caption ? <figcaption className="figure-caption">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * Chrome around an interactive simulation. Drop the sim component as children.
 * <SimFrame title="Rabi flopping" caption="Drag detuning and field strength."> <Ch02Sim/> </SimFrame>
 */
export function SimFrame({
  title,
  caption,
  tryThis,
  children,
}: {
  title: string;
  caption?: ReactNode;
  tryThis?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="simframe">
      <div className="simframe-head">
        <span className="simframe-badge">interactive</span>
        <span className="simframe-title">{title}</span>
      </div>
      {caption ? <p className="simframe-caption">{caption}</p> : null}
      <div className="simframe-stage">{children}</div>
      {tryThis ? (
        <div className="simframe-try">
          <strong>Try this:</strong> {tryThis}
        </div>
      ) : null}
    </div>
  );
}

/** A compact lead paragraph for the top of a lesson. */
export function Lede({ children }: { children: ReactNode }) {
  return <p className="lede">{children}</p>;
}
