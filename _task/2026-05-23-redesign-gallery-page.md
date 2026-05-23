# Task Plan: Redesign Gallery Page

- Spec file used: `_spec/2026-05-23-redesign-gallery-page.md`
- Planning date: 2026-05-23
- Progress and summary files read:
  - `_progress/progress.md`
  - `_summary/README.md`
  - `_handoff/current.md`
- Detailed spec sections used:
  - Section 5 Current State Analysis
  - Section 6 Desired End State
  - Section 7 Scope
  - Section 11 Affected Surfaces
  - Section 12 Dependency And Integration Map
  - Section 13 Data And State Impact
  - Section 14 UX / API / Workflow Expectations
  - Section 15 Execution Strategy
  - Section 16 Verification Strategy
  - Section 17 Acceptance Criteria
  - Section 18 Edge Cases And Failure Modes
  - Section 19 Risks And Mitigations
  - Section 20 Assumptions
  - Section 22 Task Extraction Notes

## Task List

### TASK-001: Expand and redesign gallery image wall

- Status: `Done`
- Priority: `P0`
- Parallel safe: `no`
- Depends on: `none`
- Blocks: `final review, release notes, summary`
- File locks:
  - `client/src/constants/content.js`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `client/test/gallery-modal.test.jsx`
  - `_progress/progress.md`
  - `_handoff/current.md`
- Claim status: `done`
- Claimed by: `Codex`
- Agent role: `sequential implementer`
- Merge risk: `medium`

Objective:
Expand the static Gallery page to about 9 images and replace the current two-column desktop grid with a responsive masonry/asymmetric layout that keeps mobile single-column and preserves the existing modal behavior.

Files likely affected:
- `client/src/constants/content.js`
- `client/src/index.css`
- `client/test/site-pages.test.jsx`
- `client/test/gallery-modal.test.jsx`
- `_progress/progress.md`
- `_handoff/current.md`

Checklist:
- [x] Update or add frontend tests before implementation.
- [x] Expand `galleryItems` to 9 entries with stable IDs, titles, descriptions, images, and aspect classes.
- [x] Replace `.gallery-grid` two-column desktop rule with a masonry/asymmetric CSS Grid.
- [x] Ensure mobile resets to a single-column flow.
- [x] Preserve gallery modal open/close/focus behavior.
- [x] Run frontend tests.
- [x] Run frontend build.
- [x] Document iteration evidence and acceptance results.

Iteration plan for Iteration 1 Build:
- Goal: Establish failing tests for expanded gallery behavior, then implement the minimum content/layout change.
- Changes made: Added gallery count assertion, expanded gallery content, and introduced the 4-column asymmetric grid.
- Test plan: Update `client/test/site-pages.test.jsx` to expect 9 gallery card buttons; run it before implementation to observe failure. Run relevant tests after implementation.
- Red phase evidence: `npm test -- test/site-pages.test.jsx` failed as expected after the count test was corrected: expected 9 `.gallery-card` elements, received 4. Setup recovery before this included `npm install` because `vitest` was missing and correcting the test path from `client/test/site-pages.test.jsx` to `test/site-pages.test.jsx`.
- Green phase evidence: `npm test -- test/site-pages.test.jsx` passed after adding 5 gallery items and replacing the two-column gallery grid.
- Refactor phase evidence: `npm test -- test/site-pages.test.jsx` passed again after review with no behavior-changing cleanup needed.
- Test commands run: `npm install`; `npm test -- test/site-pages.test.jsx`
- Verification command/result: `npm test -- test/site-pages.test.jsx` passed, 3 tests passed.
- Review findings: Initial title-based count matcher was too brittle; corrected to count `.gallery-card` elements.
- Acceptance status: Expanded count and non-two-column layout criteria met in source and tests; modal criteria carried to later iterations.
- Remaining issues: Needed named gallery-wall region and concise card labels.
- Next action: Iteration 2 Refine.

