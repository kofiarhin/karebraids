const { galleryItems } = require("../constants/gallery");

const positiveIntegerPattern = /^[1-9]\d*$/;

function getGallery(req, res) {
  const { limit } = req.query;
  const hasValidLimit = typeof limit === "string" && positiveIntegerPattern.test(limit);
  const items = hasValidLimit ? galleryItems.slice(0, Number(limit)) : galleryItems;

  return res.json({ galleryItems: items });
}

module.exports = { getGallery };
