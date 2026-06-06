# Task Plan — Theme-aware Header Navigation

- Spec used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-06
- Progress read: `_workflow/runs/work/progress.md`
- Summary read: `_workflow/runs/work/summary.md`
- Approval basis: direct user implementation order with complete requirements; recorded in spec.
- Spec sections used: current state, desired state, scope, affected surfaces, integration map, UX expectations, execution/verification strategy, acceptance criteria, edge cases, risks, assumptions, task extraction notes.

Applied skill: design-taste-frontend

### TASK-001: Make desktop and mobile navigation follow the resolved theme

- Status: Needs Human Review
- Objective: Add an explicit semantic header token contract for light/dark themes and migrate all header, navigation, ThemeMenu, and mobile navigation styling to that contract without changing runtime behavior.
- Files likely affected: `client/src/index.css`, `client/src/theme/ThemeBootstrap.test.js`, run-scoped workflow artifacts.
- Checklist:
  - Add static regression coverage first.
  - Define explicit light/dark header semantic tokens.
  - Replace dark-only header/mobile/menu style values with semantic roles.
  - Preserve CTA/trigger hierarchy and active/focus visibility.
  - Run targeted/full verification and visual/code review.
- Iteration 1 Build: Red assertions for explicit theme roles and core header consumption; Green minimal CSS token migration; Refactor naming/cascade.
- Iteration 2 Refine: Red audit/assertions for mobile and ThemeMenu coverage; Green migrate remaining selectors; Refactor duplicate overrides.
- Iteration 3 Polish: Red acceptance/cascade audit; Green final contrast/hierarchy adjustments if needed; Refactor and verify unchanged runtime code.
- Test plan: `npm run test --prefix client -- src/theme/ThemeBootstrap.test.js`, full client test, lint, build.
- Red phase evidence: recorded in progress/verification for all three iterations.
- Green phase evidence: recorded in progress/verification for all three iterations.
- Refactor phase evidence: recorded in progress/verification for all three iterations.
- Test commands run: targeted/full Vitest, independent recovery/baseline tests, lint, build, diff check, Fallow.
- Acceptance criteria: all criteria in spec section 17.
- Acceptance result: functional criteria met; repository-wide test/lint criterion partial due confirmed baseline failures.
- Verification commands: targeted/full Vitest, ESLint, Vite build, diff check, optional screenshot.
- Stop condition: all desktop/mobile selectors consume semantic theme roles and verification passes; otherwise `Needs Human Review`.
- Out of scope: runtime theme/provider/menu behavior changes, page redesigns, backend work, dependencies.
