# Detailed Spec: KareBraids Dark Luxury Homepage Redesign

## 1. Metadata

- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-05-27
- Request ID / slug: `karebraids-dark-luxury-homepage-redesign`
- Request source: latest direct user prompt plus follow-up answer confirming five mockup services/prices
- Execution mode: `complete-workflow`
- Request classification: `feature`
- Scope level: `large`
- Risk level: `medium`
- Workflow path: `polish-ui`
- Frontend Taste Application: Applied skill: design-taste-frontend

## 2. Original Request

- Raw user request: Redesign the KareBraids homepage based on the approved dark luxury mockup with the locked dark colour system, modular React components, responsive behavior, accessible links/buttons/images, and conversion-focused booking flow.
- Normalized request: Redesign only the KareBraids homepage to match the approved dark luxury mockup using the locked dark palette, modular React components, local homepage data constants, CSS-only subtle motion, responsive mobile-first layouts, accessible nav/buttons/images, and the five confirmed mockup services/prices. Preserve existing routes and booking CTA flow. Do not change backend, API, database, admin behavior, deployment, env, or dependencies unless separately approved.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers

- Questions asked:
  - Should the homepage service lineup be replaced with the five requested mockup styles and prices exactly?
- Answers received:
  - Yes. Use the five mockup services exactly for the redesigned homepage, and treat the old six-service homepage row as superseded for this page only.
- Questions skipped:
  - None.
- Remaining open questions:
  - None blocking.

## 4. Problem Definition

- Problem being solved: The current homepage is a prior dark brand iteration with a different structure, service lineup, pricing, hero composition, trust presentation, testimonial layout, and footer than the approved dark luxury mockup.
- Why it matters: KareBraids needs a polished, premium homepage that immediately communicates a luxury African braiding studio in London and moves visitors toward booking.
- Current pain point: The current homepage still reflects older copy and section composition, including six service tiles and a carousel-led hero rather than the requested cinematic split editorial layout.
- Expected value: A conversion-focused homepage that feels warm, dark, editorial, feminine, and salon-specific while retaining reliable booking navigation and responsive behavior.

## 5. Current State Analysis

- Existing behavior:
  - React Router renders `Home`, `About`, `Gallery`, `Booking`, hidden `Admin`, and redirects unknown routes to `/`.
  - `Layout.jsx` owns the shared sticky header, desktop nav, mobile drawer, main outlet, and footer.
  - `Home.jsx` currently renders a hero carousel, trust strip, six priced service tiles, why section, gallery preview, testimonials, and CTA.
  - `client/src/constants/content.js` stores existing services, gallery items, and testimonials.
  - `useRevealOnScroll` powers reveal animations through `[data-reveal]`.
- Existing architecture/components:
  - React 19, Vite 8, React Router 7.
  - Tailwind CSS v4 is installed through `@tailwindcss/vite`, but the app currently uses a large `client/src/index.css` file with `@import "tailwindcss";`.
  - `@phosphor-icons/react` is installed and used.
  - Framer Motion is not installed in `client/package.json`.
  - Booking API/data logic lives in services and hooks, not in homepage components.
- Existing files/modules likely involved:
  - `client/src/pages/Home.jsx`
  - `client/src/components/Layout.jsx`
  - `client/src/components/Button.jsx`
  - New components under `client/src/components/` or `client/src/components/home/`
  - `client/src/constants/content.js` or new `client/src/constants/homepage.js`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Existing data flow:
  - Static homepage content is imported from constants.
  - Route links use React Router through `NavLink` and the shared `Button` component.
  - No homepage API calls are currently required.
- Existing API/UI/CLI/workflow behavior:
  - Frontend test command: `npm test --prefix client`
  - Frontend lint command: `npm run lint --prefix client`
  - Frontend build command: `npm run build --prefix client`
  - Browser checks have previously used Playwright CLI fallback when in-app browser automation was unavailable.
