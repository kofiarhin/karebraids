function SpecialtyCard({ specialty }) {
  const hasImage = Boolean(specialty.image)

  return (
    <article className="group relative min-h-64 overflow-hidden rounded-[1.5rem] border border-[#E6DED8] bg-white/70 shadow-sm">
      {hasImage ? (
        <>
          <img className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" src={specialty.image} alt={specialty.alt} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,15,0.18),rgba(20,17,15,0.82))]" />
        </>
      ) : null}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className={hasImage ? 'text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A373]' : 'text-xs font-semibold uppercase tracking-[0.24em] text-[#E07A5F]'}>Specialty</p>
        <h3 className={hasImage ? 'mt-2 text-2xl font-semibold text-white' : 'mt-2 text-2xl font-semibold text-[#1F1F1F]'}>{specialty.title}</h3>
      </div>
    </article>
  )
}

export function SpecialtiesGrid({ specialties }) {
  return (
    <section className="bg-[#F5F1EE] px-5 py-16 text-[#1F1F1F] sm:py-20" aria-labelledby="specialties-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#E07A5F]">Signature services</p>
            <h2 id="specialties-title" className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#1F1F1F] sm:text-4xl lg:text-5xl">
              Braiding Specialties
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#6B6B6B]">Protective styles shaped with precision, comfort, and a finish that suits your day-to-day life.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((specialty) => (
            <SpecialtyCard key={specialty.title} specialty={specialty} />
          ))}
        </div>
      </div>
    </section>
  )
}
