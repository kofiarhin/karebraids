const REPRESENTATIVE_ALT = 'Representative protective styling image'

const curatedImages = [
  ['pexels-alesiakozik-7295000.jpg', 'Braiding Inspiration', 'feature'],
  ['pexels-ayoola-duke-1937950-9520394.jpg', 'Styling Detail', 'medium'],
  ['pexels-boko-shots-812604874-33119264.jpg', 'Protective Styling', 'tall'],
  ['pexels-boko-shots-812604874-33603051.jpg', 'Clean Finish', 'wide'],
  ['pexels-emerson-vasquez-172633476-13294055.jpg', 'Salon Care', 'tall'],
  ['pexels-estelle-umaes-16615622-7759977.jpg', 'Styling Detail', 'medium'],
  ['pexels-lovetosmile-4671331.jpg', 'Braiding Inspiration', 'wide'],
  ['pexels-madknoxxdeluxe-31653958.jpg', 'Protective Styling', 'medium'],
  ['pexels-magnolia-tadeo-2149496967-35226003.jpg', 'Clean Finish', 'compact'],
  ['pexels-mayaramombellifotografias-32967074.jpg', 'Salon Care', 'feature'],
  ['pexels-oluwapamilerinayo-ajala-1663970972-36426400.jpg', 'Braiding Inspiration', 'tall'],
  ['pexels-pavel-danilyuk-8638552.jpg', 'Styling Detail', 'wide'],
  ['pexels-pride-x-zm-240570403-12433560.jpg', 'Protective Styling', 'medium'],
  ['pexels-skin99-8266868.jpg', 'Clean Finish', 'compact'],
  ['pexels-wayne-fotografias-1812121-5382483.jpg', 'Salon Care', 'tall'],
]

export const imageLibrary = curatedImages.map(([filename, title, aspect], index) => ({
  id: `curated-visual-${String(index + 1).padStart(3, '0')}`,
  src: `/images/${filename}`,
  alt: REPRESENTATIVE_ALT,
  title,
  description: 'Representative styling image used for inspiration.',
  aspect,
  usage: 'representative',
}))

export const SERVICE_IMAGE_FALLBACK = imageLibrary[0].src

function getStableIndex(seed, length) {
  if (!length) return 0

  return String(seed || 'karebraids')
    .split('')
    .reduce((total, character) => total + character.charCodeAt(0), 0) % length
}

export function getDisplayImage(seed) {
  return imageLibrary[getStableIndex(seed, imageLibrary.length)] || imageLibrary[0]
}

export function getGalleryImageItems() {
  return imageLibrary.map((image) => ({
    ...image,
    image: image.src,
    isRepresentativeImage: true,
  }))
}
