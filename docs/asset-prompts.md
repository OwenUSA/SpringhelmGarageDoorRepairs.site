# docs/asset-prompts.md — Prompt 10, image generation prompts (text only)

Per OVERRIDE 2 in `CLAUDE.md`: this file is text only. No image has been generated,
sourced, fetched, or downloaded to produce it. Target generator is **Nano Banana Pro**;
prompts are written in its idiom and every slot states exact output pixel dimensions per
breakpoint as plain text rather than an aspect-ratio flag. One prompt per slot, plus a
second crop only where the slot's aspect ratio changes between breakpoints (marked
**aspect Δ: yes** below, taken verbatim from `assets/INVENTORY.md`).

Content rules bind on every entry below:

- **D-09** — never describe the reference's own photographs, staff, trucks, signage, or
  logo. Every scene here is written fresh, generic to garage-door repair work, for a
  fictional business (Springhelm Garage Door Repairs).
- **D-13** — no invented customers, faces treated as identifiable testimonial subjects, or
  review imagery. Technicians shown are anonymous/generic, never posed as if endorsing.
  No star ratings, badges, or review counts rendered into any image.
- **D-14** — no certification, licensing, BBB, or manufacturer-badge artwork in any
  generated image. The one reference slot that carried certification artwork
  (`about-badge`) is written below as a plain workshop/service photograph instead — never
  as a badge, seal, or certificate graphic.

## Applied palette — read from `app/globals.css`, quoted verbatim

| token | hex | OKLCH |
|---|---|---|
| `--color-primary` | `#3f1d25` | oklch(28.14% 0.0537 6.14) — dark maroon-brown, hue 6 |
| `--color-primary-deep` | `#280b13` | oklch(20.10% 0.0495 5.43) — near-black maroon |
| `--color-accent` | `#9d300f` | oklch(47.00% 0.1502 35.99) — burnt orange-red, hue 36, THE call CTA colour |
| `--color-accent-deep` | `#812102` | oklch(40.14% 0.1357 35.96) — CTA hover, deeper burnt orange |
| `--color-surface` | `#ffffff` | white |
| `--color-neutral-200` | `#ffeef1` | oklch(96.34% 0.0188 5.29) — faint rose-tinted page ground |
| `--color-neutral-400` | `#e2c6cb` | oklch(85.15% 0.0323 5.62) — dusty rose-grey hairline |
| `--color-neutral-600` | `#685155` | oklch(46.00% 0.0313 6.70) — muted mauve-grey |
| `--color-neutral-900` | `#221014` | oklch(20.06% 0.0309 5.88) — near-black maroon body text |

