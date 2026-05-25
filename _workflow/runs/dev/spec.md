# Configure Env-Backed Admin Credentials Spec

## 1. Metadata
- Spec filename: `_workflow/runs/dev/spec.md`
- Date: 2026-05-25
- Request ID / slug: configure-env-admin-credentials
- Request source: Latest direct user prompt plus one grill-me clarification answer.
- Execution mode: complete-workflow after explicit spec approval.
- Request classification: ops
- Scope level: small
- Risk level: medium

## 2. Original Request
- Raw user request: "seed the databae with admin credentials. email should be admin@gmail.com password: [user-provided local password]"
- Clarifying answer: "lets use environment variables"
- Normalized request: Configure the existing env-backed admin login locally so `ADMIN_USERNAME` is `admin@gmail.com` and `ADMIN_PASSWORD` is the user-provided local password, without database seeding.
- Source prompt / `<artifact-root>/request.md` reference: `_workflow/runs/dev/request.md`

## 3. Questions And Answers
- Questions asked:
  - The current backend does not store admin users in MongoDB; admin login checks `ADMIN_USERNAME` and `ADMIN_PASSWORD` from environment variables. Do you want to change this to a database-backed admin account seed?
- Answers received:
  - Use environment variables.
- Questions skipped: None.
- Remaining open questions: None blocking. The existing `JWT_SECRET` value remains unchanged.

## 4. Problem Definition
- Problem being solved: The local backend currently lacks admin credential env vars in root `.env`, so the configured admin login cannot work outside test mode.
- Why it matters: The hidden admin dashboard depends on backend env credentials to issue admin JWTs.
- Current pain point: Root `.env` currently has `PORT` and `MONGODB_URI` set, but not `ADMIN_USERNAME`, `ADMIN_PASSWORD`, or `JWT_SECRET` visibility was not printed; `.env.example` already documents the required admin variables.
- Expected value: The local app can authenticate the admin with the requested email and password using the existing auth implementation.

## 5. Current State Analysis
- Existing behavior: `server/controllers/adminAuthController.js` reads `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET` at login time. `server/config/env.js` fails fast outside test mode when required auth vars are missing.
- Existing architecture/components: Env-backed admin auth with JWT already exists; no admin database model exists.
- Existing files/modules likely involved:
  - `.env`
  - `.env.example` only if example placeholder clarity needs adjustment
  - `_workflow/runs/dev/*`
- Existing data flow: Admin login request posts credentials to `/api/admin/login`; backend compares credentials with env vars and signs JWT using `JWT_SECRET`.
- Existing API/UI/CLI/workflow behavior: No code path requires database seeding for admin credentials.
- Existing tests or verification coverage:
  - `server/tests/admin-auth.test.js`
  - `server/tests/env.test.js`

## 6. Desired End State
- Expected final behavior: Local root `.env` includes admin username and password env vars for the requested credentials.
- User-facing outcome: Admin can log into `/admin` locally with the configured email and password when the server runs with a valid JWT secret.
- Developer-facing outcome: No database seed command is needed for admin credentials.
- System/workflow outcome: Existing env-backed auth remains unchanged.
- Backward compatibility expectations: Existing admin auth tests continue to pass; `.env.example` remains safe to commit.

## 7. Scope
- In scope:
  - Add or update local root `.env` admin credential entries.
  - Preserve existing `PORT`, `MONGODB_URI`, and any existing `JWT_SECRET`.
  - Verify env loading without printing secret values.
  - Run focused backend auth/env verification when practical.
- Out of scope:
  - Database seeding.
  - New admin/user model.
  - Password hashing/database auth.
  - Frontend UI changes.
  - Deployment or Heroku config changes.
  - Changing the admin login request field from `username` to `email`.
- Non-goals:
  - Improving password strength or rotating JWT secrets.
  - Changing auth architecture.
- Explicit boundaries:
  - Do not write the real local password to tracked files.
  - Do not print `.env` secret values in logs or final output.

## 8. Users And Use Cases
- Primary users: Site owner/admin running the local app.
- Secondary users: Developers verifying admin auth locally.
- Main use cases:
  - Start the backend with root `.env`.
  - Log into `/admin` using the configured admin credentials.
- Edge use cases:
  - Missing `JWT_SECRET` still causes backend fail-fast behavior outside tests.
  - Existing `.env` values for unrelated variables must remain intact.

