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
import Ch18Sim from "@/components/sims/ch18";

export default function Page() {
  return (
    <Lesson slug="ch18">
      <Lede>
        Over the previous chapters you built a fully quantum laser: a single cavity mode whose photon-number
        density matrix <Tex>{String.raw`\rho_{nn}`}</Tex> is pumped by atoms and bled by cavity loss. But a
        density matrix is not something you can hold in your hand. A laboratory only ever delivers two things —{" "}
        <em>clicks on a photodetector</em> and a <em>trace on a spectrum analyzer</em>. This chapter closes the
        loop with full quantum honesty: a detector does <strong>not</strong> read out{" "}
        <Tex>{String.raw`\rho_{nn}`}</Tex>; each photon registers only with efficiency{" "}
        <Tex>{String.raw`\eta`}</Tex>, so what you see is a <strong>Bernoulli-thinned</strong> copy of the photon
        statistics. And a &ldquo;spectrum analyzer&rdquo; — a beam of two-level atoms flying through the cavity —
        measures a two-time correlation function whose linewidth is exactly the phase-diffusion constant{" "}
        <Tex>{String.raw`D`}</Tex> from Chapter XVII. Three completely different measurements return one number.
      </Lede>

      <Section title="18-1 · What a measurement can tell you">
        <Intuition>
          In quantum mechanics a measurement is not a passive readout. Treat the cavity mode as a mechanical
          oscillator (the picture from Sec. 14-1): the electric field <Tex>{String.raw`E`}</Tex> is the
          &ldquo;coordinate,&rdquo; and the conjugate field momentum is the operator{" "}
          <Tex>{String.raw`-i\hbar\,\partial/\partial E`}</Tex>. The field is prepared in some wave function{" "}
          <Tex>{String.raw`\psi(E,0)`}</Tex>. To <em>measure</em> an observable{" "}
          <Tex>{String.raw`\mathscr{O}`}</Tex> is to expand <Tex>{String.raw`\psi`}</Tex> over the eigenfunctions{" "}
          <Tex>{String.raw`\phi_n(E)`}</Tex> of <Tex>{String.raw`\mathscr{O}`}</Tex>; an ensemble of identically
          prepared systems then yields the eigenvalue <Tex>{String.raw`\mathscr{O}_n`}</Tex> with probability{" "}
          <Tex>{String.raw`W_n`}</Tex>. There is no innocent &ldquo;watching&rdquo; — a good measurement so
          violently disturbs the field that a pure state collapses into a hopeless mixture.
        </Intuition>
        <p>
          The cavity mode is modeled exactly like an oscillator, with the field as coordinate and a differential
          operator for the conjugate momentum:
        </p>
        <KeyResult
          eq={String.raw`(E,\,p)\;\to\;\left(E,\;-i\hbar\,\partial/\partial E\right)`}
          label="Field as an oscillator (Sec. 14-1)"
          note={
            <>
              The electric field <Tex>{String.raw`E`}</Tex> plays the role of position; the conjugate momentum is{" "}
              <Tex>{String.raw`-i\hbar\,\partial/\partial E`}</Tex>. This analogy underlies the whole measurement
              discussion.
            </>
          }
        />
        <p>
          The probability of registering the eigenvalue <Tex>{String.raw`\mathscr{O}_n`}</Tex> is the squared
          overlap of the prepared state with the eigenfunction — the Born rule in the electric-field
          representation:
        </p>
        <KeyResult
          eq={String.raw`W_n = \left| \int_{-\infty}^{\infty} dE\, \phi_n(E)^{*}\, \psi(E,t) \right|^{2}`}
          label="Born rule in the field representation"
          note="The operational definition of measuring the field: project ψ onto the eigenfunction φₙ of the observable and square."
        />
        <Derivation title="From state to measured outcome — and why ⟨E(t)⟩ decays without losing energy">
          <Step title="Field as an oscillator in a coordinate representation">
            Adopt <Tex>{String.raw`\psi(E,0)`}</Tex> as the field&rsquo;s wave function with{" "}
            <Tex>{String.raw`E`}</Tex> as coordinate. Any Hermitian observable{" "}
            <Tex>{String.raw`\mathscr{O}`}</Tex> has eigenfunctions <Tex>{String.raw`\phi_n(E)`}</Tex> with
            eigenvalues <Tex>{String.raw`\mathscr{O}_n`}</Tex>; expanding{" "}
            <Tex>{String.raw`\psi=\sum_n c_n\,\phi_n`}</Tex> sets up the measurement.
          </Step>
          <Step title="Born rule for the ensemble">
            Project and square the overlap to get <Tex>{String.raw`W_n=|c_n|^2`}</Tex>. The catch: a
            &ldquo;best permitted&rdquo; measurement so disturbs the system that the pure case becomes a
            hopeless mixture — repeated measurement of incompatible operators afterward is meaningless.
          </Step>
          <Step title="Why ⟨E(t)⟩ decays without energy loss">
            Recall <Tex>{String.raw`\langle E(t)\rangle`}</Tex> from Eq. (17.50) is a damped oscillation. The
            damping is <em>not</em> dissipation: it is phase diffusion across an ensemble of laser histories
            whose phases wander apart. An electron-beam probe of any <em>single</em> laser would see no
            damping — only slow phase drift. The average over phases decays even though every individual laser
            keeps oscillating undamped. This is why we measure photon <em>statistics</em> (Sec. 18-2) and the{" "}
            <em>spectrum</em> (Secs. 18-3, 18-4) rather than the field amplitude directly.
          </Step>
        </Derivation>
        <Callout kind="insight" title="The measurement collapses the pure case">
          A well-executed measurement so disturbs the system that &ldquo;the pure case will become a hopeless
          mixture, even if the system is not physically destroyed.&rdquo; There is no continuous,
          non-disturbing &ldquo;watching&rdquo; of the field oscillation, the way you might film a pendulum
          clock. The temporal oscillations of the field are not directly observable.
        </Callout>
        <Callout kind="warning" title="Damping of ⟨E(t)⟩ is NOT loss">
          The decay of the ensemble-averaged field comes from <strong>phase diffusion</strong> among the many
          possible laser histories. Any single laser oscillates undamped; only the average over phases decays.
          Hold onto this picture — it is the thread that ties the whole chapter together.
        </Callout>
      </Section>

      <Section title="18-2a · Photoelectron counting: the Bernoulli-thinning master formula">
        <Intuition>
          A photodetector does not see photons — it ejects <em>photoelectrons</em>, and not every photon makes
          one. Give each photon a detection probability <Tex>{String.raw`\eta`}</Tex> (the quantum efficiency,{" "}
          <Tex>{String.raw`0\le\eta\le1`}</Tex>). If the field has exactly <Tex>{String.raw`n`}</Tex> photons,
          the number <Tex>{String.raw`m`}</Tex> of ejected electrons is a coin-flip experiment:{" "}
          <Tex>{String.raw`m`}</Tex> successes out of <Tex>{String.raw`n`}</Tex> trials, each with probability{" "}
          <Tex>{String.raw`\eta`}</Tex> — a Bernoulli process. Average over the true photon distribution{" "}
          <Tex>{String.raw`\rho_{nn}`}</Tex> and you get the photocount distribution{" "}
          <Tex>{String.raw`P_m`}</Tex>. The detector reports a randomly <strong>thinned</strong> copy of the
          photon statistics; only a perfect detector reads out <Tex>{String.raw`\rho_{nn}`}</Tex> exactly.
        </Intuition>
        <p>
          This is the chapter&rsquo;s anointed result — the principal formula of the quantum treatment of
          measurement, valid for <em>all</em> <Tex>{String.raw`\eta\in[0,1]`}</Tex>, not just{" "}
          <Tex>{String.raw`\eta\ll1`}</Tex>:
        </p>
        <KeyResult
          number="18.1"
          eq={String.raw`P_m = \sum_{n=m}^{\infty} \binom{n}{m}\, \eta^{m}\,(1-\eta)^{n-m}\, \rho_{nn}`}
          label="Photoelectron counting distribution"
          note={
            <>
              <Tex>{String.raw`P_m`}</Tex> is the probability of registering <Tex>{String.raw`m`}</Tex> counts
              given the photon density-matrix diagonal <Tex>{String.raw`\rho_{nn}`}</Tex> and single-photon
              efficiency <Tex>{String.raw`\eta`}</Tex>. This is what a detector actually measures.
            </>
          }
        />
        <Figure
          caption={
            <>
              Bernoulli thinning: <Tex>{String.raw`n`}</Tex> photons arrive; each fires the detector with
              probability <Tex>{String.raw`\eta`}</Tex> (filled) or is missed with probability{" "}
              <Tex>{String.raw`1-\eta`}</Tex> (open). The detector counts only the filled ones, so it reports a
              thinned distribution.
            </>
          }
        >
          <svg viewBox="0 0 520 150" width="100%">
            <text x="10" y="24" fontSize="13" fill="#1f2733" fontWeight="600">
              n photons in the mode
            </text>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <circle key={`p${i}`} cx={40 + i * 32} cy={48} r={9} fill="#facc15" stroke="#b45309" strokeWidth={1.2} />
            ))}
            <text x="10" y="92" fontSize="13" fill="#1f2733" fontWeight="600">
              detector: each fires w/ prob η
            </text>
            {/* detected (filled) vs missed (open) */}
            {[true, false, true, true, false, true, false].map((hit, i) => (
              <g key={`d${i}`}>
                <line x1={40 + i * 32} y1={58} x2={40 + i * 32} y2={108} stroke="#cbd5e1" strokeWidth={1.2} />
                <circle
                  cx={40 + i * 32}
                  cy={120}
                  r={9}
                  fill={hit ? "#4f46e5" : "#ffffff"}
                  stroke={hit ? "#3730a3" : "#94a3b8"}
                  strokeWidth={1.4}
                />
              </g>
            ))}
            <text x="270" y="120" fontSize="12" fill="#4f46e5" fontWeight="600">
              m counts = filled circles
            </text>
            <text x="270" y="138" fontSize="11" fill="#94a3b8">
              open = photon missed (prob 1−η)
            </text>
          </svg>
        </Figure>
        <Derivation title="Build P_m from a single number state, then average">
          <Step title="Single-photon detection probability">
            Let <Tex>{String.raw`\eta`}</Tex> be the chance one photon ejects one photoelectron in the counting
            interval. For a number state <Tex>{String.raw`|n\rangle`}</Tex>, the chance of{" "}
            <Tex>{String.raw`m`}</Tex> detections starts as <Tex>{String.raw`\eta^m`}</Tex> — one factor of{" "}
            <Tex>{String.raw`\eta`}</Tex> per detected photon:
            <EqBlock label="18.2">{String.raw`P_m^{(n)} \propto \eta^{m}`}</EqBlock>
          </Step>
          <Step title="Account for the photons NOT detected">
            The <Tex>{String.raw`n-m`}</Tex> photons that were missed each contribute{" "}
            <Tex>{String.raw`(1-\eta)`}</Tex>:
            <EqBlock label="18.3">{String.raw`P_m^{(n)} \propto \eta^{m}\,(1-\eta)^{n-m}`}</EqBlock>
          </Step>
          <Step title="Combinatorial bookkeeping → Bernoulli">
            We do not know <em>which</em> <Tex>{String.raw`m`}</Tex> of the <Tex>{String.raw`n`}</Tex> photons
            fired the detector, so multiply by <Tex>{String.raw`\binom{n}{m}`}</Tex>. This gives the conditional
            binomial law for a fixed photon number:
            <EqBlock label="18.4">{String.raw`P_m^{(n)} = \binom{n}{m}\, \eta^{m}\,(1-\eta)^{n-m}`}</EqBlock>
          </Step>
          <Step title="Average over the photon statistics">
            The real field is a mixture with weights <Tex>{String.raw`\rho_{nn}`}</Tex>. Sum the conditional
            distribution over <Tex>{String.raw`n`}</Tex>:
            <EqBlock label="18.5">{String.raw`P_m = \sum_{n} P_m^{(n)}\, \rho_{nn}`}</EqBlock>
            Substituting Eq. (18.4) reproduces the master formula Eq. (18.1). Set{" "}
            <Tex>{String.raw`\eta=1`}</Tex> and the factor <Tex>{String.raw`(1-\eta)^{n-m}\to\delta_{nm}`}</Tex>{" "}
            collapses the sum:
            <KeyResult
              number="18.6"
              eq={String.raw`P_m = \rho_{mm} \qquad (\eta = 1)`}
              label="Perfect-efficiency limit"
            />
          </Step>
          <Step title="P-representation form and intensity rescaling">
            Write the diagonal photon distribution in the Glauber–Sudarshan{" "}
            <Tex>{String.raw`P(a)`}</Tex> representation — a Poisson kernel folded against the
            quasi-probability:
            <EqBlock label="18.7">{String.raw`\rho_{nn} = \int d^{2}a\, P(a)\left[\frac{(a^{*}a)^{n}}{n!}\right]\exp\{-a^{*}a\}`}</EqBlock>
            Insert this into Eq. (18.1) and carry out the binomial sum (Prob. 18-1) to obtain the photocount
            distribution in the same form, but with the mean intensity rescaled by{" "}
            <Tex>{String.raw`\eta`}</Tex>:
            <KeyResult
              number="18.8"
              eq={String.raw`P_m = \int d^{2}a\, P(a)\left[\frac{(a^{*}a\,\eta)^{m}}{m!}\right]\exp\{-a^{*}a\,\eta\}`}
              label="Photocount distribution in the P-representation"
              note={
                <>
                  Thinning acts as <Tex>{String.raw`a^{*}a\to\eta\,a^{*}a`}</Tex>: it simply scales the mean
                  intensity by <Tex>{String.raw`\eta`}</Tex>. This connects the fully-quantum result to the
                  semiclassical Mandel counting formula.
                </>
              }
            />
          </Step>
        </Derivation>
        <Callout kind="insight" title="Photoelectron statistics ≠ photon statistics">
          The detector reports a Bernoulli-thinned distribution. Only at <Tex>{String.raw`\eta=1`}</Tex> do they
          coincide (Eq. 18.6). For <Tex>{String.raw`\eta<1`}</Tex> thinning drives the Fano factor toward 1
          (<Tex>{String.raw`\mathrm{Fano}(m)=1+\eta[\mathrm{Fano}(n)-1]`}</Tex>): sub-Poissonian (nonclassical)
          light broadens, coherent light stays Poisson, and super-Poissonian light (thermal, laser near
          threshold) narrows — a real, not merely technical, distinction.
        </Callout>
        <Callout kind="note" title="Why the fully-quantum Pₘ is preferred">
          Eq. (18.1) is exact for all <Tex>{String.raw`\eta\in[0,1]`}</Tex>; the older semiclassical Mandel
          counting formula is recovered only in the small-<Tex>{String.raw`\eta`}</Tex> limit. The book builds
          counting from the quantized field, then shows the classical result as a special case.
        </Callout>
      </Section>

      <Section title="18-2b · The fully quantized laser photocount">
        <Intuition>
          Now feed the chapter&rsquo;s own laser into the counting machine. In Chapter XVII the steady-state
          photon distribution of the quantum laser, <Tex>{String.raw`\rho_{nn}`}</Tex> (Eq. 17.34), was fixed
          by three numbers — linear gain <Tex>{String.raw`\mathscr{A}`}</Tex>, saturation{" "}
          <Tex>{String.raw`\mathscr{B}`}</Tex>, and loss <Tex>{String.raw`\mathscr{C}=\nu/Q`}</Tex>. Plug it
          into the master formula and sum the series: <Tex>{String.raw`P_m`}</Tex> becomes a closed form
          involving a confluent hypergeometric function <Tex>{String.raw`{}_1F_1`}</Tex>. That is the concrete
          prediction for what a real detector watching a real single-mode laser would register.
        </Intuition>
        <p>
          Insert the explicit laser <Tex>{String.raw`\rho_{nn}`}</Tex> into Eq. (18.1):
        </p>
        <EqBlock label="18.9">{String.raw`P_m = \sum_{n} \binom{n}{m}\, \eta^{m}(1-\eta)^{n-m}\left[ Z^{-1}\, \frac{(\mathscr{A}^{2}/\mathscr{B}\mathscr{C})^{\,n+\mathscr{A}/\mathscr{B}}}{(n+\mathscr{A}/\mathscr{B})!} \right]`}</EqBlock>
        <p>
          The bracket is the laser&rsquo;s <Tex>{String.raw`\rho_{nn}`}</Tex>: a Poisson-shaped distribution in
          the shifted index <Tex>{String.raw`n+\mathscr{A}/\mathscr{B}`}</Tex> with mean{" "}
          <Tex>{String.raw`\mathscr{A}^2/\mathscr{B}\mathscr{C}`}</Tex>. Summing the binomial-weighted series
          gives the headline closed form:
        </p>
        <KeyResult
          number="18.10"
          eq={String.raw`P_m = Z^{-1}\,\eta^{m}\, \frac{(\mathscr{A}/\mathscr{B}\mathscr{C})^{\,m+\mathscr{A}/\mathscr{B}}}{(m+\mathscr{A}/\mathscr{B})!}\; {}_{1}F_{1}\!\left(m+1,\; m+\frac{\mathscr{A}}{\mathscr{B}}+1,\; (1-\eta)\frac{\mathscr{A}^{2}}{\mathscr{B}\mathscr{C}}\right)`}
          label="Photocount distribution of the quantized laser"
          note={
            <>
              <Tex>{String.raw`{}_1F_1`}</Tex> is the confluent hypergeometric function; the thinning enters
              through the <Tex>{String.raw`(1-\eta)`}</Tex> factor in its argument.
            </>
          }
        />
        <p>The normalization is itself a confluent hypergeometric function of the laser parameters:</p>
        <EqBlock>{String.raw`Z = \sum_{n} \frac{(\mathscr{A}^{2}/\mathscr{B}\mathscr{C})^{\,n+\mathscr{A}/\mathscr{B}}}{(n+\mathscr{A}/\mathscr{B})!} = \left[\frac{(\mathscr{A}^{2}/\mathscr{B}\mathscr{C})}{(\mathscr{A}/\mathscr{B})!}\right]{}_{1}F_{1}\!\left(1,\; 1+\frac{\mathscr{A}}{\mathscr{B}},\; \frac{\mathscr{A}^{2}}{\mathscr{B}\mathscr{C}}\right)`}</EqBlock>
        <Derivation title="Sum the series into a confluent hypergeometric function">
          <Step title="Insert the quantum-laser ρ_nn">
            Take <Tex>{String.raw`\rho_{nn}=Z^{-1}(\mathscr{A}^2/\mathscr{B}\mathscr{C})^{n+\mathscr{A}/\mathscr{B}}/(n+\mathscr{A}/\mathscr{B})!`}</Tex>{" "}
            from Eq. (17.34) and substitute into Eq. (18.1) to get Eq. (18.9), with{" "}
            <Tex>{String.raw`\mathscr{A}`}</Tex> = linear gain, <Tex>{String.raw`\mathscr{B}`}</Tex> =
            saturation, <Tex>{String.raw`\mathscr{C}=\nu/Q`}</Tex> = loss.
          </Step>
          <Step title="Sum the binomial-weighted series">
            Carry out the sum over <Tex>{String.raw`n`}</Tex> of{" "}
            <Tex>{String.raw`\binom{n}{m}\eta^m(1-\eta)^{n-m}`}</Tex> times the laser{" "}
            <Tex>{String.raw`\rho_{nn}`}</Tex>. The shifted-factorial structure{" "}
            <Tex>{String.raw`(n+\mathscr{A}/\mathscr{B})!`}</Tex> converts the sum into a confluent
            hypergeometric series, giving Eq. (18.10).
          </Step>
          <Step title="Fix the normalization">
            Require <Tex>{String.raw`\sum_m P_m=1`}</Tex>; the resulting <Tex>{String.raw`Z`}</Tex> is itself a{" "}
            <Tex>{String.raw`{}_1F_1`}</Tex>.
          </Step>
          <Step title="Read the physics in limits">
            Well above threshold (<Tex>{String.raw`\mathscr{A}\gg\mathscr{C}`}</Tex>),{" "}
            <Tex>{String.raw`\rho_{nn}`}</Tex> is coherent/Poisson and <Tex>{String.raw`P_m`}</Tex> is narrow;
            near threshold it broadens (super-Poissonian). At every operating point{" "}
            <Tex>{String.raw`\eta<1`}</Tex> thinning drives the Fano factor of{" "}
            <Tex>{String.raw`P_m`}</Tex> toward 1 relative to <Tex>{String.raw`\rho_{mm}`}</Tex>{" "}
            (<Tex>{String.raw`\mathrm{Fano}(m)=1+\eta[\mathrm{Fano}(n)-1]`}</Tex>): the super-Poissonian
            near-threshold laser <em>narrows</em> in Fano factor, while a well-above-threshold Poisson field
            stays Poisson.
          </Step>
        </Derivation>
        <Callout kind="insight" title="One formula, the whole laser">
          Eq. (18.10) packages gain, saturation, loss, and detector efficiency into a single{" "}
          <Tex>{String.raw`{}_1F_1`}</Tex>. It is the explicit, testable count distribution for the model laser
          built in Chapter XVII.
        </Callout>
        <Callout kind="note" title="Symbol dictionary">
          <ul>
            <li>
              <Tex>{String.raw`\mathscr{A}`}</Tex> — linear gain
            </li>
            <li>
              <Tex>{String.raw`\mathscr{B}`}</Tex> — saturation parameter
            </li>
            <li>
              <Tex>{String.raw`\mathscr{C}=\nu/Q`}</Tex> — cavity loss
            </li>
            <li>
              <Tex>{String.raw`\eta`}</Tex> — detector quantum efficiency
            </li>
            <li>
              <Tex>{String.raw`Z^{-1}`}</Tex> — normalization (a confluent hypergeometric function of{" "}
              <Tex>{String.raw`\mathscr{A},\mathscr{B},\mathscr{C}`}</Tex>)
            </li>
          </ul>
        </Callout>

        <SimFrame
          title="Photon statistics vs. photoelectron counts: the η-thinning machine"
          caption={
            <>
              Pick an input field <Tex>{String.raw`\rho_{nn}`}</Tex> (coherent, thermal, number state, or the
              fully-quantized laser of Eq. 18.10), then drag the detector efficiency{" "}
              <Tex>{String.raw`\eta`}</Tex>. The solid bars are the measured photocounts{" "}
              <Tex>{String.raw`P_m`}</Tex> from Eq. (18.1); the faint bars are the true photon statistics{" "}
              <Tex>{String.raw`\rho_{nn}`}</Tex>.
            </>
          }
          tryThis={
            <>
              Set <Tex>{String.raw`\eta=1`}</Tex>: the solid and faint bars coincide and the residual{" "}
              <Tex>{String.raw`\max_m|P_m-\rho_{mm}|`}</Tex> drops to <Tex>{String.raw`\approx0`}</Tex> — that
              is Eq. (18.6). Now drag <Tex>{String.raw`\eta`}</Tex> down: the peak slides from{" "}
              <Tex>{String.raw`\langle n\rangle`}</Tex> to <Tex>{String.raw`\eta\langle n\rangle`}</Tex>. Switch
              to the <strong>number state</strong> and watch the Mandel inset: <Tex>{String.raw`Q_m`}</Tex>{" "}
              starts at <Tex>{String.raw`-1`}</Tex> and is dragged to <Tex>{String.raw`0`}</Tex> as{" "}
              <Tex>{String.raw`\eta\to0`}</Tex> — thinning erases the nonclassical sub-Poissonian structure.
              For the <strong>laser</strong>, sweep <Tex>{String.raw`\mathscr{A}/\mathscr{C}`}</Tex> across{" "}
              <Tex>{String.raw`1`}</Tex> to see the threshold crossover from broad to near-Poisson.
            </>
          }
        >
          <Ch18Sim />
        </SimFrame>
      </Section>

      <Section title="18-3 · The spectrum analyzer: an atomic beam reads the linewidth">
        <Intuition>
          How do you measure the laser&rsquo;s frequency spectrum quantum-mechanically? Model the spectrum
          analyzer <em>literally</em>: a beam of two-level atoms, each prepared in its ground state{" "}
          <Tex>{String.raw`|1\rangle`}</Tex>, flies through the cavity, couples weakly to the field, and emerges
          in a superposition of <Tex>{String.raw`|1\rangle`}</Tex> and <Tex>{String.raw`|2\rangle`}</Tex>. Tune
          the atomic splitting <Tex>{String.raw`\omega`}</Tex> across the laser frequency{" "}
          <Tex>{String.raw`\nu`}</Tex> and record the fraction of atoms found in the upper state — that traces
          out the spectrum. Because the probe couples weakly to the &ldquo;massive&rdquo; laser field, its
          passage barely perturbs the laser, so solve for the upper-state probability{" "}
          <Tex>{String.raw`\rho_{22}(\omega)`}</Tex> to second order in the coupling. The astonishing result: a{" "}
          <strong>Lorentzian</strong> centered at <Tex>{String.raw`\nu`}</Tex> with full width{" "}
          <Tex>{String.raw`D`}</Tex> — exactly the phase-diffusion linewidth of Eq. (17.51).
        </Intuition>
        <p>
          Inject every probe atom in its ground state, tensored with the laser field, with a flight time{" "}
          <Tex>{String.raw`\tau\gg1/D`}</Tex>:
        </p>
        <EqBlock label="18.11/12">{String.raw`\rho_{2\text{-}1}(t_0) = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix} \otimes \rho(t_0)`}</EqBlock>
        <p>
          After flight time <Tex>{String.raw`\tau`}</Tex> the general atom–field element is{" "}
          <Tex>{String.raw`\rho_{r,n;s,m}(t_0+\tau)`}</Tex> with <Tex>{String.raw`r,s=1,2`}</Tex> labeling the
          atomic levels and <Tex>{String.raw`n,m`}</Tex> the photon numbers:
        </p>
        <EqBlock label="18.13">{String.raw`\rho_{r,n;s,m}(t_0+\tau), \qquad r,s = 1,2`}</EqBlock>
        <p>The measured spectrometer signal is the upper-state population, summed over photon number:</p>
        <EqBlock label="18.14">{String.raw`\rho_{22}(\omega,\,t_0+\tau) = \sum_n \rho_{2,n;2,n}(t_0+\tau)`}</EqBlock>
        <p>
          The combined system evolves under the laser&rsquo;s own pump-plus-loss dynamics plus the Liouville
          commutator with the probe atom — the probe barely disturbs the laser:
        </p>
        <EqBlock label="18.15">{String.raw`\frac{d\rho}{dt} = \left(\frac{d\rho}{dt}\right)_{\text{laser}} + \left(\frac{d\rho}{dt}\right)_{\text{spectrometer}} = \left(\frac{d\rho}{dt}\right)_{\text{laser}} - \frac{i}{\hbar}\,[\mathscr{H}_0^{\text{atom}} + \mathscr{V},\,\rho]`}</EqBlock>
        <p>with the unperturbed probe Hamiltonian and the atom–field interaction (Schrödinger form of Eq. 14.66):</p>
        <EqBlock label="18.16">{String.raw`\mathscr{H}_0^{\text{atom}} = \hbar \begin{pmatrix} \omega_2 & 0 \\ 0 & \omega_1 \end{pmatrix}, \qquad \omega = \omega_2-\omega_1`}</EqBlock>
        <EqBlock label="18.17">{String.raw`\mathscr{V} = g\,\sigma_{21}\,a + \text{adjoint}`}</EqBlock>
        <p>
          The probe <em>absorbs</em> a photon as it is excited (<Tex>{String.raw`\sigma_{21}`}</Tex> raises the
          atom, <Tex>{String.raw`a`}</Tex> annihilates a photon).
        </p>
        <Derivation title="Second-order perturbation in 𝒱 → the Lorentzian">
          <Step title="Set up the probe and its weak coupling">
            Inject ground-state atoms (Eq. 18.11/12) with flight time{" "}
            <Tex>{String.raw`\tau\gg1/D`}</Tex>. Write the combined master equation (Eq. 18.15) as laser
            evolution plus the commutator with <Tex>{String.raw`\mathscr{H}_0^{\text{atom}}`}</Tex> (Eq. 18.16)
            and the interaction <Tex>{String.raw`\mathscr{V}=g\sigma_{21}a+\text{adjoint}`}</Tex> (Eq. 18.17).
          </Step>
          <Step title="Identify the coupled elements; population fed by coherence">
            Only the elements <Tex>{String.raw`\rho_{1,n+1;1,n+1}\to\rho_{2,n;2,n}`}</Tex> through the
            coherences <Tex>{String.raw`\rho_{2,n;1,n+1}`}</Tex> and{" "}
            <Tex>{String.raw`\rho_{1,n+1;2,n}`}</Tex> couple under absorption of one photon. The upper
            population obeys (the laser part of its diagonal vanishes in steady state):
            <EqBlock label="18.18">{String.raw`\dot{\rho}_{2,n;2,n} = -\frac{i}{\hbar}\,\mathscr{V}_{2,n;1,n+1}\,\rho_{1,n+1;2,n}(t) + \text{c.c.}`}</EqBlock>
          </Step>
          <Step title="Equation of motion for the coherence">
            The off-diagonal coherence carries the laser&rsquo;s phase-decay term{" "}
            <Tex>{String.raw`\tfrac12 D`}</Tex> (from Eq. 17.48) and the detuning{" "}
            <Tex>{String.raw`(\nu-\omega)`}</Tex>:
            <EqBlock label="18.19">{String.raw`\dot{\rho}_{1,n+1;2,n} = -\left(i\nu - i\omega - \tfrac{1}{2}D\right)\rho_{1,n+1;2,n} - i\mathscr{V}_{1,n+1;2,n}\,\rho_{2,n;2,n} - i\rho_{1,n+1;1,n+1}\,\mathscr{V}_{1,n+1;2,n}`}</EqBlock>
          </Step>
          <Step title="Integrate once, then again (second order in 𝒱)">
            Time-integrating Eq. (18.18) with the first-order coherence gives the upper-state population:
            <EqBlock label="18.21">{String.raw`\rho_{2,n;2,n}(\omega) = i\int_{t_0}^{t_0+\tau} dt'\, \mathscr{V}_{2,n;1,n+1}(t')\,\rho^{(1)}_{1,n+1;2,n}(t') + \text{c.c.}`}</EqBlock>
            where the first-order coherence comes from integrating Eq. (18.19):
            <EqBlock label="18.22">{String.raw`\rho^{(1)}_{1,n+1;2,n}(t') = -i\int_{t_0}^{t'} dt''\, \exp\!\left[-(i\nu - i\omega + \tfrac{1}{2}D)(t'-t'')\right]\,\mathscr{V}_{1,n+1;2,n}\,\rho_{nn}(t_0)`}</EqBlock>
          </Step>
          <Step title="The double-time integral">
            Insert Eq. (18.22) into Eq. (18.21) to reach the double integral whose kernel{" "}
            <Tex>{String.raw`\exp[-(i\nu-i\omega+\tfrac12 D)(t'-t'')]`}</Tex> is the heart of the calculation:
            <EqBlock label="18.23">{String.raw`\rho_{2,n;2,n}(\omega) \simeq \int_{t_0}^{t_0+\tau} dt'\int_{t_0}^{t'} dt''\, |\mathscr{V}_{2,n;1,n+1}|^{2}\, \exp\!\left[-(i\nu - i\omega + \tfrac{1}{2}D)(t'-t'')\right]\rho_{nn}(t_0) + \text{c.c.}`}</EqBlock>
          </Step>
          <Step title="Sum over n, do the integrals → Lorentzian">
            Sum over photon number to pull out <Tex>{String.raw`g^2\langle n\rangle`}</Tex> (using{" "}
            <Tex>{String.raw`\sum_n n\,\rho_{nn}=\langle n\rangle`}</Tex>), perform the long-time double
            integral, and obtain the spectrum-analyzer Lorentzian:
            <EqBlock label="18.24">{String.raw`\rho_{22}(\omega) = -\Big[g^{2}\sum_{n} n\,\rho_{nn}(t_0)\Big]\int_{t_0}^{t_0+\tau}\!dt'\!\int_{t_0}^{t'}\!dt''\,\exp\!\left[-(i\nu-i\omega+\tfrac{1}{2}D)(t'-t'')\right] + \text{c.c.}`}</EqBlock>
          </Step>
        </Derivation>
        <KeyResult
          number="18.24"
          eq={String.raw`\rho_{22}(\omega) \simeq \frac{g^{2}D\tau\langle n\rangle}{(\omega-\nu)^{2}+(D/2)^{2}}`}
          label="Spectrum-analyzer Lorentzian"
          note={
            <>
              A Lorentzian in <Tex>{String.raw`(\omega-\nu)`}</Tex> of full width <Tex>{String.raw`D`}</Tex>. The
              probe&rsquo;s upper-state population traces the laser spectrum; its width is the phase-diffusion
              linewidth. The profile equals <Tex>{String.raw`|E(\omega)/E(\nu)|^2`}</Tex> (Fig. 17-6), in exact
              agreement with Eq. (17.51).
            </>
          }
        />
        <Figure
          caption={
            <>
              The atomic-beam absorption profile <Tex>{String.raw`\rho_{22}(\omega)`}</Tex>: a Lorentzian
              centered at the laser frequency <Tex>{String.raw`\nu`}</Tex> with full width at half maximum
              equal to the phase-diffusion constant <Tex>{String.raw`D`}</Tex>.
            </>
          }
        >
          <svg viewBox="0 0 480 200" width="100%">
            <line x1="40" y1="170" x2="460" y2="170" stroke="#9aa3b2" strokeWidth="1" />
            <line x1="40" y1="20" x2="40" y2="170" stroke="#9aa3b2" strokeWidth="1" />
            {/* Lorentzian path: center at x=250, FWHM markers */}
            <path
              d="M40,168 C120,166 190,150 230,60 Q250,30 270,60 C310,150 380,166 460,168"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
            />
            {/* center line */}
            <line x1="250" y1="45" x2="250" y2="170" stroke="#cbd5e1" strokeDasharray="4 4" />
            <text x="250" y="188" fontSize="12" fill="#1f2733" textAnchor="middle">
              ω = ν
            </text>
            {/* FWHM arrow */}
            <line x1="205" y1="100" x2="295" y2="100" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="205" y1="95" x2="205" y2="105" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="295" y1="95" x2="295" y2="105" stroke="#e11d48" strokeWidth="1.5" />
            <text x="250" y="92" fontSize="12" fill="#e11d48" textAnchor="middle" fontWeight="600">
              FWHM = D
            </text>
            <text x="20" y="30" fontSize="12" fill="#1f2733">
              ρ₂₂
            </text>
            <text x="430" y="188" fontSize="12" fill="#1f2733">
              ω
            </text>
          </svg>
        </Figure>
        <Callout kind="insight" title="Linewidth = phase-diffusion constant D">
          The atomic-beam absorption profile is a Lorentzian of full width <Tex>{String.raw`D`}</Tex> centered
          at the laser frequency <Tex>{String.raw`\nu`}</Tex>. The instrument literally reads out the quantum
          phase-diffusion rate derived in Chapter XVII.
        </Callout>
        <Callout kind="math" title="ℏ bookkeeping in Eqs. (18.18)–(18.22)">
          Transcribed faithfully from the source: Eqs. (18.18), (18.22) carry an explicit{" "}
          <Tex>{String.raw`-i/\hbar`}</Tex> or <Tex>{String.raw`-i`}</Tex>, while Eq. (18.19) drops the{" "}
          <Tex>{String.raw`\hbar`}</Tex>. The book works in a convention where{" "}
          <Tex>{String.raw`\mathscr{V}`}</Tex> absorbs <Tex>{String.raw`\hbar`}</Tex> (effectively{" "}
          <Tex>{String.raw`\hbar=1`}</Tex>); do not silently normalize Eq. (18.19) to match — read each as
          printed.
        </Callout>
        <Callout kind="warning" title="Probable source sign typo in Eq. (18.19)">
          The physics fixes the sign: the off-diagonal coherence <em>must</em> decay (phase diffusion), so the
          correct integrated first-order form is Eq. (18.22) with the decaying kernel{" "}
          <Tex>{String.raw`\exp[-(i\nu-i\omega+\tfrac12 D)(t'-t'')]`}</Tex> — real exponent{" "}
          <Tex>{String.raw`-\tfrac12 D(t'-t'')`}</Tex>, which dies away as required. Eq. (18.19) as printed carries
          the homogeneous coefficient <Tex>{String.raw`-(i\nu-i\omega-\tfrac12 D)`}</Tex>, whose real part is{" "}
          <Tex>{String.raw`+\tfrac12 D`}</Tex>; taken literally that gives <Tex>{String.raw`e^{+Dt/2}`}</Tex>{" "}
          <em>growth</em>, almost certainly a sign typo in the source (the consistent, decaying form is{" "}
          <Tex>{String.raw`-(i\nu-i\omega+\tfrac12 D)`}</Tex>, as in Eq. 18.22). As with the{" "}
          <Tex>{String.raw`\hbar`}</Tex> bookkeeping above:
          read each equation as printed, but note that the physical coherence decays.
        </Callout>
        <Callout kind="warning" title="Probable source sign typo in Eq. (18.24)">
          A separate defect from the kernel-sign issue above: the integral form of Eq. (18.24) as printed carries
          a leading minus in front of the bracket,{" "}
          <Tex>{String.raw`\rho_{22}(\omega)=-\big[g^2\sum_n n\,\rho_{nn}\big]\int\!\int\exp[\cdots]+\text{c.c.}`}</Tex>
          That leading minus is almost certainly a source typo. Eq. (18.23) one line above has{" "}
          <em>no</em> leading minus, and the integration chain forbids one: Eq. (18.21) supplies a{" "}
          <Tex>{String.raw`+i`}</Tex> and Eq. (18.22) a <Tex>{String.raw`-i`}</Tex>, so{" "}
          <Tex>{String.raw`i\cdot(-i)=+1`}</Tex> and no global minus can legitimately appear. With the decaying
          kernel and an all-nonnegative prefactor (<Tex>{String.raw`g^2`}</Tex>, <Tex>{String.raw`n`}</Tex>,{" "}
          <Tex>{String.raw`\rho_{nn}\ge 0`}</Tex>), the double-time integral{" "}
          <Tex>{String.raw`+\text{c.c.}`}</Tex> evaluates to{" "}
          <Tex>{String.raw`+\tau D/[(\omega-\nu)^2+(D/2)^2]>0`}</Tex>. Taken literally, the printed minus would make{" "}
          <Tex>{String.raw`\rho_{22}`}</Tex> <em>negative</em> — impossible for a population, and in direct
          contradiction with the positive Lorentzian it is set equal to in the KeyResult. The physically consistent
          form carries <em>no</em> leading minus, so <Tex>{String.raw`\rho_{22}`}</Tex> is a positive population
          that matches the positive Lorentzian. Read the equation as printed for source fidelity, but note that
          the population is positive.
        </Callout>
      </Section>

      <Section title="18-4 · The Onsager regression hypothesis: one linewidth, three routes">
        <Intuition>
          The capstone unifies everything. Define the laser spectrum formally as the Fourier transform of the
          two-time field correlation function <Tex>{String.raw`G(t)`}</Tex> — a symmetrized average of{" "}
          <Tex>{String.raw`a^\dagger(t)a(0)`}</Tex> and <Tex>{String.raw`a(t)a^\dagger(0)`}</Tex> over the
          total density matrix of field <em>plus</em> reservoir. Because the field is entangled with (contracted
          from) the reservoir, you can no longer use a pure state; you keep the reservoir and trace it out at
          the end. Through a sequence of operator manipulations the correlation function reduces to a single
          oscillation <Tex>{String.raw`\cos(\nu t)`}</Tex> times a decaying envelope{" "}
          <Tex>{String.raw`e^{-\tfrac12 Dt}`}</Tex>. Its Fourier transform is the same Lorentzian of width{" "}
          <Tex>{String.raw`D`}</Tex>. The deep statement: the decay of a spontaneous fluctuation obeys the{" "}
          <em>same law</em> as the decay of a macroscopic disturbance — Onsager&rsquo;s regression hypothesis,
          here proven for a nonequilibrium Markoffian laser.
        </Intuition>
        <p>The formal spectral profile is the symmetrized two-time correlation, traced over the total system:</p>
        <EqBlock label="18.25">{String.raw`G(t) = \tfrac{1}{2}\,\mathrm{Tr}\Big\{ [a^{\dagger}(t)a(0) + a(t)a^{\dagger}(0)]\,\rho(0)_{\text{total}} + [a^{\dagger}(0)a(t) + a(0)a^{\dagger}(t)]\,\rho(0)_{\text{total}} \Big\}`}</EqBlock>
        <p>with Heisenberg evolution of the annihilation operator by the combined time-development operator:</p>
        <EqBlock label="18.26">{String.raw`a(t) = U^{\dagger}(t)\,a(0)\,U(t)`}</EqBlock>
        <p>
          Work out one representative term (the others follow identically) and split the total trace into a
          field trace <Tex>{String.raw`\mathrm{Tr}_\rho`}</Tex> and a reservoir trace{" "}
          <Tex>{String.raw`\mathrm{Tr}_R`}</Tex>:
        </p>
        <EqBlock label="18.27">{String.raw`g(t) = \mathrm{Tr}\big[a^{\dagger}(t)a(0)\rho(0)_{\text{total}}\big]`}</EqBlock>
        <EqBlock label="18.28">{String.raw`g(t) = \mathrm{Tr}_{\rho}\mathrm{Tr}_{R}\big\{[U^{\dagger}(t)a^{\dagger}(0)U(t)a(0)]\,R(0)\rho(0)\big\} = \mathrm{Tr}_{\rho}\big\{ \mathrm{Tr}_{R}[U^{\dagger}(t)a(0)U(t)R(0)]\,a^{\dagger}(0)\rho(0)\big\}`}</EqBlock>
        <p>
          Absorb the reservoir trace into a reduced operator <Tex>{String.raw`\mathscr{A}(t)`}</Tex>, so the
          correlation becomes a clean field-only trace:
        </p>
        <EqBlock label="18.29">{String.raw`\mathscr{A}(t) = \mathrm{Tr}_{R}\big[U^{\dagger}(t)\,a(0)\,U(t)\,R(0)\big]`}</EqBlock>
        <KeyResult
          number="18.30"
          eq={String.raw`g(t) = \mathrm{Tr}_{\rho}\big[\mathscr{A}^{\dagger}(t)\,\mathscr{A}(0)\,\rho(0)\big]`}
          label="Correlation in reduced form"
        />
        <p>
          The time dependence of <Tex>{String.raw`\mathscr{A}(t)`}</Tex> follows from the reduced field density
          matrix and its equation of motion (Prob. 18-2, the generalization of Eq. 17.48):
        </p>
        <EqBlock label="18.31">{String.raw`\rho_{n,n'}(t) = \big\{ \mathrm{Tr}_{R}[U(t)R(0)\rho(0)U^{\dagger}(t)] \big\}_{n,n'}`}</EqBlock>
        <KeyResult
          number="18.32"
          eq={String.raw`\dot{\rho}_{nn'}(t) = -\big[i\nu(n-n') + \tfrac{1}{2}D(n-n')^{2}\big]\rho_{nn'}(t)`}
          label="Off-diagonal decay — the phase-diffusion fingerprint"
          note={
            <>
              Off-diagonal elements oscillate at <Tex>{String.raw`\nu(n-n')`}</Tex> and decay at{" "}
              <Tex>{String.raw`\tfrac12 D(n-n')^2`}</Tex>. The <Tex>{String.raw`(n-n')^2`}</Tex> scaling is the
              signature of phase diffusion.
            </>
          }
        />
        <p>Integrating Eq. (18.32):</p>
        <EqBlock label="18.33">{String.raw`\rho_{nn'}(t) = \rho_{nn'}(0)\,\exp\!\big\{ -[i\nu(n-n') + \tfrac{1}{2}D(n-n')^{2}]\,t \big\}`}</EqBlock>
        <Derivation title="Trace out the reservoir → G(t)">
          <Step title="Why a total density matrix is forced">
            After contraction the radiation field is entangled with the reservoir and cannot be a pure state.
            Extend the correlation function (Eq. 18.25) to include reservoir states, to be traced over at the
            end.
          </Step>
          <Step title="Heisenberg operators and the split trace">
            Write <Tex>{String.raw`a(t)=U^\dagger(t)a(0)U(t)`}</Tex> (Eq. 18.26). Pick the representative term{" "}
            <Tex>{String.raw`g(t)`}</Tex> (Eq. 18.27) and factor the trace into field and reservoir parts with{" "}
            <Tex>{String.raw`R(0)`}</Tex> uncoupled from <Tex>{String.raw`\rho(0)`}</Tex> at{" "}
            <Tex>{String.raw`t=0`}</Tex> (Eq. 18.28).
          </Step>
          <Step title="Define the reduced operator 𝒜(t)">
            Absorb the reservoir trace into <Tex>{String.raw`\mathscr{A}(t)`}</Tex> (Eq. 18.29), so{" "}
            <Tex>{String.raw`g(t)=\mathrm{Tr}_\rho[\mathscr{A}^\dagger(t)\mathscr{A}(0)\rho(0)]`}</Tex> (Eq.
            18.30).
          </Step>
          <Step title="U is diagonal in n; extract the evolution factor">
            Use Eq. (18.31). The Prob. 18-2 equation of motion (Eq. 18.32) and its integral (Eq. 18.33) show{" "}
            <Tex>{String.raw`U`}</Tex> is diagonal in photon number, so the reduced density matrix factorizes:
            <EqBlock label="18.34">{String.raw`\rho_{n,n'}(t) = \rho_{n,n'}(0)\,\mathrm{Tr}_{R}\big[U(t)_{n,n}R(0)U^{\dagger}(t)_{n',n'}\big]`}</EqBlock>
            and the diagonal reservoir-traced evolution factor, read off by comparing Eqs. (18.34) and (18.33),
            is
            <EqBlock label="18.35">{String.raw`\mathrm{Tr}_{R}\big[U(t)_{n,n}R(0)U^{\dagger}(t)_{n',n'}\big] = \exp\!\big[-\tfrac{1}{2}D(n-n')^{2}t - i\nu(n-n')t\big]`}</EqBlock>
          </Step>
          <Step title="The relevant matrix element of 𝒜(t)">
            For the nearest off-diagonal element <Tex>{String.raw`n'=n+1`}</Tex> the{" "}
            <Tex>{String.raw`(n-n')^2=1`}</Tex> factor gives the single-quantum decay rate{" "}
            <Tex>{String.raw`\tfrac12 D`}</Tex> and oscillation <Tex>{String.raw`\nu`}</Tex>:
            <EqBlock label="18.36">{String.raw`[\mathscr{A}(t)]_{n,n+1} = a(0)_{n,n+1}\,\mathrm{Tr}_{R}\big[U(t)_{n,n}R(0)U^{\dagger}(t)_{n+1,n+1}\big] = a(0)_{n,n+1}\,\exp\!\big[-(\tfrac{1}{2}D - i\nu)t\big]`}</EqBlock>
          </Step>
          <Step title="Assemble G(t) and state the conclusion">
            Substitute Eq. (18.36) into Eq. (18.28)/(18.30) to obtain the correlation function (Eq. 18.37). Its
            Fourier transform (plus the other terms of Eq. 18.25) reproduces the Lorentzian of width{" "}
            <Tex>{String.raw`D`}</Tex>. The decay of the two-time correlation (a fluctuation) is identical to
            the decay of the single-time-averaged field <Tex>{String.raw`\langle E(t)\rangle`}</Tex> (Eq.
            17.50, a macroscopic disturbance) — Onsager&rsquo;s hypothesis (1931). Lax (1967) showed it holds
            out of equilibrium provided the system is Markoffian; Louisell &amp; Marburger (1967) extended the
            proof.
          </Step>
        </Derivation>
        <KeyResult
          number="18.37"
          eq={String.raw`G(t) = \mathrm{Tr}_{\rho}\big[a^{\dagger}(0)a(0)\rho(0)\big]\,\cos(\nu t)\,\exp\!\big(-\tfrac{1}{2}Dt\big)`}
          label="Two-time field correlation function"
          note={
            <>
              A stationary photon-number factor <Tex>{String.raw`\langle a^\dagger a\rangle=\langle n\rangle`}</Tex>{" "}
              times an oscillation <Tex>{String.raw`\cos(\nu t)`}</Tex> times the phase-diffusion decay{" "}
              <Tex>{String.raw`e^{-\tfrac12 Dt}`}</Tex>. Its Fourier transform is the Lorentzian of width{" "}
              <Tex>{String.raw`D`}</Tex> — identical to Eq. (18.24) and Eq. (17.51).
            </>
          }
        />
        <Callout kind="insight" title="Three measurements, one D">
          The damped <Tex>{String.raw`\langle E(t)\rangle`}</Tex> (Ch. XVII, Eqs. 17.50/51), the atomic-beam
          absorption Lorentzian (Eq. 18.24), and the field correlation function{" "}
          <Tex>{String.raw`G(t)`}</Tex> (Eq. 18.37) all give a linewidth equal to the phase-diffusion constant{" "}
          <Tex>{String.raw`D`}</Tex>. The chapter&rsquo;s quiet triumph.
        </Callout>
        <Callout kind="insight" title="Onsager regression made microscopic">
          Decay of a spontaneous fluctuation obeys the same law as relaxation of a macroscopic disturbance —
          here proven for a nonequilibrium, Markoffian laser. It is valid because the laser dynamics are
          Markoffian (Lax 1967).
        </Callout>
        <Callout kind="note" title="The (n−n′)² phase-diffusion scaling">
          Off-diagonal coherences <Tex>{String.raw`\rho_{nn'}`}</Tex> decay at{" "}
          <Tex>{String.raw`\tfrac12 D(n-n')^2`}</Tex> — quadratic in the photon-number difference. The nearest
          off-diagonal (<Tex>{String.raw`n'=n+1`}</Tex>) decays at <Tex>{String.raw`\tfrac12 D`}</Tex>, which
          sets the field-amplitude correlation decay and hence the linewidth <Tex>{String.raw`D`}</Tex>.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from this chapter">
          <ul>
            <li>
              <strong>Measurement is Bernoulli thinning.</strong>{" "}
              <Tex>{String.raw`P_m=\sum_n\binom{n}{m}\eta^m(1-\eta)^{n-m}\rho_{nn}`}</Tex> (Eq. 18.1) is what
              detectors measure; photon statistics <Tex>{String.raw`\rho_{nn}`}</Tex> are recovered only as{" "}
              <Tex>{String.raw`\eta\to1`}</Tex> (<Tex>{String.raw`P_m=\rho_{mm}`}</Tex>). Carry this into all
              later photon counting, <Tex>{String.raw`g^{(2)}`}</Tex>, and squeezing-detection discussions.
            </li>
            <li>
              <strong>The laser linewidth is the phase-diffusion constant{" "}
              <Tex>{String.raw`D`}</Tex>.</strong> It is the FWHM of the Lorentzian in three independent
              observables: the damped <Tex>{String.raw`\langle E(t)\rangle`}</Tex> (Eqs. 17.50/51), the
              atomic-beam profile <Tex>{String.raw`\rho_{22}(\omega)`}</Tex> (Eq. 18.24), and the correlation{" "}
              <Tex>{String.raw`G(t)`}</Tex> (Eq. 18.37). This <Tex>{String.raw`D`}</Tex> is fundamental quantum
              noise, not classical dissipation.
            </li>
            <li>
              <strong>Off-diagonal coherences decay as{" "}
              <Tex>{String.raw`\rho_{nn'}(t)\propto e^{-\tfrac12 D(n-n')^2 t}`}</Tex></strong> (Eqs. 18.32/33).
              The quadratic <Tex>{String.raw`(n-n')^2`}</Tex> scaling is the universal fingerprint of phase
              diffusion; the nearest off-diagonal sets the coherence time and linewidth.
            </li>
            <li>
              <strong>Spectra from weak probes.</strong> A spectrum analyzer is a weakly coupled two-level
              atomic beam read out by second-order perturbation theory in{" "}
              <Tex>{String.raw`\mathscr{V}=g\sigma_{21}a+\text{adjoint}`}</Tex>. This response-function method
              recurs whenever one computes spectra and susceptibilities.
            </li>
            <li>
              <strong>Onsager regression.</strong> Fluctuations decay by the same law as macroscopic
              disturbances, because the laser dynamics are Markoffian (Lax 1967) — the conceptual bridge
              between quantum fluctuation correlation functions and measured macroscopic linewidths.
            </li>
            <li>
              <strong>The <Tex>{String.raw`P(a)`}</Tex> representation</strong> (Eqs. 18.7/8) connects the
              fully-quantum treatment to the semiclassical Mandel counting formula; the quantum{" "}
              <Tex>{String.raw`P_m`}</Tex> is exact for all <Tex>{String.raw`\eta`}</Tex> and reduces to the
              classical result in the small-<Tex>{String.raw`\eta`}</Tex> limit.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
