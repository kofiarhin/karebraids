# Release Notes

- Request: targeted Gallery page spacing refinement.
- User-facing changes: Gallery heading, filter controls, and grid now sit closer to the sticky header with tighter title-to-content rhythm.
- Developer changes: added CSS regression tests for the Gallery spacing contract.
- New routes/APIs: none.
- New env vars: none.
- Database/schema changes: none.
- Dependencies added/removed: none.
- Test commands run: `npm run test --prefix client -- --run test/theme-tokens.test.jsx`; `npm run test --prefix client`; `npm run lint --prefix client`; `npm run build --prefix client`; `npx fallow health --format json --quiet --explain 2>/dev/null || true`.
- Known limitations: lint currently fails on pre-existing React hook issues in `Booking.jsx` and `Gallery.jsx`; no screenshot captured because Playwright/Puppeteer are unavailable.
- Follow-up work: fix existing lint hook issues in a separate task.
- Suggested commit message: `Tighten gallery page spacing`
