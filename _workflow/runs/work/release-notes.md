# Release Notes: KareBraids Homepage and Gallery Architecture Redesign

## User-facing Changes
- Rebuilt homepage below the unchanged Hero into a conversion-focused browsing and booking journey.
- Added category browsing, transparent featured pricing, four-item Client Gallery, eight-item carousel, trust reasons, booking steps, and dual CTA.
- Added filtered gallery URLs, six service detail pages, compatibility redirects, reusable reviews display, and style-specific booking preselection.

## Developer Changes
- Added backend-owned static gallery metadata and frontend TanStack Query gallery boundary.
- Added reusable data-driven style profiles and review components.

## New Routes / APIs
- `GET /api/gallery`
- `/services/:slug`
- `/styles/:slug` compatibility redirect

## Env Vars / Schema / Dependencies
- New env vars: none.
- Database/schema changes: none.
- Dependencies added/removed: none.

## Verification
- Server Jest, client Vitest, lint, build, whitespace, API smoke, Hero lock, security/scope audit passed.

## Known Limitations
- Gallery metadata remains static placeholder content and remote URLs.
- Screenshot unavailable because browser automation tooling is absent.

## Follow-up
- Optional CMS persistence, verified review submission flow, and screenshot automation.

## Suggested Commit
`feat: redesign homepage and add gallery service architecture`
