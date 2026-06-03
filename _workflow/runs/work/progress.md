# Progress

Initialized workflow artifacts for TASK-001.

## TASK-001: Migrate gallery and booking service selection to service query source
- Status: Done
- Lifecycle transition reached: Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done
- Files changed:
  - `client/src/constants/content.js`
  - `client/src/pages/Booking.jsx`
  - `client/src/pages/Gallery.jsx`
  - `client/src/pages/ServiceDetail.jsx`
  - `client/test/booking-flow.test.jsx`
  - `client/test/gallery-modal.test.jsx`
  - `client/test/gallery-query.test.jsx`
  - `client/test/service-detail.test.jsx`
  - `client/test/site-pages.test.jsx`
- Applied skill: design-taste-frontend

### Iteration 1 Build
- Goal: Add failing/updated migration coverage and move Booking/Gallery to hook-sourced services.
- Changes made: Added tests for gallery dropdown/query behavior and booking `?service` preselection; updated `Booking.jsx` and `Gallery.jsx` to consume `useGalleryServices()`.
- Test plan: targeted Vitest tests for gallery, booking, service detail, and gallery modal.
- Red phase evidence: Existing tests expected legacy `?style` links and direct constants exports; initial targeted command using wrong prefixed paths failed with no test files found, then corrected.
- Green phase evidence: Targeted tests passed after implementation.
- Refactor phase evidence: Removed direct service/gallery exports from `constants/content.js` and updated stale tests to canonical data helpers.
- Test commands run: `npm run test --prefix client -- --run test/gallery-query.test.jsx test/booking-flow.test.jsx test/service-detail.test.jsx test/gallery-modal.test.jsx`
- Verification command/result: Passed, 4 files / 23 tests.
- Review findings: Query data is async, so tests and booking preselection wait for services to resolve.
- Acceptance status: Met.
- Remaining issues: None.
- Next action: Full verification.

### Iteration 2 Refine
- Goal: Verify the full frontend test suite and catch cross-test regressions.
- Changes made: Adjusted site page/gallery modal tests away from `constants/content.js` service/gallery exports.
- Test plan: full client Vitest suite.
- Red phase evidence: Targeted run exposed async dropdown/preselect assertions before query data settled; assertions were updated to wait for options/preselection.
- Green phase evidence: `npm run test --prefix client` passed.
- Refactor phase evidence: Import guard added to prevent pages from importing `constants/content.js` service lists.
- Test commands run: `npm run test --prefix client`
- Verification command/result: Passed, 9 files / 72 tests.
- Review findings: Backend booking payload remains service-name based.
- Acceptance status: Met.
- Remaining issues: None.
- Next action: Final server/build verification and diff audit.

### Iteration 3 Polish
- Goal: Run requested server/build checks and audit scope.
- Changes made: Updated ServiceDetail booking links from `?style` to `?service` and verified no remaining legacy style booking links.
- Test plan: requested server tests, client tests, client build, diff audit.
- Red phase evidence: `rg` confirmed no remaining `booking?style`/`?style` app references after fix.
- Green phase evidence: Server tests and client build passed.
- Refactor phase evidence: `git diff --check` passed with no whitespace errors.
- Test commands run: `npm run test:server`; `npm run test --prefix client`; `npm run build --prefix client`; `git diff --stat`; `git diff --check`.
- Verification command/result: Passed.
- Review findings: Scope matches saved spec; no backend, dependency, env, or schema changes.
- Acceptance status: Met.
- Remaining issues: Screenshot not captured because no browser automation binary/tool is available in the container.
- Next action: Final review/release notes/summary.

## Acceptance result
- [x] `constants/content.js` no longer imports or exports service/gallery data.
- [x] Booking uses `useGalleryServices()` and preselects from `?service=<id>`.
- [x] Gallery dropdown is accessible and sourced from `useGalleryServices()`.
- [x] Gallery dropdown updates URL and query function params.
- [x] Selected service empty state says exactly: “No gallery images available for this service yet.”
- [x] Booking links use `/booking?service=<id>`.
- [x] Booking create payload still sends the backend `service` name field.
- [x] Requested checks passed.

## Failure recovery notes
- Corrected an initial targeted Vitest path mistake caused by `--prefix client` changing the working directory.
- Adjusted async test assertions to wait for TanStack Query service data.

## Blockers
- None.

## TASK-001: Add MongoDB Service source for public gallery responses and admin management
- Status: Done
- Lifecycle transition reached: Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done
- Files changed:
  - `server/models/Service.js`
  - `server/utils/serviceValidation.js`
  - `server/controllers/galleryController.js`
  - `server/controllers/adminServiceController.js`
  - `server/routes/adminRoutes.js`
  - `server/scripts/seedServices.js`
  - `server/tests/gallery.test.js`
  - `server/tests/admin-services.test.js`
  - `server/tests/seed-services.test.js`
  - `server/tests/service-model.test.js`
  - `package.json`
  - `docs/PROJECT_CONTEXT.md`
  - `.workflow/fallow-audit.md`