- Existing tests or verification coverage:
  - `client/test/site-pages.test.jsx` currently asserts old homepage structure, six old prices, carousel behavior, and shared mobile nav.
  - Gallery and booking tests exist but should not need broad updates unless shared layout changes affect them.

## 6. Desired End State

- Expected final behavior:
  - `/` renders the requested dark luxury homepage structure: Header, Hero, Trust Strip, Signature Styles, Why Choose, Gallery Preview, Testimonials, Booking CTA, Footer.
  - Booking CTAs link to `/booking`.
  - Gallery CTAs link to `/gallery`.
  - Service cards show the five confirmed mockup services and prices exactly.
  - Header/mobile drawer remain keyboard accessible and responsive.
- User-facing outcome:
  - The homepage feels like a premium African braiding studio in London with cinematic portrait-led imagery, dark espresso surfaces, restrained bronze accents, warm editorial typography, and clear booking conversion paths.
- Developer-facing outcome:
  - Homepage sections are modular and data-driven through local constants.
  - API/data logic remains outside UI components.
  - Existing routes and non-homepage behavior remain compatible.
- System/workflow outcome:
  - Saved spec, approved task plan, progress, verification, review, release notes, summary, and handoff are kept in `_workflow/runs/dev/`.
  - Polish-specific evidence is kept in `.workflow/artifacts/polish-ui/`.
- Backward compatibility expectations:
  - No backend, API contract, database, admin, booking flow, env, deployment, or package dependency changes.

## 7. Scope

- In scope:
  - Homepage redesign to match the approved dark luxury mockup.
  - Shared header/footer refactor only as needed to satisfy the requested homepage header/footer and preserve existing routes.
  - New reusable homepage components.
  - Homepage-specific local arrays/constants for services, trust items, values, footer links, and image data.
  - CSS/Tailwind-compatible styling using the locked palette.
  - CSS-only subtle motion and hover states.
  - Accessibility and responsive behavior.
  - Updating tests to reflect the new homepage.
- Out of scope:
  - Backend/API/database changes.
  - Booking form logic, availability logic, validation rules, or payload changes.
  - Admin dashboard changes.
  - Gallery/About/Booking page redesigns, except shared header/footer compatibility if unavoidable.
  - New dependency installation.
  - Deployment, env, CI, package, or lockfile changes.
- Non-goals:
  - CMS or admin content management.
  - Payments.
  - Replacing the whole app architecture.
  - Creating white/light homepage sections.
- Explicit boundaries:
  - No glassmorphism, bright gradients, random floating shapes, generic SaaS layout, or pure white backgrounds.
  - Bronze is an accent, not the dominant palette.
  - Keep API calls in services/hooks.

## 8. Users And Use Cases

- Primary users:
  - Women in London looking for salon or mobile African braiding services.
- Secondary users:
  - KareBraids owner/stylist reviewing service presentation and booking conversion.
- Main use cases:
  - Understand KareBraids positioning from the homepage.
  - Browse signature styles and starting prices.
  - View gallery previews.
  - Read social proof/testimonial.
  - Book an appointment.
  - Contact or navigate to other pages.
- Edge use cases:
  - Mobile visitor opening and closing the drawer.
  - Keyboard user tabbing through nav, CTAs, and service links.
  - Reduced-motion user viewing static transitions.
  - Small mobile viewport around 320px.
  - Remote images loading slowly or failing.

## 9. Functional Requirements

