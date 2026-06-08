# Release Notes — Backend-Driven Service and Gallery Data

## Added
- Public service list/detail/per-service-gallery Express endpoints with filters and ID-or-slug lookup.
- Canonical service/image serializers with legacy pricing and image aliases.
- TanStack Query service hooks for featured, bookable, gallery-enabled, and detail queries.
- Backend-driven service detail and image-first booking service cards.
- Jest/Vitest coverage for API contracts, seed upserts, frontend API calls, deep links, and booking cards.

## Changed
- Expanded MongoDB Service schema and seed catalog to 11 schema-valid services, including safe Kids Braids, Box Braids, and Twists records.
- Service seeding now bulk-upserts existing records instead of skipping them.
- Existing gallery endpoints now use the shared canonical serializer and accept service IDs or slugs.
- Gallery, Services, homepage service/gallery sections, Booking, ServiceDetail, and Admin service selection now use backend data.
- Removed production dependencies on `client/src/data/services.js` and retired obsolete static style profiles.

## Compatibility
- `/booking?service=knotless-braids` and `/gallery?service=knotless-braids` remain supported.
- Legacy `boho-braids` slug resolves through the canonical backend record.
- Existing gallery endpoints and frontend field aliases remain available.

## Verification
- 63 backend tests passed.
- 103 frontend tests passed.
- Client production build and ESLint passed.
- 11 seed records validate with HTTP(S)-only image metadata.
- Applied skill: design-taste-frontend

## Deployment Note
Run `npm run seed:services` with a configured `MONGODB_URI` before or during deployment to synchronize the canonical Service collection.
