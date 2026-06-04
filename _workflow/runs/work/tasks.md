# Task Plan: Fix Vite React Production Routing

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-04
- Progress and summary files read: none existed at start; durable docs read.
- Spec sections used: Current State Analysis, Desired End State, Scope, Affected Surfaces, Dependency Map, UX Expectations, Verification Strategy, Acceptance Criteria, Risks, Task Extraction Notes.

## TASK-001: Make View Styles use React Router navigation

- Status: Done
- Objective: Replace the hero's plain `/gallery` anchor with existing shared Button client-side routing while preserving label and secondary button styling.
- Files likely affected: `client/src/components/home/Hero.jsx`, `client/test/site-pages.test.jsx`
- Checklist:
  - [x] Add test coverage that clicking View Styles renders Gallery.
  - [x] Use shared Button with `to="/gallery"` and `variant="secondary"`.
  - [x] Preserve visible text `View Styles`.
  - [x] Verify targeted tests.
- Iteration plan: Build, Refine, Polish with focused Red -> Green -> Refactor evidence.
- Test plan: `npm run test --prefix client -- test/site-pages.test.jsx test/deployment.test.js`, full client tests, build.
- Acceptance result: [x] complete.
- Verification commands: see progress.
- Stop condition: if Button did not support `to`, use React Router `Link` directly.
- Out-of-scope items: broader UI styling changes.

## TASK-002: Add Vercel SPA rewrite fallback

- Status: Done
- Objective: Add Vercel config for the Vite client app so deep links serve `/`.
- Files likely affected: `client/vercel.json`, `client/test/deployment.test.js`
- Checklist:
  - [x] Add test proving config shape.
  - [x] Add `client/vercel.json` with expected rewrite.
  - [x] Verify targeted tests and build.
- Iteration plan: Build, Refine, Polish with focused Red -> Green -> Refactor evidence.
- Test plan: deployment config test plus build.
- Acceptance result: [x] complete; live production validation awaits deployment.
- Verification commands: see progress.
- Stop condition: if Vercel root is not client, document follow-up.
- Out-of-scope items: changing Vercel dashboard settings.
