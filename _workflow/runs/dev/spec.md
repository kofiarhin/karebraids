# Detailed Spec: Redesign KareBraids Gallery Page

## 1. Metadata
- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-05-28
- Request ID / slug: `redesign-gallery-figma-dark-premium-grid`
- Request source: Latest direct user prompt synced into `_workflow/runs/dev/request.md`
- Execution mode: `complete-workflow`
- Request classification: `feature` / frontend UI redesign
- Scope level: `small`
- Risk level: `low`

## 2. Original Request
- Raw user request: Redesign the KareBraids gallery page to match the Figma reference: dark premium page, centered `GALLERY` title, clean 3-column square image grid, and centered light modal overlay. Update `client/src/pages/Gallery.jsx` and `client/src/index.css`, preserve accessibility, and run client lint, test, and build.
- Normalized request: Redesign the existing `/gallery` page with a dark premium canvas, centered uppercase title, responsive square image grid, hidden visual captions, and centered light modal while preserving modal state, close behavior, focus restoration, and gallery button accessibility.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers
- Questions asked: None.
- Answers received: None.
- Questions skipped: No direct question was needed because the request gives concrete affected files, target behavior, suggested CSS, accessibility constraints, and verification commands.
- Remaining open questions: None blocking. The Figma reference is inferred from the supplied requirements and CSS direction because no Figma URL or image was provided.

## 4. Problem Definition
- Problem being solved: The current gallery uses a hero-copy block, masonry-style grid spans, visible card captions, and a dark modal treatment that no longer matches the desired Figma reference.
- Why it matters: Gallery browsing is a visual trust surface for a braiding business; the page should feel premium, calm, and easy to scan.
- Current pain point: The existing layout is denser and more editorial/masonry-based than the requested clean square grid design.
- Expected value: Visitors can scan consistent image tiles quickly and open an image in a focused modal without extra visual copy competing with the image.

## 5. Current State Analysis
- Existing behavior: `Gallery.jsx` renders `.gallery-page.dark-gallery-page`, a `.page-hero-copy.narrow` hero block, a `.gallery-grid` region, gallery item buttons, and `GalleryModal`.
- Existing architecture/components: Gallery state is local to `Gallery.jsx`; modal behavior is isolated in `GalleryModal.jsx`; gallery data comes from `client/src/constants/content.js`.
- Existing files/modules likely involved:
  - `client/src/pages/Gallery.jsx`
  - `client/src/components/GalleryModal.jsx`
  - `client/src/constants/content.js`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `client/test/gallery-modal.test.jsx`
- Existing data flow: Static `galleryItems` are mapped into buttons. Clicking a button stores the clicked item in `selectedItem` and stores the trigger in `activeTriggerRef`; closing clears selection and restores focus.
- Existing API/UI/CLI/workflow behavior: `/gallery` route is already wired in `client/src/App.jsx`; no API calls are involved.
- Existing tests or verification coverage: `site-pages.test.jsx` currently asserts the old `Braid Gallery` heading and old gallery CSS hooks. `gallery-modal.test.jsx` covers modal open/close, Escape close, focus restoration, and dialog labelling.

## 6. Desired End State
- Expected final behavior: `/gallery` displays a dark premium page with centered `GALLERY` heading, a responsive square image grid, and no visible tile captions. Clicking a tile opens the selected image in a centered light/cream modal.
- User-facing outcome: A simple image-first gallery experience matching the supplied Figma-style reference.
- Developer-facing outcome: Existing state and accessibility behavior stay intact; CSS overrides are clear and scoped to gallery/modal surfaces.
- System/workflow outcome: The workflow records spec approval, task plan, TDD evidence, verification, review, release notes, summary, and health check.
- Backward compatibility expectations: Route, image data, gallery button labels, modal close behavior, and focus restoration remain compatible.

