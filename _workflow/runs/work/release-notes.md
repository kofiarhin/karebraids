# Release Notes — Theme-aware Header Navigation

- Request: fix header/navigation theme switching.
- User-facing changes: desktop and mobile header surfaces now switch coherently between warm light and existing dark themes; brand, links, active accent, CTA, theme trigger, drawer, controls, and backdrop use theme-aware roles.
- Developer changes: added explicit dark/light header semantic CSS roles and static regression coverage.
- New routes/APIs: none.
- New env vars: none.
- Database/schema changes: none.
- Dependencies added/removed: none.
- Test commands: focused Vitest passed; Vite build passed; diff check passed; Fallow passed; repository-wide baseline failures documented in verification.
- Known limitations: browser screenshot could not be captured because Playwright Chromium download was blocked by HTTP 403; baseline booking tests and lint remain failing independently of this change.
- Follow-up work: repair baseline test timing and hook lint issues in a separate request.
- Suggested commit message: `fix: make header navigation theme aware`
