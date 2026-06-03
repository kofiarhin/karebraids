# Request

Migrate services and gallery data from the static JSON file into MongoDB and make the database the single source of truth.

## Normalized Workflow Request

Implement a backend data migration that creates a MongoDB-backed `Service` model, updates public gallery endpoints to read services/images/reviews from MongoDB while preserving their existing response contracts, adds protected admin service and embedded image CRUD endpoints using `requireAdmin`, adds a safely re-runnable seed/migration script from `server/data/services.json`, validates service/image/review payloads with meaningful errors, and adds backend Jest/Supertest coverage for gallery listing/filtering, service CRUD, image CRUD, and seed logic.

## Confirmed API Contract Decision

Use this response contract for all new admin service and image endpoints:

- `GET /api/admin/services` returns `{ services: [...] }`.
- `GET /api/admin/services/:id` returns `{ service: {...} }`.
- `POST /api/admin/services` returns `201 { message: "Service created.", service: {...} }`.
- `PUT /api/admin/services/:id` returns `{ message: "Service updated.", service: {...} }`.
- `DELETE /api/admin/services/:id` returns `{ message: "Service deleted." }`.
- `POST /api/admin/services/:id/images` returns `201 { message: "Service image added.", service: {...}, image: {...} }`.
- `PUT /api/admin/services/:id/images/:imageId` returns `{ message: "Service image updated.", service: {...}, image: {...} }`.
- `DELETE /api/admin/services/:id/images/:imageId` returns `{ message: "Service image deleted.", service: {...} }`.

Validation errors must follow the existing API pattern:

```json
{
  "message": "errors[0]",
  "errors": ["..."]
}
```

Do not change the public gallery API response shape.
