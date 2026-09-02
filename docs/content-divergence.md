# docs/content-divergence.md — Prompt 3

Every word this site renders lives in `content/copy.ts`. This file records what the two
lexical gates measured against the reference, and names the four structural changes.

Reference corpus extracted by `node ../_shared/harness/src/refcopy.mjs` from the **saved
local copy** in `reference/raw/`, served on `http://127.0.0.1:3210` with the served
`<title>` verified as `Roofing Solutions NC LLC` before extraction. The live site was never
fetched.

Re-run the gate at any time:

```bash
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/similarity.mjs
```

## Result

| gate | rule | result |
|---|---|---|
| **5-gram** | zero shared 5-grams with the ENTIRE reference corpus, not just the paired section | **34 / 34 pass** |
| **trigram Jaccard** | ≤ 0.15 against the paired reference section, stopwords and industry allowlist stripped | **34 / 34 pass**, highest single value **0.002** |
| **length** | within ±10% of the paired reference section's character count | **20 / 20 measured sections pass** |
| **exemptions taken** | | **ZERO.** `cfg.lengthExempt` is empty. |

## No exemption was taken, and one was very nearly warranted

This reference is the smallest in the fleet — four home bands, thirty-one sections — so the
±10% rule is tighter here than anywhere else: there is less text per band to move around.
Two bands looked unhittable and neither turned out to be.

**The home hero measured 861 characters.** Our hero has a heading, a sub-heading and two
button labels; writing 861 characters into it would have made the band wrong, not honest. It
was tempting to book that as "the rule genuinely cannot apply".

It could apply. The 861 was **an instrument defect, not a target.** `refcopy.mjs` read text
through `textContent`, which returns `display:none` and `visibility:hidden` subtrees — and a
GoDaddy header ships the same nav list **three times** (desktop bar, "More" overflow menu,
mobile drawer) and the same H1 **twice**, with all but one hidden at any given width. 224
characters of actual words were being reported as 861, a 3.8× inflation, and the exemption
would have been granted against a number that was never real. The same failure mode the
harness already documents for `<noscript>` twins, arriving by a different route.

The fix is in the shared instrument and is general: hidden nodes are marked on the live tree
at the measured width and stripped before the text is read. Every reference target on this
site dropped to its painted value — home s00 from 861 to **185**, `/services` s02 from 2238
to **1900**, the shared nav band from 271 to **61** — and all twenty measured sections then
landed inside ±10% with ordinary editing.

**The two `Connect With Us` bands measure fifteen characters.** `/about` s04 and `/contact`
s03 are a heading plus a row of social icons, and D-09 forbids inventing social accounts.
Rather than exempt a 15-character band, the contract was corrected: `contact-hours` became
`contact-connect`, its NAP-and-hours content moved into `contact-form` — which is where the
**reference's own** form band already carries the address and a Mon–Sun hours table — and
both bands now hold a single short call heading. `/about` ships 14 characters against 15;
`/contact` ships 16.

A second instrument fix was needed for the header band: `href` and `src` values were being
counted as copy. A nav object carrying five routes contributed 32 characters of URL to a
band whose real target is 61 characters of words. Both keys joined `id` / `refSection` /
`cls` in the gate's structural-key set.

## Per-section overlap

`Δ%` is our character count against the paired reference section. Rows with `—` in the ref
column are NOVEL and have no length target; `(metadata)` rows carry the route's title and
description and are gated lexically but have no counterpart to be measured for length.

