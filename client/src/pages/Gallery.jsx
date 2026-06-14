import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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
      <header className="relative isolate mb-10 overflow-hidden rounded-[2rem] border border-black/10 bg-white px-6 py-10 text-black shadow-[0_24px_70px_rgba(17,17,17,0.08)] sm:px-10 lg:px-14 lg:py-14">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#8a5a2b]/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-black/5 blur-3xl" aria-hidden="true" />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-[#8a5a2b]">
              Style Inspiration Gallery
            </p>
            <h1 className="text-5xl font-black leading-none tracking-[-0.05em] text-black sm:text-6xl lg:text-7xl">
              Braids worth bookmarking.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-black/72 sm:text-lg">
              Browse real style inspiration before booking. Final results are shaped by your chosen service, hair type, length, and consultation.
            </p>
          </div>

          <div className="grid gap-3 rounded-3xl border border-black/10 bg-black/[0.03] p-4 backdrop-blur-md">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black/50">Gallery</p>
              <strong className="mt-1 block text-3xl text-black">All styles</strong>
            </div>
            <p className="text-sm leading-6 text-black/65">
              No filters. Just a clean wall of braid inspiration.
            </p>
            <Link className="btn btn-primary mt-1 w-full" to="/booking">
              Book Appointment
            </Link>
          </div>
        </div>
      </header>

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
