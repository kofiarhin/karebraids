import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import { getBookableServices, getGalleryItems } from '../src/data/services.js'

const galleryItems = getGalleryItems()
const services = getBookableServices().map((service) => ({
  id: service.id,
  category: service.category,
  title: service.name,
  description: service.shortDescription,
  image: service.image,
  duration: service.durationLabel.replace(/hours/g, 'hrs'),
  fromPrice: service.fromPrice,
  isRepresentativeImage: service.isRepresentativeImage,
}))

vi.mock('../src/hooks/queries/useGalleryItems.js', async () => {
  const { getBookableServices, getGalleryItems } = await import('../src/data/services.js')
  const galleryItems = getGalleryItems()
  const services = getBookableServices().map((service) => ({
    id: service.id,
    category: service.category,
    title: service.name,
    description: service.shortDescription,
    image: service.image,
    duration: service.durationLabel.replace(/hours/g, 'hrs'),
    fromPrice: service.fromPrice,
  }))
  const galleryServices = services.map((service, index) => ({
    id: service.id,
    name: service.title,
    title: service.title,
    shortDescription: service.description,
    description: service.description,
    startingPrice: Number(service.fromPrice.replace(/[^0-9]/g, '')),
    currency: 'GBP',
    duration: { minHours: 2, maxHours: 5 },
    durationLabel: '2-5 hours',
    featured: index < 4,
    previewImage: { id: `${service.id}-preview`, title: service.title, description: service.description, image: service.image, aspect: 'medium' },
  }))
  return {
    useGalleryItems: ({ limit } = {}) => ({ data: limit ? galleryItems.slice(0, limit) : galleryItems, isLoading: false, isError: false }),
    useGalleryServices: () => ({ data: galleryServices, isLoading: false, isError: false, refetch: vi.fn() }),
  }
})


vi.mock('../src/hooks/queries/useServices.js', async () => {
  const { getBookableServices } = await import('../src/data/services.js')
  const services = getBookableServices()
  return {
    useFeaturedServices: () => ({ data: services.filter((service) => service.featured), isLoading: false, isError: false }),
    useGalleryEnabledServices: () => ({ data: services.filter((service) => service.galleryEnabled), isLoading: false, isError: false }),
    useBookableServices: () => ({ data: services, isLoading: false, isError: false }),
    useService: () => ({ data: null, isLoading: false, isError: false }),
  }
})

const originalMatchMedia = window.matchMedia
const testDirectory = path.dirname(fileURLToPath(import.meta.url))
const homeStyles = () =>
  fs.readFileSync(path.join(testDirectory, '../src/index.css'), 'utf8').replace(/\r\n/g, '\n')

afterEach(() => {
  vi.useRealTimers()

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: originalMatchMedia,
  })
})

