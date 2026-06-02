import { Star } from '@phosphor-icons/react'
import { Button } from '../Button.jsx'
import { homepageImages } from '../../constants/homepage.js'

export function Hero() {
  return (
    <section className="luxury-hero" aria-labelledby="homepage-hero-title">
      <div className="luxury-hero-copy" data-reveal>
        <p className="eyebrow">Luxury African Hair Braiding</p>
        <h1 id="homepage-hero-title">
          Luxury braiding, crafted with <span>care.</span>
        </h1>
        <p className="hero-lede">
          Premium salon and mobile braiding services across Birmingham and the West Midlands. Beautiful styles. Healthy hair.
          Exceptional care.
        </p>
        <div className="hero-actions">
          <Button to="/booking">Book Appointment</Button>
          <a className="btn btn-secondary" href="/gallery">
            <span>View Styles</span>
          </a>
        </div>
        <div className="social-proof" aria-label="Client rating">
          <div className="client-avatar-stack">
            {homepageImages.avatars.map((avatar, index) => (
              <img
                alt=""
                aria-hidden="true"
                key={avatar.src}
                loading="lazy"
                src={avatar.src}
                style={{ '--index': index }}
              />
            ))}
          </div>
          <strong>5.0</strong>
          <span className="star-row" aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star aria-hidden="true" key={index} size={15} weight="fill" />
            ))}
          </span>
          <span>500+ Happy Clients</span>
        </div>
      </div>
      <div className="luxury-hero-media" data-reveal style={{ '--index': 1 }}>
        <img alt={homepageImages.hero.alt} src={homepageImages.hero.src} />
      </div>
    </section>
  )
}
