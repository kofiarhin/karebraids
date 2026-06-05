export function MeetKaren({ image }) {
  return (
    <section className="bg-[#F5F1EE] px-5 py-16 text-[#1F1F1F] sm:py-20 lg:py-24" aria-labelledby="meet-karen-title">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#E6DED8] bg-white/70 shadow-sm">
          <img className="aspect-[4/5] w-full object-cover" src={image.src} alt={image.alt} />
          <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-white/25 bg-[#14110f]/80 p-4 text-[#F5F1EE] shadow-2xl backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A373]">Founder-led care</p>
            <p className="mt-2 text-sm leading-6 text-[#f1e6dc]">Gentle tension, neat detail, and a calm appointment experience.</p>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#E07A5F]">Founder of KareBraids</p>
          <h2 id="meet-karen-title" className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#1F1F1F] sm:text-4xl lg:text-5xl">
            Meet Karen
          </h2>
          <div className="mt-6 space-y-5 text-base leading-8 text-[#4f4b47] sm:text-lg">
            <p>KareBraids was built on a simple belief: every client deserves beautiful braids and a comfortable experience.</p>
            <p>Over the years, Karen has worked with a variety of hair textures and styles, helping clients achieve looks that are both beautiful and protective.</p>
            <p>Whether you are booking knotless braids, box braids, twists, or cornrows, the focus is always on quality, comfort, and lasting results.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
