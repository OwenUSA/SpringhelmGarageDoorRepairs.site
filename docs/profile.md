# docs/profile.md — reference profile (Prompt 1)

**Reference:** `https://roofingsolutionsnc.com/` — profiled from the SAVED COPY in
`reference/raw/` per A-15, served by `node ../_shared/harness/src/serve-reference.mjs`
on `http://127.0.0.1:3210`. The live site was never fetched during this turn.

Server identity **verified before any capture**: served `<title>` = `Roofing Solutions NC LLC`.
Confirmed twice — once from the server's own startup line, once via
`curl -s http://127.0.0.1:3210/ | grep title`.

Raw profile JSON: `.harness/profile/ref-<route>-<bp>.json` (20 passes: 5 routes x 390/430/768/1440).

---

## 1. Platform

| | |
|---|---|
| Builder | **GoDaddy Website Builder 8.0.0000** ("Starfield Technologies"), the `x` theme |
| Markup style | atomic classes (`c1-1 c1-2 c1-9a ...`) plus `data-ux` / `data-aid` semantic attributes |
| Rendering | **fully static** — the saved HTML renders complete; no client fetch populates content |
| Fetched content | none. The one same-origin `iframe` is GoDaddy's cart stub (`/g/api/cart/cart`), zero-height |
| Auth / geo gating | none |

This is a **fifth builder** for the fleet (previous sites: Divi, Elementor, Avada/Fusion,
two bespoke). Nothing about Divi's `max-980` restack applies here.

## 2. Page heights and section counts

Section count is **identical at all three breakpoints on every route** — no band splits,
no ordinal drift (verified: the section-id list is byte-identical at 390 / 768 / 1440 on
all five routes).

| ref route | our route | sections | h@390 | h@768 | h@1440 | 390/1440 |
|---|---|---|---|---|---|---|
| `/` | `/` | 4 | 5857 | 3842 | 3610 | 1.62x |
| `/about` | `/about` | 6 | 7635 | 6694 | 5869 | 1.30x |
| `/services` | `/services` | 4 | 3927 | 2351 | 1864 | 2.11x |
| `/contact` | `/contact` | 5 | 3277 | 2779 | 2248 | 1.46x |
| `/privacy-policy` | `/privacy` | 3 | 3013 | 2551 | 2370 | 1.27x |

`/services` is 2.11x taller at 390 than at 1440 — the widest restack in the set, and one
reason 768 stays in `BP_SET`.

Per-band heights (canonical ids, h@390 / h@768 / h@1440):

| route | section id | 390 | 768 | 1440 |
|---|---|---|---|---|
| `/` | `s00-8bfc40ab-...-eastern-nc-s-only-owens-corning-pl` | 596 | 596 | 901 |
| `/` | `s01-135f9822-...` (Our Mission) | 413 | 267 | 213 |
| `/` | `s02-fb5ab59e-...-blog` | 4307 | 2565 | 2110 |
| `/` | `s03-aa99edc2-...` (footer) | 541 | 415 | 386 |
| `/about` | `s00-8bfc40ab-...` (nav bar) | 96 | 96 | 136 |
| `/about` | `s01-cc079ee9-...-about-us` | 1865 | 1534 | 1604 |
| `/about` | `s02-a2df0b9d-...-built-on-trust-driven-by-quality` | 803 | 794 | 772 |
| `/about` | `s03-3642a9a3-...-my-blog` | 4115 | 3639 | 2747 |
| `/about` | `s04-da4df260-...-connect-with-us` | 216 | 216 | 224 |
| `/about` | `s05-aa99edc2-...` (footer) | 541 | 415 | 386 |
| `/services` | `s01-13e60568-...-experience-quality-roofing-service` | 388 | 294 | 277 |
| `/services` | `s02-40dbc796-...-expert-roofing-services-for-your-h` | 2902 | 1546 | 1065 |
| `/contact` | `s01-0b5ed9f0-...-contact-us` | 1684 | 1593 | 969 |
| `/contact` | `s02-bb818e7c-...-locations` | 741 | 459 | 533 |
| `/contact` | `s03-10fb85d2-...-connect-with-us` | 216 | 216 | 224 |
| `/privacy-policy` | `s01-5fa47a62-...-privacy-policy` | 2376 | 2040 | 1848 |

