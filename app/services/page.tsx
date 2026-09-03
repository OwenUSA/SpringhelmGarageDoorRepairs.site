// /services — route file is LEAD-OWNED. R3: the CTA banner moves to the bottom, after the
// symptom list and the FAQ. A2: services-faq is NOVEL; the reference has zero accordions.
import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { business, SITE_URL } from '@/lib/business';
import ServicesList from '@/components/sections/ServicesList';
import ServicesFaq from '@/components/sections/ServicesFaq';
import ServicesBanner from '@/components/sections/ServicesBanner';

const meta = copy.routes['/services'].meta;
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/services/' },
  openGraph: {
    type: 'website',
    siteName: business.name,
    url: `${SITE_URL}/services/`,
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
    <main id="main" data-route="/services">
      <ServicesList />
      <ServicesFaq />
      <ServicesBanner />
    </main>
  );
}
