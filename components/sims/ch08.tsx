"use client";

/**
 * Chapter VIII — Semiclassical laser theory: single-mode turn-on.
 *
 * We integrate the chapter's own intensity equation (Eq. 51)
 *
 *     dI_n/dt = 2 I_n ( alpha_n - beta_n I_n )                              (51)
 *
 * with the Table 8-1 coefficients written through the relative excitation N
 * (= relative-excitation script-N, "N" below) and the Lorentzian L:
 *
 *     L(x)      = 1 / (1 + x^2),   x = (omega - nu_n)/gamma                 (36)
 *     alpha_n   = (1/2)(nu/Q) ( N L - 1 )                                   (Table 8-1)
 *     beta_n    = (3/2) N L^2 (1/2)(nu/Q)                                   (Table 8-1)
 *     I_ss      = alpha_n / beta_n = (N L - 1) / ((3/2) N L^2)              (55)
 *
 * The exact logistic solution (Eq. 56) is overlaid as a dashed fidelity check
 * on the RK4 integrator:
 *
 *     I_n(t) = alpha I0 e^{2 alpha t} /
 *              ( alpha - beta I0 + beta I0 e^{2 alpha t} )                  (56)
 *
 * Frequency pulling (Eq. 58) is shown as the DIMENSIONLESS shift, computed
 * directly in units of gamma so no optical frequency ever enters:
 *
 *     (nu_n - Omega_n)/gamma  =  x * r/(1 + r),   r = (1/2)(nu/Q)/gamma
 *
 * and the Fig 8-7 dispersion shape D(x) = x/(1 + x^2) (= x L) is plotted, with
 * the sign flipping between a gain medium (N>1) and an absorber reference.
 *
 * All rates are in 10^6 s^-1 and time in µs, so alpha,beta are order 1 and the
 * S-curve spans a few µs (same reduced-unit move as the Chapter-II sim).
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series } from "@/components/sim";

export default function Ch08Sim() {
  const [Nexc, setNexc] = useState(1.5); // relative excitation script-N = Nbar/N_T
  const [x, setX] = useState(0.0); // detuning (omega - nu_n)/gamma, in halfwidths
  const [nuQ, setNuQ] = useState(1.0); // cavity loss nu/Q_n, in 10^6 s^-1
  const [I0, setI0] = useState(0.01); // seed intensity I_n(0)
  const [showDisp, setShowDisp] = useState(false); // reveal frequency-pulling panel

  const gamma = 1.0; // homogeneous halfwidth, fixes the rate scale (10^6 s^-1)

  // ── live coefficients (Table 8-1, written through N and L) ────────────────
  const L = 1 / (1 + x * x); // Lorentzian L(omega - nu_n)
  const half = 0.5 * nuQ; // cavity half-width (1/2) nu/Q
  const alpha = half * (Nexc * L - 1); // net linear gain alpha_n
  const beta = 1.5 * Nexc * L * L * half; // self-saturation beta_n
  const Iss = beta > 0 ? alpha / beta : 0; // steady-state intensity alpha/beta
  const above = alpha > 0; // sign(alpha) = sign(N L - 1)  -> threshold flag
  const tau = above ? 1 / (2 * alpha) : Infinity; // buildup time constant 1/(2 alpha)

  // dimensionless frequency-pulling shift (nu_n - Omega_n)/gamma, Eq.(58) form
  const r = half / gamma;
  const pullShift = x * (r / (1 + r));

  // ── A. RK4 integration of dI/dt = 2 I (alpha - beta I), Eq. (51) ───────────
  const { numeric, exact, tEnd, yMax } = useMemo(() => {
    // pick a window covering several buildup/decay times
    const scale = Math.abs(alpha) > 1e-4 ? 1 / Math.abs(alpha) : 12;
    const tEnd = Math.min(Math.max(6 * scale, 1), 40);
    const N = 600;
    const h = tEnd / N;
    const f = (I: number) => 2 * I * (alpha - beta * I);

    const xs: number[] = [];
    const yn: number[] = [];
    const ye: number[] = [];
    let I = I0;
    for (let i = 0; i <= N; i++) {
      const t = i * h;
      xs.push(t);
      yn.push(I);
      // exact logistic (Eq. 56), guarded against the 0/0 at threshold
      let Iex: number;
      if (Math.abs(alpha) < 1e-4) {
        // alpha -> 0 limit of Eq. (56): I(t) = I0 / (1 + 2 beta I0 t)
        Iex = I0 / (1 + 2 * beta * I0 * t);
      } else {
        const e = Math.exp(2 * alpha * t);
        Iex = (alpha * I0 * e) / (alpha - beta * I0 + beta * I0 * e);
      }
      ye.push(Iex);
      // RK4 step
      const k1 = f(I);
      const k2 = f(I + 0.5 * h * k1);
      const k3 = f(I + 0.5 * h * k2);
      const k4 = f(I + h * k3);
      I = I + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
      if (!isFinite(I) || I < 0) I = 0;
    }
    const yMax = Math.max(0.12, Iss * 1.25, I0 * 1.25, ...yn);
    return {
      numeric: [{ x: xs, y: yn, color: "#4f46e5", width: 2.6, label: "RK4 of Eq. 51" }] as Series[],
      exact: [{ x: xs, y: ye, color: "#e11d48", width: 1.8, dashed: true, label: "exact (Eq. 56)" }] as Series[],
      tEnd,
      yMax,
    };
  }, [alpha, beta, Iss, I0]);

  const buildLines: Series[] = [...numeric, ...exact];

  // ── B. steady-state tuning curve I_ss vs detuning (Fig 8-5) ───────────────
  const tuning = useMemo<Series[]>(() => {
    const M = 280;
    const xx: number[] = [];
    const yy: number[] = [];
    for (let i = 0; i <= M; i++) {
      const d = -3 + (6 * i) / M;
      const Ld = 1 / (1 + d * d);
      const a = half * (Nexc * Ld - 1);
      const b = 1.5 * Nexc * Ld * Ld * half;
      const iss = a > 0 && b > 0 ? a / b : 0; // no oscillation where N L < 1
      xx.push(d);
      yy.push(iss);
    }
    return [{ x: xx, y: yy, color: "#0891b2", width: 2.6, label: "I_ss(detuning)", fill: true }];
  }, [Nexc, nuQ]);

  // detuning band where N L < 1 (below threshold, dark) — shade via markers
  // x_edge: N/(1+xe^2) = 1  ->  xe = sqrt(N - 1)
  const xEdge = Nexc > 1 ? Math.sqrt(Nexc - 1) : 0;

  // ── C. frequency-pulling / dispersion shape D(x) (Fig 8-7) ────────────────
  const dispersion = useMemo<Series[]>(() => {
    const M = 260;
    const xx: number[] = [];
    const gain: number[] = [];
    const absorb: number[] = [];
    for (let i = 0; i <= M; i++) {
      const d = -3 + (6 * i) / M;
      const D = d / (1 + d * d); // dispersive shape x * L
      gain.push(D * (r / (1 + r))); // pulled shift for the gain medium (N>1)
      absorb.push(-D * (r / (1 + r))); // absorber reference: opposite sign
      xx.push(d);
    }
    return [
      { x: xx, y: gain, color: "#d97706", width: 2.6, label: "gain (N>1)" },
      { x: xx, y: absorb, color: "#94a3b8", width: 1.8, dashed: true, label: "absorber" },
    ];
  }, [nuQ]);

  // ── D. animated standing-wave + spatial-hole-burning cartoon ──────────────
  const drawCavity = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);
    const left = 38;
    const right = w - 38;
    const span = right - left;
    const k = (3 * Math.PI) / span; // three half-waves across the cavity
    const midField = h * 0.32;
    const midPop = h * 0.74;

    // mirrors
    ctx.strokeStyle = "#334155";
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(left, 18); ctx.lineTo(left, h - 18); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(right, 18); ctx.lineTo(right, h - 18); ctx.stroke();

    // standing-wave field U_n(z) = sin(K z), breathing at the optical phase
    const breathe = Math.cos(t * 4);
    const amp = 26;
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    for (let i = 0; i <= span; i += 2) {
      const z = i;
      const E = amp * Math.sin(k * z) * breathe;
      const px = left + z;
      const py = midField - E;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
    // mirror image (the other half of the standing wave)
    ctx.strokeStyle = "#c7cdf5";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let i = 0; i <= span; i += 2) {
      const z = i;
      const E = -amp * Math.sin(k * z) * breathe;
      const px = left + z;
      const py = midField - E;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    ctx.fillStyle = "#5b6473";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("standing-wave field  U_n(z) = sin(K_n z)", left + 6, 16);

    // inversion grating: N(z)/(1 + R/R_s), burned at antinodes (|sin| large)
    ctx.fillStyle = "#0891b2";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.fillText("inversion  ρ_aa − ρ_bb  (burned at antinodes — spatial hole burning)", left + 6, midPop - 44);
    const sat = 0.55 + 0.45 * Math.min(1, Iss); // how deeply the field bites
    const barW = 6;
    for (let px = left; px < right; px += barW) {
      const z = px - left;
      const s = Math.sin(k * z);
      const R = s * s; // R proportional to |U_n|^2 = sin^2
      const inv = 1 / (1 + sat * 3 * R); // saturated inversion N/(1+R/R_s)
      const barH = 34 * inv;
      ctx.fillStyle = "#0891b2";
      ctx.globalAlpha = 0.25 + 0.6 * inv;
      ctx.fillRect(px, midPop - barH, barW - 1.2, barH);
      ctx.globalAlpha = 1;
    }
    // baseline
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(left, midPop); ctx.lineTo(right, midPop); ctx.stroke();
  };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Intensity build-up I_n(t) — Eq. 51 vs Eq. 56
          </div>
          <Plot
            width={320}
            height={240}
            xRange={[0, tEnd]}
            yRange={[0, yMax]}
            xLabel="t  (µs)"
            yLabel="I_n"
            lines={buildLines}
            markers={[{ y: above ? Iss : 0, color: "#16a34a", label: "I_ss" }]}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Tuning curve I_ss vs detuning (Fig 8-5)
          </div>
          <Plot
            width={320}
            height={240}
            xRange={[-3, 3]}
            yRange={[0, Math.max(0.5, Iss * 1.3, 1)]}
            xLabel="(ω − ν_n)/γ"
            yLabel="I_ss"
            lines={tuning}
            markers={[
              { x: x, color: "#e11d48", label: "current" },
              { x: xEdge, color: "#cbd5e1" },
              { x: -xEdge, color: "#cbd5e1" },
            ]}
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
          Standing wave &amp; spatial hole burning (Fig 8-2 / 8-4)
        </div>
        <Canvas width={660} height={230} draw={drawCavity} speed={1} />
      </div>

      {showDisp ? (
        <div style={{ marginTop: "1rem" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Dispersion / index shape σ_n ∝ x·ℒ vs detuning (Fig 8-7)
          </div>
          <Plot
            width={660}
            height={220}
            xRange={[-3, 3]}
            yRange={[-0.6, 0.6]}
            xLabel="(ω − ν_n)/γ"
            yLabel="σ_n ∝ x·ℒ  (Fig 8-7, arb.)"
            lines={dispersion}
            markers={[
              { x: x, color: "#e11d48", label: "current" },
              { y: 0, color: "#e2e8f0", dashed: false },
            ]}
          />
        </div>
      ) : null}

      <Controls>
        <Slider
          label={String.raw`\mathfrak{N}=\bar N/N_T`}
          tex
          min={0.5}
          max={3}
          step={0.02}
          value={Nexc}
          onChange={setNexc}
          unit="× threshold"
        />
        <Slider
          label={String.raw`(\omega-\nu_n)/\gamma`}
          tex
          min={-3}
          max={3}
          step={0.02}
          value={x}
          onChange={setX}
          unit="halfwidths"
        />
        <Slider
          label={String.raw`\nu/Q_n`}
          tex
          min={0.1}
          max={10}
          step={0.05}
          value={nuQ}
          onChange={setNuQ}
          unit="10⁶ s⁻¹"
        />
        <Slider
          label={String.raw`I_n(0)`}
          tex
          min={0.001}
          max={0.5}
          step={0.001}
          value={I0}
          onChange={setI0}
          unit="seed"
        />
        <Readout
          label={String.raw`\alpha_n=\tfrac12\tfrac{\nu}{Q_n}(\mathfrak{N}\mathscr{L}-1)`}
          tex
          value={
            <span style={{ color: above ? "#16a34a" : "#e11d48", fontWeight: 600 }}>
              {alpha.toFixed(3)} {above ? "▲ ABOVE THRESHOLD" : "▼ BELOW THRESHOLD"}
            </span>
          }
        />
        <Readout label={String.raw`\beta_n=\tfrac32\mathfrak{N}\mathscr{L}^2(\tfrac12\tfrac{\nu}{Q_n})`} tex value={beta.toFixed(3)} />
        <Readout
          label={String.raw`I_n^{ss}=\alpha_n/\beta_n`}
          tex
          value={above ? Iss.toFixed(3) : "0  (dark)"}
        />
        <Readout
          label={String.raw`\tau=1/(2\alpha_n)`}
          tex
          value={above ? `${tau.toFixed(2)} µs` : "— (decaying)"}
        />
        <Readout label={String.raw`\mathscr{L}(\omega-\nu_n)`} tex value={L.toFixed(3)} />
        <Readout label={String.raw`(\nu_n-\Omega_n)/\gamma`} tex value={pullShift.toFixed(3)} />
        <Toggle label="show frequency-pulling panel" checked={showDisp} onChange={setShowDisp} />
      </Controls>
    </div>
  );
}
