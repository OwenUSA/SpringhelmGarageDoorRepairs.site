// AboutConnect — /about only. ADAPTED. Contract row: /about | s04-da4df260-...-connect-with-us | about-cta.
// LAST on the page.
//
// The reference band is a social-links strip (15 characters of text). We invent no social
// accounts, so it becomes a short call band instead.
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { aboutConnect } from '@/content/copy';
import s from './AboutConnect.module.css';

export default function AboutConnect() {
  return (
    <section
      className={`band band--dark ${s.connect}`}
      data-section={aboutConnect.id}
      id={aboutConnect.id}
    >
      <div className={`band-inner band-inner--tight ${s.inner}`}>
        <h2 className="h-section">{aboutConnect.heading}</h2>
        <a className={s.phoneLink} href={business.phoneHref}>{business.phone}</a>

        {/* THE one filled chromatic action on the page. */}
        <a className="btn btn--call" href={business.phoneHref}>
          <Phone size={18} aria-hidden="true" focusable="false" />
          {business.phone}
        </a>
      </div>
    </section>
  );
}
