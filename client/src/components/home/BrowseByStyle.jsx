import { Link } from 'react-router-dom'
import { getGalleryServices } from '../../data/services.js'
import { getServicePreviewImage } from '../../utils/servicePreview.js'

function formatPrice(service) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: service.currency,
    maximumFractionDigits: 0,
  }).format(service.startingPrice)
}

export function BrowseByStyle() {
  const services = getGalleryServices()

  return (
    <section className="browse-style-section" aria-labelledby="browse-style-title">
      <div className="browse-style-intro" data-reveal>
        <p className="eyebrow">Browse By Style</p>
        <h2 id="browse-style-title">Start with the look you have in mind.</h2>
        <p>Explore client examples by category, then compare the service details before you book.</p>
      </div>
      {services.length === 0 ? <p className="gallery-query-state" role="status">Service styles are coming soon.</p> : null}
      {services.length > 0 ? (
        <div className="browse-style-grid">
          {services.map((service, index) => (
            <Link aria-label={`${service.name}, starting at ${formatPrice(service)}`} className="browse-style-card" data-reveal key={service.id} style={{ '--index': index }} to={`/gallery?service=${service.id}`}>
              <img alt={`${service.name} preview`} loading="lazy" src={getServicePreviewImage(service)} />
              <span><strong>{service.name}</strong><small>From {formatPrice(service)}</small></span>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  )
}
