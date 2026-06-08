import {
  CalendarCheck,
  CheckCircle,
  CircleNotch,
  SignOut,
  Trash,
  WarningCircle,
} from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import {
  useAdminLogin,
  useCreateAdminBooking,
  useDeleteAdminBooking,
  useUpdateAdminBooking,
  useUpdateAdminBookingStatus,
} from '../hooks/mutations/useAdminBookingMutations.js'
import { useAdminBookings } from '../hooks/queries/useAdminBookings.js'
import { getApiErrorMessage } from '../lib/api.js'
import { useBookableServices } from '../hooks/queries/useServices.js'

const ADMIN_TOKEN_KEY = 'karebraids-admin-token'
const statuses = ['pending', 'confirmed', 'cancelled', 'completed']
function normalizeBooking(booking) {
  return {
    service: booking?.service || 'Knotless Braids',
    date: booking?.date || '',
    time: booking?.time || '09:00',
    fullName: booking?.fullName || '',
    email: booking?.email || '',
    phone: booking?.phone || '',
    preferredLocation: booking?.preferredLocation || '',
    notes: booking?.notes || '',
    status: booking?.status || 'pending',
  }
}

function AdminLogin({ onLogin }) {
  const login = useAdminLogin()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const updateCredential = (field, value) => {
    setCredentials((current) => ({ ...current, [field]: value }))
    setError('')
  }

  const submitLogin = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const response = await login.mutateAsync(credentials)
      onLogin(response.token)
    } catch (loginError) {
      setError(getApiErrorMessage(loginError))
    }
  }

  return (
    <section className="admin-page admin-login-page">
      <div className="admin-login-panel">
        <p className="eyebrow">Private workspace</p>
        <h1>Admin login</h1>
        <p>Sign in to manage KareBraids bookings.</p>
        {error ? (
          <p className="form-alert" role="alert">
            <WarningCircle aria-hidden="true" size={20} weight="duotone" />
            {error}
          </p>
        ) : null}
        <form className="admin-form" onSubmit={submitLogin}>
          <label className="field-group">
            <span>Username</span>
            <input
              autoComplete="username"
              onChange={(event) => updateCredential('username', event.target.value)}
              value={credentials.username}
            />
          </label>
          <label className="field-group">
            <span>Password</span>
            <input
              autoComplete="current-password"
              onChange={(event) => updateCredential('password', event.target.value)}
              type="password"
              value={credentials.password}
            />
          </label>
          <button className="btn btn-primary" disabled={login.isPending} type="submit">
            {login.isPending ? 'Signing in' : 'Sign In'}
          </button>
        </form>
      </div>
    </section>
  )
}

