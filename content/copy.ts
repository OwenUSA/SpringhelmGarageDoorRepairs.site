// content/copy.ts — every word this site renders, in one typed module.
//
// WHY THIS FILE EXISTS AT ALL: two sibling sites shipped metadata defects that no gate
// caught, because their titles and descriptions were hardcoded into route files. One had
// the wrong city in five separate blocks; the other let `title.template` append the brand
// while every route title also named the brand, so all four subpages served it twice.
// Route files therefore read `copy.routes[...].meta` and MUST NOT declare a literal
// title or description of their own.
//
// It is also the input to the Prompt 3 lexical gate:
//   node ../_shared/harness/src/similarity.mjs
// which flattens every string under `routes[].sections[]` (skipping the structural keys
// id / refSection / cls) and requires, per section, ZERO shared 5-grams with the ENTIRE
// reference corpus and a trigram Jaccard <= 0.15 against the paired reference section.
// `business` sits OUTSIDE `routes` on purpose: it is CONSTANTS, not copy.
//
// PROPOSITION, held on all five routes: a real person answers the phone. Not speed, not
// workmanship, not transparency. One number reaches one technician, with no handoffs.
//
// EVERY BUSINESS FACT BELOW IS FICTIONAL AND DELIBERATE — see CLAUDE.md and
// docs/PRE-LAUNCH.md. Anything not in CONSTANTS is TODO(fact) and renders VISIBLY.

export type SectionClass = 'ADAPTED' | 'NOVEL';

export interface SectionMeta {
  /** our-section-id — must match docs/sections.md Table B, column 3 */
  readonly id: string;
  /** ref-section-id from docs/sections.md Table B, column 2; null only for NOVEL */
  readonly refSection: string | null;
  readonly cls: SectionClass;
}

export interface PageMeta {
  readonly title: string;
  readonly description: string;
}

// ---------------------------------------------------------------------------------------
// business facts — CONSTANTS, not copy. Excluded from the lexical gate by construction.
// ---------------------------------------------------------------------------------------
export const business = {
  name: 'Springhelm Garage Door Repairs',
  tagline: 'One number, one technician, no handoffs.',
  phone: '(919) 555-0158',
  phoneHref: 'tel:+19195550158',
  street: '2619 Halloway Trace',
  locality: 'Apex',
  region: 'NC',
  postalCode: '27502',
  addressLine: '2619 Halloway Trace, Apex, NC 27502',
  mapCoords: '35.7327,-78.8503',
  hoursLabel: '7 days, 7:00 AM – 7:00 PM',
  hoursOpens: '07:00',
  hoursCloses: '19:00',
  serviceArea: 'Serving Apex and the west Raleigh metro.',
} as const;

// ---------------------------------------------------------------------------------------
// TODO(fact) — rendered VISIBLY wherever the reference asserted something we will not
// invent (D-14, D-17). Mirrored in docs/facts-needed.md.
// ---------------------------------------------------------------------------------------
export const facts = {
  years: 'TODO(fact): years in business',
  licence: 'TODO(fact): NC contractor licence number',
  insurance: 'TODO(fact): liability insurance carrier and policy status',
  teamSize: 'TODO(fact): number of technicians',
  jobsDone: 'TODO(fact): jobs completed to date',
  responseTime: 'TODO(fact): typical time from call to arrival',
  brands: 'TODO(fact): opener brands carried',
  warranty: 'TODO(fact): warranty terms on parts and labour',
  logo: 'TODO(fact): logo asset',
} as const;

// ---------------------------------------------------------------------------------------
// SHARED SHELL — one object, rendered on every route. The reference nav bar band measures
// 61 characters at 1440; this object is written to that budget.
// ---------------------------------------------------------------------------------------
export const siteHeader = {
  id: 'site-header',
  refSection: 's00-8bfc40ab-0a94-44df-9c3c-e207b8bf291c',
  cls: 'ADAPTED',
  skipLabel: 'Skip to content',
  menuLabel: 'Menu',
  ctaLabel: 'Call now',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
  ],
} as const;

// On `/` the reference merges the nav INTO the hero band, so our header there is NOVEL and
// carries no ref id. Same object, different contract row — see docs/sections.md decision 1.
export const siteHeaderHome = { ...siteHeader, refSection: null, cls: 'NOVEL' } as const;

