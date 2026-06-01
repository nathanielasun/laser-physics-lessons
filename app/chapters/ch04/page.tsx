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
import Ch04Sim from "@/components/sims/ch04";

export default function Page() {
  return (
    <Lesson slug="ch04">
      <Lede>
        A laser does not <em>fill up</em> with light the way a bucket fills with water. Switch it on and it settles into a
        steady oscillation whose amplitude is fixed not by how hard you push it, but by a balance between{" "}
        <strong>gain and saturation</strong> — exactly like the hum of a triode oscillator, a bowed violin string, or
        two pendulum clocks on a shared wall that mysteriously tick in step. This chapter is the classical dress
        rehearsal for the whole quantum laser. Strip away the photons and the atoms and keep the single feature that
        makes a laser a laser: a resonant circuit with <strong>negative, saturable resistance</strong> — the{" "}
        <strong>Van der Pol oscillator</strong>.
      </Lede>

      <Section title="The whole laser, disguised as a circuit">
        <Intuition>
          Picture a resonant <Tex>{String.raw`LC`}</Tex> tank wired to a vacuum-tube triode. The triode feeds energy
          back into the tank, behaving like a <strong>negative resistance</strong>: instead of damping the oscillation
          it amplifies it. But that negative resistance <strong>saturates</strong> — at large amplitude the tube can no
          longer supply proportional gain. That is the entire laser in disguise: <em>gain at low signal, saturation at
          high signal.</em> Three things follow, and every later quantum chapter reproduces them. (1) The oscillator
          starts from noise, grows exponentially, and clamps to a steady amplitude{" "}
          <Tex>{String.raw`V^2=\alpha/\beta`}</Tex> — the laser reaching steady-state intensity. (2) When the gain
          wildly exceeds the loss it stops humming and starts pulsing — relaxation oscillations, the spiking of a ruby
          laser. (3) Couple two such oscillators and they either <em>compete</em> (one mode wins → single-mode
          operation) or they <em>lock</em> (the beat note collapses → mode locking, ring-laser lock-in, injection
          locking).
        </Intuition>
        <Figure
          caption={
            <>
              <strong>Fig. 4-1.</strong> The single sustained oscillator: an <Tex>{String.raw`LC`}</Tex> tank whose
              losses are overcome by a triode that injects energy in phase with the voltage — a negative resistance that
              saturates at large signal.
            </>
          }
        >
          <svg viewBox="0 0 520 200" width="100%" style={{ maxWidth: 520 }}>
            {/* tank loop */}
            <rect x="40" y="40" width="200" height="120" fill="none" stroke="#94a3b8" strokeWidth="2" />
            {/* inductor (coil) */}
            <path
              d="M40 100 m0 0 q10 -16 20 0 q10 -16 20 0 q10 -16 20 0 q10 -16 20 0"
              transform="translate(-20 0)"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2.5"
            />
            <text x="60" y="86" fontSize="13" fill="#4f46e5">
              L
            </text>
            {/* capacitor plates on the right edge */}
            <line x1="240" y1="86" x2="240" y2="114" stroke="#0891b2" strokeWidth="0" />
            <line x1="232" y1="84" x2="248" y2="84" stroke="#0891b2" strokeWidth="3" />
            <line x1="232" y1="116" x2="248" y2="116" stroke="#0891b2" strokeWidth="3" />
            <text x="256" y="104" fontSize="13" fill="#0891b2">
              C
            </text>
            {/* triode / negative resistance block */}
            <rect x="320" y="60" width="150" height="80" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <text x="395" y="96" fontSize="13" fill="#b45309" textAnchor="middle">
              triode
            </text>
            <text x="395" y="114" fontSize="12" fill="#b45309" textAnchor="middle">
              −R (saturable)
            </text>
            {/* coupling wires */}
            <line x1="240" y1="80" x2="320" y2="80" stroke="#94a3b8" strokeWidth="2" />
            <line x1="240" y1="120" x2="320" y2="120" stroke="#94a3b8" strokeWidth="2" />
            {/* energy arrow */}
            <line x1="300" y1="170" x2="260" y2="170" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#ar)" />
            <text x="305" y="174" fontSize="12" fill="#15803d">
              energy in
            </text>
            <defs>
              <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
              </marker>
            </defs>
          </svg>
        </Figure>
        <p>
          The governing equation is the <strong>Van der Pol equation</strong>. Written in the book&rsquo;s derivative
          form, the damping coefficient is <Tex>{String.raw`(\alpha-3\beta' v^2)`}</Tex>: at small{" "}
          <Tex>{String.raw`v`}</Tex> it is effectively <Tex>{String.raw`-\alpha`}</Tex> (negative damping = gain,
          amplitude grows); at large <Tex>{String.raw`v`}</Tex> it turns positive (loss), clamping the oscillation.
        </p>
        <KeyResult
          number="1"
          eq={String.raw`\ddot v - \frac{d}{dt}\big(\alpha v - \beta' v^3\big) + \omega^2 v = 0 \;\;\Longleftrightarrow\;\; \ddot v - (\alpha - 3\beta' v^2)\,\dot v + \omega^2 v = 0`}
          label="Van der Pol equation"
          note={
            <>
              A resonant oscillator (frequency <Tex>{String.raw`\omega`}</Tex>) with negative, saturable resistance —
              the classical archetype of a laser: gain minus saturation. The two forms are identical; the derivative
              form makes the conserved cubic <Tex>{String.raw`3\beta'`}</Tex> explicit and fixes the envelope
              coefficient below.
            </>
          }
        />
        <p>
          The key technical move is the <strong>slowly-varying-amplitude (SVA) ansatz</strong>: write the voltage as a
          fast carrier <Tex>{String.raw`\exp(-i\omega t)`}</Tex> times a slowly drifting complex envelope{" "}
          <Tex>{String.raw`V(t)`}</Tex>. The <em>c.c.</em> keeps <Tex>{String.raw`v`}</Tex> real.
        </p>
        <EqBlock label="2">{String.raw`v(t) = \tfrac{1}{2}\,V(t)\exp(-i\omega t) + \text{c.c.}`}</EqBlock>
        <Callout kind="insight" title="Why ω ≫ α matters">
          The whole method assumes the envelope <Tex>{String.raw`V`}</Tex> drifts slowly compared with the carrier.
          Physically: the gain per optical cycle is tiny, so the oscillator looks sinusoidal on short timescales and only
          its amplitude evolves. Once this fails (<Tex>{String.raw`\alpha\gtrsim\omega`}</Tex>) the envelope overshoots,
          and for <Tex>{String.raw`\alpha\gg\omega`}</Tex> you get pronounced spiking instead — see the next section.
        </Callout>
        <p>
          Differentiating the SVA product is governed by a single rule. The piece proportional to{" "}
          <Tex>{String.raw`\dot V`}</Tex> is the small slow correction; the piece proportional to{" "}
          <Tex>{String.raw`V`}</Tex> is the dominant fast carrier. Keeping only first order in{" "}
          <Tex>{String.raw`\dot V`}</Tex> is the heart of the approximation:
        </p>
        <EqBlock label="3">{String.raw`\left(\frac{d}{dt}\right)^{n} V(t)\,e^{-i\omega t} = \big[\,n(-i\omega)^{n-1}\dot V + (-i\omega)^{n}V\,\big]\,e^{-i\omega t}.`}</EqBlock>
        <p>
          The nonlinearity feeds in through the cube of <Tex>{String.raw`v`}</Tex>. Only its fundamental-frequency part
          (at <Tex>{String.raw`\omega`}</Tex>) survives the rotating-wave-style averaging; the factor{" "}
          <Tex>{String.raw`\tfrac{3}{8}`}</Tex> counts the three ways to pick{" "}
          <Tex>{String.raw`e^{-i\omega t}`}</Tex> from the three factors (with the <Tex>{String.raw`\tfrac12`}</Tex>{" "}
          prefactors):
        </p>
        <EqBlock label="4">{String.raw`v^3\big|_{\text{fund}} = \tfrac{3}{8}\,V^3\,e^{-i\omega t} + \text{c.c.}`}</EqBlock>
        <p>
          Substituting (2)–(4) into the Van der Pol equation and collecting the terms at frequency{" "}
          <Tex>{String.raw`\omega`}</Tex> gives a single first-order equation. The two{" "}
          <Tex>{String.raw`\pm\omega^2 V`}</Tex> cancel, and writing{" "}
          <Tex>{String.raw`\beta\equiv\tfrac{3}{4}\beta'`}</Tex>:
        </p>
        <EqBlock label="5">{String.raw`-2i\omega\dot V - \omega^2 V - (\alpha - \beta V^2)(-i\omega V) + \omega^2 V = 0.`}</EqBlock>
        <p>Divide through by <Tex>{String.raw`-2i\omega`}</Tex> and the optical carrier is gone — only the envelope remains:</p>
        <KeyResult
          number="6"
          eq={String.raw`\dot V(t) = \tfrac{1}{2}\,(\alpha - \beta V^2)\,V(t), \qquad \beta = \tfrac{3}{4}\beta'`}
          label="Slowly-varying-amplitude (envelope) equation"
          note={
            <>
              The single most transferable result of the chapter. Gain term <Tex>{String.raw`\tfrac12\alpha V`}</Tex>{" "}
              drives growth; saturation term <Tex>{String.raw`-\tfrac12\beta V^3`}</Tex> clamps it. This one equation
              contains start-up, growth, and steady state.
            </>
          }
        />
        <Derivation title="Reduce Van der Pol to the envelope equation">
          <Step title="Insert the SVA ansatz">
            Substitute <Tex>{String.raw`v=\tfrac12 V e^{-i\omega t}+\text{c.c.}`}</Tex> (Eq. 2) into Eq. (1). Use the
            derivative rule (Eq. 3) with <Tex>{String.raw`n=2`}</Tex> for <Tex>{String.raw`\ddot v`}</Tex>: the carrier
            gives <Tex>{String.raw`(-i\omega)^2V=-\omega^2V`}</Tex> plus the slow correction{" "}
            <Tex>{String.raw`2(-i\omega)\dot V=-2i\omega\dot V`}</Tex>.
            <EqBlock>{String.raw`\ddot v \to \big[-2i\omega\dot V - \omega^2 V\big]e^{-i\omega t}.`}</EqBlock>
          </Step>
          <Step title="Reduce the nonlinear damping term to its fundamental">
            The term <Tex>{String.raw`-(\alpha-3\beta' v^2)\dot v`}</Tex> contains{" "}
            <Tex>{String.raw`v^2\dot v`}</Tex>. Keep only the piece oscillating at{" "}
            <Tex>{String.raw`\omega`}</Tex>; the cubic contributes via Eq. (4), and absorbing the prefactors with{" "}
            <Tex>{String.raw`\dot v\approx-i\omega V`}</Tex> gives the effective coefficient{" "}
            <Tex>{String.raw`\beta=\tfrac34\beta'`}</Tex>. (Drop the <Tex>{String.raw`\dot V`}</Tex> inside the nonlinear
            term — higher order in slowness.)
            <EqBlock>{String.raw`-(\alpha-3\beta' v^2)\dot v\big|_{\text{fund}} \to -(\alpha-\beta V^2)(-i\omega V)\,e^{-i\omega t}.`}</EqBlock>
          </Step>
          <Step title="Cancel the carrier and solve for V̇">
            Collecting fundamental terms gives Eq. (5). The <Tex>{String.raw`\omega^2 V`}</Tex> from the restoring force
            cancels the <Tex>{String.raw`-\omega^2 V`}</Tex> from <Tex>{String.raw`\ddot v`}</Tex>, leaving only{" "}
            <Tex>{String.raw`-2i\omega\dot V`}</Tex> balanced against gain/saturation. Divide by{" "}
            <Tex>{String.raw`-2i\omega`}</Tex>:
            <EqBlock>{String.raw`-2i\omega\dot V = (\alpha-\beta V^2)(-i\omega V) \;\Rightarrow\; \dot V = \tfrac12(\alpha-\beta V^2)V.`}</EqBlock>
          </Step>
        </Derivation>
      </Section>

      <Section title="Build-up, the steady amplitude V² = α/β, and relaxation spiking">
        <Intuition>
          Start the oscillator from tiny noise. While <Tex>{String.raw`V`}</Tex> is small the saturation term is
          negligible, so <Tex>{String.raw`V`}</Tex> grows exponentially — the laser building from spontaneous emission.
          As <Tex>{String.raw`V`}</Tex> grows, saturation eats into the gain until growth stops: the oscillator clamps
          to the limit cycle <Tex>{String.raw`V^2=\alpha/\beta`}</Tex>, set entirely by the ratio of gain to saturation,
          <em> not</em> by initial conditions. If <Tex>{String.raw`\omega\gg\alpha`}</Tex> the approach is smooth and
          monotonic. As <Tex>{String.raw`\alpha\gtrsim\omega`}</Tex> the amplitude begins to{" "}
          <strong>overshoot</strong> and the SVA picture breaks down; and once{" "}
          <Tex>{String.raw`\alpha\gg\omega`}</Tex> the overshoot becomes pronounced — saturation drives the gain
          negative, the field decays, the gain recovers, and the cycle repeats:{" "}
          <strong>relaxation oscillations</strong> — exactly the ruby-laser turn-on spiking.
        </Intuition>
        <p>
          At early times drop the saturation term. The envelope obeys a linear equation with pure exponential growth at
          rate <Tex>{String.raw`\alpha/2`}</Tex> (so the intensity <Tex>{String.raw`V^2`}</Tex> grows at rate{" "}
          <Tex>{String.raw`\alpha`}</Tex>):
        </p>
        <EqBlock label="7">{String.raw`\dot V(t) = \tfrac{1}{2}\,\alpha V(t),`}</EqBlock>
        <EqBlock label="8">{String.raw`V(t) = V(0)\,\exp\!\big(\tfrac{1}{2}\alpha t\big).`}</EqBlock>
        <p>
          Growth cannot continue forever. Impose the steady-state condition that the envelope stops changing:
        </p>
        <EqBlock label="9">{String.raw`\dot V(t) = 0.`}</EqBlock>
        <p>
          In Eq. (6) either <Tex>{String.raw`V=0`}</Tex> (the trivial, unstable state) or the bracket vanishes,{" "}
          <Tex>{String.raw`\alpha-\beta V^2=0`}</Tex>. The nonzero root is the stable limit cycle:
        </p>
        <KeyResult
          number="10"
          eq={String.raw`V^2 = \frac{\alpha}{\beta}`}
          label="Steady-state oscillation amplitude"
          note={
            <>
              The headline result for the single oscillator. The operating intensity is set by gain{" "}
              <Tex>{String.raw`\alpha`}</Tex> divided by saturation <Tex>{String.raw`\beta`}</Tex>, independent of how
              the oscillator started. This is the laser&rsquo;s steady-state intensity in classical form.
            </>
          }
        />
        <Derivation title="From buildup to the limit cycle, and the two regimes">
          <Step title="Linearize for early times">
            When <Tex>{String.raw`V`}</Tex> is small, <Tex>{String.raw`\beta V^2\ll\alpha`}</Tex>, so Eq. (6) collapses
            to Eq. (7). Integrate to get the exponential buildup Eq. (8).
          </Step>
          <Step title="Impose steady state">
            Set <Tex>{String.raw`\dot V=0`}</Tex> in Eq. (6):
            <EqBlock>{String.raw`\tfrac{1}{2}(\alpha-\beta V^2)V = 0 \;\Rightarrow\; V^2=\alpha/\beta.`}</EqBlock>
          </Step>
          <Step title="Identify the two dynamical regimes">
            The SVA derivation assumed <Tex>{String.raw`\omega\gg\alpha`}</Tex> (smooth buildup, negligible overshoot).
            Once <Tex>{String.raw`\alpha\gtrsim\omega`}</Tex> the buildup overshoots and the SVA picture begins to break
            down; and when <Tex>{String.raw`\alpha\gg\omega`}</Tex> the saturated gain swings strongly negative and the
            envelope undergoes pronounced repetitive buildup–decay cycles: relaxation oscillations. The clean
            single-limit-cycle picture no longer applies — only the full second-order ODE captures the spikes.
          </Step>
        </Derivation>
        <Callout kind="insight" title="Ruby spiking — the classical seed of rate-equation spiking">
          Relaxation oscillations occur in ruby because the gain (pumped inversion) recovers slowly compared with how
          fast the optical field depletes it: the intensity overshoots, the inversion is depleted faster than the pump
          replenishes it, the output crashes, the inversion rebuilds, and the laser fires again. Lamb makes this
          quantitative with rate equations in Chapter VIII; retain this picture as its classical origin.
        </Callout>
        <Callout kind="note" title="Buildup-from-noise, more carefully">
          Here the buildup is deterministic. The same problem treated <em>with</em> fluctuations — a genuine noise
          source seeding the oscillator — appears in Chapter XIX on Brownian motion. There the seed becomes a stochastic
          drive rather than a fixed initial condition.
        </Callout>
      </Section>

      <Section title="Two coupled tanks: normal modes of a multimode laser">
        <Intuition>
          Now couple two resonant tanks: one <strong>active</strong> tank carrying the nonlinear triode gain, and one{" "}
          <strong>passive</strong> tank with ordinary linear damping, linked by capacitors. This is the minimal model of
          a <strong>multimode laser</strong>: several cavity modes sharing one gain medium. The crucial asymmetry — only
          tank 1 carries the cubic nonlinearity (the gain); tank 2 is linear and lossy. Because the tanks are coupled,
          the natural oscillations are not the bare tank frequencies <Tex>{String.raw`\omega_1,\omega_2`}</Tex> but two{" "}
          <strong>normal modes</strong> at frequencies <Tex>{String.raw`\Omega_1,\Omega_2`}</Tex>, combinations of the
          bare frequencies shifted by the coupling. Solve the linear problem first to find the modes, then re-express the
          field as a superposition of normal modes with slowly varying amplitudes and apply SVA to each.
        </Intuition>
        <Figure
          caption={
            <>
              <strong>Fig. 4-2.</strong> Two coupled tanks. Tank 1 (active) carries the saturable gain; tank 2 (passive)
              is linearly lossy. The coupling capacitors mix them into two normal modes at{" "}
              <Tex>{String.raw`\Omega_1,\Omega_2`}</Tex>.
            </>
          }
        >
          <svg viewBox="0 0 520 200" width="100%" style={{ maxWidth: 520 }}>
            {/* tank 1 */}
            <rect x="30" y="50" width="150" height="110" fill="#fef3c7" stroke="#d97706" strokeWidth="2" rx="6" />
            <text x="105" y="44" fontSize="13" fill="#b45309" textAnchor="middle">
              tank 1 — active (gain)
            </text>
            <text x="105" y="115" fontSize="12" fill="#b45309" textAnchor="middle">
              α₁ v₁ − β′ v₁³
            </text>
            <text x="105" y="134" fontSize="12" fill="#b45309" textAnchor="middle">
              ω₁
            </text>
            {/* coupling caps */}
            <line x1="180" y1="90" x2="340" y2="90" stroke="#0891b2" strokeWidth="2" />
            <line x1="252" y1="80" x2="252" y2="100" stroke="#0891b2" strokeWidth="0" />
            <line x1="248" y1="78" x2="248" y2="102" stroke="#0891b2" strokeWidth="3" />
            <line x1="256" y1="78" x2="256" y2="102" stroke="#0891b2" strokeWidth="3" />
            <line x1="180" y1="130" x2="340" y2="130" stroke="#0891b2" strokeWidth="2" />
            <line x1="248" y1="118" x2="248" y2="142" stroke="#0891b2" strokeWidth="3" />
            <line x1="256" y1="118" x2="256" y2="142" stroke="#0891b2" strokeWidth="3" />
            <text x="252" y="68" fontSize="12" fill="#0891b2" textAnchor="middle">
              κ
            </text>
            {/* tank 2 */}
            <rect x="340" y="50" width="150" height="110" fill="#eef2ff" stroke="#4f46e5" strokeWidth="2" rx="6" />
            <text x="415" y="44" fontSize="13" fill="#3730a3" textAnchor="middle">
              tank 2 — passive (loss)
            </text>
            <text x="415" y="115" fontSize="12" fill="#3730a3" textAnchor="middle">
              α₂ v̇₂  (linear)
            </text>
            <text x="415" y="134" fontSize="12" fill="#3730a3" textAnchor="middle">
              ω₂
            </text>
          </svg>
        </Figure>
        <p>
          The two tank equations. Note the nonlinear gain term appears <em>only</em> in tank 1, and the coupling
          subscripts are asymmetric (<Tex>{String.raw`k_1\omega_1^2 v_2`}</Tex> in the active equation,{" "}
          <Tex>{String.raw`k_2\omega_2^2 v_1`}</Tex> in the passive one):
        </p>
        <EqBlock label="11">{String.raw`\ddot v_1 - \frac{d}{dt}\big(\alpha_1 v_1 - \beta' v_1^3\big) + \omega_1^2 v_1 + k_1\omega_1^2 v_2 = 0,`}</EqBlock>
        <EqBlock label="12">{String.raw`\ddot v_2 + \alpha_2\dot v_2 + \omega_2^2 v_2 + k_2\omega_2^2 v_1 = 0.`}</EqBlock>
        <p>
          To find the normal modes, drop the gain and loss and try a common-frequency solution{" "}
          <Tex>{String.raw`\Omega`}</Tex> in both tanks:
        </p>
        <EqBlock label="13">{String.raw`v_1 = v_{10}\,e^{-i\Omega t}, \qquad v_2 = v_{20}\,e^{-i\Omega t}.`}</EqBlock>
        <p>
          The two homogeneous equations have a nonzero solution only if their determinant vanishes — the{" "}
          <strong>secular equation</strong>, with <Tex>{String.raw`k^2=k_1k_2`}</Tex>:
        </p>
        <EqBlock label="14">{String.raw`\Omega^4 - (\omega_1^2 + \omega_2^2)\,\Omega^2 + (1 - k^2)\,\omega_1^2\omega_2^2 = 0.`}</EqBlock>
        <p>Its two roots are the squared normal-mode frequencies — an avoided crossing / mode repulsion:</p>
        <KeyResult
          number="15"
          eq={String.raw`\Omega_{1,2}^2 = \tfrac{1}{2}\Big[(\omega_1^2+\omega_2^2) \pm \big[(\omega_1^2-\omega_2^2)^2 + 4k^2\omega_1^2\omega_2^2\big]^{1/2}\Big].`}
          label="Normal-mode frequencies"
        />
        <p>
          Eliminating <Tex>{String.raw`v_2`}</Tex> between (11) and (12) — operate on (11) with the tank-2 operator and
          substitute (12) — yields a single equation in <Tex>{String.raw`v_1`}</Tex>, the coupled analogue of Van der
          Pol and the starting point for the two-mode SVA treatment:
        </p>
        <EqBlock label="16">{String.raw`\Big[\Big(\tfrac{d}{dt}\Big)^2 + \alpha_2\tfrac{d}{dt} + \omega_2^2\Big]\Big[\Big(\tfrac{d}{dt}\Big)^2 - \tfrac{d}{dt}\big(\alpha_1 - \beta' v_1^2\big) + \omega_1^2\Big] v_1 = k^2\omega_1^2\omega_2^2\,v_1.`}</EqBlock>
        <p>
          Now expand <Tex>{String.raw`v_1`}</Tex> as a superposition of the two normal modes, each with its own slowly
          varying amplitude — the multimode-laser field expansion:
        </p>
        <EqBlock label="17">{String.raw`v_1(t) = \tfrac{1}{2}\big[V_1\,e^{-i\Omega_1 t} + V_2\,e^{-i\Omega_2 t}\big] + \text{c.c.}`}</EqBlock>
        <p>
          Cube it and keep only the terms at the two fundamental frequencies. The combinatorics give each mode a{" "}
          <em>self</em>-saturation <Tex>{String.raw`V_n^2`}</Tex> plus a <em>cross</em>-saturation{" "}
          <Tex>{String.raw`2V_m^2`}</Tex> — the all-important factor of 2:
        </p>
        <KeyResult
          number="18–19"
          eq={String.raw`v_1^3\big|_{\text{fund}} = \tfrac{3}{8}\big[\,V_1(V_1^2 + 2V_2^2)\,e^{-i\Omega_1 t} + V_2(V_2^2 + 2V_1^2)\,e^{-i\Omega_2 t}\,\big] + \text{c.c.}`}
          label="Two-mode cubic — self- vs cross-saturation"
        />
        <Derivation title="Diagonalize, then re-couple through the nonlinearity">
          <Step title="Find the normal modes from the linear problem">
            Drop the gain (<Tex>{String.raw`\alpha_1,\beta'`}</Tex>) and loss (<Tex>{String.raw`\alpha_2`}</Tex>) terms
            from (11)–(12); insert the trial solution (13). Vanishing determinant gives the secular equation (14); the
            quadratic in <Tex>{String.raw`\Omega^2`}</Tex> gives the two frequencies (15).
          </Step>
          <Step title="Re-express the field in normal modes">
            Write <Tex>{String.raw`v_1`}</Tex> as the superposition (17), each mode carrying a slow amplitude. Apply the
            SVA derivative rule to each mode separately; the eliminated equation (16) is the working form.
          </Step>
          <Step title="Extract the cross-saturated cubic">
            Compute <Tex>{String.raw`v_1^3`}</Tex> and keep only terms at <Tex>{String.raw`\Omega_1,\Omega_2`}</Tex>. The
            combinatorics give each mode self-saturation <Tex>{String.raw`V_n^2`}</Tex> plus cross-saturation{" "}
            <Tex>{String.raw`2V_m^2`}</Tex> (Eqs. 18–19), setting up the coupled amplitude equations of the next section.
          </Step>
        </Derivation>
        <Callout kind="insight" title="The factor of 2 is the whole game">
          Cross-saturation (<Tex>{String.raw`2V_m^2`}</Tex>) being twice self-saturation (<Tex>{String.raw`V_n^2`}</Tex>)
          is why two modes generally cannot coexist: each mode hurts the other more than it hurts itself. This factor
          reappears in the quantum laser as the cross-saturation coefficient <Tex>{String.raw`\theta`}</Tex> versus
          self-saturation <Tex>{String.raw`\beta`}</Tex>, and decides single-mode versus multimode operation in Chapters
          IX–XII.
        </Callout>
      </Section>

      <Section title="Mode competition: which mode wins?">
        <Intuition>
          With the two mode amplitudes coupled through cross-saturation, the question becomes: which modes survive? Each
          mode has a net gain <Tex>{String.raw`a_{0n}`}</Tex> — the active-tank gain minus the passive-tank loss,
          weighted by how much that normal mode lives in the lossy tank. The coupled intensity equations are precisely{" "}
          <strong>Lotka–Volterra</strong> equations for competing species. Four stationary states exist: both modes off;
          only mode 1; only mode 2; both on. Linear stability analysis — perturb each state and watch whether the
          deviations grow — decides which is realized. The generic outcome of strong coupling:{" "}
          <strong>one mode wins and suppresses the other</strong> → single-mode laser operation.
        </Intuition>
        <p>
          The coupled intensity equations. Each mode grows by its net gain{" "}
          <Tex>{String.raw`a_{0n}`}</Tex> and is saturated by its own intensity plus <em>twice</em> the rival&rsquo;s,
          with a normal-mode projection prefactor:
        </p>
        <KeyResult
          number="24"
          eq={String.raw`\frac{d}{dt}(V_n^2) = V_n^2\left(\frac{\Omega_n^2-\omega_2^2}{\Omega_n^2-\Omega_m^2}\right)\big[\,a_{0n} - \beta(V_n^2 + 2V_m^2)\,\big], \quad n,m=1,2,\; m\neq n.`}
          label="Coupled mode-intensity equations"
        />
        <p>The net gain of normal mode <Tex>{String.raw`n`}</Tex> (it lases only if <Tex>{String.raw`a_{0n}>0`}</Tex>):</p>
        <EqBlock label="25">{String.raw`a_{0n} = a_1 - a_2\left(\frac{\Omega_n^2-\omega_1^2}{\Omega_n^2-\omega_2^2}\right) = a_1 - a_2\left[\frac{(\Omega_n^2-\omega_1^2)^2}{k^2\omega_1^2\omega_2^2}\right].`}</EqBlock>
        <p>Impose stationarity, the two-mode analogue of Eq. (9):</p>
        <EqBlock label="26">{String.raw`\frac{d}{dt}V_n^2 = 0.`}</EqBlock>
        <p>This admits four solutions. First, both modes off:</p>
        <EqBlock label="27">{String.raw`V_{1s}^2 = V_{2s}^2 = 0.`}</EqBlock>
        <p>
          Next, the two single-mode solutions — only mode <Tex>{String.raw`n`}</Tex> oscillates, the other is suppressed
          to zero. This is the exact analogue of <Tex>{String.raw`V^2=\alpha/\beta`}</Tex>, and these are the
          single-mode laser operating points:
        </p>
        <KeyResult
          number="28"
          eq={String.raw`V_{ns}^2 = \frac{a_{0n}}{\beta}, \qquad V_{ms}^2 = 0.`}
          label="Single-mode solutions"
        />
        <p>And the both-on solution, from inverting the cross-saturation matrix — typically unstable:</p>
        <EqBlock label="29">{String.raw`V_{ns}^2 = \frac{1}{3\beta}\,(2a_{0m} - a_{0n}).`}</EqBlock>
        <p>
          To test stability, perturb a stationary state and keep first order. The deviations{" "}
          <Tex>{String.raw`\varepsilon_n`}</Tex> obey a linear system whose matrix{" "}
          <Tex>{String.raw`\Theta`}</Tex> decides everything:
        </p>
        <EqBlock label="30">{String.raw`V_n^2(t) = V_{ns}^2 + \varepsilon_n(t),`}</EqBlock>
        <EqBlock label="31">{String.raw`\dot\varepsilon_n = \Theta_{nn}\varepsilon_n + \Theta_{nm}\varepsilon_m.`}</EqBlock>
        <KeyResult
          number="32"
          eq={String.raw`\Theta = -\beta\begin{pmatrix} V_{1s}^2 & 2V_{1s}^2 \\[4pt] 2V_{2s}^2 & V_{2s}^2 \end{pmatrix}\!\big(\text{projection weights}\big)`}
          label="Stability matrix Θ"
          note={
            <>
              Diagonal = self-saturation; off-diagonal = cross-saturation, carrying the factor 2 (each entry also bears a
              normal-mode projection weight <Tex>{String.raw`(\Omega_n^2-\omega_\cdot^2)/(\Omega_n^2-\omega_\cdot^2)`}</Tex>{" "}
              that does not change the sign structure). For the single-mode solutions the eigenvalues are negative
              (stable); for the both-on solution one eigenvalue is positive (unstable).
            </>
          }
        />
        <p>
          A useful check on all of this normal-mode algebra is the frequency sum rule: coupling redistributes but
          conserves the sum of squared frequencies,
        </p>
        <EqBlock label="23">{String.raw`\Omega_1^2 + \Omega_2^2 = \omega_1^2 + \omega_2^2.`}</EqBlock>
        <Derivation title="Four states, then test their stability">
          <Step title="Reduce to intensity equations">
            Take the imaginary part of the eliminated mode equation (16) for each mode (the real part vanishes by the
            normal-mode condition 15). Multiplying by{" "}
            <Tex>{String.raw`V_n/[\Omega_n(\Omega_n^2-\Omega_m^2)]`}</Tex> and transposing gain/loss gives the intensity
            equations (24) with net gain (25).
          </Step>
          <Step title="Find the four stationary states">
            Set <Tex>{String.raw`d(V_n^2)/dt=0`}</Tex>. The bracket{" "}
            <Tex>{String.raw`[a_{0n}-\beta(V_n^2+2V_m^2)]=0`}</Tex> together with the trivial{" "}
            <Tex>{String.raw`V_n^2=0`}</Tex> branch yields (27) both off, (28) two single-mode states, and (29) both on
            (solve the <Tex>{String.raw`2\times2`}</Tex> linear system).
          </Step>
          <Step title="Linearize and test stability">
            Insert <Tex>{String.raw`V_n^2=V_{ns}^2+\varepsilon_n`}</Tex> (30) into (24), keep first order →{" "}
            (31) with matrix <Tex>{String.raw`\Theta`}</Tex> (32). Its eigenvalues: single-mode solutions →{" "}
            negative (stable, deviations damp); both-on → a positive eigenvalue (unstable). Conclusion: one mode wins.
          </Step>
        </Derivation>
        <Callout kind="insight" title="This IS single-mode selection">
          Lamb: <em>&ldquo;in general only one of the two modes will succeed in oscillating, and which one depends on
          initial conditions.&rdquo;</em> The factor-of-2 cross-saturation makes simultaneous oscillation unstable. Carry
          this into Chapter IX, where the same <Tex>{String.raw`\Theta`}</Tex>-matrix logic decides single- versus
          multi-mode laser operation.
        </Callout>
        <Callout kind="note" title="Lotka–Volterra / population dynamics">
          The book cites Volterra, Lotka, and Montroll on competing biological species, neural excitations, and
          turbulent fluid eddies. The math of which mode survives is the math of which species survives — the same
          quadratic competition with self- and cross-coupling.
        </Callout>
      </Section>

      <Section title="Frequency locking: the driven oscillator and Adler's equation">
        <Intuition>
          Christiaan Huygens, sick in bed in 1665, noticed that two pendulum clocks on the same wall always ended up
          swinging in exact antiphase — even after he disturbed them, they returned to lockstep within half an hour. The
          coupling was a faint vibration through the wall. This is <strong>frequency locking</strong>: when two
          oscillators are weakly coupled (or one is driven) and their natural frequencies are close, they abandon their
          individual frequencies and oscillate as <em>one</em>. Drive the triode oscillator with an external EMF at
          frequency <Tex>{String.raw`\nu`}</Tex>, apply SVA but now let the envelope&rsquo;s <strong>phase</strong>{" "}
          <Tex>{String.raw`\Psi`}</Tex> slip relative to the drive, and you get Adler&rsquo;s equation. If the detuning
          is smaller than the locking strength, the phase locks; otherwise it slips and a beat note survives.
        </Intuition>
        <p>The driven Van der Pol oscillator — the injection-locking model:</p>
        <EqBlock label="33">{String.raw`\ddot v - (\alpha - 3\beta' v^2)\dot v + \omega^2 v = \nu^2 V_0 \sin\nu t.`}</EqBlock>
        <p>
          Adopt an SVA ansatz at the <em>drive</em> frequency <Tex>{String.raw`\nu`}</Tex>, with a slowly varying
          amplitude <Tex>{String.raw`V`}</Tex> and a slowly varying phase <Tex>{String.raw`\Psi`}</Tex> measuring the
          phase slip relative to the drive:
        </p>
        <EqBlock label="34">{String.raw`v(t) = \tfrac{1}{2}V(t)\,\exp\!\big[-i(\nu t + \Psi)\big] + \text{c.c.}`}</EqBlock>
        <p>Substituting into (33) and keeping fundamental terms gives the reduced driven equation:</p>
        <EqBlock label="35">{String.raw`-2i\nu\dot V - (\nu + \dot\Psi)^2 V - (\alpha - \beta V^2)(-i\nu)V + \omega^2 V = i\,\nu^2 V_0\,e^{i\Psi}.`}</EqBlock>
        <p>
          The imaginary part is the amplitude equation (drive in the cosine, in-phase quadrature); for weak drive{" "}
          <Tex>{String.raw`V`}</Tex> stays near its free value <Tex>{String.raw`\sqrt{\alpha/\beta}`}</Tex>:
        </p>
        <EqBlock label="36">{String.raw`\dot V = \tfrac{1}{2}(\alpha - \beta V^2)V - \tfrac{1}{2}\nu V_0\cos\Psi.`}</EqBlock>
        <p>The real part is the phase equation — <strong>Adler&rsquo;s equation</strong>, drive in the sine quadrature:</p>
        <KeyResult
          number="37"
          eq={String.raw`\dot\Psi = (\omega - \nu) + \tfrac{1}{2}\nu\frac{V_0}{V}\sin\Psi = d + l\sin\Psi, \qquad d = \omega-\nu,\;\; l = \tfrac{1}{2}\nu\frac{V_0}{V}.`}
          label="Adler's equation & the locking condition"
          note={
            <>
              <Tex>{String.raw`d`}</Tex> is the detuning, <Tex>{String.raw`l`}</Tex> the locking coefficient
              (proportional to drive amplitude <Tex>{String.raw`V_0`}</Tex>). A stationary phase{" "}
              <Tex>{String.raw`\dot\Psi=0`}</Tex> exists, so the oscillator locks, <em>iff</em>{" "}
              <Tex>{String.raw`|d|\le|l|`}</Tex>.
            </>
          }
        />
        <Derivation title="From the driven oscillator to the locking band">
          <Step title="Drive and adopt a phase-bearing SVA">
            Add <Tex>{String.raw`\nu^2V_0\sin\nu t`}</Tex> to Van der Pol (33). Write <Tex>{String.raw`v`}</Tex> with the
            ansatz (34) at the drive frequency, carrying both slow <Tex>{String.raw`V`}</Tex> and slow{" "}
            <Tex>{String.raw`\Psi`}</Tex>. Substitute and keep fundamental terms → Eq. (35).
          </Step>
          <Step title="Split into amplitude and phase equations">
            Equate real and imaginary parts of (35) separately to zero (with{" "}
            <Tex>{String.raw`\omega\approx\nu`}</Tex> inside slowly varying coefficients). The imaginary part gives the
            amplitude equation (36) with the cosine drive; the real part gives the phase equation (37) with the sine
            drive. Define <Tex>{String.raw`d=\omega-\nu`}</Tex> and <Tex>{String.raw`l=\tfrac12\nu V_0/V`}</Tex>.
          </Step>
          <Step title="Read off the locking condition">
            For weak drive, set <Tex>{String.raw`V\approx\sqrt{\alpha/\beta}`}</Tex> (Eq. 10), so{" "}
            <Tex>{String.raw`l`}</Tex> is constant. Adler&rsquo;s equation has a fixed point only when the sine can
            cancel the detuning:
            <EqBlock>{String.raw`\dot\Psi = 0 \;\Rightarrow\; \sin\Psi = -\frac{d}{l}, \quad \text{solvable iff } |d| \le |l|.`}</EqBlock>
            Inside this band the phase locks to a constant; outside, <Tex>{String.raw`\sin\Psi`}</Tex> can never cancel{" "}
            <Tex>{String.raw`d`}</Tex>, so <Tex>{String.raw`\Psi`}</Tex> slips monotonically — a residual beat. As{" "}
            <Tex>{String.raw`|d|\to|l|`}</Tex> the beat period diverges (slow drift near the would-be fixed point, fast
            elsewhere) — exactly Rayleigh&rsquo;s observation.
          </Step>
        </Derivation>

        <SimFrame
          title="Van der Pol laser-oscillator sandbox"
          caption={
            <>
              Integrate the full driven Van der Pol equation (Eq. 1 / Eq. 33) with RK4 and overlay the reduced SVA
              envelope (Eqs. 6 / 36–37). Watch the field build from noise, clamp to its limit cycle{" "}
              <Tex>{String.raw`V^2=\alpha/\beta`}</Tex>, spike when <Tex>{String.raw`\alpha\gg\omega`}</Tex>, and lock
              to the drive inside the band <Tex>{String.raw`|d|<|l|`}</Tex>. Because{" "}
              <Tex>{String.raw`\beta=\tfrac34\beta'`}</Tex> is matched to the full-ODE cubic, both models share the same
              limit cycle — so any gap you see in the time series is the SVA approximation breaking down, not a bug.
            </>
          }
          tryThis={
            <>
              Keep <Tex>{String.raw`V_0=0`}</Tex>: drag the seed <Tex>{String.raw`v_0`}</Tex> and confirm the steady
              amplitude is unchanged — the limit cycle is an attractor. Now raise{" "}
              <Tex>{String.raw`\alpha`}</Tex>: near <Tex>{String.raw`\alpha\approx\omega`}</Tex> the smooth circle in the
              phase plane begins to distort (the badge reads <strong>relaxation onset</strong>), but pronounced spikes
              need <Tex>{String.raw`\alpha\gg\omega`}</Tex>. Push the ratio <Tex>{String.raw`\alpha/\omega`}</Tex> up
              toward 3–4 or more (easiest by lowering <Tex>{String.raw`\omega`}</Tex>): the circle sharpens into a
              relaxation loop and the time series breaks into spikes once the badge reads{" "}
              <strong>relaxation oscillations (spiking)</strong> — and the SVA envelope (which cannot overshoot) visibly
              departs from the truth. Finally turn on the drive (<Tex>{String.raw`V_0>0`}</Tex>) and
              sweep <Tex>{String.raw`\nu`}</Tex>: inside <Tex>{String.raw`|d|\le|l|`}</Tex> the Adler curve dips through
              zero (a fixed point, badge turns <strong>LOCKED</strong>); push <Tex>{String.raw`\nu`}</Tex> out and the
              curve lifts off the axis, the beat period diverging as you cross the boundary.
            </>
          }
        >
          <Ch04Sim />
        </SimFrame>

        <Callout kind="insight" title="This is mode locking and injection locking">
          Adler&rsquo;s equation is the classical template for: mode locking of multimode laser operation (Section 9-3,
          yielding trains of light pulses), the locking of oppositely running waves in a ring laser (Chapter XI — the
          lock-in that limits ring-laser gyroscopes), and oppositely directed circular polarizations in a Zeeman laser
          (Chapter XII). Same <Tex>{String.raw`|d|`}</Tex> versus <Tex>{String.raw`|l|`}</Tex> in each case.
        </Callout>
        <Callout kind="history" title="Huygens to Rayleigh">
          Huygens (1665) — two pendulum clocks lock antiphase via wall vibration. Rayleigh (1907) — driven tuning forks
          lock until a critical detuning, then the beat reappears (&ldquo;the changes are very slow at the opposite part
          relatively quick&rdquo;). Both are <Tex>{String.raw`|d|`}</Tex> versus <Tex>{String.raw`|l|`}</Tex> in disguise.
        </Callout>
        <Callout kind="insight" title="Locking as a phase transition">
          Chapter XXI relates mode locking to a second-order phase transition. Locking is the ordered (broken-symmetry)
          phase; the unlocked beat is the disordered phase; the threshold{" "}
          <Tex>{String.raw`|d|=|l|`}</Tex> is the critical point — the same mathematics as ferromagnetism and
          superconductivity.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you carry into the quantum laser">
          <ul>
            <li>
              <strong>The SVA method</strong> — factor the field into a fast carrier{" "}
              <Tex>{String.raw`e^{-i\omega t}`}</Tex> and a slow envelope, keep only fundamental-frequency terms, and
              reduce a hard nonlinear second-order ODE to a first-order envelope equation. The workhorse of semiclassical
              laser theory in Chapters VIII–XII.
            </li>
            <li>
              <strong>Steady amplitude</strong> <Tex>{String.raw`V^2=\alpha/\beta`}</Tex> — operating intensity is set by
              gain ÷ saturation, not by initial conditions. The single-mode operating point{" "}
              <Tex>{String.raw`V^2=a_0/\beta`}</Tex> is the direct quantum-era descendant.
            </li>
            <li>
              <strong>Relaxation spiking</strong> for <Tex>{String.raw`\alpha\gg\omega`}</Tex> (overshoot begins already
              at <Tex>{String.raw`\alpha\gtrsim\omega`}</Tex>) — overshoot, deplete, decay, recover, repeat. Ruby-laser
              turn-on, made quantitative by rate equations in Chapter VIII.
            </li>
            <li>
              <strong>The factor-of-2 cross-saturation</strong> — mode <Tex>{String.raw`m`}</Tex> saturates mode{" "}
              <Tex>{String.raw`n`}</Tex> via <Tex>{String.raw`2V_m^2`}</Tex> but itself via{" "}
              <Tex>{String.raw`V_n^2`}</Tex>. Why modes compete and simultaneous oscillation is usually unstable →
              single-mode operation. Reappears as <Tex>{String.raw`\theta`}</Tex> versus{" "}
              <Tex>{String.raw`\beta`}</Tex> in Chapter IX.
            </li>
            <li>
              <strong>Mode competition by stability</strong> — the <Tex>{String.raw`\Theta`}</Tex> matrix selects which
              stationary state is realized. The same machinery selects lasing modes in real lasers.
            </li>
            <li>
              <strong>Adler&rsquo;s equation</strong> <Tex>{String.raw`\dot\Psi=d+l\sin\Psi`}</Tex> and{" "}
              <Tex>{String.raw`|d|<|l|`}</Tex> — the classical template for mode locking (Chapter IX), ring-laser lock-in
              (Chapter XI), and Zeeman-laser polarization locking (Chapter XII).
            </li>
            <li>
              <strong>The <Tex>{String.raw`d`}</Tex>-versus-<Tex>{String.raw`l`}</Tex> phase transition</strong> — locked
              = ordered, unlocked = disordered, foreshadowing Chapter XXI&rsquo;s link to ferromagnetism and
              superconductivity.
            </li>
            <li>
              <strong>Normal-mode thinking</strong> — diagonalize the linear problem first (frequencies from the secular
              equation, sum rule <Tex>{String.raw`\Omega_1^2+\Omega_2^2=\omega_1^2+\omega_2^2`}</Tex>),{" "}
              <em>then</em> apply SVA to each mode. This decouple-then-recouple strategy recurs throughout multimode laser
              analysis.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
