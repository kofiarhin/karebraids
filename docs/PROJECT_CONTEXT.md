# Project Context

This file captures durable repository facts discovered during workflow runs. Keep it concise and update it when repo conventions become clear.

## Project Summary

- Project name: `KareBraids`
- Purpose: Premium UK-based African hair braiding booking website with salon and mobile appointment requests.
- Current maturity: `MVP`

## Stack

- Frontend: `React + Vite`
- Backend: `Express`
- Database: `MongoDB via Mongoose`
- Runtime: `Node.js`
- Languages: `JavaScript, JSX, CSS`
- Styling: `Tailwind CSS v4 entrypoint plus custom CSS`
- Deployment: `Frontend Namecheap via GitHub Actions; backend Heroku per project rules`

## Package Manager

- Detected package manager: `npm`
- Lockfiles: `package-lock.json`, `client/package-lock.json`
- Install command: `npm install` and `npm install --prefix client`

## Common Commands

```bash
# Test
npm test
npm test --prefix client

# Lint
npm run lint --prefix client

# Build
npm run build --prefix client

# Typecheck
Not configured
```

## Testing Tools

- Unit tests: `Vitest/React Testing Library for frontend; Jest for backend utilities`
- Integration tests: `Supertest for backend routes with mocked Mongoose model calls`
- End-to-end tests: `Not configured`
- Manual verification notes: `Run frontend dev server with npm run client; backend requires MONGODB_URI outside tests`

## Repo Conventions

- Folder conventions: `client/src/pages`, `client/src/components`, `client/src/services`, `client/src/hooks`, `client/src/lib`, `server/controllers`, `server/models`, `server/routes`, `server/utils`, `server/tests`
- Naming conventions: `PascalCase React components; camelCase functions; CommonJS backend modules`
- API conventions: `Backend routes under /api; frontend API calls through client/src/lib/api.js and services`
- State management conventions: `TanStack Query for server state; local React state for isolated UI state`
- Error handling conventions: `Backend returns JSON message/errors; frontend displays inline alerts`

## Architecture Rules

- Backend must fail fast on missing `MONGODB_URI` outside tests.
- Booking uniqueness is enforced by a compound Mongoose index on `service`, `date`, and `time`.
- Frontend components should not hard-code API base URLs.

## Known Constraints

- Public booking endpoint has no rate limiting yet.
- Backend tests currently mock Mongoose persistence instead of using a live/in-memory MongoDB.
- Gallery imagery is placeholder Pexels content until owned brand images are available.

## Open Questions

- What real KareBraids images, contact details, and salon location should replace placeholders?
