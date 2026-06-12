# Pre-Launch Updates Review

- Request: Centralize prices, harden gallery/style images, add Karen profile content, and prepare dormant product architecture.
- Spec: `_workflow/runs/work/spec.md`
- Task plan: `_workflow/runs/work/tasks.md`
- Tasks reviewed: TASK-001 through TASK-005; all Done.

## Bugs Found And Fixed
- Offline fallback catalogue had stale prices, missing services, and mismatched IDs compared with canonical seed data.
- Six UI surfaces duplicated money formatting and defaulted missing values to `£0`.
- About specialties attempted to read nonexistent `galleryImages`, leaving cards without images.
- Hash-based service previews accidentally reused two images across different styles.
- Style cards/detail/gallery used generic alt text without selected-style context.
- About founder imagery was described as Karen despite no verified portrait.

## Scope Creep Check
- No unrelated routes, styling systems, payment logic, product UI, database product model, or admin functionality added.
- Existing service/gallery APIs and booking flow preserved.

## Final Diff Audit
- `git diff --stat` and `git diff` reviewed.
- Changes match the approved spec and affect canonical seed data, frontend content/helpers/consumers/tests, dormant product constants/tests, and workflow artifacts.
- No secrets, temporary source files, generated browser binaries, or unrelated cleanup added.
- Tests were written/updated before each behavior change where possible.

## Failure Recovery
- Full client suite initially failed because canonical fallback expansion made `/knotless braids/i` ambiguous and a legacy mock expected string `fromPrice`; compatibility shape and exact test matching were corrected.
- About image invariant exposed undefined specialty images and was fixed through explicit local descriptors.
- Fallow initially failed on intentional dormant exports and an unnecessary validator; validator removed and scoped suppressions added.

## Missing Tests
- None for changed behavior. Browser visual regression is unavailable because Chromium download is blocked.

## Security Concerns
- None identified. No credentials, payment handling, personal data, or commerce endpoints added.

## Architecture Concerns
- Backend seed records still contain remote Pexels galleries whose reachability/semantic labels cannot be verified in this environment. Public UI continues to disclose representative imagery; owner-supplied labeled assets remain the correct long-term replacement.
- Client offline service data necessarily mirrors backend values; tests pin the values to make drift visible.

## Follow-Up Tasks
- Replace all 11 prices if/when Karen supplies an approved list.
- Replace `karenProfile.image` and `karenProfile.statement` before launch.
- Replace representative imagery with owner-labeled portfolio photography.
- Specify commerce provider, products, variants, inventory, fulfilment, tax, and admin requirements before activating the product domain.

## Final Review Verdict
PASSED with environment warnings for screenshots and remote-host verification.

Applied skill: design-taste-frontend
<<<<<<< HEAD
=======

## Review Remediation — Gallery Image Source Of Truth
- Finding confirmed: API `galleryItems` previously flowed into live cards/modals with remote seed URLs.
- Fix: The gallery service now replaces API image arrays with centralized local representative items while retaining endpoint calls, limits, service query parameters, selected-service metadata, and review metadata.
- Defense in depth: `getGalleryImageSrc` permits only `/images/` paths and falls back locally for remote/malformed inputs across Gallery, GalleryModal, GalleryFeature, and ServiceDetail.
- Tests: Every gallery-enabled service ID/slug filter returns local paths; remote component fixtures render local card/modal paths.
- Verdict: Resolved; no direct API-provided image source can reach a gallery renderer.
>>>>>>> pr-25
