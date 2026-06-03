const Service = require("../models/Service");
const { slugPattern } = require("../utils/serviceValidation");

const positiveIntegerPattern = /^[1-9]\d*$/;

function toPreviewService(service) {
  const { images = [], reviews, ...metadata } = service;

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

function serviceQueryIsValid(serviceId) {
  return typeof serviceId === "string" && slugPattern.test(serviceId);
}

async function listServices() {
  return Service.find({}).sort({ createdAt: 1, _id: 1 }).lean();
}

async function getGalleryServices(req, res, next) {
  try {
    const services = await listServices();

    return res.json({ services: services.map(toPreviewService) });
  } catch (error) {
    return next(error);
  }
}

async function getGallery(req, res, next) {
  try {
    let selectedService = null;
    let sourceServices;

    if (serviceQueryIsValid(req.query.service)) {
      selectedService = await Service.findOne({ id: req.query.service }).lean();
    }

    if (selectedService) {
      sourceServices = [selectedService];
    } else {
      sourceServices = await listServices();
    }

    const galleryItems = sourceServices.flatMap((service) =>
      (service.images || []).map((image) => toGalleryItem(service, image)),
    );
    const items = getLimitedItems(galleryItems, req.query.limit);

    return res.json({
      galleryItems: items,
      selectedService: selectedService ? toPreviewService(selectedService) : null,
      reviews: selectedService ? selectedService.reviews || [] : [],
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getGallery, getGalleryServices };
