// STUB: home route. Every band except the shell-owned map lands in the Prompt 6+7 wave.
// Metadata is NOT stubbed and is NOT literal here — it is read from content/copy.ts, which
// is the only place a title or description is written down on this site.
import type { Metadata } from 'next';
import { copy, homeMap } from '@/content/copy';
import BusinessMap from '@/components/BusinessMap';

const meta = copy.routes['/'].meta;
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  return (
    <main id="main" data-route="/">
      {/* D-08 requires a map on the home page, zoom ~13 — a service-AREA question.
          Lead-owned (A-6); no section agent touches it. */}
      <BusinessMap
        sectionId={homeMap.id}
        heading={homeMap.heading}
        body={homeMap.body}
        bypassLabel={homeMap.bypassLabel}
        mapTitle={homeMap.mapTitle}
        directionsLabel={homeMap.directionsLabel}
        zoom={13}
      />
    </main>
  );
}
