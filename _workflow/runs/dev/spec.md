# Detailed Spec: Polish Public KareBraids UI

## 1. Metadata
- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-05-26
- Request ID / slug: polish-public-karebraids-ui
- Request source: latest user prompt plus grill-me intake answers
- Execution mode: complete-workflow
- Request classification: polish-ui / frontend visual refinement
- Scope level: medium
- Risk level: medium because the request spans four public pages and shared CSS

## 2. Original Request
- Raw user request: `polish-ui`
- Normalized request: Polish the public KareBraids UI across the homepage, about page, gallery page, and booking page while preserving the warm brand direction, improving refinement/brightness/consistency, and allowing small JSX changes only when they support hierarchy, accessibility, or expected UI states.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers
- Questions asked:
  - Which UI surface should this `polish-ui` pass target?
  - Should the public-page polish pass preserve the current warm dark luxury brand direction or shift to a brighter/light editorial look?
  - Should this polish pass allow small JSX/content-structure changes where needed, or be limited mostly to CSS?
- Answers received:
  - Polish the homepage, about page, gallery page, and booking page.
  - Preserve the warm KareBraids brand, but make the public pages feel more refined, brighter where images/content need room, and more consistent across home, about, gallery, and booking.
  - Allow small JSX changes only when they improve page consistency, hierarchy, accessibility, or expected UI states; avoid changing routes, booking behavior, API calls, data models, admin UI, or brand copy beyond minor layout labels.
- Questions skipped: none.
- Remaining open questions:
  - Implementation must confirm whether current dirty frontend files (`client/src/index.css`, `client/test/site-pages.test.jsx`) are safe to build on before code edits. They appear to be expected prior completed-work changes, but they overlap likely files for this request.

## 4. Problem Definition
- Problem being solved: The public site has grown through several focused iterations, leaving page-level polish uneven across home, about, gallery, and booking.
- Why it matters: These pages are the main customer-facing journey from brand impression to booking conversion.
- Current pain point: Home has received more recent visual attention than About/Gallery/Booking, and shared dark styling can feel heavy or inconsistent where imagery and form content need breathing room.
- Expected value: A more refined, consistent public experience that keeps the warm KareBraids identity while improving readability, image presentation, responsive polish, and booking flow clarity.

## 5. Current State Analysis
- Existing behavior:
  - Public routes are `/`, `/about`, `/gallery`, and `/booking`.
  - `/admin` exists but is out of scope.
  - Layout provides shared sticky header, mobile drawer, footer, and warm dark shell.
- Existing architecture/components:
  - React/Vite frontend with React Router.
  - Public pages live in `client/src/pages/`.
  - Shared layout and buttons live in `client/src/components/`.
  - Styling is mostly centralized in `client/src/index.css`.
  - Booking server-state uses TanStack Query hooks and services.
- Existing files/modules likely involved:
  - `client/src/pages/Home.jsx`
  - `client/src/pages/About.jsx`
  - `client/src/pages/Gallery.jsx`
  - `client/src/pages/Booking.jsx`
  - `client/src/components/Layout.jsx` only if shared public shell polish is needed
  - `client/src/components/GalleryModal.jsx` only if modal polish/accessibility needs small refinement
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `client/test/booking-flow.test.jsx`
- Existing data flow:
  - Static page content uses `client/src/constants/content.js`.
  - Booking availability and creation use existing hooks/services; API behavior must not change.
- Existing API/UI/CLI/workflow behavior:
  - Booking flow steps: service, date, time, details, confirmation.
  - Gallery modal opens/closes with focus restoration.
  - Homepage hero carousel auto-rotates with reduced-motion handling.
  - Mobile drawer is accessible and tested.
- Existing tests or verification coverage:
  - `client/test/site-pages.test.jsx` covers public pages, homepage visual structure, carousel, and mobile navigation.
  - `client/test/booking-flow.test.jsx` covers booking flow validation, submission, API error, and empty slots.
  - Client commands: `npm test --prefix client`, `npm run lint --prefix client`, `npm run build --prefix client`.

