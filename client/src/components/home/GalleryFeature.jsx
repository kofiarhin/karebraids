import { Link } from 'react-router-dom'
import { galleryItems } from '../../constants/content.js'

const galleryPreviewItems = galleryItems.slice(0, 6)

export function GalleryFeature() {
  return (
    <section className="gallery-feature-section" aria-labelledby="gallery-feature-title">
      <div className="gallery-feature-intro" data-reveal>
        <p className="eyebrow">Our Work</p>
        <h2 id="gallery-feature-title">Protective styles crafted with precision.</h2>
        <p>
          Explore a curated preview of polished protective styles, shaped with care and finished
          for effortless confidence.
        </p>
      </div>

      <div className="gallery-feature-grid" aria-label="Featured braiding gallery preview">
        {galleryPreviewItems.map((item, index) => (
          <Link
            className="gallery-feature-card"
            data-reveal
            key={item.id}
            style={{ '--index': index + 1 }}
            to="/gallery"
          >
            <img alt={item.title} loading="lazy" src={item.image} />
            <span className="gallery-feature-overlay" aria-hidden="true" />
            <span className="gallery-feature-caption">
              <strong>{item.title}</strong>
              <small>View Gallery →</small>
            </span>
          </Link>
        ))}
      </div>

      <div className="gallery-feature-action" data-reveal style={{ '--index': 7 }}>
        <Link className="btn btn-secondary" to="/gallery">
          View Full Gallery
        </Link>
      </div>
    </section>
  )
}
