# 01 — Mobile nav drawer

**Class:** ADAPTED. This is the reference's *entire* interactive surface — the hamburger at
`[data-aid="HAMBURGER_MENU_LINK"]` toggling `[data-ux="NavigationDrawer"]` is the only widget
on all five of its pages. Everything else in `docs/behavior/` is an addition or a correction.

## Mechanism

**Use.** A single `useState<boolean>` in the client `<SiteHeader>` component. The trigger is a
real `<button type="button">` carrying `aria-expanded` and `aria-controls`. The panel is a
`<nav id="site-drawer">` that is **present in the DOM at all times** and hidden with the
`hidden` attribute plus a CSS transform, never conditionally rendered away.

Visual transition: `transform: translateX(100%) → translateX(0)` plus `opacity`, on a
`<nav>` fixed to the viewport. A separate `<div>` scrim sits behind it.

**Scroll lock — this is the part that is specified precisely because it is the part that is
always got wrong:**

```
on open:   const y = window.scrollY;
           body.style.position = 'fixed';
           body.style.top = `-${y}px`;
           body.style.left = '0';
           body.style.right = '0';
           body.dataset.scrollY = String(y);

on close:  const y = Number(body.dataset.scrollY || 0);
           body.style.position = ''; body.style.top = '';
           body.style.left = '';     body.style.right = '';
           delete body.dataset.scrollY;
           window.scrollTo(0, y);          // synchronous, NOT smooth, NOT rAF-deferred
```

**Do NOT use:**

- **`overflow: hidden` on `<body>`.** iOS Safari ignores it. The page behind the drawer keeps
  scrolling under the user's finger, and when the drawer closes they are somewhere else on the
  page than where they opened it. This is the specific correction this spec exists to make.
- **`overscroll-behavior` alone** as the scroll lock. It stops chaining, not scrolling.
- **`position: fixed` without restoring `scrollY`.** The lock works and the page silently jumps
  to the top on every close, which on a 5857px-tall mobile home page is worse than no lock.
- **`inert` on the page wrapper** as the only focus containment — it is well supported now but
  it does not restore focus, and it does nothing about scroll.
- **Rendering the drawer only when open.** The open transition then has no start state to
  animate from and the first frame is a jump.
- **`framer-motion`, any drawer library, any scroll-lock package.** Not in the allowlist and
  not needed for one transform.

## Ratio and why

| value | number | why |
|---|---|---|
| open duration | **220ms** | Long enough to read as a panel arriving rather than a repaint; short enough that a person who wants the phone number is not waiting for a nicety. |
| close duration | **160ms** | Roughly **0.7× the open**. Closing is a dismissal, not an arrival — matching the durations makes dismissal feel sticky. The asymmetry is deliberate and is the only motion ratio on this site. |
| open easing | `cubic-bezier(0.16, 1, 0.3, 1)` | Decelerating. The panel settles rather than stops. |
| close easing | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating out. It leaves. |
| scrim opacity | **0 → 0.55** | Enough to kill contrast with the page behind so the drawer's own contrast audit is meaningful; not so dark that the page reads as gone. |
| drawer width | **min(86vw, 380px)** | Leaves a visible strip of page so the scrim is obviously tappable. |
| stagger on nav items | **none** | Five items. A stagger would add ~120ms to the time-to-phone-number and buy nothing. |

## Failure mode

If the JavaScript never runs — hydration error, script blocked, an old browser — the drawer
must not swallow the navigation. The `<nav>` is in the DOM with the `hidden` attribute; a
`<noscript>` block in the header reveals it as a plain static list via
`<noscript><style>#site-drawer{display:block;position:static;transform:none}</style></noscript>`,
and the toggle button is `hidden` in that same block. **A no-JS visitor gets a visible link
list, never a dead hamburger.** This matters more than usual here: the header is where the
call CTA lives.

Second failure mode: the drawer opens and the body-fixed lock is applied while the drawer's
own open animation is still running, so the page jumps by the scrollbar width at desktop
widths. Mitigated by only engaging the lock below `768px`, where there is no scrollbar to
compensate for, and by never mounting the drawer at all at `≥ 768px`.

## Trigger

- Click / tap / `Enter` / `Space` on the toggle button.
- `Escape` anywhere while open → close, focus returns to the toggle.
- Click or tap on the scrim → close.
- Activating any link inside the drawer → close.
- **Client-side route change → close, unconditionally.** In the App Router the drawer
  component survives a `<Link>` navigation because the header is in the layout, so without
  this the drawer stays open over the new page with the old page's scroll position restored
  underneath it. Implemented as an effect keyed on `usePathname()`, which fires on every
  client-side navigation including one to the same path.
- Viewport crossing `768px` upward while open → close and release the lock in the same frame.
  Otherwise a rotated phone leaves `position: fixed` on the body at desktop width and the page
  cannot be scrolled at all.

## Accessibility

- Toggle: `<button type="button" aria-expanded={open} aria-controls="site-drawer">` with a
  visible text label or `aria-label="Menu"`. Never a bare `<div>` with an `onClick`.
- Panel: `<nav id="site-drawer" aria-label="Site">`. Not `role="dialog"` — it is navigation,
  and a dialog role obliges modal semantics that a nav list does not need.
- **Focus is trapped while open** and only while open. On open, focus moves to the first
  focusable element inside the panel. `Tab` from the last wraps to the first; `Shift+Tab` from
  the first wraps to the last. On close, focus returns to the toggle button — always, including
  the `Escape` path and the route-change path.
- The page behind is `aria-hidden="true"` **and** `inert` while the drawer is open, so a screen
  reader's virtual cursor cannot walk out of the panel.
- `prefers-reduced-motion: reduce` → both durations become `0ms`. The drawer still opens, still
  locks scroll, still traps focus. **The lock and the focus restore are not motion and are never
  disabled**; only the transition is.
- Every interactive target inside the drawer is ≥ 44×44 CSS px (WCAG 2.5.8), which the shell
  gives `tel:` links globally per A-14.
- The drawer's own contrast is audited against our palette, not assumed — it sits over a scrim,
  which `contrast.mjs` resolves as a real background layer rather than assuming white.
