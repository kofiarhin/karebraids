import { describe, expect, it } from 'vitest'
import { formatServicePrice, getServiceStartingPrice } from './formatServicePrice.js'

describe('service price formatting', () => {
  it('uses startingPrice as the canonical value and supports the legacy priceFrom alias', () => {
    expect(getServiceStartingPrice({ startingPrice: 80, priceFrom: 95 })).toBe(80)
    expect(getServiceStartingPrice({ priceFrom: 70 })).toBe(70)
  })

  it('formats the configured currency consistently', () => {
    expect(formatServicePrice({ startingPrice: 80, currency: 'GBP' })).toBe('£80')
    expect(formatServicePrice({ priceFrom: 95 })).toBe('£95')
  })

  it('does not fabricate a zero price when pricing is unavailable', () => {
    expect(getServiceStartingPrice({})).toBeNull()
    expect(formatServicePrice({})).toBe('Price on consultation')
    expect(formatServicePrice()).toBe('Price on consultation')
  })
})
