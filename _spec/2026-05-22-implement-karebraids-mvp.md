# Implement KareBraids MVP

## 1. Metadata
- Spec filename: `_spec/2026-05-22-implement-karebraids-mvp.md`
- Date: 2026-05-22
- Request ID / slug: `implement-karebraids-mvp`
- Request source: Latest user prompt plus `project-brief.md`
- Execution mode: `complete-workflow`
- Request classification: `feature`
- Scope level: `large`
- Risk level: `medium`

## 2. Original Request
- Raw user request: `lets implement this project brief project-brief.md`
- Normalized request: Build the KareBraids MVP as a multi-page React/Vite frontend and Express/MongoDB backend with persisted bookings, Monday-Saturday availability validation, duplicate slot prevention, gallery modal interactions, shared frontend API client, environment examples, and tests/verification.
- Source prompt / WORK_REQUEST reference: `WORK_REQUEST.md`

## 3. Questions And Answers
- Questions asked: Should the MVP booking flow create real bookings through the backend and MongoDB now, or should it be a polished front-end booking prototype with confirmation only?
- Answers received: Real API booking persistence is required, including Monday-Saturday validation, MongoDB storage, duplicate service/date/time prevention, and confirmation/error states.
- Questions skipped: Visual asset sourcing and admin tooling details were not asked because they can be handled as non-blocking MVP assumptions.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: The repo is currently a minimal scaffold and does not implement the KareBraids product brief.
- Why it matters: The business needs a booking-first premium MVP that can convert clients and prove the salon/mobile service workflow.
- Current pain point: There is no customer-facing website, gallery experience, or real booking API.
- Expected value: Users can learn about KareBraids, inspect braid styles, and submit a real booking request.

## 5. Current State Analysis
- Existing behavior: `client/src/App.jsx` renders only `App`; Express root route returns `{ message: "welcome to karebraids" }`.
- Existing architecture/components: Minimal Vite React app and flat Express app/server files.
- Existing files/modules likely involved: `client/src/App.jsx`, `client/src/main.jsx`, `client/src/index.css`, `server/app.js`, `server/server.js`, package files, new frontend/backend feature directories.
- Existing data flow: None beyond a root Express health response.
- Existing API/UI/CLI/workflow behavior: Root `npm run dev` starts server and client; client build/lint scripts exist; backend has no tests or lint script.
- Existing tests or verification coverage: No frontend or backend tests are configured.

## 6. Desired End State
- Expected final behavior: A multi-page MVP with Home, About, Gallery, and Booking pages plus a booking API that stores validated bookings in MongoDB.
- User-facing outcome: Visitors can navigate the site, view premium service messaging, open gallery images, and complete a booking flow with confirmation or clear errors.
- Developer-facing outcome: Booking API, shared client API utility, service layer, and tests are organized in the project structure.
- System/workflow outcome: Required workflow artifacts document implementation and verification.
- Backward compatibility expectations: No existing production behavior needs preserving beyond keeping the root API health response available.

## 7. Scope
- In scope: React routes/pages, responsive styling, gallery modal, booking flow, booking service/API/model, env examples, validation, duplicate prevention, tests, verification.
- Out of scope: Payments, ecommerce, admin dashboard, CRM, user accounts, cancellations, rescheduling, deployment changes, live travel-radius pricing.
- Non-goals: Build a full CMS or real staff calendar.
- Explicit boundaries: Do not change deployment configuration; do not add secrets; do not hard-code frontend API URLs.

## 8. Users And Use Cases
- Primary users: UK-based African women, primarily London, ages 18-45, looking for salon or mobile braiding.
- Secondary users: Karen/team reviewing incoming bookings in the database.
- Main use cases: Learn about services, assess trust and craftsmanship, browse braid styles, submit booking details.
- Edge use cases: Empty/no unavailable slots, image load failure, Sunday selection, duplicate booking slot, API/network failure.

