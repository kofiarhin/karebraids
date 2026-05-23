# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually.

## Request

Redesign the KareBraids booking page into a premium "salon concierge" booking experience while preserving the existing brand palette and backend availability flow. Replace the manually typed/native date input with a polished in-page selectable calendar grid. Users must choose dates by clicking calendar dates only; the stored and submitted date value must remain `YYYY-MM-DD`.

## Question Preference

`grill-me intake`

## Optional Execution Preference

`complete-workflow`

## Optional Context

- User or business goal: Make the booking page feel more guided, premium, and trustworthy while preventing manually typed date entry.
- Target users: KareBraids customers booking braid appointments.
- Expected behavior: Customers select a service, choose a non-past Monday-Saturday date from a calendar grid, select an available time returned by the existing availability API, enter details, and submit a booking request.
- UI expectations: Premium salon concierge layout, stronger live summary panel, clearer step states, larger touch targets, responsive behavior, accessible labels/focus states, polished loading/empty/error states.
- API expectations: Preserve the existing availability and booking API flow; keep payload shape and date format unchanged.
- Data model expectations: No database or schema changes expected.
- Edge cases: Past dates disabled, Sundays disabled, invalid or missing date blocked, no available slots shown cleanly, API errors remain visible, mobile layout remains usable.
- Constraints: Do not hard-code API URLs, do not change deployment setup, do not add dependencies unless justified, use existing React/Vite/CSS conventions, preserve brand palette.
- Success criteria: Date cannot be manually typed; booking tests cover calendar selection and Sunday prevention; page remains responsive and build/tests pass.
- Preferred verification: `cd client && npm test`, `cd client && npm run build`, and manual browser check if implementation proceeds.
- Dirty worktree notes: Initial `git status --short` was clean before spec generation.
- Release notes expectations: User-facing booking redesign and developer/test changes; no new API/env/schema changes unless implementation discovers otherwise.

## Out Of Scope

- Backend booking API changes.
- Database/schema changes.
- Deployment changes.
- Full-site redesign outside the booking page and shared styles required by the booking page.
- Payment, auth, admin scheduling, or real-time availability changes.
