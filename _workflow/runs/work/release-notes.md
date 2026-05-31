# Release Notes: Contact Page MVP

## Request
Add a dedicated dark-luxury Contact page and MongoDB-backed enquiry submission endpoint.

## User-Facing Changes
- Added `/contact` page with required enquiry form, loading state, useful inline errors, polished success card, and replaceable contact details.
- Updated Header Contact navigation to route to `/contact` in desktop and mobile menus.
- Preserved existing Footer and About page unchanged.

## Developer Changes
- Added Contact service and TanStack Query mutation hook.
- Added ContactMessage Mongoose model, validation utility, controller, route, and server mount.
- Added backend Jest/Supertest and frontend Vitest/RTL coverage.

## New Routes/APIs
- `POST /api/contact`

## New Env Vars
none

## Database/Schema Changes
- New ContactMessage Mongoose collection with `fullName`, `email`, `phone`, `message`, `status`, and timestamps.

## Dependencies Added/Removed
none

## Test Commands Run
- `npx jest server/tests/contact.test.js --runInBand`
- `npm run test:server`
- `npm run test --prefix client -- contact-page.test.jsx`
- `npm run test --prefix client`
- `npm run lint --prefix client`
- `npm run build --prefix client`
- `git diff --check`
- Local Vite `/contact` HTTP smoke.

## Known Limitations
- No email sending, rate limiting/spam prevention, or admin inbox in this MVP.
- Screenshot capture unavailable because browser automation is not installed in the container.

## Follow-Up Work
Optional spam protection, email delivery, inbox administration, and browser screenshot automation.

## Suggested Commit Message
`feat: add contact page and persisted enquiries`
