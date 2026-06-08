import { api } from '../lib/api.js'
import {
  getGalleryItems as getCanonicalGalleryItems,
  getGalleryItemsByServiceId,
  getGalleryServices as getCanonicalGalleryServices,
  getServiceById,
} from '../data/services.js'

function normalizeLimit(limit) {
  return Number.isInteger(limit) && limit > 0 ? limit : undefined
}

function normalizeService(service) {
  return typeof service === 'string' && service.trim() ? service : null
}

function buildGalleryParams({ limit, service } = {}) {
  const params = {}
  const itemLimit = normalizeLimit(limit)
  const selectedServiceId = normalizeService(service)

  if (itemLimit) params.limit = itemLimit
  if (selectedServiceId) params.service = selectedServiceId

  return params
}

function getLocalGallery({ limit, service } = {}) {
  const selectedServiceId = normalizeService(service)
  const allItems = selectedServiceId ? getGalleryItemsByServiceId(selectedServiceId) : getCanonicalGalleryItems()
  const itemLimit = normalizeLimit(limit)

  return {
    galleryItems: itemLimit ? allItems.slice(0, itemLimit) : allItems,
    selectedService: selectedServiceId ? getServiceById(selectedServiceId) ?? null : null,
    reviews: [],
  }
}

export async function getGallery(options = {}) {
  try {
    const response = await api.get('/gallery', {
      params: buildGalleryParams(options),
    })

    return response.data
  } catch {
    return getLocalGallery(options)
  }
}

export async function getGalleryItems(options = {}) {
  const data = await getGallery(options)
  return data.galleryItems || []
}

export async function getGalleryServices() {
  try {
    const response = await api.get('/gallery/services')
    return response.data.services || []
  } catch {
    return getCanonicalGalleryServices()
  }
}
