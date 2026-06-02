import { useQuery } from '@tanstack/react-query'
import { getGallery, getGalleryItems, getGalleryServices } from '../../services/galleryService.js'

function normalizeLimit(limit) {
  return Number.isInteger(limit) && limit > 0 ? limit : undefined
}

function normalizeService(service) {
  return typeof service === 'string' && service.trim() ? service : null
}

export function useGallery(options = {}) {
  const limit = normalizeLimit(options.limit)
  const service = normalizeService(options.service)

  return useQuery({
    queryKey: ['gallery', { limit, service }],
    queryFn: () => getGallery({ limit, service }),
  })
}

export function useGalleryItems(options = {}) {
  const limit = normalizeLimit(options.limit)
  const service = normalizeService(options.service)

  return useQuery({
    queryKey: ['gallery-items', { limit, service }],
    queryFn: () => getGalleryItems({ limit, service }),
  })
}

export function useGalleryServices() {
  return useQuery({
    queryKey: ['gallery-services'],
    queryFn: getGalleryServices,
  })
}
