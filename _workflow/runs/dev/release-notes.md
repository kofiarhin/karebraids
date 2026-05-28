# Release Notes

## Request

Redesign the KareBraids homepage based on the approved dark luxury mockup.

## User-Facing Changes

- Replaced the homepage with a dark luxury editorial layout for a premium African braiding studio in London.
- Added slim sticky navigation with desktop links, booking CTA, and mobile drawer.
- Added hero, trust strip, signature styles, why choose, gallery preview, testimonial, final booking CTA, and expanded footer sections.
- Signature Styles now uses exactly the five approved mockup services:
  - Knotless Braids - From £120
  - Boho Braids - From £150
  - Stitch Braids - From £130
  - Twists / Locs - From £140
  - Cornrows - From £100
- Preserved booking conversion links to `/booking` and gallery link to `/gallery`.

## Developer Changes

- Added modular homepage/shared components under `client/src/components/`.
- Added homepage data constants in `client/src/constants/homepage.js`.
- Added locked dark luxury palette and responsive homepage CSS in `client/src/index.css`.
- Updated homepage tests and a date-sensitive booking-flow fixture.

## New Routes/APIs

None.

## New Env Vars

None.

## Database/Schema Changes

None.

## Dependencies Added/Removed

None.

## Test Commands Run

- `npm test --prefix client -- site-pages.test.jsx`
- `npm test --prefix client`
- `npm run lint --prefix client`
- `npm run build --prefix client`
- Browser screenshot checks against local Vite server.
- `git diff --stat`
- `git diff`

## Known Limitations

- Full-page CLI screenshots do not scroll, so they do not trigger every below-fold reveal animation. The reveal behavior is DOM-backed and tested by structure/CSS guardrails; no user-facing blocker was found.

## Follow-Up Work

- Optional visual regression setup if design QA needs repeatable screenshot baselines.

## Suggested Commit Message

`redesign KareBraids homepage with dark luxury layout`
