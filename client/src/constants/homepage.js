import { galleryItems } from './content.js'

export const homepageImages = {
  hero: {
    src: galleryItems[0].image,
    alt: 'Black woman with long sculpted braids in warm editorial light',
  },
  avatars: [
    { src: galleryItems[5].image },
    { src: galleryItems[7].image },
    { src: galleryItems[8].image },
  ],
  services: [
    galleryItems[0],
    galleryItems[7],
    galleryItems[4],
    galleryItems[5],
    galleryItems[1],
  ],
  gallery: [galleryItems[8], galleryItems[6], galleryItems[3], galleryItems[2]],
  testimonial: {
    src: galleryItems[7].image,
    alt: 'Jasmine A. client portrait',
  },
}

export const navItems = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'Services', href: '#signature-styles', type: 'anchor' },
  { label: 'Gallery', href: '/gallery', type: 'route' },
  { label: 'About', href: '/about', type: 'route' },
  { label: 'Booking', href: '/booking', type: 'route' },
  { label: 'Contact', href: '#contact', type: 'anchor' },
]

export const trustItems = [
  { title: 'London Based', icon: 'map' },
  { title: 'Salon & Mobile Services', icon: 'house' },
  { title: 'Protective Styling Experts', icon: 'shield' },
  { title: 'Client First Care', icon: 'heart' },
]

export const signatureServices = [
  {
    title: 'Knotless Braids',
    price: 'From \u00a3120',
    image: homepageImages.services[0].image,
    alt: 'Knotless braids style inspiration',
  },
  {
    title: 'Boho Braids',
    price: 'From \u00a3150',
    image: homepageImages.services[1].image,
    alt: 'Boho braids style inspiration',
  },
  {
    title: 'Stitch Braids',
    price: 'From \u00a3130',
    image: homepageImages.services[2].image,
    alt: 'Stitch braids style inspiration',
  },
  {
    title: 'Twists / Locs',
    price: 'From \u00a3140',
    image: homepageImages.services[3].image,
    alt: 'Twists and locs style inspiration',
  },
  {
    title: 'Cornrows',
    price: 'From \u00a3100',
    image: homepageImages.services[4].image,
    alt: 'Cornrows style inspiration',
  },
]

export const valueItems = [
  {
    title: 'Salon Quality Finish',
    text: 'Neat, lightweight and flawless every time.',
    icon: 'sparkle',
  },
  {
    title: 'Mobile Convenience',
    text: 'We come to you - home, hotel or workplace.',
    icon: 'map',
  },
  {
    title: 'Protective Care First',
    text: 'Healthy hair, gentle techniques and premium products.',
    icon: 'shield',
  },
  {
    title: 'Flexible Booking',
    text: 'Easy online booking that fits your schedule.',
    icon: 'calendar',
  },
]

export const testimonial = {
  quote:
    "My braids were neat, lightweight and lasted beautifully. Kare truly knows what she's doing!",
  name: 'Jasmine A.',
}

export const footerGroups = [
  {
    title: 'Services',
    links: [
      { label: 'Knotless Braids', href: '/booking' },
      { label: 'Boho Braids', href: '/booking' },
      { label: 'Stitch Braids', href: '/booking' },
      { label: 'Twists / Locs', href: '/booking' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Booking', href: '/booking' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

export const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'TikTok', href: 'https://www.tiktok.com/' },
  { label: 'Pinterest', href: 'https://www.pinterest.com/' },
]
