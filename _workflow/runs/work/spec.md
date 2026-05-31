# Detailed Spec: Premium Homepage Testimonial Carousel

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-05-31
- Request ID / slug: `premium-homepage-testimonial-carousel`
- Request source: Latest direct prompt plus grill-me clarification.
- Execution mode: `complete-workflow`
- Request classification: Frontend UI enhancement.
- Scope level: Narrow homepage refinement.
- Risk level: Low to moderate.

## 2. Original Request
- Raw user request: Replace the homepage single testimonial with a premium five-item Afro-centric carousel preserving the KareBraids dark luxury split layout, with accessible looping arrows, indicator/avatar selection, counter, active styling, smooth transitions, responsiveness, array data, no heavy dependency, and frontend verification.
- Normalized request: Add an array-driven manual-only five-item homepage testimonial carousel with looped navigation, avatar selection, active state, `01 / 05` counter, responsive dark luxury styling, Vitest coverage, and frontend verification.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`.

## 3. Questions And Answers
- Questions asked: Should testimonials auto-advance or move only through visitor controls?
- Answers received: Manual controls only. No auto-advance. Previous/next and avatar indicators must loop and retain calm readable transitions.
- Questions skipped: Repo inspection resolved architecture, styling, and test conventions.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: The homepage has one static testimonial and inactive arrows instead of a working premium carousel.
- Why it matters: More social proof improves prospective-client trust while preserving premium whitespace.
- Current pain point: Static data and non-functional controls.
- Expected value: Five readable testimonials explored deliberately by visitors.

## 5. Current State Analysis
- Existing behavior: `TestimonialSection.jsx` renders one imported testimonial, portrait, stars, quote mark, and inactive arrows.
- Existing architecture/components: React functional components, homepage constants, global Tailwind-era stylesheet, and Vitest/RTL page tests.
- Existing files/modules likely involved: `client/src/components/home/TestimonialSection.jsx`, `client/src/constants/homepage.js`, `client/src/index.css`, `client/test/site-pages.test.jsx`.
- Existing data flow: Static homepage constants imported directly by UI components.
- Existing API/UI/CLI/workflow behavior: UI-only; client exposes test, lint, build, and dev scripts.
- Existing tests or verification coverage: Static homepage copy and CSS-surface assertions existed; interaction coverage did not.

## 6. Desired End State
- Expected final behavior: One active testimonial from five changes only through arrows or avatar buttons and wraps in both directions.
- User-facing outcome: Visitors read, browse, jump directly, identify active slide, and see `01 / 05`-style position.
- Developer-facing outcome: Homepage testimonials live in one reusable array with localized UI state.
- System/workflow outcome: Tests cover navigation, wraps, direct selection, fallback, and CSS hooks.
- Backward compatibility expectations: Existing homepage composition and adjacent sections remain intact.

## 7. Scope
- In scope: Testimonial array, local state, accessible controls, avatar strip, active styling, counter, responsive CSS, transitions, reduced motion, tests, and workflow artifacts.
- Out of scope: Backend/API/database, autoplay, swipe, persistence, new dependencies, and broad homepage redesign.
- Non-goals: Generic carousel library or remote image generation.
- Explicit boundaries: Limit implementation edits to testimonial surfaces and directly relevant tests, except narrow verification recovery.

## 8. Users And Use Cases
- Primary users: Prospective KareBraids homepage visitors.
- Secondary users: Keyboard and assistive-technology users.
- Main use cases: Read, next, previous, wrap, direct select, and read counter.
- Edge use cases: Rapid clicks, missing avatar, reduced motion, and mobile widths.

## 9. Functional Requirements
- Required behaviors: Five supplied testimonials; required fields; one active slide; modulo previous/next; direct selection; active state; counter; quote mark; gold stars; no timer.
- Inputs: Clicks on arrows and avatar buttons.
- Outputs: Updated active content, indicator, and counter.
- State changes: Local active-index state only.
- Error states: Use initials fallback if avatar is unavailable.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: Lightweight local state; no external carousel runtime.
- Reliability expectations: Deterministic manual looping.
- Security/privacy expectations: No secrets or personal-data persistence; portraits are representative.
- Accessibility expectations: Semantic buttons, descriptive labels, visible focus, `aria-current`, polite counter updates, reduced-motion support, and no unexpected motion.
- Maintainability expectations: Array-driven content and scoped CSS.
- DX expectations: Existing scripts remain sufficient.

## 11. Affected Surfaces
- Files likely affected: `client/src/constants/homepage.js`, `client/src/components/home/TestimonialSection.jsx`, `client/src/index.css`, `client/test/site-pages.test.jsx`.
- Directories likely affected: `client/src/constants/`, `client/src/components/home/`, `client/src/`, `client/test/`, `_workflow/runs/work/`.
- UI surfaces: Homepage Client Love section.
- API routes: Not applicable.
- Components: `TestimonialSection`.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: None.
- Tests: Frontend homepage tests; full verification may require narrow fixture recovery.
- Docs: Workflow artifacts.
- Workflow artifacts: request, handoff, spec, tasks, progress, review, release notes, summary.

## 12. Dependency And Integration Map
- Internal dependencies: Existing gallery images, Phosphor icons, React local state, reveal behavior, and palette tokens.
- External packages/services: Existing React and icon package only.
- Integration points: Homepage constants and stylesheet selectors.
- Ordering constraints: TDD-first behavior, then accessibility/layout refinement, then fallback/motion polish and full checks.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: Replace one testimonial object with five entries containing `name`, `review`, `rating`, `avatar`, and `initials`.
- Database changes: None.
- State management changes: Local component active index only.
- Cache/session/local storage impact: None.
- Backward compatibility impact: No external contract.

## 14. UX / API / Workflow Expectations
- UX expectations: Dark background, warm gold accents, elegant typography, rounded card, quote icon, stars, generous whitespace, avatar strip, split desktop composition, mobile stack, and calm motion.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Existing scripts remain unchanged.
- Error handling expectations: Initials fallback for absent avatar.
- Empty/loading/success/failure states: Static curated data; no loading state.

## 15. Execution Strategy
- Recommended implementation approach: Write failing RTL tests; add homepage array; implement `useState` modulo handlers and generated indicators; add scoped premium styles and reduced-motion treatment; run full checks.
- Suggested sequencing: One vertical task through Build, Refine, and Polish.
- Safe rollout/migration approach: Keep adjacent sections unchanged and avoid dependencies.
- Files to inspect before editing: Component, homepage constants, stylesheet, and homepage tests.
- Decisions to avoid until more evidence exists: No autoplay, swipe, generic abstraction, or backend work.
- Applied skill: design-taste-frontend

## 16. Verification Strategy
- Required automated checks: Targeted homepage Vitest each iteration, full client Vitest, ESLint, Vite build, backend Jest, and whitespace audit.
- Required manual checks: Root dev startup smoke; screenshot if automation exists, otherwise code-surface visual review fallback.
- Test types needed: RTL interaction and CSS-surface assertions.
- Build/lint/typecheck expectations: Client lint and build pass; no separate typecheck script.
- Acceptance evidence required: Per-iteration Red, Green, Refactor, review, and final audit evidence.
- Proof of completion: Passing checks, scoped diff audit, workflow artifacts, commit, and PR record.

## 17. Acceptance Criteria
- [x] Five supplied testimonials exist in array data with required fields and avatar path or initials fallback.
- [x] Rendering is array-driven rather than repeated hardcoded JSX.
- [x] Accessible manual previous/next controls loop infinitely in both directions.
- [x] Accessible avatar indicators activate selected testimonial and expose active styling.
- [x] Counter displays zero-padded position beginning with `01 / 05`.
- [x] Card retains quote icon, gold stars, rounded dark luxury surface, whitespace, and readable typography.
- [x] Desktop split and mobile stack remain implemented.
- [x] Calm smooth transitions and reduced-motion support exist without autoplay or heavy dependency.
- [x] Relevant Vitest, lint, build, Jest, and startup verification completed with environment limitation documented.

## 18. Edge Cases And Failure Modes
- Edge cases: Previous at index zero, next at final index, direct active selection, rapid click, missing avatar, reduced motion, and mobile widths.
- Failure modes: Off-by-one counter, failed wrap, inaccessible icon controls, broken image, excessive motion, stale tests.
- Regression risks: CSS leaking into legacy testimonial selectors and date-sensitive full-suite fixtures.
- Recovery expectations: Keep recovery scoped and rerun exact failing command.

## 19. Risks And Mitigations
- Technical risks: Transition not retriggering. Mitigation: key active content by identity.
- Product/UX risks: Distracting motion. Mitigation: manual-only short transition and reduced-motion override.
- Security risks: Misleading portrait semantics. Mitigation: representative images and accessible labels.
- Scope risks: Legacy CSS. Mitigation: scoped selectors and diff audit.
- Mitigation plan: TDD-first, full checks, and code-surface review.

## 20. Assumptions
- Explicit assumptions: Existing gallery portraits may be representative avatars; one initials fallback demonstrates missing-image handling; CSS stylesheet remains project convention.
- Confidence level: High.
- What to revisit if assumptions are wrong: Replace portraits with approved assets or initials-only entries.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Optional future approved client portrait assets.
- Execution impact: None.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: One complete testimonial-carousel slice.
- Suggested first task: `TASK-001: Add a manual-only premium homepage testimonial carousel`.
- Suggested task ordering: Build behavior, refine indicators/layout, polish fallback/motion and verify.
- Areas that should not become separate tasks: Data, state, CSS, and tests are tightly coupled.
- How the 3-pass Build -> Refine -> Polish loop should apply: TDD-first Red -> Green -> Refactor in every pass with recorded evidence.
