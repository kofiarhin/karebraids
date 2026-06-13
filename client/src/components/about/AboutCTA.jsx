import { Button } from '../Button.jsx'

export function AboutCTA({ image }) {
  return (
    <section className="about-cta-banner relative isolate overflow-hidden bg-[#F5F1EE] px-5 py-20 text-center text-[#F5F1EE] sm:py-24" aria-labelledby="about-cta-title">
      <img className="about-banner-image absolute inset-0 -z-20 h-full w-full object-cover opacity-45" src={image.src} alt={image.alt} />
      <div className="about-banner-overlay absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(212,163,115,0.28),transparent_32%),linear-gradient(180deg,rgba(20,17,15,0.82),rgba(20,17,15,0.95))]" />
      <div className="mx-auto max-w-3xl">
        <p className="about-section-eyebrow text-sm font-semibold uppercase tracking-[0.28em] text-[#D4A373]">Book with confidence</p>
        <h2 id="about-cta-title" className="about-section-title mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
          Ready For Your Next Style?
        </h2>
        <p className="about-section-copy mx-auto mt-5 max-w-xl text-base leading-8 text-[#e8ddd3] sm:text-lg">
          Book your appointment today and experience premium braiding care.
        </p>
        <div className="mt-8 flex justify-center">
          <Button className="min-w-48 justify-center" to="/booking">Book Appointment</Button>
        </div>
      </div>
    </section>
  )
}
