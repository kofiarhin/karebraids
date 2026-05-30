# Detailed Spec: Homepage Gallery Feature

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: `2026-05-30`
- Request ID / slug: `homepage-gallery-feature`
- Request source: Latest prompt plus clarified decisions.
- Execution mode: `complete-workflow`
- Request classification: `feature`
- Scope level: `medium`
- Risk level: `low`

## 2. Original Request
- Raw user request: Replace homepage Signature Styles with a premium gallery preview and apply the ten confirmed follow-up decisions.
- Normalized request: Add one six-card `GalleryFeature`, remove both old homepage teasers, redirect stale homepage anchors to `/gallery`, style and verify the focused UI slice.
- Source prompt / request reference: `_workflow/runs/work/request.md`.

## 3. Questions And Answers
- Questions asked: Should header Services and hero View Styles redirect to `/gallery`, and should the old teaser be removed?
- Answers received: Yes. User confirmed per-card links, one CTA, responsive editorial styling, safe cleanup, preserved booking/services elsewhere, and build/lint verification.
- Questions skipped: API/database/auth questions were locally discoverable as not applicable.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: Duplicate homepage teaser concepts dilute the visual hierarchy and old anchor links would break after section deletion.
- Why it matters: Prospective clients need a premium visual proof surface and direct full-gallery path.
- Current pain point: Signature service cards and a separate four-image gallery block split attention.
- Expected value: Stronger gallery discovery and a cleaner conversion-focused homepage.

## 5. Current State Analysis
- Existing behavior: `Home.jsx` renders Hero, TrustStrip, `#signature-styles`, WhyChoose, GalleryPreview, TestimonialSection, BookingCTA.
- Existing architecture/components: React/Vite, React Router, shared constants, global CSS, `useRevealOnScroll()`.
- Existing files/modules likely involved: `Home.jsx`, `Hero.jsx`, `GalleryPreview.jsx`, `ServiceCard.jsx`, `homepage.js`, `content.js`, `index.css`, `site-pages.test.jsx`.
- Existing data flow: `galleryItems` lives in `constants/content.js`; homepage constants derive images from it.
- Existing API/UI/CLI/workflow behavior: UI-only change; `/gallery` exists.
- Existing tests or verification coverage: Frontend Vitest page tests; client test/lint/build scripts.

## 6. Desired End State
- Expected final behavior: One six-card linked gallery teaser immediately after TrustStrip.
- User-facing outcome: Any preview card, the explicit CTA, header Services item, or hero View Styles CTA opens `/gallery`.
- Developer-facing outcome: Direct gallery data reuse and obsolete teaser cleanup.
- System/workflow outcome: Reveal remains active and checks pass.
- Backward compatibility expectations: Booking/services elsewhere and Gallery page remain unchanged.

## 7. Scope
- In scope: New component, homepage composition, two link redirects, scoped CSS, tests, safe cleanup, artifacts, verification.
- Out of scope: Gallery-page/modal redesign, booking changes, backend/API/database, dependency additions, asset additions, Tailwind migration.
- Non-goals: Redesign unrelated sections.
- Explicit boundaries: Remove only proven-unused homepage teaser code.

## 8. Users And Use Cases
- Primary users: Prospective clients evaluating work quality.
- Secondary users: Returning visitors navigating to Gallery.
- Main use cases: Scan cards and enter `/gallery` through card or CTA.
- Edge use cases: Keyboard, mobile, reduced motion, slow images.

## 9. Functional Requirements
- Required behaviors: Import `galleryItems`, slice first six, individual React Router Links, CTA Link, link redirects, reveal attributes.
- Inputs: Existing gallery records.
- Outputs: Six cards and CTA.
- State changes: None.
- Error states: Native alt fallback for image failures.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: Reuse URLs, lazy images, stateless component.
- Reliability expectations: No stale anchor references or unsafe deletions.
- Security/privacy expectations: Not applicable.
- Accessibility expectations: Semantic heading, alt text, card links, visible focus, no nested links.
- Maintainability expectations: Self-contained component and scoped class names.
- DX expectations: Existing scripts, no dependencies.

## 11. Affected Surfaces
- Files likely affected: `GalleryFeature.jsx`, `Home.jsx`, `Hero.jsx`, `homepage.js`, `index.css`, `site-pages.test.jsx`.
- Directories likely affected: `client/src/components/home`, `client/src/pages`, `client/src/constants`, `client/src`, `client/test`, `_workflow/runs/work`.
- UI surfaces: Homepage, header Services item, hero CTA.
- API routes: None.
- Components: Add GalleryFeature; remove GalleryPreview/ServiceCard if unused.
- Services: None.
- Database/schema: None.
- Config/env vars: None.
- Tests: Homepage integration assertions.
- Docs: Run-scoped artifacts.
- Workflow artifacts: Required run files.

