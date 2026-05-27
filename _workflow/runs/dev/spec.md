# Detailed Spec: Homepage Featured Services Square Price Row

## 1. Metadata

- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-05-26
- Request ID / slug: homepage-featured-services-square-price-row
- Request source: latest user prompt plus intake confirmation
- Execution mode: complete-workflow
- Request classification: frontend UI refinement
- Scope level: narrow frontend change
- Risk level: low to medium
- Workflow path: polish-ui
- Frontend Taste Application: Applied skill: design-taste-frontend

## 2. Original Request

- Raw user request: `please change the images to one size in a square for going horizontally across including a starting from price on each image so that we dont have to scroll down on the website`
- Normalized request: Update the KareBraids homepage Featured services section so all six service image tiles use a consistent square size, flow horizontally across the section on desktop to reduce vertical scrolling, and show a clear starting-price label on each image while preserving responsive mobile behavior, accessibility, existing booking behavior, and the current brand style.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers

- Questions asked: Should this apply to the homepage Featured services image tiles, showing all service images as same-size square cards in a horizontal row with visible "From" prices?
- Answers received: Yes.
- Questions skipped: Exact mobile behavior was not asked because it can be safely inferred from the existing responsive site requirements.
- Remaining open questions: None blocking.

## 4. Problem Definition

- Problem being solved: The current homepage Featured services section uses varied/staggered service image cards that take more vertical space and require more scrolling.
- Why it matters: Visitors should quickly compare the main braid services and starting prices without scrolling through a tall section.
- Current pain point: Service images are not one consistent square size, the layout is staggered, and prices are absent.
- Expected value: Faster scanning, clearer pricing expectations, and a shorter homepage service section.

## 5. Current State Analysis

- Existing behavior: `Home.jsx` renders `services.slice(0, 6)` as image-backed `.service-tile` articles in `.service-rack`.
- Existing architecture/components: React/Vite app with page components under `client/src/pages`, content constants under `client/src/constants`, and shared CSS in `client/src/index.css`.
- Existing files/modules likely involved:
  - `client/src/constants/content.js`
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Existing data flow: `Home.jsx` imports `services` and `galleryItems` from `content.js`; service tiles pair each service with a gallery image by index.
- Existing API/UI/CLI/workflow behavior: This is a static frontend display change; no API or CLI behavior is involved.
- Existing tests or verification coverage: `client/test/site-pages.test.jsx` already checks home page rendering, service images, and CSS guardrails.

## 6. Desired End State

- Expected final behavior: The Featured services section shows six square, same-size service tiles in a horizontal desktop row/band, each with title, duration/description as appropriate, and a clear starting-price label.
- User-facing outcome: Visitors can see the main services and starting prices at a glance without a tall staggered service section.
- Developer-facing outcome: Starting price data is stored with the existing service content and rendered by the homepage service tile markup.
- System/workflow outcome: UI-only change with tests, verification, workflow artifacts, and design-taste evidence.
- Backward compatibility expectations: Existing routes, booking flow, gallery content, and service descriptions continue to work.

## 7. Scope

- In scope:
  - Add starting price values to the six service objects.
  - Render a visible price label on each homepage service tile.
  - Convert homepage service cards to consistent square image tiles.
  - Arrange service cards horizontally on desktop to reduce vertical scrolling.
  - Preserve accessible names/text and responsive behavior.
  - Add/update frontend tests first.
- Out of scope:
  - Booking price calculation.
  - Backend/database/API changes.
  - Admin UI changes.
  - Gallery page masonry redesign.
  - New dependencies.
  - Payment, checkout, or quote logic.
- Non-goals:
  - Repricing services beyond the confirmed starting values.
  - Rewriting the homepage content strategy.
  - Changing the service booking workflow.
- Explicit boundaries: Only the homepage service display and the existing service content constants should change unless tests require a narrowly scoped adjustment.

## 8. Users And Use Cases

- Primary users: KareBraids website visitors comparing braid services.
- Secondary users: Site owner/admin reviewing public service presentation.
- Main use cases:
  - Scan all featured services quickly.
  - See a starting price before booking.
  - Continue to booking from the existing homepage call to action.
- Edge use cases:
  - Narrow mobile visitors need a compact layout without broken horizontal overflow.
  - Keyboard/screen-reader users should still access service text and pricing.

