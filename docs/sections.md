# docs/sections.md — the section contract (source of truth)

Reference: `roofingsolutionsnc.com`, profiled from `reference/raw/` (see `docs/profile.md`).
Section ids below are the **probe's own SECTION IDs at the canonical breakpoint (1440)**,
never ordinals. They are stable: every band carries a GoDaddy GUID in its `id` attribute, so
the id list is byte-identical at 390 / 768 / 1440 on all five routes.

## THERE ARE TWO TABLES IN THIS FILE AND THEY MUST BE EDITED TOGETHER

- **Table A** is human-readable. Nothing parses it.
- **Table B** is machine-readable and is the ONLY thing `diff.mjs` reads. Its column order
  is fixed: `| /route | ref-section-id | our-section-id | CLASS | reason |`.

If you change a class, a mapping, or an id, change it in **both**. A contract that mentions
class names but matches no rows is a hard error in `diff.mjs` (two sibling sites parsed ZERO
rows and a third parsed 5 of 88 — every one looked fine, because the file was full of the
word ADAPTED).

An **ADAPTED or FIDELITY row with an empty ref column is silently unmeasurable** — it skips
the structural comparison and the length rule. Only NOVEL and DELETED legitimately have an
empty ref column here, and even then a ref id is supplied wherever the NOVEL band replaces
a real reference band.

## Class counts

| class | rows | how measured |
|---|---|---|
| FIDELITY | **0** | — |
| ADAPTED | 20 | structural deviation `< 5%`, colour excluded (A-8), advisory fields excluded (A-12) |
| NOVEL | 9 | token conformance, 0 violations, single pass (A-9) |
| DELETED | 2 | not built; single pass (A-9) |
| **total** | **31** | |

**Zero FIDELITY, and none was forced.** Every retained band has its business name, phone,
address, service list, copy and imagery replaced (D-09, D-10), which is the definition of
ADAPTED. The reference is a roofing company on a GoDaddy builder; there is no band whose
content is structurally equivalent to ours. Ten of eleven fleet sites landed at 0–3 here.

## Two contract decisions worth stating explicitly

1. **The home header band and the hero are one band in the reference.** `s00-8bfc40ab-...`
   is 901px on `/` (background image + tagline + CTA) but a bare 136px nav bar on all four
   subpages. Our shell renders the nav as its own band on every route. So on `/` the ref
   band s00 is mapped to our **hero** (the substantive content), and our **site-header** on
   `/` is NOVEL; the nav bar itself is still measured as ADAPTED against s00 on the four
   subpages, so nothing goes unmeasured. Mapping s00 to two of our sections would collide in
   the harness's ref-id → our-id alias map, where the last row silently wins.
2. **The home blog band becomes our services grid.** `s02-...-blog` (2110px at 1440) is the
   only rich card-grid layout in the whole reference: a chip row plus a responsive card
   grid. We ship no blog (D-01), but retaining the band and swapping its content — category
   chips → service filters removed, post cards → service cards — is exactly what ADAPTED
   means, and it preserves the only measurable grid geometry the reference offers. The
   `/about` blog band has no such reuse (it is a bare feed) and is DELETED.

---

## Table A — human-readable

### `/` (4 reference bands → 6 built sections)

| our section | ref band | h@1440 | class | note |
|---|---|---|---|---|
| `site-header` | (inside s00) | — | NOVEL | lifted out of the reference's merged header+hero band |
| `hero` | s00 `...eastern-nc-s-only-owens-corning-pl` | 901 | ADAPTED | tagline, sub-tagline, call CTA, background photo slot |
| `services-grid` | s02 `...-blog` | 2110 | ADAPTED | blog card grid → our eight services. **Moved up (R1).** |
| `mission` | s01 `135f9822` | 213 | ADAPTED | one-line proposition band — "a real person answers the phone". **Moved down (R1)**, so the proposition lands after the reader has seen what we fix. |
| `service-area-map` | — | — | NOVEL | D-08 requires a home map; the reference embeds none |
| `site-footer` | s03 `aa99edc2` | 386 | ADAPTED | NAP, hours, SERVICE_AREA sentence; all `/locations/*` links scrubbed |
| `mobile-call-bar` | — | — | NOVEL | D-04 sticky call bar; the reference has no sticky element at all |

