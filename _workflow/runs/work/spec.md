# Representative Local Image Library Refactor

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-08
- Request ID / slug: `representative-local-image-library`
- Request source: Direct user prompt; normalized in `_workflow/runs/work/request.md`
- Execution mode: `complete-workflow`
- Request classification: Frontend data architecture, semantic UI copy, compatibility refactor, tests
- Scope level: Medium, cross-cutting frontend
- Risk level: Medium

## 2. Original Request
- Raw user request: Refactor image handling so existing curated local images form one central representative visual library while services remain independently categorized business data. Remove remote frontend Pexels URLs and service-specific image claims; preserve gallery, service, booking, and API compatibility behavior.
- Normalized request: Centralize all curated frontend image paths and metadata in `client/src/data/imageLibrary.js`, deterministically derive representative service display images, decouple gallery items from service classification, update semantic copy/alt text/captions, and preserve current application UX and backend response compatibility.
- Source prompt / request reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: None. Repository inspection answered implementation-state questions and the user supplied explicit behavior, copy, boundaries, and verification commands.
- Answers received: Not applicable.
- Questions skipped: No unnecessary questions were asked because the request is implementation-ready.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: Curated marketing images are duplicated across frontend modules, use remote Pexels URLs, and are treated as if they prove exact service/hairstyle classifications.
- Why it matters: Business service data and representative visual assets need separate authority so copy remains truthful and future real client photos can be attached without another architectural rewrite.
- Current pain point: `client/src/data/services.js` owns service-specific `galleryImages`; `servicePreview.js`, pages, and homepage constants read remote or service-owned images; some UI text and alt text imply exact service examples.
- Expected value: One maintainable local asset library, truthful representative semantics, deterministic display images, preserved service taxonomy and UX, and a clean future path for genuine service/client media.

## 5. Current State Analysis
- Existing behavior: Services and gallery can be loaded through API/query hooks, while legacy local service helpers and several UI surfaces still encode image assumptions and remote fallbacks.
- Existing architecture/components: React/Vite client with TanStack Query for server state; Express/Mongoose backend with service/gallery compatibility fields.
- Existing files/modules likely involved: `client/src/data/imageLibrary.js`, `client/src/data/services.js`, `client/src/utils/servicePreview.js`, Gallery/Services/ServiceDetail pages, homepage service/gallery components/constants, related styles/constants, and new or updated Vitest files.
- Existing data flow: API service objects may include primary/gallery image data; components call `getServicePreviewImage` or render gallery query items; local service helpers currently flatten service-owned galleries.
- Existing API/UI/CLI/workflow behavior: Gallery has filtering, masonry, and modal behavior; services expose category/price/duration/booking navigation; backend API responses include image compatibility data.
- Existing tests or verification coverage: Client has broad page/query tests from the prior backend-driven data migration but lacks focused tests for the new representative image library contract; server Jest coverage exists for service/gallery endpoints and models.

## 6. Desired End State
- Expected final behavior: All curated frontend visuals resolve from existing `/images/<filename>` paths declared only in `imageLibrary.js`; services remain categorized business records; selected gallery service filters provide context without image classification.
- User-facing outcome: Gallery and service imagery is labeled as representative inspiration, with required disclaimer copy and generic alt text/titles; categories, pricing, duration, booking, masonry, and modal UX remain intact.
- Developer-facing outcome: A single deterministic image API (`getDisplayImage`, `getGalleryImageItems`) feeds compatibility and display helpers; no frontend remote Pexels URL or `service.galleryImages` authority remains.
- System/workflow outcome: Current API compatibility remains available; future real client photos can later be attached to services through a separate explicit media source.
- Backward compatibility expectations: Preserve API response shapes, routes, booking links, query-string service context, and compatibility `image`/`previewImage` frontend fields.

## 7. Scope
- In scope:
  - Replace `imageLibrary` entries with real filenames from `client/public/images/` and required representative metadata.
  - Refactor local services to contain only required business fields as canonical records, with derived compatibility image fields and `isRepresentativeImage: true`.
  - Route local gallery helpers through `getGalleryImageItems()` and make service selection contextual only.
  - Refactor `servicePreview.js` to use `getDisplayImage(service.id)` and ignore service galleries/API image classification for current curated rendering.
  - Update affected UI copy, captions, titles, and alt text.
  - Remove/replace every frontend `https://images.pexels.com/...` occurrence.
  - Add focused Vitest coverage before implementation and preserve existing tests.
  - Inspect backend files and avoid changes unless compatibility tests show a necessity.
