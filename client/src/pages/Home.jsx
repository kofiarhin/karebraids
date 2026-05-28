import { BookingCTA } from '../components/home/BookingCTA.jsx'
import { GalleryPreview } from '../components/home/GalleryPreview.jsx'
import { Hero } from '../components/home/Hero.jsx'
import { SectionHeading } from '../components/home/SectionHeading.jsx'
import { ServiceCard } from '../components/home/ServiceCard.jsx'
import { TestimonialSection } from '../components/home/TestimonialSection.jsx'
import { TrustStrip } from '../components/home/TrustStrip.jsx'
import { WhyChoose } from '../components/home/WhyChoose.jsx'
import { signatureServices } from '../constants/homepage.js'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll.js'

export function Home() {
  useRevealOnScroll()

  return (
    <div className="luxury-homepage">
      <Hero />
      <TrustStrip />
      <section className="signature-section" id="signature-styles" aria-labelledby="signature-title">
        <SectionHeading
          align="split"
          eyebrow="Signature Styles"
          heading="Styles that protect. Finishes that last."
          link={{ href: '/booking', label: 'View All Services' }}
        />
        <div className="signature-grid">
          {signatureServices.map((service, index) => (
            <ServiceCard index={index} key={service.title} service={service} />
          ))}
        </div>
      </section>
      <WhyChoose />
      <GalleryPreview />
      <TestimonialSection />
      <BookingCTA />
    </div>
  )
}
