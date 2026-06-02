import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GalleryModal } from '../components/GalleryModal.jsx'
import { ReviewList } from '../components/reviews/ReviewList.jsx'
import { useGallery } from '../hooks/queries/useGalleryItems.js'

function formatPrice(service) {
  if (!service) return ''
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: service.currency,
    maximumFractionDigits: 0,
  }).format(service.startingPrice)
}

function formatDuration(duration) {
  if (!duration) return ''
  return `${duration.minHours}-${duration.maxHours} hrs`
}

export function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchParams] = useSearchParams()
  const activeTriggerRef = useRef(null)
  const requestedService = searchParams.get('service')
  const service = typeof requestedService === 'string' && requestedService.trim() ? requestedService : null
  const { data, isError, isLoading, refetch } = useGallery({ service })
  const galleryItems = data?.galleryItems ?? []
  const selectedService = data?.selectedService ?? null
  const reviews = data?.reviews ?? []

  const openModal = (item, trigger) => {
    activeTriggerRef.current = trigger
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
    window.requestAnimationFrame(() => {
      activeTriggerRef.current?.focus()
    })
  }

  return (
    <section className="gallery-page dark-gallery-page">
      <div className="gallery-title-wrap">
        <p className="eyebrow">Client Gallery</p>
        <h1>GALLERY</h1>
        {selectedService ? <p className="gallery-filter-note">Showing {selectedService.title}</p> : null}
      </div>

      {selectedService ? (
        <section className="gallery-service-intro" aria-labelledby="gallery-service-title">
          <div>
            <p className="eyebrow">Selected Service</p>
            <h2 id="gallery-service-title">{selectedService.title}</h2>
            <p>{selectedService.description}</p>
          </div>
          <dl>
            <div><dt>Starting price</dt><dd>{formatPrice(selectedService)}</dd></div>
            <div><dt>Duration</dt><dd>{formatDuration(selectedService.duration)}</dd></div>
          </dl>
          <Link className="btn btn-primary" to={`/booking?style=${selectedService.id}`}>Book This Style</Link>
        </section>
      ) : null}

      {isLoading ? <p className="gallery-query-state" role="status">Loading gallery images...</p> : null}
      {isError ? (
        <div className="gallery-query-state" role="alert">
          <p>We could not load the gallery right now.</p>
          <button className="btn btn-secondary" onClick={() => refetch()} type="button">Try Again</button>
        </div>
      ) : null}
      {!isLoading && !isError && galleryItems.length === 0 ? (
        <p className="gallery-query-state" role="status">New client looks are being prepared. Please check back soon.</p>
      ) : null}
      {!isLoading && !isError && galleryItems.length > 0 ? (
        <div aria-label="Gallery image wall" className="gallery-grid" role="region">
          {galleryItems.map((item, index) => (
            <button
              aria-label={item.title}
              className={`gallery-card ${item.aspect}`}
              key={item.id}
              onClick={(event) => openModal(item, event.currentTarget)}
              style={{ '--index': index }}
              type="button"
            >
              <img alt={item.title} loading="lazy" src={item.image} />
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {selectedService && reviews.length > 0 ? (
        <section className="gallery-service-reviews" aria-labelledby="gallery-service-reviews-title">
          <p className="eyebrow">Client Notes</p>
          <h2 id="gallery-service-reviews-title">Client Reviews</h2>
          <ReviewList reviews={reviews} />
        </section>
      ) : null}

      <GalleryModal item={selectedItem} onClose={closeModal} />
    </section>
  )
}
