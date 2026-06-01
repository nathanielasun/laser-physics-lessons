import katex from "katex";

// Render math with KaTeX to a static HTML string. Works in both server and
// client components (it is a pure function). `throwOnError: false` means a
// malformed expression shows in red rather than crashing the whole page.
function render(tex: string, displayMode: boolean): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    strict: false,
    trust: true,
    macros: {
      "\\d": "\\mathrm{d}",
      "\\half": "\\tfrac{1}{2}",
      "\\Tr": "\\operatorname{Tr}",
      "\\ket": "\\left|#1\\right\\rangle",
      "\\bra": "\\left\\langle#1\\right|",
      "\\braket": "\\left\\langle#1\\right\\rangle",
      "\\abs": "\\left|#1\\right|",
    },
  });
}

/** Inline math: <Tex>{String.raw`\hbar\omega`}</Tex> */
export function Tex({ children }: { children: string }) {
  return <span className="tex" dangerouslySetInnerHTML={{ __html: render(children, false) }} />;
}

/** Display (block, centered) math. Alias: <Eq>. */
export function TexBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="texblock">
      <div className="texblock-eq" dangerouslySetInnerHTML={{ __html: render(children, true) }} />
      {label ? <span className="texblock-label">({label})</span> : null}
    </div>
  );
}

// Convenient aliases used throughout the lessons.
export const Eq = Tex;
export const EqBlock = TexBlock;
