# Release Notes

- Request: Services page redesign.
- User-facing changes: `/services` now opens with a compact editorial header, two CTAs, and a premium service category panel instead of a large image hero. The services grid appears immediately after the header.
- Developer changes: Updated Services page markup/CSS and tests for new heading/redirect expectations.
- New routes/APIs: none.
- New env vars: none.
- Database/schema changes: none.
- Dependencies added/removed: none.
- Test commands run: `npm run test --prefix client -- site-pages.test.jsx`, `npm run test --prefix client`, `npm run build --prefix client`, `npm run lint --prefix client`, `npx fallow health --format json --quiet --explain 2>/dev/null || true`.
- Known limitations: Full client lint still reports unrelated pre-existing hook-rule issues in `Booking.jsx` and `Gallery.jsx`.
- Follow-up work: Fix unrelated lint issues in a separate task.
- Suggested commit message: `Redesign services page header`
