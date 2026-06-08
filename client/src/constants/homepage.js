const editorialImages = ['https://images.pexels.com/photos/11515382/pexels-photo-11515382.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/9385074/pexels-photo-9385074.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/6976266/pexels-photo-6976266.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/14883868/pexels-photo-14883868.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/36441633/pexels-photo-36441633.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/15576674/pexels-photo-15576674.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/17218456/pexels-photo-17218456.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/11815194/pexels-photo-11815194.jpeg?auto=compress&cs=tinysrgb&w=1200', 'https://images.pexels.com/photos/8511174/pexels-photo-8511174.jpeg?auto=compress&cs=tinysrgb&w=1200']

export const homepageImages = {
  hero: {
    src: editorialImages[0],
    alt: 'Black woman with long sculpted braids in warm editorial light',
  },
  avatars: [
    { src: editorialImages[5] },
    { src: editorialImages[7] },
    { src: editorialImages[8] },
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
  { title: 'Birmingham Based', icon: 'map' },
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
  { name: 'Ama K.', review: 'My knotless braids were so neat and lightweight. The whole experience felt calm, professional, and premium.', rating: 5, avatar: editorialImages[7], initials: 'AK' },
  { name: 'Nia O.', review: 'KareBraids took her time with my hair and the finish was beautiful. I got compliments for weeks.', rating: 5, avatar: editorialImages[5], initials: 'NO' },
  { name: 'Zuri A.', review: 'The braids were clean, comfortable, and lasted really well. I felt looked after from start to finish.', rating: 5, avatar: editorialImages[8], initials: 'ZA' },
  { name: 'Sade B.', review: 'Professional, gentle, and very detailed. My goddess braids came out exactly how I wanted.', rating: 5, avatar: editorialImages[6], initials: 'SB' },
  { name: 'Aaliyah M.', review: 'Booking was easy and the service was excellent. My hair looked flawless without feeling tight.', rating: 5, avatar: null, initials: 'AM' },
  { name: 'Imani R.', review: 'Every step felt organized and my appointment started exactly when expected.', rating: 5, avatar: editorialImages[3], initials: 'IR' },
  { name: 'Tomi E.', review: 'The pricing was clear and the result looked polished for weeks.', rating: 5, avatar: editorialImages[1], initials: 'TE' },
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
