import { Link } from 'react-router-dom'
import { useGalleryEnabledServices } from '../hooks/queries/useServices.js'
import { getServicePreview } from '../utils/servicePreview.js'
import { formatServicePrice } from '../utils/formatServicePrice.js'


export function Services() {
  const servicesQuery = useGalleryEnabledServices()
  const services = servicesQuery.data || []

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
            <a className="btn btn-secondary" href="#service-category-braids">View Services</a>
            <Link className="btn btn-primary" to="/booking">Book Appointment</Link>
          </div>
        </div>
        <div className="services-header-panel" aria-hidden="true">
          <span>Knotless Braids</span><span>Box Braids</span><span>Stitch Braids</span>
          <span>Cornrows</span><span>Kids Braids</span><span>Custom Styles</span>
        </div>
      </section>

      {servicesQuery.isLoading ? <p className="gallery-query-state" role="status">Loading services…</p> : null}
      {servicesQuery.isError ? <p className="gallery-query-state" role="alert">Services could not be loaded. Please try again.</p> : null}
      {!servicesQuery.isLoading && !servicesQuery.isError && services.length === 0 ? (
        <p className="gallery-query-state" role="status">Services are being prepared. Please check back soon.</p>
      ) : null}

      {services.length > 0 ? (
        <section className="service-category" aria-labelledby="service-category-braids">
          <div className="service-category-heading"><p className="eyebrow">Explore Styles</p><h2 id="service-category-braids">Braiding Services</h2></div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" data-motion-item key={service.id}>
                <div className="service-card-image"><img alt={getServicePreview(service).alt} loading="lazy" src={getServicePreview(service).src} /><span className="representative-image-caption">Representative image</span></div>
                <div className="service-card-copy">
                  <div className="service-card-heading"><h3>{service.name}</h3><p>From {formatServicePrice(service)}</p></div>
                  <p>{service.shortDescription}</p>
                  <div className="service-card-footer"><span>{service.durationLabel}</span><Link className="text-link" to={`/gallery?service=${service.slug || service.id}`}>View Gallery</Link></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="services-booking-cta" aria-labelledby="services-booking-title">
        <div><p className="eyebrow">Your Next Style</p><h2 id="services-booking-title">Ready for a braid appointment designed around you?</h2><p>Reserve your preferred date and tell us which protective style you have in mind.</p></div>
        <Link className="btn btn-primary" to="/booking">Reserve Your Appointment</Link>
      </section>
    </div>
  )
}
