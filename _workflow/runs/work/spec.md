# Detailed Spec — Backend-Driven Service and Gallery Data

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-07
- Request ID / slug: `backend-driven-service-gallery-data`
- Request source: Direct user prompt synchronized to `_workflow/runs/work/request.md`
- Execution mode: `complete-workflow`
- Request classification: Full-stack feature/refactor with data-contract migration
- Scope level: Cross-cutting backend, seed, frontend server-state, UI integration, and tests
- Risk level: Medium-high because existing public pages and booking deep links depend on compatibility

## 2. Original Request
- Raw user request: Inspect the repository, then make MongoDB and Express the canonical source for service/gallery data across the backend and named frontend surfaces, with compatibility aliases, seed upserts, image-first booking selection, and tests.
- Normalized request: Expand and normalize the Service persistence/API contract; add service endpoints; preserve gallery endpoints; update seed data/upsert behavior; move runtime UI data access to TanStack Query through `client/src/lib/api.js`; refactor Gallery, Services, Booking, BrowseByStyle, FeaturedServices, and GalleryFeature; preserve deep-link behavior and visual style; verify server tests, client tests, and client build.
- Source prompt / request reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: None. Repository inspection and the detailed user prompt resolved the required behavior, affected surfaces, compatibility requirements, tests, and explicit non-binary image constraint.
- Answers received: Not applicable.
- Questions skipped: No material question was skipped; implementation-specific choices are documented as assumptions.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: Public service and gallery content is split between MongoDB-backed endpoints and hardcoded client data, allowing content and behavior to drift.
- Why it matters: Service cards, gallery filters, booking choices, and prices/images must reflect one maintained source of truth.
- Current pain point: The backend has a partial Service model/gallery API, while multiple live React surfaces import `client/src/data/services.js` directly.
- Expected value: A canonical server-managed catalog, consistent public API, rerunnable seed process, and frontend caching/loading through TanStack Query.

## 5. Current State Analysis
- Existing behavior: `/api/gallery` and `/api/gallery/services` read Service documents. The frontend gallery service still imports local data, and the named pages/components directly or indirectly use the hardcoded service module.
- Existing architecture/components: Express app with route/controller/model separation; Mongoose Service schema; JSON seed script; React/Vite client; shared Axios-like API helper; TanStack Query hooks; CSS class-based page styling.
- Existing files/modules likely involved: `server/app.js`, `server/models/Service.js`, gallery controller/routes, new service controller/routes/serializer utility, seed script/data, server tests, client API services/query hooks, named pages/components, preview helper/fallback location, and related tests/styles.
- Existing data flow: Seed JSON -> MongoDB Service collection -> gallery controller for existing gallery API; separately, client hardcoded data -> pages/components.
- Existing API/UI/CLI/workflow behavior: Gallery supports service filtering and limits; booking/gallery use `service` query parameters; `npm run seed:services` currently seeds services but does not provide the requested upsert synchronization.
- Existing tests or verification coverage: Jest/Supertest backend tests and Vitest frontend tests exist; relevant coverage must be located and extended TDD-first.

## 6. Desired End State
- Expected final behavior: Every named public surface renders service/gallery records fetched from Express, which reads MongoDB Service documents.
- User-facing outcome: Homepage cards/gallery preview, Services, Gallery, and Booking remain visually familiar while using current backend content; booking cards show an image, name, from price, and duration.
- Developer-facing outcome: One normalized API contract, reusable service/query hooks, validated seed records, and tests for filters/detail/gallery compatibility.
- System/workflow outcome: MongoDB is canonical and seed reruns update existing documents by stable public identifier.
- Backward compatibility expectations: Existing gallery endpoints, response aliases, URLs using service slugs, filter behavior, and booking preselection continue to work.

## 7. Scope
- In scope:
  - Expand `Service` schema with all requested service/image fields and validations.
  - Add `/api/services`, filtered list, id-or-slug detail, and per-service gallery endpoints.
  - Preserve and normalize `/api/gallery` and `/api/gallery/services`.
  - Update seed JSON and make seeding idempotent/upserting.
  - Introduce/revise frontend API services and TanStack Query hooks.
  - Remove live hardcoded data usage from all six named UI modules.
  - Add image-first booking service cards and async loading/error/empty handling consistent with current patterns.
  - Add/update Jest and Vitest tests and verify builds.
- Out of scope: Admin catalog management, upload endpoints, image binary persistence, media CDN changes, authentication/authorization, booking backend redesign, unrelated visual polish, pagination, or broad CSS refactors.
- Non-goals: Deleting local data solely for cleanup, changing prices/content beyond schema completeness, changing routes visible to users, or introducing Redux for server state.
- Explicit boundaries: API logic remains outside React components; server state remains in TanStack Query; image fields contain URL strings/metadata only.

