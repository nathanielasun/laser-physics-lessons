"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { bySlug, neighbors } from "@/lib/manifest";

interface TocEntry {
  id: string;
  title: string;
}

/**
 * The page shell every lesson uses. Renders the header, an auto-generated
 * side table of contents (scanned from <Section> headings), the content, and
 * prev/next navigation. Author lessons by filling `children` with <Section>s.
 */
export function Lesson({ slug, children }: { slug: string; children: ReactNode }) {
  const unit = bySlug(slug);
  const { prev, next } = neighbors(slug);
  const mainRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TocEntry[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const heads = Array.from(root.querySelectorAll<HTMLElement>("[data-section]"));
    const entries = heads.map((h) => ({
      id: h.parentElement?.id || h.id,
      title: h.dataset.title || h.textContent || "",
    }));
    setToc(entries);

    const obs = new IntersectionObserver(
      (items) => {
        items.forEach((it) => {
          if (it.isIntersecting) setActive((it.target.parentElement?.id || it.target.id) ?? "");
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    heads.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [slug]);

  return (
    <div className="lesson">
      <div className="lesson-topbar">
        <Link href="/" className="lesson-home">
          ← All lessons
        </Link>
        {unit ? <span className="lesson-arc">{unit.arc}</span> : null}
      </div>

      <header className="lesson-header">
        {unit ? <div className="lesson-eyebrow">{unit.label}</div> : null}
        <h1 className="lesson-title">{unit?.title || slug}</h1>
        {unit ? <p className="lesson-blurb">{unit.blurb}</p> : null}
      </header>

      <div className="lesson-grid">
        <aside className="lesson-toc">
          <nav>
            <div className="lesson-toc-label">On this page</div>
            <ul>
              {toc.map((t) => (
                <li key={t.id} className={active === t.id ? "is-active" : ""}>
                  <a href={`#${t.id}`}>{t.title}</a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="lesson-main" ref={mainRef}>
          {children}

          <nav className="lesson-nav">
            {prev ? (
              <Link href={`/chapters/${prev.slug}/`} className="lesson-nav-prev">
                <span className="lesson-nav-dir">← Previous</span>
                <span className="lesson-nav-name">{prev.label} · {prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/chapters/${next.slug}/`} className="lesson-nav-next">
                <span className="lesson-nav-dir">Next →</span>
                <span className="lesson-nav-name">{next.label} · {next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </main>
      </div>
    </div>
  );
}
