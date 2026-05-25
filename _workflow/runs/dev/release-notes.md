# Release Notes: Homepage Visual Optimization

- Request: Optimize the KareBraids homepage so it feels less text-heavy and more visual while preserving the current brand direction.

## User-Facing Changes

- Added an overlapping gallery-image thumbnail cluster to the trust strip.
- Converted featured services into image-backed cards with readable overlays.
- Added a process/detail image panel to the Why choose KareBraids section.
- Kept the gallery preview as an image grid.
- Added style visuals beside testimonials.
- Added a gallery-image-backed CTA with dark green overlay and accessible text contrast.
- Preserved the existing rotating hero carousel and current section order.

## Developer Changes

- Added deterministic homepage image selections from existing `galleryItems`.
- Added homepage-specific CSS for new image clusters, service image cards, process panel, testimonial visuals, CTA image treatment, and responsive stacking.
- Added/updated React Testing Library coverage for visual structures and decorative image semantics.

## New Routes/APIs

- none

## New Env Vars

- none

## Database/Schema Changes

- none

## Dependencies Added/Removed

- none

## Test Commands Run

- `cd client && npm test -- site-pages.test.jsx`
- `cd client && npm test`
- `cd client && npm run lint`
- `cd client && npm run build`
- Playwright/Chromium desktop and mobile browser checks against local Vite dev server.

## Known Limitations

- Homepage images continue to depend on the existing remote Pexels URLs in `galleryItems`.
- The browser verification used Playwright/Chromium CLI automation because the in-app browser tool was not exposed by tool discovery.

## Follow-Up Work

- none

## Suggested Commit Message

```txt
feature: make homepage more visual
```
