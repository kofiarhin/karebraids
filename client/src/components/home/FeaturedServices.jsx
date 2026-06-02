import { Link } from 'react-router-dom'
import { styleProfiles } from '../../constants/styles.js'

const featuredServices = styleProfiles.slice(0, 4)

export function FeaturedServices() {
  return (
    <section className="featured-services-section" aria-labelledby="featured-services-title">
      <div className="featured-services-intro" data-reveal>
        <p className="eyebrow">Featured Services + Pricing</p>
        <h2 id="featured-services-title">Clear starting prices. No guesswork.</h2>
        <p>Review popular services, understand your starting point, and choose the right appointment with confidence.</p>
      </div>
      <div className="featured-services-grid">
        {featuredServices.map((service, index) => (
          <article className="featured-service-card" data-reveal key={service.slug} style={{ '--index': index + 1 }}>
            <img alt={`${service.name} protective braiding style`} loading="lazy" src={service.image} />
            <div><p>Starting at {service.startingPrice}</p><h3>{service.name}</h3><Link aria-label={`Learn more about ${service.name}`} className="text-link" to={`/services/${service.slug}`}>View Service</Link></div>
          </article>
        ))}
      </div>
      <Link className="btn btn-secondary" data-reveal to="/services">Explore All Services</Link>
    </section>
  )
}
