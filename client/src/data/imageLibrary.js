const REPRESENTATIVE_ALT = 'Representative protective styling image'

const curatedImages = [
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393950/karebraids/pexels-alesiakozik-7295000_geznud.jpg',
    title: 'Braiding Inspiration',
    aspect: 'feature',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394080/karebraids/pexels-alesiakozik-7295013_kc3yev.jpg',
    title: 'Styling Detail',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394105/karebraids/pexels-mayaramombellifotografias-32967074_dev1in.jpg',
    title: 'Salon Care',
    aspect: 'feature',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394106/karebraids/pexels-wayne-fotografias-1812121-5382483_kzoezf.jpg',
    title: 'Clean Finish',
    aspect: 'tall',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394104/karebraids/pexels-pavel-danilyuk-8638552_vajswp.jpg',
    title: 'Protective Styling',
    aspect: 'wide',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394104/karebraids/pexels-skin99-8266868_ybr3nd.jpg',
    title: 'Styling Detail',
    aspect: 'compact',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394101/karebraids/pexels-pride-x-zm-240570403-12433560_gsb94k.jpg',
    title: 'Braiding Inspiration',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394098/karebraids/pexels-oluwapamilerinayo-ajala-1663970972-36426412_gia6ge.jpg',
    title: 'Protective Styling',
    aspect: 'tall',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394096/karebraids/pexels-oluwapamilerinayo-ajala-1663970972-36426400_oz14us.jpg',
    title: 'Clean Finish',
    aspect: 'tall',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394095/karebraids/pexels-boko-shots-812604874-33119264_dgtso5.jpg',
    title: 'Salon Care',
    aspect: 'tall',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394091/karebraids/pexels-magnolia-tadeo-2149496967-35226003_txplat.jpg',
    title: 'Braiding Inspiration',
    aspect: 'compact',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394090/karebraids/pexels-emerson-vasquez-172633476-13294055_lmwexw.jpg',
    title: 'Styling Detail',
    aspect: 'tall',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394090/karebraids/pexels-kadeem-stewart-170429769-15787297_hanq9d.jpg',
    title: 'Protective Styling',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394086/karebraids/pexels-estelle-umaes-16615622-7759977_xqihhm.jpg',
    title: 'Clean Finish',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781394085/karebraids/pexels-lovetosmile-4671331_e5qcwg.jpg',
    title: 'Salon Care',
    aspect: 'wide',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393982/karebraids/pexels-speakmediauganda-37600597_jnwb83.jpg',
    title: 'Braiding Inspiration',
    aspect: 'feature',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393981/karebraids/pexels-wayne-fotografias-1812121-5706984_pmsuj0.jpg',
    title: 'Styling Detail',
    aspect: 'tall',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393980/karebraids/pexels-wo-nfoni-media-311038690-14182054_sok4bc.jpg',
    title: 'Protective Styling',
    aspect: 'wide',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393980/karebraids/pexels-xzibeatdag-6732915_m7ii4n.jpg',
    title: 'Clean Finish',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393975/karebraids/pexels-tima-miroshnichenko-7608367_lancxi.jpg',
    title: 'Salon Care',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393974/karebraids/pexels-ricrodrigues-11441103_mvhard.jpg',
    title: 'Braiding Inspiration',
    aspect: 'compact',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393973/karebraids/pexels-oluwapamilerinayo-ajala-1663970972-36426412_onl7j0.jpg',
    title: 'Styling Detail',
    aspect: 'tall',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393971/karebraids/pexels-laolu-photography-124842090-13641265_q6xpj9.jpg',
    title: 'Protective Styling',
    aspect: 'feature',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393971/karebraids/pexels-ntate-mohlala-sir-2160208879-37093635_vst5y0.jpg',
    title: 'Clean Finish',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393970/karebraids/pexels-md-photography-2150970498-32772990_luhh2l.jpg',
    title: 'Salon Care',
    aspect: 'wide',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393967/karebraids/pexels-jedidiahjordan-14399531_sc9esi.jpg',
    title: 'Braiding Inspiration',
    aspect: 'compact',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393967/karebraids/pexels-geezy-photography-325144321-13767165_i3lfmn.jpg',
    title: 'Styling Detail',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393967/karebraids/pexels-mayaramombellifotografias-32967074_z94k8p.jpg',
    title: 'Protective Styling',
    aspect: 'feature',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393965/karebraids/pexels-josiah-matthew-145486517-10567314_cmmzjf.jpg',
    title: 'Clean Finish',
    aspect: 'tall',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393960/karebraids/pexels-donviour-photography-334689888-14883868_qwppga.jpg',
    title: 'Salon Care',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393960/karebraids/pexels-kazys-photography-2151238955-31600350_bnuxow.jpg',
    title: 'Braiding Inspiration',
    aspect: 'wide',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393957/karebraids/pexels-bruthethe-1958715_gaezsj.jpg',
    title: 'Styling Detail',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393955/karebraids/pexels-estelle-umaes-16615622-7759977_tyz0br.jpg',
    title: 'Protective Styling',
    aspect: 'medium',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393953/karebraids/pexels-boko-shots-812604874-28578516_k1v8gu.jpg',
    title: 'Clean Finish',
    aspect: 'wide',
  },
  {
    src: 'https://res.cloudinary.com/dlsiabgiw/image/upload/f_auto,q_auto/v1781393953/karebraids/pexels-cottonbro-8357452_dp9yo7.jpg',
    title: 'Salon Care',
    aspect: 'medium',
  },
]

export const imageLibrary = curatedImages.map((image, index) => ({
  id: `curated-visual-${String(index + 1).padStart(3, '0')}`,
  src: image.src,
  alt: REPRESENTATIVE_ALT,
  title: image.title,
  description: 'Representative styling image used for inspiration.',
  aspect: image.aspect,
  usage: 'representative',
}))

export const SERVICE_IMAGE_FALLBACK = imageLibrary[0].src

// Explicit representative preview assignments prevent accidental cross-style
// duplicates. These are inspiration images, not claims of completed client work.
const servicePreviewIndexes = Object.freeze({
  'knotless-braids': 6,
  'boho-knotless-braids': 1,
  'fulani-braids': 10,
  'stitch-braids': 2,
  cornrows: 9,
  'tribal-braids': 12,
  'feed-in-braids': 14,
  'goddess-braids': 22,
  'kids-braids': 19,
  'box-braids': 13,
  twists: 4,
})

function getStableIndex(seed, length) {
  if (!length) return 0

  return String(seed || 'karebraids')
    .split('')
    .reduce((total, character) => total + character.charCodeAt(0), 0) % length
}

export function getDisplayImage(seed) {
  const configuredIndex = servicePreviewIndexes[seed]
  const index = Number.isInteger(configuredIndex) ? configuredIndex : getStableIndex(seed, imageLibrary.length)
  return imageLibrary[index] || imageLibrary[0]
}

export function getGalleryImageItems() {
  return imageLibrary.map((image) => ({
    ...image,
    image: image.src,
    isRepresentativeImage: true,
  }))
}

export function getGalleryImageAlt(item, service) {
  if (service?.name) return `${service.name} styling inspiration — representative image`
  return item?.alt || REPRESENTATIVE_ALT
}

export function getGalleryImageSrc(item) {
  const source = item?.src || item?.image
  return typeof source === 'string' && source.trim()
    ? source
    : SERVICE_IMAGE_FALLBACK
}
