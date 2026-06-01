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
import Ch15Sim from "@/components/sims/ch15";

export default function Page() {
  return (
    <Lesson slug="ch15">
      <Lede>
        A laser beam is the closest a quantum field ever comes to being a clean classical wave — a smooth cosine of
        definite amplitude and phase. But quantum mechanics forbids a field from having a perfectly sharp amplitude{" "}
        <em>and</em> phase at once: the conjugate field observables do not commute. The{" "}
        <strong>coherent state</strong> <Tex>{String.raw`|\alpha\rangle`}</Tex> is the field&rsquo;s best possible
        compromise — the minimum-uncertainty Gaussian that <em>stays</em> minimum-uncertainty as it evolves, sloshing
        rigidly so its center traces exactly the classical cosine{" "}
        <Tex>{String.raw`\langle E\rangle(t)\propto\cos(\Omega t+\phi)`}</Tex>. This chapter builds it from
        minimum-uncertainty arguments, derives its Poisson photon statistics and overcomplete geometry, shows that a
        classical current radiates one, and finally uses coherent states as a basis — the{" "}
        <Tex>{String.raw`P`}</Tex>-representation — to tell laser light apart from thermal light.
      </Lede>

      <Section title="Why coherent states? Minimum-uncertainty light and the classical limit">
        <Intuition>
          The classical electromagnetic field has a perfectly definite amplitude <Tex>{String.raw`E_0`}</Tex> and phase{" "}
          <Tex>{String.raw`\phi`}</Tex> — a clean cosine. Quantum mechanically a field mode <em>is</em> a harmonic
          oscillator, and its conjugate observables (the electric field <Tex>{String.raw`E`}</Tex> and magnetic field{" "}
          <Tex>{String.raw`H`}</Tex>, equivalently position <Tex>{String.raw`q`}</Tex> and momentum{" "}
          <Tex>{String.raw`p`}</Tex>) obey an uncertainty relation. So &ldquo;how classical can a quantum field
          be?&rdquo; becomes &ldquo;which state minimizes the uncertainty product?&rdquo; The answer is a Gaussian — but
          a second, deeper demand picks coherent states out of <em>all</em> minimum-uncertainty Gaussians: we want a
          state that stays minimum-uncertainty and rigid as time runs, so its center can faithfully trace the classical
          oscillation. A photon-number state <Tex>{String.raw`|n\rangle`}</Tex> fails utterly — it has{" "}
          <Tex>{String.raw`\langle E\rangle=0`}</Tex> and definite energy, the opposite of a wave. The coherent state is
          the displaced-vacuum Gaussian whose centroid orbits the oscillator well like a classical particle.
        </Intuition>
        <p>
          Because the field operators do not commute, their fluctuations obey an uncertainty product with a nonzero
          floor; a state sitting at that floor is the most classical-looking compromise the field can make:
        </p>
        <EqBlock label="1">{String.raw`\Delta E\,\Delta H \geq \tfrac{1}{2}\left|\left\langle \frac{\partial H}{\partial t}\right\rangle\right|`}</EqBlock>
        <p>
          In oscillator language this is the familiar statement for position and momentum of the mode. Equality defines
          a minimum-uncertainty wave packet — and coherent states achieve equality for <em>all</em> time:
        </p>
        <EqBlock>{String.raw`\Delta q\,\Delta p \geq \tfrac{1}{2}\hbar`}</EqBlock>
        <p>
          The single complex label <Tex>{String.raw`\alpha`}</Tex> of a coherent state encodes both classical
          parameters at once — the dictionary between the quantum label and the classical wave is
        </p>
        <KeyResult
          eq={String.raw`\alpha = \tfrac{1}{2}E_{0}\,e^{-i\phi}`}
          label="The label ↔ classical field"
          note={
            <>
              One complex number carries exactly the two real classical parameters: modulus <Tex>{String.raw`E_0/2`}</Tex>{" "}
              (amplitude) and phase <Tex>{String.raw`\phi`}</Tex>. This is the cleanest possible quantum-to-classical
              correspondence.
            </>
          }
        />
        <p>
          The chapter&rsquo;s organizing idea is that <em>any</em> field state&rsquo;s density operator can be written
          as a weighted overlay of coherent-state projectors — the <Tex>{String.raw`P`}</Tex>-representation — which is
          the bridge from this one state to all of laser statistics (developed fully in Sec.&nbsp;15-3):
        </p>
        <EqBlock label="2">{String.raw`\rho = \int d^{2}\alpha\, P(\alpha)\,|\alpha\rangle\langle\alpha|`}</EqBlock>

        <Derivation title="From non-commuting fields to the coherent label">
          <Step title="Non-commuting fields force a Gaussian">
            Because <Tex>{String.raw`E`}</Tex> and <Tex>{String.raw`H`}</Tex> (equivalently{" "}
            <Tex>{String.raw`q`}</Tex> and <Tex>{String.raw`p`}</Tex>) are conjugate, Eq.&nbsp;(1) and{" "}
            <Tex>{String.raw`\Delta q\,\Delta p\ge\hbar/2`}</Tex> hold. The state that <em>saturates</em> an uncertainty
            product is always a Gaussian, so we seek the field&rsquo;s wave function as a Gaussian in the oscillator
            coordinate.
          </Step>
          <Step title="Why a number state is not the answer">
            A photon-number state <Tex>{String.raw`|n\rangle`}</Tex> has <Tex>{String.raw`\langle E\rangle=0`}</Tex> and
            definite energy — no oscillating field at all. A classical wave needs a superposition of energy eigenstates
            whose centroid oscillates. This is the physical reason coherent states, not number states, describe laser
            light.
          </Step>
          <Step title="Identify the label with the classical field">
            Demand that the Gaussian&rsquo;s center execute the classical cosine of amplitude{" "}
            <Tex>{String.raw`E_0`}</Tex> and phase <Tex>{String.raw`\phi`}</Tex>. Matching forces{" "}
            <Tex>{String.raw`\alpha = \tfrac12 E_0 e^{-i\phi}`}</Tex> — one complex number for the two classical
            parameters.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Number state vs. coherent state">
          Definite photon number <Tex>{String.raw`=`}</Tex> definite energy <Tex>{String.raw`=`}</Tex> no oscillating
          field (random phase). Definite-ish amplitude <em>and</em> phase <Tex>{String.raw`=`}</Tex> coherent state{" "}
          <Tex>{String.raw`=`}</Tex> the closest thing to a classical wave. You cannot have both perfectly; the laser
          chooses the coherent compromise.
        </Callout>
      </Section>

      <Section title="The displaced oscillator: rigid Gaussian, eigenvalue equation, and Poisson statistics">
        <Intuition>
          Now build the state and watch it move. The coherent-state wave function{" "}
          <Tex>{String.raw`\psi(q,t)`}</Tex> is a Gaussian of <em>fixed</em> width — the same width as the ground state —
          whose center oscillates in the parabolic well. Drop a minimum-uncertainty packet off-center in a harmonic
          well and it behaves like a classical pendulum: it rolls back and forth, never spreading, the centroid tracing{" "}
          <Tex>{String.raw`q(t)\propto\cos(\Omega t+\phi)`}</Tex> and the field tracing{" "}
          <Tex>{String.raw`\langle E\rangle\propto E_0\cos(\Omega t+\phi)`}</Tex>. The compact algebraic fingerprint is
          stunning: <Tex>{String.raw`|\alpha\rangle`}</Tex> is the eigenstate of the annihilation operator. Its photon
          number is Poisson-distributed, and the whole state is generated from vacuum by a displacement operator that
          literally kicks the vacuum to a new center in phase space.
        </Intuition>
        <p>
          The defining property is that the uncertainty product is minimum for <em>all</em> time — the packet does not
          spread — built from the usual fluctuation definitions:
        </p>
        <EqBlock label="3">{String.raw`\Delta q\,\Delta p \geq \tfrac{1}{2}\hbar`}</EqBlock>
        <EqBlock label="4">{String.raw`(\Delta q)^{2} = \langle q^{2}\rangle - \langle q\rangle^{2}, \qquad (\Delta p)^{2} = \langle p^{2}\rangle - \langle p\rangle^{2}`}</EqBlock>
        <p>
          Carrying the ground-state shape <Tex>{String.raw`\phi_0`}</Tex> with a complex displacement that rotates as{" "}
          <Tex>{String.raw`\alpha e^{-i\Omega t}`}</Tex>, the wave function is
        </p>
        <EqBlock label="5">{String.raw`\psi(q,t) = \exp\!\big[\tfrac{1}{2}(\alpha e^{-i\Omega t})^{2} - \tfrac{1}{2}|\alpha|^{2}\big]\,\phi_{0}(\xi), \qquad \langle\xi\rangle = \sqrt{2}\,\alpha e^{-i\Omega t}`}</EqBlock>
        <p>
          The complex label can be read straight off the dimensional position and momentum (mass{" "}
          <Tex>{String.raw`M`}</Tex>, mode frequency <Tex>{String.raw`\Omega`}</Tex>); its real part tracks{" "}
          <Tex>{String.raw`q`}</Tex>, its imaginary part tracks <Tex>{String.raw`p`}</Tex>, so{" "}
          <Tex>{String.raw`\alpha`}</Tex> is literally the phase-space point of the packet center, written in the
          dimensionless oscillator coordinate <Tex>{String.raw`\xi`}</Tex>:
        </p>
        <EqBlock label="6">{String.raw`\alpha = (2M\hbar\Omega)^{-1/2}\,(M\Omega q + i\,p)`}</EqBlock>
        <EqBlock label="7">{String.raw`\xi = \left(\frac{M\Omega}{\hbar}\right)^{1/2} q`}</EqBlock>
        <p>
          Made explicit, the probability density is the ground-state Gaussian rigidly displaced to a center that
          oscillates as <Tex>{String.raw`\sqrt{2}\,|\alpha|\cos(\Omega t+\phi)`}</Tex> — the &ldquo;sloshing without
          spreading&rdquo; picture, with the polar label{" "}
          <Tex>{String.raw`\alpha = |\alpha|\exp(-i\phi)`}</Tex>:
        </p>
        <EqBlock label="8">{String.raw`\psi(q,t) \propto \phi_{0}\big[\xi - \sqrt{2}\,|\alpha|\cos(\Omega t + \phi)\big], \qquad \alpha = |\alpha|\exp(-i\phi)`}</EqBlock>
        <p>
          Expressed in the electric-field variable, the same packet is a Gaussian of constant spread whose centroid
          oscillates with constant amplitude <Tex>{String.raw`\sqrt{2}\,|\alpha|`}</Tex> at frequency{" "}
          <Tex>{String.raw`2\Omega`}</Tex>. Reading off the center recovers exactly the classical field cosine:
        </p>
        <EqBlock label="9">{String.raw`|\psi(E,t)|^{2} = (\sqrt{2\pi}\,E')^{-1}\exp\!\Big[-\big(\tfrac{1}{\sqrt{2}}E'\big)^{2}\big(E - \sqrt{2}\,|\alpha|\cos(\Omega t + \phi)\big)^{2}\Big]`}</EqBlock>

        <Callout kind="warning" title="Keep Ω and ω straight">
          The radiation-field mode frequency is <Tex>{String.raw`\Omega`}</Tex> (it appears in the field packet
          Eq.&nbsp;(9) and the thermal factor <Tex>{String.raw`\hbar\Omega/k_BT`}</Tex> later). The mechanical-oscillator
          analogy uses mass <Tex>{String.raw`M`}</Tex> and frequency <Tex>{String.raw`\omega`}</Tex>. They label the same
          math but different physical pictures — do not merge the symbols.
        </Callout>

        <p>
          The algebra is even cleaner. Expanding the coherent state in the photon-number basis gives Poisson-weighted
          amplitudes; in coordinate space these multiply the oscillator eigenfunctions{" "}
          <Tex>{String.raw`\phi_n`}</Tex>, and summing them reproduces the rigid Gaussian of Eq.&nbsp;(8):
        </p>
        <EqBlock label="10">{String.raw`\psi(\alpha) = \sum_{n=0}^{\infty}\frac{\alpha^{n}}{\sqrt{n!}}\,\exp\!\big(-\tfrac{1}{2}|\alpha|^{2}\big)\,\phi_{n}(\xi)`}</EqBlock>
        <EqBlock label="11">{String.raw`|\alpha\rangle = \sum_{n=0}^{\infty}\frac{\alpha^{n}}{\sqrt{n!}}\,\exp\!\big(-\tfrac{1}{2}|\alpha|^{2}\big)\,|n\rangle`}</EqBlock>
        <p>
          Apply the annihilation operator to this sum and the most compact characterization of a coherent state drops
          out:
        </p>
        <KeyResult
          number="12"
          eq={String.raw`a\,|\alpha\rangle = \alpha\,|\alpha\rangle`}
          label="Coherent state = annihilation-operator eigenstate"
          note={
            <>
              The coherent state is the right-eigenstate of the (non-Hermitian) annihilation operator, with complex
              eigenvalue <Tex>{String.raw`\alpha`}</Tex>. Everything else — Poisson statistics, the rigid Gaussian,
              classical-field behavior — follows from this.
            </>
          }
        />
        <p>
          Squaring the number-basis amplitudes gives the headline statistics, with mean equal to the squared modulus:
        </p>
        <KeyResult
          number="13"
          eq={String.raw`P_{n}(\alpha) = |\langle n|\alpha\rangle|^{2} = \frac{(|\alpha|^{2})^{n}}{n!}\,\exp(-|\alpha|^{2})`}
          label="Poisson photon statistics"
        />
        <KeyResult
          number="14"
          eq={String.raw`\langle n\rangle = |\alpha|^{2}`}
          label="Mean photon number"
          note={
            <>
              For a Poisson distribution variance <Tex>{String.raw`=`}</Tex> mean, so{" "}
              <Tex>{String.raw`\Delta n = |\alpha|`}</Tex> and the relative fluctuation{" "}
              <Tex>{String.raw`\Delta n/\langle n\rangle = 1/|\alpha|`}</Tex> shrinks as the field strengthens.
            </>
          }
        />
        <p>
          Finally, the coherent state is generated from vacuum by displacing it — a &ldquo;shifted vacuum&rdquo; — using
          the ladder construction of number states as a lemma:
        </p>
        <KeyResult
          number="15"
          eq={String.raw`|\alpha\rangle = \exp\!\big(\alpha a^{\dagger} - \tfrac{1}{2}\alpha^{*}\alpha\big)\,|0\rangle`}
          label="Displacement-operator generation"
          note={
            <>
              This is the displacement <Tex>{String.raw`\exp(\alpha a^{\dagger}-\alpha^{*}a)`}</Tex> acting on{" "}
              <Tex>{String.raw`|0\rangle`}</Tex>; the <Tex>{String.raw`\alpha^{*}a`}</Tex> part disentangles because{" "}
              <Tex>{String.raw`a|0\rangle=0`}</Tex>.
            </>
          }
        />
        <EqBlock label="15b">{String.raw`|n\rangle = \frac{(a^{\dagger})^{n}}{\sqrt{n!}}\,|0\rangle`}</EqBlock>

        <SimFrame
          title="The oscillating coherent-state packet"
          caption={
            <>
              Three synchronized faces of <Tex>{String.raw`|\alpha\rangle`}</Tex>: <strong>A</strong> the rigid Gaussian{" "}
              <Tex>{String.raw`|\psi(q,t)|^2`}</Tex> sloshing in the well (ghost outline pinned at{" "}
              <Tex>{String.raw`t=0`}</Tex> proves it never spreads); <strong>B</strong> the classical field{" "}
              <Tex>{String.raw`\langle E\rangle(t)=\sqrt2|\alpha|\cos(\Omega t+\phi)`}</Tex> — the packet center{" "}
              <em>is</em> the cosine; <strong>C</strong> the Poisson photon distribution. Units are scaled{" "}
              <Tex>{String.raw`\hbar=M=1`}</Tex>, so <Tex>{String.raw`\sigma=1/\sqrt2`}</Tex> and{" "}
              <Tex>{String.raw`\Delta q\,\Delta p=\hbar/2`}</Tex> exactly, for all <Tex>{String.raw`t`}</Tex>.
            </>
          }
          tryThis={
            <>
              Slide <Tex>{String.raw`|\alpha|`}</Tex> up: the packet swing grows, the field amplitude grows, and the
              Poisson distribution sharpens relative to its mean (<Tex>{String.raw`\Delta n/\langle n\rangle=1/|\alpha|`}</Tex>{" "}
              shrinks). Set <Tex>{String.raw`|\alpha|=0`}</Tex> to see the vacuum: a spike at{" "}
              <Tex>{String.raw`n=0`}</Tex>. Turn on the thermal overlay and raise <Tex>{String.raw`T`}</Tex> — the
              Bose–Einstein curve is broad and monotonically falling, the chaotic-light contrast of Fig.&nbsp;15-4. Note
              that the field panel runs at <Tex>{String.raw`\Omega`}</Tex> so the dot stays locked to the packet center;
              the field-variable form Eq.&nbsp;(9) carries an extra factor <Tex>{String.raw`2\Omega`}</Tex>.
            </>
          }
        >
          <Ch15Sim />
        </SimFrame>

        <Derivation title="Build the state, derive the eigenvalue and Poisson laws">
          <Step title="Rigid Gaussian from the displaced ground state">
            Displace the ground-state Gaussian <Tex>{String.raw`\phi_0(\xi)`}</Tex> by the time-dependent classical
            amplitude (Eqs.&nbsp;5–8). The width is the vacuum width (fixed); the center sits at{" "}
            <Tex>{String.raw`\sqrt2\,|\alpha|\cos(\Omega t+\phi)`}</Tex>. Because the width never changes, the packet
            sloshes without spreading — the quantum analogue of a classical pendulum.
          </Step>
          <Step title="Field-variable form and the classical cosine">
            Re-express the packet in the electric-field variable (Eq.&nbsp;9). The density is a constant-spread Gaussian
            whose centroid oscillates as <Tex>{String.raw`\sqrt2\,|\alpha|\cos(\Omega t+\phi)`}</Tex> at frequency{" "}
            <Tex>{String.raw`2\Omega`}</Tex>. Reading off the center recovers exactly the classical field cosine.
          </Step>
          <Step title="Derive a|α⟩ = α|α⟩">
            Apply <Tex>{String.raw`a`}</Tex> to the number expansion Eq.&nbsp;(11). Using{" "}
            <Tex>{String.raw`a|n\rangle=\sqrt n\,|n-1\rangle`}</Tex>, the sum reindexes{" "}
            <Tex>{String.raw`(n\to n-1)`}</Tex> and the Poisson amplitudes conspire so that{" "}
            <Tex>{String.raw`a|\alpha\rangle=\alpha|\alpha\rangle`}</Tex> (Eq.&nbsp;12).
          </Step>
          <Step title="Poisson statistics and ⟨n⟩ = |α|²">
            Square the amplitudes of Eq.&nbsp;(11):{" "}
            <Tex>{String.raw`|\langle n|\alpha\rangle|^{2}=e^{-|\alpha|^{2}}|\alpha|^{2n}/n!`}</Tex> (Eq.&nbsp;13), the
            Poisson distribution, with mean <Tex>{String.raw`\langle n\rangle=|\alpha|^{2}`}</Tex> (Eq.&nbsp;14). Since
            variance <Tex>{String.raw`=`}</Tex> mean, the relative fluctuation is{" "}
            <Tex>{String.raw`1/|\alpha|`}</Tex>.
          </Step>
          <Step title="Displacement-operator generation (BCH disentangling)">
            Start from <Tex>{String.raw`|\alpha\rangle=\exp(\alpha a^{\dagger}-\tfrac12\alpha^{*}\alpha)|0\rangle`}</Tex>{" "}
            (Eq.&nbsp;15). Expand <Tex>{String.raw`\exp(\alpha a^{\dagger})`}</Tex> as a Maclaurin series, act on{" "}
            <Tex>{String.raw`|0\rangle`}</Tex> using <Tex>{String.raw`|n\rangle=(a^{\dagger})^{n}/\sqrt{n!}\,|0\rangle`}</Tex>,
            and the prefactor <Tex>{String.raw`e^{-\tfrac12|\alpha|^{2}}`}</Tex> reproduces Eq.&nbsp;(11). This follows
            from the full displacement <Tex>{String.raw`\exp(\alpha a^{\dagger}-\alpha^{*}a)`}</Tex> because{" "}
            <Tex>{String.raw`a|0\rangle=0`}</Tex> lets the <Tex>{String.raw`\alpha^{*}a`}</Tex> part disentangle away.
          </Step>
          <Step title="a†|α⟩ is NOT an eigenrelation">
            By contrast the creation operator gives a differential operator in{" "}
            <Tex>{String.raw`\alpha`}</Tex>, not a simple eigenvalue —
            <EqBlock label="16">{String.raw`a^{\dagger}|\alpha\rangle = \left(\frac{\partial}{\partial\alpha} + \tfrac{1}{2}\alpha^{*}\right)|\alpha\rangle`}</EqBlock>
            so the coherent state is an eigenstate only of <Tex>{String.raw`a`}</Tex>. Worth stating so the result is
            not over-generalized.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Three faces of one state">
          (1) <strong>Geometric</strong>: a rigid Gaussian sloshing in the oscillator well. (2){" "}
          <strong>Algebraic</strong>: the eigenstate <Tex>{String.raw`a|\alpha\rangle=\alpha|\alpha\rangle`}</Tex>. (3){" "}
          <strong>Statistical</strong>: a Poisson photon distribution with{" "}
          <Tex>{String.raw`\langle n\rangle=|\alpha|^{2}`}</Tex>. All three describe the same coherent state{" "}
          <Tex>{String.raw`|\alpha\rangle`}</Tex>.
        </Callout>
      </Section>

      <Section title="Mathematical structure: completeness, non-orthogonality, overcompleteness">
        <Intuition>
          Coherent states form a strange but powerful basis. They are normalized but <em>not</em> orthogonal: two
          coherent states overlap, and the overlap decays as a Gaussian in their separation{" "}
          <Tex>{String.raw`|\alpha-\beta|^{2}`}</Tex> in the complex plane. So labels that are close are nearly the same
          state, while well-separated labels are nearly orthogonal. Despite this, the coherent states are{" "}
          <strong>complete</strong>: their projectors integrated over the whole plane (with weight{" "}
          <Tex>{String.raw`1/\pi`}</Tex>) give the identity. In fact they are <strong>over</strong>complete — there are
          too many of them, so any one coherent state can itself be expanded in terms of all the others. That redundancy
          is exactly what makes the <Tex>{String.raw`P`}</Tex>-representation possible.
        </Intuition>
        <p>
          We already met the action of <Tex>{String.raw`a^{\dagger}`}</Tex> (Eq.&nbsp;16). The central structural result
          is the resolution of the identity — integrating the projectors over the complex plane with weight{" "}
          <Tex>{String.raw`1/\pi`}</Tex>:
        </p>
        <KeyResult
          number="17"
          eq={String.raw`\pi^{-1}\int d^{2}\alpha\,|\alpha\rangle\langle\alpha| = 1`}
          label="Completeness (resolution of the identity)"
        />
        <p>The integration measure, in Cartesian and polar form, is</p>
        <EqBlock label="18">{String.raw`d^{2}\alpha = d[\mathrm{Re}(\alpha)]\,d[\mathrm{Im}(\alpha)] = d(|\alpha|)\,|\alpha|\,d\phi`}</EqBlock>
        <p>
          Inserting the number expansion into the projector and using the polar measure separates the integral into a
          phase part and a radial part:
        </p>
        <EqBlock label="19">{String.raw`\int d^{2}\alpha\,|\alpha\rangle\langle\alpha| = \sum_{n}\sum_{n'}\frac{|n\rangle\langle n'|}{\sqrt{n!\,n'!}}\int_{0}^{2\pi}\!d\phi\,e^{i(n'-n)\phi}\int_{0}^{\infty}\!d|\alpha|\,|\alpha|^{\,n+n'+1}e^{-|\alpha|^{2}}`}</EqBlock>
        <p>The phase integral enforces a Kronecker delta, collapsing the double sum:</p>
        <EqBlock>{String.raw`\int_{0}^{2\pi} d\phi\,\exp[i(m-n)\phi] = 2\pi\,\delta_{mn}`}</EqBlock>
        <p>and the radial Gamma-function integral cancels the normalization, leaving the number-basis identity:</p>
        <EqBlock label="20">{String.raw`\int d^{2}\alpha\,|\alpha\rangle\langle\alpha| = \pi\sum_{n}\frac{1}{n!}\,|n\rangle\langle n|\,n! = \pi\sum_{n}|n\rangle\langle n| = \pi`}</EqBlock>
        <p>The overlap of two coherent states is nonzero — they are non-orthogonal:</p>
        <KeyResult
          number="21"
          eq={String.raw`\langle\beta|\alpha\rangle = \exp\!\big[-\tfrac{1}{2}|\alpha|^{2} + \beta^{*}\alpha - \tfrac{1}{2}|\beta|^{2}\big]`}
          label="Overlap of two coherent states"
        />
        <p>and its squared modulus decays as a Gaussian in the phase-space separation:</p>
        <KeyResult
          number="22"
          eq={String.raw`|\langle\beta|\alpha\rangle|^{2} = \exp\!\big(-|\beta-\alpha|^{2}\big)`}
          label="Gaussian overlap"
          note={
            <>
              States far apart in the complex plane are effectively orthogonal; nearby states strongly overlap.
            </>
          }
        />
        <p>
          Applying the resolution of identity to a single <Tex>{String.raw`|\alpha\rangle`}</Tex> and substituting the
          overlap makes overcompleteness explicit — one coherent state expanded over all the others:
        </p>
        <EqBlock label="23">{String.raw`|\alpha\rangle = \pi^{-1}\int d^{2}\beta\,|\beta\rangle\,\exp\!\big(-\tfrac{1}{2}|\alpha|^{2} - \tfrac{1}{2}|\beta|^{2} + \beta^{*}\alpha\big)`}</EqBlock>

        <Derivation title="Prove completeness, the overlap, and overcompleteness">
          <Step title="Completeness by number-basis integration">
            Insert Eq.&nbsp;(11) into <Tex>{String.raw`\int d^{2}\alpha\,|\alpha\rangle\langle\alpha|`}</Tex>. The polar
            measure (Eq.&nbsp;18) separates into a phase integral and a radial integral (Eq.&nbsp;19). The phase integral{" "}
            <Tex>{String.raw`\int_0^{2\pi}e^{i(n'-n)\phi}\,d\phi=2\pi\delta_{nn'}`}</Tex> kills off-diagonal terms; the
            radial integral <Tex>{String.raw`\int_0^\infty|\alpha|^{2n+1}e^{-|\alpha|^2}\,d|\alpha|=n!/2`}</Tex> cancels{" "}
            <Tex>{String.raw`1/n!`}</Tex>, leaving <Tex>{String.raw`\pi\sum_n|n\rangle\langle n|=\pi\cdot 1`}</Tex>{" "}
            (Eq.&nbsp;20). Divide by <Tex>{String.raw`\pi`}</Tex> for Eq.&nbsp;(17).
          </Step>
          <Step title="Compute the overlap ⟨β|α⟩">
            Use the number expansions for both states:{" "}
            <Tex>{String.raw`\langle\beta|\alpha\rangle = e^{-\tfrac12|\alpha|^2-\tfrac12|\beta|^2}\sum_n (\beta^{*})^n\alpha^n/n! = e^{-\tfrac12|\alpha|^2-\tfrac12|\beta|^2}e^{\beta^{*}\alpha}`}</Tex>{" "}
            (Eq.&nbsp;21). Take the modulus squared:{" "}
            <Tex>{String.raw`|\langle\beta|\alpha\rangle|^2 = e^{-|\alpha|^2-|\beta|^2+2\mathrm{Re}(\beta^{*}\alpha)} = e^{-|\beta-\alpha|^2}`}</Tex>{" "}
            (Eq.&nbsp;22).
          </Step>
          <Step title="Overcompleteness from completeness + non-orthogonality">
            Apply Eq.&nbsp;(17) to a single state:{" "}
            <Tex>{String.raw`|\alpha\rangle = \pi^{-1}\int d^{2}\beta\,|\beta\rangle\langle\beta|\alpha\rangle`}</Tex>,
            then substitute the overlap Eq.&nbsp;(21) to get Eq.&nbsp;(23). Each coherent state is a continuous
            superposition of all the others — the redundancy that powers the{" "}
            <Tex>{String.raw`P`}</Tex>-representation.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Overcomplete = generously redundant">
          Orthonormal bases have exactly as many vectors as dimensions. Coherent states have a continuum&rsquo;s worth
          in a countable-dimension space — too many. That surplus is a feature: it guarantees that any operator or
          density matrix can be written as a smooth integral over{" "}
          <Tex>{String.raw`|\alpha\rangle\langle\alpha|`}</Tex> (the <Tex>{String.raw`P`}</Tex>- and{" "}
          <Tex>{String.raw`R`}</Tex>-representations).
        </Callout>
        <Callout kind="warning" title="Overlap conjugation pattern">
          The cross term in <Tex>{String.raw`\langle\beta|\alpha\rangle`}</Tex> is <Tex>{String.raw`\beta^{*}\alpha`}</Tex>{" "}
          (Eq.&nbsp;21), <em>not</em> <Tex>{String.raw`\beta\alpha^{*}`}</Tex>. Get it backwards and the Gaussian-overlap
          formula Eq.&nbsp;(22) and every downstream <Tex>{String.raw`P`}</Tex>-representation Fourier transform will
          carry the wrong sign in the exponent.
        </Callout>
      </Section>

      <Section title="Radiation from a classical current: a c-number source makes a coherent state">
        <Intuition>
          Here is the dynamical justification for &ldquo;coherent.&rdquo; Drive the quantized field with a{" "}
          <em>prescribed classical</em> current <Tex>{String.raw`\mathbf{J}(\mathbf r,t)`}</Tex> — a c-number, exactly
          what a classical antenna is — and the field is left in a multimode coherent state. The vacuum is displaced
          into <Tex>{String.raw`|\{\alpha_k\}\rangle`}</Tex>, with each mode&rsquo;s amplitude{" "}
          <Tex>{String.raw`\alpha_k`}</Tex> equal to the Fourier component of the driving current at that mode&rsquo;s
          frequency. This is the quantum-field statement of the obvious classical fact that an oscillating current
          radiates a coherent wave. The derivation is operator algebra at its prettiest: because the relevant
          commutators are c-numbers, time-ordering produces only an overall (unobservable) phase, and the evolution
          collapses to a product of single-mode displacement operators on the vacuum.
        </Intuition>
        <p>
          The natural state of a many-mode field is an outer product of single-mode coherent states, one per mode, each
          an eigenstate of its own annihilation operator, with multimode completeness following mode-by-mode:
        </p>
        <EqBlock label="24">{String.raw`|\{\alpha_{k}\}\rangle \equiv \prod_{k}|\alpha_{k}\rangle`}</EqBlock>
        <EqBlock label="25">{String.raw`a_{k}\,|\{\alpha_{k}\}\rangle = \alpha_{k}\,|\{\alpha_{k}\}\rangle`}</EqBlock>
        <EqBlock label="26">{String.raw`\int \prod_{k}\frac{d^{2}\alpha_{k}}{\pi}\,|\{\alpha_{k}\}\rangle\langle\{\alpha_{k}\}| = 1`}</EqBlock>
        <p>
          Build the interaction from the mode expansion of the vector-potential operator and couple it to the classical
          current:
        </p>
        <EqBlock label="27">{String.raw`\mathbf{A}(\mathbf{r},t) = c\sum_{k}\left(\frac{2\pi\hbar}{\Omega_{k}}\right)^{1/2}\big[\mathbf{u}_{k}(\mathbf{r})\,a_{k}\,e^{-i\Omega_{k}t} + \text{adjoint}\big]`}</EqBlock>
        <KeyResult
          number="28"
          eq={String.raw`\mathcal{V}'(t) = -\frac{1}{c}\int \mathbf{J}(\mathbf{r},t)\cdot \mathbf{A}(\mathbf{r},t)\,d^{3}r`}
          label="Classical-current interaction"
          note={
            <>
              The current <Tex>{String.raw`\mathbf J`}</Tex> is a c-number, prescribed, not dynamical, so{" "}
              <Tex>{String.raw`\mathcal V'`}</Tex> is linear in <Tex>{String.raw`a_k`}</Tex> and{" "}
              <Tex>{String.raw`a_k^{\dagger}`}</Tex> — the hallmark of a displacement-type interaction.
            </>
          }
        />
        <p>The interaction-picture time evolution is</p>
        <EqBlock label="29">{String.raw`|\psi(t)\rangle = \exp\!\left[-\frac{i}{\hbar}\!\int_{0}^{t} dt'\,\mathcal{V}'(t')\right]|\psi(0)\rangle`}</EqBlock>
        <p>
          Because the commutators are c-numbers, this factorizes (up to an overall phase) into a product of single-mode
          displacement operators:
        </p>
        <EqBlock label="30">{String.raw`\exp\!\left[-\frac{i}{\hbar}\int_{0}^{t} dt'\,\mathcal{V}'(t')\right] = \prod_{k}\exp\!\big(\alpha_{k}a_{k}^{\dagger} - \alpha_{k}^{*}a_{k}\big)`}</EqBlock>
        <p>
          and identifies each mode amplitude as the space-time Fourier component of the driving current — the result of
          this section:
        </p>
        <KeyResult
          number="31"
          eq={String.raw`\alpha_{k} = i(2\hbar\Omega_{k})^{1/2}\int_{0}^{t} dt'\int d^{3}r\,\mathbf{u}_{k}^{*}(\mathbf{r})\cdot \mathbf{J}(\mathbf{r},t')\,e^{i\Omega_{k}t'}`}
          label="Mode amplitude = current's Fourier component"
        />
        <p>The algebraic engine is the Baker–Campbell–Hausdorff disentangling identity, valid when the commutator is a c-number:</p>
        <EqBlock label="32">{String.raw`e^{A+B} = e^{A}\,e^{B}\,e^{-\frac{1}{2}[A,B]}`}</EqBlock>
        <p>
          Acting the displacement product on the vacuum (using <Tex>{String.raw`a_k|0\rangle=0`}</Tex>) leaves precisely
          a multimode coherent state:
        </p>
        <KeyResult
          number="33"
          eq={String.raw`|\psi(t)\rangle = \prod_{k}\exp\!\big(\alpha_{k}a_{k}^{\dagger} - \alpha_{k}^{*}a_{k}\big)|0\rangle = \prod_{k}\exp\!\big(\alpha_{k}a_{k}^{\dagger}\big)\exp\!\big(-\tfrac{1}{2}\alpha_{k}\alpha_{k}^{*}\big)|0\rangle_{k} = |\{\alpha_{k}\}\rangle`}
          label="A classical current radiates a coherent state"
        />

        <Figure
          caption={
            <>
              A classical (c-number) current <Tex>{String.raw`\mathbf J(\mathbf r,t)`}</Tex> drives the quantized field
              and leaves it in a multimode coherent state; each mode amplitude{" "}
              <Tex>{String.raw`\alpha_k`}</Tex> is the current&rsquo;s Fourier component at frequency{" "}
              <Tex>{String.raw`\Omega_k`}</Tex> (Eq.&nbsp;31).
            </>
          }
        >
          <svg viewBox="0 0 480 150" width="100%" style={{ maxWidth: 480 }}>
            {/* oscillating current source */}
            <rect x="14" y="55" width="96" height="40" rx="6" fill="#eef2ff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="62" y="72" textAnchor="middle" fontSize="12" fill="#1b2330" fontWeight="600">
              classical
            </text>
            <text x="62" y="88" textAnchor="middle" fontSize="12" fill="#1b2330">
              current J(r,t)
            </text>
            {/* radiating wave */}
            <path
              d="M120 75 q 12 -22 24 0 q 12 22 24 0 q 12 -22 24 0 q 12 22 24 0 q 12 -22 24 0"
              fill="none"
              stroke="#0891b2"
              strokeWidth="2"
            />
            <polygon points="240,75 230,69 230,81" fill="#0891b2" />
            {/* output coherent state */}
            <circle cx="330" cy="75" r="36" fill="#4f46e522" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="330" y="71" textAnchor="middle" fontSize="15" fill="#1b2330" fontWeight="600">
              |{"{"}α_k{"}"}⟩
            </text>
            <text x="330" y="90" textAnchor="middle" fontSize="11" fill="#5b6473">
              coherent state
            </text>
            <text x="330" y="128" textAnchor="middle" fontSize="11" fill="#5b6473">
              α_k = Fourier[J](Ω_k)
            </text>
            <text x="180" y="42" textAnchor="middle" fontSize="11" fill="#5b6473">
              radiated field
            </text>
          </svg>
        </Figure>

        <Derivation title="Show a classical current produces coherent light">
          <Step title="Set up the classical-current interaction">
            Couple a prescribed c-number current to the quantized vector potential (Eq.&nbsp;27) via{" "}
            <Tex>{String.raw`\mathcal V'(t)=-(1/c)\int\mathbf J\cdot\mathbf A\,d^{3}r`}</Tex> (Eq.&nbsp;28). Since{" "}
            <Tex>{String.raw`\mathbf J`}</Tex> is not an operator, <Tex>{String.raw`\mathcal V'`}</Tex> is linear in{" "}
            <Tex>{String.raw`a_k,a_k^{\dagger}`}</Tex>.
          </Step>
          <Step title="Why time-ordering reduces to a phase">
            The exact evolution Eq.&nbsp;(29) is a time-ordered exponential. Because{" "}
            <Tex>{String.raw`\mathcal V'(t)`}</Tex> is linear in <Tex>{String.raw`a,a^{\dagger}`}</Tex> and{" "}
            <Tex>{String.raw`[a,a^{\dagger}]=1`}</Tex> is a c-number, the commutator{" "}
            <Tex>{String.raw`[\mathcal V'(t_1),\mathcal V'(t_2)]`}</Tex> is a c-number too. Time-ordering then
            contributes only an overall (unobservable) phase, so the ordered exponential equals the simple exponential
            up to that phase.
          </Step>
          <Step title="Disentangle with BCH">
            Apply Eq.&nbsp;(32) to each mode&rsquo;s exponent{" "}
            <Tex>{String.raw`\alpha a^{\dagger}-\alpha^{*}a`}</Tex>. This factorizes the evolution into a product of
            single-mode displacement operators (Eq.&nbsp;30) and identifies{" "}
            <Tex>{String.raw`\alpha_k`}</Tex> as the current&rsquo;s Fourier component (Eq.&nbsp;31).
          </Step>
          <Step title="Act on vacuum to get the coherent state">
            With the field starting in vacuum,{" "}
            <Tex>{String.raw`\exp(\alpha_k a_k^{\dagger}-\alpha_k^{*}a_k)|0\rangle = \exp(\alpha_k a_k^{\dagger})e^{-\tfrac12|\alpha_k|^2}|0\rangle = |\alpha_k\rangle`}</Tex>{" "}
            (since <Tex>{String.raw`a_k|0\rangle=0`}</Tex>). The product over modes is the multimode coherent state{" "}
            <Tex>{String.raw`|\{\alpha_k\}\rangle`}</Tex> (Eq.&nbsp;33).
          </Step>
        </Derivation>

        <Callout kind="insight" title="Classical current in, coherent state out">
          Drive the quantum field with a classical (c-number) current and you get a coherent state whose mode amplitudes
          are the current&rsquo;s Fourier components (Eq.&nbsp;31). This is the field-theoretic version of &ldquo;an
          antenna radiates a coherent wave&rdquo; and the deepest justification for modeling laser output as coherent.
        </Callout>
        <Callout kind="warning" title="Mind the factors in Eq. (31)">
          Watch the prefactor <Tex>{String.raw`i(2\hbar\Omega_k)^{1/2}`}</Tex> and the sign of{" "}
          <Tex>{String.raw`e^{i\Omega_k t'}`}</Tex>; the mode function enters as its complex conjugate{" "}
          <Tex>{String.raw`\mathbf u_k^{*}(\mathbf r)`}</Tex>. These fix the amplitude and phase the current imprints on
          the field.
        </Callout>
      </Section>

      <Section title="Density-operator expansions: the P- and R-representations and thermal light">
        <Intuition>
          Coherent states are useful not just as states but as a <em>basis</em> for everything else. We develop two
          expansions of an arbitrary density operator <Tex>{String.raw`\rho`}</Tex>: the{" "}
          <Tex>{String.raw`R`}</Tex>-representation, built from the full off-diagonal matrix elements{" "}
          <Tex>{String.raw`\langle\alpha|\rho|\beta\rangle`}</Tex>, and — the star of the chapter — the{" "}
          <Tex>{String.raw`P`}</Tex>-representation, which writes <Tex>{String.raw`\rho`}</Tex> as a{" "}
          <em>diagonal</em> overlay of coherent-state projectors with a quasi-probability weight{" "}
          <Tex>{String.raw`P(\alpha)`}</Tex>. Its magic: expectation values of <em>normally-ordered</em> operators
          reduce to classical-looking averages. The capstone is computing <Tex>{String.raw`P(\alpha)`}</Tex> for
          thermal light and finding a clean Gaussian — so that laser light is a sharp spike in the{" "}
          <Tex>{String.raw`\alpha`}</Tex>-plane while thermal light is a broad smear. The shape of{" "}
          <Tex>{String.raw`P(\alpha)`}</Tex> <em>is</em> the coherence of the light.
        </Intuition>
        <p>Start by sandwiching <Tex>{String.raw`\rho`}</Tex> with resolutions of the identity, first in the number basis:</p>
        <EqBlock label="34">{String.raw`\rho = \mathscr{I}\,\rho\,\mathscr{I} = \sum_{n}\sum_{m}|n\rangle\langle n|\rho|m\rangle\langle m|`}</EqBlock>
        <p>and then with two coherent-state resolutions, which defines the <Tex>{String.raw`R`}</Tex>-function:</p>
        <EqBlock label="35">{String.raw`\rho = \pi^{-2}\!\int d^{2}\alpha\!\int d^{2}\beta\,|\alpha\rangle\langle\alpha|\rho|\beta\rangle\langle\beta| = \pi^{-2}\!\int d^{2}\alpha\!\int d^{2}\beta\,R(\alpha^{*},\beta)\,e^{-\tfrac{1}{2}|\alpha|^{2}-\tfrac{1}{2}|\beta|^{2}}|\alpha\rangle\langle\beta|`}</EqBlock>
        <EqBlock label="36">{String.raw`R(\alpha^{*},\beta) = \langle\alpha|\rho|\beta\rangle\,\exp\!\big(\tfrac{1}{2}|\alpha|^{2} + \tfrac{1}{2}|\beta|^{2}\big)`}</EqBlock>
        <p>
          As a double power series, <Tex>{String.raw`R`}</Tex> is a generating function for the number-basis density
          matrix:
        </p>
        <EqBlock label="37">{String.raw`R(\alpha^{*},\beta) = \sum_{n}\sum_{m}\frac{(\alpha^{*})^{n}\beta^{m}}{\sqrt{n!\,m!}}\,\rho_{nm}`}</EqBlock>
        <p>
          For a thermal mode at temperature <Tex>{String.raw`T`}</Tex> the density matrix is diagonal, with Boltzmann
          weights:
        </p>
        <EqBlock label="38">{String.raw`\rho_{nm} = \frac{\exp(-\hbar\Omega/k_{B}T)\,\delta_{nm}}{\mathrm{Tr}[\exp(-\hbar\Omega\,a^{\dagger}a/k_{B}T)]}`}</EqBlock>
        <EqBlock label="39">{String.raw`\rho_{nm} = \exp(-n\hbar\Omega/k_{B}T)\,\big[1 - \exp(-\hbar\Omega/k_{B}T)\big]\,\delta_{nm}`}</EqBlock>
        <p>so the thermal <Tex>{String.raw`R`}</Tex>-function sums to a clean exponential in <Tex>{String.raw`\alpha^{*}\beta`}</Tex>:</p>
        <EqBlock label="40">{String.raw`R(\alpha^{*},\beta) = \big[1 - e^{-\hbar\Omega/k_{B}T}\big]\sum_{n}\frac{(\alpha^{*}\beta)^{n}}{n!}e^{-n\hbar\Omega/k_{B}T} = \big[1 - e^{-\hbar\Omega/k_{B}T}\big]\exp\!\big[\alpha^{*}\beta\,e^{-\hbar\Omega/k_{B}T}\big]`}</EqBlock>

        <p>
          The diagonal alternative — the central object of laser statistics — is the{" "}
          <Tex>{String.raw`P`}</Tex>-representation:
        </p>
        <KeyResult
          number="41"
          eq={String.raw`\rho = \int d^{2}\alpha\,P(\alpha)\,|\alpha\rangle\langle\alpha|`}
          label="The P-representation"
        />
        <p>
          Its power is that for normally-ordered operators (all <Tex>{String.raw`a^{\dagger}`}</Tex> to the left of all{" "}
          <Tex>{String.raw`a`}</Tex>), the quantum average becomes a classical-looking integral of{" "}
          <Tex>{String.raw`P(\alpha)`}</Tex> against the c-number function{" "}
          <Tex>{String.raw`\mathscr O(\alpha)=\langle\alpha|\mathscr O|\alpha\rangle`}</Tex>:
        </p>
        <KeyResult
          number="42"
          eq={String.raw`\langle\mathscr{O}\rangle = \mathrm{Tr}(\rho\,\mathscr{O}) = \int d^{2}\alpha\,P(\alpha)\,\langle\alpha|\mathscr{O}|\alpha\rangle = \int d^{2}\alpha\,P(\alpha)\,\mathscr{O}(\alpha)`}
          label="Normally-ordered averages go classical"
        />
        <p>The normal-ordering notation makes the recipe &ldquo;replace <Tex>{String.raw`a\to\alpha,\ a^{\dagger}\to\alpha^{*}`}</Tex>&rdquo; precise:</p>
        <EqBlock label="43–44">{String.raw`\mathscr{O}^{(n)}(\alpha) = \langle\alpha|\mathscr{O}|\alpha\rangle, \qquad \rho^{(n)}(a,a^{\dagger}) = \sum_{n}\sum_{m}\rho_{nm}^{(n)}\,a^{\dagger n}a^{m}`}</EqBlock>
        <EqBlock label="45">{String.raw`\langle\mathscr{O}\rangle = \mathrm{Tr}\Big(\sum_{n}\sum_{m}\rho_{nm}^{(n)}a^{\dagger n}a^{m}\Big) = \int d^{2}\alpha\,\sum_{n}\sum_{m}\rho_{nm}^{(n)}(\alpha^{*})^{n}\alpha^{m}\,P(\alpha) = \int d^{2}\alpha\,P(\alpha)\,\mathscr{O}(\alpha)`}</EqBlock>
        <p>
          Formally inverting, <Tex>{String.raw`P(\alpha)`}</Tex> is the normally-ordered density operator with operators
          replaced by c-numbers:
        </p>
        <EqBlock label="46">{String.raw`P(\alpha) = \sum_{n}\sum_{m}\rho_{nm}^{(n)}\,\alpha^{n}\alpha^{*m} = \rho^{(n)}(\alpha,\alpha^{*})`}</EqBlock>
        <p>
          More usefully, the diagonal matrix element <Tex>{String.raw`\langle\alpha|\rho|\alpha\rangle`}</Tex> is the{" "}
          <em>convolution</em> of <Tex>{String.raw`P`}</Tex> with the Gaussian overlap (Eq.&nbsp;22):
        </p>
        <EqBlock label="47">{String.raw`\langle\alpha|\rho|\alpha\rangle = \int d^{2}\beta\,P(\beta)\,|\langle\alpha|\beta\rangle|^{2} = \int d^{2}\beta\,P(\beta)\,\exp\!\big(-|\alpha-\beta|^{2}\big)`}</EqBlock>
        <p>To extract <Tex>{String.raw`P`}</Tex>, undo this convolution by Fourier transform, using the transform of the Gaussian kernel:</p>
        <EqBlock label="48">{String.raw`\mathscr{F}\{\exp(-|\alpha|^{2})\} = \pi\exp\!\big(-\tfrac{1}{4}k^{2}\big)`}</EqBlock>
        <KeyResult
          number="49"
          eq={String.raw`P(\beta) = \mathscr{F}^{-1}\!\left\{\frac{\mathscr{F}\{\langle\alpha|\rho|\alpha\rangle\}}{\mathscr{F}\{\exp(-|\alpha|^{2})\}}\right\}`}
          label="Deconvolution inversion formula"
        />

        <p>
          Now the capstone. Insert the Bose–Einstein density matrix into the diagonal element and sum the
          Poisson-weighted geometric series to a Gaussian:
        </p>
        <EqBlock label="50">{String.raw`\langle\alpha|\rho|\alpha\rangle = \big[1 - e^{-x}\big]\sum_{n}e^{-nx}\,\langle\alpha|n\rangle\langle n|\alpha\rangle = \big[1 - e^{-x}\big]\exp\!\big[-|\alpha|^{2}(1 - e^{-x})\big], \quad x \equiv \hbar\Omega/k_{B}T`}</EqBlock>
        <p>identify the Bose–Einstein (Planck) mean photon number and the cleaning identity:</p>
        <EqBlock label="51">{String.raw`\langle n\rangle = \frac{1}{e^{x} - 1} = \frac{1}{e^{\hbar\Omega/k_{B}T} - 1}`}</EqBlock>
        <EqBlock label="52">{String.raw`1 - e^{-x} = (\langle n\rangle + 1)^{-1}`}</EqBlock>
        <p>so the diagonal element becomes a normalized Gaussian whose width grows with <Tex>{String.raw`\langle n\rangle`}</Tex>:</p>
        <EqBlock>{String.raw`\langle\alpha|\rho|\alpha\rangle = (\langle n\rangle + 1)^{-1}\exp\!\big[-|\alpha|^{2}/(\langle n\rangle + 1)\big]`}</EqBlock>
        <p>Fourier transform it, divide by the kernel transform, and invert:</p>
        <EqBlock label="53">{String.raw`\mathscr{F}\{\langle\alpha|\rho|\alpha\rangle\} = (\langle n\rangle + 1)^{-1}\,\pi\,\exp\!\big[-\tfrac{1}{4}k^{2}(\langle n\rangle + 1)\big], \quad |\alpha|^{2} = \mathrm{Re}(\alpha)^{2} + \mathrm{Im}(\alpha)^{2}`}</EqBlock>
        <EqBlock label="54">{String.raw`\mathscr{F}\{\exp(-|\alpha|^{2})\} = \pi\exp\!\big(-\tfrac{1}{4}k^{2}\big)`}</EqBlock>
        <KeyResult
          number="55"
          eq={String.raw`P(\alpha)_{\text{thermal}} = \mathscr{F}^{-1}\!\big\{\exp(-\tfrac{1}{4}k^{2}\langle n\rangle)\big\} = (\pi\langle n\rangle)^{-1}\exp\!\big(-|\alpha|^{2}/\langle n\rangle\big)`}
          label="Thermal P-distribution: a Gaussian of width ⟨n⟩"
        />
        <p>
          Contrast this with a pure coherent (ideal laser) state{" "}
          <Tex>{String.raw`\rho=|\alpha_0\rangle\langle\alpha_0|`}</Tex>, whose{" "}
          <Tex>{String.raw`P`}</Tex>-function is a two-dimensional delta function:
        </p>
        <KeyResult
          number="56"
          eq={String.raw`P(\alpha)_{\text{coherent}} = \delta^{2}(\alpha - \alpha_{0})`}
          label="Coherent P-distribution: a single sharp spike"
          note={
            <>
              Laser <Tex>{String.raw`=`}</Tex> a spike; thermal <Tex>{String.raw`=`}</Tex> a broad Gaussian. This is the
              quantitative coherent-vs-chaotic distinction of Fig.&nbsp;15-4.
            </>
          }
        />

        <Derivation title="Build R and P, and compute the thermal distribution">
          <Step title="Build R and P from resolutions of identity">
            Sandwich <Tex>{String.raw`\rho`}</Tex> with coherent-state resolutions (Eq.&nbsp;35) to define{" "}
            <Tex>{String.raw`R(\alpha^{*},\beta)=\langle\alpha|\rho|\beta\rangle e^{\tfrac12(|\alpha|^2+|\beta|^2)}`}</Tex>{" "}
            (Eq.&nbsp;36), a generating function for <Tex>{String.raw`\rho_{nm}`}</Tex> (Eq.&nbsp;37). The diagonal
            alternative is the <Tex>{String.raw`P`}</Tex>-representation (Eq.&nbsp;41).
          </Step>
          <Step title="Normally-ordered averages become classical integrals">
            Take <Tex>{String.raw`\mathrm{Tr}(\rho\mathscr O)`}</Tex> with <Tex>{String.raw`\mathscr O`}</Tex> normally
            ordered. Using cyclicity of the trace and{" "}
            <Tex>{String.raw`a|\alpha\rangle=\alpha|\alpha\rangle`}</Tex>, every{" "}
            <Tex>{String.raw`a\to\alpha`}</Tex> and <Tex>{String.raw`a^{\dagger}\to\alpha^{*}`}</Tex>, so{" "}
            <Tex>{String.raw`\langle\mathscr O\rangle=\int d^{2}\alpha\,P(\alpha)\mathscr O(\alpha)`}</Tex>{" "}
            (Eqs.&nbsp;42–45).
          </Step>
          <Step title="Invert the convolution to get P">
            The diagonal element is the convolution of <Tex>{String.raw`P`}</Tex> with{" "}
            <Tex>{String.raw`e^{-|\alpha-\beta|^2}`}</Tex> (Eq.&nbsp;47). Fourier-transform both sides, use{" "}
            <Tex>{String.raw`\mathscr F\{e^{-|\alpha|^2}\}=\pi e^{-k^2/4}`}</Tex> (Eq.&nbsp;48), divide, and inverse
            transform for Eq.&nbsp;(49).
          </Step>
          <Step title="Thermal P(α): the capstone">
            Insert the Bose–Einstein density matrix (Eqs.&nbsp;38–39) into{" "}
            <Tex>{String.raw`\langle\alpha|\rho|\alpha\rangle`}</Tex>, sum the Poisson-weighted geometric series to a
            Gaussian (Eq.&nbsp;50), identify{" "}
            <Tex>{String.raw`\langle n\rangle=1/(e^{\hbar\Omega/k_BT}-1)`}</Tex> (Eq.&nbsp;51) and{" "}
            <Tex>{String.raw`1-e^{-x}=(\langle n\rangle+1)^{-1}`}</Tex> (Eq.&nbsp;52). Fourier transform (Eq.&nbsp;53),
            divide by the kernel (Eq.&nbsp;54), and invert to land{" "}
            <Tex>{String.raw`P(\alpha)=(\pi\langle n\rangle)^{-1}e^{-|\alpha|^2/\langle n\rangle}`}</Tex>{" "}
            (Eq.&nbsp;55).
          </Step>
          <Step title="Coherent vs. thermal: delta vs. Gaussian">
            For a pure coherent state, <Tex>{String.raw`P(\alpha)=\delta^{2}(\alpha-\alpha_0)`}</Tex> (Eq.&nbsp;56).
            Compared with the broad thermal Gaussian Eq.&nbsp;(55): a single sharp point vs. a smeared cloud. This is
            the precise statement of how laser light differs from thermal light.
          </Step>
        </Derivation>

        <Callout kind="insight" title="P(α) is the dial between laser and lamp">
          Same machinery, two opposite limits: laser/coherent light{" "}
          <Tex>{String.raw`\to P(\alpha)=\delta^{2}(\alpha-\alpha_0)`}</Tex>, an infinitely sharp spike; thermal/chaotic
          light <Tex>{String.raw`\to P(\alpha)=(\pi\langle n\rangle)^{-1}e^{-|\alpha|^{2}/\langle n\rangle}`}</Tex>, a
          broad Gaussian. The shape of <Tex>{String.raw`P(\alpha)`}</Tex> <em>is</em> the coherence of the light.
        </Callout>
        <Callout kind="warning" title="Normal ordering is required">
          The clean classical average <Tex>{String.raw`\langle\mathscr O\rangle=\int P(\alpha)\mathscr O(\alpha)\,d^{2}\alpha`}</Tex>{" "}
          (Eq.&nbsp;42) holds <em>only</em> for normally-ordered operators (<Tex>{String.raw`a^{\dagger}`}</Tex> left of{" "}
          <Tex>{String.raw`a`}</Tex>). For other orderings you must reorder first using{" "}
          <Tex>{String.raw`[a,a^{\dagger}]=1`}</Tex>, which adds extra terms.
        </Callout>
        <Callout kind="note" title="Width of thermal P grows with temperature">
          The thermal Gaussian&rsquo;s variance is{" "}
          <Tex>{String.raw`\langle n\rangle=1/(e^{\hbar\Omega/k_BT}-1)`}</Tex>. Hotter{" "}
          <Tex>{String.raw`\to`}</Tex> larger <Tex>{String.raw`\langle n\rangle`}</Tex>{" "}
          <Tex>{String.raw`\to`}</Tex> broader <Tex>{String.raw`P`}</Tex>{" "}
          <Tex>{String.raw`\to`}</Tex> less coherent. At <Tex>{String.raw`T\to 0`}</Tex>,{" "}
          <Tex>{String.raw`\langle n\rangle\to 0`}</Tex> and <Tex>{String.raw`P`}</Tex> collapses toward the vacuum
          delta at <Tex>{String.raw`\alpha=0`}</Tex>.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from the coherent state">
          <ul>
            <li>
              A coherent state is <strong>the eigenstate of the annihilation operator</strong>,{" "}
              <Tex>{String.raw`a|\alpha\rangle=\alpha|\alpha\rangle`}</Tex> (Eq.&nbsp;12), with{" "}
              <Tex>{String.raw`\alpha=\tfrac12 E_0 e^{-i\phi}`}</Tex> encoding classical amplitude and phase — the
              working definition you will reuse constantly.
            </li>
            <li>
              <strong>Poisson photon statistics</strong>:{" "}
              <Tex>{String.raw`P_n=e^{-|\alpha|^2}|\alpha|^{2n}/n!`}</Tex> with{" "}
              <Tex>{String.raw`\langle n\rangle=|\alpha|^2`}</Tex> and <Tex>{String.raw`\Delta n=|\alpha|`}</Tex>{" "}
              (Eqs.&nbsp;13–14) — the benchmark for laser photon statistics (Chap.&nbsp;XVI) and the thermal case.
            </li>
            <li>
              The <strong>displacement construction</strong>{" "}
              <Tex>{String.raw`|\alpha\rangle=\exp(\alpha a^{\dagger}-\tfrac12|\alpha|^2)|0\rangle=\exp(\alpha a^{\dagger}-\alpha^{*}a)|0\rangle`}</Tex>{" "}
              (Eq.&nbsp;15) and the <strong>BCH identity</strong>{" "}
              <Tex>{String.raw`e^{A+B}=e^A e^B e^{-\tfrac12[A,B]}`}</Tex> (Eq.&nbsp;32) are reusable for any
              linear-in-<Tex>{String.raw`a,a^{\dagger}`}</Tex> Hamiltonian.
            </li>
            <li>
              Coherent states are normalized but <strong>non-orthogonal</strong>,{" "}
              <Tex>{String.raw`|\langle\beta|\alpha\rangle|^2=e^{-|\beta-\alpha|^2}`}</Tex> (Eqs.&nbsp;21–22), and{" "}
              <strong>overcomplete</strong>, <Tex>{String.raw`\pi^{-1}\int d^{2}\alpha\,|\alpha\rangle\langle\alpha|=1`}</Tex>{" "}
              (Eq.&nbsp;17) — the overcompleteness is what makes the <Tex>{String.raw`P`}</Tex>-representation possible.
            </li>
            <li>
              A <strong>classical current radiates a coherent state</strong>, each mode amplitude{" "}
              <Tex>{String.raw`\alpha_k`}</Tex> the current&rsquo;s Fourier component (Eqs.&nbsp;30–31,&nbsp;33) — the
              justification for modeling laser/antenna output as coherent.
            </li>
            <li>
              The <strong><Tex>{String.raw`P`}</Tex>-representation</strong>{" "}
              <Tex>{String.raw`\rho=\int d^{2}\alpha\,P(\alpha)|\alpha\rangle\langle\alpha|`}</Tex> (Eq.&nbsp;41) turns
              normally-ordered averages into classical integrals (Eq.&nbsp;42) — master tool for later laser statistics.
            </li>
            <li>
              <strong>Coherent vs. thermal is delta vs. Gaussian</strong> in the{" "}
              <Tex>{String.raw`\alpha`}</Tex>-plane:{" "}
              <Tex>{String.raw`P_{\text{coh}}=\delta^{2}(\alpha-\alpha_0)`}</Tex> (Eq.&nbsp;56) vs.{" "}
              <Tex>{String.raw`P_{\text{th}}=(\pi\langle n\rangle)^{-1}e^{-|\alpha|^2/\langle n\rangle}`}</Tex> with{" "}
              <Tex>{String.raw`\langle n\rangle=1/(e^{\hbar\Omega/k_BT}-1)`}</Tex> (Eqs.&nbsp;51,&nbsp;55) — central to
              telling laser from chaotic light in Sec.&nbsp;16-3.
            </li>
            <li>
              <strong>Symbol hygiene</strong>: <Tex>{String.raw`\Omega`}</Tex> is the radiation-mode frequency; the
              oscillator-analogy mass and frequency are <Tex>{String.raw`M`}</Tex> and{" "}
              <Tex>{String.raw`\omega`}</Tex>. Keep these distinct in all later work.
            </li>
          </ul>
          The end-of-chapter problems extend these tools toward coherence theory — positive/negative-frequency field
          parts and the correlation functions <Tex>{String.raw`G^{(n)}`}</Tex>, the displacement-operator generating
          function, the thermal average <Tex>{String.raw`\langle D(\alpha)\rangle=\exp(-\alpha^{*}\alpha\langle n\rangle)`}</Tex>,
          and the harmonic-oscillator thermal density matrix in coordinate space — building toward the quantum laser
          theory of the chapters ahead.
        </Callout>
      </Section>
    </Lesson>
  );
}
