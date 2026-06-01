"use client";

/**
 * Appendix D — The Lamb dip: single-mode saturated response of a Doppler-
 * broadened gas laser.
 *
 * Appendix D reduces every third-order, Doppler-averaged integral T_lw to the
 * plasma dispersion function Z (Appendix C). For a single mode (μ=ρ=σ=n) only
 * the w=1 branch (Eq 10) survives the degeneracies, and the saturated response
 * is governed by
 *
 *     T_11 ∝ (N̄/γ_a) · Z(υ)/υ,      υ = γ + i(ω − ν_n),
 *
 * the complex frequency that bundles coherence decay γ (real) and cavity
 * detuning ω−ν_n (imaginary). With Δ ≡ (ω−ν_n)/Ku and g ≡ γ/Ku, the appC
 * mapping gives Z(υ) = Zfn(Δ, g) EXACTLY (iζ = −υ/Ku), so we reuse the verified
 * Faddeeva form here. We plot the normalized response
 *
 *     C(Δ) = Ku · Z(υ)/υ = Z(Δ,g)/(g + iΔ),
 *
 * whose imaginary part is the symmetric SATURATION strength (peaked at line
 * center — "the gain saturates twice as hard where the two velocity groups
 * overlap") and whose real part is the antisymmetric dispersion (mode pulling).
 *
 * TOP panel: Im C (saturation), Re C (dispersion), and the broad Gaussian
 *   Doppler gain envelope exp(−Δ²) as a dashed reference.
 * BOTTOM panel: the dimensionless laser OUTPUT intensity, built from the
 *   Table 10-1 steady state I_n = a_n/β_n,
 *
 *     I_n(Δ) ∝ max{0, [R·exp(−Δ²) − 1] / [1 + L(ω−ν_n)]},   L = γ²/(γ²+(ω−ν_n)²)
 *
 *   — the Lamb dip: at line center the self-saturation factor [1+L] is largest,
 *   so the output dips even though the gain peaks. The dip exists only for
 *   R > 1 + 2(γ/Ku)² (Eq 41).
 * INSET: the Maxwellian W(v) with two symmetric saturation holes at v/u = ±Δ
 *   that merge into one deep hole as Δ → 0 — the physical origin of the dip.
 *
 * Decreasing Ku/γ toward 1 broadens the dip and morphs the curve from Gaussian
 * (Doppler / inhomogeneous) toward Lorentzian (homogeneous).
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series } from "@/components/sim";

// ── Faddeeva w(z) = exp(-z²) erfc(-iz), Im(z) ≥ 0 (Hui–Armstrong–Wray 1978) ──
// Uniformly accurate in the upper half-plane incl. the real axis — our regime,
// since γ ≥ 0 keeps the argument in Im ≥ 0. Verified anchors: w(0)=1 ⇒ Z_i(0)=√π.
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

// Z(υ) with υ = γ + i(ω−ν), in normalized variables Δ=(ω−ν)/Ku, g=γ/Ku:
// Z = i√π · w(ζ), ζ = −Δ + i g.  i√π·(wr + i wi) = √π(−wi + i wr).
function Zfn(Delta: number, g: number): { zr: number; zi: number } {
  const [wr, wi] = faddeeva(-Delta, g);
  return { zr: -SQRTPI * wi, zi: SQRTPI * wr };
}

// Normalized single-mode response C(Δ) = Ku·Z(υ)/υ = Z(Δ,g)/(g + iΔ).
function Cfn(Delta: number, g: number): { re: number; im: number } {
  const { zr, zi } = Zfn(Delta, g);
  const dr = g;
  const di = Delta;
  const den = dr * dr + di * di;
  // (zr + i zi)/(dr + i di)
  return {
    re: (zr * dr + zi * di) / den,
    im: (zi * dr - zr * di) / den,
  };
}

export default function AppDSim() {
  // Frequencies in units of 2π·MHz (sliders), reduced to the dimensionless
  // ratio g = γ/Ku for the lineshape math.
  const [Ku, setKu] = useState(1010); // Doppler width
  const [gamma, setGamma] = useState(80); // dipole (coherence) decay γ
  const [R, setR] = useState(1.1); // relative excitation (pump / threshold)
  const [det, setDet] = useState(0.0); // marker detuning Δ = (ω−ν_n)/Ku
  const [showHoles, setShowHoles] = useState(true);

  const g = gamma / Ku; // γ/Ku — the single regime knob
  const N = 400;
  const DMAX = 3;

  // ── TOP panel: saturation strength Im C and dispersion Re C ────────────────
  const topLines = useMemo<Series[]>(() => {
    const xs: number[] = [];
    const im: number[] = [];
    const re: number[] = [];
    const env: number[] = []; // Doppler gain envelope exp(−Δ²), scaled to Im C(0)
    const imC0 = Cfn(0, g).im;
    for (let i = 0; i <= N; i++) {
      const d = -DMAX + (2 * DMAX * i) / N;
      xs.push(d);
      const C = Cfn(d, g);
      im.push(C.im);
      re.push(C.re);
      env.push(imC0 * Math.exp(-d * d));
    }
    return [
      { x: xs, y: env, color: "#94a3b8", width: 1.8, dashed: true, label: "Doppler gain  e^{-Δ²}" },
      { x: xs, y: im, color: "#4f46e5", width: 2.6, label: "Im C  (saturation)", fill: true },
      { x: xs, y: re, color: "#0891b2", width: 2.2, label: "Re C  (dispersion)" },
    ];
  }, [g]);

  // y-range for the top panel (track the peak/trough so it never clips).
  const topRange = useMemo<[number, number]>(() => {
    let lo = 0;
    let hi = 0;
    for (let i = 0; i <= N; i++) {
      const d = -DMAX + (2 * DMAX * i) / N;
      const C = Cfn(d, g);
      lo = Math.min(lo, C.re, C.im);
      hi = Math.max(hi, C.re, C.im);
    }
    const pad = 0.12 * (hi - lo || 1);
    return [lo - pad, hi + pad];
  }, [g]);

  // ── BOTTOM panel: laser output intensity I_n(Δ) = a_n/β_n ──────────────────
  // L(ω−ν_n) = γ²/(γ²+(ω−ν_n)²) with Δω = Δ·Ku ⇒ L = g²/(g²+Δ²).
  const In = (d: number): number => {
    const gain = R * Math.exp(-d * d) - 1; // a_n ∝ R e^{-Δ²} − 1
    const L = (g * g) / (g * g + d * d); // homogeneous Lorentzian, width γ
    const sat = 1 + L; // self-saturation β_n ∝ 1 + L
    return Math.max(0, gain / sat);
  };

  const bottomLines = useMemo<Series[]>(() => {
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i <= N; i++) {
      const d = -DMAX + (2 * DMAX * i) / N;
      xs.push(d);
      ys.push(In(d));
    }
    return [{ x: xs, y: ys, color: "#e11d48", width: 2.6, label: "output  I_n", fill: true }];
  }, [g, R]);

  // ── INSET: Maxwellian W(v) with two saturation holes at v/u = ±Δ ───────────
  const drawInset = ({ ctx, w, h }: any) => {
    ctx.clearRect(0, 0, w, h);
    const padL = 8;
    const padR = 8;
    const padT = 16;
    const padB = 22;
    const vmax = 3; // plot v/u from −3..3
    const sx = (vu: number) => padL + ((vu + vmax) / (2 * vmax)) * (w - padL - padR);
    const base = h - padB;
    const top = padT;
    const W0 = (vu: number) => Math.exp(-vu * vu); // Maxwellian (unit peak)

    // hole carved at v/u = ±Δ, width ~ g (homogeneous), depth set by saturation
    const holeW = Math.max(g, 0.12);
    const holeDepth = 0.55 * Math.min(1, 0.35 + 0.65 / (1 + Math.abs(det)));
    const hole = (vu: number) =>
      holeDepth * (Math.exp(-(((vu - det) / holeW) ** 2)) + Math.exp(-(((vu + det) / holeW) ** 2)));
    const profile = (vu: number) => Math.max(0, W0(vu) * (1 - Math.min(0.95, hole(vu))));

    // fill the carved Maxwellian
    ctx.beginPath();
    ctx.moveTo(sx(-vmax), base);
    for (let i = 0; i <= 200; i++) {
      const vu = -vmax + (2 * vmax * i) / 200;
      ctx.lineTo(sx(vu), base - (base - top) * profile(vu));
    }
    ctx.lineTo(sx(vmax), base);
    ctx.closePath();
    ctx.fillStyle = "#fde68a55";
    ctx.fill();

    // dashed reference: full Maxwellian
    ctx.strokeStyle = "#cbd5e1";
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const vu = -vmax + (2 * vmax * i) / 200;
      const yy = base - (base - top) * W0(vu);
      i ? ctx.lineTo(sx(vu), yy) : ctx.moveTo(sx(vu), yy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // carved profile outline
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const vu = -vmax + (2 * vmax * i) / 200;
      const yy = base - (base - top) * profile(vu);
      i ? ctx.lineTo(sx(vu), yy) : ctx.moveTo(sx(vu), yy);
    }
    ctx.stroke();

    // hole markers at v/u = ±Δ
    ctx.strokeStyle = "#e11d48";
    ctx.setLineDash([3, 3]);
    ctx.lineWidth = 1.3;
    [det, -det].forEach((vu) => {
      ctx.beginPath();
      ctx.moveTo(sx(vu), top);
      ctx.lineTo(sx(vu), base);
      ctx.stroke();
    });
    ctx.setLineDash([]);

    // axis
    ctx.strokeStyle = "#9aa3b2";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, base);
    ctx.lineTo(w - padR, base);
    ctx.stroke();

    ctx.fillStyle = "#5b6473";
    ctx.font = "11px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("v / u", w / 2, h - 6);
    ctx.fillText("0", sx(0), base + 13);
    ctx.fillStyle = "#1f2733";
    ctx.font = "600 11px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("W(v) with holes at ±Δ", padL + 2, top - 4);
  };

  // ── Readouts ────────────────────────────────────────────────────────────
  const C0 = Cfn(det, g);
  // Lamb-dip contrast: (peak − center)/peak, scanning the right half.
  const { contrast, dipExists } = useMemo(() => {
    const center = In(0);
    let peak = center;
    for (let i = 0; i <= 600; i++) {
      const d = (DMAX * i) / 600;
      peak = Math.max(peak, In(d));
    }
    const c = peak > 0 ? (peak - center) / peak : 0;
    return { contrast: c, dipExists: c > 1e-3 };
  }, [g, R]);
  const threshold = 1 + 2 * g * g; // Eq 41
  // dip HWHM in units of Δ; compare to √2·g in extreme-Doppler limit.
  // The √2γ law is the half-DEPTH half-width of the SELF-SATURATION factor
  // s(Δ) = 1/(1+L) = (g²+Δ²)/(2g²+Δ²), which runs from s(0)=½ to s(∞)=1.
  // Half-recovery s=¾ ⇒ L=⅓ ⇒ Δ=√2·g, in EVERY regime — independent of R and
  // of the Gaussian gain envelope. We measure that, not the local peak of the
  // envelope-depressed output curve (which would drift with R and never read 1).
  const dipHalfWidth = useMemo(() => {
    if (!dipExists) return 0;
    const sat = (d: number) => {
      const L = (g * g) / (g * g + d * d);
      return 1 / (1 + L);
    };
    // walk out from center until the saturation factor recovers halfway
    // (s = ¾) between its center value (½) and its asymptote (1)
    for (let i = 1; i <= 600; i++) {
      const d = (DMAX * i) / 600;
      if (sat(d) >= 0.75) return d;
    }
    return 0;
  }, [g, R, dipExists]);

  return (
    <div>
      {/* TOP — saturated response */}
      <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
        Saturated third-order response&nbsp;&nbsp;C(Δ) = Ku·Z(υ)/υ
      </div>
      <Plot
        width={660}
        height={230}
        xRange={[-DMAX, DMAX]}
        yRange={topRange}
        xLabel="normalized cavity detuning  (ω − ν_n)/Ku"
        yLabel="C"
        lines={topLines}
        markers={[
          { x: det, color: "#e11d48" },
          { x: 0, color: "#e2e8f0", dashed: true },
          { y: 0, color: "#e2e8f0", dashed: false },
        ]}
      />

      {/* BOTTOM — output intensity (the Lamb dip) + inset */}
      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: "1rem", marginTop: "0.9rem", alignItems: "end" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Laser output intensity&nbsp;&nbsp;I_n(Δ) — the Lamb dip
          </div>
          <Plot
            width={400}
            height={210}
            xRange={[-DMAX, DMAX]}
            yRange={[0, Math.max(0.02, (R - 1) * 1.15)]}
            xLabel="(ω − ν_n)/Ku"
            yLabel="I_n"
            lines={bottomLines}
            markers={[
              { x: det, color: "#e11d48" },
              { x: 0, color: "#e2e8f0", dashed: true },
            ]}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>Velocity holes</div>
          <Canvas width={260} height={200} draw={drawInset} animate={false} redraw={[det, g, showHoles]} />
        </div>
      </div>

      <Controls>
        <Slider
          label={String.raw`Ku`}
          tex
          min={50}
          max={2000}
          step={10}
          value={Ku}
          onChange={setKu}
          unit="2π·MHz"
        />
        <Slider
          label={String.raw`\gamma`}
          tex
          min={5}
          max={300}
          step={1}
          value={gamma}
          onChange={setGamma}
          unit="2π·MHz"
        />
        <Slider
          label={String.raw`\mathfrak{R}\ \text{(relative excitation)}`}
          tex
          min={1}
          max={2}
          step={0.005}
          value={R}
          onChange={setR}
          unit=""
        />
        <Slider
          label={String.raw`(\omega-\nu_n)/Ku\ \text{(marker)}`}
          tex
          min={-3}
          max={3}
          step={0.02}
          value={det}
          onChange={setDet}
          unit=""
        />
        <Toggle label="show velocity holes" checked={showHoles} onChange={setShowHoles} />
        <Readout
          label={String.raw`C(\Delta)=\mathrm{Re}+i\,\mathrm{Im}`}
          tex
          value={`${C0.re.toFixed(3)} + ${C0.im.toFixed(3)} i`}
        />
        <Readout label={String.raw`Ku/\gamma\ \text{(regime)}`} tex value={(Ku / gamma).toFixed(1)} />
        <Readout label={String.raw`\text{dip contrast}`} tex value={`${(100 * contrast).toFixed(1)}%`} />
        <Readout
          label={String.raw`\text{dip threshold } 1+2(\gamma/Ku)^2`}
          tex
          value={threshold.toFixed(4)}
        />
        <Readout
          label={String.raw`\text{dip at } \mathfrak{R}=${R.toFixed(2)}?`}
          tex
          value={dipExists ? `yes (R > ${threshold.toFixed(3)})` : `no (R < ${threshold.toFixed(3)})`}
        />
        <Readout
          label={String.raw`\text{dip HWHM}/(\sqrt2\,\gamma/Ku)`}
          tex
          value={dipExists ? (dipHalfWidth / (Math.SQRT2 * g)).toFixed(2) : "—"}
        />
      </Controls>
    </div>
  );
}
