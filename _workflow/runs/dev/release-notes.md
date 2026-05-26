# Release Notes: Polish Public KareBraids UI

## Request

Polish the public KareBraids home, about, gallery, and booking pages while preserving the warm brand and avoiding route, booking behavior, API, data model, admin, backend, env, dependency, deployment, and major copy changes.

## User-Facing Changes

- Refined the shared warm public-page visual system with brighter lifted surfaces, softer image overlays, and more consistent page intro treatments.
- Improved homepage and about page image/content readability while preserving the warm dark brand.
- Improved gallery card overlays and modal presentation.
- Improved booking page visual hierarchy, service cards, panel treatment, field focus states, and active step accessibility.
- Added responsive guards to prevent mobile horizontal overflow.

## Developer Changes

- Added CSS regression coverage for public polish, gallery polish, booking polish, and mobile overflow guards.
- Added gallery modal `aria-describedby`.
- Added booking step `aria-current="step"`.
- Updated booking test fixture from May 25, 2026 to May 26, 2026 because the former is now a past date for this run.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `npm test --prefix client -- site-pages.test.jsx`
- `npm test --prefix client -- gallery-modal.test.jsx`
- `npm test --prefix client -- booking-flow.test.jsx`
- `npm test --prefix client`
- `npm run lint --prefix client`
- `npm run build --prefix client`
- Playwright CLI browser/responsive verification

## Known Limitations

- Public images still depend on existing external image URLs; no asset replacement was in scope.

## Follow-Up Work

- Optional image reliability pass if the project wants local or first-party hosted public imagery.

## Suggested Commit Message

Polish public KareBraids pages