## 8. Users And Use Cases
- Primary users: Prospective clients browsing styles and selecting a service during booking.
- Secondary users: Site maintainers reseeding/updating service catalog records.
- Main use cases: Browse featured services, browse by style, view gallery preview/full gallery, filter by service, compare services, open a prefiltered gallery link, open a preselected booking link, choose a bookable service.
- Edge use cases: Empty catalog, missing primary image, service with no gallery images, invalid service query parameter, disabled/unavailable service, delayed API response, API error, legacy record using compatibility image/price fields.

## 9. Functional Requirements
- Required behaviors:
  - Service model supports all requested fields and unique nested image IDs.
  - Image URL validation accepts only valid HTTP(S) URLs for `image` and optional `src`.
  - Service list filters exact boolean `true` query values and status.
  - Detail lookup accepts public `id` or `slug`; missing records return 404.
  - Per-service gallery returns normalized gallery items for that service.
  - Existing gallery APIs return normalized service/gallery records and retain service/limit filtering.
  - Seed reruns update matched records and insert missing records.
  - Frontend uses shared API client and query hooks, not direct hardcoded data imports, on all named surfaces.
  - Booking query-string preselection waits for bookable data and remains stable after user interaction.
- Inputs: Service/filter query parameters, path id/slug, seed JSON records, existing booking/gallery query strings.
- Outputs: JSON wrappers containing normalized services/service/gallery items and rendered React views.
- State changes: Seed upserts mutate Service collection; frontend query cache stores fetched server state; existing booking form state retains selected service.
- Error states: 404 for unknown service detail/gallery; 500 through existing middleware for unexpected DB errors; visible non-crashing client query error/empty states.
- Permissions/auth expectations: Public read endpoints; no new authentication requirement.

## 10. Non-Functional Requirements
- Performance expectations: Use lean reads and existing/simple sorting; avoid duplicate frontend requests where query keys can share cached results; no image binaries in database/API payloads.
- Reliability expectations: Deterministic serializer fallbacks; idempotent seed upserts; async query arrival must not break URL-driven selection.
- Security/privacy expectations: Validate persisted image URL protocols; do not hard-code secrets; return only public catalog/review fields.
- Accessibility expectations: Booking service choices remain semantic controls with meaningful image alt text, selected state, and keyboard behavior; loading/error statuses use appropriate status messaging.
- Maintainability expectations: Centralize backend service/image normalization and frontend image/price fallback logic; keep routes thin.
- DX expectations: Existing npm scripts continue to work; tests clearly cover contract aliases and filters.

## 11. Affected Surfaces
- Files likely affected: Requested backend/model/controller/route/seed/data files; new service route/controller/serializer files if appropriate; relevant backend tests; `client/src/services/galleryService.js`; optional `serviceService.js`; query hook files; six named page/components; preview fallback utility; related frontend tests/CSS.
- Directories likely affected: `server/{models,controllers,routes,scripts,data,tests,utils}`, `client/src/{services,hooks,pages,components/home,utils,styles}`.
- UI surfaces: Homepage Browse by Style, Featured Services, Gallery Feature; Services page; Gallery page/filter; Booking wizard service step.
- API routes: `GET /api/services`, `GET /api/services/:id`, `GET /api/services/:id/gallery`, existing `GET /api/gallery`, existing `GET /api/gallery/services`.
- Components: Named modules plus any existing shared query-state/service-card helpers used by them.
- Services: Backend Service model/serializers and frontend service/gallery API modules.
- Database/schema: MongoDB `services` collection documents.
- Config/env vars: No new secrets or required variables expected; existing Mongo connection remains.
- Tests: Jest/Supertest API tests, Mongoose model/seed tests if patterns exist, Vitest component/hook/service tests where existing patterns support them.
- Docs: Workflow artifacts; durable architecture/decision docs only if implementation reveals a long-lived decision not already captured here.
- Workflow artifacts: Active run request/spec/tasks/progress/handoff/review/release notes/summary/Project Brain and Fallow audit.

## 12. Dependency And Integration Map
- Internal dependencies: Express app -> service/gallery routers -> controllers -> Service model; seed script -> JSON -> Service model; React views -> query hooks -> frontend services -> shared API client -> Express endpoints.
- External packages/services: Mongoose, Express, Jest/Supertest, React, TanStack Query, Vitest, remote image hosts already referenced by URL.
- Integration points: Query wrapper response shapes, route ordering (`/:id/gallery` before ambiguous handlers where needed), shared API base URL, query keys, URL search params, booking form state.
- Ordering constraints: Backend schema/serializer/API tests before frontend integration; seed schema compatibility before seed verification; frontend service/hooks before page refactors.
- Migration/setup requirements: Run seed against configured MongoDB to synchronize real environments; automated tests may mock Mongoose and need fixtures updated for required fields.

