# docs/known-divergence.md — permanent floors and standing exclusions

**Read this before starting any fix.** Everything here is a floor, an exclusion, or a
deliberate addition. None of it is a defect, none of it is closable, and no iteration is ever
to be spent on it. `ITERATION_CAP` is 1 (A-2) and it is not to be spent here.

Written at Prompt 2+3+4, before any component exists, so the Prompt 6+7 build wave inherits it.

---

## 1. Band padding lives on an INNER container — the single most expensive thing here

**This is a build instruction, not a measurement note. Read it before writing a section.**

Every band wrapper on the reference — and its `[data-ux="Widget"]` child — computes to
`padding: 0px` on all four sides, at 390 and at 1440, on all five routes. The vertical rhythm
and the 1160px clamp both sit deeper, on `[data-ux="Container"]`.

So the correct build is:

```
<section>                      padding: 0            <-- the band wrapper. ZERO. Always.
  <div class="container">      padding-block: …      <-- the rhythm lives here
                               max-width: 1160px     <-- and so does the clamp
```

**Putting vertical padding on our outer band manufactures a `paddingTop` / `paddingBottom`
structural delta against a reference band that measures 0 — on every single ADAPTED row, on
every route, at every breakpoint.** Twenty of our thirty-one rows are ADAPTED. That is a
self-inflicted deviation in twenty places, and with one fix attempt per section there is no
second pass to catch it.

This is the **inverse** of the Atlas A-11 defect and the inversion is the trap. On Atlas, a
builder brief asserted "bands are full-width blocks with zero padding" and it was *false* —
the reference varied padding per band — which cost a cap-lifted extra pass across thirteen
components. Here the same sentence is *literally true of the band wrapper*, and the failure
mode is the mirror image: an agent who remembers the Atlas correction and "fixes" it by
putting padding back on the band will break every ADAPTED row on this site.

Source: `docs/profile.md` §9, measured, not assumed.

---

## 2. Colour is excluded from every measurement, permanently (A-8)

**Colour divergence from the reference is intentional and is permanently excluded from every
diff, every threshold, and every future iteration.**

The reference is a dark theme — band backgrounds `rgb(22,22,22)`, `rgb(0,0,0)`,
`rgb(17,17,17)`, one white band on `/about`, accent cornflower blue `rgb(100,149,237)`. Our
palette is randomized at token-write time (Prompt 5, merged from Prompt 9 per A-7) into this
site's assigned primary hue window, **5–25 (red / orange)**. The two will never match and are
never meant to.

Stripped from the structural comparator: resolved colour, background-colour, border-colour,
gradient stops, shadow colour. **Kept**: every geometric and typographic field, and the
non-colour parts of borders and shadows — widths, offsets, blur, spread, radii.

There are **0 FIDELITY rows** on this site, so the sibling problem of a recoloured solid
band reading 100% divergent forever does not arise here at all.

*Palette seeds — winning seed and all five candidates — are recorded in section 8 below, at
Prompt 5. The section exists now so the record has somewhere to land.*

---

## 3. NO font-substitution floor exists on this site, and none may be booked

Stated as a prohibition because it is a floor a previous site booked wrongly and then used to
excuse a heading that should have converged.

The reference loads **five real faces**: Lato 400 / 700 / 400i / 700i and Ubuntu 400. Both
families are SIL OFL 1.1 and Ubuntu Font Licence 1.0 respectively, both are served from
GoDaddy's Google-Fonts mirror (`img1.wsimg.com/gfonts/`), and **both are in
`next/font/google`**. We load the same two families. D-11's substitution clause does not fire:
nothing here is a self-hosted licensed face.

The reference declares **20 `@font-face` rules**. Fifteen of them resolve to no loaded file —
unused weight and subset declarations. They are **phantoms**. A phantom face is not a floor,
and any text-metric residual attributed to one is a misdiagnosis.

The `Times New Roman` computed on ~22 elements per route is the UA default leaking through
wrappers that set no family. It is not a design choice and must not be reproduced.

---

## 4. Placeholder assets — 16 REPLACE slots, all unfilled

All photography is `TODO(fact)` until Prompt 10's prompts are run through Nano Banana Pro and
the files are handed back (OVERRIDE 3). Until then, every photographic slot renders a
generated SVG from `public/placeholders/` — flat fill, slot ID and pixel dimensions as text,
no external service contacted at build or at run time.

**Sections blocked by a placeholder are reported separately, with the placeholder area
excluded from the measurement. Never treat one as a fixable divergence.**