- Out of scope:
  - Site redesign or layout replacement.
  - Booking logic removal or service taxonomy changes.
  - Redux introduction or API logic in React components.
  - Moving/renaming local image files.
  - Converting current backend fields into a real client-photo system.
- Non-goals: Proving that any curated image depicts a named service; changing prices/durations; changing API contracts.
- Explicit boundaries: Curated images are representative marketing assets only.

## 8. Users And Use Cases
- Primary users: Prospective KareBraids clients browsing services and visual inspiration.
- Secondary users: Maintainers updating curated visuals or later integrating real client photos.
- Main use cases: Browse service categories and details; inspect representative gallery imagery; filter gallery context by a considered service; continue to booking.
- Edge use cases: Unknown service filter, empty API gallery payload, missing service id, deterministic fallback image, image metadata used by modal/card views.

## 9. Functional Requirements
- Required behaviors:
  - `imageLibrary.js` exports all four required symbols.
  - Each image object has exactly the required semantic fields at minimum and `usage: "representative"`.
  - All `src` values are local `/images/...` paths matching existing public files.
  - `getDisplayImage(seed)` deterministically returns an image object and handles empty/unknown seeds.
  - `getGalleryImageItems()` returns representative items without hairstyle/service classification.
  - Service compatibility `image` and `previewImage` values come from `getDisplayImage(service.id)` and expose `isRepresentativeImage: true`.
  - `getGalleryItems()` returns `getGalleryImageItems()`.
  - `getGalleryItemsByServiceId("all")` returns all items; specific ids return representative items with, at most, optional non-classifying UI context.
  - `getServicePreviewImage` uses `getDisplayImage(service.id)` and never reads `service.galleryImages`.
  - Required UI copy replacements and disclaimer appear in relevant gallery/service surfaces.
- Inputs: Service ids/slugs, API service objects, gallery filter query string.
- Outputs: Local representative image paths/objects and truthful UI labels.
- State changes: No new global state; existing query/filter/modal state remains.
- Error states: Existing loading/error/empty states remain functional and do not revert to remote URLs or exact-service claims.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: Static public assets; no new network image hosts or runtime image imports.
- Reliability expectations: Deterministic fallback for all service ids and safe handling of missing ids.
- Security/privacy expectations: No secrets or client-identifying claims; no remote image tracking dependency.
- Accessibility expectations: Generic accurate alt text such as “Representative protective styling image”; modal/card labels remain meaningful; decorative images remain decorative where already intentional.
- Maintainability expectations: Curated paths exist only in `imageLibrary.js`; no duplicated image arrays in constants/components.
- DX expectations: Small pure helper APIs with focused unit tests.

## 11. Affected Surfaces
- Files likely affected:
  - `client/src/data/imageLibrary.js`
  - `client/src/data/services.js`
  - `client/src/utils/servicePreview.js`
  - `client/src/pages/Gallery.jsx`
  - `client/src/pages/Services.jsx`
  - `client/src/pages/ServiceDetail.jsx`
  - `client/src/components/home/FeaturedServices.jsx`
  - `client/src/components/home/GalleryFeature.jsx`
  - `client/src/components/home/BrowseByStyle.jsx` if required by the no-exact-service-alt rule
  - `client/src/constants/styles.js`
  - `client/src/constants/homepage.js`
  - Focused/new client test files
- Directories likely affected: `client/src/data`, `client/src/utils`, `client/src/pages`, `client/src/components/home`, `client/src/constants`
- UI surfaces: Gallery heading/disclaimer/filter context/cards/modal; service cards/detail gallery; homepage gallery and service cards.
- API routes: No intended changes.
- Components: Existing components only; no redesign.
- Services: Existing query/API layer stays outside components.
- Database/schema: No intended changes.
- Config/env vars: None.
- Tests: Vitest tests for data helpers, preview helper, and copy/semantic regressions; existing Jest suites.
- Docs: Run-scoped workflow artifacts and Fallow audit.
- Workflow artifacts: request, spec, tasks after approval, progress, handoff, activity, checkpoints, review, verification, Fallow audit, release notes, summary, Project Brain.

