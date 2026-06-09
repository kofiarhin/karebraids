# KareBraids Booking and Services Production Repair Spec

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-09
- Request ID / slug: `booking-services-production-repair`
- Request source: Direct user prompts on 2026-06-09
- Execution mode: `complete-workflow`
- Request classification: Full-stack production defect audit and repair
- Scope level: Cross-cutting client, API, database workflow, deployment, tests, and docs
- Risk level: Medium-high because routing and serverless database initialization affect all production API traffic

## 2. Original Request
- Raw user request: Audit and fix the broken KareBraids booking/services flow, confirm production API reachability, audit Vercel assumptions, fix same-origin routing and API configuration, verify service/availability/booking endpoints, inspect MongoDB seeding, and document root causes/deployment requirements.
- Normalized request: Repair the complete service discovery and booking request path for a root-level single-project Vercel deployment while retaining local development and existing UI behavior.
- Source prompt / request reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: Whether production should use one root-level Vercel project serving both the React app and Express API.
- Answers received: User instructed the agent to proceed with the full audit and implementation after the recommended single-project architecture was proposed.
- Questions skipped: No further questions; route behavior, acceptance checks, and boundaries are explicit or discoverable in the repository.
- Remaining open questions: Actual Vercel project settings and production MongoDB contents cannot be directly inspected without deployment/account credentials. Public endpoint probes from this environment are also currently blocked by an outbound proxy returning HTTP 403.

## 4. Problem Definition
- Problem being solved: The production booking page cannot load services and displays “Services could not be loaded. Please try again.”
- Why it matters: Service data is the first dependency for the booking wizard, service catalogue, and service detail routes.
- Current pain point: The frontend may emit incorrect relative requests when `VITE_API_URL` is absent, while the only Vercel config is client-scoped and rewrites all paths to the SPA rather than routing `/api/*` to Express.
- Expected value: Production users can browse services, retrieve availability, and submit conflict-safe bookings on the same Vercel origin.

## 5. Current State Analysis
- Existing behavior:
  - `client/src/lib/api.js` uses `import.meta.env.VITE_API_URL` directly with no default `/api` base.
  - Client service modules call `/services`, `/bookings/availability`, and `/bookings`, assuming the Axios base already contains `/api`.
  - `client/vercel.json` rewrites every path to `/`, including any `/api/*` request if the client directory is deployed as the Vercel root.
  - No root `vercel.json` or Vercel serverless API entrypoint exists.
  - Express defines `/api/health`, `/api/services`, `/api/bookings`, `/api/contact`, `/api/gallery`, and `/api/admin` in `server/app.js`.
  - `server/server.js` connects to MongoDB and listens persistently, which is appropriate locally but not itself a Vercel serverless handler.
  - Service APIs read MongoDB only; an empty/unseeded database returns an empty service list.
  - `npm run seed:services` performs stable-ID upserts from `server/data/services.json` after loading `.env` and validating `MONGODB_URI` plus production admin credentials through `getEnv()`.
- Existing architecture/components: React/Vite/TanStack Query client; Axios API adapter; Express/Mongoose backend; MongoDB-backed Service and Booking models.
- Existing files/modules likely involved: `client/src/lib/api.js`, client API tests, `server/app.js`, `server/server.js`, a new root serverless entrypoint, Vercel config(s), env/seed tests, README, and package scripts only if deployment/build orchestration requires it.
- Existing data flow: Booking page -> `useBookableServices` -> `getServices` -> Axios -> `/services`; availability and creation use the same adapter with booking routes.
- Existing API/UI/CLI/workflow behavior: Local dev runs Vite and persistent Express separately; Vite currently has no `/api` proxy; production deployment appears client-only based on `client/vercel.json`.
- Existing tests or verification coverage: Jest/Supertest covers service filters, booking availability, booking creation, and duplicate protection. Vitest has a deployment test that currently expects only the client SPA rewrite.
- Production probe evidence: Requests to the live URL were attempted on 2026-06-09, but this execution environment’s outbound CONNECT proxy returned HTTP 403 before reaching Vercel. Reachability is therefore unconfirmed rather than assumed.
- Dirty worktree: Clean before intake; no overlap risk.

