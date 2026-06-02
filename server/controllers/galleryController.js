const services = require("../data/services.json");

const positiveIntegerPattern = /^[1-9]\d*$/;
const servicePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function toPreviewService(service) {
  const { images, reviews, ...metadata } = service;

  return {
    ...metadata,
    previewImage: images[0] ?? null,
  };
}

function toGalleryItem(service, image) {
  return {
    ...image,
    serviceId: service.id,
    serviceTitle: service.title,
  };
}

function getLimitedItems(items, limit) {
  const hasValidLimit = typeof limit === "string" && positiveIntegerPattern.test(limit);
  return hasValidLimit ? items.slice(0, Number(limit)) : items;
}

function findService(serviceId) {
  if (typeof serviceId !== "string" || !servicePattern.test(serviceId)) return null;
  return services.find((service) => service.id === serviceId) ?? null;
}

function getGalleryServices(req, res) {
  return res.json({ services: services.map(toPreviewService) });
}

function getGallery(req, res) {
  const selectedService = findService(req.query.service);
  const sourceServices = selectedService ? [selectedService] : services;
  const galleryItems = sourceServices.flatMap((service) => service.images.map((image) => toGalleryItem(service, image)));
  const items = getLimitedItems(galleryItems, req.query.limit);

  return res.json({
    galleryItems: items,
    selectedService: selectedService ? toPreviewService(selectedService) : null,
    reviews: selectedService ? selectedService.reviews : [],
  });
}

module.exports = { getGallery, getGalleryServices };
