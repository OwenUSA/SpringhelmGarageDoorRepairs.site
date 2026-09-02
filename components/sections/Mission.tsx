// Mission — / only. ADAPTED. Contract row: / | s01-135f9822-... | mission.
import { homeMission } from '@/content/copy';
import s from './Mission.module.css';

export default function Mission() {
  return (
    <section
      className={`band band--dark ${s.mission}`}
      data-section={homeMission.id}
      id={homeMission.id}
    >
      <div className={`band-inner band-inner--tight ${s.inner}`}>
        <h2 className="h-section">{homeMission.heading}</h2>
        <p>{homeMission.bodyA}</p>
        <p className="muted">{homeMission.bodyB}</p>
        <div className={s.facts}>
          <p className={s.fact}>{homeMission.factYears}</p>
          <p className={s.fact}>{homeMission.factLicence}</p>
        </div>
      </div>
    </section>
  );
}
