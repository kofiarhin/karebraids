import { ArrowLeft, ArrowRight, Quotes, Star } from '@phosphor-icons/react'
import { homepageImages, testimonial } from '../../constants/homepage.js'

export function TestimonialSection() {
  return (
    <section className="client-love-section" aria-labelledby="client-love-title">
      <div className="client-love-copy" data-reveal>
        <p className="eyebrow">Client Love</p>
        <h2 id="client-love-title">Loved by women across London.</h2>
      </div>
      <article className="testimonial-card" data-reveal style={{ '--index': 1 }}>
        <Quotes aria-hidden="true" className="quote-mark" size={42} weight="fill" />
        <img alt={homepageImages.testimonial.alt} src={homepageImages.testimonial.src} />
        <blockquote>
          <p>{testimonial.quote}</p>
          <cite>{testimonial.name}</cite>
        </blockquote>
        <div className="star-row" aria-label="5 star testimonial">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star aria-hidden="true" key={index} size={17} weight="fill" />
          ))}
        </div>
        <div className="testimonial-arrows" aria-label="Testimonial carousel controls">
          <button aria-label="Previous testimonial" type="button">
            <ArrowLeft aria-hidden="true" size={18} weight="bold" />
          </button>
          <button aria-label="Next testimonial" type="button">
            <ArrowRight aria-hidden="true" size={18} weight="bold" />
          </button>
        </div>
      </article>
    </section>
  )
}
