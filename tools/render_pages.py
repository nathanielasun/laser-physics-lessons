#!/usr/bin/env python3
"""Render every page of laser-physics.pdf to a PNG for visual transcription.

The source PDF is a scanned book: its OCR text layer is garbled for every
equation, so accurate formulas must be read from the page images directly.
We render at 200 dpi (~1225x1850 px) which keeps subscripts legible while
staying light enough for vision models to read a full chapter's pages.

Usage:  python tools/render_pages.py [path-to-pdf]
Output: source-pages/p001.png ... pNNN.png   (gitignored)

Requires: pymupdf  (pip install pymupdf)
"""
import sys, os, time
import fitz  # pymupdf

PDF = sys.argv[1] if len(sys.argv) > 1 else "laser-physics.pdf"
OUT = "source-pages"


def main() -> None:
    doc = fitz.open(PDF)
    os.makedirs(OUT, exist_ok=True)
    t0 = time.time()
    for i in range(doc.page_count):
        doc[i].get_pixmap(dpi=200).save(f"{OUT}/p{i + 1:03d}.png")
    print(f"Rendered {doc.page_count} pages to {OUT}/ in {time.time() - t0:.1f}s")


if __name__ == "__main__":
    main()
