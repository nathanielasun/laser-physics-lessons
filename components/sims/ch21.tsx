"use client";

/**
 * Chapter XXI — The laser threshold as a second-order phase transition.
 *
 * The chapter's headline steady-state distribution, Eq.(11)/Eq.(14), regrouped
 * into Landau form (alpha = x + i y):
 *
 *   G(alpha) = -[ 1/4 (A - nu/Q) |alpha|^2  -  1/8 B |alpha|^4  +  1/2 S (alpha + alpha*) ]
 *   P(alpha) = N exp[ -(4/A) G(alpha) ]
 *            = N exp{ (4/A) [ 1/4 (A - nu/Q) |alpha|^2 - 1/8 B |alpha|^4 + 1/2 S (alpha + alpha*) ] }
 *
 * with net pump p = A - nu/Q (control crosses zero at threshold), injected
 * signal S (symmetry-breaking field), noise strength A (effective temperature,
 * appears as the 4/A prefactor), and saturation B (quartic coefficient).
 *
 * Order parameter (S real, so <E> ~ <x>):
 *   <E> = <x> = ( ∫∫ x P dx dy ) / ( ∫∫ P dx dy )
 *
 * Ferromagnet overlay (Eq.13 / Table 21-1 coexistence curve):
 *   M_eq = [ (C/D)(T_c - T)/T ]^{1/2}  (T < T_c), here = sqrt(p/B) above threshold.
 *
 * LEFT  : filled heatmap of P(x,y) over the complex field plane (static redraw
 *         keyed on the sliders) — single blob below threshold, ring above.
 * RIGHT : the order-parameter curve <E> vs net pump, traced live, with the
 *         ferromagnet magnetization overlay and the current operating point.
 *
 * Numerical note: the exponent can be large-positive, so exp() would overflow.
 * Every grid evaluation subtracts the grid maximum before exponentiating
 * (log-sum-exp shift); the resulting weights are O(1) and the <E> ratio is
 * unchanged by the constant shift.
 */

import { useMemo } from "react";
import { useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series, Marker } from "@/components/sim";

// ---- field-plane grid (shared by heatmap and <E> integral) ----
const GRID = 71; // odd so x=0 is a node
const XMAX = 3.2; // plot |alpha| out to here

// Landau exponent  ln P (up to an additive constant):  (4/A) * [ ... ]
function lnP(x: number, y: number, p: number, S: number, A: number, B: number): number {
  const r2 = x * x + y * y;
  const r4 = r2 * r2;
  const inner = 0.25 * p * r2 - 0.125 * B * r4 + 0.5 * S * (2 * x); // alpha + alpha* = 2x
  return (4 / A) * inner;
}

// Ensemble average <x> via the grid, with a log-sum-exp shift to avoid overflow.
function meanX(p: number, S: number, A: number, B: number): number {
  const step = (2 * XMAX) / (GRID - 1);
  // first pass: find the max exponent
  let mx = -Infinity;
  for (let i = 0; i < GRID; i++) {
    const x = -XMAX + i * step;
    for (let j = 0; j < GRID; j++) {
      const y = -XMAX + j * step;
      const e = lnP(x, y, p, S, A, B);
      if (e > mx) mx = e;
    }
  }
  // second pass: shifted weights
  let num = 0;
  let den = 0;
  for (let i = 0; i < GRID; i++) {
    const x = -XMAX + i * step;
    for (let j = 0; j < GRID; j++) {
      const y = -XMAX + j * step;
      const w = Math.exp(lnP(x, y, p, S, A, B) - mx);
      num += x * w;
      den += w;
    }
  }
  return den > 0 ? num / den : 0;
}

