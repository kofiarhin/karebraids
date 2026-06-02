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
  { label: 'Services', href: '/services', type: 'route' },
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
  { title: 'Professional Service', text: 'Organized appointments and attentive care from consultation to finish.', icon: 'shield' },
  { title: 'Reliable Appointments', text: 'Clear scheduling designed to respect your time.', icon: 'calendar' },
  { title: 'Transparent Pricing', text: 'Visible starting prices so you can plan with confidence.', icon: 'price' },
  { title: 'Quality Results', text: 'Clean sections, balanced tension, and polished long-wear styling.', icon: 'sparkle' },
  { title: 'Mobile & Salon Options', text: 'Choose the appointment setting that works best for you.', icon: 'house' },
  { title: 'Client-Focused Experience', text: 'Protective care and thoughtful communication at every step.', icon: 'heart' },
]

export const homepageTestimonials = [
  { name: 'Ama K.', review: 'My knotless braids were so neat and lightweight. The whole experience felt calm, professional, and premium.', rating: 5, avatar: galleryItems[7].image, initials: 'AK' },
  { name: 'Nia O.', review: 'KareBraids took her time with my hair and the finish was beautiful. I got compliments for weeks.', rating: 5, avatar: galleryItems[5].image, initials: 'NO' },
  { name: 'Zuri A.', review: 'The braids were clean, comfortable, and lasted really well. I felt looked after from start to finish.', rating: 5, avatar: galleryItems[8].image, initials: 'ZA' },
  { name: 'Sade B.', review: 'Professional, gentle, and very detailed. My goddess braids came out exactly how I wanted.', rating: 5, avatar: galleryItems[6].image, initials: 'SB' },
  { name: 'Aaliyah M.', review: 'Booking was easy and the service was excellent. My hair looked flawless without feeling tight.', rating: 5, avatar: null, initials: 'AM' },
  { name: 'Imani R.', review: 'Every step felt organized and my appointment started exactly when expected.', rating: 5, avatar: galleryItems[3].image, initials: 'IR' },
  { name: 'Tomi E.', review: 'The pricing was clear and the result looked polished for weeks.', rating: 5, avatar: galleryItems[1].image, initials: 'TE' },
  { name: 'Leah D.', review: 'A premium, comfortable experience and a style that felt completely like me.', rating: 5, avatar: null, initials: 'LD' },
]

export const bookingSteps = [
  { title: 'Choose A Style', text: 'Browse the options and select the look that suits you.' },
  { title: 'Select Date & Time', text: 'Choose a convenient appointment slot.' },
  { title: 'Confirm Booking', text: 'Share your details and submit your request.' },
  { title: 'Enjoy Your Appointment', text: 'Arrive relaxed and leave with a polished protective style.' },
]

export const footerGroups = [
  {
    title: 'Services',
    links: [
      { label: 'Knotless Braids', href: '/services' },
      { label: 'Boho Braids', href: '/services' },
      { label: 'Stitch Braids', href: '/services' },
      { label: 'Twists / Locs', href: '/services' },
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