## 12. Dependency And Integration Map
- Internal dependencies: Service pages/components depend on query hooks and `getServicePreviewImage`; local service helpers depend on the new image library; Gallery depends on gallery query shape and UI filter context.
- External packages/services: React, React Router, TanStack Query, Vitest; no new packages.
- Integration points: Existing API service/gallery responses, public asset serving from Vite, gallery modal/filter components.
- Ordering constraints: Establish/test image library contract first; update service/preview adapters second; update UI semantics third; run full verification last.
- Migration/setup requirements: None; local files already exist.

## 13. Data And State Impact
- Data models: Frontend curated image object contract becomes independent from service records.
- Database changes: None expected.
- State management changes: None; filter remains URL/local UI context.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Frontend stops trusting API/local service images for curated display but backend fields remain available for future real-photo work.

## 14. UX / API / Workflow Expectations
- UX expectations: Preserve present layout/masonry/modal/card interactions; replace “Client Gallery” with “Style Inspiration Gallery”; add the exact representative disclaimer; use “Viewing inspiration while considering {service.name}”; replace “Style gallery” with “Style inspiration”; captions say “Representative image.”
- API contract expectations: Do not break or remove existing service/gallery response fields.
- CLI/workflow behavior: Verification through required npm commands plus targeted lint/diff/Fallow checks.
- Error handling expectations: Existing query errors and empty states remain; representative fallback remains local.
- Empty/loading/success/failure states: No redesign; semantic copy should remain truthful in every state.

## 15. Execution Strategy
- Recommended implementation approach:
  1. Write failing data/helper tests that enforce local paths, required fields, deterministic selection, no service classification, and service compatibility derivation.
  2. Replace image library metadata with local assets and refactor local service/gallery/preview adapters.
  3. Write failing UI tests for required headings/disclaimer/filter/caption/alt semantics, then update components/constants without altering layout behavior.
  4. Search the entire frontend for remote Pexels URLs, service gallery reads, and prohibited copy; remove remaining violations.
  5. Run focused tests, full client/server tests, lint/build, diff audit, review, Fallow, and health check.
- Suggested sequencing: Data contract → compatibility helpers → UI semantics → full regression verification.
- Safe rollout/migration approach: Retain backend fields and compatibility frontend aliases while changing only their current source.
- Files to inspect before editing: All listed affected surfaces, existing API/query hooks, relevant tests, public image filenames.
- Decisions to avoid until more evidence exists: Backend schema/controller modifications; replacing gallery query architecture; broad visual styling changes.

## 16. Verification Strategy
- Required automated checks:
  - Targeted Vitest for new data/helper behavior and UI semantics.
  - `npm test`
  - `npm run test --prefix client`
  - `npm run build --prefix client`
  - Changed-file or full client lint where available.
  - `rg` checks proving no frontend remote Pexels URLs, prohibited copy, or `service.galleryImages` reads remain.
- Required manual checks: Code-surface review of gallery masonry/modal/filter preservation, service business details/booking links, and generic image claims. Screenshot only if browser automation is available because the visible change is primarily copy/assets rather than redesign.
- Test types needed: Pure unit tests for image/service helpers; component/page tests for user-visible copy and representative semantics; existing integration/regression suites.
- Build/lint/typecheck expectations: Vite build passes; lint introduces no new errors.
- Acceptance evidence required: Test commands/results, searches, diff audit, review notes, Fallow audit.
- Proof of completion: All acceptance criteria checked and no remaining frontend remote Pexels image URL or exact-service curated-image claim.

