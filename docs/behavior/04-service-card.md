# 04 — Service card hover, focus and press

Applies to the eight cards in `/` `services-grid` (which inherits the reference's blog card
grid) and the five symptom groups in `/services` `services-list`.

## Mechanism

**Use.** CSS only. There is no state, no handler, and no client component — the whole card
is a server-rendered `<article>` containing one `<a>`, and every state is a pseudo-class.

The card is a **link-overlay**, not a nested-link card:

```html
<article class="card">
  <img … />                       <!-- placeholder SVG until Prompt 10's assets land -->
  <h3><a class="card__link" href="/services">Spring repair and replacement</a></h3>
  <p>…</p>
</article>
```

```css
.card { position: relative; }
.card__link::after { content: ''; position: absolute; inset: 0; }   /* the overlay */
```

One anchor covers the card. The accessible name is the heading text, which is what a screen
reader announces, and the whole card is clickable without wrapping a heading and a paragraph
in an `<a>`.

States, all on `.card:has(:hover)`, `.card:has(:focus-visible)` and `.card:active`:

| property animated | resting | hover | press |
|---|---|---|---|
| `transform: translateY()` | `0` | `-2px` | `0` |
| `box-shadow` | level 1 token | level 2 token | level 1 token |
| `border-color` | border token | primary token | primary token |

**Do NOT use:**

- **`box-shadow` on the card *without* `transform`** as the only hover signal, and equally not
  `transform: scale()`. Scale resamples the placeholder SVG's text and the eventual photograph,
  and on a 200×200 card it is visibly soft.
- **Animating `top` / `margin` / `height`.** Layout-triggering. `translateY` is composited.
- **Wrapping the whole `<article>` in an `<a>`.** It makes the accessible name the entire card
  text — heading, body, and the `TODO(fact)` chip — read out as one link.
- **Two separate links per card** (image link + heading link). Every card then appears twice in
  a screen reader's links list with the same destination.
- **`:hover` without `@media (hover: hover)`.** On a touch device `:hover` sticks after a tap
  and the card stays lifted until something else is tapped. Every hover rule is inside
  `@media (hover: hover) and (pointer: fine)`.
- **`:focus` instead of `:focus-visible`** for the lift. A mouse click would then leave the card
  lifted after the pointer has left.
- **`cursor: pointer` on the `<article>`.** The anchor already provides it, and putting it on
  the container makes the whole card look interactive at widths where the overlay is disabled.

## Ratio and why

| value | number | why |
|---|---|---|
| hover-in duration | **150ms** | Below ~100ms a hover state reads as an instant repaint and the card looks like it flickered; above ~200ms the pointer has usually already moved on. |
| hover-out duration | **100ms**, ≈ **0.67× in** | Same asymmetry principle as the drawer: leaving is faster than arriving. Across a grid of eight cards, a slow hover-out leaves a trail of half-lit cards behind a moving pointer. |
| press duration | **60ms** | Effectively immediate. Press feedback that lags reads as an unresponsive control. |
| lift distance | **2px** | Deliberately small. This grid is inherited from a reference that has **zero** motion of any kind (`docs/known-divergence.md` §6) and 2px is the least that is still legible as a state change. A 6–8px lift would be the only conspicuous motion on the entire site. |
| press displacement | **back to 0**, not below | The card returns to rest on press rather than pushing in. Pushing below the resting plane needs a shadow change to read correctly and doubles the animated properties. |
| easing | `cubic-bezier(0.4, 0, 0.2, 1)` both directions | Symmetric; a state toggle, not an entrance. |
| shadow ratio, level 1 → 2 | blur **× 2**, y-offset **× 2**, alpha **× 1.25** | Doubling geometry while barely moving opacity keeps the card looking like it rose rather than like it darkened. |

## Failure mode

- **No JavaScript:** no effect whatsoever. Nothing here is scripted.
- **Placeholder image is near-white and the card border disappears against it.** Not possible
  by construction — the placeholder repaint mechanism (`docs/known-divergence.md` §4) forces any
  near-white slot to a mountable mid-neutral. On this site nothing fired, because the sampled
  colours are all dark.
- **The overlay `::after` covers selectable body text**, so a visitor cannot select and copy the
  card's description. Accepted for cards whose body is one sentence; the overlay is
  `pointer-events` only, so text selection still works via keyboard and the `user-select` is
  untouched.
- **`:has()` unsupported.** The hover styles simply do not apply and the card is a static link.
  Baseline-available in every browser that runs the rest of this site; no fallback is written,
  and the card is fully usable without it.
- **The lift makes the grid's row heights shift.** It cannot: `translateY` does not affect
  layout, which is the reason it was chosen over `margin-top`.

## Trigger

- Pointer enter / leave, only under `@media (hover: hover) and (pointer: fine)`.
- `:focus-visible` on the inner anchor — keyboard focus gets the **same** lift and shadow as
  hover, plus the focus ring. A keyboard user must be able to see which card they are on with
  the same clarity a mouse user gets.
- `:active` on press, pointer or `Enter`/`Space`.
- **Client-side route change: nothing to reset.** There is no state to leak across a
  navigation. This is the reason the pattern is CSS-only — a JS-driven hover state on a card
  grid is the classic source of a card that stays lit after the route changes under it.

## Accessibility

- Accessible name is the heading text alone, via the link-overlay pattern. Verified by reading
  the card's `<a>` accessible name, not by inspecting markup.
- **Focus ring is never removed.** `:focus-visible` renders a ring that holds **3:1 against both
  the card surface and the page background**, per D-19 and the palette's hard constraints (A-7).
  The focus ring colour is semantic and is **exempt from the palette hue rotation** — it does not
  move when the primary hue does.
- The card's `::after` overlay must not sit above the focus ring. Ring is drawn with `outline`,
  which paints outside the border box and above the overlay.
- Tab order is DOM order: eight cards, one stop each. The image is not focusable; the
  `TODO(fact)` chip is not focusable.
- Contrast of the card heading, body and `TODO(fact)` chip is audited against our palette in
  every state, including the hover state where `border-color` becomes the primary token —
  border colour against the card surface must hold **3:1** as a UI boundary.
- `prefers-reduced-motion: reduce` → all three durations `0ms` and the `translateY` lift is
  dropped entirely; the shadow and border-colour changes remain, so the state is still legible
  without any movement. **A reduced-motion user must not lose the hover affordance, only the
  animation of it.**
