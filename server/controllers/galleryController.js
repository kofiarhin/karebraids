const galleryItems = require("../data/gallery.json");

const positiveIntegerPattern = /^[1-9]\d*$/;
const stylePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getGallery(req, res) {
  const { limit, style } = req.query;

  const hasValidStyle = typeof style === "string" && stylePattern.test(style);
  const hasValidLimit = typeof limit === "string" && positiveIntegerPattern.test(limit);

  const filteredItems = hasValidStyle
    ? galleryItems.filter((item) => item.style === style)
    : galleryItems;

  const items = hasValidLimit ? filteredItems.slice(0, Number(limit)) : filteredItems;

  return res.json({ galleryItems: items });
}

module.exports = { getGallery };