## 7. Scope
- In scope:
  - Replace gallery hero markup with `.gallery-title-wrap` and `GALLERY` title.
  - Preserve gallery item buttons, `aria-label`, selected item state, trigger ref, open/close functions, and `GalleryModal` usage.
  - Override gallery grid/card styles to 3-column desktop, 2-column tablet, 1-column mobile square tiles.
  - Remove masonry spans by overriding all aspect modifier classes.
  - Hide visual card captions and modal copy.
  - Style modal backdrop and modal surface to match a centered light/cream rectangle with contained image.
  - Update focused tests before implementation where existing assertions target old design.
- Out of scope:
  - Changing gallery data, image URLs, alt text source data, routes, backend, admin, booking, deployment, env, package dependencies, or database behavior.
- Non-goals:
  - Pixel-perfect Figma reconstruction beyond the supplied requirements.
  - New animation libraries or new modal architecture.
- Explicit boundaries:
  - Do not remove existing modal close/focus behavior.
  - Do not rewrite unrelated public pages.

## 8. Users And Use Cases
- Primary users: KareBraids customers browsing style examples before booking.
- Secondary users: Site owner reviewing the public brand presentation.
- Main use cases:
  - Scan gallery images on desktop/tablet/mobile.
  - Open a gallery image for a larger view.
  - Close the modal with Escape, backdrop click, or close button.
- Edge use cases:
  - Keyboard user opens and closes the modal.
  - Screen reader user relies on gallery button labels and modal dialog labelling.
  - Narrow mobile viewport renders one image column without horizontal overflow.

## 9. Functional Requirements
- Required behaviors:
  - Render `GALLERY` inside `.gallery-title-wrap`.
  - Render all `galleryItems` as buttons.
  - Keep gallery button `aria-label={item.title}`.
  - Keep selected item state and focus restoration logic.
  - Keep modal close by Escape/backdrop/close button.
  - Hide tile captions visually.
  - Hide modal copy visually for this design.
- Inputs: Static `galleryItems`; user clicks; keyboard Escape.
- Outputs: Gallery grid UI; modal dialog for selected item.
- State changes: `selectedItem` toggles between `null` and the selected gallery item; `activeTriggerRef` stores the clicked button.
- Error states: Not applicable; static content.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: CSS-only layout changes; no new runtime-heavy behavior.
- Reliability expectations: Existing route and modal behavior remain stable.
- Security/privacy expectations: No secrets, user data, API, or auth changes.
- Accessibility expectations: Buttons remain labelled; modal remains a dialog; close button remains accessible; focus returns to trigger; visual hidden copy must not break dialog labelling.
- Maintainability expectations: Prefer straightforward CSS overrides near existing gallery styles or later in the cascade; avoid broad unrelated selector churn.
- DX expectations: Existing npm scripts should pass.

