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
import AppFSim from "@/components/sims/appF";

export default function Page() {
  return (
    <Lesson slug="appF">
      <Lede>
        Take an ordinary gas laser — a He&ndash;Ne tube, say — and slide it into a magnetic field. The field does not just
        sit there: it <strong>Zeeman-splits</strong> each atomic level into magnetic sublevels{" "}
        <Tex>{String.raw`m`}</Tex>, so the single lasing line fans into a right- and a left-circularly-polarized component
        (<Tex>{String.raw`\sigma_+`}</Tex> driving <Tex>{String.raw`\Delta m=+1`}</Tex>,{" "}
        <Tex>{String.raw`\sigma_-`}</Tex> driving <Tex>{String.raw`\Delta m=-1`}</Tex>) that pull apart as the field
        grows. Now the two circular polarizations <em>compete</em> for the same excited atoms. This appendix is the
        bookkeeping that turns that picture into a number: it computes the macroscopic polarization{" "}
        <Tex>{String.raw`\mathscr{P}`}</Tex> of the gain medium to <strong>third order</strong> in the field —
        first order gives linear gain and the refractive index, third order gives <strong>saturation</strong>: how each
        circular component eats its own gain (self-saturation) and steals from the other (cross-saturation). The whole
        calculation is done twice — first for the toy transition <Tex>{String.raw`J=1\to J=0`}</Tex> (fully explicit),
        then for general <Tex>{String.raw`J`}</Tex>, where the sublevel sums collapse into beautiful closed-form
        angular-momentum identities. The single knob through it all is the magnetic tuning{" "}
        <Tex>{String.raw`\delta=g\mu_B H/\hbar`}</Tex>.
      </Lede>

      <Section title="Setup: why perturb the polarization, and the Zeeman picture">
        <Intuition>
          A laser&rsquo;s electric field drives atomic dipoles; summed up, those dipoles are the macroscopic
          polarization <Tex>{String.raw`\mathscr{P}`}</Tex> that feeds back into Maxwell&rsquo;s equations and fixes
          gain, frequency pulling, and saturation. When the field is weak, the polarization is simply{" "}
          <em>proportional</em> to it — that linear (first-order) response <em>is</em> the unsaturated gain and the
          index of refraction. To see the laser eat its own gain you must go to the lowest order at which the response
          stops being proportional to the drive: <strong>third order</strong>. In a magnetic field the upper and lower
          levels split into sublevels <Tex>{String.raw`m`}</Tex>, and circularly polarized light couples them by
          selection rules — <Tex>{String.raw`\sigma_+`}</Tex> drives <Tex>{String.raw`m\to m+1`}</Tex>,{" "}
          <Tex>{String.raw`\sigma_-`}</Tex> drives <Tex>{String.raw`m\to m-1`}</Tex>.
        </Intuition>
        <p>
          We start with the simplest possible sublevel structure, the toy transition treated first in F-1:
        </p>
        <KeyResult
          eq={String.raw`J = 1 \;\longrightarrow\; J = 0`}
          label="The toy transition (F-1)"
          note={
            <>
              Upper level <Tex>{String.raw`J=1`}</Tex> (three sublevels <Tex>{String.raw`m=-1,0,+1`}</Tex>) decaying to
              a single lower level <Tex>{String.raw`J=0`}</Tex>. Chosen because the magnetic-sublevel structure is
              minimal yet still shows the <Tex>{String.raw`\sigma_+/\sigma_-`}</Tex> competition.
            </>
          }
        />
        <p>
          Everything is built by iterating one master equation — the equation of motion for the off-diagonal
          density-matrix element <Tex>{String.raw`\rho_{ab}`}</Tex> (the dipole) connecting an upper sublevel{" "}
          <Tex>{String.raw`a`}</Tex> to a lower sublevel <Tex>{String.raw`b`}</Tex>:
        </p>
        <EqBlock label="17">{String.raw`\dot{\rho}_{ab}=-\,(i\omega_{ab}+\gamma)\,\rho_{ab}+\frac{i}{\hbar}\sum_{b'}\mathscr{V}_{ab'}\rho_{b'b}-\frac{i}{\hbar}\sum_{a'}\mathscr{V}_{a'b}\rho_{aa'}.`}</EqBlock>
        <p>
          Here <Tex>{String.raw`\omega_{ab}`}</Tex> is the sublevel transition frequency, <Tex>{String.raw`\gamma`}</Tex>{" "}
          the dipole decay rate, and <Tex>{String.raw`\mathscr{V}`}</Tex> the field&ndash;atom interaction energy; the
          sums run over neighboring sublevels <Tex>{String.raw`a',b'`}</Tex>. Iterating this equation order by order in{" "}
          <Tex>{String.raw`\mathscr{V}`}</Tex> generates the whole expansion.
        </p>

        <Callout kind="note" title="Symbol glossary — keep this nearby">
          <ul style={{ marginTop: 0 }}>
            <li>
              <Tex>{String.raw`\gamma_a,\gamma_b`}</Tex> = decay rates of the upper/lower level populations;{" "}
              <Tex>{String.raw`\gamma_{ab}\equiv\gamma`}</Tex> = decay of the dipole (off-diagonal coherence).
            </li>
            <li>
              <Tex>{String.raw`\wp`}</Tex> = electric-dipole matrix element; <Tex>{String.raw`N`}</Tex> = atomic
              density; <Tex>{String.raw`\lambda_a,\lambda_b`}</Tex> = pump rates into the upper/lower levels.
            </li>
            <li>
              <Tex>{String.raw`\rho_{aa},\rho_{bb}`}</Tex> = level populations; <Tex>{String.raw`\rho_{ab}`}</Tex> = the
              dipole.
            </li>
            <li>
              <Tex>{String.raw`K=\nu/c`}</Tex> = wavenumber; <Tex>{String.raw`u`}</Tex> = most-probable atomic speed;{" "}
              <Tex>{String.raw`Ku`}</Tex> = Doppler width; <Tex>{String.raw`W(v)`}</Tex> = Maxwellian.
            </li>
            <li>
              <Tex>{String.raw`\delta`}</Tex> = magnetic (Zeeman) tuning; <Tex>{String.raw`\omega_0,\nu_0`}</Tex> = mean
              transition / mean field frequencies; <Tex>{String.raw`\nu`}</Tex> = mode frequency.
            </li>
            <li>
              <Tex>{String.raw`J`}</Tex> = total angular momentum, <Tex>{String.raw`m`}</Tex> = magnetic sublevel index;{" "}
              <Tex>{String.raw`g`}</Tex> = Landé factor, <Tex>{String.raw`\mu_B`}</Tex> = Bohr magneton,{" "}
              <Tex>{String.raw`H`}</Tex> = field.
            </li>
            <li>
              <Tex>{String.raw`U(z)=\sin Kz`}</Tex> = standing-wave mode; <Tex>{String.raw`E_\pm`}</Tex> = amplitudes of
              the two circular components; <Tex>{String.raw`\sigma_a,\alpha_a`}</Tex> = self-saturation /
              frequency-shift coefficients; <Tex>{String.raw`\theta,\tau`}</Tex> = cross-saturation (mode-coupling)
              coefficients.
            </li>
          </ul>
        </Callout>

        <Callout kind="insight" title="Why third order, not second">
          Each factor of the field adds one factor of the dipole matrix element <Tex>{String.raw`\wp`}</Tex>. By parity
          only <em>odd</em> powers of the field survive for the polarization at the optical frequency. First order =
          linear gain/index. Second order vanishes. Third order is the leading saturation term — it is cubic in field
          amplitude, carrying <Tex>{String.raw`E\cdot E\cdot E`}</Tex>, and describes how intensity in one (or the
          other) circular component reduces the gain.
        </Callout>
      </Section>

      <Section title="F-1 first order: linear gain and dispersion for J=1 → J=0">
        <Intuition>
          Turn the field on weakly. To first order the atomic dipole simply follows the drive with a lag set by the
          dipole decay rate <Tex>{String.raw`\gamma`}</Tex> and the detuning. Summed over a Maxwellian velocity
          distribution <Tex>{String.raw`W(v)`}</Tex> — because moving atoms see Doppler-shifted frequencies — this gives
          the familiar complex linear polarization: its <em>imaginary</em> part is gain (or absorption), its{" "}
          <em>real</em> part is dispersion / refractive index. This section builds the machinery — the steady reservoir,
          the formal time integral for the dipole, the velocity average — that third order will reuse verbatim.
        </Intuition>
        <p>
          Schematically the dipole relaxes at rate <Tex>{String.raw`\gamma_{ab}`}</Tex> and is fed by the pump term:
        </p>
        <EqBlock label="1">{String.raw`\dot{\rho}_{aa}\simeq-\,\gamma_a\,\rho_{aa}+\lambda_a.`}</EqBlock>
        <p>
          With no field, steady pumping <Tex>{String.raw`\lambda_a`}</Tex> against decay <Tex>{String.raw`\gamma_a`}</Tex>{" "}
          builds the zeroth-order population — the reservoir the field will perturb:
        </p>
        <EqBlock label="2">{String.raw`\rho_{aa}{}^{(0)}=\lambda_a\int_{-\infty}^{t}dt'\,\exp[-\gamma_a(t-t')]=\frac{\lambda_a}{\gamma_a}.`}</EqBlock>
        <p>
          The same balance for the lower level gives <Tex>{String.raw`\rho_{bb}{}^{(0)}=\lambda_b/\gamma_b`}</Tex>, so the
          zeroth-order population-inversion density that the field will deplete is the difference:
        </p>
        <EqBlock label="4">{String.raw`N(z,t)\,W(v)=\frac{\lambda_a}{\gamma_a}-\frac{\lambda_b}{\gamma_b}.`}</EqBlock>
        <p>
          Letting the field interaction act once on that reservoir, propagated forward by the dipole Green&rsquo;s
          function <Tex>{String.raw`\exp[-(i\omega_{ab}+\gamma)(t-t')]`}</Tex>, gives the linear response:
        </p>
        <KeyResult
          number="3"
          label="First-order dipole (linear response)"
          eq={String.raw`\rho_{+b}{}^{(1)}(z,v,t)=\frac{i}{\hbar}\int_{-\infty}^{t}dt'\,e^{-(i\omega_{+b}+\gamma)(t-t')}\,\mathscr{V}_{+b}(t')\big[\rho_{++}{}^{(0)}-\rho_{bb}{}^{(0)}\big]=\frac{i}{\hbar}\,N(z,v)\,W(v)\int_{0}^{\infty}d\tau'\,e^{-(i\omega_{+b}+\gamma)\tau'}\,\mathscr{V}_{+b}(t-\tau').`}
        />
        <p>
          Because moving atoms see <Tex>{String.raw`\omega_{ab}+Kv`}</Tex>, every observable is averaged over the
          one-dimensional Maxwellian (Gaussian) velocity distribution,
        </p>
        <EqBlock>{String.raw`W(v)=\frac{1}{\sqrt{\pi}\,u}\,\exp\!\big[-(v/u)^2\big],`}</EqBlock>
        <p>
          with <Tex>{String.raw`u`}</Tex> the most-probable speed. Letting the field act a second time on the
          first-order dipole modifies the upper-level population of the <Tex>{String.raw`\sigma_+`}</Tex> channel — the
          double-time-integral hole that carries the saturation information:
        </p>
        <EqBlock label="5">{String.raw`\rho_{++}{}^{(2)}(z,v,t)=-\hbar^{-2}N(z)W(v)\int_{0}^{\infty}\!d\tau'\!\int_{0}^{\infty}\!d\tau''\,e^{-\gamma_a\tau'}\big\{\mathscr{V}_{-b}(t-\tau')e^{(i\omega_{b+}+\gamma)\tau''}\mathscr{V}_{+}(t'')+\mathscr{V}_{+b}(t')e^{-(i\omega_{+b}+\gamma)\tau''}\mathscr{V}_{+b}(t'')\big\}.`}</EqBlock>
        <p>
          The companion <Tex>{String.raw`\sigma_-`}</Tex> population follows by replacing every{" "}
          <Tex>{String.raw`+`}</Tex> with <Tex>{String.raw`-`}</Tex>. Together they are the two circular gain lines.
        </p>

        <Derivation title="Build the linear response">
          <Step title="Formally integrate the dipole equation">
            The dipole equation of motion is a first-order linear ODE driven by{" "}
            <Tex>{String.raw`(\text{field})\times(\text{population})`}</Tex>. Its steady-state solution is the
            convolution of the driving term with the decaying, oscillating Green&rsquo;s function — set the lower limit
            to <Tex>{String.raw`-\infty`}</Tex>:
            <EqBlock>{String.raw`\rho_{ab}{}^{(n)}(t)=\frac{i}{\hbar}\int_{-\infty}^{t}dt'\,e^{-(i\omega_{ab}+\gamma)(t-t')}\,[\mathscr{V},\rho^{(n-1)}](t').`}</EqBlock>
          </Step>
          <Step title="Average over velocity">
            Replace the sharp resonant denominators by their Doppler average: integrate the single-velocity response
            against <Tex>{String.raw`W(v)`}</Tex>. Because moving atoms see <Tex>{String.raw`\omega_{ab}+Kv`}</Tex>, this
            turns a sharp Lorentzian into a Doppler-broadened (Voigt-type) line. The very same step is reused at third
            order.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Reading the complex polarization">
          <Tex>{String.raw`\operatorname{Im}\mathscr{P}\to`}</Tex> gain (or absorption);{" "}
          <Tex>{String.raw`\operatorname{Re}\mathscr{P}\to`}</Tex> dispersion / frequency pulling. The first-order{" "}
          <Tex>{String.raw`\mathscr{P}`}</Tex> is the unsaturated gain curve for each circular component — the field has
          not yet depleted the populations.
        </Callout>
      </Section>

      <Section title="F-1 third order: saturation, the Doppler integral, and the magnetic tuning δ">
        <Intuition>
          Now let the field act <em>three</em> times. The first action creates a dipole; the second (acting on that
          dipole) modifies a population — burning a <em>hole</em> in the velocity distribution at the resonant velocity;
          the third reads that depleted population back out as a saturated dipole. This is the heart of laser saturation.
          For a standing-wave mode <Tex>{String.raw`U(z)=\sin Kz`}</Tex> the field is a sum of two counter-running
          waves, so the third-order term expands (via a product-of-sines identity) into spatially oscillating pieces;
          one survives the spatial integral and produces the <strong>Lamb dip</strong> at line center. The section
          closes by naming the magnetic tuning <Tex>{String.raw`\delta`}</Tex> that splits the{" "}
          <Tex>{String.raw`\sigma_+`}</Tex> and <Tex>{String.raw`\sigma_-`}</Tex> resonances — the single knob this whole
          appendix is about.
        </Intuition>
        <p>
          The companion lower-level population change follows from population conservation — the same double integral
          with the level decay rates swapped:
        </p>
        <EqBlock label="6">{String.raw`\rho_{bb}{}^{(2)}(z,v,t)=-\big[\rho_{++}{}^{(2)}+\rho_{--}{}^{(2)}\big]\qquad(\gamma_a\leftrightarrow\gamma_b).`}</EqBlock>
        <p>
          Feeding that hole back into the dipole equation gives the third-order dipole as a nested <em>triple</em> time
          integral — field, population, field, dipole — with three propagators (dipole, population, dipole):
        </p>
        <EqBlock label="7">{String.raw`\rho_{+b}{}^{(3)}(z,v,t)=\frac{i}{\hbar}\,(-i\hbar^{-3}NW)\!\int_{0}^{\infty}\!d\tau'\!\int_{0}^{\infty}\!d\tau''\,e^{-(i\omega_{+b}+\gamma)\tau'}\,\mathscr{V}_{+b}(t')\big[e^{-\gamma_a\tau''}+e^{-\gamma_b\tau''}\big]+\dots`}</EqBlock>
        <p>
          Inserting the standing-wave mode <Tex>{String.raw`U`}</Tex> and grouping the rates into an effective complex
          frequency <Tex>{String.raw`\phi_+`}</Tex> compresses this to
        </p>
        <EqBlock label="8">{String.raw`\rho_{a+}{}^{(3)}(z,\nu,t)=-\frac{i}{2}\,\frac{\wp}{\hbar}\,N\,W\,E_{+}\int_{-\infty}^{t}dt'\,\exp[-(i\omega_{ab}+\phi_{+})t']\,U(t').`}</EqBlock>
        <p>
          The standing wave is written as a sum of two counter-propagating running waves via the addition formula:
        </p>
        <EqBlock label="9">{String.raw`U(z)=\sin(Kz),\qquad \sin[K(z-vt')]=\tfrac{1}{2i}\big\{e^{iK(z-vt')}-e^{-iK(z-vt')}\big\}.`}</EqBlock>
        <p>
          Splitting into <Tex>{String.raw`\pm K`}</Tex> running components is exactly what later produces the
          spatial-hole-burning / Lamb-dip terms. Substituting the mode amplitude into the triple integral gives the
          third-order dipole for the <Tex>{String.raw`\sigma_+`}</Tex> component, before the velocity integral:
        </p>
        <EqBlock label="10">{String.raw`\rho_{+b}{}^{(3)}(z,v,t)=i\Big(\tfrac{1}{2}\tfrac{\wp}{\hbar}\Big)^{3}N W E_{+}\,e^{-i(\nu_{+}t+\phi_{+})}\!\int_{0}^{\infty}\!d\tau'\!\int_{0}^{\infty}\!d\tau''\!\int_{0}^{\infty}\!d\tau'''\,e^{-(i\omega_{+b}-i\nu_{+}+\gamma)\tau}\,U(z')U^{*}(z'')U(z''').`}</EqBlock>
        <p>
          The cosine that appears in the velocity dependence is averaged over the Maxwellian by completing the
          square — the key technical lemma of the appendix:
        </p>
        <KeyResult
          number="12"
          label="Doppler velocity integral (completing the square)"
          eq={String.raw`(\sqrt{\pi}\,u)^{-1}\!\int_{-\infty}^{\infty}\!dv\,e^{-(v/u)^2}\cos[Kv(t'-t'')]=\exp\!\big[-\tfrac{1}{4}(Ku)^2 (t'-t'')^2\big].`}
          note={
            <>
              A Gaussian velocity average of a cosine yields a Gaussian decay in time, of width set by the Doppler
              frequency <Tex>{String.raw`Ku`}</Tex>.
            </>
          }
        />
        <p>
          Because that Gaussian is sharply peaked (the large-Doppler / slowly-varying limit), any smooth factor{" "}
          <Tex>{String.raw`G`}</Tex> can be pulled out at the peak, leaving a <Tex>{String.raw`1/(Ku)`}</Tex> factor:
        </p>
        <EqBlock label="13">{String.raw`\int dt''\,G(t',t'')\,\exp\!\big[-\tfrac{1}{4}(Ku)^2(t''-\tau')^2\big]\approx 2\sqrt{\pi}\,(Ku)^{-1}\,G(t',\tau').`}</EqBlock>
        <p>This reduces the nested integral to algebra, and the surviving terms organize into self- and cross-saturation:</p>
        <KeyResult
          number="15"
          label="Third-order polarization (J = 1 → J = 0)"
          eq={String.raw`\mathscr{P}_{+}{}^{(3)}(t)=\tfrac{1}{16}\,i\,\wp^{4}\bar N(\hbar^{3}Ku)^{-1}E_{+}\Big\{E_{+}^{2}\,2\gamma_{ab}(\gamma\gamma_a\gamma_b)^{-1}\big[1+\gamma\mathscr{D}(\omega_{+b}-\nu_{+})\big]+E_{-}^{2}\gamma_b^{-1}\big[\mathscr{D}(\delta)+\mathscr{D}(\omega_0-\nu_0)\big]+E_{-}^{2}\mathscr{D}_a(2\delta)\big[\mathscr{D}(\delta)+\mathscr{D}(\omega_{+b}-\nu_{+})\big]\Big\}.`}
          note={
            <>
              A <strong>self-saturation</strong> term <Tex>{String.raw`\propto E_{+}^{3}`}</Tex> (the{" "}
              <Tex>{String.raw`\sigma_+`}</Tex> component eating its own gain) plus a <strong>cross-saturation</strong>{" "}
              term <Tex>{String.raw`\propto E_{+}E_{-}^{2}`}</Tex> (the <Tex>{String.raw`\sigma_-`}</Tex> intensity
              depleting the <Tex>{String.raw`\sigma_+`}</Tex> gain), each weighted by Lorentzians of the detuning,
              including the Zeeman splitting <Tex>{String.raw`\delta`}</Tex>.
            </>
          }
        />
        <p>
          The components split symmetrically about the mean transition and mean field frequencies,
        </p>
        <EqBlock label="16a">{String.raw`\omega_0=\tfrac{1}{2}(\omega_{a+}+\omega_{a-}),\qquad \nu_0=\tfrac{1}{2}(\nu_{+}+\nu_{-}),`}</EqBlock>
        <p>and the magnitude of the split is the master parameter of the whole appendix:</p>
        <KeyResult
          number="16"
          label="Magnetic (Zeeman) tuning"
          eq={String.raw`\delta=\frac{g\mu_B H}{\hbar}-\tfrac{1}{2}(\nu_{+}-\nu_{-})\simeq\frac{g\mu_B H}{\hbar}.`}
          note={
            <>
              The Zeeman splitting between the <Tex>{String.raw`\sigma_+`}</Tex> and <Tex>{String.raw`\sigma_-`}</Tex>{" "}
              resonances is set by the Landé factor <Tex>{String.raw`g`}</Tex>, the Bohr magneton{" "}
              <Tex>{String.raw`\mu_B`}</Tex>, and the applied field <Tex>{String.raw`H`}</Tex>. This is the single
              physical knob the appendix characterizes.
            </>
          }
        />

        <Derivation title="Iterate to third order, then integrate">
          <Step title="Iterate ρ⁽⁰⁾ → ρ⁽¹⁾ → ρ⁽²⁾ → ρ⁽³⁾">
            Plug <Tex>{String.raw`\rho^{(0)}`}</Tex> into the dipole equation to get{" "}
            <Tex>{String.raw`\rho^{(1)}`}</Tex> (Eqs. 3/5); plug that into the population equation for the second-order
            hole <Tex>{String.raw`\rho^{(2)}`}</Tex> (Eq. 6); plug the hole back into the dipole equation for{" "}
            <Tex>{String.raw`\rho^{(3)}`}</Tex> (Eq. 7). Three nested time integrals, three Green&rsquo;s-function
            propagators.
          </Step>
          <Step title="Expand the standing wave">
            Write <Tex>{String.raw`U=\sin Kz`}</Tex> and use the product-of-sines / addition formula (Eq. 9) so each
            running-wave factor carries <Tex>{String.raw`e^{\pm iKvt}`}</Tex>. Collecting the spatial phases identifies
            the term that survives spatial averaging — the spatial-hole-burning term responsible for the Lamb dip at
            line center.
          </Step>
          <Step title="Do the velocity integral">
            The cosine that appears is averaged over the Maxwellian by completing the square (Eq. 12):{" "}
            <Tex>{String.raw`\langle\cos[Kv\,\Delta t]\rangle=e^{-(Ku)^2\Delta t^2/4}`}</Tex>. Apply the slowly-varying
            approximation (Eq. 13) to pull smooth factors out at the Gaussian peak, picking up the{" "}
            <Tex>{String.raw`1/(Ku)`}</Tex> Doppler-width factor.
          </Step>
          <Step title="Collect self vs cross, read off δ">
            Group the surviving terms into one <Tex>{String.raw`\propto E_{+}^{3}`}</Tex> (self) and one{" "}
            <Tex>{String.raw`\propto E_{+}E_{-}^{2}`}</Tex> (cross). The detunings inside the Lorentzians include the
            magnetic splitting; defining <Tex>{String.raw`\delta=g\mu_B H/\hbar`}</Tex> (Eq. 16) makes the Zeeman
            dependence explicit.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Self vs cross saturation">
          The <Tex>{String.raw`E_{+}^{3}`}</Tex> term: the <Tex>{String.raw`\sigma_+`}</Tex> light burns a hole in the
          population that reduces <em>its own</em> gain (self-saturation). The <Tex>{String.raw`E_{+}E_{-}^{2}`}</Tex>{" "}
          term: the <Tex>{String.raw`\sigma_-`}</Tex> light burns a hole the <Tex>{String.raw`\sigma_+`}</Tex> light
          also feels (cross-saturation / mode coupling). The competition, tuned by{" "}
          <Tex>{String.raw`\delta`}</Tex> through <Tex>{String.raw`\mathscr{L}(\delta)`}</Tex>, governs how strongly the
          two circular polarizations interact in a Zeeman laser. As <Tex>{String.raw`\delta`}</Tex> grows, the{" "}
          <em>resonant</em> part of the cross-coupling (<Tex>{String.raw`\mathscr{L}(\delta)`}</Tex>, and the{" "}
          <Tex>{String.raw`\mathscr{L}(2\delta)`}</Tex> piece) dies — but a residual incoherent cross-saturation through
          the <em>shared lower level</em>, the <Tex>{String.raw`\delta`}</Tex>-independent{" "}
          <Tex>{String.raw`\mathscr{D}(\omega_0-\nu_0)`}</Tex> term, survives at line center. The two circular modes
          weaken their coupling toward a <strong>floor</strong>; they do not fully decouple.
        </Callout>

        <SimFrame
          title="Zeeman laser gain spectrum: σ+ / σ− competition vs magnetic field"
          caption={
            <>
              The gain <Tex>{String.raw`\operatorname{Im}\mathscr{P}(\nu)`}</Tex> is plotted vs detuning{" "}
              <Tex>{String.raw`(\nu-\omega_0)`}</Tex> as three curves: the <Tex>{String.raw`\sigma_+`}</Tex> component
              (indigo), <Tex>{String.raw`\sigma_-`}</Tex> (cyan), and their bold sum (red). Linear gain comes from the
              velocity-averaged plasma dispersion function (F-1 first order); the saturated gain is the honest promotion
              of Eq. 15 with an explicit self term <Tex>{String.raw`(1+\mathscr{L})`}</Tex> and a cross term split into a{" "}
              <em>resonant</em> piece weighted by <Tex>{String.raw`\mathscr{L}(\delta)`}</Tex> (which dies as{" "}
              <Tex>{String.raw`\delta`}</Tex> grows) plus a <Tex>{String.raw`\delta`}</Tex>-independent shared-lower-level
              piece parked at line center (the surviving coupling floor). The lower panel shows the dispersion{" "}
              <Tex>{String.raw`\operatorname{Re}\mathscr{P}`}</Tex> (frequency pulling); the inset shows the two velocity
              holes in <Tex>{String.raw`W(v)`}</Tex> split by <Tex>{String.raw`\delta`}</Tex>.
            </>
          }
          tryThis={
            <>
              Raise <Tex>{String.raw`H`}</Tex> and watch the single line split into the two circular components,
              separated by <Tex>{String.raw`\delta\simeq g\mu_B H/\hbar`}</Tex>; the <Tex>{String.raw`L(\delta)`}</Tex>{" "}
              readout — the <em>resonant</em> part of the cross-coupling — falls toward zero, but the cross saturation
              floors at a nonzero value: a residual coupling through the shared lower level remains at line center, so
              the modes never fully decouple. Turn up <Tex>{String.raw`I`}</Tex> from 0 to watch
              self- and cross-saturation carve a Lamb dip into each peak and eat the gain (compare the dashed
              unsaturated sum). Shrink <Tex>{String.raw`Ku`}</Tex> toward <Tex>{String.raw`\gamma`}</Tex> to sharpen the
              components and resolve the dip. Step <Tex>{String.raw`J`}</Tex> up — the F-3 sum-rule prefactor{" "}
              <Tex>{String.raw`P(J)`}</Tex> rescales the saturation strength; at <Tex>{String.raw`J=0`}</Tex> it vanishes
              and the gain is purely linear.
            </>
          }
        >
          <AppFSim />
        </SimFrame>
      </Section>

      <Section title="F-2 arbitrary J: summing over sublevels and the perturbation tree">
        <Intuition>
          For a real transition <Tex>{String.raw`J\to J'`}</Tex> there are many magnetic sublevels, and the field can
          walk an atom through a whole chain of them. The single dipole of F-1 becomes a <em>sum</em> over sublevel
          pathways. The bookkeeping is organized as a <strong>perturbation tree</strong> (Fig. F-1): starting from a
          population, each field interaction branches to a neighboring sublevel via a <Tex>{String.raw`\sigma_+`}</Tex>{" "}
          or <Tex>{String.raw`\sigma_-`}</Tex> step, and after three interactions you have four distinct branches{" "}
          (<Tex>{String.raw`j=1,2,3,4`}</Tex>) that each contribute to the third-order polarization. The physics is
          identical to F-1 — first-order linear response, third-order saturation — but every matrix element is now a
          sublevel-specific dipole and every term is a sum over <Tex>{String.raw`m`}</Tex>.
        </Intuition>
        <p>
          The equations of motion gain a sum over connected sublevels. For an upper-level element{" "}
          <Tex>{String.raw`(a'a)`}</Tex>:
        </p>
        <EqBlock label="18">{String.raw`\dot{\rho}_{a'a''}=-(i\omega_{a'a''}+\gamma_a)\,\rho_{a'a''}+\frac{i}{\hbar}\sum_{b''}\big(\mathscr{V}_{b''a''}\rho_{a'b''}-\mathscr{V}_{a'b''}\rho_{b''a''}\big)+\lambda_{a'}\delta_{a'a''},`}</EqBlock>
        <p>and for a lower-level element <Tex>{String.raw`(b'b)`}</Tex>, summed over connected upper sublevels:</p>
        <EqBlock label="19">{String.raw`\dot{\rho}_{b'b}=-(i\omega_{b'b}+\gamma_b)\,\rho_{b'b}+\frac{i}{\hbar}\sum_{a'}\big(\mathscr{V}_{b'a'}\rho_{a'b}-\mathscr{V}_{a'b}\rho_{b'a'}\big)+\lambda_b\delta_{b'b}.`}</EqBlock>
        <p>
          The remaining elements follow by Hermiticity (so only half the matrix need be propagated), and for simplicity
          the decay rates are assigned <Tex>{String.raw`\gamma_{a'b'}=\gamma,\ \gamma_{a'}=\gamma_a,\ \gamma_{b'}=\gamma_b`}</Tex>:
        </p>
        <EqBlock label="20">{String.raw`\dot{\rho}_{b'a'}=\dot{\rho}_{a'b'}{}^{*}.`}</EqBlock>
        <p>
          Iterating reproduces the F-1 ladder, now with sublevel sums at every step. First order:
        </p>
        <EqBlock label="21">{String.raw`\rho_{a'b'}{}^{(1)}(z,v,t)=\frac{i}{\hbar}\int_{-\infty}^{t}dt'\,e^{-(i\omega_{a'b'}+\gamma)(t-t')}\big[\rho_{a'a'}{}^{(0)}-\rho_{b'b'}{}^{(0)}\big]\mathscr{V}_{a'b'}(t')=\frac{i}{\hbar}W(v)N(z,t)\int_{0}^{\infty}d\tau'\,\mathscr{V}_{a'b'}(t')\,e^{-(i\omega_{a'b'}+\gamma)\tau'}.`}</EqBlock>
        <p>Second-order population (the hole), with <Tex>{String.raw`\tau'=t-t'`}</Tex>:</p>
        <EqBlock label="22">{String.raw`\rho_{a'a''}{}^{(2)}(z,v,t)=\frac{i}{\hbar}\int_{0}^{\infty}\!d\tau'\,e^{-(i\omega_{a'a''}+\gamma_a)\tau'}\sum_{b''}\big[\mathscr{V}_{b''a''}(t')\rho_{a'b''}{}^{(1)}-\mathscr{V}_{a'b''}(t')\rho_{b''a''}{}^{(1)}\big].`}</EqBlock>
        <p>
          Third order is the triple time integral of F-1 generalized to a sum over all sublevel pathways (with{" "}
          <Tex>{String.raw`\tau''=t'-t'''`}</Tex>, <Tex>{String.raw`\tau'''=t''-t'''`}</Tex>):
        </p>
        <EqBlock label="23–24">{String.raw`\rho_{a'b}{}^{(3)}=-\frac{i}{\hbar^3}\sum_{a''b''}\int_0^\infty\!\!d\tau'\!\int_0^\infty\!\!d\tau''\!\int_0^\infty\!\!d\tau'''\,\mathscr{V}\mathscr{V}\mathscr{V}\,e^{-(\dots)\tau'}e^{-(\dots)\tau''}e^{-(\dots)\tau'''}.`}</EqBlock>
        <p>Reading the four branches of the tree and summing them collapses this into a single master expression:</p>
        <KeyResult
          number="30"
          label="Third-order dipole as the sum of four tree branches"
          eq={String.raw`\rho_{a'b'}{}^{(3)}=\sum_{j=1}^{4}(\text{branch }j)=\tfrac{1}{4}\sqrt{2}\,i\,N(\nu,z)\,W(\nu)\sum_{a''b''}\mathscr{M}_{a''b'}\mathscr{M}_{b''a''}\mathscr{M}_{a'b''}\int_{0}^{\infty}\!\!d\tau'\!\int_{0}^{\infty}\!\!d\tau''\!\int_{0}^{\infty}\!\!d\tau'''\,U(z')U^{*}(z'')U(z''')\,e^{-(\dots)},\quad \mathscr{M}_{a'b'}=\wp_{a'b'}\hbar^{-1}E_{a'b'}e^{-i(\nu_{a'b'}t+\phi_{a'b'})}.`}
          note={
            <>
              Each branch is a specific time-ordering / sublevel-stepping sequence; together the four branches give the
              complete saturated polarization for general <Tex>{String.raw`J`}</Tex>.
            </>
          }
        />

        <Derivation title="From F-1 to arbitrary J">
          <Step title="Generalize the equations of motion">
            Replace the single <Tex>{String.raw`a,b`}</Tex> indices of F-1 by sublevel-resolved{" "}
            <Tex>{String.raw`a',a`}</Tex> and <Tex>{String.raw`b',b`}</Tex>, and insert sums over connected sublevels
            (<Tex>{String.raw`\Delta m=\pm1`}</Tex> by selection rule) into every field-coupling term. Pumps{" "}
            <Tex>{String.raw`\lambda_a,\lambda_b`}</Tex> enter only the diagonal (<Tex>{String.raw`\delta_{a'a}`}</Tex>)
            parts.
          </Step>
          <Step title="Iterate again to third order">
            Exactly as in F-1: <Tex>{String.raw`\rho^{(0)}\to\rho^{(1)}`}</Tex> (Eq. 21){" "}
            <Tex>{String.raw`\to\rho^{(2)}`}</Tex> (Eq. 22) <Tex>{String.raw`\to\rho^{(3)}`}</Tex> (Eqs. 23/24), but now
            each step carries a sublevel sum. The triple-time-integral structure is unchanged.
          </Step>
          <Step title="Read the perturbation tree (Fig. F-1)">
            The root is a population; each downward edge is one field interaction that steps the atom to a neighboring
            sublevel via <Tex>{String.raw`\sigma_+`}</Tex> or <Tex>{String.raw`\sigma_-`}</Tex>. After three
            interactions there are four leaves — four branches that sum to <Tex>{String.raw`\rho^{(3)}`}</Tex> (Eq. 30).
            The tree guarantees no pathway is missed.
          </Step>
        </Derivation>

        <Figure
          caption={
            <>
              <strong>Fig. F-1 — the perturbation tree for <Tex>{String.raw`\rho^{(3)}`}</Tex>.</strong> The root is the
              unperturbed population <Tex>{String.raw`N`}</Tex>. Each downward edge is one field interaction that steps
              the atom to a neighboring sublevel via <Tex>{String.raw`\sigma_+`}</Tex> (<Tex>{String.raw`\Delta m=+1`}</Tex>)
              or <Tex>{String.raw`\sigma_-`}</Tex> (<Tex>{String.raw`\Delta m=-1`}</Tex>). After three interactions the
              tree has four leaves — the four branches <Tex>{String.raw`j=1\ldots4`}</Tex> that sum to Eq. 30.
            </>
          }
        >
          <svg viewBox="0 0 680 320" width="100%" role="img" aria-label="Perturbation tree with four branches">
            <defs>
              <marker id="ahF" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
              </marker>
            </defs>
            {/* root population */}
            <rect x="295" y="12" width="90" height="30" rx="5" fill="#fef9c3" stroke="#d97706" />
            <text x="340" y="32" textAnchor="middle" fontSize="14" fill="#1f2733">N (pop.)</text>
            {/* first interaction */}
            <line x1="340" y1="42" x2="340" y2="64" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ahF)" />
            <text x="356" y="58" fontSize="11" fill="#4f46e5">×𝒱</text>
            <rect x="295" y="64" width="90" height="26" rx="5" fill="#fff" stroke="#94a3b8" />
            <text x="340" y="81" textAnchor="middle" fontSize="12" fill="#1f2733">ρ⁽¹⁾ dipole</text>
            {/* second interaction */}
            <line x1="340" y1="90" x2="340" y2="112" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ahF)" />
            <text x="356" y="106" fontSize="11" fill="#4f46e5">×𝒱</text>
            <rect x="295" y="112" width="90" height="26" rx="5" fill="#ecfeff" stroke="#0891b2" />
            <text x="340" y="129" textAnchor="middle" fontSize="12" fill="#1f2733">ρ⁽²⁾ hole</text>
            {/* fan to four branches (third interaction) */}
            {[70, 230, 410, 570].map((cx, i) => (
              <g key={i}>
                <line x1="340" y1="138" x2={cx + 50} y2="170" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#ahF)" />
                <text x={(340 + cx + 50) / 2 + 6} y={156 + (i < 2 ? 0 : 0)} fontSize="11" fontWeight="600" fill={i % 2 === 0 ? "#4f46e5" : "#0891b2"}>
                  {i % 2 === 0 ? "σ+" : "σ−"}
                </text>
                <text x={cx + 50} y="166" textAnchor="middle" fontSize="12" fontWeight="600" fill="#4f46e5">
                  {`j = ${i + 1}`}
                </text>
                <rect x={cx} y="170" width="100" height="26" rx="5" fill="#fff" stroke="#94a3b8" />
                <text x={cx + 50} y="187" textAnchor="middle" fontSize="12" fill="#1f2733">ρ⁽³⁾ dipole</text>
                <line x1={cx + 50} y1="196" x2={cx + 50} y2="226" stroke="#64748b" strokeWidth="1.3" markerEnd="url(#ahF)" />
                <rect x={cx} y="226" width="100" height="26" rx="5" fill="#eef2ff" stroke="#4f46e5" />
                <text x={cx + 50} y="243" textAnchor="middle" fontSize="12" fill="#1f2733">{`branch ${i + 1}`}</text>
              </g>
            ))}
            <text x="340" y="284" textAnchor="middle" fontSize="12" fill="#5b6473">
              vertical edges = multiply (one branch) · horizontal fan = add the four branches
            </text>
            <text x="340" y="304" textAnchor="middle" fontSize="11" fill="#94a3b8">
              each edge is a σ+ (Δm=+1) or σ− (Δm=−1) field step; the four leaves are the j=1…4 terms of Eq. 30
            </text>
          </svg>
        </Figure>

        <Figure
          caption={
            <>
              <strong>Fig. F-2 — allowed-transition sublevel diagrams.</strong> For each transition case the upper
              (<Tex>{String.raw`a`}</Tex>) and lower (<Tex>{String.raw`b`}</Tex>) sublevels are drawn as a Zeeman
              ladder; the arrows mark which sublevels the <Tex>{String.raw`\sigma_+`}</Tex> (indigo,{" "}
              <Tex>{String.raw`\Delta m=+1`}</Tex>) and <Tex>{String.raw`\sigma_-`}</Tex> (cyan,{" "}
              <Tex>{String.raw`\Delta m=-1`}</Tex>) field components connect — the couplings that survive in third order
              and feed the self- and cross-saturation sums.
            </>
          }
        >
          <svg viewBox="0 0 680 230" width="100%" role="img" aria-label="Zeeman level diagrams for allowed transition cases">
            <defs>
              <marker id="apF" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#4f46e5" />
              </marker>
              <marker id="amF" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto">
                <path d="M0,0 L5,2.5 L0,5 Z" fill="#0891b2" />
              </marker>
            </defs>
            {/* three cases laid out horizontally */}
            {[
              { x: 30, label: "Case J → J−1", up: 3, lo: 1 },
              { x: 250, label: "Case J → J", up: 3, lo: 3 },
              { x: 470, label: "Case J → J+1", up: 3, lo: 5 },
            ].map((c, ci) => {
              const W = 180;
              const yUp = 56;
              const yLo = 160;
              const spread = (n: number, w: number) => {
                const arr: number[] = [];
                const step = n > 1 ? w / (n - 1) : 0;
                for (let k = 0; k < n; k++) arr.push(c.x + 10 + (n > 1 ? k * step : w / 2));
                return arr;
              };
              const ups = spread(c.up, W - 20);
              const los = spread(c.lo, W - 20);
              return (
                <g key={ci}>
                  <text x={c.x + W / 2} y="22" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1f2733">
                    {c.label}
                  </text>
                  {/* upper sublevels */}
                  {ups.map((ux, k) => (
                    <line key={`u${k}`} x1={ux - 14} y1={yUp} x2={ux + 14} y2={yUp} stroke="#334155" strokeWidth="2.5" />
                  ))}
                  <text x={c.x + 4} y={yUp - 8} fontSize="10" fill="#64748b">a (J)</text>
                  {/* lower sublevels */}
                  {los.map((lx, k) => (
                    <line key={`l${k}`} x1={lx - 14} y1={yLo} x2={lx + 14} y2={yLo} stroke="#334155" strokeWidth="2.5" />
                  ))}
                  <text x={c.x + 4} y={yLo + 18} fontSize="10" fill="#64748b">b (J')</text>
                  {/* σ+ and σ- arrows from each upper to a neighbor lower */}
                  {ups.map((ux, k) => {
                    const lp = los[Math.min(los.length - 1, k + 1 < los.length ? k : los.length - 1)];
                    const lm = los[Math.max(0, los.length >= ups.length ? k : 0)];
                    return (
                      <g key={`arr${k}`}>
                        {lp != null && (
                          <line x1={ux} y1={yUp + 4} x2={lp - 4} y2={yLo - 4} stroke="#4f46e5" strokeWidth="1.2" markerEnd="url(#apF)" opacity="0.8" />
                        )}
                        {lm != null && lm !== lp && (
                          <line x1={ux} y1={yUp + 4} x2={lm + 4} y2={yLo - 4} stroke="#0891b2" strokeWidth="1.2" markerEnd="url(#amF)" opacity="0.8" />
                        )}
                      </g>
                    );
                  })}
                </g>
              );
            })}
            <text x="340" y="216" textAnchor="middle" fontSize="11" fill="#94a3b8">
              indigo = σ+ (Δm=+1) · cyan = σ− (Δm=−1) · the surviving couplings set the F-2 sublevel sums
            </text>
          </svg>
        </Figure>

        <Callout kind="warning" title="The figures are reconstructions, not the original scans">
          The original Fig. F-1 (perturbation tree) and Fig. F-2 (allowed-transition sublevel diagrams) could not be
          seen directly. The SVGs above are faithful reconstructions from their descriptions: Fig. F-1 is the
          four-branch tree of <Tex>{String.raw`\sigma_+/\sigma_-`}</Tex> field interactions producing the four
          third-order terms; Fig. F-2 is the gallery of Zeeman-split level diagrams enumerating which upper and lower
          sublevels are connected for the transition cases <Tex>{String.raw`J\to J,\ J\to J\pm1`}</Tex>, marking the
          self- and cross-saturation couplings that survive in third order.
        </Callout>
      </Section>

      <Section title="F-2 self- and cross-saturation coefficients">
        <Intuition>
          Having summed the tree, the appendix packages the result into physically named coefficients. The{" "}
          <strong>self-saturation</strong> coefficient <Tex>{String.raw`\sigma_a+i\alpha_a`}</Tex> tells you how strongly
          a circular mode saturates its own gain (<Tex>{String.raw`\sigma_a`}</Tex>) and how much it shifts in frequency
          while doing so (<Tex>{String.raw`\alpha_a`}</Tex>). The <strong>cross-saturation</strong> / mode-coupling
          coefficients <Tex>{String.raw`\theta,\tau`}</Tex> tell you how the <Tex>{String.raw`\sigma_+`}</Tex> and{" "}
          <Tex>{String.raw`\sigma_-`}</Tex> modes steal gain from each other — what makes the two circular polarizations
          compete, lock, or beat. These are exactly the numbers a laser engineer plugs into the coupled-mode equations.
        </Intuition>
        <p>
          The self-saturation coefficient, as a sublevel sum of fourth-power dipole matrix elements weighted by the
          Lorentzian and the Doppler factor, is
        </p>
        <KeyResult
          number="32"
          label="Self-saturation coefficient"
          eq={String.raw`\sigma_a+i\alpha_a=\frac{2\hbar^{2}\gamma_a\gamma_b}{\wp^{2}}\vartheta_{++++}=F_3\sum_{a'b'}\delta_{a',b'\pm1}\big|\wp_{a'b'}/\wp\big|^{4}\big[\gamma\mathscr{D}(\omega_{a'b'}-\nu_{+})+1\big].`}
          note={
            <>
              Real part <Tex>{String.raw`\sigma_a`}</Tex> = gain saturation; imaginary part{" "}
              <Tex>{String.raw`\alpha_a`}</Tex> = self-pushing frequency shift. (The book&rsquo;s Eq. 28 is instead the
              first-order linear coefficient <Tex>{String.raw`\sigma_{\pm}+ia_{\pm}`}</Tex>, built from the plasma
              dispersion function <Tex>{String.raw`Z`}</Tex> and a cavity-loss term; the self-saturation coefficient
              proper is its Eq. 32.)
            </>
          }
        />
        <p>
          The dimensionless Lorentzian lineshape factor used throughout — peaked at resonance{" "}
          <Tex>{String.raw`\omega=\nu`}</Tex>, of width set by the dipole decay <Tex>{String.raw`\gamma`}</Tex> — is
        </p>
        <KeyResult
          label="The Lorentzian lineshape factor"
          eq={String.raw`\mathscr{L}(\omega-\nu)\equiv\frac{\gamma^2}{\gamma^2+(\omega-\nu)^2}.`}
          note={
            <>
              The real, normalized lineshape used by the simulation; it is the real-part analogue of the complex
              denominator function <Tex>{String.raw`\mathscr{D}`}</Tex> that appears in the saturation coefficients
              (Eqs. 15, 32, 36, 37).
            </>
          }
        />
        <p>
          The saturation coefficients are built from the <strong>mode phasor</strong> that packages each circular
          component&rsquo;s dipole, amplitude, frequency, and phase:
        </p>
        <EqBlock label="29">{String.raw`\mathscr{M}_{a'b'}=\wp_{a'b'}\,\hbar^{-1}\,E_{a'b'}\,\exp[-i(\nu_{a'b'}t+\phi_{a'b'})].`}</EqBlock>
        <p>
          The cross-saturation (mode-coupling) coefficient <Tex>{String.raw`\theta`}</Tex> between the two circular
          components, as a sublevel sum, is
        </p>
        <KeyResult
          number="36"
          label="Cross-saturation coefficient θ"
          eq={String.raw`\vartheta_{++--}=\tfrac{1}{4}F_1(\wp\hbar)^{-2}\sum_{a'b'}\delta_{a',b'+1}|\wp_{a'b'}|^{2}|\wp_{a',b'+2}|^{2}\Big\{\gamma_a^{-1}\big[\mathscr{D}(\omega_{a'b'}-\delta_b-\nu_{+})+\mathscr{D}(\delta_b)\big]+\mathscr{D}_b(2\delta_b)\big[\mathscr{D}(\omega_{a'b'}-\nu_{+})+\mathscr{D}(\delta_b)\big]\Big\}.`}
          note={
            <>
              <Tex>{String.raw`\delta_b`}</Tex> is the lower-level Zeeman splitting; <Tex>{String.raw`F_1`}</Tex> a
              numerical / angular factor. It governs how strongly the two circular modes compete.
            </>
          }
        />
        <p>The second mode-coupling coefficient needed for the full coupled-mode (van der Pol) pair is</p>
        <KeyResult
          number="37"
          label="Combined mode cross-coupling τ + iθ"
          eq={String.raw`\tau_{+-}+i\theta_{+-}=\frac{2\hbar^{2}\gamma_a\gamma_b}{\wp^{2}}\big[\vartheta_{+--+}+\vartheta_{++--}\big]=\tfrac{1}{4}i\,\frac{\gamma_a\gamma_b}{\wp^{4}}F_1\sum_{a'b'}\delta_{a',b'+1}|\wp_{a'b'}|^{2}\Big\{|\wp_{a'-2,b'}|^{2}\big[\mathscr{D}_a(2\delta_a)(\dots)+\gamma_b^{-1}(\dots)\big]+|\wp_{a',b'+2}|^{2}\big[\mathscr{D}_b(2\delta_b)(\dots)+\gamma_a^{-1}(\dots)\big]\Big\}.`}
        />
        <p>The upper- and lower-level Zeeman splittings entering these coefficients are the arbitrary-J versions of Eq. 16:</p>
        <EqBlock label="34–35">{String.raw`\delta_a=\frac{g_a\mu_B H}{\hbar}-\tfrac{1}{2}(\nu_{+}-\nu_{-})\simeq\frac{g_a\mu_B H}{\hbar},\qquad \delta_b=\frac{g_b\mu_B H}{\hbar}-\tfrac{1}{2}(\nu_{+}-\nu_{-})\simeq\frac{g_b\mu_B H}{\hbar}.`}</EqBlock>

        <Derivation title="Package the tree sum into coefficients">
          <Step title="Identify self vs cross terms">
            Of the four branches, those whose field factors are all the same circular component (all{" "}
            <Tex>{String.raw`+`}</Tex>) give self-saturation (<Tex>{String.raw`\propto E_{+}^{3}`}</Tex>); those mixing{" "}
            <Tex>{String.raw`+`}</Tex> and <Tex>{String.raw`-`}</Tex> give cross-saturation
            (<Tex>{String.raw`\propto E_{+}E_{-}^{2}`}</Tex>). Collect each group&rsquo;s sublevel sum into{" "}
            <Tex>{String.raw`\sigma_a+i\alpha_a`}</Tex> (self, Eq. 32) and <Tex>{String.raw`\theta,\tau`}</Tex> (cross,
            Eqs. 36&ndash;37).
          </Step>
          <Step title="Insert the Doppler factor and Lorentzians">
            Each coefficient inherits the <Tex>{String.raw`\pi^{1/2}N\,W(\nu)/(Ku)`}</Tex> Doppler prefactor and the
            Lorentzian resonance denominators <Tex>{String.raw`\mathscr{L}(\omega-\nu)`}</Tex> from the velocity integral
            of F-1, now with sublevel-resolved dipole products <Tex>{String.raw`|\wp_{a'b'}|^4`}</Tex>.
          </Step>
          <Step title="Map to transition cases (Fig. F-2)">
            Fig. F-2 enumerates the cases (<Tex>{String.raw`\delta_a`}</Tex> or <Tex>{String.raw`\delta_b`}</Tex>{" "}
            dominant; <Tex>{String.raw`J\to J`}</Tex> vs <Tex>{String.raw`J\to J\pm1`}</Tex>). For each, the sublevel
            sums in <Tex>{String.raw`\sigma,\theta,\tau`}</Tex> are evaluated using the sum rules of F-3, giving
            closed-form coefficients.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Why these coefficients matter">
          <Tex>{String.raw`\sigma_a,\alpha_a,\theta,\tau`}</Tex> are the inputs to the laser&rsquo;s coupled-mode
          (van der Pol) amplitude equations. They decide whether the <Tex>{String.raw`\sigma_+`}</Tex> and{" "}
          <Tex>{String.raw`\sigma_-`}</Tex> modes coexist, one suppresses the other, or they phase-lock — the observable
          behavior of a real Zeeman laser as you tune <Tex>{String.raw`H`}</Tex>.
        </Callout>
      </Section>

      <Section title="F-3 sum rules: collapsing the sublevel sums to closed form">
        <Intuition>
          The arbitrary-<Tex>{String.raw`J`}</Tex> coefficients are messy sums over magnetic sublevels{" "}
          <Tex>{String.raw`m`}</Tex> of products of dipole matrix elements. The magic of F-3 is that these sums collapse
          into simple closed-form polynomials in <Tex>{String.raw`J`}</Tex> — clean angular-momentum identities.
          Instead of evaluating a sum for every <Tex>{String.raw`J`}</Tex>, you get a formula. The derivation rests on
          the standard power-sum identities for <Tex>{String.raw`\sum m^2`}</Tex> and <Tex>{String.raw`\sum m^4`}</Tex>{" "}
          over the <Tex>{String.raw`2J+1`}</Tex> sublevels, plus the explicit Clebsch&ndash;Gordan dipole matrix
          elements. The crown result is a single quartic-in-<Tex>{String.raw`J`}</Tex> formula for the fourth-power
          dipole sum.
        </Intuition>
        <p>The fourth-power dipole sum rule that enters every self-saturation coefficient:</p>
        <EqBlock label="38–39">{String.raw`\sum_{a'b'}\delta_{a',b'\pm1}|\wp_{a'b'}|^{4}=\begin{cases}\dfrac{\wp^{4}J(J+1)(2J+1)(2J^{2}+2J+1)}{60}, & \Delta J=0,\\[8pt] \dfrac{\wp^{4}(J+1)(2J+1)(2J+3)(6J^{2}+12J+5)}{60}, & \Delta J=\pm1,\ J\leftrightarrow J+1.\end{cases}`}</EqBlock>
        <p>The cross-product (mode-coupling) dipole sum rules for the cross-saturation coefficients:</p>
        <EqBlock label="40–41">{String.raw`\sum_{a'b'}\delta_{a',b'\pm1}|\wp_{a'b'}|^{2}\big[|\wp_{a'-2,b'}|^{2}+|\wp_{a',b'+2}|^{2}\big]=\begin{cases}\dfrac{\wp^{4}J(J+1)(2J+1)(2J-1)(2J+3)}{60}, & \Delta J=0,\\[8pt] \dfrac{\wp^{4}(J+1)(2J+3)(2J+1)(2J^{2}+4J+5)}{60}, & \Delta J=\pm1,\ J\leftrightarrow J+1.\end{cases}`}</EqBlock>
        <p>
          These follow from the standard one-sided power-sum identities, applied to the symmetric sublevel range by
          folding it about <Tex>{String.raw`m=0`}</Tex>. The quadratic power sum and its symmetric reduction:
        </p>
        <EqBlock label="42">{String.raw`\sum_{j=1}^{N}j^{2}=\frac{N(N+1)(2N+1)}{6},\qquad \sum_{m=-J}^{J}m^{2}=2\sum_{m=1}^{J}m^{2}=\frac{J(J+1)(2J+1)}{3},`}</EqBlock>
        <p>and the quartic sum — the <Tex>{String.raw`(3J^2+3J-1)`}</Tex> factor is the signature of <Tex>{String.raw`\sum m^4`}</Tex>:</p>
        <EqBlock label="43">{String.raw`\sum_{j=1}^{N}j^{4}=\frac{N(N+1)(2N+1)(3N^{2}+3N-1)}{30},\qquad \sum_{m=-J}^{J}m^{4}=2\sum_{m=1}^{J}m^{4}=\frac{J(J+1)(2J+1)(3J^{2}+3J-1)}{15}.`}</EqBlock>
        <p>
          Using the explicit <Tex>{String.raw`\sigma_+`}</Tex> matrix element{" "}
          <Tex>{String.raw`\wp_{a',b'+1}\propto\wp[(J-m')(J+m'+1)]^{1/2}`}</Tex>, the fourth-power dipole sum that enters
          every saturation coefficient is set up as a polynomial in <Tex>{String.raw`m`}</Tex>:
        </p>
        <EqBlock>{String.raw`\sum_{m}|\wp_{a',b'+1}|^4=\tfrac{1}{16}\wp^4\sum_{m}(J-m')^2(J+m'+1)^2=\tfrac{1}{16}\wp^4\sum_{m}\big[J^4+\dots+a^2\big],`}</EqBlock>
        <p>and applying the power-sum identities collapses it to the headline closed form:</p>
        <KeyResult
          label="Fourth-power dipole sum rule (F-3)"
          eq={String.raw`\sum_{m}|\wp_{a',b'+1}|^4=\tfrac{1}{16}\wp^4\cdot\tfrac{1}{15}J(J+1)(2J+1)\big[8J^2+8J+4\big]=\tfrac{1}{60}\,\wp^4\,J(J+1)(2J+1)(2J^2+2J+1).`}
          note={
            <>
              The entire sublevel sum for the saturation coefficients collapses to one polynomial in{" "}
              <Tex>{String.raw`J`}</Tex>. By symmetry it also holds for <Tex>{String.raw`a'=b'+1`}</Tex>.
            </>
          }
        />

        <Derivation title="Derive the fourth-power sum rule">
          <Step title="Write the explicit matrix element">
            For the <Tex>{String.raw`\sigma_+`}</Tex> (<Tex>{String.raw`\Delta m=+1`}</Tex>) transition the dipole is{" "}
            <Tex>{String.raw`\wp_{a',b'+1}\propto\wp\,[(J-m')(J+m'+1)]^{1/2}`}</Tex> (Clebsch&ndash;Gordan structure),
            so its fourth power is <Tex>{String.raw`\wp^4(J-m')^2(J+m'+1)^2`}</Tex>.
          </Step>
          <Step title="Expand the polynomial in m">
            Multiply out <Tex>{String.raw`(J-m')^2(J+m'+1)^2`}</Tex> into a polynomial in <Tex>{String.raw`m'`}</Tex>{" "}
            containing <Tex>{String.raw`m^0,\dots,m^4`}</Tex>. The <Tex>{String.raw`m^4`}</Tex> and{" "}
            <Tex>{String.raw`m^2`}</Tex> pieces are handled by the power sums; odd powers cancel by symmetry of the
            symmetric sum over <Tex>{String.raw`m=-J\ldots J`}</Tex>.
          </Step>
          <Step title="Apply the power-sum identities">
            Substitute <Tex>{String.raw`\sum m^2`}</Tex> (Eq. 42) and <Tex>{String.raw`\sum m^4`}</Tex> (Eq. 43) and
            combine:
            <EqBlock>{String.raw`\frac{15J(J+1)-5(2J^2+2J-1)+(3J^2+3J-1)}{15}=\frac{8J^2+8J+4}{15}=\frac{4(2J^2+2J+1)}{15}.`}</EqBlock>
            Factor out <Tex>{String.raw`J(J+1)(2J+1)`}</Tex>.
          </Step>
          <Step title="Read off the closed form and check">
            The <Tex>{String.raw`\tfrac{1}{16}\cdot\tfrac{1}{15}\cdot4=\tfrac{1}{60}`}</Tex> prefactor times{" "}
            <Tex>{String.raw`J(J+1)(2J+1)(2J^2+2J+1)`}</Tex> gives the final sum rule. Check{" "}
            <Tex>{String.raw`J=1`}</Tex>: <Tex>{String.raw`J(J+1)(2J+1)(2J^2+2J+1)=1\cdot2\cdot3\cdot5=30`}</Tex>, so the
            sum is <Tex>{String.raw`\wp^4\cdot30/60=\wp^4/2`}</Tex> — finite and sensible.
          </Step>
        </Derivation>

        <Callout kind="warning" title="Scan artifact corrected: the bracket is +4, not −4">
          The scanned source prints the intermediate bracket as <Tex>{String.raw`[8J^2+8J-4]`}</Tex>, but carrying out
          the line above it gives <Tex>{String.raw`[15J(J+1)-5(2J^2+2J-1)+(3J^2+3J-1)]/15=[8J^2+8J+4]/15=4(2J^2+2J+1)/15`}</Tex>,
          which is exactly what produces the stated final{" "}
          <Tex>{String.raw`\tfrac{1}{60}\wp^4 J(J+1)(2J+1)(2J^2+2J+1)`}</Tex>. So the correct intermediate is{" "}
          <strong>+4</strong>. Note too that the intermediate factor <Tex>{String.raw`(2J^2+2J-1)`}</Tex> is{" "}
          <em>distinct</em> from the final <Tex>{String.raw`(2J^2+2J+1)`}</Tex> — do not conflate them. This is the
          verification habit the appendix rewards: check each algebraic line against the previous one, and confirm with
          an independent <Tex>{String.raw`J=1`}</Tex> check.
        </Callout>

        <Callout kind="insight" title="Why sum rules close the loop">
          These identities are what let you <em>use</em> the arbitrary-<Tex>{String.raw`J`}</Tex> theory: every messy
          sublevel sum in <Tex>{String.raw`\sigma_a,\theta,\tau`}</Tex> becomes a polynomial in{" "}
          <Tex>{String.raw`J`}</Tex>. The result depends only on the total angular momentum, not on tracking individual{" "}
          <Tex>{String.raw`m`}</Tex>-states — the hallmark of an angular-momentum sum rule.
        </Callout>
      </Section>

      <Section title="The three results to carry">
        <p>The whole appendix funnels into three equations. The headline of F-1, the saturated polarization:</p>
        <KeyResult
          label="Third-order saturated polarization (J = 1 → J = 0)"
          eq={String.raw`\mathscr{P}_{+}{}^{(3)}(t)=\tfrac{1}{16}\,i\,\wp^{4}\bar N(\hbar^{3}Ku)^{-1}E_{+}\Big\{E_{+}^{2}\,2\gamma_{ab}(\gamma\gamma_a\gamma_b)^{-1}\big[1+\gamma\mathscr{D}(\omega_{+b}-\nu_{+})\big]+E_{-}^{2}\gamma_b^{-1}\big[\mathscr{D}(\delta)+\mathscr{D}(\omega_0-\nu_0)\big]+E_{-}^{2}\mathscr{D}_a(2\delta)\big[\mathscr{D}(\delta)+\mathscr{D}(\omega_{+b}-\nu_{+})\big]\Big\}`}
          note={<>Self-saturation <Tex>{String.raw`\propto E_{+}^{3}`}</Tex> plus cross-saturation <Tex>{String.raw`\propto E_{+}E_{-}^{2}`}</Tex>: two circular modes competing for gain in a magnetic field.</>}
        />
        <p>The single physical knob:</p>
        <KeyResult
          label="Magnetic (Zeeman) tuning"
          eq={String.raw`\delta=\frac{g\mu_B H}{\hbar}-\tfrac{1}{2}(\nu_{+}-\nu_{-})\simeq\frac{g\mu_B H}{\hbar}`}
          note={<>Sweeping <Tex>{String.raw`\delta`}</Tex> moves the two circular gain lines apart and, through <Tex>{String.raw`\mathscr{L}(\delta)`}</Tex>, sets the strength of cross-saturation — the entire Zeeman-laser phenomenology lives here.</>}
        />
        <p>The crown of the arbitrary-J calculation:</p>
        <KeyResult
          label="Fourth-power dipole sum rule (F-3)"
          eq={String.raw`\sum_{m}|\wp_{a',b'+1}|^4=\tfrac{1}{60}\,\wp^4\,J(J+1)(2J+1)(2J^2+2J+1)`}
          note={<>Every sublevel sum in every saturation coefficient collapses to one closed-form polynomial in <Tex>{String.raw`J`}</Tex>; at <Tex>{String.raw`J=1`}</Tex> it equals <Tex>{String.raw`\wp^4/2`}</Tex>.</>}
        />
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from Appendix F">
          <ul>
            <li>
              <strong>Perturbation in the field.</strong> Expand the density matrix order by order in the drive; odd
              orders give the optical polarization, with first order = linear gain/index and third order = leading
              saturation. The iterative <Tex>{String.raw`\rho^{(0)}\to\rho^{(1)}\to\rho^{(2)}\to\rho^{(3)}`}</Tex> scheme
              recurs throughout laser theory.
            </li>
            <li>
              <strong>Self- vs cross-saturation.</strong> Self (<Tex>{String.raw`\propto E^3`}</Tex>, a mode depleting
              its own gain) vs cross / mode-coupling (<Tex>{String.raw`\propto E\,E'^2`}</Tex>, modes stealing each
              other&rsquo;s gain). The coefficients <Tex>{String.raw`\sigma_a\;(+\,i\alpha_a)`}</Tex>,{" "}
              <Tex>{String.raw`\theta`}</Tex>, and <Tex>{String.raw`\tau`}</Tex> feed the coupled-mode (van der Pol)
              amplitude equations.
            </li>
            <li>
              <strong>The Doppler velocity average</strong> over <Tex>{String.raw`W(v)=(1/\sqrt{\pi}\,u)e^{-(v/u)^2}`}</Tex>,
              done by completing the square:{" "}
              <Tex>{String.raw`\langle\cos[Kv\,\Delta t]\rangle=e^{-(Ku)^2\Delta t^2/4}`}</Tex>. This converts
              homogeneous Lorentzians into Doppler-broadened lines and produces the <Tex>{String.raw`1/(Ku)`}</Tex>{" "}
              prefactor.
            </li>
            <li>
              <strong>The Zeeman tuning</strong> <Tex>{String.raw`\delta\simeq g\mu_B H/\hbar`}</Tex> is the master knob: it
              splits the <Tex>{String.raw`\sigma_+`}</Tex> and <Tex>{String.raw`\sigma_-`}</Tex> components and governs
              their competition through <Tex>{String.raw`\mathscr{L}(\delta)`}</Tex>. Spatial hole burning in a standing
              wave (<Tex>{String.raw`\sin Kz`}</Tex> split into <Tex>{String.raw`\pm K`}</Tex> running waves) produces
              the Lamb dip at line center.
            </li>
            <li>
              <strong>Angular-momentum sum rules.</strong> Sublevel sums of dipole matrix elements collapse to
              polynomials in <Tex>{String.raw`J`}</Tex>, built from{" "}
              <Tex>{String.raw`\sum m^2=J(J+1)(2J+1)/3`}</Tex> and{" "}
              <Tex>{String.raw`\sum m^4=J(J+1)(2J+1)(3J^2+3J-1)/15`}</Tex>. Headline:{" "}
              <Tex>{String.raw`\sum|\wp|^4=\tfrac{1}{60}\wp^4 J(J+1)(2J+1)(2J^2+2J+1)`}</Tex>.
            </li>
            <li>
              <strong>A verification habit.</strong> In a scanned source, check each algebraic step against the previous
              line: the <Tex>{String.raw`p.399`}</Tex> bracket is <Tex>{String.raw`+4`}</Tex>{" "}
              (<Tex>{String.raw`8J^2+8J+4`}</Tex>), not the scanned <Tex>{String.raw`-4`}</Tex> — confirmed by
              reproducing the final closed form and the <Tex>{String.raw`J=1`}</Tex> check
              (<Tex>{String.raw`\text{sum}=\wp^4/2`}</Tex>).
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
