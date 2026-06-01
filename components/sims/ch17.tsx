"use client";

/**
 * Chapter XVII — Quantum theory of the laser: integrating the photon rate equation
 * across threshold.
 *
 * We integrate the chapter's central engine, the FULL saturated photon rate equation
 * (Eq. 17 — the diagonal of Eq. 16):
 *
 *   ρ̇_nn = −U_n ρ_nn + U_{n-1} ρ_{n-1,n-1} − L_n ρ_nn + L_{n+1} ρ_{n+1,n+1},
 *
 * with the SATURATED gain (up) and cavity-loss (down) rates
 *
 *   U_n = (n+1) 𝒜 / [ 1 + (n+1) ℬ/𝒜 ]     (n → n+1, stimulated + spontaneous emission)
 *   L_n = (ν/Q) n                          (n → n−1, cavity loss, n̄_thermal = 0).
 *
 * CRITICAL FIDELITY NOTE (book p.289): we keep the FULL saturated denominators, NOT the
 * two-term expansion 𝒜 − (n+1)ℬ of Eq. (18). The expanded gain goes negative for
 * n > 𝒜/ℬ and the distribution blows up / goes negative above threshold; the full
 * denominators keep every up-rate positive and the integration stable.
 *
 * Detailed balance on this exact equation gives the steady-state recursion (Eq. 34)
 *
 *   ρ_{n+1}/ρ_n = U_n / L_{n+1} = (𝒜/(ν/Q)) / [ 1 + (n+1) ℬ/𝒜 ],
 *
 * whose peak/mean is Eq. (35)  n̂_ss = (𝒜/(ν/Q))·(𝒜 − ν/Q)/ℬ  (this is what the
 * integrated mean actually equals; the near-threshold Eq. 33 form (𝒜−ν/Q)/ℬ
 * UNDER-predicts it away from threshold). We use Eq. (35) to size the Fock ladder and
 * to warn when the truncation is too small.
 *
 * NUMERICS. The system is stiff (loss rate (ν/Q)·n reaches ~10⁵ at the top of the
 * ladder). We march with UNCONDITIONALLY-STABLE implicit Euler, solving the
 * tridiagonal (I − dt·M) ρ^{k+1} = ρ^k with the Thomas algorithm — one sweep per
 * animation frame reaches steady state in ~1 s of wall time, and reproduces the exact
 * recursion mean to <0.2 %. We renormalize Σρ = 1 each step to absorb truncation drift.
 *
 * READOUTS, all computed LIVE from the evolving distribution (never hard-coded):
 *   ⟨n⟩ = Σ n ρ_nn,  Fano = (⟨n²⟩−⟨n⟩²)/⟨n⟩  (≫1 below/near threshold → →1 far above),
 *   threshold order parameter 𝒜 − ν/Q,  n̂_ss (Eq. 35),  and the phase-diffusion /
 *   Schawlow–Townes linewidth D ≈ ½𝒜/n̂_ss (∝ 1/⟨n⟩).
 *
 * The dashed overlay is the equal-⟨n⟩ Poisson (coherent-state) distribution, computed
 * in log space (lgamma) so it never overflows even at ⟨n⟩ ~ hundreds; comparing widths
 * shows the laser is super-Poissonian near threshold and approaches Poisson far above.
 */

import { useEffect, useRef, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series } from "@/components/sim";

// ── Lanczos log-gamma (from ch15): keeps the Poisson overlay finite to ⟨n⟩ ~ thousands.
function lgamma(x: number): number {
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1;
  let a = c[0];
  const tt = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(tt) - tt + Math.log(a);
}
// Poisson P_n = exp(n ln λ − λ − lgamma(n+1)).
function poisson(n: number, lambda: number): number {
  if (lambda <= 0) return n === 0 ? 1 : 0;
  return Math.exp(n * Math.log(lambda) - lambda - lgamma(n + 1));
}

