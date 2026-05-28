import { Button } from '../Button.jsx'

export function BookingCTA() {
  return (
    <section className="booking-cta-section" aria-label="Book your next KareBraids style" data-reveal>
      <img alt="" aria-hidden="true" className="booking-cta-texture" src="/favicon.svg" />
      <div>
        <p className="eyebrow">Ready for your next style?</p>
        <h2>Let's get you booked.</h2>
        <p>Salon or mobile braiding services in London.</p>
      </div>
      <Button to="/booking">Book Your Appointment</Button>
    </section>
  )
}
