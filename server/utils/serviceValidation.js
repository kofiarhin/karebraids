const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normalizeString(value) {
  return String(value || "").trim();
}

function normalizeNumber(value) {
  if (value === "" || value === null || value === undefined) return Number.NaN;
  return Number(value);
}

function isHttpUrl(value) {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch (error) {
    return false;
  }
}

function normalizeImagePayload(payload = {}) {
  return {
    id: normalizeString(payload.id),
    title: normalizeString(payload.title),
    description: normalizeString(payload.description),
    image: normalizeString(payload.image),
    aspect: normalizeString(payload.aspect),
  };
}

function validateImagePayload(payload = {}) {
  const image = normalizeImagePayload(payload);
  const errors = [];

  if (!slugPattern.test(image.id)) {
    errors.push("Image id must be a lowercase slug.");
  }

  if (!image.title) {
    errors.push("Image title is required.");
  }

  if (!image.description) {
    errors.push("Image description is required.");
  }

  if (!isHttpUrl(image.image)) {
    errors.push("Image URL must be a valid http or https URL.");
  }

  if (!image.aspect) {
    errors.push("Image aspect is required.");
  }

  return { image, errors };
}

function normalizeReviewPayload(payload = {}) {
  return {
    id: normalizeString(payload.id),
    name: normalizeString(payload.name),
    rating: normalizeNumber(payload.rating),
    comment: normalizeString(payload.comment),
  };
}

function validateReviewPayload(payload = {}) {
  const review = normalizeReviewPayload(payload);
  const errors = [];

  if (!review.id) {
    errors.push("Review id is required.");
  }

  if (!review.name) {
    errors.push("Review name is required.");
  }

  if (!Number.isFinite(review.rating) || review.rating < 1 || review.rating > 5) {
    errors.push("Review rating must be between 1 and 5.");
  }

  if (!review.comment) {
    errors.push("Review comment is required.");
  }

  return { review, errors };
}

function hasDuplicateIds(items) {
  const ids = items.map((item) => item.id);
  return ids.length !== new Set(ids).size;
}

function validateServicePayload(payload = {}) {
  const images = Array.isArray(payload.images) ? payload.images.map(normalizeImagePayload) : [];
  const reviews = Array.isArray(payload.reviews) ? payload.reviews.map(normalizeReviewPayload) : [];
  const service = {
    id: normalizeString(payload.id),
    title: normalizeString(payload.title),
    description: normalizeString(payload.description),
    startingPrice: normalizeNumber(payload.startingPrice),
    currency: normalizeString(payload.currency).toUpperCase(),
    duration: {
      minHours: normalizeNumber(payload.duration?.minHours),
      maxHours: normalizeNumber(payload.duration?.maxHours),
    },
    featured: Boolean(payload.featured),
    images,
    reviews,
  };
  const errors = [];

  if (!slugPattern.test(service.id)) {
    errors.push("Service id must be a lowercase slug.");
  }

  if (!service.title) {
    errors.push("Service title is required.");
  }

  if (!service.description) {
    errors.push("Service description is required.");
  }

  if (!Number.isFinite(service.startingPrice) || service.startingPrice < 0) {
    errors.push("Starting price must be zero or greater.");
  }

  if (!service.currency) {
    errors.push("Currency is required.");
  }

  if (!Number.isFinite(service.duration.minHours) || service.duration.minHours < 0) {
    errors.push("Minimum duration must be zero or greater.");
  }

  if (!Number.isFinite(service.duration.maxHours) || service.duration.maxHours < 0) {
    errors.push("Maximum duration must be zero or greater.");
  }

  if (
    Number.isFinite(service.duration.minHours) &&
    Number.isFinite(service.duration.maxHours) &&
    service.duration.maxHours < service.duration.minHours
  ) {
    errors.push("Maximum duration must be greater than or equal to minimum duration.");
  }

  images.forEach((imagePayload) => {
    errors.push(...validateImagePayload(imagePayload).errors);
  });

  reviews.forEach((reviewPayload) => {
    errors.push(...validateReviewPayload(reviewPayload).errors);
  });

  if (hasDuplicateIds(images)) {
    errors.push("Image ids must be unique within a service.");
  }

  if (hasDuplicateIds(reviews)) {
    errors.push("Review ids must be unique within a service.");
  }

  return { service, errors };
}

module.exports = {
  isHttpUrl,
  slugPattern,
  validateImagePayload,
  validateReviewPayload,
  validateServicePayload,
};
