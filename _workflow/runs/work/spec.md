# Detailed Spec — KareBraids Global Theme System

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-06
- Request ID / slug: `global-theme-system`
- Request source: latest direct user prompt and follow-up clarification
- Execution mode: `complete-workflow`
- Request classification: frontend architecture, accessibility, styling, and component testing
- Scope level: cross-cutting frontend feature
- Risk level: medium

## 2. Original Request
- Raw user request: Implement a production-ready global `system`, `light`, and `dark` theme system with persistence, live OS tracking, root `data-theme` application, no-FOUC bootstrap, semantic light tokens, accessible nested desktop/mobile ThemeMenu, and Vitest tests.
- Clarification: Theme selection in the mobile drawer closes the submenu, parent overflow menu, and mobile navigation drawer, returning the user to page content. Desktop and mobile should otherwise behave consistently.
- Normalized request: See `_workflow/runs/work/request.md`.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: Should selecting a theme inside the mobile drawer leave the drawer open?
- Answers received: No. Close the theme submenu, overflow menu, and mobile drawer; apply and persist immediately and return to page content.
- Questions skipped: None.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: KareBraids currently has a single dark visual treatment and no durable user preference, live system-mode behavior, accessible theme control, or pre-render theme initialization.
- Why it matters: Users need an accessible light option, a system-following option, and a stable appearance across refreshes without visual flashing.
- Current pain point: Root semantic tokens are dark-only, `Layout.jsx` uses a dark-specific shell name, and the header has no theme control.
- Expected value: A centralized, testable, brand-consistent theme capability available across every route without page rewrites.

## 5. Current State Analysis
- Existing behavior: `client/src/index.css` defines dark semantic variables in `:root`; the app renders without an explicit theme dataset; `Layout.jsx` uses `site-shell dark-brand-shell`; no preference is stored.
- Existing architecture/components: `client/src/main.jsx` renders `AppProviders`, `client/src/redux/providers.jsx` owns Query Client and BrowserRouter providers, `App.jsx` renders routes through `Layout.jsx`, and `Header.jsx` owns desktop navigation and an accessible mobile drawer.
- Existing files/modules likely involved: `client/index.html`, `client/src/redux/providers.jsx`, `client/src/components/Layout.jsx`, `client/src/components/Header.jsx`, `client/src/index.css`, plus new theme and ThemeMenu files/tests.
- Existing data flow: Client-only React state and browser APIs; no server involvement.
- Existing API/UI/CLI/workflow behavior: The sticky header shows logo, navigation, CTA, and a mobile drawer. Existing mobile Escape and focus-return behavior is handled in `Header.jsx`.
- Existing tests or verification coverage: Vitest uses jsdom and Testing Library through `client/test/setup.js`; component coverage exists but no theme tests.

## 6. Desired End State
- Expected final behavior: The app supports a stored preference of `system`, `light`, or `dark`; resolves it to light/dark; updates the root dataset immediately; and tracks OS changes while system mode is selected.
- User-facing outcome: Users can choose a theme from a subtle nested overflow menu on desktop or mobile, retain that choice across visits, and see a polished branded light or existing dark experience without an initial flash.
- Developer-facing outcome: Theme behavior is centralized in pure helpers and a provider, exposed through a stable context API, and protected by focused tests.
- System/workflow outcome: Every route inherits the provider and semantic tokens without component-level theme classes.
- Backward compatibility expectations: Current dark styling, navigation, booking routes, CTA prominence, and page structures remain intact.

## 7. Scope
- In scope:
  - Theme constants and safe browser/storage/media-query helper functions.
  - Theme context/provider and consumer hook or equivalent exported access API.
  - Root provider integration.
  - Inline no-FOUC theme initialization.
  - Dedicated light semantic token overrides and any necessary theme-neutral semantic token aliases.
  - Theme-neutral layout shell naming.
  - Accessible nested ThemeMenu integrated in desktop and mobile header surfaces.
  - TDD-first Vitest/Testing Library tests and existing-suite verification.
