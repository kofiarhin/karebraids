const { SERVICES, TIME_SLOTS } = require("../constants/services");

function parseDateOnly(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) {
    return null;
  }

  const parsed = new Date(`${date}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function todayUtc() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function isMondayToSaturday(date) {
  const day = date.getUTCDay();
  return day >= 1 && day <= 6;
}

function normalizeBookingPayload(payload) {
  return {
    service: String(payload.service || "").trim(),
    date: String(payload.date || "").trim(),
    time: String(payload.time || "").trim(),
    fullName: String(payload.fullName || "").trim(),
    email: String(payload.email || "").trim().toLowerCase(),
    phone: String(payload.phone || "").trim(),
    preferredLocation: String(payload.preferredLocation || "").trim(),
    notes: String(payload.notes || "").trim(),
  };
}

function validateBookingPayload(payload) {
  const booking = normalizeBookingPayload(payload);
  const errors = [];
  const parsedDate = parseDateOnly(booking.date);

  if (!SERVICES.includes(booking.service)) {
    errors.push("Choose a valid service.");
  }

  if (!parsedDate) {
    errors.push("Choose a valid date.");
  } else {
    if (!isMondayToSaturday(parsedDate)) {
      errors.push("Bookings are available Monday to Saturday.");
    }

    if (parsedDate < todayUtc()) {
      errors.push("Choose a future date.");
    }
  }

  if (!TIME_SLOTS.includes(booking.time)) {
    errors.push("Choose a valid time.");
  }

  if (booking.fullName.length < 2) {
    errors.push("Full name is required.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(booking.email)) {
    errors.push("Valid email is required.");
  }

  if (!/^[+\d][\d\s()-]{6,}$/.test(booking.phone)) {
    errors.push("Valid phone number is required.");
  }

  if (!booking.preferredLocation) {
    errors.push("Preferred location is required.");
  }

  if (booking.notes.length > 500) {
    errors.push("Notes must be 500 characters or fewer.");
  }

  return {
    booking,
    errors,
  };
}

function validateAvailabilityQuery(query) {
  const service = String(query.service || "").trim();
  const date = String(query.date || "").trim();
  const parsedDate = parseDateOnly(date);
  const errors = [];

  if (!SERVICES.includes(service)) {
    errors.push("Choose a valid service.");
  }

  if (!parsedDate) {
    errors.push("Choose a valid date.");
  } else if (!isMondayToSaturday(parsedDate)) {
    errors.push("Bookings are available Monday to Saturday.");
  } else if (parsedDate < todayUtc()) {
    errors.push("Choose a future date.");
  }

  return {
    service,
    date,
    errors,
  };
}

module.exports = {
  validateBookingPayload,
  validateAvailabilityQuery,
};
