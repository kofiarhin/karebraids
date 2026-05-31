# Task Plan: About Page Dark Luxury Alignment

## Plan Metadata
- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-05-31
- Explicit approval: User replied `approve spec` before task generation.
- Progress and summary files read: `_workflow/runs/work/progress.md`, `_workflow/runs/work/summary.md`.
- Spec sections used: affected surfaces, dependency map, data impact, UX expectations, execution strategy, verification strategy, acceptance criteria, edge cases, risks, assumptions, open questions, and task extraction notes.

## TASK-001: Align About founder story with shared dark-luxury styling
- Status: Done
- Lifecycle: Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done
- Objective: Remove heavy About-only panels and render a subtle editorial founder story surface while preserving behavior and responsive structure.
- Files affected: `client/src/index.css`, `client/test/site-pages.test.jsx`, workflow and polish artifacts.
- Checklist:
  - [x] Replace stale heavy-panel contract assertions.
  - [x] Add requested subtle story surface and border through centralized tokens.
  - [x] Remove About backing pseudo-elements.
  - [x] Retain subtle image border and shared dark page background.
  - [x] Prove mobile stack and scope safety.

### Iteration 1 Build
- Goal: Add failing surface contract and implement minimal About CSS.
- Changes made: Added About-only minimal background, card, image, and pseudo-element disabling rules.
- Test plan: Assert subtle card surface, image border, and disabled backing panels first.
- Red phase evidence: Targeted Vitest failed with 1 expected missing-contract assertion.
- Green phase evidence: Targeted Vitest passed 23 tests after CSS implementation.
- Refactor phase evidence: Reviewed cascade, retained JSX/layout, passed whitespace and targeted rerun.
- Test commands run: `npm run test --prefix client -- site-pages.test.jsx`; `git diff --check`.
- Verification command/result: Passed.
- Review findings: Scoped CSS only.
- Acceptance status: Build criteria met.
- Remaining issues: Narrow-phone cleanup.
- Next action: Iteration 2 Refine.

### Iteration 2 Refine
- Goal: Prove mobile spacing remains calm and readable.
- Changes made: Added About-only 480px gap and card-padding adjustments.
- Test plan: Assert narrow-phone gap and padding first.
- Red phase evidence: Targeted Vitest failed with 1 expected mobile-contract assertion.
- Green phase evidence: Targeted Vitest passed 23 tests.
- Refactor phase evidence: Reused existing 840px stack; whitespace passed.
- Test commands run: `npm run test --prefix client -- site-pages.test.jsx`; `git diff --check`.
- Verification command/result: Passed.
- Review findings: Mobile structure preserved.
- Acceptance status: Responsive criteria met.
- Remaining issues: Small-phone image hardening and full verification.
- Next action: Iteration 3 Polish.

### Iteration 3 Polish
- Goal: Harden smallest-phone image size and complete regressions.
- Changes made: Added compact mobile image height; centralized RGBA values as `--about-surface-glass` and `--about-border-glass` after strict token-guard recovery.
- Test plan: Assert compact image height first, then run full checks.
- Red phase evidence: Targeted Vitest failed with 1 expected mobile-image assertion.
- Green phase evidence: Targeted Vitest passed 23 tests.
- Refactor phase evidence: Full suite exposed selector literals; centralized tokens and reran full suite successfully: 42 tests.
- Test commands run: targeted/full client Vitest, client lint/build, server Jest, whitespace, HTTP smoke, selector scan, browser-tool scan, diff audit.
- Verification command/result: Passed; screenshot unavailable due missing browser binary.
- Review findings: Scoped About-only implementation with code-surface visual fallback passed.
- Acceptance status: All criteria met.
- Remaining issues: None blocking.
- Next action: Commit and PR record.

- Acceptance result: All approved criteria `[x]`.
- Stop condition: None reached.
- Out-of-scope items respected: JSX, routes, API, schema, dependencies, shared design refactor, and unrelated page implementation.

Applied skill: design-taste-frontend
