"use client";

/**
 * Chapter IX — Two-mode mode competition (phase-plane integrator).
 *
 * Integrate the chapter's own two-mode intensity equations, Eqs. (24)-(25):
 *   dI1/dt = 2 I1 (alpha1 - beta1 I1 - theta12 I2)
 *   dI2/dt = 2 I2 (alpha2 - beta2 I2 - theta21 I1)
 * with RK4 (small fixed step). The coupling constant
 *   C = theta12 theta21 / (beta1 beta2)        (Eq. 37)
 * classifies the outcome: C<1 weak coupling (both modes coexist, stable node);
 * C=1 neutral; C>1 strong coupling (bistable, winner-take-all).
 *
 * Three linked views:
 *   A. the I1-I2 phase plane (animated): the two gain nullclines L_a, L_b
 *      (Eqs. 33-34), all four fixed points colored by stability (filled=stable,
 *      open=unstable/saddle), a light vector field of (dot I1, dot I2), and the
 *      RK4 trajectory revealed up to the running sim-time.
 *   B. I1(t), I2(t) time series (static Plot) — watch one mode quench the other
 *      (strong coupling) or both level off (weak coupling).
 *   C. live readouts: C, regime label, steady-state intensities (Eqs. 35-36,
 *      flagged unphysical when negative), the converged fixed point, and the
 *      stability eigenvalues of the coexistence point.
 *
 * Everything but the revealed trajectory is computed analytically. The
 * coefficients are the book's reduced/dimensionless coefficients (Table 9-1),
 * so they enter the equations directly as scaled numbers.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series } from "@/components/sim";

// ── numerics ────────────────────────────────────────────────────────────────
const DT = 0.01; // integration step (scaled time units)
const NSTEP = 2400; // total steps integrated (~24 time units)

type P = {
  a1: number;
  a2: number;
  b1: number;
  b2: number;
  t12: number;
  t21: number;
};

const deriv = (I1: number, I2: number, p: P): [number, number] => [
  2 * I1 * (p.a1 - p.b1 * I1 - p.t12 * I2),
  2 * I2 * (p.a2 - p.b2 * I2 - p.t21 * I1),
];

function rk4(I10: number, I20: number, p: P) {
  const xs: number[] = [I10];
  const ys: number[] = [I20];
  const ts: number[] = [0];
  let x = I10;
  let y = I20;
  for (let i = 0; i < NSTEP; i++) {
    const [k1x, k1y] = deriv(x, y, p);
    const [k2x, k2y] = deriv(x + 0.5 * DT * k1x, y + 0.5 * DT * k1y, p);
    const [k3x, k3y] = deriv(x + 0.5 * DT * k2x, y + 0.5 * DT * k2y, p);
    const [k4x, k4y] = deriv(x + DT * k3x, y + DT * k3y, p);
    x += (DT / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    y += (DT / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (!isFinite(x) || !isFinite(y) || x > 50 || y > 50) {
      x = Math.min(x, 50);
      y = Math.min(y, 50);
    }
    xs.push(x);
    ys.push(y);
    ts.push((i + 1) * DT);
  }
  return { xs, ys, ts };
}

// 2x2 Jacobian of (dot I1, dot I2) at (I1, I2), eigenvalues of it.
function jacEig(I1: number, I2: number, p: P): [number, number] {
  // d(dot I1)/dI1 = 2(a1 - 2 b1 I1 - t12 I2);  d(dot I1)/dI2 = -2 t12 I1
  // d(dot I2)/dI1 = -2 t21 I2;                 d(dot I2)/dI2 = 2(a2 - 2 b2 I2 - t21 I1)
  const J11 = 2 * (p.a1 - 2 * p.b1 * I1 - p.t12 * I2);
  const J12 = -2 * p.t12 * I1;
  const J21 = -2 * p.t21 * I2;
  const J22 = 2 * (p.a2 - 2 * p.b2 * I2 - p.t21 * I1);
  const tr = J11 + J22;
  const det = J11 * J22 - J12 * J21;
  const disc = tr * tr - 4 * det;
  if (disc >= 0) {
    const s = Math.sqrt(disc);
    return [(tr + s) / 2, (tr - s) / 2];
  }
  // complex pair: return the real part twice (sign is what we color by)
  return [tr / 2, tr / 2];
}

export default function Ch09Sim() {
  const [a1, setA1] = useState(1.0);
  const [a2, setA2] = useState(1.0);
  const [b1, setB1] = useState(1.0);
  const [b2, setB2] = useState(1.0);
  const [t12, setT12] = useState(0.5);
  const [t21, setT21] = useState(0.5);
  const [I10, setI10] = useState(0.1);
  const [I20, setI20] = useState(0.15);
  const [showField, setShowField] = useState(true);

  const p: P = { a1, a2, b1, b2, t12, t21 };

  // coupling constant C (Eq. 37) and steady states (Eqs. 35-36)
  const C = (t12 * t21) / (b1 * b2);
  const r1 = a1 / b1; // alpha1/beta1
  const r2 = a2 / b2; // alpha2/beta2
  const denom = 1 - C;
  const I1s = (r1 - (t12 / b1) * r2) / denom; // Eq. 35
  const I2s = (r2 - (t21 / b2) * r1) / denom; // Eq. 36
  const coexistOK = I1s > 1e-6 && I2s > 1e-6 && isFinite(I1s) && isFinite(I2s);

  // single-mode fixed points on the axes (need positive gain to exist)
  const fpMode1 = a1 > 0 ? a1 / b1 : 0; // (I1, 0)
  const fpMode2 = a2 > 0 ? a2 / b2 : 0; // (0, I2)

  // regime label
  const regime =
    Math.abs(C - 1) < 0.02
      ? "neutral coupling (C ≈ 1)"
      : C < 1
      ? "weak coupling (C<1): both modes coexist"
      : "strong coupling (C>1): bistable, one mode wins";

  // stability eigenvalues of the coexistence point
  const coexEig = useMemo(
    () => (coexistOK ? jacEig(I1s, I2s, p) : null),
    [I1s, I2s, a1, a2, b1, b2, t12, t21, coexistOK]
  );

  // integrate trajectory
  const traj = useMemo(() => rk4(I10, I20, p), [I10, I20, a1, a2, b1, b2, t12, t21]);

  // which fixed point did we converge to?
  const last = { x: traj.xs[traj.xs.length - 1], y: traj.ys[traj.ys.length - 1] };
  const converged =
    last.x < 1e-2 && last.y < 1e-2
      ? "origin (both off)"
      : last.x > 1e-2 && last.y > 1e-2
      ? "coexistence (both on)"
      : last.x > 1e-2
      ? "mode 1 only"
      : "mode 2 only";

  // plot axis scale: a touch above the largest fixed point / initial value
  const axMax = useMemo(() => {
    const cands = [fpMode1, fpMode2, coexistOK ? I1s : 0, coexistOK ? I2s : 0, I10, I20, 0.5];
    return Math.max(...cands.filter((c) => isFinite(c) && c > 0)) * 1.25 + 0.1;
  }, [fpMode1, fpMode2, I1s, I2s, I10, I20, coexistOK]);

  // ── B. time series (static Plot) ──────────────────────────────────────────
  const tEnd = NSTEP * DT;
  const series = useMemo<Series[]>(() => {
    const stride = 4;
    const x1: number[] = [];
    const y1: number[] = [];
    const y2: number[] = [];
    for (let i = 0; i < traj.ts.length; i += stride) {
      x1.push(traj.ts[i]);
      y1.push(traj.xs[i]);
      y2.push(traj.ys[i]);
    }
    return [
      { x: x1, y: y1, color: "#4f46e5", width: 2.5, label: "I₁(t)" },
      { x: x1, y: y2, color: "#e11d48", width: 2.5, label: "I₂(t)" },
    ];
  }, [traj]);

  // ── A. animated phase plane ───────────────────────────────────────────────
  const REVEAL = 1.6; // how fast (in sim-time units per real second) the trajectory reveals

  const draw = ({ ctx, w, h, t }: any) => {
    ctx.clearRect(0, 0, w, h);
    const padL = 44;
    const padB = 34;
    const padT = 12;
    const padR = 12;
    const X = (I: number) => padL + (I / axMax) * (w - padL - padR);
    const Y = (I: number) => h - padB - (I / axMax) * (h - padT - padB);

    // axes
    ctx.strokeStyle = "#9aa3b2";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, h - padB);
    ctx.lineTo(w - padR, h - padB);
    ctx.stroke();
    ctx.fillStyle = "#1f2733";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("I₁", (padL + w - padR) / 2, h - 6);
    ctx.save();
    ctx.translate(12, (padT + h - padB) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("I₂", 0, 0);
    ctx.restore();

    // vector field (light arrows of normalized (dot I1, dot I2))
    if (showField) {
      const NG = 11;
      ctx.strokeStyle = "#cbd5e1";
      ctx.fillStyle = "#cbd5e1";
      ctx.lineWidth = 1;
      for (let gi = 1; gi <= NG; gi++) {
        for (let gj = 1; gj <= NG; gj++) {
          const i1 = (gi / (NG + 1)) * axMax;
          const i2 = (gj / (NG + 1)) * axMax;
          const [d1, d2] = deriv(i1, i2, p);
          const mag = Math.hypot(d1, d2) || 1;
          const len = 9;
          const ux = (d1 / mag) * len;
          const uy = (d2 / mag) * len;
          const x0 = X(i1);
          const y0 = Y(i2);
          const x1 = x0 + ux;
          const y1 = y0 - uy;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.stroke();
          // arrowhead
          const ang = Math.atan2(-uy, ux);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 - 3 * Math.cos(ang - 0.4), y1 - 3 * Math.sin(ang - 0.4));
          ctx.lineTo(x1 - 3 * Math.cos(ang + 0.4), y1 - 3 * Math.sin(ang + 0.4));
          ctx.closePath();
          ctx.fill();
        }
      }
    }

    // nullclines: L_a: beta1 I1 + theta12 I2 = alpha1  (mode-1 gain = 0)
    //             L_b: beta2 I2 + theta21 I1 = alpha2  (mode-2 gain = 0)
    const drawLine = (
      coefI1: number,
      coefI2: number,
      rhs: number,
      color: string,
      label: string
    ) => {
      // find two points where the line crosses the visible box edges
      const pts: [number, number][] = [];
      // intersection with I1=0 -> I2 = rhs/coefI2
      if (coefI2 !== 0) {
        const i2 = rhs / coefI2;
        if (i2 >= 0 && i2 <= axMax) pts.push([0, i2]);
      }
      // intersection with I2=0 -> I1 = rhs/coefI1
      if (coefI1 !== 0) {
        const i1 = rhs / coefI1;
        if (i1 >= 0 && i1 <= axMax) pts.push([i1, 0]);
      }
      // intersection with I1=axMax
      if (coefI2 !== 0) {
        const i2 = (rhs - coefI1 * axMax) / coefI2;
        if (i2 >= 0 && i2 <= axMax) pts.push([axMax, i2]);
      }
      // intersection with I2=axMax
      if (coefI1 !== 0) {
        const i1 = (rhs - coefI2 * axMax) / coefI1;
        if (i1 >= 0 && i1 <= axMax) pts.push([i1, axMax]);
      }
      if (pts.length >= 2) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([7, 4]);
        ctx.beginPath();
        ctx.moveTo(X(pts[0][0]), Y(pts[0][1]));
        ctx.lineTo(X(pts[1][0]), Y(pts[1][1]));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = color;
        ctx.font = "11px ui-sans-serif, system-ui";
        ctx.textAlign = "left";
        ctx.fillText(label, X(pts[1][0]) + 3, Y(pts[1][1]) - 3);
      }
    };
    if (a1 > 0) drawLine(b1, t12, a1, "#6366f1", "Lₐ");
    if (a2 > 0) drawLine(t21, b2, a2, "#f43f5e", "L_b");

    // fixed points colored by stability
    const dot = (i1: number, i2: number) => {
      const [e1, e2] = jacEig(i1, i2, p);
      const stable = e1 < 1e-9 && e2 < 1e-9;
      const x0 = X(i1);
      const y0 = Y(i2);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#0f172a";
      ctx.beginPath();
      ctx.arc(x0, y0, 5.5, 0, 2 * Math.PI);
      if (stable) {
        ctx.fillStyle = "#0f172a";
        ctx.fill();
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.stroke();
      }
    };
    dot(0, 0);
    if (a1 > 0) dot(fpMode1, 0);
    if (a2 > 0) dot(0, fpMode2);
    if (coexistOK) dot(I1s, I2s);

    // revealed trajectory
    const idx = Math.min(traj.xs.length - 1, Math.max(1, Math.floor((t * REVEAL) / DT)));
    ctx.strokeStyle = "#0891b2";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(X(traj.xs[0]), Y(traj.ys[0]));
    for (let i = 1; i <= idx; i++) ctx.lineTo(X(traj.xs[i]), Y(traj.ys[i]));
    ctx.stroke();

    // moving head
    const hx = X(traj.xs[idx]);
    const hy = Y(traj.ys[idx]);
    const g = ctx.createRadialGradient(hx, hy, 1, hx, hy, 9);
    g.addColorStop(0, "rgba(8,145,178,0.95)");
    g.addColorStop(1, "rgba(8,145,178,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(hx, hy, 9, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#0891b2";
    ctx.beginPath();
    ctx.arc(hx, hy, 3.5, 0, 2 * Math.PI);
    ctx.fill();

    // start marker
    ctx.fillStyle = "#16a34a";
    ctx.beginPath();
    ctx.arc(X(traj.xs[0]), Y(traj.ys[0]), 3, 0, 2 * Math.PI);
    ctx.fill();
  };

  const eigTxt = coexEig
    ? `${coexEig[0].toFixed(2)}, ${coexEig[1].toFixed(2)}  (${
        coexEig[0] < 0 && coexEig[1] < 0 ? "stable node" : "saddle ⇒ bistable"
      })`
    : "—";

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Phase plane (I₁, I₂): nullclines, fixed points, flow
          </div>
          <Canvas width={320} height={300} draw={draw} speed={1} />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Intensities vs. time
          </div>
          <Plot
            width={320}
            height={300}
            xRange={[0, tEnd]}
            yRange={[0, axMax]}
            xLabel="t (scaled)"
            yLabel="Iₙ"
            lines={series}
          />
        </div>
      </div>

      <Controls>
        <Slider label={String.raw`\alpha_1`} tex min={-0.5} max={2} step={0.05} value={a1} onChange={setA1} />
        <Slider label={String.raw`\alpha_2`} tex min={-0.5} max={2} step={0.05} value={a2} onChange={setA2} />
        <Slider label={String.raw`\beta_1`} tex min={0.2} max={2} step={0.05} value={b1} onChange={setB1} />
        <Slider label={String.raw`\beta_2`} tex min={0.2} max={2} step={0.05} value={b2} onChange={setB2} />
        <Slider label={String.raw`\theta_{12}`} tex min={0} max={3} step={0.05} value={t12} onChange={setT12} />
        <Slider label={String.raw`\theta_{21}`} tex min={0} max={3} step={0.05} value={t21} onChange={setT21} />
        <Slider label={String.raw`I_1(0)`} tex min={0} max={2} step={0.05} value={I10} onChange={setI10} />
        <Slider label={String.raw`I_2(0)`} tex min={0} max={2} step={0.05} value={I20} onChange={setI20} />
        <Toggle label="vector field" checked={showField} onChange={setShowField} />
        <Readout
          label={String.raw`C=\theta_{12}\theta_{21}/(\beta_1\beta_2)`}
          tex
          value={isFinite(C) ? C.toFixed(2) : "—"}
        />
        <Readout label="regime" value={regime} />
        <Readout
          label={String.raw`I_1^{(s)},\,I_2^{(s)}`}
          tex
          value={coexistOK ? `${I1s.toFixed(2)}, ${I2s.toFixed(2)}` : `${I1s.toFixed(2)}, ${I2s.toFixed(2)} (unphysical)`}
        />
        <Readout label="converges to" value={converged} />
        <Readout label={String.raw`\lambda_{1,2}\ \text{(coexistence)}`} tex value={eigTxt} />
      </Controls>
    </div>
  );
}
