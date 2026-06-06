# Task Plan — KareBraids Global Theme System

- Spec file used: `_workflow/runs/work/spec.md`
- Planning date: 2026-06-06
- Explicit approval: User replied `approve spec` on 2026-06-06 before this plan was generated.
- Execution mode: `complete-workflow`
- Progress read: `_workflow/runs/work/progress.md`
- Summary read: `_workflow/runs/work/summary.md`
- Handoff read: `_workflow/runs/work/handoff.md`
- Detailed spec sections used: Current State Analysis; Desired End State; Scope; Functional/Non-Functional Requirements; Affected Surfaces; Dependency and Integration Map; Data and State Impact; UX/API/Workflow Expectations; Execution Strategy; Verification Strategy; Acceptance Criteria; Edge Cases; Risks; Assumptions; Task Extraction Notes; Frontend Taste Application.
- Applied skill: design-taste-frontend

## TASK-001: Add the global theme engine and application-root provider

- Status: Done
- Objective: Add tested theme constants/helpers and a StrictMode-safe provider that exposes preference, resolved theme, and `setTheme`, persists valid choices, follows system changes, and synchronizes the root dataset.
- Files likely affected: `client/src/theme/theme.js`, `client/src/theme/ThemeProvider.jsx`, `client/src/theme/ThemeProvider.test.jsx`, `client/src/redux/providers.jsx`.
- Checklist:
  - [x] Add theme constants, validation, storage, media-query, and resolution helpers.
  - [x] Add ThemeProvider/context consumer API.
  - [x] Persist valid preferences and safely handle browser API failures.
  - [x] Subscribe/clean up system preference changes.
  - [x] Apply resolved theme to `document.documentElement.dataset.theme`.
  - [x] Wrap all routes/components at the application root.
- Iteration 1 Build: Write failing tests for default system resolution, root dataset, explicit light/dark selection, and persistence; implement the smallest passing engine/provider.
- Iteration 2 Refine: Add failing tests for invalid storage and live `matchMedia` events; implement robust validation/subscription cleanup and rerun tests.
- Iteration 3 Polish: Add/refine tests for provider API stability and explicit-theme immunity to OS changes; simplify implementation and run focused/full checks.
- Test plan: `npm run test --prefix client -- src/theme/ThemeProvider.test.jsx` plus full client tests.
- Red phase evidence: Recorded per iteration in `_workflow/runs/work/progress.md`.
- Green phase evidence: Recorded per iteration in `_workflow/runs/work/progress.md`.
- Refactor phase evidence: Recorded per iteration in `_workflow/runs/work/progress.md`.
- Test commands run: Recorded with exact results in `_workflow/runs/work/progress.md`.
- Acceptance criteria: Spec criteria for enum validation, persistence, system resolution/live updates, root dataset, and root provider integration.
- Acceptance result: All task acceptance criteria met; detailed evidence is recorded in `_workflow/runs/work/progress.md`.
- Verification commands: focused Vitest, full Vitest, ESLint on changed files, build.
- Stop condition: Provider tests cannot prove browser API behavior or integration breaks existing app startup.
- Out-of-scope items: Menu UI, CSS palette, backend state, Redux store creation.

## TASK-002: Prevent theme flash and add semantic luxury light styling

- Status: Done
- Objective: Set the resolved root theme before React executes, preserve the current dark palette, introduce a complete semantic luxury light palette, and make layout naming theme-neutral.
- Files likely affected: `client/index.html`, `client/src/index.css`, `client/src/components/Layout.jsx`, theme bootstrap tests if needed.
- Checklist:
  - [x] Add inline validation/system-resolution bootstrap before the module script.
  - [x] Keep current `:root` values as dark-compatible defaults.
  - [x] Add `:root[data-theme="light"]` semantic overrides with accessible warm ivory/cream/bronze styling.
  - [x] Override required surface/text/border/overlay/shadow and supporting semantic aliases used globally.
  - [x] Rename `dark-brand-shell` to a theme-neutral selector.
  - [x] Confirm no Tailwind `dark:` conversion or page rewrite.
- Iteration 1 Build: Add a failing static/bootstrap assertion, then add the pre-React script and prove ordering/value validation.
- Iteration 2 Refine: Add a failing CSS/static assertion for required light semantic tokens and neutral shell naming, then implement overrides/refactor naming.
- Iteration 3 Polish: Audit theme-specific alpha/surface aliases, add targeted assertions for critical light surfaces, refine contrast/shadows, and verify build/code-surface appearance.
- Test plan: targeted static Vitest assertions, full tests, lint, build, browser/screenshot if available.
- Red phase evidence: Recorded per iteration in `_workflow/runs/work/progress.md`.
- Green phase evidence: Recorded per iteration in `_workflow/runs/work/progress.md`.
- Refactor phase evidence: Recorded per iteration in `_workflow/runs/work/progress.md`.
- Test commands run: Recorded with exact results in `_workflow/runs/work/progress.md`.
- Acceptance criteria: No initial flash; root dataset set before React; current dark design intact; complete usable branded light palette; neutral shell naming.
- Acceptance result: All task acceptance criteria met; detailed evidence is recorded in `_workflow/runs/work/progress.md`.
- Verification commands: targeted tests, full Vitest, ESLint, build, CSS/code-surface audit.
- Stop condition: Light mode requires broad page rewrites or dark mode cannot be preserved through semantic tokens.
- Out-of-scope items: Per-page redesign, Tailwind dark variants, animated global theme transitions.

