"use client";

/**
 * Appendix G — Superradiance: the Dicke-ladder cascade.
 *
 * The appendix proves a single matrix element (Eq 24 / Eq 28 squared):
 *   the symmetric N-atom ensemble drops one rung n_a → n_a-1 with amplitude
 *   [n_a (n_b+1)]^{1/2}, so the per-rung COLLECTIVE emission rate is
 *
 *     W(m) = (1/T1) · (r+m)(r-m+1),     r = N/2,  m = (n_a-n_b)/2,
 *
 * with n_a = r+m, n_b = r-m. The two endpoint intensities the appendix quotes
 * fall straight out of this:
 *     top rung  m = +r:  W·T1 = (2r)(1)        = N         (Eq 31, ordinary rate)
 *     middle    m =  0 :  W·T1 = r(r+1) = (N/2)(N/2+1)     (Eq 32, the N² peak).
 *
 * This sim adds the DYNAMICS the appendix describes in words ("the initial decay
 * is greatly accelerated", "a delayed burst") but never integrates — the standard
 * Dicke extension (Bonifacio/Kim/Scully 1969) the chapter explicitly cites. We
 * cascade the rung populations P_m(t) down the symmetric ladder via the diagonal
 * master equation
 *
 *     dP_m/dt = -W(m) P_m + W(m+1) P_{m+1},
 *
 * and plot the emitted intensity I(t)/I0 = Σ_m W(m)·T1·P_m(t) against time, beside
 * the incoherent reference I_indep/I0 = N·exp(-t/T1) (N independent atoms, peak N).
 *
 * Fidelity anchors (exact, checkable against the text):
 *   • I(0)/I0 at full inversion (m0 = +r) equals N        — Eq 31.
 *   • the single-rung Eq-32 value r(r+1) = (N/2)(N/2+1)    — Eq 32 (shown as a
 *     separate readout: the dynamic burst PEAK is emergent and lands at a
 *     fraction of this because the cascade spreads into a wavepacket).
 *   • total photons = ∫ R(t)dt with R = Σ_m W(m)P_m equals n_a(0)  (energy
 *     conservation: every initially-excited atom emits exactly one photon).
 *
 * This is a diagonal rate-equation cascade through the fully-symmetric (r=N/2)
 * ladder only — it deliberately ignores the dark r<N/2 subspaces, matching the
 * chapter's focus. No inter-rung coherence is modeled (a Dicke state has zero
 * mean dipole, Problem G-1), so the diagonal master equation is the right level.
 *
 * ALL heavy compute lives in useMemo keyed on [N, m0frac, T1]; the animation loop
 * only INDEXES the precomputed trajectory (appA's pattern).
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series } from "@/components/sim";

interface Traj {
  t: number[]; // sampled times (ns)
  Icoll: number[]; // collective intensity I/I0 at each sample
  Pm: number[][]; // Pm[sample][rungIndex], rungIndex k = 0..N maps to m = k - r
  rate: number[]; // R(t) = Σ_m W(m)P_m  (photons per ns)
  tEnd: number; // window end (≈ 99.5% of photons emitted)
  Ipeak: number; // emergent burst peak of I/I0
  tPeak: number; // time of the burst peak (delay)
  fwhm: number; // burst FWHM
  photons: number; // ∫ R dt  (should equal n_a(0))
  na0: number; // initial number of excited atoms
}

/**
 * Integrate the Dicke cascade for N atoms starting from rung m0 (population 1 on
 * that rung). Returns a sampled trajectory with self-scaled time window. Forward
 * Euler with a substep sized by the peak rate; populations clamped to ≥ 0.
 */
