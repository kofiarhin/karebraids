# Release Notes: Dedicated Services Page

## Request
Create a dedicated KareBraids Services browsing journey and preserve Gallery as portfolio-only inspiration.

## User-Facing Changes
- Added premium `/services` page with split hero, salon/mobile explanation, categorized service grids, image cards, duration, from-price guidance, and Booking CTAs.
- Added Home Featured Services before Gallery preview.
- Corrected Services navigation to `/services` while retaining Gallery `/gallery` navigation.
- Updated Footer service-browsing shortcuts to `/services`.
- Added mobile stacking, narrow-phone CTA sizing, focus treatment, tactile feedback, and reduced-motion support.

## Developer Changes
- Enriched frontend shared service records with `id`, `category`, `image`, and existing metadata while keeping title compatibility.
- Added focused Services and FeaturedServices React surfaces plus public-page Vitest contracts.

## New Routes/APIs
- Frontend route: `/services`
- APIs: none

## New Env Vars
none

## Database/Schema Changes
none

## Dependencies Added/Removed
none

## Test Commands Run
- `npm run test --prefix client -- site-pages.test.jsx`
- `npm run test --prefix client`
- `npm run lint --prefix client`
- `npm test`
- `npm run build --prefix client`
- `git diff --check`
- Local Vite `/services` curl smoke

## Known Limitations
- Screenshot capture unavailable because the container has no Chromium, Chrome, Firefox, or Playwright executable. Code-surface visual review fallback passed.

## Follow-Up Work
- Optional browser screenshot automation for future visual regression evidence.

## Suggested Commit Message
`feat: add dedicated services discovery page`
