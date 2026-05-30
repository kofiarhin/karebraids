# Active Workflow Request

## Source
Latest direct user prompt, clarified through grill-me intake and explicitly confirmed by the user.

## Execution Mode
`complete-workflow`

## Normalized Request
Replace the KareBraids homepage `Signature Styles` service-card section and older four-image `GalleryPreview` with one reusable, premium six-image `GalleryFeature` teaser sourced from the existing `galleryItems`. Place it after `TrustStrip` and before `WhyChoose`. Make each preview card an individually keyboard-accessible React Router `Link` to `/gallery`, add a `View Full Gallery` CTA beneath the grid, and redirect the header `Services` item and hero `View Styles` CTA from `#signature-styles` to `/gallery`. Preserve services and booking elsewhere. Add scoped CSS for an editorial three-column desktop layout with varied heights, offsets on cards 2 and 5, warm overlays, glass-style captions, zoom hover, visible focus, and mobile one-column reset. Preserve reveal behavior, add/update Vitest coverage TDD-first, remove safely unused homepage-only code, and verify tests, lint, and build.
