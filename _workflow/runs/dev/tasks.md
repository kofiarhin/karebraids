# Task Plan: Homepage Visual Optimization

- Spec file used: `_workflow/runs/dev/spec.md`
- Planning date: 2026-05-24
- Progress and summary files read:
  - `_workflow/runs/dev/progress.md`
  - `_workflow/runs/dev/summary.md`
- Handoff read: `_workflow/runs/dev/handoff.md`
- Detailed spec sections used:
  - Section 5 Current State Analysis
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

### TASK-001: Add gallery-image visuals to homepage sections

- Status: Done
- Objective: Make the existing homepage more visual by adding `galleryItems` imagery to the trust strip, services, why section, testimonials, and CTA while preserving the hero carousel and gallery grid.
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
  - [x] Add tests for homepage visual image structures.
  - [x] Keep existing hero carousel behavior intact.
  - [x] Add trust thumbnail cluster using 3-5 gallery images.
  - [x] Convert service tiles to image-backed readable cards.
  - [x] Add process/detail image panel to why section.
  - [x] Keep gallery preview image grid.
  - [x] Add testimonial visual panel or thumbnails.
  - [x] Add CTA gallery-image treatment with dark/green overlay.
  - [x] Verify alt/decorative image semantics.
  - [x] Verify mobile responsiveness and reduced-motion compatibility.

#### Iteration 1 Build

- Goal: Prove and implement the core added visual structures.
- Changes made: Added a focused homepage visual-structure test, deterministic gallery image selections in `Home.jsx`, trust thumbnail cluster, image-backed service cards, why visual panel, testimonial visual panel, CTA image layer, and initial CSS for image overlays and responsive stacking.
- Test plan: Add focused RTL assertions for trust image cluster, service-card images, why visual panel, testimonial visuals, and CTA visual treatment.
- Red phase evidence: `npm test -- site-pages.test.jsx` failed because `Featured trust style thumbnails` did not exist.
- Green phase evidence: Implemented the core visual structures and `npm test -- site-pages.test.jsx` passed with 10 tests.
- Refactor phase evidence: Reviewed the small markup/CSS pass with no behavior changes needed and reran `npm test -- site-pages.test.jsx`; it passed with 10 tests.
- Test commands run:
  - `npm test -- site-pages.test.jsx`: failed as expected before implementation.
  - `npm test -- site-pages.test.jsx`: passed after implementation.
  - `npm test -- site-pages.test.jsx`: passed after refactor review.
- Verification command/result: `npm test -- site-pages.test.jsx` passed.
- Review findings: Core requested visual surfaces are present; Iteration 2 still needed tighter accessibility semantics and responsive/contrast review.
- Acceptance status: Partially accepted for core visual structures.
- Remaining issues: Decorative/alt semantics and browser responsive review remained.
- Next action: Completed; continued to Iteration 2.

#### Iteration 2 Refine

- Goal: Tighten accessibility semantics, alt text, contrast-oriented markup, and responsive CSS.
- Changes made: Added an accessibility-focused test and marked trust thumbnail cluster images as decorative with empty alt text and `aria-hidden`.
- Test plan: Add/refine assertions for image alt text, decorative thumbnail handling, and service image source mapping.
- Red phase evidence: `npm test -- site-pages.test.jsx` failed because trust thumbnail images still had non-empty alt text.
- Green phase evidence: Updated trust thumbnails to `alt=""` and `aria-hidden="true"`; `npm test -- site-pages.test.jsx` passed with 11 tests.
- Refactor phase evidence: Reviewed alt semantics and responsive selector scope with no further code changes needed; reran `npm test -- site-pages.test.jsx`, which passed with 11 tests.
- Test commands run:
  - `npm test -- site-pages.test.jsx`: failed as expected before refinement.
  - `npm test -- site-pages.test.jsx`: passed after refinement.
  - `npm test -- site-pages.test.jsx`: passed after refactor review.
- Verification command/result: `npm test -- site-pages.test.jsx` passed.
- Review findings: Decorative thumbnails are no longer announced redundantly; meaningful images remain named.
- Acceptance status: Partially accepted; final browser/layout verification remained.
- Remaining issues: Full suite, lint, build, and desktop/mobile visual review remained.
- Next action: Completed; continued to Iteration 3.

#### Iteration 3 Polish

