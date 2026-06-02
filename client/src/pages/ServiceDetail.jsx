import { Navigate, useParams } from 'react-router-dom'
import { Button } from '../components/Button.jsx'
import { ReviewList } from '../components/reviews/ReviewList.jsx'
import { styleProfileBySlug } from '../constants/styles.js'

export function ServiceDetail() {
  const { slug } = useParams()
  const style = styleProfileBySlug[slug]

  if (!style) return <Navigate replace to="/services" />

  return (
    <article className="service-detail-page">
      <section className="service-detail-hero">
        <img alt={`${style.name} protective style`} src={style.image} />
        <div>
          <p className="eyebrow">KareBraids Style Guide</p>
          <h1>{style.name}</h1>
          <p>{style.description}</p>
          <Button to={`/booking?style=${style.slug}`}>Book This Style</Button>
        </div>
      </section>
      <section className="service-facts" aria-label={`${style.name} appointment details`}>
        <div><span>Starting Price</span><strong>{style.startingPrice}</strong></div>
        <div><span>Duration</span><strong>{style.duration}</strong></div>
        <div><span>Hair Included</span><strong>{style.hairIncluded}</strong></div>
      </section>
      <section className="service-detail-section">
        <p className="eyebrow">Finished With Care</p>
        <h2>Style gallery</h2>
        <div className="service-detail-gallery">{style.gallery.map((item) => <img alt={`${style.name} example`} loading="lazy" src={item.image} key={item.id} />)}</div>
      </section>
      <section className="service-detail-columns">
        <div><p className="eyebrow">Best Fit</p><h2>Suitable For</h2><p>{style.suitableFor}</p></div>
        <div><p className="eyebrow">Aftercare</p><h2>Care Tips</h2><ul>{style.careTips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>
      </section>
      <section className="service-detail-section" aria-labelledby="style-reviews-title">
        <p className="eyebrow">Client Confidence</p><h2 id="style-reviews-title">Client Reviews</h2><ReviewList reviews={style.reviews} />
      </section>
      <section className="service-detail-cta"><div><p className="eyebrow">Ready To Reserve?</p><h2>Book {style.name}</h2></div><Button to={`/booking?style=${style.slug}`}>Book This Style</Button></section>
    </article>
  )
}
