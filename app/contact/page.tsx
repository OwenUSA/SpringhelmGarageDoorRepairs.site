// STUB: contact route. The form band lands in the Prompt 6+7 wave; the map is shell-owned.
// Metadata is NOT stubbed and is NOT literal here — it is read from content/copy.ts.
import type { Metadata } from 'next';
import { copy, contactMap } from '@/content/copy';
import BusinessMap from '@/components/BusinessMap';

const meta = copy.routes['/contact'].meta;
export const metadata: Metadata = { title: meta.title, description: meta.description };

export default function Page() {
  return (
    <main id="main" data-route="/contact">
      {/* D-08 requires a map on /contact, zoom ~15 — a LOCATION question. It lives inside
          the route segment, so navigating / -> /contact tears down the zoom-13 iframe and
          mounts a new one at zoom 15 (spec 07). Hoisting it into the layout to "avoid
          reloading" would serve the wrong zoom on one of the two routes. */}
      <BusinessMap
        sectionId={contactMap.id}
        heading={contactMap.heading}
        bypassLabel={contactMap.bypassLabel}
        mapTitle={contactMap.mapTitle}
        directionsLabel={contactMap.directionsLabel}
        zoom={15}
      />
    </main>
  );
}
