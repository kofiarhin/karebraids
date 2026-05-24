# Mobile Navigation Drawer Spec

## 1. Metadata

- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-05-24
- Request ID / slug: mobile-navigation-drawer
- Request source: latest direct user prompt and clarification answer
- Execution mode: complete-workflow
- Request classification: feature
- Scope level: small
- Risk level: medium-low

## 2. Original Request

- Raw user request: "lets work on the navitation. it does not look professional. i want a hamburger menu and a side navigation with links for mobile."
- Normalized request: Improve the KareBraids mobile navigation by keeping the current desktop/tablet header links and "Book Now" CTA, then replacing the mobile horizontal/scrolled navigation with a polished hamburger button that opens a right-side side navigation drawer containing Home, About, Gallery, and Booking links.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers

- Questions asked:
  - Should the hamburger side navigation be mobile-only, with the existing desktop nav kept visible on larger screens?
- Answers received:
  - Yes. Keep desktop header links and "Book Now" for tablet/desktop, then switch at mobile widths to a polished hamburger button that opens a right-side drawer with Home, About, Gallery, and Booking links.
- Questions skipped: None.
- Remaining open questions: None blocking.

## 4. Problem Definition

- Problem being solved: The current mobile navigation appears unprofessional because it exposes the full navigation row on small screens, creating a less intentional mobile experience.
- Why it matters: Mobile visitors need a clean first impression and direct access to core pages without awkward horizontal navigation.
- Current pain point: At `max-width: 840px`, `.site-nav` moves onto its own row and scrolls horizontally; at smaller sizes the brand text and header CTA hide, but the full nav remains visible.
- Expected value: A more polished, expected mobile header pattern with a compact hamburger trigger and dedicated drawer links.

## 5. Current State Analysis

- Existing behavior:
  - `client/src/components/Layout.jsx` renders a sticky header with brand, centered nav links, and `Book Now` CTA.
  - `client/src/index.css` converts the header to two columns at mobile widths and moves `.site-nav` into a horizontally scrollable row.
- Existing architecture/components:
  - React with Vite.
  - React Router `NavLink` for navigation.
  - `@phosphor-icons/react` is installed and already used.
  - Styling is primarily in `client/src/index.css`, with Tailwind v4 imported but the current app uses custom CSS classes.
- Existing files/modules likely involved:
  - `client/src/components/Layout.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Existing data flow: Local UI state only; no server data.
- Existing API/UI/CLI/workflow behavior: UI-only header behavior; no API routes involved.
- Existing tests or verification coverage:
  - `client/test/site-pages.test.jsx` renders site pages and checks primary links.
  - Existing tests do not cover mobile drawer open/close behavior.

## 6. Desired End State

- Expected final behavior:
  - Desktop/tablet header remains a brand link, visible nav links, and visible `Book Now` CTA.
  - Mobile header shows brand and a hamburger menu button.
  - Hamburger opens a right-side navigation drawer with Home, About, Gallery, and Booking links.
  - Drawer closes via close button, backdrop, Escape key, and selecting a drawer link.
- User-facing outcome: Mobile navigation feels intentional, polished, and easy to use.
- Developer-facing outcome: Navigation remains centralized in `Layout.jsx` with focused CSS and tests.
- System/workflow outcome: No backend, routing, env, database, or deployment changes.
- Backward compatibility expectations: Existing routes and desktop navigation continue to work.

## 7. Scope

- In scope:
  - Add mobile menu state and drawer markup.
  - Add hamburger/close icons using installed Phosphor icons.
  - Style the mobile drawer, backdrop, active links, and transitions in the existing CSS system.
  - Add/update frontend tests for drawer behavior.
  - Attempt frontend test, lint, and build verification.
- Out of scope:
  - Desktop header redesign.
  - New routes or content changes.
  - Backend/API/database changes.
  - Deployment changes.
  - Full typography/color system redesign.
- Non-goals:
  - Adding Redux or global state for local menu state.
  - Adding new dependencies.
  - Migrating all CSS to Tailwind utility classes.
- Explicit boundaries:
  - Touch only navigation-related component/CSS/test files and run-scoped workflow artifacts unless verification reveals an in-scope issue.

## 8. Users And Use Cases

- Primary users: Mobile visitors browsing KareBraids services and booking.
- Secondary users: Tablet/desktop visitors who should see no functional regression.
- Main use cases:
  - Open mobile menu.
  - Navigate to Home, About, Gallery, or Booking.
  - Close menu without navigating.
- Edge use cases:
  - Press Escape while drawer is open.
  - Tap backdrop.
  - Move between routes from inside the drawer.
  - Use reduced-motion preferences.

## 9. Functional Requirements

- Required behaviors:
  - Render a hamburger button only for mobile viewports through CSS.
  - Open a right-side drawer when the hamburger is activated.
  - Render Home, About, Gallery, and Booking links in the drawer.
  - Preserve active route styling for drawer links.
  - Close the drawer by close button, backdrop, Escape key, and link click.
  - Prevent background page scroll while drawer is open.
- Inputs:
  - User clicks/taps hamburger button, backdrop, close button, nav links, or presses Escape.
- Outputs:
  - Drawer open/closed visual state and navigation route changes when a link is selected.
- State changes:
  - Local `isMobileNavOpen` state in `Layout.jsx`.
  - Temporary `body` class while open if needed for scroll lock.
- Error states: Not applicable.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements

- Performance expectations: CSS transitions should animate `transform` and `opacity`; avoid layout-heavy animation.
- Reliability expectations: Menu state should clean up on unmount and route/link selection.
- Security/privacy expectations: No sensitive data or secrets involved.
- Accessibility expectations:
  - Hamburger has a clear accessible name.
  - Drawer has a navigation label.
  - Close control has a clear accessible name.
  - Escape key closes the drawer.
  - Focus outlines remain visible.
  - Backdrop is not announced as navigation.
- Maintainability expectations: Keep nav items defined once and reused.
- DX expectations: Tests should prove the drawer can be operated through user-level interactions.

## 11. Affected Surfaces

- Files likely affected:
  - `client/src/components/Layout.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Directories likely affected:
  - `client/src/components/`
  - `client/src/`
  - `client/test/`
  - `_workflow/runs/dev/`
