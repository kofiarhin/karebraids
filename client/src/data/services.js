import {
  getDisplayImage,
  getGalleryImageItems,
} from './imageLibrary.js'

// Keep this offline catalogue aligned with server/data/services.json.
// The API remains canonical; this copy is used only when the API is unavailable.
const serviceCatalog = [
  { id: 'knotless-braids', slug: 'knotless-braids', name: 'Knotless Braids', category: 'Braids', shortDescription: 'Lightweight knotless braids with a natural root finish, gentle tension, and flexible everyday styling.', startingPrice: 80, duration: '4–6 hours', featured: true },
<<<<<<< HEAD
  { id: 'boho-knotless-braids', slug: 'boho-knotless-braids', name: 'Boho Knotless Braids', category: 'Braids', shortDescription: 'Knotless braids finished with soft loose curls for a textured bohemian look.', startingPrice: 95, duration: '5–7 hours', featured: true },
=======
  { id: 'boho-knotless-braids', slug: 'boho-braids', name: 'Boho Knotless Braids', category: 'Braids', shortDescription: 'Knotless braids finished with soft loose curls for a textured bohemian look.', startingPrice: 95, duration: '5–7 hours', featured: true },
>>>>>>> pr-25
  { id: 'fulani-braids', slug: 'fulani-braids', name: 'Fulani Braids', category: 'Braids', shortDescription: 'Face-framing cornrow detail combined with flowing braids for a refined Fulani-inspired finish.', startingPrice: 85, duration: '4–6 hours', featured: true },
  { id: 'stitch-braids', slug: 'stitch-braids', name: 'Stitch Braids', category: 'Cornrows', shortDescription: 'Crisp stitch braids with defined sections, smooth feed-in detail, and a polished finish.', startingPrice: 45, duration: '2–4 hours', featured: true },
  { id: 'cornrows', slug: 'cornrows', name: 'Cornrows', category: 'Cornrows', shortDescription: 'Neat cornrows for everyday protective styling, from simple straight backs to custom patterns.', startingPrice: 35, duration: '1.5–3 hours', featured: false },
  { id: 'tribal-braids', slug: 'tribal-braids', name: 'Tribal Braids', category: 'Braids', shortDescription: 'Detailed braided patterns with statement parting and a polished protective finish.', startingPrice: 90, duration: '4–6 hours', featured: false },
  { id: 'feed-in-braids', slug: 'feed-in-braids', name: 'Feed-in Braids', category: 'Cornrows', shortDescription: 'Smooth feed-in braids with a natural progression, clean sections, and comfortable tension.', startingPrice: 55, duration: '2–4 hours', featured: false },
  { id: 'goddess-braids', slug: 'goddess-braids', name: 'Goddess Braids', category: 'Braids', shortDescription: 'Protective braids with flowing curly detail for a soft, elevated finish.', startingPrice: 100, duration: '5–7 hours', featured: false },
  { id: 'kids-braids', slug: 'kids-braids', name: 'Kids Braids', category: 'Kids Styles', shortDescription: 'Gentle younger-client braid appointments with careful tension, clean finishes, and easy upkeep.', startingPrice: 30, duration: '1.5–3 hours', featured: false },
  { id: 'box-braids', slug: 'box-braids', name: 'Box Braids', category: 'Braids', shortDescription: 'Classic box braids with clean parting, secure tension, and versatile styling options.', startingPrice: 70, duration: '4–7 hours', featured: false },
  { id: 'twists', slug: 'twists', name: 'Twists', category: 'Twists & Locs', shortDescription: 'Soft protective twists with flexible movement, comfortable wear, and easy maintenance.', startingPrice: 65, duration: '3–5 hours', featured: false },
].map((service) => ({
  ...service,
  bookingEnabled: true,
  galleryEnabled: true,
  status: 'available',
}))

function withRepresentativeImage(service) {
  const displayImage = getDisplayImage(service.id)
  return { ...service, image: displayImage.src, previewImage: displayImage, isRepresentativeImage: true }
}

function withCompatibilityFields(service) {
  return {
    ...service,
    title: service.name,
    description: service.shortDescription,
    priceFrom: service.startingPrice,
    currency: 'GBP',
    durationLabel: service.duration,
    fromPrice: `From £${service.startingPrice}`,
    images: [],
    reviews: [],
  }
}

function availableServices() {
  return services.filter((service) => service.status === 'available')
}

export const services = serviceCatalog.map(withRepresentativeImage)
export const getLocalServices = () => availableServices().map(withCompatibilityFields)
export const getFeaturedServices = () => availableServices().filter((service) => service.featured).map(withCompatibilityFields)
export const getBookableServices = () => availableServices().filter((service) => service.bookingEnabled).map(withCompatibilityFields)
export const getGalleryServices = () => availableServices().filter((service) => service.galleryEnabled).map(withCompatibilityFields)
export const getServiceById = (id) => {
  const service = services.find((item) => item.id === id)
  return service ? withCompatibilityFields(service) : undefined
}
export const getServiceBySlug = (slug) => {
  const service = services.find((item) => item.slug === slug)
  return service ? withCompatibilityFields(service) : undefined
}
export const getGalleryItems = () => getGalleryImageItems()
export function getGalleryItemsByServiceId(serviceId) {
  const galleryItems = getGalleryImageItems()
  if (!serviceId || serviceId === 'all') return galleryItems
  return galleryItems.map((item) => ({ ...item, contextServiceId: serviceId }))
}
