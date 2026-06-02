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
import Ch09Sim from "@/components/sims/ch09";

export default function Page() {
  return (
    <Lesson slug="ch09">
      <Lede>
        A single-mode laser is a clean story: one frequency, one intensity, settle and done. But a real cavity supports
        many longitudinal modes, and once two or more of them lase they stop being independent — they share the same
        atoms. Sharing the inversion couples the modes through two distinct mechanisms: <strong>spatial hole burning</strong>{" "}
        (their standing-wave patterns burn overlapping holes in the gain) and <strong>population pulsation</strong> (each
        pair of modes <em>beats</em>, and that beat note shakes the atomic populations at the difference frequency, a
        moving grating that scatters one mode&rsquo;s light into the other). Which one dominates is set by the cavity
        geometry and by the beat-to-decay-rate ratio; for the standing-wave two-mirror laser hole burning dominates and
        pulsations are a correction, while pulsations rule the phase-locking physics. This chapter is the physics of that
        competition and coupling — from quiet steady multimode output
        (weak coupling), to winner-take-all bistability (strong coupling), to the spectacular regime where the modes
        phase-lock into a comb and the output collapses into a train of ultrashort pulses (<strong>mode locking</strong>),
        the foundation of all ultrafast optics.
      </Lede>

      <Section title="Framing: why multimode is different">
        <Intuition>
          In the single-mode chapter every quantity settled to a constant amplitude and a steady frequency. The moment
          two modes oscillate, their fields beat at the difference frequency, and the atomic medium — being{" "}
          <em>nonlinear</em> — responds at that beat frequency. These <strong>population pulsations</strong> are the new
          physics; they are simply absent from the single-mode rate-equation picture. So we must keep the field as a
          genuine sum over modes and let the medium be driven by all the cross-beats. The strategy is the same
          self-consistency loop as Chapter&nbsp;VIII — feed the field through the density-matrix polarization machinery,
          then read off equations of motion for each amplitude and phase — but now executed to third order with{" "}
          <em>many</em> interacting modes.
        </Intuition>

        <p>
          Write the total field as a multimode superposition: a sum of cavity normal modes{" "}
          <Tex>{String.raw`U_n(z)`}</Tex>, each carrying its own slowly varying real amplitude{" "}
          <Tex>{String.raw`E_n(t)`}</Tex>, running frequency <Tex>{String.raw`\nu_n`}</Tex>, and slowly varying phase{" "}
          <Tex>{String.raw`\phi_n(t)`}</Tex>. This replaces the single-mode field and is the starting point of the whole
          chapter:
        </p>
        <EqBlock label="1">{String.raw`E(z,t) = \tfrac{1}{2}\sum_n E_n(t)\,\exp[-i(\nu_n t + \phi_n(t))]\,U_n(z) + \text{c.c.}`}</EqBlock>
        <p>For the standing-wave two-mirror laser of length <Tex>{String.raw`L`}</Tex>, the normal modes are sines:</p>
        <EqBlock label="16">{String.raw`U_n(z) = \sin(K_n z), \qquad K_n = \frac{n\pi}{L}`}</EqBlock>
        <p>
          The mode index <Tex>{String.raw`n`}</Tex> sets the spatial structure; spatial overlap integrals of products of
          these sines are exactly what generate the coupling between modes (the same standing-wave geometry that gave
          spatial hole burning in Chapter&nbsp;VIII).
        </p>

        <Derivation title="Set up the multimode self-consistency loop" defaultOpen={false}>
          <Step title="Identify the new degree of freedom">
            In the single-mode approximation of Chapter&nbsp;VIII one amplitude and one frequency suffice. Here the
            difference frequencies <Tex>{String.raw`\nu_\mu - \nu_\rho`}</Tex> develop sidebands on the populations: the
            population difference is no longer constant but <em>pulsates</em>. This is the physical origin of everything
            that follows.
          </Step>
          <Step title="Close the loop to third order">
            The field (Eq.&nbsp;1) drives the medium; the medium produces a macroscopic polarization{" "}
            <Tex>{String.raw`P(z,t)`}</Tex>; that polarization feeds back through Maxwell&rsquo;s equations to give
            amplitude- and frequency-determining equations for each <Tex>{String.raw`E_n`}</Tex> and{" "}
            <Tex>{String.raw`\phi_n`}</Tex>. The chapter is the execution of this loop to third order in the field.
          </Step>
        </Derivation>

        <Intuition title="The one idea to hold">
          Two modes share the same atoms, so they compete and couple. <strong>Mode coupling has two sources — spatial
          hole burning and population pulsation — and the beat between modes is what activates the second.</strong> For a
          standing-wave two-mode laser, hole burning dominates and pulsations are a small correction (their beat{" "}
          <Tex>{String.raw`c/2L \gg \gamma_a`}</Tex>); pulsations come into their own in the combination-tone locking of
          §9-3 and §9-4.
        </Intuition>
      </Section>

      <Section title="9-1 · Polarization: population pulsations and the third-order polarization">
        <Intuition>
          This section builds the engine. Integrate the density-matrix equations (rotating-wave approximation) for the
          off-diagonal coherence <Tex>{String.raw`\rho_{ab}`}</Tex>, then the diagonal populations. The crucial result:
          when the field carries several frequencies, the population difference picks up oscillating terms at the
          intermode beat frequencies <Tex>{String.raw`\nu_\mu - \nu_\rho`}</Tex> — the population pulsations. A recurring
          complex Lorentzian denominator <Tex>{String.raw`\mathscr{D}`}</Tex> weights how strongly each beat survives; the
          pulsation contribution is resonant (largest) only when the beat is small compared to the population decay rate{" "}
          <Tex>{String.raw`\gamma_a`}</Tex>. For a standing-wave two-mirror laser the adjacent-mode beat is the axial
          spacing <Tex>{String.raw`\sim c/2L`}</Tex>, which is far <em>larger</em> than <Tex>{String.raw`\gamma_a`}</Tex>,
          so the pulsation Lorentzian sits off-resonant for adjacent modes — and the dominant coupling there is{" "}
          <em>spatial hole burning</em>, not pulsation (this is the book&rsquo;s limit <Tex>{String.raw`\nu_2-\nu_3\gg\gamma_a`}</Tex>,
          §9-2; pulsations take over only for beats <Tex>{String.raw`\lesssim\gamma_a`}</Tex>, as in §9-3). Feeding the
          (slightly) pulsating populations back into the polarization to third order yields the macroscopic polarization,
          whose imaginary part gives gain/saturation and whose real part gives frequency pulling. Collecting terms produces
          the <strong>self-saturation</strong> coefficients <Tex>{String.raw`\beta_n`}</Tex> (a mode saturating itself)
          and the <strong>cross-saturation</strong> coefficients <Tex>{String.raw`\theta_{nm}`}</Tex> (a mode saturated by
          another) — each split into a spatial hole-burning part and a population-pulsation part (Table 9-1), the numbers
          that decide the competition.
        </Intuition>

        <p>
          The rotating-wave-approximation interaction energy <Tex>{String.raw`\mathscr{V}_{ab} = -\wp E(z,t)`}</Tex>{" "}
          couples the field to the dipole and drives the density-matrix equations (<Tex>{String.raw`\wp`}</Tex> is the
          dipole matrix element). Written out for the multimode field it is the source term that feeds the population
          equations:
        </p>
        <EqBlock label="2">{String.raw`\mathscr{V}_{ab}(z,t) = -\tfrac{1}{2}\wp\sum_n E_n(t)\,\exp[-i(\nu_n t + \phi_n(t))]\,U_n(z)`}</EqBlock>

        <p>The unperturbed (zeroth-order) populations and inversion, set by pump rates and decay rates:</p>
        <EqBlock label="3">{String.raw`\rho_{aa}^{(0)}(z,t) = \lambda_a \gamma_a^{-1}`}</EqBlock>
        <EqBlock label="4">{String.raw`N(z,t) \equiv \rho_{aa}^{(0)} - \rho_{bb}^{(0)} = \lambda_a\gamma_a^{-1} - \lambda_b\gamma_b^{-1}`}</EqBlock>
        <p>
          Here <Tex>{String.raw`N(z,t)`}</Tex> is the unsaturated inversion density (spatially varying in{" "}
          <Tex>{String.raw`z`}</Tex> through the pump). The frequently occurring complex Lorentzian denominator is
        </p>
        <KeyResult
          number="6"
          eq={String.raw`\mathscr{D}_x(\Delta\omega) = \frac{1}{\gamma_x + i\,\Delta\omega}`}
          label="The complex Lorentzian denominator"
          note={
            <>
              A generic complex Lorentzian with a decay rate <Tex>{String.raw`\gamma_x`}</Tex> (
              <Tex>{String.raw`x = a, b`}</Tex>, or the coherence rate <Tex>{String.raw`\gamma_\perp`}</Tex>). With{" "}
              <Tex>{String.raw`\gamma_\perp`}</Tex> and the line-center detuning <Tex>{String.raw`\omega - \nu`}</Tex> it is
              the <em>gain/dispersion lineshape</em>: real part gives absorption/gain, imaginary part the
              dispersion/pulling. Population pulsations bring in a <em>separate</em> Lorentzian{" "}
              <Tex>{String.raw`\mathscr{D}_a(\nu_\rho - \nu_\sigma)`}</Tex> whose width is the population decay rate{" "}
              <Tex>{String.raw`\gamma_a`}</Tex> and whose argument is the intermode <em>beat</em> frequency. As an
              abstract property it is resonant (large) only when the beat is small compared to{" "}
              <Tex>{String.raw`\gamma_a`}</Tex>. But for a standing-wave two-mirror laser the adjacent-mode beat is the
              axial spacing <Tex>{String.raw`c/2L`}</Tex> (<Tex>{String.raw`\sim10^9\,\mathrm{s}^{-1}`}</Tex>), far{" "}
              <em>larger</em> than <Tex>{String.raw`\gamma_a`}</Tex> (<Tex>{String.raw`\sim10^7\!-\!10^8\,\mathrm{s}^{-1}`}</Tex>{" "}
              for He–Ne, only <Tex>{String.raw`\sim6\times10^3\,\mathrm{s}^{-1}`}</Tex> for ruby). So this is the book&rsquo;s
              limit <Tex>{String.raw`\nu_2 - \nu_3 \gg \gamma_a`}</Tex>: the pulsation Lorentzian sits{" "}
              <em>off-resonant</em> and suppressed for adjacent modes, and the dominant two-mode coupling is{" "}
              <strong>spatial hole burning</strong> (weak coupling, <Tex>{String.raw`C<1`}</Tex>; §9-2). Among mode pairs
              the closest pair pulses the populations most, but pulsations become genuinely resonant and dominant only
              when a beat is <Tex>{String.raw`\lesssim\gamma_a`}</Tex> — the combination-tone self-locking of §9-3, or
              media with large <Tex>{String.raw`\gamma_a`}</Tex>.
            </>
          }
        />

        <p>
          The rate equation for the population of level <Tex>{String.raw`a`}</Tex> separates into a zeroth-order pump/decay
          part and a second-order saturation part; the bracketed term carries the constant DC saturation plus the{" "}
          <em>pulsating</em> contributions that oscillate at the intermode beat frequencies:
        </p>
        <EqBlock label="7">{String.raw`\dot{\rho}_{aa} \simeq \dot{\rho}_{aa}^{(0)} + \dot{\rho}_{aa}^{(2)} = \lambda_a - \gamma_a\rho_{aa} - \left[\tfrac{1}{4}\left(\frac{\wp}{\hbar}\right)^2 N\sum_{\rho}\sum_{\sigma} E_\rho E_\sigma\,\exp\{i[(\nu_\rho - \nu_\sigma)t + \phi_\rho - \phi_\sigma]\}\,\mathscr{D}(\omega - \nu_\sigma)\,U_\rho^* U_\sigma + \text{c.c.}\right]`}</EqBlock>
        <p>
          Integrating gives the second-order population <Tex>{String.raw`\rho_{aa}^{(2)}`}</Tex> — the heart of multimode
          coupling — a double sum over modes <Tex>{String.raw`\rho,\sigma`}</Tex>, in which the{" "}
          <Tex>{String.raw`\rho\neq\sigma`}</Tex> terms oscillate at the beat frequency{" "}
          <Tex>{String.raw`\nu_\sigma - \nu_\rho`}</Tex>, weighted by the population-pulsation Lorentzian{" "}
          <Tex>{String.raw`\mathscr{D}_a(\nu_\rho - \nu_\sigma)`}</Tex> and the inverse decay rate. This is the moving
          population grating:
        </p>
        <EqBlock label="7b">{String.raw`\rho_{aa}^{(2)} = -\tfrac{1}{4}\left(\frac{\wp}{\hbar}\right)^2 N\sum_{\rho}\sum_{\sigma} E_\rho E_\sigma\, U_\rho^* U_\sigma \,\exp\{i[(\nu_\rho - \nu_\sigma)t + \phi_\rho - \phi_\sigma]\}\,\mathscr{D}_a(\nu_\rho - \nu_\sigma)\,\mathscr{D}(\omega - \nu_\sigma) + \text{c.c.}`}</EqBlock>

        <p>
          The pulsating populations re-drive the dipole, giving the third-order coherence. Its anti-Hermitian symmetry
          and a substitution rule let the authors write the <Tex>{String.raw`b`}</Tex>-level contribution from the{" "}
          <Tex>{String.raw`a`}</Tex>-level one by swapping <Tex>{String.raw`a\leftrightarrow b`}</Tex>:
        </p>
        <EqBlock label="8, 9">{String.raw`\rho_{ab}^{(3)} = -\rho_{ba}^{(3)*}, \qquad \gamma_a \to \gamma_b`}</EqBlock>
        <p>
          The full third-order off-diagonal polarization is then a <em>triple</em> sum over modes; the bracketed factor
          collects the two Lorentzian denominators (one from the pulsation step, one from this re-driving step):
        </p>
        <EqBlock label="10, 11">{String.raw`\rho_{ab}^{(3)} = \tfrac{1}{8}\,i\left(\frac{\wp}{\hbar}\right)^3 N\sum_{\mu}\sum_{\rho}\sum_{\sigma} E_\mu E_\rho E_\sigma\, U_\mu U_\rho^* U_\sigma \,\exp\{-i[(\nu_\mu - \nu_\rho + \nu_\sigma)t + \phi_\mu - \phi_\rho + \phi_\sigma]\}\,\mathscr{D}(\omega - \nu_\mu + \nu_\rho - \nu_\sigma)[\,\cdot\,]`}</EqBlock>

        <p>
          Projecting the polarization onto mode <Tex>{String.raw`n`}</Tex> means a spatial overlap integral of four mode
          functions weighted by the inversion, normalized:
        </p>
        <EqBlock label="12">{String.raw`\frac{\int_0^L dz\, N(z)\,U_n^*(z)\,U_\mu(z)\,U_\rho^*(z)\,U_\sigma(z)}{\int_0^L dz\,|U_n(z)|^2}`}</EqBlock>
        <p>Expanding products of sines into cosines and keeping only slowly varying terms enforces a frequency-matching condition:</p>
        <EqBlock label="13">{String.raw`n = \sigma - \rho + n'`}</EqBlock>
        <p>
          and leaves behind the spatial Fourier components of the inversion (this is where spatial hole burning
          re-enters; <Tex>{String.raw`N_0 = \bar N`}</Tex> is the spatial average):
        </p>
        <EqBlock label="16">{String.raw`N_M = \frac{1}{L}\int_0^L dz\, N(z)\cos[(2\pi/L)Mz]`}</EqBlock>

        <p>The total polarization driving mode <Tex>{String.raw`n`}</Tex> is the linear gain plus the third-order saturation and coupling:</p>
        <EqBlock label="17">{String.raw`\mathscr{P}_n(t) = [\mathscr{P}_n^{(1)}(t) + \mathscr{P}_n^{(3)}(t)]`}</EqBlock>
        <p>
          The relative phase angle for a mode combination — stationary (and so contributing a steady drive) only when its
          frequency sum vanishes, otherwise averaging away (the <em>free-running approximation</em>) — is
        </p>
        <EqBlock label="15">{String.raw`\Psi_{\rho\sigma n n'} = (\nu_n - \nu_{n'} + \nu_\rho - \nu_\sigma)t + \phi_n - \phi_{n'} + \phi_\rho - \phi_\sigma`}</EqBlock>

        <p>Matching the total polarization to the cavity gives the general self-consistent equations of motion. The amplitude equation:</p>
        <KeyResult
          number="18"
          eq={String.raw`\dot{E}_n = \alpha_n E_n - \sum_{\rho}\sum_{\sigma}\sum_{n'} E_\rho E_\sigma E_{n'}\,\mathrm{Im}\,[\theta_{\rho\sigma n n'}\exp(i\Psi_{\rho\sigma n n'})]`}
          label="General multimode amplitude equation"
          note={
            <>
              Each amplitude grows at its linear net gain <Tex>{String.raw`\alpha_n`}</Tex> and is depleted by
              third-order self- and cross-saturation summed over all contributing mode triples. The{" "}
              <strong>imaginary</strong> part of the complex coefficients carries the gain/saturation.
            </>
          }
        />
        <p>And the frequency equation, whose <strong>real</strong> part carries the pulling:</p>
        <EqBlock label="19">{String.raw`\nu_n + \dot{\phi}_n = \Omega_n + \sigma_n - \sum_{\rho}\sum_{\sigma}\sum_{n'} E_\rho E_\sigma E_{n'} E_n^{-1}\,\mathrm{Re}\,[\theta_{\rho\sigma n n'}\exp(i\Psi_{\rho\sigma n n'})]`}</EqBlock>
        <p>
          The oscillation frequency <Tex>{String.raw`\nu_n`}</Tex> plus phase drift equals the passive cavity frequency{" "}
          <Tex>{String.raw`\Omega_n`}</Tex> plus linear pulling <Tex>{String.raw`\sigma_n`}</Tex> plus nonlinear pulling
          from all mode combinations.
        </p>

        <Derivation title="From the density matrix to Eqs. (18)–(19)" defaultOpen={false}>
          <Step title="Integrate the off-diagonal equation">
            Start from <Tex>{String.raw`\dot\rho_{ab} = -(i\omega + \gamma_\perp)\rho_{ab}`}</Tex> driven by the field.
            In the rotating-wave approximation, integrate from <Tex>{String.raw`-\infty`}</Tex> to{" "}
            <Tex>{String.raw`t`}</Tex>. For one Fourier component this gives{" "}
            <Tex>{String.raw`\rho_{ab}\propto \lambda\,e^{i\nu t}\,\mathscr{D}(\omega - \nu)`}</Tex> — Eq.&nbsp;(3),
            showing where the denominator <Tex>{String.raw`\mathscr{D}`}</Tex> comes from.
          </Step>
          <Step title="Second-order populations: find the pulsations">
            Feed <Tex>{String.raw`\rho_{ab}`}</Tex> back into the diagonal equations and integrate again. The DC term is
            ordinary saturation; the cross terms <Tex>{String.raw`\rho\neq\sigma`}</Tex> oscillate at the beat frequency{" "}
            <Tex>{String.raw`\nu_\sigma - \nu_\rho`}</Tex> — Eq.&nbsp;(7). The pulsation amplitude is large only when{" "}
            <Tex>{String.raw`|\nu_\sigma - \nu_\rho| \ll \gamma`}</Tex>; for a standing-wave two-mirror laser the
            adjacent-mode beat <Tex>{String.raw`c/2L`}</Tex> is instead <em>much larger</em> than{" "}
            <Tex>{String.raw`\gamma`}</Tex>, so these pulsations are off-resonant and the dominant adjacent-mode coupling
            is spatial hole burning (weak coupling — §9-2). Pulsations dominate only when a beat is{" "}
            <Tex>{String.raw`\lesssim\gamma`}</Tex>, as in the combination-tone locking of §9-3.
          </Step>
          <Step title="Build the third-order polarization">
            The pulsating populations re-drive the dipole, giving <Tex>{String.raw`\rho_{ab}^{(3)}`}</Tex> (Eqs.&nbsp;10–11)
            with a triple mode sum and a product of <em>two</em> Lorentzian denominators. Use{" "}
            <Tex>{String.raw`\gamma_a \to \gamma_b`}</Tex> (Eq.&nbsp;9) to get the <Tex>{String.raw`b`}</Tex>-level piece.
            This is the worked example of &ldquo;the pulsation grating scatters light.&rdquo;
          </Step>
          <Step title="Project onto cavity modes">
            Insert the <Tex>{String.raw`\sin(K z)`}</Tex> mode functions into the spatial integral (Eq.&nbsp;12). Expand
            products of sines into cosines, keep only resonant terms — the frequency-matching condition Eq.&nbsp;(13)
            falls out, and the surviving integrals define the inversion Fourier components{" "}
            <Tex>{String.raw`N_M`}</Tex> (Eq.&nbsp;16).
          </Step>
          <Step title="Read off the equations of motion">
            Matching the total polarization (Eq.&nbsp;17) to the cavity gives Eqs.&nbsp;(18)–(19). The imaginary part of
            the complex coefficients gives gain/saturation, the real part gives pulling. The explicit coefficients live
            in Table&nbsp;9-1.
          </Step>
        </Derivation>

        <Callout kind="note" title="Table 9-1: the multimode coefficients">
          Each coefficient in Eqs.&nbsp;(18)–(19) is a combination of products of Lorentzian denominators{" "}
          <Tex>{String.raw`\mathscr{D}(\omega - \nu)`}</Tex> and the inversion Fourier components{" "}
          <Tex>{String.raw`N_M`}</Tex>. The general saturation term has the schematic form{" "}
          <Tex>{String.raw`\theta_{\rho\sigma n n'} = \tfrac{1}{8}\,(\wp/\hbar\gamma)^2\,F^{-1}\,E_\rho E_\sigma E_{n'}`}</Tex>{" "}
          times a bracketed phase/denominator structure (<Tex>{String.raw`F`}</Tex> is the saturation/normalization
          factor). The off-diagonal <Tex>{String.raw`\theta`}</Tex> carries the cross-saturation (hole-burning plus
          population-pulsation contributions); the diagonal <Tex>{String.raw`\beta_n = \theta_{nn}`}</Tex> is the
          self-saturation. These are exactly the scaled numbers the simulation uses.
        </Callout>
        <Callout kind="warning" title="Sign and factor bookkeeping">
          The prefactors (<Tex>{String.raw`\tfrac14`}</Tex> at second order, <Tex>{String.raw`\tfrac18`}</Tex> at third
          order) and the <Tex>{String.raw`(\wp/\hbar)^p`}</Tex> powers set the absolute scale of saturation. The signs in
          the exponents (<Tex>{String.raw`\phi_\sigma - \phi_\rho`}</Tex>, etc.) are load-bearing for the locking
          analysis later — track them carefully.
        </Callout>
      </Section>

      <Section title="9-2 · Two-mode operation: competition and the coupling constant C">
        <Intuition>
          This is the cleanest and most teachable case, and it carries the chapter&rsquo;s headline result. With exactly
          two modes the general equations collapse to a pair of coupled nonlinear intensity equations that are{" "}
          <em>mathematically identical</em> to two competing biological populations (Lotka–Volterra) or two coupled van
          der&nbsp;Pol oscillators. Each mode grows at its own net gain <Tex>{String.raw`\alpha`}</Tex>, saturates itself
          (<Tex>{String.raw`\beta`}</Tex>), and is suppressed by the other (<Tex>{String.raw`\theta`}</Tex>). The single
          dimensionless number that decides the outcome is the coupling constant{" "}
          <Tex>{String.raw`C = \theta_{12}\theta_{21}/(\beta_1\beta_2)`}</Tex>. Weak coupling{" "}
          (<Tex>{String.raw`C<1`}</Tex>): both modes coexist. Strong coupling (<Tex>{String.raw`C>1`}</Tex>): bistable,
          one mode wins and quenches the other. The physical knob is the spatial overlap of the modes&rsquo;
          standing-wave patterns in the inversion — where they burn the same atoms, coupling is strong.
        </Intuition>

        <p>
          Above threshold, dropping the rapidly oscillating combination terms (free-running approximation), the two
          amplitude equations keep only self-saturation and one cross-saturation each:
        </p>
        <EqBlock label="20">{String.raw`\dot{E}_1 = E_1(\alpha_1 - \beta_1 I_1 - \theta_{12} I_2)`}</EqBlock>
        <EqBlock label="21">{String.raw`\dot{E}_2 = E_2(\alpha_2 - \beta_2 I_2 - \theta_{21} I_1)`}</EqBlock>
        <p>
          The natural dynamical variables are the dimensionless intensities (Ch.&nbsp;8, Eq.&nbsp;45 /
          Table&nbsp;8-1), scaled by the fixed positive constant{" "}
          <Tex>{String.raw`\wp^2/\hbar^2\gamma_a\gamma_b`}</Tex> built from the dipole matrix element and the
          level decay rates; here <Tex>{String.raw`\alpha_n`}</Tex> is the linear net gain, not the scaling
          constant:
        </p>
        <EqBlock label="Ch. 8, Eq. 45">{String.raw`I_n = \frac{\wp^2}{\hbar^2\gamma_a\gamma_b}\,|E_n|^2`}</EqBlock>
        <p>
          Since <Tex>{String.raw`I\sim E^2`}</Tex> implies <Tex>{String.raw`\dot I = 2 E\dot E`}</Tex>, the working form
          for the competition is the pair of intensity equations:
        </p>
        <KeyResult
          number="24, 25"
          eq={String.raw`\dot{I}_1 = 2 I_1(\alpha_1 - \beta_1 I_1 - \theta_{12} I_2), \qquad \dot{I}_2 = 2 I_2(\alpha_2 - \beta_2 I_2 - \theta_{21} I_1)`}
          label="Two-mode mode-competition equations"
          note={
            <>
              A Lotka–Volterra / coupled-van-der-Pol system. The factor of 2 sets the relaxation rate but not the fixed
              points. This is the system the simulation integrates.
            </>
          }
        />

        <p>The stationary states come from setting both rates to zero:</p>
        <EqBlock label="26">{String.raw`\dot{I}_1 = \dot{I}_2 = 0`}</EqBlock>
        <p>
          For the both-modes-on state, divide out <Tex>{String.raw`I_1, I_2`}</Tex> to get the two nullcline equations;
          their intersection is the coexistence fixed point:
        </p>
        <EqBlock label="33, 34">{String.raw`\beta_1 I_1 + \theta_{12} I_2 = \alpha_1, \qquad \beta_2 I_2 + \theta_{21} I_1 = \alpha_2`}</EqBlock>
        <p>Cramer&rsquo;s rule solves them. The determinant is <Tex>{String.raw`\beta_1\beta_2(1-C)`}</Tex>:</p>
        <EqBlock label="35">{String.raw`I_1{}^{(s)} = \frac{(\alpha_1/\beta_1) - (\theta_{12}/\beta_1)(\alpha_2/\beta_2)}{1 - C}`}</EqBlock>
        <EqBlock label="36">{String.raw`I_2{}^{(s)} = \frac{(\alpha_2/\beta_2) - (\theta_{21}/\beta_2)(\alpha_1/\beta_1)}{1 - C}`}</EqBlock>
        <p>
          The denominator <Tex>{String.raw`1-C`}</Tex> is load-bearing: positive for weak coupling, negative for strong
          coupling — when <Tex>{String.raw`C>1`}</Tex> a positive numerator gives an unphysical (negative) solution, the
          signature of bistability. And there it is, the headline:
        </p>
        <KeyResult
          number="37"
          eq={String.raw`C = \frac{\theta_{12}\,\theta_{21}}{\beta_1\,\beta_2}`}
          label="The coupling constant C"
          note={
            <>
              The ratio of the product of cross-saturations to the product of self-saturations.{" "}
              <Tex>{String.raw`C<1`}</Tex> weak (coexistence), <Tex>{String.raw`C=1`}</Tex> neutral,{" "}
              <Tex>{String.raw`C>1`}</Tex> strong (bistable, winner-take-all). The single number that classifies all
              two-mode behavior.
            </>
          }
        />

        <p>
          To test stability, perturb each intensity about its stationary value and track whether the deviation grows or
          decays:
        </p>
        <EqBlock label="27, 28">{String.raw`I_1 = I_1{}^{(s)} + \varepsilon_1, \qquad I_2 = I_2{}^{(s)} + \varepsilon_2`}</EqBlock>
        <p>Linearizing the intensity equations about the nonzero steady state:</p>
        <EqBlock label="38, 39">{String.raw`\dot{\varepsilon}_1 = -2 I_1{}^{(s)}(\beta_1\varepsilon_1 + \theta_{12}\varepsilon_2), \qquad \dot{\varepsilon}_2 = -2 I_2{}^{(s)}(\beta_2\varepsilon_2 + \theta_{21}\varepsilon_1)`}</EqBlock>
        <p>which assembles into a matrix stability problem:</p>
        <EqBlock label="40, 41">{String.raw`\frac{d}{dt}\begin{pmatrix}\varepsilon_1\\\varepsilon_2\end{pmatrix} = \Theta\begin{pmatrix}\varepsilon_1\\\varepsilon_2\end{pmatrix}, \qquad \Theta = \frac{-2}{1-C}\begin{pmatrix} a_1' & a_1'(\theta_{12}/\beta_1)\\ a_2'(\theta_{21}/\beta_2) & a_2' \end{pmatrix}`}</EqBlock>
        <p>
          The eigenvalues of <Tex>{String.raw`\Theta`}</Tex> decide stability (both{" "}
          <Tex>{String.raw`\mathrm{Re}\,\lambda < 0`}</Tex> for a stable state):
        </p>
        <EqBlock label="42">{String.raw`\det(\Theta - \lambda \mathscr{I}) = 0, \qquad \lambda_{1,2} = -\frac{a_1' + a_2'}{1 - C} \pm \sqrt{\left(\frac{a_1' + a_2'}{1 - C}\right)^2 - \frac{4 a_1' a_2'}{1 - C}}`}</EqBlock>
        <p>The three regimes named explicitly:</p>
        <EqBlock label="43">{String.raw`C < 1 \ \text{weak coupling}, \qquad C = 1 \ \text{neutral coupling}, \qquad C > 1 \ \text{strong coupling}`}</EqBlock>

        <SimFrame
          title="Two-mode competition: weak vs. strong coupling in the I₁–I₂ plane"
          caption={
            <>
              An RK4 integrator solves the chapter&rsquo;s own equations{" "}
              <Tex>{String.raw`\dot I_n = 2I_n(\alpha_n - \beta_n I_n - \theta_{nm} I_m)`}</Tex>. The phase plane draws
              the two gain nullclines (Eqs.&nbsp;33–34), the four fixed points colored by stability (filled = stable,
              open = saddle/unstable), and a light vector field; the trajectory is integrated and revealed in real time.
              The readouts compute <Tex>{String.raw`C`}</Tex>, the steady states (Eqs.&nbsp;35–36), and the coexistence
              eigenvalues (Eq.&nbsp;42) live — reproducing the book&rsquo;s phase portraits Figs.&nbsp;9-2/9-3/9-4.
            </>
          }
          tryThis={
            <>
              Defaults (all <Tex>{String.raw`\beta=1`}</Tex>, <Tex>{String.raw`\theta=0.5`}</Tex>, equal gains) give{" "}
              <Tex>{String.raw`C=0.25`}</Tex>: weak coupling, the trajectory funnels to the symmetric coexistence node
              (Fig.&nbsp;9-2). Now raise both <Tex>{String.raw`\theta`}</Tex> to <Tex>{String.raw`1.4`}</Tex>{" "}
              (<Tex>{String.raw`C\approx1.96`}</Tex>): the coexistence dot turns open (a saddle) and the trajectory is
              captured by <em>one</em> axis. Swap <Tex>{String.raw`I_1(0)`}</Tex> and <Tex>{String.raw`I_2(0)`}</Tex> —
              the survivor flips. That is the bistable winner-take-all hysteresis (Fig.&nbsp;9-4). Drag{" "}
              <Tex>{String.raw`\alpha_1`}</Tex> below 0 to watch mode&nbsp;1 fall below threshold entirely.
            </>
          }
        >
          <Ch09Sim />
        </SimFrame>

        <Derivation title="Reduce, solve, and classify the two-mode system" defaultOpen={false}>
          <Step title="Reduce the general equations to two modes">
            Set <Tex>{String.raw`N=2`}</Tex> in Eqs.&nbsp;(18)–(19). Neglect the rapidly oscillating combination terms
            (their phase <Tex>{String.raw`\Psi_{1211} = (\nu_2 - \nu_1)t + \cdots`}</Tex> averages to zero over typical
            timescales — the free-running approximation). What survives is self-saturation{" "}
            <Tex>{String.raw`\beta_n`}</Tex> and one cross-saturation <Tex>{String.raw`\theta_{nm}`}</Tex> per mode:
            Eqs.&nbsp;(20)–(21).
          </Step>
          <Step title="Pass to intensities">
            Multiply by <Tex>{String.raw`2E_n`}</Tex> and use{" "}
            <Tex>{String.raw`I_n = \frac{\wp^2}{\hbar^2\gamma_a\gamma_b}|E_n|^2`}</Tex> so{" "}
            <Tex>{String.raw`\dot I = 2I(\text{gain} - \text{saturation})`}</Tex> — Eqs.&nbsp;(24)–(25).
          </Step>
          <Step title="Find the fixed points">
            Set <Tex>{String.raw`\dot I_1 = \dot I_2 = 0`}</Tex>. There are up to four: <Tex>{String.raw`(0,0)`}</Tex>{" "}
            off; <Tex>{String.raw`(I_1,0)`}</Tex> only mode 1; <Tex>{String.raw`(0,I_2)`}</Tex> only mode 2; and the
            coexistence point, whose coordinates solve the linear pair (33)–(34).
          </Step>
          <Step title="Solve by Cramer's rule and define C">
            The determinant is <Tex>{String.raw`\beta_1\beta_2 - \theta_{12}\theta_{21} = \beta_1\beta_2(1-C)`}</Tex>,
            which is exactly where <Tex>{String.raw`C`}</Tex> is born (Eq.&nbsp;37). For{" "}
            <Tex>{String.raw`C>1`}</Tex> the coexistence solution (35)–(36) goes negative — unphysical.
          </Step>
          <Step title="Linear stability analysis">
            Perturb (27)–(28), linearize to (38)–(39), assemble <Tex>{String.raw`\Theta`}</Tex> (Eq.&nbsp;41), solve{" "}
            <Tex>{String.raw`\det(\Theta - \lambda\mathscr{I}) = 0`}</Tex> (Eq.&nbsp;42). Conclude:{" "}
            <Tex>{String.raw`C<1`}</Tex> ⇒ stable coexistence node; <Tex>{String.raw`C>1`}</Tex> ⇒ coexistence is a
            saddle and the single-mode solutions are stable (bistable). Summarized in Table&nbsp;9-2.
          </Step>
          <Step title="Interpret physically">
            Connect <Tex>{String.raw`C`}</Tex> to spatial hole burning. In the standing-wave geometry analyzed here,
            adjacent modes burn <em>different</em> spatial holes in the inversion, so they largely saturate different
            atoms and the coupling is weak (<Tex>{String.raw`C \cong \left[\tfrac{2}{3}\left(1 + \tfrac{1}{2}\,N_2/\bar N\right)\right]^2 < 1`}</Tex>,
            where <Tex>{String.raw`N_2`}</Tex> is the <Tex>{String.raw`M=2`}</Tex> spatial Fourier component of the
            inversion from Eq.&nbsp;16, distinct from the spatial average <Tex>{String.raw`N_0 = \bar N`}</Tex>).
            Homogeneously broadened standing-wave lasers therefore tend to run <strong>multimode</strong>, and forcing
            single-mode operation requires removing the spatial holes (a unidirectional ring, the twisted-mode trick, or
            an intracavity etalon). The naive &ldquo;homogeneous line → same atoms → strong coupling → single mode&rdquo;
            rule holds only when all modes sample the <em>same</em> atoms (e.g. a unidirectional ring with no spatial
            hole burning). Inhomogeneous (Doppler) broadening also gives weak coupling — different modes interact with
            different velocity groups — so it likewise runs multimode. (Chapter&nbsp;X adds a wrinkle: in a predominantly
            Doppler medium the atoms move through several wavelengths and wash out the spatial holes, which can restore
            strong coupling — Fig.&nbsp;10-5.)
          </Step>
        </Derivation>

        <Callout kind="note" title="Table 9-2: stability conditions">
          For each stationary solution <Tex>{String.raw`(I_1, I_2)`}</Tex> the table lists the conditions on{" "}
          <Tex>{String.raw`a'`}</Tex> and <Tex>{String.raw`C`}</Tex> under which it is positive and stable. Weak
          coupling <Tex>{String.raw`C<1`}</Tex> with both <Tex>{String.raw`a'>0`}</Tex> gives stable coexistence; strong
          coupling <Tex>{String.raw`C>1`}</Tex> gives bistable single-mode operation; the neutral{" "}
          <Tex>{String.raw`C=1`}</Tex> line gives marginal families. The simulation reproduces these regime labels live
          from <Tex>{String.raw`C`}</Tex> and the gains.
        </Callout>
        <Callout kind="insight" title="Same math, three worlds">
          Eqs.&nbsp;(24)–(25) are at once the Lotka–Volterra competition equations (two species sharing a resource), two
          coupled van der&nbsp;Pol oscillators, and the laser two-mode problem. The authors note the analogy extends to
          &ldquo;many phenomena of both natural and sociological origin.&rdquo; Recognizing it transfers intuition freely
          between fields.
        </Callout>
        <Callout kind="note" title="Figs. 9-2, 9-3, 9-4: the phase portraits">
          Trajectories in the <Tex>{String.raw`I_1`}</Tex>–<Tex>{String.raw`I_2`}</Tex> plane. Figs.&nbsp;9-2/9-3 (weak
          coupling, <Tex>{String.raw`C<1`}</Tex>) show all trajectories funneling to the coexistence node; Fig.&nbsp;9-4
          shows the bistable winner-take-all with hysteresis. The straight lines <Tex>{String.raw`L_a, L_b`}</Tex> are
          the nullclines (Eqs.&nbsp;33–34); their crossing is the steady state.
        </Callout>
      </Section>

      <Section title="9-3 · Locking of beat frequencies: the Adler equation">
        <Intuition>
          Now turn on the phases. With three oscillating modes a detector registers two beat notes (1–2 and 2–3).
          Ordinarily these differ slightly in frequency, and their difference — a very low &ldquo;beat of beats&rdquo; —
          wanders. But nonlinear mixing in the medium produces a <strong>combination tone</strong> at nearly the same
          frequency, which can inject-lock the two beats together. When they lock, the relative phase angle{" "}
          <Tex>{String.raw`\Psi`}</Tex> stops drifting and sits at a fixed value: the three modes are phase-locked. The
          governing equation is exactly <strong>Adler&rsquo;s equation</strong> from injection-locked oscillators (and
          from radio): locking occurs when <Tex>{String.raw`|d| \le |l|`}</Tex>; outside that range{" "}
          <Tex>{String.raw`\Psi`}</Tex> slips, with a period that diverges at the locking edge. This is the seed of mode
          locking and the bridge to the N-mode comb.
        </Intuition>

        <p>
          The three-mode relative phase angle (the combination-tone phase) and its drift rate — the natural beat-of-beats
          frequency arising from cavity dispersion:
        </p>
        <EqBlock label="44">{String.raw`\Psi \equiv \Psi_{1233} = (2\nu_2 - \nu_1 - \nu_3)t + 2\phi_2 - \phi_1 - \phi_3`}</EqBlock>
        <EqBlock label="45">{String.raw`2\nu_2 - \nu_3 \equiv \nu_1'`}</EqBlock>
        <p>The combination tone tempts mode 2 to oscillate at its injected/locked frequency; locking is the condition that the two adjacent beats become equal:</p>
        <EqBlock label="46">{String.raw`\nu_1 \equiv \nu_1' = 2\nu_2 - \nu_3`}</EqBlock>
        <EqBlock label="47">{String.raw`\nu_2 - \nu_1 = \nu_3 - \nu_2`}</EqBlock>

        <p>
          Specializing Eqs.&nbsp;(18)–(19) to <Tex>{String.raw`N=3`}</Tex> and keeping the combination-tone terms with
          their <Tex>{String.raw`\exp(\pm i\Psi')`}</Tex> phase factors gives three coupled amplitude equations,
        </p>
        <EqBlock label="48">{String.raw`\dot{E}_1 = E_1(\alpha_1 - \sum_{m=1}^{3}\theta_{1m} I_m) - \mathrm{Im}\,[\theta_{1232}\exp(-i\Psi')]\,E_2^2 E_3`}</EqBlock>
        <EqBlock label="49">{String.raw`\dot{E}_2 = E_2(\alpha_2 - \sum_{m=1}^{3}\theta_{2m} I_m) - \mathrm{Im}\,[(\theta_{2123} + \theta_{2321})\exp(i\Psi')]\,E_1 E_3 E_2`}</EqBlock>
        <EqBlock label="50">{String.raw`\dot{E}_3 = E_3(\alpha_3 - \sum_{m=1}^{3}\theta_{3m} I_m) - \mathrm{Im}\,[\theta_{3212}\exp(-i\Psi')]\,E_2^2 E_1`}</EqBlock>
        <p>and three frequency equations, whose real (combination-tone) parts do the locking:</p>
        <EqBlock label="51">{String.raw`\nu_1 + \dot{\phi}_1 = \Omega_1 + \sigma_1 - \sum_{m=1}^{3}\tau_{1m} I_m - \mathrm{Re}\,[\theta_{1232}\exp(-i\Psi')]\,E_2^2 E_3 / E_1`}</EqBlock>
        <EqBlock label="52">{String.raw`\nu_2 + \dot{\phi}_2 = \Omega_2 + \sigma_2 - \sum_{m=1}^{3}\tau_{2m} I_m - \mathrm{Re}\,[(\theta_{2123} + \theta_{2321})\exp(i\Psi')]\,E_1 E_3 E_2 / E_2`}</EqBlock>
        <EqBlock label="53">{String.raw`\nu_3 + \dot{\phi}_3 = \Omega_3 + \sigma_3 - \sum_{m=1}^{3}\tau_{3m} I_m - \mathrm{Re}\,[\theta_{3212}\exp(-i\Psi')]\,E_2^2 E_1 / E_3`}</EqBlock>

        <p>
          Taking the combination <Tex>{String.raw`2\times(\text{Eq. }52) - (\text{Eq. }51) - (\text{Eq. }53)`}</Tex>{" "}
          collapses the cavity and pulling terms into a single detuning <Tex>{String.raw`d`}</Tex> and the
          combination-tone terms into <Tex>{String.raw`l_s\sin\Psi + l_c\cos\Psi`}</Tex>:
        </p>
        <EqBlock label="54">{String.raw`\dot{\Psi} = d + l_s \sin\Psi + l_c \cos\Psi`}</EqBlock>
        <EqBlock label="55">{String.raw`d = 2\sigma_2 - \sigma_1 - \sigma_3 - \sum_{m=1}^{3}(2\tau_{2m} - \tau_{1m} - \tau_{3m})I_m`}</EqBlock>
        <EqBlock label="56">{String.raw`l_s = \mathrm{Im}\,[2 E_1 E_3 (\theta_{2123} + \theta_{2321}) + (\theta_{1232}E_2^2 E_3/E_1) + (\theta_{3212}E_2^2 E_1/E_3)]`}</EqBlock>
        <EqBlock label="57">{String.raw`l_c = \mathrm{Re}\,[-2 E_1 E_3 (\theta_{2123} + \theta_{2321}) + (\theta_{1232}E_2^2 E_3/E_1) + (\theta_{3212}E_2^2 E_1/E_3)]`}</EqBlock>

        <p>
          Combining <Tex>{String.raw`l_s\sin\Psi + l_c\cos\Psi = l\sin(\Psi - \Psi_0)`}</Tex> collapses this to the
          central result — a pendulum-like equation for the relative phase:
        </p>
        <KeyResult
          number="58"
          eq={String.raw`\dot{\Psi} = d + l\,\sin(\Psi - \Psi_0)`}
          label="Adler locking equation"
          note={
            <>
              <Tex>{String.raw`d`}</Tex> is the natural beat-of-beats detuning, <Tex>{String.raw`l`}</Tex> the nonlinear
              locking strength. Formally identical to an injection-locked oscillator / overdamped pendulum, and the seed
              of the mode-locked frequency comb.
            </>
          }
        />
        <EqBlock label="59">{String.raw`l = l_s\left(1 + \frac{l_c^2}{l_s^2}\right)^{1/2}`}</EqBlock>
        <EqBlock label="60">{String.raw`\Psi_0 = -\tan^{-1}(l_c/l_s)`}</EqBlock>

        <p>
          When <Tex>{String.raw`|d/l| \le 1`}</Tex> the equation has two stationary (locked) solutions — one stable, one
          unstable, like the bottom and top of a pendulum:
        </p>
        <EqBlock label="62, 63">{String.raw`\Psi_1 = \Psi_0 - \sin^{-1}(d/l), \qquad \Psi_2 = \Psi_0 + \pi + \sin^{-1}(d/l)`}</EqBlock>
        <p>The stable one is selected by the restoring-force condition:</p>
        <EqBlock label="64">{String.raw`l\cos(\Psi^{(0)} - \Psi_0) < 0`}</EqBlock>
        <p>
          When <Tex>{String.raw`|d| > |l|`}</Tex> there is no fixed point — <Tex>{String.raw`\Psi`}</Tex> runs (slips),
          advancing on average at the slipping (beat-of-beats) frequency, which vanishes as{" "}
          <Tex>{String.raw`|l|\to|d|`}</Tex> (the period diverges — Lord Rayleigh&rsquo;s slipping clock):
        </p>
        <KeyResult
          number="61"
          eq={String.raw`\overline{\Delta\nu} = d\left(1 - \frac{l^2}{d^2}\right)^{1/2}`}
          label="Average slipping frequency (unlocked)"
          note={
            <>
              Outside the locking range the relative phase advances at this average rate. As{" "}
              <Tex>{String.raw`|l|\to|d|`}</Tex> it tends to zero — the slip period{" "}
              <Tex>{String.raw`2\pi/\overline{\Delta\nu}`}</Tex> diverges at the locking threshold.
            </>
          }
        />

        <Derivation title="From three modes to Adler's equation" defaultOpen={false}>
          <Step title="Identify the combination tone">
            Three modes give two beat notes; nonlinear mixing creates a tone at{" "}
            <Tex>{String.raw`2\nu_2 - \nu_1 - \nu_3`}</Tex> that nearly coincides with one beat. Define{" "}
            <Tex>{String.raw`\Psi`}</Tex> (Eq.&nbsp;44) whose drift rate is the detuning{" "}
            <Tex>{String.raw`\nu_1'`}</Tex> (Eq.&nbsp;45). Lock means <Tex>{String.raw`\dot\Psi = 0`}</Tex>.
          </Step>
          <Step title="Write coupled amplitude and frequency equations">
            Specialize Eqs.&nbsp;(18)–(19) to <Tex>{String.raw`N=3`}</Tex> and keep the combination-tone terms with their{" "}
            <Tex>{String.raw`\exp(\pm i\Psi')`}</Tex> factors — Eqs.&nbsp;(48)–(53). Imaginary parts go into amplitude
            equations, real parts into pulling.
          </Step>
          <Step title="Form the equation for the relative phase">
            Take <Tex>{String.raw`2(\text{52}) - (\text{51}) - (\text{53})`}</Tex>. The cavity and pulling terms collapse
            into the detuning <Tex>{String.raw`d`}</Tex> (Eq.&nbsp;55); the combination-tone terms give{" "}
            <Tex>{String.raw`l_s\sin\Psi + l_c\cos\Psi`}</Tex> (Eqs.&nbsp;56–57) — that is Eq.&nbsp;(54).
          </Step>
          <Step title="Collapse to the Adler equation">
            Combine <Tex>{String.raw`l_s\sin\Psi + l_c\cos\Psi = l\sin(\Psi - \Psi_0)`}</Tex> using{" "}
            <Tex>{String.raw`l = l_s\sqrt{1 + (l_c/l_s)^2}`}</Tex> (Eq.&nbsp;59) and{" "}
            <Tex>{String.raw`\Psi_0 = -\tan^{-1}(l_c/l_s)`}</Tex> (Eq.&nbsp;60) — Eq.&nbsp;(58).
          </Step>
          <Step title="Solve: locked vs. running">
            Fixed points exist when <Tex>{String.raw`|d/l| \le 1`}</Tex> (Eqs.&nbsp;62–63); the stable one satisfies
            Eq.&nbsp;(64). For <Tex>{String.raw`|d| > |l|`}</Tex>, <Tex>{String.raw`\Psi`}</Tex> runs, slipping at average
            rate <Tex>{String.raw`\overline{\Delta\nu} = \sqrt{d^2 - l^2}`}</Tex> (Eq.&nbsp;61). The slip period
            diverges as <Tex>{String.raw`|d|\to|l|`}</Tex>.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Adler = injection-locked oscillator = pendulum">
          Eq.&nbsp;(58) is exactly Adler&rsquo;s equation for a phase-locked loop / injection-locked electronic
          oscillator, and is the overdamped pendulum equation. Locking range <Tex>{String.raw`|d| \le |l|`}</Tex>,
          slipping outside. The authors explicitly invoke the radio-receiver &ldquo;combination tone&rdquo; picture.
        </Callout>
        <Callout kind="note" title="Eq. (61): the slip-time integral">
          The average slipping frequency follows from{" "}
          <Tex>{String.raw`t = \int d\Psi/\dot\Psi = \int d\Psi/[d + l\sin(\Psi - \Psi_0)]`}</Tex> over one cycle — a
          standard integral giving <Tex>{String.raw`2\pi/\overline{\Delta\nu}`}</Tex> with{" "}
          <Tex>{String.raw`\overline{\Delta\nu} = \sqrt{d^2 - l^2}`}</Tex>. The divergent period near threshold is Lord
          Rayleigh&rsquo;s slipping clock (Prob.&nbsp;9-6).
        </Callout>
      </Section>

      <Section title="9-4 · N-mode operation: steady states and the mode-locked comb">
        <Intuition>
          Scale up from three modes to <Tex>{String.raw`N`}</Tex> (a real laser may have <Tex>{String.raw`\sim10^3`}</Tex>).
          Two questions. (a) <strong>Free-running</strong> (phases not locked): with the fast combination-tone terms
          averaged away you get coupled algebraic intensity equations — the N-mode generalization of two-mode competition
          — with up to <Tex>{String.raw`2^N`}</Tex> possible stationary states (each mode on or off). (b){" "}
          <strong>Mode-locked</strong>: when <em>all</em> adjacent beats lock, the mode frequencies become exactly
          equally spaced (a perfect comb) and the phases line up. The Fourier transform of an equally spaced, equal-phase
          comb is a <strong>train of short pulses</strong>: one pulse every round-trip time <Tex>{String.raw`2L/c`}</Tex>,
          each of duration <Tex>{String.raw`\sim 1/(N\Delta)`}</Tex>. This is the entire foundation of ultrafast lasers.
        </Intuition>

        <p>The general N-mode free-running intensity equations — the direct generalization of Eqs.&nbsp;(24)–(25), with <Tex>{String.raw`\theta_{nn}=\beta_n`}</Tex>:</p>
        <KeyResult
          number="71"
          eq={String.raw`\dot{I}_n = 2 I_n\Big(\alpha_n - \sum_m \theta_{nm} I_m\Big)`}
          label="General N-mode intensity equations"
          note={
            <>
              Each mode grows at net gain <Tex>{String.raw`\alpha_n`}</Tex> minus the total saturation from all modes
              (self when <Tex>{String.raw`m=n`}</Tex>, cross otherwise). The same competition the simulation integrates,
              with two modes.
            </>
          }
        />
        <p>
          There are up to <Tex>{String.raw`2^N`}</Tex> stationary solutions: for the off-subset{" "}
          <Tex>{String.raw`\mathfrak{B}`}</Tex>, <Tex>{String.raw`I_n=0`}</Tex>; for the on-subset{" "}
          <Tex>{String.raw`\mathfrak{N}`}</Tex>, invert the truncated coupling submatrix:
        </p>
        <EqBlock label="72">{String.raw`I_n{}^{(s)} = 0, \quad n \in \mathfrak{B}; \qquad I_n{}^{(s)} = \sum_m (\theta^{-1})_{nm}\alpha_m, \quad n, m \in \mathfrak{N}`}</EqBlock>
        <p>Stability of each candidate state follows from a small-deviation analysis (generalizing 27–28):</p>
        <EqBlock label="73">{String.raw`I_n = I_n{}^{(s)} + \varepsilon_n`}</EqBlock>
        <EqBlock label="74">{String.raw`\dot{\varepsilon}_n = -2 I_n{}^{(s)}\sum_m \theta_{nm}\varepsilon_m + O(\varepsilon^2)`}</EqBlock>
        <EqBlock label="75">{String.raw`\dot{\varepsilon}_n = 2\varepsilon_n\left[\alpha_n - \sum_m \theta_{nm} I_m{}^{(s)}\right] + O(\varepsilon^2)`}</EqBlock>
        <p>
          A state is stable only if every off mode has negative effective gain — its single-mode gain in the presence of
          all the oscillating modes:
        </p>
        <EqBlock label="76">{String.raw`a_n' = \alpha_n - \sum_m \theta_{nm} I_m{}^{(s)}, \quad n \in \mathfrak{B}, \ m \in \mathfrak{N}`}</EqBlock>

        <p>
          For locking, define the <Tex>{String.raw`N-2`}</Tex> interior relative phase angles; locking requires all of
          them to stop drifting:
        </p>
        <EqBlock label="77">{String.raw`\Psi_j = (2\nu_j - \nu_{j-1} - \nu_{j+1})t + 2\phi_j - \phi_{j-1} - \phi_{j+1}`}</EqBlock>
        <EqBlock label="78">{String.raw`\dot{E}_n = \dot{\Psi}_j = 0, \qquad n = 1,\ldots,N;\ j = 2,\ldots,N-1`}</EqBlock>
        <p>
          By induction, <Tex>{String.raw`\dot\Psi_j = 0`}</Tex> for all interior <Tex>{String.raw`j`}</Tex> forces all
          beat notes equal — the locked frequencies form a perfect comb spaced by the axial mode spacing:
        </p>
        <KeyResult
          number="79"
          eq={String.raw`\nu_n = \nu_q + (n - q)\Delta, \qquad \Delta = c/2L`}
          label="Locked frequencies: a perfect comb"
          note={
            <>
              Equally spaced by the cavity round-trip rate <Tex>{String.raw`\Delta = c/2L`}</Tex>. The locking conditions
              force this equal spacing by induction.
            </>
          }
        />
        <p>and the locked phases differ by a constant increment (set to zero by choosing the time origin):</p>
        <EqBlock label="80">{String.raw`\phi_{j+1} - \phi_j = \phi_j - \phi_{j-1} = \delta \quad\Longrightarrow\quad \phi_n = \phi_q + (n - q)\delta`}</EqBlock>

        <p>
          Substituting the comb (equal spacing, equal phase increment) into the field gives the mode-locked field — a
          carrier times a comb sum:
        </p>
        <KeyResult
          number="81"
          eq={String.raw`E(z,t) = \tfrac{1}{2}\exp[-i(\nu_q t + \phi_q)]\sum_n E_n \exp[-i(n - q)(\Delta t + \delta)]\,U_n(z) + \text{c.c.}`}
          label="The mode-locked field"
          note={
            <>
              The comb&rsquo;s inverse Fourier transform is a train of short pulses spaced by{" "}
              <Tex>{String.raw`2L/c`}</Tex>. A square spectrum of <Tex>{String.raw`N`}</Tex> modes gives a{" "}
              <Tex>{String.raw`\sin(Nx)/\sin(x)`}</Tex> pulse; a Gaussian envelope gives Gaussian pulses.
            </>
          }
        />
        <p>
          Breaking the sine modes into two exponentials shows two counter-propagating pulse trains — a single pulse
          bouncing between the mirrors, hitting the output mirror once per round trip:
        </p>
        <EqBlock label="82">{String.raw`E(z,t) = -\tfrac{1}{4}i\,\exp[-i(\nu_q t + \phi_q - K_q z)]\sum_n E_n \exp[-i(n-q)(\Delta t - \tfrac{\pi}{L}z)] + \tfrac{1}{4}i\,\exp[-i(\nu_q t + \phi_q + K_q z)]\sum_n E_n \exp[-i(n-q)(\Delta t + \tfrac{\pi}{L}z)] + \text{c.c.}`}</EqBlock>

        <Figure
          caption={
            <>
              Locking <Tex>{String.raw`N`}</Tex> equally spaced, equal-phase modes (left: a frequency comb) Fourier-transforms
              into a periodic train of short pulses (right), one pulse per round-trip time{" "}
              <Tex>{String.raw`2L/c`}</Tex>, each of width <Tex>{String.raw`\sim (2L/c)/N`}</Tex>.
            </>
          }
        >
          <svg viewBox="0 0 640 220" width="100%">
            {/* frequency comb (left) */}
            <line x1={30} y1={170} x2={300} y2={170} stroke="#9aa3b2" strokeWidth="1.5" />
            {Array.from({ length: 9 }).map((_, i) => {
              const x = 60 + i * 26;
              const env = Math.exp(-Math.pow((i - 4) / 3, 2));
              const hgt = 12 + 96 * env;
              return <line key={i} x1={x} y1={170} x2={x} y2={170 - hgt} stroke="#4f46e5" strokeWidth="3" />;
            })}
            <text x={165} y={195} textAnchor="middle" fontSize="12" fill="#4f46e5">
              comb: νₙ = ν_q + (n−q)Δ
            </text>
            <text x={165} y={210} textAnchor="middle" fontSize="10" fill="#5b6473">
              spacing Δ = c/2L
            </text>
            {/* arrow */}
            <line x1={312} y1={120} x2={344} y2={120} stroke="#9aa3b2" strokeWidth="2" />
            <polygon points="344,120 336,116 336,124" fill="#9aa3b2" />
            <text x={328} y={108} textAnchor="middle" fontSize="10" fill="#5b6473">
              FT
            </text>
            {/* pulse train (right) */}
            <line x1={360} y1={170} x2={620} y2={170} stroke="#9aa3b2" strokeWidth="1.5" />
            {(() => {
              const pts: string[] = [];
              const N = 9;
              for (let i = 0; i <= 520; i += 2) {
                const x = i / 520; // 0..1
                // periodic sinc^2-like pulses: |sin(N pi x)/sin(pi x)|
                const num = Math.sin(N * Math.PI * (x * 3 + 0.001));
                const den = Math.sin(Math.PI * (x * 3 + 0.001));
                const amp = Math.abs(den) < 1e-3 ? N : num / den;
                const y = 170 - 96 * Math.pow(amp / N, 2);
                pts.push(`${360 + i},${y}`);
              }
              return <polyline points={pts.join(" ")} fill="none" stroke="#e11d48" strokeWidth="2.2" />;
            })()}
            <text x={490} y={195} textAnchor="middle" fontSize="12" fill="#e11d48">
              pulse train, period 2L/c
            </text>
            <text x={490} y={210} textAnchor="middle" fontSize="10" fill="#5b6473">
              width ∼ 1/(NΔ)
            </text>
          </svg>
        </Figure>

        <Derivation title="From competition to the comb" defaultOpen={false}>
          <Step title="Generalize the competition equations">
            From Eq.&nbsp;(18) drop the relative-phase terms (free-running: <Tex>{String.raw`\Psi`}</Tex> averages away
            unless the matching relation holds, which fails for non-adjacent free-running modes). What remains is
            Eq.&nbsp;(71).
          </Step>
          <Step title="Enumerate the 2^N steady states">
            Each mode is off (<Tex>{String.raw`I=0`}</Tex>) or on. For an on-set, the on intensities solve{" "}
            <Tex>{String.raw`\sum_m\theta_{nm}I_m = \alpha_n`}</Tex>, i.e.{" "}
            <Tex>{String.raw`I = \theta^{-1}\alpha`}</Tex> (Eq.&nbsp;72). Check stability via the eigenvalues
            (Eqs.&nbsp;73–76): the off modes must have negative effective gain <Tex>{String.raw`a_n' < 0`}</Tex>.
          </Step>
          <Step title="Set up the N-mode locking conditions">
            Define the <Tex>{String.raw`N-2`}</Tex> interior relative phases <Tex>{String.raw`\Psi_j`}</Tex>{" "}
            (Eq.&nbsp;77). Locking requires <Tex>{String.raw`\dot\Psi_j = 0`}</Tex> for all <Tex>{String.raw`j`}</Tex>{" "}
            (Eq.&nbsp;78); by induction the beat notes must all be equal.
          </Step>
          <Step title="Derive the comb">
            Equal beats (Eq.&nbsp;79) force <Tex>{String.raw`\nu_n = \nu_q + (n-q)\Delta`}</Tex> with{" "}
            <Tex>{String.raw`\Delta = c/2L`}</Tex>; equal phase increments (Eq.&nbsp;80) force{" "}
            <Tex>{String.raw`\phi_n = \phi_q + (n-q)\delta`}</Tex>. Substitute into Eq.&nbsp;(1) → the mode-locked field
            Eq.&nbsp;(81).
          </Step>
          <Step title="Fourier transform to pulses">
            An equally spaced, equal-phase frequency comb is a periodic pulse train (period{" "}
            <Tex>{String.raw`2\pi/\Delta = 2L/c`}</Tex>). A finite square spectrum of <Tex>{String.raw`N`}</Tex> lines
            gives a <Tex>{String.raw`\sin(Nx)/\sin(x)`}</Tex> pulse of width <Tex>{String.raw`\sim(2L/c)/N`}</Tex>.
            Breaking the sines apart (Eq.&nbsp;82) shows two counter-propagating pulses — one bouncing pulse hitting the
            output mirror once per round trip.
          </Step>
        </Derivation>

        <Intuition title="Comb in frequency = pulse train in time">
          The single most important takeaway for ultrafast optics: locking <Tex>{String.raw`N`}</Tex> equally spaced,
          equal-phase modes makes the laser emit one short pulse per cavity round trip, of duration{" "}
          <Tex>{String.raw`\sim 1/(N\Delta)`}</Tex>. <strong>More locked modes → shorter pulses.</strong> This is the
          entire basis of picosecond/femtosecond lasers and optical frequency combs.
        </Intuition>
        <Callout kind="warning" title="Locked phases need not be the same">
          Adjacent phases differ by a <em>constant</em> <Tex>{String.raw`\delta`}</Tex> (Eq.&nbsp;80); only by choosing
          the time origin can <Tex>{String.raw`\delta`}</Tex> be set to zero. The relationships between phases are fixed,
          but their absolute values are arbitrary.
        </Callout>
        <Callout kind="note" title="The 2^N states">
          Free-running N-mode operation has up to <Tex>{String.raw`2^N`}</Tex> stationary states (each mode on/off).
          Most are unstable; stability is decided by the eigenvalues of{" "}
          <Tex>{String.raw`-2 I_n^{(s)}\theta_{nm}`}</Tex>. See Sargent–Lamb–Fork (1967) and O&rsquo;Bryan–Sargent
          (1973) for multimode gas lasers.
        </Callout>
      </Section>

      <Section title="9-5 · Forced (active) mode locking: the FM laser and Bessel mode amplitudes">
        <Intuition>
          Sections 9-3 and 9-4 described <em>self</em>-locking, where the medium&rsquo;s own nonlinearity locks the
          modes. <strong>Forced locking</strong> is imposed from outside: insert a modulator into the cavity that
          modulates the loss (amplitude modulation, AM) or the optical path (frequency/phase modulation, FM) at the
          intermode beat frequency <Tex>{String.raw`\nu_M \sim c/2L`}</Tex>. The modulator creates sidebands on each mode
          at exactly the neighboring mode frequencies, coupling them whether or not the medium would lock them. The clean
          analytic case is FM: the laser settles into a single FM oscillation — one carrier whose phase swings
          sinusoidally — and the individual mode amplitudes turn out to be <strong>Bessel functions</strong>{" "}
          <Tex>{String.raw`J_{n-q}(\Gamma)`}</Tex> of the modulation depth. The output is a frequency-swept
          (&ldquo;chirped&rdquo;) carrier sweeping over <Tex>{String.raw`2\Gamma\nu_M`}</Tex>, <em>not</em> a clean pulse
          train — that is the difference between FM and AM mode locking.
        </Intuition>

        <p>
          Model the intracavity modulator as a time- and space-dependent susceptibility multiplying the field — the
          external drive that forces locking (<Tex>{String.raw`d`}</Tex> is a coupling/length factor):
        </p>
        <EqBlock label="83">{String.raw`\Delta P(z,t) = \varepsilon_0\,\Delta\chi(z,t)\,\tfrac{1}{2}\sum_n E_n(t)\exp[-i(\nu_n t + \phi_n)]\,U_n(z) + \text{c.c.}`}</EqBlock>
        <p>Split into amplitude-modulation (loss, <Tex>{String.raw`\cos\nu_M t`}</Tex>) and frequency-modulation (the time-derivative) parts:</p>
        <EqBlock label="84">{String.raw`\Delta P(z,t) = \varepsilon_0\,\cos(\nu_M t)\,\chi'(z)\,E(z,t) + \varepsilon_0\,\nu^{-1}(1 + \cos\nu_M t)\,\Delta\chi''(z)\Big(\frac{\partial}{\partial t}\Big)E(z,t)`}</EqBlock>
        <p>
          The AM part in mode-sum form; the <Tex>{String.raw`\cos(\nu_M t)`}</Tex> factor generates sidebands at{" "}
          <Tex>{String.raw`\nu_n \pm \nu_M`}</Tex> which land on neighboring modes and lock them:
        </p>
        <EqBlock label="85">{String.raw`\Delta P(z,t) = \tfrac{1}{2}\varepsilon_0\big\{[\Delta\chi'(z) + i\,\Delta\chi''(z)]\cos(\nu_M t) + i\,\Delta\chi''(z)\big\}\sum_n E_n\exp[-i(\nu_n t + \phi_n)]\,U_n(z) + \text{c.c.}`}</EqBlock>
        <p>Projected onto mode <Tex>{String.raw`n`}</Tex>, a self term plus coupling to neighbors <Tex>{String.raw`n\pm1`}</Tex>:</p>
        <EqBlock label="88">{String.raw`\Delta\mathscr{P}_n(t) = i\varepsilon_0\,\overline{\Delta\chi'}\,E_n + \tfrac{1}{2}\varepsilon_0\,\overline{\Delta\chi_1}\big\{E_{n+1}\exp[-i((\nu_{n+1}-\nu_n-\nu_M)t+\phi_{n+1}-\phi_n)] + E_{n-1}\exp[i((\nu_n-\nu_M-\nu_{n-1})t+\phi_n-\phi_{n-1})]\big\}`}</EqBlock>
        <p>through the spatially averaged modulation susceptibilities (the modulator&rsquo;s overlap with the modes):</p>
        <EqBlock label="89">{String.raw`\overline{\Delta\chi} = \frac{1}{L}\int_0^L dz\,\Delta\chi(z), \qquad \overline{\Delta\chi_1} = \frac{1}{L}\int_0^L dz\,\Delta\chi(z)\cos(\pi z/L)`}</EqBlock>

        <p>In the locked, equally spaced state the exponents collapse to pure phase differences, and the polarization driving mode <Tex>{String.raw`n`}</Tex> becomes a self term plus nearest-neighbor coupling:</p>
        <EqBlock label="91">{String.raw`\Delta\mathscr{P}_n(t) = i\varepsilon_0\,\overline{\Delta\chi''}\,E_n + \tfrac{1}{2}\varepsilon_0\,\overline{\Delta\chi_1}\big\{E_{n+1}\exp[-i(\phi_{n+1} - \phi_n)] + E_{n-1}\exp[i(\phi_n - \phi_{n-1})]\big\}`}</EqBlock>
        <p>In the locked, equally spaced state this becomes a compact nearest-neighbor coupling weighted by sines of the phase differences:</p>
        <EqBlock label="97">{String.raw`\dot{E}_n = 0 = E_{n+1}\sin(\phi_{n+1} - \phi_n) - E_{n-1}\sin(\phi_n - \phi_{n-1})`}</EqBlock>
        <p>The phase equations close the recurrence (the locked phases are independent of <Tex>{String.raw`n`}</Tex>):</p>
        <EqBlock label="98, 99">{String.raw`\phi_{n+1} = \phi_n, \qquad [\dot{\phi}_n - (n - q)\Delta\nu]E_n = -\tfrac{1}{2}\,\nu\,\overline{\Delta\chi_1}'\,[E_{n+1}\cos(\phi_{n+1} - \phi_n) + E_{n-1}\cos(\phi_n - \phi_{n-1})]`}</EqBlock>
        <p>which reduces, in the steady FM state, to a three-term recurrence among neighboring amplitudes:</p>
        <EqBlock label="100">{String.raw`[\dot{\phi} - (n - q)\Delta\nu]\,E_n = -\tfrac{1}{2}\,\nu\,\overline{\Delta\chi_1}'\,(E_{n+1} + E_{n-1})`}</EqBlock>
        <p>This has exactly the form of the Bessel-function recurrence relation:</p>
        <EqBlock label="101">{String.raw`2 K \Gamma^{-1} J_K(\Gamma) = J_{K-1}(\Gamma) + J_{K+1}(\Gamma)`}</EqBlock>
        <p>
          Identifying <Tex>{String.raw`K = n - q`}</Tex> and the modulation depth <Tex>{String.raw`\Gamma`}</Tex> gives
          the FM mode-amplitude result. The carrier mode <Tex>{String.raw`q`}</Tex> is largest; the sidebands fall off as
          Bessel functions:
        </p>
        <EqBlock label="102">{String.raw`\dot{\phi} = l\,\Delta\nu`}</EqBlock>
        <KeyResult
          number="103"
          eq={String.raw`E_n = J_{n-q}(\Gamma)`}
          label="FM mode amplitudes are Bessel functions"
          note={
            <>
              The <Tex>{String.raw`n`}</Tex>-th mode amplitude is the Bessel function of order{" "}
              <Tex>{String.raw`(n-q)`}</Tex> at the modulation depth <Tex>{String.raw`\Gamma`}</Tex>. The carrier mode is
              the strongest; the FM phasors fall off and alternate sign with order.
            </>
          }
        />
        <EqBlock label="104">{String.raw`\Gamma = \nu\,\overline{\Delta\chi_1}'\,(\Delta\nu)^{-1}`}</EqBlock>

        <p>Summing the Bessel-weighted comb (the Jacobi–Anger identity below) collapses to a single FM oscillation — a carrier whose phase swings sinusoidally with depth <Tex>{String.raw`\Gamma`}</Tex>:</p>
        <EqBlock label="105">{String.raw`E(z,t) = \tfrac{1}{2}\exp[-i(\nu_q t + \phi_q)]\sum_n J_{n-q}(\Gamma)\,\exp[-i(n-q)\nu_M t]\,\sin K_n z + \text{c.c.}`}</EqBlock>
        <EqBlock label="106">{String.raw`J_{-k}(\Gamma) = (-1)^k J_k(\Gamma)`}</EqBlock>
        <p>The bridge between the single FM oscillation and the mode picture is the Jacobi–Anger identity:</p>
        <EqBlock label="p.140">{String.raw`\exp(i\Gamma\sin\theta) = \sum_{k=-\infty}^{\infty}\exp(ik\theta)\,J_k(\Gamma)`}</EqBlock>
        <p>The FM field as two oppositely directed running FM waves (from splitting the standing-wave sine):</p>
        <EqBlock label="107">{String.raw`E(z,t) = \tfrac{1}{2}\sin[\Omega_q t + q\pi z/L + \Gamma\sin(\nu_M t + \pi z/L)] - \tfrac{1}{2}\sin[\Omega_q t - q\pi z/L + \Gamma\sin(\nu_M t - \pi z/L)]`}</EqBlock>
        <p>and its instantaneous frequency, which sweeps about the carrier with peak-to-peak swing <Tex>{String.raw`2\Gamma\nu_M`}</Tex> — the signature of FM mode locking:</p>
        <KeyResult
          number="108"
          eq={String.raw`\Omega_\pm = \Omega_q + \Gamma\nu_M\cos(\nu_M t \pm \pi z/L)`}
          label="FM instantaneous frequency (chirped carrier)"
          note={
            <>
              The frequency sweeps about <Tex>{String.raw`\Omega_q`}</Tex> over <Tex>{String.raw`2\Gamma\nu_M`}</Tex>.
              Distinct from AM mode locking, which produces a clean pulse train.
            </>
          }
        />

        <Derivation title="Modulator → nearest-neighbor coupling → Bessel recurrence" defaultOpen={false}>
          <Step title="Add the modulator to the polarization">
            Model the intracavity modulator as a time-varying susceptibility <Tex>{String.raw`\chi(z,t)`}</Tex> driven at{" "}
            <Tex>{String.raw`\nu_M \sim c/2L`}</Tex> (Eq.&nbsp;83). Split into AM (loss, <Tex>{String.raw`\cos\nu_M t`}</Tex>)
            and FM (phase/path, the time-derivative) parts (Eq.&nbsp;84).
          </Step>
          <Step title="Project onto modes → nearest-neighbor coupling">
            The <Tex>{String.raw`\cos(\nu_M t)`}</Tex> factor creates sidebands at{" "}
            <Tex>{String.raw`\nu_n \pm \nu_M`}</Tex>. Projecting onto cavity modes (defining the averaged susceptibilities
            Eqs.&nbsp;89–90) couples each mode to its nearest neighbors (Eqs.&nbsp;88, 91). The coupling phases vanish
            when modes are equally spaced — forced locking.
          </Step>
          <Step title="Steady FM state and the Bessel recurrence">
            In a steady equally spaced state, Eqs.&nbsp;(97)–(100) reduce to a three-term recurrence among neighboring
            amplitudes (Eq.&nbsp;100). Recognize the Bessel recurrence (Eq.&nbsp;101); conclude{" "}
            <Tex>{String.raw`E_n = J_{n-q}(\Gamma)`}</Tex> (Eq.&nbsp;103) with modulation depth{" "}
            <Tex>{String.raw`\Gamma`}</Tex>.
          </Step>
          <Step title="Reconstruct the FM field">
            Sum the Bessel-weighted comb with the Jacobi–Anger identity{" "}
            <Tex>{String.raw`\exp(i\Gamma\sin\theta) = \sum_k J_k(\Gamma)\exp(ik\theta)`}</Tex>. It collapses to a single
            FM oscillation, Eq.&nbsp;(105); the instantaneous frequency (Eq.&nbsp;108) sweeps over{" "}
            <Tex>{String.raw`2\Gamma\nu_M`}</Tex>.
          </Step>
          <Step title="Contrast AM vs. FM">
            AM (loss) modulation produces a clean pulse train (the locked comb adds in phase to make pulses); FM (phase)
            modulation produces a frequency-swept carrier, not pulses. Both are forced locking, but the output differs
            qualitatively (Fig.&nbsp;9-6).
          </Step>
        </Derivation>

        <Intuition title="FM locking = chirped carrier; AM locking = pulses">
          Forced locking by loss modulation (AM) bunches the light into pulses; forced locking by phase modulation (FM)
          gives a single carrier whose frequency sweeps back and forth by <Tex>{String.raw`2\Gamma\nu_M`}</Tex>. The FM
          mode amplitudes are Bessel functions <Tex>{String.raw`J_{n-q}(\Gamma)`}</Tex>.
        </Intuition>
        <Callout kind="history" title="The first mode-locked laser">
          Hargrove, Fork, and Pollack (1964) introduced a loss modulator into a He–Ne laser at the intermode beat
          frequency <Tex>{String.raw`c/2L`}</Tex>, producing the first mode-locked pulse train. The chapter closes with
          the experimental lineage — Mocker–Collins ruby; DeMaria&nbsp;et&nbsp;al. Nd:glass picosecond pulses; passive
          saturable-absorber locking (Smith–Duguay–Ippen review, 1973).
        </Callout>
        <Callout kind="note" title="Fig. 9-7 and the modulation detuning">
          The FM phasor diagram has phasors adding constructively in and out of phase alternately (the{" "}
          <Tex>{String.raw`(-1)^n`}</Tex> of Eq.&nbsp;106). The modulation detuning{" "}
          <Tex>{String.raw`\delta\nu = \delta\Omega - \nu_M`}</Tex> (Eqs.&nbsp;94–95) measures the offset of the
          modulation frequency from the exact axial spacing; the clean FM solution requires it to be small.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from this chapter">
          <ul>
            <li>
              <strong>Mode coupling has two microscopic sources</strong>: spatial hole burning (overlapping standing-wave
              patterns burning the same atoms) and population pulsation (two modes beat, the populations oscillate at the
              difference frequency, a moving grating that scatters light between modes). Each cross-saturation
              coefficient splits into a hole-burning part plus a pulsation part (Table 9-1). For a standing-wave
              two-mirror laser hole burning dominates and pulsations are a small correction (their beat{" "}
              <Tex>{String.raw`c/2L \gg \gamma_a`}</Tex>); pulsations dominate the phase-locking physics of §9-3/§9-4.
            </li>
            <li>
              <strong>Two coefficients</strong>: self-saturation <Tex>{String.raw`\beta_n`}</Tex> (a mode depleting its
              own gain) and cross-saturation <Tex>{String.raw`\theta_{nm}`}</Tex> (one mode depleting another&rsquo;s).
              The distinction recurs whenever a laser carries multiple fields.
            </li>
            <li>
              <strong>The coupling constant</strong> <Tex>{String.raw`C = \theta_{12}\theta_{21}/(\beta_1\beta_2)`}</Tex>{" "}
              decides multimode fate: <Tex>{String.raw`C<1`}</Tex> coexistence, <Tex>{String.raw`C>1`}</Tex> bistable
              winner-take-all. In the standing-wave geometry, adjacent modes burn different spatial holes, so a
              homogeneously broadened standing-wave laser has weak coupling (<Tex>{String.raw`C<1`}</Tex>) and tends to
              run multimode — single-mode operation requires killing the spatial holes (unidirectional ring,
              twisted-mode, or etalon). Inhomogeneous (Doppler) broadening likewise gives weak coupling (different
              velocity groups) and multimode output. The naive &ldquo;homogeneous → same atoms → strong coupling → single
              mode&rdquo; rule holds only when all modes sample the same atoms.
            </li>
            <li>
              <strong>The competition equations</strong>{" "}
              <Tex>{String.raw`\dot I = 2I(\alpha - \beta I - \theta I')`}</Tex> are the laser instance of the universal
              Lotka–Volterra / coupled-van-der-Pol competition.
            </li>
            <li>
              <strong>The Adler equation</strong> <Tex>{String.raw`\dot\Psi = d + l\sin(\Psi - \Psi_0)`}</Tex> governs
              phase locking everywhere (injection locking, PLLs, coupled oscillators, gyroscope lock-in). Locking range{" "}
              <Tex>{String.raw`|d| \le |l|`}</Tex>; outside it the phase slips with a period that diverges at threshold.
            </li>
            <li>
              <strong>Mode locking = a frequency comb</strong>: <Tex>{String.raw`N`}</Tex> equally spaced, equal-phase
              modes Fourier-transform into a train of short pulses (one per round trip <Tex>{String.raw`2L/c`}</Tex>,
              width <Tex>{String.raw`\sim 1/(N\Delta)`}</Tex>) — the foundation of ultrafast (ps/fs) lasers and optical
              frequency combs.
            </li>
            <li>
              <strong>Forced (active) mode locking</strong> uses an intracavity modulator at{" "}
              <Tex>{String.raw`\nu_M \sim c/2L`}</Tex>. AM (loss) → pulse train; FM (phase) → frequency-swept carrier with
              mode amplitudes <Tex>{String.raw`E_n = J_{n-q}(\Gamma)`}</Tex>, swinging over{" "}
              <Tex>{String.raw`2\Gamma\nu_M`}</Tex>. Distinguish self-locking (medium nonlinearity) from forced locking
              (external modulator).
            </li>
            <li>
              <strong>The spatial overlap integral</strong> of cavity mode functions (with the inversion{" "}
              <Tex>{String.raw`N(z)`}</Tex> and its Fourier components <Tex>{String.raw`N_M`}</Tex>) sets which modes
              couple and how strongly — spatial hole burning links the abstract coefficients to the standing-wave
              structure.
            </li>
          </ul>
          Next we put this multimode machinery to work in the Doppler-broadened gas laser (Chapter&nbsp;X), where weak
          coupling between velocity groups, spectral hole burning, and the Lamb dip all follow from the very same
          coefficients.
        </Callout>
      </Section>
    </Lesson>
  );
}
