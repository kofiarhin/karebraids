import { getGalleryImageItems } from '../data/imageLibrary.js'
import { api } from '../lib/api.js'

function normalizeLimit(limit) {
  return Number.isInteger(limit) && limit > 0 ? limit : undefined
}

function normalizeService(service) {
  return typeof service === 'string' && service.trim() ? service.trim() : undefined
}

function getLocalRepresentativeItems({ limit, service } = {}) {
  const normalizedLimit = normalizeLimit(limit)
  const normalizedService = normalizeService(service)
  const items = getGalleryImageItems().map((item) => (
    normalizedService ? { ...item, contextServiceId: normalizedService } : item
  ))

  return normalizedLimit ? items.slice(0, normalizedLimit) : items
}

function getGalleryParams({ limit, service } = {}) {
  return {
    limit: normalizeLimit(limit),
    service: normalizeService(service),
  }
}

export async function getGallery(options = {}) {
  const params = getGalleryParams(options)
  const response = await api.get('/gallery', { params })

  return {
    ...response.data,
    galleryItems: getLocalRepresentativeItems(params),
  }
}

export async function getGalleryItems(options = {}) {
  const params = getGalleryParams(options)
  await api.get('/gallery', { params })
  return getLocalRepresentativeItems(params)
}

export async function getGalleryServices() {
  const response = await api.get('/gallery/services')
  return response.data.services || []
}
