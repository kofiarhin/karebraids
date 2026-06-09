# Release Notes — Production Booking and Services Repair

## Fixed
- Browser API requests now default to same-origin `/api` when `VITE_API_URL` is missing or blank.
- Local Vite development proxies `/api/*` to Express.
- Root Vercel deployment now builds the client and routes API requests to a serverless Express function before SPA fallback.
- Removed the conflicting client-only Vercel rewrite.
- Public availability and booking validation now use MongoDB service eligibility instead of a stale hard-coded service-name list.
- Mongo unique-index races continue to return a user-safe 409 duplicate-slot response.
- Service seeding now requires only `MONGODB_URI`.
- `npm run dev` now has its required `nodemon` dependency.

## Deployment actions
1. Set Vercel Root Directory to repository root (`.`).
2. Configure `MONGODB_URI`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET` for Production/Preview as needed.
3. Leave `VITE_API_URL` unset for same-origin production routing.
4. Ensure MongoDB Atlas permits Vercel connections.
5. Redeploy.
6. Run README health/services/availability/booking checks.
7. If services are empty, run `npm run seed:services` against the production URI.

## Compatibility
- Existing API response shapes, React pages, TanStack Query hooks, admin auth, and booking duplicate key remain compatible.
- No UI redesign or schema migration.

## Known operational requirement
Current production was not redeployed from this environment, and outbound endpoint probes were blocked. Production success must be confirmed after deployment with the documented commands.
