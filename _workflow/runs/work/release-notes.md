# Release Notes: Homepage Gallery Feature

- Request: Replace Signature Styles and old GalleryPreview homepage sections with one premium GalleryFeature.
- Applied skill: design-taste-frontend

## User-Facing Changes
- Homepage now shows a six-card editorial gallery teaser with individual links and a View Full Gallery CTA.
- Header Services and hero View Styles now navigate to `/gallery`.
- Old duplicate homepage service/gallery teasers were removed.

## Developer Changes
- Added self-contained `GalleryFeature.jsx` consuming existing `galleryItems`.
- Removed obsolete homepage-only GalleryPreview, ServiceCard, constants, and CSS.
- Updated homepage Vitest integration coverage.

## Interfaces
- New routes/APIs: none.
- New env vars: none.
- Database/schema changes: none.
- Dependencies added/removed: none.

## Test Commands Run
- `npm run test --prefix client -- site-pages.test.jsx`
- `npm run test --prefix client`
- `npm run lint --prefix client`
- `npm run build --prefix client`
- `git diff --check`
- production reference scan and local Vite curl smoke probes.

## Known Limitations
- Full frontend suite retains three unrelated stale May 27, 2026 booking-flow test failures.
- Screenshot tooling unavailable in this environment.

## Follow-Up Work
- Stabilize booking-flow test dates.

## Suggested Commit Message
`feat(home): replace signature styles with gallery feature`
