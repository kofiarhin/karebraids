# KareBraids Pre-Launch Updates Task Plan

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-12
- Execution mode: `complete-workflow`
- Progress read: `_workflow/runs/work/progress.md`
- Summary read: `_workflow/runs/work/summary.md`
- Handoff read: `_workflow/runs/work/handoff.md`
- Detailed spec sections used: Current State Analysis, Desired End State, Scope, Functional/Non-Functional Requirements, Affected Surfaces, Dependency Map, Data Impact, UX/API Expectations, Execution Strategy, Verification Strategy, Acceptance Criteria, Edge Cases, Risks, Assumptions, Open Questions, and Task Extraction Notes.
- Applied skill: design-taste-frontend

## TASK-001: Make starting prices consistent from canonical data to every card
- Status: Done
- Objective: Retain all current backend prices, remove redundant editable seed aliases, align the offline fallback catalogue, and make every public price label use one shared formatter.
- Files likely affected: `server/data/services.json`, serializer/seed tests, `client/src/data/services.js`, `client/src/services/serviceService.js`, new pricing utility/tests, Services/Gallery/Booking/ServiceDetail/home components.
- Checklist:
  - [ ] Add failing tests for canonical seed prices, compatibility aliases, fallback alignment, shared formatting, and missing-price behavior.
  - [ ] Keep one editable `startingPrice` per backend seed service and preserve API aliases.
  - [ ] Make the frontend fallback catalogue derive from one client catalogue with values matching backend truth.
  - [ ] Replace component-local money formatting.
- Iteration 1 Build: Red tests for price invariants/formatter; Green minimal canonicalization; Refactor shared imports.
- Iteration 2 Refine: Red edge cases for legacy alias/missing price; Green safe fallback labels; Refactor naming.
- Iteration 3 Polish: Red regression assertions for all renderers; Green complete migration; Refactor duplicate code audit.
- Test plan: Jest seed/serializer tests; Vitest formatter/service data and affected component tests.
- Red phase evidence: To record in progress.
- Green phase evidence: To record in progress.
- Refactor phase evidence: To record in progress.
- Test commands run: To record in progress.
- Acceptance criteria: Current values unchanged; one seed price field; API aliases equal; all UI consumers shared; no fabricated `£0`.
- Acceptance result: [x] Complete; see `_workflow/runs/work/progress.md`.
- Verification commands: Focused Jest/Vitest, `rg` duplicate formatter audit.
- Stop condition: Any current service price cannot be reconciled without guessing.
- Out-of-scope items: Client-approved replacement pricing and admin price redesign.

## TASK-002: Harden representative style and gallery image mappings
- Status: Done
- Objective: Validate image IDs/paths, preserve uncertain semantic assignments, and make style-context alt text accurate and accessible across cards, detail, gallery, and modal.
- Files likely affected: `client/src/data/imageLibrary.js`, `client/src/utils/servicePreview.js`, Gallery/ServiceDetail/home/service cards, related tests, optional audit test/script.
- Checklist:
  - [ ] Add failing invariants for local file existence, unique IDs/src values, and style-aware alt text.
  - [ ] Add a shared service preview descriptor instead of returning only a path.
  - [ ] Pass selected style context into gallery card/modal alt text without claiming ownership.
  - [ ] Preserve undocumented remote cross-service mappings and document uncertainty.
- Iteration 1 Build: Red image invariant/alt tests; Green descriptor/context implementation; Refactor shared helper.
- Iteration 2 Refine: Red fallback/broken-path tests; Green deterministic fallback; Refactor accessibility copy.
- Iteration 3 Polish: Red modal/detail regression tests; Green all consumers migrated; Refactor duplicate alt literals.
- Test plan: Vitest image-library, service-preview, Gallery, ServiceDetail, About data; filesystem audit command.
- Red/Green/Refactor evidence: To record in progress.
- Test commands run: To record in progress.
- Acceptance criteria: Valid unique local mapping; meaningful style-name alt; selected gallery context preserved; uncertainties documented.
- Acceptance result: [x] Complete; see `_workflow/runs/work/progress.md`.
- Verification commands: Focused Vitest plus Node path/hash/invariant script.
- Stop condition: A proposed remap depends on visual guesswork.
- Out-of-scope items: Reclassifying unlabeled photographs or replacing assets.

