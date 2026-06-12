const DEFAULT_CURRENCY = 'GBP'
const PRICE_UNAVAILABLE_LABEL = 'Price on consultation'

export function getServiceStartingPrice(service) {
  const value = service?.startingPrice ?? service?.priceFrom ?? service?.fromPrice
  const price = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(price) && price >= 0 ? price : null
}

export function formatServicePrice(service, fallback = PRICE_UNAVAILABLE_LABEL) {
  const price = getServiceStartingPrice(service)
  if (price === null) return fallback

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: service?.currency || DEFAULT_CURRENCY,
    maximumFractionDigits: 0,
  }).format(price)
}