- Out of scope:
  - Backend/API/database/auth changes.
  - User-account preference synchronization or cross-device sync.
  - Rewriting pages or converting to Tailwind `dark:` classes.
  - New external dependencies.
  - Unrelated header, navigation, booking, typography, or content redesign.
- Non-goals: A general settings panel, animation-heavy theme transitions, or theme scheduling.
- Explicit boundaries: Component styles consume semantic variables; resolved theme is applied only on `document.documentElement`.

## 8. Users And Use Cases
- Primary users: Prospective and returning KareBraids clients browsing and booking from desktop or mobile.
- Secondary users: Users with OS-level light/dark preferences or contrast sensitivity.
- Main use cases: Follow system preference, force light, force dark, revisit with preference retained, change a theme without navigation.
- Edge use cases: Storage unavailable/corrupt, matchMedia unavailable in tests or unusual browsers, OS preference changes while open, menu dismissed without selection, nested menu keyboard use, and selection from within the mobile drawer.

## 9. Functional Requirements
- Required behaviors:
  - Define canonical preference values `system`, `light`, `dark` and resolved values `light`, `dark`.
  - Read only valid stored values from `karebraids-theme`; otherwise return `system`.
  - Persist valid selection and fail safely when storage is unavailable.
  - Detect current dark system preference through `window.matchMedia('(prefers-color-scheme: dark)')`.
  - Resolve `system` dynamically and explicit preferences directly.
  - Provider exposes `theme`, `resolvedTheme`, and `setTheme`.
  - Provider subscribes to media-query `change`, updates resolved theme only as relevant, and cleans up listeners.
  - Provider updates `document.documentElement.dataset.theme` to `light` or `dark`.
  - Inline bootstrap performs equivalent validation/resolution before the app script executes.
  - ThemeMenu opens an overflow menu; its Theme item opens a nested submenu containing System, Light, and Dark with requested icons and active Check.
  - Selecting an option immediately calls `setTheme`, closes submenu and parent menu, and invokes an optional mobile completion callback that closes the drawer.
  - Outside click and Escape close open menu layers; trigger state and relationships use requested ARIA attributes.
  - Keyboard/tab access reaches all actions; opening/closing and selection use predictable focus management and return.
- Inputs: Stored string preference, system media-query state, user click/keyboard selection.
- Outputs: React context state, root dataset, persisted preference, visible checked menu state.
- State changes: In-memory preference/resolution, localStorage key, menu open states, mobile drawer state.
- Error states: Invalid storage and browser API failures fall back safely without crashing.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: No network requests; one media-query subscription; minimal rerenders; no broad DOM mutation beyond root dataset.
- Reliability expectations: StrictMode-safe initialization and cleanup; deterministic storage validation; bootstrap/runtime parity.
- Security/privacy expectations: Store only a non-sensitive enum; inline script must be static and must not interpolate user content.
- Accessibility expectations: Semantic buttons/menu roles as appropriate, visible focus, keyboard and tab operation, Escape, outside click, ARIA relationships/state, active state conveyed beyond color, and sufficient light/dark contrast.
- Maintainability expectations: Pure helpers remain testable and menu/provider responsibilities stay separated.
- DX expectations: No new package or configuration burden; clear exports and focused tests.

## 11. Affected Surfaces
- Files likely affected:
  - `client/index.html`
  - `client/src/index.css`
  - `client/src/redux/providers.jsx`
  - `client/src/components/Layout.jsx`
  - `client/src/components/Header.jsx`
  - `client/src/theme/theme.js` (new)
  - `client/src/theme/ThemeProvider.jsx` (new)
  - `client/src/theme/ThemeProvider.test.jsx` (new)
  - `client/src/components/ThemeMenu.jsx` (new)
  - `client/src/components/ThemeMenu.test.jsx` (new)
  - Run-scoped workflow artifacts and `.workflow/fallow-audit.md`
