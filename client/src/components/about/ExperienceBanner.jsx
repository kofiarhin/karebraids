import { Button } from '../Button.jsx'

export function ExperienceBanner({ image }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#14110f] px-5 py-20 text-[#F5F1EE] sm:py-24" aria-labelledby="experience-title">
      <img className="absolute inset-0 -z-20 h-full w-full object-cover" src={image.src} alt={image.alt} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,8,7,0.9),rgba(10,8,7,0.72),rgba(10,8,7,0.9))]" />
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#D4A373]">More Than A Hairstyle</p>
        <h2 id="experience-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
          Every appointment is designed to leave you feeling confident, comfortable, and cared for.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#e8ddd3] sm:text-lg">
          From consultation to final styling, your experience matters just as much as the finished result.
        </p>
        <div className="mt-8 flex justify-center">
          <Button className="min-w-48 justify-center" to="/gallery" variant="secondary">View Gallery</Button>
        </div>
      </div>
    </section>
  )
}
