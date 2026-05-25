# Fix Missing Homepage Images Spec

## 1. Metadata
- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-05-25
- Request ID / slug: `fix-homepage-missing-images`
- Request source: latest user prompt
- Execution mode: `complete-workflow`
- Request classification: `bugfix`
- Scope level: small
- Risk level: low-medium

## 2. Original Request
- Raw user request: `some of the images are not showing on the home page. please fix it`
- Normalized request: Fix the home page so all intended images render visibly and reliably across the current homepage sections.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers
- Questions asked: none.
- Answers received: none.
- Questions skipped: No user-facing question was needed because the repo and browser inspection identify a likely frontend reveal/image visibility failure.
- Remaining open questions: The exact images seen missing by the user are not named; treat every home page image section as in scope for verification.

## 4. Problem Definition
- Problem being solved: Some homepage images are present in markup but not visible to users.
- Why it matters: The homepage was intentionally made image-led; hidden images weaken the brand presentation and make sections look incomplete.
- Current pain point: A user can scroll the home page and encounter image areas that remain blank or invisible.
- Expected value: The homepage reliably displays its hero, trust, service, why, gallery preview, testimonial, and CTA imagery.

## 5. Current State Analysis
- Existing behavior: `Home.jsx` renders gallery-driven images from `galleryItems` in `client/src/constants/content.js`. The image URLs returned HTTP 200 in a HEAD check.
- Existing architecture/components: React/Vite app with CSS in `client/src/index.css`; reveal effects are controlled by `client/src/hooks/useRevealOnScroll.js`.
- Existing files/modules likely involved: `client/src/pages/Home.jsx`, `client/src/hooks/useRevealOnScroll.js`, `client/src/index.css`, `client/test/site-pages.test.jsx`.
- Existing data flow: `Home.jsx` imports `galleryItems`, assigns those images to multiple homepage sections, and uses `data-reveal` plus IntersectionObserver-driven `.is-visible` classes.
- Existing API/UI/CLI/workflow behavior: No backend or API involvement. Images are remote browser assets.
- Existing tests or verification coverage: `client/test/site-pages.test.jsx` checks image markup and sources, but it does not currently assert that revealed image elements become visible or that no home images remain hidden after scrolling.

## 6. Desired End State
- Expected final behavior: Every intended homepage image loads and becomes visible when its section is in or near the viewport.
- User-facing outcome: No blank image panels or invisible image grids on the home page under normal browsing.
- Developer-facing outcome: A focused regression test covers the image visibility behavior that failed.
- System/workflow outcome: Workflow artifacts document the frontend bug fix, verification, and design-taste application.
- Backward compatibility expectations: Existing homepage visual structure, hero carousel behavior, route behavior, and gallery content remain compatible.

## 7. Scope
- In scope:
  - Fix the homepage image visibility/rendering issue.
  - Adjust reveal-on-scroll behavior if it is the root cause.
  - Add or update a focused frontend test for image visibility.
  - Verify with client tests, lint/build if practical, and a browser check.
- Out of scope:
  - Replacing the gallery images with new assets unless current URLs prove broken during implementation.
  - Redesigning the home page.
  - Backend, admin, booking, deployment, database, or environment changes.
- Non-goals:
  - Full image asset migration.
  - New dependencies.
  - Broad CSS refactors.
- Explicit boundaries: Keep implementation changes minimal and localized to the home page/reveal/image visibility path.

## 8. Users And Use Cases
- Primary users: Public site visitors viewing the KareBraids home page.
- Secondary users: Site owner reviewing the homepage presentation.
- Main use cases:
  - Visit the home page.
  - Scroll through visual sections.
  - See all intended images without blank panels.
- Edge use cases:
  - Slow image loading.
  - Reduced motion preferences.
  - Browsers with or without IntersectionObserver support.
  - Mobile viewport scrolling.

## 9. Functional Requirements
- Required behaviors:
  - Homepage image elements must not remain hidden solely because a reveal class was missed.
  - Existing reveal animations should still work for text and image sections where possible.
  - Hero carousel slides remain functional and accessible.
  - Lazy-loaded below-fold images still load when users approach/enter their sections.
