# Booking and Services Production Repair Task Plan

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-09
- Execution mode: `complete-workflow`
- Progress read: `_workflow/runs/work/progress.md`
- Summary read: `_workflow/runs/work/summary.md`
- Handoff read: `_workflow/runs/work/handoff.md`
- Project Brain read: project/run JSON, categories, and conflicts
- Spec basis: Sections 5–22, especially affected surfaces, integration map, runtime expectations, verification, acceptance criteria, risks, and task extraction notes.
- Frontend Taste Application: Not applicable; no JSX/CSS/Tailwind/UI generation is planned.

## TASK-001: Route browser API calls through the same-origin `/api` contract

- Status: Done
- Objective: Make all existing service, booking, contact, gallery, and admin adapters use `/api` by default while preserving a normalized explicit override and local development.
- Files likely affected: `client/src/lib/api.js`, `client/vite.config.js`, `client/test/api-config.test.js`.
- Checklist:
  - [x] Add failing Vitest coverage for missing, blank, explicit, and trailing-slash API bases.
  - [x] Default Axios to `/api`.
  - [x] Add local Vite `/api` proxy to Express.
  - [x] Verify existing client service contracts.
- Iteration 1 Build: Red test default/override behavior; implement resolver and proxy; focused tests.
- Iteration 2 Refine: Red edge-case test for whitespace/trailing slashes; normalize; client service regression.
- Iteration 3 Polish: Audit all adapters for shared Axios use; full client test/build/lint.
- Test plan: Vitest focused API/deployment/service tests, full client suite, build, lint.
- Red/Green/Refactor evidence: To be recorded in progress.
- Acceptance criteria: Same-origin fallback, safe override, local proxy, no API logic moved into components.
- Verification commands: `npm run test --prefix client -- --run client/test/api-config.test.js`; relevant existing suites; client build/lint.
- Stop condition: API base cannot be made compatible without changing public adapter contracts.
- Out of scope: UI changes and server route changes.

## TASK-002: Serve the SPA and every Express namespace from one root Vercel project

- Status: Done
- Objective: Add a tested Vercel function and root routing/build configuration that sends `/api/*` to Express before SPA fallback.
- Files likely affected: `api/index.js`, `vercel.json`, `client/vercel.json`, `client/test/deployment.test.js`, `server/tests/serverless.test.js`.
- Checklist:
  - [x] Add failing config tests for root build/output and ordered API/SPA rewrites.
  - [x] Add failing Jest serverless tests for database initialization and Express health/404 behavior.
  - [x] Add root `api/index.js` without `listen()`.
  - [x] Remove conflicting client-only Vercel config.
  - [x] Verify services/bookings/contact/gallery/admin namespaces remain Express routes.
- Iteration 1 Build: Red deployment config tests; implement root Vercel config/function; focused tests.
- Iteration 2 Refine: Red warm-invocation/failure-retry tests; harden connection caching; serverless tests.
- Iteration 3 Polish: Audit rewrite precedence, API JSON 404, function imports, and full server/client regressions.
- Test plan: Vitest deployment tests; Jest serverless/app/API suites; build and config parse.
- Red/Green/Refactor evidence: To be recorded in progress.
- Acceptance criteria: Root project builds `client/dist`; API rewrites reach `api/index`; SPA deep links reach `index.html`; no persistent listener in the function.
- Verification commands: Focused Vitest/Jest, `npm test`, client build.
- Stop condition: Vercel config requires an unverified legacy builder or incompatible project-root assumption.
- Out of scope: Separate backend deployment.

## TASK-003: Prove booking/service behavior and document production database/deployment operations

- Status: Done
- Objective: Verify the complete API flow, seed behavior, duplicate protection, and provide operator-ready Vercel/MongoDB instructions and root-cause analysis.
- Files likely affected: `README.md`, `.env.example`, relevant tests, workflow artifacts.
- Checklist:
  - [x] Verify health, all services, filtered services, availability, booking creation, and duplicate conflict.
  - [x] Confirm contact/gallery/admin route reachability via existing/new tests.
  - [x] Validate seed data and idempotent upsert workflow.
  - [x] Document root project settings, env vars, Atlas network access, service count/seed checks, and post-deploy curl commands.
  - [x] Record inability or success of live production probes without claiming unavailable access.
- Iteration 1 Build: Add any missing endpoint/seed documentation tests first; update docs; focused checks.
- Iteration 2 Refine: Run endpoint contract suite and local smoke server with controlled mocks/test process; correct gaps.
- Iteration 3 Polish: Full tests/build/lint/diff/security audit, review, Fallow, final artifacts.
- Test plan: Full Jest and Vitest, client build/lint, seed validation, local HTTP smoke, diff check.
- Red/Green/Refactor evidence: Documentation-only portions use explicit TDD exception; behavioral tests remain test-first.
- Acceptance criteria: Every spec criterion is met or an external production-access limitation is explicitly documented with exact operator verification steps.
- Verification commands: `npm test`; `npm run test --prefix client`; `npm run build --prefix client`; `npm run lint --prefix client`; local curl; seed tests; `git diff --check`.
- Stop condition: Repository tests expose an in-scope production blocker that cannot be safely fixed.
- Out of scope: Supplying secrets, deploying, or mutating production data from this environment.
