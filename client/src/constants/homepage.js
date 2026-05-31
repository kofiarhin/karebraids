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
}

export const navItems = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'Services', href: '/gallery', type: 'route' },
  { label: 'Gallery', href: '/gallery', type: 'route' },
  { label: 'About', href: '/about', type: 'route' },
  { label: 'Booking', href: '/booking', type: 'route' },
  { label: 'Contact', href: '/contact', type: 'route' },
]

export const trustItems = [
  { title: 'London Based', icon: 'map' },
  { title: 'Salon & Mobile Services', icon: 'house' },
  { title: 'Protective Styling Experts', icon: 'shield' },
  { title: 'Client First Care', icon: 'heart' },
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

export const homepageTestimonials = [
  {
    name: 'Ama K.',
    review: 'My knotless braids were so neat and lightweight. The whole experience felt calm, professional, and premium.',
    rating: 5,
    avatar: galleryItems[7].image,
    initials: 'AK',
  },
  {
    name: 'Nia O.',
    review: 'KareBraids took her time with my hair and the finish was beautiful. I got compliments for weeks.',
    rating: 5,
    avatar: galleryItems[5].image,
    initials: 'NO',
  },
  {
    name: 'Zuri A.',
    review: 'The braids were clean, comfortable, and lasted really well. I felt looked after from start to finish.',
    rating: 5,
    avatar: galleryItems[8].image,
    initials: 'ZA',
  },
  {
    name: 'Sade B.',
    review: 'Professional, gentle, and very detailed. My goddess braids came out exactly how I wanted.',
    rating: 5,
    avatar: galleryItems[6].image,
    initials: 'SB',
  },
  {
    name: 'Aaliyah M.',
    review: 'Booking was easy and the service was excellent. My hair looked flawless and felt secure without being tight.',
    rating: 5,
    avatar: null,
    initials: 'AM',
  },
]

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
