# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will invoke the grill-me skill at `.agents/skills/grill-me/SKILL.md` to build shared understanding, run dirty worktree protection, generate a saved spec in `_spec/`, stop for explicit user approval, create a vertical task plan in `_task/` only after approval, execute tasks one by one until the request is complete or stopped, record acceptance results, update `_progress/progress.md` and `_handoff/current.md` after each task, run a final diff audit, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

Redesign the KareBraids homepage while keeping the same existing sections. Use a premium African braiding salon direction with tasteful text and image entrance animations plus scroll-based reveal/parallax motion. Do not change the booking or gallery flows.

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

- User or business goal: Make the homepage feel more premium, editorial, and brand-appropriate for an African hair braiding service.
- Target users: Prospective KareBraids clients browsing services, visual work, trust cues, testimonials, and booking calls to action.
- Expected behavior: The homepage keeps the current sections and navigation destinations while presenting them with richer layout, spacing, image treatment, and motion.
- UI expectations: Premium African braiding salon feel, warm/refined palette, asymmetric desktop composition, strong mobile collapse, tasteful text/image entrance animations, and scroll-based reveal/parallax motion.
- API expectations: Not applicable; no backend or API changes expected.
- Data model expectations: Not applicable; no data model changes expected.
- Edge cases: Respect reduced-motion preferences, avoid horizontal scrolling on mobile, keep images and text readable, and avoid breaking existing page tests.
- Constraints: No new animation package; use CSS transitions/keyframes and an IntersectionObserver-based reveal helper. Do not change booking or gallery flows.
- Success criteria: Same homepage sections render, booking/gallery links still work, animations are tasteful and performant, tests/build pass, and no new dependencies are added.
- Preferred verification: `npm test --prefix client`, `npm run build --prefix client`, and a browser/manual homepage check.
- Dirty worktree notes: Initial `git status --short` was clean. Planned files are homepage, CSS, and relevant frontend tests/workflow artifacts. Overlap risk is low.
- Release notes expectations: User-facing homepage visual redesign and animation updates; no new APIs, env vars, database changes, or dependencies.

## Out Of Scope

- Changing booking flow behavior.
- Changing gallery page or gallery modal behavior beyond homepage preview presentation if needed.
- Backend/API/database changes.
- Adding Framer Motion, GSAP, or other new animation dependencies.
- Full-site redesign outside the homepage.
