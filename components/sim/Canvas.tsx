"use client";

import { useEffect, useRef } from "react";
import { useAnimationLoop } from "./useAnimationLoop";

export interface DrawEnv {
  ctx: CanvasRenderingContext2D;
  w: number; // logical width (CSS px) — draw in these coordinates
  h: number; // logical height
  t: number; // sim time (s), only advances while playing
  dt: number; // frame delta (s)
}

/**
 * A device-pixel-ratio-correct canvas. Two modes:
 *  • animate (default): runs a rAF loop, calls draw() every frame with t/dt.
 *  • static: pass animate={false} and a `redraw` dep array; it redraws only
 *    when those deps change (good for parametric plots driven by sliders).
 *
 * Draw in logical (CSS-pixel) coordinates 0..w, 0..h — the canvas handles DPR.
 */
export function Canvas({
  width,
  height,
  draw,
  animate = true,
  redraw = [],
  speed = 1,
  controls = true,
  className,
}: {
  width: number;
  height: number;
  draw: (env: DrawEnv) => void;
  animate?: boolean;
  redraw?: any[];
  speed?: number;
  controls?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);
  drawRef.current = draw;

  const setup = (): CanvasRenderingContext2D | null => {
    const cv = canvasRef.current;
    if (!cv) return null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (cv.width !== width * dpr || cv.height !== height * dpr) {
      cv.width = width * dpr;
      cv.height = height * dpr;
    }
    const ctx = cv.getContext("2d");
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  };

  const { playing, toggle, reset } = useAnimationLoop(
    (t, dt) => {
      if (!animate) return;
      const ctx = setup();
      if (ctx) drawRef.current({ ctx, w: width, h: height, t, dt });
    },
    { autostart: animate, speed }
  );

  // Static redraw on dependency change (and on mount).
  useEffect(() => {
    if (animate) return;
    const ctx = setup();
    if (ctx) drawRef.current({ ctx, w: width, h: height, t: 0, dt: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, width, height, ...redraw]);

  return (
    <div className={`sim-canvas-wrap ${className || ""}`}>
      <canvas
        ref={canvasRef}
        className="sim-canvas"
        style={{ width: "100%", maxWidth: width, height: "auto", aspectRatio: `${width} / ${height}` }}
      />
      {animate && controls ? (
        <div className="sim-canvas-controls">
          <button className="sim-btn" onClick={toggle}>
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
          <button className="sim-btn sim-btn-ghost" onClick={reset}>
            ↺ Reset
          </button>
        </div>
      ) : null}
    </div>
  );
}