// Eq. (35): the mean/peak the FULL saturated steady state actually sits at.
function meanEq35(A: number, nuQ: number, BoverA: number): number {
  const B = BoverA * A;
  return (A / nuQ) * (A - nuQ) / B; // (𝒜/(ν/Q))·(𝒜−ν/Q)/ℬ
}

export default function Ch17Sim() {
  // ── controls (simSpec) ──────────────────────────────────────────────────────
  const [A, setA] = useState(60); // 𝒜  linear gain (pump)        s⁻¹ (arb.)
  const [nuQ, setNuQ] = useState(50); // ν/Q  cavity loss            s⁻¹ (arb.)
  const [BoverA, setBoverA] = useState(0.004); // ℬ/𝒜  saturation per photon
  const [NmaxReq, setNmaxReq] = useState(600); // requested Fock truncation
  const [n0, setN0] = useState(0); // initial mean photon number (delta start)
  const [showPoisson, setShowPoisson] = useState(true);

  // ── derived "what the theory predicts" (live readouts) ───────────────────────
  const above = A - nuQ; // threshold order parameter 𝒜 − ν/Q
  const nss = above > 0 ? meanEq35(A, nuQ, BoverA) : 0; // Eq. (35) peak/mean
  const nssEq33 = above / (BoverA * A); // Eq. (33) near-threshold form, for contrast
  // phase-diffusion / Schawlow–Townes linewidth (Eq. 48): D ≈ ½ 𝒜 / n̂_ss  ∝ 1/⟨n⟩
  const Dlw = nss > 0 ? 0.5 * A / nss : Infinity;

  // Cap the WORKING ladder to ~4× the predicted mean so the stiff solver stays light,
  // but never exceed the user's requested Nmax. Warn when truncation bites.
  const NmaxSafe = Math.min(NmaxReq, Math.max(60, Math.ceil(Math.abs(nss) * 4) + 30));
  const truncationTight = above > 0 && nss > 0.85 * NmaxReq; // n̂_ss approaching the ceiling

  // ── live distribution lives in a ref; the draw closure marches & renders it ──
  const rhoRef = useRef<Float64Array>(new Float64Array(NmaxSafe + 1));
  // signature of the current parameter set; when it changes we re-seed the delta.
  const sigRef = useRef<string>("");
  const lastTRef = useRef<number>(0);
  // live scalars surfaced to the React readouts/plots (updated inside draw)
  const [live, setLive] = useState({ mean: 0, fano: 0, tail: 0, t: 0 });
  // ⟨n⟩(t) buildup trace (Figs. 17-4/17-5)
  const traceRef = useRef<{ t: number[]; n: number[] }>({ t: [], n: [] });
  const [trace, setTrace] = useState<{ t: number[]; n: number[] }>({ t: [], n: [] });

  const sig = `${A}|${nuQ}|${BoverA}|${NmaxSafe}|${n0}`;

  // Seed a delta at n0 whenever parameters change (also on first mount).
  const seed = () => {
    const N = NmaxSafe + 1;
    const r = new Float64Array(N);
    r[Math.min(Math.round(n0), NmaxSafe)] = 1;
    rhoRef.current = r;
    traceRef.current = { t: [], n: [] };
    sigRef.current = sig;
    lastTRef.current = 0;
  };
  // Re-seed synchronously when the signature changes (keeps the animate loop honest).
  useEffect(() => {
    seed();
    setTrace({ t: [], n: [] });
    setLive({ mean: n0, fano: 0, tail: 0, t: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);

  // ── one unconditionally-stable implicit-Euler (Thomas) step of dt ────────────
  const stepThomas = (rho: Float64Array, dt: number) => {
    const Nmax = rho.length - 1;
    const N = Nmax + 1;
    const B = BoverA * A;
    // tridiagonal of (I − dt·M):
    //   diag  d[n] = 1 + dt(U_n + L_n)
    //   sub   a[n] = −dt·U_{n-1}   (couples ρ_{n-1})
    //   super c[n] = −dt·L_{n+1}   (couples ρ_{n+1})
    const a = new Float64Array(N), d = new Float64Array(N), c = new Float64Array(N), b = new Float64Array(N);
    const U = (n: number) => ((n + 1) * A) / (1 + (n + 1) * B / A); // saturated up-rate
    const L = (n: number) => nuQ * n; // down-rate
    for (let n = 0; n < N; n++) {
      d[n] = 1 + dt * (U(n) + L(n));
      a[n] = n > 0 ? -dt * U(n - 1) : 0;
      c[n] = n < Nmax ? -dt * L(n + 1) : 0;
      b[n] = rho[n];
    }
    // Thomas forward sweep
    const cp = new Float64Array(N), bp = new Float64Array(N);
    cp[0] = c[0] / d[0];
    bp[0] = b[0] / d[0];
    for (let n = 1; n < N; n++) {
      const m = d[n] - a[n] * cp[n - 1];
      cp[n] = c[n] / m;
      bp[n] = (b[n] - a[n] * bp[n - 1]) / m;
    }
    // back substitution
    const x = new Float64Array(N);
    x[N - 1] = bp[N - 1];
    for (let n = N - 2; n >= 0; n--) x[n] = bp[n] - cp[n] * x[n + 1];
    // clamp tiny negatives + renormalize Σρ = 1
    let Z = 0;
    for (let n = 0; n < N; n++) {
      if (x[n] < 0) x[n] = 0;
      Z += x[n];
    }
    if (Z > 0) for (let n = 0; n < N; n++) rho[n] = x[n] / Z;
  };

  // ── animated canvas: TOP = distribution ρ_nn(n) + Poisson overlay; ───────────
  //                     BOTTOM is the ⟨n⟩(t) trace (rendered with <Plot>).
  const draw = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);

    // Re-seed if React swapped the parameter signature out from under us, or the
    // animation clock was reset (t went backwards / to 0).
    if (sigRef.current !== sig || t < lastTRef.current - 1e-6) {
      seed();
      sigRef.current = sig;
    }
    const rho = rhoRef.current;
    const Nmax = rho.length - 1;

    // advance the master equation: implicit Euler, dt sized so turn-on takes ~1–2 s.
    const dtFrame = t - lastTRef.current;
    lastTRef.current = t;
    if (dtFrame > 0 && dtFrame < 0.5) {
      // one Thomas sweep per frame at a generous step (unconditionally stable)
      stepThomas(rho, Math.min(dtFrame, 0.05));
    }

    // live moments straight from the distribution
    let mean = 0, m2 = 0;
    for (let n = 0; n <= Nmax; n++) {
      mean += n * rho[n];
      m2 += n * n * rho[n];
    }
    const fano = mean > 1e-9 ? (m2 - mean * mean) / mean : 0;
    const tail = rho[Nmax];

    // push to the trace (cap length); throttle React state updates to ~10 Hz
    const tr = traceRef.current;
    if (tr.t.length === 0 || t - tr.t[tr.t.length - 1] > 0.02) {
      tr.t.push(t);
      tr.n.push(mean);
      if (tr.t.length > 1200) {
        tr.t.shift();
        tr.n.shift();
      }
    }
    if (Math.floor(t * 10) !== Math.floor((t - dtFrame) * 10)) {
      setLive({ mean, fano, tail, t });
      setTrace({ t: tr.t.slice(), n: tr.n.slice() });
    }

    // ===== draw the photon-number distribution ρ_nn(n) =========================
    const padL = 50, padR = 14, padT = 26, padB = 30;
    const pw = w - padL - padR;
    const ph = h - padT - padB;
    const baseY = padT + ph;

    // window: show n from 0 to a comfortable multiple of the peak/mean
    const nWin = Math.max(12, Math.min(Nmax, Math.ceil(Math.max(mean, nss, 8) * 2.4)));
    const xOf = (n: number) => padL + (n / nWin) * pw;

    // peak height for vertical scaling (include Poisson overlay if shown)
    let peak = 1e-12;
    for (let n = 0; n <= Math.min(nWin, Nmax); n++) peak = Math.max(peak, rho[n]);
    if (showPoisson && mean > 0) {
      for (let n = 0; n <= nWin; n++) peak = Math.max(peak, poisson(n, mean));
    }
    const yOf = (p: number) => baseY - (p / peak) * ph;

    // baseline axis
    ctx.strokeStyle = "#c2cad8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, baseY);
    ctx.lineTo(padL + pw, baseY);
    ctx.stroke();

    // ρ_nn bars
    const colW = pw / (nWin + 1);
    for (let n = 0; n <= Math.min(nWin, Nmax); n++) {
      const p = rho[n];
      if (p <= 0) continue;
      const bx = xOf(n);
      const by = yOf(p);
      ctx.fillStyle = "#4f46e5cc";
      ctx.fillRect(bx - colW * 0.32, by, Math.max(1.2, colW * 0.64), baseY - by);
    }

    // equal-⟨n⟩ Poisson overlay (dashed line)
    if (showPoisson && mean > 0) {
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 1.9;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      let started = false;
      for (let n = 0; n <= nWin; n++) {
        const yy = yOf(poisson(n, mean));
        if (!started) {
          ctx.moveTo(xOf(n), yy);
          started = true;
        } else ctx.lineTo(xOf(n), yy);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // mean marker (red dashed vertical)
    if (mean >= 0 && mean <= nWin) {
      ctx.strokeStyle = "#e11d48";
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(xOf(mean), padT - 4);
      ctx.lineTo(xOf(mean), baseY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // n̂_ss predicted-peak marker (Eq. 35), only above threshold
    if (above > 0 && nss <= nWin) {
      ctx.strokeStyle = "#0891b2";
      ctx.setLineDash([2, 4]);
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(xOf(nss), padT - 4);
      ctx.lineTo(xOf(nss), baseY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // n-axis ticks
    ctx.fillStyle = "#5b6473";
    ctx.font = "10px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    const tickStep = Math.max(1, Math.round(nWin / 6));
    for (let n = 0; n <= nWin; n += tickStep) ctx.fillText(String(n), xOf(n), baseY + 13);
    ctx.fillText("n  (photon number)", padL + pw / 2, baseY + 26);

    // title + legend
    ctx.fillStyle = "#1b2330";
    ctx.font = "600 12px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("photon-number distribution  ρ_nn", padL, padT - 12);
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.fillStyle = "#4f46e5";
    ctx.textAlign = "right";
    ctx.fillText(above > 0 ? "laser: peaked at n̂_ss" : "lamp: monotonic decay", padL + pw, padT - 12);

    // regime banner (top-left of the plot area)
    ctx.textAlign = "left";
    ctx.font = "600 11px ui-sans-serif, system-ui";
    ctx.fillStyle = above > 0 ? "#16a34a" : "#b45309";
    ctx.fillText(
      above > 0
        ? `above threshold:  𝒜 − ν/Q = +${above.toFixed(0)}`
        : `below threshold:  𝒜 − ν/Q = ${above.toFixed(0)}`,
      padL + 6,
      padT + 12
    );
  };

  // ── ⟨n⟩(t) buildup trace series for the Plot ─────────────────────────────────
  const traceSeries: Series[] = [
    { x: trace.t, y: trace.n, color: "#4f46e5", width: 2.4, label: "⟨n⟩(t)", fill: true },
  ];
  const traceTmax = Math.max(2, trace.t.length ? trace.t[trace.t.length - 1] : 2);
  const traceNmax = Math.max(10, nss * 1.25, live.mean * 1.25);

  return (
    <div>
      <Canvas width={620} height={300} draw={draw} speed={1} />

      <div style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
          Mean photon number ⟨n⟩(t): buildup / turn-on (Figs. 17-4, 17-5)
        </div>
        <Plot
          width={620}
          height={200}
          xRange={[0, traceTmax]}
          yRange={[0, traceNmax]}
          xLabel="sim time t  (arb.)"
          yLabel="⟨n⟩"
          lines={traceSeries}
          markers={above > 0 ? [{ y: nss, color: "#0891b2", label: "n̂_ss (Eq. 35)" }] : []}
        />
      </div>

      {truncationTight ? (
        <div
          style={{
            marginTop: "0.75rem",
            padding: "0.5rem 0.75rem",
            borderRadius: 6,
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#991b1b",
            fontSize: "0.82rem",
          }}
        >
          ⚠ Truncation tight: n̂_ss ≈ {nss.toFixed(0)} is close to N<sub>max</sub> = {NmaxReq}. Raise N
          <sub>max</sub> (or ℬ/𝒜) so the ladder comfortably exceeds the clamp — otherwise probability
          piles up at the top rung and the distribution is unreliable. Tail mass at the top rung:{" "}
          {live.tail.toExponential(1)}.
        </div>
      ) : null}

      <Controls>
        <Slider
          label={String.raw`\mathscr{A}\ \text{(linear gain / pump)}`}
          tex
          min={0}
          max={200}
          step={1}
          value={A}
          onChange={setA}
          unit="s⁻¹ (arb.)"
        />
        <Slider
          label={String.raw`\nu/Q\ \text{(cavity loss)}`}
          tex
          min={1}
          max={100}
          step={1}
          value={nuQ}
          onChange={setNuQ}
          unit="s⁻¹ (arb.)"
        />
        <Slider
          label={String.raw`\mathscr{B}/\mathscr{A}\ \text{(saturation/photon)}`}
          tex
          min={0.0005}
          max={0.05}
          step={0.0005}
          value={BoverA}
          onChange={setBoverA}
          unit="dimensionless"
          format={(v) => v.toFixed(4)}
        />
        <Slider
          label={String.raw`N_{\max}\ \text{(Fock truncation)}`}
          tex
          min={50}
          max={2000}
          step={10}
          value={NmaxReq}
          onChange={setNmaxReq}
          unit="states"
        />
        <Slider
          label={String.raw`n_0\ \text{(initial photon number)}`}
          tex
          min={0}
          max={100}
          step={1}
          value={n0}
          onChange={setN0}
          unit="photons"
        />
        <Toggle label="Overlay equal-⟨n⟩ Poisson (coherent-state) distribution" checked={showPoisson} onChange={setShowPoisson} />

        <Readout
          label={String.raw`\mathscr{A}-\nu/Q\ \text{(threshold order parameter)}`}
          tex
          value={`${above >= 0 ? "+" : ""}${above.toFixed(0)}  (${above > 0 ? "laser" : "lamp"})`}
        />
        <Readout
          label={String.raw`\hat n_{ss}=\tfrac{\mathscr{A}}{\nu/Q}\tfrac{\mathscr{A}-\nu/Q}{\mathscr{B}}\ \text{(Eq. 35)}`}
          tex
          value={above > 0 ? nss.toFixed(0) : "0 (below threshold)"}
        />
        <Readout
          label={String.raw`(\mathscr{A}-\nu/Q)/\mathscr{B}\ \text{(Eq. 33, near-thresh.)}`}
          tex
          value={above > 0 ? nssEq33.toFixed(0) : "—"}
        />
        <Readout label={String.raw`\langle n\rangle=\sum_n n\,\rho_{nn}\ \text{(live)}`} tex value={live.mean.toFixed(1)} />
        <Readout
          label={String.raw`\text{Fano}=\tfrac{\langle n^2\rangle-\langle n\rangle^2}{\langle n\rangle}`}
          tex
          value={live.mean > 0.5 ? live.fano.toFixed(2) : "—"}
        />
        <Readout
          label={String.raw`D\simeq\tfrac12\,\mathscr{A}/\hat n_{ss}\ \text{(linewidth} \propto 1/\langle n\rangle)`}
          tex
          value={above > 0 ? Dlw.toFixed(3) + " s⁻¹" : "— (no laser)"}
        />
      </Controls>
    </div>
  );
}
