const Booking = require("../models/Booking");
const Service = require("../models/Service");
const { TIME_SLOTS } = require("../constants/services");
const {
  validateAvailabilityQuery,
  validateBookingPayload,
} = require("../utils/bookingValidation");

async function isBookableService(service) {
  return Service.exists({ name: service, bookingEnabled: true, status: "available" });
}

async function getAvailability(req, res, next) {
  try {
    const { service, date, errors } = validateAvailabilityQuery(req.query);

    if (errors.length) {
      return res.status(400).json({ message: errors[0], errors });
    }

    if (!(await isBookableService(service))) {
      return res.status(400).json({ message: "Choose an available service." });
    }

    const bookedSlots = await Booking.find({ service, date }).select("time -_id").lean();
    const bookedTimes = new Set(bookedSlots.map((slot) => slot.time));
    const slots = TIME_SLOTS.filter((slot) => !bookedTimes.has(slot));

    return res.json({
      service,
      date,
      slots,
      message: slots.length ? "Appointments are available." : "No appointments are available.",
    });
  } catch (error) {
    return next(error);
  }
}

async function createBooking(req, res, next) {
  try {
    const { booking, errors } = validateBookingPayload(req.body);

    if (errors.length) {
      return res.status(400).json({ message: errors[0], errors });
    }

    if (!(await isBookableService(booking.service))) {
      return res.status(400).json({ message: "Choose an available service." });
    }

    const existingBooking = await Booking.findOne({
      service: booking.service,
      date: booking.date,
      time: booking.time,
    });

    if (existingBooking) {
      return res.status(409).json({
        message: "This appointment slot is already booked.",
      });
    }

    const createdBooking = await Booking.create(booking);

    return res.status(201).json({
      message: "Booking request received.",
      booking: createdBooking,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This appointment slot is already booked.",
      });
    }

    return next(error);
  }
}

module.exports = {
  createBooking,
  getAvailability,
};
