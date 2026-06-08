export const imageLibrary = [
  {
    id: 'curated-visual-001',
    src: 'https://images.pexels.com/photos/11515382/pexels-photo-11515382.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Braided hairstyle inspiration in warm editorial light',
    title: 'Braiding Inspiration',
    description: 'Representative protective styling image used for brand visuals.',
    source: 'https://www.pexels.com/photo/an-african-woman-with-braids-17463802/',
    aspect: 'feature',
    usage: 'representative',
  },
  {
    id: 'curated-visual-002',
    src: 'https://images.pexels.com/photos/9385074/pexels-photo-9385074.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Hair braiding appointment detail',
    title: 'Styling Detail',
    description: 'Representative salon process image used for visual storytelling.',
    source: 'https://www.pexels.com/photo/woman-getting-her-hair-braided-9385074/',
    aspect: 'medium',
    usage: 'representative',
  },
  {
    id: 'curated-visual-003',
    src: 'https://images.pexels.com/photos/6976266/pexels-photo-6976266.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Long braided hairstyle inspiration',
    title: 'Protective Styling',
    description: 'Representative braided hair image used for marketing visuals.',
    source: 'https://www.pexels.com/photo/a-woman-with-braids-6976266/',
    aspect: 'tall',
    usage: 'representative',
  },
  {
    id: 'curated-visual-004',
    src: 'https://images.pexels.com/photos/14883868/pexels-photo-14883868.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Polished braid detail inspiration',
    title: 'Clean Finish',
    description: 'Representative image showing polished protective styling detail.',
    source: 'https://www.pexels.com/photo/photo-of-a-woman-with-ethnic-braids-16089266/',
    aspect: 'wide',
    usage: 'representative',
  },
  {
    id: 'curated-visual-005',
    src: 'https://images.pexels.com/photos/36441633/pexels-photo-36441633.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Salon braiding session inspiration',
    title: 'Salon Care',
    description: 'Representative salon image used to support the KareBraids experience.',
    source: 'https://www.pexels.com/photo/african-hair-braiding-in-salon-setting-36441633/',
    aspect: 'tall',
    usage: 'representative',
  },
  {
    id: 'curated-visual-006',
    src: 'https://images.pexels.com/photos/15576674/pexels-photo-15576674.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Protective braid work inspiration',
    title: 'Careful Styling',
    description: 'Representative image focused on appointment care and detail.',
    source: 'https://www.pexels.com/photo/a-young-woman-having-her-hair-braided-15576674/',
    aspect: 'medium',
    usage: 'representative',
  },
  {
    id: 'curated-visual-007',
    src: 'https://images.pexels.com/photos/17218456/pexels-photo-17218456.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Outdoor braided hair profile inspiration',
    title: 'Soft Profile',
    description: 'Representative lifestyle image for premium protective styling.',
    source: 'https://www.pexels.com/photo/woman-with-braids-17218456/',
    aspect: 'wide',
    usage: 'representative',
  },
  {
    id: 'curated-visual-008',
    src: 'https://images.pexels.com/photos/36742666/pexels-photo-36742666.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Studio portrait with braided hairstyle inspiration',
    title: 'Studio Finish',
    description: 'Representative image used for visual inspiration only.',
    source: 'https://www.pexels.com/photo/portrait-of-woman-with-cornrow-braids-36742666/',
    aspect: 'medium',
    usage: 'representative',
  },
  {
    id: 'curated-visual-009',
    src: 'https://images.pexels.com/photos/8511174/pexels-photo-8511174.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Braided hairstyle inspiration with warm styling',
    title: 'Warm Editorial',
    description: 'Representative image supporting the KareBraids visual identity.',
    source: 'https://www.pexels.com/photo/women-with-braids-8511174/',
    aspect: 'compact',
    usage: 'representative',
  },
]

export const SERVICE_IMAGE_FALLBACK = imageLibrary[0].src

function getStableIndex(seed, length) {
  if (!length) return 0

  const value = String(seed || 'karebraids')
    .split('')
    .reduce((total, character) => total + character.charCodeAt(0), 0)

  return value % length
}

export function getDisplayImage(seed) {
  return imageLibrary[getStableIndex(seed, imageLibrary.length)] || imageLibrary[0]
}

export function getGalleryImageItems() {
  return imageLibrary.map((image) => ({
    ...image,
    image: image.src,
    serviceId: null,
    serviceName: null,
    serviceSlug: null,
    serviceTitle: null,
    category: 'Visual Inspiration',
    isRepresentative: true,
  }))
}
