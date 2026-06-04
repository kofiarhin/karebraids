# Release Notes

- Request: Redesign `/about` into a premium trust-building founder page centered around Karen.

## User-Facing Changes
- Replaced the simple About page with an editorial founder page for Karen.
- Added trust cards, Birmingham positioning, KareBraids Standard steps, appointment timeline, proof metrics, and a strong final booking CTA.
- Added responsive premium dark Afro-luxury styling.

## Developer Changes
- Refactored repeated About content into clean arrays.
- Added targeted About component tests.

## New Routes/APIs
- none

## New Env Vars
- none

## Database/Schema Changes
- none

## Dependencies Added/Removed
- none

## Test Commands Run
- `npm run test --prefix client -- About.test.jsx`
- `npm run test --prefix client`
- `npm run build --prefix client`
- `npm run lint --prefix client` (fails due unrelated existing hook lint errors)
- `npx fallow health --format json --quiet --explain 2>/dev/null || true`

## Known Limitations
- Uses existing gallery imagery rather than a real Karen portrait asset.
- Existing unrelated lint issues remain in `Booking.jsx` and `Gallery.jsx`.

## Follow-Up Work
- Add real founder portrait when available.
- Resolve unrelated hook lint findings.

## Suggested Commit Message
- `Redesign About page as premium founder story`
