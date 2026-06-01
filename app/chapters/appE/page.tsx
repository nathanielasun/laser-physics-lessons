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
import AppESim from "@/components/sims/appE";

export default function Page() {
  return (
    <Lesson slug="appE">
      <Lede>
        Weak-signal laser theory expands the medium&rsquo;s polarization in powers of the field and stops at third
        order. Crank up the intensity and that fails: a strong standing-wave field drives the atomic populations so hard
        that they no longer sit still &mdash; they <strong>pulsate</strong> in time at harmonics of the mode beats.
        Those pulsations feed back on the field, mixing every Fourier component of the polarization into every other
        one, and you get an infinite chain of coupled equations &mdash; component <Tex>{String.raw`n`}</Tex> talks to{" "}
        <Tex>{String.raw`n\pm 1`}</Tex>, forever. Appendix&nbsp;E shows that this hopeless-looking recursion has an{" "}
        <em>exact</em> closed form: a <strong>continued fraction</strong>. Truncate it at the first level and you
        recover the familiar third-order answer; keep the whole thing and you have the full saturated polarization to
        all orders. This is the machinery behind gain saturation, power-dependent frequency pulling, and the
        power-broadened Lamb dip.
      </Lede>

      <Section title="The four coupled equations of motion">
        <Intuition>
          Start from the density-matrix picture of a two-level gas atom in a strong field. Rather than carry the complex
          polarization directly, resolve the atomic response into physically meaningful real pieces: the in-phase part{" "}
          <Tex>{String.raw`S_n`}</Tex> (which drives frequency pulling), the in-quadrature part{" "}
          <Tex>{String.raw`C_n`}</Tex> (which drives gain and loss), the population-difference component{" "}
          <Tex>{String.raw`D`}</Tex> (how much the field has saturated the inversion), and an auxiliary sum-population
          variable <Tex>{String.raw`M`}</Tex>. Each depends on the atomic velocity <Tex>{String.raw`v`}</Tex> (through
          the Doppler shift <Tex>{String.raw`Kv`}</Tex>) and on time. The field couples to{" "}
          <Tex>{String.raw`S_n`}</Tex> and <Tex>{String.raw`D`}</Tex> directly, which makes the saturation feedback
          loop &mdash; field <Tex>{String.raw`\to S_n \to D \to`}</Tex> back into the field &mdash; explicit.
        </Intuition>
        <p>
          The in-phase polarization relaxes at the dipole rate, is rotated into the quadrature component by the
          detuning, and is driven by the field times the population difference. This last term is the one that
          ultimately produces frequency pulling:
        </p>
        <EqBlock label="E.1">
          {String.raw`\dot{S}_n = -\gamma S_n - (\omega - \nu)\,C_n - \frac{\wp^2 E_n}{\hbar}\sin(K_n z)\,D`}
        </EqBlock>
        <p>The quadrature component relaxes at the same dipole rate and is fed by the detuning-driven rotation of <Tex>{String.raw`S_n`}</Tex>; it ultimately controls gain and loss:</p>
        <EqBlock label="E.2">{String.raw`\dot{C}_n = -\gamma C_n + (\omega - \nu)\,S_n`}</EqBlock>
        <p>
          The population difference relaxes at the population rate{" "}
          <Tex>{String.raw`\gamma_{ab}=\tfrac{1}{2}(\gamma_a+\gamma_b)`}</Tex>, is coupled to{" "}
          <Tex>{String.raw`M`}</Tex> by the <em>difference</em> of level decay rates, and is driven back by the in-phase
          polarization times the field &mdash; the saturation feedback channel:
        </p>
        <EqBlock label="E.3">
          {String.raw`\dot{D} = \lambda_a - \lambda_b - \gamma_{ab} D - \tfrac{1}{2}(\gamma_a - \gamma_b)\,M + \frac{E_n}{\hbar}\sin(K_n z)\,S_n`}
        </EqBlock>
        <p>
          Finally the sum-population variable carries the pump rates{" "}
          <Tex>{String.raw`\lambda_a,\lambda_b`}</Tex> into the two levels, relaxes at{" "}
          <Tex>{String.raw`\gamma_{ab}`}</Tex>, and is cross-coupled to <Tex>{String.raw`D`}</Tex>. For equal decay
          rates <Tex>{String.raw`(\gamma_a=\gamma_b)`}</Tex> it decouples and the algebra simplifies:
        </p>
        <EqBlock label="E.4">
          {String.raw`\dot{M} = \lambda_a + \lambda_b - \gamma_{ab} M - \tfrac{1}{2}(\gamma_a - \gamma_b)\,D`}
        </EqBlock>

        <Derivation title="Where the four equations come from, and the feedback loop">
          <Step title="Origin">
            These are the in-phase / in-quadrature decomposition of the two-level density-matrix equations
            (main-text&nbsp;Eqs.&nbsp;10.55&ndash;10.62), with the self-consistency field equations&nbsp;(8.11) and
            (8.12) as the starting point. Writing them in the{" "}
            <Tex>{String.raw`S_n,\,C_n,\,D,\,M`}</Tex> basis makes the saturation feedback loop explicit, because the
            field couples to <Tex>{String.raw`S_n`}</Tex> and <Tex>{String.raw`D`}</Tex> directly.
          </Step>
          <Step title="Identify what makes the problem nonlinear">
            Read the coupling chain: the field drives <Tex>{String.raw`D`}</Tex> down through the{" "}
            <Tex>{String.raw`+(\wp/\hbar)\sin(K_n z)\,S_n`}</Tex> term in Eq.&nbsp;(E.3); a reduced{" "}
            <Tex>{String.raw`D`}</Tex> then weakens the source of <Tex>{String.raw`S_n`}</Tex> in Eq.&nbsp;(E.1). That is
            gain saturation. Because <Tex>{String.raw`D`}</Tex> and <Tex>{String.raw`S_n`}</Tex> both oscillate in{" "}
            <Tex>{String.raw`z`}</Tex> and <Tex>{String.raw`t`}</Tex> under a standing-wave field, their product
            generates new time-harmonics &mdash; the seed of the population pulsations solved next.
          </Step>
        </Derivation>

        <Callout kind="note" title="Relaxation-rate symbols">
          <Tex>{String.raw`\gamma`}</Tex> = dipole (polarization) decay rate;{" "}
          <Tex>{String.raw`\gamma_a,\gamma_b`}</Tex> = decay rates of the upper/lower levels;{" "}
          <Tex>{String.raw`\gamma_{ab}=\tfrac{1}{2}(\gamma_a+\gamma_b)`}</Tex> = population-difference decay rate;{" "}
          <Tex>{String.raw`\wp`}</Tex> = dipole matrix element; <Tex>{String.raw`E_s`}</Tex> = mode field amplitude;{" "}
          <Tex>{String.raw`K_n`}</Tex> = mode wavenumber; <Tex>{String.raw`\omega`}</Tex> = atomic transition frequency;{" "}
          <Tex>{String.raw`\nu`}</Tex> = mode (cavity) frequency; <Tex>{String.raw`(\omega-\nu)`}</Tex> = detuning.
        </Callout>
      </Section>

      <Section title="Formal integral solution and the Fourier expansion of the pulsations">
        <Intuition>
          Each equation is a linear first-order ODE in time with the relaxation rates as coefficients, so each variable
          can be written as a formal time-integral over its driving term, weighted by the decaying memory kernel{" "}
          <Tex>{String.raw`e^{-\gamma(t-t')}`}</Tex>. The standing-wave field makes the drive periodic in space and
          beating in time, so the populations and polarizations are <em>periodic</em> and can be expanded in a Fourier
          series. Substituting the series into the integral solution converts calculus into a (still infinite)
          linear-algebra problem: a recursion linking neighboring Fourier coefficients.
        </Intuition>
        <p>
          The quadrature component is slaved to the history of the in-phase component &mdash; the detuning times the
          memory integral of <Tex>{String.raw`S_n`}</Tex>:
        </p>
        <EqBlock label="E.5">
          {String.raw`C_n = (\omega - \nu_n)\int_{-\infty}^{t} dt'\, S_n(z',\,v,\,t')\,\exp[-\gamma(t - t')]`}
        </EqBlock>
        <p>
          The auxiliary variable is the steady pump term plus the memory integral of <Tex>{String.raw`D`}</Tex>;
          substituting it back into the <Tex>{String.raw`D`}</Tex> equation eliminates <Tex>{String.raw`M`}</Tex>:
        </p>
        <EqBlock label="E.6">
          {String.raw`M = -\tfrac{1}{2}(\gamma_a - \gamma_b)\int_{-\infty}^{t} dt'\, D(z',\,v,\,t')\,\exp[-\gamma_{ab}(t - t')] + \frac{\lambda_a + \lambda_b}{\gamma_{ab}}`}
        </EqBlock>
        <p>
          The in-phase equation, restated with the explicit field-times-population drive, is now ready to be
          Fourier-analyzed:
        </p>
        <EqBlock label="E.6′">
          {String.raw`\dot{S}_n = -\gamma S_n - (\omega - \nu_n)^2\!\int_{-\infty}^{t}\! dt'\, S_n(z',v,t')\,\exp[-\gamma(t-t')] - \frac{\wp^2 E_n}{\hbar}\sin(K_n z)\,D`}
        </EqBlock>
        <p>
          Eliminating <Tex>{String.raw`M`}</Tex> turns the <Tex>{String.raw`D`}</Tex> equation into a self-memory
          equation: a <Tex>{String.raw`(\gamma_a-\gamma_b)^2`}</Tex> integral appears, the population is driven by the
          field times <Tex>{String.raw`S_n`}</Tex>, and <Tex>{String.raw`\gamma_{ab}\bar N(z,v)`}</Tex> is the
          unsaturated pump source with <Tex>{String.raw`\bar N`}</Tex> the equilibrium population-difference
          distribution:
        </p>
        <EqBlock label="E.7">
          {String.raw`\dot{D} = -\gamma_{ab} D + \tfrac{1}{2}(\gamma_a - \gamma_b)^2 \!\int_{-\infty}^{t}\! dt'\, D(z',v,t')\,\exp[-\gamma_{ab}(t-t')] + \frac{E_n}{\hbar}\sin(K_n z)\,S_n + \gamma_a\gamma_b\gamma_{ab}^{-1}\,N(z,v,t)`}
        </EqBlock>
        <p>
          Inserting the Fourier expansions gives two companion recursions. The odd-index amplitudes{" "}
          <Tex>{String.raw`q_{2j+1}`}</Tex> of the polarization are driven by the difference of the neighboring
          even-index population amplitudes; the bracket on the left is the complex response including the detuning:
        </p>
        <EqBlock label="E.8">
          {String.raw`\big[(2j+1)iKv + \gamma + (\omega - \nu_n)^2[(2j+1)iKv + \gamma]^{-1}\big]\,q_{2j+1} = \tfrac{1}{2}\frac{\wp E_n}{\hbar}\,(q_{2j+2} - q_{2j})`}
        </EqBlock>
        <p>
          The even-index (population) amplitudes <Tex>{String.raw`q_{2j}`}</Tex> are driven by the difference of
          neighboring odd-index polarization amplitudes, plus the unsaturated source that only enters at{" "}
          <Tex>{String.raw`j=0`}</Tex> (the steady, DC population):
        </p>
        <EqBlock label="E.9">
          {String.raw`\big[2ijKv + \gamma_{ab} - \tfrac{1}{4}(\gamma_a - \gamma_b)^2(2ijKv + \gamma_{ab})^{-1}\big]\,q_{2j} = \tfrac{1}{2}\frac{\wp E_n}{\hbar}\,(q_{2j+1} - q_{2j-1}) + \gamma_a\gamma_b\gamma_{ab}^{-1}\,\delta_{j0}`}
        </EqBlock>

        <Figure
          caption={
            <>
              The tridiagonal coupling ladder. Odd (polarization) coefficients{" "}
              <Tex>{String.raw`q_{2j+1}`}</Tex> couple only to their even (population) neighbors and vice versa, each
              link carrying a factor of the field. Only the <Tex>{String.raw`j=0`}</Tex> rung is pumped (the{" "}
              <Tex>{String.raw`\delta_{j0}`}</Tex> source). This nearest-neighbor chain is exactly what a continued
              fraction solves.
            </>
          }
        >
          <svg viewBox="0 0 720 170" width="100%" role="img" aria-label="Tridiagonal coupling ladder of Fourier coefficients">
            <defs>
              <marker id="arrowE" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M0,1 L7,4 L0,7 Z" fill="#94a3b8" />
              </marker>
            </defs>
            {/* baseline */}
            <line x1="20" y1="95" x2="700" y2="95" stroke="#e2e8f0" strokeWidth="1" />
            {/* nodes */}
            {[
              { x: 90, lab: "q_{-2}", pop: true },
              { x: 220, lab: "q_{-1}", pop: false },
              { x: 360, lab: "q_0", pop: true, pumped: true },
              { x: 500, lab: "q_1", pop: false },
              { x: 630, lab: "q_2", pop: true },
            ].map((n, i) => (
              <g key={i}>
                <circle
                  cx={n.x}
                  cy={95}
                  r={n.pop ? 22 : 19}
                  fill={n.pop ? "#eef2ff" : "#fdf2f6"}
                  stroke={n.pumped ? "#d97706" : n.pop ? "#4f46e5" : "#e11d48"}
                  strokeWidth={n.pumped ? 3 : 2}
                />
                <text x={n.x} y={100} textAnchor="middle" fontSize="13" fill="#1f2733" fontFamily="ui-sans-serif, system-ui">
                  {n.lab.replace(/[{}]/g, "")}
                </text>
              </g>
            ))}
            {/* coupling links */}
            {[
              [90, 220],
              [220, 360],
              [360, 500],
              [500, 630],
            ].map(([a, b], i) => (
              <g key={i}>
                <path
                  d={`M ${a + 24} 78 Q ${(a + b) / 2} 40 ${b - 24} 78`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.6"
                  markerEnd="url(#arrowE)"
                />
                <path
                  d={`M ${b - 24} 112 Q ${(a + b) / 2} 150 ${a + 24} 112`}
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="1.6"
                  markerEnd="url(#arrowE)"
                />
                <text x={(a + b) / 2} y={34} textAnchor="middle" fontSize="11" fill="#5b6473" fontFamily="ui-sans-serif, system-ui">
                  ×field
                </text>
              </g>
            ))}
            {/* pump arrow */}
            <line x1="360" y1="150" x2="360" y2="120" stroke="#d97706" strokeWidth="2" markerEnd="url(#arrowE)" />
            <text x="360" y="166" textAnchor="middle" fontSize="11" fill="#b45309" fontFamily="ui-sans-serif, system-ui">
              pump (δ_{"{j0}"})
            </text>
            <text x="90" y="55" textAnchor="middle" fontSize="11" fill="#4f46e5" fontFamily="ui-sans-serif, system-ui">
              even = population
            </text>
            <text x="220" y="55" textAnchor="middle" fontSize="11" fill="#e11d48" fontFamily="ui-sans-serif, system-ui">
              odd = polarization
            </text>
          </svg>
        </Figure>

        <Derivation title="From ODEs to the tridiagonal recursion">
          <Step title="Convert ODEs to memory integrals">
            Every first-order linear ODE{" "}
            <Tex>{String.raw`\dot X = -\Gamma X + \mathrm{Drive}(t)`}</Tex> has the formal steady solution{" "}
            <Tex>{String.raw`X(t)=\int_{-\infty}^{t} dt'\,\mathrm{Drive}(t')\,e^{-\Gamma(t-t')}`}</Tex>. Apply it to{" "}
            <Tex>{String.raw`C_n`}</Tex> (rate <Tex>{String.raw`\gamma`}</Tex>) to get Eq.&nbsp;(E.5) and to{" "}
            <Tex>{String.raw`M`}</Tex> (rate <Tex>{String.raw`\gamma_{ab}`}</Tex>) to get Eq.&nbsp;(E.6). Substituting
            the <Tex>{String.raw`M`}</Tex>-integral into Eq.&nbsp;(E.3) yields the self-memory{" "}
            <Tex>{String.raw`D`}</Tex>-equation Eq.&nbsp;(E.7).
          </Step>
          <Step title="Insert the Fourier ansatz">
            Write <Tex>{String.raw`S,\,C,\,D`}</Tex> as Fourier series in the beat phase. The spatial{" "}
            <Tex>{String.raw`\sin(K_n z)`}</Tex> and the time-beating combine so each variable is a sum over integer
            harmonics with coefficients <Tex>{String.raw`q_m`}</Tex>. The memory kernels{" "}
            <Tex>{String.raw`e^{-\Gamma(t-t')}`}</Tex> Fourier-transform into the complex Lorentzian denominators{" "}
            <Tex>{String.raw`[imKv + \Gamma]^{-1}`}</Tex> visible in the brackets of Eqs.&nbsp;(E.8)&ndash;(E.9).
          </Step>
          <Step title="Read off the coupling pattern">
            Odd coefficients <Tex>{String.raw`q_{2j+1}`}</Tex> couple only to even neighbors{" "}
            <Tex>{String.raw`q_{2j},\,q_{2j+2}`}</Tex>, and even coefficients{" "}
            <Tex>{String.raw`q_{2j}`}</Tex> couple only to odd neighbors{" "}
            <Tex>{String.raw`q_{2j-1},\,q_{2j+1}`}</Tex>. This nearest-neighbor tridiagonal structure is exactly what a
            continued fraction solves; the <Tex>{String.raw`\delta_{j0}`}</Tex> marks the single inhomogeneous (pump)
            term.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Why a Fourier series at all">
          A strong standing-wave field creates a spatial population grating and a temporal beat, so the atomic response
          is periodic and a Fourier series is <em>exact</em> &mdash; not an approximation. The
          &ldquo;population pulsations&rdquo; <em>are</em> these nonzero higher Fourier harmonics of{" "}
          <Tex>{String.raw`D`}</Tex>.
        </Callout>
      </Section>

      <Section title="Dimensionless amplitudes and the complex denominators">
        <Intuition>
          To tame the infinite recursion, clean it up. Divide through by the DC (<Tex>{String.raw`j=0`}</Tex>)
          coefficient so everything is measured relative to the unsaturated population; define a single dimensionless
          field amplitude that packages <Tex>{String.raw`\wp E_s/\hbar\gamma`}</Tex> (the Rabi frequency over the
          linewidth &mdash; the natural saturation parameter); and absorb the complex Lorentzian factors into compact
          denominators <Tex>{String.raw`\mathscr{D}_{\pm n}`}</Tex>. The entire system then collapses to one master
          recursion relating <Tex>{String.raw`q_n`}</Tex> to its two neighbors.
        </Intuition>
        <KeyResult
          number="E.10"
          label="Master recursion for the reduced amplitudes"
          eq={String.raw`q_n = \bar{E}_n\,\mathscr{D}_n\,(q_{n+1} - q_{n-1}) + \delta_{n0}`}
          note={
            <>
              <Tex>{String.raw`\bar{E}_n`}</Tex> is the dimensionless field-linear amplitude (Eq.&nbsp;E.11),{" "}
              <Tex>{String.raw`\mathscr{D}_n`}</Tex> a complex denominator, and the{" "}
              <Tex>{String.raw`\delta_{n0}`}</Tex> the unsaturated source surviving only at{" "}
              <Tex>{String.raw`n=0`}</Tex>. Everything downstream is built from this.
            </>
          }
        />
        <p>
          The dimensionless field amplitude <Tex>{String.raw`\bar{E}_n`}</Tex> is field-linear, in units of dipole over
          (linewidth times <Tex>{String.raw`\hbar`}</Tex>); its square{" "}
          <Tex>{String.raw`I_n = \bar{E}_n^2`}</Tex> is the saturation parameter the continued fraction is effectively a
          power series in:
        </p>
        <EqBlock label="E.11">{String.raw`\bar{E}_n \equiv \sqrt{I_n} \equiv \wp E_n/\sqrt{2\gamma_a\gamma_b\,\hbar^2}`}</EqBlock>
        <p>
          The complex denominator carries the Lorentzian lineshape and the Doppler shift{" "}
          <Tex>{String.raw`Kv`}</Tex> plus/minus the detuning. Its real part gives absorptive (gain) response, its
          imaginary part dispersive (frequency-pulling) response; the <Tex>{String.raw`\pm`}</Tex> index tags the two
          sidebands of the population pulsation:
        </p>
        <EqBlock label="E.12">
          {String.raw`\mathscr{D}_{2j+1} = \tfrac{1}{2}\left(\tfrac{1}{2}\gamma_a\gamma_b\right)^{1/2}\big\{\mathscr{D}[(2j+1)Kv - (\omega-\nu_n)] + \mathscr{D}[(2j+1)Kv + (\omega-\nu_n)]\big\}\quad\text{and}\quad \mathscr{D}_{2j} = \tfrac{1}{2}\left(\tfrac{1}{2}\gamma_a\gamma_b\right)^{1/2}\big\{\mathscr{D}_a[2jKv] + \mathscr{D}_b[2jKv]\big\}`}
        </EqBlock>

        <Derivation title="Normalizing and packaging the Lorentzians">
          <Step title="Normalize by the steady population">
            Define <Tex>{String.raw`q_n`}</Tex> as the <Tex>{String.raw`n`}</Tex>-th Fourier coefficient divided by the
            unsaturated population (the <Tex>{String.raw`n=0`}</Tex> source). This turns the inhomogeneous term in
            Eq.&nbsp;(E.9) into a clean Kronecker delta and makes every{" "}
            <Tex>{String.raw`q_n`}</Tex> dimensionless.
          </Step>
          <Step title="Package the Lorentzians into 𝒟±n">
            The brackets <Tex>{String.raw`[imKv + \Gamma]^{-1}`}</Tex> from the Fourier-transformed kernels are
            rewritten as the complex denominators <Tex>{String.raw`\mathscr{D}_{\pm n}`}</Tex> of Eq.&nbsp;(E.12). The{" "}
            <Tex>{String.raw`\pm`}</Tex> distinguishes the upper and lower beat sidebands;{" "}
            <Tex>{String.raw`Kv`}</Tex> is the Doppler shift of an atom moving with velocity{" "}
            <Tex>{String.raw`v`}</Tex>, <Tex>{String.raw`(\omega-\nu_n)`}</Tex> the detuning of mode{" "}
            <Tex>{String.raw`n`}</Tex>, and <Tex>{String.raw`\gamma_{ab}^{-1}`}</Tex> sets the saturation linewidth.
          </Step>
        </Derivation>

        <Callout kind="warning" title="It's the field squared">
          <Tex>{String.raw`I_n = \bar{E}_n^2 \propto \wp^2 E_s^2/(\gamma^2\hbar^2)`}</Tex> &mdash; every level of the
          continued fraction adds two more powers of the field. The first convergent is third order in{" "}
          <Tex>{String.raw`E`}</Tex> (the weak-signal result); the second adds fifth order; and so on.
        </Callout>
      </Section>

      <Section title="Summing the infinite recursion: the continued fraction">
        <Intuition>
          Here is the payoff. The master recursion{" "}
          <Tex>{String.raw`q_n = \bar{E}_n\,\mathscr{D}_n\,(q_{n+1} - q_{n-1}) + \delta_{n0}`}</Tex> relates each
          coefficient to its neighbors on <em>both</em> sides. Define ratios{" "}
          <Tex>{String.raw`r_j = q_{j+1}/q_j`}</Tex> of successive coefficients; the recursion becomes a single
          nonlinear first-order <em>difference</em> equation for the ratio &mdash; and a difference equation of this
          fractional-linear type has a standard solution as a <strong>continued fraction</strong>. Iterating outward
          builds the nested structure; negative indices are handled identically with primed ratios. The continued
          fraction is the exact sum of the infinite all-orders saturation series.
        </Intuition>
        <p>
          Turning the three-term recursion into a relation among ratios is what makes the continued fraction appear:
        </p>
        <EqBlock label="E.13–14">{String.raw`r_j \equiv -\,q_{j+1}/q_j,\qquad j \ge 0.`}</EqBlock>
        <p>
          Iterating the resulting nonlinear first-order difference equation generates the fraction:
        </p>
        <EqBlock label="E.15">{String.raw`r_{j-1} = \bar{E}_n \mathscr{D}_j\,(1 + \bar{E}_n \mathscr{D}_j\, r_j)^{-1}`}</EqBlock>
        <KeyResult
          number="E.16"
          label="Continued fraction for r₀ (positive branch) — the central result"
          eq={String.raw`r_0 = \cfrac{\bar{E}_n \mathscr{D}_1}{1 + \cfrac{I_n \mathscr{D}_1 \mathscr{D}_2}{1 + \cfrac{I_n \mathscr{D}_2 \mathscr{D}_3}{1 + \cdots}}}`}
          note={
            <>
              The exact, all-orders summation of the population-pulsation recursion. Each deeper level adds two more
              powers of field. Truncating after the first <Tex>{String.raw`1`}</Tex> reproduces the third-order
              weak-signal polarization; keeping the whole fraction gives the complete strong-signal response.
            </>
          }
        />
        <p>
          The negative-index branch (running the recursion the other direction) is needed because the pulsations extend
          to negative harmonics too:
        </p>
        <EqBlock label="E.17">{String.raw`r'_j = q_j / q_{j+1}`}</EqBlock>
        <KeyResult
          number="E.18"
          label="Continued fraction for r′₋₁ (negative branch)"
          eq={String.raw`r'_{-1} = \cfrac{\bar{E}_n \mathscr{D}_{-1}}{1 + \cfrac{I_n \mathscr{D}_{-1}\mathscr{D}_{-2}}{1 + \cfrac{I_n \mathscr{D}_{-2}\mathscr{D}_{-3}}{1 + \cdots}}}`}
          note={
            <>
              Structurally identical to Eq.&nbsp;(E.16) but running through the negative denominators
              &mdash; it supplies the lower-sideband contribution.
            </>
          }
        />
        <p>
          The first positive and negative coefficients then follow from the DC coefficient using the
          continued-fraction ratios:
        </p>
        <EqBlock label="E.19">{String.raw`q_1 = -r_0\, q_0`}</EqBlock>
        <EqBlock label="E.20">{String.raw`q_{-1} = r'_{-1}\, q_0 = r_0^*\, q_0`}</EqBlock>
        <p>
          The key symmetry is that <Tex>{String.raw`r'_{-1}=r_0^*`}</Tex>, because the negative-index denominators are
          complex conjugates of the positive ones (the <Tex>{String.raw`\pm`}</Tex> in{" "}
          <Tex>{String.raw`\mathscr{D}_{\pm n}`}</Tex>). This conjugate relation is what lets the final results be
          written as real parts.
        </p>

        <Derivation title="From three-term recursion to continued fraction">
          <Step title="Reduce the order of the difference equation">
            Take Eq.&nbsp;(E.10) for index <Tex>{String.raw`j`}</Tex>, divide by{" "}
            <Tex>{String.raw`q_j`}</Tex>, and identify{" "}
            <Tex>{String.raw`r_{j-1}=q_j/q_{j-1}`}</Tex> and{" "}
            <Tex>{String.raw`r_j=q_{j+1}/q_j`}</Tex>. The three-term linear recursion becomes the one-term nonlinear
            relation Eq.&nbsp;(E.15) &mdash; the standard reduction of a linear second-order difference equation to a
            first-order nonlinear one.
          </Step>
          <Step title="Iterate to build the fraction">
            Substitute the expression for <Tex>{String.raw`r_{j+1}`}</Tex> into{" "}
            <Tex>{String.raw`r_j`}</Tex>, then <Tex>{String.raw`r_{j+2}`}</Tex> into{" "}
            <Tex>{String.raw`r_{j+1}`}</Tex>, indefinitely. Setting <Tex>{String.raw`j=0`}</Tex> and unrolling gives
            Eq.&nbsp;(E.16); each nesting level divides in{" "}
            <Tex>{String.raw`I_n\mathscr{D}_k\mathscr{D}_{k+1}`}</Tex> and carries field to order{" "}
            <Tex>{String.raw`2k+1`}</Tex>.
          </Step>
          <Step title="Negative branch and the conjugate symmetry">
            Repeat for negative <Tex>{String.raw`j`}</Tex> with primed ratios (Eqs.&nbsp;E.17&ndash;18). Because{" "}
            <Tex>{String.raw`\mathscr{D}_{-n}=\mathscr{D}_{+n}^*`}</Tex>, the negative continued fraction is the
            conjugate of the positive one, giving <Tex>{String.raw`q_{-1}=r_0^* q_0`}</Tex> (Eq.&nbsp;E.20). This
            collapses the two branches into the real and imaginary parts of a single complex ratio.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Weak-signal = first convergent">
          Truncate Eq.&nbsp;(E.16) at <Tex>{String.raw`1`}</Tex> (drop everything inside the first bracket):{" "}
          <Tex>{String.raw`r_0 \to \bar{E}_n \mathscr{D}_1`}</Tex>. Plugging back gives the third-order polarization
          of standard weak-signal Lamb theory. The continued fraction is its exact all-orders completion.
        </Callout>
        <Callout kind="math" title="How to evaluate numerically">
          Continued fractions are evaluated <strong>bottom-up</strong>: start at a deep level{" "}
          <Tex>{String.raw`N`}</Tex> (set the innermost bracket to 1), then fold inward level by level. Convergence is
          fast &mdash; each <Tex>{String.raw`I_n`}</Tex> factor is small for fields below a few saturation
          intensities, so <Tex>{String.raw`N=6`}</Tex> is converged for <Tex>{String.raw`I\le 10`}</Tex>.
        </Callout>
      </Section>

      <Section title="Assembling the complex polarization">
        <Intuition>
          With the Fourier coefficients in hand (<Tex>{String.raw`q_1=-r_0 q_0`}</Tex>,{" "}
          <Tex>{String.raw`q_{-1}=r_0^* q_0`}</Tex>), reconstruct the physical polarization. Because the two sideband
          contributions are complex conjugates, their sum is twice the real part of a single complex quantity &mdash; so
          the saturated population difference and the polarization both come out as real parts of continued-fraction
          expressions. Substituting back into the self-consistency field equations (8.11, 8.12) yields the macroscopic
          polarization as a velocity integral over the Maxwellian distribution of the per-atom response.
        </Intuition>
        <p>
          Closing the loop on the DC coefficient: <Tex>{String.raw`q_0`}</Tex> is sourced by{" "}
          <Tex>{String.raw`1`}</Tex> (the pump) plus the saturation feedback through its neighbors, which by the
          conjugate symmetry reduces to a real part of <Tex>{String.raw`r_0`}</Tex>:
        </p>
        <EqBlock label="E.21">
          {String.raw`q_0 = \bar{E}_n \mathscr{D}_0 (q_1 - q_{-1}) + 1 = -\bar{E}_n \mathscr{D}_0\, (r_0 + r_0^*)\, q_0 + 1`}
        </EqBlock>
        <KeyResult
          number="E.22/23"
          label="Saturated population denominator"
          eq={String.raw`q_0 = [1 + 2\bar{E}_n \mathscr{D}_0\,\mathrm{Re}(r_0)]^{-1}\quad(\text{equivalently } q_0 = (1 + I_n\mathfrak{F})^{-1},\text{ book Eq 23})`}
          note={
            <>
              The denominator is the saturation factor: as the field (hence{" "}
              <Tex>{String.raw`I_n`}</Tex>) grows, <Tex>{String.raw`q_0`}</Tex> shrinks below 1 &mdash; that{" "}
              <em>is</em> gain saturation, written exactly.
            </>
          }
        />
        <p>The saturated population difference expressed through <Tex>{String.raw`\mathrm{Re}(r_0)`}</Tex>:</p>
        <EqBlock label="E.22">
          {String.raw`\mathfrak{F} = 2\gamma_{ab}\big(\sqrt{2\gamma_a\gamma_b}\,\bar{E}_n\big)^{-1}\mathrm{Re}(r_0) = 2\gamma_{ab}\hbar\,(\wp E_n)^{-1}\,\mathrm{Re}(r_0)`}
        </EqBlock>
        <p>
          The first polarization Fourier coefficients, with the saturation factor folded in (<Tex>{String.raw`I_n = \bar{E}_n^2`}</Tex>{" "}
          the dimensionless intensity-like quantity, the field-linear amplitude squared):
        </p>
        <EqBlock label="E.24">{String.raw`q_1 = -r_0\,(1 + I_n\mathfrak{F})^{-1}`}</EqBlock>
        <EqBlock label="E.25">{String.raw`q_{-1} = r_0^*\,(1 + I_n\mathfrak{F})^{-1}`}</EqBlock>
        <p>
          Reconstructed from its Fourier coefficients and the memory integral, the quadrature polarization is the
          velocity- and position-resolved gain response of mode <Tex>{String.raw`n`}</Tex>:
        </p>
        <EqBlock label="E.26">
          {String.raw`C_n(z,v,t) = -i\,(\omega - \nu_n)\,N(z,v,t)\sum_{j} q_{2j+1}(v)\,e^{i(2j+1)K_n z}\!\int_{-\infty}^{t}\! dt'\,\exp\{[-\gamma - i(2j+1)Kv](t - t')\}`}
        </EqBlock>
        <p>
          The macroscopic complex polarization for mode <Tex>{String.raw`n`}</Tex>, assembled from the odd Fourier
          coefficients: the <Tex>{String.raw`i`}</Tex> picks out the absorptive (gain) part, the{" "}
          <Tex>{String.raw`(\omega-\nu_n)`}</Tex> term the dispersive (pulling) part:
        </p>
        <EqBlock label="E.27">
          {String.raw`\mathscr{P}_n(z,v,t) = -\wp N \sum_{j} q_{2j+1}\,e^{i(2j+1)K_n z}\,\big\{i + (\omega - \nu_n)\,\mathscr{D}[(2j+1)Kv]\big\}`}
        </EqBlock>

        <Derivation title="Closing the DC equation and reconstructing P">
          <Step title="Close the DC equation">
            Put <Tex>{String.raw`q_1=-r_0 q_0`}</Tex> and{" "}
            <Tex>{String.raw`q_{-1}=r_0^* q_0`}</Tex> (Eqs.&nbsp;E.19&ndash;20) into the{" "}
            <Tex>{String.raw`n=0`}</Tex> master recursion. The source structure yields{" "}
            <Tex>{String.raw`2\,\mathrm{Re}(r_0)`}</Tex>, giving Eq.&nbsp;(E.21); solving the linear equation for{" "}
            <Tex>{String.raw`q_0`}</Tex> gives the saturation denominator Eq.&nbsp;(E.22/23).
          </Step>
          <Step title="Fold the saturation factor into the sidebands">
            With <Tex>{String.raw`q_0`}</Tex> known, <Tex>{String.raw`q_{\pm1}`}</Tex> acquire the common factor{" "}
            <Tex>{String.raw`[1 + I_n \mathfrak{F}]^{-1}`}</Tex> (Eqs.&nbsp;E.24&ndash;25) &mdash; the strong-signal
            generalization of the simple Lorentzian, the response per velocity group reduced by its own saturation.
          </Step>
          <Step title="Reconstruct P via the field equations">
            Substitute the Fourier sums (with the memory integrals of Eqs.&nbsp;E.5/6) into the polarization, project
            onto the standing-wave mode, and integrate over the Maxwellian{" "}
            <Tex>{String.raw`W(v)`}</Tex>. The result, Eqs.&nbsp;(E.26)&ndash;(E.27), is the velocity-integrated complex
            polarization that drives the self-consistency equations.
          </Step>
        </Derivation>

        <Callout kind="note" title="External cross-references">
          Eqs.&nbsp;(8.11), (8.12) are the self-consistency (field) equations from Chapter&nbsp;VIII;
          Eqs.&nbsp;(10.55)&ndash;(10.62) are the density-matrix equations of Chapter&nbsp;X;{" "}
          <Tex>{String.raw`W(v)`}</Tex> is the Maxwell&ndash;Boltzmann velocity distribution;{" "}
          <Tex>{String.raw`N(z,v)`}</Tex> and <Tex>{String.raw`\bar N`}</Tex> are the saturated and unsaturated
          population-difference densities. These live in the main text, not this appendix.
        </Callout>
      </Section>

      <Section title="Amplitude and frequency equations; the population-pulsation factor">
        <Intuition>
          The self-consistency conditions of laser oscillation split the complex polarization into two real conditions:
          the <em>imaginary</em> (in-quadrature) part sets the <strong>amplitude</strong> &mdash; gain equals loss,
          fixing the steady intensity; the <em>real</em> (in-phase) part sets the <strong>frequency</strong> &mdash; the
          mode pulls toward line center. The strong-signal amplitude and frequency equations have the <em>same form</em>{" "}
          as the weak-signal ones, but with the third-order coefficient replaced by a continued-fraction (saturated)
          coefficient and an extra multiplicative population-pulsation factor that reduces to 1 in the weak limit. That
          is the chapter&rsquo;s bottom line.
        </Intuition>
        <p>
          The self-consistency equations (from 8.11): the cavity-loss term balances the imaginary part of the
          polarization (gain = loss, the amplitude condition), and the frequency shift equals minus the real part (the
          frequency-pulling condition), with <Tex>{String.raw`Q_n`}</Tex> the mode quality factor and{" "}
          <Tex>{String.raw`\Omega_n`}</Tex> the passive-cavity frequency:
        </p>
        <EqBlock label="8.11">
          {String.raw`\frac{\nu}{2Q_n}E_n = \frac{\nu}{2\varepsilon_0}\,2\wp\bar{N}\!\int dv\,W(v)\,\mathrm{Re}(r_0)(1+I_n\mathfrak{F})^{-1},\qquad \nu_n - \Omega_n = -\frac{\nu}{2\varepsilon_0}\,\mathrm{Re}(\mathscr{P}_n)\,E_n^{-1}`}
        </EqBlock>
        <p>
          The amplitude (gain) equation as a velocity integral over the Maxwellian, with the strong-signal saturation
          factor <Tex>{String.raw`[1 + I_n\mathfrak{F}]^{-1}`}</Tex> reducing the integrand as intensity rises; setting
          the left side to zero (steady state) fixes the operating intensity:
        </p>
        <EqBlock label="E.28">
          {String.raw`\frac{\hbar\varepsilon_0\gamma_{ab}}{\wp^2\bar{N}Q_n} = 2\!\int_{0}^{\infty}\! dv\, W(v)\,\mathfrak{F}(v,\omega-\nu_n,I_n)\,[1 + I_n\,\mathfrak{F}(v,\omega-\nu_n,I_n)]^{-1}`}
        </EqBlock>
        <KeyResult
          number="E.29"
          label="Frequency-determining equation"
          eq={String.raw`\frac{\nu_n - \Omega_n}{\omega - \nu_n} = 2\,\bar{N}\,(\nu\wp/\varepsilon_0 E_n)\!\int_{0}^{\infty}\! dv\, W(v)\,\mathrm{Re}[r_0\,\mathscr{D}(Kv)]\,[1 + I_n\,\mathfrak{F}(v,\omega-\nu_n,I_n)]^{-1}`}
          note={
            <>
              Power-dependent frequency pulling: the fractional pull of the lasing frequency toward line center equals a
              velocity integral of the in-phase (dispersive) saturated response{" "}
              <Tex>{String.raw`\mathrm{Re}(r_0)`}</Tex>, times the saturation factor.
            </>
          }
        />
        <p>
          An auxiliary integral built from the imaginary part of <Tex>{String.raw`r_0`}</Tex> enters the lowest-order
          strong-signal approximation, with <Tex>{String.raw`Z_i`}</Tex> the imaginary part of the plasma dispersion
          function:
        </p>
        <EqBlock label="E.30">
          {String.raw`\mathfrak{R}^{-1} = 2Ku\,[\gamma_{ab}Z_i(\gamma)]^{-1}\!\int_{0}^{\infty}\! dv\, W(v)\,\mathfrak{F}(v,\omega-\nu_n,I_n)\,[1 + I_n\,\mathfrak{F}(v,\omega-\nu_n,I_n)]^{-1}`}
        </EqBlock>
        <p>
          The lowest-order (first-convergent) approximation to the continued fraction is just{" "}
          <Tex>{String.raw`\bar{E}_n\mathscr{D}_1`}</Tex>; the two terms are the two beat sidebands at{" "}
          <Tex>{String.raw`\pm(\omega-\nu_n)`}</Tex>. This is the weak-signal seed:
        </p>
        <EqBlock label="E.31">
          {String.raw`r_0 \simeq \bar{E}_n \mathscr{D}_1 = \tfrac{1}{4}\frac{\wp E_n}{\hbar}\,\{\mathscr{D}[Kv - (\omega - \nu_n)] + \mathscr{D}[Kv + (\omega - \nu_n)]\}`}
        </EqBlock>
        <p>The corresponding lowest-order saturated population difference:</p>
        <EqBlock label="E.32">
          {String.raw`\mathfrak{F} = 2\gamma_{ab}(2\gamma_a\gamma_b)^{-1/2}\bar{E}_n^{-1}\mathrm{Re}(r_0) \simeq 2\gamma_{ab}(2\gamma_a\gamma_b)^{-1/2}\mathrm{Re}(\mathscr{D}_1) = \tfrac{1}{2}\frac{\gamma_{ab}}{\gamma}\,[\mathscr{L}(\omega-\nu_n + Kv) + \mathscr{L}(\omega-\nu_n - Kv)]`}
        </EqBlock>
        <p>
          The saturated population difference is the unsaturated <Tex>{String.raw`N(z,v)`}</Tex> divided by a saturation
          denominator built from the two-sideband response &mdash; the explicit form of gain saturation per velocity
          group:
        </p>
        <EqBlock label="E.33">
          {String.raw`D(z,v,t) = N(z,v,t)\,\big\{1 + \tfrac{1}{2}I_n\,\tfrac{\gamma_{ab}}{\gamma}[\mathscr{L}(\omega - \nu_n + Kv) + \mathscr{L}(\omega - \nu_n - Kv)]\big\}^{-1}`}
        </EqBlock>
        <p>
          The in-phase product needed for the frequency equation, as a difference of the two sideband dispersive
          responses with the saturation factor (the <Tex>{String.raw`\mathrm{Re}`}</Tex> picks the dispersive pulling
          contribution):
        </p>
        <EqBlock label="E.34">
          {String.raw`(\omega - \nu_n)\,\mathrm{Re}[r_0\,\mathscr{D}(Kv)] = \tfrac{1}{4}\frac{\wp E_n}{\hbar}\,\mathrm{Re}\{i\,\mathscr{D}[Kv + (\omega - \nu_n)] - i\,\mathscr{D}[Kv - (\omega - \nu_n)]\}`}
        </EqBlock>
        <KeyResult
          number="E.35"
          label="Final strong-signal polarization"
          eq={String.raw`\mathscr{P}_n(t) = -i\,\wp^2\,\frac{E_n}{\hbar}\,\bar{N}\!\int_{-\infty}^{\infty}\! dv\, W(v)\,\mathscr{D}(\omega - \nu_n + Kv)\,\Big\{1 + \tfrac{1}{2}I_n\,\tfrac{\gamma_{ab}}{\gamma}\big[\mathscr{L}(\omega - \nu_n + Kv) + \mathscr{L}(\omega - \nu_n - Kv)\big]\Big\}^{-1}`}
          note={
            <>
              A Maxwellian velocity integral of the per-atom response divided by the population-pulsation (saturation)
              factor. Fed into Eq.&nbsp;(8.11), its imaginary part fixes the laser amplitude (gain = loss) and its real
              part fixes the frequency (pulling) &mdash; the chapter&rsquo;s final deliverable.
            </>
          }
        />

        <Derivation title="Splitting self-consistency and the lowest-order check">
          <Step title="Split into amplitude and frequency">
            The complex field equation (8.11) separates into its imaginary part (gain balances cavity loss{" "}
            <Tex>{String.raw`\nu/2Q`}</Tex> &mdash; the amplitude/intensity condition) and its real part (the mode
            frequency pulled from <Tex>{String.raw`\Omega_n`}</Tex> toward atomic line center &mdash; the frequency
            condition). This is the standard Lamb self-consistency split, now fed the saturated polarization.
          </Step>
          <Step title="Insert the continued-fraction polarization">
            Take Eq.&nbsp;(E.27)/(E.35) and do the velocity integral over{" "}
            <Tex>{String.raw`W(v)`}</Tex>. The imaginary part gives the gain integral Eq.&nbsp;(E.28); the real part
            gives the frequency-pull integral Eq.&nbsp;(E.29). Both carry the saturation factor{" "}
            <Tex>{String.raw`[1 + I_n\mathfrak{F}]^{-1}`}</Tex>.
          </Step>
          <Step title="Lowest-order check and the pulsation factor">
            Replace <Tex>{String.raw`r_0`}</Tex> by its first convergent{" "}
            <Tex>{String.raw`\bar{E}_n\mathscr{D}_1`}</Tex> (Eq.&nbsp;E.31) and the population by
            Eq.&nbsp;(E.32/33); the polarization reduces to the third-order weak-signal form. Restoring the full
            continued fraction reinstates the multiplicative population-pulsation factor in Eq.&nbsp;(E.35) &mdash; the
            saturation denominator that distinguishes strong-signal from weak-signal theory.
          </Step>
        </Derivation>

        <Callout kind="insight" title="The one-line summary of the appendix">
          Strong-signal theory keeps the <em>same</em> amplitude and frequency equations as weak-signal Lamb theory,
          but multiplies the polarization by a population-pulsation saturation factor{" "}
          <Tex>{String.raw`[1 + I_n\mathfrak{F}]^{-1}`}</Tex> obtained from the continued fraction. Weak-signal is the{" "}
          <Tex>{String.raw`I_n\to 0`}</Tex> limit.
        </Callout>
        <Callout kind="note" title="Symbols introduced here">
          <Tex>{String.raw`Q_n`}</Tex> = mode quality factor; <Tex>{String.raw`\Omega_n`}</Tex> = passive-cavity
          frequency; <Tex>{String.raw`\nu_n`}</Tex> = lasing-mode frequency; <Tex>{String.raw`I_n`}</Tex> =
          dimensionless saturation intensity of mode <Tex>{String.raw`n`}</Tex>; <Tex>{String.raw`W(v)`}</Tex> =
          Maxwellian velocity distribution; <Tex>{String.raw`Z_i`}</Tex> = imaginary part of the plasma dispersion
          function; <Tex>{String.raw`\mathfrak{I}`}</Tex> = imaginary part of <Tex>{String.raw`r_0`}</Tex>.
        </Callout>
      </Section>

      <Section title="Explore it: the continued-fraction saturation of a gas laser">
        <p>
          The simulation below has two linked views of the same physics. The two spectra plot the{" "}
          <strong>saturated strong-signal response</strong>: the per-velocity-group polarization divided by the
          population-pulsation saturation factor (Eqs.&nbsp;E.33/E.35), Maxwellian-averaged over velocity
          (Eqs.&nbsp;E.28&ndash;29). The top panel is the <strong>saturated gain</strong> (the imaginary, in-quadrature
          part); the second is <strong>frequency pulling</strong> (the real, in-phase part), both versus cavity detuning{" "}
          <Tex>{String.raw`\Delta=(\omega-\nu)/\gamma`}</Tex>. A dashed weak-signal (<Tex>{String.raw`I\to 0`}</Tex>)
          overlay shows exactly what saturation adds. The third panel is separate: it evaluates the continued fraction
          (Eq.&nbsp;E.16) that this saturation factor is the closed form of, and watches its residual collapse as you
          raise the truncation depth <Tex>{String.raw`N`}</Tex>.
        </p>
        <SimFrame
          title="Strong-signal gain & frequency pulling"
          caption={
            <>
              Two velocity-averaged spectra plus a convergence inset. Gain is even in{" "}
              <Tex>{String.raw`\Delta`}</Tex>; the dispersive pulling curve is the odd S-shape. The grating animation up
              top is the pulsating population grating <Tex>{String.raw`D(z,t)`}</Tex> the field burns into the medium.
            </>
          }
          tryThis={
            <>
              In the Doppler regime (keep <Tex>{String.raw`Ku/\gamma\approx 8`}</Tex>), drag{" "}
              <Tex>{String.raw`I`}</Tex> up from 0: the gain curve drops overall (saturation) and a narrow{" "}
              <strong>Lamb dip</strong> carves into line center and <strong>power-broadens</strong>. The dashed
              weak-signal curve has <em>no</em> dip &mdash; the gap between the two is exactly what saturation adds. Push{" "}
              <Tex>{String.raw`\gamma_a/\gamma_b`}</Tex> away from 1 and the dip depth and the saturated gain shift, since{" "}
              <Tex>{String.raw`\gamma_{ab}`}</Tex> sets the width of the holes the field burns. In the convergence panel,
              slide <Tex>{String.raw`N`}</Tex> from 1 upward and watch the residual collapse below{" "}
              <Tex>{String.raw`10^{-4}`}</Tex> within a handful of levels: <Tex>{String.raw`N=1`}</Tex> is the
              weak-signal first convergent, and a few more nail the exact all-orders sum that the saturation factor in
              the spectra is built from.
            </>
          }
        >
          <AppESim />
        </SimFrame>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="The ideas you keep">
          <ul>
            <li>
              <strong>Weak-signal = first convergent.</strong> Third-order laser theory is just the lowest term of an
              exact continued fraction; whenever you see a third-order polarization, remember it is the first term of an
              all-orders saturation series.
            </li>
            <li>
              <strong>The saturation parameter is the field squared,</strong>{" "}
              <Tex>{String.raw`I_n=\bar{E}_n^2=\tfrac{1}{4}\wp^2 E_s^2/(\gamma^2\hbar^2)`}</Tex>; saturation series advance
              in powers of this quantity, two field powers per order.
            </li>
            <li>
              <strong>Strong = weak × pulsation factor.</strong> The strong-signal amplitude/frequency equations are the
              weak-signal ones with the polarization multiplied by{" "}
              <Tex>{String.raw`[1 + I_n\mathfrak{F}]^{-1}`}</Tex> &mdash; this factor encodes gain saturation, power
              broadening, and the power-dependent Lamb dip.
            </li>
            <li>
              <strong>Population pulsations</strong> are the nonzero higher Fourier harmonics{" "}
              <Tex>{String.raw`q_n`}</Tex> of <Tex>{String.raw`D`}</Tex>; a strong field makes the populations oscillate
              at harmonics of the mode beat, coupling every polarization component to its neighbors (tridiagonal
              recursion).
            </li>
            <li>
              <strong>Complex denominators</strong> <Tex>{String.raw`\mathscr{D}_{\pm n}`}</Tex> carry both the
              Lorentzian gain lineshape (real part) and dispersion (imaginary part); the{" "}
              <Tex>{String.raw`\pm`}</Tex> tags the two beat sidebands, and{" "}
              <Tex>{String.raw`\mathscr{D}_{-n}=\mathscr{D}_{+n}^*`}</Tex> gives the conjugate symmetry that lets results
              be written as real parts.
            </li>
            <li>
              <strong>Self-consistency splits into two real conditions:</strong>{" "}
              <Tex>{String.raw`\mathrm{Im}(\mathscr{P})\to`}</Tex> amplitude/intensity (gain = loss),{" "}
              <Tex>{String.raw`\mathrm{Re}(\mathscr{P})\to`}</Tex> frequency (pulling toward line center). This split
              recurs throughout laser theory.
            </li>
            <li>
              <strong>A method worth keeping:</strong> a three-term (tridiagonal) linear recursion is solved exactly by
              reducing it to a first-order nonlinear difference equation for the ratios, whose solution is a continued
              fraction &mdash; evaluated numerically bottom-up. This reappears in multimode and ring-laser strong-signal
              problems.
            </li>
          </ul>
        </Callout>
        <Callout kind="history" title="Provenance">
          This appendix is adapted from Stenholm &amp; Lamb, <em>Phys. Rev.</em> <strong>181</strong>, 618, and points
          back to Chapter&nbsp;X for the gas-laser context.
        </Callout>
      </Section>
    </Lesson>
  );
}
