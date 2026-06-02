const image = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;

const galleryItems = [
  ["copper-knotless", "Copper Knotless Braids", "Long knotless braids with a warm copper tone and a soft side sweep.", "11515382", "knotless-braids", "feature"],
  ["precision-cornrows", "Precision Cornrows", "Defined rows and neat braid fall for a clean protective style.", "14883868", "cornrows", "medium"],
  ["salon-boho-session", "Boho Braiding Session", "Soft boho braids shaped with careful sectioning and a relaxed finish.", "36441633", "boho-braids", "tall"],
  ["handcrafted-kids-detail", "Gentle Kids Braids", "Comfort-led kids braid work with neat tension and a polished finish.", "15576674", "kids-braids", "medium"],
  ["studio-stitch-portrait", "Studio Stitch Braids", "Defined stitch detail with a polished studio-ready finish.", "36742666", "stitch-braids", "wide"],
  ["long-fulani-finish", "Fulani Braid Finish", "Flowing Fulani-inspired braids styled for movement and everyday wear.", "6976266", "fulani-braids", "tall"],
  ["knotless-process", "Knotless Process Detail", "A careful knotless installation with even sectioning and lightweight tension.", "9385074", "knotless-braids", "medium"],
  ["kids-braided-pair", "Kids Braided Pair", "Two comfortable kids braid looks finished with clean sections.", "8511174", "kids-braids", "compact"],
  ["boho-outdoor-profile", "Boho Outdoor Profile", "Warm outdoor portrait with soft boho braid detail framed by natural light.", "17218456", "boho-braids", "wide"],
  ["stitch-side-profile", "Sculpted Stitch Profile", "Sleek stitch rows with clean edge detail and a precise silhouette.", "11815194", "stitch-braids", "medium"],
  ["fulani-beaded-detail", "Fulani Beaded Detail", "Fulani-inspired braids with understated bead accents and a graceful finish.", "11815195", "fulani-braids", "tall"],
  ["cornrow-crown", "Cornrow Crown", "Close cornrow patterning designed for a neat long-wear result.", "11815196", "cornrows", "medium"],
  ["knotless-length", "Knotless Length", "Long knotless braids with a smooth natural fall and tidy parting.", "11815197", "knotless-braids", "tall"],
  ["boho-texture", "Boho Texture", "Layered boho texture with soft movement and an effortless finish.", "11815198", "boho-braids", "wide"],
  ["stitch-rows", "Stitch Row Detail", "Defined stitch rows arranged with balanced spacing and clean lines.", "11815199", "stitch-braids", "medium"],
  ["cornrow-detail", "Cornrow Detail", "Precision cornrows shaped for comfort, structure, and everyday ease.", "11815200", "cornrows", "compact"],
  ["fulani-profile", "Fulani Side Profile", "A polished Fulani-inspired look with face-framing braid detail.", "11815201", "fulani-braids", "tall"],
  ["kids-ponytail", "Kids Braided Ponytail", "A gentle braided ponytail made for active days and easy upkeep.", "11815202", "kids-braids", "medium"],
  ["knotless-updo", "Knotless Updo", "Versatile knotless braids gathered into an elevated protective updo.", "11815203", "knotless-braids", "wide"],
  ["boho-length", "Boho Braid Length", "Soft boho braids with flowing length and a relaxed premium finish.", "11815204", "boho-braids", "feature"],
].map(([id, title, description, photoId, style, aspect]) => ({
  id,
  title,
  description,
  image: image(photoId),
  source: `https://www.pexels.com/photo/${photoId}/`,
  style,
  aspect,
}));

module.exports = { galleryItems };
