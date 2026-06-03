# Task Plan

Spec file used: `_workflow/runs/work/spec.md`
Planning date: 2026-06-02
Progress and summary files read: handoff created for this run; no prior run progress.
Detailed spec sections used: affected surfaces, data impact, UX/API expectations, verification strategy, acceptance criteria, risks, assumptions.

## TASK-001: Use one services source for Home, Gallery, and Booking
Status: Ready
Objective: Add canonical services selectors and refactor user-facing surfaces to consume them.
Files likely affected: `client/src/data/services.js`, Home/Gallery/Booking components, services/detail compatibility, tests, CSS.
Checklist:
- [ ] Add canonical service data and selectors.
- [ ] Refactor Home featured/gallery surfaces.
- [ ] Refactor Gallery filter/dropdown/modal image behavior.
- [ ] Refactor Booking options/preselection without breaking API payload.
- [ ] Update tests and run verification.
Iteration plan:
- Iteration 1 Build: add failing tests and core data/UI implementation.
- Iteration 2 Refine: fix compatibility regressions and API contract tests.
- Iteration 3 Polish: CSS/accessibility/fallback/diff review.
Test plan: `npm test --prefix client`, `npm run build --prefix client`.
Acceptance criteria: all spec acceptance criteria checked.
Stop condition: verification cannot run or booking API contract breaks.
Out-of-scope items: backend/API/schema/dependency changes.
