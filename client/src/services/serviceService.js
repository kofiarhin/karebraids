import { api } from '../lib/api.js'

function cleanFilters(filters = {}) {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  )
}

export async function getServices(filters = {}) {
  const response = await api.get('/services', { params: cleanFilters(filters) })
  return response.data.services || []
}

export async function getService(id) {
  const response = await api.get(`/services/${encodeURIComponent(id)}`)
  return response.data.service
}

export async function getServiceGallery(id) {
  const response = await api.get(`/services/${encodeURIComponent(id)}/gallery`)
  return response.data
}
