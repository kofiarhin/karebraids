# Admin Dashboard Booking CRUD Spec

## 1. Metadata
- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-05-25
- Request ID / slug: admin-dashboard-booking-crud
- Request source: Latest direct user prompt plus grill-me intake answers.
- Execution mode: complete-workflow after explicit spec approval.
- Request classification: feature
- Scope level: large
- Risk level: high

## 2. Original Request
- Raw user request: "lets add admin dashboard where admin has full crud functionality"
- Normalized request: Add a hidden `/admin` dashboard with JWT-protected admin login and full CRUD for bookings only.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers
- Questions asked:
  - Should the admin dashboard be protected with a real login, or temporary unprotected internal page?
  - Should "full CRUD" apply only to appointment bookings, or should the admin also manage services/gallery content?
  - For booking status, should current statuses stay or should cancellation/completion states be added?
  - Should `/admin` appear in public navigation or stay hidden?
  - Should admin create/edit use the same rules as the public booking form?
- Answers received:
  - Use a simple admin login protected by backend-issued JWT, with credentials from root `.env`; guard admin API routes and `/admin`.
  - Bookings only.
  - Expand status to `pending`, `confirmed`, `cancelled`, and `completed`, editable by admin.
  - Keep `/admin` hidden from public navigation.
  - Use the same booking validation, Monday-Saturday rules, and duplicate time-slot prevention; allow status edit separately.
- Questions skipped: None.
- Remaining open questions: Exact dashboard table/filter layout can be chosen during implementation from existing design patterns.

## 4. Problem Definition
- Problem being solved: The site can accept bookings but has no operational interface for the owner/admin to manage them.
- Why it matters: Without an admin surface, bookings must be managed directly in the database or not at all.
- Current pain point: The backend exposes only public booking creation and availability; there is no authentication, admin route, status lifecycle, update, delete, or booking list API.
- Expected value: Admin can securely log in, view bookings, create bookings manually, edit appointment details/status, and delete records when needed.

## 5. Current State Analysis
- Existing behavior:
  - Public users can check availability and submit bookings.
  - Duplicate service/date/time slots are prevented.
  - Booking status supports only `pending` and `confirmed`.
- Existing architecture/components:
  - React/Vite frontend with React Router and TanStack Query.
  - Shared Axios client at `client/src/lib/api.js`.
  - Booking service functions at `client/src/services/bookingService.js`.
  - Express backend with `server/app.js`, booking routes/controller/model, and validation utility.
- Existing files/modules likely involved:
  - `server/config/env.js`
  - `server/app.js`
  - `server/models/Booking.js`
  - `server/utils/bookingValidation.js`
  - `server/controllers/bookingController.js`
  - `server/routes/bookingRoutes.js`
  - New backend admin auth/controller/routes/middleware files under `server/`
  - `client/src/App.jsx`
  - `client/src/lib/api.js`
  - New frontend admin page, admin services, query/mutation hooks, and focused tests.
- Existing data flow:
  - Client service calls `/api/bookings/availability` and `/api/bookings`.
  - Backend validates payload, checks duplicate slots, and persists through Mongoose `Booking`.
- Existing API/UI/CLI/workflow behavior:
  - No admin API, no auth flow, no protected frontend routes.
- Existing tests or verification coverage:
  - Backend Jest/Supertest booking tests.
  - Frontend Vitest/RTL booking flow and site page tests.

## 6. Desired End State
- Expected final behavior:
  - Admin visits `/admin`, sees login if unauthenticated, signs in with env-backed credentials, then manages bookings.
  - Admin API routes require `Authorization: Bearer <token>`.
  - Admin can list, view/create, edit, update status, and delete bookings.
- User-facing outcome:
  - Public site navigation remains unchanged and `/admin` is not advertised.
  - Public booking behavior remains compatible.
- Developer-facing outcome:
  - Admin auth, admin booking APIs, services, hooks, and UI are organized in project conventions.
- System/workflow outcome:
  - Root `.env` and `.env.example` document required backend auth variables.
  - Backend fails fast when required admin auth env vars are missing outside test mode.