- Required behaviors:
  - Render a sticky slim dark header with logo, Home, Services, Gallery, About, Booking, Contact, and `Book Appointment`.
  - Render a mobile hamburger drawer with the same navigation destinations and accessible open/close behavior.
  - Render hero eyebrow `Luxury African Hair Braiding`.
  - Render hero heading text `Luxury braiding, crafted with care.` with `care.` highlighted in bronze.
  - Render hero supporting text exactly or very close to: `Premium salon and mobile braiding services across London. Beautiful styles. Healthy hair. Exceptional care.`
  - Render hero CTAs: `Book Appointment` and `View Styles`.
  - Render social proof row with overlapping avatars, `5.0`, star icons, and `500+ Happy Clients`.
  - Render four trust items: London Based; Salon & Mobile Services; Protective Styling Experts; Client First Care.
  - Render Signature Styles heading/copy/link and five service cards:
    - Knotless Braids - From £120
    - Boho Braids - From £150
    - Stitch Braids - From £130
    - Twists / Locs - From £140
    - Cornrows - From £100
  - Render four Why Choose blocks with requested titles and copy.
  - Render Gallery Preview text, CTA, and asymmetrical editorial image grid.
  - Render testimonial content for Jasmine A. with bronze stars and carousel arrows.
  - Render final booking CTA and four-column footer with services, company, contact, hours, London location, social icons, and booking CTA.
- Inputs:
  - Static constants and route navigation.
- Outputs:
  - Rendered homepage UI and route links.
- State changes:
  - Mobile nav open/close local state remains acceptable.
  - Optional carousel arrows can be static controls unless a real carousel is implemented in scope.
- Error states:
  - Not applicable for static homepage content.
  - Image alt text and layout should remain acceptable if images fail to load.
- Permissions/auth expectations:
  - Not applicable.

## 10. Non-Functional Requirements

- Performance expectations:
  - No Framer Motion import unless installed later by explicit approval; use CSS transform/opacity animations.
  - Avoid scroll listeners beyond existing `useRevealOnScroll`.
  - Keep image hover scale to `transform`.
- Reliability expectations:
  - Existing route rendering, mobile nav, and booking links continue to work.
  - Tests, lint, and build pass.
- Security/privacy expectations:
  - No secrets, credentials, env values, or API URLs introduced.
  - No unsafe external script injection.
- Accessibility expectations:
  - Semantic `header`, `nav`, `main`, `section`, `article`, and `footer`.
  - Accessible alt text for meaningful images and empty alt text for decorative images.
  - Focus-visible states for links/buttons.
  - Drawer controls expose `aria-expanded`, `aria-controls`, and appropriate labels.
  - Text contrast must be readable on dark backgrounds.
- Maintainability expectations:
  - Modular components with small props/data boundaries.
  - Constants store section data and image metadata.
  - CSS selectors are scoped and avoid broad regressions.
- DX expectations:
  - No unnecessary dependency churn.
  - Keep files clean, consistent with current React patterns.

## 11. Affected Surfaces

- Files likely affected:
  - `client/src/pages/Home.jsx`
  - `client/src/components/Layout.jsx`
  - `client/src/components/Button.jsx`
  - `client/src/components/Header.jsx` or `client/src/components/home/Header.jsx`
  - `client/src/components/Footer.jsx` or `client/src/components/home/Footer.jsx`
  - `client/src/components/home/Hero.jsx`
  - `client/src/components/home/TrustStrip.jsx`
  - `client/src/components/home/SectionHeading.jsx`
  - `client/src/components/home/ServiceCard.jsx`
  - `client/src/components/home/WhyChoose.jsx`
  - `client/src/components/home/GalleryPreview.jsx`
  - `client/src/components/home/TestimonialSection.jsx`
  - `client/src/components/home/BookingCTA.jsx`
  - `client/src/constants/content.js` or `client/src/constants/homepage.js`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
  - `_workflow/runs/dev/*`
  - `.workflow/artifacts/polish-ui/*`
- Directories likely affected:
  - `client/src/pages`
  - `client/src/components`
  - `client/src/constants`
  - `client/test`
  - `_workflow/runs/dev`
  - `.workflow/artifacts/polish-ui`
- UI surfaces:
  - Homepage, shared header/nav/mobile drawer/footer if refactored.
- API routes:
  - None.
- Components:
  - Existing `Layout`, `Button`, `Home`; new homepage section components.
- Services:
  - None expected.
- Database/schema:
  - None.
- Config/env vars:
  - None.
