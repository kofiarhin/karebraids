# KareBraids Pre-Launch Content and Commerce-Readiness Spec

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-12
- Request ID / slug: `prelaunch-content-commerce-readiness`
- Request source: Direct user prompts on 2026-06-12
- Execution mode: `complete-workflow`
- Request classification: Full-stack data consistency, frontend content, asset audit, and architecture preparation
- Scope level: Medium; canonical service data, shared frontend formatting, gallery behavior, About page content, tests, and a dormant product-domain scaffold
- Risk level: Medium because seeded MongoDB service records and public service/gallery surfaces must remain backward compatible

## 2. Original Request
- Raw user request: Implement client-requested pre-launch updates for style starting prices, correct style gallery imagery, Karen’s About Me photo and personal statement, and clean future ecommerce preparation without building ecommerce.
- Normalized request: Centralize price ownership and formatting, audit image mappings without inventing semantic certainty, add configurable Karen profile content with marked placeholders, and introduce a non-routed/non-rendered product catalogue shape for extensions and hair products.
- Source prompt / request reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: Whether client-approved final prices, Karen photo/statement, and labeled style imagery were available.
- Answers received: Proceed using the repository as source of truth; retain current prices; preserve uncertain mappings; use placeholders/TODOs; do not block on missing content.
- Questions skipped: No additional content questions because the user explicitly instructed implementation to continue with safe placeholders.
- Remaining open questions: Which existing photograph is actually Karen; Karen’s approved first-person statement; client-approved replacement price list; authoritative labels tying each photograph to a hairstyle.

## 4. Problem Definition
- Problem being solved: Pricing is represented with duplicated fields and repeated formatting logic, style imagery has multiple competing data paths and uncertain semantics, About copy does not expose a dedicated personal-statement field or honest Karen-photo placeholder, and there is no explicit product-domain boundary for later commerce.
- Why it matters: Pre-launch content must be consistent and maintainable without presenting fabricated client claims or silently coupling future products to service records.
- Current pain point: `server/data/services.json` duplicates `startingPrice` and `priceFrom`; several React surfaces independently format money; public previews use a representative image library while seed records retain remote per-service galleries; About data derives the founder image from a style image; no dormant product schema/config exists.
- Expected value: One editable service price per seed record, one shared client money formatter, validated image references and accessible style-aware alt text, an honest Karen profile-content seam, and a clean future product catalogue boundary.

## 5. Current State Analysis
- Existing behavior:
  - MongoDB `Service` documents and Express service APIs are the canonical public service source.
  - Seed records contain both `startingPrice` and `priceFrom` with equal values for all 11 services.
  - The serializer already aliases missing `startingPrice`/`priceFrom` values for compatibility.
  - Services, homepage cards, browse-by-style cards, service detail, and booking each render API pricing; formatting logic is repeated in multiple components.
  - The frontend deliberately uses `client/src/data/imageLibrary.js` local imagery as representative styling inspiration; `getDisplayImage(service.id)` picks a stable representative preview.
  - Gallery filtering is contextual, not a claim that representative images belong to the selected service.
  - Seed service records also contain remote `primaryImage` and `images` arrays. Duplicate URLs exist across some records, but the repository provides no authoritative semantic labels proving those cross-service reuses are wrong.
  - All 18 local image files have distinct hashes; 15 are currently curated and 3 are unreferenced.
  - `aboutPageData.js` derives a founder image from style imagery, and `MeetKaren.jsx` hardcodes generic third-person paragraphs.
  - No product model, product data contract, route, or public sales UI exists.
- Existing architecture/components:
  - Backend: `server/data/services.json`, `server/models/Service.js`, seed script, serializers/controllers/routes.
  - Frontend: TanStack Query service hooks, service/gallery pages, booking page, homepage components, shared local image library, About data/components.
- Existing files/modules likely involved:
  - `server/data/services.json`
  - `server/models/Service.js`
  - `server/utils/serviceSerializer.js`
  - `server/scripts/seedServices.js`
  - `client/src/utils/formatPrice.js` or equivalent new shared utility
  - pricing consumers under `client/src/pages/` and `client/src/components/home/`
  - `client/src/data/imageLibrary.js`, `client/src/utils/servicePreview.js`, gallery/modal components and tests
  - `client/src/data/aboutPageData.js`, `client/src/components/about/MeetKaren.jsx`, `client/src/pages/About.test.jsx`
  - a dormant product domain file under `server/constants/` or `server/data/`, with tests/documentation
