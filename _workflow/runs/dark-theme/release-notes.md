# Release Notes: KareBraids Full Dark Brand Redesign

## Request

Redesign all current KareBraids pages and shared frontend UI using the approved espresso, bronze, amber, and warm cream dark brand palette.

## User-Facing Changes

- Added a full dark luxury salon visual system across Home, About, Gallery, Booking, shared navigation, mobile drawer, footer, buttons, gallery modal, and booking states.
- Updated global brand tokens to espresso, cocoa, bronze, amber, tan, and warm cream tones.
- Restyled gallery cards and modal with dark overlays and warmer surfaces.
- Restyled booking workflow panels, calendar, form controls, loading, empty, error, selected, disabled, and confirmation states.
- Tightened mobile heading scale for better readability.

## Developer Changes

- Added semantic dark UI hook classes to shared/page/modal surfaces.
- Added tests that lock the dark-brand hook classes while preserving existing behavior.
- Kept existing routing, services, hooks, API client, content data, and booking flow unchanged.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `npm test --prefix client`
- `npm run lint --prefix client`
- `npm run build --prefix client`
- `npm test --prefix client -- site-pages.test.jsx`
- `npm test --prefix client -- gallery-modal.test.jsx`
- `npm test --prefix client -- booking-flow.test.jsx`
- `npx playwright screenshot ...` for visual checks

## Known Limitations

- Existing stock imagery remains in use.
- In-app Browser plugin was unavailable because the Node REPL tool was not exposed; terminal Playwright was used for visual checks.
- Package files show modified in `git status` from line-ending metadata after local install, but they have no content diff and content hashes match `HEAD`.

## Follow-Up Work

- Replace stock imagery with owned salon photography when available.
- Optionally normalize package file line endings as a maintenance task.

## Suggested Commit Message

`feature: redesign karebraids with dark salon brand palette`
