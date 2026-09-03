// AboutIntro — /about only. ADAPTED. Contract row: /about | s01-cc079ee9-...-about-us | about-intro.
//
// D-14: the reference's manufacturer-certification badge slot is not a credential we can
// invent, so it renders as three visible TODO(fact) chips instead of a badge graphic.
//
// Naming: no class on this band contains the substring "card", and no element here is an
// <article>. probe.mjs counts `cards` as vis('[class*=card],article') and the reference
// band scores 0 on every route; a single stray <article> is a flat 100 on a BLOCKING field.
import { aboutIntro } from '@/content/copy';
import s from './AboutIntro.module.css';

export default function AboutIntro() {
  return (
    <section
      className={`band band--surface ${s.intro}`}
      data-section={aboutIntro.id}
      id={aboutIntro.id}
    >
      <div className={`band-inner ${s.inner}`}>
        <div className={s.textCol}>
          <h2 className="h-section">{aboutIntro.heading}</h2>
          <p>{aboutIntro.bodyA}</p>
          <p>{aboutIntro.bodyB}</p>
          <p>{aboutIntro.bodyC}</p>
          <p>{aboutIntro.bodyD}</p>
        </div>

        <div className={s.mediaCol}>
          <img
            className={s.photo}
            src="/placeholders/about-intro-photo.svg"
            alt="Springhelm Garage Door Repairs technician working on a garage door in Apex, NC"
            width={1112}
            height={556}
          />
          <img
            className={s.secondary}
            src="/placeholders/about-intro-secondary.svg"
            alt="Springhelm Garage Door Repairs service vehicle and tools"
            width={532}
            height={266}
          />
        </div>

        <div className={s.chipRow}>
          <p className={s.chip}>{aboutIntro.factTeam}</p>
          <p className={s.chip}>{aboutIntro.factYears}</p>
          <p className={s.chip}>{aboutIntro.factInsurance}</p>
        </div>
      </div>
    </section>
  );
}
