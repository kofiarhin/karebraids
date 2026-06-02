import { galleryItems } from './content.js'

const sharedCareTips = [
  'Wrap your braids with a satin scarf before bed.',
  'Keep your scalp lightly moisturised without heavy product build-up.',
  'Book a refresh or removal when the style begins to loosen.',
]

const reviews = [
  { id: 'review-ama', name: 'Ama K.', rating: 5, text: 'The finish was neat, lightweight, and exactly what I asked for.', verifiedClient: true },
  { id: 'review-nia', name: 'Nia O.', rating: 5, text: 'A calm appointment, transparent pricing, and beautiful long-lasting braids.', verifiedClient: true },
]

export const styleProfiles = [
  { slug: 'knotless-braids', name: 'Knotless Braids', category: 'Braids', count: 4, startingPrice: '£80', duration: '4–6 hrs', hairIncluded: 'Available on request', image: galleryItems[0].image, gallery: [galleryItems[0], galleryItems[6], galleryItems[8]], description: 'Lightweight braids installed with a natural root finish for reduced scalp tension and easy everyday styling.', suitableFor: 'Clients looking for a versatile protective style with a soft, natural finish.' },
  { slug: 'boho-braids', name: 'Boho Braids', category: 'Braids', count: 4, startingPrice: '£95', duration: '5–7 hrs', hairIncluded: 'Available on request', image: galleryItems[8].image, gallery: [galleryItems[8], galleryItems[5], galleryItems[6]], description: 'A relaxed braid style with soft textured pieces for movement and a polished bohemian finish.', suitableFor: 'Clients who want protective styling with soft, occasion-ready texture.' },
  { slug: 'stitch-braids', name: 'Stitch Braids', category: 'Cornrows', count: 3, startingPrice: '£45', duration: '2–4 hrs', hairIncluded: 'Available on request', image: galleryItems[4].image, gallery: [galleryItems[4], galleryItems[1], galleryItems[3]], description: 'Defined stitch parting and sculpted rows shaped for a sleek, camera-ready result.', suitableFor: 'Clients who prefer structured styling with clean definition.' },
  { slug: 'cornrows', name: 'Cornrows', category: 'Cornrows', count: 3, startingPrice: '£35', duration: '1.5–3 hrs', hairIncluded: 'Not usually required', image: galleryItems[1].image, gallery: [galleryItems[1], galleryItems[4], galleryItems[3]], description: 'Classic cornrow styling with balanced tension, clean sections, and a polished finish.', suitableFor: 'Clients looking for a practical protective style or a sleek base style.' },
  { slug: 'fulani-braids', name: 'Fulani Braids', category: 'Braids', count: 3, startingPrice: '£85', duration: '4–6 hrs', hairIncluded: 'Available on request', image: galleryItems[5].image, gallery: [galleryItems[5], galleryItems[8], galleryItems[0]], description: 'Face-framing braids inspired by Fulani styling traditions, finished with refined detail.', suitableFor: 'Clients who want a statement protective style with elegant framing.' },
  { slug: 'kids-braids', name: 'Kids Braids', category: 'Kids Styles', count: 3, startingPrice: '£30', duration: '1.5–3 hrs', hairIncluded: 'Depends on selected style', image: galleryItems[7].image, gallery: [galleryItems[7], galleryItems[3], galleryItems[1]], description: 'Age-appropriate braid styles created with comfort, gentle handling, and easy upkeep in mind.', suitableFor: 'Children who need a comfortable, neat, and practical protective style.' },
].map((style) => ({ ...style, careTips: sharedCareTips, reviews }))

export const styleProfileBySlug = Object.fromEntries(styleProfiles.map((style) => [style.slug, style]))
