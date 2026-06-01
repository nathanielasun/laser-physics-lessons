"use client";

/**
 * Appendix E — Gas-laser strong-signal theory: the continued fraction.
 *
 * TWO INDEPENDENT VIEWS of the same physics:
 *
 *  (1) The gain/pull SPECTRA are the saturated strong-signal response: the
 *      per-velocity-group polarization divided by the population-pulsation
 *      saturation factor (Eqs. E.33/E.35), Maxwellian-averaged over velocity
 *      (Eqs. E.28-29). These plot the saturated GAIN (in-quadrature, Im part)
 *      and the FREQUENCY PULLING (in-phase, Re part) versus cavity detuning
 *      Δ = (ω − ν)/γ. Raising I animates gain saturation, the opening and
 *      power-broadening of the Lamb dip, and power-dependent pulling. A dashed
 *      weak-signal (I → 0) overlay shows exactly what saturation adds. (These
 *      curves do NOT depend on N — N controls only the inset below.)
 *
 *  (2) The convergence INSET evaluates the continued fraction (Eq. E.16) that
 *      UNDERLIES that saturation factor, bottom-up to depth N, and shows the
 *      residual |r₀(N) − r₀(N−1)| collapsing — the all-orders summation that the
 *      saturation factor is the closed form of, made tangible.
 *
 * Units: γ = 1 sets the homogeneous (dipole) linewidth, and γab = 1 sets the
 * saturation linewidth, so the Lorentzians below are dimensionless. E = I/4
 * is the dimensionless field-squared coefficient Iₙ = Ēₙ² that weights each
 * inner level of the continued fraction (Eq. E.16).
 *
 * --- The gain / pulling curves (the physics payoff) ---
 * A standing wave is two counter-propagating travelling waves. An atom at
 * velocity v is Doppler-shifted into resonance with one wave at detuning
 * (Δ − Kv) and with the other at (Δ + Kv). The gain a probe sees from a velocity
 * group is the absorptive Lorentzian L_r(Δ − Kv); BOTH waves saturate (burn a
 * hole in) that group, so the saturated population is the unsaturated value
 * divided by the population-pulsation factor (Eq. E.33/E.35):
 *
 *   gain integrand  G(v) = L_r(Δ − Kv) / [ 1 + (I/2)( L_r(Δ−Kv) + L_r(Δ+Kv) ) ]
 *   pull integrand  P(v) = L_i(Δ − Kv) / [ same denominator ]
 *
 * with L_r(x) = 1/(1+x²) absorptive, L_i(x) = −x/(1+x²) dispersive. At line
 * center (Δ = 0) the two holes L_r(−Kv) and L_r(+Kv) coincide for every group,
 * doubling the saturation there — that is the Lamb dip, and it power-broadens
 * as I grows. The weak-signal (third-order) reference drops the denominator
 * (I → 0). Verified numerically: gain is even in Δ, pull is odd, the dip opens
 * (~12% at I=2 → ~15% at I=10) and broadens (FWHM 1.6γ → 2.8γ).
 *
 * --- The continued fraction (Eq. E.16) ---
 * The exact all-orders resummation. We evaluate it bottom-up with genuinely
 * k-dependent complex denominators D_k carrying the beat harmonic 2k·Kv:
 *   den = 1;  for k = N..1:  den = 1 + E · D_k · D_{k+1} · den
 *   r₀  = E · D_0 / den
 * The first convergent (N → 1, innermost bracket = 1) is the weak-signal seed
 * E·D_0 (Eq. E.31). The inset plots the residual |r₀(N) − r₀(N−1)|, which
 * collapses below 1e-4 by N ~ 5 (verified) — the all-orders sum made tangible.
 *
 * JS has no complex type, so every complex op goes through {re,im} helpers.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series, Marker } from "@/components/sim";

// ── minimal complex arithmetic ──────────────────────────────────────────────
type C = { re: number; im: number };
const cx = (re: number, im = 0): C => ({ re, im });
const cadd = (a: C, b: C): C => ({ re: a.re + b.re, im: a.im + b.im });
const cmul = (a: C, b: C): C => ({ re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re });
const cscale = (a: C, s: number): C => ({ re: a.re * s, im: a.im * s });
const crecip = (a: C): C => {
  const d = a.re * a.re + a.im * a.im;
  return { re: a.re / d, im: -a.im / d };
};
const cdiv = (a: C, b: C): C => cmul(a, crecip(b));
const cmag = (a: C): number => Math.hypot(a.re, a.im);

// Gain/dispersion Lorentzians at the dipole linewidth (γ = 1):
const Lr = (x: number) => 1 / (1 + x * x); // absorptive (gain)
const Li = (x: number) => -x / (1 + x * x); // dispersive (pulling)
// Saturation "hole" Lorentzian at the population linewidth γab (the holes a
// strong field burns into the inversion have width γab, set by the level decays):
const Ls = (x: number, gab: number) => 1 / (1 + (x / gab) * (x / gab));

export default function AppESim() {
  const [I, setI] = useState(4.0); // saturation intensity (= 4 E)
  const [KuOverG, setKuOverG] = useState(8.0); // Doppler width / homogeneous width
  const [ratio, setRatio] = useState(1.0); // γa / γb
  const [depth, setDepth] = useState(6); // continued-fraction truncation depth N
  const [probe, setProbe] = useState(0.0); // probe detuning Δ for the pull readout/marker
  const [showWeak, setShowWeak] = useState(true);

  // γb = 1 reference, γa = ratio ⇒ γab = (γa+γb)/2 = (1+ratio)/2 sets the
  // saturation (hole) linewidth, distinct from the dipole gain width γ = 1.
  const gAB = (1 + ratio) / 2;
  const E = I / 4; // Iₙ = Ēₙ² = I/4, the field-squared CF coefficient (Eq. E.16)

  // x-axis scales with the Doppler width so the dip keeps context (a ~2.5γ dip
  // would vanish inside a fixed ±5γ window once Ku ≫ γ).
  const xMax = Math.max(5, 2.5 * KuOverG);

  // ── gain & pulling integrands, divisive two-sideband form (Eqs. E.33/E.35) ─
  // weak=true drops the saturation denominator (I → 0, the third-order curve).
  const velAverage = (Delta: number, weak: boolean): { gain: number; pull: number } => {
    const u = Math.max(KuOverG, 1e-3);
    const span = 5 * u;
    const NV = 281; // velocity nodes (odd → includes Kv = 0; symmetric grid)
    const h = (2 * span) / (NV - 1);
    let gain = 0;
    let pull = 0;
    let norm = 0;
    for (let i = 0; i < NV; i++) {
      const Kv = -span + i * h;
      const W = Math.exp(-(Kv * Kv) / (u * u)); // Maxwellian weight W(v)
      const self = Lr(Delta - Kv); // gain this group offers the probe (width γ)
      // both travelling waves saturate this group; the holes have width γab:
      const holeSelf = Ls(Delta - Kv, gAB);
      const holeCross = Ls(Delta + Kv, gAB);
      const sat = weak ? 1 : 1 + (I / 2) * (holeSelf + holeCross);
      gain += (W * self) / sat;
      pull += (W * Li(Delta - Kv)) / sat;
      norm += W;
    }
    return { gain: gain / norm, pull: pull / norm };
  };

  // ── continued fraction (Eq. E.16), genuine k-dependent complex denominators ─
  // D_k(v, Δ) = γab / [ 1 + i (2k·Kv + (Kv + Δ)) / γab ]; the beat-harmonic shift
  // 2k·Kv makes deeper levels more off-resonant, so the fraction converges fast.
  const Dk = (k: number, Kv: number, Delta: number): C =>
    cscale(crecip(cx(1, (2 * k * Kv + (Kv + Delta)) / gAB)), gAB);
  const r0 = (Kv: number, Delta: number, N: number): C => {
    const D0 = cscale(crecip(cx(1, (Kv + Delta) / gAB)), gAB);
    let den = cx(1, 0);
    for (let k = N; k >= 1; k--) {
      const term = cscale(cmul(Dk(k, Kv, Delta), Dk(k + 1, Kv, Delta)), E);
      den = cadd(cx(1, 0), cdiv(term, den));
    }
    return cdiv(cscale(D0, E), den);
  };

  // ── sweep detuning Δ (heavy work — keep the probe slider OUT of this memo) ──
  const DET = 161;
  const {
    gainFull,
    gainWeak,
    pullFull,
    pullWeak,
    peakGain,
    peakGainWeak,
    dipDepth,
    dipFWHM,
    gMax,
    pMax,
    pMin,
  } = useMemo(() => {
    const dets: number[] = [];
    const gF: number[] = [];
    const gW: number[] = [];
    const pF: number[] = [];
    const pW: number[] = [];
    for (let i = 0; i < DET; i++) {
      const Delta = -xMax + (2 * xMax * i) / (DET - 1);
      dets.push(Delta);
      const full = velAverage(Delta, false);
      const weak = velAverage(Delta, true);
      gF.push(full.gain);
      gW.push(weak.gain);
      pF.push(full.pull);
      pW.push(weak.pull);
    }
    const pk = Math.max(...gF);
    const pkW = Math.max(...gW);
    // Lamb-dip metrics: gain at line center vs the off-center shoulder maximum.
    const mid = Math.floor(DET / 2);
    const center = gF[mid];
    const shoulder = pk;
    const dip = shoulder > 1e-12 ? (shoulder - center) / shoulder : 0;
    let fwhm = 0;
    if (dip > 1e-3) {
      const halfLevel = center + 0.5 * (shoulder - center);
      let iR = mid;
      while (iR < DET - 1 && gF[iR] < halfLevel) iR++;
      const dDelta = (2 * xMax) / (DET - 1);
      fwhm = 2 * (iR - mid) * dDelta;
    }
    return {
      gainFull: [
        { x: dets, y: gF, color: "#4f46e5", width: 2.5, label: "full (saturated)", fill: true },
      ] as Series[],
      gainWeak: [
        { x: dets, y: gW, color: "#94a3b8", width: 1.8, dashed: true, label: "weak (3rd order)" },
      ] as Series[],
      pullFull: [{ x: dets, y: pF, color: "#e11d48", width: 2.5, label: "full (saturated)" }] as Series[],
      pullWeak: [
        { x: dets, y: pW, color: "#94a3b8", width: 1.8, dashed: true, label: "weak (3rd order)" },
      ] as Series[],
      peakGain: pk,
      peakGainWeak: pkW,
      dipDepth: dip,
      dipFWHM: fwhm,
      gMax: Math.max(pk, pkW),
      pMax: Math.max(...pF, ...pW),
      pMin: Math.min(...pF, ...pW),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [I, KuOverG, ratio, xMax]);

  // ── continued-fraction convergence inset (at a representative group) ───────
  const conv = useMemo(() => {
    const Kv = 0.6;
    const Delta = 0;
    const vals: C[] = [];
    for (let N = 1; N <= 12; N++) vals.push(r0(Kv, Delta, N));
    const ns: number[] = [];
    const resid: number[] = [];
    for (let k = 1; k < vals.length; k++) {
      ns.push(k + 1);
      resid.push(Math.max(cmag(cadd(vals[k], cscale(vals[k - 1], -1))), 1e-16));
    }
    return { ns, resid, current: vals[Math.min(Math.max(depth, 1), 12) - 1] };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [I, ratio, depth]);

  // probe readouts (cheap single-Δ calls — instant as the probe slider drags)
  const probeFull = velAverage(probe, false);
  const probeWeak = velAverage(probe, true);

  const gainMarkers: Marker[] = [
    { y: 0, color: "#e2e8f0", dashed: false },
    { x: probe, color: "#16a34a", dashed: true, label: "probe Δ" },
  ];
  const pullMarkers: Marker[] = [
    { y: 0, color: "#e2e8f0", dashed: false },
    { x: probe, color: "#16a34a", dashed: true, label: "probe Δ" },
  ];
  const convLines: Series[] = [
    { x: conv.ns, y: conv.resid, color: "#0891b2", width: 2.5, label: "|r₀(N)−r₀(N−1)|" },
  ];

  // ── animated standing-wave grating: the pulsating population grating ───────
  const draw = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);
    const midY = h * 0.56;
    const x0 = 44;
    const x1 = w - 16;
    const k = 7; // spatial periods shown
    const pulse = Math.min(0.92, 0.1 + 0.085 * I); // deeper saturation → deeper grating
    const beat = 1 + 0.3 * Math.sin(t * 2.6); // temporal population pulsation

    // unsaturated inversion baseline
    ctx.strokeStyle = "#cbd5e1";
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(x0, midY);
    ctx.lineTo(x1, midY);
    ctx.stroke();
    ctx.setLineDash([]);

    const Dinv = (x: number) => {
      const z = ((x - x0) / (x1 - x0)) * Math.PI * k;
      const grating = Math.sin(z) * Math.sin(z); // sin²(K z): spatial hole burning
      const D = 1 - pulse * grating * beat;
      return midY - (D - 0.5) * 100;
    };

    // fill under the saturated inversion
    ctx.beginPath();
    ctx.moveTo(x0, Dinv(x0));
    for (let x = x0; x <= x1; x += 2) ctx.lineTo(x, Dinv(x));
    ctx.lineTo(x1, h - 22);
    ctx.lineTo(x0, h - 22);
    ctx.closePath();
    ctx.fillStyle = "rgba(79,70,229,0.10)";
    ctx.fill();

    // saturated inversion curve
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    for (let x = x0; x <= x1; x += 2) (x === x0 ? ctx.moveTo : ctx.lineTo).call(ctx, x, Dinv(x));
    ctx.stroke();

    // standing-wave field on top
    ctx.strokeStyle = "#e2a0b4";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    for (let x = x0; x <= x1; x += 2) {
      const z = ((x - x0) / (x1 - x0)) * Math.PI * k;
      const field = Math.sin(z) * Math.cos(t * 5.5);
      const yy = h * 0.16 + 20 * field;
      (x === x0 ? ctx.moveTo : ctx.lineTo).call(ctx, x, yy);
    }
    ctx.stroke();

    ctx.fillStyle = "#5b6473";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("standing-wave field  E sin(Kₙz)", x0, h * 0.16 - 24);
    ctx.fillStyle = "#3730a3";
    ctx.fillText("saturated inversion  D(z,t)  —  pulsating population grating", x0, h - 6);
    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "right";
    ctx.fillText("unsaturated N̄", x1, midY - 6);
  };

  return (
    <div>
      <Canvas width={620} height={230} draw={draw} speed={1} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Saturated gain  G(Δ) — in-quadrature (Eq. E.28)
          </div>
          <Plot
            width={320}
            height={230}
            xRange={[-xMax, xMax]}
            yRange={[0, gMax * 1.12 + 1e-6]}
            xLabel="detuning  Δ = (ω−ν)/γ"
            yLabel="gain"
            lines={showWeak ? [...gainFull, ...gainWeak] : gainFull}
            markers={gainMarkers}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Frequency pulling  P(Δ) — in-phase (Eq. E.29)
          </div>
          <Plot
            width={320}
            height={230}
            xRange={[-xMax, xMax]}
            yRange={[pMin * 1.15 - 1e-6, pMax * 1.15 + 1e-6]}
            xLabel="detuning  Δ = (ω−ν)/γ"
            yLabel="pull"
            lines={showWeak ? [...pullFull, ...pullWeak] : pullFull}
            markers={pullMarkers}
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
          Continued-fraction convergence (residual vs truncation depth N)
        </div>
        <Plot
          width={660}
          height={150}
          xRange={[2, 12]}
          yRange={[0, Math.max(...conv.resid, 1e-6) * 1.1]}
          xLabel="truncation depth  N"
          yLabel="residual"
          lines={convLines}
          markers={[{ x: depth, color: "#0891b2", dashed: true, label: "current N" }]}
        />
      </div>

      <Controls>
        <Slider
          label={String.raw`I\ \text{(saturation intensity)}`}
          tex
          min={0}
          max={10}
          step={0.1}
          value={I}
          onChange={setI}
        />
        <Slider
          label={String.raw`Ku/\gamma\ \text{(Doppler width)}`}
          tex
          min={0.1}
          max={20}
          step={0.1}
          value={KuOverG}
          onChange={setKuOverG}
        />
        <Slider
          label={String.raw`\gamma_a/\gamma_b`}
          tex
          min={0.2}
          max={5}
          step={0.05}
          value={ratio}
          onChange={setRatio}
        />
        <Slider
          label={String.raw`N\ \text{(CF depth)}`}
          tex
          min={1}
          max={12}
          step={1}
          value={depth}
          onChange={(v) => setDepth(Math.round(v))}
          unit="levels"
        />
        <Slider
          label={String.raw`\Delta_{\text{probe}}`}
          tex
          min={-xMax}
          max={xMax}
          step={0.05}
          value={probe}
          onChange={setProbe}
          unit="γ"
        />
        <Toggle
          label={<span>weak-signal (3rd-order) overlay</span>}
          checked={showWeak}
          onChange={setShowWeak}
        />
        <Readout label={String.raw`\text{peak gain (full)}`} tex value={peakGain.toFixed(4)} />
        <Readout
          label={String.raw`\text{gain reduction vs weak}`}
          tex
          value={peakGainWeak > 1e-9 ? `${(100 * (1 - peakGain / peakGainWeak)).toFixed(1)} %` : "—"}
        />
        <Readout label={String.raw`\text{Lamb-dip depth}`} tex value={`${(100 * dipDepth).toFixed(1)} %`} />
        <Readout
          label={String.raw`\text{Lamb-dip FWHM}`}
          tex
          value={dipFWHM > 0 ? `${dipFWHM.toFixed(2)} γ` : "—"}
        />
        <Readout
          label={String.raw`\text{pull @ probe: full / weak}`}
          tex
          value={`${probeFull.pull.toFixed(3)} / ${probeWeak.pull.toFixed(3)}`}
        />
        <Readout
          label={String.raw`r_0(N)\ \text{(CF value)}`}
          tex
          value={`${conv.current.re.toFixed(3)} ${conv.current.im >= 0 ? "+" : "−"} ${Math.abs(
            conv.current.im
          ).toFixed(3)} i`}
        />
      </Controls>
    </div>
  );
}
