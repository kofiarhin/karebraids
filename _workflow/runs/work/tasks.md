# Task Plan: KareBraids Service-Driven Gallery

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-02
- Progress and summary files read: `_workflow/runs/work/progress.md`, `_workflow/runs/work/summary.md`
- Detailed spec sections used: sections 11-17 for affected surfaces, API/UI expectations, verification, and acceptance criteria.
- Approval note: explicit approval gate was not recorded because this non-interactive implementation turn proceeded directly from the user's implement request. Workflow health is Partial.

## TASK-001: Add backend service data and gallery endpoint contracts
- Status: Done
- Objective: Create backend-owned service gallery data and expose service/all/filtered gallery endpoints.
- Files likely affected: `server/data/services.json`, `server/controllers/galleryController.js`, `server/routes/galleryRoutes.js`, `server/tests/gallery.test.js`
- Checklist: write failing API tests; create service JSON; implement controller/routes; verify tests.
- Iteration plan: Build data/endpoints, Refine unknown service/limit behavior, Polish response shape.
- Test plan: Jest gallery endpoint tests.
- Acceptance criteria: service previews, all images, filtered service metadata/reviews.

## TASK-002: Update frontend gallery service and query hooks
- Status: Done
- Objective: Keep API logic outside UI and add TanStack Query hooks for gallery responses and services.
- Files likely affected: `client/src/services/galleryService.js`, `client/src/hooks/queries/useGalleryItems.js`
- Checklist: add tests; implement relative `/gallery` and `/gallery/services`; include service in query keys.
- Iteration plan: Build hook/API functions, Refine normalization, Polish reusable exports.
- Test plan: Vitest gallery query tests.
- Acceptance criteria: no `/api/gallery` frontend path, backend service filtering requested by query.

## TASK-003: Render service-driven gallery and preview cards
- Status: Done
- Objective: Update Gallery, homepage cards, services page, and reviews to use service endpoint data.
- Files likely affected: `client/src/pages/Gallery.jsx`, `client/src/components/home/BrowseByStyle.jsx`, `client/src/components/home/FeaturedServices.jsx`, `client/src/pages/Services.jsx`, `client/src/components/reviews/ReviewList.jsx`, `client/src/index.css`, frontend tests.
- Checklist: service intro/reviews selected only; preview cards use `previewImage`; cards route to `/gallery?service=<id>`; modal preserved.
- Iteration plan: Build UI behavior, Refine accessibility/states, Polish styling/tests.
- Test plan: Vitest full suite, lint, build.
- Acceptance criteria: selected gallery UX and preview cards match request.
