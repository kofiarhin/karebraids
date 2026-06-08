# Task Plan — Backend-Driven Service and Gallery Data

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-07
- Explicit approval: User replied `approve spec`
- Progress read: `_workflow/runs/work/progress.md`
- Summary read: `_workflow/runs/work/summary.md`
- Spec sections used: Current State, Desired End State, Scope, Functional/Non-Functional Requirements, Affected Surfaces, Dependency Map, Data/State Impact, UX/API Expectations, Execution Strategy, Verification Strategy, Acceptance Criteria, Edge Cases, Risks, Assumptions, Open Questions, and Task Extraction Notes.

## TASK-001: Serve normalized services and galleries from MongoDB

- Status: Done
- Objective: Expand the Service model and expose tested service list/detail/gallery endpoints while preserving existing gallery endpoints.
- Files likely affected: `server/models/Service.js`, `server/controllers/*service*`, `server/controllers/galleryController.js`, `server/routes/*service*`, `server/app.js`, `server/tests/*service*`, `server/tests/*gallery*`.
- Checklist:
  - [x] Add requested service/image fields and validation.
  - [x] Centralize service/gallery response normalization.
  - [x] Add filtered list, id-or-slug detail, and per-service gallery routes.
  - [x] Preserve existing gallery routes and compatibility.
- Iteration 1 Build: Write failing endpoint/model tests; implement minimum model/routes/controllers/serializer.
- Iteration 2 Refine: Add filter composition, missing-record, alias, and legacy fallback coverage.
- Iteration 3 Polish: Review route ordering, lean queries, validation messages, and response consistency.
- Test plan: Focused Jest/Supertest and model tests, then full server suite.
- Red phase evidence: Recorded in `_workflow/runs/work/progress.md`.
- Green phase evidence: Recorded in `_workflow/runs/work/progress.md`.
- Refactor phase evidence: Recorded in `_workflow/runs/work/progress.md`.
- Test commands run: Recorded in `_workflow/runs/work/progress.md`.
- Acceptance criteria: Spec criteria 1-4 and backend portions of 11-13.
- Acceptance result: All task criteria met; see `_workflow/runs/work/progress.md`.
- Verification commands: Focused Jest tests; `npm test`; `git diff --check`.
- Stop condition: Endpoints and model contract pass focused tests without regressing existing gallery behavior.
- Out-of-scope items: Admin writes, uploads, pagination, auth.

## TASK-002: Make service seed data complete and rerunnable

- Status: Done
- Objective: Align every seeded service with the new schema and upsert records safely on reruns.
- Files likely affected: `server/data/services.json`, `server/scripts/seedServices.js`, seed/model tests.
- Checklist:
  - [x] Add all required service metadata and primary images.
  - [x] Preserve multiple gallery images and URL-only storage.
  - [x] Ensure Kids Braids has safe primary image data.
  - [x] Replace skip-if-existing behavior with stable-key upserts.
- Iteration 1 Build: Add failing seed shape/upsert tests; implement schema-complete JSON and upserts.
- Iteration 2 Refine: Validate every seed document through Mongoose and verify alias/default consistency.
- Iteration 3 Polish: Improve deterministic logging/error handling and rerun safety.
- Test plan: Seed-data validation tests and mocked bulk-write/upsert behavior; seed script dry validation where possible.
- Red/Green/Refactor evidence: Recorded in `_workflow/runs/work/progress.md`.
- Acceptance criteria: Spec criteria 5-6 and 13.
- Acceptance result: All task criteria met; see `_workflow/runs/work/progress.md`.
- Verification commands: Focused Jest; `npm run seed:services` only if configured DB access is safe/available; JSON/model validation.
- Stop condition: All seed records validate and reruns update rather than skip.
- Out-of-scope items: Live production migration, image uploads.

## TASK-003: Load services and gallery UI through TanStack Query

