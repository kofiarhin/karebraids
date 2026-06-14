import { useRef, useState } from 'react'
import { GalleryModal } from '../components/GalleryModal.jsx'
import { ImageReveal } from '../components/animations/ImageReveal.jsx'
import { ParallaxLayer } from '../components/animations/ParallaxLayer.jsx'
import { StaggerReveal } from '../components/animations/StaggerReveal.jsx'
import { SERVICE_PREVIEW_FALLBACK_IMAGE } from '../utils/servicePreview.js'
import { useGalleryItems } from '../hooks/queries/useGalleryItems.js'
import { getGalleryImageAlt, getGalleryImageSrc } from '../data/imageLibrary.js'


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
  const galleryItemsQuery = useGalleryItems()
  const galleryItems = (galleryItemsQuery.data || []).map((item) => ({
    ...item,
    alt: getGalleryImageAlt(item),
  }))
  const modal = useGalleryModal(galleryItems)

  return (
    <section className="gallery-page dark-gallery-page">
      <div className="gallery-title-wrap">
        <p className="eyebrow">Style Inspiration Gallery</p>
        <h1>GALLERY</h1>
        <p className="gallery-filter-note">Representative styling images used for inspiration. Final results depend on your chosen service, hair type, length, and consultation.</p>
      </div>

      {galleryItems.length === 0 ? (
        <p className="gallery-query-state gallery-empty-state" role="status">
          New styling inspiration is being prepared. Please check back soon.
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
