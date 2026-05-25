# Detailed Spec: KareBraids Full Dark Brand Redesign

## 1. Metadata

- Spec filename: `_workflow/runs/dark-theme/spec.md`
- Date: 2026-05-25
- Request ID / slug: `karebraids-full-dark-brand-redesign`
- Request source: latest direct user prompt and follow-up confirmation
- Execution mode: `complete-workflow`
- Request classification: `feature`
- Scope level: `large`
- Risk level: `medium`

## 2. Original Request

- Raw user request: Redesign all pages and use the provided Kare Braids luxury salon dark color theory based on espresso, bronze, amber, and warm cream tones.
- Normalized request: Perform a full visual redesign of the existing KareBraids React/Vite frontend pages and shared UI using the provided dark brand palette. Preserve routes, copy, booking API behavior, form flow, and existing image/content data unless a small copy/layout adjustment improves the luxury salon feel.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dark-theme/request.md`

## 3. Questions And Answers

- Questions asked:
  - Should the redesign keep the existing page structure and booking behavior, focusing on a full visual redesign using the palette?
- Answers received:
  - Yes. Redesign the current `Home`, `About`, `Gallery`, `Booking`, shared layout/nav/footer, modal, and booking UI visually while keeping routes, copy, booking API behavior, form flow, and existing image/content data unchanged unless a small copy/layout adjustment improves the luxury salon feel.
- Questions skipped:
  - No further questions; remaining unknowns are non-blocking visual execution details.
- Remaining open questions:
  - None blocking.

## 4. Problem Definition

- Problem being solved: The current UI uses a lighter earthy salon visual direction and needs to be redesigned into the newly defined dark luxury brand system.
- Why it matters: KareBraids needs a consistent premium digital presentation that matches the intended high-end salon identity.
- Current pain point: The existing palette and surfaces do not use the requested espresso/bronze/amber/cream system, and the overall site may read as warm/light editorial rather than rich dark salon luxury.
- Expected value: A cohesive, memorable, responsive dark UI across all existing customer-facing pages without disrupting booking or gallery behavior.

## 5. Current State Analysis

- Existing behavior:
  - React Router routes render `Home`, `About`, `Gallery`, and `Booking`.
  - Shared `Layout` provides sticky header, desktop nav, mobile drawer, main outlet, and footer.
  - `Home` includes hero carousel, trust strip, services, why section, gallery preview, testimonials, and CTA.
  - `Gallery` renders nine image cards and opens `GalleryModal`.
  - `Booking` has service/date/time/details/confirmation steps with a click-only calendar and TanStack Query hooks.
- Existing architecture/components:
  - React 19, Vite, React Router, Tailwind v4 import, plain CSS in `client/src/index.css`.
  - `@phosphor-icons/react` is installed and used.
  - TanStack Query hooks are in `client/src/hooks/queries` and `client/src/hooks/mutations`.
  - Shared API client is `client/src/lib/api.js`.
- Existing files/modules likely involved:
  - `client/src/index.css`
  - `client/src/components/Layout.jsx`
  - `client/src/components/Button.jsx`
  - `client/src/components/GalleryModal.jsx`
  - `client/src/pages/Home.jsx`
  - `client/src/pages/About.jsx`
  - `client/src/pages/Gallery.jsx`
  - `client/src/pages/Booking.jsx`
  - `client/test/site-pages.test.jsx`
  - `client/test/gallery-modal.test.jsx`
  - `client/test/booking-flow.test.jsx`
- Existing data flow:
  - Content comes from `client/src/constants/content.js`.
  - Booking availability and creation go through custom hooks and services using the shared API client.
- Existing API/UI/CLI/workflow behavior:
  - Frontend test command: `npm test --prefix client`.
  - Frontend lint command: `npm run lint --prefix client`.
  - Frontend build command: `npm run build --prefix client`.
  - Backend test command exists at root but backend changes are out of scope.
- Existing tests or verification coverage:
  - `client/test/site-pages.test.jsx`
  - `client/test/gallery-modal.test.jsx`
  - `client/test/booking-flow.test.jsx`
  - Prior workflow summaries show route/page, gallery modal, booking calendar, mobile nav, carousel, and visual homepage behavior have been tested.

## 6. Desired End State

- Expected final behavior:
  - Same routes, navigation, gallery modal behavior, and booking flow.
  - All current frontend pages share the new dark espresso luxury brand system.
- User-facing outcome:
  - The site feels warm, premium, earthy, elegant, and salon-specific, with dark espresso foundations, bronze/cocoa surfaces, amber CTAs, and warm cream typography.
- Developer-facing outcome:
  - A consistent set of CSS tokens and selectors supports the new palette with maintainable page/component styling.
- System/workflow outcome:
  - Workflow artifacts record approved spec, task plan, implementation evidence, verification, review, release notes, and summary.
- Backward compatibility expectations:
  - Existing client routes and API integrations remain unchanged.
  - Existing backend and deployment behavior remain unchanged.

## 7. Scope

- In scope:
  - Full visual redesign of current frontend pages and shared layout.
  - CSS token replacement and styling updates for the provided brand palette.
  - Layout refinements that improve premium salon feel while preserving existing content and flows.
  - Accessibility and responsive polish.
  - Test updates for critical behavior and semantic structures.
- Out of scope:
  - Backend/API changes.
  - Database changes.
  - Deployment changes.
  - New routes.
  - New booking steps.
  - Broad content rewrite.
  - Replacing image sources.
- Non-goals:
  - Building a CMS.
  - Adding payments.
  - Creating admin functionality.
  - Replatforming CSS.
- Explicit boundaries:
  - Use existing dependencies unless a need is proven and documented.
  - Do not duplicate server data into Redux.
  - Do not hard-code API URLs.
  - Do not touch secrets or environment values.

## 8. Users And Use Cases

- Primary users:
  - Prospective KareBraids customers browsing styles and booking appointments.
- Secondary users:
  - Site owner/stylist reviewing the brand presentation and booking requests.
- Main use cases:
  - Browse the salon homepage.
  - Learn about KareBraids.
  - View gallery styles and open modal details.
  - Book an appointment request through the existing flow.
- Edge use cases:
  - Mobile user opening the navigation drawer.
  - Keyboard user opening/closing the gallery modal.
  - User selecting unavailable calendar dates.
  - Availability loading, no available slots, API errors, validation errors, and confirmation state.

## 9. Functional Requirements

- Required behaviors:
  - Current routes render successfully.
  - Header/nav/footer remain usable on desktop and mobile.
  - Gallery cards still open the modal and modal close/focus behavior remains intact.
  - Booking service/date/time/details/confirmation flow remains intact.
  - Booking availability and submit calls continue through existing hooks/services.
  - Visual states are redesigned for dark mode while preserving interaction semantics.
- Inputs:
  - Existing content data, route navigation, gallery card clicks, booking form values, calendar/date/time selections.
- Outputs:
  - Rendered dark brand UI and unchanged booking request payload behavior.
- State changes:
  - Existing React local state for nav, carousel, modal, and booking flow remains acceptable.
  - No new global state required.
- Error states:
  - Existing booking validation/API errors remain visible and accessible.
  - Empty availability state remains visible and accessible.
- Permissions/auth expectations:
  - Not applicable; current public frontend does not add auth.

## 10. Non-Functional Requirements

- Performance expectations:
  - Avoid heavy new animation libraries unless already installed and justified.
  - Animate transform/opacity only where animation is needed.
  - Preserve reduced-motion support.
- Reliability expectations:
  - Existing tests, lint, and build should pass after implementation.
  - Booking flow must remain stable.
- Security/privacy expectations:
  - Do not expose secrets or sensitive data.
  - Do not change API client URL handling.
- Accessibility expectations:
  - Maintain keyboard navigation, focus-visible styling, dialog semantics, labels, readable contrast, and disabled-state clarity.
- Maintainability expectations:
  - Keep edits scoped to existing frontend files and tests.
  - Prefer CSS tokens and reusable component-level selectors over scattered hard-coded colors.
- DX expectations:
  - No unnecessary dependency churn.
  - Preserve existing scripts and project structure.

## 11. Affected Surfaces

- Files likely affected:
  - `client/src/index.css`
  - `client/src/components/Layout.jsx`
  - `client/src/components/Button.jsx`
  - `client/src/components/GalleryModal.jsx`
  - `client/src/pages/Home.jsx`
  - `client/src/pages/About.jsx`
  - `client/src/pages/Gallery.jsx`
  - `client/src/pages/Booking.jsx`
  - `client/test/site-pages.test.jsx`
  - `client/test/gallery-modal.test.jsx`
  - `client/test/booking-flow.test.jsx`
  - `_workflow/runs/dark-theme/*`
- Directories likely affected:
  - `client/src`
  - `client/test`
  - `_workflow/runs/dark-theme`
- UI surfaces:
  - Header, desktop nav, mobile drawer, footer, home sections, about page, gallery page, gallery modal, booking page, booking form/calendar/states.
- API routes:
  - None.
- Components:
  - `Layout`, `Button`, `GalleryModal`, page components.
- Services:
  - No service behavior changes expected.
- Database/schema:
  - None.
- Config/env vars:
  - None.
- Tests:
  - Frontend tests may need updates for new semantic markers or preserved behavior.
- Docs:
  - Workflow artifacts only unless durable docs need a concise update.
- Workflow artifacts:
  - `request.md`, `handoff.md`, `spec.md`, `tasks.md`, `progress.md`, `review.md`, `verification.md`, `release-notes.md`, `summary.md`.

## 12. Dependency And Integration Map

- Internal dependencies:
  - `App.jsx` routes depend on page components.
  - `Layout.jsx` wraps pages and owns nav/footer.
  - `Booking.jsx` depends on `useAvailability`, `useCreateBooking`, `services`, and `getApiErrorMessage`.
  - `Gallery.jsx` depends on `GalleryModal` and `galleryItems`.
  - `Home.jsx` depends on `galleryItems`, `services`, `testimonials`, `Button`, and `useRevealOnScroll`.
- External packages/services:
  - `@phosphor-icons/react`, React, React Router, TanStack Query, Axios, Vite, Vitest.
- Integration points:
  - Booking availability and creation API calls through existing hooks/services.
  - External image URLs in content data.
- Ordering constraints:
  - Approve spec before task planning.
  - Create task plan before code edits.
  - Update tests before implementation for behavior-affecting code changes where possible.
- Migration/setup requirements:
  - None expected.

## 13. Data And State Impact

- Data models:
  - No model changes.
- Database changes:
  - None.
- State management changes:
  - No Redux changes expected.
  - Existing local UI state remains appropriate.
- Cache/session/local storage impact:
  - None expected.
- Backward compatibility impact:
  - Booking API payloads and routes must remain compatible.

## 14. UX / API / Workflow Expectations

- UX expectations:
  - Apply the provided palette with approximately 60% dark espresso background, 25% bronze/cocoa surfaces, 10% warm cream text, and 5% amber accents.
  - Avoid cold grays, blue-tinted dark mode, pure black, harsh white, neon accents, and generic flat SaaS styling.
  - Use rich dark surfaces, warm cream typography, subtle bronze borders, amber CTAs, and image overlays that feel premium.
  - Maintain asymmetric/editorial layout quality where suitable while collapsing cleanly on mobile.
- API contract expectations:
  - No API contract changes.
- CLI/workflow behavior:
  - Follow the required run-scoped workflow and stop at approval gates.
- Error handling expectations:
  - Booking validation and API errors remain visible with high contrast.
  - Availability empty/loading states remain clear.
- Empty/loading/success/failure states:
  - Time-slot loading, no slots, validation errors, API errors, selected date/time/service, disabled days, and confirmation must all be styled for dark mode.

## 15. Execution Strategy

- Recommended implementation approach:
  - After approval, generate a vertical task plan with small, literal tasks.
  - Start with tests that lock preserved behavior and key dark-theme semantic expectations.
  - Establish global brand tokens and base shell/shared component styling.
  - Redesign home/about/gallery surfaces.
  - Redesign booking UI states carefully because it has the highest behavioral risk.
  - Run browser checks for desktop and mobile after CSS changes.
- Suggested sequencing:
  - Task 1: Lock routes/shared behavior and install/apply brand tokens to shell/shared UI.
  - Task 2: Redesign home and about pages using existing sections/content/images.
  - Task 3: Redesign gallery page and modal.
  - Task 4: Redesign booking page and booking states.
  - Task 5: Final responsive/browser hardening and workflow closeout.
- Safe rollout/migration approach:
  - Keep behavior-preserving tests green while styling changes land incrementally.
- Files to inspect before editing:
  - Relevant page/component/test files listed in section 11.
- Decisions to avoid until more evidence exists:
  - Adding new animation/dependency libraries.
  - Replacing content/images.
  - Changing service/API contracts.

## 16. Verification Strategy

- Required automated checks:
  - `npm test --prefix client`
  - `npm run lint --prefix client`
  - `npm run build --prefix client`
- Required manual checks:
  - Browser visual checks for `/`, `/about`, `/gallery`, and `/booking` on desktop and mobile.
  - Check for no horizontal overflow, no incoherent overlap, readable text, and preserved flow behavior.
- Test types needed:
  - React Testing Library route/page behavior tests.
  - Gallery modal behavior tests.
  - Booking flow tests.
  - Focused assertions for key dark-theme semantic class/structure where useful.
- Build/lint/typecheck expectations:
  - Build and lint should pass; no separate typecheck script exists in the client package.
- Acceptance evidence required:
  - Passing test/lint/build output or documented failure recovery.
  - Screenshots or browser observations summarized in progress.
- Proof of completion:
  - All tasks completed through Build, Refine, Polish with TDD evidence or justified missing-test exceptions; final review, release notes, summary, handoff, and health check completed.

## 17. Acceptance Criteria

- [ ] All current pages and shared UI use the provided espresso/bronze/amber/warm cream palette consistently.
- [ ] The UI avoids cold gray, blue-tinted dark mode, pure black, harsh white, neon, and generic SaaS styling.
- [ ] Header, desktop navigation, mobile drawer, footer, buttons, focus states, and active states are visually redesigned and remain accessible.
- [ ] Home and About pages feel like an earthy premium salon experience while preserving existing routes and content structure.
- [ ] Gallery page and modal preserve current image data and modal behavior while using the new dark brand treatment.
- [ ] Booking page preserves service/date/time/details/confirmation flow, availability fetching, booking submission, validation, loading, empty, error, disabled, selected, and confirmation behavior.
- [ ] Booking API behavior and shared API client usage remain unchanged.
- [ ] Mobile layouts for all pages are clean, readable, and free of horizontal overflow or incoherent overlaps.
- [ ] Relevant frontend tests are added or updated before behavior-affecting implementation and pass.
- [ ] `npm test --prefix client`, `npm run lint --prefix client`, and `npm run build --prefix client` pass or failures are documented with recovery notes.
- [ ] Workflow artifacts are updated according to the repository workflow.

## 18. Edge Cases And Failure Modes

- Edge cases:
  - Keyboard and screen-reader users in mobile nav and gallery modal.
  - Booking calendar disabled past dates and Sundays.
  - Availability loading, no slots, API failures, invalid form details, mutation pending, and confirmation.
  - Reduced-motion users.
  - Small mobile widths around 320px.
- Failure modes:
  - Insufficient contrast in dark palette.
  - Shared CSS changes breaking existing tests or hidden states.
  - Overly broad selector changes causing modal/calendar/nav regressions.
  - Text or controls overlapping on mobile.
- Regression risks:
  - Booking flow.
  - Gallery modal focus handling.
  - Mobile drawer focus/close behavior.
  - Hero carousel and reveal animation behavior.
- Recovery expectations:
  - Use targeted test failure recovery, fix only in-scope issues, rerun failing commands, and stop if verification cannot prove the task.

## 19. Risks And Mitigations

- Technical risks:
  - Broad CSS file means changes can cascade unexpectedly.
  - Mitigation: implement in small vertical tasks and run targeted tests after each task.
- Product/UX risks:
  - Palette is intentionally dark and warm; poor balance could make the site heavy or low contrast.
  - Mitigation: use the supplied visual ratio and verify contrast/readability manually.
- Security risks:
  - Low; no API/secret changes planned.
  - Mitigation: final diff audit for secrets/env changes.
- Scope risks:
  - "All pages" can expand into content or product changes.
  - Mitigation: saved scope preserves behavior/content and excludes backend/new routes.
- Mitigation plan:
  - Keep implementation within approved tasks, preserve behavior tests, and document any missing-test exceptions.

## 20. Assumptions

- Explicit assumptions:
  - Existing content and image data are acceptable for the redesign.
  - The current CSS approach remains the styling system for this feature.
  - No new dependencies are required for the requested visual quality.
  - Existing tests can be adapted to protect behavior and semantic structure.
- Confidence level:
  - High for scope and affected files; medium for exact visual refinements until browser inspection.
- What to revisit if assumptions are wrong:
  - If existing images do not fit the dark luxury direction, create a follow-up for owned image replacement.
  - If tests cannot assert visual expectations meaningfully, rely on behavior tests plus browser screenshots/manual notes.

## 21. Open Questions

- Blocking questions:
  - None.
- Non-blocking questions:
  - Whether owned salon photography will replace stock images later.
  - Whether the brand should eventually define font assets beyond current system/font stacks.
- Execution impact:
  - None for this workflow.

## 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - Shared shell/theme tokens and route behavior.
  - Home/About visual pass.
  - Gallery/modal visual pass.
  - Booking visual/state pass.
  - Final responsive/browser verification and artifact closeout.
- Suggested first task:
  - Add or update tests that lock current routes/shared navigation behavior and then establish the dark theme token system plus shared header/footer/button/modal foundations.
- Suggested task ordering:
  - Shared styling before page-specific styling, then lower-risk content pages, then booking, then final hardening.
- Areas that should not become separate tasks:
  - Backend/API/database/deployment work.
  - Broad content rewrite.
  - New dependency exploration unless a task proves it is needed.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Each task must complete Build, Refine, and Polish.
  - Code-changing iterations should follow Red -> Green -> Refactor where behavior is testable.
  - CSS-only polish may use a justified missing-test exception plus browser/manual verification, but only after relevant behavior tests exist and pass.

## Frontend Design Pre-Flight For Spec

- [x] Global state is not proposed for arbitrary styling work.
- [x] Mobile layout collapse is an explicit acceptance and verification requirement.
- [x] Full-height sections must use safe dynamic viewport sizing where needed.
- [x] Existing animation effects must preserve cleanup and reduced-motion support.
- [x] Loading, empty, error, selected, disabled, focus, and success states are explicitly covered.
- [x] The spec discourages unnecessary card overuse and requires premium salon-specific composition.
- [x] No CPU-heavy perpetual animation or new animation dependency is proposed.