- Backward compatibility expectations:
  - Existing pending/confirmed booking records remain valid.
  - Public booking APIs keep their current behavior and response shape unless status expansion naturally appears in booking data.

## 7. Scope
- In scope:
  - Backend JWT login and guarded admin middleware.
  - Env variables for admin username, admin password, and JWT secret.
  - Booking status enum expansion.
  - Admin booking CRUD API.
  - Frontend hidden `/admin` route with login and booking management dashboard.
  - Shared API client authorization support.
  - TanStack Query hooks wrapping admin services.
  - Focused backend and frontend tests.
- Out of scope:
  - Services CRUD.
  - Gallery/content CRUD.
  - Multi-user admin accounts, registration, password reset, refresh tokens, role management, audit logs, email notifications, calendar integration, deployment changes.
- Non-goals:
  - Redesign the public site.
  - Replace existing booking flow.
  - Introduce Redux unless global auth state becomes necessary; local/session storage token state is acceptable for this isolated admin route.
- Explicit boundaries:
  - Do not expose `/admin` in public navigation.
  - Do not hard-code API URLs or secrets.
  - Do not duplicate server records into Redux.

## 8. Users And Use Cases
- Primary users: KareBraids admin/owner.
- Secondary users: Public customers indirectly affected by maintained booking availability.
- Main use cases:
  - Admin logs in.
  - Admin views upcoming/recent bookings.
  - Admin creates a booking from a phone or in-person request.
  - Admin edits booking details or status.
  - Admin deletes a booking record.
  - Admin logs out.
- Edge use cases:
  - Token missing, expired, or invalid.
  - Duplicate slot on create/edit.
  - Invalid booking id.
  - Empty booking list.
  - API/network failure while loading or saving.

## 9. Functional Requirements
- Required behaviors:
  - `POST /api/admin/login` validates env-backed credentials and returns a signed JWT.
  - Admin booking routes reject requests without a valid Bearer token.
  - Booking status enum includes `pending`, `confirmed`, `cancelled`, `completed`.
  - Admin list endpoint returns bookings sorted predictably, preferably newest or nearest appointment first.
  - Admin create/update use shared booking validation and duplicate slot checks.
  - Admin status update accepts only supported statuses.
  - Admin delete removes a booking and returns a clear success response.
  - `/admin` renders login state, dashboard state, loading state, empty state, error state, and save/delete feedback.
- Inputs:
  - Admin credentials.
  - Booking fields: service, date, time, fullName, email, phone, preferredLocation, notes, status.
  - Booking id path params.
- Outputs:
  - JWT login response.
  - Booking list/item mutation responses.
  - Clear error messages for validation/auth/conflict/not-found.
- State changes:
  - JWT stored client-side for the admin session.
  - Booking documents created, updated, or deleted.
  - Booking status changes persisted.
- Error states:
  - 400 invalid payload/status/id.
  - 401 missing/invalid token or bad credentials.
  - 404 missing booking.
  - 409 duplicate slot.
  - 500 generic server error without leaking internals.
- Permissions/auth expectations:
  - All admin booking APIs require valid JWT.
  - Public booking and availability APIs remain public.

## 10. Non-Functional Requirements
- Performance expectations: Booking list should be efficient for MVP volume; use lean queries where appropriate.
- Reliability expectations: Duplicate prevention must remain authoritative server-side.
- Security/privacy expectations:
  - JWT secret must come from env.
  - Admin password must come from env and never be logged or sent to client.
  - API responses must not expose secrets or sensitive auth internals.
  - Token storage should be minimal and cleared on logout/invalid auth.
- Accessibility expectations:
  - Login and CRUD forms use labels above inputs, helper/error text below inputs, keyboard-accessible controls, focus states, and semantic alerts.
- Maintainability expectations:
  - Reuse booking validation helpers.
  - Keep admin API logic out of React components.
  - Keep server route handlers thin enough and testable.
- DX expectations:
  - Add focused tests that prove auth guards and CRUD behavior.