- UI surfaces:
  - Site header.
  - Mobile navigation drawer.
- API routes: Not applicable.
- Components:
  - `Layout`
  - Existing `Button` component remains unchanged unless tests reveal a direct issue.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests:
  - Frontend component tests in `client/test/`.
- Docs:
  - Workflow artifacts only; durable docs likely unchanged.
- Workflow artifacts:
  - `_workflow/runs/dev/request.md`
  - `_workflow/runs/dev/spec.md`
  - `_workflow/runs/dev/tasks.md` after approval only
  - `_workflow/runs/dev/progress.md`
  - `_workflow/runs/dev/handoff.md`
  - final review/release/summary artifacts after implementation

## 12. Dependency And Integration Map

- Internal dependencies:
  - React Router `NavLink`.
  - Existing `Button` component.
  - Existing CSS variables and header classes.
- External packages/services:
  - `@phosphor-icons/react` for hamburger/close icons. Already installed.
  - `@testing-library/react` and `@testing-library/user-event` for interaction tests. Already installed.
- Integration points:
  - Header navigation routes: `/`, `/about`, `/gallery`, `/booking`.
- Ordering constraints:
  - Add tests first, observe expected failure when possible, then implement.
  - Update CSS after markup/state changes.
- Migration/setup requirements: None.

## 13. Data And State Impact

- Data models: Not applicable.
- Database changes: None.
- State management changes:
  - Add local React state only for the mobile drawer.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Existing links and routes stay the same.

## 14. UX / API / Workflow Expectations

- UX expectations:
  - Header remains compact on mobile.
  - Drawer slides in from the right over a muted backdrop.
  - Drawer uses the existing KareBraids palette, restrained shadows, clear spacing, and no gimmicky effects.
  - Controls have tactile hover/active/focus states.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Follow saved spec approval before planning and implementation.
- Error handling expectations: Not applicable.
- Empty/loading/success/failure states: Not applicable for this local UI control.

## 15. Execution Strategy

- Recommended implementation approach:
  - Add a focused test that opens and closes the mobile menu with user interactions.
  - Update `Layout.jsx` with local drawer state, hamburger and close buttons, backdrop, and drawer nav.
  - Add `useEffect` handlers for Escape key and body scroll lock with cleanup.
  - Update `index.css` to hide desktop nav on mobile and show the mobile menu trigger/drawer behavior.
  - Run focused frontend tests, then broader lint/build as feasible.
- Suggested sequencing:
  - One vertical task: make mobile drawer navigation work and look polished.
