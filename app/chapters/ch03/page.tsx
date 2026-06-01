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
import Ch03Sim from "@/components/sims/ch03";

export default function Page() {
  return (
    <Lesson slug="ch03">
      <Lede>
        Shine light on a cloud of atoms and the beam can either fade (absorption) or grow (amplification). The whole
        difference is <strong>phase</strong>. A charge driven by a field gains or loses energy depending entirely on
        whether its own oscillation swings <em>with</em> the driving force or <em>against</em> it. This chapter makes the
        point twice — once with a quantum two-level atom, which turns out to be a real oscillating dipole antenna, and
        once with a humble charge on a spring, which already &ldquo;knows&rdquo; about absorption{" "}
        <em>and</em> stimulated emission. The single word it all builds toward is{" "}
        <strong>LASER</strong>: Light Amplification by Stimulated Emission of Radiation.
      </Lede>

      <Section title="Overview: three radiative processes and the dipole philosophy">
        <Intuition>
          Radiation talks to matter through exactly three elementary processes. <strong>Absorption</strong>: an atom in
          its lower state swallows a photon and climbs. <strong>Spontaneous emission</strong>: an excited atom decays on
          its own, at a random time and into a random direction, with random phase. <strong>Stimulated emission</strong>:
          an incident field <em>induces</em> an excited atom to emit a photon that is locked to the driver — same
          frequency, same direction, same phase. Only stimulated emission can amplify a beam, and amplification (net
          gain) demands that more atoms emit than absorb. That condition is a{" "}
          <strong>population inversion</strong>, and engineering it is what makes the &ldquo;A&rdquo; in LASER hard.
        </Intuition>
        <p>
          The chapter&rsquo;s central pedagogical move is bold: argue that a single, honestly treated{" "}
          <em>classical</em> oscillating dipole already exhibits both absorption and stimulated emission. The famous
          Lorentz model of harmonically bound electrons accounts remarkably well for the anomalous index of refraction
          and for absorption lines; the quantum two-level atom of Chapter&nbsp;II supplies the correct microscopic
          dipole. The only subtlety is that the quantum atom corresponds not to <em>one</em> classical dipole but to an{" "}
          <em>ensemble</em> of identically-driven classical dipoles, so that the right averaged phase behavior emerges.
        </p>
        <Callout kind="insight" title="Acronym anchor">
          <strong>LASER</strong> = Light Amplification by Stimulated Emission of Radiation. Everything below is
          reverse-engineering the physical condition that makes the <strong>A</strong> — amplification — possible.
        </Callout>
        <Derivation title="The two qualitative claims that frame the chapter" defaultOpen={false}>
          <Step title="Identify the three processes">
            Absorption removes energy from the incident beam; spontaneous emission is random in phase and direction;
            stimulated emission is phase-, direction-, and frequency-locked to the incident field. Net gain requires
            stimulated emission to outpace absorption, hence more atoms emitting than absorbing — a population inversion.
          </Step>
          <Step title="State the modeling strategy">
            A single classical dipole reproduces absorption and stimulated emission, but it has a <em>definite</em>{" "}
            phase, whereas a quantum atom acquires its phase only under the influence of the applied field. The
            resolution: the quantum expectation value <Tex>{String.raw`\langle e\mathbf r\rangle`}</Tex> corresponds to
            an <em>average</em> over many classical dipoles with appropriately spread phases. This is exactly why the
            semiclassical theory (Chapters&nbsp;VIII&ndash;XIII) lets dipoles act as the sources in Maxwell&rsquo;s
            equations.
          </Step>
        </Derivation>
      </Section>

      <Section title="3-1 The quantum electric dipole: a two-level atom is a real antenna">
        <Intuition>
          Put an atom in a pure energy eigenstate and its probability cloud just sits there:{" "}
          <Tex>{String.raw`e|\psi|^2`}</Tex> is static, the average dipole never moves, and nothing radiates. But place
          the atom in a <em>superposition</em> of its ground and excited states and the cloud physically{" "}
          <strong>sloshes</strong> from one side of the nucleus to the other and back, at the transition frequency{" "}
          <Tex>{String.raw`\omega=\omega_a-\omega_b`}</Tex>. The expectation dipole moment{" "}
          <Tex>{String.raw`\langle e\mathbf r\rangle`}</Tex> then oscillates with a definite amplitude and a definite
          phase — a genuine little antenna. The Rabi problem of Chapter&nbsp;II hands us this dipole for free.
        </Intuition>
        <p>
          Write the general two-level state as a time-dependent superposition of the upper{" "}
          (<Tex>{String.raw`a`}</Tex>) and lower (<Tex>{String.raw`b`}</Tex>) eigenstates, with the slowly varying Rabi
          amplitudes <Tex>{String.raw`C_a(t),\,C_b(t)`}</Tex> riding on the bare phases:
        </p>
        <EqBlock label="1">{String.raw`\psi(\mathbf r,t)=C_a(t)\,e^{-i\omega_a t}\,u_a(\mathbf r)+C_b(t)\,e^{-i\omega_b t}\,u_b(\mathbf r).`}</EqBlock>
        <p>
          It is convenient to use the mean frequency <Tex>{String.raw`\omega_0=\tfrac12(\omega_a+\omega_b)`}</Tex> and
          the transition (difference) frequency <Tex>{String.raw`\omega=\omega_a-\omega_b`}</Tex>, so that{" "}
          <Tex>{String.raw`\omega_a=\omega_0+\tfrac12\omega`}</Tex> and{" "}
          <Tex>{String.raw`\omega_b=\omega_0-\tfrac12\omega`}</Tex>:
        </p>
        <EqBlock label="2">{String.raw`\psi(\mathbf r,t)=C_a(t)\,e^{-i(\omega_0+\frac12\omega)t}\,u_a(\mathbf r)+C_b(t)\,e^{-i(\omega_0-\frac12\omega)t}\,u_b(\mathbf r).`}</EqBlock>
        <p>
          The relative phase between the two terms cycles at the transition frequency{" "}
          <Tex>{String.raw`\omega`}</Tex>. At the instants <Tex>{String.raw`t=2\pi n/\omega`}</Tex> the relative phase
          factor is <Tex>{String.raw`+1`}</Tex> and the cloud sits at one turning point of its oscillation:
        </p>
        <EqBlock label="3">{String.raw`\psi\!\left(\mathbf r,\frac{2\pi n}{\omega}\right)=C_a\,u_a(\mathbf r)+C_b\,u_b(\mathbf r),`}</EqBlock>
        <p>
          while half a period later, at <Tex>{String.raw`t=(2n+1)\pi/\omega`}</Tex>, the relative phase is{" "}
          <Tex>{String.raw`-1`}</Tex> and the cloud has swung to the opposite turning point:
        </p>
        <EqBlock label="4">{String.raw`\psi\!\left(\mathbf r,\frac{(2n+1)\pi}{\omega}\right)=-C_a\,u_a(\mathbf r)+C_b\,u_b(\mathbf r).`}</EqBlock>
        <p>
          Between these instants the probability density <Tex>{String.raw`e|\psi|^2`}</Tex> sloshes back and forth,
          generating an oscillating charge displacement. To quantify it, compute the expectation value of the electric
          dipole moment <Tex>{String.raw`e\mathbf r`}</Tex>:
        </p>
        <EqBlock>{String.raw`\langle e\mathbf r\rangle = e\int d^3r\;\psi^*(\mathbf r,t)\,\mathbf r\,\psi(\mathbf r,t).`}</EqBlock>

        <Figure
          caption={
            <>
              The charge-cloud distortion. A stationary eigenstate (left) has a symmetric, time-independent density; a
              superposition (right) develops a lobe that swings from <Tex>{String.raw`-1`}</Tex> to{" "}
              <Tex>{String.raw`+1`}</Tex> relative phase and back at the transition frequency{" "}
              <Tex>{String.raw`\omega`}</Tex> — an oscillating dipole.
            </>
          }
        >
          <svg viewBox="0 0 520 200" width="100%" role="img" aria-label="Charge cloud distortion">
            <defs>
              <radialGradient id="cloud" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="lobeP" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e11d48" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* stationary */}
            <text x="95" y="22" textAnchor="middle" fontSize="13" fill="#1f2733" fontWeight="600">
              eigenstate
            </text>
            <ellipse cx="95" cy="110" rx="60" ry="60" fill="url(#cloud)" />
            <circle cx="95" cy="110" r="4" fill="#1b2330" />
            <text x="95" y="190" textAnchor="middle" fontSize="11" fill="#5b6473">
              static density
            </text>
            {/* divider */}
            <line x1="200" y1="40" x2="200" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />
            {/* superposition: lobe shifted right */}
            <text x="370" y="22" textAnchor="middle" fontSize="13" fill="#1f2733" fontWeight="600">
              superposition
            </text>
            <ellipse cx="350" cy="110" rx="58" ry="58" fill="url(#cloud)" />
            <ellipse cx="405" cy="110" rx="40" ry="48" fill="url(#lobeP)" />
            <circle cx="370" cy="110" r="4" fill="#1b2330" />
            <line x1="370" y1="110" x2="420" y2="110" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#e11d48" />
              </marker>
            </defs>
            <text x="370" y="190" textAnchor="middle" fontSize="11" fill="#5b6473">
              dipole sloshes at ω
            </text>
          </svg>
        </Figure>

        <p>
          Now insert <Tex>{String.raw`\psi`}</Tex> from Eq.&nbsp;(1). The diagonal terms (<Tex>{String.raw`a`}</Tex>–
          <Tex>{String.raw`a`}</Tex> and <Tex>{String.raw`b`}</Tex>–<Tex>{String.raw`b`}</Tex>) vanish by parity, since
          atomic eigenfunctions have definite parity and <Tex>{String.raw`\mathbf r`}</Tex> is odd. Only the cross terms
          survive, and they collapse to a single oscillating product of the Rabi amplitudes:
        </p>
        <KeyResult
          number="5"
          eq={String.raw`\langle e\mathbf r\rangle=\boldsymbol{\wp}\,C_a C_b^*\,e^{-i\omega t}+\text{c.c.}`}
          label="The oscillating quantum dipole (compact form)"
          note={
            <>
              The dipole moment is the matrix element{" "}
              <Tex>{String.raw`\boldsymbol{\wp}=e\int u_a^*\,\mathbf r\,u_b\,d^3r`}</Tex> times the oscillating
              amplitude product, plus complex conjugate. The factor <Tex>{String.raw`e^{-i\omega t}`}</Tex> (with{" "}
              <Tex>{String.raw`\omega=\omega_a-\omega_b`}</Tex>) shows the dipole oscillates{" "}
              <em>at the transition frequency</em> with a definite, field-determined phase — the quantum atom{" "}
              <em>is</em> an antenna.
            </>
          }
        />
        <p>
          Evaluating the cross term explicitly needs the Rabi amplitudes — the Chapter&nbsp;II Rabi-problem solutions
          (its Eqs.&nbsp;2.59&ndash;2.60), with the atom starting in the upper state{" "}
          <Tex>{String.raw`C_a(0)=1,\ C_b(0)=0`}</Tex>; <Tex>{String.raw`\mu`}</Tex> is the generalized Rabi frequency and{" "}
          <Tex>{String.raw`\mu_1,\mu_2`}</Tex> the dressed-state eigenfrequencies:
        </p>
        <EqBlock label="6">{String.raw`C_b(t)=\tfrac12\,\wp\,E_0(\hbar\mu)^{-1}\big[e^{i\mu_1 t}-e^{i\mu_2 t}\big],`}</EqBlock>
        <EqBlock label="7">{String.raw`C_a(t)=\mu^{-1}e^{i(\omega-\nu)t}\big[\mu_1 e^{i\mu_1 t}-\mu_2 e^{i\mu_2 t}\big].`}</EqBlock>
        <p>
          Their cross product <Tex>{String.raw`C_a C_b^*`}</Tex> sets the dipole&rsquo;s magnitude and phase; with the
          Rabi-difference frequency <Tex>{String.raw`\mu=\mu_1-\mu_2`}</Tex> (Chapter&nbsp;II Eq.&nbsp;2.61):
        </p>
        <EqBlock label="8">{String.raw`C_a C_b^*=\tfrac12\,\wp\,E_0(\hbar\mu^2)^{-1}e^{i(\omega-\nu)t}\big\{\mu_1+\mu_2-\mu_1 e^{i\mu t}-\mu_2 e^{-i\mu t}\big\}.`}</EqBlock>

        <p>
          Combining Eq.&nbsp;(8) with the compact form Eq.&nbsp;(5) and taking the real part gives the fully evaluated
          dipole. It is an optical-frequency oscillation (at the drive frequency <Tex>{String.raw`\nu`}</Tex>) carried by
          a <em>two-term</em> Rabi-modulated envelope — <em>not</em> a single{" "}
          <Tex>{String.raw`(1-\cos\mu t)`}</Tex> factor:
        </p>
        <EqBlock label="9">{String.raw`\langle e\mathbf r\rangle=\hat{\mathbf p}\,\wp^2 E_0(\hbar\mu^2)^{-1}\big[(\nu-\omega)(1-\cos\mu t)\cos\nu t-\mu\sin\mu t\,\sin\nu t\big].`}</EqBlock>
        <p>
          The two envelope terms behave very differently. The <Tex>{String.raw`(1-\cos\mu t)`}</Tex> piece is weighted by
          the <em>detuning</em> <Tex>{String.raw`(\nu-\omega)`}</Tex>, so it <strong>vanishes on resonance</strong>; the
          surviving on-resonance envelope is the <Tex>{String.raw`\mu\sin\mu t`}</Tex> term, which is{" "}
          <Tex>{String.raw`\propto|\sin\mu t|`}</Tex>. Either way the envelope <strong>nulls every time the population
          returns to a pure eigenstate</strong> (<Tex>{String.raw`\mu t=0,\,2\pi,\dots`}</Tex>, and on resonance also at{" "}
          <Tex>{String.raw`\mu t=\pi`}</Tex> where the atom sits in the pure lower state <Tex>{String.raw`b`}</Tex>) — a
          pure eigenstate cannot radiate, exactly as the first derivation step insists. This is the load-bearing
          structure later chapters use.
        </p>

        <Derivation title="From a stationary eigenstate to a Rabi-modulated antenna">
          <Step title="Why a pure eigenstate does not radiate">
            For <Tex>{String.raw`\psi=u_n e^{-i\omega_n t}`}</Tex> the density{" "}
            <Tex>{String.raw`e|\psi|^2=e|u_n|^2`}</Tex> is time-independent, so{" "}
            <Tex>{String.raw`\langle e\mathbf r\rangle=e\int|u_n|^2\,\mathbf r\,d^3r`}</Tex> is a fixed number (zero by
            parity). No oscillation, no radiation — radiation needs a <em>non-stationary</em> state.
          </Step>
          <Step title="Form the superposition and compute the density">
            With <Tex>{String.raw`\psi=C_a e^{-i\omega_a t}u_a+C_b e^{-i\omega_b t}u_b`}</Tex>, the density{" "}
            <Tex>{String.raw`|\psi|^2`}</Tex> has stationary diagonal terms plus cross terms{" "}
            <Tex>{String.raw`\propto e^{-i(\omega_a-\omega_b)t}u_a u_b^*+\text{c.c.}`}</Tex> that oscillate at the
            transition frequency <Tex>{String.raw`\omega`}</Tex>.
          </Step>
          <Step title="Project onto position">
            Insert <Tex>{String.raw`\psi`}</Tex> into the dipole-moment integral. Diagonal terms vanish by parity; the
            cross terms give the compact result Eq.&nbsp;(5),{" "}
            <Tex>{String.raw`\langle e\mathbf r\rangle=\boldsymbol{\wp}C_a C_b^* e^{-i\omega t}+\text{c.c.}`}</Tex>, with
            the dipole matrix element <Tex>{String.raw`\boldsymbol{\wp}`}</Tex> and{" "}
            <Tex>{String.raw`\omega=\omega_a-\omega_b`}</Tex>.
          </Step>
          <Step title="Insert the Rabi amplitudes">
            Substitute the Chapter-II solutions (Eqs.&nbsp;6&ndash;7). Their product (Eq.&nbsp;8) yields the fully
            evaluated dipole Eq.&nbsp;(9), a two-term envelope:{" "}
            <Tex>{String.raw`(\nu-\omega)(1-\cos\mu t)\cos\nu t-\mu\sin\mu t\sin\nu t`}</Tex>. The atom is a dipole
            oscillating at the optical frequency, with an envelope that <em>flops at the Rabi rate and nulls at every
            pure-state instant</em> (<Tex>{String.raw`\mu t=0,2\pi,\dots`}</Tex>; also <Tex>{String.raw`\mu t=\pi`}</Tex>{" "}
            on resonance) — a phase fixed by the drive, the seed of stimulated emission.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Definite phase is the whole game">
          Unlike a classical oscillator with an arbitrary initial phase, the quantum dipole acquires its phase{" "}
          <em>from</em> the applied field. That is exactly why a driven excited atom emits in step with — and therefore
          amplifies — the incident wave.
        </Callout>
        <Callout kind="warning" title="Single dipole vs. ensemble">
          The quantum <Tex>{String.raw`\langle e\mathbf r\rangle`}</Tex> is the <em>average</em> of many classical
          dipoles, not one. A measurement on a single atom yields its dipole; the expectation refers to the ensemble.
          Hold onto this — it resolves the apparent clash between &ldquo;definite classical phase&rdquo; and
          &ldquo;quantum averaging.&rdquo;
        </Callout>
      </Section>

      <Section title="3-2a The free, self-damped oscillator (spontaneous emission)">
        <Intuition>
          Strip away quantum mechanics. A charge on a spring, pulled aside and released, rings at its natural frequency{" "}
          <Tex>{String.raw`\omega_0`}</Tex>. But an accelerating charge <em>radiates</em> (Larmor), and that energy has
          to come from the oscillation itself. So the charge feels a <strong>radiation-reaction</strong> force that
          drains it, and the free oscillation rings down exponentially. That is the classical analog of spontaneous
          emission: an excited oscillator decaying on its own, no applied field, at a rate{" "}
          <Tex>{String.raw`\Gamma`}</Tex> tied to the classical electron radius.
        </Intuition>
        <p>
          Begin with Newton&rsquo;s second law for a Hooke&rsquo;s-law restoring force — simple harmonic motion at{" "}
          <Tex>{String.raw`\omega_0`}</Tex>:
        </p>
        <EqBlock label="10">{String.raw`\ddot x(t)+\omega_0^2\,x(t)=0.`}</EqBlock>
        <p>
          The general solution is fixed by initial position and velocity, and is conveniently repackaged into an
          amplitude <Tex>{String.raw`x_0`}</Tex> and phase <Tex>{String.raw`\phi`}</Tex>:
        </p>
        <EqBlock label="11">{String.raw`x(t)=x(0)\cos\omega_0 t+\frac{\dot x(0)}{\omega_0}\sin\omega_0 t,`}</EqBlock>
        <EqBlock label="12">{String.raw`x_0=\left[x^2(0)+\frac{\dot x^2(0)}{\omega_0^2}\right]^{1/2},\qquad \tan\phi=-\frac{\dot x(0)}{\omega_0\,x(0)},`}</EqBlock>
        <EqBlock label="13">{String.raw`x(t)=x_0\cos(\omega_0 t+\phi).`}</EqBlock>
        <p>
          The oscillating charge accelerates, so it radiates a far field. The radiation electric field is proportional
          to the transverse projection of the acceleration, evaluated at the retarded time{" "}
          <Tex>{String.raw`t-R/c`}</Tex>, and the magnetic field follows from the vacuum impedance:
        </p>
        <EqBlock label="14">{String.raw`\mathbf E(\mathbf R,t)=\frac{e}{4\pi\varepsilon_0 c^2}\left[\frac{\hat{\boldsymbol\kappa}\times(\hat{\boldsymbol\kappa}\times\dot{\mathbf v})}{R}\right]_{t-R/c},`}</EqBlock>
        <EqBlock label="15">{String.raw`\mathbf H(\mathbf R,t)=\sqrt{\frac{\varepsilon_0}{\mu_0}}\,\hat{\boldsymbol\kappa}\times\mathbf E(\mathbf R,t).`}</EqBlock>
        <p>
          The decay rate is fixed self-consistently by energy bookkeeping: the work done by the reaction force on the
          charge must equal minus the energy radiated away,
        </p>
        <EqBlock label="16">{String.raw`\int_t^{t+\delta t}\!dt'\;\mathbf F_{\text{rad}}\cdot\mathbf v=-\int_t^{t+\delta t}\!dt'\;(\text{power radiated}).`}</EqBlock>
        <p>
          The Poynting vector of the radiating dipole is the famous <Tex>{String.raw`\sin^2\theta`}</Tex>{" "}
          &ldquo;doughnut&rdquo; — no radiation along the oscillation axis, maximum broadside:
        </p>
        <EqBlock label="17">{String.raw`\mathbf S=\mathbf E\times\mathbf H=\sqrt{\frac{\varepsilon_0}{\mu_0}}\,(\mathbf E\cdot\mathbf E)\,\hat{\boldsymbol\kappa}=\frac{e^2\dot v^2}{16\pi^2\varepsilon_0 c^3}\,\frac{\sin^2\theta}{R^2}\,\hat{\boldsymbol\kappa}.`}</EqBlock>

        <Figure
          caption={
            <>
              Fig.&nbsp;3-3 (schematic). The dipole radiation pattern: intensity{" "}
              <Tex>{String.raw`\propto\sin^2\theta`}</Tex>, a torus with nulls along the oscillation axis{" "}
              <Tex>{String.raw`\hat z`}</Tex> and a maximum broadside.
            </>
          }
        >
          <svg viewBox="0 0 360 200" width="100%" role="img" aria-label="Dipole radiation doughnut pattern">
            {/* axis */}
            <line x1="180" y1="20" x2="180" y2="180" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="188" y="28" fontSize="12" fill="#5b6473">
              ẑ (dipole axis)
            </text>
            {/* sin^2 lobes */}
            <path
              d="M180,100 C 250,40 320,70 320,100 C 320,130 250,160 180,100 Z"
              fill="#4f46e5"
              fillOpacity="0.18"
              stroke="#4f46e5"
              strokeWidth="2"
            />
            <path
              d="M180,100 C 110,40 40,70 40,100 C 40,130 110,160 180,100 Z"
              fill="#4f46e5"
              fillOpacity="0.18"
              stroke="#4f46e5"
              strokeWidth="2"
            />
            <circle cx="180" cy="100" r="4" fill="#1b2330" />
            <text x="328" y="104" fontSize="11" fill="#5b6473">
              max
            </text>
            <text x="150" y="44" fontSize="11" fill="#5b6473">
              null
            </text>
          </svg>
        </Figure>

        <p>
          Integrating <Tex>{String.raw`\mathbf S`}</Tex> over a sphere — the angular integral of{" "}
          <Tex>{String.raw`\sin^2\theta`}</Tex> gives <Tex>{String.raw`8\pi/3`}</Tex> — yields the total radiated power,
          Larmor&rsquo;s formula: power proportional to acceleration squared,
        </p>
        <EqBlock label="18">{String.raw`\oint \mathbf S\cdot d\mathbf a=4\pi\cdot\frac{2}{3}\,\frac{e^2\dot v^2}{16\pi^2\varepsilon_0 c^3}=\frac{2}{3}\,\frac{e^2}{4\pi\varepsilon_0 c^3}\,\dot v^2.`}</EqBlock>
        <p>
          Demanding that this energy be supplied by work against a reaction force (Eq.&nbsp;16), then integrating by
          parts and discarding the surface term, gives the Abraham&ndash;Lorentz force — proportional to the{" "}
          <em>third</em> time derivative of position:
        </p>
        <EqBlock label="19">{String.raw`\mathbf F_{\text{rad}}=\frac{2}{3}\,\frac{e^2}{4\pi\varepsilon_0 c^3}\,\dddot{\mathbf v}.`}</EqBlock>
        <p>
          For nearly periodic motion at <Tex>{String.raw`\omega_0`}</Tex>,{" "}
          <Tex>{String.raw`\dddot{\mathbf v}\simeq-\omega_0^2\dot{\mathbf v}`}</Tex>, so the reaction force becomes
          ordinary velocity-proportional damping and the equation of motion collapses to the damped oscillator:
        </p>
        <EqBlock label="20">{String.raw`\ddot x(t)+2\Gamma\,\dot x(t)+\omega_0^2\,x(t)=0.`}</EqBlock>
        <p>
          Matching the reaction force to <Tex>{String.raw`2\Gamma\dot x`}</Tex> identifies the damping constant; it
          scales with the classical electron radius <Tex>{String.raw`r_0`}</Tex> and the square of the frequency:
        </p>
        <KeyResult
          number="21"
          eq={String.raw`\Gamma=\frac{1}{3}\,\frac{e^2\omega_0^2}{4\pi\varepsilon_0 m c^3}=\frac{1}{3}\,\frac{r_0\,\omega_0^2}{c},`}
          label="Radiative damping constant"
        />
        <EqBlock label="22">{String.raw`r_0=\frac{e^2}{4\pi\varepsilon_0 m c^2}=2.8\times10^{-15}\ \text{m}.`}</EqBlock>
        <p>
          The classical electron radius <Tex>{String.raw`r_0`}</Tex> is the radius at which the electrostatic
          self-energy equals the rest-mass energy. With <Tex>{String.raw`\Gamma`}</Tex> in hand, the damped free
          oscillator solves to an exponentially ringing-down oscillation — the classical picture of spontaneous
          emission:
        </p>
        <KeyResult
          number="23"
          eq={String.raw`x(t)=x_0\,e^{-\Gamma t}\cos(\omega_0 t+\phi).`}
          label="Damped free decay (classical spontaneous emission)"
          note={
            <>
              Amplitude decays at rate <Tex>{String.raw`\Gamma`}</Tex>; energy decays at{" "}
              <Tex>{String.raw`2\Gamma`}</Tex>.
            </>
          }
        />

        <Derivation title="Spring → radiation → damping → ringdown" defaultOpen={false}>
          <Step title="From spring to radiation">
            Start with the free SHO (Eq.&nbsp;10). The oscillating charge accelerates and radiates far fields (Eqs.&nbsp;
            14&ndash;15); the Poynting flux (Eq.&nbsp;17) carries energy outward in the{" "}
            <Tex>{String.raw`\sin^2\theta`}</Tex> pattern.
          </Step>
          <Step title="Integrate to Larmor">
            Integrate <Tex>{String.raw`\mathbf S`}</Tex> over a sphere; the angular integral of{" "}
            <Tex>{String.raw`\sin^2\theta`}</Tex> gives <Tex>{String.raw`8\pi/3`}</Tex>, yielding Larmor&rsquo;s power
            (Eq.&nbsp;18).
          </Step>
          <Step title="Demand energy conservation → reaction force">
            The radiated energy must be supplied by work against a reaction force (Eq.&nbsp;16). Integrating by parts and
            dropping the surface term (valid for periodic motion) gives the Abraham&ndash;Lorentz force (Eq.&nbsp;19),
            <Tex>{String.raw`\propto\dddot{\mathbf v}`}</Tex>.
          </Step>
          <Step title="Reduce to ordinary damping and solve">
            For motion near <Tex>{String.raw`\omega_0`}</Tex>,{" "}
            <Tex>{String.raw`\dddot{\mathbf v}\simeq-\omega_0^2\dot{\mathbf v}`}</Tex>, giving the damped EOM
            (Eq.&nbsp;20) with <Tex>{String.raw`\Gamma`}</Tex> from Eq.&nbsp;(21). The underdamped solution is the
            exponential ringdown (Eq.&nbsp;23): amplitude decays at <Tex>{String.raw`\Gamma`}</Tex>, energy at{" "}
            <Tex>{String.raw`2\Gamma`}</Tex>.
          </Step>
        </Derivation>

        <Callout kind="warning" title="Classical and quantum decay differ a lot">
          The book is explicit: this classical analog of spontaneous emission differs <em>considerably</em> from the
          quantum-mechanical result (which awaits Chapter&nbsp;XIV). Use it for intuition, not for accurate rates.
        </Callout>
      </Section>

      <Section title="3-2b Radiated spectrum: damping becomes a Lorentzian linewidth">
        <Intuition>
          A perfectly undamped oscillator radiates a single pure frequency — an infinitely sharp line. But a real
          oscillator rings <em>down</em>, and a decaying sinusoid is not monochromatic. Fourier-analyze the ringdown and
          its energy spreads over a band centered on <Tex>{String.raw`\omega_0`}</Tex>. The result is the{" "}
          <strong>Lorentzian</strong> lineshape, whose width is set directly by the damping: faster decay (shorter
          lifetime) means a broader line. This lifetime&ndash;linewidth reciprocity is the workhorse of all laser
          physics.
        </Intuition>
        <p>
          The radiated field follows its source: insert the damped solution (Eq.&nbsp;23) into the retarded far field
          (Eq.&nbsp;14) and the field inherits the <Tex>{String.raw`e^{-\Gamma t}`}</Tex> envelope, with amplitude{" "}
          <Tex>{String.raw`E_r`}</Tex> set by the charge, the oscillation amplitude, and{" "}
          <Tex>{String.raw`\omega_0^2`}</Tex> (acceleration):
        </p>
        <EqBlock label="24">{String.raw`E(t)=E_r\,e^{-\Gamma t}\cos(\omega_0 t+\phi),`}</EqBlock>
        <EqBlock label="25">{String.raw`E_r=\frac{e\,\omega_0^2 x_0}{4\pi\varepsilon_0 c^2 R}.`}</EqBlock>
        <p>
          Fourier-transform the ringdown. Writing the cosine as a sum of exponentials produces two terms — a
          counter-rotating piece and a co-rotating piece. Near resonance{" "}
          <Tex>{String.raw`\omega_0\approx\nu`}</Tex> the anti-resonant term is negligible; dropping it is the{" "}
          <strong>rotating-wave approximation</strong>:
        </p>
        <EqBlock label="26">{String.raw`E(\nu)=\frac{E_r}{2\pi}\int_0^\infty\!dt\,e^{-\Gamma t}\cos(\omega_0 t+\phi)\,e^{i\nu t}=\frac{E_r}{4\pi}\left[\frac{1}{\Gamma+i(\omega_0-\nu)}+\frac{1}{\Gamma-i(\omega_0+\nu)}\right]\approx\frac{E_r}{4\pi}\,\frac{1}{\Gamma+i(\omega_0-\nu)}.`}</EqBlock>
        <p>
          Squaring the resonant term gives the spectrum:
        </p>
        <KeyResult
          number="27"
          eq={String.raw`|E(\nu)|^2=\frac{E_r^2}{\Gamma^2+(\omega_0-\nu)^2}.`}
          label="The Lorentzian lineshape"
          note={
            <>
              A peak at <Tex>{String.raw`\nu=\omega_0`}</Tex> with half-width-at-half-maximum{" "}
              <Tex>{String.raw`\Gamma`}</Tex>, hence full width <Tex>{String.raw`2\Gamma`}</Tex>. Lifetime{" "}
              <Tex>{String.raw`1/\Gamma`}</Tex> <Tex>{String.raw`\leftrightarrow`}</Tex> linewidth{" "}
              <Tex>{String.raw`\Gamma`}</Tex>.
            </>
          }
        />

        <Derivation title="Ringdown → Lorentzian" defaultOpen={false}>
          <Step title="Source → radiated field">
            Insert the damped solution (Eq.&nbsp;23) into the far field (Eq.&nbsp;14, retarded). The field inherits the{" "}
            <Tex>{String.raw`e^{-\Gamma t}`}</Tex> envelope (Eqs.&nbsp;24&ndash;25).
          </Step>
          <Step title="Fourier-transform the ringdown">
            Compute <Tex>{String.raw`E(\nu)=\frac{1}{2\pi}\int_0^\infty E(t)e^{i\nu t}\,dt`}</Tex>. Writing cosine
            as exponentials yields two Lorentzian terms with denominators{" "}
            <Tex>{String.raw`\Gamma+i(\omega_0-\nu)`}</Tex> and <Tex>{String.raw`\Gamma-i(\omega_0+\nu)`}</Tex>.
          </Step>
          <Step title="Rotating-wave approximation">
            Near resonance the anti-resonant term (<Tex>{String.raw`\omega_0+\nu`}</Tex>) is negligible against the
            resonant term (<Tex>{String.raw`\omega_0-\nu`}</Tex>). Drop it — the RWA again.
          </Step>
          <Step title="Square to the spectrum">
            <Tex>{String.raw`|E(\nu)|^2=E_r^2/[\Gamma^2+(\omega_0-\nu)^2]`}</Tex> (Eq.&nbsp;27). Half-maximum occurs at{" "}
            <Tex>{String.raw`(\omega_0-\nu)=\pm\Gamma`}</Tex>, so HWHM <Tex>{String.raw`=\Gamma`}</Tex>, FWHM{" "}
            <Tex>{String.raw`=2\Gamma`}</Tex>.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Lifetime ↔ linewidth">
          A short lifetime (large <Tex>{String.raw`\Gamma`}</Tex>) forces a broad line; an infinitely long-lived
          oscillator gives a delta function. This reciprocity reappears for collisional, Doppler, and natural broadening
          throughout the book.
        </Callout>
        <Callout kind="note" title="HWHM = Γ">
          The half-width at half maximum equals <Tex>{String.raw`\Gamma`}</Tex>; the <em>full</em> width is{" "}
          <Tex>{String.raw`2\Gamma`}</Tex> (as labeled in Fig.&nbsp;3-4). Don&rsquo;t invert these.
        </Callout>
      </Section>

      <Section title="3-2c The driven dipole: absorption and the cycle-averaged power">
        <Intuition>
          Now apply an oscillating field <Tex>{String.raw`E_0\cos\nu t`}</Tex> to the damped charge. After transients
          die, the charge settles into steady oscillation at the <em>drive</em> frequency{" "}
          <Tex>{String.raw`\nu`}</Tex>, lagging the force by a phase that depends on how near{" "}
          <Tex>{String.raw`\nu`}</Tex> is to <Tex>{String.raw`\omega_0`}</Tex>. The decisive question: does the field do
          net positive work on the charge over a cycle (energy flows field <Tex>{String.raw`\to`}</Tex> charge:{" "}
          <strong>absorption</strong>) or net negative work (charge <Tex>{String.raw`\to`}</Tex> field:{" "}
          <strong>stimulated emission</strong>)? For a steady-state oscillator started from rest the answer is always
          absorption — and the absorbed power versus drive frequency is, once more, a Lorentzian peaked at resonance.
        </Intuition>
        <p>
          The equation of motion with an applied harmonic field of frequency <Tex>{String.raw`\nu`}</Tex> and amplitude{" "}
          <Tex>{String.raw`E_0`}</Tex> (driving force <Tex>{String.raw`eE_0/m`}</Tex>):
        </p>
        <EqBlock label="28">{String.raw`\ddot x+2\Gamma\dot x+\omega_0^2 x=\frac{eE_0}{m}\cos\nu t=\tfrac12\,\frac{eE_0}{m}\,e^{-i\nu t}+\text{c.c.}`}</EqBlock>
        <p>
          Try a steady-state ansatz: the charge oscillates at the drive frequency with a complex amplitude{" "}
          <Tex>{String.raw`X`}</Tex> whose phase encodes the lag,
        </p>
        <EqBlock label="29">{String.raw`x(t)=\tfrac12 X\,e^{-i\nu t}+\text{c.c.}`}</EqBlock>
        <p>
          Each time derivative pulls down a factor <Tex>{String.raw`-i\nu`}</Tex>, giving an algebraic equation for{" "}
          <Tex>{String.raw`X`}</Tex>; the imaginary <Tex>{String.raw`-2i\Gamma\nu`}</Tex> term is what produces the
          out-of-phase, absorbing component:
        </p>
        <EqBlock>{String.raw`(-\nu^2-2i\Gamma\nu+\omega_0^2)\,X=\tfrac12\,\frac{eE_0}{m}.`}</EqBlock>
        <p>
          Solving, and using <Tex>{String.raw`\omega_0^2-\nu^2=(\omega_0-\nu)(\omega_0+\nu)\approx 2\nu(\omega_0-\nu)`}</Tex>{" "}
          near resonance, reduces <Tex>{String.raw`X`}</Tex> to a single complex Lorentzian:
        </p>
        <EqBlock label="30">{String.raw`X=\tfrac12\,\frac{eE_0}{m}\,\frac{1}{\omega_0^2-\nu^2-2i\Gamma\nu}\;\approx\;\frac{eE_0}{4m\nu}\,\frac{1}{\omega_0-\nu-i\Gamma}.`}</EqBlock>
        <p>
          The real part of <Tex>{String.raw`X`}</Tex> is in phase with the drive (dispersive); the imaginary part (from{" "}
          <Tex>{String.raw`\Gamma`}</Tex>) is <Tex>{String.raw`90^\circ`}</Tex> out of phase and does the absorbing.
          Averaging the power <Tex>{String.raw`e E_{\text{field}}\,\dot x`}</Tex> over one drive cycle picks out exactly
          that imaginary part:
        </p>
        <KeyResult
          number="31"
          eq={String.raw`\bar P=\tfrac14 eE_0\,i\nu X^*+\text{c.c.}=\frac{1}{8}\,\frac{e^2E_0^2}{m\Gamma}\,\frac{\Gamma^2}{(\omega_0-\nu)^2+\Gamma^2}\;>\;0.`}
          label="Cycle-averaged absorbed power (classical absorption line)"
          note={
            <>
              Strictly positive (absorption), and itself a Lorentzian in drive frequency{" "}
              <Tex>{String.raw`\nu`}</Tex> with HWHM <Tex>{String.raw`\Gamma`}</Tex>, peaked at resonance.
            </>
          }
        />

        <Derivation title="Steady state always absorbs" defaultOpen={false}>
          <Step title="Plug ansatz into the driven EOM">
            Insert Eq.&nbsp;(29) into Eq.&nbsp;(28). Each derivative gives <Tex>{String.raw`-i\nu`}</Tex>, yielding{" "}
            <Tex>{String.raw`(\omega_0^2-\nu^2-2i\Gamma\nu)X=\tfrac12(eE_0/m)`}</Tex>.
          </Step>
          <Step title="Solve and simplify near resonance">
            Factor <Tex>{String.raw`\omega_0^2-\nu^2\approx 2\nu(\omega_0-\nu)`}</Tex>, leaving{" "}
            <Tex>{String.raw`X=(eE_0/4m\nu)/(\omega_0-\nu-i\Gamma)`}</Tex> (Eq.&nbsp;30). The{" "}
            <Tex>{String.raw`-i\Gamma`}</Tex> is the absorptive piece.
          </Step>
          <Step title="Compute work done by the field">
            Average <Tex>{String.raw`eE\dot x`}</Tex> over a cycle (Eq.&nbsp;31). Only the part of{" "}
            <Tex>{String.raw`\dot x`}</Tex> in phase with the cosine survives; it picks out{" "}
            <Tex>{String.raw`\operatorname{Im}X\propto\Gamma`}</Tex>. The result is positive and Lorentzian.
          </Step>
          <Step title="Read off the absorption line">
            <Tex>{String.raw`\bar P(\nu)`}</Tex> is a Lorentzian of HWHM <Tex>{String.raw`\Gamma`}</Tex> centered at{" "}
            <Tex>{String.raw`\omega_0`}</Tex>. Problem 3-2 connects its frequency integral to the Einstein{" "}
            <Tex>{String.raw`B`}</Tex> coefficient (Eq.&nbsp;49).
          </Step>
        </Derivation>

        <Callout kind="insight" title="Why steady state only absorbs">
          Starting from rest, the forced oscillator&rsquo;s velocity lags the drive into the absorbing quadrant; the
          field always does net positive work. To get <em>emission</em> you must start the oscillator already
          oscillating, with the right phase and amplitude — the subject of the next section.
        </Callout>
      </Section>

      <Section title="3-2d The phase criterion: stimulated emission vs. absorption">
        <Intuition>
          This is the heart of the chapter. Suppose the charge is <em>not</em> at rest when the field arrives — it is
          already oscillating with amplitude <Tex>{String.raw`x_0`}</Tex> and phase{" "}
          <Tex>{String.raw`\phi`}</Tex> (the classical stand-in for an already-excited atom). Superpose this free
          oscillation onto the driven one and the cycle-averaged power picks up a factor{" "}
          <Tex>{String.raw`\sin[(\omega_0-\nu)t+\phi-\phi_0]`}</Tex>. Depending on the <strong>relative phase</strong>{" "}
          <Tex>{String.raw`\phi-\phi_0`}</Tex>, that power can be <em>negative</em>: the dipole pumps energy{" "}
          <em>into</em> the field. That is stimulated emission. Right phase, the field is amplified; opposite phase, it
          is absorbed. The classical oscillator reproduces both — the sign is set entirely by phase. The one thing it
          cannot do on its own is <em>choose</em> the emitting phase; that is what population inversion provides in a
          real laser.
        </Intuition>
        <p>
          Take a charge that is already oscillating (pre-excited) when the field switches on at{" "}
          <Tex>{String.raw`t=0`}</Tex>:
        </p>
        <EqBlock label="32">{String.raw`x(0)=x_0\cos\phi,\qquad \dot x(0)=-\omega_0 x_0\sin\phi.`}</EqBlock>
        <p>
          The full solution is the free oscillation at <Tex>{String.raw`\omega_0`}</Tex> plus the undamped forced
          response at <Tex>{String.raw`\nu`}</Tex>, with the driven part arranged to vanish at{" "}
          <Tex>{String.raw`t=0`}</Tex> (the instant the field is switched on); both motions are present and interfere:
        </p>
        <EqBlock label="33">{String.raw`x(t)=x_0\cos(\omega_0 t+\phi)+\frac{eE_0}{m}\left[\frac{\cos(\nu t+\phi_0)}{\omega_0^2-\nu^2}-\frac{\cos(\omega_0 t+\phi_0)}{2\omega_0(\omega_0-\nu)}-\frac{\cos(\omega_0 t-\phi_0)}{2\omega_0(\omega_0+\nu)}\right].`}</EqBlock>
        <p>
          Averaging <Tex>{String.raw`eE_{\text{field}}\dot x`}</Tex> over a cycle, the pure-driven and pure-free
          self-terms are either bookkeeping or vanish; the surviving physics is the <em>cross term</em> between the
          pre-existing oscillation (amplitude <Tex>{String.raw`x_0`}</Tex>, phase{" "}
          <Tex>{String.raw`\phi`}</Tex>) and the drive (phase <Tex>{String.raw`\phi_0`}</Tex>):
        </p>
        <EqBlock label="34a">{String.raw`\bar P=\tfrac14 eE_0\,e^{-i(\nu t+\phi_0)}\Big\{i\omega_0 x_0\,e^{i(\omega_0 t+\phi)}+i\frac{eE_0}{m}\Big[\frac{e^{i(\nu t+\phi_0)}}{(\omega_0^2-\nu^2)/\nu}-\tfrac12\frac{e^{i(\omega_0 t+\phi_0)}}{\omega_0-\nu}-\tfrac12\frac{e^{i(\omega_0 t-\phi_0)}}{\omega_0+\nu}\Big]\Big\}+\text{c.c.}`}</EqBlock>
        <p>
          Simplifying, the leading factor is a <em>sine of the relative phase</em>:
        </p>
        <KeyResult
          number="34"
          eq={String.raw`\bar P=-\tfrac12\,eE_0\,\omega_0 x_0\,\sin\!\big[(\omega_0-\nu)t+\phi-\phi_0\big]+\frac{(eE_0)^2}{4m}\,\frac{\sin[(\omega_0-\nu)t]}{(\omega_0-\nu)}.`}
          label="Phase-dependent power exchanged with the field"
          note={
            <>
              The dominant first term is <Tex>{String.raw`\propto\sin`}</Tex> of the relative phase. Its{" "}
              <em>sign</em> — set by the relative phase between the pre-existing oscillation and the drive — decides
              emission vs. absorption.
            </>
          }
        />
        <KeyResult
          number="35"
          eq={String.raw`\bar P\begin{cases}>0 & \text{stimulated absorption (field loses energy)}\\[2pt]<0 & \text{stimulated emission (field gains energy)}\end{cases}`}
          label="The emission / absorption criterion"
          note={
            <>
              The sign is controlled by <Tex>{String.raw`\phi-\phi_0`}</Tex> and the detuning. At resonance{" "}
              <Tex>{String.raw`\omega_0=\nu`}</Tex>, for a phase difference near{" "}
              <Tex>{String.raw`\pi/2`}</Tex> the power stays one sign for{" "}
              <Tex>{String.raw`t\ll 1/(\omega_0-\nu)`}</Tex>.
            </>
          }
        />

        <Derivation title="Superpose, average, read the sign">
          <Step title="Superpose free + driven motion">
            Add the homogeneous free oscillation <Tex>{String.raw`x_0\cos(\omega_0 t+\phi)`}</Tex> to the undamped
            forced version of Eq.&nbsp;(29), arranging coefficients so the forced part vanishes at{" "}
            <Tex>{String.raw`t=0`}</Tex>. The result is Eq.&nbsp;(33).
          </Step>
          <Step title="Average the power over a cycle">
            Cycle-average <Tex>{String.raw`eE_{\text{field}}\dot x`}</Tex>. The pure-driven and pure-free self-terms drop
            or are bookkeeping; the surviving physics is the cross term between the pre-existing oscillation
            (<Tex>{String.raw`x_0,\phi`}</Tex>) and the drive (<Tex>{String.raw`\phi_0`}</Tex>) — Eq.&nbsp;(34a).
          </Step>
          <Step title="Extract the phase dependence">
            Simplify the cross term to{" "}
            <Tex>{String.raw`\bar P=-\tfrac12 eE_0\omega_0 x_0\sin[(\omega_0-\nu)t+\phi-\phi_0]`}</Tex> plus a smaller term
            (Eq.&nbsp;34). The leading factor is a sine of the relative phase.
          </Step>
          <Step title="Read the sign as emission or absorption">
            If the sine makes <Tex>{String.raw`\bar P>0`}</Tex>: absorption. If{" "}
            <Tex>{String.raw`\bar P<0`}</Tex>: stimulated emission. For small <Tex>{String.raw`t`}</Tex> (or small{" "}
            <Tex>{String.raw`E_0`}</Tex>) the sign is locked by the initial relative phase{" "}
            <Tex>{String.raw`\phi-\phi_0`}</Tex>; near <Tex>{String.raw`\pi/2`}</Tex> the average starts negative —
            emission (Eq.&nbsp;35).
          </Step>
        </Derivation>

        <Callout kind="insight" title="This is the chapter">
          Everything before built to Eqs.&nbsp;(34)&ndash;(35): stimulated emission vs. absorption is a{" "}
          <strong>phase relationship</strong>, not a separate force. Memorize the structure{" "}
          <Tex>{String.raw`\sin[(\omega_0-\nu)t+\phi-\phi_0]`}</Tex>.
        </Callout>
        <Callout kind="warning" title="Classical limitation">
          A classical oscillator has a definite initial phase. The quantum atom acquires its phase from the field and
          refers to an ensemble average. To sustain net emission you need many dipoles in the emitting phase — a
          population inversion, which a harmonic oscillator cannot supply (see the anharmonic / Duffing remark below).
        </Callout>

        <SimFrame
          title="Driven dipole gain/loss sandbox: phase decides emission vs. absorption"
          caption={
            <>
              An RK4 integration of the driven, radiatively damped charge-on-a-spring (Eq.&nbsp;28) started from a
              pre-excited state (Eq.&nbsp;32). Drag the relative phase <Tex>{String.raw`\phi`}</Tex> and watch the
              cycle-averaged power <Tex>{String.raw`\bar P`}</Tex> flip sign — the headline criterion
              Eqs.&nbsp;(34)&ndash;(35). The dashed curve overlays the analytic leading term; the side panel ties the
              same physics to the absorption Lorentzian (Eq.&nbsp;31).
            </>
          }
          tryThis={
            <>
              At the defaults (<Tex>{String.raw`\phi=\pi/2`}</Tex>, on resonance, small{" "}
              <Tex>{String.raw`E_0`}</Tex> — the book&rsquo;s regime for the sign argument) the badge reads{" "}
              <strong>GAIN</strong>: <Tex>{String.raw`\bar P<0`}</Tex>, stimulated emission. Sweep{" "}
              <Tex>{String.raw`\phi`}</Tex> from <Tex>{String.raw`0`}</Tex> to{" "}
              <Tex>{String.raw`2\pi`}</Tex> and watch the sign flip GAIN <Tex>{String.raw`\leftrightarrow`}</Tex> LOSS.
              Set <Tex>{String.raw`x_0=0`}</Tex> (start from rest): only absorption remains, exactly Eq.&nbsp;(31). Now
              detune <Tex>{String.raw`\nu`}</Tex> off <Tex>{String.raw`\omega_0`}</Tex>: the slow{" "}
              <Tex>{String.raw`(\omega_0-\nu)`}</Tex> beat reappears and <Tex>{String.raw`\bar P`}</Tex> oscillates between
              gain and loss. Crank <Tex>{String.raw`E_0`}</Tex> up and the resonant build-up of the driven response
              swamps the cross term — the full numeric departs from the dashed leading term and absorption wins, itself
              instructive.
            </>
          }
        >
          <Ch03Sim />
        </SimFrame>
      </Section>

      <Section title="3-2e Energy flow, the in-phase characteristic, and the anharmonic outlook">
        <Intuition>
          Finally, follow the energy along the propagation direction. The incident field and the field radiated by the
          driven dipole interfere; their cross term in the Poynting vector either <em>adds</em> to the beam (gain) or{" "}
          <em>subtracts</em> from it (loss) — and does so with the <strong>same phase and same direction</strong> as the
          incident wave. That is the third hallmark of stimulated processes: the emitted radiation is collinear and
          phase-coherent with the driver, exactly what an amplifying medium in a cavity needs. The catch, revealed at
          the end, is that a harmonic oscillator cannot be inverted into a sustained emitting state — real gain needs{" "}
          <strong>anharmonic</strong> (soft-spring) oscillators: the Duffing problem.
        </Intuition>
        <p>
          Take the dipole to oscillate along <Tex>{String.raw`\hat z`}</Tex> at the optical frequency — the source whose
          far field will interfere with the incident beam:
        </p>
        <EqBlock label="36">{String.raw`\mathbf p=\hat z\,p_0\cos(\omega t+\phi).`}</EqBlock>
        <p>
          The total Poynting flux is built from the sum of the dipole&rsquo;s radiated fields (subscript{" "}
          <Tex>{String.raw`R`}</Tex>) and the incident fields (subscript <Tex>{String.raw`I`}</Tex>); the{" "}
          <em>cross terms</em> carry the interference (gain/loss):
        </p>
        <EqBlock label="37">{String.raw`\mathbf S_{\text{tot}}=\mathbf E\times\mathbf H=\sqrt{\frac{\varepsilon_0}{\mu_0}}\,(\mathbf E_R+\mathbf E_I)\times(\mathbf H_R+\mathbf H_I).`}</EqBlock>
        <p>
          The retarded radiated far fields, with wavenumber <Tex>{String.raw`K=\omega/c`}</Tex> and the transverse
          projection giving the dipole pattern:
        </p>
        <EqBlock label="40">{String.raw`\mathbf E_R=\frac{K^2 p_0}{4\pi\varepsilon_0}\,\hat{\boldsymbol\kappa}\times(\hat{\boldsymbol\kappa}\times\hat z)\,\frac{1}{R}\cos(\omega t-KR+\phi),`}</EqBlock>
        <EqBlock label="41">{String.raw`\mathbf H_R=\sqrt{\frac{\varepsilon_0}{\mu_0}}\,\frac{K^2 p_0}{4\pi\varepsilon_0}\,(\hat{\boldsymbol\kappa}\times\hat z)\,\frac{1}{R}\cos(\omega t-KR+\phi).`}</EqBlock>
        <p>
          A product-to-sum trigonometric identity collapses the cross-term phase factors:
        </p>
        <EqBlock label="42">{String.raw`\cos\theta_1\cos\theta_2=\tfrac12\cos(\theta_1-\theta_2)+\tfrac12\cos(\theta_1+\theta_2).`}</EqBlock>
        <p>
          A vector triple-product identity then projects the dipole fields onto the incident-beam direction for the
          cross terms:
        </p>
        <EqBlock>{String.raw`\hat{\boldsymbol\kappa}\times(\hat{\boldsymbol\kappa}\times\hat z)=\hat{\boldsymbol\kappa}\,(\hat{\boldsymbol\kappa}\cdot\hat z)-\hat z.`}</EqBlock>
        <p>
          Keeping only the in-phase, forward-projected component gives the interference (cross-section) part of the
          Poynting vector — the energy the dipole adds to or removes from the beam (shown schematically, separating the
          incident self-term from the interference term):
        </p>
        <EqBlock label="43">{String.raw`\mathbf S_{xs}=\tfrac12\sqrt{\frac{\varepsilon_0}{\mu_0}}E_I^2\,\hat z+\tfrac12\sqrt{\frac{\varepsilon_0}{\mu_0}}\big[(\hat{\boldsymbol\kappa}\cdot\hat z)\hat{\boldsymbol\kappa}-\hat z\big]\cdot\hat x\,E_I\left(\frac{K^2 p_0}{4\pi\varepsilon_0 R}\right)\cos(KR-Kz-\phi).`}</EqBlock>
        <p>
          Written with the relative phase made explicit, the dipole&rsquo;s contribution rides on the incident beam with
          a definite phase offset:
        </p>
        <EqBlock label="45">{String.raw`\mathbf S_{xs}=\tfrac12\sqrt{\frac{\varepsilon_0}{\mu_0}}\,\hat z\Big[E_I^2+2\Big(\frac{K^2 p_0 E_I}{4\pi\varepsilon_0 R}\Big)\cos\big(KR-Kz+\phi\big)\Big].`}</EqBlock>
        <p>
          On resonance the phase difference becomes <Tex>{String.raw`\pm\pi/2`}</Tex>, and the dipole term either adds
          (<Tex>{String.raw`+`}</Tex>, emission) or subtracts (<Tex>{String.raw`-`}</Tex>, absorption) — registering gain
          or loss of the incident beam, collinear and in phase with it:
        </p>
        <KeyResult
          number="46"
          eq={String.raw`\mathbf S_{xs}=\tfrac12\sqrt{\frac{\varepsilon_0}{\mu_0}}\Big[E_I^2\pm\Big(\frac{K^2 p_0 E_I}{4\pi\varepsilon_0 R}\Big)\Big]\cos(KR-Kz).`}
          label="Gain (+) or loss (−) of the incident beam"
          note="The in-phase, co-directional, co-frequency character of stimulated radiation, made explicit in the energy flux."
        />

        <Figure
          caption={
            <>
              Fig.&nbsp;3-6 (schematic). A harmonic (parabolic) potential has a frequency independent of amplitude and
              cannot be inverted; a <em>soft</em> anharmonic potential lowers its resonant frequency as amplitude grows.
              The amplitude-dependent frequency is what lets an amplifying medium sort emitting from absorbing dipoles —
              the Duffing problem.
            </>
          }
        >
          <svg viewBox="0 0 420 200" width="100%" role="img" aria-label="Harmonic vs anharmonic potential">
            {/* harmonic */}
            <path d="M30,180 Q105,-20 180,180" fill="none" stroke="#4f46e5" strokeWidth="2.5" />
            <text x="105" y="196" textAnchor="middle" fontSize="11" fill="#5b6473">
              harmonic (stiff)
            </text>
            {/* anharmonic soft: wider, flatter walls */}
            <path d="M240,180 Q330,60 420,150" fill="none" stroke="#e11d48" strokeWidth="2.5" />
            <path d="M240,180 Q150,60 60,150" fill="none" stroke="#e11d48" strokeWidth="2.5" opacity="0" />
            <path d="M330,180 Q330,60 240,150" fill="none" stroke="#e11d48" strokeWidth="0" />
            <path d="M255,180 Q330,40 405,180" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="6 4" />
            <text x="330" y="196" textAnchor="middle" fontSize="11" fill="#5b6473">
              soft anharmonic
            </text>
            <line x1="210" y1="20" x2="210" y2="180" stroke="#e2e8f0" strokeWidth="1.5" />
          </svg>
        </Figure>

        <Derivation title="Interference flux, and why gain needs anharmonicity">
          <Step title="Add incident and radiated fields">
            Write the total field as incident (<Tex>{String.raw`I`}</Tex>) plus dipole-radiated (
            <Tex>{String.raw`R`}</Tex>) (Eqs.&nbsp;37, 40, 41). The Poynting vector then has self-terms (incident beam,
            dipole doughnut) plus cross terms{" "}
            <Tex>{String.raw`\mathbf E_R\times\mathbf H_I+\mathbf E_I\times\mathbf H_R`}</Tex>.
          </Step>
          <Step title="Project onto the beam direction">
            Use the vector triple-product identity to project the radiated fields onto the beam direction, with the
            trigonometric identity (Eq.&nbsp;42) collapsing the phase factors. Only the in-phase, forward-projected
            component exchanges net energy with the beam (Eq.&nbsp;43).
          </Step>
          <Step title="Evaluate on resonance">
            On resonance the relative phase is <Tex>{String.raw`\pm\pi/2`}</Tex> (Eqs.&nbsp;45&ndash;46). The cross term
            adds to <Tex>{String.raw`E_I^2`}</Tex> (gain) or subtracts (loss), collinearly and in phase — proving the
            in-phase, co-directional, co-frequency character of stimulated radiation.
          </Step>
          <Step title="Note the harmonic limitation → Duffing">
            A harmonic oscillator cannot remain net-emitting (cannot be inverted). Soft (anharmonic) springs whose
            frequency drops with amplitude can sustain gain: an amplifying medium pulls emitting dipoles toward lower
            frequency, absorbing dipoles toward higher, with an optimum interaction time (Fig.&nbsp;3-7,{" "}
            <Tex>{String.raw`\omega t\sim 900`}</Tex>). This is the Duffing problem / classical maser of Lamb (1965) and
            Borenstein &amp; Lamb (1972).
          </Step>
        </Derivation>

        <Callout kind="insight" title="Three hallmarks of stimulated emission">
          Same <strong>frequency</strong>, same <strong>direction</strong>, same <strong>phase</strong> as the incident
          field. The interference cross term in the Poynting vector is what physically realizes
          &ldquo;amplification&rdquo; of the beam.
        </Callout>

        <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginTop: "1.5rem" }}>
          Worked extensions (Problems 3-3 through 3-7)
        </h3>
        <p>
          The Problems are pedagogically central. Drive the oscillator with a <em>spectrum</em> of frequencies (Problem
          3-3):
        </p>
        <EqBlock label="47">{String.raw`\ddot x(t)+\omega_0^2 x(t)=\frac{e}{m}\sum_j E_j\cos(\nu_j t+\phi_j),`}</EqBlock>
        <EqBlock label="48">{String.raw`x(t)=\frac{e}{m}\sum_j E_j\left[\frac{\cos(\nu_j t+\phi_j)}{\omega_0^2-\nu_j^2}-\frac{\cos(\omega_0 t+\phi_j)}{2\omega_0(\omega_0-\nu_j)}-\frac{\cos(\omega_0 t-\phi_j)}{2\omega_0(\omega_0+\nu_j)}\right]+x_0\cos(\omega_0 t+\phi).`}</EqBlock>
        <p>
          The radiated power of the driven dipole versus drive frequency is a Lorentzian; frequency-integrating it
          yields the classical Einstein <Tex>{String.raw`B`}</Tex> coefficient and the scattering cross-section (Problem
          3-4):
        </p>
        <KeyResult
          number="49"
          eq={String.raw`\oint\mathbf S\cdot d\mathbf a=\frac{\pi}{3}\,r_0^2\sqrt{\frac{\varepsilon_0}{\mu_0}}\,E_0^2\,\frac{\nu^2}{(\omega-\nu)^2+\Gamma^2},`}
          label="Driven radiated power → classical Einstein B"
        />
        <EqBlock label="50">{String.raw`\sigma_{\text{abs}}=\frac{\text{energy/second scattered}}{\text{energy/second}\times\text{area incident}}.`}</EqBlock>
        <p>
          Problems 3-5 and 3-6 establish the normalized Lorentzian and Gaussian (Doppler-type) lineshapes, with HWHM{" "}
          <Tex>{String.raw`\gamma`}</Tex> and normalization constant <Tex>{String.raw`\mathcal N`}</Tex>:
        </p>
        <EqBlock label="51">{String.raw`I(\nu)=\frac{\gamma^2}{(\omega-\nu)^2+\gamma^2},`}</EqBlock>
        <EqBlock label="52">{String.raw`I(\nu)=\exp\!\big[-(\omega-\nu)^2/\gamma^2\big],`}</EqBlock>
        <EqBlock label="53">{String.raw`\mathcal N\int_{-\infty}^{\infty}d\nu\,I(\nu)=1.`}</EqBlock>
        <p>
          Finally, Problem 3-7 combines a Gaussian spread of resonance frequencies (inhomogeneous broadening) with the
          Rabi-flopping dipole. The distribution and the resulting ensemble-averaged macroscopic polarization are:
        </p>
        <EqBlock label="53b">{String.raw`W(\omega)=(\sqrt{\pi}\,\Delta\omega)^{-1}\exp\!\big[-(\omega-\omega_0)^2/(\Delta\omega)^2\big],`}</EqBlock>
        <KeyResult
          number="54"
          eq={String.raw`P(t)=\int_{-\infty}^{\infty}d\omega\,W(\omega)\,\wp\,C_a C_b^*\,e^{-i\omega t}+\text{c.c.}=-\sqrt{\pi}\,\wp\left(\frac{\wp E_0}{\hbar\,\Delta\omega}\right)J_0\!\left(\frac{\wp E_0 t}{\hbar}\right)\sin\nu t.`}
          label="Inhomogeneous Rabi polarization (J₀-Bessel envelope)"
          note={
            <>
              A zeroth-order Bessel function <Tex>{String.raw`J_0(\wp E_0 t/\hbar)`}</Tex> modulates the optical
              oscillation — the dephasing of Rabi flopping across the inhomogeneous distribution. This couples
              Chapter&nbsp;II&rsquo;s Rabi physics to this chapter&rsquo;s dipole and forward to macroscopic
              polarization.
            </>
          }
        />

        <Callout kind="history" title="Why anharmonicity matters">
          A pure spring cannot be population-inverted; sustained gain requires soft (anharmonic) springs. The Duffing
          problem — the classical maser of Lamb (1965) and Borenstein &amp; Lamb (1972) — is where maximum gain occurs
          at an optimal interaction time (Fig.&nbsp;3-7, <Tex>{String.raw`\omega t\sim 900`}</Tex>).
        </Callout>
        <Callout kind="note" title="The Problems are part of the spec">
          Eqs.&nbsp;(47)&ndash;(54) live in the Problems but are central: classical Einstein{" "}
          <Tex>{String.raw`B`}</Tex> (49), the normalized Lorentzian/Gaussian (51&ndash;53), and the{" "}
          <Tex>{String.raw`J_0`}</Tex>-Bessel inhomogeneous polarization (54). Treat them as worked extensions, not
          optional.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from Chapter III">
          <ul>
            <li>
              <strong>Stimulated emission vs. absorption is a phase relationship</strong> (Eqs.&nbsp;34&ndash;35): the
              sign of <Tex>{String.raw`-\tfrac12 eE_0\omega_0 x_0\sin[(\omega_0-\nu)t+\phi-\phi_0]`}</Tex> decides gain vs.
              loss. This sign-of-the-phase idea returns in the semiclassical gain medium and the laser threshold
              condition.
            </li>
            <li>
              <strong>A two-level atom in superposition is a real oscillating dipole</strong> (Eqs.&nbsp;5, 9):{" "}
              <Tex>{String.raw`\langle e\mathbf r\rangle=\boldsymbol{\wp}C_a C_b^* e^{-i\omega t}+\text{c.c.}`}</Tex> is
              the <em>source</em> term that goes into Maxwell&rsquo;s equations in the semiclassical theory
              (Chapters&nbsp;VIII&ndash;XIII); the macroscopic polarization <Tex>{String.raw`P`}</Tex> is built from it.
            </li>
            <li>
              <strong>The Lorentzian lineshape</strong>{" "}
              <Tex>{String.raw`|E(\nu)|^2=E_r^2/[\Gamma^2+(\omega_0-\nu)^2]`}</Tex> (Eq.&nbsp;27), HWHM{" "}
              <Tex>{String.raw`=\Gamma`}</Tex>, FWHM <Tex>{String.raw`=2\Gamma`}</Tex>, is the universal radiative
              lineshape. Lifetime <Tex>{String.raw`1/\Gamma`}</Tex> <Tex>{String.raw`\leftrightarrow`}</Tex> linewidth
              recurs for natural, collision, and (with the Gaussian, Eq.&nbsp;52) Doppler broadening.
            </li>
            <li>
              <strong>The rotating-wave approximation</strong> (drop the{" "}
              <Tex>{String.raw`\omega_0+\nu`}</Tex> anti-resonant term near resonance, Eq.&nbsp;26) is a standard tool
              throughout the book.
            </li>
            <li>
              <strong>Three hallmarks of stimulated radiation</strong>: same frequency, same direction, same phase
              (Eqs.&nbsp;43&ndash;46). This collinear, phase-coherent character is what makes a cavity amplifier — a
              laser — possible.
            </li>
            <li>
              <strong>A harmonic oscillator cannot be inverted</strong>; sustained gain requires anharmonic (soft-spring)
              dynamics — the Duffing problem / classical maser of Lamb (1965) and Borenstein &amp; Lamb (1972). Real
              population inversion and pumping are needed for net amplification.
            </li>
            <li>
              <strong>Classical Einstein <Tex>{String.raw`B`}</Tex> and scattering cross-section</strong> follow from
              frequency-integrating the driven-dipole radiated power (Problems 3-3, 3-4; Eqs.&nbsp;47&ndash;50),
              connecting the oscillator model to rate-equation treatments.
            </li>
            <li>
              <strong>Inhomogeneous broadening + Rabi flopping</strong> gives a{" "}
              <Tex>{String.raw`J_0`}</Tex>-Bessel-modulated polarization (Eq.&nbsp;54) — the ensemble dephasing of Rabi
              oscillations, bridging Chapter&nbsp;II to macroscopic polarization.
            </li>
            <li>
              <strong>Single dipole vs. ensemble</strong>: a single classical dipole has a definite phase; the quantum
              expectation is an ensemble average. Net macroscopic emission needs many dipoles in the emitting phase —
              the conceptual seed of population inversion.
            </li>
            <li>
              <strong>Classical scales</strong>: <Tex>{String.raw`r_0=e^2/(4\pi\varepsilon_0 m c^2)=2.8\times10^{-15}`}</Tex>{" "}
              m and <Tex>{String.raw`\Gamma=\tfrac13 r_0\omega_0^2/c`}</Tex> (Eqs.&nbsp;21&ndash;22); the classical
              spontaneous-emission estimate differs considerably from the true quantum rate (Chapter&nbsp;XIV).
            </li>
          </ul>
          Next, Chapter&nbsp;IV gives this dipole a self-sustaining face — the Van der Pol oscillator — and the
          density-matrix machinery of Chapter&nbsp;VII tracks populations <em>and</em> coherences together.
        </Callout>
      </Section>
    </Lesson>
  );
}