The header band (`s00-8bfc40ab-...`) is the SAME GUID on all five routes, and the footer
band (`s0N-aa99edc2-...`) likewise. On `/` alone the header band is 901px because the hero
(background image + tagline + CTA) lives inside it; on the four subpages it is a bare
136px nav bar. That asymmetry drives one contract decision — see `docs/sections.md`.

## 3. Breakpoints in the reference CSS

Mined from all 15 stylesheets (47.7 KB of rules) at the canonical width:

| media query | rule count | status |
|---|---|---|
| `max-450` | 3 | **skipped** — below our 390 probe; nothing structural |
| `min-451` | 3 | **skipped** |
| `max-767` | 29 | covered by our **390** probe |
| `min-768` | 59 | **matches our 768 probe exactly** |
| `min-1024` | 70 | **skipped** — falls between 768 and 1440; recorded here, not measured (cost rule) |
| `min-1280` | 14 | covered by our **1440** probe |
| `min-1536` | 14 | **skipped** — above 1440 |
| `min-1921` | 3 | **skipped** |

`BP_SET` stays **390 / 768 / 1440** exactly. `min-1024` and `min-1536` are recorded and
deliberately NOT added as a fourth width.

**Container geometry:** content containers are full-bleed at 390 and clamp to **1160px**
at 1440. Header/hero bands are full-bleed (1440) at every width.

## 4. Motion — `framer-motion` is NOT justified

Probed at 1440 on `/`; every signal negative:

```
gsap:false  ScrollTrigger:false  lenis:false  locomotive:false  aos:false  wow:false
swiper:false  slick:false  [data-aos]:0  parallax attrs:0  will-change:transform:0
CSS-animated elements:0  inline onscroll:false
```

**Nothing initialises.** There is no scroll-linked motion and no time-driven choreography
of any kind — no carousel, no reveal-on-scroll, no parallax. Per the dependency allowlist,
**`framer-motion` is not justified and must not be installed.** Motion is limited to
ordinary CSS hover transitions on links and buttons.

## 5. Fonts — no substitution floor is warranted

`document.fonts` inspected after `ready`, cross-checked against `@font-face` rules and
real computed usage:

| family | faces actually LOADED | elements using it | licence | verdict |
|---|---|---|---|---|
| **Lato** | 400, 700, 400i, 700i | 206–308 per route | SIL OFL 1.1 | **open — use directly** |
| **Ubuntu** | 400 | 3–10 per route | Ubuntu Font Licence 1.0 | **open — use directly** |

**20 `@font-face` rules resolve to 5 real loaded faces.** The other 15 are unused
weight/subset declarations — **phantoms, and none of them gets a floor.** (This is the
sibling defect where a face with rules but no loaded file was booked as a permanent floor
and permanently excused a heading that should have converged.)

Both families are served from `img1.wsimg.com/gfonts/...`, GoDaddy's Google-Fonts mirror —
ordinary Google Fonts, **both available in `next/font/google`**. D-11's substitution clause
does not fire: nothing here is a self-hosted licensed face.

- Display / headings → **Ubuntu**
- Body / UI → **Lato**
- **`docs/known-divergence.md` gets NO font-substitution floor from this reference.**

The `Times New Roman` seen on ~22 elements per route is the UA default leaking through
wrappers that set no family. It is not a design choice and must not be reproduced.

## 6. State inventory

| state | present? | notes |
|---|---|---|
| Mobile nav drawer | **yes** | `[data-aid="HAMBURGER_MENU_LINK"]` toggles `[data-ux="NavigationDrawer"]`. The only interactive widget on the site. |
| Sticky header | **no** | `stickyEls: []`. The header scrolls away. |
| Sticky call bar | **no** | ours (D-04) is therefore NOVEL, not a clone |
| Accordions | **0** | our `/services` FAQ has no counterpart → NOVEL |
| Tabs | 0 | — |
| Carousels / sliders | 0 | — |
| Video | 0 | — |
| Forms | **1**, on `/contact` | GoDaddy form: name, **Email\***, phone, message, marketing-consent checkbox, **reCAPTCHA**. We ship none of the email field, the consent copy, or the captcha (D-03, D-05, D-15). |
| `tel:` links | **1** site-wide | `tel:2527023395`, in the header CTA. We put `tel:` everywhere (D-04). |
| `mailto:` links | **0** | — |
| Maps | **0** | the reference embeds no map. Both our maps (D-08) are NOVEL. |
| Cookie banner | **yes** | `FOOTER_COOKIE_BANNER_RENDERED`, below `minBandHeight`. We ship no trackers and no banner (D-15). |
| Auth / geo / paywall | none | — |

