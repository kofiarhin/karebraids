# Detailed Spec: Homepage Hero Image Carousel

## 1. Metadata

- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-05-24
- Request ID / slug: homepage-hero-image-carousel
- Request source: Latest direct user prompt plus follow-up answer in conversation; synced to `_workflow/runs/dev/request.md`
- Execution mode: complete-workflow
- Request classification: feature
- Scope level: small
- Risk level: medium-low

## 2. Original Request

- Raw user request: Implement a rotating hero image carousel on the KareBraids homepage. Use existing `galleryItems`; create `heroSlides` from the first 5 gallery images; replace the single static hero `<img>` with a lightweight auto-rotating carousel; preserve existing hero layout, luxury frame, CTA buttons, and appointment badge; add elegant dot indicators; use 4 to 5 second timing; smooth fade and subtle scale/zoom; mobile responsive; respect `prefers-reduced-motion`; no new dependencies; keep API/data logic out of UI components; make minimal changes.
- Normalized request: Update only the KareBraids homepage hero media area so it uses a lightweight carousel built from the first five `galleryItems` images. Replace the current static image with auto-rotating slides every 4 to 5 seconds, using smooth fade and subtle scale transitions, while preserving the existing hero layout, luxury frame, CTA buttons, and "Salon and mobile appointments" badge. Add small elegant clickable dot buttons over or near the bottom of the hero image with accessible labels and active state. Respect `prefers-reduced-motion`, keep the implementation mobile responsive, avoid new dependencies, and make minimal changes primarily in `client/src/pages/Home.jsx`, `client/src/index.css`, and focused frontend tests if needed.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers

- Questions asked:
  - Should the dot indicators be clickable controls for selecting a specific hero image, or should they be passive indicators only?
- Answers received:
  - Make them clickable, accessible buttons that show the active slide and let users jump to a slide.
- Questions skipped:
  - No additional questions. The remaining details can be inferred from existing hero code and styling.
- Remaining open questions:
  - None blocking.

## 4. Problem Definition

- Problem being solved: The homepage hero currently displays only one static image, limiting the immediate visual representation of KareBraids work.
- Why it matters: The hero is the first major brand impression; rotating through real gallery images better showcases braid style range without requiring a layout redesign.
- Current pain point: `Home.jsx` renders a single `<img>` using `galleryItems[0].image`.
- Expected value: A richer hero experience that still feels consistent with the existing premium KareBraids visual system.

## 5. Current State Analysis

- Existing behavior: The homepage hero has text, two CTA buttons, and a right-side media frame using `hero-media editorial-media`. The static image uses `galleryItems[0].image` and the alt text `Woman with copper knotless braids`.
- Existing architecture/components: React + Vite frontend. Homepage is a single React component in `client/src/pages/Home.jsx`. Styling is centralized in `client/src/index.css`.
- Existing files/modules likely involved:
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Existing data flow: Static content comes from `client/src/constants/content.js`. `galleryItems` is imported directly into the homepage.
- Existing API/UI/CLI/workflow behavior: No API is involved. Existing UI uses CSS variables, class-based styling, `data-reveal`, and `data-parallax`.
- Existing tests or verification coverage: `client/test/site-pages.test.jsx` verifies homepage content and `data-parallax` existence. Client scripts include `npm test`, `npm run lint`, and `npm run build`.

## 6. Desired End State

- Expected final behavior: The hero image area displays a carousel of the first five `galleryItems` images. Slides auto-advance every 4 to 5 seconds unless reduced motion is preferred. Users can select a slide with accessible dot buttons.
- User-facing outcome: Visitors see multiple braid images in the same premium hero frame, with small active dot indicators near the bottom of the image.
- Developer-facing outcome: The carousel is lightweight, dependency-free, and localized to the homepage and CSS.
- System/workflow outcome: No backend, API, environment, dependency, or deployment changes.
- Backward compatibility expectations: Existing hero copy, CTA links, frame shape, appointment badge, routes, and page sections continue to behave as before.

