# Release Notes: Gallery Filtering And Modal Navigation

Date: 2026-06-11

## Request

Fix Gallery service filtering by using backend data and add accessible cyclic modal previous/next navigation.

## User-Facing Changes

- Service filters now show only backend Gallery items for the selected service.
- Modal previous/next controls wrap within the active filtered result set.
- ArrowLeft, ArrowRight, Escape, filter reset, and opening-card focus restoration work.
- Controls are visible on desktop and touch-usable on mobile.

## Developer Changes

- `getGalleryItems()` calls `/gallery` with normalized query parameters.
- Modal selection is index-based and its state mechanics live in `useGalleryModal`.
- The backdrop is portaled to `document.body` to preserve fixed positioning under GSAP transforms.
- Added service, query, modal, keyboard, focus, portal, and CSS regression coverage.

## New Routes/APIs

None. Uses the existing `GET /gallery?service=<slug-or-id>` contract.

## New Environment Variables

None.

## Database/Schema Changes

None.

## Dependencies Added/Removed

None.

## Test Commands Run

- `npm run test --prefix client`
- `npm run test`
- `npm run lint --prefix client`
- `npm run build --prefix client`
- Focused Gallery suites and Playwright browser smoke checks
- Fallow audit with JSON, quiet, and explain flags

## Known Limitations

Vite retains the existing non-blocking >500 kB chunk warning. Production Gallery content depends on the target database.

## Follow-Up Work

None required for this request.

## Quality

Fallow verdict: PASSED.

## Suggested Commit Message

`fix gallery filtering and modal navigation`
