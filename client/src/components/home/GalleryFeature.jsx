import { Link } from 'react-router-dom'
import { useGalleryItems } from '../../hooks/queries/useGalleryItems.js'

export function GalleryFeature() {
  const { data: galleryPreviewItems = [], isError, isLoading } = useGalleryItems({ limit: 4 })

  return (
    <section className="gallery-feature-section" aria-labelledby="gallery-feature-title">
      <div className="gallery-feature-intro" data-reveal>
        <p className="eyebrow">Client Gallery</p>
        <h2 id="gallery-feature-title">Protective styles crafted with precision.</h2>
        <p>Explore recent client looks shaped with care and finished for effortless confidence.</p>
      </div>

      {isLoading ? <p className="gallery-query-state" role="status">Loading client gallery...</p> : null}
      {isError ? <p className="gallery-query-state" role="alert">Client looks are unavailable right now.</p> : null}
      {!isLoading && !isError && galleryPreviewItems.length === 0 ? (
        <p className="gallery-query-state" role="status">New client looks are coming soon.</p>
      ) : null}
      {!isLoading && !isError && galleryPreviewItems.length > 0 ? (
        <div className="gallery-feature-grid" aria-label="Featured braiding gallery preview">
          {galleryPreviewItems.map((item, index) => (
            <Link className="gallery-feature-card" data-reveal key={item.id} style={{ '--index': index + 1 }} to="/gallery">
              <img alt={item.title} loading="lazy" src={item.image} />
              <span className="gallery-feature-overlay" aria-hidden="true" />
              <span className="gallery-feature-caption">
                <strong>{item.title}</strong>
                <small>View Gallery</small>
              </span>
            </Link>
          ))}
        </div>
      ) : null}

      <div className="gallery-feature-action" data-reveal style={{ '--index': 5 }}>
        <Link className="btn btn-secondary" to="/gallery">View Full Gallery</Link>
      </div>
    </section>
  )
}
