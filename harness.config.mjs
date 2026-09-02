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
  masterSeed: 3110,
  gradientSamples: 5,

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
