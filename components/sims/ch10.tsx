"use client";

/**
 * Chapter X — Gas Laser Theory: the Lamb dip from velocity hole burning.
 *
 * The dip is NOT drawn by hand. It emerges from the genuine velocity integral
 * of the chapter's rate-equation result, Eqs. (21)-(24) and the gain=loss
 * balance Eq. (46):
 *
 *   R(v)   = (1/8)(pE/h)^2 (1/g) [ L(d - Kv) + L(d + Kv) ]        Eq.(21)
 *   L(x)   = g^2 / (g^2 + x^2)                                    Lorentzian
 *   D(v)   = W(v) N / (1 + R(v)/Rs)                               Eq.(22)-(24)
 *   W(v)   = (sqrt(pi) u)^{-1} exp[-(v/u)^2]                      Eq.(2)
 *   Gain(d)  ~ integral dv [ L(d-Kv) + L(d+Kv) ] D(v)            (saturated gain)
 *   steady-state output ~ Gain(d) - Loss                          Eq.(46)
 *
 * where d = (w - vn) is the detuning of the laser mode from line center.
 *
 * We work in units of the Doppler width Ku = 1, so detuning x = d/Ku and the
 * homogeneous half-width is r = g/Ku. The most-probable speed sets Ku = K u = 1,
 * i.e. u = 1/K; we carry K u = 1 so that Kv ranges over the same axis as x.
 *
 * LEFT panel : the saturated velocity distribution D(v) with the two Bennett
 *              holes, plus the two running-wave Lorentzians that burn them.
 * RIGHT panel: the steady-state output power vs detuning — the broad Doppler
 *              gain curve carved by a narrow central Lamb dip. A toggle overlays
 *              the third-order (perturbation) prediction, which overestimates
 *              saturation (the Sec. 10-3 fidelity point).
 */

import { useMemo, useState } from "react";
import { Plot, Slider, Toggle, Controls, Readout, Series, Marker } from "@/components/sim";

// Lorentzian of half-width r (in Ku units): L(x) = r^2 / (r^2 + x^2).
const lor = (x: number, r: number) => (r * r) / (r * r + x * x);

