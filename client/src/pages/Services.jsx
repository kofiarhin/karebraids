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
  return (
    <div className="services-page dark-services-page">
      <section className="services-page-header" aria-labelledby="services-title">
        <div className="services-page-header-copy">
          <p className="eyebrow">Our Services</p>
          <h1 id="services-title">Braiding services tailored to your style.</h1>
          <p>
            From knotless braids and stitch braids to custom protective styles, every appointment
            is designed around your hair, lifestyle, and look.
          </p>
          <div className="services-header-actions">
            <a className="btn btn-secondary" href="#service-category-braids">
              View Services
            </a>
            <Link className="btn btn-primary" to="/booking">
              Book Appointment
            </Link>
          </div>
        </div>

        <div className="services-header-panel" aria-hidden="true">
          <span>Knotless Braids</span>
          <span>Box Braids</span>
          <span>Stitch Braids</span>
          <span>Cornrows</span>
          <span>Kids Braids</span>
          <span>Custom Styles</span>
        </div>
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