export const siteFooter = {
  id: 'site-footer',
  refSection: 's03-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd',
  cls: 'ADAPTED',
  linksHeading: 'Quick links',
  areaHeading: 'Where we work',
  hoursHeading: 'When we answer',
  area: 'Serving Apex and the west Raleigh metro.',
  hours: 'Open seven days a week, 7:00 AM to 7:00 PM.',
  callLabel: 'Call now',
  directionsLabel: 'Get directions',
  legal: '© 2026 Springhelm Garage Door Repairs.',
  links: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
  ],
} as const;

export const mobileCallBar = {
  id: 'mobile-call-bar',
  refSection: null,
  cls: 'NOVEL',
  label: 'Call a technician',
  aria: 'Call Springhelm now',
} as const;

// The footer band is the same GUID on every route but a DIFFERENT ordinal, and the lexical
// gate resolves the paired reference section from the sNN prefix. A single shared
// refSection would compare /about's footer against /about's blog feed (2122 chars) and
// manufacture a length failure out of nothing.
const footerOn = (refSection: string) => ({ ...siteFooter, refSection }) as const;

// ---------------------------------------------------------------------------------------
// / — home
// Reference band order: hero(s00) -> mission(s01) -> blog grid(s02) -> footer(s03).
// STRUCTURAL CHANGE R1: `mission` moves BELOW `services-grid`. The proposition lands after
// the reader has seen what we actually fix, not before.
// STRUCTURAL CHANGE A1: `service-area-map` is added (D-08); the reference embeds no map.
// ---------------------------------------------------------------------------------------
export const homeHero = {
  id: 'hero',
  refSection: 's00-8bfc40ab-0a94-44df-9c3c-e207b8bf291c-eastern-nc-s-only-owens-corning-pl',
  cls: 'ADAPTED',
  eyebrow: 'Apex and west Raleigh',
  heading: 'One number, one technician, no handoffs.',
  sub: 'Ring Springhelm and a garage door technician picks up. Not a dispatcher, not a queue, not somebody who rings back.',
  ctaPrimary: 'Call now',
  ctaSecondary: 'What we fix',
} as const;

export const homeServicesGrid = {
  id: 'services-grid',
  refSection: 's02-fb5ab59e-a191-4386-b2d2-3e5f2f5b67f3-blog',
  cls: 'ADAPTED',
  heading: 'What we fix',
  intro: 'Eight jobs cover almost every call that reaches this number. Tell whoever picks up which one sounds like your door and you will already be talking to the technician who does that work, rather than to somebody whose job is to write it down and pass it along to a person you have not met yet.',
  cards: [
    {
      title: 'Spring repair and replacement',
      body: 'A snapped torsion or extension spring makes the door dead weight and the opener useless. Springs are replaced in matched pairs and re-tensioned on site.',
    },
    {
      title: 'Opener repair and installation',
      body: 'Dead motors, stripped gears, drifting travel limits, remotes that work from six feet and nowhere else. Repaired where repair is honest, replaced where it is not.',
    },
    {
      title: 'Cable, roller, and track repair',
      body: 'Frayed cables, seized rollers, and bent track are what turn a small noise into a stuck door. All three get checked together, because they fail together.',
    },
    {
      title: 'Panel replacement',
      body: 'One reversed panel after a bumper meets the bottom section, or a full set where rust and delamination have gone past the point of patching.',
    },
    {
      title: 'Off-track and misaligned door correction',
      body: 'A door hanging out of its track is the call we want first, before somebody tries the opener again and bends the rest of the section.',
    },
    {
      title: 'New residential door installation',
      body: 'Measure, remove, install, balance, and cycle the finished door with you standing there. The old door and packaging leave with the technician.',
    },
    {
      title: 'Commercial and roll-up doors',
      body: 'Rolling steel, sectional bays, and counter shutters. Barrel tension, drum wear, and curtain damage handled in place, without pulling down the whole assembly and losing the bay for a second day.',
    },
    {
      title: 'Annual maintenance and tune-up',
      body: 'Balance test, hardware torque, roller and hinge service, opener force settings, and photo-eye alignment, once a year, in about an hour. It is the cheapest visit on this list and it prevents most of the others.',
    },
  ],
  note: 'If none of the eight describes what yours is doing, ring anyway. Describing it out loud to a technician is usually quicker than reading.',
  ctaLabel: 'Call a technician',
} as const;

