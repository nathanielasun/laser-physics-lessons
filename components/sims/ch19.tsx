"use client";

/**
 * Chapter XIX — Langevin Brownian integrator (Reservoir theory).
 *
 * A literal Euler–Maruyama discretization of the classical Langevin equation
 * (Eq. 4):
 *     m dv = -m Γ v dt + F_n,   <F_n(t)F_n(t')> = 2 D_vv δ(t-t')   (Eqs. 3,6)
 * The per-step kick is  sqrt(2 D_vv dt)/m · η,  η ~ N(0,1) (Box–Muller),
 * which reproduces the delta-correlation in the continuum limit.
 *
 * FD-LOCK toggle:  on  ⇒  D_vv = m Γ k_B T            (Eq. 22)
 *                  off ⇒  D_vv is a free slider — equilibrium width then
 *                         no longer matches the bath temperature.
 * Equilibrium:  <v²>_eq = D_vv/(m² Γ);  locked ⇒ k_B T/m  (Eqs. 21–22).
 * Analytic overlay:  <v²>(t) = <v²>_eq (1 − e^{−2Γt})    (Eqs. 19/20).
 * Effective temperature:  T_eff = m<v²>/k_B  (= T only when locked).
 *
 * QUANTUM mode swaps panel 3 for the deterministic photon-number relaxation
 *     d/dt <A†A> = −γ<A†A> + γ n̄        (Eq. 45),  steady state n̄.
 * The (n̄+1) vacuum floor is annotated as the noise that persists at T = 0.
 *
 * We set Boltzmann's constant k_B = 1 in "arb" units for clean scaling.
 *
 * Three linked panels are drawn inside one animated Canvas:
 *   (1) spaghetti of N velocity trajectories v(t),
 *   (2) live histogram of instantaneous velocities + Maxwell–Boltzmann target,
 *   (3) <v²>(t) data vs the analytic curve & equipartition line — OR, in
 *       quantum mode, <A†A>(t) vs the target n̄.
 *
 * All evolving state lives in refs; Reset is detected by watching t drop to ~0.
 */

import { useRef, useState } from "react";
import { Canvas, Slider, Toggle, Segmented, Readout, Controls } from "@/components/sim";

const KB = 1; // Boltzmann constant in arb units

