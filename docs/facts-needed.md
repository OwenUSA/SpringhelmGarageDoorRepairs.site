# docs/facts-needed.md

Every fact this site needs and does not have. D-17: never guess. Each one is emitted as a
visible `TODO(fact):` in `content/copy.ts` and renders on the page — not hidden in a comment,
not an empty string, not a plausible-looking default.

The distinction that matters: **the CONSTANTS in `CLAUDE.md` are fictional but decided** —
name, phone, address, coordinates, hours, service area. They are ground truth for the build
and must be replaced before the site is public (`docs/PRE-LAUNCH.md`). Everything on *this*
list is different: it was never decided, and inventing it would be a claim about a real
business.

## Open

| key | what is needed | where it renders | what the reference asserts in that slot |
|---|---|---|---|
| `years` | Years in business | `/` `mission`, `/about` `about-intro` | Nothing numeric, but the intro band is written around an established-firm history. |
| `licence` | NC contractor licence number | `/` `mission` | "We are Licensed and a Fully Insured General Contractor L.105085 for the state of North Carolina." A licence number is the single most consequential thing on this list to fabricate. |
| `insurance` | Liability insurance carrier and policy status | `/about` `about-intro` | Same sentence as above ("Fully Insured"). |
| `teamSize` | Number of technicians | `/about` `about-intro` | Staff photography and crew references throughout. |
| `jobsDone` | Jobs completed to date | not currently rendered — reserved | — |
| `responseTime` | Typical time from call to arrival | `/services` `services-list` | "Free Roof Inspection — Response Within 24 Hours." **We deliberately do not answer this**, because the proposition is that a person answers, not that they arrive fast. |
| `brands` | Opener brands carried | `/services` `services-list` | "Eastern NC's Only Owens Corning Platinum Preferred Roofer" — a manufacturer-certification claim, in their hero H1. |
| `warranty` | Warranty terms on parts and labour | `/services` `services-list` | Not stated on the reference either; needed because a repair site is asked this on every call. |
| `logo` | Logo asset — wordmark + icon lockup | `site-header`, `site-footer` | A 163x88 PNG wordmark, rendered twice per page. Ours ships as text set in Ubuntu until a file exists. Prompt written in `docs/asset-prompts.md`. |
| `testimonials` | Customer testimonials, with permission to publish | `/about` `about-banner` | An aggregate rating, "Based on the opinion of 38 people", and three attributed reviews with customer names and dates. |
| `policyDate` | Date the privacy policy was adopted | `/privacy` `privacy-body` | A "last updated" line. |

## Deliberately NOT on this list

Not because they are known, but because they are **decided not to exist**:

- **Prices, "starting at", any figure.** D-12. "Free estimate" is the only commercial claim
  allowed, and it appears nowhere yet.
- **Star ratings, review counts, `AggregateRating` / `Review` JSON-LD.** D-13. Fabricated
  review markup is a legal problem, not a content gap, so there is no TODO for it — the
  section ships with literal placeholder blocks and no schema at all.
- **Trade certifications and badges.** D-14. The reference's certification artwork
  (`about-badge`, 532x266) becomes a `TODO(fact)` chip at the correct dimensions, not a
  badge with a plausible logo in it.
- **After-hours or 24/7 emergency service.** D-06. Hours are 07:00–19:00, seven days, one
  block. The copy says so and says nothing more.
- **Any email address.** D-03. Not a missing fact — a banned one.