## 7. Scope

- In scope:
  - Derive `heroSlides` from `galleryItems.slice(0, 5)`.
  - Replace the static hero image markup with slide markup.
  - Add local state/effect for active slide and auto-rotation.
  - Add clickable accessible dot buttons.
  - Add CSS for layered slides, fade/scale transition, active dots, mobile responsiveness, and reduced-motion behavior.
  - Add or update focused frontend tests.
- Out of scope:
  - Hero copy redesign.
  - CTA, navigation, trust strip, services, gallery preview, testimonial, or booking CTA changes.
  - Gallery data changes.
  - Backend/API changes.
  - New dependencies.
  - Deployment changes.
- Non-goals:
  - Full carousel library behavior such as swiping, arrows, thumbnails, or drag gestures.
  - Reworking site-wide motion.
- Explicit boundaries:
  - Update the homepage hero only and keep changes minimal.

## 8. Users And Use Cases

- Primary users: KareBraids website visitors evaluating braid styles and booking options.
- Secondary users: Site owner or developer maintaining the static content.
- Main use cases:
  - Visitor lands on homepage and sees hero imagery rotate automatically.
  - Visitor clicks a dot to inspect another hero image.
  - Visitor uses keyboard/screen reader to understand and operate carousel dots.
- Edge use cases:
  - User prefers reduced motion.
  - Mobile visitor sees the hero image below the hero copy.
  - JavaScript timers must clean up when the component unmounts.

## 9. Functional Requirements

- Required behaviors:
  - `heroSlides` is created from the first five `galleryItems`.
  - The first slide is active initially.
  - Active slide changes automatically every 4 to 5 seconds.
  - Clicking a dot changes the active slide immediately.
  - Dots expose clear accessible names and active state.
  - Reduced-motion preference disables or neutralizes auto-motion.
- Inputs:
  - Existing `galleryItems` static array.
  - User clicks on dot buttons.
  - Browser `prefers-reduced-motion` media query.
- Outputs:
  - Hero carousel image stack and dot buttons.
  - Visible active slide and active indicator state.
- State changes:
  - Local `activeHeroSlide` index changes by interval and dot click.
- Error states:
  - Not applicable for remote image load failures beyond normal browser broken-image behavior.
- Permissions/auth expectations:
  - Not applicable.

## 10. Non-Functional Requirements

- Performance expectations: Lightweight local state and CSS transitions only; no dependencies; interval cleanup on unmount.
- Reliability expectations: Interval must not multiply across renders; dot clicks must not break auto-rotation.
- Security/privacy expectations: No secrets, no new data exposure, no API calls.
- Accessibility expectations: Dot buttons must be keyboard reachable, labelled, and indicate the current slide with `aria-current` or equivalent active state.
- Maintainability expectations: Use existing constants and CSS variables; keep component logic easy to read.
- DX expectations: Existing test/lint/build commands should continue to pass.

## 11. Affected Surfaces

- Files likely affected:
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Directories likely affected:
  - `client/src/pages/`
  - `client/src/`
  - `client/test/`
  - `_workflow/runs/dev/`
- UI surfaces:
  - Homepage hero media area only.
- API routes:
  - None.
- Components:
  - `Home` page component.
- Services:
  - None.
- Database/schema:
  - None.
- Config/env vars:
  - None.
- Tests:
  - Focused React Testing Library coverage for carousel rendering and dot selection.
- Docs:
  - Run-scoped workflow artifacts only.
- Workflow artifacts:
  - `_workflow/runs/dev/request.md`
  - `_workflow/runs/dev/spec.md`
  - `_workflow/runs/dev/tasks.md` after approval
  - `_workflow/runs/dev/progress.md`
  - `_workflow/runs/dev/handoff.md`
  - `_workflow/runs/dev/review.md`
  - `_workflow/runs/dev/verification.md`
  - `_workflow/runs/dev/release-notes.md`
  - `_workflow/runs/dev/summary.md`

