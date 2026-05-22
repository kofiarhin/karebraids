# Active Work Request

## Request

Implement KareBraids MVP from `project-brief.md` as a multi-page React/Vite frontend and Express/MongoDB backend.

## Normalized Workflow Request

Build a premium Afro-luxury, mobile-first website with Home, About, Gallery, and Booking pages. Include real booking persistence through an Express API backed by MongoDB. The booking flow must validate Monday-Saturday availability, prevent duplicate service/date/time bookings, collect customer details, and show loading, confirmation, and error states.

## Confirmed Decisions

- Booking persistence is in scope for MVP.
- MongoDB-backed Express booking API is required.
- Duplicate bookings for the same service/date/time must be rejected.
- Availability is Monday-Saturday only.
- API calls must go through `client/src/lib/api.js`.
- React services must not hard-code API URLs.

## Out Of Scope

- Payments.
- Ecommerce.
- Customer accounts.
- Admin dashboard or CRM.
- Booking cancellation and rescheduling.
- Live stylist travel-radius pricing.
- Deployment changes.

## Source

- User prompt: `lets implement this project brief project-brief.md`
- Brief: `project-brief.md`
- User clarification: real API/MongoDB booking persistence is required.
