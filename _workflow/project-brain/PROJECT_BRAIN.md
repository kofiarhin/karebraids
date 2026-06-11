# Project Brain

Generated projection of `_workflow/project-brain/project.json`. JSON remains authoritative.

## Current Workflow

- Run: `dev`
- Stage: Complete
- Status: Completed and verified
- Next stage: None

## Completed Goal

Gallery service filtering uses backend data, and the image modal provides accessible cyclic previous/next navigation within the active filtered result set.

## Durable Decisions

- Express and MongoDB Service records remain the canonical Gallery source.
- Gallery selection filters backend `GET /gallery` results by service slug or id.
- Representative-image wording remains an active presentation requirement.
- Modal selection is represented as an index into the current `galleryItems`.
- The modal backdrop is portaled to `document.body` to preserve viewport-fixed behavior under transformed route animation containers.

## Verification

- 127 client tests and 71 server tests passed.
- Client lint and production build passed.
- Desktop/mobile browser filtering, wraparound, keyboard, Escape, filter reset, focus restoration, and console checks passed.
- Fallow verdict: `pass` with zero introduced findings.

## Active Artifacts

- Request: `_workflow/runs/dev/request.md`
- Spec: `_workflow/runs/dev/spec.md`
- Tasks: `_workflow/runs/dev/tasks.md`
- Review: `_workflow/runs/dev/review.md`
- Verification: `_workflow/runs/dev/verification.md`
- Release notes: `_workflow/runs/dev/release-notes.md`
- Summary: `_workflow/runs/dev/summary.md`
- Handoff: `_workflow/runs/dev/handoff.md`
- Run memory: `_workflow/runs/dev/brain.json`
