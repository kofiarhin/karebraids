import { X } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'

const modalStyle = {
  display: 'grid',
  placeItems: 'center',
  width: 'min(calc(100vw - 2rem), 58rem)',
  maxHeight: 'calc(100dvh - 2rem)',
  padding: 'clamp(0.75rem, 2vw, 1.5rem)',
  overflow: 'auto',
}

const imageStyle = {
  display: 'block',
  width: 'auto',
  maxWidth: '100%',
  height: 'auto',
  maxHeight: '80vh',
  minHeight: 0,
  objectFit: 'contain',
}

const hiddenCopyStyle = {
  position: 'absolute',
  width: 1,
  height: 1,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
}

export function GalleryModal({ item, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!item) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [item, onClose])

  if (!item) {
    return null
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <section
        aria-describedby="gallery-modal-description"
        aria-modal="true"
        aria-labelledby="gallery-modal-title"
        className="gallery-modal dark-gallery-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        style={modalStyle}
      >
        <button
          aria-label="Close gallery image"
          className="modal-close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" size={20} weight="bold" />
        </button>
        <img alt={item.alt || item.title} src={item.src || item.image} style={imageStyle} />
        <div className="modal-copy" style={hiddenCopyStyle}>
          <p className="eyebrow">KareBraids Gallery</p>
          <h2 id="gallery-modal-title">{item.title}</h2>
          <p id="gallery-modal-description">{item.description}</p>
        </div>
      </section>
    </div>
  )
}