## TASK-003: Add configurable Karen profile content to About Me
- Status: Done
- Objective: Render a centralized profile image and personal statement with explicit source TODOs and honest placeholder semantics.
- Files likely affected: `client/src/data/aboutPageData.js`, `client/src/components/about/MeetKaren.jsx`, `client/src/pages/About.jsx`, About tests, existing Tailwind classes only.
- Checklist:
  - [ ] Add failing component/data tests for profile image and personal statement.
  - [ ] Add `karenProfile` configuration with TODO markers for final photo and approved copy.
  - [ ] Render responsive photo/statement content without claiming the placeholder is Karen.
  - [ ] Preserve existing useful About content and CTA behavior.
- Iteration 1 Build: Red profile config/render test; Green data-driven content; Refactor component props.
- Iteration 2 Refine: Red accessibility/responsive structure test; Green semantic figure/blockquote; Refactor copy hierarchy.
- Iteration 3 Polish: Red regression tests; Green final Tailwind polish; Refactor no unrelated styling.
- Test plan: About Vitest and client build; browser screenshot at mobile/desktop if available.
- Acceptance criteria: Photo area and statement visible, centralized, honest placeholder, mobile-friendly.
- Acceptance result: [x] Complete; see `_workflow/runs/work/progress.md`.
- Stop condition: Placeholder would be represented as verified client content.
- Out-of-scope items: Inventing biography or commissioning a photo.

## TASK-004: Add dormant product catalogue architecture
- Status: Done
- Objective: Define future hair-extension and hair-product/oil domain vocabulary and an empty catalogue without exposing ecommerce.
- Files likely affected: `server/constants/products.js`, `server/tests/product-catalog.test.js`, durable architecture documentation if warranted.
- Checklist:
  - [ ] Add failing tests for immutable categories/types/statuses and empty default catalogue.
  - [ ] Add a small internal constants/data module with TODO guidance.
  - [ ] Prove no product route/component/API is introduced.
- Iteration 1 Build: Red domain-shape test; Green constants module; Refactor exports.
- Iteration 2 Refine: Red mutation/invalid-entry validation test; Green freeze/validator; Refactor messages.
- Iteration 3 Polish: Red no-public-exposure audit; Green docs/TODO; Refactor scope.
- Test plan: Focused Jest and route/import audit.
- Acceptance criteria: Supports extensions and oils structurally; no commerce behavior/UI/API.
- Acceptance result: [x] Complete; see `_workflow/runs/work/progress.md`.
- Stop condition: Implementation starts requiring provider, inventory, checkout, or schema decisions.
- Out-of-scope items: All ecommerce functionality.

## TASK-005: Verify and release the complete pre-launch update
- Status: Done
- Objective: Run integrated tests/lint/build/manual UI review, final diff audit, Fallow Quality, review, release notes, summary, handoff, and health check.
- Files likely affected: Tests as needed and workflow artifacts only.
- Checklist:
  - [ ] Run server/client tests, lint, build, data/path audits.
  - [ ] Capture screenshots for perceptible About/gallery/card changes when browser automation is available.
  - [ ] Run design-taste-frontend final code/UI review.
  - [ ] Run final diff audit and mandatory Fallow JSON audit.
  - [ ] Complete review/release/summary/handoff/health artifacts.
- Iteration 1 Build: Integrated verification and targeted recovery.
- Iteration 2 Refine: Review findings and regression fixes.
- Iteration 3 Polish: Final audits, screenshots, artifacts, and acceptance reconciliation.
- Test plan: All package scripts and manual/browser checks described by the spec.
- Acceptance criteria: Full request proven or explicit environment limitations documented.
- Acceptance result: [x] Complete with documented environment warnings; see `_workflow/runs/work/progress.md`.
- Verification commands: `npm test`, `npm test --prefix client`, `npm run lint --prefix client`, `npm run build --prefix client`, Fallow commands, `git diff --check`.
- Stop condition: In-scope regression cannot be fixed or verified.
- Out-of-scope items: Baseline unrelated cleanup.
