# Release Notes

Request: Single source of truth for KareBraids services across Home, Gallery, and Booking.

## User-Facing Changes
- Home featured services, gallery previews, Gallery filters, and Booking service choices now share one service catalog.
- Gallery includes an accessible service filter with All Services and one option per gallery-enabled service.
- Selecting a service filters images; services without images show: “No gallery images available for this service yet.”
- Gallery images lazy-load and have fallback behavior if a source fails.

## Developer Changes
- Added `client/src/data/services.js` with canonical service data and selectors.
- Refactored service/profile compatibility to derive from canonical services.
- Updated Vitest coverage for shared Home services, Gallery filtering/empty state, and Booking service options.

## New Routes/APIs
none

## New Env Vars
none

## Database/Schema Changes
none

## Dependencies Added/Removed
none

## Test Commands Run
- `npm test --prefix client`
- `npm run build --prefix client`

## Known Limitations
- Existing backend contract still receives service name strings, by design for compatibility.

## Follow-up Work
- Decide whether future backend catalog endpoints should be generated from the same source.

## Suggested Commit Message
Implement canonical KareBraids services data source
