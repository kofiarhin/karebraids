# Task Plan: Homepage Hero Image Carousel

- Spec file used: `_workflow/runs/dev/spec.md`
- Planning date: 2026-05-24
- User approval: Explicit approval received: `approve spec`
- Progress and summary files read:
  - `_workflow/runs/dev/progress.md`
  - `_workflow/runs/dev/summary.md`
  - `_workflow/runs/dev/handoff.md`
- Detailed spec sections used:
  - Section 6 Desired End State
  - Section 7 Scope
  - Section 9 Functional Requirements
  - Section 10 Non-Functional Requirements
  - Section 11 Affected Surfaces
  - Section 12 Dependency And Integration Map
  - Section 14 UX / API / Workflow Expectations
  - Section 15 Execution Strategy
  - Section 16 Verification Strategy
  - Section 17 Acceptance Criteria
  - Section 18 Edge Cases And Failure Modes
  - Section 19 Risks And Mitigations
  - Section 20 Assumptions
  - Section 22 Task Extraction Notes

## Task List

### TASK-001: Add homepage hero carousel with clickable dots

- Status: Done
- Objective: Replace the homepage hero's static image with a lightweight carousel using the first five `galleryItems`, preserving the existing hero frame and controls while adding accessible clickable dot indicators.
- Files affected:
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `_workflow/runs/dev/progress.md`
  - `_workflow/runs/dev/handoff.md`
  - `_workflow/runs/dev/verification.md`
  - `_workflow/runs/dev/review.md`
  - `_workflow/runs/dev/release-notes.md`
  - `_workflow/runs/dev/summary.md`
- Checklist:
  - [x] Add failing test for carousel rendering and clickable dot selection.
  - [x] Create `heroSlides` from `galleryItems.slice(0, 5)`.
  - [x] Add local active-slide state and 4.5 second auto-rotation.
  - [x] Respect `prefers-reduced-motion` by avoiding auto-rotation for reduced-motion users.
  - [x] Replace the static hero image with stacked carousel slides.
  - [x] Add accessible clickable dot buttons with active state.
  - [x] Add CSS for fade, subtle scale, dot styling, mobile behavior, and reduced-motion override.
  - [x] Verify focused tests, full tests, lint, build, and responsive browser behavior.

#### Iteration 1 Build

- Goal: Prove and implement the core carousel markup and clickable dot behavior.
- Changes made:
  - Added focused test coverage for five hero dot buttons, five hero slide elements, and click-to-select active state.
  - Added `heroSlides`, local `activeHeroSlide` state, interval setup, slide markup, and dot buttons.
  - Added initial carousel and dot CSS while preserving the existing frame shape and badge.
- Test plan:
  - `cd client && npm test -- site-pages.test.jsx`
- Red phase evidence:
  - Focused test failed because the static hero had no accessible `Show Copper Knotless Braids` button.
- Green phase evidence:
  - Initial implementation exposed a `matchMedia` guard bug in jsdom. Fixed the guard to require `typeof window.matchMedia === 'function'`.
  - Inactive slides are intentionally `aria-hidden`, so the test was refined to count `.hero-slide` elements structurally.
  - Focused test then passed.
- Refactor phase evidence:
  - Scoped the image-count assertion to the carousel structure instead of accessible image roles so hidden inactive slides remain appropriate for assistive tech.
  - Reran focused test successfully.
- Test commands run:
  - `npm test -- site-pages.test.jsx`: failed as expected for missing dot button.
  - `npm test -- site-pages.test.jsx`: failed for `window.matchMedia is not a function`.
  - `npm test -- site-pages.test.jsx`: failed for inaccessible hidden inactive images.
  - `npm test -- site-pages.test.jsx`: passed, 7 tests.
- Verification command/result:
  - Focused verification passed.
- Review findings:
  - Core carousel render and clickable dot behavior matched the approved scope.
- Acceptance status:
  - Partially met; timer and reduced-motion hardening remained for later iterations.
- Remaining issues:
  - Needed timer and live reduced-motion coverage.
- Next action:
  - Continue to Iteration 2 Refine.

#### Iteration 2 Refine

