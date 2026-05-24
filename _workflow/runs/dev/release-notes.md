# Release Notes: Homepage Hero Image Carousel

- Request: Implement a rotating hero image carousel on the KareBraids homepage.

## User-Facing Changes

- Homepage hero now rotates through the first five gallery images.
- Added small clickable dot controls over the hero image.
- Dot controls show the active slide and let users jump directly to another slide.
- The existing hero layout, CTA buttons, luxury frame, and "Salon and mobile appointments" badge remain in place.
- Mobile styling keeps the dots visible above the appointment badge.
- Reduced-motion users do not receive ongoing automatic carousel motion.

## Developer Changes

- Added local hero carousel state and timer cleanup in `client/src/pages/Home.jsx`.
- Added carousel slide, dot, focus, mobile, and reduced-motion CSS in `client/src/index.css`.
- Added React Testing Library coverage for carousel rendering, click behavior, auto-rotation, and reduced-motion behavior.

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
- Playwright CLI screenshot checks for desktop and mobile homepage hero.

## Known Limitations

- Carousel uses existing remote gallery image URLs, so image display still depends on those external images loading.
- No swipe, arrows, or drag controls were added because they were out of scope.

## Follow-Up Work

- none

## Suggested Commit Message

```txt
feature: add homepage hero carousel
```
