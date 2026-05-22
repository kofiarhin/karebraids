const express = require("express");
const {
  createBooking,
  getAvailability,
} = require("../controllers/bookingController");

const router = express.Router();

router.get("/availability", getAvailability);
router.post("/", createBooking);

module.exports = router;
