# Detailed Spec: Homepage Visual Optimization

## 1. Metadata

- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-05-24
- Request ID / slug: homepage-visual-optimization
- Request source: Latest direct user prompt synced to `_workflow/runs/dev/request.md`
- Execution mode: complete-workflow after explicit spec approval
- Request classification: feature
- Scope level: medium-small
- Risk level: medium-low

## 2. Original Request

- Raw user request: Optimize the KareBraids homepage so it feels less text-heavy and more visual. Keep the current brand style and layout direction. Do not redesign the whole site. Use existing `galleryItems` images from `client/src/constants/content.js`. Every homepage section should include some visual/image element. Keep copy concise and premium. Update only the homepage and CSS unless a small reusable helper is clearly needed. Preserve the rotating hero carousel. Add a gallery-image thumbnail cluster to the trust strip. Make featured services more visual with image cards and readable overlays. Add a process/detail image panel to Why choose KareBraids. Keep gallery preview as an image grid. Add visuals to testimonials. Add a gallery-image-backed CTA with dark/green overlay. No new assets, no new dependencies, accessible, mobile responsive, reduced-motion aware, minimal clean changes. Expected implementation files are `client/src/pages/Home.jsx` and `client/src/index.css`.
- Normalized request: Make the existing homepage more image-led section by section, using only `galleryItems` imagery, while preserving brand direction, layout style, hero carousel behavior, accessibility, responsiveness, and minimal implementation scope.
- Source prompt / `_workflow/runs/dev/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers

- Questions asked: None.
- Answers received: Not applicable.
- Questions skipped: Clarifying questions skipped because the prompt gives concrete section-by-section requirements, constraints, expected files, and acceptance criteria.
- Remaining open questions: None blocking. Exact gallery image pairings can be selected during implementation.

## 4. Problem Definition

- Problem being solved: The homepage communicates the KareBraids offer but relies heavily on text in several sections. The user wants a more visual, premium presentation without a full redesign.
- Why it matters: Hair braiding is highly visual. More image-led sections can communicate quality, detail, and trust faster than text-heavy content.
- Current pain point: Outside the hero and gallery preview, sections such as trust, services, why choose, testimonials, and CTA are mostly text or abstract styling.
- Expected value: A homepage that feels richer, more premium, easier to scan, and better aligned with the visual nature of braid styling.

## 5. Current State Analysis

- Existing behavior: `Home.jsx` renders hero carousel, trust strip, featured services, why choose section, gallery preview, testimonials, and CTA. The hero carousel uses the first five `galleryItems`, rotates every 4500ms, exposes clickable dots, and respects `prefers-reduced-motion`.
- Existing architecture/components: React Vite frontend with CSS in `client/src/index.css`. Homepage imports `Button`, `galleryItems`, `services`, `testimonials`, and `useRevealOnScroll`.
- Existing files/modules likely involved:
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/src/constants/content.js` for read-only source data
  - `client/test/site-pages.test.jsx` for focused page tests if needed
- Existing data flow: Static constants from `content.js` render directly in homepage markup. No API, Redux, or TanStack Query involvement.
- Existing API/UI/CLI/workflow behavior: UI-only static homepage. No backend or API behavior affected.
- Existing tests or verification coverage: `client/test/site-pages.test.jsx` covers homepage section presence, hero carousel dots, auto-rotation, reduced-motion behavior, gallery page, and mobile navigation. Client scripts include `npm test`, `npm run lint`, and `npm run build`.

## 6. Desired End State

- Expected final behavior: Every homepage section includes an image or visual element using existing `galleryItems`, while the current brand and layout direction remain recognizable.
- User-facing outcome: Visitors see a more visual homepage with image-backed services, image detail panels, testimonial visuals, and an accessible image-backed CTA.
- Developer-facing outcome: Homepage implementation remains straightforward, local to `Home.jsx` and `index.css`, with no new image assets or packages.
- System/workflow outcome: Approved spec leads to a vertical task plan, TDD-first implementation, verification, review, release notes, and summary.
- Backward compatibility expectations: Existing routes, content constants, hero carousel controls, navigation, booking flow, and gallery behavior remain compatible.

## 7. Scope

