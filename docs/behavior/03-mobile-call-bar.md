# 03 — Mobile sticky call bar

## This is a DELIBERATE ADDITION, not a clone

**The reference has no call bar and nothing sticky at all** (`stickyEls: []`), and it carries
exactly **one** `tel:` link across all five pages — in the header CTA. Ours puts `tel:` links
everywhere and pins one to the bottom of every mobile viewport, per D-04.

Recorded in `docs/known-divergence.md` §5. It is a NOVEL row on all five routes in
`docs/sections.md`, measured by token conformance once (A-9), never pixel-diffed.

## Mechanism

**Use.** A single always-rendered element in the root layout:

```html
<div class="call-bar" data-section="mobile-call-bar">
  <a href="tel:+19195550158" aria-label="Call Springhelm now">
    <PhoneIcon aria-hidden="true" focusable="false" /> Call a technician
  </a>
</div>
```

```css
.call-bar {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
@media (min-width: 768px) { .call-bar { display: none; } }
```

`env(safe-area-inset-bottom)` is not decoration. Without it the bar sits *under* the iOS home
indicator and the bottom ~34px of the tap target is not tappable — on the one control the
entire site exists to deliver.

The bar reserves its own space rather than covering the end of the page:

```css
body { padding-bottom: calc(var(--call-bar-h) + env(safe-area-inset-bottom, 0px)); }
@media (min-width: 768px) { body { padding-bottom: 0; } }
```

**Do NOT use:**

- **A scroll handler that reveals the bar after N pixels.** It costs a main-thread listener on
  every frame to hide the phone number from the person who just arrived. The bar is present
  from first paint.
- **`position: sticky`.** It sticks within a scroll container; a bar pinned to the viewport
  bottom regardless of scroll position needs `fixed`.
- **`100vh`-based positioning of anything nearby.** Mobile `vh` changes when the browser chrome
  collapses and the bar jumps. `bottom: 0` on a fixed element does not have this problem.
- **`display: none` toggled by JavaScript for the breakpoint.** The media query is the
  breakpoint. A JS toggle produces a frame of desktop layout with a mobile bar in it.
- **An `onClick` handler that calls `window.location.href = 'tel:…'`.** It breaks long-press to
  copy, breaks open-in-new-context, and is invisible to a screen reader's links list. It is an
  `<a href="tel:">`.
- **Hiding the bar behind the drawer's scrim** by leaving it at a higher `z-index`. See below.

## Ratio and why

| value | number | why |
|---|---|---|
| bar height | **56px** content box | 44px is the WCAG 2.5.8 floor; 56 gives the label room and puts the touch target comfortably clear of the screen edge, where thumb accuracy is worst. |
| tap target | **full width × 56px** | The whole bar is the link. There is no smaller inner button — a full-bleed target is the highest-hit-rate control on a phone. |
| horizontal inset | **0** | Full-bleed. An inset bar looks like a card and reads as dismissible. |
| `z-index` | **40**, below the drawer's **50** | The drawer must cover the call bar. Two competing fixed elements on top of each other is the most common visual defect in this pattern, and the ordering is not arbitrary: the drawer already contains a call CTA of its own, so nothing is lost by covering this one. |
| chroma | **the highest on the page** | `rendertruth.mjs` checks CTA salience as chroma dominance — no other action on the page may be more saturated than the call CTA. The bar is the reference point that check is measured against at 390. |
| motion | **none** | It does not slide in, fade in, or animate on scroll. It is simply there. |

## Failure mode

- **No JavaScript:** entirely unaffected. It is an `<a>` and a media query; nothing about it is
  scripted.
- **Device cannot place calls** (a tablet, a desktop browser at a narrow window): `tel:` either
  hands off to a paired phone or does nothing. The bar is hidden at ≥768px, which covers most
  of it. The address and phone number also render as text in the footer on every route, so the
  number is obtainable by reading and copying, not only by tapping.
- **The bar covers the last line of page content.** Prevented by the `body` bottom padding
  above. Check specifically on `/privacy`, whose final band is a text block with no trailing
  band beneath it.
- **The bar covers a focused form field** while the on-screen keyboard is open on `/contact`.
  The bar is `hidden` while any element inside the contact form has focus — implemented with
  `:focus-within` on the form setting `--call-bar-display: none`, not with a JS listener on
  every field.
- **Double phone numbers on screen** — the sticky header CTA and the bar both visible at 390.
  Accepted deliberately. Two routes to the same number is not a defect on a site whose entire
  proposition is the number.

## Trigger

- No trigger. It is rendered from first paint on every route and never enters or leaves.
- **Client-side route change: nothing happens, and that is the requirement.** The bar lives in
  the root layout, outside the route segment, so it is not remounted on navigation. If it is
  ever moved into a page component it will unmount and remount on every `<Link>` click, which
  produces a visible flicker at the bottom of the viewport on every navigation.
- Drawer open → the drawer's scrim and panel sit above it at `z-index: 50`. The bar is also
  `inert` while the drawer is open, so focus cannot tab into a control the user cannot see.

## Accessibility

- `<a href="tel:…">` with a visible text label. `aria-label="Call Springhelm now"` supplies the
  business name for a screen reader reading the link out of context in a links list.
- The lucide phone icon is `aria-hidden="true" focusable="false"` — it is decoration beside a
  text label, and an unhidden icon reads the label twice.
- **Tap target ≥ 44×44 CSS px, enforced in two places**: this spec's 56px height, and the
  shell-wide `a[href^="tel:"] { min-height: 44px }` from A-14. `min-height` is inert on a purely
  inline box, so `tel:` links inside prose keep their natural metrics and the type scale the
  structural diff measures is untouched.
- It is the **last** element in the DOM order of the layout, after the footer, so it does not
  interrupt the tab order through the page content. A visitor tabbing from the top reaches the
  header CTA first and this one last.
- Contrast is audited against our palette in `contrast.mjs` and its painted contrast is checked
  in `rendertruth.mjs`. Both must read 0 FAIL. This is not optional politeness: a sibling site
  completed this entire chain and shipped its primary call CTA painted in *exactly* its own
  background colour — 1:1, invisible, on all five routes — while its acceptance sweep reported
  "23/23 pairs pass AA". A-13 exists because of that bar.
- `prefers-reduced-motion`: nothing to honour. There is no motion here by design.
