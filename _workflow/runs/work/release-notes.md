# KareBraids Pre-Launch Updates Release Notes

## What Changed
- Starting prices now have one canonical seed value and one shared frontend formatter across home, services, gallery, detail, and booking surfaces.
- The offline service catalogue now contains all 11 current services and matches backend prices.
- Service preview assignments are explicit and unique; selected-style images use meaningful representative alt text.
- About Me now supports a centralized Karen profile photo, personal statement, biography, and honest pre-launch placeholder state.
- An internal empty product catalogue vocabulary is ready for future hair extensions and hair products/oils without exposing a shop.

## Owner Content Still Required
- Final approved price list: current repository prices were retained.
- Karen photo: replace `karenProfile.image` in `client/src/data/aboutPageData.js`.
- Karen statement: replace `karenProfile.statement` and clear its placeholder flag in the same file.
- Style portfolio images: current assets remain representative because no authoritative labels were available.

## Ecommerce Boundary
No cart, checkout, payments, inventory, orders, shipping, product route/API, product admin, or public coming-soon UI was added.

## Deployment Note
Run `npm run seed:services` with the deployment `MONGODB_URI` to normalize live Service documents to canonical seed prices.

## Verification
Server 72/72; client 134/134; lint passed; build passed; local image and route exposure audits passed.

## Gallery Source Remediation
- Gallery API requests still preserve service filtering and selected-service context.
- API-provided image URLs are no longer rendered. Cards, homepage previews, detail inspiration, and modals use the centralized local `/images/` representative library.
- A final source guard converts any unexpected remote image input to the local fallback.
