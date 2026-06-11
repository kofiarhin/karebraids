# Release Notes: Public GSAP Motion System

Date: 2026-06-10

- Added centralized GSAP, `@gsap/react`, and ScrollTrigger setup.
- Added reusable page transition, reveal, stagger, image reveal, parallax, and reduced-motion utilities.
- Applied consistent incoming route and scroll-triggered motion to all public pages.
- Kept `/admin` outside decorative animation.
- Upgraded Gallery with staggered image reveals, shallow parallax, hover composition, and modal entry motion.
- Kept Booking motion short and non-blocking, with a mobile overflow regression fix.
- Removed the legacy homepage-only global IntersectionObserver reveal hook.
- Added animation, route exclusion, Gallery, reduced-motion, and mobile regression coverage.

All server/client tests, client lint, and the client production build pass.