- Directories likely affected: `client/src/theme`, `client/src/components`, `client/src/redux`, `client/src`, `client`, `_workflow/runs/work`, `.workflow`.
- UI surfaces: Global document, desktop header actions, mobile navigation drawer, all routes through semantic tokens.
- API routes: None.
- Components: AppProviders, Layout, Header, ThemeMenu, ThemeProvider.
- Services: None.
- Database/schema: None.
- Config/env vars: None.
- Tests: ThemeProvider and ThemeMenu tests; existing frontend suite.
- Docs: Workflow review/release/summary and brief CSS migration notes in release notes.
- Workflow artifacts: request, handoff, spec, tasks, progress, review, release notes, summary, and Fallow audit.

## 12. Dependency And Integration Map
- Internal dependencies: AppProviders wraps BrowserRouter/app; Header consumes ThemeMenu; ThemeMenu consumes ThemeProvider API; CSS semantic tokens style all pages.
- External packages/services: React 19, React Router, `@phosphor-icons/react`, Testing Library, Vitest/jsdom; all already installed.
- Integration points: Browser localStorage, matchMedia, `document.documentElement.dataset`, existing mobile drawer state and focus lifecycle.
- Ordering constraints: Tests/helpers/provider first, provider root integration, bootstrap, CSS tokens/layout naming, menu tests/component, header integration, full verification.
- Migration/setup requirements: None for users or deployment; the new light block and neutral shell selector replace dark-only assumptions.

## 13. Data And State Impact
- Data models: Theme preference enum only; no server model.
- Database changes: None.
- State management changes: Add React context state; do not add Redux because this preference has dedicated browser synchronization logic and no Redux store currently exists in the provider module.
- Cache/session/local storage impact: Add `localStorage['karebraids-theme']` with `system|light|dark`.
- Backward compatibility impact: First visit defaults to system, which may show light for light-OS users rather than the former universal dark appearance; explicit dark restores the existing palette.

## 14. UX / API / Workflow Expectations
- UX expectations: Overflow trigger is compact and visually subordinate to Book Appointment. Nested menu uses premium restrained cream/espresso/bronze surfaces, concise labels, clear selected state, and no visible “Theme” label outside the menu.
- API contract expectations: ThemeProvider context shape includes `theme`, `resolvedTheme`, and `setTheme(nextTheme)`; invalid values are not accepted as persisted preferences.
- CLI/workflow behavior: Use existing `npm --prefix client` scripts.
- Error handling expectations: Storage/media-query issues do not block rendering or selection; system fallback is light where system darkness cannot be detected.
- Empty/loading/success/failure states: No loading state. Success is immediate visual application and checked state. Failure to persist is silent but does not break current-session theming.
- Mobile completion behavior: Selection closes ThemeMenu layers and the mobile drawer, restoring the page and using the drawer’s established focus-return behavior.

## 15. Execution Strategy
- Recommended implementation approach:
  1. Add pure constants/validation/storage/resolution helpers and provider tests first.
  2. Implement provider with lazy preference initialization, media-query subscription, root effect, stable context value, and safe cleanup.
  3. Integrate provider at the outer application-provider root and add a self-contained bootstrap script before the module script.
  4. Make dark theme explicit/default-compatible and add `:root[data-theme="light"]` semantic overrides; rename `dark-brand-shell` to a neutral selector.
  5. Add ThemeMenu interaction tests first, then implement the controlled completion callback and accessible nested menu.
  6. Integrate one instance beside the desktop CTA and one below the mobile drawer header.
  7. Verify focused tests, full tests, lint, build, UI code-surface/screenshot where tooling permits, navigation behavior, final diff, review, Fallow, and workflow artifacts.
