import type { Metadata } from 'next';
import { copy } from '@/content/copy';
import './globals.css';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
