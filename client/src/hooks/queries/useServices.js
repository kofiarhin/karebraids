import { useQuery } from '@tanstack/react-query'
import { getService, getServices } from '../../services/serviceService.js'

function useFilteredServices(filters, key) {
  return useQuery({
    queryKey: ['services', key, filters],
    queryFn: () => getServices(filters),
  })
}

export function useFeaturedServices() {
  return useFilteredServices({ featured: true, status: 'available' }, 'featured')
}

export function useBookableServices() {
  return useFilteredServices({ bookingEnabled: true, status: 'available' }, 'bookable')
}

export function useGalleryEnabledServices() {
  return useFilteredServices({ galleryEnabled: true, status: 'available' }, 'gallery-enabled')
}

export function useService(id) {
  return useQuery({
    queryKey: ['services', 'detail', id],
    queryFn: () => getService(id),
    enabled: Boolean(id),
  })
}
