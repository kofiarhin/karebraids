# Task Plan: Homepage Featured Services Square Price Row

- Spec file used: `_workflow/runs/dev/spec.md`
- Planning date: 2026-05-26
- Progress and summary files read:
  - `_workflow/runs/dev/progress.md`
  - `_workflow/runs/dev/summary.md`
  - `_workflow/runs/dev/handoff.md`
- Spec approval: Approved by user message `approve spec`.
- Execution mode: complete-workflow
- Workflow path: polish-ui
- Applied skill: design-taste-frontend

## Spec Sections Used

- Section 5 Current State Analysis: `Home.jsx` renders service tiles from `services` and `galleryItems`.
- Section 7 Scope: price data, homepage markup, CSS, tests, and verification are in scope.
- Section 11 Affected Surfaces: `content.js`, `Home.jsx`, `index.css`, `site-pages.test.jsx`, workflow artifacts.
- Section 12 Dependency And Integration Map: `Booking.jsx` reads service data, so new fields must be additive.
- Section 14 UX / API / Workflow Expectations: square comparable tiles, readable price badge, desktop section shorter, mobile without page overflow.
- Section 16 Verification Strategy: test-first focused frontend checks, lint, build, browser/code responsive review.
- Section 17 Acceptance Criteria: six visible prices, square tiles, horizontal desktop layout, mobile-safe behavior.
- Section 22 Task Extraction Notes: implement one narrow vertical UI slice, then verify and close.

## Task List

### TASK-001: Add square priced service tiles on the homepage

- Status: Done
- Objective: Show all six homepage Featured services as same-size square image tiles with visible starting prices and a horizontal desktop layout.
- Files likely affected:
  - `client/src/constants/content.js`
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Checklist:
  - [ ] Add test assertions for the six starting prices.
  - [ ] Add CSS guardrail tests for square/horizontal service tile layout.
  - [ ] Add service starting price data.
  - [ ] Render price labels in each homepage service tile.
  - [ ] Update service grid CSS to square same-size tiles in a horizontal desktop band.
  - [ ] Add mobile-safe responsive behavior.
- Iteration 1 Build:
  - Goal: Create failing tests, implement the smallest data/markup/CSS change, and make focused tests pass.
  - Changes made: Pending.
  - Test plan: `npm test --prefix client -- site-pages.test.jsx`
  - Red phase evidence: Pending.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Run Iteration 1 Red.
- Iteration 2 Refine:
  - Goal: Harden responsive CSS and ensure no booking behavior was touched.
  - Changes made: Pending.
  - Test plan: focused tests plus lint if needed.
  - Red phase evidence: Pending.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Run after Iteration 1.
- Iteration 3 Polish:
  - Goal: Final readability and polish pass for the service tiles.
  - Changes made: Pending.
  - Test plan: focused tests and build/lint where appropriate.
  - Red phase evidence: Pending.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Run after Iteration 2.
- Test plan:
  - `npm test --prefix client -- site-pages.test.jsx`
  - `npm run lint --prefix client`
  - `npm run build --prefix client`
- Red phase evidence: Pending.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Acceptance criteria:
  - [ ] Six service price labels render with confirmed values.
  - [ ] CSS defines square service tiles.
  - [ ] CSS defines horizontal desktop service layout.
  - [ ] Mobile CSS avoids body-level horizontal overflow.
  - [ ] Existing homepage and booking behavior remain unchanged.
- Acceptance result:
  - [x] Six service price labels render with confirmed values.
  - [x] CSS defines square service tiles.
  - [x] CSS defines horizontal desktop service layout.
  - [x] Mobile CSS avoids body-level horizontal overflow by using constrained two-column mobile grids.
  - [x] Existing homepage and booking behavior remain unchanged.
- Verification commands:
  - `npm test --prefix client -- site-pages.test.jsx`: passed, 23 tests.
  - `npm run lint --prefix client`: passed.
- Stop condition: Stop if tests cannot run or responsive behavior cannot be verified.
- Out-of-scope items: booking price logic, backend/API/database, gallery redesign, admin UI, new dependencies.

### TASK-002: Verify responsive service row and close workflow

