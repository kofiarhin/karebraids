export const SERVICE_PREVIEW_FALLBACK_IMAGE =
  'https://images.pexels.com/photos/11515382/pexels-photo-11515382.jpeg?auto=compress&cs=tinysrgb&w=1200'

export function getServicePreviewImage(service) {
  return (
    service?.primaryImage?.image ||
    service?.previewImage?.image ||
    service?.galleryImages?.[0]?.image ||
    service?.galleryImages?.[0]?.src ||
    service?.images?.[0]?.image ||
    service?.image ||
    SERVICE_PREVIEW_FALLBACK_IMAGE
  )
}
