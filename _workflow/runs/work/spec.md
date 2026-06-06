# Detailed Spec — Theme-aware Header Navigation

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-06
- Request ID / slug: `theme-aware-header-navigation`
- Request source: latest direct user prompt / `_workflow/runs/work/request.md`
- Execution mode: `complete-workflow`
- Request classification: frontend theme bug fix
- Scope level: focused
- Risk level: low to moderate (global navigation CSS)

## 2. Original Request
- Raw user request: make the navigation/header itself switch between light and dark themes, including mobile surfaces, while preserving theme behavior.
- Normalized request: replace dark-specific header/navigation styling with semantic header roles resolved for light and dark themes; protect behavior with Vitest.
- Source reference: `_workflow/runs/work/request.md`.

## 3. Questions And Answers
- Questions asked: none; prohibited by the user.
- Answers received: requirements, implementation guidance, file list, and acceptance criteria were fully supplied.
- Questions skipped: all discovery questions.
- Remaining open questions: none blocking.

## 4. Problem Definition
- Problem being solved: page content changes theme but header/navigation retains dark-only surface and muted dark-theme text styling.
- Why it matters: the persistent navigation feels visually disconnected and loses contrast in light mode.
- Current pain point: hardcoded dark alpha tokens override otherwise semantic light tokens.
- Expected value: a coherent, accessible theme across desktop and mobile navigation.

## 5. Current State Analysis
- Existing behavior: `ThemeProvider` applies resolved `light`/`dark` to `document.documentElement.dataset.theme`; header markup is shared by both themes.
- Existing architecture/components: `Header.jsx` renders desktop nav, CTA, ThemeMenu, mobile toggle/backdrop/drawer; `ThemeMenu.jsx` owns menu interactions.
- Existing files/modules likely involved: `client/src/index.css`, `client/src/theme/ThemeBootstrap.test.js`; Header/ThemeMenu/ThemeProvider inspected for integration context.
- Existing data flow: stored preference -> ThemeProvider/system media query -> root `data-theme` -> CSS variables.
- Existing behavior: runtime theme switching/persistence/system syncing is already tested.
- Existing tests: ThemeProvider behavior, ThemeMenu interaction, header placement/mobile close, bootstrap/static semantic CSS checks.

## 6. Desired End State
- Expected final behavior: header, navigation, menu popovers, mobile drawer/header/backdrop, controls, links, brand, active state, and CTA resolve from semantic theme roles.
- User-facing outcome: light mode has a warm light navigation surface with readable espresso text; dark mode remains visually intact.
- Developer-facing outcome: header styles no longer depend on dark-only implementation tokens.
- System/workflow outcome: existing runtime theme logic remains unchanged.
- Backward compatibility: preserve markup, routes, interaction, persistence, keyboard behavior, and system syncing.

## 7. Scope
- In scope: header-specific semantic tokens for both explicit themes; desktop/mobile header CSS migration; focused static CSS regression coverage.
- Out of scope: page redesigns, backend, dependencies, new theme modes, state architecture changes.
- Non-goals: changing menu interaction or navigation structure.
- Explicit boundaries: do not hardcode dark colors in listed header/nav/ThemeMenu selectors.

## 8. Users And Use Cases
- Primary users: public visitors using light, dark, or system preference.
- Secondary users: keyboard and mobile navigation users.
- Main use cases: switch theme and continue navigating with coherent contrast.
- Edge use cases: live OS theme change while system mode is active; mobile drawer open under either theme.

## 9. Functional Requirements
- Required behaviors: root theme changes must visibly restyle desktop and mobile navigation; active and hover states remain visible; CTA remains dominant; utility trigger remains secondary.
- Inputs: `data-theme="light"` or `data-theme="dark"`.
- Outputs: resolved semantic header styles.
- State changes: none beyond existing ThemeProvider behavior.
- Error states: not applicable.
- Permissions/auth: not applicable.

## 10. Non-Functional Requirements
- Performance: CSS variable-only switching; no new render work.
- Reliability: explicit light and dark token definitions.
- Security/privacy: not applicable.
- Accessibility: readable contrast, visible focus/active states, no interaction regression.
- Maintainability: named header semantic roles and focused regression tests.
- DX: no new dependencies.

