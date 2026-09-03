// /about — route file is LEAD-OWNED. R2: about-banner above about-intro. D1: the reference
// blog feed (s03) is not built.
import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import AboutBanner from '@/components/sections/AboutBanner';
import AboutIntro from '@/components/sections/AboutIntro';
import AboutConnect from '@/components/sections/AboutConnect';

const meta = copy.routes['/about'].meta;
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/about/' },
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
