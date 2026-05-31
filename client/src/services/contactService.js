import { api } from '../lib/api.js'

export async function createContactMessage(payload) {
  const response = await api.post('/contact', payload)

  return response.data
}
