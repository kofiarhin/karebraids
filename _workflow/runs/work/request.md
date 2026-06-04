# Active Request

Repo: kofiarhin/karebraids

Fix two production routing issues in the Vite React client.

Context:
- App uses React Router with BrowserRouter in `client/src/redux/providers.jsx`.
- Routes are defined in `client/src/App.jsx`, including `/gallery`.
- Hero CTA is in `client/src/components/home/Hero.jsx`.
- Current “View Styles” CTA uses a plain `<a href="/gallery">`, which causes a full document navigation.
- On Vercel, directly loading or refreshing `/gallery` returns `404: NOT_FOUND`.

Tasks:
1. Update the “View Styles” CTA so it navigates client-side to `/gallery`.
   - Prefer the existing shared Button component if it supports `to`.
   - Otherwise use React Router’s `Link`.
   - Preserve current styling: `btn btn-secondary`.
   - Keep the visible label as “View Styles”.

2. Fix Vercel SPA refresh/deep-link fallback.
   - Add the correct Vercel rewrite config so all non-asset routes serve the React app entry.
   - For this repo structure, place the config where Vercel will read it for the deployed app.
   - Expected rule:
     `{ "source": "/(.*)", "destination": "/" }`

3. Validate:
   - `npm run build --prefix client` passes.
   - Clicking “View Styles” from home navigates to `/gallery`.
   - Refreshing `https://karebraids.vercel.app/gallery` does not show Vercel `404: NOT_FOUND`.
   - Existing routes like `/services`, `/booking`, `/contact`, and unknown app routes still behave correctly.
