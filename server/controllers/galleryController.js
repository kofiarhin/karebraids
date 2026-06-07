const Service = require("../models/Service");
const { serializeGalleryItems, serializeService } = require("../utils/serviceSerializer");
const { slugPattern } = require("../utils/serviceValidation");

const positiveIntegerPattern = /^[1-9]\d*$/;

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
    return res.json({ services: services.map(serializeService) });
  } catch (error) {
    return next(error);
  }
}

async function getGallery(req, res, next) {
  try {
    let selectedService = null;
    let sourceServices;

    if (serviceQueryIsValid(req.query.service)) {
      selectedService = await Service.findOne({
        $or: [{ id: req.query.service }, { slug: req.query.service }],
      }).lean();
    }

    if (selectedService) sourceServices = [selectedService];
    else sourceServices = await listServices();

    const galleryItems = sourceServices.flatMap(serializeGalleryItems);

    return res.json({
      galleryItems: getLimitedItems(galleryItems, req.query.limit),
      selectedService: selectedService ? serializeService(selectedService) : null,
      reviews: selectedService ? selectedService.reviews || [] : [],
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getGallery, getGalleryServices };
