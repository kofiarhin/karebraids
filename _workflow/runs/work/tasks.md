# Task Plan

## Spec file used
`_workflow/runs/work/spec.md`

## Planning date
2026-06-03

## Progress and summary files read
- `_workflow/runs/work/handoff.md`
- `_workflow/runs/work/progress.md`
- `_workflow/runs/work/summary.md`

## Detailed spec sections used
- Section 5 Current State Analysis
- Section 11 Affected Surfaces
- Section 12 Dependency And Integration Map
- Section 13 Data And State Impact
- Section 14 UX / API / Workflow Expectations
- Section 15 Execution Strategy
- Section 16 Verification Strategy
- Section 17 Acceptance Criteria
- Section 18 Edge Cases And Failure Modes
- Section 19 Risks And Mitigations
- Section 20 Assumptions
- Section 22 Task Extraction Notes

## Task list

### TASK-001: Add MongoDB Service source for public gallery responses and admin management

Status: Done

Objective:
Make MongoDB Service documents the runtime source of truth for public gallery responses and protected admin service/image management while preserving public API contracts.

Files likely affected:
- `server/models/Service.js`
- `server/utils/serviceValidation.js`
- `server/controllers/galleryController.js`
- `server/controllers/adminServiceController.js`
- `server/routes/adminRoutes.js`
- `server/scripts/seedServices.js`
- `server/tests/gallery.test.js`
- `server/tests/admin-services.test.js`
- `server/tests/seed-services.test.js`
- `package.json`

Checklist:
- [x] Add Service model with embedded images/reviews and validators.
- [x] Replace public gallery JSON runtime dependency with Service queries.
- [x] Add protected admin service CRUD endpoints.
- [x] Add protected admin image CRUD endpoints.
- [x] Add safe rerunnable seed script.
- [x] Add/update backend tests.
- [x] Run final verification, review, Fallow audit, release notes, summary, and health check.

Iteration plan for Iteration 1 Build:
- Goal: Add failing public gallery/admin/seed tests and minimal model/controller/script implementation.
- Changes made: To be recorded in progress.
- Test plan: Targeted Jest tests for gallery, admin services, seed services.
- Red phase evidence: To be recorded in progress.
- Green phase evidence: To be recorded in progress.
- Refactor phase evidence: To be recorded in progress.
- Test commands run: To be recorded in progress.
- Verification command/result: To be recorded in progress.
- Review findings: To be recorded in progress.
- Acceptance status: To be recorded in progress.
- Remaining issues: To be recorded in progress.
- Next action: Iteration 2 Refine.

Iteration plan for Iteration 2 Refine:
- Goal: Harden validation, duplicate handling, auth protection, and image edge cases.
- Changes made: To be recorded in progress.
- Test plan: Targeted and broader backend Jest tests.
- Red phase evidence: To be recorded in progress.
- Green phase evidence: To be recorded in progress.
- Refactor phase evidence: To be recorded in progress.
- Test commands run: To be recorded in progress.
- Verification command/result: To be recorded in progress.
- Review findings: To be recorded in progress.
- Acceptance status: To be recorded in progress.
- Remaining issues: To be recorded in progress.
- Next action: Iteration 3 Polish.

Iteration plan for Iteration 3 Polish:
- Goal: Run full verification, diff audit, dependency scan, and finalize workflow artifacts.
- Changes made: To be recorded in progress.
- Test plan: Full backend tests plus diff checks.
- Red phase evidence: To be recorded in progress.
- Green phase evidence: To be recorded in progress.
- Refactor phase evidence: To be recorded in progress.
- Test commands run: To be recorded in progress.
- Verification command/result: To be recorded in progress.
- Review findings: To be recorded in progress.
- Acceptance status: To be recorded in progress.
- Remaining issues: To be recorded in progress.
- Next action: Final review/release notes/summary.

Test plan:
- `npm run test:server -- --runTestsByPath server/tests/gallery.test.js server/tests/admin-services.test.js server/tests/seed-services.test.js`
- `npm run test:server`
- `git diff --check`

Red phase evidence:
To be recorded in progress.

Green phase evidence:
To be recorded in progress.

Refactor phase evidence:
To be recorded in progress.

Test commands run:
To be recorded in progress.

Acceptance criteria:
- [x] A `Service` Mongoose model exists with the requested structure, timestamps, required validations, unique `id`, image URL validation, and rating range validation.
- [x] Runtime gallery code no longer imports or reads `server/data/services.json`.
- [x] `GET /api/gallery/services` returns `{ services: [...] }` with preview service objects compatible with the current frontend.
- [x] `GET /api/gallery` returns `{ galleryItems: [...], selectedService: ..., reviews: [...] }`, generates gallery items from service images, supports service filtering, and preserves invalid-service fallback behavior.
- [x] No separate Gallery collection is created.
- [x] Protected admin service CRUD endpoints exist with the confirmed success response contracts.
- [x] Protected admin image CRUD endpoints exist with the confirmed success response contracts.
- [x] Admin validation errors use `{ message: errors[0], errors: [...] }` and duplicate slug errors are meaningful.
- [x] A safe re-runnable seed/migration script reads `server/data/services.json`, inserts missing services, and avoids duplicate inserts.
- [x] Backend tests cover gallery service listing, gallery filtering, service CRUD, image CRUD, and seed logic.
- [x] Required environment variables are documented; no new env vars are introduced unless necessary.

Acceptance result:
All acceptance criteria met.

Verification commands:
- `npm run test:server -- --runTestsByPath server/tests/gallery.test.js server/tests/admin-services.test.js server/tests/seed-services.test.js`
- `npm run test:server`
- `git diff --stat`
- `git diff`
- `git diff --check`

Stop condition:
Stop if public gallery compatibility cannot be preserved, admin route protection cannot be verified, or backend tests cannot run.

Out-of-scope items:
- Frontend UI changes.
- File uploads.
- Cloudinary/S3/external storage.
- Separate Gallery collection.
