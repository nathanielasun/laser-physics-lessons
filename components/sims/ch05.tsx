"use client";

/**
 * Chapter V — Ammonia beam maser tuning curves (Fig. 5-5).
 *
 * The maser oscillates where the inverted beam's saturated gain exactly
 * replaces the cavity's resistive loss. Writing the energy a transiting
 * molecule gives the field via the Rabi-flopping result (cf. Ch. 2, Eq. 2.68)
 *
 *   |C_a|^2 = (℘E0/ℏ / μ)^2 sin^2(μ t0 / 2),     μ^2 = (℘E0/ℏ)^2 + (Ω-ω0)^2,
 *
 * and equating beam gain (N ν / t0)|C_a|^2 ℏΩ to cavity loss (Ω/Q)·¼ε0E0²V,
 * the field amplitude a ≡ ℘E0/ℏ AND the cavity frequency Ω BOTH cancel out.
 * What survives is the δ-independent self-consistency relation (Eq. 23/29):
 *
 *   const / Q = sin^2(x) / x^2 ,        x = μ t0 / 2 .
 *
 * KEY STRUCTURE (the elegant part): because this relation has no detuning in
 * it, we solve it ONCE for the full set of roots {x_n}. Each root fixes a
 * flopping frequency μ_n = 2 x_n / t0, and the tuning curve for that branch is
 * just an ARC in the (detuning, amplitude) plane,
 *
 *   a(δ) = sqrt( μ_n² − δ² ) ,   defined for |δ| ≤ μ_n,
 *
 * i.e. a semicircle of radius μ_n. Higher Q → smaller const/Q → the horizontal
 * line const/Q cuts more lobes of sin²(x)/x² → more roots → more (taller,
 * nested) arcs → the curve becomes MULTIVALUED (bistable / S-shaped) at high Q.
 *
 * We find ALL roots by bracketing sign changes of g(x)=sin²x/x²−const/Q on a
 * fine grid, then polishing each bracket with Newton-Raphson (Eqs. 30-31).
 *
 * Three linked views:
 *   A. main panel — the family of tuning curves a vs δ (the arcs), Fig. 5-5;
 *   B. inset — the universal transfer function sin²(x)/x² with the const/Q line,
 *      making the number of roots (hence the onset of bistability) visible;
 *   C. preset overlay of the Fig. 5-5 Q values, plus live readouts.
 */

import { useMemo, useState } from "react";
import { Plot, Slider, Toggle, Segmented, Controls, Readout, Series } from "@/components/sim";

// Fig. 5-5 cavity-Q presets.
const Q_PRESETS = [7200, 9000, 12000, 18000, 36000];

// Calibration. Solving Eq. (23) for the root variable gives
//   sin²(x)/x² = [ε₀ℏV/(℘²ν t₀)] · 1/(N·Q) ,
// so the line height the root finder uses is target = const/Q with const ∝ 1/N:
// MORE molecules ⇒ smaller target ⇒ MORE lobes cut ⇒ taller/multivalued curve
// and easier oscillation (a root exists only while target ≤ 1). KAPPA is chosen
// by eye so that at the default N = 100e9 we get const ≈ 900, giving const/Q
// from 0.125 (Q=7200, one branch) down to 0.025 (Q=36000, three branches →
// bistable) — the single→multivalued progression of Fig. 5-5. The book's
// printed instance is the same form, 6000/Q = sin²x/x² (Eq. 29′). Units: μ, δ
// in 1e6 rad/s ("Mrad/s") and t0 in µs put the arcs nicely on screen.
const KAPPA = 9.0e13; // const = KAPPA / N(molecules)  →  const(N=100e9) = 900

const sinc2 = (x: number) => {
  if (Math.abs(x) < 1e-9) return 1; // sin²x/x² → 1 as x → 0
  const s = Math.sin(x) / x;
  return s * s;
};

