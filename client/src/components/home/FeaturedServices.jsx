import { Link } from 'react-router-dom'
import { services } from '../../constants/content.js'

const featuredServices = services.slice(0, 3)

export function FeaturedServices() {
  return (
    <section className="featured-services-section" aria-labelledby="featured-services-title">
      <div className="featured-services-intro" data-reveal>
        <p className="eyebrow">Featured Services</p>
        <h2 id="featured-services-title">Find the style that feels like you.</h2>
        <p>Begin with a signature protective style, then reserve a salon or mobile appointment.</p>
      </div>
      <div className="featured-services-grid">
        {featuredServices.map((service, index) => (
          <article className="featured-service-card" data-reveal key={service.id} style={{ '--index': index + 1 }}>
            <img alt={`${service.title} protective braiding style`} loading="lazy" src={service.image} />
            <div>
              <p>{service.category}</p>
              <h3>{service.title}</h3>
              <span>{service.fromPrice}</span>
            </div>
          </article>
        ))}
      </div>
      <Link className="btn btn-secondary" data-reveal to="/services">
        Explore All Services
      </Link>
    </section>
  )
}
