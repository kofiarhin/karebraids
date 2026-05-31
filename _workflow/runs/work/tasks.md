# Task Plan: Contact Page MVP

## Planning Metadata
- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-05-31
- Explicit approval recorded: user replied `approve spec`
- Execution mode: `complete-workflow`
- Progress file read: `_workflow/runs/work/progress.md`
- Summary file read: `_workflow/runs/work/summary.md`
- Handoff file read: `_workflow/runs/work/handoff.md`
- Detailed spec sections used: 5 Current State Analysis, 7 Scope, 9 Functional Requirements, 11 Affected Surfaces, 12 Dependency And Integration Map, 13 Data And State Impact, 14 UX / API / Workflow Expectations, 15 Execution Strategy, 16 Verification Strategy, 17 Acceptance Criteria, 18 Edge Cases And Failure Modes, 19 Risks And Mitigations, 20 Assumptions, 21 Open Questions, and 22 Task Extraction Notes.

## TASK-001: Add persisted Contact message API
- Status: Done
- Objective: Add a public validated `POST /api/contact` endpoint that trims and saves enquiries with `status: "new"` and timestamps.
- Files likely affected: `server/app.js`, new `server/models/ContactMessage.js`, new `server/utils/contactValidation.js`, new `server/controllers/contactController.js`, new `server/routes/contactRoutes.js`, new `server/tests/contact.test.js`.
- Checklist:
  - [ ] Add Jest/Supertest tests before implementation.
  - [ ] Add ContactMessage Mongoose schema with timestamps and default new status.
  - [ ] Add required string trimming and email-format validation.
  - [ ] Add thin controller and route.
  - [ ] Mount `/api/contact` in Express app.
  - [ ] Verify required response contract and safe error behavior.
- Iteration 1 Build: Write requested endpoint tests first, observe Red, then add minimal endpoint/model implementation and refactor boundaries.
- Iteration 2 Refine: Add whitespace-trimming contract test first, observe Red if needed, refine validator behavior, and refactor without expanding scope.
- Iteration 3 Polish: Add persistence-error safety contract first, observe Red if needed, harden safe HTTP 500 behavior, and run aggregate backend verification.
- Test plan: Focused `npx jest server/tests/contact.test.js --runInBand`, then `npm run test:server`.
- Red phase evidence: Pending execution.
- Green phase evidence: Pending execution.
- Refactor phase evidence: Pending execution.
- Test commands run: Pending execution.
- Acceptance criteria: API saves trimmed requested values with new status/timestamps; returns required 201; rejects missing/invalid email with 400; exposes no internal error detail.
- Acceptance result: Pending.
- Verification commands: `npx jest server/tests/contact.test.js --runInBand`, `npm run test:server`.
- Stop condition: Stop if API conventions conflict or targeted backend verification cannot pass.
- Out-of-scope items: Email dispatch, inbox APIs, rate limiting packages, auth changes.

## TASK-002: Add dark-luxury Contact page and route-safe header link
- Status: Done
- Objective: Add a mobile-first `/contact` page with dark-luxury form/info layout, service-backed submission states, and route-safe header Contact navigation while preserving Footer and About.
- Applied skill: design-taste-frontend
- Files likely affected: `client/src/App.jsx`, `client/src/constants/homepage.js`, `client/src/index.css`, new `client/src/constants/contact.js`, new `client/src/pages/Contact.jsx`, new `client/src/services/contactService.js`, new `client/src/hooks/mutations/useCreateContactMessage.js`, new `client/test/contact-page.test.jsx`.
- Checklist:
  - [ ] Add frontend Vitest/RTL behavior tests before implementation.
  - [ ] Add `/contact` route and update header Contact item to route type.
  - [ ] Add page-local replaceable contact details.
  - [ ] Add service and TanStack Query mutation hook.
  - [ ] Add labeled required form controls and client required-value validation.
  - [ ] Add loading, failure, reset, and exact success replacement states.
  - [ ] Add responsive Contact-scoped dark-luxury styles.
  - [ ] Prove Footer and About files remain unchanged.
- Iteration 1 Build: Add route, navigation, detail, required validation, service-backed success tests first; observe Red; add minimal page slice and refactor.
- Iteration 2 Refine: Add loading/failure-state tests first; observe Red if needed; refine mutation state UX and refactor.
- Iteration 3 Polish: Add responsive scoped styling contract test first; observe Red; polish dark-luxury composition and run aggregate client verification.
- Test plan: Focused `npm run test --prefix client -- contact-page.test.jsx`, then complete client tests, lint, and build.
- Red phase evidence: Pending execution.
- Green phase evidence: Pending execution.
- Refactor phase evidence: Pending execution.
- Test commands run: Pending execution.
- Acceptance criteria: `/contact` renders branded page in Layout; header routes correctly; page-local details render; form behaves as specified; scoped responsive styles exist; Footer/About untouched.
- Acceptance result: Pending.
- Verification commands: `npm run test --prefix client -- contact-page.test.jsx`, `npm run test --prefix client`, `npm run lint --prefix client`, `npm run build --prefix client`.
- Stop condition: Stop if Footer/About require edits or targeted frontend verification cannot pass.
- Out-of-scope items: Footer edits, About edits, standalone theme, Redux, form library, new dependencies.

## TASK-003: Audit regression safety and complete release artifacts
- Status: Done
- Objective: Verify the complete additive feature, audit scope, capture visual evidence when available, and finalize workflow records.
- Files likely affected: `_workflow/runs/work/progress.md`, `_workflow/runs/work/handoff.md`, `_workflow/runs/work/review.md`, `_workflow/runs/work/verification.md`, `_workflow/runs/work/release-notes.md`, `_workflow/runs/work/summary.md`.
- Checklist:
  - [ ] Run full server and client verification matrix.
  - [ ] Run `git diff --check`, `git diff --stat`, and `git diff`.
  - [ ] Confirm Footer and About implementation files unchanged.
  - [ ] Confirm no env vars, packages, secrets, junk, or scope creep.
  - [ ] Attempt visual screenshot capture if browser automation exists; otherwise record code-surface fallback.
  - [ ] Complete health check and release artifacts.
- Iteration 1 Build: Run aggregate tests/build/lint and recover only in-scope failures.
- Iteration 2 Refine: Audit exact diff, footer/about boundaries, and secrets/junk.
- Iteration 3 Polish: Complete code-surface visual review or screenshot, workflow health check, and artifacts.
- Test plan: Aggregate commands and diff audit.
- Red phase evidence: Not applicable; audit-only task.
- Green phase evidence: Pending execution.
- Refactor phase evidence: Not applicable; audit-only task.
- Test commands run: Pending execution.
- Acceptance criteria: Verification passes or limitations documented; diff is scoped; artifacts complete.
- Acceptance result: Pending.
- Verification commands: `npm run test:server`, `npm run test --prefix client`, `npm run lint --prefix client`, `npm run build --prefix client`, `git diff --check`, `git diff --stat`, `git diff`, `git status --short`.
- Stop condition: Stop if verification fails without an in-scope recovery or diff reveals unrelated changes.
- Out-of-scope items: Unrelated cleanup or refactors.
