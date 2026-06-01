"use client";

/**
 * Chapter XIII — The McCall–Hahn Pulse Area Theorem integrator.
 *
 * The pulse AREA  theta(z) = (wp/hbar) * integral E dt  is the time-integrated
 * Rabi flip angle (the Bloch-vector tipping angle). McCall and Hahn (1967)
 * proved it evolves with propagation distance z by its own sine, independent of
 * pulse shape (Eq. 42):
 *
 *     d theta / dz = (1/2) a sin(theta)
 *
 * with the BOOK's SIGNED gain convention: a < 0 for an absorber, a > 0 for an
 * amplifier. The fixed points are theta = n*pi. Closed-form solution (Eq. 43):
 *
 *     theta(z) = 2 arctan[ tan(theta0/2) exp(a z / 2) ]
 *
 * Four-corner physics this sim reproduces (Fig. 13-3a):
 *   • absorber (a<0): even multiples of pi are STABLE; theta -> 2*pi is the
 *       self-induced-transparency (SIT) attractor; odd-pi UNSTABLE; small theta
 *       decays to 0 (Beer's law, Eq. 41).
 *   • amplifier (a>0): odd multiples of pi are STABLE.
 *
 * The integrator runs RK4 on Eq.(42) and overlays the closed form (43) as a
 * validation check. NOTE: the naive 2*atan(...) lands in (-pi, pi); we anchor an
 * additive winding term 2*pi*m at z=0 so the closed form lands in the same
 * branch as the RK4 trajectory (otherwise they disagree by a multiple of 2*pi).
 *
 * Views:
 *   A. animated canvas: the running area theta(z) marches along z while a Bloch
 *      arrow on the unit circle is tipped through that angle; the verdict panel
 *      reports the asymptotic n*pi and the SIT energy verdict.
 *   B. theta(z)/pi vs z: the integrated curve, the closed-form overlay, a fan of
 *      faint companion curves from a spread of theta0, and stable/unstable lines.
 *   C. phase line dtheta/dz vs theta with arrows toward the attractors.
 *   D. the sech field envelope scaled so its area equals theta_infinity — the
 *      2*pi SIT soliton when the absorber drives theta -> 2*pi.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Controls, Readout, Series, Marker } from "@/components/sim";

const PI = Math.PI;

export default function Ch13Sim() {
  const [theta0, setTheta0] = useState(4.712); // input pulse area, rad (~3pi/2)
  const [a, setA] = useState(-1.0); // signed gain/absorption coefficient, 1/length
  const [L, setL] = useState(10); // propagation length, in units of length

  const absorbing = a < 0;

  // ── closed-form area theorem (Eq. 43) with branch anchoring ───────────────
  // 2*atan(...) returns a value in (-pi, pi); to keep the closed form in the
  // SAME 2*pi branch as the true ODE, add the winding number fixed at z=0.
  const windOf = (th0: number) =>
    Math.round((th0 - 2 * Math.atan(Math.tan(th0 / 2))) / (2 * PI));
  const thetaClosed = (th0: number, z: number) => {
    const m = windOf(th0);
    return 2 * Math.atan(Math.tan(th0 / 2) * Math.exp((a * z) / 2)) + 2 * PI * m;
  };

  // ── RK4 of  d theta / dz = (1/2) a sin theta  (Eq. 42) ────────────────────
  const dtheta = (th: number) => 0.5 * a * Math.sin(th);
  const rk4 = (th: number, dz: number) => {
    const k1 = dtheta(th);
    const k2 = dtheta(th + 0.5 * dz * k1);
    const k3 = dtheta(th + 0.5 * dz * k2);
    const k4 = dtheta(th + dz * k3);
    return th + (dz / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
  };

  // ── asymptotic area (nearest stable n*pi for the chosen sign of a) ─────────
  // absorber -> even multiple of pi; amplifier -> odd multiple of pi.
  const thetaInf = useMemo(() => {
    if (Math.abs(a) < 1e-9) return theta0;
    if (absorbing) return 2 * PI * Math.round(theta0 / (2 * PI));
    // amplifier: nearest odd multiple of pi
    return PI * (2 * Math.round((theta0 / PI - 1) / 2) + 1);
  }, [theta0, a, absorbing]);
  const nInf = Math.round(thetaInf / PI);
  const isSIT = absorbing && nInf === 2; // 2pi pulse in an absorber -> transparent

  // ── B. theta(z)/pi trajectory: RK4 + closed-form overlay + companion fan ──
  const traj = useMemo<Series[]>(() => {
    const N = 400;
    const dz = L / N;
    // main RK4 curve
    const xRK: number[] = [0];
    const yRK: number[] = [theta0 / PI];
    let th = theta0;
    for (let i = 1; i <= N; i++) {
      th = rk4(th, dz);
      xRK.push(i * dz);
      yRK.push(th / PI);
    }
    // closed-form overlay (Eq. 43, branch-anchored)
    const xCF: number[] = [];
    const yCF: number[] = [];
    for (let i = 0; i <= N; i++) {
      const z = i * dz;
      xCF.push(z);
      yCF.push(thetaClosed(theta0, z) / PI);
    }
    const out: Series[] = [
      { x: xRK, y: yRK, color: "#4f46e5", width: 3, label: "RK4  θ(z)" },
      { x: xCF, y: yCF, color: "#e11d48", width: 1.6, dashed: true, label: "exact (43)" },
    ];
    // faint companion fan: a spread of input areas reproducing Fig. 13-3a
    const fan = [0.35, 0.9, 1.6, 2.4, 3.3, 4.2, 5.1, 5.9];
    for (const t0 of fan) {
      const xf: number[] = [];
      const yf: number[] = [];
      for (let i = 0; i <= N; i++) {
        const z = i * dz;
        xf.push(z);
        yf.push(thetaClosed(t0, z) / PI);
      }
      out.push({ x: xf, y: yf, color: "#c7cdf5", width: 1 });
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theta0, a, L]);

  // y-range to comfortably hold the data + the fan (0 .. ~4pi -> 0..4 in pi)
  const yHi = Math.max(theta0 / PI, 6) + 0.3;

  // stable (solid green) and unstable (dashed red/amber) fixed-point lines.
  // absorber: even-pi stable; amplifier: odd-pi stable.
  const trajMarkers = useMemo<Marker[]>(() => {
    const ms: Marker[] = [];
    for (let n = 0; n <= Math.ceil(yHi); n++) {
      const evenStable = absorbing ? n % 2 === 0 : n % 2 === 1;
      ms.push({
        y: n,
        color: evenStable ? "#16a34a" : "#d97706",
        dashed: !evenStable,
        label: n === nInf ? `θ∞ = ${n}π` : undefined,
      });
    }
    return ms;
  }, [absorbing, yHi, nInf]);

  // ── C. phase line  dtheta/dz vs theta over [0, ceil(theta0)+pi] ───────────
  const phase = useMemo<Series[]>(() => {
    const top = Math.max(theta0, 2 * PI) + PI;
    const N = 300;
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i <= N; i++) {
      const th = (top * i) / N;
      x.push(th / PI);
      y.push(dtheta(th));
    }
    return [{ x, y, color: "#0891b2", width: 2.6, label: "dθ/dz = ½ a sinθ" }];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theta0, a]);
  const phaseTopPi = (Math.max(theta0, 2 * PI) + PI) / PI;
  const phaseYabs = Math.abs(a) * 0.5 + 0.1;
  const phaseMarkers = useMemo<Marker[]>(() => {
    const ms: Marker[] = [{ y: 0, color: "#94a3b8", dashed: false }];
    for (let n = 0; n <= Math.ceil(phaseTopPi); n++) {
      const stable = absorbing ? n % 2 === 0 : n % 2 === 1;
      ms.push({ x: n, color: stable ? "#16a34a" : "#d97706", dashed: true });
    }
    return ms;
  }, [absorbing, phaseTopPi]);

  // ── D. sech envelope whose area equals theta_infinity (Eq. 46 when 2pi) ───
  // E(t) ~ (theta_inf / (pi*tau_p)) sech(t/tau_p); the integral of sech over
  // all t is pi, so the area = (wp/hbar) * integral E dt = theta_inf by design.
  const sech = useMemo<Series[]>(() => {
    const tp = 1; // tau_p (display units)
    const N = 240;
    const x: number[] = [];
    const y: number[] = [];
    const amp = Math.abs(thetaInf) / (PI * tp); // peak Rabi freq wp E0 / hbar
    for (let i = 0; i <= N; i++) {
      const t = -6 + (12 * i) / N;
      x.push(t);
      y.push(amp / Math.cosh(t / tp));
    }
    return [{ x, y, color: "#9333ea", width: 2.6, fill: true, label: "sech envelope" }];
  }, [thetaInf]);
  const sechHi = Math.abs(thetaInf) / PI + 0.4;

  // ── A. animated canvas: area marching along z + Bloch tipping arrow ────────
  const draw = ({ ctx, w, h, t }: { ctx: CanvasRenderingContext2D; w: number; h: number; t: number }) => {
    ctx.clearRect(0, 0, w, h);

    // map sim time -> propagation distance z that sweeps 0..L and holds.
    const z = Math.min(L, (t * L) / 6); // ~6 s to traverse the medium
    const thZ = thetaClosed(theta0, z);

    // ---- left: Bloch unit circle with the tipping arrow ----
    const cx = w * 0.22;
    const cy = h * 0.5;
    const R = Math.min(w, h) * 0.34;
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 2 * PI);
    ctx.stroke();
    // ground state pole (south), excited pole (north)
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("excited", cx, cy - R - 8);
    ctx.fillText("ground", cx, cy + R + 16);
    // the Bloch vector tipped by the running area: theta=0 -> south (ground),
    // theta=pi -> north (excited), theta=2pi -> back to south (ground).
    const ang = PI / 2 - thZ;
    const vx = cx + R * Math.cos(ang);
    const vy = cy + R * Math.sin(ang);
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(vx, vy);
    ctx.stroke();
    ctx.fillStyle = "#4f46e5";
    ctx.beginPath();
    ctx.arc(vx, vy, 5, 0, 2 * PI);
    ctx.fill();
    ctx.fillStyle = "#1b2330";
    ctx.font = "600 13px ui-sans-serif, system-ui";
    ctx.fillText(`θ = ${(thZ / PI).toFixed(2)}π`, cx, cy + R + 34);

    // ---- right: distance track + verdict panel ----
    const tx = w * 0.46;
    const trackW = w - tx - 24;
    const trackY = h * 0.34;
    // z axis
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(tx, trackY);
    ctx.lineTo(tx + trackW, trackY);
    ctx.stroke();
    // progress marker
    const px = tx + trackW * (z / L);
    ctx.fillStyle = "#4f46e5";
    ctx.beginPath();
    ctx.arc(px, trackY, 5, 0, 2 * PI);
    ctx.fill();
    ctx.fillStyle = "#5b6473";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("z = 0", tx, trackY + 18);
    ctx.textAlign = "right";
    ctx.fillText(`z = L (${L.toFixed(0)})`, tx + trackW, trackY + 18);

    // verdict text
    ctx.textAlign = "left";
    let sy = h * 0.52;
    ctx.font = "600 16px ui-sans-serif, system-ui";
    ctx.fillStyle = absorbing ? "#0891b2" : "#d97706";
    ctx.fillText(absorbing ? "ABSORBING medium (a < 0)" : "AMPLIFYING medium (a > 0)", tx, sy);
    sy += 24;
    ctx.font = "13px ui-sans-serif, system-ui";
    ctx.fillStyle = "#5b6473";
    ctx.fillText(`area flows toward θ∞ = ${nInf}π`, tx, sy);
    sy += 20;
    const evenStable = absorbing ? nInf % 2 === 0 : nInf % 2 === 1;
    ctx.fillStyle = evenStable ? "#16a34a" : "#d97706";
    ctx.fillText(evenStable ? `${nInf}π is STABLE` : `${nInf}π is UNSTABLE`, tx, sy);
    sy += 22;
    if (isSIT) {
      ctx.fillStyle = "#16a34a";
      ctx.font = "600 13px ui-sans-serif, system-ui";
      ctx.fillText("2π pulse: TRANSPARENT (SIT)", tx, sy);
    } else if (absorbing && nInf === 0) {
      ctx.fillStyle = "#5b6473";
      ctx.fillText("weak pulse: absorbed (Beer's law)", tx, sy);
    }
  };

  return (
    <div>
      <Canvas width={560} height={260} draw={draw} speed={1} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Area vs distance: RK4 (solid) and exact Eq.(43) (dashed) coincide
          </div>
          <Plot
            width={300}
            height={220}
            xRange={[0, L]}
            yRange={[0, yHi]}
            xLabel="propagation distance z"
            yLabel="θ(z) / π"
            lines={traj}
            markers={trajMarkers}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Phase line: flow toward n·π attractors
          </div>
          <Plot
            width={300}
            height={220}
            xRange={[0, phaseTopPi]}
            yRange={[-phaseYabs, phaseYabs]}
            xLabel="θ / π"
            yLabel="dθ/dz"
            lines={phase}
            markers={phaseMarkers}
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
          Asymptotic sech pulse: area = θ∞ (the 2π SIT soliton when θ∞ = 2π in an absorber)
        </div>
        <Plot
          width={620}
          height={220}
          xRange={[-6, 6]}
          yRange={[0, sechHi]}
          xLabel="retarded time  (t − z/v_p) / τ_p"
          yLabel="ℰ(t)  (Rabi units)"
          lines={sech}
        />
      </div>

      <Controls>
        <Slider
          label={String.raw`\theta_0\ \text{(input area)}`}
          tex
          min={0.05}
          max={12.566}
          step={0.02}
          value={theta0}
          onChange={setTheta0}
          unit="rad"
          format={(v) => `${(v / PI).toFixed(2)}π`}
        />
        <Slider
          label={String.raw`a\ \text{(signed gain)}`}
          tex
          min={-2}
          max={2}
          step={0.05}
          value={a}
          onChange={setA}
          unit="1/length"
        />
        <Slider
          label={String.raw`L\ \text{(medium length)}`}
          tex
          min={1}
          max={20}
          step={0.5}
          value={L}
          onChange={setL}
          unit="length"
        />
        <Readout
          label={String.raw`\text{medium}`}
          tex
          value={absorbing ? "ABSORBING (a<0)" : a > 0 ? "AMPLIFYING (a>0)" : "transparent"}
        />
        <Readout label={String.raw`\theta_\infty`} tex value={`${nInf}π`} />
        <Readout
          label={String.raw`\text{fixed point}`}
          tex
          value={(absorbing ? nInf % 2 === 0 : nInf % 2 === 1) ? "STABLE" : "UNSTABLE"}
        />
        <Readout label={String.raw`\text{energy verdict}`} tex value={isSIT ? "transparent (SIT)" : "—"} />
      </Controls>
    </div>
  );
}
