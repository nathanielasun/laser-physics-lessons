"use client";

import { useState, ReactNode } from "react";

// A collapsible, numbered derivation. The whole block can be folded away
// (default open) so a reader can choose "show me the physics" vs "show me the
// math". Steps number themselves via CSS counters — deterministic, so no
// server/client hydration mismatch.

export function Derivation({
  title = "Derivation",
  children,
  defaultOpen = true,
}: {
  title?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`derivation ${open ? "is-open" : "is-closed"}`}>
      <button className="derivation-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="derivation-chevron" aria-hidden>
          {open ? "▾" : "▸"}
        </span>
        <span className="derivation-title">{title}</span>
        <span className="derivation-hint">{open ? "hide steps" : "show steps"}</span>
      </button>
      {open ? <ol className="derivation-steps">{children}</ol> : null}
    </div>
  );
}

/** One numbered step. Put prose + <EqBlock> inside. */
export function Step({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <li className="derivation-step">
      <div className="derivation-step-head">
        <span className="derivation-step-num" aria-hidden />
        {title ? <span className="derivation-step-title">{title}</span> : null}
      </div>
      <div className="derivation-step-body">{children}</div>
    </li>
  );
}