- Tests:
  - `client/test/site-pages.test.jsx` primarily; other tests only if shared layout changes require updates.
- Docs:
  - Workflow artifacts only unless durable architecture facts change.
- Workflow artifacts:
  - Request, handoff, spec, future tasks, progress, review, verification, release notes, summary.

## 12. Dependency And Integration Map

- Internal dependencies:
  - `App.jsx` renders `Layout` and route pages.
  - `Layout.jsx` currently owns shared header/footer and mobile nav state.
  - `Home.jsx` imports constants, `Button`, icons, and `useRevealOnScroll`.
  - `Button.jsx` wraps links/buttons and should remain route-safe.
  - `site-pages.test.jsx` renders routes through `App`.
- External packages/services:
  - React, React DOM, React Router, Vite, Tailwind CSS v4.
  - `@phosphor-icons/react` installed and allowed.
  - Framer Motion not installed; do not import.
  - Remote images from current content constants.
- Integration points:
  - `/booking` route links.
  - `/gallery` route links.
  - Header nav route links.
- Ordering constraints:
  - Spec approval required before task plan.
  - Task plan required before implementation.
  - Code-changing tasks must update tests first where reasonable.
- Migration/setup requirements:
  - None expected.

## 13. Data And State Impact

- Data models:
  - No backend model changes.
- Database changes:
  - None.
- State management changes:
  - No Redux changes.
  - Mobile drawer state remains local.
  - Hero carousel state may be removed or changed if the new static hero replaces it.
- Cache/session/local storage impact:
  - None.
- Backward compatibility impact:
  - The homepage service prices/content intentionally change for homepage display only.
  - Backend booking services/prices are not modified.

## 14. UX / API / Workflow Expectations

- UX expectations:
  - The whole homepage remains dark using `#171311` and `#221C19`.
  - Accent bronze `#B78652` is used sparingly for CTAs, dividers, icons, highlights, stars, and hover states.
  - Typography uses an elegant serif for display headings, preferably Cormorant Garamond or Playfair Display, and a clean sans for UI/body, preferably Inter, Lato, Open Sans, or current stack if font loading is constrained.
  - Eyebrow labels are uppercase and letter-spaced.
  - Sections use generous spacing and strong editorial hierarchy.
  - No white sections, pure black, glassmorphism, random shapes, chunky gradients, or SaaS-like card grids.
  - Cards have subtle radius, thin borders, and image-led layouts.
- API contract expectations:
  - None changed.
- CLI/workflow behavior:
  - Follow run-scoped workflow with spec approval gate, task plan, execution, verification, review, release notes, summary, and health check.
- Error handling expectations:
  - Not applicable for static homepage; existing app error behavior unaffected.
- Empty/loading/success/failure states:
  - Not applicable for homepage static content.
  - Existing booking states must remain unaffected.

## 15. Execution Strategy

- Recommended implementation approach:
  - After approval, create a vertical task plan.
  - First update tests to assert the new homepage content, five service prices, nav labels, CTAs, and modular structure.
  - Extract or create reusable header/footer and homepage section components.
  - Move homepage section data into constants.
  - Replace the current homepage markup with the requested section structure.
  - Update CSS tokens and homepage/shared styles with the locked palette.
  - Refine mobile behavior and accessibility.
  - Run full client verification and browser checks.
- Suggested sequencing:
  - Task 1: Lock new homepage content/structure in tests and build the modular component/data skeleton.
  - Task 2: Apply the locked dark luxury visual system and responsive section layouts.
  - Task 3: Harden accessibility, mobile drawer/header/footer behavior, motion, and responsive edge cases.
  - Task 4: Final verification, browser checks, diff audit, review, release notes, summary, and health check.
- Safe rollout/migration approach:
  - Keep route links and booking CTA paths unchanged.
  - Make shared layout changes carefully and run existing gallery/booking route tests if impacted.
