// /privacy — route file is LEAD-OWNED. D-16.
import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import PrivacyBody from '@/components/sections/PrivacyBody';

const meta = copy.routes['/privacy'].meta;
export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: '/privacy/' },
};

export default function Page() {
  return (
    <main id="main" data-route="/privacy">
      <PrivacyBody />
    </main>
  );
}
