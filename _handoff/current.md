# Current Workflow Handoff

This file is the live resume state for the active workflow. Keep it current after each task and after the final summary. If this file conflicts with `_progress/progress.md`, trust `_progress/progress.md` for completed task history and update this file.

## Current Request

`<CURRENT_REQUEST>`

## Request ID

`<REQUEST_ID>`

## Current Phase

`<Intake / Spec / Planning / Execution / Review / Summary / Complete / Blocked>`

## Execution Mode

`<complete-workflow by default / plan-only / single-task / parallel-workflow / parallel-worker / parallel-orchestrator>`

## Current Spec File

`<path or none>`

## Current Task Plan File

`<path or none>`

## Current Review File

`<path or none>`

## Current Release Notes File

`<path or none>`

## Current Summary File

`<path or none>`

## Last Completed Task

`<task id and title, or none>`

## Current Task

`<task id and title, or none>`

## Current Iteration

`<Iteration 1 - Build / Iteration 2 - Refine / Iteration 3 - Polish / none>`

## Current TDD Phase

`<Red / Green / Refactor / none>`

## Red Phase Status

`<not started / failing test written or updated / expected failure observed / blocked / not applicable, with command summary>`

## Green Phase Status

`<not started / implementation in progress / passing verification recorded / blocked / not applicable, with command summary>`

## Refactor Phase Status

`<not started / cleanup in progress / post-cleanup verification recorded / blocked / not applicable, with command summary>`

## Missing-Test Exception

`<none / explicitly justified exception with reason and best available verification>`

## Next Task

`<task id and title, review, summary, health check, or none>`

## Dirty Worktree Status

`<git status --short result, existing dirty files, planned files, overlap risk>`

## Parallel Queue Status

`<not applicable / queue pending / queue ready / workers active / merge review / complete>`

## Parallel Worker Count

`<default 3 / minimum 2 when 2+ safe tasks exist / maximum 5 / fallback 1, with actual active count>`

## Parallel Claims Status

`<not applicable / path to _parallel/claims.md and summary of unclaimed, claimed, in-progress, done, blocked, needs-review tasks>`

## Parallel Locks Status

`<not applicable / path to _parallel/locks.md, active locks, released locks, overlap risk>`

## Parallel Agent Status

`<not applicable / path to _parallel/agent-status.md, orchestrator status, worker statuses>`

## Parallel Merge Review Status

`<not applicable / pending / passed / needs-review / failed, with final verification status>`

## Acceptance Status

`<not started / all required criteria met / partial / blocked>`

## Iteration Evidence Status

`<per-task Build / Refine / Polish evidence status and any missing evidence>`

## Blockers

`<none or details>`

## Verification Status

`<not run / passed / failed / blocked / partial, with command summary>`

## Workflow Health Status

`<Pending / Passed / Partial / Failed>`

## Suggested Next Prompt

`continue workflow`

## Notes For Continuation

- Default execution mode is `complete-workflow`.
- If the next task is not `Done`, continue executing remaining tasks sequentially until all tasks are complete or a stop condition is reached.
- Use `single-task` only when the user explicitly requested one-task execution.
- For `parallel-workflow`, orchestrator owns intake/spec/task plan, queue, claims, locks, worker assignment, merge review, final verification, review, release notes, summary, handoff, and health check.
- For `parallel-worker`, worker claims exactly one eligible task, records claim and file locks before editing, completes Build -> Refine -> Polish, records final status, releases locks, and stops.
- For `parallel-orchestrator`, validate claims/locks/worker outputs, resolve conflicts or create follow-up tasks, run final verification, and complete final artifacts.
- Resume from the current task, current iteration, and current TDD phase.
- Every executable task must complete Build -> Refine -> Polish with documented goal, changes made, verification command/result, review findings, acceptance status, remaining issues, and next action before `Done`.
- For code-changing tasks, resume at the recorded TDD phase: Red writes or updates the failing test first and records the expected failure when possible; Green implements the smallest passing change and records passing verification; Refactor cleans up without behavior change and records post-cleanup verification.
- Do not advance a code-changing task to `Done` unless Red, Green, and Refactor evidence is complete for the current iteration or the missing-test exception is explicitly justified.
- Preserve dirty worktree protection: stop before editing if dirty files overlap with planned files.
- Preserve acceptance results: no task is `Done` unless every required criterion is checked `[x]`.
- If verification fails, follow the failure recovery protocol inside the current iteration and record the result in progress, review, and summary.
- Before final review and summary, run or document the final diff audit.
- Completed workflows must include `_release/<request-id>.md`.
- `<what the next agent/session needs to know>`
