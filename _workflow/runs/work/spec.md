## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-02
- Request ID / slug: single-source-services
- Request source: latest user prompt
- Execution mode: complete-workflow
- Request classification: frontend refactor + tests
- Scope level: medium
- Risk level: medium

## 2. Original Request
- Raw user request: Implement a single source of truth for KareBraids services across Home, Gallery, and Booking.
- Normalized request: Create canonical services data and selectors, refactor Home/Gallery/Booking, update tests, run client test/build.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: none; repo and prompt provided enough detail.
- Answers received: not applicable.
- Questions skipped: all, because remaining details are explicit or safely assumed.
- Remaining open questions: none blocking.

## 4. Problem Definition
- Problem being solved: Service data is duplicated across content, gallery, booking, and UI surfaces.
- Why it matters: Prevents drift in names, prices, booking availability, gallery filters, and service presentation.
- Current pain point: Pages/components and compatibility files own service/gallery arrays independently.
- Expected value: One maintainable source controls services everywhere.

## 5. Current State Analysis
- Existing behavior: Home and Services use gallery query hooks, Gallery uses `useGallery`, Booking imports `services` from content.
- Existing architecture/components: React pages/components with Tailwind classes and API hooks in services/hooks.
- Existing files/modules likely involved: required files plus home/service components, constants, tests.
- Existing data flow: service/gallery data comes from `constants/content.js` and mocked gallery API hooks.
- Existing API/UI/CLI/workflow behavior: Booking submits service name through `createBooking` and availability uses service/date.
- Existing tests or verification coverage: Vitest RTL tests for gallery, booking, homepage, services, modal.

## 6. Desired End State
- Expected final behavior: Canonical services selectors feed Home, Gallery, Booking, Services, and detail compatibility.
- User-facing outcome: Same premium UI with functional service filter and empty state.
- Developer-facing outcome: One data module for services and gallery images.
- System/workflow outcome: Tests/build pass.
- Backward compatibility expectations: Booking payload keeps existing `service` name.

## 7. Scope
- In scope: canonical data, selector usage, tests, minor CSS for filter/empty/fallback.
- Out of scope: backend, database, auth, deployment, dependency changes.
- Non-goals: redesign the app.
- Explicit boundaries: no new packages or API contract changes.

## 8. Users And Use Cases
- Primary users: clients browsing and booking braid styles.
- Secondary users: developer/admin maintaining service catalog.
- Main use cases: browse featured services, filter gallery, book a style.
- Edge use cases: selected service has no images; image load fails; preselected booking style.

## 9. Functional Requirements
- Required behaviors: selector exports, dropdown filters, booking reset date/time on service change, lazy gallery images, fallback image.
- Inputs: route query service/style, dropdown selection, booking form values.
- Outputs: rendered services/images and booking payload.
- State changes: selected gallery service, selected booking service/date/time.
- Error states: no gallery images empty state, failed image placeholder.
- Permissions/auth expectations: none.

## 10. Non-Functional Requirements
- Performance expectations: local selectors are cheap; images lazy-load.
- Reliability expectations: no duplicated arrays to drift.
- Security/privacy expectations: no secrets.
- Accessibility expectations: labelled select, meaningful alt text, modal Escape close remains.
- Maintainability expectations: clear module/selector names.
- DX expectations: tests document behavior.

## 11. Affected Surfaces
- Files likely affected: `client/src/data/services.js`, pages/components/constants/tests/CSS.
- Directories likely affected: `client/src`, `client/test`, `_workflow/runs/work`.
- UI surfaces: Home, Gallery, Booking, Services, service detail compatibility.
- API routes: none.
- Components: GalleryModal and home service/gallery components.
- Services: gallery service compatibility may use local selectors.
- Database/schema: none.
- Config/env vars: none.
- Tests: Vitest RTL tests.
- Docs: workflow artifacts.

## 12. Dependency And Integration Map
- Internal dependencies: App routes, query hooks, booking hooks, service preview utility.
- External packages/services: existing React, React Router, TanStack Query, Phosphor.
- Integration points: booking service expects name string.
- Ordering constraints: data module first, then UI, then tests.
- Migration/setup requirements: none.

## 13. Data And State Impact
- Data models: canonical service shape with id/slug/name/category/priceFrom/duration/galleryImages.
- Database changes: none.
- State management changes: Gallery local selected service id; Booking form keeps service name.
- Cache/session/local storage impact: none.
- Backward compatibility impact: preserve booking route query and payload.

## 14. UX / API / Workflow Expectations
- UX expectations: all services option, polished empty state, brand styles retained.
- API contract expectations: booking submits stable service name.
- CLI/workflow behavior: tests and build pass.
- Error handling expectations: image failure falls back/placeholder; empty images message.
- Empty/loading/success/failure states: local gallery no loading; empty state for filtered no images.

## 15. Execution Strategy
- Recommended implementation approach: create module, refactor import surfaces, then tests.
- Suggested sequencing: data -> Home/Gallery/Booking -> compatibility -> tests -> verify.
- Safe rollout/migration approach: keep old field compatibility where needed.
- Files to inspect before editing: prompt-required files and dependent home/services tests.
- Decisions to avoid until more evidence exists: backend API changes.

## 16. Verification Strategy
- Required automated checks: `npm test --prefix client`, `npm run build --prefix client`.
- Required manual checks: code review/diff audit.
- Test types needed: RTL tests for Home/Gallery/Booking/modal.
- Build/lint/typecheck expectations: Vite build pass.
- Acceptance evidence required: test/build output and diff audit.
- Proof of completion: committed changes and PR.

## 17. Acceptance Criteria
- [ ] One canonical service data source exists.
- [ ] Home, Gallery, Booking import selectors from it.
- [ ] Gallery filter works for all + individual services and empty state.
- [ ] Booking keeps API contract.
- [ ] Tests/build pass.

## 18. Edge Cases And Failure Modes
- Edge cases: empty service gallery, bad image, invalid query slug.
- Failure modes: tests expect old hook mocks, booking payload changes unexpectedly.
- Regression risks: service detail imports old content, CSS missing for select.
- Recovery expectations: adapt compatibility selectors and tests.

## 19. Risks And Mitigations
- Technical risks: duplicated service profile arrays remain. Mitigation: derive profiles from canonical services.
- Product/UX risks: style drift. Mitigation: reuse existing classes and colors.
- Security risks: none.
- Scope risks: services page also data-dependent. Mitigation: update affected adjacent surfaces.
- Mitigation plan: run full tests/build.

## 20. Assumptions
- Explicit assumptions: service name is backend booking value.
- Confidence level: high.
- What to revisit if assumptions are wrong: booking API payload mapping.

## 21. Open Questions
- Blocking questions: none.
- Non-blocking questions: whether future backend gallery API should coexist.
- Execution impact: none.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: single vertical refactor task with tests.
- Suggested first task: add canonical data and selector exports.
- Suggested task ordering: data, UI consumers, tests, verification.
- Areas that should not become separate tasks: backend changes.
- How the 3-pass Build -> Refine -> Polish loop should apply: red tests, implementation, refine compatibility, polish review.