## TASK-003: Add the accessible desktop/mobile ThemeMenu and close flows

- Status: Done
- Objective: Add one reusable nested theme menu, place it after the desktop CTA and below the mobile drawer header, and provide consistent keyboard/focus/close behavior including mobile drawer completion.
- Files likely affected: `client/src/components/ThemeMenu.jsx`, `client/src/components/ThemeMenu.test.jsx`, `client/src/components/Header.jsx`, `client/src/index.css`.
- Checklist:
  - [x] Use requested Phosphor trigger/option/check icons.
  - [x] Implement nested Theme -> System/Light/Dark structure.
  - [x] Expose requested ARIA controls/state and menu semantics.
  - [x] Support click, tab, arrow keys, Escape, outside click, and focus return.
  - [x] Apply/persist selection and close submenu/parent menu.
  - [x] Close mobile navigation after mobile selection.
  - [x] Keep CTA visually dominant and navigation behavior unchanged.
- Iteration 1 Build: Write failing open/submenu/selection tests; implement minimal menu and theme selection close behavior.
- Iteration 2 Refine: Add failing keyboard/Escape/outside/focus tests; implement event and focus management.
- Iteration 3 Polish: Add failing mobile completion/header placement assertions, integrate both instances, refine visual hierarchy/responsiveness, and verify navigation/booking regressions.
- Test plan: focused ThemeMenu tests, header behavior test where needed, full client tests, lint, build, manual keyboard/code-surface review.
- Red phase evidence: Recorded per iteration in `_workflow/runs/work/progress.md`.
- Green phase evidence: Recorded per iteration in `_workflow/runs/work/progress.md`.
- Refactor phase evidence: Recorded per iteration in `_workflow/runs/work/progress.md`.
- Test commands run: Recorded with exact results in `_workflow/runs/work/progress.md`.
- Acceptance criteria: Requested menu structure/icons/check, accessible interaction, exact placements, immediate theme action, complete close behavior, CTA dominance, no navigation/booking regressions.
- Acceptance result: All task acceptance criteria met; detailed evidence is recorded in `_workflow/runs/work/progress.md`.
- Verification commands: focused/full Vitest, ESLint, build, manual keyboard and responsive review.
- Stop condition: Focus ownership conflicts with the drawer cannot be resolved without changing established navigation semantics.
- Out-of-scope items: General settings UI, account sync, unrelated header redesign.

## TASK-004: Complete regression hardening and workflow quality evidence

- Status: Done
- Objective: Audit the complete request, run all automated/manual checks, document migration notes and quality findings, and leave a resume-safe completed workflow.
- Files likely affected: tests or in-scope files for targeted fixes; `_workflow/runs/work/progress.md`, `review.md`, `release-notes.md`, `summary.md`, `handoff.md`, `verification.md`, `.workflow/fallow-audit.md`.
- Checklist:
  - [x] Run focused and full frontend tests.
  - [x] Run lint/build and classify any pre-existing failures.
  - [x] Run final diff/stat/check and sensitive/junk/scope audits.
  - [x] Perform final design-taste UI review and screenshot if runnable tooling is available.
  - [x] Run required Fallow JSON audit and record verdict.
  - [x] Complete review, release notes with CSS migration notes, summary, handoff, and health check.
- Iteration 1 Build: Run full regression verification and fix only in-scope failures with tests first.
- Iteration 2 Refine: Run accessibility/visual/code-surface review and address concrete in-scope issues with regression assertions.
- Iteration 3 Polish: Run final diff/Fallow/health audits and complete documentation.
- Test plan: all requested automated checks and documented manual review.
- Red phase evidence: Test-first for any code correction; otherwise explicit documentation-only exception.
- Green phase evidence: Final passing/known-limitation command results.
- Refactor phase evidence: Final cleanup/diff audit.
- Test commands run: Recorded with exact results in `_workflow/runs/work/progress.md`.
- Acceptance criteria: Every spec criterion checked, verification recorded, no scope creep, migration notes present, workflow health classified accurately.
- Acceptance result: All task acceptance criteria met; detailed evidence is recorded in `_workflow/runs/work/progress.md`.
- Verification commands: `npm run test --prefix client`, `npm run lint --prefix client`, `npm run build --prefix client`, `git diff --check`, `git diff --stat`, `git diff`, required Fallow command.
- Stop condition: Any required behavior remains unverified or a destructive/unrelated fix would be needed.
- Out-of-scope items: Pre-existing unrelated lint/quality debt unless it blocks proof of this feature.
