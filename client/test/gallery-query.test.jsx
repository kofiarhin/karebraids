import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../src/App.jsx'
import { getGalleryItems, getGalleryItemsByServiceId, getGalleryServices } from '../src/data/services.js'

function renderRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('service-driven gallery surfaces', () => {
  it('renders the gallery service dropdown with all services and one option per gallery-enabled service', () => {
    renderRoute('/gallery')

    const filter = screen.getByLabelText(/filter gallery by service/i)
    expect(filter).toBeInTheDocument()
    expect(within(filter).getByRole('option', { name: /all services/i })).toHaveValue('all')
    getGalleryServices().forEach((service) => {
      expect(within(filter).getByRole('option', { name: service.name })).toHaveValue(service.id)
    })
  })

  it('loads all gallery images by default without service intro', () => {
    renderRoute('/gallery')

    expect(within(screen.getByRole('region', { name: /gallery image wall/i })).getAllByRole('button')).toHaveLength(getGalleryItems().length)
    expect(screen.queryByText(/selected service/i)).not.toBeInTheDocument()
  })

  it('filters images when a service is selected', async () => {
    const user = userEvent.setup()
    const service = getGalleryServices().find((item) => getGalleryItemsByServiceId(item.id).length > 0)
    const serviceItems = getGalleryItemsByServiceId(service.id)
    renderRoute('/gallery')

    await user.selectOptions(screen.getByLabelText(/filter gallery by service/i), service.id)

    expect(screen.getByRole('heading', { name: service.name })).toBeInTheDocument()
    expect(within(screen.getByRole('region', { name: /gallery image wall/i })).getAllByRole('button')).toHaveLength(serviceItems.length)
    serviceItems.forEach((item) => expect(screen.getByRole('button', { name: item.title })).toBeInTheDocument())
  })

  it('shows a polished empty state if a selected gallery-enabled service has no images', async () => {
    const user = userEvent.setup()
    const emptyService = getGalleryServices().find((service) => getGalleryItemsByServiceId(service.id).length === 0)
    renderRoute('/gallery')

    await user.selectOptions(screen.getByLabelText(/filter gallery by service/i), emptyService.id)

    expect(screen.getByText('No gallery images available for this service yet.')).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: /gallery image wall/i })).not.toBeInTheDocument()
  })
})
