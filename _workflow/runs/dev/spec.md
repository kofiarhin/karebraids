# Detailed Spec: Gallery Backend Filtering And Modal Navigation

## 1. Metadata
- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-06-11
- Request ID / slug: `gallery-filter-modal-navigation`
- Request source: direct user prompt
- Execution mode: `complete-workflow`
- Request classification: frontend data integration and accessible interaction fix
- Scope level: focused client feature
- Risk level: medium

## 2. Original Request
- Raw user request: Fix Gallery service filtering by using backend `GET /gallery?service=<slug>` and add cyclic previous/next modal navigation with mouse, keyboard, focus restoration, responsive controls, and preserved GSAP behavior.
- Normalized request: Replace local Gallery item lookup with the existing backend Gallery contract, then make the Gallery modal index-driven and cyclic within the active filtered result set.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers
- Questions asked: none.
- Answers received: not applicable.
- Questions skipped: none; the prompt, code, tests, and backend contract resolve the implementation decisions.
- Remaining open questions: none blocking.

## 4. Problem Definition
- Problem being solved: The Gallery filter updates URL/query state but `getGalleryItems()` ignores backend filtering and returns the local image library. The modal also has no previous/next navigation.
- Why it matters: Customers cannot view service-specific backend images or browse an active result set without repeatedly closing the modal.
- Current pain point: `contextServiceId` is added locally without filtering; modal selection stores an object that cannot reliably navigate by position.
- Expected value: Correct service-aware Gallery results and accessible cyclic modal browsing.

## 5. Current State Analysis
- Existing behavior: `Gallery.jsx` resolves service id/slug from URL state, invokes `useGalleryItems({ service })`, opens a selected object in `GalleryModal`, and restores focus after close.
- Existing architecture/components: React 19, React Router search params, TanStack Query, shared Axios `api`, Phosphor icons, GSAP `useGSAP`, and CSS in `client/src/index.css`.
- Existing files/modules likely involved: `galleryService.js`, `useGalleryItems.js`, `Gallery.jsx`, `GalleryModal.jsx`, `index.css`, and Gallery/service tests.
- Existing data flow: `useGalleryItems()` already normalizes options and includes `limit`/`service` in its query key; only the service implementation bypasses the backend.
- Existing API/UI/CLI/workflow behavior: Express mounts Gallery at `/api/gallery`; the shared client base uses `/api`, so `api.get('/gallery')` is correct.
- Existing tests or verification coverage: Backend tests prove service filtering and limits. Client tests cover URL-driven query calls, modal close/Escape/backdrop/focus, Gallery rendering, lint, and build.

## 6. Desired End State
- Expected final behavior: Gallery items always come from backend `/gallery`; filtering returns only selected-service items; modal navigation cycles through the current filtered array.
- User-facing outcome: Filtered cards are correct, previous/next controls appear for multiple results, wrapping works, arrow keys navigate, Escape closes, and focus returns to the opening card.
- Developer-facing outcome: Service code follows the backend contract and modal state uses one stable index plus a trigger ref.
- System/workflow outcome: No backend/schema change; existing query caching, GSAP entry motion, and reduced-motion behavior remain intact.
- Backward compatibility expectations: Existing service filter UI, URL state, representative-image copy, close button, backdrop click, modal semantics, and home Gallery queries remain compatible.

## 7. Scope
- In scope:
  - Backend-powered `getGalleryItems({ limit, service })`.
  - Focused service/query tests for normalized parameters and fallback array.
  - Index-based Gallery modal selection and cyclic navigation.
  - Filter-change modal reset.
  - Previous/next controls, keyboard behavior, count accessibility text, and scoped responsive CSS.
  - Focused Gallery/page/modal tests plus full client verification.
- Out of scope:
  - Backend controller, routes, serializer, schema, seed data, or API response changes.
  - Full modal or Gallery redesign.
  - Swipe gestures, thumbnails, autoplay, history entries per image, or focus-trap redesign.
  - Changes to Gallery service filter copy or representative-image semantics.
- Non-goals: Replacing TanStack Query, changing image ownership, or altering unrelated public-page animation.
- Explicit boundaries: Navigation operates only on the current `galleryItems`; single-image navigation is not actionable.

## 8. Users And Use Cases
- Primary users: Customers browsing Gallery inspiration by service.
- Secondary users: Keyboard and reduced-motion users.
- Main use cases: Select service, open an image, browse next/previous, close, and continue from the opening card.
- Edge use cases: One result, zero results, last-to-first wrap, first-to-last wrap, filter changed while modal is open, backend query rerender, and missing item after result replacement.

