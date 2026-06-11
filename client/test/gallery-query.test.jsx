import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import { getGalleryItems, getGalleryServices } from '../src/data/services.js'
import * as galleryService from '../src/services/galleryService.js'

vi.mock('../src/services/galleryService.js', () => ({
  getGallery: vi.fn(),
  getGalleryItems: vi.fn(),
  getGalleryServices: vi.fn(),
}))

function LocationProbe() {
  const location = useLocation()
  return <span data-testid="location-probe">{location.pathname}{location.search}</span>
}

function renderRoute(route) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <App />
        <LocationProbe />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

async function selectFirstGalleryService(user) {
  const service = getGalleryServices()[0]
  renderRoute('/gallery')
  await screen.findByRole('option', { name: service.name })
  await user.selectOptions(screen.getByLabelText(/filter gallery by service/i), service.id)
  return service
}

describe('service-driven gallery surfaces', () => {
  const filteredGalleryItems = getGalleryItems().slice(0, 2)

  beforeEach(() => {
    galleryService.getGalleryServices.mockResolvedValue(getGalleryServices())
    galleryService.getGalleryItems.mockImplementation(({ service } = {}) =>
      Promise.resolve(service ? filteredGalleryItems : getGalleryItems()),
    )
  })

  it('renders the gallery service dropdown with all services and one option per gallery-enabled service', async () => {
    renderRoute('/gallery')

    const filter = await screen.findByLabelText(/filter gallery by service/i)
    expect(filter).toBeInTheDocument()
    expect(within(filter).getByRole('option', { name: /all services/i })).toHaveValue('all')
    await screen.findByRole('option', { name: getGalleryServices()[0].name })
    getGalleryServices().forEach((service) => {
      expect(within(filter).getByRole('option', { name: service.name })).toHaveValue(service.id)
    })
  })

  it('loads all gallery images by default without service intro', async () => {
    renderRoute('/gallery')

    await waitFor(() => expect(galleryService.getGalleryItems).toHaveBeenCalledWith({ limit: undefined, service: null }))
    expect(within(await screen.findByRole('region', { name: /gallery image wall/i })).getAllByRole('button')).toHaveLength(getGalleryItems().length)
    expect(screen.queryByText(/selected service/i)).not.toBeInTheDocument()
  })

  it('changes the URL and API query when a service is selected', async () => {
    const user = userEvent.setup()
    const service = await selectFirstGalleryService(user)

    expect(screen.getByTestId('location-probe')).toHaveTextContent(`/gallery?service=${service.id}`)
    await waitFor(() => expect(galleryService.getGalleryItems).toHaveBeenCalledWith({ limit: undefined, service: service.id }))
    expect(screen.getByRole('heading', { name: service.name })).toBeInTheDocument()
    expect(within(await screen.findByRole('region', { name: /gallery image wall/i })).getAllByRole('button')).toHaveLength(filteredGalleryItems.length)
    filteredGalleryItems.forEach((item, index) => expect(screen.getByRole('button', { name: new RegExp(`^${item.title}, representative image ${index + 1}$`, 'i') })).toBeInTheDocument())
  })

  it('clears the URL when all services is selected', async () => {
    const user = userEvent.setup()
    renderRoute('/gallery?service=knotless-braids')

    await user.selectOptions(await screen.findByLabelText(/filter gallery by service/i), 'all')

    expect(screen.getByTestId('location-probe')).toHaveTextContent('/gallery')
    await waitFor(() => expect(galleryService.getGalleryItems).toHaveBeenCalledWith({ limit: undefined, service: null }))
  })

  it('keeps pages from importing service lists from constants/content.js', () => {
    const pageFiles = readdirSync('src/pages').filter((file) => file.endsWith('.jsx'))

    pageFiles.forEach((file) => {
      expect(readFileSync(join('src/pages', file), 'utf8')).not.toMatch(/constants\/content\.js/)
    })
  })

  it('renders only the backend-filtered result set when a service is selected', async () => {
    const user = userEvent.setup()
    const service = await selectFirstGalleryService(user)

    expect(await screen.findByText(`Viewing inspiration while considering ${service.name}`)).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: /gallery image wall/i })).getAllByRole('button')).toHaveLength(filteredGalleryItems.length)
  })

  it('closes an open modal when the service filter changes', async () => {
    const user = userEvent.setup()
    const service = getGalleryServices()[0]
    renderRoute('/gallery')

    await user.click(await screen.findByRole('button', { name: /representative image 1$/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.selectOptions(screen.getByLabelText(/filter gallery by service/i), service.id)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
