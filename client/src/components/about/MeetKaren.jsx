export function MeetKaren({ profile }) {
  const { biography, image, statement, statementIsPlaceholder } = profile

  return (
    <section className="bg-[#F5F1EE] px-5 py-16 text-[#1F1F1F] sm:py-20 lg:py-24" aria-labelledby="meet-karen-title">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <figure className="relative overflow-hidden rounded-[2rem] border border-[#E6DED8] bg-white/70 shadow-sm">
          <img className="aspect-[4/5] w-full object-cover" src={image.src} alt={image.alt} />
          <figcaption className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/25 bg-[#14110f]/80 p-4 text-[#F5F1EE] shadow-2xl backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A373]">
              {image.isPlaceholder ? 'Karen profile photo' : 'Founder-led care'}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#f1e6dc]">
              {image.isPlaceholder ? 'Final photo pending before launch.' : 'Gentle tension, neat detail, and a calm appointment experience.'}
            </p>
          </figcaption>
        </figure>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#E07A5F]">Founder of KareBraids</p>
          <h2 id="meet-karen-title" className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#1F1F1F] sm:text-4xl lg:text-5xl">
            Meet Karen
          </h2>
          <div className="mt-6 border-l-2 border-[#D4A373] pl-5 sm:pl-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#E07A5F]">A note from Karen</p>
            <blockquote className="mt-3 text-xl font-medium leading-8 text-[#2f2b28] sm:text-2xl sm:leading-9">
              “{statement}”
            </blockquote>
            {statementIsPlaceholder ? (
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#756d67]">
                Final photo and statement pending
              </p>
            ) : null}
          </div>
          <div className="mt-7 space-y-5 text-base leading-8 text-[#4f4b47] sm:text-lg">
            {biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}
