// app/not-found.tsx — the 404. It renders inside the root layout, so the header, the
// footer, the NAP block and the call bar are all present: a visitor who mistypes a URL is
// one tap from the phone number, which is the whole proposition of this site.
//
// It is NOT a sixth route (D-01). It has no counterpart on the reference and is not a row
// in docs/sections.md; it is what Next.js renders for an unmatched path.
//
// Every link below points at one of the five ROUTES. No /locations, no blog, no gallery.

import Link from 'next/link';
import { Phone } from 'lucide-react';
import { siteFooter } from '@/content/copy';
import { business } from '@/lib/business';

export const metadata = {
  title: 'Page not found — Springhelm Garage Door Repairs',
  description: 'That page is not on this site. The phone number is, and it still reaches a technician.',
};

export default function NotFound() {
  return (
    <main id="main" data-route="/404">
      <section className="band band--surface" data-section="not-found">
        <div className="band-inner">
          <p className="eyebrow">404</p>
          <h1 className="h-display" style={{ marginTop: '8px' }}>That page is not here</h1>
          <p className="muted" style={{ marginTop: '16px', maxWidth: '720px' }}>
            Nothing on this site lives at that address. The five pages below are all of it,
            and the number still reaches a technician either way.
          </p>

          <a className="btn btn--call" href={business.phoneHref} style={{ marginTop: '24px' }}>
            <Phone size={18} aria-hidden="true" focusable="false" />
            {business.phone}
          </a>

          <ul className="footer-links" style={{ marginTop: '24px' }}>
            {siteFooter.links.map((l) => (
              <li key={l.href}><Link href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