// d/dx [ sin²x / x² ] = 2 sin x (x cos x − sin x) / x³   (for Newton polish).
const dsinc2 = (x: number) => {
  if (Math.abs(x) < 1e-6) return 0;
  const s = Math.sin(x);
  const c = Math.cos(x);
  return (2 * s * (x * c - s)) / (x * x * x);
};

/**
 * Find every root of sin²(x)/x² = target on (0, xMax].
 * Bracket sign changes on a fine grid, then polish each bracket with a few
 * Newton-Raphson steps (Eqs. 30-31), falling back to bisection for safety.
 */
function rootsOfSinc2(target: number, xMax: number): number[] {
  const roots: number[] = [];
  if (target <= 0 || target >= 1) return roots; // sinc² ∈ (0,1]; >1 is below threshold
  const N = 4000;
  const f = (x: number) => sinc2(x) - target;
  let xPrev = 1e-4;
  let fPrev = f(xPrev);
  for (let i = 1; i <= N; i++) {
    const x = (xMax * i) / N;
    const fx = f(x);
    if (fPrev === 0) {
      roots.push(xPrev);
    } else if (fPrev * fx < 0) {
      // bracket [xPrev, x] — polish with Newton, guard with bisection
      let lo = xPrev;
      let hi = x;
      let r = 0.5 * (lo + hi);
      for (let k = 0; k < 40; k++) {
        const fr = f(r);
        if (Math.abs(fr) < 1e-12) break;
        // maintain bracket
        if (fPrev * fr < 0) hi = r;
        else lo = r;
        // Newton step (Eq. 31): a' = a − f(a)/f'(a)
        const d = dsinc2(r);
        let next = d !== 0 ? r - fr / d : 0.5 * (lo + hi);
        if (!(next > lo && next < hi)) next = 0.5 * (lo + hi); // keep inside bracket
        r = next;
      }
      roots.push(r);
    }
    xPrev = x;
    fPrev = fx;
  }
  return roots;
}

