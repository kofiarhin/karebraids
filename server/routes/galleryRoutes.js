const express = require("express");
const { getGallery, getGalleryServices } = require("../controllers/galleryController");

const router = express.Router();

router.get("/services", getGalleryServices);
router.get("/", getGallery);

module.exports = router;