## 11. Affected Surfaces
- Files likely affected:
  - `package.json`
  - `package-lock.json`
  - `.env.example`
  - `server/config/env.js`
  - `server/app.js`
  - `server/models/Booking.js`
  - `server/utils/bookingValidation.js`
  - `server/controllers/bookingController.js`
  - `server/routes/bookingRoutes.js`
  - New `server/middleware/adminAuth.js`
  - New `server/controllers/adminAuthController.js`
  - New `server/controllers/adminBookingController.js`
  - New `server/routes/adminRoutes.js`
  - `server/tests/*`
  - `client/src/App.jsx`
  - `client/src/lib/api.js`
  - New `client/src/pages/Admin.jsx`
  - New `client/src/services/adminService.js`
  - New `client/src/hooks/queries/useAdminBookings.js`
  - New `client/src/hooks/mutations/useAdminBookingMutations.js` or similarly scoped hooks
  - `client/src/index.css`
  - `client/test/*`
- Directories likely affected:
  - `server/controllers/`, `server/routes/`, `server/middleware/`, `server/tests/`
  - `client/src/pages/`, `client/src/services/`, `client/src/hooks/queries/`, `client/src/hooks/mutations/`, `client/test/`
- UI surfaces: Hidden `/admin` route with login form and booking management dashboard.
- API routes:
  - New `POST /api/admin/login`
  - New guarded `/api/admin/bookings` CRUD routes
- Components: Admin page and possible small local UI subcomponents within the page.
- Services: Admin service functions through shared API client.
- Database/schema: Booking status enum expanded.
- Config/env vars: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET` in root `.env`/`.env.example`.
- Tests: Backend Jest/Supertest, frontend Vitest/RTL.
- Docs: Workflow artifacts; `.env.example` only unless durable docs become necessary.
- Workflow artifacts: `_workflow/runs/dev/request.md`, `spec.md`, `handoff.md`, `progress.md`; later `tasks.md`, `review.md`, `verification.md`, `release-notes.md`, `summary.md`.

## 12. Dependency And Integration Map
- Internal dependencies:
  - Admin create/update depends on booking validation and Mongoose model.
  - Frontend admin dashboard depends on shared API client and TanStack Query.
  - Protected UI depends on token lifecycle and API auth header injection.
- External packages/services:
  - Existing Express, Mongoose, Axios, TanStack Query, React Router.
  - Add `jsonwebtoken` unless a repo-approved JWT library already exists before implementation.
- Integration points:
  - Express app mounts admin routes under `/api/admin`.
  - Axios request interceptor or explicit service header attaches Bearer token.
  - React Router maps `/admin`.
- Ordering constraints:
  - Backend auth/env validation first.
  - Admin CRUD API second.
  - Frontend services/hooks third.
  - Frontend UI last.
- Migration/setup requirements:
  - Existing records with `pending`/`confirmed` remain valid.
  - Deployments must set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET`.

## 13. Data And State Impact
- Data models:
  - Booking status enum expands to `pending`, `confirmed`, `cancelled`, `completed`.
- Database changes:
  - No new collection required.
  - No mandatory data migration.
- State management changes:
  - Admin token can be kept in local state plus `localStorage` or `sessionStorage` for refresh resilience.
  - Server booking data stays in TanStack Query, not Redux.
- Cache/session/local storage impact:
  - Store only JWT and minimal admin session marker if needed.
  - Clear token on logout and auth failures.
- Backward compatibility impact:
  - Existing clients unaffected.

## 14. UX / API / Workflow Expectations
- UX expectations:
  - Admin page should feel operational and quiet: compact header, login panel, summary counts, booking table/list, inline forms/modal-like edit surface, status control, delete confirmation.
  - Provide loading skeletons or stable placeholders, empty state, inline errors, disabled pending buttons, and successful mutation feedback.
- API contract expectations:
  - JSON request/response only.
  - Auth failures use 401 with clear message.
  - Validation failures use 400 and optional `errors`.
  - Duplicate slots use 409.
  - Missing booking uses 404.
- CLI/workflow behavior:
  - Stop after this spec until explicit approval.
  - After approval, generate vertical task plan before implementation.
- Error handling expectations:
  - Reuse `getApiErrorMessage` on client.
  - Backend must avoid leaking stack traces.
- Empty/loading/success/failure states:
  - Login loading/error.
  - Booking list loading/empty/error.
  - Create/edit/delete pending and success/error states.