## 6. Desired End State
- Expected final behavior: One root-level Vercel deployment builds/serves the Vite client and invokes Express for `/api/*`; client requests use same-origin `/api` when no override is configured.
- User-facing outcome: Services and service detail pages load; booking service selection loads; availability appears after service/date selection; valid bookings submit; duplicate slots return a conflict.
- Developer-facing outcome: Local `npm run dev`, frontend tests/build/lint, backend tests, and documented seed/deployment procedures are coherent.
- System/workflow outcome: Express initialization is safe for serverless reuse, MongoDB configuration is explicit, and service seed requirements are documented.
- Backward compatibility expectations: A configured absolute `VITE_API_URL` continues to work, whether it points to an API origin or an `/api` prefix according to the finalized normalized-base contract. Existing API response shapes and UI are preserved.

## 7. Scope
- In scope:
  - Audit all Vercel configuration and deployment assumptions.
  - Confirm route registration for services, bookings, contact, gallery, and admin.
  - Add root deployment routing/build configuration and serverless Express entrypoint as required.
  - Add safe client API base normalization/fallback.
  - Preserve local Vite + Express development, adding a development proxy if needed for same-origin-style calls.
  - Verify service, availability, booking, and duplicate-slot contracts.
  - Audit env validation, MongoDB connection behavior, service seed command/data, and docs.
  - Add/update Vitest and Jest tests first where behavior changes.
- Out of scope:
  - UI redesign or copy overhaul.
  - Admin feature redesign.
  - Changing booking business rules, service schema, or public API response shapes unless a proven blocker requires a minimal compatible change.
  - Provisioning Vercel/MongoDB accounts or adding secrets.
- Non-goals: Multi-project frontend/backend deployment, replacing Axios/TanStack Query, introducing Redux, or changing databases.
- Explicit boundaries: Never commit credentials; preserve current routes and minimal patch size.

## 8. Users And Use Cases
- Primary users: Prospective KareBraids clients browsing services and booking appointments.
- Secondary users: Site administrator and deployer maintaining service inventory and bookings.
- Main use cases: Browse services, open service details, select a bookable service, view open slots, submit booking.
- Edge use cases: Empty service database, missing env vars, malformed availability query, duplicate slot race, direct SPA deep links, serverless cold starts.

## 9. Functional Requirements
- Required behaviors:
  - `/api/health` responds through the production deployment.
  - Public and protected Express route namespaces are not swallowed by the SPA rewrite.
  - Service list/filter/detail requests reach Express and MongoDB.
  - Availability validates service/date and excludes booked slots.
  - Booking creation validates input and rejects duplicate service/date/time with HTTP 409, including database unique-index races.
  - Client defaults to same-origin `/api` when `VITE_API_URL` is missing or blank.
  - Local development resolves `/api/*` to Express.
- Inputs: Existing query parameters and booking JSON payload.
- Outputs: Existing API JSON contracts and HTTP status codes.
- State changes: Booking POST creates one MongoDB Booking document; seed command upserts Service documents.
- Error states: Missing env, failed database connection, empty service collection, invalid booking/availability input, duplicate booking, unknown API path.
- Permissions/auth expectations: Existing admin authentication remains unchanged; public routes remain public.

## 10. Non-Functional Requirements
- Performance expectations: Reuse cached Mongoose/serverless connection state where practical; avoid reconnect storms.
- Reliability expectations: Correct routing precedence; deterministic base URL normalization; idempotent service seeding.
- Security/privacy expectations: Secrets only in Vercel env or local `.env`; no credential logging; preserve admin route protection.
- Accessibility expectations: Not applicable; no UI redesign planned.
- Maintainability expectations: One documented API base contract and one root deployment configuration.
- DX expectations: Root scripts remain authoritative; local development and production instructions are copy-paste ready.

## 11. Affected Surfaces
- Files likely affected: `client/src/lib/api.js`, `client/vite.config.js`, deployment/API tests, `server/app.js` and/or a new `api/index.js`, `vercel.json`, removal or narrowing of `client/vercel.json`, `.env.example`, `README.md`, potentially `server/config/env.js`, `server/config/db.js`, and seed tests/docs.
- Directories likely affected: `client/`, `server/`, root `api/`, root deployment/docs/workflow artifacts.
- UI surfaces: No markup/styling changes expected; only data loading behavior.
- API routes: `/api/health`, `/api/services`, `/api/services/:id`, `/api/bookings/availability`, `/api/bookings`, plus reachability preservation for contact/gallery/admin.
- Components: Booking, Services, and ServiceDetail are audit surfaces but should not need API logic changes.
- Services: Axios adapter and existing service/booking service modules.
- Database/schema: No planned schema migration; verify Service seed and Booking uniqueness.
- Config/env vars: `MONGODB_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`, optional `VITE_API_URL`, and local `PORT`.
- Tests: Vitest deployment/API-base behavior; Jest/Supertest route and serverless compatibility where practical.
- Docs: Vercel project root/build/output/env/seed/deploy instructions and troubleshooting.
- Workflow artifacts: Active run request/spec/tasks/progress/handoff/review/verification/release/summary and Fallow audit.
- Frontend Taste Application: Not applicable. No frontend markup, CSS, Tailwind, redesign, or UI polish is in scope.

