# Active Work Request

## Date
2026-06-08

## Execution Mode
complete-workflow

## Source
Direct user prompt in the current conversation.

## Normalized Request
Refactor KareBraids frontend image handling around a deterministic local representative image library sourced only from existing files in `client/public/images/`. Keep services authoritative only for business and categorization data; do not classify curated images as exact examples of services. Preserve compatibility `image` and `previewImage` fields by deriving them from `getDisplayImage(service.id)`, mark them representative, route gallery helpers through the central library, and treat selected services only as optional UI context. Remove all frontend `https://images.pexels.com/...` usage, service-owned `galleryImages` authority, and exact-service image claims. Update gallery/service/home copy, alt text, titles, and captions to communicate representative inspiration while preserving service categories, pricing, durations, booking links, gallery masonry/modal behavior, and future backend support for real client photos. Inspect backend compatibility but change it only if needed. Add TDD-first coverage and run `npm test`, `npm run test --prefix client`, and `npm run build --prefix client`.

## Required Constraints
- Use only existing files in `client/public/images/` via `/images/<filename>` public paths.
- Do not import or move public images.
- Centralize curated image paths in `client/src/data/imageLibrary.js`.
- Every image object exposes `id`, `src`, `alt`, `title`, `description`, `aspect`, and `usage: "representative"`.
- Export `imageLibrary`, `SERVICE_IMAGE_FALLBACK`, `getDisplayImage(seed)`, and `getGalleryImageItems()`.
- Services retain business fields and derive compatibility image fields from `getDisplayImage(service.id)` with `isRepresentativeImage: true`.
- No curated image is proof of a particular hairstyle or service.
- Do not redesign, remove booking/service categorization, introduce Redux, move API logic into components, or use remote images.

## Intake Result
No blocking questions. The request defines the behavior, scope, exclusions, copy, compatibility boundary, and verification commands. Repository inspection confirms the local assets and affected frontend surfaces.

Applied skill: design-taste-frontend
