import { describe, expect, it } from 'vitest'
import { aboutImages, karenProfile, specialties } from './aboutPageData.js'

describe('About page image configuration', () => {
  it('uses valid local images for Karen and every specialty', () => {
    expect(karenProfile.image.src).toMatch(/^\/images\/.+\.jpg$/)
    expect(aboutImages.hero.src).toMatch(/^\/images\/.+\.jpg$/)
    expect(aboutImages.experience.src).toMatch(/^\/images\/.+\.jpg$/)

    specialties.forEach((specialty) => {
      expect(specialty.image).toMatch(/^\/images\/.+\.jpg$/)
      expect(specialty.alt).toContain(specialty.title)
      expect(specialty.alt).toContain('representative')
    })

    expect(new Set(specialties.map(({ image }) => image)).size).toBeGreaterThan(1)
  })
})
