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
import Ch19Sim from "@/components/sims/ch19";

export default function Page() {
  return (
    <Lesson slug="ch19">
      <Lede>
        Every laser mode lives in contact with things we refuse to track: lossy mirrors, walls, the vacuum, the pump&rsquo;s
        incoherent baggage. Collectively these are a <strong>reservoir</strong> — a vast bath of harmonic oscillators
        weakly coupled to the one degree of freedom we care about. Reservoir theory is the machinery for cleanly amputating
        the bath while keeping its two physical fingerprints: it <strong>damps</strong> the system (energy leaks out) and it
        <strong> kicks</strong> the system (random noise rattles it). The deep lesson — the
        <strong> fluctuation&ndash;dissipation theorem</strong> — is that these are not two facts but one: damping and noise
        are two faces of the same coupling, and the noise strength is rigidly fixed by the damping rate and temperature.
      </Lede>

      <Section title="Why eliminate the reservoir? The two fingerprints of a bath">
        <Intuition>
          Chapter XVI wrote an exact equation of motion for a system coupled to a reservoir. That is honest but useless: the
          reservoir has astronomically many degrees of freedom we neither know nor want. The program here is to
          <em> project them out</em> and keep only their net effect. A reservoir does exactly two things to whatever it
          touches — it drains energy (friction) and injects fluctuations (noise). The genius of the <strong>Langevin</strong>
          viewpoint is to package the entire bath into a single fluctuating force <Tex>{String.raw`F(t)`}</Tex> plus a
          deterministic damping term. The force is Gaussian, zero-mean, and <em>delta-correlated</em>: the bath forgets
          instantly.
        </Intuition>
        <p>
          The same skeleton — deterministic drift plus delta-correlated noise — recurs three times in rising sophistication.
          Each pass teaches the same idea with more machinery, and the third pass is the tool you actually carry forward into
          the noisy laser equations of Chapter XX.
        </p>
        <Callout kind="note" title="Three passes at one idea">
          <ul>
            <li>
              <strong>19&ndash;1</strong> — classical Brownian motion: a pollen grain jiggling in water (build intuition + the
              fluctuation&ndash;dissipation theorem).
            </li>
            <li>
              <strong>19&ndash;2</strong> — the quantum damped oscillator: a single cavity photon mode coupled to a bath (the
              laser-mode prototype).
            </li>
            <li>
              <strong>19&ndash;3</strong> — the general drift/diffusion recipe (the generalized Einstein relation) for
              <em> any</em> system operator.
            </li>
          </ul>
        </Callout>
        <Callout kind="insight" title="The Markoff approximation is the linchpin">
          Everything hinges on the reservoir correlation time <Tex>{String.raw`\tau_c`}</Tex> being negligibly short
          compared to the system&rsquo;s evolution time. Then the bath force at time <Tex>{String.raw`t`}</Tex> is
          statistically uncorrelated with itself at any other time, and the noise looks &ldquo;white&rdquo;
          (delta-correlated). This is precisely what lets a many-body bath collapse into one simple stochastic force.
        </Callout>
      </Section>

      <Section title="19–1a · Classical Langevin equation and the drift">
        <Intuition>
          Picture a pollen grain of mass <Tex>{String.raw`m`}</Tex> suspended in a liquid. Newton&rsquo;s law has a force,
          but that force splits into two pieces of utterly different character: a smooth viscous drag proportional to velocity
          (the systematic part) and a wildly fluctuating molecular bombardment <Tex>{String.raw`F_n(t)`}</Tex> (the random
          part). The drag <em>is</em> the average effect of the bombardment; the fluctuating remainder is what is left over
          after you subtract that average. Average the equation over an ensemble and the zero-mean random force dies, leaving a
          clean exponential decay of the mean velocity — the <strong>drift</strong>.
        </Intuition>
        <p>
          Start from Newton&rsquo;s second law for one Cartesian component of the suspended particle, an external
          force plus the force exerted by the liquid reservoir, which both damps the motion and makes it jitter:
        </p>
        <EqBlock label="1">{String.raw`m\dot{v} = F_{\mathrm{ext}}(t) + F_{\mathrm{res}}(t).`}</EqBlock>
        <p>
          The reservoir force splits into a deterministic viscous drag and a rapidly fluctuating molecular force. We
          <em> define</em> the drag so that the remainder has zero mean:
        </p>
        <EqBlock label="2">{String.raw`F_{\mathrm{res}}(t) = -m\,\Gamma\, v(t) + F_n(t),`}</EqBlock>
        <EqBlock label="3">{String.raw`\langle F_n(t)\rangle = 0.`}</EqBlock>
        <p>
          Substituting the split into Eq.&nbsp;(1) and ignoring the external force <Tex>{String.raw`F_{\mathrm{ext}}`}</Tex>
          gives the <strong>classical Langevin equation</strong> — the master template of the whole
          chapter: deterministic damping plus white-noise driving.
        </p>
        <KeyResult
          number="4"
          eq={String.raw`m\dot{v}(t) = -m\,\Gamma\, v(t) + F_n(t)`}
          label="Classical Langevin equation"
          note={
            <>
              The fluctuating force is Markoffian — delta-correlated with strength set by the velocity diffusion coefficient{" "}
              <Tex>{String.raw`D_{vv}`}</Tex>:{" "}
              <Tex>{String.raw`\langle F_n(t)\,F_n(t')\rangle = 2D_{vv}\,\delta(t-t')`}</Tex> (the factor 2 is a moment-definition
              convention).
            </>
          }
        />
        <EqBlock label="6">{String.raw`\langle F_n(t)\,F_n(t')\rangle = 2D_{vv}\,\delta(t-t').`}</EqBlock>
        <p>
          Average Eq.&nbsp;(4) over the ensemble. Because <Tex>{String.raw`\langle F_n\rangle = 0`}</Tex>, the noise drops out
          and the mean velocity obeys pure exponential relaxation:
        </p>
        <EqBlock label="5">{String.raw`m\langle\dot{v}(t)\rangle = -m\,\Gamma\,\langle v(t)\rangle \;\;\Rightarrow\;\; \langle v(t)\rangle = \langle v(0)\rangle\,e^{-\Gamma t}.`}</EqBlock>
        <p>
          Integrating the Langevin equation over a short window <Tex>{String.raw`\Delta t`}</Tex> with{" "}
          <Tex>{String.raw`\tau_c \ll \Delta t \ll 1/\Gamma`}</Tex> defines the first Fokker&ndash;Planck moment, the
          <strong> drift</strong>:
        </p>
        <KeyResult
          number="10"
          eq={String.raw`M_1 = \frac{\langle\Delta v\rangle}{\Delta t} = -\Gamma\,\langle v(t)\rangle`}
          label="First Fokker–Planck moment (drift)"
        />
        <Derivation title="Split the force, average, and extract the drift">
          <Step title="Split into mean and fluctuation">
            The liquid exerts a velocity-dependent average force (friction) plus the leftover random bombardment. Define the
            drag as <Tex>{String.raw`-m\Gamma v`}</Tex> so that the remainder <Tex>{String.raw`F_n`}</Tex> has zero mean,
            Eq.&nbsp;(3). This decomposition is a <em>definition</em>, not an approximation — the physics enters when we model
            the statistics of <Tex>{String.raw`F_n`}</Tex>.
            <EqBlock>{String.raw`F_{\mathrm{res}} = \underbrace{-m\Gamma v}_{\text{drift}} + \underbrace{F_n(t)}_{\langle F_n\rangle=0}.`}</EqBlock>
          </Step>
          <Step title="Average to extract the drift">
            Take the ensemble average of Eq.&nbsp;(4). The mean velocity obeys a first-order linear ODE whose solution
            identifies <Tex>{String.raw`\Gamma`}</Tex> as the systematic decay rate.
            <EqBlock>{String.raw`\langle v(t)\rangle = \langle v(0)\rangle\,e^{-\Gamma t}.`}</EqBlock>
          </Step>
          <Step title="Coarse-grain to define the first moment">
            Integrate Eq.&nbsp;(4) over a time <Tex>{String.raw`\Delta t`}</Tex> long compared to the bath memory{" "}
            <Tex>{String.raw`\tau_c`}</Tex> but short compared to <Tex>{String.raw`1/\Gamma`}</Tex>. The drift contribution
            gives <Tex>{String.raw`M_1`}</Tex>. This coarse-graining is exactly what makes the process Markoffian and prepares
            the Fokker&ndash;Planck description.
            <EqBlock>{String.raw`M_1 \equiv \frac{\langle\Delta v\rangle}{\Delta t} = -\Gamma\langle v\rangle.`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="warning" title="Glyph warning: script C = Γ">
          The scan writes the classical friction rate as a script/italic capital <Tex>{String.raw`\mathscr{C}`}</Tex> in
          Eqs.&nbsp;(2),&nbsp;(4),&nbsp;(5),&nbsp;(10),&nbsp;(15), then switches to capital <Tex>{String.raw`\Gamma`}</Tex>
          from Eq.&nbsp;(19) onward and confirms the identity at Eq.&nbsp;(23). They are the <strong>same constant</strong>. We
          use <Tex>{String.raw`\Gamma`}</Tex> throughout for the classical velocity-damping rate, and reserve lowercase{" "}
          <Tex>{String.raw`\gamma`}</Tex> for the distinct quantum decay rate of Sec.&nbsp;19&ndash;2.
        </Callout>
      </Section>

      <Section title="19–1b · Fokker–Planck moments and the fluctuation–dissipation theorem">
        <Intuition>
          Once the coarse-grained dynamics is Markoffian, the velocity distribution <Tex>{String.raw`P(v,t)`}</Tex> obeys a
          Fokker&ndash;Planck equation built from just two ingredients: the <strong>drift</strong> (first moment — how the
          average slides) and the <strong>diffusion</strong> (second moment — how the distribution spreads). The punchline:
          in steady state the distribution must be Maxwell&ndash;Boltzmann, where equipartition fixes the mean kinetic energy.
          Demanding that the dynamics relax to <em>that</em> distribution forces a rigid relation between the diffusion
          coefficient, the damping, and the temperature. Damping and noise are locked together.
        </Intuition>
        <KeyResult
          number="7"
          eq={String.raw`\frac{\partial}{\partial t}P(v,t) = -\frac{\partial}{\partial v}\big(M_1 P\big) + \frac{1}{2}\frac{\partial^2}{\partial v^2}\big(M_2 P\big)`}
          label="Fokker–Planck equation"
          note={
            <>
              The first-derivative term (drift) shifts the mean; the second-derivative term (diffusion) broadens the
              distribution. The moments are <Tex>{String.raw`M_n = \langle(\Delta v)^n\rangle/\Delta t`}</Tex>; only{" "}
              <Tex>{String.raw`n=1,2`}</Tex> survive in the Markoff limit.
            </>
          }
        />
        <EqBlock label="7–8">{String.raw`M_n = \frac{\langle(\Delta v)^n\rangle}{\Delta t}, \qquad \Delta v(t) = v(t+\Delta t) - v(t).`}</EqBlock>
        <p>
          Formally integrating the Langevin equation over the window gives the increment that builds both moments:
        </p>
        <EqBlock label="9">{String.raw`\Delta v(t) = -\Gamma\!\int_{t}^{t+\Delta t}\!dt'\,v(t') + \frac{1}{m}\!\int_{t}^{t+\Delta t}\!dt'\,F_n(t').`}</EqBlock>
        <p>
          Square the increment and average. The cross terms with the drag are higher order in{" "}
          <Tex>{String.raw`\Delta t`}</Tex>; only the noise&ndash;noise term survives to leading order:
        </p>
        <EqBlock label="11">{String.raw`M_2 = \frac{\langle(\Delta v)^2\rangle}{\Delta t} = \frac{1}{m^2}\!\int_{t}^{t+\Delta t}\!dt'\!\int_{t}^{t+\Delta t}\!dt''\,\langle F_n(t')F_n(t'')\rangle + O(\Gamma).`}</EqBlock>
        <p>
          Using the delta-correlation (6), the double integral collapses to a single factor, and the second moment is
          identified with the diffusion coefficient:
        </p>
        <EqBlock label="17–18">{String.raw`M_2 = \frac{\langle(\Delta v)^2\rangle}{\Delta t} = \frac{2D_{vv}}{m^2}.`}</EqBlock>
        <p>
          The integrated solution also fixes the equal-time correlation of velocity with the driving force — nonzero because{" "}
          <Tex>{String.raw`v`}</Tex> at the instant <Tex>{String.raw`t`}</Tex> responds to <Tex>{String.raw`F_n`}</Tex> at{" "}
          <Tex>{String.raw`t`}</Tex>:
        </p>
        <EqBlock label="14–15">{String.raw`\langle v(t')\,F_n(t)\rangle = \frac{D_{vv}}{m}, \qquad \langle v(t)\,F_n(t)\rangle = \frac{D_{vv}}{m}.`}</EqBlock>
        <p>
          Now form the equation of motion for the mean-square velocity. Damping pulls{" "}
          <Tex>{String.raw`\langle v^2\rangle`}</Tex> down at rate <Tex>{String.raw`2\Gamma`}</Tex>; the force&ndash;velocity
          correlation pumps it up. The competition sets the steady state:
        </p>
        <EqBlock label="19">{String.raw`\frac{d}{dt}\langle v^2\rangle = 2\langle v\dot v\rangle = -2\Gamma\langle v^2\rangle + \frac{2}{m}\langle v(t)F_n(t)\rangle,`}</EqBlock>
        <EqBlock label="20">{String.raw`2D_{vv} = 2\Gamma m^{2}\langle v^2\rangle + m^2\frac{d}{dt}\langle v^2\rangle.`}</EqBlock>
        <p>
          In steady state the derivative term vanishes, and the equipartition theorem fixes the mean kinetic energy:
        </p>
        <EqBlock label="21">{String.raw`\tfrac{1}{2}m\langle v^2\rangle = \tfrac{1}{2}k_B T \;\;\Rightarrow\;\; \langle v^2\rangle = \frac{k_B T}{m}.`}</EqBlock>
        <p>Substituting into the balance (20) immediately yields the theorem at the heart of the chapter:</p>
        <KeyResult
          number="22"
          eq={String.raw`D_{vv} = m\,\Gamma\, k_B T`}
          label="Fluctuation–dissipation theorem (velocity form)"
          note={
            <>
              The diffusion coefficient is rigidly tied to the damping rate and temperature. Noise strength is{" "}
              <em>not free</em> — a bath that drains energy must inject fluctuations, and damping fixes how hard.
            </>
          }
        />
        <p>
          The same statement can be turned around as a spectral relation: the damping rate is the integral of the force
          autocorrelation (the Johnson-noise analog follows by substituting the resistance <Tex>{String.raw`R`}</Tex>):
        </p>
        <EqBlock label="23">{String.raw`\Gamma = \frac{1}{2k_B T\,m}\int_{-\infty}^{\infty} dt\,\langle F_n(t)F_n(0)\rangle.`}</EqBlock>
        <Derivation title="From the moments to the fluctuation–dissipation theorem">
          <Step title="Build the second moment from the noise">
            Square the integrated increment (9) and average. The cross terms with the drag are higher order in{" "}
            <Tex>{String.raw`\Delta t`}</Tex>; the surviving piece is the double time-integral of the force autocorrelation
            (11). Using the delta-correlation (6), the double integral collapses, giving{" "}
            <Tex>{String.raw`M_2 = 2D_{vv}/m^2`}</Tex>.
            <EqBlock>{String.raw`M_2 = \frac{1}{m^2}\!\int\!\!\int \langle F_n F_n\rangle\,dt'dt'' = \frac{2D_{vv}}{m^2}.`}</EqBlock>
          </Step>
          <Step title="Write the energy balance">
            Multiply the Langevin equation by <Tex>{String.raw`v`}</Tex> and average. The drag gives{" "}
            <Tex>{String.raw`-2\Gamma\langle v^2\rangle`}</Tex>; the noise gives the equal-time correlation{" "}
            <Tex>{String.raw`\langle vF_n\rangle = D_{vv}/m`}</Tex>. This yields Eqs.&nbsp;(19)&ndash;(20).
            <EqBlock>{String.raw`\frac{d}{dt}\langle v^2\rangle = -2\Gamma\langle v^2\rangle + \frac{2D_{vv}}{m^2}.`}</EqBlock>
          </Step>
          <Step title="Impose equilibrium and read off the theorem">
            In steady state <Tex>{String.raw`d\langle v^2\rangle/dt = 0`}</Tex> and equipartition gives{" "}
            <Tex>{String.raw`\langle v^2\rangle = k_B T/m`}</Tex>. Substituting into the balance immediately yields the
            fluctuation&ndash;dissipation theorem. Damping and fluctuation are now provably the same coupling.
            <EqBlock>{String.raw`0 = -2\Gamma\frac{k_BT}{m} + \frac{2D_{vv}}{m^2}\;\Rightarrow\; D_{vv}=m\Gamma k_BT.`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="insight" title="The chapter's conceptual anchor">
          <Tex>{String.raw`D_{vv} = m\,\Gamma\, k_B T`}</Tex> is the classical fluctuation&ndash;dissipation theorem.
          Everything quantum that follows is this statement promoted to operators:{" "}
          <Tex>{String.raw`\langle F^\dagger F\rangle = \gamma\bar n`}</Tex> (thermal) and{" "}
          <Tex>{String.raw`\langle F F^\dagger\rangle = \gamma(\bar n+1)`}</Tex> (vacuum + thermal).
        </Callout>
        <Callout kind="warning" title="Why the diffusion term survives but the drag's contribution to M₂ doesn't">
          Over a window with <Tex>{String.raw`\tau_c \ll \Delta t \ll 1/\Gamma`}</Tex>, the noise contributes{" "}
          <Tex>{String.raw`O(\Delta t)`}</Tex> to <Tex>{String.raw`\langle(\Delta v)^2\rangle`}</Tex> (because of the
          delta-correlation), while the systematic drag contributes <Tex>{String.raw`O((\Delta t)^2)`}</Tex>. Hence{" "}
          <Tex>{String.raw`M_2`}</Tex> is purely a noise quantity to leading order.
        </Callout>
      </Section>

      <Section title="19–2 · Quantum damped harmonic oscillator: eliminating the reservoir">
        <Intuition>
          Now replace the pollen grain with a single quantized field mode (one laser/cavity mode), annihilation operator{" "}
          <Tex>{String.raw`a`}</Tex>, frequency <Tex>{String.raw`\Omega`}</Tex>. It couples to a reservoir of harmonic
          oscillators <Tex>{String.raw`b_j`}</Tex> — the lossy mirror, the walls, the electromagnetic vacuum. The coupling is
          the rotating-wave beam-splitter form <Tex>{String.raw`g_j(a\,b_j^\dagger + b_j\,a^\dagger)`}</Tex>: a photon can hop
          from the system into a bath mode and back. We solve the bath&rsquo;s Heisenberg equations formally, substitute back,
          and — using the Markoff approximation — the reservoir collapses into exactly two terms: a damping{" "}
          <Tex>{String.raw`-(\gamma/2)A`}</Tex> and a quantum noise operator <Tex>{String.raw`F(t)`}</Tex>. The result is a
          quantum Langevin equation with the identical structure as the classical one.
        </Intuition>
        <p>
          The total Hamiltonian is system oscillator plus reservoir of oscillators plus the rotating-wave coupling that
          exchanges single quanta:
        </p>
        <KeyResult
          number="24"
          eq={String.raw`\mathscr{H} = \mathscr{H}_a + \mathscr{H}_r + \mathscr{V} = \hbar\Omega\big(a^\dagger a + \tfrac12\big) + \hbar\sum_j \omega_j\big(b_j^\dagger b_j + \tfrac12\big) + \hbar\sum_j g_j\big(a b_j^\dagger + b_j a^\dagger\big)`}
          label="Total Hamiltonian (system + reservoir + coupling)"
        />
        <p>
          The Heisenberg equations follow at once. The system operator leaks into the bath; each bath mode is driven by the
          system:
        </p>
        <EqBlock label="25">{String.raw`\dot a(t) = \frac{i}{\hbar}[\mathscr{H}, a] = -i\Omega\, a(t) - i\sum_j g_j\, b_j(t),`}</EqBlock>
        <EqBlock label="26">{String.raw`\dot b_j(t) = -i\omega_j\, b_j(t) - i g_j\, a(t).`}</EqBlock>
        <p>
          Integrate the bath equation exactly: a freely evolving &ldquo;initial&rdquo; part plus a driven part fed by the
          system&rsquo;s history. This is the move that makes elimination possible:
        </p>
        <EqBlock label="27">{String.raw`b_j(t) = b_j(t_0)\,e^{-i\omega_j(t-t_0)} - i g_j\!\int_{t_0}^{t}\! dt'\, a(t')\,e^{-i\omega_j(t-t')}.`}</EqBlock>
        <p>
          Insert this back into the system equation. The driven part becomes a self-action integral over{" "}
          <Tex>{String.raw`a`}</Tex>&rsquo;s past (the damping kernel); the free part becomes the noise:
        </p>
        <EqBlock label="28">{String.raw`\dot a(t) = -i\Omega\, a(t) - \sum_j g_j^2\!\int_{t_0}^{t}\! dt'\, a(t')\,e^{-i\omega_j(t-t')} - i\sum_j g_j\, b_j(t_0)\,e^{-i\omega_j(t-t_0)}.`}</EqBlock>
        <p>
          With a near-continuum of bath modes the kernel is sharply peaked in <Tex>{String.raw`\tau`}</Tex>: pull{" "}
          <Tex>{String.raw`a(t-\tau)`}</Tex> out at <Tex>{String.raw`a(t)`}</Tex>, extend the integral to infinity, and the
          integral over the density of states yields a real damping rate. This is the <strong>Markoff approximation</strong>:
        </p>
        <EqBlock label="29">{String.raw`\int_{0}^{t-t_0}\! d\tau \sum_j g_j^2\, e^{-i\omega_j\tau}\, a(t-\tau) \;\simeq\; a(t)\int_{0}^{\infty}\! d\tau \sum_j g_j^2\, e^{i(\Omega-\omega_j)\tau} = \tfrac12\,\gamma\, a(t).`}</EqBlock>
        <KeyResult
          number="30"
          eq={String.raw`\gamma = 2\pi\, [g(\Omega)]^2\, \mathscr{D}(\Omega)`}
          label="Quantum decay rate (Fermi golden rule)"
          note={
            <>
              Coupling-squared times the reservoir density of states <Tex>{String.raw`\mathscr{D}(\Omega)`}</Tex> at the system
              frequency — this is the cavity loss rate. (A small imaginary part, the dropped Lamb-type frequency shift, is
              neglected.) Note <Tex>{String.raw`\mathscr{D}`}</Tex> is the density of states, distinct from the diffusion
              coefficient <Tex>{String.raw`D`}</Tex>.
            </>
          }
        />
        <p>What remains is the raw noise operator and the quantum Langevin equation in the lab frame:</p>
        <EqBlock label="31">{String.raw`f(t) = -i\sum_j g_j\, b_j(t_0)\,e^{-i\omega_j(t-t_0)},`}</EqBlock>
        <EqBlock label="32">{String.raw`\dot a(t) = -\big(i\Omega + \tfrac12\gamma\big)\, a(t) + f(t).`}</EqBlock>
        <p>
          Transform to the slowly varying (rotating-frame) operator to strip off the fast free oscillation, isolating damping
          and noise:
        </p>
        <EqBlock label="33–34">{String.raw`A(t) = e^{i\Omega(t-t_0)}\, a(t), \qquad F(t) = e^{i\Omega(t-t_0)}\, f(t) = -i\sum_j g_j\, b_j(t_0)\,e^{-i(\omega_j-\Omega)(t-t_0)}.`}</EqBlock>
        <p>
          The result is the central dynamical statement of Sec.&nbsp;19&ndash;2 — the operator twin of the classical Langevin
          equation (4):
        </p>
        <KeyResult
          number="35"
          eq={String.raw`\dot A(t) = -\tfrac12\gamma\, A(t) + F(t)`}
          label="Quantum Langevin equation (slowly varying frame)"
          note={
            <>
              Drift <Tex>{String.raw`= -(\gamma/2)A`}</Tex>, noise <Tex>{String.raw`= F(t)`}</Tex>. Compare directly to{" "}
              <Tex>{String.raw`m\dot v = -m\Gamma v + F_n`}</Tex>: the same skeleton, now operator-valued.
            </>
          }
        />
        <p>
          To pin down the noise we use the reservoir state. The bath has no coherent amplitude, so the noise has zero mean; it
          sits in thermal equilibrium with Bose&ndash;Einstein occupation:
        </p>
        <EqBlock label="36–37">{String.raw`\langle F(t)\rangle_R = \langle F^\dagger(t)\rangle_R = 0,`}</EqBlock>
        <EqBlock label="38–39">{String.raw`\langle b_j^\dagger b_k\rangle_R = \bar n(\omega_j)\,\delta_{jk}, \qquad \bar n(\omega_j) = \frac{1}{e^{\hbar\omega_j/k_B T} - 1}.`}</EqBlock>
        <p>
          Evaluating the noise correlations, the phase sums become delta functions (Markoff). The normally-ordered correlation
          carries the thermal fluctuation; the anti-normally-ordered one carries an extra <Tex>{String.raw`+1`}</Tex> — the
          vacuum:
        </p>
        <EqBlock label="40–42">{String.raw`\langle F^\dagger(t)F(t')\rangle_R = \sum_j g_j^2\,\bar n(\omega_j)\,e^{i(\omega_j-\Omega)(t-t')} = 2\langle D_{A^\dagger A}\rangle_R\,\delta(t-t') = \gamma\,\bar n\,\delta(t-t'),`}</EqBlock>
        <EqBlock label="43">{String.raw`\langle F(t)F^\dagger(t')\rangle_R = 2\langle D_{AA^\dagger}\rangle_R\,\delta(t-t') = \gamma(\bar n + 1)\,\delta(t-t').`}</EqBlock>
        <p>
          The equal-time correlation of the noise with the system operator (the operator analog of the classical{" "}
          <Tex>{String.raw`\langle vF_n\rangle`}</Tex>) is what we need to build the photon-number equation:
        </p>
        <EqBlock label="44">{String.raw`\langle F^\dagger(t)A(t)\rangle_R = \langle A^\dagger(t)F(t)\rangle_R = \tfrac12\gamma\bar n = \langle D_{A^\dagger A}\rangle_R.`}</EqBlock>
        <p>
          Forming <Tex>{String.raw`d\langle A^\dagger A\rangle/dt`}</Tex> from the Langevin equation gives the relaxation of the
          mean photon number toward the thermal occupation — the quantum twin of Eq.&nbsp;(19):
        </p>
        <KeyResult
          number="45"
          eq={String.raw`\frac{d}{dt}\langle A^\dagger(t)A(t)\rangle_R = -\gamma\,\langle A^\dagger(t)A(t)\rangle_R + \gamma\,\bar n`}
          label="Photon-number relaxation"
          note={
            <>
              Steady state <Tex>{String.raw`\langle A^\dagger A\rangle = \bar n`}</Tex>: the mode thermalizes at rate{" "}
              <Tex>{String.raw`\gamma`}</Tex>.
            </>
          }
        />
        <p>Rearranging is the quantum Einstein relation for this problem — the local fluctuation&ndash;dissipation balance:</p>
        <EqBlock label="46">{String.raw`2\langle D_{A^\dagger A}\rangle_R = \gamma\,\langle A^\dagger(t)A(t)\rangle_R + \frac{d}{dt}\langle A^\dagger(t)A(t)\rangle_R.`}</EqBlock>
        <Derivation title="Eliminate the reservoir and read off the quantum Langevin equation">
          <Step title="Solve the bath formally">
            From the Hamiltonian (24), the system operator obeys (25) with a drive <Tex>{String.raw`\sum_j g_j b_j`}</Tex>;
            each bath mode obeys (26). Integrate (26) exactly: a free part plus a driven memory integral over{" "}
            <Tex>{String.raw`a(t')`}</Tex>. This is Eq.&nbsp;(27) — the move that makes elimination possible.
            <EqBlock>{String.raw`b_j(t) = b_j(t_0)e^{-i\omega_j(t-t_0)} - ig_j\!\int_{t_0}^{t}\!dt'\,a(t')e^{-i\omega_j(t-t')}.`}</EqBlock>
          </Step>
          <Step title="Back-substitute for a closed equation for a">
            Insert (27) into (25). The driven part becomes a double sum/integral acting on <Tex>{String.raw`a`}</Tex>&rsquo;s
            own history (the damping kernel); the free part becomes the noise <Tex>{String.raw`f(t)`}</Tex>.
            <EqBlock>{String.raw`\dot a = -i\Omega a - \sum_j g_j^2\!\int_{t_0}^t\!dt'\,a(t')e^{-i\omega_j(t-t')} + f(t).`}</EqBlock>
          </Step>
          <Step title="Apply the Markoff approximation to the kernel">
            With a near-continuum of bath modes the kernel is sharply peaked at <Tex>{String.raw`\tau=0`}</Tex>. Pull{" "}
            <Tex>{String.raw`a(t')`}</Tex> out at <Tex>{String.raw`a(t)`}</Tex>, extend the integral to infinity, and the
            integral over the density of states gives <Tex>{String.raw`(\gamma/2)a(t)`}</Tex> with{" "}
            <Tex>{String.raw`\gamma = 2\pi[g(\Omega)]^2\mathscr{D}(\Omega)`}</Tex>. The dropped imaginary part is a small
            Lamb-type frequency shift.
            <EqBlock>{String.raw`\gamma = 2\pi[g(\Omega)]^2\,\mathscr{D}(\Omega).`}</EqBlock>
          </Step>
          <Step title="Read off the quantum Langevin equation">
            What remains is Eq.&nbsp;(32). Transform to the slowly varying <Tex>{String.raw`A`}</Tex> via (33) to remove the{" "}
            <Tex>{String.raw`i\Omega`}</Tex>, giving the clean operator Langevin equation (35), structurally identical to the
            classical (4).
            <EqBlock>{String.raw`\dot A = -\tfrac12\gamma A + F(t).`}</EqBlock>
          </Step>
          <Step title="Compute the noise correlations from the thermal bath">
            Using <Tex>{String.raw`\langle b_j\rangle=0`}</Tex> and the thermal moments (38)&ndash;(39), evaluate{" "}
            <Tex>{String.raw`\langle F^\dagger F\rangle`}</Tex> and <Tex>{String.raw`\langle F F^\dagger\rangle`}</Tex>. The
            phase sums become delta functions (Markoff), yielding <Tex>{String.raw`\gamma\bar n`}</Tex> and{" "}
            <Tex>{String.raw`\gamma(\bar n+1)`}</Tex>. The <Tex>{String.raw`+1`}</Tex> is the vacuum term that gives
            spontaneous emission even at <Tex>{String.raw`T=0`}</Tex>.
            <EqBlock>{String.raw`\langle F^\dagger F'\rangle_R = \gamma\bar n\,\delta,\quad \langle F F'^\dagger\rangle_R = \gamma(\bar n+1)\,\delta.`}</EqBlock>
          </Step>
          <Step title="Build the photon-number equation and the Einstein relation">
            Form <Tex>{String.raw`d\langle A^\dagger A\rangle/dt`}</Tex> from the Langevin equation, using the equal-time
            noise&ndash;system correlation (44) (the quantum <Tex>{String.raw`\langle vF_n\rangle`}</Tex>). The result (45)
            relaxes to <Tex>{String.raw`\bar n`}</Tex>; rearranging gives the quantum Einstein relation (46).
            <EqBlock>{String.raw`\frac{d}{dt}\langle A^\dagger A\rangle = -\gamma\langle A^\dagger A\rangle + \gamma\bar n.`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="insight" title="Where spontaneous emission hides">
          The <Tex>{String.raw`(\bar n+1)`}</Tex> in <Tex>{String.raw`\langle F F^\dagger\rangle`}</Tex> versus{" "}
          <Tex>{String.raw`\bar n`}</Tex> in <Tex>{String.raw`\langle F^\dagger F\rangle`}</Tex> is the operator-ordering
          difference — the extra &ldquo;1&rdquo; is the vacuum fluctuation. It is why an excited atom or an empty cavity mode
          still has noise at absolute zero. This is the quantum seed of laser linewidth.
        </Callout>
        <Callout kind="warning" title="a vs A; γ vs γ/2">
          Lowercase <Tex>{String.raw`a`}</Tex> is the lab-frame operator (oscillates at <Tex>{String.raw`\Omega`}</Tex>);
          capital <Tex>{String.raw`A`}</Tex> is the slowly varying (rotating-frame) operator. The <em>amplitude</em> decays at{" "}
          <Tex>{String.raw`\gamma/2`}</Tex> (Eqs.&nbsp;32,&nbsp;35) so the <em>energy / photon number</em> decays at{" "}
          <Tex>{String.raw`\gamma`}</Tex> (Eq.&nbsp;45) — a factor-of-two bookkeeping worth stating explicitly. All
          correlations carry the subscript <Tex>{String.raw`R`}</Tex>, a partial average over the reservoir only — the system
          operators remain operators, which is what makes <Tex>{String.raw`F(t)`}</Tex> operator-valued noise.
        </Callout>

        <SimFrame
          title="Langevin Brownian integrator"
          caption={
            <>
              A literal Euler&ndash;Maruyama integration of the classical Langevin equation (4) driven by delta-correlated
              noise (6). Watch an ensemble of velocities start from rest, get damped, get kicked, and settle into
              Maxwell&ndash;Boltzmann. The <strong>FD-lock</strong> toggle ties <Tex>{String.raw`D_{vv} = m\Gamma k_B T`}</Tex>;
              unlock it to break the balance and watch equilibrium drift away from the bath temperature.
            </>
          }
          tryThis={
            <>
              Leave FD-lock <strong>on</strong> and confirm <Tex>{String.raw`\langle v^2\rangle`}</Tex> relaxes exactly onto
              the equipartition line <Tex>{String.raw`k_B T/m`}</Tex>. Now turn it <strong>off</strong> and drag{" "}
              <Tex>{String.raw`D_{vv}`}</Tex>: the histogram and <Tex>{String.raw`T_{\mathrm{eff}}`}</Tex> peel away from the
              set <Tex>{String.raw`T`}</Tex> — damping and noise must be matched. Switch to <strong>quantum</strong> mode to
              see the identical balance with <Tex>{String.raw`k_B T/m \to \bar n`}</Tex>.
            </>
          }
        >
          <Ch19Sim />
        </SimFrame>
      </Section>

      <Section title="19–3a · General drift and diffusion coefficients">
        <Intuition>
          Sections 19&ndash;1 and 19&ndash;2 each handled one specific operator. Section 19&ndash;3 is the payoff: a
          <em> general</em> procedure to get the Langevin equation for any set of system operators{" "}
          <Tex>{String.raw`\{a_\mu\}`}</Tex> (field operators <Tex>{String.raw`a, a^\dagger`}</Tex>, or atomic
          spin/projection operators <Tex>{String.raw`\sigma`}</Tex>). Try the same elimination on a two-level atom and you hit
          a wall — atomic operators do not commute to c-numbers, so the reservoir operators won&rsquo;t fully drop out. The
          cure: don&rsquo;t demand an exact Langevin equation. Instead <strong>define</strong> the drift and diffusion as
          short-time averages and compute them <em>perturbatively</em> to second order in the coupling.
        </Intuition>
        <p>
          Classify the general set of system operators by their free frequency. Each <Tex>{String.raw`a_\mu`}</Tex> is an
          eigen-operator of the free Hamiltonian:
        </p>
        <EqBlock label="52–55">{String.raw`\{a\} = \{a_1, a_2, \ldots, a_\mu, \ldots\}, \qquad [\mathscr{H}_a, a_\mu] = -\hbar\Omega_\mu\, a_\mu.`}</EqBlock>
        <p>
          The Heisenberg equation for a general operator is free precession plus coupling-induced evolution; transforming to
          the slowly varying form removes the precession, leaving evolution driven entirely by the coupling{" "}
          <Tex>{String.raw`\mathscr{V}`}</Tex>:
        </p>
        <EqBlock label="56">{String.raw`\dot a_\mu = \frac{i}{\hbar}[\mathscr{H}, a_\mu] = -i\Omega_\mu\, a_\mu + \frac{i}{\hbar}[\mathscr{V}, a_\mu],`}</EqBlock>
        <EqBlock label="58–59">{String.raw`A_\mu(t) = e^{i\Omega_\mu t}\, a_\mu(t), \qquad \dot A_\mu(t) = \frac{i}{\hbar}\,e^{i\Omega_\mu t}\,[\mathscr{V}, a_\mu(t)].`}</EqBlock>
        <p>
          Posit the desired general Langevin form — a deterministic drift operator <Tex>{String.raw`D_\mu`}</Tex> plus a
          zero-mean noise operator <Tex>{String.raw`F_\mu`}</Tex> — and define the drift and diffusion through it:
        </p>
        <KeyResult
          number="60–63"
          eq={String.raw`\dot A_\mu(t) = D_\mu(t) + F_\mu(t), \quad \langle F_\mu\rangle_R = 0, \quad \frac{d}{dt}\langle A_\mu\rangle_R = \langle D_\mu\rangle_R, \quad \langle F_\mu(t)F_\nu(t')\rangle_R = 2\langle D_{\mu\nu}\rangle_R\,\delta(t-t')`}
          label="General Langevin form: drift + diffusion"
        />
        <p>
          To compute these, iterate the operator increment to second order in the coupling — the workhorse of Sec.&nbsp;19&ndash;3:
        </p>
        <EqBlock label="64–65">{String.raw`\Delta A_\mu(t) = \frac{i}{\hbar}\!\int_{t}^{t+\Delta t}\! dt'\,[\mathscr{V}(t'), A_\mu(t)] + \Big(\frac{i}{\hbar}\Big)^2\!\int_{t}^{t+\Delta t}\! dt'\!\int_{t}^{t'}\! dt''\,[\mathscr{V}(t'),[\mathscr{V}(t''), A_\mu(t)]] + \cdots`}</EqBlock>
        <p>
          The drift is the reservoir-averaged increment per unit time. The first-order term is linear in bath operators and
          averages to zero, so the drift comes entirely from the second-order double commutator:
        </p>
        <EqBlock label="66–68">{String.raw`\langle D_\mu(t)\rangle_R = \frac{\langle\Delta A_\mu(t)\rangle_R}{\Delta t} = -\frac{1}{\Delta t\,\hbar^2}\!\int_{t}^{t+\Delta t}\! dt'\!\int_{t}^{t'}\! dt''\,\langle[\mathscr{V}(t'),[\mathscr{V}(t''),A_\mu(t)]]\rangle_R.`}</EqBlock>
        <p>
          Apply the Markoff/stationarity step: the reservoir correlation decays fast, so the upper limit is sent to infinity
          and the integrand depends only on the time difference:
        </p>
        <KeyResult
          number="72"
          eq={String.raw`\langle D_\mu(t)\rangle_R = -\frac{1}{\hbar^{2}}\!\int_{0}^{\infty}\! d\tau\,\langle[\mathscr{V}(t+\tau),[\mathscr{V}(t),A_\mu(t)]]\rangle_R`}
          label="General drift coefficient (perturbative, Markoff)"
          note={
            <>
              The quantum generalization of the classical first moment <Tex>{String.raw`M_1`}</Tex>. Compute it from the
              coupling and the bath statistics; the diffusion then follows from the Einstein relation below.
            </>
          }
        />
        <Derivation title="Set up the general operator and build the drift">
          <Step title="Slowly varying general operator">
            Classify operators by their free frequency via (55), transform to slowly varying <Tex>{String.raw`A_\mu`}</Tex>
            (58), whose evolution (59) is driven purely by the coupling <Tex>{String.raw`\mathscr{V}`}</Tex>. Posit the
            Langevin form (60) with drift <Tex>{String.raw`D_\mu`}</Tex> and zero-mean noise <Tex>{String.raw`F_\mu`}</Tex>.
            <EqBlock>{String.raw`\dot A_\mu = D_\mu + F_\mu,\quad \langle F_\mu\rangle_R=0.`}</EqBlock>
          </Step>
          <Step title="Expand the increment to second order">
            Iterate the Heisenberg equation to get (65): a first-order single-commutator term, a second-order
            double-commutator term. The first-order term is linear in bath operators and averages to zero over the reservoir;
            only the second-order term survives in the drift.
            <EqBlock>{String.raw`\langle\Delta A_\mu\rangle_R = \Big(\tfrac{i}{\hbar}\Big)^2\!\int\!\!\int\langle[\mathscr{V},[\mathscr{V},A_\mu]]\rangle_R.`}</EqBlock>
          </Step>
          <Step title="Coarse-grain and take the Markoff limit">
            Divide by <Tex>{String.raw`\Delta t`}</Tex> (66)&ndash;(67) to define the drift as a rate. Because the reservoir
            correlation decays on <Tex>{String.raw`\tau_c \ll \Delta t`}</Tex>, the integrand depends only on the time
            difference and the upper limit can be pushed to infinity, giving the compact form (72). This mirrors exactly the
            classical <Tex>{String.raw`M_1`}</Tex> construction.
            <EqBlock>{String.raw`\langle D_\mu\rangle_R = -\hbar^{-2}\!\int_0^\infty\! d\tau\,\langle[\mathscr{V}(t+\tau),[\mathscr{V}(t),A_\mu]]\rangle_R.`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="warning" title="Why the two-level atom breaks the naive elimination">
          For a two-level atom the spin operators do <strong>not</strong> commute to c-numbers (the{" "}
          <Tex>{String.raw`\sigma, \sigma^\dagger`}</Tex> algebra), so the reservoir operators fail to cancel out of the
          equation of motion — Eq.&nbsp;(51) keeps a residual time-dependent reservoir term. That failure is <em>why</em> the
          chapter pivots to the perturbative definition of drift/diffusion, which works for any algebra.
        </Callout>
        <Callout kind="insight" title="Drift = second order, noise = first order">
          The single-commutator (first-order) term has zero reservoir average and <em>is</em> the noise{" "}
          <Tex>{String.raw`F_\mu`}</Tex>. The systematic damping (drift) only appears at second order in{" "}
          <Tex>{String.raw`\mathscr{V}`}</Tex> — damping is a back-reaction effect, one power of coupling &ldquo;out&rdquo; and
          one power &ldquo;back.&rdquo; This is the structural reason damping and noise share the same coupling constant.
        </Callout>
      </Section>

      <Section title="19–3b · The generalized Einstein relation">
        <Intuition>
          Computing diffusion coefficients directly (the double-time noise correlation) is painful. The generalized Einstein
          relation is the labor-saving theorem that closes the chapter: it lets you get the diffusion coefficients from
          quantities you already have — the drift coefficients <Tex>{String.raw`D_\mu`}</Tex> and equal-time operator
          correlations. Write the rate of change of <Tex>{String.raw`\langle A_\mu A_\nu\rangle`}</Tex> and recognize that the
          noise&ndash;noise piece (the diffusion) is whatever is left after subtracting the drift contributions. Physically:
          the rate at which a correlation between two observables grows equals the diffusive pumping minus the deterministic
          relaxation.
        </Intuition>
        <p>
          Discretize the Langevin equation over the window. The cross drift&ndash;noise terms vanish (<Tex>{String.raw`D`}</Tex>
          varies slowly while <Tex>{String.raw`F`}</Tex> is delta-correlated), isolating the pure diffusion as the second
          moment of the operator increments:
        </p>
        <EqBlock label="76">{String.raw`A_\mu(t) = A_\mu(t-\Delta t) + F_\mu(t)\,\Delta t,`}</EqBlock>
        <EqBlock label="80">{String.raw`\frac{1}{\Delta t}\!\int_{t-\Delta t}^{t}\!\! dt'\!\int_{t-\Delta t}^{t}\!\! dt''\,\big[\langle D_\mu(t')F_\nu(t'')\rangle_R + \langle F_\mu(t')D_\nu(t'')\rangle_R\big] \;\to\; 0,`}</EqBlock>
        <EqBlock label="77–81">{String.raw`\langle F_\mu(t)\,F_\nu(t')\rangle_R = 2\langle D_{\mu\nu}\rangle_R\,\delta(t-t') \;\;\Rightarrow\;\; 2\langle D_{\mu\nu}\rangle_R = \frac{\langle \Delta A_\mu\,\Delta A_\nu\rangle_R}{\Delta t}.`}</EqBlock>
        <p>
          Equating this to the full correlation rate minus the deterministic drift contributions yields the master tool of the
          whole chapter:
        </p>
        <KeyResult
          number="82"
          eq={String.raw`2\langle D_{\mu\nu}\rangle_R = \frac{d}{dt}\langle A_\mu(t)A_\nu(t)\rangle_R - \langle A_\mu(t)D_\nu(t)\rangle_R - \langle D_\mu(t)A_\nu(t)\rangle_R`}
          label="Generalized Einstein relation"
          note={
            <>
              Diffusion = (rate of change of the two-operator correlation) minus the two drift contributions. Get all noise
              strengths from drift + equal-time averages, without ever evaluating the noise correlations directly.
            </>
          }
        />
        <Derivation title="Derive the Einstein relation and check it on the oscillator">
          <Step title="Write the correlation increment">
            Use the discretized solution (76) to form the product increment <Tex>{String.raw`\Delta(A_\mu A_\nu)`}</Tex>.
            Expanding gives drift&ndash;drift, drift&ndash;noise, and noise&ndash;noise pieces. The drift&ndash;noise cross
            terms (80) vanish over the window because <Tex>{String.raw`D`}</Tex> varies slowly while{" "}
            <Tex>{String.raw`F`}</Tex> is delta-correlated.
            <EqBlock>{String.raw`\Delta(A_\mu A_\nu) = (\text{drift}) + (\text{cross}\to 0) + (\text{noise-noise}).`}</EqBlock>
          </Step>
          <Step title="Identify the noise–noise term with diffusion">
            The only second-moment contribution surviving per unit time is the noise&ndash;noise piece, which by definition
            (77)&ndash;(79) equals <Tex>{String.raw`2\langle D_{\mu\nu}\rangle`}</Tex>. Equate this to the full correlation
            rate minus the drift contributions to obtain the generalized Einstein relation (82).
            <EqBlock>{String.raw`2\langle D_{\mu\nu}\rangle = \frac{d}{dt}\langle A_\mu A_\nu\rangle - \langle A_\mu D_\nu\rangle - \langle D_\mu A_\nu\rangle.`}</EqBlock>
          </Step>
          <Step title="Check against the simple harmonic oscillator">
            Set <Tex>{String.raw`A_\mu = A^\dagger`}</Tex>, <Tex>{String.raw`A_\nu = A`}</Tex>, with drift{" "}
            <Tex>{String.raw`D = -(\gamma/2)A`}</Tex> from Eq.&nbsp;(35). Substituting into (82) reproduces the quantum
            Einstein relation (46) exactly — the general machinery is consistent with the worked oscillator.
            <EqBlock>{String.raw`2\langle D_{A^\dagger A}\rangle = \gamma\langle A^\dagger A\rangle + \frac{d}{dt}\langle A^\dagger A\rangle.`}</EqBlock>
          </Step>
        </Derivation>
        <Callout kind="insight" title="Why this is the deliverable">
          In the actual laser theory you almost never compute diffusion coefficients directly. You compute the{" "}
          <strong>drift</strong> (the deterministic semiclassical equations of motion), then turn the crank on Eq.&nbsp;(82)
          using equal-time commutators/correlations to read off the noise strengths. This is the bridge from Chapter&nbsp;XIX
          into the noisy laser equations of Chapter&nbsp;XX.
        </Callout>
        <Callout kind="warning" title="Order matters in the operator products">
          Because <Tex>{String.raw`A_\mu`}</Tex> and <Tex>{String.raw`A_\nu`}</Tex> are non-commuting operators, the two drift
          terms <Tex>{String.raw`\langle A_\mu D_\nu\rangle`}</Tex> and <Tex>{String.raw`\langle D_\mu A_\nu\rangle`}</Tex> are
          <strong> not</strong> equal in general — keep them as separate ordered products. The diffusion coefficient{" "}
          <Tex>{String.raw`D_{\mu\nu}`}</Tex> is likewise not symmetric in <Tex>{String.raw`\mu,\nu`}</Tex>.
        </Callout>
      </Section>

      <Section title="The three central results">
        <KeyResult
          eq={String.raw`D_{vv} = m\,\Gamma\, k_B T`}
          label="Classical fluctuation–dissipation theorem (Eq. 22)"
          note={
            <>
              The velocity diffusion coefficient is rigidly fixed by the damping rate and temperature. A bath that drains
              energy must inject fluctuations; the strength is not adjustable.
            </>
          }
        />
        <KeyResult
          eq={String.raw`\dot A = -\tfrac12\gamma A + F(t), \quad \langle F^\dagger(t)F(t')\rangle_R = \gamma\bar n\,\delta(t-t'), \quad \langle F(t)F^\dagger(t')\rangle_R = \gamma(\bar n+1)\,\delta(t-t')`}
          label="Quantum Langevin equation + noise correlations (Eqs. 35, 40, 43)"
          note={
            <>
              A single quantized mode obeys an operator Langevin equation: damping at <Tex>{String.raw`\gamma/2`}</Tex> plus
              delta-correlated quantum noise. The <Tex>{String.raw`+1`}</Tex> is the vacuum term — the seed of spontaneous
              emission and laser linewidth.
            </>
          }
        />
        <KeyResult
          eq={String.raw`2\langle D_{\mu\nu}\rangle_R = \frac{d}{dt}\langle A_\mu A_\nu\rangle_R - \langle A_\mu D_\nu\rangle_R - \langle D_\mu A_\nu\rangle_R`}
          label="Generalized Einstein relation (Eq. 82)"
          note="Any system's diffusion coefficients follow from its drift coefficients and equal-time correlations. This is what the noisy laser equations of later chapters are built on."
        />
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="The ideas you keep">
          <ul>
            <li>
              <strong>Damping and noise are inseparable.</strong> Any dissipative coupling to a reservoir necessarily brings
              fluctuations, with strength fixed by the fluctuation&ndash;dissipation theorem (classical{" "}
              <Tex>{String.raw`D_{vv}=m\Gamma k_B T`}</Tex>; quantum <Tex>{String.raw`\langle F^\dagger F\rangle=\gamma\bar n`}</Tex>,{" "}
              <Tex>{String.raw`\langle F F^\dagger\rangle=\gamma(\bar n+1)`}</Tex>). You can never add loss to a laser model
              without adding the matching noise.
            </li>
            <li>
              <strong>The quantum Langevin equation</strong> <Tex>{String.raw`\dot A = -(\gamma/2)A + F(t)`}</Tex> is the
              prototype every cavity field mode obeys; amplitude decays at <Tex>{String.raw`\gamma/2`}</Tex> while photon
              number / energy decays at <Tex>{String.raw`\gamma`}</Tex>. Keep this factor of two straight.
            </li>
            <li>
              <strong>The vacuum &ldquo;+1&rdquo;</strong> in <Tex>{String.raw`\gamma(\bar n+1)`}</Tex> survives at{" "}
              <Tex>{String.raw`T=0`}</Tex> — the microscopic origin of spontaneous emission and, downstream, of the
              Schawlow&ndash;Townes laser linewidth.
            </li>
            <li>
              <strong>The Markoff approximation</strong> (<Tex>{String.raw`\tau_c`}</Tex> much shorter than system timescales)
              turns a many-mode bath into a single delta-correlated noise and a Fermi-golden-rule rate{" "}
              <Tex>{String.raw`\gamma = 2\pi[g(\Omega)]^2\mathscr{D}(\Omega)`}</Tex>. Remember its validity condition.
            </li>
            <li>
              <strong>The generalized Einstein relation</strong> (Eq.&nbsp;82) is the practical recipe: compute the
              deterministic drift first, then read off all diffusion coefficients without evaluating noise correlations. This
              is the engine of the noisy laser equations in Chapter&nbsp;XX.
            </li>
            <li>
              <strong>Atomic operators do not eliminate cleanly</strong> (non-c-number commutators), which is exactly why the
              perturbative drift/diffusion definitions — not an exact operator Langevin equation — are the general tool.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
