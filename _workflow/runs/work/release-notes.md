# Release Notes — KareBraids Global Theme System

- Date: 2026-06-06
- Request: Add production-ready global system/light/dark theming.
- Applied skill: design-taste-frontend

## User-Facing Changes

- Added System, Light, and Dark appearance preferences.
- Added a compact overflow theme control after the desktop Book Appointment CTA and below the mobile drawer header.
- Theme choices apply immediately and persist across refreshes/revisits.
- System mode tracks OS appearance changes while the site remains open.
- Mobile theme selection closes the theme menus and navigation drawer, returning users to page content.
- Added a warm ivory, soft cream, bronze-accented luxury light theme while retaining the existing dark design.
- Prevented initial incorrect-theme flash with a pre-React bootstrap.

## Developer Changes

- Added pure theme/storage/media helpers and a global ThemeProvider/context contract.
- Added root `data-theme` and browser `color-scheme` synchronization.
- Renamed `dark-brand-shell` to theme-neutral `theme-brand-shell` across CSS/layout/tests.
- Added focused provider, bootstrap/token, menu, keyboard/focus, and mobile drawer tests.

## CSS Variable Migration Notes

- Existing base `:root` values remain the dark/default palette; no consuming page must change.
- New light values live in `:root[data-theme="light"]` and override semantic roles such as page/panel/card surfaces, primary/secondary/muted text, borders, overlays, state colors, focus ring, and luxury shadows.
- Compatibility aliases continue to resolve through the semantic roles.
- Supporting centralized alpha/surface tokens used directly by legacy selectors receive light-mode overrides where required.
- Component-level theme classes and Tailwind `dark:` variants were not introduced.

## New Routes / APIs

None.

## New Environment Variables

None.

## Database / Schema Changes

None.

## Dependencies Added / Removed

None.

## Test Commands Run

- `npm run test --prefix client -- src/theme/ThemeProvider.test.jsx`
- `npm run test --prefix client -- src/theme/ThemeBootstrap.test.js`
- `npm run test --prefix client -- src/components/ThemeMenu.test.jsx`
- `npm run test --prefix client`
- changed-file `npx eslint ...`
- `npm run lint --prefix client`
- `npm run build --prefix client`
- `npm run test`
- `git diff --check`
- `npx fallow health --format json --quiet --explain 2>/dev/null || true`

## Known Limitations

- Full client lint still reports pre-existing hook errors in Booking and Gallery; all changed files lint cleanly.
- No browser screenshot was captured because browser automation/runtime is unavailable in this environment.

## Follow-Up Work

- Optional separate cleanup for Booking/Gallery hook lint findings.
- Optional Playwright visual snapshots and automated contrast auditing.

## Suggested Commit Message

`feat: add global theme system`
