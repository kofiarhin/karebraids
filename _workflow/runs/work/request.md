# Active Work Request

## Source
Direct user prompts received 2026-06-12.

## Execution mode
`complete-workflow`

## Raw request
Implement KareBraids pre-launch updates for centralized and consistent starting prices, audited style/gallery image mappings, a Karen-focused About Me update, and lightweight future ecommerce preparation without exposing unfinished sales functionality. Use repository data as the source of truth, retain current prices when no approved replacements exist, preserve uncertain image mappings, and use explicit placeholders/TODOs for unavailable client content.

## Normalized request
Audit the current MERN service, gallery, About, and routing architecture; centralize service pricing at the canonical seed-data boundary and remove duplicate frontend price formatting; validate all local and remote image references, fix only objectively broken or accidental mappings, and preserve/document mappings whose semantic correctness cannot be established; add a mobile-friendly Karen profile image and personal statement configuration with clearly marked pre-launch placeholders; and add a non-UI product domain scaffold for future hair-extension and hair-product commerce. Do not add cart, checkout, payments, inventory, admin product management, public product routes, or unrelated redesign work.

## Confirmed decisions
- Repository data is the source of truth.
- Existing prices remain unchanged unless an approved replacement already exists in the repository.
- Missing Karen content uses explicit placeholders and TODOs rather than fabricated client content.
- Ambiguous image semantics are preserved and documented rather than guessed.
- Future ecommerce preparation remains internal and non-user-facing.
- Applied skill: design-taste-frontend
