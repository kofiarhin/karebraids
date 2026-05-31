# Detailed Spec: Polish KareBraids Booking Page Dark Luxury UI

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-05-31
- Request ID / slug: `polish-booking-page-dark-luxury-ui`
- Request source: Latest direct prompt plus grill-me clarification.
- Execution mode: `complete-workflow`
- Request classification: `polish-ui`
- Scope level: Small frontend refinement.
- Risk level: Low to moderate.

## 2. Original Request
- Raw user request: Align Booking with Home/Gallery dark luxury styling, remove brown panels/gradients, preserve booking behavior, and make mobile clean.
- Normalized request: Restyle `/booking` with quiet transparent dark cards and sparse gold accents; retain desktop/tablet sidebar; place mobile horizontal progress above active form and summary below it.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`.

## 3. Questions And Answers
- Questions asked: Should mobile progress sit above active content and summary below it while desktop/tablet keep the sidebar?
- Answers received: Yes.
- Questions skipped: Repo inspection resolved architecture and test conventions.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: Booking has cocoa gradients, glow, and dashboard-like blocks that do not match calmer public pages.
- Why it matters: Booking is a key conversion route and should feel cohesive.
- Current pain point: Visually busy brown-heavy booking presentation.
- Expected value: Calm premium continuity and clearer mobile flow.

## 5. Current State Analysis
- Existing behavior: Local React state drives service, date, time, details, and confirmation steps.
- Existing architecture/components: `Booking.jsx` composes `useAvailability` and `useCreateBooking`; API logic remains outside UI.
- Existing files/modules likely involved: `client/src/pages/Booking.jsx`, `client/src/index.css`, `client/test/booking-flow.test.jsx`.
- Existing data flow: TanStack Query hooks fetch slots and submit bookings.
- Existing API/UI/CLI/workflow behavior: `/booking` is registered through `App.jsx` and shared `Layout`.
- Existing tests or verification coverage: Booking Vitest covers calendar, active semantics, submission, API errors, and empty slots.

## 6. Desired End State
- Expected final behavior: Existing flow unchanged on a cohesive dark surface.
- User-facing outcome: Transparent cards, thin borders, sparse gold, calm hierarchy, clean mobile order.
- Developer-facing outcome: Scoped booking CSS contract and regression coverage.
- System/workflow outcome: No server or API changes.
- Backward compatibility expectations: Preserve booking flow and unrelated routes.

## 7. Scope
- In scope: Booking presentation markup if necessary, scoped CSS, mobile ordering, Vitest assertions, workflow artifacts.
- Out of scope: Backend, data, hooks, API, routing, navbar, Home, Gallery, dependencies.
- Non-goals: New steps, animation systems, or broad retheme.
- Explicit boundaries: Keep API/business logic out of UI components.

## 8. Users And Use Cases
- Primary users: Prospective clients on mobile and desktop.
- Secondary users: Maintainers validating consistency.
- Main use cases: Select service/date/time, enter details, submit, view confirmation.
- Edge use cases: Disabled dates, no slots, errors, narrow phones.

## 9. Functional Requirements
- Required behaviors: Preserve all existing booking states and assistive semantics; responsive reorder only presentation.
- Inputs: Existing form and booking interactions.
- Outputs: Existing summary, errors, availability, confirmation.
- State changes: None intentional.
- Error states: Preserve validation, API errors, empty, loading.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: No dependency or network additions.
- Reliability expectations: Existing regressions pass.
- Security/privacy expectations: No API or secret changes.
- Accessibility expectations: Preserve labels, buttons, `aria-current`, disabled states, focus visibility, contrast.
- Maintainability expectations: Scoped booking selectors.
- DX expectations: Add Vitest presentation contract.

## 11. Affected Surfaces
- Files likely affected: `client/src/pages/Booking.jsx`, `client/src/index.css`, `client/test/booking-flow.test.jsx`.
- Directories likely affected: `client/src/pages/`, `client/src/`, `client/test/`, `_workflow/runs/work/`, `.workflow/artifacts/polish-ui/`.
- UI surfaces: Booking hero note, sidebar/progress, summary, panel, service cards, calendar, slots, fields, states, confirmation.
- API routes: None.
- Components: Booking page only.
- Services: None.
- Database/schema: None.
- Config/env vars: None.
- Tests: Frontend Vitest.
- Docs: Workflow artifacts only.
- Workflow artifacts: Run-scoped and polish-ui artifacts.

## 12. Dependency And Integration Map
- Internal dependencies: Booking component, Button, constants, existing hooks, shared Layout.
- External packages/services: Existing stack only.
- Integration points: `/booking`, availability and create hooks.
- Ordering constraints: Test first, minimal CSS/markup, verify, refine, polish.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: None.
- Database changes: None.
- State management changes: None.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Presentation only.

## 14. UX / API / Workflow Expectations
- UX expectations: unified dark surface; cards use `rgba(255, 255, 255, 0.02)` and `1px solid rgba(255, 255, 255, 0.08)`; active/selected use `#D4A373` and `rgba(212, 163, 115, 0.05)`; hover only brightens border; desktop/tablet sidebar; mobile progress above and summary below content.
- API contract expectations: No changes.
- CLI/workflow behavior: Vitest, lint, build, backend Jest, diff audit.
- Error handling expectations: Preserve behavior with calm state visuals.
- Empty/loading/success/failure states: Preserve content and function.