function renderRoute(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('KareBraids pages', () => {
  it('renders the redesigned homepage with dark luxury header navigation', () => {
    const { container } = renderRoute('/')

    expect(container.querySelector('[data-public-route-transition]')).toBeInTheDocument()
    expect(container.querySelector('.site-shell')).toHaveClass('theme-brand-shell')
    expect(screen.getByRole('banner')).toHaveClass('site-header')
    expect(screen.getByRole('link', { name: /karebraids home/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toHaveTextContent(/services/i)
    expect(screen.getByRole('navigation', { name: /main navigation/i })).toHaveTextContent(/contact/i)
    expect(screen.getAllByRole('link', { name: /book appointment/i }).length).toBeGreaterThanOrEqual(2)
  })

  it('renders the approved dark luxury homepage story', () => {
    const { container } = renderRoute('/')

    expect(container.querySelector('.luxury-homepage')).toBeInTheDocument()
    expect(screen.getByText(/luxury african hair braiding/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /luxury braiding, crafted with care/i })).toBeInTheDocument()
    expect(screen.getByText(/premium salon and mobile braiding services across birmingham/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view styles/i })).toHaveAttribute('href', '/gallery')
    expect(screen.getByText(/500\+ happy clients/i)).toBeInTheDocument()
    expect(container.querySelector('.browse-style-section')).toHaveTextContent(/browse by style/i)
    expect(screen.queryByText(/signature styles/i)).not.toBeInTheDocument()
    expect(screen.getByText(/why choose karebraids/i)).toBeInTheDocument()
    expect(screen.getByText(/style inspiration gallery/i)).toBeInTheDocument()
    expect(screen.getByText(/client testimonials/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ready for your next look/i })).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toHaveTextContent(/mon - sat: 8am - 7pm/i)
    expect(screen.getByRole('contentinfo')).toHaveTextContent(/birmingham, west midlands/i)
    expect(screen.queryByText(/london/i)).not.toBeInTheDocument()
    expect(container.querySelectorAll('[data-reveal]').length).toBeGreaterThan(8)
  })

  it('renders editorial homepage images with accessible semantics', () => {
    const { container } = renderRoute('/')

    expect(container.querySelector('.luxury-hero-media img[aria-hidden="false"]')).toHaveAttribute(
      'src',
      galleryItems[0].image,
    )
    expect(screen.queryByRole('img', { name: /testimonial portrait/i })).not.toBeInTheDocument()
    expect(container.querySelectorAll('.gallery-feature-card img')).toHaveLength(4)
    expect(container.querySelectorAll('.gallery-feature-card')).toHaveLength(4)
    container.querySelectorAll('.gallery-feature-card').forEach((card, index) => {
      expect(card).toHaveAttribute('href', '/gallery')
      expect(within(card).getByRole('img', { name: galleryItems[index].alt })).toHaveAttribute('loading', 'lazy')
      expect(within(card).getByText(galleryItems[index].title)).toBeInTheDocument()
      expect(within(card).getByText(/representative image/i)).toBeInTheDocument()
    })
    container.querySelectorAll('.client-avatar-stack img').forEach((image) => {
      expect(image).toHaveAttribute('alt', '')
      expect(image).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('replaces homepage signature cards with only the first six gallery items', () => {
    const { container } = renderRoute('/')

    expect(container.querySelector('.signature-section')).not.toBeInTheDocument()
    expect(container.querySelector('.gallery-mosaic')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.gallery-feature-card')).toHaveLength(4)
    expect(container.querySelector('.signature-grid')).not.toBeInTheDocument()
    expect(screen.queryByText(galleryItems[4].title)).not.toBeInTheDocument()
  })

  it('renders the requested value, gallery, testimonial, and booking CTA copy', () => {
    renderRoute('/')

    expect(screen.getByText(/organized appointments and attentive care/i)).toBeInTheDocument()
    expect(screen.getByText(/choose the appointment setting that works best/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /protective styles crafted with precision/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view full gallery/i })).toHaveAttribute('href', '/gallery')
    expect(screen.getByText(/my knotless braids were so neat and lightweight/i)).toBeInTheDocument()
    expect(screen.getByText(/ama k\./i)).toBeInTheDocument()
    expect(screen.getByText('01 / 08')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ready for your next look/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /book appointment/i }).some((link) => link.getAttribute('href') === '/booking')).toBe(true)
  })


  it('navigates testimonial slides manually and loops infinitely in both directions', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    const previousButton = screen.getByRole('button', { name: /previous testimonial/i })
    const nextButton = screen.getByRole('button', { name: /next testimonial/i })

    expect(screen.getByText(/ama k\./i)).toBeInTheDocument()
    expect(screen.getByText('01 / 08')).toBeInTheDocument()

    await user.click(previousButton)
    expect(screen.getByText(/leah d\./i)).toBeInTheDocument()
    expect(screen.getByText('08 / 08')).toBeInTheDocument()

    await user.click(nextButton)
    expect(screen.getByText(/ama k\./i)).toBeInTheDocument()
    expect(screen.getByText('01 / 08')).toBeInTheDocument()

    await user.click(nextButton)
    expect(screen.getByText(/nia o\./i)).toBeInTheDocument()
    expect(screen.getByText('02 / 08')).toBeInTheDocument()
  })


  it('selects testimonials directly through accessible avatar controls', async () => {
    const user = userEvent.setup()
    const { container } = renderRoute('/')

    const sadeButton = screen.getByRole('button', { name: /show testimonial from sade b\./i })
    expect(container.querySelectorAll('.testimonial-indicator')).toHaveLength(8)
    expect(screen.getByRole('button', { name: /show testimonial from ama k\./i })).toHaveAttribute('aria-current', 'true')

    await user.click(sadeButton)

    expect(screen.getByText(/professional, gentle, and very detailed/i)).toBeInTheDocument()
    expect(screen.getByText(/sade b\./i)).toBeInTheDocument()
    expect(screen.getByText('04 / 08')).toBeInTheDocument()
    expect(sadeButton).toHaveAttribute('aria-current', 'true')
  })


  it('renders fallback initials when a testimonial has no avatar image', async () => {
    const user = userEvent.setup()
    const { container } = renderRoute('/')

    await user.click(screen.getByRole('button', { name: /show testimonial from aaliyah m\./i }))

    expect(screen.getByText(/aaliyah m\./i)).toBeInTheDocument()
    expect(container.querySelector('.testimonial-avatar-fallback')).toHaveTextContent('AM')
  })

  it('defines the locked dark luxury homepage design hooks', () => {
    const styles = homeStyles()

    expect(styles).toContain('--color-page-background: #171311;')
    expect(styles).toContain('--color-card-background: #221c19;')
    expect(styles).toContain('--color-accent-gold: #b78652;')
    expect(styles).toContain('--color-text-primary: #f5eee8;')
    expect(styles).toContain('.luxury-homepage')
    expect(styles).toContain('.gallery-feature-grid')
    expect(styles).toContain('.gallery-feature-card:hover img')
    expect(styles).toContain('transform: scale(1.06);')
    expect(styles).toContain('.gallery-feature-card::before')
    expect(styles).toContain('var(--theme-espresso-a078)')
    expect(styles).toContain('.luxury-homepage .btn:focus-visible')
    expect(styles).toContain('.testimonial-indicators')
    expect(styles).toContain('.testimonial-indicator.is-active')
    expect(styles).toContain('.testimonial-content')
    expect(styles).toContain('.client-love-lede')
    expect(styles).toContain('animation: testimonial-reveal 320ms cubic-bezier(0.16, 1, 0.3, 1);')
    expect(styles).toContain('@keyframes testimonial-reveal')
    expect(styles).toContain('.testimonial-content {\n    animation: none;')
    expect(styles).toContain('outline: 3px solid var(--theme-gold-a045);')
    expect(styles).toContain('@media (max-width: 760px)')
    expect(styles).toContain('.gallery-feature-grid {\n    grid-template-columns: 1fr;')
    expect(styles).toContain('.gallery-feature-card:nth-child(2),\n  .gallery-feature-card:nth-child(5) {\n    transform: none;')
  })

  it('keeps decorative homepage imagery quiet for assistive technology', () => {
    renderRoute('/')

    const decorativeImages = [
      ...document.querySelectorAll('.client-avatar-stack img'),
      ...document.querySelectorAll('.booking-cta-texture'),
    ]

    expect(decorativeImages.length).toBeGreaterThan(0)
    decorativeImages.forEach((image) => {
      expect(image).toHaveAttribute('alt', '')
      expect(image).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('keeps booking and style CTAs route-safe', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    screen.getAllByRole('link', { name: /book appointment/i }).forEach((link) => {
      expect(link).toHaveAttribute('href', '/booking')
    })
    expect(within(screen.getByRole('navigation', { name: /main navigation/i })).getByRole('link', { name: /^services$/i })).toHaveAttribute('href', '/services')
    const viewStylesLink = screen.getByRole('link', { name: /view styles/i })
    expect(viewStylesLink).toHaveAttribute('href', '/gallery')
    expect(screen.getByRole('link', { name: /view full gallery/i })).toHaveAttribute('href', '/gallery')
    await user.click(viewStylesLink)
    expect(await screen.findByRole('heading', { name: /^gallery$/i })).toBeInTheDocument()
  })

  it('defines smallest-phone fallbacks for the luxury homepage', () => {
    const styles = homeStyles()

    expect(styles).toContain('@media (max-width: 480px)')
    expect(styles).toContain('.luxury-trust-strip,\n  .value-row {\n    grid-template-columns: 1fr;')
    expect(styles).toContain('.gallery-feature-card:nth-child(3n) {\n    min-height: 21rem;')
    expect(styles).toContain('.gallery-feature-section {\n    width: min(100% - 1rem, 1240px);')
    expect(styles).toContain('.site-header {\n    width: min(100% - 1rem, 1240px);')
  })

  it('renders the redesigned About page with conversion-focused sections', () => {
    renderRoute('/about')

    expect(screen.getByRole('heading', { name: /about karebraids/i })).toBeInTheDocument()
    expect(screen.getByText(/founded by karen/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /meet karen/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /why clients choose karebraids/i })).toBeInTheDocument()
    expect(screen.getByText(/more than a hairstyle/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /braiding specialties/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /what clients say/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ready for your next style/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /book appointment/i })[0]).toHaveAttribute('href', '/booking')
    expect(screen.getAllByRole('link', { name: /view gallery/i })[0]).toHaveAttribute('href', '/gallery')
  })

  it('keeps About page imagery accessible', () => {
    renderRoute('/about')

    screen.getAllByRole('img').forEach((image) => {
      expect(image).toHaveAttribute('alt')
      expect(image.getAttribute('alt')).not.toEqual('')
    })
  })

  it('prevents the mobile hero carousel zoom from creating horizontal overflow', () => {
    const styles = homeStyles()

    expect(styles).toContain('.hero-slide.is-active {\n    transform: scale(1);')
  })

  it('keeps small-phone homepage decorative panels inside the viewport', () => {
    const styles = homeStyles()

    expect(styles).toContain('.theme-brand-shell .home-hero .hero-copy::before {\n    inset: -0.35rem;')
  })

  it('renders a compact editorial services page header before the service grid', () => {
    const { container } = renderRoute('/services')

    expect(container.querySelector('.services-page')).toHaveClass('dark-services-page')
    expect(container.querySelector('.services-hero')).not.toBeInTheDocument()
    expect(container.querySelector('.services-hero-image')).not.toBeInTheDocument()
    expect(container.querySelector('.services-intro')).not.toBeInTheDocument()
    expect(container.querySelector('.services-page-header')).toBeInTheDocument()
    expect(screen.getByText(/our services/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: /braiding services tailored to your style/i })).toBeInTheDocument()
    expect(screen.getByText(/from knotless braids and stitch braids/i)).toBeInTheDocument()
    const pageHeader = container.querySelector('.services-page-header')
    expect(within(pageHeader).getByRole('link', { name: /view services/i })).toHaveAttribute('href', '#service-category-braids')
    expect(within(pageHeader).getByRole('link', { name: /book appointment/i })).toHaveAttribute('href', '/booking')
    expect(container.querySelector('.services-header-panel')).toHaveTextContent(/knotless braids/i)
    expect(container.querySelector('.services-header-panel')).toHaveTextContent(/custom styles/i)
    expect(screen.getByRole('heading', { level: 2, name: /braiding services/i })).toBeInTheDocument()
    expect([...container.querySelectorAll('.services-page > section')].at(1)).toHaveClass('service-category')
    expect(container.querySelectorAll('.service-card')).toHaveLength(services.length)
    container.querySelectorAll('.service-card').forEach((card) => {
      expect(within(card).getByRole('img')).toHaveAttribute('loading', 'lazy')
      expect(within(card).getByRole('link', { name: /view gallery/i })).toHaveAttribute('href', expect.stringMatching(/^/))
      expect(card.querySelector('a[href="/gallery"]')).not.toBeInTheDocument()
    })
    expect(screen.getByRole('link', { name: /reserve your appointment/i })).toHaveAttribute('href', '/booking')
  })

  it('keeps enriched shared service data compatible with booking consumers', () => {
    expect(services.length).toBeGreaterThanOrEqual(6)
    services.forEach((service) => {
      expect(service).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          category: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          image: expect.stringMatching(/^\/images\//),
          duration: expect.any(String),
          fromPrice: expect.stringMatching(/^From £/),
          isRepresentativeImage: true,
        }),
      )
      expect(galleryItems.map((item) => item.image)).toContain(service.image)
    })
  })

  it('renders featured services before the homepage gallery preview', () => {
    const { container } = renderRoute('/')
    const featuredServices = container.querySelector('.featured-services-section')
    const galleryPreview = container.querySelector('.gallery-feature-section')

    expect(featuredServices).toBeInTheDocument()
    expect(featuredServices.compareDocumentPosition(galleryPreview) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(featuredServices.querySelectorAll('.featured-service-card').length).toBeGreaterThanOrEqual(3)
    expect(within(featuredServices).getByRole('link', { name: /explore all services/i })).toHaveAttribute('href', '/services')
  })

  it('routes footer service browsing links to the services page', () => {
    renderRoute('/')

    const servicesGroup = screen.getByRole('contentinfo').querySelector('.footer-column')
    servicesGroup.querySelectorAll('a').forEach((link) => {
      expect(link).toHaveAttribute('href', '/services')
    })
  })

  it('defines narrow-phone and tactile services browsing refinements', () => {
    const styles = homeStyles()

    expect(styles).toContain('.service-card .text-link:active,\n.featured-services-section .btn:active {')
    expect(styles).toContain('transform: scale(0.98);')
    expect(styles).toContain('@media (max-width: 480px) {\n  .dark-services-page,\n  .featured-services-section {')
    expect(styles).toContain('.services-booking-cta .btn {\n    width: 100%;')
  })

  it('disables services card motion when reduced motion is requested', () => {
    const styles = homeStyles()

    expect(styles).toContain('@media (prefers-reduced-motion: reduce) {\n  .service-card,\n  .service-card .text-link,\n  .featured-services-section .btn {')
    expect(styles).toContain('transition-duration: 0.01ms;')
  })

  it('renders the gallery page', () => {
    const { container } = renderRoute('/gallery')

    expect(container.querySelector('.gallery-page')).toHaveClass('dark-gallery-page')
    expect(container.querySelector('.gallery-title-wrap')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'GALLERY' })).toBeInTheDocument()
    expect(screen.queryByText(/craftsmanship preview/i)).not.toBeInTheDocument()
    expect(container.querySelectorAll('.gallery-card')).toHaveLength(galleryItems.length)
    expect(screen.getByRole('region', { name: /gallery image wall/i })).toHaveClass(
      'gallery-grid',
    )
  })

  it('defines the square Figma-style gallery grid treatment', () => {
    const styles = homeStyles()

    expect(styles).toContain('.gallery-title-wrap')
    expect(styles).toContain('grid-template-columns: repeat(3, minmax(0, 1fr));')
    expect(styles).toContain('aspect-ratio: 1 / 1;')
    expect(styles).toContain('grid-column: auto;')
    expect(styles).toContain('grid-row: auto;')
    expect(styles).toContain('.gallery-card span {\n  display: none;')
    expect(styles).toContain('@media (max-width: 900px)')
    expect(styles).toContain('grid-template-columns: repeat(2, minmax(0, 1fr));')
    expect(styles).toContain('@media (max-width: 560px)')
  })

  it('defines the light Figma-style gallery modal treatment', () => {
    const styles = homeStyles()

    expect(styles).toContain('background: var(--theme-modal-ink-a078);')
    expect(styles).toContain('backdrop-filter: blur(2px);')
    expect(styles).toContain('width: min(90vw, 52rem);')
    expect(styles).toContain('background: var(--theme-modal-cream-solid);')
    expect(styles).toContain('object-fit: contain;')
    expect(styles).toContain('.modal-copy {\n  display: none;')
  })

  it('defines a refined booking flow treatment', () => {
    const styles = homeStyles()

    expect(styles).toContain('.theme-brand-shell .booking-panel::before')
    expect(styles).toContain('.theme-brand-shell .booking-service::after')
    expect(styles).toContain('.theme-brand-shell .field-group:focus-within')
    expect(styles).toContain('background: var(--theme-cream-highlight-a008);')
    expect(styles).toContain('box-shadow: inset 0 1px 0 var(--theme-cream-highlight-a008);')
  })

  it('opens and closes the mobile navigation drawer', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    const menuButton = screen.getByRole('button', { name: /open mobile navigation/i })

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()

    await user.click(menuButton)

    const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i })
    expect(screen.getByRole('button', { name: /close mobile navigation/i })).toHaveFocus()
    expect(mobileNav).toBeInTheDocument()
    expect(mobileNav).toHaveTextContent(/home/i)
    expect(mobileNav).toHaveTextContent(/services/i)
    expect(mobileNav).toHaveTextContent(/about/i)
    expect(mobileNav).toHaveTextContent(/gallery/i)
    expect(mobileNav).toHaveTextContent(/booking/i)
    expect(mobileNav).toHaveTextContent(/contact/i)
    expect(within(mobileNav).getByRole('link', { name: /^booking$/i })).toHaveClass('primary')
    expect(within(mobileNav).getByRole('link', { name: /^services$/i })).toHaveAttribute(
      'href',
      '/services',
    )
    expect(document.body).toHaveClass('mobile-nav-open')

    await user.click(screen.getByRole('button', { name: /close mobile navigation/i }))

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(document.body).not.toHaveClass('mobile-nav-open')
  })

  it('closes the mobile navigation drawer from escape, backdrop, and link selection', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    const menuButton = screen.getByRole('button', { name: /open mobile navigation/i })

    await user.click(menuButton)
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(document.body).not.toHaveClass('mobile-nav-open')
    expect(menuButton).toHaveFocus()

    await user.click(menuButton)
    await user.click(screen.getByRole('button', { name: /dismiss mobile navigation/i }))

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(document.body).not.toHaveClass('mobile-nav-open')

    await user.click(menuButton)
    await user.click(
      within(screen.getByRole('navigation', { name: /mobile navigation/i })).getByRole('link', {
        name: /^gallery$/i,
      }),
    )

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'GALLERY' })).toBeInTheDocument()
  })
})
