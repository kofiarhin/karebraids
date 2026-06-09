# KareBraids

**Live Demo:** https://karebraids.vercel.app/

KareBraids is a full-stack booking platform for a braiding business based in Birmingham, UK. The app lets visitors explore braid services, view gallery work, submit contact messages, and request appointments. It also includes a protected admin workspace for managing bookings and service data.

## Live Demo

Visit the production application:

https://karebraids.vercel.app/

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

...