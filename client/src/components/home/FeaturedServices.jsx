import { Link } from 'react-router-dom'
import { useFeaturedServices } from '../../hooks/queries/useServices.js'
import { getServicePreview } from '../../utils/servicePreview.js'
import { formatServicePrice } from '../../utils/formatServicePrice.js'


export function FeaturedServices() {
  const servicesQuery = useFeaturedServices()
  const featuredServices = servicesQuery.data || []
  return (
    <section className="featured-services-section" aria-labelledby="featured-services-title">
      <div className="featured-services-intro" data-reveal><p className="eyebrow">Featured Services + Pricing</p><h2 id="featured-services-title">Clear starting prices. No guesswork.</h2><p>Review popular services, understand your starting point, and choose the right appointment with confidence.</p></div>
      {servicesQuery.isLoading ? <p className="gallery-query-state" role="status">Loading featured services…</p> : null}
      {servicesQuery.isError ? <p className="gallery-query-state" role="alert">Featured services could not be loaded.</p> : null}
      {!servicesQuery.isLoading && !servicesQuery.isError && featuredServices.length === 0 ? <p className="gallery-query-state" role="status">Featured services are coming soon.</p> : null}
      {featuredServices.length > 0 ? <div className="featured-services-grid">{featuredServices.map((service, index) => <article className="featured-service-card" data-reveal key={service.id} style={{ '--index': index + 1 }}><img alt={getServicePreview(service).alt} loading="lazy" src={getServicePreview(service).src} /><span className="representative-image-caption">Representative image</span><div><p>Starting at {formatServicePrice(service)} · {service.durationLabel}</p><h3>{service.name}</h3><Link aria-label={`Browse ${service.name} gallery`} className="text-link" to={`/gallery?service=${service.slug || service.id}`}>View Gallery</Link></div></article>)}</div> : null}
      <Link className="btn btn-secondary" data-reveal to="/services">Explore All Services</Link>
    </section>
  )
}
