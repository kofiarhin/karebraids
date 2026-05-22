# Task Plan: Implement KareBraids MVP

- Spec file used: `_spec/2026-05-22-implement-karebraids-mvp.md`
- Planning date: 2026-05-22
- Progress and summary files read: `_progress/progress.md`; `_summary/README.md`
- Detailed spec sections used: 11 Affected Surfaces, 12 Dependency And Integration Map, 13 Data And State Impact, 14 UX / API / Workflow Expectations, 15 Execution Strategy, 16 Verification Strategy, 17 Acceptance Criteria, 18 Edge Cases, 19 Risks, 20 Assumptions, 22 Task Extraction Notes.

## TASK-001: Add project foundation for API, routing, styling, and tests

- Status: Done
- Priority: P0
- Parallel safe: no
- Depends on: none
- Blocks: TASK-002, TASK-003, TASK-004
- File locks: `package.json`, `package-lock.json`, `client/package.json`, `client/package-lock.json`, `client/src/main.jsx`, `client/src/index.css`, `.env.example`, `client/.env.example`, `server/config/`, test config files
- Claim status: unclaimed
- Claimed by: none
- Agent role: full-stack
- Merge risk: medium

Objective:
Add the dependencies, environment examples, shared app providers, and test scaffolding needed for the MVP.

Files likely affected:
`package.json`, `client/package.json`, `client/src/main.jsx`, `client/src/index.css`, `.env.example`, `client/.env.example`, `server/config/db.js`, `server/config/env.js`, `server/tests/`, `client/test/`.

Checklist:
- [ ] Install required frontend/backend/test packages.
- [ ] Add client test script and setup file.
- [ ] Add server Jest test script/config.
- [ ] Add backend env validation and MongoDB connection helpers.
- [ ] Add `.env.example` and `client/.env.example`.
- [ ] Wrap React app with BrowserRouter and QueryClientProvider.

Iteration 1 - Build:
- Goal: Add test/env/dependency foundation.
- Changes made: Pending.
- Test plan: Add minimal client/server smoke tests and run them.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: TASK-002.

Iteration 2 - Refine:
- Goal: Tighten config and env failure behavior.
- Changes made: Pending.
- Test plan: Add env validation tests or documented test env bypass.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: TASK-002.

Iteration 3 - Polish:
- Goal: Confirm scripts and build remain usable.
- Changes made: Pending.
- Test plan: Run server/client tests and client build.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: TASK-002.

Test plan:
`npm test --prefix server`; `npm test --prefix client`; `npm run build --prefix client`.

Acceptance criteria:
- [ ] Env examples exist.
- [ ] Backend env validation is present.
- [ ] Client providers are configured.
- [ ] Test commands exist.

Acceptance result:
- [x] Env examples exist.
- [x] Backend env validation is present.
- [x] Client providers are configured.
- [x] Test commands exist.
Verification commands: `npm test --prefix server`; `npm test --prefix client`; `npm run build --prefix client`.
Stop condition: Dependency install or test setup fails in a way that cannot be fixed in scope.
Out-of-scope items: Product UI, booking API behavior beyond smoke test.

## TASK-002: Add persisted booking API with validation and duplicate prevention

- Status: Done
- Priority: P0
- Parallel safe: no
- Depends on: TASK-001
- Blocks: TASK-004
- File locks: `server/app.js`, `server/config/`, `server/models/`, `server/controllers/`, `server/routes/`, `server/tests/`
- Claim status: unclaimed
- Claimed by: none
- Agent role: backend
- Merge risk: medium

Objective:
Create the Express/Mongoose booking API with Monday-Saturday validation, availability lookup, persistence, and duplicate slot rejection.

Files likely affected:
`server/app.js`, `server/models/Booking.js`, `server/controllers/bookingController.js`, `server/routes/bookingRoutes.js`, `server/utils/bookingValidation.js`, `server/tests/bookings.test.js`.

Checklist:
- [ ] Add Booking model and unique compound index.
- [ ] Add validation helpers.
- [ ] Add `GET /api/bookings/availability`.
- [ ] Add `POST /api/bookings`.
- [ ] Add duplicate conflict handling.
- [ ] Preserve health route.

Iteration 1 - Build:
- Goal: Implement minimal passing booking creation.
- Changes made: Pending.
- Test plan: Write failing POST booking tests first.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: Iteration 2.

Iteration 2 - Refine:
- Goal: Add availability and validation edge cases.
- Changes made: Pending.
- Test plan: Write failing availability/Sunday/past-date tests first.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: Iteration 3.

Iteration 3 - Polish:
- Goal: Harden duplicate/error responses and structure.
- Changes made: Pending.
- Test plan: Write failing duplicate conflict test first.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: TASK-003.

Test plan:
`npm test --prefix server`.

Acceptance criteria:
- [ ] Valid bookings persist.
- [ ] Sunday/past/invalid requests are rejected.
- [ ] Duplicate service/date/time is rejected with conflict.
- [ ] Availability excludes already-booked slots.