export const homeMission = {
  id: 'mission',
  refSection: 's01-135f9822-117a-4b01-b1dc-9ac033c3d647',
  cls: 'ADAPTED',
  heading: 'Who picks up',
  bodyA: 'The person who answers this phone is the person who will be standing in your driveway. Nobody takes a message, nobody opens a ticket, and nobody makes you describe the noise a second time.',
  bodyB: 'One technician owns the repair from the first ring to the last cycle of the finished door.',
  factYears: 'TODO(fact): years in business',
  factLicence: 'TODO(fact): NC contractor licence number',
} as const;

export const homeMap = {
  id: 'service-area-map',
  refSection: null,
  cls: 'NOVEL',
  heading: 'Where we work',
  body: 'Apex, and the towns either side of it in the west Raleigh metro.',
  bypassLabel: 'Skip the map',
  mapTitle: 'Map showing the Springhelm Garage Door Repairs service area around Apex, North Carolina',
  directionsLabel: 'Get directions',
} as const;

// ---------------------------------------------------------------------------------------
// /about
// Reference band order: nav(s00) -> intro(s01) -> statement banner(s02) -> blog(s03)
//                       -> connect(s04) -> footer(s05).
// STRUCTURAL CHANGE R2: `about-banner` moves ABOVE `about-intro`.
// STRUCTURAL CHANGE D1: s03, the blog feed, is DROPPED (D-01).
// ---------------------------------------------------------------------------------------
export const aboutBanner = {
  id: 'about-banner',
  refSection: 's02-a2df0b9d-1e65-4d9b-9922-d9ddeb8e7097-built-on-trust-driven-by-quality',
  cls: 'ADAPTED',
  heading: 'The phone is the whole business',
  sub: 'What people say once the door closes again.',
  quotes: [
    '[TESTIMONIAL PLACEHOLDER] Two or three sentences of a real customer describing the call, the arrival, and the door. Roughly this long.',
    '[TESTIMONIAL PLACEHOLDER] A second account at the same length, from a different job, so the block is tested at a realistic depth.',
    '[TESTIMONIAL PLACEHOLDER] A third, again this length, to fill the row without inventing a name, a rating, or a date.',
  ],
  note: 'TODO(fact): customer testimonials with permission',
} as const;


export const aboutIntro = {
  id: 'about-intro',
  refSection: 's01-cc079ee9-3097-4a36-99bf-9be2910325f9-about-us',
  cls: 'ADAPTED',
  heading: 'About Springhelm',
  bodyA: 'Springhelm is a garage door repair outfit in Apex, North Carolina, built around one deliberately old-fashioned rule: the number on this site reaches a technician, and that technician is the one who turns up.',
  bodyB: 'Most of what goes wrong with a garage door is diagnosable over the phone in about ninety seconds. A snapped spring sounds like a gunshot in the garage. A door that lifts six inches and stops is usually a safety sensor. A grinding opener is nearly always a nylon gear. When the person hearing that description is the person who will carry the parts, the right parts arrive on the first visit.',
  bodyC: 'Handing that call to a dispatcher breaks the chain. The symptom gets written down as a category, the category becomes a work order, and the technician arrives knowing less than the homeowner did. We removed the middle of that chain rather than trying to make it quicker.',
  bodyD: 'We work residential and light commercial across Apex and the west Raleigh metro, seven days a week between seven in the morning and seven in the evening. Outside those hours the phone is honest about it and does not pretend that somebody is sitting there listening to it ring.',
  factTeam: 'TODO(fact): number of technicians',
  factYears: 'TODO(fact): years in business',
  factInsurance: 'TODO(fact): liability insurance carrier and policy status',
} as const;

export const aboutConnect = {
  id: 'about-cta',
  refSection: 's04-da4df260-12ed-4b0c-a191-41345ba3c6ed-connect-with-us',
  cls: 'ADAPTED',
  heading: 'Ring us direct',
} as const;

