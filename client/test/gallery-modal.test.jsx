import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import { getGalleryItems, getGalleryServices } from '../src/data/services.js'

const mocks = vi.hoisted(() => ({
  useGalleryItems: vi.fn(),
  useGalleryServices: vi.fn(),
}))

vi.mock('../src/hooks/queries/useGalleryItems.js', () => mocks)

function renderGallery() {
  return render(
    <MemoryRouter initialEntries={['/gallery']}>
      <App />
    </MemoryRouter>,
  )
}

async function openFirstGalleryItem(user, items) {
  renderGallery()
  await user.click(screen.getByRole('button', {
    name: new RegExp(`^${items[0].title}, representative image 1$`, 'i'),
  }))
}

describe('gallery modal', () => {
  beforeEach(() => {
    mocks.useGalleryItems.mockReturnValue({ data: getGalleryItems(), isLoading: false, isError: false, refetch: vi.fn() })
    mocks.useGalleryServices.mockReturnValue({ data: getGalleryServices(), isLoading: false, isError: false, refetch: vi.fn() })
  })

  it('opens an image modal and closes with the close button', async () => {
    const user = userEvent.setup()
    const { container } = renderGallery()

    await user.click(screen.getByRole('button', { name: /^braiding inspiration, representative image 1$/i }))

    const dialog = screen.getByRole('dialog', { name: /braiding inspiration/i })
    const description = within(dialog).getByText(/representative styling image used for inspiration/i)

    expect(dialog).toHaveClass('dark-gallery-modal')
    expect(dialog).toHaveAttribute('data-gallery-modal-motion')
    expect(dialog).toHaveAttribute('aria-describedby', 'gallery-modal-description gallery-modal-position')
    expect(dialog.closest('.modal-backdrop')?.parentElement).toBe(document.body)
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

  it('cycles through gallery images with previous and next controls', async () => {
    const user = userEvent.setup()
    const items = getGalleryItems()
    await openFirstGalleryItem(user, items)

    await user.click(screen.getByRole('button', { name: /previous gallery image/i }))
    expect(screen.getByRole('dialog', { name: new RegExp(items.at(-1).title, 'i') })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /next gallery image/i }))
    expect(screen.getByRole('dialog', { name: new RegExp(items[0].title, 'i') })).toBeInTheDocument()

    for (let index = 1; index < items.length; index += 1) {
      await user.click(screen.getByRole('button', { name: /next gallery image/i }))
    }
    expect(screen.getByRole('dialog', { name: new RegExp(items.at(-1).title, 'i') })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /next gallery image/i }))
    expect(screen.getByRole('dialog', { name: new RegExp(items[0].title, 'i') })).toBeInTheDocument()
  })

  it('supports arrow-key navigation and exposes the current image position', async () => {
    const user = userEvent.setup()
    const items = getGalleryItems()
    await openFirstGalleryItem(user, items)
    expect(screen.getByText(`Image 1 of ${items.length}`)).toBeInTheDocument()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('dialog', { name: new RegExp(items.at(-1).title, 'i') })).toBeInTheDocument()
    expect(screen.getByText(`Image ${items.length} of ${items.length}`)).toBeInTheDocument()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('dialog', { name: new RegExp(items[0].title, 'i') })).toBeInTheDocument()
  })

  it('hides previous and next controls when only one image is available', async () => {
    const user = userEvent.setup()
    const item = getGalleryItems()[0]
    mocks.useGalleryItems.mockReturnValue({ data: [item], isLoading: false, isError: false, refetch: vi.fn() })
    renderGallery()

    await user.click(screen.getByRole('button', { name: new RegExp(`^${item.title}, representative image 1$`, 'i') }))

    expect(screen.queryByRole('button', { name: /previous gallery image/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /next gallery image/i })).not.toBeInTheDocument()
    expect(screen.getByText('Image 1 of 1')).toBeInTheDocument()
  })
})