function integrate(N: number, m0frac: number, T1: number): Traj {
  const r = N / 2;
  const nRung = N + 1; // rungs k = 0..N, with m = k - r
  // Per-rung collective rate W(k) in 1/ns. Rung k has m = k - r, so
  // (r+m)(r-m+1) = k·(N - k + 1).  k=N (top) → N·1 = N; k=N/2 (middle) → r(r+1).
  const W = new Array<number>(nRung);
  for (let k = 0; k < nRung; k++) W[k] = (k * (N - k + 1)) / T1;
  const Wmax = Math.max(...W);

  // initial rung from the fraction: m0frac ∈ [-1,1] of r, rounded to a valid rung.
  let k0 = Math.round(r + m0frac * r);
  k0 = Math.max(0, Math.min(N, k0));
  const na0 = k0; // number of excited atoms initially = m + r = k0

  // substep: ~0.04 / Wmax keeps forward Euler stable even at the N² peak rate.
  const dtSub = Wmax > 0 ? 0.04 / Wmax : T1 / 200;
  // integrate until the bottom rung saturates or photons are nearly all emitted.
  const tMax = 8 * T1; // hard safety cap (independent atoms decay over ~T1)

  let P = new Array<number>(nRung).fill(0);
  P[k0] = 1;

  // sample on a fixed grid fine enough to resolve the burst (~T1/N wide).
  const nSamp = 900;
  const dtSamp = tMax / nSamp;

  const tArr: number[] = [];
  const IArr: number[] = [];
  const rateArr: number[] = [];
  const PmArr: number[][] = [];

  let t = 0;
  let nextSample = 0;
  let photons = 0; // ∫ R dt
  let Ipeak = 0;
  let tPeak = 0;
  const emitTotal = na0; // total photons that must be emitted

  const Iof = (Pv: number[]) => {
    let s = 0;
    for (let k = 0; k < nRung; k++) s += W[k] * T1 * Pv[k]; // I/I0
    return s;
  };
  const Rof = (Pv: number[]) => {
    let s = 0;
    for (let k = 0; k < nRung; k++) s += W[k] * Pv[k]; // photons/ns
    return s;
  };

  let guard = 0;
  const guardMax = 5_000_000;
  while (t <= tMax && guard < guardMax) {
    // sample if we've reached a sample time
    if (t >= nextSample - 1e-12) {
      const I = Iof(P);
      tArr.push(t);
      IArr.push(I);
      rateArr.push(Rof(P));
      PmArr.push(P.slice());
      if (I > Ipeak) {
        Ipeak = I;
        tPeak = t;
      }
      nextSample += dtSamp;
    }
    // forward-Euler step of dP_k/dt = -W(k)P_k + W(k+1)P_{k+1}
    const dP = new Array<number>(nRung).fill(0);
    for (let k = 0; k < nRung; k++) {
      const out = W[k] * P[k];
      dP[k] -= out;
      if (k > 0) dP[k - 1] += out; // population flows downward (k → k-1)
    }
    for (let k = 0; k < nRung; k++) {
      P[k] += dP[k] * dtSub;
      if (P[k] < 0) P[k] = 0;
    }
    photons += Rof(P) * dtSub;
    t += dtSub;
    guard++;
    // early stop once essentially all photons are out (ground rung saturated)
    if (emitTotal > 0 && photons >= emitTotal * 0.9995 && t > tPeak) break;
  }
  // ensure a final sample at the stopping time
  {
    const I = Iof(P);
    tArr.push(t);
    IArr.push(I);
    rateArr.push(Rof(P));
    PmArr.push(P.slice());
  }

  // window end: clip to where 99.5% of photons have been emitted (or a few T1
  // for weak/low-inversion starts where little is emitted). Self-scaled so the
  // narrow N² burst is never an invisible spike.
  let tEnd = t;
  if (emitTotal > 0) {
    let acc = 0;
    for (let i = 1; i < tArr.length; i++) {
      acc += 0.5 * (rateArr[i] + rateArr[i - 1]) * (tArr[i] - tArr[i - 1]);
      if (acc >= emitTotal * 0.995) {
        tEnd = tArr[i];
        break;
      }
    }
  }
  // never collapse the window to nothing; keep at least a few burst widths.
  tEnd = Math.max(tEnd, (6 * T1) / Math.max(N, 1), 0.02 * T1);
  tEnd = Math.min(tEnd, tMax);

  // burst FWHM from the sampled intensity (collective), within the window.
  let fwhm = 0;
  {
    const half = Ipeak / 2;
    let tL = tPeak;
    let tR = tPeak;
    for (let i = 0; i < tArr.length; i++) {
      if (tArr[i] <= tPeak && IArr[i] >= half) {
        tL = tArr[i];
        break;
      }
    }
    for (let i = tArr.length - 1; i >= 0; i--) {
      if (tArr[i] >= tPeak && IArr[i] >= half) {
        tR = tArr[i];
        break;
      }
    }
    fwhm = Math.max(tR - tL, 0);
  }

  return {
    t: tArr,
    Icoll: IArr,
    Pm: PmArr,
    rate: rateArr,
    tEnd,
    Ipeak,
    tPeak,
    fwhm,
    photons,
    na0,
  };
}

