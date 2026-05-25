# Release Notes

## Request

Add a hidden admin dashboard with JWT-protected login and full CRUD for bookings only.

## User-Facing Changes

- Added hidden `/admin` route for admin login and booking management.
- Admin can log in, view bookings, create bookings, edit booking details, update status, and delete bookings.
- Booking statuses now include `pending`, `confirmed`, `cancelled`, and `completed`.
- Public navigation remains unchanged; Admin is not shown in the public nav.

## Developer Changes

- Added `jsonwebtoken`.
- Added env validation for `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET`.
- Added admin auth controller, JWT middleware, admin booking controller, and admin routes.
- Added frontend admin service functions and TanStack Query hooks.
- Added focused backend and frontend tests.

## New Routes/APIs

- `POST /api/admin/login`
- `GET /api/admin/session`
- `GET /api/admin/bookings`
- `POST /api/admin/bookings`
- `PUT /api/admin/bookings/:id`
- `PATCH /api/admin/bookings/:id/status`
- `DELETE /api/admin/bookings/:id`

## New Env Vars

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `JWT_SECRET`

## Database/Schema Changes

- `Booking.status` enum expanded to `pending`, `confirmed`, `cancelled`, and `completed`.
- No new collection or migration required.

## Dependencies Added/Removed

- Added: `jsonwebtoken`
- Removed: none

## Test Commands Run

- `npm run test:server -- admin-auth.test.js`
- `npm run test:server -- admin-bookings.test.js`
- `npm run test:server`
- `npm test --prefix client -- admin-dashboard.test.jsx`
- `npm test --prefix client`
- `npm run lint --prefix client`
- `npm run build --prefix client`
- Playwright CLI screenshot check for `/admin`

## Known Limitations

- Single env-backed admin account only.
- JWT is stored in `localStorage`.
- Full live-browser CRUD against MongoDB was not run; backend and frontend are verified separately with automated tests.
- Cancelled/completed bookings currently remain booking records and do not explicitly reopen slots.

## Follow-Up Work

- Decide availability behavior for cancelled/completed bookings.
- Consider hashed password storage, httpOnly-cookie auth, audit logs, or a full user model if admin needs grow.

## Suggested Commit Message

`feature: add admin booking dashboard`