## 12. Dependency And Integration Map
- Internal dependencies: Axios adapter -> client service modules -> TanStack Query hooks -> pages; Vercel rewrite -> serverless Express app -> Mongoose -> MongoDB.
- External packages/services: Vercel, MongoDB Atlas or compatible MongoDB, Axios, Express, Mongoose.
- Integration points: Vercel build output, `/api` function routing, environment injection, MongoDB network access/IP policy.
- Ordering constraints: Tests first; establish API base contract; establish serverless handler; configure route precedence; then docs and end-to-end verification.
- Migration/setup requirements: Configure root Vercel project and required env vars; seed services once against production MongoDB if empty.

## 13. Data And State Impact
- Data models: Existing Service and Booking models retained.
- Database changes: No planned destructive changes. Production may require initial Service upserts.
- State management changes: None; TanStack Query remains server-state owner.
- Cache/session/local storage impact: None expected.
- Backward compatibility impact: Existing records and endpoint contracts remain valid.

## 14. UX / API / Workflow Expectations
- UX expectations: Existing loading/error/success states remain; successful routing removes false service-load errors.
- API contract expectations: Preserve JSON structures and status codes tested by current Supertest suites.
- CLI/workflow behavior: `npm run dev` starts local client/server; `npm run seed:services` seeds the selected MongoDB URI.
- Error handling expectations: API failures remain JSON; SPA fallback must never respond to `/api/*`; empty service data is documented distinctly from routing failure.
- Empty/loading/success/failure states: Empty seeded state yields an empty list rather than routing HTML; connection errors reach Express error handling/logs; UI existing error state remains for genuine failures.

## 15. Execution Strategy
- Recommended implementation approach:
  1. Add failing Vitest tests for same-origin API default, override normalization, root Vercel API precedence, and SPA fallback.
  2. Add/adjust Jest tests for route reachability/serverless entry behavior and retain booking duplicate tests.
  3. Implement an Axios base resolver defaulting to `/api`, with whitespace/trailing-slash safety.
  4. Add a Vite development proxy for `/api` to the local Express port if required by the selected fallback.
  5. Export/use Express in a Vercel-compatible serverless entrypoint without calling `listen`; preserve `server/server.js` for local runtime.
  6. Add root `vercel.json` with explicit API route precedence and SPA fallback, plus correct client build/output settings.
  7. Remove or revise conflicting client-only Vercel configuration.
  8. Audit env/connection/seed behavior and document production setup and empty-database recovery.
  9. Run endpoint contract tests, client tests/build/lint, server tests, local smoke checks, diff audit, review, Fallow, and workflow health check.
- Suggested sequencing: Deployment contract -> client base -> serverless handler -> route verification -> Mongo/seed docs -> full regression.
- Safe rollout/migration approach: Deploy config/code first with env vars configured, invoke health/services, seed only if services are empty, then verify availability and a controlled booking payload.
- Files to inspect before editing: All likely files plus schemas, validation, current deployment tests, package scripts, and Vite config.
- Decisions to avoid until more evidence exists: Do not alter service/booking schema or UI; do not loosen auth/env validation merely to make health pass without understanding the serverless initialization path.

## 16. Verification Strategy
- Required automated checks:
  - Focused Vitest tests for API base and Vercel config.
  - Relevant Jest/Supertest service and booking suites.
  - Full `npm test`.
  - Full `npm run test --prefix client`.
  - `npm run build --prefix client`.
  - `npm run lint --prefix client`.
  - `git diff --check`.
- Required manual checks: Inspect generated Vercel route/build semantics; local server/client smoke test where environment permits; probe deployed endpoints if outbound access permits.
- Test types needed: Unit/config tests, API integration tests, duplicate race protection regression, build validation.
- Build/lint/typecheck expectations: Client build and lint pass; no TypeScript check applies.
- Acceptance evidence required: Exact commands/results, HTTP statuses/bodies from Supertest/local curl, production probe result or explicit access limitation, seed dry/test evidence.
- Proof of completion: All in-scope automated checks pass and deployment/env steps are documented; inability to inspect actual production DB or deploy is recorded as a remaining operational action, not hidden.