## 9. Functional Requirements
- Required behaviors:
  - Root `.env` contains `ADMIN_USERNAME=admin@gmail.com`.
  - Root `.env` contains `ADMIN_PASSWORD` set to the user-provided local password.
  - Existing env vars are preserved.
  - `.env.example` does not contain the real password.
- Inputs:
  - Existing root `.env`.
  - User-provided local admin credential values.
- Outputs:
  - Updated local root `.env`.
  - Updated workflow artifacts.
- State changes:
  - Local environment configuration changes only.
- Error states:
  - If `.env` is missing or malformed, create/update it carefully while preserving existing values.
  - If `JWT_SECRET` is absent, document that login still requires it and do not invent a secret unless explicitly approved.
- Permissions/auth expectations:
  - Existing admin auth uses env comparison and JWT issuance.

## 10. Non-Functional Requirements
- Performance expectations: Not applicable.
- Reliability expectations: Preserve existing `.env` lines and avoid duplicate conflicting admin entries.
- Security/privacy expectations: Do not commit real credentials; do not print password/JWT secret values; do not weaken auth code.
- Accessibility expectations: Not applicable.
- Maintainability expectations: Keep the change to configuration only.
- DX expectations: The required local env vars should be easy to see in `.env.example` without exposing real secrets.

## 11. Affected Surfaces
- Files likely affected:
  - `.env`
  - `_workflow/runs/dev/request.md`
  - `_workflow/runs/dev/spec.md`
  - `_workflow/runs/dev/progress.md`
  - `_workflow/runs/dev/handoff.md`
  - Later after implementation: `_workflow/runs/dev/tasks.md`, review, verification, release notes, summary
- Directories likely affected:
  - `_workflow/runs/dev/`
- UI surfaces: Not applicable.
- API routes: Not applicable; existing `/api/admin/login` remains unchanged.
- Components: Not applicable.
- Services: Not applicable.
- Database/schema: Not applicable.
- Config/env vars:
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - Existing `JWT_SECRET`
- Tests:
  - Focused backend auth/env tests may be run for regression.
- Docs:
  - `.env.example` only if needed for placeholders.
- Workflow artifacts:
  - Run-scoped workflow files under `_workflow/runs/dev/`.

## 12. Dependency And Integration Map
- Internal dependencies:
  - `server/config/env.js`
  - `server/controllers/adminAuthController.js`
  - `dotenv` loading in `server/server.js`
- External packages/services:
  - `dotenv`
  - `jsonwebtoken`
- Integration points:
  - Root `.env` loaded by backend startup.
  - Admin login form submits a `username` field, which can contain an email address.
- Ordering constraints:
  - Save spec and receive approval before changing `.env`.
  - Keep credential changes local and untracked.
- Migration/setup requirements: None.

## 13. Data And State Impact
- Data models: No change.
- Database changes: None.
- State management changes: None.
- Cache/session/local storage impact: Existing admin JWT sessions may remain valid until expiry if signed by unchanged `JWT_SECRET`.
- Backward compatibility impact: Admin username changes from whatever was previously configured/missing to `admin@gmail.com` locally.

## 14. UX / API / Workflow Expectations
- UX expectations: Admin enters `admin@gmail.com` into the existing Username field and the configured password into the Password field.
- API contract expectations: `/api/admin/login` still accepts `{ username, password }`.
- CLI/workflow behavior: Backend should load root `.env` through existing startup.
- Error handling expectations: Missing env vars continue to produce existing fail-fast or 500 auth-not-configured behavior.
- Empty/loading/success/failure states: Not applicable.

## 15. Execution Strategy
- Recommended implementation approach:
  - Update root `.env` by adding or replacing `ADMIN_USERNAME` and `ADMIN_PASSWORD` entries.
  - Preserve existing env values.
  - Avoid touching tracked implementation code.
  - Leave `.env.example` unchanged unless placeholders are stale.
- Suggested sequencing:
  - Create task plan after approval.
  - Implement the env edit.
  - Verify env loading without printing secret values.
  - Run focused backend tests if practical.
  - Complete workflow artifacts and final diff audit.
- Safe rollout/migration approach: Local-only ignored config change.
- Files to inspect before editing:
  - `.env` variable names only; avoid printing secret values.
  - `.env.example`
  - `server/config/env.js`
  - `server/controllers/adminAuthController.js`