## 9. Functional Requirements

- Required behaviors:
  - Render six service image tiles in the Featured services section.
  - Each tile must be square and visually same-sized within its breakpoint layout.
  - Desktop layout should place the six tiles horizontally across the section.
  - Each tile must show a "From" starting price:
    - Knotless Braids: From GBP 80 / UI may show `From £80`
    - Box Braids: From GBP 70 / UI may show `From £70`
    - Cornrows: From GBP 35 / UI may show `From £35`
    - Twists: From GBP 65 / UI may show `From £65`
    - Stitch Braids: From GBP 45 / UI may show `From £45`
    - Kids Braids: From GBP 30 / UI may show `From £30`
- Inputs: Static service data from `content.js`.
- Outputs: Updated homepage service tile UI.
- State changes: None beyond static content shape.
- Error states: Not applicable.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements

- Performance expectations: No new libraries or heavy runtime animation; images remain lazy-loaded.
- Reliability expectations: Existing homepage rendering and routing tests continue to pass.
- Security/privacy expectations: No secrets, user data, or backend calls involved.
- Accessibility expectations: Price text is real text, not only visual decoration; overlay contrast remains readable.
- Maintainability expectations: Price data belongs with the existing `services` constants, not hard-coded into CSS.
- DX expectations: Tests document the service price display and layout CSS contract.

## 11. Affected Surfaces

- Files likely affected:
  - `client/src/constants/content.js`
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `_workflow/runs/dev/*`
  - `.workflow/artifacts/polish-ui/*`
- Directories likely affected:
  - `client/src`
  - `client/test`
  - `_workflow/runs/dev`
  - `.workflow/artifacts/polish-ui`
- UI surfaces: Homepage Featured services section.
- API routes: Not applicable.
- Components: `Home` page service tile markup.
- Services: Static `services` content constant only.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests: Frontend page tests.
- Docs: Workflow artifacts only unless durable architecture facts change.
- Workflow artifacts: request, handoff, spec, tasks after approval, progress, review, verification, release notes, summary.

## 12. Dependency And Integration Map

- Internal dependencies:
  - `Home.jsx` depends on `services` and `galleryItems`.
  - `Booking.jsx` also reads `services`, so adding a `startingPrice` field must be non-breaking.
  - Tests read `client/src/index.css` as text for layout guardrails.
- External packages/services: None new.
- Integration points: Static content displayed by homepage and booking service selection. Booking should ignore or tolerate the added price field unless intentionally displayed later, which is out of scope.
- Ordering constraints:
  - Add/update tests first.
  - Add service price data.
  - Render price labels.
  - Adjust CSS layout.
  - Verify no overflow and existing behavior.
- Migration/setup requirements: None.

## 13. Data And State Impact

- Data models: Add a static `startingPrice` or similarly named display value to each service object.
- Database changes: None.
- State management changes: None.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Existing consumers of service fields should continue to work because the new field is additive.

## 14. UX / API / Workflow Expectations

- UX expectations:
  - Square tiles feel visually consistent and easy to compare.
  - Pricing appears as a compact, legible badge or label on each image.
  - The desktop section becomes materially shorter than the current staggered layout.
  - Mobile remains usable without page-level horizontal overflow.
- API contract expectations: Not applicable.
- CLI/workflow behavior: No CLI behavior changes.
- Error handling expectations: Not applicable.
- Empty/loading/success/failure states: Not applicable for static homepage content.

## 15. Execution Strategy

- Recommended implementation approach:
  - Update `site-pages.test.jsx` with failing assertions for service starting prices and CSS layout contract.
  - Add starting price display data to `services`.
  - Update `Home.jsx` to render the price label inside each service tile.
  - Update `.service-rack` and `.service-tile` CSS to use fixed square aspect ratio and a horizontal desktop grid.
  - Add responsive rules to avoid mobile overflow.
- Suggested sequencing:
  - TASK-001: Add service prices and square horizontal homepage service row.
  - TASK-002: Verify responsive behavior and close workflow.
- Safe rollout/migration approach: UI-only additive content change; no migration.
- Files to inspect before editing:
  - `client/src/constants/content.js`
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `client/src/pages/Booking.jsx` only to confirm added service field is harmless.
- Decisions to avoid until more evidence exists:
  - Do not wire prices into booking totals.
  - Do not redesign the gallery page.
  - Do not add carousel libraries.

