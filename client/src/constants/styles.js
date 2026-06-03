import { getGalleryItemsByServiceId, getGalleryServices } from '../data/services.js'

const sharedCareTips = [
  'Wrap your braids with a satin scarf before bed.',
  'Keep your scalp lightly moisturised without heavy product build-up.',
  'Book a refresh or removal when the style begins to loosen.',
]

const reviews = [
  { id: 'review-ama', name: 'Ama K.', rating: 5, text: 'The finish was neat, lightweight, and exactly what I asked for.', verifiedClient: true },
  { id: 'review-nia', name: 'Nia O.', rating: 5, text: 'A calm appointment, transparent pricing, and beautiful long-lasting braids.', verifiedClient: true },
]

const suitableForById = {
  'knotless-braids': 'Clients looking for a versatile protective style with a soft, natural finish.',
  'boho-braids': 'Clients who want protective styling with soft, occasion-ready texture.',
  'stitch-braids': 'Clients who prefer structured styling with clean definition.',
  cornrows: 'Clients looking for a practical protective style or a sleek base style.',
  'fulani-braids': 'Clients who want a statement protective style with elegant framing.',
  'kids-braids': 'Children who need a comfortable, neat, and practical protective style.',
}

const hairIncludedById = {
  cornrows: 'Not usually required',
  'kids-braids': 'Depends on selected style',
}

export const styleProfiles = getGalleryServices()
  .filter((service) => ['knotless-braids', 'boho-braids', 'stitch-braids', 'cornrows', 'fulani-braids', 'kids-braids'].includes(service.id))
  .map((service) => {
    const gallery = getGalleryItemsByServiceId(service.id)
    return {
      slug: service.slug,
      name: service.name,
      category: service.category,
      count: Math.max(gallery.length, 1),
      startingPrice: `£${service.priceFrom}`,
      duration: service.durationLabel.replace(/hours/g, 'hrs'),
      hairIncluded: hairIncludedById[service.id] || 'Available on request',
      image: gallery[0]?.src || service.image,
      gallery,
      description: service.shortDescription,
      suitableFor: suitableForById[service.id] || 'Clients looking for protective styling with a polished finish.',
      careTips: sharedCareTips,
      reviews,
    }
  })

export const styleProfileBySlug = Object.fromEntries(styleProfiles.map((style) => [style.slug, style]))
