# Fallow Audit

## Metadata
- Date: 2026-06-07
- Scope: backend-driven service/gallery full-stack migration
- Commands:
  - `FALLOW_AGENT_SOURCE=codex npx fallow audit --base HEAD --format json --quiet --explain 2>/dev/null || true`
  - `FALLOW_AGENT_SOURCE=codex npx fallow health --format json --quiet --explain 2>/dev/null || true`
- Fallow version: 2.89.0
- Schema version: 7

## Result
- Verdict: PARTIAL
- Changed-code audit verdict: `fail`
- Health score: 74.8 / 100 (B)
- Files analyzed: 119
- Average maintainability: 90.1
- Circular dependencies: 0
- Boundary violations: 0
- Unresolved imports/unlisted dependencies: 0

## Cleanup And Dependency Findings
- Initial audit found newly exported helpers that were internal-only (`useServices`, serializer internals, and filter builder). Those exports were removed and focused tests/lint reran successfully.
- Final dead-code findings are four Jest test files treated as unused entry points by Fallow, including the new required service endpoint test. They are executed by Jest and passed, so they must not be deleted.
- No unused dependency or dependency-placement issue was reported.

## Complexity And Duplication
- Fallow flags `validateServicePayload` and serializer normalization as changed-code complexity targets. They remain explicit validation/compatibility boundaries with direct Jest coverage.
- `BookingWizard` is reported as a large function. It was already a large page workflow; this change split query/preselection orchestration into a wrapper and removed state-setting effects without redesigning the approved wizard.
- Repeated query-state/price formatting structures are reported as duplication candidates. They are small, surface-specific UI copy variants and are safe follow-up refactoring candidates rather than release blockers.

## Changed-Code Risk
- Public contract and migration risk are mitigated by 63 passing backend tests, 103 passing frontend tests, a successful production build, passing ESLint, URL-only seed validation, and deep-link regression tests.
- No circular dependency, architecture boundary, unresolved import, or dependency issue was introduced.

## Recommended Follow-Up
- Optionally split `BookingWizard` into step components.
- Optionally extract shared query-state and currency-format UI helpers.
- Optionally add a Fallow Jest entry-point configuration to avoid false-positive unused-test findings.

## Final Verdict
PARTIAL — actionable maintainability observations remain, but no correctness, dependency, boundary, or runtime blocker was identified.
