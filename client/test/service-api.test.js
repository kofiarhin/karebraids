import { beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '../src/lib/api.js'
import { getGallery, getGalleryItems, getGalleryServices } from '../src/services/galleryService.js'
import { getService, getServiceGallery, getServices } from '../src/services/serviceService.js'

vi.mock('../src/lib/api.js', () => ({ api: { get: vi.fn() } }))

describe('service and gallery API clients', () => {
  beforeEach(() => vi.clearAllMocks())

  it('loads filtered services through the shared API client', async () => {
    api.get.mockResolvedValue({ data: { services: [{ id: 'knotless-braids' }] } })
    await expect(getServices({ featured: true, status: 'available' })).resolves.toEqual([{ id: 'knotless-braids' }])
    expect(api.get).toHaveBeenCalledWith('/services', { params: { featured: true, status: 'available' } })
  })

  it('loads a service and its gallery by encoded public id', async () => {
    api.get.mockResolvedValueOnce({ data: { service: { id: 'kids-braids' } } }).mockResolvedValueOnce({ data: { galleryItems: [] } })
    await expect(getService('kids braids')).resolves.toEqual({ id: 'kids-braids' })
    await expect(getServiceGallery('kids braids')).resolves.toEqual({ galleryItems: [] })
    expect(api.get).toHaveBeenNthCalledWith(1, '/services/kids%20braids')
    expect(api.get).toHaveBeenNthCalledWith(2, '/services/kids%20braids/gallery')
  })

  it('loads gallery data and services through backend endpoints', async () => {
    api.get.mockResolvedValueOnce({ data: { galleryItems: [] } }).mockResolvedValueOnce({ data: { services: [] } })
    await getGallery({ limit: 4, service: 'knotless-braids' })
    await getGalleryServices()
    expect(api.get).toHaveBeenNthCalledWith(1, '/gallery', { params: { limit: 4, service: 'knotless-braids' } })
    expect(api.get).toHaveBeenNthCalledWith(2, '/gallery/services')
  })

  it('loads gallery items from the backend with normalized query parameters', async () => {
    const galleryItems = [{ id: 'knotless-braids-01' }]
    api.get.mockResolvedValue({ data: { galleryItems } })

    await expect(getGalleryItems({ limit: 3, service: ' knotless-braids ' })).resolves.toEqual(galleryItems)

    expect(api.get).toHaveBeenCalledWith('/gallery', {
      params: {
        limit: 3,
        service: 'knotless-braids',
      },
    })
  })

  it('normalizes invalid gallery item options and falls back to an empty array', async () => {
    api.get.mockResolvedValue({ data: {} })

    await expect(getGalleryItems({ limit: 0, service: '   ' })).resolves.toEqual([])

    expect(api.get).toHaveBeenCalledWith('/gallery', {
      params: {
        limit: undefined,
        service: undefined,
      },
    })
  })
})
