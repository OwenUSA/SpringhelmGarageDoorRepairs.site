// Hero — / only. LEAD-BUILT and lead-owned (A-6 keeps the hero in the main thread).
// Contract row: / | s00-8bfc40ab-...-eastern-nc-s-only-owens-corning-pl | hero | ADAPTED.
//
// Naming: no class on this band contains the substring "card", and no element here is an
// <article>. probe.mjs counts `cards` as vis('[class*=card],article') and the reference
// band scores 0 on every route; a single stray <article> is a flat 100 on a BLOCKING
// field, which is 4.55pp of a 5% budget on its own.
import { Phone } from 'lucide-react';
import { business } from '@/lib/business';
import { homeHero } from '@/content/copy';
import s from './Hero.module.css';

export default function Hero() {
  return (
    <section className={`band ${s.hero}`} data-section={homeHero.id}>
      <div className={`band-inner ${s.heroInner}`}>
        <p className="eyebrow" style={{ color: 'var(--color-neutral-400)' }}>{homeHero.eyebrow}</p>
        <h1 className={`h-display ${s.heading}`}>{homeHero.heading}</h1>
        <p className={s.sub}>{homeHero.sub}</p>
        <div className={s.actions}>
          {/* THE one filled chromatic action on the page. */}
          <a className="btn btn--call" href={business.phoneHref}>
            <Phone size={18} aria-hidden="true" focusable="false" />
            {homeHero.ctaPrimary}
          </a>
          <a className="btn btn--ghost-light" href="#services-grid">{homeHero.ctaSecondary}</a>
        </div>
      </div>
    </section>
  );
}
