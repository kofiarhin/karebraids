import { getBookableServices, getGalleryItems } from '../data/services.js'

export const galleryItems = getGalleryItems()
export const services = getBookableServices().map((service) => ({
  id: service.id,
  category: service.category,
  title: service.name,
  description: service.shortDescription,
  image: service.image,
  duration: service.durationLabel.replace(/hours/g, 'hrs'),
  fromPrice: service.fromPrice,
}))

export const testimonials = [
  {
    name: 'Nadine A.',
    text: 'The parting was immaculate and my braids still felt light after a full day.',
  },
  {
    name: 'Temi R.',
    text: 'Karen listened carefully, protected my edges, and made the whole appointment calm.',
  },
  {
    name: 'Lola M.',
    text: 'The mobile appointment felt professional from start to finish.',
  },
]