- Inputs: Browser scroll/viewport state and existing `galleryItems` image URLs.
- Outputs: Visible image content on the home page.
- State changes: Reveal state may update DOM classes such as `.is-visible`.
- Error states: If an image source fails, the page should not trap it in an invisible state; optional graceful fallback may be added if low risk.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements
- Performance expectations: Keep IntersectionObserver/lightweight CSS behavior; no new heavy runtime dependency.
- Reliability expectations: Reveal behavior should be deterministic after initial mount and while scrolling.
- Security/privacy expectations: Do not add secrets, credentials, or unsafe external scripts.
- Accessibility expectations: Preserve existing meaningful alt text and decorative `alt=""`/`aria-hidden` semantics.
- Maintainability expectations: Keep logic small and easy to test.
- DX expectations: Tests should clearly identify image visibility regressions.

## 11. Affected Surfaces
- Files likely affected:
  - `client/src/hooks/useRevealOnScroll.js`
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Directories likely affected:
  - `client/src/`
  - `client/test/`
  - `_workflow/runs/dev/`
- UI surfaces: Home page image sections and reveal animation behavior.
- API routes: Not applicable.
- Components: `Home`, possibly shared reveal hook consumers.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests: Frontend Vitest/React Testing Library, plus browser verification.
- Docs: Run-scoped workflow artifacts only.
- Workflow artifacts: `_workflow/runs/dev/request.md`, `spec.md`, `tasks.md` after approval, `progress.md`, `handoff.md`, `review.md`, `verification.md`, `release-notes.md`, `summary.md`.

## 12. Dependency And Integration Map
- Internal dependencies:
  - `Home.jsx` depends on `galleryItems`.
  - `Home.jsx` depends on `useRevealOnScroll`.
  - CSS selectors under `.reveal-ready [data-reveal]` control visibility.
- External packages/services:
  - Existing React/Vite/Tailwind v4 stack.
  - Remote Pexels image CDN used by existing content.
- Integration points:
  - Browser IntersectionObserver.
  - Lazy image loading.
  - Existing CSS reveal classes.
- Ordering constraints:
  - Add/update failing frontend test first.
  - Implement smallest visibility fix.
  - Verify browser behavior after automated tests.
- Migration/setup requirements: none.

## 13. Data And State Impact
- Data models: Not applicable.
- Database changes: none.
- State management changes: none.
- Cache/session/local storage impact: none.
- Backward compatibility impact: Existing image data remains unchanged unless a source is proven broken.

## 14. UX / API / Workflow Expectations
- UX expectations:
  - Images appear in their intended layouts without requiring extra unrelated scroll nudges.
  - Existing animation remains subtle and does not cause layout shifts.
  - Mobile layout stays clean with no incoherent overlaps.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Follow run-scoped workflow with approval before task planning.
- Error handling expectations: Avoid blank sections from reveal-state bugs; document if an external CDN failure is outside the app's control.
- Empty/loading/success/failure states: Not a data-fetching surface; image fallback may be considered if needed, but no loading spinner should be introduced.

## 15. Execution Strategy
- Recommended implementation approach:
  - Add a regression test that proves image reveal/visibility behavior for homepage image sections.
  - Inspect whether the current issue is caused by `data-reveal` being applied directly to images, hook timing, IntersectionObserver thresholds, or CSS.
  - Prefer fixing `useRevealOnScroll` to reveal already-visible elements reliably if the issue is shared.
  - Otherwise, remove/adjust direct `data-reveal` usage on image elements and reveal their containing section instead.
- Suggested sequencing:
  1. Create focused failing test.
  2. Implement minimal fix.
  3. Refine for reduced motion/observer fallback.
  4. Polish with browser checks.
- Safe rollout/migration approach: Single frontend patch with no data migration.
- Files to inspect before editing:
  - `client/src/pages/Home.jsx`
  - `client/src/hooks/useRevealOnScroll.js`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Decisions to avoid until more evidence exists:
  - Do not replace all image URLs unless browser verification shows actual source failures.
  - Do not introduce local asset downloading without explicit need.

## 16. Verification Strategy
- Required automated checks:
  - `npm test --prefix client -- site-pages.test.jsx`
  - `npm test --prefix client` if practical.
  - `npm run lint --prefix client`
  - `npm run build --prefix client`
