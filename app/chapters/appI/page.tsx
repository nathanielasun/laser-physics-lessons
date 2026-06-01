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
import AppISim from "@/components/sims/appI";

export default function Page() {
  return (
    <Lesson slug="appI">
      <Lede>
        A laser is two coupled quantum systems trading energy: a stream of excited atoms injected into a cavity, and
        the quantized field in the lasing mode. Everything interesting — gain, saturation, and crucially the laser&rsquo;s
        finite linewidth — lives in the <em>correlations</em> between atom and field. This appendix derives, from the
        global state vector, the equation of motion for the reduced field density matrix{" "}
        <Tex>{String.raw`\rho_{nm}`}</Tex>, valid for unequal decays{" "}
        <Tex>{String.raw`\gamma_a\neq\gamma_b`}</Tex>. The payoff at the end is sharp: <em>factorize</em> the atom-field
        density matrix into a product and you throw away exactly the correlation responsible for spontaneous emission
        into the lasing mode — and you recover the semiclassical equations of Chapter&nbsp;VII. The same approximation
        that makes the math classical is the one that sets the laser linewidth to zero.
      </Lede>

      <Section title="The atomic level scheme and what we are computing">
        <Intuition>
          Picture the four-level atom of Fig.&nbsp;I-1. A pump injects atoms into the upper lasing level{" "}
          <Tex>{String.raw`a`}</Tex> at rate <Tex>{String.raw`r_a`}</Tex> (the book also allows a second pump{" "}
          <Tex>{String.raw`r_b`}</Tex> into level <Tex>{String.raw`b`}</Tex>, which we take{" "}
          <Tex>{String.raw`r_b=0`}</Tex> throughout); the lasing transition is{" "}
          <Tex>{String.raw`a\to b`}</Tex> at frequency <Tex>{String.raw`\omega`}</Tex>. But both <Tex>{String.raw`a`}</Tex>{" "}
          and <Tex>{String.raw`b`}</Tex> can also decay spontaneously <em>out</em> of the lasing manifold into side
          levels — <Tex>{String.raw`a\to c`}</Tex> at rate <Tex>{String.raw`\gamma_a`}</Tex>,{" "}
          <Tex>{String.raw`b\to d`}</Tex> at rate <Tex>{String.raw`\gamma_b`}</Tex>. The field oscillates at the cavity
          frequency <Tex>{String.raw`\nu`}</Tex>, generally detuned from <Tex>{String.raw`\omega`}</Tex>. This is the
          standard laser model of Chapter&nbsp;XVII — but here we do <strong>not</strong> assume{" "}
          <Tex>{String.raw`\gamma_a=\gamma_b`}</Tex>.
        </Intuition>
        <p>
          The whole appendix has one goal: derive the equation of motion for the reduced <em>field</em> density matrix{" "}
          <Tex>{String.raw`\rho_{nm}(t)`}</Tex> — the matrix in the photon-number (Fock) basis that describes the cavity
          field after the atoms and reservoirs have been traced out. Spontaneous emission is treated by
          Weisskopf–Wigner theory; this is the one place the irreversibility of the laser enters.
        </p>
        <EqBlock label="Fig. I-1">{String.raw`r_a \;:\; \text{atoms injected into level } a \text{ per unit time}`}</EqBlock>
        <p>The decay/transition channels of the four-level scheme are:</p>
        <EqBlock>{String.raw`a \xrightarrow{\;\omega\;} b,\qquad a \xrightarrow{\;\gamma_a\;} c,\qquad b \xrightarrow{\;\gamma_b\;} d.`}</EqBlock>
        <p>
          The lasing transition <Tex>{String.raw`a\to b`}</Tex> is the only one coupled to the cavity mode; the two
          spontaneous decays drain probability irreversibly into the side levels. Equal spacing of the levels is assumed
          so the spontaneous-emission lines coincide in frequency, and the energy spacings and detuning{" "}
          <Tex>{String.raw`\omega-\nu`}</Tex> are kept general so the result reduces correctly to earlier special cases.
        </p>

        <Figure
          caption={
            <>
              <strong>Fig.&nbsp;I-1.</strong> The four-level laser atom. Pump (rate{" "}
              <Tex>{String.raw`r_a`}</Tex>) injects atoms into the upper lasing level <Tex>{String.raw`a`}</Tex>. The
              lasing transition <Tex>{String.raw`a\to b`}</Tex> (frequency <Tex>{String.raw`\omega`}</Tex>) couples to
              the cavity mode; spontaneous decays <Tex>{String.raw`a\to c`}</Tex> (rate{" "}
              <Tex>{String.raw`\gamma_a`}</Tex>) and <Tex>{String.raw`b\to d`}</Tex> (rate{" "}
              <Tex>{String.raw`\gamma_b`}</Tex>) leak probability out of the lasing manifold.
            </>
          }
        >
          <svg viewBox="0 0 460 300" style={{ width: "100%", maxWidth: 460, height: "auto" }}>
            {/* level lines */}
            {/* a (upper) */}
            <line x1="120" y1="50" x2="240" y2="50" stroke="#1f2733" strokeWidth="3" />
            <text x="246" y="55" fontSize="15" fontWeight="600" fill="#1f2733">|a⟩</text>
            {/* b (lower lasing) */}
            <line x1="120" y1="200" x2="240" y2="200" stroke="#1f2733" strokeWidth="3" />
            <text x="246" y="205" fontSize="15" fontWeight="600" fill="#1f2733">|b⟩</text>
            {/* c (side, a-sink) */}
            <line x1="300" y1="120" x2="400" y2="120" stroke="#64748b" strokeWidth="2.5" />
            <text x="406" y="125" fontSize="14" fill="#64748b">|c⟩</text>
            {/* d (side, b-sink) */}
            <line x1="300" y1="262" x2="400" y2="262" stroke="#64748b" strokeWidth="2.5" />
            <text x="406" y="267" fontSize="14" fill="#64748b">|d⟩</text>

            {/* pump into a */}
            <defs>
              <marker id="arrI" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#16a34a" />
              </marker>
              <marker id="arrW" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#4f46e5" />
              </marker>
              <marker id="arrG" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#e11d48" />
              </marker>
            </defs>
            {/* pump arrow up into a */}
            <line x1="60" y1="270" x2="150" y2="58" stroke="#16a34a" strokeWidth="2.5" markerEnd="url(#arrI)" />
            <text x="40" y="285" fontSize="13" fill="#16a34a">{`pump  r_a`}</text>

            {/* lasing transition a -> b */}
            <line x1="180" y1="56" x2="180" y2="194" stroke="#4f46e5" strokeWidth="2.5" markerEnd="url(#arrW)" />
            <text x="120" y="130" fontSize="14" fill="#4f46e5" textAnchor="end">{`ω`}</text>
            <text x="86" y="148" fontSize="11" fill="#4f46e5" textAnchor="end">{`lase a→b`}</text>

            {/* spontaneous a -> c */}
            <line x1="240" y1="56" x2="305" y2="114" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrG)" />
            <text x="258" y="78" fontSize="13" fill="#e11d48">{`γ_a`}</text>
            {/* spontaneous b -> d */}
            <line x1="240" y1="206" x2="305" y2="256" stroke="#e11d48" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#arrG)" />
            <text x="258" y="244" fontSize="13" fill="#e11d48">{`γ_b`}</text>
          </svg>
        </Figure>

        <Callout kind="note" title="Where this sits">
          This appendix is the quantum-mechanical derivation underneath Chapters&nbsp;XVII (quantum laser) and
          VII&nbsp;/&nbsp;VIII (semiclassical laser). Eqs.&nbsp;(1)–(24) build the quantum master equation;
          Eqs.&nbsp;(25)–(31) collapse it to the semiclassical theory.
        </Callout>
      </Section>

      <Section title="From the global state vector to the reduced field density matrix">
        <Intuition>
          The honest starting point is the wavefunction of <em>everything</em>: the atom (levels{" "}
          <Tex>{String.raw`a,b`}</Tex> plus the side/reservoir levels), the lasing field mode, and the multimode
          reservoir into which spontaneous photons escape. We do not want all of it — we want only the field. So we
          trace over atom and reservoir. Tracing collapses the giant outer product{" "}
          <Tex>{String.raw`|\psi\rangle\langle\psi|`}</Tex> into a sum of pieces diagonal in the traced variables; what
          survives, organized in the photon-number basis <Tex>{String.raw`|n\rangle\langle m|`}</Tex>, is the reduced
          field density matrix <Tex>{String.raw`\rho_{nm}`}</Tex>.
        </Intuition>
        <p>
          Write the most general atom + lasing-field + reservoir state, expanded over photon number{" "}
          <Tex>{String.raw`n`}</Tex>. For each <Tex>{String.raw`n`}</Tex>, the atom is either still in the lasing
          manifold (in <Tex>{String.raw`a`}</Tex> with <Tex>{String.raw`n`}</Tex> photons and no reservoir photon, or
          in <Tex>{String.raw`b`}</Tex> with <Tex>{String.raw`n+1`}</Tex> photons — it emitted one into the mode), or it
          has decayed to a side level <Tex>{String.raw`c,d`}</Tex> while creating one reservoir photon{" "}
          <Tex>{String.raw`|1_r\rangle`}</Tex>:
        </p>
        <EqBlock label="1">{String.raw`|\psi_{a\text{-}r}(t)\rangle = \sum_n \Big\{ \big[C_{an|0\rangle}(t)|a\rangle + C_{bn|0\rangle}(t)|b\rangle\big]\,|\{0\}\rangle + \sum_r \big[C_{cn|1_r\rangle}(t)|c\rangle + C_{dn|1_r\rangle}(t)|d\rangle\big]\,|1_r\rangle \Big\}\,|n\rangle.`}</EqBlock>
        <p>
          Forming the density operator (weighted by the ensemble distribution{" "}
          <Tex>{String.raw`P_{\psi}`}</Tex> over injected states) and keeping only the terms diagonal in the traced
          atom/reservoir labels gives the reduced field matrix:
        </p>
        <EqBlock label="2">{String.raw`\rho_{a\text{-}r}(t) = \sum_{\psi} P_{\psi}\,|\psi_{a\text{-}r}(t)\rangle\langle\psi_{a\text{-}r}(t)|.`}</EqBlock>
        <p>
          Reading off the surviving blocks — amplitude times conjugate amplitude — gives one field-matrix contribution
          per atomic level. From atoms still in the upper lasing level <Tex>{String.raw`a`}</Tex> and the lower lasing
          level <Tex>{String.raw`b`}</Tex>:
        </p>
        <EqBlock label="3">{String.raw`\rho_{a;\,nm}(t) = \sum_{\psi} P_{\psi}\, C_{an}(t)\,C^{*}_{am}(t),`}</EqBlock>
        <EqBlock label="4">{String.raw`\rho_{b;\,nm}(t) = \sum_{\psi} P_{\psi}\, C_{bn}(t)\,C^{*}_{bm}(t).`}</EqBlock>
        <p>The total reduced field density matrix is the sum over all four atomic branches:</p>
        <KeyResult
          number="5"
          eq={String.raw`\rho_{nm}(t) = \rho_{a;\,nm} + \rho_{b;\,nm} + \rho_{c;\,nm} + \rho_{d;\,nm}.`}
          label="Reduced field density matrix (the central object)"
          note={
            <>
              The sum runs over the upper level <Tex>{String.raw`a`}</Tex>, the lower lasing level{" "}
              <Tex>{String.raw`b`}</Tex>, and the two spontaneous-decay sinks <Tex>{String.raw`c,d`}</Tex>. This is the
              quantity whose equation of motion the whole appendix derives.
            </>
          }
        />
        <p>
          The two reservoir branches are themselves amplitude-times-conjugate, now summed over reservoir modes{" "}
          <Tex>{String.raw`r`}</Tex>:
        </p>
        <EqBlock label="6">{String.raw`\rho_{c;\,nm} = \sum_r \rho_{c;\,nm}^{(1_r)},\qquad \rho_{c;\,nm}^{(1_r)} = \sum_{\psi} P_{\psi}\, C_{cn|1_r\rangle}(t)\,C^{*}_{cm|1_r\rangle}(t),`}</EqBlock>
        <EqBlock label="7">{String.raw`\rho_{d;\,nm} = \sum_r \rho_{d;\,nm}^{(1_r)},\qquad \rho_{d;\,nm}^{(1_r)} = \sum_{\psi} P_{\psi}\, C_{dn|1_r\rangle}(t)\,C^{*}_{dm|1_r\rangle}(t).`}</EqBlock>

        <Derivation title="From state vector to the four field-matrix pieces">
          <Step title="Write the most general atom + field + reservoir state">
            Eq.&nbsp;(1): expand over photon number <Tex>{String.raw`n`}</Tex>. For each{" "}
            <Tex>{String.raw`n`}</Tex>, the atom can be in <Tex>{String.raw`a`}</Tex> (with{" "}
            <Tex>{String.raw`n`}</Tex> photons, no reservoir photon) or in <Tex>{String.raw`b`}</Tex> (with{" "}
            <Tex>{String.raw`n+1`}</Tex> photons — it emitted one into the lasing mode), or it can have decayed to{" "}
            <Tex>{String.raw`c/d`}</Tex> while emitting one reservoir photon{" "}
            <Tex>{String.raw`|1_r\rangle`}</Tex>. Each branch carries a c-number amplitude <Tex>{String.raw`C`}</Tex>.
          </Step>
          <Step title="Form the density operator and trace">
            Eq.&nbsp;(2): <Tex>{String.raw`\rho = \sum_{\psi} P_{\psi} |\psi\rangle\langle\psi|`}</Tex>. Expand the outer product;
            cross terms between different atomic levels or different reservoir-photon numbers vanish under the trace over
            atom and reservoir. Only <Tex>{String.raw`|{\rm level}\rangle\langle{\rm same\ level}|`}</Tex> and{" "}
            <Tex>{String.raw`|0\rangle\langle 0|`}</Tex> or <Tex>{String.raw`|1_r\rangle\langle 1_r|`}</Tex> survive.
          </Step>
          <Step title="Read off the four field-matrix pieces">
            Eqs.&nbsp;(3),&nbsp;(4),&nbsp;(6),&nbsp;(7): each surviving block is amplitude times conjugate amplitude,
            ensemble-averaged (<Tex>{String.raw`P_{\psi}`}</Tex>) and, for <Tex>{String.raw`c/d`}</Tex>, summed over
            reservoir modes <Tex>{String.raw`r`}</Tex>. Their sum, Eq.&nbsp;(5), is the total reduced field density
            matrix <Tex>{String.raw`\rho_{nm}`}</Tex> — the quantity to be propagated.
          </Step>
        </Derivation>

        <Callout kind="note" title="What the reduced density matrix means">
          <Tex>{String.raw`\rho_{nm}=\langle n|\rho_{\rm field}|m\rangle`}</Tex>: the cavity field&rsquo;s state after the
          atom and the photon reservoir have been traced out. Diagonal elements{" "}
          <Tex>{String.raw`\rho_{nn}`}</Tex> are photon-number probabilities; off-diagonal elements{" "}
          <Tex>{String.raw`\rho_{nm}`}</Tex> carry field phase / coherence.
        </Callout>
      </Section>

      <Section title="Weisskopf–Wigner decay and the damped Rabi amplitude equations">
        <Intuition>
          Now put in the dynamics. While a single atom sits in the cavity, two things happen at once.{" "}
          <strong>(i) Coherent exchange:</strong> the atom oscillates between <Tex>{String.raw`a`}</Tex> (with{" "}
          <Tex>{String.raw`n`}</Tex> photons) and <Tex>{String.raw`b`}</Tex> (with <Tex>{String.raw`n+1`}</Tex> photons)
          at the Rabi rate <Tex>{String.raw`g\sqrt{n+1}`}</Tex> — reversible energy trading with the lasing mode.{" "}
          <strong>(ii) Irreversible decay:</strong> <Tex>{String.raw`a`}</Tex> leaks to <Tex>{String.raw`c`}</Tex> at
          rate <Tex>{String.raw`\gamma_a`}</Tex>, <Tex>{String.raw`b`}</Tex> leaks to <Tex>{String.raw`d`}</Tex> at rate{" "}
          <Tex>{String.raw`\gamma_b`}</Tex>. Weisskopf–Wigner theory turns the coupling to the infinite reservoir into
          simple exponential damping of the amplitudes. The result is a pair of coupled, <em>damped Rabi</em> equations —
          the dynamical engine of the entire appendix.
        </Intuition>
        <p>
          The interaction Hamiltonian connects only <Tex>{String.raw`|a,n\rangle`}</Tex> to{" "}
          <Tex>{String.raw`|b,n+1\rangle`}</Tex>, with the Jaynes–Cummings photon factor{" "}
          <Tex>{String.raw`\sqrt{n+1}`}</Tex>. Adding Weisskopf–Wigner damping gives:
        </p>
        <KeyResult
          number="8–9"
          eq={String.raw`\begin{aligned}\dot{C}_{a,n}(t) &= -\tfrac{1}{2}\gamma_a\,C_{a,n}(t) - ig\sqrt{n+1}\,e^{\,i(\omega-\nu)t}\,C_{b,n+1}(t),\\[4pt]\dot{C}_{b,n+1}(t) &= -\tfrac{1}{2}\gamma_b\,C_{b,n+1}(t) - ig\sqrt{n+1}\,e^{-i(\omega-\nu)t}\,C_{a,n}(t).\end{aligned}`}
          label="Damped Rabi amplitude equations (Eqs. 8–9)"
          note={
            <>
              One injected atom coherently trading a photon with the <Tex>{String.raw`n`}</Tex>-photon mode at rate{" "}
              <Tex>{String.raw`g\sqrt{n+1}`}</Tex>, while spontaneously decaying out of the lasing manifold at{" "}
              <Tex>{String.raw`\gamma_a/2`}</Tex> (upper) and <Tex>{String.raw`\gamma_b/2`}</Tex> (lower). Note the
              opposite sign in the detuning exponential — Eq.&nbsp;(9) is the structural conjugate of Eq.&nbsp;(8).
            </>
          }
        />
        <p>
          Probability that leaks out of the lasing manifold must reappear as growth of the side-level populations. The
          population leaving <Tex>{String.raw`a`}</Tex> does so at the <em>full</em> rate{" "}
          <Tex>{String.raw`\gamma_a`}</Tex> (not <Tex>{String.raw`\gamma_a/2`}</Tex>, because populations go as{" "}
          <Tex>{String.raw`|C|^2`}</Tex>):
        </p>
        <EqBlock label="10–11">{String.raw`\dot{\rho}_{a;\,nn}(t) = -\gamma_a\,\rho_{a;\,nn}(t),\qquad \dot{\rho}_{b;\,nn}(t) = -\gamma_b\,\rho_{b;\,nn}(t).`}</EqBlock>
        <p>That lost probability (and coherence) feeds the sinks, conserving the total:</p>
        <EqBlock label="14">{String.raw`\dot{\rho}_{c;\,nm}(t) = \gamma_a\,\rho_{a;\,nm}(t),`}</EqBlock>
        <EqBlock label="15">{String.raw`\dot{\rho}_{d;\,nm}(t) = \gamma_b\,\rho_{b;\,nm}(t).`}</EqBlock>
        <p>Integrating these feeds over the time since injection accumulates the field matrix over the atom&rsquo;s residence:</p>
        <EqBlock label="16">{String.raw`\rho_{nm}(t+\tau) = \int_0^{\infty} d\tau'\,\big[\gamma_a\,\rho_{a;\,nm}(t+\tau') + \gamma_b\,\rho_{b;\,nm}(t+\tau')\big].`}</EqBlock>

        <Derivation title="Build the damped Rabi equations and the sink feeds">
          <Step title="Get the coherent coupling from the interaction Hamiltonian">
            Starting from the atom-field interaction (Chapter&nbsp;XIV) in the rotating frame, the only nonzero matrix
            elements connect <Tex>{String.raw`|a,n\rangle`}</Tex> to <Tex>{String.raw`|b,n+1\rangle`}</Tex>. The
            Jaynes–Cummings coupling carries the photon factor <Tex>{String.raw`\sqrt{n+1}`}</Tex>, producing the
            off-diagonal terms in (8)–(9) with the detuning phase{" "}
            <Tex>{String.raw`e^{\pm i(\omega-\nu)t}`}</Tex>.
          </Step>
          <Step title="Add Weisskopf–Wigner damping">
            Coupling each atomic level to the continuum reservoir and applying Weisskopf–Wigner theory replaces the
            reservoir sum by an exponential decay of the amplitude: <Tex>{String.raw`-\gamma_a/2`}</Tex> on{" "}
            <Tex>{String.raw`C_a`}</Tex> and <Tex>{String.raw`-\gamma_b/2`}</Tex> on <Tex>{String.raw`C_b`}</Tex>. The
            factor <Tex>{String.raw`\tfrac12`}</Tex> appears because these are <em>amplitude</em> equations (populations
            decay at the full <Tex>{String.raw`\gamma`}</Tex>).
          </Step>
          <Step title="Verify the partner symmetry">
            Check that (9) is the structural conjugate of (8): identical coupling <Tex>{String.raw`g\sqrt{n+1}`}</Tex>,
            opposite detuning-phase sign, and the level-appropriate half-decay. This guarantees the resulting density
            matrix is Hermitian and probability is conserved within the <Tex>{String.raw`a`}</Tex>-
            <Tex>{String.raw`b`}</Tex> manifold up to the spontaneous leak.
          </Step>
          <Step title="Feed the sinks and conserve probability">
            Eqs.&nbsp;(14)–(15): the populations/coherences lost from <Tex>{String.raw`a`}</Tex> and{" "}
            <Tex>{String.raw`b`}</Tex> at full rates <Tex>{String.raw`\gamma_a,\gamma_b`}</Tex> reappear as growth of{" "}
            <Tex>{String.raw`c`}</Tex> and <Tex>{String.raw`d`}</Tex>. Eq.&nbsp;(16) integrates these feeds over the
            atom&rsquo;s lifetime in the cavity, giving the field-matrix increment due to one atom.
          </Step>
        </Derivation>

        <Callout kind="warning" title="Factor ½ vs. full γ — the most common slip">
          <em>Amplitude</em> equations (8),&nbsp;(9) carry <Tex>{String.raw`\gamma/2`}</Tex>.{" "}
          <em>Population / density-matrix</em> equations (10),&nbsp;(11),&nbsp;(14),&nbsp;(15) — and later
          (26),&nbsp;(27),&nbsp;(31) — carry the <strong>full</strong> <Tex>{String.raw`\gamma`}</Tex>, because{" "}
          <Tex>{String.raw`\rho\sim|C|^2`}</Tex>. Mixing these up is the most common transcription error in this
          appendix.
        </Callout>
      </Section>

      <Section title="Single-atom propagators, the gain integral, and the coarse-grained master equation">
        <Intuition>
          A real laser does not have one atom; it has a continuous random stream injected at rate{" "}
          <Tex>{String.raw`r_a`}</Tex>. The trick is to solve the single-atom problem once, then average. Factor each
          amplitude into the field amplitude <Tex>{String.raw`C_n(t)`}</Tex> at injection times a level-resolved field{" "}
          <em>propagator</em> <Tex>{String.raw`\mathcal{W}_{an},\mathcal{W}_{bn}`}</Tex> that carries the photon-number
          dynamics. Then coarse-grain: in a
          time long compared to one atom&rsquo;s lifetime but short on laser timescales, the field changes by{" "}
          <Tex>{String.raw`r_a`}</Tex> (atoms injected) times the per-atom change in{" "}
          <Tex>{String.raw`\rho`}</Tex>, integrated over the atom&rsquo;s whole life. The lifetime integral of the
          lower-level propagator <Tex>{String.raw`\int_0^\infty\gamma_b|\mathcal{W}_{bn}|^2\,d\tau'`}</Tex> is the{" "}
          <strong>gain</strong>: the total probability that an injected atom transfers to <Tex>{String.raw`b`}</Tex> and
          deposits a photon in the lasing mode before it decays away. The companion upper-level integral{" "}
          <Tex>{String.raw`\int_0^\infty\gamma_a|\mathcal{W}_{an}|^2\,d\tau'`}</Tex> is the no-emission/loss term.
        </Intuition>
        <p>
          Reduce to a single injected atom: it enters in <Tex>{String.raw`a`}</Tex> with no reservoir photon yet, times
          the field state:
        </p>
        <EqBlock label="17">{String.raw`|\psi_{a\text{-}n}(t)\rangle = |a\rangle\,|0\rangle\,|\psi(t)\rangle.`}</EqBlock>
        <p>
          Factor each amplitude into the field amplitude <Tex>{String.raw`C_n(t)`}</Tex> at the injection instant times
          a level-resolved field propagator <Tex>{String.raw`\mathcal{W}_{an},\mathcal{W}_{b,n+1}`}</Tex>, which obey
          the same damped-Rabi equations (8)–(9):
        </p>
        <EqBlock label="18">{String.raw`C_{a,n}(t+\tau') = C_n(t)\,\mathcal{W}_{an}(t+\tau'),`}</EqBlock>
        <EqBlock label="19">{String.raw`C_{b,n+1}(t+\tau') = C_n(t)\,\mathcal{W}_{b,n+1}(t+\tau').`}</EqBlock>
        <p>
          Multiplying propagator by conjugate gives the per-atom contributions to{" "}
          <Tex>{String.raw`\rho`}</Tex> from the <Tex>{String.raw`a`}</Tex>- and <Tex>{String.raw`b`}</Tex>-branches,
          weighted by the field density matrix at injection (<Tex>{String.raw`\rho_{nm}`}</Tex> for the{" "}
          <Tex>{String.raw`a`}</Tex>-branch, <Tex>{String.raw`\rho_{n-1\,m-1}`}</Tex> for the{" "}
          <Tex>{String.raw`b`}</Tex>-branch, since emission has raised the photon number):
        </p>
        <EqBlock label="20">{String.raw`\rho_{a;\,nm}(t+\tau') = \rho_{nm}(t)\,\mathcal{W}_{an}(t+\tau')\,\mathcal{W}^{*}_{am}(t+\tau'),`}</EqBlock>
        <EqBlock label="21">{String.raw`\rho_{b;\,nm}(t+\tau') = \rho_{n-1\,m-1}(t)\,\mathcal{W}_{bn}(t+\tau')\,\mathcal{W}^{*}_{bm}(t+\tau').`}</EqBlock>
        <p>
          Coarse-grain over injection: the net field change per unit time is the injection rate{" "}
          <Tex>{String.raw`r_a`}</Tex> times the net change one atom produces over its residence time{" "}
          <Tex>{String.raw`\tau`}</Tex>:
        </p>
        <EqBlock label="22">{String.raw`\dot{\rho}_{nm}(t) = r_a\big[\rho_{nm}(t+\tau) - \rho_{nm}(t)\big].`}</EqBlock>
        <p>
          Inserting the per-atom result and performing the lifetime integrals gives the headline result of Part&nbsp;I.1
          — the coarse-grained quantum laser master equation:
        </p>
        <KeyResult
          number="23"
          eq={String.raw`\dot{\rho}_{nm}(t) = -\,r_a\,\rho_{nm}(t)\Big[1 - \int_0^{\infty}\!\! d\tau'\,\gamma_a\,\mathcal{W}_{an}(t+\tau')\,\mathcal{W}^{*}_{am}(t+\tau')\Big] + r_a\,\rho_{n-1\,m-1}(t)\int_0^{\infty}\!\! d\tau'\,\gamma_b\,\mathcal{W}_{bn}(t+\tau')\,\mathcal{W}^{*}_{bm}(t+\tau').`}
          label="Coarse-grained quantum laser master equation (Eq. 23)"
          note={
            <>
              The photon-raising term multiplying <Tex>{String.raw`\rho_{n-1\,m-1}`}</Tex>, with diagonal weight{" "}
              <Tex>{String.raw`G_n=\int_0^\infty \gamma_b|\mathcal{W}_{bn}|^2\,d\tau'`}</Tex>, is the{" "}
              <strong>gain</strong> — the probability that an injected atom transfers to <Tex>{String.raw`b`}</Tex> and
              emits a photon into the lasing mode. The bracket integral{" "}
              <Tex>{String.raw`\int_0^\infty \gamma_a\mathcal{W}_{an}\mathcal{W}^{*}_{am}\,d\tau'`}</Tex> is the
              complementary <em>no-emission</em> (spontaneous loss <Tex>{String.raw`a\to c`}</Tex>) term. When{" "}
              <Tex>{String.raw`\gamma_a=\gamma_b`}</Tex> this reduces to Chapter&nbsp;XVII&rsquo;s
              Eq.&nbsp;(17.9).
            </>
          }
        />
        <p>
          Term by term, Eq.&nbsp;(23) is a photon-number rate (birth-death) equation. In words:
        </p>
        <EqBlock label="24">{String.raw`\dot{\rho}_{nn} = -\,\rho_{nn}\times[\text{rate of stim. emission into an } n\text{-photon field}] + \rho_{n-1\,n-1}\times[\text{rate into an }(n{-}1)\text{-photon field}] + [\text{decay-channel terms}].`}</EqBlock>

        <SimFrame
          title="Damped Rabi flopping of one injected atom and the saturating gain"
          caption={
            <>
              Integrate Eqs.&nbsp;(8)–(9) directly (RK4) for one atom injected in the upper level{" "}
              <Tex>{String.raw`a`}</Tex>. Watch the damped Rabi oscillation of the level populations, the probability
              leaking to side levels, and the accumulated gain integral{" "}
              <Tex>{String.raw`G_n=\int_0^\infty \gamma_b|C_b(\tau)|^2\,d\tau`}</Tex> — the lower-level{" "}
              (<Tex>{String.raw`b`}</Tex>) integral that <em>is</em> the photon-raising gain term of Eq.&nbsp;(23). The
              lower panel sweeps photon number to expose <em>gain saturation</em>.
            </>
          }
          tryThis={
            <>
              Set <Tex>{String.raw`\Delta=0`}</Tex> and small decays — you get clean, nearly complete photon exchange.
              Now raise <Tex>{String.raw`\gamma_a,\gamma_b`}</Tex>: the oscillation damps as the atom leaks away. Crank
              the detuning <Tex>{String.raw`\Delta`}</Tex>: the flopping speeds up (larger{" "}
              <Tex>{String.raw`\Omega_n`}</Tex>) but never empties the upper level. Keep the coupling small (the default{" "}
              <Tex>{String.raw`g\approx0.3`}</Tex> sits in the small-signal regime), then sweep{" "}
              <Tex>{String.raw`n`}</Tex> and watch the gain curve <Tex>{String.raw`G_n`}</Tex> rise from threshold and{" "}
              <em>saturate</em> — the reason a laser settles to steady state. (Raise <Tex>{String.raw`g`}</Tex> and the
              curve is already flat at its ceiling from <Tex>{String.raw`n=0`}</Tex>.) Set{" "}
              <Tex>{String.raw`\gamma_a=\gamma_b`}</Tex> to recover the equal-decay Chapter-XVII limit.
            </>
          }
        >
          <AppISim />
        </SimFrame>

        <Derivation title="Coarse-grain one atom into a continuous master equation">
          <Step title="Reduce to a single injected atom">
            Eq.&nbsp;(17): treat one atom entering in <Tex>{String.raw`a`}</Tex> with the field in{" "}
            <Tex>{String.raw`|\psi(t)\rangle`}</Tex>. Solve (8)–(9) for that atom&rsquo;s amplitudes as functions of the
            residence time <Tex>{String.raw`\tau`}</Tex>.
          </Step>
          <Step title="Factor atom from field">
            Eqs.&nbsp;(18)–(19): write each amplitude as the field amplitude at injection{" "}
            <Tex>{String.raw`C_n(t)`}</Tex> times a level-resolved field propagator{" "}
            <Tex>{String.raw`\mathcal{W}_{an},\mathcal{W}_{b,n+1}`}</Tex>. The{" "}
            <Tex>{String.raw`\mathcal{W}`}</Tex>&rsquo;s obey the same damped-Rabi equations (8)–(9), so the field
            evolution is encoded entirely in <Tex>{String.raw`\mathcal{W}`}</Tex>.
          </Step>
          <Step title="Build the per-atom density matrix">
            Eqs.&nbsp;(20)–(21): multiply propagator by conjugate to get the per-atom contributions to{" "}
            <Tex>{String.raw`\rho`}</Tex> from the <Tex>{String.raw`a`}</Tex>- and <Tex>{String.raw`b`}</Tex>-branches,
            weighted by the field density matrix at injection{" "}
            <Tex>{String.raw`\rho_{nm}(t),\,\rho_{n-1\,m-1}(t)`}</Tex>.
          </Step>
          <Step title="Coarse-grain over injection">
            Eq.&nbsp;(22): net field change per unit time ={" "}
            <Tex>{String.raw`r_a\times(\rho\text{ after one atom}-\rho\text{ before})`}</Tex>. Insert the per-atom
            result and integrate over the atom&rsquo;s lifetime to get the gain/loss integrals.
          </Step>
          <Step title="Identify the gain integral and the photon ladder">
            Eq.&nbsp;(23): the lifetime integral{" "}
            <Tex>{String.raw`\int_0^\infty \gamma_b|\mathcal{W}_{bn}|^2\,d\tau'`}</Tex> multiplying{" "}
            <Tex>{String.raw`\rho_{n-1\,m-1}`}</Tex> is the total probability of photon emission into the mode — the
            gain — and it raises the photon number by one. The bracket integral{" "}
            <Tex>{String.raw`\int_0^\infty \gamma_a|\mathcal{W}_{an}|^2\,d\tau'`}</Tex> inside{" "}
            <Tex>{String.raw`[1-\int\cdots]`}</Tex> is the complementary no-emission/loss term.
          </Step>
          <Step title="Check the equal-decay limit">
            Set <Tex>{String.raw`\gamma_a=\gamma_b`}</Tex>. Eq.&nbsp;(23) collapses to the standard quantum laser master
            equation, Eq.&nbsp;(17.9) of Chapter&nbsp;XVII — the validation of the whole construction.
          </Step>
        </Derivation>

        <Callout kind="insight" title="The gain is a lifetime integral">
          <Tex>{String.raw`G_n = \int_0^{\infty} \gamma_b\,|\mathcal{W}_{bn}(\tau)|^2\,d\tau`}</Tex> — the{" "}
          <em>lower</em>-level (<Tex>{String.raw`b`}</Tex>) propagator integral — is the probability that <em>one</em>{" "}
          injected atom deposits a photon in the lasing mode before spontaneously decaying. (The upper-level integral{" "}
          <Tex>{String.raw`\int_0^\infty\gamma_a|\mathcal{W}_{an}|^2\,d\tau`}</Tex> is its complement: the probability
          the atom decays <Tex>{String.raw`a\to c`}</Tex> <em>without</em> emitting into the mode — the loss term in
          the bracket of Eq.&nbsp;(23).) The gain saturates with <Tex>{String.raw`n`}</Tex> — the{" "}
          <Tex>{String.raw`\sqrt{n+1}`}</Tex> coupling drives the atom through faster and faster Rabi cycles, so a
          larger field does not extract proportionally more energy. This is gain saturation, the origin of steady-state
          laser operation.
        </Callout>
        <Callout kind="insight" title="Equal-decay sanity check">
          Setting <Tex>{String.raw`\gamma_a=\gamma_b`}</Tex> in Eq.&nbsp;(23) reproduces Eq.&nbsp;(17.9). If your
          reduction does not, the transcription or the integral is wrong — a built-in consistency check on any
          general-decay laser equation.
        </Callout>
      </Section>

      <Section title="Semiclassical reduction: factorization recovers the (7.34)–(7.36) equations">
        <Intuition>
          The grand finale ties the quantum theory back to the semiclassical one. In general the atom-field density
          matrix carries <strong>correlations</strong> — knowing the photon number tells you something about the
          atomic state and vice versa. The semiclassical approximation <em>factorizes</em> it into a product,{" "}
          <Tex>{String.raw`\rho_{\rm atom\text{-}field}\approx\rho_{\rm atom}\,\rho_{\rm field}`}</Tex>, with the field
          assumed to be in a coherent state <Tex>{String.raw`|\alpha\rangle`}</Tex>. Pushing this through the matrix
          equations of motion collapses the photon-number ladder into ordinary differential equations for the atomic
          density matrix driven by a classical field — exactly the equations of Chapter&nbsp;VII.
        </Intuition>
        <p>
          Start from the (still fully quantum, correlated) atom-field matrix equations of motion in the photon-number
          basis. Each carries full-<Tex>{String.raw`\gamma`}</Tex> damping plus the stimulated coupling{" "}
          <Tex>{String.raw`g\sqrt{n+1}`}</Tex> (and <Tex>{String.raw`g\sqrt{n}`}</Tex>) with the detuning phase{" "}
          <Tex>{String.raw`e^{\,i(\omega-\nu)t}`}</Tex>:
        </p>
        <EqBlock label="26">{String.raw`\dot{\rho}_{aa;\,nm} = -\gamma_a\,\rho_{aa;\,nm} - \big[ig\sqrt{n+1}\,e^{\,i(\omega-\nu)t}\,\rho_{ba;\,n+1\,m} + \text{c.c.}\big],`}</EqBlock>
        <EqBlock label="27">{String.raw`\dot{\rho}_{bb;\,nm} = -\gamma_b\,\rho_{bb;\,nm} + \big[ig\sqrt{n}\,e^{\,i(\omega-\nu)t}\,\rho_{ba;\,n\,m-1} + \text{c.c.}\big],`}</EqBlock>
        <EqBlock label="28">{String.raw`\dot{\rho}_{ab;\,nm} = -\gamma_{ab}\,\rho_{ab;\,nm} - ig\,e^{\,i(\omega-\nu)t}\big[\sqrt{n+1}\,\rho_{bb;\,n+1\,m} - \sqrt{n}\,\rho_{aa;\,n\,m-1}\big].`}</EqBlock>
        <p>Now impose the single defining semiclassical assumption — factorization:</p>
        <KeyResult
          number="25"
          eq={String.raw`\rho_{\rm atom\text{-}field}(t) = \rho_{\rm atom}(t)\,\rho_{\rm field}(t).`}
          label="The semiclassical factorization (Eq. 25)"
          note={
            <>
              This is the one assumption that turns the quantum theory classical. It asserts no atom-field correlation —
              equivalently the field is a fixed coherent state, unaffected at the quantum level by the single atom.
            </>
          }
        />
        <p>Applied block by block, the atom-field element splits into an atomic factor times a field factor:</p>
        <EqBlock label="29">{String.raw`\rho_{aa;\,nm} = \rho_{aa}\,\rho_{nm},\qquad \rho_{ba;\,nm} = \rho_{ba}\,\rho_{nm}.`}</EqBlock>
        <p>
          For a coherent state the off-diagonal field elements obey a simple ratio, so the{" "}
          <Tex>{String.raw`\sqrt{n+1}`}</Tex> coupling and the photon-number sum combine into a single c-number field
          amplitude <Tex>{String.raw`\alpha`}</Tex> — essentially the classical field:
        </p>
        <EqBlock label="30">{String.raw`\frac{\rho_{n+1,m}}{\rho_{nm}} = \frac{\alpha}{\sqrt{n+1}} \quad\Longrightarrow\quad \sqrt{n+1}\,\frac{\rho_{n+1,m}}{\rho_{nm}} = \alpha.`}</EqBlock>
        <p>
          The Fock-space bookkeeping disappears: every <Tex>{String.raw`g\sqrt{n+1}`}</Tex> times the photon-number sum
          reduces to <Tex>{String.raw`g\,a`}</Tex>, a single classical field amplitude. Eq.&nbsp;(26) collapses to:
        </p>
        <KeyResult
          number="31"
          eq={String.raw`\dot{\rho}_{aa} = -\gamma_a\,\rho_{aa} - \big\{ig\,a\,e^{\,i(\omega-\nu)t}\,\rho_{ba} + \text{c.c.}\big\},\qquad ga = -\frac{\wp\mathcal{E}a}{\hbar}\sin Kz.`}
          label="Recovered semiclassical equation (Eq. 31 = Eq. 7.34)"
          note={
            <>
              Identical to Chapter&nbsp;VII&rsquo;s Eq.&nbsp;(7.34) with classical field amplitude{" "}
              <Tex>{String.raw`a`}</Tex>, where <Tex>{String.raw`ga=-(\wp\mathcal{E}a/\hbar)\sin Kz`}</Tex> and the
              interaction energy is <Tex>{String.raw`V_{ab}=-\wp\mathcal{E}a\sin Kz`}</Tex>. The quantum{" "}
              <Tex>{String.raw`\sqrt{n+1}`}</Tex> has become the classical field{" "}
              <Tex>{String.raw`a`}</Tex>. Eqs.&nbsp;(7.35),&nbsp;(7.36) follow identically from (27),&nbsp;(28).
            </>
          }
        />

        <Derivation title="Factorize, use the coherent-state ladder, collapse to semiclassical">
          <Step title="Write the atom-field matrix equations of motion">
            Eqs.&nbsp;(26)–(28): the populations <Tex>{String.raw`\rho_{aa}`}</Tex> (26),{" "}
            <Tex>{String.raw`\rho_{bb}`}</Tex> (27), and the coherence <Tex>{String.raw`\rho_{ab}`}</Tex> (28) in the
            photon-number basis, each with full-<Tex>{String.raw`\gamma`}</Tex> damping and stimulated coupling{" "}
            <Tex>{String.raw`g\sqrt{n+1}`}</Tex> (or <Tex>{String.raw`g\sqrt{n}`}</Tex>) carrying the common
            detuning phase <Tex>{String.raw`e^{\,i(\omega-\nu)t}`}</Tex>. These are exact — still fully quantum /
            correlated.
          </Step>
          <Step title="Impose factorization">
            Eqs.&nbsp;(25),&nbsp;(29): assume{" "}
            <Tex>{String.raw`\rho_{\rm atom\text{-}field}=\rho_{\rm atom}\,\rho_{\rm field}`}</Tex>. This is the defining
            semiclassical step. Physically it asserts no atom-field correlation — equivalently the field is a fixed
            coherent state, unaffected at the quantum level by the single atom.
          </Step>
          <Step title="Use the coherent-state ladder identity">
            Eq.&nbsp;(30): for a coherent state,{" "}
            <Tex>{String.raw`\rho_{n+1,m}/\rho_{nm}=\alpha/\sqrt{n+1}`}</Tex>. Substituting, every{" "}
            <Tex>{String.raw`g\sqrt{n+1}`}</Tex> times the photon-number sum reduces to{" "}
            <Tex>{String.raw`g\alpha=g\,a`}</Tex>, a single classical field amplitude.
          </Step>
          <Step title="Collapse to the semiclassical equations">
            Eq.&nbsp;(31): the field-summed (26) becomes{" "}
            <Tex>{String.raw`\dot{\rho}_{aa}=-\gamma_a\rho_{aa}-\{ig\,a\,e^{i(\omega-\nu)t}\rho_{ba}+\text{c.c.}\}`}</Tex>.
            Identify <Tex>{String.raw`ga=-(\wp\mathcal{E}a/\hbar)\sin Kz`}</Tex> and{" "}
            <Tex>{String.raw`V_{ab}=-\wp\mathcal{E}a\sin Kz`}</Tex>: this is exactly Eq.&nbsp;(7.34). The same reduction
            applied to (27),&nbsp;(28) gives the electric-dipole forms of (7.35),&nbsp;(7.36).
          </Step>
          <Step title="State the physical conclusion">
            The factorization that produced the semiclassical equations is precisely the neglect of the atom-field
            correlation responsible for spontaneous emission into the lasing mode. Hence semiclassical theory has zero
            laser linewidth; the finite linewidth is a fully-quantum effect requiring the correlations kept in
            Eqs.&nbsp;(1)–(24).
          </Step>
        </Derivation>

        <Callout kind="insight" title="Factorization = no linewidth">
          The single approximation{" "}
          <Tex>{String.raw`\rho\approx\rho_{\rm atom}\,\rho_{\rm field}`}</Tex> (coherent-state field) is what separates
          the quantum laser from the semiclassical laser. It discards exactly the spontaneous-emission-into-the-mode
          term that gives the laser its finite linewidth. Keep the correlation{" "}
          <Tex>{String.raw`\Rightarrow`}</Tex> quantum laser (finite linewidth); factorize{" "}
          <Tex>{String.raw`\Rightarrow`}</Tex> semiclassical laser (zero linewidth).
        </Callout>
        <Callout kind="note" title="The (7.34) back-check">
          Eq.&nbsp;(31) printed on the page <em>is</em> Eq.&nbsp;(7.34) with{" "}
          <Tex>{String.raw`ga=-(\wp\mathcal{E}a/\hbar)\sin Kz`}</Tex>. This printed identity is the definitive
          cross-check on the signs and factors in (26) and (30).
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from this appendix">
          <ul>
            <li>
              The reduced <strong>field</strong> density matrix <Tex>{String.raw`\rho_{nm}`}</Tex> (Fock basis) is THE
              quantum object describing the laser field; its equation of motion (Eq.&nbsp;23) is the quantum laser
              master equation used throughout Chapter&nbsp;XVII.
            </li>
            <li>
              <strong>Damped Rabi equations (8)–(9):</strong> coherent coupling{" "}
              <Tex>{String.raw`g\sqrt{n+1}`}</Tex> plus Weisskopf–Wigner decay{" "}
              <Tex>{String.raw`\gamma_a/2,\gamma_b/2`}</Tex>. <em>Amplitude</em> equations carry{" "}
              <Tex>{String.raw`\gamma/2`}</Tex>; <em>population</em> equations carry the full{" "}
              <Tex>{String.raw`\gamma`}</Tex>. Remember this factor-of-2 rule.
            </li>
            <li>
              <strong>Gain = lifetime integral</strong>{" "}
              <Tex>{String.raw`G_n=\int \gamma_b|\mathcal{W}_{bn}|^2\,d\tau`}</Tex> = probability one injected atom
              emits a photon into the mode (the <Tex>{String.raw`b`}</Tex>-branch term that raises{" "}
              <Tex>{String.raw`n`}</Tex>; the <Tex>{String.raw`\gamma_a`}</Tex> integral is the complementary
              no-emission loss). It <em>saturates</em> with photon number{" "}
              <Tex>{String.raw`n`}</Tex> — the origin of gain saturation and steady-state operation.
            </li>
            <li>
              The coupling photon factor is <Tex>{String.raw`\sqrt{n+1}`}</Tex> (spontaneous&nbsp;+&nbsp;stimulated),
              connecting <Tex>{String.raw`|a,n\rangle`}</Tex> to <Tex>{String.raw`|b,n+1\rangle`}</Tex>: the
              Jaynes–Cummings emission matrix element.
            </li>
            <li>
              <strong>Coarse-graining:</strong> solve the single-atom problem once (the{" "}
              <Tex>{String.raw`\mathcal{W}`}</Tex>-propagators), then multiply by injection rate{" "}
              <Tex>{String.raw`r_a`}</Tex> and integrate over residence time. This &ldquo;one atom{" "}
              <Tex>{String.raw`\to`}</Tex> stream of atoms&rdquo; averaging recurs throughout laser theory.
            </li>
            <li>
              Setting <Tex>{String.raw`\gamma_a=\gamma_b`}</Tex> recovers the equal-decay Chapter-XVII result
              (Eq.&nbsp;17.9) — a built-in consistency check.
            </li>
            <li>
              <strong>The central takeaway:</strong> factorizing{" "}
              <Tex>{String.raw`\rho\to\rho_{\rm atom}\,\rho_{\rm field}`}</Tex> (coherent-state field) gives the
              semiclassical equations (7.34)–(7.36). This discards the correlation responsible for spontaneous emission
              into the mode — why the semiclassical laser has zero linewidth and the full quantum theory
              (Chapter&nbsp;XX) gives a finite one. &ldquo;Correlation = linewidth&rdquo; is the thread to carry into the
              linewidth and photon-statistics chapters.
            </li>
          </ul>
          The recovered semiclassical coupling <Tex>{String.raw`ga=-(\wp\mathcal{E}a/\hbar)\sin Kz`}</Tex> with
          interaction energy <Tex>{String.raw`V_{ab}=-\wp\mathcal{E}a\sin Kz`}</Tex> links this appendix&rsquo;s notation
          directly to the Chapter-VII semiclassical equations.
        </Callout>
      </Section>
    </Lesson>
  );
}
