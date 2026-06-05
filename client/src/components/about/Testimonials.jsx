export function Testimonials({ testimonials }) {
  return (
    <section className="bg-[#F5F1EE] px-5 py-16 text-[#1F1F1F] sm:py-20" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#E07A5F]">Client words</p>
          <h2 id="testimonials-title" className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            What Clients Say
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article className="rounded-[1.5rem] border border-[#E6DED8] bg-white p-6 shadow-[0_18px_60px_rgba(31,31,31,0.08)]" key={testimonial.quote}>
              <p className="text-sm tracking-[0.18em] text-[#D4A373]" aria-label="Five star review">★★★★★</p>
              <blockquote className="mt-5 text-lg font-medium leading-8 text-[#1F1F1F]">“{testimonial.quote}”</blockquote>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">{testimonial.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
