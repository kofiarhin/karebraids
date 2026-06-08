import {
  SERVICE_IMAGE_FALLBACK,
  getDisplayImage,
  getGalleryImageItems,
} from './imageLibrary.js'

const serviceCatalog = [
  { id: 'knotless-braids', slug: 'knotless-braids', name: 'Knotless Braids', category: 'Braids', shortDescription: 'Lightweight, natural-looking braids with a soft finish.', priceFrom: 85, duration: '4-6 hours', featured: true, bookingEnabled: true, galleryEnabled: true, status: 'available' },
  { id: 'box-braids', slug: 'box-braids', name: 'Box Braids', category: 'Braids', shortDescription: 'Classic protective styling with clean parting and polished ends.', priceFrom: 70, duration: '4-7 hours', featured: true, bookingEnabled: true, galleryEnabled: true, status: 'available' },
  { id: 'cornrows', slug: 'cornrows', name: 'Cornrows', category: 'Cornrows', shortDescription: 'Sleek rows for everyday wear, events, or base styling.', priceFrom: 35, duration: '1.5-3 hours', featured: true, bookingEnabled: true, galleryEnabled: true, status: 'available' },
  { id: 'stitch-braids', slug: 'stitch-braids', name: 'Stitch Braids', category: 'Cornrows', shortDescription: 'Defined stitch parting for sculpted, camera-ready detail.', priceFrom: 45, duration: '2-4 hours', featured: true, bookingEnabled: true, galleryEnabled: true, status: 'available' },
  { id: 'twists', slug: 'twists', name: 'Twists', category: 'Twists & Locs', shortDescription: 'Soft, elegant twists for flexible length and easy maintenance.', priceFrom: 65, duration: '3-5 hours', featured: false, bookingEnabled: true, galleryEnabled: true, status: 'available' },
  { id: 'boho-braids', slug: 'boho-braids', name: 'Boho Braids', category: 'Braids', shortDescription: 'Soft textured braids with movement and an elevated bohemian finish.', priceFrom: 95, duration: '5-7 hours', featured: false, bookingEnabled: true, galleryEnabled: true, status: 'available' },
  { id: 'fulani-braids', slug: 'fulani-braids', name: 'Fulani Braids', category: 'Braids', shortDescription: 'Face-framing braid detail with a refined Fulani-inspired finish.', priceFrom: 85, duration: '4-6 hours', featured: false, bookingEnabled: true, galleryEnabled: true, status: 'available' },
  { id: 'kids-braids', slug: 'kids-braids', name: 'Kids Braids', category: 'Kids Styles', shortDescription: 'Gentle, age-appropriate styling with comfort as the priority.', priceFrom: 30, duration: '1.5-3 hours', featured: false, bookingEnabled: true, galleryEnabled: true, status: 'available' },
]

function withRepresentativeImage(service) {
  const displayImage = getDisplayImage(service.id)

  return {
    ...service,
    image: displayImage.src,
    previewImage: displayImage,
    isRepresentativeImage: true,
  }
}

function withCompatibilityFields(service) {
  return {
    ...service,
    title: service.name,
    description: service.shortDescription,
    startingPrice: service.priceFrom,
    currency: 'GBP',
    durationLabel: service.duration,
    fromPrice: `From £${service.priceFrom}`,
  }
}

export { SERVICE_IMAGE_FALLBACK }
export const services = serviceCatalog.map(withRepresentativeImage)

export function getFeaturedServices() {
  return services.filter((service) => service.featured && service.status === 'available').map(withCompatibilityFields)
}

export function getBookableServices() {
  return services.filter((service) => service.bookingEnabled && service.status === 'available').map(withCompatibilityFields)
}

export function getGalleryServices() {
  return services.filter((service) => service.galleryEnabled && service.status === 'available').map(withCompatibilityFields)
}

export function getServiceById(id) {
  const service = services.find((item) => item.id === id)
  return service ? withCompatibilityFields(service) : undefined
}

export function getServiceBySlug(slug) {
  const service = services.find((item) => item.slug === slug)
  return service ? withCompatibilityFields(service) : undefined
}

export function getGalleryItems() {
  return getGalleryImageItems()
}

export function getGalleryItemsByServiceId(serviceId) {
  const galleryItems = getGalleryImageItems()
  if (!serviceId || serviceId === 'all') return galleryItems

  return galleryItems.map((item) => ({
    ...item,
    contextServiceId: serviceId,
  }))
}
