# Project Context

This file captures durable repository facts discovered during workflow runs. Keep it concise and update it when repo conventions become clear.

## Project Summary

- Project name: KareBraids
- Purpose: Braiding service website with public booking/contact/gallery APIs and protected admin management APIs.
- Current maturity: MVP / production-oriented prototype.

## Stack

- Frontend: React with Vite
- Backend: Express
- Database: MongoDB with Mongoose
- Runtime: Node.js
- Languages: JavaScript / JSX
- Styling: Tailwind CSS
- Deployment: Not documented

## Package Manager

- Detected package manager: npm
- Lockfiles: `package-lock.json`
- Install command: `npm install`

## Common Commands

```bash
# Test
npm run test:server
npm run test --prefix client

# Lint
# No dedicated lint script is currently configured.

# Build
npm run build --prefix client

# Typecheck
# No dedicated typecheck script is currently configured.
```

## Testing Tools

- Unit tests: Jest for backend utilities/models; Vitest for frontend tests.
- Integration tests: Supertest for backend API routes.
- End-to-end tests: Not documented.
- Manual verification notes: Run `git diff --check` before final handoff.

## Repo Conventions

- Folder conventions: Backend code lives under `server/` with `controllers/`, `models/`, `routes/`, `utils/`, `scripts/`, and `tests/`.
- Naming conventions: Backend models use PascalCase filenames; controllers and utilities use camelCase filenames.
- API conventions: Validation errors use `{ message: errors[0], errors: [...] }`; protected admin APIs use `requireAdmin` with bearer JWT auth.
- State management conventions: Frontend server data should stay in query/service layers, not duplicated into global client state.
- Error handling conventions: Controllers pass unexpected errors to the Express error middleware, which returns a safe 500 response.

## Architecture Rules

- MongoDB Service documents are the runtime source of truth for public gallery service previews, gallery items, service images, and service reviews.
- Gallery items are generated from embedded `Service.images`; do not create a separate Gallery collection.
- The static `server/data/services.json` file is only for seed/migration use, not runtime gallery data.
- Admin service and image management routes must remain protected by `requireAdmin`.

## Known Constraints

- No file upload system is currently implemented for service images; admins manually provide image URLs.
- No Cloudinary, S3, or other external image storage integration is currently in scope.
- Existing public gallery API contracts must remain backward compatible for the frontend.

## Open Questions

- Whether future admin service ordering needs an explicit `sortOrder` field.
