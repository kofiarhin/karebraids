import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import { galleryItems } from '../src/constants/content.js'

const originalMatchMedia = window.matchMedia
const testDirectory = path.dirname(fileURLToPath(import.meta.url))
const homeStyles = () => fs.readFileSync(path.join(testDirectory, '../src/index.css'), 'utf8')

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
  it('renders the home page with primary booking navigation', () => {
    const { container } = renderRoute('/')

    expect(container.querySelector('.site-shell')).toHaveClass('dark-brand-shell')
    expect(screen.getByRole('heading', { name: /karebraids/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /book now/i })).toHaveLength(2)
    expect(screen.getByRole('link', { name: /view gallery/i })).toHaveAttribute('href', '/gallery')
    expect(screen.getByRole('link', { name: /start booking/i })).toHaveAttribute('href', '/booking')
  })

  it('keeps the full homepage section story intact', () => {
    const { container } = renderRoute('/')

    expect(container.querySelector('.home-hero')).toHaveClass('dark-home-hero')
    expect(screen.getByText(/premium african hair braiding in london/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/karebraids trust highlights/i)).toHaveTextContent(/protective styling/i)
    expect(screen.getByText(/featured services/i)).toBeInTheDocument()
    expect(screen.getByText(/why choose karebraids/i)).toBeInTheDocument()
    expect(screen.getByText(/gallery preview/i)).toBeInTheDocument()
    expect(screen.getByText(/the parting was immaculate/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /choose your service, date/i })).toBeInTheDocument()
    expect(container.querySelectorAll('[data-reveal]').length).toBeGreaterThan(6)
    expect(container.querySelector('[data-parallax]')).toBeInTheDocument()
  })

  it('renders gallery-driven visual elements across homepage sections', () => {
    const { container } = renderRoute('/')

    const trustCluster = screen.getByLabelText(/featured trust style thumbnails/i)
    expect(trustCluster.querySelectorAll('img')).toHaveLength(4)

    const serviceImages = container.querySelectorAll('.service-tile img')
    expect(serviceImages).toHaveLength(6)
    expect(serviceImages[0]).toHaveAttribute('src', galleryItems[0].image)
    expect(serviceImages[0]).toHaveAttribute('alt', 'Knotless Braids style inspiration')

    expect(screen.getByRole('img', { name: /process detail for careful braid work/i })).toHaveAttribute(
      'src',
      galleryItems.find((item) => item.id === 'process-detail').image,
    )
    expect(screen.getByLabelText(/testimonial style visuals/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/book a karebraids appointment/i).querySelector('.cta-image')).toHaveAttribute(
      'src',
      galleryItems[8].image,
    )
  })

  it('keeps decorative homepage thumbnail clusters quiet for assistive technology', () => {
    renderRoute('/')

    const trustImages = screen
      .getByLabelText(/featured trust style thumbnails/i)
      .querySelectorAll('img')

    expect(trustImages).toHaveLength(4)
    trustImages.forEach((image) => {
      expect(image).toHaveAttribute('alt', '')
      expect(image).toHaveAttribute('aria-hidden', 'true')
      expect(image).toHaveAttribute('loading', 'lazy')
    })
  })

  it('keeps the image-backed booking CTA action clear without repeating decorative image text', () => {
    renderRoute('/')

    const cta = screen.getByLabelText(/book a karebraids appointment/i)
    const ctaImage = cta.querySelector('.cta-image')

    expect(ctaImage).toHaveAttribute('alt', '')
    expect(ctaImage).toHaveAttribute('aria-hidden', 'true')
    expect(ctaImage).toHaveAttribute('loading', 'lazy')
    expect(within(cta).getByRole('link', { name: /start booking/i })).toHaveAttribute(
      'href',
      '/booking',
    )
  })

  it('uses lighter home image overlays instead of full dark image covers', () => {
    const styles = homeStyles()

    expect(styles).toContain('rgba(36, 20, 8, 0.58)')
    expect(styles).toContain('rgba(255, 250, 246, 0.72)')
    expect(styles).not.toContain('rgba(36, 20, 8, 0.88)')
    expect(styles).not.toContain('rgba(36, 20, 8, 0.96), rgba(53, 30, 12, 0.82)')
  })

  it('keeps brighter image-backed CTA text readable with a localized panel', () => {
    const styles = homeStyles()

    expect(styles).toContain('.cta-copy')
    expect(styles).toContain('background: rgba(36, 20, 8, 0.46);')
    expect(styles).toContain('max-width: 52rem;')
  })

  it('renders clickable hero carousel dots for the first five gallery images', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    const heroSlides = galleryItems.slice(0, 5)
    const carousel = screen.getByRole('region', { name: /featured braid styles carousel/i })
    const dotGroup = within(carousel).getByRole('group', { name: /hero image slides/i })
    const firstDot = within(carousel).getByRole('button', { name: `Show ${heroSlides[0].title}` })
    const fifthDot = within(carousel).getByRole('button', { name: `Show ${heroSlides[4].title}` })

    expect(within(dotGroup).getAllByRole('button', { name: /^show /i })).toHaveLength(5)
    expect(carousel.querySelectorAll('.hero-slide')).toHaveLength(5)
    expect(firstDot).toHaveAttribute('aria-current', 'true')
    expect(fifthDot).not.toHaveAttribute('aria-current')

    await user.click(fifthDot)

    expect(firstDot).not.toHaveAttribute('aria-current')
    expect(fifthDot).toHaveAttribute('aria-current', 'true')
  })

  it('auto-rotates hero slides on a 4.5 second interval', () => {
    vi.useFakeTimers()
    renderRoute('/')

    const heroSlides = galleryItems.slice(0, 5)
    const carousel = screen.getByRole('region', { name: /featured braid styles carousel/i })
    const firstDot = within(carousel).getByRole('button', { name: `Show ${heroSlides[0].title}` })
    const secondDot = within(carousel).getByRole('button', { name: `Show ${heroSlides[1].title}` })

    expect(firstDot).toHaveAttribute('aria-current', 'true')

    act(() => {
      vi.advanceTimersByTime(4500)
    })

    expect(firstDot).not.toHaveAttribute('aria-current')
    expect(secondDot).toHaveAttribute('aria-current', 'true')
  })

  it('stops hero auto-rotation when reduced motion becomes preferred', () => {
    vi.useFakeTimers()
    let motionChangeHandler
    const mediaQuery = {
      matches: false,
      addEventListener: vi.fn((eventName, handler) => {
        if (eventName === 'change') motionChangeHandler = handler
      }),
      removeEventListener: vi.fn(),
    }

    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: vi.fn(() => mediaQuery),
    })

    renderRoute('/')

    const heroSlides = galleryItems.slice(0, 5)
    const carousel = screen.getByRole('region', { name: /featured braid styles carousel/i })
    const secondDot = within(carousel).getByRole('button', { name: `Show ${heroSlides[1].title}` })
    const thirdDot = within(carousel).getByRole('button', { name: `Show ${heroSlides[2].title}` })

    act(() => {
      vi.advanceTimersByTime(4500)
    })

    expect(secondDot).toHaveAttribute('aria-current', 'true')

    mediaQuery.matches = true
    act(() => {
      motionChangeHandler({ matches: true })
      vi.advanceTimersByTime(4500)
    })

    expect(secondDot).toHaveAttribute('aria-current', 'true')
    expect(thirdDot).not.toHaveAttribute('aria-current')
  })

  it('renders the about page', () => {
    const { container } = renderRoute('/about')

    expect(container.querySelector('.about-page')).toHaveClass('dark-about-page')
    expect(screen.getByRole('heading', { name: /meet karen/i })).toBeInTheDocument()
  })

  it('defines a refined shared public page treatment for home and about', () => {
    const styles = homeStyles()

    expect(styles).toContain('--surface-lift')
    expect(styles).toContain('.dark-brand-shell .page-hero-copy')
    expect(styles).toContain('.dark-brand-shell .about-page::before')
    expect(styles).toContain('.dark-brand-shell .about-image::before')
    expect(styles).toContain('linear-gradient(180deg, rgba(255, 250, 246, 0.13)')
  })

  it('keeps refined public page treatments mobile-safe', () => {
    const styles = homeStyles()

    expect(styles).toContain('@media (max-width: 840px)')
    expect(styles).toContain('.dark-brand-shell .about-page::before {\n    display: none;')
    expect(styles).toContain('.dark-brand-shell .page-hero-copy {\n    padding: clamp(1.1rem, 5vw, 1.5rem);')
    expect(styles).toContain('.dark-brand-shell .home-hero .hero-copy::before {\n    inset: -0.75rem;')
  })

  it('prevents the mobile hero carousel zoom from creating horizontal overflow', () => {
    const styles = homeStyles()

    expect(styles).toContain('.hero-slide.is-active {\n    transform: scale(1);')
  })

  it('keeps small-phone homepage decorative panels inside the viewport', () => {
    const styles = homeStyles()

    expect(styles).toContain('.dark-brand-shell .home-hero .hero-copy::before {\n    inset: -0.35rem;')
  })

  it('renders the gallery page', () => {
    const { container } = renderRoute('/gallery')

    expect(container.querySelector('.gallery-page')).toHaveClass('dark-gallery-page')
    expect(screen.getByRole('heading', { name: /braid gallery/i })).toBeInTheDocument()
    expect(container.querySelectorAll('.gallery-card')).toHaveLength(9)
    expect(screen.getByRole('region', { name: /gallery image wall/i })).toHaveClass(
      'gallery-grid',
    )
  })

  it('defines a refined gallery card and modal treatment', () => {
    const styles = homeStyles()

    expect(styles).toContain('.dark-brand-shell .gallery-card::before')
    expect(styles).toContain('linear-gradient(180deg, rgba(36, 20, 8, 0), rgba(36, 20, 8, 0.62)')
    expect(styles).toContain('.dark-gallery-modal::before')
    expect(styles).toContain('grid-auto-rows: 10.5rem;')
    expect(styles).toContain('background: rgba(36, 20, 8, 0.5);')
  })

  it('defines a refined booking flow treatment', () => {
    const styles = homeStyles()

    expect(styles).toContain('.dark-brand-shell .booking-panel::before')
    expect(styles).toContain('.dark-brand-shell .booking-service::after')
    expect(styles).toContain('.dark-brand-shell .field-group:focus-within')
    expect(styles).toContain('background: rgba(255, 250, 246, 0.08);')
    expect(styles).toContain('box-shadow: inset 0 1px 0 rgba(255, 250, 246, 0.08);')
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
    expect(mobileNav).toHaveTextContent(/about/i)
    expect(mobileNav).toHaveTextContent(/gallery/i)
    expect(mobileNav).toHaveTextContent(/booking/i)
    expect(within(mobileNav).getByRole('link', { name: /^booking$/i })).toHaveClass('primary')
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
    expect(screen.getByRole('heading', { name: /braid gallery/i })).toBeInTheDocument()
  })
})