// ── Gaussian sampler (Box–Muller) ──────────────────────────────────────────
function gaussian(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

type Mode = "classical" | "quantum";

export default function Ch19Sim() {
  const [gamma, setGamma] = useState(1.0); // Γ  velocity damping rate (1/s)
  const [temp, setTemp] = useState(300); // T  reservoir temperature (K)
  const [mass, setMass] = useState(1.0); // m  particle mass (arb)
  const [nTraj, setNTraj] = useState(500); // N  ensemble size
  const [dtStep, setDtStep] = useState(0.01); // dt integration step (s)
  const [dvvManual, setDvvManual] = useState(5.0); // D_vv when FD-lock OFF
  const [nbar, setNbar] = useState(2.0); // n̄  thermal occupation (quantum)
  const [fdLock, setFdLock] = useState(true); // fluctuation–dissipation lock
  const [mode, setMode] = useState<Mode>("classical");

  // Effective diffusion coefficient (locked vs manual).
  const dvv = fdLock ? mass * gamma * KB * temp : dvvManual;
  // Equilibrium mean-square velocity and equipartition target.
  const v2eq = dvv / (mass * mass * gamma); // <v²>_eq = D_vv/(m²Γ)
  const v2target = (KB * temp) / mass; // equipartition k_B T / m
  const sigmaV = Math.sqrt(Math.max(v2eq, 1e-12)); // ensemble width
  const sigmaTarget = Math.sqrt(Math.max(v2target, 1e-12)); // M–B width
  const dtWarn = dtStep * gamma > 0.1; // accuracy guard

  // ── evolving state (refs survive across frames; immune to Canvas redraw) ──
  const vRef = useRef<number[]>([]); // length-N velocities
  const histRef = useRef<{ t: number; v2: number }[]>([]); // <v²>(t) trace
  const qHistRef = useRef<{ t: number; n: number }[]>([]); // <A†A>(t) trace
  const trajRef = useRef<number[][]>([]); // rolling v(t) history of a few tracked particles
  const nQRef = useRef(0); // quantum mean photon number
  const tElapsedRef = useRef(0); // physics time accumulated
  const lastTRef = useRef(0); // detect Canvas reset
  const initNRef = useRef(nTraj); // ensemble size at last (re)init
  const frameCountRef = useRef(0); // throttle re-renders for live readouts

  const TRACKED = 18; // number of trajectories drawn as spaghetti
  const TRAJ_LEN = 160; // points kept per tracked trajectory

  // a throttled tick so the live <Readout> chips (T_eff, σ_v, quantum n)
  // re-render from the refs the animation loop mutates.
  const [, setTick] = useState(0);

  const initEnsemble = () => {
    const arr = new Array<number>(nTraj).fill(0); // start from rest, v = 0
    vRef.current = arr;
    histRef.current = [{ t: 0, v2: 0 }];
    qHistRef.current = [{ t: 0, n: 0 }];
    trajRef.current = Array.from({ length: TRACKED }, () => [0]);
    nQRef.current = 0;
    tElapsedRef.current = 0;
    initNRef.current = nTraj;
  };

  const draw = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);

    // Reset detection: Canvas zeroes t on ↺; also reinit if N changed.
    if (t < lastTRef.current - 1e-9 || vRef.current.length === 0 || initNRef.current !== nTraj) {
      initEnsemble();
    }
    lastTRef.current = t;

    // ── advance the physics one slider-dt per animation frame ──────────────
    const v = vRef.current;
    const kick = Math.sqrt(2 * dvv * dtStep) / mass; // EM noise amplitude
    const decay = gamma * dtStep;
    for (let i = 0; i < v.length; i++) {
      v[i] += -decay * v[i] + kick * gaussian();
    }
    tElapsedRef.current += dtStep;

    // record per-particle trajectory history for the first TRACKED particles
    const traj = trajRef.current;
    for (let i = 0; i < traj.length; i++) {
      const idx = Math.min(i, v.length - 1);
      traj[i].push(v[idx] ?? 0);
      if (traj[i].length > TRAJ_LEN) traj[i].shift();
    }

    // ensemble mean-square velocity
    let s2 = 0;
    for (let i = 0; i < v.length; i++) s2 += v[i] * v[i];
    const v2 = v.length ? s2 / v.length : 0;
    histRef.current.push({ t: tElapsedRef.current, v2 });
    if (histRef.current.length > 1600) histRef.current.shift();

    // quantum deterministic ODE: d/dt<A†A> = −γ<A†A> + γ n̄
    nQRef.current += dtStep * (-gamma * nQRef.current + gamma * nbar);
    qHistRef.current.push({ t: tElapsedRef.current, n: nQRef.current });
    if (qHistRef.current.length > 1600) qHistRef.current.shift();

    // throttled re-render so live readout chips track the refs (~6/s)
    if (++frameCountRef.current % 10 === 0) setTick((c) => c + 1);

    // ── layout: three columns ──────────────────────────────────────────────
    const gap = 16;
    const colW = (w - 4 * gap) / 3;
    const topY = 26;
    const panH = h - topY - 30;
    const x1 = gap;
    const x2 = gap * 2 + colW;
    const x3 = gap * 3 + colW * 2;

    ctx.font = "600 12px ui-sans-serif, system-ui, sans-serif";
    ctx.fillStyle = "#1b2330";
    ctx.textAlign = "left";
    ctx.fillText("trajectories  v(t)  →", x1, 16);
    ctx.fillText("velocity histogram", x2, 16);
    ctx.fillText(mode === "classical" ? "moment  ⟨v²⟩(t)" : "photon no.  ⟨A†A⟩(t)", x3, 16);

    const frame = (x: number) => {
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, topY, colW, panH);
    };
    frame(x1);
    frame(x2);
    frame(x3);

    // velocity display scale: ±4σ of the target (so M–B fills the panel)
    const vMax = 4 * Math.max(sigmaTarget, sigmaV, 1e-6);

    // ── panel 1: trajectory spaghetti v(t) ──────────────────────────────────
    // Each tracked particle's rolling history is a line; the cloud starts at
    // v = 0 (left), spreads, and saturates — the visual of relaxation to M–B.
    const mid1 = topY + panH / 2;
    // zero-velocity axis
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x1, mid1);
    ctx.lineTo(x1 + colW, mid1);
    ctx.stroke();
    const traj1 = trajRef.current;
    for (let p = 0; p < traj1.length; p++) {
      const hist = traj1[p];
      if (hist.length < 2) continue;
      ctx.strokeStyle = "rgba(79,70,229,0.32)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let k = 0; k < hist.length; k++) {
        const xx = x1 + 2 + (k / (TRAJ_LEN - 1)) * (colW - 4);
        const yy = mid1 - (hist[k] / vMax) * (panH / 2 - 4);
        const yc = Math.max(topY + 2, Math.min(topY + panH - 2, yy));
        k === 0 ? ctx.moveTo(xx, yc) : ctx.lineTo(xx, yc);
      }
      ctx.stroke();
    }
    ctx.fillStyle = "#5b6473";
    ctx.font = "10px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("+v", x1 + colW - 4, topY + 10);
    ctx.fillText("−v", x1 + colW - 4, topY + panH - 4);

    // ── panel 2: histogram + Maxwell–Boltzmann target ───────────────────────
    const nBins = 31;
    const bins = new Array<number>(nBins).fill(0);
    for (let i = 0; i < v.length; i++) {
      const b = Math.floor(((v[i] + vMax) / (2 * vMax)) * nBins);
      if (b >= 0 && b < nBins) bins[b]++;
    }
    const binW = colW / nBins;
    // M–B Gaussian on the same axis, peak-normalized for overlay
    const mbPeak = 1;
    const baseY = topY + panH - 2;
    // histogram bars, normalized so the modal bin fills ~85% of the panel
    let maxBin = 1;
    for (let b = 0; b < nBins; b++) maxBin = Math.max(maxBin, bins[b]);
    for (let b = 0; b < nBins; b++) {
      const bh = (bins[b] / maxBin) * (panH - 6) * 0.85;
      ctx.fillStyle = "rgba(79,70,229,0.45)";
      ctx.fillRect(x2 + b * binW + 0.5, baseY - bh, binW - 1, bh);
    }
    // target M–B curve (Gaussian, width sigmaTarget) peak-normalized to 0.85
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let p = 0; p <= 80; p++) {
      const vv = -vMax + (2 * vMax * p) / 80;
      const g = Math.exp(-(vv * vv) / (2 * sigmaTarget * sigmaTarget)) / mbPeak;
      const xx = x2 + ((vv + vMax) / (2 * vMax)) * colW;
      const yy = baseY - g * (panH - 6) * 0.85;
      p === 0 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy);
    }
    ctx.stroke();
    ctx.fillStyle = "#e11d48";
    ctx.font = "10px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("M–B target", x2 + 4, topY + 12);

    // ── panel 3: moment trace ───────────────────────────────────────────────
    const tWin = Math.max(5 / gamma, tElapsedRef.current, 1e-3); // rolling window
    const sxT = (tt: number) => x3 + (tt / tWin) * colW;
    if (mode === "classical") {
      const yMax = Math.max(v2eq, v2target, 1e-6) * 1.3;
      const syV = (val: number) => baseY - (val / yMax) * (panH - 6);
      // equipartition reference line k_B T / m
      ctx.strokeStyle = "#94a3b8";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x3, syV(v2target));
      ctx.lineTo(x3 + colW, syV(v2target));
      ctx.stroke();
      ctx.setLineDash([]);
      // analytic overlay <v²>(t) = v2eq (1 − e^{−2Γt})
      ctx.strokeStyle = "#0891b2";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let p = 0; p <= 120; p++) {
        const tt = (tWin * p) / 120;
        const val = v2eq * (1 - Math.exp(-2 * gamma * tt));
        const xx = sxT(tt);
        const yy = syV(val);
        p === 0 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy);
      }
      ctx.stroke();
      // ensemble data points
      ctx.fillStyle = "rgba(79,70,229,0.7)";
      const hist = histRef.current;
      const stride = Math.max(1, Math.floor(hist.length / 90));
      for (let i = 0; i < hist.length; i += stride) {
        const xx = sxT(hist[i].t);
        const yy = syV(hist[i].v2);
        if (xx <= x3 + colW) {
          ctx.beginPath();
          ctx.arc(xx, Math.max(topY + 2, Math.min(baseY, yy)), 1.6, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("k_B T/m", x3 + colW - 4, syV(v2target) - 4);
      ctx.fillStyle = "#0891b2";
      ctx.textAlign = "left";
      ctx.fillText("⟨v²⟩_eq", x3 + 4, syV(v2eq) - 4);
    } else {
      const yMax = Math.max(nbar, 1e-6) * 1.4;
      const syN = (val: number) => baseY - (val / yMax) * (panH - 6);
      // target n̄
      ctx.strokeStyle = "#94a3b8";
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x3, syN(nbar));
      ctx.lineTo(x3 + colW, syN(nbar));
      ctx.stroke();
      // vacuum noise-strength reference n̄+1 = ⟨FF†⟩/γ (survives at T=0),
      // a *reference level*, not where ⟨A†A⟩ settles (it relaxes to n̄).
      ctx.strokeStyle = "#d97706";
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.moveTo(x3, syN(nbar + 1));
      ctx.lineTo(x3 + colW, syN(nbar + 1));
      ctx.stroke();
      ctx.setLineDash([]);
      // analytic / integrated <A†A>(t) = n̄(1 − e^{−γt})
      ctx.strokeStyle = "#0891b2";
      ctx.lineWidth = 2;
      ctx.beginPath();
      const qh = qHistRef.current;
      const stride = Math.max(1, Math.floor(qh.length / 200));
      let started = false;
      for (let i = 0; i < qh.length; i += stride) {
        const xx = sxT(qh[i].t);
        const yy = syN(qh[i].n);
        if (xx <= x3 + colW) {
          started ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy);
          started = true;
        }
      }
      ctx.stroke();
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("n̄", x3 + colW - 4, syN(nbar) - 4);
      ctx.fillStyle = "#d97706";
      ctx.fillText("n̄+1 = ⟨FF†⟩/γ  (T=0 noise)", x3 + colW - 4, syN(nbar + 1) - 4);
    }
  };

  // ensemble <v²> for live readouts (read the latest history entry)
  const lastV2 = histRef.current.length ? histRef.current[histRef.current.length - 1].v2 : 0;
  const tEff = (mass * lastV2) / KB; // T_eff = m<v²>/k_B

  return (
    <div>
      <Canvas
        width={640}
        height={260}
        draw={draw}
        speed={1}
        // redraw deps so static params take effect even while paused
        redraw={[gamma, temp, mass, nTraj, dtStep, dvvManual, nbar, fdLock, mode]}
      />

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", margin: "0.75rem 0 0.25rem" }}>
        <Toggle
          label={
            <span>
              FD-lock: <em>D</em>
              <sub>vv</sub> = mΓk
              <sub>B</sub>T
            </span>
          }
          checked={fdLock}
          onChange={setFdLock}
        />
        <Segmented
          options={[
            { value: "classical", label: "Classical ⟨v²⟩" },
            { value: "quantum", label: "Quantum ⟨A†A⟩" },
          ]}
          value={mode}
          onChange={(v) => setMode(v as Mode)}
        />
      </div>

      <Controls>
        <Slider
          label={String.raw`\Gamma`}
          tex
          min={0.1}
          max={10}
          step={0.1}
          value={gamma}
          onChange={setGamma}
          unit="1/s"
        />
        <Slider label={String.raw`T`} tex min={0} max={500} step={5} value={temp} onChange={setTemp} unit="K" />
        <Slider label={String.raw`m`} tex min={0.1} max={10} step={0.1} value={mass} onChange={setMass} unit="arb" />
        <Slider
          label={String.raw`N`}
          tex
          min={1}
          max={2000}
          step={1}
          value={nTraj}
          onChange={setNTraj}
          unit="traj"
        />
        <Slider
          label={String.raw`\Delta t`}
          tex
          min={0.001}
          max={0.1}
          step={0.001}
          value={dtStep}
          onChange={setDtStep}
          unit="s"
        />
        {!fdLock ? (
          <Slider
            label={String.raw`D_{vv}\;(\text{manual})`}
            tex
            min={0}
            max={20}
            step={0.1}
            value={dvvManual}
            onChange={setDvvManual}
            unit="arb"
          />
        ) : null}
        {mode === "quantum" ? (
          <Slider
            label={String.raw`\bar n`}
            tex
            min={0}
            max={20}
            step={0.5}
            value={nbar}
            onChange={setNbar}
            unit="count"
          />
        ) : null}

        <Readout label={String.raw`D_{vv}`} tex value={dvv.toFixed(2)} />
        <Readout label={String.raw`\langle v^2\rangle_{\mathrm{eq}}=D_{vv}/(m^2\Gamma)`} tex value={v2eq.toFixed(2)} />
        <Readout label={String.raw`k_B T/m\ (\text{equipartition})`} tex value={v2target.toFixed(2)} />
        <Readout label={String.raw`\sigma_v\ \text{vs}\ \sqrt{k_BT/m}`} tex value={`${sigmaV.toFixed(2)} / ${sigmaTarget.toFixed(2)}`} />
        <Readout label={String.raw`T_{\mathrm{eff}}=m\langle v^2\rangle/k_B`} tex value={`${tEff.toFixed(0)} K`} />
        {mode === "quantum" ? (
          <Readout label={String.raw`\langle A^\dagger A\rangle\to\bar n`} tex value={`${nQRef.current.toFixed(2)} → ${nbar.toFixed(1)}`} />
        ) : null}
        <Readout
          label={String.raw`\Gamma\,\Delta t\ (\text{keep}\ll 1)`}
          tex
          value={dtWarn ? `${(dtStep * gamma).toFixed(2)} ⚠` : (dtStep * gamma).toFixed(3)}
        />
      </Controls>
    </div>
  );
}
