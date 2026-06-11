import { describe, expect, it } from 'vitest'
import { resolveApiBaseUrl } from '../src/lib/api.js'

describe('API base URL configuration', () => {
  it('uses same-origin /api when VITE_API_URL is missing or blank', () => {
    expect(resolveApiBaseUrl(null)).toBe('/api')
    expect(resolveApiBaseUrl('')).toBe('/api')
    expect(resolveApiBaseUrl('   ')).toBe('/api')
  })

  it('normalizes an explicit API base without changing its path', () => {
    expect(resolveApiBaseUrl(' https://api.example.com/api/ ')).toBe('https://api.example.com/api')
    expect(resolveApiBaseUrl('/custom-api///')).toBe('/custom-api')
  })
})