## 12. Dependency And Integration Map
- Internal dependencies: `galleryItems`, React Router `Link`, reveal hook/CSS, homepage composition.
- External packages/services: Existing `react-router-dom`, existing remote image URLs.
- Integration points: Home, header constants, Hero, CSS, tests.
- Ordering constraints: Red test first; implement; cleanup after reference scan.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: Existing `galleryItems` shape.
- Database changes: None.
- State management changes: None.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Retire homepage anchor intentionally.

## 14. UX / API / Workflow Expectations
- UX expectations: Three desktop columns, varied heights, card 2/5 offsets, overlays, glass captions, zoom, active/focus states, mobile reset.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Existing npm scripts.
- Error handling expectations: Meaningful alt text.
- Empty/loading/success/failure states: Static content; lazy browser loading; no empty state required.

## 15. Execution Strategy
- Recommended implementation approach: Update test first, observe Red, implement smallest Green, harden CSS/accessibility, remove only unused code.
- Suggested sequencing: One vertical task through Build, Refine, Polish.
- Safe rollout/migration approach: Preserve routes/data.
- Files to inspect before editing: Current relevant UI, constants, CSS, test.
- Decisions to avoid until more evidence exists: Do not delete shared `SectionHeading`; do not alter Gallery page classes.

## 16. Verification Strategy
- Required automated checks: Targeted Vitest, full client Vitest, ESLint, Vite build, reference scans.
- Required manual checks: Browser visual review and screenshot if browser automation is available.
- Test types needed: React Testing Library homepage assertions.
- Build/lint/typecheck expectations: Client test/lint/build pass; no separate typecheck script.
- Acceptance evidence required: Red/Green/Refactor logs, verification, scans, diff audit, screenshot or documented limitation.
- Proof of completion: Checked acceptance criteria and complete artifacts.

## 17. Acceptance Criteria
- [ ] Correct final homepage order.
- [ ] Old Signature Styles and GalleryPreview homepage rendering removed.
- [ ] GalleryFeature renders first six `galleryItems`.
- [ ] Every card is an individual `/gallery` Link with lazy image, title alt, title, and `View Gallery →`.
- [ ] `View Full Gallery` CTA links to `/gallery`.
- [ ] Header Services and hero View Styles link to `/gallery`.
- [ ] Premium editorial responsive/focus CSS is present.
- [ ] Reveal behavior remains connected.
- [ ] Safely unused homepage-only code removed.
- [ ] Vitest, lint, and build pass.
- [ ] Visual review completed with screenshot when possible.

## 18. Edge Cases And Failure Modes
- Edge cases: Keyboard sequence, mobile, reduced motion, image load failure.
- Failure modes: Shared gallery CSS collision, stale anchor, deleting shared constants, nested links.
- Regression risks: Header/Hero routing, Gallery page styles, reveal behavior.
- Recovery expectations: Scoped fix and exact command rerun.

## 19. Risks And Mitigations
- Technical risks: CSS collision; use `gallery-feature-*` classes.
- Product/UX risks: Excess visual effects; keep restrained and review screenshot.
- Security risks: None.
- Scope risks: Broad cleanup; delete only proven-unused code.
- Mitigation plan: TDD, scans, full checks.

## 20. Assumptions
- Explicit assumptions: `/gallery` exists, six valid gallery entries exist, obsolete components are deletable only if unused.
- Confidence level: High.
- What to revisit if assumptions are wrong: Retain shared code and document exception.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Exact safe CSS cleanup extent after scans.
- Execution impact: None blocking.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: One end-to-end homepage teaser slice.
- Suggested first task: `TASK-001: Replace homepage service teaser with linked six-card GalleryFeature`.
- Suggested task ordering: Red, Green, responsive/accessibility Refine, cleanup/visual Polish.
- Areas that should not become separate tasks: CSS and link redirects belong to same visible slice.
- How the 3-pass Build -> Refine -> Polish loop should apply: behavior, hardening, cleanup/final verification.

## 23. Frontend Taste Application
- Applicable: Yes.
- Detection result and reason: Frontend UI redesign and CSS refinement.
- Required propagation points: tasks, evidence, review, verification, release notes, summary, health check.

Applied skill: design-taste-frontend
