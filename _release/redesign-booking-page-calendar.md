# Release Notes: Redesign Booking Page Calendar

- Request: Redesign the booking page and prevent manually typed dates.

## User-Facing Changes

- Booking page now presents a premium guided concierge layout.
- Date selection now uses an in-page calendar grid instead of a manually typed/native date field.
- Past dates and Sundays are unavailable in the calendar.
- The booking summary now updates as customers choose service, date, time, and location.
- Calendar, progress, time, empty, error, and confirmation states received visual polish.

## Developer Changes

- Updated booking flow tests to use calendar interaction.
- Added assertions that availability and booking payloads keep `YYYY-MM-DD` dates.
- Added local calendar/date helpers inside `Booking.jsx`.
- Expanded booking-specific CSS for concierge layout, calendar, responsive behavior, and focus/active states.

## New Routes/APIs

none

## New Env Vars

none

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- `cd client && npm test -- test/booking-flow.test.jsx`
- `cd client && npm test`
- `cd client && npm run build`
- `cd client && npm run lint`
- `cd client && npx playwright screenshot --wait-for-timeout=1000 http://127.0.0.1:5180/booking ...`
- `cd client && npx playwright screenshot --viewport-size=390,844 --wait-for-timeout=1000 http://127.0.0.1:5180/booking ...`

## Known Limitations

- Calendar does not display fully booked days before selecting a date because the current API checks availability per selected date.
- No explicit maximum future booking window was added.

## Follow-Up Work

- Add backend-supported blackout dates or month-level availability if the booking rules become more complex.

## Suggested Commit Message

`feat: redesign booking page with calendar selection`
