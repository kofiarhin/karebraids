# Detailed Spec: MongoDB-backed Services And Gallery

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-03
- Request ID / slug: `mongodb-services-gallery-source-of-truth`
- Request source: Latest direct user prompt plus confirmed admin response contract follow-up.
- Execution mode: `complete-workflow`
- Request classification: Backend API, database model, migration/seed, tests.
- Scope level: Medium.
- Risk level: Medium because public gallery behavior must remain compatible while changing the data source.

## 2. Original Request
- Raw user request: Migrate services and gallery data from `server/data/services.json` into MongoDB; create a Service model; update gallery runtime data source; add admin service/image CRUD; add seed/migration script; validate payloads; add tests; preserve frontend behavior.
- Normalized request: Implement a MongoDB-backed services/gallery backend migration: add a Service model, make public gallery endpoints query MongoDB while preserving response contracts, add protected admin service and image CRUD endpoints with confirmed response contracts, add safe JSON-to-MongoDB seed logic, validate required fields/unique slugs/image URLs/review ratings with meaningful errors, and add Jest/Supertest coverage.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`.

## 3. Questions And Answers
- Questions asked:
  - What response contract should the new admin service and image endpoints use?
- Answers received:
  - Use `{ services: [...] }`, `{ service: {...} }`, and explicit success message contracts for create/update/delete service and image endpoints.
  - Validation errors should use `{ message: errors[0], errors: [...] }`.
  - Do not change the public gallery API response shape.
- Questions skipped: None.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: Services and gallery data are currently static runtime JSON, preventing admin-driven data updates and making MongoDB not the source of truth.
- Why it matters: Admin-managed services and image URLs should immediately drive public gallery responses without code/data-file edits.
- Current pain point: `server/controllers/galleryController.js` imports `server/data/services.json` directly and builds public responses from that static file.
- Expected value: Runtime data becomes persistent, queryable, admin-editable, and safely seedable from the existing JSON baseline.

## 5. Current State Analysis
- Existing behavior: `GET /api/gallery/services` returns previews from static services; `GET /api/gallery` flattens service images into gallery items and supports optional service filtering and positive integer `limit`.
- Existing architecture/components:
  - Express app in `server/app.js` mounts `/api/gallery` and `/api/admin` routes.
  - Gallery routes are in `server/routes/galleryRoutes.js`.
  - Admin routes are in `server/routes/adminRoutes.js` and use `requireAdmin` for protected admin resources.
  - MongoDB/Mongoose infrastructure already exists in `server/config/db.js` and existing models.
- Existing files/modules likely involved:
  - `server/controllers/galleryController.js`
  - `server/routes/adminRoutes.js`
  - `server/models/Service.js` (new)
  - `server/controllers/adminServiceController.js` (new)
  - `server/utils/serviceValidation.js` (new)
  - `server/scripts/seedServices.js` (new)
  - `server/tests/gallery.test.js`
  - `server/tests/admin-services.test.js` (new)
  - `server/tests/seed-services.test.js` (new)
  - `package.json`
- Existing data flow: Static JSON -> gallery controller -> public API response.
- Existing API/UI/CLI/workflow behavior: Public gallery API shape is consumed by frontend and must not change. Admin auth already uses JWT bearer tokens.
- Existing tests or verification coverage: Existing gallery tests assert static counts and response shapes; admin booking/auth tests show mocking and response style patterns.

## 6. Desired End State
- Expected final behavior: MongoDB Service documents are the single runtime source for services, images, reviews, and generated gallery items.
- User-facing outcome: Frontend gallery and service preview behavior remains unchanged when equivalent services are seeded.
- Developer-facing outcome: Admin endpoints can create, read, update, and delete services/images; seed script can load initial JSON data safely.
- System/workflow outcome: Runtime code does not import `server/data/services.json`; only seed/migration code reads it.
- Backward compatibility expectations: Public API response keys and selected-service fallback behavior remain compatible with current tests/frontend.

## 7. Scope
- In scope:
  - Mongoose Service model with embedded duration/images/reviews.
  - Public gallery controller queries through the Service model.
  - Admin service CRUD and embedded image CRUD routes/controllers.
  - Validation helpers and meaningful validation/duplicate errors.
  - Safe seed/migration script from existing JSON.
  - Backend tests.
- Out of scope:
  - Frontend changes unless strictly required by preserved API compatibility.
  - File uploads.
  - External image storage providers.
  - Separate gallery persistence.
  - Admin UI screens.
- Non-goals:
  - Rewriting booking/contact systems.
  - Changing admin authentication.
  - Replacing Express/Mongoose patterns.
- Explicit boundaries:
  - Keep images embedded under services.
  - Keep controllers thin where possible.
  - Do not hard-code credentials.

## 8. Users And Use Cases
- Primary users: Public site visitors viewing gallery/services; admins managing services/images via API.
- Secondary users: Developers/operators running the seed script.
- Main use cases:
  - Visitor views all gallery images.
  - Visitor filters gallery by service slug.
  - Admin lists/creates/updates/deletes services.
  - Admin adds/updates/removes image metadata URLs for a service.
  - Operator seeds MongoDB from existing JSON.
- Edge use cases:
  - Unknown service filter falls back to all images.
  - Service has no images.
  - Duplicate service slug is submitted.
  - Invalid image URL is submitted.
  - Review rating is outside allowed range.

## 9. Functional Requirements
- Required behaviors:
  - Define `Service` model with fields: `id`, `title`, `description`, `startingPrice`, `currency`, `duration.minHours`, `duration.maxHours`, `featured`, `images[]`, `reviews[]`, timestamps.
  - Public service previews omit raw `images` and `reviews` and include `previewImage` from the first image or `null`.
  - Gallery items flatten service images and include image fields plus `serviceId` and `serviceTitle`.
  - `limit` applies only when it is a positive integer string.
  - Admin CRUD endpoints require admin auth.
  - Image CRUD endpoints operate on `images[].id`.
  - Seed script inserts missing service slugs and skips existing slugs.
- Inputs:
  - Query params: `service`, `limit`.
  - Admin JSON bodies for service and image metadata.
  - Existing `server/data/services.json` for seed script only.
- Outputs:
  - Public gallery JSON contracts unchanged.
  - Admin JSON success/error contracts as confirmed.
- State changes:
  - Service documents created/updated/deleted in MongoDB.
  - Embedded images created/updated/deleted inside service documents.
- Error states:
  - `400` for validation failures.
  - `401` for missing/invalid admin token via existing middleware.
  - `404` for missing service/image resources.
  - `409` for duplicate service slug/id.
  - `500` for unexpected persistence/configuration failures through existing error middleware.
- Permissions/auth expectations:
  - All `/api/admin/services*` endpoints require `requireAdmin`.

## 10. Non-Functional Requirements
- Performance expectations: Basic indexed lookup by unique `id`; no separate gallery collection; flattening service images in memory is acceptable for current dataset size.
- Reliability expectations: Seed script safely re-runs without duplicate inserts.
- Security/privacy expectations: No secrets in code; admin routes protected; validation errors do not leak credentials or stack traces.
- Accessibility expectations: Not applicable because no frontend UI changes are expected.
- Maintainability expectations: Keep validation reusable and controllers focused on request/response orchestration.
- DX expectations: Add npm script for seed/migration if useful; tests run through existing `npm run test:server`.

## 11. Affected Surfaces
- Files likely affected:
  - `server/models/Service.js`
  - `server/controllers/galleryController.js`
  - `server/controllers/adminServiceController.js`
  - `server/routes/adminRoutes.js`
  - `server/utils/serviceValidation.js`
  - `server/scripts/seedServices.js`
  - `server/tests/gallery.test.js`
  - `server/tests/admin-services.test.js`
  - `server/tests/seed-services.test.js`
  - `package.json`
- Directories likely affected:
  - `server/models/`
  - `server/controllers/`
  - `server/routes/`
  - `server/utils/`
  - `server/scripts/`
  - `server/tests/`
  - `_workflow/runs/work/`
- UI surfaces: None expected.
- API routes:
  - Existing: `GET /api/gallery/services`, `GET /api/gallery`.
  - New: `GET|POST /api/admin/services`, `GET|PUT|DELETE /api/admin/services/:id`, `POST /api/admin/services/:id/images`, `PUT|DELETE /api/admin/services/:id/images/:imageId`.
- Components: Not applicable.
- Services: Backend controllers and validation helpers.
- Database/schema: New `Service` collection through Mongoose.
- Config/env vars: Existing `MONGODB_URI` is used; no new required env vars expected.
- Tests: Backend Jest/Supertest tests.
- Docs: Workflow artifacts and final summary/release notes.

## 12. Dependency And Integration Map
- Internal dependencies:
  - `galleryController` depends on `Service` model and serialization helpers.
  - `adminServiceController` depends on `Service` model and validation helpers.
  - `adminRoutes` depends on `requireAdmin` and new controller functions.
  - Seed script depends on `connectDatabase`, `disconnectDatabase`, `getEnv`, `Service`, and `server/data/services.json`.
- External packages/services:
  - Existing `mongoose`, `express`, `jsonwebtoken`, `jest`, `supertest`.
  - No new runtime dependency expected.
- Integration points:
  - Express route mounting in `server/app.js` already routes `/api/admin` and `/api/gallery`.
  - MongoDB connection in `server/server.js`/script startup.
- Ordering constraints:
  - Model and validation should be implemented before controllers.
  - Public gallery tests should be updated before gallery controller implementation.
  - Admin CRUD tests should be written before admin controller/routes.
  - Seed tests should be written before seed script implementation.
- Migration/setup requirements:
  - Run seed script against configured MongoDB after deployment or before first production use.

## 13. Data And State Impact
- Data models:
  - `Service.id`: required slug string, unique, indexed.
  - `Service.title`, `description`, `startingPrice`, `currency`: required fields.
  - `Service.duration.minHours`, `duration.maxHours`: required numeric fields.
  - `Service.featured`: boolean default false.
  - `Service.images[]`: embedded metadata with required `id`, `title`, `description`, `image`, `aspect`.
  - `Service.reviews[]`: embedded metadata with required `id`, `name`, `rating`, `comment`.
- Database changes: New service collection and unique index on `id`.
- State management changes: Runtime source of truth moves from JSON file to MongoDB.
- Cache/session/local storage impact: Not applicable.
- Backward compatibility impact: Seeded data should produce the same public API shape and equivalent content.

## 14. UX / API / Workflow Expectations
- UX expectations: Existing frontend continues working without modification.
- API contract expectations:
  - Public responses unchanged.
  - Admin responses exactly match confirmed contracts.
  - Validation errors match existing project pattern.
- CLI/workflow behavior:
  - Seed script can be safely re-run.
  - Seed script should log inserted/skipped counts and return useful results for tests.
- Error handling expectations:
  - Validation errors return `400` with `message` and `errors`.
  - Duplicate service slug returns `409` with meaningful message.
  - Missing service/image returns `404` with meaningful message.
- Empty/loading/success/failure states: Empty image arrays produce empty gallery results for selected services and `previewImage: null`.

## 15. Execution Strategy
- Recommended implementation approach:
  1. Add model and validation utilities with tests for validation-sensitive paths.
  2. Update gallery tests to mock/query Service and assert preserved public contracts.
  3. Update gallery controller to query `Service.find()`/`Service.findOne()` and serialize lean documents.
  4. Add admin service controller and route bindings with tests.
  5. Add image CRUD controller methods and tests.
  6. Add seed script and tests.
  7. Run full backend test suite and diff audit.
- Suggested sequencing: One vertical task can cover the backend migration if kept narrow and test-first; split if implementation becomes too large.
- Safe rollout/migration approach: Deploy code, run seed script using existing JSON baseline, verify public gallery endpoints, then manage future changes through admin API.
- Files to inspect before editing:
  - Existing controllers/routes/models/tests listed above.
  - `server/data/services.json` for exact schema/content.
- Decisions to avoid until more evidence exists:
  - Adding an explicit `sortOrder` field unless preserving JSON order proves impossible with insertion order.
  - Adding dependencies for validation unless existing manual validation is insufficient.

## 16. Verification Strategy
- Required automated checks:
  - `npm run test:server`
  - Targeted Jest tests for gallery/admin services/seed while developing.
  - `git diff --check`
- Required manual checks:
  - Review `git diff --stat` and `git diff` for scope, runtime JSON dependency removal, no secrets, and no separate Gallery collection.
- Test types needed:
  - Supertest API tests for public gallery endpoints.
  - Supertest API tests for protected admin service/image CRUD.
  - Unit tests for seed logic and/or validation helpers.
- Build/lint/typecheck expectations:
  - No dedicated backend build/lint/typecheck script currently exists; document as not available if unchanged.
- Acceptance evidence required:
  - Tests proving public response compatibility.
  - Tests proving admin auth protection and CRUD contracts.
  - Tests proving validation error shape and duplicate handling.
  - Tests proving seed idempotency.
- Proof of completion:
  - Passing backend test suite, diff audit, Fallow audit, review/release notes/summary.

## 17. Acceptance Criteria
- [ ] A `Service` Mongoose model exists with the requested structure, timestamps, required validations, unique `id`, image URL validation, and rating range validation.
- [ ] Runtime gallery code no longer imports or reads `server/data/services.json`.
- [ ] `GET /api/gallery/services` returns `{ services: [...] }` with preview service objects compatible with the current frontend.
- [ ] `GET /api/gallery` returns `{ galleryItems: [...], selectedService: ..., reviews: [...] }`, generates gallery items from service images, supports service filtering, and preserves invalid-service fallback behavior.
- [ ] No separate Gallery collection is created.
- [ ] Protected admin service CRUD endpoints exist with the confirmed success response contracts.
- [ ] Protected admin image CRUD endpoints exist with the confirmed success response contracts.
- [ ] Admin validation errors use `{ message: errors[0], errors: [...] }` and duplicate slug errors are meaningful.
- [ ] A safe re-runnable seed/migration script reads `server/data/services.json`, inserts missing services, and avoids duplicate inserts.
- [ ] Backend tests cover gallery service listing, gallery filtering, service CRUD, image CRUD, and seed logic.
- [ ] Required environment variables are documented; no new env vars are introduced unless necessary.

## 18. Edge Cases And Failure Modes
- Edge cases:
  - Empty services collection returns empty public lists without throwing.
  - Service with no images returns `previewImage: null` and no gallery items for selected service.
  - Invalid `limit` is ignored.
  - Invalid `service` query slug is ignored and falls back to all items.
  - Duplicate image IDs within a service should be rejected or handled consistently.
- Failure modes:
  - MongoDB unavailable causes existing error middleware to return safe `500`.
  - Duplicate service slug causes MongoDB duplicate key error.
  - Invalid embedded image URL fails validation.
  - Invalid review rating fails validation.
- Regression risks:
  - Public gallery shape changes accidentally include `images`/`reviews` in service previews.
  - Runtime code still imports JSON.
  - Admin routes are accidentally left unprotected.
- Recovery expectations:
  - Fix in-scope failures, rerun exact failing commands, document recovery in progress.

## 19. Risks And Mitigations
- Technical risks:
  - Mocking Mongoose chain methods incorrectly in tests. Mitigation: mirror existing tests' mock patterns and keep model calls simple.
  - Unique index not active in unit tests. Mitigation: explicitly handle `error.code === 11000` in controller and seed logic.
- Product/UX risks:
  - Admin edits could remove all images for a service. Mitigation: public API handles empty images gracefully.
- Security risks:
  - Unprotected admin service routes. Mitigation: route every new admin method through `requireAdmin` and add auth tests.
- Scope risks:
  - Frontend admin UI creep. Mitigation: API only; no admin UI in scope.
- Mitigation plan:
  - TDD-first for each route/script behavior, full backend test run, diff audit, Fallow quality pass.

## 20. Assumptions
- Explicit assumptions:
  - Existing frontend expects the current public gallery contract and does not need updates.
  - Existing `MONGODB_URI` covers the seed script; no extra env var is required.
  - Admin service route params use `Service.id` slug rather than MongoDB `_id`.
  - Seed script should skip existing service IDs rather than update/overwrite them, to avoid clobbering admin edits on rerun.
- Confidence level: High.
- What to revisit if assumptions are wrong:
  - If service order must exactly match JSON forever, add `sortOrder`.
  - If seed should update existing records, add explicit upsert/update semantics after approval.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Whether to add a future `sortOrder` field for admin-defined display order.
- Execution impact: No current blocker; order can be approximated by insertion order/creation time unless exact admin ordering is requested later.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - `TASK-001: Add MongoDB Service source for public gallery responses and admin management`.
  - If split is needed after planning: model/seed, public gallery, admin service CRUD, admin image CRUD.
- Suggested first task: Add the Service model, validation, MongoDB-backed gallery controller, admin CRUD, seed script, and tests as one backend data-source migration slice.
- Suggested task ordering:
  1. Model/validation tests and implementation.
  2. Public gallery tests and controller migration.
  3. Admin service/image CRUD tests and implementation.
  4. Seed script tests and implementation.
  5. Full verification/review/Fallow/release notes.
- Areas that should not become separate tasks:
  - Frontend changes, because public API compatibility is required.
  - File upload providers, because explicitly out of scope.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Build: write failing tests for the core model/gallery/admin/seed behaviors, implement minimal passing backend changes.
  - Refine: add edge-case validation/duplicate/auth/idempotency tests and harden controller/script behavior.
  - Polish: run full backend verification, inspect runtime JSON dependencies, run diff/Fallow audits, and finalize artifacts.

## Spec Approval Gate
This spec is saved at `_workflow/runs/work/spec.md`.

Approval required before creating `_workflow/runs/work/tasks.md` or changing implementation files.