## 6. Desired End State
- Expected final behavior:
  - Home, About, Gallery, and Booking feel like one cohesive public experience.
  - The warm KareBraids brand remains intact but surfaces/images have more visual breathing room.
  - Page hierarchy, spacing, media treatment, focus states, and form states feel production-ready.
- User-facing outcome:
  - Visitors can scan the brand story, inspect styles, and book with clearer visual hierarchy and less heaviness.
- Developer-facing outcome:
  - Changes remain localized to public UI files and tests.
  - Existing route/API/booking behavior remains compatible.
- System/workflow outcome:
  - polish-ui evidence is recorded under `.workflow/artifacts/polish-ui/`.
  - `Applied skill: design-taste-frontend` is recorded in task evidence and downstream artifacts.
- Backward compatibility expectations:
  - No route changes.
  - No API contract changes.
  - No data model changes.
  - Existing tests continue to pass after relevant updates.

## 7. Scope
- In scope:
  - Visual polish for `/`, `/about`, `/gallery`, and `/booking`.
  - Shared public shell polish if needed for those pages.
  - Small JSX changes for page consistency, hierarchy, accessibility, or expected UI states.
  - CSS refinements for layout, spacing, typography, color balance, image treatments, responsive behavior, interactions, focus states, and booking form states.
  - Test updates/additions that prove structure, accessibility, and key visual-regression expectations.
  - Browser verification on desktop and mobile when tooling is available.
- Out of scope:
  - Admin UI.
  - Backend/API/server changes.
  - Booking logic changes, availability rules, or submission behavior changes.
  - Route changes.
  - Database/schema changes.
  - Deployment or env changes.
  - New dependencies unless unavoidable and explicitly approved.
  - Major brand copy rewrite.
- Non-goals:
  - Full rebrand.
  - Replacing all content or imagery.
  - Building new booking features.
  - Changing admin authentication or dashboard behavior.
- Explicit boundaries:
  - Preserve the current warm brand direction.
  - Keep changes public-page focused.
  - Use existing `@phosphor-icons/react`; do not add icon packages.

## 8. Users And Use Cases
- Primary users:
  - Prospective KareBraids clients browsing services and booking an appointment.
- Secondary users:
  - Returning clients checking gallery styles before booking.
  - Site owner reviewing public presentation.
- Main use cases:
  - Land on homepage and understand brand/services.
  - Read About page and build trust.
  - Browse Gallery and inspect styles.
  - Complete booking request flow.
- Edge use cases:
  - Mobile visitor using drawer navigation.
  - Keyboard user navigating gallery modal and booking flow.
  - Reduced-motion user on homepage carousel/reveals.
  - Booking availability returns no slots or an API error.

## 9. Functional Requirements
- Required behaviors:
  - Public pages retain current routes and core content.
  - Booking flow remains functionally identical.
  - Gallery modal remains functional with focus restoration.
  - Mobile navigation remains functional.
  - Existing loading, empty, error, saving, and confirmation states in booking remain present and polished.
- Inputs:
  - User navigation, gallery card clicks, booking form inputs, booking service/date/time selections.
- Outputs:
  - Updated visual presentation only; no new API outputs.
- State changes:
  - No new persistent state.
  - Existing local booking/page UI state remains.
- Error states:
  - Booking form validation and API errors remain visible and readable.
  - Empty slot state remains visible and readable.
- Permissions/auth expectations:
  - Not applicable for public pages.
  - `/admin` auth behavior is out of scope.

## 10. Non-Functional Requirements
- Performance expectations:
  - No CPU-heavy animation loops.
  - Animate transform/opacity only.
  - Avoid unnecessary rerenders or new client-side state.
- Reliability expectations:
  - Existing routes and booking flow remain stable.
  - CSS changes must not break mobile layout or hidden reveal states.
- Security/privacy expectations:
  - No secrets, env values, or sensitive data introduced.
  - No admin surfaces exposed in public navigation.
- Accessibility expectations:
  - Maintain semantic headings, accessible buttons/links, focus states, labels, alerts, modal focus restoration, and decorative image semantics.
  - Text must preserve readable contrast.
- Maintainability expectations:
  - Prefer existing class naming and CSS organization.
  - Keep changes scoped and avoid broad rewrites.
