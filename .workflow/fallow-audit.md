# Fallow Audit

## Command Run
`npx -y fallow audit --base HEAD --format json --quiet --explain 2>/dev/null || true`
<<<<<<< HEAD

Fallow version: 2.94.0. Parsed root `kind`: `audit`.

## Summary
- Verdict: `warn`.
- Introduced dead-code findings: 0.
- Introduced complexity findings: 0.
- Introduced duplication groups: 2, both test-only assertion-shape similarities.
- Overall report: 44 dead-code findings, 1 inherited Booking complexity finding, 11 duplication groups.

## Findings
- Dormant product exports are intentional architecture placeholders and are covered by scoped Fallow suppressions.
- Two introduced clone groups compare generic Testing Library assertion sequences in About/site-page tests; they do not duplicate production logic.
- Remaining dead-code/complexity findings are inherited entry-point/static-analysis limitations or pre-existing code.

## Fixes Applied
- Removed a premature unused product validator.
- Removed an unused frontend fallback re-export.
- Added narrow explanations for intentional dormant product exports.
- No automated Fallow fix command was used.

## Remaining Exceptions
- Test-only assertion similarity is retained for readable independent regression coverage.
- Inherited Booking complexity and repository dead-code findings remain outside this request.

## Verification
- Server: 72/72 tests passed.
- Client: 134/134 tests passed.
- Client lint and production build passed.
- No introduced dead code or complexity remains.

## Verdict
PARTIAL — no production blocker; warning is limited to test duplication and inherited findings.
=======

## Summary
- Verdict: `pass`.
- Changed-code dead-code findings: 0.
- Changed-code complexity findings: 0.
- Changed-code duplication findings: 0.
- Repository report included three inherited/static-entry-point dead-code findings, none introduced by this remediation.

## Findings
No introduced cleanup, dependency, import, circular, boundary, complexity, or duplication blocker was reported.

## Fixes Applied
- Centralized API gallery normalization in the gallery service.
- Centralized final local-path enforcement in `getGalleryImageSrc`.
- Removed direct gallery-item source rendering from all affected UI surfaces.

## Remaining Exceptions
None for changed production code.

## Verification
- Server tests: 72 passed.
- Client tests: 147 passed.
- Focused gallery tests: 31 passed.
- Client lint/build: passed.
- Direct remote-source rendering audit: passed.
- Local source contract: 15 centralized items; remote input rejected.

## Verdict
PASSED
>>>>>>> pr-25
