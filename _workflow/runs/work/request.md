# Active Workflow Request

## Source
Direct user prompt received 2026-06-07.

## Execution Mode
`complete-workflow`

## Normalized Request
Make MongoDB's `Service` collection the canonical source for all public service and gallery data. Expand the backend model and seed data, add filtered service/detail/gallery API endpoints while preserving existing gallery endpoints, expose backward-compatible frontend response aliases, refactor TanStack Query services/hooks and all named user-facing pages/components away from `client/src/data/services.js`, add image-first bookable service cards without changing the booking wizard behavior, preserve query-string deep links and existing visual style, and add backend/frontend regression coverage. Store only image URLs and metadata in MongoDB. Verify with `npm test`, `npm run test --prefix client`, and `npm run build --prefix client`.

## Shared Understanding Handoff

### Confirmed Understanding
- The existing `Service` model and `services.json` are the persistence/seed foundation but need the requested canonical schema and compatibility fields.
- New `/api/services` routes will coexist with `/api/gallery` routes.
- API serializers should normalize service and image records so old frontend field names remain usable during migration.
- All named live UI surfaces must fetch server state through TanStack Query and the shared API client.
- Booking remains the existing wizard; only its service source and service-card presentation change.
- Existing `/booking?service=<slug>` and `/gallery?service=<slug>` links must remain functional.
- Tests are TDD-first during implementation, with server Jest/Supertest and frontend Vitest patterns.

### Decisions Made
- Use one backend service serializer shared by service and gallery controllers to avoid contract drift.
- Treat both `id` and `slug` as accepted lookup keys; retain stable slug-like public IDs.
- Keep image binaries out of MongoDB and store only validated HTTP(S) URL strings plus metadata.
- Preserve current visual structure/classes wherever practical; add only the minimum booking-card markup/style needed for images and async states.
- Keep `client/src/data/services.js` only if some non-live compatibility import remains; no named user-facing page/component may depend on it for runtime data.

### Assumptions
- Existing API response conventions use JSON wrapper objects (for example `{ services }` and `{ galleryItems }`) and should remain consistent.
- `status: "available"`, `bookingEnabled: true`, and `galleryEnabled: true` are appropriate defaults for current seeded services unless a service explicitly needs another value.
- `primaryImage` may duplicate the first gallery image's metadata in seed JSON so every service has a deterministic card image.
- Existing frontend loading/error state patterns will be reused rather than introducing a new design system.

### In Scope
- Backend schema, serializers/controllers/routes, seed data/upsert behavior, frontend API services/hooks, named pages/home components, booking image cards, tests, and durable documentation needed by the workflow.

### Out Of Scope
- Admin CRUD UI/API, binary uploads/media hosting, authentication changes, booking persistence redesign, unrelated visual redesign, pagination, and database migrations beyond rerunnable seed upserts.

### Acceptance Criteria
- MongoDB-backed API supplies all live service/gallery data to the named UI surfaces.
- New and existing endpoints return the specified compatible contracts and filters.
- Seed data validates, includes primary images, and upserts existing services.
- Query-string filters/preselection and current visual behavior remain intact.
- Required server tests, client tests, and client build pass or any pre-existing environment limitation is isolated and documented.

### Risks And Edge Cases
- Existing seeded records may lack newly required fields; upsert defaults and seed completeness must prevent validation failures.
- `id` versus `slug` ambiguity requires deterministic lookup and response normalization.
- Async data can arrive after URL parsing; gallery filtering and booking preselection must react when queries resolve without overriding user choices.
- Empty/error/loading data must not crash homepage or wizard surfaces.

### Remaining Open Questions
- None blocking; implementation details can be resolved from repository patterns and recorded in the spec/task evidence.
