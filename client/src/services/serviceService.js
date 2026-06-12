import { getLocalServices, getServiceById, getServiceBySlug } from '../data/services.js'
import { api } from '../lib/api.js'

function cleanFilters(filters = {}) {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  )
}

function matchesFilters(service, filters = {}) {
  return Object.entries(cleanFilters(filters)).every(([key, value]) => {
    if (value === true || value === 'true') return service[key] === true
    if (value === false || value === 'false') return service[key] === false
    return String(service[key]) === String(value)
  })
}

function getFallbackServices(filters = {}) {
  return getLocalServices().filter((service) => matchesFilters(service, filters))
}

function getFallbackService(id) {
  return getServiceById(id) || getServiceBySlug(id)
}

export async function getServices(filters = {}) {
  try {
    const response = await api.get('/services', { params: cleanFilters(filters) })
    return response.data.services || []
  } catch (error) {
    console.warn('Using fallback services because the services API could not be reached.', error)
    return getFallbackServices(filters)
  }
}

export async function getService(id) {
  try {
    const response = await api.get(`/services/${encodeURIComponent(id)}`)
    return response.data.service
  } catch (error) {
    const fallbackService = getFallbackService(id)
    if (fallbackService) return fallbackService
    throw error
  }
}

export async function getServiceGallery(id) {
  try {
    const response = await api.get(`/services/${encodeURIComponent(id)}/gallery`)
    return response.data
  } catch (error) {
    const fallbackService = getFallbackService(id)
    if (fallbackService) return { service: fallbackService, galleryItems: fallbackService.images || [] }
    throw error
  }
}
