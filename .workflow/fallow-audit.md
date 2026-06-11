# Fallow Audit

Date: 2026-06-10
Verdict: PARTIAL

## Commands

Fallow 2.92.1 ran with JSON, `--quiet`, `--explain`, stderr suppression, and non-blocking issue exits:

- `fallow audit --base main`
- `fallow dead-code`
- `fallow health --score`
- `fallow dupes`

## Results

- Health score: 84.6, grade B.
- Full repository: 26 dead-code findings, 31 duplicate groups, 6.78% duplicated lines.
- No unused dependencies, unlisted dependencies, unresolved imports, circular dependencies, re-export cycles, or boundary violations.
- The changed-code audit reports `fail`, but its introduced dead-code, complexity, and remaining duplicate findings are in unrelated existing `api/` and `server/` branch changes.
- Fallow initially found repeated reduced-motion setup in the new animation tests. That duplication was refactored and no longer appears.
- No new animation-system file or GSAP dependency is reported unused.

## Interpretation

The animation implementation passes the scoped Fallow review. The overall verdict is `PARTIAL` because branch-wide findings outside this approved frontend scope remain and were not modified.

## Security And Architecture

Fallow is not treated as SAST or dependency vulnerability scanning. No cycles or architecture boundary violations were reported. Root npm audit findings are documented separately in verification.