- Suggested sequencing: Theme engine vertical slice, no-FOUC/token slice, accessible UI/header slice, final hardening.
- Safe rollout/migration approach: Preserve existing `:root` dark values so script-disabled/legacy behavior remains dark-compatible; override light only when the dataset says light.
- Files to inspect before editing: All affected files above, existing Button/Header focus patterns, full semantic token declarations, test setup, and Fallow instructions.
- Decisions to avoid until more evidence exists: Replacing header structure, introducing a menu library, broad page-specific token fixes, or animating global colors.

## 16. Verification Strategy
- Required automated checks:
  - Focused ThemeProvider tests.
  - Focused ThemeMenu tests.
  - Full client Vitest suite.
  - Client ESLint.
  - Client production build.
  - Fallow JSON audit using required quiet/explain command shape.
- Required manual checks:
  - Inspect root dataset for stored explicit and system preferences.
  - Confirm no-FOUC script precedes React module execution.
  - Exercise desktop/mobile menus, Escape, outside click, focus return, selection close behavior, and booking/navigation controls.
  - Inspect light/dark semantic contrast and CTA hierarchy; capture screenshot if runnable browser tooling is available, otherwise document code-surface review.
- Test types needed: Pure helper unit tests, provider behavior tests with matchMedia event simulation, and component interaction/accessibility tests.
- Build/lint/typecheck expectations: Tests, lint, and Vite build pass; no standalone typecheck script exists.
- Acceptance evidence required: Red/Green/Refactor evidence in all three iterations for each code-changing task, exact commands/results, checked criteria, diff audit, review, Fallow verdict, and health check.
- Proof of completion: Passing automated checks plus documented manual/code-surface validation and complete workflow artifacts.

## 17. Acceptance Criteria
- [ ] `system`, `light`, and `dark` are the only persisted preferences, defaulting invalid/missing values to `system`.
- [ ] Explicit preferences persist under `karebraids-theme` and survive provider remount/refresh behavior.
- [ ] System mode resolves from `prefers-color-scheme` and updates live without refresh.
- [ ] `document.documentElement.dataset.theme` is always synchronized to resolved `light` or `dark`.
- [ ] An inline pre-React bootstrap sets the initial root dataset with matching validation/resolution semantics.
- [ ] The existing dark design remains intact and a complete accessible luxury light semantic-token palette is available without page rewrites or Tailwind `dark:` classes.
- [ ] Layout naming is theme-neutral and no theme class is applied to individual pages/components.
- [ ] Desktop ThemeMenu appears immediately after Book Appointment and remains visually secondary.
- [ ] Mobile ThemeMenu appears directly below the drawer header.
- [ ] Both menus provide the requested nested structure/icons/active Check and support click, tab/keyboard, outside click, Escape, ARIA state, and focus management.
- [ ] Selection applies/persists immediately and closes submenu and overflow menu; mobile selection also closes the navigation drawer and returns to page content.
- [ ] Requested tests cover default, explicit selections, persistence, resolution, media changes, root application, and menu open/close/selection behavior.
- [ ] Full client tests, lint, and build pass with no navigation or booking regressions.

## 18. Edge Cases And Failure Modes
- Edge cases: Invalid/missing storage, storage exceptions, undefined matchMedia, OS changes in explicit mode, repeated same-theme selection, StrictMode double effects, multiple menu instances, nested Escape handling, click on submenu not treated as outside click, and mobile selection racing drawer focus restoration.
- Failure modes: Bootstrap/runtime mismatch causes theme flip; leaked media listener causes duplicate updates; conflicting document listeners close menus prematurely; light mode leaves hard-coded translucent dark aliases; mobile menu remains mounted/open after selection.
- Regression risks: Header grid width/CTA spacing, mobile drawer navigation order, focus restoration, existing CSS aliases, and tests sharing root dataset/localStorage state.
- Recovery expectations: Isolate and reset browser globals in tests, keep listeners scoped/cleaned, and limit CSS changes to semantic/theme variables and new menu selectors.

