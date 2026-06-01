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
import Ch01Sim from "@/components/sims/ch01";

export default function Page() {
  return (
    <Lesson slug="ch01">
      <Lede>
        Why does a laser glow? At the deepest level: because a single atom, prepared in a{" "}
        <em>superposition</em> of two energy eigenstates, has a charge cloud that physically sloshes back and
        forth in space — and an oscillating charge radiates. This chapter builds, brick by brick, the one
        quantity that makes that statement quantitative: the expectation value of the electric-dipole moment{" "}
        <Tex>{String.raw`\langle e\mathbf{r}\rangle(t)`}</Tex>. Hold the chain in your head for the entire book:
        the wavefunction <Tex>{String.raw`\psi`}</Tex> carries all knowledge; observables are{" "}
        <Tex>{String.raw`\psi^*\,\mathcal{O}\,\psi`}</Tex> integrals; Schrödinger&rsquo;s equation evolves{" "}
        <Tex>{String.raw`\psi`}</Tex> into a superposition of stationary states; and the cross terms of a
        two-state mixture make <Tex>{String.raw`\langle e\mathbf{r}\rangle`}</Tex> beat at the Bohr frequency{" "}
        <Tex>{String.raw`\omega_{21}=\omega_2-\omega_1`}</Tex> — the optical frequency the atom emits or absorbs.
      </Lede>

      <Section title="1-1a. The wave function and probability density">
        <Intuition>
          Quantum mechanics replaces the classical &ldquo;where is the electron?&rdquo; with a complex amplitude{" "}
          <Tex>{String.raw`\psi(\mathbf{r},t)`}</Tex> spread over space. The only thing you can physically read off
          is its squared magnitude: <Tex>{String.raw`|\psi|^2`}</Tex> is a <strong>probability density</strong> —
          the chance per unit volume of finding the electron at a point. Because the electron is{" "}
          <em>somewhere</em> with certainty, this density must integrate to one. Here{" "}
          <Tex>{String.raw`e`}</Tex> denotes the electron&rsquo;s (negative) charge, so the <em>charge</em> density is{" "}
          <Tex>{String.raw`e\,\psi^*\psi`}</Tex> — the physical object that, once it starts moving, will radiate.
        </Intuition>
        <p>
          The probability density is the modulus-squared of the amplitude, and the probability of finding the
          electron in a small volume <Tex>{String.raw`d^3r`}</Tex> is that density times the volume:
        </p>
        <EqBlock label="1">{String.raw`\psi^*(\mathbf{r},t)\,\psi(\mathbf{r},t)`}</EqBlock>
        <EqBlock label="2">{String.raw`\psi^*(\mathbf{r},t)\,\psi(\mathbf{r},t)\,d^3r`}</EqBlock>
        <p>
          Summing over all of space, the electron is found <em>somewhere</em> with total probability unity —
          this is the normalization condition:
        </p>
        <KeyResult
          number="3"
          eq={String.raw`\int \psi^*(\mathbf{r},t)\,\psi(\mathbf{r},t)\,d^3r = 1`}
          label="Normalization"
          note={
            <>
              The electron exists with certainty. With <Tex>{String.raw`e`}</Tex> the electron&rsquo;s (negative)
              charge, the associated <em>charge</em> density is <Tex>{String.raw`e\,\psi^*\psi`}</Tex>.
            </>
          }
        />
        <Callout kind="insight" title="Charge density">
          Here <Tex>{String.raw`e`}</Tex> denotes the electron&rsquo;s (negative) charge, so the charge density is{" "}
          <Tex>{String.raw`e\,\psi^*\psi`}</Tex>. This is the source term for radiation — keep it distinct from
          the probability density <Tex>{String.raw`|\psi|^2`}</Tex> (they differ only by the factor{" "}
          <Tex>{String.raw`e`}</Tex>).
        </Callout>
      </Section>

      <Section title="1-1b. Expectation values and the electric-dipole moment">
        <Intuition>
          Observables are not numbers attached to the electron — they are <strong>operators</strong>{" "}
          <Tex>{String.raw`\mathcal{O}`}</Tex>, and what you measure on average over an ensemble of
          identically-prepared systems is the <strong>expectation value</strong>{" "}
          <Tex>{String.raw`\langle\mathcal{O}\rangle = \int \psi^*\mathcal{O}\psi\,d^3r`}</Tex>. The single most
          important observable for laser physics is the electric-dipole moment{" "}
          <Tex>{String.raw`\langle e\mathbf{r}\rangle`}</Tex>: the position operator weighted by the charge
          density. Everything in the book ultimately computes some version of this one integral.
        </Intuition>
        <KeyResult
          number="4"
          eq={String.raw`\langle \mathcal{O} \rangle = \int d^3r\, \psi^*(\mathbf{r},t)\, \mathcal{O}\, \psi(\mathbf{r},t)`}
          label="Expectation value"
          note={
            <>
              The average of measurements over an ensemble of systems prepared with the same{" "}
              <Tex>{String.raw`\psi`}</Tex>.
            </>
          }
        />
        <p>
          Specialize to the operator <Tex>{String.raw`\mathcal{O}=e\mathbf{r}`}</Tex> (charge times position).
          Because <Tex>{String.raw`e\mathbf{r}`}</Tex> is purely multiplicative, the integrand reorders to the
          position weighted by the charge density:
        </p>
        <KeyResult
          number="5"
          eq={String.raw`\langle e\mathbf{r} \rangle = \int d^3r\, \psi^*(\mathbf{r},t)\,(e\mathbf{r})\,\psi(\mathbf{r},t) = \int d^3r\,(e\mathbf{r})\,(\psi^*\psi)`}
          label="Electric-dipole moment"
          note={
            <>
              The bridge between abstract QM and the physical, radiating dipole. Here{" "}
              <Tex>{String.raw`e\psi^*\psi`}</Tex> is the charge density.
            </>
          }
        />
        <Derivation title="From operator to dipole">
          <Step title="Insert the dipole operator">
            Take the general expectation value Eq.&nbsp;(4) and set{" "}
            <Tex>{String.raw`\mathcal{O}=e\mathbf{r}`}</Tex>. Since it is multiplicative it commutes with{" "}
            <Tex>{String.raw`\psi`}</Tex> and we may group it with the charge density:
            <EqBlock>{String.raw`\langle e\mathbf{r}\rangle = \int d^3r\,(e\mathbf{r})\,\psi^*\psi.`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="insight" title="Why this is THE equation">
          The atomic polarization that drives a laser is the density of atomic dipole moments{" "}
          <Tex>{String.raw`\langle e\mathbf{r}\rangle`}</Tex>. Chapter after chapter returns to evaluating this
          integral. If you remember one formula from Chapter&nbsp;I, make it Eq.&nbsp;(5).
        </Callout>
      </Section>

      <Section title="1-2. The Schrödinger equation, energy eigenstates, and superposition">
        <Intuition>
          Now we need the law that evolves <Tex>{String.raw`\psi`}</Tex> in time. The trick that organizes all of
          QM: look for special states whose time dependence is a <em>pure phase</em>{" "}
          <Tex>{String.raw`e^{-i\omega_n t}`}</Tex>. These <strong>stationary states</strong>{" "}
          <Tex>{String.raw`u_n(\mathbf{r})`}</Tex> have a sharply defined energy{" "}
          <Tex>{String.raw`\hbar\omega_n`}</Tex> and form an orthonormal, complete basis. The{" "}
          <em>general</em> state is therefore a <strong>superposition</strong>, each component spinning at its
          own frequency. This is where radiation hides: one stationary state gives a frozen probability density,
          but a superposition of two has cross terms beating at the difference frequency.
        </Intuition>
        <p>
          The time-dependent Schrödinger equation (TDSE) is built from the Hamiltonian (total-energy) operator{" "}
          <Tex>{String.raw`\mathcal{H}`}</Tex>; the dot denotes <Tex>{String.raw`\partial/\partial t`}</Tex>:
        </p>
        <KeyResult
          number="6"
          eq={String.raw`i\hbar\,\dot{\psi}(\mathbf{r},t) = \mathcal{H}(\mathbf{r},\mathbf{p})\,\psi(\mathbf{r},t)`}
          label="Time-dependent Schrödinger equation"
        />
        <p>
          The classical momentum is promoted to a differential operator (canonical quantization), so that for a
          free particle the Hamiltonian is pure kinetic energy:
        </p>
        <EqBlock label="7">{String.raw`\mathbf{p} = -i\hbar\nabla`}</EqBlock>
        <EqBlock label="8">{String.raw`\mathcal{H}(\mathbf{r},\mathbf{p}) = \frac{\mathbf{p}^2}{2m} = -\frac{\hbar^2}{2m}\nabla^2`}</EqBlock>
        <p>
          Try the stationary-state ansatz — a spatial part times a pure phase oscillating at circular frequency{" "}
          <Tex>{String.raw`\omega_n`}</Tex> (radians per second):
        </p>
        <EqBlock label="9">{String.raw`\psi_n(\mathbf{r},t) = u_n(\mathbf{r})\,\exp(-i\omega_n t)`}</EqBlock>
        <p>
          Substituting collapses the TDSE to a time-<em>independent</em> eigenvalue problem for{" "}
          <Tex>{String.raw`\mathcal{H}`}</Tex>, whose eigenvalues <Tex>{String.raw`\hbar\omega_n`}</Tex> are the
          allowed energies:
        </p>
        <KeyResult
          number="10"
          eq={String.raw`\mathcal{H}(\mathbf{r},\mathbf{p})\,u_n(\mathbf{r}) = \hbar\omega_n\,u_n(\mathbf{r})`}
          label="Time-independent Schrödinger / eigenvalue equation"
          note={
            <>
              Note the book labels energy as <Tex>{String.raw`\hbar\omega_n`}</Tex>, not{" "}
              <Tex>{String.raw`E_n`}</Tex> — the <Tex>{String.raw`\omega_n`}</Tex> are literally the phase rates
              that beat into radiation frequencies.
            </>
          }
        />
        <p>
          The eigenfunctions are orthonormal and complete — they are a basis. (
          <Tex>{String.raw`\delta_{nm}`}</Tex> is the Kronecker delta;{" "}
          <Tex>{String.raw`\delta(\mathbf{r}-\mathbf{r}')`}</Tex> the Dirac delta.)
        </p>
        <EqBlock label="11">{String.raw`\int u_n^*(\mathbf{r})\,u_m(\mathbf{r})\,d^3r = \delta_{nm} = \begin{cases}1, & n=m\\ 0, & n\neq m\end{cases}`}</EqBlock>
        <EqBlock label="12">{String.raw`\sum_n u_n^*(\mathbf{r})\,u_n(\mathbf{r}') = \delta(\mathbf{r}-\mathbf{r}')`}</EqBlock>
        <p>
          Because the <Tex>{String.raw`u_n`}</Tex> are complete, <em>any</em> solution is a linear combination —
          each component carrying its own phase. This is the central result of the chapter:
        </p>
        <KeyResult
          number="13"
          eq={String.raw`\psi(\mathbf{r},t) = \sum_n C_n u_n(\mathbf{r})\,\exp(-i\omega_n t)`}
          label="Superposition of energy eigenstates"
          note={
            <>
              The master form of any quantum state. <Tex>{String.raw`|C_n|^2`}</Tex> is the probability of finding
              the system in the <Tex>{String.raw`n`}</Tex>th eigenstate.
            </>
          }
        />
        <p>
          Plugging this into the normalization Eq.&nbsp;(3) and using orthonormality forces the coefficients to be
          normalized:
        </p>
        <EqBlock label="14">{String.raw`\sum_n |C_n|^2 = 1`}</EqBlock>
        <Derivation title="Separation of variables and the superposition">
          <Step title="Separate the time dependence">
            Assume the phase factors out, Eq.&nbsp;(9). Substitute into the TDSE Eq.&nbsp;(6): the time derivative
            pulls down <Tex>{String.raw`i\hbar(-i\omega_n)=\hbar\omega_n`}</Tex> on the left, while the right gives{" "}
            <Tex>{String.raw`\mathcal{H}u_n`}</Tex> times the same phase.
            <EqBlock>{String.raw`i\hbar\,\partial_t\big[u_n e^{-i\omega_n t}\big] = \hbar\omega_n u_n e^{-i\omega_n t} = \big[\mathcal{H}u_n\big]e^{-i\omega_n t}`}</EqBlock>
          </Step>
          <Step title="Drop the common phase">
            The phase <Tex>{String.raw`e^{-i\omega_n t}`}</Tex> is common to both sides and never zero, so it
            cancels, leaving the time-independent eigenvalue equation Eq.&nbsp;(10).
            <EqBlock>{String.raw`\mathcal{H}\,u_n = \hbar\omega_n\,u_n`}</EqBlock>
          </Step>
          <Step title="Build the general state">
            By completeness Eq.&nbsp;(12), any solution is a linear combination; each component evolves with its
            own phase, giving the superposition Eq.&nbsp;(13).
            <EqBlock>{String.raw`\psi(\mathbf{r},t) = \sum_n C_n u_n(\mathbf{r}) e^{-i\omega_n t}`}</EqBlock>
          </Step>
          <Step title="Coefficient normalization">
            Insert Eq.&nbsp;(13) into Eq.&nbsp;(3) and use orthonormality Eq.&nbsp;(11). The cross terms{" "}
            <Tex>{String.raw`(n\neq m)`}</Tex> vanish under the integral, leaving{" "}
            <Tex>{String.raw`\sum_n |C_n|^2 = 1`}</Tex>. Hence <Tex>{String.raw`|C_n|^2`}</Tex> is a probability.
            <EqBlock>{String.raw`\int \psi^*\psi\,d^3r = \sum_{n,m} C_n^* C_m e^{i(\omega_n-\omega_m)t}\delta_{nm} = \sum_n |C_n|^2 = 1`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="warning" title="Energies are written ℏωₙ, not Eₙ">
          This book consistently labels energy eigenvalues as <Tex>{String.raw`\hbar\omega_n`}</Tex> rather than{" "}
          <Tex>{String.raw`E_n`}</Tex>. The <Tex>{String.raw`\omega_n`}</Tex> are the literal angular frequencies
          of the stationary-state phases — which is exactly why energy <em>differences</em> become observable beat
          (radiation) frequencies. Preserve this notation.
        </Callout>
        <Callout kind="insight" title="Single state = no radiation">
          For one eigenstate, <Tex>{String.raw`\psi^*\psi=|u_n|^2`}</Tex> is time-independent: the charge cloud is
          frozen, <Tex>{String.raw`\langle e\mathbf{r}\rangle`}</Tex> is constant, nothing radiates. Radiation
          requires a superposition — the seed of stimulated emission.
        </Callout>
      </Section>

      <Section title="1-3. Particle in a one-dimensional infinite well">
        <Intuition>
          The simplest exactly-solvable bound system: an electron trapped between two infinitely hard walls a
          distance <Tex>{String.raw`L`}</Tex> apart. Inside, it is free; outside, the wavefunction must vanish. The
          boundary conditions quantize the allowed wavelengths to <strong>standing waves</strong> with nodes at the
          walls — exactly like a guitar string — giving discrete energies that grow as{" "}
          <Tex>{String.raw`n^2`}</Tex>. This is the cleanest place to watch a two-state superposition make a dipole
          oscillate.
        </Intuition>
        <p>
          The Hamiltonian is a free particle inside the well and infinite walls outside (the electron cannot
          escape):
        </p>
        <EqBlock label="15">{String.raw`\mathcal{H} = \frac{p^2}{2m} = -\frac{\hbar^2}{2m}\frac{d^2}{dx^2}, \quad 0\le x \le L; \qquad \mathcal{H} = \infty, \quad x<0,\ x>L`}</EqBlock>
        <p>
          The normalized eigenfunctions are standing waves vanishing at both walls, with quantized wave numbers
          fixed by <Tex>{String.raw`\sin(K_n L)=0`}</Tex>:
        </p>
        <EqBlock label="16">{String.raw`u_n(x) = \left(\frac{2}{L}\right)^{1/2}\sin K_n x, \quad 0\le x\le L; \qquad u_n(x)=0\ \text{elsewhere}`}</EqBlock>
        <EqBlock label="17">{String.raw`K_n = \frac{n\pi}{L}, \quad n = 1, 2, \ldots`}</EqBlock>
        <p>The energies follow as the kinetic energy of the standing wave, growing quadratically with <Tex>{String.raw`n`}</Tex>:</p>
        <KeyResult
          number="18"
          eq={String.raw`\hbar\omega_n = \frac{1}{2}\frac{\hbar^2 K_n^2}{m} = \frac{1}{2}\frac{\hbar^2\pi^2}{mL^2}n^2`}
          label="Box energy levels"
          note={
            <>
              Discreteness comes from the boundary conditions — classically any energy would be allowed.
            </>
          }
        />
        <p>The general state in the box is the box specialization of Eq.&nbsp;(13):</p>
        <EqBlock label="19">{String.raw`\psi(x,t) = \left(\frac{2}{L}\right)^{1/2}\sum_n C_n \sin K_n x\,\exp(-i\omega_n t)`}</EqBlock>
        <Derivation title="Solve the infinite well">
          <Step title="Solve inside the well">
            With <Tex>{String.raw`\mathcal{H}=-(\hbar^2/2m)\,d^2/dx^2`}</Tex> and eigenvalue{" "}
            <Tex>{String.raw`\hbar\omega_n`}</Tex>, the TISE Eq.&nbsp;(10) becomes a harmonic equation whose general
            solution is a sine and a cosine of <Tex>{String.raw`K_n x`}</Tex>:
            <EqBlock>{String.raw`-\frac{\hbar^2}{2m}u_n'' = \hbar\omega_n u_n \;\Rightarrow\; u_n'' = -K_n^2 u_n,\quad K_n^2 = \frac{2m\omega_n}{\hbar}`}</EqBlock>
          </Step>
          <Step title="Apply the boundary conditions">
            Continuity with the infinite walls forces{" "}
            <Tex>{String.raw`u_n(0)=u_n(L)=0`}</Tex>. The first kills the cosine; the second requires{" "}
            <Tex>{String.raw`\sin(K_n L)=0`}</Tex>, so <Tex>{String.raw`K_n L = n\pi`}</Tex>:
            <EqBlock>{String.raw`\sin(K_n L)=0 \;\Rightarrow\; K_n = \frac{n\pi}{L}`}</EqBlock>
          </Step>
          <Step title="Normalize and read off the energy">
            Imposing <Tex>{String.raw`\int_0^L |u_n|^2 dx = 1`}</Tex> fixes the amplitude{" "}
            <Tex>{String.raw`(2/L)^{1/2}`}</Tex>. Then <Tex>{String.raw`\hbar\omega_n=\hbar^2 K_n^2/2m`}</Tex>:
            <EqBlock>{String.raw`\hbar\omega_n = \frac{\hbar^2 K_n^2}{2m} = \frac{\hbar^2\pi^2}{2mL^2}n^2`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="insight" title="Same math as a laser cavity">
          The book points forward: this boundary-value standing-wave problem &ldquo;has formal similarity with the
          mode problem of a laser resonator&rdquo; (Chapter&nbsp;8). Quantized box modes ↔ quantized optical-cavity
          modes — the same logic that picks out which frequencies a cavity supports.
        </Callout>
      </Section>

      <Section title="1-4. The simple harmonic oscillator">
        <Intuition>
          A particle of mass <Tex>{String.raw`m`}</Tex> in a restoring (parabolic) potential, oscillating
          classically at frequency <Tex>{String.raw`\Omega`}</Tex>. This is the single most important
          exactly-solvable system in the book, because the quantized radiation field of Chapter&nbsp;14 is{" "}
          <em>mathematically a collection of harmonic oscillators</em> — each field mode is an oscillator, and its
          energy quanta are photons. The spectrum is a perfectly <strong>even ladder</strong>{" "}
          <Tex>{String.raw`(n+\tfrac{1}{2})\hbar\Omega`}</Tex>; the uniform spacing (versus the box&rsquo;s{" "}
          <Tex>{String.raw`n^2`}</Tex> growth) is exactly why the oscillator describes photons of a single
          frequency.
        </Intuition>
        <p>
          Start from the classical oscillator Hamiltonian — kinetic plus parabolic (spring) potential — and quantize{" "}
          <Tex>{String.raw`p\to-i\hbar\,d/dx`}</Tex>:
        </p>
        <EqBlock label="20">{String.raw`\mathcal{H}_C = \frac{p^2}{2m} + \tfrac{1}{2}m\Omega^2 x^2`}</EqBlock>
        <EqBlock label="21">{String.raw`\mathcal{H}(x,p) = -\frac{\hbar^2}{2m}\frac{d^2}{dx^2} + \tfrac{1}{2}m\Omega^2 x^2`}</EqBlock>
        <p>
          The eigenfunctions are a Gaussian times a Hermite polynomial <Tex>{String.raw`H_n`}</Tex>, expressed in
          the dimensionless coordinate <Tex>{String.raw`\xi=(m\Omega/\hbar)^{1/2}x`}</Tex>:
        </p>
        <EqBlock label="22">{String.raw`u_n(x) = \phi_n(x) = \left(\frac{m\Omega}{\hbar\pi}\right)^{1/4}\frac{1}{(2^n n!)^{1/2}}\,H_n(\xi)\,\exp\!\left(-\tfrac{1}{2}\xi^2\right)`}</EqBlock>
        <EqBlock>{String.raw`\xi = (m\Omega/\hbar)^{1/2}\,x`}</EqBlock>
        <p>
          Normalizability quantizes the energy to a uniformly-spaced ladder with a zero-point energy{" "}
          <Tex>{String.raw`\tfrac{1}{2}\hbar\Omega`}</Tex> at <Tex>{String.raw`n=0`}</Tex>:
        </p>
        <KeyResult
          number="23"
          eq={String.raw`\hbar\omega_n = \hbar\Omega_n = (n+\tfrac{1}{2})\hbar\Omega, \quad n = 0, 1, 2, \ldots`}
          label="SHO energy ladder"
          note={
            <>
              Even spacing <Tex>{String.raw`\hbar\Omega`}</Tex>, with the vacuum (zero-point) energy{" "}
              <Tex>{String.raw`\tfrac{1}{2}\hbar\Omega`}</Tex>.
            </>
          }
        />
        <Derivation title="Quantize and solve the oscillator">
          <Step title="Quantize the Hamiltonian">
            Replace <Tex>{String.raw`p\to-i\hbar\,d/dx`}</Tex> in <Tex>{String.raw`\mathcal{H}_C`}</Tex> to get the
            operator Eq.&nbsp;(21); the eigenvalue equation is a 2nd-order ODE:
            <EqBlock>{String.raw`\left[-\frac{\hbar^2}{2m}\frac{d^2}{dx^2} + \tfrac{1}{2}m\Omega^2 x^2\right]u_n = \hbar\omega_n u_n`}</EqBlock>
          </Step>
          <Step title="Nondimensionalize">
            Substitute <Tex>{String.raw`\xi = (m\Omega/\hbar)^{1/2} x`}</Tex>; the equation becomes the Hermite
            differential equation, whose normalizable solutions are Hermite polynomials times a Gaussian:
            <EqBlock>{String.raw`\frac{d^2 u}{d\xi^2} + \left(\frac{2\omega_n}{\Omega} - \xi^2\right)u = 0`}</EqBlock>
          </Step>
          <Step title="Quantization condition">
            Normalizability of the Hermite series forces{" "}
            <Tex>{String.raw`2\omega_n/\Omega - 1 = 2n`}</Tex>, i.e.{" "}
            <Tex>{String.raw`\omega_n=(n+\tfrac{1}{2})\Omega`}</Tex>, giving the even ladder:
            <EqBlock>{String.raw`\hbar\omega_n = (n+\tfrac{1}{2})\hbar\Omega`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="insight" title="Each field mode is an oscillator">
          In Chapter&nbsp;14 the quantized electromagnetic field is built from harmonic oscillators — one per mode.
          The ladder rung <Tex>{String.raw`n`}</Tex> is the photon number; <Tex>{String.raw`\hbar\Omega`}</Tex> is
          the photon energy; <Tex>{String.raw`\tfrac{1}{2}\hbar\Omega`}</Tex> is the vacuum energy. Master this
          system.
        </Callout>
        <Callout kind="insight" title="Even ladder vs. box">
          Box: <Tex>{String.raw`\hbar\omega_n\propto n^2`}</Tex> (spreading). Oscillator:{" "}
          <Tex>{String.raw`\hbar\omega_n\propto (n+\tfrac{1}{2})`}</Tex> (uniform). Uniform spacing means all
          transitions <Tex>{String.raw`n\to n-1`}</Tex> share <em>one</em> frequency{" "}
          <Tex>{String.raw`\Omega`}</Tex> — the hallmark of a single-frequency oscillator/photon.
        </Callout>
      </Section>

      <Section title="1-5. The hydrogen atom and the radiating-dipole superposition">
        <Intuition>
          The real prototype of a laser atom: one electron bound to a proton by the Coulomb attraction. The
          spherically-symmetric <Tex>{String.raw`-e^2/r`}</Tex> potential makes spherical coordinates natural; the
          wavefunction separates into radial × angular parts, the angular pieces being the spherical harmonics{" "}
          <Tex>{String.raw`Y_{lm}`}</Tex>. The bound energies scale as{" "}
          <Tex>{String.raw`-R_\infty/n^2`}</Tex> — the famous Bohr/Rydberg spectrum, the source of real spectral
          lines. And here the chapter&rsquo;s whole arc lands: a superposition of two hydrogen levels makes{" "}
          <Tex>{String.raw`\langle e\mathbf{r}\rangle`}</Tex> oscillate at the Bohr difference frequency — the
          microscopic origin of emission and absorption.
        </Intuition>
        <p>
          The hydrogen Hamiltonian is kinetic energy plus the attractive Coulomb potential{" "}
          <Tex>{String.raw`-e^2/r`}</Tex> (Gaussian units — no <Tex>{String.raw`4\pi\varepsilon_0`}</Tex>), and its
          TISE is solved in spherical coordinates:
        </p>
        <EqBlock label="24">{String.raw`\mathcal{H}_C = \frac{p^2}{2m} - \frac{e^2}{r}`}</EqBlock>
        <EqBlock label="25">{String.raw`\left[-\frac{\hbar^2}{2m}\nabla^2 - \frac{e^2}{r}\right]u(\mathbf{r}) = \hbar\omega\, u(\mathbf{r})`}</EqBlock>
        <p>
          The eigenfunctions separate into a radial function <Tex>{String.raw`R_{nl}`}</Tex> and a spherical
          harmonic <Tex>{String.raw`Y_{lm}`}</Tex>, labeled by the quantum numbers{" "}
          <Tex>{String.raw`(n,l,m)`}</Tex>:
        </p>
        <EqBlock label="26">{String.raw`u_{nlm}(r,\theta,\phi) = R_{nl}(r)\,Y_{lm}(\theta,\phi)`}</EqBlock>
        <p>
          The lowest few orbitals (with the Bohr radius <Tex>{String.raw`a_0\approx 0.53\,\text{Å}`}</Tex>) — note
          the spherical <Tex>{String.raw`1s`}</Tex>, the <Tex>{String.raw`2s`}</Tex> node at{" "}
          <Tex>{String.raw`r=2a_0`}</Tex>, and the <Tex>{String.raw`p`}</Tex>-orbital angular factors:
        </p>
        <EqBlock label="27">{String.raw`u_{100}(r,\theta,\phi) = (\pi a_0^3)^{-1/2}\exp(-r/a_0)`}</EqBlock>
        <EqBlock label="28">{String.raw`u_{200}(r,\theta,\phi) = (32\pi a_0^3)^{-1/2}(2 - r/a_0)\exp(-r/2a_0)`}</EqBlock>
        <EqBlock label="29">{String.raw`u_{210}(r,\theta,\phi) = (32\pi a_0^3)^{-1/2}(r/a_0)\cos\theta\,\exp(-r/2a_0)`}</EqBlock>
        <EqBlock label="30">{String.raw`u_{21\pm1}(r,\theta,\phi) = (64\pi a_0^3)^{-1/2}(r/a_0)\sin\theta\,\exp(\pm i\phi)\exp(-r/2a_0)`}</EqBlock>
        <p>
          The bound energies are discrete, negative, and scale as <Tex>{String.raw`1/n^2`}</Tex> — these are the
          hydrogen spectral lines (<Tex>{String.raw`R_\infty`}</Tex> is the Rydberg energy):
        </p>
        <KeyResult
          number="31"
          eq={String.raw`\hbar\omega_n = \hbar\Omega_n = -\frac{e^2}{2a_0 n^2} = -\frac{R_\infty}{n^2}`}
          label="Hydrogen bound-state energies"
        />
        <p>
          A single stationary state evolves with its energy phase, and the general state is a superposition over
          all <Tex>{String.raw`(n,l,m)`}</Tex> — the basis for computing oscillating dipoles:
        </p>
        <EqBlock label="32">{String.raw`\psi_{nlm}(r,\theta,\phi,t) = \exp(-i\omega_n t)\,u_{nlm}(r,\theta,\phi)`}</EqBlock>
        <EqBlock label="33">{String.raw`\psi(r,\theta,\phi,t) = \sum_n \sum_l \sum_m C_{nlm}\exp(-i\omega_n t)\,u_{nlm}(r,\theta,\phi)`}</EqBlock>
        <p>
          The concrete payoff (Problem&nbsp;1-2): a <Tex>{String.raw`1s`}</Tex>–<Tex>{String.raw`2p`}</Tex>{" "}
          superposition. Evaluating <Tex>{String.raw`\langle e\mathbf{r}\rangle`}</Tex> needs the position vector in
          spherical components:
        </p>
        <EqBlock label="47">{String.raw`\psi(r,t) = C_{2100}\exp(-i\omega_2 t)\,u_{210} + C_{1000}\exp(-i\omega_1 t)\,u_{100}`}</EqBlock>
        <EqBlock label="48">{String.raw`\mathbf{r} = r\sin\theta\,(\hat{x}\cos\phi + \hat{y}\sin\phi) + \hat{z}\,r\cos\theta`}</EqBlock>
        <Derivation title="Hydrogen and the oscillating dipole">
          <Step title="Exploit spherical symmetry">
            Because <Tex>{String.raw`-e^2/r`}</Tex> depends only on <Tex>{String.raw`r`}</Tex>, write{" "}
            <Tex>{String.raw`\nabla^2`}</Tex> in spherical coordinates and separate{" "}
            <Tex>{String.raw`u=R(r)Y(\theta,\phi)`}</Tex>. The angular part is the spherical harmonics; the radial
            part gives <Tex>{String.raw`R_{nl}`}</Tex> (Laguerre polynomials).
            <EqBlock>{String.raw`u_{nlm} = R_{nl}(r)\,Y_{lm}(\theta,\phi)`}</EqBlock>
          </Step>
          <Step title="Discrete energy spectrum">
            Requiring <Tex>{String.raw`R_{nl}`}</Tex> to decay at large <Tex>{String.raw`r`}</Tex> quantizes the
            energy to the Bohr/Rydberg form, degenerate in <Tex>{String.raw`l`}</Tex> and{" "}
            <Tex>{String.raw`m`}</Tex> at each <Tex>{String.raw`n`}</Tex>:
            <EqBlock>{String.raw`\hbar\omega_n = -\frac{e^2}{2a_0 n^2}`}</EqBlock>
          </Step>
          <Step title="The oscillating dipole (the payoff)">
            Form the <Tex>{String.raw`1s`}</Tex>–<Tex>{String.raw`2p`}</Tex> superposition Eq.&nbsp;(47). The
            diagonal terms are static; the <em>cross</em> term carries the phase{" "}
            <Tex>{String.raw`e^{-i(\omega_2-\omega_1)t}`}</Tex>, so{" "}
            <Tex>{String.raw`\langle e\mathbf{r}\rangle(t)`}</Tex> oscillates at the Bohr frequency. A{" "}
            <Tex>{String.raw`1s`}</Tex>–<Tex>{String.raw`2p`}</Tex> mix has a nonzero (opposite-parity) dipole
            matrix element, so this term survives — that is emission/absorption at{" "}
            <Tex>{String.raw`\omega_{21}`}</Tex>:
            <EqBlock>{String.raw`\langle e\mathbf{r}\rangle(t) = \text{(static)} + 2\,\mathrm{Re}\big[C_{2p}^*C_{1s}\,e^{-i\omega_{21}t}\big]\!\int u_{2p}^*(e\mathbf{r})u_{1s}\,d^3r`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="insight" title="Bohr frequency = optical frequency">
          <Tex>{String.raw`\omega_{21} = \omega_2 - \omega_1 = (E_2 - E_1)/\hbar`}</Tex> is both the difference of
          stationary-state phases <em>and</em> the frequency of light the atom emits or absorbs. The whole chapter
          exists to make this identity concrete.
        </Callout>
        <Callout kind="insight" title="Degeneracy and perturbations">
          Several <Tex>{String.raw`(n,l,m)`}</Tex> share an energy. The book notes that a perturbation lifts the
          degeneracy — a preview of how external fields (and, later, the laser field itself) shift and split levels.
        </Callout>
      </Section>

      <Section title="1-6. Particle with spin: the two-level / Pauli formalism">
        <Intuition>
          Some quantum problems have no spatial story at all — <strong>spin</strong> is the cleanest. The electron
          carries an intrinsic magnetic moment <Tex>{String.raw`\boldsymbol{\mu}`}</Tex> that, in a magnetic field{" "}
          <Tex>{String.raw`\mathbf{B}`}</Tex>, has only <em>two</em> discrete orientations — as the
          Stern-Gerlach experiment showed by splitting a beam into exactly two. We represent these states as
          two-component column vectors and operators as <Tex>{String.raw`2\times 2`}</Tex> Pauli matrices. This is
          the prototype <strong>two-level system</strong> and the exact algebraic language the whole book uses to
          model a real laser atom.
        </Intuition>
        <Figure
          caption={
            <>
              Stern-Gerlach: an inhomogeneous field <Tex>{String.raw`\partial B/\partial z`}</Tex> sorts a beam of
              magnetic moments into <em>two</em> discrete deflections — the experimental icon of two-levelness.
            </>
          }
        >
          <svg viewBox="0 0 460 200" role="img" aria-label="Stern-Gerlach apparatus splitting a beam into two">
            <rect x="0" y="0" width="460" height="200" fill="#fbfcfe" />
            {/* oven / source */}
            <rect x="14" y="86" width="34" height="28" rx="4" fill="#e2e8f0" stroke="#94a3b8" />
            <text x="31" y="132" fontSize="11" textAnchor="middle" fill="#5b6473">oven</text>
            {/* magnet pole pieces */}
            <path d="M150 52 L300 52 L300 78 L210 78 L150 90 Z" fill="#cbd5e1" stroke="#94a3b8" />
            <rect x="150" y="120" width="150" height="26" fill="#cbd5e1" stroke="#94a3b8" />
            <text x="225" y="44" fontSize="12" textAnchor="middle" fill="#334155">N</text>
            <text x="225" y="162" fontSize="12" textAnchor="middle" fill="#334155">S</text>
            <text x="318" y="50" fontSize="11" fill="#5b6473">∂B/∂z</text>
            {/* incoming beam */}
            <line x1="48" y1="100" x2="150" y2="100" stroke="#4f46e5" strokeWidth="2" />
            {/* split beams */}
            <line x1="300" y1="100" x2="430" y2="66" stroke="#e11d48" strokeWidth="2" />
            <line x1="300" y1="100" x2="430" y2="134" stroke="#0891b2" strokeWidth="2" />
            {/* screen + spots */}
            <line x1="432" y1="40" x2="432" y2="160" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="430" cy="66" r="5" fill="#e11d48" />
            <circle cx="430" cy="134" r="5" fill="#0891b2" />
            <text x="448" y="69" fontSize="11" fill="#e11d48">↑</text>
            <text x="448" y="138" fontSize="11" fill="#0891b2">↓</text>
          </svg>
        </Figure>
        <p>
          Classically, a magnetic moment in a field has energy <Tex>{String.raw`-\boldsymbol{\mu}\cdot\mathbf{B}`}</Tex>,
          minimized when <Tex>{String.raw`\boldsymbol{\mu}`}</Tex> aligns with <Tex>{String.raw`\mathbf{B}`}</Tex>;
          an inhomogeneous field exerts a force proportional to the gradient and to the moment&rsquo;s orientation:
        </p>
        <EqBlock label="34">{String.raw`\mathcal{H}_C = -\boldsymbol{\mu}\cdot\mathbf{B} = -\mu B\cos\theta`}</EqBlock>
        <EqBlock label="35">{String.raw`F_z = -\frac{\partial\mathcal{H}_C}{\partial z} = \mu\cos\theta\,\frac{\partial B}{\partial z}`}</EqBlock>
        <p>
          Quantum-mechanically the two spin states are two-component column vectors, and the moment becomes an
          operator built from the Pauli spin vector (<Tex>{String.raw`g`}</Tex> the electron g-factor,{" "}
          <Tex>{String.raw`\mu_B`}</Tex> the Bohr magneton):
        </p>
        <EqBlock label="36">{String.raw`\begin{pmatrix}1\\0\end{pmatrix} \quad\text{and}\quad \begin{pmatrix}0\\1\end{pmatrix}`}</EqBlock>
        <EqBlock label="37">{String.raw`\boldsymbol{\mu} = -\tfrac{1}{2}g\mu_B\,\boldsymbol{\sigma}`}</EqBlock>
        <KeyResult
          number="38"
          eq={String.raw`\boldsymbol{\sigma} = \hat{x}\begin{pmatrix}0&1\\1&0\end{pmatrix} + \hat{y}\begin{pmatrix}0&-i\\i&0\end{pmatrix} + \hat{z}\begin{pmatrix}1&0\\0&-1\end{pmatrix}`}
          label="The Pauli spin matrices"
          note={
            <>
              The three matrices <Tex>{String.raw`\sigma_x,\sigma_y,\sigma_z`}</Tex> assembled into a vector
              operator.
            </>
          }
        />
        <p>
          The components do <em>not</em> commute — they cannot be simultaneously sharp. Their commutators are the
          spin algebra, summarized compactly by the (nonzero) self-cross-product:
        </p>
        <EqBlock label="39">{String.raw`[\sigma_x,\sigma_y] = \sigma_x\sigma_y - \sigma_y\sigma_x = 2i\sigma_z, \quad [\sigma_y,\sigma_z]=2i\sigma_x, \quad [\sigma_z,\sigma_x]=2i\sigma_y`}</EqBlock>
        <EqBlock label="40">{String.raw`\boldsymbol{\sigma}\times\boldsymbol{\sigma} = 2i\,\boldsymbol{\sigma}`}</EqBlock>
        <p>
          Combining <Tex>{String.raw`\sigma_x`}</Tex> and <Tex>{String.raw`\sigma_y`}</Tex> gives the
          raising/lowering operators that flip one basis state into the other — the prototypes of absorption and
          emission:
        </p>
        <EqBlock label="41">{String.raw`\sigma^+ = \tfrac{1}{2}(\sigma_x + i\sigma_y) = \begin{pmatrix}0&1\\0&0\end{pmatrix}`}</EqBlock>
        <EqBlock label="42">{String.raw`\sigma^- = \tfrac{1}{2}(\sigma_x - i\sigma_y) = \begin{pmatrix}0&0\\1&0\end{pmatrix}`}</EqBlock>
        <EqBlock label="43–44">{String.raw`\sigma^-\begin{pmatrix}1\\0\end{pmatrix} = \begin{pmatrix}0\\1\end{pmatrix}, \qquad \sigma^+\begin{pmatrix}0\\1\end{pmatrix} = \begin{pmatrix}1\\0\end{pmatrix}`}</EqBlock>
        <p>
          With <Tex>{String.raw`\mathbf{B}`}</Tex> along <Tex>{String.raw`z`}</Tex>, replacing the classical moment
          in Eq.&nbsp;(34) by the operator Eq.&nbsp;(37) leaves only <Tex>{String.raw`\sigma_z`}</Tex>, giving a
          diagonal Hamiltonian and a symmetric (Zeeman) splitting of the two energy eigenvalues:
        </p>
        <KeyResult
          number="45"
          eq={String.raw`\mathcal{H} = -\left(-\tfrac{1}{2}g\mu_B\boldsymbol{\sigma}\right)\cdot\mathbf{B} = \tfrac{1}{2}g\mu_B B\begin{pmatrix}1&0\\0&-1\end{pmatrix}`}
          label="Spin Hamiltonian (field along z)"
        />
        <EqBlock>{String.raw`\hbar\omega_n = \pm\tfrac{1}{2}g\mu_B B`}</EqBlock>
        <Derivation title="From classical moment to ladder operators">
          <Step title="Classical to quantum moment">
            Start from <Tex>{String.raw`\mathcal{H}_C=-\boldsymbol{\mu}\cdot\mathbf{B}`}</Tex>, Eq.&nbsp;(34).
            Replace <Tex>{String.raw`\boldsymbol{\mu}\to-\tfrac{1}{2}g\mu_B\boldsymbol{\sigma}`}</Tex>; with{" "}
            <Tex>{String.raw`\mathbf{B}`}</Tex> along <Tex>{String.raw`z`}</Tex> only{" "}
            <Tex>{String.raw`\sigma_z`}</Tex> survives:
            <EqBlock>{String.raw`\mathcal{H} = -\boldsymbol{\mu}\cdot\mathbf{B} \to \tfrac{1}{2}g\mu_B B\,\sigma_z`}</EqBlock>
          </Step>
          <Step title="Read off the eigenvalues">
            Eq.&nbsp;(45) is already diagonal in the basis Eq.&nbsp;(36), so the eigenvalues are{" "}
            <Tex>{String.raw`\pm\tfrac{1}{2}g\mu_B B`}</Tex> (the two-level splitting); the eigenvectors are the
            spin-up / spin-down columns.
            <EqBlock>{String.raw`\hbar\omega_\pm = \pm\tfrac{1}{2}g\mu_B B`}</EqBlock>
          </Step>
          <Step title="Build the ladder operators">
            Combine <Tex>{String.raw`\sigma_x,\sigma_y`}</Tex> into{" "}
            <Tex>{String.raw`\sigma^\pm=\tfrac{1}{2}(\sigma_x\pm i\sigma_y)`}</Tex> to get the off-diagonal
            raising/lowering matrices Eqs.&nbsp;(41)–(42), which flip the states (Eqs.&nbsp;43–44). These represent
            absorption (<Tex>{String.raw`\sigma^+`}</Tex>) and emission (<Tex>{String.raw`\sigma^-`}</Tex>):
            <EqBlock>{String.raw`\sigma^\pm = \tfrac{1}{2}(\sigma_x \pm i\sigma_y)`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="insight" title="The two-level atom lives here">
          Every laser-atom model in this book is, at heart, this two-state column-vector / Pauli-matrix system:{" "}
          <Tex>{String.raw`\sigma^+`}</Tex> ↔ absorb a photon, <Tex>{String.raw`\sigma^-`}</Tex> ↔ emit a photon,{" "}
          <Tex>{String.raw`\sigma_z`}</Tex> ↔ population inversion. The Stern-Gerlach two-beam split is its
          experimental icon.
        </Callout>
        <Callout kind="warning" title="Factor and sign checks">
          <Tex>{String.raw`\boldsymbol{\mu} = -\tfrac{1}{2}g\mu_B\boldsymbol{\sigma}`}</Tex> (the{" "}
          <Tex>{String.raw`-\tfrac{1}{2}`}</Tex> matters);{" "}
          <Tex>{String.raw`\mathcal{H} = +\tfrac{1}{2}g\mu_B B\,\sigma_z`}</Tex>; eigenvalues{" "}
          <Tex>{String.raw`\pm\tfrac{1}{2}g\mu_B B`}</Tex>. The book uses Gaussian units throughout, so the Coulomb
          potential is <Tex>{String.raw`-e^2/r`}</Tex> (no <Tex>{String.raw`4\pi\varepsilon_0`}</Tex>).
        </Callout>
      </Section>

      <Section title="The oscillating dipole, made visible">
        <p>
          Time to <em>see</em> the chapter&rsquo;s entire arc in one picture. Prepare an electron in the box as a
          superposition of two eigenstates <Tex>{String.raw`n`}</Tex> and <Tex>{String.raw`m`}</Tex>. Its
          probability density develops a cross term that sloshes the charge cloud back and forth, and its dipole
          centroid <Tex>{String.raw`\langle x\rangle(t)`}</Tex> oscillates at <em>exactly</em> the Bohr difference
          frequency:
        </p>
        <KeyResult
          eq={String.raw`P(x,t) = |\psi|^2 = C_n^2 u_n^2 + C_m^2 u_m^2 + 2 C_n |C_m|\,u_n u_m \cos\!\big((\omega_m-\omega_n)t - \varphi\big)`}
          label="Probability density of the two-state superposition"
        />
        <KeyResult
          eq={String.raw`\langle x\rangle(t) = \frac{L}{2} + 2 C_n |C_m|\,x_{nm}\cos\!\big((\omega_m-\omega_n)t - \varphi\big),\qquad x_{nm}=\int_0^L x\,u_n u_m\,dx`}
          label="Oscillating dipole centroid"
          note={
            <>
              The static part is exactly <Tex>{String.raw`L/2`}</Tex>. The closed form{" "}
              <Tex>{String.raw`x_{nm}=-8Lnm/[\pi^2(m^2-n^2)^2]`}</Tex> is nonzero only when{" "}
              <Tex>{String.raw`m-n`}</Tex> is odd — a selection rule.
            </>
          }
        />
        <SimFrame
          title="The oscillating dipole: a two-state superposition in a box"
          caption={
            <>
              Animate <Tex>{String.raw`|\psi(x,t)|^2`}</Tex> for an electron in a 1-D infinite well prepared as{" "}
              <Tex>{String.raw`C_n u_n e^{-i\omega_n t} + C_m u_m e^{-i\omega_m t}`}</Tex>, and read the dipole
              centroid <Tex>{String.raw`\langle x\rangle(t)`}</Tex> slosh at the Bohr frequency{" "}
              <Tex>{String.raw`\omega_m-\omega_n`}</Tex>.
            </>
          }
          tryThis={
            <>
              Set the mixing <Tex>{String.raw`|C_m|^2`}</Tex> to <Tex>{String.raw`0`}</Tex> or{" "}
              <Tex>{String.raw`1`}</Tex>: a single eigenstate, the cloud freezes, no radiation. Push it to{" "}
              <Tex>{String.raw`0.5`}</Tex> for the biggest swing. Now choose <Tex>{String.raw`m-n`}</Tex>{" "}
              <em>even</em> (say <Tex>{String.raw`n=1,\,m=3`}</Tex>): watch{" "}
              <Tex>{String.raw`x_{nm}\to 0`}</Tex> and the centroid stop oscillating even though{" "}
              <Tex>{String.raw`|\psi|^2`}</Tex> still breathes — that is a selection rule. Shrink{" "}
              <Tex>{String.raw`L`}</Tex> and the frequency climbs toward optical/UV.
            </>
          }
        >
          <Ch01Sim />
        </SimFrame>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from Chapter I">
          <ul>
            <li>
              <strong>Superposition</strong> <Tex>{String.raw`\psi = \sum_n C_n u_n e^{-i\omega_n t}`}</Tex>{" "}
              (Eq.&nbsp;13) is the universal form of a quantum state; <Tex>{String.raw`|C_n|^2`}</Tex> are
              state-occupation probabilities (<Tex>{String.raw`\sum_n|C_n|^2=1`}</Tex>). Every later calculation
              expands states this way.
            </li>
            <li>
              <strong>Eigenvalue equation</strong> <Tex>{String.raw`\mathcal{H}u_n = \hbar\omega_n u_n`}</Tex>{" "}
              (Eq.&nbsp;10) defines stationary states; the book labels energies as{" "}
              <Tex>{String.raw`\hbar\omega_n`}</Tex> (angular frequencies), <em>not</em>{" "}
              <Tex>{String.raw`E_n`}</Tex> — the phase rates that beat into radiation frequencies.
            </li>
            <li>
              <strong>The dipole moment</strong> <Tex>{String.raw`\langle e\mathbf{r}\rangle`}</Tex> (Eq.&nbsp;5)
              is THE laser observable: static for one eigenstate, oscillating at{" "}
              <Tex>{String.raw`\omega_{21}=\omega_2-\omega_1`}</Tex> for a two-state superposition — the
              microscopic origin of emission/absorption and of the atomic polarization that drives a laser medium.
            </li>
            <li>
              <strong>The oscillator</strong> with its even ladder{" "}
              <Tex>{String.raw`\hbar\omega_n=(n+\tfrac{1}{2})\hbar\Omega`}</Tex> is the model for each quantized
              field mode in Chapter&nbsp;14 — rungs are photon numbers,{" "}
              <Tex>{String.raw`\tfrac{1}{2}\hbar\Omega`}</Tex> is the zero-point energy.
            </li>
            <li>
              <strong>The infinite well</strong> is the structural analog of the laser-cavity / resonator mode
              problem (Chapter&nbsp;8).
            </li>
            <li>
              <strong>The two-component / Pauli formalism</strong> is the prototype two-level atom used throughout:{" "}
              <Tex>{String.raw`\sigma^+`}</Tex> = absorption, <Tex>{String.raw`\sigma^-`}</Tex> = emission,{" "}
              <Tex>{String.raw`\sigma_z`}</Tex> = population inversion;{" "}
              <Tex>{String.raw`\boldsymbol{\sigma}\times\boldsymbol{\sigma}=2i\boldsymbol{\sigma}`}</Tex> is the
              spin algebra.
            </li>
            <li>
              <strong>Hydrogen</strong> gives real spectral lines{" "}
              <Tex>{String.raw`\hbar\omega_n = -R_\infty/n^2`}</Tex>; degeneracies in{" "}
              <Tex>{String.raw`(l,m)`}</Tex> can be split by perturbations. <strong>Units:</strong> Gaussian
              throughout — Coulomb energy <Tex>{String.raw`-e^2/r`}</Tex>, with{" "}
              <Tex>{String.raw`a_0\approx 0.53\,\text{Å}`}</Tex>.
            </li>
          </ul>
          Next chapter we shine light on this atom and watch the populations flop — Rabi oscillations, the Einstein
          coefficients, and the first hint of why a laser needs inversion.
        </Callout>
      </Section>
    </Lesson>
  );
}
