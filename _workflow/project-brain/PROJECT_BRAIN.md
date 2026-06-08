# Project Brain

Updated: 2026-06-08T23:17:15Z

## Workflow
- Current stage: complete
- Status: complete
- Next stage: commit-and-pr

## Goals
- [goal-service-canonical] Make MongoDB Service documents and Express APIs the canonical source for all public service and gallery data.
- [goal-representative-local-images] Use one frontend-owned library of existing local public images as representative styling inspiration while services remain independently categorized business data.

## Requirements
- [req-service-api] Public service APIs provide filtered lists, id-or-slug detail, per-service gallery, and backward-compatible gallery responses.
- [req-client-server-state] Public React service/gallery surfaces use TanStack Query and the shared API client instead of hardcoded live data.
- [req-seed-upsert] Service seed data is complete and rerunnable through upserts.
- [req-local-image-library] All curated frontend image paths must be /images/<filename> values centralized in client/src/data/imageLibrary.js and must match files in client/public/images/.
- [req-representative-semantics] Curated images must use generic representative metadata and UI copy and must never be presented as proof of a specific hairstyle or service.
- [req-preserve-service-ux] Preserve service categories, prices, durations, booking links, gallery masonry/modal behavior, and service filtering as UI context.

## Constraints
- [constraint-no-binaries] MongoDB stores image URLs and metadata only, never image binaries.
- [constraint-deep-links] Existing booking and gallery service query-string links must remain compatible.
- [constraint-no-remote-images] The frontend must not use remote https://images.pexels.com URLs, import public images, or move image files.
- [constraint-backend-compatible] Existing backend service image fields may remain for future real client photos; current API responses must not be broken.

## Architecture Decisions
- [arch-canonical-service] MongoDB Service collection is the canonical service/gallery source; Express is the public contract and TanStack Query owns frontend server state.
- [decision-image-library-authority] client/src/data/imageLibrary.js is the sole authority for current curated representative visuals; service records are authoritative only for business data.
- [decision-local-representative-library-complete] Current curated frontend visuals are served only from client/public/images through client/src/data/imageLibrary.js; backend service media fields remain reserved for future trusted real client photos.

## Technical Decisions
- [tech-image-url-validation] Service image fields accept validated HTTP(S) URLs and expose image/src compatibility aliases.
- [tech-service-contract-complete] Public services/gallery data is normalized by Express serializers and consumed through TanStack Query; seed reruns use stable-ID upserts.
- [decision-display-image-by-service-id] Frontend compatibility image and previewImage fields and service previews derive deterministically from getDisplayImage(service.id), with isRepresentativeImage true.
- [decision-gallery-context-not-classification] Current gallery items are the shared representative library; service selection adds UI consideration context only and never image classification.

## Domain Knowledge
- [domain-current-split] The backend gallery already reads Service documents, but several public React surfaces currently read client/src/data/services.js.
- [domain-service-seed-11] The canonical seed catalog contains 11 schema-valid services with HTTP(S)-only primary/gallery image metadata.
- [domain-local-image-count-15] The curated representative library contains 15 existing local JPG assets, all validated under client/public/images/.

## Open Questions
- None.

## Risks
- [risk-async-compat] Catalog migration can regress deep-link selection, async states, or legacy response aliases.
- [risk-gallery-shape-regression] Changing image authority can regress gallery modal/masonry item shape, service filter context, or booking/home card imagery if adapters are not preserved.

## Artifacts
- [artifact-active-spec] Active spec: _workflow/runs/work/spec.md.
- [artifact-review-service-data] Completed review: _workflow/runs/work/review.md.
- [artifact-release-service-data] Release notes: _workflow/runs/work/release-notes.md.
- [artifact-summary-service-data] Completion summary: _workflow/runs/work/summary.md.
- [artifact-active-spec-representative-images] Active spec: _workflow/runs/work/spec.md for the representative local image library refactor.
- [artifact-review-representative-images] Completed review: _workflow/runs/work/review.md.
- [artifact-verification-representative-images] Completed verification: _workflow/runs/work/verification.md.
- [artifact-release-representative-images] Release notes: _workflow/runs/work/release-notes.md.

## Workflow History
- [workflow-spec-saved-20260607] Backend-driven service/gallery request completed intake and is paused for explicit spec approval.
- [workflow-complete-service-data-20260607] Backend-driven service/gallery workflow completed all five tasks and final verification.
- [workflow-spec-saved-representative-images-20260608] Representative local image library intake completed and the workflow is paused at the explicit spec approval gate.
- [workflow-complete-representative-images-20260608] Representative local image library workflow completed all three tasks with 63 backend tests, 112 frontend tests, build, lint, path, semantic, review, and Fallow checks.