- DX expectations:
  - Tests, lint, and build should remain runnable with existing npm scripts.

## 11. Affected Surfaces
- Files likely affected:
  - `client/src/pages/Home.jsx`
  - `client/src/pages/About.jsx`
  - `client/src/pages/Gallery.jsx`
  - `client/src/pages/Booking.jsx`
  - `client/src/components/Layout.jsx`
  - `client/src/components/GalleryModal.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `client/test/booking-flow.test.jsx`
- Directories likely affected:
  - `client/src/pages/`
  - `client/test/`
  - `_workflow/runs/dev/`
  - `.workflow/artifacts/polish-ui/`
- UI surfaces:
  - Homepage hero/trust/services/why/gallery-preview/testimonials/CTA.
  - About hero/image/value panel.
  - Gallery hero/grid/cards/modal presentation.
  - Booking hero/progress summary/service/date/time/details/confirmation states.
  - Shared header/footer only if needed for consistency.
- API routes: none.
- Components:
  - `Layout` and `Button` only if public-shell polish requires minor updates.
  - `GalleryModal` only if modal polish/accessibility needs small refinement.
- Services: none.
- Database/schema: none.
- Config/env vars: none.
- Tests:
  - Public page and booking flow tests should be updated/added first for code-changing tasks.
- Docs:
  - Run-scoped workflow artifacts and polish-ui artifacts.
- Workflow artifacts:
  - `_workflow/runs/dev/request.md`
  - `_workflow/runs/dev/spec.md`
  - `_workflow/runs/dev/tasks.md` after approval only
  - `_workflow/runs/dev/progress.md`
  - `_workflow/runs/dev/handoff.md`
  - `_workflow/runs/dev/review.md`
  - `_workflow/runs/dev/verification.md`
  - `_workflow/runs/dev/release-notes.md`
  - `_workflow/runs/dev/summary.md`
  - `.workflow/artifacts/polish-ui/*`

## 12. Dependency And Integration Map
- Internal dependencies:
  - `Home`, `About`, `Gallery`, `Booking` render through `Layout`.
  - Public pages depend on `content.js` imagery/services/testimonials.
  - Booking page depends on `useAvailability`, `useCreateBooking`, and API services; do not alter these contracts.
- External packages/services:
  - Existing React, React Router, TanStack Query, Phosphor icons, Tailwind/Vite CSS pipeline.
- Integration points:
  - Browser routing through `App.jsx`.
  - Booking API calls through existing service/hook layers.
- Ordering constraints:
  - Spec approval required before task planning.
  - Task plan required before implementation.
  - Dirty frontend overlap must be acknowledged before editing overlapping files.
- Migration/setup requirements:
  - None.

## 13. Data And State Impact
- Data models: none.
- Database changes: none.
- State management changes:
  - Avoid adding global state.
  - Existing booking local state remains.
- Cache/session/local storage impact:
  - None.
- Backward compatibility impact:
  - Public behavior and API compatibility must be preserved.

## 14. UX / API / Workflow Expectations
- UX expectations:
  - Warm, refined, image-led public pages.
  - Brighter surfaces where content/images need room.
  - Consistent spacing, radii, typography scale, page intro treatment, and section rhythm.
  - Booking flow should feel calmer and easier to scan without changing steps.
- API contract expectations:
  - No changes.
- CLI/workflow behavior:
  - Use default complete-workflow after approval.
  - Use polish-ui evidence directory.
- Error handling expectations:
  - Booking validation/API errors stay inline and readable.
  - Empty slot state remains clear.
- Empty/loading/success/failure states:
  - Booking time loading, empty slots, API error, details validation, saving button, and confirmation states must remain covered.

## 15. Execution Strategy
- Recommended implementation approach:
  - Use `design-taste-frontend` before frontend edits.
  - Capture baseline UI evidence where browser tooling is available.
  - Start with public shared visual system refinements in CSS.
  - Make small page JSX improvements only where CSS alone cannot fix hierarchy/accessibility/state clarity.
  - Keep booking behavior untouched and verify with existing flow tests.
- Suggested sequencing:
  - Task 1: Align shared public visual system and homepage/about consistency.
  - Task 2: Polish gallery browsing and modal presentation.
  - Task 3: Polish booking flow presentation and states without behavior changes.
  - Task 4: Final responsive/browser verification and closeout, if not covered inside prior tasks.
- Safe rollout/migration approach:
  - No migration. Frontend-only polish behind existing routes.
- Files to inspect before editing:
  - `client/src/index.css`
  - `client/src/pages/Home.jsx`
  - `client/src/pages/About.jsx`
  - `client/src/pages/Gallery.jsx`
  - `client/src/pages/Booking.jsx`
  - `client/src/components/GalleryModal.jsx`
  - Relevant tests.
- Decisions to avoid until more evidence exists:
  - New assets.
  - New dependencies.
  - Rewriting page copy.
  - Changing booking step behavior.

## 16. Verification Strategy
- Required automated checks:
  - `npm test --prefix client -- site-pages.test.jsx`
  - `npm test --prefix client -- booking-flow.test.jsx`
  - `npm test --prefix client`
  - `npm run lint --prefix client`
  - `npm run build --prefix client`
- Required manual checks:
  - Desktop and mobile browser inspection for `/`, `/about`, `/gallery`, `/booking`.
  - Confirm no horizontal overflow, incoherent overlap, clipped text, or unreadable image text.
  - Confirm gallery modal still opens/closes and restores focus.
  - Confirm booking flow still moves through steps and states.
- Test types needed:
  - React Testing Library structural/accessibility tests.
  - CSS regression checks when useful for visual intent.
  - Browser visual/responsive checks.
- Build/lint/typecheck expectations:
  - Client lint/build pass.
- Acceptance evidence required:
  - Updated tests first for code-changing tasks where practical.
  - Screenshots or browser inspection notes in `.workflow/artifacts/polish-ui/` when available.
- Proof of completion:
  - All tasks complete through Build -> Refine -> Polish.
  - Final diff audit, review, release notes, summary, handoff, and health check completed.

## 17. Acceptance Criteria
- [ ] Home, About, Gallery, and Booking preserve the warm KareBraids brand while feeling more refined and visually consistent.
- [ ] Public pages are brighter where image or content readability needs room, without shifting into a cold/light rebrand.
- [ ] Page intros, section rhythm, image treatments, surfaces, buttons, focus states, and responsive spacing are consistent across the four public pages.
- [ ] Small JSX changes, if any, improve hierarchy, accessibility, or expected UI states without changing routes, booking behavior, APIs, data models, admin UI, or major copy.
- [ ] Booking service/date/time/details/confirmation flow behaves the same as before.
- [ ] Booking loading, empty, error, saving, and confirmation states remain visible and readable.
- [ ] Gallery grid and modal remain accessible and usable, including keyboard/focus expectations.
- [ ] Mobile navigation and public responsive layouts remain clean with no horizontal overflow, incoherent overlap, or clipped text.
- [ ] Existing hero carousel behavior, dots, auto-rotation, and reduced-motion behavior remain compatible.
- [ ] No backend, env, database, dependency, deployment, or admin route changes are introduced.
- [ ] Relevant frontend tests are added/updated first, expected Red evidence is recorded where possible, and client test/lint/build verification passes or any blocker is documented.
- [ ] `Applied skill: design-taste-frontend` is recorded in task evidence and downstream workflow artifacts.

## 18. Edge Cases And Failure Modes
- Edge cases:
  - Small mobile widths around 320-390px.
  - Booking calendar dense layout.
  - Long service names/descriptions.
  - No available slots.
  - Booking API error.
  - Reduced motion preference.
  - Gallery modal with focus restoration.
- Failure modes:
  - Shared CSS change breaks admin or booking layout unintentionally.
  - Over-brightening reduces brand warmth.
  - Image overlays become too light and hurt text readability.
  - CSS reveal states leave below-fold images hidden.
  - Mobile calendar/buttons become cramped or overflow.
- Regression risks:
  - `client/src/index.css` is large and shared across public/admin surfaces.
  - Existing dirty CSS/test files overlap planned implementation.
- Recovery expectations:
  - Fix only in-scope regressions.
  - If dirty overlap cannot be safely resolved, stop for human review.

## 19. Risks And Mitigations
- Technical risks:
  - Large shared CSS file may cause unintended cross-page effects.
  - Mitigation: inspect selectors carefully, keep scoped class changes, run broad client tests/build/lint and browser checks.
- Product/UX risks:
  - Polish could drift into rebrand.
  - Mitigation: preserve warm brand palette and existing content, improve consistency/brightness selectively.
- Security risks:
  - Low; no backend/admin/env work.
  - Mitigation: avoid touching auth/admin files and check diff for secrets.
- Scope risks:
  - Four-page polish can expand.
  - Mitigation: task plan must use small vertical slices and explicit out-of-scope items.
- Mitigation plan:
  - Use TDD-first evidence for each code-changing task.
  - Record browser evidence under `.workflow/artifacts/polish-ui/`.
  - Stop before implementation if dirty overlap is not approved.

## 20. Assumptions
- Explicit assumptions:
  - Existing dirty `client/src/index.css` and `client/test/site-pages.test.jsx` are from prior completed homepage work and are intended to remain.
  - No new external images or dependencies are required.
  - Existing brand content and imagery remain acceptable.
  - User wants complete-workflow after approval.
- Confidence level: Medium-high.
- What to revisit if assumptions are wrong:
  - If dirty files contain user changes not intended for this polish pass, implementation must pause and reconcile.
  - If visual direction should become a larger rebrand, spec and task plan must be revised.

## 21. Open Questions
- Blocking questions:
  - Before implementation, confirm it is safe to build on the currently dirty overlapping frontend files: `client/src/index.css` and `client/test/site-pages.test.jsx`.
- Non-blocking questions:
  - Whether browser screenshots should be saved as image artifacts or documented as inspection notes if tooling is limited.
- Execution impact:
  - Spec can be approved now; implementation should not edit overlapping dirty implementation files until the overlap is approved or proven to be this workflow's intended base.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - TASK-001: Polish shared public visual system, homepage, and about page consistency.
  - TASK-002: Polish gallery grid/modal browsing presentation.
  - TASK-003: Polish booking flow presentation and state readability without behavior changes.
  - TASK-004: Final public-page responsive verification and closeout if not fully covered by previous tasks.
- Suggested first task:
  - TASK-001: Polish public shell/home/about consistency.
- Suggested task ordering:
  - Shared and narrative pages first, gallery second, booking third, final verification last.
- Areas that should not become separate tasks:
  - Backend, admin, env, database, deployment, dependency updates.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Each executable task must use Red -> Green -> Refactor inside Build, Refine, and Polish where code changes occur.
  - Iteration 1 should establish the visible baseline improvement and tests.
  - Iteration 2 should harden responsive/accessibility/state details.
  - Iteration 3 should run broader verification, browser checks, design pre-flight, and cleanup.

## Frontend Taste Application
- Applied skill: design-taste-frontend
- Scope: frontend UI polish for public pages only.
- Notes:
  - Dependency check: `@phosphor-icons/react` is already installed in `client/package.json`; no new icon dependency is needed.
  - Tailwind v4 is present through `tailwindcss` and `@tailwindcss/vite`, but project styling is currently centralized CSS with `@import "tailwindcss";`.
  - Avoid emoji, purple/blue AI gradients, pure black, new card-heavy nesting, and broad dependency additions.

## Polish-UI Artifact Plan
- Reusable artifact path: `.workflow/artifacts/polish-ui/`
- Planned polish artifacts:
  - `.workflow/artifacts/polish-ui/spec.md`
  - `.workflow/artifacts/polish-ui/task-plan.md` after approval
  - `.workflow/artifacts/polish-ui/audit.md`
  - `.workflow/artifacts/polish-ui/before/`
  - `.workflow/artifacts/polish-ui/after/`
  - `.workflow/artifacts/polish-ui/review.md`
  - `.workflow/artifacts/polish-ui/verification.md`
  - `.workflow/artifacts/polish-ui/release-notes.md`
  - `.workflow/artifacts/polish-ui/summary.md`
  - `.workflow/artifacts/polish-ui/handoff.md`
