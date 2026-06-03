import { Link } from 'react-router-dom'
import { getFeaturedServices } from '../../data/services.js'
import { getServicePreviewImage } from '../../utils/servicePreview.js'

function formatPrice(service) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: service.currency,
    maximumFractionDigits: 0,
  }).format(service.startingPrice)
}

export function FeaturedServices() {
  const featuredServices = getFeaturedServices()

  return (
    <section className="featured-services-section" aria-labelledby="featured-services-title">
      <div className="featured-services-intro" data-reveal>
        <p className="eyebrow">Featured Services + Pricing</p>
        <h2 id="featured-services-title">Clear starting prices. No guesswork.</h2>
        <p>Review popular services, understand your starting point, and choose the right appointment with confidence.</p>
      </div>
      {featuredServices.length === 0 ? <p className="gallery-query-state" role="status">Featured services are coming soon.</p> : null}
      {featuredServices.length > 0 ? (
        <div className="featured-services-grid">
          {featuredServices.map((service, index) => (
            <article className="featured-service-card" data-reveal key={service.id} style={{ '--index': index + 1 }}>
              <img alt={`${service.name} preview`} loading="lazy" src={getServicePreviewImage(service)} />
              <div>
                <p>Starting at {formatPrice(service)} · {service.durationLabel}</p>
                <h3>{service.name}</h3>
                <Link aria-label={`Browse ${service.name} gallery`} className="text-link" to={`/gallery?service=${service.id}`}>View Gallery</Link>
              </div>
            </article>
          ))}
        </div>
      ) : null}
      <Link className="btn btn-secondary" data-reveal to="/services">Explore All Services</Link>
    </section>
  )
}
