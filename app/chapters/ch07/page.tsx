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
import Ch07Sim from "@/components/sims/ch07";

export default function Page() {
  return (
    <Lesson slug="ch07">
      <Lede>
        A laser medium is not one atom in one clean quantum state — it is an enormous ensemble of atoms, each kicked by
        the light field, knocked by collisions, and decaying by spontaneous emission. You can never write down a single
        wavefunction <Tex>{String.raw`\psi`}</Tex> for that mess. The object that survives is the{" "}
        <strong>density matrix</strong> <Tex>{String.raw`\rho`}</Tex>: a single <Tex>{String.raw`2\times2`}</Tex> array
        (for a two-level atom) that holds both genuine quantum <em>coherence</em> and classical statistical{" "}
        <em>ignorance</em> at once. Its meaning is breathtakingly direct — the diagonal elements are the level{" "}
        <strong>populations</strong> (the gain), the off-diagonal element is the complex atomic <strong>dipole</strong>{" "}
        (the field source), and every observable is one trace away: <Tex>{String.raw`\langle\mathscr{O}\rangle=\Tr(\rho\,\mathscr{O})`}</Tex>.
      </Lede>

      <Section title="7-1 The pure-case density matrix: ρ from amplitudes">
        <Intuition>
          Start where Chapter&nbsp;II left off: a single atom in a known superposition{" "}
          <Tex>{String.raw`\psi = c_a u_a + c_b u_b`}</Tex>. Chapter&nbsp;II tracked the amplitudes{" "}
          <Tex>{String.raw`c_a,c_b`}</Tex>. The density matrix repackages the <em>same</em> information into bilinear
          products <Tex>{String.raw`\rho_{ij}=c_i c_j^{*}`}</Tex> — and that repackaging exposes physical meaning the
          bare amplitudes hide. The diagonal <Tex>{String.raw`\rho_{aa}=|c_a|^2`}</Tex> is literally the{" "}
          <em>probability the atom is upper</em> (the upper-level population); the off-diagonal{" "}
          <Tex>{String.raw`\rho_{ab}=c_a c_b^{*}`}</Tex> is proportional to the atom&rsquo;s complex{" "}
          <em>dipole moment</em>, which — summed over the ensemble — becomes the radiating polarization. Coherence and
          population feed each other, and that coupling <em>is</em> the light&ndash;matter interaction.
        </Intuition>
        <p>
          Begin with the two-level superposition and the Chapter-II amplitude (Schrödinger) equations for its
          coefficients, now including the bare level frequency and the dipole interaction matrix element{" "}
          <Tex>{String.raw`\mathcal{V}_{ab}`}</Tex>:
        </p>
        <EqBlock label="1">{String.raw`\psi(\mathbf{r},t) = c_a(t)\,u_a(\mathbf{r}) + c_b(t)\,u_b(\mathbf{r})`}</EqBlock>
        <EqBlock label="2">{String.raw`\dot c_a = -i\omega_a c_a - \tfrac{i}{\hbar}\,\mathcal{V}_{ab}\,c_b`}</EqBlock>
        <EqBlock label="3">{String.raw`\dot c_b = -i\omega_b c_b - \tfrac{i}{\hbar}\,\mathcal{V}_{ba}\,c_a`}</EqBlock>
        <p>
          The density matrix is built from the bilinear products of these amplitudes — equivalently, the outer product
          of the state vector with itself:
        </p>
        <EqBlock label="4">{String.raw`\rho_{aa} = c_a c_a^{*}, \quad \rho_{bb} = c_b c_b^{*}, \quad \rho_{ab} = c_a c_b^{*}, \quad \rho_{ba} = c_b c_a^{*}`}</EqBlock>
        <KeyResult
          number="5"
          eq={String.raw`\rho = \psi\psi^{*} = \begin{pmatrix} c_a \\ c_b \end{pmatrix}\begin{pmatrix} c_a^{*} & c_b^{*}\end{pmatrix} = \begin{pmatrix} c_a c_a^{*} & c_a c_b^{*} \\ c_b c_a^{*} & c_b c_b^{*} \end{pmatrix} = \begin{pmatrix} \rho_{aa} & \rho_{ab} \\ \rho_{ba} & \rho_{bb} \end{pmatrix}`}
          label="The density matrix as an outer product"
        />
        <p>
          Why bother repackaging? Because now <em>every</em> expectation value is a single matrix operation. Multiply{" "}
          <Tex>{String.raw`\rho`}</Tex> into the operator&rsquo;s matrix and take the trace:
        </p>
        <KeyResult
          number="6–8"
          eq={String.raw`\langle\mathscr{O}\rangle = (\rho_{aa}\mathscr{O}_{aa} + \rho_{ab}\mathscr{O}_{ba}) + (\rho_{bb}\mathscr{O}_{bb} + \rho_{ba}\mathscr{O}_{ab}) = \sum_i (\rho\,\mathscr{O})_{ii} = \Tr(\rho\,\mathscr{O})`}
          label="The master formula"
          note={
            <>
              This single rule is the most-used tool of the chapter. Choose{" "}
              <Tex>{String.raw`\mathscr{O}`}</Tex> = energy and you read off populations; choose{" "}
              <Tex>{String.raw`\mathscr{O}`}</Tex> = dipole and you read off the polarization.
            </>
          }
        />
        <p>
          Differentiating the bilinear products and substituting the amplitude equations gives the equations of motion —
          the <Tex>{String.raw`\rho`}</Tex>-language replacement for Schrödinger&rsquo;s equation:
        </p>
        <EqBlock label="9">{String.raw`\dot\rho_{aa} = -\tfrac{i}{\hbar}\,\mathcal{V}_{ab}\,\rho_{ba} + \text{c.c.}`}</EqBlock>
        <EqBlock label="10">{String.raw`\dot\rho_{bb} = +\tfrac{i}{\hbar}\,\mathcal{V}_{ab}\,\rho_{ba} + \text{c.c.}`}</EqBlock>
        <KeyResult
          number="11"
          eq={String.raw`\dot\rho_{ab} = -i\omega_{ab}\,\rho_{ab} - \tfrac{i}{\hbar}\,\mathcal{V}_{ab}\,(\rho_{aa} - \rho_{bb}), \qquad \omega_{ab} \equiv \omega_a - \omega_b`}
          label="The coherence (dipole) equation of motion"
          note={
            <>
              Free precession at the transition frequency <Tex>{String.raw`\omega_{ab}`}</Tex> plus a drive proportional
              to the population difference. The populations are in turn driven by the coherence — they feed each other.
            </>
          }
        />
        <p>
          Two bookkeeping facts close the system: the matrix is Hermitian, and probabilities sum to one.
        </p>
        <EqBlock label="12">{String.raw`\rho_{ba} = \rho_{ab}^{*}`}</EqBlock>
        <EqBlock>{String.raw`\rho_{aa} + \rho_{bb} = 1, \qquad \Tr\,\rho = 1`}</EqBlock>
        <p>
          Abstractly, the pure case is just the projector onto the (single) state vector:
        </p>
        <EqBlock label="16">{String.raw`\rho = \ket{\psi}\bra{\psi}`}</EqBlock>

        <Derivation title="Derive the ρ equations of motion from the amplitude equations">
          <Step title="Differentiate the bilinear products">
            Write <Tex>{String.raw`\rho_{aa}=c_a c_a^{*}`}</Tex> and use the product rule, then substitute the
            Schrödinger amplitude equations (2)–(3) for <Tex>{String.raw`\dot c_a`}</Tex> and the conjugate equation for{" "}
            <Tex>{String.raw`\dot c_a^{*}`}</Tex>:
            <EqBlock>{String.raw`\dot\rho_{aa} = \dot c_a c_a^{*} + c_a \dot c_a^{*} = \big(-i\omega_a c_a - \tfrac{i}{\hbar}\mathcal{V}_{ab}c_b\big)c_a^{*} + c_a\big(+i\omega_a c_a^{*} + \tfrac{i}{\hbar}\mathcal{V}_{ab}^{*}c_b^{*}\big)`}</EqBlock>
          </Step>
          <Step title="The bare-frequency terms cancel on the diagonal">
            The <Tex>{String.raw`-i\omega_a`}</Tex> and <Tex>{String.raw`+i\omega_a`}</Tex> terms both multiply{" "}
            <Tex>{String.raw`|c_a|^2`}</Tex> and cancel. What remains is the interaction term and its complex conjugate
            — Eq.&nbsp;(9). The same procedure on <Tex>{String.raw`\rho_{bb}`}</Tex> gives Eq.&nbsp;(10) with the
            opposite sign, so <Tex>{String.raw`\tfrac{d}{dt}(\rho_{aa}+\rho_{bb})=0`}</Tex>: probability is conserved.
          </Step>
          <Step title="Off-diagonal keeps a free-precession term">
            For <Tex>{String.raw`\rho_{ab}=c_a c_b^{*}`}</Tex> the bare frequencies do <em>not</em> cancel — they
            combine to <Tex>{String.raw`-i(\omega_a-\omega_b)=-i\omega_{ab}`}</Tex>. Using normalization{" "}
            <Tex>{String.raw`\rho_{aa}+\rho_{bb}=1`}</Tex> to write the drive in terms of the population difference
            yields Eq.&nbsp;(11): the coherence precesses at <Tex>{String.raw`\omega_{ab}`}</Tex> and is pumped by{" "}
            <Tex>{String.raw`\mathcal{V}_{ab}(\rho_{aa}-\rho_{bb})`}</Tex>.
          </Step>
          <Step title="Read off the meaning">
            Identify <Tex>{String.raw`\Tr(\rho\,\mathscr{O})`}</Tex> (Eqs.&nbsp;6–8) as the general expectation-value
            rule. Specializing it — <Tex>{String.raw`\mathscr{O}`}</Tex> = dipole gives the polarization (off-diagonals),{" "}
            <Tex>{String.raw`\mathscr{O}`}</Tex> = energy gives the populations — is the bridge to the macroscopic field
            equations of later chapters.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Diagonal = gain, off-diagonal = field source">
          Memorize this map. <Tex>{String.raw`\rho_{aa}-\rho_{bb}`}</Tex> is the <strong>inversion</strong> (the sign of
          gain). <Tex>{String.raw`\rho_{ab}`}</Tex> is the complex <strong>dipole</strong>; sum it over atoms and you get
          the polarization that drives Maxwell&rsquo;s equations. The entire laser is the feedback loop between these
          two.
        </Callout>
        <Callout kind="warning" title="The ωab convention">
          The book defines <Tex>{String.raw`\omega_{ab}=\omega_a-\omega_b`}</Tex> (upper minus lower), so{" "}
          <Tex>{String.raw`\omega_{ab}>0`}</Tex>. Keep this sign — it propagates into every coherence equation through
          the precession factor <Tex>{String.raw`e^{-i\omega_{ab}t}`}</Tex>.
        </Callout>
      </Section>

      <Section title="7-2 The mixed case: statistical ensembles, and why coherence dies">
        <Intuition>
          A real medium is not one <Tex>{String.raw`\psi`}</Tex> — it is a <strong>statistical mixture</strong> of many
          state vectors occurring with classical probabilities <Tex>{String.raw`P_\psi`}</Tex> (different atoms prepared
          differently, at different times, with different collision histories). Crucially, this is <em>not</em> a
          coherent superposition: you add the <em>matrices</em> incoherently, not the state vectors. The payoff is what
          this does to the off-diagonals. Each member carries its dipole <Tex>{String.raw`\rho_{ab}`}</Tex> with a phase{" "}
          <Tex>{String.raw`\phi_\psi`}</Tex> set by how it was prepared. If those phases are random, the ensemble
          average of <Tex>{String.raw`e^{i\phi}`}</Tex> is zero — the off-diagonals average to <em>zero</em> even though
          every individual atom has a perfectly good dipole. The diagonal populations are positive and simply add.
          An incoherent mixture is therefore diagonal, Boltzmann-distributed — and you cannot represent it with a single
          wavefunction at all.
        </Intuition>
        <p>
          The mixed-case density operator is the probability-weighted sum of pure-case projectors. Expanding each member
          in a basis <Tex>{String.raw`\{\ket{n}\}`}</Tex> gives its general matrix elements:
        </p>
        <KeyResult
          number="17"
          eq={String.raw`\rho = \sum_{\psi} P_{\psi}\,\ket{\psi}\bra{\psi}`}
          label="The mixed-case (statistical) density operator"
          note={
            <>
              <Tex>{String.raw`P_\psi`}</Tex> is the classical fraction of systems in state{" "}
              <Tex>{String.raw`\psi`}</Tex> — a probability, not an amplitude.
            </>
          }
        />
        <EqBlock label="18">{String.raw`\ket{\psi} = \sum_n c_n \ket{n}`}</EqBlock>
        <EqBlock label="19">{String.raw`\rho = \sum_{\psi}\sum_{n}\sum_{m} P_{\psi}\,c_n c_m^{*}\,\ket{n}\bra{m} \equiv \sum_{n}\sum_{m}\rho_{nm}\ket{n}\bra{m}, \qquad \rho_{nm} = \sum_\psi P_\psi\,c_n c_m^{*}`}</EqBlock>
        <p>
          For two levels, label each member by <Tex>{String.raw`j`}</Tex> (different atoms have different amplitudes and
          phases). Each contributes its own outer product, weighted by <Tex>{String.raw`P_j`}</Tex>:
        </p>
        <EqBlock label="20">{String.raw`\ket{\psi(j)} = c_a(j)\ket{a} + c_b(j)\ket{b}`}</EqBlock>
        <EqBlock label="21">{String.raw`\rho = \sum_{j} P_j\,\ket{\psi_j}\bra{\psi_j}`}</EqBlock>
        <EqBlock label="22">{String.raw`\rho = \sum_{j} P_j \begin{pmatrix} |c_a(j)|^{2} & c_a(j)c_b(j)^{*} \\ c_b(j)c_a(j)^{*} & |c_b(j)|^{2} \end{pmatrix}`}</EqBlock>
        <p>
          Now make the key model assumption: all members have the same magnitudes but random phases, equally weighted.
          Watch the off-diagonal collapse.
        </p>
        <EqBlock label="23">{String.raw`c_a(j) = |c_a|\,\exp(i\phi_j), \qquad P_j = 1/N`}</EqBlock>
        <KeyResult
          number="24"
          eq={String.raw`\rho_{ab} = \sum_j P_j\,c_a(j)\,c_b(j)^{*} = |c_a||c_b|\,\frac{1}{N}\sum_{j=1}^{N}\exp(-i\phi_j) = |c_a||c_b|\,\frac{1}{2\pi}\int_0^{2\pi}\! d\phi\,\exp(-i\phi) = 0`}
          label="Random phases kill the coherence"
          note={
            <>
              The diagonals are <Tex>{String.raw`|c_a|^2,|c_b|^2`}</Tex>: positive, phase-free, they survive. The
              incoherent mixture is diagonal. This is the entire reason the density matrix exists.
            </>
          }
        />
        <p>
          For a thermal mixture the surviving diagonal is the Boltzmann distribution: the density operator is diagonal in
          the energy basis with <Tex>{String.raw`\exp(-E_n/k_B T)`}</Tex> weights.
        </p>
        <EqBlock label="25">{String.raw`P_a = P_{aa} = \exp(-\hbar\omega_a/k_B T)\big[1 - \exp(-\hbar\omega/k_B T)\big]`}</EqBlock>
        <EqBlock label="26">{String.raw`\rho = \big[1 - \exp(-\hbar\omega/k_B T)\big]\sum_{n}\exp(-n\hbar\omega/k_B T)\,\ket{n}\bra{n}`}</EqBlock>
        <p>
          The master formula is unchanged, but it is now a <em>double</em> average — quantum (over{" "}
          <Tex>{String.raw`\ket{\psi}`}</Tex>) and classical (over <Tex>{String.raw`P_\psi`}</Tex>):
        </p>
        <EqBlock label="27–28">{String.raw`\langle\mathscr{O}\rangle = \Tr(\rho\,\mathscr{O}) = \sum_{k}\sum_{\psi} P_{\psi}\braket{k|\psi}\bra{\psi}\mathscr{O}\ket{k}`}</EqBlock>
        <p>
          Finally, differentiate the mixture. The <Tex>{String.raw`P_\psi`}</Tex> are time-independent classical labels,
          so applying Schrödinger&rsquo;s equation to each member collapses everything to a commutator — the{" "}
          <strong>Liouville&ndash;von&nbsp;Neumann</strong> equation:
        </p>
        <KeyResult
          number="29"
          eq={String.raw`\dot\rho = -\tfrac{i}{\hbar}\sum_{\psi}P_{\psi}\big[\mathscr{H}\ket{\psi}\bra{\psi} - \ket{\psi}\bra{\psi}\mathscr{H}\big] = -\tfrac{i}{\hbar}[\mathscr{H},\rho]`}
          label="The Liouville–von Neumann equation"
        />
        <EqBlock label="30">{String.raw`[\mathscr{H},\rho] \equiv \mathscr{H}\rho - \rho\mathscr{H}`}</EqBlock>
        <p>In matrix-element (component) form — the workhorse for many-level problems:</p>
        <EqBlock label="31">{String.raw`\dot\rho_{ij} = -\tfrac{i}{\hbar}\bra{i}[\mathscr{H},\rho]\ket{j} = -\tfrac{i}{\hbar}\sum_k\big(\mathscr{H}_{ik}\rho_{kj} - \rho_{ik}\mathscr{H}_{kj}\big)`}</EqBlock>

        <Derivation title="From a weighted sum of projectors to the Liouville equation">
          <Step title="Build the mixture as a weighted sum of projectors">
            Write each member as a pure-state projector <Tex>{String.raw`\ket{\psi_j}\bra{\psi_j}`}</Tex>, then add them
            with classical weights <Tex>{String.raw`P_j`}</Tex> (Eqs.&nbsp;17,&nbsp;21). Expanding the two-level case
            gives the explicit <Tex>{String.raw`2\times2`}</Tex> sum, Eq.&nbsp;(22).
          </Step>
          <Step title="Insert random phases and average the off-diagonal">
            Set <Tex>{String.raw`c_a(j)=|c_a|e^{i\phi_j}`}</Tex>, equal weights{" "}
            <Tex>{String.raw`P_j=1/N`}</Tex>. The off-diagonal becomes{" "}
            <Tex>{String.raw`|c_a||c_b|`}</Tex> times the average of <Tex>{String.raw`e^{-i\phi}`}</Tex>. For uniformly
            random phases the sum becomes an integral over <Tex>{String.raw`[0,2\pi]`}</Tex>, which vanishes —
            Eq.&nbsp;(24). The diagonals carry no phase and survive.
          </Step>
          <Step title="Identify the equilibrium diagonal as Boltzmann">
            For a thermal mixture the surviving diagonal populations are the Boltzmann factors (Eqs.&nbsp;25–26): the
            density operator is diagonal in the energy basis with <Tex>{String.raw`\exp(-E_n/k_B T)`}</Tex> weights.
          </Step>
          <Step title="Derive the Liouville equation for the mixture">
            Differentiate <Tex>{String.raw`\rho = \sum_\psi P_\psi\ket{\psi}\bra{\psi}`}</Tex>. The{" "}
            <Tex>{String.raw`P_\psi`}</Tex> are constant. Apply{" "}
            <Tex>{String.raw`i\hbar\,\partial_t\ket{\psi}=\mathscr{H}\ket{\psi}`}</Tex> to each ket and the conjugate to
            each bra; the result collapses to the commutator form{" "}
            <Tex>{String.raw`-\tfrac{i}{\hbar}[\mathscr{H},\rho]`}</Tex> (Eq.&nbsp;29). Projecting onto{" "}
            <Tex>{String.raw`\ket{i},\bra{j}`}</Tex> gives the component form (Eq.&nbsp;31).
          </Step>
        </Derivation>

        <Callout kind="insight" title="Why a wavefunction is not enough">
          You literally cannot write the thermal/collisional state as a single <Tex>{String.raw`\psi`}</Tex>. The
          mixed-case <Tex>{String.raw`\rho`}</Tex> is the minimal object that holds classical ignorance (the{" "}
          <Tex>{String.raw`P_\psi`}</Tex>) and quantum amplitude (the <Tex>{String.raw`\ket{\psi}`}</Tex>) at once. That
          is the chapter&rsquo;s reason for existing.
        </Callout>
        <Callout kind="insight" title="Coherence is fragile, population is robust">
          Random phases kill off-diagonals but not diagonals. This already foreshadows&nbsp;7-3: anything that randomizes
          phase (collisions) damps the dipole faster than it damps the populations, giving{" "}
          <Tex>{String.raw`T_2 \le 2T_1`}</Tex>.
        </Callout>
      </Section>

      <Section title="7-3 Decay: phenomenological γ's, dephasing, and T1 vs T2">
        <Intuition>
          Real atoms decay (spontaneous emission) and collide. We do not derive these from first principles here — we
          insert them <strong>phenomenologically</strong> as rates, turning the closed Liouville equation into an{" "}
          <em>open-system</em> equation. Two physically distinct dampings appear. <strong>Population decay</strong>{" "}
          drains <Tex>{String.raw`\rho_{aa}`}</Tex> at rate <Tex>{String.raw`\gamma_a`}</Tex> (energy loss).{" "}
          <strong>Coherence decay</strong> damps the dipole <Tex>{String.raw`\rho_{ab}`}</Tex> at{" "}
          <Tex>{String.raw`\gamma_{ab}=\tfrac12(\gamma_a+\gamma_b)`}</Tex> — the average, because{" "}
          <Tex>{String.raw`\rho_{ab}=c_a c_b^{*}`}</Tex> inherits half of each. But there is more to coherence decay than
          lifetime: <strong>collisions</strong>. The brilliant move is to let collisions add a random frequency jitter{" "}
          <Tex>{String.raw`\delta\omega(t)`}</Tex> — the dipole keeps oscillating but its phase random-walks.
          Markoff-averaging that random phase produces a pure extra exponential <Tex>{String.raw`e^{-\gamma_{ph}t}`}</Tex>{" "}
          on top of lifetime decay. The dipole dephases faster than energy decays — the microscopic origin of{" "}
          <strong>homogeneous line broadening</strong> and of <Tex>{String.raw`T_2 \le 2T_1`}</Tex>.
        </Intuition>
        <p>
          Insert decay by hand. In the amplitude equations the rates appear as <Tex>{String.raw`\gamma/2`}</Tex> (so that{" "}
          <Tex>{String.raw`|c_a|^2`}</Tex> decays at the full <Tex>{String.raw`\gamma_a`}</Tex>):
        </p>
        <EqBlock label="32">{String.raw`\dot c_a = -(i\omega_a + \tfrac{1}{2}\gamma_a)c_a - \tfrac{i}{\hbar}\mathcal{V}_{ab}c_b`}</EqBlock>
        <EqBlock label="33">{String.raw`\dot c_b = -(i\omega_b + \tfrac{1}{2}\gamma_b)c_b - \tfrac{i}{\hbar}\mathcal{V}_{ba}c_a`}</EqBlock>
        <p>
          Equivalently, the population and coherence equations carry the <em>full</em> rates:
        </p>
        <EqBlock label="34">{String.raw`\dot\rho_{aa} = -\gamma_a\,\rho_{aa} - \tfrac{i}{\hbar}\big[\mathcal{V}_{ab}\rho_{ba} - \text{c.c.}\big]`}</EqBlock>
        <EqBlock label="35">{String.raw`\dot\rho_{bb} = -\gamma_b\,\rho_{bb} + \tfrac{i}{\hbar}\big[\mathcal{V}_{ab}\rho_{ba} - \text{c.c.}\big]`}</EqBlock>
        <EqBlock label="36">{String.raw`\dot\rho_{ab} = -(i\omega + \gamma_{ab})\,\rho_{ab} + \tfrac{i}{\hbar}\mathcal{V}_{ab}\,(\rho_{aa} - \rho_{bb})`}</EqBlock>
        <KeyResult
          number="37"
          eq={String.raw`\gamma_{ab} = \tfrac{1}{2}(\gamma_a + \gamma_b)`}
          label="Coherence decays at the average of the level rates"
          note="The lifetime contribution to the linewidth — the floor below which the dipole cannot decay more slowly."
        />
        <p>The same content packs into a compact operator (master) equation: the Liouville commutator plus an anticommutator with the decay matrix:</p>
        <EqBlock label="38">{String.raw`\dot\rho = -\tfrac{i}{\hbar}[\mathscr{H},\rho] - \tfrac{1}{2}\{\Gamma,\rho\}`}</EqBlock>
        <EqBlock label="39">{String.raw`\Gamma_{ij} = \gamma_i\,\delta_{ij}`}</EqBlock>

        <p>
          Now the collisions. Let a random instantaneous frequency shift <Tex>{String.raw`\delta\omega(t)`}</Tex> add to
          the transition; the dipole phase random-walks. The formal solution factors lifetime decay times an accumulated
          random phase:
        </p>
        <EqBlock label="40">{String.raw`\dot\rho_{ab} = -\big[i(\omega + \delta\omega(t)) + \gamma_{ab}\big]\rho_{ab}`}</EqBlock>
        <EqBlock label="41">{String.raw`\rho_{ab}(t) = \rho_{ab}(0)\,\exp\!\Big[-(i\omega + \gamma_{ab})t - i\!\int_0^{t}\! dt'\,\delta\omega(t')\Big]`}</EqBlock>

        <Derivation title="Markoff-average the collisional phase → exponential dephasing">
          <Step title="Expand the random phase factor">
            Expand the exponential of the accumulated phase and prepare to average term by term:
            <EqBlock label="42">{String.raw`\Big\langle \exp\!\big[-i\!\int_0^t dt'\,\delta\omega(t')\big]\Big\rangle = \Big\langle 1 - i\!\int_0^t dt'\,\delta\omega(t') - \tfrac{1}{2}\!\int_0^t\!\int_0^t dt'\,dt''\,\delta\omega(t')\delta\omega(t'') + \cdots\Big\rangle`}</EqBlock>
          </Step>
          <Step title="Only paired (delta-correlated) terms survive">
            Odd-order averages vanish. Even-order terms survive only when the collision times pair up — the Markoff
            (delta-correlated) assumption. Counting the ways to pair <Tex>{String.raw`2n`}</Tex> times:
            <EqBlock label="44">{String.raw`\binom{2n}{2}\binom{2n-2}{2}\cdots\binom{2}{2} = \frac{(2n)!}{2^{n}}`}</EqBlock>
          </Step>
          <Step title="Each 2n-th term reduces to a single power">
            Folding in the pairing count and the delta functions, every paired{" "}
            <Tex>{String.raw`2n`}</Tex>-th-order term collapses to{" "}
            <Tex>{String.raw`(-\gamma_{ph}t)^n/n!`}</Tex>:
            <EqBlock label="45">{String.raw`\frac{(-1)^n}{(2n)!}(2\gamma_{ph})^{n}\frac{(2n)!}{2^{n} n!}\int_0^t dt_1\cdots\int_0^t dt_{2n}\,\delta(t_1-t_2)\cdots\delta(t_{2n-1}-t_{2n}) = \frac{(-\gamma_{ph}t)^{n}}{n!}`}</EqBlock>
          </Step>
          <Step title="Resum to a pure exponential">
            Summing the series gives a pure exponential — collisional dephasing simply adds a rate{" "}
            <Tex>{String.raw`\gamma_{ph}`}</Tex> to the coherence decay:
            <EqBlock label="46">{String.raw`\Big\langle \exp\!\big[-i\!\int_0^t dt'\,\delta\omega(t')\big]\Big\rangle = \sum_n \frac{(-\gamma_{ph}t)^{n}}{n!} = \exp(-\gamma_{ph}t)`}</EqBlock>
          </Step>
          <Step title="Combine lifetime and collisional decay">
            Multiplying lifetime decay by the collisional exponential gives the net coherence decay, defining the total
            (transverse) rate <Tex>{String.raw`\gamma`}</Tex> and the modified coherence equation:
            <EqBlock label="47">{String.raw`\rho_{ab}(t) = \exp\!\big[-(i\omega + \gamma_{ab} + \gamma_{ph})t\big]\,\rho_{ab}(0)`}</EqBlock>
            <EqBlock label="49">{String.raw`\dot\rho_{ab} = -(i\omega + \gamma)\,\rho_{ab} + \tfrac{i}{\hbar}\mathcal{V}_{ab}\,(\rho_{aa} - \rho_{bb})`}</EqBlock>
          </Step>
        </Derivation>

        <KeyResult
          number="48"
          eq={String.raw`\gamma = \gamma_{ab} + \gamma_{ph}, \qquad \gamma_{ab} = \tfrac{1}{2}(\gamma_a+\gamma_b)`}
          label="Total coherence (transverse) decay rate"
          note={
            <>
              Lifetime part <Tex>{String.raw`\gamma_{ab}`}</Tex> plus collisional part{" "}
              <Tex>{String.raw`\gamma_{ph}`}</Tex>. The dipole decays at least as fast as the population average — never
              slower.
            </>
          }
        />

        <p>
          The section closes by distinguishing two kinds of broadening, illustrated below.{" "}
          <strong>Homogeneous</strong> broadening (collisions, natural width) gives every atom the <em>same</em>{" "}
          broadened line. <strong>Inhomogeneous</strong> broadening (Doppler shifts in gases, crystal-field strains in
          solids) is a <em>static spread</em> of different center frequencies — the same total width hiding very
          different physics.
        </p>

        <Figure
          caption={
            <>
              <strong>Fig.&nbsp;7-2.</strong> Left: a single <em>homogeneous</em> (Lorentzian) line — every atom sees
              the same broadened response. Right: an <em>inhomogeneous</em> profile built from many narrow lines at
              different center frequencies, summing to a broad Gaussian-like envelope (gray). Equal total widths can hide
              very different microscopic physics.
            </>
          }
        >
          <svg viewBox="0 0 560 220" width="100%" role="img" aria-label="Homogeneous versus inhomogeneous lineshapes">
            {/* axes */}
            <line x1="40" y1="180" x2="270" y2="180" stroke="#9aa3b2" strokeWidth="1" />
            <line x1="40" y1="180" x2="40" y2="30" stroke="#9aa3b2" strokeWidth="1" />
            <line x1="310" y1="180" x2="540" y2="180" stroke="#9aa3b2" strokeWidth="1" />
            <line x1="310" y1="180" x2="310" y2="30" stroke="#9aa3b2" strokeWidth="1" />
            {/* homogeneous Lorentzian (left) */}
            <path
              d="M40 178 C 110 176, 140 60, 155 50 C 170 60, 200 176, 270 178"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
            />
            <text x="155" y="200" textAnchor="middle" fontSize="12" fill="#5b6473">
              ν
            </text>
            <text x="155" y="24" textAnchor="middle" fontSize="13" fill="#4f46e5" fontWeight="600">
              homogeneous
            </text>
            {/* inhomogeneous: many narrow lines under a broad envelope (right) */}
            <path
              d="M310 178 C 360 176, 380 90, 425 78 C 470 90, 490 176, 540 178"
              fill="#94a3b822"
              stroke="#94a3b8"
              strokeWidth="1.5"
            />
            {[-60, -38, -18, 0, 18, 38, 60].map((dx, i) => {
              const cx = 425 + dx;
              const env = 78 + (1 - Math.exp(-(dx * dx) / 1400)) * 90;
              const peak = env;
              return (
                <path
                  key={i}
                  d={`M${cx - 9} 178 C ${cx - 4} ${(peak + 178) / 2}, ${cx - 2} ${peak}, ${cx} ${peak} C ${cx + 2} ${peak}, ${cx + 4} ${(peak + 178) / 2}, ${cx + 9} 178`}
                  fill="none"
                  stroke="#e11d48"
                  strokeWidth="1.6"
                />
              );
            })}
            <text x="425" y="200" textAnchor="middle" fontSize="12" fill="#5b6473">
              ν
            </text>
            <text x="425" y="24" textAnchor="middle" fontSize="13" fill="#e11d48" fontWeight="600">
              inhomogeneous
            </text>
            <text x="425" y="60" textAnchor="middle" fontSize="11" fill="#94a3b8">
              envelope
            </text>
          </svg>
        </Figure>

        <Callout kind="insight" title="T2 ≤ 2T1 is born here">
          <Tex>{String.raw`\gamma_{ab}=\tfrac12(\gamma_a+\gamma_b)`}</Tex> is the lifetime <em>floor</em> on coherence
          decay; collisions only <em>add</em> <Tex>{String.raw`\gamma_{ph}`}</Tex>. So the coherence rate{" "}
          <Tex>{String.raw`1/T_2`}</Tex> always decays at least as fast as the population average{" "}
          <Tex>{String.raw`1/2T_1`}</Tex> — equality only with zero collisions.
        </Callout>
        <Callout kind="warning" title="Factor-of-two trap">
          Amplitude equations use <Tex>{String.raw`\gamma/2`}</Tex>; population and coherence equations use the full{" "}
          <Tex>{String.raw`\gamma`}</Tex> (with <Tex>{String.raw`\gamma_{ab}=\tfrac12(\gamma_a+\gamma_b)`}</Tex>).
          Conflating these is the most common error — always track whether you are evolving the{" "}
          <Tex>{String.raw`c`}</Tex>&rsquo;s or the <Tex>{String.raw`\rho`}</Tex>&rsquo;s.
        </Callout>
        <Callout kind="insight" title="Homogeneous vs inhomogeneous">
          Homogeneous (collisions, natural width): every atom has the <em>same</em> broadened line. Inhomogeneous
          (Doppler, strain): a <em>static spread</em> of different center frequencies. Equal total width can hide very
          different physics — this distinction drives hole-burning and the Lamb dip later.
        </Callout>
      </Section>

      <Section title="7-4 Integrating the equations: perturbation in the field and the RWA">
        <Intuition>
          Now actually <em>solve</em> the coupled equations for a sinusoidal drive — but treat the field as weak and
          expand <Tex>{String.raw`\rho`}</Tex> in powers of <Tex>{String.raw`\wp E_0/\hbar`}</Tex>. The zeroth order is
          the field-free state (atom in the lower level). Turn on the field: to <strong>first order</strong> it induces a
          coherence <Tex>{String.raw`\rho_{ab}^{(1)}`}</Tex> (the linear dipole — linear susceptibility / absorption),
          and the populations do <em>not</em> change. To <strong>second order</strong> the induced dipole beats against
          the field to change the populations (saturation). The pattern: populations carry <em>even</em> powers,
          coherence carries <em>odd</em> powers. The key technical move is the rotating-wave approximation — keep the
          near-resonant <Tex>{String.raw`e^{-i(\omega-\nu)t}`}</Tex> term, drop the fast counter-rotating{" "}
          <Tex>{String.raw`e^{-i(\omega+\nu)t}`}</Tex> — which yields clean closed-form integrals.
        </Intuition>
        <p>
          Write the perturbation series and choose the field-free initial state (atom in the lower level):
        </p>
        <EqBlock label="50">{String.raw`\rho(t) = \rho^{(0)}(t) + \rho^{(1)}(t) + \rho^{(2)}(t) + \cdots, \qquad \rho^{(n)}\sim\big(\wp E_0/\hbar\big)^n`}</EqBlock>
        <EqBlock label="51">{String.raw`c_a(0) = 0,\quad c_b(0) = 1 \;\Longrightarrow\; \rho(0) = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}`}</EqBlock>
        <EqBlock label="52">{String.raw`\rho^{(0)}(t) = \begin{pmatrix} 0 & 0 \\ 0 & 1 \end{pmatrix}`}</EqBlock>
        <p>
          Remove the free precession with an integrating factor, so the left side is a total derivative and the right
          side carries the field times the inversion:
        </p>
        <EqBlock label="53">{String.raw`\frac{d}{dt}\big[\rho_{ab}\exp(i\omega t)\big] = \tfrac{i}{\hbar}\mathcal{V}_{ab}\exp(i\omega t)\,(\rho_{aa} - \rho_{bb})`}</EqBlock>
        <p>
          To lowest order the inversion is just its zeroth-order value <Tex>{String.raw`-1`}</Tex>, which drives the
          first-order coherence:
        </p>
        <EqBlock label="54">{String.raw`\rho_{aa} - \rho_{bb} = \rho_{aa}^{(0)} - \rho_{bb}^{(0)} = -1`}</EqBlock>
        <KeyResult
          number="55–56"
          eq={String.raw`\rho_{ab}^{(1)}(t) = \tfrac{1}{2}\Big(\frac{\wp E_0}{\hbar}\Big)\frac{\sin[\tfrac{1}{2}(\omega-\nu)t]}{\tfrac{1}{2}(\omega-\nu)}\,\exp\!\Big[-i\tfrac{\omega+\nu}{2}\,t\Big]`}
          label="First-order induced coherence (the resonance lineshape)"
          note={
            <>
              The linear dipole response, written as a <Tex>{String.raw`\sin(x)/x`}</Tex> lineshape: it peaks on
              resonance <Tex>{String.raw`(\omega=\nu)`}</Tex> and is the finite-time precursor of the Lorentzian
              absorption profile. Equivalently,{" "}
              <Tex>{String.raw`\rho_{ab}^{(1)} = \tfrac12(\wp E_0/\hbar)e^{-i\nu t}(\omega-\nu)^{-1}[1-e^{-i(\omega-\nu)t}]`}</Tex>.
            </>
          }
        />
        <p>
          Normalization holds order by order, and the orderings split cleanly: populations are even-order, coherence
          odd-order.
        </p>
        <EqBlock label="57">{String.raw`\rho_{aa}(t) = 1 - \rho_{bb}(t)`}</EqBlock>
        <EqBlock label="58">{String.raw`\rho_{aa} = \rho_{aa}^{(0)} + \rho_{aa}^{(2)}(t) + \rho_{aa}^{(4)}(t) + \cdots`}</EqBlock>
        <EqBlock label="59">{String.raw`\rho_{bb}(t) = \rho_{bb}^{(0)}(t) + \rho_{bb}^{(2)}(t) + \cdots`}</EqBlock>
        <p>
          Higher-order populations are built iteratively, feeding the lower-order coherence back through the field. The
          book writes these compactly; the structure is an iterative integral:
        </p>
        <EqBlock label="60–61">{String.raw`\rho_{aa}^{(0+n)}(t) = -\tfrac{i}{2\hbar}\wp E_0\!\int_0^t\! dt'\,\exp[-i(\omega-\nu)(t-t')]\,\big[\rho_{ab}^{(n)}(t')\big]^{*} \;+\; \text{c.c. structure}`}</EqBlock>
        <p>
          Finally, pass to the slowly varying frame by factoring out the optical carrier{" "}
          <Tex>{String.raw`e^{-i\nu t}`}</Tex> — the natural variable for the vector model in&nbsp;7-5 and for the laser
          equations later:
        </p>
        <EqBlock label="62–63">{String.raw`\rho_{ab}(t) = \rho_{ab}'(t)\exp(-i\nu t),\qquad \rho_{ba}(t) = \rho_{ba}'(t)\exp(i\nu t)`}</EqBlock>

        <Derivation title="The order-by-order perturbation engine">
          <Step title="Set up the power-series ansatz">
            Write <Tex>{String.raw`\rho=\rho^{(0)}+\rho^{(1)}+\cdots`}</Tex> with{" "}
            <Tex>{String.raw`\rho^{(n)}\sim(\wp E_0/\hbar)^n`}</Tex> (Eq.&nbsp;50). Choose the field-free initial state,
            so <Tex>{String.raw`\rho^{(0)}=\mathrm{diag}(0,1)`}</Tex> (Eqs.&nbsp;51–52).
          </Step>
          <Step title="Remove free precession with an integrating factor">
            Multiply the coherence equation by <Tex>{String.raw`e^{i\omega t}`}</Tex> so the left side is a total
            derivative (Eq.&nbsp;53). The right side carries the field times the inversion.
          </Step>
          <Step title="First order: drive with the zeroth-order inversion">
            Insert <Tex>{String.raw`\rho_{aa}-\rho_{bb}=-1`}</Tex> (Eq.&nbsp;54) and the sinusoidal field. Apply the
            RWA — keep <Tex>{String.raw`e^{-i(\omega-\nu)t}`}</Tex>, drop{" "}
            <Tex>{String.raw`e^{-i(\omega+\nu)t}`}</Tex> — and integrate from 0 to{" "}
            <Tex>{String.raw`t`}</Tex> to get <Tex>{String.raw`\rho_{ab}^{(1)}`}</Tex> (Eq.&nbsp;55), the{" "}
            <Tex>{String.raw`\sin(x)/x`}</Tex> lineshape (Eq.&nbsp;56).
          </Step>
          <Step title="Second order: dipole beats field to move populations">
            Feed <Tex>{String.raw`\rho_{ab}^{(1)}`}</Tex> back into the population equations; the product of the induced
            dipole and the field gives <Tex>{String.raw`\rho_{aa}^{(2)},\rho_{bb}^{(2)}`}</Tex> (Eqs.&nbsp;58–61).
            Populations appear only at even order, coherence only at odd order.
          </Step>
          <Step title="Pass to the slowly varying (rotating) frame">
            Define <Tex>{String.raw`\rho_{ab}=\rho_{ab}'e^{-i\nu t}`}</Tex> (Eqs.&nbsp;62–63).{" "}
            <Tex>{String.raw`\rho_{ab}'`}</Tex> is slowly varying — the natural variable for the Bloch-vector model and
            the laser equations.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Odd coherence, even populations">
          Field-induced coherence appears at orders 1, 3, 5,&hellip; and population changes at 2, 4, 6,&hellip;.
          First-order coherence = linear susceptibility (absorption/dispersion); second-order population =
          saturation/pumping. This ordering organizes every later gain calculation.
        </Callout>
        <Callout kind="warning" title="The RWA is an approximation, not an identity">
          Dropping the counter-rotating <Tex>{String.raw`e^{-i(\omega+\nu)t}`}</Tex> term is valid only near resonance
          and for not-too-strong fields. Flag it explicitly: the Bloch&ndash;Siegert shift lives in what you discarded.
        </Callout>
      </Section>

      <Section title="7-5 The vector model: the Bloch vector R precessing about β">
        <Intuition>
          The grand finale: repackage the entire complex two-level density matrix as a <strong>real 3-vector</strong>{" "}
          <Tex>{String.raw`\mathbf{R}=(R_1,R_2,R_3)`}</Tex> — the Bloch (pseudospin) vector. The transverse components{" "}
          <Tex>{String.raw`R_1,R_2`}</Tex> are the in-phase and quadrature parts of the slowly varying dipole;{" "}
          <Tex>{String.raw`R_3`}</Tex> is the population inversion. Astonishingly, the messy complex equations collapse
          into one geometric statement: <Tex>{String.raw`\dot{\mathbf{R}}=\boldsymbol{\beta}\times\mathbf{R}`}</Tex>{" "}
          minus relaxation — the vector <em>precesses about an effective field</em>{" "}
          <Tex>{String.raw`\boldsymbol{\beta}`}</Tex> exactly as a magnetic moment precesses in a real field. The
          detuning tips <Tex>{String.raw`\boldsymbol{\beta}`}</Tex> along the inversion axis; the Rabi drive tips it into
          the transverse plane. On resonance <Tex>{String.raw`\boldsymbol{\beta}`}</Tex> lies along{" "}
          <Tex>{String.raw`\hat{e}_1`}</Tex> and <Tex>{String.raw`\mathbf{R}`}</Tex> sweeps from south pole (atom down)
          to north (atom up): Rabi flopping, seen as a tipping arrow. Decay enters as <em>two</em> times:{" "}
          <Tex>{String.raw`T_2`}</Tex> damps the transverse dipole, <Tex>{String.raw`T_1`}</Tex> pulls the inversion to
          equilibrium.
        </Intuition>
        <p>
          Use the RWA dipole interaction and the slowly varying coherence equation as the starting point:
        </p>
        <EqBlock label="64">{String.raw`\mathcal{V}_{ab} = -\tfrac{1}{2}\wp E_0\,\exp(-i\nu t)`}</EqBlock>
        <EqBlock label="65">{String.raw`\frac{d}{dt}\big[\rho_{ab}\exp(i\nu t)\big] = -\big[i(\omega-\nu) + \gamma\big]\rho_{ab}\exp(i\nu t) - \tfrac{1}{2}\tfrac{i}{\hbar}\wp E_0(\rho_{aa} - \rho_{bb})`}</EqBlock>
        <p>
          Define the three real components from the slowly varying coherence and the inversion:
        </p>
        <EqBlock label="66">{String.raw`R_1 = \rho_{ab}\exp(i\nu t) + \text{c.c.}`}</EqBlock>
        <EqBlock label="67">{String.raw`R_2 = i\,\rho_{ab}\exp(i\nu t) + \text{c.c.}`}</EqBlock>
        <EqBlock label="68">{String.raw`R_1 - iR_2 = 2\rho_{ab}\exp(i\nu t)`}</EqBlock>
        <EqBlock label="69">{String.raw`R_3 = \rho_{aa} - \rho_{bb}`}</EqBlock>
        <p>
          Together these are the expectation values of the Pauli matrices in the slowly varying (interaction-picture)
          density matrix <Tex>{String.raw`\rho'`}</Tex>:
        </p>
        <EqBlock label="70">{String.raw`\mathbf{R} = R_1\hat{e}_1 + R_2\hat{e}_2 + R_3\hat{e}_3 = \Tr(\rho'\boldsymbol{\sigma})`}</EqBlock>
        <EqBlock label="71">{String.raw`\rho' = \begin{pmatrix} \rho_{aa} & \rho_{ab}\exp(i\nu t) \\ \rho_{ba}\exp(-i\nu t) & \rho_{bb} \end{pmatrix}`}</EqBlock>
        <p>
          Differentiate each component. The detuning produces rotations mixing{" "}
          <Tex>{String.raw`R_1\leftrightarrow R_2`}</Tex>, the Rabi drive mixes{" "}
          <Tex>{String.raw`R_2\leftrightarrow R_3`}</Tex>, and the decay rates appear as{" "}
          <Tex>{String.raw`-\gamma`}</Tex> on the transverse components and <Tex>{String.raw`-1/T_1`}</Tex> on the
          inversion:
        </p>
        <EqBlock label="72">{String.raw`\dot R_1 = -(\omega-\nu)R_2 - \gamma R_1`}</EqBlock>
        <EqBlock label="73">{String.raw`\dot R_2 = +(\omega-\nu)R_1 - \gamma R_2 + \frac{\wp E_0}{\hbar}R_3`}</EqBlock>
        <EqBlock label="74">{String.raw`\gamma_{ab} = \gamma = \frac{1}{T_2}`}</EqBlock>
        <EqBlock label="75">{String.raw`\dot R_3 = -\frac{R_3}{T_1} + \Big[\tfrac{i}{\hbar}\wp E_0\,\rho_{ab}\exp(-i\nu t) + \text{c.c.}\Big] = -\frac{R_3}{T_1} - \frac{\wp E_0}{\hbar}R_2`}</EqBlock>
        <p>The rotation terms are exactly the components of a cross product. The whole system becomes one torque equation:</p>
        <KeyResult
          number="76–77"
          eq={String.raw`\dot{\mathbf{R}} = \boldsymbol{\beta}\times\mathbf{R} - \gamma\mathbf{R}_{\perp} - \frac{R_3}{T_1}\hat{e}_3, \qquad \boldsymbol{\beta} = \frac{\wp E_0}{\hbar}\,\hat{e}_1 - (\omega-\nu)\,\hat{e}_3`}
          label="The Bloch vector equation of motion"
          note={
            <>
              The Bloch vector precesses about the effective field{" "}
              <Tex>{String.raw`\boldsymbol{\beta}`}</Tex> while damping. The transverse part decays at{" "}
              <Tex>{String.raw`\gamma=1/T_2`}</Tex>; the inversion relaxes at <Tex>{String.raw`1/T_1`}</Tex>. Identical
              in form to a magnetic moment in field <Tex>{String.raw`\boldsymbol{\beta}`}</Tex>.
            </>
          }
        />
        <p>
          To make <Tex>{String.raw`\boldsymbol{\beta}`}</Tex> time-independent, transform to the rotating frame with the
          merry-go-round transformation; the effective field becomes a fixed vector{" "}
          <Tex>{String.raw`\mathbf{b}`}</Tex> about which <Tex>{String.raw`\mathbf{R}`}</Tex> simply precesses at the
          generalized Rabi frequency <Tex>{String.raw`|\mathbf{b}|=\sqrt{(\wp E_0/\hbar)^2+(\omega-\nu)^2}`}</Tex>:
        </p>
        <EqBlock label="78">{String.raw`\hat{r} = \Big(\frac{d\mathbf{R}}{dt}\Big)_{\text{rot}} = \Big(\frac{d\mathbf{R}}{dt}\Big)_{\text{lab}} + \boldsymbol{\nu}\times\mathbf{R}`}</EqBlock>
        <EqBlock label="79">{String.raw`\dot{\hat{r}} = -\frac{\hat{r}}{T_1} + (\mathbf{r}\times\mathbf{b})`}</EqBlock>
        <EqBlock label="80">{String.raw`\mathbf{b} = \frac{\wp E_0}{\hbar}\,\hat{e}_1 - (\omega-\nu)\,\hat{e}_3`}</EqBlock>

        <p>
          The simulation below integrates exactly these equations — Eqs.&nbsp;(72)–(75) in the rotating frame. The map{" "}
          <Tex>{String.raw`\rho\leftrightarrow\mathbf{R}`}</Tex> (Eqs.&nbsp;66–71) is exact, so the populations and
          coherence shown are <em>faithful density-matrix elements</em>, not a separate model:
        </p>

        <SimFrame
          title="The Bloch vector: precess, flop, dephase, relax"
          caption={
            <>
              Set the detuning <Tex>{String.raw`\Delta=\omega-\nu`}</Tex>, the Rabi drive{" "}
              <Tex>{String.raw`\wp E_0/\hbar`}</Tex>, and the two relaxation rates, then watch{" "}
              <Tex>{String.raw`\mathbf{R}`}</Tex> trace its trajectory on the Bloch sphere while the populations{" "}
              <Tex>{String.raw`\rho_{aa},\rho_{bb}`}</Tex>, the inversion <Tex>{String.raw`R_3`}</Tex>, and the coherence
              magnitude <Tex>{String.raw`|\rho_{ab}|`}</Tex> update beneath. The complex density matrix and the real Bloch
              vector are visibly the <em>same object</em>.
            </>
          }
          tryThis={
            <>
              Set <Tex>{String.raw`\Delta=0`}</Tex> and both rates to 0: <Tex>{String.raw`R_3`}</Tex> floods from{" "}
              <Tex>{String.raw`-1`}</Tex> to <Tex>{String.raw`+1`}</Tex> and back as{" "}
              <Tex>{String.raw`-\cos(\Omega t)`}</Tex> — pure Rabi flopping, a great circle on the sphere. Now detune:{" "}
              <Tex>{String.raw`\boldsymbol{\beta}`}</Tex> tilts toward <Tex>{String.raw`\hat{e}_3`}</Tex>,{" "}
              <Tex>{String.raw`\mathbf{R}`}</Tex> precesses on a cone and never reaches the north pole (max inversion{" "}
              <Tex>{String.raw`\Omega^2/|\beta|^2`}</Tex>). Finally uncheck the drive: with{" "}
              <Tex>{String.raw`\Omega=0`}</Tex> the transverse part shrinks at <Tex>{String.raw`1/T_2`}</Tex> (free
              induction decay) while <Tex>{String.raw`R_3`}</Tex> relaxes to <Tex>{String.raw`R_3^{\mathrm{eq}}`}</Tex>{" "}
              at <Tex>{String.raw`1/T_1`}</Tex>.
            </>
          }
        >
          <Ch07Sim />
        </SimFrame>

        <Derivation title="From the complex equations to the precessing arrow">
          <Step title="Define the three real components">
            Set <Tex>{String.raw`R_1,R_2`}</Tex> as the real/imaginary parts of the slowly varying coherence{" "}
            <Tex>{String.raw`2\rho_{ab}e^{i\nu t}`}</Tex> (Eqs.&nbsp;66–68) and{" "}
            <Tex>{String.raw`R_3`}</Tex> = inversion (Eq.&nbsp;69). Recognize{" "}
            <Tex>{String.raw`\mathbf{R}=\Tr(\rho'\boldsymbol{\sigma})`}</Tex>: the Bloch vector is the set of Pauli
            expectation values (Eqs.&nbsp;70–71).
          </Step>
          <Step title="Differentiate each component">
            Differentiate <Tex>{String.raw`R_1,R_2`}</Tex> with the slowly varying coherence equation (65) and{" "}
            <Tex>{String.raw`R_3`}</Tex> with the population equations (34)–(35) plus the field. Detuning{" "}
            <Tex>{String.raw`(\omega-\nu)`}</Tex> rotates <Tex>{String.raw`R_1\leftrightarrow R_2`}</Tex>, the drive{" "}
            mixes <Tex>{String.raw`R_2\leftrightarrow R_3`}</Tex>, and decay gives{" "}
            <Tex>{String.raw`-\gamma`}</Tex> on <Tex>{String.raw`R_1,R_2`}</Tex> and{" "}
            <Tex>{String.raw`-1/T_1`}</Tex> on <Tex>{String.raw`R_3`}</Tex> (Eqs.&nbsp;72–75).
          </Step>
          <Step title="Recognize the cross-product structure">
            The rotation terms are exactly the components of{" "}
            <Tex>{String.raw`\boldsymbol{\beta}\times\mathbf{R}`}</Tex> with{" "}
            <Tex>{String.raw`\boldsymbol{\beta}=(\wp E_0/\hbar)\hat{e}_1-(\omega-\nu)\hat{e}_3`}</Tex>. Hence{" "}
            <Tex>{String.raw`\dot{\mathbf{R}}=\boldsymbol{\beta}\times\mathbf{R}`}</Tex> minus damping (Eqs.&nbsp;76–77)
            — a precessing, damped torque equation identical to a magnetic moment in field{" "}
            <Tex>{String.raw`\boldsymbol{\beta}`}</Tex>.
          </Step>
          <Step title="Transform to the rotating frame">
            Apply the merry-go-round transformation (Eq.&nbsp;78) to remove the optical carrier; the effective field{" "}
            <Tex>{String.raw`\mathbf{b}`}</Tex> becomes time-independent (Eqs.&nbsp;79–80). There{" "}
            <Tex>{String.raw`\mathbf{R}`}</Tex> precesses about a fixed <Tex>{String.raw`\mathbf{b}`}</Tex> at the
            generalized Rabi frequency <Tex>{String.raw`|\mathbf{b}|=\sqrt{(\wp E_0/\hbar)^2+(\omega-\nu)^2}`}</Tex>.
          </Step>
          <Step title="Read the geometry">
            On resonance <Tex>{String.raw`\mathbf{b}`}</Tex> lies along <Tex>{String.raw`\hat{e}_1`}</Tex>;{" "}
            <Tex>{String.raw`\mathbf{R}`}</Tex> tips from the south pole (<Tex>{String.raw`R_3=-1`}</Tex>, atom in the
            lower level) up and over — Rabi flopping. Off resonance{" "}
            <Tex>{String.raw`\mathbf{b}`}</Tex> tilts toward <Tex>{String.raw`\hat{e}_3`}</Tex> and{" "}
            <Tex>{String.raw`\mathbf{R}`}</Tex> precesses on a cone, never fully inverting. Decay shrinks the transverse
            circle (<Tex>{String.raw`T_2`}</Tex>) and pulls <Tex>{String.raw`R_3`}</Tex> to equilibrium (
            <Tex>{String.raw`T_1`}</Tex>). This single picture contains absorption, stimulated emission, Rabi
            oscillation, free induction decay, and photon echoes.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Two clocks: T1 and T2">
          <Tex>{String.raw`T_1`}</Tex> (longitudinal) damps the inversion <Tex>{String.raw`R_3`}</Tex> — energy
          relaxation. <Tex>{String.raw`T_2=1/\gamma`}</Tex> (transverse) damps the dipole{" "}
          <Tex>{String.raw`R_1,R_2`}</Tex> — phase/coherence relaxation. They are physically distinct; collisions shorten{" "}
          <Tex>{String.raw`T_2`}</Tex> without touching <Tex>{String.raw`T_1`}</Tex>, giving{" "}
          <Tex>{String.raw`T_2 \le 2T_1`}</Tex>.
        </Callout>
        <Callout kind="insight" title="Spin in a magnetic field, exactly">
          Replace <Tex>{String.raw`\wp E_0`}</Tex> by the magnetic moment times field amplitude{" "}
          <Tex>{String.raw`(\mu H)`}</Tex> and the optical two-level atom <em>is</em> a spin-½ in a magnetic field.
          Every NMR/ESR intuition transfers: <Tex>{String.raw`\pi`}</Tex>-pulses,{" "}
          <Tex>{String.raw`\pi/2`}</Tex>-pulses, echoes.
        </Callout>
        <Callout kind="warning" title="Generalized vs bare Rabi frequency">
          On resonance the flopping frequency is the bare Rabi frequency <Tex>{String.raw`\wp E_0/\hbar`}</Tex>. Off
          resonance it is the generalized Rabi frequency{" "}
          <Tex>{String.raw`|\boldsymbol{\beta}|=\sqrt{(\wp E_0/\hbar)^2+(\omega-\nu)^2}`}</Tex>, and the inversion never
          reaches <Tex>{String.raw`+1`}</Tex>. Do not conflate the two.
        </Callout>
      </Section>

      <Section title="The three results you keep">
        <KeyResult
          eq={String.raw`\langle\mathscr{O}\rangle = \Tr(\rho\,\mathscr{O}), \qquad \rho = \sum_{\psi} P_{\psi}\,\ket{\psi}\bra{\psi}`}
          label="Density matrix and the expectation-value rule"
          note={
            <>
              The density operator packages quantum amplitude <em>and</em> classical statistics; every observable is one
              trace away. Diagonals are populations (gain), off-diagonals are the dipole/polarization (field source).
            </>
          }
        />
        <KeyResult
          eq={String.raw`\dot{\mathbf{R}} = \boldsymbol{\beta}\times\mathbf{R} - \gamma\mathbf{R}_{\perp} - \frac{R_3}{T_1}\hat{e}_3, \qquad \boldsymbol{\beta} = \frac{\wp E_0}{\hbar}\,\hat{e}_1 - (\omega-\nu)\,\hat{e}_3`}
          label="Bloch vector equation of motion"
          note={
            <>
              The entire complex two-level density matrix collapses to a real 3-vector precessing about{" "}
              <Tex>{String.raw`\boldsymbol{\beta}`}</Tex> and relaxing with two distinct times. The geometric heart of
              two-level laser physics.
            </>
          }
        />
        <KeyResult
          eq={String.raw`\gamma = \gamma_{ab} + \gamma_{ph}, \quad \gamma_{ab} = \tfrac{1}{2}(\gamma_a+\gamma_b), \quad \big\langle e^{-i\int_0^t\delta\omega\,dt'}\big\rangle = e^{-\gamma_{ph}t}`}
          label="Total coherence decay = lifetime + collisional dephasing"
          note={
            <>
              Markoff-averaging random collisional jitter yields a pure exponential extra decay of the dipole. The
              coherence <Tex>{String.raw`(1/T_2)`}</Tex> decays at least as fast as the population average — the origin of
              homogeneous (Lorentzian) broadening and of <Tex>{String.raw`T_2 \le 2T_1`}</Tex>.
            </>
          }
        />
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What the rest of the book takes from this chapter">
          <ul>
            <li>
              <strong>The density matrix is the central object.</strong> Diagonals{" "}
              <Tex>{String.raw`\rho_{aa},\rho_{bb}`}</Tex> are populations (gain/inversion); off-diagonal{" "}
              <Tex>{String.raw`\rho_{ab}`}</Tex> is the complex dipole whose ensemble sum is the macroscopic
              polarization <Tex>{String.raw`P`}</Tex> sourcing the laser field. Every observable is{" "}
              <Tex>{String.raw`\langle\mathscr{O}\rangle=\Tr(\rho\,\mathscr{O})`}</Tex>.
            </li>
            <li>
              <strong>Mixture ≠ superposition.</strong>{" "}
              <Tex>{String.raw`\rho=\sum_\psi P_\psi\ket{\psi}\bra{\psi}`}</Tex>: random phases drive off-diagonals to
              zero while populations Boltzmann-distribute. This is why you need <Tex>{String.raw`\rho`}</Tex>, and it
              foreshadows decoherence.
            </li>
            <li>
              <strong>Two decay rates.</strong> Population decay (<Tex>{String.raw`\gamma_a,\gamma_b`}</Tex>, giving{" "}
              <Tex>{String.raw`1/T_1`}</Tex>) and coherence decay (<Tex>{String.raw`\gamma=1/T_2=\gamma_{ab}+\gamma_{ph}`}</Tex>).
              Remember <Tex>{String.raw`T_2 \le 2T_1`}</Tex>, and that collisions shorten{" "}
              <Tex>{String.raw`T_2`}</Tex> only.
            </li>
            <li>
              <strong>The factor of two.</strong> Amplitude equations carry{" "}
              <Tex>{String.raw`\gamma/2`}</Tex>; density-matrix equations carry the full{" "}
              <Tex>{String.raw`\gamma`}</Tex> (with <Tex>{String.raw`\gamma_{ab}=\tfrac12(\gamma_a+\gamma_b)`}</Tex>).
              Keep this straight in every later derivation.
            </li>
            <li>
              <strong>The perturbation ordering.</strong> Field-induced coherence at odd orders (1st = linear
              susceptibility / absorption), population changes at even orders (2nd = saturation). This organizes the gain
              and polarization calculations of later chapters.
            </li>
            <li>
              <strong>RWA + slowly-varying envelope.</strong> Keep{" "}
              <Tex>{String.raw`e^{-i(\omega-\nu)t}`}</Tex>, drop <Tex>{String.raw`e^{-i(\omega+\nu)t}`}</Tex>, and write{" "}
              <Tex>{String.raw`\rho_{ab}=\rho_{ab}'e^{-i\nu t}`}</Tex> — the standard simplifications used throughout.
            </li>
            <li>
              <strong>The Bloch-vector picture.</strong>{" "}
              <Tex>{String.raw`\dot{\mathbf{R}}=\boldsymbol{\beta}\times\mathbf{R}`}</Tex> minus relaxation — the optical
              analog of a spin in a magnetic field, and the geometric language for Rabi flopping, free induction decay,
              photon echoes, and pulse propagation later.
            </li>
            <li>
              <strong>Homogeneous vs inhomogeneous.</strong> Collisional/natural (dynamic) vs Doppler/strain (static
              spread of center frequencies) — physically different even at equal width, underlying hole-burning, the Lamb
              dip, and gas-vs-solid lineshapes.
            </li>
            <li>
              <strong>The generalized Rabi frequency.</strong>{" "}
              <Tex>{String.raw`|\boldsymbol{\beta}|=\sqrt{(\wp E_0/\hbar)^2+(\omega-\nu)^2}`}</Tex> sets the off-resonant
              flopping rate and limits the maximum inversion off resonance.
            </li>
          </ul>
          Next, Chapter&nbsp;VIII closes the loop: feed this <Tex>{String.raw`\rho`}</Tex>-derived polarization back into
          Maxwell&rsquo;s equations to get a self-consistent laser field — threshold, intensity, and mode pulling.
        </Callout>
      </Section>
    </Lesson>
  );
}
