# Workflow Handoff — Global Theme System

## Shared Understanding Handoff

### Original Request
Implement a production-ready global `system`/`light`/`dark` theme architecture, semantic-token light palette, no-FOUC bootstrap, accessible desktop/mobile theme menu, provider integration, and Vitest coverage for the KareBraids frontend.

### Confirmed Understanding
- The stored preference is one of `system`, `light`, or `dark`; invalid or unavailable stored values fall back to `system`.
- The resolved theme is always `light` or `dark` and is applied only through `document.documentElement.dataset.theme`.
- `system` listens for live `prefers-color-scheme` changes.
- The current token palette remains the dark theme; a dedicated `:root[data-theme="light"]` semantic override supplies the luxury light theme.
- The desktop theme control follows the Book Appointment CTA and remains visually secondary.
- The mobile theme control sits directly below the drawer header.
- Selecting any theme closes the submenu and parent overflow menu. On mobile it also closes the navigation drawer and returns the user to page content.
- Menu behavior must be keyboard accessible, expose the requested ARIA state, close on outside click/Escape, and manage focus predictably.
- Tests are TDD-first and cover theme logic/provider and menu interaction.

### Decisions Made
- Mobile theme selection is a completed action: close all theme UI and the mobile drawer.
- Theme state belongs in a dedicated React context/provider rather than Redux because it is a focused browser/UI preference with its own persistence and media-query lifecycle.
- No additional menu or theme package is planned.
- Existing pages remain untouched unless a semantic token exposes a concrete contrast regression during verification.
- Applied skill: design-taste-frontend

### Assumptions
- For system resolution, a non-dark or unavailable media query resolves to light.
- Storage access may fail (privacy/security settings); helpers will fail safely and keep the in-memory theme functional.
- The no-FOUC script will independently validate the stored value and mirror runtime resolution without importing modules.
- Closing the mobile drawer returns focus to its existing trigger; desktop ThemeMenu close returns focus to its own trigger where appropriate.
- Native DOM event handling and roving/menu focus behavior are sufficient; no third-party primitive is required.

### In Scope
- Theme helpers, provider/context/hook API, root integration, pre-render theme bootstrap, semantic light tokens, neutral shell naming, ThemeMenu UI, desktop/mobile header integration, and tests.

### Out Of Scope
- Backend work, account synchronization, cross-device theme sync, page redesigns, Tailwind dark variants, new dependencies, and unrelated navigation/booking changes.

### Acceptance Criteria
- All three preferences work and persist under `karebraids-theme`.
- System preference resolves initially and updates live.
- The resolved theme is present on the root element before React runs and stays synchronized afterward.
- The existing dark design remains visually intact and the light palette is complete, branded, and accessible.
- Desktop and mobile expose the same nested accessible menu; selection closes all relevant menu UI, including the mobile drawer.
- The booking CTA remains the dominant header action.
- Requested Vitest coverage, full client tests, lint, and build pass without navigation or booking regressions.

### Risks And Edge Cases
- React StrictMode can expose listener/subscription cleanup defects.
- jsdom requires a controllable `matchMedia` mock for live system tests.
- Nested menu focus, Escape propagation, outside clicks, and mobile-drawer focus restoration can conflict if ownership is unclear.
- Existing CSS includes many legacy aliases and alpha tokens; light overrides must target semantic/theme tokens carefully enough to avoid dark translucent surfaces leaking into light mode.
- The inline bootstrap and runtime helper can drift unless their validation/resolution rules are kept deliberately equivalent.

### Remaining Open Questions
None blocking. Any implementation-level findings will be handled within the approved boundaries.

### Normalized Workflow Request
See `_workflow/runs/work/request.md`.

## Live Resume State
- Current phase: Spec approval gate
- Current branch: `work`
- Current worktree: `/workspace/karebraids`
- Run ID: `work`
- Artifact root: `_workflow/runs/work/`
- Last completed safe checkpoint: Intake completed; request, handoff, and detailed spec saved.
- Current task: Not created; task planning is prohibited until explicit spec approval.
- Current iteration: Not started.
- Blockers: Explicit user approval of `_workflow/runs/work/spec.md`.
- Dirty worktree before workflow: clean.
- Verification status: Repository inspection only; no implementation verification run.
- Acceptance status: Pending implementation.
- Workflow health: Partial by design at approval gate.
- Files already changed: `_workflow/runs/work/request.md`, `_workflow/runs/work/handoff.md`, `_workflow/runs/work/spec.md`.
- Files planned next: `_workflow/runs/work/tasks.md`, then approved client and workflow files.
- Tests already run: none.
- Exact next action: Wait for `approve spec`, then create the vertical task plan.
- Safe to continue automatically: No; explicit approval is required.
- Suggested next prompt: `approve spec`
