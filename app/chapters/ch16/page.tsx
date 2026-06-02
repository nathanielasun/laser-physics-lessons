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
import Ch16Sim from "@/components/sims/ch16";

export default function Page() {
  return (
    <Lesson slug="ch16">
      <Lede>
        A laser is never alone. Its field lives in a cavity that leaks photons through the mirrors; its atoms are bathed
        in vacuum modes and thermal radiation. Every one of those &ldquo;outside&rdquo; degrees of freedom is a{" "}
        <strong>reservoir</strong> — enormous, structureless, and never measured in detail. If we only care about our
        small system (one cavity mode, or one atom) and are willing to <em>forget</em> the reservoir, what equation
        governs it? The answer is the <strong>master equation</strong> for the reduced density operator, obtained by
        tracing the reservoir away. The reservoir leaves exactly two fingerprints: irreversible{" "}
        <strong>damping</strong> and fluctuating <strong>noise</strong> — the fluctuation–dissipation duality that runs
        through all of laser physics. We will tell this one story in three languages: an operator master equation, a
        photon-number birth–death equation, and a c-number Fokker–Planck equation.
      </Lede>

      {/* ───────────────────────── Section 1 ───────────────────────── */}
      <Section title="Why reservoirs: the reduced density operator and coarse-graining">
        <Intuition>
          We can never solve the full Schrödinger equation for a cavity field plus the <Tex>{String.raw`\sim 10^{23}`}</Tex>{" "}
          reservoir modes it touches — and we do not want to. We only care about the field. So describe the field by a{" "}
          <strong>density operator</strong> (a statistical mixture, because we have averaged over what we refused to
          track), then build its equation of motion by injecting reservoir &ldquo;atoms&rdquo; one at a time, integrating
          each brief interaction, and summing the tiny changes. The conceptual move is{" "}
          <strong>coarse-graining</strong>: we do not ask for the field after one infinitesimal instant, but for its
          smooth change over a time <Tex>{String.raw`\tau`}</Tex> long compared to a single atom transit yet short
          compared to the field&rsquo;s own slow decay. Coarse-graining is what turns a jittery microscopic history into
          a clean, memoryless (Markovian) rate equation.
        </Intuition>

        <p>
          The concrete cartoon is an <strong>atomic-beam reservoir</strong>: a beam of two-level atoms streams through a
          single cavity mode. Some arrive excited (upper level, rate <Tex>{String.raw`r_a`}</Tex>), some in the ground
          state (lower level, rate <Tex>{String.raw`r_b`}</Tex>). In thermal equilibrium the two rates obey a Boltzmann
          ratio:
        </p>
        <KeyResult
          number="1"
          eq={String.raw`\frac{r_a}{r_b} = \exp\!\left(-\frac{\hbar\omega_0}{k_BT}\right) < 1.`}
          label="Boltzmann ratio of arrival rates"
          note={
            <>
              Because the ratio is less than one, more <em>cold</em> (lower-level, absorbing) atoms arrive than{" "}
              <em>hot</em> (upper-level, emitting) ones. This asymmetry is what damps the field and drives it toward a
              thermal state at temperature <Tex>{String.raw`T`}</Tex>.
            </>
          }
        />

        <p>
          The field is described by a density operator — a classical-probability-weighted mixture of pure states, the
          weights reflecting our ignorance of the reservoir:
        </p>
        <EqBlock label="2">{String.raw`\rho(t) = \sum_{\psi} P_{\psi}(t)\,|\psi(t)\rangle\langle\psi(t)|.`}</EqBlock>
        <p>
          One transiting atom changes the field by a small amount{" "}
          <Tex>{String.raw`\delta\rho(t) = \rho(t+\tau) - \rho(t)`}</Tex> (Eq. 3). Multiplying by the arrival rates and
          summing over the two atom species gives the coarse-grained equation of motion — the seed of the master
          equation:
        </p>
        <KeyResult
          number="4"
          eq={String.raw`\dot{\rho}(t) = r_a\,(\delta\rho)_a + r_b\,(\delta\rho)_b.`}
          label="Coarse-grained equation of motion"
        />

        <p>
          Each <Tex>{String.raw`(\delta\rho)`}</Tex> is computed with the same three-step recipe. Build the uncorrelated
          product of field and incoming atom in energy eigenstate <Tex>{String.raw`|\beta\rangle`}</Tex>:
        </p>
        <EqBlock label="5">{String.raw`\rho_{b\text{-}a}(t) = \rho(t)\otimes|\beta\rangle\langle\beta|,`}</EqBlock>
        <p>evolve it, then recover the field by tracing the atom out — the trace <em>is</em> the act of forgetting the reservoir:</p>
        <EqBlock label="6">{String.raw`\rho(t+\tau) = \mathrm{Tr}_{\text{atom}}\big[\rho_{b\text{-}a}(t+\tau)\big].`}</EqBlock>
        <p>
          Because all the reservoir information has been discarded into <Tex>{String.raw`\rho`}</Tex>, expectation values
          of any field observable <Tex>{String.raw`\mathcal{O}`}</Tex> come out automatically:
        </p>
        <EqBlock>{String.raw`\langle\mathcal{O}\rangle_t = \mathrm{Tr}_{b\text{-}a}\big[\mathcal{O}\,\rho_{b\text{-}a}(t)\big] = \mathrm{Tr}_{\text{field}}\big[\mathcal{O}\,\rho(t)\big].`}</EqBlock>

        <p>
          An equivalent <strong>state-vector method</strong> tracks the combined atom + field state for one atom, then
          forms the outer product:
        </p>
        <EqBlock label="8">{String.raw`\rho_{b\text{-}a}(t+\tau) = |\psi_{b\text{-}a}(t+\tau)\rangle\langle\psi_{b\text{-}a}(t+\tau)|,`}</EqBlock>
        <EqBlock label="9-11">{String.raw`|\psi_{b\text{-}a}(t+\tau)\rangle = \sum_n \big[C_{a,n}(t)\,|a\rangle + C_{b,n}(t)\,|b\rangle\big]\,|n\rangle,`}</EqBlock>
        <p>
          where the <Tex>{String.raw`C`}</Tex>&rsquo;s are probability amplitudes in the atom states{" "}
          <Tex>{String.raw`\{a,b\}`}</Tex> and the photon-number (Fock) states <Tex>{String.raw`|n\rangle`}</Tex>.
        </p>

        <Derivation title="From a single-atom kick to a rate equation">
          <Step title="Sum the per-atom changes">
            Start from <Tex>{String.raw`\delta\rho`}</Tex> (Eq. 3), the change due to one atom. Multiply by the arrival
            rates and sum over species (Eq. 4). This replaces a sequence of discrete collisions by a continuous rate of
            change, valid on time scales long compared to a single transit.
            <EqBlock>{String.raw`\dot{\rho} = r_a\,(\delta\rho)_a + r_b\,(\delta\rho)_b.`}</EqBlock>
          </Step>
          <Step title="Build, evolve, then trace">
            The recipe is always the same: (i) form the uncorrelated product of field and atom (Eq. 5); (ii) evolve the
            combined system through the interaction with propagator <Tex>{String.raw`U`}</Tex>; (iii) trace out the atom
            (Eq. 6). The trace is what makes the result look irreversible — it discards the atom&rsquo;s information.
            <EqBlock>{String.raw`\rho(t+\tau) = \mathrm{Tr}_{\text{atom}}\big[\,U\,\rho(t)\otimes|\beta\rangle\langle\beta|\,U^{\dagger}\big].`}</EqBlock>
          </Step>
        </Derivation>

        <Intuition title="Coarse-graining in one sentence">
          We deliberately blur time over <Tex>{String.raw`\tau`}</Tex> (one atom transit{" "}
          <Tex>{String.raw`\ll \tau \ll`}</Tex> field lifetime) so the bumpy microscopic record becomes a smooth,
          memoryless rate equation — this is what makes damping look continuous.
        </Intuition>
        <Callout kind="warning" title="Two equivalent methods">
          The density-operator method (Eqs. 2–6) and the state-vector method (Eqs. 8–11) give the same physics. Use
          whichever is algebraically lighter for the problem at hand.
        </Callout>

        <Callout kind="note" title="What the P-distribution will become">
          A recurring character is the Glauber–Sudarshan distribution <Tex>{String.raw`P(\alpha)`}</Tex>, the
          probability density for the coherent state <Tex>{String.raw`|\alpha\rangle`}</Tex>. It is the closest thing to
          a classical weight over the field amplitude, and its equation of motion — derived two sections from now — is a
          Fokker–Planck equation.
        </Callout>
      </Section>

      {/* ───────────────────────── Section 2 ───────────────────────── */}
      <Section title="The atomic-beam reservoir: photon-number master equation and thermal steady state">
        <Intuition>
          Here is the cartoon that powers the whole chapter. Excited atoms (rate <Tex>{String.raw`r_a`}</Tex>) can{" "}
          <em>dump</em> a photon into the field by stimulated emission; ground-state atoms (rate{" "}
          <Tex>{String.raw`r_b`}</Tex>) can <em>absorb</em> one. Because cold atoms outnumber hot ones (Eq. 1),
          absorption wins on net and the field is damped. But every emission/absorption event is random, so the field
          does not decay to vacuum — it relaxes to a thermal balance: the Planck photon-number distribution with mean{" "}
          <Tex>{String.raw`\bar n`}</Tex> given by the Bose–Einstein formula. Following only the diagonal elements{" "}
          <Tex>{String.raw`\rho_{nn}`}</Tex> (the probability of exactly <Tex>{String.raw`n`}</Tex> photons) gives a{" "}
          <strong>birth–death rate equation</strong>: probability flows up the photon ladder by emission and down by
          absorption.
        </Intuition>

        <p>
          The central result of the chapter — its language (b) — is the rate equation for the diagonal density-matrix
          elements:
        </p>
        <KeyResult
          number="26"
          eq={String.raw`\dot{\rho}_{nn} = -\big[\mathcal{A}(n+1)+\mathcal{B}\,n\big]\rho_{nn} + \mathcal{A}\,n\,\rho_{n-1,n-1} + \mathcal{B}\,(n+1)\,\rho_{n+1,n+1}.`}
          label="Photon-number master (birth–death) equation"
          note={
            <>
              Emission (coefficient <Tex>{String.raw`\mathcal{A}`}</Tex>) climbs the ladder; absorption (coefficient{" "}
              <Tex>{String.raw`\mathcal{B}`}</Tex>) descends it. The bosonic factors <Tex>{String.raw`(n+1)`}</Tex> and{" "}
              <Tex>{String.raw`n`}</Tex> make higher rungs leak faster.
            </>
          }
        />
        <p>The per-atom rate coefficients, to lowest (second) order in the coupling, are</p>
        <EqBlock label="22">{String.raw`\mathcal{A} = r_a\,g^2\tau^2, \qquad \mathcal{B} = r_b\,g^2\tau^2.`}</EqBlock>
        <p>
          They share the same form; only the arrival rate differs. Since <Tex>{String.raw`r_b > r_a`}</Tex> we have{" "}
          <Tex>{String.raw`\mathcal{B} > \mathcal{A}`}</Tex> and the field is net-damped.
        </p>

        <Figure
          caption={
            <>
              The birth–death ladder. Probability flows up by emission (<Tex>{String.raw`\mathcal{A}\,n`}</Tex> from level{" "}
              <Tex>{String.raw`n-1`}</Tex>) and down by absorption (<Tex>{String.raw`\mathcal{B}\,n`}</Tex> from level{" "}
              <Tex>{String.raw`n`}</Tex>). At steady state every adjacent pair has equal two-way flow — detailed balance.
            </>
          }
        >
          <svg viewBox="0 0 520 220" role="img" aria-label="Photon-number ladder with emission and absorption fluxes">
            <rect x="0" y="0" width="520" height="220" fill="#fbfcfe" />
            {[0, 1, 2, 3].map((k) => {
              const y = 180 - k * 46;
              return (
                <g key={k}>
                  <line x1="150" y1={y} x2="370" y2={y} stroke="#334155" strokeWidth="3" />
                  <text x="120" y={y + 5} fontSize="15" fill="#1b2330" textAnchor="end">
                    {`|${k}⟩`}
                  </text>
                </g>
              );
            })}
            {/* up arrows (emission, A) on the left */}
            {[0, 1, 2].map((k) => {
              const yLo = 180 - k * 46;
              const yHi = 180 - (k + 1) * 46;
              return (
                <g key={`u${k}`}>
                  <line x1="210" y1={yLo - 4} x2="210" y2={yHi + 8} stroke="#16a34a" strokeWidth="2.5" />
                  <polygon
                    points={`210,${yHi + 2} 206,${yHi + 12} 214,${yHi + 12}`}
                    fill="#16a34a"
                  />
                </g>
              );
            })}
            {/* down arrows (absorption, B) on the right */}
            {[0, 1, 2].map((k) => {
              const yLo = 180 - k * 46;
              const yHi = 180 - (k + 1) * 46;
              return (
                <g key={`d${k}`}>
                  <line x1="310" y1={yHi + 4} x2="310" y2={yLo - 8} stroke="#d97706" strokeWidth="2.5" />
                  <polygon
                    points={`310,${yLo - 2} 306,${yLo - 12} 314,${yLo - 12}`}
                    fill="#d97706"
                  />
                </g>
              );
            })}
            <text x="190" y="28" fontSize="13" fill="#16a34a" textAnchor="end">
              emission 𝒜 n ↑
            </text>
            <text x="330" y="28" fontSize="13" fill="#d97706" textAnchor="start">
              ↓ absorption ℬ n
            </text>
            <text x="260" y="208" fontSize="12" fill="#5b6473" textAnchor="middle">
              photon-number ladder n = 0, 1, 2, …
            </text>
          </svg>
        </Figure>

        <Derivation title="From single-atom amplitudes to the master equation">
          <Step title="Single-atom amplitude evolution to second order">
            For a lower-level (absorbing) atom the joint amplitudes <Tex>{String.raw`C_{b,n}`}</Tex> and{" "}
            <Tex>{String.raw`C_{a,n-1}`}</Tex> are coupled at resonance. Expand the Rabi-like evolution to second order
            in <Tex>{String.raw`g\tau`}</Tex>:
            <EqBlock>{String.raw`C_{b,n}(t+\tau) = \big[1 - \tfrac{1}{2}g^2\tau^2 n\big]\,C_{b,n}(t), \qquad C_{a,n-1}(t+\tau) = -i\,g\tau\sqrt{n}\,C_{b,n}(t).`}</EqBlock>
          </Step>
          <Step title="Form the per-atom density-matrix change">
            Build <Tex>{String.raw`\rho_{nn} = |C_{b,n}|^2 + |C_{a,n}|^2`}</Tex> and collect the surviving second-order
            terms (Eqs. 18–20). For a lower-level atom this gives
            <EqBlock label="21">{String.raw`\dot{\rho}_{nn}\big|_{b\text{-atoms}} = -\mathcal{B}\big[n\,\rho_{nn} - (n+1)\,\rho_{n+1,n+1}\big],`}</EqBlock>
            and similarly for an upper-level atom (Eq. 23).
          </Step>
          <Step title="Assemble emission + absorption">
            Weight by the arrival rates and sum. Reading off gain-from-below (<Tex>{String.raw`\mathcal{A}\,n`}</Tex>{" "}
            from level <Tex>{String.raw`n-1`}</Tex>), the loss bracket, and gain-from-above (
            <Tex>{String.raw`\mathcal{B}(n+1)`}</Tex> from level <Tex>{String.raw`n+1`}</Tex>) yields Eq. 26:
            <EqBlock>{String.raw`\dot{\rho}_{nn} = \mathcal{A}\,n\,\rho_{n-1,n-1} + \mathcal{B}(n+1)\,\rho_{n+1,n+1} - \big[\mathcal{A}(n+1)+\mathcal{B}\,n\big]\rho_{nn}.`}</EqBlock>
          </Step>
          <Step title="Detailed balance fixes the steady state">
            Set <Tex>{String.raw`\dot\rho=0`}</Tex>. The full balance separates into pairwise (adjacent-level) balance —
            up-flux equals down-flux between <Tex>{String.raw`n-1`}</Tex> and <Tex>{String.raw`n`}</Tex>:
            <EqBlock label="29">{String.raw`\mathcal{A}\,n\,\rho_{n-1,n-1} = \mathcal{B}\,n\,\rho_{nn} \;\Longrightarrow\; \frac{\rho_{nn}}{\rho_{n-1,n-1}} = \frac{\mathcal{A}}{\mathcal{B}} = e^{-\hbar\omega_0/k_BT}.`}</EqBlock>
            A geometric ratio fixes the entire distribution.
          </Step>
        </Derivation>

        <p>Iterating the geometric ratio gives the Planck distribution, normalized by the bracket:</p>
        <KeyResult
          number="30"
          eq={String.raw`\rho_{nn} = \rho_{00}\,e^{-n\hbar\omega_0/k_BT} = \big[1 - e^{-\hbar\omega_0/k_BT}\big]\,e^{-n\hbar\omega_0/k_BT}.`}
          label="Planck (geometric) steady-state distribution"
        />
        <p>
          Its mean — the first moment <Tex>{String.raw`\langle n\rangle = \sum_n n\,\rho_{nn}`}</Tex> (Eq. 31) — is the
          famous Bose–Einstein occupation:
        </p>
        <KeyResult
          number="32"
          eq={String.raw`\bar n \equiv \langle n\rangle = \sum_n n\,\rho_{nn} = \frac{1}{e^{\hbar\omega_0/k_BT}-1}.`}
          label="Bose–Einstein mean photon number"
          note={
            <>
              Note the <em>positive</em> exponent and the <Tex>{String.raw`-1`}</Tex> in the denominator. This is the
              thermal occupation the field relaxes to — memorize it.
            </>
          }
        />

        <p>
          Because the birth–death rates are linear in <Tex>{String.raw`n`}</Tex>, the first-moment equation closes{" "}
          <em>exactly</em> — no higher moment ever survives. Multiplying Eq. 26 by <Tex>{String.raw`n`}</Tex> and
          summing, the <Tex>{String.raw`\langle n^2\rangle`}</Tex> pieces from the bosonic factors cancel identically:
        </p>
        <EqBlock label="33">{String.raw`\frac{d}{dt}\langle n\rangle = -\mathcal{A}\big[\langle n^2\rangle + \langle n\rangle\big] - \mathcal{B}\langle n^2\rangle + \mathcal{B}\!\sum_{m=1}^{\infty}(m^2-m)\rho_{mm} + \mathcal{A}\!\sum_{m=0}^{\infty}(m^2+2m+1)\rho_{mm} = (\mathcal{A}-\mathcal{B})\langle n\rangle + \mathcal{A},`}</EqBlock>
        <p>which is precisely <Tex>{String.raw`\mathcal{A}\langle n+1\rangle - \mathcal{B}\langle n\rangle`}</Tex>, the clean linear relaxation</p>
        <KeyResult
          number="34"
          eq={String.raw`\frac{d}{dt}\langle n\rangle = -(\mathcal{B}-\mathcal{A})\,\langle n\rangle + \mathcal{A}.`}
          label="Mean-photon-number relaxation"
          note={
            <>
              The net decay rate is <Tex>{String.raw`(\mathcal{B}-\mathcal{A})`}</Tex>; the constant{" "}
              <Tex>{String.raw`\mathcal{A}`}</Tex> is the thermal <em>source</em> that prevents decay to zero. The
              solution relaxes <Tex>{String.raw`\langle n\rangle`}</Tex> to{" "}
              <Tex>{String.raw`\mathcal{A}/(\mathcal{B}-\mathcal{A}) = \bar n`}</Tex>.
            </>
          }
        />
        <p>Consistency with the steady state then ties the rate coefficients to the thermal occupation:</p>
        <EqBlock>{String.raw`\frac{\mathcal{B}}{\mathcal{B}-\mathcal{A}} = \bar n + 1, \qquad \frac{\mathcal{A}}{\mathcal{B}-\mathcal{A}} = \bar n.`}</EqBlock>

        <p>
          To connect this abstract reservoir to a real cavity, write the field expectation value as a mode function
          times the trace of the amplitude operator:
        </p>
        <EqBlock label="35">{String.raw`\langle E(t)\rangle = \mathscr{E}\sin Kx\;\mathrm{Tr}\big[\rho(t)(a+a^{\dagger})\big].`}</EqBlock>
        <p>
          The complex amplitude obeys an equation whose decay rate is <em>half</em> the energy decay rate, plus an
          oscillation at <Tex>{String.raw`\nu`}</Tex>:
        </p>
        <EqBlock label="36">{String.raw`\frac{d}{dt}\langle \mathscr{E}a\rangle = -\tfrac{1}{2}(\mathcal{B}-\mathcal{A})\,\langle \mathscr{E}a\rangle - i\nu\,\langle \mathscr{E}a\rangle.`}</EqBlock>
        <p>
          Re-expressing the damping through the cavity quality factor <Tex>{String.raw`Q`}</Tex>:
        </p>
        <EqBlock label="37">{String.raw`\frac{d}{dt}\langle \mathscr{E}\rangle = -\frac{1}{2}\frac{\nu}{Q}\,\langle \mathscr{E}\rangle - i\nu\,\langle \mathscr{E}\rangle.`}</EqBlock>
        <p>
          This is the key identification — the net rate <Tex>{String.raw`(\mathcal{B}-\mathcal{A})`}</Tex> is the cavity
          linewidth <Tex>{String.raw`\nu/Q`}</Tex>:
        </p>
        <KeyResult
          number="38"
          eq={String.raw`\frac{\nu}{Q} = \frac{\mathcal{B}}{\bar n + 1} = \frac{\mathcal{A}}{\bar n} = \mathcal{B} - \mathcal{A}.`}
          label="Reservoir rate = cavity linewidth"
        />
        <p>so that the emission and absorption coefficients — the practical parameters of the simulation — become</p>
        <KeyResult
          number="39"
          eq={String.raw`\mathcal{A} = \frac{\nu}{Q}\,\bar n, \qquad \mathcal{B} = \frac{\nu}{Q}\,(\bar n + 1).`}
          label="Coefficients from cavity Q and temperature"
        />

        <Derivation title="Mean-photon-number relaxation and cavity Q" defaultOpen={false}>
          <Step title="The first moment closes exactly">
            Multiply Eq. 26 by <Tex>{String.raw`n`}</Tex> and sum. Because the rates are linear in{" "}
            <Tex>{String.raw`n`}</Tex>, the <Tex>{String.raw`\langle n^2\rangle`}</Tex> pieces cancel identically (not by
            luck) — the equation closes at first moment, giving the linear Eq. 34. Identify{" "}
            <Tex>{String.raw`\mathcal{B}-\mathcal{A}`}</Tex> with <Tex>{String.raw`\nu/Q`}</Tex>.
            <EqBlock>{String.raw`\frac{d}{dt}\langle n\rangle = -\frac{\nu}{Q}\langle n\rangle + \frac{\nu}{Q}\,\bar n.`}</EqBlock>
          </Step>
          <Step title="Solve">
            A first-order linear ODE with constant source relaxes exponentially to <Tex>{String.raw`\bar n`}</Tex> at
            the cavity rate:
            <EqBlock>{String.raw`\langle n\rangle(t) = \bar n + \big(\langle n\rangle_0 - \bar n\big)\,e^{-(\nu/Q)t}.`}</EqBlock>
            This closed form is the analytic check the simulation overlays on its numerical integration.
          </Step>
        </Derivation>

        <Intuition title="Birth–death ladder">
          Picture probability as fluid on the rungs of a ladder (<Tex>{String.raw`n=0,1,2,\dots`}</Tex>). Emission pumps
          it up, absorption drains it down, and the bosonic factors <Tex>{String.raw`(n+1)`}</Tex> and{" "}
          <Tex>{String.raw`n`}</Tex> make higher rungs leak faster. Equilibrium is reached when every adjacent pair has
          equal two-way flow — detailed balance.
        </Intuition>
        <Callout kind="warning" title="The factor of ½">
          Energy (photon number) decays at rate <Tex>{String.raw`\nu/Q`}</Tex>, but the field <em>amplitude</em> decays
          at <Tex>{String.raw`\nu/(2Q)`}</Tex>. Always track whether a quoted rate refers to amplitude or intensity.
        </Callout>
        <Callout kind="insight" title="Damping and noise from one beam">
          The same atomic beam that damps the field also feeds it the source term{" "}
          <Tex>{String.raw`\mathcal{A} = (\nu/Q)\,\bar n`}</Tex>. Without that noise term the field would die to vacuum;
          with it the field thermalizes to <Tex>{String.raw`\bar n`}</Tex>. This is fluctuation–dissipation in
          miniature.
        </Callout>

        <SimFrame
          title="Cavity photon thermalization"
          caption={
            <>
              Numerically integrate the chapter&rsquo;s own central master equation (Eq. 26) for the photon-number
              probabilities, with rate coefficients fixed by cavity <Tex>{String.raw`Q`}</Tex> and temperature (Eqs. 39,
              32). Watch an arbitrary starting distribution relax — emission up, absorption down — to the Planck
              distribution. The bars morph toward the dashed Planck curve; the numerically integrated mean (solid) sits
              exactly on the analytic relaxation (dashed).
            </>
          }
          tryThis={
            <>
              Start with <Tex>{String.raw`\langle n\rangle_0`}</Tex> well above <Tex>{String.raw`\bar n`}</Tex> and watch
              the field <em>decay</em>; then push it below <Tex>{String.raw`\bar n`}</Tex> and watch thermal noise{" "}
              <em>fill</em> the cavity — both governed by the same equation. Turn{" "}
              <Tex>{String.raw`\hbar\omega_0/k_BT`}</Tex> down (hot) and <Tex>{String.raw`\bar n`}</Tex> climbs; turn it
              up (cold) and the field heads toward vacuum. Flip the initial distribution between Fock and Poisson —{" "}
              both thermalize to the same Planck shape. Confirm the up- and down-flux arrows equalize as detailed
              balance is reached, and that the variance climbs to the super-Poissonian{" "}
              <Tex>{String.raw`\bar n(\bar n+1)`}</Tex>.
            </>
          }
        >
          <Ch16Sim />
        </SimFrame>
      </Section>

      {/* ───────────────────────── Section 3 ───────────────────────── */}
      <Section title="Density-operator treatment: the operator master equation and the P-representation">
        <Intuition>
          Now redo the atomic-beam problem from a fully operator point of view — no peeking at individual matrix
          elements. This is the method that <em>generalizes</em>: any small system <Tex>{String.raw`A`}</Tex> (here a
          harmonic oscillator = the field mode) coupled to any reservoir <Tex>{String.raw`B`}</Tex> (the atoms). Form the
          combined operator, evolve it with a Jaynes–Cummings coupling, expand to second order, and trace out the
          reservoir. What survives is a compact operator master equation with damping appearing as nested commutators of{" "}
          <Tex>{String.raw`a`}</Tex> and <Tex>{String.raw`a^{\dagger}`}</Tex>. To make it plottable we then represent{" "}
          <Tex>{String.raw`\rho`}</Tex> in the coherent-state basis via <Tex>{String.raw`P(\alpha)`}</Tex>, turning
          operator algebra into calculus.
        </Intuition>

        <p>The general definition makes &ldquo;forgetting the reservoir&rdquo; precise — trace the combined operator over <Tex>{String.raw`B`}</Tex>:</p>
        <KeyResult
          number="41"
          eq={String.raw`\rho_A(t) = \mathrm{Tr}_B\big[\rho_{AB}(t)\big] = \sum_B \langle B|\rho_{AB}(t)|B\rangle.`}
          label="Reduced density operator of system A"
        />
        <p>
          Initially (and at each coarse-grained restart) system and reservoir are uncorrelated — the reservoir is so
          large it stays in its own thermal state:
        </p>
        <EqBlock label="42">{String.raw`\rho_{AB}(t) = \rho_A(t)\otimes\rho_B(t).`}</EqBlock>
        <p>The combined operator obeys the interaction-picture Liouville–von Neumann equation,</p>
        <EqBlock label="43">{String.raw`\dot{\rho}_{AB}(t) = -\frac{i}{\hbar}\big[\mathscr{V}_{AB}(t),\,\rho_{AB}(t)\big],`}</EqBlock>
        <p>which we formally integrate and trace, generating the iterated (time-ordered) perturbation series:</p>
        <EqBlock label="44">{String.raw`\begin{aligned}\rho_A(t+\tau) =\ &\mathrm{Tr}_B\big[\rho_A(t)\otimes\rho_B(t)\big] \\ &+ \sum_j\Big(-\frac{i}{\hbar}\Big)^{\!j}\!\int_t^{t+\tau}\!\!dt_1\!\int_t^{t_1}\!\!dt_2\cdots\!\int_t^{t_{j-1}}\!\!dt_j\;\mathrm{Tr}_B\big\{[\mathscr{V}(t_1),[\cdots[\mathscr{V}(t_j),\rho_A(t)\otimes\rho_B(t)]\cdots]]\big\}.\end{aligned}`}</EqBlock>
        <p>The lowest orders, shown explicitly:</p>
        <EqBlock>{String.raw`\rho_A(t+\tau) = \mathrm{Tr}_B\big[\rho_A(t)\otimes\rho_B(t)\big] - \frac{i}{\hbar}\int_t^{t+\tau}\!dt'\;\mathrm{Tr}_B\big[\mathscr{V}(t'),\rho_A(t)\otimes\rho_B(t)\big] + \cdots`}</EqBlock>
        <p>
          The first-order term typically vanishes when tracing a diagonal thermal reservoir, leaving the second order to
          dominate.
        </p>

        <p>The reservoir atom is in a thermal (energy-diagonal) state,</p>
        <EqBlock label="45">{String.raw`\rho_{\text{atom}}(t) = Z^{-1}\begin{pmatrix} e^{-\hbar\omega_a/k_BT} & 0 \\ 0 & e^{-\hbar\omega_b/k_BT}\end{pmatrix} = \begin{pmatrix}\rho_{aa} & 0 \\ 0 & \rho_{bb}\end{pmatrix},`}</EqBlock>
        <EqBlock>{String.raw`Z = e^{-\hbar\omega_a/k_BT} + e^{-\hbar\omega_b/k_BT},`}</EqBlock>
        <p>and the interaction is the rotating-wave Jaynes–Cummings coupling,</p>
        <EqBlock label="46">{String.raw`\mathscr{V} = \hbar g\,\sigma a^{\dagger} + \text{adjoint} = \hbar g\begin{pmatrix} 0 & a \\ a^{\dagger} & 0\end{pmatrix}.`}</EqBlock>
        <p>The surviving second-order result is a double commutator traced over the atom:</p>
        <EqBlock label="47">{String.raw`\rho(t+\tau) = \rho(t) - \tfrac{1}{2}\Big(\frac{\tau}{\hbar}\Big)^{2}\mathrm{Tr}_{\text{atom}}\big[\mathscr{V},[\mathscr{V},\rho_{b\text{-}a}(t)]\big].`}</EqBlock>

        <p>
          Summing the upper- and lower-level contributions assembles the coarse-grained operator master equation
          (structurally Eq. 50),
        </p>
        <EqBlock label="50">{String.raw`\dot{\rho}(t) = r\big[\rho(t+\tau) - \rho(t)\big], \qquad r_a = r\rho_{aa},\; r_b = r\rho_{bb},`}</EqBlock>
        <p>which, evaluated, gives the operator (Lindblad-form) master equation — language (a) of the chapter:</p>
        <KeyResult
          number="51"
          eq={String.raw`\dot{\rho}(t) = -\tfrac{1}{2}\mathcal{A}\big[aa^{\dagger}\rho - a^{\dagger}\rho a\big] - \tfrac{1}{2}\mathcal{B}\big[a^{\dagger}a\rho - a\rho a^{\dagger}\big] + \text{adjoint}.`}
          label="Operator master equation"
          note={
            <>
              The emission term carries <Tex>{String.raw`aa^{\dagger}`}</Tex>, the absorption term{" "}
              <Tex>{String.raw`a^{\dagger}a`}</Tex>. This is the operator-language twin of the photon-number Eq. 26.
            </>
          }
        />
        <p>Written with cavity <Tex>{String.raw`Q`}</Tex> and thermal occupation via Eq. 39, it becomes the workhorse of open quantum optics:</p>
        <KeyResult
          number="52"
          eq={String.raw`\dot{\rho}(t) = -\frac{1}{2}\frac{\nu}{Q}\Big\{\bar n\big[aa^{\dagger}\rho - a^{\dagger}\rho a\big] + (\bar n+1)\big[a^{\dagger}a\rho - a\rho a^{\dagger}\big]\Big\} + \text{adjoint}.`}
          label="Reduced-density-operator master equation (Lindblad form)"
          note={
            <>
              The field decays at <Tex>{String.raw`\nu/Q`}</Tex> while thermal noise <Tex>{String.raw`\bar n`}</Tex>{" "}
              prevents decay to vacuum. This is the exact starting point for the quantum theory of the laser in
              Chapter&nbsp;XVII — just add gain.
            </>
          }
        />

        <p>
          To plot any of this, represent <Tex>{String.raw`\rho`}</Tex> as a weighted average of coherent-state
          projectors — the Glauber–Sudarshan <Tex>{String.raw`P`}</Tex>-representation:
        </p>
        <KeyResult
          number="53"
          eq={String.raw`\rho = \int d^2\alpha\;P(\alpha,t)\,|\alpha\rangle\langle\alpha|.`}
          label="Coherent-state (P) representation"
        />
        <p>The crucial trick: <Tex>{String.raw`a`}</Tex> and <Tex>{String.raw`a^{\dagger}`}</Tex> acting on a projector become multiplication and differentiation,</p>
        <EqBlock label="54-55">{String.raw`a\,|\alpha\rangle\langle\alpha| = \alpha\,|\alpha\rangle\langle\alpha|, \qquad a^{\dagger}|\alpha\rangle\langle\alpha| = \Big(\alpha^{*} + \frac{\partial}{\partial\alpha}\Big)|\alpha\rangle\langle\alpha|,`}</EqBlock>
        <p>
          with the shorthand <Tex>{String.raw`\hat{a}_{\alpha} = \partial/\partial\alpha`}</Tex> (Eq. 56). These rules are
          verified using the coherent state as a displaced vacuum,
        </p>
        <EqBlock label="57">{String.raw`|\alpha\rangle\langle\alpha| = e^{-\alpha\alpha^{*}}\,e^{\alpha a^{\dagger}}|0\rangle\langle 0|\,e^{\alpha^{*}a}.`}</EqBlock>
        <p>and extended to operator products (then moved onto <Tex>{String.raw`P`}</Tex> by integration by parts, Eq. 60, with vanishing boundary terms):</p>
        <EqBlock label="58-60">{String.raw`a^{\dagger}|\alpha\rangle\langle\alpha| = \Big(\alpha^{*}+\frac{\partial}{\partial\alpha}\Big)|\alpha\rangle\langle\alpha|, \qquad aa^{\dagger}|\alpha\rangle\langle\alpha| = \Big(\alpha\alpha^{*}+\alpha\frac{\partial}{\partial\alpha}\Big)|\alpha\rangle\langle\alpha| + |\alpha\rangle\langle\alpha|.`}</EqBlock>

        <Derivation title="Trace out the reservoir, then project onto coherent states">
          <Step title="Trace out the reservoir to second order">
            Integrate Eq. 43, expand in nested commutators (Eq. 44), and trace over <Tex>{String.raw`B`}</Tex>. The
            first-order term vanishes for a diagonal thermal reservoir; the second-order double commutator (Eq. 47)
            survives and produces the damping.
            <EqBlock>{String.raw`\dot{\rho}_A \sim -\frac{1}{\hbar^2}\int dt'\;\mathrm{Tr}_B\big[\mathscr{V}(t),[\mathscr{V}(t'),\rho_A\otimes\rho_B]\big].`}</EqBlock>
          </Step>
          <Step title="Insert the coupling and evaluate commutators">
            Substitute <Tex>{String.raw`\mathscr{V}`}</Tex> (Eq. 46) and the thermal atom (Eq. 45). The first and second
            commutators (Eqs. 48–49) generate off-diagonal then diagonal field-operator structures; weighting by{" "}
            <Tex>{String.raw`r_a\rho_{aa}`}</Tex> and <Tex>{String.raw`r_b\rho_{bb}`}</Tex> gives Eqs. 51–52.
            <EqBlock>{String.raw`\big[\mathscr{V},[\mathscr{V},\rho_{b\text{-}a}]\big] \;\Rightarrow\; \mathcal{A},\,\mathcal{B}\ \text{terms in}\ aa^{\dagger},\,a^{\dagger}a.`}</EqBlock>
          </Step>
          <Step title="Project onto coherent states and integrate by parts">
            Substitute the <Tex>{String.raw`P`}</Tex>-representation (Eq. 53), apply the derivative rules (Eqs. 54–59),
            and integrate by parts (Eq. 60) so all derivatives act on <Tex>{String.raw`P`}</Tex>. Since the projectors
            are linearly independent, the integrand must vanish — a PDE for <Tex>{String.raw`P(\alpha,t)`}</Tex>.
            <EqBlock>{String.raw`\int d^2\alpha\,P(\alpha)\,a^{\dagger}|\alpha\rangle\langle\alpha| = \int d^2\alpha\,\big[\alpha^{*}P - \partial_{\alpha}P\big]\,|\alpha\rangle\langle\alpha|.`}</EqBlock>
          </Step>
        </Derivation>

        <Intuition title="Why coherent states">
          Coherent states <Tex>{String.raw`|\alpha\rangle`}</Tex> are the most classical quantum states of a field mode.
          Writing <Tex>{String.raw`\rho`}</Tex> as a smear of them — <Tex>{String.raw`P(\alpha)`}</Tex> — lets us treat
          the quantum field almost like a classical noisy amplitude, and the master equation becomes an honest diffusion
          equation.
        </Intuition>
        <Callout kind="warning" title="First order usually dies">
          The single-commutator (first-order) term traces to zero for a thermal reservoir with no coherences. Damping is
          intrinsically a <em>second</em>-order (two coupling events) effect — emit, then reabsorb.
        </Callout>
      </Section>

      {/* ───────────────────────── Section 4 ───────────────────────── */}
      <Section title="The Fokker–Planck equation: drift, diffusion, and the classical analogue">
        <Intuition>
          Step back to the cleanest setting: a classical particle on a line getting random kicks — Brownian motion. Its
          probability distribution obeys the <strong>Fokker–Planck equation</strong>: <em>drift</em> (a deterministic
          push, the first-derivative term) plus <em>diffusion</em> (random spreading, the second-derivative term). The
          punchline for lasers: this same drift + diffusion structure is exactly what the field&rsquo;s{" "}
          <Tex>{String.raw`P(\alpha)`}</Tex> obeys after the coherent-state transform. Drift pulls the amplitude inward
          (damping); diffusion spreads it out (noise); the balance is the thermal Gaussian. Fluctuation–dissipation
          again, now in plain calculus.
        </Intuition>

        <p>
          Start from a biased random walk: a particle hops right with probability <Tex>{String.raw`p_+`}</Tex>, left with{" "}
          <Tex>{String.raw`p_-`}</Tex>. Taylor-expanding the neighbor probabilities in the step{" "}
          <Tex>{String.raw`\Delta x`}</Tex> to second order,
        </p>
        <EqBlock label="64-65">{String.raw`\begin{aligned}P(x_n, t+\Delta t) =\ &(p_+ + p_-)\,P(x_n,t) \\ &+ p_-\Big[P(x_{n+1}) + \Delta x\,\partial_{x}P + \tfrac{(\Delta x)^2}{2}\,\partial_{x}^2 P\Big] \\ &+ p_+\Big[P(x_{n-1}) - \Delta x\,\partial_{x}P + \tfrac{(\Delta x)^2}{2}\,\partial_{x}^2 P\Big].\end{aligned}`}</EqBlock>
        <p>Collecting terms and taking the continuum limit gives the position-space Fokker–Planck equation,</p>
        <KeyResult
          number="66"
          eq={String.raw`\frac{\partial}{\partial t}P(x,t) = -M_1\frac{\partial}{\partial x}P(x,t) + \tfrac{1}{2}M_2\frac{\partial^2}{\partial x^2}P(x,t),`}
          label="Position-space Fokker–Planck equation"
        />
        <p>with the drift and diffusion coefficients read off from the odd and even combinations of the hop probabilities:</p>
        <EqBlock label="67-68">{String.raw`M_1 = (p_+ - p_-)\frac{\Delta x}{\Delta t} \quad (\text{drift}), \qquad M_2 = (p_+ + p_-)\frac{(\Delta x)^2}{\Delta t} \quad (\text{diffusion}).`}</EqBlock>

        <p>
          The general derivation uses the Markov (Chapman–Kolmogorov) equation in velocity space — the future
          distribution is the transition probability folded with the present one:
        </p>
        <EqBlock label="69">{String.raw`P(v,t+\Delta t) = \int dv_i\;P(v,t+\Delta t\,|\,v_i)\,P(v_i,t),`}</EqBlock>
        <p>with the stationary, short-step transition probability</p>
        <EqBlock label="70">{String.raw`P(v,s+\Delta s\,|\,v_i) \to P(v,\Delta s\,|\,v).`}</EqBlock>
        <p>
          Changing variables to the jump <Tex>{String.raw`\Delta v`}</Tex> and Taylor-expanding gives the{" "}
          <strong>Kramers–Moyal</strong> series — an infinite hierarchy of derivatives weighted by the jump moments:
        </p>
        <EqBlock label="72">{String.raw`\frac{\partial}{\partial t}P(v,t\,|\,v_0) = \sum_{n=1}^{\infty}\frac{(-1)^n}{n!}\frac{\partial^n}{\partial v^n}\big[M_n\,P(v,t\,|\,v_0)\big],`}</EqBlock>
        <EqBlock label="73">{String.raw`M_n = \frac{1}{\Delta t}\int_{-\infty}^{\infty}d(\Delta v)\,\frac{(\Delta v)^n}{n!}\,P(v,v+\Delta v,\Delta t\,|\,v) = \frac{\langle(\Delta v)^n\rangle}{\Delta t}.`}</EqBlock>
        <p>
          When moments with <Tex>{String.raw`n\ge 3`}</Tex> vanish faster in <Tex>{String.raw`\Delta t`}</Tex>, the
          series truncates after diffusion, giving the canonical velocity-space form:
        </p>
        <KeyResult
          number="74"
          eq={String.raw`\frac{\partial}{\partial t}P(v,t) = -\frac{\partial}{\partial v}\big(M_1 P\big) + \frac{1}{2}\frac{\partial^2}{\partial v^2}\big(M_2 P\big).`}
          label="Velocity-space Fokker–Planck equation"
        />

        <p>
          Taking moments of Eq. 74 shows what drift and diffusion each do. The mean drifts at rate{" "}
          <Tex>{String.raw`M_1`}</Tex>,
        </p>
        <EqBlock label="75">{String.raw`\frac{d}{dt}\langle v\rangle = M_1,`}</EqBlock>
        <p>
          and for a linear drag <Tex>{String.raw`M_1 = -\Gamma v`}</Tex> the mean relaxes exponentially — the drift that
          pulls the amplitude inward:
        </p>
        <EqBlock>{String.raw`\frac{d}{dt}\langle v\rangle = -\Gamma\,\langle v\rangle.`}</EqBlock>
        <p>The variance obeys a damped equation with a diffusion source,</p>
        <EqBlock label="77">{String.raw`\frac{1}{2}\frac{d}{dt}\big[\langle v^2\rangle - \langle v\rangle^2\big] = -\Gamma\big[\langle v^2\rangle - \langle v\rangle^2\big] + \frac{M_2}{2},`}</EqBlock>
        <p>whose steady state is the fluctuation–dissipation statement:</p>
        <KeyResult
          eq={String.raw`\langle v^2\rangle - \langle v\rangle^2 = \frac{M_2}{2\Gamma}.`}
          label="Steady-state variance = diffusion / (2 × damping)"
          note="Noise (M₂) and damping (Γ) together fix the equilibrium spread. The same coupling that damps also fluctuates."
        />

        <Derivation title="Random walk → Fokker–Planck → fluctuation–dissipation" defaultOpen={false}>
          <Step title="Random walk to Fokker–Planck">
            Taylor-expand the neighbor probabilities (Eq. 64) to second order in <Tex>{String.raw`\Delta x`}</Tex>. The
            odd (first-derivative) term carries the bias <Tex>{String.raw`p_+ - p_-`}</Tex> (drift{" "}
            <Tex>{String.raw`M_1`}</Tex>); the even (second-derivative) term carries{" "}
            <Tex>{String.raw`p_+ + p_-`}</Tex> (diffusion <Tex>{String.raw`M_2`}</Tex>).
            <EqBlock>{String.raw`P(x,t+\Delta t)-P(x,t) = -M_1\,\Delta t\,\partial_x P + \tfrac{1}{2}M_2\,\Delta t\,\partial_x^2 P.`}</EqBlock>
          </Step>
          <Step title="Markov + Kramers–Moyal">
            Use Chapman–Kolmogorov (Eq. 69), change variables to the jump <Tex>{String.raw`\Delta v`}</Tex>, expand the
            transition probability, and identify the jump moments (Eq. 73) to get the Kramers–Moyal series (Eq. 72).
            <EqBlock>{String.raw`\sum_{n}\frac{(-1)^n}{n!}\,\partial_v^n\big[M_n P\big].`}</EqBlock>
          </Step>
          <Step title="Truncate at second order">
            When <Tex>{String.raw`M_n \sim \langle(\Delta v)^n\rangle/\Delta t \to 0`}</Tex> for{" "}
            <Tex>{String.raw`n\ge 3`}</Tex>, the series truncates after diffusion — the Fokker–Planck approximation,
            Eq. 74.
          </Step>
          <Step title="Moments: drift damps, diffusion spreads">
            Multiply Eq. 74 by <Tex>{String.raw`v`}</Tex> and integrate for the mean (Eq. 75); by{" "}
            <Tex>{String.raw`(v-\langle v\rangle)^2`}</Tex> for the variance (Eq. 77). The steady-state variance{" "}
            <Tex>{String.raw`M_2/(2\Gamma)`}</Tex> is fluctuation–dissipation.
            <EqBlock>{String.raw`\langle v^2\rangle - \langle v\rangle^2 \to \frac{M_2}{2\Gamma}.`}</EqBlock>
          </Step>
        </Derivation>

        <Intuition title="Drift vs diffusion at a glance">
          Drift (1st derivative) moves the whole packet; diffusion (2nd derivative) fattens it. A laser field&rsquo;s{" "}
          <Tex>{String.raw`P(\alpha)`}</Tex> does both: damping drifts it toward the origin, noise diffuses it outward,
          and the standoff is the thermal/coherent steady state.
        </Intuition>
        <Callout kind="insight" title="Fluctuation–dissipation, plainly">
          Steady-state width <Tex>{String.raw`= \text{(diffusion)}/(2\times\text{damping})`}</Tex>. The same coupling
          that damps also fluctuates; you cannot have one without the other. This is the recurring lesson of the whole
          chapter.
        </Callout>
      </Section>

      {/* ───────────────────────── Section 5 ───────────────────────── */}
      <Section title="Generalized reservoir theory: projection, Hartree factorization, and the Markoff limit">
        <Intuition>
          Now make the construction airtight and general. Two arbitrary systems <Tex>{String.raw`A`}</Tex> and{" "}
          <Tex>{String.raw`B`}</Tex> interact; we want a closed equation for <Tex>{String.raw`A`}</Tex> alone, valid to
          second order, <em>without</em> assuming they factorize for all time (only initially). The tool is a{" "}
          <strong>Hartree</strong> self-consistent factorization: replace the joint operator by a product of reduced
          operators carrying mean-field energies, keeping only the genuine <em>correlations</em> as the small quantity.
          Integrating the correlation equation and invoking the <strong>Markoff</strong> approximation (the reservoir
          forgets instantly) yields a closed, local-in-time master equation — the rigorous backbone of everything
          before.
        </Intuition>

        <p>
          Treat <Tex>{String.raw`A`}</Tex> and <Tex>{String.raw`B`}</Tex> symmetrically; each reduced operator is the
          partial trace over the other,
        </p>
        <EqBlock label="87-88">{String.raw`\rho_A(t) = \mathrm{Tr}_B\big[\rho_{AB}(t)\big], \qquad \rho_B(t) = \mathrm{Tr}_A\big[\rho_{AB}(t)\big],`}</EqBlock>
        <p>and tracing the joint Liouville equation gives the exact (but unclosed) equations of motion,</p>
        <EqBlock label="89-90">{String.raw`i\hbar\,\dot{\rho}_A(t) = \mathrm{Tr}_B\big[\mathscr{V}'(t),\rho_{AB}(t)\big], \qquad i\hbar\,\dot{\rho}_B(t) = \mathrm{Tr}_A\big[\mathscr{V}'(t),\rho_{AB}(t)\big].`}</EqBlock>
        <p>The exact decomposition splits a factorized (Hartree) part from the correlation operator <Tex>{String.raw`\rho_c`}</Tex>, the small quantity:</p>
        <KeyResult
          number="91"
          eq={String.raw`\rho_{AB}(t) = \rho_A(t)\otimes\rho_B(t) + \rho_c(t).`}
          label="Hartree factorization + correlations"
        />
        <p>Each subsystem feels a mean-field (Hartree) energy — the interaction averaged over the other&rsquo;s instantaneous state:</p>
        <EqBlock label="94-96">{String.raw`\mathscr{V}'_A(t) = \mathrm{Tr}_B\big[\mathscr{V}'(t)\,\rho_B(t)\big], \qquad \mathscr{V}'_B(t) = \mathrm{Tr}_A\big[\mathscr{V}'(t)\,\rho_A(t)\big].`}</EqBlock>
        <p>Substituting the decomposition into Eqs. 89–90 gives coupled Hartree equations — a mean-field commutator plus a correlation-driven term where damping and noise hide:</p>
        <EqBlock label="97-98">{String.raw`\begin{aligned}i\hbar\,\dot{\rho}_A(t) &= \big[\mathscr{V}'_A(t),\rho_A(t)\big] + \mathrm{Tr}_B\big[\mathscr{V}'(t),\rho_c(t)\big], \\ i\hbar\,\dot{\rho}_B(t) &= \big[\mathscr{V}'_B(t),\rho_B(t)\big] + \mathrm{Tr}_A\big[\mathscr{V}'(t),\rho_c(t)\big].\end{aligned}`}</EqBlock>

        <p>The correlation operator obeys its own equation, whose leading driving term is the bare interaction acting on the factorized state:</p>
        <EqBlock label="99">{String.raw`i\hbar\,\dot{\rho}_c(t) = \big[\mathscr{V}'(t),\rho_A\otimes\rho_B\big] - \mathrm{Tr}_B\big[\mathscr{V}'(t),\rho_c\big]\otimes\rho_A - \mathrm{Tr}_A\big[\mathscr{V}'(t),\rho_c\big]\otimes\rho_B + \cdots`}</EqBlock>
        <p>Keeping only the leading (second-order) source,</p>
        <EqBlock label="100">{String.raw`i\hbar\,\dot{\rho}_c(t) = \big[\mathscr{V}'(t),\rho_A(t)\otimes\rho_B(t)\big],`}</EqBlock>
        <p>and formally integrating gives the correlation as the accumulated memory of past interactions:</p>
        <EqBlock label="101">{String.raw`\rho_c(t) = -\frac{i}{\hbar}\int_{t_0}^{t}dt'\;\big[\mathscr{V}'(t'),\rho_A(t')\otimes\rho_B(t')\big].`}</EqBlock>

        <p>The reservoir is so large its state barely changes (it stays in its initial thermal state):</p>
        <EqBlock label="102">{String.raw`\frac{d}{dt}\rho_B(t) \approx 0.`}</EqBlock>
        <p>Substituting <Tex>{String.raw`\rho_c`}</Tex> back into the Hartree equation for <Tex>{String.raw`A`}</Tex> closes the loop — a double commutator integrated over reservoir memory:</p>
        <KeyResult
          number="103"
          eq={String.raw`\dot{\rho}_A(t) = -\frac{1}{\hbar^2}\int_{t_0}^{t}dt'\;\mathrm{Tr}_B\big\{[\mathscr{V}'(t),[\mathscr{V}'(t'),\rho_A(t')\otimes\rho_B(t_0)]]\big\} + \text{adjoint}.`}
          label="Closed integro-differential master equation"
        />
        <p>Finally, the Markoff approximation makes it local in time: when the reservoir correlation time is far shorter than the system decay time <Tex>{String.raw`1/\Gamma`}</Tex>,</p>
        <KeyResult
          number="104"
          eq={String.raw`\tau \ll \frac{1}{\Gamma}, \qquad \rho_A(t') \to \rho_A(t).`}
          label="Markoff (memoryless) approximation"
          note="Pull ρ_A out of the memory integral at the present time t, and the master equation becomes local — memoryless."
        />

        <Derivation title="Split correlations, solve, then close with reservoir + Markoff" defaultOpen={false}>
          <Step title="Split off the correlations">
            Write the joint operator as factorized plus correlation (Eq. 91). Substitute into the traced Liouville
            equations to get coupled Hartree equations (Eqs. 97–98) and a source equation for{" "}
            <Tex>{String.raw`\rho_c`}</Tex> (Eq. 99). The mean-field commutators are the leading reversible dynamics;{" "}
            <Tex>{String.raw`\rho_c`}</Tex> carries the dissipation.
            <EqBlock>{String.raw`\rho_{AB} = \rho_A\otimes\rho_B + \rho_c.`}</EqBlock>
          </Step>
          <Step title="Solve the correlation to lowest order">
            Drop higher-order terms (Eq. 100) and integrate formally (Eq. 101) — the instantaneous correlation is the
            accumulated memory of past interactions.
            <EqBlock>{String.raw`\rho_c(t) = -\frac{i}{\hbar}\int_{t_0}^{t}dt'\,[\mathscr{V}'(t'),\rho_A(t')\otimes\rho_B(t')].`}</EqBlock>
          </Step>
          <Step title="Reservoir + Markoff close the loop">
            Freeze the reservoir (Eq. 102) and invoke Markoff (Eq. 104) so the memory integral becomes local.
            Substituting back gives the closed, local master equation (Eq. 103).
            <EqBlock>{String.raw`\dot{\rho}_A(t) = -\frac{1}{\hbar^2}\int dt'\;\mathrm{Tr}_B\big\{[\mathscr{V}'(t),[\mathscr{V}'(t'),\rho_A(t)\otimes\rho_B]]\big\}.`}</EqBlock>
          </Step>
        </Derivation>

        <Intuition title="Why Hartree + Markoff">
          Hartree factorization isolates the mean field (reversible) from the correlations (where irreversibility
          lives). Markoff says the reservoir has no memory: it scrambles any kicked-back information faster than the
          system can respond, so the past drops out and you get a clean, local master equation.
        </Intuition>
        <Callout kind="warning" title="Markoff is an approximation">
          Locality in time holds only when reservoir correlation times are short compared to system decay times.
          Structured reservoirs (e.g. near a photonic band edge) can violate this and produce non-Markovian memory
          effects.
        </Callout>
      </Section>

      {/* ───────────────────────── Section 6 ───────────────────────── */}
      <Section title="Field and atom damping by an oscillator bath: Weisskopf–Wigner decay">
        <Intuition>
          The most physical reservoir of all: a continuum of harmonic oscillators (radiation modes, phonons, any
          structureless bath). Couple a single system oscillator — the cavity mode, or, by mapping, an excited atom — to
          this bath and push the generalized theory through. Out drops the most famous result of open-system optics:
          irreversible exponential decay at the <strong>Weisskopf–Wigner rate</strong> <Tex>{String.raw`\gamma`}</Tex>,
          proportional to the squared dipole, the bath density of states, and the squared coupling at the system
          frequency — exactly <strong>Fermi&rsquo;s golden rule</strong>. Decay is irreversible precisely because the
          bath is a continuum: a photon emitted into one of infinitely many modes never comes back.
        </Intuition>

        <p>The system oscillator <Tex>{String.raw`a`}</Tex> couples to bath oscillators <Tex>{String.raw`b_j`}</Tex> with couplings <Tex>{String.raw`g_j`}</Tex> and detunings <Tex>{String.raw`\Omega-\omega_j`}</Tex>:</p>
        <EqBlock label="105">{String.raw`\mathscr{V}'(t) = \hbar\sum_j g_j\,a\,b_j^{\dagger}\,e^{i(\Omega-\omega_j)t} + \text{adjoint}.`}</EqBlock>
        <p>The bath is a product of independent thermal modes in equilibrium at temperature <Tex>{String.raw`T`}</Tex>:</p>
        <EqBlock label="106">{String.raw`\rho_B = \prod_j \big[1 - e^{-\hbar\omega_j/k_BT}\big]\,e^{-\hbar\omega_j\,b_j^{\dagger}b_j/k_BT},`}</EqBlock>
        <p>each mode carrying the Bose–Einstein occupation</p>
        <EqBlock label="108">{String.raw`\bar n_j = \frac{1}{e^{\hbar\omega_j/k_BT}-1}.`}</EqBlock>
        <p>Only number-conserving bath averages survive a thermal state, with the familiar emission/absorption factors,</p>
        <EqBlock label="107-109">{String.raw`\mathrm{Tr}_B\big[b_j^{\dagger}b_{j'}\rho_B\big] = \bar n_j\,\delta_{jj'}, \qquad \mathrm{Tr}_B\big[b_j b_{j'}^{\dagger}\rho_B\big] = (\bar n_j+1)\,\delta_{jj'},`}</EqBlock>
        <EqBlock label="110">{String.raw`\mathrm{Tr}_B\big[b_j b_{j'}\rho_B\big] = \mathrm{Tr}_B\big[b_j^{\dagger}b_{j'}^{\dagger}\rho_B\big] = 0.`}</EqBlock>

        <p>
          Inserting all this into the generalized master equation (Eq. 103) gives the system-oscillator equation before
          the Markoff step — a memory integral over bath-mode phases, with emission (
          <Tex>{String.raw`\bar n+1`}</Tex>) and absorption (<Tex>{String.raw`\bar n`}</Tex>) contributions:
        </p>
        <EqBlock label="111">{String.raw`\begin{aligned}\dot{\rho}_A(t) = -\int_{t_0}^{t}dt'\sum_j g_j^2\Big\{\ &(\bar n_j+1)\big[a^{\dagger}a\rho_A - a^{\dagger}\rho_A a\big]e^{\,i(\Omega-\omega_j)(t-t')} \\ &+ \bar n_j\big[aa^{\dagger}\rho_A - a\rho_A a^{\dagger}\big]e^{-i(\Omega-\omega_j)(t-t')}\Big\} + \text{adjoint}.\end{aligned}`}</EqBlock>

        <p>The continuum limit replaces the mode sum by a density-of-states integral — and this is what makes decay irreversible:</p>
        <EqBlock label="112">{String.raw`\sum_j g_j^2 \;\to\; \int_0^{\infty} d\omega\;\mathscr{D}(\omega)\,g^2(\omega).`}</EqBlock>
        <p>The Weisskopf–Wigner / Markoff step: the time integral over the rapidly varying phase collapses to a delta function (dropping the principal-value frequency shift),</p>
        <EqBlock label="113">{String.raw`\int_{t_0}^{t}dt'\;e^{\pm i(\Omega-\omega)(t-t')} \;\to\; \pi\,\delta(\Omega-\omega).`}</EqBlock>
        <p>The delta enforces energy conservation, leaving a single decay rate <Tex>{String.raw`\gamma_a`}</Tex> and a master equation identical in form to Eq. 52:</p>
        <KeyResult
          number="114"
          eq={String.raw`\dot{\rho}_A(t) = -\tfrac{1}{2}\gamma_a\Big\{(\bar n+1)\big[a^{\dagger}a\rho_A - a\rho_A a^{\dagger}\big] + \bar n\big[aa^{\dagger}\rho_A - a^{\dagger}\rho_A a\big]\Big\} + \text{adjoint},`}
          label="Markovian master equation for the damped oscillator"
        />
        <p>where the rate is Fermi&rsquo;s golden rule, derived:</p>
        <KeyResult
          eq={String.raw`\gamma_a = 2\pi\,\mathscr{D}(\Omega)\,g^{2}(\Omega).`}
          label="Weisskopf–Wigner / golden-rule decay rate"
          note={
            <>
              Decay rate <Tex>{String.raw`= 2\pi \times |\text{matrix element}|^2 \times`}</Tex> density of final
              states — evaluated at the system frequency <Tex>{String.raw`\Omega`}</Tex>. This is the microscopic
              spontaneous-emission rate and natural linewidth.
            </>
          }
        />

        <p>
          For a two-level <em>atom</em>, replace the oscillator operators <Tex>{String.raw`a,a^{\dagger}`}</Tex> by the
          atomic lowering/raising operators <Tex>{String.raw`\sigma,\sigma^{\dagger}`}</Tex>:
        </p>
        <EqBlock label="115">{String.raw`\dot{\rho}_{\text{atom}}(t) = -\tfrac{1}{2}\gamma_a\Big\{\bar n\big[\sigma\sigma^{\dagger}\rho_{\text{atom}} - \sigma^{\dagger}\rho_{\text{atom}}\sigma\big] + (\bar n+1)\big[\sigma^{\dagger}\sigma\rho_{\text{atom}} - \sigma\rho_{\text{atom}}\sigma^{\dagger}\big]\Big\} + \text{adjoint}.`}</EqBlock>
        <p>At zero temperature (<Tex>{String.raw`\bar n=0`}</Tex>) an initially excited atom decays exponentially — irreversible spontaneous emission:</p>
        <KeyResult
          number="116"
          eq={String.raw`\dot{\rho}_{aa}(t) = -\gamma_a\,\rho_{aa} \;\Longrightarrow\; \rho_{aa}(t) = \rho_{aa}(0)\,e^{-\gamma_a t}.`}
          label="Weisskopf–Wigner spontaneous emission"
        />
        <p>
          The whole construction is valid only when the density of states and coupling vary slowly across the system
          linewidth, and <Tex>{String.raw`t-t_0`}</Tex> exceeds the reservoir correlation time{" "}
          <Tex>{String.raw`\tau_c`}</Tex> — the condition behind the integral
        </p>
        <EqBlock label="117">{String.raw`\int_0^{t-t_0}d\tau_1\,d(\omega)\,g^2(\omega)\,\mathscr{D}(\omega)\,e^{\,i(\Omega-\omega)\tau_1}.`}</EqBlock>

        <Derivation title="Oscillator bath → golden-rule decay" defaultOpen={false}>
          <Step title="Insert the coupling and trace">
            Put the linear coupling (Eq. 105) and thermal bath (Eq. 106) into Eq. 103. The bath correlation functions
            (Eqs. 107–110) keep only number-conserving averages, giving emission (<Tex>{String.raw`\bar n+1`}</Tex>) and
            absorption (<Tex>{String.raw`\bar n`}</Tex>) terms (Eq. 111).
          </Step>
          <Step title="Continuum + Weisskopf–Wigner">
            Convert the mode sum to a density-of-states integral (Eq. 112). Under the Markoff conditions (Eq. 117) the
            memory phase integral collapses to a delta function (Eq. 113), enforcing energy conservation{" "}
            <Tex>{String.raw`\omega=\Omega`}</Tex> and yielding the golden-rule rate.
            <EqBlock>{String.raw`\int dt'\;e^{\pm i(\Omega-\omega)(t-t')} \to \pi\delta(\Omega-\omega).`}</EqBlock>
          </Step>
          <Step title="Read off γ and specialize">
            The surviving rate is <Tex>{String.raw`\gamma_a`}</Tex> (Eq. 114). For the atom (
            <Tex>{String.raw`a\to\sigma`}</Tex>) at zero temperature, the excited-state population decays exponentially
            (Eq. 116) — Weisskopf–Wigner spontaneous emission.
            <EqBlock>{String.raw`\rho_{aa}(t) = \rho_{aa}(0)\,e^{-\gamma_a t}.`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="Fermi's golden rule, derived">
          <Tex>{String.raw`\gamma_a = 2\pi\,\mathscr{D}(\Omega)\,g^{2}(\Omega)`}</Tex>: decay rate{" "}
          <Tex>{String.raw`= 2\pi\times|\text{matrix element}|^2\times`}</Tex> density of final states. The reservoir
          master equation reproduces the most-used formula in spectroscopy.
        </Callout>
        <Intuition title="Why irreversible">
          Emission into a <em>single</em> mode is reversible (Rabi oscillation). Emission into a <em>continuum</em> is
          not: the emitted quantum disperses among infinitely many modes whose phases never re-align, so it never
          returns. Irreversibility = continuum + dephasing.
        </Intuition>
        <Callout kind="warning" title="Same equation, different dressing">
          Eqs. 52, 114, and 115 are the <em>same</em> master equation with different reservoir parameters (
          <Tex>{String.raw`\bar n`}</Tex>) and operators (<Tex>{String.raw`a`}</Tex> vs <Tex>{String.raw`\sigma`}</Tex>).
          Recognizing this unity is the whole point of the chapter.
        </Callout>
      </Section>

      {/* ───────────────────────── Carry-forward ───────────────────────── */}
      <Section title="Carry-forward">
        <Callout kind="insight" title="One result, three languages">
          The chapter teaches a single physical result — <strong>damping + noise</strong> — in three interchangeable
          mathematical languages. Recognize them as the same physics so you can pick whichever is convenient later.
          <EqBlock>{String.raw`\dot{\rho}_{nn} = \mathcal{A}\,n\,\rho_{n-1,n-1} + \mathcal{B}(n+1)\rho_{n+1,n+1} - [\mathcal{A}(n+1)+\mathcal{B}\,n]\rho_{nn} \quad\text{(b)}`}</EqBlock>
          <EqBlock>{String.raw`\dot{\rho} = -\frac{1}{2}\frac{\nu}{Q}\Big\{\bar n[aa^{\dagger}\rho - a^{\dagger}\rho a] + (\bar n+1)[a^{\dagger}a\rho - a\rho a^{\dagger}]\Big\} + \text{adj} \quad\text{(a)}`}</EqBlock>
          <EqBlock>{String.raw`\frac{\partial P}{\partial t} = -\frac{\partial}{\partial v}(M_1 P) + \frac{1}{2}\frac{\partial^2}{\partial v^2}(M_2 P) \quad\text{(c)}`}</EqBlock>
        </Callout>

        <Callout kind="note" title="The ideas you keep">
          <ul>
            <li>
              <strong>The reduced density operator</strong> — obtained by tracing out the reservoir — is THE central
              object of open quantum optics; every later laser calculation starts from a master equation of this kind.
            </li>
            <li>
              <strong>Two fingerprints, always paired</strong> — irreversible damping (
              <Tex>{String.raw`\nu/Q`}</Tex> for the field, <Tex>{String.raw`\gamma`}</Tex> for the atom) and
              fluctuating noise (the <Tex>{String.raw`\bar n`}</Tex> source). You cannot have one without the other:
              fluctuation–dissipation.
            </li>
            <li>
              <strong>The operator master equation (Eq. 52)</strong> is the exact starting point for the quantum theory
              of the laser in Chapter&nbsp;XVII — just add gain.
            </li>
            <li>
              <strong>Detailed balance</strong> with <Tex>{String.raw`\mathcal{A}/\mathcal{B}=e^{-\hbar\omega_0/k_BT}`}</Tex>{" "}
              forces the Planck steady state and{" "}
              <Tex>{String.raw`\bar n = 1/(e^{\hbar\omega_0/k_BT}-1)`}</Tex>. Memorize <Tex>{String.raw`\bar n`}</Tex>.
            </li>
            <li>
              <strong>The P-representation</strong> converts operators to phase-space calculus (
              <Tex>{String.raw`a\to\alpha`}</Tex>, <Tex>{String.raw`a^{\dagger}\to\alpha^{*}+\partial_\alpha`}</Tex>),
              turning the master equation into a Fokker–Planck equation — the bridge to semiclassical and quantum-noise
              treatments.
            </li>
            <li>
              <strong>The Markoff approximation</strong> (reservoir correlation time{" "}
              <Tex>{String.raw`\ll`}</Tex> system decay time) makes master equations local; remember structured
              reservoirs can violate it.
            </li>
            <li>
              <strong>The Weisskopf–Wigner rate</strong>{" "}
              <Tex>{String.raw`\gamma_a = 2\pi\,\mathscr{D}(\Omega)\,g^{2}(\Omega)`}</Tex> IS Fermi&rsquo;s
              golden rule; spontaneous emission and natural linewidth are reservoir-damping effects, and irreversibility
              comes from coupling to a <em>continuum</em>.
            </li>
            <li>
              <strong>Amplitude damps at half the energy rate</strong> (<Tex>{String.raw`\nu/2Q`}</Tex> vs{" "}
              <Tex>{String.raw`\nu/Q`}</Tex>) — always check whether a quoted rate is for amplitude or intensity.
            </li>
            <li>
              <strong>Drift = damping, diffusion = noise</strong>, and steady-state width{" "}
              <Tex>{String.raw`= M_2/(2\Gamma)`}</Tex> — the intuition you will reuse for the laser linewidth
              (Schawlow–Townes) and photon statistics.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
