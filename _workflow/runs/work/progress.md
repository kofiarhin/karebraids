# Progress Log

## 2026-06-04 — Intake / Shared Understanding

# Shared Understanding Handoff

## Original Request
Fix two production routing issues in the Vite React client: hero View Styles full document navigation and Vercel deep-link refresh 404.

## Confirmed Understanding
The app uses BrowserRouter, `App.jsx` already defines `/gallery`, `Hero.jsx` contains the problematic plain anchor, and `Button.jsx` supports a `to` prop that renders React Router `Link`.

## Decisions Made
- Use existing shared Button for View Styles.
- Place Vercel rewrite config at `client/vercel.json` for the deployed client app.
- Add targeted Vitest coverage for CTA click routing and Vercel config shape.

## Assumptions
- Vercel project root is `client` or reads config from the deployed client app root.
- No backend/API changes are needed.

## In Scope
- `Hero.jsx` CTA routing.
- `client/vercel.json` rewrite.
- Targeted tests and build validation.

## Out Of Scope
- Route redesign, backend changes, deployment execution, unrelated lint cleanup.

## Acceptance Criteria
- View Styles is a client-side route link to `/gallery`.
- Button styling remains `btn btn-secondary` and label remains `View Styles`.
- Vercel rewrite rule is present.
- Client build passes and routes remain covered.

## Risks And Edge Cases
- Live Vercel refresh can only be fully validated after deployment.
- Existing lint issues may block lint but are unrelated.

## Remaining Open Questions
- None blocking.

## Normalized Workflow Request
workflow fix Vite React production routing for the hero gallery CTA and Vercel SPA deep-link fallback.

Applied skill: design-taste-frontend

## TASK-001: Make View Styles use React Router navigation

- Status: Done
- Lifecycle transition reached: Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done
- Files changed: `client/src/components/home/Hero.jsx`, `client/test/site-pages.test.jsx`

### Iteration 1 Build
- Goal: Prove current anchor does not client-route and implement the smallest fix.
- Changes made: Added click assertion for View Styles route; replaced anchor with `<Button to="/gallery" variant="secondary">View Styles</Button>`.
- Test plan: targeted Vitest file.
- Red phase evidence: `npm run test --prefix client -- test/site-pages.test.jsx test/deployment.test.js` failed with jsdom full-document navigation and no Gallery heading.
- Green phase evidence: Targeted tests passed after implementation.
- Refactor phase evidence: No extra refactor required; reran targeted tests.
- Test commands run: `npm run test --prefix client -- test/site-pages.test.jsx test/deployment.test.js`
- Verification command/result: passed after implementation.
- Review findings: Styling class remains produced by Button as `btn btn-secondary`; label remains View Styles.
- Acceptance status: [x] met.
- Remaining issues: none.
- Next action: TASK-002.

### Iteration 2 Refine
- Goal: Ensure test expectation is stable after navigation.
- Changes made: Asserted View Full Gallery href before clicking because it exists on the home page, not gallery page.
- Red phase evidence: Targeted test initially failed after successful navigation because the old post-click assertion looked for a home-only link.
- Green phase evidence: Targeted test passed after reordering assertion.
- Refactor phase evidence: No behavior change beyond test correction; targeted tests passed.
- Verification command/result: `npm run test --prefix client -- test/site-pages.test.jsx test/deployment.test.js` passed.
- Review findings: Test now directly proves navigation and preserves existing home CTA href coverage.
- Acceptance status: [x] met.
- Remaining issues: none.
- Next action: polish/final checks.

### Iteration 3 Polish
- Goal: Confirm final code uses existing shared component without new dependency.
- Changes made: Reviewed `Button.jsx` support and final diff.
- Red/Green/Refactor evidence: no additional code needed; full client tests later passed.
- Verification command/result: `npm run test --prefix client` passed.
- Review findings: No unrelated code changed.
- Acceptance status: [x] met.

## TASK-002: Add Vercel SPA rewrite fallback

- Status: Done
- Lifecycle transition reached: Planned -> Ready -> In Progress -> Verified -> Reviewed -> Done
- Files changed: `client/vercel.json`, `client/test/deployment.test.js`

### Iteration 1 Build
- Goal: Prove missing Vercel config, then add it.
- Changes made: Added deployment config test; added `client/vercel.json`.
- Red phase evidence: `npm run test --prefix client -- test/site-pages.test.jsx test/deployment.test.js` failed with ENOENT for `client/vercel.json`.
- Green phase evidence: Targeted tests passed after adding config.
- Refactor phase evidence: No refactor needed; JSON kept minimal.
- Verification command/result: targeted tests passed.
- Review findings: Rewrite rule matches requested `{ "source": "/(.*)", "destination": "/" }`.
- Acceptance status: [x] met.
- Remaining issues: live Vercel validation awaits deployment.
- Next action: final verification.

### Iteration 2 Refine
- Goal: Confirm config location matches client deployed app structure.
- Changes made: Kept config in `client/` because Vite app build and package scripts are client-prefixed.
- Red/Green/Refactor evidence: deployment test enforces path and shape; targeted tests passed.
- Verification command/result: targeted tests passed.
- Review findings: No root package changes.
- Acceptance status: [x] met.

### Iteration 3 Polish
- Goal: Run broad verification.
- Changes made: none.
- Red/Green/Refactor evidence: no extra behavior needed; build and full tests passed.
- Verification command/result: `npm run build --prefix client` passed; `npm run test --prefix client` passed; `npm run lint --prefix client` failed on pre-existing unrelated hook lint errors.
- Review findings: Fallow and diff audit documented separately.
- Acceptance status: [x] met, except live deployment check is pending deploy.