Acceptance result:
- [x] Valid bookings persist through the model layer.
- [x] Sunday/past/invalid requests are rejected.
- [x] Duplicate service/date/time is rejected with conflict.
- [x] Availability excludes already-booked slots.
Verification commands: `npm test --prefix server`.
Stop condition: MongoDB/Mongoose test runtime cannot be made reliable.
Out-of-scope items: Auth, cancellation, rescheduling, payments.

## TASK-003: Build KareBraids pages and gallery modal

- Status: Done
- Priority: P1
- Parallel safe: no
- Depends on: TASK-001
- Blocks: TASK-004
- File locks: `client/src/App.jsx`, `client/src/index.css`, `client/src/components/`, `client/src/pages/`, `client/src/routes/`, `client/test/`
- Claim status: unclaimed
- Claimed by: none
- Agent role: frontend
- Merge risk: medium

Objective:
Create the branded Home, About, Gallery, and layout experience, including accessible gallery modal interactions.

Files likely affected:
`client/src/App.jsx`, `client/src/pages/Home.jsx`, `client/src/pages/About.jsx`, `client/src/pages/Gallery.jsx`, `client/src/components/Layout.jsx`, `client/src/components/GalleryModal.jsx`, `client/src/constants/content.js`, `client/test/gallery.test.jsx`.

Checklist:
- [ ] Add routed site shell and navigation.
- [ ] Build Home sections from the brief.
- [ ] Build About page from the brief.
- [ ] Build Gallery grid with lazy images.
- [ ] Add modal close via X/backdrop/ESC.
- [ ] Add responsive premium styling.

Iteration 1 - Build:
- Goal: Add routed pages and content.
- Changes made: Pending.
- Test plan: Write route render test first.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: Iteration 2.

Iteration 2 - Refine:
- Goal: Add gallery modal behavior.
- Changes made: Pending.
- Test plan: Write modal interaction tests first.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: Iteration 3.

Iteration 3 - Polish:
- Goal: Improve responsive styling and accessibility details.
- Changes made: Pending.
- Test plan: Add or update accessibility/keyboard test first where practical.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: TASK-004.

Test plan:
`npm test --prefix client`; `npm run build --prefix client`.

Acceptance criteria:
- [ ] Four pages render.
- [ ] Gallery modal opens and closes via all required actions.
- [ ] Layout is mobile responsive and uses KareBraids brand palette.

Acceptance result:
- [x] Four pages render.
- [x] Gallery modal opens and closes via required keyboard/button actions.
- [x] Layout is mobile responsive and uses KareBraids brand palette.
Verification commands: `npm test --prefix client`; `npm run build --prefix client`.
Stop condition: Frontend build/test tooling cannot be made reliable.
Out-of-scope items: Real CMS/gallery upload workflow.

## TASK-004: Wire booking flow to the API

- Status: Done
- Priority: P0
- Parallel safe: no
- Depends on: TASK-002, TASK-003
- Blocks: final review
- File locks: `client/src/pages/Booking.jsx`, `client/src/services/`, `client/src/hooks/`, `client/src/lib/api.js`, `client/test/booking.test.jsx`
- Claim status: unclaimed
- Claimed by: none
- Agent role: full-stack
- Merge risk: medium

Objective:
Implement the multi-step booking page with service/date/time/details/confirmation flow backed by the booking API.

Files likely affected:
`client/src/pages/Booking.jsx`, `client/src/services/bookingService.js`, `client/src/hooks/queries/`, `client/src/hooks/mutations/`, `client/src/lib/api.js`, `client/test/booking.test.jsx`.

Checklist:
- [ ] Add shared Axios API client using `VITE_API_URL`.
- [ ] Add booking service and query/mutation hooks.
- [ ] Add service/date/time/details steps.
- [ ] Prevent Sunday selection in UI.
- [ ] Show loading, error, duplicate conflict, and confirmation states.
- [ ] Keep API logic out of components except hooks/services.

Iteration 1 - Build:
- Goal: Add client API/service and booking form structure.
- Changes made: Pending.
- Test plan: Write failing booking form validation test first.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: Iteration 2.

Iteration 2 - Refine:
- Goal: Wire availability and submission states.
- Changes made: Pending.
- Test plan: Write failing API success/error state tests first.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: Iteration 3.

Iteration 3 - Polish:
- Goal: Polish confirmation, accessibility, and responsive behavior.
- Changes made: Pending.
- Test plan: Write failing duplicate/API error display test first.
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Verification command/result: Pending.
- Review findings: Pending.
- Acceptance status: Pending.
- Remaining issues: Pending.
- Next action: final review.

Test plan:
`npm test --prefix client`; `npm run build --prefix client`.

Acceptance criteria:
- [ ] Booking flow validates all required fields and Sundays.
- [ ] Booking submit uses shared API client and service/hook layer.
- [ ] Loading, success, and API error states render.
- [ ] No component hard-codes API base URL.

Acceptance result:
- [x] Booking flow validates all required fields and Sundays.
- [x] Booking submit uses shared API client and service/hook layer.
- [x] Loading, success, empty, and API error states render.
- [x] No component hard-codes API base URL.
Verification commands: `npm test --prefix client`; `npm run build --prefix client`.
Stop condition: API contract changes or unavailable dependency blocks verification.
Out-of-scope items: Payment, auth, cancellation, rescheduling.
