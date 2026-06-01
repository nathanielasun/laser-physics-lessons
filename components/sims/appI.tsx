"use client";

/**
 * Appendix I — General Quantum Laser Equations.
 *
 * We integrate the appendix's core amplitude equations (8)-(9) DIRECTLY for one
 * atom injected in the upper lasing level a, coupled to an n-photon cavity mode:
 *
 *   dC_a/dt = -(γ_a/2) C_a - i g√(n+1) e^{+iΔt} C_b        (Eq. 8)
 *   dC_b/dt = -(γ_b/2) C_b - i g√(n+1) e^{-iΔt} C_a        (Eq. 9)
 *
 * with Δ = ω - ν the atom-field detuning, initial condition C_a(0)=1, C_b(0)=0.
 * The COUPLING carries no ½ (only the DECAY does — the appendix's factor-½ rule).
 *
 * Writing C_a = xa + i ya, C_b = xb + i yb gives 4 real ODEs, solved with RK4.
 * From the integration we read off
 *   P_a(t) = |C_a|^2,  P_b(t) = |C_b|^2,  P_spont(t) = 1 - P_a - P_b,
 *   the running GAIN integral   G_n  = ∫_0^∞ γ_b |C_b(τ)|^2 dτ   (the LOWER-level,
 *     i.e. the photon-raising gain term that multiplies ρ_{n-1,m-1} in Eq. 23), and
 *   the complementary LOSS/no-emission integral  ∫_0^∞ γ_a |C_a(τ)|^2 dτ  (a→c,
 *     the bracket term in Eq. 23).  With one atom injected in a these sum to 1.
 *
 * Generalized Rabi frequency readout (spec):  Ω_n = √((g√(n+1))² + (Δ/2)²).
 *
 * The integration horizon is set by the DECAY timescale (T ≈ 12/min(γ_a,γ_b)),
 * since the γ|C|^2 integrands of Eq. 23 decay on the 1/γ scale and run to ∞.
 * The Rabi period only sets the time STEP (resolution), never the upper limit.
 *
 * Two static Plots (recomputed on slider change) carry the physics:
 *   top   — P_a(τ), P_b(τ), P_spont(τ): damped Rabi flopping + the leak to c,d,
 *   bottom — G_n vs n: the gain SATURATION curve (marker at current n).
 * An animated two-level-atom Canvas adds real-time richness.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Controls, Readout, Series } from "@/components/sim";

// One RK4 trajectory of the 4 real ODEs (xa,ya,xb,yb) from t=0 to t=T.
// Returns sampled times, P_a, P_b, P_spont and the final gain integral.
function integrate(
  g: number,
  nPhot: number,
  ga: number,
  gb: number,
  Delta: number,
  T: number,
  steps: number
) {
  const coup = g * Math.sqrt(nPhot + 1); // g√(n+1), no ½
  const dt = T / steps;

  // derivatives of state s = [xa, ya, xb, yb] at time t
  const deriv = (s: number[], t: number): number[] => {
    const [xa, ya, xb, yb] = s;
    const cp = Math.cos(Delta * t);
    const sp = Math.sin(Delta * t);
    // C_a' = -(γ_a/2)C_a - i*coup*e^{+iΔt}*C_b
    // e^{+iΔt}C_b = (cp+isp)(xb+iyb) = (cp*xb - sp*yb) + i(cp*yb + sp*xb)
    const ebxR = cp * xb - sp * yb;
    const ebxI = cp * yb + sp * xb;
    // -i*coup*(ebxR + i ebxI) = coup*ebxI - i*coup*ebxR
    const dxa = -0.5 * ga * xa + coup * ebxI;
    const dya = -0.5 * ga * ya - coup * ebxR;
    // C_b' = -(γ_b/2)C_b - i*coup*e^{-iΔt}*C_a
    // e^{-iΔt}C_a = (cp-isp)(xa+iya) = (cp*xa + sp*ya) + i(cp*ya - sp*xa)
    const eaxR = cp * xa + sp * ya;
    const eaxI = cp * ya - sp * xa;
    const dxb = -0.5 * gb * xb + coup * eaxI;
    const dyb = -0.5 * gb * yb - coup * eaxR;
    return [dxa, dya, dxb, dyb];
  };

  let s = [1, 0, 0, 0]; // C_a(0)=1, C_b(0)=0
  let t = 0;
  // gain = ∫ γ_b |C_b|^2 dτ  — the LOWER-level (b) integral, i.e. the
  // photon-raising term of Eq. (23): probability the atom transfers to b
  // and emits a photon into the lasing mode (trapezoid).
  let gain = 0;
  // loss = ∫ γ_a |C_a|^2 dτ  — the UPPER-level (a) integral: the
  // complementary no-emission / spontaneous-loss (a→c) term in the bracket.
  let loss = 0;
  let prevPa = 1;
  let prevPb = 0;

  const ts: number[] = [0];
  const Pa: number[] = [1];
  const Pb: number[] = [0];
  const Psp: number[] = [0];

  for (let i = 0; i < steps; i++) {
    const k1 = deriv(s, t);
    const s2 = s.map((v, j) => v + 0.5 * dt * k1[j]);
    const k2 = deriv(s2, t + 0.5 * dt);
    const s3 = s.map((v, j) => v + 0.5 * dt * k2[j]);
    const k3 = deriv(s3, t + 0.5 * dt);
    const s4 = s.map((v, j) => v + dt * k3[j]);
    const k4 = deriv(s4, t + dt);
    s = s.map((v, j) => v + (dt / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
    t += dt;

    const pa = s[0] * s[0] + s[1] * s[1];
    const pb = s[2] * s[2] + s[3] * s[3];
    gain += gb * 0.5 * (prevPb + pb) * dt; // trapezoid on γ_b P_b  (the gain)
    loss += ga * 0.5 * (prevPa + pa) * dt; // trapezoid on γ_a P_a  (no-emission loss)
    prevPa = pa;
    prevPb = pb;

    ts.push(t);
    Pa.push(pa);
    Pb.push(pb);
    Psp.push(Math.max(0, 1 - pa - pb));
  }
  return { ts, Pa, Pb, Psp, gain, loss };
}

// Integration horizon set by the DECAY timescale (the γ|C|² integrals of
// Eq. 23 run to infinity and decay on the 1/γ scale — NOT the Rabi scale).
// The Rabi period only sets the time STEP, never the upper limit.
const GAMMA_FLOOR = 1e-3; // below this we treat decay as effectively zero
const T_NO_DECAY = 400; // large fixed window when γ→0 (integral does not converge)

function horizon(ga: number, gb: number) {
  // The atom drains on the timescale of the SLOWEST open channel. If both
  // decays are open, that is 1/min(γ); if one is zero, the open channel is
  // max(γ). When BOTH vanish the atom never leaves and the integral does not
  // converge — fall back to a large fixed window.
  const gmin = Math.min(ga, gb);
  const gmax = Math.max(ga, gb);
  const rate = gmin > GAMMA_FLOOR ? gmin : gmax; // slowest open channel
  return rate > GAMMA_FLOOR ? 12 / rate : T_NO_DECAY;
}

// Step count: resolution driven by the FASTEST Rabi flopping (≈20 steps per
// Rabi period), clamped so the gainCurve (which calls integrate ~50×) stays cheap.
function stepsFor(
  g: number,
  nPhot: number,
  Delta: number,
  T: number,
  minSteps: number,
  maxSteps: number
) {
  const coup = g * Math.sqrt(nPhot + 1);
  const Omega = Math.sqrt(coup * coup + (Delta / 2) * (Delta / 2));
  const period = Omega > 1e-6 ? (2 * Math.PI) / Omega : T; // one Rabi period
  const dt = period / 20; // ~20 samples per period
  const n = Math.ceil(T / dt);
  return Math.max(minSteps, Math.min(maxSteps, n));
}

export default function AppISim() {
  const [g, setG] = useState(0.3); // Rabi coupling constant (small-signal default)
  const [nPhot, setNPhot] = useState(4); // cavity photon number
  const [ga, setGa] = useState(0.5); // γ_a, decay of upper level a
  const [gb, setGb] = useState(0.5); // γ_b, decay of lower level b
  const [Delta, setDelta] = useState(0.0); // detuning ω - ν

  const coup = g * Math.sqrt(nPhot + 1);
  const Omega = Math.sqrt(coup * coup + (Delta / 2) * (Delta / 2)); // Ω_n
  const T = horizon(ga, gb);
  // Warn only when BOTH decays vanish — then the atom never leaves the lasing
  // manifold and the lifetime integrals genuinely do not converge. (If only one
  // γ is zero, probability still fully drains through the other channel.)
  const noDecay = Math.max(ga, gb) <= GAMMA_FLOOR;

  // ── Top panel: the single-atom trajectory ──────────────────────────────────
  const traj = useMemo(
    () => integrate(g, nPhot, ga, gb, Delta, T, stepsFor(g, nPhot, Delta, T, 400, 4000)),
    [g, nPhot, ga, gb, Delta, T]
  );

  const trajLines = useMemo<Series[]>(() => {
    return [
      { x: traj.ts, y: traj.Pa, color: "#4f46e5", width: 2.5, label: "P_a (upper)" },
      { x: traj.ts, y: traj.Pb, color: "#e11d48", width: 2.5, label: "P_b (lower)" },
      { x: traj.ts, y: traj.Psp, color: "#16a34a", width: 2, dashed: true, label: "P_spont (→c,d)" },
    ];
  }, [traj]);

  // ── Bottom panel: gain saturation curve G_n vs n ───────────────────────────
  const NMAX = 100;
  const gainCurve = useMemo<Series[]>(() => {
    const xs: number[] = [];
    const ys: number[] = [];
    const Tn = horizon(ga, gb); // decay-driven, independent of n
    for (let n = 0; n <= NMAX; n += 2) {
      // step count grows with n (faster Rabi flopping), capped for the ~50 calls
      const { gain } = integrate(g, n, ga, gb, Delta, Tn, stepsFor(g, n, Delta, Tn, 200, 2000));
      xs.push(n);
      ys.push(gain);
    }
    return [{ x: xs, y: ys, color: "#0891b2", width: 2.5, label: "G_n", fill: true }];
  }, [g, ga, gb, Delta]);

  const curGain = traj.gain;
  const gainMax = useMemo(() => {
    const ys = gainCurve[0].y || [];
    return Math.max(1e-3, ...ys, curGain) * 1.1;
  }, [gainCurve, curGain]);

  // ── Animated two-level atom (real-time damped flopping) ─────────────────────
  // We reuse a lightweight closed-form-ish picture by re-integrating to the
  // animation time each frame is overkill; instead we sample the precomputed
  // trajectory by mapping the looping animation clock onto [0, T].
  const draw = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);
    const loopT = Math.max(T, 4);
    const tt = (t * 1.4) % loopT; // animation clock mapped into the trajectory
    // sample trajectory at tt
    const frac = tt / T;
    const idx = Math.min(traj.ts.length - 1, Math.max(0, Math.round(frac * (traj.ts.length - 1))));
    const pa = traj.Pa[idx];
    const pb = traj.Pb[idx];
    const psp = traj.Psp[idx];

    // cavity field wiggle
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const yy =
        h / 2 + 12 * Math.sin(x * 0.05 - t * 6) * Math.exp(-Math.abs(x - w * 0.5) / 200);
      x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
    }
    ctx.stroke();

    const levelX = w * 0.42;
    const yA = h * 0.2;
    const yB = h * 0.62;
    const ySide = h * 0.9;

    const drawLevel = (y: number, pop: number, label: string, color: string, sub: string) => {
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(levelX - 95, y);
      ctx.lineTo(levelX + 95, y);
      ctx.stroke();
      const r = 6 + 30 * pop;
      const grad = ctx.createRadialGradient(levelX, y, 2, levelX, y, r);
      grad.addColorStop(0, color + "cc");
      grad.addColorStop(1, color + "00");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(levelX, y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#1b2330";
      ctx.font = "600 14px ui-sans-serif, system-ui";
      ctx.textAlign = "left";
      ctx.fillText(label, levelX + 104, y - 3);
      ctx.fillStyle = "#5b6473";
      ctx.font = "11px ui-sans-serif, system-ui";
      ctx.fillText(sub, levelX + 104, y + 12);
    };

    drawLevel(yA, pa, "|a⟩  upper", "#4f46e5", `P_a = ${pa.toFixed(2)}`);
    drawLevel(yB, pb, "|b⟩  lower", "#e11d48", `P_b = ${pb.toFixed(2)}`);

    // side-level sink bar (c,d) showing leaked probability
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(levelX - 95, ySide);
    ctx.lineTo(levelX + 95, ySide);
    ctx.stroke();
    ctx.setLineDash([]);
    const r2 = 4 + 26 * psp;
    const g2 = ctx.createRadialGradient(levelX, ySide, 2, levelX, ySide, r2);
    g2.addColorStop(0, "#16a34acc");
    g2.addColorStop(1, "#16a34a00");
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.arc(levelX, ySide, r2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#1b2330";
    ctx.font = "600 13px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("|c⟩,|d⟩  side", levelX + 104, ySide - 2);
    ctx.fillStyle = "#5b6473";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.fillText(`P_spont = ${psp.toFixed(2)}`, levelX + 104, ySide + 12);

    // arrows: lasing a<->b, decays out
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(levelX, yA + 8);
    ctx.lineTo(levelX, yB - 8);
    ctx.stroke();
    ctx.fillStyle = "#4f46e5";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "right";
    ctx.fillText("g√(n+1)", levelX - 8, (yA + yB) / 2);
  };

  return (
    <div>
      <Canvas width={560} height={250} draw={draw} speed={1} redraw={[traj, T]} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Damped Rabi flopping of one atom
          </div>
          <Plot
            width={300}
            height={230}
            xRange={[0, T]}
            yRange={[0, 1]}
            xLabel="τ  (1/g)"
            yLabel="probability"
            lines={trajLines}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Gain saturation:  G_n vs n
          </div>
          <Plot
            width={300}
            height={230}
            xRange={[0, NMAX]}
            yRange={[0, gainMax]}
            xLabel="photon number  n"
            yLabel="gain  G_n"
            lines={gainCurve}
            markers={[
              { x: nPhot, color: "#e11d48", label: "current n" },
              { y: curGain, color: "#94a3b8", dashed: true },
            ]}
          />
        </div>
      </div>

      <Controls>
        <Slider
          label={String.raw`g`}
          tex
          min={0.1}
          max={5}
          step={0.05}
          value={g}
          onChange={setG}
          unit="1/t"
        />
        <Slider
          label={String.raw`n`}
          tex
          min={0}
          max={100}
          step={1}
          value={nPhot}
          onChange={(v) => setNPhot(Math.round(v))}
          unit="photons"
        />
        <Slider
          label={String.raw`\gamma_a`}
          tex
          min={0}
          max={3}
          step={0.05}
          value={ga}
          onChange={setGa}
          unit="1/t"
        />
        <Slider
          label={String.raw`\gamma_b`}
          tex
          min={0}
          max={3}
          step={0.05}
          value={gb}
          onChange={setGb}
          unit="1/t"
        />
        <Slider
          label={String.raw`\Delta=\omega-\nu`}
          tex
          min={-10}
          max={10}
          step={0.1}
          value={Delta}
          onChange={setDelta}
          unit="1/t"
        />
        <Readout
          label={String.raw`g\sqrt{n+1}`}
          tex
          value={coup.toFixed(2)}
        />
        <Readout
          label={String.raw`\Omega_n=\sqrt{(g\sqrt{n+1})^2+(\Delta/2)^2}`}
          tex
          value={`${Omega.toFixed(2)} /t`}
        />
        <Readout
          label={String.raw`G_n=\int_0^\infty\gamma_b|C_b|^2 d\tau`}
          tex
          value={curGain.toFixed(3)}
        />
        <Readout
          label={String.raw`\text{loss}=\int_0^\infty\gamma_a|C_a|^2 d\tau`}
          tex
          value={traj.loss.toFixed(3)}
        />
        {noDecay && (
          <Readout
            label={String.raw`\text{note}`}
            tex
            value="γ→0: integral does not converge"
          />
        )}
      </Controls>
    </div>
  );
}
