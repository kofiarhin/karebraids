import { getDisplayImage } from './imageLibrary.js'

function representativeServiceImage(serviceId, styleName) {
  const image = getDisplayImage(serviceId)
  return {
    src: image.src,
    alt: `${styleName} representative styling inspiration`,
  }
}

const knotlessImage = representativeServiceImage('knotless-braids', 'Knotless Braids')
const boxBraidsImage = representativeServiceImage('box-braids', 'Box Braids')
const cornrowsImage = representativeServiceImage('cornrows', 'Cornrows')
const stitchImage = representativeServiceImage('stitch-braids', 'Protective Styling')
const twistsImage = representativeServiceImage('twists', 'Twists')
const kidsBraidsImage = representativeServiceImage('kids-braids', 'Kids Braids')
const karenProfilePlaceholder = getDisplayImage('karen-profile-placeholder')

// TODO(pre-launch): Replace this representative image with Karen's approved profile photo.
// TODO(pre-launch): Replace the draft statement with Karen's approved personal statement.
export const karenProfile = {
  image: {
    src: karenProfilePlaceholder.src,
    alt: "Representative placeholder for Karen's profile photo",
    isPlaceholder: true,
  },
  statement: 'KareBraids was built on a simple belief: every client deserves beautiful braids and a comfortable experience.',
  statementIsPlaceholder: true,
  biography: [
    'Karen works with a variety of hair textures and styles, helping clients choose looks that are both beautiful and protective.',
    'Whether you are booking knotless braids, box braids, twists, or cornrows, the focus is always on quality, comfort, and lasting results.',
  ],
}

export const aboutImages = {
  hero: knotlessImage,
  founder: karenProfile.image,
  experience: boxBraidsImage,
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
  { title: 'Knotless Braids', image: knotlessImage.src, alt: knotlessImage.alt },
  { title: 'Box Braids', image: boxBraidsImage.src, alt: boxBraidsImage.alt },
  { title: 'Cornrows', image: cornrowsImage.src, alt: cornrowsImage.alt },
  { title: 'Kids Braids', image: kidsBraidsImage.src, alt: kidsBraidsImage.alt },
  { title: 'Twists', image: twistsImage.src, alt: twistsImage.alt },
  { title: 'Protective Styling', image: stitchImage.src, alt: stitchImage.alt },
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
