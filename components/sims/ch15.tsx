"use client";

/**
 * Chapter XV — Coherent states |α⟩.
 *
 * One animated three-panel canvas brings to life the three faces of the same state:
 *
 *   PANEL A (geometry).  The probability density |ψ(q,t)|² is a rigid Gaussian of
 *     FIXED vacuum width σ=1/√2 sloshing in the parabolic oscillator well. Its
 *     center traces the classical cosine
 *         q_c(t) = √2 |α| cos(Ωt + φ),
 *     never spreading (a ghost outline pinned at t=0 makes "no spreading" obvious).
 *     This is Figs. 15-1/15-2/15-3 brought to life (Eqs. 8-9).
 *
 *   PANEL B (the classical field).  ⟨E⟩(t) = √2 |α| cos(Ωt + φ) scrolls as a cosine
 *     with a moving dot at the present instant — the packet center IS the classical
 *     field. We animate it at the mode frequency Ω so the dot stays locked to Panel A's
 *     center; both the packet center and the field oscillate at Ω.
 *
 *   PANEL C (statistics).  A stem/bar plot of the Poisson photon distribution
 *         P_n = e^{-|α|²} |α|^{2n} / n!,    ⟨n⟩ = |α|²,  Δn = |α|   (Eqs. 13-14)
 *     updating instantly with |α|. A thermal toggle overlays the Bose-Einstein
 *     distribution  P_th(n) = ⟨n⟩_th^n / (⟨n⟩_th+1)^{n+1}  with
 *         ⟨n⟩_th = 1/(e^{ℏΩ/k_BT} − 1)   (Eqs. 51, 55) — the coherent-vs-chaotic
 *     contrast of Fig. 15-4.
 *
 * Units are scaled ℏ = M = 1, so σ = 1/√2 and Δq·Δp = ℏ/2 = 1/2 exactly, for all t —
 * the readout displays this constant to prove minimum-uncertainty persists.
 *
 * Poisson/Bose factors are computed in log space (lgamma) so |α| up to 15
 * (⟨n⟩ = 225) never overflows.
 */

import { useState } from "react";
import { Canvas, Slider, Toggle, Controls, Readout } from "@/components/sim";

