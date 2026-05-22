import { CalendarCheck, MapPin, Scissors, ShieldCheck } from '@phosphor-icons/react'
import { Button } from '../components/Button.jsx'
import { galleryItems, services, testimonials } from '../constants/content.js'

export function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Premium African hair braiding in London</p>
          <h1>KareBraids</h1>
          <p className="hero-lede">
            Salon-level braid craftsmanship with mobile convenience for women who want protective
            styles that feel as good as they look.
          </p>
          <div className="hero-actions">
            <Button to="/booking">Book Now</Button>
            <Button to="/gallery" variant="secondary">
              View Gallery
            </Button>
          </div>
        </div>
        <div className="hero-media" aria-label="Featured braid style">
          <img alt="Woman with copper knotless braids" src={galleryItems[0].image} />
          <div className="hero-note">
            <Scissors aria-hidden="true" size={22} weight="duotone" />
            <span>Salon and mobile appointments</span>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="KareBraids trust highlights">
        <span>
          <ShieldCheck aria-hidden="true" size={22} weight="duotone" /> Protective styling
        </span>
        <span>
          <CalendarCheck aria-hidden="true" size={22} weight="duotone" /> Monday to Saturday
        </span>
        <span>
          <MapPin aria-hidden="true" size={22} weight="duotone" /> Salon or mobile
        </span>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Featured services</p>
          <h2>Styles designed around comfort, neatness, and longevity.</h2>
        </div>
        <div className="service-rack">
          {services.slice(0, 6).map((service) => (
            <article className="service-tile" key={service.title}>
              <span>{service.duration}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="why-section">
        <div>
          <p className="eyebrow">Why choose KareBraids</p>
          <h2>Warm service, disciplined technique, and a finish made for real life.</h2>
        </div>
        <div className="why-list">
          <article>
            <h3>Clean consultation</h3>
            <p>We confirm length, size, tension, location, and hair-prep expectations before the appointment.</p>
          </article>
          <article>
            <h3>Craft first</h3>
            <p>Parting, braid consistency, and edge comfort are treated as part of the luxury experience.</p>
          </article>
          <article>
            <h3>Mobile convenience</h3>
            <p>Book salon time or request a preferred location for mobile appointments.</p>
          </article>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Gallery preview</p>
          <h2>Real texture, clean detail, and protective shape.</h2>
        </div>
        <div className="preview-grid">
          {galleryItems.slice(0, 3).map((item) => (
            <img alt={item.title} key={item.id} loading="lazy" src={item.image} />
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.name}>
            <p>{testimonial.text}</p>
            <cite>{testimonial.name}</cite>
          </blockquote>
        ))}
      </section>

      <section className="cta-section">
        <p className="eyebrow">Ready when you are</p>
        <h2>Choose your service, date, and preferred location in a few steps.</h2>
        <Button to="/booking">Start Booking</Button>
      </section>
    </>
  )
}
