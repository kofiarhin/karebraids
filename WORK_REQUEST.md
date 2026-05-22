# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will invoke the grill-me skill at `.agents/skills/grill-me/SKILL.md` to build shared understanding, run dirty worktree protection, generate a saved spec in `_spec/`, create a vertical task plan in `_task/`, execute tasks one by one until the request is complete or stopped, record acceptance results, update `_progress/progress.md` and `_handoff/current.md` after each task, run a final diff audit, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

`<Auto-synced from latest direct prompt, e.g. Add dark theme to the app.>`

## Question Preference

Choose one:

- `grill-me intake`: default. Use the grill-me skill at `.agents/skills/grill-me/SKILL.md` to create shared understanding before writing the spec.
- `skip questions`: do not ask questions; generate a best-effort spec and record assumptions.

Default: `grill-me intake`

## Optional Execution Preference

Choose one:

- `plan-only`: run grill-me intake, write spec, write task plan, then stop.
- `single-task`: run grill-me intake, write spec, write task plan, execute only the next ready task, verify and review it, update artifacts, then stop.
- `complete-workflow`: run grill-me intake, write spec, write task plan, then execute all generated tasks sequentially until the request/spec is complete or a stop condition is reached.

Default: `complete-workflow`

## Optional Context

- User or business goal: `<Why this matters>`
- Target users: `<Who uses this>`
- Expected behavior: `<What should happen>`
- UI expectations: `<Screens, components, states, accessibility, responsive behavior>`
- API expectations: `<Endpoints, payloads, errors, auth, permissions>`
- Data model expectations: `<Fields, relationships, migrations, defaults>`
- Edge cases: `<Failure states, empty states, permissions, limits>`
- Constraints: `<Do not change X / must use Y / no new dependencies>`
- Success criteria: `<How we know this is done>`
- Preferred verification: `<Test command, manual check, build command>`
- Dirty worktree notes: `<Existing dirty files, planned files, overlap risk>`
- Release notes expectations: `<User-facing changes, developer changes, known limitations>`

## Out Of Scope

- `<File, feature, API, behavior, or area that should stay untouched>`
