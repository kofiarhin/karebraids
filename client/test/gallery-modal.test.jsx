import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'

vi.mock('../src/hooks/queries/useGalleryItems.js', async () => {
  const { getGalleryItems, getGalleryServices } = await import('../src/data/services.js')
  return {
    useGalleryItems: () => ({ data: getGalleryItems(), isLoading: false, isError: false, refetch: vi.fn() }),
    useGalleryServices: () => ({ data: getGalleryServices(), isLoading: false, isError: false, refetch: vi.fn() }),
  }
})

function renderGallery() {
  return render(
    <MemoryRouter initialEntries={['/gallery']}>
      <App />
    </MemoryRouter>,
  )
}

describe('gallery modal', () => {
  it('opens an image modal and closes with the close button', async () => {
    const user = userEvent.setup()
    const { container } = renderGallery()

    await user.click(screen.getByRole('button', { name: /^braiding inspiration, representative image 1$/i }))

    const dialog = screen.getByRole('dialog', { name: /braiding inspiration/i })
    const description = within(dialog).getByText(/representative styling image used for inspiration/i)

    expect(dialog).toHaveClass('dark-gallery-modal')
    expect(dialog).toHaveAttribute('data-gallery-modal-motion')
    expect(dialog).toHaveAttribute('aria-describedby', 'gallery-modal-description')
    expect(description).toHaveAttribute('id', 'gallery-modal-description')
    expect(container.querySelector('[data-stagger-reveal].gallery-grid')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-image-reveal]').length).toBeGreaterThan(0)
    expect(container.querySelectorAll('[data-parallax-layer]').length).toBeGreaterThan(0)
    expect(screen.getByRole('button', { name: /close gallery image/i })).toHaveFocus()

    await user.click(screen.getByRole('button', { name: /close gallery image/i }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes with Escape and returns focus to the gallery item', async () => {
    const user = userEvent.setup()
    renderGallery()
    const galleryItem = screen.getByRole('button', { name: /^protective styling, representative image 3$/i })

    await user.click(galleryItem)
    expect(screen.getByRole('dialog', { name: /protective styling/i })).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => expect(galleryItem).toHaveFocus())
  })

  it('closes from a backdrop click and returns focus to the gallery item', async () => {
    const user = userEvent.setup()
    renderGallery()
    const galleryItem = screen.getByRole('button', { name: /^styling detail, representative image 2$/i })

    await user.click(galleryItem)
    expect(screen.getByRole('dialog', { name: /styling detail/i })).toBeInTheDocument()

    await user.click(document.querySelector('.modal-backdrop'))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => expect(galleryItem).toHaveFocus())
  })

  it('opens a newly added gallery image from a concise card label', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByRole('button', { name: /^clean finish, representative image 4$/i }))

    expect(screen.getByRole('dialog', { name: /clean finish/i })).toBeInTheDocument()
  })
})
