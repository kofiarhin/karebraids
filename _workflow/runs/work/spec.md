# Services Page Redesign Spec

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-04
- Request ID / slug: services-page-redesign
- Request source: Latest user prompt
- Execution mode: complete-workflow
- Request classification: Frontend UI redesign
- Scope level: Small
- Risk level: Low

## 2. Original Request
- Raw user request: Redesign `/services` so it no longer resembles the Home hero; replace the large image hero with a compact editorial header, add service category chips, and keep the existing grid/cards.
- Normalized request: Replace the top Services hero with compact copy/actions/category panel and make the grid appear directly after the header.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: None; request included concrete copy, files, layout, and acceptance criteria.
- Answers received: Not applicable.
- Questions skipped: Non-blocking visual fine-tuning questions.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: Services page currently uses a large image hero that visually repeats the Home page hero pattern.
- Why it matters: Users should reach service browsing faster and the page should feel purpose-built for service discovery.
- Current pain point: A large portrait hero and separate intro delay the service cards.
- Expected value: Faster browsing, clearer page identity, premium editorial style.

## 5. Current State Analysis
- Existing behavior: `Services.jsx` derives `heroService`, renders `.services-hero` with `.services-hero-image`, then renders `.services-intro`, then the service category grid.
- Existing architecture/components: React page component using shared service data and `Link` from React Router.
- Existing files/modules likely involved: `client/src/pages/Services.jsx`, `client/src/index.css`, `client/test/site-pages.test.jsx`, `client/test/service-detail.test.jsx`.
- Existing data flow: `getGalleryServices()` feeds service cards and formerly fed hero image.
- Existing API/UI/CLI/workflow behavior: Static client data renders public `/services` route.
- Existing tests or verification coverage: Public page tests cover services page rendering and service-detail fallback redirect.

## 6. Desired End State
- Expected final behavior: `/services` starts with compact editorial header, category panel, and actions; no large hero image; grid follows immediately.
- User-facing outcome: Users can quickly jump to services or booking while seeing service categories at a glance.
- Developer-facing outcome: Header CSS and JSX use dedicated `services-page-header` naming.
- System/workflow outcome: Existing service cards and routing continue to work.
- Backward compatibility expectations: `/services/not-a-style` still lands on services listing.

## 7. Scope
- In scope: Services header JSX, Services CSS, tests for changed expectations, workflow docs.
- Out of scope: Changing service data, card content, gallery images, booking flow, backend APIs.
- Non-goals: Full site redesign or new dependencies.
- Explicit boundaries: Only Services page top layout and tests directly tied to it.

## 8. Users And Use Cases
- Primary users: KareBraids customers browsing services.
- Secondary users: Site admins/developers maintaining public pages.
- Main use cases: Scan service page, jump to grid, book an appointment.
- Edge use cases: Mobile browsing with compact two-column category chips.

## 9. Functional Requirements
- Required behaviors: Remove `heroService`, `.services-hero`, `.services-hero-image`, `.services-intro`; add specified copy/actions/panel; preserve cards.
- Inputs: Static service data from `getGalleryServices()`.
- Outputs: Rendered `/services` route.
- State changes: None.
- Error states: Existing empty-service handling remains unchanged.
- Permissions/auth expectations: Public route; no auth.

## 10. Non-Functional Requirements
- Performance expectations: Less top-page imagery should reduce above-grid visual weight.
- Reliability expectations: Existing route and card links continue working.
- Security/privacy expectations: No new data or secrets.
- Accessibility expectations: Header labelled by `services-title`; decorative panel hidden from assistive tech per requested markup.
- Maintainability expectations: CSS uses existing tokens and class names with clear page-specific naming.
- DX expectations: Tests capture changed top-section behavior.

