import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import * as adminService from '../src/services/adminService.js'

vi.mock('../src/services/adminService.js', () => ({
  createAdminBooking: vi.fn(),
  deleteAdminBooking: vi.fn(),
  getAdminBookings: vi.fn(),
  loginAdmin: vi.fn(),
  updateAdminBooking: vi.fn(),
  updateAdminBookingStatus: vi.fn(),
}))

const booking = {
  _id: 'booking-1',
  service: 'Knotless Braids',
  date: '2030-01-07',
  time: '10:00',
  fullName: 'Amara Okafor',
  email: 'amara@example.com',
  phone: '07123456789',
  preferredLocation: 'Salon',
  notes: 'Waist length if possible',
  status: 'pending',
}

function renderAdmin() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/admin']}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('admin dashboard', () => {
  beforeEach(() => {
    localStorage.clear()
    adminService.loginAdmin.mockResolvedValue({
      token: 'admin-token',
      admin: { username: 'admin', role: 'admin' },
    })
    adminService.getAdminBookings.mockResolvedValue({ bookings: [booking] })
    adminService.createAdminBooking.mockResolvedValue({ booking })
    adminService.updateAdminBooking.mockResolvedValue({ booking })
    adminService.updateAdminBookingStatus.mockResolvedValue({
      booking: { ...booking, status: 'confirmed' },
    })
    adminService.deleteAdminBooking.mockResolvedValue({ message: 'Booking deleted.' })
  })

  afterEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('shows admin login before booking data is available', () => {
    const { container } = renderAdmin()

    expect(screen.getByRole('heading', { name: /admin login/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.queryByText(/amara okafor/i)).not.toBeInTheDocument()
    expect(container.querySelector('[data-public-route-transition]')).not.toBeInTheDocument()
  })

  it('logs in and lists bookings', async () => {
    const user = userEvent.setup()
    renderAdmin()

    await user.type(screen.getByLabelText(/username/i), 'admin')
    await user.type(screen.getByLabelText(/password/i), 'correct-password')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByRole('heading', { name: /admin bookings/i })).toBeInTheDocument()
    expect(await screen.findByText(/amara okafor/i)).toBeInTheDocument()
    expect(adminService.loginAdmin).toHaveBeenCalledWith({
      username: 'admin',
      password: 'correct-password',
    })
    expect(adminService.getAdminBookings).toHaveBeenCalledWith('admin-token')
  })

  it('updates booking status from the dashboard', async () => {
    const user = userEvent.setup()
    localStorage.setItem('karebraids-admin-token', 'admin-token')
    renderAdmin()

    const row = await screen.findByRole('row', { name: /amara okafor/i })
    await user.selectOptions(within(row).getByLabelText(/status/i), 'confirmed')

    await waitFor(() =>
      expect(adminService.updateAdminBookingStatus).toHaveBeenCalledWith(
        'admin-token',
        'booking-1',
        'confirmed',
      ),
    )
  })

  it('clears a rejected saved token and returns to login', async () => {
    localStorage.setItem('karebraids-admin-token', 'expired-token')
    adminService.getAdminBookings.mockRejectedValue({
      response: {
        status: 401,
        data: { message: 'Invalid admin token.' },
      },
    })

    renderAdmin()

    expect(await screen.findByRole('heading', { name: /admin login/i })).toBeInTheDocument()
    expect(localStorage.getItem('karebraids-admin-token')).toBeNull()
  })
})
