"use client";

/**
 * Chapter XVIII — Photon statistics vs. photoelectron counts: the
 * quantum-efficiency thinning machine.
 *
 * The chapter's headline result is the photoelectron counting distribution,
 * Eq. (18.1):
 *
 *     P_m = sum_{n>=m} C(n,m) eta^m (1-eta)^{n-m} rho_nn
 *
 * A photodetector does NOT read out the photon statistics rho_nn directly.
 * Each photon is detected with probability eta (the quantum efficiency), so the
 * measured photoCOUNT distribution P_m is a Bernoulli-thinned copy of rho_nn.
 * Only at eta = 1 does P_m = rho_mm (Eq. 18.6).
 *
 * The student chooses an input field rho_nn — coherent/Poisson, thermal/Bose-
 * Einstein, a number state |n0>, or the fully-quantized laser distribution of
 * Eq. (17.34)/(18.9) — then drags eta from 1 down to 0 and watches the solid
 * P_m bars slide their peak from <n> to eta<n> while the faint reference bars
 * (the true rho_nn) hold still. Thinning drives the Fano factor toward 1
 * (Fano(m) = 1 + eta*(Fano(n) - 1)): sub-Poissonian light broadens, coherent
 * stays Poisson, super-Poissonian light (thermal, laser near threshold) narrows.
 * Note this is a Fano-factor statement, not a shape claim — thinned thermal stays
 * exactly geometric/thermal; only the Fano factor moves toward 1.
 *
 * Numerics (all in log space off ONE precomputed log-factorial array to avoid
 * overflow at large n and underflow of the binomial weights near eta=1):
 *   lnfact[k] = lnfact[k-1] + ln k.
 *   coherent  ln rho_n = -<n> + n ln<n> - lnfact[n]
 *   thermal   ln rho_n = -ln(1+<n>) + n ln(<n>/(1+<n>))
 *   number    rho_n    = delta_{n,n0}
 *   laser     ratio recurrence rho_{n+1} = rho_n * x/(n+s+1),  s=A/B, x=A^2/BC=s*r
 *   thinning  P_m += exp( lnfact[n]-lnfact[m]-lnfact[n-m]
 *                          + m ln eta + (n-m) ln(1-eta) + ln rho_n )
 * Special cases: eta=1 -> P_m = rho_m exactly (Eq. 18.6); eta=0 -> P_0 = 1.
 *
 * Mandel Q thins linearly under Bernoulli sampling: Q_m = eta * Q_n. This is
 * the backbone of the Q-vs-eta inset and the visible proof that thinning erases
 * nonclassical sub-Poissonian structure (a number state's Q = -1 rises to 0).
 * All moments shown are computed from the displayed P_m array (single source of
 * truth); the closed form Var(m) = eta^2 Var(n) + eta(1-eta)<n> is shown as the
 * agreeing cross-check.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Segmented, Readout, Controls, Series } from "@/components/sim";

const NMAX = 600; // truncation safe for <n> up to 25 (thermal tail) and the laser

// One precomputed log-factorial table: lnfact[k] = ln(k!).
const LNFACT: number[] = (() => {
  const a = new Array(NMAX + 1);
  a[0] = 0;
  for (let k = 1; k <= NMAX; k++) a[k] = a[k - 1] + Math.log(k);
  return a;
})();

type StateKind = 0 | 1 | 2 | 3; // 0 coherent, 1 thermal, 2 number, 3 laser

/** Build the input photon distribution rho_nn as a normalized array of length NMAX+1. */
function buildRho(state: StateKind, nbar: number, r: number, s: number): number[] {
  const rho = new Array(NMAX + 1).fill(0);
  if (state === 0) {
    // coherent / Poisson:  rho_n = e^{-<n>} <n>^n / n!
    if (nbar <= 0) {
      rho[0] = 1;
      return rho;
    }
    const ln_nbar = Math.log(nbar);
    for (let n = 0; n <= NMAX; n++) {
      rho[n] = Math.exp(-nbar + n * ln_nbar - LNFACT[n]);
    }
  } else if (state === 1) {
    // thermal / Bose-Einstein:  rho_n = (1/(1+<n>)) (<n>/(1+<n>))^n
    if (nbar <= 0) {
      rho[0] = 1;
      return rho;
    }
    const q = nbar / (1 + nbar);
    const lnq = Math.log(q);
    const ln0 = -Math.log(1 + nbar);
    for (let n = 0; n <= NMAX; n++) {
      rho[n] = Math.exp(ln0 + n * lnq);
    }
  } else if (state === 2) {
    // number state |n0> with n0 = round(<n>)
    const n0 = Math.max(0, Math.min(NMAX, Math.round(nbar)));
    rho[n0] = 1;
  } else {
    // fully-quantized laser (Eq. 17.34): rho_n ∝ x^{n+s}/(n+s)!,  x = A^2/BC = s*r.
    // Ratio recurrence avoids the Gamma function and never overflows here:
    //   rho_{n+1}/rho_n = x/(n+s+1).
    const x = s * r;
    let cur = 1; // unnormalized rho_0
    rho[0] = cur;
    for (let n = 0; n < NMAX; n++) {
      cur = (cur * x) / (n + s + 1);
      rho[n + 1] = cur;
    }
  }
  // normalize
  let Z = 0;
  for (let n = 0; n <= NMAX; n++) Z += rho[n];
  if (Z > 0) for (let n = 0; n <= NMAX; n++) rho[n] /= Z;
  return rho;
}

