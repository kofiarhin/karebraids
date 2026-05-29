# Request: Redesign KareBraids Gallery Page

Redesign the KareBraids gallery page to match the Figma reference: dark premium page, centered `GALLERY` title, clean 3-column square image grid, and centered light modal overlay.

Repo context:
- React + Vite app in `client/`
- Current route is already wired in `client/src/App.jsx`
- Current page: `client/src/pages/Gallery.jsx`
- Current modal: `client/src/components/GalleryModal.jsx`
- Gallery data: `client/src/constants/content.js`
- Global styles: `client/src/index.css`

Requested implementation:

1. Update `client/src/pages/Gallery.jsx`:
   - Keep existing `selectedItem` state, `activeTriggerRef`, `openModal`, and `closeModal` behavior.
   - Replace the current page hero copy with:

     ```jsx
     <div className="gallery-title-wrap">
       <h1>GALLERY</h1>
     </div>
     ```

   - Keep rendering `galleryItems` as buttons.
   - Keep `GalleryModal` usage.
   - Remove visible card caption text from markup only if CSS hiding is not enough; prefer CSS hiding.

2. Update `client/src/index.css`:
   - Override the existing gallery styles so the page resembles the Figma:
     - dark canvas
     - centered title
     - 3-column grid on desktop
     - square image tiles
     - no masonry spans
     - no visible captions
     - responsive 2 columns on tablet, 1 column on mobile
   - Replace/override current `.gallery-grid`, `.gallery-card`, `.gallery-card.feature`, `.gallery-card.tall`, `.gallery-card.wide`, `.gallery-card.medium`, `.gallery-card.compact` styles.
   - Modal should match the Figma overlay:
     - dark translucent backdrop
     - centered large light/cream rectangle
     - image contained inside
     - close button remains accessible
     - hide modal copy for this design.

3. Preserve accessibility:
   - Buttons must keep `aria-label`.
   - Modal must still close on Escape/backdrop/close button.
   - Focus should return to clicked gallery item after closing.

4. Run:
   - `npm run lint --prefix client`
   - `npm run test --prefix client`
   - `npm run build --prefix client`

Return the changed files and summarize exactly what changed.