- Status: Done
- Objective: Run final verification, review the diff, and complete workflow artifacts.
- Files likely affected:
  - `_workflow/runs/dev/progress.md`
  - `_workflow/runs/dev/handoff.md`
  - `_workflow/runs/dev/review.md`
  - `_workflow/runs/dev/verification.md`
  - `_workflow/runs/dev/release-notes.md`
  - `_workflow/runs/dev/summary.md`
  - `.workflow/artifacts/polish-ui/*`
- Checklist:
  - [ ] Run focused and full relevant client verification.
  - [ ] Perform responsive browser/code-surface review.
  - [ ] Run final diff audit with `git diff --stat` and `git diff`.
  - [ ] Create review, verification, release notes, summary, and final handoff.
  - [ ] Run workflow health check.
- Iteration 1 Build:
  - Goal: Run final verification commands and record results.
  - Changes made: Pending.
  - Test plan: client tests, lint, build.
  - Red phase evidence: Documentation/verification task; not applicable.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Run after TASK-001.
- Iteration 2 Refine:
  - Goal: Review diff and identify any scope or artifact gaps.
  - Changes made: Pending.
  - Test plan: targeted reruns if review finds issues.
  - Red phase evidence: Documentation/verification task; not applicable.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Run after Iteration 1.
- Iteration 3 Polish:
  - Goal: Complete final artifacts and health check.
  - Changes made: Pending.
  - Test plan: final status/diff checks.
  - Red phase evidence: Documentation/verification task; not applicable.
  - Green phase evidence: Pending.
  - Refactor phase evidence: Pending.
  - Test commands run: Pending.
  - Verification command/result: Pending.
  - Review findings: Pending.
  - Acceptance status: Pending.
  - Remaining issues: Pending.
  - Next action: Final response.
- Test plan:
  - `npm test --prefix client -- site-pages.test.jsx`
  - `npm test --prefix client`
  - `npm run lint --prefix client`
  - `npm run build --prefix client`
- Red phase evidence: Not applicable; documentation/verification task.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Pending.
- Acceptance criteria:
  - [ ] Final verification recorded.
  - [ ] Final diff audit recorded.
  - [ ] Review file exists.
  - [ ] Verification file exists.
  - [ ] Release notes exist.
  - [ ] Summary exists.
  - [ ] Handoff reflects latest complete state.
  - [ ] Workflow health recorded.
- Acceptance result:
  - [x] Final verification recorded.
  - [x] Final diff audit recorded.
  - [x] Review file exists.
  - [x] Verification file exists.
  - [x] Release notes exist.
  - [x] Summary exists.
  - [x] Handoff reflects latest complete state.
  - [x] Workflow health recorded.
- Verification commands:
  - `npm test --prefix client -- site-pages.test.jsx`: passed, 23 tests.
  - `npm run lint --prefix client`: passed.
  - `npm test --prefix client`: passed, 35 tests.
  - `npm run build --prefix client`: passed.
  - Playwright CLI browser verification: passed.
  - `git diff --stat`: completed.
  - `git diff`: completed.
  - `git status --short`: completed.
- Stop condition: Stop with `Needs Human Review` if required verification cannot run.
- Out-of-scope items: application code changes except targeted fixes for TASK-001 regressions.

## Execution Evidence

### TASK-001 Evidence

- Lifecycle: Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done
- Files changed:
  - `client/src/constants/content.js`
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Applied skill: design-taste-frontend

#### Iteration 1 Build

- Goal: Add visible starting prices and square/horizontal service layout.
- Red phase evidence: `npm test --prefix client -- site-pages.test.jsx` failed with 2 expected failures: missing `From £80` price text and missing square/horizontal CSS contract.
- Green phase evidence: Added `fromPrice` values, rendered `.service-price-badge`, and updated `.service-rack` / `.service-tile` CSS. Focused test passed, 22 tests.
- Refactor phase evidence: Kept implementation additive and scoped; focused test rerun passed.
- Test commands run: `npm test --prefix client -- site-pages.test.jsx`
- Verification command/result: Passed.
- Review findings: Data field is additive; `Booking.jsx` consumes only title/description/duration and is unaffected.
- Acceptance status: Met for visible prices and square/horizontal desktop layout.
- Remaining issues: Needed accessibility naming and dark badge polish.
- Next action: Iteration 2 Refine.

