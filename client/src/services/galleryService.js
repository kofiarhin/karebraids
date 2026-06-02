import { api } from '../lib/api.js'

export async function getGalleryItems({ limit } = {}) {
  const response = await api.get('/api/gallery', {
    params: Number.isInteger(limit) && limit > 0 ? { limit } : undefined,
  })

  return response.data.galleryItems
}
