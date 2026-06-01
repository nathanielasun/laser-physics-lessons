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
import Ch02Sim from "@/components/sims/ch02";

export default function Page() {
  return (
    <Lesson slug="ch02">
      <Lede>
        Take one atom and shine near-resonant light on it. Quantum mechanically the electron does not simply
        &ldquo;jump&rdquo; — its probability of being found in the upper vs. lower state <em>sloshes back and forth</em>,
        smoothly and periodically. That sloshing is <strong>Rabi flopping</strong>, and understanding it is the whole
        game: it contains stimulated emission, absorption, the Einstein coefficients, and the first hint of why a laser
        needs population inversion.
      </Lede>

      <Section title="The physical picture">
        <Intuition>
          An atom has many energy levels, but if you drive it with light tuned near one particular transition, only{" "}
          <em>two</em> levels matter — the rest are wildly off-resonance and barely respond. So model the atom as a
          two-level system, <Tex>{String.raw`|a\rangle`}</Tex> (upper) and <Tex>{String.raw`|b\rangle`}</Tex> (lower).
          The oscillating electric field grabs the atom&rsquo;s electric dipole and rocks it. If the field&rsquo;s
          frequency <Tex>{String.raw`\nu`}</Tex> matches the transition frequency{" "}
          <Tex>{String.raw`\omega = \omega_a - \omega_b`}</Tex>, the rocking is resonant and the population pours
          completely from one level to the other and back — over and over.
        </Intuition>
        <p>
          Everything in this chapter is built from one equation — the time-dependent Schrödinger equation — applied to{" "}
          an atom whose Hamiltonian is its usual one plus a small, time-varying push from the light:
        </p>
        <KeyResult
          eq={String.raw`\mathscr{H} = \mathscr{H}_0 + \mathscr{V}'(t)`}
          label="Atom + perturbing field"
          note={
            <>
              <Tex>{String.raw`\mathscr{H}_0`}</Tex> is the bare atom (its eigenstates{" "}
              <Tex>{String.raw`u_k`}</Tex> and energies <Tex>{String.raw`E_k=\hbar\omega_k`}</Tex> are known from
              Chapter&nbsp;I); <Tex>{String.raw`\mathscr{V}'(t)`}</Tex> is the interaction with the light.
            </>
          }
        />
      </Section>

      <Section title="From Schrödinger to coefficient equations">
        <p>
          Expand the state in the known atomic eigenstates, letting the natural phase{" "}
          <Tex>{String.raw`e^{-i\omega_k t}`}</Tex> ride along so the coefficients{" "}
          <Tex>{String.raw`C_k(t)`}</Tex> change <em>only</em> because of the field:
        </p>
        <EqBlock>{String.raw`\psi(\mathbf r,t)=\sum_k C_k(t)\,u_k(\mathbf r)\,e^{-i\omega_k t}.`}</EqBlock>
        <p>
          The amplitude <Tex>{String.raw`|C_k(t)|^2`}</Tex> is the probability of finding the atom in state{" "}
          <Tex>{String.raw`k`}</Tex>. Substituting into Schrödinger&rsquo;s equation collapses to a set of coupled
          first-order equations for these probabilities-amplitudes.
        </p>
        <Derivation title="Derive the coefficient equations of motion">
          <Step title="Insert the expansion">
            Put <Tex>{String.raw`\psi=\sum_k C_k\,u_k\,e^{-i\omega_k t}`}</Tex> into{" "}
            <Tex>{String.raw`i\hbar\,\partial_t\psi=(\mathscr H_0+\mathscr V')\psi`}</Tex>. On the left the time
            derivative hits both <Tex>{String.raw`C_k`}</Tex> and the phase:
            <EqBlock>{String.raw`i\hbar\sum_k(\dot C_k-i\omega_k C_k)\,e^{-i\omega_k t}u_k=\sum_k(\hbar\omega_k+\mathscr V')e^{-i\omega_k t}u_k C_k.`}</EqBlock>
          </Step>
          <Step title="The bare-energy terms cancel">
            <Tex>{String.raw`\mathscr H_0 u_k=\hbar\omega_k u_k`}</Tex>, so the{" "}
            <Tex>{String.raw`\hbar\omega_k`}</Tex> on the right cancels the <Tex>{String.raw`-i\omega_k`}</Tex> term on
            the left. Only the field survives.
          </Step>
          <Step title="Project onto a single state">
            Multiply by <Tex>{String.raw`u_n^*`}</Tex> and integrate, using orthonormality{" "}
            <Tex>{String.raw`\int u_n^* u_k=\delta_{nk}`}</Tex>. With the matrix element{" "}
            <Tex>{String.raw`\mathscr V'_{nk}=\int d^3r\,u_n^*\,\mathscr V'\,u_k`}</Tex>:
            <KeyResult
              number="3"
              eq={String.raw`\dot C_n=-\frac{i}{\hbar}\sum_k C_k(t)\,\mathscr V'_{nk}\,e^{-i(\omega_k-\omega_n)t}.`}
              label="Coefficient equations of motion"
            />
          </Step>
        </Derivation>
        <p>
          Notice the phase factor <Tex>{String.raw`e^{-i(\omega_k-\omega_n)t}`}</Tex>: a transition is only effective
          when the field supplies exactly the energy gap. Drive the atom off-resonance and these phases spin fast and
          average to nothing.
        </p>
      </Section>

      <Section title="What is the interaction? The electric dipole">
        <p>
          The light&rsquo;s wavelength (hundreds of nm) dwarfs the atom (tenths of nm), so the field is essentially
          uniform across the atom — the <strong>dipole approximation</strong>. The interaction is then the energy of
          the atomic dipole <Tex>{String.raw`-e\,\mathbf r`}</Tex> in the field:
        </p>
        <KeyResult
          number="9–12"
          eq={String.raw`\mathscr V'(t) = -e\,\mathbf E(\mathbf R,t)\cdot\mathbf r,\qquad \mathscr V'_{nk}=-e\,\mathbf E\cdot\mathbf r_{nk}.`}
          label="Electric-dipole interaction"
          note="The dipole matrix element rnk decides which transitions are allowed and how strongly the field couples to them."
        />
        <Callout kind="math" title="Where −eE·r really comes from">
          The fundamental coupling is minimal substitution,{" "}
          <Tex>{String.raw`\tfrac{1}{2m}(\mathbf p-e\mathbf A)^2+V`}</Tex>. A gauge transformation{" "}
          <Tex>{String.raw`\psi=\exp\!\big[\tfrac{ie}{\hbar}\mathbf A\cdot\mathbf r\big]\phi`}</Tex> trades the vector
          potential <Tex>{String.raw`\mathbf A`}</Tex> for the field <Tex>{String.raw`\mathbf E=-\dot{\mathbf A}`}</Tex>,
          turning the Hamiltonian into <Tex>{String.raw`\tfrac{p^2}{2m}-e\mathbf E\cdot\mathbf r+V`}</Tex>. The form{" "}
          <Tex>{String.raw`-e\mathbf E\cdot\mathbf r`}</Tex> is the gauge-invariant, accurate interaction (better than
          the bare <Tex>{String.raw`-\tfrac{e}{m}\mathbf A\cdot\mathbf p`}</Tex>, which drops the{" "}
          <Tex>{String.raw`A^2`}</Tex> term).
        </Callout>
      </Section>

      <Section title="Two levels and the rotating-wave approximation">
        <p>
          Keep only <Tex>{String.raw`|a\rangle,|b\rangle`}</Tex> and drive with a linearly polarized field{" "}
          <Tex>{String.raw`\mathbf E(t)=\hat{\mathbf x}\,E_0\cos\nu t`}</Tex>. Writing the dipole matrix-element
          magnitude as <Tex>{String.raw`\wp`}</Tex> and the atomic frequency as{" "}
          <Tex>{String.raw`\omega=\omega_a-\omega_b`}</Tex>, Eq.&nbsp;(3) becomes two coupled equations:
        </p>
        <EqBlock>{String.raw`\dot C_a=\tfrac{i}{2}\frac{\wp E_0}{\hbar}\Big[e^{i(\omega+\nu)t}+e^{i(\omega-\nu)t}\Big]C_b,`}</EqBlock>
        <EqBlock>{String.raw`\dot C_b=\tfrac{i}{2}\frac{\wp E_0}{\hbar}\Big[e^{-i(\omega-\nu)t}+e^{-i(\omega+\nu)t}\Big]C_a.`}</EqBlock>
        <Intuition title="The rotating-wave approximation (RWA)">
          Each bracket has two terms. Near resonance <Tex>{String.raw`\nu\approx\omega`}</Tex>, so{" "}
          <Tex>{String.raw`\omega-\nu`}</Tex> is tiny (a slow, important term) while{" "}
          <Tex>{String.raw`\omega+\nu\approx 2\omega`}</Tex> spins twice as fast and averages away. Dropping the fast{" "}
          <Tex>{String.raw`(\omega+\nu)`}</Tex> &ldquo;anti-resonant&rdquo; piece is the rotating-wave approximation —
          the single most-used move in laser physics. Picture standing on a merry-go-round turning at{" "}
          <Tex>{String.raw`\nu`}</Tex>: the resonant part of the field stands still, the other part whirls by and
          blurs out.
        </Intuition>
        <Derivation title="Weak field → the resonant lineshape (first-order)">
          <Step title="Start in the upper state">
            Take <Tex>{String.raw`C_a(0)=1,\;C_b(0)=0`}</Tex>. For a weak field set{" "}
            <Tex>{String.raw`C_a\approx 1`}</Tex> on the right of the <Tex>{String.raw`\dot C_b`}</Tex> equation.
          </Step>
          <Step title="Integrate">
            <EqBlock>{String.raw`C_b(t)\simeq\tfrac{i}{2}\frac{\wp E_0}{\hbar}\left[\frac{e^{-i(\omega-\nu)t}-1}{\omega-\nu}+\frac{e^{-i(\omega+\nu)t}-1}{\omega+\nu}\right].`}</EqBlock>
          </Step>
          <Step title="Keep the resonant term, square it">
            Drop the small <Tex>{String.raw`(\omega+\nu)^{-1}`}</Tex> term (RWA) and use{" "}
            <Tex>{String.raw`|e^{-ix}-1|^2=4\sin^2(x/2)`}</Tex>:
            <KeyResult
              number="30"
              eq={String.raw`|C_b(t)|^2=\Big(\frac{\wp E_0}{\hbar}\Big)^2\frac{\sin^2[(\omega-\nu)t/2]}{(\omega-\nu)^2}.`}
              label="Weak-field transition probability"
            />
          </Step>
        </Derivation>
        <p>
          This is a diffraction-like <Tex>{String.raw`\mathrm{sinc}^2`}</Tex> in detuning: at exact resonance{" "}
          <Tex>{String.raw`(\omega=\nu)`}</Tex> it grows as <Tex>{String.raw`t^2`}</Tex>, while its central peak
          narrows as <Tex>{String.raw`1/t`}</Tex>. The longer you watch, the sharper the atom&rsquo;s
          &ldquo;frequency ruler.&rdquo; But <Tex>{String.raw`t^2`}</Tex> growth cannot continue forever — first-order
          theory breaks down. For that we need the exact solution.
        </p>
      </Section>

      <Section title="The exact Rabi solution">
        <p>
          Inside the RWA the two equations close exactly. Their solution is pure oscillation at the{" "}
          <strong>generalized Rabi frequency</strong>:
        </p>
        <KeyResult
          number="61"
          eq={String.raw`\mu=\sqrt{(\omega-\nu)^2+\big(\tfrac{\wp E_0}{\hbar}\big)^2}.`}
          label="Generalized Rabi frequency"
          note={
            <>
              Built from the detuning <Tex>{String.raw`(\omega-\nu)`}</Tex> and the on-resonance Rabi frequency{" "}
              <Tex>{String.raw`\Omega_R\equiv\wp E_0/\hbar`}</Tex> in quadrature.
            </>
          }
        />
        <KeyResult
          number="62"
          eq={String.raw`|C_b(t)|^2=\frac{(\wp E_0/\hbar)^2}{\mu^2}\,\sin^2\!\Big(\frac{\mu t}{2}\Big).`}
          label="Exact lower-state probability"
        />
        <p>
          Read it off: the population oscillates with period <Tex>{String.raw`2\pi/\mu`}</Tex> and reaches a maximum
          transfer <Tex>{String.raw`\Omega_R^2/\mu^2`}</Tex>. On resonance{" "}
          <Tex>{String.raw`(\omega=\nu)`}</Tex> the prefactor is 1 and you get <em>complete</em> flopping{" "}
          <Tex>{String.raw`\sin^2(\Omega_R t/2)`}</Tex> — 0&nbsp;→&nbsp;1&nbsp;→&nbsp;0. Detune, and the flopping speeds
          up but never fully empties the upper state. Play with it:
        </p>

        <SimFrame
          title="Rabi flopping"
          caption="Drive a two-level atom and watch the population slosh. The atom view animates in real time; the plots update as you drag."
          tryThis={
            <>
              Set detuning to 0 and watch <Tex>{String.raw`P_b`}</Tex> reach a full 1. Now detune: the resonance line
              shows the peak transfer collapsing, and the flop gets faster (larger <Tex>{String.raw`\mu`}</Tex>) but
              shallower. Crank <Tex>{String.raw`\Omega_R`}</Tex> up — the resonance line broadens. That is{" "}
              <strong>power broadening</strong>.
            </>
          }
        >
          <Ch02Sim />
        </SimFrame>

        <Derivation title="Solve the RWA equations exactly">
          <Step title="Ansatz">
            After RWA, <Tex>{String.raw`\dot C_a=\tfrac{i}{2}\Omega_R e^{i(\omega-\nu)t}C_b`}</Tex> and its conjugate.
            Try <Tex>{String.raw`C_a=A\,e^{i\mu_1 t},\;C_b=B\,e^{i\mu_2 t}`}</Tex>.
          </Step>
          <Step title="Two roots">
            Consistency forces <Tex>{String.raw`\mu_1-\mu_2=\pm\mu`}</Tex> with{" "}
            <Tex>{String.raw`\mu=\sqrt{(\omega-\nu)^2+\Omega_R^2}`}</Tex> — the splitting of the two
            &ldquo;dressed&rdquo; solutions.
          </Step>
          <Step title="Apply initial conditions">
            With <Tex>{String.raw`C_a(0)=1,\,C_b(0)=0`}</Tex> the amplitudes fix to give Eq.&nbsp;(62). The same
            algebra, with a phenomenological decay <Tex>{String.raw`\gamma`}</Tex>, yields the steady-state Lorentzian{" "}
            <Tex>{String.raw`P_b=\tfrac14(\wp E_0/\hbar)^2/[(\omega-\nu)^2+\gamma^2]`}</Tex> (Eq.&nbsp;52) — the line
            the resonance plot approaches.
          </Step>
        </Derivation>
      </Section>

      <Section title="From flopping to lasers: stimulated emission &amp; the Einstein B coefficient">
        <Callout kind="insight" title="Emission and absorption are mirror images">
          Run the calculation starting in the lower state instead, and you get the identical probability:
          <EqBlock>{String.raw`|C_{a\to b}(t)|^2=|C_{b\to a}(t)|^2.`}</EqBlock>
          Stimulated emission (down) is exactly as likely as absorption (up). A field passing through a collection of
          atoms is therefore amplified only if there are <em>more atoms up than down</em> — you need a{" "}
          <strong>population inversion</strong>. That single sentence is why a laser is hard to build, and it falls
          straight out of Rabi flopping.
        </Callout>
        <p>
          For a broadband field (energy density <Tex>{String.raw`\mathscr W(\omega)`}</Tex>) you sum the{" "}
          <Tex>{String.raw`\mathrm{sinc}^2`}</Tex> contributions over all frequencies. The narrow resonance integrates
          to a flat <Tex>{String.raw`2\pi t`}</Tex>, so the probability grows <em>linearly</em> in time — a constant{" "}
          <strong>rate</strong> rather than coherent flopping:
        </p>
        <KeyResult
          number="35"
          eq={String.raw`\frac{dP_a}{dt}=\frac{1}{6}\frac{\wp^2}{\varepsilon_0\hbar^2}\,\mathscr W(\omega)\equiv B\,\mathscr W(\omega),`}
          label="Einstein B coefficient (transition rate)"
          note="The factor 1/3 averages over random field orientation; B governs both stimulated absorption and emission."
        />
        <p>
          Demanding that atoms in thermal equilibrium with this radiation settle to a Boltzmann distribution (Einstein,
          1917) forces the radiation to take the Planck form:
        </p>
        <KeyResult
          number="37"
          eq={String.raw`\mathscr W(\omega)=\frac{\hbar\omega^3}{\pi^2 c^3}\,\frac{1}{e^{\hbar\omega/k_BT}-1}.`}
          label="Planck blackbody spectrum"
          note="Coherent Rabi flopping, coarse-grained into rates, plus thermodynamics, reproduces blackbody radiation — the seed of all of quantum optics."
        />
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="The four ideas you keep">
          <ul>
            <li>
              <strong>Two-level reduction + RWA</strong> — the standard simplification used in nearly every later
              chapter.
            </li>
            <li>
              <strong>Rabi frequency</strong> <Tex>{String.raw`\Omega_R=\wp E_0/\hbar`}</Tex> and generalized{" "}
              <Tex>{String.raw`\mu`}</Tex> — the clock of coherent atom-field dynamics.
            </li>
            <li>
              <strong>Emission = absorption</strong> ⇒ inversion is required for gain (Chapters&nbsp;V, VIII).
            </li>
            <li>
              <strong>Coherence → rates</strong> — broadband averaging turns flopping into Einstein rate equations,
              the bridge to the laser&rsquo;s gain medium.
            </li>
          </ul>
          Next we give this dipole a classical face (Chapter&nbsp;III), then track populations <em>and</em> coherences
          together with the density matrix (Chapter&nbsp;VII).
        </Callout>
      </Section>
    </Lesson>
  );
}
