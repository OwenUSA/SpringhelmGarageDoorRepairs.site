# 05 — FAQ accordion

`/services` only, in-page, six questions of generic garage-door technical content. Nothing
about response time, pricing, warranty or credentials.

## This is a NOVEL section

**The reference has zero accordions, zero tabs and zero carousels.** There is nothing to clone
here; the section is measured by token conformance at zero violations, once, not per
breakpoint (A-9). Recorded in `docs/known-divergence.md` §5.

## Mechanism

**Use.** Native `<details>` / `<summary>`, one per question, inside a plain `<div>`. No
JavaScript, no state, no client component.

```html
<h2 id="faq">Questions people ask on the phone</h2>
<div class="faq">
  <details class="faq__item" name="faq">
    <summary>Can a broken torsion spring be repaired rather than replaced?</summary>
    <div class="faq__body"><p>…</p></div>
  </details>
  …
</div>
```

The `name="faq"` attribute makes the group **exclusive** — opening one closes the others —
natively, with no handler. Drop the attribute and they become independently toggleable; both
are one-character decisions rather than a rewrite.

Animation of the open/close uses the interpolable-`height` pair, which needs no measurement:

```css
.faq__body { interpolate-size: allow-keywords; }
.faq__item::details-content {
  block-size: 0;
  overflow: hidden;
  transition: block-size 200ms ease, content-visibility 200ms allow-discrete;
}
.faq__item[open]::details-content { block-size: auto; }
```

Where `::details-content` is unsupported the panel opens and closes instantly. That is a fully
correct outcome and no fallback is written for it.

**Do NOT use:**

- **A `useState` accordion built from `<button aria-expanded>` and a `<div role="region">`.**
  It is the conventional answer and it is worse here: it needs a client component, it needs
  every ARIA relationship wired by hand, it breaks in-page `#fragment` linking to a closed
  answer, and browser find-in-page cannot reach the closed text. `<details>` gets all four for
  free, including find-in-page, which auto-opens the matching panel.
- **`max-height` transitions with a guessed ceiling.** The classic hack. The easing is wrong for
  every panel whose real height is not the guess, and a panel taller than the ceiling is clipped
  permanently.
- **Measuring `scrollHeight` in an effect and animating to a pixel value.** It re-measures on
  every font load, every resize, and every text reflow, and it is a layout thrash on a section
  that is otherwise free.
- **`height: auto` transitions without `interpolate-size`.** They do nothing.
- **`FAQPage` JSON-LD.** Not banned by the decision register, but it is not written either: the
  answers are generic technical content, not business claims, and adding structured data here
  invites adding it to the testimonial band, which D-13 bans outright. One rule, no exceptions,
  is easier to keep than a list of allowed schemas.
- **Any accordion library.** Not in the allowlist.

## Ratio and why

| value | number | why |
|---|---|---|
| open duration | **200ms** | The panel is a block of prose that changes page height. Faster than this and the page below appears to jump rather than move. |
| close duration | **200ms**, ratio **1:1** | **Deliberately symmetric, unlike the drawer (spec 01) and the cards (spec 04).** Closing an accordion moves the content *below* it back up, and an asymmetric close makes that reflow feel like a snap. Where the moving element is the thing the user is looking at, asymmetry helps; where the moving element is everything underneath it, it does not. |
| easing | `ease` | The panel travels a distance set by its own content, not by a designed number, so a tuned cubic-bézier would be tuned to whichever answer happens to be longest. |
| items open at once | **1** (`name="faq"`) | Six answers of ~180 characters each. Allowing all six open makes the band 2.5× taller than any measured reference band on the route and pushes `services-banner` off the bottom of a phone. |
| default state | **all closed** | The FAQ is a secondary band on the route. Opening the first by default would give it a permanent height the layout has to carry. |
| indicator rotation | **0° → 90°**, 200ms | A chevron, rotated. Not a `+` that morphs to a `−`, which needs two elements and a crossfade. |

## Failure mode

- **No JavaScript:** fully functional. `<details>` is a browser primitive. This is the reason
  the pattern was chosen over a scripted one — the FAQ is the deepest content on `/services`
  and a scripted accordion is one hydration error away from being unreadable.
- **`::details-content` unsupported:** panels open and close with no transition. No clipping, no
  broken height, no missing content.
- **`name=` exclusive groups unsupported:** every panel becomes independently toggleable. The
  band gets taller when several are open; nothing breaks.
- **Deep link to a closed answer.** Each `<details>` carries an `id`. A `#fragment` pointing at
  one opens it natively in current browsers; where it does not, the browser still scrolls to the
  closed summary, which is legible. `scroll-margin-top` on each `<details>` equals the stuck
  header height (spec 02) so the summary is not parked under the header.
- **The page jumps when a panel closes above the current scroll position.** Unavoidable with any
  accordion and mitigated by exclusivity: only ever one panel's worth of height moves.

## Trigger

- Click / tap on the `<summary>`.
- `Enter` or `Space` on a focused `<summary>` — native, not a handler.
- Browser find-in-page matching text inside a closed panel opens it automatically. This is a
  real feature and it is the strongest single argument for `<details>` over ARIA buttons.
- A `#fragment` navigation to a panel's `id`.
- **Client-side route change: no reset is needed and none is written.** The section is
  server-rendered inside the `/services` route segment, so navigating away unmounts it and
  navigating back re-renders it closed. Nothing persists, nothing leaks. A `useState` accordion
  in a layout-level component would have needed an explicit reset here.

## Accessibility

- `<summary>` is natively a button-like control with implicit `aria-expanded` reflecting the
  `open` attribute. **Do not add `role="button"`, `aria-expanded`, or `tabindex`** — each one
  overrides or duplicates native semantics and at least one of them breaks `Space`.
- The questions are `<summary>` elements, not headings. The section has one `<h2>`. Wrapping
  each summary in an `<h3>` is permitted and is not done, because it produces a heading whose
  entire content is an interactive control, which is awkward to announce.
- Focus ring on `<summary>` holds **3:1 against both the item surface and the page background**.
  Semantic, exempt from palette rotation (A-7).
- `<summary>` tap target is ≥ 44×44 CSS px at 390 — full row width, minimum 48px tall. Question
  text wraps to two lines at 390 and the target grows with it.
- Contrast of question text, answer text and the chevron is audited against our palette in both
  states. The chevron is an icon with `aria-hidden="true"` and carries no information the
  `open` state does not already expose.
- `prefers-reduced-motion: reduce` → `transition: none` on `::details-content` and on the
  chevron. Panels open and close instantly. **The accordion still works; only the animation is
  gone.**
- WCAG 2.2 AA target: this section adds no new failure surface, because every control in it is a
  browser primitive.