## 17. Acceptance Criteria
- [ ] The app builds successfully with `npm run build --prefix client`.
- [ ] `npm test` and `npm run test --prefix client` pass, or any verified pre-existing/environment limitation is isolated and documented according to workflow rules.
- [ ] All curated image paths are declared in `client/src/data/imageLibrary.js`, use `/images/<real-filename>`, and resolve to files already in `client/public/images/`.
- [ ] Every curated image object includes `id`, `src`, `alt`, `title`, `description`, `aspect`, and `usage: "representative"`.
- [ ] No frontend `https://images.pexels.com/...` URL remains.
- [ ] Services retain categories, prices, durations, featured/booking/gallery/status business fields and booking links while curated image authority is removed.
- [ ] Compatibility `image` and `previewImage` derive from `getDisplayImage(service.id)` and expose `isRepresentativeImage: true`.
- [ ] No frontend display helper reads `service.galleryImages` as curated image truth.
- [ ] Gallery masonry/modal UX remains functional, and service filtering remains UI context without classifying images.
- [ ] Required gallery/service copy, disclaimer, “Representative image” captions, and generic alt text are present; prohibited exact-service titles/claims are absent.
- [ ] Backend API responses remain compatible; backend files are changed only if required by verified tests.
- [ ] Architecture permits future real client photos to be attached separately without rewriting the representative library.

## 18. Edge Cases And Failure Modes
- Edge cases: Empty seed, unknown service, API object with stale remote image fields, specific/unknown/`all` gallery filter, fewer/more local images than services, modal item metadata compatibility.
- Failure modes: Broken public filename, components still preferring API image fields, duplicated paths outside the library, service filter copy implying classification, tests asserting old exact-service alt text.
- Regression risks: Booking cards or homepage cards lose images; gallery item shape breaks modal/masonry; ServiceDetail expects gallery arrays; server tests encode image URL validation.
- Recovery expectations: Fix only scoped adapters/components, preserve response aliases, and rerun the exact failing command.

## 19. Risks And Mitigations
- Technical risks: Existing API-driven gallery may bypass local library. Mitigation: make the current frontend display adapter/library authoritative and test behavior against API objects containing remote/service-specific fields.
- Product/UX risks: Generic semantics could remove useful service context. Mitigation: preserve service names in surrounding business UI and use the exact “considering” filter phrase, never on image classification metadata.
- Security risks: Low; local assets reduce third-party requests.
- Scope risks: Backend/media redesign or visual redesign. Mitigation: inspect-only backend default and explicit no-redesign boundary.
- Mitigation plan: TDD-first helper tests, targeted component tests, repository-wide searches, full regression commands, diff review.

## 20. Assumptions
- Explicit assumptions:
  - All 15 current files directly under `client/public/images/` are approved curated representative visuals.
  - Existing backend image fields may remain unchanged and may contain seeded remote values because current frontend rendering will not depend on them.
  - `SERVICE_IMAGE_FALLBACK` remains a string path for compatibility, while `getDisplayImage` returns the full image object.
  - Specific gallery service filters may return the full representative set with optional context metadata, but no service/category classification fields attached to the images.
- Confidence level: High.
- What to revisit if assumptions are wrong: Approved image subset, fallback type expected by callers, or backend tests requiring local-path schema changes.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Exact local filename-to-title pairing can be selected during implementation as long as titles remain generic and truthful.
- Execution impact: None before planning.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - Establish the local representative image library and local service/gallery compatibility contract.
  - Make preview/render adapters ignore service-owned image authority.
  - Correct Gallery/Home/Service UI semantics while preserving interactions.
  - Perform repository-wide regression cleanup and final verification.
- Suggested first task: Add failing tests for the image library and service compatibility helpers, then implement the local deterministic library.
- Suggested task ordering: Data/helper contract first, render adapters second, UI copy/semantics third, verification/docs last.
- Areas that should not become separate tasks: Backend changes without a failing compatibility test; broad styling redesign; unrelated lint cleanup.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each code task starts with failing focused tests, reaches the smallest passing implementation, then refactors and hardens searches/edge cases before final review.

## 23. Frontend Taste Application
- Applicable.
- Detection result and reason: The request changes JSX-rendered headings, descriptions, captions, and alt text across frontend UI surfaces, although it explicitly forbids redesign.
- Required propagation points: Spec, tasks, implementation evidence, review, verification, release notes, summary, and health check.
- Applied skill: design-taste-frontend
- Taste constraint for this request: Preserve existing visual hierarchy/layout/motion and make only semantically required copy/accessibility/data-source edits.