| route | our section | ref section | our chars | ref chars | Δ% | 5-grams | trigram | length | status |
|---|---|---|---|---|---|---|---|---|---|
| / | `site-header` | — | 65 | — | — | 0 | 0.000 | n/a | **PASS** |
| / | `hero` | `s00-8bfc40ab-0a94-44df` | 198 | 185 | +7% | 0 | 0.000 | PASS | **PASS** |
| / | `services-grid` | `s02-fb5ab59e-a191-4386` | 1990 | 2129 | -6.5% | 0 | 0.000 | PASS | **PASS** |
| / | `mission` | `s01-135f9822-117a-4b01` | 363 | 396 | -8.3% | 0 | 0.000 | PASS | **PASS** |
| / | `service-area-map` | — | 194 | — | — | 0 | 0.000 | n/a | **PASS** |
| / | `site-footer` | `s03-aa99edc2-9e1b-47b8` | 224 | 208 | +7.7% | 0 | 0.000 | PASS | **PASS** |
| / | `mobile-call-bar` | — | 37 | — | — | 0 | 0.000 | n/a | **PASS** |
| / | `(metadata)` | `metadata` | 203 | — | — | 0 | 0.000 | n/a | **PASS** |
| /about | `site-header` | `s00-8bfc40ab-0a94-44df` | 65 | 61 | +6.6% | 0 | 0.000 | PASS | **PASS** |
| /about | `about-banner` | `s02-a2df0b9d-1e65-4d9b` | 507 | 467 | +8.6% | 0 | 0.000 | PASS | **PASS** |
| /about | `about-intro` | `s01-cc079ee9-3097-4a36` | 1286 | 1423 | -9.6% | 0 | 0.000 | PASS | **PASS** |
| /about | `about-cta` | `s04-da4df260-12ed-4b0c` | 14 | 15 | -6.7% | 0 | 0.000 | PASS | **PASS** |
| /about | `site-footer` | `s05-aa99edc2-9e1b-47b8` | 224 | 208 | +7.7% | 0 | 0.000 | PASS | **PASS** |
| /about | `mobile-call-bar` | — | 37 | — | — | 0 | 0.000 | n/a | **PASS** |
| /about | `(metadata)` | `metadata` | 205 | — | — | 0 | 0.000 | n/a | **PASS** |
| /services | `site-header` | `s00-8bfc40ab-0a94-44df` | 65 | 61 | +6.6% | 0 | 0.000 | PASS | **PASS** |
| /services | `services-list` | `s02-40dbc796-8809-4de1` | 1737 | 1900 | -8.6% | 0 | 0.000 | PASS | **PASS** |
| /services | `services-faq` | — | 1404 | — | — | 0 | 0.000 | n/a | **PASS** |
| /services | `services-banner` | `s01-13e60568-832a-4443` | 100 | 108 | -7.4% | 0 | 0.000 | PASS | **PASS** |
| /services | `site-footer` | `s03-aa99edc2-9e1b-47b8` | 224 | 208 | +7.7% | 0 | 0.000 | PASS | **PASS** |
| /services | `mobile-call-bar` | — | 37 | — | — | 0 | 0.000 | n/a | **PASS** |
| /services | `(metadata)` | `metadata` | 215 | — | — | 0 | 0.000 | n/a | **PASS** |
| /contact | `site-header` | `s00-8bfc40ab-0a94-44df` | 65 | 61 | +6.6% | 0 | 0.000 | PASS | **PASS** |
| /contact | `contact-connect` | `s03-10fb85d2-e1cf-4b76` | 16 | 15 | +6.7% | 0 | 0.000 | PASS | **PASS** |
| /contact | `contact-form` | `s01-0b5ed9f0-d323-4637` | 684 | 659 | +3.8% | 0 | 0.000 | PASS | **PASS** |
| /contact | `contact-map` | — | 110 | — | — | 0 | 0.000 | n/a | **PASS** |
| /contact | `site-footer` | `s04-aa99edc2-9e1b-47b8` | 224 | 208 | +7.7% | 0 | 0.000 | PASS | **PASS** |
| /contact | `mobile-call-bar` | — | 37 | — | — | 0 | 0.000 | n/a | **PASS** |
| /contact | `(metadata)` | `metadata` | 205 | — | — | 0 | 0.000 | n/a | **PASS** |
| /privacy | `site-header` | `s00-8bfc40ab-0a94-44df` | 65 | 61 | +6.6% | 0 | 0.000 | PASS | **PASS** |
| /privacy | `privacy-body` | `s01-5fa47a62-93ca-4033` | 2708 | 2509 | +7.9% | 0 | 0.002 | PASS | **PASS** |
| /privacy | `site-footer` | `s02-aa99edc2-9e1b-47b8` | 224 | 208 | +7.7% | 0 | 0.000 | PASS | **PASS** |
| /privacy | `mobile-call-bar` | — | 37 | — | — | 0 | 0.000 | n/a | **PASS** |
| /privacy | `(metadata)` | `metadata` | 231 | — | — | 0 | 0.000 | n/a | **PASS** |

