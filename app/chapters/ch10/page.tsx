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
import Ch10Sim from "@/components/sims/ch10";

export default function Page() {
  return (
    <Lesson slug="ch10">
      <Lede>
        In a gas the atoms do not sit still — they zip around at thermal speeds, and each one Doppler-shifts the light it
        sees by <Tex>{String.raw`Kv`}</Tex>, the projection of its velocity onto the cavity axis. A standing-wave cavity
        is <em>two</em> counter-running waves, so a single atom is hit by two Doppler-shifted frequencies at once. Stop
        pretending the medium is one homogeneous oscillator (Chapters VIII–IX) and average instead over the
        Maxwell–Boltzmann velocity distribution, and you uncover one of the most beautiful effects in laser physics: the{" "}
        <strong>Lamb dip</strong> — a sharp, natural-linewidth notch in the output power exactly at line center, the
        workhorse of laser frequency stabilization.
      </Lede>

      <Section title="Why gas lasers are different: Doppler motion and velocity averaging">
        <Intuition>
          Chapters VIII–IX treated a <em>homogeneously</em> broadened medium of stationary atoms — every atom is the
          same oscillator. In a gas the atoms move, and the dominant broadening is{" "}
          <em>inhomogeneous</em>: the Doppler effect. An atom with axial velocity <Tex>{String.raw`v`}</Tex> sees the
          lab frequency <Tex>{String.raw`\omega`}</Tex> shifted to <Tex>{String.raw`\omega+Kv`}</Tex> (or{" "}
          <Tex>{String.raw`\omega-Kv`}</Tex> for the oppositely-directed wave), so different atoms resonate at different
          effective frequencies. The naive recipe — compute the susceptibility for stationary atoms, then average the
          polarization over the velocity distribution — is fine for a <em>traveling</em> wave (one shift per atom). But
          the laser cavity holds a standing wave, and each atom is simultaneously up-shifted by one wave and
          down-shifted by the other. That double exposure is the seed of the Lamb dip.
        </Intuition>
        <p>
          The central move of the whole chapter is to write the macroscopic polarization as a velocity (frequency)
          average of the single-atom, homogeneous polarization:
        </p>
        <KeyResult
          number="1"
          eq={String.raw`\mathscr{P}_m(t) = \int_{-\infty}^{\infty} d\omega\; W(\omega)\, \mathscr{P}_\omega(\omega, t)`}
          label="Velocity-averaged polarization"
          note={
            <>
              The macroscopic polarization is the homogeneous single-atom polarization weighted by the
              frequency-distribution <Tex>{String.raw`W(\omega)`}</Tex> that comes from the velocity distribution.
            </>
          }
        />
        <p>
          The velocity distribution is Maxwell–Boltzmann; mapped to frequency through{" "}
          <Tex>{String.raw`\omega=\omega_0+Kv`}</Tex> it is a Gaussian centered on the line center{" "}
          <Tex>{String.raw`\omega_0`}</Tex> with <Tex>{String.raw`1/e`}</Tex> half-width{" "}
          <Tex>{String.raw`Ku`}</Tex> (the Doppler width; <Tex>{String.raw`K`}</Tex> the wavenumber,{" "}
          <Tex>{String.raw`u`}</Tex> the most-probable speed):
        </p>
        <EqBlock label="2">{String.raw`W(\omega) = (\sqrt{\pi}\,Ku)^{-1} \exp\!\left[-(\omega-\omega_0)^2/(Ku)^2\right]`}</EqBlock>
        <p>Written directly in axial velocity <Tex>{String.raw`v`}</Tex> — the form the simulation integrates over:</p>
        <EqBlock label="2′">{String.raw`W(v) = (\sqrt{\pi}\,u)^{-1} \exp\!\left[-(v/u)^2\right]`}</EqBlock>

        <Derivation title="From velocity to frequency, and why a standing wave needs care">
          <Step title="From velocity to frequency shift">
            An atom with axial velocity <Tex>{String.raw`v`}</Tex> sees the field Doppler-shifted by{" "}
            <Tex>{String.raw`Kv`}</Tex>. Setting <Tex>{String.raw`\omega = \omega_0 + Kv`}</Tex> maps the Maxwellian
            velocity distribution onto the Gaussian frequency distribution <Tex>{String.raw`W(\omega)`}</Tex>. The
            change of variables <Tex>{String.raw`d\omega = K\,dv`}</Tex> carries the normalization, giving the two
            equivalent forms of Eq. (2).
          </Step>
          <Step title="Why a standing wave needs special care">
            Decompose the cavity standing wave into two oppositely directed running waves of equal amplitude. Each atom
            is up-shifted by one and down-shifted by the other, so a single atom experiences an amplitude-modulated
            field carrying two frequencies. The simple traveling-wave average (Eq. 1) is therefore{" "}
            <em>not</em> sufficient for the standing-wave laser; one must track the velocity{" "}
            <Tex>{String.raw`v`}</Tex> and the position <Tex>{String.raw`z = z_0 + v(t-t_0)`}</Tex> together — the
            convective treatment of the next section.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Inhomogeneous vs homogeneous">
          Doppler broadening is <em>inhomogeneous</em>: each velocity class is a distinct narrow oscillator. Hole
          burning and the Lamb dip are <strong>impossible</strong> in a purely homogeneous medium.
        </Callout>
        <Callout kind="warning" title="One shift vs two">
          Traveling wave: one Doppler shift, the average is trivial. Standing wave: two shifts per atom, and the average
          produces the dip. Keep this distinction front and center for the whole chapter.
        </Callout>
      </Section>

      <Section title="Density-matrix foundation: the convective derivative">
        <Intuition>
          Because atoms move, the polarization at a fixed point <Tex>{String.raw`z`}</Tex> and time{" "}
          <Tex>{String.raw`t`}</Tex> is built from atoms excited at earlier positions <Tex>{String.raw`z'`}</Tex> and
          times <Tex>{String.raw`t'`}</Tex>. Label each atom by where and when it entered a state and follow it along
          its free-flight trajectory <Tex>{String.raw`z = z_0 + v(t-t_0)`}</Tex>. The one fact to remember: for a moving
          atom the total time-rate of change is the <strong>convective (material) derivative</strong>{" "}
          <Tex>{String.raw`\partial/\partial t + v\,\partial/\partial z`}</Tex>, not just{" "}
          <Tex>{String.raw`\partial/\partial t`}</Tex>. With that one substitution the density-matrix equations keep
          exactly the Chapter VIII form.
        </Intuition>
        <p>
          The macroscopic density matrix sums over all atoms excited into a state{" "}
          <Tex>{String.raw`a`}</Tex> at <Tex>{String.raw`(z_0,t_0)`}</Tex> with velocity{" "}
          <Tex>{String.raw`v`}</Tex>, the delta function enforcing free flight (<Tex>{String.raw`\lambda_a`}</Tex> is the
          pump rate):
        </p>
        <EqBlock label="6">{String.raw`\rho(z, v, t) = \sum_a \int_{-\infty}^{t} dt_0 \int_{0}^{L} dz_0\; \lambda_a(z_0, t_0, v)\, \rho(a, z_0, t_0, v, t)\,\delta(z - z_0 - v\,t + v t_0)`}</EqBlock>
        <p>
          Differentiating along a trajectory turns the ordinary time derivative into the convective one, and the matrix
          equation of motion is the stationary-atom result with that replacement and a pump source{" "}
          <Tex>{String.raw`\mathrm{diag}(\lambda_a,\lambda_b)`}</Tex>:
        </p>
        <KeyResult
          number="7"
          eq={String.raw`\left(\frac{\partial}{\partial t} + v\frac{\partial}{\partial z}\right)\rho(z, t) = \begin{pmatrix} \lambda_a & 0 \\ 0 & \lambda_b \end{pmatrix} + \dots`}
          label="Convective equation of motion (with pump source)"
        />
        <p>
          The field couples the levels through the interaction matrix element — a sum over cavity modes{" "}
          <Tex>{String.raw`n`}</Tex> of amplitude <Tex>{String.raw`E_n`}</Tex>, frequency{" "}
          <Tex>{String.raw`\nu_n`}</Tex>, phase <Tex>{String.raw`\phi_n`}</Tex>, and spatial mode function{" "}
          <Tex>{String.raw`U_n(z')`}</Tex> (<Tex>{String.raw`\wp`}</Tex> the dipole matrix element):
        </p>
        <EqBlock label="8">{String.raw`\mathscr{V}_{ab}(t') = -\tfrac{1}{2}\wp\sum_n E_n(t')\exp[-i(\nu_n t' + \phi_n)]\,U_n(z')`}</EqBlock>
        <p>
          Everywhere a moving atom&rsquo;s history is needed, the position is replaced by its earlier value on the
          trajectory:
        </p>
        <EqBlock label="9">{String.raw`z' = z - v(t - t')`}</EqBlock>
        <p>The three equations of motion then read (coherence, upper population, lower population):</p>
        <EqBlock label="10">{String.raw`\left(\frac{\partial}{\partial t} + v\frac{\partial}{\partial z}\right)\rho_{ab} = -(i\omega + \gamma)\rho_{ab} + \frac{i}{\hbar}\,\mathscr{V}_{ab}(z, t)\,(\rho_{aa} - \rho_{bb})`}</EqBlock>
        <EqBlock label="11">{String.raw`\left(\frac{\partial}{\partial t} + v\frac{\partial}{\partial z}\right)\rho_{aa} = \lambda_a - \gamma_a \rho_{aa} - \left[\frac{i}{\hbar}\,\mathscr{V}_{ab}\rho_{ba} + \text{c.c.}\right]`}</EqBlock>
        <EqBlock label="12">{String.raw`\left(\frac{\partial}{\partial t} + v\frac{\partial}{\partial z}\right)\rho_{bb} = \lambda_b - \gamma_b \rho_{bb} + \left[\frac{i}{\hbar}\,\mathscr{V}_{ab}\rho_{ba} + \text{c.c.}\right]`}</EqBlock>
        <p>
          The polarization component oscillating at mode frequency <Tex>{String.raw`\nu_n`}</Tex> is obtained by
          projecting <Tex>{String.raw`\rho_{ab}`}</Tex> onto the mode function and averaging over length and velocity
          (<Tex>{String.raw`\mathscr{N}`}</Tex> the normalization):
        </p>
        <EqBlock label="13">{String.raw`\mathscr{P}_\nu(t) = 2\,\wp\,\exp[i(\nu_n t + \phi_n)]\int_{-\infty}^{\infty} dv\,\frac{1}{\mathscr{N}}\int_{0}^{L} dz\; U_n^*(z)\,\rho_{ab}(z, v, t)`}</EqBlock>

        <Derivation title="Where the convective derivative comes from">
          <Step title="Label atoms by their birth event">
            Tag each atom by its excitation position <Tex>{String.raw`z_0`}</Tex>, time{" "}
            <Tex>{String.raw`t_0`}</Tex>, and velocity <Tex>{String.raw`v`}</Tex>. Integrating the single-atom density
            matrix over these labels with the trajectory delta function (Eq. 6) gives the macroscopic{" "}
            <Tex>{String.raw`\rho(z,v,t)`}</Tex>.
          </Step>
          <Step title="Differentiate along the path">
            Taking <Tex>{String.raw`d/dt`}</Tex> of <Tex>{String.raw`\rho(z(t),t)`}</Tex> along an atom&rsquo;s path
            gives <Tex>{String.raw`\partial\rho/\partial t + (dz/dt)\,\partial\rho/\partial z = (\partial/\partial t + v\,\partial/\partial z)\rho`}</Tex>
            . Because the stationary equations were written with <Tex>{String.raw`d/dt`}</Tex>, the moving-atom
            equations follow by the single substitution{" "}
            <Tex>{String.raw`d/dt \to \partial/\partial t + v\,\partial/\partial z`}</Tex>.
          </Step>
          <Step title="Formal integration along trajectories">
            Equations (10)–(12) are first-order linear ODEs along each trajectory. Integrating{" "}
            <Tex>{String.raw`\rho_{ab}`}</Tex> back to the excitation time gives it as a time integral of the driving
            field weighted by <Tex>{String.raw`\exp[-(i\omega+\gamma)(t-t')]`}</Tex>, with{" "}
            <Tex>{String.raw`z' = z - v(t-t')`}</Tex> — the launch point for both the rate-equation and strong-signal
            treatments.
          </Step>
        </Derivation>

        <Callout kind="insight" title="The one substitution to remember">
          Moving atoms = stationary-atom equations with{" "}
          <Tex>{String.raw`d/dt \to \partial/\partial t + v\,\partial/\partial z`}</Tex>. Everything else is bookkeeping
          over velocity and excitation history. This trick recurs in every gas-laser and Doppler-spectroscopy
          calculation.
        </Callout>
        <Callout kind="note" title="Two-level reduction">
          Only the <Tex>{String.raw`a\leftrightarrow b`}</Tex> lasing transition is kept:{" "}
          <Tex>{String.raw`\rho_{ab}`}</Tex> carries the polarization, <Tex>{String.raw`\rho_{aa}-\rho_{bb}`}</Tex> the
          gain. The field couples them through <Tex>{String.raw`\mathscr{V}_{ab}`}</Tex>.
        </Callout>
      </Section>

      <Section title="Rate-equation solution and hole burning: the two Bennett holes">
        <Intuition>
          In the rate-equation approximation the coherence follows the field adiabatically, leaving simple rate
          equations for the populations. The new physics is <strong>hole burning</strong> in velocity space. The two
          running waves of the standing field are Doppler-shifted, in the atom&rsquo;s frame, to{" "}
          <Tex>{String.raw`\omega\mp Kv`}</Tex>. An atom resonates when its shifted frequency matches the laser, i.e.
          for the velocity class <Tex>{String.raw`v\approx\pm(\omega-\nu_n)/K`}</Tex>. So <em>off</em> line center the
          two waves saturate two <em>different</em> velocity groups — the two <strong>Bennett holes</strong>. {" "}
          <em>On</em> line center (<Tex>{String.raw`\omega=\nu_n`}</Tex>) both holes coincide at{" "}
          <Tex>{String.raw`v=0`}</Tex> and the two waves compete for one group.
        </Intuition>
        <p>
          The generic rate equation is the convective derivative of a population quantity set equal to a relaxation
          source <Tex>{String.raw`g`}</Tex>, solved formally by integrating along the trajectory:
        </p>
        <EqBlock label="14">{String.raw`\left(\frac{\partial}{\partial t} + v\frac{\partial}{\partial z}\right) f(z, v, t) = g(z, v, t)`}</EqBlock>
        <EqBlock label="15">{String.raw`f(z, v, t) = \int_{-\infty}^{t} dt'\; g(z', v, t'),\qquad z' = z - v(t - t')`}</EqBlock>
        <p>
          The rate-equation coherence is driven by the two running waves through two complex Lorentzian denominators{" "}
          <Tex>{String.raw`\mathscr{D}(x)=1/(\gamma+ix)`}</Tex>, displaced by <Tex>{String.raw`\mp Kv`}</Tex> — the
          two-hole structure already visible:
        </p>
        <EqBlock label="19">{String.raw`\rho_{ab} = -\tfrac{1}{4}\,i\,\frac{\wp}{\hbar}\,E_n e^{-i(\nu_n t + \phi_n)}U_n(z)\,(\rho_{aa} - \rho_{bb})\big[\mathscr{D}(\omega - \nu_n - Kv) + \mathscr{D}(\omega - \nu_n + Kv)\big]`}</EqBlock>
        <p>
          Slaving this into the population equations gives rate equations with a velocity-dependent stimulated rate{" "}
          <Tex>{String.raw`R(v)`}</Tex>:
        </p>
        <EqBlock label="20">{String.raw`\dot{\rho}_{aa} = -\gamma_a \rho_{aa} + \lambda_a - R(v)(\rho_{aa} - \rho_{bb})`}</EqBlock>
        <KeyResult
          number="21"
          eq={String.raw`R(v) = \tfrac{1}{8}\left(\frac{\wp E_n}{\hbar}\right)^2 \gamma^{-1}\big[\mathscr{L}(\omega - \nu_n - Kv) + \mathscr{L}(\omega - \nu_n + Kv)\big]`}
          label="The central rate constant — two Bennett holes"
          note={
            <>
              Two real Lorentzians <Tex>{String.raw`\mathscr{L}`}</Tex>, one per running wave, displaced symmetrically by{" "}
              <Tex>{String.raw`\pm Kv`}</Tex>. This double-peaked <Tex>{String.raw`R(v)`}</Tex> is the mathematical
              statement of the two holes and the seed of the Lamb dip.
            </>
          }
        />
        <p>
          The Lorentzian itself has half-width <Tex>{String.raw`\gamma`}</Tex> (the homogeneous/natural width); the
          standing-wave averaging factor <Tex>{String.raw`\tfrac12`}</Tex> is already folded into{" "}
          <Tex>{String.raw`R(v)`}</Tex>:
        </p>
        <EqBlock label="21′">{String.raw`\mathscr{L}(\Delta\omega) = \gamma^2/[\gamma^2 + (\Delta\omega)^2]`}</EqBlock>
        <p>Solving the steady-state rate equations gives the saturated population difference per velocity class:</p>
        <KeyResult
          number="22"
          eq={String.raw`\rho_{aa} - \rho_{bb} = \frac{N(z, v, t)}{1 + R(v)/R_s}`}
          label="Saturated population difference with two Bennett holes"
          note={
            <>
              <Tex>{String.raw`N`}</Tex> is the unsaturated difference; the denominator{" "}
              <Tex>{String.raw`1+R(v)/R_s`}</Tex> is the saturation factor. Where{" "}
              <Tex>{String.raw`R(v)`}</Tex> is large — inside a hole — the difference is depleted. This is one of the
              chapter&rsquo;s central results.
            </>
          }
        />
        <p>
          The unsaturated difference is just pump-over-decay for each level, and it factorizes into the Maxwellian times
          a velocity-independent spatial/temporal part — which is what lets us integrate over{" "}
          <Tex>{String.raw`v`}</Tex> cleanly:
        </p>
        <EqBlock label="23">{String.raw`N(z, v, t) = \lambda_a(z, v, t)\,\gamma_a^{-1} - \lambda_b(z, v, t)\,\gamma_b^{-1}`}</EqBlock>
        <EqBlock label="24">{String.raw`N(z, v, t) = W(v)\,N(z, t)`}</EqBlock>
        <p>
          The hole structure traces back to decomposing the standing-wave field into two oppositely directed running
          waves, whose <Tex>{String.raw`\pm Kz`}</Tex> an atom converts to <Tex>{String.raw`\mp Kv`}</Tex> Doppler
          shifts:
        </p>
        <EqBlock label="25">{String.raw`\tfrac{1}{2}E_n\exp[-i(\nu_n t+\phi_n)]\sin K_n z + \mathrm{c.c.} = -i\tfrac{1}{4}E_n\big\{e^{-i(\nu_n t+\phi_n-K_n z)} - e^{-i(\nu_n t+\phi_n+K_n z)}\big\} + \mathrm{c.c.}`}</EqBlock>
        <EqBlock label="26">{String.raw`\omega \to \nu_n\left(1 - \frac{|v|}{c}\right)`}</EqBlock>

        <Derivation title="Adiabatic elimination, the two Lorentzians, and reading off the holes">
          <Step title="Adiabatic elimination of the coherence">
            In the rate-equation approximation the off-diagonal <Tex>{String.raw`\rho_{ab}`}</Tex> (Eq. 19) is slaved to
            the instantaneous field and population difference. Substituting it and its conjugate into the population
            equations (11)–(12) yields the rate equations (20) with the stimulated rate{" "}
            <Tex>{String.raw`R(v)`}</Tex> of Eq. (21).
          </Step>
          <Step title="Standing wave → two Doppler-shifted Lorentzians">
            Decompose the standing wave into two running waves (Eq. 25). In the atom&rsquo;s rest frame each acquires a
            Doppler shift <Tex>{String.raw`\pm Kv`}</Tex> (Eq. 26). The squared field magnitude in{" "}
            <Tex>{String.raw`R(v)`}</Tex> therefore contains two Lorentzians{" "}
            <Tex>{String.raw`\mathscr{L}(\omega-\nu_n\mp Kv)`}</Tex>, giving the two-hole structure.
          </Step>
          <Step title="Solve for the steady-state saturated difference">
            Set the time derivatives in Eq. (20) to zero and combine with the lower-level equation. Solving the
            algebraic pair gives <Tex>{String.raw`\rho_{aa}-\rho_{bb} = N/(1+R(v)/R_s)`}</Tex> (Eq. 22), where the
            saturation parameter <Tex>{String.raw`R_s`}</Tex> collects the decay constants. Factor{" "}
            <Tex>{String.raw`N = W(v)N(z,t)`}</Tex> (Eqs. 23–24).
          </Step>
          <Step title="Read off the holes">
            Plot <Tex>{String.raw`\rho_{aa}-\rho_{bb}`}</Tex> vs <Tex>{String.raw`v`}</Tex>. Off resonance{" "}
            <Tex>{String.raw`R(v)`}</Tex> peaks at <Tex>{String.raw`v=\pm(\omega-\nu_n)/K`}</Tex> — two symmetric dips
            (holes). On resonance the two peaks merge at <Tex>{String.raw`v=0`}</Tex> into a single, deeper hole. That
            geometric fact is the entire mechanism behind the Lamb dip — and the left panel of the simulation below
            shows it live.
          </Step>
        </Derivation>

        <Figure
          caption={
            <>
              Off line center the two running waves burn two separate Bennett holes at{" "}
              <Tex>{String.raw`v=\pm(\omega-\nu_n)/K`}</Tex>; on line center they merge into one deeper hole at{" "}
              <Tex>{String.raw`v=0`}</Tex>. Fewer total atoms are saturated when one hole serves both waves.
            </>
          }
        >
          <svg viewBox="0 0 520 220" role="img" aria-label="Two Bennett holes off-center merging to one on-center">
            <text x="130" y="20" textAnchor="middle" fontSize="13" fill="#1f2733" fontWeight="600">
              off center (ω ≠ νₙ)
            </text>
            <text x="390" y="20" textAnchor="middle" fontSize="13" fill="#1f2733" fontWeight="600">
              on center (ω = νₙ)
            </text>
            {/* left: two holes */}
            <path
              d="M 20 180 C 60 60, 90 60, 110 90 C 118 102, 122 102, 130 90 C 130 90, 130 90, 130 90 L 130 90 C 138 102, 142 102, 150 90 C 170 60, 200 60, 240 180"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
            />
            <line x1="110" y1="180" x2="110" y2="92" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 3" />
            <line x1="150" y1="180" x2="150" y2="92" stroke="#d97706" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="110" y="198" textAnchor="middle" fontSize="11" fill="#16a34a">−|v|</text>
            <text x="150" y="198" textAnchor="middle" fontSize="11" fill="#d97706">+|v|</text>
            <line x1="130" y1="60" x2="130" y2="185" stroke="#94a3b8" strokeWidth="1" />
            <text x="130" y="212" textAnchor="middle" fontSize="11" fill="#5b6473">v = 0</text>
            {/* right: one merged hole */}
            <path
              d="M 280 180 C 320 60, 360 60, 390 130 C 390 130, 390 130, 390 130 C 420 60, 460 60, 500 180"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
            />
            <line x1="390" y1="180" x2="390" y2="132" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="390" y="212" textAnchor="middle" fontSize="11" fill="#5b6473">v = 0 (both waves)</text>
          </svg>
        </Figure>

        <Callout kind="insight" title="Two holes off-center, one hole on-center">
          Off line center the two running waves saturate two different velocity groups (two Bennett holes). On line
          center they overlap at <Tex>{String.raw`v=0`}</Tex> and compete for one group — the laser sees <em>less</em>{" "}
          gain there, producing the dip.
        </Callout>
        <Callout kind="warning" title="Spatial holes neglected here">
          Eq. (22) keeps the <Tex>{String.raw`v=0`}</Tex> part of <Tex>{String.raw`N(z,v,t)`}</Tex>; spatial holes are
          ignored because moving atoms average over many standing-wave wavelengths within their lifetime.
        </Callout>
        <Callout kind="note" title="Saturation parameter">
          <Tex>{String.raw`R_s`}</Tex> is the saturation rate; <Tex>{String.raw`R(v)/R_s`}</Tex> is the dimensionless
          saturation. The intensity enters through <Tex>{String.raw`(\wp E_n/\hbar)^2`}</Tex> in{" "}
          <Tex>{String.raw`R(v)`}</Tex>.
        </Callout>
      </Section>

      <Section title="The Lamb dip and the plasma dispersion function">
        <Intuition>
          Integrate the saturated polarization over velocity, feed it into the self-consistency equations, and expand
          for weak fields. The velocity integral of a Lorentzian over the Gaussian produces the{" "}
          <strong>plasma dispersion function</strong> <Tex>{String.raw`Z(\xi)`}</Tex> — the same special function from
          plasma physics — whose imaginary part is the Doppler gain profile and real part the frequency pulling. The
          payoff is the output power vs detuning: a broad Doppler-shaped gain curve with a narrow{" "}
          <strong>dip of width ~<Tex>{String.raw`\gamma`}</Tex></strong> at line center. The dip appears because on
          center one velocity group serves both waves, so it is saturated <em>once but fully</em>; off center two groups
          each serve one wave and share the saturation — less saturation off center means more output off center, hence
          a dip at center.
        </Intuition>
        <p>The macroscopic complex polarization, before velocity integration:</p>
        <EqBlock label="27">{String.raw`\mathscr{P}_n(t) = -\tfrac{1}{2}\,i\,\frac{\wp^2}{\hbar}\,N\,E_n\Big\{\mathscr{D}(\omega - \nu_n - Kv) + \mathscr{D}(\omega - \nu_n + Kv)\Big\}\left[1 + \frac{R(v)}{R_s}\right]^{-1}`}</EqBlock>
        <p>
          To first order the velocity integral collapses onto the plasma dispersion function with dimensionless detuning{" "}
          <Tex>{String.raw`\xi = (\omega-\nu_n)/Ku`}</Tex>:
        </p>
        <EqBlock label="28">{String.raw`\mathscr{P}_n^{(1)} = -\wp^2 (Ku\,\hbar)^{-1} E_n N\, Z(\xi)`}</EqBlock>
        <KeyResult
          number="29"
          eq={String.raw`Z(\xi) = \frac{iK}{\sqrt{\pi}}\int_{-\infty}^{\infty} dv\,\frac{\exp[-(v/u)^2]}{\xi + iKv}`}
          label="Plasma dispersion function (velocity-averaged lineshape)"
          note={
            <>
              Averaging a Lorentzian over the Maxwellian Gaussian gives <Tex>{String.raw`Z(\xi)`}</Tex>:{" "}
              <Tex>{String.raw`\mathrm{Im}\,Z`}</Tex> is the Doppler-broadened (Voigt) gain profile,{" "}
              <Tex>{String.raw`\mathrm{Re}\,Z`}</Tex> the mode pulling. The same function governs Landau damping in
              plasmas.
            </>
          }
        />
        <p>
          A time-domain (Fourier) representation makes the Doppler-vs-natural broadening competition explicit —
          coherence decay <Tex>{String.raw`e^{-\gamma\tau}`}</Tex>, oscillation <Tex>{String.raw`e^{-i(\omega-\nu_n)\tau}`}</Tex>,
          and Gaussian Doppler damping <Tex>{String.raw`e^{-(Ku)^2\tau^2/4}`}</Tex>:
        </p>
        <EqBlock label="30">{String.raw`Z = iKu\int_{0}^{\infty} d\tau\,e^{-\gamma\tau}\,e^{-i(\omega-\nu_n)\tau}\,e^{-\frac{1}{4}(Ku)^2\tau^2}`}</EqBlock>
        <p>
          In the Doppler limit <Tex>{String.raw`Ku \gg \gamma`}</Tex> the Gaussian is nearly flat over a Lorentzian and
          the integral simplifies dramatically — imaginary part a pure Gaussian, real part a Dawson-type dispersion
          integral:
        </p>
        <EqBlock label="32">{String.raw`Z(\xi)\big|_{Ku \gg \gamma} = e^{-\xi^2}\Big[i\sqrt{\pi} - 2\int_{0}^{\xi} dx\,e^{x^2}\Big]`}</EqBlock>
        <p>
          The third-order (saturation) polarization is cubic in the field and carries products of the two Lorentzians;
          the cross terms (one <Tex>{String.raw`+`}</Tex> and one <Tex>{String.raw`-`}</Tex> shift) produce the dip:
        </p>
        <EqBlock label="33">{String.raw`\mathscr{P}_n^{(3)} = \tfrac{1}{8}\wp^4(\hbar^3 Ku\gamma)^{-1} E_n^3\,\bar N\,\Big\{iKu\int_{-\infty}^{\infty} dv\,W(v)\,\mathscr{D}(\omega-\nu_n+Kv)\,[\mathscr{L}(\omega-\nu_n+Kv)+\mathscr{L}(\omega-\nu_n-Kv)]\Big\}/R_s`}</EqBlock>
        <p>In the Doppler limit a velocity-derivative term vanishes and this reduces to a Gaussian envelope times a bracketed Lorentzian at line center:</p>
        <EqBlock label="38">{String.raw`\tfrac{1}{8}\frac{\sqrt{\pi}\,\bar N\,\wp^4\gamma_{ab}}{\hbar^3 Ku\,\gamma\,\gamma_a\gamma_b}\,E_n^3\,e^{-(\omega-\nu_n)^2/(Ku)^2}\Big\{\tfrac{\omega-\nu_n}{\gamma}\mathscr{L}(\omega-\nu_n) + i\big[1 + \mathscr{L}(\omega-\nu_n)\big]\Big\}`}</EqBlock>
        <p>
          The threshold population difference relates the linear gain coefficient <Tex>{String.raw`a_g`}</Tex> to
          the pump; the relative excitation <Tex>{String.raw`\mathfrak{N}=\bar N/\bar N_T`}</Tex> measures how far above threshold
          the laser runs:
        </p>
        <EqBlock label="40">{String.raw`\bar N_T = \varepsilon_0\hbar Ku\,(\wp^2 Q\sqrt{\pi})^{-1}`}</EqBlock>
        <p>The dip analysis confirms the relative excitation at which the dip appears, set by the ratio of homogeneous to Doppler width:</p>
        <EqBlock label="41">{String.raw`\mathfrak{N} = 1 + 2\left(\frac{\gamma}{Ku}\right)^2`}</EqBlock>
        <p>
          The self-consistent gain and saturation coefficients come from the imaginary parts of the first- and
          third-order polarizations:
        </p>
        <EqBlock label="42">{String.raw`a_g E_n = -\frac{\nu}{2\varepsilon_0}\,\mathrm{Im}\,\mathscr{P}_n`}</EqBlock>
        <KeyResult
          number="43"
          eq={String.raw`a_g = \frac{\nu\wp^2 \bar N}{4\hbar\gamma u\varepsilon_0\sqrt{\pi}}\int_{-\infty}^{\infty} dv\,\frac{e^{-v^2/u^2}\big[\mathscr{L}(\omega-\nu_n+Kv) + \mathscr{L}(\omega-\nu_n-Kv)\big]}{1 + \tfrac{1}{2}(\gamma_{ab}/\gamma)I_n\big[\mathscr{L}(\omega-\nu_n+Kv) + \mathscr{L}(\omega-\nu_n-Kv)\big]}`}
          label="Saturated coefficient — the Lamb-dip-bearing integral"
          note={<>This velocity integral over the Maxwellian, with the saturation denominator, is exactly what the simulation evaluates.</>}
        />
        <p>Evaluate it on resonance and off resonance, and the dip falls out of the comparison:</p>
        <EqBlock label="44">{String.raw`a_g(\omega = \nu_n) = \frac{\nu\wp^2\bar N}{4\hbar\gamma u\varepsilon_0\sqrt{\pi}}\left[\frac{2}{1 + (\gamma_{ab}/\gamma)I_n}\right]`}</EqBlock>
        <EqBlock label="45">{String.raw`a_g(\omega \neq \nu_n) = \frac{\nu\wp^2\bar N}{4\hbar\gamma u\varepsilon_0\sqrt{\pi}}\left[\frac{2}{1 + \tfrac{1}{2}(\gamma_{ab}/\gamma)I_n}\right]e^{-(\omega - \nu_n)^2/(Ku)^2}`}</EqBlock>
        <KeyResult
          eq={String.raw`a_g(\omega=\nu_n) \;\propto\; \frac{2}{1 + (\gamma_{ab}/\gamma)I_n}\quad\text{vs}\quad a_g(\omega\neq\nu_n) \;\propto\; \frac{2}{1 + \tfrac{1}{2}(\gamma_{ab}/\gamma)I_n\big[\mathscr{L}(\omega-\nu_n+Kv)+\mathscr{L}(\omega-\nu_n-Kv)\big]}`}
          label="The Lamb dip: single- vs double-Lorentzian saturation"
          note={
            <>
              On center both waves saturate <em>one</em> velocity group (single Lorentzian, full strength) → maximum
              saturation. Off center the two waves saturate <em>two</em> groups (both Lorentzians, halved) → less
              saturation, more output. Through gain = loss this makes the steady-state power <strong>dip</strong> sharply
              (width <Tex>{String.raw`\sim\gamma\ll Ku`}</Tex>) at exactly line center.
            </>
          }
        />
        <p>The operating intensity at each detuning comes from the steady-state balance of saturated gain against cavity loss:</p>
        <KeyResult
          number="46"
          eq={String.raw`\mathrm{Loss} = \tfrac{1}{2}\frac{\nu}{Q_n} = a_g`}
          label="Steady-state gain = loss"
          note={<>Solving this at each detuning gives the output power vs tuning — the curve that displays the Lamb dip.</>}
        />

        <SimFrame
          title="The Lamb dip: velocity hole burning builds the output-power dip"
          caption={
            <>
              The dip is computed from the genuine velocity integral of Eqs. (21)–(24) — not a hand-drawn{" "}
              <Tex>{String.raw`1-\text{Lorentzian}`}</Tex>. The left panel shows the saturated velocity distribution with
              the two Bennett holes; the right panel plots the saturated gain minus a fixed cavity loss (the{" "}
              <em>gain margin</em>) vs detuning, evaluated at the slider field <Tex>{String.raw`I_n`}</Tex>. This is a
              gain-excess proxy for the output, not a self-consistent solve of the gain&nbsp;=&nbsp;loss balance of
              Eq.&nbsp;(46).
            </>
          }
          tryThis={
            <>
              Drag <Tex>{String.raw`(\omega-\nu_n)/Ku`}</Tex> and watch the two holes (left) slide together and merge at{" "}
              <Tex>{String.raw`v=0`}</Tex> just as the marker on the right curve drops into the dip. Set{" "}
              <Tex>{String.raw`I_n=0`}</Tex>: the dip vanishes — pure Doppler Gaussian. Now turn up{" "}
              <Tex>{String.raw`\gamma/Ku`}</Tex> toward 1 and the dip washes out (Eq. 41). Toggle the third-order
              overlay: at high <Tex>{String.raw`I_n`}</Tex> it dives to the floor at line center — perturbation theory
              overestimates the saturation and breaks down — but as you lower <Tex>{String.raw`I_n`}</Tex> it recovers
              and rides just below the saturated curve.
            </>
          }
        >
          <Ch10Sim />
        </SimFrame>

        <Derivation title="From the velocity integral to the dip">
          <Step title="Velocity integral → plasma dispersion function">
            Insert the saturated polarization (Eq. 27) into <Tex>{String.raw`\mathscr{P}_n`}</Tex> and integrate over{" "}
            <Tex>{String.raw`v`}</Tex> with the Maxwellian. The first-order term gives a single Gaussian-weighted
            Lorentzian integral, which is the plasma dispersion function{" "}
            <Tex>{String.raw`Z(\xi)`}</Tex> (Eq. 29).
          </Step>
          <Step title="Third-order expansion and the Doppler limit">
            Expand the denominator <Tex>{String.raw`(1+R/R_s)^{-1}\approx 1 - R/R_s`}</Tex>. The third-order
            polarization (Eqs. 33–38) contains products of the two displaced Lorentzians. In the Doppler limit (
            <Tex>{String.raw`Ku \gg \gamma`}</Tex>) a velocity-derivative term vanishes and the result reduces to a
            Gaussian envelope times <Tex>{String.raw`\{1 + \text{Lorentzian at line center}\}`}</Tex> (Eq. 38).
          </Step>
          <Step title="Single- vs double-Lorentzian saturation">
            Evaluate <Tex>{String.raw`a_g`}</Tex> (Eq. 43) on center (Eq. 44) and off center (Eq. 45). On center
            the two waves share <em>one</em> velocity group (single Lorentzian); off center they use <em>two</em> groups
            (both Lorentzians, halved). The center is therefore more saturated, so through gain = loss (Eq. 46) the
            output power dips at line center.
          </Step>
          <Step title="Dip width and existence">
            The dip width is the homogeneous width <Tex>{String.raw`\gamma`}</Tex> (or <Tex>{String.raw`2\gamma`}</Tex>{" "}
            in the saturated regime), far narrower than the Doppler width{" "}
            <Tex>{String.raw`Ku`}</Tex>. The dip is a real feature only when{" "}
            <Tex>{String.raw`\gamma/Ku`}</Tex> is small (Eq. 41); in the Doppler limit the third-order theory
            overestimates saturation and exact numerics (next section) are needed.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Why the dip exists — one sentence">
          At line center both running waves burn the <em>same</em> (<Tex>{String.raw`v=0`}</Tex>) hole, doubling the
          saturation of one group; off center they burn two separate holes, sharing the saturation — so output power
          falls at exactly line center.
        </Callout>
        <Intuition title="Plasma dispersion function">
          <Tex>{String.raw`Z(\xi)`}</Tex>: imaginary part = Doppler gain (Gaussian), real part = mode pulling
          (Dawson-like). The same special function used for Landau damping in plasmas — here it is the Voigt-like
          Gaussian <Tex>{String.raw`\otimes`}</Tex> Lorentzian convolution.
        </Intuition>
        <Callout kind="insight" title="Why it matters">
          The Lamb dip sits at the natural-linewidth scale exactly at line center → an absolute frequency reference. The
          inverted Lamb dip (saturated absorption) in a methane cell stabilized the He–Ne 3.39&nbsp;µm laser.
        </Callout>
        <Callout kind="warning" title="Perturbation theory breaks in the Doppler limit">
          The third-order expression overestimates saturation badly when{" "}
          <Tex>{String.raw`Ku \gg \gamma`}</Tex>; treat it as qualitative for strong fields and use the
          exact/continued-fraction results of the next section.
        </Callout>
      </Section>

      <Section title="Multimode phenomena: competition, pulling, and locking">
        <Intuition>
          Real lasers oscillate on several cavity modes. Because atoms of different velocity resonate with different
          modes, the modes couple through the shared, velocity-distributed population — the nonlinear medium beats mode
          pairs together. Three phenomena emerge: <strong>mode competition</strong> (modes fight for the same atoms),{" "}
          <strong>frequency pulling/pushing</strong> (the dispersive <Tex>{String.raw`\mathrm{Re}\,\mathscr{P}`}</Tex>{" "}
          pulls mode frequencies toward line center), and <strong>mode locking</strong> (the combination-tone phase{" "}
          <Tex>{String.raw`\psi = \phi_+ + \phi_- - 2\phi_0`}</Tex> can lock, synchronizing the modes — the basis of
          mode-locked pulse trains).
        </Intuition>
        <p>
          The treatment iterates a perturbation &ldquo;tree&rdquo;: each branch is a sequence of field interactions at
          the various mode frequencies and positions. The trajectory relation links the positions at successive
          interaction times:
        </p>
        <EqBlock label="47">{String.raw`z' = z - v(t - t')`}</EqBlock>
        <p>The first-order coherence is built from one field interaction acting on the population difference, integrated over history:</p>
        <EqBlock label="48">{String.raw`\rho_{ab}(z, v, t) = \frac{i}{\hbar}\int_{-\infty}^{t} dt'\,e^{-(i\omega + \gamma)\tau}\,\mathscr{V}_{ab}(z, t')\,[\rho_{aa}(z, v, t') - \rho_{bb}(z, v, t')]`}</EqBlock>
        <p>The lowest-order population difference is just the unsaturated <Tex>{String.raw`N`}</Tex> — the source term of the tree:</p>
        <EqBlock label="49">{String.raw`\rho_{aa}^{(0)} - \rho_{bb}^{(0)} = \gamma_a^{-1}\lambda_a - \gamma_b^{-1}\lambda_b \equiv N(z, v, t)`}</EqBlock>
        <p>Iterating: first-order coherence (one interaction) feeds the second-order population (two interactions), which feeds the third-order coherence (three interactions):</p>
        <EqBlock label="50">{String.raw`\rho_{ab}^{(1)}(z, v, t) = \frac{i}{\hbar}\,N(z, v, t)\int_{-\infty}^{t} dt'\,e^{-(i\omega + \gamma)\tau}\,\mathscr{V}_{ab}(z', t')`}</EqBlock>
        <EqBlock label="51">{String.raw`\rho_{aa}^{(2)}(z, v, t) = -\frac{i}{\hbar}\int_{-\infty}^{t} dt'\,e^{-\gamma_a\tau'}\,\mathscr{V}_{ab}(z', t')\,\rho_{ba}^{(1)}(z', v, t') + \text{c.c.}`}</EqBlock>
        <EqBlock label="53">{String.raw`\rho_{ab}^{(3)}(z, v, t) = i\hbar^{-1}\int_{-\infty}^{t} dt'\,e^{-(i\omega + \gamma)\tau'}\,\mathscr{V}_{ab}(z', t')\,[\rho_{aa}^{(2)} - \rho_{bb}^{(2)}](z', v, t')`}</EqBlock>
        <p>
          The velocity/space integral of the third-order coherence yields the self- and cross-saturation coefficients
          that drive the three-mode intensity coupling. The symmetric saturation term <Tex>{String.raw`l_s`}</Tex>{" "}
          collects these contributions, with the side-mode amplitudes <Tex>{String.raw`E_1, E_2`}</Tex> entering through
          the mode-spacing parameter <Tex>{String.raw`\Delta`}</Tex>:
        </p>
        <EqBlock label="54">{String.raw`l_s = \tfrac{1}{16}\pi^{1/2}\wp^4\bar N(\hbar^3 Ku\varepsilon_0)^{-1}(\gamma_a\gamma)^{-2}\mathscr{L}_a(\Delta)\Big[\frac{N_2}{\bar N}(\gamma_a\gamma-\tfrac{1}{2}\Delta^2)\mathscr{L}(\tfrac{1}{2}\Delta)(E_2^2 + 2E_1^2) + 2\tfrac{\gamma}{\gamma_a}E_1^2 + (\gamma_a\gamma - \Delta^2)\mathscr{L}(\Delta)E_2^2\Big] + (\gamma_a \to \gamma_b)`}</EqBlock>

        <Callout kind="note" title="Equations at the limit of scan legibility">
          Eq. (54) is dense and partly drawn from end-of-chapter problems. Its overall <em>structure</em>
          — plasma-dispersion arguments, Lorentzian products, the combination-tone parameter{" "}
          <Tex>{String.raw`\Delta`}</Tex> — is reliable; the exact arrangement of deeply nested factors is best-effort.
        </Callout>

        <Derivation title="Perturbation tree, coupling, and locking">
          <Step title="Perturbation tree to third order">
            Iterate the coupled density-matrix equations: <Tex>{String.raw`\rho_{ab}^{(1)}`}</Tex> (one interaction,
            Eq. 50) feeds <Tex>{String.raw`\rho^{(2)}`}</Tex> populations (two interactions, Eq. 51), which feed{" "}
            <Tex>{String.raw`\rho_{ab}^{(3)}`}</Tex> (three interactions, Eq. 53). Each interaction injects a mode
            frequency and position-dependent phase, linked by <Tex>{String.raw`z' = z - v(t-t')`}</Tex>.
          </Step>
          <Step title="Velocity integration → saturation coefficients">
            Integrate <Tex>{String.raw`\rho_{ab}^{(3)}`}</Tex> over the Maxwellian and over cavity length. Products of
            Lorentzians at different mode frequencies yield the self-saturation, cross-saturation, and combination-tone
            coupling coefficients that drive the two- and three-mode intensity and frequency equations.
          </Step>
          <Step title="Two-mode operation and the coupling constant C">
            For two modes symmetric about line center the coupled intensity equations have a coupling constant{" "}
            <Tex>{String.raw`C = \theta_{12}\theta_{21}/(\theta_{11}\theta_{22})`}</Tex>. <Tex>{String.raw`C<1`}</Tex>{" "}
            gives weak coupling (coexistence); <Tex>{String.raw`C>1`}</Tex> gives strong coupling (bistable, one mode
            wins). <Tex>{String.raw`C`}</Tex> grows as the mode spacing shrinks.
          </Step>
          <Step title="Three-mode locking">
            With three modes the relative phase{" "}
            <Tex>{String.raw`\psi = \phi_+ + \phi_- - 2\phi_0`}</Tex> obeys a driven equation. For central tuning the
            driving term locks <Tex>{String.raw`\psi`}</Tex>, synchronizing the modes; locked operation gives a beat at
            the mode interval — the origin of mode locking.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Modes couple through shared atoms">
          Different velocity groups feed different modes, but the nonlinear (third-order) population beats mode pairs
          together — competition, pulling, and locking all live in the third-order term.
        </Callout>
        <Intuition title="Coupling constant C">
          <Tex>{String.raw`C = \text{(cross-saturation product)}/\text{(self-saturation product)}`}</Tex>.{" "}
          <Tex>{String.raw`C<1`}</Tex>: modes share the medium peacefully. <Tex>{String.raw`C>1`}</Tex>: bistable
          competition. Closer mode spacing → larger <Tex>{String.raw`C`}</Tex>.
        </Intuition>
        <Callout kind="insight" title="Mode locking">
          The combination-tone phase <Tex>{String.raw`\psi = \phi_+ + \phi_- - 2\phi_0`}</Tex> locking is the seed of
          mode-locked pulse generation in real lasers.
        </Callout>
        <Callout kind="warning" title="The rate-equation approximation can fail for multimode">
          Populations pulsate at mode-beat frequencies; if the beat is comparable to or larger than{" "}
          <Tex>{String.raw`1/\gamma`}</Tex> the rate-equation approximation breaks and the full perturbation treatment
          is required.
        </Callout>
      </Section>

      <Section title="Single-mode strong-signal theory: beyond perturbation">
        <Intuition>
          Above threshold the field can be strong enough that the third-order expansion fails — it underestimates
          saturation, so you need the full denominator. Strong-signal theory transforms to the rotating frame, writing
          the coherence in terms of its in-phase (<Tex>{String.raw`C_n`}</Tex>) and in-quadrature (
          <Tex>{String.raw`S_n`}</Tex>) parts. Because the standing-wave saturation is periodic in{" "}
          <Tex>{String.raw`2Kz`}</Tex>, expanding the saturated population difference in a spatial Fourier series turns
          the problem into a coupled recursion for the Fourier coefficients — solved exactly by a{" "}
          <strong>continued fraction</strong>. Truncating it reproduces the rate-equation hole-burning result; keeping
          all terms gives the exact strong-signal answer.
        </Intuition>
        <p>The polarization is written directly from the rotating-frame coherence and split into in-phase and quadrature parts:</p>
        <EqBlock label="55">{String.raw`\mathscr{P}_n(z, v, t) = 2\wp\,e^{i(\nu_n t + \phi_n)}\,\rho_{ab}(z, v, t)`}</EqBlock>
        <EqBlock label="56">{String.raw`\mathscr{P}_n(z, v, t) = C_n(z, v, t) + i\,S_n(z, v, t)`}</EqBlock>
        <EqBlock label="57">{String.raw`\mathscr{P}_n(t) = C_n(t) + iS_n(t) = \frac{1}{\mathscr{N}}\int_{0}^{L} dz\, U_n^*(z)\int_{-\infty}^{\infty} dv\,\mathscr{P}_n(z, v, t)`}</EqBlock>
        <p>Use the sum/difference population variables:</p>
        <EqBlock label="58">{String.raw`D(z, v, t) = \rho_{aa}(z, v, t) - \rho_{bb}(z, v, t)`}</EqBlock>
        <EqBlock label="59">{String.raw`M(z, v, t) = \rho_{aa}(z, v, t) + \rho_{bb}(z, v, t)`}</EqBlock>
        <p>
          Expand the quadrature polarization in odd spatial harmonics and the population difference in even harmonics;
          the coupling between them generates the continued-fraction recursion:
        </p>
        <EqBlock label="60">{String.raw`S_n(z, v, t) = -i\wp N(z, v, t)\sum_{j=-\infty}^{\infty} q_{2j+1}(v)\,e^{i(2j+1)K_n z}`}</EqBlock>
        <EqBlock label="61">{String.raw`D(z, v, t) = N(z, v, t)\sum_{j=-\infty}^{\infty} q_{2j}(v)\,e^{2ijK_n z}`}</EqBlock>
        <p>The strong-signal self-consistency relation determines the field intensity <Tex>{String.raw`I_n`}</Tex> implicitly through the velocity average of the continued fraction:</p>
        <KeyResult
          number="62"
          eq={String.raw`\mathfrak{N}^{-1} = 2Ku\,(\gamma_{ab}Z_i(\gamma))^{-1}\int_0^\infty dv\,W(v)\,\mathfrak{F}(v, \omega - \nu_n, I_n)\,[1 + I_n\,\mathfrak{F}(v, \omega - \nu_n, I_n)]^{-1}`}
          label="Strong-signal self-consistency"
        />
        <p>The lowest-order value of the continued fraction is again the sum of the two displaced Lorentzians — strong-signal theory reduces to the hole-burning rate equation at lowest order:</p>
        <EqBlock label="63">{String.raw`\mathfrak{F} \equiv \tfrac{1}{2}\frac{\gamma_{ab}}{\gamma}\big[\mathscr{L}(\omega - \nu_n + Kv) + \mathscr{L}(\omega - \nu_n - Kv)\big]`}</EqBlock>
        <p>
          For reference, the rate-equation-approximation single-mode polarization (Prob. 10-12), expressed through
          plasma dispersion functions at shifted arguments <Tex>{String.raw`\upsilon_\pm`}</Tex>:
        </p>
        <EqBlock label="65">{String.raw`\mathscr{P}_n(t) = -\tfrac{1}{2}\Big[\frac{\wp^2\bar N}{\hbar Ku}\Big]E_n(\gamma + i\Delta)\big\{(1 + A)[Z(\upsilon_+)/\upsilon_+] + (1 - A)[Z(\upsilon_-)/\upsilon_-]\big\}`}</EqBlock>
        <p>with the shifted arguments, power-broadened width, and velocity/detuning factor:</p>
        <EqBlock label="66">{String.raw`\upsilon_\pm^2 = \gamma'^2 - \Delta^2 \pm\big[(\gamma\gamma_{ab}I_n/2)^2 - 4\Delta^2\gamma'^2\big]^{1/2},\quad \gamma' = \gamma\big[1 + \tfrac{1}{2}(\gamma_{ab}/\gamma)I_n\big]^{1/2},\quad A = \frac{\gamma_{ab}I_n + 4i\Delta}{[(\gamma_{ab}I_n)^2 - 16\Delta^2(\gamma'/\gamma)^2]^{1/2}}`}</EqBlock>
        <p>
          For reference, the lowest-order single-mode polarization (Prob. 10-13) written compactly through the plasma
          dispersion function and the power-broadened width <Tex>{String.raw`\gamma'`}</Tex>:
        </p>
        <EqBlock label="67">{String.raw`\mathscr{P}_n(t) = -\frac{\wp^2}{\hbar Ku}\,\bar N\,E_n\big[Z_r(\gamma'+i\omega-i\nu_n) + i\tfrac{\gamma}{\gamma'}Z_i(\gamma'+i\omega-i\nu_n)\big]`}</EqBlock>

        <Callout kind="note" title="Problem-set equations transcribed by structure">
          Eqs. (65)–(67) come from end-of-chapter problems and are at the limit of scan legibility. Trust their{" "}
          <em>structure</em> — plasma-dispersion arguments <Tex>{String.raw`\upsilon_\pm`}</Tex>, Lorentzian products, the
          power-broadened width — and treat the exact factor arrangement as best-effort. The continued-fraction
          machinery itself lives in Appendix E.
        </Callout>

        <Derivation title="Rotating frame, Fourier harmonics, continued fraction">
          <Step title="Rotating frame, in-phase/quadrature split">
            Transform the density-matrix equations to the rotating frame at <Tex>{String.raw`\nu_n`}</Tex> to remove the
            optical oscillation. Write <Tex>{String.raw`\rho_{ab}=(C_n + iS_n)`}</Tex> (Eqs. 55–57).{" "}
            <Tex>{String.raw`C_n`}</Tex> feeds the frequency-determining equation; <Tex>{String.raw`S_n`}</Tex> the
            amplitude-determining equation.
          </Step>
          <Step title="Spatial Fourier expansion in 2Kz">
            Because the standing-wave saturation is periodic in <Tex>{String.raw`z`}</Tex> with period{" "}
            <Tex>{String.raw`\lambda/2`}</Tex>, expand <Tex>{String.raw`D`}</Tex> in even harmonics (Eq. 61) and{" "}
            <Tex>{String.raw`S_n`}</Tex> in odd harmonics (Eq. 60). Substituting couples coefficient{" "}
            <Tex>{String.raw`q_{2j}`}</Tex> to <Tex>{String.raw`q_{2j\pm1}`}</Tex>, producing a tridiagonal recursion.
          </Step>
          <Step title="Continued-fraction solution">
            The tridiagonal recursion is solved exactly as a continued fraction{" "}
            <Tex>{String.raw`\mathfrak{F}`}</Tex> (Appendix E). Its lowest-order truncation reproduces the
            rate-equation <Tex>{String.raw`\mathfrak{F}`}</Tex> of Eq. (63) — the two-Lorentzian hole-burning form.
            Keeping more terms converges to the exact saturated population.
          </Step>
          <Step title="Self-consistency and the intensity">
            Insert the continued-fraction polarization into the amplitude-determining equation to get the implicit
            relation Eq. (62) for relative excitation <Tex>{String.raw`\mathfrak{N}`}</Tex> vs intensity{" "}
            <Tex>{String.raw`I_n`}</Tex>. Solving numerically and comparing the rate-equation approximation, the
            third-order series, and the exact continued fraction shows: the rate-equation approximation tracks the exact
            answer well, while the third-order series overestimates saturation.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Strong-signal hierarchy">
          Third-order series (fails at high field) <Tex>{String.raw`\subset`}</Tex> rate-equation approximation
          (surprisingly accurate) <Tex>{String.raw`\subset`}</Tex> continued fraction (exact). The lowest-order
          continued fraction <em>is</em> the two-hole rate equation of the hole-burning section.
        </Callout>
        <Intuition title="Spatial Fourier harmonics">
          Standing-wave saturation is periodic in <Tex>{String.raw`2Kz`}</Tex>; even harmonics carry the population
          difference, odd harmonics the polarization. The harmonic coupling is exactly the continued fraction.
        </Intuition>
        <Callout kind="note" title="Imported from appendices">
          The continued-fraction machinery (Appendix E), plasma-dispersion identities (Appendix C), and multimode
          coefficients (Appendix D) are <em>used</em> here; their derivations live in those appendices.
        </Callout>
        <Callout kind="warning" title="Third order is qualitative only above threshold">
          For large relative excitation <Tex>{String.raw`\mathfrak{N}`}</Tex> the third-order intensity overestimates
          output; trust the exact/continued-fraction curve.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="The ideas you keep">
          <ul>
            <li>
              <strong>The convective derivative</strong>{" "}
              <Tex>{String.raw`d/dt \to \partial/\partial t + v\,\partial/\partial z`}</Tex> is the universal trick for
              any moving-medium density-matrix problem — it recurs in every gas-laser and Doppler-spectroscopy
              calculation.
            </li>
            <li>
              <strong>Inhomogeneous (Doppler) broadening</strong> enables hole burning and the Lamb dip — impossible in
              a purely homogeneous medium. Always ask: homogeneous or inhomogeneous?
            </li>
            <li>
              <strong>The two Bennett holes</strong> — a standing wave is two counter-running waves, each Doppler-resonant
              with a different velocity class <Tex>{String.raw`v=\pm(\omega-\nu_n)/K`}</Tex>, merging to one at line
              center. This geometry explains the dip in one sentence.
            </li>
            <li>
              <strong>The Lamb dip</strong> sits at the natural-linewidth scale (
              <Tex>{String.raw`\sim\gamma\ll Ku`}</Tex>) exactly at line center → an absolute frequency reference. The
              inverted Lamb dip (saturated absorption) underlies laser frequency stabilization (He–Ne/methane at
              3.39&nbsp;µm) and Doppler-free spectroscopy.
            </li>
            <li>
              <strong>The plasma dispersion function</strong> <Tex>{String.raw`Z(\xi)`}</Tex> is the velocity-averaged
              (Voigt-like) lineshape: <Tex>{String.raw`\mathrm{Im}\,Z`}</Tex> = Doppler gain,{" "}
              <Tex>{String.raw`\mathrm{Re}\,Z`}</Tex> = mode pulling. Recognize it whenever a Lorentzian is averaged over
              a Gaussian velocity distribution.
            </li>
            <li>
              <strong>The saturation form</strong> <Tex>{String.raw`N/(1+R/R_s)`}</Tex> and its saturation parameter{" "}
              <Tex>{String.raw`R_s`}</Tex> reappear in every nonlinear gain/absorption problem.
            </li>
            <li>
              <strong>The approximation hierarchy</strong>: third-order perturbation (fails at high field){" "}
              <Tex>{String.raw`\subset`}</Tex> rate-equation approximation (surprisingly accurate){" "}
              <Tex>{String.raw`\subset`}</Tex> exact continued-fraction strong-signal theory. Know your regime before
              trusting a result.
            </li>
            <li>
              <strong>The multimode coupling constant</strong>{" "}
              <Tex>{String.raw`C = \text{(cross)}/\text{(self)}`}</Tex>: <Tex>{String.raw`C<1`}</Tex> coexistence,{" "}
              <Tex>{String.raw`C>1`}</Tex> bistability. The combination-tone phase{" "}
              <Tex>{String.raw`\psi=\phi_+ + \phi_- - 2\phi_0`}</Tex> locking is the seed of mode-locking.
            </li>
            <li>
              <strong>Spatial Fourier expansion in</strong> <Tex>{String.raw`2Kz`}</Tex> (even harmonics for population,
              odd for polarization) converts standing-wave saturation into a continued fraction — a reusable technique
              for periodic-saturation problems.
            </li>
          </ul>
          Next: the ring laser (Chapter XI) takes the counter-running waves literally as a gyroscope, and the Zeeman
          laser (Chapter XII) adds polarization dynamics in a magnetic field — both built on the velocity-averaged,
          standing-wave machinery assembled here.
        </Callout>
      </Section>
    </Lesson>
  );
}
