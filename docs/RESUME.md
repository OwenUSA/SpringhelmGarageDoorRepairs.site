# RESUME — Springhelm. Prompt 5+9 is COMPLETE. Next turn is the Prompt 6+7 build wave.

`pnpm build` clean, `npx tsc --noEmit` clean, email sweep clean, all three gates green.
Nothing is in flight and nothing is half-applied.

## What Prompt 5+9 landed

```
tokens + palette   app/globals.css   — 61 custom properties, palette seed 711279 applied
shell components   SiteHeader  SiteFooter  MobileCallBar  BusinessMap  Reveal
lib/business.ts    NAP, tel: href, JSON-LD (LocalBusiness only)
app/               layout.tsx  not-found.tsx  robots.ts  sitemap.ts  + five route stubs
```

**The shell is FROZEN from here (A-6).** No section agent touches `globals.css`,
`layout.tsx`, tokens, header, footer, nav, the NAP block or `<BusinessMap>`. An agent that
needs a shared change stops and hands it back to the lead.

## Palette — recorded, reproducible

Winning seed **711279** (primary hue 6, in the assigned 5-25 window; accent hue 36,
analogous +30deg). Candidates 912614, 711279, 82332, 930803, 980541 from master seed 3115,
0 rejected. Emitted ramp verified against `app/globals.css`, 15/15 hexes, 0 mismatches.
Full record, AA table and the measured primary-vs-accent chroma ordering:
`docs/known-divergence.md` §8.

```bash
node ../_shared/harness/src/palette.mjs --seed 711279 --emit   # from the SITE ROOT
```

## Two build instructions the wave must not break

Both are in `docs/known-divergence.md` §1 and §1b. They are the same trap in two properties.

1. **Padding goes on `.band-inner`, never on `.band`.** The reference band wrapper is
   genuinely `padding: 0`.
2. **Leading goes on `.band-inner` / `.header-inner`, never on `.band`.** The reference band
   wrapper computes `line-height: normal`. This was the shell's entire structural residual
   at Prompt 5 — 4.55pp of a 5% budget on every ADAPTED row — and closing it took the
   header from 8.54 to 1.14 and the footer from 6.03 to 1.48.

## Where the numbers stand

`docs/divergence.md`: 80 rows, **15 FAIL, 30 PASS, 0 BLOCKED**.

**All 15 failures are the `(page) | PAGE | height delta %` row**, five routes x three
breakpoints, 61-88%. That is the stub state, not a defect: four routes render header +
footer only and `/` and `/contact` add a map. They close as the wave builds the bands.
Every structural section row PASSES — worst is 2.14 against a 5% threshold. The 50 UNPAIRED
rows are reference bands with no counterpart built yet; the harness explicitly documents
this signature (`diff.mjs`, `staleCaptureWarning`) so it is not mistaken for a stale
capture.

## Running the gates next turn

```bash
node ../_shared/harness/src/serve-reference.mjs          # 3210, own command, prints
                                                         # "Roofing Solutions NC LLC"
pnpm dev                                                 # 3110, EXACTLY ONE pid
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/contrast.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/rendertruth.mjs
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/capture.mjs --side ours --all
MSYS_NO_PATHCONV=1 node ../_shared/harness/src/diff.mjs   # LAST, unfiltered
```

`diff.mjs` reads captures from disk and never takes them — **re-capture `ours` after every
build or the sweep measures the previous state.** Never background the dev server in the
same command chain as a gate run: the chain drops back to the previous cwd and
`loadConfig()` reads another site's config.

## The email sweep quotes nothing

`components/SiteFooter.tsx` documented D-03 by listing the banned strings, and the sweep is
a plain regex over `app components lib content` — so the comment tripped the gate it
documented. The comment now points at CLAUDE.md D-03 instead of quoting it. **Do not
reintroduce the literal banned tokens into a comment.**

## Not started

The Prompt 6+7 build wave. All five routes are shell-only. Then Prompt 10+11.