- Goal: Polish CTA semantics, run full verification, and complete desktop/mobile browser checks.
- Changes made: Added a CTA accessibility assertion, changed the CTA background image to decorative semantics, adjusted the existing CTA source assertion to remain structural instead of accessible-name based, and verified responsive browser layout.
- Test plan: Add/refine assertion for CTA visual integration, then run focused tests, full tests, lint, build, and browser visual checks.
- Red phase evidence: `npm test -- site-pages.test.jsx` failed because `.cta-image` still exposed `alt="Booking preview braid style"` instead of being decorative.
- Green phase evidence: Updated `.cta-image` to `alt="" aria-hidden="true"` and corrected the older visual-structure test to assert the CTA image source structurally. `npm test -- site-pages.test.jsx` passed with 12 tests.
- Refactor phase evidence: Reran `npm test -- site-pages.test.jsx` with no behavior changes; it passed with 12 tests.
- Test commands run:
  - `npm test -- site-pages.test.jsx`: failed as expected before polish.
  - `npm test -- site-pages.test.jsx`: passed after CTA semantics update.
  - `npm test -- site-pages.test.jsx`: passed after refactor review.
  - `npm test`: passed, 3 test files / 19 tests.
  - `npm run lint`: passed.
  - `npm run build`: passed.
- Verification command/result:
  - Automated checks passed.
  - Playwright/Chromium desktop check at `1280x900` passed: no console issues, no horizontal overflow, all homepage visual images loaded, screenshot reviewed.
  - Playwright/Chromium mobile check at `390x844` passed: no console issues, no horizontal overflow, all homepage visual images loaded, screenshot reviewed.
- Review findings: Scope respected; no backend/API/env/deployment/dependency changes. The in-app browser tool was not exposed by tool discovery, so Playwright/Chromium CLI automation was used as the browser fallback.
- Acceptance status: Accepted.
- Remaining issues: None.
- Next action: Final workflow review, release notes, summary, and handoff.

#### Test Plan

- `npm test -- site-pages.test.jsx` from `client/`
- `npm test` from `client/`
- `npm run lint` from `client/`
- `npm run build` from `client/`
- Browser responsive visual checks for desktop and mobile.

#### Red Phase Evidence

- Iteration 1: Missing trust thumbnail cluster caused the focused test to fail before implementation.
- Iteration 2: Non-decorative trust thumbnail alt text caused the focused test to fail before refinement.
- Iteration 3: Non-decorative CTA background image alt text caused the focused test to fail before polish.

#### Green Phase Evidence

- Iteration 1: Core gallery-driven visual structures passed focused tests.
- Iteration 2: Decorative trust thumbnail semantics passed focused tests.
- Iteration 3: Decorative CTA image semantics passed focused tests.

#### Refactor Phase Evidence

- Iteration 1: Focused test passed after implementation review.
- Iteration 2: Focused test passed after accessibility/selector review.
- Iteration 3: Focused test passed after CTA semantic consistency review.

#### Test Commands Run

- `cd client && npm test -- site-pages.test.jsx`: passed, 12 tests.
- `cd client && npm test`: passed, 3 test files / 19 tests.
- `cd client && npm run lint`: passed.
- `cd client && npm run build`: passed.
- Playwright/Chromium responsive browser checks: passed for desktop and mobile.

#### Acceptance Criteria

- [x] Hero carousel remains present and functional.
- [x] Trust strip keeps existing trust badges and adds a 3-5 image overlapping thumbnail cluster from `galleryItems`.
- [x] Featured services render as visual cards with gallery images, overlays/gradients, title, duration, and short description.
- [x] Why choose KareBraids includes a supporting process/detail gallery image panel beside the reasons on larger screens and stacked on mobile.
- [x] Gallery preview remains an image grid.
- [x] Testimonials include a visual panel or small client/style thumbnails and quote text remains readable.
- [x] CTA includes a gallery image background or image panel with dark/green overlay and accessible contrast.
- [x] Added images have meaningful alt text or are correctly decorative when redundant.
- [x] No new dependencies or image assets are added.
- [x] Product implementation changes are limited to `client/src/pages/Home.jsx` and `client/src/index.css` unless a small helper is clearly justified.
- [x] Mobile responsive layout is clean with no incoherent overlaps.
- [x] Existing animations and `prefers-reduced-motion` support are respected.
- [x] Relevant client tests, lint, and build pass or any inability to run is documented.

#### Acceptance Result

- [x] All acceptance criteria met.

#### Verification Commands

- `cd client && npm test -- site-pages.test.jsx`
- `cd client && npm test`
- `cd client && npm run lint`
- `cd client && npm run build`
- Playwright/Chromium responsive browser checks against local Vite dev server.

#### Stop Condition

- Not triggered.

#### Out-of-scope Items

- Whole-site redesign.
- New image assets.
- New dependencies.
- Backend/API/database/env/deployment changes.
- Non-homepage route redesigns.
