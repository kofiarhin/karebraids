# 1. Metadata

- Spec filename: `_spec/2026-05-23-redesign-booking-page-calendar.md`
- Date: 2026-05-23
- Request ID / slug: `redesign-booking-page-calendar`
- Request source: Direct user prompt plus grill-me intake answers, synced to `WORK_REQUEST.md`
- Execution mode: `complete-workflow`
- Request classification: `feature`
- Scope level: `medium`
- Risk level: `medium`

# 2. Original Request

- Raw user request: "lets redesign the  booking page. also i dont want date to be manually typed."
- Normalized request: Redesign the KareBraids booking page into a premium salon concierge booking flow while preserving the existing brand palette and API behavior. Replace the typed/native date input with a click-only in-page calendar grid that stores and submits dates as `YYYY-MM-DD`.
- Source prompt / WORK_REQUEST reference: Latest direct prompt and `WORK_REQUEST.md`

# 3. Questions And Answers

- Questions asked:
  - Should the booking date step use a custom in-page calendar/date picker where users only click available dates, with past dates and Sundays disabled?
  - Should the booking page stay within the current warm KareBraids visual system, or introduce a premium "salon concierge" layout?
- Answers received:
  - Yes. Replace the native date input with a selectable calendar grid, keep the stored value as `YYYY-MM-DD`, disable manual typing entirely, and preserve the existing availability API flow.
  - Use the premium "salon concierge" layout while preserving the existing brand palette. Include a more guided workspace, stronger live summary panel, clearer step states, larger touch targets, and a polished calendar grid.
- Questions skipped: No further questions asked because remaining details can be safely documented as assumptions.
- Remaining open questions: Whether calendar month navigation should allow only a near-term booking window or unlimited future months. Assumption: allow current and future months with past dates disabled, without adding backend constraints.

# 4. Problem Definition

- Problem being solved: The current booking page is functional but form-like, and its native date input can allow manual date typing in many browsers.
- Why it matters: Customers should have a guided appointment flow that feels trustworthy, reduces invalid input, and matches the premium salon service.
- Current pain point: Date entry is not fully controlled by the UI, and the page lacks a strong live summary or concierge-style progression.
- Expected value: A clearer booking experience, fewer invalid date inputs, and a more polished booking page without changing backend contracts.

# 5. Current State Analysis

- Existing behavior: `client/src/pages/Booking.jsx` renders a multi-step service/date/time/details/confirmation flow. Date is selected through `<input type="date">`, validated client-side, and used by `useAvailability`.
- Existing architecture/components: React 19 with Vite, React Router, TanStack Query hooks, shared `api` client in `client/src/lib/api.js`, service layer in `client/src/services/bookingService.js`, CSS in `client/src/index.css`.
- Existing files/modules likely involved:
  - `client/src/pages/Booking.jsx`
  - `client/src/index.css`
  - `client/test/booking-flow.test.jsx`
  - Possibly a new focused component under `client/src/components/` if useful for the calendar.
- Existing data flow: Service and date are stored in local component state. `useAvailability(service, date, enabled)` fetches slots from `/bookings/availability`. `useCreateBooking` submits the form payload.
- Existing API/UI/CLI/workflow behavior: Frontend service calls already use the shared API client and `VITE_API_URL`; no hard-coded API URL was found in the booking service.
- Existing tests or verification coverage: `client/test/booking-flow.test.jsx` covers Sunday prevention, successful submission, booked-slot API error, and no-slots empty state using typed date input interactions.

# 6. Desired End State

- Expected final behavior: Booking remains a multi-step flow, but the page presents as a premium guided salon concierge. The date step uses a click-only calendar grid and never exposes a manually typed date input.
- User-facing outcome: Customers can clearly see progress, selected service/date/time details, disabled dates, available times, and confirmation in a polished responsive interface.
- Developer-facing outcome: Existing API contracts remain stable; tests are updated to interact with the calendar instead of typing dates.
- System/workflow outcome: Spec approval gates implementation; a task plan will be generated only after approval.
- Backward compatibility expectations: Existing backend booking and availability endpoints continue receiving the same `service` and `date` values.

