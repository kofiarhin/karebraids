const Service = require("../models/Service");
const { serializeGalleryItems, serializeService } = require("../utils/serviceSerializer");

function buildServiceFilters(query = {}) {
  const filters = {};
  ["featured", "bookingEnabled", "galleryEnabled"].forEach((field) => {
    if (query[field] === "true") filters[field] = true;
  });
  if (typeof query.status === "string" && query.status.trim()) filters.status = query.status.trim();
  return filters;
}

function findServiceByPublicId(id) {
  return Service.findOne({ $or: [{ id }, { slug: id }] }).lean();
}

async function getServices(req, res, next) {
  try {
    const services = await Service.find(buildServiceFilters(req.query)).sort({ createdAt: 1, _id: 1 }).lean();
    return res.json({ services: services.map(serializeService) });
  } catch (error) {
    return next(error);
  }
}

async function getService(req, res, next) {
  try {
    const service = await findServiceByPublicId(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found." });
    return res.json({ service: serializeService(service) });
  } catch (error) {
    return next(error);
  }
}

async function getServiceGallery(req, res, next) {
  try {
    const service = await findServiceByPublicId(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found." });
    return res.json({ service: serializeService(service), galleryItems: serializeGalleryItems(service) });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getService, getServiceGallery, getServices };
