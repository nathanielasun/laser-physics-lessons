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
import Ch21Sim from "@/components/sims/ch21";

export default function Page() {
  return (
    <Lesson slug="ch21">
      <Lede>
        The laser is not a closed topic but a window onto the rest of physics, and this final chapter holds that window
        open in four directions. Because a laser field is at once <em>intense</em> and <em>coherent</em>, the
        polarization expansion <Tex>{String.raw`P=\chi^{(1)}E+\chi^{(2)}EE+\chi^{(3)}EEE`}</Tex> we built for the gain
        medium becomes the founding equation of nonlinear optics. The leaky cavity, embarrassingly, has{" "}
        <em>no</em> discrete modes at all — so we hide it inside a fictitious &ldquo;universe&rdquo; whose dense true
        modes cluster into Lorentzian <strong>quasimodes</strong>. The laser threshold turns out to be — literally — a{" "}
        <strong>second-order phase transition</strong>, with the field amplitude as order parameter and
        spontaneous-emission noise as temperature. And the same density-matrix machinery computes the microwave
        linewidth of a <strong>Josephson junction</strong>. One idea unifies all four: a cooperative, ordering influence
        (stimulated emission, exchange, pairing) competing against a disordering one (noise, thermal agitation), with a
        sharp threshold where order spontaneously wins.
      </Lede>

      <Section title="21-1 Impact of the laser: nonlinear optics &amp; spectroscopy">
        <Intuition>
          Why does the laser matter so much for the <em>rest</em> of optics? Because its field is simultaneously intense
          and coherent, it drives matter into a regime where the induced polarization is no longer a linear response.
          Expand the polarization in powers of the field, and the higher terms — normally negligible — become
          observable: the <Tex>{String.raw`\chi^{(2)}`}</Tex> term mixes frequencies and generates harmonics, the{" "}
          <Tex>{String.raw`\chi^{(3)}`}</Tex> term gives four-wave mixing and the intensity-dependent refractive index.
          The very expansion derived for the laser <em>gain</em> medium in Chapter&nbsp;IX is, verbatim, the master
          equation of nonlinear optics.
        </Intuition>
        <KeyResult
          number="1"
          eq={String.raw`P_{\nu} = \varepsilon_0\,\chi^{(1)}_{\nu\mu}\,E_{\mu} + \varepsilon_0\,\chi^{(2)}_{\nu\mu\rho}\,E_{\mu}E_{\rho} + \varepsilon_0\,\chi^{(3)}_{\nu\mu\rho\sigma}\,E_{\mu}E_{\rho}E_{\sigma}`}
          label="Nonlinear macroscopic polarization"
          note={
            <>
              Greek subscripts are Cartesian components (summed when repeated). <Tex>{String.raw`\chi^{(1)}`}</Tex> is
              ordinary linear susceptibility; <Tex>{String.raw`\chi^{(2)}`}</Tex> governs second-harmonic generation and
              sum/difference-frequency mixing (it vanishes in centrosymmetric media);{" "}
              <Tex>{String.raw`\chi^{(3)}`}</Tex> governs third-harmonic, four-wave mixing, and the intensity-dependent
              index. The nonlinear dipole is driven at the incident laser frequency, so radiation appears at harmonics
              of it. This is the same expansion derived for the laser problem in Sec.&nbsp;9-1.
            </>
          }
        />
        <Callout kind="insight" title="This is a payoff chapter for Chapter IX">
          Eq.&nbsp;(1) is identical to the nonlinear laser polarization of Sec.&nbsp;9-1. The chapter is showing you that
          the algebra you already did has a <em>second life</em> as the founding equation of an entire research field —
          determining the <Tex>{String.raw`\chi`}</Tex> tensors is how we learn about matter and its interaction with
          light.
        </Callout>
        <p>
          Separately, the laser revolutionized <strong>spectroscopy</strong>. Scattered laser light carries information
          through density fluctuations of the medium. Choosing entropy <Tex>{String.raw`S`}</Tex> and pressure{" "}
          <Tex>{String.raw`P`}</Tex> as independent thermodynamic variables, a density fluctuation splits cleanly into
          two pieces:
        </p>
        <KeyResult
          number="2"
          eq={String.raw`\delta\rho(\mathbf{r},t) = \left(\frac{\partial\rho(\mathbf{r},t)}{\partial S}\right)_{\!P}\delta S + \left(\frac{\partial\rho(\mathbf{r},t)}{\partial P}\right)_{\!S}\delta P`}
          label="Density fluctuation: entropy + pressure"
          note={
            <>
              The first term is a non-propagating entropy/temperature fluctuation at constant pressure — it scatters
              elastically (<strong>Rayleigh</strong>). The second is a pressure fluctuation at constant entropy, an
              adiabatic <em>sound wave</em> — it scatters with a Doppler shift (<strong>Brillouin</strong>). A laser
              scattering spectrum therefore shows a central Rayleigh peak flanked by a Brillouin doublet.
            </>
          }
        />
        <Derivation title="From the laser polarization to two research fields">
          <Step title="Recognize the polarization expansion as the bridge to nonlinear optics">
            Start from the microscopic result of Chapter&nbsp;IX: the medium polarization is a power series in the
            driving field. Truncating at first order recovers linear optics (refraction, absorption). Keeping the{" "}
            <Tex>{String.raw`\chi^{(2)}`}</Tex> and <Tex>{String.raw`\chi^{(3)}`}</Tex> terms is the <em>entire</em>{" "}
            content of nonlinear optics: each term, when the field oscillates at <Tex>{String.raw`\omega`}</Tex>,
            produces polarization components at <Tex>{String.raw`2\omega`}</Tex>, <Tex>{String.raw`3\omega`}</Tex>, and
            combination frequencies, which then radiate. No new physics is introduced — the book already derived
            Eq.&nbsp;(1); nonlinear optics is its exploitation.
          </Step>
          <Step title="Split a thermodynamic density fluctuation into independent variables">
            Write the total differential of <Tex>{String.raw`\rho(\mathbf r,t)`}</Tex> as Eq.&nbsp;(2). The{" "}
            <Tex>{String.raw`(\partial\rho/\partial S)_P`}</Tex> term is a non-propagating entropy fluctuation{" "}
            <Tex>{String.raw`\to`}</Tex> elastic (Rayleigh) line. The <Tex>{String.raw`(\partial\rho/\partial P)_S`}</Tex>{" "}
            term obeys a wave equation (adiabatic sound) <Tex>{String.raw`\to`}</Tex> two Brillouin lines Doppler-shifted
            by <Tex>{String.raw`\pm`}</Tex> the acoustic frequency. This is why correlations of the scattered light
            (photon-counting / self-beat) carry the medium&rsquo;s dynamics.
          </Step>
        </Derivation>
        <Callout kind="note" title="What the laser unlocked in spectroscopy">
          Tunable dye and spin-flip Raman lasers turned Rayleigh/Brillouin scattering into precision probes. The laser
          also enabled sub-Doppler techniques (the Lamb dip, saturation spectroscopy), time-resolved picosecond
          spectroscopy, and self-beat spectroscopy that resolves linewidths at reciprocal-frequency
          (sub-megahertz) resolution. The laser&rsquo;s coherence and intensity are what make all of this possible.
        </Callout>
      </Section>

      <Section title="21-2a The quasimode: normal modes of the &lsquo;universe&rsquo;">
        <Intuition>
          Here the book pays an old conceptual debt. Throughout, a laser &ldquo;mode&rdquo; was treated as a discrete
          standing wave with a decay rate <Tex>{String.raw`\nu/Q`}</Tex> tacked on <em>by hand</em> to model mirror
          leakage. But an open Fabry-Perot cavity, because its mirrors transmit and diffract, has{" "}
          <strong>no discrete eigenmodes</strong> — radiation escapes to infinity. Lang, Scully and Lamb (1973) cure
          this by enclosing the small leaky cavity (Region&nbsp;1, length <Tex>{String.raw`L`}</Tex>, from{" "}
          <Tex>{String.raw`z=0`}</Tex> to <Tex>{String.raw`z=L`}</Tex>) inside a gigantic perfectly-mirrored cavity
          (Region&nbsp;2, the &ldquo;universe&rdquo;, reaching to <Tex>{String.raw`z=-\mathscr{L}`}</Tex>). The universe
          is closed, so it <em>does</em> have a dense, genuinely discrete set of normal modes — and the small
          cavity&rsquo;s finite <Tex>{String.raw`Q`}</Tex> shows up as these true modes piling into Lorentzian clusters.
        </Intuition>

        <Figure
          caption={
            <>
              (a) Geometry: the small leaky cavity (Region&nbsp;1, <Tex>{String.raw`0<z<L`}</Tex>) sits inside the
              perfectly-mirrored &ldquo;universe&rdquo; (Region&nbsp;2, <Tex>{String.raw`-\mathscr{L}<z<0`}</Tex>). (b)
              The dense true modes of the universe pile up into Lorentzian clusters of width{" "}
              <Tex>{String.raw`\nu/Q`}</Tex> centered on each small-cavity resonance <Tex>{String.raw`\Omega_n`}</Tex> —
              a single such cluster is one <strong>quasimode</strong> (pseudomode).
            </>
          }
        >
          <svg viewBox="0 0 560 240" width="100%">
            {/* Panel (a): geometry */}
            <text x="14" y="20" fontSize="13" fontWeight="600" fill="#1f2733">(a) cavity inside the universe</text>
            {/* universe span */}
            <line x1="40" y1="60" x2="430" y2="60" stroke="#94a3b8" strokeWidth="1.5" />
            {/* far perfect mirror at -L */}
            <rect x="36" y="44" width="6" height="32" fill="#334155" />
            <text x="22" y="92" fontSize="11" fill="#5b6473">{"z=−ℒ"}</text>
            {/* partial mirror at z=0 */}
            <rect x="300" y="44" width="4" height="32" fill="#64748b" />
            <text x="288" y="92" fontSize="11" fill="#5b6473">z=0</text>
            {/* partial mirror (output coupler) at z=L */}
            <rect x="426" y="44" width="4" height="32" fill="#64748b" />
            <text x="416" y="92" fontSize="11" fill="#5b6473">z=L</text>
            {/* region labels */}
            <text x="150" y="40" fontSize="11" fill="#0891b2">Region 2 (universe)</text>
            <text x="318" y="40" fontSize="11" fill="#e11d48">Region 1 (cavity)</text>
            {/* small leak arrow out of z=L */}
            <line x1="430" y1="60" x2="470" y2="60" stroke="#e11d48" strokeWidth="1.5" markerEnd="url(#arrow21)" />
            <defs>
              <marker id="arrow21" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#e11d48" />
              </marker>
            </defs>
            <text x="438" y="50" fontSize="10" fill="#e11d48">leak</text>

            {/* Panel (b): pseudomode spectrum */}
            <text x="14" y="135" fontSize="13" fontWeight="600" fill="#1f2733">(b) pseudomode spectrum</text>
            {/* baseline */}
            <line x1="40" y1="215" x2="540" y2="215" stroke="#9aa3b2" strokeWidth="1" />
            <text x="500" y="232" fontSize="11" fill="#5b6473">{"Ω_k"}</text>
            {/* dense true modes as thin sticks */}
            {Array.from({ length: 60 }).map((_, i) => {
              const x = 50 + i * 8;
              // Lorentzian envelope centered at three resonances
              const env = (c: number) => 1 / (1 + ((x - c) / 22) ** 2);
              const h = 70 * Math.max(env(150), env(300), env(450));
              return <line key={i} x1={x} y1={215} x2={x} y2={215 - h - 2} stroke="#cbd5e1" strokeWidth="1" />;
            })}
            {/* Lorentzian envelopes */}
            {[150, 300, 450].map((c, k) => {
              const pts = [];
              for (let x = 50; x <= 540; x += 4) {
                const env = 1 / (1 + ((x - c) / 22) ** 2);
                pts.push(`${x},${215 - 70 * env}`);
              }
              return <polyline key={k} points={pts.join(" ")} fill="none" stroke="#4f46e5" strokeWidth="1.8" />;
            })}
            {/* width annotation on first peak */}
            <line x1="128" y1="160" x2="172" y2="160" stroke="#e11d48" strokeWidth="1.2" />
            <text x="135" y="153" fontSize="10" fill="#e11d48">{"ν/Q"}</text>
            <text x="138" y="200" fontSize="11" fill="#4f46e5">{"Ω_n"}</text>
          </svg>
        </Figure>

        <p>
          Closing the universe gives a complete discrete set of normal-mode functions{" "}
          <Tex>{String.raw`U_k(z)`}</Tex>, labeled by wavenumber <Tex>{String.raw`k`}</Tex>, that must vanish at the
          partial mirror <Tex>{String.raw`z=L`}</Tex> and at the far perfect wall <Tex>{String.raw`z=-\mathscr{L}`}</Tex>:
        </p>
        <EqBlock label="3">{String.raw`U_k(z) = \begin{cases} M_k\,\sin[\,k(z-L)\,], & z>0,\\[4pt] \xi_k\,\sin[\,k(z+\mathscr{L})\,], & z<0, \end{cases}`}</EqBlock>
        <Callout kind="math" title="Transcription note on Eq. (3)">
          The scan glyph in the lower branch literally reads <Tex>{String.raw`\sin[k(z-\mathscr{L})]`}</Tex>, but the
          perfect-mirror boundary condition <Tex>{String.raw`U_k(-\mathscr{L})=0`}</Tex> mathematically{" "}
          <em>requires</em> <Tex>{String.raw`\sin[k(z+\mathscr{L})]`}</Tex> so the node sits exactly at the far wall. We
          render the physically-correct <Tex>{String.raw`+\mathscr{L}`}</Tex> form. The factors{" "}
          <Tex>{String.raw`\xi_k`}</Tex> alternate between <Tex>{String.raw`+1`}</Tex> and <Tex>{String.raw`-1`}</Tex> as
          we step from one mode to the next.
        </Callout>
        <p>
          Matching at <Tex>{String.raw`z=0`}</Tex> fixes the amplitude <Tex>{String.raw`M_k`}</Tex> of the{" "}
          <Tex>{String.raw`k`}</Tex>th universe mode <em>inside</em> the small cavity. As a function of mode frequency{" "}
          <Tex>{String.raw`\Omega_k`}</Tex> it is a Lorentzian-type profile peaked at the small-cavity resonance — this
          is precisely the pseudomode lineshape of Fig.&nbsp;21-1b:
        </p>
        <EqBlock label="4">{String.raw`M_k \;\propto\; \frac{\nu}{Q}\left[(\Omega_k-\Omega)^2 + \frac{\nu}{Q}\right]^{-1/2}.`}</EqBlock>
        <Callout kind="math" title="Transcription note on Eq. (4)">
          The bracket is transcribed exactly as printed: <Tex>{String.raw`(\Omega_k-\Omega)^2 + \nu/Q`}</Tex> (no
          explicit factor of <Tex>{String.raw`1/2`}</Tex> or square on the second term in the scan). Modes of the
          universe whose frequency lies near a small-cavity resonance have large amplitude inside; far-off modes barely
          penetrate.
        </Callout>
        <p>
          Now write the field of a single <Tex>{String.raw`n`}</Tex>th Fox-Li (small-cavity) mode two ways. First, in
          terms of that one quasimode&rsquo;s profile <Tex>{String.raw`U_n(z)`}</Tex>:
        </p>
        <EqBlock label="5">{String.raw`E(z,0) = \tfrac{1}{2}\,E_n(0)\,\exp(-i\phi_n)\,U_n(z) + \text{c.c.}`}</EqBlock>
        <p>And second, re-expanded over the complete set of universe modes:</p>
        <EqBlock label="6">{String.raw`E(z,0) = \tfrac{1}{2}\sum_k \mathscr{E}_k(0)\,U_k(z) + \text{c.c.}`}</EqBlock>
        <p>
          Comparing the two shows that one physical Fox-Li mode is a weighted sum over a whole{" "}
          <em>cluster</em> of universe modes — the pseudomode. Let it evolve: each universe mode rotates at its own
          frequency <Tex>{String.raw`\Omega_k`}</Tex>, so the cluster dephases.
        </p>
        <EqBlock label="7">{String.raw`E(z,t) = \tfrac{1}{2}\,E_n(0)\,\exp[-i(\nu_n t+\phi_n)]\left\{\sum_k \frac{\mathscr{L}}{L}\,M_k\,U_k(z)\,\exp[-i(\Omega_k-\nu_n)t]\right\} + \text{c.c.}`}</EqBlock>
        <p>
          The sum over <Tex>{String.raw`k`}</Tex> of these Lorentzian-weighted, detuned phasors is the Fourier transform
          of a Lorentzian — a decaying exponential in time. Carrying out the <Tex>{String.raw`k`}</Tex>-sum yields the
          key result:
        </p>
        <KeyResult
          number="8"
          eq={String.raw`E(z,t) = \tfrac{1}{2}\,E_n(0)\,\exp[-i(\nu_n t+\phi_n)]\,\exp[-(\nu/2Q_n)t]\,U_n(z) + \text{c.c.}`}
          label="Quasimode field decay — derived, not assumed"
          note={
            <>
              The dephasing of the universe-mode cluster is <em>exactly</em> an exponential decay at rate{" "}
              <Tex>{String.raw`\nu/2Q_n`}</Tex>. The field leaks from the laser cavity into the external world, and the
              in-cavity amplitude decays exponentially. The phenomenological cavity loss is thereby{" "}
              <strong>derived from first principles</strong>.
            </>
          }
        />
        <Derivation title="Derive the cavity decay from the universe modes">
          <Step title="Build genuine discrete modes by closing the universe">
            The open cavity has no normalizable eigenmodes. Cure this by adding a distant perfect mirror at{" "}
            <Tex>{String.raw`z=-\mathscr{L}`}</Tex>, making the whole system a closed box with a complete discrete set
            of normal modes <Tex>{String.raw`U_k(z)`}</Tex>, Eq.&nbsp;(3). Apply the boundary conditions{" "}
            <Tex>{String.raw`U_k=0`}</Tex> at the partial mirror (<Tex>{String.raw`z=L`}</Tex>) and at the far wall (
            <Tex>{String.raw`z=-\mathscr{L}`}</Tex>); the alternating <Tex>{String.raw`\xi_k=\pm 1`}</Tex> and the
            matching at <Tex>{String.raw`z=0`}</Tex> fix the relative amplitudes.
          </Step>
          <Step title="Show the universe modes cluster into Lorentzian pseudomodes">
            Solve the matching condition at <Tex>{String.raw`z=0`}</Tex> for the in-cavity amplitude{" "}
            <Tex>{String.raw`M_k`}</Tex>. The result, Eq.&nbsp;(4), is a Lorentzian-type profile in{" "}
            <Tex>{String.raw`\Omega_k`}</Tex> of width <Tex>{String.raw`\nu/Q`}</Tex> centered on each small-cavity
            resonance. The dense universe spectrum is thus modulated into peaks (Fig.&nbsp;21-1b): each peak is one
            quasimode, and its <em>width is the cavity decay rate</em>.
          </Step>
          <Step title="Expand a single Fox-Li mode over universe modes">
            Write the physical field as one Fox-Li mode (Eq.&nbsp;5) and as a sum over universe modes (Eq.&nbsp;6).
            Projecting Eq.&nbsp;(5) onto the <Tex>{String.raw`U_k`}</Tex> basis, the coefficients{" "}
            <Tex>{String.raw`\mathscr{E}_k(0)`}</Tex> are large only for <Tex>{String.raw`k`}</Tex> inside the cluster
            around <Tex>{String.raw`\Omega_n`}</Tex>. One physical mode <Tex>{String.raw`=`}</Tex> a coherent packet of
            true modes.
          </Step>
          <Step title="Let it evolve and watch the packet dephase into exponential decay">
            Each universe mode evolves with its own <Tex>{String.raw`\exp(-i\Omega_k t)`}</Tex>, Eq.&nbsp;(7). The sum
            over the Lorentzian-weighted cluster is a Fourier transform of a Lorentzian, which is a decaying exponential
            in time. Carrying out the <Tex>{String.raw`k`}</Tex>-sum (Eq.&nbsp;8) yields{" "}
            <Tex>{String.raw`\exp[-(\nu/2Q_n)t]`}</Tex> times the original mode shape: the leakage previously inserted by
            hand now emerges rigorously.
          </Step>
        </Derivation>
        <Callout kind="insight" title="Width of a quasimode = decay rate of the cavity">
          The Lorentzian width <Tex>{String.raw`\nu/Q`}</Tex> of a pseudomode cluster (Eq.&nbsp;4, Fig.&nbsp;21-1b) is
          the same <Tex>{String.raw`\nu/Q`}</Tex> that appears as the exponential field-decay rate in Eq.&nbsp;(8).
          Spectral width in frequency space and temporal decay are Fourier conjugates of one physics.
        </Callout>
        <Callout kind="note" title="Analogy: the van der Pol oscillator">
          The set of universe modes oscillating at one common self-consistent frequency despite distinguishable natural
          frequencies is analogous to a van der Pol relaxation oscillator (Sec.&nbsp;4-2): the laser{" "}
          <em>locks</em> the modes, just as the nonlinear oscillator locks its harmonics.
        </Callout>
      </Section>

      <Section title="21-2b Quasimode dynamics &amp; the true origin of linewidth">
        <Intuition>
          Now turn on the gain medium and let many universe modes compete. Their slowly-varying amplitudes{" "}
          <Tex>{String.raw`\mathscr{E}_k`}</Tex> obey a multimode equation with linear gain, the cavity loss{" "}
          <Tex>{String.raw`\nu/Q`}</Tex> (now <em>derived</em>), and a cubic saturation term that couples modes —
          exactly the structure of the Chapter&nbsp;IX laser equations, but in the universe-mode basis. The physically
          crucial payoff concerns the laser <strong>linewidth</strong>.
        </Intuition>
        <KeyResult
          number="9"
          eq={String.raw`\dot{\mathscr{E}}_k + i(\Omega_k-\nu_n)\mathscr{E}_k + \tfrac{1}{2}\frac{\nu}{Q_n}\mathscr{E}_k = a_g M_k\!\sum_{\kappa} M_{\kappa}\mathscr{E}_{\kappa} \;-\; \beta M_k\!\!\sum_{\kappa,\kappa',\kappa''}\!\! M_{\kappa} M_{\kappa'} M_{\kappa''}\,\mathscr{E}_{\kappa}\mathscr{E}_{\kappa'}^{*}\mathscr{E}_{\kappa''}`}
          label="Multimode quasimode amplitude equation"
          note={
            <>
              Left: free rotation at detuning <Tex>{String.raw`(\Omega_k-\nu_n)`}</Tex> plus cavity decay{" "}
              <Tex>{String.raw`\tfrac12(\nu/Q_n)`}</Tex>. Right: a linear gain term (constant{" "}
              <Tex>{String.raw`a_g`}</Tex>) coupling modes through the <Tex>{String.raw`M_k`}</Tex> overlaps, minus
              a cubic saturation term (constant <Tex>{String.raw`\beta`}</Tex>). Self-saturation dominates and reduces
              this to the single-mode amplitude and frequency equations — the analogs of Eqs.&nbsp;(8.50)-(8.51).
            </>
          }
        />
        <Callout kind="warning" title="The standard linewidth-narrowing story is incomplete">
          The familiar argument is that the line narrows because the universe modes nearest line center see greater{" "}
          <em>net gain</em> — the atomic gain is the Lorentzian, peaked at line center, while the cavity loss{" "}
          <Tex>{String.raw`\nu/Q`}</Tex> is essentially flat across the band — so the central modes are amplified more
          and win. That linear gain-narrowing picture points the right way but is &ldquo;incomplete at best.&rdquo; The
          deeper, correct mechanism is <strong>frequency locking</strong>: the many universe modes do not simply
          compete and survive independently — they <em>lock</em> onto one common, self-consistent oscillation frequency
          (the van der Pol relaxation-oscillator analogy of the note above). It is this locking, not a per-mode gain
          advantage, that collapses the radiation onto a single ultra-narrow line.
        </Callout>
        <Derivation title="From quasimode dynamics to the correct linewidth mechanism">
          <Step title="Insert gain atoms into the quasimode field equation">
            Take the free quasimode evolution (which gave the decay, Eq.&nbsp;8) and add the macroscopic polarization of
            the inverted medium. Expanding that polarization to third order in the fields, exactly as in the
            semiclassical multimode theory of Chapter&nbsp;IX, produces a linear gain term (coefficient{" "}
            <Tex>{String.raw`a_g`}</Tex>) and a saturation term (coefficient <Tex>{String.raw`\beta`}</Tex>). The
            result is Eq.&nbsp;(9).
          </Step>
          <Step title="Identify self- vs cross-saturation and reduce to single mode">
            Among the cubic terms, the self-saturation terms (proportional to <Tex>{String.raw`\beta_0`}</Tex>, where
            indices coincide) are far larger than the cross-saturation terms. Dropping the weak cross terms collapses the
            huge multimode system onto the familiar single-mode amplitude and frequency equations — the analogs of
            Eqs.&nbsp;(8.50)-(8.51). This justifies the single-mode results used earlier, now from the universe-mode
            viewpoint.
          </Step>
          <Step title="Diagnose the linewidth-narrowing mechanism correctly">
            Compare the frequency dependence of net gain: the gain profile is the Lorentzian, peaked at line center,
            while the cavity loss <Tex>{String.raw`\nu/Q`}</Tex> is roughly flat across the band, so net gain peaks at
            <em>center</em> and the central universe modes are amplified most. This linear gain-narrowing argument is on
            the right track but incomplete. The mechanism that actually fixes the linewidth is{" "}
            <strong>frequency locking</strong> — the universe modes lock onto one common self-consistent frequency (the
            van der Pol picture), rather than each surviving with its own. Keep this as a conceptual derivation; it
            corrects a common misconception about <em>why</em> the line is narrow.
          </Step>
        </Derivation>
        <Callout kind="insight" title="Toward fluctuation-dissipation and condensation">
          The residual <em>nonzero</em> linewidth comes from spontaneous-emission noise, recovered via a
          fluctuation-dissipation theorem (Sec.&nbsp;19-1) / Langevin force. A fully quantized treatment makes contact
          with Bose-Einstein condensation language — foreshadowing the statistical-mechanics analogy of the next
          section.
        </Callout>
      </Section>

      <Section title="21-3 The laser threshold as a second-order phase transition">
        <Intuition>
          This is the conceptual jewel of the chapter (DeGiorgio &amp; Scully, 1970; Graham &amp; Haken). A laser is an{" "}
          <em>open</em> system: atoms are pumped in and decay out at random, so its natural description is nonequilibrium
          statistical mechanics — exactly as for a system near a phase transition. The total field diffuses in phase, a
          slow random walk &ldquo;buffeted&rdquo; by reservoir noise, just as the magnetization of a ferromagnet near
          the Curie point is buffeted by thermal fluctuations. Below threshold the time-averaged field is zero
          (disordered phase); above threshold it spontaneously acquires a definite amplitude (ordered phase) — the
          spontaneous symmetry breaking of a magnet acquiring magnetization below <Tex>{String.raw`T_c`}</Tex>.
        </Intuition>
        <p>
          The field amplitude is the stochastic variable. Near threshold, including an injected signal, its
          Glauber-<Tex>{String.raw`P`}</Tex> distribution obeys a Fokker-Planck equation:
        </p>
        <EqBlock label="10">{String.raw`\frac{\partial P}{\partial t} = -\tfrac{1}{2}\frac{\partial}{\partial\alpha}\left[\left(\mathscr{A}-\frac{\nu}{Q}-\mathscr{B}|\alpha|^2\right)\alpha P + \mathscr{A}\frac{\partial}{\partial\alpha^*}P + 2\mathscr{S}P\right] + \text{c.c.}`}</EqBlock>
        <p>
          The drift contains the linear gain <Tex>{String.raw`\mathscr{A}`}</Tex> (the cooperative, ordering influence),
          the cavity loss <Tex>{String.raw`\nu/Q`}</Tex>, the cubic saturation{" "}
          <Tex>{String.raw`\mathscr{B}|\alpha|^2`}</Tex>, and the symmetry-breaking injected signal{" "}
          <Tex>{String.raw`2\mathscr{S}`}</Tex>. The diffusion term <Tex>{String.raw`\mathscr{A}\,\partial/\partial\alpha^*`}</Tex>{" "}
          is the spontaneous-emission noise (the disordering influence). This is Eq.&nbsp;(17.25) with the external
          signal added. Setting <Tex>{String.raw`\partial P/\partial t=0`}</Tex> gives the steady state:
        </p>
        <KeyResult
          number="11"
          eq={String.raw`P(\alpha) = \mathscr{N}_P\,\exp\!\left\{\frac{4}{\mathscr{A}}\left[\tfrac{1}{4}\!\left(\mathscr{A}-\frac{\nu}{Q}-\tfrac{1}{2}\mathscr{B}|\alpha|^2\right)\!|\alpha|^2 + \tfrac{1}{2}\mathscr{S}\,(\alpha+\alpha^{*})\right]\right\}`}
          label="Steady-state laser field distribution"
          note={
            <>
              The exponent is <Tex>{String.raw`-(4/\mathscr{A})`}</Tex> times an effective potential{" "}
              <Tex>{String.raw`G(\alpha)`}</Tex>: a quadratic-minus-quartic Landau form whose curvature flips sign as the
              pump <Tex>{String.raw`\mathscr{A}`}</Tex> crosses the loss <Tex>{String.raw`\nu/Q`}</Tex> (threshold),
              giving the Mexican-hat double well above threshold; the <Tex>{String.raw`\mathscr{S}`}</Tex> term tilts the
              hat. The prefactor <Tex>{String.raw`4/\mathscr{A}`}</Tex> identifies the diffusion strength{" "}
              <Tex>{String.raw`\mathscr{A}`}</Tex> as the laser&rsquo;s effective <em>temperature</em>.
            </>
          }
        />
        <p>
          Regrouping the exponent into a quadratic <Tex>{String.raw`+`}</Tex> quartic <Tex>{String.raw`+`}</Tex> linear
          Landau potential exposes the second-order-transition structure:
        </p>
        <EqBlock label="11&prime;">{String.raw`P(\alpha) \;\propto\; \exp\!\left[\tfrac{4}{\mathscr{A}}\Big(\tfrac{1}{4}\big(\mathscr{A}-\tfrac{\nu}{Q}\big)|\alpha|^2 - \tfrac{1}{8}\mathscr{B}|\alpha|^4 + \tfrac{1}{2}\mathscr{S}(\alpha+\alpha^{*})\Big)\right]`}</EqBlock>
        <p>
          The ferromagnet provides the structural template. The equilibrium probability of magnetization{" "}
          <Tex>{String.raw`M`}</Tex> in the Landau approximation is a Boltzmann factor,
        </p>
        <EqBlock label="12">{String.raw`P(M) \;\propto\; \exp[-F(M)/k_B T],`}</EqBlock>
        <p>over the Landau free energy of a ferromagnet near a second-order transition,</p>
        <KeyResult
          number="13"
          eq={String.raw`F(M) = C(T-T_c)M^2 + D\,T\,M^4 + H\,M`}
          label="Landau free energy of a ferromagnet"
          note={
            <>
              A temperature-dependent quadratic term that changes sign at <Tex>{String.raw`T_c`}</Tex>, a stabilizing
              quartic, and a symmetry-breaking field term <Tex>{String.raw`H\,M`}</Tex>. Term-for-term analogous to the
              laser potential <Tex>{String.raw`G`}</Tex>: <Tex>{String.raw`|\alpha|^2\leftrightarrow M^2`}</Tex>,{" "}
              <Tex>{String.raw`|\alpha|^4\leftrightarrow M^4`}</Tex>, <Tex>{String.raw`\mathscr{S}\leftrightarrow H`}</Tex>,
              and <Tex>{String.raw`(\mathscr{A}-\nu/Q)\leftrightarrow -C(T-T_c)`}</Tex>.
            </>
          }
        />
        <p>
          Written in Cartesian field coordinates <Tex>{String.raw`\alpha=x+iy`}</Tex>, the laser distribution is a
          Boltzmann factor over the laser Landau potential <Tex>{String.raw`G(x,y)`}</Tex> (Table&nbsp;21-1,
          Fig.&nbsp;21-4):
        </p>
        <KeyResult
          number="14"
          eq={String.raw`P(x,y) = \mathscr{N}_P\,\exp[-G(x,y)/k_L\sigma]`}
          label="Laser distribution = Boltzmann factor"
          note={
            <>
              The denominator <Tex>{String.raw`k_L\sigma`}</Tex> is the laser analog of the thermal energy{" "}
              <Tex>{String.raw`k_B T`}</Tex>, where <Tex>{String.raw`4k_L`}</Tex> is one atom&rsquo;s spontaneous-emission
              rate and <Tex>{String.raw`\sigma`}</Tex> is the population inversion. This makes the
              laser <Tex>{String.raw`\leftrightarrow`}</Tex> ferromagnet dictionary exact.
            </>
          }
        />

        <Callout kind="note" title="Table 21-1 — the laser ↔ ferromagnet dictionary">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                <th style={{ textAlign: "left", padding: "6px 8px" }}>Quantity</th>
                <th style={{ textAlign: "left", padding: "6px 8px" }}>Laser</th>
                <th style={{ textAlign: "left", padding: "6px 8px" }}>Ferromagnet</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "6px 8px" }}>Order parameter</td>
                <td style={{ padding: "6px 8px" }}><Tex>{String.raw`E`}</Tex></td>
                <td style={{ padding: "6px 8px" }}><Tex>{String.raw`M`}</Tex></td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "6px 8px" }}>Reservoir variable</td>
                <td style={{ padding: "6px 8px" }}>inversion <Tex>{String.raw`\sigma`}</Tex></td>
                <td style={{ padding: "6px 8px" }}>temperature <Tex>{String.raw`T`}</Tex></td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "6px 8px" }}>Critical value</td>
                <td style={{ padding: "6px 8px" }}><Tex>{String.raw`\sigma_t`}</Tex></td>
                <td style={{ padding: "6px 8px" }}><Tex>{String.raw`T_c`}</Tex></td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "6px 8px" }}>Symmetry-breaking field</td>
                <td style={{ padding: "6px 8px" }}>injected signal <Tex>{String.raw`\mathscr{S}`}</Tex></td>
                <td style={{ padding: "6px 8px" }}><Tex>{String.raw`H`}</Tex></td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "6px 8px" }}>Coexistence curve</td>
                <td style={{ padding: "6px 8px" }}>
                  <Tex>{String.raw`E=\big[\tfrac{\mathscr A}{\mathscr B}\tfrac{\sigma-\sigma_t}{\sigma}\big]^{1/2}`}</Tex>
                </td>
                <td style={{ padding: "6px 8px" }}>
                  <Tex>{String.raw`M=\big[\tfrac{C}{D}\tfrac{T_c-T}{T}\big]^{1/2}`}</Tex>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "6px 8px" }}>Critical isotherm</td>
                <td style={{ padding: "6px 8px" }}>
                  <Tex>{String.raw`E=\big(\mathscr{S}/\sigma_t\mathscr{B}\big)^{1/3}`}</Tex>
                </td>
                <td style={{ padding: "6px 8px" }}>
                  <Tex>{String.raw`M=\big(H/T_c D\big)^{1/3}`}</Tex>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "6px 8px" }}>Zero-field susceptibility</td>
                <td style={{ padding: "6px 8px" }}>
                  <Tex>{String.raw`\chi=\frac{dE}{d\mathscr{S}}\big|_0`}</Tex>
                </td>
                <td style={{ padding: "6px 8px" }}>
                  <Tex>{String.raw`\chi=\frac{dM}{dH}\big|_0`}</Tex>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "6px 8px" }}>Thermodynamic potential</td>
                <td style={{ padding: "6px 8px" }}>
                  <Tex>{String.raw`G(E)=-\tfrac{\mathscr A}{2}(\sigma-\sigma_t)E^2+\tfrac{\mathscr B}{4}\sigma E^4-\mathscr{S}E\cos\phi+G_0`}</Tex>
                </td>
                <td style={{ padding: "6px 8px" }}>
                  <Tex>{String.raw`F(M)=-\tfrac{C}{2}(T-T_c)M^2+\tfrac{D}{4}T M^4-HM+F_0`}</Tex>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "6px 8px" }}>Distribution</td>
                <td style={{ padding: "6px 8px" }}>
                  <Tex>{String.raw`P(E)=e^{-G(E)/k_L\sigma}`}</Tex>
                </td>
                <td style={{ padding: "6px 8px" }}>
                  <Tex>{String.raw`P(M)=e^{-F(M)/k_B T}`}</Tex>
                </td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: "0.6rem" }}>
            The zero-field susceptibility is{" "}
            <Tex>{String.raw`\chi=[\mathscr{A}(\sigma_t-\sigma)]^{-1}`}</Tex> below threshold and{" "}
            <Tex>{String.raw`[2\mathscr{A}(\sigma-\sigma_t)]^{-1}`}</Tex> above — it <strong>diverges</strong> at
            threshold, exactly as <Tex>{String.raw`dM/dH`}</Tex> diverges at the Curie point. That divergence is the
            signature of criticality.
          </p>
        </Callout>

        <SimFrame
          title="Laser threshold as a phase transition"
          caption={
            <>
              Drive the laser across threshold and watch its steady-state field distribution{" "}
              <Tex>{String.raw`P(\alpha)=\mathscr{N}_P\exp[-4G(\alpha)/\mathscr{A}]`}</Tex> morph from a single well
              (field off, disordered) into a Mexican-hat ring (field on, broken symmetry) — exactly as a ferromagnet
              crosses its Curie point. The right panel traces the order parameter{" "}
              <Tex>{String.raw`\langle E\rangle=\langle x\rangle`}</Tex> vs pump (Fig.&nbsp;21-3): it shares the
              magnet&rsquo;s shape and converges onto the dashed ferromagnet curve above threshold, while
              spontaneous-emission noise <em>rounds</em> it near threshold and leaves a small tail below (where the
              magnet is exactly zero).
            </>
          }
          tryThis={
            <>
              With a small injected signal <Tex>{String.raw`\mathscr{S}`}</Tex>, sweep the net pump{" "}
              <Tex>{String.raw`\mathscr{A}-\nu/Q`}</Tex> from negative to positive: the potential surface morphs from a
              single well into a sombrero, and the order parameter <Tex>{String.raw`\langle E\rangle`}</Tex>{" "}
              <em>turns on</em> through threshold, converging onto the dashed ferromagnet curve above it. Now drag{" "}
              <Tex>{String.raw`\mathscr{S}\to 0`}</Tex>: the hat becomes symmetric, no phase is preferred, and{" "}
              <Tex>{String.raw`\langle E\rangle=\langle x\rangle`}</Tex> collapses to zero — the unbroken-symmetry edge
              case. Raising <Tex>{String.raw`\mathscr{S}`}</Tex> tilts the hat, concentrating probability on one side
              and rounding the transition into a smooth S-curve, just like a magnet in a field. Crank the noise{" "}
              <Tex>{String.raw`\mathscr{A}`}</Tex> up to broaden and soften everything.
            </>
          }
        >
          <Ch21Sim />
        </SimFrame>

        <Derivation title="Build the phase-transition correspondence">
          <Step title="Set up the laser as a nonequilibrium statistical system">
            Pumped-in / decayed-out atoms make the laser an open, driven system whose field amplitude is a stochastic
            variable. Its dynamics is the Fokker-Planck equation Eq.&nbsp;(10): a deterministic drift
            (gain&nbsp;&minus;&nbsp;loss&nbsp;&minus;&nbsp;saturation, plus injected signal) competing with a diffusion
            term (spontaneous-emission noise). Identify the diffusion constant <Tex>{String.raw`\mathscr{A}`}</Tex> as
            the effective temperature.
          </Step>
          <Step title="Solve for the steady state and read off the Landau potential">
            Set <Tex>{String.raw`\partial P/\partial t=0`}</Tex>. Because the drift is the gradient of a potential and
            the diffusion is constant, the stationary solution is the Boltzmann-like form Eq.&nbsp;(11),{" "}
            <Tex>{String.raw`P\sim\exp(-G/\text{[temp]})`}</Tex>. Verify consistency: the drift coefficient{" "}
            <Tex>{String.raw`(\mathscr{A}-\nu/Q-\mathscr{B}|\alpha|^2)\alpha+2\mathscr{S}`}</Tex> must equal{" "}
            <Tex>{String.raw`\mathscr{A}\,\partial_\alpha`}</Tex> of the exponent. This fixes the prefactor{" "}
            <Tex>{String.raw`4/\mathscr{A}`}</Tex> and the <Tex>{String.raw`\tfrac14,\tfrac12`}</Tex> factors — a clean
            transcription check.
          </Step>
          <Step title="Expose the second-order-transition structure">
            Regroup the exponent (Eq.&nbsp;11&prime;) into a quadratic <Tex>{String.raw`+`}</Tex> quartic{" "}
            <Tex>{String.raw`+`}</Tex> linear Landau potential. Below threshold (<Tex>{String.raw`\mathscr{A}<\nu/Q`}</Tex>)
            the quadratic coefficient is negative <Tex>{String.raw`\to`}</Tex> single well at{" "}
            <Tex>{String.raw`\alpha=0`}</Tex> (field off, symmetric). Above threshold it is positive{" "}
            <Tex>{String.raw`\to`}</Tex> the quartic forces a Mexican-hat ring of minima at{" "}
            <Tex>{String.raw`|\alpha|\neq 0`}</Tex> (field on, broken phase symmetry). The signal{" "}
            <Tex>{String.raw`\mathscr{S}`}</Tex> tilts the hat, selecting a phase.
          </Step>
          <Step title="Match every laser quantity to its ferromagnet partner (Table 21-1)">
            Set <Tex>{String.raw`G(E)`}</Tex> next to <Tex>{String.raw`F(M)`}</Tex> and read off the dictionary entry by
            entry: order parameter, reservoir variable, coexistence curve, symmetry-breaking field, critical isotherm,
            zero-field susceptibility (which <em>diverges</em> at threshold), thermodynamic potential, and distribution.
            The divergence of <Tex>{String.raw`dE/d\mathscr{S}`}</Tex> at threshold is the laser analog of the diverging
            magnetic susceptibility at the Curie point — the signature of criticality.
          </Step>
          <Step title="Compute the order parameter and compare to experiment">
            From <Tex>{String.raw`P(\alpha)`}</Tex> compute the ensemble-averaged field{" "}
            <Tex>{String.raw`\langle E\rangle\sim\langle x\rangle`}</Tex> (since <Tex>{String.raw`\mathscr{S}`}</Tex> is
            real). Plot it versus pump for both the quantum <Tex>{String.raw`P(\alpha)`}</Tex> and the semiclassical
            mean-field treatment (Fig.&nbsp;21-3). Semiclassically <Tex>{String.raw`\langle E\rangle`}</Tex> vanishes for{" "}
            <Tex>{String.raw`\mathscr{S}=0`}</Tex> below threshold (sharp transition); an injected signal rounds it. The
            quantum curve differs near threshold because noise rounds it — exactly as fluctuations round a real phase
            transition.
          </Step>
        </Derivation>

        <Callout kind="insight" title="The laser threshold IS a phase transition">
          Order parameter <Tex>{String.raw`E\leftrightarrow M`}</Tex>; inversion{" "}
          <Tex>{String.raw`\sigma\leftrightarrow T`}</Tex> (threshold{" "}
          <Tex>{String.raw`\sigma_t\leftrightarrow T_c`}</Tex>); injected signal{" "}
          <Tex>{String.raw`\mathscr{S}\leftrightarrow H`}</Tex>; noise strength{" "}
          <Tex>{String.raw`\mathscr{A}`}</Tex> (or <Tex>{String.raw`k_L\sigma`}</Tex>){" "}
          <Tex>{String.raw`\leftrightarrow k_B T`}</Tex>; Fokker-Planck steady state{" "}
          <Tex>{String.raw`\leftrightarrow`}</Tex> Boltzmann distribution; saturation{" "}
          <Tex>{String.raw`\leftrightarrow`}</Tex> quartic Landau term.
        </Callout>
        <Callout kind="warning" title="Mode-locking is NOT a phase transition">
          The chapter cautions that multimode/mode-locking phase locking (Chap.&nbsp;IX), injected-signal locking, and
          the ordinary nonequilibrium phase transition are distinct. Locking forces oscillation to a single frequency or
          periodic array; a true second-order transition is dissipative and continuous. (For a dissipative phase
          transition below threshold, cf. the B&eacute;nard instability; Graham 1973, Scully 1973.)
        </Callout>
      </Section>

      <Section title="21-4 Josephson radiation: laser theory for a junction">
        <Intuition>
          The final demonstration of the laser&rsquo;s reach: the <em>same</em> reduced-density-matrix machinery
          computes the microwave linewidth of a Josephson junction. Two superconductors separated by a thin oxide
          barrier held at voltage <Tex>{String.raw`V`}</Tex> form the AC Josephson effect — Cooper pairs tunnel
          coherently across, and because each pair carries charge <Tex>{String.raw`2e`}</Tex> and falls through{" "}
          <Tex>{String.raw`V`}</Tex>, energy conservation forces the emitted photon to satisfy{" "}
          <Tex>{String.raw`\hbar\omega=2eV`}</Tex>. The junction maps onto a laser: tunneling pairs are the{" "}
          <em>gain medium</em>, the microwave resonator is the <em>cavity</em>, the normal-metal wires provide{" "}
          <em>loss</em>, and the battery is the <em>pump</em>.
        </Intuition>
        <KeyResult
          eq={String.raw`\hbar\omega = (2e)V \qquad\Longleftrightarrow\qquad \frac{\omega}{V} = \frac{2e}{\hbar}`}
          label="AC Josephson relation"
          note={
            <>
              A tunneling Cooper pair (charge <Tex>{String.raw`2e`}</Tex>) crossing voltage drop{" "}
              <Tex>{String.raw`V`}</Tex> emits a photon of energy <Tex>{String.raw`2eV`}</Tex>; equivalently the
              radiation frequency is exactly proportional to the applied voltage with universal slope{" "}
              <Tex>{String.raw`2e/\hbar`}</Tex>. This frequency-voltage lock is precise enough to challenge measurements
              of <Tex>{String.raw`2e/h`}</Tex>.
            </>
          }
        />
        <p>
          The interaction Hamiltonian couples the tunneling pairs to the radiation field in Jaynes-Cummings-like form,
          where <Tex>{String.raw`S`}</Tex> (<Tex>{String.raw`S^\dagger`}</Tex>) transfers a pair left-to-right
          (right-to-left) and <Tex>{String.raw`a^\dagger`}</Tex> (<Tex>{String.raw`a`}</Tex>) creates (annihilates) a
          cavity photon:
        </p>
        <EqBlock label="15">{String.raw`\mathscr{V} = \hbar g\,(S\,a^{\dagger} + a\,S^{\dagger}).`}</EqBlock>
        <p>
          The finite-<Tex>{String.raw`Q`}</Tex> microwave cavity damps the density operator exactly as in the laser
          (Sec.&nbsp;16-2), and the normal-metal wires add an incoherent dissipative term:
        </p>
        <EqBlock label="16">{String.raw`\left(\frac{\partial\rho}{\partial t}\right)_{\!\text{cavity }Q} = -\tfrac{1}{2}\frac{\nu}{Q}\left(a^{\dagger}a\,\rho + \rho\,a^{\dagger}a - 2a\rho a^{\dagger}\right),`}</EqBlock>
        <EqBlock label="17">{String.raw`\left(\frac{\partial\rho}{\partial t}\right)_{\!\text{wire}} = -A\left(S S^{\dagger}\rho + \rho S S^{\dagger} - 2 S^{\dagger}\rho S\right),`}</EqBlock>
        <p>
          where <Tex>{String.raw`A`}</Tex> is fixed by the current flowing in the junction. Assembling the coherent
          commutator with the cavity-loss and wire terms gives the total master equation — structurally the laser
          master equation of Sec.&nbsp;16-2:
        </p>
        <KeyResult
          number="18"
          eq={String.raw`\dot\rho = -\frac{i}{\hbar}\big[\mathscr{H}_0 + \mathscr{V},\,\rho\big] + \left(\frac{\partial\rho}{\partial t}\right)_{\!\text{cavity}} + \left(\frac{\partial\rho}{\partial t}\right)_{\!\text{wire}}`}
          label="Junction + field master equation"
          note={
            <>
              <Tex>{String.raw`\mathscr{H}_0`}</Tex> contains the coupled-superconductor energy (the voltage/spin term,
              Eq.&nbsp;20) plus the free field <Tex>{String.raw`\Omega\,a^\dagger a`}</Tex>;{" "}
              <Tex>{String.raw`\mathscr{V}`}</Tex> is the tunneling-radiation coupling Eq.&nbsp;(15).
            </>
          }
        />
        <p>
          The junction acts as a capacitor of capacitance <Tex>{String.raw`\kappa`}</Tex> (<Tex>{String.raw`\sim`}</Tex>{" "}
          1 microfarad): the voltage is set by the excess-charge difference{" "}
          <Tex>{String.raw`N_L-N_R`}</Tex>, which we map onto a &ldquo;spin&rdquo; <Tex>{String.raw`S_z`}</Tex>:
        </p>
        <EqBlock label="19">{String.raw`V_0 = \frac{1}{\kappa}\,(N_L - N_R) = \frac{1}{\kappa}\,S_z,`}</EqBlock>
        <EqBlock label="20">{String.raw`\mathscr{H}_v = \frac{e}{\kappa}\,(N_L - N_R)^2 = \frac{e}{\kappa}\,S_z^{\,2}.`}</EqBlock>
        <p>
          Tracing the full density matrix over the photon coordinates gives the reduced charge-difference probabilities{" "}
          <Tex>{String.raw`\sigma_{k,k}`}</Tex>, where the pair-eigenstates{" "}
          <Tex>{String.raw`|k\rangle`}</Tex> diagonalize the excess-charge operator:
        </p>
        <EqBlock label="21">{String.raw`\sigma_{k,k} = \sum_n \rho_{k,n;\,k,n}, \qquad (N_L-N_R)\,|k\rangle = S_z\,|k\rangle = k\,|k\rangle.`}</EqBlock>
        <p>
          Adiabatically eliminating the fast photon coordinates yields a population equation whose transfer rate is a
          Lorentzian — the Josephson analog of the laser photon-number equation Eq.&nbsp;(17.18) for{" "}
          <Tex>{String.raw`\rho_{nn}`}</Tex>:
        </p>
        <KeyResult
          number="22"
          eq={String.raw`\dot\sigma_{k,k} = -\Bigg[\frac{g^2\!\left(\dfrac{\nu}{Q}\right)^2}{\left(\Omega-\dfrac{2e^2 k}{\hbar\kappa}\right)^2 + \left(\dfrac{\nu}{Q}\right)^2}\Bigg]\sigma_{k,k} + \Bigg[\frac{g^2\!\left(\dfrac{\nu}{Q}\right)}{\left(\Omega-\dfrac{2e^2(k+1)}{\hbar\kappa}\right)^2 + \left(\dfrac{\nu}{2Q}\right)^2}\Bigg]\sigma_{k+1,k+1} - A\big(\sigma_{k,k}-\sigma_{k-1,k-1}\big)`}
          label="Charge-difference population equation"
          note={
            <>
              The first bracket is a Lorentzian outflow/loss rate draining{" "}
              <Tex>{String.raw`\sigma_{k,k}`}</Tex>; the second is the Lorentzian transfer rate feeding it from{" "}
              <Tex>{String.raw`\sigma_{k+1,k+1}`}</Tex>: photon emission peaks when the cavity frequency{" "}
              <Tex>{String.raw`\Omega`}</Tex> matches the charging-energy step{" "}
              <Tex>{String.raw`2e^2(k+1)/\hbar\kappa`}</Tex>, with width <Tex>{String.raw`\nu/2Q`}</Tex>. The{" "}
              <Tex>{String.raw`-A(\cdots)`}</Tex> term is the wire-driven pumping.
            </>
          }
        />
        <p>
          Because <Tex>{String.raw`V_0\propto S_z`}</Tex>, the voltage correlation{" "}
          <Tex>{String.raw`\langle V_0(t)V_0(0)\rangle`}</Tex> reduces to the number correlation{" "}
          <Tex>{String.raw`\langle S_z(t)S_z(0)\rangle`}</Tex>, computable from Eq.&nbsp;(22). Its Fourier transform is a
          Lorentzian whose width is the radiation linewidth:
        </p>
        <KeyResult
          number="23"
          eq={String.raw`\Delta\nu = \frac{16\,e^3\,J_{DC}}{h^2\,\partial J/\partial V}`}
          label="Josephson radiation linewidth (~10³ Hz)"
          note={
            <>
              Set by the DC current <Tex>{String.raw`J_{DC}`}</Tex> and the differential conductance{" "}
              <Tex>{String.raw`\partial J/\partial V`}</Tex>; numerically of order <Tex>{String.raw`10^3`}</Tex> Hz. The
              same fluctuation-dissipation logic as the laser linewidth applies.
            </>
          }
        />
        <Callout kind="math" title="Transcription note on Eqs. (22)–(23)">
          The Josephson linewidth equations are the least legible and least pedagogically central in the chapter. They
          have been checked against the printed text and transcribed faithfully, including their numerical factors.
        </Callout>
        <Derivation title="Transplant the laser linewidth calculation to a junction">
          <Step title="Map the junction onto a laser">
            Identify the dictionary: coherently tunneling Cooper pairs (the BCS condensate){" "}
            <Tex>{String.raw`=`}</Tex> gain medium; microwave resonator of quality <Tex>{String.raw`Q`}</Tex>{" "}
            <Tex>{String.raw`=`}</Tex> cavity; normal-metal wires <Tex>{String.raw`=`}</Tex> loss; battery returning
            electrons <Tex>{String.raw`=`}</Tex> pump. The pair-transfer operators <Tex>{String.raw`S,S^\dagger`}</Tex>{" "}
            play the role of atomic lowering/raising operators, coupling to the field through Eq.&nbsp;(15).
          </Step>
          <Step title="Write the master equation">
            Assemble Eq.&nbsp;(18) from the coherent commutator with{" "}
            <Tex>{String.raw`\mathscr{H}_0+\mathscr{V}`}</Tex> (Eqs.&nbsp;15, 20 plus the free field{" "}
            <Tex>{String.raw`\Omega\,a^\dagger a`}</Tex>), the cavity-loss Lindblad term Eq.&nbsp;(16), and the
            wire-dissipation term Eq.&nbsp;(17). This is the Josephson copy of the Sec.&nbsp;16-2 laser master equation.
          </Step>
          <Step title="Reduce to charge-difference populations">
            Define the spin map <Tex>{String.raw`N_L-N_R=S_z`}</Tex> (Eq.&nbsp;19) with capacitor energy{" "}
            <Tex>{String.raw`\mathscr{H}_v\propto S_z^2`}</Tex> (Eq.&nbsp;20). Trace over the photon modes (Eq.&nbsp;21)
            to get the diagonal probabilities <Tex>{String.raw`\sigma_{k,k}`}</Tex>, then adiabatically eliminate the
            fast photon coordinates to obtain Eq.&nbsp;(22), whose transfer rate is a Lorentzian peaked at the
            cavity-charging resonance.
          </Step>
          <Step title="Extract the linewidth from the voltage correlation">
            Because <Tex>{String.raw`V_0\propto S_z`}</Tex>, the voltage correlation reduces to the number correlation,
            computable from Eq.&nbsp;(22). Its Fourier transform gives a Lorentzian whose width is Eq.&nbsp;(23),{" "}
            <Tex>{String.raw`\Delta\nu=16e^3 J_{DC}/(h^2\,\partial J/\partial V)\sim 10^3`}</Tex> Hz — the
            laser-linewidth calculation transplanted to a superconducting junction.
          </Step>
        </Derivation>
        <Callout kind="insight" title="ω/V = 2e/ℏ is macroscopic quantum coherence you can measure">
          The frequency-voltage lock of Josephson radiation ties an electrical voltage directly to a frequency through
          fundamental constants — precise enough to determine <Tex>{String.raw`2e/h`}</Tex>. The laser-theory linewidth
          calculation predicts how <em>sharp</em> that lock is (<Tex>{String.raw`\sim`}</Tex> kHz).
        </Callout>
        <Callout kind="note" title="Same density-matrix toolkit as the laser">
          Eqs.&nbsp;(16)-(22) are the Sec.&nbsp;16-2 laser master-equation and photon-number-population formalism applied
          verbatim. Eq.&nbsp;(22) is explicitly &ldquo;clearly very analogous&rdquo; to the laser&rsquo;s{" "}
          <Tex>{String.raw`\rho_{nn}`}</Tex> equation Eq.&nbsp;(17.18). One formalism spans atoms-in-cavities and
          Cooper-pairs-across-junctions.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from the Outlook">
          <ul>
            <li>
              <strong>The laser threshold is a second-order phase transition.</strong> Field amplitude{" "}
              <Tex>{String.raw`E`}</Tex> is the order parameter, inversion <Tex>{String.raw`\sigma`}</Tex> is the
              temperature, injected signal <Tex>{String.raw`\mathscr{S}`}</Tex> is the symmetry-breaking field, and
              noise strength <Tex>{String.raw`\mathscr{A}`}</Tex> (equivalently <Tex>{String.raw`k_L\sigma`}</Tex>) is
              the effective thermal energy. Remember the Landau picture: single well at <Tex>{String.raw`E=0`}</Tex>{" "}
              below threshold, Mexican hat with <Tex>{String.raw`|E|\neq 0`}</Tex> above.
            </li>
            <li>
              <strong>The steady-state distribution</strong> <Tex>{String.raw`P(\alpha)\sim\exp(-G/\text{[temp]})`}</Tex>{" "}
              is the stationary Fokker-Planck solution; the diffusion (noise) term gives the finite linewidth and rounds
              the transition. The zero-field susceptibility <Tex>{String.raw`dE/d\mathscr{S}`}</Tex> diverges at
              threshold — the hallmark of criticality.
            </li>
            <li>
              <strong>An open-cavity &ldquo;mode&rdquo; is not fundamental.</strong> It is a coherent quasimode
              superposition of the genuine discrete modes of an enclosing &ldquo;universe&rdquo;; the phenomenological
              decay rate <Tex>{String.raw`\nu/2Q`}</Tex> is <em>derived</em> from that packet&rsquo;s dephasing, and the
              pseudomode spectral width <Tex>{String.raw`\nu/Q`}</Tex> is its Fourier conjugate. Treat the{" "}
              <Tex>{String.raw`\nu/Q`}</Tex> inserted by hand in earlier chapters as a rigorously justified shortcut.
            </li>
            <li>
              <strong>Linewidth narrowing is frequency locking, not just a gain advantage.</strong> The linear picture
              (central universe modes see the most net gain — Lorentzian gain peaked at center, ~flat loss — and win) is
              correct as far as it goes but incomplete; the deeper mechanism is that the many universe modes{" "}
              <em>lock</em> onto one common self-consistent frequency (the van der Pol analogy), collapsing onto a single
              ultra-narrow line.
            </li>
            <li>
              <strong>One master-equation formalism</strong> (Lindblad cavity loss + coherent coupling + reservoir
              pumping) spans the laser (Chaps.&nbsp;XVI-XVII) and Josephson-junction radiation. The Josephson relation{" "}
              <Tex>{String.raw`\omega/V=2e/\hbar`}</Tex> is macroscopic quantum coherence; its linewidth (
              <Tex>{String.raw`\sim 10^3`}</Tex> Hz) follows from the same fluctuation-dissipation logic.
            </li>
            <li>
              <strong>The nonlinear polarization</strong> <Tex>{String.raw`P=\chi^{(1)}E+\chi^{(2)}EE+\chi^{(3)}EEE`}</Tex>{" "}
              from the gain medium IS the foundation of nonlinear optics; light scattering off entropy/pressure
              fluctuations (Rayleigh/Brillouin) is the basis of laser spectroscopy.
            </li>
            <li>
              <strong>The unifying theme.</strong> A sharp threshold marks where a cooperative ordering influence
              (stimulated emission, exchange, Cooper pairing) overcomes a disordering one (spontaneous-emission noise,
              thermal agitation). Phase transitions, lasing, and superconductivity are instances of the same
              competition.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
