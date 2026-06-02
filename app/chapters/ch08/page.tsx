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
import Ch08Sim from "@/components/sims/ch08";

export default function Page() {
  return (
    <Lesson slug="ch08">
      <Lede>
        A laser is a feedback loop made physical. The field standing in the cavity tickles the atoms; the atoms answer
        quantum-mechanically with oscillating dipoles; you statistically add up all those dipoles into a macroscopic
        polarization <Tex>{String.raw`P(z,t)`}</Tex>; that polarization is a source in Maxwell&rsquo;s equations; and
        Maxwell hands you back a field. The whole chapter rests on one demand —{" "}
        <strong>the field you assume must equal the field that comes out</strong>. That single{" "}
        <em>self-consistency</em> condition delivers everything a laser engineer wants: the threshold pump, the
        steady-state intensity, the turn-on transient, and the exact frequency the laser oscillates at.
      </Lede>

      <Section title="The self-consistency idea: why a laser is a feedback loop">
        <Intuition>
          In Chapter&nbsp;V we found a steady-state intensity by demanding energy balance (gain&nbsp;=&nbsp;loss). That
          works, but it is mute about time, frequency, and refraction. The semiclassical method is more powerful: it
          makes the <em>field itself</em> the unknown and closes a loop on it. <strong>Assume</strong> a field{" "}
          <Tex>{String.raw`\mathbf E(z,t)`}</Tex> exists in the cavity. It drives each atom (quantum mechanics),
          inducing a microscopic dipole <Tex>{String.raw`\langle \mathbf p\rangle`}</Tex>. You{" "}
          <strong>statistically sum</strong> over all atoms — different positions, excitation times, velocities — to
          build the macroscopic polarization <Tex>{String.raw`\mathbf P(z,t)`}</Tex>. That <Tex>{String.raw`\mathbf P`}</Tex>{" "}
          sources Maxwell&rsquo;s equations, which radiate a <strong>new</strong> field{" "}
          <Tex>{String.raw`\mathbf E'(z,t)`}</Tex>. Self-consistency is the demand{" "}
          <Tex>{String.raw`\mathbf E' = \mathbf E`}</Tex>.
        </Intuition>
        <KeyResult
          number="Fig 8-1"
          eq={String.raw`\mathbf{E}(z,t)\;\xrightarrow{\text{quantum mechanics}}\;\langle \mathbf{p}\rangle\;\xrightarrow{\text{statistical summation}}\;\mathbf{P}(z,t)\;\xrightarrow{\text{Maxwell's equations}}\;\mathbf{E}'(z,t)`}
          label="The self-consistency loop"
          note={
            <>
              The organizing principle of the entire chapter. Closing the loop by demanding{" "}
              <Tex>{String.raw`\mathbf E' = \mathbf E`}</Tex> — separately for amplitude and for phase — yields{" "}
              <em>two</em> equations: one for intensity/gain, one for frequency/pulling.
            </>
          }
        />

        <Figure
          caption={
            <>
              Fig 8-1. The four stages of the loop. An assumed field induces dipoles, the dipoles are summed into a
              polarization, the polarization sources Maxwell, and the loop is closed by{" "}
              <Tex>{String.raw`\mathbf E' = \mathbf E`}</Tex>.
            </>
          }
        >
          <svg viewBox="0 0 640 180" width="100%">
            {[
              { x: 40, t: "E(z,t)", s: "assumed field" },
              { x: 200, t: "⟨p⟩", s: "quantum dipole" },
              { x: 360, t: "P(z,t)", s: "statistical sum" },
              { x: 520, t: "E′(z,t)", s: "Maxwell radiates" },
            ].map((b, i) => (
              <g key={i}>
                <rect x={b.x} y={56} width={108} height={52} rx={8} fill="#eef2ff" stroke="#4f46e5" />
                <text x={b.x + 54} y={80} textAnchor="middle" fontSize="17" fontWeight="600" fill="#1f2733">
                  {b.t}
                </text>
                <text x={b.x + 54} y={98} textAnchor="middle" fontSize="10" fill="#5b6473">
                  {b.s}
                </text>
              </g>
            ))}
            {[148, 308, 468].map((x, i) => (
              <g key={i}>
                <line x1={x} y1={82} x2={x + 52} y2={82} stroke="#9aa3b2" strokeWidth="2" />
                <polygon points={`${x + 52},82 ${x + 44},78 ${x + 44},86`} fill="#9aa3b2" />
              </g>
            ))}
            {/* feedback arrow E' -> E */}
            <path d="M 574 108 L 574 150 L 94 150 L 94 108" fill="none" stroke="#e11d48" strokeWidth="2" />
            <polygon points="94,108 90,118 98,118" fill="#e11d48" />
            <text x={334} y={166} textAnchor="middle" fontSize="12" fontWeight="600" fill="#e11d48">
              self-consistency: E′ = E
            </text>
          </svg>
        </Figure>

        <Derivation title="Read the loop the way the chapter does" defaultOpen={false}>
          <Step title="Identify the four stages">
            <Tex>{String.raw`E`}</Tex> drives atoms (the quantum step, §8-2); the atoms are summed into{" "}
            <Tex>{String.raw`P`}</Tex> (the statistical step); <Tex>{String.raw`P`}</Tex> sources Maxwell (the
            classical step, §8-1) to give <Tex>{String.raw`E'`}</Tex>; and <Tex>{String.raw`E' = E`}</Tex> closes it.
            Crucially, amplitude self-consistency and phase self-consistency are <em>independent</em> conditions, so the
            single loop yields two equations — one for gain, one for frequency.
          </Step>
          <Step title="Contrast with energy balance">
            The Chapter-V energy-conservation argument is just a special case that finds only the steady-state
            intensity. Self-consistency additionally yields the time dependence, the threshold, the refractive index,
            and the frequency pulling — everything dynamical and dispersive.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Semiclassical = classical field + quantum medium">
          The radiation field obeys Maxwell&rsquo;s equations (no photons, no field quantization); only the atoms are
          quantized, through a density matrix. This is exact enough for amplitudes, frequencies, and saturation, and
          fails only for genuinely quantum effects — spontaneous-emission noise and the quantum linewidth — which wait
          for the later chapters.
        </Callout>
      </Section>

      <Section title="Maxwell's leg: the field equations and the two self-consistency equations">
        <Intuition>
          This is the <strong>classical</strong> leg: given the polarization <Tex>{String.raw`P`}</Tex>, what field does
          the cavity support? Start from Maxwell&rsquo;s equations inside the medium. The mirrors leak, light diffracts,
          and scatters — rather than model the open resonator exactly, we fake all those losses with a single
          phenomenological conductivity <Tex>{String.raw`\sigma`}</Tex>. Because the cavity is high-<Tex>{String.raw`Q`}</Tex>,
          the field is nearly a sum of discrete standing-wave modes oscillating near their empty-cavity frequencies.
          Expand in those modes, project onto one, and separate real and imaginary parts: the{" "}
          <strong>imaginary</strong> (in-quadrature) part of the polarization governs amplitude (gain vs. loss), the{" "}
          <strong>real</strong> (in-phase) part governs frequency (pulling). Those two are the spine of the chapter.
        </Intuition>

        <p>
          Maxwell&rsquo;s equations in MKS units inside the charge-free medium, with a loss current{" "}
          <Tex>{String.raw`\mathbf J`}</Tex>, plus the constitutive relations:
        </p>
        <EqBlock label="1">{String.raw`\operatorname{div}\mathbf{D}=0,\quad \operatorname{div}\mathbf{B}=0,\quad \operatorname{curl}\mathbf{E}=-\dfrac{\partial \mathbf{B}}{\partial t},\quad \operatorname{curl}\mathbf{H}=\mathbf{J}+\dfrac{\partial \mathbf{D}}{\partial t}`}</EqBlock>
        <EqBlock label="2">{String.raw`\mathbf{D}=\varepsilon_0\mathbf{E}+\mathbf{P},\qquad \mathbf{B}=\mu_0\mathbf{H},\qquad \mathbf{J}=\sigma\mathbf{E}`}</EqBlock>
        <p>
          The polarization <Tex>{String.raw`\mathbf P`}</Tex> adds to the vacuum displacement, the medium is
          non-magnetic, and Ohm&rsquo;s law with phenomenological <Tex>{String.raw`\sigma`}</Tex> stands in for the
          cavity loss.
        </p>

        <Derivation title="Maxwell → the driven wave equation → two self-consistency equations">
          <Step title="Eliminate H to get a driven wave equation">
            Take the curl of <Tex>{String.raw`\operatorname{curl}\mathbf E = -\partial_t\mathbf B`}</Tex> and substitute{" "}
            <Tex>{String.raw`\mathbf B=\mu_0\mathbf H`}</Tex>, <Tex>{String.raw`\operatorname{curl}\mathbf H=\sigma\mathbf E+\partial_t\mathbf D`}</Tex>,{" "}
            <Tex>{String.raw`\mathbf D=\varepsilon_0\mathbf E+\mathbf P`}</Tex>. The source is the second time derivative
            of the polarization; the <Tex>{String.raw`\sigma`}</Tex> term is the loss:
            <EqBlock label="3">{String.raw`\operatorname{curl}\operatorname{curl}\mathbf{E}+\mu_0\sigma\dfrac{\partial \mathbf{E}}{\partial t}+\mu_0\varepsilon_0\dfrac{\partial^2 \mathbf{E}}{\partial t^2}=-\mu_0\dfrac{\partial^2 \mathbf{P}}{\partial t^2}`}</EqBlock>
          </Step>
          <Step title="Reduce curl curl and expand in cavity modes">
            With <Tex>{String.raw`\operatorname{div}\mathbf E\approx 0`}</Tex> the double curl collapses:
            <EqBlock label="4">{String.raw`\operatorname{curl}\operatorname{curl}\mathbf{E}=-\nabla^2\mathbf{E}`}</EqBlock>
            The empty-cavity normal modes for length <Tex>{String.raw`L`}</Tex> have frequencies and spatial profiles
            <EqBlock label="5">{String.raw`\Omega_n=\dfrac{n\pi c}{L}=K_n c`}</EqBlock>
            <EqBlock label="6">{String.raw`U_n(z)=\sin(K_n z)`}</EqBlock>
            <EqBlock label="7">{String.raw`U_n(z)=\exp(iK_n z)\quad(\text{running-wave alternative})`}</EqBlock>
            with <Tex>{String.raw`n\sim 10^6`}</Tex> so the frequencies are optical, and{" "}
            <Tex>{String.raw`\nabla^2 U_n=-K_n^2 U_n`}</Tex>.
          </Step>
          <Step title="Slowly-varying field and polarization amplitudes">
            Expand both fields in the modes with slowly-varying complex amplitudes:
            <EqBlock label="8">{String.raw`E(z,t)=\tfrac{1}{2}\sum_n \mathscr{E}_n(t)\,U_n(z)+\text{c.c.},\qquad \mathscr{E}_n(t)=E_n(t)\,e^{-i(\nu_n t+\phi_n)}`}</EqBlock>
            <EqBlock label="9">{String.raw`P(z,t)=\tfrac{1}{2}\sum_n \mathscr{P}_n(t)\,U_n(z)+\text{c.c.},\qquad \mathscr{P}_n(t)=P_n(t)\,e^{-i(\nu_n t+\phi_n)}`}</EqBlock>
            Here <Tex>{String.raw`E_n,P_n`}</Tex> are real amplitudes, <Tex>{String.raw`\nu_n`}</Tex> the oscillation
            frequency, <Tex>{String.raw`\phi_n`}</Tex> a slow phase; <Tex>{String.raw`\dot E_n,\dot\phi_n`}</Tex> are
            tiny next to <Tex>{String.raw`\nu_n`}</Tex>.
          </Step>
          <Step title="Project onto mode n; drop second derivatives (SVA / RWA)">
            Substituting (8),(9) into (3) and projecting onto mode <Tex>{String.raw`n`}</Tex>, then dropping{" "}
            <Tex>{String.raw`\ddot{\mathscr{E}}_n`}</Tex> and <Tex>{String.raw`\ddot{\mathscr{P}}_n`}</Tex> (the
            slowly-varying-amplitude / rotating-wave step):
            <EqBlock>{String.raw`K_n^2\mathscr{E}_n+\mu_0\sigma\big[\dot{\mathscr{E}}_n-i(\nu_n+\dot\phi_n)\mathscr{E}_n\big]+\mu_0\varepsilon_0\big[-i\,2(\nu_n+\dot\phi_n)\dot{\mathscr{E}}_n-(\nu_n+\dot\phi_n)^2\mathscr{E}_n\big]=\mu_0(\nu_n+\dot\phi_n)^2\mathscr{P}_n`}</EqBlock>
          </Step>
          <Step title="Introduce the cavity Q and split real / imaginary parts">
            Trade the abstract <Tex>{String.raw`\sigma`}</Tex> for the measurable quality factor,
            <EqBlock label="10">{String.raw`\sigma=\varepsilon_0\dfrac{\nu_n}{Q_n}`}</EqBlock>
            Equate the <strong>real</strong> parts → amplitude equation; the <strong>imaginary</strong> parts →
            frequency equation:
            <EqBlock label="11">{String.raw`\dot E_n+\tfrac{1}{2}\dfrac{\nu_n}{Q_n}E_n=-\tfrac{1}{2}\dfrac{\nu_n}{\varepsilon_0}\,\mathrm{Im}(\mathscr{P}_n)`}</EqBlock>
            <EqBlock label="12">{String.raw`\nu_n+\dot\phi_n=\Omega_n-\tfrac{1}{2}\dfrac{\nu_n}{\varepsilon_0}\,\dfrac{\mathrm{Re}(\mathscr{P}_n)}{E_n}`}</EqBlock>
          </Step>
        </Derivation>

        <KeyResult
          number="11, 12"
          eq={String.raw`\underbrace{\dot E_n+\tfrac{1}{2}\dfrac{\nu_n}{Q_n}E_n=-\tfrac{1}{2}\dfrac{\nu_n}{\varepsilon_0}\,\mathrm{Im}(\mathscr{P}_n)}_{\text{amplitude}}\qquad\qquad \underbrace{\nu_n+\dot\phi_n=\Omega_n-\tfrac{1}{2}\dfrac{\nu_n}{\varepsilon_0}\,\dfrac{\mathrm{Re}(\mathscr{P}_n)}{E_n}}_{\text{frequency}}`}
          label="The two self-consistency equations"
          note={
            <>
              <strong>Imaginary</strong> part of <Tex>{String.raw`\mathscr P_n`}</Tex> → amplitude/gain.{" "}
              <strong>Real</strong> part → frequency/pulling. Every later result is one of these two.
            </>
          }
        />

        <p>
          Defining the complex susceptibility lets us write both equations compactly. With{" "}
          <Tex>{String.raw`\mathscr{P}_n=\varepsilon_0\chi_n\mathscr{E}_n`}</Tex>:
        </p>
        <EqBlock label="13">{String.raw`\mathscr{P}_n=\varepsilon_0\chi_n\mathscr{E}_n=\varepsilon_0(\chi'_n+i\chi''_n)\mathscr{E}_n`}</EqBlock>
        <EqBlock label="14">{String.raw`\dot E_n=-\tfrac{1}{2}\dfrac{\nu_n}{Q_n}E_n-\tfrac{1}{2}\nu_n\chi''_n E_n`}</EqBlock>
        <EqBlock label="15">{String.raw`\nu_n+\dot\phi_n=\Omega_n-\tfrac{1}{2}\nu_n\chi'_n`}</EqBlock>
        <p>
          Squaring (14) gives an equation of motion for the energy density{" "}
          <Tex>{String.raw`\mathscr{I}_n\propto E_n^2`}</Tex> — gain minus loss, at twice the field rate:
        </p>
        <EqBlock label="16, 17">{String.raw`\dot{\mathscr{I}}_n=\left(-\dfrac{\nu}{Q_n}-\nu\chi''_n\right)\mathscr{I}_n\quad\Longrightarrow\quad \text{steady state when } \chi''_n=-\dfrac{1}{Q_n}`}</EqBlock>
        <p>
          The real susceptibility is the refractive index in disguise. Defining{" "}
          <Tex>{String.raw`\eta(\nu_n)=\Omega_n/\nu_n`}</Tex> and using (15):
        </p>
        <EqBlock label="18">{String.raw`\eta(\nu_n)=\dfrac{K_n c}{\nu_n}=\dfrac{\Omega_n}{\nu_n}=\dfrac{\Omega_n}{\Omega_n-\tfrac{1}{2}\chi'_n\nu_n}`}</EqBlock>
        <EqBlock label="19">{String.raw`\eta(\nu_n)\cong 1+\tfrac{1}{2}\chi'_n`}</EqBlock>

        <Callout kind="warning" title="Sign convention for gain">
          <Tex>{String.raw`\chi''_n<0`}</Tex> means <em>amplification</em>; an absorbing medium has{" "}
          <Tex>{String.raw`\chi''_n>0`}</Tex>. The &ldquo;imaginary part is negative for a working laser&rdquo; trips up
          almost everyone — keep it straight.
        </Callout>
        <Callout kind="note" title="ν versus ν_n">
          The book sometimes writes <Tex>{String.raw`\nu`}</Tex> for <Tex>{String.raw`\nu_n`}</Tex>; which mode is a
          higher-order detail in single-mode operation. Treat them as the same frequency unless multimode coupling is in
          play.
        </Callout>
      </Section>

      <Section title="The quantum leg I: density-matrix equations of motion and pumping">
        <Intuition>
          Now the <strong>quantum</strong> leg: given the field, what dipole do the atoms make? Model the medium as
          two-level atoms — upper <Tex>{String.raw`a`}</Tex>, lower <Tex>{String.raw`b`}</Tex>, transition frequency{" "}
          <Tex>{String.raw`\omega`}</Tex>, homogeneously broadened. Atoms are not eternal: they are{" "}
          <strong>pumped in</strong> at rates <Tex>{String.raw`\lambda_a,\lambda_b`}</Tex> and{" "}
          <strong>decay out</strong> at <Tex>{String.raw`\gamma_a,\gamma_b`}</Tex>. While alive, each carries a{" "}
          <Tex>{String.raw`2\times2`}</Tex> density matrix: diagonal elements{" "}
          <Tex>{String.raw`\rho_{aa},\rho_{bb}`}</Tex> are populations, the off-diagonal{" "}
          <Tex>{String.raw`\rho_{ab}`}</Tex> is the <em>coherence</em> that radiates the dipole. The macroscopic
          polarization is the statistical sum of all those dipoles.
        </Intuition>

        <p>
          The polarization is the dipole moment <Tex>{String.raw`\wp(\rho_{ab}+\rho_{ba})`}</Tex> summed over every atom
          ever created, with creation rate <Tex>{String.raw`\lambda(z,t_0)`}</Tex>:
        </p>
        <EqBlock label="20">{String.raw`P(z,t)=\sum_{a,b}\int_{-\infty}^{t} dt_0\,\lambda(z,t_0)\,\wp\,\langle r\rangle=\wp\sum_{a,b}\int_{-\infty}^{t} dt_0\,\lambda(z,t_0)\big[\rho_{ab}(a,z,t_0,t)+\text{c.c.}\big]`}</EqBlock>
        <p>Projecting onto mode <Tex>{String.raw`n`}</Tex> (multiply by <Tex>{String.raw`U_n^*`}</Tex>, integrate):</p>
        <EqBlock label="21">{String.raw`\mathscr{P}_n(t)=2\wp\,e^{i(\nu_n t+\phi_n)}\dfrac{1}{\mathcal{N}_n}\int_0^{L} dz\,U_n^*(z)\sum_{a,b}\int_{-\infty}^{t} dt_0\,\lambda(z,t_0)\,\rho_{ab}(a,z,t_0,t)`}</EqBlock>
        <EqBlock label="22">{String.raw`\mathcal{N}_n=\int_0^{L} dz\,|U_n(z)|^2\;\;\Big(=\tfrac{L}{2}\text{ for sine modes}\Big)`}</EqBlock>

        <Derivation title="From the Liouville equation to three coupled equations" defaultOpen={false}>
          <Step title="Sum single-atom matrices into a population matrix">
            Collect all atoms regardless of creation time into one coarse-grained matrix,
            <EqBlock label="23">{String.raw`\rho(a,z,t)=\sum_{a,b}\int_{-\infty}^{t} dt_0\,\lambda(z,t_0)\,\rho(a,z,t_0,t)`}</EqBlock>
            whose time derivative has a boundary (pump source) term plus a coherent-evolution term:
            <EqBlock label="24">{String.raw`\dfrac{d\rho(z,t)}{dt}=\sum_{a,b}\lambda(z,t_0)\,\rho(a,z,t,t)+\sum_{a,b}\int_{-\infty}^{t} dt_0\,\lambda(z,t_0)\dfrac{\partial}{\partial t}\rho(a,z,t_0,t)`}</EqBlock>
          </Step>
          <Step title="The pump source term">
            A freshly created atom enters with population, no coherence:
            <EqBlock label="25">{String.raw`\rho(a,z,t_0,t_0)=\begin{pmatrix}\lambda_a & 0\\ 0 & \lambda_b\end{pmatrix}`}</EqBlock>
          </Step>
          <Step title="Liouville equation with decay and pump">
            Apply <Tex>{String.raw`\dot\rho=-\tfrac{i}{\hbar}[\mathscr H,\rho]+\text{pump}-\text{decay}`}</Tex> with{" "}
            <Tex>{String.raw`\mathscr H=\mathscr H_\text{atom}+\mathscr V`}</Tex>, <Tex>{String.raw`\mathscr V=-\wp E`}</Tex>.
            The off-diagonal gives the coherence, the diagonals the populations:
            <EqBlock label="26">{String.raw`\dot\rho_{ab}=-(i\omega+\gamma)\rho_{ab}+\tfrac{i}{\hbar}\mathscr{V}_{ab}(z)(\rho_{aa}-\rho_{bb})`}</EqBlock>
            <EqBlock label="27">{String.raw`\dot\rho_{aa}=\lambda_a-\gamma_a\rho_{aa}-\tfrac{i}{\hbar}\big(\mathscr{V}_{ab}\rho_{ba}+\text{c.c.}\big)`}</EqBlock>
            <EqBlock label="28">{String.raw`\dot\rho_{bb}=\lambda_b-\gamma_b\rho_{bb}+\tfrac{i}{\hbar}\big(\mathscr{V}_{ab}\rho_{ba}+\text{c.c.}\big)`}</EqBlock>
            with dipole-decay rate <Tex>{String.raw`\gamma=\tfrac{1}{2}(\gamma_a+\gamma_b)`}</Tex>.
          </Step>
          <Step title="Rotating-wave interaction and formal solution">
            Keep only the near-resonant piece of the interaction,
            <EqBlock label="31">{String.raw`\mathscr{V}_{ab}=-\tfrac{1}{2}\wp E_n(t)\exp[-i(\nu_n t+\phi_n)]\,U_n(z)`}</EqBlock>
            and integrate (26) formally into a damped, oscillating memory integral:
            <EqBlock label="30">{String.raw`\rho_{ab}(z,t)=\tfrac{i}{\hbar}\int_{-\infty}^{t} dt'\,e^{-(i\omega+\gamma)(t-t')}\,\mathscr{V}_{ab}(z,t')\big[\rho_{aa}(z,t')-\rho_{bb}(z,t')\big]`}</EqBlock>
          </Step>
        </Derivation>

        <KeyResult
          number="26"
          eq={String.raw`\dot\rho_{ab}=-(i\omega+\gamma)\rho_{ab}+\tfrac{i}{\hbar}\mathscr{V}_{ab}\,(\rho_{aa}-\rho_{bb})`}
          label="The dipole is sourced by the inversion"
          note={
            <>
              The crux of the quantum leg: the radiating coherence is driven by the field{" "}
              <Tex>{String.raw`\mathscr V_{ab}`}</Tex> <em>times</em> the population difference{" "}
              <Tex>{String.raw`\rho_{aa}-\rho_{bb}`}</Tex>. No inversion → no net dipole → no gain.
            </>
          }
        />

        <Callout kind="insight" title="The dipole is sourced by the inversion">
          Equation (26) is where gain lives. The field both <em>reads</em> the inversion (to make a dipole) and{" "}
          <em>depletes</em> it (by driving the populations). That feedback — field eats the very inversion that feeds it
          — is the nonlinearity that makes a laser a laser.
        </Callout>
        <Callout kind="note" title="Why γ = ½(γ_a + γ_b)">
          The coherence decays because <em>either</em> level can decay, so its rate is the average of the two population
          decay rates (plus phase-interrupting collisions in general). In NMR language{" "}
          <Tex>{String.raw`\gamma\approx 1/T_2`}</Tex>, while the population difference relaxes at{" "}
          <Tex>{String.raw`1/T_1`}</Tex>.
        </Callout>
      </Section>

      <Section title="The quantum leg II: saturation, hole burning, and the polarization">
        <Intuition>
          Here is the nonlinearity that <em>defines</em> a laser. Assume the coherence follows the field adiabatically
          (its memory time <Tex>{String.raw`1/\gamma`}</Tex> is short — the rate-equation approximation), substitute
          back, and find that a strong field <strong>burns down</strong> the population difference. The unsaturated
          inversion <Tex>{String.raw`N(z)`}</Tex> is divided by <Tex>{String.raw`1+R/R_s`}</Tex>: more intensity → less
          inversion → less gain. For a standing wave the field is strong at antinodes and zero at nodes, so the
          inversion is eaten unevenly — <strong>spatial hole burning</strong> (Fig 8-4).
        </Intuition>

        <p>Insert the rotating-wave field into the memory integral (30) and adiabatically eliminate the coherence:</p>
        <EqBlock label="32">{String.raw`\rho_{ab}(z,t)=-\tfrac{1}{2}i\wp\hbar^{-1}E_n\exp[-i(\nu_n t+\phi_n)]U_n(z)\dfrac{\rho_{aa}-\rho_{bb}}{i(\omega-\nu_n)+\gamma}`}</EqBlock>
        <p>
          The populations then obey rate equations with a single stimulated rate{" "}
          <Tex>{String.raw`R`}</Tex>:
        </p>
        <EqBlock label="33">{String.raw`\dot\rho_{aa}=\lambda_a-\gamma_a\rho_{aa}-R(\rho_{aa}-\rho_{bb})`}</EqBlock>
        <EqBlock label="34">{String.raw`\dot\rho_{bb}=\lambda_b-\gamma_b\rho_{bb}+R(\rho_{aa}-\rho_{bb})`}</EqBlock>
        <EqBlock label="35">{String.raw`R=\tfrac{1}{2}\left(\dfrac{\wp E_n}{\hbar}\right)^2\dfrac{1}{\gamma}\,\mathscr{L}(\omega-\nu_n)\,|U_n(z)|^2`}</EqBlock>
        <EqBlock label="36">{String.raw`\mathscr{L}(\omega-\nu_n)=\dfrac{\gamma^2}{\gamma^2+(\omega-\nu_n)^2}`}</EqBlock>

        <Derivation title="Solve the steady-state inversion; recognize hole burning" defaultOpen={false}>
          <Step title="Steady-state population difference">
            Set <Tex>{String.raw`\dot\rho_{aa}=\dot\rho_{bb}=0`}</Tex> in (33),(34) and subtract. The inversion is the
            unsaturated value divided by <Tex>{String.raw`1+R/R_s`}</Tex>:
            <EqBlock label="37">{String.raw`\rho_{aa}-\rho_{bb}=\dfrac{N(z)}{1+R/R_s}`}</EqBlock>
            <EqBlock label="38">{String.raw`R_s=\dfrac{\gamma_a\gamma_b}{\gamma_a+\gamma_b}=\dfrac{\gamma_a\gamma_b}{2\gamma_{ab}}=\tfrac{1}{2}T_1`}</EqBlock>
            <EqBlock label="39">{String.raw`N(z)=\dfrac{\lambda_a}{\gamma_a}-\dfrac{\lambda_b}{\gamma_b}`}</EqBlock>
          </Step>
          <Step title="Spatial hole burning">
            Because <Tex>{String.raw`R\propto|U_n(z)|^2=\sin^2(K_n z)`}</Tex> for a standing wave, the inversion is
            burned down at the antinodes and untouched at the nodes (Fig 8-4) — a population grating at twice the
            optical wavenumber.
          </Step>
          <Step title="Saturated polarization, expanded in the field">
            Insert the saturated inversion (37) into the polarization sum. The numerator{" "}
            <Tex>{String.raw`(\omega-\nu_n)+i\gamma`}</Tex> splits into a real (dispersive) and imaginary (absorptive)
            part; the denominator carries the saturation:
            <EqBlock label="40">{String.raw`\mathscr{P}_n(t)=-\wp^2\hbar^{-1}E_n\dfrac{(\omega-\nu_n)+i\gamma}{(\omega-\nu_n)^2+\gamma^2}\dfrac{1}{\mathcal{N}_n}\int_0^{L} dz\,\dfrac{|U_n(z)|^2\,N(z)}{1+R/R_s}`}</EqBlock>
            Dropping the saturation (weak field) and replacing <Tex>{String.raw`N(z)`}</Tex> by its mode-weighted
            average gives the linear polarization:
            <EqBlock label="41">{String.raw`\mathscr{P}_n^{(1)}(t)=-\wp^2\hbar^{-1}E_n\,\bar N\,\dfrac{(\omega-\nu_n)+i\gamma}{(\omega-\nu_n)^2+\gamma^2}`}</EqBlock>
            <EqBlock label="42">{String.raw`\bar N=\dfrac{1}{\mathcal{N}_n}\int_0^{L} dz\,|U_n(z)|^2 N(z)=\dfrac{2}{L}\int_0^{L} dz\,N(z)\sin^2(K_n z)`}</EqBlock>
          </Step>
          <Step title="The ⟨sin⁴⟩ average and the third-order term">
            Expanding <Tex>{String.raw`1/(1+R/R_s)\approx 1-R/R_s`}</Tex> and doing the spatial average produces the
            standing-wave hole-burning factor <Tex>{String.raw`\tfrac{3}{2}`}</Tex>:
            <EqBlock label="43">{String.raw`|U_n|^4=\tfrac{1}{4}(1-\cos 2K_n z)^2=\tfrac{3}{8}-\tfrac{1}{2}\cos 2K_n z+\tfrac{1}{8}\cos 4K_n z,\qquad \big\langle|U_n|^4\big\rangle=\tfrac{3}{8}`}</EqBlock>
            <EqBlock label="44">{String.raw`\mathscr{P}_n^{(1)+(3)}(t)=-\wp^2\hbar^{-1}E_n\bar N\,\dfrac{(\omega-\nu_n)+i\gamma}{(\omega-\nu_n)^2+\gamma^2}\left[1-\dfrac{3}{2}\dfrac{\gamma_{ab}\gamma I_n}{(\omega-\nu_n)^2+\gamma^2}\right]`}</EqBlock>
          </Step>
          <Step title="Sum the saturation exactly">
            For arbitrary intensity, integrate the full denominator over <Tex>{String.raw`z`}</Tex> to get a saturation
            function <Tex>{String.raw`f(w)`}</Tex> of the dimensionless saturation parameter <Tex>{String.raw`w`}</Tex>:
            <EqBlock label="46">{String.raw`\mathscr{P}_n(t)\simeq-\wp^2\hbar^{-1}E_n\bar N\,\dfrac{(\omega-\nu_n)+i\gamma}{(\omega-\nu_n)^2+\gamma^2\big[1+\tfrac{3}{2}(\gamma_{ab}/\gamma)I_n\big]}`}</EqBlock>
            <EqBlock label="47">{String.raw`\mathscr{P}_n(t)=-\wp^2\hbar^{-1}\bar N\,\dfrac{(\omega-\nu_n)+i\gamma}{(\omega-\nu_n)^2+\gamma^2}\,f(w)\,E_n`}</EqBlock>
            <EqBlock label="48">{String.raw`w=2\dfrac{\gamma_{ab}}{\gamma}\,I_n\,\mathscr{L}(\omega-\nu_n)`}</EqBlock>
            <EqBlock label="49">{String.raw`f(w)=\dfrac{2}{w}\big[1-(1+w)^{-1/2}\big]\;\xrightarrow{w\ll1}\;1-\tfrac{1}{2}w`}</EqBlock>
          </Step>
        </Derivation>

        <KeyResult
          number="37"
          eq={String.raw`\rho_{aa}-\rho_{bb}=\dfrac{N(z)}{1+R/R_s},\qquad R=\tfrac{1}{2}\left(\dfrac{\wp E_n}{\hbar}\right)^2\dfrac{1}{\gamma}\mathscr{L}(\omega-\nu_n),\qquad R_s=\dfrac{\gamma_a\gamma_b}{\gamma_a+\gamma_b}`}
          label="Saturated population difference (gain saturation)"
          note={
            <>
              The laser&rsquo;s defining nonlinearity. As intensity (hence <Tex>{String.raw`R`}</Tex>) grows, the
              inversion shrinks. This is what clamps the laser to a finite steady state instead of letting the gain run
              away.
            </>
          }
        />

        <p>
          One more variable collapses field strength, dipole moment, and linewidth into a single number — the{" "}
          <strong>dimensionless intensity</strong>:
        </p>
        <KeyResult
          number="45"
          eq={String.raw`I_n=\tfrac{1}{2}\dfrac{\wp^2}{\hbar^2\gamma_a\gamma_b}E_n^2`}
          label="Dimensionless intensity"
          note="Saturation, threshold, and steady state are all expressed in terms of I_n — the natural variable for the single-mode results."
        />

        <Figure
          caption={
            <>
              Fig 8-4. Spatial hole burning. The standing-wave field (top) saturates the inversion (bottom) hardest at
              its antinodes and not at all at its nodes, leaving leftover gain between the peaks.
            </>
          }
        >
          <svg viewBox="0 0 640 200" width="100%">
            {/* field */}
            {(() => {
              const pts: string[] = [];
              for (let i = 0; i <= 600; i += 4) {
                const z = i;
                const y = 50 - 30 * Math.sin((3 * Math.PI * z) / 600);
                pts.push(`${20 + z},${y}`);
              }
              return <polyline points={pts.join(" ")} fill="none" stroke="#4f46e5" strokeWidth="2.2" />;
            })()}
            <text x={28} y={20} fontSize="11" fill="#4f46e5">
              field U_n(z) = sin(K_n z)
            </text>
            {/* inversion bars */}
            {Array.from({ length: 75 }).map((_, j) => {
              const z = (j + 0.5) * 8;
              const s = Math.sin((3 * Math.PI * z) / 600);
              const inv = 1 / (1 + 2.2 * s * s);
              const barH = 70 * inv;
              return (
                <rect
                  key={j}
                  x={20 + z - 3.5}
                  y={180 - barH}
                  width={6.4}
                  height={barH}
                  fill="#0891b2"
                  opacity={0.3 + 0.6 * inv}
                />
              );
            })}
            <line x1={20} y1={180} x2={620} y2={180} stroke="#cbd5e1" strokeWidth="1" />
            <text x={28} y={108} fontSize="11" fill="#0891b2">
              inversion ρ_aa − ρ_bb = N/(1 + R/R_s)
            </text>
          </svg>
        </Figure>

        <Callout kind="insight" title="Spatial hole burning">
          A standing wave saturates the medium <Tex>{String.raw`\tfrac{3}{2}`}</Tex> times <em>more</em> per unit
          average intensity than a running wave (because the field piles up at the antinodes), and leaves leftover gain
          at the nodes. That leftover gain is the seed of multimode operation and the Lamb dip in later chapters.
        </Callout>
        <Callout kind="warning" title="Third-order theory overestimates saturation">
          The cubic <Tex>{String.raw`\beta_n I_n`}</Tex> term is the lowest-order nonlinearity; it overstates saturation
          at high intensity. Use the exact <Tex>{String.raw`f(w)=\tfrac{2}{w}[1-(1+w)^{-1/2}]`}</Tex> for strong fields.
          Third order is good to about 20% near threshold.
        </Callout>
      </Section>

      <Section title="Closing the loop: threshold, steady-state intensity, and frequency pulling">
        <Intuition>
          Close the loop for <strong>one</strong> mode and read off everything an operator measures. Substituting the
          third-order polarization (44) into the amplitude self-consistency equation (14) gives the iconic laser
          equation — net gain <Tex>{String.raw`\alpha_n`}</Tex> driving growth, self-saturation{" "}
          <Tex>{String.raw`\beta_n I_n`}</Tex> clamping it. It is a <em>logistic</em> equation: below threshold the field
          dies, above threshold it climbs the famous S-curve and settles. The frequency equation (15) gives the pulling:
          the laser oscillates between the empty-cavity frequency and the atomic line center, tugged by the dispersion.
        </Intuition>

        <KeyResult
          number="50"
          eq={String.raw`\dot E_n=E_n(\alpha_n-\beta_n I_n)`}
          label="The single-mode amplitude equation"
          note={
            <>
              Net gain <Tex>{String.raw`\alpha_n`}</Tex> (gain minus loss) drives growth; self-saturation{" "}
              <Tex>{String.raw`\beta_n I_n`}</Tex> clamps it. Logistic dynamics — the laser is a self-clamping
              amplifier.
            </>
          }
        />
        <EqBlock label="51">{String.raw`\dot I_n=2 I_n(\alpha_n-\beta_n I_n)`}</EqBlock>
        <EqBlock label="52">{String.raw`\nu_n+\dot\phi_n=\Omega_n+\sigma_n-\rho_n I_n`}</EqBlock>

        <p>The coefficients are collected in Table 8-1, built from the Lorentzian and first/third-order factors:</p>
        <EqBlock label="Table 8-1">{String.raw`\alpha_n=\mathscr{L}(\omega-\nu_n)F_1-\tfrac{1}{2}\dfrac{\nu}{Q_n},\quad \beta_n=\mathscr{L}(\omega-\nu_n)^2 F_3,\quad \sigma_n=\dfrac{\omega-\nu_n}{\gamma}\mathscr{L}\,F_1,\quad \rho_n=\dfrac{\omega-\nu_n}{\gamma}\mathscr{L}^2 F_3`}</EqBlock>
        <EqBlock label="F₁, F₃">{String.raw`F_1=\tfrac{1}{2}\dfrac{\nu_n}{\varepsilon_0}\dfrac{\wp^2\bar N}{\hbar\gamma},\qquad F_3=\tfrac{3}{2}\,\dfrac{\gamma_{ab}}{\gamma}\,F_1,\qquad \beta_n=\tfrac{3}{2}\,\dfrac{\gamma_{ab}}{\gamma}\,\mathfrak{N}\,\mathscr{L}^2\Big(\tfrac{1}{2}\dfrac{\nu}{Q_n}\Big)`}</EqBlock>

        <Derivation title="Threshold, steady state, the S-curve, and pulling" defaultOpen={false}>
          <Step title="Threshold: gain = loss">
            Set <Tex>{String.raw`\alpha_n=0`}</Tex> at resonance. The inversion at which mode-<Tex>{String.raw`n`}</Tex>{" "}
            gain exactly balances the cavity loss <Tex>{String.raw`1/Q_n`}</Tex> defines the threshold:
            <EqBlock label="53">{String.raw`\dfrac{\wp^2\bar N}{\varepsilon_0\hbar\gamma}=\dfrac{1}{Q_n}\quad(\text{defines }N_T)`}</EqBlock>
            <EqBlock label="54">{String.raw`\mathfrak{N}=\dfrac{\bar N}{N_T}`}</EqBlock>
            with <Tex>{String.raw`\mathfrak N>1`}</Tex> above threshold, <Tex>{String.raw`=1`}</Tex> at threshold.
          </Step>
          <Step title="Steady-state intensity">
            Set <Tex>{String.raw`\dot I_n=0`}</Tex> in (51): the nonzero root is{" "}
            <Tex>{String.raw`I_n=\alpha_n/\beta_n`}</Tex>, a Lorentzian tuning curve in detuning (Fig 8-5):
            <EqBlock label="55">{String.raw`I_n=\dfrac{\alpha_n}{\beta_n}=\dfrac{\mathfrak{N}\,\mathscr{L}(\omega-\nu_n)-1}{\tfrac{3}{2}\,\dfrac{\gamma_{ab}}{\gamma}\,\mathfrak{N}\,\mathscr{L}^2(\omega-\nu_n)}`}</EqBlock>
          </Step>
          <Step title="The buildup transient">
            Equation (51) is a logistic ODE; separating variables integrates to the exact S-curve (Fig 8-6):
            <EqBlock label="56">{String.raw`I_n(t)=\dfrac{\alpha_n I_n(0)\,e^{2\alpha_n t}}{\alpha_n-\beta_n I_n(0)+\beta_n I_n(0)\,e^{2\alpha_n t}}`}</EqBlock>
            Initially exponential at <Tex>{String.raw`e^{2\alpha_n t}`}</Tex>, finally clamped at{" "}
            <Tex>{String.raw`\alpha_n/\beta_n`}</Tex>. (The factor of 2 is exactly what the{" "}
            <Tex>{String.raw`e^{2\alpha_n t}`}</Tex> buildup verifies.)
          </Step>
          <Step title="Frequency pulling">
            Substituting the real (dispersive) polarization into (15)/(52) and solving self-consistently for{" "}
            <Tex>{String.raw`\nu_n`}</Tex> gives a width-weighted average of the cavity frequency{" "}
            <Tex>{String.raw`\Omega_n`}</Tex> and the atomic frequency <Tex>{String.raw`\omega`}</Tex>:
            <EqBlock label="57">{String.raw`\nu_n=\dfrac{\Omega_n+S\,\omega}{1+S},\qquad S=\dfrac{F_1}{\gamma}\mathscr{L}(\omega-\nu_n)\Big[1-\tfrac{3}{2}\dfrac{\gamma_{ab}}{\gamma}I_n\,\mathscr{L}(\omega-\nu_n)\Big]`}</EqBlock>
            <EqBlock label="58">{String.raw`\nu_n=\dfrac{\gamma\Omega_n+\tfrac{1}{2}(\nu/Q_n)\,\omega}{\gamma+\tfrac{1}{2}(\nu/Q_n)}`}</EqBlock>
            <EqBlock label="59">{String.raw`\eta(\nu_n)=\dfrac{\Omega_n}{\nu_n}=1+\dfrac{\nu}{2Q_n}\dfrac{1}{\gamma}\left(1-\dfrac{\omega}{\Omega_n}\right)`}</EqBlock>
          </Step>
        </Derivation>

        <KeyResult
          number="55, 53, 54"
          eq={String.raw`I_n^{ss}=\dfrac{\alpha_n}{\beta_n}=\dfrac{\mathfrak{N}\,\mathscr{L}(\omega-\nu_n)-1}{\tfrac{3}{2}\,\dfrac{\gamma_{ab}}{\gamma}\,\mathfrak{N}\,\mathscr{L}^2(\omega-\nu_n)}\,,\qquad \text{threshold: }\alpha_n=0\Leftrightarrow \mathfrak{N}=\dfrac{\bar N}{N_T}=1`}
          label="Threshold and steady-state intensity"
          note={
            <>
              Below threshold (<Tex>{String.raw`\mathfrak N<1`}</Tex>) the field dies; at{" "}
              <Tex>{String.raw`\mathfrak N=1`}</Tex> it turns on; above threshold the intensity rises with excess
              pumping and is a Lorentzian in detuning.
            </>
          }
        />

        <SimFrame
          title="Single-mode laser turn-on: build-up, tuning curve, and pulling"
          caption={
            <>
              An RK4 integrator solves the chapter&rsquo;s own intensity equation{" "}
              <Tex>{String.raw`\dot I_n=2I_n(\alpha_n-\beta_n I_n)`}</Tex> with the live Table-8-1 coefficients. The
              exact logistic solution (Eq. 56) is overlaid dashed as a fidelity check — the two curves must coincide.
            </>
          }
          tryThis={
            <>
              Set <Tex>{String.raw`\mathfrak N=1.5`}</Tex>, detuning 0, and watch <Tex>{String.raw`I_n`}</Tex> climb the
              S-curve and clamp at <Tex>{String.raw`\alpha_n/\beta_n`}</Tex>. Pull <Tex>{String.raw`\mathfrak N`}</Tex>{" "}
              below 1: <Tex>{String.raw`\alpha_n`}</Tex> goes red and the field decays to zero. Now sweep the detuning —
              the tuning curve narrows to a peak at line center, and once{" "}
              <Tex>{String.raw`\mathfrak N\,\mathscr L<1`}</Tex> the laser goes dark even though it is above threshold on
              resonance. Toggle the pulling panel: the dispersion curve flips sign between gain and an absorber.
            </>
          }
        >
          <Ch08Sim />
        </SimFrame>

        <Callout kind="insight" title="Frequency pulling is a tug-of-war of linewidths">
          Equation (58) makes <Tex>{String.raw`\nu_n`}</Tex> the average of the cavity frequency{" "}
          <Tex>{String.raw`\Omega_n`}</Tex> and the atomic frequency <Tex>{String.raw`\omega`}</Tex>, weighted by the
          atomic width <Tex>{String.raw`\gamma`}</Tex> and the cavity width <Tex>{String.raw`\tfrac12\nu/Q_n`}</Tex>. The
          sharper resonance pulls harder: a high-<Tex>{String.raw`Q`}</Tex> cavity keeps the laser near{" "}
          <Tex>{String.raw`\Omega_n`}</Tex>; a strong, narrow atomic line drags it toward line center. The refractive
          index (59) is the very same physics.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from this chapter">
          <ul>
            <li>
              <strong>The self-consistency loop</strong> (field → quantum dipole → statistical sum → polarization →
              Maxwell → field) is the master template for <em>all</em> of laser theory; later chapters (multimode, ring,
              quantum) just enrich one leg of this same loop.
            </li>
            <li>
              <strong>Imaginary <Tex>{String.raw`P`}</Tex> → amplitude/gain; real <Tex>{String.raw`P`}</Tex> →
              frequency/pulling and refractive index</strong> (Eqs. 11/12, 14/15). For gain the imaginary susceptibility
              is negative, <Tex>{String.raw`\chi''<0`}</Tex>; an absorber has <Tex>{String.raw`\chi''>0`}</Tex>.
            </li>
            <li>
              <strong>Gain saturation</strong> <Tex>{String.raw`\rho_{aa}-\rho_{bb}=N/(1+R/R_s)`}</Tex> (Eq. 37) is the
              universal laser nonlinearity. The dimensionless intensity <Tex>{String.raw`I_n`}</Tex> (Eq. 45) and the
              saturation parameter <Tex>{String.raw`R_s`}</Tex> (Eq. 38) are the standard variables.
            </li>
            <li>
              <strong>The logistic amplitude equation</strong>{" "}
              <Tex>{String.raw`\dot I_n=2I_n(\alpha_n-\beta_n I_n)`}</Tex> and the Table-8-1 coefficients (
              <Tex>{String.raw`\alpha_n`}</Tex> gain, <Tex>{String.raw`\beta_n`}</Tex> self-saturation,{" "}
              <Tex>{String.raw`\sigma_n`}</Tex> linear pulling, <Tex>{String.raw`\rho_n`}</Tex> pushing) are the building
              blocks; multimode theory adds cross-saturation between modes.
            </li>
            <li>
              <strong>Relative excitation</strong> <Tex>{String.raw`\mathfrak N=\bar N/N_T`}</Tex> (Eq. 54) is the
              dimensionless pump knob: threshold at <Tex>{String.raw`\mathfrak N=1`}</Tex>, steady-state intensity{" "}
              <Tex>{String.raw`\propto(\mathfrak N-1)`}</Tex>.
            </li>
            <li>
              <strong>Spatial hole burning</strong> (Fig 8-4) — the <Tex>{String.raw`\tfrac32`}</Tex> factor and the
              leftover gain at nodes — seeds multimode operation and the Lamb dip; and the exact saturation function{" "}
              <Tex>{String.raw`f(w)=\tfrac{2}{w}[1-(1+w)^{-1/2}]`}</Tex> (Eq. 49) is the high-intensity correction to the
              third-order theory.
            </li>
            <li>
              <strong>The standard toolkit</strong> — rotating-wave + slowly-varying-amplitude + rate-equation
              (adiabatic elimination of the coherence) — recurs throughout; know that each needs{" "}
              <Tex>{String.raw`\gamma`}</Tex> large and amplitudes slow compared with the optical period.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
