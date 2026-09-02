# RESUME — Springhelm Prompt 5+9, STOPPED DELIBERATELY mid-flight

**Cause:** the operator stopped this agent ahead of the account rate limit. Not a crash.
`npx tsc --noEmit` is **CLEAN**. Nothing was rolled back.

## Where it stopped
Its last words were: *"Two real defects, both latent in the shell — exactly the class the
brief warned about. Fixing the causes."* **Those fixes are NOT confirmed landed.** Re-run
both gates and re-derive rather than assuming either is in; do not spend an attempt on
something already fixed, and do not assume one landed that did not.

## Landed
```
components/  BusinessMap.tsx  MobileCallBar.tsx  Reveal.tsx  SiteFooter.tsx  SiteHeader.tsx
lib/         business.ts
app/         not-found.tsx  robots.ts  sitemap.ts   (all three NEW — four sibling sites
             reached their final sweep and found these missing)
modified     all five route pages, globals.css, layout.tsx, harness.config.mjs
```
Applied palette is in `app/globals.css`: `--color-primary: #3f1d25`, `--color-accent:
#9d300f` — inside the assigned 5-25 red/orange window.

## ⚠ NOT YET DONE — the seed is not recorded
`docs/known-divergence.md` still has only the placeholder headings for the palette seeds.
**The winning seed and all five candidate seeds must be written there**, and the emitted
ramp confirmed against `app/globals.css` before doing so. A sibling shipped its shell with
an unrecorded seed and had to recover it afterwards: a palette nobody can regenerate is one
nobody can audit.

Also still owed: the AA table for pairs in use, the token-set summary, the shell divergence
table, and **the measured sRGB chroma ordering of primary vs accent** — measure it, do not
assume. A sibling found its primary MORE saturated than its accent, which fails
`cta-primacy` for any primary-filled button on every route; another found the ordering
inverts between OKLCH and HSV, so "looks more colourful" is not the test.

## Not started
The build wave. All five routes are still shell-only stubs.

## Carry forward — this site's own findings
- **The padding inversion is the highest-leverage thing here.** The reference band wrapper
  is genuinely `padding: 0`; the rhythm and the 1160px clamp live on the inner
  `[data-ux="Container"]`. You wrote this yourself as a build instruction: an agent who
  remembers the Atlas A-11 correction and "fixes" it by putting padding back on the band
  **breaks all 20 ADAPTED rows.**
- **Reveal.tsx must be a literal pass-through** per `docs/behavior/08`. A sibling shipped an
  `opacity: 0` IntersectionObserver against its own spec and measured 165 text boxes as
  no-visible-text.
- **A green shell does not mean green sections.** A sibling's shell passed both gates, then
  its wave found five latent defects — two utility classes that were not tokens at all, so
  every dark band painted at 1.46:1 on all five routes. Put representative text on a dark
  band and a gradient band BEFORE gating, and verify every class name resolves to a token
  that exists.
- You reached **zero length exemptions** at Prompt 3, the only site in the fleet to do so.
  Do not introduce one.

## Two port hazards specific to this repo, both already hit
- A completed Prompt-1 agent woke on a background event, restarted a dev server here and
  collided with this turn over `.next/` — presenting as `Cannot find module
  .next/server/middleware-manifest.json`, which looks like a broken app rather than a
  collision. **Two turns must never run in this directory at once.**
- That left **two listeners on 3110**. Before believing any gate:
  ```bash
  netstat -ano | grep -E ":3110\s+.*LISTENING"   # EXACTLY ONE pid
  ```
  and confirm `.next/BUILD_ID` is OLDER than the gate artifacts, not newer.
- The reference server on 3210 is currently FREE and must be restarted from the site root:
  `node ../_shared/harness/src/serve-reference.mjs` — confirm it prints
  `Roofing Solutions NC LLC` before trusting a capture.