# 7. Scope

- In scope:
  - Redesign `Booking` page layout and supporting booking-specific CSS.
  - Add a click-only calendar grid for date selection.
  - Disable past dates and Sundays in the calendar UI.
  - Preserve existing date validation before time lookup.
  - Add or update frontend tests for the calendar-driven booking flow.
  - Preserve loading, empty, error, and confirmation states with improved presentation.
- Out of scope:
  - Backend route/controller/model changes.
  - Database changes.
  - Deployment changes.
  - Full-site redesign.
  - Payment collection, auth, admin management, and real-time schedule editing.
- Non-goals:
  - Replacing TanStack Query, routing, or shared API patterns.
  - Introducing a third-party date picker unless implementation proves the built-in approach is too risky.
- Explicit boundaries:
  - Keep API payload shape unchanged.
  - Keep date string format as `YYYY-MM-DD`.
  - Do not hard-code API URLs or environment-specific behavior.

# 8. Users And Use Cases

- Primary users: Customers booking KareBraids appointments.
- Secondary users: KareBraids owner/staff reviewing booking requests through existing backend/admin processes outside this task.
- Main use cases:
  - Select a braid service.
  - Pick an appointment date from a calendar.
  - Pick an available appointment time.
  - Enter contact/location details and submit a booking request.
- Edge use cases:
  - User attempts to continue without a date.
  - User selects or lands on a month with Sundays and past dates.
  - Availability returns no slots.
  - Booking submission returns an API error.

# 9. Functional Requirements

- Required behaviors:
  - Calendar dates are selected through buttons or equivalent interactive elements, not a text/date input.
  - Past dates are disabled.
  - Sundays are disabled and cannot advance to time selection.
  - Selected date is stored as `YYYY-MM-DD`.
  - Existing `useAvailability` call remains enabled only when the time step needs availability for selected service/date.
  - Progress and summary UI reflect selected service, date, time, and details as the user advances.
  - Details validation remains at least as strict as current validation.
- Inputs:
  - Service title from existing `services`.
  - Clicked calendar date.
  - Time slot from API response.
  - Customer full name, email, phone, preferred location, optional notes.
- Outputs:
  - Booking request sent through existing `createBooking` service.
  - Confirmation state after successful booking.
  - Inline validation/API errors for invalid or failed states.
- State changes:
  - Local booking form state updates from click/input events.
  - Step state changes through service/date/time/details/confirmation.
  - Calendar visible month state may be local UI state.
- Error states:
  - Missing/invalid date.
  - Sunday or disabled date.
  - Availability API failure.
  - No slots available.
  - Booking creation API failure.
  - Customer detail validation failures.
- Permissions/auth expectations: Not applicable; current booking flow appears public.

# 10. Non-Functional Requirements

- Performance expectations: Calendar rendering should be lightweight and avoid continuous animation or unnecessary rerenders.
- Reliability expectations: Date formatting should be deterministic and not depend on browser text input parsing.
- Security/privacy expectations: Do not expose sensitive data; do not add secrets or hard-coded URLs.
- Accessibility expectations: Calendar controls must be keyboard-focusable, have clear labels, visible focus states, disabled states, and semantic button behavior.
- Maintainability expectations: Keep logic readable and scoped to booking; extract helpers/components only when it improves clarity.
- DX expectations: Tests should clearly describe booking behavior and avoid brittle implementation details where possible.

# 11. Affected Surfaces

- Files likely affected:
  - `client/src/pages/Booking.jsx`
  - `client/src/index.css`
  - `client/test/booking-flow.test.jsx`
  - Possibly `client/src/components/BookingCalendar.jsx` or similar if extraction is warranted.
- Directories likely affected:
  - `client/src/pages/`
  - `client/src/components/` if a new calendar component is created.
  - `client/test/`
- UI surfaces: `/booking` page only.
- API routes: No changes expected.
- Components: Booking page and possibly a new booking calendar component.
- Services: No changes expected.
- Database/schema: No changes expected.
- Config/env vars: No changes expected.
- Tests: Frontend booking flow tests.
- Docs: Workflow artifacts only unless implementation reveals durable project facts.
- Workflow artifacts: `WORK_REQUEST.md`, `_spec/`, `_handoff/current.md`; later `_task/`, `_progress/`, `_review/`, `_release/`, `_summary/` after approval/execution.

