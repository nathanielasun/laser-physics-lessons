// The 30 lessons, in reading order: 21 chapters (I–XXI) + 9 appendices (A–I).
// `pdfPages` are inclusive 1-based page numbers in the rendered source scans
// (source-pages/pNNN.png) — used by the authoring/verification agents to read
// the original equations. `arc` groups units on the index page.

export type UnitKind = "chapter" | "appendix";

export interface Unit {
  slug: string; // route + sim filename, e.g. "ch02", "appA"
  kind: UnitKind;
  label: string; // "Chapter II", "Appendix A"
  title: string; // "Atom–Field Interaction"
  blurb: string; // one-liner for the index card
  pdfPages: [number, number]; // inclusive source-page range
  arc: string; // grouping label
}

export const ARCS = [
  "Foundations",
  "Semiclassical Laser Theory",
  "Quantum Theory of Light & Lasers",
  "Outlook",
  "Appendices",
] as const;

export const UNITS: Unit[] = [
  // ── Foundations ───────────────────────────────────────────────────────────
  { slug: "ch01", kind: "chapter", label: "Chapter I", title: "Wave Mechanics", arc: "Foundations", pdfPages: [32, 44],
    blurb: "The Schrödinger equation and the handful of exactly-solvable systems every laser is built from." },
  { slug: "ch02", kind: "chapter", label: "Chapter II", title: "Atom–Field Interaction", arc: "Foundations", pdfPages: [45, 60],
    blurb: "How an oscillating field drives transitions: Rabi flopping, Einstein coefficients, blackbody radiation." },
  { slug: "ch03", kind: "chapter", label: "Chapter III", title: "Stimulated Emission & Dipole Oscillators", arc: "Foundations", pdfPages: [61, 75],
    blurb: "The radiating electric dipole, and why stimulated emission behaves like a classical oscillator." },
  { slug: "ch04", kind: "chapter", label: "Chapter IV", title: "Classical Sustained Oscillator", arc: "Foundations", pdfPages: [76, 85],
    blurb: "The Van der Pol oscillator — the classical archetype of a laser's amplitude and phase dynamics." },
  { slug: "ch05", kind: "chapter", label: "Chapter V", title: "Ammonia Beam Maser", arc: "Foundations", pdfPages: [86, 96],
    blurb: "The first maser: inversion by state selection in a beam of two-level ammonia molecules." },
  { slug: "ch06", kind: "chapter", label: "Chapter VI", title: "The State Vector", arc: "Foundations", pdfPages: [97, 109],
    blurb: "Dirac notation and the Schrödinger, interaction, and Heisenberg pictures." },
  { slug: "ch07", kind: "chapter", label: "Chapter VII", title: "The Density Matrix", arc: "Foundations", pdfPages: [110, 126],
    blurb: "Mixed states, decay, and the Bloch-vector picture — the workhorse of laser theory." },

  // ── Semiclassical Laser Theory ────────────────────────────────────────────
  { slug: "ch08", kind: "chapter", label: "Chapter VIII", title: "Semiclassical Laser Theory", arc: "Semiclassical Laser Theory", pdfPages: [127, 145],
    blurb: "Self-consistent field: Maxwell + the induced polarization give threshold, intensity, and mode pulling." },
  { slug: "ch09", kind: "chapter", label: "Chapter IX", title: "Multimode Operation", arc: "Semiclassical Laser Theory", pdfPages: [146, 174],
    blurb: "Many modes at once: competition, beat notes, and the locking of mode frequencies." },
  { slug: "ch10", kind: "chapter", label: "Chapter X", title: "Gas Laser Theory", arc: "Semiclassical Laser Theory", pdfPages: [175, 202],
    blurb: "Doppler broadening, spectral hole burning, and the Lamb dip." },
  { slug: "ch11", kind: "chapter", label: "Chapter XI", title: "The Ring Laser", arc: "Semiclassical Laser Theory", pdfPages: [203, 211],
    blurb: "Counter-propagating waves, mode coupling, and the ring-laser gyroscope." },
  { slug: "ch12", kind: "chapter", label: "Chapter XII", title: "The Zeeman Laser", arc: "Semiclassical Laser Theory", pdfPages: [212, 228],
    blurb: "Polarization dynamics of a laser in a magnetic field." },
  { slug: "ch13", kind: "chapter", label: "Chapter XIII", title: "Coherent Pulse Propagation", arc: "Semiclassical Laser Theory", pdfPages: [229, 252],
    blurb: "Self-induced transparency, the pulse-area theorem, and photon echoes." },

  // ── Quantum Theory of Light & Lasers ──────────────────────────────────────
  { slug: "ch14", kind: "chapter", label: "Chapter XIV", title: "Quantum Theory of Radiation", arc: "Quantum Theory of Light & Lasers", pdfPages: [253, 272],
    blurb: "Quantizing the field into photons; Weisskopf–Wigner theory of spontaneous emission." },
  { slug: "ch15", kind: "chapter", label: "Chapter XV", title: "Coherent States", arc: "Quantum Theory of Light & Lasers", pdfPages: [273, 287],
    blurb: "The most classical quantum light, |α⟩, and the P-representation of the density operator." },
  { slug: "ch16", kind: "chapter", label: "Chapter XVI", title: "Reservoir Theory — Density Operator", arc: "Quantum Theory of Light & Lasers", pdfPages: [288, 311],
    blurb: "Coupling a system to a bath: master and quantum Fokker–Planck equations." },
  { slug: "ch17", kind: "chapter", label: "Chapter XVII", title: "Quantum Theory of the Laser", arc: "Quantum Theory of Light & Lasers", pdfPages: [312, 329],
    blurb: "Laser photon statistics and the quantum-limited laser linewidth." },
  { slug: "ch18", kind: "chapter", label: "Chapter XVIII", title: "Quantum Laser Theory & Measurement", arc: "Quantum Theory of Light & Lasers", pdfPages: [330, 340],
    blurb: "Photoelectron counting statistics, the spectrum analyzer, and an Onsager regression hypothesis." },
  { slug: "ch19", kind: "chapter", label: "Chapter XIX", title: "Reservoir Theory — Noise Operators", arc: "Quantum Theory of Light & Lasers", pdfPages: [341, 357],
    blurb: "The quantum Langevin / noise-operator route to damping and fluctuations." },
  { slug: "ch20", kind: "chapter", label: "Chapter XX", title: "Langevin Theory of Laser Fluctuations", arc: "Quantum Theory of Light & Lasers", pdfPages: [358, 371],
    blurb: "Atomic drift and diffusion, and the laser linewidth from quantum noise." },

  // ── Outlook ───────────────────────────────────────────────────────────────
  { slug: "ch21", kind: "chapter", label: "Chapter XXI", title: "Outlook", arc: "Outlook", pdfPages: [372, 388],
    blurb: "The laser's impact; the quasimode, the phase-transition analogy, and Josephson radiation." },

  // ── Appendices ────────────────────────────────────────────────────────────
  { slug: "appA", kind: "appendix", label: "Appendix A", title: "Field from a Dipole Sheet", arc: "Appendices", pdfPages: [389, 391],
    blurb: "The field radiated by an infinite sheet of oscillating dipoles." },
  { slug: "appB", kind: "appendix", label: "Appendix B", title: "Passive Cavity Modes", arc: "Appendices", pdfPages: [392, 402],
    blurb: "Eigenmodes of plane-parallel and confocal resonators." },
  { slug: "appC", kind: "appendix", label: "Appendix C", title: "Plasma Dispersion Function", arc: "Appendices", pdfPages: [403, 406],
    blurb: "The Z-function behind Doppler-broadened lineshapes." },
  { slug: "appD", kind: "appendix", label: "Appendix D", title: "Gas Laser Perturbation Theory", arc: "Appendices", pdfPages: [407, 412],
    blurb: "Third-order polarization of the Doppler-broadened gas laser." },
  { slug: "appE", kind: "appendix", label: "Appendix E", title: "Gas Laser Strong-Signal Theory", arc: "Appendices", pdfPages: [413, 418],
    blurb: "Continued-fraction strong-signal polarization." },
  { slug: "appF", kind: "appendix", label: "Appendix F", title: "Zeeman Laser Perturbation Theory", arc: "Appendices", pdfPages: [419, 430],
    blurb: "Calculations for various J levels, and the sum rules." },
  { slug: "appG", kind: "appendix", label: "Appendix G", title: "Superradiance", arc: "Appendices", pdfPages: [431, 440],
    blurb: "Collective (Dicke) emission from many atoms, via angular momentum." },
  { slug: "appH", kind: "appendix", label: "Appendix H", title: "The Coherent State", arc: "Appendices", pdfPages: [441, 449],
    blurb: "The minimum-uncertainty wave packet and its number-state expansion." },
  { slug: "appI", kind: "appendix", label: "Appendix I", title: "General Quantum Laser Equations", arc: "Appendices", pdfPages: [450, 457],
    blurb: "The full quantum laser equations of motion and their reduction to the semiclassical theory." },
];

export const bySlug = (slug: string): Unit | undefined =>
  UNITS.find((u) => u.slug === slug);

export const unitIndex = (slug: string): number =>
  UNITS.findIndex((u) => u.slug === slug);

export const neighbors = (slug: string): { prev?: Unit; next?: Unit } => {
  const i = unitIndex(slug);
  return { prev: i > 0 ? UNITS[i - 1] : undefined, next: i < UNITS.length - 1 ? UNITS[i + 1] : undefined };
};
