import type { Metadata } from "next";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Laser Physics — Interactive Lessons",
  description:
    "Intuition-first, interactive lessons for every chapter of Sargent, Scully & Lamb's Laser Physics: derivations kept, formulas rendered, with a live simulation in every lesson.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="site-brand">
            <span className="site-mark" aria-hidden>
              ⚡
            </span>
            <span className="site-name">Laser&nbsp;Physics</span>
            <span className="site-sub">interactive</span>
          </Link>
          <nav className="site-nav">
            <Link href="/">Lessons</Link>
            <a href="https://github.com/nathanielasun/laser-physics-lessons" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
        </header>
        <div className="site-main">{children}</div>
        <footer className="site-footer">
          <p>
            An intuition-first reconstruction of <em>Laser Physics</em> by Sargent, Scully &amp; Lamb (1974).
            Original explanations, re-typeset derivations, and simulations — the source text is not redistributed.
          </p>
        </footer>
      </body>
    </html>
  );
}