- Existing data flow: JSON service seed -> Mongoose Service -> Express serializer/API -> TanStack Query hooks -> React public surfaces.
- Existing API/UI/CLI/workflow behavior: Public service/gallery API behavior and existing routes must remain stable; seed command upserts by service ID.
- Existing tests or verification coverage: Jest backend model/seed/API tests and Vitest frontend data/page/component tests; client lint/build scripts are available.

## 6. Desired End State
- Expected final behavior:
  - Each service’s editable seed price is declared once, while API compatibility can continue returning both aliases.
  - Every relevant UI surface uses one shared price resolution/formatting utility.
  - Image references are programmatically valid, local files exist, duplicate IDs are rejected, selected-style context remains accurate, and user-facing style previews have meaningful alt text based on the style name without falsely claiming representative images are client work.
  - About displays a configurable Karen profile image and configurable personal statement; unavailable final content is clearly marked in source with launch TODOs and honest placeholder copy.
  - Future product categories/types for hair extensions and hair-care products exist in an internal, tested domain scaffold but are not routed, fetched, or rendered publicly.
- User-facing outcome: Consistent prices, accessible style imagery, and a more personal mobile-friendly About section, with no unfinished shop experience.
- Developer-facing outcome: Clear single update points for prices, Karen content, representative images, and future product catalogue definitions.
- System/workflow outcome: Existing API and booking behavior remains compatible.
- Backward compatibility expectations: API consumers may continue receiving both `startingPrice` and `priceFrom`; existing routes and query-string gallery navigation remain unchanged.

## 7. Scope
- In scope:
  - Remove duplicate editable price declarations from canonical seed records where serializer/model compatibility permits.
  - Add shared frontend price formatting/resolution and migrate all public price renderers.
  - Add tests proving consistency and compatibility.
  - Audit local paths, remote URL shape/reachability where environment permits, duplicate IDs/URLs, alt text, and selected-style behavior.
  - Fix objective asset/path/alt/mapping defects only.
  - Add centralized Karen profile content with explicit TODO markers and render it in Meet Karen.
  - Add internal product type/category/status constants and empty catalogue placeholder for hair extensions and hair oils/products.
  - Document unresolved content uncertainties.
- Out of scope:
  - New client-approved prices, real Karen photography, or final personal statement not present in the repository.
  - Checkout, cart, payments, shipping, tax, inventory, variants, orders, product admin, product API, public shop route, or coming-soon sales UI.
  - Replacing all representative stock images or claiming they depict specific completed services.
  - Unrelated visual redesign, backend refactor, authentication work, or new styling system.
- Non-goals: Semantic classification of unlabeled photos by visual guesswork.
- Explicit boundaries: No public ecommerce exposure and no destructive removal of uncertain existing assets.

## 8. Users And Use Cases
- Primary users: Prospective KareBraids clients comparing styles and learning about Karen.
- Secondary users: Karen/site maintainers updating prices, profile content, images, and future product definitions.
- Main use cases: Browse consistent starting prices; view style-related/representative imagery; read Karen’s statement; safely update content from centralized files.
- Edge use cases: API record includes only one legacy price alias; missing Karen image; missing gallery image; unavailable service; empty product catalogue.

## 9. Functional Requirements
- Required behaviors:
  - Resolve price from canonical `startingPrice` with `priceFrom` fallback for backward compatibility.
  - Format GBP consistently with no fabricated zero-price display when data is absent.
  - Keep all current numeric prices unchanged.
  - Preserve representative-gallery disclosure and selected-service context.
  - Generate meaningful alt text containing the style name on style-specific cards/previews.
  - Render Karen profile image config and statement config from About data.
  - Keep product catalogue unavailable/non-rendered by default.
- Inputs: Service API records, local representative image config, About profile config, dormant product constants.
- Outputs: Consistent UI labels, accessible images, About profile content, tested internal product-domain structure.
- State changes: Seeded service documents may drop redundant persisted `priceFrom` on reseed while serializer continues emitting compatibility aliases.
- Error states: Missing price yields a neutral unavailable label or omitted price rather than `£0`; missing image uses the existing fallback; missing product data exposes nothing publicly.
- Permissions/auth expectations: Not applicable; no new admin or product endpoint.

## 10. Non-Functional Requirements
- Performance expectations: No new network requests or material bundle overhead; local About placeholder image should use an existing optimized asset.
- Reliability expectations: Deterministic image fallback and price formatting; tests cover aliases and missing values.
- Security/privacy expectations: No secrets, payments, personal contact details, or fabricated owner claims.
- Accessibility expectations: Descriptive alt text, semantic heading/blockquote structure where appropriate, readable contrast, and responsive image/copy layout.
- Maintainability expectations: Centralized content/config, no repeated `Intl.NumberFormat` instances in components, explicit ecommerce boundary.
- DX expectations: TODOs explain exactly which pre-launch client content must be replaced.

