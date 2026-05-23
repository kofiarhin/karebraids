# Work Request

This file is auto-managed by the workflow. It stores the latest active work request, usually copied from the user's direct Codex prompt.

Users do not need to edit this file manually. You may edit it when you want to stage a request before asking the agent to run the workflow.

The workflow will invoke the grill-me skill at `.agents/skills/grill-me/SKILL.md` to build shared understanding, run dirty worktree protection, generate a saved spec in `_spec/`, stop for explicit user approval, create a vertical task plan in `_task/` only after approval, execute tasks one by one until the request is complete or stopped, record acceptance results, update `_progress/progress.md` and `_handoff/current.md` after each task, run a final diff audit, write a workflow review in `_review/`, create release notes in `_release/`, and write a final summary in `_summary/`.

## Request

<<<<<<< HEAD
Redesign the KareBraids homepage while keeping the same existing sections. Use a premium African braiding salon direction with tasteful text and image entrance animations plus scroll-based reveal/parallax motion. Do not change the booking or gallery flows.
=======
`workflow redesign the Gallery page into a responsive masonry/asymmetric image gallery with roughly 9 images, preserve the existing modal behavior, and ensure mobile collapses to a clean single-column flow.`
>>>>>>> redesign-gallery

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

<<<<<<< HEAD
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
=======
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
>>>>>>> redesign-gallery