## The four structural changes

The gate requires all four. Each is named here and mirrored in `docs/sections.md`.

### 1. Reorder — four sections moved, across four routes

| id | route | what moved |
|---|---|---|
| **R1** | `/` | `mission` moves **below** `services-grid`. Reference order is hero → mission → grid; ours is hero → grid → mission. The proposition lands after the reader has seen what we actually fix, not before. |
| **R2** | `/about` | `about-banner` (s02) moves **above** `about-intro` (s01). The statement band leads the page; the long prose follows it. |
| **R3** | `/services` | `services-banner` (s01) moves from the **top to the bottom**, below the list and the FAQ, and `services-list` (s02) moves up to lead. A call CTA belongs after the reader has found their symptom. |
| **R4** | `/contact` | `contact-connect` (s03) moves from **last content band to first**, above the form. The page's point is the phone number; it is not put underneath a form. |

Reordering does not break pairing: the harness pairs on declared identity from Table B, not
on ordinal (`selftest.mjs`, defect #2). It is also not a class change.

### 2. Drop two reference sections, add two of our own

**Dropped** (both already DELETED rows in `docs/sections.md`):

| id | ref band | h@1440 | why |
|---|---|---|---|
| **D1** | `/about` s03 `...-my-blog` | 2747px | Blog feed. Out of scope, D-01. The `/` blog band is *retained* as our services grid because it carries the only rich card-grid geometry in the reference; this one is a bare feed with nothing to reuse. |
| **D2** | `/contact` s02 `...-locations` | 533px | Multi-city locations grid. D-02 — deleted wholesale, along with every nav item, footer link and internal anchor pointing at it. A single `SERVICE_AREA` sentence in the footer is the only survivor. |

**Added** (NOVEL, no reference counterpart exists anywhere on the site):

| id | our section | route | why |
|---|---|---|---|
| **A1** | `service-area-map` | `/` | D-08 requires a home map. The reference embeds **zero** maps on any of its five pages. |
| **A2** | `services-faq` | `/services` | In-page FAQ, generic garage-door technical content. The reference has **zero** accordions, tabs and carousels. |

(`contact-map`, `mobile-call-bar` and `/`'s `site-header` are also NOVEL additions, but the
gate asks for two and these are the two that add *content* rather than shell behaviour.)

### 3. The proposition, held on all five routes

**"A real person answers the phone."** One number reaches one technician, with no handoffs.
Not speed — the reference leads on a 24-hour response promise and we deliberately do not
answer it. Not workmanship, not transparency; siblings hold those.

| route | where it is held | the words |
|---|---|---|
| `/` | `hero` | "Ring Springhelm and a garage door technician picks up. Not a dispatcher, not a queue, not somebody who rings back." |
| `/` | `mission` | "The person who answers this phone is the person who will be standing in your driveway." |
| `/about` | `about-intro` | "…one deliberately old-fashioned rule: the number on this site reaches a technician, and that technician is the one who turns up." Paragraph three is entirely about why handing the call to a dispatcher breaks the chain. |
| `/services` | `services-list` intro + `services-banner` | "Describe the noise to the person who is going to fix it. No middle step." |
| `/contact` | `contact-connect` + `contact-form` sub | "Ringing is faster. If you would rather be called back, leave a window and a technician will use it." |
| `/privacy` | `privacy-body` | "Until that changes, the phone number is the only reliable way to reach us." — the policy holds it by *consequence* rather than by slogan, which is the only honest way a privacy page can. |

### 4. Services regrouped by SYMPTOM

On `/services`, `services-list` is organised by what the customer is looking at, not by
system or material. **All eight CONSTANTS services appear exactly once**, each in exactly
one group:

| symptom group | services in it |
|---|---|
| "Your door will not close" | Off-track and misaligned door correction · Cable, roller, and track repair |
| "It is loud" | Opener repair and installation · Annual maintenance and tune-up |
| "The spring snapped" | Spring repair and replacement |
| "It looks wrecked" | Panel replacement · New residential door installation |
| "The bay door is down and the shop has stopped" | Commercial and roll-up doors |

Count: 2 + 2 + 1 + 2 + 1 = **8**, no repeats, none missing.

The home `services-grid` lists the same eight as plain cards — once each — because it
inherits a card-grid band and cards are what it is shaped for. The symptom regrouping is the
`/services` structure, which is where a visitor arrives already knowing their symptom.

## Invented facts: none

Nine `TODO(fact)` entries render **visibly** in the copy rather than sitting in a comment —
years in business, licence number, insurance carrier, team size, jobs completed, response
time, opener brands carried, warranty terms, and the logo asset. Full list with the reference
claim each one replaces: `docs/facts-needed.md`.

Specifically **not** invented, where the reference asserts them: "Eastern NC's Only Owens
Corning Platinum Preferred Roofer" (a certification), "Licensed and a Fully Insured General
Contractor L.105085" (a licence number), "100% recommend / Based on the opinion of 38 people"
plus three attributed customer reviews with names and dates (D-13 — replaced by literal
`[TESTIMONIAL PLACEHOLDER]` blocks at realistic length, and **no** `Review` or
`AggregateRating` JSON-LD anywhere), and "Response Within 24 Hours" (a response-time claim,
D-17).

## SEO metadata

Titles and descriptions went through the same two lexical gates in the same pass, as the
`(metadata)` rows above. All five pass.

They live in `content/copy.ts` under `routes[...].meta` and **every route file reads them
from there**. No route file declares a literal title or description. Two sibling sites
shipped metadata defects that no gate caught — one hardcoded the wrong city into five
blocks, the other let `title.template` append the brand while route titles also named it, so
every subpage served the brand twice.

Both are structurally prevented here: there is **no `title.template`** in `app/layout.tsx`,
and nothing is concatenated onto a title after the fact. And the check that actually found
the sibling defect was made over the wire, not by reading config:

```
$ curl -s http://127.0.0.1:3110<route> | grep -oE '<title>[^<]*</title>'

/          Springhelm Garage Door Repairs — Apex, NC
/about     About Springhelm Garage Door Repairs — Apex, NC
/services  Garage Door Services by Symptom — Springhelm, Apex NC
/contact   Contact Springhelm Garage Door Repairs — Apex, NC
/privacy   Privacy Policy — Springhelm Garage Door Repairs
```

Brand named exactly once per title; correct city on all five; no duplication.

## The privacy body, checked specifically

Two sibling sites had genuine lifts caught here — "we are not responsible for", "we do not
knowingly collect" — boilerplate that reads generic but is copied. This body was written
against that risk and measures **0 shared 5-grams and a trigram Jaccard of 0.002**, the
highest single trigram value anywhere on the site and still two orders of magnitude under
the 0.15 ceiling.

It also holds D-16 and D-15 literally: the policy describes a site with no cookies beyond a
framework technical cookie, no analytics, no tag manager, no pixel, no chat widget, no
consent banner and no email field, because that is what we ship. It does **not** describe
cookies we did not set. It carries the `UNREVIEWED TEMPLATE — requires legal review before
launch` notice and claims neither GDPR nor CCPA compliance.