## 9. Functional Requirements
- Required behaviors:
  - `getGalleryItems()` calls `api.get('/gallery', { params: { limit, service } })` using existing normalization.
  - It returns `response.data.galleryItems || []`.
  - `getGalleryServices()` remains unchanged.
  - `Gallery` stores `selectedIndex` and derives the item from `galleryItems`.
  - Card click stores the clicked index and trigger element.
  - Previous/next wrap with modulo arithmetic within current filtered results.
  - Filter changes reset selected index and close the modal.
  - `GalleryModal` receives item, navigation availability, callbacks, current index, and total count.
  - `Escape` closes; `ArrowLeft` and `ArrowRight` invoke navigation only when available.
  - Side controls have required aria labels and do not bubble to the backdrop.
- Inputs: Optional limit/service, URL service query, card index, keyboard events.
- Outputs: Backend Gallery item array and updated modal image.
- State changes: Selected index changes; filter change resets it to closed state.
- Error states: Existing query error behavior remains; malformed/missing backend `galleryItems` becomes `[]`.
- Permissions/auth expectations: Public, unchanged.

## 10. Non-Functional Requirements
- Performance expectations: Constant-time index navigation; no additional request per modal step.
- Reliability expectations: Derived selection cannot retain a stale object across filter changes.
- Security/privacy expectations: No new data or credentials.
- Accessibility expectations: Dialog semantics retained, required control labels present, arrow/Escape keyboard support, opening-card focus restoration retained, and image position exposed to assistive technology.
- Maintainability expectations: Reuse existing query normalization and stylesheet; avoid duplicate Gallery arrays in state.
- DX expectations: Focused tests make backend query shape and navigation wrapping explicit.

## 11. Affected Surfaces
- Files likely affected:
  - `client/src/services/galleryService.js`
  - `client/src/hooks/queries/useGalleryItems.js` only if a test proves adjustment is required
  - `client/src/pages/Gallery.jsx`
  - `client/src/components/GalleryModal.jsx`
  - `client/src/index.css`
  - `client/test/service-api.test.js`
  - `client/test/gallery-query.test.jsx`
  - `client/test/gallery-modal.test.jsx`
  - `client/src/pages/Gallery.test.jsx` if needed
- Directories likely affected: `client/src/services`, `client/src/pages`, `client/src/components`, `client/test`.
- UI surfaces: `/gallery` filter, Gallery grid, Gallery modal.
- API routes: Existing `GET /api/gallery`; no server change.
- Components: `Gallery`, `GalleryModal`.
- Services: `galleryService`.
- Database/schema: none.
- Config/env vars: none.
- Tests: service, query integration, modal interaction, full client suite.
- Docs: run-scoped workflow artifacts and Fallow report.
- Workflow artifacts: `_workflow/runs/dev/*`, `_workflow/project-brain/*`, `.workflow/fallow-audit.md`.

## 12. Dependency And Integration Map
- Internal dependencies: Shared `api`, TanStack Query hook/query key, React Router search params, Gallery card DOM refs, GSAP setup, reduced-motion hook.
- External packages/services: Existing `@phosphor-icons/react`; no new dependency.
- Integration points: `/api/gallery` response `{ galleryItems, selectedService, reviews }`, Gallery URL filter, modal callback props.
- Ordering constraints: Test service contract first, implement service; test index/navigation behavior, implement page/modal; add CSS and regression verification.
- Migration/setup requirements: none.

## 13. Data And State Impact
- Data models: none.
- Database changes: none.
- State management changes: Replace selected object state with nullable selected index.
- Cache/session/local storage impact: TanStack Query cache remains keyed by normalized limit/service.
- Backward compatibility impact: Home callers using `{ limit }` now receive backend data rather than local data, matching the canonical API architecture.

## 14. UX / API / Workflow Expectations
- UX expectations: Controls are vertically centered at image/modal sides, visible on desktop, touch-usable on mobile, and visually consistent with the existing close control.
- API contract expectations: `GET /gallery` through shared `/api` base; normalized undefined params are allowed as in existing `getGallery()`.
- CLI/workflow behavior: Save spec, stop for approval, then create plan and execute complete workflow.
- Error handling expectations: Existing Gallery loading/error/empty behavior remains; modal cannot render without a valid derived item.
- Empty/loading/success/failure states: No modal for empty results; navigation hidden/disabled for one item; existing service and item states preserved.

## 15. Execution Strategy
- Recommended implementation approach:
  - Add failing service tests for API call parameters, normalized invalid inputs, and missing `galleryItems`.
  - Replace local image-library logic with the existing API pattern.
  - Add failing Gallery/modal tests for controls, wrapping, arrows, Escape, focus, and filter reset.
  - Store `selectedIndex`, derive `selectedItem`, and provide modulo-based callbacks.
  - Extend `GalleryModal` props and keydown handler while preserving current GSAP timeline and close focus.
  - Add narrow `.gallery-modal-nav` styles and responsive offsets/sizes.
