"use client";

/**
 * Chapter XVI — Cavity photon thermalization.
 *
 * Numerically integrate the chapter's CENTRAL master equation (Eq. 26), the
 * birth–death rate equation for the photon-number probabilities p_n = ρ_nn:
 *
 *   ṗ_n = 𝒜 n p_{n-1} + ℬ (n+1) p_{n+1} − [𝒜(n+1) + ℬ n] p_n.
 *
 * Emission climbs the photon ladder (coefficient 𝒜), absorption descends it
 * (coefficient ℬ), with the bosonic factors (n+1) and n. With the cavity-Q
 * identifications (Eqs. 39, 32)
 *
 *   𝒜 = (ν/Q) n̄,   ℬ = (ν/Q)(n̄ + 1),   n̄ = 1 / (e^{ħω₀/k_BT} − 1),
 *
 * the net decay rate is ℬ − 𝒜 = ν/Q and the steady state is the geometric
 * Planck distribution
 *
 *   p_n^{ss} = (1 − e^{−ħω₀/k_BT}) e^{−n ħω₀/k_BT},
 *
 * whose mean is the Bose–Einstein occupation n̄ and whose variance is the
 * super-Poissonian thermal value n̄(n̄+1). The mean relaxes analytically as
 *
 *   ⟨n⟩(t) = n̄ + (⟨n⟩₀ − n̄) e^{−(ν/Q) t},
 *
 * which we overlay (dashed) on the numerically integrated mean as a live
 * fidelity check: the RK4 integration of the tridiagonal generator should sit
 * exactly on the closed form.
 *
 * Everything is in arbitrary units with time measured in 1/(ν/Q). The integration
 * is performed ONCE per parameter change in a useMemo (RK4 over the full
 * p_n-vector, with renormalization each output step to kill truncation leakage);
 * the animation merely sweeps an index through the precomputed snapshots.
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Segmented, Controls, Readout, Series } from "@/components/sim";

const TWO_PI = 2 * Math.PI;

type InitMode = "fock" | "poisson";

export default function Ch16Sim() {
  const [x, setX] = useState(0.7); // x = ħω₀/k_BT  (dimensionless photon-to-thermal energy)
  const [kappa, setKappa] = useState(1.0); // ν/Q  (cavity decay rate, arb. 1/time)
  const [n0, setN0] = useState(12); // ⟨n⟩₀  initial mean photon number
  const [Nmax, setNmax] = useState(60); // ladder truncation (# of levels = Nmax+1)
  const [initMode, setInitMode] = useState<InitMode>("poisson");

  // ── thermal parameters ──────────────────────────────────────────────────────
  const nbar = 1 / (Math.exp(x) - 1); // Bose–Einstein mean photon number
  const A = kappa * nbar; // 𝒜 = (ν/Q) n̄        (emission)
  const B = kappa * (nbar + 1); // ℬ = (ν/Q)(n̄+1)     (absorption)
  const varThermal = nbar * (nbar + 1); // steady-state variance n̄(n̄+1)

  // ── precompute the full trajectory ONCE per parameter change ────────────────
  const sim = useMemo(() => {
    const M = Math.max(2, Math.round(Nmax)); // top rung index
    const dim = M + 1;

    // initial distribution at mean n0
    const p0 = new Array<number>(dim).fill(0);
    if (initMode === "fock") {
      // sharp Fock state at the nearest integer to n0
      const k = Math.min(M, Math.max(0, Math.round(n0)));
      p0[k] = 1;
    } else {
      // Poisson (coherent) with mean n0 — built by stable recursion p_k = p_{k-1} λ/k
      const lam = Math.max(0, n0);
      if (lam < 1e-9) {
        p0[0] = 1;
      } else {
        // start the recursion from the (clamped) mean to avoid under/overflow
        const seed = Math.min(M, Math.round(lam));
        const w = new Array<number>(dim).fill(0);
        w[seed] = 1;
        for (let k = seed + 1; k <= M; k++) w[k] = (w[k - 1] * lam) / k;
        for (let k = seed - 1; k >= 0; k--) w[k] = (w[k + 1] * (k + 1)) / lam;
        let s = 0;
        for (let k = 0; k <= M; k++) s += w[k];
        for (let k = 0; k <= M; k++) p0[k] = w[k] / s;
      }
    }

    // tridiagonal generator acting on p:  ṗ_n = A n p_{n-1} + B (n+1) p_{n+1} − [A(n+1)+B n] p_n
    const f = (p: number[]): number[] => {
      const out = new Array<number>(dim).fill(0);
      for (let n = 0; n <= M; n++) {
        let v = -(A * (n + 1) + B * n) * p[n]; // loss bracket
        if (n > 0) v += A * n * p[n - 1]; // gain from below (emission)
        if (n < M) v += B * (n + 1) * p[n + 1]; // gain from above (absorption)
        out[n] = v;
      }
      return out;
    };
    const add = (a: number[], b: number[], k: number) => a.map((vv, i) => vv + k * b[i]);

    // time window: a few decay times 1/(ν/Q), enough to reach steady state
    const T = 6 / kappa;
    const NOUT = 360;
    const dtOut = T / NOUT;
    const sub = 8; // RK4 substeps per output step (stability margin for stiff B·M)
    const hstep = dtOut / sub;

    const ts = new Array<number>(NOUT + 1);
    const meanNum = new Array<number>(NOUT + 1); // ⟨n⟩(t) numeric
    const meanAna = new Array<number>(NOUT + 1); // analytic relaxation
    const varNum = new Array<number>(NOUT + 1); // Var(t) numeric
    const snaps: number[][] = []; // p_n snapshots for the histogram

    let p = p0.slice();
    let t = 0;
    const moments = (pp: number[]) => {
      let m1 = 0;
      let m2 = 0;
      for (let n = 0; n <= M; n++) {
        m1 += n * pp[n];
        m2 += n * n * pp[n];
      }
      return { m1, var: m2 - m1 * m1 };
    };
    const mean0 = moments(p0).m1;

    for (let i = 0; i <= NOUT; i++) {
      ts[i] = t;
      const mm = moments(p);
      meanNum[i] = mm.m1;
      varNum[i] = mm.var;
      meanAna[i] = nbar + (mean0 - nbar) * Math.exp(-kappa * t);
      snaps.push(p.slice());
      for (let k = 0; k < sub && i < NOUT; k++) {
        const k1 = f(p);
        const k2 = f(add(p, k1, 0.5 * hstep));
        const k3 = f(add(p, k2, 0.5 * hstep));
        const k4 = f(add(p, k3, hstep));
        p = p.map((vv, j) => vv + (hstep / 6) * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
        // renormalize to suppress truncation leakage / roundoff drift
        let s = 0;
        for (let j = 0; j <= M; j++) s += Math.max(0, p[j]);
        if (s > 0) p = p.map((vv) => Math.max(0, vv) / s);
        t += hstep;
      }
    }

    // analytic Planck steady-state distribution, p_n^{ss} = (1−e^{−x}) e^{−n x}
    const pSS = new Array<number>(dim);
    const r = Math.exp(-x);
    for (let n = 0; n <= M; n++) pSS[n] = (1 - r) * Math.pow(r, n);

    return { M, dim, ts, meanNum, meanAna, varNum, snaps, pSS, T, NOUT, mean0 };
  }, [x, kappa, n0, Nmax, initMode, A, B, nbar]);

  // ── time trace: ⟨n⟩(t) numeric vs analytic, plus variance ───────────────────
  const meanLines = useMemo<Series[]>(() => {
    const num: [number, number][] = [];
    const ana: [number, number][] = [];
    for (let i = 0; i <= sim.NOUT; i += 2) {
      num.push([sim.ts[i], sim.meanNum[i]]);
      ana.push([sim.ts[i], sim.meanAna[i]]);
    }
    return [
      { data: num, color: "#4f46e5", width: 2.6, label: "⟨n⟩ numeric" },
      { data: ana, color: "#e11d48", width: 1.8, dashed: true, label: "n̄+(⟨n⟩₀−n̄)e^{−κt}" },
    ];
  }, [sim]);

  const varLines = useMemo<Series[]>(() => {
    const v: [number, number][] = [];
    for (let i = 0; i <= sim.NOUT; i += 2) v.push([sim.ts[i], sim.varNum[i]]);
    return [{ data: v, color: "#0891b2", width: 2.4, label: "Var(t)", fill: true }];
  }, [sim]);

  const yMaxMean = Math.max(sim.mean0, nbar, 1) * 1.2;
  const yMaxVar = Math.max(varThermal, 1, ...sim.varNum) * 1.2;

  // ── animated photon ladder: p_n(t) bars morphing toward the Planck curve ────
  const draw = ({ ctx, w, h, t }: { ctx: CanvasRenderingContext2D; w: number; h: number; t: number }) => {
    ctx.clearRect(0, 0, w, h);

    // sweep time through the precomputed snapshots (loop, then hold at steady state)
    const sweep = (t * (sim.T / 5)) % (sim.T * 1.25);
    const frac = Math.min(1, sweep / sim.T);
    const idx = Math.min(sim.NOUT, Math.max(0, Math.round(frac * sim.NOUT)));
    const p = sim.snaps[idx];
    const tNow = sim.ts[idx];

    // only draw the lower part of the ladder where probability lives, for clarity
    const nShow = Math.min(sim.M, Math.max(12, Math.ceil((nbar + 1) * 5), Math.ceil(sim.mean0 * 1.4)));
    const pmax = Math.max(
      0.05,
      ...p.slice(0, nShow + 1),
      ...sim.pSS.slice(0, nShow + 1)
    );

    const padL = 40;
    const padR = 16;
    const padT = 26;
    const padB = 28;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const bw = plotW / (nShow + 1);

    // axis baseline
    ctx.strokeStyle = "#9aa3b2";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, padT + plotH);
    ctx.lineTo(padL + plotW, padT + plotH);
    ctx.stroke();

    // live bars p_n(t)
    for (let n = 0; n <= nShow; n++) {
      const bx = padL + n * bw;
      const bh = (p[n] / pmax) * plotH;
      ctx.fillStyle = "#4f46e5";
      ctx.fillRect(bx + bw * 0.12, padT + plotH - bh, bw * 0.76, bh);
    }

    // overlay analytic Planck steady-state curve
    ctx.strokeStyle = "#e11d48";
    ctx.lineWidth = 2.2;
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    for (let n = 0; n <= nShow; n++) {
      const cx = padL + n * bw + bw / 2;
      const cy = padT + plotH - (sim.pSS[n] / pmax) * plotH;
      n === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // detailed-balance flux arrows on a representative pair (n0bar → around n̄)
    const npair = Math.min(nShow - 1, Math.max(1, Math.round(nbar)));
    const up = A * (npair + 1) * p[npair]; // 𝒜(n+1)p_n : emission n→n+1
    const dn = B * (npair + 1) * p[npair + 1]; // ℬ(n+1)p_{n+1} : absorption n+1→n
    const fluxMax = Math.max(up, dn, 1e-9);
    const ax = padL + npair * bw + bw;
    const ayUp = padT + 8;
    const ayDn = padT + 22;
    // up-flux (emission) arrow → right/up
    ctx.strokeStyle = `rgba(22,163,74,${0.35 + 0.55 * (up / fluxMax)})`;
    ctx.lineWidth = 1 + 4 * (up / fluxMax);
    ctx.beginPath();
    ctx.moveTo(ax - bw * 0.3, ayUp);
    ctx.lineTo(ax + bw * 0.3, ayUp);
    ctx.stroke();
    // down-flux (absorption) arrow ← left/down
    ctx.strokeStyle = `rgba(217,119,6,${0.35 + 0.55 * (dn / fluxMax)})`;
    ctx.lineWidth = 1 + 4 * (dn / fluxMax);
    ctx.beginPath();
    ctx.moveTo(ax - bw * 0.3, ayDn);
    ctx.lineTo(ax + bw * 0.3, ayDn);
    ctx.stroke();
    ctx.lineWidth = 1;

    // labels
    ctx.fillStyle = "#475569";
    ctx.font = "11px ui-sans-serif, system-ui";
    ctx.textAlign = "left";
    ctx.fillText(`p_n(t)  bars`, padL + 2, padT - 12);
    ctx.fillStyle = "#e11d48";
    ctx.fillText(`Planck p_n^{ss} (dashed)`, padL + 90, padT - 12);
    ctx.fillStyle = "#16a34a";
    ctx.textAlign = "right";
    ctx.fillText(`emission ↑ ${up.toFixed(3)}`, padL + plotW, padT - 12);
    ctx.fillStyle = "#d97706";
    ctx.fillText(`absorption ↓ ${dn.toFixed(3)}`, padL + plotW, padT - 1);

    ctx.fillStyle = "#5b6473";
    ctx.font = "10px ui-sans-serif, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("0", padL + bw / 2, padT + plotH + 14);
    ctx.fillText(String(nShow), padL + nShow * bw + bw / 2, padT + plotH + 14);
    ctx.fillText("photon number  n", padL + plotW / 2, padT + plotH + 26);

    // time banner
    ctx.fillStyle = "rgba(79,70,229,0.08)";
    ctx.fillRect(padL, padT + plotH - plotH, 0, 0); // no-op keeps tidy
    ctx.fillStyle = "#1b2330";
    ctx.font = "600 12px ui-sans-serif, system-ui";
    ctx.textAlign = "right";
    ctx.fillText(`(ν/Q)·t = ${(kappa * tNow).toFixed(2)}`, padL + plotW, padT + 36);
  };

  return (
    <div>
      <Canvas width={580} height={260} draw={draw} speed={1} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Mean ⟨n⟩(t): numeric vs analytic relaxation
          </div>
          <Plot
            width={320}
            height={220}
            xRange={[0, sim.T]}
            yRange={[0, yMaxMean]}
            xLabel="t  (units of 1/(ν/Q))"
            yLabel="⟨n⟩"
            lines={meanLines}
            markers={[{ y: nbar, color: "#16a34a", label: "n̄ (Bose–Einstein)" }]}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Variance → thermal n̄(n̄+1)
          </div>
          <Plot
            width={320}
            height={220}
            xRange={[0, sim.T]}
            yRange={[0, yMaxVar]}
            xLabel="t  (units of 1/(ν/Q))"
            yLabel="Var(n)"
            lines={varLines}
            markers={[{ y: varThermal, color: "#d97706", label: "n̄(n̄+1)" }]}
          />
        </div>
      </div>

      <Controls>
        <Slider
          label={String.raw`\hbar\omega_0/k_BT`}
          tex
          min={0.1}
          max={6}
          step={0.05}
          value={x}
          onChange={setX}
          unit="(hot → cold)"
        />
        <Slider
          label={String.raw`\nu/Q\ \text{(cavity decay)}`}
          tex
          min={0.05}
          max={5}
          step={0.05}
          value={kappa}
          onChange={setKappa}
          unit="1/time"
        />
        <Slider
          label={String.raw`\langle n\rangle_0\ \text{(initial mean)}`}
          tex
          min={0}
          max={30}
          step={1}
          value={n0}
          onChange={(v) => setN0(Math.round(v))}
          unit="photons"
          format={(v) => Math.round(v).toString()}
        />
        <Slider
          label={String.raw`N_{\max}\ \text{(ladder size)}`}
          tex
          min={20}
          max={120}
          step={1}
          value={Nmax}
          onChange={(v) => setNmax(Math.round(v))}
          unit="levels"
          format={(v) => Math.round(v).toString()}
        />
        <Segmented<InitMode>
          label="initial distribution"
          options={[
            { value: "fock", label: "Fock |⟨n⟩₀⟩" },
            { value: "poisson", label: "Poisson (coherent)" },
          ]}
          value={initMode}
          onChange={setInitMode}
        />
        <Readout label={String.raw`\bar n = 1/(e^{\hbar\omega_0/k_BT}-1)`} tex value={nbar.toFixed(3)} />
        <Readout label={String.raw`\mathcal{A}=(\nu/Q)\bar n`} tex value={A.toFixed(3)} />
        <Readout label={String.raw`\mathcal{B}=(\nu/Q)(\bar n+1)`} tex value={B.toFixed(3)} />
        <Readout label={String.raw`\mathcal{B}-\mathcal{A}=\nu/Q`} tex value={(B - A).toFixed(3)} />
        <Readout label={String.raw`\text{thermal Var}=\bar n(\bar n+1)`} tex value={varThermal.toFixed(3)} />
        <Readout
          label={String.raw`\langle n\rangle(\infty)-\bar n`}
          tex
          value={(sim.meanNum[sim.NOUT] - nbar).toFixed(4)}
        />
      </Controls>
    </div>
  );
}
