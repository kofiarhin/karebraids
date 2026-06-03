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

export async function getGallery({ limit, service } = {}) {
  const selectedServiceId = normalizeService(service)
  const allItems = selectedServiceId ? getGalleryItemsByServiceId(selectedServiceId) : getCanonicalGalleryItems()
  const itemLimit = normalizeLimit(limit)

  return {
    galleryItems: itemLimit ? allItems.slice(0, itemLimit) : allItems,
    selectedService: selectedServiceId ? getServiceById(selectedServiceId) ?? null : null,
    reviews: [],
  }
}

export async function getGalleryItems(options = {}) {
  const data = await getGallery(options)
  return data.galleryItems
}

export async function getGalleryServices() {
  return getCanonicalGalleryServices()
}
