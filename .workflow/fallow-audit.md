# Fallow Audit

## Metadata
- Date: 2026-06-08
- Scope: representative local image library frontend refactor
- Commands:
  - `FALLOW_AGENT_SOURCE=codex npx fallow audit --base HEAD --format json --quiet --explain 2>/dev/null || true`
  - `FALLOW_AGENT_SOURCE=codex npx fallow health --format json --quiet --explain 2>/dev/null || true`
- Fallow version: 2.89.0
- Schema version: 7

## Result
- Verdict: PARTIAL
- Changed-code audit verdict: `fail`
- Health score: 75.2 / 100 (B)
- Files analyzed: 126
- Average maintainability: 90.3
- Circular dependencies: 0
- Boundary violations: 0
- Unresolved imports/unlisted dependencies: 0

## Cleanup And Dependency Findings
- Five dead-code findings were reported: three inherited compatibility helper exports in `client/src/data/services.js` and two duplicate export-name groupings (`getGalleryItems`, `SERVICE_IMAGE_FALLBACK`).
- The helper exports are retained for legacy/local compatibility and tests; the duplicate names exist in separate data and API-service namespaces with different responsibilities.
- No unused package, unresolved import, unlisted dependency, circular dependency, re-export cycle, or boundary violation was reported.

## Complexity And Duplication
- No changed-code complexity finding was introduced.
- Four duplication groups were attributed as introduced, primarily expected repeated metadata/assertion structures in focused tests and representative UI labels. They do not indicate divergent image authority.
- Existing repository complexity hotspots remain outside this request; the required tests, lint, and build all pass.

## Changed-Code Risk
- New image/data behavior has focused TDD coverage and all 112 frontend plus 63 backend tests pass.
- Vite build and ESLint pass.
- Static audits prove 15 local image paths exist, production paths are centralized, and no frontend remote Pexels URL or service-gallery authority remains.

## Recommended Follow-Up
- Optionally configure intentional compatibility exports/namespace duplicates in Fallow.
- Optionally refactor existing repository complexity hotspots in separate scoped work.

## Final Verdict
PARTIAL — Fallow reports intentional compatibility/namespace export findings and test duplication, but no correctness, import, dependency, circular, boundary, or changed-code complexity blocker.
