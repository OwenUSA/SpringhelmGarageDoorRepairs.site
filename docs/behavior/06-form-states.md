# 06 — Form field focus, error and success states

`/contact` `contact-form`. Five fields per D-05: name, phone, service needed (select),
preferred callback window, message. **No backend.** The component carries
`// STUB: no submission target` as its first line.

## What the reference has, and what we drop

Its GoDaddy form ships name, **Email\***, phone, message, a marketing-consent checkbox and
**reCAPTCHA**. All of the last three are dropped:

- **Email field** — D-03. No `mailto:`, no `@`-bearing address in copy, no
  `<input type="email">`, no envelope icon, no `email` key in JSON-LD, and no email in the
  privacy policy's contact section. The band ships a visible line saying so.
- **Marketing consent copy** — there is nothing to consent to; we send nothing.
- **reCAPTCHA** — D-15. No third-party script of any kind, which also means the privacy policy
  does not have to describe one.

## Mechanism

**Use.** A client component with a single `useState` for submission phase
(`'idle' | 'invalid' | 'sent'`) and the **native Constraint Validation API** for the rules
themselves. Validation is declared on the inputs, not written in JavaScript:

```html
<input id="phone" name="phone" type="tel" required
       inputmode="tel" autocomplete="tel"
       pattern="[0-9()+\-.\s]{7,}" aria-describedby="phone-hint phone-err" />
```

Submission:

```js
e.preventDefault();
if (!form.checkValidity()) { setPhase('invalid'); form.reportValidity(); return; }
console.warn('STUB: no submission target — nothing was transmitted.');
setPhase('sent');
```

Error styling keys off `:user-invalid`, never `:invalid`:

```css
.field:has(:user-invalid) .field__err { display: block; }
.field :user-invalid { border-color: var(--color-error); }
```

**Do NOT use:**

- **`:invalid`.** It matches an empty `required` field on first paint, so every field is red
  before the user has typed a character. `:user-invalid` waits until the field has been
  interacted with and blurred. This is the single most common form defect in this pattern.
- **`react-hook-form` or `zod`.** Explicitly banned in the allowlist: five fields, no backend.
- **`libphonenumber`.** Banned. One country, one `pattern` attribute.
- **`<input type="email">` anywhere**, including as a "honeypot". A honeypot email input is
  still an email input and the D-03 sweep will find it — correctly.
- **`alert()` or a toast** for the success state. Both vanish, and a toast is invisible to a
  screen reader unless it is a live region, at which point it is a live region with extra steps.
- **Colour alone to mark an error.** WCAG 1.4.1. Every error state carries a text message and an
  icon in addition to the border colour.
- **`aria-live="assertive"`** on the success region. It interrupts. `polite` is correct for a
  confirmation the user just caused.
- **Clearing the form on success.** The visitor's typed phone number is the only record either
  party has, because nothing was transmitted anywhere.

## Ratio and why

| value | number | why |
|---|---|---|
| focus ring width | **2px**, offset **2px** | Offset separates the ring from the field border so the two are distinguishable when the field is also in an error state and its border is already coloured. |
| focus ring contrast | **≥ 3:1 against both the field surface and the page background** | D-19 and the palette's hard constraints. Checked programmatically, not assumed. |
| focus transition | **100ms** on `box-shadow` only | Fast. A focus indicator that animates in is a focus indicator that is briefly absent, and for a keyboard user moving quickly through five fields that reads as flicker. `border-color` is **not** transitioned — an error border must appear instantly. |
| error reveal | **0ms, no animation** | Errors do not fade in. An animated error is an error the user's eye can miss. |
| success reveal | **180ms** fade + 4px rise | The one place a small entrance is warranted: the success block replaces the form, and an instant swap of a large region reads as a page navigation the user did not ask for. |
| error : success prominence | success is **larger and higher-contrast** | The success state is the terminal state of the whole page and must dominate. |
| semantic colours | **error, success and focus ring keep conventional hues and are EXEMPT from the palette hue rotation** (A-7) | A randomly green error state is a bug, not a palette. |

## Failure mode

- **No JavaScript:** the `<form>` has no `action` and no `method`. Without JS, submitting does
  nothing visible — which is honest, because there is no destination. The `<noscript>` block in
  the band states that the form cannot be submitted and gives the phone number. **The phone
  number is rendered as a `tel:` link inside the form band regardless of JS state**, because on
  this site the form is the fallback and the phone is the primary path, not the other way round.
- **Hydration mismatch:** phase state is initialised to `'idle'` on both server and client, and
  no `Date`, `Math.random`, or `window` value touches the initial render.
- **The user believes the form sent something.** This is the real risk of a stub form and it is
  addressed in the copy, not in the mechanism: the success body says "Nothing was transmitted
  anywhere. This form has no destination yet." A `console.warn` fires alongside it for anyone
  looking. Both are required; neither is sufficient.
- **Autofill fights the styling.** `:autofill` background is overridden with an inset box-shadow
  in the surface token, because Chrome's autofill yellow is not in our palette and would break
  the contrast audit on a field the user did not type in.
- **The mobile call bar covers the last field** while the keyboard is open. Handled in spec 03:
  the bar is hidden on `:focus-within` of the form.

## Trigger

- **Focus:** `:focus-visible` on every control. Keyboard focus and pointer focus are
  distinguished; a click into a text field does not draw a keyboard ring, but a `Tab` into it
  does.
- **Error:** first appears on `blur` of an interacted field (`:user-invalid`), and on submit for
  every failing field at once. Never on `input` while the user is still typing — validating a
  half-typed phone number as invalid is hostile.
- **Error clears:** on `input`, as soon as the value becomes valid. Not on blur.
- **Success:** on a valid submit. The form is replaced in place by the success block; the page
  does not navigate and the URL does not change.
- **Client-side route change:** navigating away from `/contact` unmounts the component and the
  phase resets to `'idle'`. Navigating back gives an empty form. This is correct — a persisted
  "sent" state on a form that never sent anything would be a lie the second time.
  **No state is lifted into a layout-level provider**, specifically so this reset is automatic
  rather than something to remember.

## Accessibility

- Every field has a real `<label for>`. Placeholders are not labels and no field relies on one.
- `autocomplete` on all applicable fields: `name`, `tel`. `inputmode="tel"` on the phone field
  so a phone shows a keypad.
- The select for "what is the door doing?" is a native `<select>` with a real `<option>` list —
  not a custom listbox. A custom one would need roving `tabindex`, `aria-activedescendant` and
  a typeahead, and would be the most complex thing on the site for no gain.
- Error messages are wired with `aria-describedby` on the field, and the message element has
  `role="alert"` so it is announced when it appears. The description id is present in
  `aria-describedby` **before** the error exists, so the relationship is not created mid-error.
- The success block is `role="status" aria-live="polite"`, and **focus is moved to its heading**
  on success so a keyboard or screen-reader user is not left focused on a submit button that no
  longer exists.
- Submit button is a real `<button type="submit">`, never disabled while invalid. A disabled
  submit gives a keyboard user no way to trigger the error messages that would tell them why.
- Required fields are marked with both `required` and a visible text convention — not with a red
  asterisk alone.
- Contrast of label, hint, error and success text is audited against our palette by
  `contrast.mjs`, and their painted contrast by `rendertruth.mjs`. Both read 0 FAIL before any
  "done" report (A-13, not subject to `ITERATION_CAP`).
- `prefers-reduced-motion: reduce` → the success fade and rise become `0ms`; the focus
  transition is already effectively instant. No validation behaviour changes.
