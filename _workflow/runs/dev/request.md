# Active Work Request

Implement a reusable GSAP animation system across all public KareBraids pages in the React + Vite client.

Public routes:

- `/`
- `/about`
- `/gallery`
- `/services`
- `/services/:slug`
- `/booking`
- `/contact`

Exclude `/admin` from decorative GSAP animation.

Use GSAP, `@gsap/react`, and ScrollTrigger. Install `gsap` and `@gsap/react` if missing.

Create a centralized setup and reusable hooks/components for route transitions, scroll reveals, staggered content, text reveals, image mask reveals, and gentle parallax. Keep motion subtle and premium, make Gallery the strongest showcase, keep Booking fast and immediately interactive, respect `prefers-reduced-motion`, scope selectors to refs/contexts, clean up animations and ScrollTriggers, avoid layout shift and memory leaks, and preserve all existing UI, copy, routes, APIs, and behavior.

Required verification:

- `npm install`
- `npm install --prefix client`
- `npm run test`
- `npm run test --prefix client`
- `npm run build --prefix client`

Execution mode: `complete-workflow`.

Applied skill: design-taste-frontend
