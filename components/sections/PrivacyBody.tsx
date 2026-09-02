// PrivacyBody — /privacy only. ADAPTED. Contract row: /privacy | s01-5fa47a62-...-privacy-policy | privacy-body.
// D-16: UNREVIEWED TEMPLATE — requires legal review before launch. Same words are rendered
// visibly as the first thing in the band below, via `privacyBody.reviewNotice`.
//
// Contact section at the bottom lists PHONE and POSTAL ADDRESS only — no third method.
import { privacyBody } from '@/content/copy';
import { business } from '@/lib/business';
import s from './PrivacyBody.module.css';

export default function PrivacyBody() {
  return (
    <section
      className={`band band--surface ${s.privacy}`}
      data-section={privacyBody.id}
      id={privacyBody.id}
    >
      <div className={`band-inner ${s.inner}`}>
        <div className={s.textCol}>
          <p className={s.notice}>{privacyBody.reviewNotice}</p>

          <h1 className="h-display">{privacyBody.heading}</h1>
          <p className={s.updated}>{privacyBody.updated}</p>
          <p>{privacyBody.intro}</p>

          {privacyBody.sections.map((section) => (
            <div key={section.h}>
              <h2 className="h-tile">{section.h}</h2>
              <p>{section.p}</p>
            </div>
          ))}

          <h2 className="h-tile">{privacyBody.contactHeading}</h2>
          <p>
            <a href={business.phoneHref}>{business.phone}</a>
          </p>
          <address className={s.address}>{business.addressLine}</address>
        </div>
      </div>
    </section>
  );
}
