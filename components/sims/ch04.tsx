"use client";

/**
 * Chapter IV — Van der Pol laser-oscillator sandbox.
 *
 * GROUND TRUTH: the full driven Van der Pol equation, written in the book's
 * d/dt (derivative) convention so the cubic coefficient is 3β' (Eq. 1 / Eq. 33):
 *
 *     v̈ = (α − 3β' v²) v̇ − ω² v + ν² V₀ sin(ν t).
 *
 * Reducing this by the slowly-varying-amplitude (SVA) method gives the envelope
 * with β = ¾β' (Eqs. 6 / 36-37):
 *
 *     V̇ = ½(α − βV²)V − ½ ν V₀ cosΨ,        β = ¾β'
 *     Ψ̇ = (ω − ν) + ½ ν (V₀/V) sinΨ  =  d + l sinΨ.
 *
 * Because β = ¾β' is matched to the full-ODE cubic 3β', BOTH models settle to the
 * SAME limit cycle |V|² = α/β = 4α/(3β'). The student can therefore overlay them
 * and see SVA is excellent for α ≪ ω and begins to break down (overshoot) for
 * α ≳ ω, with pronounced relaxation spiking only for α ≫ ω — the full 2nd-order
 * ODE overshoots and undergoes relaxation oscillations, which the monotonic 1-D
 * envelope flow cannot reproduce.
 *
 * Panels:
 *   • status badge — measured √(α/β) vs analytic, regime label, LOCKED/UNLOCKED.
 *   • animated phase plane (v, v̇/ω): spirals out from the seed onto the limit
 *     cycle (near-circle for α≪ω, sharp relaxation loop for α≫ω). When driven we
 *     also draw the reduced envelope orbit (V cosΨ, V sinΨ) — the rotating frame,
 *     in which locking shows as a fixed point and unlocked as slow circulation.
 *   • time series v(t) with the SVA envelope ±V(t) and the dashed √(α/β) line.
 *   • Adler phase-line inset Ψ̇ = d + l sinΨ with its fixed points.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series } from "@/components/sim";

const TWO_PI = 2 * Math.PI;

export default function Ch04Sim() {
  const [alpha, setAlpha] = useState(0.5); // small-signal gain α
  const [betaP, setBetaP] = useState(1.0); // raw saturation coefficient β'  (envelope uses β = ¾β')
  const [omega, setOmega] = useState(6.0); // natural frequency ω
  const [V0, setV0] = useState(0.0); // external drive amplitude (0 = free oscillator)
  const [nu, setNu] = useState(6.0); // drive frequency ν
  const [v0seed, setV0seed] = useState(0.01); // initial seed ("noise")
  const [showEnvelope, setShowEnvelope] = useState(true);

  const beta = 0.75 * betaP; // envelope saturation coefficient β = ¾β'
  const Vss = Math.sqrt(alpha / beta); // analytic steady amplitude √(α/β)

  // ── Integrate the full driven ODE (RK4) + the reduced SVA envelope/phase ────
  const sim = useMemo(() => {
    // Stiffness knob: in the relaxation (spiking) regime the fast gain-driven
    // jumps scale with α/ω, and the slow recovery between spikes lengthens the
    // relaxation period (≈ several α/ω² in scaled units).
    const stiff = Math.max(1, alpha / omega);

    // Time window scaled to resolve both the growth (rate α) and the carrier (ω),
    // and to capture SEVERAL spike periods when stiff so the late window is
    // visibly periodic rather than catching a single jump.
    const growthTime = (2 / Math.max(alpha, 0.05)) * Math.log(Math.max(Vss, 1e-3) / v0seed + 1);
    const Tbase = Math.max(growthTime * 1.6, 40 / omega + 30);
    const T = Math.min(Tbase * (stiff > 1.5 ? 1 + 0.6 * stiff : 1), 1200);

    const NOUT = 1600; // stored samples
    const dtOut = T / NOUT;
    // Substeps: resolve the fast carrier ω AND the relaxation jumps. The jump
    // stiffness ∝ α/ω, so scale the per-sample substeps with it (not a fixed +).
    const sub = Math.max(8, Math.ceil(((dtOut * omega) / 0.06) * stiff));
    const h = dtOut / sub;

    const ts = new Array<number>(NOUT + 1);
    const vs = new Array<number>(NOUT + 1); // full ODE displacement v(t)
    const dvs = new Array<number>(NOUT + 1); // full ODE velocity v̇(t)
    const Venv = new Array<number>(NOUT + 1); // SVA envelope |V(t)|
    const Psi = new Array<number>(NOUT + 1); // SVA phase Ψ(t)

    // full ODE acceleration (drive at ν, amplitude ν²V₀)
    const accel = (t: number, v: number, dv: number) =>
      (alpha - 3 * betaP * v * v) * dv - omega * omega * v + nu * nu * V0 * Math.sin(nu * t);

    // start the full oscillator from the seed amplitude, at rest in velocity
    let v = v0seed;
    let dv = 0;

    // reduced envelope: start with amplitude = seed, phase = 0
    // V̇ = ½(α − βV²)V − ½ν V₀ cosΨ ;  Ψ̇ = (ω−ν) + ½ν (V₀/V) sinΨ
    let Ve = v0seed;
    let ps = 0;
    const dEnv = (Ve: number, ps: number) => {
      const dV = 0.5 * (alpha - beta * Ve * Ve) * Ve - 0.5 * nu * V0 * Math.cos(ps);
      const dP = omega - nu + 0.5 * nu * (V0 / Math.max(Ve, 1e-4)) * Math.sin(ps);
      return [dV, dP] as [number, number];
    };

    let t = 0;
    for (let i = 0; i <= NOUT; i++) {
      ts[i] = t;
      vs[i] = v;
      dvs[i] = dv;
      Venv[i] = Ve;
      Psi[i] = ps;
      for (let s = 0; s < sub && i < NOUT; s++) {
        // RK4 — full second-order ODE
        const k1v = dv;
        const k1a = accel(t, v, dv);
        const k2v = dv + 0.5 * h * k1a;
        const k2a = accel(t + 0.5 * h, v + 0.5 * h * k1v, dv + 0.5 * h * k1a);
        const k3v = dv + 0.5 * h * k2a;
        const k3a = accel(t + 0.5 * h, v + 0.5 * h * k2v, dv + 0.5 * h * k2a);
        const k4v = dv + h * k3a;
        const k4a = accel(t + h, v + h * k3v, dv + h * k3a);
        v += (h / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
        dv += (h / 6) * (k1a + 2 * k2a + 2 * k3a + k4a);

        // RK4 — reduced envelope/phase
        const [e1V, e1P] = dEnv(Ve, ps);
        const [e2V, e2P] = dEnv(Ve + 0.5 * h * e1V, ps + 0.5 * h * e1P);
        const [e3V, e3P] = dEnv(Ve + 0.5 * h * e2V, ps + 0.5 * h * e2P);
        const [e4V, e4P] = dEnv(Ve + h * e3V, ps + h * e3P);
        Ve += (h / 6) * (e1V + 2 * e2V + 2 * e3V + e4V);
        ps += (h / 6) * (e1P + 2 * e2P + 2 * e3P + e4P);
        t += h;
      }
    }

    // measured steady amplitude: max |v| over a LATE window (last 20%)
    const lateStart = Math.floor(NOUT * 0.8);
    let measMax = 0;
    for (let i = lateStart; i <= NOUT; i++) measMax = Math.max(measMax, Math.abs(vs[i]));

    // phase-plane extent (full ODE): max |v| and max |v̇/ω| anywhere after a brief settle
    let pvMax = 1e-3;
    let pwMax = 1e-3;
    const afterSeed = Math.floor(NOUT * 0.05);
    for (let i = afterSeed; i <= NOUT; i++) {
      pvMax = Math.max(pvMax, Math.abs(vs[i]));
      pwMax = Math.max(pwMax, Math.abs(dvs[i] / omega));
    }
    const ext = Math.max(pvMax, pwMax) * 1.12;

    return { ts, vs, dvs, Venv, Psi, dtOut, T, measMax, ext, lateStart };
  }, [alpha, betaP, omega, V0, nu, v0seed, beta, Vss]);

  // ── Locking diagnostics (Adler) — evaluate with V ≈ √(α/β) ─────────────────
  const d = omega - nu; // detuning
  const Vlock = Math.max(Vss, 1e-3); // amplitude used in l = ½ν V₀/V
  const l = 0.5 * nu * (V0 / Vlock); // locking coefficient
  const driven = V0 > 1e-6;
  const locked = driven && Math.abs(d) <= Math.abs(l) + 1e-12;
  // stable locked phase: π − arcsin(−d/l), wrapped into (−π, π]. The bare
  // arcsin root lies in [−π/2, π/2] where cosΨ*≥0 (l>0) and is UNSTABLE.
  const psiStar = (() => {
    if (!locked || l === 0) return NaN;
    const a = Math.asin(Math.max(-1, Math.min(1, -d / l)));
    const s = Math.PI - a;
    return s > Math.PI ? s - TWO_PI : s;
  })();
  // beat period when unlocked: T_beat = 2π / √(d² − l²)
  const beatPeriod = driven && !locked ? TWO_PI / Math.sqrt(Math.max(d * d - l * l, 1e-9)) : Infinity;

  // regime bands: pronounced spiking needs α ≫ ω (Lamb p78), not merely α ≳ ω.
  // α/ω ≥ 1 is where SVA overshoot begins (relaxation onset / strongly distorted
  // limit cycle); true sawtooth-like relaxation spiking appears for α/ω ≳ 3–4.
  const ratio = alpha / omega;
  const spiking = ratio >= 3.5; // top tier: pronounced relaxation spiking (α ≫ ω)
  const relaxOnset = !spiking && ratio >= 1; // overshoot / strongly distorted limit cycle
  const regimeLabel = spiking
    ? "relaxation oscillations (spiking)"
    : relaxOnset
    ? "relaxation onset — strongly distorted limit cycle"
    : ratio > 0.35
    ? "soft excitation — distorted limit cycle"
    : "soft excitation — sinusoidal limit cycle";

  const measVsAnalytic = Vss > 1e-6 ? (sim.measMax / Vss) * 100 : 0;

  // ── Animated phase-plane (v, v̇/ω) ──────────────────────────────────────────
  const drawPhase = ({ ctx, w, h, t }: { ctx: CanvasRenderingContext2D; w: number; h: number; t: number }) => {
    ctx.clearRect(0, 0, w, h);
    const E = sim.ext;
    const cx = w * 0.5;
    const cy = h * 0.5;
    const R = Math.min(w, h) * 0.42;
    const px = (vv: number) => cx + (vv / E) * R;
    const py = (ww: number) => cy - (ww / E) * R;

    // axes
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - R, cy);
    ctx.lineTo(cx + R, cy);
    ctx.moveTo(cx, cy - R);
    ctx.lineTo(cx, cy + R);
    ctx.stroke();
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "right";
    ctx.fillText("v", cx + R - 2, cy + 14);
    ctx.textAlign = "left";
    ctx.fillText("v̇/ω", cx + 6, cy - R + 4);

    // analytic limit-cycle reference circle (radius √(α/β))
    ctx.strokeStyle = "#d97706";
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, (Vss / E) * R, 0, TWO_PI);
    ctx.stroke();
    ctx.setLineDash([]);

    // full-ODE trajectory up to a looping cursor time
    const tc = (t * (sim.T / 12)) % sim.T; // ~12 s per full sweep
    const idx = Math.min(sim.ts.length - 1, Math.max(0, Math.round((tc / sim.T) * (sim.ts.length - 1))));
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let i = 0; i <= idx; i++) {
      const X = px(sim.vs[i]);
      const Y = py(sim.dvs[i] / omega);
      i === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
    }
    ctx.stroke();
    // moving point
    ctx.fillStyle = "#4f46e5";
    ctx.beginPath();
    ctx.arc(px(sim.vs[idx]), py(sim.dvs[idx] / omega), 4.5, 0, TWO_PI);
    ctx.fill();

    // reduced envelope orbit (rotating frame) when driven: (V cosΨ, V sinΨ)
    if (driven) {
      ctx.strokeStyle = "#0891b2";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let i = 0; i <= idx; i++) {
        const X = px(sim.Venv[i] * Math.cos(sim.Psi[i]));
        const Y = py(sim.Venv[i] * Math.sin(sim.Psi[i]));
        i === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
      }
      ctx.stroke();
      ctx.fillStyle = "#0891b2";
      ctx.beginPath();
      ctx.arc(
        px(sim.Venv[idx] * Math.cos(sim.Psi[idx])),
        py(sim.Venv[idx] * Math.sin(sim.Psi[idx])),
        4,
        0,
        TWO_PI
      );
      ctx.fill();
    }

    // seed marker
    ctx.fillStyle = "#94a3b8";
    ctx.beginPath();
    ctx.arc(px(sim.vs[0]), py(sim.dvs[0] / omega), 3, 0, TWO_PI);
    ctx.fill();

    // legend
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillStyle = "#4f46e5";
    ctx.fillText("full ODE  (v, v̇/ω)", 8, 16);
    if (driven) {
      ctx.fillStyle = "#0891b2";
      ctx.fillText("envelope (V cosΨ, V sinΨ)", 8, 32);
    }
    ctx.fillStyle = "#d97706";
    ctx.textAlign = "right";
    ctx.fillText("√(α/β) limit cycle", w - 8, 16);
  };

  // ── Time series v(t) + envelope ±V(t) (static, redraw on slider change) ─────
  const drawTime = ({ ctx, w, h }: { ctx: CanvasRenderingContext2D; w: number; h: number }) => {
    ctx.clearRect(0, 0, w, h);
    const padL = 44;
    const padR = 12;
    const padT = 12;
    const padB = 30;
    const PW = w - padL - padR;
    const PH = h - padT - padB;
    const yAmp = Math.max(sim.ext, Vss * 1.1, 1e-3);
    const sx = (tt: number) => padL + (tt / sim.T) * PW;
    const sy = (val: number) => padT + (1 - (val + yAmp) / (2 * yAmp)) * PH;

    // zero line
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, sy(0));
    ctx.lineTo(padL + PW, sy(0));
    ctx.stroke();

    // analytic √(α/β) levels (dashed)
    ctx.strokeStyle = "#d97706";
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1.3;
    [Vss, -Vss].forEach((lv) => {
      ctx.beginPath();
      ctx.moveTo(padL, sy(lv));
      ctx.lineTo(padL + PW, sy(lv));
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // full-ODE v(t)
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let i = 0; i < sim.ts.length; i++) {
      const X = sx(sim.ts[i]);
      const Y = sy(Math.max(-yAmp, Math.min(yAmp, sim.vs[i])));
      i === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
    }
    ctx.stroke();

    // SVA envelope ±V(t)
    if (showEnvelope) {
      ctx.strokeStyle = "#e11d48";
      ctx.lineWidth = 1.8;
      [1, -1].forEach((sgn) => {
        ctx.beginPath();
        for (let i = 0; i < sim.ts.length; i++) {
          const X = sx(sim.ts[i]);
          const Y = sy(Math.max(-yAmp, Math.min(yAmp, sgn * sim.Venv[i])));
          i === 0 ? ctx.moveTo(X, Y) : ctx.lineTo(X, Y);
        }
        ctx.stroke();
      });
    }

    // axis frame + labels
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
    ctx.fillText(`+${yAmp.toFixed(2)}`, padL - 6, sy(yAmp * 0.96));
    ctx.fillText("0", padL - 6, sy(0));
    ctx.fillText(`-${yAmp.toFixed(2)}`, padL - 6, sy(-yAmp * 0.96));
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "center";
    ctx.fillStyle = "#1f2733";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.fillText("t", padL + PW / 2, h - 4);

    // legend
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillStyle = "#4f46e5";
    ctx.fillText("v(t) full", padL + 4, padT + 10);
    if (showEnvelope) {
      ctx.fillStyle = "#e11d48";
      ctx.fillText("±V(t) SVA envelope", padL + 4, padT + 24);
    }
    ctx.fillStyle = "#d97706";
    ctx.textAlign = "right";
    ctx.fillText("±√(α/β)", padL + PW - 4, padT + 10);
  };

  // ── Adler phase-line inset Ψ̇ = d + l sinΨ ──────────────────────────────────
  const adler = useMemo<Series[]>(() => {
    const N = 200;
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i <= N; i++) {
      const psi = -Math.PI + (TWO_PI * i) / N;
      x.push(psi);
      y.push(d + l * Math.sin(psi));
    }
    return [{ x, y, color: driven ? (locked ? "#16a34a" : "#e11d48") : "#94a3b8", width: 2.5, label: "Ψ̇ = d + l sinΨ" }];
  }, [d, l, driven, locked]);
  const adlerYmax = Math.max(Math.abs(d) + Math.abs(l), 0.2) * 1.15;
  // fixed points (where Ψ̇ = 0): Ψ = arcsin(−d/l) and π − arcsin(−d/l)
  const adlerMarkers = useMemo(() => {
    const ms: { x?: number; y?: number; color?: string; dashed?: boolean }[] = [{ y: 0, color: "#cbd5e1", dashed: false }];
    if (locked && l !== 0) {
      const a = Math.asin(Math.max(-1, Math.min(1, -d / l)));
      // stable root: π − arcsin(−d/l) (cosΨ*≤0 for l>0), wrapped into (−π, π]
      ms.push({ x: Math.PI - a > Math.PI ? Math.PI - a - TWO_PI : Math.PI - a, color: "#16a34a" });
      // unstable root: arcsin(−d/l) (cosΨ*≥0)
      ms.push({ x: a, color: "#94a3b8", dashed: true });
    }
    return ms;
  }, [d, l, locked]);

  return (
    <div>
      {/* status badge */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.5rem 0.75rem",
          marginBottom: "0.5rem",
          borderRadius: 8,
          background: spiking ? "#fee2e2" : relaxOnset ? "#fef3c7" : "#e0e7ff",
          border: `1px solid ${spiking ? "#dc2626" : relaxOnset ? "#d97706" : "#4f46e5"}`,
        }}
      >
        <span style={{ fontWeight: 700, color: spiking ? "#b91c1c" : relaxOnset ? "#b45309" : "#3730a3", letterSpacing: "0.01em" }}>
          {regimeLabel} &nbsp;(α/ω = {ratio.toFixed(2)})
        </span>
        {driven ? (
          <span
            style={{
              marginLeft: "auto",
              fontWeight: 700,
              padding: "0.1rem 0.55rem",
              borderRadius: 999,
              color: locked ? "#15803d" : "#be123c",
              background: locked ? "#dcfce7" : "#fee2e2",
              border: `1px solid ${locked ? "#16a34a" : "#e11d48"}`,
            }}
          >
            {locked ? "LOCKED  |d| ≤ |l|" : "UNLOCKED  |d| > |l|"}
          </span>
        ) : (
          <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "#475569" }}>free-running (V₀ = 0)</span>
        )}
      </div>

      <Canvas width={560} height={300} draw={drawPhase} speed={1} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Time series v(t) &amp; SVA envelope
          </div>
          <Canvas width={300} height={220} draw={drawTime} animate={false} redraw={[sim, Vss, showEnvelope]} />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Adler phase line Ψ̇ = d + l sinΨ
          </div>
          <Plot
            width={300}
            height={220}
            xRange={[-Math.PI, Math.PI]}
            yRange={[-adlerYmax, adlerYmax]}
            xLabel="Ψ  (rad)"
            yLabel="Ψ̇"
            lines={adler}
            markers={adlerMarkers}
          />
        </div>
      </div>

      <Controls>
        <Slider
          label={String.raw`\alpha\ \text{(gain)}`}
          tex
          min={0.05}
          max={10}
          step={0.05}
          value={alpha}
          onChange={setAlpha}
        />
        <Slider
          label={String.raw`\beta'\ \text{(saturation)}`}
          tex
          min={0.05}
          max={5}
          step={0.05}
          value={betaP}
          onChange={setBetaP}
        />
        <Slider
          label={String.raw`\omega\ \text{(natural freq)}`}
          tex
          min={0.2}
          max={10}
          step={0.1}
          value={omega}
          onChange={setOmega}
          unit="rad/s"
        />
        <Slider
          label={String.raw`V_0\ \text{(drive amp)}`}
          tex
          min={0}
          max={2}
          step={0.02}
          value={V0}
          onChange={setV0}
        />
        <Slider
          label={String.raw`\nu\ \text{(drive freq)}`}
          tex
          min={0.2}
          max={10}
          step={0.05}
          value={nu}
          onChange={setNu}
          unit="rad/s"
        />
        <Slider
          label={String.raw`v_0\ \text{(seed/noise)}`}
          tex
          min={0.001}
          max={2}
          step={0.001}
          value={v0seed}
          onChange={setV0seed}
        />
        <Toggle label="overlay SVA envelope ±V(t)" checked={showEnvelope} onChange={setShowEnvelope} />
        <Readout
          label={String.raw`\sqrt{\alpha/\beta}\ \text{(analytic)}`}
          tex
          value={Vss.toFixed(3)}
        />
        <Readout label="measured steady max|v|" value={`${sim.measMax.toFixed(3)}  (${measVsAnalytic.toFixed(0)}%)`} />
        <Readout label={String.raw`d=\omega-\nu\ \text{(detuning)}`} tex value={d.toFixed(3)} />
        <Readout label={String.raw`l=\tfrac{1}{2}\nu V_0/V\ \text{(locking)}`} tex value={l.toFixed(3)} />
        <Readout
          label={String.raw`\Psi^* = \pi - \arcsin(-d/l)`}
          tex
          value={locked ? `${psiStar.toFixed(2)} rad` : "—"}
        />
        <Readout
          label={String.raw`\text{beat period }2\pi/\sqrt{d^2-l^2}`}
          tex
          value={driven && !locked ? `${beatPeriod.toFixed(1)} s` : locked ? "locked" : "—"}
        />
      </Controls>
    </div>
  );
}
