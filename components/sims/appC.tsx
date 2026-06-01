"use client";

/**
 * Appendix C — The plasma dispersion function Z, drawn as the Voigt lineshape.
 *
 * The chapter's headline closed form (Eq 5):
 *
 *   Z(ζ) = i√π · exp(-ζ²) · [1 + erf(iζ)] = i√π · w(ζ),
 *
 * where w(ζ) = exp(-ζ²) erfc(-iζ) is the Faddeeva function and the normalized
 * complex argument is
 *
 *   ζ = -(ω-ν)/Ku + i·(γ/Ku) ≡ -Δ + i·g      (i.e. iζ = -v/Ku, v = γ + i(ω-ν)).
 *
 * We sweep real detuning Δ at fixed normalized homogeneous width g = γ/Ku and
 * plot Z_r = Re Z (dispersion, antisymmetric) and Z_i = Im Z (gain, symmetric),
 * reproducing Fig C-1. Dashed overlays show the two limits the appendix derives:
 *   • Gaussian center (Eq 7):  Z_i^(G) = √π · exp(-Δ²)          [exact at g=0]
 *   • Lorentzian wing (Eq 8):  Z = iKu/v → i/(g+iΔ) normalized,
 *        so Z_i^(L) = g/(g²+Δ²),  Z_r^(L) = Δ/(g²+Δ²).
 * overlayMode = 3 swaps in the Fig C-2 panel: an equal-width, equal-area
 * Lorentzian vs Gaussian, shaded to expose the Lorentzian's heavier wings.
 *
 * Fidelity: Z is computed from the EXACT closed form via a true complex-error
 * function (Faddeeva). We use the Hui–Armstrong–Wray (1978) degree-6 rational
 * approximation to w(z), which is uniformly accurate in the upper half-plane
 * INCLUDING the real axis — exactly our regime, since γ ≥ 0 puts ζ in Im ≥ 0.
 * Verified anchors: w(0)=1 ⇒ Z_i(0)=√π; Re w(x)=exp(-x²) ⇒ the g=0 gain curve
 * lies exactly on the Gaussian overlay; wing Im w(5)≈+0.115 (correct sign).
 */

import { useMemo, useState } from "react";
import { Plot, Slider, Segmented, Controls, Readout, Series } from "@/components/sim";

// ── Faddeeva w(z) = exp(-z²) erfc(-iz), Im(z) ≥ 0 (Hui–Armstrong–Wray 1978) ──
// Evaluates P(t)/Q(t) with t = y - i x, degree-6 / degree-7 real polynomials.
const HAW_A = [
  122.607931777104326, 214.382388694706425, 181.928533092181549,
  93.155580458138441, 30.180142196210589, 5.912626209773153, 0.564189583562615,
];
const HAW_B = [
  122.607931773875350, 352.730625110963558, 457.334478783897737,
  348.703917719495792, 170.354001821091472, 53.992906912940207,
  10.479857114260399, 1.0,
];

function faddeeva(x: number, y: number): [number, number] {
  // t = y - i x; Horner over complex t.
  const tr = y;
  const ti = -x;
  let nr = HAW_A[6];
  let ni = 0;
  for (let k = 5; k >= 0; k--) {
    const r = nr * tr - ni * ti + HAW_A[k];
    const im = nr * ti + ni * tr;
    nr = r;
    ni = im;
  }
  let dr = HAW_B[7];
  let di = 0;
  for (let k = 6; k >= 0; k--) {
    const r = dr * tr - di * ti + HAW_B[k];
    const im = dr * ti + di * tr;
    dr = r;
    di = im;
  }
  const den = dr * dr + di * di;
  return [(nr * dr + ni * di) / den, (ni * dr - nr * di) / den];
}

const SQRTPI = Math.sqrt(Math.PI);

// Z(Δ, g) = i√π · w(ζ), ζ = -Δ + i g.  i√π·(wr + i wi) = √π(-wi + i wr).
function Zfn(Delta: number, g: number): { zr: number; zi: number } {
  const [wr, wi] = faddeeva(-Delta, g);
  return { zr: -SQRTPI * wi, zi: SQRTPI * wr };
}

