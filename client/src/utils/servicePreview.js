import { SERVICE_IMAGE_FALLBACK, getDisplayImage } from '../data/imageLibrary.js'

export const SERVICE_PREVIEW_FALLBACK_IMAGE = SERVICE_IMAGE_FALLBACK

export function getServicePreview(service) {
  const image = getDisplayImage(service?.id)
  const styleName = service?.name?.trim()

  return {
    ...image,
    alt: styleName
      ? `${styleName} representative protective styling inspiration`
      : 'Representative protective styling inspiration',
  }
}

export function getServicePreviewImage(service) {
  return getServicePreview(service).src
}
