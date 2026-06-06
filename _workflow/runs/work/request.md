# Active Work Request

## Request ID
`global-theme-system`

## Source
Latest direct user prompt plus the clarification received on 2026-06-06.

## Execution Mode
`complete-workflow`

## Normalized Request
Implement a production-ready global theme system for the KareBraids React 19/Vite/Tailwind v4 frontend with `system`, `light`, and `dark` preferences. Store the preference under `karebraids-theme`, default to `system`, resolve and live-track `prefers-color-scheme`, and apply the resolved value as `data-theme="light"` or `data-theme="dark"` on `document.documentElement`.

Create `client/src/theme/theme.js` for constants, storage, system detection, and resolution helpers, plus `client/src/theme/ThemeProvider.jsx` to expose the preference, resolved theme, and `setTheme()`. Integrate the provider at the application root in `client/src/redux/providers.jsx`. Add an inline pre-React script to `client/index.html` to prevent a flash of the wrong theme.

Preserve the existing semantic-variable styling strategy and current dark appearance. Add a complete luxury light token override in `client/src/index.css` using warm ivory, cream, bronze, accessible text, subtle borders, and theme-appropriate shadows. Do not rewrite pages or introduce Tailwind `dark:` classes. Rename theme-specific layout selectors such as `dark-brand-shell` to theme-neutral names where needed.

Create an accessible nested `client/src/components/ThemeMenu.jsx` using Phosphor `DotsThreeVertical`, `Monitor`, `Sun`, `Moon`, and `Check` icons. Place it immediately after the desktop Book Appointment CTA and directly below the mobile drawer header. Support click-outside close, Escape, tab and keyboard navigation, ARIA state/relationships, managed focus, and focus return. Selecting a theme must apply and persist it immediately, close the submenu and parent overflow menu, and—on mobile—also close the mobile navigation drawer so the user returns to page content. Desktop and mobile selection behavior should otherwise be consistent, and the booking CTA must remain visually dominant.

Add Vitest coverage in `client/src/theme/ThemeProvider.test.jsx` and `client/src/components/ThemeMenu.test.jsx` for default system mode, explicit light/dark selection, persistence, system resolution and live media-query changes, document-root application, and accessible menu open/close/selection behavior. Preserve navigation and booking behavior.

## Explicit Boundaries
- No page rewrites.
- No Tailwind `dark:` conversion.
- No backend, API, database, authentication, or environment-variable changes.
- No new icon/menu dependency; use the installed Phosphor package and native React/DOM behavior.
