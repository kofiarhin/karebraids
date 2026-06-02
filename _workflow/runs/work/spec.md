# Detailed Spec: KareBraids Service-Driven Gallery

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-02
- Request ID / slug: karebraids-service-driven-gallery
- Request source: latest direct user prompt
- Execution mode: complete-workflow
- Request classification: frontend/backend feature implementation
- Scope level: medium
- Risk level: medium

## 2. Original Request
- Raw user request: Implement the KareBraids gallery/service feature.
- Normalized request: Build a service-driven gallery backed by backend service JSON, expose service preview and filtered gallery endpoints, and update frontend query/UI surfaces to use backend-owned data.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: none; request was sufficiently specific.
- Answers received: not applicable.
- Questions skipped: explicit approval gate skipped due non-interactive implementation turn.
- Remaining open questions: legacy `style` query redirect and booking validation expansion.

## 4. Problem Definition
- Problem being solved: Gallery data was not service-driven and frontend surfaces still depended on duplicated/static style data.
- Why it matters: Service cards, gallery filters, and reviews need one backend source of truth.
- Current pain point: Client filtering and static frontend data can drift from backend content.
- Expected value: Cleaner API contracts and service-specific gallery/review pages.

## 5. Current State Analysis
- Existing behavior: `/api/gallery` returned flat gallery items from `server/data/gallery.json`; frontend filtered `style` in React.
- Existing architecture/components: Express gallery route/controller, React Gallery page, TanStack Query hook, API service module, homepage Browse/Featured cards.
- Existing files/modules likely involved: server gallery controller/routes/tests/data and client gallery service/hooks/pages/home components/tests.
- Existing data flow: frontend query called `/gallery`, got a flat list, optionally filtered client-side.
- Existing API/UI/CLI/workflow behavior: no `/api/gallery/services`; no service metadata/reviews in filtered gallery responses.
- Existing tests or verification coverage: Jest gallery tests and Vitest page/gallery/modal tests.

## 6. Desired End State
- Expected final behavior: Backend owns services and images; frontend asks backend for all or selected service gallery results.
- User-facing outcome: `/gallery` shows all looks; `/gallery?service=<id>` shows selected service intro, reviews, and filtered images.
- Developer-facing outcome: API calls live in services/hooks and reusable components consume query hooks.
- System/workflow outcome: Tests cover endpoint contracts and frontend routing/rendering.
- Backward compatibility expectations: Existing modal behavior remains; legacy pages still render.

## 7. Scope
- In scope: service JSON, API endpoints, frontend service/query logic, gallery page behavior, preview cards, tests.
- Out of scope: DB persistence, admin CMS, new dependencies, auth, deployment changes.
- Non-goals: replacing booking flow or removing legacy service detail routes.
- Explicit boundaries: do not duplicate new service gallery data in frontend.

## 8. Users And Use Cases
- Primary users: KareBraids clients browsing braid styles.
- Secondary users: developer/admin maintaining sample gallery data.
- Main use cases: browse all gallery images, choose a service card, view selected service gallery/reviews.
- Edge use cases: unknown service query, loading/error/empty API states.

## 9. Functional Requirements
- Required behaviors: endpoints return services, all gallery items, or selected service data; UI renders selected-service-only intro/reviews.
- Inputs: `service` query param and optional positive `limit`.
- Outputs: JSON service previews and gallery responses.
- State changes: none persistent.
- Error states: frontend displays retryable error states.
- Permissions/auth expectations: public endpoints.

## 10. Non-Functional Requirements
- Performance expectations: static JSON and simple flattening are sufficient.
- Reliability expectations: unknown service query should not break gallery display.
- Security/privacy expectations: no secrets or sensitive user data.
- Accessibility expectations: card links/buttons have accessible names; modal focus behavior preserved.
- Maintainability expectations: API logic outside components; reusable hooks.
- DX expectations: Jest/Vitest coverage for API and UI behavior.

## 11. Affected Surfaces
- Files likely affected: `server/data/services.json`, gallery controller/routes/tests, frontend gallery service/hooks/pages/components/tests.
- Directories likely affected: `server/`, `client/src/`, `client/test/`.
- UI surfaces: gallery page, homepage Browse By Style, homepage Featured Services, services page.
- API routes: `/api/gallery`, `/api/gallery/services`.
- Components: Gallery, BrowseByStyle, FeaturedServices, Services, ReviewList.
- Services: frontend gallery service module.
- Database/schema: none.
- Config/env vars: none.
- Tests: Jest gallery tests and Vitest page/gallery tests.
- Docs: workflow artifacts.

