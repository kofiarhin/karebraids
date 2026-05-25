const express = require("express");
const {
  createAdminBooking,
  deleteAdminBooking,
  listAdminBookings,
  updateAdminBooking,
  updateAdminBookingStatus,
} = require("../controllers/adminBookingController");
const { getAdminSession, loginAdmin } = require("../controllers/adminAuthController");
const { requireAdmin } = require("../middleware/adminAuth");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/session", requireAdmin, getAdminSession);
router.get("/bookings", requireAdmin, listAdminBookings);
router.post("/bookings", requireAdmin, createAdminBooking);
router.patch("/bookings/:id/status", requireAdmin, updateAdminBookingStatus);
router.put("/bookings/:id", requireAdmin, updateAdminBooking);
router.delete("/bookings/:id", requireAdmin, deleteAdminBooking);

module.exports = router;
