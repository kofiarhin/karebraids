import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'

const { mockGalleryResponse, mockServices, mockState, useGallery, useGalleryItems, useGalleryServices } = vi.hoisted(() => {
  const mockServices = [
    { id: 'knotless-braids', title: 'Knotless Braids', description: 'Light braid finish.', startingPrice: 80, currency: 'GBP', duration: { minHours: 4, maxHours: 6 }, featured: true, previewImage: { id: 'knotless-preview', title: 'Knotless Preview', description: 'Preview', image: 'https://example.com/knotless.jpg', aspect: 'medium' } },
    { id: 'boho-knotless-braids', title: 'Boho Knotless Braids', description: 'Soft boho finish.', startingPrice: 95, currency: 'GBP', duration: { minHours: 5, maxHours: 7 }, featured: true, previewImage: { id: 'boho-preview', title: 'Boho Preview', description: 'Preview', image: 'https://example.com/boho.jpg', aspect: 'wide' } },
  ]
  const allItems = [
    { id: 'knotless-one', title: 'Knotless One', description: 'Light knotless braids.', image: 'https://example.com/1.jpg', aspect: 'medium', serviceId: 'knotless-braids', serviceTitle: 'Knotless Braids' },
    { id: 'boho-one', title: 'Boho One', description: 'Soft boho braids.', image: 'https://example.com/2.jpg', aspect: 'wide', serviceId: 'boho-knotless-braids', serviceTitle: 'Boho Knotless Braids' },
  ]
  const mockGalleryResponse = {
    all: { galleryItems: allItems, selectedService: null, reviews: [] },
    knotless: { galleryItems: [allItems[0]], selectedService: mockServices[0], reviews: [{ id: 'review-one', name: 'Ama K.', rating: 5, comment: 'Neat and light.' }] },
  }
  const mockState = { mode: 'success' }
  const useGallery = vi.fn(({ service } = {}) => ({
    data: service === 'knotless-braids' ? mockGalleryResponse.knotless : mockGalleryResponse.all,
    isLoading: mockState.mode === 'loading',
    isError: mockState.mode === 'error',
    refetch: vi.fn(),
  }))
  const useGalleryItems = vi.fn(({ limit } = {}) => ({
    data: limit ? allItems.slice(0, limit) : allItems,
    isLoading: mockState.mode === 'loading',
    isError: mockState.mode === 'error',
  }))
  const useGalleryServices = vi.fn(() => ({
    data: mockServices,
    isLoading: mockState.mode === 'loading',
    isError: mockState.mode === 'error',
  }))
  return { mockGalleryResponse, mockServices, mockState, useGallery, useGalleryItems, useGalleryServices }
})

vi.mock('../src/hooks/queries/useGalleryItems.js', () => ({ useGallery, useGalleryItems, useGalleryServices }))

function renderRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('service-driven gallery surfaces', () => {
  beforeEach(() => {
    mockState.mode = 'success'
    useGallery.mockClear()
    useGalleryItems.mockClear()
    useGalleryServices.mockClear()
  })

  it('loads all gallery images by default without service intro or reviews', () => {
    renderRoute('/gallery')

    expect(useGallery).toHaveBeenCalledWith({ service: null })
    expect(within(screen.getByRole('region', { name: /gallery image wall/i })).getAllByRole('button')).toHaveLength(mockGalleryResponse.all.galleryItems.length)
    expect(screen.queryByRole('heading', { name: /knotless braids/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: /client reviews/i })).not.toBeInTheDocument()
  })

  it('requests backend-filtered service gallery and shows service intro and reviews', () => {
    renderRoute('/gallery?service=knotless-braids')

    expect(useGallery).toHaveBeenCalledWith({ service: 'knotless-braids' })
    expect(screen.getByRole('heading', { name: /knotless braids/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /client reviews/i })).toBeInTheDocument()
    expect(screen.getByText(/ama k\./i)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /boho one/i })).not.toBeInTheDocument()
  })

  it('routes service preview cards to service gallery filters using backend previews', () => {
    renderRoute('/')

    expect(useGalleryServices).toHaveBeenCalled()
    const serviceLinks = screen.getAllByRole('link', { name: /browse knotless braids gallery/i })
    expect(serviceLinks[0]).toHaveAttribute('href', '/gallery?service=knotless-braids')
    expect(screen.getAllByRole('img', { name: /knotless braids preview/i })[0]).toHaveAttribute('src', mockServices[0].previewImage.image)
  })
})
