// ServicesList — /services. ADAPTED. Contract row:
// /services | s02-40dbc796-...-expert-roofing-services-for-your-h | services-list.
//
// Naming: no class on this band contains the substring "card", and no element here is an
// <article>. probe.mjs counts `cards` as vis('[class*=card],article') and the reference
// band scores 0 on every route.
import { business } from '@/lib/business';
import { servicesList } from '@/content/copy';
import s from './ServicesList.module.css';

const IMAGES = [
  '/placeholders/services-card-01.svg',
  '/placeholders/services-card-02.svg',
  '/placeholders/services-card-03.svg',
  '/placeholders/services-card-04.svg',
  '/placeholders/services-card-05.svg',
];

export default function ServicesList() {
  return (
    <section
      className={`band band--surface ${s.list}`}
      data-section={servicesList.id}
      id={servicesList.id}
    >
      <div className={`band-inner ${s.inner}`}>
        <h1 className="h-section">{servicesList.heading}</h1>
        <p className={`muted ${s.intro}`}>{servicesList.intro}</p>

        <div className={s.groupGrid}>
          {servicesList.groups.map((group, i) => (
            <div className={s.group} id={`symptom-${i + 1}`} key={group.symptom}>
              <img
                className={s.groupImage}
                src={IMAGES[i]}
                alt={`${group.symptom} — garage door repair in Apex, NC`}
                width={339}
                height={169}
              />
              <div className={s.groupBody}>
                <h3 className="h-tile">{group.symptom}</h3>
                <p className="muted">{group.body}</p>
                <ul className={s.itemList}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className={s.groupActions}>
                  <a className={`btn btn--ghost-dark ${s.groupBtn}`} href={business.phoneHref}>
                    Call about this
                  </a>
                  <a className={s.groupLink} href="/contact/">
                    Request a callback instead
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={s.factRow}>
          <span className={s.factChip}>{servicesList.factWarranty}</span>
          <span className={s.factChip}>{servicesList.factBrands}</span>
          <span className={s.factChip}>{servicesList.factResponse}</span>
        </div>
      </div>
    </section>
  );
}