## 11. Affected Surfaces
- Files likely affected:
  - `client/src/pages/Gallery.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `client/test/gallery-modal.test.jsx` if needed
  - `_workflow/runs/dev/*`
- Directories likely affected:
  - `client/src/pages/`
  - `client/src/`
  - `client/test/`
  - `_workflow/runs/dev/`
- UI surfaces: `/gallery` page and gallery modal.
- API routes: Not applicable.
- Components: `Gallery`, possibly only CSS for `GalleryModal`.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests: Focused page/CSS assertions and modal accessibility behavior.
- Docs: Workflow artifacts only unless durable project facts change.
- Workflow artifacts: request, handoff, spec, tasks, progress, review, verification, release notes, summary.

## 12. Dependency And Integration Map
- Internal dependencies:
  - `Gallery.jsx` imports `GalleryModal` and `galleryItems`.
  - `GalleryModal.jsx` uses `@phosphor-icons/react` close icon already installed.
  - `index.css` contains base gallery styles, dark brand overrides, and responsive media queries that must be reconciled.
- External packages/services: Existing React, Vite, Vitest, Testing Library, ESLint only.
- Integration points: `/gallery` route in `client/src/App.jsx`; global dark shell styles.
- Ordering constraints:
  - Update tests first for changed heading and CSS hooks.
  - Then update `Gallery.jsx`.
  - Then update CSS overrides.
  - Then run focused and full verification.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: None.
- Database changes: None.
- State management changes: None; preserve local component state.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Existing gallery item IDs, titles, descriptions, images, and route remain unchanged.

## 14. UX / API / Workflow Expectations
- UX expectations:
  - Premium dark gallery canvas.
  - Centered uppercase `GALLERY` title.
  - Three square columns on desktop, two on tablet, one on mobile.
  - Image tiles crop with `object-fit: cover`.
  - No visible tile captions.
  - Modal uses a dark translucent backdrop and light/cream centered rectangle.
  - Modal image uses `object-fit: contain`.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Follow workflow approval gate; no task plan or implementation before approval.
- Error handling expectations: Not applicable beyond modal close behavior.
- Empty/loading/success/failure states: Not applicable because gallery content is static.

## 15. Execution Strategy
- Recommended implementation approach:
  - Use `design-taste-frontend` for frontend UI review; record `Applied skill: design-taste-frontend`.
  - Update tests to assert the new `GALLERY` title and CSS hooks for square grid/light modal.
  - Replace the hero-copy block in `Gallery.jsx` with the requested `.gallery-title-wrap` markup while leaving state and modal usage intact.
  - Override gallery CSS in `client/src/index.css`, ensuring later dark-brand and media-query rules do not reintroduce masonry spans, captions, dark modal, or mobile min-height.
  - Prefer CSS hiding for `.gallery-card span` and `.modal-copy`.
- Suggested sequencing:
  - `TASK-001`: Change gallery page title structure and grid/card visual rules.
  - `TASK-002`: Change modal visual treatment and verify accessibility behavior.
  - `TASK-003`: Run final lint/test/build, diff audit, and close workflow.
- Safe rollout/migration approach: Single frontend change; no migration needed.
- Files to inspect before editing:
  - `client/src/pages/Gallery.jsx`
  - `client/src/components/GalleryModal.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `client/test/gallery-modal.test.jsx`
- Decisions to avoid until more evidence exists:
  - Do not remove modal copy markup unless CSS hiding breaks dialog accessibility.
  - Do not alter gallery data or route wiring.

## 16. Verification Strategy
- Required automated checks:
  - Focused tests after each test-first iteration, likely `npm run test --prefix client -- site-pages.test.jsx` or `npm run test --prefix client -- gallery-modal.test.jsx`.
  - `npm run lint --prefix client`
  - `npm run test --prefix client`
  - `npm run build --prefix client`
- Required manual checks:
  - Code-surface review for CSS cascade, responsive overrides, and accessibility preservation.
  - Browser/screenshot check if practical after implementation because this is visual UI work.
- Test types needed:
  - Component/page rendering tests for gallery heading and buttons.
  - CSS regression tests for square grid, no masonry, hidden captions, and light modal.
  - Modal interaction tests for Escape/focus restoration.
- Build/lint/typecheck expectations: Lint and Vite build pass.
- Acceptance evidence required: Passing tests and documented acceptance criteria.
- Proof of completion: Final diff audit, review, release notes, summary, and workflow health check.

## 17. Acceptance Criteria
- [ ] Gallery page renders a centered `.gallery-title-wrap` with heading text `GALLERY`.
- [ ] Existing gallery state, trigger ref, open/close functions, `GalleryModal` usage, and button `aria-label`s are preserved.
- [ ] Gallery grid is 3 columns on desktop, 2 columns at tablet breakpoint, and 1 column on mobile.
- [ ] Gallery tiles are square, use `object-fit: cover`, and aspect modifier classes no longer create masonry spans.
- [ ] Gallery card captions are not visible.
- [ ] Modal backdrop is dark/translucent and modal surface is centered, light/cream, rectangular, and contains the image.
- [ ] Modal copy is not visible in the design while dialog accessibility remains valid.
- [ ] Modal closes through Escape, backdrop click, and close button, and focus returns to the clicked gallery button.
- [ ] `npm run lint --prefix client`, `npm run test --prefix client`, and `npm run build --prefix client` pass or blockers are documented.
- [ ] Scope is limited to the gallery redesign, focused tests, and workflow artifacts.
- [ ] Applied skill: design-taste-frontend is recorded.

## 18. Edge Cases And Failure Modes
- Edge cases:
  - Screen reader dialog labelling if `.modal-copy` is hidden.
  - Mobile media query conflict with previous `min-height: 24rem` gallery-card override.
  - Existing `.dark-brand-shell` selectors overriding new base modal/card styles.
  - Very tall images inside modal should contain without overflowing the viewport.
- Failure modes:
  - Tests fail because old `Braid Gallery` heading assertion remains.
  - Dialog accessible name disappears if the hidden title is no longer part of the accessibility tree.
  - Captions remain visible because a stronger selector overrides `display: none`.
  - Masonry spans remain because modifier classes are not fully reset.
- Regression risks:
  - Gallery modal close/focus behavior.
  - Header/footer layout if `.gallery-page` width/padding is too broad.
  - Homepage gallery preview if selectors unintentionally target `.gallery-mosaic`.
- Recovery expectations:
  - Fix only in-scope CSS/markup/test regressions.
  - Rerun the exact failing command after each fix.

## 19. Risks And Mitigations
- Technical risks:
  - CSS cascade conflicts with existing dark-brand gallery styles.
  - Mitigation: place explicit override selectors after existing gallery/dark overrides or update existing blocks directly.
- Product/UX risks:
  - Hidden captions reduce visible context.
  - Mitigation: keep button labels and alt text from existing data.
- Security risks:
  - None expected.
- Scope risks:
  - Previous gallery polish styles are intertwined with public-page styles.
  - Mitigation: edit only gallery/modal selectors and focused tests.
- Mitigation plan:
  - TDD-first updates, focused CSS assertions, full client verification, and final diff audit.

## 20. Assumptions
- Explicit assumptions:
  - The supplied CSS snippet expresses the Figma reference sufficiently.
  - Existing image URLs and gallery item count remain unchanged.
  - CSS hiding is acceptable for visual captions/modal copy if tests confirm accessibility behavior.
  - No new dependencies are needed.
- Confidence level: High.
- What to revisit if assumptions are wrong:
  - If a Figma file/screenshot becomes available, compare spacing, color, and modal proportions.
  - If hidden modal copy breaks accessible dialog name/description, use a visually-hidden pattern instead of `display: none` for the labelling nodes while still hiding visible copy.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Whether the true Figma modal dimensions differ from the supplied CSS.
- Execution impact: None; proceed after spec approval using supplied dimensions.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - `TASK-001: Add the centered gallery title and square image grid`
  - `TASK-002: Restyle the gallery modal while preserving close and focus behavior`
  - `TASK-003: Verify gallery redesign and close workflow`
- Suggested first task: `TASK-001: Add the centered gallery title and square image grid`
- Suggested task ordering:
  - Mark tests Red for old gallery title/grid assumptions.
  - Implement page title and grid/card CSS.
  - Verify focused tests.
  - Then modal visual treatment and modal interaction tests.
  - Then full verification and closeout artifacts.
- Areas that should not become separate tasks:
  - Gallery data updates.
  - Route wiring.
  - Backend/admin/booking work.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Each executable task must include Iteration 1 Build, Iteration 2 Refine, and Iteration 3 Polish.
  - For code-changing iterations, update or add the failing test first, observe the expected failure when possible, implement the smallest passing change, rerun tests, refactor without behavior change, and verify again.

## Frontend Taste Application

Applied skill: design-taste-frontend

- This request is frontend UI redesign/polish, so the skill applies.
- Use the user's explicit centered title and 3-column square grid requirement even though generic 3-card patterns are normally discouraged; this is an image gallery grid, not a feature-card row.
- Preserve a restrained premium dark palette, avoid pure black, avoid neon/glow effects, and keep motion minimal.
- Ensure responsive collapse is deterministic and no text/image overlap is introduced.
