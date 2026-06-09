# Booking and Services Production Repair Review

## Request
Repair the complete production services/booking flow, Vercel routing, API base configuration, Express serverless runtime, MongoDB seeding workflow, endpoint behavior, and deployment documentation.

## Basis
- Spec: `_workflow/runs/work/spec.md`
- Task plan: `_workflow/runs/work/tasks.md`
- Tasks reviewed: TASK-001, TASK-002, TASK-003

## Root cause analysis
1. `client/src/lib/api.js` had no fallback, so absent `VITE_API_URL` produced requests without the required `/api` prefix.
2. The only Vercel config lived under `client/` and rewrote every path to the SPA, leaving no production Express function or safe `/api/*` route.
3. `server/server.js` called `listen()` and was not a Vercel function entrypoint.
4. Booking validation used a stale hard-coded service list; most Mongo-seeded bookable services were rejected by availability/submission.
5. The seed command called full runtime env validation and unnecessarily required admin/JWT settings.
6. `npm run dev` referenced undeclared `nodemon`.
7. An empty production Service collection would correctly return an empty array but leave all service-dependent pages unusable; deployment docs did not explain detection/seeding.

## Bugs found and fixed
- Same-origin API fallback and override normalization.
- Local `/api` proxy.
- Root Vercel build/output/API/SPA routing.
- Serverless Express Mongo initialization/retry/reuse.
- Mongo-backed public booking eligibility.
- Duplicate unique-index race test.
- Database-only seed env access.
- Missing local dev dependency.
- Missing deployment/env/seed/troubleshooting documentation.

## Scope creep check
No UI markup, styling, service schema, booking payload, response shape, admin auth behavior, or unrelated feature was changed.

## Final diff audit
- `git diff --stat` and `git diff` reviewed.
- Changed files match the approved spec and task plan.
- Tests were added before each new runtime behavior where practical.
- No generated junk, credentials, private keys, or unrelated files found.
- Placeholder credentials in examples are explicit non-secrets.

## Failure recovery
- Captured expected test failures for missing resolver/config/function, stale service validation, and missing DB-only env accessor.
- Fixed and reran exact commands.
- Fixed client lint failure by explicitly importing Node env.
- Fixed `npm run dev` missing nodemon dependency; remaining Mongo refusal is environmental.

## Missing tests
No material repository-controlled behavior is missing focused coverage. Actual Vercel deployment and production Mongo contents cannot be tested without external credentials/redeployment.

## Security concerns
- Production dependency audit: zero vulnerabilities.
- Full dev audit reports two critical development-chain findings; no production dependency exposure was reported. Breaking-force updates were not applied outside scope.
- Atlas network policy and secret handling are documented.

## Architecture concerns
- Booking identity remains service-name based rather than stable service ID; preserved for compatibility. A future migration could store service ID plus display-name snapshot.
- Serverless initialization validates all runtime secrets before public routes, matching current server startup behavior.

## Follow-up tasks
- Deploy from repository root and run README post-deploy checks.
- Seed production services if the filtered endpoint returns an empty array.
- Optionally migrate bookings to stable service IDs in a separate backward-compatible project.

## Final review verdict
PASSED for code/config/docs with an explicit external deployment verification requirement.
