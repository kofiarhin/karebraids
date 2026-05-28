import { Button } from '../Button.jsx'
import { homepageImages } from '../../constants/homepage.js'

export function GalleryPreview() {
  return (
    <section className="gallery-preview-section luxury-gallery-preview">
      <div className="gallery-preview-copy" data-reveal>
        <p className="eyebrow">Gallery Preview</p>
        <h2>See the finish before you book.</h2>
        <Button to="/gallery" variant="secondary">
          View Gallery
        </Button>
      </div>
      <div className="gallery-mosaic" aria-label="Braiding gallery preview" data-reveal style={{ '--index': 1 }}>
        {homepageImages.gallery.map((item, index) => (
          <img
            alt={index === 1 ? 'Salon braiding detail' : item.title}
            key={item.id}
            loading="lazy"
            src={item.image}
          />
        ))}
      </div>
    </section>
  )
}
