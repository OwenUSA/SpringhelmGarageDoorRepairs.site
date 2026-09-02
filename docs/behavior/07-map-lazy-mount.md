# 07 — Map lazy-mount and keyboard bypass

Two instances, both required by D-08: `service-area-map` on `/` (zoom ~13, below services,
above the footer) and `contact-map` on `/contact` (zoom ~15, beside the form). Both are NOVEL —
**the reference embeds zero maps on any of its five pages** — and both are rendered by the same
shared `<BusinessMap>` component, which is a **lead-owned shell file** under A-6. No section
agent edits it.

---

## THE BYPASS LINK IS THE FIRST CHILD. THIS IS THE POINT OF THIS SPEC.

**Three sibling sites shipped their map as a keyboard trap**, and every one of them had a spec
that said not to. The gap sat between two documents where no programmatic gate could see it:
the spec said "add a bypass link", the builder built the map, and nothing in between failed.

So this is not written as guidance. It is written as a **structural requirement with acceptance
criteria the build cannot pass without it.**

### The requirement

```tsx
<section data-section="service-area-map">
  {/* FIRST CHILD. Before the heading, before the wrapper, before anything. */}
  <a className="map-bypass" href="#after-service-area-map">Skip the map</a>

  <h2>Where we work</h2>
  <div className="map-frame">
    <iframe title="…" src="…" loading="lazy" />
  </div>
  <a href="https://www.google.com/maps/dir/?api=1&destination=35.7327,-78.8503">Get directions</a>

  <span id="after-service-area-map" tabIndex={-1} />
</section>
```

```css
.map-bypass {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.map-bypass:focus-visible {           /* visible ON FOCUS — not permanently hidden */
  position: static;
  width: auto; height: auto;
  clip-path: none;
  /* rendered as a normal button-sized control, ≥44px tap target */
}
```

### Why first child, specifically

A `<iframe>` containing Google Maps is a focus sink. Tabbing into it hands focus to a
third-party document with its own tab order — pan controls, zoom, terms links, a "view larger
map" link — and on some builds no reliable way back out with the keyboard alone. A bypass link
placed *after* the map, or beside the "Get directions" link, is reached only by tabbing
**through** the thing it exists to skip. It is not a bypass; it is a second exit from a room
the user is already stuck in.

First child means the very first `Tab` that enters the section offers the escape.

### Acceptance criteria — the build cannot pass without these

Every one of these is checkable and all four must hold, on **both** map instances, before any
"done" report on `/` or `/contact`:

1. **`section > *:first-child` is the bypass anchor.** Not the heading, not a wrapper div, not
   a `<Suspense>` boundary. Assert on the rendered DOM, not on the JSX.
2. **The bypass `href` resolves to an element that exists and is focusable**, positioned after
   every focusable descendant of the section. `document.querySelector(href)` must return a node
   with `tabindex="-1"`, and that node's `compareDocumentPosition` against the `<iframe>` must
   report it as following.
3. **The bypass link is invisible at rest and visible on `:focus-visible`**, with a rendered box
   of at least 44×44 CSS px when visible. A link that is `display: none` or `visibility: hidden`
   at rest is not focusable at all and fails this.
4. **The `<iframe>` has a non-empty `title` attribute** naming the business and the place, and
   `loading="lazy"`.

If a map section is built and any of the four is absent, the section is **not done** — this is
a build defect, not a divergence, so it is **not subject to `ITERATION_CAP`** (A-13 reasoning
applies: a defect gets fixed however many attempts it takes).

---

## Mechanism

**Use.** Native `loading="lazy"` on the `<iframe>`, plus a fixed-aspect wrapper that reserves
the box before anything loads:

```css
.map-frame { aspect-ratio: 16 / 9; }
@media (max-width: 767px) { .map-frame { aspect-ratio: 4 / 3; } }
.map-frame > iframe { width: 100%; height: 100%; border: 0; display: block; }
```

The embed URL is built from `MAP_COORDS` and **never from the address string** (D-07 — the
address is fictional and will not geocode):

```
https://www.google.com/maps?q=35.7327,-78.8503&z=13&output=embed     /  (service area)
https://www.google.com/maps?q=35.7327,-78.8503&z=15&output=embed     /contact
```

Keyless. No API key, no `.env`, no third-party SDK (D-18).

**Do NOT use:**

- **An `IntersectionObserver` that swaps in the `<iframe>` on scroll.** `loading="lazy"` is the
  browser primitive for exactly this and it does not cost a client component. The observer
  version also creates a frame in which the iframe does not exist while the user is already
  tabbing through the section, which changes the tab order mid-navigation.
