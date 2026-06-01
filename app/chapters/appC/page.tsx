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
import AppCSim from "@/components/sims/appC";

export default function Page() {
  return (
    <Lesson slug="appC">
      <Lede>
        Point a laser at a tube of gas and ask the only question that matters: how strongly does the medium respond
        at a given frequency? Two things blur the answer. Each atom is a damped oscillator, so its individual
        response is a <strong>Lorentzian</strong> of width set by the decay rate <Tex>{String.raw`\gamma`}</Tex>. But
        the atoms fly around at thermal speeds, so each one&rsquo;s resonance is Doppler-shifted, and the shifts follow
        a <strong>Gaussian</strong> (Maxwellian) of width <Tex>{String.raw`Ku`}</Tex>. The total response is a
        Lorentzian convolved with a Gaussian &mdash; a <strong>Voigt profile</strong> &mdash; and the{" "}
        <strong>plasma dispersion function</strong> <Tex>{String.raw`Z`}</Tex> is exactly the complex packaging of
        that profile. Its imaginary part is the gain lineshape; its real part is the accompanying dispersion. One deep
        fact runs through this entire appendix: <Tex>{String.raw`Z`}</Tex> is the Hilbert transform of a Gaussian
        &mdash; the unavoidable complex lineshape of a Doppler-broadened, homogeneously damped gas laser transition.
        Everything else is just learning to compute and read that one curve.
      </Lede>

      <Section title="Why Z exists: two equivalent definitions of a Doppler-broadened line">
        <Intuition>
          A gas laser medium does not respond at a single sharp frequency. Each atom relaxes at rate{" "}
          <Tex>{String.raw`\gamma`}</Tex> (collisions and spontaneous emission), which alone would give a Lorentzian.
          But the atoms move, so each atom&rsquo;s resonance is Doppler-shifted by <Tex>{String.raw`Kv`}</Tex>, and
          the velocities are distributed as a Gaussian of width <Tex>{String.raw`u`}</Tex> (the most-probable speed).
          The function <Tex>{String.raw`Z`}</Tex> packages the resulting complex susceptibility. The chapter states it
          two equivalent ways: the <strong>time-domain</strong> form reads it as the transform of an{" "}
          <em>exponentially decaying dipole times a Gaussian dephasing envelope</em>, and the{" "}
          <strong>frequency-domain</strong> form reads it as a <em>complex Lorentzian convolved with a Gaussian
          velocity distribution</em> &mdash; literally the Voigt integral.
        </Intuition>
        <p>
          The complex argument carries both the damping and the detuning,{" "}
          <Tex>{String.raw`v = \gamma + i(\omega-\nu)`}</Tex>: <Tex>{String.raw`\gamma`}</Tex> is the homogeneous decay
          rate and <Tex>{String.raw`(\omega-\nu)`}</Tex> is the detuning of the field frequency{" "}
          <Tex>{String.raw`\omega`}</Tex> from line center <Tex>{String.raw`\nu`}</Tex>. Here{" "}
          <Tex>{String.raw`K`}</Tex> is the wavenumber and <Tex>{String.raw`u`}</Tex> the most-probable atomic speed, so{" "}
          <Tex>{String.raw`Ku`}</Tex> is the Doppler width. The time-domain definition is
        </p>
        <KeyResult
          number="1"
          eq={String.raw`Z(v) = iKu \int_0^\infty d\tau\, \exp\!\left[-v\tau - (Ku/2)^2 \tau^2\right]`}
          label="Time-domain (Fourier) definition"
          note={
            <>
              The Fourier transform of a decaying dipole &mdash; factor <Tex>{String.raw`e^{-v\tau}`}</Tex> with{" "}
              <Tex>{String.raw`v=\gamma+i(\omega-\nu)`}</Tex> &mdash; modulated by a Gaussian dephasing envelope{" "}
              <Tex>{String.raw`e^{-(Ku/2)^2\tau^2}`}</Tex> from the spread of Doppler shifts.
            </>
          }
        />
        <p>The frequency-domain definition is the Voigt convolution itself:</p>
        <KeyResult
          number="2"
          eq={String.raw`Z(v) = \frac{iK}{\sqrt{\pi}} \int_{-\infty}^{\infty} dv'\, \frac{\exp[-(v'/u)^2]}{v + iKv'}`}
          label="Frequency-domain (Voigt) definition"
          note={
            <>
              A complex Lorentzian <Tex>{String.raw`1/(v+iKv')`}</Tex> averaged over the Gaussian velocity distribution{" "}
              <Tex>{String.raw`e^{-(v'/u)^2}/\sqrt{\pi}`}</Tex> &mdash; a Lorentzian convolved with a Gaussian.
            </>
          }
        />
        <p>Both are projections of a single parent double integral:</p>
        <EqBlock label="3">{String.raw`Z(v) = \frac{iK}{\sqrt{\pi}} \int_0^\infty d\tau \int_{-\infty}^{\infty} dv'\, \exp[-(v'/u)^2]\, \exp[-(v + iKv')\tau].`}</EqBlock>
        <p>
          Doing the velocity integral <Tex>{String.raw`v'`}</Tex> first yields the time form (1); doing the time
          integral <Tex>{String.raw`\tau`}</Tex> first yields the convolution form (2). That they collapse to the same
          object is the equivalence of the two definitions.
        </p>

        <Derivation title="From the double integral (3) to both definitions">
          <Step title="Do the velocity Gaussian first → Eq (1)">
            Hold <Tex>{String.raw`\tau`}</Tex> fixed in Eq.&nbsp;(3). The <Tex>{String.raw`v'`}</Tex>-dependent factors
            are <Tex>{String.raw`e^{-(v'/u)^2}e^{-iK\tau v'}`}</Tex>, a Gaussian with a linear imaginary term:
            <EqBlock>{String.raw`\int_{-\infty}^{\infty} dv'\, e^{-(v'/u)^2} e^{-iK\tau v'} = u\sqrt{\pi}\, e^{-(Ku\tau/2)^2}.`}</EqBlock>
            Multiplying by the prefactor <Tex>{String.raw`iK/\sqrt{\pi}`}</Tex> and the leftover{" "}
            <Tex>{String.raw`e^{-v\tau}`}</Tex> gives{" "}
            <Tex>{String.raw`iKu\,e^{-v\tau - (Ku/2)^2\tau^2}`}</Tex>, integrated over <Tex>{String.raw`\tau`}</Tex>{" "}
            &mdash; exactly Eq.&nbsp;(1).
          </Step>
          <Step title="Do the time integral first → Eq (2)">
            Alternatively integrate over <Tex>{String.raw`\tau`}</Tex> first. The{" "}
            <Tex>{String.raw`\tau`}</Tex>-dependent factor is{" "}
            <Tex>{String.raw`e^{-(v + iKv')\tau}`}</Tex>, which converges because{" "}
            <Tex>{String.raw`\operatorname{Re}v=\gamma>0`}</Tex>:
            <EqBlock>{String.raw`\int_0^\infty d\tau\, e^{-(v + iKv')\tau} = \frac{1}{v + iKv'}.`}</EqBlock>
            What remains is the prefactor times the Gaussian over <Tex>{String.raw`(v+iKv')`}</Tex>, integrated over{" "}
            <Tex>{String.raw`v'`}</Tex> &mdash; exactly Eq.&nbsp;(2), the Voigt form.
          </Step>
        </Derivation>

        <Callout kind="insight" title="One object, two readings">
          Eq.&nbsp;(1) is &ldquo;decay-times-Gaussian, then transform.&rdquo; Eq.&nbsp;(2) is &ldquo;Lorentzian
          convolved with Gaussian.&rdquo; They are the same function because the Fourier transform of a product is the
          convolution of the transforms &mdash; the convolution theorem made physical.
        </Callout>
        <Callout kind="warning" title="Notation collision — read carefully">
          The source prints the complex argument and the velocity integration variable with the <em>same</em> letter{" "}
          <Tex>{String.raw`v`}</Tex>. Keep them separate: the argument <Tex>{String.raw`v = \gamma + i(\omega-\nu)`}</Tex>{" "}
          is fixed, while the integration variable (written here as <Tex>{String.raw`v'`}</Tex>) is the atomic velocity
          being averaged over.
        </Callout>
      </Section>

      <Section title="Table C-1 master sheet: closed form, series, limits, properties">
        <Intuition>
          Before deriving anything, the chapter hands you a one-page cheat sheet collecting every face of{" "}
          <Tex>{String.raw`Z`}</Tex>. It answers the four questions a laser physicist actually asks. Is there a closed
          form I can evaluate? Yes &mdash; an error function of complex argument. What does <Tex>{String.raw`Z`}</Tex>{" "}
          look like near line center, where <Tex>{String.raw`|v/Ku|`}</Tex> is small? A rounded Gaussian core (a smooth
          peak of height <Tex>{String.raw`i\sqrt{\pi}`}</Tex>). What
          about far in the wings? A bare complex Lorentzian. And are there structural identities? Yes &mdash; a
          conjugation symmetry and a first-order ODE. This is the reference spine; the next two sections derive the
          closed form and the limits.
        </Intuition>
        <p>
          The definitions row equates the two integrals with the closed form &mdash; an error function of complex
          argument:
        </p>
        <KeyResult
          eq={String.raw`Z(v) = iKu \int_0^\infty d\tau\, e^{-v\tau - (Ku/2)^2\tau^2} = \frac{iK}{\sqrt{\pi}} \int_{-\infty}^{\infty} dv'\, \frac{e^{-(v'/u)^2}}{v + iKv'} = i\sqrt{\pi}\, e^{(v/Ku)^2}\,[1 + \mathrm{erf}(-v/Ku)]`}
          label="Definitions row (Table C-1)"
          note={
            <>
              The closed form in the <Tex>{String.raw`v`}</Tex>-variable; via{" "}
              <Tex>{String.raw`i\zeta = -v/Ku`}</Tex> this is the <Tex>{String.raw`\zeta`}</Tex>-form of Eq.&nbsp;(5)
              derived next.
            </>
          }
        />
        <p>For small detuning there is a Maclaurin series in <Tex>{String.raw`v/Ku`}</Tex> with closed-form coefficients:</p>
        <EqBlock>{String.raw`Z(v) = i\sum_{n=0}^{\infty} z_n \left(\frac{v}{Ku}\right)^n, \qquad z_{2n} = \frac{2^n \sqrt{\pi}}{(2n)!!}, \qquad z_{2n+1} = -\frac{2^{2n+1}\, n!}{(2n+1)!}.`}</EqBlock>
        <p>
          The limits row records the two extremes. Near line center (<Tex>{String.raw`|v/Ku|\ll1`}</Tex>),
        </p>
        <KeyResult
          number="7"
          eq={String.raw`Z(v) \simeq i\sqrt{\pi}, \qquad |v/Ku| \ll 1,`}
          label="Doppler (Gaussian) limit"
          note="A rounded Gaussian core (a smooth peak of height i√π): the peak gain is the imaginary value i√π; the gain then falls off as a Gaussian √π e^{−Δ²} across the Doppler core, the dispersion small."
        />
        <p>
          In between, when the homogeneous width is small compared with the Doppler width, the imaginary axis carries a
          real Dawson-type correction:
        </p>
        <EqBlock>{String.raw`Z(v) \simeq e^{-\xi^2}\left[i\sqrt{\pi} + 2\int_0^{\xi} dx\, e^{x^2}\right] = i\sqrt{\pi}\, e^{-\xi^2} + 2\,\mathrm{Dawson}(\xi), \qquad \xi = \frac{\omega - \nu}{Ku}, \quad |\gamma/Ku| \ll 1.`}</EqBlock>
        <p>And far in the wings (<Tex>{String.raw`|v/Ku|\gg1`}</Tex>), the bare single-atom Lorentzian:</p>
        <KeyResult
          number="8"
          eq={String.raw`Z(v) \simeq \frac{iKu}{v}, \qquad |v/Ku| \gg 1.`}
          label="Wing (Lorentzian) limit"
          note="The Doppler average washes out; Z is the complex Lorentzian iKu/v of a single damped atom."
        />
        <p>The properties row records two structural identities &mdash; a conjugation symmetry and a first-order ODE:</p>
        <EqBlock label="sym">{String.raw`Z(v^*) = -Z^*(v),`}</EqBlock>
        <EqBlock label="ODE">{String.raw`\frac{dZ(v)}{dv} = \frac{2}{Ku}\left[\frac{v}{Ku}\, Z(v) - i\right].`}</EqBlock>
        <p>
          The ODE is equivalent to the standard plasma-physics relation{" "}
          <Tex>{String.raw`Z'(\zeta) = -2[1 + \zeta Z(\zeta)]`}</Tex> under{" "}
          <Tex>{String.raw`i\zeta = -v/Ku`}</Tex>, and the symmetry is what forces the gain and dispersion to be even and
          odd in detuning.
        </p>

        <Derivation title="Sanity-check the table" defaultOpen={false}>
          <Step title="The power-series coefficients">
            Verify the closed forms reproduce the tabulated values:{" "}
            <Tex>{String.raw`z_0 = 2^0\sqrt{\pi}/0!! = \sqrt{\pi}`}</Tex>;{" "}
            <Tex>{String.raw`z_1 = -2^1\cdot 0!/1! = -2`}</Tex>;{" "}
            <Tex>{String.raw`z_2 = 2\sqrt{\pi}/2 = \sqrt{\pi}`}</Tex>;{" "}
            <Tex>{String.raw`z_3 = -8/6 = -\tfrac43`}</Tex>;{" "}
            <Tex>{String.raw`z_4 = 4\sqrt{\pi}/8 = \sqrt{\pi}/2`}</Tex>:
            <EqBlock>{String.raw`z_0=\sqrt{\pi},\ \ z_1=-2,\ \ z_2=\sqrt{\pi},\ \ z_3=-\tfrac{4}{3},\ \ z_4=\tfrac{\sqrt{\pi}}{2}.`}</EqBlock>
            All match the tabulated values.
          </Step>
          <Step title="Confirm the ODE from the integral">
            Differentiate Eq.&nbsp;(1) under the integral sign:{" "}
            <Tex>{String.raw`dZ/dv = iKu\int_0^\infty (-\tau)\,e^{-v\tau-(Ku/2)^2\tau^2}\,d\tau`}</Tex>. Recognize{" "}
            <Tex>{String.raw`\tau\,e^{-(Ku/2)^2\tau^2}`}</Tex> as proportional to a <Tex>{String.raw`\tau`}</Tex>-derivative
            of the Gaussian and integrate by parts; the boundary terms and the surviving integral reassemble into
            <EqBlock>{String.raw`\frac{dZ}{dv} = \frac{2}{Ku}\left[\frac{v}{Ku}\,Z - i\right],`}</EqBlock>
            reproducing the tabulated ODE. (One can also simply check the closed form Eq.&nbsp;(5) satisfies it.)
          </Step>
        </Derivation>

        <Callout kind="insight" title="Read the table as a map of detuning">
          Small <Tex>{String.raw`|v/Ku|`}</Tex> = near line center = Gaussian, <Tex>{String.raw`Z\to i\sqrt{\pi}`}</Tex>.
          Large <Tex>{String.raw`|v/Ku|`}</Tex> = far wings = Lorentzian, <Tex>{String.raw`Z\to iKu/v`}</Tex>. Everything
          in between is the Voigt interpolation.
        </Callout>
      </Section>

      <Section title="The closed form: Z as an error function of complex argument">
        <Intuition>
          An integral definition is exact but opaque &mdash; you cannot see the lineshape in it. The chapter&rsquo;s
          central computational move turns the time integral (1) into a closed expression built from the error function{" "}
          <Tex>{String.raw`\mathrm{erf}`}</Tex>, now evaluated at a <em>complex</em> argument. The trick is the classic
          Gaussian maneuver: scale time into a dimensionless variable, complete the square in the exponent, and
          recognize the result as a shifted Gaussian integral &mdash; an error function. This is exactly how a Voigt
          profile becomes the Faddeeva function in spectroscopy. The payoff: once you have a closed form you can
          evaluate <Tex>{String.raw`Z`}</Tex> instantly and read off both gain and dispersion for any operating point.
        </Intuition>
        <p>
          Introduce the normalized complex variable <Tex>{String.raw`\zeta`}</Tex> and a dimensionless integration
          variable <Tex>{String.raw`x`}</Tex>, with the Doppler width <Tex>{String.raw`Ku`}</Tex> setting the scale:
        </p>
        <KeyResult
          number="4"
          eq={String.raw`i\zeta = -\frac{v}{Ku}, \qquad x = \frac{Ku\,\tau}{2}.`}
          label="Normalization"
          note={
            <>
              So <Tex>{String.raw`v/Ku=-i\zeta`}</Tex>, hence{" "}
              <Tex>{String.raw`\zeta = iv/Ku = [\,i\gamma - (\omega-\nu)\,]/Ku`}</Tex>:{" "}
              <Tex>{String.raw`\operatorname{Re}\zeta = -(\omega-\nu)/Ku`}</Tex> (normalized detuning) and{" "}
              <Tex>{String.raw`\operatorname{Im}\zeta = \gamma/Ku`}</Tex> (normalized homogeneous width).
            </>
          }
        />
        <p>The closed form follows in three short moves:</p>
        <EqBlock>{String.raw`Z(\zeta) = 2i \int_0^\infty dx\, \exp(2i\zeta x - x^2),`}</EqBlock>
        <EqBlock>{String.raw`Z(\zeta) = 2i \int_0^\infty dx\, \exp\!\left[-(x - i\zeta)^2 - \zeta^2\right] = 2i\, e^{-\zeta^2} \int_{-\infty}^{i\zeta} dx'\, e^{-x'^2}.`}</EqBlock>
        <KeyResult
          number="5"
          eq={String.raw`Z(\zeta) = i\sqrt{\pi}\, e^{-\zeta^2}\,[1 + \mathrm{erf}(i\zeta)]`}
          label="Closed form — the headline result"
          note={
            <>
              Equivalently <Tex>{String.raw`Z = i\sqrt{\pi}\,w(\zeta)`}</Tex> with{" "}
              <Tex>{String.raw`w(\zeta)=e^{-\zeta^2}\mathrm{erfc}(-i\zeta)`}</Tex> the Faddeeva function &mdash; the
              formula you actually compute with.
            </>
          }
        />

        <Derivation title="Derive the closed form (Eq 5)">
          <Step title="Normalize time">
            From Eq.&nbsp;(1), set <Tex>{String.raw`x = Ku\,\tau/2`}</Tex>, so{" "}
            <Tex>{String.raw`d\tau = (2/Ku)dx`}</Tex>, the Gaussian factor becomes{" "}
            <Tex>{String.raw`-x^2`}</Tex>, and{" "}
            <Tex>{String.raw`-v\tau = -2(v/Ku)x = 2i\zeta x`}</Tex> using{" "}
            <Tex>{String.raw`i\zeta=-v/Ku`}</Tex>. The prefactor <Tex>{String.raw`iKu\cdot(2/Ku)=2i`}</Tex>:
            <EqBlock>{String.raw`Z = iKu\!\int_0^\infty\! d\tau\, e^{-v\tau - (Ku/2)^2\tau^2} \;\xrightarrow{x=Ku\tau/2}\; 2i\!\int_0^\infty\! dx\, e^{2i\zeta x - x^2}.`}</EqBlock>
          </Step>
          <Step title="Complete the square">
            Rewrite the exponent as a shifted Gaussian and pull out the <Tex>{String.raw`x`}</Tex>-independent factor{" "}
            <Tex>{String.raw`e^{-\zeta^2}`}</Tex>:
            <EqBlock>{String.raw`2i\zeta x - x^2 = -(x - i\zeta)^2 - \zeta^2.`}</EqBlock>
          </Step>
          <Step title="Shift the contour and identify erf">
            Substitute <Tex>{String.raw`x' = x - i\zeta`}</Tex>; the integral runs from{" "}
            <Tex>{String.raw`-\infty`}</Tex> to the complex point <Tex>{String.raw`i\zeta`}</Tex> (the contour deforms
            with no lost contribution since <Tex>{String.raw`e^{-x'^2}`}</Tex> decays). Split it as{" "}
            <Tex>{String.raw`\int_{-\infty}^{0}+\int_{0}^{i\zeta}`}</Tex>:
            <EqBlock>{String.raw`\int_{-\infty}^{i\zeta} e^{-x'^2}\,dx' = \frac{\sqrt{\pi}}{2}\,[1 + \mathrm{erf}(i\zeta)].`}</EqBlock>
            Multiplying by <Tex>{String.raw`2i\,e^{-\zeta^2}`}</Tex> gives Eq.&nbsp;(5).
          </Step>
        </Derivation>

        <Callout kind="insight" title="Z is the Faddeeva function in disguise">
          <Tex>{String.raw`Z(\zeta) = i\sqrt{\pi}\,w(\zeta)`}</Tex>, where{" "}
          <Tex>{String.raw`w(\zeta) = e^{-\zeta^2}\,\mathrm{erfc}(-i\zeta)`}</Tex> is the Faddeeva function used
          everywhere in spectroscopy to compute Voigt profiles. Recognizing this lets you evaluate{" "}
          <Tex>{String.raw`Z`}</Tex> with a single library call &mdash; which is exactly what the simulation below does.
        </Callout>
        <Callout kind="warning" title="Watch the argument of erf">
          It is <Tex>{String.raw`\mathrm{erf}(i\zeta)`}</Tex> with a <strong>plus</strong> <Tex>{String.raw`i`}</Tex>,
          multiplying the bracket <Tex>{String.raw`[1 + \mathrm{erf}(i\zeta)]`}</Tex>. The book&rsquo;s{" "}
          <Tex>{String.raw`v`}</Tex>-form writes the same thing as <Tex>{String.raw`[1 + \mathrm{erf}(-v/Ku)]`}</Tex>{" "}
          because <Tex>{String.raw`i\zeta = -v/Ku`}</Tex>. Getting this sign right is essential &mdash; it flips the
          dispersion curve.
        </Callout>
      </Section>

      <Section title="Series and limits: Gaussian at center, Lorentzian in the wings">
        <Intuition>
          Now read the curve physically by zooming to its two ends. Near line center the smallness is{" "}
          <Tex>{String.raw`|v/Ku|\ll1`}</Tex>: the field probes the dense Gaussian core of Doppler-shifted atoms, and{" "}
          <Tex>{String.raw`Z`}</Tex> peaks at the imaginary value <Tex>{String.raw`i\sqrt{\pi}`}</Tex> &mdash;
          maximal gain, flat only in the immediate vicinity of line center, then falling off as a Gaussian{" "}
          <Tex>{String.raw`\sqrt{\pi}\,e^{-\Delta^2}`}</Tex> across the Doppler core. Far in the wings,{" "}
          <Tex>{String.raw`|v/Ku|\gg1`}</Tex>, so few
          atoms are Doppler-shifted that far; the Gaussian average becomes irrelevant and <Tex>{String.raw`Z`}</Tex>{" "}
          collapses to the bare single-atom complex Lorentzian <Tex>{String.raw`iKu/v`}</Tex>. So{" "}
          <Tex>{String.raw`Z`}</Tex> literally interpolates between a Gaussian (center) and a Lorentzian (wings)
          &mdash; the definition of a Voigt profile, and the reason the appendix is subtitled the &ldquo;Hilbert
          transform of the Gaussian.&rdquo;
        </Intuition>
        <p>
          The convenient numerical form for <Tex>{String.raw`|v/Ku|<1`}</Tex> comes from expanding the decaying
          exponential in Eq.&nbsp;(1) (after <Tex>{String.raw`x=Ku\tau/2`}</Tex>) and integrating term by term against
          the Gaussian:
        </p>
        <EqBlock>{String.raw`Z(v) = 2i\sum_{n=0}^{\infty} \frac{1}{n!}\left(-\frac{2v}{Ku}\right)^{n} \int_0^\infty dx\, x^{n} e^{-x^2}.`}</EqBlock>
        <p>Splitting into even and odd powers exposes the two families of moment integrals:</p>
        <EqBlock>{String.raw`Z(v) = 2i\sum_{n=0}^{\infty}\left[\frac{1}{(2n)!}\left(\frac{2v}{Ku}\right)^{2n}\!\!\int_0^\infty\! dx\, x^{2n}e^{-x^2} + \frac{1}{(2n+1)!}\left(-\frac{2v}{Ku}\right)^{2n+1}\!\!\int_0^\infty\! dx\, x^{2n+1}e^{-x^2}\right].`}</EqBlock>
        <KeyResult
          number="6"
          eq={String.raw`Z(v) = i\sum_{n=0}^{\infty}\left[\frac{2^n\sqrt{\pi}}{(2n)!!}\left(\frac{v}{Ku}\right)^{2n} - \frac{2^{2n+1}n!}{(2n+1)!}\left(\frac{v}{Ku}\right)^{2n+1}\right] = i\sum_{n=0}^{\infty} z_n\left(\frac{v}{Ku}\right)^{n}`}
          label="Power series"
          note={
            <>
              Even-order coefficients <Tex>{String.raw`z_{2n}=2^n\sqrt{\pi}/(2n)!!`}</Tex> carry the{" "}
              <Tex>{String.raw`\sqrt{\pi}`}</Tex> Gaussian heritage (the gain); odd-order{" "}
              <Tex>{String.raw`z_{2n+1}=-2^{2n+1}n!/(2n+1)!`}</Tex> are rational (the dispersion).
            </>
          }
        />
        <p>Keeping only the leading term gives the center limit; letting the Doppler width vanish gives the wing limit:</p>
        <EqBlock label="7">{String.raw`Z(v)\big|_{|v/Ku|\ll1} \simeq i\sqrt{\pi}, \qquad\qquad Z(v)\big|_{Ku\to0} \to \frac{iKu}{v}.`}</EqBlock>

        <Derivation title="Build the series and take the limits">
          <Step title="Expand Eq (1)">
            In the <Tex>{String.raw`x=Ku\tau/2`}</Tex> variable,{" "}
            <Tex>{String.raw`Z = 2i\int_0^\infty e^{-2(v/Ku)x - x^2}\,dx`}</Tex>. Taylor-expand the first exponential and
            interchange sum and integral:
            <EqBlock>{String.raw`e^{-2(v/Ku)x} = \sum_{n=0}^\infty \frac{1}{n!}\left(-\frac{2v}{Ku}\right)^n x^n.`}</EqBlock>
          </Step>
          <Step title="Evaluate the Gaussian moments">
            Use the standard half-line moments
            <EqBlock>{String.raw`\int_0^\infty x^{2n}e^{-x^2}dx = \frac{(2n-1)!!\,\sqrt{\pi}}{2^{n+1}}, \qquad \int_0^\infty x^{2n+1}e^{-x^2}dx = \frac{n!}{2}.`}</EqBlock>
            Simplifying the factorials yields <Tex>{String.raw`z_{2n}=2^n\sqrt{\pi}/(2n)!!`}</Tex> and{" "}
            <Tex>{String.raw`z_{2n+1}=-2^{2n+1}n!/(2n+1)!`}</Tex>, hence Eq.&nbsp;(6).
          </Step>
          <Step title="Take center and wing limits">
            <strong>Center:</strong> for <Tex>{String.raw`|v/Ku|\ll1`}</Tex> keep <Tex>{String.raw`n=0`}</Tex>, giving{" "}
            <Tex>{String.raw`Z\simeq i z_0 = i\sqrt{\pi}`}</Tex> (Eq.&nbsp;7). <strong>Wing:</strong> in Eq.&nbsp;(1) as{" "}
            <Tex>{String.raw`Ku\to0`}</Tex> the Gaussian factor <Tex>{String.raw`e^{-(Ku/2)^2\tau^2}\to1`}</Tex>, so
            <EqBlock>{String.raw`Z \to iKu\int_0^\infty e^{-v\tau}d\tau = \frac{iKu}{v}`}</EqBlock>
            (Eq.&nbsp;8) &mdash; the bare Lorentzian.
          </Step>
        </Derivation>

        <Figure
          caption={
            <>
              <strong>Fig.&nbsp;C-2.</strong> A Lorentzian and a Gaussian of equal width <em>and</em> equal area look
              alike near center, but the Lorentzian carries far more area in its slowly-decaying wings. The wings are
              where the homogeneous (Lorentzian) character of the Voigt profile lives.
            </>
          }
        >
          <svg viewBox="0 0 520 240" width="100%" style={{ maxWidth: 520 }}>
            {/* axes */}
            <line x1="40" y1="200" x2="500" y2="200" stroke="#9aa3b2" strokeWidth="1.2" />
            <line x1="270" y1="20" x2="270" y2="200" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
            <text x="270" y="218" fontSize="11" fill="#5b6473" textAnchor="middle">
              line center
            </text>
            <text x="490" y="218" fontSize="11" fill="#5b6473" textAnchor="middle">
              detuning
            </text>
            {/* Gaussian: peak at center, decays fast. y = 180*exp(-ln2*((x-270)/45)^2) */}
            <path
              d={(() => {
                const pts: string[] = [];
                for (let i = 0; i <= 100; i++) {
                  const x = 40 + (460 * i) / 100;
                  const u = (x - 270) / 45;
                  const y = 200 - 175 * Math.exp(-Math.LN2 * u * u);
                  pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
                }
                return pts.join(" ");
              })()}
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.4"
            />
            {/* Lorentzian: same HWHM=45, equal area => lower peak. y = peakL/(1+u^2) */}
            <path
              d={(() => {
                const pts: string[] = [];
                // equal area & equal HWHM: peak_L/peak_G = sqrt(ln2/pi)*pi / 1 ... use ~0.66 of gaussian peak
                const peakL = 175 * 0.66;
                for (let i = 0; i <= 100; i++) {
                  const x = 40 + (460 * i) / 100;
                  const u = (x - 270) / 45;
                  const y = 200 - peakL / (1 + u * u);
                  pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
                }
                return pts.join(" ");
              })()}
              fill="none"
              stroke="#e11d48"
              strokeWidth="2.4"
            />
            {/* wing-area shading hint */}
            <text x="455" y="150" fontSize="11" fill="#e11d48" textAnchor="middle">
              Lorentzian
            </text>
            <text x="455" y="166" fontSize="11" fill="#e11d48" textAnchor="middle">
              wings
            </text>
            <text x="300" y="40" fontSize="12" fill="#16a34a">
              Gaussian
            </text>
            <text x="300" y="80" fontSize="12" fill="#e11d48">
              Lorentzian
            </text>
          </svg>
        </Figure>

        <Callout kind="insight" title="Voigt = Gaussian core + Lorentzian wings">
          The same function is Gaussian where atoms are plentiful (center) and Lorentzian where they are not (wings).
          For equal width and area, the Lorentzian wings hold far more area than the Gaussian&rsquo;s &mdash; so the
          wing region is where the homogeneous (Lorentzian) character shows up.
        </Callout>
        <Callout kind="warning" title="No sigma branch factor here">
          Some plasma-physics references attach a piecewise factor (<Tex>{String.raw`\sigma = 0,1,2`}</Tex>) to the{" "}
          <Tex>{String.raw`i\sqrt{\pi}\,e^{-\zeta^2}`}</Tex> term depending on{" "}
          <Tex>{String.raw`\operatorname{Im}\zeta`}</Tex>. This appendix does <strong>not</strong> use that convention;
          the wing behavior is captured entirely by Eq.&nbsp;(8). Do not import the <Tex>{String.raw`\sigma`}</Tex>{" "}
          factor.
        </Callout>
      </Section>

      <Section title="Reading the lineshape: dispersion vs. gain, and the figures">
        <Intuition>
          Finally, connect <Tex>{String.raw`Z`}</Tex> to what a laser physicist measures. Split it into real and
          imaginary parts as functions of the normalized detuning <Tex>{String.raw`\Delta=(\omega-\nu)/Ku`}</Tex> at
          fixed homogeneous width. The <strong>imaginary part</strong> <Tex>{String.raw`Z_i`}</Tex> is the
          gain/absorption lineshape &mdash; a symmetric peak, Gaussian-cored with Lorentzian wings &mdash; that sets how
          much the medium amplifies at each frequency. The <strong>real part</strong>{" "}
          <Tex>{String.raw`Z_r`}</Tex> is the dispersion &mdash; an antisymmetric S-curve that bends the refractive
          index and pulls the laser cavity modes. That gain and dispersion are the even and odd parts of one analytic
          function is a Kramers&ndash;Kronig / Hilbert-transform statement: you cannot have the gain peak without the
          accompanying dispersion.
        </Intuition>
        <p>The complex argument decomposes into the homogeneous decay rate and the detuning,</p>
        <KeyResult
          eq={String.raw`v = \gamma + i(\omega - \nu),`}
          label="Complex argument"
          note={
            <>
              <Tex>{String.raw`\gamma`}</Tex> is the homogeneous (Lorentzian) decay rate;{" "}
              <Tex>{String.raw`(\omega-\nu)`}</Tex> the detuning of the field from line center. This identification is
              what makes <Tex>{String.raw`Z_r`}</Tex> the dispersion and <Tex>{String.raw`Z_i`}</Tex> the gain.
            </>
          }
        />
        <p>and the normalized variable splits its real and imaginary parts cleanly:</p>
        <EqBlock>{String.raw`\zeta = \frac{iv}{Ku} = \frac{i\gamma - (\omega-\nu)}{Ku}, \qquad \mathrm{Re}\,\zeta = -\frac{\omega-\nu}{Ku}, \quad \mathrm{Im}\,\zeta = \frac{\gamma}{Ku}.`}</EqBlock>
        <KeyResult
          eq={String.raw`Z = Z_r + iZ_i, \qquad Z_r(\omega-\nu)\ \text{antisymmetric (dispersion)}, \quad Z_i(\omega-\nu)\ \text{symmetric (gain)}.`}
          label="Decomposition (Fig C-1)"
          note="Zr and Zi are Hilbert transforms of each other — they always come together."
        />

        <Derivation title="Why Z_r is odd and Z_i is even in detuning" defaultOpen={false}>
          <Step title="Use the conjugation symmetry">
            At fixed <Tex>{String.raw`\gamma`}</Tex>, flipping the detuning sign sends{" "}
            <Tex>{String.raw`v = \gamma + i(\omega-\nu)`}</Tex> to its conjugate{" "}
            <Tex>{String.raw`v^* = \gamma - i(\omega-\nu)`}</Tex>. The property{" "}
            <Tex>{String.raw`Z(v^*) = -Z^*(v)`}</Tex> then reads
            <EqBlock>{String.raw`Z_r(-\delta) + iZ_i(-\delta) = -\big(Z_r(\delta) - iZ_i(\delta)\big) = -Z_r(\delta) + iZ_i(\delta).`}</EqBlock>
          </Step>
          <Step title="Match real and imaginary parts">
            Matching parts gives <Tex>{String.raw`Z_r(-\delta) = -Z_r(\delta)`}</Tex> (odd dispersion) and{" "}
            <Tex>{String.raw`Z_i(-\delta) = +Z_i(\delta)`}</Tex> (even gain) &mdash; exactly the symmetry of
            Fig.&nbsp;C-1:
            <EqBlock>{String.raw`Z(v^*) = -Z^*(v) \;\Rightarrow\; Z_r\ \text{odd},\ \ Z_i\ \text{even}.`}</EqBlock>
          </Step>
        </Derivation>

        <SimFrame
          title="The Voigt lineshape: gain and dispersion of a Doppler-broadened line"
          caption={
            <>
              The simulation drives the closed form{" "}
              <Tex>{String.raw`Z(\zeta) = i\sqrt{\pi}\,e^{-\zeta^2}[1+\mathrm{erf}(i\zeta)]`}</Tex> (the Faddeeva
              function) along real detuning at fixed normalized homogeneous width{" "}
              <Tex>{String.raw`\gamma/Ku = \operatorname{Im}\zeta`}</Tex>, reproducing Fig.&nbsp;C-1. Top panel:{" "}
              <Tex>{String.raw`Z_r`}</Tex> (dispersion, antisymmetric). Bottom panel: <Tex>{String.raw`Z_i`}</Tex>{" "}
              (gain, symmetric).
            </>
          }
          tryThis={
            <>
              Set <Tex>{String.raw`\gamma/Ku=0`}</Tex> and switch the overlay to <em>Gaussian (Eq 7)</em>: the gain curve
              lies <em>exactly</em> on the Gaussian <Tex>{String.raw`\sqrt{\pi}\,e^{-\Delta^2}`}</Tex>, and the peak is
              <Tex>{String.raw`\,Z_i(0)=\sqrt{\pi}\approx1.77`}</Tex>. Now drag <Tex>{String.raw`\gamma/Ku`}</Tex> up:
              the gain peak broadens and drops, the dispersion S-curve softens, and the wings fill out toward the{" "}
              <em>Lorentzian (Eq 8)</em> overlay. Switch to <em>Fig C-2</em> to see why &mdash; the Lorentzian carries
              far more wing area for the same width and area.
            </>
          }
        >
          <AppCSim />
        </SimFrame>

        <Callout kind="insight" title="Gain and dispersion are one function">
          <Tex>{String.raw`Z_i`}</Tex> (gain) and <Tex>{String.raw`Z_r`}</Tex> (dispersion) are the even and odd parts
          of a single analytic <Tex>{String.raw`Z`}</Tex> &mdash; Hilbert transforms of each other. The medium cannot
          amplify without bending the refractive index; that is why mode-pulling and gain are inseparable in gas lasers.
        </Callout>
        <Callout kind="note" title="Fig C-1 parameters">
          The book&rsquo;s figure plots <Tex>{String.raw`Z_r`}</Tex> (top) and <Tex>{String.raw`Z_i`}</Tex> (bottom)
          versus detuning <Tex>{String.raw`\Delta`}</Tex> over <Tex>{String.raw`-1024`}</Tex> to{" "}
          <Tex>{String.raw`1024`}</Tex>, for homogeneous widths{" "}
          <Tex>{String.raw`\gamma = 0, 50, 100, 250, 500, 1024`}</Tex> at fixed <Tex>{String.raw`Ku = 1024`}</Tex> (so{" "}
          <Tex>{String.raw`\gamma/Ku`}</Tex> runs <Tex>{String.raw`0`}</Tex> to <Tex>{String.raw`1`}</Tex>). Magnitudes
          decrease as <Tex>{String.raw`\gamma`}</Tex> grows &mdash; more damping means a broader, lower Voigt profile.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep">
          <ul>
            <li>
              <strong><Tex>{String.raw`Z(v)`}</Tex> is the complex lineshape</strong> of a Doppler-broadened,
              homogeneously damped gas laser transition: <Tex>{String.raw`\operatorname{Im}Z`}</Tex> is gain/absorption,{" "}
              <Tex>{String.raw`\operatorname{Re}Z`}</Tex> is dispersion (refractive index / mode-pulling). When
              Chapter&nbsp;X writes susceptibility in terms of <Tex>{String.raw`Z`}</Tex>, this is what it means.
            </li>
            <li>
              <strong>The argument</strong> is <Tex>{String.raw`v = \gamma + i(\omega-\nu)`}</Tex> (homogeneous decay
              rate + detuning); normalized, <Tex>{String.raw`\zeta = iv/Ku`}</Tex> with{" "}
              <Tex>{String.raw`\operatorname{Re}\zeta = -(\omega-\nu)/Ku`}</Tex> and{" "}
              <Tex>{String.raw`\operatorname{Im}\zeta = \gamma/Ku`}</Tex>.
            </li>
            <li>
              <strong>The headline closed form to memorize:</strong>{" "}
              <Tex>{String.raw`Z = i\sqrt{\pi}\,e^{-\zeta^2}[1 + \mathrm{erf}(i\zeta)] = i\sqrt{\pi}\,w(\zeta)`}</Tex>,
              the Faddeeva function &mdash; how you actually evaluate or code <Tex>{String.raw`Z`}</Tex>.
            </li>
            <li>
              <strong>Two limits to recognize instantly:</strong> near center{" "}
              <Tex>{String.raw`Z\to i\sqrt{\pi}`}</Tex> (rounded Gaussian core, peak gain <Tex>{String.raw`i\sqrt{\pi}`}</Tex>); in the wings{" "}
              <Tex>{String.raw`Z\to iKu/v`}</Tex> (complex Lorentzian, single-atom response).{" "}
              <Tex>{String.raw`Z`}</Tex> is a Voigt profile interpolating between them.
            </li>
            <li>
              <strong>Hilbert transform of a Gaussian:</strong> gain and dispersion are even/odd parts of one analytic
              function (Kramers&ndash;Kronig), so they always come together &mdash; no gain without mode-pulling.
            </li>
            <li>
              <strong>Two identities for derivations:</strong> the symmetry{" "}
              <Tex>{String.raw`Z(v^*) = -Z^*(v)`}</Tex> and the ODE{" "}
              <Tex>{String.raw`dZ/dv = (2/Ku)[(v/Ku)Z - i]`}</Tex> (i.e.{" "}
              <Tex>{String.raw`Z'(\zeta) = -2[1 + \zeta Z]`}</Tex>).
            </li>
            <li>
              <strong>Series coefficients</strong> for small detuning:{" "}
              <Tex>{String.raw`z_0=\sqrt{\pi},\,z_1=-2,\,z_2=\sqrt{\pi},\,z_3=-\tfrac43,\,z_4=\tfrac{\sqrt{\pi}}{2}`}</Tex>;
              for large detuning a continued fraction (Fried &amp; Conte, 1961) is preferred.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