- Required manual checks:
  - Browser check of home page at desktop and mobile widths after scrolling through visual sections.
- Test types needed:
  - React Testing Library regression test for reveal/image visibility.
  - Browser runtime check for actual rendered image visibility and load status.
- Build/lint/typecheck expectations:
  - Client lint/build should pass.
- Acceptance evidence required:
  - No homepage image elements remain unintentionally hidden after their section is in view.
  - Existing carousel and homepage structure remain intact.
- Proof of completion:
  - Passing tests and browser check results documented in progress/review/summary.

## 17. Acceptance Criteria
- [ ] Homepage hero carousel images still render and rotate/select as before.
- [ ] Trust thumbnail images, service tile images, why panel image, gallery preview images, testimonial visual images, and CTA image render visibly when their sections are reached.
- [ ] The specific missing-image failure is covered by a frontend regression test.
- [ ] Existing image alt/decorative semantics remain correct.
- [ ] Mobile and desktop home page checks show no blank image panels caused by app styling/state.
- [ ] No backend, env, database, deployment, or unrelated route behavior changes are introduced.
- [ ] Relevant client test, lint, and build verification is attempted and documented.

## 18. Edge Cases And Failure Modes
- Edge cases:
  - Fast scrolling can skip an IntersectionObserver callback.
  - Images can be lazy-loaded after reveal state is calculated.
  - Browser lacks IntersectionObserver.
  - User has reduced motion enabled.
- Failure modes:
  - `data-reveal` elements remain opacity `0`.
  - Image URL fails independently of app logic.
  - Fix accidentally disables intended reveal animation globally.
- Regression risks:
  - About/gallery pages also use image/reveal styling.
  - Hero carousel opacity states are intentional for inactive slides and must not be mistaken for broken images.
- Recovery expectations:
  - Scope fixes only to app-owned visibility failures; document external CDN failures separately if found.

## 19. Risks And Mitigations
- Technical risks:
  - IntersectionObserver behavior differs between jsdom and browsers.
  - Mitigation: combine unit regression with real-browser verification.
- Product/UX risks:
  - Removing all reveal styling could flatten the homepage.
  - Mitigation: preserve animations where reliable; reveal containers instead of hiding important image pixels if needed.
- Security risks:
  - none expected.
- Scope risks:
  - Temptation to migrate images/local assets.
  - Mitigation: only replace sources if proven broken.
- Mitigation plan:
  - Keep changes small, prove with tests, and run browser checks.

## 20. Assumptions
- Explicit assumptions:
  - The reported missing images are on the current React home page.
  - The remote Pexels image URLs are not the primary cause because all current URLs returned HTTP 200 during intake.
  - The likely cause is reveal/lazy-load timing or CSS keeping some images hidden.
- Confidence level: medium.
- What to revisit if assumptions are wrong:
  - If browser/network checks after implementation show specific CDN failures, replace those specific image URLs or add a graceful fallback.

## 21. Open Questions
- Blocking questions: none.
- Non-blocking questions:
  - Which exact home page images did the user observe missing?
- Execution impact:
  - The fix will verify all home page image sections, so exact user screenshot is not required to proceed.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - One task: Fix homepage image visibility and prove it with tests/browser verification.
- Suggested first task:
  - `TASK-001: Make homepage images reveal reliably`
- Suggested task ordering:
  - Single vertical task is sufficient because this is a small frontend bug fix.
- Areas that should not become separate tasks:
  - Backend/API work.
  - Full redesign.
  - Image asset migration unless evidence requires it.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Build: add failing visibility test and minimal fix.
  - Refine: harden observer/lazy/reduced-motion behavior.
  - Polish: browser-check desktop/mobile and run full client verification.

## 23. Frontend Taste Application
- Applied: yes.
- Skill source: `.agents/skills/design-taste-frontend/SKILL.md`
- Relevant application:
  - No new dependency without package verification.
  - Tailwind v4 confirmed from `client/package.json`; current styling is mostly plain CSS, so follow existing CSS convention for touched files.
  - Preserve mobile collapse and avoid layout shifts.
  - Preserve accessible alt/decorative semantics.
  - Do not add decorative gimmicks, new palettes, emojis, or unrelated redesign.
  - Final pre-flight matrix must be checked before final output.
