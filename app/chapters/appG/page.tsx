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
import AppGSim from "@/components/sims/appG";

export default function Page() {
  return (
    <Lesson slug="appG">
      <Lede>
        Take <Tex>{String.raw`N`}</Tex> identical atoms, all excited, packed into a region smaller than a wavelength.
        Naively each one decays on its own and the light output just scales like <Tex>{String.raw`N`}</Tex>. Dicke&rsquo;s
        startling discovery is that this is <em>wrong</em>: once the atoms share one radiation field their dipoles lock
        into phase, and at maximum coherence the emission rate leaps to <Tex>{String.raw`\sim N^2`}</Tex>. The ensemble
        radiates as one giant dipole — a burst far faster and brighter than ordinary fluorescence. That is{" "}
        <strong>superradiance</strong>. We build it from one exactly-solvable two-atom problem, discover that only the{" "}
        <em>symmetric</em> states radiate, organize them into a &ldquo;Dicke ladder,&rdquo; and find the whole ensemble
        behaves as a single spin <Tex>{String.raw`r=N/2`}</Tex>. The flip side is just as deep: the dark antisymmetric
        states <strong>trap</strong> their light forever.
      </Lede>

      <Section title="Why atoms must be treated together">
        <Intuition>
          When several atoms sit within a region small compared to the radiation wavelength, they couple to the{" "}
          <em>same</em> resonant electric field. You can no longer pretend each radiates into its own private vacuum — the
          whole atom-field system must be diagonalized at once. Hold onto the contrast: randomly-phased dipoles radiate at
          a rate <Tex>{String.raw`\propto N`}</Tex> (ordinary incoherent fluorescence), but <strong>phase-aligned</strong>{" "}
          dipoles radiate at a rate <Tex>{String.raw`\propto N^2`}</Tex>. Here the phasing is created by spontaneous
          emission <em>itself</em> — that is what distinguishes superradiance from the engineered two-pulse photon echo.
        </Intuition>
        <p>
          The whole construction lives inside one geometric hierarchy. The wavelength must dwarf the interatomic spacing,
          which in turn must dwarf an atom:
        </p>
        <KeyResult
          number="—"
          eq={String.raw`\lambda \gg d \gg a_0`}
          label="Geometric regime for superradiance"
          note={
            <>
              <Tex>{String.raw`\lambda \gg d`}</Tex> means every atom sees a common field phase, so they can{" "}
              <em>cooperate</em>; <Tex>{String.raw`d \gg a_0`}</Tex> (with <Tex>{String.raw`a_0`}</Tex> the Bohr radius)
              means direct atom-atom interactions and collisions are negligible — only the atom-field dipole coupling
              survives.
            </>
          }
        />
        <p>
          That is the entire organizing question of this appendix: incoherent emission scales as{" "}
          <Tex>{String.raw`N`}</Tex>, coherent emission as <Tex>{String.raw`N^2`}</Tex>. Everything below is the
          quantum-mechanical demonstration of how, and under what conditions, the second behavior arises purely from
          spontaneous decay. In the end it all reduces to computing <em>one</em> matrix element and squaring it.
        </p>
        <Callout kind="insight" title="The single-atom intensity I₀ sets the scale">
          Throughout, <Tex>{String.raw`I_0`}</Tex> denotes the single-atom spontaneous-emission intensity — the
          Weisskopf-Wigner rate of Chapter XIV. Every collective result is quoted as a multiple of{" "}
          <Tex>{String.raw`I_0`}</Tex>: ordinary fluorescence gives <Tex>{String.raw`N I_0`}</Tex>, superradiance gives{" "}
          <Tex>{String.raw`\sim (N^2/4)\,I_0`}</Tex>.
        </Callout>
      </Section>

      <Section title="Two atoms and a single field mode">
        <Intuition>
          Start with the simplest nontrivial case: two two-level atoms (lower <Tex>{String.raw`b`}</Tex>, upper{" "}
          <Tex>{String.raw`a`}</Tex>) coupled to one field mode, which initially holds two photons while both atoms sit in
          the ground state. The dipole interaction lets the field hand its photons to the atoms. We write the coupling,
          quantize it, make the rotating-wave approximation, and propagate the initial state with the Dyson series. The
          crucial output: the state grows a one-photon piece in which one atom is excited — but <em>only</em> in the{" "}
          <strong>symmetric</strong> combination <Tex>{String.raw`|a_1 b_2\rangle + |b_1 a_2\rangle`}</Tex>. The
          antisymmetric combination never appears.
        </Intuition>
        <p>
          The electric-dipole interaction energy for the two atoms is the dipole-in-a-field energy at each site:
        </p>
        <EqBlock label="1">{String.raw`\mathscr{V} = -e\,\mathbf{r}_1 \cdot \mathbf{E}_1 - e\,\mathbf{r}_2 \cdot \mathbf{E}_2.`}</EqBlock>
        <p>
          Because the atoms lie within a wavelength, the field is the same at both sites,{" "}
          <Tex>{String.raw`\mathbf{E}_1 = \mathbf{E}_2 = \mathbf{E}`}</Tex>, so the two dipoles add coherently:
        </p>
        <EqBlock label="2">{String.raw`\mathscr{V} = -e\,(\mathbf{r}_1 + \mathbf{r}_2) \cdot \mathbf{E}.`}</EqBlock>
        <p>
          Quantize. Each atomic dipole becomes <Tex>{String.raw`g_\lambda(\sigma_i + \sigma_i^\dagger)`}</Tex> with the
          lowering operator <Tex>{String.raw`\sigma_i = |b_i\rangle\langle a_i|`}</Tex>, and the field becomes{" "}
          <Tex>{String.raw`a_\lambda + a_\lambda^\dagger`}</Tex>:
        </p>
        <KeyResult
          number="3"
          eq={String.raw`\mathscr{V} = g_\lambda\big[(\sigma_1 + \sigma_1^\dagger) + (\sigma_2 + \sigma_2^\dagger)\big](a_\lambda + a_\lambda^\dagger).`}
          label="Quantized dipole coupling (Dicke / Tavis–Cummings form)"
          note={
            <>
              <Tex>{String.raw`g_\lambda`}</Tex> is the atom-field coupling constant; <Tex>{String.raw`a_\lambda`}</Tex>,{" "}
              <Tex>{String.raw`a_\lambda^\dagger`}</Tex> annihilate/create a photon in mode{" "}
              <Tex>{String.raw`\lambda`}</Tex>. This is the interaction before the rotating-wave approximation.
            </>
          }
        />
        <p>
          Drop the energy-nonconserving (counter-rotating) terms and pass to the interaction picture, exactly as in the
          quantization of Chapter XIV:
        </p>
        <EqBlock label="4">{String.raw`\mathscr{V}_I(t) = g_\lambda(\sigma_1 + \sigma_2)\,e^{\,i(\nu_\lambda - \omega)t}\,a_\lambda^\dagger + \text{adjoint}.`}</EqBlock>
        <p>
          Here <Tex>{String.raw`\nu_\lambda`}</Tex> is the field-mode frequency and <Tex>{String.raw`\omega`}</Tex> the
          atomic transition frequency; the surviving terms drop an atom while creating a photon (plus the adjoint). The
          state evolves with the time-evolution operator,
        </p>
        <EqBlock label="5">{String.raw`|\psi_{a\text{-}f}(t)\rangle = U(t,0)\,|\psi_{a\text{-}f}(0)\rangle,`}</EqBlock>
        <p>which we expand as a truncated Dyson (perturbation) series:</p>
        <EqBlock label="6">{String.raw`U(t,0) = 1 + \frac{-i}{\hbar}\!\int_0^t\! dt'\,\mathscr{V}_I(t') + \Big(\frac{-i}{\hbar}\Big)^{2}\!\int_0^t\! dt' \!\int_0^{t'}\! dt''\,\mathscr{V}_I(t')\mathscr{V}_I(t'') + \cdots`}</EqBlock>
        <p>
          Act with this on the initial state — both atoms down, two photons in the field:
        </p>
        <EqBlock label="7">{String.raw`|\psi_{a\text{-}f}(0)\rangle = |b_1 b_2\rangle\,|2_\lambda\rangle.`}</EqBlock>
        <p>
          The linear term promotes one atom and removes one photon; the quadratic term promotes the second. Reading off the
          amplitudes gives the evolved state:
        </p>
        <KeyResult
          number="8"
          eq={String.raw`|\psi_{a\text{-}f}(t)\rangle = C_0\,|b_1 b_2\rangle|2_\lambda\rangle + \sqrt{2}\,C_1\big[\,|a_1 b_2\rangle + |b_1 a_2\rangle\,\big]|1_\lambda\rangle + \sqrt{2}\,C_2\,|a_1 a_2\rangle|0_\lambda\rangle,`}
          label="Evolved two-atom + field state"
          note={
            <>
              Only the <strong>symmetric</strong> one-photon combination{" "}
              <Tex>{String.raw`|a_1 b_2\rangle + |b_1 a_2\rangle`}</Tex> appears; the antisymmetric one is absent. The{" "}
              <Tex>{String.raw`\sqrt{2}`}</Tex> factors are the bosonic photon-number enhancement from{" "}
              <Tex>{String.raw`a_\lambda^\dagger`}</Tex> acting on <Tex>{String.raw`|1_\lambda\rangle`}</Tex> and{" "}
              <Tex>{String.raw`|2_\lambda\rangle`}</Tex>. To this order the top amplitude is{" "}
              <Tex>{String.raw`C_2 = (-i g_\lambda t/\hbar)^2`}</Tex>.
            </>
          }
        />
        <Derivation title="From classical dipole energy to the evolved state">
          <Step title="Quantize the dipole coupling under the RWA">
            Start from <Tex>{String.raw`\mathscr{V} = -e\mathbf{r}_1\!\cdot\!\mathbf{E}_1 - e\mathbf{r}_2\!\cdot\!\mathbf{E}_2`}</Tex>{" "}
            (Eq. 1). Close packing (<Tex>{String.raw`\lambda \gg d`}</Tex>) sets{" "}
            <Tex>{String.raw`\mathbf{E}_1 = \mathbf{E}_2 = \mathbf{E}`}</Tex>, giving Eq. (2). Promote each dipole to{" "}
            <Tex>{String.raw`g_\lambda(\sigma_i + \sigma_i^\dagger)`}</Tex> and the field to{" "}
            <Tex>{String.raw`a_\lambda + a_\lambda^\dagger`}</Tex> (Eq. 3). Drop the counter-rotating terms{" "}
            <Tex>{String.raw`\sigma_i a_\lambda`}</Tex> and <Tex>{String.raw`\sigma_i^\dagger a_\lambda^\dagger`}</Tex> and
            go to the interaction picture to get Eq. (4) with its <Tex>{String.raw`e^{i(\nu_\lambda-\omega)t}`}</Tex>{" "}
            phase.
          </Step>
          <Step title="Propagate with the Dyson series">
            Insert the truncated <Tex>{String.raw`U`}</Tex> (Eq. 6) acting on{" "}
            <Tex>{String.raw`|b_1 b_2\rangle|2_\lambda\rangle`}</Tex> (Eq. 7). The first-order term{" "}
            <Tex>{String.raw`\sigma_i^\dagger a_\lambda`}</Tex> raises one atom and removes one photon, but only the{" "}
            symmetric superposition survives because the operator sum <Tex>{String.raw`\sigma_1+\sigma_2`}</Tex> is
            symmetric under atom exchange. The second-order term excites the second atom and empties the field.
          </Step>
          <Step title="Identify the four states, motivate the symmetric basis">
            Each atom is independently up or down, giving four product states{" "}
            <Tex>{String.raw`|a_1 a_2\rangle|0\rangle,\ |a_1 b_2\rangle|1\rangle,\ |b_1 a_2\rangle|1\rangle,\ |b_1 b_2\rangle|2\rangle`}</Tex>
            . The dynamics only ever combines the two single-excitation states symmetrically, so it is natural to split
            them into a symmetric combination (which radiates) and an orthogonal antisymmetric one (which does not). That
            sets up the Dicke basis.
          </Step>
        </Derivation>
        <Callout kind="insight" title="The catch: a fourth, dark state">
          There are four product states but the dynamics uses only three (the symmetric ladder). The fourth — the{" "}
          <strong>antisymmetric</strong> single-excitation state — can never be reached or left by this Hamiltonian: any
          photon that lands in it is trapped. This single observation seeds <em>both</em> superradiance (symmetric =
          bright) and radiation trapping (antisymmetric = dark).
        </Callout>
      </Section>

      <Section title="The Dicke basis and the boosted matrix elements">
        <Intuition>
          Reorganize the product states by exchange symmetry. The totally symmetric states form a ladder{" "}
          <Tex>{String.raw`|0\rangle, |1\rangle, |2\rangle`}</Tex>; the lone antisymmetric single-excitation state is{" "}
          <Tex>{String.raw`|1'\rangle`}</Tex> (primed). Now look at the matrix elements of the collective operator{" "}
          <Tex>{String.raw`(\sigma_1+\sigma_2)`}</Tex>: the symmetric ladder has <em>non-zero, enhanced</em> couplings,
          while every element touching <Tex>{String.raw`|1'\rangle`}</Tex> <strong>vanishes</strong>. The antisymmetric
          state is dark. The three-atom case then gives the first real glimpse of super-linear scaling.
        </Intuition>
        <p>The four two-atom Dicke states (the ket number counts excited atoms):</p>
        <EqBlock label="9">{String.raw`|0\rangle = |b_1 b_2\rangle\,|2_\lambda\rangle,`}</EqBlock>
        <EqBlock label="10">{String.raw`|1\rangle = 2^{-1/2}\big[\,|a_1 b_2\rangle + |b_1 a_2\rangle\,\big]\,|1_\lambda\rangle \quad\text{(symmetric, bright)},`}</EqBlock>
        <EqBlock label="11">{String.raw`|1'\rangle = 2^{-1/2}\big[\,|a_1 b_2\rangle - |b_1 a_2\rangle\,\big]\,|1_\lambda\rangle \quad\text{(antisymmetric, dark)},`}</EqBlock>
        <EqBlock label="12">{String.raw`|2\rangle = |a_1 a_2\rangle\,|0_\lambda\rangle.`}</EqBlock>
        <p>
          Compute the couplings of the collective operator <Tex>{String.raw`(\sigma_1+\sigma_2)a^\dagger`}</Tex> between
          rungs. The symmetric ones are enhanced; the antisymmetric ones are zero:
        </p>
        <EqBlock label="13">{String.raw`\langle 1|(\sigma_1 + \sigma_2)a^\dagger|2\rangle = 2^{1/2},`}</EqBlock>
        <EqBlock label="14">{String.raw`\langle 1'|(\sigma_1 + \sigma_2)a^\dagger|2\rangle = 0,`}</EqBlock>
        <EqBlock label="15">{String.raw`\langle 0|(\sigma_1 + \sigma_2)a^\dagger|1\rangle = 2,`}</EqBlock>
        <EqBlock label="16">{String.raw`\langle 0|(\sigma_1 + \sigma_2)a^\dagger|1'\rangle = 0.`}</EqBlock>
        <p>
          The pattern is unmistakable: transitions only connect states of the <em>same</em> symmetry, and the symmetric
          ladder couples more strongly the more atoms participate. Now repeat for three atoms. The atomic part of the
          collective interaction is
        </p>
        <EqBlock label="17">{String.raw`\mathscr{V}_{\text{atom}} = \sigma_1 + \sigma_2 + \sigma_3,`}</EqBlock>
        <p>
          and each three-atom symmetric state is the normalized sum over its{" "}
          <Tex>{String.raw`3^{1/2}`}</Tex>-weighted arrangements. Counting the surviving overlaps:
        </p>
        <KeyResult
          number="18"
          eq={String.raw`\langle 1|\mathscr{V}_{\text{atom}}|2\rangle = \tfrac{1}{3}\,(\langle bba| + \langle bab| + \langle abb|)\,(\sigma_1+\sigma_2+\sigma_3)\,(|aab\rangle + |aba\rangle + |baa\rangle) = \tfrac{1}{3}(2\times 3) = 2.`}
          label="Three-atom symmetric matrix element"
          note={
            <>
              Its <strong>square is 4</strong>, already larger than the number of atoms{" "}
              <Tex>{String.raw`N=3`}</Tex>. The collective emission rate, <Tex>{String.raw`\propto`}</Tex> the square of
              the matrix element, already beats the independent-atom estimate — the hallmark of superradiance.
            </>
          }
        />
        <Derivation title="Build the basis and watch the dark state emerge">
          <Step title="Symmetric and antisymmetric combinations">
            From the four two-atom product states, group by exchange symmetry: the symmetric ladder{" "}
            <Tex>{String.raw`|0\rangle,|1\rangle,|2\rangle`}</Tex> (Eqs. 9, 10, 12) and the lone antisymmetric{" "}
            <Tex>{String.raw`|1'\rangle`}</Tex> (Eq. 11). Normalize the single-excitation combinations with{" "}
            <Tex>{String.raw`2^{-1/2}`}</Tex>.
          </Step>
          <Step title="Compute the matrix elements">
            Apply <Tex>{String.raw`(\sigma_1+\sigma_2)a^\dagger`}</Tex> between rungs. Symmetric-to-symmetric gives{" "}
            <Tex>{String.raw`\sqrt{2}`}</Tex> (Eq. 13) and <Tex>{String.raw`2`}</Tex> (Eq. 15); anything touching{" "}
            <Tex>{String.raw`|1'\rangle`}</Tex> gives <Tex>{String.raw`0`}</Tex> (Eqs. 14, 16). Conclude: only symmetric
            states radiate; the antisymmetric state is dark.
          </Step>
          <Step title="Three-atom counting: rate exceeds N">
            Write each three-atom symmetric state as <Tex>{String.raw`3^{-1/2}`}</Tex> times the sum of its 3
            arrangements. Acting with <Tex>{String.raw`\sigma_1+\sigma_2+\sigma_3`}</Tex>, each term lowers one specific
            atom and only matching arrangements overlap. The bookkeeping gives{" "}
            <Tex>{String.raw`\tfrac{1}{3}(2\times3)=2`}</Tex> (Eq. 18); its square <Tex>{String.raw`4 > 3 = N`}</Tex>.
          </Step>
        </Derivation>
        <Callout kind="warning" title="Two meanings of the ket label">
          In Eqs. (9)–(12) the ket number labels the number of <strong>excited atoms</strong> in the symmetric state
          (<Tex>{String.raw`|2\rangle`}</Tex> = both up, zero photons). Photons and atoms always trade off so total
          excitation is conserved. Do <em>not</em> confuse this with the photon-number label{" "}
          <Tex>{String.raw`|n_\lambda\rangle`}</Tex> that appears inside the products.
        </Callout>
        <Callout kind="insight" title="Helium 2s metastability is structurally analogous">
          The long-lived <Tex>{String.raw`2s`}</Tex> states of helium offer a structurally analogous picture: a symmetric
          dipole operator <Tex>{String.raw`\propto (\mathbf{r}_1 + \mathbf{r}_2)`}</Tex> cannot connect a symmetric ground
          configuration to a spatially-<em>antisymmetric</em> excited state — the same algebra that makes Eq. (14) vanish.
          But the actual <Tex>{String.raw`2s`}</Tex> metastability is overdetermined by ordinary single-particle selection
          rules: the <Tex>{String.raw`2s \to 1s`}</Tex> transition is E1-forbidden by{" "}
          <Tex>{String.raw`\Delta l = 0`}</Tex> (<Tex>{String.raw`s \to s`}</Tex>) regardless of exchange symmetry, and for
          ortho-helium (<Tex>{String.raw`2\,^3\!S`}</Tex>) the dominant suppression is the spin/intercombination rule{" "}
          <Tex>{String.raw`\Delta S = 0`}</Tex> (triplet&ndash;singlet forbidden). So treat this as an analogy, not an
          identity: the lifetime is set by those selection rules, not solely by the Dicke-type exchange argument.
        </Callout>
      </Section>

      <Section title="N atoms, the Dicke ladder, and the N² result">
        <Intuition>
          Generalize to <Tex>{String.raw`N`}</Tex> atoms. Build the symmetric states by starting in the ground state and
          applying the field repeatedly; each rung <Tex>{String.raw`|n_a\rangle`}</Tex> is the normalized symmetric sum
          over <em>all</em> distinct arrangements of <Tex>{String.raw`n_a`}</Tex> excited atoms among{" "}
          <Tex>{String.raw`N`}</Tex>. Then compute the collective matrix element connecting rung{" "}
          <Tex>{String.raw`|n_a\rangle`}</Tex> down to <Tex>{String.raw`|n_a-1\rangle`}</Tex>. The combinatorics collapses
          to a beautifully simple master formula — and at half excitation its square is{" "}
          <Tex>{String.raw`\sim N^2/4`}</Tex>.
        </Intuition>
        <p>The collective atomic operator and the symmetric rung are</p>
        <EqBlock label="19">{String.raw`\mathscr{V}_{\text{atom}} = \sum_{i=1}^{N} \sigma_i,`}</EqBlock>
        <EqBlock label="20">{String.raw`|n_a\rangle \equiv \Big[\tfrac{N!}{n_a!\,n_b!}\Big]^{-1/2} \sum_{\text{perm}} |\,\underbrace{a\cdots a}_{n_a}\,\underbrace{b\cdots b}_{n_b}\,\rangle,`}</EqBlock>
        <p>
          the prefactor normalizing the sum over all{" "}
          <Tex>{String.raw`N!/(n_a!\,n_b!)`}</Tex> distinct arrangements (so{" "}
          <Tex>{String.raw`|N\rangle = |a\cdots a\rangle`}</Tex>, <Tex>{String.raw`|0\rangle = |b\cdots b\rangle`}</Tex>).
          Total atom number is conserved,
        </p>
        <EqBlock label="21">{String.raw`N = n_a + n_b.`}</EqBlock>
        <p>The matrix element connecting adjacent symmetric rungs is the object whose square sets the rate:</p>
        <EqBlock label="22">{String.raw`\langle n_a - 1|\mathscr{V}_{\text{atom}}|n_a\rangle = \langle n_a - 1|\sum_{i=1}^{N}\sigma_i|n_a\rangle.`}</EqBlock>
        <p>
          A single term (the <Tex>{String.raw`i`}</Tex>-th atom) contributes the product of the two rung normalizations
          times the count of arrangements in which atom <Tex>{String.raw`i`}</Tex> is excited and whose lowered ket
          overlaps <Tex>{String.raw`|n_a-1\rangle`}</Tex>:
        </p>
        <EqBlock label="23">{String.raw`\langle n_a - 1|\sigma_i|n_a\rangle = \Big[\tfrac{N!}{(n_a-1)!(n_b+1)!}\,\tfrac{N!}{n_a!\,n_b!}\Big]^{-1/2}\,\Big[\tfrac{(N-1)!}{(n_a-1)!\,n_b!}\Big].`}</EqBlock>
        <p>
          All <Tex>{String.raw`N`}</Tex> terms contribute equally, so the full element is{" "}
          <Tex>{String.raw`N`}</Tex> times Eq. (23). Simplifying the factorials collapses everything to the master
          result:
        </p>
        <KeyResult
          number="24"
          eq={String.raw`\langle n_a - 1|\mathscr{V}_{\text{atom}}|n_a\rangle = \big[\,n_a(n_b+1)\,\big]^{1/2}.`}
          label="Collective de-excitation matrix element (Dicke master formula)"
          note={
            <>
              Structurally identical to the bosonic / spin lowering-operator element. Quick check for{" "}
              <Tex>{String.raw`N=2,\,n_a=n_b=1`}</Tex>: <Tex>{String.raw`[1\cdot(1+1)]^{1/2}=\sqrt{2}`}</Tex>, matching
              Eq. (13). At half excitation <Tex>{String.raw`n_a=n_b=N/2`}</Tex>, the square is{" "}
              <Tex>{String.raw`(N/2)(N/2+1)\sim N^2/4`}</Tex>.
            </>
          }
        />
        <Derivation title="Combinatorial route to the master formula">
          <Step title="Construct the ladder by repeated excitation">
            Start in <Tex>{String.raw`|0\rangle = |b\cdots b\rangle`}</Tex> and apply the symmetric coupling{" "}
            <Tex>{String.raw`\sum_i \sigma_i`}</Tex> (Eq. 19). Because the sum is symmetric, it only ever produces
            symmetric superpositions — rung <Tex>{String.raw`|n_a\rangle`}</Tex> (Eq. 20), the normalized sum over the{" "}
            <Tex>{String.raw`N!/(n_a!\,n_b!)`}</Tex> arrangements. Conservation gives Eq. (21).
          </Step>
          <Step title="Count surviving overlaps for one atom">
            The term <Tex>{String.raw`\sigma_i`}</Tex> lowers atom <Tex>{String.raw`i`}</Tex>; it gives zero unless atom{" "}
            <Tex>{String.raw`i`}</Tex> is excited. There are{" "}
            <Tex>{String.raw`(N-1)!/[(n_a-1)!\,n_b!]`}</Tex> such arrangements, each lowered ket overlapping exactly one
            bra of <Tex>{String.raw`|n_a-1\rangle`}</Tex>. With the two rung normalizations this is Eq. (23).
          </Step>
          <Step title="Sum over atoms and simplify">
            All <Tex>{String.raw`N`}</Tex> terms are equal, so Eq. (22) <Tex>{String.raw`= N\times`}</Tex> Eq. (23).
            Cancelling factorials collapses everything to <Tex>{String.raw`[n_a(n_b+1)]^{1/2}`}</Tex> (Eq. 24).
          </Step>
          <Step title="Extract the N² scaling">
            Put <Tex>{String.raw`n_a=n_b=N/2`}</Tex>: the matrix element is{" "}
            <Tex>{String.raw`[(N/2)(N/2+1)]^{1/2}`}</Tex>. The emission probability is the square, hence{" "}
            <Tex>{String.raw`\sim N^2/4`}</Tex>. Physically the polarization (macroscopic dipole) scales as{" "}
            <Tex>{String.raw`N`}</Tex>, the field amplitude tracks the polarization, and the intensity is the amplitude
            squared — so the rate goes as <Tex>{String.raw`N^2`}</Tex>. The decay is hugely accelerated, the collective
            lifetime correspondingly shortened. <em>That</em> is superradiance.
          </Step>
        </Derivation>
        <Callout kind="insight" title="Why this looks like stimulated emission">
          <Tex>{String.raw`[n_a(n_b+1)]^{1/2}`}</Tex> has the same form as the bosonic emission factor{" "}
          <Tex>{String.raw`\sqrt{n+1}`}</Tex> for <Tex>{String.raw`n`}</Tex> photons. Here the role of &ldquo;photons
          already present&rdquo; is played by atoms already in the lower state (<Tex>{String.raw`n_b`}</Tex>): each
          de-excitation is enhanced by the population that has <em>already</em> decayed. Superradiance is spontaneous
          emission that bootstraps itself — like self-seeded stimulated emission.
        </Callout>
      </Section>

      <Section title="The angular-momentum (Dicke spin) picture">
        <Intuition>
          Here is the deep structural insight: the symmetric <Tex>{String.raw`N`}</Tex>-atom states are{" "}
          <em>formally identical</em> to the states of a single angular momentum — a giant spin of magnitude{" "}
          <Tex>{String.raw`r = N/2`}</Tex>, with magnetic sublevel <Tex>{String.raw`m=(n_a-n_b)/2`}</Tex>. The fully
          excited state is the north pole <Tex>{String.raw`m=+r`}</Tex>, the ground state the south pole{" "}
          <Tex>{String.raw`m=-r`}</Tex>, and the collective lowering operator is just the spin lowering operator. The less
          symmetric (smaller-<Tex>{String.raw`r`}</Tex>) representations are the multi-atom generalization of the dark
          antisymmetric state.
        </Intuition>
        <p>Define the cooperation number and magnetic sublevel:</p>
        <EqBlock label="25">{String.raw`r = \tfrac{1}{2}N,`}</EqBlock>
        <EqBlock label="26">{String.raw`m = \tfrac{1}{2}(n_a - n_b),`}</EqBlock>
        <p>
          so <Tex>{String.raw`m`}</Tex> runs over the <Tex>{String.raw`2r+1 = N+1`}</Tex> values from{" "}
          <Tex>{String.raw`-N/2`}</Tex> to <Tex>{String.raw`+N/2`}</Tex>. The inverse relations let you swap between the
          population and spin pictures:
        </p>
        <EqBlock label="27">{String.raw`n_a = r + m, \qquad n_b = r - m.`}</EqBlock>
        <p>
          The collective lowering operator is just the spin lowering operator{" "}
          <Tex>{String.raw`R = \mathscr{V}_{\text{atom}} = \sum_i \sigma_i`}</Tex> (the single-atom{" "}
          <Tex>{String.raw`\sigma_i = |b_i\rangle\langle a_i|`}</Tex> <em>is</em> the spin-
          <Tex>{String.raw`\tfrac12`}</Tex> lowering operator <Tex>{String.raw`S_-`}</Tex>, matrix element{" "}
          <Tex>{String.raw`1`}</Tex>; it is the Pauli operator <Tex>{String.raw`\sigma^- = \sigma_x - i\sigma_y = 2S_-`}</Tex>{" "}
          that carries the extra factor of two). Its standard angular-momentum matrix element is therefore:
        </p>
        <KeyResult
          number="28"
          eq={String.raw`\langle r, m-1|R|r m\rangle = \big[(r+m)(r-m+1)\big]^{1/2}.`}
          label="Angular-momentum lowering-operator element"
          note={
            <>
              Substituting Eq. (27), <Tex>{String.raw`(r+m)(r-m+1) = n_a(n_b+1)`}</Tex>, so this <em>equals</em> Eq. (24)
              exactly. The two derivations — combinatorial counting and angular-momentum algebra — give the very same
              matrix element, computed two ways.
            </>
          }
        />
        <Callout kind="insight" title="Eq. (24) and Eq. (28) are identical">
          Eq. (24) gives <Tex>{String.raw`[n_a(n_b+1)]^{1/2}`}</Tex>; Eq. (28) gives{" "}
          <Tex>{String.raw`[(r+m)(r-m+1)]^{1/2}`}</Tex>, and by Eq. (27) the bracketed quantities are <em>equal</em>,{" "}
          <Tex>{String.raw`(r+m)(r-m+1) = n_a(n_b+1)`}</Tex>. So the two formulas are the <strong>same</strong> matrix
          element computed two ways — there is no factor of <Tex>{String.raw`\tfrac12`}</Tex> between them. The key fact:{" "}
          <Tex>{String.raw`R = \mathscr{V}_{\text{atom}} = \sum_i \sigma_i = J_-`}</Tex>, because the single-atom{" "}
          <Tex>{String.raw`\sigma_i = |b_i\rangle\langle a_i|`}</Tex> already <em>is</em> the spin-
          <Tex>{String.raw`\tfrac12`}</Tex> lowering operator <Tex>{String.raw`S_-`}</Tex>. (It is the Pauli{" "}
          <Tex>{String.raw`\sigma^- = \sigma_x - i\sigma_y`}</Tex>, with matrix element <Tex>{String.raw`2`}</Tex>, that
          equals <Tex>{String.raw`2S_-`}</Tex> — not <Tex>{String.raw`\sigma_i`}</Tex> itself.)
        </Callout>
        <p>
          The general <Tex>{String.raw`N`}</Tex>-atom system also contains less-symmetric{" "}
          <Tex>{String.raw`(r < N/2)`}</Tex> representations. Counting the independent states at fixed{" "}
          <Tex>{String.raw`m`}</Tex> with a particular total spin <Tex>{String.raw`r`}</Tex> — states with{" "}
          <Tex>{String.raw`m`}</Tex> minus states with <Tex>{String.raw`m+1`}</Tex> — gives the degeneracy:
        </p>
        <KeyResult
          number="29"
          eq={String.raw`\text{Degeneracy} = \frac{N!}{n_a!\,n_b!} - \frac{N!}{(n_a+1)!(n_b-1)!} = \frac{N!\,(2r+1)}{\big(\tfrac{1}{2}N + r + 1\big)!\,\big(\tfrac{1}{2}N - r\big)!}.`}
          label="Degeneracy of each (r, m)"
          note={
            <>
              Using <Tex>{String.raw`n_a = N/2 + r,\ n_b = N/2 - r`}</Tex>. For{" "}
              <Tex>{String.raw`r = N/2`}</Tex> (fully symmetric) the degeneracy is <strong>1</strong> — there is exactly{" "}
              <em>one</em> maximally-cooperative ladder, while smaller-<Tex>{String.raw`r`}</Tex> ladders proliferate as{" "}
              <Tex>{String.raw`N`}</Tex> grows.
            </>
          }
        />
        <Figure
          caption={
            <>
              The Dicke ladder for <Tex>{String.raw`N`}</Tex> atoms (here <Tex>{String.raw`N=6`}</Tex>): rungs labeled by{" "}
              <Tex>{String.raw`m=(n_a-n_b)/2`}</Tex> from the top (<Tex>{String.raw`m=+r`}</Tex>, all excited) to the
              bottom (<Tex>{String.raw`m=-r`}</Tex>, ground). The downward transition rate{" "}
              <Tex>{String.raw`\propto (r+m)(r-m+1)`}</Tex> is fattest at the equator{" "}
              <Tex>{String.raw`m=0`}</Tex> (the <Tex>{String.raw`N^2`}</Tex> burst) and thinnest at the poles. The arrow
              on the right is the equivalent collective spin of length <Tex>{String.raw`r=N/2`}</Tex>.
            </>
          }
        >
          <svg viewBox="0 0 480 260" width="100%" style={{ maxWidth: 480 }}>
            {/* ladder rungs for N=6: m = +3..-3, k = 6..0 */}
            {[
              { k: 6, y: 30, lbl: "m = +3  (all up)", w: 6 },
              { k: 5, y: 65, lbl: "m = +2", w: 11 },
              { k: 4, y: 100, lbl: "m = +1", w: 15 },
              { k: 3, y: 135, lbl: "m = 0  (peak burst)", w: 12, hot: true },
              { k: 2, y: 170, lbl: "m = −1", w: 15 },
              { k: 1, y: 205, lbl: "m = −2", w: 11 },
              { k: 0, y: 240, lbl: "m = −3  (ground)", w: 6 },
            ].map((row) => (
              <g key={row.k}>
                <line
                  x1="120"
                  y1={row.y}
                  x2="220"
                  y2={row.y}
                  stroke={row.hot ? "#f59e0b" : "#334155"}
                  strokeWidth={row.hot ? "3" : "2"}
                />
                <text x="112" y={row.y + 4} fontSize="11" fill="#475569" textAnchor="end">
                  {row.lbl}
                </text>
              </g>
            ))}
            {/* downward transition arrows, thickness ∝ rate (r+m)(r-m+1) */}
            {[
              { y1: 30, y2: 65, w: 1.5 }, // 6→5: 6·1=6
              { y1: 65, y2: 100, w: 2.6 }, // 5→4: 5·2=10
              { y1: 100, y2: 135, w: 3.2 }, // 4→3: 4·3=12
              { y1: 135, y2: 170, w: 3.2 }, // 3→2: 3·4=12
              { y1: 170, y2: 205, w: 2.6 }, // 2→1: 2·5=10
              { y1: 205, y2: 240, w: 1.5 }, // 1→0: 1·6=6
            ].map((a, i) => (
              <line
                key={i}
                x1="240"
                y1={a.y1 + 4}
                x2="240"
                y2={a.y2 - 6}
                stroke="#e11d48"
                strokeWidth={a.w}
                markerEnd="url(#arr)"
                opacity="0.8"
              />
            ))}
            <text x="252" y="138" fontSize="11" fill="#e11d48">
              rate ∝ (r+m)(r−m+1)
            </text>
            {/* collective spin sphere on the right */}
            <circle cx="400" cy="135" r="55" fill="none" stroke="#cbd5e1" strokeWidth="1.4" />
            <ellipse cx="400" cy="135" rx="55" ry="18" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="400" y1="135" x2="437" y2="94" stroke="#e11d48" strokeWidth="2.4" markerEnd="url(#arr2)" />
            <text x="400" y="208" fontSize="11" fill="#64748b" textAnchor="middle">
              spin r = N/2
            </text>
            <text x="400" y="84" fontSize="10" fill="#94a3b8" textAnchor="middle">
              m
            </text>
            <defs>
              <marker id="arr" markerWidth="8" markerHeight="8" refX="4" refY="6" orient="auto">
                <path d="M0,0 L4,6 L8,0 Z" fill="#e11d48" />
              </marker>
              <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#e11d48" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <Derivation title="Map atoms to a giant spin, count the degeneracy" defaultOpen={false}>
          <Step title="Identify the ladder with one angular momentum">
            Map the symmetric ladder onto a single angular momentum <Tex>{String.raw`r = N/2`}</Tex> (Eq. 25), labeled by{" "}
            <Tex>{String.raw`m=(n_a-n_b)/2`}</Tex> (Eq. 26). The top rung is <Tex>{String.raw`m=+r`}</Tex>, the bottom{" "}
            <Tex>{String.raw`m=-r`}</Tex>; invert to <Tex>{String.raw`n_a=r+m,\ n_b=r-m`}</Tex> (Eq. 27). A spin-
            <Tex>{String.raw`r`}</Tex> system is equivalent to <Tex>{String.raw`N`}</Tex> spin-
            <Tex>{String.raw`\tfrac12`}</Tex> systems.
          </Step>
          <Step title="Match the spin element to the master formula">
            The spin lowering element is{" "}
            <Tex>{String.raw`\langle r,m-1|R|rm\rangle = [(r+m)(r-m+1)]^{1/2}`}</Tex> (Eq. 28). Because{" "}
            <Tex>{String.raw`R = \mathscr{V}_{\text{atom}} = \sum_i \sigma_i`}</Tex> (the single-atom{" "}
            <Tex>{String.raw`\sigma_i`}</Tex> <em>is</em> the spin-<Tex>{String.raw`\tfrac12`}</Tex> lowering operator{" "}
            <Tex>{String.raw`S_-`}</Tex>, not twice it), this equals Eq. (24) exactly, since{" "}
            <Tex>{String.raw`(r+m)(r-m+1) = n_a(n_b+1)`}</Tex>.
          </Step>
          <Step title="Count the degeneracy of each (r, m)">
            The number of states at fixed <Tex>{String.raw`m`}</Tex> with total spin exactly <Tex>{String.raw`r`}</Tex>{" "}
            equals (states with magnetic number <Tex>{String.raw`m`}</Tex>) minus (states with{" "}
            <Tex>{String.raw`m+1`}</Tex>). The binomial difference simplifies to Eq. (29). For{" "}
            <Tex>{String.raw`r=N/2`}</Tex> it gives 1 — the superradiant ladder is unique and nondegenerate.
          </Step>
        </Derivation>
        <Callout kind="insight" title="The Bloch-sphere mental model">
          Picture the collective state as an arrow of length <Tex>{String.raw`r=N/2`}</Tex> on a sphere. Fully excited =
          pointing up (<Tex>{String.raw`m=+r`}</Tex>). Emission lowers <Tex>{String.raw`m`}</Tex> one step at a time,
          sweeping the arrow toward the equator (<Tex>{String.raw`m=0`}</Tex>, maximum coherence, fastest radiation) and
          then down to the south pole. The equatorial crossing is where the <Tex>{String.raw`N^2`}</Tex> burst happens.
        </Callout>
      </Section>

      <Section title="Intensity, the superradiant burst, and radiation trapping">
        <Intuition>
          Assemble the collective intensity by multiplying the single-atom rate <Tex>{String.raw`I_0`}</Tex> by the square
          of the lowering matrix element, <Tex>{String.raw`(r+m)(r-m+1)`}</Tex>. At the <em>top</em> of the ladder the
          atoms have not yet phased up, so the intensity is just <Tex>{String.raw`N I_0`}</Tex> — exactly the ordinary
          incoherent result. At the <em>middle</em>, fully phased, it is <Tex>{String.raw`\sim (N^2/4)I_0`}</Tex>. The
          flip side is radiation trapping: a lone excitation dropped into a crowd is almost surely <em>dark</em>.
        </Intuition>
        <p>The single-atom spontaneous-emission intensity, from Weisskopf-Wigner theory:</p>
        <KeyResult
          number="30"
          eq={String.raw`I_0 = \frac{2\pi\,\sigma(\omega)\,\wp^2}{\hbar}.`}
          label="Single-atom intensity I₀ (Weisskopf–Wigner)"
          note={
            <>
              <Tex>{String.raw`\sigma(\omega)`}</Tex> is the field-mode density / lineshape at frequency{" "}
              <Tex>{String.raw`\omega`}</Tex>, <Tex>{String.raw`\wp`}</Tex> the atomic dipole matrix element. This sets the
              unit for all collective intensities.
            </>
          }
        />
        <Callout kind="warning" title="σ(ω) is NOT the lowering operator σᵢ">
          In Eq. (30) the symbol <Tex>{String.raw`\sigma(\omega)`}</Tex> is a field-mode density-of-states (lineshape)
          function. It has <em>nothing</em> to do with the atomic lowering operator{" "}
          <Tex>{String.raw`\sigma_i = |b\rangle\langle a|`}</Tex> used everywhere from Eq. (3) through Eq. (24). Same Greek
          letter, completely different object. And <Tex>{String.raw`\wp`}</Tex> (script-p) is the dipole matrix element,
          not a probability.
        </Callout>
        <p>
          Now read the intensity <Tex>{String.raw`I = I_0\,(r+m)(r-m+1)`}</Tex> at the two informative rungs. At the top{" "}
          <Tex>{String.raw`m = r = N/2`}</Tex> (fully inverted):
        </p>
        <KeyResult
          number="31"
          eq={String.raw`I = I_0\,(\tfrac{1}{2}N + \tfrac{1}{2}N)\,(\tfrac{1}{2}N - \tfrac{1}{2}N + 1) = N\,I_0.`}
          label="Top-of-ladder intensity (ordinary result)"
          note={
            <>
              At full inversion the atoms have not yet phased up, so there is no enhancement — just the ordinary
              incoherent <Tex>{String.raw`N I_0`}</Tex> of single-atom theory.
            </>
          }
        />
        <p>At the equator <Tex>{String.raw`m=0`}</Tex> (half excited, maximum coherence):</p>
        <KeyResult
          number="32"
          eq={String.raw`I = I_0\,\tfrac{1}{2}N\Big(\tfrac{1}{2}N + 1\Big) \;\sim\; \tfrac{1}{4}N^2 I_0.`}
          label="Superradiant burst intensity at maximum coherence"
          note={
            <>
              Scaling as <Tex>{String.raw`N^2`}</Tex>, not <Tex>{String.raw`N`}</Tex> — the defining signature of
              superradiance, and dramatically larger than the <Tex>{String.raw`N I_0`}</Tex> that single-atom
              Weisskopf-Wigner theory ever predicts.
            </>
          }
        />
        <p>
          The contrast between Eqs. (31) and (32) is the whole point of the appendix. But there is a dark counterpart.
          Drop a <em>single</em> excitation into <Tex>{String.raw`N`}</Tex> ground-state atoms. There are{" "}
          <Tex>{String.raw`N`}</Tex> orthogonal single-excitation states, of which exactly one is the fully symmetric
          (radiating) state — so the probability of landing in it is <Tex>{String.raw`1/N`}</Tex>. The rest are dark:
        </p>
        <KeyResult
          number="—"
          eq={String.raw`P_{\text{trapped}} = 1 - N^{-1} \;\longrightarrow\; 1 \quad (N \to \infty).`}
          label="Radiation trapping (the dark-state counterpoint)"
          note={
            <>
              In a large ensemble a lone excitation is almost certainly stuck in a non-radiating (antisymmetric /
              less-symmetric) state — the multi-atom analog of <Tex>{String.raw`|1'\rangle`}</Tex>. Superradiance and
              radiation trapping are two faces of the same permutation symmetry.
            </>
          }
        />
        <Derivation title="Assemble the intensity and derive trapping">
          <Step title="Intensity from I₀ and the matrix-element square">
            The collective intensity is <Tex>{String.raw`I_0`}</Tex> times the square of the lowering element, i.e.{" "}
            <Tex>{String.raw`I = I_0\,(r+m)(r-m+1)`}</Tex> — the intensity of the{" "}
            <Tex>{String.raw`m \to m-1`}</Tex> transition of the giant spin.
          </Step>
          <Step title="Evaluate at the two informative rungs">
            At <Tex>{String.raw`m = r = N/2`}</Tex>: <Tex>{String.raw`(r+m)(r-m+1) = (N)(1)`}</Tex>, so{" "}
            <Tex>{String.raw`I = N I_0`}</Tex> (Eq. 31). At <Tex>{String.raw`m=0`}</Tex>:{" "}
            <Tex>{String.raw`(r)(r+1) = (N/2)(N/2+1)`}</Tex>, so <Tex>{String.raw`I = I_0 (N/2)(N/2+1)\sim N^2/4\,I_0`}</Tex>{" "}
            (Eq. 32).
          </Step>
          <Step title="Radiation trapping by state counting">
            One excitation in <Tex>{String.raw`N`}</Tex> atoms occupies one of <Tex>{String.raw`N`}</Tex> orthogonal
            single-excitation states; exactly one is fully symmetric (radiating). So the probability of radiating is{" "}
            <Tex>{String.raw`1/N`}</Tex> and <Tex>{String.raw`P_{\text{trapped}} = 1 - 1/N \to 1`}</Tex> as{" "}
            <Tex>{String.raw`N \to \infty`}</Tex>.
          </Step>
        </Derivation>

        <SimFrame
          title="The Dicke-ladder cascade"
          caption={
            <>
              Start with all <Tex>{String.raw`N`}</Tex> atoms excited (top rung) and watch the emission begin at the
              ordinary single-atom rate, accelerate as the dipoles phase up, peak sharply near the half-excited rung, then
              fade. The dashed grey trace is <Tex>{String.raw`N`}</Tex> independent atoms — a plain decaying exponential
              peaking at <Tex>{String.raw`N`}</Tex>. The cascade evolves the rung populations{" "}
              <Tex>{String.raw`P_m(t)`}</Tex> via{" "}
              <Tex>{String.raw`dP_m/dt = -W(m)P_m + W(m{+}1)P_{m+1}`}</Tex> with{" "}
              <Tex>{String.raw`W(m) \propto (r+m)(r-m+1)`}</Tex> — the chapter&rsquo;s own rate (Eq. 24/28 squared).
            </>
          }
          tryThis={
            <>
              Set <Tex>{String.raw`m_0=1`}</Tex> (full inversion) and check the burst peak grows as{" "}
              <Tex>{String.raw`N^2`}</Tex> while the independent reference stays pinned at <Tex>{String.raw`N`}</Tex> —
              the readout <Tex>{String.raw`I_{\text{peak}}/I_{\text{indep}}`}</Tex> climbs roughly as{" "}
              <Tex>{String.raw`N/4`}</Tex>. The exact endpoints are anchored: <Tex>{String.raw`I(0)/I_0 = N`}</Tex>{" "}
              (Eq. 31) and the single-rung value <Tex>{String.raw`\tfrac12 N(\tfrac12 N+1)`}</Tex> (Eq. 32). Watch{" "}
              <Tex>{String.raw`\int R\,dt`}</Tex> equal <Tex>{String.raw`n_a(0)`}</Tex> — every excited atom emits exactly
              one photon. Now slide <Tex>{String.raw`m_0`}</Tex> toward 0: you start at (or past) the peak rung, so the
              intensity only decays — the delayed, accelerating burst shape is gone. Drag <Tex>{String.raw`m_0`}</Tex>{" "}
              negative and the <em>total</em> emitted energy shrinks (it is just <Tex>{String.raw`\int R\,dt = n_a(0)`}</Tex>,
              fewer excited atoms), yet the per-emission collective enhancement does <em>not</em> die: near{" "}
              <Tex>{String.raw`m_0 \approx -r`}</Tex> a single shared excitation still radiates at rate{" "}
              <Tex>{String.raw`\sim N`}</Tex> (single-photon superradiance), so{" "}
              <Tex>{String.raw`I_{\text{peak}}/I_{\text{indep}}`}</Tex> stays large. The delayed{" "}
              <Tex>{String.raw`N^2`}</Tex> burst <em>shape</em> — and the largest total energy — is what requires{" "}
              <em>preparing</em> high inversion.
            </>
          }
        >
          <AppGSim />
        </SimFrame>

        <Callout kind="insight" title="Two faces of one symmetry">
          Superradiance (Eq. 32, bright, <Tex>{String.raw`N^2`}</Tex>) and radiation trapping ({" "}
          <Tex>{String.raw`1 - 1/N`}</Tex>, dark) both come from sorting states by permutation symmetry. The single
          fully-symmetric ladder radiates cooperatively; the many less-symmetric states are dark. Large{" "}
          <Tex>{String.raw`N`}</Tex> makes the bright ladder brighter (<Tex>{String.raw`N^2`}</Tex>) but also rarer (
          <Tex>{String.raw`1/N`}</Tex>) — so whether you <em>see</em> superradiance depends entirely on preparing the
          symmetric state, which full inversion accomplishes.
        </Callout>
        <Callout kind="note" title="Why a diagonal rate equation is the right model">
          A Dicke state <Tex>{String.raw`|rm\rangle`}</Tex> has <strong>zero</strong> macroscopic dipole moment (Problem
          G-1 asks you to prove it), exactly as a photon number state <Tex>{String.raw`|n\rangle`}</Tex> has zero mean
          field. The radiating coherence lives in the <em>off-diagonal</em> matrix element between rungs, not in{" "}
          <Tex>{String.raw`\langle\text{dipole}\rangle`}</Tex>. That is why the cascade is faithfully a diagonal
          master equation over the rung populations — the standard Dicke extension (Bonifacio, Kim &amp; Scully 1969) the
          appendix points to in words.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="The ideas you keep">
          <ul>
            <li>
              The collective de-excitation matrix element{" "}
              <Tex>{String.raw`[n_a(n_b+1)]^{1/2}`}</Tex> (Eq. 24) is the workhorse: its{" "}
              <Tex>{String.raw`(n_b+1)`}</Tex> factor is the multi-atom analog of the bosonic{" "}
              <Tex>{String.raw`\sqrt{n+1}`}</Tex> emission enhancement. Recognize this structure whenever cooperative or
              stimulated emission appears.
            </li>
            <li>
              Dicke states <Tex>{String.raw`|r,m\rangle`}</Tex> behave like a single giant spin{" "}
              <Tex>{String.raw`r=N/2`}</Tex> with <Tex>{String.raw`m=(n_a-n_b)/2`}</Tex>. The Bloch-sphere mapping
              (Eqs. 25–28) lets you reuse all of spin-<Tex>{String.raw`\tfrac12`}</Tex> algebra — remember{" "}
              <Tex>{String.raw`R = \mathscr{V}_{\text{atom}} = \sum_i \sigma_i = J_-`}</Tex> (the single-atom{" "}
              <Tex>{String.raw`\sigma_i`}</Tex> is exactly <Tex>{String.raw`S_-`}</Tex>), so Eqs. (24) and (28) are the
              same matrix element — no factor of <Tex>{String.raw`\tfrac12`}</Tex>.
            </li>
            <li>
              Only the fully <strong>symmetric</strong> states radiate cooperatively; antisymmetric / lower-
              <Tex>{String.raw`r`}</Tex> states are <strong>dark</strong> and trap radiation. Whether you observe
              superradiance (<Tex>{String.raw`N^2`}</Tex>) or trapping (<Tex>{String.raw`1-1/N`}</Tex>) is decided
              entirely by how you <em>prepare</em> the ensemble.
            </li>
            <li>
              The <Tex>{String.raw`N`}</Tex> vs <Tex>{String.raw`N^2`}</Tex> distinction: incoherent emission scales as{" "}
              <Tex>{String.raw`N`}</Tex>; phase-aligned cooperative emission scales as <Tex>{String.raw`N^2`}</Tex> at{" "}
              <Tex>{String.raw`m=0`}</Tex>. The enhancement implies a shortened collective lifetime{" "}
              <Tex>{String.raw`\sim T_1/N`}</Tex> and a delayed, narrowed burst.
            </li>
            <li>
              Watch for symbol collisions: <Tex>{String.raw`\sigma_i = |b\rangle\langle a|`}</Tex> is the atomic lowering
              operator (Eqs. 3–24), but <Tex>{String.raw`\sigma(\omega)`}</Tex> in Eq. (30) is a field-mode density;{" "}
              <Tex>{String.raw`\wp`}</Tex> is the dipole matrix element; <Tex>{String.raw`g_\lambda`}</Tex> the coupling;{" "}
              <Tex>{String.raw`\nu_\lambda`}</Tex> the mode frequency vs <Tex>{String.raw`\omega`}</Tex> the atomic
              frequency.
            </li>
            <li>
              Superradiance is the conceptual bridge from single-atom Weisskopf-Wigner spontaneous decay (which gives only{" "}
              <Tex>{String.raw`N I_0`}</Tex>) to genuinely collective light-matter dynamics — underlying cooperative
              emission, superfluorescence, and modern cavity-QED and ensemble-based quantum optics.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
