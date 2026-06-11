# Detailed Spec: Reusable Public GSAP Animation System

## 1. Metadata
- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-06-10
- Request ID / slug: `public-gsap-animation-system`
- Request source: direct user prompt
- Execution mode: `complete-workflow`
- Request classification: frontend animation architecture and UI polish
- Scope level: cross-page client feature
- Risk level: medium

## 2. Original Request
- Raw user request: Implement a reusable GSAP animation system across all public KareBraids pages, excluding admin, with route transitions, scroll reveals, Gallery emphasis, Booking restraint, reduced-motion support, cleanup, and full verification.
- Normalized request: Add GSAP dependencies and a centralized, reusable, scoped animation layer for all public routes while preserving behavior and excluding `/admin`.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers
- Questions asked: none
- Answers received: not applicable
- Questions skipped: none; the request already defines the required decisions
- Remaining open questions: none blocking

## 4. Problem Definition
- Problem being solved: Public-page motion is inconsistent and currently limited to a homepage-only global IntersectionObserver hook.
- Why it matters: A consistent motion language improves perceived polish, hierarchy, and continuity across the customer journey.
- Current pain point: Reveal logic is not reusable across pages, uses global selectors, and cannot provide richer Gallery or route choreography.
- Expected value: A maintainable animation system that delivers premium motion without harming accessibility, booking usability, mobile smoothness, or admin workflows.

## 5. Current State Analysis
- Existing behavior: `Home` calls `useRevealOnScroll`, which globally queries `[data-reveal]`; CSS controls opacity/translation. Other public pages do not use the same reveal lifecycle.
- Existing architecture/components: Shared `Layout` renders header, main outlet, footer, and includes `/admin`; `App.jsx` defines all public and admin routes together.
- Existing files/modules likely involved: `client/src/App.jsx`, `client/src/hooks/useRevealOnScroll.js`, public pages/components, `GalleryModal.jsx`, `index.css`, client tests, and `client/package.json`.
- Existing data flow: Services, Gallery, Booking, and Contact include asynchronous query/mutation states that must remain unchanged.
- Existing API/UI/CLI/workflow behavior: Public route navigation uses React Router; `RouteScrollManager` handles scroll restoration; Gallery modal restores focus; Booking is a multi-step form.
- Existing tests or verification coverage: Vitest/RTL coverage exists for pages, Gallery modal, Gallery query behavior, Booking, Contact, service detail, route behavior, theme tokens, and Admin.

## 6. Desired End State
- Expected final behavior: Every listed public page uses consistent GSAP-powered entry and scroll motion through reusable components/hooks.
- User-facing outcome: Smooth fades, slide-ups, grouped text reveals, image mask reveals, staggered lists, and shallow parallax, with Gallery receiving richer choreography.
- Developer-facing outcome: Central plugin setup, shared motion defaults, scoped refs, predictable cleanup, and minimal page-local animation logic.
- System/workflow outcome: Public routes are animated; `/admin` is structurally excluded; reduced-motion users receive immediate static content.
- Backward compatibility expectations: Existing routes, search params, API calls, forms, loading/error/empty states, modal behavior, focus restoration, and copy remain compatible.

## 7. Scope
- In scope:
  - Install `gsap` and `@gsap/react` in `client`.
  - Add centralized GSAP/ScrollTrigger setup.
  - Add `useReducedMotion` and reusable reveal/transition primitives.
  - Apply the system to `/`, `/about`, `/gallery`, `/services`, `/services/:slug`, `/booking`, and `/contact`.
  - Enhance existing Gallery grid and modal motion.
  - Retire or replace the legacy IntersectionObserver reveal system.
  - Add/update focused tests and run requested verification.
- Out of scope:
  - Admin animation.
  - Backend/API/database/auth/deployment changes.
  - New copy, routes, business logic, Gallery data, or Booking flow.
  - Scroll hijacking, blocking intros, paid plugins, complex 3D, bounce/spin effects.