### `/about` (6 reference bands → 5 built sections)

| our section | ref band | h@1440 | class | note |
|---|---|---|---|---|
| `site-header` | s00 `8bfc40ab` | 136 | ADAPTED | the nav bar proper |
| `about-banner` | s02 `...-built-on-trust-driven-by-quality` | 772 | ADAPTED | full-bleed statement band. Reference fills it with a review widget (aggregate rating + three attributed reviews); ours carries `[TESTIMONIAL PLACEHOLDER]` blocks per D-13. **Moved up (R2).** |
| `about-intro` | s01 `...-about-us` | 1604 | ADAPTED | who we are; no credentials or years invented (D-14). **Moved down (R2).** |
| — | s03 `...-my-blog` | 2747 | **DELETED** | blog feed; out of scope (D-01) |
| `about-cta` | s04 `...-connect-with-us` | 224 | ADAPTED | social-links band → a short call band. We invent no social accounts. Reference copy in this band is 15 characters; ours is 14. |
| `site-footer` | s05 `aa99edc2` | 386 | ADAPTED | shared shell |
| `mobile-call-bar` | — | — | NOVEL | shared shell |

### `/services` (4 reference bands → 5 built sections)

| our section | ref band | h@1440 | class | note |
|---|---|---|---|---|
| `site-header` | s00 `8bfc40ab` | 136 | ADAPTED | shared shell |
| `services-list` | s02 `...-expert-roofing-services-for-your-h` | 1065 | ADAPTED | the eight services from CONSTANTS, **regrouped by SYMPTOM (G1)**, each appearing in exactly one group. **Moved up (R3).** |
| `services-faq` | — | — | NOVEL | in-page FAQ, `/services` only; the reference has zero accordions |
| `services-banner` | s01 `...-experience-quality-roofing-service` | 277 | ADAPTED | CTA banner; no price, no response time (D-12, D-17). **Moved to the bottom (R3)**, where a call CTA belongs once the reader has found their symptom. |
| `site-footer` | s03 `aa99edc2` | 386 | ADAPTED | shared shell |
| `mobile-call-bar` | — | — | NOVEL | shared shell |

### `/contact` (5 reference bands → 6 built sections)

| our section | ref band | h@1440 | class | note |
|---|---|---|---|---|
| `site-header` | s00 `8bfc40ab` | 136 | ADAPTED | shared shell |
| `contact-connect` | s03 `...-connect-with-us` | 224 | ADAPTED | **RENAMED** from `contact-hours`, and **moved to the top (R4)**. The page's point is the phone number, so it is not buried under a form. Social links → a short call band; 15 reference characters, 16 of ours. |
| `contact-form` | s01 `...-contact-us` | 969 | ADAPTED | D-05 fields only. Reference's Email\*, marketing consent and reCAPTCHA are all dropped. **The NAP block and the hours live here**, which is where the reference band already carried them. |
| `contact-map` | — | — | NOVEL | D-08 map beside the form, embedded by MAP_COORDS |
| — | s02 `...-locations` | 533 | **DELETED** | multi-city locations grid; D-02 |
| `site-footer` | s04 `aa99edc2` | 386 | ADAPTED | shared shell |
| `mobile-call-bar` | — | — | NOVEL | shared shell |

### `/privacy` (3 reference bands → 4 built sections)

| our section | ref band | h@1440 | class | note |
|---|---|---|---|---|
| `site-header` | s00 `8bfc40ab` | 136 | ADAPTED | shared shell |
| `privacy-body` | s01 `...-privacy-policy` | 1848 | ADAPTED | our own policy text (D-16); reference's cookie/email clauses do not apply |
| `site-footer` | s02 `aa99edc2` | 386 | ADAPTED | shared shell |
| `mobile-call-bar` | — | — | NOVEL | shared shell |

---

## Table B — machine-readable. `diff.mjs` reads ONLY this.

Column order is fixed: `| /route | ref-section-id | our-section-id | CLASS | reason |`

