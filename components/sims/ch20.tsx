"use client";

/**
 * Chapter XX — Langevin theory of laser fluctuations.
 *
 * We integrate the chapter's MASTER stochastic equation, the saturated field
 * Langevin equation (Eq. 48), as an Itô SDE for the complex field phasor A(t):
 *
 *   dA = ( −[½(ν/Q) + i(Ω−ν)] A + 𝒜 A − ℬ |A|² A ) dt + dW,
 *
 * with a COMPLEX white-noise increment dW whose per-quadrature variance is set,
 * once, by the chapter's noise weight (the bracket of Eqs. 56/74):
 *
 *   ⟨D⟩ ≡ ½(ν/Q)[ n̄ + ½ + ½·N_a/(N_a−N_b) ],
 *   ⟨dW_x²⟩ = ⟨dW_y²⟩ = ⟨D⟩ dt   (so ⟨|dW|²⟩ = 2⟨D⟩ dt = 2⟨D⟩ dt, Eq. 17 form).
 *
 * THE TEACHING INVARIANT (which the integrator MUST reproduce, never fake):
 *   • Gain saturation −ℬ|A|²A depends ONLY on |A|² → it restores the AMPLITUDE,
 *     pinning the phasor to a ring of radius √n̄_ss with  n̄_ss = (𝒜−½ν/Q)/ℬ (Eq. 63).
 *   • NOTHING restores the PHASE → the phase performs an undamped random walk.
 *     Its variance grows LINEARLY: ⟨Δφ²(t)⟩ = (⟨D⟩/n̄_ss) t.
 *   • A linearly-growing phase variance ⟺ exponentially-decaying field
 *     autocorrelation ⟺ a LORENTZIAN spectrum of FWHM  Δν = 2⟨D(φ̇)⟩ = ⟨D⟩/n̄_ss.
 *
 * SELF-CONSISTENCY (per the spec's fidelityNotes). One constant ⟨D⟩ drives BOTH
 * the injected noise AND the analytic overlays. The amplitude-displacement algebra
 * (ring radius √n̄_ss, tangential quadrature variance ⟨D⟩dt) gives
 *   d⟨Δφ²⟩/dt = ⟨D⟩/n̄_ss  ⇒  slope-line and Lorentzian FWHM are BOTH ⟨D⟩/n̄_ss.
 * So the measured ensemble variance slope and spectrum width sit on the overlays
 * by construction — and the physics (↑pump narrows, ↑Q narrows, ↑excess-factor
 * broadens) is exactly right.
 *
 * NUMERICS. Euler–Maruyama on an ENSEMBLE of M≈400 phasors (a single trajectory
 * gives noise hash, not a straight line). The deterministic rotation (Ω−ν) is
 * SUBTRACTED before accumulating phase variance, so detuning sets the spectrum
 * CENTER, not its width. Below threshold (𝒜 ≤ ½ν/Q) n̄_ss ≤ 0: we branch to a
 * "no coherent field" banner rather than emit √NaN.
 *
 * Units: rates in 1/ns, so linewidths land in the MHz–GHz range of real lasers
 * (Δν[MHz] = Δν[1/ns]·159.15, since 1/ns / (2π) = 159.15 MHz).
 */

import { useEffect, useRef, useState } from "react";
import { Canvas, Plot, Slider, Toggle, Controls, Readout, Series } from "@/components/sim";

const TWO_PI = 2 * Math.PI;
// Box–Muller standard normal.
function gauss(): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(TWO_PI * v);
}

const M = 400; // ensemble size

