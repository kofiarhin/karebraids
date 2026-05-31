const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateContactPayload(payload = {}) {
  const contactMessage = {
    fullName: cleanString(payload.fullName),
    email: cleanString(payload.email).toLowerCase(),
    phone: cleanString(payload.phone),
    message: cleanString(payload.message),
    status: "new",
  };
  const errors = [];

  if (!contactMessage.fullName) errors.push("Full name is required.");
  if (!contactMessage.email) errors.push("Email is required.");
  if (!contactMessage.phone) errors.push("Phone is required.");
  if (!contactMessage.message) errors.push("Message is required.");

  if (contactMessage.email && !EMAIL_PATTERN.test(contactMessage.email)) {
    errors.push("Enter a valid email address.");
  }

  return { contactMessage, errors };
}

module.exports = {
  validateContactPayload,
};
