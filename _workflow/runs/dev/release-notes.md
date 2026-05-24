# Release Notes

## Request

Improve mobile navigation with a hamburger menu and side navigation links for mobile.

## User-Facing Changes

- Mobile header now uses a hamburger button instead of the horizontal nav row.
- Tapping the hamburger opens a right-side drawer with Home, About, Gallery, and Booking links.
- Drawer closes from the close button, backdrop, Escape key, or selecting a drawer link.
- Booking is visually emphasized as the primary drawer action.
- Desktop/tablet navigation remains unchanged.

## Developer Changes

- Added local drawer state and focus management in `Layout.jsx`.
- Added mobile drawer/backdrop responsive styles in `index.css`.
- Added React Testing Library coverage for drawer open/close behavior and accessibility behavior.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `npm test -- site-pages.test.jsx`
- `npm test`
- `npm run lint`
- `npm run build`
- Playwright CLI responsive checks

## Known Limitations

JSDOM cannot prove CSS breakpoint visibility; responsive behavior was verified with Playwright CLI.

## Follow-Up Work

none

## Suggested Commit Message

`feature: add mobile navigation drawer`
