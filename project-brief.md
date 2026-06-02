# KareBraids — Product Requirements Document (MVP)

---

## 1. Product Overview

**KareBraids** is a premium UK-based African hair braiding platform offering **salon + mobile hair braiding services** through a modern, booking-first digital experience.

### Target Audience

African women in the UK (primarily Birmingham and the West Midlands), ages **18–45**.

### Brand Positioning

KareBraids should feel:

- Premium
- Afro-luxury
- Warm
- Feminine
- Elegant
- Trustworthy
- Mobile-first
- Conversion-focused

---

## 2. Core Goal

Build a scalable MVP that:

- Drives bookings
- Builds trust
- Showcases braiding craftsmanship
- Supports salon + mobile services
- Creates a premium digital experience
- Scales into ecommerce + CRM later

---

## 3. Business Model

KareBraids will operate as a **Hybrid Hair Braiding Service Business**.

### Salon Services

Clients visit the salon for appointments.

### Mobile Services

Stylist travels to client locations.

### Future Revenue Opportunities

- Haircare products
- Mobile premium fees
- Add-ons
- Hair consultations
- Loyalty offers
- Referral rewards

---

## 4. MVP Scope

The MVP will be a **multi-page website**.

### Pages

1. Home
2. About
3. Gallery
4. Booking

---

## 5. Homepage Sections

The homepage will act as the primary conversion page.

### Sections

- Hero section
- Trust badge / social proof
- Featured braiding services
- Why choose KareBraids
- Gallery preview
- Testimonials
- CTA booking section
- Footer

---

## 6. About Page

Purpose: Build trust and humanize the brand.

### Sections

- Founder story (Karen)
- Mission
- Brand values
- Trust & professionalism

---

## 7. Gallery Page

Purpose: Showcase braiding quality and craftsmanship.

### Layout

- Responsive masonry/grid layout
- Mobile friendly
- Smooth transitions

### Interaction

When user clicks image → Open modal

### Modal UI

Show:

- Enlarged image
- Style title
- Short description
- Close button

### Close Actions

- X button
- Backdrop click
- ESC key

### UX Requirements

- Accessible
- Smooth animation
- Lazy image loading
- Responsive

---

## 8. Booking Page

A **Calendly-style booking flow**.

### Booking Availability

**Monday – Saturday**

### Booking Flow

1. Select service
2. Select date
3. Select time
4. Customer details
5. Booking confirmation

### Customer Fields

- Full Name
- Email
- Phone Number
- Preferred Location
- Notes

### UX Requirements

- Minimal
- Premium
- Fast
- Mobile-first
- Easy conversion flow

---

## 9. Core Services (Initial)

Potential featured braiding services:

- Knotless Braids
- Box Braids
- Cornrows
- Twists
- Stitch Braids
- Kids Braids
- Retouch
- Consultation

---

## 10. Design System

### Brand Direction

Modern Afro-luxury with warm feminine aesthetics.

---

## 11. Color Palette

| Role      | Color             | Hex       |
| --------- | ----------------- | --------- |
| Primary   | Rich Gold         | `#D4A373` |
| Secondary | Warm Terracotta   | `#E07A5F` |
| Accent    | Deep Forest Green | `#2E5339` |
| Neutral   | Soft Cream        | `#F5F1EE` |
| Text      | Dark Charcoal     | `#1F1F1F` |
| Muted     | Gray              | `#6B6B6B` |
| Border    | Soft Border       | `#E6DED8` |

---

## 12. CTA / Button System

### Primary CTA

Used for:

- Book Now
- Schedule Appointment
- Start Booking

**Styles**

- Background: `#D4A373`
- Text: White
- Rounded corners
- Soft shadow

**Hover**

- Darker gold

**Active**

- Slight pressed darker state

---

### Secondary CTA

Used for:

- View Gallery
- Learn More
- Contact Us

**Styles**

- Transparent
- Border: `#2E5339`
- Text: `#2E5339`

**Hover**

- Filled green
- White text

---

### Disabled State

- Soft beige / low-opacity neutral

---

## 13. Typography

### Headings

Primary:

- Poppins

Alternative:

- Montserrat

### Body

Primary:

- Open Sans

Alternative:

- Lato

### Design Rules

- Clear hierarchy
- Strong whitespace
- Premium spacing
- Readability first

---

## 14. Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express

### Database

- MongoDB

### State Management

Server State:

- TanStack Query

Global Client State (only if needed):

- Redux Toolkit

---

## 15. Engineering Standards

- Reusable components
- Clean architecture
- API logic outside UI components
- Mobile-first
- SEO-friendly
- Performance-first
- Accessibility-first
- Scalable folder structure
- Maintainability over hacks
- Production-level code

---

## 16. Future Features (Post-MVP)

### Ecommerce

- Haircare products
- Checkout flow
- Product catalog

### CRM/Admin Dashboard

Karen can manage:

- Booking management
- Client profiles
- Feature requests
- Change requests
- Backlog tracking
- Resolve requests
- Status updates

### Additional Features

- Payments
- Reviews
- Loyalty system
- Referral rewards
- Analytics
- Customer accounts
- Booking history

---

## 17. Edge Cases

### Booking

- Double bookings
- No available slots
- Cancellations
- Rescheduling
- Time conflicts

### Mobile Service

- Travel radius logic
- Distance-based surcharge
- Unavailable remote areas

### Gallery

- Empty gallery state
- Image load failure
- Modal close handling
- Keyboard accessibility

---

## 18. Product Summary

**KareBraids** is a premium Afro-luxury UK hair braiding platform combining **salon excellence + mobile convenience** through a clean, scalable, booking-first digital experience.

### Priorities

- Premium UX
- Trust
- Warmth
- Simplicity
- Conversion
- Scalability
- Strong mobile experience
- Feminine Afro-luxury branding