## 15. Execution Strategy
- Recommended implementation approach: Add CSS/markup contract test first, make minimal scoped override, refine active and hover treatments, harden mobile layout and cascade.
- Suggested sequencing: One vertical task through Build, Refine, Polish.
- Safe rollout/migration approach: CSS-scoped update with regression suite.
- Files to inspect before editing: Booking JSX, index CSS, booking tests.
- Decisions to avoid until more evidence exists: No broad retheme, dependency, hook, or API edits.

## 16. Verification Strategy
- Required automated checks: Targeted and full client Vitest, client lint, client build, backend Jest, `git diff --check`.
- Required manual checks: Code-surface responsive and cascade review; screenshot if browser automation is available.
- Test types needed: CSS/markup contract plus existing interaction regressions.
- Build/lint/typecheck expectations: Lint and build pass; no standalone typecheck script.
- Acceptance evidence required: Per-iteration Red/Green/Refactor evidence.
- Proof of completion: Acceptance checked, diff audited, artifacts current.

## 17. Acceptance Criteria
- [ ] Cohesive dark Booking surface aligned with Home/Gallery.
- [ ] Brown dashboard gradients, fills, and panel glow removed.
- [ ] Primary booking cards use requested transparent surface and border.
- [ ] Active/selected cards use requested sparse gold treatment.
- [ ] Hover brightens border without brown fill.
- [ ] Tablet/desktop sidebar preserved.
- [ ] Mobile progress sits above content and summary below content without overflow.
- [ ] Existing booking, route, shared-page, API, and business logic regressions pass.

## 18. Edge Cases And Failure Modes
- Edge cases: Narrow phones, confirmation step, disabled dates, no slots, form errors.
- Failure modes: Legacy CSS wins cascade; summary order remains wrong; broad selectors leak.
- Regression risks: Booking behavior and shared shell visuals.
- Recovery expectations: Scoped fix and rerun exact failing command.

## 19. Risks And Mitigations
- Technical risks: Overlapping CSS. Mitigation: scoped late overrides and audit.
- Product/UX risks: Too much gold or insufficient contrast. Mitigation: restrained state use.
- Security risks: None expected.
- Scope risks: Global token changes alter unrelated routes. Mitigation: do not retheme globally.
- Mitigation plan: TDD-first contract, regression suite, diff review.

## 20. Assumptions
- Explicit assumptions: Site radii remain reusable; state-specific alert tint may remain restrained; CSS ordering avoids duplicate content.
- Confidence level: High.
- What to revisit if assumptions are wrong: breakpoint or semantic state tint.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Screenshot depends on available browser tooling.
- Execution impact: Use code-surface fallback if unavailable.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: One Booking presentation slice.
- Suggested first task: `TASK-001: Align booking flow with shared dark luxury styling`.
- Suggested task ordering: Single task through Build, Refine, Polish.
- Areas that should not become separate tasks: Backend, hooks, unrelated global cleanup.
- How the 3-pass Build -> Refine -> Polish loop should apply: Build surface/mobile contract, Refine state restraint/readability, Polish cascade/overflow/full verification.

## Frontend Taste Application
Applied skill: design-taste-frontend

## Dirty Worktree Protection
- Initial `git status --short`: clean.
- Existing dirty files: none.
- Planned production files: Booking JSX, index CSS, booking test.
- Overlap risk: none.