## 15. Execution Strategy
- Recommended implementation approach:
  - Add env validation for admin auth.
  - Add JWT login and auth middleware.
  - Add admin booking controller/routes with shared validation and duplicate checks.
  - Expand Booking model status enum.
  - Add client admin service/hook layer through `client/src/lib/api.js`.
  - Add `/admin` page with login and CRUD dashboard.
  - Add focused backend and frontend tests using TDD-first per task iteration.
- Suggested sequencing:
  - TASK-001: Add backend admin auth and env checks.
  - TASK-002: Add guarded admin booking CRUD API and expanded status.
  - TASK-003: Add frontend admin route, login, services/hooks, and dashboard CRUD UI.
  - TASK-004: Final hardening, full verification, docs/env example review if not covered earlier.
- Safe rollout/migration approach:
  - Keep public APIs unchanged.
  - Add admin routes under a distinct `/api/admin` namespace.
- Files to inspect before editing:
  - `server/config/env.js`, `server/app.js`, `server/models/Booking.js`, `server/utils/bookingValidation.js`, `server/tests/bookings.test.js`
  - `client/src/App.jsx`, `client/src/lib/api.js`, `client/src/pages/Booking.jsx`, `client/test/booking-flow.test.jsx`
- Decisions to avoid until more evidence exists:
  - Do not introduce a full user model or role system.
  - Do not add content management for services/gallery.

## 16. Verification Strategy
- Required automated checks:
  - Backend: `npm run test:server` or targeted Jest/Supertest tests.
  - Frontend: `npm test --prefix client` or targeted Vitest tests.
  - Frontend lint/build: `npm run lint --prefix client`, `npm run build --prefix client`.
- Required manual checks:
  - Browser check `/admin` login, booking list, create/edit/status/delete, logout, invalid token handling.
  - Confirm public navigation does not include Admin.
- Test types needed:
  - Backend auth guard tests.
  - Backend CRUD success and validation/conflict/not-found tests.
  - Frontend route/login/dashboard interaction tests.
- Build/lint/typecheck expectations:
  - Client lint and build pass.
  - Server tests pass.
- Acceptance evidence required:
  - Red -> Green -> Refactor evidence for each code-changing task iteration.
  - Passing targeted and broad verification where feasible.
- Proof of completion:
  - Admin can perform booking CRUD through UI against guarded APIs.

## 17. Acceptance Criteria
- [ ] `/admin` is not shown in public navigation.
- [ ] Unauthenticated users who visit `/admin` see an admin login state rather than booking data.
- [ ] Admin login uses root `.env` credentials and returns a backend-issued JWT.
- [ ] Missing required admin auth env vars fail fast outside test mode.
- [ ] Admin booking API routes reject missing/invalid Bearer tokens.
- [ ] Admin can list bookings.
- [ ] Admin can create a booking with the same validation and duplicate-slot prevention as the public form.
- [ ] Admin can edit booking details with the same validation and duplicate-slot prevention.
- [ ] Admin can set status to `pending`, `confirmed`, `cancelled`, or `completed`.
- [ ] Admin can delete a booking after an explicit confirmation action.
- [ ] Booking model supports `pending`, `confirmed`, `cancelled`, and `completed`.
- [ ] Public booking create and availability behavior remain compatible.
- [ ] Admin UI includes loading, empty, error, saving, and success states.
- [ ] Frontend API calls use the shared API client and env-based base URL.
- [ ] Services wrap API logic and TanStack Query hooks wrap server state.
- [ ] Relevant backend and frontend tests are added or updated first and pass after implementation.
- [ ] Client lint/build and relevant server tests pass or any inability is documented.

## 18. Edge Cases And Failure Modes
- Edge cases:
  - Empty booking collection.
  - Same booking updated without triggering false duplicate conflict.
  - Changing date/time/service into an occupied slot.
  - Deleting a booking already removed.
  - Token expires while dashboard is open.
- Failure modes:
  - Weak or missing `JWT_SECRET`.
  - Admin password accidentally logged.
  - Client displays stale list after mutation.
  - Public availability includes cancelled/completed bookings if query semantics are not considered.
