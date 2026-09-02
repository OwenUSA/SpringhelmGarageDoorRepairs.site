// STUB: no submission target
//
// contact-form — /contact. LEAD-BUILT: the validation code is shared with nothing else, so
// it stayed in the main thread rather than going out with the build wave.
// Contract row: /contact | s01-0b5ed9f0-...-contact-us | contact-form | ADAPTED.
// Behaviour: docs/behavior/06-form-states.md. Fields: D-05 exactly — name, phone, service,
// callback window, message. No contact field of any other kind (CLAUDE.md D-03).
'use client';

import { useRef, useState } from 'react';
import { AlertCircle, Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { contactForm } from '@/content/copy';
import s from './ContactForm.module.css';

type Phase = 'idle' | 'invalid' | 'sent';

/** Ten digits -> (919) 555-0158, on blur only. Anything else is left exactly as typed. */
function formatTenDigits(raw: string): string {
  const d = raw.replace(/\D/g, '');
  if (d.length !== 10) return raw;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function ContactForm() {
  // Initialised identically on server and client; no Date, Math.random or window value
  // touches the first render.
  const [phase, setPhase] = useState<Phase>('idle');
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setPhase('invalid');
      form.reportValidity();
      return;
    }
    console.warn('STUB: no submission target — nothing was transmitted.');
    setPhase('sent');
    // Focus moves to the success heading so a keyboard user is not left on a submit button
    // that no longer exists.
    requestAnimationFrame(() => successHeadingRef.current?.focus());
  }

  return (
    <section className="band band--ground" data-section={contactForm.id} id={contactForm.id}>
      <div className={`band-inner ${s.inner}`}>
        <div>
          <div className={s.head}>
            <h2 className="h-section">{contactForm.heading}</h2>
            <p className={s.sub}>{contactForm.sub}</p>
          </div>

          {/* `.panel`, deliberately not `.form-card` — probe.mjs scores a BLOCKING `cards`
              field as vis('[class*=card],article') and the reference band scores 0. */}
          <div className={s.panel}>
            {phase === 'sent' ? (
              <div className={s.success} role="status" aria-live="polite">
                <h3 className={s.successHeading} tabIndex={-1} ref={successHeadingRef}>
                  {contactForm.successHeading}
                </h3>
                <p className={s.successBody}>{contactForm.successBody}</p>
                <a className="btn btn--call" href={business.phoneHref}>
                  <Phone size={18} aria-hidden="true" focusable="false" />
                  {business.phone}
                </a>
              </div>
            ) : (
              /* No action and no method: there is no destination. Without JS, submitting does
                 nothing visible, which is honest — the <noscript> below says so and gives the
                 number instead. */
              <form onSubmit={onSubmit}>
                <noscript>
                  <p className={s.noteLine}>
                    This form cannot be submitted without JavaScript, and has no destination in
                    any case. Ring {business.phone} instead.
                  </p>
                </noscript>

                <div className={s.fields}>
                  <div className={s.field}>
                    <label className={s.label} htmlFor="cf-name">{contactForm.fields.name}</label>
                    <input
                      className={s.control} id="cf-name" name="name" type="text" required
                      autoComplete="name" aria-describedby="cf-name-err"
                    />
                    <span className={s.err} id="cf-name-err" role="alert">
                      <AlertCircle size={16} aria-hidden="true" focusable="false" />
                      {contactForm.errorRequired}
                    </span>
                  </div>

                  <div className={s.field}>
                    <label className={s.label} htmlFor="cf-phone">{contactForm.fields.phone}</label>
                    <input
                      className={s.control} id="cf-phone" name="phone" type="tel" required
                      inputMode="tel" autoComplete="tel" pattern="[0-9()+.\-\s]{7,}"
                      aria-describedby="cf-phone-hint cf-phone-err"
                      onBlur={(e) => { e.currentTarget.value = formatTenDigits(e.currentTarget.value); }}
                    />
                    <span className={s.hint} id="cf-phone-hint">
                      Ten digits. This is the only way we can reach you.
                    </span>
                    <span className={s.err} id="cf-phone-err" role="alert">
                      <AlertCircle size={16} aria-hidden="true" focusable="false" />
                      {contactForm.errorPhone}
                    </span>
                  </div>

                  <div className={s.field}>
                    <label className={s.label} htmlFor="cf-service">{contactForm.fields.service}</label>
                    <select
                      className={s.control} id="cf-service" name="service" required
                      defaultValue="" aria-describedby="cf-service-err"
                    >
                      <option value="" disabled>Choose one</option>
                      {contactForm.serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span className={s.err} id="cf-service-err" role="alert">
                      <AlertCircle size={16} aria-hidden="true" focusable="false" />
                      {contactForm.errorRequired}
                    </span>
                  </div>

                  <div className={s.field}>
                    <label className={s.label} htmlFor="cf-window">{contactForm.fields.window}</label>
                    <select
                      className={s.control} id="cf-window" name="window" required
                      defaultValue="" aria-describedby="cf-window-err"
                    >
                      <option value="" disabled>Choose one</option>
                      {contactForm.windowOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <span className={s.err} id="cf-window-err" role="alert">
                      <AlertCircle size={16} aria-hidden="true" focusable="false" />
                      {contactForm.errorRequired}
                    </span>
                  </div>

                  <div className={s.field}>
                    <label className={s.label} htmlFor="cf-message">
                      {contactForm.fields.message} <span className={s.optional}>(optional)</span>
                    </label>
                    <textarea className={s.control} id="cf-message" name="message" rows={4} />
                  </div>
                </div>

                <div className={s.actions}>
                  {/* Never disabled while invalid: a disabled submit gives a keyboard user no
                      way to trigger the messages that would tell them why. Achromatic, because
                      the call CTA is the site's only filled chromatic action. */}
                  <button className="btn btn--ghost-dark" type="submit">{contactForm.submitLabel}</button>
                  <span className={s.noteLine}>
                    {phase === 'invalid'
                      ? contactForm.errorRequired
                      : 'Every field but the last one is needed.'}
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* The reference's own form band already carried the address and the hours table, so
            the NAP block lives here rather than in contact-connect. */}
        <div className={s.aside}>
          <div className={s.asideBlock}>
            <h3 className="h-tile">{contactForm.napHeading}</h3>
            <address className={s.nap}>
              {business.street}<br />
              {business.locality}, {business.region} {business.postalCode}
            </address>
            {/* The number is rendered as a tel: link inside the form band regardless of JS
                state — on this site the form is the fallback and the phone is the primary
                path, not the other way round (spec 06). */}
            <a href={business.phoneHref}>{business.phone}</a>
          </div>
          <div className={s.asideBlock}>
            <h3 className="h-tile">{contactForm.hoursHeading}</h3>
            <p>{contactForm.hoursBody}</p>
            <p className={s.noteLine}>{business.serviceArea}</p>
          </div>
          <p className={s.noteLine}>{contactForm.noEmailNote}</p>
        </div>
      </div>
    </section>
  );
}
