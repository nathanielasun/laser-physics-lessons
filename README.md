# Laser Physics — Interactive Lessons

**▶ Live site: https://nathanielasun.github.io/laser-physics-lessons/**

An **intuition-first, interactive** reconstruction of every chapter of *Laser
Physics* by **Murray Sargent III, Marlan O. Scully, and Willis E. Lamb Jr.**
(Addison-Wesley, 1974) — the classic graduate text on semiclassical and quantum
laser theory.

All **21 chapters + 9 appendices** are live: each renders intuition-first prose,
full collapsible derivations, every formula in KaTeX, and a live interactive
simulation. Equations are transcribed by reading the scanned pages, then
adversarially checked against the scans by a separate verification pass.

> **Verification status.** Math-verified against the source scans: Ch II, III,
> XIX, XX, XXI and Appendices A–I. Built and rendering cleanly but pending the
> equation-fidelity pass: Ch I and Ch IV–XVIII (verification resumes as API
> quota allows; fixes auto-redeploy).

The goal: take a famously rigorous derivation-heavy book and teach it to people
who are **new to laser physics but mathematically prepared**. Every lesson leads
with the physical picture, keeps the full derivations (collapsible, step by
step), renders every relevant formula, and pairs the core result with a **live
interactive simulation** so the equations move.

> **Source material is not redistributed.** This repo contains original
> explanatory writing, derivations re-typeset in LaTeX, and original
> simulations. The scanned textbook PDF and the page images rendered from it are
> **gitignored** and kept local only.

## Stack

- **Next.js** (App Router) with **static export** (`output: 'export'`) — deploys
  to **GitHub Pages**.
- **KaTeX** for mathematics.
- Custom **Canvas / SVG** simulation primitives (no heavy charting deps).

## Structure

```
app/                     routes — one folder per lesson (chapters/<slug>)
components/
  lesson/                frozen lesson-structure components (shared API)
  sims/                  one interactive simulation per lesson
lib/manifest.ts          ordered list of all 30 units (21 chapters + 9 appendices)
tools/render_pages.py    regenerate page scans from the local PDF
source-pages/            rendered page PNGs (gitignored)
```

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export -> out/
```

## Regenerate source pages (needs the local PDF)

```bash
python -m venv .venv && .venv/bin/pip install pymupdf
.venv/bin/python tools/render_pages.py laser-physics.pdf
```

## Coverage

21 chapters (I–XXI) + 9 appendices (A–I) = **30 interactive lessons**.
