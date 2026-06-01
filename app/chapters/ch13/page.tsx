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
import Ch13Sim from "@/components/sims/ch13";

export default function Page() {
  return (
    <Lesson slug="ch13">
      <Lede>
        Fire a short, intense light pulse through a resonant medium faster than the atoms can relax —
        <Tex>{String.raw`\tau_p \ll T_1, T_2`}</Tex> — and the comfortable rate-equation picture of populations
        being driven to saturation falls apart. The atomic dipoles now <em>remember</em> the leading edge of the pulse
        and respond <em>coherently</em> to the trailing edge: medium and field become a single coupled, reversible
        system. The headline surprise is <strong>self-induced transparency</strong> — a <Tex>{String.raw`2\pi`}</Tex>{" "}
        hyperbolic-secant pulse sails through an absorber <em>without loss</em>, borrowing energy on its way up and
        handing it right back on its way down. The unifying bookkeeper is the Bloch vector; the unifying theme is that
        coherence makes light-matter interaction area-conserving and full of effects that intensity-only thinking
        misses.
      </Lede>

      <Section title="Overview: SVEA and the coherent vs. rate-equation fork">
        <Intuition title="SVEA in one sentence">
          A laser pulse is a fast optical wave whose <em>envelope</em> changes slowly. Assume the amplitude and phase
          barely move over one optical cycle or one wavelength, so second derivatives of the envelope are negligible
          next to <Tex>{String.raw`\nu`}</Tex> times its first derivatives. This <strong>Slowly-Varying Envelope
          Approximation</strong> (SVEA) linearizes the fast carrier away and leaves a clean first-order PDE for the
          envelope <Tex>{String.raw`\mathscr{E}`}</Tex>.
        </Intuition>
        <p>
          Earlier chapters Fourier-analyzed the field into frequency modes. For a pulse — broad spectrum, phase matters
          — it is far more natural to stay in the time domain and follow a slowly-varying complex envelope riding on a
          fast carrier at optical frequency <Tex>{String.raw`\nu`}</Tex> and wavenumber <Tex>{String.raw`K`}</Tex>:
        </p>
        <KeyResult
          number="1"
          eq={String.raw`E(z,t) = \tfrac{1}{2}\,\mathscr{E}(z,t)\,\exp[-i(\nu t - Kz)] + \text{c.c.}`}
          label="Field SVEA ansatz"
          note={
            <>
              The slow physics lives in <Tex>{String.raw`\mathscr{E}(z,t)`}</Tex>; the fast carrier is the exponential.
              Pulse reshaping shows up directly as dynamics of the envelope.
            </>
          }
        />
        <p>
          The carrier wavenumber is fixed to the vacuum dispersion relation; the medium&rsquo;s entire effect is carried
          by how <Tex>{String.raw`\mathscr{E}`}</Tex> evolves:
        </p>
        <EqBlock label="carrier">{String.raw`K = \nu/c.`}</EqBlock>
        <Derivation title="Why a time-domain envelope, and the coherence criterion" defaultOpen={false}>
          <Step title="Envelope beats Fourier modes for pulses">
            Frequency-domain mode expansions are awkward for pulses whose spectra are broad and whose phases matter.
            Writing the field as <Tex>{String.raw`\text{envelope}\times\text{carrier}`}</Tex> (Eq.&nbsp;1) keeps the slow{" "}
            <Tex>{String.raw`\mathscr{E}`}</Tex> separate from the fast{" "}
            <Tex>{String.raw`\exp[-i(\nu t - Kz)]`}</Tex>, so propagation appears as the dynamics of{" "}
            <Tex>{String.raw`\mathscr{E}(z,t)`}</Tex> alone.
          </Step>
          <Step title="State the fork that organizes the chapter">
            Compare the pulse duration <Tex>{String.raw`\tau_p`}</Tex> with the relaxation times{" "}
            <Tex>{String.raw`T_1`}</Tex> (population) and <Tex>{String.raw`T_2`}</Tex> (dipole/phase).{" "}
            <Tex>{String.raw`\tau_p \gg T_1,T_2`}</Tex> is the rate-equation regime (Sec.&nbsp;13-2);{" "}
            <Tex>{String.raw`\tau_p \ll T_1,T_2`}</Tex> is the coherent regime (Sec.&nbsp;13-3, 13-4). Keep this fork in
            mind throughout: the same envelope equation reduces two different ways.
          </Step>
        </Derivation>
      </Section>

      <Section title="13-1 Field envelope equation of motion">
        <Intuition>
          The whole chapter rests on one self-consistent loop: the field drives the atomic dipoles, and the dipoles
          radiate back into the field. Here we make that loop concrete — a first-order PDE in which the spatial
          growth/decay of the envelope (plus its retardation as it travels at <Tex>{String.raw`c`}</Tex>) is{" "}
          <em>sourced</em> by the medium&rsquo;s polarization. The polarization in turn comes from the off-diagonal
          density-matrix element <Tex>{String.raw`\rho_{ab}`}</Tex>, which obeys the optical Bloch equations.
        </Intuition>
        <p>
          Write the polarization with the same envelope/carrier split as the field:
        </p>
        <EqBlock label="2">{String.raw`P(z,t) = \tfrac{1}{2}\,\mathscr{P}(z,t)\,\exp[-i(\nu t - Kz)] + \text{c.c.}`}</EqBlock>
        <p>
          Substituting Eqs.&nbsp;(1)–(2) into the macroscopic wave equation and dropping second derivatives of the slow
          envelopes (SVEA) collapses the second-order wave equation to a first-order field PDE:
        </p>
        <KeyResult
          number="3"
          eq={String.raw`\frac{\partial \mathscr{E}}{\partial z} + \frac{1}{c}\frac{\partial \mathscr{E}}{\partial t} + \kappa\,\mathscr{E} = \tfrac{1}{2}i\nu(\varepsilon_0 c)^{-1}\,\mathscr{P}`}
          label="Field envelope PDE (self-consistency)"
          note={
            <>
              Spatial evolution + retarded time derivative + linear loss <Tex>{String.raw`\kappa`}</Tex> equals the
              source from the polarization envelope. The factor <Tex>{String.raw`i`}</Tex> means the in-phase (real)
              part of <Tex>{String.raw`\mathscr{P}`}</Tex> drives amplitude while the out-of-phase part drives the
              phase.
            </>
          }
        />
        <p>
          The macroscopic <Tex>{String.raw`P`}</Tex> is the microscopic dipole density. Relate the polarization envelope
          to the density matrix through the dipole matrix element <Tex>{String.raw`\wp`}</Tex>:
        </p>
        <EqBlock label="4">{String.raw`\mathscr{P}_{ab} = \tfrac{1}{2}\wp\,\mathscr{P}(z,t)\,\exp[-i(\nu t - Kz)].`}</EqBlock>
        <p>
          The dipole obeys an optical Bloch equation: it oscillates at its own frequency{" "}
          <Tex>{String.raw`\omega`}</Tex>, decays at rate <Tex>{String.raw`\gamma = 1/T_2`}</Tex>, and is driven by the
          field times the population difference <Tex>{String.raw`D`}</Tex>:
        </p>
        <EqBlock label="5">{String.raw`\dot{\rho}_{ab}(z,\omega,t) = -(i\omega + \gamma)\rho_{ab} - \tfrac{1}{2}i\left(\frac{\wp}{\hbar}\right)\mathscr{E}(z,t)\exp[-i(\nu t - Kz)]\,D.`}</EqBlock>
        <p>
          We track two combinations of populations — the inversion (which gives gain or absorption) and the sum (needed
          because the two levels can decay at different rates):
        </p>
        <EqBlock label="6">{String.raw`D = \rho_{aa} - \rho_{bb},`}</EqBlock>
        <EqBlock label="7">{String.raw`M = \rho_{aa} + \rho_{bb}.`}</EqBlock>
        <p>
          Their coupled equations of motion carry pumps <Tex>{String.raw`\lambda_a,\lambda_b`}</Tex>, decays, an
          asymmetric-decay cross term, and the stimulated coherent exchange (the bracket):
        </p>
        <EqBlock label="8">{String.raw`\dot{D} = \lambda_a - \lambda_b - \gamma_{ab}D - \tfrac{1}{2}(\gamma_a - \gamma_b)M + \left[\,i\left(\frac{\wp}{\hbar}\right)\mathscr{E}(z,t)\exp[-i(\nu t - Kz)]\rho_{ba} + \text{c.c.}\,\right],`}</EqBlock>
        <EqBlock label="9">{String.raw`\dot{M} = \lambda_a + \lambda_b - \gamma_{ab}M - \tfrac{1}{2}(\gamma_a - \gamma_b)D.`}</EqBlock>
        <p>
          Formally integrate the sum equation (9) and substitute into (8): the inversion obeys an integro-differential
          equation whose memory integral over past <Tex>{String.raw`D`}</Tex> arises from the unequal level decay rates.
          This memory is what makes coherent propagation history-dependent:
        </p>
        <EqBlock label="10">{String.raw`\dot{D} = \frac{2\bar{N}_2}{\gamma_0}N - \gamma_{ab}D + \tfrac{1}{2}(\gamma_a - \gamma_b)^2\!\int_{-\infty}^{t}\!\! dt'\,\exp[-\gamma_{ab}(t-t')]\,D(z,\omega,t') + \left[\,i\left(\frac{\wp}{\hbar}\right)\mathscr{E}(z,t)\exp[-i(\nu t - Kz)]\rho_{ba} + \text{c.c.}\,\right].`}</EqBlock>
        <p>
          The equilibrium inversion available before any field is set by the balance of pump and decay rates:
        </p>
        <EqBlock label="11">{String.raw`N = \lambda_a\gamma_b^{-1} - \lambda_b\gamma_a^{-1}.`}</EqBlock>

        <Derivation title="Close the dipole into a coupled homogeneous master equation">
          <Step title="Polarization from the density matrix (homogeneous)">
            For a homogeneously broadened medium (single <Tex>{String.raw`\omega`}</Tex>) the macroscopic polarization is
            the dipole density,
            <EqBlock label="14">{String.raw`P(z,t) = \wp\,\rho_{ab}(z,\omega,t) + \text{c.c.},`}</EqBlock>
            and stripping the carrier gives the envelope
            <EqBlock label="15">{String.raw`\mathscr{P}(z,t) = 2\wp\rho_{ab}(z,\omega,t)\exp[+i(\nu t - Kz)].`}</EqBlock>
          </Step>
          <Step title="Formally integrate the dipole equation (5)">
            Integrating (5) over time expresses the polarization envelope as a convolution of the field history with the
            inversion, weighted by the free-dipole phase factor. This kernel is the mathematical signature of
            coherence — the trailing edge feels what the leading edge did:
            <EqBlock label="16">{String.raw`\mathscr{P}(z,t) = -i\frac{\wp^2}{\hbar}\int_{-\infty}^{t}\! dt'\,\mathscr{E}(z,t')\exp[-i(\omega - \nu)(t-t')]\,D(z,\omega,t').`}</EqBlock>
          </Step>
          <Step title="Assemble the homogeneous master equation">
            Substitute (16) into the field PDE (3) to get a single coupled integro-differential equation for the
            envelope,
            <EqBlock label="17">{String.raw`\left(\frac{\partial}{\partial z} + \frac{1}{c}\frac{\partial}{\partial t} + \kappa\right)\mathscr{E}(z,t) = \alpha'\!\int_{-\infty}^{t}\! dt'\,\mathscr{E}(z,t')\exp[-\gamma(t-t')]\,\frac{D(z,\omega,t')}{N},`}</EqBlock>
            with the signed gain parameter
            <EqBlock label="18">{String.raw`\alpha' = \frac{\wp^2 \nu N}{2\hbar\varepsilon_0 c}.`}</EqBlock>
            This is the starting point for both the rate-equation reduction (Sec.&nbsp;13-2) and the area theorem
            (Sec.&nbsp;13-3).
          </Step>
        </Derivation>

        <Intuition title="Memory kernel = coherence">
          The convolution <Tex>{String.raw`\exp[-i(\omega-\nu)(t-t')]`}</Tex> in Eq.&nbsp;(16) lets the trailing edge of
          a pulse &ldquo;feel&rdquo; what the leading edge did to the atoms. Make <Tex>{String.raw`\gamma`}</Tex> large
          (fast dephasing) and the kernel collapses to the present instant — that limit is the rate equation of the next
          section.
        </Intuition>

        <p>
          Real media are inhomogeneously broadened: atoms carry a spread of resonant frequencies{" "}
          <Tex>{String.raw`\omega`}</Tex> weighted by a distribution <Tex>{String.raw`W(\omega)`}</Tex>. The
          polarization then integrates the dipole over that distribution,
        </p>
        <EqBlock label="19">{String.raw`P(z,t) = \wp\int_{-\infty}^{\infty}\! d\omega\, W(\omega)\,\rho_{ab}(z,\omega,t) + \text{c.c.},`}</EqBlock>
        <EqBlock label="20">{String.raw`\mathscr{P}(z,t) = -i\frac{\wp^2}{\hbar}\int_{-\infty}^{t}\! dt'\,\mathscr{E}(z,t')\exp[-\gamma(t-t')]\int_{-\infty}^{\infty}\! d\omega\, W(\omega)\exp[-i(\omega-\nu)(t-t')]\,D(z,\omega,t').`}</EqBlock>
        <p>
          Pack the inhomogeneous frequency average into one function — the complex susceptibility integral, a function
          of the memory time <Tex>{String.raw`T = t - t'`}</Tex>:
        </p>
        <KeyResult
          number="21"
          eq={String.raw`\chi(z,T,t) = N^{-1}\int_{-\infty}^{\infty}\! d\omega\, W(\omega)\exp[-i(\omega-\nu)T]\,D(z,\omega,t)`}
          label="Complex susceptibility integral"
        />
        <p>
          The polarization envelope and field equation become compact convolutions of <Tex>{String.raw`\chi`}</Tex>:
        </p>
        <EqBlock label="22">{String.raw`\mathscr{P}(z,t) = -i\frac{\wp^2 N}{\hbar}\int_{-\infty}^{t}\! dt'\,\mathscr{E}(z,t')\exp[-\gamma(t-t')]\,\chi(z,t-t',t),`}</EqBlock>
        <EqBlock label="23">{String.raw`\frac{\partial\mathscr{E}}{\partial z} + \frac{1}{c}\frac{\partial\mathscr{E}}{\partial t} + \kappa\,\mathscr{E} = \alpha'\!\int_{-\infty}^{t}\! dt'\,\mathscr{E}(z,t')\exp[-\gamma(t-t')]\,\chi(z,t-t',t).`}</EqBlock>
        <p>
          The partner to (23) is the equation of motion for <Tex>{String.raw`\chi`}</Tex>, obtained by differentiating
          (21) and using the inversion dynamics (10). The intermediate form is
        </p>
        <EqBlock label="23 cont.">{String.raw`\frac{\partial\chi(z,T,t)}{\partial t} = N^{-1}\!\int_{-\infty}^{\infty}\! d\omega\, W(\omega)\exp[-i(\omega-\nu)T]\,\dot{D},`}</EqBlock>
        <p>
          and carrying it out gives the full coupled susceptibility equation of motion:
        </p>
        <EqBlock label="24">{String.raw`\frac{\partial}{\partial t}\chi(z,T,t) = \frac{2\wp^2 N}{\hbar}\bar{W}(T) - \gamma_{ab}\,\chi(z,T,t) + \tfrac{1}{2}(\gamma_a-\gamma_b)^2\!\int_{-\infty}^{t}\! dt'\,\exp[-\gamma(t-t')]\,\chi(z,T,t-t'+t,t') - \tfrac{1}{2}\left(\frac{\wp}{\hbar}\right)^2\!\int_{-\infty}^{t}\! dt'\,\big[\mathscr{E}(z,t')\,\chi(z,T-t+t',T+t-t'+t,t') + \mathscr{E}^*(z,t')\,\chi(z,T+t-t',T+t-t',t')\big].`}</EqBlock>
        <p>
          Here <Tex>{String.raw`\bar{W}(T)`}</Tex> is the Fourier transform of the inhomogeneous line — physically the
          free-induction-decay envelope of the macroscopic dipole:
        </p>
        <KeyResult
          number="25"
          eq={String.raw`\bar{W}(T) = \int_{-\infty}^{\infty}\! d\omega\, W(\omega)\exp[-i(\omega-\nu)T]`}
          label="Fourier transform of the inhomogeneous distribution"
          note={<>For a Gaussian or Lorentzian line it gives the characteristic dephasing of the macroscopic dipole.</>}
        />

        <Figure
          caption={
            <>
              The self-consistent coherent loop. The field envelope <Tex>{String.raw`\mathscr{E}`}</Tex> drives each
              atomic dipole (Eq.&nbsp;5); the dipoles, averaged over the inhomogeneous line{" "}
              <Tex>{String.raw`W(\omega)`}</Tex>, build the polarization <Tex>{String.raw`\mathscr{P}`}</Tex>{" "}
              (Eqs.&nbsp;19–22), which sources the field back (Eq.&nbsp;3). The convolution carries memory of the past.
            </>
          }
        >
          <svg viewBox="0 0 560 200" width="100%">
            <defs>
              <marker id="ar13a" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
                <path d="M0,0 L7,3 L0,6 Z" fill="#4f46e5" />
              </marker>
              <marker id="ar13b" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
                <path d="M0,0 L7,3 L0,6 Z" fill="#e11d48" />
              </marker>
            </defs>
            <rect x="40" y="70" width="150" height="60" rx="8" fill="#eef2ff" stroke="#c7cdf5" />
            <text x="115" y="95" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1b2330">
              field envelope
            </text>
            <text x="115" y="116" textAnchor="middle" fontSize="14" fill="#4f46e5">
              ℰ(z, t)
            </text>
            <rect x="370" y="70" width="150" height="60" rx="8" fill="#fef2f4" stroke="#f4c7d2" />
            <text x="445" y="95" textAnchor="middle" fontSize="14" fontWeight="600" fill="#1b2330">
              polarization
            </text>
            <text x="445" y="116" textAnchor="middle" fontSize="14" fill="#e11d48">
              𝒫(z, t)
            </text>
            <path d="M195,88 C270,55 295,55 365,88" fill="none" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#ar13a)" />
            <text x="280" y="48" textAnchor="middle" fontSize="12" fill="#4f46e5">
              drives dipoles (Eq. 5)
            </text>
            <path d="M365,112 C295,145 270,145 195,112" fill="none" stroke="#e11d48" strokeWidth="2" markerEnd="url(#ar13b)" />
            <text x="280" y="170" textAnchor="middle" fontSize="12" fill="#e11d48">
              radiates back (Eq. 3) — with memory
            </text>
            <text x="280" y="22" textAnchor="middle" fontSize="12" fill="#5b6473">
              averaged over the inhomogeneous line W(ω)
            </text>
          </svg>
        </Figure>

        <Callout kind="warning" title="Two regimes share these equations">
          Equations&nbsp;(3), (17), and (23)–(24) are general. Sec.&nbsp;13-2 takes the long-pulse limit (rate equation);
          Sec.&nbsp;13-3 takes the short-pulse coherent limit (area theorem). Do not conflate the two reductions — they
          start from the same master equation but keep opposite limits of the memory kernel.
        </Callout>
      </Section>

      <Section title="13-2 Rate-equation limit: Beer's law, bleaching, and pulse sharpening">
        <Intuition>
          Now take the opposite limit from coherence. The pulse is long compared to the dipole dephasing time{" "}
          <Tex>{String.raw`(\tau_p \gg T_2)`}</Tex>, so the dipoles follow the field adiabatically and the medium
          responds only through its instantaneous population difference — a rate equation. The new physics versus
          steady-state laser theory is <strong>saturable absorption (bleaching)</strong>: a weak pulse obeys ordinary
          Beer&rsquo;s law, but a strong pulse depletes the absorbers, so the leading edge is eaten while the trailing
          edge sails through. The pulse sharpens, its trailing edge steepens, and its peak appears to advance faster
          than <Tex>{String.raw`c`}</Tex>.
        </Intuition>
        <p>
          The regime is the timescale ordering
        </p>
        <EqBlock label="26">{String.raw`\frac{1}{T} \ll T_2 \ll \tau_p \ll T_1 \approx \frac{1}{\gamma_a},\frac{1}{\gamma_b}.`}</EqBlock>
        <p>
          In this limit the inversion is depleted at a rate proportional to the intensity, where the natural intensity
          unit is the squared Rabi frequency:
        </p>
        <EqBlock label="27">{String.raw`\dot{D}(z,t) = -T_2\,I(z,t)\,D(z,t),`}</EqBlock>
        <EqBlock label="28">{String.raw`I(z,t) = \left|\frac{\wp\,\mathscr{E}(z,t)}{\hbar}\right|^2.`}</EqBlock>
        <p>
          Reducing the field PDE (17) gives a propagation equation for the intensity, driven by the fractional inversion{" "}
          <Tex>{String.raw`D/N`}</Tex>, with a homogeneous gain coefficient that is <Tex>{String.raw`2T_2`}</Tex> times{" "}
          <Tex>{String.raw`\alpha'`}</Tex>:
        </p>
        <EqBlock label="29">{String.raw`\left(\frac{\partial}{\partial z} + \frac{1}{c}\frac{\partial}{\partial t}\right)I(z,t) = a\,\frac{D}{N}\,I(z,t),`}</EqBlock>
        <EqBlock label="30">{String.raw`a = 2T_2\alpha' = \frac{\wp^2 \nu N T_2}{\hbar\varepsilon_0 c}.`}</EqBlock>

        <Derivation title="From local depletion to the closed energy equation">
          <Step title="Solve for the bleached inversion">
            Integrate the depletion law (27): the inversion decays exponentially in the accumulated energy that has
            passed,
            <EqBlock label="31">{String.raw`D(z,t) = N\,\exp[-T_2\,\mathscr{I}(z,t)],`}</EqBlock>
            where the running (partial) energy integral is
            <EqBlock label="32">{String.raw`\mathscr{I}(z,t) = \int_{-\infty}^{t}\! dt'\,I(z,t').`}</EqBlock>
          </Step>
          <Step title="Integrate the intensity equation, insert the bleached D">
            Integrating (29) and substituting (31) gives
            <EqBlock label="33">{String.raw`\left(\frac{\partial}{\partial z} + \frac{1}{c}\frac{\partial}{\partial t}\right)\mathscr{I}(z,t) = a\!\int_{-\infty}^{t}\! dt'\,\frac{D}{N}\,I(z,t') = a\!\int_{-\infty}^{t}\! dt'\,\exp[-T_2\mathscr{I}]\,I(z,t').`}</EqBlock>
          </Step>
          <Step title="Recognize the perfect derivative">
            Because <Tex>{String.raw`\exp[-T_2\mathscr{I}]\,I`}</Tex> is{" "}
            <Tex>{String.raw`-\tfrac{1}{T_2}\partial_t\exp[-T_2\mathscr{I}]`}</Tex>, the integral evaluates in closed form
            to the central saturable PDE:
            <KeyResult
              number="34"
              eq={String.raw`\left(\frac{\partial}{\partial z} + \frac{1}{c}\frac{\partial}{\partial t}\right)\mathscr{I}(z,t) = \frac{a}{T_2}\{1 - \exp[-T_2\mathscr{I}(z,t)]\}.`}
              label="Closed energy-integral equation (Frantz–Nodvik type)"
            />
            Small fluence gives linear (Beer) behavior; large fluence saturates — the medium is bleached.
          </Step>
        </Derivation>

        <p>
          Take <Tex>{String.raw`t\to\infty`}</Tex> to get the total pulse energy (fluence) at position{" "}
          <Tex>{String.raw`z`}</Tex>, and its propagation:
        </p>
        <EqBlock label="35">{String.raw`\mathscr{I}^{\infty}(z) = \mathscr{I}(z,\infty) = \int_{-\infty}^{\infty}\! dt\, I(z,t) = \int_{-\infty}^{\infty}\! dt\,\left|\frac{\wp\mathscr{E}(z,t)}{\hbar}\right|^2,`}</EqBlock>
        <KeyResult
          number="36"
          eq={String.raw`\frac{\partial}{\partial z}\mathscr{I}^{\infty}(z) = \frac{a}{T_2}\{1 - \exp[-T_2\,\mathscr{I}^{\infty}(z)]\}`}
          label="Saturable fluence propagation (rate-equation limit)"
          note={
            <>
              The marquee rate-equation result. Two limits read straight off it: Beer&rsquo;s law for a weak pulse,
              saturated linear growth for a strong one.
            </>
          }
        />
        <p>
          Expanding for small energy recovers ordinary Beer&rsquo;s law (exponential attenuation for an absorber,{" "}
          <Tex>{String.raw`a<0`}</Tex>); the large-energy limit is linear because the medium is fully bleached and can
          absorb only a fixed energy per unit length:
        </p>
        <EqBlock label="37">{String.raw`\frac{\partial}{\partial z}\mathscr{I}^{\infty}(z) = a\,\mathscr{I}^{\infty}(z),`}</EqBlock>
        <EqBlock label="38">{String.raw`\frac{\partial}{\partial z}\mathscr{I}^{\infty}(z) = \frac{a}{T_2}.`}</EqBlock>
        <p>
          Integrating the running equation (34) over retarded time <Tex>{String.raw`\tau = t - z/c`}</Tex> gives the full
          analytic propagated pulse shape — the Frantz–Nodvik solution — and its leading-edge limit:
        </p>
        <KeyResult
          number="39"
          eq={String.raw`I(z,\tau) = I(0,\tau)\exp(a z)\left\{1 + \exp(a z)\left[\exp\!\Big(T_2\!\int_{-\infty}^{\tau}\! dt'\, I(0,t')\Big) - 1\right]\right\}^{-1}`}
          label="Propagated pulse shape (Frantz–Nodvik)"
        />
        <EqBlock label="40 region">{String.raw`I(z,\tau) \simeq I(0,\tau)\exp(a z)\qquad (\text{leading edge}).`}</EqBlock>

        <Figure
          caption={
            <>
              Pulse sharpening in a saturable absorber. The leading edge bleaches the medium at its own expense, so the
              surviving <em>peak</em> sits at progressively earlier retarded time — an apparent superluminal advance —
              while the trailing edge passes through the now-transparent medium. Nothing physical exceeds{" "}
              <Tex>{String.raw`c`}</Tex>; the pulse is reshaped, not accelerated.
            </>
          }
        >
          <svg viewBox="0 0 560 200" width="100%">
            <line x1="40" y1="160" x2="520" y2="160" stroke="#9aa3b2" strokeWidth="1.5" />
            <text x="500" y="178" fontSize="11" fill="#5b6473">
              retarded time τ
            </text>
            {/* input pulse: symmetric gaussian-ish */}
            <path
              d="M70,160 C140,160 150,70 190,70 C230,70 240,160 310,160"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="5,4"
            />
            <text x="190" y="58" textAnchor="middle" fontSize="11" fill="#5b6473">
              input I(0, τ)
            </text>
            {/* output pulse: sharpened, peak shifted earlier (left), steep trailing edge */}
            <path
              d="M70,160 C120,160 128,95 150,95 C172,95 176,160 230,160"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.6"
            />
            <text x="150" y="86" textAnchor="middle" fontSize="11" fontWeight="600" fill="#4f46e5">
              output I(z, τ)
            </text>
            <line x1="190" y1="70" x2="190" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,3" />
            <line x1="150" y1="95" x2="150" y2="160" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2,3" />
            <path d="M190,178 L150,178" stroke="#e11d48" strokeWidth="1.5" markerEnd="url(#ar13c)" />
            <defs>
              <marker id="ar13c" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#e11d48" />
              </marker>
            </defs>
            <text x="380" y="100" fontSize="12" fill="#5b6473">
              peak advances + sharpens
            </text>
            <text x="380" y="120" fontSize="12" fill="#5b6473">
              (leading edge absorbed,
            </text>
            <text x="380" y="136" fontSize="12" fill="#5b6473">
              trailing edge bleaches through)
            </text>
          </svg>
        </Figure>

        <Derivation title="The rate-equation reduction in five moves" defaultOpen={false}>
          <Step title="Collapse the memory kernel">
            Impose the timescale ordering (26). Fast dephasing means the dipole follows the field instantaneously; the
            convolution in (16) collapses to a local depletion law (27) in terms of the intensity (28).
          </Step>
          <Step title="Intensity propagation">
            Reduce the field PDE (17) to the intensity equation (29) with gain coefficient{" "}
            <Tex>{String.raw`a = 2T_2\alpha'`}</Tex> (30).
          </Step>
          <Step title="Bleached inversion">
            Integrate the depletion law to get <Tex>{String.raw`D = N\exp[-T_2\mathscr{I}]`}</Tex> (31): the inversion is
            exhausted as energy passes.
          </Step>
          <Step title="Close the energy equation">
            The integrand is a perfect time-derivative, so (33) integrates to the saturable PDE (34); the{" "}
            <Tex>{String.raw`t\to\infty`}</Tex> limit gives the total-fluence equation (36).
          </Step>
          <Step title="Read the limits and the pulse shape">
            Small energy → Beer&rsquo;s law (37); large energy → saturated linear growth (38). Integrating (34) over
            retarded time yields the Frantz–Nodvik shape (39), exhibiting leading-edge erosion, trailing-edge
            sharpening, and apparent peak advance.
          </Step>
        </Derivation>

        <Intuition title="Why the pulse seems to outrun light">
          Nothing physical exceeds <Tex>{String.raw`c`}</Tex>. The leading edge is preferentially absorbed — it bleaches
          the medium at its own expense — so the <em>peak</em> of the surviving pulse sits at progressively earlier
          retarded time, and the pulse appears to advance and sharpen. The trailing edge, finding the medium already
          transparent, passes freely. In an amplifier the same logic sharpens the leading edge instead.
        </Intuition>
        <Callout kind="insight" title="Saturable-absorber takeaway">
          Weak pulse: Beer&rsquo;s law <Tex>{String.raw`\exp(az)`}</Tex>. Strong pulse: the medium bleaches and absorbs
          only a fixed energy per unit length (Eq.&nbsp;38). This is the operating principle of passive Q-switches and
          saturable-absorber mode-lockers.
        </Callout>
      </Section>

      <Section title="13-3 The pulse area theorem and self-induced transparency">
        <Intuition>
          This is the crown jewel. In the fully coherent limit{" "}
          <Tex>{String.raw`(\tau_p \ll T_1,T_2)`}</Tex>, what governs propagation is not the pulse intensity but its{" "}
          <strong>area</strong> — the time-integrated Rabi frequency, geometrically the angle through which the Bloch
          vector is tipped on the unit sphere. McCall and Hahn proved that this single number obeys a strikingly simple,
          medium-only equation, <Tex>{String.raw`d\theta/dz = \tfrac{1}{2}a\sin\theta`}</Tex>. The fixed points are{" "}
          <Tex>{String.raw`\theta = n\pi`}</Tex>. The payoff is <strong>self-induced transparency</strong>: a{" "}
          <Tex>{String.raw`2\pi`}</Tex> hyperbolic-secant pulse flips every atom fully up on its leading edge (absorbing
          energy) and fully back down on its trailing edge (stimulating that energy right back). Net energy exchange is
          zero — the absorber is transparent to it.
        </Intuition>
        <p>
          Define the pulse area as the dipole moment over <Tex>{String.raw`\hbar`}</Tex> times the time-integrated
          envelope — the total Rabi flip angle imparted to a resonant atom:
        </p>
        <KeyResult
          number="40"
          eq={String.raw`\theta(z) = \frac{\wp}{\hbar}\int_{-\infty}^{\infty}\! dt\,\mathscr{E}(z,t)`}
          label="Pulse area"
          note={<>On the Bloch sphere, the angle through which the whole pulse rotates the R-vector.</>}
        />
        <p>
          For a weak pulse in an absorber the area simply decays exponentially — the classical, linear Beer baseline.
          This is the small-<Tex>{String.raw`\theta`}</Tex> limit, <em>not</em> the famous theorem:
        </p>
        <EqBlock label="41">{String.raw`\frac{d}{dz}\theta(z) = -\tfrac{1}{2}|a|\,\theta(z).`}</EqBlock>
        <p>
          The full coherent treatment gives the nonlinear, shape-independent McCall–Hahn result:
        </p>
        <KeyResult
          number="42"
          eq={String.raw`\frac{d}{dz}\theta(z) = \tfrac{1}{2}\,a\,\sin[\theta(z)]`}
          label="McCall–Hahn Pulse Area Theorem"
          note={
            <>
              The area evolves with distance as its own sine — independent of pulse shape. Fixed points at{" "}
              <Tex>{String.raw`\theta = n\pi`}</Tex>. Eq.&nbsp;(41) is its small-<Tex>{String.raw`\theta`}</Tex> limit (
              <Tex>{String.raw`\sin\theta\to\theta`}</Tex>) with the same coefficient.
            </>
          }
        />

        <Derivation title="Solve the area theorem and read off the fixed points">
          <Step title="Separate variables">
            Write <Tex>{String.raw`d\theta/\sin\theta = \tfrac{1}{2}a\,dz`}</Tex> and use the standard integral
            <EqBlock>{String.raw`\int \frac{d\theta}{\sin\theta} = \ln\left|\tan\frac{\theta}{2}\right|.`}</EqBlock>
          </Step>
          <Step title="Integrate and invert">
            Integrating from <Tex>{String.raw`\theta_0`}</Tex> at <Tex>{String.raw`z=0`}</Tex> to{" "}
            <Tex>{String.raw`\theta(z)`}</Tex> gives{" "}
            <Tex>{String.raw`\ln|\tan(\theta/2)| - \ln|\tan(\theta_0/2)| = \tfrac{1}{2}az`}</Tex>. Exponentiate and
            invert:
            <KeyResult
              number="43"
              eq={String.raw`\theta(z) = 2\tan^{-1}\!\big[\tan(\theta_0/2)\,\exp(az/2)\big].`}
              label="Area theorem solution"
            />
          </Step>
          <Step title="Fixed points and stability">
            For an absorber <Tex>{String.raw`(a<0)`}</Tex>, <Tex>{String.raw`\exp(az/2)\to 0`}</Tex>, so{" "}
            <Tex>{String.raw`\tan(\theta/2)\to 0`}</Tex> and <Tex>{String.raw`\theta`}</Tex> flows to an even multiple of{" "}
            <Tex>{String.raw`\pi`}</Tex>; for an amplifier <Tex>{String.raw`(a>0)`}</Tex> it flows to odd multiples:
            <KeyResult
              number="44"
              eq={String.raw`\lim_{z\to\infty}\theta(z) = \begin{cases} 2n\pi, & a<0 \\[2pt] (2n+1)\pi, & a>0 \end{cases}`}
              label="Asymptotic pulse areas"
            />
            Stability check: at <Tex>{String.raw`\theta = 2\pi`}</Tex> in an absorber, <Tex>{String.raw`\sin\theta`}</Tex>{" "}
            has negative slope, so it is a stable attractor (SIT); <Tex>{String.raw`\theta = \pi`}</Tex> is unstable.
            Consistency: a weak pulse in an absorber decays (matches Eq.&nbsp;41 and Beer&rsquo;s law Eq.&nbsp;37).
          </Step>
        </Derivation>

        <Callout kind="warning" title="Sign convention (do not 'correct' it)">
          Sargent, Scully &amp; Lamb use a <strong>signed</strong> gain coefficient: <Tex>{String.raw`a<0`}</Tex> for
          absorbers. Hence Eq.&nbsp;(42) is <Tex>{String.raw`+\tfrac{1}{2}a\sin\theta`}</Tex>, not the more common{" "}
          <Tex>{String.raw`-\tfrac{\alpha}{2}\sin\theta`}</Tex> form (which takes <Tex>{String.raw`\alpha>0`}</Tex> for
          absorbers). Both describe identical physics: in an absorber, weak pulses decay and{" "}
          <Tex>{String.raw`2\pi`}</Tex> is the stable attractor. Always cross-check against Beer&rsquo;s law,
          Eq.&nbsp;(37).
        </Callout>

        <p>
          Why does a <Tex>{String.raw`2\pi`}</Tex> pulse leave no trace? For a square resonant pulse the Rabi solution
          (Chapter II) gives the upper-state probability in terms of the generalized Rabi frequency{" "}
          <Tex>{String.raw`\mu`}</Tex>:
        </p>
        <EqBlock label="45">{String.raw`|C_a(z,t)|^2 = 1 - |C_b(z,t)|^2 = 1 - \left[\frac{\wp\mathscr{E}_0}{2\hbar}\right]^2\frac{\sin^2(\mu\tau_p/2)}{\mu^2},`}</EqBlock>
        <EqBlock label="45">{String.raw`\mu = \big[(\omega-\nu)^2 + (\wp\mathscr{E}_0/\hbar)^2\big]^{1/2}.`}</EqBlock>
        <p>
          A resonant <Tex>{String.raw`2\pi`}</Tex> pulse (<Tex>{String.raw`\mu\tau_p = 2\pi`}</Tex> on resonance) returns
          the atom exactly to the ground state — zero net absorption. The lossless solution is the hyperbolic-secant
          pulse of area <Tex>{String.raw`2\pi`}</Tex>, the prototype optical soliton, propagating at reduced velocity{" "}
          <Tex>{String.raw`v_p`}</Tex>:
        </p>
        <KeyResult
          number="46"
          eq={String.raw`\mathscr{E}(z,t) = \frac{2\hbar}{\wp\tau_p}\,\mathrm{sech}\!\left(\frac{t - z/v_p}{\tau_p}\right)`}
          label="2π hyperbolic-secant SIT pulse"
          note={
            <>
              The amplitude is fixed by demanding area <Tex>{String.raw`2\pi`}</Tex> (the integral of{" "}
              <Tex>{String.raw`\mathrm{sech}`}</Tex> is <Tex>{String.raw`\pi`}</Tex>).
            </>
          }
        />
        <p>
          The local picture is the population trajectory: an atom is excited and returns exactly to the ground state
          after the pulse, the more completely the closer to resonance:
        </p>
        <EqBlock label="47">{String.raw`R_3(z) = -1 + \frac{2}{1 + \tau_p^2(\omega-\nu)^2}\,\mathrm{sech}^2(t/\tau_p).`}</EqBlock>

        <SimFrame
          title="Pulse area theorem integrator: areas flow to nπ (self-induced transparency)"
          caption={
            <>
              Set the input area <Tex>{String.raw`\theta_0`}</Tex> and the signed coefficient{" "}
              <Tex>{String.raw`a`}</Tex>, then watch the area evolve with propagation distance. The RK4 integration of{" "}
              <Tex>{String.raw`d\theta/dz = \tfrac{1}{2}a\sin\theta`}</Tex> overlays the closed form (43) to validate it;
              the faint fan reproduces Fig.&nbsp;13-3(a). The bottom panel draws the sech envelope whose area equals the
              asymptotic value.
            </>
          }
          tryThis={
            <>
              Keep <Tex>{String.raw`a=-1`}</Tex> (absorber) and sweep <Tex>{String.raw`\theta_0`}</Tex> across{" "}
              <Tex>{String.raw`\pi`}</Tex>: just below it the area collapses to <Tex>{String.raw`0`}</Tex> (absorbed),
              just above it climbs to <Tex>{String.raw`2\pi`}</Tex> (transparent). The energy verdict flips to
              &ldquo;transparent (SIT)&rdquo; exactly at the <Tex>{String.raw`2\pi`}</Tex> basin. Now flip{" "}
              <Tex>{String.raw`a>0`}</Tex>: the stable attractors jump to the odd multiples of{" "}
              <Tex>{String.raw`\pi`}</Tex>.
            </>
          }
        >
          <Ch13Sim />
        </SimFrame>

        <Figure
          caption={
            <>
              The bowling-ball-of-pendulums picture (Fig.&nbsp;13-4). Each atom is a Bloch pendulum. A{" "}
              <Tex>{String.raw`2\pi`}</Tex> pulse swings every pendulum all the way up and back to the bottom — no net
              energy left in the medium, only a time delay. A <Tex>{String.raw`\pi`}</Tex> pulse leaves the pendulums
              standing up (fully inverted): unstable, and it will reradiate.
            </>
          }
        >
          <svg viewBox="0 0 560 170" width="100%">
            <line x1="30" y1="40" x2="530" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <text x="30" y="28" fontSize="11" fill="#5b6473">
              support
            </text>
            {/* 2pi: pendulums down (returned to ground) */}
            {[70, 110, 150, 190].map((x) => (
              <g key={`d${x}`}>
                <line x1={x} y1="40" x2={x} y2="100" stroke="#4f46e5" strokeWidth="2" />
                <circle cx={x} cy="100" r="7" fill="#4f46e5" />
              </g>
            ))}
            <text x="130" y="135" textAnchor="middle" fontSize="12" fill="#4f46e5">
              2π pulse: returned to ground
            </text>
            {/* pi: pendulums up (inverted), drawn above the support within view */}
            {[370, 410, 450, 490].map((x) => (
              <g key={`u${x}`}>
                <line x1={x} y1="40" x2={x} y2="14" stroke="#e11d48" strokeWidth="2" />
                <circle cx={x} cy="14" r="7" fill="#e11d48" />
              </g>
            ))}
            <text x="430" y="135" textAnchor="middle" fontSize="12" fill="#e11d48">
              π pulse: inverted (unstable)
            </text>
          </svg>
        </Figure>

        <Derivation title="The McCall–Hahn proof of the sine law (optional)" defaultOpen={false}>
          <Step title="Start from the resonant coupled equations">
            For the resonant, real-envelope reduction of Eqs.&nbsp;(23)–(24), the field and susceptibility obey
            <EqBlock label="48">{String.raw`\frac{\partial\mathscr{E}}{\partial z} + \frac{1}{c}\frac{\partial\mathscr{E}}{\partial t} + \kappa\,\mathscr{E} = \alpha'\!\int_{-\infty}^{\infty}\! d\omega'\,\mathscr{E}(z,t')\,\chi(z,t-t',t'),`}</EqBlock>
            <EqBlock label="49">{String.raw`\frac{\partial\chi(z,T,t)}{\partial t} = -\tfrac{1}{2}\left(\frac{\wp}{\hbar}\right)^2\!\int_{-\infty}^{t}\! dt'\,\mathscr{E}(z,t')\,\chi(z,T-t+t',T+t-t'+t,t').`}</EqBlock>
          </Step>
          <Step title="Integrate the field equation over all time">
            Integrating (48) over <Tex>{String.raw`t`}</Tex> turns the left side into the derivative of the area; the
            right becomes a frequency-integrated susceptibility evaluated at <Tex>{String.raw`T\to\infty`}</Tex>:
            <EqBlock label="50">{String.raw`\frac{d\theta}{dz} + \kappa\theta = \frac{a'\pi}{8}\int_{-\infty}^{\infty}\! d\omega'\,\bar{W}(\omega')\,\chi(z,T\to\infty,t),`}</EqBlock>
            <EqBlock label="51">{String.raw`\frac{d\theta}{dz} + \kappa\theta = \frac{1}{2}\frac{\wp}{\hbar}\int_{-\infty}^{\infty}\! dT\,\mathscr{E}(z,T)\int_{-\infty}^{\infty}\! dT\,\chi(z,T,t).`}</EqBlock>
          </Step>
          <Step title="Apply the sum rule and integrate to a sine">
            The time-integrated susceptibility before the pulse is fixed by the resonant atoms&rsquo; weight,
            <EqBlock label="52">{String.raw`\int_{-\infty}^{\infty}\! dT\,\chi(z,T,t_0) = 2\pi\,W(\nu_0),`}</EqBlock>
            so substituting and recognizing the running field integral as the area gives a cosine of the running area,
            which integrates to the sine law (42):
            <EqBlock label="53">{String.raw`\frac{d}{dz}\theta(z) + \kappa\theta(z) = 2\pi W(\nu_0)\,a'\cos\!\left[\frac{\wp}{\hbar}\int_{-\infty}^{t}\! dt'\,\mathscr{E}(z,t')\right].`}</EqBlock>
            This shows the theorem is exact and shape-independent.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Self-induced transparency">
          A <Tex>{String.raw`2\pi`}</Tex> hyperbolic-secant pulse propagates through a resonant absorber{" "}
          <em>without loss</em>, at reduced velocity. It coherently borrows energy from the medium on its leading half
          and returns it on its trailing half. The area is conserved at <Tex>{String.raw`2\pi`}</Tex>; the medium is
          effectively transparent.
        </Callout>
        <Intuition title="Bowling ball of pendulums">
          Think of each atom as a pendulum (its Bloch vector). A <Tex>{String.raw`2\pi`}</Tex> pulse swings each pendulum
          all the way up and back to the bottom — no net energy left in the medium, only a time delay. A{" "}
          <Tex>{String.raw`\pi`}</Tex> pulse leaves the pendulums standing up (fully inverted): unstable, and it will
          reradiate.
        </Intuition>
      </Section>

      <Section title="13-4 Photon echo">
        <Intuition>
          Photon echo is the optical analog of the magnetic spin echo. In an inhomogeneously broadened medium the
          dipoles precess at different rates, so after an initial kick the macroscopic dipole &ldquo;fans out&rdquo; and
          the radiated field dies away — free induction decay. The trick: a second pulse a time{" "}
          <Tex>{String.raw`\tau`}</Tex> later reverses every phase, so the fast-precessing dipoles, now placed behind,
          catch up to the slow ones. At <Tex>{String.raw`t = 2\tau`}</Tex> they all rephase at once, the macroscopic
          dipole revives, and the medium emits a coherent burst — the echo.
        </Intuition>
        <p>
          Write the two-level wavefunction; the radiating polarization comes from the coherence{" "}
          <Tex>{String.raw`C_a C_b^*`}</Tex>:
        </p>
        <EqBlock label="54">{String.raw`\psi(t,r) = C_a(t)\exp(-i\omega_a t)u_a(r) + C_b(t)\exp(-i\omega_b t)u_b(r).`}</EqBlock>

        <Derivation title="Track the phases through the 90°–180° sequence">
          <Step title="After the first (90°) pulse: equal superposition, then dephasing">
            A <Tex>{String.raw`90^\circ`}</Tex> pulse tips the Bloch vectors into the equatorial plane. Just before the
            second pulse, having freely dephased for time <Tex>{String.raw`\tau`}</Tex>:
            <EqBlock>{String.raw`\psi(t,\tau_-) = \frac{1}{\sqrt{2}}\big[\exp(-i\omega_a t)u_a + \exp(-i\omega_b t)u_b\big].`}</EqBlock>
          </Step>
          <Step title="The 180° pulse interchanges the amplitudes">
            A <Tex>{String.raw`180^\circ`}</Tex> pulse swaps the <Tex>{String.raw`a\leftrightarrow b`}</Tex> phase
            labels, which is exactly what reverses the accumulated phase:
            <EqBlock>{String.raw`\psi(t,\tau_+) = \frac{1}{\sqrt{2}}\big[\exp(-i\omega_b t)u_a + \exp(-i\omega_a t)u_b\big].`}</EqBlock>
          </Step>
          <Step title="Rephasing at 2τ">
            A time <Tex>{String.raw`t'`}</Tex> after the second pulse,
            <EqBlock>{String.raw`\psi(t,\tau+t') = \frac{1}{\sqrt{2}}\big[\exp(-i\omega_b t - i\omega_a t')u_a + \exp(-i\omega_a t - i\omega_b t')u_b\big].`}</EqBlock>
            The two phase factors realign when <Tex>{String.raw`t' = \tau`}</Tex> — total time{" "}
            <Tex>{String.raw`2\tau`}</Tex>.
          </Step>
        </Derivation>

        <p>
          Averaging the polarization over the inhomogeneous distribution shows all atoms come back in phase at{" "}
          <Tex>{String.raw`t' = \tau`}</Tex>:
        </p>
        <EqBlock label="55">{String.raw`\langle er\rangle = \wp\int_{-\infty}^{\infty}\! d\omega\, W(\omega)\exp[-i\kappa(t'-\tau)] + \text{c.c.}`}</EqBlock>
        <p>
          For a Gaussian inhomogeneous line of width <Tex>{String.raw`\Delta\omega`}</Tex>,
        </p>
        <EqBlock label="56">{String.raw`W(\omega) = \frac{1}{\sqrt{\pi}\,\Delta\omega}\exp[-(\omega-\omega_0)^2/(\Delta\omega)^2],`}</EqBlock>
        <p>
          the average yields a polarization that peaks sharply at the echo time, with width set by{" "}
          <Tex>{String.raw`1/\Delta\omega`}</Tex>:
        </p>
        <KeyResult
          number="57"
          eq={String.raw`\langle er\rangle = \wp\exp[-(t'-\tau)^2(\Delta\omega)^2]\cos\omega_0 t`}
          label="Echo polarization (Gaussian)"
          note={
            <>
              A Gaussian burst centered at <Tex>{String.raw`t'=\tau`}</Tex> (total time{" "}
              <Tex>{String.raw`2\tau`}</Tex>), riding the optical carrier <Tex>{String.raw`\cos\omega_0 t`}</Tex>.
            </>
          }
        />

        <Figure
          caption={
            <>
              The runners-on-a-track picture of rephasing. After the <Tex>{String.raw`90^\circ`}</Tex> pulse the dipoles
              (runners of different speeds) fan out and the macroscopic dipole vanishes. The{" "}
              <Tex>{String.raw`180^\circ`}</Tex> pulse at <Tex>{String.raw`\tau`}</Tex> turns everyone around; running
              back at their own unchanged speeds, they all cross the start line together at{" "}
              <Tex>{String.raw`2\tau`}</Tex> — the echo. Because rephasing is independent of speed, it cancels the
              inhomogeneous broadening.
            </>
          }
        >
          <svg viewBox="0 0 560 180" width="100%">
            <line x1="40" y1="150" x2="520" y2="150" stroke="#9aa3b2" strokeWidth="1.5" />
            <text x="50" y="168" fontSize="11" fill="#5b6473">
              t = 0
            </text>
            <text x="270" y="168" fontSize="11" fill="#5b6473">
              τ (180° pulse)
            </text>
            <text x="478" y="168" fontSize="11" fill="#5b6473">
              2τ (echo)
            </text>
            <line x1="280" y1="30" x2="280" y2="150" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4,4" />
            <line x1="490" y1="30" x2="490" y2="150" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4,4" />
            {/* three dipole "runners" of different speeds: fan out then rephase */}
            <path d="M60,80 C170,55 230,48 280,45 C330,55 430,90 490,80" fill="none" stroke="#4f46e5" strokeWidth="2" />
            <path d="M60,80 C170,80 230,80 280,80 C330,80 430,80 490,80" fill="none" stroke="#0891b2" strokeWidth="2" />
            <path d="M60,80 C170,105 230,112 280,115 C330,105 430,70 490,80" fill="none" stroke="#9333ea" strokeWidth="2" />
            <circle cx="490" cy="80" r="6" fill="#16a34a" />
            <text x="80" y="40" fontSize="11" fill="#5b6473">
              fan out (dephase)
            </text>
            <text x="350" y="40" fontSize="11" fill="#5b6473">
              rephase
            </text>
            <text x="498" y="70" fontSize="11" fontWeight="600" fill="#16a34a">
              echo
            </text>
          </svg>
        </Figure>

        <Derivation title="Echo in the susceptibility / field formalism" defaultOpen={false}>
          <Step title="Initial (FID) susceptibility">
            Before any pulse, the susceptibility is the free-induction-decay response; for a Gaussian{" "}
            <Tex>{String.raw`W`}</Tex> it is appreciable only for <Tex>{String.raw`T \lesssim 1/\Delta\omega`}</Tex>:
            <EqBlock label="58">{String.raw`\chi(0,T,t) = [2\pi W(\nu)]^{-1}\int_{-\infty}^{\infty}\! d\omega\, W(\omega)\exp[-i(\omega-\nu)T].`}</EqBlock>
          </Step>
          <Step title="Second-order iterated solution">
            Iterating the susceptibility equation to second order in the field is the basis for the two-pulse echo:
            <EqBlock label="59">{String.raw`\chi(z,T,t) = -\tfrac{1}{2}\left(\frac{\wp}{\hbar}\right)^2\!\int_{-\infty}^{t}\! dt'\,\mathscr{E}(z,t')\!\int_{-\infty}^{t'}\! dt''\,\mathscr{E}(z,t'')\big[\chi(0,T+t-t'+t'',t'') + \chi(0,T-t'+t'',t'')\big].`}</EqBlock>
          </Step>
          <Step title="Idealized impulsive pulses">
            Model the <Tex>{String.raw`90^\circ`}</Tex> and <Tex>{String.raw`180^\circ`}</Tex> pulses as area-
            <Tex>{String.raw`\tfrac{\pi}{2}`}</Tex> and area-<Tex>{String.raw`\pi`}</Tex> delta functions:
            <EqBlock label="60">{String.raw`\mathscr{E}(z,t') = \frac{\pi}{2}\frac{\hbar}{\wp}\,\delta(t'),\qquad \mathscr{E}(z,t') = \pi\frac{\hbar}{\wp}\,\delta(t'-\tau).`}</EqBlock>
          </Step>
          <Step title="Post-pulse susceptibility and the echo field">
            After both pulses, the susceptibility carries a free-induction term and a rephasing term that revives at{" "}
            <Tex>{String.raw`t = 2\tau`}</Tex>:
            <EqBlock label="61">{String.raw`\chi(T,t>\tau) = \frac{\pi}{2}\frac{\hbar}{\wp}\,\delta(t')\,\chi(0,T,t) + \pi\frac{\hbar}{\wp}\,\delta(t'-\tau,T).`}</EqBlock>
            The field equation then shows the radiated echo peaking at <Tex>{String.raw`t = 2\tau`}</Tex>:
            <EqBlock label="62">{String.raw`\frac{\partial}{\partial z}\mathscr{E}(z,t) = \alpha'\!\Big[\tfrac{\pi}{2}\frac{\hbar}{\wp}\,\chi(0,t,0) + \alpha'\frac{\pi}{2}\frac{\hbar}{\wp}\,\chi(0,t-\tau,\tau)\Big].`}</EqBlock>
            Because the rephasing is exact, the echo measures the true homogeneous dephasing time:{" "}
            <Tex>{String.raw`\exp(-\tau/T_2')`}</Tex>.
          </Step>
        </Derivation>

        <p>
          For hyperbolic-secant pulses (Problem&nbsp;13-9) the echo intensity ties the echo quantitatively to the SIT
          pulse shape:
        </p>
        <EqBlock label="Prob. 13-9">{String.raw`R_3(z,\nu)\exp(\alpha z) \propto \frac{\exp[T_2(\wp E_b/\hbar)\{\tanh(\tau/\tau_p)+1\}]}{1 + \exp(\alpha z)\{\exp[T_2(\wp E_b/\hbar)\{\tanh(\tau/\tau_p)+1\}]-1\}}.`}</EqBlock>

        <Callout kind="insight" title="Why photon echo matters">
          The echo amplitude decays with pulse separation as <Tex>{String.raw`\exp(-\tau/T_2')`}</Tex>, measuring the{" "}
          <strong>true homogeneous</strong> dephasing time, free of the much larger inhomogeneous width. It is the
          optical analog of Hahn&rsquo;s spin echo and a workhorse of coherent spectroscopy.
        </Callout>
        <Callout kind="history" title="From spins to photons">
          Hahn discovered the spin echo in 1950 in nuclear magnetic resonance; the photon echo (Kurnit, Abella &amp;
          Hartmann, 1964) carried the same rephasing idea into the optical domain. Both rest on the identical Bloch-vector
          geometry — a <Tex>{String.raw`180^\circ`}</Tex> pulse conjugates accumulated phase.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="The ideas you keep">
          <ul>
            <li>
              <strong>SVEA</strong> — split field and polarization into a slow envelope times a fast carrier, drop second
              derivatives. This first-order PDE picture recurs in every pulse, mode-locking, and laser-dynamics chapter.
            </li>
            <li>
              <strong>Two regimes set by timescales</strong> — rate-equation{" "}
              <Tex>{String.raw`(\tau_p \gg T_2)`}</Tex> vs. coherent <Tex>{String.raw`(\tau_p \ll T_1,T_2)`}</Tex>. Always
              ask which regime you are in before choosing equations.
            </li>
            <li>
              <strong>Saturable absorption / bleaching</strong> — a strong pulse depletes absorbers, sharpens, and
              advances; the basis of passive Q-switching and saturable-absorber mode-locking (Eqs.&nbsp;34, 38, 39).
            </li>
            <li>
              <strong>Pulse area</strong> <Tex>{String.raw`\theta = \tfrac{\wp}{\hbar}\int\mathscr{E}\,dt`}</Tex> — the
              Bloch tipping angle, obeying the McCall–Hahn theorem{" "}
              <Tex>{String.raw`d\theta/dz = \tfrac{1}{2}a\sin\theta`}</Tex> with stable fixed points at{" "}
              <Tex>{String.raw`2\pi`}</Tex> (absorber) or odd-<Tex>{String.raw`\pi`}</Tex> (amplifier).
            </li>
            <li>
              <strong>Self-induced transparency</strong> — the <Tex>{String.raw`2\pi`}</Tex> sech pulse, a lossless
              solitary wave and the precursor of the optical soliton.
            </li>
            <li>
              <strong>The Bloch R-vector</strong> is the universal bookkeeper: area = rotation angle, dephasing =
              fan-out, <Tex>{String.raw`180^\circ`}</Tex> pulse = phase reversal. Carry it into spectroscopy and
              coherent control.
            </li>
            <li>
              <strong>Photon echo</strong> — a <Tex>{String.raw`90^\circ`}</Tex>–<Tex>{String.raw`180^\circ`}</Tex> pair
              rephases dephased dipoles at <Tex>{String.raw`2\tau`}</Tex>; its decay{" "}
              <Tex>{String.raw`\exp(-\tau/T_2')`}</Tex> measures the true homogeneous <Tex>{String.raw`T_2`}</Tex>, the
              template for all echo spectroscopy.
            </li>
            <li>
              <strong>Inhomogeneous broadening</strong> is handled by integrating the susceptibility over{" "}
              <Tex>{String.raw`W(\omega)`}</Tex>, whose Fourier transform <Tex>{String.raw`\bar{W}(T)`}</Tex> is the
              free-induction-decay envelope — machinery that generalizes to many coherent transients.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