- Status: Done
- Objective: Replace hardcoded runtime data in Services, Gallery, and homepage sections with shared backend API/query hooks.
- Files likely affected: `client/src/services/galleryService.js`, `client/src/services/serviceService.js`, `client/src/hooks/queries/*`, `client/src/pages/Gallery.jsx`, `client/src/pages/Services.jsx`, `client/src/components/home/{BrowseByStyle,FeaturedServices,GalleryFeature}.jsx`, helpers/tests.
- Checklist:
  - [x] Route all API calls through `client/src/lib/api.js`.
  - [x] Keep existing gallery hooks working and add service hooks.
  - [x] Refactor named browsing/home surfaces with loading/error/empty states.
  - [x] Preserve gallery query-string filtering and visual classes.
- Iteration 1 Build: Add failing service/hook/page tests and minimum query-backed implementation.
- Iteration 2 Refine: Cover async URL filtering, errors/empty states, aliases, and cache keys.
- Iteration 3 Polish: Apply UI taste review, accessibility, image fallbacks, and no-live-import checks.
- Applied skill: design-taste-frontend
- Test plan: Focused Vitest service/component/page tests, lint touched files, client build.
- Red/Green/Refactor evidence: Recorded in `_workflow/runs/work/progress.md`.
- Acceptance criteria: Spec criteria 7-8, gallery/home/services portions of 10 and 13.
- Acceptance result: All task criteria met; see `_workflow/runs/work/progress.md`.
- Verification commands: Focused Vitest; `rg` no-live-import check; client tests/build.
- Stop condition: Named browse surfaces render backend data and retain deep-link filtering.
- Out-of-scope items: Redesign or new state library.

## TASK-004: Load image-first booking services from the backend

- Status: Done
- Objective: Preserve the booking wizard while sourcing bookable services from the API and presenting image-first choices.
- Files likely affected: `client/src/pages/Booking.jsx`, booking styles/tests, service hooks/helpers.
- Checklist:
  - [x] Fetch bookable services with TanStack Query.
  - [x] Preserve service query-string preselection after async resolution.
  - [x] Show image, name, from price, and duration with fallback.
  - [x] Keep selection/submission wizard behavior stable.
- Iteration 1 Build: Add failing booking tests and implement minimum async service selection.
- Iteration 2 Refine: Protect user selection from later effects; cover loading/error/invalid query states.
- Iteration 3 Polish: Apply UI taste/accessibility/image layout review and full booking regressions.
- Applied skill: design-taste-frontend
- Test plan: Focused Booking Vitest tests, full client tests/build.
- Red/Green/Refactor evidence: Recorded in `_workflow/runs/work/progress.md`.
- Acceptance criteria: Spec criteria 8-10 and 13.
- Acceptance result: All task criteria met; see `_workflow/runs/work/progress.md`.
- Verification commands: Focused Booking tests; client suite/build; code-surface/screenshot review.
- Stop condition: Backend-driven image cards work and deep-link preselection remains verified.
- Out-of-scope items: Booking API/form redesign.

## TASK-005: Verify and harden the complete migration

- Status: Done
- Objective: Prove the full request, audit scope/quality, and complete workflow artifacts.
- Files likely affected: Tests and workflow artifacts only unless an in-scope defect is found.
- Checklist:
  - [x] Run required server/client test/build commands.
  - [x] Run lint/diff/no-live-import/seed validation checks.
  - [x] Perform frontend taste final review and screenshot if app is runnable.
  - [x] Run Fallow JSON audit and complete review/release/summary/handoff/health.
- Iteration 1 Build: Run full verification and fix only in-scope failures TDD-first.
- Iteration 2 Refine: Audit compatibility, contracts, imports, secrets, and generated junk.
- Iteration 3 Polish: Final UI/code-surface review, Fallow, artifacts, and health.
- Applied skill: design-taste-frontend
- Test plan: All required commands plus targeted recovery commands.
- Red/Green/Refactor evidence: Documentation-only unless a defect fix is required; record exceptions.
- Acceptance criteria: All spec acceptance criteria.
- Acceptance result: All task criteria met; see `_workflow/runs/work/progress.md`.
- Verification commands: `npm test`; `npm run test --prefix client`; `npm run build --prefix client`; lint; `git diff --stat`; `git diff`; Fallow.
- Stop condition: Complete verified request or documented Needs Human Review state.
- Out-of-scope items: Unrelated baseline debt.
