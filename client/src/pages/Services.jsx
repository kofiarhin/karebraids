import { Link } from 'react-router-dom'
import { getGalleryServices } from '../data/services.js'
import { getServicePreviewImage } from '../utils/servicePreview.js'

function formatPrice(service) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: service.currency,
    maximumFractionDigits: 0,
  }).format(service.startingPrice)
}

export function Services() {
  const services = getGalleryServices()
  const heroService = services[0]

  return (
    <div className="services-page dark-services-page">
      <section className="services-hero" aria-labelledby="services-title">
        <div className="services-hero-copy">
          <p className="eyebrow">KareBraids Services</p>
          <h1 id="services-title">Signature braid services, shaped around you.</h1>
          <p>
            Explore protective styles finished with precision, comfort, and a polished touch for
            every season of your hair journey.
          </p>
          <Link className="btn btn-primary" to="/booking">
            Book Appointment
          </Link>
        </div>
        {heroService ? (
          <div className="services-hero-image">
            <img alt="Close view of carefully crafted long braids" src={getServicePreviewImage(heroService)} />
          </div>
        ) : null}
      </section>

      <section className="services-intro" aria-labelledby="services-intro-title">
        <p className="eyebrow">Salon & Mobile</p>
        <h2 id="services-intro-title">Premium care, wherever your appointment feels best.</h2>
        <p>
          Choose a calm salon appointment or a mobile service across Birmingham and the West Midlands. Every style begins
          with a thoughtful consultation and a protective-care-first approach.
        </p>
      </section>

      {services.length > 0 ? (
        <section className="service-category" aria-labelledby="service-category-braids">
          <div className="service-category-heading">
            <p className="eyebrow">Explore Styles</p>
            <h2 id="service-category-braids">Braiding Services</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.id}>
                <div className="service-card-image">
                  <img alt={`${service.name} protective braiding style`} loading="lazy" src={getServicePreviewImage(service)} />
                </div>
                <div className="service-card-copy">
                  <div className="service-card-heading">
                    <h3>{service.name}</h3>
                    <p>From {formatPrice(service)}</p>
                  </div>
                  <p>{service.shortDescription}</p>
                  <div className="service-card-footer">
                    <span>{service.durationLabel}</span>
                    <Link className="text-link" to={`/gallery?service=${service.id}`}>
                      View Gallery
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="services-booking-cta" aria-labelledby="services-booking-title">
        <div>
          <p className="eyebrow">Your Next Style</p>
          <h2 id="services-booking-title">Ready for a braid appointment designed around you?</h2>
          <p>Reserve your preferred date and tell us which protective style you have in mind.</p>
        </div>
        <Link className="btn btn-primary" to="/booking">
          Reserve Your Appointment
        </Link>
      </section>
    </div>
  )
}
