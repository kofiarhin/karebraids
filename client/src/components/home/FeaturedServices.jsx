import { Link } from 'react-router-dom'
import { useGalleryServices } from '../../hooks/queries/useGalleryItems.js'
import { getServicePreviewImage } from '../../utils/servicePreview.js'

function formatPrice(service) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: service.currency,
    maximumFractionDigits: 0,
  }).format(service.startingPrice)
}

function formatDuration(duration) {
  return `${duration.minHours}-${duration.maxHours} hrs`
}

export function FeaturedServices() {
  const { data: services = [], isError, isLoading } = useGalleryServices()
  const featuredServices = services.filter((service) => service.featured).slice(0, 4)

  return (
    <section className="featured-services-section" aria-labelledby="featured-services-title">
      <div className="featured-services-intro" data-reveal>
        <p className="eyebrow">Featured Services + Pricing</p>
        <h2 id="featured-services-title">Clear starting prices. No guesswork.</h2>
        <p>Review popular services, understand your starting point, and choose the right appointment with confidence.</p>
      </div>
      {isLoading ? <p className="gallery-query-state" role="status">Loading services...</p> : null}
      {isError ? <p className="gallery-query-state" role="alert">Services are unavailable right now.</p> : null}
      {!isLoading && !isError && featuredServices.length === 0 ? <p className="gallery-query-state" role="status">Featured services are coming soon.</p> : null}
      {!isLoading && !isError && featuredServices.length > 0 ? (
        <div className="featured-services-grid">
          {featuredServices.map((service, index) => (
            <article className="featured-service-card" data-reveal key={service.id} style={{ '--index': index + 1 }}>
              <img alt={`${service.title} preview`} loading="lazy" src={getServicePreviewImage(service)} />
              <div>
                <p>Starting at {formatPrice(service)} · {formatDuration(service.duration)}</p>
                <h3>{service.title}</h3>
                <Link aria-label={`Browse ${service.title} gallery`} className="text-link" to={`/gallery?service=${service.id}`}>View Gallery</Link>
              </div>
            </article>
          ))}
        </div>
      ) : null}
      <Link className="btn btn-secondary" data-reveal to="/services">Explore All Services</Link>
    </section>
  )
}
