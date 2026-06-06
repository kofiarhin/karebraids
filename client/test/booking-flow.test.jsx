import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { readFileSync } from 'node:fs'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import * as bookingService from '../src/services/bookingService.js'
import { getBookableServices } from '../src/data/services.js'
import { useGalleryServices } from '../src/hooks/queries/useGalleryItems.js'

const bookingStyles = () => readFileSync('src/index.css', 'utf8')

vi.mock('../src/services/bookingService.js', () => ({
  createBooking: vi.fn(),
  getAvailability: vi.fn(),
}))

vi.mock('../src/hooks/queries/useGalleryItems.js', () => ({
  useGalleryServices: vi.fn(),
}))

function renderBooking(route = '/booking') {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

async function chooseService(user) {
  await user.click(screen.getByRole('button', { name: /knotless braids/i }))
}

async function chooseAvailableAppointmentDate(user) {
  if (!screen.queryAllByRole('button', { name: /^select /i }).length) {
    await user.click(screen.getByRole('button', { name: /next appointment month/i }))
  }

  const dateButton = screen.getAllByRole('button', { name: /^select /i })[0]
  const readableDate = dateButton.getAttribute('aria-label').replace(/^Select /, '')
  const date = new Date(readableDate)
  const selectedDate = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-')

  await user.click(dateButton)
  return selectedDate
}

describe('booking flow', () => {
  it('renders booking service options from useGalleryServices', () => {
    const services = getBookableServices().slice(0, 2)
    useGalleryServices.mockReturnValue({ data: services, isLoading: false, isError: false })

    renderBooking()

    expect(useGalleryServices).toHaveBeenCalled()
    services.forEach((service) => {
      expect(screen.getByRole('button', { name: new RegExp(service.name, 'i') })).toBeInTheDocument()
    })
  })

  beforeEach(() => {
    bookingService.getAvailability.mockResolvedValue({
      slots: ['09:00', '10:00'],
      message: 'Appointments are available.',
    })
    useGalleryServices.mockReturnValue({ data: getBookableServices(), isLoading: false, isError: false })
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

  it('defines the calm dark booking surface and clarified mobile content order', () => {
    const styles = bookingStyles()

    expect(styles).toContain('.theme-brand-shell .booking-panel::before {\n  display: none;')
    expect(styles).toContain('--booking-surface-glass: rgba(255, 255, 255, 0.02);')
    expect(styles).toContain('background: var(--booking-surface-glass);')
    expect(styles).toContain('--booking-border-glass: rgba(255, 255, 255, 0.08);')
    expect(styles).toContain('border: 1px solid var(--booking-border-glass);')
    expect(styles).toContain('.booking-step-list {\n    order: 1;')
    expect(styles).toContain('.booking-panel {\n    order: 2;')
    expect(styles).toContain('.booking-live-card {\n    order: 3;')
  })

  it('keeps the compact booking progress and calendar comfortable on narrow phones', () => {
    const styles = bookingStyles()

    expect(styles).toContain('@media (max-width: 480px) {\n  .booking-step-list {\n    scroll-snap-type: x proximity;')
    expect(styles).toContain('.step-pill small {\n    display: none;')
    expect(styles).toContain('.calendar-weekdays,\n  .calendar-grid {\n    gap: 0.2rem;')
  })

  it('preselects a booking service from the service query parameter', () => {
    useGalleryServices.mockReturnValue({ data: getBookableServices(), isLoading: false, isError: false })

    renderBooking('/booking?service=stitch-braids')

    expect(screen.getByText('Stitch Braids', { selector: 'dd' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /select date/i })).toBeInTheDocument()
  })

  it('prevents Sunday selection before showing appointment times', async () => {
    const user = userEvent.setup()
    const { container } = renderBooking()

    expect(container.querySelector('.booking-page')).toHaveClass('dark-booking-page')
    await chooseService(user)

    expect(screen.queryByLabelText(/appointment date/i)).not.toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /sunday.*unavailable/i })[0]).toBeDisabled()
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
    expect(within(stepList).getByText('Date').closest('.step-pill')).toHaveClass('active')
    expect(within(stepList).getByText('Service').closest('.step-pill')).toHaveClass('completed')
    expect(within(stepList).getByText('Service').closest('.step-pill')).not.toHaveClass('active')
  })

  it('submits a valid booking and shows confirmation', async () => {
    const user = userEvent.setup()
    renderBooking()

    await chooseService(user)
    const selectedDate = await chooseAvailableAppointmentDate(user)
    await user.click(screen.getByRole('button', { name: /continue to times/i }))

    await screen.findByRole('button', { name: /10:00/i })
    expect(bookingService.getAvailability).toHaveBeenCalledWith({
      service: 'Knotless Braids',
      date: selectedDate,
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
        date: selectedDate,
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
    await chooseAvailableAppointmentDate(user)
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
    await chooseAvailableAppointmentDate(user)
    await user.click(screen.getByRole('button', { name: /continue to times/i }))

    expect(await screen.findByText(/no appointments are available/i)).toBeInTheDocument()
  })
})
