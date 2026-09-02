# 08 — Scroll reveal

## There is no scroll reveal on this site, and this spec says so plainly

The eighth spec exists to record a **negative** finding and to close it off, because "there is
no scroll reveal" is a decision that will otherwise get quietly reversed by whoever builds the
first band that looks a bit flat.

Prompt 1 probed the reference for motion at 1440 on `/`. Every single signal came back
negative:

```
gsap:false          ScrollTrigger:false   lenis:false      locomotive:false
aos:false           wow:false             swiper:false     slick:false
[data-aos]:0        parallax attrs:0      will-change:transform:0
CSS-animated elements:0                   inline onscroll:false
```

**Nothing initialises.** Not a library that is loaded but idle — nothing is loaded. There is no
scroll-linked motion, no time-driven choreography, no carousel, no parallax, and no
reveal-on-scroll anywhere on any of the five reference pages.

## `framer-motion` is NOT justified and must not be installed

The dependency allowlist admits `framer-motion` on one condition: *"only if Prompt 1's profile
finds real choreography — it should say so explicitly."* The profile says the opposite,
explicitly (`docs/profile.md` §4). The condition is not met.

This is recorded again in `docs/known-divergence.md` §6. Installing it later requires a
one-line justification against a profile that already answered the question, which is the point
of writing this down.

Also not installed, for the reasons already in the allowlist: **Lenis** and **Locomotive**.
Scroll hijacking breaks keyboard navigation and mobile momentum, and a repair customer scrolling
to a phone number is the one interaction on this site that cannot be made janky.

## The no-motion baseline — what IS specified

Motion on this site is limited to **state transitions on elements the user is directly
interacting with**. Nothing animates because it came into view.

| where | what moves | duration | spec |
|---|---|---|---|
| nav drawer | `transform`, `opacity` | 220ms in / 160ms out | 01 |
| sticky header | `background-color`, `box-shadow` | 180ms | 02 |
| mobile call bar | nothing | — | 03 |
| service cards | `transform: translateY(-2px)`, `box-shadow`, `border-color` | 150ms in / 100ms out | 04 |
| FAQ accordion | `block-size`, chevron rotation | 200ms both ways | 05 |
| form | focus `box-shadow` 100ms; success fade+rise 180ms | | 06 |
| maps | nothing | — | 07 |
| **everything else** | **nothing** | — | — |

That is the complete motion inventory for the site. Eight numbers, all of them attached to a
user action.

### Positive rules, so "no reveal" is buildable rather than just prohibited

1. **Every band is fully visible and fully readable at first paint**, at every breakpoint, with
   no opacity below 1 and no transform on any band, section, card, heading or paragraph.
2. **No `opacity: 0` initial state anywhere.** This is the rule that makes the failure mode
   below impossible rather than merely unlikely.
3. **No `IntersectionObserver` is created for visual purposes.** The only observer on the site
   is the sticky-header sentinel (spec 02), and it toggles an attribute on an element that is
   already visible.
4. **No `will-change` on any band.** It is a hint for elements that are about to animate, and
   none of them are.
5. `scroll-behavior: smooth` is **not** set globally. It affects in-page anchor jumps and the
   drawer's scroll restore, and a smooth-scrolled restore is visibly wrong (spec 01 restores
   synchronously and deliberately).
6. **Scroll position is never read on a `scroll` event.** The one thing that needs to know about
   scroll uses `IntersectionObserver`.

## Ratio and why

The ratio here is the one that matters most and it is **0**: zero animated properties tied to
scroll position, out of thirty-one sections.

The reasoning is not aesthetic restraint for its own sake. The reference this site clones has
**zero** motion, so every millisecond of reveal animation we add is a divergence we chose. And
the home page is **5857px tall at 390** — a scroll-reveal system on a page that long means the
visitor animates roughly fifteen bands into existence on the way to a phone number. The
proposition of this site is that a person answers immediately. A page that makes you wait for
its own content to arrive argues against it.

## Failure mode

**This is the one that gets shipped, and it is why the "no `opacity: 0`" rule above is absolute.**

The standard scroll-reveal implementation sets `opacity: 0` in CSS and removes it when an
observer fires. If the observer never fires — JavaScript blocked, a hydration error, an
observer created against an element that was replaced during hydration, a `prefers-reduced-motion`
branch that skips the observer *and* the reset, or simply a band that is already in the viewport
on load in a browser that does not fire an initial entry — **the content is permanently
invisible.** The page renders blank bands and reports no error anywhere. It is a total content
loss with a silent failure signature.

Because nothing on this site starts at `opacity: 0`, this failure has no way to occur. That is
the whole argument for specifying the absence rather than leaving it unspecified.

Secondary failure mode, prevented by the same rule: a reveal system that hides content from a
crawler or from a text-only reader that does not run the observer.

## Trigger

**No trigger. Nothing observes scroll position for visual purposes.**

The sticky header's sentinel observer (spec 02) is the site's only `IntersectionObserver`, and
the browser's own `loading="lazy"` heuristic for the two map iframes (spec 07) is the only other
thing on the site that reacts to a viewport approach. Neither changes the visibility of any
content.

**Client-side route change:** nothing to reset, nothing to re-observe, nothing to tear down.
This is a direct benefit of the decision — a reveal system in a layout-level component has to be
re-initialised on every navigation, and the standard bug is that it is not, so the second page a
visitor opens renders its bands at `opacity: 0` forever.

## Accessibility

- `prefers-reduced-motion: reduce` is honoured on **every** animation on the site, per D-19.
  Every spec in this directory names its own reduced-motion behaviour, and in every case the
  behaviour survives while the animation is dropped — the drawer still opens, the accordion
  still expands, the card still shows its hover state, the form still validates.
- Because there is no scroll reveal, there is no content whose visibility depends on motion at
  all, which is the strongest possible form of compliance with WCAG 2.3.3 (Animation from
  Interactions) and removes any 2.2.2 (Pause, Stop, Hide) surface entirely.
- No parallax, so no vestibular trigger.
- Nothing on the site auto-advances, auto-plays, or moves without a user action, so there is no
  timing to make adjustable under WCAG 2.2.1.
- A user with JavaScript disabled sees the same content, in the same places, as a user with it
  enabled. The only differences are the drawer's static fallback (spec 01) and the form's
  inability to show a confirmation (spec 06).
