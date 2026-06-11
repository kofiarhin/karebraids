import { X } from '@phosphor-icons/react'
import { useEffect, useRef } from 'react'
import { animationDefaults, gsap, useGSAP } from '../animations/gsapSetup.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

const modalStyle = {
  display: 'block',
  width: 'fit-content',
  maxWidth: 'calc(100vw - 2rem)',
  maxHeight: 'calc(100dvh - 2rem)',
  padding: 0,
  overflow: 'visible',
  border: 0,
  borderRadius: 0,
  background: 'transparent',
  boxShadow: 'none',
}

const imageStyle = {
  display: 'block',
  width: 'auto',
  maxWidth: 'min(92vw, 980px)',
  height: 'auto',
  maxHeight: '84dvh',
  minHeight: 0,
  objectFit: 'contain',
  borderRadius: '0.9rem',
  background: 'var(--brand-800)',
  boxShadow: '0 34px 90px var(--theme-shadow-black-a05)',
}

const closeButtonStyle = {
  top: '-0.85rem',
  right: '-0.85rem',
  zIndex: 2,
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
  const backdropRef = useRef(null)
  const closeButtonRef = useRef(null)
  const modalRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!item || reducedMotion || !backdropRef.current || !modalRef.current) return

      const image = modalRef.current.querySelector('img')
      const timeline = gsap.timeline({
        defaults: { ease: animationDefaults.ease },
      })

      timeline
        .fromTo(backdropRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24 })
        .fromTo(
          modalRef.current,
          { autoAlpha: 0, scale: 0.985, y: 18 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 0.42 },
          0.04,
        )

      if (image) {
        timeline.fromTo(image, { scale: 1.025 }, { scale: 1, duration: 0.5 }, 0.08)
      }
    },
    { dependencies: [item, reducedMotion], scope: backdropRef, revertOnUpdate: true },
  )

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
    <div className="modal-backdrop" onClick={onClose} ref={backdropRef} role="presentation">
      <section
        aria-describedby="gallery-modal-description"
        aria-modal="true"
        aria-labelledby="gallery-modal-title"
        className="gallery-modal dark-gallery-modal"
        data-gallery-modal-motion
        onClick={(event) => event.stopPropagation()}
        ref={modalRef}
        role="dialog"
        style={modalStyle}
      >
        <button
          aria-label="Close gallery image"
          className="modal-close"
          onClick={onClose}
          ref={closeButtonRef}
          style={closeButtonStyle}
          type="button"
        >
          <X aria-hidden="true" size={20} weight="bold" />
        </button>
        <img alt={item.alt || item.title} src={item.src || item.image} style={imageStyle} />
        <div className="modal-copy" style={hiddenCopyStyle}>
          <p className="eyebrow">Style Inspiration Gallery</p>
          <h2 id="gallery-modal-title">{item.title}</h2>
          <p id="gallery-modal-description">{item.description}</p>
        </div>
      </section>
    </div>
  )
}
