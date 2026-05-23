# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will invoke the grill-me skill at `.agents/skills/grill-me/SKILL.md` to build shared understanding, run dirty worktree protection, generate a saved spec in `_spec/`, stop for explicit user approval, create a vertical task plan in `_task/` only after approval, execute tasks one by one until the request is complete or stopped, record acceptance results, update `_progress/progress.md` and `_handoff/current.md` after each task, run a final diff audit, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

`workflow redesign the Gallery page into a responsive masonry/asymmetric image gallery with roughly 9 images, preserve the existing modal behavior, and ensure mobile collapses to a clean single-column flow.`

## Question Preference

Choose one:

- `grill-me intake`: default. Use the grill-me skill at `.agents/skills/grill-me/SKILL.md` to create shared understanding before writing the spec.
- `skip questions`: do not ask questions; generate a best-effort spec and record assumptions.

Default: `grill-me intake`

## Optional Execution Preference

Choose one:

- `plan-only`: run grill-me intake, write spec, wait for approval, write task plan, then stop.
- `single-task`: run grill-me intake, write spec, wait for approval, write task plan, execute only the next ready task, verify and review it, update artifacts, then stop.
- `complete-workflow`: run grill-me intake, write spec, wait for approval, write task plan, then execute all generated tasks sequentially until the request/spec is complete or a stop condition is reached.

Default: `complete-workflow`

## Optional Context

- User or business goal: Improve the Gallery page so visitors can browse more braid examples in a richer, less repetitive layout.
- Target users: Prospective KareBraids clients reviewing braid styles before booking.
- Expected behavior: The Gallery page shows about 9 image cards in a responsive masonry/asymmetric arrangement and still opens the existing modal when an image is selected.
- UI expectations: No two-column desktop layout; mobile collapses to a clean single-column flow; preserve accessible modal focus behavior.
- API expectations: Not applicable; frontend-only static content update.
- Data model expectations: Not applicable; static `galleryItems` content only.
- Edge cases: External images may fail or load slowly; modal tests depend on stable item titles; shared CSS selectors may affect home preview.
- Constraints: Do not change backend, booking flow, deployment, or unrelated pages except where shared gallery content is already consumed.
- Success criteria: About 9 gallery images render, desktop is not two columns, mobile is single column, modal behavior still works, relevant frontend checks pass or gaps are documented.
- Preferred verification: `cd client && npm test`, `cd client && npm run build`, and targeted manual/browser review if available.
- Dirty worktree notes: Initial `git status --short` was clean before workflow artifact edits.
- Release notes expectations: User-facing gallery redesign; no new APIs, env vars, dependencies, or schema changes expected.

## Out Of Scope

- Backend/API changes.
- Booking flow changes.
- Deployment configuration changes.
- Full site redesign outside gallery-related shared styles.