Every prompt below names its applied hues as **primary maroon-brown (#3f1d25, hue 6)** and
**accent burnt orange-red (#9d300f, hue 36)** explicitly, so a generated image reads as
belonging to this palette rather than a neutral stock photo.

---

## Logo — wordmark plus icon lockup

**Slot:** `logo-wordmark` · route: all · section: `site-header` (desktop bar + mobile nav
drawer) · sizes: 149×80 (390/768, drawer) / 163×88 (1440, desktop bar) · aspect 1.85:1 ·
object-fit: contain

Display font actually loaded: **Ubuntu 400** (`next/font/google`, matches the reference's
own loaded display face — see `assets/INVENTORY.md`). Applied palette: primary maroon-brown
`#3f1d25` (hue 6) as the dominant ink, accent burnt orange-red `#9d300f` (hue 36) as a
single accent stroke or icon fill — not both at equal weight.

> Flat vector logo lockup, icon left of wordmark, horizontal lockup on a transparent
> background. Icon: a minimal geometric garage door glyph — three or four stacked
> horizontal panel bars inside a simple rounded-corner square frame, rendered as clean
> flat shapes with no gradient, no drop shadow, no bevel. Icon fill colour
> `#9d300f` (burnt orange-red). Wordmark: "Springhelm" set in a geometric sans-serif
> matching Ubuntu 400 — even stroke weight, rounded terminals, tight but legible tracking
> — in colour `#3f1d25` (primary maroon-brown), all one weight, no italics, no drop shadow,
> no outline stroke. No tagline, no phone number, no address, no certification seal, no
> star rating, in the mark. Composition centered with even padding on all sides so the
> lockup can be scaled down without clipping. Output on a fully transparent background,
> PNG.
>
> Output pixel dimensions: **163×88 px** (primary export, used at 1440). Object-fit:
> contain — the lockup must not be cropped to fill the box.

**Second crop — aspect Δ: yes** (mobile drawer render differs from the desktop bar box):

> Same lockup, same colours, same icon-left-of-wordmark composition, re-exported to fit a
> slightly wider aspect box without stretching the glyph or the type — the icon and
> wordmark keep their proportions; extra transparent padding is added left/right rather
> than the mark being stretched.
>
> Output pixel dimensions: **149×80 px** (390 and 768, drawer render). Object-fit: contain.

---

## Home (`/`)

### `home-hero-bg`

Route: `/` · section: `hero` · kind: background-image · aspect Δ: **yes**

| bp | px | aspect | object-fit |
|---|---|---|---|
| 390 | 390×500 | 39:50 | auto, cover |
| 768 | 768×500 | 768:500 | auto, cover |
| 1440 | 1440×765 | 32:17 | auto, cover |

> Wide-format photograph of a residential garage door repair in progress, shot from a
> low three-quarter angle in a suburban driveway at late-afternoon golden hour. A single
> technician in plain dark workwear (no visible name patch, no logo, no branded truck)
> kneels beside an open garage door track, adjusting a torsion spring assembly with a hand
> tool. The garage door itself is a plain modern panel door, muted warm grey, no visible
> brand markings. Background: a generic suburban house facade, softly out of focus, with
> no visible house numbers or signage.
>
> Colour grade: warm neutral photograph with the shadows and the driveway asphalt pushed
> toward the primary maroon-brown `#3f1d25` (hue 6) and a single warm rim-light on the
> technician's tool and the spring hardware pushed toward the accent burnt orange-red
> `#9d300f` (hue 36), so the image reads as belonging to this palette without looking
> colour-filtered or unnatural. Documentary editorial photography style, natural light,
> shallow depth of field, no visible text, no logos, no license plates, no readable house
> numbers, no people other than the one technician, no branded vehicles.
>
> Output pixel dimensions: **390×500 px** (mobile), **768×500 px** (tablet), **1440×765
> px** (desktop). Object-fit: cover on all three — compose the technician and the door
> hardware in the vertical-safe centre third so cropping top/bottom at the narrow
> breakpoints and left/right at the wide breakpoint does not cut the subject.

### `home-service-card-a` / `home-service-card-b` / `home-service-card-c`

Route: `/` · section: `services-grid` · kind: background-image, square · sizes: 342×200
(390) / 200×200 (768, 1440) · aspect 1:1 at desktop · object-fit: auto/auto (art-directed,
not cropped) · aspect Δ: **yes** (342×200 at mobile is not square)

Three of eight service-card slots carry measured reference geometry; cards 4-8 reuse this
same 200×200 (desktop) / 342×200 (mobile) box (see "Eight service cards" note below).

> Tight square-format close-up product photograph of garage-door hardware, isolated
> against a plain seamless studio backdrop in a warm off-white close to `#ffeef1`. Subject
> fills most of the frame with generous even margin. No people, no logos, no text overlay,
> no brand markings on any hardware. Lit with soft diffused studio light, single soft
> shadow, no harsh specular highlights. Colour grade: the studio backdrop and any metal
> highlights carry a faint warm cast toward accent burnt orange-red `#9d300f` (hue 36);
> any dark hardware components (springs, tracks, brackets) rendered in tones close to
> primary maroon-brown `#3f1d25` (hue 6) rather than neutral black, so the set reads as
> belonging to this palette. Documentary product-photography style, not illustration, not
> 3D render.
>
> **`home-service-card-a`** subject: a torsion spring and mounting bracket assembly.
> **`home-service-card-b`** subject: a garage-door opener motor unit and rail, wall-
> mounted.
> **`home-service-card-c`** subject: a set of steel door rollers and a section of track.
>
> Output pixel dimensions, one export per card: **342×200 px** (mobile, wide crop),
> **200×200 px** (tablet and desktop, square crop). Object-fit: the mobile crop is
> letterboxed wider than the desktop square — keep the hardware subject centred so both
> crops read correctly without re-composing.

### `home-service-card-d` through `home-service-card-h` (cards 4-8)

Route: `/` · section: `services-grid` · same box as `home-service-card-a` — **not a
separately measured reference slot** (the reference band carries three cards; this site's
grid carries eight, one per CONSTANTS service list). Same dimensions, same object-fit, same
aspect-Δ note as above.

> Same treatment, palette, and studio-photography style as `home-service-card-a/b/c`
> above (warm off-white backdrop near `#ffeef1`, accent-toned highlights `#9d300f`,
> maroon-toned dark hardware `#3f1d25`, no people, no logos, no text).
>
> **`home-service-card-d`** subject: a cable and drum assembly at the base of a track.
> **`home-service-card-e`** subject: a dented steel door panel awaiting replacement, shown
> edge-on to read the damage without a full-door context.
> **`home-service-card-f`** subject: a door in a visibly off-track, misaligned position
> against its frame, close cropped to the track-to-frame gap.
> **`home-service-card-g`** subject: a plain new residential garage door panel, closed,
> shot straight-on and cropped tight to the panel texture.
> **`home-service-card-h`** subject: a technician's hand on a wall-mounted maintenance
> checklist clipboard beside a garage-door opener unit, hand and clipboard only, no face.
>
> Output pixel dimensions, one export per card: **342×200 px** (mobile), **200×200 px**
> (tablet and desktop). Object-fit: cover per breakpoint as above.

---

## About (`/about`)

### `about-badge`

Route: `/about` · section: `about-intro` · kind: img · sizes: 342×171 (390) / 336×168 (768)
/ 532×266 (1440) · aspect 2:1 · object-fit: fill · aspect Δ: no

Per D-14 this slot is written as a plain photograph, never as a certification seal, badge,
or credential graphic.

> Wide 2:1 photograph of a small residential garage-door repair workshop interior — a
> pegboard wall with hand tools hung in neat rows, a workbench with spring-winding bars
> and a torque wrench laid out, natural light from a side window. No people, no visible
> brand markings, no certificates or plaques on the wall, no readable text anywhere in
> frame. Colour grade: workbench wood tones and wall shadows pushed toward primary
> maroon-brown `#3f1d25` (hue 6); a warm highlight on one hanging tool pushed toward
> accent burnt orange-red `#9d300f` (hue 36). Documentary editorial photography, natural
> light, moderate depth of field.
>
> Output pixel dimensions: **342×171 px** (390), **336×168 px** (768), **532×266 px**
> (1440). Object-fit: fill — compose the pegboard and workbench edge-to-edge with no
> important detail within 5% of any edge, since fill will not crop to protect it.

### `about-intro-photo`

Route: `/about` · section: `about-intro` · kind: img · sizes: 342×171 (390) / 720×360
(768) / 1112×556 (1440) · aspect 2:1 · object-fit: fill · aspect Δ: no

> Wide 2:1 photograph of a technician (plain dark workwear, no name patch, no logo, back
> or side to camera, not identifiable) inspecting an open garage-door opener rail from a
> stepladder inside a residential garage, daylight coming through the open door behind
> them creating a soft silhouette rim. No branded vehicles, no signage, no readable text.
> Colour grade: garage interior shadows toward primary maroon-brown `#3f1d25` (hue 6),
> daylight spill through the doorway carrying a warm cast toward accent burnt orange-red
> `#9d300f` (hue 36). Documentary editorial photography, natural light, moderate depth of
> field.
>
> Output pixel dimensions: **342×171 px** (390), **720×360 px** (768), **1112×556 px**
> (1440). Object-fit: fill — keep the technician and the opener rail centred with margin
> on all sides.

### `about-intro-secondary`

Route: `/about` · section: `about-intro` · kind: img · sizes: 342×171 (390) / 336×168
(768) / 532×266 (1440) · aspect 2:1 · object-fit: fill · aspect Δ: no

> Wide 2:1 close-up photograph of a technician's gloved hands adjusting a garage-door
> hinge with a hand tool, hands and hardware only, no face, no branded clothing visible.
> Neutral indoor garage setting, softly blurred in the background. Colour grade: metal
> hardware highlights toward accent burnt orange-red `#9d300f` (hue 36), background
> shadow toward primary maroon-brown `#3f1d25` (hue 6). Documentary editorial photography,
> shallow depth of field.
>
> Output pixel dimensions: **342×171 px** (390), **336×168 px** (768), **532×266 px**
> (1440). Object-fit: fill.

### `about-banner-bg`

Route: `/about` · section: `about-banner` · kind: background-image · aspect Δ: **yes**

| bp | px | aspect | object-fit |
|---|---|---|---|
| 390 | 390×803 | 390:803 | auto, cover |
| 768 | 768×794 | 768:794 | auto, cover |
| 1440 | 1440×772 | 1.87:1 | auto, cover |

> Tall-to-wide documentary photograph (composed to survive both a tall mobile crop and a
> short wide desktop crop) of the exterior of a suburban home with a closed garage door
> fully in frame, shot at dusk with the porch and garage lights on, warm ambient glow. No
> people, no vehicles, no visible house numbers, no signage, no logos. The garage door
> itself: a plain modern panel door in a muted neutral tone, no brand markings. Colour
> grade: dusk sky and shadow areas pushed toward primary maroon-brown `#3f1d25` (hue 6),
> the warm porch and garage-light glow pushed toward accent burnt orange-red `#9d300f`
> (hue 36), so the ambient light in the photo reads as this palette's accent rather than a
> generic warm-white bulb. Documentary editorial photography, blue-hour ambient light, no
> flash.
>
> Composition note: keep the garage door and porch light centred vertically in the middle
> 60% of the frame so both the very tall mobile crop (390×803) and the short wide desktop
> crop (1440×772) retain the door and the light source.
>
> Output pixel dimensions: **390×803 px** (mobile, tall crop), **768×794 px** (tablet,
> near-square tall crop), **1440×772 px** (desktop, wide crop). Object-fit: cover on all
> three.

---

## Services (`/services`)

### `services-banner-bg`

Route: `/services` · section: `services-banner` · kind: background-image · aspect Δ: **yes**

| bp | px | aspect | object-fit |
|---|---|---|---|
| 390 | 390×388 | ~1:1 | auto, cover |
| 768 | 768×294 | 2.61:1 | auto, cover |
| 1440 | 1440×277 | 5.20:1 | auto, cover |

> Photograph of a row of closed residential garage doors along a quiet suburban street,
> shot straight-on at eye level so the doors read as a strong horizontal band — composable
> from a near-square mobile crop to a very wide, short desktop banner crop. No people, no
> vehicles in the driveways, no house numbers, no signage, no logos, doors in plain muted
> neutral tones with no brand markings. Overcast even daylight, minimal shadow. Colour
> grade: the pavement and door shadow lines pushed toward primary maroon-brown `#3f1d25`
> (hue 6); one door in the row given a subtle warm highlight toward accent burnt
> orange-red `#9d300f` (hue 36) to anchor the palette without looking like a colour cast
> error. Documentary editorial photography, flat even light.
>
> Composition note: keep the door row centred in the middle third of the frame vertically
> so the very short 1440×277 crop and the taller 390×388 crop both retain the full row of
> doors without clipping their tops.
>
> Output pixel dimensions: **390×388 px** (mobile), **768×294 px** (tablet), **1440×277
> px** (desktop, wide banner). Object-fit: cover on all three.

### `services-card-01` through `services-card-06` (measured slots)

Route: `/services` · section: `services-list` · kind: img · sizes: 342×171 (390) / 336×168
(768) / 339×169 (1440) · aspect 2.01:1 · object-fit: cover · aspect Δ: **yes** (390 crop is
marginally wider-relative than 768/1440, both effectively ~2:1 but flagged in INVENTORY)

Each of the eight services in CONSTANTS gets one prompt; six carry measured reference
geometry (`services-card-01..06`), two (`07`, `08`) reuse `services-card-01`'s box (see
note below). Shared style block, one subject line per card:

> Wide 2:1 documentary photograph, tight on a single garage-door repair task, one
> technician or hands-only shot, plain dark workwear with no name patch or logo, no
> branded vehicle, no readable text or signage anywhere in frame. Neutral suburban garage
> or driveway setting, softly out of focus behind the subject. Colour grade: shadow and
> structural tones pushed toward primary maroon-brown `#3f1d25` (hue 6), one warm tool or
> hardware highlight pushed toward accent burnt orange-red `#9d300f` (hue 36).
> Documentary editorial photography, natural light, shallow depth of field.
>
> **`services-card-01`** — spring repair and replacement: gloved hands winding a torsion
> spring with a winding bar, spring hardware in sharp focus.
> **`services-card-02`** — opener repair and installation: technician mounting an opener
> motor unit to the garage ceiling track, shot from below at an angle.
> **`services-card-03`** — cable / roller / track repair: close shot of a steel roller
> being seated back into a bent section of track.
> **`services-card-04`** — panel replacement: technician lifting a single new door panel
> into a track, panel edge-on to show the fit.
> **`services-card-05`** — off-track and misaligned door correction: a door visibly
> canted off its track at one corner, technician's hand pointing at the gap.
> **`services-card-06`** — new residential door installation: a finished new plain panel
> door, closed, shot straight-on with a technician's toolbox visible in the foreground
> corner, out of focus.
>
> Output pixel dimensions, one export per card: **342×171 px** (390), **336×168 px**
> (768), **339×169 px** (1440). Object-fit: cover — compose the subject centred with even
> margin so the near-identical crops across breakpoints do not need separate composition.

### `services-card-07` / `services-card-08` (unmeasured, reuse `services-card-01`'s box)

Route: `/services` · section: `services-list` · same dimensions/aspect/object-fit as
`services-card-01` above — not a separately measured reference slot.

> Same style block as `services-card-01..06` above (dark workwear, no branding, palette
> toward `#3f1d25` shadow / `#9d300f` highlight, documentary natural light).
>
> **`services-card-07`** — commercial and roll-up doors: a wide steel roll-up door, partly
> raised, on a plain commercial building facade, no signage or business name visible.
> **`services-card-08`** — annual maintenance and tune-up: technician applying lubricant
> to a track with a small applicator, close on the tool and track only.
>
> Output pixel dimensions: **342×171 px** (390), **336×168 px** (768), **339×169 px**
> (1440). Object-fit: cover.

---

## Contact (`/contact`) and Privacy (`/privacy`)

No image slots. `docs/facts-needed.md` and `assets/INVENTORY.md` confirm both routes carry
no REPLACE slot beyond the shared header wordmark and the coordinate-only map embeds,
which are keyless `iframe`s per D-07/D-08, not generated images.

---

## Not written here — reference D-13/D-14 exclusions

- No testimonial photography, avatar, or headshot prompt exists. `/about` `about-banner`
  ships as literal `[TESTIMONIAL PLACEHOLDER]` text blocks (D-13) — never an image.
- No certification/BBB/manufacturer badge prompt exists anywhere. `about-badge` above is
  written as a workshop photograph, not a badge graphic (D-14); the chip rows carrying
  `TODO(fact): licence`, `TODO(fact): years`, etc. in `content/copy.ts` stay text, not
  image assets.

## Tally

| | count |
|---|---|
| REPLACE slots inventoried (`assets/INVENTORY.md`) | 16 |
| Prompts written for measured slots | 16 |
| Prompts written for unmeasured but rendered slots (service cards 4-8, 07-08) | 7 |
| Second crops written for aspect-Δ slots | 6 (`logo-wordmark`, `home-hero-bg`, `home-service-card-a/b/c` treated as one shared aspect-Δ note, `about-banner-bg`, `services-banner-bg`, `services-card-01..06` shared note) |
| DELETED slots (`about-blog-card-*`, `contact-locations-img-*`) | 5 — no prompt written, per D-01/D-02 |
| Logo entries | 1 (wordmark + icon lockup, two crops) |