## 11. Affected Surfaces
- Files likely affected: service seed JSON/model/serializer tests, frontend pricing utility and consumers/tests, image utilities/tests, About data/component/tests, dormant product data/constants/tests, workflow artifacts.
- Directories likely affected: `server/data`, `server/constants`, `server/tests`, `client/src/data`, `client/src/utils`, `client/src/components`, `client/src/pages`.
- UI surfaces: Home featured services, browse-by-style, Services, Service Detail, Booking, Gallery cards/modal, About Meet Karen.
- API routes: No route additions; existing service responses remain compatible.
- Components: Pricing consumers, `MeetKaren`, potentially gallery modal/card alt handling.
- Services: Existing service query layer only; no new API calls.
- Database/schema: No required migration; optional redundant alias removal is handled by seed upsert/serializer compatibility.
- Config/env vars: None.
- Tests: Vitest and Jest additions/updates.
- Docs: Workflow artifacts and release notes; durable architecture docs only if a lasting product-domain boundary is added.
- Workflow artifacts: Active run files and Fallow audit.

## 12. Dependency And Integration Map
- Internal dependencies: Seed JSON -> Mongoose -> serializer -> API -> TanStack Query -> UI; image library -> preview/gallery/About; About data -> About components.
- External packages/services: Existing React/Vite/Tailwind, Express/Mongoose, Pexels-hosted seed URLs; no new dependencies.
- Integration points: Service serializer compatibility aliases, booking/service cards, gallery query selection.
- Ordering constraints: Price tests/config first; image audit/tests next; About content tests/UI next; product scaffold last; full verification afterward.
- Migration/setup requirements: Existing `npm run seed:services` updates database records when run with `MONGODB_URI`; no migration required for code verification.

## 13. Data And State Impact
- Data models: Service continues to support both price aliases for compatibility, with one canonical editable seed field. Product scaffold defines future domain vocabulary only.
- Database changes: Reseeding may normalize price storage; no destructive migration or live database access in this environment.
- State management changes: None.
- Cache/session/local storage impact: None.
- Backward compatibility impact: Existing response fields and routes retained.

## 14. UX / API / Workflow Expectations
- UX expectations: Existing design language and Tailwind About styling retained; Karen statement receives clear visual hierarchy without a redesign.
- API contract expectations: Existing service payload price fields remain available and equivalent.
- CLI/workflow behavior: Seed validation continues to pass; no new product command.
- Error handling expectations: Missing price/image content degrades safely.
- Empty/loading/success/failure states: Existing service/gallery states remain; dormant empty product catalogue has no public state.
- Applied skill: design-taste-frontend

## 15. Execution Strategy
- Recommended implementation approach:
  1. Write failing backend/frontend tests for canonical price ownership and shared formatting, then make seed/UI changes.
  2. Add asset/mapping invariants and style-aware alt helpers; repair only objectively proven defects.
  3. Add a `karenProfile` content object with explicit TODO markers, use a clearly described representative placeholder image, and render statement content in `MeetKaren`.
  4. Add a small frozen/validated product-domain constants module and empty catalogue placeholder with no imports from public routes/components.
  5. Run focused tests after each Red/Green/Refactor pass, then full tests/lint/build and UI review.
- Suggested sequencing: Pricing -> imagery -> About -> commerce scaffold -> final verification/review/Fallow.
- Safe rollout/migration approach: Preserve API aliases and routes; avoid database migration; document reseed requirement.
- Files to inspect before editing: Current tests for service serialization/seeding, gallery pages/modal, About tests, package scripts, Fallow instructions.
- Decisions to avoid until more evidence exists: Assigning stock images to exact hairstyles, asserting an image depicts Karen, writing a first-person biography as approved client copy, adding product endpoints.

## 16. Verification Strategy
- Required automated checks:
  - Focused Jest seed/model/serializer/API tests.
  - Focused Vitest pricing, image-library/gallery, About, booking/service surface tests.
  - Root `npm test`.
  - `npm test --prefix client`.
  - `npm run lint --prefix client`.
  - `npm run build --prefix client`.
  - Scripted local-image existence/hash and service price/image invariant audit.
- Required manual checks: Review generated pages at mobile and desktop widths; verify no public product UI/route; inspect style card/gallery/modal alt text and pricing.
- Test types needed: Unit, component, API regression, data invariants.
- Build/lint/typecheck expectations: Client lint and build pass; no separate TypeScript command exists.
- Acceptance evidence required: Red/Green/Refactor logs in all three iterations per task, screenshots for perceptible web changes if browser automation is available, diff audit, Fallow JSON audit.
- Proof of completion: All acceptance criteria checked, no broken local paths, unchanged price values, passing relevant checks, documented remote/semantic uncertainties.

