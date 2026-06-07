import { Navigate, useParams } from 'react-router-dom'
import { Button } from '../components/Button.jsx'
import { ReviewList } from '../components/reviews/ReviewList.jsx'
import { useService } from '../hooks/queries/useServices.js'
import { getServicePreviewImage } from '../utils/servicePreview.js'

const sharedCareTips = [
  'Wrap your braids with a satin scarf before bed.',
  'Keep your scalp lightly moisturised without heavy product build-up.',
  'Book a refresh or removal when the style begins to loosen.',
]

function formatPrice(service) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: service.currency || 'GBP',
    maximumFractionDigits: 0,
  }).format(service.startingPrice ?? service.priceFrom ?? 0)
}

export function ServiceDetail() {
  const { slug } = useParams()
  const serviceQuery = useService(slug)
  const service = serviceQuery.data

  if (serviceQuery.isLoading) return <p className="gallery-query-state" role="status">Loading service…</p>
  if (serviceQuery.error?.response?.status === 404) return <Navigate replace to="/services" />
  if (serviceQuery.isError) return <p className="gallery-query-state" role="alert">This service could not be loaded.</p>
  if (!service) return null

  const gallery = service.galleryImages || service.images || []
  const serviceSlug = service.slug || service.id

  return (
    <article className="service-detail-page">
      <section className="service-detail-hero">
        <img alt={service.primaryImage?.alt || `${service.name} protective style`} src={getServicePreviewImage(service)} />
        <div><p className="eyebrow">KareBraids Style Guide</p><h1>{service.name}</h1><p>{service.description}</p><Button to={`/booking?service=${serviceSlug}`}>Book This Style</Button></div>
      </section>
      <section className="service-facts" aria-label={`${service.name} appointment details`}>
        <div><span>Starting Price</span><strong>{formatPrice(service)}</strong></div>
        <div><span>Duration</span><strong>{service.durationLabel}</strong></div>
        <div><span>Hair Included</span><strong>Available on request</strong></div>
      </section>
      <section className="service-detail-section"><p className="eyebrow">Finished With Care</p><h2>Style gallery</h2><div className="service-detail-gallery">{gallery.map((item) => <img alt={item.alt || `${service.name} example`} loading="lazy" src={item.image || item.src} key={item.id} />)}</div></section>
      <section className="service-detail-columns"><div><p className="eyebrow">Best Fit</p><h2>Suitable For</h2><p>Clients looking for protective styling with a polished, comfortable finish.</p></div><div><p className="eyebrow">Aftercare</p><h2>Care Tips</h2><ul>{sharedCareTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div></section>
      <section className="service-detail-section" aria-labelledby="style-reviews-title"><p className="eyebrow">Client Confidence</p><h2 id="style-reviews-title">Client Reviews</h2>{service.reviews?.length ? <ReviewList reviews={service.reviews} /> : <p className="gallery-query-state">Reviews for this service are coming soon.</p>}</section>
      <section className="service-detail-cta"><div><p className="eyebrow">Ready To Reserve?</p><h2>Book {service.name}</h2></div><Button to={`/booking?service=${serviceSlug}`}>Book This Style</Button></section>
    </article>
  )
}