export default function Ch20Sim() {
  // ── controls (simSpec) ──────────────────────────────────────────────────────
  const [A, setA] = useState(2.0); // 𝒜   linear gain (pump strength)      1/ns
  const [nuQ, setNuQ] = useState(1.0); // ν/Q cavity loss rate                1/ns
  const [B, setB] = useState(0.02); // ℬ   saturation coefficient           1/ns
  const [excess, setExcess] = useState(1.5); // N_a/(N_a−N_b) excess-spontaneous factor
  const [detune, setDetune] = useState(0.0); // Ω−ν cavity–carrier detuning   1/ns
  const [nbar, setNbar] = useState(0.0); // n̄  thermal photon number (Planck)
  const [showRing, setShowRing] = useState(true);

  // ── analytic steady state & linewidth (one shared constant ⟨D⟩) ──────────────
  const halfLoss = 0.5 * nuQ; // ½ ν/Q
  const above = A - halfLoss; // gain − loss : threshold order parameter
  const nss = above > 0 ? above / B : 0; // n̄_ss = (𝒜−½ν/Q)/ℬ  (Eq. 63)
  const lasing = above > 0 && nss > 1e-9;
  // ⟨D⟩ — the noise weight (bracket of Eqs. 56/74). Drives injection AND overlays.
  const Dnoise = halfLoss * (nbar + 0.5 + 0.5 * excess);
  // phase-diffusion coefficient & Schawlow–Townes linewidth (Eqs. 72/74):
  //   2⟨D(φ̇)⟩ = ⟨D⟩/n̄_ss = variance slope = Lorentzian FWHM (in 1/ns).
  const linewidth = lasing ? Dnoise / nss : Infinity; // Δν = 2⟨D(φ̇)⟩  (1/ns)
  const linewidthMHz = lasing ? (linewidth / TWO_PI) * 1000 : Infinity; // Δν in MHz
  const ringR = lasing ? Math.sqrt(nss) : 0; // phasor ring radius √n̄_ss

  // ── ensemble state in refs; advanced inside the draw closure ─────────────────
  const reRef = useRef<Float64Array>(new Float64Array(M)); // Re A_j
  const imRef = useRef<Float64Array>(new Float64Array(M)); // Im A_j
  const phiUwRef = useRef<Float64Array>(new Float64Array(M)); // unwrapped phase
  const phiPrevRef = useRef<Float64Array>(new Float64Array(M)); // last wrapped phase
  const sigRef = useRef<string>("");
  const lastTRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0); // accumulated diffusion time
  const trailRef = useRef<{ x: number; y: number }[]>([]); // highlighted-dot trail

  // variance trace ⟨Δφ²(t)⟩ for panel 2
  const varTraceRef = useRef<{ t: number[]; v: number[] }>({ t: [], v: [] });
  const [varTrace, setVarTrace] = useState<{ t: number[]; v: number[] }>({ t: [], v: [] });
  // live scalars surfaced to readouts
  const [live, setLive] = useState({ ampMean: 0, ampStd: 0, rmsPhi: 0, t: 0 });

  const sig = `${A}|${nuQ}|${B}|${excess}|${detune}|${nbar}`;

  // (re)seed the whole ensemble onto the steady-state ring with random phases
  const seed = () => {
    const re = reRef.current;
    const im = imRef.current;
    const uw = phiUwRef.current;
    const pv = phiPrevRef.current;
    const r = ringR > 0 ? ringR : 0.1;
    for (let j = 0; j < M; j++) {
      const ph = Math.random() * TWO_PI;
      re[j] = r * Math.cos(ph);
      im[j] = r * Math.sin(ph);
      uw[j] = 0; // measure phase DRIFT from t=0 (rotating frame removed)
      pv[j] = ph; // de-rotated phase at t=0 is just the seeded angle (elapsed=0)
    }
    elapsedRef.current = 0;
    trailRef.current = [];
    varTraceRef.current = { t: [], v: [] };
    sigRef.current = sig;
    lastTRef.current = 0;
  };

  useEffect(() => {
    seed();
    setVarTrace({ t: [], v: [] });
    setLive({ ampMean: ringR, ampStd: 0, rmsPhi: 0, t: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);

  // ── one Euler–Maruyama micro-step of the ensemble ────────────────────────────
  // dA = (−[½ν/Q + i(Ω−ν)]A + 𝒜A − ℬ|A|²A) dt + dW,  ⟨dW_x²⟩=⟨dW_y²⟩=⟨D⟩ dt.
  // We measure the phase relative to the DETERMINISTIC rotation (Ω−ν): the lab
  // phase advances by −(Ω−ν)dt deterministically; we subtract that so the
  // variance reflects DIFFUSION only (detuning → spectrum center, not width).
  const stepEnsemble = (dt: number) => {
    const re = reRef.current;
    const im = imRef.current;
    const uw = phiUwRef.current;
    const pv = phiPrevRef.current;
    const sd = Math.sqrt(Math.max(Dnoise, 0) * dt); // per-quadrature noise std
    const driftR = above; // net linear (gain − loss) growth, real part
    for (let j = 0; j < M; j++) {
      const x = re[j];
      const y = im[j];
      const n = x * x + y * y; // |A|²
      const sat = B * n; // saturation rate
      // deterministic part (rotating frame: subtract the (Ω−ν) carrier rotation)
      const gr = driftR - sat; // real radial drift coefficient
      // dx = gr·x dt + (Ω−ν)·y dt + dWx ;  dy = gr·y dt − (Ω−ν)·x dt + dWy
      // (the +i(Ω−ν)A term rotates the phasor; sign chosen so detune>0 ⇒ CCW)
      const nx = x + (gr * x + detune * y) * dt + sd * gauss();
      const ny = y + (gr * y - detune * x) * dt + sd * gauss();
      re[j] = nx;
      im[j] = ny;
      // unwrap the phase RELATIVE to the deterministic rotation:
      // lab angle = atan2(ny,nx); subtract the deterministic −detune·dt rotation
      // so what remains is pure diffusion about a fixed mean.
      const labPh = Math.atan2(ny, nx) + detune * elapsedRef.current; // de-rotate
      let dphi = labPh - pv[j];
      while (dphi > Math.PI) dphi -= TWO_PI;
      while (dphi < -Math.PI) dphi += TWO_PI;
      uw[j] += dphi;
      pv[j] = labPh;
    }
    elapsedRef.current += dt;
  };

  // ── animated canvas: the phasor cloud (Fig. 20-3) ────────────────────────────
  const draw = ({ ctx, w, h, t }: { ctx: CanvasRenderingContext2D; w: number; h: number; t: number }) => {
    ctx.clearRect(0, 0, w, h);

    if (sigRef.current !== sig || t < lastTRef.current - 1e-6) {
      seed();
      sigRef.current = sig;
    }
    const dtFrame = t - lastTRef.current;
    lastTRef.current = t;

    // advance the SDE (sub-stepped for stability of the noise injection)
    if (lasing && dtFrame > 0 && dtFrame < 0.5) {
      const sub = 4;
      const hstep = (dtFrame * 2.0) / sub; // 2× wall-clock so diffusion is visible
      for (let k = 0; k < sub; k++) stepEnsemble(hstep);
    }

    const re = reRef.current;
    const im = imRef.current;
    const uw = phiUwRef.current;

    // ===== geometry: complex-plane scope ========================================
    const cx = w * 0.5;
    const cy = h * 0.5;
    // scale so the steady-state ring sits at ~38% of the half-height
    const Rpix = Math.min(w, h) * 0.38;
    const scale = ringR > 1e-6 ? Rpix / ringR : Rpix;
    const px = (xr: number) => cx + xr * scale;
    const py = (yi: number) => cy - yi * scale;

    // axes
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, cy);
    ctx.lineTo(w - 20, cy);
    ctx.moveTo(cx, 16);
    ctx.lineTo(cx, h - 16);
    ctx.stroke();
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText("Re A", w - 52, cy - 6);
    ctx.fillText("Im A", cx + 6, 24);

    if (!lasing) {
      ctx.fillStyle = "#b45309";
      ctx.font = "600 14px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.fillText("below threshold:  𝒜 ≤ ½ν/Q  →  no coherent field, no ring", cx, cy - 12);
      ctx.fillStyle = "#5b6473";
      ctx.font = "12px ui-sans-serif, system-ui";
      ctx.fillText("raise the pump 𝒜 above ½ν/Q to switch the laser on", cx, cy + 12);
      return;
    }

    // amplitude-clamp ring of radius √n̄_ss
    if (showRing) {
      ctx.strokeStyle = "#0891b2";
      ctx.setLineDash([5, 4]);
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR * scale, 0, TWO_PI);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#0891b2";
      ctx.font = "11px ui-sans-serif, system-ui";
      ctx.textAlign = "left";
      ctx.fillText("ring  |A| = √n̄_ss", px(ringR) + 4, py(0) - 6);
    }

    // the ensemble cloud: dots hugging the ring, spread in ANGLE
    let ampMean = 0;
    let ampSq = 0;
    for (let j = 0; j < M; j++) {
      const xr = re[j];
      const yi = im[j];
      const amp = Math.sqrt(xr * xr + yi * yi);
      ampMean += amp;
      ampSq += amp * amp;
      ctx.fillStyle = "rgba(79,70,229,0.30)";
      ctx.beginPath();
      ctx.arc(px(xr), py(yi), 2.0, 0, TWO_PI);
      ctx.fill();
    }
    ampMean /= M;
    const ampStd = Math.sqrt(Math.max(0, ampSq / M - ampMean * ampMean));

    // highlighted tracer phasor (j=0) with a fading trail + the radius vector
    const hx = re[0];
    const hy = im[0];
    const tr = trailRef.current;
    tr.push({ x: px(hx), y: py(hy) });
    if (tr.length > 90) tr.shift();
    ctx.strokeStyle = "rgba(225,29,72,0.5)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    tr.forEach((p, k) => (k ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.stroke();
    // radius vector (the phasor itself)
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(px(hx), py(hy));
    ctx.stroke();
    ctx.fillStyle = "#e11d48";
    ctx.beginPath();
    ctx.arc(px(hx), py(hy), 4, 0, TWO_PI);
    ctx.fill();

    // "spontaneous-emission kick" arrows on the tracer tip (the noise dW)
    ctx.strokeStyle = "rgba(217,119,6,0.85)";
    ctx.lineWidth = 1.5;
    const tipx = px(hx);
    const tipy = py(hy);
    for (let a = 0; a < 4; a++) {
      const ang = (a / 4) * TWO_PI + t * 3;
      const L = 9;
      ctx.beginPath();
      ctx.moveTo(tipx, tipy);
      ctx.lineTo(tipx + L * Math.cos(ang), tipy + L * Math.sin(ang));
      ctx.stroke();
    }

    // banner
    ctx.fillStyle = "#16a34a";
    ctx.font = "600 11px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText(`lasing:  𝒜 − ½ν/Q = +${above.toFixed(2)} 1/ns`, 24, 28);
    ctx.fillStyle = "#475569";
    ctx.textAlign = "right";
    ctx.fillText("amplitude clamped · phase walking", w - 24, 28);

    // ── accumulate the phase variance trace (about the de-rotated mean) ─────────
    let pMean = 0;
    for (let j = 0; j < M; j++) pMean += uw[j];
    pMean /= M;
    let pVar = 0;
    for (let j = 0; j < M; j++) {
      const d = uw[j] - pMean;
      pVar += d * d;
    }
    pVar /= M;
    const te = elapsedRef.current;
    const vt = varTraceRef.current;
    if (vt.t.length === 0 || te - vt.t[vt.t.length - 1] > 0.05) {
      vt.t.push(te);
      vt.v.push(pVar);
      if (vt.t.length > 600) {
        vt.t.shift();
        vt.v.shift();
      }
    }

    // throttle React updates to ~10 Hz
    if (Math.floor(t * 10) !== Math.floor((t - dtFrame) * 10)) {
      setLive({ ampMean, ampStd, rmsPhi: Math.sqrt(Math.max(0, pVar)), t: te });
      setVarTrace({ t: vt.t.slice(), v: vt.v.slice() });
    }
  };

  // ── panel 2: ⟨Δφ²(t)⟩ vs t with the analytic slope = ⟨D⟩/n̄_ss = 2⟨D(φ̇)⟩ ──────
  // The trace is a sliding window; span the axis from its first to last sample so
  // the data fills the panel and the analytic line overlaps it cleanly.
  const tMinVar = varTrace.t.length ? varTrace.t[0] : 0;
  const tMaxVar = Math.max(tMinVar + 2, varTrace.t.length ? varTrace.t[varTrace.t.length - 1] : 2);
  const slope = lasing ? Dnoise / nss : 0; // = 2⟨D(φ̇)⟩
  const varLines: Series[] = [
    {
      x: varTrace.t,
      y: varTrace.v,
      color: "#4f46e5",
      width: 2.4,
      label: "⟨Δφ²⟩ ensemble",
      fill: true,
    },
    {
      data: [
        [tMinVar, slope * tMinVar],
        [tMaxVar, slope * tMaxVar],
      ],
      color: "#e11d48",
      width: 1.8,
      dashed: true,
      label: "slope 2⟨D(φ̇)⟩",
    },
  ];
  const varYmax = Math.max(slope * tMaxVar * 1.25, 0.5);

  // ── panel 3: the analytic Lorentzian S(ω), FWHM = Δν = ⟨D⟩/n̄_ss ──────────────
  // S(ω) = n̄_ss·(Δν/2π) / [(ω−ω₀)² + (Δν/2)²],  ω₀ = −(Ω−ν) center.
  const specLines: Series[] = (() => {
    if (!lasing) return [];
    const N = 240;
    const fwhm = linewidth; // 1/ns
    const half = fwhm / 2;
    // A ∝ e^{-i·detune·t} ⇒ ⟨A*(t)A(0)⟩ ∝ e^{+i·detune·t} ⇒ spectrum peaks at ω = +detune
    const w0 = detune; // spectrum center = carrier detuning
    const span = Math.max(fwhm * 6, 2);
    const lo = w0 - span / 2;
    const hi = w0 + span / 2;
    const x: number[] = [];
    const y: number[] = [];
    const peak = nss * (half / Math.PI) / (half * half); // value at ω=ω₀
    for (let i = 0; i <= N; i++) {
      const om = lo + (span * i) / N;
      x.push(om);
      const val = (nss * (half / Math.PI)) / ((om - w0) * (om - w0) + half * half);
      y.push(val / peak); // normalize peak to 1 for legibility
    }
    return [{ x, y, color: "#0891b2", width: 2.5, label: "Lorentzian S(ω)", fill: true }];
  })();
  const specCenter = detune;
  const specSpan = lasing ? Math.max(linewidth * 6, 2) : 2;

  return (
    <div>
      <Canvas width={560} height={340} draw={draw} speed={1} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Phase variance ⟨Δφ²(t)⟩ — linear in time
          </div>
          <Plot
            width={300}
            height={220}
            xRange={[tMinVar, tMaxVar]}
            yRange={[0, varYmax]}
            xLabel="t  (ns)"
            yLabel="⟨Δφ²⟩  (rad²)"
            lines={varLines}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Power spectrum S(ω) — Lorentzian
          </div>
          <Plot
            width={300}
            height={220}
            xRange={[specCenter - specSpan / 2, specCenter + specSpan / 2]}
            yRange={[0, 1.1]}
            xLabel="ω − ν  (1/ns)"
            yLabel="S(ω) / S_peak"
            lines={specLines}
            markers={
              lasing
                ? [
                    { x: specCenter, color: "#e11d48", label: "center Ω−ν" },
                    { y: 0.5, color: "#94a3b8", dashed: true, label: "half-max" },
                  ]
                : []
            }
          />
        </div>
      </div>

      <Controls>
        <Slider
          label={String.raw`\mathscr{A}\ \text{(linear gain / pump)}`}
          tex
          min={0}
          max={5}
          step={0.05}
          value={A}
          onChange={setA}
          unit="1/ns"
        />
        <Slider
          label={String.raw`\nu/Q\ \text{(cavity loss)}`}
          tex
          min={0.1}
          max={3}
          step={0.05}
          value={nuQ}
          onChange={setNuQ}
          unit="1/ns"
        />
        <Slider
          label={String.raw`\mathscr{B}\ \text{(saturation)}`}
          tex
          min={0.001}
          max={0.5}
          step={0.001}
          value={B}
          onChange={setB}
          unit="1/ns"
          format={(v) => v.toFixed(3)}
        />
        <Slider
          label={String.raw`N_a/(N_a-N_b)\ \text{(excess spont.)}`}
          tex
          min={1}
          max={10}
          step={0.1}
          value={excess}
          onChange={setExcess}
          unit="(1 = fully inverted)"
        />
        <Slider
          label={String.raw`\Omega-\nu\ \text{(detuning)}`}
          tex
          min={-3}
          max={3}
          step={0.05}
          value={detune}
          onChange={setDetune}
          unit="1/ns"
        />
        <Slider
          label={String.raw`\bar n\ \text{(thermal photons)}`}
          tex
          min={0}
          max={2}
          step={0.05}
          value={nbar}
          onChange={setNbar}
          unit="dimensionless"
        />
        <Toggle label="Show amplitude-clamp ring √n̄_ss" checked={showRing} onChange={setShowRing} />

        <Readout
          label={String.raw`\mathscr{A}-\tfrac12\nu/Q\ \text{(threshold)}`}
          tex
          value={`${above >= 0 ? "+" : ""}${above.toFixed(2)} 1/ns  (${lasing ? "lasing" : "off"})`}
        />
        <Readout
          label={String.raw`\bar n_{ss}=(\mathscr{A}-\tfrac12\nu/Q)/\mathscr{B}`}
          tex
          value={lasing ? nss.toFixed(1) : "— (below threshold)"}
        />
        <Readout
          label={String.raw`2\langle D\rangle=\tfrac{\nu}{Q}\big[\bar n+\tfrac12+\tfrac12\tfrac{N_a}{N_a-N_b}\big]`}
          tex
          value={(2 * Dnoise).toFixed(3) + " 1/ns"}
        />
        <Readout
          label={String.raw`\Delta\nu=2\langle D(\dot\phi)\rangle=\langle D\rangle/\bar n_{ss}`}
          tex
          value={lasing ? linewidth.toFixed(4) + " 1/ns" : "— (no laser)"}
        />
        <Readout
          label={String.raw`\Delta\nu\ \text{(physical)}`}
          tex
          value={lasing ? linewidthMHz.toFixed(2) + " MHz" : "—"}
        />
        <Readout
          label={String.raw`|A|\ \text{mean} \pm \text{std (live)}`}
          tex
          value={lasing ? `${live.ampMean.toFixed(2)} ± ${live.ampStd.toFixed(2)}` : "—"}
        />
        <Readout
          label={String.raw`\sqrt{\langle\Delta\phi^2\rangle}\ \text{(live, grows as }\sqrt{t})`}
          tex
          value={lasing ? live.rmsPhi.toFixed(2) + " rad" : "—"}
        />
      </Controls>
    </div>
  );
}