| /route | ref-section-id | our-section-id | CLASS | reason |
|---|---|---|---|---|
| / |  | site-header | NOVEL | reference merges the nav into the hero band on home only; the nav bar is measured against s00 on the four subpages |
| / | s00-8bfc40ab-0a94-44df-9c3c-e207b8bf291c-eastern-nc-s-only-owens-corning-pl | hero | ADAPTED | band retained, all copy and the photo slot swapped per D-09/D-10 |
| / | s01-135f9822-117a-4b01-b1dc-9ac033c3d647 | mission | ADAPTED | mission band retained, proposition swapped to a real person answers the phone |
| / | s02-fb5ab59e-a191-4386-b2d2-3e5f2f5b67f3-blog | services-grid | ADAPTED | blog card grid retained as geometry, cards swapped to the eight services; we ship no blog per D-01 |
| / |  | service-area-map | NOVEL | D-08 requires a home map section; the reference embeds no map anywhere |
| / | s03-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd | site-footer | ADAPTED | footer retained, NAP swapped, locations column scrubbed per D-02 |
| / |  | mobile-call-bar | NOVEL | D-04 sticky call bar; reference has zero sticky elements |
| /about | s00-8bfc40ab-0a94-44df-9c3c-e207b8bf291c | site-header | ADAPTED | nav bar retained, logo and links swapped, out-of-scope routes scrubbed |
| /about | s01-cc079ee9-3097-4a36-99bf-9be2910325f9-about-us | about-intro | ADAPTED | intro band retained, copy written fresh at matching length per D-10 |
| /about | s02-a2df0b9d-1e65-4d9b-9922-d9ddeb8e7097-built-on-trust-driven-by-quality | about-banner | ADAPTED | statement banner retained, wording replaced, no credentials invented per D-14 |
| /about | s03-3642a9a3-5dd5-4e0d-b5fe-c7885f4f98e9-my-blog | about-blog | DELETED | blog feed; out of scope per D-01 |
| /about | s04-da4df260-12ed-4b0c-a191-41345ba3c6ed-connect-with-us | about-cta | ADAPTED | social-links band retained as geometry, content swapped to a call CTA; we invent no social accounts |
| /about | s05-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd | site-footer | ADAPTED | shared shell, same footer band as every route |
| /about |  | mobile-call-bar | NOVEL | shared shell, D-04 |
| /services | s00-8bfc40ab-0a94-44df-9c3c-e207b8bf291c | site-header | ADAPTED | shared shell nav bar |
| /services | s01-13e60568-832a-4443-be52-6e2b69203ea4-experience-quality-roofing-service | services-banner | ADAPTED | CTA banner retained, copy swapped, no price or response time per D-12 and D-17 |
| /services | s02-40dbc796-8809-4de1-bbf0-41172d7089a6-expert-roofing-services-for-your-h | services-list | ADAPTED | service grid retained, the eight garage-door services substituted |
| /services |  | services-faq | NOVEL | in-page FAQ on /services only; the reference has zero accordions |
| /services | s03-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd | site-footer | ADAPTED | shared shell |
| /services |  | mobile-call-bar | NOVEL | shared shell, D-04 |
| /contact | s00-8bfc40ab-0a94-44df-9c3c-e207b8bf291c | site-header | ADAPTED | shared shell nav bar |
| /contact | s01-0b5ed9f0-d323-4637-8f34-841c8a524529-contact-us | contact-form | ADAPTED | form band retained, fields replaced with the D-05 set; email input, consent copy and reCAPTCHA dropped per D-03 and D-15 |
| /contact |  | contact-map | NOVEL | D-08 map beside the form, embedded by MAP_COORDS; reference embeds none |
| /contact | s02-bb818e7c-dc06-4053-af02-5084250a3c5c-locations | contact-locations | DELETED | multi-city locations grid, deleted wholesale per D-02 |
| /contact | s03-10fb85d2-e1cf-4b76-aa86-f4fec0038f75-connect-with-us | contact-connect | ADAPTED | social band retained as geometry, content swapped to a short call band; NAP and hours moved into contact-form, where the reference band already carried them |
| /contact | s04-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd | site-footer | ADAPTED | shared shell |
| /contact |  | mobile-call-bar | NOVEL | shared shell, D-04 |
| /privacy | s00-8bfc40ab-0a94-44df-9c3c-e207b8bf291c | site-header | ADAPTED | shared shell nav bar |
| /privacy | s01-5fa47a62-93ca-4033-8c12-75bea1c9a6c3-privacy-policy | privacy-body | ADAPTED | policy band retained, body replaced with a policy matching what we actually ship per D-16 |
| /privacy | s02-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd | site-footer | ADAPTED | shared shell |
| /privacy |  | mobile-call-bar | NOVEL | shared shell, D-04 |