## 9. Functional Requirements
- Required behaviors: Multi-page navigation; premium Home/About/Gallery/Booking content; gallery modal close via X/backdrop/ESC; booking stepper; Monday-Saturday date validation; available slot fetch; booking submit; duplicate rejection.
- Inputs: Selected service, date, time, full name, email, phone, preferred location, notes.
- Outputs: Booking confirmation with customer/service/date/time summary; validation errors; duplicate slot errors.
- State changes: Booking records persist in MongoDB; frontend form state changes across steps.
- Error states: Missing required fields, invalid email/phone/date/time, Sunday selection, duplicate slot, API failure, no slots.
- Permissions/auth expectations: Public unauthenticated booking endpoint for MVP.

## 10. Non-Functional Requirements
- Performance expectations: Mobile-first layout, lazy gallery images, no expensive scroll listeners, optimized build.
- Reliability expectations: Backend validates data and duplicate slots independently of the client.
- Security/privacy expectations: Do not expose secrets; do not return sensitive internal details; validate API input.
- Accessibility expectations: Semantic navigation, form labels, focus states, modal keyboard handling, readable contrast.
- Maintainability expectations: Keep API logic in services/lib, backend routes/controllers/models separated, avoid unnecessary global state.
- DX expectations: Clear scripts, env examples, focused tests.

## 11. Affected Surfaces
- Files likely affected: `client/package.json`, `client/src/App.jsx`, `client/src/main.jsx`, `client/src/index.css`, `server/app.js`, `server/server.js`, root `package.json`, env examples, new test files.
- Directories likely affected: `client/src/components/`, `client/src/pages/`, `client/src/routes/`, `client/src/services/`, `client/src/lib/`, `server/config/`, `server/controllers/`, `server/models/`, `server/routes/`, `server/tests/`.
- UI surfaces: Site nav, Home, About, Gallery, Booking, Footer, modal, form states.
- API routes: `GET /api/health`, `GET /api/bookings/availability`, `POST /api/bookings`.
- Components: Layout/navigation, button/form controls, gallery modal, booking stepper.
- Services: Frontend booking service and shared API client.
- Database/schema: Booking Mongoose model with unique compound index for service/date/time.
- Config/env vars: Backend `MONGODB_URI`; frontend `VITE_API_URL`.
- Tests: Backend Jest/Supertest tests for booking validation/duplicates; frontend Vitest/RTL tests for route rendering, gallery modal, booking validation/API states.
- Docs: Workflow artifacts, `.env.example`, `client/.env.example`, project context.
- Workflow artifacts: `WORK_REQUEST.md`, `_spec/`, `_task/`, `_progress/`, `_handoff/`, `_review/`, `_release/`, `_summary/`.

## 12. Dependency And Integration Map
- Internal dependencies: Frontend booking page depends on services/API client; backend routes depend on controller/model/database config.
- External packages/services: `react-router-dom`, `@tanstack/react-query`, `axios`, Tailwind CSS tooling, Vitest/RTL, Jest/Supertest, MongoDB/Mongoose.
- Integration points: Client `VITE_API_URL` to Express `/api`; Express to MongoDB through `MONGODB_URI`.
- Ordering constraints: Install/configure dependencies and tests before feature implementation; backend API contract should be implemented before wiring frontend submission.
- Migration/setup requirements: Add env examples and backend fail-fast config; no data migration needed.

## 13. Data And State Impact
- Data models: Booking fields: service, date, time, fullName, email, phone, preferredLocation, notes, status, createdAt/updatedAt.
- Database changes: New `bookings` collection and unique index on service/date/time.
- State management changes: Use local React state for booking stepper; TanStack Query for booking API calls.
- Cache/session/local storage impact: None required.
- Backward compatibility impact: None; this is an initial MVP.

## 14. UX / API / Workflow Expectations
- UX expectations: Warm, premium, feminine, mobile-first, conversion-focused; avoid generic Vite scaffold styling; include clear loading/empty/error/success states.
- API contract expectations: JSON API with consistent success/error responses; backend validates all booking rules.
- CLI/workflow behavior: Existing dev scripts should still work; test scripts should exist for client and server.
- Error handling expectations: User-readable frontend errors; backend returns appropriate 400/409/500 classes.
- Empty/loading/success/failure states: Required on gallery and booking submit/availability surfaces.