// Lanczos log-gamma — keeps factorials finite up to ⟨n⟩ ≈ 225.
function lgamma(x: number): number {
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
    -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  if (x < 0.5) {
    // reflection (not needed for n≥0, but keep it safe)
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  }
  x -= 1;
  let a = c[0];
  const tt = x + g + 0.5;
  for (let i = 1; i < g + 2; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(tt) - tt + Math.log(a);
}

// Poisson P_n = exp(n ln λ − λ − lgamma(n+1)),  λ = |α|².
function poisson(n: number, lambda: number): number {
  if (lambda <= 0) return n === 0 ? 1 : 0; // vacuum: only n=0
  return Math.exp(n * Math.log(lambda) - lambda - lgamma(n + 1));
}

// Bose-Einstein P_th(n) = nbar^n / (nbar+1)^{n+1}.
function bose(n: number, nbar: number): number {
  if (nbar <= 0) return n === 0 ? 1 : 0;
  return Math.exp(n * Math.log(nbar) - (n + 1) * Math.log(nbar + 1));
}

export default function Ch15Sim() {
  const [absAlpha, setAbsAlpha] = useState(3); // |α|
  const [phi, setPhi] = useState(0); // φ  (rad)
  const [Omega, setOmega] = useState(1); // Ω  mode frequency (scaled)
  const [showThermal, setShowThermal] = useState(false);
  const [temp, setTemp] = useState(2); // T  in units ℏΩ/k_B (scaled)

  // ── derived quantities (live; read by the closure each render) ──────────────
  const nbar = absAlpha * absAlpha; // ⟨n⟩ = |α|²
  const dn = absAlpha; // Δn = |α|  (Poisson: variance = mean)
  const relWidth = absAlpha > 0 ? 1 / absAlpha : Infinity; // Δn/⟨n⟩ = 1/|α|
  const sigma = 1 / Math.SQRT2; // fixed vacuum width (ℏ=M=1)
  const qSwing = Math.SQRT2 * absAlpha; // amplitude of q_c(t) and ⟨E⟩(t)
  // thermal mean photon number  ⟨n⟩_th = 1/(e^{ℏΩ/k_BT} − 1),  x = ℏΩ/k_BT
  const x = temp > 0 ? 1 / temp : Infinity; // ℏΩ = 1 in scaled units
  const nbarTh = temp > 0 ? 1 / (Math.exp(x) - 1) : 0;

  const draw = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);

    // live phase of the packet/field
    const phase = Omega * t + phi;
    const qc = qSwing * Math.cos(phase); // packet center q_c(t)
    const Efield = qSwing * Math.cos(phase); // ⟨E⟩(t) — same cosine

    // ===== layout: three panels stacked-ish; A+B on top row, C below ==========
    const gap = 14;
    const topH = h * 0.52;
    const botY = topH + gap;
    const botH = h - botY - 4;
    const aW = w * 0.5 - gap / 2;
    const bX = aW + gap;
    const bW = w - bX;

    // ---- PANEL A: oscillator well + rigid Gaussian packet --------------------
    (() => {
      const x0 = 8;
      const y0 = 8;
      const pw = aW - 16;
      const ph = topH - 16;
      const cx = x0 + pw / 2;
      // q -> screen.  Show q ∈ [-Qmax, Qmax]; cover the FULL swing (= √2·|α|)
      // plus a margin so the packet never clips off-frame, even at |α| = 15.
      const Qmax = Math.max(3, Math.SQRT2 * 15 + 3); // fixed frame, fits max swing
      const qToX = (q: number) => cx + (q / Qmax) * (pw / 2);
      // parabolic potential V = ½ q²  (drawn as a guide)
      ctx.strokeStyle = "#dbe2ef";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const vTop = y0 + 6;
      const vBot = y0 + ph - 22;
      const Vmax = 0.5 * Qmax * Qmax;
      const VToY = (V: number) => vBot - (V / Vmax) * (vBot - vTop);
      for (let px = 0; px <= pw; px += 2) {
        const q = ((px - pw / 2) / (pw / 2)) * Qmax;
        const V = 0.5 * q * q;
        const yy = VToY(V);
        px === 0 ? ctx.moveTo(x0 + px, yy) : ctx.lineTo(x0 + px, yy);
      }
      ctx.stroke();

      // baseline (q axis)
      ctx.strokeStyle = "#c2cad8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0, vBot);
      ctx.lineTo(x0 + pw, vBot);
      ctx.stroke();

      // Gaussian density |ψ|², height encodes probability; rigid width σ.
      const drawGaussian = (center: number, color: string, fillA: number, dashed: boolean) => {
        const ampPix = ph * 0.42; // peak height of the bump on screen
        ctx.beginPath();
        for (let px = 0; px <= pw; px += 1) {
          const q = ((px - pw / 2) / (pw / 2)) * Qmax;
          const pdf = Math.exp(-((q - center) ** 2) / (2 * sigma * sigma));
          const yy = vBot - pdf * ampPix;
          px === 0 ? ctx.moveTo(x0 + px, yy) : ctx.lineTo(x0 + px, yy);
        }
        ctx.lineWidth = dashed ? 1.4 : 2.4;
        ctx.strokeStyle = color;
        ctx.setLineDash(dashed ? [4, 4] : []);
        ctx.stroke();
        ctx.setLineDash([]);
        if (!dashed) {
          ctx.fillStyle = color + "22";
          // close to baseline
          ctx.lineTo(x0 + pw, vBot);
          ctx.lineTo(x0, vBot);
          ctx.closePath();
          ctx.fill();
        }
      };

      // ghost outline at t=0 reference center (q_c(0) = √2|α|cos φ) — proves no spreading
      drawGaussian(qSwing * Math.cos(phi), "#94a3b8", 0, true);
      // live packet
      drawGaussian(qc, "#4f46e5", 0.13, false);

      // center marker line
      ctx.strokeStyle = "#e11d48";
      ctx.setLineDash([2, 3]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(qToX(qc), vTop);
      ctx.lineTo(qToX(qc), vBot);
      ctx.stroke();
      ctx.setLineDash([]);

      // labels
      ctx.fillStyle = "#1b2330";
      ctx.font = "600 12px ui-sans-serif, system-ui";
      ctx.textAlign = "left";
      ctx.fillText("A  |ψ(q,t)|²  in the well", x0, y0 + 2);
      ctx.fillStyle = "#5b6473";
      ctx.font = "11px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.fillText("q", x0 + pw, vBot + 14);
      ctx.fillText(`q_c = ${qc.toFixed(2)},  σ = ${sigma.toFixed(2)} (fixed)`, cx, vBot + 14);
    })();

    // ---- PANEL B: scrolling classical field cosine ⟨E⟩(t) --------------------
    (() => {
      const x0 = bX + 8;
      const y0 = 8;
      const pw = bW - 16;
      const ph = topH - 16;
      const midY = y0 + ph / 2;
      const ampPix = ph * 0.38;
      const Emax = Math.max(1, Math.SQRT2 * 15); // generous fixed scale
      const EToY = (E: number) => midY - (E / Emax) * ampPix;

      // zero axis
      ctx.strokeStyle = "#c2cad8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0, midY);
      ctx.lineTo(x0 + pw, midY);
      ctx.stroke();

      // cosine over a window of past+future phase, with present at the right-ish.
      // Map screen x to a time offset so the wave scrolls leftward.
      const span = (6 * Math.PI) / Math.max(Omega, 0.2); // ~3 periods visible
      const tToX = (tt: number) => x0 + pw * (1 - (t - tt) / span);
      ctx.strokeStyle = "#0891b2";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      let started = false;
      for (let px = 0; px <= pw; px += 1) {
        const tt = t - span * (1 - px / pw);
        const E = qSwing * Math.cos(Omega * tt + phi);
        const yy = EToY(E);
        if (!started) {
          ctx.moveTo(x0 + px, yy);
          started = true;
        } else ctx.lineTo(x0 + px, yy);
      }
      ctx.stroke();

      // moving dot at the present instant (rightmost)
      ctx.fillStyle = "#e11d48";
      ctx.beginPath();
      ctx.arc(x0 + pw, EToY(Efield), 4.5, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "#1b2330";
      ctx.font = "600 12px ui-sans-serif, system-ui";
      ctx.textAlign = "left";
      ctx.fillText("B  ⟨E⟩(t) = √2|α|cos(Ωt+φ)", x0, y0 + 2);
      ctx.fillStyle = "#5b6473";
      ctx.font = "11px ui-sans-serif, system-ui";
      ctx.fillText(`⟨E⟩ = ${Efield.toFixed(2)}`, x0, midY + ph / 2 - 2);
    })();

    // ---- PANEL C: Poisson photon histogram (+ optional thermal overlay) ------
    (function panelC() {
      const x0 = 52;
      const y0 = botY + 6;
      const pw = w - x0 - 14;
      const ph = botH - 24;
      const baseY = y0 + ph;
      // Window covers the coherent mean ± 4Δn. With the thermal overlay on, the
      // Bose curve concentrates near n = 0 (mean nbarTh) and may sit far below the
      // coherent mean, so anchor the window at 0 and extend to cover both means.
      const nLo = showThermal ? 0 : Math.max(0, Math.floor(nbar - 4 * dn));
      const nHiCoh = Math.ceil(nbar + 4 * dn) + 1;
      const nHiTh = showThermal ? Math.ceil(nbarTh * 3 + 4) : 0;
      const nHi = Math.max(nHiCoh, nHiTh);
      const nCount = Math.max(8, nHi - nLo + 1);
      const colW = pw / nCount;
      let peak = 1e-9;
      for (let n = nLo; n <= nHi; n++) {
        peak = Math.max(peak, poisson(n, nbar));
        if (showThermal) peak = Math.max(peak, bose(n, nbarTh));
      }
      const pToY = (p: number) => baseY - (p / peak) * ph;
      ctx.strokeStyle = "#c2cad8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x0, baseY);
      ctx.lineTo(x0 + pw, baseY);
      ctx.stroke();
      for (let i = 0; i < nCount; i++) {
        const n = nLo + i;
        const p = poisson(n, nbar);
        const bx = x0 + i * colW;
        const bh = baseY - pToY(p);
        ctx.fillStyle = "#4f46e5cc";
        ctx.fillRect(bx + colW * 0.12, baseY - bh, colW * 0.6, bh);
      }
      if (showThermal) {
        ctx.strokeStyle = "#d97706";
        ctx.lineWidth = 1.8;
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        let started = false;
        for (let i = 0; i < nCount; i++) {
          const n = nLo + i;
          const p = bose(n, nbarTh);
          const cxp = x0 + i * colW + colW * 0.42;
          const yy = pToY(p);
          if (!started) {
            ctx.moveTo(cxp, yy);
            started = true;
          } else ctx.lineTo(cxp, yy);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }
      const meanX = x0 + (nbar - nLo) * colW + colW * 0.42;
      if (nbar >= nLo && nbar <= nHi) {
        ctx.strokeStyle = "#e11d48";
        ctx.setLineDash([3, 3]);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(meanX, y0);
        ctx.lineTo(meanX, baseY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = "#5b6473";
      ctx.font = "10px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      const tickStep = Math.max(1, Math.round(nCount / 6));
      for (let i = 0; i < nCount; i += tickStep) {
        const n = nLo + i;
        ctx.fillText(String(n), x0 + i * colW + colW * 0.42, baseY + 12);
      }
      ctx.fillStyle = "#1b2330";
      ctx.font = "600 12px ui-sans-serif, system-ui";
      ctx.textAlign = "left";
      ctx.fillText("C  photon statistics  P_n", x0, botY - 2);
      ctx.fillStyle = "#4f46e5";
      ctx.font = "11px ui-sans-serif, system-ui";
      ctx.fillText("Poisson (coherent)", x0, y0 + 10);
      if (showThermal) {
        ctx.fillStyle = "#d97706";
        ctx.fillText("Bose–Einstein (thermal)", x0 + 130, y0 + 10);
      }
      ctx.fillStyle = "#5b6473";
      ctx.textAlign = "right";
      ctx.fillText("n", x0 + pw, baseY + 12);
    })();
  };

  return (
    <div>
      <Canvas width={620} height={420} draw={draw} speed={0.6} />

      <Controls>
        <Slider
          label={String.raw`|\alpha|`}
          tex
          min={0}
          max={15}
          step={0.1}
          value={absAlpha}
          onChange={setAbsAlpha}
          unit="(dimensionless)"
        />
        <Slider
          label={String.raw`\phi`}
          tex
          min={0}
          max={6.283}
          step={0.01}
          value={phi}
          onChange={setPhi}
          unit="rad"
        />
        <Slider
          label={String.raw`\Omega`}
          tex
          min={0.2}
          max={3}
          step={0.05}
          value={Omega}
          onChange={setOmega}
          unit="rad/s"
        />
        <Toggle label="Thermal comparison overlay" checked={showThermal} onChange={setShowThermal} />
        <Slider
          label={String.raw`T`}
          tex
          min={0}
          max={10}
          step={0.1}
          value={temp}
          onChange={setTemp}
          unit="ℏΩ/k_B"
        />
        <Readout label={String.raw`\langle n\rangle = |\alpha|^2`} tex value={nbar.toFixed(2)} />
        <Readout label={String.raw`\Delta n = |\alpha|`} tex value={dn.toFixed(2)} />
        <Readout
          label={String.raw`\Delta n/\langle n\rangle = 1/|\alpha|`}
          tex
          value={absAlpha > 0 ? relWidth.toFixed(3) : "∞"}
        />
        <Readout label={String.raw`\Delta q\,\Delta p`} tex value="0.500 = ℏ/2  (all t)" />
        <Readout
          label={String.raw`\langle n\rangle_{\text{th}} = (e^{\hbar\Omega/k_BT}-1)^{-1}`}
          tex
          value={showThermal ? nbarTh.toFixed(2) : "—"}
        />
      </Controls>
    </div>
  );
}