/** Apply Bernoulli thinning (Eq. 18.1) to rho -> photocount distribution P_m. */
function thin(rho: number[], eta: number): number[] {
  const P = new Array(NMAX + 1).fill(0);
  if (eta >= 1) {
    // Eq. (18.6): perfect efficiency, P_m = rho_mm exactly.
    for (let m = 0; m <= NMAX; m++) P[m] = rho[m];
    return P;
  }
  if (eta <= 0) {
    P[0] = 1; // no photon ever detected
    return P;
  }
  const lnEta = Math.log(eta);
  const ln1mEta = Math.log(1 - eta);
  // find highest occupied photon number to cap the inner loop
  let nTop = NMAX;
  while (nTop > 0 && rho[nTop] < 1e-12) nTop--;
  for (let m = 0; m <= nTop; m++) {
    let acc = 0;
    for (let n = m; n <= nTop; n++) {
      const rn = rho[n];
      if (rn < 1e-300) continue;
      const lnTerm =
        LNFACT[n] - LNFACT[m] - LNFACT[n - m] + m * lnEta + (n - m) * ln1mEta + Math.log(rn);
      acc += Math.exp(lnTerm);
    }
    P[m] = acc;
  }
  return P;
}

/** Mean and variance of a probability array. */
function moments(P: number[]): { mean: number; var: number } {
  let mean = 0;
  for (let k = 0; k <= NMAX; k++) mean += k * P[k];
  let v = 0;
  for (let k = 0; k <= NMAX; k++) v += (k - mean) * (k - mean) * P[k];
  return { mean, var: v };
}

