import { AboutCTA } from '../components/about/AboutCTA.jsx'
import { AboutHero } from '../components/about/AboutHero.jsx'
import { ExperienceBanner } from '../components/about/ExperienceBanner.jsx'
import { MeetKaren } from '../components/about/MeetKaren.jsx'
import { SpecialtiesGrid } from '../components/about/SpecialtiesGrid.jsx'
import { Testimonials } from '../components/about/Testimonials.jsx'
import { TrustStats } from '../components/about/TrustStats.jsx'
import { WhyChooseUs } from '../components/about/WhyChooseUs.jsx'
import { aboutImages, specialties, testimonials, trustStats, whyChooseCards } from '../data/aboutPageData.js'

export function About() {
  return (
    <div className="bg-[#F5F1EE] text-[#1F1F1F]">
      <AboutHero image={aboutImages.hero} />
      <MeetKaren image={aboutImages.founder} />
      <WhyChooseUs cards={whyChooseCards} />
      <ExperienceBanner image={aboutImages.experience} />
      <SpecialtiesGrid specialties={specialties} />
      <Testimonials testimonials={testimonials} />
      <TrustStats stats={trustStats} />
      <AboutCTA image={aboutImages.experience} />
    </div>
  )
}
