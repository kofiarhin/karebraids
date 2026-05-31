# Detailed Spec: Dedicated Services Page

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: `2026-05-31`
- Request ID / slug: `dedicated-services-page`
- Request source: direct user prompt normalized into `_workflow/runs/work/request.md`
- Execution mode: `complete-workflow`
- Request classification: frontend feature implementation and shared-content refactor
- Scope level: medium
- Risk level: low-to-medium because shared service data feeds Booking and Admin

## 2. Original Request
- Raw user request: Add a premium `/services` page, fix links, enrich shared data, preserve Booking, add Home Featured Services before Gallery, keep Gallery portfolio-only, style accessibly and responsively, add tests, run root tests and client build.
- Normalized request: Add a dedicated Services discovery journey using the existing React/Vite and dark Afro-luxury architecture while preserving title-based Booking/Admin compatibility.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: None; the request and repo inspection resolved implementation details.
- Answers received: User explicitly approved this spec with `approve spec`.
- Questions skipped: None blocking.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: Services incorrectly routes to Gallery and lacks a dedicated conversion-focused catalog.
- Why it matters: Visitors need category, duration, and indicative pricing context before Booking.
- Current pain point: Gallery is overloaded as service discovery; shared data lacks IDs, categories, and images.
- Expected value: Clear service browsing and better `/booking` conversion paths.

## 5. Current State Analysis
- Existing behavior: Router lacks `/services`; Services nav points to `/gallery`; Home has Gallery preview but no Featured Services; footer service shortcuts point to `/booking`.
- Existing architecture/components: React Router, centralized constants, centralized `index.css`, reusable Home components and Button.
- Existing files/modules likely involved: Router, constants, Home, new Services page, new Home component, CSS, public-page Vitest.
- Existing data flow: Booking finds selected shared service by title and renders title/description/duration; Admin renders title options.
- Existing API/UI/CLI/workflow behavior: Booking payload remains title-based.
- Existing tests or verification coverage: `client/test/site-pages.test.jsx`, Booking flow Vitest, root Jest, client build/lint.

## 6. Desired End State
- Expected final behavior: `/services` renders premium categorized image cards with direct Booking CTAs and Home previews featured services before Gallery.
- User-facing outcome: Visitors browse, compare, and book clearly.
- Developer-facing outcome: One enriched shared array feeds Services, Home preview, Booking, and Admin.
- System/workflow outcome: Frontend-only additive feature.
- Backward compatibility expectations: Existing Booking/Admin title consumers remain functional.

## 7. Scope
- In scope: Route/page, content enrichment, Home Featured Services, nav/footer browsing links, scoped styles, accessibility, responsiveness, tests.
- Out of scope: Detail pages, Gallery redesign, Booking redesign, backend/API/schema/dependency/env changes.
- Non-goals: Do not migrate API payloads to IDs or introduce filtering state.
- Explicit boundaries: Keep Gallery portfolio-only and implementation narrow.

## 8. Users And Use Cases
- Primary users: Prospective braid clients.
- Secondary users: Returning clients and Admin title-option consumers.
- Main use cases: Browse categories, compare metadata, understand salon/mobile offering, proceed to Booking.
- Edge use cases: Narrow mobile, keyboard navigation, slow images, preserved Booking selection.

## 9. Functional Requirements
- Required behaviors: Add route/page; enrich all service objects with `id`, `category`, `title`, `description`, `image`, `duration`, `fromPrice`; use Gallery images; render four required categories; add Home preview before Gallery; fix nav/footer browsing hrefs; preserve Booking/Admin.
- Inputs: Static shared content and route navigation.
- Outputs: Services UI and `/booking` navigation.
- State changes: None beyond routing.
- Error states: Static content only; image containment and alt text remain robust.
- Permissions/auth expectations: Public.

## 10. Non-Functional Requirements
- Performance expectations: Reuse image URLs, lazy-load below-fold imagery, no new dependencies.
- Reliability expectations: Preserve service titles and keys consumed by Booking/Admin.
- Security/privacy expectations: No secrets or backend impact.
- Accessibility expectations: Semantic sections/headings, meaningful alt text, accessible links, visible focus.
- Maintainability expectations: Shared centralized data and scoped classes.
- DX expectations: Existing conventions and Vitest contracts.

## 11. Affected Surfaces
- Files likely affected: `client/src/App.jsx`, `client/src/pages/Services.jsx`, `client/src/constants/content.js`, `client/src/constants/homepage.js`, `client/src/pages/Home.jsx`, `client/src/components/home/FeaturedServices.jsx`, `client/src/index.css`, `client/test/site-pages.test.jsx`, run artifacts.
- Directories likely affected: `client/src/pages`, `client/src/components/home`, `client/src/constants`, `client/test`, `_workflow/runs/work`.
- UI surfaces: Header nav, Home, Services, Footer, Booking/Admin regression surfaces.
- API routes: None.
- Components: New Services and FeaturedServices.
- Services: None.
- Database/schema: None.
- Config/env vars: None.
- Tests: Public-page Vitest and aggregate regressions.
- Docs: Run artifacts only.
- Workflow artifacts: request, handoff, spec, tasks, progress, review, release notes, summary.

