import { describe, expect, it } from 'vitest'
import { getDisplayImage, getGalleryImageItems } from './imageLibrary.js'
import { getGalleryItems, getGalleryItemsByServiceId, services } from './services.js'

const businessFields = [
  'id', 'slug', 'name', 'category', 'shortDescription', 'priceFrom', 'duration',
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
