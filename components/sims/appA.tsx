"use client";

/**
 * Appendix A — Field from a dipole sheet.
 *
 * The punchline of the appendix (Eqs 8–13): the on-axis field from an infinite
 * sheet of in-phase dipoles is a single radial integral
 *
 *   E(z) ∝ ∫_z^∞ dR exp(iKR) { (1-iKR)/R² [1 - 3(z/R)²] + K²(1 + (z/R)²) }
 *
 * which collapses to a clean radiation residue, J = 2iK·exp(iKz), i.e. a plane
 * wave shifted 90° (a factor of i) from the dipoles' own oscillation. Eq (13):
 *
 *   E(z,t) = x̂ · (i η K p0 / 2ε0) · exp[-i(δt - Kz)].
 *
 * This sim makes the collapse *visible*. We trace the running complex partial
 * sum S(R) as a path in the phasor plane while R sweeps from z to R_max. To keep
 * the geometry z-independent we phase-reference everything to the foot-point of
 * the sheet, exp(iK(R-z)) — this is the physical Fresnel optical-path-difference.
 * Then the converged resultant points along the IMAGINARY axis, manifestly 90°
 * from the dipole phasor (the real axis): the factor i, drawn.
 *
 * Fidelity note (faithful to the text's own convergence factor): the radiation
 * term K²(1 + z²/R²) does not decay, so the bare partial sum orbits forever. The
 * appendix kills the R→∞ boundary with a damping exp(-R/λ); we mirror that with
 * exp(-(R-z)/λ_damp), sized so the far-ring tail visibly collapses while the
 * first Fresnel zones stay nearly undamped. The magnitude readout is anchored to
 * the authoritative Eq (13) value η K p0 / 2ε0 (builderNotes: Eq 13 is
 * authoritative; the intermediate 2iK is bookkeeping).
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series } from "@/components/sim";

type C = { re: number; im: number };

// Per-dR integrand of the phase-referenced field integral (Eq 8 form),
//   g(R) = exp(iK(R-z)) { (1-iKR)/R² [1 - 3(z/R)²] + K²(1 + (z/R)²) } · damp,
// returned as a complex number. The phase is measured from the foot-point R=z.
function integrand(R: number, K: number, z: number, lamDamp: number): C {
  const zr = z / R;
  const poly = 1 - 3 * zr * zr; // the [1 - 3(z/R)²] near/induction shape factor
  // Bracket = (1 - iKR)/R² · [1 - 3(z/R)²] + K²(1 + (z/R)²), split into Re/Im:
  //   Re = (1/R²)·poly + K²(1 + (z/R)²)            (from the "1" and the radiation K² term)
  //   Im = -(K/R)·poly                              (from the "-iKR/R²" induction term)
  const bracketRe = poly / (R * R) + K * K * (1 + zr * zr);
  const bracketIm = -(K / R) * poly;
  // Multiply by the phase-referenced exp(iK(R-z)) and the convergence damping.
  const phase = K * (R - z);
  const damp = Math.exp(-(R - z) / lamDamp);
  const cphase = Math.cos(phase) * damp;
  const sphase = Math.sin(phase) * damp;
  return {
    re: bracketRe * cphase - bracketIm * sphase,
    im: bracketRe * sphase + bracketIm * cphase,
  };
}

export default function AppASim() {
  const [K, setK] = useState(10); // wavenumber  (rad/m)
  const [z, setZ] = useState(1); // sheet→observer distance (m)
  const [Rmax, setRmax] = useState(20); // outer ring cutoff (m)
  const [eta, setEta] = useState(1); // areal dipole density (1/m²)
  const [p0, setP0] = useState(1); // single-dipole moment amplitude
  const [showWave, setShowWave] = useState(true);

  // ε0 set to 1 in the sim's natural units; amplitudes scale linearly with η, p0.
  const EPS0 = 1;
  const lambda = (2 * Math.PI) / K; // optical wavelength
  // No ring is closer to the observer than the foot of the perpendicular (R=z),
  // so the integration upper limit must be ≥ z. If the user drags R_max below z,
  // clamp to a minimal physical window (z + one wavelength) instead of NaN.
  const RmaxEff = Math.max(Rmax, z + lambda);
  // Convergence damping: collapse the far-ring tail by R_max while leaving the
  // first ~few Fresnel zones nearly undamped (size so exp(-(Rmax-z)/λd) ≈ 0.1).
  const lamDamp = Math.max((RmaxEff - z) / 2.5, lambda);

  // ── Numerically integrate S(R) = prefactor · ∫_z^R g(R')dR' (trapezoid) ──────
  const N = 3200;
  const { path, Send } = useMemo(() => {
    // Prefactor anchored to the authoritative Eq (13): the phase-referenced
    // integrand here integrates to magnitude ≈ 2K, so ηp0/4ε0 makes |S(R_max)|
    // land on the Eq-13 value ηKp0/2ε0 (builderNotes: Eq 13 is authoritative;
    // the intermediate residue 2iK is illustrative bookkeeping).
    const prefac = (eta * p0) / (4 * EPS0);
    const pts: { re: number; im: number; R: number }[] = [];
    let accRe = 0;
    let accIm = 0;
    const hStep = (RmaxEff - z) / N;
    let prev = integrand(z, K, z, lamDamp);
    pts.push({ re: 0, im: 0, R: z });
    for (let i = 1; i <= N; i++) {
      const R = z + i * hStep;
      const cur = integrand(R, K, z, lamDamp);
      accRe += 0.5 * (prev.re + cur.re) * hStep;
      accIm += 0.5 * (prev.im + cur.im) * hStep;
      prev = cur;
      pts.push({ re: prefac * accRe, im: prefac * accIm, R });
    }
    return { path: pts, Send: { re: prefac * accRe, im: prefac * accIm } };
  }, [K, z, RmaxEff, eta, p0, lamDamp]);

  // ── Derived readouts ────────────────────────────────────────────────────────
  const magE = Math.hypot(Send.re, Send.im);
  const analytic = (eta * K * p0) / (2 * EPS0); // |E| from Eq (13)
  const phaseDeg = (Math.atan2(Send.im, Send.re) * 180) / Math.PI; // arg relative to dipole (real) axis
  const nZones = (RmaxEff - z) / (lambda / 2); // Fresnel zones included
  const convErr = Math.hypot(Send.re - 0, Send.im - analytic); // distance to the Eq-13 target (pure imaginary)

  // ── LEFT: phasor-spiral path in the complex plane ──────────────────────────
  const drawSpiral = ({ ctx, w, h }: any) => {
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.5;
    const cy = h * 0.5;
    // auto-scale so the whole path + the analytic target fit
    let maxAbs = analytic * 1.15;
    for (const p of path) maxAbs = Math.max(maxAbs, Math.abs(p.re), Math.abs(p.im));
    maxAbs = Math.max(maxAbs, 1e-6);
    const S = (Math.min(w, h) * 0.42) / maxAbs;
    const X = (re: number) => cx + re * S;
    const Y = (im: number) => cy - im * S;

    // axes
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, cy); ctx.lineTo(w, cy);
    ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
    ctx.stroke();
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("Re  (dipole phase)", cx + 6, h - 8);
    ctx.textAlign = "right";
    ctx.save();
    ctx.translate(cx - 6, 14);
    ctx.fillText("Im  (radiated, ×i)", 0, 0);
    ctx.restore();

    // dipole reference phasor along +Re
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(X(maxAbs * 0.55), cy);
    ctx.stroke();
    ctx.fillStyle = "#64748b";
    ctx.textAlign = "left";
    ctx.fillText("p  (driving dipole)", X(maxAbs * 0.56), cy + 14);

    // analytic Eq-13 target: pure imaginary, magnitude `analytic`
    ctx.fillStyle = "#16a34a";
    ctx.beginPath();
    ctx.arc(X(0), Y(analytic), 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText("Eq (13): i·ηKp₀/2ε₀", X(0) + 8, Y(analytic) - 6);

    // the spiral, colored start (near rings) → tail (far rings)
    for (let i = 1; i < path.length; i++) {
      const f = i / (path.length - 1);
      // near rings indigo, far rings fade to amber
      const r = Math.round(79 + f * (217 - 79));
      const g = Math.round(70 + f * (119 - 70));
      const b = Math.round(229 + f * (6 - 229));
      ctx.strokeStyle = `rgb(${r},${g},${b})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(X(path[i - 1].re), Y(path[i - 1].im));
      ctx.lineTo(X(path[i].re), Y(path[i].im));
      ctx.stroke();
    }

    // resultant arrow from origin to S(R_max)
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(X(0), Y(0));
    ctx.lineTo(X(Send.re), Y(Send.im));
    ctx.stroke();
    ctx.fillStyle = "#e11d48";
    ctx.beginPath();
    ctx.arc(X(Send.re), Y(Send.im), 4.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText("S(R_max)", X(Send.re) + 8, Y(Send.im) + 4);
  };

  // ── RIGHT: sheet edge-on with Fresnel rings + observation point ────────────
  const drawRings = ({ ctx, w, h }: any) => {
    ctx.clearRect(0, 0, w, h);
    const sheetX = w * 0.5;
    const obsY = h * 0.5;
    // map physical (rho, z) onto the panel. The sheet is the vertical line at
    // sheetX (edge-on); the observation point sits to the right at distance z.
    const rhoMax = Math.sqrt(Math.max(RmaxEff * RmaxEff - z * z, 0));
    const pixPerM = (h * 0.44) / Math.max(rhoMax, z * 1.2, 1e-6);

    // shaded Fresnel half-zones (alternating sign of contribution phase)
    // zone boundaries where R = z + n·λ/2  →  rho_n = sqrt(R²-z²)
    const nMax = Math.ceil(nZones) + 1;
    for (let n = nMax; n >= 1; n--) {
      const Rn = z + (n * lambda) / 2;
      if (Rn > RmaxEff + lambda) continue;
      const rhoN = Math.sqrt(Math.max(Rn * Rn - z * z, 0));
      const ry = rhoN * pixPerM;
      const lit = Rn <= RmaxEff;
      // even/odd zones get opposite tint; fade with n (far rings matter less)
      const fade = lit ? Math.max(0.08, 0.5 * Math.exp(-(Rn - z) / lamDamp) + 0.12) : 0.04;
      ctx.fillStyle =
        n % 2 === 0
          ? `rgba(79,70,229,${fade})`
          : `rgba(225,29,72,${fade})`;
      ctx.fillRect(sheetX - 6, obsY - ry, 12, 2 * ry);
    }

    // the sheet (edge-on)
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 3;
    const sheetHalf = Math.min(rhoMax * pixPerM + 12, h * 0.46);
    ctx.beginPath();
    ctx.moveTo(sheetX, obsY - sheetHalf);
    ctx.lineTo(sheetX, obsY + sheetHalf);
    ctx.stroke();
    ctx.fillStyle = "#475569";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("dipole sheet (edge-on)", sheetX, obsY - sheetHalf - 8);

    // axis from sheet foot-point to observer
    const obsX = sheetX + Math.min(z * pixPerM, w * 0.4);
    ctx.strokeStyle = "#cbd5e1";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(sheetX, obsY);
    ctx.lineTo(obsX, obsY);
    ctx.stroke();
    ctx.setLineDash([]);

    // a sample of rays from rings up to R_max to the observer
    ctx.strokeStyle = "rgba(148,163,184,0.55)";
    ctx.lineWidth = 1;
    const rays = 6;
    for (let i = 1; i <= rays; i++) {
      const rho = (rhoMax * i) / rays;
      const ry = rho * pixPerM;
      ctx.beginPath();
      ctx.moveTo(sheetX, obsY - ry);
      ctx.lineTo(obsX, obsY);
      ctx.moveTo(sheetX, obsY + ry);
      ctx.lineTo(obsX, obsY);
      ctx.stroke();
    }

    // observation point
    ctx.fillStyle = "#e11d48";
    ctx.beginPath();
    ctx.arc(obsX, obsY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#1f2733";
    ctx.textAlign = "left";
    ctx.fillText("observer (0,0,z)", obsX + 8, obsY - 8);

    // legend
    ctx.font = "10px ui-sans-serif, system-ui";
    ctx.fillStyle = "#64748b";
    ctx.textAlign = "left";
    ctx.fillText("alternating bands = successive Fresnel half-zones", 8, h - 8);
  };

  // ── BOTTOM: the radiated wave vs the driving dipole (quarter-cycle lag) ──────
  // Re{E·exp[-i(δt-Kz)]} vs Re{p0·exp(-iδt)} over one cycle, with phase = arg(S).
  const wave = useMemo<Series[]>(() => {
    const Np = 240;
    const ph: number[] = [];
    const dip: number[] = [];
    const rad: number[] = [];
    const ampE = magE / Math.max(analytic, 1e-9); // normalize radiated amplitude to ~1
    const argE = Math.atan2(Send.im, Send.re);
    for (let i = 0; i <= Np; i++) {
      const dt = (i / Np) * 2 * Math.PI; // δt over one cycle
      ph.push(dt);
      dip.push(Math.cos(dt)); // Re{p0 exp(-iδt)} ∝ cos(δt)
      // Re{ |E| exp(i argE) exp(-iδt) } ∝ amp·cos(δt - argE)
      rad.push(ampE * Math.cos(dt - argE));
    }
    return [
      { x: ph, y: dip, color: "#94a3b8", width: 2, label: "driving p", dashed: true },
      { x: ph, y: rad, color: "#e11d48", width: 2.5, label: "radiated E" },
    ];
  }, [magE, analytic, Send.re, Send.im]);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Phasor spiral: running sum S(R)
          </div>
          <Canvas width={320} height={300} draw={drawSpiral} animate={false} redraw={[K, z, Rmax, eta, p0]} />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Fresnel rings included (R ≤ R_max)
          </div>
          <Canvas width={320} height={300} draw={drawRings} animate={false} redraw={[K, z, Rmax]} />
        </div>
      </div>

      {showWave ? (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Radiated wave vs driving dipole — the quarter-cycle lag
          </div>
          <Plot
            width={660}
            height={180}
            xRange={[0, 2 * Math.PI]}
            yRange={[-1.25, 1.25]}
            xLabel="δt  (one cycle)"
            yLabel="field"
            lines={wave}
            markers={[{ y: 0, color: "#e2e8f0", dashed: false }]}
          />
        </div>
      ) : null}

      <Controls>
        <Slider label={String.raw`K`} tex min={1} max={50} step={0.5} value={K} onChange={setK} unit="rad/m" />
        <Slider label={String.raw`z`} tex min={0.2} max={5} step={0.1} value={z} onChange={setZ} unit="m" />
        <Slider
          label={String.raw`R_{\max}`}
          tex
          min={1}
          max={40}
          step={0.5}
          value={Rmax}
          onChange={setRmax}
          unit="m"
        />
        <Slider label={String.raw`\eta`} tex min={0.1} max={10} step={0.1} value={eta} onChange={setEta} unit="1/m²" />
        <Slider label={String.raw`p_0`} tex min={0.1} max={5} step={0.1} value={p0} onChange={setP0} unit="C·m" />
        <Toggle label="show radiated wave vs dipole" checked={showWave} onChange={setShowWave} />
        <Readout label={String.raw`|E|\ \text{(numeric)}`} tex value={magE.toFixed(3)} />
        <Readout label={String.raw`\eta K p_0/2\varepsilon_0\ \text{(Eq 13)}`} tex value={analytic.toFixed(3)} />
        <Readout label={String.raw`\arg E\ \text{rel. to } p`} tex value={`${phaseDeg.toFixed(1)}°`} />
        <Readout label={String.raw`\text{Fresnel zones}`} tex value={Math.floor(nZones).toString()} />
        <Readout label={String.raw`\text{conv. error}`} tex value={convErr.toFixed(3)} />
      </Controls>
    </div>
  );
}
