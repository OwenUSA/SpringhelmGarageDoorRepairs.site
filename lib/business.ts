// lib/business.ts — THE single source of truth for business facts. FACTS ONLY.
//
// No copy lives here. Every sentence the site renders is in content/copy.ts; this module
// holds the CONSTANTS from CLAUDE.md plus the values derived mechanically from them
// (tel: href, map embed URLs, JSON-LD). `business` itself is re-exported from
// content/copy.ts rather than restated, so there is exactly ONE place a phone number or an
// address is written down. A sibling site hardcoded a city into five route files and no
// gate caught it.
//
// EVERY FACT BELOW IS FICTIONAL AND DELIBERATE (CLAUDE.md §0). The address does not exist;
// the coordinates are real Apex, NC coordinates and the map is embedded BY COORDINATES
// ONLY, per D-07 — the fake address is never passed to a geocoder. The phone is in the
// 555-01XX reserved range and cannot ring anyone. All of it is listed in
// docs/PRE-LAUNCH.md as must-replace-before-public.

import { business } from '@/content/copy';

export { business };

/** Local-only build (D-18). This value exists solely so robots/sitemap/JSON-LD can emit
 *  absolute URLs; nothing is deployed to it. */
export const SITE_URL = 'https://springhelmgaragedoorrepairs.site';

/** ROUTES is fixed at five (D-01). Adding one is out of scope. There is no /locations
 *  route and no city grid (D-02); the SERVICE_AREA sentence in the footer is the only
 *  survivor of that band. */
export const ROUTES = ['/', '/about', '/services', '/contact', '/privacy'] as const;
export type Route = (typeof ROUTES)[number];

/** D-07: keyless, coordinates only, never the address string. */
export function mapEmbedUrl(zoom: number): string {
  return `https://www.google.com/maps?q=${business.mapCoords}&z=${zoom}&output=embed`;
}

/** D-08: directions by coordinates too — the fake address would not geocode. */
export const directionsUrl =
  `https://www.google.com/maps/dir/?api=1&destination=${business.mapCoords}`;

const [lat, lng] = business.mapCoords.split(',');

/** LocalBusiness JSON-LD.
 *  Deliberately ABSENT and never to be added:
 *    - `email`                        D-03, no email in any form, including in schema
 *    - `aggregateRating` / `review`   D-13, fabricated review markup is a legal problem
 *    - `priceRange`                   D-12, no prices and no price bands
 *    - `areaServed` city array        D-02, the locations grid is deleted wholesale
 *    - `foundingDate`, `award`,       D-14/D-17, not invented
 *      `hasCredential`
 */
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: business.name,
  url: SITE_URL,
  telephone: business.phone,
  image: `${SITE_URL}/placeholders/logo-wordmark.svg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.street,
    addressLocality: business.locality,
    addressRegion: business.region,
    postalCode: business.postalCode,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: lat,
    longitude: lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
      ],
      opens: business.hoursOpens,
      closes: business.hoursCloses,
    },
  ],
} as const;
