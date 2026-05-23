# Homepage Redesign With Motion Spec

## 1. Metadata
- Spec filename: `_spec/2026-05-23-redesign-homepage-motion.md`
- Date: 2026-05-23
- Request ID / slug: `redesign-homepage-motion`
- Request source: Latest direct user prompt plus grill-me intake answers, synced into `WORK_REQUEST.md`
- Execution mode: `complete-workflow`
- Request classification: `feature`
- Scope level: `medium`
- Risk level: `medium`

## 2. Original Request
- Raw user request: "lerts redesign the homepage keeping the same sections. also lets addd some animation for the the text and images. also add scrolling animation"
- Normalized request: Redesign the KareBraids homepage while keeping the same existing sections. Use a premium African braiding salon direction with tasteful text and image entrance animations plus scroll-based reveal/parallax motion. Do not change the booking or gallery flows.
- Source prompt / WORK_REQUEST reference: `WORK_REQUEST.md`

## 3. Questions And Answers
- Questions asked:
  - Should the direction be a premium editorial salon look with warm neutrals, richer photography, asymmetric layouts, and refined motion while keeping the same existing sections?
  - Should the animation work avoid adding a new animation package and use lightweight CSS plus a small React scroll-reveal helper instead?
- Answers received:
  - Yes. Keep all current homepage sections, redesign them with a premium African braiding salon feel, add tasteful text/image entrance animations, and add scroll-based reveal/parallax motion without changing booking/gallery flows.
  - Yes. Use CSS transitions/keyframes and an `IntersectionObserver`-based reveal helper for text/image entrance and scroll animation. Do not add Framer Motion or GSAP for this homepage pass.
- Questions skipped: None.
- Remaining open questions: None blocking. Exact visual details can be decided conservatively during implementation using current brand colors and assets.

## 4. Problem Definition
- Problem being solved: The existing homepage is functional but visually modest; it needs a more premium and expressive presentation while preserving its current content structure.
- Why it matters: The homepage is the primary first impression for prospective clients and should communicate craftsmanship, care, and booking confidence.
- Current pain point: Current sections exist, but the page lacks a strong editorial rhythm, rich section transitions, and motion that makes text/images feel intentional.
- Expected value: A more polished homepage that better supports trust, service discovery, gallery interest, and booking conversion.

## 5. Current State Analysis
- Existing behavior: `client/src/pages/Home.jsx` renders hero, trust strip, featured services, why choose KareBraids, gallery preview, testimonials, and final CTA.
- Existing architecture/components: React/Vite app with React Router, shared `Layout`, shared `Button`, content constants in `client/src/constants/content.js`, CSS in `client/src/index.css`.
- Existing files/modules likely involved:
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - Possibly a new focused helper/component under `client/src/components/` or `client/src/hooks/`
- Existing data flow: Homepage imports static `services`, `galleryItems`, and `testimonials` from constants. No server data or global client state.
- Existing API/UI/CLI/workflow behavior: Homepage links to `/booking` and `/gallery`. Booking/gallery flows are separate pages and must remain intact.
- Existing tests or verification coverage: `client/test/site-pages.test.jsx` verifies homepage heading and booking links. Client scripts include `test`, `build`, and `lint`.

## 6. Desired End State
- Expected final behavior: The homepage keeps the same sections and core calls to action, but uses a more premium editorial layout with visible text/image entrance animations and scroll-triggered reveals.
- User-facing outcome: Visitors see a refined KareBraids homepage with stronger hero, service, gallery, testimonial, and CTA presentation.
- Developer-facing outcome: Homepage motion is implemented with maintainable React/CSS, no new package, and no changes to backend/data contracts.
- System/workflow outcome: Existing routes and frontend tests continue to pass.
- Backward compatibility expectations: Existing `/booking` and `/gallery` navigation remains unchanged; no API, env, deployment, or database changes.

## 7. Scope
- In scope:
  - Redesign `Home.jsx` markup while preserving the same homepage sections.
  - Update CSS for premium layout, responsive behavior, image treatment, and motion.
  - Add an `IntersectionObserver`-based reveal helper or component for scroll-triggered classes.
  - Update tests to protect the unchanged section structure and navigation.
  - Respect reduced-motion preferences.
- Out of scope:
  - Booking flow behavior changes.
  - Gallery page/modal behavior changes beyond homepage preview presentation if needed.
  - Backend/API/database changes.
  - Adding new animation dependencies.
  - Full-site redesign outside homepage.
- Non-goals: Rebranding, new copywriting strategy, new service data, new media asset sourcing, auth/admin functionality.
- Explicit boundaries: Motion must use transform/opacity-friendly CSS and observer-triggered class changes, not continuous scroll event listeners or new animation libraries.

