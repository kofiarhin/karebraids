import { describe, expect, it } from 'vitest'
import { getDisplayImage } from '../data/imageLibrary.js'
import { getServicePreviewImage } from './servicePreview.js'

describe('getServicePreviewImage', () => {
  it('uses the representative library instead of service-owned image fields', () => {
    const service = {
      id: 'knotless-braids',
      image: 'https://example.invalid/old-image.jpg',
      primaryImage: { image: 'https://example.invalid/primary.jpg' },
      galleryImages: [{ src: 'https://example.invalid/gallery.jpg' }],
    }

    expect(getServicePreviewImage(service)).toBe(getDisplayImage(service.id).src)
  })

  it('uses the stable fallback selection when the service is missing', () => {
    expect(getServicePreviewImage()).toBe(getDisplayImage().src)
  })
})
