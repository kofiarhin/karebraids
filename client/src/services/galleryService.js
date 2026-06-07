import { api } from '../lib/api.js'
<<<<<<< HEAD
import {
  getGalleryItems as getCanonicalGalleryItems,
  getGalleryItemsByServiceId,
  getGalleryServices as getCanonicalGalleryServices,
  getServiceById,
} from '../data/services.js'
=======
>>>>>>> 17932ad (feat: drive services and gallery from backend)

function normalizeLimit(limit) {
  return Number.isInteger(limit) && limit > 0 ? limit : undefined
}

function normalizeService(service) {
  return typeof service === 'string' && service.trim() ? service.trim() : undefined
}

<<<<<<< HEAD
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
=======
export async function getGallery({ limit, service } = {}) {
  const response = await api.get('/gallery', {
    params: {
      limit: normalizeLimit(limit),
      service: normalizeService(service),
    },
  })
  return response.data
>>>>>>> 17932ad (feat: drive services and gallery from backend)
}

function responseHasGalleryItems(data) {
  return Array.isArray(data?.galleryItems) && data.galleryItems.length > 0
}

function responseHasServices(data) {
  return Array.isArray(data?.services) && data.services.length > 0
}

export async function getGallery(options = {}) {
  try {
    const response = await api.get('/gallery', {
      params: buildGalleryParams(options),
    })

    if (responseHasGalleryItems(response.data)) {
      return response.data
    }

    return getLocalGallery(options)
  } catch {
    return getLocalGallery(options)
  }
}

export async function getGalleryItems(options = {}) {
  const data = await getGallery(options)
  return data.galleryItems || []
}

export async function getGalleryServices() {
<<<<<<< HEAD
  try {
    const response = await api.get('/gallery/services')

    if (responseHasServices(response.data)) {
      return response.data.services
    }

    return getCanonicalGalleryServices()
  } catch {
    return getCanonicalGalleryServices()
  }
=======
  const response = await api.get('/gallery/services')
  return response.data.services || []
>>>>>>> 17932ad (feat: drive services and gallery from backend)
}
