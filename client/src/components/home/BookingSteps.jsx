import { bookingSteps } from '../../constants/homepage.js'

export function BookingSteps() {
  return (
    <section className="booking-steps-section" aria-labelledby="booking-steps-title">
      <div data-reveal><p className="eyebrow">How Booking Works</p><h2 id="booking-steps-title">Four simple steps to your next look.</h2></div>
      <ol className="booking-steps-grid">
        {bookingSteps.map((step, index) => <li className="booking-step-card" data-reveal key={step.title} style={{ '--index': index }}><span>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
      </ol>
    </section>
  )
}