- Non-goals: Full visual redesign, animation framework abstraction beyond GSAP, or introducing Framer Motion.
- Explicit boundaries: Animation must use transform/opacity-oriented techniques, remain scoped, and never delay interaction.

## 8. Users And Use Cases
- Primary users: Prospective and returning KareBraids customers browsing services, inspiration, booking, and contact information.
- Secondary users: Staff using `/admin`, who must see no new decorative GSAP behavior.
- Main use cases: Browse public pages, compare services, open Gallery images, book an appointment, submit contact enquiries.
- Edge use cases: Reduced-motion preference, slow images/API responses, back/forward navigation, mobile touch devices, direct deep links, and query-string Gallery filtering.

## 9. Functional Requirements
- Required behaviors:
  - Register GSAP, `useGSAP`, and ScrollTrigger centrally.
  - Animate incoming public route content with a subtle fade/slide.
  - Reveal public sections on scroll.
  - Stagger repeated cards/list items.
  - Reveal images through overflow-hidden mask wrappers with slight scale normalization.
  - Support restrained text-block reveals without paid text-splitting plugins.
  - Add shallow parallax only to selected visual layers.
  - Animate Gallery cards more distinctly and animate the existing modal surface/image.
  - Disable all GSAP motion when reduced motion is preferred.
  - Exclude `/admin` from route transitions and decorative reveal wrappers.
- Inputs: Route location, component refs, animation props, media preference, async rendered content.
- Outputs: Scoped GSAP tweens/timelines and ScrollTriggers.
- State changes: No business state changes; animation state remains internal to GSAP/component lifecycle.
- Error states: Content remains visible and usable if GSAP setup, media APIs, or ScrollTrigger behavior cannot initialize.
- Permissions/auth expectations: No auth changes; Admin remains functionally unchanged.

## 10. Non-Functional Requirements
- Performance expectations: Animate transform and opacity, use shallow distances, avoid scroll listeners, avoid unnecessary `will-change`, and keep mobile parallax minimal.
- Reliability expectations: StrictMode-safe registration and cleanup; no stale ScrollTriggers after route or modal unmount.
- Security/privacy expectations: Not applicable beyond no new external services or data collection.
- Accessibility expectations: Respect `prefers-reduced-motion`; never hide content permanently; preserve focus order, modal semantics, keyboard behavior, and readable states.
- Maintainability expectations: Animation logic stays in `animations/`, hooks, and reusable components rather than duplicated page effects.
- DX expectations: Clear component props, centralized defaults, predictable tests, and no global query selectors outside a component-scoped context.

## 11. Affected Surfaces
- Files likely affected:
  - `client/package.json`
  - `client/package-lock.json`
  - `client/src/App.jsx`
  - `client/src/animations/gsapSetup.js`
  - `client/src/hooks/useReducedMotion.js`
  - `client/src/hooks/useScrollReveal.js`
  - `client/src/hooks/useRevealOnScroll.js`
  - `client/src/components/animations/*.jsx`
  - Public pages and selected public subcomponents
  - `client/src/components/GalleryModal.jsx`
  - `client/src/index.css`
  - Client tests
- Directories likely affected: `client/src/animations`, `client/src/hooks`, `client/src/components/animations`, `client/src/pages`, `client/src/components`, `client/test`.
- UI surfaces: All public pages and existing Gallery modal.
- API routes: none.
- Components: Route wrapper, reveal primitives, Gallery modal, public page sections/cards/images.
- Services: none.
- Database/schema: none.
- Config/env vars: none.
- Tests: animation primitives, route exclusion, reduced motion, existing public route suites, Admin regression.
- Docs: run-scoped workflow artifacts and quality evidence.
- Workflow artifacts: `_workflow/runs/dev/*`, `.workflow/fallow-audit.md`, optional polish evidence.