## 12. Dependency And Integration Map
- Internal dependencies: Router imports Services; Home imports FeaturedServices; Services/Home/Booking/Admin import shared services; Header/Footer read homepage constants.
- External packages/services: Existing packages only.
- Integration points: Title-based Booking/Admin consumers, Home ordering, shared nav/footer mapping.
- Ordering constraints: Declare `galleryItems` before `services` references; write tests first.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: Static frontend service objects gain required additive metadata.
- Database changes: None.
- State management changes: None.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Preserve titles, description, duration, and fromPrice.

## 14. UX / API / Workflow Expectations
- UX expectations: Existing dark cocoa/espresso, warm ivory, bronze editorial language; mobile-first cards; clear CTAs. Applied skill: design-taste-frontend.
- API contract expectations: Existing title-based Booking payload unchanged.
- CLI/workflow behavior: Root `npm test`, client Vitest, lint, and build prove release.
- Error handling expectations: Static UI; no artificial fetch states.
- Empty/loading/success/failure states: Not applicable for static constants.

## 15. Execution Strategy
- Recommended implementation approach: Vitest Red contracts; content reorder/refactor; route/page/component/link implementation; scoped CSS; refine semantics/mobile; polish regression checks.
- Suggested sequencing: Deliver one tightly integrated visible vertical slice, then final audit artifacts.
- Safe rollout/migration approach: Additive route and metadata; stable titles.
- Files to inspect before editing: Section 11 plus Button and GalleryFeature conventions.
- Decisions to avoid until more evidence exists: Detail pages, filters, new assets/packages, backend edits.

## 16. Verification Strategy
- Required automated checks: Focused/full client Vitest, root `npm test`, client build, client lint, diff check.
- Required manual checks: `/services` smoke, link/semantics/focus/mobile code-surface inspection, screenshot attempt if tooling exists.
- Test types needed: RTL route/DOM and CSS source contracts.
- Build/lint/typecheck expectations: Build and lint pass.
- Acceptance evidence required: Three TDD-first iterations and final diff audit.
- Proof of completion: Checks, artifacts, commit, PR record.

## 17. Acceptance Criteria
- [ ] `/services` route renders a dedicated page.
- [ ] Desktop/mobile Services nav links use `/services`; Gallery remains `/gallery`.
- [ ] Every shared service exposes all required keys with existing Gallery-backed imagery.
- [ ] Booking and Admin compatibility remain intact.
- [ ] Home renders Featured Services before Gallery preview.
- [ ] Services renders hero, salon/mobile explanation, four categories, complete image cards, card `/booking` CTAs, and final `/booking` CTA.
- [ ] Gallery remains portfolio-only with no card Gallery links or detail pages.
- [ ] Footer service browsing links prefer `/services`.
- [ ] Scoped styles are responsive, token-based, and accessible.
- [ ] Relevant Vitest, root `npm test`, and client build pass.

## 18. Edge Cases And Failure Modes
- Edge cases: Narrow screens, long copy, reused images, single-item categories, slow images, title consumers.
- Failure modes: Temporal-dead-zone references if array order is wrong; broken title consumers; incorrect Home ordering; Gallery card misrouting; raw-color token test failures.
- Regression risks: Existing tests intentionally codify wrong Services `/gallery` href and need updating.
- Recovery expectations: Fix scoped failures and rerun exact commands.

## 19. Risks And Mitigations
- Technical risks: Shared-data consumer breakage; mitigate with stable fields and Booking regressions.
- Product/UX risks: Dense catalog; mitigate with category spacing and restrained cards.
- Security risks: None expected.
- Scope risks: Drift into Gallery/Booking redesign; mitigate with explicit boundaries.
- Mitigation plan: TDD-first tests, scoped CSS, diff audit.

## 20. Assumptions
- Explicit assumptions: Curated Home subset is acceptable; footer browsing shortcuts route to `/services`; service titles remain API contract; screenshot depends on tools.
- Confidence level: High.
- What to revisit if assumptions are wrong: Featured ordering or narrow backend validation compatibility.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Exact featured ordering chosen for visual balance.
- Execution impact: None.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: TASK-001 visible Services journey; TASK-002 audit/release artifacts.
- Suggested first task: TASK-001.
- Suggested task ordering: Feature then audit.
- Areas that should not become separate tasks: Route, data, Home, nav, footer, CSS are one visitor journey.
- How the 3-pass Build -> Refine -> Polish loop should apply: Build route/data/UI; Refine accessibility/mobile; Polish visual/regression checks; each code pass Red -> Green -> Refactor.
