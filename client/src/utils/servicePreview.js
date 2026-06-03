import { SERVICE_IMAGE_FALLBACK } from '../data/services.js'

export const SERVICE_PREVIEW_FALLBACK_IMAGE = SERVICE_IMAGE_FALLBACK

export function getServicePreviewImage(service) {
  return service?.previewImage?.image || service?.galleryImages?.[0]?.src || service?.image || SERVICE_IMAGE_FALLBACK
}
