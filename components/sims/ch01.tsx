"use client";

/**
 * Chapter I — The oscillating dipole: a two-state superposition in an infinite well.
 *
 * Everything is analytic from the box eigenfunctions/energies, Eqs. (16)-(18):
 *   u_n(x) = sqrt(2/L) sin(n pi x / L),   hbar*omega_n = (hbar^2 pi^2 / 2 m L^2) n^2
 *
 * Prepare  psi(x,t) = Cn u_n e^{-i w_n t} + Cm u_m e^{-i w_m t},  Cn^2 + |Cm|^2 = 1,
 * with relative phase  Cm = |Cm| e^{i phi}.  Then
 *   P(x,t) = Cn^2 u_n^2 + |Cm|^2 u_m^2 + 2 Cn |Cm| u_n u_m cos((w_m - w_n) t - phi)
 *   <x>(t) = L/2 + 2 Cn |Cm| x_nm cos((w_m - w_n) t - phi)
 * The static part is exactly L/2 (since ∫ x u_n^2 = L/2 for every n and Cn^2+|Cm|^2=1).
 * The dipole matrix element has the closed form
 *   x_nm = -8 L n m / [pi^2 (m^2 - n^2)^2]   for (m-n) odd,   = 0 for (m-n) even.
 * That zero IS the selection rule the student watches fire.
 *
 * Readout fidelity is the graded invariant: we use real hbar, electron mass, and L
 * in nm, and report the true Bohr frequency in rad/fs, period in fs, and energies in
 * eV. The on-screen ANIMATION time is rescaled for watchability (one cannot animate
 * a ~10^15 Hz oscillation), but every NUMBER shown is physical.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Controls, Readout, Series } from "@/components/sim";

// ── physical constants (SI), with a length unit of nm ───────────────────────
const HBAR = 1.054571817e-34; // J·s
const ME = 9.1093837015e-31; // kg
const NM = 1e-9; // m
const J_PER_EV = 1.602176634e-19; // J/eV

// energy hbar*omega_n in joules, for L in nm
const energyJ = (n: number, Lnm: number) => {
  const L = Lnm * NM;
  return (HBAR * HBAR * Math.PI * Math.PI) / (2 * ME * L * L) * n * n;
};
// angular frequency omega_n in rad/s
const omega = (n: number, Lnm: number) => energyJ(n, Lnm) / HBAR;

// dipole matrix element x_nm = ∫_0^L x u_n u_m dx (in nm), closed form.
const xMatrix = (n: number, m: number, Lnm: number) => {
  if (n === m) return 0;
  const odd = (m - n) % 2 !== 0;
  if (!odd) return 0; // even m-n ⇒ selection rule ⇒ exactly zero
  return (-8 * Lnm * n * m) / (Math.PI * Math.PI * (m * m - n * n) * (m * m - n * n));
};

export default function Ch01Sim() {
  const [cm2, setCm2] = useState(0.5); // |C_m|^2 mixing fraction
  const [phi, setPhi] = useState(0.0); // relative phase φ (rad)
  const [n, setN] = useState(1); // lower level
  const [m, setM] = useState(2); // upper level
  const [Lnm, setLnm] = useState(1.0); // well width (nm)

  const valid = m !== n; // guard against m = n (and we report |Δω| so m<n is fine)
  const Cn = Math.sqrt(Math.max(0, 1 - cm2));
  const Cm = Math.sqrt(Math.max(0, cm2));

  // true physical quantities (the graded invariant)
  const wn = omega(n, Lnm); // rad/s
  const wm = omega(m, Lnm); // rad/s
  const dOmega = Math.abs(wm - wn); // |ω_m − ω_n|, rad/s
  const dOmega_radfs = dOmega * 1e-15; // rad/fs
  const period_fs = valid && dOmega > 0 ? (2 * Math.PI) / dOmega / 1e-15 : Infinity; // fs
  const En_eV = energyJ(n, Lnm) / J_PER_EV;
  const Em_eV = energyJ(m, Lnm) / J_PER_EV;

  const xnm = xMatrix(n, m, Lnm); // nm
  const xStatic = Lnm / 2; // L/2 (nm)
  const ampPP = 2 * 2 * Cn * Cm * Math.abs(xnm); // peak-to-peak swing of <x>(t), nm
  const ampHalf = 2 * Cn * Cm * xnm; // signed amplitude (nm)

  // On-screen animation: scale real ω to a watchable rate, but PRESERVE the
  // physics that raising m or shrinking L speeds the oscillation up. We drive the
  // visible phase at  Wvis = K · (ω_m − ω_n) / ω_ref , with ω_ref the n=1,m=2,L=1nm
  // value, so the ratio of on-screen rates equals the ratio of true Bohr rates.
  const wRef = Math.abs(omega(2, 1) - omega(1, 1)); // rad/s reference
  // Clamp the on-screen rate so the canvas never advances so far per frame that
  // it aliases into a blur (cosmetic only — readouts carry the true numbers).
  const WvisRaw = valid ? 2.4 * ((wm - wn) / wRef) : 0;
  const WVIS_CAP = 16; // rad / sim-second
  const Wvis = Math.sign(WvisRaw) * Math.min(Math.abs(WvisRaw), WVIS_CAP); // signed

  const u = (k: number, x: number) => Math.sqrt(2 / Lnm) * Math.sin((k * Math.PI * x) / Lnm);

  // ── bottom plot: <x>(t) over a few visible periods (static, redraws on deps) ─
  const xtPlot = useMemo<Series[]>(() => {
    if (!valid) return [{ x: [0, 1], y: [xStatic, xStatic], color: "#94a3b8", width: 2 }];
    const Tvis = Wvis !== 0 ? (2 * Math.PI) / Math.abs(Wvis) : 1; // sim-seconds per period
    const span = Tvis * 3;
    const N = 360;
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * span;
      x.push(t);
      y.push(xStatic + ampHalf * Math.cos(Wvis * t - phi));
    }
    return [{ x, y, color: "#4f46e5", width: 2.5, label: "⟨x⟩(t)", fill: false }];
  }, [valid, Wvis, ampHalf, phi, xStatic]);

  const TvisPlot = valid && Wvis !== 0 ? ((2 * Math.PI) / Math.abs(Wvis)) * 3 : 1;

  // ── animated canvas: |ψ|² over the well + ghost u_n,u_m + ⟨x⟩ marker ────────
  const draw = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);

    const padL = 44;
    const padR = 20;
    const padT = 18;
    const padB = 34;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const baseY = padT + plotH; // x-axis (P = 0)

    const sx = (x: number) => padL + (x / Lnm) * plotW; // x in nm → px
    // vertical scale: max of P over x is ~ (Cn|u_n|+Cm|u_m|)^2 ≤ (Cn+Cm)^2 * 2/L
    const Pmax = ((Cn + Cm) * (Cn + Cm) * 2) / Lnm;
    const sy = (P: number) => baseY - (P / (Pmax * 1.08)) * plotH;

    // walls of the well
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sx(0), padT - 6);
    ctx.lineTo(sx(0), baseY);
    ctx.lineTo(sx(Lnm), baseY);
    ctx.lineTo(sx(Lnm), padT - 6);
    ctx.stroke();

    const phase = Wvis * t - phi; // visible phase

    // ghost component densities Cn^2 u_n^2 and Cm^2 u_m^2
    const ghost = (k: number, C: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.25;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const x = (i / 200) * Lnm;
        const P = C * C * u(k, x) * u(k, x);
        i === 0 ? ctx.moveTo(sx(x), sy(P)) : ctx.lineTo(sx(x), sy(P));
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };
    ghost(n, Cn, "#94a3b8");
    ghost(m, Cm, "#d9a3b8");

    // full |ψ|² with the live cross term
    const Pfull = (x: number) => {
      const un = u(n, x);
      const um = u(m, x);
      return Cn * Cn * un * un + Cm * Cm * um * um + 2 * Cn * Cm * un * um * Math.cos(phase);
    };

    ctx.beginPath();
    ctx.moveTo(sx(0), baseY);
    for (let i = 0; i <= 240; i++) {
      const x = (i / 240) * Lnm;
      ctx.lineTo(sx(x), sy(Pfull(x)));
    }
    ctx.lineTo(sx(Lnm), baseY);
    ctx.closePath();
    ctx.fillStyle = "rgba(79,70,229,0.16)";
    ctx.fill();
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i <= 240; i++) {
      const x = (i / 240) * Lnm;
      const px = sx(x);
      const py = sy(Pfull(x));
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // ⟨x⟩(t) marker — the charge centroid
    const xExp = xStatic + ampHalf * Math.cos(phase);
    const mx = sx(xExp);
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mx, padT - 6);
    ctx.lineTo(mx, baseY);
    ctx.stroke();
    ctx.fillStyle = "#e11d48";
    ctx.beginPath();
    ctx.arc(mx, baseY, 4.5, 0, 2 * Math.PI);
    ctx.fill();
    // centroid range guides
    ctx.strokeStyle = "#fca5b8";
    ctx.setLineDash([2, 3]);
    ctx.lineWidth = 1;
    [xStatic - Math.abs(ampHalf), xStatic + Math.abs(ampHalf)].forEach((xg) => {
      ctx.beginPath();
      ctx.moveTo(sx(xg), baseY - 6);
      ctx.lineTo(sx(xg), baseY + 6);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // labels
    ctx.fillStyle = "#5b6473";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("x = 0", sx(0), baseY + 22);
    ctx.fillText(`x = L = ${Lnm.toFixed(2)} nm`, sx(Lnm), baseY + 22);
    ctx.fillStyle = "#1b2330";
    ctx.font = "600 13px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("|ψ(x,t)|²", padL + 6, padT + 6);
    ctx.fillStyle = "#e11d48";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.fillText("⟨x⟩(t)", mx + 7, padT + 6);

    if (!valid) {
      ctx.fillStyle = "rgba(225,29,72,0.9)";
      ctx.font = "600 14px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.fillText("choose m ≠ n", w / 2, padT + plotH / 2);
    }
  };

  return (
    <div>
      <Canvas width={560} height={260} draw={draw} speed={1} />

      <div style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
          Dipole centroid ⟨x⟩(t) — a cosine at the Bohr frequency ω_m − ω_n
        </div>
        <Plot
          width={560}
          height={200}
          xRange={[0, TvisPlot]}
          yRange={[0, Lnm]}
          xLabel="time (scaled for viewing)"
          yLabel="⟨x⟩  (nm)"
          lines={xtPlot}
          markers={[
            { y: xStatic, color: "#94a3b8", dashed: true, label: "L/2" },
            { y: xStatic + ampHalf, color: "#e11d48" },
            { y: xStatic - ampHalf, color: "#e11d48" },
          ]}
        />
      </div>

      <Controls>
        <Slider
          label={String.raw`|C_m|^2`}
          tex
          min={0}
          max={1}
          step={0.01}
          value={cm2}
          onChange={setCm2}
        />
        <Slider
          label={String.raw`\varphi`}
          tex
          min={0}
          max={6.283}
          step={0.01}
          value={phi}
          onChange={setPhi}
          unit="rad"
        />
        <Slider label={String.raw`n\ \text{(lower)}`} tex min={1} max={5} step={1} value={n} onChange={(v) => setN(Math.round(v))} />
        <Slider label={String.raw`m\ \text{(upper)}`} tex min={2} max={6} step={1} value={m} onChange={(v) => setM(Math.round(v))} />
        <Slider label={String.raw`L`} tex min={0.5} max={5} step={0.05} value={Lnm} onChange={setLnm} unit="nm" />

        <Readout
          label={String.raw`\omega_{mn}=\omega_m-\omega_n`}
          tex
          value={valid ? `${dOmega_radfs.toFixed(3)} rad/fs` : "—"}
        />
        <Readout
          label={String.raw`T=2\pi/\omega_{mn}`}
          tex
          value={valid && isFinite(period_fs) ? `${period_fs.toFixed(2)} fs` : "—"}
        />
        <Readout
          label={String.raw`x_{nm}=\int x\,u_n u_m\,dx`}
          tex
          value={`${xnm.toFixed(4)} nm${xnm === 0 ? "  (selection rule!)" : ""}`}
        />
        <Readout label={String.raw`\text{peak-to-peak }\langle x\rangle`} tex value={`${ampPP.toFixed(4)} nm`} />
        <Readout label={String.raw`\hbar\omega_n`} tex value={`${En_eV.toFixed(3)} eV`} />
        <Readout label={String.raw`\hbar\omega_m`} tex value={`${Em_eV.toFixed(3)} eV`} />
      </Controls>
    </div>
  );
}