## 17. Acceptance Criteria
- [ ] Root-level Vercel routing sends `/api/*` to Express and non-API deep links to the Vite SPA without conflict.
- [ ] The client uses same-origin `/api` when `VITE_API_URL` is missing/blank and safely supports an explicit override.
- [ ] Services page, booking service selection, and service detail API flows retain working contracts.
- [ ] Availability loads for a valid selected service/date and excludes already-booked slots.
- [ ] Booking submission succeeds for a free slot and returns 409 for duplicate slots, including unique-index conflict handling.
- [ ] `/api/health`, `/api/services`, filtered `/api/services`, `/api/bookings/availability`, and POST `/api/bookings` are verified through automated/local HTTP checks.
- [ ] `/api/contact`, `/api/gallery`, and `/api/admin` route namespaces remain reachable by Express and are not rewritten to the SPA.
- [ ] `npm run dev` remains valid for local development, with same-origin-style API calls reaching the local server.
- [ ] Client tests/build/lint and server tests pass.
- [ ] Required Vercel env vars, root/project settings, MongoDB network requirements, service presence check, and idempotent seed workflow are documented.
- [ ] Root cause analysis, changed files, deployment actions, and remaining risks are captured in final workflow artifacts and response.

## 18. Edge Cases And Failure Modes
- Edge cases: Blank/trailing-slash `VITE_API_URL`; deep links; `/api` 404; empty Services collection; serverless cold start/concurrent connection; existing booking race; Sunday/past/invalid date validation; protected admin routes.
- Failure modes: SPA HTML returned for API calls; requests sent to `/services` instead of `/api/services`; function starts a listener; missing Mongo/admin/JWT env; Atlas network rejection; unseeded database; deployment rooted at `client/` despite root config.
- Regression risks: Breaking local dev, double `/api/api`, swallowing API routes with SPA rewrite, changing admin auth initialization, or creating duplicate connections.
- Recovery expectations: Clear JSON/API errors, documented Vercel logs/env checks, idempotent reseed command, rollback-safe config changes.

## 19. Risks And Mitigations
- Technical risks: Vercel routing syntax/build output mismatch. Mitigation: config tests plus official config semantics and local build inspection.
- Product/UX risks: Empty database appears as no services. Mitigation: explicit production verification and seed procedure.
- Security risks: Exposing credentials in config/docs or weakening admin env checks. Mitigation: variable names/examples only; no secrets; preserve auth.
- Scope risks: Expanding into UI or data redesign. Mitigation: constrain changes to adapters, runtime/config, tests, and docs.
- Access risk: No Vercel/Mongo credentials and outbound live probe blocked by proxy. Mitigation: verify locally/in tests and provide exact post-deploy checks; clearly label production reachability as requiring operator confirmation.

## 20. Assumptions
- Explicit assumptions:
  - Vercel project should be rooted at the repository root.
  - One domain should serve frontend and API.
  - Existing MongoDB schemas and API payloads are correct.
  - Production secrets will be supplied by the deployer.
  - Current `server/data/services.json` is the intended seed source despite image-content evolution elsewhere.
- Confidence level: High for repository root causes; medium for live platform/database state due unavailable account/network access.
- What to revisit if assumptions are wrong: If frontend/backend must remain separate Vercel projects, retain override support and document CORS/origin configuration rather than using root rewrites.

## 21. Open Questions
- Blocking questions: None for implementation after spec approval.
- Non-blocking questions: Whether the production MongoDB currently contains Service records; whether Vercel project root is presently `client`; whether all env vars are configured; whether Atlas permits Vercel egress.
- Execution impact: These affect post-deployment operator steps and final reachability evidence, not the repository patch.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - TASK-001: Make the browser and local Vite runtime resolve API calls through a tested `/api` contract.
  - TASK-002: Add a tested root Vercel/Express serverless deployment path preserving every API namespace and SPA deep links.
  - TASK-003: Verify services/availability/booking behavior, Mongo/service seeding, and complete deployment documentation and quality gates.
- Suggested first task: API base contract and development proxy because it defines request URLs consumed by all pages.
- Suggested task ordering: Client contract -> deployment/serverless route -> database/endpoint/docs/full verification.
- Areas that should not become separate tasks: UI redesign, schema refactor, or unrelated lint cleanup.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each code task starts with focused failing tests, implements the smallest behavior, then hardens edge cases/config semantics and runs regression checks in each iteration.