## 12. Dependency And Integration Map
- Internal dependencies: Express route -> controller -> service JSON; React UI -> TanStack hooks -> gallery service -> shared API client.
- External packages/services: Pexels image URLs only; no new package.
- Integration points: Vite env `VITE_API_URL` base URL, Express `/api/gallery` mount.
- Ordering constraints: data first, backend endpoints/tests, frontend service/hooks, UI, tests.
- Migration/setup requirements: none.

## 13. Data And State Impact
- Data models: static service JSON with service metadata, image arrays, review arrays.
- Database changes: none.
- State management changes: TanStack Query keys include service/limit.
- Cache/session/local storage impact: none.
- Backward compatibility impact: flat gallery response remains under `galleryItems`.

## 14. UX / API / Workflow Expectations
- UX expectations: service intro/reviews only on selected service gallery; accessible gallery buttons and cards.
- API contract expectations: preview endpoint omits large nested arrays; selected gallery includes metadata/reviews.
- CLI/workflow behavior: tests/lint/build pass.
- Error handling expectations: loading/error/empty states remain.
- Empty/loading/success/failure states: covered in components/tests.

## 15. Execution Strategy
- Recommended implementation approach: TDD endpoint tests, controller/data update, frontend hook tests, UI update, regression verification.
- Suggested sequencing: backend first, frontend service/hooks second, UI third, final verification.
- Safe rollout/migration approach: preserve `/api/gallery` response key and modal behavior.
- Files to inspect before editing: gallery controller/routes/tests, Gallery page, gallery service/hook, homepage cards.
- Decisions to avoid until more evidence exists: database persistence and admin editing.

## 16. Verification Strategy
- Required automated checks: targeted Jest, full Jest, targeted Vitest, full Vitest, frontend lint, frontend build.
- Required manual checks: code-surface review for selected service rendering and routing.
- Test types needed: API contract tests and UI integration tests.
- Build/lint/typecheck expectations: lint and build pass.
- Acceptance evidence required: test outputs and final diff audit.
- Proof of completion: committed changes and PR record.

## 17. Acceptance Criteria
- [x] `server/data/services.json` exists with eight required services.
- [x] Each service has required metadata, 10 images, and 3 reviews.
- [x] `GET /api/gallery/services` returns service previews.
- [x] `GET /api/gallery` returns all service images.
- [x] `GET /api/gallery?service=knotless-braids` returns selected service images, metadata, and reviews.
- [x] Frontend gallery query uses `service` param and no client style filtering.
- [x] Selected service intro/reviews render only for selected service.
- [x] Preview cards route to `/gallery?service=<id>` and use preview images.
- [x] Modal behavior remains preserved.

## 18. Edge Cases And Failure Modes
- Edge cases: unknown service, invalid limit, empty services, missing preview image.
- Failure modes: API unavailable, stale frontend mocks, bad service id.
- Regression risks: legacy tests expecting `style` query; modal focus behavior.
- Recovery expectations: retry button where available and fallback all-gallery response for unknown service.

## 19. Risks And Mitigations
- Technical risks: hardcoded sample Pexels ids may not be ideal production content; acceptable for sample data.
- Product/UX risks: services page category grouping changed to backend-driven single service section; accepted for data-driven service source.
- Security risks: none introduced.
- Scope risks: booking validation for all new services deferred.
- Mitigation plan: tests cover current requested surfaces and document follow-ups.

## 20. Assumptions
- Explicit assumptions: sample Pexels URLs are enough; unknown service can fall back to all images.
- Confidence level: high for implementation, medium for product details.
- What to revisit if assumptions are wrong: endpoint error contract and service categories.

## 21. Open Questions
- Blocking questions: none for implementation.
- Non-blocking questions: legacy style redirect and booking service ids.
- Execution impact: future cleanup only.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: backend service data/API; frontend query/UI; verification/artifacts.
- Suggested first task: Add service JSON and API tests.
- Suggested task ordering: backend -> frontend hooks -> UI/tests -> final audit.
- Areas that should not become separate tasks: visual redesign beyond requested behavior.
- How the 3-pass Build -> Refine -> Polish loop should apply: each task records Red/Green/Refactor evidence and final verification.
