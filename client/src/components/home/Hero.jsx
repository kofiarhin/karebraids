import { useEffect, useMemo, useState } from 'react'
import { Star } from '@phosphor-icons/react'
import { Button } from '../Button.jsx'
import { homepageImages } from '../../constants/homepage.js'
import { useGalleryItems } from '../../hooks/queries/useGalleryItems.js'

const HERO_IMAGE_LIMIT = 5
const HERO_CYCLE_MS = 4000

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
    <section className="luxury-hero hero-section home-hero" aria-labelledby="homepage-hero-title">
      <div className="luxury-hero-copy hero-copy" data-reveal>
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
        className="luxury-hero-media hero-media editorial-media"
        data-reveal
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ '--index': 1 }}
      >
        <div className="hero-carousel" aria-label="Featured braid styles carousel">
          {heroImages.map((image, index) => (
            <img
              alt={image.alt}
              aria-hidden={index !== activeIndex}
              className={`hero-slide ${index === activeIndex ? 'is-active' : ''}`}
              key={image.id}
              loading={index === 0 ? 'eager' : 'lazy'}
              src={image.src}
            />
          ))}

          {heroImages.length > 1 ? (
            <div className="hero-carousel-dots" role="tablist" aria-label="Choose hero image">
              {heroImages.map((image, index) => (
                <button
                  aria-label={`Show hero image ${index + 1}`}
                  aria-selected={index === activeIndex}
                  className={`hero-carousel-dot ${index === activeIndex ? 'is-active' : ''}`}
                  key={`${image.id}-dot`}
                  onClick={() => setActiveIndex(index)}
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
