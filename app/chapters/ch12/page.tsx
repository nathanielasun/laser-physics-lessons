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
import Ch12Sim from "@/components/sims/ch12";

export default function Page() {
  return (
    <Lesson slug="ch12">
      <Lede>
        Until now the laser field has been a <em>scalar</em>: one polarization, one mode, one set of self-consistency
        equations. The Zeeman laser breaks that simplicity in the most physical way possible — you put the gain tube in a
        magnetic field. The field Zeeman-splits the atomic levels, so the medium now responds <em>differently</em> to
        left- and right-circularly-polarized light. A single cavity mode is secretly <strong>two</strong> modes — the
        two circular polarizations <Tex>{String.raw`\hat{\mathbf e}_+`}</Tex> and <Tex>{String.raw`\hat{\mathbf e}_-`}</Tex>{" "}
        — competing for the same atoms exactly the way the two counter-running waves of the ring laser (Chapter&nbsp;XI)
        compete. The magnetic field is a knob that tunes that competition, and the payoffs are gorgeous and measured: a
        magnetic <em>Lamb dip</em> in the output intensities and a polarization <em>beat note</em> that locks near{" "}
        <Tex>{String.raw`B=0`}</Tex> and then unlocks into a clean Zeeman-split signal — the prototype of the optically
        pumped laser magnetometer.
      </Lede>

      <Section title="The vector field and the circular-polarization basis">
        <Intuition>
          Stop pretending the field is a scalar. The electric field has two transverse degrees of freedom (
          <Tex>{String.raw`x`}</Tex> and <Tex>{String.raw`y`}</Tex>), so we give it a <em>vector</em> amplitude. The
          single move that organizes the whole chapter is the choice of basis: instead of <Tex>{String.raw`\hat{\mathbf x}`}</Tex>{" "}
          and <Tex>{String.raw`\hat{\mathbf y}`}</Tex>, use the two circular-polarization unit vectors{" "}
          <Tex>{String.raw`\hat{\mathbf e}_\pm`}</Tex>. Why? Because circularly polarized light drives <em>only</em>{" "}
          <Tex>{String.raw`\Delta m = \pm 1`}</Tex> atomic transitions — <Tex>{String.raw`\hat{\mathbf e}_+`}</Tex>{" "}
          couples to one set of Zeeman sublevels, <Tex>{String.raw`\hat{\mathbf e}_-`}</Tex> to the other. A magnetic
          field splits those two sets apart in energy, so the circular basis is the one in which the medium responds{" "}
          <em>diagonally</em>: the <Tex>{String.raw`+`}</Tex> light and the <Tex>{String.raw`-`}</Tex> light each see
          their own gain curve, displaced from line center by the Zeeman shift.
        </Intuition>
        <p>
          A general field is a superposition of the two circular components, each with its own slowly varying amplitude,
          phase, and frequency — exactly two modes. This is the central ansatz of the chapter:
        </p>
        <KeyResult
          number="1"
          eq={String.raw`\mathbf E(z,t) = \tfrac{1}{2}\big\{\hat{\mathbf e}_+ E_+(t)\,e^{-i(\nu_+ t + \phi_+)} + \hat{\mathbf e}_- E_-(t)\,e^{-i(\nu_- t + \phi_-)}\big\}\,U(z) + \text{c.c.}`}
          label="Two-mode (circular) field decomposition"
          note={
            <>
              Each circular component has its own real amplitude <Tex>{String.raw`E_\pm(t)`}</Tex>, phase{" "}
              <Tex>{String.raw`\phi_\pm(t)`}</Tex>, and frequency <Tex>{String.raw`\nu_\pm`}</Tex>;{" "}
              <Tex>{String.raw`U(z)`}</Tex> is the cavity-mode spatial function.
            </>
          }
        />
        <p>The circular unit vectors themselves are the in-plane combinations that carry one unit of angular momentum:</p>
        <EqBlock label="1′">{String.raw`\hat{\mathbf e}_\pm = 2^{-1/2}\,(\hat{\mathbf x} \pm i\,\hat{\mathbf y}),\qquad \hat{\mathbf e}_+\cdot\hat{\mathbf e}_+^{\,*} = 1.`}</EqBlock>
        <p>
          They are orthonormal in the Hermitian sense and diagonalize the atomic dipole response in a magnetic field —
          the property we will lean on for the rest of the chapter.
        </p>

        <Figure
          caption={
            <>
              Zeeman-split sublevels of an upper level <Tex>{String.raw`J_a`}</Tex> and lower level{" "}
              <Tex>{String.raw`J_b`}</Tex>. Right-circular light <Tex>{String.raw`\hat{\mathbf e}_+`}</Tex> drives only{" "}
              <Tex>{String.raw`\Delta m = +1`}</Tex> transitions; left-circular <Tex>{String.raw`\hat{\mathbf e}_-`}</Tex>{" "}
              drives only <Tex>{String.raw`\Delta m = -1`}</Tex>. The two sets of transitions are displaced oppositely in
              frequency by the magnetic field — the origin of the two displaced gain curves.
            </>
          }
        >
          <svg viewBox="0 0 560 300" role="img" aria-label="Zeeman sublevels and circular selection rules">
            <rect x="0" y="0" width="560" height="300" fill="#fbfcfe" />
            {/* upper manifold J_a = 1 */}
            <line x1="60" y1="70" x2="200" y2="70" stroke="#334155" strokeWidth="3" />
            <line x1="220" y1="55" x2="360" y2="55" stroke="#334155" strokeWidth="3" />
            <line x1="380" y1="40" x2="520" y2="40" stroke="#334155" strokeWidth="3" />
            <text x="55" y="66" fontSize="13" textAnchor="end" fill="#5b6473">m=−1</text>
            <text x="215" y="51" fontSize="13" textAnchor="end" fill="#5b6473">m=0</text>
            <text x="375" y="36" fontSize="13" textAnchor="end" fill="#5b6473">m=+1</text>
            <text x="534" y="44" fontSize="14" fontWeight="600" fill="#1b2330">J_a</text>
            {/* lower manifold J_b = 1 */}
            <line x1="60" y1="240" x2="200" y2="240" stroke="#334155" strokeWidth="3" />
            <line x1="220" y1="240" x2="360" y2="240" stroke="#334155" strokeWidth="3" />
            <line x1="380" y1="240" x2="520" y2="240" stroke="#334155" strokeWidth="3" />
            <text x="55" y="244" fontSize="13" textAnchor="end" fill="#5b6473">m=−1</text>
            <text x="365" y="256" fontSize="13" textAnchor="middle" fill="#5b6473">m=0</text>
            <text x="475" y="256" fontSize="13" textAnchor="middle" fill="#5b6473">m=+1</text>
            <text x="534" y="244" fontSize="14" fontWeight="600" fill="#1b2330">J_b</text>
            {/* Delta m = +1 transitions (e+) : m_b -> m_b+1, drawn in indigo */}
            <line x1="130" y1="240" x2="290" y2="55" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#arrUp)" />
            <line x1="290" y1="240" x2="450" y2="40" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#arrUp)" />
            {/* Delta m = -1 transitions (e-) : m_b -> m_b-1, drawn in rose */}
            <line x1="290" y1="240" x2="130" y2="70" stroke="#e11d48" strokeWidth="2.2" markerEnd="url(#arrUp2)" />
            <line x1="450" y1="240" x2="290" y2="55" stroke="#e11d48" strokeWidth="2.2" markerEnd="url(#arrUp2)" />
            <defs>
              <marker id="arrUp" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
                <path d="M0,0 L9,4.5 L0,9 z" fill="#4f46e5" />
              </marker>
              <marker id="arrUp2" markerWidth="9" markerHeight="9" refX="5" refY="4.5" orient="auto">
                <path d="M0,0 L9,4.5 L0,9 z" fill="#e11d48" />
              </marker>
            </defs>
            <rect x="60" y="278" width="16" height="10" fill="#4f46e5" />
            <text x="82" y="287" fontSize="13" fill="#1b2330">ê₊ : Δm = +1</text>
            <rect x="250" y="278" width="16" height="10" fill="#e11d48" />
            <text x="272" y="287" fontSize="13" fill="#1b2330">ê₋ : Δm = −1</text>
          </svg>
        </Figure>

        <Derivation title="Why two modes, and the two competing 'natural' bases">
          <Step title="Two transverse degrees of freedom → two oscillators">
            Allowing the field two transverse components means the single cavity resonance splits into two physical
            oscillators distinguished by polarization. This is a faithful generalization of the scalar single-mode theory
            of earlier chapters — and the resulting self-consistency equations turn out to be{" "}
            <em>formally identical</em> to the two-mode ring-laser equations (11.13)–(11.16), with the two circular
            polarizations playing the role of the two counter-running waves.
          </Step>
          <Step title="Circular vs linear: the irreducible conflict">
            The atomic medium — Zeeman sublevels driven by <Tex>{String.raw`\Delta m = \pm 1`}</Tex> — is naturally
            diagonal in the circular basis <Tex>{String.raw`\hat{\mathbf e}_\pm`}</Tex>. But cavity{" "}
            <em>anisotropy</em> (different mirror/window losses along <Tex>{String.raw`x`}</Tex> and{" "}
            <Tex>{String.raw`y`}</Tex>) is naturally diagonal in the linear basis{" "}
            <Tex>{String.raw`\hat{\mathbf x},\hat{\mathbf y}`}</Tex>. The two are related by a unitary transformation.
            Whoever&rsquo;s diagonal structure dominates decides whether the laser output is circular or linear — that is
            the whole story.
          </Step>
        </Derivation>
      </Section>

      <Section title="Field self-consistency and cavity anisotropy (Sec. 12-1)">
        <Intuition>
          Now build the equations the field must obey. Maxwell&rsquo;s wave equation, generalized so the cavity loss is a{" "}
          <em>tensor</em> (an anisotropic conductivity), is projected onto the two circular components. The decisive
          physics lives in the <strong>loss matrix</strong>. An isotropic cavity would be diagonal in the circular basis
          and the two modes would be independent. But a real cavity has different <Tex>{String.raw`Q`}</Tex> along{" "}
          <Tex>{String.raw`x`}</Tex> and <Tex>{String.raw`y`}</Tex>. Transforming that diagonal linear loss into the
          circular basis produces <em>off-diagonal</em> elements — a term that mixes <Tex>{String.raw`E_+`}</Tex> and{" "}
          <Tex>{String.raw`E_-`}</Tex>, locks them to a common frequency, and pushes the output toward a linear
          polarization. The Zeeman splitting fights it.
        </Intuition>
        <p>The starting point is the vector wave equation with a conductivity tensor carrying the cavity loss:</p>
        <EqBlock label="2">{String.raw`-\frac{\partial^2 \mathbf E}{\partial z^2} + \mu_0\,\overleftrightarrow{\sigma}\,\frac{\partial \mathbf E}{\partial t} + \mu_0\varepsilon_0\,\frac{\partial^2 \mathbf E}{\partial t^2} = -\mu_0\,\frac{\partial^2 \mathbf P}{\partial t^2},`}</EqBlock>
        <EqBlock label="3">{String.raw`\mathbf J = \overleftrightarrow{\sigma}\cdot\mathbf E.`}</EqBlock>
        <p>
          Equation&nbsp;(3) is the constitutive relation: the loss current is the conductivity tensor contracted with
          the field; anisotropic loss means <Tex>{String.raw`\overleftrightarrow{\sigma}`}</Tex> is not proportional to
          the identity. The induced polarization is decomposed into the same two circular components as the field:
        </p>
        <EqBlock label="4">{String.raw`\mathbf P(z,t) = \tfrac{1}{2}\big\{\hat{\mathbf e}_+ \mathscr P_+(t)\,e^{-i(\nu_+ t + \phi_+)} + \hat{\mathbf e}_- \mathscr P_-(t)\,e^{-i(\nu_- t + \phi_-)}\big\}\,U(z) + \text{c.c.}`}</EqBlock>
        <p>
          Projecting the wave equation onto <Tex>{String.raw`\hat{\mathbf e}_+`}</Tex> (and likewise{" "}
          <Tex>{String.raw`\hat{\mathbf e}_-`}</Tex>, by interchanging <Tex>{String.raw`+`}</Tex> and{" "}
          <Tex>{String.raw`-`}</Tex>) gives the complex self-consistency equation. It combines frequency pulling, the
          diagonal cavity loss, the off-diagonal anisotropy coupling <Tex>{String.raw`g_{+-}E_-`}</Tex>, and the driving
          by the medium polarization:
        </p>
        <EqBlock label="5">{String.raw`(\nu_+ + \dot\phi_+ - \Omega)E_+ + i\big(\tfrac{1}{2}E_+ + \tfrac{1}{2}g_{+-}E_-\big) = -\tfrac{1}{2}\frac{\nu}{\varepsilon_0}\,\mathscr P_+.`}</EqBlock>
        <p>
          To organize the bookkeeping we introduce the frequency dyadic, diagonal in the circular basis, and the loss
          (conductivity) matrix:
        </p>
        <EqBlock label="6">{String.raw`\overleftrightarrow{\mathscr V} = \nu_+\,\hat{\mathbf e}_+\hat{\mathbf e}_+ + \nu_-\,\hat{\mathbf e}_-\hat{\mathbf e}_-,`}</EqBlock>
        <EqBlock label="7">{String.raw`G = \begin{pmatrix} g_{++} & g_{+-} \\ g_{-+} & g_{--} \end{pmatrix} = (\nu\mu_0)^{-1}\,\overleftrightarrow{\sigma},\qquad \tfrac{1}{2}\nu \cong \nu_+ \cong \nu_-,`}</EqBlock>
        <EqBlock label="8">{String.raw`g_{\pm\pm} = Q_\pm^{-1},\qquad g_{+-} = g_{-+}^{\,*}.`}</EqBlock>
        <p>
          The diagonal elements are inverse cavity <Tex>{String.raw`Q`}</Tex>&rsquo;s; the off-diagonal elements form a
          Hermitian pair. Taking real and imaginary parts of Eq.&nbsp;(5) splits it into a pair of real equations — an{" "}
          <strong>amplitude</strong> equation (gain, saturation, and anisotropic coupling) and a{" "}
          <strong>frequency</strong> equation (pulling), with <Tex>{String.raw`\Psi`}</Tex> the relative phase:
        </p>
        <EqBlock label="9">{String.raw`\dot E_\pm + \tfrac{1}{2}\nu\big(g_{\pm\pm}E_\pm + \mathrm{Im}[\,g_{\pm\mp}E_\mp\,e^{i\Psi}\,]\big) = -\tfrac{1}{2}\frac{\nu}{\varepsilon_0}\,\mathrm{Im}(\mathscr P_\pm),`}</EqBlock>
        <EqBlock label="10">{String.raw`(\nu_\pm + \dot\phi_\pm - \Omega)E_\pm + \tfrac{1}{2}\nu\,\mathrm{Re}[\,g_{\pm\mp}E_\mp\,e^{i\Psi}\,] = -\tfrac{1}{2}\frac{\nu}{\varepsilon_0}\,\mathrm{Re}(\mathscr P_\pm).`}</EqBlock>
        <p>
          The imaginary part of the polarization supplies gain and saturation; the real part supplies dispersion and
          pulling. Setting the off-diagonal coupling to zero (an <em>isotropic</em> cavity) decouples the two circular
          modes entirely — they become two independent lasers:
        </p>
        <EqBlock label="11">{String.raw`\dot E_\pm + \tfrac{1}{2}\frac{\nu}{Q_\pm}E_\pm = -\tfrac{1}{2}\frac{\nu}{\varepsilon_0}\,\mathrm{Im}(\mathscr P_\pm),`}</EqBlock>
        <EqBlock label="12">{String.raw`\nu_\pm + \dot\phi_\pm = \Omega = -\tfrac{1}{2}\frac{\nu}{\varepsilon_0}\frac{1}{E_\pm}\,\mathrm{Re}(\mathscr P_\pm).`}</EqBlock>

        <p>
          The decisive question is what a physically realistic cavity does to the off-diagonal elements. The cavity is
          diagonal in the <em>linear</em> basis, with eigenvalues <Tex>{String.raw`1/Q_x`}</Tex> and{" "}
          <Tex>{String.raw`1/Q_y`}</Tex>; transform that to the circular basis with the unitary matrix{" "}
          <Tex>{String.raw`S`}</Tex>:
        </p>
        <EqBlock label="14">{String.raw`(G)_\pm = S\,(G)_{xy}\,S^{-1},`}</EqBlock>
        <EqBlock label="15">{String.raw`S = \tfrac{1}{2}\sqrt{2}\begin{pmatrix} 1 & -i \\ 1 & i \end{pmatrix}.`}</EqBlock>
        <p>The result is the conceptual heart of the cavity side of the chapter:</p>
        <KeyResult
          number="16"
          eq={String.raw`(G)_\pm = \tfrac{1}{2}\begin{pmatrix} 1/Q_x + 1/Q_y & 1/Q_x - 1/Q_y \\ 1/Q_x - 1/Q_y & 1/Q_x + 1/Q_y \end{pmatrix}`}
          label="Linear loss → circular coupling"
          note={
            <>
              A purely diagonal linear loss with different <Tex>{String.raw`Q_x, Q_y`}</Tex> produces, in the circular
              basis, an off-diagonal coupling. Equal <Tex>{String.raw`Q_x = Q_y`}</Tex> kills it.
            </>
          }
        />
        <KeyResult
          number="17"
          eq={String.raw`g_{+-} = g_{-+} = \frac{1}{Q_x} - \frac{1}{Q_y}`}
          label="The anisotropy coupling coefficient"
          note={
            <>
              The single number that controls the linear-vs-circular competition on the cavity side. If{" "}
              <Tex>{String.raw`Q_x = Q_y`}</Tex> the circular modes are independent and the relative phase{" "}
              <Tex>{String.raw`\Psi`}</Tex> alone decides whether they lock.
            </>
          }
        />

        <Derivation title="From the vector wave equation to the loss-matrix coupling">
          <Step title="Project onto each circular component">
            Insert the two-component field&nbsp;(1) and polarization&nbsp;(4) into the vector wave equation&nbsp;(2).
            Using the slowly-varying-envelope approximation and projecting onto{" "}
            <Tex>{String.raw`\hat{\mathbf e}_+`}</Tex> and <Tex>{String.raw`\hat{\mathbf e}_-`}</Tex> separately yields
            the four real self-consistency equations: amplitude equations&nbsp;(9) driven by{" "}
            <Tex>{String.raw`\mathrm{Im}(\mathscr P_\pm)`}</Tex> and frequency equations&nbsp;(10) driven by{" "}
            <Tex>{String.raw`\mathrm{Re}(\mathscr P_\pm)`}</Tex>. The conductivity tensor becomes the{" "}
            <Tex>{String.raw`2\times2`}</Tex> loss matrix <Tex>{String.raw`G`}</Tex>&nbsp;(7).
          </Step>
          <Step title="Separate diagonal from off-diagonal loss">
            For a diagonal loss matrix (isotropic cavity, <Tex>{String.raw`g_{+-}=0`}</Tex>) the equations reduce to the
            decoupled forms&nbsp;(11)–(12): two independent circular lasers. The off-diagonal{" "}
            <Tex>{String.raw`g_{+-}`}</Tex> terms in&nbsp;(9)–(10) are the <em>only</em> thing that couples the
            polarizations through the cavity.
          </Step>
          <Step title="Transform the physical anisotropy into the circular basis">
            The cavity&rsquo;s physical anisotropy (Brewster window, mirror coatings) is diagonal in{" "}
            <Tex>{String.raw`x`}</Tex>–<Tex>{String.raw`y`}</Tex> with eigenvalues{" "}
            <Tex>{String.raw`1/Q_x, 1/Q_y`}</Tex>. The similarity transform&nbsp;(14) with <Tex>{String.raw`S`}</Tex>{" "}
            (15) gives the diagonal average loss <Tex>{String.raw`\tfrac12(1/Q_x+1/Q_y)`}</Tex> <em>plus</em> the
            off-diagonal coupling <Tex>{String.raw`\tfrac12(1/Q_x-1/Q_y)`}</Tex>&nbsp;(16), i.e. the coupling
            coefficient <Tex>{String.raw`g_{+-}`}</Tex>&nbsp;(17). This proves anisotropy <Tex>{String.raw`\leftrightarrow`}</Tex> coupling.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Anisotropy = coupling">
          A laser cavity that is diagonal (lossy) in the linear <Tex>{String.raw`x`}</Tex>–<Tex>{String.raw`y`}</Tex>{" "}
          basis is off-diagonal (coupling) in the circular basis, and vice versa. There is{" "}
          <em>no basis in which both</em> the atomic Zeeman response and the cavity anisotropy are simultaneously
          diagonal — that irreducible conflict <strong>is</strong> the Zeeman laser.
        </Callout>
      </Section>

      <Section title="Atomic polarization: angular momentum and Zeeman sublevels (Sec. 12-2)">
        <Intuition>
          Now the medium side. The atoms are no longer two-level scalars: each laser level carries angular momentum,{" "}
          <Tex>{String.raw`J_a`}</Tex> for the upper level and <Tex>{String.raw`J_b`}</Tex> for the lower, with magnetic
          sublevels labeled by <Tex>{String.raw`m_a`}</Tex> and <Tex>{String.raw`m_b`}</Tex>. The dc field{" "}
          <Tex>{String.raw`B`}</Tex> Zeeman-splits each level. Circularly polarized light then enforces electric-dipole
          selection rules: <Tex>{String.raw`\hat{\mathbf e}_+`}</Tex> drives{" "}
          <Tex>{String.raw`\Delta m = m_a - m_b = +1`}</Tex>, <Tex>{String.raw`\hat{\mathbf e}_-`}</Tex> drives{" "}
          <Tex>{String.raw`\Delta m = -1`}</Tex>. The two circular field components address <em>physically different</em>{" "}
          pairs of sublevels, whose transition frequencies shift oppositely with the field. The strength of each
          sublevel transition is a Clebsch–Gordan factor — and those weights eventually fix the coupling parameter{" "}
          <Tex>{String.raw`C`}</Tex>.
        </Intuition>
        <p>Add the magnetic interaction to the atomic Hamiltonian. Each sublevel shifts in proportion to its{" "}
          <Tex>{String.raw`m`}</Tex>:
        </p>
        <KeyResult
          number="18"
          eq={String.raw`\omega_a = \omega_0 + \mu_B B\,g_a/\hbar,\qquad \omega_b = \omega_0 + \mu_B B\,g_b/\hbar`}
          label="Zeeman-split sublevel frequencies"
          note={
            <>
              <Tex>{String.raw`\omega_0`}</Tex> is the zero-field transition frequency, <Tex>{String.raw`\mu_B`}</Tex>{" "}
              the Bohr magneton, and <Tex>{String.raw`g_a, g_b`}</Tex> the Landé <Tex>{String.raw`g`}</Tex>-factors.
              Because upper and lower levels generally have different <Tex>{String.raw`g`}</Tex>, the{" "}
              <Tex>{String.raw`+`}</Tex> and <Tex>{String.raw`-`}</Tex> transitions shift by different amounts.
            </>
          }
        />
        <p>
          The electric-dipole matrix element between an upper sublevel and a lower sublevel is the engine of all
          coupling:
        </p>
        <EqBlock label="19">{String.raw`\mathscr P_{a'b'} = -e\,\langle a' | \mathbf r | b' \rangle = -e\int d\mathbf r\,\mathrm{Tr}(\rho\,e\mathbf r).`}</EqBlock>
        <p>
          Writing the position operator in spherical form exposes the combinations <Tex>{String.raw`x \pm i y`}</Tex>{" "}
          that carry <Tex>{String.raw`\pm 1`}</Tex> unit of angular momentum:
        </p>
        <EqBlock label="20">{String.raw`\mathbf r = x\hat{\mathbf x} + y\hat{\mathbf y} + z\hat{\mathbf z} = r\sin\theta\,(\cos\phi\,\hat{\mathbf x} + \sin\phi\,\hat{\mathbf y}) + r\cos\theta\,\hat{\mathbf z}.`}</EqBlock>
        <p>Resolving the dipole into its three polarization components gives the selection rules directly:</p>
        <EqBlock label="21">{String.raw`(e\mathbf r)_{a'b'} = \boldsymbol{\wp}_{a'b'}\big[(\hat{\mathbf x}-i\hat{\mathbf y})\,\delta_{m_a,\,m_b+1} + (\hat{\mathbf x}+i\hat{\mathbf y})\,\delta_{m_a,\,m_b-1} + \hat{\mathbf z}\,\delta_{m_a,\,m_b}\big].`}</EqBlock>
        <p>
          The <Tex>{String.raw`(\hat{\mathbf x}\mp i\hat{\mathbf y})`}</Tex> parts couple to{" "}
          <Tex>{String.raw`\Delta m = \pm 1`}</Tex> (circular light) and the <Tex>{String.raw`\hat{\mathbf z}`}</Tex>{" "}
          part to <Tex>{String.raw`\Delta m = 0`}</Tex> (linear axial light); for an axial field and transverse light only
          the <Tex>{String.raw`\Delta m = \pm 1`}</Tex> terms drive the laser. Rewritten in the circular basis with the
          radial reduced matrix element <Tex>{String.raw`\boldsymbol{\wp}`}</Tex>:
        </p>
        <EqBlock label="22">{String.raw`\boldsymbol{\wp}_{a'b'} = \wp\big[(J-l)\,\delta_{m_a,\,m_b+1}\,\hat{\mathbf e}_- + (J+l)\,\delta_{m_a,\,m_b-1}\,\hat{\mathbf e}_+ + \delta_{m_a m_b}\,\hat{\mathbf z}\big].`}</EqBlock>
        <p>
          The actual numbers are the Clebsch–Gordan angular factors. For the <Tex>{String.raw`J_a = J_b`}</Tex> case
          (Condon–Shortley convention):
        </p>
        <EqBlock label="23">{String.raw`\wp_{a'b'} = \begin{cases} \tfrac{1}{2}\wp\,[(J_a + m')(J_a + m' + 1)]^{1/2}, & a'=b'+1 \\[1ex] \wp\,m', & a'=b' \\[1ex] \tfrac{1}{2}\wp\,[(J_a - m')(J_a - m' + 1)]^{1/2}, & a'=b'-1 \end{cases}`}</EqBlock>
        <EqBlock label="24">{String.raw`\boldsymbol{\wp} = (\hat{\mathbf e}_a\,|e r|\,\hat{\mathbf e}_b)\quad\text{(reduced radial matrix element, common to all sublevels).}`}</EqBlock>
        <p>
          The square-root angular factors weight each sublevel transition; their pattern over{" "}
          <Tex>{String.raw`m'`}</Tex> determines the angular sums in the gain and the coupling. Inserting the circular
          field and the resolved dipole into the rotating-wave interaction energy hard-wires the selection rule into the
          dynamics:
        </p>
        <EqBlock label="25">{String.raw`\mathscr V_{a'b'} = -\tfrac{1}{2}\sqrt 2\,\boldsymbol{\wp}_{a'b'}\,U(z)\big\{E_+\,e^{-i(\nu_+ t + \phi_+)}\,\delta_{m_a,\,m_b-1} + E_-\,e^{-i(\nu_- t + \phi_-)}\,\delta_{m_a,\,m_b+1}\big\}.`}</EqBlock>
        <p>
          The macroscopic circular polarization is the velocity integral and sublevel sum of the off-diagonal
          density-matrix elements (optical coherences) weighted by their dipole strengths:
        </p>
        <EqBlock label="26–27">{String.raw`P_\pm(z,t) = \int_{-\infty}^{\infty} d\mathbf v\,\mathrm{Tr}(\rho\,e\mathbf r) = \sqrt 2\int_{-\infty}^{\infty} d\mathbf v\,\sum_{a'}\sum_{b'}\boldsymbol{\wp}_{a'b'}\,\rho_{a'b'}\,\delta_{\Delta m,\,\pm1},`}</EqBlock>
        <EqBlock label="28">{String.raw`\mathscr P_\pm(t) = 2\sqrt 2\,e^{i(\nu_\pm t + \phi_\pm)}\,\frac{1}{N}\frac{1}{\hbar}\int dt'\,U^*(z)\int d\mathbf v\,\sum_{a'}\sum_{b'}\boldsymbol{\wp}_{a'b'}\,\boldsymbol{\wp}_{a'b'}\,\rho_{a'b'}.`}</EqBlock>
        <p>
          Its real part will give mode pulling and its imaginary part gain/saturation when inserted into
          Eqs.&nbsp;(9)–(10). The double sum over sublevels with squared dipole weights is exactly where the{" "}
          <Tex>{String.raw`J`}</Tex>-dependence of the coupling enters. The density matrix itself carries populations
          (diagonal) and coherences (off-diagonal):
        </p>
        <EqBlock label="29">{String.raw`\rho = \begin{pmatrix} \rho_{a'a'} & \rho_{a'b'} & \rho_{a'b} \\ \rho_{b'a'} & \rho_{b'b'} & \rho_{b'b} \\ \rho_{ba'} & \rho_{bb'} & \rho_{bb} \end{pmatrix}.`}</EqBlock>

        <Derivation title="Set up the multilevel polarization">
          <Step title="Zeeman-split the bare Hamiltonian">
            Add <Tex>{String.raw`-\boldsymbol\mu\cdot\mathbf B`}</Tex> to the atomic Hamiltonian. Each level splits into{" "}
            <Tex>{String.raw`2J+1`}</Tex> equally spaced sublevels separated by <Tex>{String.raw`g\mu_B B/\hbar`}</Tex>,
            giving the sublevel frequencies&nbsp;(18). Unequal upper/lower <Tex>{String.raw`g`}</Tex>-factors make the{" "}
            <Tex>{String.raw`+\Delta m`}</Tex> and <Tex>{String.raw`-\Delta m`}</Tex> transitions shift differently — the
            medium asymmetry that distinguishes <Tex>{String.raw`\hat{\mathbf e}_+`}</Tex> from{" "}
            <Tex>{String.raw`\hat{\mathbf e}_-`}</Tex>.
          </Step>
          <Step title="Resolve the dipole and apply the selection rules">
            Write <Tex>{String.raw`\mathbf r`}</Tex> in the <Tex>{String.raw`(\hat{\mathbf x}\pm i\hat{\mathbf y},\hat{\mathbf z})`}</Tex>{" "}
            combinations&nbsp;(20)–(21). For an axial magnetic field and transverse light only the{" "}
            <Tex>{String.raw`\Delta m=\pm1`}</Tex> terms survive: <Tex>{String.raw`\hat{\mathbf e}_+ \leftrightarrow \Delta m=+1`}</Tex>,{" "}
            <Tex>{String.raw`\hat{\mathbf e}_- \leftrightarrow \Delta m=-1`}</Tex>. Each surviving element carries a
            Clebsch–Gordan factor&nbsp;(23)–(24). These <Tex>{String.raw`J`}</Tex>-case-dependent angular sums are
            exactly what later produce <Tex>{String.raw`C`}</Tex>.
          </Step>
          <Step title="Build the interaction and the polarization">
            Insert the circular field&nbsp;(1) and the resolved dipole into the RWA interaction&nbsp;(25). The
            macroscopic polarization is the velocity-integrated, sublevel-summed coherence&nbsp;(26)–(28). The problem is
            now structured exactly like the scalar two-level theory but with sublevel bookkeeping; the next section
            solves the density-matrix equations of motion to the needed order.
          </Step>
        </Derivation>
      </Section>

      <Section title="Density-matrix equations and the perturbative polarization">
        <Intuition>
          Solve for the coherences <Tex>{String.raw`\rho_{a'b'}`}</Tex> that feed the polarization, using the same
          perturbation expansion in the field amplitude as the rest of the book — now generalized to sublevels.{" "}
          <strong>First order</strong> in the field gives the <em>linear gain</em>: a Doppler-broadened Lorentzian gain
          curve for each circular polarization, centered at its own Zeeman-shifted frequency.{" "}
          <strong>Third order</strong> gives the <em>saturation</em>: how each circular mode burns its own gain
          (self-saturation) and how it depletes the gain available to the <em>other</em> mode (cross-saturation). The
          recipe is the universal one: 1st order → gain, 3rd order → competition.
        </Intuition>
        <p>
          The optical coherence obeys a master equation — free precession at the Zeeman-shifted frequency, decay, and
          field driving:
        </p>
        <EqBlock label="35">{String.raw`\dot\rho_{a'b'} = -(i\omega_{a'b'} + \gamma)\,\rho_{a'b'} + i\hbar^{-1}\big(\mathscr V_{a'a}\rho_{ab'} - \rho_{a'b}\mathscr V_{bb'}\big) + i\hbar^{-1}\mathscr V_{a'b'}\,\mathscr V_{ab},`}</EqBlock>
        <EqBlock label="36–37">{String.raw`\dot\rho_{a'a} = -\gamma_a\rho_{a'a} - i\hbar^{-1}(\mathscr V_{a'b}\rho_{ba} - \rho_{a'b}\mathscr V_{ba}) + \text{c.c.} + \lambda_a,`}</EqBlock>
        <p>with the Hermiticity relations that halve the bookkeeping:</p>
        <EqBlock label="39–40">{String.raw`\rho_{a'b'} = \rho_{b'a'}^{\,*},\qquad \rho_{a'a'} = \rho_{a'a'}^{\,*}.`}</EqBlock>
        <p>
          Iterating once in the field gives the first-order (linear) polarization — gain proportional to the population
          difference <Tex>{String.raw`\bar N`}</Tex> and to the Lorentzian–Gaussian lineshape{" "}
          <Tex>{String.raw`Z_i`}</Tex> evaluated at the detuning from the Zeeman-shifted center:
        </p>
        <KeyResult
          number="41"
          eq={String.raw`\mathscr P_\pm^{(1)}(t) = i\,\frac{\wp^2}{\hbar}\,\bar N E_\pm\,Z_i\!\big[\gamma_{ab} + i(\omega_{ab} - \nu_\pm)\big]`}
          label="First-order (linear) polarization → gain"
          note={
            <>
              The imaginary part is the linear gain; the real part is the linear pulling. Each circular mode sees its{" "}
              <em>own</em> detuned gain curve, centered at <Tex>{String.raw`\omega_{ab}`}</Tex> shifted by the Zeeman
              splitting.
            </>
          }
        />
        <p>
          Iterating to third order produces the self- and cross-saturation. The combination frequency{" "}
          <Tex>{String.raw`\omega`}</Tex> and the magnetic splitting <Tex>{String.raw`\delta`}</Tex> appear here:
        </p>
        <EqBlock label="42">{String.raw`\mathscr P_\pm^{(3)}(t) = \tfrac{1}{2}i\,\wp^4\hbar^{-3}\bar N\,(E_\pm)^2 E_\pm\Big\{2\mathscr L(\gamma)\gamma\big[1 + \gamma\mathscr D(\omega_\pm - \nu_\pm)\big] + \mathscr D_\beta\big[\mathscr D(\delta) + \mathscr D(\omega_\pm - \nu_\pm)\big] + \mathscr D_\theta\big[2\mathscr D(\delta) + \mathscr D(\omega_\mp - \nu_\mp)\big]\Big\}.`}</EqBlock>
        <KeyResult
          number="42′"
          eq={String.raw`\delta = \tfrac{1}{2}(\omega_+ - \omega_-) \;\propto\; \mu_B B/\hbar,\qquad \omega = \tfrac{1}{2}(\omega_+ + \omega_-)`}
          label="The magnetic tuning parameter"
          note={
            <>
              <Tex>{String.raw`\delta`}</Tex> is the half-difference of the two circular line centers, linear in{" "}
              <Tex>{String.raw`B`}</Tex> — the knob the magnetic field turns. <Tex>{String.raw`B=0`}</Tex> means{" "}
              <Tex>{String.raw`\delta=0`}</Tex> and the two gain curves coincide.
            </>
          }
        />

        <Derivation title="Perturbation to first and third order">
          <Step title="Master equation with pump, decay, and Zeeman precession">
            The coherences obey&nbsp;(35) and the populations&nbsp;(36)–(37): free evolution at the Zeeman-shifted
            frequencies, phenomenological decay at <Tex>{String.raw`\gamma_a,\gamma_b,\gamma_{ab}`}</Tex>, pumping{" "}
            <Tex>{String.raw`\lambda`}</Tex>, and field coupling. Hermiticity&nbsp;(39)–(40) reduces the independent
            unknowns.
          </Step>
          <Step title="First order: linear gain per circular polarization">
            One iteration drives each circular mode&rsquo;s coherence at its own frequency, producing the linear
            polarization&nbsp;(41): a Doppler-broadened Lorentzian centered at the Zeeman-<em>shifted</em> line. Because
            the <Tex>{String.raw`+`}</Tex> and <Tex>{String.raw`-`}</Tex> centers are split by{" "}
            <Tex>{String.raw`2\delta`}</Tex>, the two gain curves are displaced — the microscopic origin of magnetic
            tuning.
          </Step>
          <Step title="Third order: self- and cross-saturation">
            A third iteration splits&nbsp;(42) into self-saturation (a mode burns its own hole) and cross-saturation (a
            mode depletes the partner&rsquo;s gain, strongest when the two velocity classes overlap near{" "}
            <Tex>{String.raw`\delta=0`}</Tex>). The splitting <Tex>{String.raw`\delta`}</Tex> controls the overlap. These
            coefficients are tabulated as <Tex>{String.raw`\alpha,\beta,\theta`}</Tex> (gain/saturation) and{" "}
            <Tex>{String.raw`\sigma,\rho,\tau`}</Tex> (pulling) in Tables&nbsp;12-1 and&nbsp;12-2.
          </Step>
        </Derivation>

        <Callout kind="warning" title="Equations (35)–(42) are structurally transcribed">
          The sublevel index gymnastics in&nbsp;(35)–(42) are dense in the source. The LaTeX here captures the correct{" "}
          <em>structure</em> — free precession <Tex>{String.raw`+`}</Tex> decay <Tex>{String.raw`+`}</Tex> drive; 1st
          order = gain; 3rd order = self <Tex>{String.raw`+`}</Tex> cross saturation with parameters{" "}
          <Tex>{String.raw`\delta,\omega`}</Tex> — rather than every sublevel subscript. The physically load-bearing
          outputs are the closed-form coefficients of Tables&nbsp;12-1/12-2 and the steady-state equations&nbsp;(43)–(48),
          which are exact.
        </Callout>
      </Section>

      <Section title="Steady-state intensities, frequencies, and the saturation coefficients (Sec. 12-3)">
        <Intuition>
          Combine the first-order gain&nbsp;(41) and third-order saturation&nbsp;(42) with the field self-consistency
          equations&nbsp;(11)–(12). In steady state you get the headline pair: an <strong>intensity</strong> equation and
          a <strong>frequency</strong> equation for each circular polarization. The intensity equation reads:{" "}
          <em>net gain = linear gain</em> <Tex>{String.raw`\alpha`}</Tex> <em>minus self-saturation</em>{" "}
          <Tex>{String.raw`\beta I`}</Tex> <em>minus cross-saturation</em> <Tex>{String.raw`\theta`}</Tex> times the{" "}
          <em>other</em> mode&rsquo;s intensity. This is the Chapter-XI two-mode rate-equation pair, now for circular
          polarizations.
        </Intuition>
        <KeyResult
          number="43"
          eq={String.raw`\dot I_\pm = 2 I_\pm\big(\alpha_\pm - \beta_\pm I_\pm - \theta_{\pm\mp} I_\mp\big)`}
          label="Steady-state intensity equations"
          note={
            <>
              For each circular polarization the linear gain <Tex>{String.raw`\alpha_\pm`}</Tex> is balanced by
              self-saturation <Tex>{String.raw`\beta_\pm I_\pm`}</Tex> and cross-saturation{" "}
              <Tex>{String.raw`\theta_{\pm\mp} I_\mp`}</Tex> from the other mode. Steady state is{" "}
              <Tex>{String.raw`\dot I_\pm = 0`}</Tex>. Identical in form to the ring-laser two-mode equations.
            </>
          }
        />
        <KeyResult
          number="44"
          eq={String.raw`\nu_\pm + \dot\phi_\pm = \Omega = \sigma_\pm - \rho_\pm I_\pm - \tau_{\pm\mp} I_\mp`}
          label="Steady-state frequency equations"
          note={
            <>
              The operating frequency of each circular mode equals the pulled passive value plus linear pulling{" "}
              <Tex>{String.raw`\sigma_\pm`}</Tex>, self-pushing <Tex>{String.raw`\rho_\pm I_\pm`}</Tex>, and
              cross-pushing <Tex>{String.raw`\tau_{\pm\mp} I_\mp`}</Tex>. The frequency difference{" "}
              <Tex>{String.raw`\nu_+ - \nu_-`}</Tex> is the measured beat note.
            </>
          }
        />
        <p>
          The coefficients are explicit functions of the cavity detuning and the Zeeman splitting{" "}
          <Tex>{String.raw`\delta\propto\mu_B B`}</Tex>. The self-saturation and cross-saturation are angular
          (Clebsch–Gordan) sums of dipole products weighted by a lineshape:
        </p>
        <EqBlock label="45">{String.raw`\beta_\pm = \big[1 + \mathscr L(\omega_a - \nu_\pm)\big]\,F_\beta\!\sum_{a'}\sum_{a',\,a'+1}|\wp_{a'a'}|^4 \;+\;\cdots\quad\text{(self-saturation).}`}</EqBlock>
        <EqBlock label="46">{String.raw`\theta_{\pm\mp} = \big[1 + \mathscr L(\omega_a - \nu_\mp)\big]\,F_\theta\!\sum_{a'}\sum_{a',\,a'+1}|\wp_{a'a'}|^2|\wp_{a'a'+1}|^2 + |\wp_{a'a'+1}|^4 + \cdots\quad\text{(cross-saturation).}`}</EqBlock>
        <p>
          The linear net gain is the Zeeman-detuned, Doppler-broadened gain minus the cavity loss; the frequency
          coefficients are the pulling/pushing terms:
        </p>
        <EqBlock label="Table 12-1, α">{String.raw`\alpha_\pm = F_\alpha\,\tfrac{1}{2}\sum_{a'}\sum_{a',\,a'+1}|\wp_{a'a'+1}|^2\,\mathrm{Im}\big\{Z_i[\gamma_{ab} + i(\omega_{a'b'} - \nu_\pm)]\big\} - \frac{\nu}{2Q_\pm}.`}</EqBlock>
        <EqBlock label="Tables 12-1/2">{String.raw`\sigma_\pm,\ \rho_\pm,\ \tau_{\pm\mp}\;=\;\text{linear-pulling, self-pushing, cross-pushing coefficients}\;\big(\text{functions of }\omega_{a'b'} - \nu_\pm,\ \delta\big).`}</EqBlock>

        <Derivation title="From the field equations to the two-mode rate equations">
          <Step title="Insert the polarization and impose steady state">
            Take the amplitude self-consistency&nbsp;(11) and substitute{" "}
            <Tex>{String.raw`\mathrm{Im}(\mathscr P_\pm) = \mathrm{Im}(\mathscr P_\pm^{(1)} + \mathscr P_\pm^{(3)})`}</Tex>.
            Converting amplitudes to intensities <Tex>{String.raw`I_\pm \propto E_\pm^2`}</Tex> gives the intensity
            equations&nbsp;(43) with <Tex>{String.raw`\alpha_\pm`}</Tex> from the linear term and{" "}
            <Tex>{String.raw`\beta_\pm,\theta_{\pm\mp}`}</Tex> from the third-order self/cross terms. The frequency
            equations&nbsp;(44) come identically from the dispersive (real) part via&nbsp;(12).
          </Step>
          <Step title="Read off the coefficients as functions of B">
            <Tex>{String.raw`\alpha_\pm,\beta_\pm,\theta_{\pm\mp},\sigma_\pm,\rho_\pm,\tau_{\pm\mp}`}</Tex> are the
            closed-form coefficients. Table&nbsp;12-1 gives the Doppler limit; Table&nbsp;12-2 the general case. Each is
            an angular (Clebsch–Gordan) sum times a lineshape function of the detuning{" "}
            <Tex>{String.raw`(\omega_{a'b'}-\nu_\pm)`}</Tex> and the Zeeman splitting <Tex>{String.raw`\delta`}</Tex>.
            These are the formulas the simulator evaluates as functions of <Tex>{String.raw`B`}</Tex>;{" "}
            <Tex>{String.raw`\beta`}</Tex> is self-saturation, <Tex>{String.raw`\theta`}</Tex> is cross-saturation, and
            the <Tex>{String.raw`J`}</Tex>-transition enters through the angular sums.
          </Step>
        </Derivation>

        <Callout kind="insight" title="This IS the ring laser of Chapter XI">
          Equations&nbsp;(43)–(44) are the two-mode amplitude/frequency equations the text promised would be{" "}
          &ldquo;formally identical to (11.13)–(11.16).&rdquo; Circular polarizations{" "}
          <Tex>{String.raw`\leftrightarrow`}</Tex> counter-running waves; self/cross saturation{" "}
          <Tex>{String.raw`\leftrightarrow`}</Tex> the ring&rsquo;s spatial-hole and cross terms. Everything you learned
          about two-mode competition transfers directly.
        </Callout>
      </Section>

      <Section title="Magnetic tuning: the coupling parameter C, locking, and bistability">
        <Intuition>
          This is the payoff. The competition between two saturating modes is controlled by a single dimensionless{" "}
          <strong>coupling parameter</strong> <Tex>{String.raw`C`}</Tex> — the ratio of cross- to self-saturation.{" "}
          <Tex>{String.raw`C<1`}</Tex> (weak coupling): both polarizations oscillate simultaneously and the steady state
          is stable. <Tex>{String.raw`C>1`}</Tex> (strong coupling): the modes are mutually exclusive, one polarization
          suppresses the other, and operation is bistable (hysteresis). <Tex>{String.raw`C=1`}</Tex> is the neutral
          borderline. Remarkably, <Tex>{String.raw`C`}</Tex> depends only on the <Tex>{String.raw`J`}</Tex>-values of the
          transition through the angular sums.
        </Intuition>
        <KeyResult
          number="47a"
          eq={String.raw`C = \frac{\theta_{+-}\,\theta_{-+}}{\beta_+\,\beta_-}`}
          label="The coupling parameter"
          note={
            <>
              <Tex>{String.raw`C<1`}</Tex>: both modes coexist (stable). <Tex>{String.raw`C>1`}</Tex>: one mode wins
              (bistable). <Tex>{String.raw`C=1`}</Tex>: neutral. This single number decides the qualitative behavior.
            </>
          }
        />
        <p>Evaluating the Clebsch–Gordan angular sums gives <Tex>{String.raw`C`}</Tex> in closed form per transition type:</p>
        <KeyResult
          number="47b"
          eq={String.raw`C = \begin{cases}\left[\dfrac{(2J+3)(2J-1)}{2J^2+2J+1}\right]^2, & J \to J \\[2.4ex] \dfrac{2J^2+4J+5}{6J^2+12J+5}, & J \to J+1 \end{cases}`}
          label="C from angular momentum alone"
        />
        <p>Plugging in the relevant transitions gives the chapter&rsquo;s experimentally testable punchline:</p>
        <EqBlock label="47c">{String.raw`C(J{=}1{\to}0) = (21/13)^2 \approx 2.6 > 1\ (\text{strong});\quad C(J{=}1{\to}2)=1\ (\text{neutral});\quad C(J{=}1{\to}1)\approx 0.228 < 1\ (\text{weak, He--Ne }6328\,\text{\AA}).`}</EqBlock>
        <Callout kind="note" title="Why C(J=1→1) is 0.228, not 1">
          The closed form <Tex>{String.raw`[(2J+3)(2J-1)/(2J^2+2J+1)]^2`}</Tex> evaluates to{" "}
          <Tex>{String.raw`1`}</Tex> at <Tex>{String.raw`J=1`}</Tex>. The measured value{" "}
          <Tex>{String.raw`0.228`}</Tex> for the <Tex>{String.raw`J=1\to1`}</Tex> (6328&nbsp;Å) line comes from the full
          Doppler-limit angular sums — including the <Tex>{String.raw`m=0`}</Tex> axial sublevel contributions and
          lineshape weighting — not from the bare <Tex>{String.raw`J\to J`}</Tex> formula. We use the three stated
          benchmark numbers <Tex>{String.raw`(2.6,\,1.0,\,0.228)`}</Tex> directly.
        </Callout>
        <p>
          At the symmetric operating point (line center, equal coefficients) the coupled intensity equations collapse to
          the equal-intensity solution — and its competition signature is the factor{" "}
          <Tex>{String.raw`1+\sqrt C`}</Tex>:
        </p>
        <KeyResult
          number="48"
          eq={String.raw`I_+ = I_- = \frac{\alpha/\beta}{1 + \sqrt C}`}
          label="The magnetic tuning (Lamb) dip"
          note={
            <>
              As <Tex>{String.raw`B`}</Tex> tunes the detuning, this produces a magnetic Lamb dip in{" "}
              <Tex>{String.raw`I_\pm`}</Tex> near <Tex>{String.raw`B=0`}</Tex>; the <Tex>{String.raw`\sqrt C`}</Tex>{" "}
              distinguishes it from the ordinary single-mode Lamb dip.
            </>
          }
        />
        <p>
          The measured <strong>beat note</strong> between the two circular polarizations follows from the frequency
          equations&nbsp;(44) plus the anisotropy coupling <Tex>{String.raw`g_{+-}`}</Tex>: near{" "}
          <Tex>{String.raw`B=0`}</Tex> the coupling <em>locks</em> the two frequencies (a deadband,{" "}
          <Tex>{String.raw`\Delta\nu\to0`}</Tex>); for larger <Tex>{String.raw`B`}</Tex> the Zeeman splitting overcomes
          the lock and the beat rises — the optically pumped magnetometer response of Fig.&nbsp;12-6:
        </p>
        <KeyResult
          number="Fig. 12-6"
          eq={String.raw`\Delta\nu = \nu_+ - \nu_-\quad\text{(locked near }B=0,\ \text{then unlocks into a Zeeman beat).}`}
          label="Polarization beat frequency vs. B"
        />

        <SimFrame
          title="Zeeman laser: two circular polarizations competing in a magnetic field"
          caption={
            <>
              Sweep the magnetic field <Tex>{String.raw`B`}</Tex> and watch the chapter&rsquo;s signature observables:
              the magnetic tuning dip in <Tex>{String.raw`I_\pm(B)`}</Tex> (Fig.&nbsp;12-5) and the locked-then-unlocked
              beat <Tex>{String.raw`\Delta\nu(B)`}</Tex> (Fig.&nbsp;12-6). The <Tex>{String.raw`J`}</Tex>-selector sets
              the coupling parameter <Tex>{String.raw`C`}</Tex>.
            </>
          }
          tryThis={
            <>
              Start on the <Tex>{String.raw`J{=}1{\to}1`}</Tex> He–Ne line (<Tex>{String.raw`C\approx0.228`}</Tex>):
              both polarizations coexist and trace a smooth symmetric dip. Switch to{" "}
              <Tex>{String.raw`J{=}1{\to}0`}</Tex> (<Tex>{String.raw`C=2.6`}</Tex>): the system goes{" "}
              <strong>bistable</strong> — one polarization wins and the other is suppressed to zero, with a jump at{" "}
              <Tex>{String.raw`B=0`}</Tex>. Then raise <Tex>{String.raw`g_\text{anis}`}</Tex> and watch the locked
              deadband in <Tex>{String.raw`\Delta\nu(B)`}</Tex> widen.
            </>
          }
        >
          <Ch12Sim />
        </SimFrame>

        <Derivation title="Solve the competition; derive the dip and the lock">
          <Step title="Solve the coupled steady-state intensity equations">
            Set the brackets in&nbsp;(43) to zero: <Tex>{String.raw`\alpha_+ = \beta_+ I_+ + \theta_{+-} I_-`}</Tex> and{" "}
            <Tex>{String.raw`\alpha_- = \beta_- I_- + \theta_{-+} I_+`}</Tex>. This{" "}
            <Tex>{String.raw`2\times2`}</Tex> linear system has the standard two-mode solution; the both-on solution is
            stable iff <Tex>{String.raw`C = \theta_{+-}\theta_{-+}/(\beta_+\beta_-) < 1`}</Tex>. For{" "}
            <Tex>{String.raw`C>1`}</Tex> the symmetric solution is unstable and only single-polarization solutions
            survive — bistability. This is the Chapter-XI stability analysis applied verbatim.
          </Step>
          <Step title="Evaluate C from the angular sums">
            Carry the angular sums of&nbsp;(45)–(46) using the 3-<Tex>{String.raw`j`}</Tex> sum rules to obtain the
            closed forms&nbsp;(47b). The benchmark values follow: <Tex>{String.raw`2.6`}</Tex>{" "}
            (<Tex>{String.raw`J{=}1{\to}0`}</Tex>), <Tex>{String.raw`1`}</Tex> (<Tex>{String.raw`J{=}1{\to}2`}</Tex>),
            and the measured <Tex>{String.raw`0.228`}</Tex> (<Tex>{String.raw`J{=}1{\to}1`}</Tex>). A measurable laser
            property — bistable vs. coexisting polarization — is fixed by pure angular-momentum algebra.
          </Step>
          <Step title="The tuning dip and the beat lock">
            At the symmetric operating point the intensity solution collapses to&nbsp;(48), the magnetic Lamb dip with
            the <Tex>{String.raw`1+\sqrt C`}</Tex> factor. For the frequencies, the anisotropy coupling{" "}
            <Tex>{String.raw`g_{+-}`}</Tex> enters the frequency equations; when the Zeeman splitting{" "}
            <Tex>{String.raw`\delta\propto\mu_B B`}</Tex> is smaller than the coupling, the relative phase locks and{" "}
            <Tex>{String.raw`\Delta\nu = 0`}</Tex> (deadband); above it the beat unlocks and grows — Figs.&nbsp;12-5 and
            12-6.
          </Step>
        </Derivation>

        <Callout kind="insight" title="Angular momentum decides bistability">
          Whether a Zeeman laser is bistable in polarization (one circular mode kills the other) or supports both is
          fixed by the <Tex>{String.raw`J`}</Tex>-values of the lasing transition through{" "}
          <Tex>{String.raw`C`}</Tex> — no free parameters. The famous 6328&nbsp;Å He–Ne line is weakly coupled (
          <Tex>{String.raw`C\approx0.23`}</Tex>), so both circular polarizations coexist; a{" "}
          <Tex>{String.raw`J{=}1{\to}0`}</Tex> line would be bistable.
        </Callout>
        <Callout kind="insight" title="The Zeeman laser is a magnetometer">
          Because the beat frequency <Tex>{String.raw`\Delta\nu`}</Tex> tracks the magnetic splitting{" "}
          (<Tex>{String.raw`\propto B`}</Tex>) with a locked deadband near <Tex>{String.raw`B=0`}</Tex>, sweeping{" "}
          <Tex>{String.raw`B`}</Tex> gives a calibrated optical-frequency readout of magnetic field — the principle of
          the optically pumped laser magnetometer. The locking region&rsquo;s width measures the cavity anisotropy{" "}
          <Tex>{String.raw`g_{+-}`}</Tex>.
        </Callout>
        <Callout kind="note" title="Why the scalar model is not enough">
          The chapter closes by noting that the simpler two-level <em>scalar</em> field model gives unsatisfactory
          results once nonzero magnetic fields and cavity anisotropy matter — the full multilevel angular-momentum
          treatment of this chapter is required to get the polarization physics right.
        </Callout>
      </Section>

      <Section title="Carry-forward">
        <Callout kind="note" title="The ideas you keep">
          <ul>
            <li>
              <strong>A cavity mode has two polarizations</strong> — treating them is a true two-mode problem identical
              in form to the ring-laser equations (11.13)–(11.16).
            </li>
            <li>
              <strong>Circular vs. linear basis</strong> — <Tex>{String.raw`\hat{\mathbf e}_\pm = 2^{-1/2}(\hat{\mathbf x}\pm i\hat{\mathbf y})`}</Tex>{" "}
              diagonalizes the atomic response (<Tex>{String.raw`\Delta m=\pm1`}</Tex>), while the linear basis
              diagonalizes cavity anisotropy. No single basis diagonalizes both.
            </li>
            <li>
              <strong>Anisotropy = coupling</strong> — different <Tex>{String.raw`Q_x, Q_y`}</Tex> become off-diagonal
              coupling <Tex>{String.raw`g_{+-} = 1/Q_x - 1/Q_y`}</Tex> (Eq.&nbsp;17). A general transformation lesson.
            </li>
            <li>
              <strong>The coupling parameter</strong> <Tex>{String.raw`C = \theta_{+-}\theta_{-+}/(\beta_+\beta_-)`}</Tex>{" "}
              governs every competing-mode laser: <Tex>{String.raw`C<1`}</Tex> coexist, <Tex>{String.raw`C>1`}</Tex>{" "}
              bistable, <Tex>{String.raw`C=1`}</Tex> neutral.
            </li>
            <li>
              <strong>Self- vs cross-saturation</strong> (<Tex>{String.raw`\beta`}</Tex> vs <Tex>{String.raw`\theta`}</Tex>)
              is the universal language of mode competition; their ratio is <Tex>{String.raw`C`}</Tex>.
            </li>
            <li>
              <strong>Angular momentum is measurable</strong> — Clebsch–Gordan sums fix <Tex>{String.raw`C`}</Tex> and
              hence bistability from the <Tex>{String.raw`J`}</Tex>-values alone (2.6, 1, 0.228).
            </li>
            <li>
              <strong>1st order = gain, 3rd order = competition</strong> — the standard semiclassical recipe, here with
              sublevel bookkeeping.
            </li>
            <li>
              <strong>Observable signatures</strong> — a magnetic Lamb dip in <Tex>{String.raw`I_\pm(B)`}</Tex> with the{" "}
              <Tex>{String.raw`1+\sqrt C`}</Tex> factor, and a beat <Tex>{String.raw`\Delta\nu(B)`}</Tex> that locks near{" "}
              <Tex>{String.raw`B=0`}</Tex> then tracks the Zeeman splitting — the optically pumped laser magnetometer.
            </li>
          </ul>
        </Callout>
      </Section>
    </Lesson>
  );
}
