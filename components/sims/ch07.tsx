"use client";

/**
 * Chapter VII — The Bloch vector.
 *
 * A real-time integrator of the two-level density-matrix / Bloch equations in
 * the rotating frame (Eqs. 72-77, 79-80). The student sets the detuning, the
 * Rabi drive, and the two relaxation rates, then watches the Bloch vector
 *   R = (R1, R2, R3)
 * precess about the effective field β on a Bloch sphere while the populations,
 * inversion, and coherence magnitude update beneath.
 *
 * The three coupled scalar ODEs (all rates measured in units of a reference
 * rate γ₀, so every control is dimensionless):
 *
 *   Ṙ1 = -(ω-ν) R2            - (1/T₂) R1
 *   Ṙ2 = +(ω-ν) R1 + (℘E₀/ℏ) R3 - (1/T₂) R2
 *   Ṙ3 =          - (℘E₀/ℏ) R2 - (1/T₁)(R3 - R3^eq)
 *
 * Here Δ ≡ ω-ν is the detuning and Ω ≡ ℘E₀/ℏ the (bare) Rabi frequency, and the
 * slider values ARE the rates 1/T₂, 1/T₁ directly (so a rate of 0 = no decay,
 * never a division by zero).
 *
 * Density-matrix elements are read off EXACTLY (Eqs. 66-71):
 *   ρ_aa = ½(1+R3),  ρ_bb = ½(1-R3),  |ρ_ab| = ½√(R1²+R2²).
 * The optical carrier e^{-iνt} drops out of |ρ_ab|, so ν never enters the sim —
 * we live entirely in the rotating frame, with only Δ and Ω as frequencies.
 *
 * Sanity checks (built into the defaults the student can reach):
 *   • Δ=0, both rates=0  ⇒  R3(t) = -cos(Ω t),  R2(t) = -sin(Ω t),  R1 ≡ 0
 *     (a great circle in the e₂-e₃ plane: full Rabi flopping south→north→south).
 *   • drive off, damping on ⇒ |R⊥| decays as e^{-t/T₂}, R3 relaxes to R3^eq at 1/T₁.
 *   • off resonance ⇒ inversion amplitude reduced by Ω²/|β|², |β|=√(Ω²+Δ²).
 *
 * Architecture follows ch03: precompute the whole trajectory with fixed-step
 * RK4 in a useMemo, then sweep an animated cursor along the stored arrays; the
 * plots render the full traces statically.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series } from "@/components/sim";

const TWO_PI = 2 * Math.PI;

export default function Ch07Sim() {
  const [delta, setDelta] = useState(0.0); // Δ = ω-ν   (units of γ₀)
  const [omega, setOmega] = useState(3.0); // Ω = ℘E₀/ℏ (units of γ₀)
  const [g2, setG2] = useState(0.3); // 1/T₂ transverse (coherence) rate
  const [g1, setG1] = useState(0.15); // 1/T₁ longitudinal (inversion) rate
  const [r3eq, setR3eq] = useState(-1.0); // equilibrium inversion
  const [showBeta, setShowBeta] = useState(true);
  const [driveOn, setDriveOn] = useState(true);

  const drive = driveOn ? omega : 0; // "set Rabi = 0" turns off the drive

  // ── Precompute the Bloch trajectory with fixed-step RK4 ───────────────────
  const sim = useMemo(() => {
    const Om = drive;
    const D = delta;

    // f(R) for the three coupled scalar ODEs (Eqs. 72-75), rates used directly.
    const f = (R: [number, number, number]): [number, number, number] => {
      const [R1, R2, R3] = R;
      return [
        -D * R2 - g2 * R1,
        D * R1 + Om * R3 - g2 * R2,
        -Om * R2 - g1 * (R3 - r3eq),
      ];
    };

    // Window: long enough to show relaxation at the default rates.
    const T = 40;
    const NOUT = 1500;
    const dtOut = T / NOUT;
    const sub = 8; // RK4 sub-steps per stored sample (h ≈ 0.0033 ≪ 0.01/γ₀)
    const h = dtOut / sub;

    const ts = new Array<number>(NOUT + 1);
    const R1 = new Array<number>(NOUT + 1);
    const R2 = new Array<number>(NOUT + 1);
    const R3 = new Array<number>(NOUT + 1);

    // IC: with the drive on, start at the south pole (atom in lower level, Eq. 51)
    // so the trajectory is a clean Rabi flop. With the drive off, seed a π/2-prepared
    // dipole on the equator R=(1,0,0) so free induction decay (transverse part shrinking
    // at 1/T₂) and R₃ relaxing to R₃ᵉᑫ at 1/T₁ are both visible.
    let R: [number, number, number] = driveOn ? [0, 0, -1] : [1, 0, 0];
    let t = 0;

    const add = (
      a: [number, number, number],
      b: [number, number, number],
      s: number
    ): [number, number, number] => [a[0] + s * b[0], a[1] + s * b[1], a[2] + s * b[2]];

    for (let i = 0; i <= NOUT; i++) {
      ts[i] = t;
      R1[i] = R[0];
      R2[i] = R[1];
      R3[i] = R[2];
      for (let s = 0; s < sub && i < NOUT; s++) {
        const k1 = f(R);
        const k2 = f(add(R, k1, 0.5 * h));
        const k3 = f(add(R, k2, 0.5 * h));
        const k4 = f(add(R, k3, h));
        R = [
          R[0] + (h / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]),
          R[1] + (h / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]),
          R[2] + (h / 6) * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]),
        ];
        t += h;
      }
    }

    // Derived density-matrix elements (Eqs. 66-71), exact.
    const rho_aa = new Array<number>(NOUT + 1);
    const rho_bb = new Array<number>(NOUT + 1);
    const rho_ab = new Array<number>(NOUT + 1);
    const Rlen = new Array<number>(NOUT + 1);
    for (let i = 0; i <= NOUT; i++) {
      rho_aa[i] = 0.5 * (1 + R3[i]);
      rho_bb[i] = 0.5 * (1 - R3[i]);
      rho_ab[i] = 0.5 * Math.sqrt(R1[i] * R1[i] + R2[i] * R2[i]);
      Rlen[i] = Math.sqrt(R1[i] * R1[i] + R2[i] * R2[i] + R3[i] * R3[i]);
    }

    return { ts, R1, R2, R3, rho_aa, rho_bb, rho_ab, Rlen, dtOut, T, NOUT };
  }, [drive, driveOn, delta, g2, g1, r3eq]);

  // ── Derived headline numbers ──────────────────────────────────────────────
  const betaMag = Math.sqrt(drive * drive + delta * delta); // generalized Rabi |β| (Eq. 77)
  const floppingPeriod = betaMag > 1e-6 ? TWO_PI / betaMag : Infinity;
  const maxRhoAA = betaMag > 1e-6 ? (drive * drive) / (betaMag * betaMag) : 0; // Ω²/|β|² = max upper-state population ρaa (off-res Rabi result)
  const lastIdx = sim.NOUT;
  const rho_aa_now = sim.rho_aa[lastIdx];
  const rho_bb_now = sim.rho_bb[lastIdx];
  const R3_now = sim.R3[lastIdx];
  const coh_now = sim.rho_ab[lastIdx];

  // ── Bloch-sphere view (oblique 2D projection, animated cursor) ────────────
  // e₃ vertical (north = R3=+1 = upper level |a⟩, south = R3=-1 = lower |b⟩),
  // e₁ to the right, e₂ into the page (drawn obliquely). The effective field β
  // = Ω e₁ - Δ e₃ is a fixed arrow; R precesses about it leaving a fading trail.
  const drawSphere = ({ ctx, w, h, t }: { ctx: CanvasRenderingContext2D; w: number; h: number; t: number }) => {
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.5;
    const cy = h * 0.5;
    const Rsph = Math.min(w, h) * 0.38;

    // oblique projection: e1 -> (+x), e3 -> (-y, up), e2 -> (oblique, into page)
    const ob = 0.45; // obliqueness of the e2 axis
    const proj = (R1: number, R2: number, R3: number): [number, number, number] => {
      const px = cx + Rsph * (R1 + ob * 0.55 * R2);
      const py = cy - Rsph * (R3 + ob * 0.5 * R2);
      const depth = R2; // for simple painter ordering / shading
      return [px, py, depth];
    };

    // sphere outline
    ctx.strokeStyle = "#d7dbe6";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, Rsph, 0, TWO_PI);
    ctx.stroke();

    // equator (R3=0) as an ellipse via the projection
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let k = 0; k <= 64; k++) {
      const a = (k / 64) * TWO_PI;
      const [px, py] = proj(Math.cos(a), Math.sin(a), 0);
      k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // vertical e₃ axis
    const [ax0, ay0] = proj(0, 0, -1.12);
    const [ax1, ay1] = proj(0, 0, 1.12);
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    ctx.moveTo(ax0, ay0);
    ctx.lineTo(ax1, ay1);
    ctx.stroke();

    // pole labels
    ctx.fillStyle = "#475569";
    ctx.font = "600 12px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("|a⟩  R₃=+1", cx, ay1 - 8);
    ctx.fillText("|b⟩  R₃=-1", cx, ay0 + 16);

    // e₁ axis hint
    const [ex0, ey0] = proj(-1.12, 0, 0);
    const [ex1, ey1] = proj(1.12, 0, 0);
    ctx.strokeStyle = "#eceef3";
    ctx.beginPath();
    ctx.moveTo(ex0, ey0);
    ctx.lineTo(ex1, ey1);
    ctx.stroke();
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("e₁", ex1 + 4, ey1 + 4);

    // effective field β = Ω e₁ - Δ e₃, normalized for display
    if (showBeta && betaMag > 1e-6) {
      const bx = drive / betaMag;
      const bz = -delta / betaMag;
      const [bpx, bpy] = proj(bx, 0, bz);
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(bpx, bpy);
      ctx.stroke();
      // arrowhead
      const ang = Math.atan2(bpy - cy, bpx - cx);
      ctx.fillStyle = "#d97706";
      ctx.beginPath();
      ctx.moveTo(bpx, bpy);
      ctx.lineTo(bpx - 9 * Math.cos(ang - 0.4), bpy - 9 * Math.sin(ang - 0.4));
      ctx.lineTo(bpx - 9 * Math.cos(ang + 0.4), bpy - 9 * Math.sin(ang + 0.4));
      ctx.closePath();
      ctx.fill();
      ctx.font = "600 12px ui-sans-serif, system-ui";
      ctx.textAlign = "left";
      ctx.fillText("β", bpx + 5, bpy - 2);
    }

    // cursor index, looping over the precomputed trajectory (~6 s per sweep)
    const sweep = (t * (sim.T / 6)) % sim.T;
    const idx = Math.min(sim.NOUT, Math.max(0, Math.round((sweep / sim.T) * sim.NOUT)));

    // fading trail (recent indices)
    const trailN = 220;
    for (let j = Math.max(0, idx - trailN); j < idx; j++) {
      const a = (j - (idx - trailN)) / trailN;
      const [px, py] = proj(sim.R1[j], sim.R2[j], sim.R3[j]);
      ctx.fillStyle = `rgba(79,70,229,${0.05 + 0.4 * a})`;
      ctx.beginPath();
      ctx.arc(px, py, 1.6, 0, TWO_PI);
      ctx.fill();
    }

    // the Bloch vector R at the cursor
    const [rpx, rpy, rdepth] = proj(sim.R1[idx], sim.R2[idx], sim.R3[idx]);
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(rpx, rpy);
    ctx.stroke();
    const rAng = Math.atan2(rpy - cy, rpx - cx);
    ctx.fillStyle = "#4f46e5";
    ctx.beginPath();
    ctx.moveTo(rpx, rpy);
    ctx.lineTo(rpx - 10 * Math.cos(rAng - 0.4), rpy - 10 * Math.sin(rAng - 0.4));
    ctx.lineTo(rpx - 10 * Math.cos(rAng + 0.4), rpy - 10 * Math.sin(rAng + 0.4));
    ctx.closePath();
    ctx.fill();
    // tip dot, slightly bigger if "toward" the viewer
    ctx.beginPath();
    ctx.arc(rpx, rpy, rdepth > 0 ? 5 : 4, 0, TWO_PI);
    ctx.fill();

    ctx.fillStyle = "#1f2733";
    ctx.font = "600 12px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("R", rpx + 7, rpy - 2);

    // center dot
    ctx.fillStyle = "#64748b";
    ctx.beginPath();
    ctx.arc(cx, cy, 2.5, 0, TWO_PI);
    ctx.fill();
  };

  // ── Right panel: stacked time-traces ──────────────────────────────────────
  const popLines = useMemo<Series[]>(() => {
    const aa: [number, number][] = [];
    const bb: [number, number][] = [];
    for (let i = 0; i <= sim.NOUT; i += 2) {
      aa.push([sim.ts[i], sim.rho_aa[i]]);
      bb.push([sim.ts[i], sim.rho_bb[i]]);
    }
    return [
      { data: aa, color: "#e11d48", width: 2, label: "ρ_aa" },
      { data: bb, color: "#0891b2", width: 2, label: "ρ_bb" },
    ];
  }, [sim]);

  const invCohLines = useMemo<Series[]>(() => {
    const r3: [number, number][] = [];
    const ab: [number, number][] = [];
    for (let i = 0; i <= sim.NOUT; i += 2) {
      r3.push([sim.ts[i], sim.R3[i]]);
      ab.push([sim.ts[i], sim.rho_ab[i]]);
    }
    return [
      { data: r3, color: "#4f46e5", width: 2.2, label: "R₃ = inversion" },
      { data: ab, color: "#d97706", width: 2, label: "|ρ_ab|" },
    ];
  }, [sim]);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Bloch sphere — R precessing about β
          </div>
          <Canvas width={320} height={320} draw={drawSphere} speed={1} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
              Populations ρ_aa, ρ_bb
            </div>
            <Plot
              width={320}
              height={150}
              xRange={[0, sim.T]}
              yRange={[0, 1]}
              xLabel="t  (1/γ₀)"
              yLabel="population"
              lines={popLines}
              markers={[{ y: 0.5, color: "#e2e8f0", dashed: true }]}
            />
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
              Inversion R₃ &amp; coherence |ρ_ab|
            </div>
            <Plot
              width={320}
              height={150}
              xRange={[0, sim.T]}
              yRange={[-1, 1]}
              xLabel="t  (1/γ₀)"
              yLabel="R₃ , |ρ_ab|"
              lines={invCohLines}
              markers={[
                { y: 0, color: "#e2e8f0", dashed: false },
                { y: r3eq, color: "#94a3b8", dashed: true, label: "R₃ᵉᑫ" },
              ]}
            />
          </div>
        </div>
      </div>

      <Controls>
        <Slider
          label={String.raw`\Delta=\omega-\nu`}
          tex
          min={-10}
          max={10}
          step={0.1}
          value={delta}
          onChange={setDelta}
          unit="γ₀"
        />
        <Slider
          label={String.raw`\Omega=\wp E_0/\hbar`}
          tex
          min={0}
          max={10}
          step={0.1}
          value={omega}
          onChange={setOmega}
          unit="γ₀"
        />
        <Slider
          label={String.raw`1/T_2`}
          tex
          min={0}
          max={5}
          step={0.05}
          value={g2}
          onChange={setG2}
          unit="γ₀"
        />
        <Slider
          label={String.raw`1/T_1`}
          tex
          min={0}
          max={5}
          step={0.05}
          value={g1}
          onChange={setG1}
          unit="γ₀"
        />
        <Slider
          label={String.raw`R_3^{\mathrm{eq}}`}
          tex
          min={-1}
          max={1}
          step={0.05}
          value={r3eq}
          onChange={setR3eq}
        />
        <Toggle label="show effective field β" checked={showBeta} onChange={setShowBeta} />
        <Toggle label="drive on (uncheck → set Ω=0, free induction decay)" checked={driveOn} onChange={setDriveOn} />
        <Readout label="ρ_aa (end)" value={rho_aa_now.toFixed(3)} />
        <Readout label="ρ_bb (end)" value={rho_bb_now.toFixed(3)} />
        <Readout label={String.raw`R_3=\rho_{aa}-\rho_{bb}\ (\text{end})`} tex value={R3_now.toFixed(3)} />
        <Readout label={String.raw`|\rho_{ab}|\ (\text{end})`} tex value={coh_now.toFixed(3)} />
        <Readout
          label={String.raw`|\beta|=\sqrt{\Omega^2+\Delta^2}`}
          tex
          value={`${betaMag.toFixed(2)} γ₀`}
        />
        <Readout
          label={String.raw`\text{flop period }2\pi/|\beta|`}
          tex
          value={Number.isFinite(floppingPeriod) ? `${floppingPeriod.toFixed(2)} /γ₀` : "∞"}
        />
        <Readout label={String.raw`\text{max }\rho_{aa}\text{ (upper pop.) }\Omega^2/|\beta|^2`} tex value={maxRhoAA.toFixed(3)} />
        <Readout
          label={String.raw`|\mathbf{R}|\ (\text{end, }1=\text{pure})`}
          tex
          value={sim.Rlen[lastIdx].toFixed(3)}
        />
      </Controls>
    </div>
  );
}