- Files to inspect before editing:
  - `client/src/pages/Home.jsx`
  - `client/src/components/Layout.jsx`
  - `client/src/components/Button.jsx`
  - `client/src/constants/content.js`
  - `client/src/index.css`
  - `client/test/site-pages.test.jsx`
- Decisions to avoid until more evidence exists:
  - Installing Framer Motion.
  - Replacing all remote images.
  - Changing booking data/services.

## 16. Verification Strategy

- Required automated checks:
  - `npm test --prefix client -- site-pages.test.jsx`
  - `npm test --prefix client`
  - `npm run lint --prefix client`
  - `npm run build --prefix client`
- Required manual checks:
  - Desktop homepage browser check around 1440px width.
  - Mobile homepage browser check around 390px and, if feasible, 320px width.
  - Confirm no horizontal overflow, no text overlap, images render, drawer works, and CTAs navigate.
- Test types needed:
  - React Testing Library page/content tests.
  - CSS guardrail tests for locked palette and responsive service layout.
  - Mobile nav behavior tests preserved or updated.
- Build/lint/typecheck expectations:
  - Build and lint pass.
  - No separate typecheck script exists.
- Acceptance evidence required:
  - Red, Green, and Refactor evidence for code-changing task iterations where tests are practical.
  - Browser observation notes for visual/responsive acceptance.
- Proof of completion:
  - All planned tasks complete through Build, Refine, Polish; final artifacts and workflow health check completed.

## 17. Acceptance Criteria

- [ ] Homepage uses the locked colour system consistently and remains uniformly dark with no pure white sections.
- [ ] Header is slim, sticky, dark/transparent, accessible, responsive, and includes requested nav links plus a `Book Appointment` CTA.
- [ ] Hero matches the requested split editorial composition, copy, bronze `care.` highlight, CTAs, social proof, and dark cinematic portrait treatment.
- [ ] Trust Strip renders four requested trust items with bronze icons and desktop dividers, collapsing cleanly on mobile.
- [ ] Signature Styles renders the five confirmed mockup services and prices exactly, with image-background cards, dark overlays, hover image scale, and booking links.
- [ ] Why Choose section renders four horizontal value blocks with bronze icons and requested copy.
- [ ] Gallery Preview uses a left text/CTA block and right asymmetrical editorial image grid with dark backgrounds and bronze borders.
- [ ] Testimonials section renders the requested Jasmine A. testimonial card with portrait, quote mark, bronze stars, and calm carousel arrows.
- [ ] Final Booking CTA stays dark and includes the requested copy and `Book Your Appointment ->` CTA.
- [ ] Footer has four columns, social icons, hours, London location, muted sand text, bronze hover states, and a booking CTA.
- [ ] Homepage components are modular, data arrays/constants are separated from UI rendering, and existing API/data logic is not moved into UI components.
- [ ] Mobile layouts stack correctly, buttons become full-width where requested, and no horizontal overflow or text overlap appears.
- [ ] Existing booking route links and route rendering continue to work.
- [ ] Relevant tests, lint, build, and browser verification pass or any blocker is documented.
- [ ] Applied skill: design-taste-frontend is recorded in task evidence and downstream artifacts.

## 18. Edge Cases And Failure Modes

- Edge cases:
  - Mobile drawer open/close by click and Escape.
  - Keyboard focus through nav, service CTAs, gallery CTA, and booking CTAs.
  - Reduced-motion preference.
  - Small phone layouts.
  - Service cards in horizontal scroll or 2-column mobile layout.
  - Remote images loading slowly.
- Failure modes:
  - Shared CSS changes unintentionally affect About, Gallery, Booking, or Admin.
  - Header/footer refactor breaks route tests.
  - Dark palette creates low contrast.
  - Desktop service cards become too dense or mobile cards overflow.
  - Fonts fail to load and layout shifts.
- Regression risks:
  - Existing mobile nav accessibility.
  - Booking CTA route paths.
  - Gallery route links.
  - Existing test expectations for old service data.