---

## Prompt 3 amendments — what moved, what was renamed, what was reclassified

Both tables above were edited **together**, as a single machine twin pair. Class counts are
unchanged: **0 FIDELITY / 20 ADAPTED / 9 NOVEL / 2 DELETED = 31 rows.**

### Reordering, dropping and regrouping are NOT class changes

Stated explicitly because it is the easy mistake: `R1`–`R4` move sections, `D1`/`D2` delete
them, and `G1` regroups the service list. None of that alters what a section IS relative to
its reference counterpart, so none of it moves a row between FIDELITY / ADAPTED / NOVEL.
Pairing survives reordering because the harness pairs on **declared identity**, not ordinal
(`_shared/harness/test/selftest.mjs`, defect #2).

### One rename

`/contact` `contact-hours` → **`contact-connect`**, in both tables. The old name promised
NAP-plus-hours in a band whose reference counterpart is fifteen characters long
("Connect With Us" plus a row of social icons). Hours and address now sit in `contact-form`,
which is where the reference's own form band already carried them — its s01 contains the
address, a two-branch phone list and a Mon–Sun hours table. The rename makes the contract
describe the band that is actually being built.

### Reclassification: examined five rows, changed zero classes

Every ADAPTED row on this site has swapped content by definition, so "content changed"
cannot be the trigger — the question is whether any row's reference counterpart has stopped
informing our band at all. Five were candidates:

| row | why it looked like a reclassification | verdict |
|---|---|---|
| `/about` `about-banner` | The reference band is a third-party review widget: an aggregate rating, "38 people", and three attributed customer reviews. D-13 forbids inventing any of it and bans the JSON-LD outright, so **none** of its information survives. | **Stays ADAPTED.** The band's geometry — a full-bleed 772px statement banner with a heading and a three-card row — is exactly what we build, with `[TESTIMONIAL PLACEHOLDER]` blocks in the cards. Downgrading it to NOVEL would surrender the structural measurement of a real 772px band and buy nothing. |
| `/` `services-grid` | Reference band is a blog feed (category chips, post cards, excerpts, dates); ours is eight service cards. | **Stays ADAPTED.** The grid is the reuse, and it is the only rich card-grid geometry the whole reference offers. |
| `/services` `services-list` | Ours is regrouped by symptom rather than by system. | **Stays ADAPTED.** A regroup is a reordering of the same cards inside the same grid. |
| `/privacy` `privacy-body` | The reference policy describes cookies, analytics, email collection and reCAPTCHA. We ship none of those, so roughly half its clauses have no counterpart and the rest are inverted rather than swapped. | **Stays ADAPTED.** Structurally it remains a long prose band of heading/paragraph pairs, and its 2509-character target is both reachable and worth testing the band against. |
| `/` `mission` | The reference band's second paragraph is entirely a licence-and-insurance credential claim, which D-14 forbids us from inventing. | **Stays ADAPTED.** Same purpose, same shape: a short statement band. The credential renders as a visible `TODO(fact)`. |

### No ADAPTED or FIDELITY row has an empty ref-section-id

Checked against Table B after the edits. The empty-ref rows are `site-header` on `/` only
(NOVEL by contract decision 1), `service-area-map`, `contact-map`, `services-faq`, and
`mobile-call-bar` on all five routes — every one NOVEL, every one legitimately unpaired. An
ADAPTED row with an empty ref column would skip both the structural comparison and the
length rule silently; `diff.mjs` warns, and there is nothing here for it to warn about.