// ---------------------------------------------------------------------------------------
// /services
// Reference band order: nav(s00) -> CTA banner(s01) -> service grid(s02) -> footer(s03).
// STRUCTURAL CHANGE R3: `services-banner` moves to the BOTTOM, after the list and the FAQ,
// where a call CTA belongs once the reader has found their symptom.
// STRUCTURAL CHANGE A2: `services-faq` is added; the reference has zero accordions.
// STRUCTURAL CHANGE G1: the eight services are grouped by SYMPTOM, not by system or
// material. Each of the eight appears in exactly ONE group.
// ---------------------------------------------------------------------------------------
export const servicesList = {
  id: 'services-list',
  refSection: 's02-40dbc796-8809-4de1-bbf0-41172d7089a6-expert-roofing-services-for-your-h',
  cls: 'ADAPTED',
  heading: 'Start with what the door is doing',
  intro: 'Nobody rings a garage door company wanting a torsion spring. They ring because the door will not shut, or because it has started making a noise that was not there last week. So the list below is arranged by what you are actually looking at and listening to, rather than by which component turns out to be at fault once somebody has had a proper look at it.',
  groups: [
    {
      symptom: 'Your door will not close',
      body: 'It reverses halfway, refuses to move, or sits crooked in the opening. Usually a safety sensor, a cable off its drum, or a section that has left the track.',
      items: ['Off-track and misaligned door correction', 'Cable, roller, and track repair'],
    },
    {
      symptom: 'It is loud',
      body: 'Grinding, rattling, or a bang at the top of travel. Noise is a symptom of wear somewhere specific, and it is cheap to deal with before it becomes a breakage.',
      items: ['Opener repair and installation', 'Annual maintenance and tune-up'],
    },
    {
      symptom: 'The spring snapped',
      body: 'You heard it go and now the door weighs what it actually weighs. Do not use the opener. This is the one job where the phone call should come before anything else at all.',
      items: ['Spring repair and replacement'],
    },
    {
      symptom: 'It looks wrecked',
      body: 'A reversed bottom section, rust along the seams, or a door that has simply reached the end of its life. Sometimes that is one panel, sometimes it is the whole thing.',
      items: ['Panel replacement', 'New residential door installation'],
    },
    {
      symptom: 'The bay door is down and the shop has stopped',
      body: 'Rolling steel and sectional bays fail differently from house doors, and they cost a great deal more per hour of downtime than a stuck car does. Same number, same technician, same day where we can manage it.',
      items: ['Commercial and roll-up doors'],
    },
  ],
  factWarranty: 'TODO(fact): warranty terms on parts and labour',
  factBrands: 'TODO(fact): opener brands carried',
  factResponse: 'TODO(fact): typical time from call to arrival',
} as const;

export const servicesFaq = {
  id: 'services-faq',
  refSection: null,
  cls: 'NOVEL',
  heading: 'Questions people ask on the phone',
  items: [
    {
      q: 'Can a broken torsion spring be repaired rather than replaced?',
      a: 'No. A spring that has failed has fatigued along its whole length, and re-winding or welding it is not safe. Both springs are changed together so the door stays balanced afterwards.',
    },
    {
      q: 'Why does the door go down and then come straight back up?',
      a: 'Almost always the photo-eye safety sensors: knocked out of alignment, dusty, or with a broken wire. The opener reads a blocked beam and reverses, which is exactly what it is built to do.',
    },
    {
      q: 'Should the door be hard to lift by hand?',
      a: 'No. Pull the release cord and lift it manually. A balanced door moves with one hand and stays put wherever you leave it. If it slams down or shoots upward, the spring tension is wrong.',
    },
    {
      q: 'How often does a garage door need servicing?',
      a: 'Once a year for an average household. A door cycling four or five times a day is doing far more work than most people assume, and rollers and hinges wear out on a schedule.',
    },
    {
      q: 'Can I just replace one damaged panel?',
      a: 'Often yes, if the model is still manufactured and the rest of the door is sound. Where the section is discontinued or the frame has twisted, a single new panel will never sit flush.',
    },
    {
      q: 'Is a noisy opener a sign of something serious?',
      a: 'It depends what the noise is. A grind is usually the nylon drive gear. A rattle is usually loose hardware. A bang at the top of travel is worth ringing about the same day.',
    },
  ],
} as const;

export const servicesBanner = {
  id: 'services-banner',
  refSection: 's01-13e60568-832a-4443-be52-6e2b69203ea4-experience-quality-roofing-service',
  cls: 'ADAPTED',
  heading: 'Describe the noise to the person who is going to fix it. No middle step.',
  ctaLabel: 'Call a technician right now',
} as const;

