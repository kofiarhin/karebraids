# Task Plan — Representative Local Image Library Refactor

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-08
- Approval: Explicit user response `approve spec`
- Progress and summary files read: `_workflow/runs/work/progress.md`, `_workflow/runs/work/summary.md`
- Spec sections used: Current State, Desired End State, Scope, Functional Requirements, Affected Surfaces, Dependency Map, Data/State Impact, UX Expectations, Execution Strategy, Verification Strategy, Acceptance Criteria, Edge Cases, Risks, Assumptions, Task Extraction Notes.
- Applied skill: design-taste-frontend

## TASK-001: Establish the local representative image and service compatibility contract
- Status: Done
- Objective: Make `imageLibrary.js` the sole source of curated image paths and make local service/gallery compatibility helpers derive representative visuals without service classification.
- Files likely affected: `client/src/data/imageLibrary.js`, `client/src/data/services.js`, new focused Vitest files.
- Checklist:
  - [ ] Add failing tests for required image fields, local real paths, usage, deterministic display selection, and gallery semantics.
  - [ ] Add failing tests for service business fields, derived image aliases, and non-classifying gallery helpers.
  - [ ] Replace remote image library records with existing public filenames.
  - [ ] Remove service-owned gallery image arrays and derive compatibility fields.
- Iteration 1 Build: Red with contract tests; Green with minimum local library/service adapter; Refactor shared metadata/selection.
- Iteration 2 Refine: Red for empty/unknown seeds and specific/all service gallery context; Green edge behavior; Refactor stable helper shapes.
- Iteration 3 Polish: Red/search for duplicate curated paths and remote URLs; Green cleanup; Refactor naming/documentation without behavior change.
- Test plan: Focused Vitest plus path-existence script/search.
- Red phase evidence: Recorded in `_workflow/runs/work/progress.md`.
- Green phase evidence: Recorded in `_workflow/runs/work/progress.md`.
- Refactor phase evidence: Recorded in `_workflow/runs/work/progress.md`.
- Test commands run: Recorded in `_workflow/runs/work/progress.md` and `_workflow/runs/work/verification.md`.
- Acceptance criteria: Local paths only; required exports/fields; service compatibility derived from `getDisplayImage`; no image classification.
- Acceptance result: [x] All criteria met.
- Verification commands: Focused Vitest, `rg`, Node path validation.
- Stop condition: Helper contracts pass and no curated path exists outside the library.
- Out-of-scope items: Backend schema/API changes; UI redesign.

## TASK-002: Make preview and UI rendering use representative image authority
- Status: Done
- Objective: Ensure current service/gallery/home rendering ignores API/service-owned image metadata and uses generic representative semantics while preserving interactions.
- Files likely affected: `client/src/utils/servicePreview.js`, Gallery/Services/ServiceDetail pages, homepage components/constants, related tests.
- Checklist:
  - [ ] Add failing tests proving service preview ignores primary/gallery remote image fields.
  - [ ] Add failing UI tests for required gallery title/disclaimer/filter phrase/captions and generic alt text.
  - [ ] Update render adapters/components/constants without changing layout, booking, modal, or filter behavior.
  - [ ] Remove remaining frontend remote Pexels URLs and prohibited exact-service claims.
- Iteration 1 Build: Red preview/UI semantic tests; Green minimum helper/copy changes; Refactor shared representative constants.
- Iteration 2 Refine: Red service filter and modal/card compatibility edge cases; Green contextual behavior; Refactor repeated captions/alt text.
- Iteration 3 Polish: Red repository semantic searches; Green final cleanup; Refactor code clarity while preserving visuals.
- Test plan: Focused component/helper Vitest, existing Gallery/Services/ServiceDetail/home tests, semantic searches.
- Red phase evidence: Recorded in `_workflow/runs/work/progress.md`.
- Green phase evidence: Recorded in `_workflow/runs/work/progress.md`.
- Refactor phase evidence: Recorded in `_workflow/runs/work/progress.md`.
- Test commands run: Recorded in `_workflow/runs/work/progress.md` and `_workflow/runs/work/verification.md`.
- Acceptance criteria: Required copy present; prohibited copy absent; generic alt/caption semantics; masonry/modal/filter/booking paths preserved.
- Acceptance result: [x] All criteria met.
- Verification commands: Focused/full client tests, lint, build, `rg` checks.
- Stop condition: UI semantics are truthful and existing interactions pass tests.
- Out-of-scope items: Visual redesign, new state management, API logic changes.

## TASK-003: Verify compatibility and complete workflow quality gates
- Status: Done
- Objective: Prove the full refactor, inspect backend compatibility, and complete review/Fallow/release artifacts.
- Files likely affected: Workflow artifacts and `.workflow/fallow-audit.md`; backend only if a verified failure requires it.
- Checklist:
  - [ ] Run required server/client/build commands.
  - [ ] Run lint, path/remote/copy searches, and final diff audit.
  - [ ] Inspect backend controller/data/model compatibility and document no-change decision or scoped fix.
  - [ ] Complete review, Fallow audit, release notes, summary, handoff, Project Brain, and health check.
- Iteration 1 Build: Execute required verification and recover scoped failures.
- Iteration 2 Refine: Audit paths, semantics, backend compatibility, and diff scope.
- Iteration 3 Polish: Fallow, final UI code-surface review/screenshot if runtime available, and artifact reconciliation.
- Test plan: `npm test`, `npm run test --prefix client`, `npm run build --prefix client`, lint, searches.
- Red phase evidence: Documentation-only exception unless verification reveals a behavioral failure.
- Green phase evidence: Pending.
- Refactor phase evidence: Pending.
- Test commands run: Recorded in `_workflow/runs/work/progress.md` and `_workflow/runs/work/verification.md`.
- Acceptance criteria: Every spec criterion checked; no unverified code; workflow health recorded.
- Acceptance result: [x] All criteria met.
- Verification commands: Required commands plus `git diff --stat`, `git diff`, `git diff --check`, Fallow JSON commands.
- Stop condition: Complete or documented Needs Human Review according to verification outcomes.
- Out-of-scope items: Unrelated baseline cleanup.
