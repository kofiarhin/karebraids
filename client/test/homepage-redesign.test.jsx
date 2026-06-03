import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import { getFeaturedServices } from '../src/data/services.js'

const { useGalleryItems, useGalleryServices } = vi.hoisted(() => {
  const galleryItems = Array.from({ length: 5 }, (_, index) => ({ id: `gallery-${index}`, title: `Gallery ${index}`, description: 'Client braid look.', image: `https://example.com/${index}.jpg`, aspect: 'medium', serviceId: 'knotless-braids', serviceTitle: 'Knotless Braids' }))
  const services = Array.from({ length: 8 }, (_, index) => ({ id: index === 0 ? 'knotless-braids' : `service-${index}`, title: index === 0 ? 'Knotless Braids' : `Service ${index}`, description: 'Service description.', startingPrice: 80 + index, currency: 'GBP', duration: { minHours: 2, maxHours: 5 }, featured: index < 4, previewImage: { id: `service-${index}-preview`, image: `https://example.com/service-${index}.jpg`, title: 'Preview', description: 'Preview', aspect: 'medium' } }))
  return {
    useGalleryItems: vi.fn(({ limit } = {}) => ({ data: limit ? galleryItems.slice(0, limit) : galleryItems, isLoading: false, isError: false })),
    useGalleryServices: vi.fn(() => ({ data: services, isLoading: false, isError: false })),
  }
})
vi.mock('../src/hooks/queries/useGalleryItems.js', () => ({ useGalleryItems, useGalleryServices }))

function renderHome() { return render(<MemoryRouter><App /></MemoryRouter>) }

describe('homepage below-hero redesign', () => {
  it('renders featured services from the shared services source', () => {
    renderHome()
    const featuredSection = document.querySelector('.featured-services-section')

    getFeaturedServices().forEach((service) => {
      expect(within(featuredSection).getByRole('heading', { name: service.name })).toBeInTheDocument()
    })
  })

  it('renders the requested conversion sections in order with six style links and four gallery items', () => {
    const { container } = renderHome()
    const sections = [...container.querySelectorAll('.luxury-homepage > section')]
    const classes = sections.flatMap((section) => [...section.classList])

    expect(classes).toEqual(expect.arrayContaining(['browse-style-section', 'featured-services-section', 'gallery-feature-section', 'client-love-section', 'why-choose-section', 'booking-steps-section', 'booking-cta-section']))
    expect(classes.indexOf('browse-style-section')).toBeLessThan(classes.indexOf('featured-services-section'))
    expect(classes.indexOf('gallery-feature-section')).toBeLessThan(classes.indexOf('client-love-section'))
    expect(classes.indexOf('client-love-section')).toBeLessThan(classes.indexOf('why-choose-section'))
    expect(classes.indexOf('why-choose-section')).toBeLessThan(classes.indexOf('booking-steps-section'))
    expect(container.querySelectorAll('.browse-style-card')).toHaveLength(8)
    expect(container.querySelectorAll('.gallery-feature-card')).toHaveLength(4)
    expect(container.querySelectorAll('.booking-step-card')).toHaveLength(4)
  })

  it('uses separate exploration and service-learning destinations', () => {
    const { container } = renderHome()
    expect(within(container.querySelector('.browse-style-section')).getByRole('link', { name: /knotless braids/i })).toHaveAttribute('href', '/gallery?service=knotless-braids')
    expect(within(container.querySelector('.featured-services-section')).getByRole('link', { name: /browse knotless braids gallery/i })).toHaveAttribute('href', '/gallery?service=knotless-braids')
  })

  it('renders eight testimonials and moves with the next control', async () => {
    const user = userEvent.setup()
    const { container } = renderHome()
    expect(container.querySelectorAll('.testimonial-indicator')).toHaveLength(8)
    await user.click(screen.getByRole('button', { name: /next testimonial/i }))
    expect(screen.getByText('02 / 08')).toBeInTheDocument()
  })


  it('supports a mobile swipe gesture in the testimonial carousel', () => {
    const { container } = renderHome()
    const card = container.querySelector('.testimonial-card')
    fireEvent.touchStart(card, { touches: [{ clientX: 160 }] })
    fireEvent.touchEnd(card, { changedTouches: [{ clientX: 70 }] })
    expect(screen.getByText('02 / 08')).toBeInTheDocument()
  })
})
