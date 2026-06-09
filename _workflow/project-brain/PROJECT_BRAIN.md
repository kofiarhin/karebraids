# Project Brain

Generated projection of `_workflow/project-brain/project.json`. JSON remains authoritative.

## Current workflow
- Run: `work`
- Stage: Complete
- Status: Repository work complete; external deployment verification required
- Next stage: Commit and PR, then operator deployment

## Completed goal
The KareBraids services and booking flow is configured for one repository-root Vercel project with same-origin client API routing, an Express serverless entrypoint, Mongo-backed booking eligibility, duplicate protection, and documented MongoDB seeding/deployment operations.

## Architecture
- Browser requests default to `/api`; `VITE_API_URL` is an optional complete-prefix override.
- Vite proxies `/api` to local Express during development.
- Root `vercel.json` builds `client/dist`, routes `/api/*` to `api/index.js`, and sends remaining paths to the SPA.
- `api/index.js` initializes MongoDB and forwards to `server/app.js`; `server/server.js` remains the local listener.
- Public booking/availability service eligibility comes from MongoDB Service records, not a hard-coded name list.

## Verification
- Server: 71/71 tests passed.
- Client: 116/116 tests passed.
- Client build and lint passed.
- Production dependency audit reports zero vulnerabilities.
- Fallow: 74.4/B, PARTIAL for static entrypoint/coverage and duplication findings; no dependency/import/circular/boundary blocker.

## Deployment requirements
- Vercel Root Directory: repository root.
- Required env: `MONGODB_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`.
- Leave `VITE_API_URL` unset for same-origin production.
- Permit Vercel access in MongoDB Atlas.
- Seed services if the filtered services endpoint returns an empty array.

## Open operational risk
This environment cannot access the Vercel account, production MongoDB, or live endpoint through its outbound proxy. Deploy and run the README checks before declaring live production healthy.

## Final artifacts
- Review: `_workflow/runs/work/review.md`
- Verification: `_workflow/runs/work/verification.md`
- Release notes: `_workflow/runs/work/release-notes.md`
- Summary: `_workflow/runs/work/summary.md`
- Handoff: `_workflow/runs/work/handoff.md`
- Fallow: `.workflow/fallow-audit.md`
