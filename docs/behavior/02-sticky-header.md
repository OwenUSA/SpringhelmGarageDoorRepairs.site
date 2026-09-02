# 02 — Sticky header transition

## This is a DELIBERATE ADDITION, not a clone

**The reference has no sticky header.** Prompt 1 probed it directly: `stickyEls: []`. Its
header band scrolls away at the top of the page and never returns, on all five routes, at all
three breakpoints.

Ours sticks. That is a decision, not a fidelity error, and it is recorded in
`docs/known-divergence.md` §5 so that nobody later finds the difference and tries to "fix" it
back. The reason is the proposition: this site's whole argument is that one phone number
reaches one technician. A phone number that scrolls off a **5857px-tall** mobile home page has
stopped making that argument.

The `site-header` row is ADAPTED against the reference nav band on the four subpages and NOVEL
on `/`. Stickiness is a behaviour, not a structural metric, so it does not appear in the
structural comparator at all — but it *does* change the header's computed `position`, which is
why `position` is an **ADVISORY** comparator field (A-12) and never fails a row.

## Mechanism

**Use.** `position: sticky; top: 0` on the `<header>`, declared in CSS. That is the whole
sticking mechanism — there is no scroll handler that sets it.

The *transition* between the two visual states is driven by a single class toggled by an
`IntersectionObserver` on a zero-height sentinel `<div>` placed immediately before the header
in the DOM:

```
observer = new IntersectionObserver(
  ([e]) => setStuck(!e.isIntersecting),
  { threshold: 0, rootMargin: '0px' }
);
```

`setStuck(true)` adds `data-stuck` to the header. Everything visual keys off the attribute
selector `header[data-stuck]`.

**Do NOT use:**

- **A `scroll` event listener**, throttled or otherwise. It runs on the main thread on every
  scroll frame, and this is the one element that is on screen during every scroll on the site.
  `IntersectionObserver` fires twice per page — once crossing down, once crossing up.
- **`position: fixed` plus a spacer div.** It works, and then the spacer's height has to be
  kept in sync with a header whose height changes between the two states, which is a layout
  bug waiting for a font to load slightly late.
- **`window.scrollY > n`** as the condition. It hardcodes a pixel threshold that is wrong on
  every page whose first band is a different height — and our first band is 901px on `/` and
  136px on the four subpages.
- **Animating `height` or `padding`** on the transition. Both are layout-triggering properties
  and both cause the page content below to reflow on every scroll direction change.
- **`backdrop-filter`** for the stuck background. It is expensive on the exact devices that are
  scrolling a 5857px page, and it makes `contrast.mjs` report `UNMEASURABLE` for every piece of
  text in the header, because the effective background is unresolvable. **A header whose
  contrast cannot be measured is a header that ships unchecked** — which is precisely how a
  sibling shipped an invisible CTA. The stuck background is an opaque token colour.

## Ratio and why

| value | number | why |
|---|---|---|
| transition duration | **180ms** | Between the drawer's 220ms open and its 160ms close. The header is not arriving or leaving; it is changing state, and state changes read faster. |
| easing | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetric. There is no "in" and "out" here — the same transition runs in both directions. |
| height ratio, resting → stuck | **1 : 1** | **The header does not shrink.** A shrinking header animates layout, reflows the page under the reader's eyes, and moves the call CTA to a different place than the one they were aiming at. The only things that change are the background (transparent → opaque token) and the shadow (`none` → 1px hairline). |
| shadow | `0 1px 0 0 <border token>` | A hairline, not a blur. Enough to separate the header from content scrolling under it; not a raised card. |
| animated properties | **`background-color` and `box-shadow` only** | Both are compositor-friendly and neither triggers layout. |

The 1:1 height ratio is the substantive decision in this spec. It costs vertical space on
mobile and it is worth it, because the alternative moves the phone number while the user is
reaching for it.

## Failure mode

- **No JavaScript:** `position: sticky` is pure CSS and still works. The header sticks with its
  resting appearance and never gains `data-stuck` — no shadow, no opaque background. Content
  scrolls under a transparent header, which is ugly on exactly one band. Acceptable: the
  navigation and the phone number both remain reachable, which is the thing that matters.
- **`IntersectionObserver` unavailable:** the same outcome as no JavaScript. No polyfill is
  loaded for this.
- **Sticky silently not sticking:** `position: sticky` fails without error if any ancestor has
  `overflow: hidden`, `overflow: clip`, or a `transform`. Our band wrappers must not set any of
  those on an ancestor of `<header>`. This is the failure that produces no console message and
  looks like a CSS typo for an hour.
- **Sticky header over an open drawer:** while the drawer is open the body is `position: fixed`
  (spec 01), which removes the scroll context. The header must keep its `data-stuck` state
  across that transition rather than flickering back to resting — so the observer is not
  disconnected on drawer open.

## Trigger

- The sentinel leaving the viewport downward → `data-stuck` added.
- The sentinel re-entering → `data-stuck` removed.
- **Client-side route change → the observer is re-created against the new page's sentinel, and
  `stuck` is reset to `false` before the first paint of the new route.** The header lives in the
  layout and survives navigation; without an explicit reset, arriving at `/privacy` from a
  scrolled `/` renders a stuck header over the top of an unscrolled page. Reset in a
  `useLayoutEffect` keyed on `usePathname()` so it lands before paint, not after.
- Resize does not trigger anything. The sentinel is zero-height and its intersection is
  unaffected by width.

## Accessibility

- The header is `<header>` with the site `<nav>` inside it. Stickiness changes nothing
  semantic; there is no `role` and no live region.
- **The sticky header must not obscure a focused element.** Every in-page anchor target and
  every focusable element gets `scroll-margin-top` equal to the stuck header height, set from
  the same token, so `Tab` and `#fragment` navigation never park focus underneath the header.
  This is the accessibility failure that sticky headers ship with by default.
- The header's total height at 390 is capped so it never exceeds **20% of the viewport**, which
  is the point at which a sticky region starts failing WCAG 1.4.10 reflow in practice.
- `prefers-reduced-motion: reduce` → duration `0ms`. The state change still happens instantly;
  the header still sticks. **Stickiness is not motion.**
- Contrast is audited in both states independently, against our palette. The resting state sits
  over the hero photograph slot on `/` and over a flat band on the subpages, so
  `contrast.mjs` will resolve two different background stacks for the same text — both must
  pass, and the hero one is expected to report `UNMEASURABLE` until the hero image is dropped
  in (`docs/known-divergence.md` §4), at which point it is re-run.
