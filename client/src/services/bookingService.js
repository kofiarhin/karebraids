import { api } from '../lib/api.js'

export async function getAvailability({ service, date }) {
  const response = await api.get('/bookings/availability', {
    params: {
      service,
      date,
    },
  })

  return response.data
}

export async function createBooking(payload) {
  const response = await api.post('/bookings', payload)

  return response.data
}
