# Release Notes: Premium Homepage Testimonial Carousel

## Request
Add a premium manual-only testimonial carousel to the KareBraids homepage.

## User-Facing Changes
- Replaced the static testimonial card with five supplied testimonials.
- Added manual previous/next arrows with infinite wrap, direct avatar selection, active-state highlights, `01 / 05` counter, initials fallback, gold stars, and calm motion with reduced-motion support.
- Preserved dark luxury desktop split layout and mobile stacking.

## Developer Changes
- Centralized homepage testimonial content in one array.
- Added local React active-index state and accessibility-focused controls.
- Added Vitest interaction and CSS-surface coverage.
- Stabilized booking-flow test date selection when the current month has no remaining selectable appointment day.

## New Routes/APIs
none

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
- `npm run build --prefix client`
- `npm run dev`
- `npm test`
- `git diff --check`

## Known Limitations
- Root `npm run dev` launches Vite successfully, but the Express watcher cannot launch in this environment because `nodemon` is not installed.
- Browser screenshot automation is unavailable in the provided tools.

## Follow-Up Work
- Optional: add root `nodemon` dependency if development server hot reload should be supported by a clean install.

## Suggested Commit Message
`feat: add premium homepage testimonial carousel`
