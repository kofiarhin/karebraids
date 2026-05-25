# Release Notes

## Request

Configure existing env-backed admin credentials locally.

## User-Facing Changes

- Local admin login credentials were configured in the ignored root `.env` file.
- No visible UI changes.

## Developer Changes

- No application code changes.
- Workflow artifacts were updated for the approved request.

## New Routes/APIs

none

## New Env Vars

- No new env var names.
- Existing local env vars configured: `ADMIN_USERNAME`, `ADMIN_PASSWORD`.

## Database/Schema Changes

none

## Dependencies Added/Removed

none

## Test Commands Run

- Masked env key-count checks.
- Node/dotenv admin credential assertion.
- `.env.example` placeholder check.
- `npm run test:server -- admin-auth.test.js`
- `git diff --stat`
- `git diff`
- `git status --short --ignored`

## Known Limitations

- Local `.env` still lacks `JWT_SECRET`; existing backend auth requires it before issuing admin JWTs outside test mode.
- The configured password should be treated as local-only.

## Follow-Up Work

- Add a local `JWT_SECRET` value.
- Configure Heroku config vars separately if production admin login should use these credentials.

## Suggested Commit Message

`chore: configure local admin env credentials`
