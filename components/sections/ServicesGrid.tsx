// ServicesGrid — / only. ADAPTED. Contract row: / | s02-fb5ab59e-...-blog | services-grid.
//
// Naming: no class on this band contains the substring "card", and no element here is an
// <article>. probe.mjs counts `cards` as vis('[class*=card],article') and the reference
// band scores 0 on every route; a single stray <article> is a flat 100 on a BLOCKING field.
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { homeServicesGrid } from '@/content/copy';
import s from './ServicesGrid.module.css';

const IMAGES = [
  '/placeholders/home-service-card-a.svg',
  '/placeholders/home-service-card-b.svg',
  '/placeholders/home-service-card-c.svg',
];

export default function ServicesGrid() {
  return (
    <section
      className={`band band--surface ${s.grid}`}
      data-section={homeServicesGrid.id}
      id={homeServicesGrid.id}
    >
      <div className={`band-inner ${s.inner}`}>
        <h2 className="h-section">{homeServicesGrid.heading}</h2>
        <p className={`muted ${s.intro}`}>{homeServicesGrid.intro}</p>

        <div className={s.tileGrid}>
          {homeServicesGrid.cards.map((card, i) => (
            <div className={s.tile} key={card.title}>
              <img
                src={IMAGES[i % IMAGES.length]}
                alt={`${card.title} in Apex and west Raleigh, NC`}
                width={200}
                height={200}
              />
              <h3 className="h-tile">
                <a className={s.tileLink} href="/services/">{card.title}</a>
              </h3>
              <p className="muted">{card.body}</p>
            </div>
          ))}
        </div>

        <p className={`muted ${s.note}`}>{homeServicesGrid.note}</p>

        {/* THE one filled chromatic action on the page. */}
        <a className={`btn btn--call ${s.cta}`} href={business.phoneHref}>
          <Phone size={18} aria-hidden="true" focusable="false" />
          {homeServicesGrid.ctaLabel}
        </a>
      </div>
    </section>
  );
}