## 11. Affected Surfaces
- Files likely affected: `client/src/pages/Services.jsx`, `client/src/index.css`, `client/test/site-pages.test.jsx`, `client/test/service-detail.test.jsx`.
- Directories likely affected: `client/src/pages`, `client/src`, `client/test`.
- UI surfaces: `/services`.
- API routes: Not applicable.
- Components: `Services` page.
- Services: Static service data consumer only.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests: Vitest public page tests.
- Docs: Workflow artifacts.

## 12. Dependency And Integration Map
- Internal dependencies: React Router `Link`, `getGalleryServices`, `getServicePreviewImage` for cards.
- External packages/services: Existing React/Vite/Vitest stack only.
- Integration points: `/services` route in `App.jsx`; booking and gallery routes.
- Ordering constraints: Update failing tests first, then JSX/CSS, then verification.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: None.
- Database changes: None.
- State management changes: None.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Service detail fallback page heading expectation updated to new H1.

## 14. UX / API / Workflow Expectations
- UX expectations: Dark luxury editorial header, compact action row, side panel on desktop, two-column chips on mobile.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Not applicable.
- Error handling expectations: Existing no-services null rendering remains.
- Empty/loading/success/failure states: Existing success and empty behavior retained.

## 15. Execution Strategy
- Recommended implementation approach: Update tests for new header, replace top JSX, replace old hero/intro CSS with new header/panel rules, verify.
- Suggested sequencing: Tests -> JSX -> CSS -> checks -> review.
- Safe rollout/migration approach: No migration needed.
- Files to inspect before editing: Services page, CSS services block, page tests.
- Decisions to avoid until more evidence exists: Do not introduce new images or dependencies.

## 16. Verification Strategy
- Required automated checks: Targeted Vitest, full Vitest, Vite build, ESLint check or documented existing lint blockers.
- Required manual checks: Code-surface review for responsive layout; screenshot unavailable because no browser automation package is installed.
- Test types needed: Rendering assertions for removed hero, new copy/actions/panel, direct grid order.
- Build/lint/typecheck expectations: Build passes; lint has known unrelated pre-existing errors in Booking/Gallery.
- Acceptance evidence required: Tests pass and diff confirms removed image hero/intro.
- Proof of completion: Updated files plus passing tests/build.

## 17. Acceptance Criteria
- [x] `/services` no longer visually resembles the Home hero.
- [x] No large portrait/image hero appears at the top of Services.
- [x] Services grid appears directly after the compact header.
- [x] Desktop and mobile layouts remain premium, clean, and responsive.
- [x] Existing service cards, pricing, images, and booking CTA still work.

## 18. Edge Cases And Failure Modes
- Edge cases: No services available; mobile narrow widths; redirect from unknown service detail slug.
- Failure modes: Stale tests expecting old H1; CSS selectors leaving old hero styles active.
- Regression risks: Header CTA conflicts with global booking CTA queries; mitigated with scoped tests.
- Recovery expectations: Adjust only changed tests and Services-specific CSS/JSX.

## 19. Risks And Mitigations
- Technical risks: Old CSS selectors could remain unused; mitigated by replacing services hero selectors.
- Product/UX risks: Category panel hidden from assistive tech by requested `aria-hidden`; acceptable because it is decorative summary copy.
- Security risks: None.
- Scope risks: Avoid unrelated lint fixes.
- Mitigation plan: Keep changes scoped to requested files/tests.

## 20. Assumptions
- Explicit assumptions: Test updates are acceptable to reflect intentional H1/content change. No new screenshot dependency should be installed just to capture a visual.
- Confidence level: High.
- What to revisit if assumptions are wrong: Add browser automation screenshot if requested.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Whether category panel should be accessible rather than `aria-hidden` in a future pass.
- Execution impact: None.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: One task: replace Services top layout and prove grid/cards still work.
- Suggested first task: Services editorial header redesign.
- Suggested task ordering: Test, implement, verify.
- Areas that should not become separate tasks: Backend, service data, booking flow.
- How the 3-pass Build -> Refine -> Polish loop should apply: Build changed layout, refine route/test fallout, polish CSS/mobile and verification evidence.
