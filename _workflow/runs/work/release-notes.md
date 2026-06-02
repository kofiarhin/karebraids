# Release Notes: KareBraids Service-Driven Gallery

- Request: Implement KareBraids gallery/service feature.
- User-facing changes: Gallery now shows all service images by default and selected service intro/reviews when opened with `/gallery?service=<service-id>`. Homepage and service preview cards use backend service preview images and route to filtered gallery pages.
- Developer changes: Added backend service JSON data, service preview endpoint, filtered gallery responses, frontend gallery service functions, TanStack Query hooks, and tests.
- New routes/APIs: `GET /api/gallery/services`; enhanced `GET /api/gallery?service=<service-id>`.
- New env vars: none.
- Database/schema changes: none.
- Dependencies added/removed: none.
- Test commands run: `npm run test:server -- --runTestsByPath server/tests/gallery.test.js`; `npm run test:server`; `npm run test --prefix client -- gallery-query.test.jsx`; `npm run test --prefix client`; `npm run lint --prefix client`; `npm run build --prefix client`.
- Known limitations: sample Pexels URLs are placeholder content; legacy service detail constants remain for compatibility.
- Follow-up work: decide on legacy `style` query redirect and booking validation for all eight service ids.
- Suggested commit message: `Implement service-driven gallery feature`
