# Detailed Spec: Fix Vite React Production Routing

## 1. Metadata
- Spec filename: `_workflow/runs/work/spec.md`
- Date: 2026-06-04
- Request ID / slug: fix-vite-react-production-routing
- Request source: latest direct user prompt
- Execution mode: complete-workflow
- Request classification: frontend routing/deployment fix
- Scope level: small
- Risk level: low

## 2. Original Request
- Raw user request: Fix the hero “View Styles” full document navigation and Vercel `/gallery` refresh 404.
- Normalized request: Make the home hero View Styles CTA use React Router client-side navigation to `/gallery`, and add Vercel SPA fallback rewrites for the Vite client deployment.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/work/request.md`

## 3. Questions And Answers
- Questions asked: none; repo inspection answered implementation placement and Button support.
- Answers received: not applicable.
- Questions skipped: all, because request was explicit and low-risk.
- Remaining open questions: exact Vercel project root cannot be verified locally, but repo structure and user instruction indicate client-level config.

## 4. Problem Definition
- Problem being solved: BrowserRouter routes are not consistently served/navigated in production.
- Why it matters: Customers should reach the gallery without page reloads or Vercel 404s.
- Current pain point: Hero CTA uses a plain anchor and Vercel lacks SPA fallback config.
- Expected value: Reliable gallery navigation from home and direct deep-link support after deployment.

## 5. Current State Analysis
- Existing behavior: `/gallery` route exists in React Router, but the hero CTA is a literal `<a href="/gallery">`.
- Existing architecture/components: `BrowserRouter` wraps app providers; `App.jsx` declares route tree; shared `Button` supports `to` and renders `Link`.
- Existing files/modules likely involved: `client/src/components/home/Hero.jsx`, `client/vercel.json`, `client/test/site-pages.test.jsx`, `client/test/deployment.test.js`.
- Existing data flow: no API/data change.
- Existing API/UI/CLI/workflow behavior: Vite static client uses BrowserRouter and must serve `index.html` for client routes.
- Existing tests or verification coverage: homepage tests assert CTA hrefs; no deployment config test existed.

## 6. Desired End State
- Expected final behavior: View Styles navigates via React Router to `/gallery`; Vercel serves app entry for non-asset deep links.
- User-facing outcome: No full page reload from the CTA; `/gallery` refresh works after deployment.
- Developer-facing outcome: Tests cover CTA client routing and Vercel rewrite config.
- System/workflow outcome: Vite build remains green.
- Backward compatibility expectations: Existing routes and catch-all redirect stay unchanged.

## 7. Scope
- In scope: hero CTA routing, Vercel rewrite config, tests, build/test validation.
- Out of scope: route redesign, backend/API changes, changing unknown-route behavior, Vercel production deployment.
- Non-goals: modify root package structure or add new dependencies.
- Explicit boundaries: preserve `btn btn-secondary` and visible label `View Styles`.

## 8. Users And Use Cases
- Primary users: site visitors browsing braid styles.
- Secondary users: developers/deployers maintaining Vercel app routing.
- Main use cases: click View Styles from home; refresh/deep-link `/gallery`.
- Edge use cases: `/services`, `/booking`, `/contact`, and unknown app routes continue to render/redirect in app.

## 9. Functional Requirements
- Required behaviors: CTA renders as React Router link to `/gallery`; Vercel config includes `{ "source": "/(.*)", "destination": "/" }` rewrite.
- Inputs: user click; direct route request.
- Outputs: gallery route rendered; Vercel serves SPA entry.
- State changes: browser history updates client-side.
- Error states: unknown app routes still use existing `Navigate` to `/`.
- Permissions/auth expectations: not applicable.

## 10. Non-Functional Requirements
- Performance expectations: avoid full document reload for CTA.
- Reliability expectations: deep links survive refresh on Vercel after deployment.
- Security/privacy expectations: no secrets or credentials.
- Accessibility expectations: link remains accessible with same visible text.
- Maintainability expectations: use existing shared Button if possible.
- DX expectations: no new dependency.

## 11. Affected Surfaces
- Files likely affected: `client/src/components/home/Hero.jsx`, `client/vercel.json`, tests.
- Directories likely affected: `client/src/components/home/`, `client/test/`, `client/`.
- UI surfaces: homepage hero CTA.
- API routes: none.
- Components: `Hero`, existing `Button`.
- Services: none.
- Database/schema: none.
- Config/env vars: Vercel config only.
- Tests: client Vitest tests.
- Docs: workflow artifacts.

## 12. Dependency And Integration Map
- Internal dependencies: `Hero` imports `Button`; `Button` imports React Router `Link`.
- External packages/services: Vercel static deployment behavior.
- Integration points: Vite build output, Vercel rewrite resolution.
- Ordering constraints: tests before implementation where possible.
- Migration/setup requirements: deploy client after merge.

## 13. Data And State Impact
- Data models: none.
- Database changes: none.
- State management changes: none.
- Cache/session/local storage impact: none.
- Backward compatibility impact: no breaking app API changes.

## 14. UX / API / Workflow Expectations
- UX expectations: same styling and label.
- API contract expectations: not applicable.
- CLI/workflow behavior: `npm run build --prefix client` passes.
- Error handling expectations: unknown app routes unchanged.
- Empty/loading/success/failure states: unchanged.

## 15. Execution Strategy
- Recommended implementation approach: first extend tests to prove the CTA click reaches Gallery and Vercel config exists, then replace anchor with shared Button and add client Vercel config.
- Suggested sequencing: tests, hero update, config add, targeted tests, full build/test/lint.
- Safe rollout/migration approach: merge and redeploy Vercel client.
- Files to inspect before editing: `Hero.jsx`, `Button.jsx`, `App.jsx`, `providers.jsx`, Vite config, tests.
- Decisions to avoid until more evidence exists: changing route definitions or app unknown-route behavior.

## 16. Verification Strategy
- Required automated checks: targeted Vitest, full client test, Vite build.
- Required manual checks: live Vercel refresh after deployment.
- Test types needed: unit/integration route rendering and config shape test.
- Build/lint/typecheck expectations: build pass; lint attempted and documented if pre-existing issues block.
- Acceptance evidence required: command outputs and diff audit.
- Proof of completion: changed CTA uses Button `to`, config JSON exists with expected rewrite, tests pass.

## 17. Acceptance Criteria
- [x] Hero View Styles CTA uses client-side React Router navigation to `/gallery`.
- [x] Visible label remains `View Styles`.
- [x] Styling remains `btn btn-secondary`.
- [x] Vercel rewrite config exists where the client app deployment can read it.
- [x] Client build passes.
- [x] Existing client routes continue to be covered by app tests.

## 18. Edge Cases And Failure Modes
- Edge cases: unknown app route catch-all remains unchanged; query-string gallery filters remain unchanged.
- Failure modes: Vercel project root mismatch could require moving/duplicating config.
- Regression risks: Button adds icon to secondary CTA, consistent with shared component behavior.
- Recovery expectations: if Vercel still 404s, verify Vercel project root and copy config to configured root.

## 19. Risks And Mitigations
- Technical risks: config path mismatch. Mitigation: user specified repo structure and client-level app; test asserts `client/vercel.json`.
- Product/UX risks: minor DOM difference from shared Button icon; acceptable because existing Button pattern already used in hero.
- Security risks: none.
- Scope risks: avoid fixing unrelated lint issues.
- Mitigation plan: keep diff minimal.

## 20. Assumptions
- Explicit assumptions: Vercel deploys the `client` directory as the app root.
- Confidence level: high based on `npm run build --prefix client` and request wording.
- What to revisit if assumptions are wrong: Vercel project root/build settings.

## 21. Open Questions
- Blocking questions: none.
- Non-blocking questions: whether a root-level `vercel.json` is also needed for alternate deployment settings.
- Execution impact: none for current requested repo structure.

## 22. Task Extraction Notes
- Suggested vertical task boundaries: one CTA routing task and one Vercel fallback task.
- Suggested first task: update CTA via shared Button.
- Suggested task ordering: CTA first, fallback second, final verification.
- Areas that should not become separate tasks: backend, route refactors, styling redesign.
- How the 3-pass Build -> Refine -> Polish loop should apply: compact TDD evidence for each small task.
