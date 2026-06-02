export const SERVICE_PREVIEW_FALLBACK_IMAGE =
  'https://images.pexels.com/photos/11515382/pexels-photo-11515382.jpeg?auto=compress&cs=tinysrgb&w=1200'

export function getServicePreviewImage(service) {
  return service?.previewImage?.image || SERVICE_PREVIEW_FALLBACK_IMAGE
}