## 12. Dependency And Integration Map

- Internal dependencies:
  - `galleryItems` from `client/src/constants/content.js`.
  - Existing CSS custom properties in `client/src/index.css`.
  - Existing `useRevealOnScroll` behavior and `data-parallax` hero attribute.
- External packages/services:
  - No new packages.
  - Existing React and testing libraries only.
- Integration points:
  - Homepage imports from `content.js`.
  - Existing hero CSS selectors such as `.hero-media img` must be adapted carefully.
- Ordering constraints:
  - Update tests first for TDD evidence.
  - Then implement markup/state.
  - Then style and verify responsive/reduced motion behavior.
- Migration/setup requirements:
  - None.

## 13. Data And State Impact

- Data models:
  - No data model changes.
- Database changes:
  - None.
- State management changes:
  - Add isolated local React state for the active hero slide only.
- Cache/session/local storage impact:
  - None.
- Backward compatibility impact:
  - Existing `galleryItems` consumers remain compatible.

## 14. UX / API / Workflow Expectations

- UX expectations:
  - Carousel should feel like the current static framed portrait has become gently alive, not like a redesigned hero.
  - Dots should be small, elegant, and brand-colored.
  - The appointment badge remains readable above the image.
  - Mobile image height and rounded corners remain consistent with existing breakpoints.
- API contract expectations:
  - Not applicable.
- CLI/workflow behavior:
  - Follow spec approval gate before task plan and implementation.
- Error handling expectations:
  - Not applicable beyond normal image loading.
- Empty/loading/success/failure states:
  - Not applicable; static gallery data is present. If fewer than five images ever exist, slicing should still render available images safely.

## 15. Execution Strategy

- Recommended implementation approach:
  - In `Home.jsx`, define `const heroSlides = galleryItems.slice(0, 5)` outside or inside the component near imports.
  - Add `useEffect` and `useState` for active slide auto-rotation.
  - Respect reduced motion by checking `window.matchMedia('(prefers-reduced-motion: reduce)')` in the effect and skipping the interval when matched.
  - Render all slides in a contained stack so CSS can fade and scale between them.
  - Use dot buttons with accessible labels and `aria-current` for the active slide.
  - In CSS, scope carousel image styles so the existing frame dimensions and border radii remain intact.
- Suggested sequencing:
  1. Add failing test for hero carousel slides/dots.
  2. Implement hero slide markup and local state.
  3. Add CSS for active/inactive slides, dots, transition, mobile, and reduced motion.
  4. Verify focused tests, full tests, lint, and build.
- Safe rollout/migration approach:
  - No migration. Single small UI change.
- Files to inspect before editing:
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `client/src/constants/content.js`
- Decisions to avoid until more evidence exists:
  - Do not add arrow controls, swipe gestures, new libraries, or redesign the hero layout.

## 16. Verification Strategy

- Required automated checks:
  - `cd client && npm test -- site-pages.test.jsx`
  - `cd client && npm test`
  - `cd client && npm run lint`
  - `cd client && npm run build`
- Required manual checks:
  - Inspect homepage at mobile and desktop sizes if a dev server/browser check is feasible.
  - Confirm hero layout, frame, badge, and CTA buttons remain visually intact.
- Test types needed:
  - React Testing Library test for rendered slide images/dots and click-to-select behavior.
  - Timer behavior may be covered with fake timers if low-risk and stable.
- Build/lint/typecheck expectations:
  - Existing scripts should pass.
- Acceptance evidence required:
  - Tests show first five slides/dots are present and active state changes when a dot is clicked.
  - CSS review shows 4 to 5 second rotation, fade/scale transition, and reduced-motion override.
- Proof of completion:
  - Passing verification commands and final diff audit documented in workflow artifacts.

