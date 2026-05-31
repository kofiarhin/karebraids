const ContactMessage = require("../models/ContactMessage");
const { validateContactPayload } = require("../utils/contactValidation");

async function createContactMessage(req, res, next) {
  try {
    const { contactMessage, errors } = validateContactPayload(req.body);

    if (errors.length) {
      return res.status(400).json({ message: errors[0], errors });
    }

    await ContactMessage.create(contactMessage);

    return res.status(201).json({
      success: true,
      message: "Your message has been received.",
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createContactMessage,
};
