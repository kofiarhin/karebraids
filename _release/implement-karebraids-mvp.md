# Release Notes: Implement KareBraids MVP

## Request
Implement KareBraids MVP from `project-brief.md`.

## User-Facing Changes
- Added Home, About, Gallery, and Booking pages.
- Added premium Afro-luxury visual styling, responsive layout, trust cues, testimonials, service highlights, and image-led gallery.
- Added gallery modal with close button, backdrop click, ESC close, opening focus, and focus return.
- Added multi-step booking flow for service, date, time, customer details, and confirmation.
- Booking flow validates Sunday selection and required customer fields.
- Booking flow shows loading, empty, success, and API error states.

## Developer Changes
- Added React Router and TanStack Query providers.
- Added shared Axios API client at `client/src/lib/api.js`.
- Added booking service and query/mutation hooks.
- Added Express booking routes/controllers/model/validation utilities.
- Added backend env validation and MongoDB connection helper.
- Added Vitest/RTL and Jest/Supertest test coverage.

## New Routes/APIs
- Frontend routes: `/`, `/about`, `/gallery`, `/booking`
- Backend routes:
  - `GET /api/health`
  - `GET /api/bookings/availability`
  - `POST /api/bookings`

## New Env Vars
- Backend: `MONGODB_URI`, `PORT`
- Frontend: `VITE_API_URL`

## Database/Schema Changes
- Added `Booking` Mongoose model.
- Added unique compound index on `{ service, date, time }`.

## Dependencies Added/Removed
- Added frontend dependencies: `react-router-dom`, `@tanstack/react-query`, `axios`, `@phosphor-icons/react`
- Added frontend dev dependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `tailwindcss`, `@tailwindcss/vite`
- Added backend dev dependencies: `jest`, `supertest`, `cross-env`
- Removed: none

## Test Commands Run
- `npm test`
- `npm test --prefix client`
- `npm run build --prefix client`
- `npm run lint --prefix client`
- `rg "localhost:5000|http://localhost:5000" client/src server`

## Known Limitations
- Gallery imagery uses external Pexels placeholder images until real KareBraids photography is available.
- No payments, admin dashboard, cancellation, rescheduling, or customer accounts.
- Backend tests mock Mongoose model calls rather than running against a real MongoDB instance.
- Public booking endpoint has no rate limiting yet.

## Follow-Up Work
- Add production booking notification/admin review flow.
- Add public endpoint rate limiting.
- Replace placeholder images with owned brand assets.
- Add integration tests against a reliable test MongoDB.

## Suggested Commit Message
`feat: implement karebraids mvp booking site`
