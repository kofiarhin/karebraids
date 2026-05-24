# Active Request

## Raw User Request

Implement a rotating hero image carousel on the KareBraids homepage.

Repo: React + Vite app in /client.

Requirements:
- Update the homepage hero only.
- Use existing `galleryItems` from `client/src/constants/content.js`.
- Create `heroSlides` from the first 5 gallery images.
- Replace the single static hero `<img>` with a carousel that auto-rotates.
- Keep the current hero layout, luxury frame shape, CTA buttons, and "Salon and mobile appointments" badge.
- Add small elegant dot indicators over/near the bottom of the hero image.
- Use CSS animation or React state, but keep it lightweight.
- Rotation timing: 4 to 5 seconds per image.
- Transition: smooth fade with subtle scale/zoom.
- Mobile responsive.
- Respect `prefers-reduced-motion`.
- Do not add new dependencies.
- Keep API/data logic out of UI components.
- Make minimal changes to existing files.

Expected files likely:
- `client/src/pages/Home.jsx`
- `client/src/index.css`

Use existing brand styling/colors. Do not redesign the whole hero.

## Follow-Up Answer

Dot indicators should be clickable, accessible buttons that show the active slide and let users jump to a slide.

## Normalized Workflow Request

Workflow request: update only the KareBraids homepage hero media area so it uses a lightweight carousel built from the first five `galleryItems` images. Replace the current static hero image with auto-rotating slides every 4 to 5 seconds, using smooth fade and subtle scale transitions, while preserving the existing hero layout, luxury frame, CTA buttons, and "Salon and mobile appointments" badge. Add small elegant clickable dot buttons over or near the bottom of the hero image with accessible labels and active state. Respect `prefers-reduced-motion`, keep the implementation mobile responsive, avoid new dependencies, and make minimal changes primarily in `client/src/pages/Home.jsx`, `client/src/index.css`, and focused frontend tests if needed.
