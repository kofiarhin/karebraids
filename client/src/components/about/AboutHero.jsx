import { Button } from '../Button.jsx'

export function AboutHero({ image }) {
  return (
    <section
      aria-labelledby="about-hero-title"
      className="relative isolate flex min-h-[45vh] items-center overflow-hidden bg-[#14110f] px-5 py-20 text-center text-[#F5F1EE] sm:min-h-[50vh] lg:min-h-[55vh]"
    >
      <img
        alt={image.alt}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={image.src}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,8,7,0.72),rgba(10,8,7,0.86))]" />
      <div className="mx-auto max-w-4xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A373] sm:text-sm">
          Founded by Karen
        </p>
        <h1 id="about-hero-title" className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
          About KareBraids
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-[#F5F1EE] sm:text-xl">
          Premium Braiding Services in Birmingham
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#e8ddd3] sm:text-lg">
          Creating beautiful protective styles with care, precision, and attention to detail.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button className="min-w-48 justify-center" to="/booking">Book Appointment</Button>
          <Button className="min-w-48 justify-center" to="/gallery" variant="secondary">View Gallery</Button>
        </div>
      </div>
    </section>
  )
}
