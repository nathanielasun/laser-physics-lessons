"use client";

/**
 * Chapter XI — The Ring Laser: lock-in and the gyroscope dead band.
 *
 * The relative phase Psi of the two counter-propagating waves obeys the Adler
 * equation (Eq. 21):
 *
 *     dPsi/dt = d + l sin(Psi)
 *
 * where d is the rotation-induced frequency splitting (Sagnac signal, the
 * gyroscope input) and l is the mirror-backscatter coupling that sets the
 * dead-band half-width. The equation is exactly solvable:
 *
 *   • FIXED POINTS exist iff |d| <= |l|.  The STABLE one (slope l cos Psi < 0)
 *       is  Psi_lock = pi + arcsin(d/l).   There the beat note vanishes — the
 *       LOCKED regime (gyroscope blind: the dead band).
 *   • For |d| > |l| there is no fixed point; the phase runs and the
 *       time-averaged beat note is  <dPsi/dt> = sign(d) sqrt(d^2 - l^2),
 *       with one full phase slip every  T_beat = 2 pi / sqrt(d^2 - l^2).
 *
 * Everything here rests only on Eq.(21)-(23), which are exact, so the
 * integrator (RK4) reproduces the closed-form results we overlay to validate it.
 *
 * Four linked views:
 *   A. animated phase point on the unit circle — pins when locked, crawls then
 *      jumps through the bottleneck when running (the visceral lock-in picture),
 *   B. Psi(t): flat when locked, a slip-staircase when running,
 *   C. the flow dPsi/dt vs Psi with the zero-crossing fixed points marked,
 *   D. the gyroscope transfer function <dPsi/dt> vs d (flat dead band + sqrt
 *      branches) against the dashed ideal beat = d, with a marker at current d.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series, Marker } from "@/components/sim";

export default function Ch11Sim() {
  const [d, setD] = useState(2.0); // frequency splitting (rotation signal), MHz
  const [l, setL] = useState(1.0); // backscatter coupling (dead-band half-width), MHz
  const [psi0, setPsi0] = useState(0.5); // initial relative phase, rad
  const [tMax, setTMax] = useState(20); // total integration time, scaled s
  const [showIdeal, setShowIdeal] = useState(true); // dashed ideal beat = d overlay

  // ── regime + closed-form results ─────────────────────────────────────────
  const locked = Math.abs(d) <= l && l > 0;
  const avgBeat = locked ? 0 : Math.sign(d) * Math.sqrt(d * d - l * l);
  // Stable fixed point of dPsi/dt = d + l sinPsi : slope l cosPsi < 0.
  const psiLock = l > 0 ? Math.PI + Math.asin(Math.max(-1, Math.min(1, d / l))) : NaN;
  const Tbeat = locked ? Infinity : (2 * Math.PI) / Math.sqrt(d * d - l * l);

  // ── Live animation state (O(1) per frame; advanced by the frame dt) ───────
  // We integrate the phase incrementally with a useRef rather than rebuilding
  // the whole trajectory each frame, and keep a short rolling buffer of recent
  // (time, beat) samples for the mini beat trace. Reset whenever the physics
  // or initial phase changes.
  const phaseRef = useRef(psi0);
  const beatBufRef = useRef<{ t: number; beat: number }[]>([]);
  useEffect(() => {
    phaseRef.current = psi0;
    beatBufRef.current = [];
  }, [psi0, d, l]);

  // ── RK4 integration of the Adler equation Psi(t) ─────────────────────────
  const dpsi = (p: number) => d + l * Math.sin(p);
  const rk4 = (p: number, dt: number) => {
    const k1 = dpsi(p);
    const k2 = dpsi(p + 0.5 * dt * k1);
    const k3 = dpsi(p + 0.5 * dt * k2);
    const k4 = dpsi(p + dt * k3);
    return p + (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
  };

  const traj = useMemo(() => {
    const N = 600;
    const dt = tMax / N;
    const ts: number[] = [0];
    const ps: number[] = [psi0];
    let p = psi0;
    for (let i = 1; i <= N; i++) {
      p = rk4(p, dt);
      ts.push(i * dt);
      ps.push(p);
    }
    return { ts, ps };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [d, l, psi0, tMax]);

  // ── B. Psi(t) trajectory + the locked-phase asymptote line ────────────────
  const psiMin = Math.min(...traj.ps);
  const psiMax = Math.max(...traj.ps);
  const psiLo = Math.min(psiMin, 0) - 0.4;
  const psiHi = Math.max(psiMax, psiLock || 0, 6.5) + 0.4;
  const psiSeries: Series[] = useMemo(
    () => [{ x: traj.ts, y: traj.ps, color: "#4f46e5", width: 2.5, label: "Psi(t)" }],
    [traj]
  );
  const psiMarkers: Marker[] = locked
    ? [{ y: psiLock, color: "#16a34a", label: "Psi_lock", dashed: true }]
    : [];

  // ── C. flow field  dPsi/dt = d + l sinPsi  over [0, 2pi] ─────────────────
  const flow = useMemo<Series[]>(() => {
    const N = 240;
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i <= N; i++) {
      const p = (2 * Math.PI * i) / N;
      x.push(p);
      y.push(d + l * Math.sin(p));
    }
    return [{ x, y, color: "#e11d48", width: 2.5, label: "dPsi/dt" }];
  }, [d, l]);
  const flowYabs = Math.abs(d) + l + 0.5;
  // fixed points (where the flow crosses zero) — vertical markers when locked
  const flowMarkers: Marker[] = useMemo(() => {
    const ms: Marker[] = [{ y: 0, color: "#94a3b8", dashed: false }];
    if (locked) {
      const a = Math.asin(Math.max(-1, Math.min(1, d / l)));
      const stable = ((Math.PI + a) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      const unstable = ((-a) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      ms.push({ x: stable, color: "#16a34a", label: "stable", dashed: true });
      ms.push({ x: unstable, color: "#d97706", label: "unstable", dashed: true });
    }
    return ms;
  }, [d, l, locked]);

  // ── D. gyroscope transfer function  <dPsi/dt> vs d  at the current l ──────
  const dMin = -5;
  const dMax = 5;
  const transfer = useMemo<Series[]>(() => {
    const N = 300;
    const xs: number[] = [];
    const beat: number[] = [];
    const ideal: number[] = [];
    for (let i = 0; i <= N; i++) {
      const dd = dMin + ((dMax - dMin) * i) / N;
      xs.push(dd);
      beat.push(Math.abs(dd) <= l ? 0 : Math.sign(dd) * Math.sqrt(dd * dd - l * l));
      ideal.push(dd);
    }
    const out: Series[] = [{ x: xs, y: beat, color: "#0891b2", width: 2.8, label: "beat note" }];
    if (showIdeal) out.push({ x: xs, y: ideal, color: "#94a3b8", width: 1.6, dashed: true, label: "ideal d" });
    return out;
  }, [l, showIdeal]);
  const transferMarkers: Marker[] = [
    { x: d, color: "#4f46e5", label: "current d", dashed: true },
    { x: -l, color: "#e11d48", dashed: true },
    { x: l, color: "#e11d48", label: "dead band", dashed: true },
  ];

  // ── A. animated phase point on the unit circle ────────────────────────────
  const draw = ({ ctx, w, h, t, dt }: { ctx: CanvasRenderingContext2D; w: number; h: number; t: number; dt: number }) => {
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.32;
    const cy = h * 0.5;
    const R = Math.min(w, h) * 0.34;

    // Advance the phase incrementally by the frame dt — O(1) per frame. dpsi
    // maxes at |d|+l (~10 rad/s) so a couple of RK4 substeps of dt (~16 ms) is
    // far inside the stable region. Cap dt against tab-throttling jumps.
    const step = Math.min(dt, 0.05);
    let p = phaseRef.current;
    if (step > 0) {
      const sub = 2;
      for (let i = 0; i < sub; i++) p = rk4(p, step / sub);
    }
    phaseRef.current = p;

    // push the current beat sample into the rolling buffer; drop old entries
    const span = 8; // seconds shown in the mini trace
    const buf = beatBufRef.current;
    buf.push({ t, beat: dpsi(p) });
    while (buf.length && buf[0].t < t - span) buf.shift();

    // guide circle
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 2 * Math.PI);
    ctx.stroke();

    // shade the "fast" half (|sin| pushing the phase forward) lightly — and if
    // locked, draw the stable fixed point as a green target on the circle.
    if (locked) {
      const px = cx + R * Math.cos(psiLock - Math.PI / 2);
      const py = cy + R * Math.sin(psiLock - Math.PI / 2);
      ctx.fillStyle = "rgba(22,163,74,0.18)";
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = "#16a34a";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py, 14, 0, 2 * Math.PI);
      ctx.stroke();
    }

    // the running phase point (angle measured from top, clockwise = increasing)
    const ang = p - Math.PI / 2;
    const ptx = cx + R * Math.cos(ang);
    const pty = cy + R * Math.sin(ang);
    // radial spoke
    ctx.strokeStyle = "#c7cdf5";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(ptx, pty);
    ctx.stroke();
    // glowing point, brightness tracks |dPsi/dt| (how fast it moves)
    const speed = Math.abs(dpsi(p));
    const glow = Math.min(1, speed / (Math.abs(d) + l + 0.001));
    const r = 7 + 6 * glow;
    const g = ctx.createRadialGradient(ptx, pty, 1, ptx, pty, r);
    g.addColorStop(0, `rgba(79,70,229,${0.55 + 0.4 * glow})`);
    g.addColorStop(1, "rgba(79,70,229,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(ptx, pty, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "#4f46e5";
    ctx.beginPath();
    ctx.arc(ptx, pty, 4.5, 0, 2 * Math.PI);
    ctx.fill();

    // center label
    ctx.fillStyle = "#1b2330";
    ctx.font = "600 14px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("relative phase Psi", cx, cy + R + 30);

    // status panel on the right
    const sx = w * 0.62;
    let sy = h * 0.26;
    ctx.textAlign = "left";
    ctx.font = "600 17px ui-sans-serif, system-ui";
    ctx.fillStyle = locked ? "#16a34a" : "#0891b2";
    ctx.fillText(locked ? "LOCKED" : "RUNNING", sx, sy);
    sy += 26;
    ctx.font = "13px ui-sans-serif, system-ui";
    ctx.fillStyle = "#5b6473";
    ctx.fillText(locked ? "|d| <= l : phase pins" : "|d| > l : phase advances", sx, sy);
    sy += 22;
    ctx.fillText(`beat note <Psi'> = ${avgBeat.toFixed(2)} MHz`, sx, sy);
    sy += 20;
    if (!locked) ctx.fillText(`one slip every ${Tbeat.toFixed(2)} s`, sx, sy);
    else ctx.fillText("gyroscope blind (dead band)", sx, sy);

    // mini beat trace at the bottom of the panel — shows pinning vs slipping.
    // Drawn from the rolling buffer (no per-frame re-integration).
    const traceX = sx;
    const traceY = h * 0.74;
    const traceW = w - sx - 18;
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(traceX, traceY);
    ctx.lineTo(traceX + traceW, traceY);
    ctx.stroke();
    const scale = Math.abs(d) + l + 0.001;
    ctx.strokeStyle = "#4f46e5";
    ctx.lineWidth = 2;
    ctx.beginPath();
    const t0 = t - span;
    buf.forEach((s, i) => {
      const xx = traceX + traceW * Math.min(1, Math.max(0, (s.t - t0) / span));
      const yy = traceY - (s.beat / scale) * 26;
      i === 0 ? ctx.moveTo(xx, yy) : ctx.lineTo(xx, yy);
    });
    ctx.stroke();
    ctx.fillStyle = "#5b6473";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.fillText("instantaneous beat dPsi/dt", traceX, traceY + 24);
  };

  return (
    <div>
      <Canvas width={560} height={260} draw={draw} speed={1} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Phase vs time (RK4 of the Adler equation)
          </div>
          <Plot
            width={300}
            height={220}
            xRange={[0, tMax]}
            yRange={[psiLo, psiHi]}
            xLabel="t  (scaled s)"
            yLabel="Psi  (rad)"
            lines={psiSeries}
            markers={psiMarkers}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Flow dPsi/dt vs Psi (fixed points where it crosses 0)
          </div>
          <Plot
            width={300}
            height={220}
            xRange={[0, 2 * Math.PI]}
            yRange={[-flowYabs, flowYabs]}
            xLabel="Psi  (rad)"
            yLabel="dPsi/dt"
            lines={flow}
            markers={flowMarkers}
          />
        </div>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
          Gyroscope transfer function: beat note vs splitting d (flat dead band, then sqrt rise)
        </div>
        <Plot
          width={620}
          height={240}
          xRange={[dMin, dMax]}
          yRange={[-5, 5]}
          xLabel="frequency splitting d  (rotation rate, MHz)"
          yLabel="beat note <Psi'>"
          lines={transfer}
          markers={transferMarkers}
        />
      </div>

      <Controls>
        <Slider
          label={String.raw`d\ \text{(splitting / rotation)}`}
          tex
          min={-5}
          max={5}
          step={0.05}
          value={d}
          onChange={setD}
          unit="MHz"
        />
        <Slider
          label={String.raw`l\ \text{(backscatter coupling)}`}
          tex
          min={0}
          max={5}
          step={0.05}
          value={l}
          onChange={setL}
          unit="MHz"
        />
        <Slider
          label={String.raw`\Psi_0\ \text{(initial phase)}`}
          tex
          min={0}
          max={6.2832}
          step={0.05}
          value={psi0}
          onChange={setPsi0}
          unit="rad"
        />
        <Slider
          label={String.raw`t_{\max}`}
          tex
          min={1}
          max={50}
          step={1}
          value={tMax}
          onChange={setTMax}
          unit="s"
        />
        <Toggle label="show ideal response (beat = d)" checked={showIdeal} onChange={setShowIdeal} />
        <Readout label={String.raw`\text{regime}`} tex value={locked ? "LOCKED" : "RUNNING"} />
        <Readout
          label={String.raw`\langle\dot\Psi\rangle=\operatorname{sign}(d)\sqrt{d^2-l^2}`}
          tex
          value={`${avgBeat.toFixed(3)} MHz`}
        />
        <Readout
          label={String.raw`\Psi_{\text{lock}}=\pi+\arcsin(d/l)`}
          tex
          value={locked ? `${psiLock.toFixed(3)} rad` : "—"}
        />
        <Readout
          label={String.raw`T_{\text{beat}}=2\pi/\sqrt{d^2-l^2}`}
          tex
          value={locked ? "∞ (locked)" : `${Tbeat.toFixed(3)} s`}
        />
        <Readout label={String.raw`|d|/l`} tex value={l > 0 ? (Math.abs(d) / l).toFixed(3) : "∞"} />
      </Controls>
    </div>
  );
}