// ---------------------------------------------------------------------------------------
// /contact
// Reference band order: nav(s00) -> form(s01) -> Locations grid(s02) -> connect(s03)
//                       -> footer(s04).
// STRUCTURAL CHANGE R4: `contact-connect` moves ABOVE the form. The point of the page is
// the phone number, so it is not buried underneath a form.
// STRUCTURAL CHANGE D2: s02, the multi-city Locations grid, is DROPPED (D-02).
// The reference's own form band already carried the address and the hours table, so our
// NAP block lives there too, not in the connect band.
// ---------------------------------------------------------------------------------------
export const contactConnect = {
  id: 'contact-connect',
  refSection: 's03-10fb85d2-e1cf-4b76-aa86-f4fec0038f75-connect-with-us',
  cls: 'ADAPTED',
  heading: 'Call this number',
} as const;

export const contactForm = {
  id: 'contact-form',
  refSection: 's01-0b5ed9f0-d323-4637-8f34-841c8a524529-contact-us',
  cls: 'ADAPTED',
  heading: 'Ask for a callback',
  sub: 'Ringing is faster. If you would rather be called back, leave a window and a technician will use it.',
  fields: {
    name: 'Your name',
    phone: 'Phone number',
    service: 'What is the door doing?',
    window: 'Best time to ring you',
    message: 'Anything else worth knowing',
  },
  serviceOptions: [
    'It will not close',
    'It is loud',
    'The spring snapped',
    'It looks wrecked',
    'Commercial or roll-up door',
    'Yearly service',
  ],
  windowOptions: ['Morning', 'Afternoon', 'Evening'],
  submitLabel: 'Request a callback',
  successHeading: 'Noted. We will ring you.',
  successBody: 'Nothing was transmitted anywhere. This form has no destination yet.',
  errorRequired: 'This one is needed.',
  errorPhone: 'That does not look like a phone number.',
  napHeading: 'Where we are',
  hoursHeading: 'When the phone is answered',
  hoursBody: 'Every day, seven in the morning until seven in the evening.',
  noEmailNote: 'We take no email addresses, here or anywhere else on this site.',
} as const;

export const contactMap = {
  id: 'contact-map',
  refSection: null,
  cls: 'NOVEL',
  heading: 'Find us',
  bypassLabel: 'Skip the map',
  mapTitle: 'Map of the Springhelm Garage Door Repairs location in Apex, North Carolina',
  directionsLabel: 'Get directions',
} as const;

// ---------------------------------------------------------------------------------------
// /privacy — D-16. The policy describes what this site ACTUALLY does. It sets no cookies
// beyond what the framework needs to serve a page, runs no analytics, embeds no chat
// widget, ships no tracking pixel, shows no consent banner, and collects no email address
// anywhere. It does not claim GDPR or CCPA compliance.
// ---------------------------------------------------------------------------------------
export const privacyBody = {
  id: 'privacy-body',
  refSection: 's01-5fa47a62-93ca-4033-8c12-75bea1c9a6c3-privacy-policy',
  cls: 'ADAPTED',
  reviewNotice: 'UNREVIEWED TEMPLATE — requires legal review before launch',
  heading: 'Privacy Policy',
  updated: 'TODO(fact): date this policy was adopted',
  intro: 'This page sets out what Springhelm Garage Door Repairs does with information you give it. It matches how the site is actually built, so where the answer is nothing, it says nothing.',
  sections: [
    {
      h: 'What the callback form asks for',
      p: 'The callback form asks for a name, a phone number, which symptom the door has, a preferred window for the return call, and an optional note. Those five fields exist so a technician can ring you back and turn up prepared.',
    },
    {
      h: 'No email address is collected',
      p: 'There is no email field anywhere on this site, and no way to sign up for anything. If you would like an emailed record of something, we cannot provide one, because nowhere here takes an address.',
    },
    {
      h: 'Where the form goes',
      p: 'Nowhere, at present. The form has no submission target: it validates inside your browser, shows a confirmation, and forgets what you typed when the page closes. Until that changes, the phone number is the only reliable way to reach us.',
    },
    {
      h: 'Cookies and similar storage',
      p: 'This site sets no advertising, analytics, or preference cookies, and shows no consent banner because there is nothing to consent to. The framework may set a short-lived technical cookie to serve pages correctly; it carries no identifier.',
    },
    {
      h: 'Measurement and third-party scripts',
      p: 'No analytics package, no tag manager, no heat-mapping, no advertising pixel, no chat widget, and no split-testing script runs on any page here. Nothing on this site reports your visit to another company.',
    },
    {
      h: 'The embedded maps',
      p: 'Two pages embed a map frame served by Google, one on the home page and one on the contact page. Loading that frame is a request to Google and is governed by their terms, not ours. Both load only once scrolled into view.',
    },
    {
      h: 'Who sees what you tell us',
      p: 'The technician handling your job, and nobody else. What you say on the phone or type into the callback form is not sold, rented, traded, or handed on, because there is nobody to hand it to.',
    },
    {
      h: 'How long anything is kept',
      p: 'Call notes are kept while a job is open, and afterwards for as long as they help in servicing the same door again. Ask on the phone and the notes held against your address will be deleted.',
    },
    {
      h: 'Children',
      p: 'This is a garage door repair business. Nothing here is aimed at children, and the site has no account system and no feature that would let anybody of any age register.',
    },
    {
      h: 'Changes to this page',
      p: 'When the site changes, this page changes with it. A form that gains a destination, or a script that gains a purpose, gets written down here before it ships.',
    },
    {
      h: 'Asking us about any of this',
      p: 'By phone or by post. Both are listed below, and there is deliberately no third option.',
    },
  ],
  contactHeading: 'How to reach us about this policy',
} as const;

