# Active Workflow Request

Optimize the KareBraids homepage so it feels less text-heavy and more visual.

Requirements:
- Keep the current brand style and layout direction.
- Do not redesign the whole site.
- Use existing `galleryItems` images from `client/src/constants/content.js`.
- Every homepage section should include some visual/image element.
- Keep copy concise and premium.
- Update only the homepage and CSS unless a small reusable helper is clearly needed.

Section changes:
1. Hero:
   - Keep the rotating hero carousel already planned/implemented.
2. Trust strip:
   - Add a small overlapping image thumbnail cluster using 3-5 gallery images.
   - Keep existing trust badges.
3. Featured services:
   - Convert service tiles into more visual cards.
   - Each service card should include an image from `galleryItems`.
   - Keep service title, duration, and short description.
   - Use image overlays/gradient so text remains readable.
4. Why choose KareBraids:
   - Add a supporting image panel beside the reasons.
   - Use a process/detail image from the gallery.
   - Keep mobile-first responsive stacking.
5. Gallery preview:
   - Keep as image grid.
6. Testimonials:
   - Add a visual panel or small client/style thumbnails beside/inside the testimonial section.
   - Keep testimonial text readable.
7. CTA section:
   - Add a soft background image or image panel using a gallery image.
   - Apply dark/green overlay so CTA text stays accessible.

Technical:
- Use existing `galleryItems`; no new image assets.
- No new dependencies.
- Keep accessibility: meaningful alt text, readable contrast.
- Mobile responsive.
- Respect existing animations and `prefers-reduced-motion`.
- Minimal, clean changes.
- Expected implementation files:
  - `client/src/pages/Home.jsx`
  - `client/src/index.css`
