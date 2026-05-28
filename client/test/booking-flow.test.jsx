import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
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

async function chooseService(user) {
  await user.click(screen.getByRole('button', { name: /knotless braids/i }))
}

async function chooseWednesdayMay272026(user) {
  await user.click(screen.getByRole('button', { name: /select wednesday, may 27, 2026/i }))
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
    const { container } = renderBooking()

    expect(container.querySelector('.booking-page')).toHaveClass('dark-booking-page')
    await chooseService(user)

    expect(screen.queryByLabelText(/appointment date/i)).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sunday, may 24, 2026 unavailable/i })).toBeDisabled()
    await user.click(screen.getByRole('button', { name: /continue to times/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/choose a valid appointment date/i)
    expect(bookingService.getAvailability).not.toHaveBeenCalled()
  })

  it('marks the active booking step for assistive technology', async () => {
    const user = userEvent.setup()
    renderBooking()
    const progress = screen.getByLabelText(/booking progress and summary/i)
    const stepList = progress.querySelector('.booking-step-list')

    expect(within(stepList).getByText('Service').closest('.step-pill')).toHaveAttribute(
      'aria-current',
      'step',
    )

    await chooseService(user)

    expect(within(stepList).getByText('Date').closest('.step-pill')).toHaveAttribute(
      'aria-current',
      'step',
    )
    expect(within(stepList).getByText('Service').closest('.step-pill')).not.toHaveAttribute(
      'aria-current',
    )
  })

  it('submits a valid booking and shows confirmation', async () => {
    const user = userEvent.setup()
    renderBooking()

    await chooseService(user)
    await chooseWednesdayMay272026(user)
    await user.click(screen.getByRole('button', { name: /continue to times/i }))

    await screen.findByRole('button', { name: /10:00/i })
    expect(bookingService.getAvailability).toHaveBeenCalledWith({
      service: 'Knotless Braids',
      date: '2026-05-27',
    })
    await user.click(screen.getByRole('button', { name: /10:00/i }))
    await user.type(screen.getByLabelText(/full name/i), 'Amara Okafor')
    await user.type(screen.getByLabelText(/email/i), 'amara@example.com')
    await user.type(screen.getByLabelText(/phone/i), '07123456789')
    await user.type(screen.getByLabelText(/preferred location/i), 'Salon')
    await user.click(screen.getByRole('button', { name: /confirm booking/i }))

    await waitFor(() => expect(bookingService.createBooking).toHaveBeenCalled())
    expect(bookingService.createBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        service: 'Knotless Braids',
        date: '2026-05-27',
        time: '10:00',
      }),
      expect.any(Object),
    )
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

    await chooseService(user)
    await chooseWednesdayMay272026(user)
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

    await chooseService(user)
    await chooseWednesdayMay272026(user)
    await user.click(screen.getByRole('button', { name: /continue to times/i }))

    expect(await screen.findByText(/no appointments are available/i)).toBeInTheDocument()
  })
})
