# Release Notes

## Request
Complete the single-source-of-truth service migration.

## User-facing changes
- Gallery service filtering now uses a service dropdown backed by the gallery services hook.
- Booking links and booking preselection now use `?service=<id>`.
- Gallery selected-service empty state now says: “No gallery images available for this service yet.”

## Developer changes
- Removed service/gallery data dependency from `client/src/constants/content.js`.
- Booking now sources service cards from `useGalleryServices()`.
- Gallery now sources service options and gallery items through gallery query hooks.
- Tests enforce dropdown rendering, URL/query behavior, booking hook service source, service query preselection, and no page imports from `constants/content.js`.

## New routes/APIs
none

## New env vars
none

## Database/schema changes
none

## Dependencies added/removed
none

## Test commands run
- `npm run test:server`
- `npm run test --prefix client`
- `npm run build --prefix client`

## Known limitations
- Screenshot capture was not produced because this container has no browser automation binary/tool available.

## Follow-up work
none

## Suggested commit message
Complete single-source service migration
