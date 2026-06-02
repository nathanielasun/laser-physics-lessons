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
import Ch14Sim from "@/components/sims/ch14";

export default function Page() {
  return (
    <Lesson slug="ch14">
      <Lede>
        Semiclassical laser theory treats the atom as quantum but the light as a classical wave. It works
        astonishingly well — yet it has a fatal silence: it can <em>never</em> explain why an excited atom sitting in
        perfect darkness spontaneously falls to its ground state and emits a photon. There is no classical field to
        &ldquo;stimulate&rdquo; it. This chapter fixes that by quantizing the field itself. The trick is disarmingly
        simple — a single mode of the electromagnetic field is mathematically <em>identical</em> to a harmonic
        oscillator, so we quantize it the same way. Out fall photons, zero-point energy, the vacuum fluctuations that
        kick atoms into emitting, and finally a first-principles spontaneous-emission rate and natural linewidth.
      </Lede>

      {/* ════════════════════════ SECTION 1 ════════════════════════ */}
      <Section title="Quantization of the single-mode field: the field IS an oscillator">
        <Intuition>
          Take the source-free Maxwell equations inside a cavity and pick out <em>one</em> standing-wave mode of
          frequency <Tex>{String.raw`\Omega`}</Tex>. Write its electric field as a single time-dependent amplitude{" "}
          <Tex>{String.raw`q(t)`}</Tex> and its magnetic field as <Tex>{String.raw`\dot q(t)`}</Tex>. Plug these into
          the electromagnetic energy integral and something remarkable happens: the field energy collapses into{" "}
          <em>exactly</em> the Hamiltonian of a mechanical harmonic oscillator,{" "}
          <Tex>{String.raw`\tfrac12(M\Omega^2 q^2 + p^2/M)`}</Tex>. The &ldquo;mass&rdquo; <Tex>{String.raw`M`}</Tex> is
          a bookkeeping fiction — nothing is really vibrating — but the mathematics is the oscillator&rsquo;s, so we
          quantize the field with the oscillator&rsquo;s recipe. That single move turns field amplitudes into
          operators, and the field&rsquo;s energy into discrete lumps <Tex>{String.raw`\hbar\Omega`}</Tex>. Those lumps
          are photons.
        </Intuition>

        <p>
          We start from Maxwell&rsquo;s equations in the empty cavity — no free charges or currents, just vacuum
          constitutive relations:
        </p>
        <EqBlock label="1">{String.raw`\nabla \times \mathbf{H} = \frac{\partial \mathbf{D}}{\partial t}`}</EqBlock>
        <EqBlock label="2">{String.raw`\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}`}</EqBlock>
        <EqBlock label="3,4">{String.raw`\nabla \cdot \mathbf{B} = 0, \qquad \nabla \cdot \mathbf{E} = 0`}</EqBlock>
        <EqBlock label="5">{String.raw`\mathbf{B} = \mu_0 \mathbf{H}, \qquad \mathbf{D} = \varepsilon_0 \mathbf{E}`}</EqBlock>

        <p>
          A single linearly polarized standing-wave mode (polarized along <Tex>{String.raw`\hat x`}</Tex>, varying as{" "}
          <Tex>{String.raw`\sin Kz`}</Tex>) is written with one amplitude <Tex>{String.raw`q(t)`}</Tex> for{" "}
          <Tex>{String.raw`E`}</Tex> and its derivative for <Tex>{String.raw`H`}</Tex>:
        </p>
        <EqBlock label="6">{String.raw`E_x(z,t) = q(t)\left(\frac{2\Omega^2 M}{V\varepsilon_0}\right)^{1/2} \sin Kz`}</EqBlock>
        <EqBlock label="7">{String.raw`H_y(z,t) = \dot q(t)\left(\frac{2\Omega^2 M}{V\varepsilon_0}\right)^{1/2}\frac{\varepsilon_0}{K}\cos Kz`}</EqBlock>
        <p>
          Here <Tex>{String.raw`V`}</Tex> is the mode volume and <Tex>{String.raw`M`}</Tex> an arbitrary constant
          carrying the dimensions of mass. Because <Tex>{String.raw`H_y`}</Tex> rides on{" "}
          <Tex>{String.raw`\dot q`}</Tex>, the magnetic amplitude plays the role of a conjugate momentum. The classical
          field energy is
        </p>
        <EqBlock label="8">{String.raw`\mathcal{H} = \tfrac{1}{2}\int dV\,\left(\varepsilon_0 E_x^2 + \mu_0 H_y^2\right).`}</EqBlock>

        <Derivation title="From field energy to oscillator energy, then to photons">
          <Step title="Map field energy to oscillator energy">
            Substitute the single-mode <Tex>{String.raw`E_x`}</Tex> (6) and <Tex>{String.raw`H_y`}</Tex> (7) into the
            energy integral (8). The spatial integrals of <Tex>{String.raw`\sin^2 Kz`}</Tex> and{" "}
            <Tex>{String.raw`\cos^2 Kz`}</Tex> each give <Tex>{String.raw`V/2`}</Tex>, and with{" "}
            <Tex>{String.raw`K=\Omega/c`}</Tex> the terms organize into a harmonic-oscillator Hamiltonian with{" "}
            <Tex>{String.raw`p = M\dot q`}</Tex>:
            <EqBlock label="9">{String.raw`\mathcal{H} = \tfrac{1}{2}\left(M\Omega^2 q^2 + M\dot q^2\right) = \tfrac{1}{2}\left(M\Omega^2 q^2 + \frac{p^2}{M}\right).`}</EqBlock>
            The field mode is dynamically a harmonic oscillator of frequency <Tex>{String.raw`\Omega`}</Tex>.
          </Step>
          <Step title="Canonically quantize">
            Treat the field amplitude <Tex>{String.raw`q`}</Tex> and the magnetic amplitude{" "}
            <Tex>{String.raw`p=M\dot q`}</Tex> as conjugate operators with the standard commutator. This single
            postulate turns the classical field into a quantum field:
            <EqBlock label="10">{String.raw`[q,p] = qp - pq = i\hbar.`}</EqBlock>
          </Step>
          <Step title="Introduce ladder operators">
            Build dimensionless lowering and raising operators from <Tex>{String.raw`q`}</Tex> and{" "}
            <Tex>{String.raw`p`}</Tex>:
            <EqBlock label="11">{String.raw`a = (2M\hbar\Omega)^{-1/2}(M\Omega q + ip),`}</EqBlock>
            <EqBlock label="12">{String.raw`a^\dagger = (2M\hbar\Omega)^{-1/2}(M\Omega q - ip).`}</EqBlock>
            The prefactors are chosen so that <Tex>{String.raw`[q,p]=i\hbar`}</Tex> becomes the boson commutator
            <EqBlock label="14">{String.raw`[a, a^\dagger] = 1,`}</EqBlock>
            <EqBlock label="15">{String.raw`[a,a] = [a^\dagger, a^\dagger] = 0.`}</EqBlock>
          </Step>
          <Step title="Rewrite the Hamiltonian">
            Invert (11)–(12) to express <Tex>{String.raw`q,p`}</Tex> in terms of <Tex>{String.raw`a,a^\dagger`}</Tex>{" "}
            and substitute into (9). The cross terms combine through the commutator, and the noncommutativity leaves
            behind a stubborn <Tex>{String.raw`\tfrac12`}</Tex>:
            <KeyResult
              number="13"
              eq={String.raw`\mathcal{H} = \hbar\Omega\left(a^\dagger a + \tfrac{1}{2}\right).`}
              label="Quantized single-mode Hamiltonian"
            />
            <Tex>{String.raw`a^\dagger a`}</Tex> counts photons; the <Tex>{String.raw`\tfrac12`}</Tex> is the
            zero-point energy.
          </Step>
          <Step title="Field as an operator and its evolution">
            Re-express <Tex>{String.raw`E_x`}</Tex> in terms of <Tex>{String.raw`a+a^\dagger`}</Tex>. The field is now
            an <em>operator</em>:
            <EqBlock label="16">{String.raw`E_x(z,t) = \mathscr{E}\,(a + a^\dagger)\sin Kz, \qquad \mathscr{E} = \left(\frac{\hbar\Omega}{\varepsilon_0 V}\right)^{1/2}.`}</EqBlock>
            The scale <Tex>{String.raw`\mathscr{E}`}</Tex> (Eq. 17) is the &ldquo;electric field per photon.&rdquo; In
            the Heisenberg picture the ladder operators obey
            <EqBlock label="18">{String.raw`[\mathscr{H}, a] = -\hbar\Omega a, \qquad [\mathscr{H}, a^\dagger] = \hbar\Omega a^\dagger,`}</EqBlock>
            so <Tex>{String.raw`\dot a = (i/\hbar)[\mathscr H,a] = -i\Omega a`}</Tex> integrates to
            <EqBlock label="19">{String.raw`a(t) = a(0)\,e^{-i\Omega t}, \qquad a^\dagger(t) = a^\dagger(0)\,e^{i\Omega t}`}</EqBlock>
            — exactly the classical oscillation of the field amplitude, now carried by an operator.
          </Step>
        </Derivation>

        <KeyResult
          eq={String.raw`\mathscr{E} = \left(\frac{\hbar\Omega}{\varepsilon_0 V}\right)^{1/2}`}
          label="Electric field per photon (Eq. 17)"
          note={
            <>
              The natural field strength of a single quantum in mode volume <Tex>{String.raw`V`}</Tex>. It sets the
              size of every single-photon effect in the rest of the chapter.
            </>
          }
        />

        <Callout kind="insight" title="Why an oscillator?">
          Nothing physical is vibrating with &ldquo;mass&rdquo; <Tex>{String.raw`M`}</Tex> —{" "}
          <Tex>{String.raw`M`}</Tex> is a dimensional placeholder that cancels out of every observable. The point is
          purely structural: <strong>Maxwell + cavity = harmonic oscillator</strong>, so the oscillator&rsquo;s entire
          quantum machinery applies verbatim.
        </Callout>
        <Callout kind="warning" title="Operator, not number">
          After Eq. (16) the electric field is an <strong>operator</strong>. Its expectation value in a photon-number
          state is zero, yet its mean square is not — this is the seed of the vacuum fluctuations we develop next.
        </Callout>
      </Section>

      {/* ════════════════════════ SECTION 2 ════════════════════════ */}
      <Section title="Photons: number states, the ladder, and vacuum fluctuations">
        <Intuition>
          Diagonalize <Tex>{String.raw`\mathcal H = \hbar\Omega(a^\dagger a + \tfrac12)`}</Tex>. Its eigenstates{" "}
          <Tex>{String.raw`|n\rangle`}</Tex> are the photon-number (Fock) states; the integer{" "}
          <Tex>{String.raw`n`}</Tex> counts how many lumps of energy <Tex>{String.raw`\hbar\Omega`}</Tex> the mode
          holds. The operators earn their names: <Tex>{String.raw`a`}</Tex> destroys a photon and{" "}
          <Tex>{String.raw`a^\dagger`}</Tex> creates one — with the all-important <Tex>{String.raw`\sqrt{\,}`}</Tex>{" "}
          factors. The lowest rung is the vacuum <Tex>{String.raw`|0\rangle`}</Tex>, whose energy{" "}
          <Tex>{String.raw`\tfrac12\hbar\Omega`}</Tex> you cannot remove. And here is the chapter&rsquo;s deepest
          surprise: in any number state the <em>mean</em> field is zero but the <em>mean-square</em> field is not — it
          stays nonzero even for <Tex>{String.raw`n=0`}</Tex>. The vacuum is a seething bath of fluctuating fields.
        </Intuition>

        <p>The Hamiltonian&rsquo;s eigenvalue equation quantizes the field energy in lumps above the zero-point:</p>
        <KeyResult
          number="23–26"
          eq={String.raw`\mathcal{H}|n\rangle = \hbar\Omega\left(n + \tfrac{1}{2}\right)|n\rangle.`}
          label="Photon-number eigenstates"
        />

        <Derivation title="The ladder, the vacuum wavefunction, and the field fluctuation">
          <Step title="Fix the ladder normalization">
            Assume <Tex>{String.raw`a|n\rangle = s_n|n-1\rangle`}</Tex>. The norm of both sides gives{" "}
            <Tex>{String.raw`|s_n|^2 = \langle n|a^\dagger a|n\rangle = n`}</Tex> (since{" "}
            <Tex>{String.raw`a^\dagger a`}</Tex> is the number operator). Likewise{" "}
            <Tex>{String.raw`\langle n|a a^\dagger|n\rangle = \langle n|(a^\dagger a + 1)|n\rangle = n+1`}</Tex>. Hence
            <EqBlock label="27">{String.raw`a|n\rangle = \sqrt{n}\,|n-1\rangle,`}</EqBlock>
            <EqBlock label="28">{String.raw`a^\dagger|n\rangle = \sqrt{n+1}\,|n+1\rangle.`}</EqBlock>
            The <Tex>{String.raw`\sqrt{n+1}`}</Tex> in (28) is nonzero even when <Tex>{String.raw`n=0`}</Tex> — the seed
            of spontaneous emission. Any number state is built from the vacuum:
            <EqBlock label="29">{String.raw`|n\rangle = \frac{1}{\sqrt{n!}}\,(a^\dagger)^n|0\rangle.`}</EqBlock>
          </Step>
          <Step title="Ground-state (vacuum) wavefunction">
            Write <Tex>{String.raw`a|0\rangle=0`}</Tex> in the <Tex>{String.raw`q`}</Tex>-representation using{" "}
            <Tex>{String.raw`a = (2M\hbar\Omega)^{-1/2}(M\Omega q + \hbar\,\partial_q)`}</Tex>. This first-order ODE has
            a normalized Gaussian solution:
            <EqBlock label="30,31">{String.raw`\left(M\Omega q + \hbar\frac{\partial}{\partial q}\right)\phi_0(q) = 0 \;\Rightarrow\; \phi_0(q) = \left(\frac{M\Omega}{\pi\hbar}\right)^{1/4}\exp\!\left[-\tfrac{1}{2}\frac{M\Omega}{\hbar}q^2\right].`}</EqBlock>
            Applying <Tex>{String.raw`(a^\dagger)^n`}</Tex> gives the excited-state wavefunctions — a Gaussian times a
            Hermite polynomial <Tex>{String.raw`H_n`}</Tex>:
            <EqBlock label="32">{String.raw`\phi_n(q) = \frac{(a^\dagger)^n}{\sqrt{n!}}\,\phi_0(q) = \frac{1}{\sqrt{2^n n!}}\left(\frac{M\Omega}{\pi\hbar}\right)^{1/4}e^{-\frac{M\Omega}{2\hbar}q^2}\,H_n\!\left[\left(\frac{M\Omega}{\hbar}\right)^{1/2}q\right].`}</EqBlock>
          </Step>
          <Step title="Compute the field fluctuation">
            Square the field operator: <Tex>{String.raw`E^2 = \mathscr E^2 \sin^2(Kz)\,(a^2 + a^{\dagger 2} + a^\dagger a + a a^\dagger)`}</Tex>.
            In <Tex>{String.raw`|n\rangle`}</Tex> the off-diagonal <Tex>{String.raw`a^2`}</Tex> and{" "}
            <Tex>{String.raw`a^{\dagger 2}`}</Tex> give zero, while{" "}
            <Tex>{String.raw`a^\dagger a + a a^\dagger = 2a^\dagger a + 1`}</Tex> has expectation{" "}
            <Tex>{String.raw`2n+1`}</Tex>:
            <KeyResult
              number="34"
              eq={String.raw`\langle n|E^2|n\rangle = 2\mathscr{E}^2\sin^2(Kz)\left(n + \tfrac{1}{2}\right).`}
              label="Mean-square field in a number state"
            />
            At <Tex>{String.raw`n=0`}</Tex> this equals <Tex>{String.raw`\mathscr E^2\sin^2(Kz)`}</Tex> — the vacuum
            still carries field energy. Yet the mean field vanishes, because <Tex>{String.raw`a`}</Tex> and{" "}
            <Tex>{String.raw`a^\dagger`}</Tex> have no diagonal matrix elements:
            <EqBlock>{String.raw`\langle n|E|n\rangle = 0.`}</EqBlock>
          </Step>
        </Derivation>

        <Figure
          caption={
            <>
              The photon-number ladder. Rungs are evenly spaced by <Tex>{String.raw`\hbar\Omega`}</Tex>, sitting on top
              of the irreducible zero-point energy <Tex>{String.raw`\tfrac12\hbar\Omega`}</Tex>. The operators{" "}
              <Tex>{String.raw`a`}</Tex> and <Tex>{String.raw`a^\dagger`}</Tex> step down and up the rungs with
              amplitudes <Tex>{String.raw`\sqrt n`}</Tex> and <Tex>{String.raw`\sqrt{n+1}`}</Tex>.
            </>
          }
        >
          <svg viewBox="0 0 460 300" width="100%" role="img" aria-label="Photon number ladder of the quantized field">
            {/* energy axis */}
            <line x1="60" y1="20" x2="60" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="60,14 56,24 64,24" fill="#94a3b8" />
            <text x="36" y="22" fontSize="13" fill="#475569" fontFamily="ui-sans-serif, system-ui">E</text>
            {/* zero-point baseline */}
            <line x1="56" y1="252" x2="64" y2="252" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="14" y="256" fontSize="11" fill="#64748b" fontFamily="ui-sans-serif, system-ui">0</text>
            {/* rungs n = 0..4 */}
            {[0, 1, 2, 3, 4].map((nn) => {
              const y = 230 - nn * 48; // baseline of |0> at 230, spacing 48
              return (
                <g key={nn}>
                  <line x1="90" y1={y} x2="320" y2={y} stroke={nn === 0 ? "#e11d48" : "#334155"} strokeWidth={nn === 0 ? 3 : 2.4} />
                  <text x="330" y={y + 4} fontSize="14" fill="#1b2330" fontFamily="ui-sans-serif, system-ui">|{nn}&#10217;</text>
                  <text x="380" y={y + 4} fontSize="12" fill="#64748b" fontFamily="ui-sans-serif, system-ui">
                    ({nn}+½)&#8463;&#937;
                  </text>
                </g>
              );
            })}
            {/* spacing brace */}
            <line x1="205" y1="230" x2="205" y2="182" stroke="#0891b2" strokeWidth="1.2" />
            <polygon points="205,230 201,222 209,222" fill="#0891b2" />
            <polygon points="205,182 201,190 209,190" fill="#0891b2" />
            <text x="212" y="210" fontSize="12" fill="#0891b2" fontFamily="ui-sans-serif, system-ui">&#8463;&#937;</text>
            {/* zero-point gap from 0 to |0> */}
            <line x1="120" y1="252" x2="120" y2="230" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 3" />
            <text x="124" y="246" fontSize="11" fill="#be123c" fontFamily="ui-sans-serif, system-ui">½&#8463;&#937;</text>
            {/* a and a-dagger arrows between |2> and |3> */}
            <path d="M 150 134 q -22 24 0 48" fill="none" stroke="#d97706" strokeWidth="2" />
            <polygon points="150,134 144,142 156,142" fill="#d97706" />
            <text x="86" y="162" fontSize="12" fill="#d97706" fontFamily="ui-sans-serif, system-ui">a&#8224;&#8730;3</text>
            <path d="M 270 182 q 22 -24 0 -48" fill="none" stroke="#7c3aed" strokeWidth="2" />
            <polygon points="270,134 264,142 276,142" fill="#7c3aed" />
            <text x="288" y="162" fontSize="12" fill="#7c3aed" fontFamily="ui-sans-serif, system-ui">a&#8730;3</text>
          </svg>
        </Figure>

        <p>For completeness, any single-mode field state is a superposition of number states:</p>
        <EqBlock label="35">{String.raw`|\psi\rangle = \sum_n c_n\,|n\rangle.`}</EqBlock>
        <p>
          A field that <em>resembles</em> a classical wave must mix many <Tex>{String.raw`|n\rangle`}</Tex>; with a
          Poisson distribution of <Tex>{String.raw`|c_n|^2`}</Tex> this is the coherent state — developed fully in
          Chapter&nbsp;XV.
        </p>

        <Callout kind="insight" title="The vacuum is not empty">
          <Tex>{String.raw`\langle E\rangle = 0`}</Tex> but <Tex>{String.raw`\langle E^2\rangle \neq 0`}</Tex>. The
          field has no definite value in a number state, only a definite energy. At <Tex>{String.raw`n=0`}</Tex> the
          spread is irreducible — these zero-point fluctuations are exactly what will kick an excited atom into
          emitting.
        </Callout>
        <Intuition title="Why a photon is not a tiny billiard ball">
          A number state <Tex>{String.raw`|n\rangle`}</Tex> is spread over the whole cavity with no localization and no
          phase. A &ldquo;photon&rdquo; is an energy quantum <Tex>{String.raw`\hbar\Omega`}</Tex> of a field mode, not a
          point particle — which is why Dirac&rsquo;s &ldquo;each photon interferes only with itself&rdquo; makes sense.
        </Intuition>
      </Section>

      {/* ════════════════════════ SECTION 3 ════════════════════════ */}
      <Section title="The multimode field: many oscillators at once">
        <Intuition>
          Real radiation is not one mode but a whole spectrum — every frequency <Tex>{String.raw`\Omega_j`}</Tex> and
          wavevector <Tex>{String.raw`K_j`}</Tex> the cavity supports. The generalization is purely mechanical: expand
          the field as a sum over modes, and because distinct standing waves are spatially orthogonal, the total energy
          becomes a <em>sum of independent</em> oscillator Hamiltonians. Each mode gets its own ladder operators with{" "}
          <Tex>{String.raw`[a_j,a_k^\dagger]=\delta_{jk}`}</Tex> — different modes commute and never talk to each
          other. This is exactly the framework we need next: an atom couples not to one mode but to the entire continuum.
        </Intuition>

        <p>The field and its energy are sums over modes:</p>
        <EqBlock label="36">{String.raw`\mathbf E(z,t) = \hat{x}\sum_j q_j(t)\left(\frac{2\Omega_j^2 M_j}{V\varepsilon_0}\right)^{1/2}\sin K_j z,`}</EqBlock>
        <EqBlock label="37">{String.raw`\mathbf H(z,t) = \hat{y}\sum_j \dot q_j(t)\left(\frac{2\Omega_j^2 M_j}{V\varepsilon_0}\right)^{1/2}\frac{\varepsilon_0}{K_j}\cos K_j z,`}</EqBlock>
        <EqBlock label="38">{String.raw`\Omega_j = \frac{j\pi c}{L}, \qquad K_j = \frac{j\pi}{L}\quad\text{(cavity of length }L).`}</EqBlock>

        <Derivation title="Decouple, then quantize each mode separately">
          <Step title="Decouple the modes">
            Distinct cavity modes are spatially orthogonal:{" "}
            <Tex>{String.raw`\int \sin(K_j z)\sin(K_k z)\,dz = \delta_{jk}\,V/2`}</Tex>. Substituting the multimode
            expansion (36)–(37) into the energy integral therefore produces <em>no</em> cross terms — the total
            Hamiltonian is a clean sum of independent oscillators:
            <EqBlock label="39">{String.raw`\mathscr{H} = \tfrac{1}{2}\sum_j\left(M_j\Omega_j^2 q_j^2 + \frac{p_j^2}{M_j}\right) = \sum_j \mathscr{H}_j.`}</EqBlock>
          </Step>
          <Step title="Quantize each mode separately">
            Impose independent canonical commutators
            <EqBlock label="40">{String.raw`[q_j, p_{j'}] = i\hbar\,\delta_{jj'}, \qquad [q_j, q_{j'}] = [p_j, p_{j'}] = 0,`}</EqBlock>
            define per-mode ladder operators
            <EqBlock label="41,42">{String.raw`a_j = (2M_j\hbar\Omega_j)^{-1/2}(M_j\Omega_j q_j + ip_j), \qquad a_j^\dagger = (2M_j\hbar\Omega_j)^{-1/2}(M_j\Omega_j q_j - ip_j),`}</EqBlock>
            and obtain the multimode Hamiltonian and field operator
            <EqBlock label="43">{String.raw`\mathscr{H} = \sum_j \hbar\Omega_j\left(a_j^\dagger a_j + \tfrac{1}{2}\right),`}</EqBlock>
            <EqBlock label="44">{String.raw`E_x(z,t) = \sum_j \mathscr{E}_j (a_j + a_j^\dagger)\sin K_j z, \qquad \mathscr{E}_j = \left(\frac{\hbar\Omega_j}{\varepsilon_0 V}\right)^{1/2}.`}</EqBlock>
          </Step>
        </Derivation>

        <p>Each mode&rsquo;s energy is quantized on its own, and the eigenstates factorize into product number states:</p>
        <EqBlock label="45">{String.raw`\mathscr{H}_j|n_j\rangle = \hbar\Omega_j\left(n_j + \tfrac{1}{2}\right)|n_j\rangle,`}</EqBlock>
        <EqBlock label="46">{String.raw`|n_1\rangle\,|n_2\rangle\cdots|n_j\rangle\cdots \equiv |n_1 n_2 \ldots n_j \ldots\rangle.`}</EqBlock>
        <p>An annihilation operator lowers only its own mode&rsquo;s occupation:</p>
        <EqBlock label="47">{String.raw`a_j|n_1 n_2 \ldots n_j \ldots\rangle = \sqrt{n_j}\,|n_1 n_2 \ldots n_j - 1 \ldots\rangle,`}</EqBlock>
        <p>and a general field state is a superposition over all occupation-number lists:</p>
        <EqBlock label="49">{String.raw`|\psi\rangle = \sum_{n_1}\sum_{n_2}\cdots\sum_{n_j}\cdots c_{n_1 n_2 \ldots}\,|n_1 n_2 \ldots\rangle.`}</EqBlock>

        <Callout kind="insight" title="Independence is everything">
          <Tex>{String.raw`[a_j, a_k^\dagger] = \delta_{jk}`}</Tex> means each mode is its own oscillator. This is why
          the continuum of modes in Weisskopf–Wigner theory can be summed mode-by-mode — and why their spread of
          frequencies is what produces a finite linewidth.
        </Callout>
      </Section>

      {/* ════════════════════════ SECTION 4 ════════════════════════ */}
      <Section title="Atom–field interaction: the Jaynes–Cummings model and quantized Rabi flopping">
        <Intuition>
          Couple a single two-level atom (upper <Tex>{String.raw`|a\rangle`}</Tex>, lower{" "}
          <Tex>{String.raw`|b\rangle`}</Tex>, splitting <Tex>{String.raw`\hbar\omega`}</Tex>) to one quantized mode. The
          dipole interaction <Tex>{String.raw`-\wp E`}</Tex> is a product of the atomic flip operator{" "}
          <Tex>{String.raw`(\sigma + \sigma^\dagger)`}</Tex> and the field <Tex>{String.raw`(a + a^\dagger)`}</Tex>.
          Two of the four resulting terms conserve energy (atom up + photon absorbed, atom down + photon emitted); the
          other two oscillate so fast they average to nothing. Dropping them is the rotating-wave approximation, and
          what remains is the Jaynes–Cummings Hamiltonian. Solve it on resonance and the atom flops between{" "}
          <Tex>{String.raw`|a,n\rangle`}</Tex> and <Tex>{String.raw`|b,n+1\rangle`}</Tex> at frequency{" "}
          <Tex>{String.raw`g\sqrt{n+1}`}</Tex>. The headline: even with <Tex>{String.raw`n=0`}</Tex> the atom still
          flops — the vacuum Rabi oscillation, spontaneous emission appearing as a reversible coherent flop because the
          atom talks to only one mode.
        </Intuition>

        <p>The atom, field, and combined states are expanded as</p>
        <EqBlock label="50,51">{String.raw`|\psi_{\text{atom}}\rangle = c_a|a\rangle + c_b|b\rangle, \qquad |\psi_{\text{field}}\rangle = \sum_n c_n|n\rangle,`}</EqBlock>
        <EqBlock label="52">{String.raw`|\psi_{a+f}\rangle = \sum_n \big[c_{a,n}|a\rangle|n\rangle + c_{b,n}|b\rangle|n\rangle\big].`}</EqBlock>
        <p>The total Hamiltonian is free atom + free field + dipole interaction:</p>
        <EqBlock label="55">{String.raw`\mathscr{H} = \mathscr{H}_{\text{atom}} + \mathscr{H}_{\text{field}} + \mathscr{V},`}</EqBlock>
        <EqBlock label="56,57">{String.raw`\mathscr{H}_{\text{atom}} = \hbar\begin{pmatrix}\omega_a & 0\\ 0 & \omega_b\end{pmatrix}, \qquad \mathscr{H}_{\text{field}} = \hbar\Omega\left(a^\dagger a + \tfrac{1}{2}\right),`}</EqBlock>
        <EqBlock label="58">{String.raw`\mathscr{V} = -\wp\,E_x(z,t)\begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix} = -E_x(z,t)\,\wp\,(\sigma + \sigma^\dagger).`}</EqBlock>
        <p>
          With <Tex>{String.raw`\omega=\omega_a-\omega_b`}</Tex> the transition frequency and{" "}
          <Tex>{String.raw`\wp`}</Tex> the dipole matrix element, inserting the field operator (16) expands the coupling
          into four operator products and fixes the coupling constant:
        </p>
        <EqBlock label="58′">{String.raw`\mathscr{V} = \hbar g\left(\sigma a^\dagger + a\sigma^\dagger + \sigma^\dagger a^\dagger + a\sigma\right),`}</EqBlock>
        <EqBlock label="59">{String.raw`\mathscr{H} = \hbar\begin{pmatrix}\omega_a & 0\\ 0 & \omega_b\end{pmatrix} + \hbar\Omega\left(a^\dagger a + \tfrac{1}{2}\right) + \hbar g\left(\sigma a^\dagger + a\sigma^\dagger + \sigma^\dagger a^\dagger + a\sigma\right),`}</EqBlock>
        <EqBlock label="60">{String.raw`g = -\frac{\wp}{\hbar}\,\mathscr{E}\sin Kz.`}</EqBlock>

        <Derivation title="From the dipole coupling to exact Rabi flopping">
          <Step title="Build the coupling and apply the RWA">
            Transform (59) to the interaction picture. The energy-conserving terms{" "}
            <Tex>{String.raw`\sigma^\dagger a`}</Tex> (atom up, photon absorbed) and{" "}
            <Tex>{String.raw`\sigma a^\dagger`}</Tex> (atom down, photon emitted) pick up the slow phase{" "}
            <Tex>{String.raw`e^{\pm i(\omega-\Omega)t}`}</Tex>, while <Tex>{String.raw`\sigma a`}</Tex> and{" "}
            <Tex>{String.raw`\sigma^\dagger a^\dagger`}</Tex> pick up the fast phase{" "}
            <Tex>{String.raw`e^{\pm i(\omega+\Omega)t}`}</Tex>. Drop the fast terms (the RWA):
            <EqBlock label="65,66">{String.raw`\mathscr{V}_I = \hbar g\left[\sigma^\dagger a\,e^{i(\omega-\Omega)t} + \sigma a^\dagger e^{-i(\omega-\Omega)t}\right].`}</EqBlock>
          </Step>
          <Step title="Reduce to a 2-state problem">
            The RWA interaction connects <em>only</em> <Tex>{String.raw`|a,n\rangle`}</Tex> with{" "}
            <Tex>{String.raw`|b,n+1\rangle`}</Tex>, so the infinite problem decouples into independent{" "}
            <Tex>{String.raw`2\times 2`}</Tex> blocks:
            <EqBlock label="67">{String.raw`|\psi_I(t)\rangle = c_{a,n}(t)\,|a\rangle|n\rangle + c_{b,n+1}(t)\,|b\rangle|n+1\rangle,`}</EqBlock>
            with amplitude equations (the <Tex>{String.raw`\sqrt{n+1}`}</Tex> coming straight from{" "}
            <Tex>{String.raw`a^\dagger|n\rangle=\sqrt{n+1}|n+1\rangle`}</Tex>):
            <EqBlock label="70">{String.raw`\dot c_{a,n}(t) = -ig\sqrt{n+1}\,e^{-i(\Omega-\omega)t}\,c_{b,n+1}(t),`}</EqBlock>
            <EqBlock label="71">{String.raw`\dot c_{b,n+1}(t) = -ig\sqrt{n+1}\,e^{+i(\Omega-\omega)t}\,c_{a,n}(t).`}</EqBlock>
          </Step>
          <Step title="Short-time / perturbative limit">
            For <strong>absorption</strong> (atom starts low),{" "}
            <Tex>{String.raw`C_{a,n}(0)=0,\ C_{b,n+1}(0)=1`}</Tex> (Eq. 72), integrating (70) to first order gives a{" "}
            <Tex>{String.raw`\mathrm{sinc}^2`}</Tex> lineshape in detuning:
            <KeyResult
              number="75"
              eq={String.raw`|C_{a,n}(t)|^2 = g^2(n+1)\,\frac{\sin^2[(\Omega-\omega)t/2]}{[(\Omega-\omega)/2]^2}.`}
              label="First-order absorption probability"
            />
            For <strong>emission</strong> the initial conditions interchange,{" "}
            <Tex>{String.raw`C_{a,n}(0)=1,\ C_{b,n+1}(0)=0`}</Tex> (Eq. 76), giving the same form
            <EqBlock label="77">{String.raw`|C_{b,n+1}(t)|^2 = g^2(n+1)\,\frac{\sin^2[(\Omega-\omega)t/2]}{[(\Omega-\omega)/2]^2},`}</EqBlock>
            and on resonance with <Tex>{String.raw`n=0`}</Tex> the short-time spontaneous-emission probability grows as
            <EqBlock label="78">{String.raw`|C_{b,n+1}(t)|^2 \simeq g^2 t^2 \qquad (n=0,\ \Omega=\omega).`}</EqBlock>
            This <Tex>{String.raw`g^2 t^2`}</Tex> growth is only the short-time piece — <em>not</em> exponential decay.
          </Step>
          <Step title="Exact resonant solution: Rabi flopping">
            On resonance <Tex>{String.raw`\Omega=\omega`}</Tex> the exponentials vanish; differentiate (70) and
            substitute (71):
            <EqBlock label="79">{String.raw`\ddot C_{a,n}(t) = -g^2(n+1)\,C_{a,n}(t),`}</EqBlock>
            a simple SHO equation oscillating at the quantized Rabi frequency <Tex>{String.raw`g\sqrt{n+1}`}</Tex>:
            <EqBlock label="80">{String.raw`C_{a,n}(t) = A\sin\!\big(g\sqrt{n+1}\,t\big) + B\cos\!\big(g\sqrt{n+1}\,t\big).`}</EqBlock>
            With the <strong>emission</strong> initial condition,
            <EqBlock label="84,85">{String.raw`C_{a,n}(t) = \cos\!\big(g\sqrt{n+1}\,t\big), \qquad C_{b,n+1}(t) = -i\sin\!\big(g\sqrt{n+1}\,t\big),`}</EqBlock>
            while for <strong>absorption</strong> the roles of upper and lower amplitudes simply interchange:
            <EqBlock label="82,83">{String.raw`C_{a,n}(t) = -i\sin\!\big(g\sqrt{n+1}\,t\big), \qquad C_{b,n+1}(t) = \cos\!\big(g\sqrt{n+1}\,t\big)`}</EqBlock>
            The atom periodically emits and reabsorbs its photon — reversible, because there is only one mode.
          </Step>
        </Derivation>

        <KeyResult
          eq={String.raw`C_{a,n}(t) = \cos\!\big(g\sqrt{n+1}\,t\big), \qquad |C_{b,n+1}(t)|^2 = \sin^2\!\big(g\sqrt{n+1}\,t\big)`}
          label="Quantized Rabi flopping (Eqs. 84–85)"
          note={
            <>
              The atom oscillates between <Tex>{String.raw`|a,n\rangle`}</Tex> and{" "}
              <Tex>{String.raw`|b,n+1\rangle`}</Tex> at the quantized Rabi (flopping) frequency{" "}
              <Tex>{String.raw`\Omega_{\text{Rabi}} = g\sqrt{n+1}`}</Tex>. The <Tex>{String.raw`\sqrt{n+1}`}</Tex> —
              nonzero even for <Tex>{String.raw`n=0`}</Tex> — is the vacuum Rabi oscillation.
            </>
          }
        />

        <SimFrame
          title="Quantized Rabi flopping vs. Weisskopf–Wigner decay: one mode or many"
          caption={
            <>
              An excited atom exchanges energy with a quantized field. In <strong>single-mode</strong> mode it flops
              reversibly at <Tex>{String.raw`g\sqrt{n+1}`}</Tex> (Eqs. 82–85, integrated live by RK4). Flip to{" "}
              <strong>continuum</strong> to overlay the irreversible Weisskopf–Wigner envelope{" "}
              <Tex>{String.raw`e^{-\gamma_a t}`}</Tex>. The right panel shows the perturbative detuning lineshape of
              Eq.&nbsp;(75). The sim&rsquo;s readout reports{" "}
              <Tex>{String.raw`\Omega_{\text{Rabi}} = 2g\sqrt{n+1}`}</Tex> — the <em>population</em>-oscillation rate,
              which is twice the book&rsquo;s <em>amplitude</em> flopping frequency{" "}
              <Tex>{String.raw`g\sqrt{n+1}`}</Tex> (the frequency inside the <Tex>{String.raw`\cos/\sin`}</Tex> of
              Eqs.&nbsp;82–85); the two should not be confused.
            </>
          }
          tryThis={
            <>
              Set <Tex>{String.raw`n=0`}</Tex> in single-mode mode: the atom <em>still</em> flops at{" "}
              <Tex>{String.raw`g`}</Tex> — the <strong>vacuum Rabi flop</strong>, impossible in semiclassical theory.
              Now raise <Tex>{String.raw`n`}</Tex> and watch the flopping speed up as{" "}
              <Tex>{String.raw`\sqrt{n+1}`}</Tex>. Switch to continuum and the same atom decays smoothly with no
              revival — energy has escaped into the continuum. On the lineshape panel, increase{" "}
              <Tex>{String.raw`t`}</Tex> and the resonance peak narrows as <Tex>{String.raw`1/t`}</Tex>.
            </>
          }
        >
          <Ch14Sim />
        </SimFrame>

        <Callout kind="insight" title="The vacuum Rabi flop (n=0)">
          Set <Tex>{String.raw`n=0`}</Tex>: the atom still flops at frequency{" "}
          <Tex>{String.raw`g\sqrt{1}=g`}</Tex>. With <em>no</em> photons present the field still drives the atom. This
          is the quantum birth of spontaneous emission — impossible in semiclassical theory, where{" "}
          <Tex>{String.raw`E=0`}</Tex> means no driving.
        </Callout>
        <Callout kind="insight" title="Quantum vs. semiclassical Rabi">
          Semiclassical Rabi flopping used a c-number amplitude <Tex>{String.raw`E_0`}</Tex> with frequency{" "}
          <Tex>{String.raw`\propto E_0`}</Tex>. Here <Tex>{String.raw`E_0`}</Tex> is replaced by{" "}
          <Tex>{String.raw`\mathscr E\sqrt{n+1}`}</Tex>. For large <Tex>{String.raw`n`}</Tex>,{" "}
          <Tex>{String.raw`\sqrt{n+1}\approx\sqrt{n}`}</Tex> recovers the classical result — but the{" "}
          <Tex>{String.raw`+1`}</Tex>, the spontaneous part, is purely quantum.
        </Callout>
        <Callout kind="warning" title="Two appearances of spontaneous emission">
          Eq. (78) gives spontaneous emission as <Tex>{String.raw`g^2 t^2`}</Tex> (single mode, short time,
          reversible). The next section gives it as <Tex>{String.raw`e^{-\gamma_a t}`}</Tex> (continuum of modes,
          irreversible). Do not confuse them — the difference is one mode versus infinitely many.
        </Callout>
      </Section>

      {/* ════════════════════════ SECTION 5 ════════════════════════ */}
      <Section title="Weisskopf–Wigner theory: irreversible decay and the natural linewidth">
        <Intuition>
          A single mode gives reversible flopping — the atom keeps reabsorbing its own photon. But a real atom sees a{" "}
          <em>continuum</em> of modes. Once the photon escapes into one of countless modes, the chance it returns to
          that exact mode to be reabsorbed is essentially zero, so the emission becomes irreversible. Weisskopf–Wigner
          theory makes this precise: couple the excited atom to <em>all</em> the one-photon states, turn the mode sum
          into an integral over a smooth density of states, and the rapidly oscillating phases collapse into a
          delta-function (energy conservation) plus a tiny level shift. The excited amplitude then decays
          exponentially, defining a lifetime <Tex>{String.raw`\tau`}</Tex> and a natural linewidth{" "}
          <Tex>{String.raw`\Delta E = \hbar/\tau`}</Tex>. This is the chapter&rsquo;s ultimate payoff.
        </Intuition>

        <p>An excited level that lives only a time <Tex>{String.raw`\tau`}</Tex> has a fuzzy energy:</p>
        <KeyResult
          number="86"
          eq={String.raw`\Delta E = \frac{\hbar}{\tau}.`}
          label="Energy–time uncertainty → natural linewidth"
        />
        <p>The multimode RWA Hamiltonian and its interaction-picture coupling to the continuum are</p>
        <EqBlock label="87">{String.raw`\mathscr{H} = \sum_k \hbar\Omega_k\left(a_k^\dagger a_k + \tfrac{1}{2}\right) + \hbar\tfrac{1}{2}\omega\sigma_z + \hbar\sum_k g_k\left(\sigma a_k^\dagger + a_k\sigma^\dagger\right),`}</EqBlock>
        <EqBlock label="88">{String.raw`\mathscr{V}_I(t) = \hbar\sum_k g_k\left[\sigma a_k^\dagger\,e^{i(\Omega_k-\omega)t} + a_k\sigma^\dagger\,e^{-i(\Omega_k-\omega)t}\right],`}</EqBlock>
        <p>and the general atom-plus-multimode state is</p>
        <EqBlock label="89">{String.raw`|\psi\rangle = \sum_{n_1 n_2 \ldots} C_{a, n_1 n_2 \ldots}(t)\,|a\rangle|n_1 n_2 \ldots\rangle + (b\text{-terms}).`}</EqBlock>

        <Derivation title="Couple to the continuum and resum into exponential decay">
          <Step title="Couple to the continuum">
            With the atom excited and the field in vacuum, the excited amplitude feeds every one-photon mode:
            <EqBlock label="95">{String.raw`\dot C_{a, n_1 n_2 \ldots 0_k \ldots}(t) = -i\sum_k \sqrt{n_k + 1}\,g_k\,e^{-i(\Omega_k-\omega)t}\,C_{b,\ldots n_k+1 \ldots}(t).`}</EqBlock>
            Formally integrate the lower-state equations and substitute back to get a single integro-differential
            equation for <Tex>{String.raw`C_{a,0}`}</Tex>:
            <EqBlock label="98–100">{String.raw`\dot C_{a,0}(t) = -\sum_k g_k^2\int_0^t dt'\,e^{-i(\Omega_k-\omega)(t-t')}\,C_{a,0}(t').`}</EqBlock>
          </Step>
          <Step title="Density of modes and the Weisskopf–Wigner approximation">
            Convert the discrete mode sum to an integral over a smooth density of states{" "}
            <Tex>{String.raw`\mathfrak{D}(\Omega)`}</Tex>:
            <EqBlock label="101">{String.raw`\sum_k \rightarrow \int d\Omega\,\mathfrak{D}(\Omega).`}</EqBlock>
            Because <Tex>{String.raw`\mathfrak D`}</Tex> and <Tex>{String.raw`g`}</Tex> vary slowly across the narrow
            band that contributes, pull them out at <Tex>{String.raw`\Omega=\omega`}</Tex>:
            <EqBlock label="102">{String.raw`\dot C_{a,0}(t) = -g^2(\omega)\,\mathfrak{D}(\omega)\int d\Omega\int_0^t dt'\,e^{-i(\Omega-\omega)(t-t')}\,C_{a,0}(t').`}</EqBlock>
            The long-time limit of the time integral gives a delta-function (energy conservation) plus a principal-value
            level shift (the Lamb-type shift, dropped here):
            <EqBlock label="103">{String.raw`\int_0^t dt'\,e^{-i(\Omega-\omega)(t-t')} = \pi\delta(\Omega-\omega) - i\,\mathscr{P}\!\left(\frac{1}{\Omega-\omega}\right).`}</EqBlock>
          </Step>
          <Step title="Exponential decay and the rate">
            The delta-function makes the equation local in time. Discarding the imaginary (level-shift) part,
            <KeyResult
              number="104"
              eq={String.raw`\dot C_{a,0}(t) = -\tfrac{1}{2}\gamma_a\,C_{a,0}(t),`}
              label="Excited-state amplitude decay"
            />
            with the rate in Fermi-golden-rule form:
            <EqBlock label="105">{String.raw`\gamma_a = 2\pi g^2(\omega)\,\mathfrak{D}(\omega).`}</EqBlock>
            Integrating: the amplitude decays at <Tex>{String.raw`\tfrac12\gamma_a`}</Tex> but the probability at the
            full rate <Tex>{String.raw`\gamma_a`}</Tex>:
            <EqBlock>{String.raw`C_{a,0}(t) = e^{-\frac{1}{2}\gamma_a t} \;\Rightarrow\; |C_{a,0}(t)|^2 = e^{-\gamma_a t}, \qquad \tau = \frac{1}{\gamma_a}.`}</EqBlock>
          </Step>
          <Step title="Density-matrix description">
            During decay the state is
            <EqBlock label="106">{String.raw`|\psi(t)\rangle = C_{a,0}(t)\,|a\rangle|0\rangle + \sum_k C_{b,1_k}(t)\,|b\rangle|1_k\rangle,`}</EqBlock>
            and probability is conserved — what the atom loses, the emitted field gains:
            <EqBlock label="107">{String.raw`\sum_k |C_{b,1_k}(t)|^2 = 1 - |C_{a,0}(t)|^2,`}</EqBlock>
            <EqBlock label="108">{String.raw`\frac{d}{dt}\sum_k |C_{b,1_k}(t)|^2 = -\frac{d}{dt}|C_{a,0}(t)|^2 = \gamma_a |C_{a,0}(t)|^2.`}</EqBlock>
            Form the atom-plus-field density operator and trace out the field:
            <EqBlock label="109">{String.raw`\rho_{a+f}(t) = |C_{a,0}|^2\,|a\rangle\langle a|\,|0\rangle\langle 0| + \sum_k |C_{b,1_k}|^2\,|b\rangle\langle b|\,|1_k\rangle\langle 1_k| + (\text{field off-diagonal}),`}</EqBlock>
            <EqBlock label="110">{String.raw`\rho_{\text{atom}} = \mathrm{Tr}_{\text{field}}\,\rho_{a+f} = \rho_{aa}|a\rangle\langle a| + \rho_{bb}|b\rangle\langle b|,`}</EqBlock>
            <EqBlock label="111,112">{String.raw`\rho_{aa} = \sum_k P_k|C_{a,0_k}|^2, \qquad \rho_{bb} = \sum_k P_k|C_{b,1_k}|^2.`}</EqBlock>
            The orthogonal one-photon states make the atomic coherences average away, leaving a pure population rate
            equation:
            <KeyResult
              number="113"
              eq={String.raw`\dot\rho_{bb} = -\dot\rho_{aa} = \gamma_a\,\rho_{aa}.`}
              label="Spontaneous population transfer"
            />
          </Step>
        </Derivation>

        <KeyResult
          eq={String.raw`\dot C_{a,0} = -\tfrac{1}{2}\gamma_a C_{a,0} \;\Rightarrow\; |C_{a,0}(t)|^2 = e^{-\gamma_a t}, \qquad \gamma_a = 2\pi g^2(\omega)\,\mathfrak{D}(\omega)`}
          label="Weisskopf–Wigner spontaneous decay (Eqs. 104–105)"
          note={
            <>
              Coupling to the continuum turns reversible Rabi flopping into irreversible exponential decay at rate{" "}
              <Tex>{String.raw`\gamma_a`}</Tex> — Fermi&rsquo;s golden rule — defining the lifetime{" "}
              <Tex>{String.raw`\tau=1/\gamma_a`}</Tex> and natural linewidth <Tex>{String.raw`\Delta E=\hbar/\tau`}</Tex>.
            </>
          }
        />

        <Figure
          caption={
            <>
              Reversible vs. irreversible. <span style={{ color: "#e11d48" }}>One mode</span>: the photon is emitted and
              reabsorbed, so the excited population oscillates. <span style={{ color: "#7c3aed" }}>A continuum</span>:
              the photon escapes into modes it cannot return from, so the population decays as{" "}
              <Tex>{String.raw`e^{-\gamma_a t}`}</Tex>.
            </>
          }
        >
          <svg viewBox="0 0 460 220" width="100%" role="img" aria-label="Reversible Rabi flop versus irreversible Weisskopf-Wigner decay">
            {/* axes */}
            <line x1="40" y1="20" x2="40" y2="180" stroke="#94a3b8" strokeWidth="1.3" />
            <line x1="40" y1="180" x2="440" y2="180" stroke="#94a3b8" strokeWidth="1.3" />
            <text x="14" y="28" fontSize="11" fill="#475569" fontFamily="ui-sans-serif, system-ui">P_a</text>
            <text x="420" y="196" fontSize="11" fill="#475569" fontFamily="ui-sans-serif, system-ui">t</text>
            {/* reversible cos^2 curve */}
            <path
              d="M40,20 C70,180 100,180 130,20 C160,180 190,180 220,20 C250,180 280,180 310,20 C340,180 370,180 400,20"
              fill="none"
              stroke="#e11d48"
              strokeWidth="2.2"
            />
            <text x="120" y="14" fontSize="11" fill="#e11d48" fontFamily="ui-sans-serif, system-ui">single mode: cos²(g√(n+1) t)</text>
            {/* irreversible exponential */}
            <path
              d="M40,20 C120,90 220,150 440,176"
              fill="none"
              stroke="#7c3aed"
              strokeWidth="2.4"
              strokeDasharray="7 4"
            />
            <text x="250" y="120" fontSize="11" fill="#7c3aed" fontFamily="ui-sans-serif, system-ui">continuum: e^(−γₐt)</text>
          </svg>
        </Figure>

        <Callout kind="insight" title="Reversible to irreversible">
          One mode: a reversible Rabi flop. A continuum: irreversible exponential decay. The difference is the photon
          escaping into infinitely many modes it cannot return from — this is how a continuum manufactures
          irreversibility out of reversible quantum mechanics.
        </Callout>
        <Callout kind="insight" title="Why the line has width">
          An excited level lives only <Tex>{String.raw`\tau`}</Tex>, so by{" "}
          <Tex>{String.raw`\Delta E\,\tau \sim \hbar`}</Tex> its energy is fuzzy by{" "}
          <Tex>{String.raw`\hbar/\tau`}</Tex>. The emitted light is therefore not monochromatic: it has a Lorentzian
          profile of width <Tex>{String.raw`\gamma_a`}</Tex>. This <strong>natural linewidth</strong> is the floor on a
          laser&rsquo;s linewidth.
        </Callout>
        <Callout kind="warning" title="The factor of ½">
          The <strong>amplitude</strong> decays at half the rate, <Tex>{String.raw`\tfrac12\gamma_a`}</Tex> (Eq. 104);
          the <strong>probability / population</strong> decays at the full rate <Tex>{String.raw`\gamma_a`}</Tex>.
          Mixing these up is the classic error here.
        </Callout>
      </Section>

      {/* ════════════════════════ CARRY-FORWARD ════════════════════════ */}
      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from this chapter">
          <ul>
            <li>
              <strong>The boson ladder algebra</strong>: <Tex>{String.raw`[a,a^\dagger]=1`}</Tex>,{" "}
              <Tex>{String.raw`a|n\rangle=\sqrt n|n-1\rangle`}</Tex>,{" "}
              <Tex>{String.raw`a^\dagger|n\rangle=\sqrt{n+1}|n+1\rangle`}</Tex>, number operator{" "}
              <Tex>{String.raw`a^\dagger a`}</Tex> — the universal language for quantized fields in every later chapter.
            </li>
            <li>
              <strong>A photon is an energy quantum</strong> <Tex>{String.raw`\hbar\Omega`}</Tex> of a field mode, not
              a localized particle. Number states <Tex>{String.raw`|n\rangle`}</Tex> have definite energy but{" "}
              <em>zero</em> mean field and no phase.
            </li>
            <li>
              <strong>Vacuum fluctuations</strong>: <Tex>{String.raw`\langle E\rangle=0`}</Tex> but{" "}
              <Tex>{String.raw`\langle E^2\rangle\neq 0`}</Tex> even at <Tex>{String.raw`n=0`}</Tex> (Eq. 34) — the
              zero-point field is real and is the engine of spontaneous emission.
            </li>
            <li>
              <strong>The field-per-photon scale</strong>{" "}
              <Tex>{String.raw`\mathscr E=(\hbar\Omega/\varepsilon_0 V)^{1/2}`}</Tex> (Eq. 17) sets the size of all
              single-photon effects.
            </li>
            <li>
              <strong>The Jaynes–Cummings Hamiltonian and the RWA</strong>: keep only the energy-conserving terms{" "}
              <Tex>{String.raw`\sigma a^\dagger`}</Tex> and <Tex>{String.raw`\sigma^\dagger a`}</Tex> — the workhorse
              interaction for the rest of the quantum-optics chapters.
            </li>
            <li>
              <strong>Quantized Rabi frequency</strong> <Tex>{String.raw`g\sqrt{n+1}`}</Tex>: the classical Rabi
              frequency with <Tex>{String.raw`\sqrt{n+1}`}</Tex> replacing the c-number amplitude. The{" "}
              <Tex>{String.raw`+1`}</Tex> is the spontaneous (vacuum) contribution.
            </li>
            <li>
              <strong>Weisskopf–Wigner</strong>: a continuum converts reversible oscillation into irreversible
              exponential decay; <Tex>{String.raw`\gamma_a = 2\pi g^2(\omega)\,\mathfrak D(\omega)`}</Tex> is
              Fermi&rsquo;s golden rule. Lifetime <Tex>{String.raw`\tau=1/\gamma_a`}</Tex>, natural (Lorentzian)
              linewidth <Tex>{String.raw`\Delta E=\hbar/\tau`}</Tex>.
            </li>
            <li>
              <strong>The factor of two</strong>: amplitude decays at <Tex>{String.raw`\tfrac12\gamma_a`}</Tex>,
              probability/population at <Tex>{String.raw`\gamma_a`}</Tex> — a factor that recurs throughout decay theory.
            </li>
            <li>
              <strong>Tracing out the field</strong> gives the reduced atomic density matrix and the rate equation{" "}
              <Tex>{String.raw`\dot\rho_{bb}=\gamma_a\rho_{aa}`}</Tex> — the seed of the laser master equation in later
              chapters.
            </li>
            <li>
              <strong>A classical-looking (coherent) field</strong> is a superposition of number states with a Poisson
              distribution (Eq. 35) — developed fully in Chapter&nbsp;XV.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