## 12. Dependency And Integration Map
- Internal dependencies: React Router location/outlet, existing `RouteScrollManager`, public page/component trees, Gallery modal lifecycle, async query hooks.
- External packages/services: `gsap`, `@gsap/react`; no external service.
- Integration points:
  - `App.jsx` public route structure.
  - `useGSAP` for lifecycle-scoped animation.
  - ScrollTrigger for scroll reveals/parallax.
  - `window.matchMedia` for reduced motion.
  - Existing CSS transitions and modal behavior.
- Ordering constraints: Install dependencies, add setup/hooks/primitives, integrate public route boundary, migrate pages, then Gallery enhancement and verification.
- Migration/setup requirements: Remove or stop invoking the legacy reveal hook once equivalent GSAP coverage is active.

## 13. Data And State Impact
- Data models: none.
- Database changes: none.
- State management changes: none; no Redux or TanStack Query contract changes.
- Cache/session/local storage impact: none.
- Backward compatibility impact: Animation wrappers must preserve DOM semantics and query-driven rerenders.

## 14. UX / API / Workflow Expectations
- UX expectations:
  - Route entry: approximately 250-450ms subtle fade and small upward shift.
  - Section reveal: approximately 450-700ms with restrained easing and once-only triggers.
  - Staggers: short 50-100ms spacing, capped to avoid long waits.
  - Images: mask/scale reveal without layout shift.
  - Gallery: stronger stagger, gentle image hover zoom, shallow parallax, and smooth modal surface/image entry/exit.
  - Booking: brief initial/step reveals only; fields and controls are available immediately.
- API contract expectations: unchanged.
- CLI/workflow behavior: approval-gated plan and complete workflow after approval.
- Error handling expectations: no animation failure may blank or block content.
- Empty/loading/success/failure states: Existing states remain visible; optional reveal applies when they render but never delays them.

## 15. Execution Strategy
- Recommended implementation approach:
  - Add `gsapSetup.js` with guarded one-time plugin registration and shared easing/duration constants.
  - Implement `useReducedMotion` with reactive `matchMedia` subscription and SSR/test guards.
  - Implement reusable `PageTransition`, `Reveal`, `StaggerReveal`, `ImageReveal`, and `ParallaxLayer` components plus `useScrollReveal` where hook-level use is more appropriate.
  - Create a public route shell or route element boundary keyed by pathname; keep `/admin` as a sibling route outside it.
  - Migrate existing `data-reveal` usage to wrappers or a scoped compatibility hook, avoiding global document queries.
  - Apply primitives page-by-page with conservative defaults and Gallery/Booking variants.
  - Enhance Gallery modal with a scoped timeline while preserving immediate close semantics and focus restoration.
- Suggested sequencing: dependencies/setup -> primitives/tests -> route boundary -> public-page adoption -> Gallery/Booking hardening -> full verification.
- Safe rollout/migration approach: Keep CSS fallback content visible by default and let GSAP set initial states only when motion is enabled and the component is mounted.
- Files to inspect before editing: current public pages/components, tests, existing reveal CSS, Gallery modal, App routing, package files.
- Decisions to avoid until more evidence exists: Do not add text-splitting plugins, global ScrollTrigger listeners, or route-exit navigation delays.

## 16. Verification Strategy
- Required automated checks:
  - `npm install`
  - `npm install --prefix client`
  - `npm run test`
  - `npm run test --prefix client`
  - `npm run build --prefix client`
  - Client lint if available: `npm run lint --prefix client`
- Required manual checks:
  - Open each public route and `/admin`.
  - Navigate between public routes and verify subtle transitions.
  - Scroll pages to verify once-only reveals and no hidden content.
  - Test Gallery filter, card hover, modal open/close, Escape, backdrop, close button, and focus restoration.
  - Complete representative Booking steps without animation delay.
  - Emulate reduced motion and confirm instant content.
  - Check mobile viewport smoothness and browser console.
- Test types needed: Hook/component unit tests, route integration tests, existing regression suites, browser smoke checks.
- Build/lint/typecheck expectations: Build and lint pass; no dedicated typecheck script exists.
- Acceptance evidence required: Commands/results, route screenshots or browser observations where practical, console status, reduced-motion proof, Admin exclusion proof.
- Proof of completion: Passing requested commands plus completed acceptance checklist and final diff audit.

