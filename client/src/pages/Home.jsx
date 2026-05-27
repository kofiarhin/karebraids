import { useEffect, useState } from 'react'
import { CalendarCheck, MapPin, Scissors, ShieldCheck } from '@phosphor-icons/react'
import { Button } from '../components/Button.jsx'
import { galleryItems, services, testimonials } from '../constants/content.js'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js'

const heroSlides = galleryItems.slice(0, 5)
const heroRotationMs = 4500
const trustImages = galleryItems.slice(0, 4)
const processImage = galleryItems.find((item) => item.id === 'process-detail') ?? galleryItems[6]
const testimonialImages = [galleryItems[5], galleryItems[7], galleryItems[8]].filter(Boolean)
const ctaImage = galleryItems[8]

export function Home() {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)

  useRevealOnScroll()

  useEffect(() => {
    if (heroSlides.length < 2) return undefined

    const motionQuery =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-reduced-motion: reduce)')
        : null
    let rotationId

    const clearRotation = () => {
      if (!rotationId) return
      window.clearInterval(rotationId)
      rotationId = undefined
    }

    const startRotation = () => {
      clearRotation()
      rotationId = window.setInterval(() => {
        setActiveHeroSlide((currentSlide) => (currentSlide + 1) % heroSlides.length)
      }, heroRotationMs)
    }

    const syncRotation = () => {
      if (motionQuery?.matches) {
        clearRotation()
        return
      }

      startRotation()
    }

    syncRotation()

    motionQuery?.addEventListener?.('change', syncRotation)

    return () => {
      clearRotation()
      motionQuery?.removeEventListener?.('change', syncRotation)
    }
  }, [])

  return (
    <>
      <section className="hero-section home-hero dark-home-hero">
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
        <div className="hero-media editorial-media" aria-label="Featured braid styles" data-parallax data-reveal>
          <div className="hero-carousel" role="region" aria-label="Featured braid styles carousel">
            {heroSlides.map((slide, index) => (
              <img
                alt={slide.title}
                aria-hidden={activeHeroSlide === index ? undefined : 'true'}
                className={`hero-slide${activeHeroSlide === index ? ' is-active' : ''}`}
                key={slide.id}
                src={slide.image}
              />
            ))}
            <div className="hero-carousel-dots" aria-label="Hero image slides" role="group">
              {heroSlides.map((slide, index) => (
                <button
                  aria-current={activeHeroSlide === index ? 'true' : undefined}
                  aria-label={`Show ${slide.title}`}
                  className={`hero-carousel-dot${activeHeroSlide === index ? ' is-active' : ''}`}
                  key={slide.id}
                  onClick={() => setActiveHeroSlide(index)}
                  type="button"
                />
              ))}
            </div>
          </div>
          <div className="hero-note">
            <Scissors aria-hidden="true" size={22} weight="duotone" />
            <span>Salon and mobile appointments</span>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="KareBraids trust highlights">
        <div className="trust-badges">
          <span data-reveal style={{ '--index': 0 }}>
            <ShieldCheck aria-hidden="true" size={22} weight="duotone" /> Protective styling
          </span>
          <span data-reveal style={{ '--index': 1 }}>
            <CalendarCheck aria-hidden="true" size={22} weight="duotone" /> Monday to Saturday
          </span>
          <span data-reveal style={{ '--index': 2 }}>
            <MapPin aria-hidden="true" size={22} weight="duotone" /> Salon or mobile
          </span>
        </div>
        <div
          aria-label="Featured trust style thumbnails"
          className="trust-image-cluster"
          data-reveal
          style={{ '--index': 3 }}
        >
          {trustImages.map((item) => (
            <img alt="" aria-hidden="true" key={item.id} loading="lazy" src={item.image} />
          ))}
        </div>
      </section>

      <section className="section-block services-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">Featured services</p>
          <h2>Styles designed around comfort, neatness, and longevity.</h2>
        </div>
        <div className="service-rack">
          {services.slice(0, 6).map((service, index) => {
            const serviceImage = galleryItems[index % galleryItems.length]

            return (
              <article
                aria-label={`${service.title}, ${service.fromPrice}`}
                className="service-tile"
                data-reveal
                key={service.title}
                style={{ '--index': index }}
              >
                <img
                  alt={`${service.title} style inspiration`}
                  loading="lazy"
                  src={serviceImage.image}
                />
                <span className="service-price-badge">{service.fromPrice}</span>
                <div className="service-tile-copy">
                  <span>{service.duration}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="why-section">
        <div className="why-copy" data-reveal>
          <p className="eyebrow">Why choose KareBraids</p>
          <h2>Warm service, disciplined technique, and a finish made for real life.</h2>
        </div>
        <div className="why-story">
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
          <figure className="why-visual-panel" data-reveal style={{ '--index': 3 }}>
            <img
              alt="Process detail for careful braid work"
              loading="lazy"
              src={processImage.image}
            />
            <figcaption>{processImage.description}</figcaption>
          </figure>
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
        <div className="testimonial-quotes">
          {testimonials.map((testimonial, index) => (
            <blockquote data-reveal key={testimonial.name} style={{ '--index': index }}>
              <p>{testimonial.text}</p>
              <cite>{testimonial.name}</cite>
            </blockquote>
          ))}
        </div>
        <aside aria-label="Testimonial style visuals" className="testimonial-visual-panel" data-reveal>
          {testimonialImages.map((item, index) => (
            <img
              alt={`${item.title} client style`}
              key={item.id}
              loading="lazy"
              src={item.image}
              style={{ '--index': index }}
            />
          ))}
        </aside>
      </section>

      <section aria-label="Book a KareBraids appointment" className="cta-section" data-reveal>
        <img alt="" aria-hidden="true" className="cta-image" loading="lazy" src={ctaImage.image} />
        <div className="cta-copy">
          <p className="eyebrow">Ready when you are</p>
          <h2>Choose your service, date, and preferred location in a few steps.</h2>
          <Button to="/booking">Start Booking</Button>
        </div>
      </section>
    </>
  )
}
