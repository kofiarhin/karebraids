# Active Request: KareBraids Dark Luxury Homepage Redesign

Redesign the KareBraids homepage based on the approved dark luxury mockup.

Tech stack:
- React + Vite
- Tailwind CSS
- Framer Motion if already installed; otherwise keep animations CSS-only
- Keep components modular
- Keep API/data logic outside UI components
- Mobile-first and fully responsive

Brand direction:
- Premium African braiding studio in London
- Dark luxury
- Warm editorial
- Feminine
- Cinematic
- Clean conversion-focused
- Salon and mobile braiding services

Locked colour system:
- Background / Espresso Noir: `#171311`
- Surface / Smoked Cocoa: `#221C19`
- Primary Accent / Burnished Bronze: `#B78652`
- Primary Text / Warm Ivory: `#F5EEE8`
- Secondary Text / Muted Sand: `#B7A89C`
- Olive Accent: `#6C6A4F`
- Clay Accent: `#A05C3F`
- Border: `rgba(245, 238, 232, 0.10)`

Homepage sections:
1. Header / Navigation
2. Hero Section
3. Trust Strip
4. Signature Styles Section
5. Why Choose KareBraids
6. Gallery Preview
7. Testimonials
8. Final Booking CTA
9. Footer

Confirmed decision:
- Use the five mockup services exactly on the redesigned homepage and treat the old six-service homepage row as superseded for the homepage only:
  - Knotless Braids - From £120
  - Boho Braids - From £150
  - Stitch Braids - From £130
  - Twists / Locs - From £140
  - Cornrows - From £100

Implementation requirements:
- Create reusable components: `Header`, `Hero`, `TrustStrip`, `SectionHeading`, `ServiceCard`, `WhyChoose`, `GalleryPreview`, `TestimonialSection`, `BookingCTA`, `Footer`.
- Use local arrays for services, trust items, values, and footer links.
- Store image data in constants.
- Use semantic HTML.
- Add accessible alt text.
- Use focus states for links/buttons.
- Keep files clean and production-ready.

Out of scope:
- Backend/API/database changes.
- Booking form logic changes.
- Admin dashboard changes.
- New dependencies unless already installed and necessary.
- Light or white homepage sections.
