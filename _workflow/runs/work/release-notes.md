# Release Notes

- Request: fix Vite React production routing for hero gallery CTA and Vercel SPA fallback.

## User-Facing Changes
- The homepage “View Styles” CTA now routes to Gallery client-side.
- Vercel deep links such as `/gallery` should serve the React app after deployment.

## Developer Changes
- Added a deployment config test for `client/vercel.json`.
- Extended homepage route-safety test to click View Styles and assert Gallery renders.

## New Routes/APIs
- none

## New Env Vars
- none

## Database/Schema Changes
- none

## Dependencies Added/Removed
- none

## Test Commands Run
- `npm run test --prefix client -- test/site-pages.test.jsx test/deployment.test.js`
- `npm run build --prefix client`
- `npm run test --prefix client`
- `npm run lint --prefix client` (pre-existing failures)
- `npx fallow health --format json --quiet --explain 2>/dev/null || true`

## Known Limitations
- Live `https://karebraids.vercel.app/gallery` refresh validation requires deploying this change.
- Client lint currently fails on unrelated pre-existing hook lint issues.

## Follow-Up Work
- Deploy to Vercel and confirm `/gallery` refresh.
- Separately fix existing hook lint findings.

## Suggested Commit Message
fix client gallery routing on vercel
