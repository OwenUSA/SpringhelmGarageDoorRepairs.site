
## TAKE — nothing downloaded, because nothing needed to be

| item | source | licence | how it ships |
|---|---|---|---|
| UI icons | `lucide-react` | ISC | npm dependency, tree-shaken per icon. No icon font, no SVG sprite committed. The reference has **0 icon-font families** (`docs/profile.md` §5), so nothing is being matched here — icons are ours. |
| Body / UI type | Lato 400 / 700 / 400i / 700i | SIL OFL 1.1 | `next/font/google` |
| Display type | Ubuntu 400 | Ubuntu Font Licence 1.0 | `next/font/google` |

The reference declares **20 `@font-face` rules that resolve to 5 loaded faces**; the other 15
are unused weight/subset declarations. They are phantoms and **none of them gets a floor** —
see `docs/known-divergence.md`, which records explicitly that no font-substitution floor
exists on this site.

## Logo

`logo-wordmark` is the only brand slot. The reference wordmark is a 163x88 PNG rendered
twice per page (desktop bar + nav drawer, the second at 149x80 on mobile). Ours is a
**wordmark set in Ubuntu**, not an image, until an asset exists:

```
TODO(fact): logo asset — wordmark + icon lockup for Springhelm Garage Door Repairs.
            Prompt written in docs/asset-prompts.md; no file has been supplied.
```

The text wordmark is the shipping state, not a placeholder to be measured against. It is
listed in `docs/facts-needed.md`.

## Eight service cards from three measured slots

The home `services-grid` inherits its geometry from the reference's blog band, which carries
**three** cards. Our grid carries **eight** — one per service in CONSTANTS. Slots
`home-service-card-a/b/c` are the three the reference actually renders and therefore the only
three with measured geometry; cards 4–8 reuse `home-service-card-a`'s box exactly
(200x200 at 768 and 1440, 342x200 at 390, `object-fit: cover`, 1:1 at desktop). They are not
invented measurements and are not listed as separate rows, because there is no reference box
to measure them against. Prompt 10 writes eight prompts at that one geometry.

The `/services` `services-list` band is the opposite case: the reference renders **six** card
images at 339x169, and our eight services fill the same grid. Cards 7 and 8 reuse
`services-card-01`'s box.

## Near-white repaint

**None fired on this site.** The reference is a dark theme — band backgrounds are
`rgb(22,22,22)` / `rgb(0,0,0)` / `rgb(17,17,17)` — so every sampled dominant colour sits well
below the `placeholderMaxLum` of 0.62. The lightest sample in the set is `#bcc4cd`
(relative luminance ≈ 0.55, the three `/about` photos against that route's one white band),
which is a mountable mid-light neutral and needs no repaint. The mechanism is configured and
live (`placeholderMaxLum` / `placeholderTargetLum` in `harness.config.mjs`); it simply had
nothing to correct. **Zero slots were left deliberately unapplied.**

## Video, preloads, masks

Zero. No `<video>`, no `<source>`, no `<link rel=preload>` for an image, no `mask-image`,
no `border-image`, no `list-style-image` anywhere in the five reference pages.

## What is NOT in this file

Placeholder SVGs are flat fills with the slot ID and pixel dimensions as text, generated
locally into `public/placeholders/`. **No external placeholder service is contacted**, at
build time or at runtime — there is no `placehold.co`, no `picsum`, no image CDN. The
generator is `placeholderSVG()` in the shared harness and it writes a `<rect>` and two
`<text>` nodes, nothing else.