- In scope:
  - Keep the current hero carousel.
  - Add thumbnail cluster to trust strip using 3-5 `galleryItems`.
  - Convert service tiles to image-backed cards with readable overlays.
  - Add a supporting process/detail image panel to the why section.
  - Keep gallery preview as an image grid.
  - Add a visual panel or thumbnails to testimonials.
  - Add a gallery-image-backed CTA treatment with dark/green overlay.
  - Keep copy concise and premium.
  - Update `Home.jsx`, `index.css`, and focused tests if needed.
- Out of scope:
  - Whole-site redesign.
  - New assets, new image constants, or content data changes.
  - New dependencies.
  - Backend/API/database/env/deployment changes.
  - Non-homepage page redesigns.
- Non-goals:
  - Changing booking flow behavior.
  - Changing routing or layout shell behavior.
  - Replacing the current brand palette or typography system.
- Explicit boundaries:
  - Product code changes should be limited to `client/src/pages/Home.jsx` and `client/src/index.css` unless a tiny helper is clearly necessary.
  - `galleryItems` is a read-only source for this task.

## 8. Users And Use Cases

- Primary users: Prospective KareBraids clients browsing services and deciding whether to book.
- Secondary users: Returning clients checking styles, trust cues, and appointment options.
- Main use cases:
  - Quickly understand the premium braid service offering.
  - Browse visual examples while scanning service details.
  - Build trust through badges, process imagery, testimonials, and CTA.
  - Navigate to booking or gallery.
- Edge use cases:
  - Mobile visitors with narrow screens.
  - Users with reduced-motion preferences.
  - Users relying on screen readers.
  - Slow image loads from remote gallery URLs.

## 9. Functional Requirements

- Required behaviors:
  - Hero carousel remains present and unchanged in intent.
  - Trust strip renders existing badge text and a small overlapping thumbnail cluster.
  - Service cards render service title, duration, short description, and one gallery image each.
  - Why section renders reason text plus a process/detail gallery image panel.
  - Gallery preview remains an image grid.
  - Testimonials render readable quote text plus visual thumbnails or panel.
  - CTA renders text/button over or beside a gallery image with a dark/green overlay.
- Inputs: Static `services`, `galleryItems`, and `testimonials`.
- Outputs: Homepage DOM with added image elements and CSS classes.
- State changes: No new global state. Existing carousel local state remains.
- Error states: No runtime data fetching errors. Image loading should degrade gracefully by preserving layout and readable text.
- Permissions/auth expectations: Not applicable.

## 10. Non-Functional Requirements

- Performance expectations: Use existing remote images; add `loading="lazy"` for below-fold images where appropriate; avoid new heavy animations or dependencies.
- Reliability expectations: No dependency on mutable runtime APIs beyond existing static constants.
- Security/privacy expectations: No secrets, no new external services, no user data exposure.
- Accessibility expectations: Meaningful alt text for content images; decorative duplicated thumbnails may use empty alt and `aria-hidden` where appropriate; maintain readable contrast over images; preserve keyboard focus styling on controls.
- Maintainability expectations: Keep image selection deterministic and simple; avoid over-abstracting unless a helper clearly reduces duplication.
- DX expectations: Existing client test/lint/build commands continue to pass.

## 11. Affected Surfaces

