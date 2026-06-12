# Project Brain

<<<<<<< HEAD
Last updated: 2026-06-12T01:38:14Z
=======
Last updated: 2026-06-12T02:02:08Z
>>>>>>> pr-25

## Workflow
- Stage: `complete`
- Status: `complete`
- Next: `commit-and-pr`

## Goals
- `goal-public-gsap-system` [complete]: Implement a reusable GSAP animation system across every public KareBraids route while leaving the admin route untouched.
- `goal-service-canonical` [active]: Make MongoDB Service documents and Express APIs the canonical source for all public service and gallery data.
- `goal-representative-local-images` [active]: Use one frontend-owned library of existing local public images as representative styling inspiration while services remain independently categorized business data.
- `goal-production-booking-services` [active]: Make the KareBraids services and booking flow production-ready on a single root-level Vercel deployment with same-origin API routing.
- `goal-gallery-filter-navigation` [complete]: Make Gallery service filtering use backend data and add accessible cyclic previous/next modal navigation within the active filtered result set.
- `goal-prelaunch-content-commerce` [complete]: Complete KareBraids pre-launch price consistency, image mapping hardening, Karen profile content support, and dormant future-product architecture without exposing ecommerce.

## Requirements
- `req-service-api` [active]: Public service APIs provide filtered lists, id-or-slug detail, per-service gallery, and backward-compatible gallery responses.
- `req-client-server-state` [active]: Public React service/gallery surfaces use TanStack Query and the shared API client instead of hardcoded live data.
- `req-seed-upsert` [active]: Service seed data is complete and rerunnable through upserts.
- `req-local-image-library` [active]: All curated frontend image paths must be /images/<filename> values centralized in client/src/data/imageLibrary.js and must match files in client/public/images/.
- `req-representative-semantics` [active]: Curated images must use generic representative metadata and UI copy and must never be presented as proof of a specific hairstyle or service.
- `req-preserve-service-ux` [active]: Preserve service categories, prices, durations, booking links, gallery masonry/modal behavior, and service filtering as UI context.
- `req-same-origin-api` [active]: Default browser API requests to same-origin /api while retaining a safe optional VITE_API_URL override.
- `req-vercel-fullstack-routing` [active]: Route /api/* to Express and non-API routes to the Vite SPA from a repository-root Vercel project.
- `req-booking-services-verification` [active]: Verify health, services, filtered bookable services, availability, booking creation, and duplicate-slot protection.
- `req-production-env-seed-docs` [active]: Document Vercel environment variables, MongoDB access, service presence checks, and the idempotent seedServices workflow.
- `req-prelaunch-price-single-source` [complete]: Keep every current service price while making one canonical seed value and one shared frontend formatter the owner of displayed starting prices.
- `req-prelaunch-image-audit` [complete]: Fix objectively broken image paths, IDs, mappings, thumbnails, and alt text while preserving mappings whose semantic correctness cannot be proven from repository evidence.
- `req-prelaunch-karen-profile` [complete]: Render a centrally configured Karen profile image and personal statement using explicit pre-launch placeholders when final client content is unavailable.
- `req-prelaunch-product-scaffold` [complete]: Define internal future product categories for hair extensions and hair products such as oils without adding public routes, APIs, cart, checkout, payments, inventory, or admin UI.

## Constraints
- `constraint-public-gsap-admin-exclusion` [active]: Decorative GSAP route and scroll animation must apply only to public pages; /admin remains outside the animation boundary.
- `constraint-no-binaries` [active]: MongoDB stores image URLs and metadata only, never image binaries.
- `constraint-deep-links` [active]: Existing booking and gallery service query-string links must remain compatible.
- `constraint-no-remote-images` [active]: The frontend must not use remote https://images.pexels.com URLs, import public images, or move image files.
- `constraint-backend-compatible` [active]: Existing backend service image fields may remain for future real client photos; current API responses must not be broken.
- `constraint-minimal-production-fix` [active]: Keep changes minimal and production-safe; do not redesign unrelated UI.
- `constraint-no-secrets` [active]: Never commit MongoDB, admin, or JWT credentials; use environment variables only.
- `constraint-prelaunch-source-truth` [active]: Use repository data as the source of truth and do not fabricate prices, image identities, Karen content, or product sales capability.
- `constraint-prelaunch-minimal-ui` [active]: Follow existing React/Tailwind conventions, keep changes minimal, and do not introduce a styling system or unrelated redesign.

## Architecture Decisions
- `arch-canonical-service` [active]: MongoDB Service collection is the canonical service/gallery source; Express is the public contract and TanStack Query owns frontend server state.
- `decision-image-library-authority` [active]: client/src/data/imageLibrary.js is the sole authority for current curated representative visuals; service records are authoritative only for business data.
- `decision-local-representative-library-complete` [active]: Current curated frontend visuals are served only from client/public/images through client/src/data/imageLibrary.js; backend service media fields remain reserved for future trusted real client photos.
- `decision-root-vercel-same-origin` [active]: Use one Vercel project rooted at the repository root to serve the Vite SPA and Express API on the same origin.

## Technical Decisions
- `tech-image-url-validation` [active]: Service image fields accept validated HTTP(S) URLs and expose image/src compatibility aliases.
- `tech-service-contract-complete` [active]: Public services/gallery data is normalized by Express serializers and consumed through TanStack Query; seed reruns use stable-ID upserts.
- `decision-display-image-by-service-id` [active]: Frontend compatibility image and previewImage fields and service previews derive deterministically from getDisplayImage(service.id), with isRepresentativeImage true.
- `decision-gallery-backend-filtering` [active]: Gallery service selection filters backend GET /gallery results by service slug or id; representative-image wording remains a presentation requirement.
- `tech-client-api-default` [active]: The shared Axios client defaults to same-origin /api and normalizes an optional complete VITE_API_URL prefix.
- `tech-vercel-function` [active]: api/index.js is the Vercel Express entrypoint and caches/retries MongoDB initialization; server/server.js remains local persistent runtime.
- `tech-booking-service-db-validation` [active]: Public availability and booking eligibility are validated against MongoDB Service records with bookingEnabled true and status available.
- `tech-seed-db-only-env` [active]: The service seed command reads only MONGODB_URI and performs idempotent stable-ID upserts.
- `decision-prelaunch-api-price-compat` [active]: Retain both startingPrice and priceFrom at the API compatibility boundary while reducing canonical editable seed data to one price value where tests prove safety.
- `decision-prelaunch-no-commerce-exposure` [active]: Future product preparation is a dormant domain scaffold only and must not be imported by public routes or components.
<<<<<<< HEAD
=======
- `decision-gallery-local-render-source` [active]: All frontend gallery arrays and final image render sources must come from client/src/data/imageLibrary.js; API gallery image URLs are metadata only and must never be rendered.
>>>>>>> pr-25

## Risks
- `risk-async-compat` [active]: Catalog migration can regress deep-link selection, async states, or legacy response aliases.
- `risk-gallery-shape-regression` [active]: Changing image authority can regress gallery modal/masonry item shape, service filter context, or booking/home card imagery if adapters are not preserved.
- `risk-production-access-unavailable` [active]: Actual Vercel settings, environment values, and production MongoDB contents require operator access; outbound live probes from the current environment are blocked by an HTTP 403 CONNECT proxy.
- `risk-prelaunch-image-semantics` [active]: Repository filenames and metadata do not prove that remote or representative photographs depict the named hairstyles; semantic reassignment would be guesswork.
- `risk-prelaunch-placeholder-content` [active]: A style image and generic copy must not be represented as Karen's verified portrait or approved personal statement.

## Open Questions
- `question-prelaunch-final-content` [active]: Final approved prices, Karen portrait, Karen personal statement, and authoritative hairstyle-photo labels remain unavailable but are non-blocking placeholders.
