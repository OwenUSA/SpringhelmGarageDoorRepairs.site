# docs/PRE-LAUNCH.md — must-fix before this site is ever made public

Written at Prompt 10+11 (the final turn of the build chain). Nothing below is a build
defect — the acceptance sweep is clean (see `docs/divergence.md`,
`docs/known-divergence.md`, `.harness/contrast.json`, `.harness/rendertruth.json`). Every
item here is a **pre-public blocker**: something that must be replaced, supplied, or
performed before this site is shown to a real customer or deployed off `localhost`.

## 1. Every CONSTANTS-block business fact is fictional and deliberate (CLAUDE.md §0)

All ground truth for the build, all must-replace before public:

| fact | current (fictional) value |
|---|---|
| Business name | Springhelm Garage Door Repairs |
| Phone | (919) 555-0158 — reserved 555-01XX range, cannot ring anyone |
| Address | 2619 Halloway Trace, Apex, NC 27502 — does not exist |
| Map coordinates | 35.7327,-78.8503 — real Apex, NC coordinates, embedded by coordinate only (D-07), never geocoded from the fake address |
| Hours | 7 days, 7:00 AM – 7:00 PM |
| Service area | Serving Apex and the west Raleigh metro |
| Tagline | "One number, one technician, no handoffs." |

## 2. Every `TODO(fact):` in `content/copy.ts` — 21 occurrences, 11 distinct facts

Reconciled against `docs/facts-needed.md`, which is current. Open facts, never guessed
(D-17): `years`, `licence`, `insurance`, `teamSize`, `jobsDone` (reserved, not yet
rendered), `responseTime` (deliberately unanswered — see facts-needed.md), `brands`,
`warranty`, `logo` (asset, prompt written in `docs/asset-prompts.md`), `testimonials`
(D-13 — no name, star, count, or review schema until real, permitted testimonials exist),
`policyDate`. None of these may be filled with an invented value; each must come from the
real business before launch.

## 3. Image assets — 16 REPLACE slots, zero downloaded

`docs/asset-prompts.md` (this turn's deliverable) has one Nano Banana Pro prompt per slot,
geometry per breakpoint, and the applied palette hues named. Every slot currently renders
a flat placeholder SVG. The logo ships as a **text wordmark set in Ubuntu**, not an image,
until a logo asset is supplied and dropped in per OVERRIDE 3.

## 4. Gates DROPPED from this chain's acceptance sweep (A-4) — now blockers instead

Two gates named in `process.md` were dropped from every prompt in this chain and were
**never substituted with anything else**. Both must be run for real before this site is
public:

- **Performance never measured.** No Lighthouse run has ever been made against any of the
  five routes, on any device profile, at any point in this build. Bundle size in the
  `pnpm build` output (~102-107 kB First Load JS per route) is the only performance signal
  that exists, and it is not a substitute for Core Web Vitals, real-device timing, or an
  accessibility/SEO Lighthouse pass.
- **Keyboard access is spec-verified only, never hand-tested.** The mobile nav drawer's
  focus trap, Escape-to-close, scroll lock, and `noscript` fallback are implemented to a
  written spec (`docs/behavior/01-mobile-nav-drawer.md`) and covered by the programmatic
  contrast/target-size gates, but no human has ever tabbed through the site with a keyboard
  and no eyes. A manual pass — every route, every interactive control, tab order, visible
  focus ring, trap entry/exit — is required before public launch.

## 5. Gates run for real this turn, all clean — listed for completeness, not blockers

`pnpm build`, `tsc --noEmit`, email sweep, locations sweep, NAP/hours consistency, both map
embeds, internal link crawl + custom 404, contrast.mjs (0 FAIL), rendertruth.mjs
(0 findings), the structural sweep (81 rows / 12 FAIL, all 12 the documented `(page)`
height floor / 67 PASS / 0 BLOCKED), the similarity gate (34/34, 20/20), metadata/robots/
sitemap. None of these are blockers — they are the record that the clone-and-adapt
mechanics are sound. Re-run them again after Lighthouse and the manual keyboard pass are
done, and again after real assets and real facts are dropped in, since none of that has
happened yet.

## 6. Legal / compliance review

**RESOLVED (2026-09-03):** the internal `UNREVIEWED TEMPLATE — requires legal review
before launch` dev marker that D-16 required during the build was found still visibly
rendered on the live `/privacy` page (via `content/copy.ts`'s `reviewNotice` field,
rendered by `components/sections/PrivacyBody.tsx`) after the site went live with real
business facts. It has been removed from both files, along with the comment references to
it. The privacy policy now reads as ordinary, confident policy language with no leftover
review flag. Every clause still matches what this site's build actually does (no email
collection, no analytics, no cookies beyond the framework's own) — if any of that changes
(an analytics tag gets added, a real form backend gets wired up), the policy text must be
revised to match, not left describing a stub that no longer exists.

## 7. The contact form has no backend

`components/sections/ContactForm.tsx` is marked `// STUB: no submission target` at its top
(D-05). It validates client-side and shows a "we'll call you back" confirmation state, then
`console.warn`s a stub notice — nothing is transmitted anywhere. A real submission target
(and a decision about what receives a callback request, since D-03 forbids email as that
target) is required before this form can take a real customer's information.

## 8. Local-only build, no deployment configured (D-18)

No `.env`, no third-party keys, no auth, no hosting target. `SITE_URL` in
`lib/business.ts` is a placeholder domain (`springhelmgaragedoorrepairs.site`) used only so
`robots.ts`/`sitemap.ts`/JSON-LD can emit well-formed absolute URLs — it has not been
registered or pointed at anything and must be confirmed or replaced before any real
`sitemap.xml` is submitted to a search console.
