export function TrustStats({ stats }) {
  return (
    <section className="bg-[#F5F1EE] px-5 py-12 text-[#1F1F1F]" aria-label="KareBraids trust statistics">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article className="rounded-[1.25rem] border border-[#E6DED8] bg-white/70 p-6 text-center shadow-sm" key={`${stat.value}-${stat.label}`}>
            <strong className="block text-3xl font-semibold tracking-[-0.03em] text-[#2E5339] sm:text-4xl">{stat.value}</strong>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