function BookingForm({ booking, isSaving, onCancelEdit, onSubmit, services }) {
  const [form, setForm] = useState(() => normalizeBooking(booking))

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const submitForm = (event) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <form className="admin-booking-form" onSubmit={submitForm}>
      <div>
        <p className="eyebrow">{booking?._id ? 'Edit booking' : 'Create booking'}</p>
        <h2>{booking?._id ? 'Update appointment' : 'Add appointment'}</h2>
      </div>
      <div className="form-grid">
        <label className="field-group">
          <span>Service</span>
          <select onChange={(event) => updateField('service', event.target.value)} value={form.service}>
            {services.map((service) => (
              <option key={service.id} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field-group">
          <span>Status</span>
          <select onChange={(event) => updateField('status', event.target.value)} value={form.status}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="field-group">
          <span>Appointment date</span>
          <input onChange={(event) => updateField('date', event.target.value)} type="date" value={form.date} />
        </label>
        <label className="field-group">
          <span>Time</span>
          <input onChange={(event) => updateField('time', event.target.value)} value={form.time} />
        </label>
        <label className="field-group">
          <span>Full Name</span>
          <input onChange={(event) => updateField('fullName', event.target.value)} value={form.fullName} />
        </label>
        <label className="field-group">
          <span>Email</span>
          <input onChange={(event) => updateField('email', event.target.value)} type="email" value={form.email} />
        </label>
        <label className="field-group">
          <span>Phone</span>
          <input onChange={(event) => updateField('phone', event.target.value)} value={form.phone} />
        </label>
        <label className="field-group">
          <span>Preferred Location</span>
          <input
            onChange={(event) => updateField('preferredLocation', event.target.value)}
            value={form.preferredLocation}
          />
        </label>
        <label className="field-group full">
          <span>Notes</span>
          <textarea
            maxLength={500}
            onChange={(event) => updateField('notes', event.target.value)}
            rows="3"
            value={form.notes}
          />
          <small>500 characters maximum.</small>
        </label>
      </div>
      <div className="admin-form-actions">
        <button className="btn btn-primary" disabled={isSaving} type="submit">
          {isSaving ? 'Saving booking' : booking?._id ? 'Save Booking' : 'Create Booking'}
        </button>
        {booking?._id ? (
          <button className="btn btn-secondary" onClick={onCancelEdit} type="button">
            Cancel Edit
          </button>
        ) : null}
      </div>
    </form>
  )
}

export function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || '')
  const [editingBooking, setEditingBooking] = useState(null)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const bookingsQuery = useAdminBookings(token)
  const servicesQuery = useBookableServices()
  const services = servicesQuery.data || []
  const createBooking = useCreateAdminBooking(token)
  const updateBooking = useUpdateAdminBooking(token)
  const updateStatus = useUpdateAdminBookingStatus(token)
  const deleteBooking = useDeleteAdminBooking(token)

  const bookings = useMemo(() => bookingsQuery.data?.bookings || [], [bookingsQuery.data?.bookings])
  const totalBookings = bookings.length
  const pendingBookings = useMemo(
    () => bookings.filter((booking) => booking.status === 'pending').length,
    [bookings],
  )
  const hasInvalidToken = bookingsQuery.error?.response?.status === 401

  const handleLogin = (nextToken) => {
    localStorage.setItem(ADMIN_TOKEN_KEY, nextToken)
    setToken(nextToken)
  }

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    setToken('')
    setEditingBooking(null)
  }

  const handleMutationError = (mutationError) => {
    setNotice('')
    setError(getApiErrorMessage(mutationError))
  }

  const submitBooking = async (payload) => {
    setError('')
    setNotice('')

    try {
      if (editingBooking?._id) {
        await updateBooking.mutateAsync({ id: editingBooking._id, payload })
        setNotice('Booking updated.')
      } else {
        await createBooking.mutateAsync(payload)
        setNotice('Booking created.')
      }
      setEditingBooking(null)
    } catch (mutationError) {
      handleMutationError(mutationError)
    }
  }

  const changeStatus = async (booking, status) => {
    setError('')
    setNotice('')

    try {
      await updateStatus.mutateAsync({ id: booking._id, status })
      setNotice('Booking status updated.')
    } catch (mutationError) {
      handleMutationError(mutationError)
    }
  }

  const removeBooking = async (booking) => {
    if (!window.confirm(`Delete booking for ${booking.fullName}?`)) {
      return
    }

    setError('')
    setNotice('')

    try {
      await deleteBooking.mutateAsync(booking._id)
      setNotice('Booking deleted.')
    } catch (mutationError) {
      handleMutationError(mutationError)
    }
  }

  const isSaving =
    createBooking.isPending ||
    updateBooking.isPending ||
    updateStatus.isPending ||
    deleteBooking.isPending

  if (!token) {
    return <AdminLogin onLogin={handleLogin} />
  }

  if (hasInvalidToken) {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <section className="admin-page">
      <header className="admin-header">
        <div>
          <p className="eyebrow">Admin workspace</p>
          <h1>Admin bookings</h1>
          <p>Manage appointment requests, customer details, and booking status.</p>
        </div>
        <button className="btn btn-secondary" onClick={logout} type="button">
          <SignOut aria-hidden="true" size={18} weight="bold" />
          Log Out
        </button>
      </header>

      <div className="admin-metrics" aria-label="Booking summary">
        <span>
          <CalendarCheck aria-hidden="true" size={20} weight="duotone" />
          {totalBookings} bookings
        </span>
        <span>{pendingBookings} pending</span>
      </div>

      {notice ? (
        <p className="empty-state" role="status">
          <CheckCircle aria-hidden="true" size={20} weight="duotone" />
          {notice}
        </p>
      ) : null}
      {error || bookingsQuery.isError ? (
        <p className="form-alert" role="alert">
          <WarningCircle aria-hidden="true" size={20} weight="duotone" />
          {error || getApiErrorMessage(bookingsQuery.error)}
        </p>
      ) : null}

      <div className="admin-workspace">
        <div className="admin-table-panel">
          {bookingsQuery.isLoading ? (
            <div className="slot-skeleton" aria-label="Loading admin bookings">
              <CircleNotch aria-hidden="true" size={22} weight="bold" />
              Loading bookings
            </div>
          ) : null}

          {!bookingsQuery.isLoading && !bookings.length && !bookingsQuery.isError ? (
            <p className="empty-state">No bookings yet.</p>
          ) : null}

          {bookings.length ? (
            <div className="admin-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Appointment</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <strong>{booking.fullName}</strong>
                        <span>{booking.service}</span>
                      </td>
                      <td>
                        <strong>{booking.date}</strong>
                        <span>{booking.time}</span>
                      </td>
                      <td>
                        <strong>{booking.phone}</strong>
                        <span>{booking.email}</span>
                      </td>
                      <td>
                        <label className="admin-status-field">
                          <span>Status</span>
                          <select
                            aria-label="Status"
                            disabled={isSaving}
                            onChange={(event) => changeStatus(booking, event.target.value)}
                            value={booking.status}
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </label>
                      </td>
                      <td>
                        <div className="admin-row-actions">
                          <button className="btn btn-secondary" onClick={() => setEditingBooking(booking)} type="button">
                            Edit
                          </button>
                          <button className="admin-icon-button" onClick={() => removeBooking(booking)} type="button">
                            <Trash aria-hidden="true" size={18} weight="bold" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>

        <BookingForm
          booking={editingBooking}
          isSaving={isSaving}
          key={editingBooking?._id || 'new-booking'}
          onCancelEdit={() => setEditingBooking(null)}
          onSubmit={submitBooking}
          services={services}
        />
      </div>
    </section>
  )
}
