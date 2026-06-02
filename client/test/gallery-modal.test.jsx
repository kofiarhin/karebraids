import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'

vi.mock('../src/hooks/queries/useGalleryItems.js', async () => {
  const { galleryItems } = await import('../src/constants/content.js')
  return { useGallery: () => ({ data: { galleryItems, selectedService: null, reviews: [] }, isLoading: false, isError: false, refetch: vi.fn() }) }
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
    renderGallery()

    await user.click(screen.getByRole('button', { name: /copper knotless braids/i }))

    const dialog = screen.getByRole('dialog', { name: /copper knotless braids/i })
    const description = within(dialog).getByText(/long knotless braids with warm copper tone/i)

    expect(dialog).toHaveClass('dark-gallery-modal')
    expect(dialog).toHaveAttribute('aria-describedby', 'gallery-modal-description')
    expect(description).toHaveAttribute('id', 'gallery-modal-description')
    expect(screen.getByRole('button', { name: /close gallery image/i })).toHaveFocus()

    await user.click(screen.getByRole('button', { name: /close gallery image/i }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes with Escape and returns focus to the gallery item', async () => {
    const user = userEvent.setup()
    renderGallery()
    const galleryItem = screen.getByRole('button', { name: /precision cornrows/i })

    await user.click(galleryItem)
    expect(screen.getByRole('dialog', { name: /precision cornrows/i })).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => expect(galleryItem).toHaveFocus())
  })

  it('closes from a backdrop click and returns focus to the gallery item', async () => {
    const user = userEvent.setup()
    renderGallery()
    const galleryItem = screen.getByRole('button', { name: /handcrafted detail/i })

    await user.click(galleryItem)
    expect(screen.getByRole('dialog', { name: /handcrafted detail/i })).toBeInTheDocument()

    await user.click(document.querySelector('.modal-backdrop'))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await waitFor(() => expect(galleryItem).toHaveFocus())
  })

  it('opens a newly added gallery image from a concise card label', async () => {
    const user = userEvent.setup()
    renderGallery()

    await user.click(screen.getByRole('button', { name: 'Outdoor Braid Profile' }))

    expect(screen.getByRole('dialog', { name: /outdoor braid profile/i })).toBeInTheDocument()
  })
})
