# Detailed Spec — About Page Cream Background Unification

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-05
- Request ID / slug: `about-page-background-unification`
- Request source: latest direct user prompt
- Execution mode: complete-workflow
- Request classification: frontend UI styling refinement
- Scope level: single page/component styling and tests
- Risk level: low

## 2. Original Request
- Raw user request: update the KareBraids About page so the full page uses `#F5F1EE`, removing dark full-width section backgrounds except image overlays.
- Normalized request: keep the current About layout/content but make the page and non-banner sections consistently cream, with subtle light cards and readable text.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: none; request is specific.
- Answers received: not applicable.
- Questions skipped: none blocking.
- Remaining open questions: none.

## 4. Problem Definition
- Problem being solved: About sections visually alternate between cream/light and dark blocks, creating an inconsistent page background.
- Why it matters: the page should feel calmer, more premium, and visually unified.
- Current pain point: Specialties and banner section containers used dark background classes.
- Expected value: consistent cream page flow while preserving image-overlay readability.

## 5. Current State Analysis
- Existing behavior: About root is cream, but several sections/components use dark or off-cream backgrounds.
- Existing architecture/components: About is componentized under `client/src/components/about/` and composed in `client/src/pages/About.jsx`.
- Existing files/modules likely involved: About page, About section components, About tests, workflow artifacts.
- Existing data flow: static data only.
- Existing API/UI/CLI/workflow behavior: static `/about` route.
- Existing tests or verification coverage: About component tests and site smoke tests.

## 6. Desired End State
- Expected final behavior: scrolling `/about` shows one consistent cream page background except image overlay content.
- User-facing outcome: no large dark section block interrupts the About page.
- Developer-facing outcome: background rules are asserted by tests.
- System/workflow outcome: routing unaffected and build passes.
- Backward compatibility expectations: no content/layout/API changes.

## 7. Scope
- In scope: Tailwind class adjustments for About root/sections/cards and a test for non-banner section backgrounds.
- Out of scope: content changes, layout changes, navbar/footer changes, backend/API changes, dependencies.
- Non-goals: redesigning About again.
- Explicit boundaries: dark treatment may remain inside image overlays and image cards for text legibility.

## 8. Users And Use Cases
- Primary users: prospective KareBraids clients browsing About.
- Secondary users: mobile visitors scanning trust and service content.
- Main use cases: scroll About without abrupt large dark blocks.
- Edge use cases: image card with missing image should remain readable on light card.

## 9. Functional Requirements
- Required behaviors: root wrapper uses `bg-[#F5F1EE] text-[#1F1F1F]`; non-banner sections use `bg-[#F5F1EE]`; cards use subtle light treatment.
- Inputs: existing components and static data.
- Outputs: same content with consistent styling.
- State changes: none.
- Error states: no-image specialty card remains readable.
- Permissions/auth expectations: none.

## 10. Non-Functional Requirements
- Performance expectations: no new runtime cost.
- Reliability expectations: build/tests pass.
- Security/privacy expectations: no secrets.
- Accessibility expectations: contrast remains readable.
- Maintainability expectations: class updates remain local to About components.
- DX expectations: tests document background rule.

## 11. Affected Surfaces
- Files likely affected: `client/src/pages/About.jsx`, `client/src/components/about/*.jsx`, `client/src/pages/About.test.jsx`.
- Directories likely affected: `client/src/components/about`, `client/src/pages`, workflow artifacts.
- UI surfaces: `/about` only.
- API routes: none.
- Components: AboutHero, MeetKaren, WhyChooseUs, ExperienceBanner, SpecialtiesGrid, Testimonials, TrustStats, AboutCTA.
- Services: none.
- Database/schema: none.
- Config/env vars: none.
- Tests: About component test.
- Docs: workflow artifacts.

## 12. Dependency And Integration Map
- Internal dependencies: existing About components and shared Button.
- External packages/services: none.
- Integration points: React route remains unchanged.
- Ordering constraints: add failing test, update styles, verify.
- Migration/setup requirements: none.

## 13. Data And State Impact
- Data models: none.
- Database changes: none.
- State management changes: none.
- Cache/session/local storage impact: none.
- Backward compatibility impact: none.

## 14. UX / API / Workflow Expectations
- UX expectations: unified cream background, subtle light cards, readable dark text, image overlays allowed.
- API contract expectations: none.
- CLI/workflow behavior: existing scripts.
- Error handling expectations: no-image cards remain readable.
- Empty/loading/success/failure states: not applicable.

## 15. Execution Strategy
- Recommended implementation approach: update root and section/card Tailwind classes; avoid changing layout/content.
- Suggested sequencing: failing test -> style updates -> targeted/full verification.
- Safe rollout/migration approach: CSS class-only changes.
- Files to inspect before editing: About components and tests.
- Decisions to avoid until more evidence exists: global CSS changes.

## 16. Verification Strategy
- Required automated checks: About test, full client tests, client build, server tests, lint attempt, diff check, Fallow.
- Required manual checks: code-surface class review; screenshot unavailable if no browser tooling.
- Test types needed: render/class test.
- Build/lint/typecheck expectations: build passes; known unrelated lint failures documented.
- Acceptance evidence required: test asserting cream root/non-banner sections and no dark full-width classes.
- Proof of completion: passing tests/build and diff audit.

## 17. Acceptance Criteria
- [x] `/about` root uses `#F5F1EE` as main background.
- [x] Non-banner About sections use `#F5F1EE` and do not use dark full-width background classes.
- [x] Image banner overlays remain readable.
- [x] Cards use subtle light backgrounds and borders.
- [x] Text remains readable with brand accents.
- [x] Navbar/footer untouched.
- [x] `npm run build --prefix client` passes.

## 18. Edge Cases And Failure Modes
- Edge cases: missing specialty image, image banner load failure.
- Failure modes: dark full-width section class accidentally remains.
- Regression risks: tests become too implementation-aware; mitigated by focusing on section background acceptance.
- Recovery expectations: adjust only styling classes.

## 19. Risks And Mitigations
- Technical risks: Tailwind arbitrary class test matching; mitigated by static class strings.
- Product/UX risks: image banner text depends on overlay if image fails; section fallback background is cream per request.
- Security risks: none.
- Scope risks: accidental layout/content change; mitigated by diff review.
- Mitigation plan: targeted tests and diff audit.

## 20. Assumptions
- Explicit assumptions: dark overlay content inside image banners/cards is acceptable for readability.
- Confidence level: high.
- What to revisit if assumptions are wrong: convert image banners to light text-over-cream layouts.

## 21. Open Questions
- Blocking questions: none.
- Non-blocking questions: none.
- Execution impact: none.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: one styling refinement task.
- Suggested first task: unify About backgrounds and update test.
- Suggested task ordering: test, class changes, verification, artifacts.
- Areas that should not become separate tasks: backend/API/navbar/footer.
- How the 3-pass Build -> Refine -> Polish loop should apply: Red test, green style update, polish verification.
