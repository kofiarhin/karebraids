import { describe, expect, it } from 'vitest'
import { getDisplayImage } from '../data/imageLibrary.js'
import { getServicePreview, getServicePreviewImage } from './servicePreview.js'

describe('service preview helpers', () => {
  it('uses the representative library instead of service-owned image fields', () => {
    const service = {
      id: 'knotless-braids',
      name: 'Knotless Braids',
      image: 'https://example.invalid/old-image.jpg',
      primaryImage: { image: 'https://example.invalid/primary.jpg' },
      galleryImages: [{ src: 'https://example.invalid/gallery.jpg' }],
    }

    expect(getServicePreviewImage(service)).toBe(getDisplayImage(service.id).src)
    expect(getServicePreview(service)).toEqual(expect.objectContaining({
      src: getDisplayImage(service.id).src,
      alt: 'Knotless Braids representative protective styling inspiration',
      usage: 'representative',
    }))
  })

  it('uses an honest stable fallback description when the service is missing', () => {
    expect(getServicePreviewImage()).toBe(getDisplayImage().src)
    expect(getServicePreview().alt).toBe('Representative protective styling inspiration')
  })
})
