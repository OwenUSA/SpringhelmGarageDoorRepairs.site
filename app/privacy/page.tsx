// /privacy — route file is LEAD-OWNED. D-16.
import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { business, SITE_URL } from '@/lib/business';
import PrivacyBody from '@/components/sections/PrivacyBody';

const meta = copy.routes['/privacy'].meta;
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/privacy/' },
  openGraph: {
    type: 'website',
    siteName: business.name,
    url: `${SITE_URL}/privacy/`,
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
    <main id="main" data-route="/privacy">
      <PrivacyBody />
    </main>
  );
}
