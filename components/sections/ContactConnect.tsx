// ContactConnect — /contact only. ADAPTED. Contract row: /contact | s03-10fb85d2-...-connect-with-us | contact-connect.
// FIRST band on the page, above the callback form: the point of /contact is the phone
// number, so it sits at the top rather than at the bottom the way about-cta does.
//
// The reference band is a social-links strip (15 characters of text). We invent no social
// accounts, so it becomes a short call band instead — same shape as AboutConnect.
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { contactConnect } from '@/content/copy';
import s from './ContactConnect.module.css';

export default function ContactConnect() {
  return (
    <section
      className={`band band--dark ${s.connect}`}
      data-section={contactConnect.id}
      id={contactConnect.id}
    >
      <div className={`band-inner band-inner--tight ${s.inner}`}>
        <h1 className="h-section">{contactConnect.heading}</h1>
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
