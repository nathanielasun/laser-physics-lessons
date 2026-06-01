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
import AppASim from "@/components/sims/appA";

export default function Page() {
  return (
    <Lesson slug="appA">
      <Lede>
        Why does light slow down inside glass, and why does a polarized medium re-radiate a wave that is shifted by{" "}
        <strong>90°</strong> relative to the field driving it? One clean calculation answers both. Take an infinite,
        flat sheet of identical dipoles, all oscillating in phase, and ask what field they make on the axis. You might
        fear a divergent mess of overlapping spherical waves — instead the integral collapses, through a Fresnel-zone /
        integration-by-parts argument, into a single plane wave carrying a factor of <Tex>{String.raw`i`}</Tex>. That{" "}
        <Tex>{String.raw`i`}</Tex> is the microscopic engine behind the refractive index and behind laser gain.
      </Lede>

      <Section title="Setup: a sheet of in-phase dipoles and the single-dipole field">
        <Intuition>
          Picture an infinite flat sheet in the <Tex>{String.raw`x`}</Tex>–<Tex>{String.raw`y`}</Tex> plane, tiled with
          identical electric dipoles. Every dipole points along <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex> and oscillates{" "}
          <em>in phase</em> at one frequency — and that &ldquo;in-phase&rdquo; coherence is exactly what a uniformly
          driven polarized medium looks like. We want the field at a point on the <Tex>{String.raw`z`}</Tex> axis. Each
          dipole is many wavelengths away from the observation point compared to its own size, so we treat each as an
          ideal point dipole and use its <em>exact</em> radiated field — the same expression Jackson derives, carrying a
          near-field <Tex>{String.raw`1/R^3`}</Tex> part, an induction <Tex>{String.raw`1/R^2`}</Tex> part, and a
          radiation <Tex>{String.raw`1/R`}</Tex> part. We work in complex notation; the physical field is the real
          part, so phases bookkeep cleanly.
        </Intuition>
        <p>
          Write the dipole moment of each element as a complex phasor — all elements share the same axis{" "}
          <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex> and the same phase:
        </p>
        <KeyResult
          number="1"
          eq={String.raw`\mathbf{p} = \hat{\mathbf{x}}\, p_0 \exp(-i\delta t)`}
          label="Dipole moment of each sheet element"
          note={
            <>
              All dipoles point along <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex> and oscillate in phase at frequency{" "}
              <Tex>{String.raw`\delta`}</Tex>. The physical moment is the real part.
            </>
          }
        />
        <p>
          The field of one such oscillating point dipole, at vector distance <Tex>{String.raw`\mathbf{R}`}</Tex>, is the
          full Jackson form <Tex>{String.raw`[\,3\hat{\mathbf{s}}(\hat{\mathbf{s}}\cdot\mathbf{p})-\mathbf{p}\,]`}</Tex>{" "}
          with the line-of-sight unit vector <Tex>{String.raw`\hat{\mathbf{s}}`}</Tex> and dipole axis{" "}
          <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex>:
        </p>
        <KeyResult
          number="2"
          eq={String.raw`\mathbf{E}_{\mathrm{dip}}(\mathbf{R},t) = \frac{p_0 \exp[-i(\delta t - KR)]}{4\pi\varepsilon_0 R}\left\{ \frac{1-iKR}{R^2}\big[-\hat{\mathbf{x}} + 3(\hat{\mathbf{s}}\cdot\hat{\mathbf{x}})\hat{\mathbf{s}}\big] + K^2(\hat{\mathbf{s}}\times\hat{\mathbf{x}})\times\hat{\mathbf{s}} \right\}`}
          label="Exact single-dipole field (Jackson)"
          note={
            <>
              The <Tex>{String.raw`(1-iKR)/R^2`}</Tex> bracket collects the near-field and induction contributions; the{" "}
              <Tex>{String.raw`K^2`}</Tex> term is the pure radiation field. <Tex>{String.raw`K`}</Tex> is the
              wavenumber and <Tex>{String.raw`\hat{\mathbf{s}}`}</Tex> points from the dipole to the observer.
            </>
          }
        />
        <p>
          Fix the geometry. Put the observer at <Tex>{String.raw`(0,0,z)`}</Tex> and a generic dipole at{" "}
          <Tex>{String.raw`(x,y,0)`}</Tex>. Then:
        </p>
        <EqBlock label="3">{String.raw`R^2 = x^2 + y^2 + z^2,`}</EqBlock>
        <EqBlock label="4">{String.raw`\hat{\mathbf{s}} = \frac{-x\hat{\mathbf{x}} - y\hat{\mathbf{y}} + z\hat{\mathbf{z}}}{R}.`}</EqBlock>
        <Figure
          caption={
            <>
              The geometry. The observer sits on the axis at height <Tex>{String.raw`z`}</Tex>; a dipole at{" "}
              <Tex>{String.raw`(x,y,0)`}</Tex> contributes a spherical wave along{" "}
              <Tex>{String.raw`\hat{\mathbf{s}}`}</Tex>, a distance <Tex>{String.raw`R`}</Tex> away.
            </>
          }
        >
          <svg viewBox="0 0 460 240" width="100%" style={{ maxWidth: 460 }}>
            {/* sheet edge-on */}
            <line x1="60" y1="40" x2="60" y2="200" stroke="#334155" strokeWidth="3" />
            <text x="44" y="32" fontSize="12" fill="#475569" textAnchor="middle">
              sheet
            </text>
            {/* foot point */}
            <circle cx="60" cy="120" r="3" fill="#334155" />
            {/* axis */}
            <line x1="60" y1="120" x2="380" y2="120" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 4" />
            {/* a dipole off-axis */}
            <circle cx="60" cy="70" r="4" fill="#4f46e5" />
            <text x="34" y="68" fontSize="12" fill="#4f46e5">
              (x,y,0)
            </text>
            {/* dipole axis arrow */}
            <line x1="60" y1="70" x2="92" y2="70" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#ar)" />
            {/* s-hat ray to observer */}
            <line x1="60" y1="70" x2="378" y2="120" stroke="#e11d48" strokeWidth="1.8" markerEnd="url(#ar2)" />
            <text x="210" y="86" fontSize="12" fill="#e11d48">
              R, ŝ
            </text>
            {/* observer */}
            <circle cx="380" cy="120" r="5" fill="#e11d48" />
            <text x="330" y="142" fontSize="12" fill="#1f2733">
              observer (0,0,z)
            </text>
            <text x="210" y="138" fontSize="12" fill="#64748b">
              z
            </text>
            <defs>
              <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#4f46e5" />
              </marker>
              <marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#e11d48" />
              </marker>
            </defs>
          </svg>
        </Figure>
      </Section>

      <Section title="Projecting the field: cross products and symmetry">
        <Intuition>
          Now evaluate the vector structure on the <Tex>{String.raw`z`}</Tex> axis. The radiation term is a double
          cross product that strips off the line-of-sight component and keeps only the transverse part. The key insight:
          when we eventually integrate over the <em>whole</em> sheet, every term that is <strong>odd</strong> in{" "}
          <Tex>{String.raw`x`}</Tex> or <Tex>{String.raw`y`}</Tex> cancels — for every dipole at{" "}
          <Tex>{String.raw`+x`}</Tex> there is one at <Tex>{String.raw`-x`}</Tex> with the opposite contribution. Only
          the <strong>even</strong> terms survive, which is what guarantees the net field points purely along{" "}
          <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex> (transverse, as a propagating wave must be) and is what makes the
          messy vector field collapse.
        </Intuition>
        <p>
          Expanding the radiation double cross product with <Tex>{String.raw`\hat{\mathbf{s}}`}</Tex> from Eq.&nbsp;(4):
        </p>
        <EqBlock label="5">{String.raw`(\hat{\mathbf{s}}\times\hat{\mathbf{x}})\times\hat{\mathbf{s}} = (y\hat{\mathbf{z}} + z\hat{\mathbf{y}})\times\frac{\hat{\mathbf{s}}}{R} = \big[\,x(z\hat{\mathbf{z}} - y\hat{\mathbf{y}}) + (y^2+z^2)\hat{\mathbf{x}}\,\big]\frac{1}{R^2}.`}</EqBlock>
        <p>
          The <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex> coefficient is <Tex>{String.raw`(y^2+z^2)/R^2`}</Tex> — even in{" "}
          <Tex>{String.raw`x`}</Tex>; the rest carry odd factors of <Tex>{String.raw`x`}</Tex> and vanish on
          integration. On axis (<Tex>{String.raw`x=y=0`}</Tex>) this reduces to <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex>
          , confirming the transverse character. For the near-field bracket we need the projection
        </p>
        <EqBlock>{String.raw`\hat{\mathbf{s}}\cdot\hat{\mathbf{x}} = -\,x/R,`}</EqBlock>
        <p>
          which is odd in <Tex>{String.raw`x`}</Tex>, so the term{" "}
          <Tex>{String.raw`3(\hat{\mathbf{s}}\cdot\hat{\mathbf{x}})\hat{\mathbf{s}}`}</Tex> contributes an even piece{" "}
          <Tex>{String.raw`3x^2/R^2`}</Tex> to the <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex> component. Collecting the{" "}
          surviving even part of the single-dipole field:
        </p>
        <KeyResult
          number="6"
          eq={String.raw`\mathbf{E}_{\mathrm{dip}} = \hat{\mathbf{x}}\,\frac{p_0\exp[-i(\delta t - KR)]}{4\pi\varepsilon_0 R}\left\{ (1-iKR)\Big(-1 + \frac{3x^2}{R^2}\Big)\frac{1}{R^2} + K^2\big(y^2 + z^2\big)\frac{1}{R^2} \right\} + (\text{terms odd in } x).`}
          label="x̂ component of the single-dipole field"
          note={
            <>
              Both surviving coefficients are even in <Tex>{String.raw`x`}</Tex>; the odd terms are set aside because
              they integrate to zero over the symmetric sheet. This is the integrand we sum.
            </>
          }
        />
        <Derivation title="Project the single-dipole field onto x̂" defaultOpen={false}>
          <Step title="Expand the radiation double cross product">
            Using <Tex>{String.raw`\hat{\mathbf{s}}`}</Tex> from Eq.&nbsp;(4) and the dipole axis{" "}
            <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex>, apply the BAC–CAB identity to{" "}
            <Tex>{String.raw`(\hat{\mathbf{s}}\times\hat{\mathbf{x}})\times\hat{\mathbf{s}}`}</Tex>. The result
            (Eq.&nbsp;5) splits into an <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex> piece with coefficient{" "}
            <Tex>{String.raw`(y^2+z^2)/R^2`}</Tex> and cross pieces proportional to <Tex>{String.raw`x`}</Tex>. Check the
            on-axis limit (<Tex>{String.raw`x=y=0`}</Tex>): it gives <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex>, a purely
            transverse radiation field, as required.
          </Step>
          <Step title="Evaluate the near-field bracket">
            From Eq.&nbsp;(4), <Tex>{String.raw`\hat{\mathbf{s}}\cdot\hat{\mathbf{x}}=-x/R`}</Tex>. The bracket{" "}
            <Tex>{String.raw`[-\hat{\mathbf{x}} + 3(\hat{\mathbf{s}}\cdot\hat{\mathbf{x}})\hat{\mathbf{s}}]`}</Tex> has{" "}
            <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex> component{" "}
            <Tex>{String.raw`-1 + 3x^2/R^2`}</Tex> (the <Tex>{String.raw`+1`}</Tex> from{" "}
            <Tex>{String.raw`-\hat{\mathbf{x}}`}</Tex>; the <Tex>{String.raw`3x^2/R^2`}</Tex> from{" "}
            <Tex>{String.raw`3(-x/R)(-x/R)`}</Tex>). It is even in <Tex>{String.raw`x`}</Tex>.
          </Step>
          <Step title="Collect and discard odd terms">
            Combine the near-field and radiation <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex> coefficients into
            Eq.&nbsp;(6). By the <Tex>{String.raw`\pm x,\,\pm y`}</Tex> symmetry of the infinite sheet, every term with
            an odd power of <Tex>{String.raw`x`}</Tex> or <Tex>{String.raw`y`}</Tex> integrates to zero. Keep the even
            part.
          </Step>
        </Derivation>
        <Callout kind="note" title="Why x̂ for the axis and ŝ for the line of sight">
          The two unit vectors are easy to confuse. <Tex>{String.raw`\hat{\mathbf{s}}`}</Tex> is the per-dipole
          source-to-field direction (Eq.&nbsp;4) — it <em>varies</em> across the sheet, so it cannot be the common
          oscillation axis. The dipoles all point along <Tex>{String.raw`\hat{\mathbf{x}}`}</Tex>. If you swapped the
          convention, the surviving integrand would be <em>odd</em> in <Tex>{String.raw`x`}</Tex> and integrate to zero,
          making the whole appendix trivial — internal consistency forces{" "}
          <Tex>{String.raw`\hat{\mathbf{n}}=\hat{\mathbf{s}},\ \mathbf{p}\parallel\hat{\mathbf{x}}`}</Tex>.
        </Callout>
      </Section>

      <Section title="Summing over the sheet: from Cartesian to polar annuli">
        <Intuition>
          Now add up all the dipoles. The geometry is axially symmetric about the <Tex>{String.raw`z`}</Tex> axis, so
          switch from <Tex>{String.raw`(x,y)`}</Tex> to polar coordinates <Tex>{String.raw`(\rho,\phi)`}</Tex> on the
          sheet. Every dipole in a thin ring of radius <Tex>{String.raw`\rho`}</Tex> sits at the same distance{" "}
          <Tex>{String.raw`R`}</Tex> and contributes coherently — we are slicing the sheet into{" "}
          <strong>Fresnel-like rings</strong>. As <Tex>{String.raw`\rho`}</Tex> grows, <Tex>{String.raw`R`}</Tex> grows
          and the ring&rsquo;s phase <Tex>{String.raw`\exp(iKR)`}</Tex> winds steadily. The areal density{" "}
          <Tex>{String.raw`\eta`}</Tex> (dipoles per unit area) converts &ldquo;one dipole&rdquo; into &ldquo;dipoles
          per area times area element.&rdquo;
        </Intuition>
        <p>
          Replace <Tex>{String.raw`dx\,dy`}</Tex> by <Tex>{String.raw`\rho\,d\rho\,d\phi`}</Tex> with{" "}
          <Tex>{String.raw`x=\rho\cos\phi,\ y=\rho\sin\phi`}</Tex>, and insert <Tex>{String.raw`\eta`}</Tex>:
        </p>
        <EqBlock label="6 integrated">{String.raw`\mathbf{E}(z,t) = \hat{\mathbf{x}}\,\eta\,\frac{p_0\exp(-i\delta t)}{4\pi\varepsilon_0}\int_0^\infty \rho\, d\rho \int_0^{2\pi} d\phi\, \frac{\exp(iKR)}{R^3}\Big[(1-iKR)\Big(-1 + \tfrac{3\rho^2\cos^2\phi}{R^2}\Big) + K^2\Big(\rho^2\sin^2\phi + z^2\Big)\Big].`}</EqBlock>
        <p>
          The azimuthal integral uses{" "}
          <Tex>{String.raw`\langle\cos^2\phi\rangle = \langle\sin^2\phi\rangle = \tfrac12`}</Tex> and contributes a
          bare <Tex>{String.raw`2\pi`}</Tex>, collapsing the <Tex>{String.raw`x^2,\,y^2`}</Tex> dependence:
        </p>
        <EqBlock label="6′">{String.raw`\mathbf{E}(z,t) = \hat{\mathbf{x}}\,\eta\,\frac{p_0\exp(-i\delta t)}{4\pi\varepsilon_0}\int_0^\infty \rho\, d\rho\, \frac{2\pi\exp(iKR)}{R^3}\Big[(1-iKR)\Big(-1 + \tfrac{3}{2}\tfrac{\rho^2}{R^2}\Big) + K^2\big(R^2 - \tfrac{1}{2}\rho^2\big)\Big].`}</EqBlock>
        <p>
          A clean change of variable turns the radial integral over <Tex>{String.raw`\rho`}</Tex> into one over{" "}
          <Tex>{String.raw`R`}</Tex>. Differentiating <Tex>{String.raw`R^2=\rho^2+z^2`}</Tex> at fixed{" "}
          <Tex>{String.raw`z`}</Tex>:
        </p>
        <EqBlock label="7">{String.raw`R^2 = \rho^2 + z^2, \qquad 2\rho\, d\rho = 2R\, dR \;\Rightarrow\; \rho\, d\rho = R\, dR.`}</EqBlock>
        <p>
          The lower limit becomes <Tex>{String.raw`R=|z|`}</Tex> (where <Tex>{String.raw`\rho=0`}</Tex>) and{" "}
          <Tex>{String.raw`\rho^2 = R^2 - z^2`}</Tex>. Substituting gives a single integral over{" "}
          <Tex>{String.raw`R`}</Tex>:
        </p>
        <KeyResult
          number="8"
          eq={String.raw`\mathbf{E}(z,t) = \hat{\mathbf{x}}\,\eta\,\frac{p_0\exp(-i\delta t)}{4\varepsilon_0}\!\int_{|z|}^{\infty} dR\,\exp(iKR)\left\{\frac{1-iKR}{R^2}\Big[1 - 3\Big(\frac{z}{R}\Big)^2\Big] + K^2\Big(1 + \frac{z^2}{R^2}\Big)\right\}.`}
          label="The field as a single radial integral"
          note={
            <>
              A sum of powers of <Tex>{String.raw`(z/R)`}</Tex> weighted by <Tex>{String.raw`\exp(iKR)`}</Tex>. This is
              the form the integration-by-parts machinery attacks next.
            </>
          }
        />
        <Derivation title="Cartesian → polar → R" defaultOpen={false}>
          <Step title="Switch to polar coordinates">
            Replace <Tex>{String.raw`dx\,dy`}</Tex> by <Tex>{String.raw`\rho\,d\rho\,d\phi`}</Tex> with{" "}
            <Tex>{String.raw`x=\rho\cos\phi,\ y=\rho\sin\phi`}</Tex>, and weight with the areal density{" "}
            <Tex>{String.raw`\eta`}</Tex>. The integrand is the surviving even part of Eq.&nbsp;(6).
          </Step>
          <Step title="Do the azimuthal integral">
            Integrate over <Tex>{String.raw`\phi`}</Tex> from <Tex>{String.raw`0`}</Tex> to{" "}
            <Tex>{String.raw`2\pi`}</Tex>. The averages{" "}
            <Tex>{String.raw`\langle\cos^2\phi\rangle=\langle\sin^2\phi\rangle=\tfrac12`}</Tex> collapse the angular
            dependence and a bare <Tex>{String.raw`2\pi`}</Tex> survives, leaving a one-dimensional radial integral
            (Eq.&nbsp;6′).
          </Step>
          <Step title="Change variable ρ → R">
            Use <Tex>{String.raw`R^2=\rho^2+z^2`}</Tex> (Eq.&nbsp;7), so{" "}
            <Tex>{String.raw`\rho\,d\rho = R\,dR`}</Tex> and <Tex>{String.raw`\rho^2 = R^2-z^2`}</Tex>. The limits become{" "}
            <Tex>{String.raw`R=|z|\to\infty`}</Tex>. Substituting yields Eq.&nbsp;(8).
          </Step>
        </Derivation>
      </Section>

      <Section title="Evaluating the integral: integration by parts and the convergence trick">
        <Intuition>
          The radial integral is a sum of terms of the form{" "}
          <Tex>{String.raw`\int \exp(iKR)/R^n\,dR`}</Tex>. Two ideas crack it. First, define a family of these integrals{" "}
          <Tex>{String.raw`F_n`}</Tex> and relate them by integration by parts — each pass lowers the power and pulls
          out a boundary term at <Tex>{String.raw`R=z`}</Tex>. Second — the physically crucial point — the contribution
          from <Tex>{String.raw`R\to\infty`}</Tex> is killed by a convergence factor{" "}
          <Tex>{String.raw`\exp(-R/\lambda)`}</Tex> (<Tex>{String.raw`\lambda\to\infty`}</Tex> at the end). Physically,
          the distant rings oscillate so fast in phase that they cancel among themselves (Fresnel cancellation), and{" "}
          only the nearest point of the sheet — directly below the observer, at <Tex>{String.raw`R=z`}</Tex> —
          contributes coherently.
        </Intuition>
        <p>Define the family of radial integrals:</p>
        <EqBlock label="9">{String.raw`F_n = \int dR\, \frac{\exp(iKR)}{R^n}, \qquad n = 0,1,2,3,4.`}</EqBlock>
        <p>
          The integrand of Eq.&nbsp;(8) is a fixed linear combination of these — call it{" "}
          <Tex>{String.raw`J`}</Tex>:
        </p>
        <EqBlock label="10">{String.raw`J = F_2 - iKF_1 - 3z^2 F_4 + 3iKz^2 F_3 + K^2 F_0 + K^2 z^2 F_2.`}</EqBlock>
        <p>
          The zeroth-order radiation piece cannot be neglected — it <em>is</em> the radiation field. Integrating once
          and dropping the <Tex>{String.raw`R\to\infty`}</Tex> boundary via the convergence factor leaves only the
          value at <Tex>{String.raw`R=z`}</Tex>:
        </p>
        <EqBlock label="11">{String.raw`\int K^2\exp(iKR)\,dR = -iK\exp(iKR)\Big|^{\;\to\;0\ (R\to\infty)} \;\longrightarrow\; iK\exp(iKz).`}</EqBlock>
        <p>The integration-by-parts recursion connecting neighbours, with the boundary term at the lower limit:</p>
        <KeyResult
          number="12"
          eq={String.raw`F_n = \frac{1}{iK}\frac{\exp(iKR)}{R^n}\Big|_{z}^{\infty} + \frac{n}{iK}\int dR\,\frac{\exp(iKR)}{R^{n+1}} = (iK)^{-1}\Big[\, n F_{n+1} - \frac{\exp(iKz)}{z^n}\,\Big].`}
          label="Integration-by-parts recursion"
          note={
            <>
              The upper limit at <Tex>{String.raw`\infty`}</Tex> is dropped by the convergence factor; iterating peels
              off only boundary terms at <Tex>{String.raw`R=z`}</Tex>.
            </>
          }
        />
        <p>
          Substituting the recursion into <Tex>{String.raw`J`}</Tex>, the near-field and induction contributions (the{" "}
          <Tex>{String.raw`1/R^2,\,1/R^3,\,1/R^4`}</Tex> powers) cancel in pairs, and the residue is pure radiation:
        </p>
        <KeyResult
          eq={String.raw`J = \int dR\,\exp(iKR)\,[\,\ldots\,] = 2iK\exp(iKz).`}
          label="Collapse of the sheet integral"
          note={
            <>
              The messy spherical-wave sum reduces to a single coherent plane-wave amplitude. The factor{" "}
              <Tex>{String.raw`2iK`}</Tex> carries both the <Tex>{String.raw`i`}</Tex> (the 90° phase) and the
              propagating <Tex>{String.raw`\exp(iKz)`}</Tex>.
            </>
          }
        />
        <Derivation title="Watch the cancellation, collect the residue" defaultOpen={false}>
          <Step title="Express the field integral through the Fₙ">
            Rewrite the polynomial-in-<Tex>{String.raw`(z/R)`}</Tex> integrand of Eq.&nbsp;(8) as the linear
            combination <Tex>{String.raw`J`}</Tex> of the integrals <Tex>{String.raw`F_n`}</Tex> (Eqs.&nbsp;9–10).
            Identify which <Tex>{String.raw`F_n`}</Tex> multiply the near-field, induction, and radiation pieces.
          </Step>
          <Step title="Set the R→∞ boundary to zero">
            Insert a convergence factor <Tex>{String.raw`\exp(-R/\lambda)`}</Tex> and take{" "}
            <Tex>{String.raw`\lambda\to\infty`}</Tex> at the end. This kills the{" "}
            <Tex>{String.raw`\exp(iK\infty)`}</Tex> boundary terms — the statement that distant Fresnel rings cancel by
            rapid phase oscillation. Only boundary terms at <Tex>{String.raw`R=z`}</Tex> survive.
          </Step>
          <Step title="Apply the recursion and collect">
            Use Eq.&nbsp;(12) repeatedly. The zeroth-order radiation integral (Eq.&nbsp;11) gives{" "}
            <Tex>{String.raw`iK\exp(iKz)`}</Tex>; the near-field and induction terms cancel pairwise. The residue is{" "}
            <Tex>{String.raw`J = 2iK\exp(iKz)`}</Tex>.
          </Step>
        </Derivation>
        <Callout kind="math" title="What is authoritative here">
          The intermediate <Tex>{String.raw`F_n`}</Tex> bookkeeping in Eqs.&nbsp;(10) and (12) is{" "}
          <em>illustrative of the cancellation mechanism</em> — the exact coefficient pattern is partly reconstructed
          from the recursion and the stated residue. The result{" "}
          <Tex>{String.raw`J = 2iK\exp(iKz)`}</Tex>, and the final field below, are the authoritative content. The same
          collapse appears in a Fresnel-zone construction, where only the central zone (plus a half-zone correction)
          survives.
        </Callout>
      </Section>

      <Section title="The result: a 90°-shifted plane wave and the refractive index">
        <Intuition>
          Put <Tex>{String.raw`J=2iK\exp(iKz)`}</Tex> back in. An infinite sheet of in-phase dipoles radiates, on each
          side, a <strong>plane wave</strong> traveling away from the sheet — and that wave carries a factor of{" "}
          <Tex>{String.raw`i`}</Tex>, i.e. it is shifted 90° from the dipoles&rsquo; oscillation. Add this re-radiated
          wave to the wave that drove the dipoles: a small 90° component does not change the amplitude to first order — it
          shifts the <strong>phase</strong>, advancing or retarding the wavefront. That phase shift per unit length is{" "}
          exactly the <strong>refractive index</strong>. If instead the dipoles oscillate 90° out of phase (in
          quadrature) with the driving field — which is what happens on resonance — then the re-radiated wave, after
          picking up its factor <Tex>{String.raw`i`}</Tex>, lands <em>in phase</em> with the driving wave and changes its
          amplitude: that is <strong>absorption</strong>, or with population inversion, <strong>gain</strong>.
        </Intuition>
        <p>
          Assembling the prefactor — the angular average of{" "}
          <Tex>{String.raw`\cos^2\phi/\sin^2\phi`}</Tex> leaves a factor <Tex>{String.raw`\pi`}</Tex> out front;{" "}
          <Tex>{String.raw`\pi`}</Tex> times <Tex>{String.raw`1/(4\pi\varepsilon_0)`}</Tex> gives{" "}
          <Tex>{String.raw`1/(4\varepsilon_0)`}</Tex>, combining with the residue and folding{" "}
          <Tex>{String.raw`\exp(iKz)`}</Tex> into the plane-wave phase:
        </p>
        <KeyResult
          number="13"
          eq={String.raw`\mathbf{E}(z,t) = \hat{\mathbf{x}}\,\frac{i\,\eta\,K\,p_0}{2\varepsilon_0}\,\exp[-i(\delta t - Kz)].`}
          label="Field from a dipole sheet"
          note={
            <>
              A transverse (<Tex>{String.raw`\hat{\mathbf{x}}`}</Tex>) plane wave propagating in{" "}
              <Tex>{String.raw`+z`}</Tex>, with density <Tex>{String.raw`\eta`}</Tex> and amplitude{" "}
              <Tex>{String.raw`i\eta K p_0/2\varepsilon_0`}</Tex>. The factor <Tex>{String.raw`i`}</Tex> is the 90° phase
              shift relative to the driving dipoles <Tex>{String.raw`\mathbf{p}=\hat{\mathbf{x}}\,p_0\exp(-i\delta t)`}</Tex>{" "}
              — the microscopic origin of the refractive index.
            </>
          }
        />
        <Callout kind="insight" title="Refraction and gain from one factor of i">
          The <strong>in-quadrature</strong> (factor <Tex>{String.raw`i`}</Tex>) re-radiation changes the wave&rsquo;s
          phase velocity without changing its amplitude → the <strong>refractive index</strong>. The{" "}
          <strong>in-phase</strong> component (appearing on resonance) changes the amplitude instead →{" "}
          <strong>absorption</strong>, or with inversion, <strong>gain</strong>. So this single appendix contains the
          seed of both refraction and laser amplification. Feynman makes the same picture in{" "}
          <em>Lectures</em> Vol.&nbsp;I, Ch.&nbsp;30–31.
        </Callout>

        <SimFrame
          title="The Fresnel-zone phasor spiral"
          caption={
            <>
              As you include more and more rings of the sheet (raise <Tex>{String.raw`R_{\max}`}</Tex>), the running
              complex sum <Tex>{String.raw`S(R)`}</Tex> spirals inward and lands on a resultant pointing along the{" "}
              <em>imaginary</em> axis — exactly 90° (a factor <Tex>{String.raw`i`}</Tex>) from the dipole phasor on the
              real axis. The far rings spiral to nothing; only the radiation residue survives.
            </>
          }
          tryThis={
            <>
              Watch <Tex>{String.raw`\arg E`}</Tex> lock onto <Tex>{String.raw`90^\circ`}</Tex> as you grow{" "}
              <Tex>{String.raw`R_{\max}`}</Tex>, and the convergence error shrink. Increase{" "}
              <Tex>{String.raw`K`}</Tex>: the rings wind phase faster and the spiral tightens. Compare{" "}
              <Tex>{String.raw`|E|`}</Tex> against the analytic Eq.&nbsp;(13) value{" "}
              <Tex>{String.raw`\eta K p_0/2\varepsilon_0`}</Tex>. The bottom strip shows the radiated wave lagging the
              driving dipole by a quarter cycle.
            </>
          }
        >
          <AppASim />
        </SimFrame>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="The ideas you keep">
          <ul>
            <li>
              An infinite sheet of in-phase dipoles radiates a <strong>plane wave</strong> on each side, shifted 90°
              (factor <Tex>{String.raw`i`}</Tex>) from the dipole oscillation — the single most important takeaway.
            </li>
            <li>
              That 90° (in-quadrature) re-radiation is the microscopic origin of the <strong>refractive index</strong>:
              it shifts the wave&rsquo;s phase without (to first order) changing amplitude — it changes the phase
              velocity.
            </li>
            <li>
              The <strong>in-phase</strong> component (on resonance) changes amplitude instead:{" "}
              <strong>absorption</strong>, or with inversion, <strong>gain</strong> — the basis of laser amplification.
            </li>
            <li>
              The macroscopic <strong>polarization</strong> of a gain medium acts like this sheet; its re-radiated,
              phase-shifted field is precisely the source term <Tex>{String.raw`P`}</Tex> that drives the
              self-consistent cavity-field equations of later chapters.
            </li>
            <li>
              <strong>Technique:</strong> a surface integral of spherical waves collapses by Fresnel-zone cancellation
              (distant rings cancel by phase winding) so only the nearest point contributes — and integration by parts
              makes the near-field/induction terms cancel, leaving pure radiation.
            </li>
            <li>
              The exact single-dipole field (Eq.&nbsp;2) has three regimes —{" "}
              <Tex>{String.raw`1/R^3`}</Tex> near-field, <Tex>{String.raw`1/R^2`}</Tex> induction,{" "}
              <Tex>{String.raw`1/R`}</Tex> radiation — but only radiation survives the sheet integral; keep the habit of
              separating them.
            </li>
          </ul>
          See Jackson (1962) §9.2 for Eq.&nbsp;(2), and Feynman <em>Lectures</em> Vol.&nbsp;I, Ch.&nbsp;30–31 for the
          refractive-index-from-re-radiation picture.
        </Callout>
      </Section>
    </Lesson>
  );
}
