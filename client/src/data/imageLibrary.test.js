import { describe, expect, it } from 'vitest'
import {
  SERVICE_IMAGE_FALLBACK,
  getDisplayImage,
  getGalleryImageAlt,
  getGalleryImageSrc,
  getGalleryImageItems,
  imageLibrary,
} from './imageLibrary.js'

const requiredFields = ['id', 'src', 'alt', 'title', 'description', 'aspect', 'usage']

describe('imageLibrary', () => {
  it('contains representative images with the required metadata', () => {
    expect(imageLibrary.length).toBeGreaterThan(0)

    expect(new Set(imageLibrary.map(({ id }) => id)).size).toBe(imageLibrary.length)
    expect(new Set(imageLibrary.map(({ src }) => src)).size).toBe(imageLibrary.length)

    imageLibrary.forEach((image) => {
      expect(Object.keys(image)).toEqual(expect.arrayContaining(requiredFields))
      expect(image.src).toMatch(/^https:\/\//)
      expect(image.usage).toBe('representative')
      expect(image.alt).toBe('Representative protective styling image')
    })
  })

  it('selects a stable display image and exposes a fallback path', () => {
    expect(getDisplayImage('knotless-braids')).toBe(getDisplayImage('knotless-braids'))
    expect(getDisplayImage()).toEqual(expect.objectContaining({ usage: 'representative' }))
    expect(SERVICE_IMAGE_FALLBACK).toBe(imageLibrary[0].src)
  })

  it('returns the provided gallery source or falls back when missing', () => {
    const remoteSource = 'https://' + 'images.example.test' + '/remote.jpg'

    expect(getGalleryImageSrc({ src: imageLibrary[1].src })).toBe(imageLibrary[1].src)
    expect(getGalleryImageSrc({ src: remoteSource })).toBe(remoteSource)
    expect(getGalleryImageSrc({})).toBe(SERVICE_IMAGE_FALLBACK)
  })

  it('adds selected-style context without claiming representative images belong to that service', () => {
    const item = imageLibrary[0]
    expect(getGalleryImageAlt(item, { name: 'Knotless Braids' })).toBe(
      'Knotless Braids styling inspiration — representative image',
    )
    expect(getGalleryImageAlt(item)).toBe(item.alt)
  })

  it('returns gallery items without service or hairstyle classification', () => {
    const items = getGalleryImageItems()

    expect(items).toHaveLength(imageLibrary.length)
    items.forEach((item) => {
      expect(item).toEqual(expect.objectContaining({
        image: item.src,
        usage: 'representative',
        isRepresentativeImage: true,
      }))
      expect(item).not.toHaveProperty('serviceId')
      expect(item).not.toHaveProperty('serviceName')
      expect(item).not.toHaveProperty('serviceSlug')
      expect(item).not.toHaveProperty('serviceTitle')
      expect(item).not.toHaveProperty('category')
    })
  })
})
