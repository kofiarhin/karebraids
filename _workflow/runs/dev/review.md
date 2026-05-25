# Review

## Request

Add a hidden `/admin` dashboard with env-backed JWT admin login and full CRUD for bookings only.

## Spec And Plan

- Spec file used: `_workflow/runs/dev/spec.md`
- Task plan used: `_workflow/runs/dev/tasks.md`

## Tasks Reviewed

- TASK-001: Add admin JWT login and route guard.
- TASK-002: Add guarded admin booking CRUD API.
- TASK-003: Add hidden frontend admin dashboard CRUD UI.
- TASK-004: Final integrated verification and workflow closeout.

## Iteration Evidence Reviewed

- TASK-001 includes Build, Refine, and Polish evidence with Red -> Green -> Refactor.
- TASK-002 includes Build, Refine, and Polish evidence with Red -> Green -> Refactor.
- TASK-003 includes Build, Refine, and Polish evidence with Red -> Green -> Refactor.
- TASK-004 includes final integrated verification and closeout evidence.

## Bugs Found

- Fixed missing JWT dependency after auth test Red.
- Fixed malformed Bearer header acceptance.
- Fixed existing env test to include new required admin env vars.
- Fixed missing status-only API route.
- Fixed React Query login mutation argument shape.
- Fixed invalid saved token frontend recovery.
- Fixed admin page lint issues around unused state and effect state updates.

## Scope Creep Check

- Scope respected.
- Booking CRUD only was implemented.
- Services/gallery CRUD, user model, roles, password reset, email/calendar integration, and deployment changes were not implemented.

## Final Diff Audit

- `git diff --stat` completed.
- `git diff` completed.
- The diff matches the approved spec.
- Expected implementation changes include:
  - `.env.example`
  - `package.json`
  - `package-lock.json`
  - `server/app.js`
  - `server/config/env.js`
  - `server/models/Booking.js`
  - `server/utils/bookingValidation.js`
  - new server admin auth/booking controllers, middleware, routes, and tests
  - `client/src/App.jsx`
  - `client/src/index.css`
  - new frontend admin page, admin service, query/mutation hooks, and tests
- Expected workflow artifacts changed under `_workflow/runs/dev/`.
- Decision file added: `_decisions/2026-05-25-admin-jwt-env-auth.md`.
- Pre-existing dirty files remain and were treated as unrelated:
  - `.agents/skills/grill-me/SKILL.md`
  - `AGENTS.md`
  - `RUN_WORKFLOW.md`
  - `.agents/skills/design-taste-frontend/`
- No secrets, concrete passwords, tokens, generated screenshots, dev-server logs, or deployment config changes were added.

## Failure Recovery Notes

- The browser plugin tool was not exposed through tool discovery; Playwright CLI was used as fallback.
- A filtered `git diff` attempt failed because the exclusion pathspec syntax was not accepted; required plain `git diff` succeeded.

## Missing Tests

- No known missing tests for approved scope.
- Full browser CRUD against a live backend/database was not run because that would require real admin env values and MongoDB data; API and UI behavior are covered separately by automated tests.

## Security Concerns

- Admin password comes from env and is not returned to the client.
- JWT secret is required outside test mode.
- Admin routes require Bearer tokens.
- JWT is stored in `localStorage`; this is acceptable for the simple requested admin login, but a future hardened auth model should consider httpOnly cookies or a full auth provider.

## Architecture Concerns

- Env-backed single-admin auth is intentionally simple. It should be revisited if multiple admins, password rotation workflows, or audit trails are needed.

## Frontend Taste Compliance

- `design-taste-frontend` was applied before spec and carried through implementation.
- Admin UI is functional, compact, responsive, and avoids marketing-page treatment.
- Loading, empty, error, saving, success, and invalid-token states are present.
- No new frontend dependencies were added.

## Follow-Up Tasks

- Decide whether `cancelled` and `completed` bookings should reopen appointment availability.
- Consider stronger auth storage or hashed admin password support if the admin surface grows.

## Final Review Verdict

Passed.
