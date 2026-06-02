import { api } from '../lib/api.js'

export async function getGalleryItems({ limit, style } = {}) {
  const params = {
    ...(Number.isInteger(limit) && limit > 0 ? { limit } : {}),
    ...(typeof style === 'string' && style.trim() ? { style } : {}),
  }

  const response = await api.get('/gallery', {
    params: Object.keys(params).length > 0 ? params : undefined,
  })

  return response.data.galleryItems
}
