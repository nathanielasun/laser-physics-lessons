"use client";

/**
 * Chapter XIV — Quantized Rabi flopping vs. Weisskopf–Wigner decay.
 *
 * The chapter's two faces of spontaneous emission, side by side:
 *
 *   SINGLE MODE (reversible Rabi flopping, Eqs. 82–85, exact resonant JC).
 *     An excited atom coupled to ONE mode that already holds n photons
 *     oscillates between |a,n⟩ and |b,n+1⟩ at the quantized Rabi frequency
 *
 *         Ω_Rabi = 2 g √(n+1).
 *
 *     With the emission initial condition C_{a,n}(0)=1, C_{b,n+1}(0)=0,
 *
 *         C_{a,n}(t)   =  cos(g√(n+1) t),     P_upper = cos²(g√(n+1) t)
 *         C_{b,n+1}(t) = -i sin(g√(n+1) t),   P_lower = sin²(g√(n+1) t).
 *
 *     The "+1" survives at n=0: with NO photons the atom still flops at 2g.
 *     This is the vacuum Rabi flop — the quantum birth of spontaneous emission.
 *
 *   CONTINUUM (irreversible Weisskopf–Wigner decay, Eq. 104).
 *     Coupling the same excited atom to ALL field modes turns the reversible
 *     oscillation into pure exponential decay
 *
 *         |C_{a,0}(t)|² = e^{−γ_a t},   lifetime τ = 1/γ_a.
 *
 *     We overlay this dashed envelope on the single-mode curve to make the
 *     reversible→irreversible contrast literal. (Per the book, the continuum
 *     is solved only in the long-time limit, so we do NOT integrate a detuned
 *     JC analog for it.)
 *
 * DETUNING is treated exactly as the book does — perturbatively, Eq. 75 — as a
 * SEPARATE static lineshape readout, never wired into the dynamical curve:
 *
 *     P_upper^(1st)(t) = g²(n+1) sin²[(Ω−ω)t/2] / [(Ω−ω)/2]²   →   sinc² in detuning.
 *
 * ħ = 1; g and γ_a are in arbitrary rad/s. The single-mode curves are EXACT
 * closed forms; an RK4 integration of ċ_a = −ig√(n+1) c_b, ċ_b = −ig√(n+1) c_a
 * reproduces them and is run live so the dynamics are honest, not just plotted.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Segmented, Controls, Readout, Series } from "@/components/sim";

const TWO_PI = 2 * Math.PI;

type Mode = "single" | "continuum";

export default function Ch14Sim() {
  const [n, setN] = useState(0); // photons initially in the mode
  const [g, setG] = useState(1.0); // atom–field coupling (rad/s, arb.)
  const [gamma, setGamma] = useState(1.0); // WW spontaneous decay rate (1/s, arb.)
  const [mode, setMode] = useState<Mode>("single");
  const [det, setDet] = useState(0.0); // detuning Ω−ω for the static lineshape (rad/s)
  const [tLine, setTLine] = useState(3.0); // interaction time in the lineshape readout

  const rabi = 2 * g * Math.sqrt(n + 1); // Ω_Rabi = 2 g √(n+1)
  const flopFreq = g * Math.sqrt(n + 1); // argument frequency g√(n+1)
  const rabiPeriod = TWO_PI / rabi; // T = 2π / Ω_Rabi
  const tau = 1 / gamma; // WW lifetime τ = 1/γ_a

  // Adaptive time window: a few Rabi periods for single mode, a few lifetimes
  // for continuum — so neither view is flat nor a solid blur.
  const T =
    mode === "single"
      ? Math.min(3 * rabiPeriod, 30)
      : Math.min(5 * tau, 30);

  // ── Live RK4 integration of the resonant JC two-state problem ───────────────
  // c_a, c_b are complex (re, im). With emission IC c_a=1, c_b=0 the exact
  // solution is c_a=cos(Ω₀t), c_b=-i sin(Ω₀t) with Ω₀ = g√(n+1); RK4 reproduces it.
  const sim = useMemo(() => {
    const w0 = flopFreq; // g√(n+1)
    const NOUT = 600;
    const dtOut = T / NOUT;
    const sub = 6;
    const h = dtOut / sub;

    // state = [Re c_a, Im c_a, Re c_b, Im c_b]
    // ċ_a = −i w0 c_b ,  ċ_b = −i w0 c_a
    const f = (s: number[]): number[] => {
      const [ar, ai, br, bi] = s;
      // −i w0 c_b = −i w0 (br + i bi) = w0 bi − i w0 br
      // −i w0 c_a = w0 ai − i w0 ar
      return [w0 * bi, -w0 * br, w0 * ai, -w0 * ar];
    };
    const add = (a: number[], b: number[], k: number) =>
      a.map((v, i) => v + k * b[i]);

    const ts = new Array<number>(NOUT + 1);
    const pUp = new Array<number>(NOUT + 1); // |c_a|²  (numeric)
    const pLo = new Array<number>(NOUT + 1); // |c_b|²  (numeric)
    const pExact = new Array<number>(NOUT + 1); // cos²(w0 t) closed form
    const pWW = new Array<number>(NOUT + 1); // e^{−γ_a t} continuum overlay

    let s = [1, 0, 0, 0]; // emission IC: atom excited, mode unchanged
    let t = 0;
    for (let i = 0; i <= NOUT; i++) {
      ts[i] = t;
      pUp[i] = s[0] * s[0] + s[1] * s[1];
      pLo[i] = s[2] * s[2] + s[3] * s[3];
      pExact[i] = Math.cos(w0 * t) ** 2;
      pWW[i] = Math.exp(-gamma * t);
      for (let k = 0; k < sub && i < NOUT; k++) {
        const k1 = f(s);
        const k2 = f(add(s, k1, 0.5 * h));
        const k3 = f(add(s, k2, 0.5 * h));
        const k4 = f(add(s, k3, h));
        s = s.map((v, j) => v + (h / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
        t += h;
      }
    }
    return { ts, pUp, pLo, pExact, pWW, NOUT, dtOut, T };
  }, [flopFreq, gamma, T, n]);

  // ── Top panel: P_upper / P_lower vs time, with optional WW dashed envelope ──
  const lines = useMemo<Series[]>(() => {
    const up: [number, number][] = [];
    const lo: [number, number][] = [];
    const ww: [number, number][] = [];
    for (let i = 0; i <= sim.NOUT; i += 2) {
      up.push([sim.ts[i], sim.pUp[i]]);
      lo.push([sim.ts[i], sim.pLo[i]]);
      ww.push([sim.ts[i], sim.pWW[i]]);
    }
    const continuum = mode === "continuum";
    const out: Series[] = [
      {
        data: up,
        color: continuum ? "#f6a8be" : "#e11d48",
        width: continuum ? 1.6 : 2.6,
        label: continuum ? "single-mode reference (reversible)" : "P_upper = cos²",
      },
      {
        data: lo,
        color: continuum ? "#a5d8e6" : "#0891b2",
        width: continuum ? 1.4 : 2,
        label: continuum ? "single-mode lower (reference)" : "P_lower = sin²",
      },
    ];
    if (continuum) {
      out.push({ data: ww, color: "#7c3aed", width: 2.6, dashed: true, label: "P_upper (continuum) = e^{−γ_a t}" });
    }
    return out;
  }, [sim, mode]);

  // ── Detuning lineshape (Eq. 75): sinc² in (Ω−ω), peak g²(n+1)t², narrows ∝1/t
  const lineShape = useMemo<Series[]>(() => {
    const N = 260;
    const xs: number[] = [];
    const ys: number[] = [];
    const pref = g * g * (n + 1);
    for (let i = 0; i <= N; i++) {
      const d = -12 + (24 * i) / N; // Ω−ω
      xs.push(d);
      if (Math.abs(d) < 1e-9) {
        ys.push(pref * tLine * tLine); // limit: g²(n+1) t²
      } else {
        const s = Math.sin((d * tLine) / 2) / (d / 2);
        ys.push(pref * s * s);
      }
    }
    return [{ x: xs, y: ys, color: "#d97706", width: 2.4, label: "lineshape, arb. (Eq.75)", fill: true }];
  }, [g, n, tLine]);
  // headline value of the detuned first-order probability at the chosen detuning
  const lineMax = g * g * (n + 1) * tLine * tLine; // peak (Ω−ω → 0): g²(n+1)t²
  // value of Eq.75 AT the detuning marker, so dragging `det` reads off the sinc²
  const lineAtDet =
    Math.abs(det) < 1e-9
      ? lineMax
      : g * g * (n + 1) * (Math.sin((det * tLine) / 2) / (det / 2)) ** 2;

  // ── Animated atom + photon ledger ──────────────────────────────────────────
  const draw = ({ ctx, w, h, t }: { ctx: CanvasRenderingContext2D; w: number; h: number; t: number }) => {
    ctx.clearRect(0, 0, w, h);

    // sweep time: in single mode loop over a few periods; in continuum, a few τ.
    const sweep = mode === "single" ? (t * (sim.T / 4)) % sim.T : (t * (sim.T / 4)) % sim.T;
    const idx = Math.min(sim.NOUT, Math.max(0, Math.round((sweep / sim.T) * sim.NOUT)));
    const pUp = mode === "continuum" ? sim.pWW[idx] : sim.pUp[idx];
    const pLo = 1 - pUp;

    // ── left: two-level atom with population glow ──
    const ax = w * 0.26;
    const yA = h * 0.26;
    const yB = h * 0.74;

    const drawLevel = (y: number, pop: number, color: string, label: string) => {
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(ax - 70, y);
      ctx.lineTo(ax + 70, y);
      ctx.stroke();
      const r = 6 + 30 * pop;
      const rgb = color;
      const grad = ctx.createRadialGradient(ax, y, 2, ax, y, r);
      grad.addColorStop(0, rgb + Math.round(80 + 140 * pop).toString(16).padStart(2, "0"));
      grad.addColorStop(1, rgb + "00");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(ax, y, r, 0, TWO_PI);
      ctx.fill();
      ctx.fillStyle = "#1b2330";
      ctx.font = "600 13px ui-sans-serif, system-ui";
      ctx.textAlign = "left";
      ctx.fillText(label, ax + 82, y + 4);
    };
    drawLevel(yA, pUp, "#e11d48", "|a⟩  upper");
    drawLevel(yB, pLo, "#0891b2", "|b⟩  lower");

    // emission arrow when population is heading down
    ctx.strokeStyle = "rgba(124,58,237,0.55)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ax - 96, yA + 10);
    ctx.lineTo(ax - 96, yB - 10);
    ctx.stroke();
    ctx.fillStyle = "rgba(124,58,237,0.7)";
    ctx.beginPath();
    ctx.moveTo(ax - 96, yB - 6);
    ctx.lineTo(ax - 100, yB - 16);
    ctx.lineTo(ax - 92, yB - 16);
    ctx.closePath();
    ctx.fill();
    ctx.save();
    ctx.translate(ax - 108, (yA + yB) / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "#7c3aed";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("ħΩ photon", 0, 0);
    ctx.restore();

    // ── right: the field state ──
    const fx = w * 0.66;
    const fTop = h * 0.16;
    const fBot = h * 0.84;
    ctx.fillStyle = "#475569";
    ctx.font = "600 12px ui-sans-serif, system-ui";
    ctx.textAlign = "center";

    if (mode === "single") {
      // ledger of the entangled pair |a,n⟩ ↔ |b,n+1⟩
      ctx.fillText("field mode", fx, fTop - 6);
      // amplitude of |a,n⟩ (top) vs |b,n+1⟩ (bottom)
      const barW = 30;
      const barH = (fBot - fTop) * 0.42;
      // |a,n⟩
      ctx.fillStyle = "#eef2ff";
      ctx.fillRect(fx - barW / 2 - 50, fTop, barW, barH);
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(fx - barW / 2 - 50, fTop + barH * (1 - pUp), barW, barH * pUp);
      ctx.strokeStyle = "#c7cdf5";
      ctx.strokeRect(fx - barW / 2 - 50, fTop, barW, barH);
      ctx.fillStyle = "#334155";
      ctx.font = "11px ui-sans-serif, system-ui";
      ctx.fillText(`|a,${n}⟩`, fx - 50, fBot - 4);

      // |b,n+1⟩
      ctx.fillStyle = "#eef2ff";
      ctx.fillRect(fx - barW / 2 + 50, fTop, barW, barH);
      ctx.fillStyle = "#0891b2";
      ctx.fillRect(fx - barW / 2 + 50, fTop + barH * (1 - pLo), barW, barH * pLo);
      ctx.strokeStyle = "#c7cdf5";
      ctx.strokeRect(fx - barW / 2 + 50, fTop, barW, barH);
      ctx.fillStyle = "#334155";
      ctx.fillText(`|b,${n + 1}⟩`, fx + 50, fBot - 4);

      ctx.fillStyle = "#64748b";
      ctx.font = "11px ui-sans-serif, system-ui";
      ctx.fillText("energy returns ⇄ reversible", fx, fBot + 14);
    } else {
      // continuum: a fan of modes, emitted photon scatters into many of them
      ctx.fillText("continuum of modes", fx, fTop - 6);
      const cx = fx;
      const cy = (fTop + fBot) / 2;
      const nMode = 9;
      for (let k = 0; k < nMode; k++) {
        const a = -0.9 + (1.8 * k) / (nMode - 1);
        const ex = cx + 120 * Math.sin(a);
        const ey = cy - 60 * Math.cos(a) + 30;
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        // emitted-photon probability fans out as 1−P_upper
        const emit = pLo;
        ctx.fillStyle = `rgba(124,58,237,${0.15 + 0.5 * emit})`;
        ctx.beginPath();
        ctx.arc(ex, ey, 3 + 2 * emit, 0, TWO_PI);
        ctx.fill();
      }
      ctx.fillStyle = "#64748b";
      ctx.font = "11px ui-sans-serif, system-ui";
      ctx.fillText("photon escapes ⇒ irreversible", fx, fBot + 14);
    }

    // ── n=0 banner: the headline vacuum Rabi flop ──
    if (n === 0 && mode === "single") {
      ctx.fillStyle = "rgba(225,29,72,0.10)";
      ctx.fillRect(8, 6, w - 16, 22);
      ctx.fillStyle = "#be123c";
      ctx.font = "600 12px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.fillText("VACUUM RABI FLOP — the field is empty (n=0) yet the atom still oscillates", w / 2, 21);
    }
  };

  return (
    <div>
      <Canvas width={580} height={250} draw={draw} speed={1} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            {mode === "single" ? "Reversible Rabi flopping" : "Rabi curve vs. irreversible WW envelope"}
          </div>
          <Plot
            width={320}
            height={220}
            xRange={[0, sim.T]}
            yRange={[0, 1]}
            xLabel="t  (arb. s)"
            yLabel="probability"
            lines={lines}
            markers={[{ y: 0.5, color: "#e2e8f0", dashed: true }]}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Detuning lineshape (Eq. 75, perturbative)
          </div>
          <div style={{ fontSize: "0.72rem", color: "#64748b", marginBottom: 4 }}>
            Relative (unnormalized) lineshape — valid only while g√(n+1) t ≪ 1; outside that the true probability saturates.
          </div>
          <Plot
            width={320}
            height={220}
            xRange={[-12, 12]}
            yRange={[0, Math.max(0.2, lineMax * 1.15)]}
            xLabel="Ω − ω"
            yLabel="transition rate, arb."
            lines={lineShape}
            markers={[{ x: det, color: "#e11d48" }]}
          />
        </div>
      </div>

      <Controls>
        <Segmented<Mode>
          label="coupling"
          options={[
            { value: "single", label: "single mode (Rabi)" },
            { value: "continuum", label: "continuum (Weisskopf–Wigner)" },
          ]}
          value={mode}
          onChange={setMode}
        />
        <Slider
          label={String.raw`n\ \text{(photons in mode)}`}
          tex
          min={0}
          max={20}
          step={1}
          value={n}
          onChange={(v) => setN(Math.round(v))}
          unit="photons"
          format={(v) => Math.round(v).toString()}
        />
        <Slider
          label={String.raw`g\ \text{(coupling)}`}
          tex
          min={0.1}
          max={5}
          step={0.05}
          value={g}
          onChange={setG}
          unit="rad/s"
        />
        <Slider
          label={String.raw`\gamma_a\ \text{(WW decay rate)}`}
          tex
          min={0.1}
          max={5}
          step={0.05}
          value={gamma}
          onChange={setGamma}
          unit="1/s"
        />
        <Slider
          label={String.raw`\Omega-\omega\ \text{(detuning marker)}`}
          tex
          min={-12}
          max={12}
          step={0.1}
          value={det}
          onChange={setDet}
          unit="rad/s"
        />
        <Slider
          label={String.raw`t\ \text{(time in Eq.75)}`}
          tex
          min={0.2}
          max={6}
          step={0.1}
          value={tLine}
          onChange={setTLine}
          unit="s"
        />
        <Readout label={String.raw`\Omega_{\text{Rabi}}=2g\sqrt{n+1}`} tex value={`${rabi.toFixed(3)} rad/s`} />
        <Readout
          label={String.raw`T=2\pi/\Omega_{\text{Rabi}}`}
          tex
          value={`${rabiPeriod.toFixed(3)} s`}
        />
        <Readout label={String.raw`\tau=1/\gamma_a`} tex value={`${tau.toFixed(3)} s`} />
        <Readout
          label={String.raw`\text{regime}`}
          tex
          value={mode === "single" ? "reversible (energy returns)" : "irreversible (energy escapes)"}
        />
        <Readout
          label={String.raw`\text{lineshape (Eq.75, arb.)}\big|_{\Omega-\omega=0}`}
          tex
          value={lineMax.toFixed(3)}
        />
        <Readout
          label={String.raw`\text{lineshape (Eq.75, arb.)}\big|_{\text{marker }\Omega-\omega}`}
          tex
          value={lineAtDet.toFixed(3)}
        />
      </Controls>
    </div>
  );
}
