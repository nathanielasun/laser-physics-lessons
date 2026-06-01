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
import Ch20Sim from "@/components/sims/ch20";

export default function Page() {
  return (
    <Lesson slug="ch20">
      <Lede>
        A laser beam looks like the cleanest light in the world — yet its linewidth is not zero. If the field is locked
        onto one mode at a fixed amplitude, why does it still smear over a finite band of frequencies? The answer is{" "}
        <strong>noise</strong>: the gain medium and the cavity are wired to reservoirs — the vacuum, the incoherent pump,
        dephasing collisions — that constantly kick the field. Treat the laser exactly like Brownian motion: every
        operator equation splits into a smooth <strong>drift</strong> (gain, loss, saturation, detuning) plus a
        fluctuating <strong>noise</strong> force whose strength is locked to the drift by a fluctuation–dissipation
        relation. Integrate, and a beautiful asymmetry emerges — saturation pins the <em>amplitude</em> but{" "}
        <em>nothing</em> pins the <em>phase</em>. The phasor random-walks around a circle, and that undamped phase
        diffusion is the entire origin of the Schawlow–Townes linewidth.
      </Lede>

      {/* ───────────────────────── Section 1 ───────────────────────── */}
      <Section title="The Langevin program: system, reservoirs, drift + diffusion">
        <Intuition>
          A laser is an <strong>open quantum system</strong>. The active atoms and the cavity field are the
          &ldquo;system&rdquo;; everything else is a set of <strong>reservoirs</strong> we never track in detail but
          whose statistics we know. The field couples to vacuum fluctuations (spontaneous emission and cavity loss); the
          atomic levels couple to the incoherent pump and to decay channels; the dipole couples to dephasing collisions.
          The Langevin philosophy — borrowed straight from Brownian motion (Chapter&nbsp;XIX) — is to write the
          Heisenberg equation of every system operator as a deterministic <strong>drift</strong> plus a rapidly
          fluctuating <strong>noise</strong> operator <Tex>{String.raw`F(t)`}</Tex> with zero average.
        </Intuition>
        <p>
          That is the master template of the whole chapter. Every system operator <Tex>{String.raw`O`}</Tex> obeys
        </p>
        <KeyResult
          eq={String.raw`\dot{O} = (\text{drift: gain, loss, saturation, detuning})\,O \;+\; F(t), \qquad \langle F(t)\rangle = 0`}
          label="Drift + zero-mean Langevin noise"
          note="A structural statement, not a numbered book equation — but it is the skeleton every later equation hangs on."
        />
        <p>
          The reservoirs are taken <strong>Markoffian</strong>: their correlation time is far shorter than any system
          timescale, so the noise is delta-correlated (white). Its weight is the diffusion coefficient:
        </p>
        <EqBlock>{String.raw`\langle F_\mu(t)\,F_\nu(t')\rangle = 2\langle D_{\mu\nu}\rangle\,\delta(t-t').`}</EqBlock>
        <p>
          The factor of <Tex>{String.raw`2`}</Tex> is part of the book&rsquo;s definition and is carried throughout
          (schematic form of Eq.&nbsp;17).
        </p>

        <Callout kind="note" title="Analogy — Brownian motion of light">
          A pollen grain in water obeys <Tex>{String.raw`m\dot v = -\gamma v + F(t)`}</Tex>: friction (drift) damps it,
          random molecular kicks (noise) keep it moving. The laser field obeys the <em>identical</em> structure — cavity
          loss is the friction, and the reservoirs supply the kicks.
        </Callout>

        <Derivation title="Set up the three-reservoir problem">
          <Step title="Identify the three reservoir channels">
            Vacuum fluctuations (giving spontaneous emission + cavity damping of the field), the incoherent pump
            (feeding the upper level), and phase-interrupting collisions (dephasing the dipole). Each reservoir is taken
            independent and coupled to the system through an electric-dipole perturbation energy.
          </Step>
          <Step title="Adopt the Markoff approximation">
            Reservoir correlation times are negligibly short compared to system evolution, so the noise is white
            (delta-correlated). This is exactly what makes the diffusion-coefficient description valid and lets us write
            a Markoffian Langevin equation.
          </Step>
          <Step title="State the two goals">
            (1) Show the drift terms reproduce the semiclassical equations of Chapter&nbsp;VIII, and (2) show the noise
            terms produce the linewidth. Order of treatment: atomic drift → atomic diffusion → field equation →
            adiabatic elimination → classical limit → linewidth.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Orientation — the hierarchy of timescales">
          The entire reduction rests on{" "}
          <Tex>{String.raw`\gamma,\;\gamma_a,\;\gamma_b \gg \nu/Q`}</Tex>: the atoms relax much faster than the field.
          This lets us adiabatically eliminate the atoms and end with a <em>single</em> stochastic equation for the
          field phasor.
        </Callout>
      </Section>

      {/* ───────────────────────── Section 2 ───────────────────────── */}
      <Section title="Atomic operators and the drift equations">
        <Intuition>
          Model each active atom as a three-level system: a pump lifts population into the upper laser level{" "}
          <Tex>{String.raw`|a\rangle`}</Tex>, the lasing transition runs <Tex>{String.raw`|a\rangle\to|b\rangle`}</Tex>,
          and fast incoherent decays empty both levels. Build the dynamics from single-atom{" "}
          <strong>projection operators</strong>: <Tex>{String.raw`\sigma_a`}</Tex> projects onto the upper level,{" "}
          <Tex>{String.raw`\sigma_b`}</Tex> onto the lower, and the spin-flip <Tex>{String.raw`\sigma=|b\rangle\langle a|`}</Tex>{" "}
          is the dipole that drives the field. Their Heisenberg equations — with reservoirs folded into decay rates plus
          noise — give the atomic <strong>drift</strong>.
        </Intuition>
        <p>The single-atom projection operators and their normalization:</p>
        <EqBlock label="1">{String.raw`\sigma_a(i) = \big(|a\rangle\langle a|\big)^i`}</EqBlock>
        <EqBlock label="2–3">{String.raw`\sigma_b(i) = \big(|b\rangle\langle b|\big)^i, \qquad \sigma_c(i) = \big(|c\rangle\langle c|\big)^i`}</EqBlock>
        <EqBlock>{String.raw`\sigma_a + \sigma_b + \sigma_c = P_i \quad(\text{the three populations of one atom sum to its identity}).`}</EqBlock>
        <p>
          The upper and lower levels decay exponentially (drift terms), and the pump transfers ground-state population
          into the upper level:
        </p>
        <EqBlock label="4">{String.raw`\frac{d}{dt}\langle\sigma_a(i)\rangle_{\text{decay}} = -\gamma_a\langle\sigma_a(i)\rangle`}</EqBlock>
        <EqBlock label="5">{String.raw`\Lambda_a^{\,i} = \lambda_a\,\sigma_c^{\,i} = \lambda_a\big(|c\rangle\langle c|\big)^i`}</EqBlock>
        <p>
          Atoms are taken independent — cross-atom and cross-state matrix elements vanish, so they add{" "}
          <em>incoherently</em>:
        </p>
        <EqBlock label="6">{String.raw`\big(\langle\alpha|\big)^i\big(|\beta\rangle\big)^j = \delta_{\alpha\beta}\,\delta_{ij}.`}</EqBlock>
        <p>Collecting pump, decay, and noise gives the full single-atom population and dipole equations:</p>
        <EqBlock label="7">{String.raw`\frac{d}{dt}\big[\sigma_a(i)\big] = \Lambda_i - \gamma_a\,\sigma_a^{\,i} + F_a(t)`}</EqBlock>
        <EqBlock label="8">{String.raw`\sigma^i(t) = \big(|b\rangle\langle a|\big)^i \quad(\text{single-atom dipole / coherence})`}</EqBlock>
        <EqBlock label="9">{String.raw`\frac{d}{dt}\big[\sigma^i(t)\big] = -[\gamma + i\omega]\,\sigma^i(t) + F_\sigma(t)`}</EqBlock>
        <p>
          The dipole oscillates at the atomic frequency <Tex>{String.raw`\omega`}</Tex> and decays at the{" "}
          <em>transverse</em> rate <Tex>{String.raw`\gamma`}</Tex> (collisions + spontaneous emission). To reach a
          macroscopic field, average over the <Tex>{String.raw`N`}</Tex> atoms and pass to the slowly-varying frame by
          peeling off the optical carrier:
        </p>
        <EqBlock label="10–11">{String.raw`\sigma_a = \frac{1}{N}\sum_{i=1}^{N}\sigma^i_a, \qquad \sigma = \frac{1}{N}\sum_{i=1}^{N}\sigma^i`}</EqBlock>
        <KeyResult
          number="12"
          eq={String.raw`\Sigma(t) = e^{i\nu t}\,\sigma(t) = \frac{1}{N}\,e^{i\nu t}\sum_{i=1}^{N}\sigma^i(t)`}
          label="Slowly-varying macroscopic flip operator"
          note={
            <>
              Factoring out the carrier <Tex>{String.raw`\nu`}</Tex> turns the bare frequency{" "}
              <Tex>{String.raw`\omega`}</Tex> into the detuning <Tex>{String.raw`(\omega-\nu)`}</Tex> in the rotating
              frame.
            </>
          }
        />
        <p>The slowly-varying drift equations (macroscopic versions of Eqs.&nbsp;7 and 9) read</p>
        <EqBlock label="13">{String.raw`\dot\sigma_a(t) = \Lambda_a - \gamma_a\,\sigma_a(t) + F_a(t)`}</EqBlock>
        <EqBlock label="14">{String.raw`\dot\Sigma(t) = -[\gamma + i(\omega-\nu)]\,\Sigma(t) + F_\Sigma(t)`}</EqBlock>
        <EqBlock label="15">{String.raw`\dot\Sigma^\dagger(t) = -[\gamma - i(\omega-\nu)]\,\Sigma^\dagger(t) + F_{\Sigma^\dagger}(t)`}</EqBlock>
        <Callout kind="note" title="Eqs. 14–15 are the slowly-varying dipole equations">
          These are clean: the macroscopic flip operator <Tex>{String.raw`\Sigma`}</Tex> and its adjoint{" "}
          <Tex>{String.raw`\Sigma^\dagger`}</Tex> each relax at the dephasing rate <Tex>{String.raw`\gamma`}</Tex> and
          oscillate at the rotating-frame detuning <Tex>{String.raw`\pm i(\omega-\nu)`}</Tex>, driven by their own
          Langevin force. No auxiliary terms appear.
        </Callout>

        <Derivation title="From single atom to macroscopic, slowly-varying operators">
          <Step title="Sum over atoms">
            Write the Heisenberg equation for each projection/flip operator (Eqs.&nbsp;7, 9). Because atoms are
            independent (Eq.&nbsp;6), summing over <Tex>{String.raw`i`}</Tex> and dividing by{" "}
            <Tex>{String.raw`N`}</Tex> (Eqs.&nbsp;10–11) gives macroscopic operators obeying the <em>same</em> linear
            drift — and the noise terms add to a macroscopic noise of reduced relative size{" "}
            <Tex>{String.raw`\sim 1/\sqrt N`}</Tex>.
          </Step>
          <Step title="Pass to the slowly-varying frame">
            Multiply the dipole by <Tex>{String.raw`e^{i\nu t}`}</Tex> (Eq.&nbsp;12). The bare{" "}
            <Tex>{String.raw`\omega`}</Tex> becomes the detuning <Tex>{String.raw`(\omega-\nu)`}</Tex> — which is why
            Eqs.&nbsp;14–15 carry <Tex>{String.raw`i(\omega-\nu)`}</Tex> instead of <Tex>{String.raw`i\omega`}</Tex>.
          </Step>
          <Step title="Read off the drift coefficients">
            Populations relax at <Tex>{String.raw`\gamma_a,\gamma_b`}</Tex>; the dipole relaxes at{" "}
            <Tex>{String.raw`\gamma`}</Tex> and oscillates at the detuning. These rates are exactly the dissipation that
            the Einstein relation will turn into diffusion next.
          </Step>
        </Derivation>

        <Callout kind="warning" title={"γ vs γₐ, γ_b"}>
          Keep the rates distinct: <Tex>{String.raw`\gamma_a,\gamma_b`}</Tex> are the <strong>longitudinal</strong>{" "}
          (population) decay rates; <Tex>{String.raw`\gamma`}</Tex> is the <strong>transverse</strong> (dipole /
          coherence) decay rate, which includes pure dephasing collisions and is generally faster. They play different
          roles in saturation and linewidth.
        </Callout>
      </Section>

      {/* ───────────────────────── Section 3 ───────────────────────── */}
      <Section title="Atomic diffusion and the generalized Einstein relation">
        <Intuition>
          Now the heart of the method. The noise forces are <em>not</em> arbitrary — their strength is dictated by the
          drift through the fluctuation–dissipation theorem, here in operator form: the{" "}
          <strong>generalized Einstein relation</strong>. Take the equation of motion for a <em>product</em> of
          operators, average it, and demand consistency with the separately-known drift of each factor. The leftover
          that cannot come from drift <em>must</em> be supplied by the noise — that leftover <strong>is</strong> the
          diffusion coefficient.
        </Intuition>
        <p>
          Every system operator <Tex>{String.raw`A_\mu`}</Tex> obeys the generic Langevin form{" "}
          <Tex>{String.raw`\dot A_\mu = D_\mu + F_\mu`}</Tex> (drift plus zero-mean noise). Averaging over the{" "}
          <Tex>{String.raw`N`}</Tex> atoms, the diffusion coefficients are themselves atom averages:
        </p>
        <EqBlock label="16">{String.raw`\langle D_{\mu\nu}\rangle = \frac{1}{N}\sum_{i=1}^{N}\langle D_{\mu\nu}^i\rangle`}</EqBlock>
        <p>The diffusion coefficient is defined through the white-noise correlation,</p>
        <EqBlock label="17">{String.raw`\langle F_\mu(t)F_\nu(t')\rangle = 2\langle D_{\mu\nu}\rangle\,\delta(t-t'),`}</EqBlock>
        <p>and the central identity is the generalized Einstein relation:</p>
        <KeyResult
          number="18"
          eq={String.raw`\frac{d}{dt}\langle A_\mu A_\nu\rangle = \langle D_\mu A_\nu\rangle + \langle A_\mu D_\nu\rangle + 2\langle D_{\mu\nu}\rangle`}
          label="Generalized Einstein relation"
          note="The rate of change of an operator product = the two drift contributions PLUS twice the diffusion. Solving for the last term gives the noise strength from the known drifts."
        />
        <p>Rearranged, it is the working formula for every diffusion coefficient in the chapter:</p>
        <EqBlock>{String.raw`2\langle D_{\mu\nu}\rangle = \frac{d}{dt}\langle A_\mu A_\nu\rangle - \langle D_\mu A_\nu\rangle - \langle A_\mu D_\nu\rangle.`}</EqBlock>
        <p>Applied to the polarization operator <Tex>{String.raw`\Sigma^\dagger\Sigma`}</Tex> (scaled to <Tex>{String.raw`N`}</Tex> atoms):</p>
        <EqBlock label="19">{String.raw`2\langle D_{\Sigma^\dagger\Sigma}\rangle = -N\langle D_{\Sigma^\dagger}\,\Sigma\rangle - N\langle \Sigma^\dagger\, D_\Sigma\rangle + N\frac{d}{dt}\langle \Sigma^\dagger\,\Sigma\rangle`}</EqBlock>
        <p>
          The non-trivial step is evaluating the dipole-squared expectation. Because{" "}
          <Tex>{String.raw`|b\rangle\langle a|\,|a\rangle\langle b| = |b\rangle\langle b|`}</Tex>, the product collapses
          to a population:
        </p>
        <EqBlock label="20">{String.raw`\Sigma^\dagger\Sigma = N^{-2}\sum_{i}\sum_{j}\big(|a\rangle\langle b|\big)^i\big(|b\rangle\langle a|\big)^j = N^{-2}\sum_i\big(|a\rangle\langle a|\big)^i = \frac{1}{N}\sigma_a.`}</EqBlock>
        <p>Assembling the drift rates and populations gives the dipole (coherence) diffusion coefficients:</p>
        <EqBlock label="20–21">{String.raw`2\langle D_{\Sigma^\dagger\Sigma}\rangle = -N[-\gamma+i(\omega-\nu)]\langle\Sigma^\dagger\Sigma\rangle - N[-\gamma-i(\omega-\nu)]\langle\Sigma^\dagger\Sigma\rangle + \langle\Lambda_a - \gamma_a\sigma_a\rangle = \langle\Lambda_a\rangle + (2\gamma - \gamma_a)\langle\sigma_a\rangle`}</EqBlock>
        <KeyResult
          number="21"
          eq={String.raw`2\langle D_{\Sigma^\dagger\Sigma}\rangle = \langle\Lambda_a\rangle + (2\gamma - \gamma_a)\langle\sigma_a\rangle`}
          label="Dipole (coherence) diffusion — upper level"
        />
        <KeyResult
          number="22"
          eq={String.raw`2\langle D_{\Sigma\Sigma^\dagger}\rangle = \langle\Lambda_b\rangle + (2\gamma - \gamma_b)\langle\sigma_b\rangle`}
          label="Dipole (coherence) diffusion — lower level"
          note="Together, Eqs. 21–22 are the atomic noise inputs that will feed the field — both set entirely by pump and decay rates acting on the populations."
        />

        <Derivation title="Compute a diffusion coefficient from the drift">
          <Step title="Write the product rate">
            For two operators <Tex>{String.raw`A_\mu, A_\nu`}</Tex> with drifts{" "}
            <Tex>{String.raw`D_\mu, D_\nu`}</Tex>, the Heisenberg equation for the product has cross terms. Averaging
            gives Eq.&nbsp;18:{" "}
            <Tex>{String.raw`\tfrac{d}{dt}\langle A_\mu A_\nu\rangle = \langle D_\mu A_\nu\rangle + \langle A_\mu D_\nu\rangle + 2\langle D_{\mu\nu}\rangle`}</Tex>.
          </Step>
          <Step title="Isolate the diffusion">
            The first two terms are computable from the single-operator drifts (Sec.&nbsp;2). Whatever is left over is
            the noise:{" "}
            <Tex>{String.raw`2\langle D_{\mu\nu}\rangle = \tfrac{d}{dt}\langle A_\mu A_\nu\rangle - \text{(drift terms)}`}</Tex>.
            This is fluctuation–dissipation in operator form.
          </Step>
          <Step title="Evaluate for inversion and dipole">
            Insert the population/dipole drifts and the projection identity (Eq.&nbsp;6) and the collapse{" "}
            <Tex>{String.raw`\langle\Sigma^\dagger\Sigma\rangle = \rho_a/N`}</Tex> (Eq.&nbsp;20). The result
            (Eqs.&nbsp;21–22) expresses the atomic diffusion entirely in pump/decay rates and populations.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Key idea — diffusion is not free">
          The single most important conceptual message: you cannot add noise by hand. The generalized Einstein relation
          (Eq.&nbsp;18) <strong>fixes</strong> the noise strength from the drift. Dissipation and fluctuation are two
          faces of the same reservoir coupling.
        </Callout>
      </Section>

      {/* ───────────────────────── Section 4 ───────────────────────── */}
      <Section title="The field Langevin equation and adiabatic elimination">
        <Intuition>
          The cavity field obeys its own Langevin equation: driven by the atomic dipole (gain), damped by cavity loss{" "}
          <Tex>{String.raw`\nu/Q`}</Tex>, detuned by <Tex>{String.raw`(\Omega-\nu)`}</Tex>, and kicked by vacuum noise.
          Its diffusion coefficients carry the all-important <strong>+1</strong> of spontaneous emission. Couple the
          field to the dipole and inversion, then use the timescale separation to{" "}
          <strong>adiabatically eliminate</strong> the atoms: the dipole follows the field instantly, so set its
          derivative to zero, solve algebraically, and substitute back — leaving a single stochastic equation for the
          phasor.
        </Intuition>
        <p>The bare cavity field, in the lab frame and the slowly-varying frame:</p>
        <EqBlock label="23">{String.raw`\dot a(t) = -\Big[\tfrac{1}{2}\frac{\nu}{Q} + i\Omega\Big]a(t) + f(t)`}</EqBlock>
        <EqBlock label="24">{String.raw`A(t) = a(t)\,e^{i\nu t}, \qquad F(t) = f(t)\,e^{i\nu t}`}</EqBlock>
        <EqBlock label="25">{String.raw`\dot A(t) = -\Big[\tfrac{1}{2}\frac{\nu}{Q} + i(\Omega-\nu)\Big]A(t) + F(t)`}</EqBlock>
        <p>
          The field diffusion coefficients carry the asymmetry that is the seed of all laser noise — the{" "}
          <Tex>{String.raw`+1`}</Tex> is spontaneous emission into the mode:
        </p>
        <EqBlock label="26">{String.raw`2\langle D_{a^\dagger a}\rangle = \frac{\nu}{Q}\,\bar n`}</EqBlock>
        <KeyResult
          number="27"
          eq={String.raw`2\langle D_{a a^\dagger}\rangle = \frac{\nu}{Q}\,(\bar n + 1)`}
          label="Field emission-side diffusion (the spontaneous-emission +1)"
          note="Even at zero temperature (n̄ = 0) there is still one quantum of field noise. This +1 is the quantum seed of the linewidth."
        />
        <p>Add the electric-dipole interaction to the Hamiltonian and form the coupled triplet:</p>
        <EqBlock label="28">{String.raw`\mathscr{V}(t) = \hbar g N\,\Sigma^\dagger A + \text{adjoint}`}</EqBlock>
        <EqBlock label="29">{String.raw`\dot\sigma_a = \Lambda_a - \gamma_a\sigma_a + ig\big[A^\dagger\Sigma - \Sigma^\dagger A\big] + F_a(t)`}</EqBlock>
        <EqBlock label="31">{String.raw`\dot\Sigma = -[\gamma + i(\omega-\nu)]\,\Sigma + ig(\sigma_a - \sigma_b)A + F_\Sigma(t)`}</EqBlock>
        <EqBlock label="32">{String.raw`\dot A = -\Big[\tfrac{1}{2}\frac{\nu}{Q} + i(\Omega-\nu)\Big]A - ig N\,\Sigma + F(t)`}</EqBlock>
        <p>
          The decisive simplification is the timescale-separation inequality, which lets us set the fast dipole
          derivative to zero:
        </p>
        <EqBlock label="33">{String.raw`\gamma,\;\gamma_a,\;\gamma_b \gg \frac{\nu}{Q}`}</EqBlock>
        <EqBlock label="34">{String.raw`\dot\sigma_a \simeq \dot\sigma_b \simeq \dot\Sigma \simeq 0`}</EqBlock>
        <p>
          Solving <Tex>{String.raw`\dot\Sigma = 0`}</Tex> in Eq.&nbsp;31 gives the dipole instantaneously tracking the
          field through the complex atomic denominator (a complex Lorentzian):
        </p>
        <EqBlock label="35">{String.raw`\Sigma(t) \cong \mathscr{D}(\omega-\nu)\,\big[ig(\sigma_a-\sigma_b)A + F_\Sigma(t)\big]`}</EqBlock>
        <KeyResult
          number="36"
          eq={String.raw`\mathscr{D}(\omega-\nu) = \frac{1}{\gamma + i(\omega-\nu)}`}
          label="Complex atomic denominator"
          note="Its real part gives gain dispersion; its modulus-squared gives saturation and the Lorentzian lineshape."
        />
        <p>Substituting back into the field equation eliminates the atoms as dynamical variables:</p>
        <KeyResult
          number="37"
          eq={String.raw`\dot A(t) = -\Big[\tfrac{1}{2}\frac{\nu}{Q} + i(\Omega-\nu)\Big]A(t) + g^2 N\,\mathscr{D}(\omega-\nu)\,(\sigma_a-\sigma_b)\,A(t) + G(t)`}
          label="Field equation after adiabatic elimination"
        />
        <EqBlock label="38">{String.raw`G(t) = F(t) - ig N\,\mathscr{D}(\omega-\nu)\,F_\Sigma(t)`}</EqBlock>
        <p>
          The composite noise <Tex>{String.raw`G(t)`}</Tex> bundles the original field noise{" "}
          <Tex>{String.raw`F`}</Tex> with the eliminated dipole noise <Tex>{String.raw`F_\Sigma`}</Tex> — both
          reservoirs now feed the field directly.
        </p>

        <Derivation title="Eliminate the atoms">
          <Step title="Write the coupled triplet">
            Add the dipole interaction (Eq.&nbsp;28). The Heisenberg equations give three coupled Langevin equations
            (29, 31, 32). The field drives the atoms via{" "}
            <Tex>{String.raw`ig[A^\dagger\Sigma-\Sigma^\dagger A]`}</Tex> and the atoms drive the field via{" "}
            <Tex>{String.raw`igN\,\Sigma`}</Tex>.
          </Step>
          <Step title="Impose timescale separation">
            Use <Tex>{String.raw`\gamma,\gamma_a,\gamma_b \gg \nu/Q`}</Tex> (Eq.&nbsp;33). On the slow field timescale
            the dipole has already relaxed, so set <Tex>{String.raw`\dot\Sigma = 0`}</Tex> in Eq.&nbsp;31.
          </Step>
          <Step title="Solve algebraically">
            <Tex>{String.raw`0 = -[\gamma + i(\omega-\nu)]\Sigma + ig(\sigma_a-\sigma_b)A + F_\Sigma`}</Tex> gives{" "}
            <Tex>{String.raw`\Sigma = \mathscr{D}(\omega-\nu)[ig(\sigma_a-\sigma_b)A + F_\Sigma]`}</Tex>{" "}
            (Eqs.&nbsp;35–36).
          </Step>
          <Step title="Substitute back">
            Insert <Tex>{String.raw`\Sigma`}</Tex> into Eq.&nbsp;32. The deterministic part becomes the gain{" "}
            <Tex>{String.raw`g^2 N\,\mathscr{D}\,(\sigma_a-\sigma_b)A`}</Tex>; the noise part becomes the composite{" "}
            <Tex>{String.raw`G(t)`}</Tex> (Eq.&nbsp;38). The atoms are gone (Eq.&nbsp;37).
          </Step>
        </Derivation>

        <Callout kind="insight" title="Key idea — the +1 is everything">
          In Eq.&nbsp;27 the <Tex>{String.raw`(\bar n+1)`}</Tex> versus <Tex>{String.raw`\bar n`}</Tex> asymmetry{" "}
          <em>is</em> spontaneous emission. Trace the linewidth all the way back and you land on this single{" "}
          <Tex>{String.raw`+1`}</Tex>.
        </Callout>
        <Callout kind="warning" title="Watch the i-factors and the gain sign">
          The coupling enters as <Tex>{String.raw`ig`}</Tex> (imaginary); the gain after elimination becomes{" "}
          <Tex>{String.raw`g^2 N\,\mathscr{D}`}</Tex> (the <Tex>{String.raw`i`}</Tex>&rsquo;s combine);{" "}
          <Tex>{String.raw`g`}</Tex> and <Tex>{String.raw`N`}</Tex> are real. The inversion{" "}
          <Tex>{String.raw`(\sigma_a-\sigma_b)`}</Tex> carries the sign: positive&nbsp;= gain, negative&nbsp;=
          absorption.
        </Callout>
      </Section>

      {/* ───────────────────────── Section 5 ───────────────────────── */}
      <Section title="Gain, saturation, and the steady-state laser equation">
        <Intuition>
          The field equation still hides the inversion <Tex>{String.raw`(\sigma_a-\sigma_b)`}</Tex>, which itself
          depends on the field intensity: a strong field burns down the inversion — <strong>gain saturation</strong>.
          Solving the population balance gives the saturated inversion{" "}
          <Tex>{String.raw`(N_a-N_b) = \mathscr{N}/(1 + I/I_{\text{sat}})`}</Tex>. Expand to lowest order and the field
          equation becomes the canonical laser form: a linear gain <Tex>{String.raw`\mathscr{A}`}</Tex> and a cubic
          saturation <Tex>{String.raw`\mathscr{B}`}</Tex> — exactly the semiclassical Chapter&nbsp;VIII equation, now
          with a noise term attached.
        </Intuition>
        <p>Steady-state population balance, with the stimulated transition rate and Lorentzian lineshape:</p>
        <EqBlock label="41">{String.raw`0 = \dot N_a = N\langle \Lambda_a\rangle - \gamma_a N_a - \mathscr{R}(N_a - N_b)`}</EqBlock>
        <EqBlock label="42">{String.raw`0 = \dot N_b = N\langle \Lambda_b\rangle - \gamma_b N_b + \mathscr{R}(N_a - N_b)`}</EqBlock>
        <EqBlock label="43">{String.raw`\mathscr{R} = \frac{2g^2}{\gamma}\,\mathscr{S}(\omega-\nu)\,\langle A^\dagger A\rangle`}</EqBlock>
        <KeyResult
          number="44"
          eq={String.raw`\mathscr{S}(\omega-\nu) = \frac{\gamma^2}{\gamma^2 + (\omega-\nu)^2}`}
          label="Dimensionless Lorentzian lineshape"
          note="Peaks at 1 on resonance; sets the frequency dependence of both gain and saturation."
        />
        <p>The unsaturated (small-signal) inversion and the saturation parameter:</p>
        <EqBlock label="45a">{String.raw`\mathscr{N} = N\left\langle\frac{\Lambda_a}{\gamma_a} - \frac{\Lambda_b}{\gamma_b}\right\rangle`}</EqBlock>
        <EqBlock label="45b">{String.raw`R_s = \big(\gamma_a^{-1} + \gamma_b^{-1}\big)^{-1}`}</EqBlock>
        <KeyResult
          number="46"
          eq={String.raw`N_a - N_b = \frac{\mathscr{N}}{1 + \mathscr{R}/R_s}`}
          label="Saturated inversion"
          note="The unsaturated value reduced by the standard 1/(1 + I/I_sat) factor. This nonlinearity is what clamps the laser amplitude."
        />
        <p>Insert the saturated inversion into the eliminated field equation:</p>
        <EqBlock label="47">{String.raw`\dot A(t) = -\Big[\tfrac{1}{2}\frac{\nu}{Q} + i(\Omega-\nu)\Big]A(t) + g^2\mathscr{D}(\omega-\nu)\,\frac{\mathscr{N}\,A(t)}{1 + \mathscr{R}/R_s} + G(t)`}</EqBlock>
        <p>
          Expanding <Tex>{String.raw`1/(1+x)\approx 1-x`}</Tex> to lowest order in intensity gives the headline
          equation:
        </p>
        <KeyResult
          number="48"
          eq={String.raw`\dot A(t) = -\Big[\tfrac{1}{2}\frac{\nu}{Q} + i(\Omega-\nu)\Big]A(t) + \mathscr{A}\,A(t) - \mathscr{B}_{c}\,(A^\dagger A)\,A(t) + G(t)`}
          label="The saturated laser Langevin equation"
          note={
            <>
              Linear gain <Tex>{String.raw`\mathscr{A}`}</Tex> and cubic saturation{" "}
              <Tex>{String.raw`\mathscr{B}_c`}</Tex> — structurally <em>identical</em> to the semiclassical
              Chapter&nbsp;VIII laser equation, now with a noise force <Tex>{String.raw`G(t)`}</Tex>.
            </>
          }
        />
        <EqBlock label="49">{String.raw`\mathscr{A} = g^2\mathscr{D}(\omega-\nu)\,\mathscr{N}`}</EqBlock>
        <EqBlock label="50">{String.raw`\mathscr{B}_{c} = 2\mathscr{A}_c\,\frac{g^2}{\gamma R_s}\,\mathscr{S}(\omega-\nu)`}</EqBlock>
        <p>The composite noise correlations — built from field-reservoir plus eliminated dipole noise — read</p>
        <EqBlock label="51a">{String.raw`\langle G^\dagger(t)G(t')\rangle = \langle F^\dagger(t)F(t')\rangle + (gN)^2|\mathscr{D}|^2\,\langle F_\Sigma^\dagger(t)F_\Sigma(t')\rangle`}</EqBlock>
        <EqBlock label="51b">{String.raw`\langle G^\dagger(t)G(t')\rangle = \left[\frac{\nu}{Q}\,\bar n + N\Big(\frac{g}{\gamma}\Big)^2 \mathscr{S}(\omega-\nu)\,2\langle D_{\Sigma^\dagger\Sigma}\rangle\right]\delta(t-t')`}</EqBlock>
        <EqBlock label="52">{String.raw`\langle G(t)G^\dagger(t')\rangle = \left[\frac{\nu}{Q}\big(\bar n+1\big) + N\Big(\frac{g}{\gamma}\Big)^2 \mathscr{S}(\omega-\nu)\,2\langle D_{\Sigma\Sigma^\dagger}\rangle\right]\delta(t-t')`}</EqBlock>
        <p>Using the steady-state populations,</p>
        <EqBlock label="53–54">{String.raw`2N\langle D_{\Sigma^\dagger\Sigma}\rangle = 2\gamma N_a + \mathscr{R}(N_a - N_b)`}</EqBlock>
        <EqBlock label="55">{String.raw`2N\langle D_{\Sigma\Sigma^\dagger}\rangle = 2\gamma N_b - \mathscr{R}(N_a - N_b)`}</EqBlock>
        <p>the symmetrized total field noise — the source term for amplitude/phase diffusion — becomes</p>
        <KeyResult
          number="56"
          eq={String.raw`\langle G^\dagger(t)G(t')\rangle + \langle G(t)G^\dagger(t')\rangle = 2\left[\frac{\nu}{Q}\Big(\bar n+\tfrac12\Big) + \frac{g^2}{\gamma}\mathscr{S}(\omega-\nu)\,(N_a + N_b)\right]\delta(t-t')`}
          label="Symmetrized field noise"
        />

        <Derivation title="Reach the laser equation and assemble the noise">
          <Step title="Solve the population balance">
            Set the population derivatives to zero (Eqs.&nbsp;41–42), subtract to eliminate the stimulated rate, solve
            for <Tex>{String.raw`N_a-N_b`}</Tex>. The result is the saturated inversion (Eq.&nbsp;46),{" "}
            <Tex>{String.raw`\mathscr{N}/(1+\mathscr{R}/R_s)`}</Tex>.
          </Step>
          <Step title="Insert into the field equation">
            Substitute Eq.&nbsp;46 into the eliminated field equation (Eq.&nbsp;37) to get Eq.&nbsp;47 with the full
            saturation denominator.
          </Step>
          <Step title="Expand to lowest order">
            Expand <Tex>{String.raw`1/(1+x)\approx 1-x`}</Tex>. The leading term is the linear gain{" "}
            <Tex>{String.raw`\mathscr{A}`}</Tex> (Eq.&nbsp;49); the next gives the cubic saturation{" "}
            <Tex>{String.raw`\mathscr{B}_c`}</Tex> (Eq.&nbsp;50) — yielding Eq.&nbsp;48, the Chapter&nbsp;VIII form.
          </Step>
          <Step title="Assemble the noise correlations">
            Combine the field-reservoir noise (Eqs.&nbsp;26–27) with the eliminated dipole noise weighted by{" "}
            <Tex>{String.raw`|\mathscr{D}|^2`}</Tex> (Eq.&nbsp;51). Using the steady-state populations (Eqs.&nbsp;53–55)
            gives the symmetrized total noise (Eq.&nbsp;56), the input to the linewidth.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Key idea — goal (1) achieved">
          Eq.&nbsp;48 <strong>is</strong> the semiclassical laser equation of Chapter&nbsp;VIII — linear gain, cubic
          saturation, detuning, loss. The Langevin derivation reproduces it <em>and</em> attaches the noise term the
          classical theory was missing.
        </Callout>
        <Callout kind="insight" title="Saturation clamps amplitude, not phase">
          The <Tex>{String.raw`\mathscr{B}_c(A^\dagger A)A`}</Tex> term depends only on intensity{" "}
          <Tex>{String.raw`|A|^2`}</Tex>, so it restores amplitude but is totally blind to phase. This asymmetry —
          visible right here in Eq.&nbsp;48 — is why phase will diffuse freely while amplitude is pinned.
        </Callout>
      </Section>

      {/* ───────────────────────── Section 6 ───────────────────────── */}
      <Section title="Classical limit and the laser linewidth">
        <Intuition>
          Above threshold the photon number is large, so replace the operator <Tex>{String.raw`A`}</Tex> by a c-number
          amplitude <Tex>{String.raw`\alpha = \sqrt{\bar n}\,e^{-i\phi}`}</Tex>. Split Eq.&nbsp;48 into real and
          imaginary parts. The punchline: <strong>amplitude</strong> fluctuations are restored by gain saturation (a
          stiff restoring force, narrow Gaussian about <Tex>{String.raw`\sqrt{\bar n_{ss}}`}</Tex>), but the{" "}
          <strong>phase</strong> has <em>no</em> restoring force — the noise drives a pure random walk. A linearly-growing
          phase variance <Tex>{String.raw`\langle\Delta\phi^2\rangle = 2\langle D(\dot\phi)\rangle\,t`}</Tex> is exactly
          a Lorentzian power spectrum whose FWHM is the linewidth — the Schawlow–Townes result, scaled up by the
          excess-spontaneous-emission factor <Tex>{String.raw`N_a/(N_a-N_b)`}</Tex>.
        </Intuition>
        <p>Pass to c-numbers and separate magnitude and phase:</p>
        <EqBlock label="57">{String.raw`a(t) = \mathrm{Tr}[\rho_R(\alpha)A(t)] = \langle\langle A(t)\rangle\rangle = \frac{E(t)}{\mathscr{E}}\,e^{-i\phi(t)}`}</EqBlock>
        <EqBlock label="58">{String.raw`\langle\langle A(t)\rangle\rangle\,\langle\langle A^\dagger(t)\rangle\rangle\,\langle\langle A(t)\rangle\rangle = a(t)\,|a(t)|^2`}</EqBlock>
        <p>
          The amplitude equation <strong>has</strong> a restoring force; the phase equation has <strong>none</strong>:
        </p>
        <EqBlock label="59">{String.raw`\dot E(t) = -\frac{1}{2}\frac{\nu}{Q}\,E(t) + \frac{1}{2}E(t)\Big[\mathscr{A} - \mathscr{B}\Big(\frac{E(t)}{\mathscr{E}}\Big)^2\Big]`}</EqBlock>
        <KeyResult
          number="60"
          eq={String.raw`\nu + \dot\phi = \Omega + \left(\frac{\omega-\nu}{\gamma}\right)\left[\mathscr{A} - \mathscr{B}\Big(\frac{E}{\mathscr{E}}\Big)^2\right]`}
          label="Phase equation — mode pulling, no restoring term"
          note="The phase rate carries only mode-pulling between cavity Ω and atomic ω — there is no φ-dependent restoring force, so phase is free to diffuse."
        />
        <p>The explicit real gain and saturation coefficients, and the steady-state photon number:</p>
        <EqBlock label="61">{String.raw`\mathscr{A} = 2\frac{g^2}{\gamma}\,\mathscr{N}\,\mathscr{S}(\omega-\nu)`}</EqBlock>
        <EqBlock label="62">{String.raw`\mathscr{B} = 2\mathscr{A}\,\frac{g^2}{\gamma R_s}\,\mathscr{S}(\omega-\nu)`}</EqBlock>
        <KeyResult
          number="63"
          eq={String.raw`\bar n_{ss} = \frac{\mathscr{A} - \nu/Q}{\mathscr{B}}`}
          label="Steady-state photon number"
          note="Set by net gain (𝒜 − ν/Q) over saturation ℬ. This is the laser's operating point — the radius of the phasor ring."
        />
        <p>The power spectrum is the Fourier transform of the field autocorrelation:</p>
        <EqBlock label="64">{String.raw`I(\omega) = \int_{-\infty}^{\infty} dt\,e^{-i\omega t}\,\langle A^\dagger(t)A(0)\rangle`}</EqBlock>
        <p>Above threshold, clamp the amplitude — only the phase fluctuates (the Fig.&nbsp;20-3 phasor):</p>
        <EqBlock label="65">{String.raw`A(t) = \sqrt{\bar n_{ss}}\,e^{-i\phi}`}</EqBlock>
        <EqBlock label="66">{String.raw`\langle A^\dagger(t)A(0)\rangle = \bar n_{ss}\,\big\langle e^{\,i[\phi(t)-\phi(0)]}\big\rangle`}</EqBlock>
        <p>For Gaussian phase diffusion the phase-factor average is an exponentially decaying autocorrelation:</p>
        <EqBlock label="66–68">{String.raw`\langle A^\dagger(t)A(0)\rangle = \bar n_{ss}\,e^{-\frac12\langle\Delta\phi^2\rangle} = \bar n_{ss}\,e^{-\langle D\phi\rangle|t|}`}</EqBlock>
        <KeyResult
          number="68"
          eq={String.raw`\langle A^\dagger(t)A(0)\rangle = \bar n_{ss}\,e^{-\langle D\phi\rangle|t|}`}
          label="Exponentially decaying autocorrelation ⟶ Lorentzian"
          note="Its Fourier transform is a Lorentzian, so the spectrum has FWHM = 2⟨D(φ̇)⟩. This confirms the Markoffian phase random walk."
        />
        <p>The phase change is the time integral of the (white-noise-driven) phase rate, so its variance grows linearly:</p>
        <EqBlock label="69">{String.raw`\Delta\phi(t) = \phi(t+\Delta t)-\phi(t) = \int_t^{t+\Delta t} dt'\,\dot\phi(t')`}</EqBlock>
        <EqBlock label="70">{String.raw`2i\,\frac{d\phi}{dt} = \frac{1}{A^\dagger}\frac{dA^\dagger}{dt} - \frac{1}{A}\frac{dA}{dt}`}</EqBlock>
        <EqBlock label="71">{String.raw`2i\dot\phi = \frac{1}{\sqrt{\bar n_{ss}}}\Big[e^{-i\phi}\,G^\dagger(t) - e^{i\phi}\,G(t)\Big] + \text{const}`}</EqBlock>
        <p>
          Square and average using the noise correlation (Eq.&nbsp;56). The{" "}
          <Tex>{String.raw`1/\sqrt{\bar n_{ss}}`}</Tex> in Eq.&nbsp;71 becomes <Tex>{String.raw`1/\bar n_{ss}`}</Tex> in
          the diffusion — more photons mean smaller phase kicks:
        </p>
        <EqBlock label="72">{String.raw`2\langle D(\dot\phi)\rangle = \frac{1}{2}\frac{1}{\bar n_{ss}}\left[\frac{\nu}{Q}\Big(\bar n+\tfrac12\Big) + \frac{g^2}{\gamma}\mathscr{S}(\omega-\nu)\,(N_a + N_b)\right]`}</EqBlock>
        <p>
          At threshold the saturated population difference equals the value making gain&nbsp;=&nbsp;loss, which collapses
          Eq.&nbsp;72:
        </p>
        <EqBlock label="73">{String.raw`N_a - N_b = \left[1 - 2\frac{g^2}{\gamma R_s}\mathscr{S}(\omega-\nu)\,\bar n_{ss}\right]\mathscr{N} \;\;\xrightarrow{\;\text{at threshold}\;}\;\; \text{gain}=\text{loss}`}</EqBlock>
        <KeyResult
          number="74"
          eq={String.raw`2\langle D(\dot\phi)\rangle = \frac{1}{2}\frac{\nu/Q}{\bar n_{ss}}\left[\bar n + \frac{1}{2} + \frac{1}{2}\frac{N_a+N_b}{N_a - N_b}\right] = \frac{1}{2}\frac{\nu/Q}{\bar n_{ss}}\left[\bar n + \frac{N_a}{N_a - N_b}\right]`}
          label="Reduced laser linewidth (Schawlow–Townes)"
          note={
            <>
              Cavity thermal (<Tex>{String.raw`\bar n`}</Tex>), vacuum (<Tex>{String.raw`\tfrac12`}</Tex>), and the
              excess-spontaneous-emission factor <Tex>{String.raw`N_a/(N_a-N_b)`}</Tex>. The headline result.
            </>
          }
        />
        <p>The medium average number (defined with a negative medium temperature <Tex>{String.raw`T_m`}</Tex>), and the two limiting forms of the linewidth:</p>
        <EqBlock label="75">{String.raw`\bar n_m = \frac{1}{e^{\hbar\omega/k_B T_m} - 1}`}</EqBlock>
        <EqBlock label="76">{String.raw`2\langle D(\dot\phi)\rangle \approx \frac{1}{2}\frac{\nu/Q}{\bar n_{ss}}\frac{k_B T_R}{\hbar\omega} \quad(\text{classical / low-frequency limit})`}</EqBlock>
        <KeyResult
          number="77"
          eq={String.raw`2\langle D(\dot\phi)\rangle = \frac{(g^2/\gamma)(N_a-N_b)}{\bar n_{ss}}\,\frac{N_a}{N_a - N_b} = \frac{N_a\,(g^2/\gamma)\,\mathscr{E}^2}{(\sqrt{\bar n_{ss}}\,\mathscr{E})^2}`}
          label="Final Schawlow–Townes linewidth"
          note="Half the cavity-loss rate divided by photon number, times the excess factor. Full inversion (N_b → 0) gives the narrowest, fully-inverted limit."
        />

        <Figure
          caption={
            <>
              Fig.&nbsp;20-3 brought to life. The phasor <Tex>{String.raw`A = \sqrt{\bar n_{ss}}\,e^{-i\phi}`}</Tex> has
              a clamped length but its tip is buffeted into a slow random walk around the circle. Spontaneous-emission
              kicks (orange) push the tip; saturation pulls it back radially (cyan), but nothing pulls it back
              tangentially — so the phase diffuses.
            </>
          }
        >
          <svg viewBox="0 0 520 260" width="100%" style={{ maxWidth: 520 }}>
            {/* axes */}
            <line x1="40" y1="130" x2="320" y2="130" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="180" y1="20" x2="180" y2="240" stroke="#cbd5e1" strokeWidth="1" />
            <text x="318" y="124" fontSize="12" fill="#94a3b8">Re A</text>
            <text x="186" y="28" fontSize="12" fill="#94a3b8">Im A</text>
            {/* clamp ring */}
            <circle cx="180" cy="130" r="86" fill="none" stroke="#0891b2" strokeWidth="1.6" strokeDasharray="5 4" />
            <text x="250" y="70" fontSize="11" fill="#0891b2">|A| = √n̄_ss</text>
            {/* diffusion arc */}
            <path d="M 244 92 A 86 86 0 0 1 188 44" fill="none" stroke="#4f46e5" strokeWidth="2" />
            <text x="120" y="56" fontSize="11" fill="#4f46e5">phase walks</text>
            {/* phasor */}
            <line x1="180" y1="130" x2="241" y2="69" stroke="#e11d48" strokeWidth="2.5" />
            <circle cx="241" cy="69" r="5" fill="#e11d48" />
            {/* radial restoring (saturation) */}
            <line x1="241" y1="69" x2="227" y2="83" stroke="#0891b2" strokeWidth="2" markerEnd="url(#arrowC)" />
            <text x="200" y="92" fontSize="10" fill="#0891b2">saturation (radial)</text>
            {/* tangential noise kicks */}
            <line x1="241" y1="69" x2="262" y2="58" stroke="#d97706" strokeWidth="1.8" markerEnd="url(#arrowO)" />
            <line x1="241" y1="69" x2="223" y2="58" stroke="#d97706" strokeWidth="1.8" markerEnd="url(#arrowO)" />
            <text x="262" y="46" fontSize="10" fill="#d97706">spontaneous-emission kicks</text>
            {/* right: linewidth as Lorentzian */}
            <text x="380" y="40" fontSize="12" fill="#1f2733" fontWeight="600">spectrum</text>
            <line x1="360" y1="200" x2="500" y2="200" stroke="#9aa3b2" strokeWidth="1" />
            <line x1="360" y1="60" x2="360" y2="200" stroke="#9aa3b2" strokeWidth="1" />
            <path
              d="M 360 198 C 410 196, 420 70, 430 70 C 440 70, 450 196, 500 198"
              fill="none"
              stroke="#0891b2"
              strokeWidth="2.4"
            />
            <line x1="402" y1="133" x2="458" y2="133" stroke="#e11d48" strokeWidth="1.4" strokeDasharray="3 3" />
            <text x="462" y="137" fontSize="10" fill="#e11d48">Δν</text>
            <text x="372" y="216" fontSize="10" fill="#5b6473">ω − ν</text>
            <defs>
              <marker id="arrowC" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#0891b2" />
              </marker>
              <marker id="arrowO" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#d97706" />
              </marker>
            </defs>
          </svg>
        </Figure>

        <SimFrame
          title="The laser phasor: amplitude clamping → phase diffusion → linewidth"
          caption={
            <>
              An ensemble of phasors integrates the saturated field Langevin equation (Eq.&nbsp;48) as a stochastic
              differential equation. Watch the cloud hug the ring of radius <Tex>{String.raw`\sqrt{\bar n_{ss}}`}</Tex>{" "}
              (amplitude clamped) while spreading in angle (phase walking). The phase-variance panel grows linearly with
              slope <Tex>{String.raw`2\langle D(\dot\phi)\rangle`}</Tex>, and the spectrum is the Lorentzian whose FWHM
              is the linewidth. (The clamped-amplitude picture holds well above threshold; very near threshold, where{" "}
              <Tex>{String.raw`\bar n_{ss}\lesssim 1`}</Tex>, the variance saturates and the line broadens beyond the
              formula — honest physics, since Schawlow–Townes assumes a large photon number.)
            </>
          }
          tryThis={
            <>
              Turn the pump <Tex>{String.raw`\mathscr{A}`}</Tex> up: more photons{" "}
              <Tex>{String.raw`\bar n_{ss}`}</Tex>, smaller relative phase kicks, and the Lorentzian visibly narrows.
              Now crank the excess factor <Tex>{String.raw`N_a/(N_a-N_b)`}</Tex>: incomplete inversion means more
              spontaneous emission per net photon, and the line fattens. Lower <Tex>{String.raw`\nu/Q`}</Tex> (higher Q)
              also narrows it. Drop <Tex>{String.raw`\mathscr{A}`}</Tex> below{" "}
              <Tex>{String.raw`\tfrac12\nu/Q`}</Tex> and the laser switches off — no ring, no coherence.
            </>
          }
        >
          <Ch20Sim />
        </SimFrame>

        <Derivation title="From the phasor to the linewidth">
          <Step title="c-numbers, amplitude vs phase">
            Replace <Tex>{String.raw`A`}</Tex> by <Tex>{String.raw`\sqrt{\bar n}\,e^{-i\phi}`}</Tex> (Eqs.&nbsp;57, 65).
            Splitting Eq.&nbsp;48 gives the amplitude equation (Eq.&nbsp;59, with a restoring saturation force) and the
            phase equation (Eq.&nbsp;60, with <em>no</em> restoring force).
          </Step>
          <Step title="Fix the operating point">
            Balance gain against loss: the saturated <Tex>{String.raw`\mathscr{A}`}</Tex> equals{" "}
            <Tex>{String.raw`\nu/2Q`}</Tex>, giving <Tex>{String.raw`\bar n_{ss}`}</Tex> (Eq.&nbsp;63).
          </Step>
          <Step title="Reduce to phase diffusion">
            Clamp the amplitude (Eq.&nbsp;65). The autocorrelation becomes{" "}
            <Tex>{String.raw`\bar n_{ss}\langle e^{i\Delta\phi}\rangle`}</Tex> (Eq.&nbsp;66). For Gaussian white-driven
            phase, <Tex>{String.raw`\langle e^{i\Delta\phi}\rangle = e^{-\langle\Delta\phi^2\rangle/2}`}</Tex> and{" "}
            <Tex>{String.raw`\langle\Delta\phi^2\rangle = 2\langle D(\dot\phi)\rangle|t|`}</Tex>, so it decays
            exponentially (Eqs.&nbsp;67–68).
          </Step>
          <Step title="Fourier transform to a Lorentzian">
            An exponentially decaying autocorrelation transforms to a Lorentzian whose FWHM equals{" "}
            <Tex>{String.raw`2\langle D(\dot\phi)\rangle`}</Tex> (Eq.&nbsp;68 + Eq.&nbsp;64). The linewidth{" "}
            <em>is</em> the phase diffusion coefficient.
          </Step>
          <Step title="Compute and reduce">
            Express <Tex>{String.raw`\dot\phi`}</Tex> via <Tex>{String.raw`G(t)`}</Tex> (Eqs.&nbsp;70–71), square, and
            average with Eq.&nbsp;56 to get Eq.&nbsp;72. At threshold (Eq.&nbsp;73) this collapses to the compact form
            (Eq.&nbsp;74), exposing the factor <Tex>{String.raw`N_a/(N_a-N_b)`}</Tex>. Setting{" "}
            <Tex>{String.raw`\bar n = 0`}</Tex> gives Eq.&nbsp;77.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Key idea — why the linewidth is finite">
          Amplitude noise is damped (saturation); phase noise is not. A free random walk of the phase gives a
          linearly-growing phase variance, hence an exponentially-decaying field autocorrelation, hence a Lorentzian of
          nonzero width. No phase restoring force ⇒ no zero linewidth. That is the entire chapter in one sentence.
        </Callout>
        <Callout kind="insight" title="The excess factor N_a/(N_a−N_b)">
          A four-level laser with empty lower level (<Tex>{String.raw`N_b\to 0`}</Tex>) gives factor{" "}
          <Tex>{String.raw`1`}</Tex> (minimum, fully-inverted Schawlow–Townes). A near-transparent medium (
          <Tex>{String.raw`N_b\to N_a`}</Tex>) makes the factor blow up: incomplete inversion means lots of spontaneous
          emission per net photon, broadening the line. Same physics as the laser-amplifier noise figure.
        </Callout>
        <Callout kind="note" title="Connection — the Brownian analogue">
          Eq.&nbsp;76 shows the classical limit reproduces Einstein&rsquo;s Brownian-motion relation (
          <Tex>{String.raw`k_B T/\text{energy}`}</Tex>), confirming the laser linewidth is literally Brownian motion of
          the optical phasor.
        </Callout>
      </Section>

      {/* ───────────────────────── Central results ───────────────────────── */}
      <Section title="The three results to keep">
        <KeyResult
          number="48"
          eq={String.raw`\dot A(t) = -\Big[\tfrac{1}{2}\frac{\nu}{Q} + i(\Omega-\nu)\Big]A(t) + \mathscr{A}\,A(t) - \mathscr{B}\,(A^\dagger A)\,A(t) + G(t)`}
          label="Saturated field Langevin equation"
          note="The master equation of the laser: loss + detuning, linear gain, cubic saturation, white noise. Its deterministic part is the semiclassical Chapter VIII equation; its noise part produces the linewidth."
        />
        <KeyResult
          number="74, 77"
          eq={String.raw`2\langle D(\dot\phi)\rangle = \frac{1}{2}\frac{\nu/Q}{\bar n_{ss}}\left[\bar n + \frac{N_a}{N_a - N_b}\right] \;\xrightarrow[\bar n\to0]{}\; \frac{N_a\,(g^2/\gamma)\,\mathscr{E}^2}{(\sqrt{\bar n_{ss}}\,\mathscr{E})^2}`}
          label="Schawlow–Townes laser linewidth"
          note="Scales as (cavity loss)/(photon number) — narrower for high-Q cavities and high power — times the excess factor, which is 1 for a fully inverted laser and diverges as the inversion vanishes."
        />
        <KeyResult
          number="18"
          eq={String.raw`\frac{d}{dt}\langle A_\mu A_\nu\rangle = \langle D_\mu A_\nu\rangle + \langle A_\mu D_\nu\rangle + 2\langle D_{\mu\nu}\rangle`}
          label="Generalized Einstein relation"
          note="The methodological backbone: the diffusion (noise) coefficient is rigidly fixed by the drift via fluctuation–dissipation. You never add noise by hand."
        />
      </Section>

      {/* ───────────────────────── Carry-forward ───────────────────────── */}
      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from this chapter">
          <ul>
            <li>
              <strong>The Langevin recipe</strong> — every open-system operator equation = deterministic{" "}
              <strong>drift</strong> + zero-mean white <strong>noise</strong> <Tex>{String.raw`F(t)`}</Tex>, with{" "}
              <Tex>{String.raw`\langle F(t)F(t')\rangle = 2\langle D\rangle\,\delta(t-t')`}</Tex>. Recurs in every later
              treatment of laser noise, photon statistics, and squeezing.
            </li>
            <li>
              <strong>The generalized Einstein relation</strong> — noise strength is fixed by drift
              (fluctuation–dissipation). You never put noise in by hand.
            </li>
            <li>
              <strong>Adiabatic elimination</strong> — when{" "}
              <Tex>{String.raw`\gamma,\gamma_a,\gamma_b \gg \nu/Q`}</Tex>, set the fast atomic derivatives to zero,
              solve algebraically, substitute. The standard tool for reduced laser / cavity-QED models.
            </li>
            <li>
              <strong>The saturated laser equation (Eq.&nbsp;48)</strong> — linear gain, cubic saturation, loss,
              detuning, noise — <em>is</em> the semiclassical Chapter&nbsp;VIII equation plus noise. It underlies the van
              der Pol oscillator model of the laser.
            </li>
            <li>
              <strong>The amplitude/phase asymmetry</strong> — saturation depends only on{" "}
              <Tex>{String.raw`|A|^2`}</Tex>, so it restores amplitude but never phase. The universal reason
              oscillators have stable power but finite linewidth.
            </li>
            <li>
              <strong>The Schawlow–Townes linewidth</strong>{" "}
              <Tex>{String.raw`\Delta\nu \sim \tfrac{\nu/Q}{2\bar n_{ss}}\,\tfrac{N_a}{N_a-N_b}`}</Tex> — inversely
              proportional to power and cavity Q, times the excess factor. Carry{" "}
              <Tex>{String.raw`N_a/(N_a-N_b)`}</Tex> into amplifier noise-figure and quantum-limit discussions.
            </li>
            <li>
              <strong>The +1 of spontaneous emission</strong> in{" "}
              <Tex>{String.raw`2\langle D_{aa^\dagger}\rangle = (\nu/Q)(\bar n + 1)`}</Tex> — the irreducible quantum
              noise surviving at <Tex>{String.raw`T = 0`}</Tex> that sets the quantum-limited linewidth.
            </li>
            <li>
              <strong>The Fourier triangle</strong> — a linearly-growing phase variance ⟷ exponentially-decaying field
              autocorrelation ⟷ Lorentzian power spectrum: the standard route from a stochastic phase model to an
              observable lineshape.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