Iteration plan for Iteration 2 Refine:
- Goal: Tighten modal regression coverage and responsive layout hooks.
- Changes made: Added a named gallery-wall region for stable accessibility and layout verification.
- Test plan: Update/confirm modal test coverage for a newly added gallery item and verify the responsive layout class/CSS rule is present.
- Red phase evidence: Added region assertion to `site-pages.test.jsx`; `npm test -- test/site-pages.test.jsx` failed because no accessible region named "Gallery image wall" existed.
- Green phase evidence: Added `role="region"` and `aria-label="Gallery image wall"` to the gallery grid; `npm test -- test/site-pages.test.jsx` passed.
- Refactor phase evidence: `npm test -- test/site-pages.test.jsx` and `npm test -- test/gallery-modal.test.jsx` both passed after review.
- Test commands run: `npm test -- test/site-pages.test.jsx`; `npm test -- test/gallery-modal.test.jsx`
- Verification command/result: Targeted page and modal tests passed.
- Review findings: Modal behavior remained stable with the expanded content.
- Acceptance status: Gallery region, count, modal open/close, and mobile source rules partially verified; final full verification pending.
- Remaining issues: Button accessible names were verbose because image alt/title/description all contributed to the button name.
- Next action: Iteration 3 Polish.

Iteration plan for Iteration 3 Polish:
- Goal: Clean up final CSS/content details and run full frontend verification.
- Changes made: Added concise gallery card accessible labels and ran full frontend verification.
- Test plan: Run `npm test` and `npm run build` from `client`.
- Red phase evidence: Added modal test for exact button name "Outdoor Braid Profile"; `npm test -- test/gallery-modal.test.jsx` failed because the accessible button name included duplicated title/description text.
- Green phase evidence: Added `aria-label={item.title}` to each gallery button; `npm test -- test/gallery-modal.test.jsx` passed.
- Refactor phase evidence: `npm test`, `npm run build`, and `npm run lint` passed after final cleanup/review.
- Test commands run: `npm test -- test/gallery-modal.test.jsx`; `npm test`; `npm run build`; `npm run lint`
- Verification command/result: Full client tests passed, 3 files / 10 tests; Vite build passed; ESLint passed.
- Review findings: Source review confirms `.gallery-grid` uses `repeat(4, minmax(0, 1fr))` and mobile `@media (max-width: 840px)` resets `.gallery-grid` to `grid-template-columns: 1fr` with item spans reset to `auto`.
- Acceptance status: All task acceptance criteria met.
- Remaining issues: Browser visual inspection through the in-app Browser plugin was unavailable because the required Node browser-control tool was not exposed; local route returned HTTP 200.
- Next action: Final review, release notes, summary, and health check.

Test plan:
- `cd client && npm test` passed.
- `cd client && npm run build` passed.
- `cd client && npm run lint` passed.
- Source review of gallery CSS confirms desktop/tablet is not two columns and mobile is single-column.

Red phase evidence:
- Iteration 1: corrected count test failed with 4 actual cards vs 9 expected.
- Iteration 2: named region test failed because the gallery wall had no accessible region.
- Iteration 3: concise button label test failed because the card accessible name included repeated title/description content.

Green phase evidence:
- Iteration 1: targeted page test passed after gallery data and grid implementation.
- Iteration 2: targeted page test passed after adding the named region.
- Iteration 3: targeted modal test passed after adding concise `aria-label` values.

Refactor phase evidence:
- Iteration 1: targeted page test rerun passed.
- Iteration 2: targeted page and modal tests passed.
- Iteration 3: full client tests, build, and lint passed.

Test commands run:
- `npm install`
- `npm test -- test/site-pages.test.jsx`
- `npm test -- test/gallery-modal.test.jsx`
- `npm test`
- `npm run build`
- `npm run lint`

Acceptance criteria:
- [x] The Gallery page renders roughly 9 gallery image cards.
- [x] The desktop/tablet gallery layout no longer uses a two-column grid.
- [x] The mobile gallery layout collapses to a clean single-column flow.
- [x] Clicking a gallery image still opens the modal with the selected item.
- [x] Closing the modal still works with the close button and Escape key, with focus returning to the triggering gallery item.
- [x] Relevant frontend tests and build checks pass, or any inability to run them is documented.
- [x] Workflow artifacts are updated according to the repository workflow.

Acceptance result:
- `[x] All criteria met.`

Verification commands:
- `cd client && npm test`
- `cd client && npm run build`
- Source/manual review of responsive gallery CSS.

Stop condition:
- Stop with `Needs Human Review` if frontend tests or build cannot pass after targeted in-scope recovery, if implementation requires unavailable image assets/credentials, or if dirty user changes overlap with planned implementation files.

Out-of-scope items:
- Backend/API changes.
- Booking flow changes.
- Deployment configuration changes.
- CMS/admin image management.
- Full site redesign outside gallery-related shared styles.
