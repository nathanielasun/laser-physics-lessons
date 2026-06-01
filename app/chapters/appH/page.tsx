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
import AppHSim from "@/components/sims/appH";

export default function Page() {
  return (
    <Lesson slug="appH">
      <Lede>
        A single mode of the electromagnetic field is, mathematically, a harmonic oscillator. Quantum mechanics
        forbids it from sitting still at a definite amplitude and phase the way a classical wave does — the field
        quadratures <Tex>{String.raw`q`}</Tex> and <Tex>{String.raw`p`}</Tex> (the cosine and sine parts of the wave)
        obey an uncertainty relation, so the state always carries some irreducible &ldquo;fuzz.&rdquo; This appendix
        answers one question: <em>what is the most classical state such an oscillator can occupy?</em> The answer is
        the <strong>coherent state</strong>, and it turns out to wear three faces that are secretly one — it{" "}
        <em>saturates</em> the uncertainty floor <Tex>{String.raw`\Delta q\,\Delta p=\hbar/2`}</Tex>, it{" "}
        <em>does not spread</em> as it slides back and forth in the well, and its photons follow a{" "}
        <em>Poisson distribution</em>. That is the field a laser well above threshold produces.
      </Lede>

      <Section title="Why minimum uncertainty? The Schwarz inequality and the uncertainty floor">
        <Intuition>
          Before we build the state, we have to say precisely what &ldquo;as classical as possible&rdquo; means. For
          any state, the spreads in the two oscillator quadratures — <Tex>{String.raw`q`}</Tex> (position-like) and{" "}
          <Tex>{String.raw`p`}</Tex> (momentum-like) — cannot both be squeezed to zero at once. Their product has a
          hard floor, <Tex>{String.raw`\hbar/2`}</Tex>, set purely by the commutator{" "}
          <Tex>{String.raw`[q,p]=i\hbar`}</Tex> through the Schwarz inequality of inner-product spaces. The coherent
          state is <em>defined</em> as the state that sits exactly on that floor: it wastes no uncertainty.
        </Intuition>
        <p>
          Work with the fluctuation operators — the deviations of <Tex>{String.raw`q`}</Tex> and{" "}
          <Tex>{String.raw`p`}</Tex> about their means, whose spread is exactly what we want to minimize:
        </p>
        <EqBlock label="1">{String.raw`\Delta q \equiv q - \langle q \rangle, \qquad \Delta p \equiv p - \langle p \rangle.`}</EqBlock>
        <p>
          Because <Tex>{String.raw`\Delta q`}</Tex> and <Tex>{String.raw`\Delta p`}</Tex> are Hermitian, each variance
          is a squared norm, so the product of variances is a product of squared norms — exactly the left-hand side of
          a Schwarz inequality:
        </p>
        <EqBlock label="2">{String.raw`(\Delta q)^2 (\Delta p)^2 = \int_{-\infty}^{\infty} dq\, \psi^*\,(\Delta q)^2\psi \int_{-\infty}^{\infty} dq\, \psi^*\,(\Delta p)^2\psi = \int dq\, (\Delta q\psi)^*(\Delta q\psi) \int dq\, (\Delta p\psi)^*(\Delta p\psi).`}</EqBlock>
        <EqBlock label="3">{String.raw`\int dq\, (\Delta q\psi)^*(\Delta q\psi) \int dq\, (\Delta p\psi)^*(\Delta p\psi) \;\geq\; \Big| \int dq\, (\Delta q\psi)^*(\Delta p\psi)\Big|^2.`}</EqBlock>
        <p>
          The Schwarz inequality is an equality if and only if the two vectors are proportional. Calling the
          (necessarily imaginary) proportionality constant <Tex>{String.raw`iC`}</Tex> with{" "}
          <Tex>{String.raw`C`}</Tex> real gives the differential equation that defines the minimum-uncertainty wave
          function:
        </p>
        <EqBlock label="4">{String.raw`\Delta p\,\psi = iC\,\Delta q\,\psi.`}</EqBlock>
        <p>
          Now squeeze the right-hand overlap. Splitting the product{" "}
          <Tex>{String.raw`\Delta q\,\Delta p`}</Tex> into its antisymmetric (commutator) and symmetric
          (anticommutator) parts, the commutator piece alone supplies the floor:
        </p>
        <EqBlock label="5">{String.raw`\Big|\int dq\,\psi^*\,\Delta q\,\Delta p\,\psi\Big|^2 = \tfrac{1}{4}\Big|\,i\hbar + \Big[\int dq\,\psi^*\,\Delta q\,\Delta p\,\psi + \text{c.c.}\Big]\Big|^2 = \tfrac{1}{4}\hbar^2 + \tfrac{1}{4}\Big[\int dq\,\psi^*(\Delta q\,\Delta p + \Delta p\,\Delta q)\psi\Big]^2 \geq \tfrac{1}{4}\hbar^2.`}</EqBlock>
        <EqBlock label="6">{String.raw`[\Delta q, \Delta p] = [q,p] = i\hbar.`}</EqBlock>
        <p>
          The fluctuation operators inherit the canonical commutator — that is the source of the floor. Putting it
          together gives the Heisenberg uncertainty relation, the inequality the entire appendix is built around:
        </p>
        <KeyResult
          number="7"
          eq={String.raw`(\Delta q)^2 (\Delta p)^2 \geq \tfrac{1}{4}\hbar^2, \qquad \Delta q\,\Delta p \geq \tfrac{1}{2}\hbar.`}
          label="The Heisenberg uncertainty floor"
          note={
            <>
              A coherent state is the state that turns this into an <em>equality</em>,{" "}
              <Tex>{String.raw`\Delta q\,\Delta p = \hbar/2`}</Tex>. Everything else in the appendix follows from
              imposing it.
            </>
          }
        />
        <p>
          Equality in the whole chain requires a second condition as well: the symmetric (anticommutator) cross term
          must vanish, so there is no <Tex>{String.raw`q`}</Tex>–<Tex>{String.raw`p`}</Tex> correlation:
        </p>
        <EqBlock label="8">{String.raw`\int dq\, \psi^*\,(\Delta q\,\Delta p + \Delta p\,\Delta q)\,\psi = 0.`}</EqBlock>

        <Derivation title="From the variances to the two equality conditions">
          <Step title="Recast the variance product as a Schwarz problem">
            Each variance <Tex>{String.raw`\langle(\Delta q)^2\rangle = \int(\Delta q\psi)^*(\Delta q\psi)\,dq`}</Tex>{" "}
            is the squared norm of the vector <Tex>{String.raw`\Delta q\,\psi`}</Tex> (using that{" "}
            <Tex>{String.raw`\Delta q`}</Tex> is Hermitian). The product of variances is therefore a product of squared
            norms — the left side of <Tex>{String.raw`\langle f|f\rangle\langle g|g\rangle \geq |\langle f|g\rangle|^2`}</Tex>:
            <EqBlock>{String.raw`(\Delta q)^2(\Delta p)^2 = \langle \Delta q\psi | \Delta q\psi\rangle\,\langle \Delta p\psi|\Delta p\psi\rangle \geq |\langle \Delta q\psi|\Delta p\psi\rangle|^2.`}</EqBlock>
          </Step>
          <Step title="Separate commutator from anticommutator">
            Write <Tex>{String.raw`\Delta q\,\Delta p = \tfrac12[\Delta q,\Delta p] + \tfrac12\{\Delta q,\Delta p\}`}</Tex>.
            The commutator <Tex>{String.raw`\tfrac12[\Delta q,\Delta p]=\tfrac12 i\hbar`}</Tex> is purely imaginary; the
            anticommutator is Hermitian and contributes a real expectation. Since{" "}
            <Tex>{String.raw`|a+ib|^2=a^2+b^2`}</Tex>, the squared overlap is the sum of the two squared pieces, so it
            is at least the commutator piece <Tex>{String.raw`(\tfrac12\hbar)^2`}</Tex>:
            <EqBlock>{String.raw`|\langle \Delta q\psi|\Delta p\psi\rangle|^2 = \big(\tfrac{1}{2}\hbar\big)^2 + \tfrac{1}{4}\big|\langle\{\Delta q,\Delta p\}\rangle\big|^2 \geq \tfrac{1}{4}\hbar^2.`}</EqBlock>
          </Step>
          <Step title="Read off both equality conditions">
            Equality through the whole chain needs the Schwarz vectors parallel —{" "}
            <Tex>{String.raw`\Delta p\,\psi = iC\,\Delta q\,\psi`}</Tex> (Eq. 4) — <em>and</em> the anticommutator
            expectation to vanish (Eq. 8). These two conditions, solved in the next section, single out a Gaussian.
            <EqBlock>{String.raw`\Delta p\,\psi = iC\,\Delta q\,\psi \quad\text{and}\quad \langle\{\Delta q,\Delta p\}\rangle = 0.`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="Definition of the coherent state">
          A coherent state is, by definition, a state of <em>minimum</em> uncertainty: it makes Eq. (7) an equality,{" "}
          <Tex>{String.raw`\Delta q\,\Delta p = \hbar/2`}</Tex>. Every later property — non-spreading, Poisson photons,
          displaced vacuum — is just a consequence of imposing this one demand.
        </Callout>
        <Callout kind="warning" title="C is i times a real number">
          The proportionality constant in <Tex>{String.raw`\Delta p\,\psi = iC\,\Delta q\,\psi`}</Tex> is{" "}
          <Tex>{String.raw`i`}</Tex> times a <em>real</em> <Tex>{String.raw`C`}</Tex>. As we will see,{" "}
          <Tex>{String.raw`C`}</Tex> fixes the width of the Gaussian; demanding <Tex>{String.raw`C = M\Omega`}</Tex> is
          exactly what later makes the packet refuse to spread.
        </Callout>
      </Section>

      <Section title="H-1: Solving for the minimum-uncertainty Gaussian">
        <Intuition>
          Now solve the equality condition <Tex>{String.raw`\Delta p\,\psi = iC\,\Delta q\,\psi`}</Tex>. Writing{" "}
          <Tex>{String.raw`p`}</Tex> as the differential operator <Tex>{String.raw`-i\hbar\,d/dq`}</Tex> turns it into a
          first-order ODE whose solution is a Gaussian centered at <Tex>{String.raw`\langle q\rangle`}</Tex> with a
          phase ramp set by <Tex>{String.raw`\langle p\rangle`}</Tex>. A single real number{" "}
          <Tex>{String.raw`C`}</Tex> controls the width: a fat blob in <Tex>{String.raw`q`}</Tex> is a thin blob in{" "}
          <Tex>{String.raw`p`}</Tex>, and vice versa.
        </Intuition>
        <p>
          Restore the mean values in the equality condition and substitute{" "}
          <Tex>{String.raw`p = -i\hbar\,d/dq`}</Tex>:
        </p>
        <EqBlock label="9">{String.raw`[p - \langle p\rangle]\psi = iC[q-\langle q\rangle]\psi.`}</EqBlock>
        <EqBlock label="10">{String.raw`\frac{d\psi}{dq} = \Big[\frac{-C}{\hbar}\,q + \Big(\frac{2C}{\hbar}\Big)^{1/2}\chi\Big]\psi(q).`}</EqBlock>
        <p>
          The imaginary units cancel, leaving a real first-order linear ODE. The constant term carries a complex,
          dimensionless displacement <Tex>{String.raw`\chi`}</Tex> — the prototype of the coherent-state amplitude{" "}
          <Tex>{String.raw`\alpha`}</Tex>, with the <Tex>{String.raw`i`}</Tex> riding on{" "}
          <Tex>{String.raw`\langle p\rangle`}</Tex>:
        </p>
        <EqBlock label="11">{String.raw`\chi = (2C\hbar)^{-1/2}\big(C\langle q\rangle + i\langle p\rangle\big).`}</EqBlock>
        <p>Integrating the ODE gives the Gaussian, with normalization constant fixed below:</p>
        <EqBlock label="12">{String.raw`\psi(q) = \mathcal{N}_q\,\exp\!\big[-\tfrac{1}{2}(C/\hbar)q^2 + (2C/\hbar)^{1/2}\chi\, q\big].`}</EqBlock>
        <p>
          Absorb the width into a dimensionless coordinate <Tex>{String.raw`\zeta`}</Tex> and fix the normalization by{" "}
          <Tex>{String.raw`\int|\psi|^2\,dq = 1`}</Tex>:
        </p>
        <EqBlock label="13">{String.raw`\zeta = \Big(\frac{C}{\hbar}\Big)^{1/2} q.`}</EqBlock>
        <EqBlock label="14">{String.raw`\mathcal{N}_\psi = \Big(\frac{C}{\pi\hbar}\Big)^{1/4}\exp\!\big[-\tfrac{1}{4}(\chi+\chi^*)^2\big].`}</EqBlock>
        <p>
          In the dimensionless coordinate the wave function is a Gaussian centered at{" "}
          <Tex>{String.raw`\operatorname{Re}\chi^*`}</Tex> times a pure phase factor, and its modulus-squared is a
          clean normalized Gaussian cloud — the coherent state at one instant:
        </p>
        <EqBlock>{String.raw`\psi(q) = \Big(\frac{C}{\pi\hbar}\Big)^{1/4}\exp\!\big[\tfrac{1}{2}(\chi^2 - \chi\chi^*)\big]\exp\!\big[-\tfrac{1}{2}(\zeta - \sqrt{2}\,\chi)^2\big].`}</EqBlock>
        <KeyResult
          number="15"
          eq={String.raw`|\psi(q)|^2 = \Big(\frac{C}{\pi\hbar}\Big)^{1/2}\exp\!\big[-(\zeta - x_0)^2\big].`}
          label="Minimum-uncertainty probability cloud"
          note={
            <>
              A normalized Gaussian of constant modulus centered at the (dimensionless) classical position{" "}
              <Tex>{String.raw`x_0`}</Tex>.
            </>
          }
        />

        <Derivation title="Integrate the equality condition into a normalized Gaussian">
          <Step title="Turn the equality condition into an ODE">
            Substitute <Tex>{String.raw`p \to -i\hbar\,d/dq`}</Tex> into Eq. (9). The two factors of{" "}
            <Tex>{String.raw`i`}</Tex> combine so the imaginary unit cancels, leaving the real ODE of Eq. (10):
            <EqBlock>{String.raw`-i\hbar\frac{d\psi}{dq} - \langle p\rangle\psi = iC(q-\langle q\rangle)\psi.`}</EqBlock>
          </Step>
          <Step title="Integrate to a Gaussian">
            Integrating <Tex>{String.raw`d\psi/\psi`}</Tex> gives{" "}
            <Tex>{String.raw`\ln\psi = -\tfrac12(C/\hbar)q^2 + (2C/\hbar)^{1/2}\chi q + \text{const}`}</Tex>, i.e. the
            Gaussian of Eq. (12). Completing the square recenters it at <Tex>{String.raw`\chi^*`}</Tex> and exposes a
            pure-phase prefactor.
            <EqBlock>{String.raw`\psi(q) = \mathcal{N}_q \exp\!\big[-\tfrac12 (C/\hbar) q^2 + (2C/\hbar)^{1/2}\chi q\big].`}</EqBlock>
          </Step>
          <Step title="Normalize">
            Impose <Tex>{String.raw`\int_{-\infty}^{\infty}|\psi|^2\,dq = 1`}</Tex>. The Gaussian integral fixes the{" "}
            <Tex>{String.raw`(C/\pi\hbar)^{1/4}`}</Tex> prefactor and the exponential factor of Eq. (14). Forming{" "}
            <Tex>{String.raw`|\psi|^2`}</Tex>, the complex phase pieces cancel, leaving the real Gaussian of Eq. (15)
            with constant area.
            <EqBlock>{String.raw`\int_{-\infty}^{\infty}|\psi(q)|^2\,dq = 1 \;\Rightarrow\; \mathcal{N}_\psi = (C/\pi\hbar)^{1/4}\exp\!\big[-\tfrac{1}{4}(\chi+\chi^*)^2\big].`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="C alone sets the width">
          The Gaussian width in <Tex>{String.raw`q`}</Tex> is <Tex>{String.raw`(\hbar/2C)^{1/2}`}</Tex> and in{" "}
          <Tex>{String.raw`p`}</Tex> is <Tex>{String.raw`(\hbar C/2)^{1/2}`}</Tex>, so their product is exactly{" "}
          <Tex>{String.raw`\hbar/2`}</Tex> for <em>any</em> <Tex>{String.raw`C`}</Tex> — every value of{" "}
          <Tex>{String.raw`C`}</Tex> gives a minimum-uncertainty state at <Tex>{String.raw`t=0`}</Tex>. So{" "}
          <Tex>{String.raw`C`}</Tex> is a free width parameter until the <em>dynamics</em> (next section) forces{" "}
          <Tex>{String.raw`C = M\Omega`}</Tex>.
        </Callout>
      </Section>

      <Section title="H-2a: The harmonic-oscillator Green's function (propagator)">
        <Intuition>
          To watch the Gaussian evolve we need the <strong>propagator</strong>{" "}
          <Tex>{String.raw`G(x,x_0,t)`}</Tex> — the amplitude for a particle at <Tex>{String.raw`x_0`}</Tex> to be found
          at <Tex>{String.raw`x`}</Tex> a time <Tex>{String.raw`t`}</Tex> later. There are two equivalent routes:
          expand a delta function in oscillator eigenstates and resum (the Mehler/Hermite–Gaussian bilinear sum), or
          use the Heisenberg-picture operators <Tex>{String.raw`x(t),p(t)`}</Tex> — which for the oscillator are just
          the classical sinusoidal solutions — to write a first-order PDE for <Tex>{String.raw`G`}</Tex>. Either way
          you land on the famous oscillator kernel: a Gaussian whose phase is the classical action.
        </Intuition>
        <p>
          The propagator is the Green&rsquo;s function of the Schrödinger equation, with a delta initial condition{" "}
          <Tex>{String.raw`G(x,x_0,0)=\delta(x-x_0)`}</Tex>:
        </p>
        <EqBlock label="16">{String.raw`\Big[\mathcal{H} - i\hbar\frac{\partial}{\partial t}\Big]G(x,x_0,t) = i\hbar\,\delta(x-x_0)\,\delta(t).`}</EqBlock>
        <p>By the superposition principle it propagates any initial wave function forward — the engine of this appendix:</p>
        <EqBlock label="17">{String.raw`\psi(x,t) = \int dx_0\, G(x,x_0,t)\,\psi(x_0,0).`}</EqBlock>
        <EqBlock label="18">{String.raw`G(x,x_0,t) = \exp(-i\mathcal{H}t/\hbar)\,\delta(x-x_0).`}</EqBlock>
        <p>
          <strong>Route A (eigenstates).</strong> Expand the evolved state in oscillator eigenfunctions{" "}
          <Tex>{String.raw`u_n`}</Tex> with energies <Tex>{String.raw`(n+\tfrac12)\hbar\Omega`}</Tex>:
        </p>
        <EqBlock label="19">{String.raw`\psi(x,t) = \sum_n C_n u_n(x)\,e^{-in\Omega t}.`}</EqBlock>
        <EqBlock label="20">{String.raw`C_n = \int dx_0\, u_n^*(x_0)\,\psi(x_0,0).`}</EqBlock>
        <EqBlock label="21">{String.raw`G(x,x_0,t) = \sum_n u_n(x)\,u_n^*(x_0)\,e^{-in\Omega t}.`}</EqBlock>
        <p>
          <strong>Route B (Heisenberg).</strong> The oscillator operators obey the <em>classical</em> equations of
          motion, so the Heisenberg position operator oscillates sinusoidally:
        </p>
        <EqBlock label="22, 23">{String.raw`p(t) = M\dot{x}(t), \qquad \dot{p}(t) = -M\Omega^2 x(t).`}</EqBlock>
        <EqBlock label="24, 25">{String.raw`\ddot{x}(t) = -\Omega^2 x(t), \qquad x(t) = x(0)\cos\Omega t + p(0)(M\Omega)^{-1}\sin\Omega t.`}</EqBlock>
        <p>
          At <Tex>{String.raw`t=0`}</Tex> the operator <Tex>{String.raw`x(0)`}</Tex> acting on{" "}
          <Tex>{String.raw`G`}</Tex> picks out <Tex>{String.raw`x_0`}</Tex>; back-evolving turns this into a statement
          about <Tex>{String.raw`x(-t)`}</Tex>:
        </p>
        <EqBlock label="26">{String.raw`x(0)\,G(x,x_0,t) = x_0\,\delta(x-x_0).`}</EqBlock>
        <EqBlock label="26, 27">{String.raw`x(-t)\,G(x,x_0,t) = e^{-i\mathcal{H}t/\hbar}\,x(0)\,e^{i\mathcal{H}t/\hbar}e^{-i\mathcal{H}t/\hbar}\,\delta(x-x_0) = x_0\,G(x,x_0,t).`}</EqBlock>
        <p>
          Writing <Tex>{String.raw`x(-t) = x\cos\Omega t - (M\Omega)^{-1}p\,\sin\Omega t`}</Tex> with{" "}
          <Tex>{String.raw`p = -i\hbar\,\partial/\partial x`}</Tex> converts this into a first-order PDE for{" "}
          <Tex>{String.raw`G`}</Tex>:
        </p>
        <EqBlock label="28">{String.raw`-i\hbar(M\Omega)^{-1}\sin\Omega t\,\frac{\partial G}{\partial x} = (x\cos\Omega t - x_0)\,G.`}</EqBlock>
        <EqBlock>{String.raw`\frac{1}{G}\frac{\partial G}{\partial x} = iM\Omega(\hbar\sin\Omega t)^{-1}(x\cos\Omega t - x_0).`}</EqBlock>
        <EqBlock>{String.raw`\ln(G/G_0) = iM\Omega(\hbar\sin\Omega t)^{-1}\big[\tfrac{1}{2}x^2\cos\Omega t - x x_0\big] + \text{const}.`}</EqBlock>
        <EqBlock>{String.raw`G = G_0 \exp\!\Big[\tfrac{1}{2} iM\Omega(\hbar\sin\Omega t)^{-1}\big(x^2\cos\Omega t - 2 x x_0\big)\Big].`}</EqBlock>
        <p>
          Symmetrizing under <Tex>{String.raw`x\leftrightarrow x_0`}</Tex> restores the{" "}
          <Tex>{String.raw`x_0^2\cos\Omega t`}</Tex> term and gives the oscillator propagator:
        </p>
        <KeyResult
          number="29"
          eq={String.raw`G = \mathcal{N}_G'\,\exp\!\Big[\tfrac{1}{2}iM\Omega(\hbar\sin\Omega t)^{-1}\big\{(x^2+x_0^2)\cos\Omega t - 2 x x_0\big\}\Big].`}
          label="Harmonic-oscillator Green's function"
          note={
            <>
              Symmetric in <Tex>{String.raw`x`}</Tex> and <Tex>{String.raw`x_0`}</Tex>; its phase is{" "}
              <Tex>{String.raw`(i/\hbar)`}</Tex> times the classical action for the trajectory joining{" "}
              <Tex>{String.raw`(x_0,0)`}</Tex> to <Tex>{String.raw`(x,t)`}</Tex>.
            </>
          }
        />
        <p>
          The normalization is fixed by the composition (semigroup) law and the <Tex>{String.raw`t\to0`}</Tex> limit:
        </p>
        <EqBlock>{String.raw`\int dx'\, G(x,x',t')\,G(x',x_0,t'') = G(x,x_0,t'+t'').`}</EqBlock>
        <EqBlock label="30">{String.raw`\mathcal{N}_G' = \Big[\frac{\tfrac{1}{2}M\Omega}{\pi\hbar\,|\sin\Omega t|}\Big]^{1/2}.`}</EqBlock>

        <Figure
          caption={
            <>
              The propagator <Tex>{String.raw`G(x,x_0,t)`}</Tex> carries amplitude from <Tex>{String.raw`x_0`}</Tex>{" "}
              along the classical orbit <Tex>{String.raw`x_0\cos\Omega t + p_0(M\Omega)^{-1}\sin\Omega t`}</Tex> in the
              well <Tex>{String.raw`V=\tfrac12 M\Omega^2 x^2`}</Tex>. At <Tex>{String.raw`\Omega t = n\pi`}</Tex> the{" "}
              <Tex>{String.raw`\sin\Omega t`}</Tex> in the denominator vanishes — a removable focal point where the
              oscillator refocuses.
            </>
          }
        >
          <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="Harmonic well with a trajectory">
            <defs>
              <marker id="ah-arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#4f46e5" />
              </marker>
            </defs>
            {/* parabola V(x) */}
            <path
              d="M40,30 Q260,300 480,30"
              fill="none"
              stroke="#9aa3b2"
              strokeWidth="2"
            />
            {/* axis */}
            <line x1="40" y1="175" x2="480" y2="175" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="486" y="179" fontSize="13" fill="#5b6473">x</text>
            {/* x0 start dot */}
            <circle cx="150" cy="175" r="6" fill="#e11d48" />
            <text x="138" y="198" fontSize="13" fill="#e11d48">x₀</text>
            {/* x end dot */}
            <circle cx="360" cy="175" r="6" fill="#4f46e5" />
            <text x="354" y="198" fontSize="13" fill="#4f46e5">x</text>
            {/* trajectory arc above axis */}
            <path d="M150,175 Q255,95 360,175" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#ah-arrow)" />
            <text x="232" y="80" fontSize="12" fill="#4f46e5">classical orbit</text>
            <text x="250" y="55" fontSize="13" fill="#5b6473" textAnchor="middle">V(x) = ½MΩ²x²</text>
          </svg>
        </Figure>

        <Derivation title="Build and normalize the propagator">
          <Step title="Two equivalent constructions of G">
            <em>Route A:</em> expand <Tex>{String.raw`\delta(x-x_0)`}</Tex> in oscillator eigenstates{" "}
            <Tex>{String.raw`u_n`}</Tex>; each picks up <Tex>{String.raw`e^{-i(n+\frac12)\Omega t}`}</Tex>, giving the
            bilinear sum Eq. (21). <em>Route B:</em> the operators{" "}
            <Tex>{String.raw`x(t),p(t)`}</Tex> solve the classical equations (Eqs. 22–25), and{" "}
            <Tex>{String.raw`x(0)G = x_0\delta`}</Tex> propagated to <Tex>{String.raw`x(-t)G = x_0 G`}</Tex> becomes a
            PDE once <Tex>{String.raw`x(-t)`}</Tex> is written with <Tex>{String.raw`p=-i\hbar\,\partial_x`}</Tex>:
            <EqBlock>{String.raw`x(-t) = x\cos\Omega t - (M\Omega)^{-1}p\,\sin\Omega t.`}</EqBlock>
          </Step>
          <Step title="Integrate the PDE">
            Eq. (28) reads <Tex>{String.raw`(1/G)\partial_x G = iM\Omega(\hbar\sin\Omega t)^{-1}(x\cos\Omega t - x_0)`}</Tex>.
            Integrate in <Tex>{String.raw`x`}</Tex>; fix the integration constant by demanding symmetry under{" "}
            <Tex>{String.raw`x\leftrightarrow x_0`}</Tex>, which restores the{" "}
            <Tex>{String.raw`x_0^2\cos\Omega t`}</Tex> term:
            <EqBlock>{String.raw`G = \mathcal{N}_G'\exp\!\big[\tfrac12 iM\Omega(\hbar\sin\Omega t)^{-1}\{(x^2+x_0^2)\cos\Omega t - 2xx_0\}\big].`}</EqBlock>
          </Step>
          <Step title="Fix normalization via transitivity">
            Impose the composition law <Tex>{String.raw`\int G(x,x',t')G(x',x_0,t'')\,dx' = G(x,x_0,t'+t'')`}</Tex>{" "}
            and <Tex>{String.raw`\lim_{t\to0}G = \delta(x-x_0)`}</Tex>. The Gaussian convolution fixes{" "}
            <Tex>{String.raw`\mathcal{N}_G'`}</Tex> (Eq. 30):
            <EqBlock>{String.raw`\lim_{t\to 0} G(x,x_0,t) = \delta(x-x_0).`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="The propagator phase is the classical action">
          The exponent of <Tex>{String.raw`G`}</Tex> is <Tex>{String.raw`(i/\hbar)\,S_{\rm cl}`}</Tex>, with{" "}
          <Tex>{String.raw`S_{\rm cl}`}</Tex> the classical action for the oscillator trajectory connecting{" "}
          <Tex>{String.raw`(x_0,0)`}</Tex> to <Tex>{String.raw`(x,t)`}</Tex>. That is precisely why a Gaussian
          propagated by <Tex>{String.raw`G`}</Tex> moves classically.
        </Callout>
        <Callout kind="warning" title="sin Ωt in the denominator">
          <Tex>{String.raw`G`}</Tex> appears to diverge whenever <Tex>{String.raw`\Omega t = n\pi`}</Tex> — at
          half-periods the oscillator refocuses to a point. These are removable focal points; the zero-point phase{" "}
          <Tex>{String.raw`e^{i\Omega t/2}`}</Tex> is dropped as irrelevant when forming{" "}
          <Tex>{String.raw`|\psi|^2`}</Tex>. The simulation sidesteps them entirely by using the singularity-free{" "}
          <Tex>{String.raw`\alpha\to\alpha e^{-i\Omega t}`}</Tex> form.
        </Callout>
      </Section>

      <Section title="H-2b: Time evolution — the non-spreading packet and the coherent state">
        <Intuition>
          This is the heart of the appendix. Propagate the minimum-uncertainty Gaussian (H-1) with the oscillator
          propagator (H-2a) by doing one Gaussian integral. The completing-the-square algebra is bookkeeping, but the
          punchline is physical: <em>if and only if</em> the width parameter equals{" "}
          <Tex>{String.raw`C = M\Omega`}</Tex> — equivalently the dimensionless ratio{" "}
          <Tex>{String.raw`R = C/M\Omega = 1`}</Tex> — the propagated Gaussian keeps a <strong>constant</strong> width
          for all time. It neither spreads nor breathes; its center rides the exact classical trajectory and it stays
          minimum-uncertainty forever. That rigidly oscillating, non-spreading, minimum-uncertainty Gaussian{" "}
          <em>is</em> the coherent state. If <Tex>{String.raw`R\ne1`}</Tex> the packet breathes — the doorway to
          squeezed states.
        </Intuition>
        <p>
          Switch to the dimensionless coordinate natural to the oscillator (note it uses <Tex>{String.raw`M\Omega`}</Tex>,
          not the arbitrary <Tex>{String.raw`C`}</Tex>) and define the control ratio:
        </p>
        <EqBlock label="31">{String.raw`\xi = \Big(\frac{M\Omega}{\hbar}\Big)^{1/2} x.`}</EqBlock>
        <KeyResult
          number="32"
          eq={String.raw`R = \frac{C}{M\Omega}.`}
          label="The control knob"
          note={
            <>
              The ratio of the initial Gaussian&rsquo;s width parameter <Tex>{String.raw`C`}</Tex> to the
              oscillator&rsquo;s natural value. <Tex>{String.raw`R=1`}</Tex> is the coherent state;{" "}
              <Tex>{String.raw`R\ne1`}</Tex> breathes.
            </>
          }
        />
        <p>Rewrite the propagator and the initial Gaussian in <Tex>{String.raw`\xi`}</Tex>:</p>
        <EqBlock label="33">{String.raw`G(\xi,\xi_0,t) = \mathcal{N}_G\,\exp\!\Big[\tfrac{1}{2}i(\sin\Omega t)^{-1}\big\{(\xi^2+\xi_0^2)\cos\Omega t - 2\xi\xi_0\big\}\Big].`}</EqBlock>
        <EqBlock label="34">{String.raw`\mathcal{N}_G = (2\pi\,|\sin\Omega t|)^{-1/2}.`}</EqBlock>
        <EqBlock label="35">{String.raw`\psi(\xi_0,0) = \mathcal{N}_\psi\,\exp\!\big(-\tfrac{1}{2}R\xi_0^2 + \chi'\xi_0\big).`}</EqBlock>
        <EqBlock label="36">{String.raw`\chi' = \sqrt{2R}\,\chi.`}</EqBlock>
        <EqBlock label="37">{String.raw`\mathcal{N}_\psi = \Big(\frac{C}{\pi\hbar}\Big)^{1/4}\exp\!\big(-\tfrac{1}{2}\chi^2 - \tfrac{1}{2}|\chi|^2\big).`}</EqBlock>
        <p>
          The evolved wave function is one Gaussian integral over the initial coordinate{" "}
          <Tex>{String.raw`\xi_0`}</Tex> — the master integral:
        </p>
        <EqBlock label="38">{String.raw`\psi(\xi,t) = \int d\xi_0\, G(\xi,\xi_0,t)\,\psi(\xi_0,0) = \mathcal{N}_\psi\mathcal{N}_G\int d\xi_0\,\exp\!\big[\tfrac{1}{2}i(\sin\Omega t)^{-1}\{(\xi^2+\xi_0^2)\cos\Omega t - 2\xi_0\xi\} - \tfrac{1}{2}R\xi_0^2 + \chi'\xi_0\big].`}</EqBlock>
        <p>Completing the square in the exponent:</p>
        <EqBlock label="39">{String.raw`\{\ \} = \tfrac{1}{2}\zeta_0^2(i\cot\Omega t - R) + \zeta_0(\chi' - i\xi/\sin\Omega t) + \tfrac{1}{2}i\xi^2\cot\Omega t.`}</EqBlock>
        <p>The standard Gaussian integral closes it for <em>any</em> <Tex>{String.raw`R`}</Tex>:</p>
        <KeyResult
          number="40"
          eq={String.raw`\psi(\xi,t) = \mathcal{N}_\psi\mathcal{N}_G\Big[\frac{2\pi}{R - i\cot\Omega t}\Big]^{1/2}\exp\!\Big[\frac{(\chi' - i\xi/\sin\Omega t)^2}{2(R - i\cot\Omega t)} + \tfrac{1}{2}i\xi^2\cot\Omega t\Big].`}
          label="Evolved wave function (any R)"
          note={
            <>
              The closed-form result driving the simulation. Its <Tex>{String.raw`\xi^2`}</Tex> coefficient is
              time-dependent <em>unless</em> <Tex>{String.raw`R=1`}</Tex>.
            </>
          }
        />
        <p>
          The packet&rsquo;s width is constant in time only at the special value <Tex>{String.raw`R=1`}</Tex> — the
          coherent-state condition:
        </p>
        <KeyResult
          number="41"
          eq={String.raw`C = M\Omega \quad\Longleftrightarrow\quad R = 1.`}
          label="Coherent-state condition"
        />
        <p>
          For general <Tex>{String.raw`R`}</Tex> the density stays Gaussian but its width{" "}
          <Tex>{String.raw`\sigma(t)`}</Tex> oscillates — the breathing. (The phase/normalization prefactors below are
          transcribed verbatim from the source; the structurally certain content is the constant-area Gaussian envelope
          and the displaced argument.)
        </p>
        <EqBlock label="42">{String.raw`\psi^*\psi = \Big(\frac{M\Omega}{\pi\hbar}\Big)^{1/2}\frac{1}{\sigma}\exp\!\Big\{-\big[\xi - \xi_0\cos(\Omega t + \phi')\big]^2/\sigma^2\Big\}.`}</EqBlock>
        <EqBlock>{String.raw`\phi' = \tan^{-1}(R\tan\phi), \qquad \chi' = |\chi'|\exp(-i\phi).`}</EqBlock>
        <KeyResult
          eq={String.raw`\sigma = \Big[\frac{\cos^2\Omega t + R^2\sin^2\Omega t}{R}\Big]^{1/2}.`}
          label="Time-dependent (breathing) width"
          note={
            <>
              It oscillates at frequency <Tex>{String.raw`2\Omega`}</Tex> between <Tex>{String.raw`R^{-1/2}`}</Tex> and{" "}
              <Tex>{String.raw`R^{1/2}`}</Tex> — except at <Tex>{String.raw`R=1`}</Tex>, where{" "}
              <Tex>{String.raw`\sigma\equiv 1`}</Tex> is rigidly constant.
            </>
          }
        />
        <p>
          Setting <Tex>{String.raw`R=1`}</Tex> kills the breathing and reduces the packet to a rigidly displaced
          ground-state Gaussian of constant width:
        </p>
        <EqBlock label="44">{String.raw`\psi(\xi,t) = \Big(\frac{M\Omega}{\pi\hbar}\Big)^{1/4}\exp\!\Big[-\tfrac{1}{2}\xi^2 - \tfrac{1}{2}|\alpha|^2 + \sqrt{2}\,\alpha\,e^{-i\Omega t}\xi - \tfrac{1}{2}\alpha^2 e^{-2i\Omega t}\Big].`}</EqBlock>
        <KeyResult
          number="45"
          eq={String.raw`\alpha = (2M\Omega\hbar)^{-1/2}\big[M\Omega q_0 + i p_0\big].`}
          label="The coherent-state amplitude"
          note={
            <>
              A single complex number: <Tex>{String.raw`\operatorname{Re}\alpha`}</Tex> carries the (scaled) initial
              position, <Tex>{String.raw`\operatorname{Im}\alpha`}</Tex> the initial momentum.{" "}
              <Tex>{String.raw`|\alpha|^2`}</Tex> is the mean photon number; <Tex>{String.raw`\arg\alpha`}</Tex> is the
              field phase. (Note the <Tex>{String.raw`i`}</Tex> rides with <Tex>{String.raw`p_0`}</Tex>.)
            </>
          }
        />
        <p>
          Completing the square in <Tex>{String.raw`\xi`}</Tex> exhibits it as the ground state{" "}
          <Tex>{String.raw`\phi_0`}</Tex> evaluated at a <em>shifted</em> argument — the rigidly translating,
          non-spreading wave packet:
        </p>
        <EqBlock label="46">{String.raw`\psi(\xi,t) = \Big(\frac{M\Omega}{\pi\hbar}\Big)^{1/4}\exp\!\Big[-\tfrac{1}{2}\alpha^2\big(1 - 2i\sin\Omega t\cos\Omega t - 2\sin^2\Omega t\big) - \tfrac{1}{2}|\alpha|^2 - \tfrac{1}{2}(\xi - \sqrt{2}\,\alpha e^{-i\Omega t})^2 + (\alpha e^{-i\Omega t})^2\Big] = \exp\!\big[\tfrac{1}{2}(\alpha e^{-i\Omega t})^2 - \tfrac{1}{2}|\alpha|^2\big]\,\phi_0\!\big(\xi - \sqrt{2}\,\alpha e^{-i\Omega t}\big).`}</EqBlock>

        <SimFrame
          title="The coherent state vs. the breathing packet"
          caption={
            <>
              A Gaussian wave packet evolving in the harmonic well{" "}
              <Tex>{String.raw`V=\tfrac12 M\Omega^2 x^2`}</Tex>, computed from the variances of the book&rsquo;s
              closed-form solution. The single knob <Tex>{String.raw`R=C/M\Omega`}</Tex> decides everything. The atom
              view animates in real time; the curves update as you drag.
            </>
          }
          tryThis={
            <>
              Set <Tex>{String.raw`R=1`}</Tex>: the packet slides rigidly along the classical orbit, the width trace is
              dead flat, the phase-space blob is a fixed circle, and the dial{" "}
              <Tex>{String.raw`\Delta x\,\Delta p/(\hbar/2)`}</Tex> locks at 1.00. Now detune{" "}
              <Tex>{String.raw`R`}</Tex> away from 1: the packet breathes, <Tex>{String.raw`\sigma(t)`}</Tex>{" "}
              oscillates at <Tex>{String.raw`2\Omega`}</Tex>, and the dial rises above 1, touching 1 only at the
              quarter-periods — the seed of squeezing. Push <Tex>{String.raw`q_0,p_0`}</Tex> to grow{" "}
              <Tex>{String.raw`\bar n=|\alpha|^2`}</Tex> and watch the Poisson bars sharpen relatively.
            </>
          }
        >
          <AppHSim />
        </SimFrame>

        <Derivation title="Do the Gaussian integral and impose R = 1">
          <Step title="Set up the master Gaussian integral">
            Insert the initial Gaussian (Eq. 35) and the propagator (Eq. 33) into the superposition integral (Eq. 17),
            giving Eq. (38) — a single Gaussian integral over <Tex>{String.raw`\xi_0`}</Tex> with a quadratic exponent:
            <EqBlock>{String.raw`\psi(\xi,t) = \mathcal{N}_\psi\mathcal{N}_G\int d\xi_0\,\exp\big[A\xi_0^2 + B\xi_0 + D\big].`}</EqBlock>
          </Step>
          <Step title="Complete the square">
            Group the <Tex>{String.raw`\xi_0^2`}</Tex> coefficient as <Tex>{String.raw`\tfrac12(i\cot\Omega t - R)`}</Tex>{" "}
            and the linear coefficient as <Tex>{String.raw`(\chi' - i\xi/\sin\Omega t)`}</Tex> (Eq. 39). The standard
            Gaussian integral yields the closed form Eq. (40), valid for all <Tex>{String.raw`R`}</Tex>:
            <EqBlock>{String.raw`\int e^{a\zeta_0^2 + b\zeta_0}\,d\zeta_0 = \sqrt{\tfrac{2\pi}{R - i\cot\Omega t}}\,\exp\!\Big[\frac{b^2}{2(R-i\cot\Omega t)}\Big].`}</EqBlock>
          </Step>
          <Step title="Impose R = 1 to kill the breathing">
            In Eq. (40) the coefficient of <Tex>{String.raw`\xi^2`}</Tex> in <Tex>{String.raw`|\psi|^2`}</Tex> is
            time-dependent unless <Tex>{String.raw`R=1`}</Tex>. Setting <Tex>{String.raw`R=1`}</Tex> (
            <Tex>{String.raw`C=M\Omega`}</Tex>) collapses the width to a constant; the surviving time dependence is only
            a moving center and an overall phase. This gives the coherent-state wave function Eq. (44):
            <EqBlock>{String.raw`C = M\Omega \;\Rightarrow\; \sigma = 1\ \text{(constant width, no breathing)}.`}</EqBlock>
          </Step>
          <Step title="Read off the rigid displacement">
            Rewrite Eq. (44) by completing the square in <Tex>{String.raw`\xi`}</Tex>: the result (Eq. 46) is the
            ground state <Tex>{String.raw`\phi_0`}</Tex> at the shifted argument{" "}
            <Tex>{String.raw`\xi - \sqrt{2}\,\alpha e^{-i\Omega t}`}</Tex>, times a phase. The center oscillates as{" "}
            <Tex>{String.raw`\operatorname{Re}(\sqrt{2}\,\alpha e^{-i\Omega t})`}</Tex> — exactly the classical orbit:
            <EqBlock>{String.raw`\psi(\xi,t) \propto \phi_0\!\big(\xi - \sqrt{2}\,\alpha\,e^{-i\Omega t}\big), \qquad \langle x\rangle(t) = x_0\cos\Omega t + (p_0/M\Omega)\sin\Omega t.`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="R = 1 is the whole point">
          The single inequality the book derives, <Tex>{String.raw`(\Delta q)^2(\Delta p)^2\geq\tfrac14\hbar^2`}</Tex>,
          is saturated <em>for all time</em> only when <Tex>{String.raw`C=M\Omega`}</Tex>, i.e.{" "}
          <Tex>{String.raw`R=1`}</Tex>. Then the packet is a rigidly translating ground-state Gaussian: the coherent
          state. The classical limit emerges — a quantum field that moves like a classical wave.
        </Callout>
        <Callout kind="warning" title="R ≠ 1 means breathing — and squeezing">
          For <Tex>{String.raw`R\ne1`}</Tex> the width <Tex>{String.raw`\sigma(t)`}</Tex> oscillates at{" "}
          <Tex>{String.raw`2\Omega`}</Tex> between <Tex>{String.raw`R^{1/2}`}</Tex> and{" "}
          <Tex>{String.raw`R^{-1/2}`}</Tex>, so the uncertainty product periodically exceeds{" "}
          <Tex>{String.raw`\hbar/2`}</Tex>. This is the conceptual seed of squeezed-state physics.
        </Callout>
        <Callout kind="note" title="α encodes amplitude and phase">
          <Tex>{String.raw`\alpha = (2M\Omega\hbar)^{-1/2}(M\Omega q_0 + ip_0)`}</Tex>:{" "}
          <Tex>{String.raw`|\alpha|`}</Tex> is the classical amplitude (and{" "}
          <Tex>{String.raw`\sqrt{\bar n}`}</Tex>), <Tex>{String.raw`\arg\alpha`}</Tex> the field phase. Time evolution
          is simply <Tex>{String.raw`\alpha \to \alpha e^{-i\Omega t}`}</Tex> — the complex amplitude rotates in phase
          space at <Tex>{String.raw`\Omega`}</Tex>.
        </Callout>
      </Section>

      <Section title="H-3: Expansion in number states — Poisson photon statistics">
        <Intuition>
          The very same coherent state has a strikingly simple decomposition in photon-number (Fock) states. Use the
          displacement operator <Tex>{String.raw`D(\alpha)=\exp[\alpha(a^\dagger-a)]`}</Tex> acting on the vacuum, and
          the BCH disentangling identity, and the coherent state becomes a superposition of all number states{" "}
          <Tex>{String.raw`|n\rangle`}</Tex> with amplitudes <Tex>{String.raw`\alpha^n/\sqrt{n!}`}</Tex> and an overall{" "}
          <Tex>{String.raw`e^{-|\alpha|^2/2}`}</Tex>. The probability of finding exactly <Tex>{String.raw`n`}</Tex>{" "}
          photons is therefore a <strong>Poisson distribution</strong> with mean <Tex>{String.raw`|\alpha|^2`}</Tex> —
          the signature of a single-mode laser well above threshold.
        </Intuition>
        <p>
          Taylor&rsquo;s theorem, rewritten as the exponential of the translation generator, is the formal basis for
          the displacement operator:
        </p>
        <EqBlock label="47">{String.raw`f(x - x_0) = f(x) - x_0 f'(x) + \tfrac{1}{2}x_0^2 f''(x) - \ldots = \exp\!\big[-x_0(d/dx)\big]f(x).`}</EqBlock>
        <p>
          The <Tex>{String.raw`R=1,\,t=0`}</Tex> displaced Gaussian is then{" "}
          <Tex>{String.raw`D(a)=\exp[a(a^\dagger-a)]`}</Tex> acting on the ground state{" "}
          <Tex>{String.raw`\phi_0`}</Tex>:
        </p>
        <EqBlock label="48">{String.raw`\psi(\xi,0) = \exp\!\big[\tfrac{1}{2}(\alpha^2 - \alpha\alpha^*)\big]\,\exp\!\big[-\sqrt{2}\,\alpha\,(d/d\xi)\big]\,\phi_0(\xi).`}</EqBlock>
        <EqBlock label="48, 49">{String.raw`p = \tfrac{1}{2}i(2M\hbar\Omega)^{1/2}(a^\dagger - a) = -i\hbar\frac{d}{dq} = -i(M\hbar\Omega)^{1/2}\frac{d}{d\xi} \;\Rightarrow\; \frac{d}{d\xi} = -\frac{1}{\sqrt{2}}(a^\dagger - a).`}</EqBlock>
        <EqBlock label="49">{String.raw`\frac{d}{d\xi} = -\frac{1}{\sqrt{2}}(a^\dagger - a).`}</EqBlock>
        <p>
          Because <Tex>{String.raw`[a,a^\dagger]=1`}</Tex> is a c-number, the BCH theorem disentangles the
          displacement operator into an ordered product times a scalar:
        </p>
        <EqBlock label="51">{String.raw`\exp[\alpha(a^\dagger - a)] = \exp\!\big[\tfrac{1}{2}\alpha^2[a^\dagger,a]\big]\,\exp[\alpha a^\dagger]\,\exp[-\alpha a] = \exp\!\big[-\tfrac{1}{2}\alpha^2\big]\,\exp[\alpha a^\dagger]\,\exp[-\alpha a].`}</EqBlock>
        <p>
          Acting on the vacuum, <Tex>{String.raw`\exp[-aa]`}</Tex> dies (since{" "}
          <Tex>{String.raw`a\,\phi_0=0`}</Tex>) and <Tex>{String.raw`\exp[aa^\dagger]`}</Tex> generates the number-state
          sum with amplitudes <Tex>{String.raw`a^n/\sqrt{n!}`}</Tex>:
        </p>
        <EqBlock label="52">{String.raw`\psi(\xi) = \exp\!\big[-\tfrac{1}{2}\alpha\alpha^*\big]\,\exp[\alpha a^\dagger]\,\phi_0(\xi) = \sum_n \frac{\alpha^n}{\sqrt{n!}}\,\exp\!\big[-\tfrac{1}{2}|\alpha|^2\big]\,\phi_n(\xi).`}</EqBlock>
        <KeyResult
          number="53"
          eq={String.raw`|\alpha\rangle = \exp\!\big(-\tfrac{1}{2}|\alpha|^2\big)\sum_{n=0}^{\infty} \frac{\alpha^n}{\sqrt{n!}}\,|n\rangle.`}
          label="Coherent state in the number (Fock) basis"
          note={
            <>
              The iconic identity. The amplitude on <Tex>{String.raw`|n\rangle`}</Tex> is{" "}
              <Tex>{String.raw`e^{-|\alpha|^2/2}\,\alpha^n/\sqrt{n!}`}</Tex>, so the photon distribution is Poisson —
              the form every later laser chapter reuses.
            </>
          }
        />
        <p>
          Time evolution sends each component <Tex>{String.raw`|n\rangle \to e^{-in\Omega t}|n\rangle`}</Tex>,
          equivalently <Tex>{String.raw`\alpha \to \alpha e^{-i\Omega t}`}</Tex>:
        </p>
        <EqBlock label="54">{String.raw`\psi(\zeta,t) = \sum_n \Big[\frac{(\alpha e^{-i\Omega t})^n}{\sqrt{n!}}\Big]\exp\!\big[-\tfrac{1}{2}|\alpha|^2\big]\,\phi_n(\zeta).`}</EqBlock>
        <p>
          Transforming back to coordinate, or to the electric-field variable via the field-position correspondence,
          reproduces the constant-width Gaussian of H-2 — the same non-spreading conclusion, now from number states:
        </p>
        <EqBlock label="55">{String.raw`\psi^*\psi = \Big(\frac{M\Omega}{\pi\hbar}\Big)^{1/2}\exp\!\Big\{-\big[\xi - \sqrt{2}\,|\alpha|\cos(\Omega t + \phi)\big]^2\Big\}.`}</EqBlock>
        <EqBlock>{String.raw`\alpha = |\alpha|\exp(-i\phi).`}</EqBlock>
        <EqBlock label="56">{String.raw`\psi(E,t) = (\sqrt{2}\,\pi\mathscr{E})^{-1/2}\exp\!\big[\tfrac{1}{2}(\alpha e^{-i\Omega t})^2 - \tfrac{1}{2}|\alpha|^2\big]\exp\!\Big\{-\tfrac{1}{2}\big[(\sqrt{2}\,\mathscr{E})^{-1}E - \sqrt{2}\,\alpha e^{-i\Omega t}\big]^2\Big\}.`}</EqBlock>
        <KeyResult
          number="57"
          eq={String.raw`\psi^*(E,t)\psi(E,t) = (\sqrt{2}\,\pi\mathscr{E})^{-1}\exp\!\Big\{-\big[(\sqrt{2}\,\mathscr{E})^{-1}E - \sqrt{2}\,|\alpha|\cos(\Omega t + \phi)\big]^2\Big\}.`}
          label="Field distribution of a coherent state"
          note={
            <>
              A constant-width Gaussian whose center oscillates as <Tex>{String.raw`|\alpha|\cos(\Omega t + \phi)`}</Tex>:
              the field behaves like a classical wave dressed with the minimum quantum fuzz.
            </>
          }
        />

        <Derivation title="From the displaced vacuum to Poisson photons">
          <Step title="Recognize the displaced ground state">
            The <Tex>{String.raw`R=1,\,t=0`}</Tex> coherent state is <Tex>{String.raw`\phi_0`}</Tex> shifted by a
            constant. Taylor&rsquo;s theorem (Eq. 47) says a shift by <Tex>{String.raw`x_0`}</Tex> is{" "}
            <Tex>{String.raw`\exp[-x_0\,d/dx]`}</Tex>. Since <Tex>{String.raw`d/d\zeta = (a^\dagger-a)/\sqrt{2}`}</Tex>{" "}
            (Eq. 49), the shift operator <em>is</em> the displacement operator{" "}
            <Tex>{String.raw`D(a)=\exp[a(a^\dagger-a)]`}</Tex> (Eq. 48):
            <EqBlock>{String.raw`\psi(\zeta,0) = \exp[a(a^\dagger - a)]\,\phi_0(\zeta) = D(a)\,\phi_0.`}</EqBlock>
          </Step>
          <Step title="Disentangle with BCH">
            Because <Tex>{String.raw`[a,a^\dagger]=1`}</Tex> commutes with everything, the BCH theorem splits the
            exponential of a sum into an ordered product times a c-number (Eq. 51):
            <EqBlock>{String.raw`e^{A+B} = e^{A}e^{B}e^{-\frac12[A,B]}\quad\text{when}\ [A,B]\ \text{is a c-number}.`}</EqBlock>
          </Step>
          <Step title="Act on the vacuum and expand">
            Apply to <Tex>{String.raw`\phi_0=|0\rangle`}</Tex>: <Tex>{String.raw`\exp[-aa]|0\rangle=|0\rangle`}</Tex>{" "}
            (since <Tex>{String.raw`a|0\rangle=0`}</Tex>), and{" "}
            <Tex>{String.raw`\exp[\alpha a^\dagger]|0\rangle = \sum_n (\alpha^n/n!)(a^\dagger)^n|0\rangle = \sum_n (\alpha^n/\sqrt{n!})|n\rangle`}</Tex>{" "}
            using <Tex>{String.raw`(a^\dagger)^n|0\rangle=\sqrt{n!}\,|n\rangle`}</Tex>. This yields Eqs. (52)–(53):
            <EqBlock>{String.raw`e^{\alpha a^\dagger}|0\rangle = \sum_n \frac{\alpha^n}{\sqrt{n!}}\,|n\rangle.`}</EqBlock>
          </Step>
          <Step title="Read off Poisson statistics">
            The probability of <Tex>{String.raw`n`}</Tex> photons is{" "}
            <Tex>{String.raw`|\langle n|\alpha\rangle|^2 = e^{-|\alpha|^2}|\alpha|^{2n}/n!`}</Tex> — a Poisson
            distribution with mean and variance both equal to <Tex>{String.raw`|\alpha|^2`}</Tex>:
            <EqBlock>{String.raw`P(n) = |\langle n|\alpha\rangle|^2 = e^{-|\alpha|^2}\frac{|\alpha|^{2n}}{n!}.`}</EqBlock>
          </Step>
          <Step title="Recover the moving packet and the classical field">
            Time evolution sends <Tex>{String.raw`\alpha\to\alpha e^{-i\Omega t}`}</Tex> (Eq. 54). Transforming back to
            coordinate (Eq. 55) or to the field variable (Eqs. 56–57) gives a constant-width Gaussian whose center
            oscillates as <Tex>{String.raw`|\alpha|\cos(\Omega t+\phi)`}</Tex>:
            <EqBlock>{String.raw`\langle E(t)\rangle \propto |\alpha|\cos(\Omega t + \phi).`}</EqBlock>
          </Step>
        </Derivation>

        <Callout kind="insight" title="Poisson photons = coherent light">
          <Tex>{String.raw`P(n) = e^{-\bar n}\,\bar n^{\,n}/n!`}</Tex> with{" "}
          <Tex>{String.raw`\bar n = |\alpha|^2`}</Tex>. Mean equals variance, so{" "}
          <Tex>{String.raw`\Delta n/\bar n = 1/\sqrt{\bar n}`}</Tex>: relative photon-number fluctuations shrink as the
          field grows. This is the laser signature; thermal light, by contrast, is super-Poissonian.
        </Callout>
        <Callout kind="note" title="The displacement operator">
          <Tex>{String.raw`|\alpha\rangle = D(\alpha)|0\rangle`}</Tex> with{" "}
          <Tex>{String.raw`D(\alpha) = \exp[\alpha a^\dagger - \alpha^* a]`}</Tex> (here, real{" "}
          <Tex>{String.raw`\alpha`}</Tex>: <Tex>{String.raw`\exp[\alpha(a^\dagger-a)]`}</Tex>). The coherent state is
          just the vacuum pushed off-center in phase space — its fuzz is the vacuum&rsquo;s zero-point fuzz, carried
          along rigidly.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <KeyResult
          eq={String.raw`|\alpha\rangle = e^{-\frac{1}{2}|\alpha|^2}\sum_{n=0}^{\infty}\frac{\alpha^n}{\sqrt{n!}}\,|n\rangle, \qquad \alpha \to \alpha\, e^{-i\Omega t}.`}
          label="Memorize this"
          note={
            <>
              The coherent state in the number basis, with photon statistics{" "}
              <Tex>{String.raw`P(n)=e^{-\bar n}\bar n^{\,n}/n!`}</Tex>, <Tex>{String.raw`\bar n=|\alpha|^2`}</Tex>. The
              form every later laser chapter reuses.
            </>
          }
        />
        <Callout kind="note" title="What you keep">
          <ul>
            <li>
              <strong>The coherent state is the most classical field mode.</strong> It saturates{" "}
              <Tex>{String.raw`\Delta q\,\Delta p=\hbar/2`}</Tex>, oscillates rigidly without spreading, and has Poisson
              photon statistics — the working description of a laser well above threshold.
            </li>
            <li>
              <strong>The complex amplitude</strong>{" "}
              <Tex>{String.raw`\alpha = (2M\Omega\hbar)^{-1/2}(M\Omega q_0+ip_0)`}</Tex> packages amplitude and phase:{" "}
              <Tex>{String.raw`\operatorname{Re}\alpha`}</Tex> ↔ cosine (position) quadrature,{" "}
              <Tex>{String.raw`\operatorname{Im}\alpha`}</Tex> ↔ sine (momentum) quadrature. Time evolution is simply{" "}
              <Tex>{String.raw`\alpha\to\alpha e^{-i\Omega t}`}</Tex>.
            </li>
            <li>
              <strong>Coherent states are displaced vacua.</strong> They are eigenstates of the annihilation operator
              and are generated from the vacuum by <Tex>{String.raw`D(\alpha)=\exp[\alpha a^\dagger-\alpha^* a]`}</Tex>,{" "}
              <Tex>{String.raw`|\alpha\rangle = D(\alpha)|0\rangle`}</Tex> — keep this operator picture for the{" "}
              <Tex>{String.raw`P`}</Tex>-representation and field statistics later.
            </li>
            <li>
              <strong>The condition <Tex>{String.raw`C=M\Omega`}</Tex> (R = 1)</strong> is what makes the packet
              non-spreading; <Tex>{String.raw`R\ne1`}</Tex> packets breathe at <Tex>{String.raw`2\Omega`}</Tex> with{" "}
              <Tex>{String.raw`\Delta q\,\Delta p>\hbar/2`}</Tex> — the conceptual seed of <strong>squeezed states</strong>.
            </li>
            <li>
              <strong>The propagator</strong> <Tex>{String.raw`G\propto e^{(i/\hbar)S_{\rm cl}}`}</Tex> (Eq. 29) is a
              reusable tool: any initial wave function is propagated by one Gaussian convolution, and its phase is the
              classical action.
            </li>
            <li>
              <strong>Link to the field.</strong> Via the field-position correspondence,{" "}
              <Tex>{String.raw`|\psi(E,t)|^2`}</Tex> is a constant-width Gaussian whose center oscillates as{" "}
              <Tex>{String.raw`|\alpha|\cos(\Omega t+\phi)`}</Tex> — a near-classical electromagnetic wave with
              irreducible quantum fuzz. This bridges Appendix H to the quantized-field chapters.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
