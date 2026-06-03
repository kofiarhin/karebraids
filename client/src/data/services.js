export const SERVICE_IMAGE_FALLBACK =
  'https://images.pexels.com/photos/11515382/pexels-photo-11515382.jpeg?auto=compress&cs=tinysrgb&w=1200'

export const services = [
  {
    id: 'knotless-braids',
    slug: 'knotless-braids',
    name: 'Knotless Braids',
    category: 'Braids',
    shortDescription: 'Lightweight, natural-looking braids with a soft finish.',
    priceFrom: 85,
    duration: '4-6 hours',
    featured: true,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    galleryImages: [
      {
        id: 'knotless-1',
        src: 'https://images.pexels.com/photos/11515382/pexels-photo-11515382.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Knotless braids styled with a clean middle part',
        title: 'Copper Knotless Braids',
        description: 'Long knotless braids with warm copper tone and a soft side sweep.',
        source: 'https://www.pexels.com/photo/an-african-woman-with-braids-17463802/',
        aspect: 'feature',
      },
      {
        id: 'knotless-2',
        src: 'https://images.pexels.com/photos/9385074/pexels-photo-9385074.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Knotless braid detail with careful hand placement',
        title: 'Process Detail',
        description: 'A quiet styling moment showing careful hand placement and even braid tension.',
        source: 'https://www.pexels.com/photo/woman-getting-her-hair-braided-9385074/',
        aspect: 'medium',
      },
    ],
  },
  {
    id: 'box-braids',
    slug: 'box-braids',
    name: 'Box Braids',
    category: 'Braids',
    shortDescription: 'Classic protective styling with clean parting and polished ends.',
    priceFrom: 70,
    duration: '4-7 hours',
    featured: true,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    galleryImages: [
      {
        id: 'box-1',
        src: 'https://images.pexels.com/photos/6976266/pexels-photo-6976266.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Long box braids styled for everyday movement',
        title: 'Long Braid Finish',
        description: 'Soft long braids styled for movement, shine, and everyday wear.',
        source: 'https://www.pexels.com/photo/a-woman-with-braids-6976266/',
        aspect: 'tall',
      },
    ],
  },
  {
    id: 'cornrows',
    slug: 'cornrows',
    name: 'Cornrows',
    category: 'Cornrows',
    shortDescription: 'Sleek rows for everyday wear, events, or base styling.',
    priceFrom: 35,
    duration: '1.5-3 hours',
    featured: true,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    galleryImages: [
      {
        id: 'cornrows-1',
        src: 'https://images.pexels.com/photos/14883868/pexels-photo-14883868.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Precision cornrows with defined rows and neat braid fall',
        title: 'Precision Cornrows',
        description: 'Defined rows and neat braid fall for a clean protective style.',
        source: 'https://www.pexels.com/photo/photo-of-a-woman-with-ethnic-braids-16089266/',
        aspect: 'medium',
      },
      {
        id: 'cornrows-2',
        src: 'https://images.pexels.com/photos/36742666/pexels-photo-36742666.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Studio portrait showing polished cornrow detail',
        title: 'Studio Cornrow Portrait',
        description: 'Close cornrow work with a polished studio finish and clean hairline detail.',
        source: 'https://www.pexels.com/photo/portrait-of-woman-with-cornrow-braids-36742666/',
        aspect: 'wide',
      },
    ],
  },
  {
    id: 'stitch-braids',
    slug: 'stitch-braids',
    name: 'Stitch Braids',
    category: 'Cornrows',
    shortDescription: 'Defined stitch parting for sculpted, camera-ready detail.',
    priceFrom: 45,
    duration: '2-4 hours',
    featured: true,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    galleryImages: [
      {
        id: 'stitch-1',
        src: 'https://images.pexels.com/photos/15576674/pexels-photo-15576674.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Handcrafted stitch braid detail with clean parting',
        title: 'Handcrafted Detail',
        description: 'Protective braid work focused on scalp comfort and clean tension.',
        source: 'https://www.pexels.com/photo/a-young-woman-having-her-hair-braided-15576674/',
        aspect: 'medium',
      },
    ],
  },
  {
    id: 'twists',
    slug: 'twists',
    name: 'Twists',
    category: 'Twists & Locs',
    shortDescription: 'Soft, elegant twists for flexible length and easy maintenance.',
    priceFrom: 65,
    duration: '3-5 hours',
    featured: false,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    galleryImages: [
      {
        id: 'twists-1',
        src: 'https://images.pexels.com/photos/17218456/pexels-photo-17218456.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Outdoor profile showing soft protective twist texture',
        title: 'Outdoor Braid Profile',
        description: 'Warm outdoor portrait with braid detail framed by natural light.',
        source: 'https://www.pexels.com/photo/woman-with-braids-17218456/',
        aspect: 'wide',
      },
    ],
  },
  {
    id: 'boho-braids',
    slug: 'boho-braids',
    name: 'Boho Braids',
    category: 'Braids',
    shortDescription: 'Soft textured braids with movement and an elevated bohemian finish.',
    priceFrom: 95,
    duration: '5-7 hours',
    featured: false,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    galleryImages: [
      {
        id: 'boho-1',
        src: 'https://images.pexels.com/photos/8511174/pexels-photo-8511174.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Boho braids with soft texture and length variation',
        title: 'Braided Pair',
        description: 'Two finished braid looks photographed together to show texture and length range.',
        source: 'https://www.pexels.com/photo/women-with-braids-8511174/',
        aspect: 'compact',
      },
    ],
  },
  {
    id: 'fulani-braids',
    slug: 'fulani-braids',
    name: 'Fulani Braids',
    category: 'Braids',
    shortDescription: 'Face-framing braid detail with a refined Fulani-inspired finish.',
    priceFrom: 85,
    duration: '4-6 hours',
    featured: false,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    galleryImages: [
      {
        id: 'fulani-1',
        src: 'https://images.pexels.com/photos/36441633/pexels-photo-36441633.jpeg?auto=compress&cs=tinysrgb&w=1200',
        alt: 'Fulani-inspired braid appointment with close sectioning detail',
        title: 'Salon Braiding Session',
        description: 'Close, careful sectioning and braid work in a salon setting.',
        source: 'https://www.pexels.com/photo/african-hair-braiding-in-salon-setting-36441633/',
        aspect: 'tall',
      },
    ],
  },
  {
    id: 'kids-braids',
    slug: 'kids-braids',
    name: 'Kids Braids',
    category: 'Kids Styles',
    shortDescription: 'Gentle, age-appropriate styling with comfort as the priority.',
    priceFrom: 30,
    duration: '1.5-3 hours',
    featured: false,
    bookingEnabled: true,
    galleryEnabled: true,
    status: 'available',
    galleryImages: [],
  },
]

