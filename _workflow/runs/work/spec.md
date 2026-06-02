# Detailed Spec: KareBraids Homepage and Gallery Architecture Redesign

## 1. Metadata
- Date: 2026-06-01
- Request ID: `homepage-gallery-service-detail-redesign`
- Source: direct prompt normalized into `_workflow/runs/work/request.md`
- Execution mode: `complete-workflow`
- Classification: frontend redesign plus additive public API
- Risk: medium

## 2. Original Request
- Preserve Hero exactly and redesign everything below it into a conversion-focused service-business homepage.
- Add API-backed gallery browsing, filtered gallery URLs, reusable style detail architecture, reviews display architecture, and booking preselection.

## 3. Questions And Answers
- Confirmed API as source of truth for both gallery surfaces.
- Confirmed preview override to exactly four items via `GET /api/gallery?limit=4`.
- Confirmed full gallery query, known client-side style filtering, safe invalid-filter fallback, URL-only images, canonical `/services/:slug`, valid `/styles/:slug` redirects, invalid-slug listing fallback, booking preselection, and invalid API limit fallback.
- Remaining questions: none.

## 4. Problem Definition
The current homepage funnel, gallery ownership, service education architecture, and style-specific booking route do not meet the requested professional conversion journey.

## 5. Current State Analysis
- React/Vite UI with existing token-driven dark-luxury CSS, React Router, axios client, and TanStack Query provider.
- Express backend has no gallery route.
- Gallery page and homepage gallery preview currently render frontend constants directly.
- Booking wizard starts from service selection without URL preselection.

## 6. Desired End State
- Keep Hero unchanged.
- Render Browse By Style, Featured Services + Pricing, Client Gallery, Testimonials, Why Choose, How Booking Works, Booking CTA, then Layout-owned Footer.
- Load gallery UI from backend-owned static metadata.
- Support reusable service education pages and preselected booking.

## 7. Scope
- In scope: public gallery API, query hook/service, gallery migration and filtering, six style records, homepage sections, carousel, service details, reusable reviews, redirects, booking preselection, responsive/accessibility styles, tests.
- Out of scope: Hero edits, Mongo gallery persistence, CMS/admin uploads, review submission API, backend style API, auth/deployment changes, binaries, unrelated refactors.

## 8. Users And Use Cases
Prospective and returning Birmingham KareBraids clients browse style examples, compare visible starting prices, review service details, read trust proof, and begin a preselected appointment request.

## 9. Functional Requirements
- `GET /api/gallery` returns all metadata.
- Valid positive integer `limit` slices; invalid/missing limit returns all with HTTP 200.
- `/gallery` loads all; known `style` filters client-side; invalid filters show all.
- Homepage preview loads exactly four.
- Detail pages include hero, gallery, price, duration, hair included, description, suitable-for, care tips, reviews, and CTA.
- Carousel supports autoplay, previous/next, dots, pause on hover/focus, swipe, smooth transitions, and cleanup.

## 10. Non-Functional Requirements
Mobile-first, accessible, responsive, reusable, data-driven, CMS-ready, safe public metadata only, no new dependencies, and scoped token reuse.

## 11. Affected Surfaces
- Backend gallery constants/controller/router/app/tests.
- Frontend API service/query hook, Router, Gallery, Booking, Home, home sections, service detail, reviews, shared config, CSS, and Vitest tests.
- Workflow artifacts and polish UI evidence.

## 12. Dependency And Integration Map
Express route -> controller -> backend static metadata. Axios service -> TanStack query hook -> Gallery and GalleryFeature. Shared style config -> Browse cards, Featured cards, ServiceDetail, redirects, and Booking query mapping.

## 13. Data And State Impact
- No database changes.
- Backend static public gallery records include id, title, description, image, source, style, and aspect.
- TanStack Query stores gallery server state. Carousel and modal remain local state.

## 14. UX / API / Workflow Expectations
- Preserve warm dark-luxury brand system.
- Distinguish category exploration from service learning.
- Show API loading, empty, and failure states.
- Keep invalid URLs safe without error pages.

## 15. Execution Strategy
1. Add tested gallery API.
2. Add gallery service/hook and migrate both gallery surfaces.
3. Add shared service pages, redirects, reusable reviews, and booking preselection.
4. Recompose and polish homepage below unchanged Hero.

## 16. Verification Strategy
Run targeted Jest/Vitest Red/Green loops, full server Jest, full client Vitest, client lint, client build, HTTP smoke, `git diff --check`, Hero diff audit, tool scan for screenshot feasibility, and final diff/status audit.

## 17. Acceptance Criteria
- [x] Hero unchanged.
- [x] Confirmed homepage order and requested cards/sections delivered.
- [x] API owns approximately 20 remote gallery items and confirmed limit behavior.
- [x] Both gallery UI surfaces consume `useGalleryItems`; preview renders four.
- [x] Known filters narrow results; invalid filters show all.
- [x] Carousel renders eight five-star records and required interactions.
- [x] Six canonical detail pages, valid compatibility redirects, invalid-slug fallback, reviews, and booking preselection delivered.
- [x] Verification suite passes.

## 18. Edge Cases And Failure Modes
Handled malformed limits, API loading/error/empty responses, invalid gallery filters, invalid detail slugs, invalid booking style queries, timer cleanup, touch threshold, focus pause, and modal focus return.

## 19. Risks And Mitigations
- Existing gallery imports and CSS could regress. Mitigation: narrow migration, scoped styles, regression suite, locked-Hero diff, and code-surface review.
- Scope could expand. Mitigation: no persistence, packages, or unrelated rewrites.

## 20. Assumptions
- Existing remote placeholder URL approach is acceptable.
- Existing Phosphor dependency is preferred.
- Footer remains Layout-owned.
- Invalid booking style safely leaves the initial service-selection step unchanged.

## 21. Open Questions
None.

## 22. Task Extraction Notes
Four vertical tasks: backend API; API-backed gallery consumers; detail/redirect/preselection architecture; homepage funnel and polish. Every task uses Build -> Refine -> Polish with Red -> Green -> Refactor evidence.

## Frontend Taste Application
Applied skill: design-taste-frontend
