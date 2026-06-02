import { Link } from 'react-router-dom'
import { styleProfiles } from '../../constants/styles.js'

export function BrowseByStyle() {
  return (
    <section className="browse-style-section" aria-labelledby="browse-style-title">
      <div className="browse-style-intro" data-reveal>
        <p className="eyebrow">Browse By Style</p>
        <h2 id="browse-style-title">Start with the look you have in mind.</h2>
        <p>Explore client examples by category, then compare the service details before you book.</p>
      </div>
      <div className="browse-style-grid">
        {styleProfiles.map((style, index) => (
          <Link aria-label={`${style.name}, ${style.count} styles, starting at ${style.startingPrice}`} className="browse-style-card" data-reveal key={style.slug} style={{ '--index': index }} to={`/gallery?style=${style.slug}`}>
            <img alt={`${style.name} category`} loading="lazy" src={style.image} />
            <span><strong>{style.name}</strong><small>{style.count} styles · From {style.startingPrice}</small></span>
          </Link>
        ))}
      </div>
    </section>
  )
}
