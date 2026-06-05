function SpecialtyCard({ specialty }) {
  return (
    <article className="group relative min-h-64 overflow-hidden rounded-[1.5rem] border border-[#2d251f] bg-[#171310] shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
      {specialty.image ? (
        <img className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" src={specialty.image} alt={specialty.alt} />
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,15,0.22),rgba(20,17,15,0.9))]" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A373]">Specialty</p>
        <h3 className="mt-2 text-2xl font-semibold text-white">{specialty.title}</h3>
      </div>
    </article>
  )
}

export function SpecialtiesGrid({ specialties }) {
  return (
    <section className="bg-[#14110f] px-5 py-16 text-[#F5F1EE] sm:py-20" aria-labelledby="specialties-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#D4A373]">Signature services</p>
            <h2 id="specialties-title" className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
              Braiding Specialties
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[#cfc1b5]">Protective styles shaped with precision, comfort, and a finish that suits your day-to-day life.</p>
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
