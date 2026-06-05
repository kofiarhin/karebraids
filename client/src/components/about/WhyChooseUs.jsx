export function WhyChooseUs({ cards }) {
  return (
    <section className="bg-[#fffaf6] px-5 py-16 text-[#1F1F1F] sm:py-20" aria-labelledby="why-choose-title">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#E07A5F]">Trusted braiding care</p>
          <h2 id="why-choose-title" className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            Why Clients Choose KareBraids
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <article className="rounded-[1.5rem] border border-[#E6DED8] bg-[#F5F1EE] p-6 shadow-[0_18px_50px_rgba(31,31,31,0.08)]" key={card.title}>
              <div className="mb-5 h-1.5 w-14 rounded-full bg-[#D4A373]" />
              <h3 className="text-xl font-semibold text-[#1F1F1F]">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#6B6B6B]">{card.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
