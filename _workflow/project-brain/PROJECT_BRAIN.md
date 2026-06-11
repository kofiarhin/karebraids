# Project Brain

Generated projection of `_workflow/project-brain/project.json`. JSON remains authoritative.

## Current Workflow

- Run: `dev`
- Stage: Complete
- Status: Completed and verified
- Next stage: None

## Active Goal

Implement a reusable GSAP and ScrollTrigger animation system across every public KareBraids route while leaving `/admin` outside the decorative animation boundary.

## Active Constraints

- Preserve existing public UI, copy, routes, API behavior, booking behavior, Gallery accessibility, and responsive usability.
- Respect `prefers-reduced-motion` by showing content immediately with no GSAP motion.
- Keep Booking motion brief and non-blocking.
- Give Gallery the richest restrained treatment without adding a new modal or navigation model.
- Use scoped refs/GSAP contexts and clean up animations and ScrollTriggers.

## Implemented Architecture

- GSAP, `useGSAP`, and ScrollTrigger are registered centrally.
- Reusable route, reveal, stagger, image, and parallax primitives are available.
- Public routes use a public-only transition boundary; `/admin` remains a sibling route.
- The homepage-only global IntersectionObserver reveal implementation was removed.

## Verification

- 71 server tests and 120 client tests passed.
- Client lint and production build passed.
- Browser route, Admin exclusion, reduced-motion, mobile overflow, and console checks passed.
- Fallow verdict is `PARTIAL` due unrelated branch-wide findings; the animation scope has no unused dependency, cycle, or boundary finding.

## Existing Durable Architecture

- Browser API requests default to `/api`; `VITE_API_URL` is an optional complete-prefix override.
- Vite proxies `/api` to local Express during development.
- Root `vercel.json` builds `client/dist`, routes `/api/*` to `api/index.js`, and sends remaining paths to the SPA.
- Public service and booking data is sourced through Express, MongoDB Service records, TanStack Query, and the shared client API.
- Curated representative visuals are served from the frontend local image library.

## Open Questions

None blocking.

## Active Artifacts

- Request: `_workflow/runs/dev/request.md`
- Spec: `_workflow/runs/dev/spec.md`
- Tasks: `_workflow/runs/dev/tasks.md`
- Review: `_workflow/runs/dev/review.md`
- Summary: `_workflow/runs/dev/summary.md`
- Handoff: `_workflow/runs/dev/handoff.md`
- Run memory: `_workflow/runs/dev/brain.json`
