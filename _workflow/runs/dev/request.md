Add an admin dashboard where the admin has full CRUD functionality for bookings only.

Confirmed scope:
- Add a simple admin login protected by backend-issued JWT.
- Admin credentials come from the root `.env`.
- Guard all admin API routes.
- Guard the `/admin` frontend route.
- Keep `/admin` hidden from public navigation.
- Full CRUD applies only to bookings.
- Expand booking status to `pending`, `confirmed`, `cancelled`, and `completed`.
- Admins can edit booking status from the dashboard.
- Admin-created and admin-edited bookings use the same service/date/time/contact/notes validation, Monday-Saturday date rules, and duplicate time-slot prevention as the public booking form.
- Services and gallery content management are out of scope.
