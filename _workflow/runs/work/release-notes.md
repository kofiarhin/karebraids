# Release Notes

## Request
Implement the approved MongoDB services/gallery migration spec.

## User-facing changes
- Public gallery APIs now read services, images, and reviews from MongoDB Service documents instead of static JSON.
- Public gallery response shapes are preserved for the existing frontend.

## Developer changes
- Added a Mongoose `Service` model with embedded images/reviews and validation.
- Added protected admin service CRUD endpoints.
- Added protected admin embedded image CRUD endpoints.
- Added service/image/review validation helpers.
- Added a safe re-runnable seed script for existing `server/data/services.json` data.
- Added Jest/Supertest/model/seed tests.

## New routes/APIs
- `GET /api/admin/services`
- `GET /api/admin/services/:id`
- `POST /api/admin/services`
- `PUT /api/admin/services/:id`
- `DELETE /api/admin/services/:id`
- `POST /api/admin/services/:id/images`
- `PUT /api/admin/services/:id/images/:imageId`
- `DELETE /api/admin/services/:id/images/:imageId`

## New env vars
none

## Database/schema changes
- New MongoDB `Service` collection via Mongoose with unique `id` slug and embedded `images`/`reviews`.

## Dependencies added/removed
none

## Test commands run
- `npm run test:server -- --runTestsByPath server/tests/gallery.test.js server/tests/admin-services.test.js server/tests/seed-services.test.js`
- `npm run test:server -- --runTestsByPath server/tests/service-model.test.js server/tests/admin-services.test.js server/tests/gallery.test.js server/tests/seed-services.test.js`
- `npm run test:server -- --runTestsByPath server/tests/admin-services.test.js server/tests/service-model.test.js`
- `npm run test:server`
- `git diff --check`

## Known limitations
- No file upload system; admins manually paste image URLs.
- Service ordering currently uses creation order (`createdAt`, `_id`), not an explicit admin sort order.

## Follow-up work
- Run `npm run seed:services` against the target MongoDB environment after deployment.
- Add admin UI screens if needed.
- Consider `sortOrder` if manual ordering becomes required.

## Suggested commit message
`Implement MongoDB-backed service gallery management`
