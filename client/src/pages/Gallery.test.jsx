import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { imageLibrary } from '../data/imageLibrary.js'
import { Gallery } from './Gallery.jsx'

const mocks = vi.hoisted(() => ({
  useGalleryItems: vi.fn(),
  useGalleryServices: vi.fn(),
}))

vi.mock('../hooks/queries/useGalleryItems.js', () => mocks)

const service = {
  id: 'knotless-braids',
  slug: 'knotless-braids',
  name: 'Knotless Braids',
  shortDescription: 'Lightweight braids.',
  currency: 'GBP',
  startingPrice: 85,
  durationLabel: '4-6 hours',
}

const item = {
  id: 'curated-visual-001',
  src: imageLibrary[0].src,
  alt: 'Representative protective styling image',
  title: 'Braiding Inspiration',
  description: 'Representative styling image used for inspiration.',
  aspect: 'feature',
}

describe('Gallery representative image semantics', () => {
  beforeEach(() => {
    mocks.useGalleryServices.mockReturnValue({ data: [service], isLoading: false, isError: false })
    mocks.useGalleryItems.mockReturnValue({ data: [item], isLoading: false, isError: false })
  })

  it('labels curated images as inspiration and keeps a selected service as context only', () => {
    render(<MemoryRouter initialEntries={['/gallery?service=knotless-braids']}><Gallery /></MemoryRouter>)

    expect(screen.getByText('Style Inspiration Gallery')).toBeInTheDocument()
    expect(screen.getByText('Representative styling images used for inspiration. Final results depend on your chosen service, hair type, length, and consultation.')).toBeInTheDocument()
    expect(screen.getByText('Viewing inspiration while considering Knotless Braids')).toBeInTheDocument()
    expect(screen.getByText('Representative image')).toBeInTheDocument()
    expect(screen.getByAltText('Knotless Braids styling inspiration — representative image')).toHaveAttribute('src', item.src)
    expect(screen.queryByText('Showing Knotless Braids')).not.toBeInTheDocument()
  })
  it('never renders a remote API image in gallery cards or the modal', async () => {
    const user = userEvent.setup()
    mocks.useGalleryItems.mockReturnValue({
      data: [{ ...item, src: 'https://images.pexels.com/remote.jpg', image: 'https://images.pexels.com/remote.jpg' }],
      isLoading: false,
      isError: false,
    })

    render(<MemoryRouter initialEntries={['/gallery?service=knotless-braids']}><Gallery /></MemoryRouter>)

    const cardImage = screen.getByAltText('Knotless Braids styling inspiration — representative image')
    expect(cardImage).toHaveAttribute('src', imageLibrary[0].src)
    expect(cardImage.getAttribute('src')).toMatch(/^\/images\//)

    await user.click(screen.getByRole('button', { name: /representative image 1$/i }))
    const modalImage = screen.getByRole('dialog').querySelector('img')
    expect(modalImage).toHaveAttribute('src', imageLibrary[0].src)
    expect(modalImage.getAttribute('src')).toMatch(/^\/images\//)
  })
})
