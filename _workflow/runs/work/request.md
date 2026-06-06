# Active Work Request

## Request ID
`theme-menu-trigger-refinement`

## Source
Latest direct user prompt on 2026-06-06. Requirements are fully defined and the user explicitly instructed the agent not to enter discovery mode or ask questions.

## Execution Mode
`complete-workflow` corrective continuation of the approved global theme spec.

## Normalized Request
Refine the existing KareBraids ThemeMenu overflow trigger so it reads as a quiet secondary utility and no longer competes with the Book Appointment CTA. Keep all theme logic, persistence, system syncing, nested menu behavior, keyboard support, outside-click/Escape handling, focus management, and desktop/mobile functionality unchanged.

Use a compact approximately 36px ghost trigger with a transparent background, subtle semantic border, secondary text color, restrained semantic hover treatment, visible focus ring, and approximately 10–12px separation from the CTA. Ensure the same trigger remains intentional inside the mobile drawer. Add or update tests that protect the visual hierarchy and run existing verification.

## Explicit Boundaries
- CSS/UI hierarchy refinement only; no theme logic changes.
- No visible Theme label.
- No new dependencies, page redesigns, backend/API/database/auth/env changes, or Tailwind dark variants.
