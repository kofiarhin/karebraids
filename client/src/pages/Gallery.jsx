import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GalleryModal } from '../components/GalleryModal.jsx'
import { SERVICE_IMAGE_FALLBACK } from '../data/services.js'
import { useGalleryItems, useGalleryServices } from '../hooks/queries/useGalleryItems.js'

function formatPrice(service) {
  if (!service) return ''
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: service.currency,
    maximumFractionDigits: 0,
  }).format(service.startingPrice)
}

function SafeGalleryImage({ item }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <span className="gallery-image-placeholder" role="img" aria-label={`${item.title} image unavailable`}>
        Image coming soon
      </span>
    )
  }

  return (
    <img
      alt={item.alt}
      loading="lazy"
      onError={(event) => {
        if (event.currentTarget.src !== SERVICE_IMAGE_FALLBACK) {
          event.currentTarget.src = SERVICE_IMAGE_FALLBACK
          return
        }
        setHasError(true)
      }}
      src={item.src}
    />
  )
}

export function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTriggerRef = useRef(null)
  const galleryServicesQuery = useGalleryServices()
  const galleryServices = galleryServicesQuery.data || []
  const requestedService = searchParams.get('service')
  const [selectedServiceId, setSelectedServiceId] = useState('all')
  const selectedService = selectedServiceId === 'all' ? null : galleryServices.find((service) => service.id === selectedServiceId) || null
  const galleryItemsQuery = useGalleryItems(selectedServiceId === 'all' ? {} : { service: selectedServiceId })
  const galleryItems = galleryItemsQuery.data || []

  useEffect(() => {
    const nextServiceId = galleryServices.some((service) => service.id === requestedService) ? requestedService : 'all'
    setSelectedServiceId(nextServiceId)
  }, [galleryServices, requestedService])

  const updateSelectedService = (serviceId) => {
    setSelectedServiceId(serviceId)
    setSelectedItem(null)
    if (serviceId === 'all') {
      setSearchParams({})
      return
    }
    setSearchParams({ service: serviceId })
  }

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
        {selectedService ? <p className="gallery-filter-note">Showing {selectedService.name}</p> : null}
      </div>

      <div className="gallery-filter-panel">
        <label htmlFor="gallery-service-filter">Filter gallery by service</label>
        <select
          id="gallery-service-filter"
          onChange={(event) => updateSelectedService(event.target.value)}
          value={selectedServiceId}
        >
          <option value="all">All Services</option>
          {galleryServices.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      {selectedService ? (
        <section className="gallery-service-intro" aria-labelledby="gallery-service-title">
          <div>
            <p className="eyebrow">Selected Service</p>
            <h2 id="gallery-service-title">{selectedService.name}</h2>
            <p>{selectedService.shortDescription}</p>
          </div>
          <dl>
            <div><dt>Starting price</dt><dd>{formatPrice(selectedService)}</dd></div>
            <div><dt>Duration</dt><dd>{selectedService.durationLabel}</dd></div>
          </dl>
          <Link className="btn btn-primary" to={`/booking?service=${selectedService.id}`}>Book This Style</Link>
        </section>
      ) : null}

      {galleryItems.length === 0 ? (
        <p className="gallery-query-state gallery-empty-state" role="status">
          {selectedService ? 'No gallery images available for this service yet.' : 'New client looks are being prepared. Please check back soon.'}
        </p>
      ) : null}
      {galleryItems.length > 0 ? (
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
              <SafeGalleryImage item={item} />
              <span>
                <strong>{item.title}</strong>
                <small>{item.description}</small>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <GalleryModal item={selectedItem} onClose={closeModal} />
    </section>
  )
}