# 12. Dependency And Integration Map

- Internal dependencies:
  - `services` from `client/src/constants/content.js`.
  - `useAvailability` from `client/src/hooks/queries/useAvailability.js`.
  - `useCreateBooking` from `client/src/hooks/mutations/useCreateBooking.js`.
  - `getApiErrorMessage` and `api` from `client/src/lib/api.js`.
  - Existing button/link components if useful.
- External packages/services:
  - Existing React, React Router, TanStack Query, Axios, Phosphor Icons.
  - No new packages planned.
- Integration points:
  - `/bookings/availability` remains queried through `getAvailability`.
  - `/bookings` remains posted through `createBooking`.
- Ordering constraints:
  - Update tests first for calendar selection behavior.
  - Implement calendar behavior.
  - Refine layout/styling.
  - Verify tests/build.
- Migration/setup requirements: None expected.

# 13. Data And State Impact

- Data models: No changes.
- Database changes: None.
- State management changes: Local component state only; no Redux required.
- Cache/session/local storage impact: TanStack Query key remains `['booking-availability', service, date]`.
- Backward compatibility impact: Existing backend payload compatibility must be preserved.

# 14. UX / API / Workflow Expectations

- UX expectations:
  - Premium salon concierge booking layout using existing warm palette.
  - Clear step navigation/status, stronger live summary, and larger touch targets.
  - Calendar grid with month navigation, selected-day styling, disabled-day styling, and helper copy.
  - Responsive layout collapses cleanly on mobile.
  - No visible or hidden manual date text field for user entry.
- API contract expectations:
  - `getAvailability({ service, date })` receives the same `YYYY-MM-DD` date string.
  - `createBooking(form)` receives unchanged fields.
- CLI/workflow behavior:
  - Stop after spec for explicit approval.
  - Create task plan only after approval.
  - Execute complete workflow by default after task plan exists.
- Error handling expectations:
  - Keep inline alerts with `role="alert"` for validation/API failures.
  - Empty availability state remains visible and clear.
- Empty/loading/success/failure states:
  - Loading availability uses a polished skeleton or status area.
  - Empty slots state remains user-readable.
  - Confirmation remains visible and linked to gallery.
  - API failure remains visible.

# 15. Execution Strategy

- Recommended implementation approach:
  - Update `booking-flow.test.jsx` to select dates by calendar button names instead of typing into a date input.
  - Add date helper functions for calendar grid generation/formatting inside `Booking.jsx` or a small extracted component.
  - Replace native date input with calendar UI.
  - Redesign booking layout with a concierge-style workspace, progress rail, and live booking summary.
  - Keep CSS in `client/src/index.css` because the repo already uses global CSS alongside Tailwind import.
- Suggested sequencing:
  - Task 1: Add click-only calendar behavior and update tests.
  - Task 2: Redesign booking workspace and states.
  - Task 3: Polish responsive/accessibility details and run final verification.
- Safe rollout/migration approach: Keep the route and API contracts unchanged so this is a frontend-only release.
- Files to inspect before editing:
  - `client/src/pages/Booking.jsx`
  - `client/src/index.css`
  - `client/test/booking-flow.test.jsx`
  - `client/package.json`
- Decisions to avoid until more evidence exists:
  - Adding a third-party date picker dependency.
  - Changing backend availability rules.
  - Moving booking state into Redux.

# 16. Verification Strategy

- Required automated checks:
  - `cd client && npm test`
  - `cd client && npm run build`
- Required manual checks:
  - Open `/booking` locally after implementation and verify the booking page renders, date selection is click-only, disabled dates cannot be selected, and mobile layout is coherent.
- Test types needed:
  - Frontend integration/component flow tests with React Testing Library.
- Build/lint/typecheck expectations:
  - Build should pass. Lint may be run if configured and time permits; if it fails for unrelated existing issues, record the failure.
