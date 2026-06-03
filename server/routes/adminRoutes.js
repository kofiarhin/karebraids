const express = require("express");
const {
  createAdminBooking,
  deleteAdminBooking,
  listAdminBookings,
  updateAdminBooking,
  updateAdminBookingStatus,
} = require("../controllers/adminBookingController");
const { getAdminSession, loginAdmin } = require("../controllers/adminAuthController");
const {
  addAdminServiceImage,
  createAdminService,
  deleteAdminService,
  deleteAdminServiceImage,
  getAdminService,
  listAdminServices,
  updateAdminService,
  updateAdminServiceImage,
} = require("../controllers/adminServiceController");
const { requireAdmin } = require("../middleware/adminAuth");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/session", requireAdmin, getAdminSession);
router.get("/bookings", requireAdmin, listAdminBookings);
router.post("/bookings", requireAdmin, createAdminBooking);
router.patch("/bookings/:id/status", requireAdmin, updateAdminBookingStatus);
router.put("/bookings/:id", requireAdmin, updateAdminBooking);
router.delete("/bookings/:id", requireAdmin, deleteAdminBooking);
router.get("/services", requireAdmin, listAdminServices);
router.post("/services", requireAdmin, createAdminService);
router.get("/services/:id", requireAdmin, getAdminService);
router.put("/services/:id", requireAdmin, updateAdminService);
router.delete("/services/:id", requireAdmin, deleteAdminService);
router.post("/services/:id/images", requireAdmin, addAdminServiceImage);
router.put("/services/:id/images/:imageId", requireAdmin, updateAdminServiceImage);
router.delete("/services/:id/images/:imageId", requireAdmin, deleteAdminServiceImage);

module.exports = router;
