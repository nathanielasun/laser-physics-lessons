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
  SimFrame,
} from "@/components/lesson";
import Ch06Sim from "@/components/sims/ch06";

export default function Page() {
  return (
    <Lesson slug="ch06">
      <Lede>
        Everything you can ever know about a quantum system lives in one abstract object: the state vector{" "}
        <Tex>{String.raw`|\psi\rangle`}</Tex>. It is not the wave function, not a list of energies — those are merely
        its <em>shadows</em>, the projections <Tex>{String.raw`\langle k|\psi\rangle`}</Tex> cast onto whatever basis
        you happen to choose, exactly the way an arrow <Tex>{String.raw`\mathbf v`}</Tex> has different component-lists
        in different axes but is one arrow in space. This chapter builds the linear-algebra machinery — kets, bras,
        completeness, operators-as-matrices, Hermiticity — and then cashes it in for the engine of the whole book:
        a coherent two-level superposition whose dipole <Tex>{String.raw`\langle e\,\mathbf r\rangle`}</Tex> oscillates
        at the optical transition frequency. That tiny sloshing dipole is the antenna that radiates the laser&rsquo;s
        light.
      </Lede>

      <Section title="Dirac notation: the state as an abstract vector">
        <Intuition>
          Start with something familiar: an arrow <Tex>{String.raw`\mathbf v`}</Tex> in the plane. You can write it as{" "}
          <Tex>{String.raw`\mathbf v = v_x\hat x + v_y\hat y`}</Tex>, but the arrow exists <em>before</em> you choose
          axes — the numbers <Tex>{String.raw`(v_x,v_y)`}</Tex> are just its projections onto the unit vectors you
          picked. Dirac&rsquo;s insight is to treat a quantum state the same way:{" "}
          <Tex>{String.raw`|\psi\rangle`}</Tex> is the arrow, and the complex numbers you usually call &ldquo;the wave
          function&rdquo; are its projections <Tex>{String.raw`\langle k|\psi\rangle`}</Tex> onto a chosen basis. A{" "}
          <strong>ket</strong> <Tex>{String.raw`|\psi\rangle`}</Tex> is the vector; a <strong>bra</strong>{" "}
          <Tex>{String.raw`\langle\varphi|`}</Tex> is a recipe that eats a ket and returns the inner product. The whole
          point is representation-independence — we manipulate <Tex>{String.raw`|\psi\rangle`}</Tex> directly and only
          project onto a basis when we want concrete numbers.
        </Intuition>
        <p>
          Resolve an ordinary 2-D vector into orthonormal components — the classical analogy that motivates everything:
        </p>
        <EqBlock>{String.raw`\mathbf{v} = v_x \hat{x} + v_y \hat{y}`}</EqBlock>
        <p>
          Now write the <em>same</em> vector in Dirac notation, with <Tex>{String.raw`|x\rangle,|y\rangle`}</Tex> the
          basis kets:
        </p>
        <EqBlock>{String.raw`|v\rangle = v_x|x\rangle + v_y|y\rangle`}</EqBlock>
        <p>
          A component is the projection (dot product) of the vector onto a basis direction, and the Dirac version
          replaces that dot product with a bracket:
        </p>
        <EqBlock>{String.raw`v_x = \hat{x}\cdot\mathbf{v}, \qquad v_x = \langle x|v\rangle`}</EqBlock>
        <p>
          Summing the projected pieces rebuilds the vector — the seed of completeness — first classically, then in
          Dirac form where the objects <Tex>{String.raw`|x\rangle\langle x|`}</Tex> are projection operators:
        </p>
        <EqBlock>{String.raw`\mathbf{v} = \hat{x}(\hat{x}\cdot\mathbf{v}) + \hat{y}(\hat{y}\cdot\mathbf{v})`}</EqBlock>
        <EqBlock>{String.raw`|v\rangle = |x\rangle\langle x|v\rangle + |y\rangle\langle y|v\rangle`}</EqBlock>
        <p>
          The classical identity dyadic, built from outer products of unit vectors, returns any vector unchanged:
        </p>
        <EqBlock>{String.raw`\mathscr{I} = \hat{x}\hat{x} + \hat{y}\hat{y}, \qquad \mathscr{I}\cdot\mathbf{v} = \hat{x}(\hat{x}\cdot\mathbf{v}) + \hat{y}(\hat{y}\cdot\mathbf{v})`}</EqBlock>
        <p>Its Dirac form is the completeness operator for the 2-D space — the workhorse of the whole chapter:</p>
        <KeyResult
          eq={String.raw`\mathscr{I} = |x\rangle\langle x| + |y\rangle\langle y|`}
          label="Completeness in two dimensions"
        />

        <Derivation title="From dot product to bracket, and read off the identity">
          <Step title="From dot product to bracket">
            Write the arrow in components, recognize each component as a projection{" "}
            <Tex>{String.raw`v_x=\hat x\cdot\mathbf v`}</Tex>, and translate that dot product into the Dirac bracket.
            This single substitution is the entire conceptual move of the section:
            <EqBlock>{String.raw`v_x = \hat{x}\cdot\mathbf{v} \;\longrightarrow\; v_x = \langle x|v\rangle`}</EqBlock>
          </Step>
          <Step title="Reconstruct the vector and read off the identity">
            Substitute the projections back into <Tex>{String.raw`|v\rangle`}</Tex> and factor the basis kets out to
            the left. Because the result holds for <em>any</em> <Tex>{String.raw`|v\rangle`}</Tex>, the parenthesized
            operator must be the identity — that is completeness. Note that{" "}
            <Tex>{String.raw`\langle x|v\rangle`}</Tex> is a number you can move freely, while{" "}
            <Tex>{String.raw`|x\rangle\langle x|`}</Tex> is an operator (an outer product):
            <EqBlock>{String.raw`|v\rangle = \big(|x\rangle\langle x| + |y\rangle\langle y|\big)|v\rangle \;\Rightarrow\; \mathscr{I} = |x\rangle\langle x| + |y\rangle\langle y|`}</EqBlock>
          </Step>
        </Derivation>

        <p>
          One thing has changed fundamentally from real vector algebra: the inner product is now complex, and order
          matters. Swapping bra and ket conjugates the result:
        </p>
        <KeyResult
          eq={String.raw`\langle a|b\rangle = \langle b|a\rangle^{*}`}
          label="The complex inner product"
          note={
            <>
              This is what distinguishes the complex Hilbert space from real vector algebra:{" "}
              <Tex>{String.raw`\langle a|b\rangle`}</Tex> and <Tex>{String.raw`\langle b|a\rangle`}</Tex> are not equal,
              they are complex conjugates.
            </>
          }
        />

        <Callout kind="insight" title="Bra vs ket">
          A ket <Tex>{String.raw`|\psi\rangle`}</Tex> is the vector; a bra <Tex>{String.raw`\langle\varphi|`}</Tex> is a
          linear functional waiting to be fed a ket. &ldquo;Bra-ket&rdquo;{" "}
          <Tex>{String.raw`\langle\varphi|\psi\rangle`}</Tex> literally spells <em>bracket</em>. The bra{" "}
          <Tex>{String.raw`\langle\varphi|`}</Tex> is the adjoint (conjugate-transpose) of the ket{" "}
          <Tex>{String.raw`|\varphi\rangle`}</Tex>.
        </Callout>
        <Callout kind="warning" title="Order matters now">
          Unlike a real dot product, <Tex>{String.raw`\langle a|b\rangle \neq \langle b|a\rangle`}</Tex> in general —
          they are complex conjugates. Always keep the bra on the left and the ket on the right, in the order written.
        </Callout>
      </Section>

      <Section title="Completeness, orthonormality, and discrete bases">
        <Intuition>
          Two dimensions was a warm-up. A real quantum system needs an <Tex>{String.raw`N`}</Tex>-dimensional (often
          infinite) space spanned by a complete orthonormal basis <Tex>{String.raw`\{|\phi_k\rangle\}`}</Tex> — for
          example the energy eigenstates of an atom. <strong>Orthonormal</strong> means the basis vectors are mutually
          perpendicular and unit length (the Kronecker delta). <strong>Complete</strong> means nothing is missing: every
          state can be built from them, which is exactly the statement that the sum of all projectors equals the
          identity. These two facts are the only tools you need to expand any state and to insert resolutions of the
          identity anywhere in a calculation — the single most-used trick in the rest of the book.
        </Intuition>
        <p>
          Classically, a general vector expands in an <Tex>{String.raw`N`}</Tex>-dimensional orthonormal basis whose
          members satisfy the Kronecker-delta orthonormality:
        </p>
        <EqBlock>{String.raw`\mathbf{v} = \sum_k \phi_k(\phi_k\cdot\mathbf{v}), \qquad \phi_k\cdot\phi_j = \delta_{kj} = \begin{cases}1, & k=j\\ 0, & k\neq j\end{cases}`}</EqBlock>
        <p>The Dirac transcription expands any state as a sum of its projections, with orthonormality as a bracket:</p>
        <EqBlock>{String.raw`|v\rangle = \sum_k |k\rangle\langle k|v\rangle, \qquad \langle k|j\rangle = \delta_{kj}`}</EqBlock>
        <p>
          Collecting the projectors gives the completeness (closure) relation — the resolution of the identity.
          Inserting this between any two objects is the chapter&rsquo;s central computational move:
        </p>
        <KeyResult
          eq={String.raw`\mathscr{I} = \sum_k |k\rangle\langle k|`}
          label="Completeness / closure (resolution of identity)"
        />
        <p>
          A ket is its column of amplitudes <Tex>{String.raw`\langle k|\psi\rangle`}</Tex>; the corresponding bra has
          the complex-conjugate amplitudes:
        </p>
        <EqBlock>{String.raw`|\psi\rangle = \sum_k \langle k|\psi\rangle\,|k\rangle, \qquad \langle\psi| = \sum_k \langle\psi|k\rangle\,\langle k|`}</EqBlock>

        <Derivation title="Generalize completeness; the bra is the conjugate row">
          <Step title="Generalize completeness from 2-D to N-D">
            The 2-D identity extends term-by-term to <Tex>{String.raw`N`}</Tex> (or infinitely many) orthonormal kets.
            Acting on <Tex>{String.raw`|\psi\rangle`}</Tex> with <Tex>{String.raw`\sum_k|k\rangle\langle k|`}</Tex>{" "}
            reproduces it because the amplitudes <Tex>{String.raw`\langle k|\psi\rangle`}</Tex> are just its
            coordinates. This single identity is what we will &ldquo;insert&rdquo; everywhere:
            <EqBlock>{String.raw`|\psi\rangle = \mathscr{I}|\psi\rangle = \sum_k |k\rangle\langle k|\psi\rangle`}</EqBlock>
          </Step>
          <Step title="Bra is the conjugate row">
            Taking the adjoint of the ket expansion turns each <Tex>{String.raw`|k\rangle`}</Tex> into{" "}
            <Tex>{String.raw`\langle k|`}</Tex> and conjugates each amplitude. Hence a ket is a column vector of
            amplitudes and the bra is the conjugate-transpose row vector:
            <EqBlock>{String.raw`\langle\psi|k\rangle = \langle k|\psi\rangle^{*}`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="The one trick to remember">
          Whenever a calculation has a gap, drop in <Tex>{String.raw`\sum_k|k\rangle\langle k| = \mathscr{I}`}</Tex>.
          It changes nothing physically but lets you swap into a convenient basis. Nearly every manipulation in the rest
          of the chapter is &ldquo;insert the identity.&rdquo;
        </Callout>
      </Section>

      <Section title="Operators as matrices, Hermiticity, and eigenvalue equations">
        <Intuition>
          An operator <Tex>{String.raw`\mathscr{O}`}</Tex> is a machine that turns one state into another. Once you pick
          a basis, this machine becomes an ordinary matrix whose entries{" "}
          <Tex>{String.raw`\mathscr{O}_{nm}=\langle n|\mathscr{O}|m\rangle`}</Tex> tell you how much of basis vector{" "}
          <Tex>{String.raw`|n\rangle`}</Tex> comes out when you feed in <Tex>{String.raw`|m\rangle`}</Tex>. Kets become
          column vectors, bras become rows, and operator equations become matrix multiplication — quantum mechanics
          literally <em>is</em> linear algebra in a chosen basis. Two structures matter for physics: observables are{" "}
          <strong>Hermitian</strong> (so their measured eigenvalues are real), and the{" "}
          <strong>eigenvalue equation</strong> picks out the special states an operator merely rescales — the natural
          basis for that observable.
        </Intuition>
        <p>An operator maps one ket into another; when it has an inverse, the inverse undoes the mapping:</p>
        <EqBlock>{String.raw`|\zeta\rangle = \mathscr{O}|\xi\rangle`}</EqBlock>
        <EqBlock>{String.raw`\mathscr{O}^{-1}|\zeta\rangle = \mathscr{O}^{-1}\mathscr{O}|\xi\rangle = |\xi\rangle, \qquad \mathscr{O}^{-1}\mathscr{O} = \mathscr{O}\mathscr{O}^{-1} = \mathscr{I}`}</EqBlock>
        <p>
          Sandwich any operator between two identities to expand it in outer products — its matrix form, with matrix
          element row <Tex>{String.raw`n`}</Tex>, column <Tex>{String.raw`m`}</Tex>:
        </p>
        <KeyResult
          eq={String.raw`\mathscr{O} = \mathscr{I}\mathscr{O}\mathscr{I} = \sum_{n}\sum_{m}|n\rangle\langle n|\mathscr{O}|m\rangle\langle m| = \sum_{n}\sum_{m}\mathscr{O}_{nm}|n\rangle\langle m|`}
          label="Operator in outer-product (matrix) form"
          note={
            <>
              with <Tex>{String.raw`\mathscr{O}_{nm} = \langle n|\mathscr{O}|m\rangle`}</Tex>.
            </>
          }
        />
        <p>Concretely, in a chosen basis a ket is a column vector and an operator is a matrix of its elements:</p>
        <EqBlock>{String.raw`|\zeta\rangle \rightarrow \begin{pmatrix}\langle 1|\zeta\rangle\\ \langle 2|\zeta\rangle\\ \vdots\\ \langle n|\zeta\rangle\\ \vdots\end{pmatrix}, \qquad \mathscr{O} \rightarrow \begin{pmatrix}\mathscr{O}_{11} & \mathscr{O}_{12} & \cdots & \mathscr{O}_{1m} & \cdots\\ \mathscr{O}_{21} & \mathscr{O}_{22} & & & \\ \vdots & & \ddots & & \\ \mathscr{O}_{n1} & \cdots & & \mathscr{O}_{nm} & \\ \vdots & & & & \ddots\end{pmatrix}`}</EqBlock>
        <p>and the basis kets are the standard unit column vectors (a 1 in the nth slot):</p>
        <EqBlock>{String.raw`|1\rangle \rightarrow \begin{pmatrix}1\\0\\ \vdots\end{pmatrix},\quad |2\rangle \rightarrow \begin{pmatrix}0\\1\\ \vdots\end{pmatrix},\quad \cdots,\quad |n\rangle \rightarrow \begin{pmatrix}0\\ \vdots\\1\\ \vdots\end{pmatrix}`}</EqBlock>
        <p>The inner product is then a row-times-column matrix product, obtained by inserting the identity:</p>
        <EqBlock>{String.raw`\langle\zeta|\xi\rangle = \big(\langle 1|\zeta\rangle^{*}\;\langle 2|\zeta\rangle^{*}\;\cdots\big)\begin{pmatrix}\langle 1|\xi\rangle\\ \langle 2|\xi\rangle\\ \vdots\end{pmatrix} = \sum_n \langle\zeta|n\rangle\langle n|\xi\rangle`}</EqBlock>
        <p>
          The <strong>adjoint</strong> is the complex-conjugate transpose; a Hermitian (self-adjoint) operator equals
          its own adjoint. Observables are Hermitian so that their eigenvalues — the possible measured values — are
          real. The eigenvalue equation identifies the eigenstates that the operator merely rescales:
        </p>
        <KeyResult
          eq={String.raw`\mathscr{O}^{\dagger} = (\tilde{\mathscr{O}})^{*} = \mathscr{O}^{*T}, \qquad \mathscr{O} = \mathscr{O}^{\dagger}\;\;(\text{Hermitian})`}
          label="Adjoint and Hermiticity"
        />
        <KeyResult eq={String.raw`\mathscr{O}|\lambda\rangle = \lambda|\lambda\rangle`} label="Eigenvalue equation" />

        <Derivation title="Operator → matrix by double-insertion; inner product as row times column">
          <Step title="Turn an operator into a matrix by double-insertion">
            Write <Tex>{String.raw`\mathscr{O} = \mathscr{I}\mathscr{O}\mathscr{I}`}</Tex> and replace each identity by
            its completeness sum. The numbers <Tex>{String.raw`\langle n|\mathscr{O}|m\rangle`}</Tex> pull out as the
            matrix elements <Tex>{String.raw`\mathscr{O}_{nm}`}</Tex>, leaving the outer-product basis{" "}
            <Tex>{String.raw`|n\rangle\langle m|`}</Tex>. Choosing a basis converts every operator statement into matrix
            algebra:
            <EqBlock>{String.raw`\mathscr{O} = \sum_n\sum_m |n\rangle\,\underbrace{\langle n|\mathscr{O}|m\rangle}_{\mathscr{O}_{nm}}\,\langle m|`}</EqBlock>
          </Step>
          <Step title="Inner product as row times column">
            Insert one identity into <Tex>{String.raw`\langle\zeta|\xi\rangle`}</Tex>. Recognize{" "}
            <Tex>{String.raw`\langle\zeta|n\rangle = \langle n|\zeta\rangle^{*}`}</Tex> as the conjugated row and{" "}
            <Tex>{String.raw`\langle n|\xi\rangle`}</Tex> as the column, recovering the familiar matrix product:
            <EqBlock>{String.raw`\langle\zeta|\xi\rangle = \sum_n \langle\zeta|n\rangle\langle n|\xi\rangle`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="Why Hermitian">
          Measured values are real. The eigenvalues of a Hermitian operator are guaranteed real and its eigenvectors
          orthonormal, so observables (<Tex>{String.raw`\mathscr{H}`}</Tex>, position, momentum, dipole{" "}
          <Tex>{String.raw`e\,\mathbf r`}</Tex>) are Hermitian. Watch for exceptions: the annihilation / creation
          operators <Tex>{String.raw`a,\,a^{\dagger}`}</Tex> are <em>not</em> Hermitian (Chapter&nbsp;XIV) — they come
          in adjoint pairs.
        </Callout>
        <Callout kind="warning" title="Adjoint of a product reverses order">
          <Tex>{String.raw`(\mathscr{O}_1\mathscr{O}_2)^{\dagger} = \mathscr{O}_2^{\dagger}\mathscr{O}_1^{\dagger}`}</Tex>
          . Keep this in mind when adjoint-ing the picture-transformation operators in the last section.
        </Callout>
      </Section>

      <Section title="Expanding the state: energy basis, expectation values, uncertainty">
        <Intuition>
          Now use the machinery. The state <Tex>{String.raw`|\psi\rangle`}</Tex> contains all knowable information.
          Expanding it in energy eigenstates <Tex>{String.raw`\{|n\rangle\}`}</Tex> gives amplitudes{" "}
          <Tex>{String.raw`C_n=\langle n|\psi\rangle`}</Tex> whose squared magnitudes are the probabilities of measuring
          each energy. The time dependence is simple here: each energy eigenstate just rotates its phase at its own
          frequency <Tex>{String.raw`\omega_n=E_n/\hbar`}</Tex>. The expectation value of any observable then becomes a
          double sum with characteristic <strong>beat phases</strong> <Tex>{String.raw`e^{-i(\omega_m-\omega_n)t}`}</Tex>
          — and those beat terms are the origin of the optical oscillation we are chasing.
        </Intuition>
        <p>
          The expansion coefficient in the energy basis is the probability amplitude; its modulus squared is the
          probability of measuring energy <Tex>{String.raw`E_k`}</Tex>:
        </p>
        <EqBlock>{String.raw`\langle k|\psi\rangle = C_k(t), \qquad |\psi\rangle = \sum_n C_n |n\rangle`}</EqBlock>
        <p>The central formula connecting theory to measurement is the expectation value of an operator:</p>
        <KeyResult eq={String.raw`\langle\mathscr{O}\rangle = \langle\psi|\mathscr{O}|\psi\rangle`} label="Expectation value" />
        <p>
          As a concrete example of an eigenvalue equation, the simple harmonic oscillator has eigenfrequency{" "}
          <Tex>{String.raw`\Omega`}</Tex> (distinct from the state frequencies <Tex>{String.raw`\omega_n`}</Tex>):
        </p>
        <EqBlock>{String.raw`\mathscr{H}|n\rangle = (n+\tfrac{1}{2})\hbar\Omega\,|n\rangle`}</EqBlock>
        <p>
          Under Schrödinger evolution each amplitude rotates at its own <Tex>{String.raw`\omega_n=E_n/\hbar`}</Tex>:
        </p>
        <EqBlock>{String.raw`|\psi(t)\rangle = \sum_n C_n \exp(-i\omega_n t)\,|n\rangle`}</EqBlock>
        <p>
          Inserting this into <Tex>{String.raw`\langle\psi|\mathscr{O}|\psi\rangle`}</Tex> gives a double sum whose
          off-diagonal terms oscillate at the Bohr beat frequencies — <em>this</em> is where optical oscillation comes
          from:
        </p>
        <KeyResult
          eq={String.raw`\langle\mathscr{O}\rangle = \sum_n\sum_m C_n^{*}C_m \exp[-i(\omega_m-\omega_n)t]\,\mathscr{O}_{nm}`}
          label="Expectation value in the energy basis"
        />
        <p>The spread of measured values is the standard deviation, computed from the two moments:</p>
        <EqBlock>{String.raw`\sigma = \sqrt{\langle\mathscr{O}^2\rangle - \langle\mathscr{O}\rangle^2}`}</EqBlock>

        <Derivation title="Why each amplitude rotates at ωₙ, and the beating double sum">
          <Step title="Why each amplitude rotates at ωₙ">
            Each energy eigenstate satisfies <Tex>{String.raw`\mathscr{H}|n\rangle = E_n|n\rangle = \hbar\omega_n|n\rangle`}</Tex>,
            so it picks up only a phase under Schrödinger evolution. Linearity gives the full state as a sum. Energy
            eigenstates are &ldquo;stationary&rdquo; because <Tex>{String.raw`|C_n|^2`}</Tex> is time-independent:
            <EqBlock>{String.raw`|n(t)\rangle = e^{-i\omega_n t}|n\rangle,\qquad \omega_n = E_n/\hbar`}</EqBlock>
          </Step>
          <Step title="Expectation value becomes a beating double sum">
            Insert the energy expansion into <Tex>{String.raw`\langle\mathscr{O}\rangle`}</Tex>. The bra contributes{" "}
            <Tex>{String.raw`C_n^{*}e^{+i\omega_n t}`}</Tex>, the ket <Tex>{String.raw`C_m e^{-i\omega_m t}`}</Tex>, and
            the operator contributes <Tex>{String.raw`\mathscr{O}_{nm}`}</Tex>. Collecting phases gives the beat factor.
            Diagonal terms are static; off-diagonal terms oscillate — the mathematical seed of the radiating dipole:
            <EqBlock>{String.raw`\langle\mathscr{O}\rangle = \sum_{n,m} C_n^{*}C_m\,e^{-i(\omega_m-\omega_n)t}\,\mathscr{O}_{nm}`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="Stationary vs coherent">
          A pure energy eigenstate produces no oscillating observable — its phase cancels in{" "}
          <Tex>{String.raw`|C_n|^2`}</Tex>. You <em>need</em> a superposition of at least two energy levels to get a
          time-varying expectation value. Coherence between levels is everything.
        </Callout>
        <Callout kind="warning" title="Ω vs ωₙ">
          In the oscillator example, <Tex>{String.raw`\Omega`}</Tex> is the oscillator&rsquo;s classical frequency
          entering the eigenvalue <Tex>{String.raw`(n+\tfrac12)\hbar\Omega`}</Tex>; the{" "}
          <Tex>{String.raw`\omega_n=E_n/\hbar`}</Tex> are the state phase rates. Do not conflate them.
        </Callout>
      </Section>

      <Section title="Continuous bases: recovering the wave function and the Schrödinger equation">
        <Intuition>
          Position is a continuous observable, so its eigenstates <Tex>{String.raw`|x\rangle`}</Tex> form a continuum
          rather than a discrete list. Everything from the discrete case carries over with sums{" "}
          <Tex>{String.raw`\to`}</Tex> integrals and the Kronecker delta <Tex>{String.raw`\to`}</Tex> the Dirac delta.
          The crucial realization: the ordinary Schrödinger wave function{" "}
          <Tex>{String.raw`\psi(x)`}</Tex> is <em>nothing but</em> the position-basis expansion coefficient,{" "}
          <Tex>{String.raw`\psi(x)=\langle x|\psi\rangle`}</Tex> — the projection of the abstract state onto the
          position eigenstate. Insert the position completeness relation into the abstract Schrödinger equation and you
          regenerate the familiar partial-differential wave equation. The wave function, the energy amplitudes, and the
          angular-momentum amplitudes are all shadows of one <Tex>{String.raw`|\psi\rangle`}</Tex>.
        </Intuition>
        <p>
          Expand the state over the continuum of position eigenstates (sum <Tex>{String.raw`\to`}</Tex> integral), and
          identify the key fact — the wave function is the position-basis amplitude:
        </p>
        <EqBlock>{String.raw`|\psi\rangle = \int dx\,|x\rangle\langle x|\psi\rangle`}</EqBlock>
        <KeyResult
          eq={String.raw`\psi(x) = \langle x|\psi\rangle`}
          label="The wave function is the position-basis amplitude"
        />
        <p>
          Orthonormality of position eigenstates uses the Dirac delta, and completeness becomes an integral — the
          resolution of identity you insert to recover wave mechanics:
        </p>
        <EqBlock>{String.raw`\langle x'|x\rangle = \delta(x'-x), \qquad \int dx\,|x\rangle\langle x| = \mathscr{I}`}</EqBlock>
        <p>
          Coefficients in one basis can be written via the completeness of another — a change of representation:
        </p>
        <EqBlock>{String.raw`\langle k|\psi\rangle = \sum_n \langle k|n\rangle\langle n|\psi\rangle`}</EqBlock>
        <p>
          The time-dependent wave function is assembled from energy eigenfunctions{" "}
          <Tex>{String.raw`u_n(x)=\langle x|n\rangle`}</Tex> with rotating amplitudes — bridging the discrete energy
          basis and the continuous position basis:
        </p>
        <EqBlock>{String.raw`\psi(x,t) = \langle x|\psi(t)\rangle = \sum_n \langle x|n\rangle\langle n|\psi(t)\rangle = \sum_n C_n \exp(-i\omega_n t)\,u_n(x)`}</EqBlock>
        <EqBlock>{String.raw`u_n(x) = \langle x|n\rangle, \qquad \langle n|\psi(t)\rangle = C_n \exp(-i\omega_n t)`}</EqBlock>
        <p>
          In three dimensions the same construction gives the spatial completeness and the 3-D wave function, useful for
          problems like the hydrogen atom:
        </p>
        <EqBlock>{String.raw`\mathscr{I} = \int d^3r\,|r\rangle\langle r|, \qquad \psi(r) = \langle r|\psi\rangle`}</EqBlock>
        <EqBlock>{String.raw`|\psi\rangle = \int d\theta\int r\,dr\int r\sin\theta\,d\phi\,|r\,\theta\,\phi\rangle\langle r\,\theta\,\phi|\psi\rangle`}</EqBlock>
        <p>
          The hydrogen state may instead be expanded in the joint energy / orbital-angular-momentum / z-projection
          eigenbasis, giving the time-dependent wave function with eigenfunctions{" "}
          <Tex>{String.raw`u_{nlm}(r)=\langle r|n\,l\,m\rangle`}</Tex>:
        </p>
        <EqBlock>{String.raw`|\psi\rangle = \sum_n\sum_l\sum_m |n\,l\,m\rangle\langle n\,l\,m|\psi\rangle`}</EqBlock>
        <EqBlock>{String.raw`\psi(r,t) = \langle r|\psi(t)\rangle = \sum_n\sum_l\sum_m C_{nlm}\exp(-i\omega_{nl}t)\,u_{nlm}(r)`}</EqBlock>
        <p>
          Finally, project the abstract Schrödinger equation onto position and insert position completeness — the
          operator becomes an integral kernel, which is <em>local</em> because the Hamiltonian kernel is a differential
          operator times a delta function:
        </p>
        <EqBlock>{String.raw`i\hbar\frac{\partial}{\partial t}\langle r|\psi(t)\rangle = \langle r|\mathscr{H}|\psi(t)\rangle = \int d^3r'\,\langle r|\mathscr{H}|r'\rangle\langle r'|\psi(t)\rangle`}</EqBlock>
        <EqBlock>{String.raw`\langle r|\mathscr{H}|r'\rangle = \mathscr{H}(r,\nabla)\,\delta(r-r')`}</EqBlock>
        <p>The delta collapses the integral, leaving the familiar Schrödinger wave equation:</p>
        <KeyResult
          eq={String.raw`i\hbar\frac{\partial}{\partial t}\psi(r,t) = \mathscr{H}(r,\nabla)\,\psi(r,t)`}
          label="The Schrödinger wave equation, recovered"
          note="The Dirac formalism CONTAINS ordinary wave mechanics as its position representation."
        />

        <Derivation title="ψ(x) as a projection; recover the PDE Schrödinger equation">
          <Step title="Identify ψ(x) as a projection">
            Expand <Tex>{String.raw`|\psi\rangle`}</Tex> over position eigenstates. The coefficient{" "}
            <Tex>{String.raw`\langle x|\psi\rangle`}</Tex> is, by definition, the value of the wave function at{" "}
            <Tex>{String.raw`x`}</Tex>. The discrete formalism transcribes verbatim with{" "}
            <Tex>{String.raw`\sum\to\int`}</Tex> and <Tex>{String.raw`\delta_{kj}\to\delta(x'-x)`}</Tex>:
            <EqBlock>{String.raw`\psi(x) = \langle x|\psi\rangle,\qquad \int dx\,|x\rangle\langle x| = \mathscr{I}`}</EqBlock>
          </Step>
          <Step title="Recover the PDE Schrödinger equation">
            Take the abstract <Tex>{String.raw`i\hbar\,\partial_t|\psi\rangle = \mathscr{H}|\psi\rangle`}</Tex>, project
            onto <Tex>{String.raw`\langle r|`}</Tex>, and insert{" "}
            <Tex>{String.raw`\int d^3r'\,|r'\rangle\langle r'| = \mathscr{I}`}</Tex>. Use the locality of the Hamiltonian
            kernel to do the integral, leaving the standard wave equation:
            <EqBlock>{String.raw`i\hbar\,\partial_t\,\psi(r,t) = \mathscr{H}(r,\nabla)\,\psi(r,t)`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="ψ(x) is not the state">
          The wave function is just one representation of <Tex>{String.raw`|\psi\rangle`}</Tex> — its position shadow.
          The energy amplitudes <Tex>{String.raw`C_n`}</Tex> and the wave function{" "}
          <Tex>{String.raw`\psi(x)`}</Tex> describe the <em>same</em> state in different bases, linked by{" "}
          <Tex>{String.raw`u_n(x)=\langle x|n\rangle`}</Tex>.
        </Callout>
        <Callout kind="warning" title="Delta normalization">
          Position eigenstates are <Tex>{String.raw`\delta`}</Tex>-normalized, not unit-normalized:{" "}
          <Tex>{String.raw`\langle x'|x\rangle = \delta(x'-x)`}</Tex>. They are not physically realizable states but are
          indispensable as a basis.
        </Callout>
      </Section>

      <Section title="The two-level atom and the oscillating dipole — the laser payoff">
        <Intuition>
          Here is the chapter&rsquo;s reward. Truncate the atom to two levels — upper{" "}
          <Tex>{String.raw`|a\rangle`}</Tex> and lower <Tex>{String.raw`|b\rangle`}</Tex> — the model used relentlessly
          through the book. A general state is the superposition{" "}
          <Tex>{String.raw`|\psi(t)\rangle = C_a e^{-i\omega_a t}|a\rangle + C_b e^{-i\omega_b t}|b\rangle`}</Tex>, a
          column of two rotating amplitudes. Compute the expectation value of the electric-dipole operator. The diagonal
          elements vanish by parity (an atomic eigenstate has no permanent dipole), but the <em>off-diagonal</em>{" "}
          element survives, and the beat phase makes <Tex>{String.raw`\langle e\,\mathbf r\rangle`}</Tex> oscillate at
          the optical Bohr frequency <Tex>{String.raw`\omega_a-\omega_b`}</Tex>. A coherent superposition is therefore a
          tiny classical-looking antenna oscillating at the transition frequency — exactly the source that radiates
          light and couples to the field.
        </Intuition>
        <p>The general two-level state — a coherent superposition with constant amplitudes (free evolution):</p>
        <EqBlock>{String.raw`|\psi(t)\rangle = C_a \exp(-i\omega_a t)\,|a\rangle + C_b \exp(-i\omega_b t)\,|b\rangle`}</EqBlock>
        <p>The same state written as a wave function, with the two energy eigenfunctions:</p>
        <EqBlock>{String.raw`\psi(r,t) = \langle r|\psi(t)\rangle = C_a \exp(-i\omega_a t)\,u_a(r) + C_b \exp(-i\omega_b t)\,u_b(r)`}</EqBlock>
        <p>The two-level basis is a pair of standard 2-component columns, so the state is a concrete column vector:</p>
        <EqBlock>{String.raw`|a\rangle \rightarrow \begin{pmatrix}1\\0\end{pmatrix},\qquad |b\rangle \rightarrow \begin{pmatrix}0\\1\end{pmatrix}`}</EqBlock>
        <EqBlock>{String.raw`|\psi(t)\rangle \rightarrow C_a\exp(-i\omega_a t)\begin{pmatrix}1\\0\end{pmatrix} + C_b\exp(-i\omega_b t)\begin{pmatrix}0\\1\end{pmatrix} = \begin{pmatrix}C_a\exp(-i\omega_a t)\\ C_b\exp(-i\omega_b t)\end{pmatrix}`}</EqBlock>
        <p>The general two-level Hamiltonian has diagonal energies plus off-diagonal couplings, with a matrix form:</p>
        <EqBlock>{String.raw`\mathscr{H} = \hbar\omega_a|a\rangle\langle a| + \mathscr{V}_{ab}|a\rangle\langle b| + \mathscr{V}_{ba}|b\rangle\langle a| + \hbar\omega_b|b\rangle\langle b|`}</EqBlock>
        <EqBlock>{String.raw`\mathscr{H} \rightarrow \begin{pmatrix}\hbar\omega_a & \mathscr{V}_{ab}\\ \mathscr{V}_{ba} & \hbar\omega_b\end{pmatrix}`}</EqBlock>
        <p>
          The coupled two-level Schrödinger equation in matrix form — written here, but solved only when the field is
          turned on in later chapters:
        </p>
        <EqBlock>{String.raw`i\hbar\frac{d}{dt}\begin{pmatrix}C_a\exp(-i\omega_a t)\\ C_b\exp(-i\omega_b t)\end{pmatrix} = \begin{pmatrix}\hbar\omega_a & \mathscr{V}_{ab}\\ \mathscr{V}_{ba} & \hbar\omega_b\end{pmatrix}\begin{pmatrix}C_a\exp(-i\omega_a t)\\ C_b\exp(-i\omega_b t)\end{pmatrix}`}</EqBlock>
        <p>
          The expectation value of any observable in this state is two static populations plus an oscillating coherence
          term at frequency <Tex>{String.raw`\omega_b-\omega_a`}</Tex>:
        </p>
        <EqBlock>{String.raw`\langle\mathscr{O}\rangle = C_a^{*}C_a\,\mathscr{O}_{aa} + C_b^{*}C_b\,\mathscr{O}_{bb} + \big\{C_a^{*}C_b\exp[-i(\omega_b-\omega_a)t]\,\mathscr{O}_{ab} + \text{c.c.}\big\}`}</EqBlock>
        <p>
          For the dipole operator the diagonal matrix elements vanish by parity (no permanent dipole), but the
          off-diagonal transition dipole is nonzero:
        </p>
        <EqBlock>{String.raw`(e\,\mathbf r)_{aa} = \langle a|e\,\mathbf r|a\rangle = e\int d^3r\,u_a^{*}(r)\,r\,u_a(r) = 0`}</EqBlock>
        <EqBlock>{String.raw`(e\,\mathbf r)_{bb} = \langle b|e\,\mathbf r|b\rangle = e\int d^3r\,u_b^{*}(r)\,r\,u_b(r) = 0`}</EqBlock>
        <EqBlock>{String.raw`(e\,\mathbf r)_{ab} = \langle a|e\,\mathbf r|b\rangle = e\int d^3r\,u_a^{*}(r)\,r\,u_b(r) \neq 0`}</EqBlock>
        <p>
          Dropping the dead diagonal terms leaves a single coherence term plus its conjugate — a real quantity
          oscillating at the Bohr frequency. This is the chapter&rsquo;s headline and the seed of the entire book:
        </p>
        <KeyResult
          eq={String.raw`\langle e\,\mathbf r\rangle = \langle\psi|e\,\mathbf r|\psi\rangle = e\,C_a^{*}C_b\exp[-i(\omega_b-\omega_a)t]\,r_{ab} + \text{c.c.}`}
          label="The oscillating two-level dipole"
          note={
            <>
              The transition (dipole) matrix element is abbreviated{" "}
              <Tex>{String.raw`\wp = r_{ab} = r_{ba}`}</Tex>. The dipole oscillates at the optical transition frequency{" "}
              <Tex>{String.raw`\omega_a-\omega_b`}</Tex> — the microscopic radiating source of all laser light.
            </>
          }
        />

        <Derivation title="From the beating sum to the radiating dipole">
          <Step title="Dipole expectation in the two-level state">
            Apply the general beating double-sum to <Tex>{String.raw`\mathscr{O} = e\,\mathbf r`}</Tex> with only two
            levels: two population terms plus an off-diagonal coherence term with its beat phase, plus the complex
            conjugate:
            <EqBlock>{String.raw`\langle e\,\mathbf r\rangle = |C_a|^2(e\,\mathbf r)_{aa} + |C_b|^2(e\,\mathbf r)_{bb} + \big\{C_a^{*}C_b\,e^{-i(\omega_b-\omega_a)t}\,(e\,\mathbf r)_{ab} + \text{c.c.}\big\}`}</EqBlock>
          </Step>
          <Step title="Kill the diagonal terms by parity">
            The atomic eigenfunctions <Tex>{String.raw`u_a,u_b`}</Tex> have definite parity, so{" "}
            <Tex>{String.raw`r\,|u|^2`}</Tex> is odd and integrates to zero. Only the off-diagonal element survives, so
            the populations contribute <em>nothing</em> to the dipole — only the coherence does:
            <EqBlock>{String.raw`(e\,\mathbf r)_{aa} = (e\,\mathbf r)_{bb} = 0,\qquad (e\,\mathbf r)_{ab} = e\!\int\! d^3r\,u_a^{*}\,r\,u_b = e\,r_{ab}`}</EqBlock>
          </Step>
          <Step title="Read off the oscillating dipole">
            The single coherence term plus its conjugate is a real quantity oscillating at the Bohr frequency. The
            amplitude is set by the coherence product <Tex>{String.raw`C_a^{*}C_b`}</Tex> and the transition dipole{" "}
            <Tex>{String.raw`\wp = r_{ab}`}</Tex>. No oscillation without coherence between the two levels — that is the
            lesson:
            <EqBlock>{String.raw`\langle e\,\mathbf r\rangle = e\,C_a^{*}C_b\,\wp\,e^{-i(\omega_b-\omega_a)t} + \text{c.c.}\;\propto\;\cos[(\omega_a-\omega_b)t + \text{phase}]`}</EqBlock>
          </Step>
        </Derivation>

        <SimFrame
          title="The coherent two-level atom: state vector to radiating dipole"
          caption={
            <>
              Integrate the chapter&rsquo;s literal <Tex>{String.raw`2\times2`}</Tex> Schrödinger equation and watch the
              state vector&rsquo;s two rotating amplitudes produce an oscillating dipole expectation value{" "}
              <Tex>{String.raw`\langle e\,\mathbf r\rangle(t)`}</Tex> at the Bohr frequency. The phasors animate in real
              time; the dipole trace and envelope update as you drag.
            </>
          }
          tryThis={
            <>
              Slide <Tex>{String.raw`P_a`}</Tex> to 1 (a pure eigenstate): the dipole goes <strong>dead flat</strong> —
              populations do not radiate. Bring it back to <Tex>{String.raw`0.5`}</Tex> for maximum amplitude. Now widen
              the gap <Tex>{String.raw`\omega_a-\omega_b`}</Tex> and watch the dipole beat faster, matching the marked
              Bohr period. The coupling <Tex>{String.raw`\mathscr{V}_{ab}`}</Tex> is a <em>forward-looking preview</em>{" "}
              (Rabi flopping, later chapters), not a Chapter&nbsp;VI result — leave it at 0 to reproduce the
              chapter&rsquo;s free evolution exactly.
            </>
          }
        >
          <Ch06Sim />
        </SimFrame>

        <Callout kind="insight" title="The atom as antenna">
          A coherent ground-plus-excited superposition has an electron cloud whose center of charge sloshes back and
          forth at the optical frequency <Tex>{String.raw`\omega_a-\omega_b`}</Tex>. That sloshing is the
          classical-looking dipole that radiates — the microscopic origin of all the light in a laser.
        </Callout>
        <Callout kind="warning" title="Free evolution only">
          These results assume <em>constant</em> amplitudes <Tex>{String.raw`C_a, C_b`}</Tex> (no coupling{" "}
          <Tex>{String.raw`\mathscr{V}`}</Tex> acting). The coupled equation is written but not solved here. Rabi
          flopping and stimulated transitions come later, when the field drives{" "}
          <Tex>{String.raw`\mathscr{V}_{ab}\neq0`}</Tex>.
        </Callout>
        <Callout kind="note" title="Beat-phase sign convention">
          The coherence term carries <Tex>{String.raw`\exp[-i(\omega_b-\omega_a)t] = \exp[+i(\omega_a-\omega_b)t]`}</Tex>
          ; the observable is real because the complex-conjugate term is added. The physical oscillation frequency is
          the transition frequency <Tex>{String.raw`|\omega_a-\omega_b|`}</Tex>.
        </Callout>
      </Section>

      <Section title="Schrödinger, interaction, and Heisenberg pictures">
        <Intuition>
          Time dependence in quantum mechanics is like motion in a film: let the actors move while the camera is fixed
          (<strong>Schrödinger</strong>), fix the actors and pan the camera (<strong>Heisenberg</strong>), or do a bit
          of both (<strong>interaction</strong>). In the Schrödinger picture the state carries all the time dependence
          and operators are fixed. In the Heisenberg picture the state is frozen and the operators evolve. In the
          interaction picture — the one this book lives in — you split the Hamiltonian into a free part{" "}
          <Tex>{String.raw`\mathscr{H}_0`}</Tex> and a perturbation <Tex>{String.raw`\mathscr{V}`}</Tex>, then rotate
          away the trivial <Tex>{String.raw`\mathscr{H}_0`}</Tex> motion so the state moves <em>only</em> because of the
          interaction. All three give identical expectation values — the physics is picture-independent.
        </Intuition>
        <p>
          Split the Hamiltonian into an exactly-soluble free part and an interaction, and write the Schrödinger equation
          with the split:
        </p>
        <EqBlock>{String.raw`\mathscr{H} = \mathscr{H}_0 + \mathscr{V}`}</EqBlock>
        <EqBlock>{String.raw`|\dot{\psi}(t)\rangle = -\frac{i}{\hbar}\mathscr{H}|\psi(t)\rangle = -\frac{i}{\hbar}(\mathscr{H}_0 + \mathscr{V})|\psi(t)\rangle`}</EqBlock>
        <p>
          For time-independent <Tex>{String.raw`\mathscr{H}`}</Tex>, the formal solution propagates the initial state
          via the time-evolution operator:
        </p>
        <EqBlock>{String.raw`|\psi(t)\rangle = \exp(-i\mathscr{H}t/\hbar)\,|\psi(0)\rangle`}</EqBlock>
        <p>In the Schrödinger picture the state moves and the operator is fixed:</p>
        <EqBlock>{String.raw`\langle\mathscr{O}\rangle(t) = \langle\mathscr{O}(t)\rangle = \langle\psi(t)|\mathscr{O}(0)|\psi(t)\rangle`}</EqBlock>
        <p>Rearranging the exponentials moves the time dependence onto the operator — the Heisenberg picture:</p>
        <EqBlock>{String.raw`\langle\mathscr{O}\rangle = \langle\psi(0)|\exp(i\mathscr{H}t/\hbar)\,\mathscr{O}(0)\,\exp(-i\mathscr{H}t/\hbar)|\psi(0)\rangle = \langle\psi(0)|\mathscr{O}(t)|\psi(0)\rangle`}</EqBlock>
        <p>
          The interaction-picture state rotates out the free <Tex>{String.raw`\mathscr{H}_0`}</Tex> evolution (note the
          <Tex>{String.raw`+`}</Tex> sign), and then evolves under the interaction <em>alone</em>:
        </p>
        <EqBlock>{String.raw`|\psi_I(t)\rangle = \exp(i\mathscr{H}_0 t/\hbar)\,|\psi(t)\rangle`}</EqBlock>
        <EqBlock>{String.raw`|\dot{\psi}_I(t)\rangle = -\frac{i}{\hbar}\,\mathscr{V}_I\,|\psi_I(t)\rangle`}</EqBlock>
        <p>
          This is the standard interaction picture: the transformed interaction{" "}
          <Tex>{String.raw`\mathscr{V}_I = \exp(i\mathscr{H}_0 t/\hbar)\,\mathscr{V}\,\exp(-i\mathscr{H}_0 t/\hbar)`}</Tex>{" "}
          drives the state. The book (eq 62) writes the equivalent closed form{" "}
          <Tex>{String.raw`|\psi_I(t)\rangle = \exp(-i\mathscr{V}t/\hbar)\,|\psi(0)\rangle`}</Tex> with the bare{" "}
          <Tex>{String.raw`\mathscr{V}`}</Tex>; the two agree in the book&rsquo;s{" "}
          <Tex>{String.raw`[\mathscr{H}_0,\mathscr{V}]=0`}</Tex> split, while the form above holds in general.
        </p>
        <p>
          In the Heisenberg picture the state is frozen and the operator evolves; its definition conjugates the
          Schrödinger operator by the evolution operator:
        </p>
        <EqBlock>{String.raw`\langle\mathscr{O}\rangle = \langle\psi(0)|\exp(i\mathscr{H}t/\hbar)\,\mathscr{O}(0)\,\exp(-i\mathscr{H}t/\hbar)|\psi(0)\rangle = \langle\psi(0)|\mathscr{O}(t)|\psi(0)\rangle`}</EqBlock>
        <EqBlock>{String.raw`\mathscr{O}(t) = \exp(i\mathscr{H}t/\hbar)\,\mathscr{O}(0)\,\exp(-i\mathscr{H}t/\hbar)`}</EqBlock>
        <p>
          Differentiating that definition gives the Heisenberg equation of motion — observables evolve by commutation
          with the Hamiltonian (note the <Tex>{String.raw`+i/\hbar`}</Tex> sign):
        </p>
        <KeyResult
          eq={String.raw`\frac{d}{dt}\mathscr{O}(t) = \frac{i}{\hbar}\big[\mathscr{H}\mathscr{O} - \mathscr{O}\mathscr{H}\big] = \frac{i}{\hbar}\big[\mathscr{H},\mathscr{O}\big]`}
          label="Heisenberg equation of motion"
        />
        <p>
          Finally, the amplitudes. The Schrödinger-picture amplitude (lowercase <Tex>{String.raw`c`}</Tex>) and the
          interaction-picture amplitude (uppercase <Tex>{String.raw`C`}</Tex>) differ by the free phase:
        </p>
        <EqBlock>{String.raw`c_n(t) = \langle n|\psi(t)\rangle, \qquad C_n(t) = c_n(t)\exp(i\omega_n t)`}</EqBlock>
        <p>The Schrödinger-picture amplitudes obey the equation of motion (book eq 68):</p>
        <EqBlock>{String.raw`\dot{c}_n = -i\omega_n c_n - \frac{i}{\hbar}\sum_k \langle n|\mathscr{V}|k\rangle\, c_k(t)`}</EqBlock>
        <p>The same state may be decomposed two ways — with bare amplitudes, or with explicit free phases:</p>
        <EqBlock>{String.raw`|\psi(t)\rangle = \sum_n c_n(t)\,|n\rangle, \qquad |\psi(t)\rangle = \sum_n C_n(t)\exp(-i\omega_n t)\,|n\rangle`}</EqBlock>
        <p>For the two levels, the relation between Schrödinger and interaction-picture amplitudes is:</p>
        <EqBlock>{String.raw`c_a(t) = C_a(t)\exp(-i\omega_a t), \qquad c_b(t) = C_b(t)\exp(-i\omega_b t)`}</EqBlock>

        <Derivation title="Schrödinger → Heisenberg → interaction">
          <Step title="From Schrödinger to Heisenberg">
            Insert the formal solution <Tex>{String.raw`|\psi(t)\rangle = e^{-i\mathscr{H}t/\hbar}|\psi(0)\rangle`}</Tex>{" "}
            into the expectation value. The exponentials sandwich the operator, defining the Heisenberg operator. The
            state is now frozen and the operator carries the motion:
            <EqBlock>{String.raw`\mathscr{O}(t) = e^{+i\mathscr{H}t/\hbar}\,\mathscr{O}\,e^{-i\mathscr{H}t/\hbar}`}</EqBlock>
          </Step>
          <Step title="Derive the Heisenberg equation of motion">
            Differentiate the Heisenberg operator with respect to <Tex>{String.raw`t`}</Tex>. The two terms give the
            commutator — the operator analog of Hamilton&rsquo;s equations:
            <EqBlock>{String.raw`\frac{d}{dt}\mathscr{O}(t) = \frac{i}{\hbar}[\mathscr{H},\mathscr{O}(t)]`}</EqBlock>
          </Step>
          <Step title="Strip the free motion: interaction picture">
            Define <Tex>{String.raw`|\psi_I\rangle = e^{+i\mathscr{H}_0 t/\hbar}|\psi\rangle`}</Tex>. Differentiating and
            using the Schrödinger equation, the <Tex>{String.raw`\mathscr{H}_0`}</Tex> terms cancel, leaving an equation
            driven only by the transformed interaction. Equivalently the amplitudes transform as{" "}
            <Tex>{String.raw`C_n = c_n e^{+i\omega_n t}`}</Tex>, removing each level&rsquo;s trivial phase:
            <EqBlock>{String.raw`i\hbar\,|\dot{\psi}_I\rangle = \mathscr{V}_I|\psi_I\rangle,\qquad \mathscr{V}_I = e^{+i\mathscr{H}_0 t/\hbar}\,\mathscr{V}\,e^{-i\mathscr{H}_0 t/\hbar}`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="Why the interaction picture">
          All the boring fast oscillation lives in <Tex>{String.raw`\mathscr{H}_0`}</Tex>. Rotating into the interaction
          frame leaves only the slow, physically interesting dynamics driven by the atom-field coupling{" "}
          <Tex>{String.raw`\mathscr{V}`}</Tex> — exactly what you want when computing transition rates and Rabi dynamics
          later.
        </Callout>
        <Callout kind="note" title="lowercase c vs uppercase C">
          The book reserves lowercase <Tex>{String.raw`c_n`}</Tex> for the full Schrödinger amplitude{" "}
          <Tex>{String.raw`\langle n|\psi(t)\rangle`}</Tex> and uppercase <Tex>{String.raw`C_n`}</Tex> for the
          interaction-picture amplitude, related by <Tex>{String.raw`c_n = C_n \exp(-i\omega_n t)`}</Tex>. Mixing them
          up inverts the physics; keep the case straight.
        </Callout>
        <Callout kind="warning" title="Sign conventions">
          Schrödinger: <Tex>{String.raw`|\dot\psi\rangle = -(i/\hbar)\mathscr{H}|\psi\rangle`}</Tex> (minus). Heisenberg
          operator equation: <Tex>{String.raw`d\mathscr{O}/dt = +(i/\hbar)[\mathscr{H},\mathscr{O}]`}</Tex> (plus).
          Interaction-picture state: <Tex>{String.raw`|\psi_I\rangle = \exp(+i\mathscr{H}_0 t/\hbar)|\psi\rangle`}</Tex>{" "}
          (plus). The opposite signs are not a typo — they keep all three pictures consistent.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from this chapter">
          <ul>
            <li>
              The state vector <Tex>{String.raw`|\psi\rangle`}</Tex> is the representation-independent container of all
              knowable information; the energy amplitudes <Tex>{String.raw`C_n`}</Tex>, the wave function{" "}
              <Tex>{String.raw`\psi(x)=\langle x|\psi\rangle`}</Tex>, and angular-momentum amplitudes{" "}
              <Tex>{String.raw`\langle n\,l\,m|\psi\rangle`}</Tex> are just its projections onto different bases.
            </li>
            <li>
              <strong>Completeness</strong>{" "}
              <Tex>{String.raw`\mathscr{I} = \sum_k|k\rangle\langle k| = \int dx\,|x\rangle\langle x|`}</Tex> is the
              universal trick: insert it to change representation. Orthonormality is{" "}
              <Tex>{String.raw`\langle k|j\rangle = \delta_{kj}`}</Tex> (discrete) or{" "}
              <Tex>{String.raw`\langle x'|x\rangle = \delta(x'-x)`}</Tex> (continuous).
            </li>
            <li>
              Operators become matrices via{" "}
              <Tex>{String.raw`\mathscr{O}_{nm} = \langle n|\mathscr{O}|m\rangle`}</Tex>; observables are Hermitian
              (<Tex>{String.raw`\mathscr{O} = \mathscr{O}^{\dagger}`}</Tex>) so eigenvalues are real; eigenstates{" "}
              <Tex>{String.raw`\mathscr{O}|\lambda\rangle = \lambda|\lambda\rangle`}</Tex> form the natural basis.
              (Creation / annihilation operators are a key non-Hermitian exception, Chapter&nbsp;XIV.)
            </li>
            <li>
              <strong>Expectation value</strong>{" "}
              <Tex>{String.raw`\langle\mathscr{O}\rangle = \sum_{n,m} C_n^{*}C_m e^{-i(\omega_m-\omega_n)t}\mathscr{O}_{nm}`}</Tex>
              : off-diagonal coherence terms oscillate at Bohr frequencies; diagonal population terms are static.
              Coherence radiates, populations do not.
            </li>
            <li>
              <strong>The two-level workhorse:</strong>{" "}
              <Tex>{String.raw`|\psi\rangle = C_a e^{-i\omega_a t}|a\rangle + C_b e^{-i\omega_b t}|b\rangle`}</Tex> as a
              2-component column; <Tex>{String.raw`\mathscr{H} = \bigl(\begin{smallmatrix}\hbar\omega_a & \mathscr{V}_{ab}\\ \mathscr{V}_{ba} & \hbar\omega_b\end{smallmatrix}\bigr)`}</Tex>
              ; transition dipole <Tex>{String.raw`\wp = r_{ab} = r_{ba}`}</Tex> nonzero while diagonal dipoles vanish by
              parity.
            </li>
            <li>
              <strong>Headline:</strong> a coherent two-level superposition has{" "}
              <Tex>{String.raw`\langle e\,\mathbf r\rangle`}</Tex> oscillating at the optical transition frequency{" "}
              <Tex>{String.raw`\omega_a-\omega_b`}</Tex> — the microscopic radiating dipole that is the source of all
              laser light. This is the seed of the entire book.
            </li>
            <li>
              <strong>Three pictures, same physics:</strong> Schrödinger (state moves), Heisenberg (
              <Tex>{String.raw`d\mathscr{O}/dt = +(i/\hbar)[\mathscr{H},\mathscr{O}]`}</Tex>, operator moves),
              interaction (<Tex>{String.raw`|\psi_I\rangle = e^{+i\mathscr{H}_0 t/\hbar}|\psi\rangle`}</Tex>, only{" "}
              <Tex>{String.raw`\mathscr{V}`}</Tex> drives the slow dynamics). The book lives in the interaction picture.
            </li>
            <li>
              <strong>Notation:</strong> lowercase <Tex>{String.raw`c_n`}</Tex> = Schrödinger amplitude, uppercase{" "}
              <Tex>{String.raw`C_n`}</Tex> = interaction-picture amplitude, with{" "}
              <Tex>{String.raw`c_n = C_n e^{-i\omega_n t}`}</Tex>. Script <Tex>{String.raw`\wp`}</Tex> = transition
              dipole; <Tex>{String.raw`\sigma`}</Tex> = standard deviation;{" "}
              <Tex>{String.raw`\omega_n = E_n/\hbar`}</Tex>; <Tex>{String.raw`\Omega`}</Tex> = oscillator frequency. The
              evolution operator <Tex>{String.raw`U(t,t_0) = \exp[-i\mathscr{H}(t-t_0)/\hbar]`}</Tex> returns when the
              field is switched on.
            </li>
          </ul>
          Next we track populations <em>and</em> coherences together with the density matrix (Chapter&nbsp;VII), where
          the coherence <Tex>{String.raw`C_a^{*}C_b`}</Tex> that radiates here becomes the off-diagonal element{" "}
          <Tex>{String.raw`\rho_{ab}`}</Tex>.
        </Callout>
      </Section>
    </Lesson>
  );
}
