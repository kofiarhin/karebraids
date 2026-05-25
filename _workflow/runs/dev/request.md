Fix missing homepage images.

Confirmed scope:
- Some images on the home page are not visibly showing.
- Investigate and fix the frontend home page image rendering issue.
- Keep the fix localized to the home page/reveal/image-loading behavior unless verification proves a shared frontend helper needs adjustment.
- Preserve the current visual direction, image choices, hero carousel, responsive layout, and accessibility semantics.
- Do not change backend APIs, deployment configuration, database schema, admin behavior, or unrelated pages unless required for a shared helper regression.
