// /contact — route file is LEAD-OWNED. R4: contact-connect above the form; the point of the
// page is the phone number, so it is not buried under a form. D2: the reference's multi-city
// Locations grid (s02) is not built (D-02).
import type { Metadata } from 'next';
import { copy, contactMap } from '@/content/copy';
import { business, SITE_URL } from '@/lib/business';
import BusinessMap from '@/components/BusinessMap';
import ContactConnect from '@/components/sections/ContactConnect';
import ContactForm from '@/components/sections/ContactForm';

const meta = copy.routes['/contact'].meta;
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/contact/' },
  openGraph: {
    type: 'website',
    siteName: business.name,
    url: `${SITE_URL}/contact/`,
    title: meta.title,
    description: meta.description,
    images: [{ url: `${SITE_URL}/placeholders/logo-wordmark.svg`, alt: business.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [`${SITE_URL}/placeholders/logo-wordmark.svg`],
  },
};

export default function Page() {
  return (
    <main id="main" data-route="/contact">
      <ContactConnect />
      <ContactForm />
      {/* D-08, zoom ~15 — a LOCATION question. It lives inside the route segment so
          / -> /contact tears down the zoom-13 iframe and mounts a new one (spec 07). */}
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
