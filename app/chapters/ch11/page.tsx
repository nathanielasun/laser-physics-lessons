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
import Ch11Sim from "@/components/sims/ch11";

export default function Page() {
  return (
    <Lesson slug="ch11">
      <Lede>
        Fold the laser cavity into a closed loop — here a triangle of three mirrors — and light no longer bounces back
        and forth as a standing wave. Instead it can circulate two ways at once: a clockwise wave and a
        counter-clockwise wave, sharing the very same atoms. The whole chapter is about what these two
        oppositely-directed running waves do to each other. Two questions decide everything. Do they{" "}
        <em>coexist</em>, or does one wave starve the other of gain and win (mode competition, the coupling parameter{" "}
        <Tex>{String.raw`\mathcal{C}`}</Tex>)? And when the ring is rotated, do their frequencies stay split — giving a
        beat note that measures rotation — or does mirror backscatter <em>lock</em> them together and blind the
        gyroscope (the Adler equation, the dead band)? Intensities compete; phases lock. Those are the two faces of
        coupled-oscillator physics in a laser.
      </Lede>

      <Section title="Two counter-propagating waves: the self-consistency equations">
        <Intuition>
          In Chapters VIII–X the cavity mode was a <strong>standing</strong> wave, <Tex>{String.raw`\sin Kz`}</Tex>:
          its nodes and antinodes pick out preferred positions and, in a Doppler gas, the zero-velocity atoms — that is
          where the Lamb dip comes from. A ring cavity mode is a pure <strong>traveling</strong> wave,{" "}
          <Tex>{String.raw`e^{\pm iKz}`}</Tex>, with uniform intensity everywhere. It burns its hole in the gain at a
          Doppler-shifted velocity, not at <Tex>{String.raw`v=0`}</Tex>, so a single direction shows no Lamb dip. The
          new physics is that <em>two</em> such waves — opposite <Tex>{String.raw`K`}</Tex> — can live in the loop
          simultaneously. We label them <Tex>{String.raw`+`}</Tex> (one circulation sense) and{" "}
          <Tex>{String.raw`-`}</Tex> (the other), and ask Maxwell&rsquo;s equations to tell us how each one grows and
          oscillates.
        </Intuition>

        <Figure
          caption={
            <>
              <strong>Fig. 11-1.</strong> The triangular three-mirror ring. The same gain medium is traversed by a
              clockwise wave <Tex>{String.raw`E_+`}</Tex> and a counter-clockwise wave <Tex>{String.raw`E_-`}</Tex>,
              with opposite wavenumbers <Tex>{String.raw`K_-=-K_+`}</Tex>. Mirror imperfections scatter a little of each
              wave into the other (the dashed arrows) — that backscatter is what later locks their frequencies.
            </>
          }
        >
          <svg viewBox="0 0 560 300" width="100%" role="img" aria-label="Triangular ring laser cavity with two counter-propagating waves">
            <defs>
              <marker id="arrowCW" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#4f46e5" />
              </marker>
              <marker id="arrowCCW" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#e11d48" />
              </marker>
            </defs>
            {/* mirrors at triangle vertices */}
            {[
              [280, 50],
              [110, 250],
              [450, 250],
            ].map(([x, y], i) => (
              <g key={i}>
                <rect x={x - 16} y={y - 6} width="32" height="12" rx="2" fill="#334155" transform={`rotate(${i === 0 ? 0 : i === 1 ? 60 : -60} ${x} ${y})`} />
              </g>
            ))}
            {/* cavity beam path */}
            <path d="M280,50 L110,250 L450,250 Z" fill="none" stroke="#cbd5e1" strokeWidth="3" />
            {/* gain medium on the bottom leg */}
            <rect x="230" y="238" width="100" height="24" rx="4" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
            <text x="280" y="254" textAnchor="middle" fontSize="12" fill="#92400e" fontFamily="ui-sans-serif, system-ui">
              gain medium
            </text>
            {/* clockwise (+) arrows, indigo */}
            <path d="M205,140 L165,187" fill="none" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#arrowCW)" />
            <path d="M210,250 L255,250" fill="none" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#arrowCW)" />
            <path d="M395,190 L355,143" fill="none" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#arrowCW)" />
            <text x="150" y="140" textAnchor="end" fontSize="14" fill="#4f46e5" fontFamily="ui-sans-serif, system-ui">
              E₊ (CW)
            </text>
            {/* counter-clockwise (-) arrows, rose */}
            <path d="M360,160 L400,210" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowCCW)" />
            <path d="M350,265 L305,265" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowCCW)" />
            <path d="M170,210 L210,160" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#arrowCCW)" />
            <text x="420" y="150" textAnchor="start" fontSize="14" fill="#e11d48" fontFamily="ui-sans-serif, system-ui">
              E₋ (CCW)
            </text>
            {/* backscatter hint */}
            <path d="M280,62 q14,8 0,16" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="300" y="78" fontSize="11" fill="#94a3b8" fontFamily="ui-sans-serif, system-ui">
              backscatter
            </text>
            {/* round-trip length label */}
            <text x="280" y="290" textAnchor="middle" fontSize="12" fill="#5b6473" fontFamily="ui-sans-serif, system-ui">
              round-trip length L
            </text>
          </svg>
        </Figure>

        <p>
          Write the field as a superposition of running waves. In general it is a sum over longitudinal modes{" "}
          <Tex>{String.raw`n`}</Tex>, each carrying a <Tex>{String.raw`+`}</Tex> and a <Tex>{String.raw`-`}</Tex>{" "}
          component with opposite spatial phase:
        </p>
        <EqBlock label="1">{String.raw`E(z,t) = \tfrac{1}{2}\sum_n \Big\{ E_{+n}(t)\,e^{-i(\nu_n t + \phi_n - K_n z)} + E_{-n}(t)\,e^{-i(\nu_n t + \phi_n + K_n z)} \Big\} + \text{c.c.}`}</EqBlock>
        <p>
          For most of the chapter we keep a single mode — just two counter-running waves, allowed different frequencies{" "}
          <Tex>{String.raw`\nu_\pm`}</Tex> and wavenumbers <Tex>{String.raw`K_\pm`}</Tex>. With opposite circulation,{" "}
          <Tex>{String.raw`K_-=-K_+`}</Tex>, and the two share the same cavity resonance unless rotation breaks the
          symmetry:
        </p>
        <EqBlock label="2">{String.raw`E(z,t) = \tfrac{1}{2}\Big\{ E_+\,e^{-i(\nu_+ t + \phi_+ - K_+ z)} + E_-\,e^{-i(\nu_- t + \phi_- + K_- z)} \Big\} + \text{c.c.}`}</EqBlock>
        <p>
          The gain medium responds with a macroscopic polarization decomposed the same way, into a piece traveling with
          each wave:
        </p>
        <EqBlock label="3">{String.raw`P(z,t) = \tfrac{1}{2}\Big\{ \mathcal{P}_+(t)\,e^{-i(\nu_+ t + \phi_+ - K_+ z)} + \mathcal{P}_-(t)\,e^{-i(\nu_- t + \phi_- + K_- z)} \Big\} + \text{c.c.}`}</EqBlock>
        <p>
          The semiclassical <strong>self-consistency requirement</strong> is the same loop as in the standing-wave
          theory: the polarization that the field induces must, through Maxwell&rsquo;s equations, regenerate exactly
          the field we assumed. Because the two running waves are orthogonal in their spatial phase factors{" "}
          <Tex>{String.raw`e^{\pm iKz}`}</Tex>, the condition separates into independent <Tex>{String.raw`+`}</Tex> and{" "}
          <Tex>{String.raw`-`}</Tex> equations — one pair for amplitudes, one pair for frequencies:
        </p>
        <KeyResult
          number="4"
          eq={String.raw`\dot{E}_\pm + \tfrac{1}{2}\frac{\nu}{Q_\pm}\,E_\pm = -\tfrac{1}{2}\frac{\nu}{\varepsilon_0}\,\mathrm{Im}(\mathcal{P}_\pm)`}
          label="Amplitude self-consistency (each direction)"
          note={
            <>
              The amplitude <Tex>{String.raw`E_\pm`}</Tex> grows when the in-phase (imaginary) part of the polarization
              supplies gain faster than the cavity loss <Tex>{String.raw`\nu/Q_\pm`}</Tex> removes it.
            </>
          }
        />
        <KeyResult
          number="5"
          eq={String.raw`\nu_\pm + \dot{\phi}_\pm = \Omega_\pm - \tfrac{1}{2}\frac{\nu}{\varepsilon_0}\frac{\mathrm{Re}(\mathcal{P}_\pm)}{E_\pm}`}
          label="Frequency self-consistency (mode pulling)"
          note={
            <>
              The operating frequency is the empty-cavity resonance <Tex>{String.raw`\Omega_\pm`}</Tex> pulled by the
              in-quadrature (real) part of the polarization — the dispersion.
            </>
          }
        />

        <Derivation title="Why running waves, and how the equations separate">
          <Step title="Standing vs. traveling">
            A two-mirror mode <Tex>{String.raw`\sin Kz`}</Tex> has nodes; it interacts preferentially with atoms near
            antinodes and, via the Doppler effect, with the <Tex>{String.raw`v=0`}</Tex> group — hence the Lamb dip. A
            ring mode <Tex>{String.raw`e^{\pm iKz}`}</Tex> has uniform <Tex>{String.raw`|E|`}</Tex> in space, so it burns
            no spatial grating. It still burns just <em>one</em> Bennett hole, at the single velocity class satisfying{" "}
            <Tex>{String.raw`\omega - Kv = \nu`}</Tex> — only one velocity ensemble contributes gain, so no resonance
            sits at <Tex>{String.raw`v=0`}</Tex> and there is no dip on its own. Two such waves with opposite{" "}
            <Tex>{String.raw`K`}</Tex> can coexist — that is the whole new degree of freedom.
          </Step>
          <Step title="Project Maxwell onto each running wave">
            Insert the field ansatz Eq.&nbsp;(2) and polarization Eq.&nbsp;(3) into the wave equation. The spatial
            factors <Tex>{String.raw`e^{+iKz}`}</Tex> and <Tex>{String.raw`e^{-iKz}`}</Tex> are orthogonal over the
            cavity, so matching slowly-varying envelopes on each side splits into independent <Tex>{String.raw`+`}</Tex>{" "}
            and <Tex>{String.raw`-`}</Tex> conditions — the single-mode semiclassical result, simply doubled.
          </Step>
          <Step title="Gain vs. pulling">
            <Tex>{String.raw`\mathrm{Im}(\mathcal{P}_\pm)`}</Tex> is in phase with the field and feeds energy (gain
            minus loss); <Tex>{String.raw`\mathrm{Re}(\mathcal{P}_\pm)`}</Tex> is in quadrature and shifts the frequency
            (dispersion, mode pulling). The rest of the chapter is the job of computing{" "}
            <Tex>{String.raw`\mathcal{P}_\pm`}</Tex> from the atoms to first order (linear gain + pulling) and third
            order (saturation + cross-coupling).
          </Step>
        </Derivation>

        <Callout kind="insight" title="The disappearing Lamb dip">
          Because each ring wave is a traveling wave, it burns its gain hole at a Doppler-shifted velocity rather than
          at <Tex>{String.raw`v=0`}</Tex>. A single direction shows <em>no</em> Lamb dip. The interesting structure near
          line center reappears only through the <strong>coupling</strong> between the two oppositely-directed waves —
          which is exactly what the next sections compute.
        </Callout>
      </Section>

      <Section title="The polarization: first- and third-order perturbation chain">
        <Intuition>
          To close Eqs.&nbsp;(4)–(5) we need <Tex>{String.raw`\mathcal{P}_\pm`}</Tex> in terms of the field amplitudes.
          We get it by perturbation theory in the field, integrating the density-matrix equations over each
          atom&rsquo;s history (its position, velocity, and excitation time). To <strong>first order</strong> we get the
          linear response — gain and dispersion set by the Doppler-broadened lineshape. To <strong>third order</strong>{" "}
          each wave saturates itself <em>and</em> — crucially — saturates the other through the shared inversion. That
          cross term is the entire story of mode competition between the two directions.
        </Intuition>
        <p>
          The polarization component for each wave is the dipole matrix element <Tex>{String.raw`\wp`}</Tex> times the
          off-diagonal density-matrix element <Tex>{String.raw`\rho_{ab}`}</Tex>, projected onto each running wave by
          the spatial factor <Tex>{String.raw`e^{\mp iK_\pm z}`}</Tex> and averaged over the atomic velocities:
        </p>
        <EqBlock label="6">{String.raw`\mathcal{P}_\pm(t) = 2\wp\,e^{i(\nu_\pm t + \phi_\pm)}\,\frac{1}{L}\int_0^{L} dz\, e^{\mp iK_\pm z}\!\int_{-\infty}^{\infty} dv\;\rho_{ab}(z,v,t).`}</EqBlock>
        <p>
          The perturbing Hamiltonian — the electric-dipole interaction — couples both atomic levels to{" "}
          <em>both</em> running waves at once. That single fact is what makes the cross-coupling appear at third order:
        </p>
        <EqBlock label="7">{String.raw`\mathcal{V}_{ab}(t) = -\tfrac{1}{2}\wp\Big\{ E_+\,e^{-i(\nu_+ t + \phi_+ - K_+ z)} + E_-\,e^{-i(\nu_- t + \phi_- + K_- z)} \Big\}.`}</EqBlock>
        <p>
          One interaction with <Tex>{String.raw`\mathcal{V}_{ab}`}</Tex> gives the first-order coherence: each wave
          drives a response with a Lorentzian-in-time memory set by <Tex>{String.raw`\gamma_{ab}`}</Tex> and the
          detuning <Tex>{String.raw`\omega-\nu_\pm`}</Tex> (here <Tex>{String.raw`\omega`}</Tex> is the atomic
          transition frequency and <Tex>{String.raw`N`}</Tex> the unsaturated inversion density):
        </p>
        <EqBlock label="6′">{String.raw`\rho_{ab}^{(1)}(t) = -\tfrac{i}{2}\frac{\wp}{\hbar}N\Big[ E_+\,e^{-i(\nu_+ t + \phi_+ - K_+ z)}\!\!\int_{-\infty}^{t}\!\! dt'\,e^{-(i(\omega-\nu_+)+\gamma_{ab})(t-t')} + E_-\,e^{-i(\nu_- t + \phi_- + K_- z)}\!\!\int_{-\infty}^{t}\!\! dt'\,e^{-(i(\omega-\nu_-)+\gamma_{ab})(t-t')} \Big].`}</EqBlock>
        <p>
          Averaging the velocity integral over the Maxwellian distribution turns this into the complex{" "}
          <strong>plasma dispersion function</strong> <Tex>{String.raw`Z`}</Tex>, evaluated at the complex argument{" "}
          <Tex>{String.raw`\gamma + i(\omega-\nu_\pm)`}</Tex> — the decay rate <Tex>{String.raw`\gamma`}</Tex> as the real
          part, the detuning <Tex>{String.raw`\omega-\nu_\pm`}</Tex> as the imaginary part, with{" "}
          <Tex>{String.raw`K\bar u`}</Tex> the Doppler width appearing only in the prefactor:
        </p>
        <KeyResult
          number="8"
          eq={String.raw`\mathcal{P}_\pm^{(1)}(t) = -\,\wp^2\bar N\,(\hbar K\bar u)^{-1}\,E_\pm\,Z[\gamma + i(\omega-\nu_\pm)].`}
          label="First-order (linear gain + pulling)"
          note={
            <>
              <Tex>{String.raw`\mathrm{Im}\,Z`}</Tex> is the Gaussian (Voigt) gain profile that drives oscillation;{" "}
              <Tex>{String.raw`\mathrm{Re}\,Z`}</Tex> is the dispersive curve that pulls the frequency.
            </>
          }
        />
        <p>
          Three interactions give the third-order coherence — a triple time-integral over the atomic history involving
          all products of the two field amplitudes. Its <em>structure</em> is what matters; the internal{" "}
          <Tex>{String.raw`Z`}</Tex>-function brackets are illegible in the source and are not reproduced here:
        </p>
        <EqBlock label="9">{String.raw`\rho_{ab}^{(3)}(t) = \tfrac{i}{8}\Big(\frac{\wp}{\hbar}\Big)^3 N\!\int_{-\infty}^{t}\!\!\! dt''\!\!\int_{-\infty}^{t''}\!\!\! dt'\!\!\int_{-\infty}^{t'}\!\!\! dt'''\;\big[\,\text{products of }E_+,E_-\,\big]\,\big[\,\text{phase \& decay factors}\,\big].`}</EqBlock>
        <p>
          Carrying out the velocity and position integrals and keeping only the resonant combinations, the third-order
          polarization for each wave splits into a <strong>self-saturation</strong> term{" "}
          <Tex>{String.raw`\propto |E_\pm|^2`}</Tex> and a <strong>cross-saturation</strong> term{" "}
          <Tex>{String.raw`\propto |E_\mp|^2`}</Tex>. The two enter with <em>equal weight</em>: at exact line center the
          opposite wave saturates the shared inversion exactly as strongly as the wave saturates itself — no more:
        </p>
        <KeyResult
          number="10"
          eq={String.raw`\mathcal{P}_\pm^{(3)} = \tfrac{1}{4}\,\wp^4 N\,(\hbar^3 K\bar u)^{-1}\,E_\pm\Big\{ |E_\pm|^2\,[\,Z\text{-combination}\,] \;+\; |E_\mp|^2\,[\,Z\text{-combination}\,] \Big\}.`}
          label="Third-order (self + cross saturation)"
          note={
            <>
              Self-saturation: each wave depletes the inversion it itself uses. Cross-saturation: the{" "}
              <em>opposite</em> wave also depletes the shared inversion. The cross term reaches the self term only at
              central tuning, where it equals it — it never exceeds it. That marginal equality is the seed of mode
              competition.
            </>
          }
        />

        <Derivation title="The perturbation hierarchy, in named steps">
          <Step title="Set up the orders">
            Solve the density-matrix equations iteratively in powers of the field. Zeroth order gives the unsaturated
            inversion <Tex>{String.raw`N`}</Tex>. One interaction gives <Tex>{String.raw`\rho_{ab}^{(1)}`}</Tex>{" "}
            (Eq.&nbsp;6′); three interactions give <Tex>{String.raw`\rho_{ab}^{(3)}`}</Tex> (Eq.&nbsp;9). Even orders
            vanish for the off-diagonal element by parity.
          </Step>
          <Step title="Integrate over the atomic trajectory">
            Replace <Tex>{String.raw`z`}</Tex> by the free-flight path <Tex>{String.raw`z = z' + v(t'-t)`}</Tex> and
            integrate over excitation time, the Maxwellian velocity distribution, and position. The Gaussian velocity
            integral produces the plasma dispersion function <Tex>{String.raw`Z`}</Tex>; this is where the Doppler width{" "}
            <Tex>{String.raw`K\bar u`}</Tex> enters.
          </Step>
          <Step title="Extract gain and pulling (first order)">
            The single-interaction term gives <Tex>{String.raw`\mathcal{P}_\pm^{(1)}\propto Z[\gamma + i(\omega-\nu_\pm)]`}</Tex>{" "}
            (Eq.&nbsp;8). <Tex>{String.raw`\mathrm{Im}\,Z`}</Tex> is the gain lineshape; <Tex>{String.raw`\mathrm{Re}\,Z`}</Tex>{" "}
            the pulling. Each wave gets its own copy at its own detuning <Tex>{String.raw`\omega-\nu_\pm`}</Tex>.
          </Step>
          <Step title="Extract self and cross saturation (third order)">
            The triple-interaction term gives a self piece <Tex>{String.raw`\sim E_\pm|E_\pm|^2`}</Tex> and a cross
            piece <Tex>{String.raw`\sim E_\pm|E_\mp|^2`}</Tex> (Eq.&nbsp;10), entering with equal weight. Getting that
            equal weighting right — cross approaching self at line center, never overtaking it — is what makes the
            competition physics correct.
          </Step>
        </Derivation>

        <Callout kind="warning" title="Keep only the resonant terms">
          The book explicitly drops terms whose exponentials oscillate rapidly — they average to zero — leaving the
          slowly-varying combinations. The retained third-order terms are precisely self-saturation{" "}
          <Tex>{String.raw`(|E_\pm|^2)`}</Tex> and cross-saturation <Tex>{String.raw`(|E_\mp|^2)`}</Tex>, weighted{" "}
          <em>equally</em>. The cross term rises to match the self term at line center but never beyond it; that
          marginal equality, not any factor of 2, sets the edge of strong competition.
        </Callout>
        <Callout kind="insight" title="Z is the plasma dispersion function">
          <Tex>{String.raw`Z(\zeta)`}</Tex> packages the Doppler-broadened complex susceptibility. Its imaginary part is
          the gain/absorption (a Gaussian convolved with a Lorentzian — a Voigt profile); its real part is the
          anomalous dispersion. Everything physical — gain, pulling, saturation — is a <Tex>{String.raw`Z`}</Tex>{" "}
          evaluated at the right detuning.
        </Callout>
      </Section>

      <Section title="Coupled intensity and frequency equations">
        <Intuition>
          Feed the first- and third-order polarizations back into the self-consistency Eqs.&nbsp;(4)–(5) and convert
          amplitudes to intensities <Tex>{String.raw`I_\pm \propto E_\pm^2`}</Tex>. Out drops the central dynamical
          engine of the chapter: a pair of coupled nonlinear rate equations for the two intensities. Each intensity
          grows on its own net gain <Tex>{String.raw`\alpha_\pm`}</Tex>, is limited by its own self-saturation{" "}
          <Tex>{String.raw`\beta_\pm`}</Tex>, and is suppressed by the cross-saturation{" "}
          <Tex>{String.raw`\theta`}</Tex> from the <em>other</em> direction — the Lotka–Volterra form of two competing
          populations.
        </Intuition>
        <p>
          Expand the slowly-varying coefficients about the average operating and atomic frequencies:
        </p>
        <EqBlock>{String.raw`\nu_0 = \tfrac{1}{2}(\nu_+ + \nu_-), \qquad \omega_0 = \gamma + i(\omega - \nu_0).`}</EqBlock>
        <p>
          In the strong-Doppler limit the third-order polarization for each wave takes its compact book form. Inside the
          bracket the wave&rsquo;s own intensity <Tex>{String.raw`E_\pm^2`}</Tex> (self-saturation) and the opposite
          wave&rsquo;s intensity <Tex>{String.raw`E_\mp^2`}</Tex> (cross-saturation, carrying the factor{" "}
          <Tex>{String.raw`\gamma\,\mathscr{D}(\omega-\nu_0)`}</Tex>) appear with <em>equal weight</em> — the cross
          term reduces to the self term only at line center:
        </p>
        <EqBlock label="12">{String.raw`\mathcal{P}_\pm^{(3)} = \tfrac{1}{2}i\sqrt{\pi}\,\wp^4\bar N\gamma_{ab}\,(\hbar^3 K\bar u\,\gamma\gamma_a\gamma_b)^{-1}\,E_\pm\big[\,E_\pm^2 + E_\mp^2\,\gamma\,\mathscr{D}(\omega-\nu_0)\,\big].`}</EqBlock>

        <KeyResult
          number="13"
          eq={String.raw`\dot{I}_+ = 2I_+\big(\alpha_+ - \beta_+ I_+ - \theta_{+-}\,I_-\big)`}
          label="Intensity equation — clockwise wave"
        />
        <KeyResult
          number="14"
          eq={String.raw`\dot{I}_- = 2I_-\big(\alpha_- - \beta_- I_- - \theta_{-+}\,I_+\big)`}
          label="Intensity equation — counter-clockwise wave"
          note={
            <>
              Together Eqs.&nbsp;(13)–(14) decide whether both directions oscillate (weak coupling) or one wins (strong
              coupling). They are the headline result of the chapter.
            </>
          }
        />
        <p>
          The same substitution into the frequency equation gives each wave&rsquo;s operating frequency: the
          empty-cavity value <Tex>{String.raw`\Omega_\pm`}</Tex>, plus linear pulling <Tex>{String.raw`\sigma_\pm`}</Tex>,
          plus a self-push <Tex>{String.raw`\rho_\pm I_\pm`}</Tex> and a cross-push from the opposite wave:
        </p>
        <EqBlock label="15">{String.raw`\nu_+ + \dot{\phi}_+ = \Omega_+ + \sigma_+ - \rho_+ I_+ - \tau_{+-}\,I_-,`}</EqBlock>
        <EqBlock label="16">{String.raw`\nu_- + \dot{\phi}_- = \Omega_- + \sigma_- - \rho_- I_- - \tau_{-+}\,I_+.`}</EqBlock>
        <p>
          The difference of Eqs.&nbsp;(15)–(16) becomes the beat-note / relative-phase equation of the next section. The
          seven coefficients are collected in Table&nbsp;11-1; their leading forms are:
        </p>
        <EqBlock label="α">{String.raw`\alpha_\pm = F_1\,\exp\!\big[-(\omega-\nu_\pm)^2/(K\bar u)^2\big] - \tfrac{1}{2}\frac{\nu}{Q_\pm}\quad(\text{linear net gain: Doppler gain }-\text{ half loss}).`}</EqBlock>
        <EqBlock label="β,θ">{String.raw`\beta_\pm = (\text{self-saturation}),\qquad \theta_{\pm\mp} = \beta_\pm\,\mathscr{L}(\omega-\nu_0)\ \approx\ \beta_\pm\ \text{near line center}.`}</EqBlock>
        <EqBlock label="σ">{String.raw`\sigma_\pm \propto \mathrm{Re}\,Z\;\;(\text{linear mode pulling, odd in detuning }\nu_\pm-\omega).`}</EqBlock>
        <EqBlock label="ρ,τ">{String.raw`\rho_\pm = (\text{self-pushing}),\qquad \tau_{\pm\mp} = (\text{cross-pushing}),`}</EqBlock>
        <KeyResult
          number="F₁"
          eq={String.raw`F_1 = \tfrac{1}{2}\,\nu\,\sqrt{\pi}\,\wp^2 \bar N\,(\hbar K\bar u\,\varepsilon_0)^{-1}`}
          label="Common first-order factor"
          note={
            <>
              The dimensional prefactor shared by all the coefficients — it sets the overall scale of gain and
              saturation in terms of <Tex>{String.raw`\wp`}</Tex>, <Tex>{String.raw`\bar N`}</Tex>, and the Doppler width{" "}
              <Tex>{String.raw`K\bar u`}</Tex>.
            </>
          }
        />

        <Derivation title="From amplitude to intensity, and amplitude to frequency">
          <Step title="Amplitude → intensity">
            Multiply Eq.&nbsp;(4) by <Tex>{String.raw`E_\pm`}</Tex>. Since{" "}
            <Tex>{String.raw`I_\pm\propto E_\pm^2`}</Tex>, we have{" "}
            <Tex>{String.raw`\dot I_\pm = 2E_\pm\dot E_\pm`}</Tex>. Substituting the first-order polarization Eq.&nbsp;(8)
            and the third-order polarization Eq.&nbsp;(12): the linear <Tex>{String.raw`\mathrm{Im}\,Z`}</Tex> term gives{" "}
            <Tex>{String.raw`\alpha_\pm I_\pm`}</Tex>, the self third-order term gives{" "}
            <Tex>{String.raw`-\beta_\pm I_\pm^2`}</Tex>, and the equally-weighted cross term gives{" "}
            <Tex>{String.raw`-\theta\,I_\pm I_\mp`}</Tex>. The leading factor 2 comes straight from{" "}
            <Tex>{String.raw`I\propto E^2`}</Tex>. That is Eqs.&nbsp;(13)–(14).
          </Step>
          <Step title="Amplitude → frequency">
            Insert <Tex>{String.raw`\mathrm{Re}\,Z`}</Tex> (first order) and the real part of the third-order
            polarization into Eq.&nbsp;(5). The linear term gives the pulling <Tex>{String.raw`\sigma_\pm`}</Tex>; the
            self real part gives the pushing <Tex>{String.raw`\rho_\pm I_\pm`}</Tex>; the cross real part gives{" "}
            <Tex>{String.raw`\tau\,I_\mp`}</Tex>. That is Eqs.&nbsp;(15)–(16).
          </Step>
          <Step title="Expand about line center">
            Define the average frequencies above and Taylor-expand the <Tex>{String.raw`Z`}</Tex> combinations
            about the average detuning. This yields Table&nbsp;11-1: a gain part (Gaussian, even in detuning) and a
            pulling part (dispersive, odd in detuning), all sharing the factor <Tex>{String.raw`F_1`}</Tex>.
          </Step>
        </Derivation>

        <Callout kind="insight" title="The same equations as the two-mode laser">
          Eqs.&nbsp;(13)–(14) are structurally identical to the two-mode competition equations of Section&nbsp;9-2 —
          only the coefficients differ, because here the two &ldquo;modes&rdquo; are counter-propagating running waves
          sharing one frequency rather than two distinct longitudinal modes. Steady states and stability are read off
          exactly as in Chapter&nbsp;IX.
        </Callout>
        <Callout kind="note" title="The coefficient roster (Table 11-1)">
          <ul>
            <li><Tex>{String.raw`\alpha`}</Tex> — linear net gain (Doppler gain minus half the loss).</li>
            <li><Tex>{String.raw`\beta`}</Tex> — self-saturation; sets <Tex>{String.raw`I_\pm\approx\alpha_\pm/\beta_\pm`}</Tex> when uncoupled.</li>
            <li><Tex>{String.raw`\theta`}</Tex> — cross-saturation; <Tex>{String.raw`\theta/\beta`}</Tex> controls all competition.</li>
            <li><Tex>{String.raw`\sigma`}</Tex> — linear mode pulling (toward line center).</li>
            <li><Tex>{String.raw`\rho,\ \tau`}</Tex> — self- and cross-pushing (intensity-dependent frequency shifts).</li>
            <li><Tex>{String.raw`F_1`}</Tex> — common first-order factor.</li>
          </ul>
          Seven symbols; every later equation is built from them.
        </Callout>
      </Section>

      <Section title="Competition (the coupling parameter) and locking (the Adler equation)">
        <Intuition>
          Now the two punchlines. First, the <strong>intensities</strong>: two waves coexist stably whenever the
          coupling parameter <Tex>{String.raw`\mathcal{C}`}</Tex> is below 1 (weak coupling); if it could exceed 1
          (strong coupling) coexistence would be unstable and one wave would grow at the other&rsquo;s expense. For this
          ring, <Tex>{String.raw`\mathcal{C} = \mathscr{L}^2(\omega-\nu_0)\le 1`}</Tex> always, touching 1 only at exact
          line center — so the two waves coexist at every tuning, most marginally at line center. Second, the{" "}
          <strong>frequencies</strong>: even when both waves run, mirror backscatter couples them.
          Subtracting the frequency equations gives the Adler equation for the relative phase{" "}
          <Tex>{String.raw`\Psi`}</Tex>. If the rotation-induced splitting <Tex>{String.raw`d`}</Tex> exceeds the
          backscatter coupling <Tex>{String.raw`l`}</Tex>, the phase runs and there is a finite beat note — the
          gyroscope works. If <Tex>{String.raw`|d|<l`}</Tex>, the phase locks, the beat note vanishes, and the
          gyroscope is blind: the dead band.
        </Intuition>

        <KeyResult
          number="17"
          eq={String.raw`\mathcal{C} = \frac{\theta_{+-}\,\theta_{-+}}{\beta_+\,\beta_-}`}
          label="Coupling parameter"
          note={
            <>
              <Tex>{String.raw`\mathcal{C}<1`}</Tex>: weak coupling — both waves coexist.{" "}
              <Tex>{String.raw`\mathcal{C}>1`}</Tex>: strong coupling — one wave suppresses the other
              (unidirectional / bistable).
            </>
          }
        />
        <p>
          For the ring laser the cross- and self-saturation coefficients are tied together by{" "}
          <Tex>{String.raw`\theta_{\pm\mp} = \beta_\pm\mathscr{L}(\omega-\nu_0)`}</Tex> (Table&nbsp;11-1), so{" "}
          <Tex>{String.raw`\mathcal{C}`}</Tex> is the square of a Lorentzian that <em>never exceeds 1</em>. It reaches
          its maximum value of exactly 1 only at central tuning, where competition is strongest (marginal coexistence),
          and falls below 1 at every other tuning, where both waves comfortably run:
        </p>
        <EqBlock label="17′">{String.raw`\mathcal{C} = \mathscr{L}^2(\omega-\nu_0)\le 1,\qquad \mathcal{C}=1\ \text{only at}\ \nu_+=\nu_-=\omega,\qquad \mathcal{C}<1\ \text{otherwise}.`}</EqBlock>

        <Derivation title="Steady-state intensities and the coexistence condition" defaultOpen={false}>
          <Step title="Set the time derivatives to zero">
            With <Tex>{String.raw`\dot I_\pm = 0`}</Tex> in Eqs.&nbsp;(13)–(14), the nontrivial (two-wave) solution is
            <EqBlock>{String.raw`I_\pm = \frac{\alpha_\pm\beta_\mp - \alpha_\mp\,\theta}{\beta_+\beta_- - \theta_{+-}\theta_{-+}}.`}</EqBlock>
          </Step>
          <Step title="Read off stability">
            The denominator is positive (stable coexistence) iff{" "}
            <Tex>{String.raw`\beta_+\beta_- > \theta_{+-}\theta_{-+}`}</Tex>, i.e.{" "}
            <Tex>{String.raw`\mathcal{C}<1`}</Tex>. If <Tex>{String.raw`\mathcal{C}>1`}</Tex> the coexistence point is a
            saddle and the system runs to a single-wave state — the bistability of the ring laser.
          </Step>
        </Derivation>

        <p>
          For the frequencies, define the relative phase between the two waves. Its time derivative is the
          instantaneous beat frequency; its average is what a gyroscope reads:
        </p>
        <EqBlock label="18">{String.raw`\Psi = (\nu_+ - \nu_-)\,t + \phi_+ - \phi_-.`}</EqBlock>
        <p>
          The amplitude equation (19) carries a backscatter term{" "}
          <Tex>{String.raw`\mathrm{Im}[i\,g_{+-}e^{i\Psi}]E_-`}</Tex> that injects the <em>other</em> wave&rsquo;s
          field, and the frequency equation (20) carries the dispersion term{" "}
          <Tex>{String.raw`-\tfrac{1}{2}(\nu/\varepsilon_0)\mathrm{Re}(\mathcal{P}_+)/E_+`}</Tex> plus its own
          backscatter coupling:
        </p>
        <EqBlock label="19">{String.raw`\dot{E}_+ + \tfrac{1}{2}\frac{\nu}{Q_+}E_+ + \mathrm{Im}[i\,g_{+-}e^{i\Psi}]E_- = -\tfrac{1}{2}\frac{\nu}{\varepsilon_0}\mathrm{Im}(\mathcal{P}_+).`}</EqBlock>
        <EqBlock label="20">{String.raw`\nu_+ + \dot\phi_+ + \mathrm{Re}[i\,g_{+-}e^{i\Psi}]\frac{E_-}{E_+} = \Omega_+ - \tfrac{1}{2}\frac{\nu}{\varepsilon_0}\frac{\mathrm{Re}(\mathcal{P}_+)}{E_+}.`}</EqBlock>
        <p>
          Write Eq.&nbsp;(20) for both <Tex>{String.raw`+`}</Tex> and <Tex>{String.raw`-`}</Tex> waves and subtract the{" "}
          <Tex>{String.raw`-`}</Tex> form from the <Tex>{String.raw`+`}</Tex> form. The empty-cavity and pulling
          differences collect into a constant <Tex>{String.raw`d`}</Tex>; the backscatter terms inject one
          wave&rsquo;s field into the other, producing a <Tex>{String.raw`\sin\Psi`}</Tex> term of strength{" "}
          <Tex>{String.raw`l`}</Tex>. The result is the heart of the chapter:
        </p>
        <KeyResult
          number="21"
          eq={String.raw`\dot{\Psi} = d + l\,\sin\Psi`}
          label="Adler locking equation"
          note={
            <>
              <Tex>{String.raw`\dot\Psi`}</Tex> is the instantaneous beat frequency, <Tex>{String.raw`d`}</Tex> the
              rotation-induced splitting (the gyroscope signal), <Tex>{String.raw`l`}</Tex> the backscatter coupling.
              This one ODE governs locking, the dead band, and the gyroscope response.
            </>
          }
        />
        <EqBlock label="22">{String.raw`d = \Omega_+ - \Omega_- + \sigma_+ - \sigma_- - (\rho_+ - \rho_-)I + \cdots = (\nu_+ - \nu_-)\big|_{l=0}\;\propto\;\text{rotation rate }\Omega.`}</EqBlock>
        <EqBlock label="23">{String.raw`l = g_{+-}\left(\frac{E_-}{E_+} + \frac{E_+}{E_-}\right),`}</EqBlock>
        <p>
          where <Tex>{String.raw`d`}</Tex> is the beat frequency the two waves would have <em>without</em> backscatter
          (proportional to rotation rate for a gyroscope), and <Tex>{String.raw`l`}</Tex> is built from the
          backscatter coupling <Tex>{String.raw`g_{+-}`}</Tex> — the same mirror matrix element that appears in
          Eqs.&nbsp;(19)–(20) — times the symmetric field-amplitude ratio{" "}
          <Tex>{String.raw`E_-/E_+ + E_+/E_-`}</Tex> that injects each wave into the other. It sets the half-width{" "}
          <Tex>{String.raw`|d|<l`}</Tex> of the locking dead band.
        </p>

        <Derivation title="Solve the Adler equation: locked vs. running">
          <Step title="Form the relative-phase equation">
            Subtract the <Tex>{String.raw`-`}</Tex> form of frequency Eq.&nbsp;(20) from its <Tex>{String.raw`+`}</Tex>{" "}
            form. The cavity/pulling differences give the constant <Tex>{String.raw`d`}</Tex> (Eq.&nbsp;22); the
            backscatter <Tex>{String.raw`\mathrm{Re}[i\,g\,e^{i\Psi}]`}</Tex> terms give{" "}
            <Tex>{String.raw`l\sin\Psi`}</Tex> (Eq.&nbsp;23). Using Eq.&nbsp;(18) this is{" "}
            <Tex>{String.raw`\dot\Psi = d + l\sin\Psi`}</Tex>.
          </Step>
          <Step title="Fixed points exist only inside the dead band">
            A fixed point needs <Tex>{String.raw`d + l\sin\Psi = 0`}</Tex>, i.e.{" "}
            <Tex>{String.raw`\sin\Psi = -d/l`}</Tex>, which has a real solution only if{" "}
            <Tex>{String.raw`|d|\le|l|`}</Tex>. The <em>stable</em> root is the one with negative slope{" "}
            <Tex>{String.raw`l\cos\Psi^* < 0`}</Tex>:
            <EqBlock>{String.raw`\Psi_{\text{lock}} = \pi + \arcsin(d/l).`}</EqBlock>
            There <Tex>{String.raw`\Psi`}</Tex> relaxes to a constant, <Tex>{String.raw`\nu_+=\nu_-`}</Tex>, and the
            beat note is zero — the dead band.
          </Step>
          <Step title="Running solution and the gyro transfer function">
            For <Tex>{String.raw`|d|>l`}</Tex> there is no fixed point; <Tex>{String.raw`\Psi`}</Tex> advances
            monotonically — slowly near the would-be fixed point, fast away from it. The time-averaged beat is the
            closed form
            <KeyResult
              eq={String.raw`\langle\dot{\Psi}\rangle = \operatorname{sign}(d)\sqrt{d^2 - l^2}\quad(|d|>l),\qquad \langle\dot{\Psi}\rangle = 0\quad(|d|\le l),`}
              label="Average beat note (gyro transfer function)"
            />
            with one full phase slip every <Tex>{String.raw`T_{\text{beat}} = 2\pi/\sqrt{d^2-l^2}`}</Tex>. Zero inside
            the dead band, then rising with a vertical tangent at the edge and approaching the ideal line{" "}
            <Tex>{String.raw`d`}</Tex> far from lock.
          </Step>
          <Step title="The dead band, physically">
            Its half-width equals the backscatter coupling <Tex>{String.raw`l`}</Tex>. Real mirrors always backscatter,
            so every passive ring-laser gyro has a finite dead band; below this rotation rate it cannot sense rotation.
            Practical gyros defeat lock-in by <strong>dithering</strong> — mechanically oscillating the splitting{" "}
            <Tex>{String.raw`d`}</Tex> so the device only briefly crosses the dead band.
          </Step>
        </Derivation>

        <SimFrame
          title="Ring-laser lock-in: the Adler equation and the gyroscope dead band"
          caption={
            <>
              Integrate the relative-phase ODE <Tex>{String.raw`\dot\Psi = d + l\sin\Psi`}</Tex> (RK4) and watch the
              system either lock (phase pins, beat = 0) or run (phase slips, finite beat). The transfer-function panel
              plots the measured beat note vs. the rotation signal <Tex>{String.raw`d`}</Tex>, showing the flat dead
              band and the <Tex>{String.raw`\sqrt{d^2-l^2}`}</Tex> rise.
            </>
          }
          tryThis={
            <>
              Start with <Tex>{String.raw`d=2`}</Tex>, <Tex>{String.raw`l=1`}</Tex> (running): the phase climbs in a
              slip-staircase and the circle point crawls then jumps. Now lower <Tex>{String.raw`d`}</Tex> below{" "}
              <Tex>{String.raw`l`}</Tex> — the flow curve lifts entirely above zero, the fixed points annihilate, the
              point pins at <Tex>{String.raw`\Psi_{\text{lock}}`}</Tex>, and the beat note drops to exactly zero. On the
              transfer plot, the marker sits in the flat dead band <Tex>{String.raw`|d|<l`}</Tex>. Then raise{" "}
              <Tex>{String.raw`l`}</Tex> and watch the dead band widen.
            </>
          }
        >
          <Ch11Sim />
        </SimFrame>

        <Callout kind="insight" title="The Adler equation is universal">
          <Tex>{String.raw`\dot\Psi = d + l\sin\Psi`}</Tex> is the same equation that describes injection locking of any
          oscillator, phase-locked loops, and coupled pendulums. Recognizing it here means everything you know about
          lock-in and pull-in transfers directly to the ring laser.
        </Callout>
        <Callout kind="insight" title="Why a gyroscope — and why it fails at low rotation">
          Rotation produces the Sagnac splitting <Tex>{String.raw`d\sim\Omega`}</Tex> (rotation rate). The ideal gyro
          reads <Tex>{String.raw`\text{beat}=d`}</Tex>, linear in <Tex>{String.raw`\Omega`}</Tex>. Backscatter coupling{" "}
          <Tex>{String.raw`l`}</Tex> kills that linearity at small <Tex>{String.raw`\Omega`}</Tex>: inside{" "}
          <Tex>{String.raw`|d|<l`}</Tex> the beat is exactly zero, so the gyro is blind to slow rotations. The whole
          engineering challenge is making <Tex>{String.raw`l`}</Tex> small or dithering past it.
        </Callout>
        <Callout kind="warning" title="Two distinct couplings — do not conflate them">
          <Tex>{String.raw`\mathcal{C}`}</Tex> (intensity coupling, <Tex>{String.raw`\theta/\beta`}</Tex>) decides
          whether <em>both</em> waves run. <Tex>{String.raw`l`}</Tex> (phase / backscatter coupling) decides whether
          their <em>frequencies</em> lock. A ring laser can run both waves (<Tex>{String.raw`\mathcal{C}<1`}</Tex>) yet
          still have its beat note locked (<Tex>{String.raw`|d|<l`}</Tex>). They are independent phenomena.
        </Callout>
      </Section>

      <Section title="Unidirectional multimode operation and combination tones">
        <Intuition>
          Finally, drop the two-wave picture and consider a ring forced to run <strong>unidirectionally</strong>{" "}
          (only one circulation sense lasing) but with several longitudinal modes in that one direction. This is the cleanest case
          for multimode physics: with only one direction lasing, the cross-saturation that complicates the
          standing-wave theory is gone — the modes interact only through the gain they share. The new feature is{" "}
          <strong>combination tones</strong>: third-order beating among modes produces polarization at a sum/difference
          frequency that can resonantly drive another mode.
        </Intuition>
        <p>
          The starting field is a sum over modes <Tex>{String.raw`n`}</Tex> all traveling the same way:
        </p>
        <EqBlock label="24">{String.raw`E(z,t) = \tfrac{1}{2}\sum_n E_n\,e^{-i(\nu_n t + \phi_n - K_n z)} + \text{c.c.}`}</EqBlock>
        <p>
          The self-saturation coefficient for a single mode is built from the Lorentzian denominator{" "}
          <Tex>{String.raw`\mathscr{D}(\nu_n-\omega)`}</Tex>. The ring self-saturation is{" "}
          <strong>one-quarter the standing-wave (Table&nbsp;10-2) value</strong>, and it lacks the complex denominator
          that produced the Lamb dip — because a single traveling wave draws gain from only one velocity ensemble, there
          is no <Tex>{String.raw`v=0`}</Tex> resonance to tune through. It is also uniform in intensity <em>in space</em>,
          so it burns no population grating and carries none of the spatial-hole-burning contribution that enhances the
          standing-wave coefficient:
        </p>
        <EqBlock label="25">{String.raw`\beta_{nnnn} = i\Big(\tfrac{1}{2}\frac{\wp}{\hbar}\Big)^{2}\Big[\mathscr{D}(\nu_n-\omega)+\cdots\Big]\big(1 + \cdots\big)\quad(\text{one-quarter the Table 10-2 value; no grating term}).`}</EqBlock>
        <p>
          The cross-saturation coefficient between modes <Tex>{String.raw`n`}</Tex> and <Tex>{String.raw`m`}</Tex> is
          the striking one. Unlike the standing-wave <Tex>{String.raw`\theta`}</Tex> of Table&nbsp;10-2, this one is{" "}
          <strong>independent of the absolute detuning</strong> <Tex>{String.raw`(\omega-\nu)`}</Tex> from line center.
          For two co-propagating modes the cross-coupling depends only on their mode <em>spacing</em>{" "}
          <Tex>{String.raw`\nu_n-\nu_m`}</Tex>; the velocity-selective tuning structure of the standing-wave theory came
          from the counter-running <Tex>{String.raw`v=0`}</Tex> resonance, which is simply absent when both modes travel
          the same way:
        </p>
        <KeyResult
          number="26"
          eq={String.raw`\theta_{nm} = \frac{2\hbar^2\gamma_a\gamma_b}{\wp^2}\,\mathrm{Im}\{\vartheta_{1122}+\vartheta_{1221}\}\quad(\text{independent of detuning } \omega-\nu_1).`}
          label="Cross-saturation, unidirectional ring"
          note={
            <>
              Contrast with the standing-wave laser, where <Tex>{String.raw`\theta`}</Tex> depends sharply on tuning.
              Here it does not — the cleanest signature that traveling waves have erased the spatial structure.
            </>
          }
        />

        <Derivation title="Combination tones and the unidirectional limit" defaultOpen={false}>
          <Step title="Combination-tone generation">
            At third order, three field factors at frequencies <Tex>{String.raw`\nu_n,\nu_n,\nu_\rho`}</Tex> beat to
            produce polarization at <Tex>{String.raw`2\nu_n - \nu_\rho`}</Tex>. When this combination tone lands at the
            frequency of another mode <Tex>{String.raw`m`}</Tex>, it coherently drives that mode. With equal mode
            spacing this leads to mode locking.
          </Step>
          <Step title="Coefficients as the unidirectional limit of Chapters IX–X">
            Because only one direction lases, take the standing-wave coefficients of Sections&nbsp;9-2 / Chapter&nbsp;X
            and drop the counter-running contributions. The self-saturation loses the spatial-hole-burning factor
            (Eq.&nbsp;25), and the cross-saturation <Tex>{String.raw`\theta_{nm}`}</Tex> loses its detuning dependence
            (Eq.&nbsp;26). The chapter&rsquo;s problems ask the student to verify these reductions explicitly.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Traveling waves erase spatial hole burning">
          The recurring theme: a traveling wave has uniform <Tex>{String.raw`|E|`}</Tex>, so it saturates the gain
          uniformly in space (it still burns a single Bennett hole, not a grating). That removes the
          spatial-hole-burning enhancement of self-saturation that characterizes the standing-wave laser. The
          absolute-detuning dependence of cross-saturation, by contrast, is lost for a separate reason: a single
          traveling wave draws gain from only one velocity ensemble, so there is no counter-running{" "}
          <Tex>{String.raw`v=0`}</Tex> resonance to tune through. Unidirectional ring multimode physics is therefore
          &ldquo;cleaner.&rdquo;
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="The ideas you keep">
          <ul>
            <li>
              <strong>The self-consistency loop</strong> — assume a field, compute the polarization from the density
              matrix, demand Maxwell consistency, read off amplitude and frequency equations — is the universal method.
              The ring laser just applies it to two counter-propagating running waves instead of one standing wave.
            </li>
            <li>
              <strong>Traveling waves have no spatial hole burning and no single-direction Lamb dip.</strong> A single
              ring wave is uniform in space (no grating) yet still burns one Bennett hole at one Doppler-shifted
              velocity class, so only one velocity ensemble contributes gain and no resonance lands at{" "}
              <Tex>{String.raw`v=0`}</Tex>. Because only that single velocity ensemble contributes gain regardless of
              tuning, the self-saturation loses the complex denominator that produced the Lamb dip. That same single
              velocity ensemble — the absence of the counter-running <Tex>{String.raw`v=0`}</Tex> resonance — is also why
              unidirectional ring cross-saturation depends only on mode spacing, not absolute detuning. Spatial
              uniformity is a separate effect: it removes the population grating, leaving ring self-saturation at
              one-quarter the standing-wave (Table&nbsp;10-2) value.
            </li>
            <li>
              <strong>Cross- vs. self-saturation drives all competition.</strong> The dimensionless{" "}
              <Tex>{String.raw`\mathcal{C}=\theta_{+-}\theta_{-+}/(\beta_+\beta_-)`}</Tex> decides coexistence{" "}
              (<Tex>{String.raw`\mathcal{C}<1`}</Tex>) vs. winner-take-all bistability (<Tex>{String.raw`\mathcal{C}>1`}</Tex>)
              — the same criterion for any competing laser modes.
            </li>
            <li>
              <strong>The coupled intensity equations</strong>{" "}
              <Tex>{String.raw`\dot I_\pm = 2I_\pm(\alpha-\beta I-\theta I_\mp)`}</Tex> are the Lotka–Volterra form
              shared with the two-mode laser of Chapter&nbsp;IX; steady states and stability read off identically.
            </li>
            <li>
              <strong>The Adler equation</strong> <Tex>{String.raw`\dot\Psi = d + l\sin\Psi`}</Tex> is the universal
              phase-locking equation — injection locking, PLLs, coupled oscillators. Locking when{" "}
              <Tex>{String.raw`|d|\le l`}</Tex>; running with average beat <Tex>{String.raw`\sqrt{d^2-l^2}`}</Tex>{" "}
              otherwise.
            </li>
            <li>
              <strong>Two distinct couplings.</strong> Intensity coupling <Tex>{String.raw`\mathcal{C}`}</Tex> decides
              whether both waves run; phase/backscatter coupling <Tex>{String.raw`l`}</Tex> decides whether their
              frequencies lock. A laser can run both waves yet have a locked (zero) beat note.
            </li>
            <li>
              <strong>The physical payoff: a Sagnac gyroscope.</strong> Rotation gives the splitting{" "}
              <Tex>{String.raw`d\sim\Omega`}</Tex>; backscatter <Tex>{String.raw`l`}</Tex> opens a dead band{" "}
              <Tex>{String.raw`|d|<l`}</Tex> where the beat is zero and the gyro is blind. Defeating lock-in (by
              dithering) is the core engineering problem.
            </li>
            <li>
              <strong>Combination tones</strong> <Tex>{String.raw`2\nu_n-\nu_\rho`}</Tex> couple longitudinal modes and
              underlie mode locking — the bridge to the multimode and mode-locking chapters that follow.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
