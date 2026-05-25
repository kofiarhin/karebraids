const Booking = require("../models/Booking");
const {
  BOOKING_STATUSES,
  validateAdminBookingPayload,
} = require("../utils/bookingValidation");

function duplicateSlotQuery(booking, excludeId) {
  const query = {
    service: booking.service,
    date: booking.date,
    time: booking.time,
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  return query;
}

async function listAdminBookings(req, res, next) {
  try {
    const bookings = await Booking.find({})
      .sort({ date: 1, time: 1, createdAt: -1 })
      .lean();

    return res.json({ bookings });
  } catch (error) {
    return next(error);
  }
}

async function createAdminBooking(req, res, next) {
  try {
    const { booking, errors } = validateAdminBookingPayload(req.body);

    if (errors.length) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const existingBooking = await Booking.findOne(duplicateSlotQuery(booking));

    if (existingBooking) {
      return res.status(409).json({ message: "This appointment slot is already booked." });
    }

    const createdBooking = await Booking.create(booking);

    return res.status(201).json({
      message: "Booking created.",
      booking: createdBooking,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This appointment slot is already booked." });
    }

    return next(error);
  }
}

async function updateAdminBooking(req, res, next) {
  try {
    const { booking, errors } = validateAdminBookingPayload(req.body);

    if (errors.length) {
      return res.status(400).json({ message: errors[0], errors });
    }

    const existingBooking = await Booking.findOne(duplicateSlotQuery(booking, req.params.id));

    if (existingBooking) {
      return res.status(409).json({ message: "This appointment slot is already booked." });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, booking, {
      new: true,
      runValidators: true,
    });

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.json({
      message: "Booking updated.",
      booking: updatedBooking,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "This appointment slot is already booked." });
    }

    return next(error);
  }
}

async function deleteAdminBooking(req, res, next) {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.json({ message: "Booking deleted." });
  } catch (error) {
    return next(error);
  }
}

async function updateAdminBookingStatus(req, res, next) {
  try {
    const status = String(req.body.status || "").trim();

    if (!BOOKING_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Choose a valid booking status." });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.json({
      message: "Booking status updated.",
      booking: updatedBooking,
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createAdminBooking,
  deleteAdminBooking,
  listAdminBookings,
  updateAdminBooking,
  updateAdminBookingStatus,
};
