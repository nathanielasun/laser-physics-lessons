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
import Ch05Sim from "@/components/sims/ch05";

export default function Page() {
  return (
    <Lesson slug="ch05">
      <Lede>
        Six years before the optical laser, Gordon, Zeiger, and Townes (1954) built the first device to amplify
        radiation by stimulated emission. Its &ldquo;atom&rdquo; is the nitrogen of an ammonia molecule tunnelling
        through the plane of three hydrogens — a clean two-level system split by just <Tex>{String.raw`23.87`}</Tex>{" "}
        GHz. The maser solves the two hardest problems of any laser with strikingly physical machinery: it makes a{" "}
        <strong>population inversion</strong> by sorting molecules in space with a shaped electric field, and it reaches
        a steady state where <strong>gain exactly balances loss</strong> inside a microwave cavity. A two-level system,
        an inversion mechanism, a resonant cavity, a gain&nbsp;=&nbsp;loss fixed point: this chapter is the laser in
        miniature — the exact template the rest of the book builds on.
      </Lede>

      <Section title="The ammonia molecule: a tunnelling two-level system">
        <Intuition>
          Ammonia <Tex>{String.raw`\mathrm{NH_3}`}</Tex> is a pyramid: three hydrogens form a triangular base and the
          nitrogen sits at the apex, a third of an &Aring;ngstr&ouml;m above their plane. But the nitrogen can sit{" "}
          <em>either</em> above <em>or</em> below the plane — two mirror-image shapes separated by an energy barrier
          (the cost of squeezing N through the H-triangle). Quantum-mechanically the nitrogen <strong>tunnels</strong>{" "}
          back and forth. Collapse the molecule&rsquo;s many coordinates down to one — the nitrogen&rsquo;s position{" "}
          <Tex>{String.raw`x`}</Tex> along the symmetry axis — and you have a particle in a symmetric{" "}
          <strong>double well</strong>. Its two lowest states are not &ldquo;left&rdquo; and &ldquo;right&rdquo; (those
          aren&rsquo;t energy eigenstates) but the <em>symmetric</em> and <em>antisymmetric</em> combinations of the two
          localized humps. The tiny gap between them — &ldquo;inversion doubling&rdquo; — is the entire maser
          transition.
        </Intuition>

        <p>
          Everything starts from the one-dimensional, time-independent Schr&ouml;dinger equation for that effective
          coordinate, with an effective mass <Tex>{String.raw`m`}</Tex> and a double-well potential{" "}
          <Tex>{String.raw`V(x)`}</Tex> symmetric under <Tex>{String.raw`x\to-x`}</Tex>:
        </p>
        <KeyResult
          number="1"
          eq={String.raw`\frac{d^2}{dx^2}\,u(x) = \frac{2m}{\hbar^2}\,[\,V(x) - \hbar\omega\,]\,u(x)`}
          label="Schrödinger equation (1D effective coordinate)"
          note={
            <>
              The energy eigenvalue is written <Tex>{String.raw`E=\hbar\omega`}</Tex>. Where{" "}
              <Tex>{String.raw`E<V`}</Tex> (inside the barrier) the curvature <Tex>{String.raw`u''/u`}</Tex> is
              positive, so <Tex>{String.raw`u`}</Tex> decays exponentially; where <Tex>{String.raw`E>V`}</Tex> (in the
              wells) it oscillates.
            </>
          }
        />

        <Figure
          caption={
            <>
              The symmetric double well <Tex>{String.raw`V(x)`}</Tex>. The lower (even) state{" "}
              <Tex>{String.raw`u_s`}</Tex> has no node in the barrier; the upper (odd) state{" "}
              <Tex>{String.raw`u_a`}</Tex> has a node at <Tex>{String.raw`x=0`}</Tex>, forcing slightly larger
              curvature and a slightly higher energy. Their gap is the <Tex>{String.raw`23.87`}</Tex> GHz inversion
              line.
            </>
          }
        >
          <svg viewBox="0 0 520 260" style={{ width: "100%", maxWidth: 520 }}>
            {/* axes */}
            <line x1="40" y1="230" x2="490" y2="230" stroke="#9aa3b2" strokeWidth="1.2" />
            <line x1="40" y1="20" x2="40" y2="230" stroke="#9aa3b2" strokeWidth="1.2" />
            <text x="495" y="234" fontSize="12" fill="#5b6473">x</text>
            <text x="20" y="22" fontSize="12" fill="#5b6473">V</text>
            {/* double-well potential: two minima with a central hump */}
            <path
              d="M 70 60 C 130 250, 180 250, 265 120 C 350 250, 400 250, 460 60"
              fill="none"
              stroke="#334155"
              strokeWidth="2.4"
            />
            {/* symmetric (lower) level + wavefunction: two in-phase humps */}
            <line x1="95" y1="200" x2="435" y2="200" stroke="#4f46e5" strokeWidth="1.4" strokeDasharray="5 4" />
            <text x="442" y="204" fontSize="12" fill="#4f46e5">u_s</text>
            <path
              d="M 120 200 C 150 160, 180 160, 200 200 C 230 200, 250 200, 265 200 C 280 200, 300 200, 330 200 C 350 160, 380 160, 410 200"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2"
            />
            {/* antisymmetric (upper) level: humps of opposite sign, node at center */}
            <line x1="95" y1="120" x2="435" y2="120" stroke="#e11d48" strokeWidth="1.4" strokeDasharray="5 4" />
            <text x="442" y="124" fontSize="12" fill="#e11d48">u_a</text>
            <path
              d="M 120 120 C 150 84, 180 84, 200 120 C 230 120, 250 120, 265 120 C 280 120, 300 120, 330 120 C 350 156, 380 156, 410 120"
              fill="none"
              stroke="#e11d48"
              strokeWidth="2"
            />
            {/* gap annotation */}
            <line x1="450" y1="120" x2="450" y2="200" stroke="#64748b" strokeWidth="1" />
            <text x="456" y="165" fontSize="11" fill="#475569">ℏω₀</text>
            {/* well labels */}
            <text x="150" y="248" fontSize="11" fill="#5b6473">left well</text>
            <text x="350" y="248" fontSize="11" fill="#5b6473">right well</text>
            <text x="245" y="100" fontSize="11" fill="#5b6473">barrier</text>
          </svg>
        </Figure>

        <p>
          Because <Tex>{String.raw`V`}</Tex> is symmetric, the eigenstates have definite parity. The two lowest are the
          in-phase and out-of-phase combinations of the left- and right-localized humps{" "}
          <Tex>{String.raw`\psi_L,\psi_R`}</Tex>:
        </p>
        <EqBlock label="2">{String.raw`u_s(x) = 2^{-1/2}\,[\,\psi_L(x) + \psi_R(x)\,]`}</EqBlock>
        <EqBlock label="3">{String.raw`u_a(x) = 2^{-1/2}\,[\,\psi_L(x) - \psi_R(x)\,]`}</EqBlock>
        <p>
          The symmetric <Tex>{String.raw`u_s`}</Tex> is the <em>lower</em> member; the antisymmetric{" "}
          <Tex>{String.raw`u_a`}</Tex>, with its extra node, is the <em>upper</em>. Their energy gap defines the
          inversion-doubling frequency <Tex>{String.raw`\hbar\omega_0 = \hbar(\omega_a-\omega_s)`}</Tex>.
        </p>

        <Derivation title="From a 3-D molecule to a 1-D doublet">
          <Step title="Reduce the molecule to one coordinate">
            Integrate out (heuristically &ldquo;eyeball&rdquo;) every vibrational and rotational degree of freedom
            except the nitrogen&rsquo;s displacement <Tex>{String.raw`x`}</Tex> along the{" "}
            <Tex>{String.raw`C_3`}</Tex> symmetry axis. What is left is the single-coordinate Schr&ouml;dinger equation,
            Eq.&nbsp;(1), with an effective mass and a symmetric double-well <Tex>{String.raw`V(x)`}</Tex> whose barrier
            tops the two lowest energies.
          </Step>
          <Step title="Classify solutions by curvature">
            Inside the barrier <Tex>{String.raw`E<V`}</Tex>, so by Eq.&nbsp;(1) <Tex>{String.raw`u''`}</Tex> and{" "}
            <Tex>{String.raw`u`}</Tex> share a sign: a positive <Tex>{String.raw`u`}</Tex> is concave up and decays
            exponentially across the barrier. In the wells <Tex>{String.raw`E>V`}</Tex> and{" "}
            <Tex>{String.raw`u`}</Tex> oscillates. Matching exponential tails to oscillatory well solutions quantizes
            the energies and selects the bound doublet.
          </Step>
          <Step title="Build the parity eigenstates">
            Symmetry of <Tex>{String.raw`V`}</Tex> forces definite parity. The lowest is even —{" "}
            <Tex>{String.raw`u_s`}</Tex>, Eq.&nbsp;(2), no node in the barrier; the next is odd —{" "}
            <Tex>{String.raw`u_a`}</Tex>, Eq.&nbsp;(3), with a node at <Tex>{String.raw`x=0`}</Tex>. The odd
            state&rsquo;s extra node forces slightly larger curvature, so <Tex>{String.raw`\omega_a>\omega_s`}</Tex>.
            Their difference is <Tex>{String.raw`\omega_0`}</Tex>.
          </Step>
          <Step title="Pendulum analogy (the intuition to keep)">
            Two weakly-coupled identical pendulums (here labelled <Tex>{String.raw`\psi_1,\psi_2`}</Tex>) have normal
            modes that are the in-phase (symmetric) and out-of-phase (antisymmetric) swings. The out-of-phase mode
            stretches the coupling spring more, raising its frequency — exactly why <Tex>{String.raw`u_a`}</Tex> lies
            above <Tex>{String.raw`u_s`}</Tex>. Lowering the barrier (stronger coupling) widens the splitting.
          </Step>
        </Derivation>

        <Callout kind="note" title="NH₃ dimensions">
          <Tex>{String.raw`\mathrm{N}\!-\!\mathrm{H}`}</Tex> bond <Tex>{String.raw`d=1.014`}</Tex>{" "}
          &Aring;, the <Tex>{String.raw`\mathrm{H}\!-\!\mathrm{N}\!-\!\mathrm{H}`}</Tex> angle is{" "}
          <Tex>{String.raw`67^\circ 58'`}</Tex>, and the nitrogen sits <Tex>{String.raw`0.36`}</Tex> &Aring; above the
          H-plane. The inversion barrier is the energy needed to push N through the H-triangle.
        </Callout>
        <Callout kind="insight" title="The maser line">
          The inversion splitting is <Tex>{String.raw`23{,}870\ \mathrm{MHz}\approx 23.87\ \mathrm{GHz}`}</Tex>,
          wavelength <Tex>{String.raw`\sim 1.25\ \mathrm{cm}`}</Tex> — far larger than the molecule itself, hence a
          clean, isolated microwave two-level transition.
        </Callout>
      </Section>

      <Section title="The two-level wavepacket: why an eigenstate has no dipole">
        <Intuition>
          Keep only the doublet <Tex>{String.raw`(u_s,u_a)`}</Tex>. A single energy eigenstate is a standing
          probability cloud, symmetric about <Tex>{String.raw`x=0`}</Tex>, so the charge sits on average{" "}
          <em>on</em> the axis: <strong>no permanent dipole</strong>. But a <em>superposition</em> of{" "}
          <Tex>{String.raw`u_s`}</Tex> and <Tex>{String.raw`u_a`}</Tex> is lopsided — the probability piles up on one
          side, then sloshes to the other, oscillating at exactly the doublet frequency{" "}
          <Tex>{String.raw`\omega_0=\omega_a-\omega_s`}</Tex>. That sloshing of charge is the molecule&rsquo;s
          oscillating dipole — its antenna. Since neither level alone radiates, you must drive the molecule with a
          resonant field to get a transition dipole. This is the microscopic reason the maser needs a cavity.
        </Intuition>

        <p>The most general two-level state is a coherent superposition of the upper and lower inversion states:</p>
        <KeyResult
          number="4"
          eq={String.raw`\psi(x,t) = C_a(t)\,u_a(x)\,e^{-i\omega_a t} + C_s(t)\,u_s(x)\,e^{-i\omega_s t}`}
          label="Two-level superposition"
          note={
            <>
              All maser dynamics live in how the field drives the complex amplitudes{" "}
              <Tex>{String.raw`C_a\leftrightarrow C_s`}</Tex>.
            </>
          }
        />
        <p>
          To display the dipole oscillation most vividly, take an equal, real <Tex>{String.raw`50/50`}</Tex> mix
          (discarding an overall phase and normalizing):
        </p>
        <EqBlock label="5">{String.raw`C_a = C_s = 2^{-1/2}`}</EqBlock>
        <EqBlock label="6">{String.raw`\psi(x,t) = 2^{-1/2}\big[\,u_s(x)\,e^{-i\omega_s t} + u_a(x)\,e^{-i\omega_a t}\,\big]`}</EqBlock>
        <p>
          At <Tex>{String.raw`t=0`}</Tex> the two pieces add in phase and the nitrogen is localized in the{" "}
          <em>right</em> well; half a period later they are out of phase and it sits in the <em>left</em> well — the
          probability has sloshed all the way across:
        </p>
        <EqBlock label="7">{String.raw`\psi(x,0) = \psi_R(x) = 2^{-1/2}\,[\,u_s + u_a\,]`}</EqBlock>
        <EqBlock label="8">{String.raw`\psi\!\left(x,\tfrac{\pi}{\omega_0}\right) = -\,\psi_L(x) = -2^{-1/2}\,[\,u_s - u_a\,]`}</EqBlock>
        <p>
          A &ldquo;left&rdquo; or &ldquo;right&rdquo; localized state is therefore just a snapshot of the
          superposition, not a stationary state. The charge oscillates at <Tex>{String.raw`\omega_0`}</Tex> — the
          source of the molecule&rsquo;s microwave dipole radiation.
        </p>

        <Derivation title="The sloshing dipole, and why an eigenstate is dead">
          <Step title="The interference term carries the oscillation">
            Form <Tex>{String.raw`|\psi(x,t)|^2`}</Tex> from Eq.&nbsp;(6). The cross term between{" "}
            <Tex>{String.raw`u_s`}</Tex> and <Tex>{String.raw`u_a`}</Tex> carries the factor{" "}
            <Tex>{String.raw`\cos[(\omega_a-\omega_s)t]=\cos(\omega_0 t)`}</Tex>. Since{" "}
            <Tex>{String.raw`u_s`}</Tex> is even and <Tex>{String.raw`u_a`}</Tex> is odd, that cross term is an{" "}
            <em>odd</em> function of <Tex>{String.raw`x`}</Tex>: it pushes the probability to one side at{" "}
            <Tex>{String.raw`t=0`}</Tex> and the other at <Tex>{String.raw`t=\pi/\omega_0`}</Tex>. Hence{" "}
            <Tex>{String.raw`\langle x\rangle`}</Tex>, and the dipole, oscillate at <Tex>{String.raw`\omega_0`}</Tex>.
          </Step>
          <Step title="A single eigenstate has no permanent dipole">
            Set <Tex>{String.raw`C_a=0`}</Tex> or <Tex>{String.raw`C_s=0`}</Tex>: the cross term vanishes,{" "}
            <Tex>{String.raw`|u|^2`}</Tex> is even in <Tex>{String.raw`x`}</Tex>, and{" "}
            <Tex>{String.raw`\langle x\rangle=0`}</Tex>. Only the superposition radiates. So the levels must be coupled
            by an oscillating field to drive transitions and extract energy — which is precisely why the inverted beam
            is sent through a microwave cavity (the Chapters&nbsp;II–III machinery now applies).
          </Step>
        </Derivation>

        <Callout kind="insight" title="No static dipole — only a transition dipole">
          The maser molecule behaves like a charge oscillating at <Tex>{String.raw`\omega_0`}</Tex>{" "}
          <em>only</em> in a superposition. This is the same dipole matrix element <Tex>{String.raw`\wp`}</Tex> that
          couples to the cavity field and reappears in every Rabi-flopping and gain expression below.
        </Callout>
      </Section>

      <Section title="State selection: the electrostatic focuser creates the inversion">
        <Intuition>
          In a thermal beam the two inversion levels are populated almost equally — the{" "}
          <Tex>{String.raw`23.87`}</Tex> GHz gap is minuscule next to <Tex>{String.raw`k_BT`}</Tex> at room
          temperature — so a raw beam carries <em>no</em> useful inversion. The maser manufactures it mechanically. A
          static electric field Stark-shifts the doublet in <strong>opposite directions</strong>: the upper level rises,
          the lower falls. Shape a field that grows with off-axis distance, and the upper-state molecule sits in a{" "}
          <em>potential well</em> (a spring pulling it toward the axis) while the lower-state molecule sits on a{" "}
          <em>potential hill</em> (flung outward). The focuser is literally a lens for upper-state molecules and an
          anti-lens for lower-state molecules. The beam entering the cavity is then almost pure upper state: inversion
          by spatial sorting, not pumping.
        </Intuition>

        <p>First, why a thermal beam is useless — the Boltzmann ratio of the two populations:</p>
        <KeyResult
          number="8a"
          eq={String.raw`\frac{P_a}{P_s} = \exp\!\big[-\hbar(\omega_a-\omega_s)/k_B T\big]`}
          label="Thermal (Boltzmann) population ratio"
          note={
            <>
              For <Tex>{String.raw`\omega_a-\omega_s = 23.87`}</Tex> GHz and <Tex>{String.raw`T=300`}</Tex> K this is
              essentially <Tex>{String.raw`1`}</Tex> (different by about a part in <Tex>{String.raw`10^4`}</Tex>): no
              net inversion, which is exactly why the focuser is required.
            </>
          }
        />

        <p>
          Now turn on a static field. In the <Tex>{String.raw`\{u_a,u_s\}`}</Tex> basis the field adds an off-diagonal
          dipole coupling <Tex>{String.raw`\wp E`}</Tex> between the two states:
        </p>
        <EqBlock label="25">{String.raw`\mathscr{H} = \begin{pmatrix} \hbar\omega_a & \wp E \\ \wp E & \hbar\omega_s \end{pmatrix}`}</EqBlock>
        <p>The new (field-shifted) energies are the eigenvalues — the roots of the secular determinant:</p>
        <EqBlock label="26–27">{String.raw`\det(\mathscr{H} - \lambda\,\mathscr{I}) = 0`}</EqBlock>
        <p>
          For a weak field <Tex>{String.raw`(\wp E \ll \hbar\omega_0)`}</Tex> the quadratic roots become the
          quadratic-Stark eigenvalues — equal and <em>opposite</em> shifts:
        </p>
        <KeyResult
          number="9"
          eq={String.raw`\hbar\omega_a' = \hbar\omega_a + \frac{\wp^2 E^2(r)}{\hbar\omega_0}`}
          label="Upper-level Stark eigenvalue (shifts UP)"
        />
        <KeyResult
          number="10"
          eq={String.raw`\hbar\omega_s' = \hbar\omega_s - \frac{\wp^2 E^2(r)}{\hbar\omega_0}`}
          label="Lower-level Stark eigenvalue (shifts DOWN)"
          note="The opposite sign relative to Eq. (9) is the entire basis of state selection."
        />
        <p>The corresponding eigenfunctions are mostly one parity with a small admixture of the other:</p>
        <EqBlock label="11">{String.raw`u_a'(x) = Z^{-1/2}\left[\,u_a(x) + \frac{\wp E}{\hbar\omega_0}\,u_s(x)\,\right]`}</EqBlock>
        <EqBlock label="12">{String.raw`u_s'(x) = Z^{-1/2}\left[\,u_s(x) - \frac{\wp E}{\hbar\omega_0}\,u_a(x)\,\right]`}</EqBlock>
        <EqBlock label="13">{String.raw`Z = 1 + \left(\frac{\wp E}{\hbar\omega_0}\right)^2`}</EqBlock>

        <p>
          The focuser is built so its field magnitude grows linearly off axis, which makes{" "}
          <Tex>{String.raw`E^2`}</Tex> — and hence the Stark energy — quadratic in <Tex>{String.raw`r`}</Tex>:
        </p>
        <KeyResult
          number="14"
          eq={String.raw`E(r) = \Sigma\, r \qquad\Longrightarrow\qquad E^2(r)=\Sigma^2 r^2`}
          label="Focuser field profile"
          note={
            <>
              A parabolic energy well (upper state) or hill (lower state) in the transverse coordinate{" "}
              <Tex>{String.raw`r`}</Tex>.
            </>
          }
        />

        <p>
          Treat the Stark energy as a mechanical potential for the molecule&rsquo;s centre of mass. The radial force is
          minus its gradient — and with <Tex>{String.raw`E(r)=\Sigma r`}</Tex> it is <em>linear</em> in{" "}
          <Tex>{String.raw`r`}</Tex>:
        </p>
        <EqBlock label="15">{String.raw`F_r = -\frac{\partial}{\partial r}\,(\hbar\omega'_{a,s}) \approx \mp\,\frac{2\wp^2 \Sigma^2}{\hbar\omega_0}\,r \qquad (a=\text{upper},\; s=\text{lower})`}</EqBlock>

        <KeyResult
          number="16"
          eq={String.raw`m\,\ddot r = F_r = -k\,r, \qquad k = \frac{2\wp^2 \Sigma^2}{\hbar\omega_0}`}
          label="Equation of transverse motion"
          note={
            <>
              For the upper state <Tex>{String.raw`k>0`}</Tex> (a real spring → focusing); for the lower state the sign
              flips, <Tex>{String.raw`k<0`}</Tex> (an anti-spring → defocusing).
            </>
          }
        />

        <KeyResult
          number="17"
          eq={String.raw`r = r_0\cos\!\sqrt{k/m}\;t \ \ (\text{upper, focused}); \qquad r = r_0\cosh\!\sqrt{-k/m}\;t \ \ (\text{lower, defocused})`}
          label="Focused vs defocused trajectories"
          note={
            <>
              <Tex>{String.raw`\cos`}</Tex> vs <Tex>{String.raw`\cosh`}</Tex>: the bounded cosine guides upper-state
              molecules to the aperture; the runaway hyperbolic cosine throws lower-state molecules to the walls.
            </>
          }
        />

        <Figure
          caption={
            <>
              The focuser as a lens. Upper-state molecules feel a restoring spring{" "}
              <Tex>{String.raw`(k>0)`}</Tex> and execute bounded <Tex>{String.raw`\cos`}</Tex> trajectories that
              converge on the axis and pass through the cavity aperture. Lower-state molecules feel an anti-spring{" "}
              <Tex>{String.raw`(k<0)`}</Tex> and diverge as <Tex>{String.raw`\cosh`}</Tex>, slamming into the walls.
              Population inversion is produced in space.
            </>
          }
        >
          <svg viewBox="0 0 520 240" style={{ width: "100%", maxWidth: 520 }}>
            {/* axis of symmetry */}
            <line x1="30" y1="120" x2="470" y2="120" stroke="#9aa3b2" strokeWidth="1" strokeDasharray="4 4" />
            <text x="34" y="114" fontSize="11" fill="#5b6473">axis</text>
            {/* aperture into cavity on the right */}
            <rect x="470" y="98" width="10" height="44" fill="#e2e8f0" stroke="#94a3b8" />
            <text x="455" y="160" fontSize="11" fill="#475569">cavity</text>
            {/* focused (cos) trajectories — upper state, converge */}
            <path d="M 30 60 C 180 60, 320 100, 470 116" fill="none" stroke="#4f46e5" strokeWidth="2" />
            <path d="M 30 180 C 180 180, 320 140, 470 124" fill="none" stroke="#4f46e5" strokeWidth="2" />
            <path d="M 30 90 C 200 90, 330 112, 470 119" fill="none" stroke="#4f46e5" strokeWidth="1.6" />
            <path d="M 30 150 C 200 150, 330 128, 470 121" fill="none" stroke="#4f46e5" strokeWidth="1.6" />
            <text x="60" y="52" fontSize="12" fill="#4f46e5">upper state · cos · focused</text>
            {/* defocused (cosh) trajectories — lower state, diverge to walls */}
            <path d="M 30 110 C 180 108, 300 70, 430 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="6 4" />
            <path d="M 30 130 C 180 132, 300 170, 430 216" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="6 4" />
            <text x="250" y="214" fontSize="12" fill="#e11d48">lower state · cosh · defocused</text>
            {/* walls */}
            <line x1="30" y1="14" x2="430" y2="14" stroke="#cbd5e1" strokeWidth="3" />
            <line x1="30" y1="226" x2="430" y2="226" stroke="#cbd5e1" strokeWidth="3" />
          </svg>
        </Figure>

        <Derivation title="Diagonalize the Stark Hamiltonian, then turn energy into force">
          <Step title="Diagonalize the 2×2 Stark Hamiltonian">
            Write the matrix Eq.&nbsp;(25) in the <Tex>{String.raw`\{u_a,u_s\}`}</Tex> basis with off-diagonal{" "}
            <Tex>{String.raw`\wp E`}</Tex>, set <Tex>{String.raw`\det(\mathscr H-\lambda\mathscr I)=0`}</Tex>
            (Eqs.&nbsp;26–27). The roots are{" "}
            <Tex>{String.raw`\lambda = \tfrac{\hbar(\omega_a+\omega_s)}{2}\pm\sqrt{\big(\tfrac{\hbar\omega_0}{2}\big)^2+(\wp E)^2}`}</Tex>
            . Expanding for <Tex>{String.raw`\wp E\ll\hbar\omega_0`}</Tex> gives the quadratic-Stark eigenvalues
            Eqs.&nbsp;(9)–(10): the upper shifts up by{" "}
            <Tex>{String.raw`+\wp^2E^2/\hbar\omega_0`}</Tex>, the lower down by the same. The eigenvectors are
            Eqs.&nbsp;(11)–(13).
          </Step>
          <Step title="Turn energy-vs-field into a force">
            Treat the Stark energy <Tex>{String.raw`\hbar\omega'(r)`}</Tex> as a mechanical potential{" "}
            <Tex>{String.raw`U(r)`}</Tex> for the molecule drifting through the inhomogeneous focuser field. The force
            is <Tex>{String.raw`F_r=-dU/dr`}</Tex>. With <Tex>{String.raw`E(r)=\Sigma r`}</Tex> (Eq.&nbsp;14),{" "}
            <Tex>{String.raw`U\propto +\Sigma^2 r^2`}</Tex> for the upper state (a well) and{" "}
            <Tex>{String.raw`\propto -\Sigma^2 r^2`}</Tex> for the lower (a hill). Differentiating gives the linear
            force Eq.&nbsp;(15).
          </Step>
          <Step title="Recognize simple-harmonic vs hyperbolic motion">
            Insert <Tex>{String.raw`F_r`}</Tex> into Newton&rsquo;s law to get{" "}
            <Tex>{String.raw`m\ddot r=-kr`}</Tex> (Eq.&nbsp;16) with{" "}
            <Tex>{String.raw`k=2\wp^2\Sigma^2/\hbar\omega_0`}</Tex>. Upper state{" "}
            <Tex>{String.raw`k>0`}</Tex>: bounded cosine oscillation — focusing. Lower state effectively{" "}
            <Tex>{String.raw`k<0`}</Tex>: <Tex>{String.raw`\cosh`}</Tex> divergence — defocusing. Solving with{" "}
            <Tex>{String.raw`r(0)=r_0,\ \dot r(0)=0`}</Tex> yields Eq.&nbsp;(17). Upper-state molecules are funnelled to
            the aperture; lower-state molecules are removed — inversion at the cavity entrance.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Inversion without pumping">
          Unlike an optically pumped laser, the ammonia maser sorts molecules in <em>space</em> using the opposite-sign
          Stark shifts. The focuser is a lens for upper-state molecules and an anti-lens for lower-state molecules.
        </Callout>
        <Callout kind="warning" title="Watch the sign: cos vs cosh">
          Eq.&nbsp;(17): upper state <Tex>{String.raw`=\cos`}</Tex> (focused, bounded); lower state{" "}
          <Tex>{String.raw`=\cosh`}</Tex> (defocused, runaway). Mixing these up inverts the device&rsquo;s logic. The
          sign traces straight back to the <Tex>{String.raw`\pm`}</Tex> in the Stark eigenvalues Eqs.&nbsp;(9)–(10).
        </Callout>
      </Section>

      <Section title="Maser oscillation: gain equals loss and the cavity Q">
        <Intuition>
          The inverted beam streams into a microwave cavity tuned near <Tex>{String.raw`\omega_0`}</Tex>. Each
          molecule, prepared in the upper state, Rabi-flops against the cavity field and on average deposits energy into
          it — that is the <strong>gain</strong>. The cavity leaks (wall resistance, output coupling) — that is the{" "}
          <strong>loss</strong>, measured by the quality factor <Tex>{String.raw`Q`}</Tex>. Steady oscillation demands
          an exact balance: the power the beam pumps in equals the power the cavity dissipates. Setting (saturated)
          gain&nbsp;=&nbsp;loss fixes the operating field amplitude. This is the maser&rsquo;s version of the laser
          steady state.
        </Intuition>

        <KeyResult
          number="18"
          eq={String.raw`\text{saturated gain} = \text{loss}`}
          label="Oscillation (balance) condition"
          note="The cavity field grows until gain saturates down to exactly match the round-trip loss. This single statement fixes the output amplitude and underlies Fig. 5-5."
        />

        <p>The loss side. The cavity quality factor at operating frequency <Tex>{String.raw`\Omega`}</Tex> is</p>
        <KeyResult
          number="19"
          eq={String.raw`Q = \Omega\,\frac{\text{energy stored in field}}{\text{energy lost / second}}`}
          label="Cavity Q (definition)"
          note="High Q = low loss = easier oscillation and a larger field; it is the key knob of the tuning curves."
        />
        <p>The stored energy is the field energy integrated over the mode volume, which for a standing wave reduces to</p>
        <EqBlock label="20">{String.raw`\text{Energy stored} = \tfrac{1}{2}\int(\varepsilon_0 E^2 + \mu_0 H^2)\,dV = \tfrac{1}{4}\,\varepsilon_0 E_0^2 V`}</EqBlock>
        <p>so the power dissipated is <Tex>{String.raw`\Omega/Q`}</Tex> times the stored energy:</p>
        <KeyResult
          number="21"
          eq={String.raw`\text{Loss} = \frac{1}{Q}\,\Omega\,\tfrac{1}{4}\,\varepsilon_0 E_0^2 V`}
          label="Cavity loss rate"
          note="It grows with field amplitude squared and falls with Q."
        />

        <p>
          The gain side. With <Tex>{String.raw`N`}</Tex> molecules in the cavity, each spending the collision-free
          transit time <Tex>{String.raw`t_0=L/v`}</Tex> inside, the flux delivering energy is{" "}
          <Tex>{String.raw`N/t_0`}</Tex>; each upper-state molecule can give up to one quantum{" "}
          <Tex>{String.raw`\hbar\Omega`}</Tex>, weighted by the upper-state occupation{" "}
          <Tex>{String.raw`|C_a|^2`}</Tex> it carries out after Rabi flopping:
        </p>
        <KeyResult
          number="22"
          eq={String.raw`\text{saturated gain} = \frac{N\nu}{t_0}\,|C_a|^2\,\hbar\Omega`}
          label="Beam (saturated) gain"
          note={
            <>
              Equating this to the loss, Eq.&nbsp;(21), with <Tex>{String.raw`|C_a|^2`}</Tex> itself depending on{" "}
              <Tex>{String.raw`E_0`}</Tex>, fixes the operating amplitude.
            </>
          }
        />

        <Derivation title="Balance the books: gain = loss">
          <Step title="Quantify cavity loss via Q">
            From the <Tex>{String.raw`Q`}</Tex> definition Eq.&nbsp;(19), energy lost per second{" "}
            <Tex>{String.raw`=(\Omega/Q)\times`}</Tex> energy stored. Compute the stored energy by integrating the EM
            energy density (Eq.&nbsp;20), giving <Tex>{String.raw`\tfrac14\varepsilon_0 E_0^2 V`}</Tex>. Multiply by{" "}
            <Tex>{String.raw`\Omega/Q`}</Tex> to get the loss, Eq.&nbsp;(21).
          </Step>
          <Step title="Quantify beam gain via transit and Rabi occupation">
            <Tex>{String.raw`N`}</Tex> molecules occupy the cavity at once; each spends transit time{" "}
            <Tex>{String.raw`t_0=L/v`}</Tex>. The flux is <Tex>{String.raw`N/t_0=N v/L`}</Tex>. Each upper-state
            molecule can give up to one photon <Tex>{String.raw`\hbar\Omega`}</Tex>, but the fraction actually
            transferred is set by Rabi flopping during transit, encoded in <Tex>{String.raw`|C_a|^2`}</Tex>. Multiply
            flux × quantum × occupation to get the gain, Eq.&nbsp;(22).
          </Step>
          <Step title="Balance to fix the amplitude">
            Set Eq.&nbsp;(22) = Eq.&nbsp;(21) (the condition Eq.&nbsp;18). Since{" "}
            <Tex>{String.raw`|C_a|^2`}</Tex> depends on <Tex>{String.raw`E_0`}</Tex> through the Rabi-flopping integral
            (next section), this is a <em>self-consistent</em> equation: the amplitude that makes beam gain exactly
            replace cavity loss is the maser&rsquo;s operating point. Add detuning{" "}
            <Tex>{String.raw`\Omega-\omega_0`}</Tex> and it generates the family of tuning curves, Fig.&nbsp;5-5.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Self-consistency">
          Gain depends on the field (through Rabi flopping) and the field depends on the gain (through balance with
          loss). The maser operating point is the fixed point of this loop — exactly the structure of the full laser
          self-consistency treated later in the book.
        </Callout>
      </Section>

      <Section title="Rabi flopping and the maser tuning curves (Fig. 5-5)">
        <Intuition>
          Inside the cavity each molecule is a two-level system driven by the cavity field, so its upper-state
          probability Rabi-flops at a rate set by both the on-resonance Rabi frequency{" "}
          <Tex>{String.raw`\wp E_0/\hbar`}</Tex> and the detuning <Tex>{String.raw`\Omega-\omega_0`}</Tex>. How much
          energy a molecule gives the field depends on <em>where in its flop cycle it exits</em> — i.e. on the flopping
          frequency times the transit time. Folding this into gain&nbsp;=&nbsp;loss gives a transcendental,
          self-consistent equation for the steady-state amplitude. Its solution is Fig.&nbsp;5-5: tuning curves of
          amplitude vs detuning, one per <Tex>{String.raw`Q`}</Tex>. At low <Tex>{String.raw`Q`}</Tex>, a single modest
          peak; at high <Tex>{String.raw`Q`}</Tex>, the curve becomes multivalued (S-shaped) — amplitude bistability,
          the molecular analog of a driven classical anharmonic oscillator.
        </Intuition>

        <p>The energy transfer is governed by the generalized, off-resonance Rabi flopping frequency:</p>
        <KeyResult
          number="24"
          eq={String.raw`\mu^2 = \left(\frac{\wp E_0}{\hbar}\right)^2 + (\Omega - \omega_0)^2`}
          label="Generalized Rabi flopping frequency"
          note={
            <>
              The quadrature sum of the on-resonance Rabi frequency <Tex>{String.raw`\wp E_0/\hbar`}</Tex> and the
              detuning. On resonance <Tex>{String.raw`\mu=\wp E_0/\hbar`}</Tex>; off resonance the flop speeds up and
              shallows.
            </>
          }
        />

        <p>
          Inserting the Rabi-flopping occupation <Tex>{String.raw`|C_a|^2`}</Tex> (cf. Ch.&nbsp;II, Eq.&nbsp;2.68) into
          gain&nbsp;=&nbsp;loss and evaluating at <Tex>{String.raw`t=t_0=L/v`}</Tex> yields the self-consistency
          relation. The energy-transfer factor is a <Tex>{String.raw`\mathrm{sinc}^2`}</Tex>:
        </p>
        <KeyResult
          number="23"
          eq={String.raw`\frac{1}{Q} = \frac{2N\wp^2}{I_p\,\varepsilon_0\hbar\nu}\,\frac{\sin^2(\mu t_0/2)}{(\mu t_0/2)^2}`}
          label="Self-consistency: the 1/Q relation"
          note={
            <>
              The sinc-squared factor with argument <Tex>{String.raw`x=\mu t_0/2`}</Tex> is the flopping-averaged energy
              transfer; <Tex>{String.raw`I_p`}</Tex> is a flux/normalization factor and <Tex>{String.raw`\nu`}</Tex> the
              axial velocity. Because <Tex>{String.raw`\mu`}</Tex> depends on <Tex>{String.raw`E_0`}</Tex>, this is
              implicit in the field amplitude.
            </>
          }
        />

        <Callout kind="math" title="The amplitude and the detuning both cancel">
          In the balance, gain <Tex>{String.raw`\propto (a^2/\mu^2)\sin^2(\mu t_0/2)`}</Tex> with{" "}
          <Tex>{String.raw`a\equiv\wp E_0/\hbar`}</Tex>, while loss <Tex>{String.raw`\propto E_0^2\propto a^2`}</Tex>.
          The <Tex>{String.raw`a^2`}</Tex> cancels, and so does <Tex>{String.raw`\Omega`}</Tex>. What is left has
          neither the amplitude nor the detuning in it — a <em>universal</em>, detuning-independent root equation:
          <EqBlock label="29">{String.raw`\frac{\text{const}}{Q} = \frac{\sin^2 x}{x^2} = f(x), \qquad x = \tfrac{1}{2}\,\mu t_0 .`}</EqBlock>
          Solve it <em>once</em> for the set of roots <Tex>{String.raw`\{x_n\}`}</Tex>. Each root fixes a flopping
          frequency <Tex>{String.raw`\mu_n=2x_n/t_0`}</Tex>, and from <Tex>{String.raw`\mu_n^2=a^2+(\Omega-\omega_0)^2`}</Tex>{" "}
          the tuning curve of that branch is simply the arc{" "}
          <Tex>{String.raw`a(\delta)=\sqrt{\mu_n^2-\delta^2}`}</Tex> for{" "}
          <Tex>{String.raw`|\delta|\le\mu_n`}</Tex> — a semicircle of radius <Tex>{String.raw`\mu_n`}</Tex>.
        </Callout>

        <p>
          A concrete numerical instance, with the prefactor absorbed into a constant: for a chosen{" "}
          <Tex>{String.raw`Q`}</Tex> one must <em>solve</em> a transcendental equation for{" "}
          <Tex>{String.raw`x`}</Tex>,
        </p>
        <EqBlock label="29′">{String.raw`\frac{6000}{Q} = \frac{\sin^2 x}{x^2} = f(x), \qquad x = \tfrac{1}{2}\mu t_0 .`}</EqBlock>
        <p>
          The left side is set by the chosen <Tex>{String.raw`Q`}</Tex>; the right side is the universal
          sinc-squared transfer function. Solve it by Newton-Raphson: linearize <Tex>{String.raw`f`}</Tex> about a
          trial root <Tex>{String.raw`a`}</Tex>,
        </p>
        <EqBlock label="30">{String.raw`f(x) = f(a) + (x-a)\,\frac{d f(x)}{dx}`}</EqBlock>
        <p>and iterate toward the target value:</p>
        <KeyResult
          number="31"
          eq={String.raw`a' = a - \frac{f(a) - (\text{target})}{\,d f(a)/dx\,}`}
          label="Newton-Raphson update"
          note={
            <>
              Iterating converges to the operating-point <Tex>{String.raw`x`}</Tex>, which maps to{" "}
              <Tex>{String.raw`\wp E_0/\hbar`}</Tex> via <Tex>{String.raw`\mu`}</Tex> (Eq.&nbsp;24) — one point of a
              Fig.&nbsp;5-5 curve.
            </>
          }
        />
        <p>
          A useful working form ties <Tex>{String.raw`Q`}</Tex> to the cavity geometry for putting numbers on the
          curves:
        </p>
        <EqBlock label="28">{String.raw`Q = \frac{\nu L}{\mathscr{F}^2}`}</EqBlock>

        <SimFrame
          title="Maser tuning curves — self-consistent field amplitude vs detuning (Fig. 5-5)"
          caption={
            <>
              The plot is generated by genuinely root-solving the self-consistent gain&nbsp;=&nbsp;loss relation,{" "}
              <Tex>{String.raw`\mathrm{const}/Q=\sin^2x/x^2`}</Tex>, then mapping each root{" "}
              <Tex>{String.raw`x_n`}</Tex> to an arc <Tex>{String.raw`\wp E_0/\hbar=\sqrt{\mu_n^2-\delta^2}`}</Tex>. The
              inset shows the universal transfer function with the <Tex>{String.raw`\mathrm{const}/Q`}</Tex> line, so the
              number of roots — hence the onset of bistability — is visible at a glance.
            </>
          }
          tryThis={
            <>
              Step the <Tex>{String.raw`Q`}</Tex> preset from <Tex>{String.raw`7200`}</Tex> up to{" "}
              <Tex>{String.raw`36000`}</Tex>: the single modest arc grows taller and is joined by more nested arcs as
              the <Tex>{String.raw`\mathrm{const}/Q`}</Tex> line in the inset cuts more lobes of{" "}
              <Tex>{String.raw`\sin^2x/x^2`}</Tex>. When the branch count hits <Tex>{String.raw`3`}</Tex> the badge flags{" "}
              <strong>MULTIVALUED (bistable)</strong> — the high-<Tex>{String.raw`Q`}</Tex> signature. Now drop{" "}
              <Tex>{String.raw`N`}</Tex> until <Tex>{String.raw`\mathrm{const}/Q>1`}</Tex>: no root exists and the maser
              falls below threshold. Toggle the gain-vs-loss panel to watch the two curves cross exactly at the branch
              amplitudes.
            </>
          }
        >
          <Ch05Sim />
        </SimFrame>

        <Derivation title="From Rabi flopping to the tuning curves">
          <Step title="Insert Rabi flopping into the gain">
            The upper-state occupation a molecule retains after transit time <Tex>{String.raw`t_0`}</Tex> follows from
            the two-level Rabi solution (Ch.&nbsp;II, Eq.&nbsp;2.68) with generalized frequency{" "}
            <Tex>{String.raw`\mu`}</Tex> (Eq.&nbsp;24):{" "}
            <Tex>{String.raw`|C_a|^2=\big(\tfrac{\wp E_0/\hbar}{\mu}\big)^2\sin^2(\mu t_0/2)`}</Tex>. Averaging the
            energy given the field over the transit produces the factor{" "}
            <Tex>{String.raw`\sin^2(\mu t_0/2)/(\mu t_0/2)^2`}</Tex> in the gain.
          </Step>
          <Step title="Set gain = loss to get the 1/Q relation">
            Equate the beam gain (now carrying the sinc factor) to the cavity loss{" "}
            <Tex>{String.raw`(\Omega/Q)\times`}</Tex> stored energy. Rearranging isolates{" "}
            <Tex>{String.raw`1/Q`}</Tex> on one side and the field-dependent sinc factor on the other, Eq.&nbsp;(23).
          </Step>
          <Step title="Solve the transcendental equation per Q">
            For fixed beam parameters and a chosen <Tex>{String.raw`Q`}</Tex>, Eq.&nbsp;(23)/(29) becomes{" "}
            <Tex>{String.raw`\text{const}/Q=\sin^2 x/x^2`}</Tex>. Solve numerically (Newton-Raphson, Eqs.&nbsp;30–31)
            for <em>every</em> root <Tex>{String.raw`x_n`}</Tex>, then back out{" "}
            <Tex>{String.raw`\mu_n`}</Tex> and the arc <Tex>{String.raw`a(\delta)=\sqrt{\mu_n^2-\delta^2}`}</Tex>.
            Sweeping detuning traces one branch; the family of roots gives the nested branches; sweeping{" "}
            <Tex>{String.raw`Q`}</Tex> gives the family in Fig.&nbsp;5-5.
          </Step>
          <Step title="Read the tuning curves">
            Low-<Tex>{String.raw`Q`}</Tex> curves are single-valued, modest peaks centred near zero detuning. As{" "}
            <Tex>{String.raw`Q`}</Tex> rises the line <Tex>{String.raw`\text{const}/Q`}</Tex> falls and cuts more lobes
            of <Tex>{String.raw`\sin^2x/x^2`}</Tex>: more roots, more arcs, and the curve becomes <em>multivalued</em>{" "}
            (S-shaped) versus detuning — amplitude bistability, the molecular analog of a driven classical anharmonic
            (Duffing-like) oscillator. This multivaluedness is the signature high-<Tex>{String.raw`Q`}</Tex> behavior.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Fig. 5-5 is the payoff">
          Curves of maser amplitude <Tex>{String.raw`\wp E_0/\hbar`}</Tex> versus cavity detuning{" "}
          <Tex>{String.raw`\Omega-\omega_0`}</Tex> for{" "}
          <Tex>{String.raw`Q = 7200,\,9000,\,12000,\,18000,\,36000`}</Tex>. Higher{" "}
          <Tex>{String.raw`Q`}</Tex> → taller, narrower, and eventually multivalued (bistable) response — the
          chapter&rsquo;s quantitative prediction of the field the maser produces.
        </Callout>
        <Callout kind="history" title="Classical anharmonic analogy">
          The text stresses that the ammonia molecules behave much like the negative-resistance / anharmonic classical
          oscillators of Chapter&nbsp;IV — the same multivalued amplitude-vs-detuning curves — even though the
          underlying mechanism is fully quantum.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from the maser">
          <ul>
            <li>
              <strong>Two-level system + resonant cavity</strong> is the universal laser/maser prototype: an isolated
              pair of levels (here the <Tex>{String.raw`\mathrm{NH_3}`}</Tex> inversion doublet at{" "}
              <Tex>{String.raw`23.87`}</Tex> GHz) coupled to one field mode — the model the rest of the book builds on.
            </li>
            <li>
              <strong>An eigenstate has no permanent dipole</strong>; only a superposition radiates (at{" "}
              <Tex>{String.raw`\omega_0`}</Tex>). That is why a driving field and a transition dipole{" "}
              <Tex>{String.raw`\wp`}</Tex> are needed — the same <Tex>{String.raw`\wp`}</Tex> in every gain and Rabi
              expression.
            </li>
            <li>
              <strong>Inversion is required for gain and is not free</strong>: here it is made mechanically by
              Stark-shift state selection in the focuser (<Tex>{String.raw`\cos`}</Tex> vs{" "}
              <Tex>{String.raw`\cosh`}</Tex>). Later chapters invert by pumping, but the necessity and the
              gain&nbsp;=&nbsp;loss consequence are identical.
            </li>
            <li>
              <strong>Steady state = saturated gain balancing loss</strong> (Eq.&nbsp;18). The operating amplitude is
              the self-consistent fixed point where field-dependent gain equals cavity loss{" "}
              <Tex>{String.raw`\Omega/Q`}</Tex> — the heart of the full laser theory.
            </li>
            <li>
              <strong>Cavity <Tex>{String.raw`Q`}</Tex> shapes the output</strong>: higher{" "}
              <Tex>{String.raw`Q`}</Tex> → larger field, narrower line, and eventually multivalued/bistable tuning
              curves (Fig.&nbsp;5-5) — a quantum device mimicking a classical anharmonic oscillator (Chapter&nbsp;IV).
            </li>
            <li>
              <strong>Generalized Rabi frequency</strong>{" "}
              <Tex>{String.raw`\mu^2=(\wp E_0/\hbar)^2+(\Omega-\omega_0)^2`}</Tex> (Eq.&nbsp;24) and the Rabi solution
              (Ch.&nbsp;II, Eq.&nbsp;2.68) set how much energy each molecule gives the field — the microscopic origin of
              saturation, revisited with the density matrix in Chapter&nbsp;VII.
            </li>
            <li>
              <strong>Method</strong>: reduce a complex system to one effective coordinate, diagonalize a{" "}
              <Tex>{String.raw`2\times2`}</Tex> Stark Hamiltonian, and root-find a transcendental self-consistency
              equation (Newton-Raphson) — tools reused throughout laser theory.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