// ---------------------------------------------------------------------------------------
// routes — the shape similarity.mjs reads, and the shape route files read for metadata.
// Section ORDER here is the BUILT order, which is the reordered order (R1-R4).
// ---------------------------------------------------------------------------------------
export const copy = {
  business,
  facts,
  routes: {
    '/': {
      meta: {
        title: 'Springhelm Garage Door Repairs — Apex, NC',
        description:
          'Garage door repair in Apex and west Raleigh. Ring the number and a technician picks it up: springs, openers, cables, track, panels, and commercial roll-up doors.',
      },
      sections: [
        siteHeaderHome,
        homeHero,
        homeServicesGrid,
        homeMission,
        homeMap,
        footerOn('s03-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd'),
        mobileCallBar,
      ],
    },
    '/about': {
      meta: {
        title: 'About Springhelm Garage Door Repairs — Apex, NC',
        description:
          'Springhelm is a garage door outfit in Apex, NC built on one rule: the number reaches a technician, and that technician is the one who turns up at your house.',
      },
      sections: [
        siteHeader,
        aboutBanner,
        aboutIntro,
        aboutConnect,
        footerOn('s05-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd'),
        mobileCallBar,
      ],
    },
    '/services': {
      meta: {
        title: 'Garage Door Services by Symptom — Springhelm, Apex NC',
        description:
          'Springs, openers, cables and track, panels, off-track doors, new installs, commercial roll-ups, and yearly service. Grouped by symptom, answered by a technician.',
      },
      sections: [
        siteHeader,
        servicesList,
        servicesFaq,
        servicesBanner,
        footerOn('s03-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd'),
        mobileCallBar,
      ],
    },
    '/contact': {
      meta: {
        title: 'Contact Springhelm Garage Door Repairs — Apex, NC',
        description:
          'Ring Springhelm in Apex, NC seven days a week from 7:00 AM to 7:00 PM, or leave a callback window. No email, no queue, no dispatcher sitting in the middle.',
      },
      sections: [
        siteHeader,
        contactConnect,
        contactForm,
        contactMap,
        footerOn('s04-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd'),
        mobileCallBar,
      ],
    },
    '/privacy': {
      meta: {
        title: 'Privacy Policy — Springhelm Garage Door Repairs',
        description:
          'What Springhelm Garage Door Repairs does with what you tell it: no email collected, no analytics, no advertising cookies, and no consent banner because there is nothing to consent to.',
      },
      sections: [
        siteHeader,
        privacyBody,
        footerOn('s02-aa99edc2-9e1b-47b8-9184-7241d5a5a3dd'),
        mobileCallBar,
      ],
    },
  },
} as const;

export type Routes = keyof typeof copy.routes;
export default copy;
