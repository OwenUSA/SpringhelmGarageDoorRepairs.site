// / — home. Route file is LEAD-OWNED: section order (R1) and the map are fixed here so no
// section agent has to touch a shared file. Metadata is read from content/copy.ts and is
// never a literal here (see app/layout.tsx for why).
import type { Metadata } from 'next';
import { copy, homeMap } from '@/content/copy';
import BusinessMap from '@/components/BusinessMap';
import Hero from '@/components/sections/Hero';
import ServicesGrid from '@/components/sections/ServicesGrid';
import Mission from '@/components/sections/Mission';

const meta = copy.routes['/'].meta;
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/' },
};

export default function Page() {
  return (
    <main id="main" data-route="/">
      <Hero />
      {/* R1: services-grid above mission — the proposition lands after the reader has
          seen what we actually fix. */}
      <ServicesGrid />
      <Mission />
      {/* D-08, zoom ~13 — a service-AREA question. Lead-owned (A-6). */}
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
