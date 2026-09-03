// /about — route file is LEAD-OWNED. R2: about-banner above about-intro. D1: the reference
// blog feed (s03) is not built.
import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import { business, SITE_URL } from '@/lib/business';
import AboutBanner from '@/components/sections/AboutBanner';
import AboutIntro from '@/components/sections/AboutIntro';
import AboutConnect from '@/components/sections/AboutConnect';

const meta = copy.routes['/about'].meta;
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/about/' },
  openGraph: {
    type: 'website',
    siteName: business.name,
    url: `${SITE_URL}/about/`,
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
    <main id="main" data-route="/about">
      <AboutBanner />
      <AboutIntro />
      <AboutConnect />
    </main>
  );
}