- Files likely affected:
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx` if tests are updated for TDD evidence
- Directories likely affected:
  - `client/src/pages/`
  - `client/src/`
  - `client/test/` only for verification tests
  - `_workflow/runs/dev/`
- UI surfaces:
  - Homepage hero
  - Trust strip
  - Featured services
  - Why choose KareBraids
  - Gallery preview
  - Testimonials
  - CTA
- API routes: Not applicable.
- Components: `Home` page only.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars: Not applicable.
- Tests: Existing homepage tests may be extended.
- Docs: Run-scoped workflow artifacts only.
- Workflow artifacts: `_workflow/runs/dev/request.md`, `handoff.md`, `spec.md`, later `tasks.md`, `progress.md`, `verification.md`, `review.md`, `release-notes.md`, and `summary.md`.

## 12. Dependency And Integration Map

- Internal dependencies:
  - `galleryItems`, `services`, and `testimonials` from `client/src/constants/content.js`.
  - `Button` from `client/src/components/Button.jsx`.
  - `useRevealOnScroll` hook.
- External packages/services:
  - Existing React, React Router, Phosphor icons, Vite, Vitest, Testing Library.
  - Existing remote image URLs embedded in `galleryItems`.
- Integration points:
  - Homepage markup and CSS selectors.
  - Existing reveal animation attributes.
  - Existing reduced-motion CSS and hero carousel effect.
- Ordering constraints:
  - Save and approve spec before task plan.
  - Generate task plan before implementation.
  - Update tests before implementation where practical.
- Migration/setup requirements: None.

## 13. Data And State Impact

- Data models: No changes.
- Database changes: None.
- State management changes: No Redux, Context, Query, localStorage, or session changes.
- Cache/session/local storage impact: None.
- Backward compatibility impact: No public contract changes expected.

## 14. UX / API / Workflow Expectations

- UX expectations:
  - Preserve warm, premium, editorial KareBraids styling.
  - Reduce text weight by letting images carry more of the story.
  - Use overlays/gradients for image-backed text.
  - Keep mobile layouts stacked and stable.
  - Avoid image/text overlaps that reduce readability.
- API contract expectations: Not applicable.
- CLI/workflow behavior: Follow saved spec, approval gate, task plan, 3-pass task loop, verification, review, release notes, and summary.
- Error handling expectations: Not applicable for API errors; image fallback is layout resilience rather than explicit error UI.
- Empty/loading/success/failure states: Not applicable; all content is static. Images should use stable dimensions so loading does not cause severe layout shift.

## 15. Execution Strategy

- Recommended implementation approach:
  - Add small local image selection constants in `Home.jsx` derived from `galleryItems`.
  - Keep hero carousel code intact.
  - Add thumbnail cluster markup in the trust strip without removing badges.
  - Render service cards with image elements, overlay wrappers, and text blocks.
  - Add a why-section image panel using the `process-detail` gallery item when available, with fallback by index if needed.
  - Add testimonial visual panel/thumbnails using existing gallery images.
  - Add CTA background/image treatment via markup and CSS custom property or image element, ensuring contrast.
  - Adjust CSS selectors for responsive layouts and reduced-motion compatibility.
- Suggested sequencing:
  1. Update or add focused tests proving added visual structures and source images.
  2. Update `Home.jsx` markup with deterministic gallery image references.
  3. Update `index.css` for layout, overlays, responsive stacking, and contrast.
  4. Verify focused tests, full tests, lint, build, and browser visuals.
- Safe rollout/migration approach: UI-only changes localized to homepage; no migration.
- Files to inspect before editing:
  - `client/src/pages/Home.jsx`
  - `client/src/constants/content.js`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Decisions to avoid until more evidence exists:
  - Do not introduce new components or helpers unless duplication becomes meaningfully harmful.
  - Do not alter `content.js` service or gallery data.
  - Do not replace the carousel with a different pattern.

## 16. Verification Strategy

- Required automated checks:
  - Focused test: `npm test -- site-pages.test.jsx` from `client/`
  - Full frontend tests: `npm test` from `client/`
  - Lint: `npm run lint` from `client/`
  - Build: `npm run build` from `client/`
- Required manual checks:
  - Desktop homepage visual review.
  - Mobile homepage visual review.
  - Check text contrast over service/CTA images.
  - Check that reduced-motion rules are not undermined.
- Test types needed:
  - React Testing Library structural/accessibility checks for visual additions.
  - Existing carousel behavior tests should continue to pass.
- Build/lint/typecheck expectations:
  - Client lint and build pass.
  - No TypeScript typecheck exists.
- Acceptance evidence required:
  - Test outputs recorded in progress.
  - Screenshots or browser verification notes if implementation proceeds.
  - Final diff audit.
- Proof of completion:
  - All acceptance criteria checked `[x]`.
  - Workflow review, release notes, summary, and handoff updated.

## 17. Acceptance Criteria

- [ ] Hero carousel remains present and functional.
- [ ] Trust strip keeps existing trust badges and adds a 3-5 image overlapping thumbnail cluster from `galleryItems`.
- [ ] Featured services render as visual cards with gallery images, overlays/gradients, title, duration, and short description.
- [ ] Why choose KareBraids includes a supporting process/detail gallery image panel beside the reasons on larger screens and stacked on mobile.
- [ ] Gallery preview remains an image grid.
- [ ] Testimonials include a visual panel or small client/style thumbnails and quote text remains readable.
- [ ] CTA includes a gallery image background or image panel with dark/green overlay and accessible contrast.
- [ ] Added images have meaningful alt text or are correctly decorative when redundant.
- [ ] No new dependencies or image assets are added.
- [ ] Product implementation changes are limited to `client/src/pages/Home.jsx` and `client/src/index.css` unless a small helper is clearly justified.
- [ ] Mobile responsive layout is clean with no incoherent overlaps.
- [ ] Existing animations and `prefers-reduced-motion` support are respected.
- [ ] Relevant client tests, lint, and build pass or any inability to run is documented.

## 18. Edge Cases And Failure Modes

- Edge cases:
  - Very narrow mobile screens.
  - Bright image regions under overlay text.
  - Slow or failed remote image loading.
  - Reduced-motion users.
  - Screen-reader users encountering decorative thumbnails.
- Failure modes:
  - Low text contrast over images.
  - Visual clutter from adding too many thumbnails.
  - Layout shifts from unstabilized image dimensions.
  - Accidental removal/regression of hero carousel controls.
  - CSS changes leaking into non-homepage surfaces.
- Regression risks:
  - Existing homepage tests may need updates if markup changes.
  - Mobile trust strip and testimonial layouts can become cramped.
  - Service card hover transforms must not break reduced-motion preferences.
- Recovery expectations:
  - Keep fixes scoped to homepage markup/CSS.
  - If browser verification shows overlap or contrast defects, adjust CSS only.

## 19. Risks And Mitigations

- Technical risks:
  - CSS selector changes may affect gallery or booking pages because `index.css` is global.
  - Mitigation: Use homepage-specific class names for new styles and avoid broad selector changes.
- Product/UX risks:
  - The page may become too image-heavy or busy.
  - Mitigation: Use restrained image counts, controlled overlays, and concise copy.
- Security risks:
  - None beyond existing external image URLs.
  - Mitigation: Do not add secrets or new external services.
- Scope risks:
  - A full redesign could creep in.
  - Mitigation: Preserve section order, hero direction, brand palette, typography, and CTAs.
- Mitigation plan:
  - Implement one vertical homepage visual pass only; verify with tests and responsive review.

## 20. Assumptions

- Explicit assumptions:
  - The current brand style is represented by the existing warm cream/forest/gold/terracotta palette and editorial image framing.
  - The first five hero carousel images should remain unchanged.
  - Process/detail imagery should prioritize `galleryItems` item `process-detail` if available.
  - Service image pairings can be mapped by service index against `galleryItems`.
  - Tests may be updated in `client/test/` for workflow evidence, while app implementation remains limited to expected files.
- Confidence level: High.
- What to revisit if assumptions are wrong:
  - Image pairings and exact section treatments can be changed before implementation through a spec revision.

## 21. Open Questions

- Blocking questions: None.
- Non-blocking questions:
  - Whether the user prefers specific gallery images for specific services.
  - Whether testimonial visuals should use one larger panel or multiple small thumbnails.
- Execution impact: Non-blocking; implementation can choose tasteful deterministic pairings from existing gallery content.

## 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - Single vertical task: Add gallery-image visuals across homepage sections while preserving hero carousel and responsive/accessibility behavior.
- Suggested first task:
  - `TASK-001: Add gallery-image visuals to homepage sections`
- Suggested task ordering:
  - One task is appropriate because the requested changes all touch the same homepage and CSS files and should be verified together.
- Areas that should not become separate tasks:
  - Backend, data constants, dependencies, deployment, and non-homepage redesign.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Iteration 1 Build: Add tests for visual structures, implement core markup and initial CSS.
  - Iteration 2 Refine: Strengthen accessibility, alt/decorative semantics, contrast, and responsive behavior.
  - Iteration 3 Polish: Browser-check desktop/mobile, fix spacing/overlap, run full verification and final review.
