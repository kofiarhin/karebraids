import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GalleryModal } from '../components/GalleryModal.jsx'
import { styleProfileBySlug } from '../constants/styles.js'
import { useGalleryItems } from '../hooks/queries/useGalleryItems.js'

export function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchParams] = useSearchParams()
  const activeTriggerRef = useRef(null)
  const { data: galleryItems = [], isError, isLoading, refetch } = useGalleryItems()
  const requestedStyle = searchParams.get('style')
  const activeStyle = styleProfileBySlug[requestedStyle] ? requestedStyle : null
  const visibleItems = useMemo(
    () => (activeStyle ? galleryItems.filter((item) => item.style === activeStyle) : galleryItems),
    [activeStyle, galleryItems],
  )

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
        {activeStyle ? <p className="gallery-filter-note">Showing {activeStyle.replaceAll('-', ' ')}</p> : null}
      </div>
      {isLoading ? <p className="gallery-query-state" role="status">Loading gallery images...</p> : null}
      {isError ? (
        <div className="gallery-query-state" role="alert">
          <p>We could not load the gallery right now.</p>
          <button className="btn btn-secondary" onClick={() => refetch()} type="button">Try Again</button>
        </div>
      ) : null}
      {!isLoading && !isError && visibleItems.length === 0 ? (
        <p className="gallery-query-state" role="status">New client looks are being prepared. Please check back soon.</p>
      ) : null}
      {!isLoading && !isError && visibleItems.length > 0 ? (
        <div aria-label="Gallery image wall" className="gallery-grid" role="region">
          {visibleItems.map((item, index) => (
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
      <GalleryModal item={selectedItem} onClose={closeModal} />
    </section>
  )
}