- Decisions to avoid until more evidence exists:
  - Do not switch to database-backed admin users.
  - Do not generate or rotate JWT secrets.

## 16. Verification Strategy
- Required automated checks:
  - Run a Node/dotenv check that asserts `ADMIN_USERNAME` and `ADMIN_PASSWORD` are present without printing secret values.
  - Run `npm run test:server -- admin-auth.test.js` if available.
- Required manual checks:
  - Confirm `.env` remains ignored by git.
  - Confirm final output does not reveal the password.
- Test types needed:
  - Config loading check.
  - Existing backend auth regression tests.
- Build/lint/typecheck expectations: Not required for config-only local change.
- Acceptance evidence required:
  - `.env` contains expected admin variable names.
  - Verification command passes or inability is documented.
- Proof of completion:
  - Workflow progress, review, release notes, summary, and handoff updated.

## 17. Acceptance Criteria
- [ ] Root `.env` has `ADMIN_USERNAME` set to `admin@gmail.com`.
- [ ] Root `.env` has `ADMIN_PASSWORD` set to the user-provided local password without printing it.
- [ ] Existing `.env` values such as `PORT`, `MONGODB_URI`, and any `JWT_SECRET` are preserved.
- [ ] `.env.example` does not contain the real local password.
- [ ] No database seed, user model, auth architecture, frontend UI, API contract, or deployment config change is introduced.
- [ ] Relevant config/auth verification is run or any inability is documented.

## 18. Edge Cases And Failure Modes
- Edge cases:
  - Duplicate env keys already exist.
  - `.env` has comments or blank lines that should be preserved.
  - `JWT_SECRET` is missing, so credentials alone are not enough for successful login.
- Failure modes:
  - Accidentally committing credentials.
  - Printing secret values in logs.
  - Creating duplicate conflicting admin env entries.
- Regression risks:
  - Low if implementation is config-only.
  - Medium security risk from the intentionally weak local password.
- Recovery expectations:
  - If duplicates are found, normalize to one active value per key.
  - If verification fails because `JWT_SECRET` is missing, document that separate required env var.

## 19. Risks And Mitigations
- Technical risks:
  - `.env` parsing could be disrupted by malformed lines.
  - Mitigation: Use simple key-value updates and preserve other lines.
- Product/UX risks:
  - The login form label says "Username" even though the value is an email address.
  - Mitigation: No UI change because scope says env variables only; email works as username value.
- Security risks:
  - The requested password is weak.
  - Mitigation: Treat it as local-only, do not commit it, and note that production should use a stronger secret.
- Scope risks:
  - Original wording mentioned database seeding.
  - Mitigation: Clarification explicitly selected environment variables.
- Mitigation plan:
  - Keep edits local and narrow.

## 20. Assumptions
- Explicit assumptions:
  - The admin email should be stored in `ADMIN_USERNAME`, because existing API and UI use the `username` field.
  - The existing local `JWT_SECRET`, if present, should remain unchanged.
  - If `JWT_SECRET` is absent, this task should report it rather than invent one.
  - The user-provided password is intended for local development.
- Confidence level: High.
- What to revisit if assumptions are wrong:
  - If production credentials are intended, configure them in Heroku config vars instead of root `.env`.
  - If the login field should be renamed to email, that becomes a frontend/API copy task.

## 21. Open Questions
- Blocking questions: None.
- Non-blocking questions:
  - Should production/Heroku config vars also be updated? Out of scope unless explicitly requested.
  - Should a stronger local password be used? Recommended for non-local environments.
- Execution impact: None; proceed after spec approval.

## 22. Task Extraction Notes
- Suggested vertical task boundaries:
  - `TASK-001: Configure local admin env credentials`
  - `TASK-002: Verify config and close workflow`
- Suggested first task:
  - Update root `.env` with admin credential keys while preserving existing env values.
- Suggested task ordering:
  - Config edit first, verification and closeout second.
- Areas that should not become separate tasks:
  - Database seeding.
  - Admin auth refactor.
  - Frontend copy/styling changes.
- How the 3-pass Build -> Refine -> Polish loop should apply:
  - Build: prove missing admin env keys, add them.
  - Refine: check duplicate key handling and `.env.example` safety.
  - Polish: run focused verification and final diff/security audit.

## 23. Frontend Taste Application
- Not applicable. This request does not touch frontend/UI surfaces.
