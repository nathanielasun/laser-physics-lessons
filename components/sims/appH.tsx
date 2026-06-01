"use client";

/**
 * Appendix H — The Coherent State vs. the breathing packet.
 *
 * We evolve a minimum-uncertainty Gaussian in the harmonic well and drive
 * EVERYTHING from the book's closed-form solution (Eq. 40), expressed through
 * its two time-dependent variances. This is exact, not a shortcut: the SHO
 * preserves Gaussians and Ehrenfest's theorem makes ⟨x⟩ follow the classical
 * orbit for ALL R, so the displayed packet IS the chapter's ψ(ξ,t).
 *
 * Natural units ℏ = M = Ω = 1, so ξ = x, α = (q₀ + i p₀)/√2 (Eq. 45), and the
 * classical orbit (Eq. 25) is ⟨x⟩(t) = q₀ cos t + p₀ sin t. The control knob is
 * the dimensionless width ratio R = C/MΩ (Eq. 32).
 *
 * The two variances of the evolved Gaussian (R sets the t=0 widths; the SHO
 * rotates position↔momentum at Ω):
 *     Δx²(t) = (cos²t + R² sin²t) / (2R)
 *     Δp²(t) = (R² cos²t +  sin²t) / (2R)
 * From these everything follows so the display and readouts cannot disagree:
 *     σ(t)   = √2·Δx(t) = sqrt[(cos²t + R² sin²t)/R]      (Eq. on p.416)
 *     |ψ|²   = (π σ²)^{-1/2} exp[-(ξ - μ)²/σ²]            (Eq. 42/55 envelope)
 *     μ(t)   = ⟨x⟩(t) = q₀ cos t + p₀ sin t              (classical orbit)
 *     ΔxΔp   = sqrt(Δx²·Δp²) = ½ sqrt[(cos²+R²sin²)(cos²+R⁻²sin²)]
 *     ratio  = ΔxΔp / (ℏ/2) = 2·ΔxΔp                     (= 1 iff R = 1)
 *
 * Discriminating checks (verified numerically before coding):
 *   R = 1  → ratio ≡ 1.00 flat, σ ≡ 1, blob a fixed circle.
 *   R ≠ 1  → ratio returns to exactly 1 at every quarter-period (Ωt = nπ/2),
 *            peaks at Ωt = π/4 (mod π/2) — frequency 2Ω; σ breathes between
 *            R^{-1/2} and R^{1/2}.
 *   ⟨x⟩ tracks the classical orbit for ALL R (the teaching point).
 *
 * Phase space: a RIGIDLY ROTATING ellipse (not axis-aligned breathing) with
 * fixed principal semi-axes 1/√(2R) and √(R/2). The whole ellipse rotates at Ωt
 * while its center orbits the origin on a circle of radius √(q₀²+p₀²); the
 * x-breathing we draw is just this ellipse's projection onto x. At R=1 it is a
 * circle and the rotation is invisible — the coherent state.
 *
 * The Poisson photon distribution is TIME-INDEPENDENT (|α|² is conserved, only
 * the phase rotates), so the bars update only on q₀/p₀ change, never per frame.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Controls, Readout, Series } from "@/components/sim";

// Standard normal-ish factorial (n stays small here).
function factorial(n: number): number {
  let f = 1;
  for (let i = 2; i <= n; i++) f *= i;
  return f;
}

export default function AppHSim() {
  const [R, setR] = useState(1.0); // width ratio C/MΩ (Eq. 32)
  const [q0, setQ0] = useState(2.0); // initial position → Re α
  const [p0, setP0] = useState(0.0); // initial momentum → Im α
  const [speed, setSpeed] = useState(1.0); // animation clock multiplier

  // ── physics helpers (natural units ℏ=M=Ω=1) ───────────────────────────────
  const dx2 = (t: number) => (Math.cos(t) ** 2 + R * R * Math.sin(t) ** 2) / (2 * R);
  const dp2 = (t: number) => (R * R * Math.cos(t) ** 2 + Math.sin(t) ** 2) / (2 * R);
  const sigma = (t: number) => Math.sqrt((Math.cos(t) ** 2 + R * R * Math.sin(t) ** 2) / R); // = √2 Δx
  const center = (t: number) => q0 * Math.cos(t) + p0 * Math.sin(t); // ⟨x⟩(t)
  const ratio = (t: number) => 2 * Math.sqrt(dx2(t) * dp2(t)); // ΔxΔp / (ℏ/2)

  // α and conserved mean photon number n̄ = |α|² = (q₀²+p₀²)/2
  const nbar = (q0 * q0 + p0 * p0) / 2;
  const sigMin = Math.min(Math.sqrt(R), 1 / Math.sqrt(R));
  const sigMax = Math.max(Math.sqrt(R), 1 / Math.sqrt(R));

  // ── σ(t) breathing trace over one full period ──────────────────────────────
  const sigmaTrace = useMemo<Series[]>(() => {
    const N = 240;
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * 2 * Math.PI;
      x.push(t);
      y.push(sigma(t));
    }
    return [{ x, y, color: "#0891b2", width: 2.5, label: "σ(t)" }];
  }, [R]);

  // ── ΔxΔp/(ℏ/2) trace over one full period ───────────────────────────────────
  const ratioTrace = useMemo<Series[]>(() => {
    const N = 240;
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * 2 * Math.PI;
      x.push(t);
      y.push(ratio(t));
    }
    return [{ x, y, color: "#e11d48", width: 2.5, label: "ΔxΔp/(ℏ/2)", fill: true }];
  }, [R]);

  // ── Poisson photon distribution P(n) = e^{-n̄} n̄ⁿ/n! (time-independent) ──────
  const poisson = useMemo<Series[]>(() => {
    const nMax = Math.max(8, Math.ceil(nbar + 4 * Math.sqrt(nbar) + 2));
    const x: number[] = [];
    const y: number[] = [];
    for (let n = 0; n <= nMax; n++) {
      // bar drawn as two vertical samples → looks like a stem
      const Pn = nbar === 0 ? (n === 0 ? 1 : 0) : (Math.exp(-nbar) * Math.pow(nbar, n)) / factorial(n);
      x.push(n, n + 1e-6, n);
      y.push(0, Pn, 0);
    }
    return [{ x, y, color: "#9333ea", width: 2, label: "P(n)" }];
  }, [q0, p0]);
  const nMaxPlot = Math.max(8, Math.ceil(nbar + 4 * Math.sqrt(nbar) + 2));
  const pPeak = nbar === 0 ? 1 : Math.exp(-nbar) * Math.pow(nbar, Math.floor(nbar)) / factorial(Math.floor(nbar));

  // ── live readouts at "now" — recompute on slider change via the t=0 frame ──
  // (the animated dial inside the canvas shows the live value; these chips give
  //  the slider-time snapshots so the panel never looks dead while paused).
  const r0 = ratio(0);

  // ── animated main panel: packet in the well + phase-space ellipse + dial ───
  const draw = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);
    const tt = t * speed; // animation clock = Ωt

    // ===== LEFT: harmonic well with the live |ψ|² packet =====================
    const panelW = w * 0.6;
    const cx = panelW * 0.5;
    const baseY = h * 0.7; // x-axis baseline
    const xScale = panelW / 11; // ξ ∈ [-5.5, 5.5] across the panel
    const toX = (xi: number) => cx + xi * xScale;

    // parabola V = ½ξ²
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = 0; px <= panelW; px += 3) {
      const xi = (px - cx) / xScale;
      const V = 0.5 * xi * xi;
      const py = baseY - V * 14;
      px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // x-axis
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(8, baseY);
    ctx.lineTo(panelW - 8, baseY);
    ctx.stroke();

    const mu = center(tt);
    const sg = sigma(tt);

    // ghost reference packet (R = 1): coherent state at same q0,p0
    const sgRef = 1.0;
    const drawGaussian = (sgg: number, color: string, fillA: string, lw: number) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.beginPath();
      const amp = 70; // peak height in px for the |ψ|² = (πσ²)^{-1/2} normalized Gaussian
      for (let px = 8; px <= panelW - 8; px += 2) {
        const xi = (px - cx) / xScale;
        const dens = Math.exp(-((xi - mu) ** 2) / (sgg * sgg)) / (Math.sqrt(Math.PI) * sgg);
        const py = baseY - dens * amp;
        px === 8 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
      // fill
      ctx.fillStyle = fillA;
      ctx.lineTo(panelW - 8, baseY);
      ctx.lineTo(8, baseY);
      ctx.closePath();
      ctx.fill();
    };
    if (Math.abs(R - 1) > 0.02) drawGaussian(sgRef, "#cbd5e1", "rgba(203,213,225,0.18)", 1.5); // ghost R=1
    drawGaussian(sg, "#4f46e5", "rgba(79,70,229,0.18)", 2.6); // live packet

    // center marker on the axis
    ctx.fillStyle = "#e11d48";
    ctx.beginPath();
    ctx.arc(toX(mu), baseY, 4, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#1b2330";
    ctx.font = "600 13px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("|ψ(ξ,t)|²  in  V = ½ξ²", 10, 22);
    ctx.fillStyle = "#5b6473";
    ctx.font = "11px ui-sans-serif, system-ui";
    if (Math.abs(R - 1) > 0.02) ctx.fillText("grey = R=1 reference", 10, 38);

    // ===== RIGHT TOP: phase-space rotating ellipse ==========================
    const psCx = panelW + (w - panelW) * 0.5;
    const psCy = h * 0.32;
    const psR = Math.min((w - panelW) * 0.42, h * 0.27);
    const psScale = psR / 5.5; // x,p ∈ [-5.5,5.5]

    // axes
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(psCx - psR, psCy);
    ctx.lineTo(psCx + psR, psCy);
    ctx.moveTo(psCx, psCy - psR);
    ctx.lineTo(psCx, psCy + psR);
    ctx.stroke();
    // orbit circle of radius |α|·√2 = √(q0²+p0²) in (x,p) units
    const orbitR = Math.hypot(q0, p0);
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(psCx, psCy, orbitR * psScale, 0, 2 * Math.PI);
    ctx.stroke();

    // blob center orbits clockwise: (⟨x⟩, ⟨p⟩) = (q0 cos t + p0 sin t, p0 cos t − q0 sin t)
    const bx = q0 * Math.cos(tt) + p0 * Math.sin(tt);
    const bp = p0 * Math.cos(tt) - q0 * Math.sin(tt);
    // ellipse: fixed semi-axes a=1/√(2R) (along rotating frame x'), b=√(R/2);
    // the principal axes rotate by −Ωt (clockwise) in phase space.
    const a = 1 / Math.sqrt(2 * R);
    const b = Math.sqrt(R / 2);
    const phi = -tt; // rotation angle of principal axes
    ctx.save();
    ctx.translate(psCx + bx * psScale, psCy - bp * psScale);
    ctx.rotate(-phi); // canvas y is down → negate to match math orientation
    ctx.fillStyle = "rgba(8,145,178,0.22)";
    ctx.strokeStyle = "#0891b2";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, a * psScale, b * psScale, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    // blob center dot
    ctx.fillStyle = "#0891b2";
    ctx.beginPath();
    ctx.arc(psCx + bx * psScale, psCy - bp * psScale, 3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#1b2330";
    ctx.font = "600 12px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("phase space (x, p)", psCx, psCy - psR - 8);

    // ===== RIGHT BOTTOM: the live ΔxΔp/(ℏ/2) dial ===========================
    const liveRatio = ratio(tt);
    const dialCx = psCx;
    const dialY = h * 0.82;
    // bar from 1.0 baseline upward
    const barW = (w - panelW) * 0.55;
    const barX = dialCx - barW / 2;
    const barTop = dialY - 46;
    const barH = 44;
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(barX, barTop, barW, barH);
    // fill proportional to (ratio−1) clipped to [1,2]
    const frac = Math.min(Math.max((liveRatio - 1) / 1, 0), 1);
    ctx.fillStyle = liveRatio < 1.001 ? "#16a34a" : "#e11d48";
    ctx.fillRect(barX, barTop + barH * (1 - frac), barW, barH * frac);
    ctx.strokeStyle = "#cbd5e1";
    ctx.strokeRect(barX, barTop, barW, barH);
    ctx.fillStyle = "#1b2330";
    ctx.font = "600 13px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("ΔxΔp / (ℏ/2) = " + liveRatio.toFixed(3), dialCx, dialY + 14);
  };

  return (
    <div>
      <Canvas width={620} height={300} draw={draw} speed={1} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Packet width σ(t) over one period
          </div>
          <Plot
            width={300}
            height={210}
            xRange={[0, 2 * Math.PI]}
            yRange={[0, Math.max(2.2, sigMax * 1.15)]}
            xLabel="Ωt"
            yLabel="σ"
            lines={sigmaTrace}
            markers={[
              { y: 1, color: "#94a3b8", label: "σ=1 (R=1)" },
              { y: sigMin, color: "#cbd5e1", dashed: true },
              { y: sigMax, color: "#cbd5e1", dashed: true },
            ]}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Uncertainty product ΔxΔp / (ℏ/2)
          </div>
          <Plot
            width={300}
            height={210}
            xRange={[0, 2 * Math.PI]}
            yRange={[0.9, Math.max(1.6, sigMax * sigMax * 1.05)]}
            xLabel="Ωt"
            yLabel="ratio"
            lines={ratioTrace}
            markers={[{ y: 1, color: "#16a34a", dashed: false }]}
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
          Photon-number distribution P(n) — Poisson, mean = variance = n̄ = |α|²
        </div>
        <Plot
          width={620}
          height={190}
          xRange={[0, nMaxPlot]}
          yRange={[0, Math.max(0.05, pPeak * 1.2)]}
          xLabel="n (photon number)"
          yLabel="P(n)"
          lines={poisson}
          markers={[{ x: nbar, color: "#e11d48", label: "n̄ = |α|²", dashed: true }]}
        />
      </div>

      <Controls>
        <Slider
          label={String.raw`R = C/M\Omega`}
          tex
          min={0.25}
          max={4}
          step={0.05}
          value={R}
          onChange={setR}
          unit="(R=1 ⇒ coherent)"
        />
        <Slider label={String.raw`q_0\ (\propto \operatorname{Re}\alpha)`} tex min={-4} max={4} step={0.1} value={q0} onChange={setQ0} />
        <Slider label={String.raw`p_0\ (\propto \operatorname{Im}\alpha)`} tex min={-4} max={4} step={0.1} value={p0} onChange={setP0} />
        <Slider label="animation speed" min={0.1} max={3} step={0.1} value={speed} onChange={setSpeed} unit="×" />
        <Readout
          label={String.raw`\alpha = (q_0 + i p_0)/\sqrt{2}`}
          tex
          value={`${(q0 / Math.SQRT2).toFixed(2)} ${p0 >= 0 ? "+" : "−"} ${Math.abs(p0 / Math.SQRT2).toFixed(2)}i`}
        />
        <Readout label={String.raw`\bar n = |\alpha|^2`} tex value={nbar.toFixed(2)} />
        <Readout
          label={String.raw`\sigma\ \text{range}`}
          tex
          value={Math.abs(R - 1) < 1e-6 ? "1.00 (constant)" : `${sigMin.toFixed(2)} … ${sigMax.toFixed(2)}`}
        />
        <Readout
          label={String.raw`\Delta x\,\Delta p/(\hbar/2)\ \text{at}\ t{=}0`}
          tex
          value={r0.toFixed(3) + (Math.abs(R - 1) < 1e-6 ? " (flat)" : "")}
        />
      </Controls>
    </div>
  );
}