| | |
|---|---|
| slots inventoried | 21 |
| REPLACE, placeholder-filled | 16 |
| DELETED, inventoried and not filled | 5 |
| placeholder SVGs generated | 29 (13 slots change aspect between breakpoints and get a second crop) |
| **REPLACE assets downloaded** | **0** |

Full table with per-breakpoint geometry, aspect, object-fit and sampled dominant colour:
`assets/INVENTORY.md`.

**Near-white repaint: nothing fired.** The mechanism is configured and live
(`placeholderMaxLum: 0.62`, `placeholderTargetLum: 0.28`) but the reference is a dark theme
and the lightest sampled slot is `#bcc4cd` at relative luminance ≈ 0.55. No placeholder file
diverges from its honest sample, and **zero slots were left deliberately unapplied** — the
outcome two sibling sites could not reach.

The **logo is not a placeholder**: the wordmark ships as text set in Ubuntu, which is a real
shipping state, not a measurement hole. `TODO(fact): logo asset`.

---

## 5. Deliberate ADDITIONS — do not later read these as clone defects

Four things exist on our site that have **no counterpart anywhere on the reference**. They are
required by the decision register, not copied, and any future reader comparing the two sites
will otherwise find them and try to explain them as errors.

| ours | reference has | why ours exists |
|---|---|---|
| **Sticky header** (`docs/behavior/02-sticky-header.md`) | **Nothing sticky at all** — the profile's `stickyEls` is `[]`; the reference header scrolls away and never comes back. | Ours is an addition. The proposition is that a phone number reaches a person, and a phone number that scrolls off a 5857px-tall mobile page is not reachable. |
| **Mobile sticky call bar** (`docs/behavior/03-mobile-call-bar.md`) | Nothing. Zero sticky elements, and exactly **one** `tel:` link on the entire site. | D-04 requires it. Ours puts `tel:` links everywhere. |
| **Two maps** (`service-area-map`, `contact-map`) | **Zero maps** on any of the five pages. | D-08 requires both. Embedded by coordinates only (D-07) because the address is fictional and will not geocode. |
| **FAQ accordion** (`services-faq`) | **Zero accordions, tabs and carousels.** | Pre-answered in CONSTANTS: FAQ on `/services` only, in-page. |

All four are NOVEL rows in `docs/sections.md` and are measured by token conformance, once,
not per breakpoint (A-9).

---

## 6. Motion — `framer-motion` is not justified and must not be installed

Every motion probe on the reference came back negative at 1440 on `/`:

```
gsap:false  ScrollTrigger:false  lenis:false  locomotive:false  aos:false  wow:false
swiper:false  slick:false  [data-aos]:0  parallax attrs:0  will-change:transform:0
CSS-animated elements:0  inline onscroll:false
```

**Nothing initialises.** There is no scroll-linked motion and no time-driven choreography of
any kind. The dependency allowlist admits `framer-motion` *only if* the profile finds real
choreography, and the profile says explicitly that it does not. Motion on our site is limited
to ordinary CSS transitions on hover and focus, all of them under
`prefers-reduced-motion: no-preference`. See `docs/behavior/08-scroll-reveal.md`.

---

## 7. Advisory comparator fields — reported, never blocking (A-12)

`innerCount`, `innerRows`, `innerCols` and `position` compare our clean markup against a
page-builder's nested column tree and are **unclosable by construction**. They are computed
and reported as a trailing per-row note and never contribute to the deviation percentage.

On the Atlas site they were 94 / 82 / 81 of every residual and drowned the real defects
underneath. **Do not chase them, and do not restructure our markup to imitate GoDaddy's
nesting.**

---

## 8. Palette seeds

*To be written at Prompt 5 (A-7): the winning seed, all five candidate seeds, the selected
accent scheme, and the resulting primary hue — which must land in this site's assigned window
of **5–25 (red / orange)**. Report how many seeds were tried. Note the auto-selector is
structurally biased toward magenta accents at fixed OKLCH L/C, so seeds landing near hue
300–360 are common and must be re-rolled.*

---

## 9. Structural measurement is AVAILABLE here — no `BLOCKED/no-reference` exemption

Three of the five sites that ran before this one lost their reference mid-build to a bot
challenge, and two had kept no local copy, so every structural row on those sites now reports
`BLOCKED/no-reference` permanently.

**A complete local copy of all five reference pages is in `reference/raw/`** (A-15). Structural
rows here carry real numbers against `STRUCT_THRESHOLD = 5%`. **This site does not get that
exemption and must not claim it.** Never delete `reference/raw/`; it is gitignored because it
is someone else's markup, which is not the same as being disposable.
