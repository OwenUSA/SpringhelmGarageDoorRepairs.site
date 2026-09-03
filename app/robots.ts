// app/robots.ts
//
// This is a LOCAL-ONLY build (D-18) and nothing is deployed, so the policy here is the one
// that is safe if it ever is: allow the five routes, point at the sitemap, and disallow
// nothing, because there is nothing on this site that is not meant to be read.
//
// No analytics, no tracking pixels, no chat widget and no cookie banner ship (D-15), so
// there are no vendor paths to exclude either.

import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/business';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

export const dynamic = "force-static";
