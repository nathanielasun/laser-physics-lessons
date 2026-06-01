"use client";

/**
 * Chapter II — Rabi flopping.
 *
 * The exact (rotating-wave) two-level result, Eqs. (61)-(62):
 *   generalized Rabi frequency   mu  = sqrt( (w - v)^2 + (pE0/hbar)^2 )
 *   lower-state probability      Pb(t) = (OmegaR^2 / mu^2) * sin^2(mu t / 2)
 * where OmegaR = pE0/hbar is the on-resonance Rabi frequency and (w - v) is the
 * detuning. We work in rad/us so the numbers are friendly; the physics is exact.
 *
 * Three linked views:
 *   A. an animated two-level atom whose level populations flop in real time,
 *   B. the Pb(t) flopping curve with amplitude/period markers,
 *   C. the resonance line: peak transfer vs detuning, showing power broadening.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Controls, Readout, Series } from "@/components/sim";

export default function Ch02Sim() {
  const [omegaR, setOmegaR] = useState(1.5); // OmegaR = pE0/hbar  (rad/us)
  const [detuning, setDetuning] = useState(0.0); // (w - v)        (rad/us)

  const mu = Math.sqrt(detuning * detuning + omegaR * omegaR); // generalized Rabi
  const amp = (omegaR * omegaR) / (mu * mu); // max transfer Ω²/μ²
  const period = (2 * Math.PI) / mu; // flop period 2π/μ
  const Pb = (t: number) => amp * Math.sin((mu * t) / 2) ** 2;

  // ── B. flopping curve over ~3 periods ────────────────────────────────────
  const flop = useMemo<Series[]>(() => {
    const T = Math.min(period * 3, 30);
    const N = 400;
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * T;
      x.push(t);
      y.push(Pb(t));
    }
    return [{ x, y, color: "#4f46e5", width: 2.5, label: "P_b(t)", fill: true }];
  }, [omegaR, detuning]);
  const flopT = Math.min(period * 3, 30);

  // ── C. resonance line: peak transfer vs detuning, for current & weaker field
  const line = useMemo<Series[]>(() => {
    const N = 240;
    const dets: number[] = [];
    const cur: number[] = [];
    const weak: number[] = [];
    const half = (om: number, d: number) => {
      const m2 = d * d + om * om;
      return (om * om) / m2; // peak (time-averaged max) transfer Ω²/(δ²+Ω²)
    };
    for (let i = 0; i <= N; i++) {
      const d = -5 + (10 * i) / N;
      dets.push(d);
      cur.push(half(omegaR, d));
      weak.push(half(0.4, d)); // a fixed weak field for comparison
    }
    return [
      { x: dets, y: cur, color: "#e11d48", width: 2.5, label: "current Ω" },
      { x: dets, y: weak, color: "#94a3b8", width: 1.8, dashed: true, label: "weak Ω" },
    ];
  }, [omegaR]);

  // ── A. animated populations ───────────────────────────────────────────────
  const draw = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);
    const tt = t * 2.2; // visual time scaling
    const pb = Pb(tt);
    const pa = 1 - pb;

    // drive field (oscillating E)
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 3) {
      const yy = h / 2 + 14 * Math.sin(x * 0.05 - tt * 6) * Math.exp(-Math.abs(x - w * 0.5) / 220);
      x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
    }
    ctx.stroke();

    const levelX = w * 0.5;
    const yA = h * 0.24;
    const yB = h * 0.76;

    const drawLevel = (y: number, pop: number, label: string, sub: string) => {
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(levelX - 110, y);
      ctx.lineTo(levelX + 110, y);
      ctx.stroke();
      // population glow
      const r = 7 + 34 * pop;
      const g = ctx.createRadialGradient(levelX, y, 2, levelX, y, r);
      g.addColorStop(0, `rgba(79,70,229,${0.35 + 0.55 * pop})`);
      g.addColorStop(1, "rgba(79,70,229,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(levelX, y, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#1b2330";
      ctx.font = "600 15px ui-sans-serif, system-ui";
      ctx.textAlign = "left";
      ctx.fillText(label, levelX + 120, y - 4);
      ctx.fillStyle = "#5b6473";
      ctx.font = "12px ui-sans-serif, system-ui";
      ctx.fillText(sub, levelX + 120, y + 13);
    };

    drawLevel(yA, pa, "|a⟩  upper", `P_a = ${pa.toFixed(2)}`);
    drawLevel(yB, pb, "|b⟩  lower", `P_b = ${pb.toFixed(2)}`);

    // population bars on the left
    const barX = 40;
    const barH = 150;
    const barTop = h / 2 - barH / 2;
    ctx.fillStyle = "#eef2ff";
    ctx.fillRect(barX, barTop, 22, barH);
    ctx.fillStyle = "#4f46e5";
    ctx.fillRect(barX, barTop + barH * (1 - pb), 22, barH * pb);
    ctx.strokeStyle = "#c7cdf5";
    ctx.strokeRect(barX, barTop, 22, barH);
    ctx.fillStyle = "#5b6473";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("P_b", barX + 11, barTop + barH + 16);
  };

  return (
    <div>
      <Canvas width={560} height={260} draw={draw} speed={1} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>Flopping in time</div>
          <Plot
            width={300}
            height={220}
            xRange={[0, flopT]}
            yRange={[0, 1]}
            xLabel="t  (µs)"
            yLabel="P_b"
            lines={flop}
            markers={[
              { y: amp, color: "#e11d48", label: "Ω²/µ²" },
              { y: 1, color: "#e2e8f0", dashed: false },
            ]}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>Resonance line (peak transfer)</div>
          <Plot
            width={300}
            height={220}
            xRange={[-5, 5]}
            yRange={[0, 1]}
            xLabel="detuning  ω − ν"
            yLabel="P_b,max"
            lines={line}
          />
        </div>
      </div>

      <Controls>
        <Slider
          label={String.raw`\Omega_R=\wp E_0/\hbar`}
          tex
          min={0.3}
          max={4}
          step={0.05}
          value={omegaR}
          onChange={setOmegaR}
          unit="rad/µs"
        />
        <Slider
          label={String.raw`\text{detuning }\;\omega-\nu`}
          tex
          min={-5}
          max={5}
          step={0.05}
          value={detuning}
          onChange={setDetuning}
          unit="rad/µs"
        />
        <Readout label={String.raw`\mu=\sqrt{(\omega-\nu)^2+\Omega_R^2}`} tex value={`${mu.toFixed(2)} rad/µs`} />
        <Readout label="max transfer Ω²/µ²" value={amp.toFixed(3)} />
        <Readout label="flop period 2π/µ" value={`${period.toFixed(2)} µs`} />
      </Controls>
    </div>
  );
}