### Iteration 1 Build
- Goal: Add failing public gallery/admin/seed tests and minimal implementation.
- Changes made: Added mocked MongoDB-backed gallery tests, admin CRUD/image CRUD tests, seed idempotency tests, Service model, validation helpers, gallery controller migration, admin service controller/routes, seed script, and npm seed script.
- Test plan: Targeted Jest tests for gallery, admin services, and seed services.
- Red phase evidence: `npm run test:server -- --runTestsByPath server/tests/gallery.test.js server/tests/admin-services.test.js server/tests/seed-services.test.js` failed because `server/models/Service.js` and `server/scripts/seedServices.js` did not exist yet.
- Green phase evidence: The same targeted test command passed after implementation with 3 suites / 20 tests.
- Refactor phase evidence: Controller helpers were split into validation/serialization helpers and route bindings stayed thin.
- Test commands run: `npm run test:server -- --runTestsByPath server/tests/gallery.test.js server/tests/admin-services.test.js server/tests/seed-services.test.js`
- Verification command/result: Passed.
- Review findings: Public gallery service preview omits images/reviews and keeps `previewImage`; admin routes use `requireAdmin`.
- Acceptance status: Met for core model/controller/admin/seed behavior.
- Remaining issues: Model-level validation coverage was added in Iteration 2.
- Next action: Iteration 2 Refine.

### Iteration 2 Refine
- Goal: Harden model validation and embedded image mutation behavior.
- Changes made: Added `server/tests/service-model.test.js`; hardened image update mutation to use Mongoose array `.set()` when available.
- Test plan: Targeted model/admin/gallery/seed tests.
- Red phase evidence: Model validation coverage was initially absent for Mongoose validators, creating a missing-test gap.
- Green phase evidence: `npm run test:server -- --runTestsByPath server/tests/service-model.test.js server/tests/admin-services.test.js server/tests/gallery.test.js server/tests/seed-services.test.js` passed with 4 suites / 25 tests.
- Refactor phase evidence: `npm run test:server -- --runTestsByPath server/tests/admin-services.test.js server/tests/service-model.test.js` passed after Mongoose array mutation hardening.
- Test commands run: targeted model/admin/gallery/seed commands.
- Verification command/result: Passed.
- Review findings: Validation covers service slug, image URL, review rating range, and duplicate embedded image IDs.
- Acceptance status: Met.
- Remaining issues: None.
- Next action: Iteration 3 Polish.

### Iteration 3 Polish
- Goal: Run full backend verification, JSON runtime dependency audit, diff audit, and Fallow audit.
- Changes made: Updated durable project context and workflow artifacts; created Fallow audit.
- Test plan: Full backend suite, diff check, runtime JSON dependency scan, model collection scan, Fallow audit.
- Red phase evidence: Runtime JSON scan initially used an imprecise glob and showed the expected seed script reference; corrected scan excluded `server/scripts/**` and `server/tests/**` and found no runtime references.
- Green phase evidence: `npm run test:server` passed with 9 suites / 54 tests.
- Refactor phase evidence: `git diff --check` passed with no whitespace errors; no separate Gallery model/collection was found.
- Test commands run: `npm run test:server`; `rg 'services\.json|data/services' server --glob '!server/scripts/**' --glob '!server/tests/**' || true`; `rg 'Gallery|gallerySchema|GallerySchema' server/models server/controllers server/routes || true`; `git diff --stat`; `git diff`; `git diff --check`; `npx fallow --format json --quiet --explain 2>/dev/null > /tmp/fallow.json || true`.
- Verification command/result: Passed for tests/diff/runtime dependency checks; Fallow verdict PARTIAL due advisory existing issues.
- Review findings: Scope matches approved spec; no frontend changes, file uploads, Cloudinary/S3, or separate Gallery collection were added.
- Acceptance status: Met.
- Remaining issues: Fallow reported existing cleanup/health candidates for follow-up.
- Next action: Commit and PR.

## Acceptance result
- [x] Service model exists with requested structure, timestamps, required validations, unique id, image URL validation, and rating range validation.
- [x] Runtime gallery code no longer imports or reads `server/data/services.json`.
- [x] `GET /api/gallery/services` returns MongoDB-sourced `{ services: [...] }` preview data.
- [x] `GET /api/gallery` returns generated gallery items, selected service metadata, and selected reviews while preserving fallback behavior.
- [x] No separate Gallery collection was created.
- [x] Protected admin service CRUD endpoints exist with confirmed response contracts.
- [x] Protected admin image CRUD endpoints exist with confirmed response contracts.
- [x] Admin validation errors use `{ message: errors[0], errors: [...] }`; duplicate slugs return conflict.
- [x] Seed script reads `server/data/services.json`, skips existing services, and is safe to re-run.
- [x] Backend tests cover gallery listing/filtering, service CRUD, image CRUD, model validation, and seed logic.
- [x] No new required environment variables were introduced.

## Failure recovery notes
- Added missing model/script files after red test failures.
- Corrected runtime JSON reference scan globs to exclude only scripts/tests.

## Blockers
- None.
