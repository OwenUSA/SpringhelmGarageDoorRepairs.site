// Per-site harness config -- Springhelm Garage Door Repairs.
// The shared harness at ../_shared/harness carries no site data by design.
// See _shared/harness/src/config.mjs for the full field list and defaults.

export default {
  // Points at the LOCAL reference server. Start it from this site root:
  //   node ../_shared/harness/src/serve-reference.mjs
  // It resolves the port from this value, hard-fails on a collision, and prints the served
  // <title> at startup. Verify that title before trusting any capture -- a sibling's server
  // on a shared port answered 200 with the WRONG site and the numbers looked entirely normal.
  referenceOrigin: process.env.REF_ORIGIN || 'http://127.0.0.1:3210',
  devPort: 3110,

  // ref path -> our route. The package keys on the REFERENCE path.
  // Live reference: https://roofingsolutionsnc.com/
  routeMap: {
    '/': '/',
    '/about': '/about',
    '/services': '/services',
    '/contact': '/contact',
    '/privacy-policy': '/privacy',
  },

  breakpoints: { diff: [390, 768, 1440], extra: [430], canonical: 1440 },

  // ---- segmentation (PROFILED, Prompt 1, from the SAVED copy in reference/raw) --------
  // Reference builder: GoDaddy Website Builder 8.0 ("Starfield"), the "x" theme. NOT Divi,
  // Elementor, Avada or a bespoke theme -- a fifth builder for the fleet.
  //
  // The page skeleton is:  [data-ux="Page"] > div > div(band) > div[data-ux="Header|Widget|WidgetBanner"]
  // The band wrapper carries NO data-ux of its own, which is why it is selected positionally.
  // `section[data-ux="Section"]` is NOT sufficient on its own: the two WidgetBanner bands
  // (/about "Built on Trust", /services CTA banner) are bands but contain no <section>, so
  // that selector silently drops them (6 bands -> 5, 4 bands -> 3).
  //
  // There are ZERO <header>, <footer> and <main> tags in the reference markup. Bare
  // header/footer in chromeSelectors therefore match nothing on the ref side; they exist
  // for OUR side only, where the shell declares them, and are backed up by identityAttr.
  sectionCandidates: [
    '[data-ux="Page"] > div > div',
    'section[data-ux="Section"]',
    'main > section',
    'section',
  ],
  // EXACT selectors only -- config.mjs REFUSES a [class*=] matcher at startup, because one
  // matched <body class="pb-callbar"> on a sibling and containment-dedup then deleted
  // HEADER and FOOTER from every capture.
  chromeSelectors: ['header', 'footer'],
  identityAttr: 'data-section',
  headerSelector: '[data-ux="Header"], header',
  navToggleSelector: '[data-aid="HAMBURGER_MENU_LINK"], button[aria-controls], .menu-toggle',
  drawerSelector: '[data-ux="NavigationDrawer"], [data-drawer], .nav-drawer',
  ctaSelector: 'a[href^="tel:"], button, [data-aid="HEADER_CTA_BTN"], [data-ux="ButtonPrimary"]',
  logoSelector: '[data-aid="HEADER_LOGO_IMAGE_RENDERED"], header img, .logo img, #logo',
  iconFontFamilies: /fontawesome|icomoon|material|elementskit|awb-icons|eicons/i,

  thresholds: { fidelity: 2, struct: 5, token: 0 },
  fidelityMode: 'auto',

  tokenSources: ['app/globals.css', 'app/tokens.css', 'styles/tokens.css'],
  contractPath: 'docs/sections.md',
  reportPath: 'docs/divergence.md',
  copyModulePath: 'content/copy.ts',

  industryAllowlist: [
    'garage door', 'torsion spring', 'extension spring', 'opener', 'cable', 'roller',
    'track', 'panel', 'off-track', 'remote', 'keypad', 'sensor', 'weather seal',
    'residential', 'commercial', 'same-day', 'free estimate', 'repair', 'installation',
    'replacement',
  ],
  gramN: 5,
  trigramMax: 0.15,
  lengthTolerance: 0.1,

  // ---- palette (merged Prompt 5+9) ---------------------------------------------------
  // TARGET PRIMARY HUE WINDOW FOR THIS SITE: 5-25 (red / orange)
  //
  // The fleet's hue space is nearly full. Seven sites already hold 46, 150, 184, 217, 252,
  // 270 and 332, which at ~30 degrees of separation leaves roughly four usable windows for
  // the four sites being added. Each new site is therefore assigned one, rather than told
  // to avoid a list -- "avoid these seven" is unsatisfiable guidance at this density.
  //
  // Land the winning primary inside the window above. Steer the masterSeed to get there;
  // never touch the selection rule, which is what keeps the CTA the highest-contrast
  // element. Report how many seeds you tried. Note the auto-selector is structurally biased
  // toward magenta accents -- at fixed OKLCH L/C the lowest luminance sits near hue 300-360
  // -- so seeds landing there are common and must be re-rolled unless that IS your window.
  masterSeed: 3115,   // steered at Prompt 5 — see the WINNING SEED note at the tail of this file
  gradientSamples: 5,

  // ---- referenceRamp: EXTRACTED, Prompt 5 ---------------------------------------------
  // Sampled from computed styles on the LOCAL reference server (127.0.0.1:3210, served
  // <title> verified "Roofing Solutions NC LLC") across all five saved pages at 1440.
  // Raw tallies: `.harness/extract.mjs`, reproduced in docs/profile.md §12.
  //
  //   band ground     rgb(22,22,22)   #161616   38 painted backgrounds  (the dark theme)
  //   deeper band     rgb(0,0,0)      #000000   15
  //   surface         #ffffff                    7 (the one white band, on /about)
  //   body text       rgb(247,247,247)#f7f7f7  102 leaf text paints (light-on-dark)
  //   muted text      rgb(164,164,164)#a4a4a4   64
  //   hairline        rgb(226,226,226)#e2e2e2   56
  //   accent / CTA    rgb(100,149,237)#6495ed   13 fills + 16 link paints  (cornflower blue)
  //   accent hover    rgb(71,136,234) #4788ea    2
  //
  // TWO deliberate departures, both ACCESSIBILITY fixes rather than sampling errors, and
  // both recorded in docs/known-divergence.md §10:
  //
  // 1. THE REFERENCE IS A DARK THEME AND OURS IS NOT INVERTED TO MATCH IT. Their ramp runs
  //    light text on near-black. The generator's gate requires neutral0..neutral900 to be
  //    monotonically DECREASING in L, so the ramp is expressed in the conventional
  //    light-to-dark order and our dark bands are painted with neutral900 / primary rather
  //    than by inverting the ramp. Their #161616 survives EXACTLY as neutral900 (L 0.200).
  //    Colour divergence is excluded from every measurement anyway (A-8), so this is free.
  //
  // 2. THE REFERENCE CTA FILL FAILS AA AND CANNOT BE CARRIED THROUGH THE ROTATION.
  //    #6495ed is OKLCH L 0.686; its own white label sits at 2.36:1 on their live site, so
  //    holding that L exactly would carry the failure through every hue on the circle and no
  //    seed could rescue it. Our accent holds the reference CTA's ROLE and its chroma CLASS
  //    (C 0.150 against their 0.130) at L 0.471, which keeps a white label at >= 4.5:1 for
  //    every hue. accentDeep holds the #4788ea hover role at L 0.401.
  //
  // Every hex below supplies only the L and C the generator holds; H is discarded and
  // re-derived from the winning primary hue.
  referenceRamp: {
    primary:     '#401d1d',   // L 0.281  C 0.055  structural dark, their #161616 band, tinted
    primaryDeep: '#290b0c',   // L 0.201  C 0.050  gradient start, their #000000 band
    accent:      '#9e2b36',   // L 0.471  C 0.150  CTA fill  (role of #6495ed, AA-corrected)
    accentDeep:  '#831826',   // L 0.401  C 0.141  CTA hover (role of #4788ea)
    neutral0:    '#ffffff',   // L 1.000  C 0      surface
    neutral200:  '#f3f3f3',   // L 0.964  C 0      page ground
    neutral400:  '#cecece',   // L 0.851  C 0      hairline / on-dark muted, their #e2e2e2 role
    neutral600:  '#585858',   // L 0.460  C 0      muted text, their #a4a4a4 role
    neutral900:  '#161616',   // L 0.200  C 0      body text and dark bands — their band EXACTLY
  },

  // EXEMPT from hue rotation (A-7). Conventional hues held: error red, success green,
  // warning amber. A randomly green error state is a bug.
  semantic: {
    error:   '#c02b0a',
    success: '#1a7f37',
    warning: '#b45309',
  },

  // WHAT THE SHELL ACTUALLY RENDERS. Every entry corresponds to a real painted pair in
  // app/globals.css plus the shell components; nothing here is aspirational ramp theory.
  //
  // The site-header band is a REAL two-stop gradient (primaryDeep -> primary) carrying the
  // wordmark, the nav links and the header CTA, so it is declared as ONE gradient entry and
  // gated on the WORST of 5 OKLCH-interpolated samples. Declaring it as two flat rows would
  // gate the endpoints and never look at the middle of the ramp.
  //
  // CHROMATIC-ACTION RULE, stated once and enforced by construction: there is EXACTLY ONE
  // filled chromatic action on this site, the call CTA (the header button and the mobile
  // call bar are the same action in two positions, painted with the same token). Every other
  // action — nav links, footer links, the footer call button, the map bypass and directions
  // links, the skip link — is achromatic. Nothing else can out-saturate the CTA because
  // nothing else is saturated at all.
  pairsInUse: [
    { name: 'body-text-on-surface',     fg: 'neutral900',   bg: 'neutral0',   min: 4.5 },
    { name: 'body-text-on-ground',      fg: 'neutral900',   bg: 'neutral200', min: 4.5 },
    { name: 'muted-on-surface',         fg: 'neutral600',   bg: 'neutral0',   min: 4.5 },
    { name: 'muted-on-ground',          fg: 'neutral600',   bg: 'neutral200', min: 4.5 },
    { name: 'link-on-surface',          fg: 'primary',      bg: 'neutral0',   min: 4.5 },
    { name: 'link-on-ground',           fg: 'primary',      bg: 'neutral200', min: 4.5 },
    { name: 'header-nav-on-gradient',   fg: 'neutral0',     bg: { gradient: ['primaryDeep', 'primary'] }, min: 4.5 },
    { name: 'header-muted-on-gradient', fg: 'neutral400',   bg: { gradient: ['primaryDeep', 'primary'] }, min: 4.5 },
    { name: 'call-cta-label',           fg: 'neutral0',     bg: 'accent',     min: 4.5, kind: 'cta' },
    { name: 'call-cta-label-hover',     fg: 'neutral0',     bg: 'accentDeep', min: 4.5 },
    { name: 'callbar-label',            fg: 'neutral0',     bg: 'accent',     min: 4.5 },
    { name: 'footer-text',              fg: 'neutral0',     bg: 'neutral900', min: 4.5 },
    { name: 'footer-muted',             fg: 'neutral400',   bg: 'neutral900', min: 4.5 },
    { name: 'footer-outline-edge',      fg: 'neutral0',     bg: 'neutral900', min: 3 },
    { name: 'input-border-on-surface',  fg: 'borderStrong', bg: 'neutral0',   min: 3 },
    { name: 'input-border-on-ground',   fg: 'borderStrong', bg: 'neutral200', min: 3 },
    { name: 'outline-btn-edge',         fg: 'primary',      bg: 'neutral0',   min: 3 },
    { name: 'focus-ring-on-surface',    fg: 'focus',        bg: 'neutral0',   min: 3, kind: 'focus' },
    { name: 'focus-ring-on-ground',     fg: 'focus',        bg: 'neutral200', min: 3, kind: 'focus' },
    { name: 'focus-halo-on-cta',        fg: 'neutral0',     bg: 'accent',     min: 3, kind: 'focus' },
    { name: 'focus-halo-on-header',     fg: 'neutral0',     bg: { gradient: ['primaryDeep', 'primary'] }, min: 3, kind: 'focus' },
    { name: 'focus-halo-on-footer',     fg: 'neutral0',     bg: 'neutral900', min: 3, kind: 'focus' },
    { name: 'form-error-on-surface',    fg: 'error',        bg: 'neutral0',   min: 4.5 },
    { name: 'form-success-on-surface',  fg: 'success',      bg: 'neutral0',   min: 4.5 },
  ],

  // ---- assets (Prompt 2) -------------------------------------------------------------
  // PROVENANCE, D-09: every photographic and brand asset on the reference belongs to the
  // reference business and is REPLACE. NOTHING here is ever downloaded, not even
  // temporarily. The only TAKE items on this site are non-file: lucide-react icons and the
  // two open-licensed Google families (Lato, Ubuntu) pulled through next/font/google.
  //
  // Reference URLs are GoDaddy isteam TRANSFORM CHAINS -- ".../Blog Banner.png/:/rs=w:200"
  // ends in a resize token, not a filename. inventory.mjs walks back to the real file
  // segment; these patterns therefore match human filenames, not the trailing token.
  //
  // Rules are checked IN ORDER and may be route-scoped. Three reference files appear in
  // two different bands with different fates (retained on one route, inside a DELETED band
  // on another), so those rules MUST carry `route` or the two merge into one slot and the
  // retained slot inherits the deleted band's geometry.
  slotRules: [
    // --- brand, shared shell ---------------------------------------------------------
    { match: /^Subheading$/, id: 'logo-wordmark', sec: 'site-header', prov: 'REPLACE',
      note: 'Reference wordmark, 163x88, rendered twice per page (desktop bar + nav drawer). Ours is a wordmark set in Ubuntu — TODO(fact): logo asset.' },

    // --- / home ----------------------------------------------------------------------
    { match: /^blob-9fbca0b$/, id: 'home-hero-bg', sec: 'hero', prov: 'REPLACE',
      note: 'Full-bleed hero background, CSS background-image on a div[role="img"], not an <img>.' },
    { route: '/', match: /^Work%20From%20Home|^Work From Home/, id: 'home-service-card-a', sec: 'services-grid', prov: 'REPLACE',
      note: 'Blog card thumbnail -> service card image. The band carries 3 cards; our grid carries 8 at the same geometry (see tail note).' },
    { route: '/', match: /^Blog%20Banner$|^Blog Banner$/, id: 'home-service-card-b', sec: 'services-grid', prov: 'REPLACE',
      note: 'Blog card thumbnail -> service card image.' },
    { route: '/', match: /^ArQdAzZ$/, id: 'home-service-card-c', sec: 'services-grid', prov: 'REPLACE',
      note: 'GoDaddy stock thumbnail -> service card image. Licensed to the reference account; never reused.' },

    // --- /about ----------------------------------------------------------------------
    { route: '/about', match: /^Intro to Insurance Thumbnail/, id: 'about-intro-photo', sec: 'about-intro', prov: 'REPLACE',
      note: 'Primary about photo (their headquarters). Ours is a generic workshop/van slot.' },
    { route: '/about', match: /^blob-c40787a$/, id: 'about-intro-secondary', sec: 'about-intro', prov: 'REPLACE',
      note: 'Secondary about photo, half width of the primary.' },
    { route: '/about', match: /^PPC Right Roof/, id: 'about-badge', sec: 'about-intro', prov: 'REPLACE',
      note: 'Manufacturer certification artwork. D-14: we invent no credential, so our slot is a TODO(fact) chip at these dimensions, not a badge.' },
    { route: '/about', match: /^fb_933083312175701/, id: 'about-banner-bg', sec: 'about-banner', prov: 'REPLACE',
      note: 'Full-bleed statement-band background, CSS background-image on div[role="img"].' },
    { route: '/about', match: /^Work From Home|^Work%20From%20Home/, id: 'about-blog-card-a', sec: 'about-blog', prov: 'DELETED',
      note: 'Inside s03 my-blog, DELETED per D-01. Same source file as home-service-card-a; route-scoped so the two do not merge.' },
    { route: '/about', match: /^Blog Banner$|^Blog%20Banner$/, id: 'about-blog-card-b', sec: 'about-blog', prov: 'DELETED',
      note: 'Inside s03 my-blog, DELETED per D-01.' },
    { route: '/about', match: /^ArQdAzZ$/, id: 'about-blog-card-c', sec: 'about-blog', prov: 'DELETED',
      note: 'Inside s03 my-blog, DELETED per D-01.' },

    // --- /services -------------------------------------------------------------------
    { match: /^2157587620$/, id: 'services-banner-bg', sec: 'services-banner', prov: 'REPLACE',
      note: 'Getty stock, full-bleed CTA banner background. Licensed to the reference account.' },
    { match: /^IMG_4984$/, id: 'services-card-01', sec: 'services-list', prov: 'REPLACE', note: 'Service card image.' },
    { match: /^down-net_http20250912/, id: 'services-card-02', sec: 'services-list', prov: 'REPLACE', note: 'Service card image.' },
    { match: /^down-net_http20251008/, id: 'services-card-03', sec: 'services-list', prov: 'REPLACE', note: 'Service card image.' },
    { match: /^down-net_http20250714/, id: 'services-card-04', sec: 'services-list', prov: 'REPLACE', note: 'Service card image.' },
    { match: /^blob-67c145a$/, id: 'services-card-05', sec: 'services-list', prov: 'REPLACE', note: 'Service card image.' },
    { match: /^cd575c6057a4564120220624/, id: 'services-card-06', sec: 'services-list', prov: 'REPLACE', note: 'Service card image.' },

    // --- /contact --------------------------------------------------------------------
    { route: '/contact', match: /^Intro to Insurance Thumbnail/, id: 'contact-locations-img-a', sec: 'contact-locations', prov: 'DELETED',
      note: 'Inside s02 Locations, DELETED per D-02. Same source file as about-intro-photo; route-scoped so the two do not merge.' },
    { route: '/contact', match: /^Screenshot 2025-10-08/, id: 'contact-locations-img-b', sec: 'contact-locations', prov: 'DELETED',
      note: 'Inside s02 Locations, DELETED per D-02.' },
  ],

  // No badge GRID on this reference -- the single certification artwork is handled by a
  // slotRule above. Left empty deliberately rather than guessed at.
  badgePatterns: [],

  // The wordmark is the one asset that repeats on all five routes.
  sharedSlots: { 'logo-wordmark': true },

  // Near-white repaint. A placeholder filled at the honestly-sampled hex is right until the
  // sample is near-white: text mounted over it makes rendertruth.mjs report UNMEASURABLE and
  // the band ships unchecked. The TABLE keeps the honest hex, the FILE is repainted.
  placeholderMaxLum: 0.62,
  placeholderTargetLum: 0.28,
};
