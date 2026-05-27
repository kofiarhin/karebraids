# Release Notes

- Request: Homepage Featured services square price row.
- Applied skill: design-taste-frontend

## User-Facing Changes

- The homepage Featured services section now shows all six services as same-size square image tiles.
- Desktop shows the six service tiles horizontally in one row, reducing the height of the services section.
- Each service image now displays a starting price:
  - Knotless Braids: From £80
  - Box Braids: From £70
  - Cornrows: From £35
  - Twists: From £65
  - Stitch Braids: From £45
  - Kids Braids: From £30
- Mobile keeps the service tiles square in a compact two-column layout without page-level horizontal overflow.

## Developer Changes

- Added `fromPrice` to the static `services` content.
- Rendered service price badges and accessible service/price labels in the homepage service tile markup.
- Updated service tile CSS for square sizing, desktop horizontal layout, responsive mobile layout, and dark-theme badge readability.
- Added focused frontend test coverage.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `npm test --prefix client -- site-pages.test.jsx`
- `npm run lint --prefix client`
- `npm test --prefix client`
- `npm run build --prefix client`
- Playwright CLI browser verification against Vite preview.

## Known Limitations

- Starting prices are display-only and are not wired into booking calculations.

## Follow-Up Work

- Optional: add starting prices to the booking service selection if desired.

## Suggested Commit Message

`update homepage service tiles with starting prices`
