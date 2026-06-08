# Release Notes — Representative Local Image Library

## Changed
- Added one curated representative image library backed by all existing files in `client/public/images/`.
- Service display images now derive deterministically from service ids without classifying images as exact services.
- Gallery, service, homepage, and booking imagery now uses local public paths only.
- Gallery filters remain service consideration context while showing the shared inspiration library.
- Updated UI labels, disclaimers, captions, and alt text to make representative usage explicit.
- Removed representative imagery from named testimonial portraits and retained initials instead.

## Preserved
- Service categories, descriptions, prices, durations, featured/booking/gallery/status flags.
- Booking links and workflow.
- Gallery masonry and modal UX.
- Existing backend service/gallery image fields and API response compatibility for future real client photos.

## Verification
- 63 backend tests passed.
- 112 frontend tests passed.
- Client production build and ESLint passed.
- 15 local image paths validated.

Applied skill: design-taste-frontend