- Recovery expectations:
  - Fix only in-scope failures.
  - Rerun exact failing commands after targeted fixes.
  - Stop with `Needs Human Review` if verification cannot prove responsive behavior.

## 19. Risks And Mitigations

- Technical risks:
  - Broad `index.css` can cause cascading regressions.
  - Mitigation: use scoped homepage/shared selectors and focused tests.
- Product/UX risks:
  - The palette could become too brown/dark or too accent-heavy.
  - Mitigation: follow locked colours, keep bronze sparse, use image-led hierarchy and adequate contrast.
- Security risks:
  - Low; no API/env changes.
  - Mitigation: final diff audit for secrets and URLs.
- Scope risks:
  - Header/footer changes might drift into all-page redesign.
  - Mitigation: limit non-homepage changes to shared navigation/footer compatibility.
- Mitigation plan:
  - Use TDD-first for structure/content and CSS guardrails, then browser-check the visual result.

## 20. Assumptions

- Explicit assumptions:
  - The written prompt fully represents the approved mockup.
  - Existing image assets can be reused or remapped to meet the editorial feel.
  - Homepage-only service/pricing changes do not need backend booking data changes.
  - Framer Motion should not be added because it is not installed.
  - `@phosphor-icons/react` is the icon library to use.
- Confidence level:
  - High for scope, components, palette, and pricing.
  - Medium for exact image fit until browser verification.
- What to revisit if assumptions are wrong:
  - If exact mockup image assets exist elsewhere, pause and incorporate them.
  - If homepage pricing must also drive booking services, create a separate backend/content alignment request.

## 21. Open Questions

- Blocking questions:
  - None.
- Non-blocking questions:
  - Whether owned salon photography should replace remote image sources later.
  - Whether the final brand should self-host fonts.
- Execution impact:
  - None for this workflow.

## 22. Task Extraction Notes

- Suggested vertical task boundaries:
  - Build modular homepage component/data structure and update tests for new content.
  - Apply locked dark luxury styling and responsive layouts.
  - Harden accessibility, mobile behavior, and motion.
  - Final verification and workflow closeout.
- Suggested first task:
  - Add failing homepage tests for the new header/hero/service lineup/CTA structure, then implement the smallest modular homepage structure that satisfies them.
- Suggested task ordering:
  - Structure/content first, visual styling second, responsive/accessibility hardening third, final verification fourth.
- Areas that should not become separate tasks:
  - Backend booking pricing changes.
  - Admin changes.
  - Full About/Gallery/Booking redesign.
  - Dependency installation.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Every executable task must complete Build, Refine, and Polish.
  - Code-changing iterations must record Red -> Green -> Refactor evidence where practical.
  - Visual-only refinements may use a justified missing-test exception only when automated assertions cannot meaningfully prove the change and browser verification is recorded.

## Polish-UI Artifact Plan

- Polish artifact root: `.workflow/artifacts/polish-ui/`
- Current polish spec pointer: `.workflow/artifacts/polish-ui/spec.md`
- Baseline capture: capture current homepage state after task plan approval and before implementation if browser automation is available.
- After capture: capture final homepage state after implementation if browser automation is available.
- Fallback: code-surface review if browser automation is unavailable.

## Dirty Worktree Protection

- `git status --short` returned no output during intake.
- Existing dirty files: none observed.
- Planned implementation files are listed in section 11.
- Overlap risk: none currently observed.

## Frontend Design Pre-Flight For Spec

- [x] Global state is not proposed for arbitrary styling work.
- [x] Mobile layout collapse is an explicit acceptance and verification requirement.
- [x] Full-height sections must avoid `h-screen`; use safe dynamic viewport sizing where needed.
- [x] Existing/reworked animations must preserve reduced-motion behavior and use transform/opacity.
- [x] Static homepage has no API loading/error state; existing booking states remain out of scope and should not regress.
- [x] Cards are used for service cards/testimonial card only where repeated content or framed testimonial hierarchy requires them.
- [x] No CPU-heavy perpetual animation or new animation dependency is proposed.