export default function Ch10Sim() {
  // detuning x = (w - vn)/Ku of the laser mode from atomic line center
  const [detuning, setDetuning] = useState(0.0);
  // r = gamma / Ku : homogeneous half-width as a fraction of the Doppler width
  const [rGamma, setRGamma] = useState(0.1);
  // In = (pEn/hbar)^2/(gamma gamma_ab): dimensionless field intensity / saturation
  const [intensity, setIntensity] = useState(4.0);
  // N = N/N_T relative excitation (overall gain scale)
  const [excite, setExcite] = useState(2.0);
  // overlay the third-order perturbation curve
  const [showPert, setShowPert] = useState(true);

  // ── core physics, all in Ku = 1 units ────────────────────────────────────
  // velocity grid Kv ∈ [-4, 4] (covers ±4 Doppler widths)
  const VMAX = 4;
  const NV = 281;
  const dv = (2 * VMAX) / (NV - 1);
  const Kvs = useMemo(() => {
    const a: number[] = [];
    for (let i = 0; i < NV; i++) a.push(-VMAX + i * dv);
    return a;
  }, []);

  // Maxwellian in velocity, W(Kv) ∝ exp[-(Kv/Ku)^2] with Ku = 1.
  const Wv = (kv: number) => Math.exp(-kv * kv) / Math.sqrt(Math.PI);

  // Saturation strength: R(v)/Rs ∝ In * (1/2)[L(x-Kv) + L(x+Kv)].
  // The 1/2 is the standing-wave averaging folded into R(v) (Eq.21 text).
  const sat = (kv: number, x: number, r: number, In: number) =>
    0.5 * In * (lor(x - kv, r) + lor(x + kv, r));

  // Saturated population difference per velocity class (Eq.22-24):
  //   D(v) = W(v) N / (1 + R(v)/Rs).
  const Dsat = (kv: number, x: number, r: number, In: number, N: number) =>
    (N * Wv(kv)) / (1 + sat(kv, x, r, In));

  // Saturated gain at detuning x: ∫ dv [L(x-Kv)+L(x+Kv)] D(v)  (trapezoid).
  const gainAt = (x: number, r: number, In: number, N: number) => {
    let s = 0;
    for (let i = 0; i < NV; i++) {
      const kv = Kvs[i];
      const probe = lor(x - kv, r) + lor(x + kv, r);
      const w = i === 0 || i === NV - 1 ? 0.5 : 1;
      s += w * probe * Dsat(kv, x, r, In, N);
    }
    return s * dv;
  };

  // Third-order (perturbation) gain: expand 1/(1+R/Rs) ≈ 1 - R/Rs.
  // gain3 = ∫ dv [L+L] W N (1 - sat). Overestimates saturation at large In.
  const gainPert = (x: number, r: number, In: number, N: number) => {
    let s = 0;
    for (let i = 0; i < NV; i++) {
      const kv = Kvs[i];
      const probe = lor(x - kv, r) + lor(x + kv, r);
      const w = i === 0 || i === NV - 1 ? 0.5 : 1;
      s += w * probe * N * Wv(kv) * (1 - sat(kv, x, r, In));
    }
    return s * dv;
  };

  // ── LEFT: saturated velocity distribution + the two probe Lorentzians ────
  const velSeries = useMemo<Series[]>(() => {
    const env: number[] = []; // unsaturated envelope W(v) N
    const dsat: number[] = []; // saturated D(v) (holes carved out)
    const lminus: number[] = []; // running wave 1 probe, displaced by -x
    const lplus: number[] = []; // running wave 2 probe, displaced by +x
    for (let i = 0; i < NV; i++) {
      const kv = Kvs[i];
      env.push(excite * Wv(kv));
      dsat.push(Dsat(kv, detuning, rGamma, intensity, excite));
      // scale the probe Lorentzians so they sit nicely under the envelope
      const peak = 0.42 * excite / Math.sqrt(Math.PI);
      lminus.push(peak * lor(kv - detuning, rGamma));
      lplus.push(peak * lor(kv + detuning, rGamma));
    }
    return [
      { x: Kvs, y: env, color: "#cbd5e1", width: 1.6, dashed: true, label: "W(v)·N" },
      { x: Kvs, y: dsat, color: "#4f46e5", width: 2.6, fill: true, label: "ρaa−ρbb" },
      { x: Kvs, y: lminus, color: "#16a34a", width: 1.4, label: "wave →" },
      { x: Kvs, y: lplus, color: "#d97706", width: 1.4, label: "wave ←" },
    ];
  }, [Kvs, detuning, rGamma, intensity, excite]);

  // hole centers at Kv = ±x
  const velMarkers = useMemo<Marker[]>(
    () => [
      { x: detuning, color: "#16a34a", dashed: true },
      { x: -detuning, color: "#d97706", dashed: true },
    ],
    [detuning],
  );

  // ── RIGHT: output power vs detuning (the curve that shows the dip) ────────
  const XMAX = 3;
  const NX = 161;
  const { powerSeries, powerMarkers, curve, pertCurve } = useMemo(() => {
    const xs: number[] = [];
    const sat: number[] = [];
    const pert: number[] = [];
    // Fixed cavity loss, set to half the line-center small-signal (In→0) gain
    // of a 𝔑 = 1 medium. This keeps the laser comfortably above threshold at
    // the default 𝔑, and the loss tracks γ/Ku physically because it depends
    // only on rGamma (cavity loss is independent of field intensity and pump).
    // Near threshold the gain=loss nonlinearity amplifies the ~14% gain dip
    // into a ~30% OUTPUT dip — the Lamb dip as actually observed.
    const loss = 0.5 * gainAt(0, rGamma, 0, 1);
    for (let i = 0; i < NX; i++) {
      const x = -XMAX + (2 * XMAX * i) / (NX - 1);
      xs.push(x);
      sat.push(Math.max(gainAt(x, rGamma, intensity, excite) - loss, 0));
      // The 3rd-order series is NOT clamped at 0: when perturbation theory
      // fails (sat ≳ 1) it dives to the axis at line center, visibly
      // overestimating the saturation — the Sec. 10-3 fidelity point.
      pert.push(gainPert(x, rGamma, intensity, excite) - loss);
    }
    const series: Series[] = [
      { x: xs, y: sat, color: "#e11d48", width: 2.6, fill: true, label: "output (REA)" },
    ];
    if (showPert) {
      series.push({ x: xs, y: pert, color: "#9333ea", width: 1.8, dashed: true, label: "3rd-order" });
    }
    const markers: Marker[] = [{ x: detuning, color: "#1f2733", dashed: false }];
    return { powerSeries: series, powerMarkers: markers, curve: { xs, sat }, pertCurve: pert };
  }, [rGamma, intensity, excite, detuning, showPert]);

  // ── readouts derived from the right-panel curve ──────────────────────────
  const stats = useMemo(() => {
    const { xs, sat } = curve;
    // peak (off-center) and line-center values
    let peak = 0;
    for (const v of sat) peak = Math.max(peak, v);
    // value at the current detuning (interpolated)
    const at = (x: number) => {
      const i = Math.max(0, Math.min(NX - 2, Math.floor(((x + XMAX) / (2 * XMAX)) * (NX - 1))));
      const x0 = xs[i];
      const x1 = xs[i + 1];
      const f = x1 === x0 ? 0 : (x - x0) / (x1 - x0);
      return sat[i] + f * (sat[i + 1] - sat[i]);
    };
    const center = at(0);
    const here = at(detuning);
    const dipDepth = peak > 0 ? (100 * (peak - center)) / peak : 0;

    // dip FWHM: width where output rises from center to halfway up the dip.
    let fwhm = NaN;
    if (peak - center > 1e-4) {
      const half = center + 0.5 * (peak - center);
      // scan outward from x=0 to find first crossing of `half`
      for (let i = Math.floor((NX - 1) / 2); i < NX - 1; i++) {
        if (sat[i] <= half && sat[i + 1] > half) {
          const f = (half - sat[i]) / (sat[i + 1] - sat[i]);
          fwhm = 2 * (xs[i] + f * (xs[i + 1] - xs[i]));
          break;
        }
      }
    }
    const merged = Math.abs(detuning) <= rGamma;
    return { peak, center, here, dipDepth, fwhm, merged };
  }, [curve, detuning, rGamma]);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Velocity distribution &amp; Bennett holes
          </div>
          <Plot
            width={320}
            height={250}
            xRange={[-VMAX, VMAX]}
            yRange={[0, (1.15 * excite) / Math.sqrt(Math.PI)]}
            xLabel="axial velocity  Kv / Ku"
            yLabel="ρaa − ρbb"
            lines={velSeries}
            markers={velMarkers}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Output power vs detuning (the Lamb dip)
          </div>
          <Plot
            width={320}
            height={250}
            xRange={[-XMAX, XMAX]}
            yRange={[0, Math.max(0.001, stats.peak * 1.25)]}
            xLabel="detuning  (ω − νₙ)/Ku"
            yLabel="output power"
            lines={powerSeries}
            markers={powerMarkers}
          />
        </div>
      </div>

      <Controls>
        <Slider
          label={String.raw`(\omega-\nu_n)/Ku`}
          tex
          min={-3}
          max={3}
          step={0.02}
          value={detuning}
          onChange={setDetuning}
        />
        <Slider
          label={String.raw`\gamma/Ku`}
          tex
          min={0.02}
          max={1}
          step={0.01}
          value={rGamma}
          onChange={setRGamma}
        />
        <Slider
          label={String.raw`I_n=(\wp E_n/\hbar)^2/(\gamma\gamma_{ab})`}
          tex
          min={0}
          max={20}
          step={0.2}
          value={intensity}
          onChange={setIntensity}
        />
        <Slider
          label={String.raw`\mathfrak{N}=N/N_T`}
          tex
          min={1}
          max={6}
          step={0.1}
          value={excite}
          onChange={setExcite}
        />
        <Toggle label="overlay 3rd-order (perturbation)" checked={showPert} onChange={setShowPert} />
        <Readout
          label={String.raw`\text{relative output at } (\omega-\nu_n)/Ku`}
          tex
          value={stats.here.toFixed(3)}
        />
        <Readout label="dip depth (peak − center)/peak" value={`${stats.dipDepth.toFixed(1)} %`} />
        <Readout
          label={String.raw`\text{dip FWHM vs } 2\gamma/Ku`}
          tex
          value={
            isNaN(stats.fwhm)
              ? `— (no dip),  2γ/Ku = ${(2 * rGamma).toFixed(2)}`
              : `${stats.fwhm.toFixed(2)},  2γ/Ku = ${(2 * rGamma).toFixed(2)}`
          }
        />
        <Readout
          label={String.raw`\text{hole separation } 2(\omega-\nu_n)/K`}
          tex
          value={stats.merged ? `${(2 * Math.abs(detuning)).toFixed(2)} — holes merged` : (2 * Math.abs(detuning)).toFixed(2)}
        />
      </Controls>
    </div>
  );
}