#### Iteration 2 Refine

- Goal: Make each priced tile discoverable as a named service/price unit for assistive technology.
- Red phase evidence: Added service tile aria-label assertions; focused test failed because labels were missing.
- Green phase evidence: Added `aria-label={`${service.title}, ${service.fromPrice}`}` to each service article; focused test passed, 23 tests.
- Refactor phase evidence: Markup remained scoped to homepage service articles; focused test rerun passed.
- Test commands run: `npm test --prefix client -- site-pages.test.jsx`
- Verification command/result: Passed.
- Review findings: Accessible labels include both title and starting price without altering visible copy.
- Acceptance status: Met for accessible priced tiles.
- Remaining issues: Dark-theme badge polish needed.
- Next action: Iteration 3 Polish.

#### Iteration 3 Polish

- Goal: Ensure the price badge has explicit dark-shell styling for readability.
- Red phase evidence: Added CSS guard for `.dark-brand-shell .service-price-badge`; focused test failed because the selector was missing.
- Green phase evidence: Added scoped dark-shell price badge border/background/text/shadow styling; focused test passed, 23 tests.
- Refactor phase evidence: Client lint passed with the final implementation.
- Test commands run: `npm test --prefix client -- site-pages.test.jsx`; `npm run lint --prefix client`
- Verification command/result: Focused tests and lint passed.
- Review findings: Diff is scoped to service data, homepage markup, CSS, and focused tests.
- Acceptance status: All TASK-001 criteria met.
- Remaining issues: Final full verification and closeout pending in TASK-002.
- Next action: TASK-002.

### TASK-002 Evidence

- Lifecycle: Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done
- Files changed:
  - `_workflow/runs/dev/progress.md`
  - `_workflow/runs/dev/handoff.md`
  - `_workflow/runs/dev/review.md`
  - `_workflow/runs/dev/verification.md`
  - `_workflow/runs/dev/release-notes.md`
  - `_workflow/runs/dev/summary.md`
  - `.workflow/artifacts/polish-ui/*`
- Applied skill: design-taste-frontend

#### Iteration 1 Build

- Goal: Run final verification commands and record results.
- Red phase evidence: Not applicable; documentation/verification task after code-changing TASK-001 completed Red/Green/Refactor.
- Green phase evidence: `npm test --prefix client` passed with 35 tests; `npm run build --prefix client` passed.
- Refactor phase evidence: Vite preview and Playwright CLI browser verification passed at desktop and mobile sizes.
- Test commands run: `npm test --prefix client`; `npm run build --prefix client`; Playwright CLI browser verification.
- Verification command/result: Passed.
- Review findings: Desktop and mobile service tiles are square and no page-level horizontal overflow exists.
- Acceptance status: Met.
- Remaining issues: Final artifact/diff closeout pending.
- Next action: Iteration 2 Refine.

#### Iteration 2 Refine

- Goal: Review diff and remove generated scratch output.
- Red phase evidence: Not applicable; documentation/verification task.
- Green phase evidence: Final diff audit completed with `git diff --stat` and `git diff`.
- Refactor phase evidence: Generated `.playwright-cli/` scratch folder was removed.
- Test commands run: `git diff --stat`; `git diff`; `git status --short`.
- Verification command/result: Passed.
- Review findings: Diff matches spec and contains no secrets, dependencies, backend, API, database, env, deployment, or route changes.
- Acceptance status: Met.
- Remaining issues: Final artifact health check pending.
- Next action: Iteration 3 Polish.

#### Iteration 3 Polish

- Goal: Complete final artifacts and workflow health check.
- Red phase evidence: Not applicable; documentation/verification task.
- Green phase evidence: Review, verification, release notes, summary, handoff, and polish-ui artifacts were created/updated.
- Refactor phase evidence: Final artifact consistency checked against spec, tasks, progress, verification, and review.
- Test commands run: final artifact review and `git status --short`.
- Verification command/result: Passed.
- Review findings: Required artifacts exist and reflect the completed request.
- Acceptance status: Met.
- Remaining issues: None.
- Next action: Final response.
