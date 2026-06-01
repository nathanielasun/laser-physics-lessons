"use client";

/**
 * Chapter III — Driven dipole gain/loss sandbox.
 *
 * Integrates the driven, radiatively damped charge-on-a-spring (Eq. 28),
 *   ẍ + 2Γẋ + ω₀² x = (e/m) E₀ cos(ν t),     [we set e/m = 1]
 * started from a PRE-EXCITED state (Eq. 32),
 *   x(0) = x₀ cos φ,   ẋ(0) = -ω₀ x₀ sin φ.
 *
 * The instantaneous power the field does on the charge is
 *   P(t) = e E₀ cos(ν t) · ẋ(t)      [ >0 absorption, <0 emission ]
 * and the cycle-averaged power P̄(t) is a one-drive-period boxcar of P(t).
 *
 * The headline result, Eq. (34) leading term, is overlaid as a dashed curve:
 *   P̄_analytic(t) = -½ e E₀ ω₀ x₀ sin[(ω₀ - ν) t + φ - φ₀],   (φ₀ = 0)
 * which matches the numerics at small E₀ / short t (the regime of the book's
 * sign argument). A side panel shows the steady-state absorption Lorentzian
 * (Eq. 31). RK4 with a fixed sub-step keeps the integration stable; all panels
 * read from precomputed arrays, and an animated canvas sweeps a time cursor.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series } from "@/components/sim";

const TWO_PI = 2 * Math.PI;

export default function Ch03Sim() {
  const [phi, setPhi] = useState(Math.PI / 2); // initial phase of pre-existing oscillation (THE control)
  const [x0, setX0] = useState(1.0); // initial free-oscillation amplitude ("excitation")
  const [nu, setNu] = useState(1.0); // drive frequency (units of ω₀)
  const [omega0, setOmega0] = useState(1.0); // natural frequency
  const [Gamma, setGamma] = useState(0.02); // radiative damping
  const [E0, setE0] = useState(0.1); // drive amplitude (small: the book's regime for the sign argument)
  const [showAnalytic, setShowAnalytic] = useState(true);

  const phi0 = 0; // drive reference phase (field switches on as cos ν t)

  // ── Precompute the trajectory with fixed-step RK4 ─────────────────────────
  const sim = useMemo(() => {
    const om2 = omega0 * omega0;
    // acceleration  a = E0 cos(ν t) - 2Γ ẋ - ω₀² x   (e/m = 1)
    const accel = (t: number, x: number, v: number) =>
      E0 * Math.cos(nu * t) - 2 * Gamma * v - om2 * x;

    // total window: long enough to show free emission decaying into steady absorption
    const T = 120;
    const NOUT = 1400; // stored sample count
    const dtOut = T / NOUT;
    const sub = 12; // RK4 sub-steps per stored sample (dt ≈ 0.007 < 0.01/ω₀)
    const h = dtOut / sub;

    const ts = new Array<number>(NOUT + 1);
    const xs = new Array<number>(NOUT + 1);
    const drive = new Array<number>(NOUT + 1);
    const P = new Array<number>(NOUT + 1);

    let x = x0 * Math.cos(phi);
    let v = -omega0 * x0 * Math.sin(phi);
    let t = 0;

    for (let i = 0; i <= NOUT; i++) {
      ts[i] = t;
      xs[i] = x;
      const d = E0 * Math.cos(nu * t);
      drive[i] = d;
      P[i] = d * v; // P = e E0 cos(ν t) · ẋ   (e = 1)
      // advance one stored step via `sub` RK4 sub-steps
      for (let s = 0; s < sub && i < NOUT; s++) {
        const k1x = v;
        const k1v = accel(t, x, v);
        const k2x = v + 0.5 * h * k1v;
        const k2v = accel(t + 0.5 * h, x + 0.5 * h * k1x, v + 0.5 * h * k1v);
        const k3x = v + 0.5 * h * k2v;
        const k3v = accel(t + 0.5 * h, x + 0.5 * h * k2x, v + 0.5 * h * k2v);
        const k4x = v + h * k3v;
        const k4v = accel(t + h, x + h * k3x, v + h * k3v);
        x += (h / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
        v += (h / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
        t += h;
      }
    }

    // ── Cycle-averaged power: one-drive-period sliding boxcar of P(t) ────────
    const period = TWO_PI / nu;
    const win = Math.max(1, Math.round(period / dtOut));
    const Pbar = new Array<number>(NOUT + 1);
    // prefix sums for an O(N) boxcar
    const pre = new Array<number>(NOUT + 2);
    pre[0] = 0;
    for (let i = 0; i <= NOUT; i++) pre[i + 1] = pre[i] + P[i];
    for (let i = 0; i <= NOUT; i++) {
      const lo = Math.max(0, i - win);
      Pbar[i] = (pre[i + 1] - pre[lo]) / (i - lo + 1);
    }

    // ── Analytic leading term, Eq. (34): P̄ = -½ E0 ω₀ x0 sin[(ω₀-ν)t + φ - φ₀]
    const Panalytic = new Array<number>(NOUT + 1);
    for (let i = 0; i <= NOUT; i++) {
      Panalytic[i] =
        -0.5 * E0 * omega0 * x0 * Math.sin((omega0 - nu) * ts[i] + phi - phi0);
    }

    // running net energy exchanged: ∫ P dt  (positive = absorbed)
    const netEnergy = pre[NOUT + 1] * dtOut;

    // value used for the badge / readout: average of P̄ over the first ~3 windows
    const nEarly = Math.min(NOUT, win * 3);
    let early = 0;
    for (let i = 0; i <= nEarly; i++) early += Pbar[i];
    early /= nEarly + 1;

    return { ts, xs, drive, P, Pbar, Panalytic, dtOut, T, period, netEnergy, earlyPbar: early };
  }, [phi, x0, nu, omega0, Gamma, E0]);

  // ── Steady-state amplitude & phase lag (Eq. 30) ───────────────────────────
  const reDen = omega0 * omega0 - nu * nu;
  const imDen = 2 * Gamma * nu;
  const Xmag = (0.5 * E0) / Math.sqrt(reDen * reDen + imDen * imDen);
  const phaseLag = Math.atan2(imDen, reDen); // arctan(2Γν / (ω₀²-ν²))
  const detune = omega0 - nu;
  const beatPeriod = detune !== 0 ? TWO_PI / Math.abs(detune) : Infinity;
  const emitting = sim.earlyPbar < 0;

  // ── Panel ranges & display scaling ────────────────────────────────────────
  // The drive trace is display-scaled so its PHASE is legible next to x(t),
  // which is amplified by the resonant Q. (Honest cosmetic rescale of E only.)
  const xPeak = sim.xs.reduce((m, x) => Math.max(m, Math.abs(x)), 1e-3);
  const ePeak = sim.drive.reduce((m, d) => Math.max(m, Math.abs(d)), 1e-3);
  const driveScale = ePeak > 0 ? (0.6 * xPeak) / ePeak : 1;
  const xClamp = Math.min(Math.max(0.5, xPeak * 1.2), 8);

  // ── Panel 1: drive E(t) and displacement x(t) ─────────────────────────────
  const driveLines = useMemo<Series[]>(() => {
    return [
      {
        data: sim.ts.map((t, i) => [t, sim.drive[i] * driveScale] as [number, number]),
        color: "#94a3b8",
        width: 1.6,
        label: "drive (scaled)",
      },
      { data: sim.ts.map((t, i) => [t, sim.xs[i]] as [number, number]), color: "#4f46e5", width: 2, label: "x(t)" },
    ];
  }, [sim, driveScale]);

  // ── Panel 2 range (drawn on a Canvas; Plot's fill-to-baseline can't do the
  //     green-below-zero / red-above-zero shading the headline needs) ─────────
  const pAbs = sim.Pbar.reduce((m, p) => Math.max(m, Math.abs(p)), 0);
  const pRange = Math.max(0.2, pAbs * 1.15);

  // Fill between the P̄ curve and the y=0 line: green where P̄<0 (emission),
  // red where P̄>0 (absorption). Overlay the dashed analytic leading term.
  const drawPower = ({ ctx, w, h }: { ctx: CanvasRenderingContext2D; w: number; h: number }) => {
    ctx.clearRect(0, 0, w, h);
    const padL = 48;
    const padR = 12;
    const padT = 12;
    const padB = 34;
    const PW = w - padL - padR;
    const PH = h - padT - padB;
    const sx = (tt: number) => padL + (tt / sim.T) * PW;
    const sy = (val: number) => padT + (1 - (val + pRange) / (2 * pRange)) * PH;
    const y0 = sy(0);

    // signed fills (curve ↔ zero line)
    for (let i = 0; i < sim.ts.length - 1; i++) {
      const x1 = sx(sim.ts[i]);
      const x2 = sx(sim.ts[i + 1]);
      const p1 = sim.Pbar[i];
      const p2 = sim.Pbar[i + 1];
      const mid = 0.5 * (p1 + p2);
      ctx.fillStyle = mid < 0 ? "rgba(22,163,74,0.18)" : "rgba(225,29,72,0.16)";
      ctx.beginPath();
      ctx.moveTo(x1, y0);
      ctx.lineTo(x1, sy(p1));
      ctx.lineTo(x2, sy(p2));
      ctx.lineTo(x2, y0);
      ctx.closePath();
      ctx.fill();
    }

    // zero line
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(padL, y0);
    ctx.lineTo(padL + PW, y0);
    ctx.stroke();

    // analytic overlay (dashed)
    if (showAnalytic) {
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 1.8;
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      for (let i = 0; i < sim.ts.length; i++) {
        const px = sx(sim.ts[i]);
        const py = sy(Math.max(-pRange, Math.min(pRange, sim.Panalytic[i])));
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // numeric P̄ curve
    ctx.strokeStyle = "#1f2733";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < sim.ts.length; i++) {
      const px = sx(sim.ts[i]);
      const py = sy(Math.max(-pRange, Math.min(pRange, sim.Pbar[i])));
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // axis frame + tick labels
    ctx.strokeStyle = "#9aa3b2";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + PH);
    ctx.lineTo(padL + PW, padT + PH);
    ctx.stroke();
    ctx.fillStyle = "#5b6473";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(`+${pRange.toFixed(2)}`, padL - 6, sy(pRange * 0.95));
    ctx.fillText("0", padL - 6, y0);
    ctx.fillText(`-${pRange.toFixed(2)}`, padL - 6, sy(-pRange * 0.95));
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#1f2733";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.fillText("t  (1/ω₀)", padL + PW / 2, h - 4);

    // band labels
    ctx.font = "600 11px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillStyle = "#15803d";
    ctx.fillText("emission  P̄ < 0", padL + 6, padT + PH - 6);
    ctx.fillStyle = "#be123c";
    ctx.fillText("absorption  P̄ > 0", padL + 6, padT + 12);
    if (showAnalytic) {
      ctx.fillStyle = "#d97706";
      ctx.textAlign = "right";
      ctx.fillText("Eq.(34) lead", padL + PW - 6, padT + 12);
    }
  };

  // ── Side panel: steady-state absorption Lorentzian P̄_ss(ν) (Eq. 31) ───────
  const lorentz = useMemo<Series[]>(() => {
    const N = 240;
    const xs: number[] = [];
    const ys: number[] = [];
    const G = Math.max(0.01, Gamma);
    for (let i = 0; i <= N; i++) {
      const v = 0.5 + (1.0 * i) / N; // ν ∈ [0.5, 1.5]
      // (1/8) e² E0² /(m Γ) · Γ² / [(ω₀-ν)² + Γ²]   with e=m=1
      const val = (1 / 8) * (E0 * E0) / G * (G * G) / ((omega0 - v) * (omega0 - v) + G * G);
      xs.push(v);
      ys.push(val);
    }
    return [{ x: xs, y: ys, color: "#0891b2", width: 2.5, fill: true, label: "P̄_ss(ν)" }];
  }, [Gamma, E0, omega0]);
  const lorMax = lorentz[0].y!.reduce((m, y) => Math.max(m, y), 0);

  // ── Animated canvas: time cursor over the drive-vs-displacement view ──────
  const draw = ({ ctx, w, h, t }: { ctx: CanvasRenderingContext2D; w: number; h: number; t: number }) => {
    ctx.clearRect(0, 0, w, h);
    const T = sim.T;
    const tc = (t * 8) % T; // looping cursor time (~15 s per sweep)
    const idx = Math.min(sim.ts.length - 1, Math.max(0, Math.round((tc / T) * (sim.ts.length - 1))));

    const padL = 8;
    const padR = 8;
    const W = w - padL - padR;
    const midY = h * 0.5;
    const sx = (tt: number) => padL + (tt / T) * W;
    const yAmp = Math.max(1e-3, xPeak * 1.25);
    const sy = (val: number) => midY - (val / yAmp) * (h * 0.4);

    // zero line
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, midY);
    ctx.lineTo(w - padR, midY);
    ctx.stroke();

    // drive E(t) — display-scaled so its phase is legible next to x(t)
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < sim.ts.length; i++) {
      const px = sx(sim.ts[i]);
      const py = sy(sim.drive[i] * driveScale);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // displacement x(t)
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < sim.ts.length; i++) {
      const px = sx(sim.ts[i]);
      const py = sy(sim.xs[i]);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // time cursor
    const cx = sx(tc);
    ctx.strokeStyle = "#0f172a";
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(cx, h * 0.08);
    ctx.lineTo(cx, h * 0.92);
    ctx.stroke();
    ctx.setLineDash([]);

    // moving markers: drive dot + charge dot
    const dE = sim.drive[idx] * driveScale;
    const dX = sim.xs[idx];
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.arc(cx, sy(dE), 4, 0, TWO_PI);
    ctx.fill();
    ctx.fillStyle = "#4f46e5";
    ctx.beginPath();
    ctx.arc(cx, sy(dX), 5, 0, TWO_PI);
    ctx.fill();

    // instantaneous power sign at cursor (P = E·ẋ): tint a corner badge
    const pInst = sim.P[idx];
    ctx.fillStyle = pInst < 0 ? "rgba(22,163,74,0.9)" : "rgba(225,29,72,0.9)";
    ctx.font = "600 12px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText(pInst < 0 ? "P(t) < 0  →  into field" : "P(t) > 0  →  into charge", padL + 4, h - 8);

    // legend
    ctx.textAlign = "right";
    ctx.fillStyle = "#4f46e5";
    ctx.fillText("x(t) charge", w - padR - 4, 16);
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("drive (scaled)", w - padR - 4, 32);
  };

  return (
    <div>
      {/* GAIN / LOSS sign badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "0.5rem 0.75rem",
          marginBottom: "0.5rem",
          borderRadius: 8,
          background: emitting ? "#dcfce7" : "#fee2e2",
          border: `1px solid ${emitting ? "#16a34a" : "#e11d48"}`,
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "1rem",
            color: emitting ? "#15803d" : "#be123c",
            letterSpacing: "0.02em",
          }}
        >
          {emitting ? "GAIN — stimulated emission (P̄ < 0)" : "LOSS — absorption (P̄ > 0)"}
        </span>
        <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "#475569" }}>
          early P̄ ≈ {sim.earlyPbar.toFixed(3)}
        </span>
      </div>

      <Canvas width={560} height={200} draw={draw} speed={1} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Drive E(t) &amp; displacement x(t)
          </div>
          <Plot
            width={300}
            height={220}
            xRange={[0, sim.T]}
            yRange={[-xClamp, xClamp]}
            xLabel="t  (1/ω₀)"
            yLabel="amplitude"
            lines={driveLines}
            markers={[{ y: 0, color: "#e2e8f0", dashed: false }]}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Cycle-averaged power P̄(t)
          </div>
          <Canvas
            width={300}
            height={220}
            draw={drawPower}
            animate={false}
            redraw={[sim, pRange, showAnalytic]}
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
          Steady-state absorption Lorentzian P̄_ss(ν) — Eq. (31)
        </div>
        <Plot
          width={560}
          height={200}
          xRange={[0.5, 1.5]}
          yRange={[0, Math.max(1e-3, lorMax * 1.15)]}
          xLabel="drive frequency ν  (units of ω₀)"
          yLabel="P̄_ss"
          lines={lorentz}
          markers={[
            { x: nu, color: "#e11d48", label: "current ν" },
            { x: omega0, color: "#94a3b8", dashed: true, label: "ω₀" },
          ]}
        />
      </div>

      <Controls>
        <Slider
          label={String.raw`\phi\ \text{(initial phase)}`}
          tex
          min={0}
          max={TWO_PI}
          step={0.01}
          value={phi}
          onChange={setPhi}
          unit="rad"
          format={(v) => v.toFixed(2)}
        />
        <Slider
          label={String.raw`x_0\ \text{(excitation)}`}
          tex
          min={0}
          max={2}
          step={0.05}
          value={x0}
          onChange={setX0}
        />
        <Slider
          label={String.raw`\nu\ \text{(drive freq)}`}
          tex
          min={0.5}
          max={1.5}
          step={0.01}
          value={nu}
          onChange={setNu}
          unit="ω₀"
        />
        <Slider
          label={String.raw`\omega_0\ \text{(natural)}`}
          tex
          min={0.8}
          max={1.2}
          step={0.01}
          value={omega0}
          onChange={setOmega0}
        />
        <Slider
          label={String.raw`\Gamma\ \text{(damping)}`}
          tex
          min={0}
          max={0.2}
          step={0.005}
          value={Gamma}
          onChange={setGamma}
          unit="ω₀"
        />
        <Slider
          label={String.raw`E_0\ \text{(drive amp)}`}
          tex
          min={0}
          max={2}
          step={0.05}
          value={E0}
          onChange={setE0}
        />
        <Toggle label="overlay analytic Eq.(34)" checked={showAnalytic} onChange={setShowAnalytic} />
        <Readout
          label={String.raw`|X|\ \text{(steady amp)}`}
          tex
          value={Number.isFinite(Xmag) ? Xmag.toFixed(3) : "∞"}
        />
        <Readout
          label={String.raw`\text{phase lag }\arctan\!\frac{2\Gamma\nu}{\omega_0^2-\nu^2}`}
          tex
          value={`${(phaseLag * (180 / Math.PI)).toFixed(0)}°`}
        />
        <Readout label={String.raw`\text{detuning }\omega_0-\nu`} tex value={detune.toFixed(3)} />
        <Readout
          label={String.raw`\text{beat period }2\pi/|\omega_0-\nu|`}
          tex
          value={Number.isFinite(beatPeriod) ? beatPeriod.toFixed(1) : "∞"}
        />
        <Readout
          label={String.raw`\int P\,dt\ \text{(net: }+\text{abs}/-\text{emit)}`}
          tex
          value={sim.netEnergy.toFixed(2)}
        />
      </Controls>
    </div>
  );
}
