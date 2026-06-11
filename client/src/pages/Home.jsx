import { BookingSteps } from '../components/home/BookingSteps.jsx'
import { BrowseByStyle } from '../components/home/BrowseByStyle.jsx'
import { BookingCTA } from '../components/home/BookingCTA.jsx'
import { FeaturedServices } from '../components/home/FeaturedServices.jsx'
import { GalleryFeature } from '../components/home/GalleryFeature.jsx'
import { Hero } from '../components/home/Hero.jsx'
import { TestimonialSection } from '../components/home/TestimonialSection.jsx'
import { WhyChoose } from '../components/home/WhyChoose.jsx'

export function Home() {
  return (
    <div className="luxury-homepage">
      <Hero />
      <BrowseByStyle />
      <FeaturedServices />
      <GalleryFeature />
      <TestimonialSection />
      <WhyChoose />
      <BookingSteps />
      <BookingCTA />
    </div>
  )
}
