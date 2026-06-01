import Link from "next/link";
import { UNITS, ARCS, Unit } from "@/lib/manifest";

function arcUnits(arc: string): Unit[] {
  return UNITS.filter((u) => u.arc === arc);
}

export default function Home() {
  return (
    <div className="home">
      <section className="home-hero">
        <h1>Laser Physics, taught intuition-first</h1>
        <p className="home-byline">
          A chapter-by-chapter reconstruction of Sargent, Scully &amp; Lamb&apos;s classic graduate text — every
          lesson leads with the physical picture, keeps the full derivations, renders every formula, and pairs the
          core result with a live, interactive simulation.
        </p>
        <div className="home-meta">
          <span className="home-pill">21 chapters + 9 appendices</span>
          <span className="home-pill">derivations kept</span>
          <span className="home-pill">a sim in every lesson</span>
        </div>
        <p className="home-note">
          New to laser physics but comfortable with calculus, linear algebra, and intro quantum mechanics? Start at
          Chapter I and follow the arc — each lesson assumes only the ones before it.
        </p>
      </section>

      {ARCS.map((arc) => {
        const units = arcUnits(arc);
        if (!units.length) return null;
        return (
          <section className="arc-group" key={arc}>
            <div className="arc-head">
              <h2>{arc}</h2>
              <span className="arc-count">{units.length} lessons</span>
              <span className="arc-rule" />
            </div>
            <div className="unit-grid">
              {units.map((u) => (
                <Link className="unit-card" key={u.slug} href={`/chapters/${u.slug}/`}>
                  <div className="unit-label">{u.label}</div>
                  <div className="unit-title">{u.title}</div>
                  <p className="unit-blurb">{u.blurb}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
