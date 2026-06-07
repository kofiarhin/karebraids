import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import * as serviceService from '../src/services/serviceService.js'

vi.mock('../src/services/serviceService.js', () => ({ getService: vi.fn(), getServices: vi.fn() }))

const services = [
  {
    id: 'knotless-braids', slug: 'knotless-braids', name: 'Knotless Braids', title: 'Knotless Braids',
    description: 'Lightweight knotless braids.', shortDescription: 'Lightweight knotless braids.', startingPrice: 80,
    currency: 'GBP', durationLabel: '4–6 hours', bookingEnabled: true, galleryEnabled: true, status: 'available',
    primaryImage: { image: 'https://example.com/knotless.jpg', alt: 'Knotless braids' },
    galleryImages: [{ id: 'knotless-1', image: 'https://example.com/knotless-1.jpg', alt: 'Knotless example' }],
    reviews: [{ id: 'review-1', name: 'Ama', rating: 5, comment: 'Beautiful.' }],
  },
  {
    id: 'boho-knotless-braids', slug: 'boho-braids', name: 'Boho Braids', title: 'Boho Braids',
    description: 'Soft boho braids.', shortDescription: 'Soft boho braids.', startingPrice: 95, currency: 'GBP',
    durationLabel: '5–7 hours', bookingEnabled: true, galleryEnabled: true, status: 'available',
    primaryImage: { image: 'https://example.com/boho.jpg', alt: 'Boho braids' }, galleryImages: [], reviews: [],
  },
  {
    id: 'stitch-braids', slug: 'stitch-braids', name: 'Stitch Braids', title: 'Stitch Braids',
    description: 'Defined stitch braids.', shortDescription: 'Defined stitch braids.', startingPrice: 45, currency: 'GBP',
    durationLabel: '2–4 hours', bookingEnabled: true, galleryEnabled: true, status: 'available',
    primaryImage: { image: 'https://example.com/stitch.jpg', alt: 'Stitch braids' }, galleryImages: [], reviews: [],
  },
]

function renderRoute(route) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={queryClient}><MemoryRouter initialEntries={[route]}><App /></MemoryRouter></QueryClientProvider>)
}

describe('service detail architecture', () => {
  beforeEach(() => {
    serviceService.getServices.mockResolvedValue(services)
    serviceService.getService.mockImplementation(async (slug) => {
      const service = services.find((item) => item.id === slug || item.slug === slug)
      if (!service) throw { response: { status: 404 } }
      return service
    })
  })

  it('renders a canonical service detail page with reusable sections and preselected booking CTA', async () => {
    renderRoute('/services/knotless-braids')
    expect(await screen.findByRole('heading', { level: 1, name: /knotless braids/i })).toBeInTheDocument()
    expect(screen.getByText(/hair included/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /care tips/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /client reviews/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /book this style/i })).toHaveLength(2)
    screen.getAllByRole('link', { name: /book this style/i }).forEach((link) => expect(link).toHaveAttribute('href', '/booking?service=knotless-braids'))
  })

  it('redirects a valid legacy style path to the canonical service detail page', async () => {
    renderRoute('/styles/boho-braids')
    expect(await screen.findByRole('heading', { level: 1, name: /boho braids/i })).toBeInTheDocument()
  })

  it('redirects an unknown service detail slug to the services listing', async () => {
    renderRoute('/services/not-a-style')
    expect(await screen.findByRole('heading', { level: 1, name: /braiding services tailored to your style/i })).toBeInTheDocument()
  })

  it('preselects a valid booking service query and preserves the booking wizard', async () => {
    renderRoute('/booking?service=stitch-braids')
    expect(await screen.findByText('Stitch Braids', { selector: 'dd' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /select date/i })).toBeInTheDocument()
  })
})
