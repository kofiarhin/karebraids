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
    mocks.useGalleryServices.mockReturnValue({ data: [], isLoading: false, isError: false })
    mocks.useGalleryItems.mockReturnValue({ data: [item], isLoading: false, isError: false })
  })

  it('labels curated images as representative inspiration', () => {
    render(
      <MemoryRouter initialEntries={['/gallery']}>
        <Gallery />
      </MemoryRouter>,
    )

    expect(screen.getByText('Style Inspiration Gallery')).toBeInTheDocument()
    expect(screen.getByText('Browse real style inspiration before booking. Final results are shaped by your chosen service, hair type, length, and consultation.')).toBeInTheDocument()
    expect(screen.getByText('Representative image')).toBeInTheDocument()
    expect(screen.getByAltText('Representative protective styling image')).toHaveAttribute('src', item.src)
    expect(screen.queryByText(/Showing Knotless Braids/i)).not.toBeInTheDocument()
  })

  it('renders the configured gallery image in cards and the modal', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter initialEntries={['/gallery']}>
        <Gallery />
      </MemoryRouter>,
    )

    const cardImage = screen.getByAltText('Representative protective styling image')
    expect(cardImage).toHaveAttribute('src', imageLibrary[0].src)

    await user.click(screen.getByRole('button', { name: /braiding inspiration, representative image 1/i }))
    const modalImage = screen.getByRole('dialog').querySelector('img')
    expect(modalImage).toHaveAttribute('src', imageLibrary[0].src)
  })
})
