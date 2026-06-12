import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGalleryEnabledServices } from '../hooks/queries/useServices.js'
import { formatServicePrice } from '../utils/formatServicePrice.js'
import { getServicePreview } from '../utils/servicePreview.js'
import './Services.css'

const CATEGORY_ORDER = ['Braids', 'Cornrows', 'Kids Styles', 'Twists & Locs']
const MAX_FEATURED_SERVICES = 4

function getServiceKey(service) {
  return service.slug || service.id
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getCategoryOrder(category) {
  const index = CATEGORY_ORDER.indexOf(category)
  return index === -1 ? CATEGORY_ORDER.length : index
}

function groupServicesByCategory(services) {
  const groups = services.reduce((acc, service) => {
    const category = service.category || 'Other Styles'
    if (!acc.has(category)) acc.set(category, [])
    acc.get(category).push(service)
    return acc
  }, new Map())

  return Array.from(groups.entries())
    .sort(([categoryA], [categoryB]) => {
      const orderDifference = getCategoryOrder(categoryA) - getCategoryOrder(categoryB)
      return orderDifference || categoryA.localeCompare(categoryB)
    })
    .map(([category, categoryServices]) => ({
      category,
      id: `services-category-${slugify(category)}`,
      services: categoryServices,
    }))
}

function ServiceImage({ service, className = '' }) {
  const preview = getServicePreview(service)

  return (
    <div className={`services-redesign-image ${className}`.trim()}>
      <img alt={preview.alt} loading="lazy" src={preview.src} />
      <span>Representative image</span>
    </div>
  )
}

function ServiceActions({ service, compact = false }) {
  const serviceKey = getServiceKey(service)

  return (
    <div className={compact ? 'services-redesign-actions compact' : 'services-redesign-actions'}>
      <Link className="btn btn-primary" to={`/booking?service=${serviceKey}`}>
        {compact ? 'Book' : 'Book Style'}
      </Link>
      <Link className="services-redesign-gallery-link" to={`/gallery?service=${serviceKey}`}>
        View Gallery
      </Link>
    </div>
  )
}

function FeaturedServiceCard({ service }) {
  return (
    <article className="featured-style-card" data-motion-item>
      <ServiceImage service={service} className="featured-style-image" />
      <div className="featured-style-content">
        <div>
          <h3>{service.name}</h3>
          <p>From {formatServicePrice(service)}</p>
        </div>
        <ServiceActions service={service} compact />
      </div>
    </article>
  )
}

function ServiceRow({ service }) {
  return (
    <article className="services-menu-row" data-motion-item>
      <ServiceImage service={service} className="services-menu-row-image" />
      <div className="services-menu-row-content">
        <div className="services-menu-row-copy">
          <p className="services-menu-row-category">{service.category || 'Service'}</p>
          <h3>{service.name}</h3>
          <p>{service.shortDescription}</p>
        </div>
        <dl className="services-menu-row-meta" aria-label={`${service.name} details`}>
          <div>
            <dt>From</dt>
            <dd>{formatServicePrice(service)}</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{service.durationLabel || service.duration}</dd>
          </div>
        </dl>
        <ServiceActions service={service} />
      </div>
    </article>
  )
}

export function Services() {
  const [activeCategory, setActiveCategory] = useState('')
  const servicesQuery = useGalleryEnabledServices()
  const services = servicesQuery.data || []

  const featuredServices = useMemo(
    () => services.filter((service) => service.featured).slice(0, MAX_FEATURED_SERVICES),
    [services],
  )
  const serviceGroups = useMemo(() => groupServicesByCategory(services), [services])

  return (
    <div className="services-page services-redesign">
      <section className="services-redesign-hero" aria-labelledby="services-title">
        <div className="services-redesign-hero-copy" data-motion-item>
          <p className="eyebrow">Our Services</p>
          <h1 id="services-title">Luxury braiding services tailored to your style.</h1>
          <p>Protective styles crafted for comfort, confidence, and longevity.</p>
          <div className="services-redesign-hero-actions">
            <Link className="btn btn-primary" to="/booking">Book Appointment</Link>
            <a className="btn btn-secondary" href="#services-menu">Explore Services</a>
          </div>
        </div>
      </section>

      {servicesQuery.isLoading ? (
        <p className="gallery-query-state" role="status">Loading services…</p>
      ) : null}
      {servicesQuery.isError ? (
        <p className="gallery-query-state" role="alert">Services could not be loaded. Please try again.</p>
      ) : null}
      {!servicesQuery.isLoading && !servicesQuery.isError && services.length === 0 ? (
        <p className="gallery-query-state" role="status">Services are being prepared. Please check back soon.</p>
      ) : null}

      {featuredServices.length > 0 ? (
        <section className="featured-styles-section" aria-labelledby="featured-styles-title">
          <div className="services-redesign-section-heading">
            <p className="eyebrow">Featured Styles</p>
            <h2 id="featured-styles-title">Most requested braid appointments.</h2>
            <p>Start with the signature styles clients book most often, then choose your appointment slot.</p>
          </div>
          <div className="featured-styles-grid">
            {featuredServices.map((service) => (
              <FeaturedServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>
      ) : null}

      {serviceGroups.length > 0 ? (
        <>
          <nav className="services-category-nav" aria-label="Service categories">
            {serviceGroups.map((group) => (
              <a
                aria-current={activeCategory === group.id ? 'true' : undefined}
                href={`#${group.id}`}
                key={group.id}
                onClick={() => setActiveCategory(group.id)}
              >
                {group.category}
              </a>
            ))}
          </nav>

          <section className="services-menu-section" id="services-menu" aria-labelledby="services-menu-title">
            <div className="services-redesign-section-heading">
              <p className="eyebrow">Full Service Menu</p>
              <h2 id="services-menu-title">Choose your style.</h2>
              <p>Every service includes careful parting, low-tension styling, and guidance for keeping your braids fresh.</p>
            </div>

            <div className="services-menu-groups">
              {serviceGroups.map((group) => (
                <section className="services-menu-category" id={group.id} key={group.id} aria-labelledby={`${group.id}-title`}>
                  <div className="services-menu-category-heading">
                    <p className="eyebrow">{group.services.length} styles</p>
                    <h3 id={`${group.id}-title`}>{group.category}</h3>
                  </div>
                  <div className="services-menu-list">
                    {group.services.map((service) => (
                      <ServiceRow key={service.id} service={service} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <section className="services-redesign-booking-cta" aria-labelledby="services-booking-title">
        <div>
          <p className="eyebrow">Your Next Style</p>
          <h2 id="services-booking-title">Ready for a braid appointment designed around you?</h2>
          <p>Reserve your preferred date and tell us which protective style you have in mind.</p>
        </div>
        <Link className="btn btn-primary" to="/booking">Reserve Your Appointment</Link>
      </section>
    </div>
  )
}