## 13. Data And State Impact
- Data models: Add `slug`, `name`, `shortDescription`, `category`, `priceFrom` compatibility if persisted/virtualized as needed, `durationLabel`, flags, `status`, `primaryImage`, enhanced images with `src`/`alt`, and existing reviews.
- Database changes: Existing Service records need upserted new fields; unique indexes on public identifiers must be compatible with current data.
- State management changes: Replace static module reads with TanStack Query server state; retain local booking wizard state and URL params.
- Cache/session/local storage impact: Query cache only; no new persistent browser storage.
- Backward compatibility impact: Serializers expose `startingPrice`, `priceFrom`, and `fromPrice`; `primaryImage`, `previewImage`, `image`, `images`, and `galleryImages`; image items expose both `image` and `src`.

## 14. UX / API / Workflow Expectations
- UX expectations: Preserve current design/layout and class system. Booking service cards become image-first and keep descriptions absent or visually secondary. Show stable loading/error/empty states instead of blank/crashing content.
- API contract expectations: Service records include every alias listed in the request. Gallery items include all requested service metadata and both image aliases. List filters are composable.
- CLI/workflow behavior: `npm run seed:services` upserts and reports a useful result without skipping existing services.
- Error handling expectations: Invalid or unknown service filters should safely fall back or produce empty/404 results according to endpoint semantics; frontend should not discard valid user selection as data loads.
- Empty/loading/success/failure states: Each async live surface handles these states in line with existing query-state styling; homepage sections may render concise status text while preserving surrounding layout.

## 15. Execution Strategy
- Recommended implementation approach:
  1. Add failing backend model/API tests for normalized contract, filters, lookup, per-service gallery, and existing gallery compatibility.
  2. Implement a shared service serializer/normalizer, expanded schema, service controller/routes, and app mount; adapt gallery controller to shared normalization.
  3. Update seed JSON comprehensively and convert seed script to stable-key bulk upserts; add focused validation/upsert tests where feasible.
  4. Add failing frontend API/hook/component tests; implement service API module and query hooks through `client/src/lib/api.js`.
  5. Refactor Services/Gallery/home surfaces, then Booking with query-driven preselection and image cards, preserving current CSS structure.
  6. Run refine/polish passes, full verification, final diff review, UI code-surface review/screenshot if runnable, and Fallow.
- Suggested sequencing: Backend contract -> seed migration -> client API/hooks -> gallery/services/home -> booking -> regression hardening.
- Safe rollout/migration approach: Keep response aliases and existing gallery endpoints while changing frontend consumers; seed before deployment so required fields exist.
- Files to inspect before editing: All requested files, existing tests/fixtures, API helper/query provider, page styles, booking selection effects, and route configuration.
- Decisions to avoid until more evidence exists: Do not remove `client/src/data/services.js` wholesale, alter review structure, add new dependencies, or redesign cards beyond the requested image-first content.

## 16. Verification Strategy
- Required automated checks: Focused Jest tests during each backend iteration; focused Vitest tests during each frontend iteration; `npm test`; `npm run test --prefix client`; `npm run build --prefix client`; relevant lint/changed-file checks if available; `git diff --check`.
- Required manual checks: Inspect normalized JSON shapes, confirm query-string selection/filter effects in tests or runnable app, inspect booking card semantics/image fallbacks, and verify no live imports remain with `rg`.
- Test types needed: Mongoose schema validation, controller/route integration, frontend API service/hook behavior, page/component loading/success/deep-link behavior, booking service card/preselection regression.
- Build/lint/typecheck expectations: Client Vite build must pass; project has no explicit typecheck script; lint should be attempted with baseline failures isolated if present.
- Acceptance evidence required: Exact command results, Red/Green/Refactor evidence for each code task and iteration, endpoint assertions, no-live-import search, seed validation/upsert evidence, UI review.
- Proof of completion: All acceptance criteria checked, all tasks complete through Build/Refine/Polish, required tests/build pass or documented baseline limitation, final diff scoped, Fallow audit completed.

