export function ServiceCard({ service, index }) {
  return (
    <article
      aria-label={`${service.title}, ${service.price}`}
      className="service-card"
      data-reveal
      style={{ '--index': index }}
    >
      <img alt={service.alt} loading="lazy" src={service.image} />
      <div className="service-card-overlay">
        <p>{service.price}</p>
        <h3>{service.title}</h3>
        <a className="text-link" href="/booking">
          Book this style
        </a>
      </div>
    </article>
  )
}
