# Project Brain

> Generated human-readable projection of `_workflow/project-brain/project.json`.
> JSON is the source of truth. Do not edit this projection as the authoritative memory record.

- Version: `1.0.0`
- Updated at: `2026-06-07T01:41:13Z`

## Workflow
- Current stage: complete
- Completed stages: intake, spec, approval, planning, implementation, verification, review, Fallow Quality, handoff, release notes, summary, health check
- Next stage: commit and PR
- Status: complete

## Goals
- Make MongoDB Service documents and Express APIs the canonical source for all public service and gallery data. — Completed

## Requirements
- Public service APIs provide filtered lists, id-or-slug detail, per-service gallery, and backward-compatible gallery responses. — Completed
- Public React service/gallery surfaces use TanStack Query and the shared API client instead of hardcoded live data. — Completed
- Service seed data is complete and rerunnable through upserts. — Completed

## Constraints
- MongoDB stores image URLs and metadata only, never image binaries. — Preserved
- Existing booking and gallery service query-string links remain compatible. — Verified

## Architecture Decisions
- MongoDB Service collection is canonical; Express provides the public contract; TanStack Query owns frontend server state.

## Technical Decisions
- Service image fields accept validated HTTP(S) URLs and expose `image`/`src` compatibility aliases.
- Public service/gallery data is normalized by shared Express serializers; seed reruns use stable-ID bulk upserts.

## Domain Knowledge
- The canonical seed catalog contains 11 schema-valid services with URL-only primary/gallery image metadata.
- Production client source no longer imports `client/src/data/services.js` for live service/gallery data.

## Open Questions
None recorded.

## Risks
- Async deep-link compatibility was mitigated with ID-or-slug lookup and regression tests.
- Live seed execution still requires a configured `MONGODB_URI` in the deployment environment.

## Artifacts
- Spec: `_workflow/runs/work/spec.md`
- Tasks/progress: `_workflow/runs/work/tasks.md`, `_workflow/runs/work/progress.md`
- Review: `_workflow/runs/work/review.md`
- Fallow: `.workflow/fallow-audit.md`
- Release notes/summary: `_workflow/runs/work/release-notes.md`, `_workflow/runs/work/summary.md`

## Custom Categories
None registered.

## Recent Changes
- 2026-06-07: Completed the backend-driven service/gallery migration and final verification.
