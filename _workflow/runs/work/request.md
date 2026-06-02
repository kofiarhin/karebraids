# Active Request

Implement the KareBraids gallery/service feature.

Create a service-driven gallery system backed by `server/data/services.json` with eight services, each containing exactly ten Pexels-backed sample images and exactly three reviews. Add backend gallery endpoints for service previews, all gallery images, and backend-filtered service gallery results. Update frontend TanStack Query/service logic so gallery data and service previews come from the backend, `/gallery` shows all images by default, `/gallery?service=<service-id>` requests backend-filtered results, selected service intro/reviews render only when a service is selected, homepage/service preview cards use `service.images[0]`, and service cards route to `/gallery?service=<service-id>`. Keep API calls out of UI components, avoid frontend gallery-data duplication, preserve modal behavior, and keep frontend API calls relative to an `/api` base URL such as `api.get('/gallery')`.
