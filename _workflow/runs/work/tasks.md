# Task Plan: Homepage Gallery Feature

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: `2026-05-30`
- Explicit approval: User replied `approve spec` before task generation.
- Progress and summary files read: progress absent before planning; summary absent before planning.
- Spec sections used: affected surfaces, dependency map, data/state impact, UX expectations, strategy, verification, acceptance, edges, risks, assumptions, open questions, extraction notes, frontend taste.

Applied skill: design-taste-frontend

## TASK-001: Replace homepage service teaser with linked six-card GalleryFeature
- Status: Done
- Lifecycle: `Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done`
- Objective: Deliver one premium homepage gallery teaser and retire stale homepage teaser/anchor code without affecting Gallery, Services, or Booking elsewhere.
- Files affected: `client/test/site-pages.test.jsx`, `client/src/components/home/GalleryFeature.jsx`, `client/src/pages/Home.jsx`, `client/src/components/home/Hero.jsx`, `client/src/constants/homepage.js`, `client/src/index.css`, deleted `client/src/components/home/GalleryPreview.jsx`, deleted `client/src/components/home/ServiceCard.jsx`.

### Checklist
- [x] Add desired-behavior Vitest assertions first and observe Red.
- [x] Add `GalleryFeature` sourced from first six `galleryItems`.
- [x] Render one card Link per image and one CTA Link.
- [x] Update homepage order and stale `/gallery` redirects.
- [x] Add scoped editorial responsive CSS and preserve reveal behavior.
- [x] Scan and remove safely unused code.
- [x] Verify targeted test, lint, build, served-app smoke, diff, and reference scans.
- [~] Run full frontend suite: attempted; three unrelated stale-date booking-flow assertions fail because May 27, 2026 is before current date May 30, 2026.

### Iteration 1 Build
- Goal: Establish desired homepage behavior and composition.
- Changes made: Added test expectations, GalleryFeature, Home composition, Hero/header redirects, baseline feature CSS.
- Test plan: Update homepage Vitest first; run targeted Red and Green.
- Red phase evidence: Targeted Vitest failed 7 expected assertions against old implementation.
- Green phase evidence: Implemented scoped behavior; corrected three test-scope expectations; targeted suite passed 20 tests.
- Refactor phase evidence: Kept footer service links intentionally, aligned mobile Services expectation to `/gallery`, matched grouped CSS selector.
- Test commands run: `npm run test --prefix client -- site-pages.test.jsx`.
- Verification command/result: Passed, 20 tests.
- Review findings: Core feature shape correct.
- Acceptance status: Passed.
- Remaining issues: Refine responsive gutters and clean obsolete code.
- Next action: Iteration 2.

### Iteration 2 Refine
- Goal: Harden smallest-phone layout while retaining accessibility and motion behavior.
- Changes made: Added a 480px GalleryFeature side-gutter override.
- Test plan: Add CSS-source assertion first; observe failure; add scoped rule; rerun.
- Red phase evidence: Targeted Vitest failed one expected missing small-phone gutter assertion.
- Green phase evidence: Added scoped rule; targeted suite passed 20 tests.
- Refactor phase evidence: Reviewed responsive cascade and retained separate 480px override to avoid tablet changes.
- Test commands run: `npm run test --prefix client -- site-pages.test.jsx`.
- Verification command/result: Passed, 20 tests.
- Review findings: One-column mobile layout, offset reset, visible focus, and reduced-motion handling are present.
- Acceptance status: Passed.
- Remaining issues: Cleanup only.
- Next action: Iteration 3.

### Iteration 3 Polish
- Goal: Remove obsolete homepage-only code, audit scope, and prove final quality.
- Changes made: Deleted old components, removed old constants and CSS, corrected minor selector indentation.
- Test plan: Run production reference scan as cleanup Red; delete only proven-obsolete code; run scan, targeted test, lint, build, served-app smoke, and diff checks.
- Red phase evidence: `rg` found old components, constants, derived arrays, and legacy CSS hooks before cleanup.
- Green phase evidence: Production `rg` scan reports no obsolete references; targeted Vitest passed 20 tests; lint and build passed.
- Refactor phase evidence: Corrected selector formatting; targeted Vitest and `git diff --check` passed after the formatting edit.
- Test commands run: targeted Vitest, full Vitest attempt, lint, build, Vite dev smoke curl, reference scan, diff check.
- Verification command/result: Feature-scoped checks passed. Full Vitest attempt has three unrelated stale May 27 booking-test failures.
- Review findings: No scope creep, generated junk, secrets, stale production references, or CSS collision detected. Screenshot unavailable because no Chromium/Playwright tooling exists.
- Acceptance status: Passed for scoped feature; full-suite limitation documented.
- Remaining issues: Booking-flow tests need a separate date-stability repair.
- Next action: Final workflow artifacts.

### Acceptance Result
- [x] Final homepage order matches approved spec.
- [x] Old teaser rendering removed.
- [x] First six gallery entries rendered.
- [x] Individual card `/gallery` Links with lazy images and accessible content.
- [x] CTA `/gallery` Link.
- [x] Header/Hero redirect to `/gallery`.
- [x] Premium responsive/focus/reveal CSS.
- [x] Safely unused teaser code removed.
- [x] Relevant test, lint, build, served-app smoke, reference scan, and diff audit pass.
- [~] Screenshot: unavailable because browser automation tooling is absent; code-surface and served-app smoke fallback completed.

### Stop Condition
No in-scope stop condition reached.

### Out-of-Scope Items
Gallery page redesign, backend/API/database, dependencies, assets, Tailwind migration, unrelated booking-test stabilization.
