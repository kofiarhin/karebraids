# Release Notes: Unified KareBraids Semantic Color System

- Request: Unify KareBraids colors across public, Booking, drawer, modal, and Admin surfaces.
- User-facing changes:
  - Booking, mobile drawer, and Admin now match the existing Home/Gallery/About espresso-and-cream dark-luxury aesthetic.
  - Gold is restrained to accent usage; mobile Booking navigation no longer presents a bright orange active surface.
  - Admin status, loading, success, warning, info, and error surfaces retain distinct muted operational colors.
- Developer changes:
  - Added one centralized semantic `:root` color system and reusable alpha/media-treatment token set in `client/src/index.css`.
  - Added strict Vitest contract coverage preventing selector-rule color literals outside the centralized theme.
  - Stabilized Booking-flow tests with dynamic future-date selection.
- New routes/APIs: none.
- New env vars: none.
- Database/schema changes: none.
- Dependencies added/removed: none.
- Test commands run: frontend Vitest, frontend lint, frontend production build, backend Jest, whitespace audit, source scans, local preview smoke.
- Known limitations: screenshot capture unavailable because container browser automation tooling is absent.
- Follow-up work: optional unused starter SVG cleanup; optional stylesheet modularization.
- Suggested commit message: `feat: unify KareBraids semantic color system`