- Acceptance evidence required:
  - Test updates prove calendar selection replaces typed date entry.
  - Manual check confirms no manual date field exists.
  - Build passes or failure is documented with classification.
- Proof of completion:
  - Passing relevant tests/build and completed workflow artifacts.

# 17. Acceptance Criteria

- [ ] Booking date selection uses a click-only calendar grid with no manually typed/native date input.
- [ ] Selected dates are stored/submitted as `YYYY-MM-DD` and existing availability/booking API calls continue unchanged.
- [ ] Past dates and Sundays are disabled or blocked before appointment times are fetched.
- [ ] Booking page uses a premium salon concierge layout with clearer steps, live summary, larger touch targets, and preserved brand palette.
- [ ] Loading, empty, API error, validation error, and confirmation states remain visible and accessible.
- [ ] Existing booking flow tests are updated for calendar interaction and pass.
- [ ] Frontend build passes or any failure is documented as unrelated/blocking.

# 18. Edge Cases And Failure Modes

- Edge cases:
  - Current day is Sunday.
  - Month starts on different weekdays.
  - User navigates months and returns to selected month.
  - Date selected with no slots.
  - User changes service after choosing a date/time.
  - Small mobile viewport.
- Failure modes:
  - Date is formatted in local time incorrectly.
  - Calendar exposes a text input accidentally.
  - Tests become brittle due to dynamic current date.
  - API query fires before selected date is set.
- Regression risks:
  - Sunday validation breaks.
  - Successful booking submission payload changes.
  - Existing details validation weakens.
  - Responsive styles affect other pages through shared selectors.
- Recovery expectations:
  - Keep changes scoped to booking-specific class names.
  - Add deterministic tests using future static dates.
  - Rerun exact failing command after targeted fixes.

# 19. Risks And Mitigations

- Technical risks:
  - Calendar date math can be off by timezone. Mitigation: use deterministic local date construction and explicit string formatting helpers.
  - Tests based on today's date may be unstable. Mitigation: prefer future static dates or controlled calendar navigation.
- Product/UX risks:
  - Over-redesigning could clash with the rest of the site. Mitigation: preserve existing palette, typography scale, and brand feel.
- Security risks:
  - None expected; no secrets or sensitive data changes.
- Scope risks:
  - User asked for booking page redesign, not a full booking system rebuild. Mitigation: no backend/API/schema changes.
- Mitigation plan:
  - Keep vertical tasks narrow.
  - Verify after each iteration.
  - Stop for approval before planning/implementation.

# 20. Assumptions

- Explicit assumptions:
  - The redesign targets the existing `/booking` page only.
  - Current Monday-Saturday booking rule remains correct.
  - No backend changes are needed for date availability.
  - Existing brand palette remains anchored by `--gold`, `--terracotta`, `--forest`, `--cream`, `--paper`, and related CSS variables.
  - A custom calendar component can be implemented without adding dependencies.
- Confidence level: High for scope and API constraints; medium for exact visual preference beyond the approved "salon concierge" direction.
- What to revisit if assumptions are wrong:
  - If there is a booking window limit, add it to requirements before implementation.
  - If the owner wants Sundays or special blackout dates, backend rules need separate clarification.

# 21. Open Questions

- Blocking questions: None.
- Non-blocking questions:
  - Should the calendar limit bookings to a specific future window, such as 90 days?
  - Should the calendar display fully booked days before date selection? Current API supports date-specific slots only, so this is out of scope unless backend changes are approved.
- Execution impact:
  - Current implementation can proceed after spec approval using assumptions above.

# 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - `TASK-001: Replace typed date entry with calendar date selection`
  - `TASK-002: Redesign booking page into concierge workspace`
  - `TASK-003: Polish accessibility, responsive states, and final verification`
- Suggested first task: Replace typed date entry with calendar date selection because it changes core behavior and test interactions.
- Suggested task ordering: Date behavior first, visual redesign second, polish/final verification third.
- Areas that should not become separate tasks:
  - Backend availability changes.
  - Database changes.
  - Global app redesign.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Each code-changing task must start with a test update where practical, observe the expected failure, implement the smallest passing change, then refine and polish with verification recorded for Build, Refine, and Polish.
