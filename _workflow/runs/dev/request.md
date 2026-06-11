# Active Work Request

Fix Gallery service filtering and add previous/next modal image navigation.

## Required Behavior

- Change `client/src/services/galleryService.js#getGalleryItems()` to call backend `GET /gallery` through the shared API client.
- Send normalized `limit` and `service` query parameters and return `response.data.galleryItems || []`.
- Keep `getGalleryServices()` unchanged and do not use local `getGalleryImageItems()` for filtered Gallery results.
- Preserve the Gallery service filter UI and `?service=<slug>` URL state.
- Track the selected Gallery image by index so previous/next navigation cycles through the currently filtered `galleryItems`.
- Close/reset the modal when the filter changes and restore focus to the opening Gallery card when the modal closes.
- Add modal previous/next side controls using installed Phosphor icons.
- Support `Escape`, `ArrowLeft`, and `ArrowRight` while the modal is open.
- Hide or disable navigation for a single image, preserve backdrop click-to-close, prevent modal control clicks from closing the backdrop, and retain dialog accessibility.
- Preserve existing GSAP and reduced-motion behavior.
- Add only scoped CSS in the existing Gallery/modal stylesheet location; do not redesign the modal.
- Add/update focused tests and keep existing test/build scripts passing.

## Boundaries

- Do not change the backend schema or endpoint contract.
- Keep representative-image wording and existing Gallery filter presentation.
- Backend `GET /gallery?service=<serviceSlugOrId>` is the authoritative filtered data source.

Execution mode: `complete-workflow`.

Applied skill: design-taste-frontend