export default function Ch05Sim() {
  const [Qexp, setQexp] = useState(12000); // cavity quality factor (loss knob)
  const [t0, setT0] = useState(5.0); // molecular transit time t0 = L/v, in µs
  const [N, setN] = useState(100); // upper-state molecules in cavity, in units of 1e9
  const [detHalf, setDetHalf] = useState(2.0); // detuning display half-range, in 1e6 rad/s
  const [showPresets, setShowPresets] = useState(true);
  const [showInset, setShowInset] = useState(true);

  // const = KAPPA / N(molecules).  N is in units of 1e9, so molecules = N*1e9.
  // target = const/Q ∝ 1/(N·Q): raising N (or Q) lowers the line and cuts more
  // lobes — more branches and, past a point, multivaluedness / bistability.
  const constVal = KAPPA / (N * 1e9);

  // ── Branch structure for the CURRENT Q: solve const/Q = sin²(x)/x² once ────
  const branches = useMemo(() => {
    const target = constVal / Qexp; // RHS line height in the inset
    // search out far enough in x to catch several lobes
    const xMax = 14 * Math.PI;
    const xs = rootsOfSinc2(target, xMax);
    // each root x_n → μ_n = 2 x_n / t0  (t0 in µs ⇒ μ in 1e6 rad/s = "Mrad/s")
    const mus = xs.map((x) => (2 * x) / t0);
    return { target, xs, mus };
  }, [constVal, Qexp, t0]);

  const belowThreshold = branches.target >= 1 || branches.mus.length === 0;

  // ── A. Tuning curves a(δ) = sqrt(μ_n² − δ²) — semicircle arcs ──────────────
  const arcSeries = (mus: number[], color: string, label?: string): Series[] => {
    const out: Series[] = [];
    mus.forEach((mu, i) => {
      const pts: [number, number][] = [];
      const M = 160;
      // arc spans δ ∈ [−μ, μ]; clip to the display half-range
      const lim = Math.min(mu, detHalf);
      for (let k = 0; k <= M; k++) {
        const d = -lim + (2 * lim * k) / M;
        const inside = mu * mu - d * d;
        if (inside >= 0) pts.push([d, Math.sqrt(inside)]);
      }
      out.push({
        data: pts,
        color,
        width: 2.4,
        label: i === 0 ? label : undefined,
      });
    });
    return out;
  };

  // Faint preset family (each Q a different hue), drawn behind the current Q.
  const presetSeries = useMemo<Series[]>(() => {
    if (!showPresets) return [];
    const palette = ["#cbd5e1", "#a5b4fc", "#7dd3fc", "#fcd34d", "#fca5a5"];
    const out: Series[] = [];
    Q_PRESETS.forEach((Qp, qi) => {
      const target = constVal / Qp;
      const xs = rootsOfSinc2(target, 14 * Math.PI);
      const mus = xs.map((x) => (2 * x) / t0);
      mus.forEach((mu, i) => {
        const pts: [number, number][] = [];
        const M = 120;
        const lim = Math.min(mu, detHalf);
        for (let k = 0; k <= M; k++) {
          const d = -lim + (2 * lim * k) / M;
          const inside = mu * mu - d * d;
          if (inside >= 0) pts.push([d, Math.sqrt(inside)]);
        }
        out.push({
          data: pts,
          color: palette[qi % palette.length],
          width: 1.4,
          dashed: false,
          label: i === 0 ? `Q=${Qp}` : undefined,
        });
      });
    });
    return out;
  }, [showPresets, constVal, t0, detHalf]);

  const currentSeries = useMemo<Series[]>(
    () => arcSeries(branches.mus, "#4f46e5", `Q=${Qexp} (current)`),
    [branches, detHalf, Qexp]
  );

  const tuningLines = useMemo<Series[]>(
    () => [...presetSeries, ...currentSeries],
    [presetSeries, currentSeries]
  );

  // vertical extent of the plot: tallest arc (largest μ) across what is drawn
  const maxMu = useMemo(() => {
    let m = branches.mus.reduce((a, b) => Math.max(a, b), 0.5);
    if (showPresets) {
      Q_PRESETS.forEach((Qp) => {
        const xs = rootsOfSinc2(constVal / Qp, 14 * Math.PI);
        xs.forEach((x) => (m = Math.max(m, (2 * x) / t0)));
      });
    }
    return m;
  }, [branches, showPresets, constVal, t0]);
  const aMax = Math.max(0.5, maxMu * 1.1);

  // ── Operating point at a representative interior detuning for the readouts.
  //    Probe at half the displayed range so it reliably sits beneath the arcs.
  const probeDelta = 0.5 * detHalf;
  // amplitudes at this δ across all branches:  a_n = sqrt(μ_n² − δ²) if real
  const opAmps = branches.mus
    .map((mu) => mu * mu - probeDelta * probeDelta)
    .filter((v) => v >= 0)
    .map((v) => Math.sqrt(v));
  const topAmp = opAmps.reduce((a, b) => Math.max(a, b), 0);
  const topMu = Math.sqrt(topAmp * topAmp + probeDelta * probeDelta);
  const topX = (topMu * t0) / 2;
  const nBranches = branches.mus.length;
  const peakMu = branches.mus.reduce((a, b) => Math.max(a, b), 0); // peak amp = μ at δ=0

  // ── B. Inset: universal sin²(x)/x² with the const/Q line ───────────────────
  // x-axis adapts to comfortably contain the current roots (with a floor so the
  // first few lobes are always shown), so the markers never crowd the left edge.
  const largestRoot = branches.xs.reduce((a, b) => Math.max(a, b), 0);
  const insetXMax = Math.max(2 * Math.PI, largestRoot * 1.25);
  const insetLines = useMemo<Series[]>(() => {
    const M = 600;
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i <= M; i++) {
      const x = (insetXMax * i) / M;
      xs.push(x);
      ys.push(sinc2(x));
    }
    return [{ x: xs, y: ys, color: "#0891b2", width: 2, label: "sin²x / x²" }];
  }, [insetXMax]);
  const insetMarkers = useMemo(
    () => [
      { y: Math.min(1.05, branches.target), color: "#e11d48", label: "const/Q", dashed: false },
      ...branches.xs.map((x) => ({ x, color: "#4f46e5" as const })),
    ],
    [branches]
  );

  // ── C. Optional gain-vs-loss view at fixed detuning (operating point) ──────
  // Plotting beam gain and cavity loss vs the field amplitude a = ℘E0/ℏ at the
  // probe detuning makes the gain=loss crossing literal. After the a²/μ² and Ω
  // cancellations the balance is const/Q = sin²x/x² (with x = ½μt0), so we plot
  // the two sides of that identity, each multiplied by a² (to recover the E0²
  // dependence of both gain and loss). The crossings then land EXACTLY at the
  // branch amplitudes a_n = sqrt(μ_n² − δ²) found above:
  //   gain(a) = a² · sin²x/x²,   loss(a) = a² · (const/Q).
  const [showGainLoss, setShowGainLoss] = useState(false);
  const gainLossLines = useMemo<Series[]>(() => {
    if (!showGainLoss) return [];
    const M = 400;
    const aMaxGL = aMax;
    const gain: [number, number][] = [];
    const loss: [number, number][] = [];
    const lossSlope = constVal / Qexp; // the const/Q line height
    for (let i = 0; i <= M; i++) {
      const a = (aMaxGL * i) / M;
      const mu = Math.sqrt(a * a + probeDelta * probeDelta);
      const x = (mu * t0) / 2;
      const g = a * a * sinc2(x); // saturated gain  ∝ a²·(sin²x/x²)
      const l = a * a * lossSlope; // cavity loss     ∝ a²·(const/Q)
      gain.push([a, g]);
      loss.push([a, l]);
    }
    return [
      { data: gain, color: "#16a34a", width: 2.4, label: "gain  ∝ a²·sin²x/x²" },
      { data: loss, color: "#e11d48", width: 2.4, dashed: true, label: "loss  ∝ a²·const/Q" },
    ];
  }, [showGainLoss, constVal, Qexp, t0, probeDelta, aMax]);
  const glYMax = useMemo(() => {
    let m = 1e-6;
    gainLossLines.forEach((s) => s.data?.forEach((p) => (m = Math.max(m, p[1]))));
    return m * 1.15;
  }, [gainLossLines]);

  return (
    <div>
      {/* threshold / branch-count badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.5rem 0.75rem",
          marginBottom: "0.5rem",
          borderRadius: 8,
          background: belowThreshold ? "#fee2e2" : nBranches >= 3 ? "#fef9c3" : "#dcfce7",
          border: `1px solid ${belowThreshold ? "#e11d48" : nBranches >= 3 ? "#ca8a04" : "#16a34a"}`,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "0.95rem",
            color: belowThreshold ? "#be123c" : nBranches >= 3 ? "#a16207" : "#15803d",
            letterSpacing: "0.01em",
          }}
        >
          {belowThreshold
            ? "BELOW THRESHOLD — no oscillation (const/Q > 1)"
            : nBranches >= 3
            ? `MULTIVALUED — ${nBranches} branches (bistable / S-shaped)`
            : `OSCILLATING — ${nBranches} branch${nBranches === 1 ? "" : "es"} (single-valued)`}
        </span>
        <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "#475569" }}>
          const/Q ≈ {branches.target.toExponential(2)}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: showInset ? "1.4fr 1fr" : "1fr", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Tuning curves: amplitude ℘E₀/ℏ vs detuning Ω − ω₀ (Fig. 5-5)
          </div>
          <Plot
            width={360}
            height={300}
            xRange={[-detHalf, detHalf]}
            yRange={[0, aMax]}
            xLabel="detuning Ω − ω₀  (Mrad/s)"
            yLabel="℘E₀/ℏ  (Mrad/s)"
            lines={tuningLines}
            markers={[{ x: 0, color: "#e2e8f0", dashed: false }]}
          />
        </div>
        {showInset ? (
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
              Root finder: sin²x/x² = const/Q (Eq. 23/29)
            </div>
            <Plot
              width={300}
              height={300}
              xRange={[0, insetXMax]}
              yRange={[0, 1.05]}
              xLabel="x = µ t₀ / 2"
              yLabel="sin²x / x²"
              lines={insetLines}
              markers={insetMarkers}
            />
          </div>
        ) : null}
      </div>

      {showGainLoss ? (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Gain = loss at the probe detuning δ — crossings are the operating points (Eqs. 18, 21, 22)
          </div>
          <Plot
            width={560}
            height={220}
            xRange={[0, aMax]}
            yRange={[0, glYMax]}
            xLabel="field amplitude a = ℘E₀/ℏ  (Mrad/s)"
            yLabel="power (arb.)"
            lines={gainLossLines}
            markers={opAmps.map((a) => ({ x: a, color: "#4f46e5", dashed: true }))}
          />
        </div>
      ) : null}

      <Controls>
        <Segmented<number>
          label="Q preset"
          options={Q_PRESETS.map((q) => ({ value: q, label: String(q) }))}
          value={Qexp}
          onChange={setQexp}
        />
        <Slider
          label={String.raw`Q\ \text{(cavity quality factor)}`}
          tex
          min={5000}
          max={40000}
          step={100}
          value={Qexp}
          onChange={setQexp}
          format={(v) => v.toFixed(0)}
        />
        <Slider
          label={String.raw`t_0=L/v\ \text{(transit time)}`}
          tex
          min={1}
          max={20}
          step={0.1}
          value={t0}
          onChange={setT0}
          unit="µs"
        />
        <Slider
          label={String.raw`N\ \text{(upper-state molecules)}`}
          tex
          min={1}
          max={1000}
          step={1}
          value={N}
          onChange={setN}
          unit="×10⁹"
        />
        <Slider
          label={String.raw`|\Omega-\omega_0|_{\max}\ \text{(detuning range)}`}
          tex
          min={0.2}
          max={5}
          step={0.05}
          value={detHalf}
          onChange={setDetHalf}
          unit="Mrad/s"
        />
        <Toggle label="overlay Fig. 5-5 preset family" checked={showPresets} onChange={setShowPresets} />
        <Toggle label="show root-finder inset" checked={showInset} onChange={setShowInset} />
        <Toggle label="show gain-vs-loss panel" checked={showGainLoss} onChange={setShowGainLoss} />
        <Readout
          label={String.raw`\text{branches (1=single, }\geq 3\text{=bistable)}`}
          tex
          value={belowThreshold ? "0" : String(nBranches)}
        />
        <Readout
          label={String.raw`\text{peak } \wp E_0/\hbar\ (\delta=0)`}
          tex
          value={`${peakMu.toFixed(3)} Mrad/s`}
        />
        <Readout
          label={String.raw`\text{op. amplitude } \wp E_0/\hbar`}
          tex
          value={topAmp > 0 ? `${topAmp.toFixed(3)} Mrad/s` : "—"}
        />
        <Readout
          label={String.raw`\mu=\sqrt{(\wp E_0/\hbar)^2+(\Omega-\omega_0)^2}`}
          tex
          value={topAmp > 0 ? `${topMu.toFixed(3)} Mrad/s` : "—"}
        />
        <Readout label={String.raw`x=\tfrac12\mu t_0\ \text{(op. point)}`} tex value={topAmp > 0 ? topX.toFixed(3) : "—"} />
      </Controls>
    </div>
  );
}
