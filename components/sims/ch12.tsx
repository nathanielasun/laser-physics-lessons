"use client";

/**
 * Chapter XII — The Zeeman Laser: two circular polarizations competing in a
 * magnetic field.
 *
 * The two circular modes obey the Chapter-11 two-mode rate equations (Eq. 43):
 *
 *     dI_+/dt = 2 I_+ ( alpha_+ - beta_+ I_+ - theta_{+-} I_- )
 *     dI_-/dt = 2 I_- ( alpha_- - beta_- I_- - theta_{-+} I_+ )
 *
 * The magnetic field enters through the Zeeman splitting parameter
 *     delta(B) = (1/2)(omega_+ - omega_-)  ∝  mu_B g B / hbar,
 * which displaces the two Doppler-Gaussian gain curves oppositely:
 *     alpha_±(B) = a0 * exp( -((Delta_c ± delta)/ku)^2 ) - loss.
 * Self-saturation is Lorentzian-weighted; cross-saturation carries the sqrt(C)
 * factor so theta = sqrt(C) * beta (and the overlap falls off as |delta| grows):
 *     beta      = b0 * ( 1 + L(Delta_c) ),   L(x) = gamma^2/(gamma^2 + x^2)
 *     theta(B)  = sqrt(C) * b0 * ( 1 + L(2 delta) ).
 *
 * STEADY STATE (closed form, exactly reproducing Eq. 48). With beta_+ = beta_-
 * = beta and theta_{+-} = theta_{-+} = theta:
 *     I+ = (beta alpha+ - theta alpha-)/(beta^2 - theta^2),  and the mirror.
 * At alpha+ = alpha- = alpha this collapses to (alpha/beta)/(1 + sqrt C),
 * the magnetic-tuning-dip value. For C > 1, beta^2 - theta^2 < 0, so the
 * both-on solution goes negative -> rejected -> ONE mode survives at alpha/beta,
 * the other at 0. That sign flip at C = 1 IS the bistability.
 *
 * The coupling parameter is preset by the J-transition selector (Eq. 47):
 *     C = theta_{+-} theta_{-+} / (beta_+ beta_-)
 *       = 2.6  (J=1->0, strong, bistable),
 *         1.0  (J=1->2, neutral),
 *         0.228 (J=1->1, weak, He-Ne 6328 A).
 *
 * The polarization BEAT NOTE (Eq. 44 + anisotropy g_+- of Eq. 17) locks near
 * B = 0 in an Adler-type deadband and unlocks for larger B (Fig. 12-6):
 *     if |2 delta_beat| <= g_anis :  Delta_nu = 0          (locked)
 *     else                        :  Delta_nu = sign(delta) sqrt((2 delta_beat)^2 - g_anis^2).
 * Units are illustrative (as in the book's own figures); the Zeeman-to-beat
 * conversion is chosen so the lock is a visible fraction of the B sweep.
 *
 * Three linked panels:
 *   A. animated I_+ , I_- trajectory: RK4 of Eq. (43) to steady state, showing
 *      coexistence (C<1) or one mode winning (C>1, bistable),
 *   B. tuning panel: steady-state I_+(B), I_-(B) over the full sweep (Fig. 12-5),
 *   C. beat panel: Delta_nu(B) with the flat locked deadband then the S-curve
 *      (Fig. 12-6).
 */

import { useMemo, useState } from "react";
import { Canvas, Plot, Slider, Segmented, Controls, Readout, Series, Marker } from "@/components/sim";

// J-transition presets → benchmark coupling C (Eq. 47, used directly).
const J_PRESETS: { value: number; label: string; C: number; name: string }[] = [
  { value: 0, label: "J=1→0", C: 2.6, name: "strong (bistable)" },
  { value: 1, label: "J=1→2", C: 1.0, name: "neutral" },
  { value: 2, label: "J=1→1", C: 0.228, name: "weak · He–Ne 6328 Å" },
];

