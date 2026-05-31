# Task Plan: Premium Homepage Testimonial Carousel

## Plan Metadata
- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-05-31
- Explicit spec approval: User replied `approve spec` before this task plan was generated.
- Progress and summary files read: `_workflow/runs/work/progress.md`, `_workflow/runs/work/summary.md`
- Detailed spec sections used: Affected Surfaces, Dependency And Integration Map, Data And State Impact, UX / API / Workflow Expectations, Execution Strategy, Verification Strategy, Acceptance Criteria, Edge Cases And Failure Modes, Risks And Mitigations, Assumptions, Open Questions, Task Extraction Notes.
- Applied skill: design-taste-frontend

## TASK-001: Add a manual-only premium homepage testimonial carousel
- Status: Done
- Objective: Replace the static homepage testimonial card with one array-driven, accessible, responsive carousel that exposes five supplied testimonials through manual looped arrows and avatar indicators.
- Files likely affected: `client/src/constants/homepage.js`, `client/src/components/home/TestimonialSection.jsx`, `client/src/index.css`, `client/test/site-pages.test.jsx`.

### Checklist
- [x] Add five supplied homepage testimonials as array data with `name`, `review`, `rating`, and avatar path or initials fallback metadata.
- [x] Render the active testimonial from array data with local state.
- [x] Add accessible previous/next buttons with infinite modulo wrapping.
- [x] Add accessible avatar indicators with active styling and direct selection.
- [x] Add zero-padded counter, gold stars, quote icon, rounded dark luxury card, supporting copy, and calm transitions.
- [x] Preserve desktop split composition and mobile stack.
- [x] Verify no autoplay behavior or heavy dependency exists.

### Iteration 1 Build
- Goal: Establish array-driven manual navigation and bidirectional wrapping.
- Changes made: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Test plan: Update homepage Vitest assertions first for initial data, next wrap, and previous wrap; observe expected failure; implement smallest passing data and stateful UI; rerun and refactor.
- Red phase evidence: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Green phase evidence: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Refactor phase evidence: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Test commands run: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Verification command/result: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Review findings: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Acceptance status: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Remaining issues: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Next action: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.

### Iteration 2 Refine
- Goal: Add direct avatar selection, accessible active state, counter, and responsive premium layout assertions.
- Changes made: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Test plan: Add desired accessibility and CSS hook assertions first; observe failure; add smallest scoped markup/CSS refinement; rerun and refactor.
- Red phase evidence: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Green phase evidence: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Refactor phase evidence: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Test commands run: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Verification command/result: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Review findings: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Acceptance status: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Remaining issues: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Next action: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.

### Iteration 3 Polish
- Goal: Harden fallback initials, reduced-motion treatment, calm transitions, and complete verification.
- Changes made: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Test plan: Add desired fallback/transition/reduced-motion CSS assertions first; observe failure; add scoped hardening; rerun targeted and full checks.
- Red phase evidence: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Green phase evidence: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Refactor phase evidence: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Test commands run: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Verification command/result: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Review findings: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Acceptance status: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Remaining issues: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.
- Next action: Completed. See the matching iteration entry in `_workflow/runs/work/progress.md` for detailed TDD-first evidence.

### Test Plan
- React Testing Library interaction coverage for initial slide, forward navigation, forward wrap, reverse wrap, and direct avatar selection.
- CSS surface assertions for desktop split, mobile stack, active styling, calm transitions, and reduced motion.
- Full client tests, lint, build, and root development startup smoke.

### Red Phase Evidence
Completed per iteration. Full evidence is recorded in `_workflow/runs/work/progress.md`.

### Green Phase Evidence
Completed per iteration. Full evidence is recorded in `_workflow/runs/work/progress.md`.

### Refactor Phase Evidence
Completed per iteration. Full evidence is recorded in `_workflow/runs/work/progress.md`.

### Test Commands Run
Completed per iteration. Full evidence is recorded in `_workflow/runs/work/progress.md`.

### Acceptance Criteria
- [x] Five array-driven supplied testimonials with required fields exist.
- [x] Carousel changes only through manual controls and wraps in both directions.
- [x] Accessible avatar controls activate any testimonial and expose the active item.
- [x] Zero-padded counter, premium dark luxury card, gold stars, quote icon, and calm transitions exist.
- [x] Desktop split and mobile stack are preserved.
- [x] Targeted and full frontend verification passes.

### Acceptance Result
All criteria met. See `_workflow/runs/work/progress.md` for Build, Refine, and Polish Red -> Green -> Refactor evidence.

### Verification Commands
- `npm run test --prefix client -- site-pages.test.jsx`
- `npm run test --prefix client`
- `npm run lint --prefix client`
- `npm run build --prefix client`
- `npm run dev`

### Stop Condition
Stop with `Needs Human Review` if scoped recovery cannot prove required behavior or verification cannot run.

### Out-of-Scope Items
Backend/API/database changes, autoplay, swipe handling, broad homepage redesign, new dependencies, and non-testimonial refactors.
