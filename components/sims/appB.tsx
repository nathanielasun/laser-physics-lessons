"use client";

/**
 * Appendix B — Fox–Li cavity-mode builder.
 *
 * Iterates the round-trip Kirchhoff–Huygens diffraction integral (Eq. 3/4) on a
 * 1-D transverse slice (the appendix separates x and y, so 1-D captures the
 * physics) and watches an arbitrary trial field self-organize into the
 * lowest-loss cavity mode while the complex eigenvalue σ converges.
 *
 *   u_{q+1} = σ u_q ,   |σ|² = power surviving one pass,   a_l = 1 − |σ|²  (Eq. 18)
 *
 * Everything is nondimensionalized so the SINGLE physical knob is the Fresnel
 * number  N_F = a²/(Lλ)  (Fig. B-2 used N_F = 6.25). Let ξ = x/a ∈ [−1,1]:
 *
 *   Plane-parallel (Fresnel kernel, e^{−iKr}):
 *       u'(ξ) = √(N_F/i) ∫₋₁¹ u(ξ') exp[ −iπ N_F (ξ−ξ')² ] dξ'
 *
 *   Confocal (Eq. 8 bilinear kernel, +i — the physically correct sign; the
 *   printed Eq. 10 has a −i typo, see the Section-4 warning):
 *       work in X = √(K/R_c) x,  aperture A = √(2π N_F)  (since A² = (K/R_c)a² = 2πN_F),
 *       χ F(X) = (1/√(2π)) ∫₋ₐᴬ exp(+iX X') F(X') dX'   (Eq. 12)
 *
 * With these prefactors |σ| → 1 as N_F grows (a near-lossless mode), and the
 * geometric e^{−iKL} / e^{−iKR_c} carrier has been dropped, so arg σ is exactly
 * the diffractive/Gouy phase the mode picks up per pass — no extra bookkeeping.
 *
 * Performance: the N×N complex kernel is built ONCE (all the trig), then each
 * pass is a cheap mat-vec; a snapshot per pass is stored so the q-scrubber just
 * indexes — it never recomputes.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Segmented, Controls, Readout, Series } from "@/components/sim";

// Hermite polynomials H_0, H_1, H_2 (physicists').
function hermite(m: number, x: number): number {
  if (m === 0) return 1;
  if (m === 1) return 2 * x;
  return 4 * x * x - 2; // H_2
}

export default function AppBSim() {
  const [NF, setNF] = useState(6.25); // Fresnel number a²/(Lλ)
  const [geom, setGeom] = useState<"plane" | "confocal">("confocal");
  const [seed, setSeed] = useState<"even" | "odd">("even");
  const [qMax, setQMax] = useState(120); // round-trip transits to iterate
  const [Ngrid, setNgrid] = useState(192); // transverse sample points
  const [qView, setQView] = useState(120); // scrub through transit number

  // ── build the round-trip kernel ONCE per (NF, geom, Ngrid) ─────────────────
  // Kernel K[i][j] maps field at sample j to contribution at sample i, with the
  // trapezoidal weight Δξ folded in. Stored as two flat real matrices (re,im).
  const kernel = useMemo(() => {
    const N = Ngrid;
    const reK = new Float64Array(N * N);
    const imK = new Float64Array(N * N);

    if (geom === "plane") {
      // ξ ∈ [−1,1], dξ = 2/(N−1); prefactor √(N_F/i) = √N_F · e^{−iπ/4}.
      const dxi = 2 / (N - 1);
      const pref = Math.sqrt(NF); // magnitude of √(N_F/i)
      const pphase = -Math.PI / 4; // arg of 1/√i = e^{−iπ/4}
      const pre = Math.cos(pphase) * pref;
      const pim = Math.sin(pphase) * pref;
      for (let i = 0; i < N; i++) {
        const xi = -1 + i * dxi;
        for (let j = 0; j < N; j++) {
          const xj = -1 + j * dxi;
          const d = xi - xj;
          const ph = -Math.PI * NF * d * d; // exp(−iπ N_F (ξ−ξ')²)
          // trapezoid endpoint weight
          const wt = (j === 0 || j === N - 1 ? 0.5 : 1) * dxi;
          const c = Math.cos(ph) * wt;
          const s = Math.sin(ph) * wt;
          // (pre + i pim)(c + i s)
          reK[i * N + j] = pre * c - pim * s;
          imK[i * N + j] = pre * s + pim * c;
        }
      }
    } else {
      // confocal: X = √(K/R_c) x ranges over [−A, A], A = √(2π N_F).
      // χ F(X) = (1/√2π) ∫ exp(+iXX') F(X') dX'.
      const A = Math.sqrt(2 * Math.PI * NF);
      const dX = (2 * A) / (N - 1);
      const pref = 1 / Math.sqrt(2 * Math.PI);
      for (let i = 0; i < N; i++) {
        const Xi = -A + i * dX;
        for (let j = 0; j < N; j++) {
          const Xj = -A + j * dX;
          const ph = Xi * Xj; // +i X X'
          const wt = (j === 0 || j === N - 1 ? 0.5 : 1) * dX;
          reK[i * N + j] = pref * Math.cos(ph) * wt;
          imK[i * N + j] = pref * Math.sin(ph) * wt;
        }
      }
    }
    return { N, reK, imK, A: geom === "confocal" ? Math.sqrt(2 * Math.PI * NF) : 0 };
  }, [NF, geom, Ngrid]);

  // ── iterate the passes, storing a snapshot of |u|, arg u, σ each transit ───
  const run = useMemo(() => {
    const { N, reK, imK } = kernel;

    // The seed depends on the SOLUTION METHOD, faithfully mirroring the appendix:
    //  • Plane-parallel → Fox & Li: start from an ARBITRARY trial field (uniform
    //    or antisymmetric) and let the round-trip operator self-organize it.
    //  • Confocal → Boyd & Gordon: confocal is the maximally degenerate cavity
    //    (modes m=0,2,4,… share |χ|≈1 in steps of c/2L), so power iteration cannot
    //    pick a unique dominant mode — that is exactly WHY Boyd & Gordon solved it
    //    analytically. We therefore SEED the analytic Hermite–Gaussian eigenfunction
    //    F_m(X)=H_m(X)e^{−X²/2} and let the integral CONFIRM it reproduces itself
    //    (the readout χ=σ≈iᵐ, i.e. arg σ ≈ m·90°, drops straight out).
    const mSeed = seed === "even" ? 0 : 1;
    const Aseed = kernel.A || Math.sqrt(2 * Math.PI * NF);
    const ure = new Float64Array(N);
    const uim = new Float64Array(N);
    for (let j = 0; j < N; j++) {
      const xi = -1 + (2 * j) / (N - 1);
      if (geom === "confocal") {
        const X = xi * Aseed;
        ure[j] = hermite(mSeed, X) * Math.exp(-(X * X) / 2);
      } else {
        ure[j] = seed === "even" ? 1 : Math.sign(xi) || 1;
      }
      uim[j] = 0;
    }
    const l2 = (re: Float64Array, im: Float64Array) => {
      let s = 0;
      for (let k = 0; k < N; k++) s += re[k] * re[k] + im[k] * im[k];
      return Math.sqrt(s);
    };
    // normalize seed
    const nrm = l2(ure, uim);
    for (let k = 0; k < N; k++) {
      ure[k] /= nrm;
      uim[k] /= nrm;
    }

    const ampSnaps: number[][] = []; // |u_q(ξ)| per stored pass
    const phaseSnaps: number[][] = []; // arg u_q(ξ) in degrees
    const lossByPass: number[] = []; // a_l = 1 − |σ|² each pass
    const sigAbs2: number[] = [];
    const sigArg: number[] = [];
    const conv: number[] = []; // ‖u_{q+1}−u_q‖ (normalized profile change)

    const vre = new Float64Array(N);
    const vim = new Float64Array(N);

    const snapEvery = Math.max(1, Math.round(qMax / 60)); // cap stored frames

    for (let q = 0; q < qMax; q++) {
      // v = K u  (mat-vec)
      for (let i = 0; i < N; i++) {
        let sr = 0;
        let si = 0;
        const base = i * N;
        for (let j = 0; j < N; j++) {
          const a = reK[base + j];
          const b = imK[base + j];
          const c = ure[j];
          const d = uim[j];
          sr += a * c - b * d;
          si += a * d + b * c;
        }
        vre[i] = sr;
        vim[i] = si;
      }
      // σ = ⟨u, v⟩ / ⟨u, u⟩, with ⟨u,v⟩ = Σ conj(u)·v. ⟨u,u⟩ = 1 (normalized).
      let sr = 0;
      let si = 0;
      for (let k = 0; k < N; k++) {
        sr += ure[k] * vre[k] + uim[k] * vim[k];
        si += ure[k] * vim[k] - uim[k] * vre[k];
      }
      const s2 = sr * sr + si * si;
      sigAbs2.push(s2);
      sigArg.push(Math.atan2(si, sr));
      lossByPass.push(1 - s2);

      // renormalize v → next u (prevents under/overflow of |σ|^q)
      const vn = l2(vre, vim);
      // profile-change indicator: ‖ û_{q+1} − û_q ‖ after a global phase align.
      // align phase of v to u by removing arg σ so the comparison is meaningful.
      const phi = Math.atan2(si, sr);
      const cphi = Math.cos(-phi);
      const sphi = Math.sin(-phi);
      let dn = 0;
      for (let k = 0; k < N; k++) {
        const nr = (vre[k] * cphi - vim[k] * sphi) / vn;
        const ni = (vre[k] * sphi + vim[k] * cphi) / vn;
        const dr = nr - ure[k];
        const di = ni - uim[k];
        dn += dr * dr + di * di;
      }
      conv.push(Math.sqrt(dn));

      // store snapshot (subsampled), phase-referenced to the center sample
      if (q % snapEvery === 0 || q === qMax - 1) {
        const amp: number[] = [];
        const phs: number[] = [];
        const ctr = (N / 2) | 0;
        const cr = vre[ctr];
        const ci = vim[ctr];
        const cmag = Math.hypot(cr, ci) || 1;
        const rr = cr / cmag;
        const ri = -ci / cmag;
        for (let k = 0; k < N; k++) {
          amp.push(Math.hypot(vre[k], vim[k]) / vn);
          const pr = vre[k] * rr - vim[k] * ri;
          const pi = vre[k] * ri + vim[k] * rr;
          phs.push((Math.atan2(pi, pr) * 180) / Math.PI);
        }
        ampSnaps.push(amp);
        phaseSnaps.push(phs);
      }

      // u ← v / ‖v‖
      for (let k = 0; k < N; k++) {
        ure[k] = vre[k] / vn;
        uim[k] = vim[k] / vn;
      }
    }

    // ── overlap of the converged |u| with the ideal Hermite–Gaussian ─────────
    // F_m(X) = H_m(X) e^{−X²/2}, parity-matched to the seed (even→H0, odd→H1).
    const m = seed === "even" ? 0 : 1;
    const A = kernel.A || Math.sqrt(2 * Math.PI * NF);
    const idealAmp: number[] = [];
    const idealRe = new Float64Array(N);
    for (let k = 0; k < N; k++) {
      const xi = -1 + (2 * k) / (N - 1);
      // map ξ → diffraction-scaled coordinate X (confocal aperture A, else √(πN_F))
      const X = geom === "confocal" ? xi * A : xi * Math.sqrt(Math.PI * NF);
      const f = hermite(m, X) * Math.exp(-(X * X) / 2);
      idealRe[k] = f;
      idealAmp.push(Math.abs(f));
    }
    // normalized overlap |⟨u_final, ideal⟩| / (‖u_final‖‖ideal‖)
    let ovr = 0;
    let ovi = 0;
    let nu = 0;
    let ni = 0;
    for (let k = 0; k < N; k++) {
      ovr += ure[k] * idealRe[k];
      ovi += uim[k] * idealRe[k];
      nu += ure[k] * ure[k] + uim[k] * uim[k];
      ni += idealRe[k] * idealRe[k];
    }
    const overlap = Math.hypot(ovr, ovi) / (Math.sqrt(nu * ni) || 1);
    // scale ideal amp to peak of final |u| for the overlay
    const finalAmp = ampSnaps[ampSnaps.length - 1] || [];
    const peakU = Math.max(...finalAmp, 1e-9);
    const peakI = Math.max(...idealAmp, 1e-9);
    const idealAmpScaled = idealAmp.map((v) => (v / peakI) * peakU);

    return {
      N,
      ampSnaps,
      phaseSnaps,
      lossByPass,
      sigAbs2,
      sigArg,
      conv,
      snapEvery,
      overlap,
      idealAmpScaled,
      m,
    };
  }, [kernel, seed, qMax]);

  // clamp the view index to available snapshots
  const nSnaps = run.ampSnaps.length;
  const viewSnapIdx = Math.min(
    nSnaps - 1,
    Math.max(0, Math.round(Math.min(qView, qMax - 1) / run.snapEvery))
  );
  const passShown = Math.min(viewSnapIdx * run.snapEvery, qMax - 1);

  // ── plot data ──────────────────────────────────────────────────────────────
  const xi = useMemo(() => {
    const a: number[] = [];
    for (let k = 0; k < run.N; k++) a.push(-1 + (2 * k) / (run.N - 1));
    return a;
  }, [run.N]);

  const ampLines = useMemo<Series[]>(() => {
    const cur = run.ampSnaps[viewSnapIdx] || [];
    const first = run.ampSnaps[0] || [];
    const out: Series[] = [
      { x: xi, y: first, color: "#cbd5e1", width: 1.6, dashed: true, label: "u₀ (trial)" },
      { x: xi, y: cur, color: "#4f46e5", width: 2.6, fill: true, label: `|u_q|, q=${passShown + 1}` },
    ];
    if (geom === "confocal") {
      out.push({
        x: xi,
        y: run.idealAmpScaled,
        color: "#e11d48",
        width: 1.8,
        dashed: true,
        label: `ideal H_${run.m}·G`,
      });
    }
    return out;
  }, [run, viewSnapIdx, xi, geom, passShown]);

  const phaseLines = useMemo<Series[]>(() => {
    const cur = run.phaseSnaps[viewSnapIdx] || [];
    return [{ x: xi, y: cur, color: "#0891b2", width: 2.4, label: `arg u_q (°)` }];
  }, [run, viewSnapIdx, xi]);

  const lossLines = useMemo<Series[]>(() => {
    // a_l vs pass on a log10 axis (clamp tiny values for display)
    const x: number[] = [];
    const y: number[] = [];
    run.lossByPass.forEach((al, q) => {
      x.push(q + 1);
      y.push(Math.log10(Math.max(al, 1e-6)));
    });
    return [{ x, y, color: "#d97706", width: 2.4, label: "log₁₀ a_l" }];
  }, [run]);

  // converged readouts (last pass)
  const lastIdx = run.sigAbs2.length - 1;
  const s2 = run.sigAbs2[lastIdx] ?? 0;
  const al = run.lossByPass[lastIdx] ?? 0;
  const argRaw = ((run.sigArg[lastIdx] ?? 0) * 180) / Math.PI;
  const argDeg = Math.abs(argRaw) < 0.05 ? 0 : argRaw; // snap tiny values to avoid "−0.0"
  const convNow = run.conv[lastIdx] ?? 0;

  // ── stability-map inset (Fig. B-7): show the chosen geometry's (g1,g2) point ─
  const stab = ({ ctx, w, h }: { ctx: CanvasRenderingContext2D; w: number; h: number }) => {
    ctx.clearRect(0, 0, w, h);
    const pad = 26;
    const sx = (g: number) => pad + ((g + 1.2) / 2.4) * (w - 2 * pad);
    const sy = (g: number) => h - pad - ((g + 1.2) / 2.4) * (h - 2 * pad);
    // shade stable band 0 ≤ g1 g2 ≤ 1 by sampling
    for (let px = pad; px < w - pad; px += 3) {
      for (let py = pad; py < h - pad; py += 3) {
        const g1 = ((px - pad) / (w - 2 * pad)) * 2.4 - 1.2;
        const g2 = 1.2 - ((py - pad) / (h - 2 * pad)) * 2.4;
        const p = g1 * g2;
        if (p >= 0 && p <= 1) {
          ctx.fillStyle = "rgba(79,70,229,0.10)";
          ctx.fillRect(px, py, 3, 3);
        }
      }
    }
    // axes through origin
    ctx.strokeStyle = "#9aa3b2";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx(-1.2), sy(0));
    ctx.lineTo(sx(1.2), sy(0));
    ctx.moveTo(sx(0), sy(-1.2));
    ctx.lineTo(sx(0), sy(1.2));
    ctx.stroke();
    // g1 g2 = 1 hyperbola branches
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    let started = false;
    for (let g1 = 0.05; g1 <= 1.2; g1 += 0.01) {
      const g2 = 1 / g1;
      if (g2 > 1.2) continue;
      const X = sx(g1);
      const Y = sy(g2);
      started ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
      started = true;
    }
    ctx.stroke();
    started = false;
    ctx.beginPath();
    for (let g1 = -0.05; g1 >= -1.2; g1 -= 0.01) {
      const g2 = 1 / g1;
      if (g2 < -1.2) continue;
      const X = sx(g1);
      const Y = sy(g2);
      started ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
      started = true;
    }
    ctx.stroke();
    // labelled cavity points
    const pts: [number, number, string][] = [
      [0, 0, "confocal"],
      [1, 1, "plane-parallel"],
      [-1, -1, "concentric"],
    ];
    pts.forEach(([g1, g2, lab]) => {
      ctx.fillStyle = "#64748b";
      ctx.beginPath();
      ctx.arc(sx(g1), sy(g2), 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.font = "10px ui-sans-serif, system-ui";
      ctx.textAlign = g1 > 0.5 ? "right" : "left";
      ctx.fillText(lab, sx(g1) + (g1 > 0.5 ? -6 : 6), sy(g2) - 6);
    });
    // current geometry marker (both confocal & plane sit ON the boundary)
    const cg: [number, number] = geom === "confocal" ? [0, 0] : [1, 1];
    ctx.fillStyle = "#4f46e5";
    ctx.beginPath();
    ctx.arc(sx(cg[0]), sy(cg[1]), 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // axis labels
    ctx.fillStyle = "#1f2733";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("g₁ = 1 − L/R₁", w / 2, h - 6);
    ctx.save();
    ctx.translate(11, h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("g₂ = 1 − L/R₂", 0, 0);
    ctx.restore();
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Relative amplitude |u_q| vs ξ = x/a
          </div>
          <Plot
            width={320}
            height={220}
            xRange={[-1, 1]}
            yRange={[0, 1.15]}
            xLabel="ξ = x / a"
            yLabel="|u_q|"
            lines={ampLines}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Relative phase arg u_q vs ξ
          </div>
          <Plot
            width={320}
            height={220}
            xRange={[-1, 1]}
            yRange={[-180, 180]}
            xLabel="ξ = x / a"
            yLabel="arg u_q (°)"
            lines={phaseLines}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Loss per pass a_l = 1 − |σ|² (log) vs transit q
          </div>
          <Plot
            width={320}
            height={200}
            xRange={[1, qMax]}
            yRange={[-6, 0]}
            xLabel="transit q"
            yLabel="log₁₀ a_l"
            lines={lossLines}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Stability map (g₁, g₂) — Fig. B-7
          </div>
          <Canvas width={320} height={200} animate={false} redraw={[geom]} draw={stab} />
        </div>
      </div>

      <div style={{ marginTop: "0.75rem" }}>
        <Slider
          label="scrub transit q"
          min={1}
          max={qMax}
          step={1}
          value={Math.min(qView, qMax)}
          onChange={setQView}
          unit="passes"
        />
      </div>

      <Controls>
        <Slider
          label={String.raw`N_F = a^2/(L\lambda)`}
          tex
          min={0.5}
          max={20}
          step={0.05}
          value={NF}
          onChange={setNF}
          unit=""
        />
        <Segmented
          label="geometry"
          options={[
            { value: "confocal", label: "confocal (L=R_c)" },
            { value: "plane", label: "plane-parallel" },
          ]}
          value={geom}
          onChange={setGeom}
        />
        <Segmented
          label="seed u₀"
          options={[
            { value: "even", label: "uniform → TEM₀" },
            { value: "odd", label: "antisym → TEM₁" },
          ]}
          value={seed}
          onChange={setSeed}
        />
        <Slider
          label={String.raw`q_{\max}\ \text{(transits)}`}
          tex
          min={5}
          max={400}
          step={5}
          value={qMax}
          onChange={(v) => {
            setQMax(v);
            setQView(v);
          }}
          unit="passes"
        />
        <Segmented
          label="grid points N"
          options={[
            { value: 96, label: "96" },
            { value: 192, label: "192" },
            { value: 320, label: "320" },
          ]}
          value={Ngrid}
          onChange={setNgrid}
        />
        <Readout label={String.raw`|\sigma|^2\ \text{(power/pass)}`} tex value={s2.toFixed(4)} />
        <Readout label={String.raw`a_l = 1-|\sigma|^2`} tex value={`${(al * 100).toFixed(3)} %`} />
        <Readout
          label={
            geom === "confocal"
              ? String.raw`\arg\sigma\ \text{(transverse Gouy, }\chi_m=i^m\text{)}`
              : String.raw`\arg\sigma\ \text{(diffractive phase/pass)}`
          }
          tex
          value={`${argDeg.toFixed(1)}°`}
        />
        <Readout
          label={String.raw`\|u_{q+1}-u_q\|`}
          tex
          value={convNow < 1e-4 ? convNow.toExponential(1) : convNow.toFixed(4)}
        />
        <Readout
          label={String.raw`\text{overlap with }H_m e^{-X^2/2}`}
          tex
          value={run.overlap.toFixed(4)}
        />
      </Controls>
    </div>
  );
}
