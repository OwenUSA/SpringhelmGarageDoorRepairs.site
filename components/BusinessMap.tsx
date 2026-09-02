// components/BusinessMap.tsx — LEAD-OWNED SHELL FILE. Frozen after Prompt 5 (A-6).
// docs/behavior/07-map-lazy-mount.md. D-07 and D-08.
//
// ===========================================================================================
// THE BYPASS LINK IS THE SECTION'S LITERAL FIRST CHILD. THAT IS THE POINT OF THIS FILE.
// ===========================================================================================
// Three sibling sites shipped their map as a keyboard trap, and every one of them had a spec
// that said not to. The gap sat between two documents where no programmatic gate could see
// it: the spec said "add a bypass link", the builder built the map, and nothing in between
// failed. So the bypass is built here, once, in the shared component, and the four
// acceptance criteria from spec 07 are satisfied by construction on BOTH instances:
//
//   1. section > *:first-child IS the bypass anchor — before the heading, before any
//      wrapper, before anything.
//   2. its href resolves to a tabindex="-1" element positioned AFTER every focusable
//      descendant of the section.
//   3. it is invisible at rest and a >= 44x44 control on :focus-visible (globals.css
//      .map-bypass) — never display:none, which is not focusable at all.
//   4. the iframe has a non-empty title naming the business and the place, plus
//      loading="lazy".
//
// The ids are DERIVED from the section id, not hardcoded, because two maps sharing one
// #after-map id would send one bypass link to the wrong section — and duplicate ids do not
// throw.
//
// No IntersectionObserver (loading="lazy" is the browser primitive), no click-to-load
// facade (the facade image would be a REPLACE asset we have no right to), no map library
// and no API key (D-18). The embed and the directions link are both built from MAP_COORDS;
// the fictional address is NEVER passed to a geocoder (D-07) and is rendered as real text
// beside the map instead.

import { MapPin } from 'lucide-react';
import { business, directionsUrl, mapEmbedUrl } from '@/lib/business';

export interface BusinessMapProps {
  /** our-section-id from docs/sections.md Table B: service-area-map or contact-map */
  sectionId: string;
  heading: string;
  body?: string;
  bypassLabel: string;
  mapTitle: string;
  directionsLabel: string;
  /** 13 on / (service-area question), 15 on /contact (location question) */
  zoom: number;
}

export default function BusinessMap({
  sectionId, heading, body, bypassLabel, mapTitle, directionsLabel, zoom,
}: BusinessMapProps) {
  const afterId = `after-${sectionId}`;
  return (
    <section className="band band--surface" data-section={sectionId}>
      {/* FIRST CHILD. Nothing goes above this line. */}
      <a className="map-bypass" href={`#${afterId}`}>{bypassLabel}</a>

      <div className="band-inner">
        <h2 className="h-section">{heading}</h2>
        {body ? <p className="muted" style={{ marginTop: '8px' }}>{body}</p> : null}

        <div className="map-frame" style={{ marginTop: '24px' }}>
          <iframe title={mapTitle} src={mapEmbedUrl(zoom)} loading="lazy" />
        </div>

        <div className="map-meta">
          <address style={{ fontStyle: 'normal' }}>{business.addressLine}</address>
          <a href={directionsUrl} rel="noopener" className="btn btn--ghost-dark">
            <MapPin size={18} aria-hidden="true" focusable="false" />
            {directionsLabel}
          </a>
        </div>
      </div>

      {/* Bypass target: after every focusable descendant of the section. */}
      <span id={afterId} tabIndex={-1} />
    </section>
  );
}
