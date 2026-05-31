# Detailed Spec: About Page Dark Luxury Alignment

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-05-31
- Request ID / slug: `about-page-dark-luxury-alignment`
- Request source: direct user prompt normalized into `_workflow/runs/work/request.md`
- Execution mode: `complete-workflow`
- Request classification: frontend UI polish
- Scope level: narrow About-page-specific CSS and tests
- Risk level: low to moderate because styles are centralized

## 2. Original Request
- Raw user request: Align About with Home/Gallery/Booking dark luxury styling; remove heavy brown/grey panels; preserve content, layout, mobile responsiveness, routing, navbar, CTA, and unrelated pages.
- Normalized request: Use subtle transparent About surfaces and remove overlapping About backing panels without changing behavior.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: None; repository inspection resolved the implementation surface.
- Answers received: User approved this saved spec with `approve spec`.
- Questions skipped: Repo-discoverable CSS, route, content, and responsive behavior questions.
- Remaining open questions: None blocking.

## 4. Problem Definition
- Problem being solved: About founder-story surfaces are too heavy and dashboard-like.
- Why it matters: About should remain cohesive with premium public pages.
- Current pain point: Brown/grey gradients and overlapping cards distract from editorial content.
- Expected value: Calm, cohesive, premium About presentation.

## 5. Current State Analysis
- Existing behavior: `About.jsx` renders static founder copy, `/booking` CTA, and image in a responsive two-column section.
- Existing architecture/components: React Router page, shared Button, centralized `client/src/index.css`.
- Existing files/modules likely involved: `client/src/index.css`, `client/test/site-pages.test.jsx`.
- Existing data flow: Static copy; founder image from `galleryItems[2].image`.
- Existing API/UI/CLI/workflow behavior: No API impact; mobile stacks at `max-width: 840px`.
- Existing tests or verification coverage: About render and old pseudo-element styling assertions exist.

## 6. Desired End State
- Expected final behavior: Preserve structure and content with requested subtle founder card and minimally bordered image.
- User-facing outcome: About visually aligns with Home/Gallery/Booking.
- Developer-facing outcome: About-specific CSS contract protects against heavy backing panels.
- System/workflow outcome: Routing and mobile behavior remain intact.
- Backward compatibility expectations: No unrelated implementation changes.

## 7. Scope
- In scope: About-specific CSS, Vitest contract updates, run-scoped and polish artifacts.
- Out of scope: Copy, image, JSX, route, navbar, API, schema, dependency, or unrelated page changes unless a concrete test requires a minimal exception.
- Non-goals: Shared design-system refactor or new decoration.
- Explicit boundaries: Scope CSS to `.dark-about-page`.

## 8. Users And Use Cases
- Primary users: Prospective clients reading founder story.
- Secondary users: Returning public-site visitors.
- Main use cases: Read story, view image, use booking CTA and navbar.
- Edge use cases: Narrow phone and keyboard navigation.

## 9. Functional Requirements
- Required behaviors: Preserve About content, route, CTA, navbar, and mobile stack.
- Inputs: `/about` route.
- Outputs: Minimal dark-luxury About UI.
- State changes: None.
- Error states: Not applicable.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: No runtime additions.
- Reliability expectations: No unrelated public-page regressions.
- Security/privacy expectations: No sensitive data impact.
- Accessibility expectations: Preserve readable contrast, heading, alt text, and focus behavior.
- Maintainability expectations: Narrow CSS selectors and tests.
- DX expectations: Vitest, lint, and build remain green.

## 11. Affected Surfaces
- Files likely affected: `client/src/index.css`, `client/test/site-pages.test.jsx`, workflow artifacts.
- Directories likely affected: `client/src`, `client/test`, `_workflow/runs/work`, `.workflow/artifacts/polish-ui`.
- UI surfaces: `/about`.
- API routes: None.
- Components: Existing About and Button remain unchanged.
- Services: None.
- Database/schema: None.
- Config/env vars: None.
- Tests: About CSS contract.
- Docs: Workflow artifacts.
- Workflow artifacts: request, spec, tasks, progress, handoff, review, release notes, summary, verification, polish artifacts.