## 17. Acceptance Criteria
- [x] Every current service retains its existing numeric starting price, with one canonical editable seed price and backward-compatible API aliases.
- [x] All public price renderers use one shared formatter/resolver and display consistent values without defaulting missing data to `£0`.
- [x] Local image paths resolve; image IDs are unique; objective duplicate/mapping defects are fixed; unresolved semantic and remote-host uncertainties are documented.
- [x] Style-specific cards/previews/modal content use meaningful alt text including the selected/service style name while representative imagery remains disclosed honestly.
- [x] About Me reads Karen profile image and personal statement from centralized config, visibly renders both, remains responsive, and contains explicit pre-launch TODOs for replacement content.
- [x] A tested internal product-domain scaffold supports future `hair-extension` and `hair-product` categories (including oils) without adding public UI, API routes, checkout, cart, payments, inventory, or admin management.
- [x] Existing public routes, service/gallery queries, booking preselection, tests, lint, and build remain functional or any baseline/environment limitation is documented.
- [x] Final review, Fallow audit, release notes, summary, handoff, health check, commit, and PR are complete.

## 18. Edge Cases And Failure Modes
- Edge cases: Zero is a legitimate numeric value but should not be invented; service with only `priceFrom`; unknown currency; service ID with no dedicated representative image; Karen image unavailable; product catalogue intentionally empty.
- Failure modes: Removing an alias breaks tests/consumers; alt helper falsely describes stock imagery as completed client work; remote Pexels URL unavailable; TODO placeholder accidentally appears as fake personal quotation; dormant product module gets imported into UI.
- Regression risks: Booking labels, accessibility queries, snapshot/text tests, seed validation, gallery modal navigation.
- Recovery expectations: Restore compatibility alias at serializer boundary, retain fallback image, and mark uncertain records rather than deleting them.

## 19. Risks And Mitigations
- Technical risks: Live MongoDB may retain old duplicated fields until reseeded. Mitigation: serializer normalizes both and release notes include reseed guidance.
- Product/UX risks: Placeholder profile content may be mistaken for final. Mitigation: neutral non-first-person copy plus prominent source TODOs and documentation.
- Security risks: Premature commerce could imply payments or collect sensitive data. Mitigation: no route, controller, database model, forms, or UI.
- Scope risks: Image “correction” can become subjective redesign. Mitigation: fix only broken paths, duplicate IDs, invalid URLs, accessibility defects, and mappings supported by repository evidence.
- Mitigation plan: TDD-first, narrow files, compatibility tests, diff audit, explicit uncertainty log.

## 20. Assumptions
- Explicit assumptions:
  - Current 11 service prices are the latest available values.
  - Existing local images are licensed/approved for continued representative use.
  - No available asset is verified as Karen’s portrait.
  - Existing per-service remote image labels are provisional and cannot be semantically verified from filenames/data alone.
  - Future products need category/domain preparation only.
- Confidence level: High for architecture/data-flow findings; low for real-world image identity and final client content.
- What to revisit if assumptions are wrong: Replace values in canonical service seed data, replace `karenProfile` image/statement, and update explicit service image maps with client-labeled assets.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Final approved prices, verified Karen portrait, approved personal statement, client-labeled hairstyle photography, desired future commerce provider.
- Execution impact: Placeholders and compatibility structures are implemented now; final content can be swapped centrally later.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - TASK-001: Canonicalize service pricing end-to-end and migrate every price renderer.
  - TASK-002: Validate and harden service/gallery image mapping and accessible style context.
  - TASK-003: Add configurable Karen profile photo and personal statement to About Me.
  - TASK-004: Add a dormant future-product domain scaffold without public exposure.
  - TASK-005: Complete integrated verification, UI review, Fallow, and release artifacts.
- Suggested first task: Canonicalize service price ownership because it affects data, API compatibility, and multiple UI surfaces.
- Suggested task ordering: Pricing before imagery; imagery before About because About consumes image config; product scaffold after user-facing work.
- Areas that should not become separate tasks: Unrelated design polishing, replacing stock imagery, product UI/API, database migration.
- How the 3-pass Build -> Refine -> Polish loop should apply: Each task uses TDD-first Red -> Green -> Refactor in Build, repeats targeted regression/edge-case hardening in Refine, and completes accessibility/maintainability/final focused verification in Polish.