export default function Ch12Sim() {
  const [B, setB] = useState(0); // axial magnetic field, Gauss
  const [DeltaC, setDeltaC] = useState(0); // cavity detuning from zero-field line center, MHz
  const [Csel, setCsel] = useState(2); // J-transition index (0/1/2) → C
  const [a0, setA0] = useState(2.0); // peak unsaturated gain, 1/us
  const [loss, setLoss] = useState(0.6); // cavity loss nu/2Q (threshold), 1/us
  const [gAnis, setGAnis] = useState(40); // anisotropy coupling g_+- (lock half-width), kHz
  const [ku, setKu] = useState(500); // Doppler width, MHz
  const [gamma, setGamma] = useState(50); // homogeneous half-linewidth, MHz

  const C = J_PRESETS[Csel].C;
  const sqrtC = Math.sqrt(C);

  // Zeeman splitting delta(B), in MHz, for the GAIN-CURVE displacement.
  // mu_B g / h ≈ 1.4 MHz/G for g≈1; keep that physical slope for the dip width.
  const ZEEMAN_MHZ_PER_G = 1.4;
  const deltaMHz = (b: number) => ZEEMAN_MHZ_PER_G * b; // = (1/2)(omega_+ - omega_-)

  // The beat note uses an illustrative Zeeman→beat conversion so the locked
  // deadband (set by g_anis in kHz) is a visible fraction of the ±200 G sweep.
  const BEAT_KHZ_PER_G = 1.5; // 2*delta_beat in kHz per Gauss

  // ── coefficients of Eq. (43) as functions of B ───────────────────────────
  const Lor = (x: number) => (gamma * gamma) / (gamma * gamma + x * x);
  const b0 = 1; // self-saturation scale (arbitrary intensity units)
  const coeffs = (b: number) => {
    const d = deltaMHz(b);
    const aPlus = a0 * Math.exp(-(((DeltaC + d) / ku) ** 2)) - loss;
    const aMinus = a0 * Math.exp(-(((DeltaC - d) / ku) ** 2)) - loss;
    const beta = b0 * (1 + Lor(DeltaC));
    // cross-saturation: ratio to beta fixes C; overlap falls off as |2 delta| grows
    const overlap = (1 + Lor(2 * d)) / (1 + Lor(0));
    const theta = sqrtC * beta * overlap;
    return { aPlus, aMinus, beta, theta };
  };

  // ── steady-state intensities (closed form; reproduces Eq. 48) ─────────────
  // Returns the physically realized (stable) fixed point of Eq. (43).
  const steady = (b: number) => {
    const { aPlus, aMinus, beta, theta } = coeffs(b);
    const onPlus = aPlus > 0;
    const onMinus = aMinus > 0;
    if (!onPlus && !onMinus) return { Ip: 0, Im: 0, bistable: false };

    // The regime is fixed by the PRESET coupling C (angular momentum, hence
    // B-independent in the book), NOT by the sign of beta^2 - theta^2 — which
    // would let the suppressed mode reappear in the wings as theta(B) weakens.
    if (C < 1) {
      // Weak coupling: stable both-on solution wherever both are above their
      // own threshold; the B-dependent overlap in theta sculpts the dip.
      const det = beta * beta - theta * theta; // > 0 for C < 1
      if (onPlus && onMinus) {
        const Ip = Math.max(0, (beta * aPlus - theta * aMinus) / det);
        const Im = Math.max(0, (beta * aMinus - theta * aPlus) / det);
        return { Ip, Im, bistable: false };
      }
      // Only one mode above threshold: it runs alone, free of competition.
      if (onPlus) return { Ip: aPlus / beta, Im: 0, bistable: false };
      return { Ip: 0, Im: aMinus / beta, bistable: false };
    }
    // C >= 1 (neutral / strong): single-mode winner everywhere. The stronger
    // linear gain wins and suppresses the other — the bistable switch happens
    // at B = 0 when the detuning sign flips which gain curve is higher.
    const bistable = C > 1 && onPlus && onMinus;
    if (aPlus >= aMinus) return { Ip: onPlus ? aPlus / beta : 0, Im: 0, bistable };
    return { Ip: 0, Im: onMinus ? aMinus / beta : 0, bistable };
  };

  const cur = steady(B);
  const symVal = (() => {
    // The Eq.(48) symmetric value (alpha/beta)/(1+sqrt C) at the current B.
    const { aPlus, beta } = coeffs(B);
    const a = Math.max(0, aPlus);
    return a / beta / (1 + sqrtC);
  })();

  // ── B. tuning panel: steady-state I_±(B) over the full sweep (Fig. 12-5) ──
  const Bmin = -200;
  const Bmax = 200;
  const tuning = useMemo<Series[]>(() => {
    const N = 320;
    const xs: number[] = [];
    const ip: number[] = [];
    const im: number[] = [];
    const tot: number[] = [];
    for (let i = 0; i <= N; i++) {
      const b = Bmin + ((Bmax - Bmin) * i) / N;
      const s = steady(b);
      xs.push(b);
      ip.push(s.Ip);
      im.push(s.Im);
      tot.push(s.Ip + s.Im);
    }
    return [
      { x: xs, y: ip, color: "#4f46e5", width: 2.6, label: "I+" },
      { x: xs, y: im, color: "#e11d48", width: 2.6, dashed: true, label: "I−" },
      { x: xs, y: tot, color: "#94a3b8", width: 1.6, label: "I+ + I−" },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DeltaC, Csel, a0, loss, ku, gamma]);
  const tuningMax = useMemo(() => {
    let m = 0.1;
    tuning.forEach((s) => (s.y || []).forEach((v) => (m = Math.max(m, v))));
    return m * 1.15;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tuning]);
  const tuningMarkers: Marker[] = [{ x: B, color: "#0891b2", label: "current B", dashed: true }];

  // ── C. beat panel: Delta_nu(B) with locked deadband + S-curve (Fig. 12-6) ─
  const gAnisKHz = gAnis; // already in kHz
  const beatOf = (b: number) => {
    const twoDelta = BEAT_KHZ_PER_G * b; // = 2*delta_beat (kHz)
    if (Math.abs(twoDelta) <= gAnisKHz) return 0; // locked deadband
    return Math.sign(twoDelta) * Math.sqrt(twoDelta * twoDelta - gAnisKHz * gAnisKHz);
  };
  const beat = useMemo<Series[]>(() => {
    const N = 320;
    const xs: number[] = [];
    const dn: number[] = [];
    const ideal: number[] = [];
    for (let i = 0; i <= N; i++) {
      const b = Bmin + ((Bmax - Bmin) * i) / N;
      xs.push(b);
      dn.push(beatOf(b));
      ideal.push(BEAT_KHZ_PER_G * b); // bare Zeeman beat (no lock)
    }
    return [
      { x: xs, y: dn, color: "#0891b2", width: 2.8, label: "Δν (locked)" },
      { x: xs, y: ideal, color: "#94a3b8", width: 1.6, dashed: true, label: "bare Zeeman" },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gAnis]);
  const beatAbs = BEAT_KHZ_PER_G * Bmax * 1.05;
  const lockB = gAnisKHz / BEAT_KHZ_PER_G; // |B| below which it locks
  const curBeat = beatOf(B);
  const isLocked = Math.abs(curBeat) < 1e-9 && gAnisKHz > 0;
  const beatMarkers: Marker[] = [
    { x: B, color: "#4f46e5", label: "current B", dashed: true },
    { x: -lockB, color: "#16a34a", dashed: true },
    { x: lockB, color: "#16a34a", label: "lock edge", dashed: true },
  ];

  // ── A. animated trajectory: RK4 of Eq. (43) from a seeded state ───────────
  const draw = ({ ctx, w, h, t }: { ctx: CanvasRenderingContext2D; w: number; h: number; t: number }) => {
    ctx.clearRect(0, 0, w, h);
    const { aPlus, aMinus, beta, theta } = coeffs(B);

    // RK4 forward to wall-clock sim time t from a slightly asymmetric seed so
    // the bistable winner is decided dynamically (the stronger gain wins).
    const f = (Ip: number, Im: number) => ({
      dIp: 2 * Ip * (aPlus - beta * Ip - theta * Im),
      dIm: 2 * Im * (aMinus - beta * Im - theta * Ip),
    });
    const seedP = 0.05 + 0.002 * Math.max(0, aPlus);
    const seedM = 0.05;
    let Ip = seedP;
    let Im = seedM;
    const steps = Math.max(1, Math.round(t * 250));
    const dt = Math.min(t, 12) / Math.max(1, steps);
    for (let i = 0; i < steps; i++) {
      const k1 = f(Ip, Im);
      const k2 = f(Ip + 0.5 * dt * k1.dIp, Im + 0.5 * dt * k1.dIm);
      const k3 = f(Ip + 0.5 * dt * k2.dIp, Im + 0.5 * dt * k2.dIm);
      const k4 = f(Ip + dt * k3.dIp, Im + dt * k3.dIm);
      Ip += (dt / 6) * (k1.dIp + 2 * k2.dIp + 2 * k3.dIp + k4.dIp);
      Im += (dt / 6) * (k1.dIm + 2 * k2.dIm + 2 * k3.dIm + k4.dIm);
      Ip = Math.max(0, Ip);
      Im = Math.max(0, Im);
    }

    // layout: left = two glowing polarization "modes"; right = status panel.
    const scale = 1 / (tuningMax || 1);
    const drawMode = (cx: number, label: string, sub: string, val: number, color: string) => {
      const r = 10 + 46 * Math.min(1, val * scale);
      const g = ctx.createRadialGradient(cx, h * 0.42, 2, cx, h * 0.42, r);
      g.addColorStop(0, color + "cc");
      g.addColorStop(1, color + "00");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, h * 0.42, r, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, h * 0.42, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = "#1b2330";
      ctx.font = "600 15px ui-sans-serif, system-ui";
      ctx.textAlign = "center";
      ctx.fillText(label, cx, h * 0.74);
      ctx.fillStyle = "#5b6473";
      ctx.font = "12px ui-sans-serif, system-ui";
      ctx.fillText(sub, cx, h * 0.74 + 18);
    };
    drawMode(w * 0.16, "ê₊  (I+)", `I+ = ${Ip.toFixed(2)}`, Ip, "#4f46e5");
    drawMode(w * 0.38, "ê₋  (I−)", `I− = ${Im.toFixed(2)}`, Im, "#e11d48");

    // status panel
    const sx = w * 0.56;
    let sy = h * 0.22;
    ctx.textAlign = "left";
    const regime = C < 1 ? "WEAK · coexist" : C > 1 ? "STRONG · bistable" : "NEUTRAL";
    ctx.font = "600 17px ui-sans-serif, system-ui";
    ctx.fillStyle = C < 1 ? "#16a34a" : C > 1 ? "#e11d48" : "#d97706";
    ctx.fillText(regime, sx, sy);
    sy += 26;
    ctx.font = "13px ui-sans-serif, system-ui";
    ctx.fillStyle = "#5b6473";
    ctx.fillText(`${J_PRESETS[Csel].label}   C = ${C}`, sx, sy);
    sy += 22;
    if (C > 1 && Ip + Im > 1e-3) {
      const winner = Ip > Im ? "ê₊ wins, ê₋ suppressed" : "ê₋ wins, ê₊ suppressed";
      ctx.fillText(winner, sx, sy);
    } else if (Ip + Im < 1e-3) {
      ctx.fillText("below threshold", sx, sy);
    } else {
      ctx.fillText("both polarizations oscillate", sx, sy);
    }
    sy += 22;
    ctx.fillText(`α+ = ${aPlus.toFixed(2)}   α− = ${aMinus.toFixed(2)}  (1/µs)`, sx, sy);
    sy += 20;
    ctx.fillText(isLocked ? "beat LOCKED (Δν = 0)" : `beat Δν = ${curBeat.toFixed(1)} kHz`, sx, sy);
  };

  return (
    <div>
      <Canvas width={560} height={250} draw={draw} speed={1} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Magnetic tuning dip: steady-state I± vs B (Fig. 12-5)
          </div>
          <Plot
            width={300}
            height={230}
            xRange={[Bmin, Bmax]}
            yRange={[0, tuningMax]}
            xLabel="B  (Gauss)"
            yLabel="intensity I±"
            lines={tuning}
            markers={tuningMarkers}
          />
        </div>
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: 4 }}>
            Polarization beat Δν vs B: lock then unlock (Fig. 12-6)
          </div>
          <Plot
            width={300}
            height={230}
            xRange={[Bmin, Bmax]}
            yRange={[-beatAbs, beatAbs]}
            xLabel="B  (Gauss)"
            yLabel="Δν  (kHz)"
            lines={beat}
            markers={beatMarkers}
          />
        </div>
      </div>

      <Controls>
        <Segmented<number>
          label="J-transition (sets C)"
          options={J_PRESETS.map((p) => ({ value: p.value, label: p.label }))}
          value={Csel}
          onChange={setCsel}
        />
        <Slider label={String.raw`B\ \text{(magnetic field)}`} tex min={-200} max={200} step={1} value={B} onChange={setB} unit="G" />
        <Slider label={String.raw`\Delta_c\ \text{(cavity detuning)}`} tex min={-400} max={400} step={2} value={DeltaC} onChange={setDeltaC} unit="MHz" />
        <Slider label={String.raw`a_0\ \text{(peak gain)}`} tex min={0} max={5} step={0.05} value={a0} onChange={setA0} unit="1/µs" />
        <Slider label={String.raw`\text{loss }\nu/2Q`} tex min={0} max={3} step={0.05} value={loss} onChange={setLoss} unit="1/µs" />
        <Slider label={String.raw`g_{+-}\ \text{(anisotropy / lock)}`} tex min={0} max={200} step={2} value={gAnis} onChange={setGAnis} unit="kHz" />
        <Slider label={String.raw`Ku\ \text{(Doppler width)}`} tex min={100} max={1500} step={10} value={ku} onChange={setKu} unit="MHz" />
        <Slider label={String.raw`\gamma\ \text{(homog. half-width)}`} tex min={5} max={200} step={1} value={gamma} onChange={setGamma} unit="MHz" />

        <Readout
          label={String.raw`C=\theta_{+-}\theta_{-+}/(\beta_+\beta_-)`}
          tex
          value={`${C}  (${J_PRESETS[Csel].name})`}
        />
        <Readout label={String.raw`I_+,\,I_-\ \text{at }B`} tex value={`${cur.Ip.toFixed(3)}, ${cur.Im.toFixed(3)}`} />
        <Readout label={String.raw`I_++I_-`} tex value={(cur.Ip + cur.Im).toFixed(3)} />
        <Readout label={String.raw`\dfrac{\alpha/\beta}{1+\sqrt C}\ \text{(Eq. 48)}`} tex value={symVal.toFixed(3)} />
        <Readout label={String.raw`\Delta\nu=\nu_+-\nu_-`} tex value={isLocked ? "0 (locked)" : `${curBeat.toFixed(1)} kHz`} />
        <Readout label={String.raw`\text{lock half-width }|B|`} tex value={gAnisKHz > 0 ? `${lockB.toFixed(1)} G` : "—"} />
      </Controls>
    </div>
  );
}
