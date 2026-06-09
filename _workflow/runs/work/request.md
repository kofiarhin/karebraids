# Active Work Request

## Source
Direct user prompt received 2026-06-09.

## Execution mode
`complete-workflow`

## Normalized request
Audit and repair the complete KareBraids production services and booking flow for a single Vercel project rooted at the repository root. Confirm or otherwise document production reachability for `/api/services`, `/api/bookings`, `/api/contact`, `/api/gallery`, and `/api/admin`; identify all deployment, client API, Express/serverless, MongoDB, and service-seeding blockers; implement minimal production-safe same-origin `/api/*` routing, a safe optional `VITE_API_URL` override, any required Express serverless entrypoint, tests, and deployment/environment documentation; then verify health, service listing/filtering, availability, booking creation, duplicate-slot protection, local development, client build, and server tests. Do not redesign unrelated UI.

## Confirmed deployment decision
Use one Vercel project rooted at the repository root. Serve the Vite SPA and Express API from the same origin, with `/api/*` reserved for the backend and non-API paths handled as SPA routes.
