import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { GalleryModal } from '../components/GalleryModal.jsx'
import { ImageReveal } from '../components/animations/ImageReveal.jsx'
import { ParallaxLayer } from '../components/animations/ParallaxLayer.jsx'
import { StaggerReveal } from '../components/animations/StaggerReveal.jsx'
import { SERVICE_PREVIEW_FALLBACK_IMAGE } from '../utils/servicePreview.js'
import { useGalleryItems, useGalleryServices } from '../hooks/queries/useGalleryItems.js'
import { formatServicePrice } from '../utils/formatServicePrice.js'
<<<<<<< HEAD
import { getGalleryImageAlt } from '../data/imageLibrary.js'
=======
import { getGalleryImageAlt, getGalleryImageSrc } from '../data/imageLibrary.js'
>>>>>>> pr-25


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
        if (event.currentTarget.src !== SERVICE_PREVIEW_FALLBACK_IMAGE) {
          event.currentTarget.src = SERVICE_PREVIEW_FALLBACK_IMAGE
          return
        }
        setHasError(true)
      }}
      src={getGalleryImageSrc(item)}
    />
  )
}

function useGalleryModal(galleryItems) {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const activeTriggerRef = useRef(null)
  const selectedItem = selectedIndex === null ? null : galleryItems[selectedIndex] || null
  const hasNavigation = galleryItems.length > 1

  const openModal = (index, trigger) => {
    activeTriggerRef.current = trigger
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setSelectedIndex(null)
    window.requestAnimationFrame(() => {
      activeTriggerRef.current?.focus()
    })
  }

  const resetModal = () => {
    setSelectedIndex(null)
    activeTriggerRef.current = null
  }

  const showPreviousItem = () => {
    if (!hasNavigation) return
    setSelectedIndex((currentIndex) => (
      currentIndex === null ? null : (currentIndex - 1 + galleryItems.length) % galleryItems.length
    ))
  }

  const showNextItem = () => {
    if (!hasNavigation) return
    setSelectedIndex((currentIndex) => (
      currentIndex === null ? null : (currentIndex + 1) % galleryItems.length
    ))
  }

  return {
    closeModal,
    hasNavigation,
    openModal,
    resetModal,
    selectedIndex,
    selectedItem,
    showNextItem,
    showPreviousItem,
  }
}

export function Gallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const galleryServicesQuery = useGalleryServices()
  const galleryServices = galleryServicesQuery.data || []
  const requestedService = searchParams.get('service')
  const requestedMatch = galleryServices.find((service) => service.id === requestedService || service.slug === requestedService)
  const selectedServiceId = requestedMatch ? requestedMatch.slug || requestedMatch.id : 'all'
  const selectedService = requestedMatch || null
  const galleryItemsQuery = useGalleryItems(selectedServiceId === 'all' ? {} : { service: selectedServiceId })
  const galleryItems = (galleryItemsQuery.data || []).map((item) => ({
    ...item,
    alt: getGalleryImageAlt(item, selectedService),
  }))
  const modal = useGalleryModal(galleryItems)

  const updateSelectedService = (serviceId) => {
    modal.resetModal()
    setSearchParams(serviceId === 'all' ? {} : { service: serviceId })
  }

  return (
    <section className="gallery-page dark-gallery-page">
      <div className="gallery-title-wrap">
        <p className="eyebrow">Style Inspiration Gallery</p>
        <h1>GALLERY</h1>
        <p className="gallery-filter-note">Representative styling images used for inspiration. Final results depend on your chosen service, hair type, length, and consultation.</p>
        {selectedService ? <p className="gallery-filter-note">Viewing inspiration while considering {selectedService.name}</p> : null}
      </div>

      {galleryServicesQuery.isLoading ? <p className="gallery-query-state" role="status">Loading services…</p> : null}
      {galleryServicesQuery.isError ? <p className="gallery-query-state" role="alert">Services could not be loaded. Please try again.</p> : null}

      <div className="gallery-filter-panel">
        <label htmlFor="gallery-service-filter">Filter gallery by service</label>
        <select
          id="gallery-service-filter"
          onChange={(event) => updateSelectedService(event.target.value)}
          value={selectedServiceId}
        >
          <option value="all">All Services</option>
          {galleryServices.map((service) => (
            <option key={service.id} value={service.slug || service.id}>
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
            <div><dt>Starting price</dt><dd>{formatServicePrice(selectedService)}</dd></div>
            <div><dt>Duration</dt><dd>{selectedService.durationLabel}</dd></div>
          </dl>
          <Link className="btn btn-primary" to={`/booking?service=${selectedService.slug || selectedService.id}`}>Book This Style</Link>
        </section>
      ) : null}

      {galleryItems.length === 0 ? (
        <p className="gallery-query-state gallery-empty-state" role="status">
          {selectedService ? 'Representative inspiration images are being prepared.' : 'New styling inspiration is being prepared. Please check back soon.'}
        </p>
      ) : null}
      {galleryItems.length > 0 ? (
        <StaggerReveal
          aria-label="Gallery image wall"
          as="div"
          className="gallery-grid"
          role="region"
          stagger={0.065}
        >
          {galleryItems.map((item, index) => (
            <button
              aria-label={`${item.title}, representative image ${index + 1}`}
              className={`gallery-card ${item.aspect}`}
              key={item.id}
              onClick={(event) => modal.openModal(index, event.currentTarget)}
              style={{ '--index': index }}
              type="button"
            >
              <ImageReveal className="gallery-card-media">
                <ParallaxLayer className="gallery-card-parallax" distance={16}>
                  <SafeGalleryImage item={item} />
                </ParallaxLayer>
              </ImageReveal>
              <span>
                <strong>{item.title}</strong>
                <small>Representative image</small>
              </span>
            </button>
          ))}
        </StaggerReveal>
      ) : null}

      <GalleryModal
        currentIndex={modal.selectedIndex}
        hasNavigation={modal.hasNavigation}
        item={modal.selectedItem}
        onClose={modal.closeModal}
        onNext={modal.showNextItem}
        onPrevious={modal.showPreviousItem}
        totalCount={galleryItems.length}
      />
    </section>
  )
}