- **A click-to-load facade** (a static image the user clicks to activate the map). It is a good
  privacy pattern and it is wrong here: the facade image would be a REPLACE asset we have no
  right to, and generating one would mean rendering a map of a fictional address.
- **The Google Maps JavaScript API, `@react-google-maps/api`, or any map library.** Not in the
  allowlist, needs a key, and D-18 forbids third-party keys outright.
- **Passing the fake address to a geocoder**, ever, including in `dir/?api=1&destination=`. The
  directions link uses coordinates too.
- **A wrapper without `aspect-ratio`.** The iframe then has no intrinsic size until it loads and
  the whole page below it shifts when it does. D-08 requires a fixed aspect-ratio wrapper
  precisely so the map cannot move the layout.
- **`height: 100vh`** or any viewport-unit height on the frame. Mobile `vh` changes when browser
  chrome collapses and the map resizes mid-scroll.

## Ratio and why

| value | number | why |
|---|---|---|
| aspect ratio, ≥768px | **16:9** | A wide band. At 1440 the `/` map sits full-width between the services grid and the footer, and 16:9 is the ratio that reads as a map strip rather than a hero. |
| aspect ratio, <768px | **4:3** | 16:9 at 390px is 219px tall, which is too short to show a useful radius around a pin. 4:3 gives 293px for 74px of extra page height. |
| `/` zoom | **13** | Shows Apex and the neighbouring west-Raleigh towns — the band's job is to answer "do you come to me?", which is a service-*area* question. |
| `/contact` zoom | **15** | Street level. The band's job there is "where are you?", which is a location question. |
| bypass link visible size | **≥ 44×44 CSS px** | WCAG 2.5.8. A 1px-tall bypass link that becomes a 20px link on focus is still a target a motor-impaired keyboard user cannot reliably activate. |
| motion | **none** | The map does not fade in, slide in, or reveal on scroll. |

## Failure mode

- **No JavaScript:** unaffected. `loading="lazy"`, `aspect-ratio` and the bypass link are all
  declarative. The map loads and the bypass works.
- **The iframe is blocked** — extension, network policy, offline. The reserved box stays empty
  rather than collapsing, because the aspect-ratio wrapper owns the height. The address renders
  as **text** next to the map on both routes (D-07), and "Get directions" is a plain link, so a
  blocked map costs no information at all.
- **`loading="lazy"` ignored** (older browser): the iframe loads eagerly. Slower first paint,
  nothing broken.
- **The map is the last focusable thing before the footer** and a user tabs into it having
  missed the bypass. The bypass is the section's first child so this requires tabbing past it
  deliberately; the escape hatch is `Shift+Tab`, which returns to the bypass link, which is then
  visible.
- **Two maps, one component, one `id`.** The bypass targets are `#after-service-area-map` and
  `#after-contact-map` — derived from the section id, not hardcoded — because a duplicate `id`
  would make one of the two bypass links jump to the wrong section, and duplicate ids do not
  throw.

## Trigger

- Iframe load is triggered by the browser's own lazy-load heuristic as the section approaches
  the viewport. Nothing in our code decides when.
- Bypass link is triggered by `Tab` into the section, then `Enter`.
- "Get directions" opens the Google Maps directions URL. `rel="noopener"` if it targets a new
  context; it does not need `target="_blank"` and does not get one — forcing a new tab is a
  decision to make for the user.
- **Client-side route change:** the map lives inside the route segment and is unmounted on
  navigation, so the iframe is torn down rather than kept alive in a layout. Navigating from
  `/` to `/contact` therefore loads a *new* iframe at zoom 15 — it does not reuse the zoom-13
  one. Verify this specifically: a map component hoisted into the layout to "avoid reloading"
  would serve the wrong zoom on one of the two routes and would keep a third-party frame alive
  across every navigation on the site.

## Accessibility

- `<iframe title="…">` is **required**, non-empty, and names the business and the place. An
  untitled iframe is announced as "frame" and a user has no idea what they have entered.
- The bypass link is the section's first child, visible on focus, ≥44×44 when visible, and
  targets a `tabindex="-1"` anchor positioned after every focusable descendant. See the
  acceptance criteria above.
- The address is rendered as **real text** adjacent to the map, not only inside it. The map is
  an enhancement to a NAP block, not the NAP block itself.
- The map section has an `<h2>`; the iframe is not a heading and carries no `role`.
- Contrast of the heading, the address text and the "Get directions" link is audited against our
  palette. The iframe's own contents are third-party and are not auditable — `contrast.mjs`
  reports `UNMEASURABLE` for a `url()`-backed or third-party region rather than assuming white,
  which is the correct outcome and is not a failure to chase.
- `prefers-reduced-motion`: nothing to honour. There is no motion here by design.
