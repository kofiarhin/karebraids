# KareBraids

KareBraids is a full-stack booking platform for a braiding business based in Birmingham, UK. The app lets visitors explore braid services, view gallery work, submit contact messages, and request appointments. It also includes a protected admin workspace for managing bookings and service data.

## Features

### Public website

- Luxury landing page with hero, featured services, gallery preview, testimonials, booking steps, and call-to-action sections.
- Public routes for Home, About, Gallery, Services, Service Detail, Booking, Contact, and Admin.
- Service catalogue with individual service detail pages.
- Gallery browsing powered by service/gallery API data.
- Contact form for customer enquiries.
- Multi-step booking flow for selecting a service, date, time, customer details, and confirmation.
- Booking availability checks that remove already-booked time slots.
- Duplicate booking protection per service, date, and time.
- Monday to Saturday booking calendar with past dates and Sundays disabled.

### Admin workspace

- Protected admin login using username/password credentials.
- JWT-backed admin session handling.
- Admin booking dashboard with booking totals and pending counts.
- Create, edit, update status, and delete bookings.
- Booking statuses: `pending`, `confirmed`, `cancelled`, and `completed`.
- Protected service management API routes for creating, updating, deleting, and managing service images.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- TanStack Query
- Axios
- Tailwind CSS
- Phosphor Icons
- Vitest + Testing Library

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JSON Web Tokens
- Jest + Supertest

## Project Structure

```txt
karebraids/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── components/  # Shared and page-specific UI
│   │   ├── hooks/       # Query and mutation hooks
│   │   ├── lib/         # API client helpers
│   │   ├── pages/       # Route pages
│   │   ├── redux/       # App providers
│   │   └── theme/       # Theme provider
├── server/              # Express API
│   ├── config/          # Database/env config
│   ├── constants/       # Shared backend constants
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Admin auth middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── scripts/         # Seed scripts
│   └── utils/           # Validation/serializers
└── package.json         # Root scripts and backend dependencies
```

## Public Routes

| Route | Description |
| --- | --- |
| `/` | Homepage |
| `/about` | Brand/about page |
| `/gallery` | Braids gallery |
| `/services` | Service catalogue |
| `/services/:slug` | Service detail page |
| `/styles/:slug` | Legacy style redirect |
| `/booking` | Booking wizard |
| `/contact` | Contact form |
| `/admin` | Protected admin workspace |

## API Routes

### Health

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | API welcome response |
| `GET` | `/api/health` | Health check |

### Bookings

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/bookings/availability` | Get available appointment slots for a service/date |
| `POST` | `/api/bookings` | Create a customer booking request |

### Contact

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/contact` | Create a customer contact message |

### Gallery

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/gallery` | Get gallery items |
| `GET` | `/api/gallery/services` | Get services for gallery filtering |

### Services

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/services` | List services |
| `GET` | `/api/services/:id` | Get service by `id` or `slug` |
| `GET` | `/api/services/:id/gallery` | Get gallery items for a service |

### Admin

All admin routes except login require a valid admin token.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/admin/login` | Authenticate admin |
| `GET` | `/api/admin/session` | Validate current admin session |
| `GET` | `/api/admin/bookings` | List bookings |
| `POST` | `/api/admin/bookings` | Create booking |
| `PATCH` | `/api/admin/bookings/:id/status` | Update booking status |
| `PUT` | `/api/admin/bookings/:id` | Update booking |
| `DELETE` | `/api/admin/bookings/:id` | Delete booking |
| `GET` | `/api/admin/services` | List admin services |
| `POST` | `/api/admin/services` | Create service |
| `GET` | `/api/admin/services/:id` | Get service |
| `PUT` | `/api/admin/services/:id` | Update service |
| `DELETE` | `/api/admin/services/:id` | Delete service |
| `POST` | `/api/admin/services/:id/images` | Add service image |
| `PUT` | `/api/admin/services/:id/images/:imageId` | Update service image |
| `DELETE` | `/api/admin/services/:id/images/:imageId` | Delete service image |

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- MongoDB connection string

### Install dependencies

```bash
npm install
npm install --prefix client
```

### Environment variables

Create a root `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/karebraids
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me
JWT_SECRET=replace-with-a-long-random-secret
```

Create a `client/.env` file:

```env
VITE_API_URL=http://localhost:5000
```

### Seed services

```bash
npm run seed:services
```

### Run locally

Start the API and frontend together:

```bash
npm run dev
```

Or run each side separately:

```bash
npm run server
npm run client
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:5000`

## Scripts

### Root

| Command | Description |
| --- | --- |
| `npm run dev` | Run backend and frontend together |
| `npm run server` | Run Express API with Nodemon |
| `npm run client` | Run Vite frontend |
| `npm start` | Start Express API |
| `npm test` | Run backend tests |
| `npm run test:server` | Run Jest backend tests |
| `npm run seed:services` | Seed service data |

### Client

| Command | Description |
| --- | --- |
| `npm run dev --prefix client` | Start Vite dev server |
| `npm run build --prefix client` | Build frontend |
| `npm run preview --prefix client` | Preview production build |
| `npm run lint --prefix client` | Run ESLint |
| `npm run test --prefix client` | Run Vitest |

## Data Models

### Booking

Bookings store the requested service, date, time, customer contact details, preferred location, optional notes, and status. A unique index prevents duplicate bookings for the same service/date/time combination.

### Service

Services include public IDs/slugs, category, descriptions, pricing, currency, duration, booking/gallery flags, status, primary image, gallery images, and customer reviews.

### Contact Message

Contact messages store full name, email, phone, message, status, and timestamps.

## Deployment Notes

- Set backend environment variables in the API hosting provider.
- Set `VITE_API_URL` in the frontend hosting provider before building the client.
- Ensure MongoDB network access allows the deployed backend.
- Keep `JWT_SECRET` and admin credentials private.
- Do not commit `.env` files.

## Repository

```bash
git clone git@github.com:kofiarhin/karebraids.git
cd karebraids
```
