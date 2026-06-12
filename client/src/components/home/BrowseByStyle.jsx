import { Link } from 'react-router-dom'
import { useGalleryServices } from '../../hooks/queries/useGalleryItems.js'
import { getServicePreview } from '../../utils/servicePreview.js'
import { formatServicePrice } from '../../utils/formatServicePrice.js'


export function BrowseByStyle() {
  const servicesQuery = useGalleryServices()
  const services = servicesQuery.data || []
  return (
    <section className="browse-style-section" aria-labelledby="browse-style-title">
      <div className="browse-style-intro" data-reveal><p className="eyebrow">Browse By Style</p><h2 id="browse-style-title">Start with the look you have in mind.</h2><p>Explore representative styling inspiration, then compare service details before you book.</p></div>
      {servicesQuery.isLoading ? <p className="gallery-query-state" role="status">Loading service styles…</p> : null}
      {servicesQuery.isError ? <p className="gallery-query-state" role="alert">Service styles could not be loaded.</p> : null}
      {!servicesQuery.isLoading && !servicesQuery.isError && services.length === 0 ? <p className="gallery-query-state" role="status">Service styles are coming soon.</p> : null}
      {services.length > 0 ? <div className="browse-style-grid">{services.map((service, index) => <Link aria-label={`${service.name}, starting at ${formatServicePrice(service)}`} className="browse-style-card" data-reveal key={service.id} style={{ '--index': index }} to={`/gallery?service=${service.slug || service.id}`}><img alt={getServicePreview(service).alt} loading="lazy" src={getServicePreview(service).src} /><span><strong>{service.name}</strong><small>Representative image</small><small>From {formatServicePrice(service)}</small></span></Link>)}</div> : null}
    </section>
  )
}