## 17. Acceptance Criteria

- [ ] Homepage hero uses `heroSlides` from the first five `galleryItems`.
- [ ] Static hero image is replaced by a carousel in the existing hero media frame.
- [ ] Carousel auto-rotates every 4 to 5 seconds.
- [ ] Slide transition uses smooth fade with subtle scale/zoom.
- [ ] Existing hero layout, luxury frame shape, CTA buttons, and "Salon and mobile appointments" badge remain intact.
- [ ] Small elegant dot indicators appear over or near the bottom of the hero image.
- [ ] Dot indicators are clickable accessible buttons and show the active slide.
- [ ] Clicking a dot jumps to the selected slide.
- [ ] Mobile responsiveness is preserved.
- [ ] `prefers-reduced-motion` is respected.
- [ ] No new dependencies are added.
- [ ] Changes are minimal and localized to the homepage hero, CSS, focused tests, and workflow artifacts.

## 18. Edge Cases And Failure Modes

- Edge cases:
  - Reduced-motion users.
  - Gallery data has fewer than five images in the future.
  - Dot click occurs shortly before interval tick.
  - Component unmounts while interval is active.
- Failure modes:
  - Interval leak causing rapid rotation.
  - Inactive slides still visible or clickable.
  - Image stack collapses height.
  - Parallax animation conflicts with carousel transitions.
- Regression risks:
  - Hero image dimensions change unexpectedly.
  - Mobile hero loses rounded frame treatment.
  - Appointment badge overlaps dots poorly.
- Recovery expectations:
  - Keep fixes scoped to hero carousel CSS/markup.

## 19. Risks And Mitigations

- Technical risks:
  - Timer and `matchMedia` behavior in tests. Mitigation: write narrow tests and mock only if needed.
  - Existing `@supports (animation-timeline: view()) [data-parallax] img` selector may affect all slide images. Mitigation: scope or override carousel slide transforms carefully.
- Product/UX risks:
  - Dots could clutter the appointment badge. Mitigation: position dots near bottom center/left inside media, away from the badge.
- Security risks:
  - None expected.
- Scope risks:
  - Carousel feature could expand to arrows/swipes. Mitigation: keep to requested dots and auto-rotation only.
- Mitigation plan:
  - Use minimal local state, CSS variables, focused selectors, and verification.

## 20. Assumptions

- Explicit assumptions:
  - Local React state is appropriate for isolated carousel UI.
  - The first gallery item remains the initial hero image.
  - `galleryItems` titles are acceptable image alt text.
  - Reduced-motion should skip auto-rotation and transition-heavy animation.
  - No manual image preloading is required for this small carousel.
- Confidence level:
  - High for scope and implementation approach.
- What to revisit if assumptions are wrong:
  - If reduced-motion should still allow manual fade transitions, adjust CSS only.
  - If the owner wants different images, update the source slice or content data only after explicit request.

## 21. Open Questions

- Blocking questions:
  - None.
- Non-blocking questions:
  - None currently.
- Execution impact:
  - Implementation can proceed after explicit spec approval.

## 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - `TASK-001: Add homepage hero carousel with clickable dots`
- Suggested first task:
  - Add the carousel behavior, styling, and tests as one small vertical slice because the feature is localized and user-visible only when all pieces work together.
- Suggested task ordering:
  - Single task is sufficient.
- Areas that should not become separate tasks:
  - Do not split CSS, React state, and tests into separate layer tasks.
  - Do not create a separate data or service task because no API/data logic is involved.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Iteration 1 Build: Add failing test for carousel presence/clickable dots, implement basic carousel markup/state/CSS, verify.
  - Iteration 2 Refine: Add or tighten reduced-motion/timer/accessibility coverage, fix issues, verify.
  - Iteration 3 Polish: Review mobile/responsive styling and parallax interaction, run full verification, document acceptance.
