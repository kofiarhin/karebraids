import { Link } from 'react-router-dom'
import { useGalleryItems } from '../../hooks/queries/useGalleryItems.js'

export function GalleryFeature() {
  const galleryQuery = useGalleryItems({ limit: 4 })
  const galleryPreviewItems = galleryQuery.data || []
  return (
    <section className="gallery-feature-section" aria-labelledby="gallery-feature-title">
      <div className="gallery-feature-intro" data-reveal><p className="eyebrow">Style Inspiration Gallery</p><h2 id="gallery-feature-title">Protective styles crafted with precision.</h2><p>Representative styling images used for inspiration. Final results depend on your chosen service, hair type, length, and consultation.</p></div>
      {galleryQuery.isLoading ? <p className="gallery-query-state" role="status">Loading styling inspiration…</p> : null}
      {galleryQuery.isError ? <p className="gallery-query-state" role="alert">Styling inspiration could not be loaded.</p> : null}
      {!galleryQuery.isLoading && !galleryQuery.isError && galleryPreviewItems.length === 0 ? <p className="gallery-query-state" role="status">New styling inspiration is coming soon.</p> : null}
      {galleryPreviewItems.length > 0 ? <div className="gallery-feature-grid" aria-label="Featured braiding gallery preview">{galleryPreviewItems.map((item, index) => <Link className="gallery-feature-card" data-reveal key={item.id} style={{ '--index': index + 1 }} to="/gallery"><img alt={item.alt} loading="lazy" src={item.src || item.image} /><span className="gallery-feature-overlay" aria-hidden="true" /><span className="gallery-feature-caption"><strong>{item.title}</strong><small>Representative image</small></span></Link>)}</div> : null}
      <div className="gallery-feature-action" data-reveal style={{ '--index': 5 }}><Link className="btn btn-secondary" to="/gallery">View Full Gallery</Link></div>
    </section>
  )
}
