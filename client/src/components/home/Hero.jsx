import { useEffect, useMemo, useState } from 'react'
import { Star } from '@phosphor-icons/react'
import { Button } from '../Button.jsx'
import { homepageImages } from '../../constants/homepage.js'
import { useGalleryItems } from '../../hooks/queries/useGalleryItems.js'

const HERO_IMAGE_LIMIT = 5
const HERO_CYCLE_MS = 4000

const carouselStyles = {
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: 'inherit',
  overflow: 'hidden',
}

const slideStyles = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  opacity: 0,
  transform: 'scale(1.02)',
  transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), transform 4500ms cubic-bezier(0.16, 1, 0.3, 1)',
}

const activeSlideStyles = {
  opacity: 1,
  transform: 'scale(1.06)',
  zIndex: 1,
}

const dotsStyles = {
  position: 'absolute',
  left: '50%',
  bottom: '1rem',
  zIndex: 3,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45rem',
  border: '1px solid rgba(255, 250, 246, 0.5)',
  borderRadius: '999px',
  background: 'rgba(28, 33, 28, 0.32)',
  padding: '0.4rem 0.5rem',
  backdropFilter: 'blur(14px)',
  transform: 'translateX(-50%)',
}

function getDotStyles(isActive) {
  return {
    width: isActive ? '1.35rem' : '0.55rem',
    height: '0.55rem',
    border: `1px solid ${isActive ? 'rgba(255, 250, 246, 0.86)' : 'rgba(255, 250, 246, 0.72)'}`,
    borderRadius: '999px',
    background: isActive ? '#b78652' : 'rgba(255, 250, 246, 0.52)',
    cursor: 'pointer',
    padding: 0,
    transition: 'background 200ms ease, border-color 200ms ease, transform 200ms ease, width 200ms ease',
  }
}

function getHeroImageId(image, index) {
  return image.id || image.src || `hero-image-${index}`
}

function normalizeHeroImage(image, index) {
  return {
    id: getHeroImageId(image, index),
    src: image.src,
    alt: image.alt || image.title || homepageImages.hero.alt,
  }
}

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const heroImagesQuery = useGalleryItems({ limit: HERO_IMAGE_LIMIT })

  const heroImages = useMemo(() => {
    const backendImages = (heroImagesQuery.data || [])
      .filter((image) => Boolean(image?.src))
      .slice(0, HERO_IMAGE_LIMIT)
      .map(normalizeHeroImage)

    return backendImages.length > 0
      ? backendImages
      : [{ id: 'hero-fallback', src: homepageImages.hero.src, alt: homepageImages.hero.alt }]
  }, [heroImagesQuery.data])

  useEffect(() => {
    setActiveIndex(0)
  }, [heroImages.length])

  useEffect(() => {
    if (isPaused || heroImages.length <= 1) return undefined

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % heroImages.length)
    }, HERO_CYCLE_MS)

    return () => window.clearInterval(intervalId)
  }, [heroImages.length, isPaused])

  return (
    <section className="luxury-hero" aria-labelledby="homepage-hero-title">
      <div className="luxury-hero-copy" data-reveal>
        <p className="eyebrow">Luxury African Hair Braiding</p>
        <h1 id="homepage-hero-title">
          Luxury braiding, crafted with <span>care.</span>
        </h1>
        <p className="hero-lede">
          Premium salon and mobile braiding services across Birmingham and the West Midlands. Beautiful styles. Healthy hair.
          Exceptional care.
        </p>
        <div className="hero-actions">
          <Button to="/booking">Book Appointment</Button>
          <Button to="/gallery" variant="secondary">View Styles</Button>
        </div>
        <div className="social-proof" aria-label="Client rating">
          <div className="client-avatar-stack">
            {homepageImages.avatars.map((avatar, index) => (
              <img
                alt=""
                aria-hidden="true"
                key={avatar.src}
                loading="lazy"
                src={avatar.src}
                style={{ '--index': index }}
              />
            ))}
          </div>
          <strong>5.0</strong>
          <span className="star-row" aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star aria-hidden="true" key={index} size={15} weight="fill" />
            ))}
          </span>
          <span>500+ Happy Clients</span>
        </div>
      </div>

      <div
        className="luxury-hero-media"
        data-reveal
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ '--index': 1 }}
      >
        <div aria-label="Featured braid styles carousel" style={carouselStyles}>
          {heroImages.map((image, index) => (
            <img
              alt={image.alt}
              aria-hidden={index !== activeIndex}
              key={image.id}
              loading={index === 0 ? 'eager' : 'lazy'}
              src={image.src}
              style={{
                ...slideStyles,
                ...(index === activeIndex ? activeSlideStyles : null),
              }}
            />
          ))}

          {heroImages.length > 1 ? (
            <div role="tablist" aria-label="Choose hero image" style={dotsStyles}>
              {heroImages.map((image, index) => (
                <button
                  aria-label={`Show hero image ${index + 1}`}
                  aria-selected={index === activeIndex}
                  key={`${image.id}-dot`}
                  onClick={() => setActiveIndex(index)}
                  style={getDotStyles(index === activeIndex)}
                  type="button"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
