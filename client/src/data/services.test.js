import { describe, expect, it } from 'vitest'
import { getDisplayImage, getGalleryImageItems } from './imageLibrary.js'
import { getGalleryItems, getGalleryItemsByServiceId, services } from './services.js'

const businessFields = [
  'id', 'slug', 'name', 'category', 'shortDescription', 'startingPrice', 'duration',
  'featured', 'bookingEnabled', 'galleryEnabled', 'status',
]

describe('local service compatibility data', () => {
  it('keeps business fields canonical and derives representative compatibility images', () => {
    services.forEach((service) => {
      expect(service).toEqual(expect.objectContaining(
        Object.fromEntries(businessFields.map((field) => [field, expect.anything()])),
      ))
      expect(service).not.toHaveProperty('galleryImages')
      expect(service.image).toBe(getDisplayImage(service.id).src)
      expect(service.previewImage).toEqual(getDisplayImage(service.id))
      expect(service.isRepresentativeImage).toBe(true)
    })
  })


  it('does not accidentally reuse a preview mapping across different services', () => {
    expect(new Set(services.map(({ image }) => image)).size).toBe(services.length)
  })

  it('keeps offline prices aligned with the canonical service seed values', () => {
    expect(Object.fromEntries(services.map(({ id, startingPrice }) => [id, startingPrice]))).toEqual({
      'knotless-braids': 80,
      'boho-knotless-braids': 95,
      'fulani-braids': 85,
      'stitch-braids': 45,
      cornrows: 35,
      'tribal-braids': 90,
      'feed-in-braids': 55,
      'goddess-braids': 100,
      'kids-braids': 30,
      'box-braids': 70,
      twists: 65,
    })
  })

  it('returns the central representative gallery for all and specific service context', () => {
    expect(getGalleryItems()).toEqual(getGalleryImageItems())
    expect(getGalleryItemsByServiceId('all')).toEqual(getGalleryImageItems())

    const contextualItems = getGalleryItemsByServiceId(services[0].id)
    expect(contextualItems).toHaveLength(getGalleryImageItems().length)
    contextualItems.forEach((item) => {
      expect(item).toEqual(expect.objectContaining({
        usage: 'representative',
        contextServiceId: services[0].id,
      }))
      expect(item).not.toHaveProperty('serviceId')
      expect(item).not.toHaveProperty('category')
    })
  })
})
