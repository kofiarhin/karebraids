import { CheckCircle, Star } from '@phosphor-icons/react'

export function ReviewList({ reviews }) {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <article className="review-card" key={review.id}>
          <div className="star-row" aria-label={`${review.rating} star review`}>
            {Array.from({ length: review.rating }).map((_, index) => <Star aria-hidden="true" key={index} size={16} weight="fill" />)}
          </div>
          <p>{review.comment ?? review.text}</p>
          <footer>
            <strong>{review.name}</strong>
            {review.verifiedClient === false ? null : <span><CheckCircle aria-hidden="true" size={16} weight="fill" /> Verified client</span>}
          </footer>
        </article>
      ))}
    </div>
  )
}
