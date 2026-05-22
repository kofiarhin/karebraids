import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import * as bookingService from '../src/services/bookingService.js'

vi.mock('../src/services/bookingService.js', () => ({
  createBooking: vi.fn(),
  getAvailability: vi.fn(),
}))

function renderBooking() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/booking']}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('booking flow', () => {
  beforeEach(() => {
    bookingService.getAvailability.mockResolvedValue({
      slots: ['09:00', '10:00'],
      message: 'Appointments are available.',
    })
    bookingService.createBooking.mockResolvedValue({
      booking: {
        service: 'Knotless Braids',
        date: '2030-01-07',
        time: '10:00',
        fullName: 'Amara Okafor',
      },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('prevents Sunday selection before showing appointment times', async () => {
    const user = userEvent.setup()
    renderBooking()

    await user.click(screen.getByRole('button', { name: /knotless braids/i }))
    await user.type(screen.getByLabelText(/appointment date/i), '2030-01-06')
    await user.click(screen.getByRole('button', { name: /continue to times/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/monday to saturday/i)
    expect(bookingService.getAvailability).not.toHaveBeenCalled()
  })

  it('submits a valid booking and shows confirmation', async () => {
    const user = userEvent.setup()
    renderBooking()

    await user.click(screen.getByRole('button', { name: /knotless braids/i }))
    await user.type(screen.getByLabelText(/appointment date/i), '2030-01-07')
    await user.click(screen.getByRole('button', { name: /continue to times/i }))

    await screen.findByRole('button', { name: /10:00/i })
    await user.click(screen.getByRole('button', { name: /10:00/i }))
    await user.type(screen.getByLabelText(/full name/i), 'Amara Okafor')
    await user.type(screen.getByLabelText(/email/i), 'amara@example.com')
    await user.type(screen.getByLabelText(/phone/i), '07123456789')
    await user.type(screen.getByLabelText(/preferred location/i), 'Salon')
    await user.click(screen.getByRole('button', { name: /confirm booking/i }))

    await waitFor(() => expect(bookingService.createBooking).toHaveBeenCalled())
    expect(screen.getByRole('heading', { name: /booking request received/i })).toBeInTheDocument()
  })

  it('shows an API error when the selected slot is already booked', async () => {
    const user = userEvent.setup()
    bookingService.createBooking.mockRejectedValue({
      response: {
        data: {
          message: 'This appointment slot is already booked.',
        },
      },
    })
    renderBooking()

    await user.click(screen.getByRole('button', { name: /knotless braids/i }))
    await user.type(screen.getByLabelText(/appointment date/i), '2030-01-07')
    await user.click(screen.getByRole('button', { name: /continue to times/i }))
    await user.click(await screen.findByRole('button', { name: /10:00/i }))
    await user.type(screen.getByLabelText(/full name/i), 'Amara Okafor')
    await user.type(screen.getByLabelText(/email/i), 'amara@example.com')
    await user.type(screen.getByLabelText(/phone/i), '07123456789')
    await user.type(screen.getByLabelText(/preferred location/i), 'Salon')
    await user.click(screen.getByRole('button', { name: /confirm booking/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/already booked/i)
  })

  it('shows an empty state when no appointment slots are available', async () => {
    const user = userEvent.setup()
    bookingService.getAvailability.mockResolvedValue({
      slots: [],
      message: 'No appointments are available.',
    })
    renderBooking()

    await user.click(screen.getByRole('button', { name: /knotless braids/i }))
    await user.type(screen.getByLabelText(/appointment date/i), '2030-01-07')
    await user.click(screen.getByRole('button', { name: /continue to times/i }))

    expect(await screen.findByText(/no appointments are available/i)).toBeInTheDocument()
  })
})
