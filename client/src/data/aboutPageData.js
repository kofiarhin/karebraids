import { SERVICE_IMAGE_FALLBACK, services } from './services.js'

function findServiceImage(serviceId, imageIndex = 0) {
  return services.find((service) => service.id === serviceId)?.galleryImages?.[imageIndex]
}

const knotlessImage = findServiceImage('knotless-braids')
const braidDetailImage = findServiceImage('knotless-braids', 1)
const boxBraidsImage = findServiceImage('box-braids')
const cornrowsImage = findServiceImage('cornrows')
const stitchImage = findServiceImage('stitch-braids')
const twistsImage = findServiceImage('twists')
const kidsBraidsImage = findServiceImage('kids-braids')

export const aboutImages = {
  hero: {
    src: knotlessImage?.src || SERVICE_IMAGE_FALLBACK,
    alt: knotlessImage?.alt || 'Polished knotless braids styled with a premium finish',
  },
  founder: {
    src: stitchImage?.src || braidDetailImage?.src || SERVICE_IMAGE_FALLBACK,
    alt: stitchImage?.alt || 'Karen creating detailed protective braids with careful hand placement',
  },
  experience: {
    src: boxBraidsImage?.src || cornrowsImage?.src || SERVICE_IMAGE_FALLBACK,
    alt: boxBraidsImage?.alt || 'Beautiful long braids with a polished protective finish',
  },
}

export const whyChooseCards = [
  {
    title: 'Gentle Styling',
    copy: 'Protective techniques designed for comfort and scalp care.',
  },
  {
    title: 'Attention To Detail',
    copy: 'Clean parts, neat finishes, and consistent results.',
  },
  {
    title: 'Long Lasting Results',
    copy: 'Styles designed to stay fresh and beautiful for weeks.',
  },
  {
    title: 'Personal Service',
    copy: 'Every appointment receives focused, founder-led care.',
  },
]

export const specialties = [
  {
    title: 'Knotless Braids',
    image: knotlessImage?.src,
    alt: knotlessImage?.alt || 'Knotless braids styled with a clean middle part',
  },
  {
    title: 'Box Braids',
    image: boxBraidsImage?.src,
    alt: boxBraidsImage?.alt || 'Long box braids with polished movement',
  },
  {
    title: 'Cornrows',
    image: cornrowsImage?.src,
    alt: cornrowsImage?.alt || 'Precision cornrows with defined rows',
  },
  {
    title: 'Kids Braids',
    image: kidsBraidsImage?.src,
    alt: kidsBraidsImage?.alt || 'Child-friendly braided protective style',
  },
  {
    title: 'Twists',
    image: twistsImage?.src,
    alt: twistsImage?.alt || 'Soft protective twist texture',
  },
  {
    title: 'Protective Styling',
    image: braidDetailImage?.src || stitchImage?.src,
    alt: braidDetailImage?.alt || 'Detailed protective braid styling focused on comfort',
  },
]

export const testimonials = [
  {
    quote: 'Karen is incredibly gentle and professional. My braids lasted for weeks.',
    name: 'KareBraids client',
  },
  {
    quote: 'Best braiding experience I have had in Birmingham.',
    name: 'Birmingham client',
  },
  {
    quote: 'Always neat, friendly, and reliable.',
    name: 'Returning client',
  },
]

export const trustStats = [
  {
    value: '200+',
    label: 'Happy Clients',
  },
  {
    value: '5+',
    label: 'Years Experience',
  },
  {
    value: '100%',
    label: 'Client Focused',
  },
  {
    value: '★★★★★',
    label: 'Consistently Rated Highly',
  },
]
