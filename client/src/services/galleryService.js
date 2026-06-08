import { getGalleryImageItems } from '../data/imageLibrary.js'
import { api } from '../lib/api.js'

function normalizeLimit(limit) {
  return Number.isInteger(limit) && limit > 0 ? limit : undefined
}

function normalizeService(service) {
  return typeof service === 'string' && service.trim() ? service.trim() : undefined
}

export async function getGallery({ limit, service } = {}) {
  const response = await api.get('/gallery', {
    params: {
      limit: normalizeLimit(limit),
      service: normalizeService(service),
    },
  })

  return response.data
}

export async function getGalleryItems({ limit, service } = {}) {
  const normalizedService = normalizeService(service)
  const items = getGalleryImageItems().map((item) => (
    normalizedService ? { ...item, contextServiceId: normalizedService } : item
  ))
  const normalizedLimit = normalizeLimit(limit)

  return normalizedLimit ? items.slice(0, normalizedLimit) : items
}

export async function getGalleryServices() {
  const response = await api.get('/gallery/services')
  return response.data.services || []
}
