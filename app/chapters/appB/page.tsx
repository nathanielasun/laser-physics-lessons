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
import AppBSim from "@/components/sims/appB";

export default function Page() {
  return (
    <Lesson slug="appB">
      <Lede>
        A laser cavity is just two mirrors facing each other. Ask the deep question: after the light has bounced back and
        forth thousands of times, what does it <em>settle into</em>? The naive answer — a uniform plane wave, resonant
        whenever the round-trip phase is a multiple of <Tex>{String.raw`2\pi`}</Tex> — is wrong, and the reason is{" "}
        <strong>diffraction</strong>. Every reflection off a finite mirror diffracts the beam; its edges spill over the
        far mirror and are lost. Pass after pass the field reorganizes into a special self-reproducing shape that, after
        one round trip, returns looking exactly like itself — merely scaled and phase-shifted by a complex number{" "}
        <Tex>{String.raw`\sigma`}</Tex>. That self-reproducing distribution <em>is</em> a passive-cavity mode.
      </Lede>

      <Section title="Quasimodes: a cavity mode is not a true normal mode">
        <Intuition>
          Picture a plane wave striking a finite mirror. It diffracts, and on the return trip the diffracted wave{" "}
          <em>overfills</em> the first mirror — the overhang misses entirely and is lost. Iterate this thousands of
          times and the surviving field is no longer the uniform plane wave you started with: it has self-organized
          into a smooth diffraction-shaped profile that minimizes this edge spill-over. Because energy{" "}
          <em>always</em> leaks out the rim, these distributions are <strong>not lossless normal modes</strong>. Sargent,
          Scully &amp; Lamb call them <strong>quasimodes</strong>. For ordinary thermal light the loss-broadened
          linewidth is too wide to resolve them; it took a laser&rsquo;s narrow gain line to make them observable.
        </Intuition>
        <p>
          The one piece of the naive plane-wave picture that <em>does</em> survive is the round-trip phase bookkeeping.
          Require the one-way optical phase <Tex>{String.raw`\Phi_n=\Omega_n L/c`}</Tex> accumulated over the mirror
          separation <Tex>{String.raw`L`}</Tex> to be an integer multiple of <Tex>{String.raw`\pi`}</Tex>:
        </p>
        <KeyResult
          number="1"
          eq={String.raw`\Phi_n=\frac{\Omega_n L}{c}=n\pi,`}
          label="Resonance condition (one-way phase)"
          note={
            <>
              So the round-trip phase is <Tex>{String.raw`2n\pi`}</Tex>. Here <Tex>{String.raw`\Omega_n`}</Tex> is the
              resonant angular frequency for integer <Tex>{String.raw`n`}</Tex>. Everything else in the naive picture is
              replaced by the diffraction analysis that follows.
            </>
          }
        />
        <Derivation title="From round-trip phase to a frequency comb">
          <Step title="Solve for the resonant frequencies">
            Setting <Tex>{String.raw`\Omega L/c=n\pi`}</Tex> gives a comb of equally spaced longitudinal resonances:
            <EqBlock>{String.raw`\Omega_n=\frac{n\pi c}{L},\qquad \Delta\Omega=\frac{\pi c}{L}\ \ \Bigl(\text{free spectral range } \tfrac{c}{2L}\Bigr).`}</EqBlock>
            Keep this as the zeroth-order frequency picture; Section&nbsp;6 (Eq.&nbsp;17) corrects it with transverse-mode
            and Gouy-phase terms.
          </Step>
        </Derivation>
        <Callout kind="note" title="Quasimode vs. normal mode">
          A true normal mode is lossless with a real eigenfrequency. A cavity quasimode leaks power every pass, so its
          eigenvalue <Tex>{String.raw`\sigma`}</Tex> has <Tex>{String.raw`|\sigma|<1`}</Tex> and the mode has a finite
          lifetime and linewidth. Do not expect orthonormal lossless modes here.
        </Callout>
      </Section>

      <Section title="The Kirchhoff–Huygens integral and the eigenvalue equation u′ = σu">
        <Intuition>
          Treat one mirror as an aperture radiating Huygens wavelets toward the other. The field arriving at the second
          mirror is the coherent sum — an integral — of spherical wavelets <Tex>{String.raw`e^{-iKr}/r`}</Tex> emitted
          from every point of the first, each weighted by an obliquity factor{" "}
          <Tex>{String.raw`(1+\cos\theta)`}</Tex>. A self-consistent cavity mode is a distribution that, after this
          propagation, <em>reproduces itself</em> up to a single complex constant <Tex>{String.raw`\sigma`}</Tex>. That
          constant carries both the per-pass amplitude loss (<Tex>{String.raw`|\sigma|<1`}</Tex>) and the per-pass phase
          shift (<Tex>{String.raw`\arg\sigma`}</Tex>). &ldquo;Find the mode&rdquo; becomes an eigenvalue problem.
        </Intuition>

        <Figure
          caption={
            <>
              <strong>Fig. B-1.</strong> Huygens construction. Each surface element of the source mirror{" "}
              <Tex>{String.raw`S`}</Tex> radiates a spherical wavelet <Tex>{String.raw`e^{-iKr}/r`}</Tex> toward the
              observation point <Tex>{String.raw`P`}</Tex>, weighted by the obliquity{" "}
              <Tex>{String.raw`(1+\cos\theta)`}</Tex>; <Tex>{String.raw`\theta`}</Tex> is the angle between the outward
              normal <Tex>{String.raw`\hat n`}</Tex> and the line to <Tex>{String.raw`P`}</Tex>.
            </>
          }
        >
          <svg viewBox="0 0 520 230" style={{ width: "100%", maxWidth: 520 }}>
            <defs>
              <marker id="arrowB1" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto">
                <path d="M0,0 L7,3 L0,6 Z" fill="#334155" />
              </marker>
            </defs>
            {/* source mirror S (left) */}
            <line x1="90" y1="30" x2="90" y2="200" stroke="#334155" strokeWidth="3" />
            <text x="64" y="120" fontSize="15" fill="#1f2733" fontStyle="italic">
              S
            </text>
            {/* observation mirror (right) */}
            <line x1="430" y1="30" x2="430" y2="200" stroke="#94a3b8" strokeWidth="2.5" />
            {/* sample source elements with wavelets */}
            {[70, 115, 160].map((y, i) => (
              <g key={i}>
                <circle cx="90" cy={y} r="3" fill="#4f46e5" />
                <path
                  d={`M90 ${y} L430 130`}
                  stroke="#c7cdf5"
                  strokeWidth="1.2"
                  fill="none"
                  strokeDasharray="3 3"
                />
              </g>
            ))}
            {/* normal at the central element */}
            <line x1="90" y1="115" x2="150" y2="115" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowB1)" />
            <text x="120" y="106" fontSize="12" fill="#334155">
              n̂
            </text>
            {/* the r line and theta */}
            <line x1="90" y1="115" x2="430" y2="130" stroke="#e11d48" strokeWidth="1.8" />
            <text x="250" y="116" fontSize="13" fill="#e11d48" fontStyle="italic">
              r
            </text>
            <path d="M150 115 A 60 60 0 0 0 146 119" fill="none" stroke="#64748b" strokeWidth="1.2" />
            <text x="158" y="128" fontSize="12" fill="#64748b">
              θ
            </text>
            {/* P */}
            <circle cx="430" cy="130" r="3.5" fill="#0891b2" />
            <text x="438" y="128" fontSize="14" fill="#0891b2" fontStyle="italic">
              P
            </text>
            <text x="350" y="215" fontSize="12" fill="#5b6473">
              separation L
            </text>
          </svg>
        </Figure>

        <p>
          The Kirchhoff–Huygens superposition gives the field <Tex>{String.raw`u_P`}</Tex> at an observation point as a
          surface integral over the source mirror:
        </p>
        <EqBlock label="2">
          {String.raw`u_P = C \int_S dS\; u_S\,(1+\cos\theta)\,\frac{\exp(-iKr)}{r}.`}
        </EqBlock>
        <p>
          Here <Tex>{String.raw`r`}</Tex> is the source-to-<Tex>{String.raw`P`}</Tex> distance,{" "}
          <Tex>{String.raw`K=2\pi/\lambda`}</Tex> is the radiation wavenumber (SSL write capital{" "}
          <Tex>{String.raw`K`}</Tex>), and <Tex>{String.raw`C`}</Tex> is the prefactor fixed by Silver (1949):
        </p>
        <KeyResult
          number="—"
          eq={String.raw`C=\frac{iK}{4\pi}.`}
          label="Silver's (1949) prefactor"
          note={
            <>
              The factor <Tex>{String.raw`i=e^{i\pi/2}`}</Tex> encodes the 90° phase advance, and the{" "}
              <Tex>{String.raw`K\propto 1/\lambda`}</Tex> scaling is the hallmark of Huygens–Fresnel diffraction: each
              element radiates with strength <Tex>{String.raw`\propto iK\,u_S`}</Tex> times the directionality.
            </>
          }
        />
        <p>
          Demanding self-consistency — the field on reflector&nbsp;2 equals the field on reflector&nbsp;1 up to one
          complex constant <Tex>{String.raw`\sigma`}</Tex> — turns Eq.&nbsp;(2) into the central eigenvalue equation:
        </p>
        <KeyResult
          number="3"
          eq={String.raw`u_S' = \sigma\,u_S = \frac{iK}{4\pi}\int_S dS\; u_S\,(1+\cos\theta)\,\frac{\exp(-iKr)}{r}.`}
          label="Cavity eigenvalue equation"
          note={
            <>
              <Tex>{String.raw`u_S`}</Tex> and <Tex>{String.raw`u_S'`}</Tex> are the distributions on the two
              reflectors. Solutions <Tex>{String.raw`(\sigma,u_S)`}</Tex> are the cavity modes and their per-pass
              complex loss/phase factors. This is an inhomogeneous Fredholm eigenvalue equation.
            </>
          }
        />
        <p>
          Read iteratively — apply the operator pass after pass — Eq.&nbsp;(3) is the equation a numerical integrator
          literally loops:
        </p>
        <EqBlock label="4">{String.raw`u_{q+1}=\sigma\,u_q.`}</EqBlock>

        <Derivation title="Huygens superposition → eigenvalue problem">
          <Step title="One element radiates a wavelet">
            Each source element radiates a spherical wave <Tex>{String.raw`e^{-iKr}/r`}</Tex>, weighted by the local
            distribution <Tex>{String.raw`C\,u_S`}</Tex> and the obliquity factor{" "}
            <Tex>{String.raw`(1+\cos\theta)`}</Tex> (which suppresses backward radiation: <Tex>{String.raw`\approx 2`}</Tex>{" "}
            forward, <Tex>{String.raw`\to 0`}</Tex> backward). Summing over the surface gives Eq.&nbsp;(2) — a linear
            integral operator mapping the field on one mirror to the other.
          </Step>
          <Step title="Self-consistency closes the loop">
            Demand <Tex>{String.raw`u_S'=\sigma u_S`}</Tex> (the mode condition). Substitute{" "}
            <Tex>{String.raw`C=iK/4\pi`}</Tex> into Eq.&nbsp;(2) to obtain Eq.&nbsp;(3): the eigenvalues{" "}
            <Tex>{String.raw`\sigma`}</Tex> rank the modes by loss; the eigenfunctions are the transverse mode profiles.
          </Step>
          <Step title="Two solution strategies">
            (a) <strong>Numerical iteration</strong> (Fox &amp; Li 1961): start with any trial field{" "}
            <Tex>{String.raw`u_0`}</Tex>, apply the operator repeatedly (Eq.&nbsp;4); the highest-
            <Tex>{String.raw`|\sigma|`}</Tex> eigenfunction dominates and the iterate converges to the lowest-loss mode.
            (b) <strong>Analytic reduction</strong> (Boyd &amp; Gordon 1961): for special geometries the kernel becomes a
            finite Fourier transform with closed-form eigenfunctions (Section&nbsp;4).
          </Step>
        </Derivation>

        <Callout kind="insight" title="σ packs loss AND phase">
          Write <Tex>{String.raw`\sigma=|\sigma|\,e^{i\psi}`}</Tex>. Then <Tex>{String.raw`|\sigma|^2`}</Tex> is the
          fraction of power surviving one pass, so the fractional power loss per pass is{" "}
          <Tex>{String.raw`a_l=1-|\sigma|^2`}</Tex> (Eq.&nbsp;18). The phase <Tex>{String.raw`\psi`}</Tex> is the extra
          diffractive/Gouy phase the mode picks up beyond the geometric <Tex>{String.raw`KL`}</Tex>; it shifts the
          resonance frequencies (Eq.&nbsp;17).
        </Callout>
      </Section>

      <Section title="Plane-parallel resonators: Fox & Li's iteration and the TEMₘₙ patterns">
        <Intuition>
          For two flat parallel mirrors, Eq.&nbsp;(3) has no closed form, so Fox &amp; Li (1961) did the honest thing:
          they put a uniform field on one mirror and iterated the diffraction integral on an IBM&nbsp;704 for hundreds of
          round trips. After a transient the field <em>stops changing shape</em> — a self-reproducing mode appears — and
          merely loses a fixed fraction of amplitude each pass. The lowest-loss mode is the smoothest one (the would-be
          Gaussian); odd-symmetric initial conditions converge to odd modes, because the diffraction operator is
          symmetric.
        </Intuition>
        <p>
          The single dimensionless control knob is the <strong>Fresnel number</strong> — the number of Fresnel zones the
          aperture subtends across the mirror gap:
        </p>
        <KeyResult
          number="—"
          eq={String.raw`N_F=\frac{a^2}{L\lambda}`}
          label="Fresnel number"
          note={
            <>
              For SSL&rsquo;s example <Tex>{String.raw`a=25\lambda,\ L=100\lambda`}</Tex> this is{" "}
              <Tex>{String.raw`a^2/L\lambda=6.25`}</Tex>. Large <Tex>{String.raw`N_F`}</Tex> means weak edge diffraction
              (low loss); small <Tex>{String.raw`N_F`}</Tex> means strong spill-over (high loss). It is the one knob
              Fig.&nbsp;B-2 varies — and the natural control for the simulation below.
            </>
          }
        />
        <Derivation title="Why iteration converges to the dominant mode">
          <Step title="Decompose in the (unknown) eigenmodes">
            Write the trial field <Tex>{String.raw`u_0=\sum_m c_m\,\phi_m`}</Tex> in the cavity eigenmodes. Each
            iteration multiplies the <Tex>{String.raw`m`}</Tex>-th component by its eigenvalue{" "}
            <Tex>{String.raw`\sigma_m`}</Tex>:
            <EqBlock>{String.raw`u_q=\sum_m c_m\,\sigma_m^{\,q}\,\phi_m.`}</EqBlock>
          </Step>
          <Step title="The lowest-loss mode wins">
            Since the lowest-order mode has the largest <Tex>{String.raw`|\sigma|`}</Tex>, after many passes it
            dominates: <Tex>{String.raw`u_q\to (\sigma_0)^q\,\phi_0`}</Tex>. In Fig.&nbsp;B-2 the profile after 300
            transits is far smoother than after 1 transit, and the loss settles to a constant per pass for that
            geometry.
          </Step>
          <Step title="Symmetry selects mode parity">
            The operator is symmetric, so a symmetric seed converges to the dominant even mode and an antisymmetric seed
            (180° out of phase across the centre) converges to the dominant odd mode. Odd modes generally have higher
            loss — their energy sits farther from the axis, so more spills over.
          </Step>
          <Step title="Mode labeling TEMₘₙ">
            Because the fields are nearly transverse electromagnetic, the surviving patterns are denoted{" "}
            <Tex>{String.raw`\mathrm{TEM}_{mn}`}</Tex>: for rectangular mirrors <Tex>{String.raw`m`}</Tex> counts field
            nodes along <Tex>{String.raw`x`}</Tex> and <Tex>{String.raw`n`}</Tex> along <Tex>{String.raw`y`}</Tex> (radial
            and angular indices for circular mirrors). Fig.&nbsp;B-3 shows these patterns, including the
            &ldquo;doughnut&rdquo; superposition modes.
          </Step>
        </Derivation>
        <Callout kind="insight" title="What Fox & Li proved">
          A passive cavity mode exists and is computable <em>even with no analytic formula</em>: it is the fixed point —
          the dominant eigenfunction — of the round-trip diffraction operator. Lower-order modes have lower loss.
        </Callout>
        <Callout kind="warning" title="Not a classical Fabry–Perot fringe">
          The ripples in the converged amplitude (Fig.&nbsp;B-2) are <em>diffraction structure</em>, not the
          multiple-beam interference fringes of a classical Fabry–Perot interferometer. Do not conflate the two.
        </Callout>
      </Section>

      <Section title="Confocal resonators: reducing the integral to a finite Fourier transform">
        <Intuition>
          Boyd &amp; Gordon (1961) found the geometry where the diffraction integral becomes solvable in closed form: the{" "}
          <strong>confocal</strong> resonator — two identical spherical mirrors of radius{" "}
          <Tex>{String.raw`R_c`}</Tex> separated by exactly <Tex>{String.raw`L=R_c`}</Tex>, so their focal points
          coincide at the cavity centre. Geometrically, the source-to-observation distance{" "}
          <Tex>{String.raw`r`}</Tex> reduces to a constant <Tex>{String.raw`R_c`}</Tex> plus a bilinear cross-term{" "}
          <Tex>{String.raw`-(xx'+yy')/R_c`}</Tex>. Dropped into <Tex>{String.raw`\exp(-iKr)`}</Tex>, that cross-term is{" "}
          <em>exactly</em> the kernel of a Fourier transform. The fearsome 2-D integral collapses into a finite-aperture
          Fourier transform that separates into <Tex>{String.raw`x`}</Tex> and <Tex>{String.raw`y`}</Tex>.
        </Intuition>

        <p>
          Expand each spherical mirror&rsquo;s sag (how far the surface recedes from the tangent plane) to second order:
        </p>
        <EqBlock label="5">
          {String.raw`z' = R_c-(R_c^2-y'^2)^{1/2}=R_c-R_c\!\left(1-\tfrac{y'^2}{R_c^2}\right)^{1/2}\simeq \frac{y'^2}{2R_c},`}
        </EqBlock>
        <EqBlock label="6">
          {String.raw`z = R_c-\bigl[R_c-(R_c^2-y^2)^{1/2}\bigr]\simeq R_c-\frac{y^2}{2R_c}.`}
        </EqBlock>
        <p>The axial separation between a point on the left mirror and one on the right combines these:</p>
        <EqBlock>{String.raw`z-z'\simeq R_c-\frac{1}{2}\,\frac{y'^2+y^2}{R_c}.`}</EqBlock>
        <p>
          Now form <Tex>{String.raw`r^2=(z-z')^2+(y-y')^2`}</Tex>. The confocal condition{" "}
          <Tex>{String.raw`L=R_c`}</Tex> is engineered so the quadratic self-terms cancel, leaving only the bilinear
          cross-term:
        </p>
        <KeyResult
          number="7"
          eq={String.raw`r^2=(z-z')^2+(y-y')^2 \simeq R_c^2\!\left(1-\frac{2yy'}{R_c^2}\right),`}
          label="Cancellation of quadratic terms (the confocal magic)"
        />
        <p>Taking the square root (and adding the identical x-contribution) linearizes r:</p>
        <KeyResult
          number="8"
          eq={String.raw`r \simeq R_c - x\!\left(\frac{x'}{R_c}\right) - y\!\left(\frac{y'}{R_c}\right),`}
          label="Linearized source-to-observation distance"
          note={
            <>
              Substituting into <Tex>{String.raw`\exp(-iKr)`}</Tex> gives a constant phase{" "}
              <Tex>{String.raw`\exp(-iKR_c)`}</Tex> times the Fourier kernel{" "}
              <Tex>{String.raw`\exp\!\bigl[+iK(xx'+yy')/R_c\bigr]`}</Tex>.
            </>
          }
        />
        <p>
          Because <Tex>{String.raw`r`}</Tex> separates into independent <Tex>{String.raw`x`}</Tex> and{" "}
          <Tex>{String.raw`y`}</Tex> terms, try a separable mode:
        </p>
        <EqBlock label="9">{String.raw`u_S(x,y)=f_m(x)\,g_n(y).`}</EqBlock>
        <p>The eigenvalue equation then becomes a product of two finite-aperture Fourier transforms:</p>
        <EqBlock label="10">
          {String.raw`\sigma_m\sigma_n\,f_m(x)g_n(y)=\frac{iK\,e^{-iKR_c}}{2\pi R_c}\int_{-a}^{a}\!dx'\,e^{-i(Kx/R_c)x'}f_m(x')\int_{-a}^{a}\!dy'\,e^{-i(Ky/R_c)y'}g_n(y').`}
        </EqBlock>
        <p>Nondimensionalize with a scaled transverse coordinate and aperture:</p>
        <EqBlock label="11">{String.raw`X=\sqrt{K/R_c}\;x,\qquad A=\sqrt{K/R_c}\;a,`}</EqBlock>
        <p>so the kernel becomes canonical and the 1-D problem reads:</p>
        <KeyResult
          number="12"
          eq={String.raw`\chi_m\,F_m(X)=\frac{1}{\sqrt{2\pi}}\int_{-A}^{A}\!dX'\,e^{+iXX'}\,F_m(X').`}
          label="Canonical finite Fourier transform"
          note={
            <>
              A finite Fourier transform with eigenvalue <Tex>{String.raw`\chi_m`}</Tex>. Its eigenfunctions for finite{" "}
              <Tex>{String.raw`A`}</Tex> are the prolate spheroidal functions (Slepian &amp; Pollak 1961); for{" "}
              <Tex>{String.raw`A\to\infty`}</Tex> they become the Hermite–Gaussians of the next section.
            </>
          }
        />

        <Derivation title="Sag → cancellation → canonical Fourier transform (Eqs. 5–12)">
          <Step title="Sag and axial geometry (Eqs. 5–6)">
            Expand <Tex>{String.raw`(R_c^2-y^2)^{1/2}`}</Tex> to second order in{" "}
            <Tex>{String.raw`y/R_c`}</Tex> to get the parabolic sag <Tex>{String.raw`y^2/2R_c`}</Tex> on each mirror.
            Confocal means <Tex>{String.raw`L=R_c`}</Tex>.
          </Step>
          <Step title="Quadratic terms cancel (Eq. 7)">
            Forming <Tex>{String.raw`r^2=(z-z')^2+(y-y')^2`}</Tex>, the <Tex>{String.raw`y^2`}</Tex> and{" "}
            <Tex>{String.raw`y'^2`}</Tex> pieces cancel, leaving{" "}
            <Tex>{String.raw`r^2\simeq R_c^2(1-2yy'/R_c^2)`}</Tex>. This cancellation is special to{" "}
            <Tex>{String.raw`L=R_c`}</Tex> and is what makes the problem a clean Fourier transform.
          </Step>
          <Step title="Linearize and substitute (Eq. 8 → 10)">
            <Tex>{String.raw`r\simeq R_c-yy'/R_c`}</Tex> (and likewise <Tex>{String.raw`-xx'/R_c`}</Tex>). Then{" "}
            <Tex>{String.raw`e^{-iKr}=e^{-iKR_c}\,e^{+iKxx'/R_c}\,e^{+iKyy'/R_c}`}</Tex>. Pull the constant{" "}
            <Tex>{String.raw`e^{-iKR_c}`}</Tex> into the prefactor; with <Tex>{String.raw`u_S=f_m g_n`}</Tex> (Eq.&nbsp;9)
            the integral splits into independent <Tex>{String.raw`x`}</Tex> and <Tex>{String.raw`y`}</Tex> transforms
            (Eq.&nbsp;10).
          </Step>
          <Step title="Nondimensionalize (Eqs. 11–12)">
            With <Tex>{String.raw`X=\sqrt{K/R_c}\,x`}</Tex> and <Tex>{String.raw`A=\sqrt{K/R_c}\,a`}</Tex>, the kernel
            becomes <Tex>{String.raw`(Kx/R_c)x'=XX'`}</Tex> and the limits become <Tex>{String.raw`\pm A`}</Tex>, giving
            Eq.&nbsp;(12).
          </Step>
        </Derivation>

        <Callout kind="warning" title="Sign typo in the printed Eq. (10)">
          The scan prints Eq.&nbsp;(10) with kernel <Tex>{String.raw`e^{-i(Kx/R_c)x'}`}</Tex> (minus), but
          Eqs.&nbsp;(12)–(13) print <Tex>{String.raw`e^{+iXX'}`}</Tex> (plus), and the stated eigenvalue{" "}
          <Tex>{String.raw`\chi_m=i^m`}</Tex> requires the <Tex>{String.raw`+i`}</Tex> kernel. The geometry of
          Eq.&nbsp;(8) — <Tex>{String.raw`e^{-iKr}=e^{-iKR_c}e^{+iKxx'/R_c}`}</Tex> — forces a{" "}
          <Tex>{String.raw`+i`}</Tex> cross-term. The <Tex>{String.raw`-i`}</Tex> in the printed Eq.&nbsp;(10) is a
          printing inconsistency. Both signs give the same <Tex>{String.raw`|\sigma|^2`}</Tex> loss, but the
          phase/eigenvalue assignment needs <Tex>{String.raw`+i`}</Tex> — and the simulation uses it.
        </Callout>
        <Intuition title="Why confocal is solvable">
          Confocal mirrors place each at the focal point of the other. Geometrically that makes the round-trip phase
          quadratic-free except for the bilinear <Tex>{String.raw`xx'`}</Tex> term — which is precisely a Fourier
          transform. The eigenfunctions of the Fourier transform are the Hermite–Gaussians, so the cavity modes are
          Gaussian beams.
        </Intuition>
      </Section>

      <Section title="Hermite–Gaussian eigenmodes and the Gaussian-beam field">
        <Intuition>
          In the infinite-aperture limit <Tex>{String.raw`A\to\infty`}</Tex>, the finite transform of Eq.&nbsp;(12)
          becomes the ordinary Fourier transform, whose eigenfunctions are the Hermite–Gaussian functions{" "}
          <Tex>{String.raw`H_m(X)e^{-X^2/2}`}</Tex> with eigenvalue <Tex>{String.raw`i^m`}</Tex>. So the transverse modes
          of a confocal cavity are <strong>Hermite–Gaussians</strong>, and the lowest (<Tex>{String.raw`m=n=0`}</Tex>) is
          a pure Gaussian — the fundamental Gaussian beam. SSL then reconstruct the full 3-D field everywhere in the
          cavity.
        </Intuition>
        <p>The defining self-Fourier property of the Hermite–Gaussian functions:</p>
        <EqBlock label="13">
          {String.raw`\frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty}\!dX'\,e^{+iXX'}\,H_m(X')e^{-X'^2/2}=i^m\,H_m(X)e^{-X^2/2}.`}
        </EqBlock>
        <KeyResult
          number="14"
          eq={String.raw`F_m(X)=F_m(0)\,H_m(X)\,e^{-X^2/2},`}
          label="Transverse mode eigenfunction"
          note={
            <>
              A Hermite polynomial <Tex>{String.raw`H_m`}</Tex> times a Gaussian, solving Eq.&nbsp;(12) for{" "}
              <Tex>{String.raw`A=\infty`}</Tex> with eigenvalue <Tex>{String.raw`\chi_m=i^m`}</Tex>. The 2-D eigenvalue is{" "}
              <Tex>{String.raw`\sigma=\sigma_m\sigma_n\propto i^{m+n}`}</Tex>.
            </>
          }
        />
        <p>The full intracavity field of a confocal-cavity mode (TEMₘₙ) is, after some algebra:</p>
        <KeyResult
          number="15"
          eq={String.raw`E(x,y,z)=E_0\,h(z)\,H_m(Xh)\,H_n(Yh)\,\exp\!\left[-\frac{K(x^2+y^2)}{R_c+4z^2/R_c}\right]\exp\!\left\{-iK\!\left[\tfrac{1}{2}R_c+z+\frac{2z(x^2+y^2)}{R_c^2+4z^2}\right]+i(1+m+n)\!\left(\frac{\pi}{2}-\phi\right)\right\}`}
          label="Hermite–Gaussian cavity mode"
          note={
            <>
              A Hermite–Gaussian transverse profile inside a Gaussian envelope whose width <Tex>{String.raw`h(z)`}</Tex>{" "}
              breathes along <Tex>{String.raw`z`}</Tex>; a longitudinal carrier phase <Tex>{String.raw`K(\tfrac12R_c+z)`}</Tex>;
              a curved-wavefront term <Tex>{String.raw`2z(x^2+y^2)/(R_c^2+4z^2)`}</Tex> that makes the fronts spherical;
              and the order-dependent <strong>Gouy phase</strong> <Tex>{String.raw`(1+m+n)(\pi/2-\phi)`}</Tex>.
            </>
          }
        />
        <p>The auxiliary functions in Eq.&nbsp;(15):</p>
        <EqBlock>
          {String.raw`h(z)=\left[\frac{2R_c^2}{R_c^2+4z^2}\right]^{1/2},\qquad \tan\phi=\frac{R_c-2z}{R_c+2z}.`}
        </EqBlock>
        <p>
          The fundamental (<Tex>{String.raw`m=n=0`}</Tex>) factor is the Gaussian beam. Its phase-front curvature is:
        </p>
        <KeyResult
          number="16"
          eq={String.raw`R=z+\frac{z_0^2}{z},`}
          label="Phase-front radius of curvature"
          note={
            <>
              With Rayleigh length <Tex>{String.raw`z_0=R_c/2`}</Tex>, evaluating at{" "}
              <Tex>{String.raw`z=z_0=R_c/2`}</Tex> gives <Tex>{String.raw`R=R_c`}</Tex> — equal to the mirror radius. The
              mirror surfaces coincide with equiphase surfaces, proving the confocal mode is self-consistent.
            </>
          }
        />
        <Derivation title="Hermite–Gauss eigenfunctions → field everywhere → self-consistency">
          <Step title="Fourier eigenfunctions (Eq. 13 → 14)">
            The Hermite functions are eigenfunctions of the Fourier transform:{" "}
            <Tex>{String.raw`\mathcal{F}[H_m e^{-x^2/2}]=i^m H_m e^{-x^2/2}`}</Tex>. Hence in the{" "}
            <Tex>{String.raw`A\to\infty`}</Tex> limit Eq.&nbsp;(12) is solved by{" "}
            <Tex>{String.raw`F_m(X)=F_m(0)H_m(X)e^{-X^2/2}`}</Tex> with <Tex>{String.raw`\chi_m=i^m`}</Tex>.
          </Step>
          <Step title="Reconstruct the field (→ Eq. 15)">
            The eigenfunctions live on the mirrors; to get the field at general <Tex>{String.raw`z`}</Tex>, evaluate the
            transform with the propagation distance restored. The result is Eq.&nbsp;(15): a Hermite–Gaussian whose scale{" "}
            <Tex>{String.raw`h(z)`}</Tex> and phase <Tex>{String.raw`\phi(z)`}</Tex> evolve along the axis, split into a
            real Gaussian amplitude and an imaginary phase (carrier + curvature + Gouy).
          </Step>
          <Step title="Rayleigh length and self-consistency (Eq. 16)">
            Define <Tex>{String.raw`z_0`}</Tex> as the distance from the waist where the spot grows by{" "}
            <Tex>{String.raw`\sqrt 2`}</Tex>; for Eq.&nbsp;(15) one reads off <Tex>{String.raw`z_0=R_c/2`}</Tex>. The
            phase-front curvature is <Tex>{String.raw`R(z)=z+z_0^2/z`}</Tex> (Eq.&nbsp;16); at{" "}
            <Tex>{String.raw`z=R_c/2`}</Tex> this equals <Tex>{String.raw`R_c`}</Tex>, so the spherical mirrors sit
            exactly on equiphase surfaces — a genuine confocal eigenmode.
          </Step>
        </Derivation>
        <Callout kind="insight" title="Cavity modes ARE Gaussian beams">
          The fundamental confocal mode (<Tex>{String.raw`m=n=0`}</Tex>) is exactly the{" "}
          <Tex>{String.raw`\mathrm{TEM}_{00}`}</Tex> Gaussian beam; higher modes are Hermite–Gaussian beams. This is the
          single most-used fact in laser engineering — it is why laser output is (ideally) a clean Gaussian and why beam
          quality is measured against it.
        </Callout>
        <Intuition title="Rayleigh length z₀ = R_c / 2">
          <Tex>{String.raw`z_0`}</Tex> is the natural longitudinal scale of a Gaussian beam: within{" "}
          <Tex>{String.raw`\pm z_0`}</Tex> of the waist the beam is roughly collimated; beyond it it diverges. SSL&rsquo;s
          numbers: <Tex>{String.raw`w_0\approx 0.5`}</Tex>&nbsp;mm, <Tex>{String.raw`z_0=50`}</Tex>&nbsp;cm at{" "}
          <Tex>{String.raw`\lambda=10^{-4}`}</Tex>&nbsp;cm — an extremely skinny beam, so only near-axis atoms contribute
          gain.
        </Intuition>
      </Section>

      <Section title="The simulation: iterating to a self-reproducing mode">
        <p>
          Everything above is one idea made operational: a cavity mode is the <em>fixed point</em> of the round-trip
          diffraction operator. The simulation realizes Fox &amp; Li (1961) directly. It discretizes the 1-D round-trip
          integral (the appendix separates <Tex>{String.raw`x`}</Tex> and <Tex>{String.raw`y`}</Tex>, so a 1-D slice
          captures the physics), estimates the eigenvalue each pass by the Rayleigh quotient{" "}
          <Tex>{String.raw`\sigma=\langle u_q,u_{q+1}\rangle/\langle u_q,u_q\rangle`}</Tex>, and renormalizes so{" "}
          <Tex>{String.raw`|\sigma|^q`}</Tex> never under- or overflows. Everything is driven by the single knob{" "}
          <Tex>{String.raw`N_F=a^2/(L\lambda)`}</Tex>.
        </p>

        <SimFrame
          title="Fox–Li cavity-mode builder"
          caption={
            <>
              Two stacked profile plots — relative amplitude <Tex>{String.raw`|u_q|`}</Tex> and relative phase{" "}
              <Tex>{String.raw`\arg u_q`}</Tex> vs <Tex>{String.raw`\xi=x/a`}</Tex> — plus the per-pass loss{" "}
              <Tex>{String.raw`a_l=1-|\sigma|^2`}</Tex> and the <Tex>{String.raw`(g_1,g_2)`}</Tex> stability map
              (Fig.&nbsp;B-7). The two geometries mirror the two solution routes: <strong>plane-parallel</strong> runs
              Fox &amp; Li&rsquo;s brute-force iteration from an arbitrary seed and watches it self-organize;{" "}
              <strong>confocal</strong> seeds the analytic Hermite–Gaussian and confirms it reproduces itself — read off{" "}
              <Tex>{String.raw`\arg\sigma\approx m\cdot 90^\circ`}</Tex>, the eigenvalue <Tex>{String.raw`i^m`}</Tex>.
            </>
          }
          tryThis={
            <>
              Pick <strong>plane-parallel</strong> and push <Tex>{String.raw`N_F`}</Tex> up: the loss{" "}
              <Tex>{String.raw`a_l`}</Tex> plummets toward zero (<Tex>{String.raw`|\sigma|^2\to 1`}</Tex>) — large
              aperture, little spill-over. Watch the trial field morph into a smooth mode with diffraction ripples (the
              overlap with the ideal Gaussian stays below 1 — those ripples are the real diffraction structure of
              Fig.&nbsp;B-2). Now switch to <strong>confocal</strong>: the seeded Hermite–Gaussian already reproduces
              itself (overlap <Tex>{String.raw`\approx 1`}</Tex>, loss <Tex>{String.raw`\approx 0`}</Tex>), and{" "}
              <Tex>{String.raw`\arg\sigma`}</Tex> reads <Tex>{String.raw`0^\circ`}</Tex> for the uniform/even mode but{" "}
              <Tex>{String.raw`90^\circ`}</Tex> for the antisymmetric/odd mode — that is{" "}
              <Tex>{String.raw`\chi_m=i^m`}</Tex>, the Gouy eigenvalue, displayed live.
            </>
          }
        >
          <AppBSim />
        </SimFrame>
      </Section>

      <Section title="Mode frequencies, diffraction loss, and the stability condition">
        <Intuition>
          The engineering deliverables. <strong>(1) Frequencies:</strong> requiring the round-trip phase to be an
          integer multiple of <Tex>{String.raw`\pi`}</Tex> — now <em>including</em> the Gouy phase — shifts the resonance
          comb; higher transverse modes are pushed up by the Gouy term. <strong>(2) Loss:</strong> the per-pass
          fractional power loss is just <Tex>{String.raw`1-|\sigma|^2`}</Tex>, which vanishes for an ideal
          infinite-aperture Hermite–Gaussian. <strong>(3) Stability:</strong> a general two-mirror cavity supports
          finite-width beams on both mirrors only inside a band set by the mirror geometry.
        </Intuition>
        <p>
          Requiring the one-way phase from <Tex>{String.raw`z=-R_c/2`}</Tex> to <Tex>{String.raw`+R_c/2`}</Tex> — the
          geometric <Tex>{String.raw`K_{mnq}R_c`}</Tex> minus the accumulated Gouy phase{" "}
          <Tex>{String.raw`(1+m+n)\pi/2`}</Tex> — to equal <Tex>{String.raw`q\pi`}</Tex>:
        </p>
        <EqBlock>
          {String.raw`q\pi=\Bigl[K_{mnq}R_c-(1+m+n)\tfrac{\pi}{2}\Bigr]\ \Longrightarrow\ K_{mnq}R_c=q\pi+(1+m+n)\tfrac{\pi}{2}.`}
        </EqBlock>
        <p>Solving for the frequency (with <Tex>{String.raw`R_c=L`}</Tex>, <Tex>{String.raw`\Omega=Kc`}</Tex>):</p>
        <KeyResult
          number="17"
          eq={String.raw`\Omega_{mnq}=K_{mnq}c=\pi\,(2q+1+m+n)\,\frac{c}{2L},`}
          label="Confocal mode-frequency formula"
          note={
            <>
              Adjacent longitudinal modes (<Tex>{String.raw`\Delta q=1`}</Tex>) are spaced by{" "}
              <Tex>{String.raw`\pi c/L`}</Tex>; the transverse indices add <Tex>{String.raw`\pi(m+n)c/2L`}</Tex> via the
              Gouy shift. Confocal cavities are frequency-degenerate in steps of <Tex>{String.raw`c/2L`}</Tex>.
            </>
          }
        />
        <p>
          The fundamental <Tex>{String.raw`\mathrm{TEM}_{00}`}</Tex> resonance differs from the naive Eq.&nbsp;(1) result
          by an extra half-step — the <Tex>{String.raw`\pi`}</Tex> Gouy phase a Gaussian picks up through its waist:
        </p>
        <EqBlock label="—">{String.raw`\Omega_{00q}=\pi\,(2q+1)\,\frac{c}{2L}.`}</EqBlock>
        <p>The fractional power loss per pass follows directly from the eigenvalue magnitude:</p>
        <KeyResult
          number="18"
          eq={String.raw`a_l=1-|\sigma_m\sigma_n|^2=1-|\chi_m\chi_n|^2.`}
          label="Diffraction loss per pass"
          note={
            <>
              For the ideal Hermite–Gaussian <Tex>{String.raw`\chi_m=i^m`}</Tex>, so{" "}
              <Tex>{String.raw`|\chi_m|=1`}</Tex> and the loss <em>vanishes</em>; all real diffraction loss comes from the
              finite aperture (prolate spheroidal functions, Fig.&nbsp;B-6, with loss falling steeply as{" "}
              <Tex>{String.raw`N_F`}</Tex> grows).
            </>
          }
        />
        <p>
          Finally, the design rule. Build a general cavity by placing mirrors of curvature{" "}
          <Tex>{String.raw`R(z)=z+z_0^2/z`}</Tex> at any two phase fronts of the Gaussian beam (Fig.&nbsp;B-5), and demand
          the beam widths be real and finite on both. With <Tex>{String.raw`g_1=1-L/R_1`}</Tex> and{" "}
          <Tex>{String.raw`g_2=1-L/R_2`}</Tex> this requires:
        </p>
        <KeyResult
          number="19"
          eq={String.raw`0 \le \left(1-\frac{L}{R_1}\right)\!\left(1-\frac{L}{R_2}\right) \le 1.`}
          label="Resonator stability condition"
          note={
            <>
              Only when the product <Tex>{String.raw`g_1 g_2`}</Tex> lies in <Tex>{String.raw`[0,1]`}</Tex> are the beam
              widths finite. Confocal (<Tex>{String.raw`R_1=R_2=L\Rightarrow g_1g_2=0`}</Tex>), plane-parallel (
              <Tex>{String.raw`R\to\infty\Rightarrow g_1g_2=1`}</Tex>), and concentric (
              <Tex>{String.raw`R_1=R_2=L/2\Rightarrow g_1g_2=1`}</Tex>) sit on its boundary.
            </>
          }
        />

        <Figure
          caption={
            <>
              <strong>Fig. B-7.</strong> The <Tex>{String.raw`(g_1,g_2)`}</Tex> stability diagram. The shaded region is
              the stable (low-loss) band <Tex>{String.raw`0\le g_1g_2\le 1`}</Tex>, bounded by the axes{" "}
              <Tex>{String.raw`g_1g_2=0`}</Tex> and the hyperbola <Tex>{String.raw`g_1g_2=1`}</Tex>. Confocal, plane,
              and concentric cavities lie on the boundary; the same diagram is drawn live in the simulation.
            </>
          }
        >
          <svg viewBox="0 0 360 300" style={{ width: "100%", maxWidth: 360 }}>
            {/* stable band shading: sample grid where 0<=g1 g2<=1, axes from -1.4..1.4 */}
            {(() => {
              const cells: JSX.Element[] = [];
              const N = 56;
              const lo = -1.4;
              const hi = 1.4;
              const L = 40;
              const R = 340;
              const T = 20;
              const B = 260;
              for (let ix = 0; ix < N; ix++) {
                for (let iy = 0; iy < N; iy++) {
                  const g1 = lo + ((ix + 0.5) / N) * (hi - lo);
                  const g2 = lo + ((iy + 0.5) / N) * (hi - lo);
                  const p = g1 * g2;
                  if (p >= 0 && p <= 1) {
                    const px = L + ((g1 - lo) / (hi - lo)) * (R - L);
                    const py = B - ((g2 - lo) / (hi - lo)) * (B - T);
                    const cw = (R - L) / N;
                    const ch = (B - T) / N;
                    cells.push(
                      <rect key={`${ix}-${iy}`} x={px - cw / 2} y={py - ch / 2} width={cw + 0.6} height={ch + 0.6} fill="rgba(79,70,229,0.12)" />
                    );
                  }
                }
              }
              return cells;
            })()}
            {/* axes */}
            <line x1="40" y1="140" x2="340" y2="140" stroke="#9aa3b2" strokeWidth="1.2" />
            <line x1="190" y1="20" x2="190" y2="260" stroke="#9aa3b2" strokeWidth="1.2" />
            {/* hyperbola g1 g2 = 1 (two branches) */}
            {(() => {
              const lo = -1.4;
              const hi = 1.4;
              const L = 40;
              const R = 340;
              const T = 20;
              const B = 260;
              const sx = (g: number) => L + ((g - lo) / (hi - lo)) * (R - L);
              const sy = (g: number) => B - ((g - lo) / (hi - lo)) * (B - T);
              let d1 = "";
              for (let g1 = 0.72; g1 <= 1.4; g1 += 0.02) {
                const g2 = 1 / g1;
                if (g2 > 1.4) continue;
                d1 += `${d1 ? "L" : "M"}${sx(g1).toFixed(1)} ${sy(g2).toFixed(1)} `;
              }
              let d2 = "";
              for (let g1 = -0.72; g1 >= -1.4; g1 -= 0.02) {
                const g2 = 1 / g1;
                if (g2 < -1.4) continue;
                d2 += `${d2 ? "L" : "M"}${sx(g1).toFixed(1)} ${sy(g2).toFixed(1)} `;
              }
              return (
                <>
                  <path d={d1} fill="none" stroke="#e11d48" strokeWidth="1.8" />
                  <path d={d2} fill="none" stroke="#e11d48" strokeWidth="1.8" />
                  {/* marked cavities */}
                  {([
                    [0, 0, "confocal"],
                    [1, 1, "plane-parallel"],
                    [-1, -1, "concentric"],
                  ] as [number, number, string][]).map(([g1, g2, lab], i) => (
                    <g key={i}>
                      <circle cx={sx(g1)} cy={sy(g2)} r="4" fill="#1f2733" />
                      {lab ? (
                        <text x={sx(g1) + (g1 > 0 ? -8 : 8)} y={sy(g2) - 8} fontSize="11" fill="#1f2733" textAnchor={g1 > 0 ? "end" : "start"}>
                          {lab}
                        </text>
                      ) : null}
                    </g>
                  ))}
                </>
              );
            })()}
            <text x="345" y="155" fontSize="13" fill="#1f2733" fontStyle="italic">
              g₁
            </text>
            <text x="196" y="18" fontSize="13" fill="#1f2733" fontStyle="italic">
              g₂
            </text>
            <text x="250" y="100" fontSize="11" fill="#4f46e5">
              stable
            </text>
            <text x="248" y="48" fontSize="10" fill="#e11d48">
              g₁g₂ = 1
            </text>
          </svg>
        </Figure>

        <Callout kind="insight" title="The π Gouy shift">
          <Tex>{String.raw`\mathrm{TEM}_{00}`}</Tex> frequencies are offset by <Tex>{String.raw`\pi(c/2L)`}</Tex> from
          the crude plane-wave comb because a focused Gaussian slips an extra <Tex>{String.raw`\pi`}</Tex> of phase
          passing through its waist (the Gouy phase). Transverse modes add further{" "}
          <Tex>{String.raw`\pi(m+n)(c/2L)`}</Tex> shifts, making confocal cavities degenerate in steps of{" "}
          <Tex>{String.raw`c/2L`}</Tex>.
        </Callout>
        <Callout kind="note" title="Why unstable cavities are still used">
          Unstable resonators (outside the <Tex>{String.raw`g_1g_2`}</Tex> band) lose lots of power per pass, but their
          larger beam fills more of the gain medium — an advantage in high-power lasers, where extracting energy from a
          big mode volume matters more than low loss.
        </Callout>
        <Callout kind="note" title="Multimode caveat (closing remark)">
          All of this assumes a single transverse profile. The multimode laser theories elsewhere in the book assume all
          modes share the same transverse variation; transverse variations are ignored. That is not strictly accurate
          (mode competition, &ldquo;burn holes&rdquo;), but the single-mode passive picture is the right starting point.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="What you keep from this appendix">
          <ul>
            <li>
              <strong>A cavity mode is a fixed point.</strong> It is the self-reproducing eigenfunction of the round-trip
              diffraction operator (<Tex>{String.raw`u'=\sigma u`}</Tex>, Eq.&nbsp;3); its complex{" "}
              <Tex>{String.raw`\sigma`}</Tex> carries per-pass loss <Tex>{String.raw`|\sigma|^2`}</Tex> and phase{" "}
              <Tex>{String.raw`\arg\sigma`}</Tex>. This idea underlies later cavity-QED and laser-dynamics chapters.
            </li>
            <li>
              <strong>The laser mode is a Gaussian beam.</strong> The fundamental is{" "}
              <Tex>{String.raw`\mathrm{TEM}_{00}`}</Tex>; higher modes are Hermite–Gaussian{" "}
              <Tex>{String.raw`\mathrm{TEM}_{mn}`}</Tex> (Eqs.&nbsp;14–15). When later chapters write{" "}
              <Tex>{String.raw`E(t)\,U(\mathbf r)`}</Tex> with a single transverse <Tex>{String.raw`U`}</Tex>, that{" "}
              <Tex>{String.raw`U`}</Tex> is this mode.
            </li>
            <li>
              <strong>Rayleigh length and equiphase mirrors.</strong> <Tex>{String.raw`z_0`}</Tex> is the longitudinal
              scale; for a confocal cavity <Tex>{String.raw`z_0=R_c/2`}</Tex>, and{" "}
              <Tex>{String.raw`R(z)=z+z_0^2/z`}</Tex> (Eq.&nbsp;16) matches the mirror at the mirror.
            </li>
            <li>
              <strong>Frequency comb with a Gouy shift.</strong>{" "}
              <Tex>{String.raw`\Omega_{mnq}=\pi(2q+1+m+n)c/2L`}</Tex> (Eq.&nbsp;17): longitudinal spacing{" "}
              <Tex>{String.raw`c/2L`}</Tex> plus the transverse Gouy term, with the extra{" "}
              <Tex>{String.raw`\pi`}</Tex> offsetting even the fundamental.
            </li>
            <li>
              <strong>Loss = cavity decay rate.</strong> <Tex>{String.raw`a_l=1-|\sigma|^2`}</Tex> (Eq.&nbsp;18) vanishes
              for ideal Hermite–Gaussians and is governed by <Tex>{String.raw`N_F`}</Tex> for real mirrors. This is the{" "}
              <Tex>{String.raw`\kappa`}</Tex> that enters the laser threshold condition later.
            </li>
            <li>
              <strong>The stability rule</strong> <Tex>{String.raw`0\le(1-L/R_1)(1-L/R_2)\le 1`}</Tex> (Eq.&nbsp;19)
              decides whether a geometry confines a low-loss mode; confocal, plane, concentric sit on the boundary.
            </li>
            <li>
              <strong>These are quasimodes</strong>, not true normal modes: they leak energy, so the
              single-transverse-mode assumption used throughout the multimode chapters is an approximation that ignores
              transverse mode competition.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
