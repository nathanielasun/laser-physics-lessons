"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A requestAnimationFrame loop with play/pause. The callback receives the
 * elapsed simulation time `t` (seconds, accumulated only while playing) and the
 * per-frame delta `dt` (seconds, clamped so a backgrounded tab can't jump).
 *
 *   const { playing, toggle, reset } = useAnimationLoop((t, dt) => { ... });
 *
 * `callback` is kept in a ref, so you can close over changing state/props
 * without restarting the loop.
 */
export function useAnimationLoop(
  callback: (t: number, dt: number) => void,
  opts: { autostart?: boolean; speed?: number } = {}
) {
  const { autostart = true, speed = 1 } = opts;
  const cbRef = useRef(callback);
  cbRef.current = callback;

  const [playing, setPlaying] = useState(autostart);
  const tRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      lastRef.current = null;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      return;
    }
    const frame = (now: number) => {
      if (lastRef.current == null) lastRef.current = now;
      let dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      dt = Math.min(dt, 0.05) * speed; // clamp big gaps (tab switches)
      tRef.current += dt;
      cbRef.current(tRef.current, dt);
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, speed]);

  const reset = () => {
    tRef.current = 0;
    lastRef.current = null;
  };

  return {
    playing,
    setPlaying,
    toggle: () => setPlaying((p) => !p),
    reset,
    time: () => tRef.current,
  };
}