## 17. Acceptance Criteria
- [ ] `gsap` and `@gsap/react` are installed in the client and ScrollTrigger is registered centrally.
- [ ] Reusable scoped animation hooks/components exist for route, scroll, stagger, image, text, and parallax behavior.
- [ ] Every listed public route uses the centralized system consistently.
- [ ] `/admin` has no added decorative GSAP animation and remains outside the public transition boundary.
- [ ] Route changes use a subtle non-blocking fade/slide.
- [ ] Public sections reveal on scroll and repeated cards/lists stagger without duplicated page-local timelines.
- [ ] Gallery has staggered image reveals, hover zoom, shallow parallax, and smooth existing-modal motion.
- [ ] Booking remains immediately usable and receives only restrained, brief motion.
- [ ] Reduced-motion users receive immediately visible content with no GSAP motion.
- [ ] GSAP contexts and ScrollTriggers clean up on unmount with no console errors or leaks.
- [ ] Existing routes, UI, copy, APIs, forms, modal accessibility, and behavior remain intact.
- [ ] Mobile remains smooth with no layout shift or broken interaction.
- [ ] Requested tests and build pass.
- [ ] Applied skill: design-taste-frontend is recorded in task evidence and downstream artifacts.

## 18. Edge Cases And Failure Modes
- Edge cases: Async lists appearing after initial mount, zero-item states, lazy-loaded images, query-only URL updates, browser back/forward, StrictMode double invocation, reduced-motion changes while open, and modal close during entry.
- Failure modes: Duplicate ScrollTriggers, permanently hidden content, competing transforms, stale matchMedia listeners, route animation on Admin, delayed form interaction, or jsdom crashes.
- Regression risks: Existing homepage reveal tests/CSS, Gallery modal focus restoration, scroll restoration, CSS hover transforms, and Admin route rendering.
- Recovery expectations: Disable or simplify the affected animation while keeping content visible and behavior functional; stop with human review if route or interaction verification cannot be proven.

## 19. Risks And Mitigations
- Technical risks: GSAP/ScrollTrigger in jsdom and React StrictMode.
- Product/UX risks: Over-animation, delayed booking, visual inconsistency between dark and light public pages.
- Security risks: none material.
- Scope risks: One-off page timelines or accidental admin wrapping.
- Mitigation plan: Central defaults, public-only route structure, conservative variants, reduced-motion-first fallback, focused tests, browser verification, and scoped contexts.

## 20. Assumptions
- Explicit assumptions:
  - Incoming-only route transitions satisfy the requirement without delaying navigation.
  - Existing Gallery modal is the modal to animate.
  - No paid GSAP plugins are required.
  - Existing Tailwind/CSS styling remains the visual source of truth.
- Confidence level: high.
- What to revisit if assumptions are wrong: Route transition orchestration, Gallery modal ownership, or text reveal implementation.

## 21. Open Questions
- Blocking questions: none.
- Non-blocking questions: Exact per-section animation variants may be tuned during browser review.
- Execution impact: none before planning.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - Add dependencies, centralized setup, reduced-motion handling, and tested reusable primitives.
  - Integrate public-only route transitions and migrate common public reveal behavior.
  - Apply consistent motion across public pages with restrained Booking behavior.
  - Deliver Gallery-specific image/parallax/modal polish.
  - Run complete verification, review, Fallow Quality, and workflow closeout.
- Suggested first task: Add the central GSAP foundation and prove reduced-motion/scoped cleanup behavior.
- Suggested task ordering: foundation -> routing/common adoption -> page adoption -> Gallery showcase -> verification.
- Areas that should not become separate tasks: Backend, database, API, copy, or Admin redesign.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Build: test-first minimal behavior and integration.
  - Refine: async/render lifecycle, mobile, reduced motion, and cleanup hardening.
  - Polish: browser tuning, console checks, final regression verification, and design-taste review.