## 16. Verification Strategy

- Required automated checks:
  - Focused test failure before implementation for the new price/layout expectations.
  - Focused frontend tests pass after implementation.
  - `npm test --prefix client -- site-pages.test.jsx`
  - `npm run lint --prefix client`
  - `npm run build --prefix client`
- Required manual checks:
  - Inspect desktop and mobile homepage layout via browser automation if available.
  - Confirm no body-level horizontal overflow on mobile.
- Test types needed:
  - Component/integration render tests.
  - CSS text guardrail tests for square/horizontal service layout.
- Build/lint/typecheck expectations: Client lint and build should pass.
- Acceptance evidence required: Test logs, lint/build result, browser or code-surface responsive evidence, final diff audit.
- Proof of completion: Updated workflow progress, review, verification, release notes, summary, and handoff.

## 17. Acceptance Criteria

- [ ] Homepage Featured services renders all six existing service tiles with visible starting prices.
- [ ] Starting prices match the confirmed values for all six services.
- [ ] Service tiles use a consistent square layout.
- [ ] Desktop layout arranges the six tiles horizontally across the section to reduce vertical scrolling.
- [ ] Mobile layout remains usable and does not create body-level horizontal overflow.
- [ ] Existing homepage navigation, CTA links, gallery preview, and booking behavior remain unchanged.
- [ ] Tests are added or updated first, expected Red evidence is captured when possible, and verification passes after implementation.
- [ ] Applied skill: design-taste-frontend is recorded in task evidence and downstream workflow artifacts.

## 18. Edge Cases And Failure Modes

- Edge cases:
  - Six columns may become too compressed near tablet widths.
  - Long service names and price labels must not overlap or spill out of square tiles.
  - Horizontal scroll on mobile, if used, must be local to the services row and not page-wide.
- Failure modes:
  - Price label unreadable against bright images.
  - CSS changes accidentally affect gallery cards or booking service cards.
  - Added service field breaks tests that expect exact object shape.
- Regression risks:
  - Homepage service tile tests may need updates for new markup.
  - Existing responsive CSS may override the intended square tiles at `max-width: 840px`.
- Recovery expectations:
  - Keep changes scoped and revert only this task's own edits if a layout approach fails.

## 19. Risks And Mitigations

- Technical risks:
  - CSS grid changes could cause overflow. Mitigation: use stable grid constraints, `aspect-ratio: 1 / 1`, and browser/mobile verification.
- Product/UX risks:
  - Six tiles in one row may make text cramped. Mitigation: use compact overlays and responsive breakpoints.
- Security risks:
  - None expected.
- Scope risks:
  - Pricing could be mistaken as bookable pricing logic. Mitigation: label as starting prices only and do not alter booking behavior.
- Mitigation plan:
  - Test first, implement narrowly, verify responsive behavior, and document out-of-scope pricing logic.

## 20. Assumptions

- Explicit assumptions:
  - The user accepts the recommended starting prices confirmed with "yes".
  - UI can use the pound symbol for display because the business is London based.
  - Desktop should prioritize a single horizontal band for the six services.
  - Mobile compactness can be solved with responsive wrapping or a contained horizontal scroller.
- Confidence level: High for target surface and price values; medium for exact mobile layout until browser verification.
- What to revisit if assumptions are wrong:
  - Price values and display format.
  - Whether mobile should scroll horizontally or wrap into two columns.

## 21. Open Questions

- Blocking questions: None.
- Non-blocking questions:
  - Should prices later appear in the booking flow? Out of scope for this request.
- Execution impact: No blocking impact.

## 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - TASK-001: Add starting prices and square horizontal homepage service tiles.
  - TASK-002: Verify responsive homepage service row and close workflow artifacts.
- Suggested first task: Add tests for service price labels and square/horizontal service layout, then implement the content, markup, and CSS changes.
- Suggested task ordering: Implement the homepage service row first, then verify and close.
- Areas that should not become separate tasks: Backend, booking price logic, gallery redesign, dependency changes.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Build: test-first data/markup/CSS implementation.
  - Refine: responsive and accessibility hardening with focused checks.
  - Polish: final visual/readability pass, browser verification, and artifact closeout.
