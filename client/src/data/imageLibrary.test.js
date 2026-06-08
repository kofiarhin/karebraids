import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import {
  SERVICE_IMAGE_FALLBACK,
  getDisplayImage,
  getGalleryImageItems,
  imageLibrary,
} from './imageLibrary.js'

const requiredFields = ['id', 'src', 'alt', 'title', 'description', 'aspect', 'usage']

describe('imageLibrary', () => {
  it('contains only existing local representative public images with the required metadata', () => {
    expect(imageLibrary.length).toBeGreaterThan(0)

    imageLibrary.forEach((image) => {
      expect(Object.keys(image)).toEqual(expect.arrayContaining(requiredFields))
      expect(image.src).toMatch(/^\/images\/[^/]+\.jpg$/)
      expect(image.src).not.toContain('https://')
      expect(image.usage).toBe('representative')
      expect(image.alt).toBe('Representative protective styling image')
      expect(existsSync(resolve(cwd(), 'public', image.src.replace('/images/', 'images/')))).toBe(true)
    })
  })

  it('selects a stable display image and exposes a local fallback path', () => {
    expect(getDisplayImage('knotless-braids')).toBe(getDisplayImage('knotless-braids'))
    expect(getDisplayImage()).toEqual(expect.objectContaining({ usage: 'representative' }))
    expect(SERVICE_IMAGE_FALLBACK).toBe(imageLibrary[0].src)
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
