import { Button } from '../components/Button.jsx'
import { galleryItems } from '../constants/content.js'

export function About() {
  return (
    <section className="about-page">
      <div className="page-hero-copy">
        <p className="eyebrow">Founder story</p>
        <h1>Meet Karen</h1>
        <p>
          KareBraids is built around the care, patience, and precision that make braiding feel
          personal. Karen created the service for women who want beautiful protective styles without
          rushing the consultation, comfort, or finish.
        </p>
        <Button to="/booking">Schedule Appointment</Button>
      </div>
      <div className="about-image">
        <img alt="Detailed salon braiding session" src={galleryItems[2].image} />
      </div>
      <div className="value-panel">
        <article>
          <h2>Mission</h2>
          <p>Make premium African hair braiding easier to book, easier to trust, and more comfortable from consultation to final mirror check.</p>
        </article>
        <article>
          <h2>Values</h2>
          <p>Gentle tension, thoughtful service, cultural fluency, reliable timing, and styles that protect natural hair.</p>
        </article>
        <article>
          <h2>Professionalism</h2>
          <p>Clear expectations, confirmed availability, clean communication, and a calm appointment experience whether salon or mobile.</p>
        </article>
      </div>
    </section>
  )
}
