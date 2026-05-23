# Task Plan: Redesign Booking Page Calendar

- Spec file used: `_spec/2026-05-23-redesign-booking-page-calendar.md`
- Planning date: 2026-05-23
- Progress and summary files read:
  - `_progress/progress.md`
  - `_summary/README.md`
  - `_handoff/current.md`
- Explicit spec approval: User replied `approve spec`
- Execution mode: `complete-workflow`

## Spec Sections Used

- Section 6 Desired End State: booking page becomes a premium guided salon concierge flow while preserving API compatibility.
- Section 7 Scope: booking page, calendar UI, disabled past/Sunday dates, frontend tests, and booking states are in scope.
- Section 11 Affected Surfaces: `client/src/pages/Booking.jsx`, `client/src/index.css`, `client/test/booking-flow.test.jsx`, and workflow artifacts.
- Section 12 Dependency And Integration Map: keep existing React, TanStack Query, services, and Phosphor Icons; no new packages planned.
- Section 13 Data And State Impact: local component state only; date string remains `YYYY-MM-DD`.
- Section 14 UX/API/Workflow Expectations: click-only calendar, stronger live summary, clearer steps, larger touch targets, preserved API contracts.
- Section 16 Verification Strategy: run `cd client && npm test`, `cd client && npm run build`, and a manual local UI check if implementation proceeds.
- Section 17 Acceptance Criteria: seven concrete criteria covering date input removal, API compatibility, disabled dates, layout, states, tests, and build.
- Section 18 Edge Cases And Failure Modes: Sunday/current-day/month navigation/timezone/test brittleness risks.
- Section 19 Risks And Mitigations: avoid dependency addition, use deterministic date helpers, preserve booking-specific CSS scope.
- Section 22 Task Extraction Notes: date behavior first, visual redesign second, polish/final verification third.

## Task List

### TASK-001: Redesign booking page with click-only calendar

- Status: `Done`
- Objective: Replace manually typed date entry with a selectable calendar grid and redesign `/booking` into a premium salon concierge workspace while preserving existing availability and booking API behavior.
- Files likely affected:
  - `client/src/pages/Booking.jsx`
  - `client/src/index.css`
  - `client/test/booking-flow.test.jsx`
  - `_progress/progress.md`
  - `_handoff/current.md`
  - `_review/2026-05-23-redesign-booking-page-calendar.md`
  - `_release/redesign-booking-page-calendar.md`
  - `_summary/2026-05-23-redesign-booking-page-calendar.md`
- Checklist:
  - [x] Update booking tests to use calendar buttons instead of typing into a date input.
  - [x] Observe expected Red failure before implementation.
  - [x] Add click-only calendar grid with month navigation and disabled dates.
  - [x] Preserve `YYYY-MM-DD` date values for availability and booking submissions.
  - [x] Redesign booking workspace, progress, summary, states, and responsive styles.
  - [x] Verify tests and build.
  - [x] Record progress, review, release notes, summary, and handoff.

#### Iteration 1 - Build

- Goal: Prove and implement the click-only date selection behavior.
- Changes made: Updated booking-flow tests first, implemented calendar helpers/UI, replaced native date input, added live summary and initial concierge layout.
- Test plan: Update `client/test/booking-flow.test.jsx` to assert no date textbox/date input is used and select dates by accessible calendar buttons.
- Red phase evidence: `npm test -- test/booking-flow.test.jsx` failed after test update because the native date input still existed and calendar date buttons were missing.
- Green phase evidence: `npm test -- test/booking-flow.test.jsx` passed after implementing calendar selection.
- Refactor phase evidence: Added local date display formatting and explicit API payload assertions; adjusted one assertion for TanStack mutation context; rerun passed.
- Test commands run: `npm test -- test/booking-flow.test.jsx`
- Verification command/result: Passed, 4 tests.
- Review findings: No behavior regression found; API payload remains `YYYY-MM-DD`.
- Acceptance status: Calendar/date API criteria met.
- Remaining issues: Visual/responsive polish still needed at this iteration.
- Next action: Refine concierge layout and responsive styling.

#### Iteration 2 - Refine

- Goal: Apply the premium salon concierge layout and state presentation while keeping behavior stable.
- Changes made: Refined booking workspace, progress rail, request summary, calendar styling, active/focus states, and mobile collapse.
- Test plan: Re-run booking tests after layout/CSS changes; inspect component for API and state regressions.
- Red phase evidence: No new behavioral Red test added; existing calendar tests were already the behavior guard. Missing-test exception: changes were CSS/layout/accessibility refinements with no new business behavior.
- Green phase evidence: `npm test -- test/booking-flow.test.jsx` passed after refinement.
- Refactor phase evidence: Removed overly instructional visible copy, added `aria-current="date"`, and kept interaction state styles scoped to booking controls.
- Test commands run: `npm test -- test/booking-flow.test.jsx`
- Verification command/result: Passed, 4 tests.
- Review findings: No API/state regressions found; responsive CSS now collapses summary and slot grids on small viewports.
- Acceptance status: Concierge layout and state-presentation criteria met.
- Remaining issues: Full test/build/lint and browser render check still needed.
- Next action: Run final verification and visual checks.

#### Iteration 3 - Polish

- Goal: Harden accessibility, responsive behavior, and final verification.
- Changes made: Ran full verification, captured desktop and mobile Playwright screenshots from a strict fresh Vite dev server, and audited final diff.
- Test plan: Run full frontend tests and frontend build; use a local browser/manual check if feasible.
- Red phase evidence: No new behavioral Red test added; polish was verification and visual QA only. Missing-test exception: no implementation behavior changed in this pass.
- Green phase evidence: `npm test`, `npm run build`, and `npm run lint` passed.
- Refactor phase evidence: Visual QA found port 5173 served an older Vite instance, so a strict fresh server on 5180 was used; desktop and mobile screenshots rendered coherently.
- Test commands run: `npm test`, `npm run build`, `npm run lint`, `npx playwright screenshot ...`
- Verification command/result: All automated checks passed; Playwright screenshots captured at desktop and 390px mobile widths.
- Review findings: Diff matches saved spec; no unrelated implementation files, secrets, API changes, schema changes, or deployment changes found.
- Acceptance status: All criteria met.
- Remaining issues: None.
- Next action: Final artifacts and handoff.

#### Acceptance Criteria

- [x] Booking date selection uses a click-only calendar grid with no manually typed/native date input.
- [x] Selected dates are stored/submitted as `YYYY-MM-DD` and existing availability/booking API calls continue unchanged.
- [x] Past dates and Sundays are disabled or blocked before appointment times are fetched.
- [x] Booking page uses a premium salon concierge layout with clearer steps, live summary, larger touch targets, and preserved brand palette.
- [x] Loading, empty, API error, validation error, and confirmation states remain visible and accessible.
- [x] Existing booking flow tests are updated for calendar interaction and pass.
- [x] Frontend build passes or any failure is documented as unrelated/blocking.

#### Verification Commands

- `cd client && npm test`
- `cd client && npm run build`

#### Stop Condition

Stop with `Needs Human Review` if updated tests or build cannot pass after in-scope fixes, if implementation requires backend/API changes, or if dirty worktree overlap appears in files needed for this task.

#### Out-of-Scope Items

- Backend booking API changes.
- Database/schema changes.
- Deployment changes.
- Full-site redesign.
- Payment, auth, admin scheduling, or real-time availability changes.