function withCompatibilityFields(service) {
  const previewImage = service.galleryImages[0]
  const [minHours, maxHours] = service.duration.match(/[\d.]+/g)?.map(Number) ?? []

  return {
    ...service,
    title: service.name,
    description: service.shortDescription,
    startingPrice: service.priceFrom,
    currency: 'GBP',
    durationLabel: service.duration,
    duration: {
      minHours: minHours ?? 0,
      maxHours: maxHours ?? minHours ?? 0,
    },
    fromPrice: `From £${service.priceFrom}`,
    image: previewImage?.src || SERVICE_IMAGE_FALLBACK,
    previewImage: previewImage
      ? {
          id: previewImage.id,
          title: previewImage.title || service.name,
          description: previewImage.description || service.shortDescription,
          image: previewImage.src,
          src: previewImage.src,
          alt: previewImage.alt,
          aspect: previewImage.aspect || 'medium',
        }
      : null,
  }
}

export function getFeaturedServices() {
  return services.filter((service) => service.featured && service.status === 'available').map(withCompatibilityFields)
}

export function getBookableServices() {
  return services.filter((service) => service.bookingEnabled && service.status === 'available').map(withCompatibilityFields)
}

export function getGalleryServices() {
  return services.filter((service) => service.galleryEnabled && service.status === 'available').map(withCompatibilityFields)
}

export function getServiceById(id) {
  const service = services.find((item) => item.id === id)
  return service ? withCompatibilityFields(service) : undefined
}

export function getServiceBySlug(slug) {
  const service = services.find((item) => item.slug === slug)
  return service ? withCompatibilityFields(service) : undefined
}

export function getGalleryItems() {
  return getGalleryServices().flatMap((service) =>
    service.galleryImages.map((image) => ({
      ...image,
      src: image.src,
      image: image.src,
      title: image.title || service.name,
      description: image.description || service.shortDescription,
      aspect: image.aspect || 'medium',
      serviceId: service.id,
      serviceName: service.name,
      serviceSlug: service.slug,
      serviceTitle: service.name,
      category: service.category,
    })),
  )
}

export function getGalleryItemsByServiceId(serviceId) {
  if (serviceId === 'all') return getGalleryItems()
  return getGalleryItems().filter((item) => item.serviceId === serviceId)
}