## 8. Users And Use Cases
- Primary users: Prospective KareBraids clients browsing on mobile or desktop before booking.
- Secondary users: The site owner reviewing brand presentation and booking conversion path.
- Main use cases:
  - Understand what KareBraids offers.
  - Build trust through service cues, why section, testimonials, and gallery preview.
  - Navigate to booking or gallery.
- Edge use cases:
  - Users with reduced-motion preference.
  - Small mobile screens.
  - Slow image loading.
  - Keyboard/screen-reader users navigating CTAs.

## 9. Functional Requirements
- Required behaviors:
  - Preserve the same homepage sections: hero, trust strip, featured services, why choose section, gallery preview, testimonials, CTA.
  - Keep existing booking and gallery links functional.
  - Animate text and images on initial entry and as sections enter the viewport.
  - Add scroll-based visual motion such as reveal, soft parallax, or section progression without heavy dependencies.
  - Respect `prefers-reduced-motion`.
- Inputs: Static content from `services`, `galleryItems`, and `testimonials`.
- Outputs: Rendered homepage UI and CSS classes/states.
- State changes: Local UI-only reveal state may be used by the observer helper. No Redux, TanStack Query, or server state changes.
- Error states: Not applicable for data fetching. Image loading should not block text or navigation.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: Use transform and opacity animations; avoid animating layout properties; clean up observers in `useEffect`.
- Reliability expectations: Homepage should render even if JS-powered reveal has not run yet; content remains available.
- Security/privacy expectations: No secrets, no external scripts, no new data exposure.
- Accessibility expectations: Preserve semantic headings/sections, meaningful alt text, focus visibility, keyboard navigation, and reduced-motion handling.
- Maintainability expectations: Keep homepage-specific motion easy to understand; avoid broad refactors.
- DX expectations: No new dependencies; existing scripts should continue to work.

## 11. Affected Surfaces
- Files likely affected:
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - Possible new `client/src/hooks/useRevealOnScroll.js` or `client/src/components/Reveal.jsx`
  - Workflow artifacts in `WORK_REQUEST.md`, `_spec/`, `_handoff/`, `_progress/`, `_review/`, `_release/`, `_summary/`
- Directories likely affected:
  - `client/src/pages/`
  - `client/src/`
  - `client/test/`
  - Workflow artifact directories
- UI surfaces: Homepage only.
- API routes: None.
- Components: `Home`, possible reveal helper, existing `Button` usage.
- Services: None.
- Database/schema: None.
- Config/env vars: None.
- Tests: Frontend page tests should be updated or added.
- Docs: Workflow artifacts only unless durable docs need minor notes.
- Workflow artifacts: Required spec, task plan after approval, progress, handoff, review, release, summary.

## 12. Dependency And Integration Map
- Internal dependencies:
  - `Home.jsx` depends on static content and shared `Button`.
  - CSS class names in `Home.jsx` depend on `client/src/index.css`.
  - Tests depend on route rendering through `App.jsx`.
- External packages/services:
  - Existing React, React Router, Phosphor icons, Vite, Vitest/RTL.
  - No new external dependency.
- Integration points:
  - Homepage route `/`.
  - Navigation links to `/booking` and `/gallery`.
  - Static remote Pexels images already used in `content.js`.
- Ordering constraints:
  - Add/update tests first for preserved sections/motion hooks where feasible.
  - Implement markup/CSS/helper.
  - Verify tests and build.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: No changes.
- Database changes: None.
- State management changes: Local reveal helper state only if needed; no Redux or server-state changes.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Existing route and link behavior must remain.

## 14. UX / API / Workflow Expectations
- UX expectations:
  - Premium African braiding salon feel with warm, refined visual language.
  - Stronger asymmetric desktop hero and editorial section rhythm.
  - Same sections remain discoverable and scannable.
  - Images and copy animate in tastefully.
  - Scroll motion adds polish without obscuring content.
  - Mobile layout collapses cleanly without horizontal overflow.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Follow saved spec, wait for approval, then task plan and implementation.
- Error handling expectations: Not applicable beyond robust non-JS/reduced-motion fallback.
- Empty/loading/success/failure states: Not applicable for homepage static content; image loading should remain graceful.

## 15. Execution Strategy
- Recommended implementation approach:
  - Create a small reveal helper using `IntersectionObserver` with cleanup.
  - Update homepage markup with section wrappers and reveal/parallax class hooks.
  - Refresh homepage CSS for a premium layout, responsive grid behavior, image treatment, animation timing, and reduced-motion fallback.
  - Update tests to assert all existing sections and navigation remain present.
- Suggested sequencing:
  - Task 1: Add tests that lock the preserved homepage section structure and navigation.
  - Task 2: Add reveal helper and redesign homepage markup/styles.
  - Task 3: Polish responsive/reduced-motion behavior and verify build/lint/tests.
