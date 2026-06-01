"use client";

/**
 * Chapter VI — The State Vector: coherent two-level atom → radiating dipole.
 *
 * We integrate the chapter's literal 2x2 Schrödinger equation (set ħ = 1):
 *
 *     i d/dt (c_a, c_b)^T = H (c_a, c_b)^T,
 *     H = [[ω_a, V],[V, ω_b]]    (V = 𝒱_ab, real, symmetric).
 *
 * H is a constant Hermitian matrix, so the exact, unitary, norm-preserving
 * solution is c(t) = exp(-i H t) c(0). Writing
 *     H = ω̄ I + (Δ σ_z + V σ_x),   ω̄ = (ω_a+ω_b)/2,  Δ = (ω_a-ω_b)/2,
 * gives the closed form
 *     exp(-iHt) = e^{-i ω̄ t}[ cos(Rt) I - i sin(Rt) (Δ σ_z + V σ_x)/R ],
 *     R = sqrt(Δ² + V²).
 * We evaluate c(t) fresh from the Canvas time each frame — stateless, no Euler
 * drift, and |c_a|² + |c_b|² stays pinned to 1.
 *
 * Dipole expectation (Eq. 56), the chapter's headline result:
 *     ⟨er⟩(t) = e[ c_a*(t) c_b(t) ℘ + c.c. ] = 2 e ℘ Re{ c_a* c_b }.
 *
 * V_ab defaults to 0 — the chapter's actual (free-evolution) case: constant
 * populations and a dipole beating purely at the Bohr frequency ω_a - ω_b.
 * Nonzero V_ab is a FORWARD-LOOKING preview (Rabi flopping, later chapters),
 * NOT a Chapter-VI result; it is labeled as such in the UI.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series, Marker } from "@/components/sim";

type Complex = { re: number; im: number };
const cmul = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
});
const cadd = (a: Complex, b: Complex): Complex => ({ re: a.re + b.re, im: a.im + b.im });
const conj = (a: Complex): Complex => ({ re: a.re, im: -a.im });
const cabs = (a: Complex): number => Math.hypot(a.re, a.im);

export default function Ch06Sim() {
  const [omegaA, setOmegaA] = useState(12); // ω_a  (rad/fs, scaled)
  const [omegaB, setOmegaB] = useState(2); // ω_b  (rad/fs, scaled)
  const [pA, setPA] = useState(0.5); // initial upper population |c_a(0)|²
  const [dTheta, setDTheta] = useState(0); // initial relative phase θ_a - θ_b
  const [wp, setWp] = useState(1); // transition dipole ℘ = r_ab
  const [vAb, setVAb] = useState(0); // off-diagonal coupling 𝒱_ab (preview knob)

  // Bohr (transition) frequency and its period.
  const bohr = Math.abs(omegaA - omegaB);
  const bohrPeriod = bohr > 1e-6 ? (2 * Math.PI) / bohr : Infinity;

  // Closed-form propagated amplitudes c_a(t), c_b(t) for constant H (ħ = 1).
  const evolve = useMemo(() => {
    const ca0: Complex = { re: Math.sqrt(pA) * Math.cos(dTheta), im: Math.sqrt(pA) * Math.sin(dTheta) };
    const cb0: Complex = { re: Math.sqrt(Math.max(0, 1 - pA)), im: 0 };
    const wbar = 0.5 * (omegaA + omegaB);
    const del = 0.5 * (omegaA - omegaB);
    const R = Math.sqrt(del * del + vAb * vAb);
    return (t: number): [Complex, Complex] => {
      const c = Math.cos(R * t);
      const s = R > 1e-9 ? Math.sin(R * t) / R : t; // safe limit sin(Rt)/R → t
      // exp(-iHt) without the global phase: M = cos(Rt) I - i sin(Rt)(Δσ_z + V σ_x)/R
      // M = [[c - i s Δ,   -i s V],
      //      [  -i s V,   c + i s Δ]]
      const m00: Complex = { re: c, im: -s * del };
      const m01: Complex = { re: 0, im: -s * vAb };
      const m10: Complex = { re: 0, im: -s * vAb };
      const m11: Complex = { re: c, im: s * del };
      let caT = cadd(cmul(m00, ca0), cmul(m01, cb0));
      let cbT = cadd(cmul(m10, ca0), cmul(m11, cb0));
      // global phase e^{-i ω̄ t}
      const g: Complex = { re: Math.cos(wbar * t), im: -Math.sin(wbar * t) };
      caT = cmul(g, caT);
      cbT = cmul(g, cbT);
      return [caT, cbT];
    };
  }, [omegaA, omegaB, pA, dTheta, vAb]);

  // Dipole expectation ⟨er⟩(t) = 2 e ℘ Re{ c_a* c_b }; set e = 1 (scaled units).
  const dipole = (t: number): number => {
    const [ca, cb] = evolve(t);
    const cc = cmul(conj(ca), cb);
    return 2 * wp * cc.re;
  };

  // Analytic envelope ±2 e ℘ |c_a| |c_b| — constant only when V_ab = 0.
  const envAt = (t: number): number => {
    const [ca, cb] = evolve(t);
    return 2 * wp * cabs(ca) * cabs(cb);
  };

  // ── Main dipole trace over several Bohr periods ──────────────────────────
  const trace = useMemo<Series[]>(() => {
    const span = isFinite(bohrPeriod) ? Math.min(bohrPeriod * 4, 12) : 12;
    const N = 600;
    const xs: number[] = [];
    const yD: number[] = [];
    const yEp: number[] = [];
    const yEm: number[] = [];
    for (let i = 0; i <= N; i++) {
      const t = (i / N) * span;
      xs.push(t);
      yD.push(dipole(t));
      const e = envAt(t);
      yEp.push(e);
      yEm.push(-e);
    }
    return [
      { x: xs, y: yEp, color: "#94a3b8", width: 1.4, dashed: true, label: "±2e℘|c_a||c_b|" },
      { x: xs, y: yEm, color: "#94a3b8", width: 1.4, dashed: true },
      { x: xs, y: yD, color: "#4f46e5", width: 2.5, label: "⟨er⟩(t)" },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [omegaA, omegaB, pA, dTheta, wp, vAb]);
  const traceSpan = isFinite(bohrPeriod) ? Math.min(bohrPeriod * 4, 12) : 12;
  const dipMax = Math.max(0.2, 2 * wp * 0.5 + 0.05); // |c_a||c_b| ≤ 1/2
  const bohrMarkers: Marker[] = isFinite(bohrPeriod) && bohrPeriod <= traceSpan
    ? [{ x: bohrPeriod, color: "#e11d48", label: "Bohr period 2π/|ω_a−ω_b|" }]
    : [];

  // ── Animated phasors + population bars ───────────────────────────────────
  const draw = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);
    const tt = t * 0.12; // slow the (large, scaled) frequencies to a visible rate
    const [ca, cb] = evolve(tt);
    const pa = cabs(ca) ** 2;
    const pb = cabs(cb) ** 2;
    const dip = dipole(tt);
    const dmax = 2 * wp * 0.5 + 1e-6;

    // ---- left: two phasors in the complex plane -------------------------
    const cx = w * 0.2;
    const cy = h * 0.45;
    const Rdisk = Math.min(w * 0.16, h * 0.34);

    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, Rdisk, 0, 2 * Math.PI);
    ctx.stroke();
    // axes
    ctx.beginPath();
    ctx.moveTo(cx - Rdisk, cy);
    ctx.lineTo(cx + Rdisk, cy);
    ctx.moveTo(cx, cy - Rdisk);
    ctx.lineTo(cx, cy + Rdisk);
    ctx.stroke();

    const phasor = (c: Complex, color: string) => {
      const ex = cx + c.re * Rdisk;
      const ey = cy - c.im * Rdisk;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(ex, ey, 4.5, 0, 2 * Math.PI);
      ctx.fill();
    };
    phasor(cb, "#0891b2"); // c_b e^{-iω_b t}
    phasor(ca, "#e11d48"); // c_a e^{-iω_a t}

    ctx.fillStyle = "#5b6473";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("complex plane", cx, cy + Rdisk + 18);
    ctx.fillStyle = "#e11d48";
    ctx.textAlign = "left";
    ctx.fillText("c_a (upper, rate ω_a)", cx + Rdisk * 0.1, cy - Rdisk - 6);
    ctx.fillStyle = "#0891b2";
    ctx.fillText("c_b (lower, rate ω_b)", cx + Rdisk * 0.1, cy - Rdisk + 8);

    // ---- middle: population bars ----------------------------------------
    const bx = w * 0.45;
    const barW = 26;
    const barH = h * 0.55;
    const barTop = h * 0.18;
    const bar = (x: number, p: number, color: string, lbl: string) => {
      ctx.fillStyle = "#eef2ff";
      ctx.fillRect(x, barTop, barW, barH);
      ctx.fillStyle = color;
      ctx.fillRect(x, barTop + barH * (1 - p), barW, barH * p);
      ctx.strokeStyle = "#c7cdf5";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, barTop, barW, barH);
      ctx.fillStyle = "#1b2330";
      ctx.font = "600 12px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.fillText(lbl, x + barW / 2, barTop + barH + 16);
      ctx.fillStyle = "#5b6473";
      ctx.font = "11px ui-sans-serif, system-ui";
      ctx.fillText(p.toFixed(2), x + barW / 2, barTop - 6);
    };
    bar(bx, pa, "#e11d48", "P_a");
    bar(bx + barW + 18, pb, "#0891b2", "P_b");

    // ---- right: instantaneous dipole gauge (sloshing charge) ------------
    const gx0 = w * 0.62;
    const gx1 = w * 0.97;
    const gy = h * 0.45;
    const gxc = (gx0 + gx1) / 2;
    const half = (gx1 - gx0) / 2 - 14;
    // baseline track
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(gx0, gy);
    ctx.lineTo(gx1, gy);
    ctx.stroke();
    // two fixed nuclei (the +) and the sloshing electron cloud
    ctx.fillStyle = "#cbd5e1";
    ctx.beginPath();
    ctx.arc(gxc, gy, 5, 0, 2 * Math.PI);
    ctx.fill();
    const off = dmax > 1e-9 ? (dip / dmax) * half : 0;
    const ex = gxc + off;
    const glow = ctx.createRadialGradient(ex, gy, 2, ex, gy, 18);
    glow.addColorStop(0, "rgba(79,70,229,0.85)");
    glow.addColorStop(1, "rgba(79,70,229,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(ex, gy, 18, 0, 2 * Math.PI);
    ctx.fill();
    // arrow from center of charge
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(gxc, gy - 26);
    ctx.lineTo(ex, gy - 26);
    ctx.stroke();
    ctx.fillStyle = "#5b6473";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("⟨er⟩  (sloshing dipole)", gxc, gy + 34);
    ctx.fillStyle = "#1b2330";
    ctx.font = "600 12px ui-sans-serif, system-ui";
    ctx.fillText(`⟨er⟩ = ${dip.toFixed(2)}`, gxc, gy - 44);
  };

  return (
    <div>
      <Canvas width={620} height={250} draw={draw} speed={1} />

      <div style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
          Dipole expectation ⟨er⟩(t) and its envelope
        </div>
        <Plot
          width={620}
          height={240}
          xRange={[0, traceSpan]}
          yRange={[-dipMax, dipMax]}
          xLabel="t  (fs, scaled)"
          yLabel="⟨er⟩"
          lines={trace}
          markers={bohrMarkers}
        />
      </div>

      <Controls>
        <Slider
          label={String.raw`\omega_a`}
          tex
          min={5}
          max={20}
          step={0.1}
          value={omegaA}
          onChange={setOmegaA}
          unit="rad/fs"
        />
        <Slider
          label={String.raw`\omega_b`}
          tex
          min={0}
          max={10}
          step={0.1}
          value={omegaB}
          onChange={setOmegaB}
          unit="rad/fs"
        />
        <Slider
          label={String.raw`P_a=|c_a(0)|^2`}
          tex
          min={0}
          max={1}
          step={0.01}
          value={pA}
          onChange={setPA}
        />
        <Slider
          label={String.raw`\Delta\theta=\theta_a-\theta_b`}
          tex
          min={0}
          max={6.2832}
          step={0.05}
          value={dTheta}
          onChange={setDTheta}
          unit="rad"
        />
        <Slider
          label={String.raw`\wp=r_{ab}`}
          tex
          min={0}
          max={2}
          step={0.05}
          value={wp}
          onChange={setWp}
          unit="e·a₀"
        />
        <Slider
          label={String.raw`\mathscr{V}_{ab}\;\text{(preview)}`}
          tex
          min={0}
          max={5}
          step={0.1}
          value={vAb}
          onChange={setVAb}
          unit="ℏ·rad/fs"
        />
        <Toggle
          label="Pure eigenstate (P_a = 1 → dead-flat dipole)"
          checked={pA >= 0.999}
          onChange={(on) => setPA(on ? 1 : 0.5)}
        />
        <Readout
          label={String.raw`\omega_a-\omega_b\;\text{(Bohr)}`}
          tex
          value={`${(omegaA - omegaB).toFixed(2)} rad/fs`}
        />
        <Readout
          label={String.raw`\text{peak }2e\wp|c_a||c_b|`}
          tex
          value={(2 * wp * Math.sqrt(pA * Math.max(0, 1 - pA))).toFixed(3)}
        />
        <Readout
          label={String.raw`|c_a|^2+|c_b|^2`}
          tex
          value={(() => {
            const [ca, cb] = evolve(1.234);
            return (cabs(ca) ** 2 + cabs(cb) ** 2).toFixed(4);
          })()}
        />
        <Readout
          label={String.raw`\mathscr{V}_{ab}=0\;?`}
          tex
          value={vAb === 0 ? "free evolution (Ch. VI)" : "preview: Rabi (later)"}
        />
      </Controls>
    </div>
  );
}
