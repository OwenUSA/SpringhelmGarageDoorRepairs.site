// components/Reveal.tsx — a LITERAL PASS-THROUGH. It renders its children and nothing else.
//
// This file exists to CLOSE a decision, not to open one. docs/behavior/08-scroll-reveal.md
// records a negative finding: the reference has zero motion of any kind (gsap, ScrollTrigger,
// lenis, locomotive, aos, wow, swiper, slick all false; 0 [data-aos]; 0 CSS-animated
// elements), and this site therefore has NO scroll reveal at all.
//
// A sibling site shipped a Reveal component that started at `opacity: 0` and cleared it from
// an IntersectionObserver — against its own spec. The observer did not fire for every band,
// and the acceptance sweep measured 165 text boxes as having no visible text. That is a total
// content loss with a silent failure signature: no console error, no failed request, blank
// bands.
//
// So the component is a no-op wrapper with no element, no state, no effect and no styles.
// Spec 08's absolute rules, restated where a builder will actually read them:
//
//   - no `opacity: 0` initial state ANYWHERE on this site;
//   - no IntersectionObserver for visual purposes (the sticky-header sentinel in
//     SiteHeader.tsx is the site's only observer, and it toggles an attribute on an element
//     that is already visible);
//   - no `will-change` on any band;
//   - scroll position is never read on a scroll event.
//
// If a section needs motion, it is a state transition on an element the user is directly
// interacting with, and its duration is one of the eight numbers in spec 08's table.

import type { ReactNode } from 'react';

export default function Reveal({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
