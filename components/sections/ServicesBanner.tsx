// ServicesBanner — /services. ADAPTED. Contract row:
// /services | s01-13e60568-...-experience-quality-roofing-service | services-banner.
// STRUCTURAL CHANGE R3: moved to the BOTTOM of the route, after the list and the FAQ.
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { servicesBanner } from '@/content/copy';
import s from './ServicesBanner.module.css';

export default function ServicesBanner() {
  return (
    <section
      className={`band band--surface ${s.banner}`}
      data-section={servicesBanner.id}
      id={servicesBanner.id}
    >
      <div className={`band-inner band-inner--tight ${s.inner}`}>
        <h2 className={`h-section ${s.heading}`}>{servicesBanner.heading}</h2>
        <a className="btn btn--call" href={business.phoneHref}>
          <Phone size={18} aria-hidden="true" focusable="false" />
          {servicesBanner.ctaLabel}
        </a>
      </div>
    </section>
  );
}
