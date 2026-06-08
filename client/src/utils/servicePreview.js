import { SERVICE_IMAGE_FALLBACK, getDisplayImage } from '../data/imageLibrary.js'

export const SERVICE_PREVIEW_FALLBACK_IMAGE = SERVICE_IMAGE_FALLBACK

export function getServicePreviewImage(service) {
  return getDisplayImage(service?.id).src
}
