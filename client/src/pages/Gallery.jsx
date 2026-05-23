import { useRef, useState } from 'react'
import { GalleryModal } from '../components/GalleryModal.jsx'
import { galleryItems } from '../constants/content.js'

export function Gallery() {
  const [selectedItem, setSelectedItem] = useState(null)
  const activeTriggerRef = useRef(null)

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
    <section className="gallery-page">
      <div className="page-hero-copy narrow">
        <p className="eyebrow">Craftsmanship preview</p>
        <h1>Braid Gallery</h1>
        <p>
          Explore shape, texture, and finish. Each style can be tailored by length, parting, colour,
          and appointment location.
        </p>
      </div>
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
      <GalleryModal item={selectedItem} onClose={closeModal} />
    </section>
  )
}
