import { api } from '../lib/api.js'

function authConfig(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export async function loginAdmin(credentials) {
  const response = await api.post('/admin/login', credentials)
  return response.data
}

export async function getAdminBookings(token) {
  const response = await api.get('/admin/bookings', authConfig(token))
  return response.data
}

export async function createAdminBooking(token, payload) {
  const response = await api.post('/admin/bookings', payload, authConfig(token))
  return response.data
}

export async function updateAdminBooking(token, id, payload) {
  const response = await api.put(`/admin/bookings/${id}`, payload, authConfig(token))
  return response.data
}

export async function updateAdminBookingStatus(token, id, status) {
  const response = await api.patch(`/admin/bookings/${id}/status`, { status }, authConfig(token))
  return response.data
}

export async function deleteAdminBooking(token, id) {
  const response = await api.delete(`/admin/bookings/${id}`, authConfig(token))
  return response.data
}