## 7. Images — the lazy-loading trap does NOT apply

`<img>` count per route: 2 (`/`), 5 (`/about`), 8 (`/services`), 4 (`/contact`).
Every one has `loading="auto"`, **no `data-src`**, and a resolved `naturalWidth` on first
paint. There is **no lazy-loading plugin and nothing to force into `src`** — unlike the
sibling that went 15 → 108 images by forcing it, forcing here would change nothing.

The real trap on this reference is a different one: **most photography is not an `<img>`
at all.** GoDaddy paints photos as `div[role="img"]` with a CSS `background-image` — 8 such
divs on `/` and `/about`, 1 on `/services`. Asset-slot inventory (Prompt 2) must count
`[role="img"]` + `background-image`, not just `document.images`, or it will report the home
page as having two pictures (both of which are the logo, rendered twice for desktop + drawer).

## 8. Segmentation — what `harness.config.mjs` was set to, and why

```
sectionCandidates: ['[data-ux="Page"] > div > div', 'section[data-ux="Section"]',
                    'main > section', 'section']
chromeSelectors:   ['header', 'footer']          identityAttr: 'data-section'
```

The three segmentation traps, each checked:

1. **There are ZERO `<header>`, `<footer>` and `<main>` tags in the reference markup.**
   Bare `header`/`footer` in `chromeSelectors` therefore match **nothing** on the ref side —
   they exist for OUR side only, where the shell declares them, and are backed up by
   `identityAttr: data-section`. Nothing can be swallowed on the ref side because nothing
   matches, and our own markup is clean and unnested by construction. (`config.mjs` also
   refuses a `[class*=]` matcher at startup.)
2. **`section[data-ux="Section"]` alone is WRONG and was rejected.** Two bands — `/about`'s
   "Built on Trust" and `/services`' CTA banner — are `[data-ux="WidgetBanner"]` and contain
   no `<section>` at all, so that selector silently drops them (`/about` 6→5 bands,
   `/services` 4→3). The winning selector is the positional band wrapper
   `[data-ux="Page"] > div > div`; the probe reports `segMode` as exactly that on every route.
3. **No ordinal drift.** No absolutely-positioned overlay sorts to a different ordinal at
   390 — the section-id list is byte-identical at 390 / 768 / 1440 on all five routes. Ids
   are intrinsically stable as well, because each band carries a GoDaddy GUID in its `id`
   attribute (`s03-aa99edc2-...` is the footer on every route), so `idOf()` resolves real
   identity rather than position.

Sub-threshold children (cookie banner, cart-stub iframe, two empty divs) fall below
`minBandHeight` and are correctly excluded: 8 DOM children → 4 measured bands on `/`.

## 9. Band padding lives on an INNER container — read this before Prompt 6/7

Every band wrapper AND its `[data-ux="Widget"]` child compute to `padding: 0px` on all four
sides, at 390 and at 1440, on all five routes. The vertical rhythm sits deeper, on
`[data-ux="Container"]`, which is also what clamps the content to 1160px.

This is the **inverse** of the Atlas A-11 defect. There, a brief asserting "bands are
full-width blocks with zero padding" was wrong and cost an extra cap-lifted pass. Here it is
literally true of the band wrapper — so the correct build is **band wrapper at padding 0,
with padding and `max-width: 1160px` on an inner container**. Putting vertical padding on
our outer band would manufacture a `paddingTop`/`paddingBottom` structural delta against a
reference band that measures 0, on every single ADAPTED row.

## 10. Reference colour (recorded, never measured — A-8)

Dark theme. Band backgrounds `rgb(22,22,22)`, `rgb(0,0,0)`, `rgb(17,17,17)`, with a white
band on `/about`'s intro; accent cornflower blue `rgb(100,149,237)`. Recorded for structural
context only — our palette is randomized in Prompt 5 into the assigned hue window
**5–25 (red / orange)**, and colour is permanently excluded from every diff.

## 11. Reference routes we do NOT build

The reference also ships `/appointments`, `/service-request`, `/referral`, `/gallery`,
`/fortified`, `/storm-restoration` and a blog feed. **None is among our five (D-01)** —
their bands are DELETED, and every nav item, footer link and internal anchor pointing at
them is scrubbed. `/contact`'s `Locations` band is DELETED per D-02.
