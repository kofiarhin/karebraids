import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'

const { galleryItems, mockState, useGalleryItems } = vi.hoisted(() => {
  const galleryItems = [
  { id: 'knotless-one', title: 'Knotless One', description: 'Light knotless braids.', image: 'https://example.com/1.jpg', aspect: 'medium', style: 'knotless-braids' },
  { id: 'boho-one', title: 'Boho One', description: 'Soft boho braids.', image: 'https://example.com/2.jpg', aspect: 'wide', style: 'boho-braids' },
  { id: 'knotless-two', title: 'Knotless Two', description: 'Long knotless braids.', image: 'https://example.com/3.jpg', aspect: 'tall', style: 'knotless-braids' },
  { id: 'cornrows-one', title: 'Cornrows One', description: 'Clean cornrows.', image: 'https://example.com/4.jpg', aspect: 'feature', style: 'cornrows' },
  { id: 'kids-one', title: 'Kids One', description: 'Comfortable kids braids.', image: 'https://example.com/5.jpg', aspect: 'compact', style: 'kids-braids' },
  ]
  const mockState = { mode: 'success' }
  const useGalleryItems = vi.fn((options = {}) => ({
    data: mockState.mode === 'empty' ? [] : options.limit ? galleryItems.slice(0, options.limit) : galleryItems,
    isLoading: mockState.mode === 'loading',
    isError: mockState.mode === 'error',
    refetch: vi.fn(),
  }))
  return { galleryItems, mockState, useGalleryItems }
})

vi.mock('../src/hooks/queries/useGalleryItems.js', () => ({ useGalleryItems }))

function renderRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('API-backed gallery surfaces', () => {
  beforeEach(() => { mockState.mode = 'success' })
  it('loads all images on the gallery page and filters a known style query', () => {
    renderRoute('/gallery?style=knotless-braids')

    expect(useGalleryItems).toHaveBeenCalledWith()
    expect(screen.getByRole('region', { name: /gallery image wall/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /knotless/i })).toHaveLength(2)
    expect(screen.queryByRole('button', { name: /boho one/i })).not.toBeInTheDocument()
  })

  it('falls back to the complete gallery for an unknown style query', () => {
    renderRoute('/gallery?style=unknown-style')

    expect(within(screen.getByRole('region', { name: /gallery image wall/i })).getAllByRole('button')).toHaveLength(galleryItems.length)
  })

  it('loads exactly four API-backed items for the homepage gallery preview', () => {
    const { container } = renderRoute('/')
    const preview = container.querySelector('.gallery-feature-section')

    expect(useGalleryItems).toHaveBeenCalledWith({ limit: 4 })
    expect(within(preview).getAllByRole('link')).toHaveLength(5)
    expect(preview.querySelectorAll('.gallery-feature-card')).toHaveLength(4)
  })


  it('renders safe error and empty states for gallery API results', () => {
    mockState.mode = 'error'
    const { unmount } = renderRoute('/gallery')
    expect(screen.getByRole('alert')).toHaveTextContent(/could not load the gallery/i)
    unmount()
    mockState.mode = 'empty'
    renderRoute('/gallery')
    expect(screen.getByRole('status')).toHaveTextContent(/new client looks are being prepared/i)
  })
})