- Safe rollout/migration approach: Homepage-only changes, no data migration.
- Files to inspect before editing:
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/src/constants/content.js`
  - `client/src/components/Button.jsx`
  - `client/test/site-pages.test.jsx`
- Decisions to avoid until more evidence exists:
  - Adding dependencies.
  - Rewriting shared layout/nav/footer.
  - Replacing image sources.

## 16. Verification Strategy
- Required automated checks:
  - `npm test --prefix client`
  - `npm run build --prefix client`
  - `npm run lint --prefix client` if the change includes JS helper or JSX updates.
- Required manual checks:
  - Homepage visually inspected in browser on desktop and mobile widths.
  - Confirm no horizontal overflow and no broken booking/gallery navigation.
  - Confirm reduced-motion CSS disables or simplifies animations.
- Test types needed:
  - React Testing Library page tests for preserved sections and links.
  - Build verification for production CSS/JS.
- Build/lint/typecheck expectations: Existing client build and lint pass.
- Acceptance evidence required: Passing commands, updated test assertions, and documented manual/browser check.
- Proof of completion: All acceptance criteria checked and workflow artifacts completed.

## 17. Acceptance Criteria
- [ ] Homepage still contains the same sections: hero, trust strip, featured services, why choose KareBraids, gallery preview, testimonials, and CTA.
- [ ] Homepage visual design is updated toward a premium African braiding salon feel using refined layout, image treatment, typography, spacing, and color within existing brand conventions.
- [ ] Text and images have tasteful entrance animations and scroll-triggered reveal/parallax behavior implemented without new animation dependencies.
- [ ] Motion respects `prefers-reduced-motion` and avoids animating layout properties such as top/left/width/height.
- [ ] Booking and gallery navigation flows remain unchanged and homepage CTAs still link to the correct routes.
- [ ] Mobile layout collapses cleanly with no intentional horizontal scrolling or overlapping content.
- [ ] Relevant frontend tests are added or updated first, and `npm test --prefix client`, `npm run build --prefix client`, and lint verification pass or are documented.

## 18. Edge Cases And Failure Modes
- Edge cases:
  - Reduced-motion users should get static or near-static content.
  - Very small screens must maintain readable CTAs and section content.
  - Observer helper should not fail when no matching elements exist.
  - Images may load slowly; layout should retain stable dimensions.
- Failure modes:
  - Scroll animation causes content to remain hidden if observer does not fire.
  - Parallax creates jank or overlap on mobile.
  - Test environment lacks `IntersectionObserver`.
  - CSS changes accidentally affect non-home pages.
- Regression risks:
  - Existing homepage heading/link tests fail after markup changes.
  - Shared CSS class changes affect About, Gallery, or Booking pages.
  - New helper leaks observers if not cleaned up.
- Recovery expectations: Keep fixes scoped to homepage/helper/tests and use reduced-motion or fallback CSS if animation causes reliability issues.

## 19. Risks And Mitigations
- Technical risks:
  - `IntersectionObserver` may be unavailable in jsdom. Mitigate by testing behavior that does not require browser observer execution, or by making helper resilient.
  - CSS class reuse may affect other pages. Mitigate with homepage-specific class names.
- Product/UX risks:
  - Too much motion could distract from booking. Mitigate with moderate durations, staggered entry, and reduced-motion support.
- Security risks: Low; no new data or scripts.
- Scope risks:
  - Request could expand into full-site redesign. Mitigate by keeping changes homepage-only.
- Mitigation plan: Keep tasks vertical, update tests, verify responsive behavior manually, and avoid new dependencies.

## 20. Assumptions
- Explicit assumptions:
  - Existing content and imagery are acceptable for this redesign pass.
  - CSS-based animation plus `IntersectionObserver` is sufficient for desired motion.
  - No backend, API, deployment, env, or data changes are required.
  - Current brand colors can be refined but not replaced wholesale.
- Confidence level: High.
- What to revisit if assumptions are wrong: If current imagery is not acceptable, a separate asset-selection task should be created. If more complex choreography is needed, dependency approval should be requested separately.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions:
  - Whether future owned photography should replace Pexels images.
  - Whether the rest of the site should later receive matching visual polish.
- Execution impact: None for this workflow.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - Lock homepage section/navigation expectations with tests.
  - Implement homepage redesign and scroll reveal helper.
  - Polish responsive/reduced-motion behavior and complete verification.
- Suggested first task: Add or update frontend tests proving the same homepage sections and key CTAs remain present.
- Suggested task ordering: Tests first, then helper/markup/styles, then polish/verification.
- Areas that should not become separate tasks: Backend changes, new dependency setup, unrelated page redesigns.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Build: Add the smallest verified homepage redesign and motion foundation.
  - Refine: Improve responsive layout, section rhythm, and observer resilience.
  - Polish: Tighten reduced-motion, visual details, final tests/build/lint, and documentation.
