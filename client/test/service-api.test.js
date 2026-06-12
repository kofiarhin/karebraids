import { beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '../src/lib/api.js'
import { getGallery, getGalleryItems, getGalleryServices } from '../src/services/galleryService.js'
import { getGalleryImageItems } from '../src/data/imageLibrary.js'
import { getGalleryServices as getLocalGalleryServices } from '../src/data/services.js'
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

  it('loads gallery data and services through backend endpoints while replacing remote images locally', async () => {
    api.get.mockResolvedValueOnce({ data: { galleryItems: [{ id: 'remote', src: 'https://images.pexels.com/remote.jpg' }] } }).mockResolvedValueOnce({ data: { services: [] } })
    await expect(getGallery({ limit: 4, service: 'knotless-braids' })).resolves.toEqual(expect.objectContaining({
      galleryItems: getGalleryImageItems().slice(0, 4).map((item) => ({ ...item, contextServiceId: 'knotless-braids' })),
    }))
    await getGalleryServices()
    expect(api.get).toHaveBeenNthCalledWith(1, '/gallery', { params: { limit: 4, service: 'knotless-braids' } })
    expect(api.get).toHaveBeenNthCalledWith(2, '/gallery/services')
  })

  it.each([...new Set(getLocalGalleryServices().flatMap(({ id, slug }) => [id, slug]))])(
    'replaces API image URLs with local representative paths for the %s filter',
    async (service) => {
      api.get.mockResolvedValue({
        data: {
          galleryItems: [
            { id: `${service}-01`, src: 'https://images.pexels.com/remote-1.jpg' },
            { id: `${service}-02`, image: 'https://images.pexels.com/remote-2.jpg' },
          ],
        },
      })

      const items = await getGalleryItems({ limit: 3, service: ` ${service} ` })

      expect(items).toHaveLength(3)
      items.forEach((item) => {
        expect(item.src).toMatch(/^\/images\/.+\.jpg$/)
        expect(item.image).toBe(item.src)
        expect(item.contextServiceId).toBe(service)
        expect(JSON.stringify(item)).not.toMatch(/https?:\/\//)
      })
      expect(api.get).toHaveBeenCalledWith('/gallery', {
        params: { limit: 3, service },
      })
    },
  )

  it('uses the full local representative library for the all-services gallery', async () => {
    api.get.mockResolvedValue({ data: { galleryItems: [{ src: 'https://images.pexels.com/remote.jpg' }] } })

    await expect(getGalleryItems({ limit: 0, service: '   ' })).resolves.toEqual(getGalleryImageItems())

    expect(api.get).toHaveBeenCalledWith('/gallery', {
      params: { limit: undefined, service: undefined },
    })
  })
})
