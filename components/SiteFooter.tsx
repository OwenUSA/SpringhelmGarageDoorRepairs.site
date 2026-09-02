// components/SiteFooter.tsx — LEAD-OWNED SHELL FILE. Frozen after Prompt 5 (A-6).
//
// NO EMAIL COLUMN, and there never is one: no mailto:, no envelope icon, no "Email us",
// no newsletter or subscribe block (D-03). NO LOCATIONS COLUMN and no city grid — the
// reference's locations band is deleted wholesale and the single SERVICE_AREA sentence
// below is the only survivor (D-02).
//
// The footer's one action is an ACHROMATIC outline button. The single filled chromatic
// action on this site is the call CTA in the header and the mobile call bar; see the
// chromatic-action rule in app/globals.css.

import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { siteFooter } from '@/content/copy';
import { business, directionsUrl } from '@/lib/business';

export default function SiteFooter() {
  return (
    <footer
      className="site-footer band"
      data-section={siteFooter.id}
    >
      <div className="band-inner">
        <div className="footer-grid">
          {/* NAP — name, address, phone. Rendered as real text on every route, so a
              blocked map iframe costs no information at all (spec 07). */}
          <div>
            <h2>{business.name}</h2>
            <address style={{ fontStyle: 'normal' }}>
              <span style={{ display: 'block' }}>{business.street}</span>
              <span style={{ display: 'block' }}>
                {business.locality}, {business.region} {business.postalCode}
              </span>
              <a href={business.phoneHref} className="btn btn--ghost-light" style={{ marginTop: '16px' }}>
                <Phone size={18} aria-hidden="true" focusable="false" />
                {business.phone}
              </a>
            </address>
            <a href={directionsUrl} rel="noopener" className="footer-directions">
              <MapPin size={16} aria-hidden="true" focusable="false" />{' '}
              {siteFooter.directionsLabel}
            </a>
          </div>

          <div>
            <h2>{siteFooter.linksHeading}</h2>
            <ul className="footer-links">
              {siteFooter.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2>{siteFooter.hoursHeading}</h2>
            <p>{siteFooter.hours}</p>
            <h2 style={{ marginTop: '24px' }}>{siteFooter.areaHeading}</h2>
            <p>{siteFooter.area}</p>
          </div>
        </div>
      </div>

      <div className="band-inner band-inner--flush">
        <p className="footer-legal">{siteFooter.legal}</p>
      </div>
    </footer>
  );
}