## 11. Affected Surfaces
- Files likely affected: `client/src/index.css`, `client/src/theme/ThemeBootstrap.test.js`, workflow artifacts.
- UI surfaces: desktop header/nav, brand, CTA, theme menu, mobile toggle/backdrop/drawer/header/links.
- API/routes/services/database/config/env: none.
- Tests: Vitest static semantic styling coverage plus existing suite.
- Docs: run-scoped workflow evidence only.

## 12. Dependency And Integration Map
- Internal dependencies: ThemeProvider root dataset contract; existing semantic color tokens; Header/ThemeMenu class names.
- External packages/services: none.
- Integration points: CSS custom-property cascade.
- Ordering constraints: add failing assertions first, then token/style migration, then full verification.
- Migration/setup: none.

## 13. Data And State Impact
- Data models/database/state management/cache/session: none.
- Local storage: existing `karebraids-theme` behavior unchanged.
- Backward compatibility: full.

## 14. UX / API / Workflow Expectations
- UX: cohesive light header; unchanged luxury dark header; dominant booking CTA; quiet theme trigger; theme-aware mobile layer.
- API contract: not applicable.
- Workflow behavior: all existing selection/persistence/system behavior remains.
- States: hover/focus/active/current/drawer overlay must remain legible in both themes.

## 15. Execution Strategy
- Recommended approach: introduce explicit header semantic roles under dark and light root selectors, then consume them from all header/nav/menu/mobile selectors and later overrides.
- Suggested sequencing: regression test -> base semantic roles -> selector migration -> refine duplicate overrides -> polish/verify.
- Safe rollout: CSS-only, preserving markup and runtime code.
- Files to inspect: the five user-listed files and existing theme tests.
- Avoid: runtime/theme-provider changes without evidence.

## 16. Verification Strategy
- Automated: targeted Vitest, full client Vitest, ESLint, Vite build, `git diff --check`.
- Manual: run app and capture desktop/mobile light/dark screenshots if browser tooling is available; otherwise code-surface review.
- Test types: static CSS contract plus existing interaction/provider tests.
- Acceptance evidence: explicit tokens in both themes and selectors consuming those tokens.
- Proof: passing checks, screenshot/code review, final diff audit.

## 17. Acceptance Criteria
- [ ] Light mode changes desktop header/nav to a light semantic surface with readable brand, links, active accent, CTA, trigger, border, and shadow.
- [ ] Dark mode preserves the existing dark visual contract through explicit semantic roles.
- [ ] Mobile toggle, backdrop, drawer, header, links, CTA, and ThemeMenu are theme-aware.
- [ ] Theme persistence and live system syncing tests remain passing.
- [ ] Existing tests, lint, and build pass.

## 18. Edge Cases And Failure Modes
- Edge cases: duplicate later CSS overrides; transparent/backdrop alpha differences; CTA foreground contrast in both themes.
- Failure modes: a late dark token override wins; tests inspect the wrong duplicate rule; light backdrop becomes invisible.
- Regression risks: mobile nav CTA hierarchy and ThemeMenu utility hierarchy.
- Recovery: inspect cascade order and migrate all matching selectors.

## 19. Risks And Mitigations
- Technical: large legacy stylesheet with duplicate rules; mitigate via `rg` audit and semantic token usage assertions.
- Product/UX: light header too flat or low contrast; mitigate with themed border/shadow/accent roles.
- Security: none.
- Scope: avoid unrelated page token cleanup.

## 20. Assumptions
- Explicit assumptions: current markup and runtime behavior are correct; defect is CSS cascade/token selection.
- Confidence: high after inspection.
- Revisit if wrong: only if browser verification reveals markup-specific defects.

## 21. Open Questions
- Blocking: none.
- Non-blocking: none.
- Execution impact: none.

## 22. Task Extraction Notes
- Vertical boundary: one user-visible task covering desktop and mobile theme-aware navigation plus regression proof.
- First task: add semantic header contract test and migrate CSS.
- Ordering: Build test/tokens, Refine complete selector coverage, Polish verification/review.
- Do not separate runtime theme logic because no behavior change is needed.
- Three-pass loop: each pass records Red/Green/Refactor evidence, with later Red phases using strengthened static assertions or audit findings.

Applied skill: design-taste-frontend

## Approval
Approved for implementation by the user's direct instruction that requirements are fully defined and to inspect, implement, test, and return the complete diff.
