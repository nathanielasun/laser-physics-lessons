import {
  Lesson,
  Section,
  Lede,
  Intuition,
  Callout,
  Derivation,
  Step,
  KeyResult,
  Tex,
  EqBlock,
  Figure,
  SimFrame,
} from "@/components/lesson";
import AppDSim from "@/components/sims/appD";

export default function Page() {
  return (
    <Lesson slug="appD">
      <Lede>
        In a gas laser the atoms do not sit still — they fly around at thermal speeds, and each moving atom sees the
        standing-wave field <em>Doppler-shifted</em> by <Tex>{String.raw`\pm Kv`}</Tex>. Different velocity groups
        resonate at different cavity tunings, so the line is <strong>inhomogeneously broadened</strong>. This appendix is
        the engine room: it takes the multimode perturbation expansion of the density matrix and grinds out the
        third-order polarization for a full Maxwellian. The payoff is a set of saturation coefficients — and the famous{" "}
        <strong>Lamb dip</strong>, where the gain saturates twice as hard at line center because the two
        oppositely-moving velocity groups overlap. The deep trick: a &ldquo;perturbation tree&rdquo; lets you read a
        horrendous triple-time integral off by inspection, and every one of those integrals collapses onto a single
        special function — the plasma dispersion function <Tex>{String.raw`Z`}</Tex>.
      </Lede>

      <Section title="Why moving atoms force a new calculation">
        <Intuition>
          Everything starts from the off-diagonal density-matrix element{" "}
          <Tex>{String.raw`\rho_{ab}(z,v,t)`}</Tex>, the source of the macroscopic polarization that drives the field.
          For a <em>stationary</em>-atom (homogeneous) medium you can do the time integrals once and forget the atoms
          move. In a gas you cannot: the mode functions <Tex>{String.raw`U_n(z)`}</Tex> are sampled along the atom&rsquo;s
          moving trajectory <Tex>{String.raw`z - v\tau`}</Tex>, so the spatial phase{" "}
          <Tex>{String.raw`K_n z`}</Tex> becomes a <em>time-dependent</em> Doppler phase{" "}
          <Tex>{String.raw`K_n v\tau`}</Tex>. The strategy is to keep <Tex>{String.raw`v`}</Tex> as a parameter,
          perform <em>all</em> the time integrals first, and integrate over the Maxwellian{" "}
          <Tex>{String.raw`W(v)`}</Tex> only at the very end — simpler and far more general than the homogeneous
          shortcut.
        </Intuition>
        <p>
          The calculation is a perturbation expansion in powers of the field amplitude: zeroth order is the
          velocity-dependent inversion <Tex>{String.raw`N(z,v,t)`}</Tex>; first order is the linear polarization
          (gain/absorption); second order is saturation of the populations (hole burning); third order is the leading
          nonlinear polarization that sets steady-state intensities and frequencies. Write the multiple times as
          differences,
        </p>
        <EqBlock label="10.47">{String.raw`\tau'=t-t',\qquad \tau''=t'-t'',\qquad \tau'''=t''-t''', \quad\Rightarrow\quad t'''=t-\tau'-\tau''-\tau'''.`}</EqBlock>
        <p>
          The formal integral for the coherence, with <Tex>{String.raw`z'=z-v\tau'`}</Tex> and{" "}
          <Tex>{String.raw`t'=t-\tau'`}</Tex>, is
        </p>
        <EqBlock label="10.48">{String.raw`\rho_{ab}(z,v,t)=\frac{i}{\hbar}\int_0^{\infty}\!dt'\,\exp[-(i\omega+\gamma)\tau']\,\mathscr{V}_{ab}(z',t')\,[\rho_{aa}(z',v,t')-\rho_{bb}(z',v,t')],`}</EqBlock>
        <p>
          where <Tex>{String.raw`\omega`}</Tex> is the transition frequency, <Tex>{String.raw`\gamma`}</Tex> the dipole
          decay rate, and <Tex>{String.raw`\mathscr{V}_{ab}`}</Tex> the dipole interaction. Iterating this single
          equation <em>is</em> the entire expansion. Its seed is the unperturbed inversion,
        </p>
        <EqBlock label="10.49">{String.raw`\rho_{aa}^{(0)}-\rho_{bb}^{(0)}=\gamma_a^{-1}\lambda_a-\gamma_b^{-1}\lambda_b\equiv N(z,v,t),`}</EqBlock>
        <p>
          with the excitation rates <Tex>{String.raw`\lambda_a,\lambda_b`}</Tex> now velocity-dependent. Replacing the
          population difference in (10.48) by <Tex>{String.raw`N`}</Tex> gives the first-order coherence — the linear
          gain:
        </p>
        <KeyResult
          number="10.50"
          label="First-order coherence (linear gain/absorption)"
          eq={String.raw`\rho_{ab}^{(1)}(z,v,t)=\frac{i}{\hbar}\,N(z,v,t)\int_0^{\infty}\!dt'\,\exp[-(i\omega+\gamma)\tau']\,\mathscr{V}_{ab}(z',t').`}
        />
        <p>
          Re-inserting <Tex>{String.raw`\rho_{ab}^{(1)}`}</Tex> into the diagonal equations and back into (10.48) twice
          more yields the <strong>third-order coherence</strong>, the central object of this appendix:
        </p>
        <KeyResult
          number="10.53"
          label="Third-order coherence (the triple-time integral)"
          eq={String.raw`\rho_{ab}^{(3)}=-\,i\hbar^{-3}N\!\int_0^{\infty}\!\!dt'\!\int_0^{\infty}\!\!dt''\!\int_0^{\infty}\!\!dt'''\,e^{-(i\omega+\gamma)\tau'}\,\mathscr{V}_{ab}(z',t')\,[e^{-\gamma_a\tau''}+e^{-\gamma_b\tau''}]\,\{\mathscr{V}_{ab}(z'',t'')\,\mathscr{V}_{ba}(z''',t''')\,e^{(i\omega-\gamma)\tau'''}\}+\text{c.c.}`}
          note={
            <>
              Three interaction vertices, three time integrals. The bracket{" "}
              <Tex>{String.raw`e^{-\gamma_a\tau''}+e^{-\gamma_b\tau''}`}</Tex> is the decay of the upper and lower
              populations during the intermediate interval.
            </>
          }
        />
        <Derivation title="How the ladder is built">
          <Step title="Iterate the formal integral">
            Start from <Tex>{String.raw`\rho_{ab}`}</Tex> in (10.48). Replace the population difference by its
            zeroth-order value <Tex>{String.raw`N`}</Tex> to get <Tex>{String.raw`\rho_{ab}^{(1)}`}</Tex> (10.50).
            Feed <Tex>{String.raw`\rho_{ab}^{(1)}`}</Tex> into the diagonal (population) equations to obtain the
            second-order populations, then insert those back into (10.48) to reach{" "}
            <Tex>{String.raw`\rho_{ab}^{(3)}`}</Tex> (10.53). Each order adds one factor of the field{" "}
            <Tex>{String.raw`E`}</Tex> and one time integration.
          </Step>
          <Step title="Identify what makes the gas case hard">
            <Tex>{String.raw`\mathscr{V}_{ab}(z',t')`}</Tex> carries the mode function{" "}
            <Tex>{String.raw`U_n(z'-v\tau')`}</Tex> at the displaced position, so the spatial phase{" "}
            <Tex>{String.raw`K_n z' = K_n(z-v\tau')`}</Tex> becomes a time-dependent Doppler phase{" "}
            <Tex>{String.raw`K_n v\tau'`}</Tex> inside the integrand. This is exactly the coupling between velocity and
            the time integrals that blocks the homogeneous shortcut.
          </Step>
        </Derivation>
      </Section>

      <Section title="Second-order populations: hole burning">
        <Intuition>
          A strong field depletes the inversion of exactly those velocity groups that are resonant with it. Because a
          cavity standing wave is the sum of two oppositely-running waves, an atom of velocity{" "}
          <Tex>{String.raw`v`}</Tex> is resonant with one wave at <Tex>{String.raw`+Kv`}</Tex> and the other at{" "}
          <Tex>{String.raw`-Kv`}</Tex>: <strong>two holes</strong> are burned symmetrically into the Maxwellian. As the
          cavity is tuned toward line center the two holes slide together and merge into one deep hole at{" "}
          <Tex>{String.raw`v=0`}</Tex> — this merger is the seed of the Lamb dip.
        </Intuition>
        <p>
          Before third order, compute the second-order population difference{" "}
          <Tex>{String.raw`\rho_{aa}^{(2)}-\rho_{bb}^{(2)}`}</Tex> as a double-time integral, with the{" "}
          <Tex>{String.raw`\gamma_a`}</Tex> term plus the same with <Tex>{String.raw`\gamma_a\to\gamma_b`}</Tex>:
        </p>
        <EqBlock label="10.51–52">{String.raw`\rho_{aa}^{(2)}-\rho_{bb}^{(2)}=-\hbar^{-2}N\!\int_0^{\infty}\!\!dt'\!\int_0^{\infty}\!\!dt''\,e^{-\gamma_a\tau'}\,\mathscr{V}_{ab}(z',t')\,\mathscr{V}_{ba}(z'',t'')\,e^{(i\omega-\gamma)\tau''}+\text{c.c.}\;\;(\gamma_a\!\to\!\gamma_b).`}</EqBlock>
        <p>
          Inserting the field and summing over modes <Tex>{String.raw`\rho,\sigma`}</Tex> gives the explicit result.
          Line&nbsp;1 is the mode-sum prefactor with its beat phases:
        </p>
        <EqBlock label="D-1a">{String.raw`(\rho_{aa}^{(2)}-\rho_{bb}^{(2)})=-\tfrac14\Big(\tfrac{\wp}{\hbar}\Big)^2 N\sum_{\rho}\sum_{\sigma}E_\rho E_\sigma\,\exp\!\big[i\big((\nu_\rho-\nu_\sigma)t'+\phi_\rho-\phi_\sigma\big)\big]`}</EqBlock>
        <EqBlock label="D-1b">{String.raw`\times\int_{-\infty}^{t'}\!\!dt''\!\int_{-\infty}^{t''}\!\!dt'''\,\Big\{e^{-(i\nu_\rho-i\nu_\sigma+\gamma_a)\tau''}+e^{-(i\nu_\rho-i\nu_\sigma+\gamma_b)\tau''}\Big\}`}</EqBlock>
        <EqBlock label="D-1c">{String.raw`\times\Big\{e^{-(i\omega-i\nu_\sigma+\gamma)\tau'''}+e^{-(i\nu_\rho-i\omega+\gamma)\tau'''}\Big\}`}</EqBlock>
        <EqBlock label="D-1d">{String.raw`\times\tfrac12\Big\{\cos[(K_\rho-K_\sigma)z']\cos(Kv\tau''')-\cos[(K_\rho+K_\sigma)z']\cos(2Kv\tau''+Kv\tau''')\Big\}.`}</EqBlock>
        <p>
          Line&nbsp;4 is the spatial / Doppler structure. The <Tex>{String.raw`(K_\rho-K_\sigma)`}</Tex> term is slowly
          varying and survives; the <Tex>{String.raw`(K_\rho+K_\sigma)`}</Tex> term, riding the fast{" "}
          <Tex>{String.raw`\cos(2Kv\tau''+Kv\tau''')`}</Tex>, averages to zero for any appreciable velocity.
        </p>
        <Derivation title="Reducing the standing-wave products" defaultOpen={false}>
          <Step title="Choose convenient indices">
            Use <Tex>{String.raw`\rho`}</Tex> for <Tex>{String.raw`\mathscr{V}_{ba}`}</Tex> and{" "}
            <Tex>{String.raw`\sigma`}</Tex> for <Tex>{String.raw`\mathscr{V}_{ab}`}</Tex> so the phase factors match.
            Apply the trig addition formulas to the products{" "}
            <Tex>{String.raw`U_\rho(z'-v\tau'')\,U_\sigma(z'-v\tau''-v\tau''')`}</Tex> and discard functions odd in{" "}
            <Tex>{String.raw`v`}</Tex> (they integrate to zero against the even Maxwellian).
          </Step>
          <Step title="Drop the rapidly varying spatial term">
            The <Tex>{String.raw`\cos[(K_\rho+K_\sigma)z']`}</Tex> piece carries{" "}
            <Tex>{String.raw`\cos(2Kv\tau''+Kv\tau''')`}</Tex>, which oscillates fast in{" "}
            <Tex>{String.raw`\tau''`}</Tex> and averages out. Retaining only the{" "}
            <Tex>{String.raw`\cos[(K_\rho-K_\sigma)z']`}</Tex> part and setting{" "}
            <Tex>{String.raw`v=0`}</Tex> recovers the stationary standing-wave product{" "}
            <Tex>{String.raw`\sin K_\rho z\,\sin K_\sigma z`}</Tex>, consistent with (9.10).
          </Step>
        </Derivation>
      </Section>

      <Section title="Third-order polarization & the perturbation tree">
        <Intuition>
          The third-order polarization <Tex>{String.raw`\mathscr{P}_n^{(3)}`}</Tex> is what saturates the laser and
          sets its steady-state intensities and locked frequencies. Substituting the third-order coherence into the
          projection onto mode <Tex>{String.raw`n`}</Tex> produces a <em>quadruple</em> mode sum and a triple-time,
          single-velocity integral with four mode functions. Rather than expand by brute force, draw a{" "}
          <strong>perturbation tree</strong>: vertically connected boxes multiply (one &ldquo;limb&rdquo;), parallel
          branches add. Four limbs <Tex>{String.raw`l=1\ldots4`}</Tex> are the four terms, and after a trig reduction
          the whole answer can be written <em>by inspection</em> as a sum of standard integrals{" "}
          <Tex>{String.raw`T_{lw}`}</Tex>.
        </Intuition>
        <p>
          Project the coherence onto cavity mode <Tex>{String.raw`n`}</Tex> (normalization{" "}
          <Tex>{String.raw`\mathcal{N}`}</Tex>, length <Tex>{String.raw`L`}</Tex>):
        </p>
        <EqBlock>{String.raw`\mathscr{P}_n^{(3)}=2\wp\,e^{i\nu_n t+i\phi_n}\!\int_{-\infty}^{\infty}\!dv\,\frac{1}{\mathcal{N}}\int_0^{L}\!dz\,U_n^{*}(z)\,\rho_{ab}^{(3)}(z,v,t).`}</EqBlock>
        <p>Written out, with the Maxwellian <Tex>{String.raw`W(v)`}</Tex> and combined phase{" "}
          <Tex>{String.raw`\Psi_{n\mu\rho\sigma}`}</Tex>, this is</p>
        <EqBlock label="D-2a">{String.raw`\mathscr{P}_n^{(3)}=\tfrac14 i\wp^4\hbar^{-3}\!\sum_{\mu}\sum_{\rho}\sum_{\sigma}E_\mu E_\rho E_\sigma\,e^{i\Psi_{n\mu\rho\sigma}}\frac{1}{\mathcal{N}}\!\int_0^{L}\!\!dz\,N(z)U_n^{*}(z)\!\int_{-\infty}^{\infty}\!\!dv\,W(v)\!\int_0^{\infty}\!\!\!d\tau'\!\int_0^{\infty}\!\!\!d\tau''\!\int_0^{\infty}\!\!\!d\tau'''\,e^{-i(\omega-\nu_\mu+\nu_\rho-\nu_\sigma)\tau'-\gamma\tau'}`}</EqBlock>
        <EqBlock label="D-2b">{String.raw`\times\Big\{e^{-i(\nu_\rho-\nu_\sigma)\tau''-\gamma_a\tau''}+e^{-i(\nu_\rho-\nu_\sigma)\tau''-\gamma_b\tau''}\Big\}\,U_\mu(z-v\tau')`}</EqBlock>
        <EqBlock label="D-2c">{String.raw`\times\Big\{e^{-i(\omega-\nu_\sigma)\tau'''-\gamma\tau'''}\,U_\rho^{*}(z-v\tau'-v\tau'')\,U_\sigma(z-v\tau'-v\tau''-v\tau''')+e^{-i(\nu_\rho-\omega)\tau'''-\gamma\tau'''}\,U_\sigma(z-v\tau'-v\tau'')\,U_\rho^{*}(z-v\tau'-v\tau''-v\tau''')\Big\}.`}</EqBlock>
        <p>
          The product of four mode functions reduces, by trig identities (dropping terms odd in{" "}
          <Tex>{String.raw`v`}</Tex> or rapidly varying in <Tex>{String.raw`z`}</Tex>), to three spatial wavevectors
          times three Doppler-phase combinations:
        </p>
        <EqBlock label="D-3">{String.raw`\tfrac18\Big\{\cos[(K_n-K_\mu-K_\rho+K_\sigma)z]\cos[Kv(\tau'''-\tau')]+\cos[(K_n-K_\mu+K_\rho-K_\sigma)z]\cos[Kv(\tau'''+\tau')]+\cos[(K_n+K_\mu-K_\rho-K_\sigma)z]\cos[Kv(\tau'''+2\tau''+\tau')]\Big\}.`}</EqBlock>
        <p>
          The second four-<Tex>{String.raw`U`}</Tex> product is this with{" "}
          <Tex>{String.raw`\rho,\sigma`}</Tex> interchanged. Substituting back and replacing{" "}
          <Tex>{String.raw`\cos[Kv(\tau'''\pm\tau')]`}</Tex> by{" "}
          <Tex>{String.raw`e^{-iKv(\tau'''\pm\tau')}`}</Tex> (Prob.&nbsp;10-9 — the velocity integrand is even against{" "}
          <Tex>{String.raw`W(v)`}</Tex>) collapses the entire result to a compact double sum:
        </p>
        <KeyResult
          number="D-4"
          label="Assembled third-order polarization"
          eq={String.raw`\mathscr{P}_n^{(3)}(t)=\tfrac{1}{16}\wp^4(\hbar^3 Ku)^{-1}\!\sum_{\mu}\sum_{\rho}\sum_{\sigma}E_\mu E_\rho E_\sigma\,e^{i\Psi_{n\mu\rho\sigma}}\sum_{l=1}^{4}\sum_{w=1}^{3}T_{lw}.`}
          note={
            <>
              A quadruple mode sum times a double sum over the four tree limbs <Tex>{String.raw`l`}</Tex> and three
              Doppler-phase choices <Tex>{String.raw`w`}</Tex> of the standard integrals{" "}
              <Tex>{String.raw`T_{lw}`}</Tex>. Throughout, the relation{" "}
              <Tex>{String.raw`n=\mu-\rho+\sigma`}</Tex> holds for all significant terms.
            </>
          }
        />
        <p>
          The three Doppler-phase combinations of (D-3) are encoded in the sign matrix that multiplies{" "}
          <Tex>{String.raw`Kv`}</Tex> in the three time slots:
        </p>
        <KeyResult
          number="D-6"
          label="Sign matrix s_{wk}"
          eq={String.raw`s=\begin{pmatrix}-1&0&1\\[2pt]1&0&1\\[2pt]1&2&1\end{pmatrix}\qquad(\text{rows }w=1,2,3;\ \text{columns }k=1,2,3).`}
        />

        <Figure
          caption={
            <>
              <strong>Fig.&nbsp;10-4 — the perturbation tree for{" "}
              <Tex>{String.raw`\rho_{ab}^{(3)}`}</Tex>.</strong> Boxes connected vertically multiply (a limb); parallel
              branches add. The four limbs <Tex>{String.raw`l=1\ldots4`}</Tex> are the four terms in (D-4). Each vertex
              is an operator — <Tex>{String.raw`e_{ab}`}</Tex> a coherence propagation,{" "}
              <Tex>{String.raw`e_{aa},e_{bb}`}</Tex> a population propagation — and{" "}
              <Tex>{String.raw`N`}</Tex> the unperturbed inversion. Reading the tree gives{" "}
              <Tex>{String.raw`N_{lw}`}</Tex> (Table D-1) and <Tex>{String.raw`\upsilon_{lk}`}</Tex> (Table D-2)
              without further algebra.
            </>
          }
        >
          <svg viewBox="0 0 660 300" width="100%" role="img" aria-label="Perturbation tree with four limbs">
            <defs>
              <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
              </marker>
            </defs>
            {/* root */}
            <rect x="285" y="14" width="90" height="30" rx="5" fill="#eef2ff" stroke="#4f46e5" />
            <text x="330" y="33" textAnchor="middle" fontSize="14" fill="#1f2733">ρ_ab^(3)</text>
            {/* connector to root */}
            <line x1="330" y1="44" x2="330" y2="66" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ah)" />
            <rect x="285" y="66" width="90" height="28" rx="5" fill="#fff" stroke="#94a3b8" />
            <text x="330" y="84" textAnchor="middle" fontSize="13" fill="#1f2733">e_ab</text>
            {/* fan to four limbs */}
            {[80, 240, 420, 580].map((cx, i) => (
              <g key={i}>
                <line x1="330" y1="94" x2={cx + 50} y2="118" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#ah)" />
                {/* limb label */}
                <text x={cx + 50} y="112" textAnchor="middle" fontSize="12" fontWeight="600" fill="#4f46e5">
                  {`l = ${i + 1}`}
                </text>
                {/* population box */}
                <rect x={cx} y="118" width="100" height="26" rx="5" fill="#ecfeff" stroke="#0891b2" />
                <text x={cx + 50} y="135" textAnchor="middle" fontSize="12" fill="#1f2733">
                  {i < 2 ? "e_aa  (γ_a)" : "e_bb  (γ_b)"}
                </text>
                <line x1={cx + 50} y1="144" x2={cx + 50} y2="166" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#ah)" />
                {/* coherence box */}
                <rect x={cx} y="166" width="100" height="26" rx="5" fill="#fff" stroke="#94a3b8" />
                <text x={cx + 50} y="183" textAnchor="middle" fontSize="12" fill="#1f2733">e_ab</text>
                <line x1={cx + 50} y1="192" x2={cx + 50} y2="214" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#ah)" />
                {/* inversion */}
                <rect x={cx} y="214" width="100" height="26" rx="5" fill="#fef9c3" stroke="#d97706" />
                <text x={cx + 50} y="231" textAnchor="middle" fontSize="13" fill="#1f2733">N(z,v,t)</text>
              </g>
            ))}
            <text x="330" y="270" textAnchor="middle" fontSize="12" fill="#5b6473">
              vertical = multiply (one limb) · horizontal fan = add the four terms
            </text>
            <text x="330" y="288" textAnchor="middle" fontSize="11" fill="#94a3b8">
              limbs 1,2 carry the upper-level decay γ_a · limbs 3,4 the lower-level decay γ_b
            </text>
          </svg>
        </Figure>

        <Callout kind="insight" title="The perturbation tree (Fig. 10-4)">
          A diagram for <Tex>{String.raw`\rho_{ab}^{(3)}`}</Tex>: boxes connected vertically multiply (a limb), parallel
          branches add. The four limbs are the four terms. The vertex operators are{" "}
          <Tex>{String.raw`e_{aa}=(i/\hbar)\!\int\! e^{-\gamma_a\tau}`}</Tex>,{" "}
          <Tex>{String.raw`e_{ab}=-e_{ba}^{*}=(i/\hbar)\!\int\! e^{-(i\omega+\gamma)\tau}`}</Tex>, and{" "}
          <Tex>{String.raw`N`}</Tex> the unperturbed inversion. The tree lets you write the answer straight into the
          tables — no further algebra. This bookkeeping is what makes the multimode ring laser and Zeeman ring laser
          tractable, where brute force is hopeless.
        </Callout>

        <Callout kind="insight" title="Tables D-1 and D-2 — read off the limbs">
          <p style={{ marginTop: 0 }}>
            <strong>Table D-1 — excitation factors <Tex>{String.raw`N_{lw}`}</Tex></strong> (in terms of the inversion
            Fourier components; <Tex>{String.raw`\bar N`}</Tex> is the spatial average,{" "}
            <Tex>{String.raw`N_{2m}`}</Tex> the <Tex>{String.raw`m`}</Tex>-th spatial harmonic, from{" "}
            <Tex>{String.raw`N_{21}`}</Tex> of (9.16)):
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "6px 10px", borderBottom: "1px solid #cbd5e1" }}>
                    <Tex>{String.raw`l`}</Tex>
                  </th>
                  <th style={{ textAlign: "left", padding: "6px 10px", borderBottom: "1px solid #cbd5e1" }}>
                    <Tex>{String.raw`w=1`}</Tex>
                  </th>
                  <th style={{ textAlign: "left", padding: "6px 10px", borderBottom: "1px solid #cbd5e1" }}>
                    <Tex>{String.raw`w=2`}</Tex>
                  </th>
                  <th style={{ textAlign: "left", padding: "6px 10px", borderBottom: "1px solid #cbd5e1" }}>
                    <Tex>{String.raw`w=3`}</Tex>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 10px" }}>1</td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`N_{2(\rho-\sigma)}`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\bar N`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`N_{2(\rho-\mu)}`}</Tex></td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px" }}>2</td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\bar N`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`N_{2(\rho-\sigma)}`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`N_{2(\rho-\mu)}`}</Tex></td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px" }}>3</td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\bar N`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`N_{2(\rho-\sigma)}`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`N_{2(\rho-\mu)}`}</Tex></td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px" }}>4</td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`N_{2(\rho-\sigma)}`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\bar N`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`N_{2(\nu-\mu)}`}</Tex></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>Table D-2 — complex frequencies <Tex>{String.raw`\upsilon_{lk}`}</Tex></strong> (column 1 is common
            to all limbs; columns 2,3 differ by level and by the{" "}
            <Tex>{String.raw`\rho\!\leftrightarrow\!\sigma`}</Tex> interchange):
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "6px 10px", borderBottom: "1px solid #cbd5e1" }}>
                    <Tex>{String.raw`l`}</Tex>
                  </th>
                  <th style={{ textAlign: "left", padding: "6px 10px", borderBottom: "1px solid #cbd5e1" }}>
                    <Tex>{String.raw`\upsilon_{l1}`}</Tex>
                  </th>
                  <th style={{ textAlign: "left", padding: "6px 10px", borderBottom: "1px solid #cbd5e1" }}>
                    <Tex>{String.raw`\upsilon_{l2}`}</Tex>
                  </th>
                  <th style={{ textAlign: "left", padding: "6px 10px", borderBottom: "1px solid #cbd5e1" }}>
                    <Tex>{String.raw`\upsilon_{l3}`}</Tex>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 10px" }}>1</td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma+i(\omega-\nu_\mu+\nu_\rho-\nu_\sigma)`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma_a+i(\nu_\rho-\nu_\sigma)`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma+i(\omega-\nu_\sigma)`}</Tex></td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px" }}>2</td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma+i(\omega-\nu_\mu+\nu_\rho-\nu_\sigma)`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma_a+i(\nu_\rho-\nu_\sigma)`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma+i(\nu_\rho-\omega)`}</Tex></td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px" }}>3</td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma+i(\omega-\nu_\mu+\nu_\rho-\nu_\sigma)`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma_b+i(\nu_\rho-\nu_\sigma)`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma+i(\nu_\rho-\omega)`}</Tex></td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 10px" }}>4</td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma+i(\omega-\nu_\mu+\nu_\rho-\nu_\sigma)`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma_b+i(\nu_\rho-\nu_\sigma)`}</Tex></td>
                  <td style={{ padding: "6px 10px" }}><Tex>{String.raw`\gamma+i(\omega-\nu_\sigma)`}</Tex></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Callout>

        <Derivation title="Assemble the polarization by inspection" defaultOpen={false}>
          <Step title="Substitute the population and project">
            Insert the perturbation energy into (10.53) for{" "}
            <Tex>{String.raw`\rho_{ab}^{(3)}`}</Tex> with the tree subscripts, then project with{" "}
            <Tex>{String.raw`U_n^{*}(z)`}</Tex>. This yields the quadruple sum and triple-time integral (D-2).
          </Step>
          <Step title="Reduce the four-U product">
            Apply addition formulas to the product of four mode functions; neglect terms odd in{" "}
            <Tex>{String.raw`v`}</Tex> and rapidly varying in <Tex>{String.raw`z`}</Tex> to reach the three-cosine
            form (D-3). The second product is the first with{" "}
            <Tex>{String.raw`\rho\!\leftrightarrow\!\sigma`}</Tex>.
          </Step>
          <Step title="Convert cosines to exponentials">
            Replace <Tex>{String.raw`\cos[Kv(\tau'''\pm\tau')]`}</Tex> by{" "}
            <Tex>{String.raw`e^{-iKv(\tau'''\pm\tau')}`}</Tex> (Prob.&nbsp;10-9). This linearizes the velocity
            dependence so the <Tex>{String.raw`v`}</Tex>-integral becomes Gaussian.
          </Step>
          <Step title="Read off the tables">
            Identify the four limbs; for each, pull <Tex>{String.raw`N_{lw}`}</Tex> from Table D-1, the three complex
            frequencies <Tex>{String.raw`\upsilon_{l1},\upsilon_{l2},\upsilon_{l3}`}</Tex> from Table D-2, and the
            Doppler signs from row <Tex>{String.raw`w`}</Tex> of the matrix (D-6). Using{" "}
            <Tex>{String.raw`n=\mu-\rho+\sigma`}</Tex> simplifies the subscripts.
          </Step>
        </Derivation>
      </Section>

      <Section title="Evaluating T_{lw} with the plasma dispersion function Z">
        <Intuition>
          Here is the single most important reduction: every triple-time, single-velocity integral{" "}
          <Tex>{String.raw`T_{lw}`}</Tex> collapses onto the plasma dispersion function{" "}
          <Tex>{String.raw`Z`}</Tex>. Do the three time integrals first (giving three simple poles in{" "}
          <Tex>{String.raw`v`}</Tex>), then the Gaussian velocity integral, then partial-fraction into a sum of{" "}
          <Tex>{String.raw`Z`}</Tex>&rsquo;s. The argument of <Tex>{String.raw`Z`}</Tex> is a complex frequency{" "}
          <Tex>{String.raw`\upsilon=\gamma+i(\omega-\nu)`}</Tex> that bundles the homogeneous decay (real part) and the
          detuning (imaginary part). Because <Tex>{String.raw`Z`}</Tex> reduces to a Lorentzian as{" "}
          <Tex>{String.raw`u\to0`}</Tex> and to a constant in the strong-Doppler limit, the same{" "}
          <Tex>{String.raw`T_{lw}`}</Tex> spans both regimes.
        </Intuition>
        <p>
          With <Tex>{String.raw`u`}</Tex> the most-probable speed (Doppler width{" "}
          <Tex>{String.raw`Ku`}</Tex>), the standard integral before the time integrals is
        </p>
        <EqBlock label="D-5">{String.raw`T_{lw}=iN_{lw}K\pi^{-1/2}\!\int_{-\infty}^{\infty}\!dv\,e^{-(v/u)^2}\!\int_0^{\infty}\!\!\!d\tau'\!\int_0^{\infty}\!\!\!d\tau''\!\int_0^{\infty}\!\!\!d\tau'''\,e^{-(\upsilon_{l1}+is_{w1}Kv)\tau'-(\upsilon_{l2}+is_{w2}Kv)\tau''-(\upsilon_{l3}+is_{w3}Kv)\tau'''}.`}</EqBlock>
        <p>Each time integral of a decaying exponential gives one simple pole, leaving a Gaussian velocity integral:</p>
        <EqBlock label="D-7">{String.raw`T_{lw}=iN_{lw}K\pi^{-1/2}\!\int_{-\infty}^{\infty}\!dv\,e^{-(v/u)^2}\,\big\{(\upsilon_{l1}+is_{w1}Kv)(\upsilon_{l2}+is_{w2}Kv)(\upsilon_{l3}+is_{w3}Kv)\big\}^{-1}.`}</EqBlock>
        <p>
          Partial-fraction the triple pole into single poles (subscripts <Tex>{String.raw`l,w`}</Tex> suppressed;{" "}
          <Tex>{String.raw`\upsilon_k\equiv\upsilon_{lk}`}</Tex>, <Tex>{String.raw`s_k\equiv s_{wk}`}</Tex>):
        </p>
        <EqBlock label="D-8">{String.raw`\Big(\tfrac{1}{s_1\upsilon_2-s_2\upsilon_1}\Big)\Big(\tfrac{s_1}{\upsilon_1+is_1Kv}-\tfrac{s_2}{\upsilon_2+is_2Kv}\Big)\Big(\tfrac{1}{\upsilon_3+is_3Kv}\Big)=\Big(\tfrac{1}{s_1\upsilon_2-s_2\upsilon_1}\Big)\!\Big[\tfrac{s_1}{s_1\upsilon_3-s_3\upsilon_1}\Big(\tfrac{s_1}{\upsilon_1+is_1Kv}-\tfrac{s_3}{\upsilon_3+is_3Kv}\Big)-\tfrac{s_2}{s_2\upsilon_3-s_3\upsilon_2}\Big(\tfrac{s_2}{\upsilon_2+is_2Kv}-\tfrac{s_3}{\upsilon_3+is_3Kv}\Big)\Big].`}</EqBlock>
        <p>
          Each single-pole velocity integral is, by definition (10.29), a plasma dispersion function. Collecting terms
          gives the master result:
        </p>
        <KeyResult
          number="D-9"
          label="Master third-order integral via Z"
          eq={String.raw`T_{lw}=N_{lw}\Big[\tfrac{1}{s_2\upsilon_1-s_1\upsilon_2}\Big]\bigg\{s_1\Big[\tfrac{Z(\upsilon_3/s_3)-Z(\upsilon_1/s_1)}{s_1\upsilon_3-s_3\upsilon_1}\Big]-s_2\Big[\tfrac{Z(\upsilon_3/s_3)-Z(\upsilon_2/s_2)}{s_2\upsilon_3-s_3\upsilon_2}\Big]\bigg\}.`}
          note={
            <>
              Every Doppler integral is now a linear combination of <Tex>{String.raw`Z`}</Tex>&rsquo;s evaluated at{" "}
              <Tex>{String.raw`\upsilon_{lk}/s_{wk}`}</Tex>. This single formula spans the homogeneous and inhomogeneous
              limits and is the computational core of the entire appendix.
            </>
          }
        />
        <p>Specializing to the three rows of the sign matrix (D-6) gives the working forms. For{" "}
          <Tex>{String.raw`w=1`}</Tex> (<Tex>{String.raw`s_3=-s_1=1,\ s_2=0`}</Tex>), using oddness{" "}
          <Tex>{String.raw`Z(-\upsilon)=-Z(\upsilon)`}</Tex>:</p>
        <KeyResult
          number="D-10"
          label="w = 1  (the Lamb-dip branch)"
          eq={String.raw`T_{l1}=\Big(\frac{N_{l1}}{\upsilon_{l2}}\Big)\frac{Z(\upsilon_{l1})+Z(\upsilon_{l3})}{\upsilon_{l1}+\upsilon_{l3}}.`}
        />
        <EqBlock>{String.raw`Z(-\upsilon)=-Z(\upsilon)\quad\text{(oddness, from definition 10.29)}.`}</EqBlock>
        <p>
          For <Tex>{String.raw`w=2`}</Tex> (<Tex>{String.raw`s_3=s_1=1,\ s_2=0`}</Tex>) and{" "}
          <Tex>{String.raw`w=3`}</Tex> (<Tex>{String.raw`s_3=s_1=1,\ s_2=2`}</Tex>):
        </p>
        <KeyResult
          number="D-11"
          label="w = 2"
          eq={String.raw`T_{l2}=-\Big(\frac{N_{l2}}{\upsilon_{l2}}\Big)\frac{Z(\upsilon_{l1})-Z(\upsilon_{l3})}{\upsilon_{l1}-\upsilon_{l3}}.`}
        />
        <KeyResult
          number="D-12"
          label="w = 3"
          eq={String.raw`T_{l3}=\tfrac12\Big(\frac{N_{l3}}{\upsilon_{l1}-\upsilon_{l2}/2}\Big)\bigg[\frac{Z(\upsilon_{l3})-Z(\upsilon_{l1})}{\upsilon_{l3}-\upsilon_{l1}}-\frac{Z(\upsilon_{l3})-Z(\upsilon_{l2}/2)}{\upsilon_{l3}-\upsilon_{l2}/2}\bigg].`}
        />
        <p>When two frequencies coincide the difference quotient is a derivative (L&rsquo;Hôpital):</p>
        <EqBlock label="D-13">{String.raw`\lim_{\upsilon_{l3}\to\upsilon_{l1}}\frac{Z(\upsilon_{l3})-Z(\upsilon_{l1})}{\upsilon_{l3}-\upsilon_{l1}}=\frac{dZ(\upsilon_{l1})}{d\upsilon_{l1}}.`}</EqBlock>

        <Callout kind="math" title="The plasma dispersion function Z (Eq. 10.29)">
          <Tex>{String.raw`Z(\upsilon)=iK\pi^{-1/2}\!\int_{-\infty}^{\infty}\!dv'\,e^{-(v'/u)^2}\,(\upsilon+iKv')^{-1}`}</Tex>{" "}
          with <em>complex</em> argument{" "}
          <Tex>{String.raw`\upsilon=\gamma+i(\omega-\nu_n)`}</Tex> (Eq.&nbsp;10.36). Equivalent Laplace form{" "}
          <Tex>{String.raw`Z(\upsilon)=iKu\!\int_0^{\infty}\!dt'\,e^{-\upsilon t'-\frac14(Ku)^2 t'^2}`}</Tex>{" "}
          (Eq.&nbsp;10.30). It maps to the Faddeeva function{" "}
          <Tex>{String.raw`w`}</Tex> (the complex error function) via{" "}
          <Tex>{String.raw`Z(\upsilon)=i\sqrt{\pi}\,w(i\upsilon/Ku)`}</Tex>, which is exactly what the simulation
          computes. Properties: <Tex>{String.raw`Z(-\upsilon)=-Z(\upsilon)`}</Tex> and{" "}
          <Tex>{String.raw`dZ/d\upsilon=-iK\pi^{-1/2}\!\int dv'\,e^{-(v'/u)^2}(\upsilon+iKv')^{-2}`}</Tex>{" "}
          (Eq.&nbsp;10.35).
        </Callout>

        <Callout kind="math" title="Three limits of Z — verify the mapping against these">
          <ul style={{ marginTop: 0 }}>
            <li>
              <strong>Stationary-atom (<Tex>{String.raw`u\to0`}</Tex>):</strong>{" "}
              <Tex>{String.raw`Z(\upsilon)\to iKu/\upsilon`}</Tex> — a pure Lorentzian (Eq.&nbsp;10.31).
            </li>
            <li>
              <strong>Strong-Doppler (<Tex>{String.raw`Ku\gg\gamma`}</Tex>):</strong>{" "}
              <Tex>{String.raw`Z(\upsilon)\simeq i\sqrt{\pi}`}</Tex> — a constant (Eq.&nbsp;10.15).
            </li>
            <li>
              <strong>Doppler limit with detuning:</strong>{" "}
              <Tex>{String.raw`Z(i\Delta\omega)=e^{-\xi^2}\big[i\sqrt{\pi}-2\!\int_0^{\xi}\!e^{x^2}dx\big]`}</Tex>,{" "}
              <Tex>{String.raw`\xi=\Delta\omega/Ku`}</Tex> (Eq.&nbsp;10.32) — a Gaussian tuning factor.
            </li>
          </ul>
          All three are reproduced by <Tex>{String.raw`Z(\upsilon)=i\sqrt{\pi}\,w(i\upsilon/Ku)`}</Tex>.
        </Callout>

        <Derivation title="Time integrals → partial fractions → Z" defaultOpen={false}>
          <Step title="Do the time integrals first">
            Each integral over <Tex>{String.raw`\tau',\tau'',\tau'''`}</Tex> of a decaying exponential gives{" "}
            <Tex>{String.raw`1/(\upsilon_{lk}+is_{wk}Kv)`}</Tex>; three of them give the triple-pole product (D-7).
            Doing time before velocity is simpler and more general than completing the square first.
          </Step>
          <Step title="Partial-fraction the triple pole">
            Decompose into single poles (D-8) so each velocity Gaussian integral over{" "}
            <Tex>{String.raw`1/(\upsilon_{lk}+is_{wk}Kv)`}</Tex> yields one <Tex>{String.raw`Z`}</Tex>.
          </Step>
          <Step title="Do the Gaussian velocity integral">
            By definition (10.29) each single pole gives <Tex>{String.raw`Z(\upsilon_{lk}/s_{wk})`}</Tex>; collecting
            yields (D-9). Specialize to <Tex>{String.raw`w=1,2,3`}</Tex> (read{" "}
            <Tex>{String.raw`s_{wk}`}</Tex> from D-6) for (D-10)–(D-12); use oddness for{" "}
            <Tex>{String.raw`w=1`}</Tex> and the <Tex>{String.raw`dZ/d\upsilon`}</Tex> limit (D-13) when frequencies
            coincide.
          </Step>
        </Derivation>
      </Section>

      <Section title="Limiting cases & the velocity-integrated polarization">
        <Intuition>
          The general <Tex>{String.raw`T_{lw}`}</Tex> is exact but opaque. Three limits make the physics legible: a
          stationary medium recovers three Lorentzian denominators; the strong-Doppler limit kills two of the three{" "}
          <Tex>{String.raw`w`}</Tex>-terms outright; and the finite-Doppler limit attaches a Gaussian tuning factor — the
          practical lineshape a spectroscopist actually uses.
        </Intuition>
        <p>
          <strong>(1) Stationary atoms.</strong> Setting <Tex>{String.raw`Z\to iKu/\upsilon`}</Tex> factorizes the
          three poles, recovering the homogeneous result (9.14):
        </p>
        <KeyResult
          number="D-14"
          label="Stationary-atom limit (u → 0)"
          eq={String.raw`T_{lw}\xrightarrow[\;u\to0\;]{}\frac{iKu\,N_{lw}}{\upsilon_{l1}\upsilon_{l2}\upsilon_{l3}}.`}
        />
        <p>
          <strong>(2) Strong Doppler.</strong> With <Tex>{String.raw`Z\simeq i\sqrt{\pi}`}</Tex> (Eq.&nbsp;15), the{" "}
          <Tex>{String.raw`w=2,3`}</Tex> differences cancel and only <Tex>{String.raw`w=1`}</Tex> survives:
        </p>
        <EqBlock label="D-15">{String.raw`Z(\upsilon)\simeq i\sqrt{\pi}.`}</EqBlock>
        <KeyResult
          number="D-16"
          label="Strong-Doppler reduction"
          eq={String.raw`T_{l1}\simeq 2i\sqrt{\pi}\,N_{l1}\{\upsilon_{l2}(\upsilon_{l1}+\upsilon_{l3})\}^{-1},\qquad T_{l2}\simeq T_{l3}\simeq0.`}
        />
        <p>
          <strong>(3) Doppler limit, any detuning.</strong> Keeping the Gaussian factor from (10.32) restores accuracy
          for arbitrary tuning:
        </p>
        <KeyResult
          number="D-17"
          label="Doppler-limit lineshape (γ ≪ Ku)"
          eq={String.raw`T_{l1}\cong i\sqrt{\pi}\,N_{l1}\{\upsilon_{l2}(\upsilon_{l1}+\upsilon_{l3})\}^{-1}\Big[e^{-[\operatorname{Im}(\upsilon_{l1})/Ku]^2}+e^{-[\operatorname{Im}(\upsilon_{l3})/Ku]^2}\Big].`}
        />
        <p>
          Substituting the surviving <Tex>{String.raw`T_{l1}`}</Tex> into the assembly formula (D-4) and identifying the
          complex Lorentzian/dispersion denominators <Tex>{String.raw`\mathscr{D}_a,\mathscr{D}_b,\mathscr{D}`}</Tex>{" "}
          (Table 10-2) gives the compact, computable polarization:
        </p>
        <KeyResult
          number="D-18"
          label="Strong-Doppler third-order polarization"
          eq={String.raw`\mathscr{P}_n^{(3)}(t)=\tfrac{1}{16}i\pi^{1/2}\wp^4(\hbar^3 Ku)^{-1}\!\sum_{\mu}\sum_{\rho}\sum_{\sigma}E_\mu E_\rho E_\sigma\,e^{i\Psi_{n\mu\rho\sigma}}\,[\mathscr{D}_a(\nu_\rho-\nu_\sigma)+\mathscr{D}_b(\nu_\rho-\nu_\sigma)]\,\big[N_{2(\rho-\sigma)}\,\mathscr{D}(\omega-\tfrac12\nu_\mu+\tfrac12\nu_\rho-\nu_\sigma)+\bar N\,\mathscr{D}(-\tfrac12\nu_\mu-\tfrac12\nu_\sigma+\nu_\rho)\big].`}
        />
        <Derivation title="Taking the three limits" defaultOpen={false}>
          <Step title="u → 0 in (D-7)">
            Replace <Tex>{String.raw`Z(\upsilon)\to iKu/\upsilon`}</Tex> in (D-9) (equivalently, let the Gaussian
            become a delta function in D-7). The poles factorize into{" "}
            <Tex>{String.raw`1/(\upsilon_{l1}\upsilon_{l2}\upsilon_{l3})`}</Tex>, giving (D-14); cross-check (9.14).
          </Step>
          <Step title="Ku ≫ γ in (D-9)">
            Set <Tex>{String.raw`Z=i\sqrt{\pi}`}</Tex>. For <Tex>{String.raw`w=2,3`}</Tex> the{" "}
            <Tex>{String.raw`Z`}</Tex>-differences cancel (<Tex>{String.raw`T_{l2}=T_{l3}=0`}</Tex>); for{" "}
            <Tex>{String.raw`w=1`}</Tex> the sum <Tex>{String.raw`Z(\upsilon_{l1})+Z(\upsilon_{l3})\to2i\sqrt{\pi}`}</Tex>{" "}
            gives (D-16). For finite-but-large <Tex>{String.raw`Ku`}</Tex>, keep the Gaussian factor to get (D-17).
          </Step>
          <Step title="Assemble (D-18)">
            Substitute the surviving <Tex>{String.raw`T_{l1}`}</Tex> (D-16) into (D-4) and identify{" "}
            <Tex>{String.raw`\mathscr{D}_a,\mathscr{D}_b,\mathscr{D}`}</Tex>.
          </Step>
        </Derivation>

        <SimFrame
          title="The Lamb dip — single-mode saturated gain of a Doppler-broadened laser"
          caption={
            <>
              The single-mode reduction (<Tex>{String.raw`\mu=\rho=\sigma=n`}</Tex>, branch{" "}
              <Tex>{String.raw`T_{11}`}</Tex>, Eq.&nbsp;D-10) drives the response{" "}
              <Tex>{String.raw`C(\Delta)=Ku\,Z(\upsilon)/\upsilon`}</Tex> through the plasma dispersion function. The
              top panel shows the saturation strength (<Tex>{String.raw`\operatorname{Im}C`}</Tex>, peaked at line
              center) and the dispersion (<Tex>{String.raw`\operatorname{Re}C`}</Tex>, antisymmetric, drives mode
              pulling); the bottom panel is the laser output, where the <strong>Lamb dip</strong> appears.
            </>
          }
          tryThis={
            <>
              Start at <Tex>{String.raw`\mathfrak{R}=1.1`}</Tex> and drag the detuning marker to{" "}
              <Tex>{String.raw`0`}</Tex>: the two velocity holes merge into one and the output dips at line center.
              Lower <Tex>{String.raw`\mathfrak{R}`}</Tex> below the threshold{" "}
              <Tex>{String.raw`1+2(\gamma/Ku)^2`}</Tex> and watch the dip vanish. Now shrink{" "}
              <Tex>{String.raw`Ku`}</Tex> toward <Tex>{String.raw`\gamma`}</Tex>: the curve broadens and morphs from
              Gaussian (Doppler) toward Lorentzian (homogeneous).
            </>
          }
        >
          <AppDSim />
        </SimFrame>
      </Section>

      <Section title="Connection to laser operation: saturation coefficients">
        <Intuition>
          All this machinery exists to feed two equations that govern the real laser: the amplitude (intensity) equation
          (9.18) and the frequency equation (9.19). Each has a linear part — net gain{" "}
          <Tex>{String.raw`a_n`}</Tex> and mode pulling <Tex>{String.raw`\sigma_n`}</Tex> — and a nonlinear saturation
          part built from the third-order coefficients <Tex>{String.raw`\theta_{n\mu\rho\sigma}`}</Tex>, which are
          exactly the velocity-integrated <Tex>{String.raw`T_{lw}`}</Tex> summed over limbs and{" "}
          <Tex>{String.raw`w`}</Tex>-values. This is where the abstract integrals become measurable laser behavior.
        </Intuition>
        <KeyResult
          number="D-19"
          label="Saturation coefficients (the deliverable)"
          eq={String.raw`\theta_{n\mu\rho\sigma}=\tfrac{1}{32}\,\nu\wp^4(\hbar^3 Ku\,\varepsilon_0)^{-1}\sum_{l=1}^{4}\sum_{w=1}^{3}T_{lw}.`}
          note={
            <>
              Feeds the multimode amplitude (9.18) and frequency (9.19) equations.{" "}
              <Tex>{String.raw`\theta_{nnnn}`}</Tex> is <strong>self-saturation</strong> (the Lamb dip); off-diagonal{" "}
              <Tex>{String.raw`\theta`}</Tex>&rsquo;s encode <strong>cross-saturation, mode competition,</strong> and{" "}
              mode pushing/pulling.
            </>
          }
        />
        <p>The linear coefficients come from Table 10-1. The net gain is Doppler-broadened gain minus cavity loss{" "}
          <Tex>{String.raw`\nu/2Q_n`}</Tex>:</p>
        <KeyResult
          number="10-1a"
          label="Linear net gain"
          eq={String.raw`a_n=\exp\!\big[-(\omega-\nu_n)^2/(Ku)^2\big]F_1-\tfrac12\,\nu/Q_n,\qquad F_1=\tfrac12\frac{\nu\wp^2}{\hbar\varepsilon_0 Ku}\,\bar N.`}
        />
        <p>Its dispersive counterpart, the mode-pulling coefficient, is built from the Dawson integral:</p>
        <KeyResult
          number="10-1b"
          label="Linear mode pulling"
          eq={String.raw`\sigma_n=-2\,e^{-\xi^2}\!\int_0^{\xi}\!e^{x^2}dx\;F_1,\qquad \xi=(\nu_n-\omega)/Ku.`}
        />
        <p>The dimensionless homogeneous lineshape factor that recurs throughout is</p>
        <EqBlock label="10-1c">{String.raw`\mathscr{L}_x(\Delta\omega)=\frac{\gamma_x^2}{\gamma_x^2+(\Delta\omega)^2},\qquad x=a,\,b,\ \text{or missing}.`}</EqBlock>
        <Callout kind="insight" title="What the coefficients mean (Table 10-1)">
          <Tex>{String.raw`a_n`}</Tex> = linear net gain;{" "}
          <Tex>{String.raw`\beta_n=[1+\mathscr{L}(\omega-\nu_n)]F_3`}</Tex> = self-saturation;{" "}
          <Tex>{String.raw`\sigma_n`}</Tex> = linear mode pushing;{" "}
          <Tex>{String.raw`\rho_n=[(\omega-\nu_n)/\gamma]\,\mathscr{L}(\omega-\nu_n)F_3`}</Tex> = self-pushing;{" "}
          <Tex>{String.raw`F_3=\tfrac12(\gamma_{ab}/\gamma)F_1`}</Tex> = third-order factor. The Lamb dip lives in{" "}
          <Tex>{String.raw`\beta_n`}</Tex>: the self-saturation factor <Tex>{String.raw`[1+\mathscr{L}]`}</Tex> peaks at
          line center, so the steady-state intensity <Tex>{String.raw`I_n\propto a_n/\beta_n`}</Tex> dips there — exactly
          what the simulation plots.
        </Callout>
        <Derivation title="From P_n^{(3)} to θ" defaultOpen={false}>
          <Step title="Identify the saturation term">
            The self-consistency field equation (8.11) has a gain term{" "}
            <Tex>{String.raw`-\tfrac12(\nu/\varepsilon_0)\mathscr{P}_n`}</Tex>. Splitting{" "}
            <Tex>{String.raw`\mathscr{P}_n`}</Tex> into first- and third-order parts gives the linear gain
            (<Tex>{String.raw`a_n,\sigma_n`}</Tex>) and the nonlinear saturation
            (<Tex>{String.raw`\theta_{n\mu\rho\sigma}E_\mu E_\rho E_\sigma`}</Tex>).
          </Step>
          <Step title="Match the coefficient">
            Match the coefficient of <Tex>{String.raw`E_\mu E_\rho E_\sigma`}</Tex> in (D-4)/(D-18) to the definition
            of <Tex>{String.raw`\theta`}</Tex> in (9.18)/(9.19); the prefactor{" "}
            <Tex>{String.raw`\tfrac{1}{32}\nu\wp^4/(\hbar^3 Ku\,\varepsilon_0)`}</Tex> and the sum over{" "}
            <Tex>{String.raw`T_{lw}`}</Tex> follow (D-19). In strong Doppler, use (D-18) with the factor{" "}
            <Tex>{String.raw`\nu/2\varepsilon_0`}</Tex> to land on Table 10-2.
          </Step>
        </Derivation>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from Appendix D">
          <ul>
            <li>
              <strong>
                <Tex>{String.raw`Z`}</Tex> is THE special function of gas-laser physics.
              </strong>{" "}
              <Tex>{String.raw`Z(\upsilon)=i\sqrt{\pi}\,w(i\upsilon/Ku)`}</Tex> with complex argument{" "}
              <Tex>{String.raw`\upsilon=\gamma+i(\omega-\nu_n)`}</Tex>. Every Doppler-broadened response is a combination
              of <Tex>{String.raw`Z`}</Tex>&rsquo;s. Memorize its limits:{" "}
              <Tex>{String.raw`iKu/\upsilon`}</Tex> (Lorentzian), <Tex>{String.raw`i\sqrt{\pi}`}</Tex> (constant), and
              the Gaussian-tuning form.
            </li>
            <li>
              <strong>The complex frequency <Tex>{String.raw`\upsilon=\gamma+i(\omega-\nu)`}</Tex></strong> bundles
              decay (real) and detuning (imaginary) — the compact notation in every later lineshape.
            </li>
            <li>
              <strong>The perturbation tree + the <Tex>{String.raw`s`}</Tex>-matrix + Tables D-1/D-2</strong> let you
              write a third-order Doppler integral by inspection — the only way the multimode ring laser and Zeeman
              ring laser stay tractable.
            </li>
            <li>
              <strong>Time integrals first, then the Gaussian, then partial-fraction into <Tex>{String.raw`Z`}</Tex></strong>{" "}
              — more general than completing the square. Carry this ordering forward.
            </li>
            <li>
              <strong>The coefficients <Tex>{String.raw`\theta_{n\mu\rho\sigma}`}</Tex></strong> feed the amplitude
              (9.18) and frequency (9.19) equations: diagonal = self-saturation (Lamb dip), off-diagonal =
              cross-saturation, mode competition, and pushing/pulling.
            </li>
            <li>
              <strong>The Lamb dip is the headline.</strong> At line center the two oppositely-running components
              saturate the same zero-velocity atoms, doubling the saturation and dipping the output. Its half-width is{" "}
              <Tex>{String.raw`\sim\sqrt{2}\,\gamma`}</Tex> in the extreme-Doppler limit and it appears only for{" "}
              <Tex>{String.raw`\mathfrak{R}>1+2(\gamma/Ku)^2`}</Tex> — the basis of saturated-absorption laser
              stabilization.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
