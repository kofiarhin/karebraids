function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function formatDurationLabel(duration = {}) {
  const { minHours, maxHours } = duration;
  if (!Number.isFinite(minHours) || !Number.isFinite(maxHours)) return "";
  if (minHours === maxHours) return `${minHours} ${minHours === 1 ? "hour" : "hours"}`;
  return `${minHours}–${maxHours} hours`;
}

function serializeImage(image) {
  if (!image) return null;
  const source = firstDefined(image.image, image.src);
  if (!source) return null;

  return {
    id: image.id,
    title: image.title || "",
    description: image.description || "",
    image: source,
    src: source,
    alt: image.alt || image.title || "",
    aspect: image.aspect || "",
  };
}

function serializeService(service = {}) {
  const images = (service.images || []).map(serializeImage).filter(Boolean);
  const primaryImage = serializeImage(service.primaryImage) || images[0] || null;
  const id = firstDefined(service.id, service.slug);
  const slug = firstDefined(service.slug, service.id);
  const name = firstDefined(service.name, service.title, "");
  const title = firstDefined(service.title, service.name, "");
  const startingPrice = Number(firstDefined(service.startingPrice, service.priceFrom, service.fromPrice, 0));

  return {
    id,
    slug,
    name,
    title,
    category: service.category || "Braids",
    shortDescription: service.shortDescription || service.description || "",
    description: service.description || service.shortDescription || "",
    startingPrice,
    priceFrom: startingPrice,
    fromPrice: startingPrice,
    currency: service.currency || "GBP",
    duration: service.duration || null,
    durationLabel: service.durationLabel || formatDurationLabel(service.duration),
    featured: Boolean(service.featured),
    bookingEnabled: service.bookingEnabled !== false,
    galleryEnabled: service.galleryEnabled !== false,
    status: service.status || "available",
    primaryImage,
    previewImage: primaryImage,
    image: primaryImage?.image || "",
    images,
    galleryImages: images,
    reviews: service.reviews || [],
  };
}

function serializeGalleryItem(service, image) {
  const normalizedService = serializeService(service);
  const normalizedImage = serializeImage(image);
  if (!normalizedImage) return null;

  return {
    ...normalizedImage,
    serviceId: normalizedService.id,
    serviceName: normalizedService.name,
    serviceSlug: normalizedService.slug,
    serviceTitle: normalizedService.title,
    category: normalizedService.category,
  };
}

function serializeGalleryItems(service) {
  return (service.images || []).map((image) => serializeGalleryItem(service, image)).filter(Boolean);
}

module.exports = { serializeGalleryItems, serializeService };
