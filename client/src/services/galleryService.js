import { api } from '../lib/api.js'

function buildGalleryParams({ limit, service } = {}) {
  return {
    ...(Number.isInteger(limit) && limit > 0 ? { limit } : {}),
    ...(typeof service === 'string' && service.trim() ? { service } : {}),
  }
}

export async function getGallery({ limit, service } = {}) {
  const params = buildGalleryParams({ limit, service })
  const response = await api.get('/gallery', {
    params: Object.keys(params).length > 0 ? params : undefined,
  })

  return response.data
}

export async function getGalleryItems(options = {}) {
  const data = await getGallery(options)
  return data.galleryItems
}

export async function getGalleryServices() {
  const response = await api.get('/gallery/services')
  return response.data.services
}