- Goal: Prove timer and reduced-motion behavior while keeping the implementation lightweight.
- Changes made:
  - Added fake-timer test for 4.5 second auto-rotation.
  - Added reduced-motion media query change test.
  - Refined the carousel effect to start, stop, and clean up the interval when `prefers-reduced-motion` changes.
- Test plan:
  - `cd client && npm test -- site-pages.test.jsx`
- Red phase evidence:
  - Focused test failed because no `matchMedia` change handler was registered; `motionChangeHandler` was not a function.
- Green phase evidence:
  - Added `motionQuery.addEventListener('change', syncRotation)` and matching cleanup.
  - Focused test passed, 9 tests.
- Refactor phase evidence:
  - Reviewed the effect for interval cleanup and duplicate timer prevention through `clearRotation()` before `startRotation()`.
  - Reran focused test successfully.
- Test commands run:
  - `npm test -- site-pages.test.jsx`: failed as expected for missing media query change handling.
  - `npm test -- site-pages.test.jsx`: passed, 9 tests.
- Verification command/result:
  - Focused verification passed.
- Review findings:
  - Auto-rotation is 4500ms and reduced-motion users do not receive ongoing automatic slide changes.
- Acceptance status:
  - Partially met; final semantic and visual polish remained.
- Remaining issues:
  - Dot controls needed grouped semantics and mobile visual inspection.
- Next action:
  - Continue to Iteration 3 Polish.

#### Iteration 3 Polish

- Goal: Polish visual CSS, mobile responsiveness, and parallax interaction; run full verification.
- Changes made:
  - Added a test requiring the dot buttons to live in a named `group`.
  - Added `role="group"` to the dot wrapper.
  - Added keyboard focus outline styling for dot buttons.
  - Moved mobile dots above the appointment badge after visual inspection showed overlap on narrow screens.
  - Scoped the existing parallax selector to direct images so it does not fight carousel slide transforms.
- Test plan:
  - Focused page test, full frontend tests, lint, build, and browser checks at desktop and mobile sizes.
- Red phase evidence:
  - Focused test failed because the dot wrapper had `aria-label` but no semantic `group` role.
- Green phase evidence:
  - Added `role="group"` and focus-visible styling.
  - Focused test passed.
- Refactor phase evidence:
  - Browser screenshot showed mobile badge/dot overlap.
  - Adjusted mobile dot position to `bottom: 6.75rem`.
  - Focused test, full tests, lint, build, and browser screenshot checks passed afterward.
- Test commands run:
  - `npm test -- site-pages.test.jsx`: failed as expected for missing dot group role.
  - `npm test -- site-pages.test.jsx`: passed, 9 tests.
  - `npm test`: passed, 3 test files / 16 tests.
  - `npm run lint`: passed.
  - `npm run build`: passed.
  - Playwright CLI screenshots at `1280x800` and `390x844`: passed selector wait for `.hero-carousel-dot[aria-current='true']`; visual inspection confirmed desktop and mobile hero layout, image, dots, badge, and CTAs were intact.
- Verification command/result:
  - Passed.
- Review findings:
  - Scope respected; no new dependencies; no API, backend, env, deployment, or data changes.
- Acceptance status:
  - Complete.
- Remaining issues:
  - None.
- Next action:
  - Complete final review, release notes, summary, and handoff.

#### Acceptance Result

- [x] Homepage hero uses `heroSlides` from the first five `galleryItems`.
- [x] Static hero image is replaced by a carousel in the existing hero media frame.
- [x] Carousel auto-rotates every 4 to 5 seconds.
- [x] Slide transition uses smooth fade with subtle scale/zoom.
- [x] Existing hero layout, luxury frame shape, CTA buttons, and "Salon and mobile appointments" badge remain intact.
- [x] Small elegant dot indicators appear over or near the bottom of the hero image.
- [x] Dot indicators are clickable accessible buttons and show the active slide.
- [x] Clicking a dot jumps to the selected slide.
- [x] Mobile responsiveness is preserved.
- [x] `prefers-reduced-motion` is respected.
- [x] No new dependencies are added.
- [x] Changes are minimal and localized to the homepage hero, CSS, focused tests, and workflow artifacts.

#### Stop Condition

- Not triggered.

#### Out-of-Scope Items

- Arrows, swipe/drag gestures, thumbnails, gallery data changes, backend/API changes, dependency additions, full hero redesign, deployment changes.
