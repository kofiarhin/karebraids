import { useQuery } from '@tanstack/react-query'
import { getGalleryItems } from '../../services/galleryService.js'

export function useGalleryItems(options = {}) {
  const limit = Number.isInteger(options.limit) && options.limit > 0 ? options.limit : undefined

  return useQuery({
    queryKey: ['gallery-items', { limit }],
    queryFn: () => getGalleryItems({ limit }),
  })
}
