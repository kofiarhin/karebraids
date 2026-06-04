# Services Page Redesign Task Plan

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-04
- Progress and summary files read: existing `_workflow/runs/work/progress.md` and `_workflow/runs/work/summary.md` if present.
- Spec sections used: Current State Analysis, Desired End State, Scope, Affected Surfaces, UX Expectations, Verification Strategy, Acceptance Criteria, Risks.

## TASK-001: Replace the Services top hero with a compact editorial header

- Status: Done
- Objective: Remove the large Services image hero and intro, add the requested compact header/actions/category panel, and keep the service grid/cards working.
- Files likely affected:
  - `client/src/pages/Services.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `client/test/service-detail.test.jsx`
- Checklist:
  - [x] Add/update failing tests for new Services header expectations.
  - [x] Remove `heroService` and old hero/intro JSX.
  - [x] Add compact header copy, actions, and category panel.
  - [x] Replace Services hero/intro CSS with editorial header/panel responsive CSS.
  - [x] Preserve service cards and CTA behavior.
  - [x] Run verification.
- Iteration plan:
  - Iteration 1 Build: Red test for new layout, implement JSX/CSS, targeted test pass.
  - Iteration 2 Refine: Full test run, update redirect test expectation for new Services H1.
  - Iteration 3 Polish: Build, lint/document known unrelated lint blockers, Fallow, diff review.
- Test plan: `npm run test --prefix client -- site-pages.test.jsx`, `npm run test --prefix client`, `npm run build --prefix client`, `npm run lint --prefix client`.
- Acceptance result: All criteria met.
- Stop condition: Stop if service grid/card behavior breaks or verification cannot establish acceptance.
- Out-of-scope items: Backend, service data, booking flow, image assets.
