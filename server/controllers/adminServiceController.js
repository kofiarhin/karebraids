const Service = require("../models/Service");
const { validateImagePayload, validateServicePayload } = require("../utils/serviceValidation");

function duplicateServiceResponse(res) {
  return res.status(409).json({ message: "A service with this id already exists." });
}

function toPlainService(service) {
  if (!service) return service;
  if (typeof service.toObject === "function") return service.toObject();
  return service;
}

function handleValidationResponse(res, errors) {
  return res.status(400).json({ message: errors[0], errors });
}

async function listAdminServices(req, res, next) {
  try {
    const services = await Service.find({}).sort({ createdAt: 1, _id: 1 }).lean();

    return res.json({ services });
  } catch (error) {
    return next(error);
  }
}

async function getAdminService(req, res, next) {
  try {
    const service = await Service.findOne({ id: req.params.id }).lean();

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    return res.json({ service });
  } catch (error) {
    return next(error);
  }
}

async function createAdminService(req, res, next) {
  try {
    const { service, errors } = validateServicePayload(req.body);

    if (errors.length) {
      return handleValidationResponse(res, errors);
    }

    const createdService = await Service.create(service);

    return res.status(201).json({ message: "Service created.", service: toPlainService(createdService) });
  } catch (error) {
    if (error.code === 11000) {
      return duplicateServiceResponse(res);
    }

    return next(error);
  }
}

async function updateAdminService(req, res, next) {
  try {
    const { service, errors } = validateServicePayload({ ...req.body, id: req.params.id });

    if (errors.length) {
      return handleValidationResponse(res, errors);
    }

    const updatedService = await Service.findOneAndUpdate({ id: req.params.id }, service, {
      new: true,
      runValidators: true,
    });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found." });
    }

    return res.json({ message: "Service updated.", service: toPlainService(updatedService) });
  } catch (error) {
    if (error.code === 11000) {
      return duplicateServiceResponse(res);
    }

    return next(error);
  }
}

async function deleteAdminService(req, res, next) {
  try {
    const deletedService = await Service.findOneAndDelete({ id: req.params.id });

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found." });
    }

    return res.json({ message: "Service deleted." });
  } catch (error) {
    return next(error);
  }
}

async function findServiceDocument(serviceId) {
  return Service.findOne({ id: serviceId });
}

async function addAdminServiceImage(req, res, next) {
  try {
    const { image, errors } = validateImagePayload(req.body);

    if (errors.length) {
      return handleValidationResponse(res, errors);
    }

    const service = await findServiceDocument(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    if ((service.images || []).some((existingImage) => existingImage.id === image.id)) {
      return res.status(409).json({ message: "A service image with this id already exists." });
    }

    service.images.push(image);
    await service.save();

    return res.status(201).json({
      message: "Service image added.",
      service: toPlainService(service),
      image,
    });
  } catch (error) {
    return next(error);
  }
}

async function updateAdminServiceImage(req, res, next) {
  try {
    const { image, errors } = validateImagePayload({ ...req.body, id: req.params.imageId });

    if (errors.length) {
      return handleValidationResponse(res, errors);
    }

    const service = await findServiceDocument(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    const imageIndex = (service.images || []).findIndex((existingImage) => existingImage.id === req.params.imageId);

    if (imageIndex === -1) {
      return res.status(404).json({ message: "Service image not found." });
    }

    if (typeof service.images.set === "function") {
      service.images.set(imageIndex, image);
    } else {
      service.images[imageIndex] = image;
    }
    await service.save();

    return res.json({
      message: "Service image updated.",
      service: toPlainService(service),
      image,
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteAdminServiceImage(req, res, next) {
  try {
    const service = await findServiceDocument(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    const imageIndex = (service.images || []).findIndex((image) => image.id === req.params.imageId);

    if (imageIndex === -1) {
      return res.status(404).json({ message: "Service image not found." });
    }

    service.images.splice(imageIndex, 1);
    await service.save();

    return res.json({ message: "Service image deleted.", service: toPlainService(service) });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  addAdminServiceImage,
  createAdminService,
  deleteAdminService,
  deleteAdminServiceImage,
  getAdminService,
  listAdminServices,
  updateAdminService,
  updateAdminServiceImage,
};