- Safe rollout/migration approach: CSS keeps desktop navigation unchanged above the mobile breakpoint.
- Files to inspect before editing:
  - `client/src/components/Layout.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `client/package.json`
- Decisions to avoid until more evidence exists:
  - Do not add a focus-trap library unless accessibility testing proves it is necessary.
  - Do not migrate the header to a new styling system.

## 16. Verification Strategy

- Required automated checks:
  - Focused Vitest command for updated site page/navigation tests.
  - `npm test` in `client` if feasible.
  - `npm run lint` in `client`.
  - `npm run build` in `client`.
- Required manual checks:
  - Inspect desktop and mobile layouts in browser if a dev server is started during implementation.
  - Confirm no overlapping text or duplicate visible nav on mobile.
- Test types needed:
  - React Testing Library interaction test for opening and closing the drawer.
  - Existing page render tests should continue passing.
- Build/lint/typecheck expectations:
  - No new lint errors.
  - Vite build succeeds.
- Acceptance evidence required:
  - Test output and/or documented manual/browser checks.
- Proof of completion:
  - Updated component/CSS/tests and workflow progress/review/summary artifacts.

## 17. Acceptance Criteria

- [ ] Desktop/tablet header still shows brand, nav links, and "Book Now" CTA.
- [ ] Mobile header uses a hamburger button instead of showing the horizontal nav row.
- [ ] Hamburger opens a right-side drawer with Home, About, Gallery, and Booking links.
- [ ] Drawer closes via close button, backdrop, Escape key, and drawer link selection.
- [ ] Navigation controls have accessible labels and visible focus states.
- [ ] Existing routes and page tests continue to pass.
- [ ] Relevant frontend test, lint, and build verification are attempted and documented.

## 18. Edge Cases And Failure Modes

- Edge cases:
  - User opens drawer then changes route.
  - User presses Escape when drawer is open.
  - User taps outside the drawer.
  - Viewport changes while drawer is open.
- Failure modes:
  - Body remains scroll-locked after drawer closes.
  - Mobile drawer appears alongside desktop nav.
  - Drawer cannot be closed by keyboard.
  - CSS breakpoint accidentally hides desktop navigation too early.
- Regression risks:
  - Existing tests expecting two `Book Now` links may need careful handling if mobile CTA markup changes visibility but remains in DOM.
  - Shared `.nav-link` styles could affect drawer links unexpectedly.
- Recovery expectations:
  - Keep changes scoped and rerun the focused failing command after each fix.

## 19. Risks And Mitigations

- Technical risks:
  - JSDOM does not evaluate CSS breakpoints, so tests cannot fully prove responsive visibility.
  - Mitigation: Test DOM behavior and use browser/manual responsive inspection if implementation proceeds.
- Product/UX risks:
  - Drawer could feel too generic or too heavy.
  - Mitigation: Use existing brand palette, tight hierarchy, and minimal motion.
- Security risks:
  - None identified.
- Scope risks:
  - Header redesign could expand into broader brand changes.
  - Mitigation: Preserve desktop header and only change mobile navigation behavior.
- Mitigation plan:
  - One narrow task with focused acceptance criteria and verification.

## 20. Assumptions

- Explicit assumptions:
  - Mobile breakpoint can follow the existing `840px` and `560px` CSS structure unless implementation evidence suggests a cleaner single breakpoint.
  - Existing custom CSS classes remain the right styling approach for this feature.
  - The drawer should include a Booking link, but the separate desktop `Book Now` CTA can remain hidden on narrow mobile as it is today.
- Confidence level: High.
- What to revisit if assumptions are wrong:
  - Breakpoint choice if the drawer looks cramped on tablets.
  - Whether Booking should be visually emphasized inside the drawer.

## 21. Open Questions

- Blocking questions: None.
- Non-blocking questions:
  - Should Booking be styled as the primary drawer action?
- Execution impact:
  - Treat Booking as a slightly stronger drawer link if it fits existing design, but do not block on this.

## 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - `TASK-001: Add mobile hamburger drawer navigation`
- Suggested first task:
  - Add tests and implement the mobile drawer in `Layout.jsx` and `index.css`.
- Suggested task ordering:
  - Single vertical task should be sufficient.
- Areas that should not become separate tasks:
  - Backend/API work.
  - Deployment changes.
  - Global styling migration.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Iteration 1 Build: Add failing test for drawer interactions, implement basic drawer behavior, pass focused test.
  - Iteration 2 Refine: Improve accessibility and close behaviors, rerun focused tests and lint.
  - Iteration 3 Polish: Tighten visual polish/responsive CSS, run broader frontend verification and manual/browser checks if feasible.
