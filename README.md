# KareBraids

**Live application:** https://karebraids.vercel.app/

KareBraids is a MERN booking platform for browsing braid services, checking appointment availability, requesting bookings, sending enquiries, and managing bookings and services through a protected admin area.

## Stack

- React 19, Vite, React Router, TanStack Query, Axios, Tailwind CSS
- Node.js, Express 5, MongoDB, Mongoose, JWT
- Vitest/Testing Library and Jest/Supertest

## Local development

### 1. Install dependencies

```bash
npm install
npm install --prefix client
```

### 2. Configure the server

```bash
cp .env.example .env
```

Required local server values:

```dotenv
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/karebraids
ADMIN_USERNAME=admin
ADMIN_PASSWORD=replace-with-a-strong-password
JWT_SECRET=replace-with-a-long-random-secret
```

Do not commit `.env` or real credentials.

### 3. Seed services

The public services, service details, and booking service selector read from MongoDB. Seed the database before using those flows:

```bash
npm run seed:services
```

The seed command reads `server/data/services.json` and performs idempotent upserts by stable service `id`. It only requires `MONGODB_URI`; rerunning it updates existing service records without intentionally deleting bookings or unrelated data.

### 4. Start the application

```bash
npm run dev
```

- Client: `http://localhost:5173`
- Express API: `http://localhost:5000/api`
- Vite proxies browser requests from `/api/*` to port `5000`.

The client defaults to the same-origin `/api` prefix. `VITE_API_URL` is optional. If a separate API host is needed, create `client/.env.local` and include the complete API prefix:

```dotenv
VITE_API_URL=https://api.example.com/api
```

Do not set `VITE_API_URL` to the KareBraids frontend URL for the normal single-project Vercel deployment; leave it unset so requests remain same-origin.

## Commands

```bash
npm run dev                     # client and API
npm test                        # server Jest suite
npm run test --prefix client    # client Vitest suite
npm run lint --prefix client    # client ESLint
npm run build --prefix client   # production client build
npm run seed:services           # idempotently seed MongoDB services
```

## API routes

The Express app owns these namespaces:

- `GET /api/health`
- `GET /api/services`
- `GET /api/services/:id`
- `GET /api/services/:id/gallery`
- `GET /api/bookings/availability?service=<name>&date=YYYY-MM-DD`
- `POST /api/bookings`
- `/api/contact`
- `/api/gallery`
- `/api/admin`

Public booking requests are accepted only when the submitted service currently exists in MongoDB with `bookingEnabled: true` and `status: "available"`. The unique MongoDB index on `service + date + time` and controller conflict handling prevent duplicate slots.

## Vercel deployment

KareBraids is configured as one Vercel project serving the Vite SPA and Express API on the same origin.

### Project settings

1. Import this repository into Vercel.
2. Set **Root Directory** to the repository root (`.`), not `client`.
3. Keep `vercel.json` in control of the install command, build command, output directory, and rewrites.
4. Redeploy after changing the root directory or environment variables.

The root `vercel.json`:

- installs root and client dependencies;
- builds `client/dist`;
- rewrites `/api` and `/api/*` to `api/index.js`;
- rewrites remaining routes to `client/dist/index.html` for React Router deep links.

The Express Vercel function connects to MongoDB before forwarding the original request to `server/app.js`. `server/server.js` remains the persistent local Node entrypoint and is not used as the Vercel function.

Reference:

- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/rewrites
- https://vercel.com/docs/builds/configure-a-build

### Required Vercel environment variables

Configure all of these for **Production** and any Preview environments that should have a working API:

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB connection string, including the KareBraids database name |
| `ADMIN_USERNAME` | Yes | Admin login username |
| `ADMIN_PASSWORD` | Yes | Strong admin login password |
| `JWT_SECRET` | Yes | Long random JWT signing secret |
| `VITE_API_URL` | No | Leave unset for same-origin `/api`; if set, it must include the full API prefix |

`PORT` is not required on Vercel. The platform invokes the exported function directly.

### MongoDB Atlas requirements

- The database user in `MONGODB_URI` must have access to the KareBraids database.
- Atlas Network Access must permit connections from Vercel. Use the narrowest practical policy supported by the deployment; if `0.0.0.0/0` is temporarily used for serverless egress, require strong credentials and review the policy afterward.
- URL-encode special characters in the MongoDB username/password.
- Check Vercel function logs for authentication, DNS, timeout, or network-policy errors.

### Confirm services exist

After deployment:

```bash
curl -fsS 'https://karebraids.vercel.app/api/services'
curl -fsS 'https://karebraids.vercel.app/api/services?bookingEnabled=true&status=available'
```

Both responses should contain a non-empty `services` array. If the array is empty, seed the same production database from a trusted local shell:

```bash
MONGODB_URI='mongodb+srv://USER:PASSWORD@HOST/karebraids' npm run seed:services
```

Do not paste the production URI into source files, shell history on shared machines, tickets, or logs. Prefer a temporary environment file or secret manager-backed shell.

### Post-deployment API verification

Use a future Monday-to-Saturday date and an available service name returned by `/api/services`:

```bash
BASE_URL='https://karebraids.vercel.app'
SERVICE='Knotless Braids'
DATE='2030-01-07'

curl -i "$BASE_URL/api/health"
curl -i "$BASE_URL/api/services"
curl -i "$BASE_URL/api/services?bookingEnabled=true&status=available"
curl -G -i "$BASE_URL/api/bookings/availability" \
  --data-urlencode "service=$SERVICE" \
  --data-urlencode "date=$DATE"

curl -i -X POST "$BASE_URL/api/bookings" \
  -H 'Content-Type: application/json' \
  --data "{\"service\":\"$SERVICE\",\"date\":\"$DATE\",\"time\":\"09:00\",\"fullName\":\"Deployment Check\",\"email\":\"deployment-check@example.com\",\"phone\":\"07123456789\",\"preferredLocation\":\"Salon\",\"notes\":\"Remove after deployment verification\"}"
```

Expected results:

- health: HTTP `200` JSON;
- service endpoints: HTTP `200` with non-empty data after seeding;
- availability: HTTP `200` with `slots`;
- first controlled booking request: HTTP `201`;
- repeating the same service/date/time request: HTTP `409`.

Remove the controlled verification booking through the admin API/UI afterward. Avoid a slot that a real customer could use.

## Production troubleshooting

### API returns the React app or HTML

- Confirm the Vercel Root Directory is the repository root.
- Confirm the deployed commit contains root `vercel.json` and `api/index.js`.
- Confirm `/api/*` rewrites appear before the SPA fallback.
- Remove any stale project configuration that deploys only `client/`.

### API returns 500 or times out

- Confirm all required Vercel environment variables are present in the active environment.
- Validate `MONGODB_URI`, database-user permissions, Atlas network access, and Vercel function logs.
- Redeploy after changing environment variables.

### Services endpoint returns an empty array

Routing and MongoDB connectivity are working, but the selected database has no matching Service documents. Run `npm run seed:services` against that exact database and recheck the filtered endpoint.

### Booking says “Choose an available service”

The submitted service name is not currently stored with both `bookingEnabled: true` and `status: "available"`. Reseed or correct the service record, then select the service again from the booking page.
