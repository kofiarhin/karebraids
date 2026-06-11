import { api } from '../lib/api.js'

const fallbackServices = [
  {
    id: 'knotless-braids',
    slug: 'knotless-braids',
    name: 'Knotless Braids',
    title: 'Knotless Braids',
    shortDescription: 'Lightweight knotless braids with a natural root finish, gentle tension, and flexible everyday styling.',
    description: 'Lightweight knotless braids with a natural root finish, gentle tension, and flexible everyday styling.',
    startingPrice: 80,
    priceFrom: 80,
    currency: 'GBP',
    durationLabel: '4–6 hours',
    featured: true,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    images: [],
    reviews: [],
  },
  {
    id: 'box-braids',
    slug: 'box-braids',
    name: 'Box Braids',
    title: 'Box Braids',
    shortDescription: 'Classic box braids with clean parting, secure tension, and versatile styling options.',
    description: 'Classic box braids with clean parting, secure tension, and versatile styling options.',
    startingPrice: 75,
    priceFrom: 75,
    currency: 'GBP',
    durationLabel: '4–6 hours',
    featured: true,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    images: [],
    reviews: [],
  },
  {
    id: 'stitch-braids',
    slug: 'stitch-braids',
    name: 'Stitch Braids',
    title: 'Stitch Braids',
    shortDescription: 'Crisp stitch braids with defined sections, smooth feed-in detail, and a polished finish.',
    description: 'Crisp stitch braids with defined sections, smooth feed-in detail, and a polished finish.',
    startingPrice: 55,
    priceFrom: 55,
    currency: 'GBP',
    durationLabel: '2–4 hours',
    featured: false,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    images: [],
    reviews: [],
  },
  {
    id: 'cornrows',
    slug: 'cornrows',
    name: 'Cornrows',
    title: 'Cornrows',
    shortDescription: 'Neat cornrows for everyday protective styling, from simple straight backs to custom patterns.',
    description: 'Neat cornrows for everyday protective styling, from simple straight backs to custom patterns.',
    startingPrice: 40,
    priceFrom: 40,
    currency: 'GBP',
    durationLabel: '1.5–3 hours',
    featured: false,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    images: [],
    reviews: [],
  },
  {
    id: 'children-braids',
    slug: 'kids-braids',
    name: 'Kids Braids',
    title: 'Kids Braids',
    shortDescription: 'Gentle younger-client braid appointments with careful tension, clean finishes, and easy upkeep.',
    description: 'Gentle younger-client braid appointments with careful tension, clean finishes, and easy upkeep.',
    startingPrice: 35,
    priceFrom: 35,
    currency: 'GBP',
    durationLabel: '1.5–3 hours',
    featured: false,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    images: [],
    reviews: [],
  },
  {
    id: 'custom-styles',
    slug: 'custom-styles',
    name: 'Custom Styles',
    title: 'Custom Styles',
    shortDescription: 'A custom protective style planned around your hair, inspiration, and appointment goals.',
    description: 'A custom protective style planned around your hair, inspiration, and appointment goals.',
    startingPrice: 65,
    priceFrom: 65,
    currency: 'GBP',
    durationLabel: 'Consultation required',
    featured: false,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    images: [],
    reviews: [],
  },
]

function cleanFilters(filters = {}) {
  return Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ''),
  )
}

function matchesFilters(service, filters = {}) {
  return Object.entries(cleanFilters(filters)).every(([key, value]) => {
    if (value === true || value === 'true') return service[key] === true
    if (value === false || value === 'false') return service[key] === false
    return String(service[key]) === String(value)
  })
}

function getFallbackServices(filters = {}) {
  return fallbackServices.filter((service) => matchesFilters(service, filters))
}

function getFallbackService(id) {
  return fallbackServices.find((service) => service.id === id || service.slug === id)
}

export async function getServices(filters = {}) {
  try {
    const response = await api.get('/services', { params: cleanFilters(filters) })
    return response.data.services || []
  } catch (error) {
    console.warn('Using fallback services because the services API could not be reached.', error)
    return getFallbackServices(filters)
  }
}

export async function getService(id) {
  try {
    const response = await api.get(`/services/${encodeURIComponent(id)}`)
    return response.data.service
  } catch (error) {
    const fallbackService = getFallbackService(id)
    if (fallbackService) return fallbackService
    throw error
  }
}

export async function getServiceGallery(id) {
  try {
    const response = await api.get(`/services/${encodeURIComponent(id)}/gallery`)
    return response.data
  } catch (error) {
    const fallbackService = getFallbackService(id)
    if (fallbackService) return { service: fallbackService, galleryItems: fallbackService.images || [] }
    throw error
  }
}