## 17. Acceptance Criteria
- [x] `Service` supports all requested service, primary image, gallery image, review, compatibility, validation, and unique nested image-ID requirements.
- [x] `/api/services` supports featured, booking-enabled, gallery-enabled, and status filters and returns the requested frontend-friendly aliases.
- [x] `/api/services/:id` resolves by id or slug, and `/api/services/:id/gallery` returns normalized service gallery items.
- [x] Existing `/api/gallery` and `/api/gallery/services` remain functional and return normalized backward-compatible data.
- [x] Seed JSON matches the schema, every service has safe primary image data (including Kids Braids), multiple gallery images remain, and only URLs/metadata are stored.
- [x] `npm run seed:services` performs rerunnable upserts instead of skipping existing services.
- [x] No named user-facing page/component uses `client/src/data/services.js` for live service/gallery data.
- [x] Gallery, Services, homepage sections, and Booking use TanStack Query through the shared frontend API layer.
- [x] Booking service choices show image, service name, from price, and duration while preserving wizard behavior.
- [x] `/booking?service=knotless-braids` and `/gallery?service=knotless-braids` continue to preselect/filter correctly.
- [x] Required backend endpoint tests and relevant frontend tests are added/updated TDD-first.
- [x] `npm test`, `npm run test --prefix client`, and `npm run build --prefix client` pass, or a demonstrably pre-existing environment failure is isolated and the task is marked appropriately.
- [x] Existing visual style remains intact and no image binaries are stored in MongoDB.

## 18. Edge Cases And Failure Modes
- Edge cases: Missing/legacy `slug` or `name`; primary image missing but gallery image present; gallery empty; optional `src` omitted; invalid URL; duplicate nested image ID; min/max duration inversion; false boolean query strings; unknown detail ID; service disabled for booking/gallery; async preselection.
- Failure modes: Seed validation rejects legacy/incomplete records; serializer returns inconsistent aliases; route conflicts; query hooks create request loops; booking selection is overwritten after user interaction; remote image fails.
- Regression risks: Homepage sections disappearing during loading, gallery query link no longer matching `id`/`slug`, booking submission storing wrong label/value, tests relying on static fixtures, CSS image dimensions shifting layout.
- Recovery expectations: Use deterministic fallbacks, focused regression tests, stable route/query keys, seed upsert filters, and scoped rollback by task if verification fails.

## 19. Risks And Mitigations
- Technical risks: Broad contract duplication. Mitigation: shared backend serializer and frontend normalization helpers.
- Product/UX risks: Async loading and image dimensions change perceived page stability. Mitigation: preserve containers/classes, use fallback image/alt values, and test status states.
- Security risks: Unsafe URL schemes in persisted image fields. Mitigation: enforce HTTP(S) validation on `image` and optional `src`.
- Scope risks: Turning catalog migration into admin/media management. Mitigation: explicitly exclude uploads/admin CRUD and avoid new packages.
- Mitigation plan: Implement vertical slices with TDD-first tests, run compatibility searches/tests after each slice, and audit final diff against this spec.

## 20. Assumptions
- Explicit assumptions:
  - Current public service identifiers are slug-safe and can populate both `id` and `slug` where not otherwise distinct.
  - Current services should default to available/bookable/gallery-enabled unless seed content indicates otherwise.
  - First gallery image is an acceptable seed source for `primaryImage` when a separate hero image is not provided.
  - API wrappers remain objects rather than bare arrays.
  - Remote image URLs in existing seed data may remain.
- Confidence level: High, based on repository inspection and explicit user requirements.
- What to revisit if assumptions are wrong: Seed flags/status, public identifier mapping, response wrappers, and any frontend test expecting a different booking stored value.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Whether to persist `priceFrom` or expose it only as a serializer alias; whether to retain local data solely as an unused fixture. Resolve from existing compatibility/tests with the least duplication.
- Execution impact: None; these choices do not change acceptance criteria.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - TASK-001: Deliver normalized MongoDB Service schema and public service/gallery API contract with endpoint tests.
  - TASK-002: Deliver complete rerunnable service seed data/upsert behavior with validation evidence.
  - TASK-003: Deliver shared frontend API/query hooks and backend-driven Services/Gallery/home sections with tests.
  - TASK-004: Deliver backend-driven image-first Booking selection and deep-link regression tests.
  - TASK-005: Cross-surface compatibility hardening, full verification, UI review, Fallow, and workflow completion.
- Suggested first task: Backend schema/API contract because all client work depends on it.
- Suggested task ordering: Backend API -> seed -> frontend shared data layer/public browse surfaces -> booking -> final hardening.
- Areas that should not become separate tasks: Minor serializer aliases, fallback constants, or CSS tweaks; keep them inside the vertical slice they support.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each code task starts with focused failing tests and minimal implementation, then compatibility/error-state refinement, then accessibility/edge-case/style polish with repeated verification.

## 23. Frontend Taste Application
- Applicable: Yes.
- Detection result and reason: The request changes JSX markup and styling behavior for booking service cards and refactors multiple frontend UI surfaces. Apply `.agents/skills/design-taste-frontend/SKILL.md` before frontend implementation and again for final UI review.
- Required propagation points: Record the exact line `Applied skill: design-taste-frontend` in frontend task evidence, implementation review, verification, release notes, summary, and health-check artifacts.