## 19. Risks And Mitigations
- Technical risks: Inline script duplication and matchMedia compatibility. Mitigate with deliberately identical enum/query logic, safe guards, and tests around runtime helpers.
- Product/UX risks: Overflow control competes with CTA or nested menu feels cumbersome. Mitigate with compact icon-only trigger, restrained styling, clear labels/icons, and immediate close after selection.
- Security risks: Inline script and storage handling. Mitigate by using only hard-coded enum values and no dynamic HTML/user interpolation.
- Scope risks: Global light mode may reveal legacy hard-coded dark colors. Mitigate by auditing semantic token consumers and fixing only token-level leaks required for acceptance rather than rewriting pages.
- Mitigation plan: TDD-first slices, focused visual code audit, full suite/build/lint, final diff audit, and Fallow quality review.

## 20. Assumptions
- Explicit assumptions:
  - `window.matchMedia('(prefers-color-scheme: dark)')` is the canonical system signal.
  - When that API is unavailable, system resolves to light.
  - Existing `:root` values remain the dark baseline and may be optionally mirrored under `:root[data-theme="dark"]` only if needed for clarity without changing values.
  - ThemeProvider may export a `useTheme` hook in addition to the provider to give ThemeMenu safe access.
  - ThemeMenu accepts an optional `onThemeSelected` callback for mobile drawer completion.
  - No new dependency is necessary.
- Confidence level: High.
- What to revisit if assumptions are wrong: Fallback resolution, exact context API naming, or additional semantic token overrides discovered by test/visual audit.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Exact menu geometry and which additional existing alpha/surface aliases need light overrides will be determined from the CSS audit while preserving semantic-only strategy.
- Execution impact: None before planning.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - `TASK-001`: Add tested theme helpers/provider and root dataset synchronization.
  - `TASK-002`: Add no-FOUC bootstrap and semantic light/dark shell styling.
  - `TASK-003`: Add tested accessible ThemeMenu and desktop/mobile header integration.
  - `TASK-004`: Run regression hardening, visual/accessibility review, full verification, and migration documentation.
- Suggested first task: Theme helpers/provider because all UI behavior depends on its public contract.
- Suggested task ordering: Engine -> bootstrap/tokens -> menu/integration -> hardening.
- Areas that should not become separate tasks: Backend, Redux setup, individual page conversions, or dependency installation.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each task starts with a failing behavior test where possible, implements the smallest passing slice, then tightens edge cases/cleanup and finishes with accessibility/maintainability polish plus repeated verification.

## 23. Frontend Taste Application
- Applicable.
- Detection result and reason: The request adds JSX UI, nested interactive menu behavior, global CSS token styling, and frontend visual refinement.
- Applied skill: design-taste-frontend
- Required propagation points: Record `Applied skill: design-taste-frontend` in tasks, iteration evidence, review, verification, release notes, summary, and final health check; perform a pre-implementation UI audit and post-implementation UI review.

## 24. Approved Corrective Amendment — Theme Trigger Hierarchy
- Date: 2026-06-06
- Source: latest direct user prompt; discovery and questions explicitly skipped.
- Relationship to approved spec: corrective continuation of Acceptance Criteria requiring the ThemeMenu to remain visually secondary and Book Appointment to remain dominant.
- Required change: reduce the desktop overflow trigger to an approximately 36px transparent ghost utility button with semantic subtle border/text/hover/focus treatment and 10–12px CTA separation; retain an intentional low-contrast treatment in the mobile drawer.
- Behavior constraints: no changes to theme state, persistence, system syncing, menu structure, active check, keyboard navigation, outside click, Escape, focus return, or desktop/mobile selection behavior.
- Verification: add a failing static styling regression test first, then run focused ThemeMenu/bootstrap tests, full client tests, changed-file lint, build, diff audit, and Fallow.
- Applied skill: design-taste-frontend
