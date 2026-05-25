Configure the existing environment-variable-backed admin login credentials locally.

Confirmed scope:
- Do not add database-backed admin users or seed scripts.
- Use the existing backend env variables: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and existing `JWT_SECRET`.
- Set root `.env` so the admin username is `admin@gmail.com`.
- Set root `.env` so the admin password uses the user-provided local password from the chat.
- Keep `.env.example` free of real credentials; update example text only if needed.
- Do not change frontend UI, backend auth behavior, deployment config, or database schema unless verification proves a missing env example only.