- Suggested sequencing: service contract -> page state/callbacks -> modal controls/keyboard -> styles -> full verification.
- Safe rollout/migration approach: Keep existing modal open/close path and animation container; change only selection identity and navigation additions.
- Files to inspect before editing: files listed in section 11 plus existing Gallery tests.
- Decisions to avoid until more evidence exists: Do not add a focus trap, swipe library, backend fallback logic, or new modal animation model.

## 16. Verification Strategy
- Required automated checks:
  - Focused service API tests.
  - Focused Gallery query tests.
  - Focused Gallery modal tests.
  - `npm run lint --prefix client`
  - `npm run test --prefix client`
  - `npm run build --prefix client`
  - `npm run test` to ensure backend scripts remain passing.
- Required manual checks:
  - Service filter changes visible cards using backend data.
  - Next wraps last to first; previous wraps first to last.
  - Arrow keys and Escape work.
  - Focus returns to opening card.
  - Filter change closes an open modal.
  - Controls remain usable at desktop and mobile widths.
- Test types needed: Service unit tests, React integration tests, keyboard/focus interaction tests, build/lint regression.
- Build/lint/typecheck expectations: Client lint/build pass; no dedicated typecheck script exists.
- Acceptance evidence required: Red/Green/Refactor commands per task iteration, full command results, and browser/code-surface review.
- Proof of completion: All acceptance criteria checked, final diff audit clean, review and Fallow artifacts complete.

## 17. Acceptance Criteria
- [ ] Selecting a service shows only backend gallery images for that service.
- [ ] `getGalleryItems()` sends normalized `limit` and `service` to `/gallery` and returns `galleryItems || []`.
- [ ] Existing service filter UI and `?service=<slug>` state remain intact.
- [ ] Modal previous/next controls appear when multiple images exist.
- [ ] Next on the last image wraps to the first.
- [ ] Previous on the first image wraps to the last.
- [ ] `ArrowLeft` and `ArrowRight` navigate while open.
- [ ] `Escape`, close button, and backdrop close the modal.
- [ ] Closing restores focus to the card that opened the modal.
- [ ] Filtering while open closes/resets the modal.
- [ ] Single-image modal navigation is hidden or disabled.
- [ ] Existing GSAP/reduced-motion behavior and dialog accessibility remain intact.
- [ ] Existing build/test scripts pass.
- [ ] Applied skill: design-taste-frontend is recorded.

## 18. Edge Cases And Failure Modes
- Edge cases: Invalid/blank service, invalid/non-positive limit, missing response data, one image, empty array, repeated arrow key presses, async filter response, and stale selected index.
- Failure modes: Modal displays an item from a prior filter, modulo by zero, key listener using stale callbacks, button click reaching backdrop, focus returning to the wrong card, or GSAP replay breaking navigation.
- Regression risks: Home Gallery queries now depend on backend availability; test mocks based on local data may need explicit adjustment.
- Recovery expectations: Preserve empty state and close invalid selection; stop with human review if browser/backend integration cannot be verified.

## 19. Risks And Mitigations
- Technical risks: Existing tests mock local Gallery data and may conceal the service call contract.
- Product/UX risks: Side controls can overlap the close button or become too small on mobile.
- Security risks: none material.
- Scope risks: Reworking the modal design or backend despite an existing contract.
- Mitigation plan: Focused API mocks, interaction tests, scoped CSS, mobile review, and strict no-backend-change boundary.

## 20. Assumptions
- Explicit assumptions:
  - Shared `api` base path makes `api.get('/gallery')` resolve to `/api/gallery`.
  - Backend item ids are stable enough for React keys.
  - Hiding navigation for one image is preferable to disabled redundant controls.
  - Arrow navigation may keep focus on the close button or clicked navigation control; only close must restore card focus.
- Confidence level: high.
- What to revisit if assumptions are wrong: API base configuration, key strategy, or modal focus-management scope.

## 21. Open Questions
- Blocking questions: none.
- Non-blocking questions: Exact side-control offset may be tuned during responsive browser review.
- Execution impact: none before planning.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - Make Gallery items backend-powered and prove normalized query behavior.
  - Add index-driven cyclic modal navigation with keyboard/focus/filter-reset tests.
  - Add scoped responsive control styling and complete regression verification.
- Suggested first task: Replace local Gallery item lookup with tested backend response extraction.
- Suggested task ordering: data contract -> modal behavior -> responsive polish/final verification.
- Areas that should not become separate tasks: Backend/schema changes, broad modal redesign, or unrelated Gallery copy.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Build: failing focused behavior test, smallest implementation, passing rerun.
  - Refine: edge cases and stale-state/accessibility hardening with new failing test first.
  - Polish: responsive/GSAP regression proof, full checks, and final taste review.
