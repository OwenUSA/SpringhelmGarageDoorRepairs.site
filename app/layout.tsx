import type { Metadata } from 'next';
import { Lato, Ubuntu } from 'next/font/google';
import { copy, siteHeader } from '@/content/copy';
import { localBusinessJsonLd } from '@/lib/business';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import MobileCallBar from '@/components/MobileCallBar';
import './globals.css';

// FONTS — no substitution floor exists on this site and none may be booked
// (docs/known-divergence.md §3). The reference loads five real faces: Lato 400/700/400i/700i
// and Ubuntu 400, both families served from GoDaddy's Google-Fonts mirror, both SIL OFL /
// Ubuntu Font Licence, both present in next/font/google. D-11's substitution clause does not
// fire — nothing here is a self-hosted licensed face. We load the same two families.
// The reference's other 15 @font-face rules resolve to no loaded file; they are phantoms and
// a phantom face is not a floor.
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
  display: 'swap',
});
const ubuntu = Ubuntu({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ubuntu',
  display: 'swap',
});

// METADATA RULE, stated where it is enforced: there is NO `title.template` here, and there
// never will be. Two sibling sites shipped metadata defects that no gate caught — one had
// the wrong city hardcoded into five route files, the other let a layout template append
// the brand while every route title ALSO named the brand, so all four subpages served it
// twice. Both are structurally impossible here: every title and description is a single
// value read from content/copy.ts, no route file declares a literal, and nothing is
// concatenated onto a title after the fact. Verify over HTTP, not by reading this file.
export const metadata: Metadata = {
  title: copy.routes['/'].meta.title,
  description: copy.routes['/'].meta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lato.variable} ${ubuntu.variable}`}>
      <body>
        <a className="skip-link" href="#main">{siteHeader.skipLabel}</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        {/* Last in DOM order, after the footer — spec 03. */}
        <MobileCallBar />
        {/* LocalBusiness only. No email, no aggregateRating, no review, no priceRange,
            no areaServed city array. See lib/business.ts for why each is absent. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </body>
    </html>
  );
}
