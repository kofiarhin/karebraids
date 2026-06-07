const express = require("express");
const { getService, getServiceGallery, getServices } = require("../controllers/serviceController");

const router = express.Router();

router.get("/", getServices);
router.get("/:id/gallery", getServiceGallery);
router.get("/:id", getService);

module.exports = router;