## 12. Dependency And Integration Map
- Internal dependencies: About classes, shared stylesheet cascade, responsive rule, Button route.
- External packages/services: Existing React, Router, Vitest only.
- Integration points: Shared public shell.
- Ordering constraints: TDD-first contract before CSS.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: None.
- Database changes: None.
- State management changes: None.
- Cache/session/local storage impact: None.
- Backward compatibility impact: None.

## 14. UX / API / Workflow Expectations
- UX expectations: Shared dark background; story card `rgba(255, 255, 255, 0.02)` with `1px solid rgba(255, 255, 255, 0.08)`; subtle image border; no overlapping cards; restrained gold; clean mobile stack.
- API contract expectations: Not applicable.
- CLI/workflow behavior: TDD-first Build -> Refine -> Polish.
- Error handling expectations: Not applicable.
- Empty/loading/success/failure states: Static content; not applicable.

## 15. Execution Strategy
- Recommended implementation approach: Replace stale test expectations, append narrow About overrides after legacy CSS, remove backing pseudo-elements, retain layout.
- Suggested sequencing: Build surface contract; Refine responsive contract; Polish full checks and audit.
- Safe rollout/migration approach: CSS-only scoped override.
- Files to inspect before editing: About.jsx, index.css, site-pages.test.jsx, handoff, progress, summary.
- Decisions to avoid until more evidence exists: JSX and shared token changes.

## 16. Verification Strategy
- Required automated checks: targeted and full client Vitest, client lint/build, server Jest, `git diff --check`.
- Required manual checks: local HTTP smoke; screenshot if browser automation exists, otherwise code-surface review.
- Test types needed: CSS contract and page render regression.
- Build/lint/typecheck expectations: lint and build pass.
- Acceptance evidence required: CSS contract, route/content render, mobile stack, scoped diff.
- Proof of completion: Checks recorded in verification artifact.

## 17. Acceptance Criteria
- [ ] No heavy About-specific brown/grey panels remain.
- [ ] Founder story uses requested subtle surface and border.
- [ ] Image has subtle border only without backing card.
- [ ] Shared dark background remains cohesive.
- [ ] Gold remains restrained.
- [ ] Mobile remains clean and readable.
- [ ] Existing content, route, navbar, and CTA behavior remain intact.
- [ ] Home, Gallery, Services, and Booking implementation remain unaffected.

## 18. Edge Cases And Failure Modes
- Edge cases: Narrow width and stylesheet cascade order.
- Failure modes: Legacy pseudo-elements remain effective; broad selector regresses another page.
- Regression risks: Shared stylesheet mutation.
- Recovery expectations: Narrow late overrides and exact-command reruns.

## 19. Risks And Mitigations
- Technical risks: Layered stylesheet. Mitigation: About-specific late selectors and contract tests.
- Product/UX risks: Card becomes too flat. Mitigation: retain requested subtle border.
- Security risks: None.
- Scope risks: Unrelated refactor. Mitigation: final diff audit.
- Mitigation plan: TDD-first verification and scoped CSS.

## 20. Assumptions
- Explicit assumptions: Existing content/layout/CTA are approved; CSS-only change is sufficient; browser screenshot automation may be unavailable.
- Confidence level: High.
- What to revisit if assumptions are wrong: Pause before JSX changes.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions: Browser automation availability.
- Execution impact: Use allowed code-surface fallback if unavailable.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: One About UI alignment task.
- Suggested first task: `TASK-001: Align About founder story with shared dark-luxury styling`.
- Suggested task ordering: Single task through three iterations.
- Areas that should not become separate tasks: Shared tokens, copy, routes, unrelated pages.
- How the 3-pass Build -> Refine -> Polish loop should apply: Build surfaces; Refine responsive/restraint contract; Polish full verification and audit.

Applied skill: design-taste-frontend
