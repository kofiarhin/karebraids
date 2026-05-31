import { Link } from 'react-router-dom'
import { services } from '../constants/content.js'

const serviceCategories = ['Braids', 'Cornrows', 'Twists & Locs', 'Kids Styles']
const categoryId = (category) => `service-category-${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

export function Services() {
  return (
    <div className="services-page dark-services-page">
      <section className="services-hero" aria-labelledby="services-title">
        <div className="services-hero-copy">
          <p className="eyebrow">KareBraids Services</p>
          <h1 id="services-title">Signature braid services, shaped around you.</h1>
          <p>
            Explore protective styles finished with precision, comfort, and a polished touch for
            every season of your hair journey.
          </p>
          <Link className="btn btn-primary" to="/booking">
            Book Appointment
          </Link>
        </div>
        <div className="services-hero-image">
          <img alt="Close view of carefully crafted long braids" src={services[0].image} />
        </div>
      </section>

      <section className="services-intro" aria-labelledby="services-intro-title">
        <p className="eyebrow">Salon & Mobile</p>
        <h2 id="services-intro-title">Premium care, wherever your appointment feels best.</h2>
        <p>
          Choose a calm salon appointment or a mobile service across London. Every style begins
          with a thoughtful consultation and a protective-care-first approach.
        </p>
      </section>

      <div className="services-catalog" aria-label="Braiding service categories">
        {serviceCategories.map((category) => (
          <section className="service-category" aria-labelledby={categoryId(category)} key={category}>
            <div className="service-category-heading">
              <p className="eyebrow">Explore Styles</p>
              <h2 id={categoryId(category)}>{category}</h2>
            </div>
            <div className="service-grid">
              {services
                .filter((service) => service.category === category)
                .map((service) => (
                  <article className="service-card" key={service.id}>
                    <div className="service-card-image">
                      <img alt={`${service.title} protective braiding style`} loading="lazy" src={service.image} />
                    </div>
                    <div className="service-card-copy">
                      <div className="service-card-heading">
                        <h3>{service.title}</h3>
                        <p>{service.fromPrice}</p>
                      </div>
                      <p>{service.description}</p>
                      <div className="service-card-footer">
                        <span>{service.duration}</span>
                        <Link className="text-link" to="/booking">
                          Book Appointment
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>

      <section className="services-booking-cta" aria-labelledby="services-booking-title">
        <div>
          <p className="eyebrow">Your Next Style</p>
          <h2 id="services-booking-title">Ready for a braid appointment designed around you?</h2>
          <p>Reserve your preferred date and tell us which protective style you have in mind.</p>
        </div>
        <Link className="btn btn-primary" to="/booking">
          Reserve Your Appointment
        </Link>
      </section>
    </div>
  )
}