- Regression risks:
  - Duplicate-slot validation could block editing an unchanged booking.
  - Expanding status could affect availability calculations.
  - Auth header changes could affect public API calls if applied incorrectly.
- Recovery expectations:
  - Fail clearly, keep form data where practical, and refetch booking list after successful mutations.

## 19. Risks And Mitigations
- Technical risks:
  - Auth implementation touches server config and API paths. Mitigate with focused Supertest guard tests.
  - CRUD UI can grow large. Mitigate with scoped page subcomponents and services/hooks.
- Product/UX risks:
  - Admin dashboard could become cluttered. Mitigate with compact operational layout, not marketing layout.
- Security risks:
  - Env-backed plaintext password is simple but sensitive. Mitigate by never exposing/logging it and requiring HTTPS in deployment.
  - JWT in browser storage has XSS exposure. Mitigate by storing only token, clearing on logout, and avoiding dangerous HTML patterns.
- Scope risks:
  - Services/gallery CRUD is explicitly out of scope.
- Mitigation plan:
  - Keep routes namespaced, tests narrow, and implement vertical slices.

## 20. Assumptions
- Explicit assumptions:
  - `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET` are acceptable env var names.
  - JWT expiry can default to a practical short/medium window, such as 8 hours, unless implementation finds a repo convention.
  - Adding `jsonwebtoken` is acceptable if not already installed.
  - Booking availability should continue to consider occupied slots based on existing booking records; if cancelled/completed should reopen slots, that requires an explicit product decision during planning or a follow-up.
- Confidence level: Medium-high.
- What to revisit if assumptions are wrong:
  - Env var names and token expiry.
  - Whether cancelled/completed bookings should free availability.

## 21. Open Questions
- Blocking questions: None for spec approval.
- Non-blocking questions:
  - Should cancelled/completed bookings free their appointment slots for public availability?
  - Should admin token persist across browser refreshes via localStorage or be session-only?
- Execution impact:
  - Default conservative assumption: preserve current duplicate-slot and availability behavior unless the task plan explicitly includes reopening slots for cancelled/completed bookings.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - Backend auth/env guard.
  - Admin booking CRUD API/status model.
  - Frontend admin login/dashboard CRUD UI.
  - Final integrated verification/hardening.
- Suggested first task:
  - Add backend admin JWT login and route guard with env validation.
- Suggested task ordering:
  - Backend auth before guarded CRUD, CRUD before frontend dashboard, full verification last.
- Areas that should not become separate tasks:
  - Services/gallery management.
  - Full user-role system.
  - Deployment platform changes.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Each task must add or update failing tests first, implement the smallest passing change, then refine and polish with verification in every iteration.

## Frontend Taste Application
- Applied skill: `.agents/skills/design-taste-frontend/SKILL.md`
- Dependency verification:
  - Client uses React/Vite, React Router, TanStack Query, Axios, Tailwind v4, and `@phosphor-icons/react`.
  - Do not import new frontend packages without checking `client/package.json`.
- Design direction:
  - Admin dashboard should be quiet, utilitarian, and work-focused.
  - Avoid public-site marketing hero treatment for admin.
  - Use icons from `@phosphor-icons/react` where useful.
  - Avoid emojis and generic AI-purple styling.
  - Use cards only for functional grouping; avoid nested cards.
  - Ensure mobile collapse, stable table/list dimensions, visible focus states, and no text overflow.
- Required states:
  - Login loading/error.
  - Dashboard loading skeleton/placeholder.
  - Empty bookings state.
  - Mutation saving/deleting states.
  - Inline validation and API errors.
- Final pre-flight matrix to execute before frontend output:
  - [ ] Is global state used appropriately to avoid deep prop-drilling rather than arbitrarily?
  - [ ] Is mobile layout collapse (`w-full`, `px-4`, `max-w-7xl mx-auto`) guaranteed for high-variance designs?
  - [ ] Do full-height sections safely use `min-h-[100dvh]` instead of `h-screen`?
  - [ ] Do `useEffect` animations contain strict cleanup functions?
  - [ ] Are empty, loading, and error states provided?
  - [ ] Are cards omitted in favor of spacing where possible?
  - [ ] Did CPU-heavy perpetual animations stay out of the dashboard?
