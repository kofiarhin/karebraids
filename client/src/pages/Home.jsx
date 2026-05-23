import { CalendarCheck, MapPin, Scissors, ShieldCheck } from '@phosphor-icons/react'
import { Button } from '../components/Button.jsx'
import { galleryItems, services, testimonials } from '../constants/content.js'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js'

export function Home() {
  useRevealOnScroll()

  return (
    <>
      <section className="hero-section home-hero">
        <div className="hero-copy" data-reveal>
          <p className="eyebrow">Premium African hair braiding in London</p>
          <h1>KareBraids</h1>
          <p className="hero-lede">
            Protective braid artistry shaped with calm hands, neat parting, and the polish of a
            private salon appointment.
          </p>
          <div className="hero-actions">
            <Button to="/booking">Book Now</Button>
            <Button to="/gallery" variant="secondary">
              View Gallery
            </Button>
          </div>
        </div>
        <div className="hero-media editorial-media" aria-label="Featured braid style" data-parallax data-reveal>
          <img alt="Woman with copper knotless braids" src={galleryItems[0].image} />
          <div className="hero-note">
            <Scissors aria-hidden="true" size={22} weight="duotone" />
            <span>Salon and mobile appointments</span>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="KareBraids trust highlights">
        <span data-reveal style={{ '--index': 0 }}>
          <ShieldCheck aria-hidden="true" size={22} weight="duotone" /> Protective styling
        </span>
        <span data-reveal style={{ '--index': 1 }}>
          <CalendarCheck aria-hidden="true" size={22} weight="duotone" /> Monday to Saturday
        </span>
        <span data-reveal style={{ '--index': 2 }}>
          <MapPin aria-hidden="true" size={22} weight="duotone" /> Salon or mobile
        </span>
      </section>

      <section className="section-block services-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Featured services</p>
          <h2>Styles designed around comfort, neatness, and longevity.</h2>
        </div>
        <div className="service-rack">
          {services.slice(0, 6).map((service, index) => (
            <article className="service-tile" data-reveal key={service.title} style={{ '--index': index }}>
              <span>{service.duration}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="why-copy" data-reveal>
          <p className="eyebrow">Why choose KareBraids</p>
          <h2>Warm service, disciplined technique, and a finish made for real life.</h2>
        </div>
        <div className="why-list">
          <article data-reveal style={{ '--index': 0 }}>
            <h3>Clean consultation</h3>
            <p>We confirm length, size, tension, location, and hair-prep expectations before the appointment.</p>
          </article>
          <article data-reveal style={{ '--index': 1 }}>
            <h3>Craft first</h3>
            <p>Parting, braid consistency, and edge comfort are treated as part of the luxury experience.</p>
          </article>
          <article data-reveal style={{ '--index': 2 }}>
            <h3>Mobile convenience</h3>
            <p>Book salon time or request a preferred location for mobile appointments.</p>
          </article>
        </div>
      </section>

      <section className="section-block gallery-preview-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Gallery preview</p>
          <h2>Real texture, clean detail, and protective shape.</h2>
        </div>
        <div className="preview-grid">
          {galleryItems.slice(0, 3).map((item, index) => (
            <img
              alt={item.title}
              data-reveal
              key={item.id}
              loading="lazy"
              src={item.image}
              style={{ '--index': index }}
            />
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        {testimonials.map((testimonial, index) => (
          <blockquote data-reveal key={testimonial.name} style={{ '--index': index }}>
            <p>{testimonial.text}</p>
            <cite>{testimonial.name}</cite>
          </blockquote>
        ))}
      </section>

      <section className="cta-section" data-reveal>
        <p className="eyebrow">Ready when you are</p>
        <h2>Choose your service, date, and preferred location in a few steps.</h2>
        <Button to="/booking">Start Booking</Button>
      </section>
    </>
  )
}
