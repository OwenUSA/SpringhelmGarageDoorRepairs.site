// app/sitemap.ts — generated from the ROUTES constant, never from a hand-written list.
//
// Four sibling sites reached their final acceptance sweep with robots.ts, sitemap.ts and
// not-found.tsx all missing, so all three land here at Prompt 5 instead.
//
// D-02: there is no /locations route, no city grid and no per-city entry — the reference's
// locations band is deleted wholesale and cannot leak back in through a sitemap, because
// this file cannot name a route that is not in ROUTES.

import type { MetadataRoute } from 'next';
import { ROUTES, SITE_URL } from '@/lib/business';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/privacy' ? ('yearly' as const) : ('monthly' as const),
    priority: route === '/' ? 1 : 0.7,
  }));
}

export const dynamic = "force-static";
