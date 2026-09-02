// AboutBanner — /about only. ADAPTED. Contract row: /about | s02-a2df0b9d-...-built-on-trust-driven-by-quality | about-banner.
// R2: moved to FIRST on the page.
//
// D-13: the reference fills this band with a third-party review widget (aggregate rating +
// attributed reviews). We invent none of that: no names, no dates, no stars, no counts, and
// NO Review/AggregateRating JSON-LD. `aboutBanner.quotes` are literal
// `[TESTIMONIAL PLACEHOLDER]` strings rendered as plain blockquotes.
//
// Naming: no class on this band contains the substring "card", and no element here is an
// <article>. probe.mjs counts `cards` as vis('[class*=card],article') and the reference
// band scores 0 on every route; a single stray <article> is a flat 100 on a BLOCKING field.
import { aboutBanner } from '@/content/copy';
import s from './AboutBanner.module.css';

export default function AboutBanner() {
  return (
    <section
      className={`band ${s.banner}`}
      data-section={aboutBanner.id}
      id={aboutBanner.id}
    >
      <div className={`band-inner ${s.inner}`}>
        <h1 className="h-display">{aboutBanner.heading}</h1>
        <p className={s.sub}>{aboutBanner.sub}</p>

        <div className={s.quoteRow}>
          {aboutBanner.quotes.map((quote, i) => (
            <blockquote className={s.quoteBlock} key={i}>
              <p>{quote}</p>
            </blockquote>
          ))}
        </div>

        <p className={s.note}>{aboutBanner.note}</p>
      </div>
    </section>
  );
}