export default function AppGSim() {
  const [N, setN] = useState(20); // number of atoms
  const [m0frac, setM0frac] = useState(1); // initial rung as fraction of N/2
  const [T1, setT1] = useState(1); // single-atom lifetime (ns)
  const [logY, setLogY] = useState(false); // log intensity axis
  const [showIndep, setShowIndep] = useState(true);

  const r = N / 2;

  const traj = useMemo(() => integrate(N, m0frac, T1), [N, m0frac, T1]);

  // ── derived headline numbers ───────────────────────────────────────────────
  const eq32 = r * (r + 1); // (N/2)(N/2+1)  — single-rung Eq-32 value
  const eq31 = N; // Eq-31 top-rung intensity
  const indepPeak = traj.na0; // N independent atoms: I/I0 peaks at n_a(0)
  const enhance = indepPeak > 0 ? traj.Ipeak / indepPeak : 0; // emergent enhancement
  const Ptrapped = 1 - 1 / N; // radiation-trapping probability for one excitation

  // ── MAIN PLOT: I(t)/I0, collective burst vs independent reference ──────────
  const plot = useMemo<Series[]>(() => {
    const tEnd = traj.tEnd;
    // collective curve, clipped to the window
    const xc: number[] = [];
    const yc: number[] = [];
    for (let i = 0; i < traj.t.length; i++) {
      if (traj.t[i] > tEnd) break;
      xc.push(traj.t[i]);
      yc.push(Math.max(traj.Icoll[i], logY ? 1e-3 : 0));
    }
    const series: Series[] = [
      { x: xc, y: yc, color: "#e11d48", width: 2.6, label: "collective", fill: !logY },
    ];
    if (showIndep) {
      const xi: number[] = [];
      const yi: number[] = [];
      const M = 220;
      for (let i = 0; i <= M; i++) {
        const t = (i / M) * tEnd;
        // I_indep/I0 = (rate of N independent excited atoms) = (n_a0/T1)e^{-t/T1}·T1 = n_a0 e^{-t/T1}
        const v = traj.na0 * Math.exp(-t / T1);
        xi.push(t);
        yi.push(Math.max(v, logY ? 1e-3 : 0));
      }
      series.push({ x: xi, y: yi, color: "#64748b", width: 1.8, dashed: true, label: "independent" });
    }
    return series;
  }, [traj, logY, showIndep, T1]);

  const yTop = useMemo(() => {
    // derive yMax from the burst peak so the N²/4 spike is never clipped/invisible.
    const peak = Math.max(traj.Ipeak, traj.na0, 1);
    return peak * 1.12;
  }, [traj]);
  const yRange: [number, number] = logY ? [1e-3, Math.max(yTop, 1)] : [0, yTop];
  // log axis: the Plot grid is linear, so emulate log by plotting log10 values.
  const plotLog = useMemo<Series[]>(() => {
    if (!logY) return plot;
    return plot.map((s) => ({
      ...s,
      fill: false,
      y: (s.y || []).map((v) => Math.log10(Math.max(v, 1e-3))),
    }));
  }, [plot, logY]);
  const yRangeLog: [number, number] = [
    -3,
    Math.max(Math.ceil(Math.log10(Math.max(traj.Ipeak, traj.na0, 1)) + 0.2), 0.5),
  ];

  // ── DICKE LADDER: rungs with current population P_m(t) descending ──────────
  // We animate by mapping the looped Canvas time onto the trajectory window.
  const drawLadder = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);
    const nRung = N + 1;
    // loop the precomputed burst on a comfortable ~3.5 s visual period.
    const period = 3.5;
    const frac = (t % period) / period;
    const tNow = frac * traj.tEnd;
    // find nearest sample index
    let idx = 0;
    while (idx < traj.t.length - 1 && traj.t[idx] < tNow) idx++;
    const Pnow = traj.Pm[Math.min(idx, traj.Pm.length - 1)];

    const padTop = 18;
    const padBot = 22;
    const usable = h - padTop - padBot;
    // cap drawn rungs so labels stay legible at large N
    const drawMax = Math.min(nRung, 41);
    const stride = Math.ceil(nRung / drawMax);

    // y for rung k: top (k=N, m=+r) at top, bottom (k=0, m=-r) at bottom.
    const yOf = (k: number) => padTop + (1 - k / N) * usable;

    // arrows between rungs, thickness ∝ W(k) = k(N-k+1) (fattest at the middle)
    const Wk = (k: number) => k * (N - k + 1);
    const WkMax = Math.max(1, r * (r + 1));
    const cx = w * 0.42;
    for (let k = nRung - 1; k >= 1; k -= stride) {
      const y1 = yOf(k);
      const y2 = yOf(k - 1);
      const ww = 0.6 + 4.2 * (Wk(k) / WkMax);
      ctx.strokeStyle = "rgba(148,163,184,0.7)";
      ctx.lineWidth = ww;
      ctx.beginPath();
      ctx.moveTo(cx, y1 + 2);
      ctx.lineTo(cx, y2 - 2);
      ctx.stroke();
      // arrowhead
      ctx.fillStyle = "rgba(148,163,184,0.9)";
      ctx.beginPath();
      ctx.moveTo(cx, y2 - 1);
      ctx.lineTo(cx - 3.2, y2 - 6);
      ctx.lineTo(cx + 3.2, y2 - 6);
      ctx.closePath();
      ctx.fill();
    }

    // rungs themselves, with a population glow
    for (let k = nRung - 1; k >= 0; k -= stride) {
      const y = yOf(k);
      const p = Pnow[k] || 0;
      // rung line
      ctx.strokeStyle = k === Math.round(r) ? "#f59e0b" : "#334155";
      ctx.lineWidth = k === Math.round(r) ? 2.4 : 1.6;
      ctx.beginPath();
      ctx.moveTo(cx - 70, y);
      ctx.lineTo(cx - 6, y);
      ctx.stroke();
      // population glow (bigger = more populated)
      if (p > 1e-3) {
        const rad = 3 + 22 * Math.min(p, 1);
        const g = ctx.createRadialGradient(cx - 38, y, 1, cx - 38, y, rad);
        g.addColorStop(0, `rgba(225,29,72,${0.35 + 0.55 * Math.min(p, 1)})`);
        g.addColorStop(1, "rgba(225,29,72,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx - 38, y, rad, 0, 2 * Math.PI);
        ctx.fill();
      }
      // label only a few rungs to avoid clutter
      if (k === N || k === 0 || k === Math.round(r)) {
        ctx.fillStyle = "#475569";
        ctx.font = "11px ui-sans-serif, system-ui";
        ctx.textAlign = "right";
        const lbl =
          k === N ? "m = +N/2 (all up)" : k === 0 ? "m = -N/2 (all down)" : "m = 0 (peak burst)";
        ctx.fillText(lbl, cx - 76, y + 3);
      }
    }

    // a Bloch-sphere icon on the right: the collective spin arrow of length r
    // sweeping from north pole (m=+r) through equator (m=0) to south pole.
    const bx = w * 0.8;
    const by = h * 0.5;
    const R = Math.min(w * 0.16, h * 0.36);
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(bx, by, R, 0, 2 * Math.PI);
    ctx.stroke();
    // equator (ellipse)
    ctx.beginPath();
    ctx.ellipse(bx, by, R, R * 0.34, 0, 0, 2 * Math.PI);
    ctx.stroke();
    // mean m of the current distribution → polar angle θ (m=+r → north, m=-r → south)
    let mMean = 0;
    let psum = 0;
    for (let k = 0; k < nRung; k++) {
      mMean += (k - r) * (Pnow[k] || 0);
      psum += Pnow[k] || 0;
    }
    if (psum > 0) mMean /= psum;
    const cosTheta = Math.max(-1, Math.min(1, mMean / r));
    const theta = Math.acos(cosTheta); // 0 at north pole
    const ax = bx + R * Math.sin(theta);
    const ay = by - R * Math.cos(theta);
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(ax, ay);
    ctx.stroke();
    ctx.fillStyle = "#e11d48";
    ctx.beginPath();
    ctx.arc(ax, ay, 3.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#94a3b8";
    ctx.font = "10px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("spin r = N/2", bx, by + R + 14);

    // moving time cursor / progress
    ctx.fillStyle = "#64748b";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText(`t = ${tNow.toFixed(3)} ns`, 8, h - 6);
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Emitted intensity I(t)/I₀ — the superradiant burst
          </div>
          <Plot
            width={360}
            height={300}
            xRange={[0, traj.tEnd]}
            yRange={logY ? yRangeLog : yRange}
            xLabel="t  (ns)"
            yLabel={logY ? "log₁₀ I/I₀" : "I / I₀"}
            lines={logY ? plotLog : plot}
            markers={[
              ...(logY
                ? [
                    { y: Math.log10(Math.max(eq32, 1e-3)), color: "#16a34a", label: "Eq 32" },
                    { y: Math.log10(Math.max(N, 1e-3)), color: "#94a3b8" },
                  ]
                : [
                    { y: eq32, color: "#16a34a", label: "Eq 32" },
                    { y: N, color: "#94a3b8" },
                  ]),
              { x: traj.tPeak, color: "#e11d48", dashed: true },
            ]}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Dicke ladder + collective spin (population descends in real time)
          </div>
          <Canvas width={330} height={300} draw={drawLadder} speed={1} />
        </div>
      </div>

      <Controls>
        <Slider label={String.raw`N`} tex min={2} max={200} step={1} value={N} onChange={setN} unit="atoms" />
        <Slider
          label={String.raw`m_0\ (\text{frac. of } N/2)`}
          tex
          min={-1}
          max={1}
          step={0.05}
          value={m0frac}
          onChange={setM0frac}
        />
        <Slider label={String.raw`T_1`} tex min={0.1} max={10} step={0.1} value={T1} onChange={setT1} unit="ns" />
        <Toggle label="log intensity axis" checked={logY} onChange={setLogY} />
        <Toggle label="show independent-atom reference" checked={showIndep} onChange={setShowIndep} />
        <Readout
          label={String.raw`I_{\text{peak}}/I_0\ (\text{emergent})`}
          tex
          value={traj.Ipeak.toFixed(1)}
        />
        <Readout
          label={String.raw`\tfrac12 N(\tfrac12 N+1)\ (\text{Eq 32})`}
          tex
          value={eq32.toFixed(1)}
        />
        <Readout label={String.raw`N\ (\text{Eq 31, top rung})`} tex value={eq31.toFixed(0)} />
        <Readout label={String.raw`I_{\text{peak}}/I_{\text{indep}}`} tex value={`${enhance.toFixed(1)}×`} />
        <Readout label={String.raw`t_D\ (\text{burst delay})`} tex value={`${traj.tPeak.toFixed(3)} ns`} />
        <Readout label={String.raw`\text{FWHM}`} tex value={`${traj.fwhm.toFixed(3)} ns`} />
        <Readout label={String.raw`\int R\,dt\ (\text{photons})`} tex value={traj.photons.toFixed(2)} />
        <Readout label={String.raw`n_a(0)\ (\text{excited})`} tex value={traj.na0.toFixed(0)} />
        <Readout label={String.raw`P_{\text{trapped}}=1-N^{-1}`} tex value={Ptrapped.toFixed(3)} />
      </Controls>
    </div>
  );
}
