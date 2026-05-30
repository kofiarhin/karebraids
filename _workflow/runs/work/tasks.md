# Task Plan: Unified KareBraids Semantic Color System

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-05-30
- Explicit approval: user replied `approve spec` after the saved spec approval gate.
- Progress and summary files read: `_workflow/runs/work/progress.md`, `_workflow/runs/work/summary.md`
- Detailed spec sections used: affected surfaces, dependency map, data/state impact, UX expectations, execution strategy, verification strategy, acceptance criteria, edge cases, risks, assumptions, open questions, and task extraction notes.
- Applied skill: design-taste-frontend

## TASK-001: Establish semantic theme tokens and unify shared chrome
- Status: Done
- Objective: Add contract tests, define the centralized semantic token layer, and migrate shared shell, header, navigation, mobile drawer, buttons, and foundational public colors.
- Files likely affected: `client/src/index.css`, `client/test/site-pages.test.jsx`
- Checklist: token contract Red; root theme Green; shared chrome migration; drawer gold-as-accent treatment; targeted tests; refactor scan.
- Iteration plan:
  - Iteration 1 Build: add failing semantic token/root-consumption tests; define tokens and migrate foundational rules.
  - Iteration 2 Refine: add failing mobile drawer token assertions; remove orange primary drawer treatment and verify states.
  - Iteration 3 Polish: add selector-literal scan guard and centralize remaining shared/public literal values without changing layout.
- Test plan: `npm run test --prefix client -- site-pages.test.jsx`
- Red/Green/Refactor evidence: record in progress during execution.
- Verification commands: targeted Vitest, literal scan, `git diff --check`.
- Acceptance criteria: shared shell and drawer consume semantic tokens; gold remains restrained; required root roles exist.
- Stop condition: stop if migration requires layout or behavior changes.
- Out-of-scope: routes, logic, structure, backend.

## TASK-002: Reconcile Booking and Admin operational surfaces
- Status: Done
- Objective: Migrate Booking and Admin login/dashboard/tables/forms/status controls to shared semantic tokens with accessible restrained states.
- Files likely affected: `client/src/index.css`, `client/test/booking-flow.test.jsx`, `client/test/admin-dashboard.test.jsx`, `client/test/site-pages.test.jsx`
- Checklist: Booking contract Red; Admin contract Red; migrate surfaces; semantic state treatment; render tests; refactor review.
- Iteration plan:
  - Iteration 1 Build: add failing Booking semantic usage assertions; migrate Booking colors.
  - Iteration 2 Refine: add failing Admin semantic usage assertions; migrate Admin and state colors.
  - Iteration 3 Polish: verify state contrast intent, feedback surfaces, focus states, and render regressions.
- Test plan: targeted Booking/Admin/site Vitest files.
- Red/Green/Refactor evidence: record in progress during execution.
- Verification commands: targeted Vitest, strict literal scan, `git diff --check`.
- Acceptance criteria: Booking no longer resembles orange dashboard; Admin belongs to brand and retains operational clarity.
- Stop condition: stop if behavior changes are required.
- Out-of-scope: data flow, authentication, API, backend.

## TASK-003: Complete stylesheet sweep and final verification
- Status: Done
- Objective: Close remaining reusable literal gaps across public/shared/modal styling, prove strict source-of-truth compliance, and run full verification.
- Files likely affected: `client/src/index.css`, `client/test/site-pages.test.jsx`, workflow artifacts.
- Checklist: strict scan Red if literals remain; migrate leftovers; document exceptions if unavoidable; full tests; lint; build; screenshot if available; diff audit.
- Iteration plan:
  - Iteration 1 Build: enforce global selector-rule no-literal scan and remove remaining reusable literals.
  - Iteration 2 Refine: run full frontend regression and recover in-scope failures.
  - Iteration 3 Polish: final taste review, screenshot attempt, diff audit, security/junk scan.
- Test plan: full frontend Vitest, lint, build, diff check, source scan.
- Red/Green/Refactor evidence: record in progress during execution.
- Verification commands: `npm run test --prefix client`, `npm run lint --prefix client`, `npm run build --prefix client`, `git diff --check`, source literal scan.
- Acceptance criteria: all approved spec criteria checked; future color changes primarily occur in `:root`.
- Stop condition: stop with Needs Human Review if verification cannot prove the refactor.
- Out-of-scope: unrelated cleanup and redesign.