export default function Ch21Sim() {
  const [pump, setPump] = useState(-1.0); // net pump  p = A - nu/Q
  const [signal, setSignal] = useState(0.15); // injected signal  S  (symmetry-breaking field)
  //   note: <E> = <x> is the SIGNED order parameter (E <-> magnetization M). It is
  //   identically 0 at S = 0 by phase symmetry (the ring has no preferred phase),
  //   so we start with a small symmetry-breaking signal so the order-parameter
  //   curve visibly turns on through threshold. Drag S to 0 for the unbroken edge
  //   case (<x> collapses to 0, phase undefined). The moderate default noise A=0.3
  //   keeps <x> close to the ferromagnet sqrt(p/B) above threshold while still
  //   ROUNDING the curve near threshold and leaving a small tail below (where the
  //   magnet is exactly 0) -- the noise-rounding of a real phase transition.
  const [noise, setNoise] = useState(0.3); // diffusion / noise strength  A  (effective temperature)
  const [sat, setSat] = useState(1.0); // saturation constant  B
  const [showFerro, setShowFerro] = useState(true);

  // current operating point
  const Ecur = useMemo(() => meanX(pump, signal, noise, sat), [pump, signal, noise, sat]);
  const ringR = pump > 0 ? Math.sqrt(pump / sat) : 0; // |alpha|_min above threshold
  const chi =
    pump < 0 ? 1 / (noise * -pump) : pump > 0 ? 1 / (2 * noise * pump) : Infinity; // dE/dS|_{S=0}

  // variance of the x quadrature of the field. This is a critical-fluctuation
  // indicator, NOT a linewidth proxy (the real Schawlow-Townes linewidth
  // NARROWS ~1/P above threshold, unlike this). Its pump dependence is
  // regime-dependent: with a symmetry-breaking signal S > 0 it rises to a
  // maximum near threshold then declines, but at S = 0 it grows with pump,
  // tracking the Mexican-hat ring radius sqrt(p/B) (Var(x) -> p/(2B)).
  const varX = useMemo(() => {
    const step = (2 * XMAX) / (GRID - 1);
    let mx = -Infinity;
    for (let i = 0; i < GRID; i++) {
      const x = -XMAX + i * step;
      for (let j = 0; j < GRID; j++) {
        const y = -XMAX + j * step;
        const e = lnP(x, y, pump, signal, noise, sat);
        if (e > mx) mx = e;
      }
    }
    let s0 = 0, s1 = 0, s2 = 0;
    for (let i = 0; i < GRID; i++) {
      const x = -XMAX + i * step;
      for (let j = 0; j < GRID; j++) {
        const y = -XMAX + j * step;
        const w = Math.exp(lnP(x, y, pump, signal, noise, sat) - mx);
        s0 += w; s1 += x * w; s2 += x * x * w;
      }
    }
    const m = s1 / s0;
    return Math.max(s2 / s0 - m * m, 0);
  }, [pump, signal, noise, sat]);

  // ── RIGHT panel: <E> vs net pump (live), plus ferromagnet overlay ───────────
  const curveData = useMemo<Series[]>(() => {
    const N = 120;
    const quantum: number[][] = [];
    const ferro: number[][] = [];
    for (let i = 0; i <= N; i++) {
      const p = -2 + (4 * i) / N;
      quantum.push([p, meanX(p, signal, noise, sat)]);
      // semiclassical / ferromagnet coexistence: M_eq = sqrt(p/B) above threshold, 0 below
      const m = p > 0 ? Math.sqrt(p / sat) : 0;
      ferro.push([p, m]);
    }
    const out: Series[] = [
      { data: quantum as [number, number][], color: "#4f46e5", width: 2.6, label: "quantum ⟨E⟩" },
    ];
    if (showFerro) {
      out.push({
        data: ferro as [number, number][],
        color: "#e11d48",
        width: 2,
        dashed: true,
        label: "ferromagnet M",
      });
    }
    return out;
  }, [signal, noise, sat, showFerro]);

  const curveMarkers: Marker[] = [
    { x: 0, color: "#94a3b8", label: "threshold" },
    { x: pump, color: "#16a34a" },
    { y: Ecur, color: "#16a34a" },
  ];

  // ── LEFT panel: heatmap of P(x,y) over the complex field plane ──────────────
  const draw = ({ ctx, w, h }: any) => {
    ctx.clearRect(0, 0, w, h);

    const pad = 8;
    const plotW = w - 2 * pad;
    const plotH = h - 2 * pad - 18; // leave a strip for the caption
    const cx = pad + plotW / 2;
    const cy = pad + plotH / 2;
    const scale = Math.min(plotW, plotH) / (2 * XMAX);

    // sample P on a finer grid for the image; reuse the log-sum-exp shift
    const NG = 90;
    const step = (2 * XMAX) / (NG - 1);
    let mx = -Infinity;
    const lnvals: number[] = new Array(NG * NG);
    for (let i = 0; i < NG; i++) {
      const xx = -XMAX + i * step;
      for (let j = 0; j < NG; j++) {
        const yy = -XMAX + j * step;
        const e = lnP(xx, yy, pump, signal, noise, sat);
        lnvals[i * NG + j] = e;
        if (e > mx) mx = e;
      }
    }

    // color ramp: low prob -> deep indigo bg, high prob -> warm
    const cellW = plotW / NG;
    const cellH = plotH / NG;
    for (let i = 0; i < NG; i++) {
      for (let j = 0; j < NG; j++) {
        const v = Math.exp(lnvals[i * NG + j] - mx); // 0..1
        // x to screen (real axis horizontal), y vertical (flip)
        const sx = pad + (i / (NG - 1)) * plotW;
        const sy = pad + (1 - j / (NG - 1)) * plotH;
        const t = Math.pow(v, 0.6); // gamma to show structure
        const r = Math.round(30 + 225 * t);
        const g = Math.round(27 + 80 * t);
        const b = Math.round(120 + 70 * (1 - t));
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(sx, sy - cellH, cellW + 1, cellH + 1);
      }
    }

    // axes through origin
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad, cy); ctx.lineTo(pad + plotW, cy);
    ctx.moveTo(cx, pad); ctx.lineTo(cx, pad + plotH);
    ctx.stroke();

    // ring of minima above threshold (Mexican-hat valley)
    if (ringR > 0 && ringR < XMAX) {
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(cx, cy, ringR * scale, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // labels
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("Re α = x", pad + plotW - 64, cy - 6);
    ctx.fillText("Im α = y", cx + 6, pad + 12);

    // status strip
    const phase = pump < -0.02 ? "BELOW threshold (single well)" : pump > 0.02 ? "ABOVE threshold (Mexican hat)" : "AT threshold";
    ctx.fillStyle = "#475569";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText(`P(α) = N·exp[−4G/A]   —   ${phase}`, w / 2, h - 4);
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Steady-state distribution P(x, y)
          </div>
          <Canvas
            width={300}
            height={300}
            animate={false}
            redraw={[pump, signal, noise, sat]}
            draw={draw}
            controls={false}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Order parameter ⟨E⟩ vs net pump
          </div>
          <Plot
            width={300}
            height={300}
            xRange={[-2, 2]}
            yRange={[0, 1.6]}
            xLabel="net pump  𝒜 − ν/Q"
            yLabel="⟨E⟩ , M"
            lines={curveData}
            markers={curveMarkers}
          />
        </div>
      </div>

      <Controls>
        <Slider
          label={String.raw`\text{net pump }\;\mathscr{A}-\nu/Q`}
          tex
          min={-2}
          max={2}
          step={0.02}
          value={pump}
          onChange={setPump}
        />
        <Slider
          label={String.raw`\text{injected signal }\;\mathscr{S}`}
          tex
          min={0}
          max={1}
          step={0.01}
          value={signal}
          onChange={setSignal}
        />
        <Slider
          label={String.raw`\text{noise }\;\mathscr{A}\;(\propto T)`}
          tex
          min={0.1}
          max={3}
          step={0.02}
          value={noise}
          onChange={setNoise}
        />
        <Slider
          label={String.raw`\text{saturation }\;\mathscr{B}`}
          tex
          min={0.2}
          max={3}
          step={0.02}
          value={sat}
          onChange={setSat}
        />
        <Toggle label="ferromagnet overlay" checked={showFerro} onChange={setShowFerro} />
        <Readout label={String.raw`\langle E\rangle=\langle x\rangle`} tex value={Ecur.toFixed(3)} />
        <Readout
          label={String.raw`|\alpha|_{\min}=\sqrt{(\mathscr{A}-\nu/Q)/\mathscr{B}}`}
          tex
          value={ringR.toFixed(3)}
        />
        <Readout
          label={String.raw`\chi=\dfrac{dE}{d\mathscr{S}}\big|_{0}`}
          tex
          value={isFinite(chi) ? chi.toFixed(2) : "→ ∞ (critical)"}
        />
        <Readout label={String.raw`4/\mathscr{A}\;(\text{inverse temp})`} tex value={(4 / noise).toFixed(2)} />
        <Readout
          label={String.raw`\mathrm{Var}(x)\;(\text{field-quadrature spread; grows with pump above threshold (ring radius), not a linewidth})`}
          tex
          value={varX.toFixed(3)}
        />
      </Controls>
    </div>
  );
}