export default function AppCSim() {
  const [g, setG] = useState(0.1); // γ/Ku = Im(ζ), the single Voigt knob
  const [dmax, setDmax] = useState(3); // half-range of normalized detuning axis
  const [mode, setMode] = useState<0 | 1 | 2 | 3>(1); // overlay selector

  const N = 400;

  // ── Voigt curves Z_r, Z_i over detuning, plus the requested overlay ─────────
  const { dispLines, gainLines } = useMemo(() => {
    const xs: number[] = [];
    const zr: number[] = [];
    const zi: number[] = [];
    const gaussGain: number[] = []; // Eq 7 Gaussian center limit
    const lorGain: number[] = []; // Eq 8 Lorentzian wing limit (Im)
    const lorDisp: number[] = []; // Eq 8 Lorentzian wing limit (Re)
    for (let i = 0; i <= N; i++) {
      const d = -dmax + (2 * dmax * i) / N;
      xs.push(d);
      const Z = Zfn(d, g);
      zr.push(Z.zr);
      zi.push(Z.zi);
      gaussGain.push(SQRTPI * Math.exp(-d * d));
      const denom = g * g + d * d;
      lorGain.push(g / Math.max(denom, 1e-9));
      lorDisp.push(d / Math.max(denom, 1e-9));
    }

    const disp: Series[] = [{ x: xs, y: zr, color: "#0891b2", width: 2.5, label: "Z_r (Voigt)" }];
    const gain: Series[] = [{ x: xs, y: zi, color: "#4f46e5", width: 2.5, label: "Z_i (Voigt)", fill: true }];

    if (mode === 1) {
      gain.push({ x: xs, y: gaussGain, color: "#16a34a", width: 1.8, dashed: true, label: "√π e^{-Δ²} (Eq 7)" });
    } else if (mode === 2) {
      gain.push({ x: xs, y: lorGain, color: "#e11d48", width: 1.8, dashed: true, label: "g/(g²+Δ²) (Eq 8)" });
      disp.push({ x: xs, y: lorDisp, color: "#e11d48", width: 1.8, dashed: true, label: "Δ/(g²+Δ²) (Eq 8)" });
    }
    return { dispLines: disp, gainLines: gain };
  }, [g, dmax, mode]);

  // ── Fig C-2 panel: equal-area, equal-FWHM Lorentzian vs Gaussian ────────────
  // Both normalized to unit area and matched HWHM = 1 (FWHM = 2). Gaussian:
  //   G(x) = (√(ln2/π)) e^{-ln2 x²};  Lorentzian: L(x) = (1/π)·1/(1+x²).
  const fig2 = useMemo(() => {
    const ln2 = Math.LN2;
    const xs: number[] = [];
    const ga: number[] = [];
    const lo: number[] = [];
    const M = 500;
    for (let i = 0; i <= M; i++) {
      const x = -dmax + (2 * dmax * i) / M;
      xs.push(x);
      ga.push(Math.sqrt(ln2 / Math.PI) * Math.exp(-ln2 * x * x));
      lo.push((1 / Math.PI) / (1 + x * x));
    }
    return [
      { x: xs, y: lo, color: "#e11d48", width: 2.5, label: "Lorentzian", fill: true },
      { x: xs, y: ga, color: "#16a34a", width: 2.5, label: "Gaussian", fill: true },
    ] as Series[];
  }, [dmax]);

  // ── Readouts straight from the closed form ──────────────────────────────────
  const Z0 = Zfn(0, g); // line center
  const peakGain = Z0.zi; // Z_i(0); → √π as g → 0
  // Dispersion slope at line center via central difference (sets mode-pulling).
  const eps = 1e-3;
  const slope = (Zfn(eps, g).zr - Zfn(-eps, g).zr) / (2 * eps);
  // Wing fraction of the gain area beyond |Δ| = 2 (illustrates Fig C-2).
  const wingFrac = useMemo(() => {
    const lim = 8;
    const steps = 4000;
    const h = (2 * lim) / steps;
    let total = 0;
    let wings = 0;
    for (let i = 0; i <= steps; i++) {
      const d = -lim + i * h;
      const val = Math.max(Zfn(d, g).zi, 0);
      const wgt = i === 0 || i === steps ? 0.5 : 1;
      total += wgt * val;
      if (Math.abs(d) >= 2) wings += wgt * val;
    }
    return total > 0 ? wings / total : 0;
  }, [g]);

  return (
    <div>
      {mode === 3 ? (
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Fig C-2 — equal area &amp; equal width: Lorentzian vs Gaussian
          </div>
          <Plot
            width={660}
            height={300}
            xRange={[-dmax, dmax]}
            yRange={[0, 0.55]}
            xLabel="x  (in half-widths)"
            yLabel="lineshape (unit area)"
            lines={fig2}
          />
          <p style={{ fontSize: "0.8rem", color: "#5b6473", marginTop: 6 }}>
            Same peak-finding width, same enclosed area — yet the Lorentzian sits below the Gaussian near
            center and above it in the wings. Far-from-center area is where the homogeneous (Lorentzian)
            character of the Voigt profile lives.
          </p>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Z_r — dispersion (antisymmetric S-curve)
          </div>
          <Plot
            width={660}
            height={210}
            xRange={[-dmax, dmax]}
            yRange={[-1.4, 1.4]}
            xLabel="normalized detuning  (ω−ν)/Ku"
            yLabel="Z_r"
            lines={dispLines}
            markers={[
              { x: 0, color: "#cbd5e1", dashed: true },
              { y: 0, color: "#e2e8f0", dashed: false },
            ]}
          />
          <div style={{ fontSize: "0.85rem", fontWeight: 600, margin: "0.75rem 0 4px" }}>
            Z_i — gain / absorption (symmetric peak)
          </div>
          <Plot
            width={660}
            height={210}
            xRange={[-dmax, dmax]}
            yRange={[0, 1.9]}
            xLabel="normalized detuning  (ω−ν)/Ku"
            yLabel="Z_i"
            lines={gainLines}
            markers={[
              { x: 0, color: "#cbd5e1", dashed: true },
              { y: SQRTPI, color: "#c7cdf5", dashed: true, label: "√π" },
            ]}
          />
        </div>
      )}

      <Controls>
        <Slider
          label={String.raw`\gamma/Ku=\operatorname{Im}\zeta`}
          tex
          min={0}
          max={2}
          step={0.02}
          value={g}
          onChange={setG}
          unit=""
        />
        <Slider
          label={String.raw`(\omega-\nu)/Ku\big|_{\max}`}
          tex
          min={1}
          max={6}
          step={0.5}
          value={dmax}
          onChange={setDmax}
          unit=""
        />
        <Segmented<number>
          label="overlay"
          options={[
            { value: 0, label: "Voigt only" },
            { value: 1, label: "+ Gaussian (Eq 7)" },
            { value: 2, label: "+ Lorentzian (Eq 8)" },
            { value: 3, label: "Fig C-2" },
          ]}
          value={mode}
          onChange={(v) => setMode(v as 0 | 1 | 2 | 3)}
        />
        <Readout label={String.raw`Z_i(0)\ \text{peak gain}`} tex value={peakGain.toFixed(3)} />
        <Readout label={String.raw`\sqrt{\pi}\ \text{(g\to0 limit)}`} tex value={SQRTPI.toFixed(3)} />
        <Readout label={String.raw`dZ_r/d\Delta\big|_0\ \text{(mode-pull)}`} tex value={slope.toFixed(3)} />
        <Readout label={String.raw`\text{gain area beyond }|\Delta|=2`} tex value={`${(100 * wingFrac).toFixed(1)}%`} />
        <Readout label={String.raw`Z(0)=Z_r+iZ_i`} tex value={`${Z0.zr.toFixed(3)} + ${Z0.zi.toFixed(3)} i`} />
      </Controls>
    </div>
  );
}
