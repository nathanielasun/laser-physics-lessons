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
import Ch17Sim from "@/components/sims/ch17";

export default function Page() {
  return (
    <Lesson slug="ch17">
      <Lede>
        A laser is the only everyday light source that is genuinely quantum at heart: it must be born from a single
        spontaneously-emitted photon and grow, against cavity losses, into a coherent field of millions of photons. The
        semiclassical theory treats the field as a classical wave, so it can never say where that first photon comes
        from, nor account for the residual spontaneous-emission noise that survives once the laser is running — the very
        noise that sets the ultimate linewidth. Here we rebuild the laser from the quantum bottom up: we follow the
        cavity field through its photon-number density matrix <Tex>{String.raw`\rho_{nm}`}</Tex>, let excited atoms
        stream through as a reservoir, and coarse-grain to a master equation. Its diagonal gives the photon statistics
        and the dramatic <strong>threshold transition</strong> from lamp to laser; its off-diagonal elements diffuse in
        phase and hand us the <strong>Schawlow–Townes linewidth</strong>.
      </Lede>

      <Section title="The atom-as-reservoir picture and the coarse-grained field equation">
        <Intuition>
          Invert the usual roles. In the semiclassical theory the atoms were the system and the field a driving
          classical wave. Now the cavity <strong>field</strong> is the quantum system we track — described by its
          photon-number density matrix <Tex>{String.raw`\rho_{nm}(t)`}</Tex> — and the stream of excited atoms passing
          through is the <strong>reservoir</strong>. Each atom is in the cavity for only a short transit time, far
          shorter than any time over which <Tex>{String.raw`\rho_{nm}`}</Tex> changes. So compute the change one atom
          makes, then add up contributions at the injection rate <Tex>{String.raw`r`}</Tex>. Averaging over random
          injection times and over how long ago each atom entered gives a smooth, coarse-grained equation of motion —
          the quantum analogue of the semiclassical &ldquo;polarization feeds the field,&rdquo; but now a statistical
          statement about probabilities.
        </Intuition>
        <p>
          Expand the field in photon-number (Fock) states; <Tex>{String.raw`C_n(t)`}</Tex> is the amplitude for{" "}
          <Tex>{String.raw`n`}</Tex> photons:
        </p>
        <EqBlock>{String.raw`|\psi(t)\rangle = \sum_n C_n(t)\,|n\rangle.`}</EqBlock>
        <p>
          The change of the field density matrix from the atoms that interacted during a short interval is the sum, over
          each atom&rsquo;s time-since-entry <Tex>{String.raw`\tau`}</Tex>, of what that atom did:
        </p>
        <EqBlock label="1">{String.raw`\delta\rho_{nm}^{(\mathrm{c})}(t) = \sum_\tau \big[\rho_{nm;\,\mathrm{atom}}(t+\tau) - \rho_{nm}(t)\big].`}</EqBlock>
        <p>
          With <Tex>{String.raw`N(\Delta t)=r\,\Delta t`}</Tex> atoms entering in a small time{" "}
          <Tex>{String.raw`\Delta t`}</Tex>, the total change is <Tex>{String.raw`N`}</Tex> times the per-atom change,
        </p>
        <EqBlock>{String.raw`\Delta\rho_{nm}^{(\mathrm{c})}(t) = N(\Delta t)\,\delta\rho_{nm}^{(\mathrm{c})}(t),`}</EqBlock>
        <p>so the coarse-grained derivative is simply the injection rate times the per-atom change:</p>
        <KeyResult
          number="2"
          eq={String.raw`\frac{\Delta\rho_{nm}^{(\mathrm{c})}(t)}{\Delta t} = r\,\delta\rho_{nm}^{(\mathrm{c})}(t).`}
          label="Coarse-grained equation of motion"
          note={
            <>
              All the physics is now in evaluating <Tex>{String.raw`\delta\rho`}</Tex> for one atom — which is a Rabi
              problem averaged over the atom&rsquo;s lifetime in the cavity.
            </>
          }
        />
        <p>
          Real atoms do not live forever in the cavity: each is removed a time <Tex>{String.raw`\tau`}</Tex> after
          entering (by collision or by spontaneous decay to a non-lasing level), with an exponential probability
          distribution. Averaging the per-atom field change against it gives
        </p>
        <EqBlock label="3">{String.raw`\delta\rho_{nm}^{(\mathrm{c})}(t) = \int_0^\infty d\tau\,P(\tau)\,\delta\rho_{nm}^{\mathrm{atom}}(t),\qquad P(\tau) = \gamma\,e^{-\gamma\tau},`}</EqBlock>
        <p>
          with <Tex>{String.raw`\gamma=\gamma_a=\gamma_b`}</Tex> the (equal) upper- and lower-level decay rates. Tracing
          over the irrelevant atomic states <Tex>{String.raw`\mu`}</Tex> gives the object we evaluate:
        </p>
        <EqBlock label="4">{String.raw`\overline{\delta\rho}_{nm} = r\int_0^\infty d\tau\,\gamma e^{-\gamma\tau}\Big(\sum_\mu \rho_{nm;\,\mu\mu}(t+\tau) - \rho_{nm}\Big).`}</EqBlock>
        <Callout kind="insight" title="Why average over τ">
          The exponential weight <Tex>{String.raw`\gamma e^{-\gamma\tau}`}</Tex> is the probability the atom has lived a
          time <Tex>{String.raw`\tau`}</Tex> before being knocked out. Integrating the coherent Rabi oscillation{" "}
          <Tex>{String.raw`\cos^2(g\sqrt{n+1}\,\tau)`}</Tex> against it converts it into a smooth gain/loss rate — the
          noise of spontaneous emission is built in by exactly this averaging.
        </Callout>

        <Derivation title="Single-atom Rabi problem inside the coarse-grain">
          <Step title="Atoms enter excited">
            The initial atom+field state has the atom in the upper level <Tex>{String.raw`|a\rangle`}</Tex>:
            <EqBlock label="5">{String.raw`|\psi_{an}(t)\rangle = |a\rangle\,|\psi(t)\rangle.`}</EqBlock>
          </Step>
          <Step title="Resonant Jaynes–Cummings evolution">
            An atom in <Tex>{String.raw`|a\rangle`}</Tex> with <Tex>{String.raw`n`}</Tex> photons oscillates at the
            n-photon Rabi frequency <Tex>{String.raw`g\sqrt{n+1}`}</Tex>. The upper amplitude cosines; the amplitude to
            have decayed to <Tex>{String.raw`|b\rangle`}</Tex> with one more photon sines:
            <EqBlock label="7">{String.raw`C_{an}(t+\tau) = C_n(t)\,\cos\!\big(g\tau\sqrt{n+1}\big),`}</EqBlock>
            <EqBlock label="8">{String.raw`C_{b,\,n+1}(t+\tau) = -\,i\,C_n(t)\,\sin\!\big(g\tau\sqrt{n+1}\big).`}</EqBlock>
            The probability <Tex>{String.raw`\propto\sin^2`}</Tex> is the photon having been emitted into the field.
          </Step>
          <Step title="Build the field density-matrix element">
            Form amplitude products and average over the excitation distribution{" "}
            <Tex>{String.raw`P_\nu`}</Tex>, ready for the <Tex>{String.raw`\tau`}</Tex>-integral of Eq. (4):
            <EqBlock>{String.raw`\rho_{an;\,am}(t+\tau) = \sum_\nu P_\nu\,C_n C_m^*\,\cos\!\big(g\tau\sqrt{n+1}\big)\cos\!\big(g\tau\sqrt{m+1}\big).`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="warning" title="Roles are swapped — keep three rates distinct">
          Contrast Chapter XVI&rsquo;s semiclassical theory: there the field was classical and the atoms the system.
          Here the <strong>field</strong> is the quantum system and the atomic beam is the reservoir. Carry three
          distinct rates throughout: the injection rate <Tex>{String.raw`r`}</Tex>, the atomic decay{" "}
          <Tex>{String.raw`\gamma`}</Tex>, and the cavity loss <Tex>{String.raw`\nu/Q`}</Tex>.
        </Callout>
      </Section>

      <Section title="The quantum master equation: gain, saturation, and the photon rate equation">
        <Intuition>
          Doing the <Tex>{String.raw`\tau`}</Tex>-integrals gives the chapter&rsquo;s engine: a master equation built
          from a linear <strong>gain</strong> coefficient <Tex>{String.raw`\mathscr{A}`}</Tex> (how strongly one excited
          atom amplifies), a self-<strong>saturation</strong> coefficient <Tex>{String.raw`\mathscr{B}`}</Tex> (how the
          gain shrinks when the field is already strong), and the cavity <strong>loss</strong>{" "}
          <Tex>{String.raw`\nu/Q`}</Tex>. The structure is a flow of probability on the photon-number ladder: it streams{" "}
          <em>up</em> by stimulated + spontaneous emission from atoms, and <em>down</em> by cavity loss. The diagonal is
          the famous photon rate equation; the off-diagonal carries phase.
        </Intuition>
        <p>
          To fourth order in the coupling, with the geometric series of saturation orders resummed, the per-atom gain
          contribution carries <em>saturated denominators</em> that prevent runaway gain:
        </p>
        <EqBlock label="12">{String.raw`\overline{\delta\rho}_{nm} = -\,\frac{\mathscr{N}'_{nm}\,\mathscr{A}}{1+\mathscr{N}_{nm}\,\mathscr{B}/\mathscr{A}}\,\rho_{nm} + \frac{\sqrt{nm}\;\mathscr{A}}{1+\mathscr{N}_{n-1,m-1}\,\mathscr{B}/\mathscr{A}}\,\rho_{n-1,m-1}.`}</EqBlock>
        <p>
          The leading order gives the gain coefficient; the next gives self-saturation (note{" "}
          <Tex>{String.raw`\mathscr{B}\propto\mathscr{A}`}</Tex>, so{" "}
          <Tex>{String.raw`\mathscr{B}/\mathscr{A}=4(g/\gamma)^2`}</Tex> is the saturation per photon):
        </p>
        <EqBlock label="13">{String.raw`\mathscr{A} = 2r_a\Big(\frac{g}{\gamma}\Big)^2,`}</EqBlock>
        <EqBlock label="14">{String.raw`\mathscr{B} = 4\Big(\frac{g}{\gamma}\Big)^2\mathscr{A}.`}</EqBlock>
        <p>
          The dimensionless saturation numerators differ only off-diagonal, by the coefficient of the{" "}
          <Tex>{String.raw`(n-m)^2`}</Tex> coherence term — <Tex>{String.raw`1/8`}</Tex> for{" "}
          <Tex>{String.raw`\mathscr{N}'`}</Tex> versus <Tex>{String.raw`1/16`}</Tex> for{" "}
          <Tex>{String.raw`\mathscr{N}`}</Tex>; on the diagonal both reduce to <Tex>{String.raw`n+1`}</Tex>:
        </p>
        <EqBlock label="15a">{String.raw`\mathscr{N}'_{nm} = \tfrac{1}{2}\big[(n+1)+(m+1)\big] + \frac{\tfrac{1}{8}(n-m)^2\mathscr{B}}{\mathscr{A}},`}</EqBlock>
        <EqBlock label="15b">{String.raw`\mathscr{N}_{nm} = \tfrac{1}{2}\big[(n+1)+(m+1)\big] + \frac{\tfrac{1}{16}(n-m)^2\mathscr{B}}{\mathscr{A}}.`}</EqBlock>
        <p>
          Appending the cavity-loss reservoir from Sec. 16-1 (with zero thermal photons,{" "}
          <Tex>{String.raw`\bar n=0`}</Tex>) completes the chapter&rsquo;s basic result — gain feeds the diagonal from
          below, loss feeds it from above:
        </p>
        <KeyResult
          number="16"
          eq={String.raw`\dot\rho_{nm} = -\frac{\mathscr{N}'_{nm}\,\mathscr{A}}{1+\mathscr{N}_{nm}\mathscr{B}/\mathscr{A}}\rho_{nm} + \frac{\sqrt{nm}\;\mathscr{A}}{1+\mathscr{N}_{n-1,m-1}\mathscr{B}/\mathscr{A}}\rho_{n-1,m-1} - \tfrac{1}{2}\frac{\nu}{Q}(n+m)\rho_{nm} + \frac{\nu}{Q}\sqrt{(n+1)(m+1)}\,\rho_{n+1,m+1}.`}
          label="Coarse-grained density-matrix equation (one of the basic results)"
        />
        <p>Set <Tex>{String.raw`n=m`}</Tex> (so <Tex>{String.raw`\mathscr{N}\to n+1`}</Tex>): the diagonal is a birth–death rate equation for <Tex>{String.raw`p(n)=\rho_{nn}`}</Tex>.</p>
        <KeyResult
          number="17"
          eq={String.raw`\dot\rho_{nn} = -\frac{(n+1)\mathscr{A}}{1+(n+1)\mathscr{B}/\mathscr{A}}\rho_{nn} + \frac{n\mathscr{A}}{1+n\mathscr{B}/\mathscr{A}}\rho_{n-1,n-1} - \frac{\nu}{Q}\,n\,\rho_{nn} + \frac{\nu}{Q}(n+1)\rho_{n+1,n+1}.`}
          label="The quantum photon rate equation (diagonal)"
          note={
            <>
              Gain promotes <Tex>{String.raw`n-1\to n`}</Tex> and depletes <Tex>{String.raw`n\to n+1`}</Tex>; loss
              promotes <Tex>{String.raw`n+1\to n`}</Tex> and depletes <Tex>{String.raw`n\to n-1`}</Tex>. The saturated
              denominators keep every up-rate bounded.
            </>
          }
        />

        <Figure
          caption={
            <>
              <strong>Fig. 17-1.</strong> The photon rate equation Eq. (17) is a flow diagram on the photon ladder. Each
              rung <Tex>{String.raw`n`}</Tex> gains probability from below (saturated emission from rung{" "}
              <Tex>{String.raw`n-1`}</Tex>) and from above (cavity loss out of rung <Tex>{String.raw`n+1`}</Tex>), and
              loses it the same two ways. In steady state every adjacent pair of arrows balances — detailed balance.
            </>
          }
        >
          <svg viewBox="0 0 560 230" style={{ width: "100%", maxWidth: 560 }}>
            {/* rungs */}
            {[
              { x: 70, label: "n−1" },
              { x: 230, label: "n" },
              { x: 390, label: "n+1" },
            ].map((r, i) => (
              <g key={i}>
                <line x1={r.x} y1={115} x2={r.x + 100} y2={115} stroke="#334155" strokeWidth={3} />
                <text x={r.x + 50} y={138} textAnchor="middle" fontSize={14} fill="#1b2330">
                  |{r.label}⟩
                </text>
              </g>
            ))}
            {/* gain arrows (up the ladder, left->right): n-1 -> n -> n+1, drawn above */}
            <defs>
              <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
              </marker>
              <marker id="al" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#e11d48" />
              </marker>
            </defs>
            {/* gain: emission feeds upward */}
            <path d="M170,95 C200,55 260,55 290,95" fill="none" stroke="#16a34a" strokeWidth={2.2} markerEnd="url(#ar)" />
            <path d="M330,95 C360,55 420,55 450,95" fill="none" stroke="#16a34a" strokeWidth={2.2} markerEnd="url(#ar)" />
            <text x="230" y="48" textAnchor="middle" fontSize={12} fill="#15803d">
              gain  (n+1)𝒜 ⁄ [1+(n+1)ℬ/𝒜]
            </text>
            {/* loss: cavity loss feeds downward */}
            <path d="M450,135 C420,178 360,178 330,135" fill="none" stroke="#e11d48" strokeWidth={2.2} markerEnd="url(#al)" />
            <path d="M290,135 C260,178 200,178 170,135" fill="none" stroke="#e11d48" strokeWidth={2.2} markerEnd="url(#al)" />
            <text x="330" y="200" textAnchor="middle" fontSize={12} fill="#be123c">
              loss  (ν/Q)·n
            </text>
          </svg>
        </Figure>

        <p>
          A convenient but limited shortcut is the two-term Taylor expansion of the saturation denominator{" "}
          <Tex>{String.raw`1/(1+x)\approx 1-x`}</Tex>:
        </p>
        <EqBlock label="18">{String.raw`\dot\rho_{nm} \simeq -\big[\mathscr{A}-(n+1)\mathscr{B}\big](n+1)\rho_{nm} + \big(\mathscr{A}-n\mathscr{B}\big)\sqrt{nm}\,\rho_{n-1,m-1} - \tfrac{1}{2}\frac{\nu}{Q}(n+m)\rho_{nm} + \frac{\nu}{Q}(n+1)\rho_{n+1,m+1}.`}</EqBlock>

        <Callout kind="warning" title="Exact (16/17) vs expanded (18) — do not conflate the coefficients">
          <Tex>{String.raw`\mathscr{A}=2r_a(g/\gamma)^2`}</Tex> is the linear gain;{" "}
          <Tex>{String.raw`\mathscr{B}=4(g/\gamma)^2\mathscr{A}`}</Tex> the self-saturation;{" "}
          <Tex>{String.raw`\mathscr{N},\mathscr{N}'`}</Tex> the dimensionless saturation numerators (equal to{" "}
          <Tex>{String.raw`n+1`}</Tex> on the diagonal); <Tex>{String.raw`\nu/Q`}</Tex> the cavity loss; threshold is{" "}
          <Tex>{String.raw`\mathscr{A}=\nu/Q`}</Tex>. Eqs. (16)/(17) carry the <em>full</em> saturated denominators and
          never let the up-rate go negative. The expanded Eq. (18) gain factor{" "}
          <Tex>{String.raw`\mathscr{A}-(n+1)\mathscr{B}`}</Tex> turns negative for{" "}
          <Tex>{String.raw`n>\mathscr{A}/\mathscr{B}`}</Tex> — valid only near and below threshold. Use the exact form
          above threshold.
        </Callout>

        <p>The observable connecting to classical intensity is the mean photon number,</p>
        <EqBlock label="19">{String.raw`\langle n(t)\rangle = \sum_n n\,\rho_{nn}(t).`}</EqBlock>
        <p>
          Multiplying Eq. (18) by <Tex>{String.raw`n`}</Tex> and summing gives its equation of motion: a net
          stimulated-gain-minus-loss term, a bare spontaneous-emission source, and saturation,
        </p>
        <EqBlock label="20">{String.raw`\frac{d}{dt}\langle n(t)\rangle = \Big(\mathscr{A}-\frac{\nu}{Q}\Big)\langle n\rangle + \mathscr{A} - \mathscr{B}\big[\langle n^2\rangle + 2\langle n\rangle + 1\big].`}</EqBlock>
        <p>
          Written for the dimensionless intensity <Tex>{String.raw`I_n`}</Tex>, this is exactly the semiclassical
          single-mode intensity equation (Eq. 8-51),
        </p>
        <EqBlock label="21">{String.raw`\dot I_n = 2I_n\big(\alpha_n - \beta_n I_n\big),`}</EqBlock>
        <p>with the net linear-gain and self-saturation coefficients read off as</p>
        <EqBlock label="22">{String.raw`\alpha_n = \tfrac{1}{2}\Big(\mathscr{A}-\frac{\nu}{Q}\Big),`}</EqBlock>
        <EqBlock label="23">{String.raw`\beta_n = \mathscr{B}\Big(\frac{8\hbar\nu}{\varepsilon_0 V}\Big).`}</EqBlock>
        <Callout kind="insight" title="The quantum theory contains the classical one">
          The <Tex>{String.raw`(\mathscr{A}-\nu/Q)\langle n\rangle`}</Tex> term is the classical net gain; the threshold
          condition <Tex>{String.raw`\mathscr{A}=\nu/Q`}</Tex> and the gain coefficient{" "}
          <Tex>{String.raw`\alpha_n=\tfrac12(\mathscr{A}-\nu/Q)`}</Tex> reproduce Chapter VIII. What is new is the bare{" "}
          <Tex>{String.raw`+\mathscr{A}`}</Tex>: spontaneous emission, the source absent from the classical theory and
          the seed of everything quantum about the laser.
        </Callout>

        <p>
          The same physics can be written basis-independently, as a reduced density-<em>operator</em> equation to fourth
          order in the interaction (equivalent to Eq. 16 without choosing the number basis):
        </p>
        <EqBlock label="24">{String.raw`\dot\rho = -\tfrac{1}{2}\mathscr{A}\big(\rho\,aa^\dagger - a^\dagger\rho a\big) - \tfrac{1}{2}\frac{\nu}{Q}\big(\rho\,a^\dagger a - a\rho a^\dagger\big) + \tfrac{1}{8}\mathscr{B}\big(\rho\,(aa^\dagger)^2 + 3\,aa^\dagger\rho\,aa^\dagger - 4\,a^\dagger\rho\,aa^\dagger a\big) + \text{adjoint}.`}</EqBlock>
        <p>
          Or, in the coherent-state representation, as a Fokker–Planck equation for the field quasi-probability — drift
          sets the intensity, the diffusion term is spontaneous-emission noise:
        </p>
        <EqBlock label="25">{String.raw`\frac{\partial}{\partial t}P(a,t) = -\frac{1}{2}\Big\{\frac{\partial}{\partial a}\Big[\Big(\mathscr{A}-\frac{\nu}{Q}-\mathscr{B}\,|a|^2\Big)a\,P\Big] + \text{c.c.}\Big\} + \mathscr{A}\,\frac{\partial^2}{\partial a\,\partial a^*}P.`}</EqBlock>
        <Intuition title="Drift vs diffusion in the Fokker–Planck">
          The first-derivative (drift) term pushes the amplitude to its steady value and dies once the laser is
          established — it does <em>not</em> fix the phase. Only the{" "}
          <Tex>{String.raw`\mathscr{A}`}</Tex> second-derivative (diffusion) term then remains, slowly randomizing the
          phase. That residual spontaneous-emission noise is the entire origin of the laser linewidth.
        </Intuition>

        <Derivation title="From the single-atom integral to the rate equation">
          <Step title="Integrate the Rabi products to get gain and saturation">
            Carry the <Tex>{String.raw`\tau`}</Tex>-integral of cosine/sine products against{" "}
            <Tex>{String.raw`e^{-\gamma\tau}`}</Tex> to fourth order in <Tex>{String.raw`g`}</Tex>. The leading term is
            gain <Tex>{String.raw`\propto\mathscr{A}(n+1)`}</Tex> (Eq. 13); the next is saturation{" "}
            <Tex>{String.raw`\propto\mathscr{B}`}</Tex> (Eq. 14). Resumming the geometric series of these orders gives
            the saturated denominators:
            <EqBlock>{String.raw`1+\mathscr{N}\,\frac{\mathscr{B}}{\mathscr{A}} = 1 + \mathscr{N}\cdot 4(g/\gamma)^2.`}</EqBlock>
          </Step>
          <Step title="Add the cavity-loss reservoir">
            Append the loss term from Sec. 16-1 (Eq. 16-10), with{" "}
            <Tex>{String.raw`\mathscr{B}_{\text{loss}}=\nu/Q`}</Tex> and <Tex>{String.raw`\bar n=0`}</Tex>, completing
            Eqs. (16)/(17):
            <EqBlock>{String.raw`+\,\frac{\nu}{Q}(n+1)\rho_{n+1,n+1}\; -\; \frac{\nu}{Q}\,n\,\rho_{nn}.`}</EqBlock>
          </Step>
          <Step title="Read off the flow diagram">
            On the diagonal each of the four terms of Eq. (17) is an arrow in Fig. 17-1: gain in{" "}
            <Tex>{String.raw`(n-1\to n)`}</Tex> and out <Tex>{String.raw`(n\to n+1)`}</Tex>; loss in{" "}
            <Tex>{String.raw`(n+1\to n)`}</Tex> and out <Tex>{String.raw`(n\to n-1)`}</Tex>:
            <EqBlock>{String.raw`\dot\rho_{nn} = (\text{gain in}) - (\text{gain out}) + (\text{loss in}) - (\text{loss out}).`}</EqBlock>
          </Step>
          <Step title="Take the mean — recover the semiclassical intensity">
            Multiply Eq. (18) by <Tex>{String.raw`n`}</Tex> and sum (Eq. 19) to get Eq. (20); identify{" "}
            <Tex>{String.raw`\alpha_n=\tfrac12(\mathscr{A}-\nu/Q)`}</Tex> (Eq. 22) and the saturation{" "}
            <Tex>{String.raw`\beta_n`}</Tex> (Eq. 23), reproducing Eq. (21). The bare{" "}
            <Tex>{String.raw`+\mathscr{A}`}</Tex> is spontaneous emission:
            <EqBlock>{String.raw`\frac{d\langle n\rangle}{dt} = \Big(\mathscr{A}-\frac{\nu}{Q}\Big)\langle n\rangle + \mathscr{A} - \ldots`}</EqBlock>
          </Step>
        </Derivation>
      </Section>

      <Section title="Laser photon statistics: detailed balance and the threshold transition">
        <Intuition>
          Set <Tex>{String.raw`\dot\rho_{nn}=0`}</Tex>. In steady state the up-flow and down-flow between any two
          adjacent rungs must balance exactly — <strong>detailed balance</strong> — which collapses the rate equation
          into a simple recursion linking <Tex>{String.raw`p(n)`}</Tex> to <Tex>{String.raw`p(n-1)`}</Tex>. The headline
          is the <strong>threshold transition</strong> as the pump <Tex>{String.raw`\mathscr{A}/(\nu/Q)`}</Tex> rises:
          below threshold the distribution decays monotonically (a thermal-like lamp); above threshold it becomes a
          bell-shaped peak clamped at <Tex>{String.raw`\hat n_{ss}`}</Tex>; far above, it approaches Poisson — the
          signature of a coherent field.
        </Intuition>
        <p>
          Detailed balance equates the loss flow out of rung <Tex>{String.raw`n+1`}</Tex> with the net gain flow into it
          from rung <Tex>{String.raw`n`}</Tex> (here in the expanded form for transparency):
        </p>
        <EqBlock label="26">{String.raw`\frac{\nu}{Q}(n+1)\,\rho_{n+1,n+1} = \big[\mathscr{A}-(n+1)\mathscr{B}\big](n+1)\,\rho_{nn}.`}</EqBlock>
        <p>Solving for the ratio gives the recursion, which we iterate upward from the vacuum:</p>
        <EqBlock label="27">{String.raw`\rho_{n+1,n+1} = \Big[\frac{\mathscr{A}-(n+1)\mathscr{B}}{\nu/Q}\Big]\rho_{nn},`}</EqBlock>
        <EqBlock label="28">{String.raw`\rho_{11} = \Big(\frac{\mathscr{A}-\mathscr{B}}{\nu/Q}\Big)\rho_{00},`}</EqBlock>
        <EqBlock label="29">{String.raw`\rho_{22} = \Big(\frac{\mathscr{A}-2\mathscr{B}}{\nu/Q}\Big)\rho_{11} = \Big(\frac{\mathscr{A}-2\mathscr{B}}{\nu/Q}\Big)\Big(\frac{\mathscr{A}-\mathscr{B}}{\nu/Q}\Big)\rho_{00}.`}</EqBlock>
        <p>The general distribution is a product over rungs:</p>
        <EqBlock label="30">{String.raw`\rho_{nn} = \rho_{00}\prod_{k=1}^{n}\frac{\mathscr{A}-k\mathscr{B}}{\nu/Q}.`}</EqBlock>
        <p>
          Normalization fixes <Tex>{String.raw`\rho_{00}`}</Tex> and defines a normalization factor{" "}
          <Tex>{String.raw`\mathscr{F}_n`}</Tex>:
        </p>
        <EqBlock label="31">{String.raw`1 = \sum_{n=0}^{\infty}\rho_{nn} = \rho_{00}\Big[1 + \sum_{n=1}^{\infty}\prod_{k=1}^{n}\frac{\mathscr{A}-k\mathscr{B}}{\nu/Q}\Big],`}</EqBlock>
        <EqBlock label="32">{String.raw`\rho_{nn} = \mathscr{F}_n^{-1}\prod_{k=1}^{n}\frac{\mathscr{A}-k\mathscr{B}}{\nu/Q}.`}</EqBlock>
        <p>
          The distribution is maximal where each factor equals one, i.e.{" "}
          <Tex>{String.raw`\mathscr{A}-n\mathscr{B}=\nu/Q`}</Tex>, giving the peak/mean photon number — positive (laser
          on) only above threshold:
        </p>
        <KeyResult
          number="33"
          eq={String.raw`\hat n_{ss} = \frac{\mathscr{A}-\nu/Q}{\mathscr{B}}.`}
          label="Threshold order parameter / near-threshold peak"
          note={
            <>
              The ratio <Tex>{String.raw`p_n/p_{n-1}=(\mathscr{A}-n\mathscr{B})/(\nu/Q)`}</Tex> crosses one here. Below
              threshold <Tex>{String.raw`(\mathscr{A}<\nu/Q)`}</Tex> this is negative — the distribution decays
              monotonically; above, a peak appears. (This is the near-threshold form; see Eq. 35 for the true peak away
              from threshold.)
            </>
          }
        />

        <Callout kind="warning" title="Use Eq. (34), not Eq. (32), above threshold">
          The expanded factor <Tex>{String.raw`\mathscr{A}-k\mathscr{B}`}</Tex> goes negative for{" "}
          <Tex>{String.raw`k>\mathscr{A}/\mathscr{B}`}</Tex>, making Eq. (32) unphysical (negative) above threshold — the
          book flags this on p.&nbsp;289. Redo detailed balance with the <em>full</em> saturated denominators of Eq.
          (17): the ratio becomes always positive,
          <EqBlock>{String.raw`\frac{\rho_{n+1,n+1}}{\rho_{nn}} = \frac{\mathscr{A}/(\nu/Q)}{1+(n+1)\mathscr{B}/\mathscr{A}},`}</EqBlock>
          giving a well-behaved strong-signal distribution. This is exactly the recursion the simulation integrates.
        </Callout>

        <p>The strong-signal steady-state distribution from the full saturated equation is (schematically, as printed)</p>
        <EqBlock label="34">{String.raw`\rho_{nn} = \mathscr{N}_s^{-1}\left\{\frac{\left[\dfrac{\mathscr{A}^2}{\mathscr{B}(\nu/Q)}\right]^{\,n+\mathscr{A}/\mathscr{B}}}{\big[n+\mathscr{A}/\mathscr{B}\big]!}\right\},`}</EqBlock>
        <p>
          with the more accurate large-<Tex>{String.raw`n`}</Tex> mean, which reduces to{" "}
          <Tex>{String.raw`(\mathscr{A}-\nu/Q)/\mathscr{B}`}</Tex> near threshold but is the correct strong-signal value:
        </p>
        <KeyResult
          number="35"
          eq={String.raw`\hat n_{ss} = \frac{\mathscr{A}}{\nu/Q}\cdot\frac{\mathscr{A}-\nu/Q}{\mathscr{B}}.`}
          label="Strong-signal mean photon number"
          note={
            <>
              This — not Eq. (33) — is where the integrated distribution actually peaks away from threshold. At{" "}
              <Tex>{String.raw`\mathscr{A}=200,\ \nu/Q=50,\ \mathscr{B}/\mathscr{A}=0.004`}</Tex> it predicts{" "}
              <Tex>{String.raw`\hat n_{ss}\approx 750`}</Tex>, four times the near-threshold estimate. The simulation
              confirms this.
            </>
          }
        />
        <p>Deep above threshold, saturation makes the mean scale as</p>
        <EqBlock label="36">{String.raw`\langle n\rangle = \frac{\mathscr{A}^2}{\mathscr{B}\,(\nu/Q)},`}</EqBlock>
        <p>
          and the distribution approaches the Poisson form of a coherent state — the statistics one measures directly by
          photodetection:
        </p>
        <KeyResult
          number="37"
          eq={String.raw`\rho_{nn} \;\approx\; \frac{e^{-\langle n\rangle}\,\langle n\rangle^{\,n}}{n!}.`}
          label="Poisson (coherent-state) limit far above threshold"
        />

        <Derivation title="From detailed balance to the threshold transition">
          <Step title="Detailed balance from the rate equation">
            Setting <Tex>{String.raw`\dot\rho_{nn}=0`}</Tex> in Eq. (17/18), the only consistent steady solution equates
            each adjacent up-flow with its down-flow:
            <EqBlock>{String.raw`\frac{\nu}{Q}(n+1)\rho_{n+1,n+1} = \big[\mathscr{A}-(n+1)\mathscr{B}\big](n+1)\rho_{nn}.`}</EqBlock>
          </Step>
          <Step title="Iterate the recursion">
            Solve for the ratio (Eq. 27) and iterate from <Tex>{String.raw`\rho_{00}`}</Tex> (Eqs. 28, 29) to the product
            (Eq. 30). The <Tex>{String.raw`k`}</Tex>-th factor <Tex>{String.raw`(\mathscr{A}-k\mathscr{B})/(\nu/Q)`}</Tex>{" "}
            exceeds one (emission wins) for small <Tex>{String.raw`k`}</Tex> and drops below one once{" "}
            <Tex>{String.raw`k\mathscr{B}>\mathscr{A}-\nu/Q`}</Tex>:
            <EqBlock>{String.raw`\rho_{nn} = \rho_{00}\prod_{k=1}^{n}\frac{\mathscr{A}-k\mathscr{B}}{\nu/Q}.`}</EqBlock>
          </Step>
          <Step title="Normalize and find the peak">
            Impose <Tex>{String.raw`\sum_n\rho_{nn}=1`}</Tex> (Eq. 31) to fix <Tex>{String.raw`\rho_{00}`}</Tex> (Eq.
            32). The distribution is maximal where the ratio equals one, giving Eq. (33). Below threshold this is
            negative — a monotonic lamp; above, a peak:
            <EqBlock>{String.raw`\hat n_{ss} = \frac{\mathscr{A}-\nu/Q}{\mathscr{B}}.`}</EqBlock>
          </Step>
          <Step title="Fix the unphysical tail with the full saturated form">
            Since <Tex>{String.raw`\mathscr{A}-k\mathscr{B}`}</Tex> goes negative for large{" "}
            <Tex>{String.raw`k`}</Tex>, redo the balance with the full denominators of Eq. (17). The ratio is always
            positive, giving Eq. (34) and its mean Eq. (35); expanding for large{" "}
            <Tex>{String.raw`\langle n\rangle`}</Tex> recovers Poisson (Eq. 37):
            <EqBlock>{String.raw`\frac{\rho_{n+1,n+1}}{\rho_{nn}} = \frac{\mathscr{A}/(\nu/Q)}{1+(n+1)\mathscr{B}/\mathscr{A}}.`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="A laser is near-coherent but noisier than ideal">
          The laser is super-Poissonian (Fano <Tex>{String.raw`>1`}</Tex>), <em>most</em> strongly near threshold, and
          approaches Poisson (Fano <Tex>{String.raw`\to 1`}</Tex> from above) far above threshold as it becomes coherent
          (Eq. 37). Residual spontaneous emission keeps it from ever being a <em>perfect</em> coherent state. As a
          quantitative companion, the <em>mean</em> grows large far above threshold,{" "}
          <Tex>{String.raw`\langle n\rangle = (\mathscr{A}/\mathscr{B})\cdot\mathscr{A}/(\nu/Q)`}</Tex> (Eq. 36),
          exceeding the near-threshold <Tex>{String.raw`\mathscr{A}/\mathscr{B}`}</Tex> estimate by the factor{" "}
          <Tex>{String.raw`\mathscr{A}/(\nu/Q)`}</Tex>. Watch the Fano factor in the simulation fall toward 1 — but stay
          above it — as you crank the pump.
        </Callout>

        <SimFrame
          title="Laser turn-on: integrating the quantum photon rate equation across threshold"
          caption={
            <>
              The simulation integrates the <em>full saturated</em> photon rate equation Eq. (17) (with the unphysical
              expanded gain of Eq. 18 deliberately avoided) from a sharp delta at{" "}
              <Tex>{String.raw`n_0`}</Tex>, using an unconditionally-stable implicit step. The top panel is the photon
              distribution <Tex>{String.raw`\rho_{nn}`}</Tex> animating to steady state; the dashed orange curve is the
              equal-<Tex>{String.raw`\langle n\rangle`}</Tex> Poisson distribution for comparison. The bottom panel is
              the buildup curve <Tex>{String.raw`\langle n\rangle(t)`}</Tex> (Figs. 17-4, 17-5).
            </>
          }
          tryThis={
            <>
              Start below threshold (<Tex>{String.raw`\mathscr{A}<\nu/Q`}</Tex>, e.g.{" "}
              <Tex>{String.raw`\mathscr{A}=40`}</Tex>): the distribution relaxes to a monotonic, thermal-like decay — a
              lamp. Now raise <Tex>{String.raw`\mathscr{A}`}</Tex> past <Tex>{String.raw`\nu/Q`}</Tex> and watch the
              distribution climb and settle into a bell peak at <Tex>{String.raw`\hat n_{ss}`}</Tex> (cyan marker, Eq.
              35 — note it sits at four times the Eq. 33 estimate). Watch the Fano factor fall toward 1 (but stay above
              it) and the linewidth <Tex>{String.raw`D\propto 1/\langle n\rangle`}</Tex> shrink as you pump harder. Set{" "}
              <Tex>{String.raw`n_0=0`}</Tex> to watch the laser build from vacuum — a single spontaneous photon.
            </>
          }
        >
          <Ch17Sim />
        </SimFrame>
      </Section>

      <Section title="Off-diagonal elements and the laser linewidth">
        <Intuition>
          The diagonal gave intensity and statistics; the <strong>off-diagonal</strong> elements{" "}
          <Tex>{String.raw`\rho_{n,n+k}`}</Tex> carry the field&rsquo;s <strong>phase</strong> — and hence its spectrum.
          Above threshold the amplitude is clamped (saturation quenches intensity noise), but nothing pins the phase:
          each spontaneously-emitted photon kicks it a little, so the phase diffuses freely around the circle. This
          phase diffusion makes <Tex>{String.raw`\rho_{n,n+1}(t)`}</Tex> decay exponentially, the field correlation
          decay as <Tex>{String.raw`e^{-Dt}`}</Tex>, and the spectrum a <strong>Lorentzian</strong>. The remarkable
          result: <Tex>{String.raw`D\propto \mathscr{A}/\langle n\rangle`}</Tex> — the line <em>narrows</em> as the
          laser is pumped harder.
        </Intuition>
        <p>
          The mean field is built from the nearest off-diagonal coherences{" "}
          <Tex>{String.raw`\rho_{n,n+1}`}</Tex>; their decay is the spectral lineshape:
        </p>
        <EqBlock label="38">{String.raw`\langle E(t)\rangle = \tfrac{1}{2}\mathscr{E}\sum_n \rho_{n,n+1}\sqrt{n+1}\,e^{-i\nu t} + \text{c.c.}`}</EqBlock>
        <p>
          We need the equation of motion for <Tex>{String.raw`\rho_{n,n+1}`}</Tex>. Starting from the expanded
          saturation denominator,
        </p>
        <EqBlock label="39">{String.raw`\frac{1}{1+\mathscr{N}'_{n,n+1}\mathscr{B}/\mathscr{A}} \simeq 1 - \frac{\mathscr{N}'_{n,n+1}\mathscr{B}}{\mathscr{A}},`}</EqBlock>
        <p>the off-diagonal coherence obeys, with its own saturation and the cavity-loss couplings to its neighbors,</p>
        <EqBlock label="40">{String.raw`\dot\rho_{n,n+1} = -\Big\{\big[\mathscr{A}-\mathscr{B}(n+\tfrac{3}{2})\big](n+\tfrac{3}{2}) - \tfrac{1}{8}\mathscr{B} - \frac{\nu}{Q}(n+\tfrac{1}{2})\Big\}\rho_{n,n+1} + \big[\mathscr{A}-\mathscr{B}(n+\tfrac{1}{2})\big]\sqrt{n(n+1)}\,\rho_{n-1,n} + \frac{\nu}{Q}\sqrt{(n+1)(n+2)}\,\rho_{n+1,n+2}.`}</EqBlock>
        <p>
          Far enough above threshold the coherence decays exponentially at a rate <Tex>{String.raw`\mu_1`}</Tex>, with a
          steady amplitude profile (the square-root of the diagonal product):
        </p>
        <EqBlock label="41">{String.raw`\rho_{n,n+1}(t) = \mathscr{N}_1\Big(\prod_{l=1}^{n}\frac{\mathscr{A}-\mathscr{B}l}{\nu/Q}\;\prod_{m=1}^{n+1}\frac{\mathscr{A}-\mathscr{B}m}{\nu/Q}\Big)^{1/2}e^{-\mu_1 t}.`}</EqBlock>
        <p>The constant-profile approximation closes the recursion via the neighbor relations</p>
        <EqBlock label="42">{String.raw`\rho_{n-1,n} \simeq \frac{\nu}{Q}\big[\mathscr{A}-\mathscr{B}(n+\tfrac{1}{2})\big]^{-1}\rho_{n,n+1},`}</EqBlock>
        <EqBlock label="43">{String.raw`\rho_{n+1,n+2} \simeq \big[\mathscr{A}-\mathscr{B}(n+\tfrac{3}{2})\big]\frac{Q}{\nu}\,\rho_{n,n+1}.`}</EqBlock>
        <p>
          Expanding the square roots for large <Tex>{String.raw`n`}</Tex> exposes a near-cancellation between the large
          gain and loss terms:
        </p>
        <EqBlock label="44">{String.raw`\big[n(n+1)\big]^{1/2} \simeq n + \tfrac{1}{2} - \tfrac{1}{8}n^{-1},`}</EqBlock>
        <EqBlock label="45">{String.raw`\big[(n+1)(n+2)\big]^{1/2} \simeq n + 1 + \tfrac{1}{2} - \tfrac{1}{8}(n+1)^{-1}.`}</EqBlock>
        <p>After the cancellation only a small residual decay remains — the phase-diffusion rate:</p>
        <EqBlock label="46">{String.raw`\dot\rho_{n,n+1} = -\tfrac{1}{8}\Big(\frac{\mathscr{A}}{n+1} + \frac{\nu/Q}{n} - \tfrac{1}{2}\frac{\mathscr{B}}{n+1} + \varepsilon\Big)\rho_{n,n+1}.`}</EqBlock>
        <p>
          The truncation is justified because the corrections are of order{" "}
          <Tex>{String.raw`(\mathscr{B}/\mathscr{A})^2`}</Tex>, negligible well above threshold:
        </p>
        <EqBlock label="47">{String.raw`|\varepsilon| \approx \frac{[(\nu/Q)\mathscr{B}]^{1/2}}{\bar n_{ss}}\Big(\frac{\mathscr{B}\,\bar n_{ss}}{\nu/Q}\Big)^2 < \frac{[(\nu/Q)\mathscr{B}]^{1/2}}{\bar n_{ss}} \ll \frac{\nu/Q}{\bar n_{ss}}.`}</EqBlock>
        <p>The net decay rate is the phase-diffusion constant:</p>
        <KeyResult
          number="48"
          eq={String.raw`D = \tfrac{1}{4}\,\frac{\mathscr{A}+\nu/Q}{\hat n_{ss}} \;\simeq\; \tfrac{1}{2}\,\frac{\mathscr{A}}{\hat n_{ss}}.`}
          label="Phase-diffusion constant"
          note={
            <>
              Near threshold <Tex>{String.raw`\mathscr{A}\approx\nu/Q`}</Tex> so{" "}
              <Tex>{String.raw`\mathscr{A}+\nu/Q\approx 2\mathscr{A}`}</Tex>. The crucial feature:{" "}
              <Tex>{String.raw`D\propto 1/\hat n_{ss}`}</Tex> — more photons, slower phase diffusion, narrower line.
            </>
          }
        />
        <p>
          Exponential decay of the coherence makes the mean field a damped cosine, and its power spectrum the Fourier
          transform — a Lorentzian centered at <Tex>{String.raw`\nu`}</Tex>:
        </p>
        <EqBlock label="50">{String.raw`\langle E(t)\rangle = \langle E(0)\rangle\,\cos(\nu t)\,e^{-\tfrac{1}{2}Dt},`}</EqBlock>
        <KeyResult
          number="51"
          eq={String.raw`|\bar E(\omega)|^2 = \frac{\langle E(0)\rangle^2}{4}\,\frac{1}{(\omega-\nu)^2 + (\tfrac{1}{2}D)^2}.`}
          label="Lorentzian power spectrum (Schawlow–Townes line)"
        />
        <p>The normalized lineshape (Fig. 17-6), sharply peaked at line center, is</p>
        <EqBlock>{String.raw`\frac{|E(\omega)|^2}{|E(\nu)|^2} = \frac{(\tfrac{1}{2}D)^2}{(\omega-\nu)^2 + (\tfrac{1}{2}D)^2}.`}</EqBlock>

        <Figure
          caption={
            <>
              <strong>Fig. 17-6.</strong> The laser spectrum is a Lorentzian centered at the cavity frequency{" "}
              <Tex>{String.raw`\nu`}</Tex>, with half-width at half maximum <Tex>{String.raw`\tfrac{1}{2}D`}</Tex>.
              Because <Tex>{String.raw`D\propto 1/\langle n\rangle`}</Tex>, pumping the laser harder narrows the line.
            </>
          }
        >
          <svg viewBox="0 0 520 200" style={{ width: "100%", maxWidth: 520 }}>
            <line x1={40} y1={170} x2={500} y2={170} stroke="#9aa3b2" strokeWidth={1} />
            <line x1={260} y1={20} x2={260} y2={170} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="4 4" />
            {/* narrow (high ⟨n⟩) Lorentzian */}
            <path
              d={(() => {
                const D = 0.35, pts: string[] = [];
                for (let i = 0; i <= 200; i++) {
                  const x = -6 + (12 * i) / 200;
                  const L = (D / 2) ** 2 / (x * x + (D / 2) ** 2);
                  const px = 260 + x * 38;
                  const py = 170 - L * 145;
                  pts.push(`${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`);
                }
                return pts.join(" ");
              })()}
              fill="none"
              stroke="#4f46e5"
              strokeWidth={2.4}
            />
            {/* broad (low ⟨n⟩) Lorentzian */}
            <path
              d={(() => {
                const D = 1.6, pts: string[] = [];
                for (let i = 0; i <= 200; i++) {
                  const x = -6 + (12 * i) / 200;
                  const L = (D / 2) ** 2 / (x * x + (D / 2) ** 2);
                  const px = 260 + x * 38;
                  const py = 170 - L * 145;
                  pts.push(`${i === 0 ? "M" : "L"}${px.toFixed(1)},${py.toFixed(1)}`);
                }
                return pts.join(" ");
              })()}
              fill="none"
              stroke="#94a3b8"
              strokeWidth={1.8}
              strokeDasharray="6 4"
            />
            <text x={260} y={190} textAnchor="middle" fontSize={13} fill="#1b2330">
              ω → ν (line center)
            </text>
            <text x={300} y={40} fontSize={12} fill="#4f46e5">
              high ⟨n⟩: narrow (½D small)
            </text>
            <text x={300} y={120} fontSize={12} fill="#64748b">
              low ⟨n⟩: broad
            </text>
          </svg>
        </Figure>

        <Derivation title="From off-diagonal decay to the Lorentzian line">
          <Step title="The field is built from off-diagonal coherences">
            Write <Tex>{String.raw`\langle E(t)\rangle`}</Tex> from <Tex>{String.raw`\rho_{n,n+1}`}</Tex> (Eq. 38). Above
            threshold the amplitude is fixed, so the spectrum is set entirely by how these coherences decay in time:
            <EqBlock>{String.raw`\langle E(t)\rangle \propto \sum_n \rho_{n,n+1}\sqrt{n+1}\,e^{-i\nu t}.`}</EqBlock>
          </Step>
          <Step title="Equation of motion and near-cancellation">
            Write <Tex>{String.raw`\dot\rho_{n,n+1}`}</Tex> (Eq. 40) with its saturation and the loss couplings to
            neighbors (Eqs. 42, 43). The leading gain and loss terms nearly cancel; expand the square roots (Eqs. 44, 45)
            to expose the residual:
            <EqBlock>{String.raw`\sqrt{n(n+1)} \simeq n+\tfrac12,\qquad \sqrt{(n+1)(n+2)} \simeq n+1.`}</EqBlock>
          </Step>
          <Step title="Isolate the diffusion constant">
            After cancellation the coherence decays at the small rate of Eq. (46); the net rate is the phase-diffusion
            constant, with the small parameter <Tex>{String.raw`\varepsilon`}</Tex> (Eq. 47) certifying the
            approximation. Note <Tex>{String.raw`D\propto 1/\hat n_{ss}`}</Tex>:
            <EqBlock>{String.raw`D = \tfrac{1}{4}\frac{\mathscr{A}+\nu/Q}{\hat n_{ss}} \simeq \tfrac{1}{2}\frac{\mathscr{A}}{\hat n_{ss}}.`}</EqBlock>
          </Step>
          <Step title="Exponential correlation → Lorentzian spectrum">
            Exponential decay gives <Tex>{String.raw`\langle E(t)\rangle=\langle E(0)\rangle\cos(\nu t)e^{-Dt/2}`}</Tex>{" "}
            (Eq. 50); its Fourier transform (Eq. 51) is a Lorentzian centered at <Tex>{String.raw`\nu`}</Tex> with
            half-width <Tex>{String.raw`\tfrac12 D`}</Tex> — the Schawlow–Townes line:
            <EqBlock>{String.raw`|\bar E(\omega)|^2 \propto \frac{1}{(\omega-\nu)^2+(D/2)^2}.`}</EqBlock>
          </Step>
        </Derivation>

        <Intuition title="Amplitude is pinned, phase is free">
          Saturation clamps the field amplitude — it quenches intensity noise — but there is no restoring force on the
          phase. Each spontaneous photon nudges the phase randomly; the phase executes a random walk around the circle.
          That free phase diffusion, not amplitude noise, is what limits the spectral purity of every laser.
        </Intuition>
        <Callout kind="warning" title="Half-width vs full-width bookkeeping">
          The Lorentzian of Eq. (51) has half-width at half maximum <Tex>{String.raw`\tfrac12 D`}</Tex>, so the full
          width at half maximum is <Tex>{String.raw`D`}</Tex> — exactly the book&rsquo;s stated linewidth (full width at
          half maximum <Tex>{String.raw`=D`}</Tex>, Fig. 17-6). The robust, unambiguous content is the <em>scaling</em>{" "}
          <Tex>{String.raw`D\propto 1/\langle n\rangle`}</Tex>.
        </Callout>
        <Callout kind="insight" title="Linewidth ∝ 1/⟨n⟩ (Schawlow–Townes)">
          <Tex>{String.raw`D\approx\tfrac12\mathscr{A}/\hat n_{ss}`}</Tex>. Because{" "}
          <Tex>{String.raw`\hat n_{ss}`}</Tex> grows with the pump, the linewidth shrinks inversely with photon number.
          This <Tex>{String.raw`1/\langle n\rangle`}</Tex> narrowing is the hallmark of laser coherence and the
          quantum-theory payoff of the chapter.
        </Callout>
      </Section>

      <Section title="Phase-diffusion Fokker–Planck equation and Schawlow–Townes narrowing">
        <Intuition>
          We recover the linewidth a second, cleaner way: directly from the Fokker–Planck equation (Eq. 25) in polar
          amplitude-phase coordinates <Tex>{String.raw`(r,\theta)`}</Tex>. Above threshold the radial coordinate is
          locked at its steady value by the saturating drift, so the only surviving dynamics is in the angle{" "}
          <Tex>{String.raw`\theta`}</Tex> — a pure diffusion equation, a random walk on the circle. That is the cleanest
          statement of why a laser has a finite linewidth: the phase performs Brownian motion driven by spontaneous
          emission.
        </Intuition>
        <p>The polar form of the Fokker–Planck equation has a clean radial drift that pins the amplitude:</p>
        <EqBlock label="52">{String.raw`\frac{\partial}{\partial t}P(r,\theta,t) = -\frac{1}{2}\frac{1}{r}\frac{\partial}{\partial r}\Big[r^2\Big(\mathscr{A}-\frac{\nu}{Q}-\mathscr{B}r^2\Big)P\Big] + \frac{1}{4}\mathscr{A}\,\frac{\partial^2}{\partial\theta^2}P.`}</EqBlock>
        <p>
          Above threshold the radial drift has a stable fixed point <Tex>{String.raw`r_{ss}`}</Tex> with{" "}
          <Tex>{String.raw`r_{ss}^2=\hat n_{ss}`}</Tex>; amplitude fluctuations relax fast and are set to steady state.
          Only the angular diffusion survives:
        </p>
        <KeyResult
          number="53"
          eq={String.raw`\frac{\partial}{\partial t}P(\theta,t) = D_\theta\,\frac{\partial^2}{\partial\theta^2}P(\theta,t),\qquad D_\theta = \frac{1}{4}\,\frac{\mathscr{A}}{r_{ss}^2}.`}
          label="Phase-diffusion equation"
          note={
            <>
              A one-dimensional diffusion of the phase, with the diffusion coefficient of the Fokker–Planck equation{" "}
              <Tex>{String.raw`D_\theta=\tfrac14\mathscr{A}/r_{ss}^2`}</Tex> — the same Brownian-motion mathematics as a
              particle diffusing on a ring. The spectral linewidth is <em>twice</em> this:{" "}
              <Tex>{String.raw`D=2D_\theta=\tfrac12\mathscr{A}/n_{ss}`}</Tex>, because the field-amplitude correlation{" "}
              <Tex>{String.raw`\langle E(t)\rangle\sim e^{-\frac{1}{2}Dt}`}</Tex> (Eq. 50) decays at half the FWHM rate
              while the phase variance accumulates at <Tex>{String.raw`2D_\theta`}</Tex>.
            </>
          }
        />
        <p>
          Comparison of Eq. (53) with the reservoir results (16.66) and (16.74) shows that the spectral linewidth is
          twice the Fokker–Planck diffusion coefficient, <Tex>{String.raw`D=2D_\theta=\tfrac12\mathscr{A}/n_{ss}`}</Tex>.
          Using <Tex>{String.raw`r_{ss}^2=\hat n_{ss}`}</Tex> — and <Tex>{String.raw`\mathscr{A}\approx\nu/Q`}</Tex> near
          threshold — gives the Schawlow–Townes result:
        </p>
        <KeyResult
          number="54"
          eq={String.raw`D = \frac{1}{2}\,\frac{\mathscr{A}}{\hat n_{ss}} \;\simeq\; \frac{1}{2}\,\frac{\nu/Q}{\hat n_{ss}}\quad(\mathscr{A}\approx\nu/Q).`}
          label="Schawlow–Townes linewidth (1/⟨n⟩ narrowing)"
          note={
            <>
              The headline prediction: linewidth <Tex>{String.raw`\propto 1/\langle n\rangle`}</Tex>, falling as the
              laser is pumped harder. This is <em>twice</em> the Fokker–Planck diffusion coefficient{" "}
              <Tex>{String.raw`D_\theta`}</Tex> of Eq. (53), and agrees with the off-diagonal route, Eq. (48).
            </>
          }
        />

        <Derivation title="Polar Fokker–Planck → phase diffusion → linewidth">
          <Step title="Go to polar coordinates">
            Rewrite the Cartesian Eq. (25) in amplitude-phase <Tex>{String.raw`(r,\theta)`}</Tex> form (Eq. 52). The
            drift now has a clean radial piece <Tex>{String.raw`[\mathscr{A}-\nu/Q-\mathscr{B}r^2]r`}</Tex> driving{" "}
            <Tex>{String.raw`r`}</Tex> toward steady state, plus a spontaneous-emission diffusion split between radial
            and angular directions:
            <EqBlock>{String.raw`\partial_t P = -\tfrac{1}{2}\tfrac{1}{r}\partial_r\Big[r^2\big(\mathscr{A}-\tfrac{\nu}{Q}-\mathscr{B}r^2\big)P\Big] + \tfrac{1}{4}\mathscr{A}(\ldots).`}</EqBlock>
          </Step>
          <Step title="Freeze the amplitude above threshold">
            With <Tex>{String.raw`r`}</Tex> locked at <Tex>{String.raw`r_{ss}`}</Tex>, only the angular diffusion
            remains, giving the pure phase-diffusion equation with Fokker–Planck coefficient{" "}
            <Tex>{String.raw`D_\theta`}</Tex>:
            <EqBlock>{String.raw`\partial_t P(\theta,t) = D_\theta\,\partial_\theta^2 P(\theta,t),\qquad D_\theta = \tfrac{1}{4}\frac{\mathscr{A}}{r_{ss}^2}.`}</EqBlock>
          </Step>
          <Step title="Read off the linewidth">
            The Fokker–Planck diffusion coefficient is <Tex>{String.raw`D_\theta=\tfrac14\mathscr{A}/r_{ss}^2`}</Tex>;
            the spectral linewidth is twice it, <Tex>{String.raw`D=2D_\theta=\tfrac12\mathscr{A}/n_{ss}`}</Tex> (the
            field correlation decays at half the FWHM rate, Eq. 50). Using <Tex>{String.raw`r_{ss}^2=\hat n_{ss}`}</Tex>{" "}
            and <Tex>{String.raw`\mathscr{A}\approx\nu/Q`}</Tex> near threshold gives Eq. (54) — the same{" "}
            <Tex>{String.raw`1/\langle n\rangle`}</Tex> narrowing as Eq. (48):
            <EqBlock>{String.raw`D = \tfrac{1}{2}\frac{\mathscr{A}}{\hat n_{ss}} \simeq \tfrac{1}{2}\frac{\nu/Q}{\hat n_{ss}}.`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="Two routes, one answer">
          The off-diagonal/spectral route (Eq. 48) and the Fokker–Planck/phase-diffusion route (Eq. 54) give the same{" "}
          <Tex>{String.raw`D\propto 1/\langle n\rangle`}</Tex>. Consistency across the two complementary descriptions —
          the number representation and the coherent-state representation — is the chapter&rsquo;s closing validation.
        </Callout>
      </Section>

      <Section title="The three results to carry forward">
        <p>Three equations are the spine of the chapter — everything else hangs off them:</p>
        <KeyResult
          number="17"
          eq={String.raw`\dot\rho_{nn} = -\frac{(n+1)\mathscr{A}}{1+(n+1)\mathscr{B}/\mathscr{A}}\rho_{nn} + \frac{n\mathscr{A}}{1+n\mathscr{B}/\mathscr{A}}\rho_{n-1,n-1} - \frac{\nu}{Q}n\,\rho_{nn} + \frac{\nu}{Q}(n+1)\rho_{n+1,n+1}.`}
          label="Quantum photon rate equation — the engine"
        />
        <KeyResult
          number="33 / 35"
          eq={String.raw`\hat n_{ss} = \frac{\mathscr{A}-\nu/Q}{\mathscr{B}} \;\;(\text{near threshold}),\qquad \hat n_{ss} = \frac{\mathscr{A}}{\nu/Q}\cdot\frac{\mathscr{A}-\nu/Q}{\mathscr{B}} \;\;(\text{strong signal}).`}
          label="Steady-state photon number / laser turn-on order parameter"
        />
        <KeyResult
          number="48 / 51 / 54"
          eq={String.raw`D \simeq \tfrac{1}{2}\,\frac{\mathscr{A}}{\hat n_{ss}} = \tfrac{1}{2}\,\frac{\nu/Q}{\hat n_{ss}}\;(\mathscr{A}\approx\nu/Q),\qquad |\bar E(\omega)|^2 \propto \frac{1}{(\omega-\nu)^2+(D/2)^2}.`}
          label="Phase-diffusion constant / Schawlow–Townes linewidth"
        />
        <Callout kind="note" title="What you keep">
          <ul>
            <li>
              <strong>The density matrix splits the labor.</strong> Diagonal{" "}
              <Tex>{String.raw`\rho_{nn}`}</Tex> = intensity and photon statistics; off-diagonal{" "}
              <Tex>{String.raw`\rho_{n,n+k}`}</Tex> = phase coherence and spectrum. This split recurs throughout quantum
              optics.
            </li>
            <li>
              <strong>The atom-as-reservoir, coarse-grained master-equation method</strong> (inject at rate{" "}
              <Tex>{String.raw`r`}</Tex>, average over exponential lifetimes <Tex>{String.raw`\gamma`}</Tex>, append the
              cavity-loss reservoir <Tex>{String.raw`\nu/Q`}</Tex>) is the template for any laser/quantum-optics master
              equation.
            </li>
            <li>
              <strong>Three coefficients, kept distinct forever:</strong>{" "}
              <Tex>{String.raw`\mathscr{A}=2r_a(g/\gamma)^2`}</Tex> (gain),{" "}
              <Tex>{String.raw`\mathscr{B}=4(g/\gamma)^2\mathscr{A}`}</Tex> (saturation),{" "}
              <Tex>{String.raw`\nu/Q`}</Tex> (loss). Threshold is <Tex>{String.raw`\mathscr{A}=\nu/Q`}</Tex>; net gain{" "}
              <Tex>{String.raw`\alpha_n=\tfrac12(\mathscr{A}-\nu/Q)`}</Tex>.
            </li>
            <li>
              <strong>Always keep the saturated denominators</strong>{" "}
              <Tex>{String.raw`1/(1+(n+1)\mathscr{B}/\mathscr{A})`}</Tex> above threshold. The two-term expansion{" "}
              <Tex>{String.raw`\mathscr{A}-(n+1)\mathscr{B}`}</Tex> is only valid near/below threshold and gives
              unphysical results in the lasing regime — the same caution applies to any saturated-gain model.
            </li>
            <li>
              <strong>The threshold is a phase-transition-like crossover:</strong> below it the distribution is
              monotonic/thermal (a lamp); above it, peaked at <Tex>{String.raw`\hat n_{ss}`}</Tex> and approaching
              Poisson (coherent statistics) — but always super-Poissonian, because spontaneous emission never fully
              turns off.
            </li>
            <li>
              <strong>Linewidth comes from phase diffusion, not amplitude noise:</strong> saturation clamps the
              amplitude but the phase random-walks, giving a Lorentzian of width{" "}
              <Tex>{String.raw`D\propto\mathscr{A}/\langle n\rangle`}</Tex> — the universal quantum limit on laser
              coherence.
            </li>
            <li>
              <strong>Two complementary representations, one physics:</strong> the number representation (master
              equation, statistics) and the coherent-state representation (Fokker–Planck; drift = intensity, diffusion =
              linewidth). Fluency switching between them carries into the Langevin and noise-operator chapters (XIX, XX)
              that this chapter forward-references.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