## 15. Execution Strategy
- Recommended implementation approach: Add test tooling and dependency foundation, implement backend booking API with tests, then implement frontend pages and booking flow with service hooks, then polish and verify.
- Suggested sequencing: Foundation -> backend booking API -> frontend routes/pages/gallery -> frontend booking integration -> final polish/artifacts.
- Safe rollout/migration approach: Add new code paths without destructive operations; preserve root health response.
- Files to inspect before editing: package files, `client/src/*`, `server/*`, env/docs/workflow files.
- Decisions to avoid until more evidence exists: Do not introduce payments/admin/auth or deployment changes.

## 16. Verification Strategy
- Required automated checks: `npm test --prefix server`, `npm test --prefix client`, `npm run build --prefix client`.
- Required manual checks: Run app locally and confirm primary navigation, gallery modal, and booking states if server/MongoDB are available.
- Test types needed: Backend route/model integration tests; frontend component tests for key UI interactions.
- Build/lint/typecheck expectations: Client build should pass; lint should pass or any pre-existing tooling issue documented.
- Acceptance evidence required: Passing tests/build and documented manual/API checks.
- Proof of completion: Workflow progress, review, release notes, summary, and final artifact checklist.

## 17. Acceptance Criteria
- [ ] Home, About, Gallery, and Booking pages render through React Router with responsive KareBraids branding.
- [ ] Gallery modal opens with image title/description and closes via X, backdrop click, and ESC.
- [ ] Booking flow validates required service/date/time/customer details and prevents Sunday selection.
- [ ] Express booking API persists valid bookings to MongoDB.
- [ ] Express booking API rejects duplicate service/date/time bookings with a conflict response.
- [ ] Frontend submits bookings through `client/src/lib/api.js` and service files, without hard-coded component API URLs.
- [ ] Frontend shows loading, success confirmation, and validation/API error states.
- [ ] `.env.example` files document required backend and frontend variables, and backend fails fast on missing required MongoDB config outside tests.
- [ ] Relevant tests and build verification are run or documented.

## 18. Edge Cases And Failure Modes
- Edge cases: Sunday date, past date, no slots, duplicate slot, missing location, long notes, invalid email/phone, image load failure.
- Failure modes: MongoDB unavailable, API network error, unique index race conflict, frontend env missing.
- Regression risks: Breaking Vite build, over-broad CSS, hard-coded URLs, unhandled modal focus/keyboard behavior.
- Recovery expectations: Show clear error messages and keep user input available for correction.

## 19. Risks And Mitigations
- Technical risks: Broad initial implementation and missing test setup; mitigate by adding focused tests first.
- Product/UX risks: Placeholder visuals may not fully represent salon quality; mitigate with replaceable content structures.
- Security risks: Public booking endpoint can be spammed; note as post-MVP rate-limiting follow-up.
- Scope risks: Brief includes future ecommerce/CRM; explicitly keep out of scope.
- Mitigation plan: Vertical tasks, narrow acceptance criteria, no deployment/auth/payment expansion.

## 20. Assumptions
- Explicit assumptions: Fixed appointment times are acceptable; one booking per service/date/time is sufficient duplicate logic; real image assets can be replaced later; local dev uses npm.
- Confidence level: Medium-high.
- What to revisit if assumptions are wrong: Availability model, staff/resource scheduling, asset sourcing, mobile-service surcharge rules.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Preferred real gallery images; exact salon location; business contact info; production MongoDB URI.
- Execution impact: Use placeholder-safe content and env examples until real assets/details are available.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: Foundation/test/env setup; backend booking API; frontend site shell/pages/gallery; frontend booking integration; final verification/artifacts.
- Suggested first task: Add project foundation dependencies, env examples, and test scaffolding.
- Suggested task ordering: Foundation first, backend second, frontend pages third, booking integration fourth, final review fifth.
- Areas that should not become separate tasks: Future ecommerce/admin/payment features.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each code task writes tests first where practical, implements minimal passing behavior, refines edge cases/accessibility, then polishes naming, structure, and verification.
