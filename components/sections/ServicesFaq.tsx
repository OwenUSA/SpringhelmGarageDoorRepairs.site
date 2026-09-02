// ServicesFaq — /services. NOVEL. No reference counterpart; measured by token conformance
// at zero violations (docs/behavior/05-faq-accordion.md). Native <details name="faq">, no
// JavaScript, no client component.
//
// Prohibition 5: this band gets NO module class on the <section> element itself — only
// `band band--ground` — so every categorical field on the band resolves to the browser
// default / a shared global, never a value introduced here.
import { servicesFaq } from '@/content/copy';
import s from './ServicesFaq.module.css';

export default function ServicesFaq() {
  return (
    <section className="band band--ground" data-section={servicesFaq.id} id={servicesFaq.id}>
      <div className={`band-inner ${s.inner}`}>
        <h2 className="h-section">{servicesFaq.heading}</h2>
        <div className={s.faq}>
          {servicesFaq.items.map((item, i) => (
            <details className={s.item} name="faq" id={`faq-${i + 1}`} key={item.q}>
              <summary className={s.summary}>
                <span>{item.q}</span>
                <svg
                  className={s.chevron}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  focusable="false"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </summary>
              <div className={s.body}>
                <p className="muted">{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
