// components/MobileCallBar.tsx — LEAD-OWNED SHELL FILE. Frozen after Prompt 5 (A-6).
// docs/behavior/03-mobile-call-bar.md.
//
// A DELIBERATE ADDITION: the reference has zero sticky elements and exactly ONE tel: link
// across all five of its pages. This is a NOVEL row on all five routes.
//
// It is a server component and it is rendered in the ROOT LAYOUT, last in DOM order, after
// the footer. Two consequences, both required:
//   - it is not remounted on a <Link> navigation, so it does not flicker at the bottom of
//     the viewport on every client-side route change;
//   - a visitor tabbing from the top reaches the header CTA first and this one last.
//
// No scroll handler, no IntersectionObserver, no JS breakpoint toggle. The media query in
// app/globals.css is the breakpoint. `env(safe-area-inset-bottom)` is not decoration —
// without it the bottom ~34px of the tap target sits under the iOS home indicator, on the
// one control the entire site exists to deliver.

import { Phone } from 'lucide-react';
import { mobileCallBar } from '@/content/copy';
import { business } from '@/lib/business';

export default function MobileCallBar() {
  return (
    <div className="call-bar" data-section={mobileCallBar.id}>
      <a href={business.phoneHref} aria-label={mobileCallBar.aria}>
        <Phone size={20} aria-hidden="true" focusable="false" />
        {mobileCallBar.label}
      </a>
    </div>
  );
}
