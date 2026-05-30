import { BookingCTA } from '../components/home/BookingCTA.jsx'
import { GalleryFeature } from '../components/home/GalleryFeature.jsx'
import { Hero } from '../components/home/Hero.jsx'
import { TestimonialSection } from '../components/home/TestimonialSection.jsx'
import { TrustStrip } from '../components/home/TrustStrip.jsx'
import { WhyChoose } from '../components/home/WhyChoose.jsx'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js'

export function Home() {
  useRevealOnScroll()

  return (
    <div className="luxury-homepage">
      <Hero />
      <TrustStrip />
      <GalleryFeature />
      <WhyChoose />
      <TestimonialSection />
      <BookingCTA />
    </div>
  )
}
