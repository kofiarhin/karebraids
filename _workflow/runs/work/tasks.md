# Task Plan: KareBraids Homepage and Gallery Architecture Redesign

## Planning Metadata
- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-01
- Explicit spec approval: user replied `approve spec` on 2026-06-01 before this plan was generated.
- Progress read: `_workflow/runs/work/progress.md`
- Summary read: `_workflow/runs/work/summary.md`
- Derivation: detailed spec Sections 11–22, especially affected surfaces, dependency map, data impact, UX/API expectations, execution strategy, verification, acceptance criteria, edge cases, risks, assumptions, open questions, and task extraction notes.
- Applied skill: design-taste-frontend

## Lifecycle
`Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done`

## TASK-001: Expose backend-owned gallery metadata through the public API
- Status: Done
- Objective: Add approximately 20 remote gallery metadata records and `GET /api/gallery` with confirmed safe `limit` behavior.
- Files likely affected: `server/constants/gallery.js`, `server/controllers/galleryController.js`, `server/routes/galleryRoutes.js`, `server/app.js`, `server/tests/gallery.test.js`.
- Checklist: write endpoint tests first; implement metadata/router/controller; validate positive integer slicing; verify invalid-value fallback; run full server suite.
- Acceptance criteria: API returns all records by default; `limit=4` returns first four; invalid limits return all with HTTP 200; metadata is backend-owned and remote URL-only.
- Verification commands: `npm run test:server -- --runTestsByPath server/tests/gallery.test.js`, `npm run test:server`.
- Stop condition: stop if the public endpoint cannot be proven without unrelated backend changes.
- Out of scope: database model, CMS, uploads.
### Iteration 1 Build
- Goal: establish endpoint contract Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.
### Iteration 2 Refine
- Goal: harden malformed limit behavior Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.
### Iteration 3 Polish
- Goal: prove full backend regression safety Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.

## TASK-002: Migrate gallery surfaces to the shared TanStack Query boundary
- Status: Done
- Objective: Add API service/hook, render all fetched gallery items on `/gallery`, render four fetched preview items on Home, and filter known gallery styles client-side with safe states.
- Files likely affected: `client/src/services/galleryService.js`, `client/src/hooks/queries/useGalleryItems.js`, `client/src/pages/Gallery.jsx`, `client/src/components/home/GalleryFeature.jsx`, tests, scoped CSS.
- Checklist: write failing hook/page tests first; add service/hook; retain modal behavior; add loading/error/empty states; add filter fallback; use `limit: 4` preview.
- Acceptance criteria: both surfaces use `useGalleryItems`; full gallery and four-item preview work; known filters narrow results; invalid filters show all; safe states accessible.
- Verification commands: targeted Vitest files, full client Vitest, lint, build.
- Stop condition: stop if migration breaks modal accessibility or requires unrelated state changes.
- Out of scope: Redux, server-side category filtering.
### Iteration 1 Build
- Goal: establish API-backed UI Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.
### Iteration 2 Refine
- Goal: add filtering and state hardening Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.
### Iteration 3 Polish
- Goal: retain accessibility and responsive behavior Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.

## TASK-003: Add reusable service details, reviews, redirects, and booking preselection
- Status: Done
- Objective: Create six canonical `/services/:slug` pages, legacy redirects, safe unknown fallback, reusable reviews, and booking query preselection.
- Files likely affected: shared frontend config, `client/src/App.jsx`, new detail/review/redirect components, `client/src/pages/Booking.jsx`, tests, scoped CSS.
- Checklist: write route/preselection tests first; centralize six style records; render detail architecture; redirect valid legacy URLs; fall back invalid slugs; initialize valid booking query safely.
- Acceptance criteria: six canonical pages; detail sections; reusable mock reviews with verified-client metadata; redirects/fallbacks; booking preselection.
- Verification commands: targeted Vitest, full client Vitest, lint, build.
- Stop condition: stop if existing booking submission behavior cannot be preserved.
- Out of scope: backend style API, review submission API.
### Iteration 1 Build
- Goal: establish detail and redirect architecture Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.
### Iteration 2 Refine
- Goal: integrate safe booking preselection Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.
### Iteration 3 Polish
- Goal: harden detail accessibility/responsiveness Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.

## TASK-004: Recompose the homepage funnel below the unchanged Hero
- Status: Done
- Objective: Deliver the confirmed below-Hero conversion sequence with data-driven reusable sections and a robust testimonial carousel.
- Files likely affected: `client/src/pages/Home.jsx`, homepage config, home components, tests, scoped CSS. `Hero.jsx` is locked.
- Checklist: write homepage order/carousel tests first; add six categories; refine featured links; keep four API-backed gallery preview; build eight-item carousel with controls/autoplay/pause/swipe; render trust reasons, booking steps, CTA; visually review.
- Acceptance criteria: exact section order; requested counts/content/links; accessible responsive carousel; Hero source unchanged.
- Verification commands: targeted Vitest, full client Vitest, lint, build, `git diff -- client/src/components/home/Hero.jsx`, screenshot attempt.
- Stop condition: stop if Hero must be edited or visual verification cannot be attempted/documented.
- Out of scope: Hero changes, unrelated global redesign.
### Iteration 1 Build
- Goal: establish funnel composition Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.
### Iteration 2 Refine
- Goal: harden carousel interactions Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.
### Iteration 3 Polish
- Goal: audit mobile visual quality, reduced motion, and locked Hero Red -> Green -> Refactor.
- Changes/test plan/evidence/result/review/next action: completed; evidence recorded in `_workflow/runs/work/progress.md`.
