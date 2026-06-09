# Fallow Audit

## Metadata
- Date: 2026-06-09
- Scope: booking/services production repair
- Commands:
  - `FALLOW_AGENT_SOURCE=codex npx fallow audit --base HEAD --format json --quiet --explain 2>/dev/null || true`
  - `FALLOW_AGENT_SOURCE=codex npx fallow health --format json --quiet --explain 2>/dev/null || true`
- Fallow version: 2.91.0
- Schema version: 7

## Result
- Verdict: PARTIAL
- Changed-code audit verdict: `fail`
- Health score: 74.4 / 100 (B)
- Files analyzed: 129
- Average maintainability: 89.9
- Circular dependencies: 0
- Boundary violations: 0
- Unresolved imports/unlisted dependencies: 0

## Cleanup And Dependency Findings
- Fallow reported `api/index.js` and Jest test files as unused because Vercel/Jest entrypoints are outside its static import graph. They are required and directly exercised by deployment/serverless tests.
- No unused dependency, unresolved import, unlisted dependency, circular dependency, re-export cycle, or boundary violation was reported.

## Complexity And Duplication
- One introduced moderate static complexity/CRAP finding was reported for `getAvailability`; the function is covered by booking API tests, but Fallow's static estimated coverage does not recognize the Jest mock path.
- Two introduced duplication groups are test/config assertion repetition. Existing controller/test duplication was also reported. No extraction is warranted within this minimal production fix.
- Existing Booking UI and service-validation hotspots remain outside scope.

## Changed-Code Risk
- Server 71/71 and client 116/116 tests pass.
- Client build and lint pass.
- Production dependency audit reports zero vulnerabilities.
- Root config, function entrypoint, API JSON behavior, Mongo-backed service eligibility, and duplicate protection have focused tests.

## Recommended Follow-Up
- Optionally configure Fallow entrypoints for `api/index.js` and Jest files.
- Address existing complexity hotspots only in separately scoped refactors.

## Final Verdict
PARTIAL — static entrypoint/coverage/duplication findings remain, but no correctness, dependency, circular, boundary, import, build, lint, or tested changed-code blocker was found.
