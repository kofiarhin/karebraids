# Fallow Audit

- Date: 2026-06-06
- Request: KareBraids global theme system
- Command: `npx fallow health --format json --quiet --explain 2>/dev/null || true`
- JSON envelope: `kind: health`, schema version 7, Fallow 2.89.0
- Verdict: PARTIAL

## Summary

Fallow completed with valid machine-readable JSON. Repository health scored **75.8 (B)** across 113 analyzed files, with average maintainability **90.6**. The report contains existing repository-wide dead-code, unit-size, coupling, and validation/page complexity debt; it did not produce a complexity finding or hotspot for the changed theme source files.

## Changed-Code Risk

- No Fallow `findings` or `hotspots` were reported for `ThemeProvider.jsx`, `ThemeMenu.jsx`, `Header.jsx`, `theme.js`, or `ThemeContext.js`.
- `ThemeMenu` is listed as a large function at 196 lines because accessible nested-menu markup and event handling live in one reusable component; cyclomatic/cognitive thresholds were not exceeded.
- No circular dependency or unused dependency penalty was reported.
- The implementation adds no dependency, API, database, auth, or environment surface.

## Notable Repository Findings

- `client/src/pages/Booking.jsx`: existing high cyclomatic/cognitive complexity; also the source of a pre-existing full-lint hook error.
- `server/utils/serviceValidation.js` and `server/utils/bookingValidation.js`: existing critical CRAP/coverage findings.
- `client/src/pages/Admin.jsx` and existing server auth/validation functions: high/moderate estimated coverage-risk findings.
- Repository vital signs include 14 estimated dead files, 8 dead exports, and 5% duplicated lines; these are outside the approved theme scope.

## Cleanup And Architecture Review

- Theme constants/storage/media resolution are separated from React lifecycle code.
- Context access is separated from the provider to preserve Fast Refresh lint compliance.
- Existing semantic CSS architecture is extended rather than duplicated into component classes.
- No changed-code circular/re-export cycle, unused dependency, unlisted dependency, security candidate, or architecture-boundary issue was identified by this health run.

## Recommended Follow-Up

- Address Booking/Gallery hook lint and complexity in a separate request.
- Add targeted coverage for server validation utilities.
- Consider splitting ThemeMenu presentation subtrees only if future options/menus expand; current complexity does not require it.

## Verdict Rationale

`PARTIAL` reflects existing repository-wide quality findings and the pre-existing full-lint failure. The global theme changes themselves introduce no reported Fallow finding or hotspot and are supported by passing targeted lint, tests, and build.

## 2026-06-06 — Theme Trigger Refinement Refresh

- Command: `npx fallow health --format json --quiet --explain 2>/dev/null || true`
- Result: health 75.8 (B), valid `health` JSON envelope.
- Changed-surface result: no finding or hotspot for ThemeMenu or the CSS trigger refinement.
- Verdict remains: PARTIAL due existing repository-wide findings; this corrective UI diff adds no reported quality risk.
