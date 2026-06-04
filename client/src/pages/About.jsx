import { Button } from '../components/Button.jsx'
import { getGalleryItems } from '../data/services.js'

const galleryItems = getGalleryItems()
const founderPortrait = galleryItems.find((item) => item.id === 'stitch-1') || galleryItems[2] || galleryItems[0]

const trustCards = [
  {
    title: 'Gentle tension',
    copy: 'Karen checks comfort as she works, keeping each protective style neat without treating tenderness as an afterthought.',
  },
  {
    title: 'Clean professional finish',
    copy: 'Parting, shape, and finishing details are handled with the calm precision clients expect from premium braiding care.',
  },
  {
    title: 'Reliable communication',
    copy: 'Appointments begin with clear expectations around style, timing, prep, and what will help the visit run smoothly.',
  },
  {
    title: 'Comfortable appointment experience',
    copy: 'The service is intentionally personal, patient, and respectful so clients can settle in and feel looked after.',
  },
]

const standardSteps = [
  {
    title: 'Consultation',
    copy: 'Karen listens first, confirming your desired style, hair needs, timing, and comfort preferences before the appointment begins.',
  },
  {
    title: 'Preparation',
    copy: 'Your hair is approached with care, sectioning is planned, and the style direction is checked before detailed braid work starts.',
  },
  {
    title: 'Braiding',
    copy: 'Each braid is shaped with clean parts, balanced tension, and a polished finish that keeps the full look intentional.',
  },
  {
    title: 'Aftercare',
    copy: 'You leave with practical guidance for protecting your style, caring for your scalp, and keeping the finish fresh.',
  },
]

const timelineItems = [
  {
    title: 'Book',
    copy: 'Choose your appointment path and share the style details Karen needs to prepare properly.',
  },
  {
    title: 'Consult',
    copy: 'Confirm the look, comfort needs, length, and finish so the appointment feels considered from the start.',
  },
  {
    title: 'Braid',
    copy: 'Settle into focused, gentle braiding care built around neat detail and a professional rhythm.',
  },
  {
    title: 'Leave Confident',
    copy: 'Walk out with a protective style that feels polished, comfortable, and ready for real life.',
  },
]

const proofMetrics = [
  {
    value: 'Protective-style focused',
    label: 'Care centered on braids, twists, cornrows, and styles that respect natural hair.',
  },
  {
    value: 'Client-first service',
    label: 'A calmer appointment standard shaped around listening, clarity, and comfort.',
  },
  {
    value: 'Premium finish standard',
    label: 'Clean parting, balanced shape, and final details designed to look intentional.',
  },
]

export function About() {
  return (
    <div className="about-editorial-page about-page dark-about-page">
      <section className="about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero-copy">
          <p className="eyebrow">Founder-led braiding care</p>
          <h1 id="about-hero-title">Meet Karen, the hands and heart behind KareBraids.</h1>
          <p>
            KareBraids is Karen’s Birmingham-based braiding service for clients who want their hair
            handled with trust, detail, and genuine care. Her approach is gentle, professional, and
            client-first, with every part, braid, and finishing touch considered before you leave the chair.
          </p>
          <div className="about-actions" aria-label="About page actions">
            <Button to="/booking">Book an Appointment</Button>
            <Button to="/gallery" variant="secondary">View Styles</Button>
          </div>
        </div>

        <aside className="about-founder-card" aria-label="Karen founder portrait">
          <div className="about-portrait-panel">
            <img
              alt={founderPortrait?.alt || 'Karen providing detailed braiding care in Birmingham'}
              src={founderPortrait?.image}
            />
            <p className="about-image-note">Gentle tension • Clean parts • Polished finish</p>
          </div>
        </aside>
      </section>

      <section aria-labelledby="about-trust-title">
        <div className="about-section-heading">
          <p className="eyebrow">Why clients trust Karen</p>
          <h2 id="about-trust-title">Care you can feel before the first braid is finished.</h2>
        </div>
        <div className="about-trust-grid">
          {trustCards.map((card) => (
            <article className="about-trust-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-location-panel" aria-labelledby="about-location-title">
        <p className="eyebrow">Birmingham braiding care</p>
        <h2 id="about-location-title">Premium braiding with a calm, personal service experience.</h2>
        <p>
          KareBraids is based in Birmingham and built for clients who want salon-level care without
          feeling rushed or overlooked. Karen keeps the experience focused, warm, and clear, so your
          appointment feels as considered as the finished style.
        </p>
      </section>

      <section className="about-standard-section" aria-labelledby="about-standard-title">
        <div className="about-section-heading">
          <p className="eyebrow">The KareBraids Standard</p>
          <h2 id="about-standard-title">A thoughtful process from first message to final mirror check.</h2>
        </div>
        <div className="about-standard-grid">
          {standardSteps.map((step, index) => (
            <article className="about-standard-card" key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="about-timeline-title">
        <div className="about-section-heading">
          <p className="eyebrow">Appointment timeline</p>
          <h2 id="about-timeline-title">Know what happens next.</h2>
        </div>
        <div className="about-timeline">
          {timelineItems.map((item, index) => (
            <article className="about-timeline-item" key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-label="KareBraids service proof points" className="about-proof-grid">
        {proofMetrics.map((metric) => (
          <article className="about-proof-card" key={metric.value}>
            <strong>{metric.value}</strong>
            <p>{metric.label}</p>
          </article>
        ))}
      </section>

      <section className="about-final-cta" aria-labelledby="about-final-cta-title">
        <p className="eyebrow">Book with confidence</p>
        <h2 id="about-final-cta-title">Ready for a braid appointment that feels considered from start to finish?</h2>
        <p>
          Choose KareBraids when you want trust, comfort, and confidence woven into the full appointment,
          not added at the end.
        </p>
        <Button to="/booking">Book an Appointment</Button>
      </section>
    </div>
  )
}
