"use client";

import { useEffect, useRef } from "react";

export interface Series {
  // Either parallel arrays or [x,y] pairs.
  x?: number[];
  y?: number[];
  data?: [number, number][];
  color?: string;
  width?: number;
  dashed?: boolean;
  label?: string;
  fill?: boolean; // fill to baseline (y = yRange[0])
}

export interface Marker {
  x?: number; // vertical rule
  y?: number; // horizontal rule
  color?: string;
  label?: string;
  dashed?: boolean;
}

const DEFAULT_COLORS = ["#4f46e5", "#e11d48", "#0891b2", "#d97706", "#16a34a", "#9333ea"];

function asPairs(s: Series): [number, number][] {
  if (s.data) return s.data;
  const x = s.x || [];
  const y = s.y || [];
  const n = Math.min(x.length, y.length);
  const out: [number, number][] = [];
  for (let i = 0; i < n; i++) out.push([x[i], y[i]]);
  return out;
}

function ticks(min: number, max: number, count = 5): number[] {
  if (!isFinite(min) || !isFinite(max) || min === max) return [min];
  const span = max - min;
  const raw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  const out: number[] = [];
  for (let v = Math.ceil(min / step) * step; v <= max + 1e-9; v += step) out.push(Math.round(v / step) * step);
  return out;
}

const fmt = (v: number) => {
  if (v === 0) return "0";
  const a = Math.abs(v);
  if (a >= 1e4 || a < 1e-3) return v.toExponential(1);
  return Number(v.toFixed(a < 1 ? 2 : a < 10 ? 2 : 1)).toString();
};

/**
 * A self-contained line plot on a canvas. Redraws on every render (cheap), so
 * just feed it new `lines` when a slider changes.
 *
 *   <Plot width={560} height={320}
 *         xRange={[0, 10]} yRange={[0, 1]}
 *         xLabel="t" yLabel="P_excited"
 *         lines={[{ x: ts, y: ps, label: "P(t)" }]}
 *         markers={[{ y: 0.5, label: "½", dashed: true }]} />
 */
export function Plot({
  width,
  height,
  xRange,
  yRange,
  lines,
  markers = [],
  xLabel,
  yLabel,
  grid = true,
  pad = { l: 52, r: 16, t: 14, b: 40 },
}: {
  width: number;
  height: number;
  xRange: [number, number];
  yRange: [number, number];
  lines: Series[];
  markers?: Marker[];
  xLabel?: string;
  yLabel?: string;
  grid?: boolean;
  pad?: { l: number; r: number; t: number; b: number };
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = width * dpr;
    cv.height = height * dpr;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const [x0, x1] = xRange;
    const [y0, y1] = yRange;
    const W = width - pad.l - pad.r;
    const H = height - pad.t - pad.b;
    const sx = (x: number) => pad.l + ((x - x0) / (x1 - x0)) * W;
    const sy = (y: number) => pad.t + (1 - (y - y0) / (y1 - y0)) * H;

    // grid + ticks
    ctx.font = "11px ui-sans-serif, system-ui, sans-serif";
    ctx.textBaseline = "middle";
    const xt = ticks(x0, x1);
    const yt = ticks(y0, y1);
    ctx.lineWidth = 1;
    if (grid) {
      ctx.strokeStyle = "#eceef3";
      xt.forEach((x) => { ctx.beginPath(); ctx.moveTo(sx(x), pad.t); ctx.lineTo(sx(x), pad.t + H); ctx.stroke(); });
      yt.forEach((y) => { ctx.beginPath(); ctx.moveTo(pad.l, sy(y)); ctx.lineTo(pad.l + W, sy(y)); ctx.stroke(); });
    }

    // axes
    ctx.strokeStyle = "#9aa3b2";
    ctx.beginPath();
    ctx.moveTo(pad.l, pad.t); ctx.lineTo(pad.l, pad.t + H); ctx.lineTo(pad.l + W, pad.t + H);
    ctx.stroke();

    // tick labels
    ctx.fillStyle = "#5b6473";
    ctx.textAlign = "center";
    xt.forEach((x) => ctx.fillText(fmt(x), sx(x), pad.t + H + 14));
    ctx.textAlign = "right";
    yt.forEach((y) => ctx.fillText(fmt(y), pad.l - 8, sy(y)));

    // axis labels
    ctx.fillStyle = "#1f2733";
    ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
    if (xLabel) { ctx.textAlign = "center"; ctx.fillText(xLabel, pad.l + W / 2, height - 6); }
    if (yLabel) {
      ctx.save();
      ctx.translate(12, pad.t + H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillText(yLabel, 0, 0);
      ctx.restore();
    }

    // clip to plot area
    ctx.save();
    ctx.beginPath();
    ctx.rect(pad.l, pad.t, W, H);
    ctx.clip();

    // markers
    markers.forEach((m, i) => {
      ctx.strokeStyle = m.color || "#94a3b8";
      ctx.setLineDash(m.dashed === false ? [] : [4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (m.x != null) { ctx.moveTo(sx(m.x), pad.t); ctx.lineTo(sx(m.x), pad.t + H); }
      if (m.y != null) { ctx.moveTo(pad.l, sy(m.y)); ctx.lineTo(pad.l + W, sy(m.y)); }
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // series
    lines.forEach((s, i) => {
      const pts = asPairs(s);
      if (!pts.length) return;
      const color = s.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
      if (s.fill) {
        ctx.fillStyle = color + "22";
        ctx.beginPath();
        ctx.moveTo(sx(pts[0][0]), sy(y0));
        pts.forEach((p) => ctx.lineTo(sx(p[0]), sy(p[1])));
        ctx.lineTo(sx(pts[pts.length - 1][0]), sy(y0));
        ctx.closePath();
        ctx.fill();
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = s.width || 2;
      ctx.setLineDash(s.dashed ? [6, 5] : []);
      ctx.beginPath();
      pts.forEach((p, k) => (k ? ctx.lineTo(sx(p[0]), sy(p[1])) : ctx.moveTo(sx(p[0]), sy(p[1]))));
      ctx.stroke();
      ctx.setLineDash([]);
    });
    ctx.restore();

    // legend
    const labeled = lines.filter((s) => s.label);
    if (labeled.length) {
      ctx.font = "11px ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      let ly = pad.t + 6;
      labeled.forEach((s, i) => {
        const color = s.color || DEFAULT_COLORS[lines.indexOf(s) % DEFAULT_COLORS.length];
        const lx = pad.l + W - 120;
        ctx.fillStyle = "#ffffffcc";
        ctx.fillRect(lx - 4, ly - 7, 124, 16);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + 18, ly); ctx.stroke();
        ctx.fillStyle = "#1f2733";
        ctx.fillText(s.label!, lx + 24, ly);
        ly += 16;
      });
    }
  });

  return (
    <canvas
      ref={ref}
      className="sim-plot"
      style={{ width: "100%", maxWidth: width, height: "auto", aspectRatio: `${width} / ${height}` }}
    />
  );
}