export default function Ch18Sim() {
  const [state, setState] = useState<StateKind>(0);
  const [eta, setEta] = useState(0.5); // detector quantum efficiency
  const [nbar, setNbar] = useState(10); // mean photon number (presets 0,1,2)
  const [ratio, setRatio] = useState(1.5); // A/C pump ratio (laser preset)
  const [satS, setSatS] = useState(10); // A/B saturation scale (laser preset)

  // input distribution + thinned distribution + moments
  const { rho, P, mn, mm, vn, vm, Qn, Qm, etaTop, peakN } = useMemo(() => {
    const rho = buildRho(state, nbar, ratio, satS);
    const P = thin(rho, eta);
    const a = moments(rho);
    const b = moments(P);
    const Qn = a.mean > 0 ? (a.var - a.mean) / a.mean : 0;
    const Qm = b.mean > 0 ? (b.var - b.mean) / b.mean : 0;
    // axis: a few past the larger of the two means
    const meanForAxis = Math.max(a.mean, 1);
    const etaTop = Math.max(8, Math.ceil(meanForAxis * 1.8) + 4);
    // peak index of rho
    let peakN = 0;
    for (let k = 1; k <= NMAX; k++) if (rho[k] > rho[peakN]) peakN = k;
    return { rho, P, mn: a.mean, mm: b.mean, vn: a.var, vm: b.var, Qn, Qm, etaTop, peakN };
  }, [state, eta, nbar, ratio, satS]);

  // closed-form variance cross-check: Var(m) = eta^2 Var(n) + eta(1-eta)<n>
  const vmClosed = eta * eta * vn + eta * (1 - eta) * mn;

  // eta=1 verification flag for Eq. (18.6): max_m |P_m - rho_mm| at eta=1
  const eq6Residual = useMemo(() => {
    const P1 = thin(rho, 1);
    let mx = 0;
    for (let k = 0; k <= NMAX; k++) mx = Math.max(mx, Math.abs(P1[k] - rho[k]));
    return mx;
  }, [rho]);

  const normSum = useMemo(() => {
    let s = 0;
    for (let k = 0; k <= NMAX; k++) s += P[k];
    return s;
  }, [P]);

  // ── Dual bar chart (custom Canvas; Plot only draws lines) ──────────────────
  const NSHOW = Math.min(etaTop, 40);
  const draw = ({ ctx, w, h }: any) => {
    ctx.clearRect(0, 0, w, h);
    const padL = 44;
    const padR = 14;
    const padT = 16;
    const padB = 38;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    // shared vertical scale: tallest bar of either distribution (visible range)
    let ymax = 1e-3;
    for (let k = 0; k <= NSHOW; k++) {
      ymax = Math.max(ymax, rho[k], P[k]);
    }
    ymax *= 1.12;

    const slot = plotW / (NSHOW + 1);
    const x0 = (k: number) => padL + (k + 0.5) * slot;
    const yOf = (p: number) => padT + plotH * (1 - p / ymax);

    // axes
    ctx.strokeStyle = "#9aa3b2";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    // y ticks
    ctx.fillStyle = "#5b6473";
    ctx.font = "10px ui-sans-serif, system-ui";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i <= 4; i++) {
      const yv = (ymax / 4) * i;
      const yy = yOf(yv);
      ctx.fillText(yv.toFixed(2), padL - 6, yy);
      ctx.strokeStyle = "#eceef3";
      ctx.beginPath();
      ctx.moveTo(padL, yy);
      ctx.lineTo(padL + plotW, yy);
      ctx.stroke();
    }

    // x ticks (every few)
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    const step = NSHOW > 24 ? 5 : NSHOW > 12 ? 2 : 1;
    for (let k = 0; k <= NSHOW; k += step) {
      ctx.fillStyle = "#5b6473";
      ctx.fillText(String(k), x0(k), padT + plotH + 6);
    }

    const bw = Math.max(2, slot * 0.34);

    // faint reference bars: the true photon distribution rho_nn
    ctx.fillStyle = "rgba(148,163,184,0.45)";
    for (let k = 0; k <= NSHOW; k++) {
      if (rho[k] <= 0) continue;
      const bh = plotH * (rho[k] / ymax);
      ctx.fillRect(x0(k) - bw - 1, padT + plotH - bh, bw, bh);
    }

    // solid measured bars: the photocount distribution P_m
    ctx.fillStyle = "rgba(79,70,229,0.85)";
    for (let k = 0; k <= NSHOW; k++) {
      if (P[k] <= 0) continue;
      const bh = plotH * (P[k] / ymax);
      ctx.fillRect(x0(k) + 1, padT + plotH - bh, bw, bh);
    }

    // vertical markers: <n> (slate) and <m> = eta<n> (indigo)
    const drawVline = (val: number, color: string, label: string, dy: number) => {
      const xx = x0(val);
      if (xx < padL || xx > padL + plotW) return;
      ctx.strokeStyle = color;
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(xx, padT);
      ctx.lineTo(xx, padT + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = color;
      ctx.font = "600 11px ui-sans-serif, system-ui";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(label, xx + 4, padT + 12 + dy);
    };
    drawVline(mn, "#64748b", `⟨n⟩=${mn.toFixed(1)}`, 0);
    drawVline(mm, "#4f46e5", `⟨m⟩=${mm.toFixed(1)}`, 16);

    // legend
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    const lx = padL + plotW - 150;
    let ly = padT + 6;
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.fillStyle = "rgba(148,163,184,0.55)";
    ctx.fillRect(lx, ly - 6, 12, 12);
    ctx.fillStyle = "#1f2733";
    ctx.fillText("ρ_nn (photons)", lx + 18, ly);
    ly += 17;
    ctx.fillStyle = "rgba(79,70,229,0.85)";
    ctx.fillRect(lx, ly - 6, 12, 12);
    ctx.fillStyle = "#1f2733";
    ctx.fillText("P_m (counts)", lx + 18, ly);

    // x label
    ctx.fillStyle = "#1f2733";
    ctx.font = "12px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("photon number n  /  count m", padL + plotW / 2, h - 6);
  };

  // ── Mandel Q vs eta inset: straight line Q_m = eta * Q_n + measured point ──
  const qLines = useMemo<Series[]>(() => {
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i <= 50; i++) {
      const e = i / 50;
      x.push(e);
      y.push(e * Qn); // Q_m = eta * Q_n (exact under Bernoulli thinning)
    }
    return [
      { x, y, color: "#0891b2", width: 2.5, label: "Q_m = η·Q_n" },
      // zero reference handled as a marker below
    ];
  }, [Qn]);
  const qLo = Math.min(-1.05, Qn * 1.05, 0);
  const qHi = Math.max(0.5, Qn * 1.05);

  const stateName = ["coherent (Poisson)", "thermal (Bose–Einstein)", "number state |n₀⟩", "quantized laser"][
    state
  ];
  const isLaser = state === 3;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: "1rem", alignItems: "start" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Photon statistics ρ_nn vs. measured photocounts P_m
          </div>
          <Canvas
            width={460}
            height={300}
            animate={false}
            redraw={[state, eta, nbar, ratio, satS]}
            draw={draw}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Mandel Q of the counts vs. η
          </div>
          <Plot
            width={300}
            height={240}
            xRange={[0, 1]}
            yRange={[qLo, qHi]}
            xLabel="η  (quantum efficiency)"
            yLabel="Q"
            lines={qLines}
            markers={[
              { y: 0, color: "#cbd5e1", dashed: false },
              { x: eta, color: "#e11d48" },
              { y: Qm, color: "#e11d48" },
            ]}
          />
          <div style={{ fontSize: "0.72rem", color: "#5b6473", marginTop: 2 }}>
            Red crosshair: the measured Q at the current η. Coherent → flat 0; thermal → slope ⟨n⟩;
            number state → starts at −1 and is dragged to 0 as η falls. Thinning erases sub-Poissonian
            structure.
          </div>
        </div>
      </div>

      <Controls>
        <Segmented
          label="input field ρ_nn"
          options={[
            { value: 0, label: "Coherent" },
            { value: 1, label: "Thermal" },
            { value: 2, label: "Number |n₀⟩" },
            { value: 3, label: "Laser (Eq. 10)" },
          ]}
          value={state}
          onChange={(v) => setState(v as StateKind)}
        />
        <Slider
          label={String.raw`\eta`}
          tex
          min={0}
          max={1}
          step={0.01}
          value={eta}
          onChange={setEta}
          unit="detect. prob."
        />
        {!isLaser ? (
          <Slider
            label={String.raw`\langle n\rangle`}
            tex
            min={0}
            max={25}
            step={1}
            value={nbar}
            onChange={setNbar}
            unit="photons"
          />
        ) : (
          <>
            <Slider
              label={String.raw`\mathscr{A}/\mathscr{C}\ \text{(pump)}`}
              tex
              min={0.2}
              max={3}
              step={0.05}
              value={ratio}
              onChange={setRatio}
            />
            <Slider
              label={String.raw`\mathscr{A}/\mathscr{B}\ \text{(satur.)}`}
              tex
              min={1}
              max={30}
              step={1}
              value={satS}
              onChange={setSatS}
              unit="photons"
            />
          </>
        )}
        <Readout label={String.raw`\langle m\rangle=\eta\langle n\rangle`} tex value={`${mm.toFixed(2)} (η⟨n⟩=${(eta * mn).toFixed(2)})`} />
        <Readout label={String.raw`\mathrm{Var}(m)`} tex value={`${vm.toFixed(2)}  [closed: ${vmClosed.toFixed(2)}]`} />
        <Readout label={String.raw`\text{Fano } \mathrm{Var}(m)/\langle m\rangle`} tex value={mm > 0 ? (vm / mm).toFixed(3) : "—"} />
        <Readout label={String.raw`Q_m=\eta Q_n`} tex value={`${Qm.toFixed(3)}  (η·Q_n=${(eta * Qn).toFixed(3)})`} />
        <Readout label={String.raw`\eta{=}1:\ \max_m|P_m-\rho_{mm}|`} tex value={eq6Residual.toExponential(1)} />
        <Readout label={String.raw`\sum_m P_m`} tex value={normSum.toFixed(4)} />
      </Controls>
      <div style={{ fontSize: "0.74rem", color: "#5b6473", marginTop: "0.5rem" }}>
        Showing the {stateName} field. The faint bars are the prepared photon statistics ρ_nn; the solid
        indigo bars are what the detector reports, P_m, computed by directly summing Eq. (18.1). Drag η from
        1 down: at η = 1 the bars coincide (Eq. 18.6, residual ≈ 0); as η drops, the peak slides from ⟨n⟩ to
        η⟨n⟩ and the Fano factor moves toward 1 (Fano(m) = 1 + η[Fano(n) − 1]): sub-Poissonian light broadens,
        coherent stays Poisson, super-Poissonian light (thermal, laser near threshold) narrows.
        {isLaser
          ? " For the laser, A/C > 1 is above threshold (narrow, near-Poisson) and A/C < 1 is below threshold (broad, super-Poissonian)."
          : ""}
      </div>
    </div>
  );
}
