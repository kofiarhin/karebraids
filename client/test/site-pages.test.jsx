import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { render, screen, within } from '@testing-library/react'
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
  it('renders the redesigned homepage with dark luxury header navigation', () => {
    const { container } = renderRoute('/')

    expect(container.querySelector('.site-shell')).toHaveClass('dark-brand-shell')
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
    expect(screen.getByText(/premium salon and mobile braiding services across london/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view styles/i })).toHaveAttribute('href', '#signature-styles')
    expect(screen.getByText(/500\+ happy clients/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/karebraids trust highlights/i)).toHaveTextContent(/london based/i)
    expect(screen.getByText(/signature styles/i)).toBeInTheDocument()
    expect(screen.getByText(/why choose karebraids/i)).toBeInTheDocument()
    expect(screen.getByText(/gallery preview/i)).toBeInTheDocument()
    expect(screen.getByText(/client love/i)).toBeInTheDocument()
    expect(screen.getByText(/ready for your next style/i)).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toHaveTextContent(/mon - sat: 8am - 7pm/i)
    expect(container.querySelectorAll('[data-reveal]').length).toBeGreaterThan(8)
  })

  it('renders editorial homepage images with accessible semantics', () => {
    const { container } = renderRoute('/')

    expect(screen.getByRole('img', { name: /black woman with long sculpted braids/i })).toHaveAttribute(
      'src',
      galleryItems[0].image,
    )
    expect(screen.getByRole('img', { name: /salon braiding detail/i })).toHaveAttribute(
      'src',
      galleryItems.find((item) => item.id === 'process-detail').image,
    )
    expect(screen.getByRole('img', { name: /jasmine a. client portrait/i })).toBeInTheDocument()
    expect(container.querySelectorAll('.gallery-mosaic img')).toHaveLength(4)
    container.querySelectorAll('.client-avatar-stack img').forEach((image) => {
      expect(image).toHaveAttribute('alt', '')
      expect(image).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('shows the five approved mockup signature styles and prices only', () => {
    renderRoute('/')

    expect(screen.getByLabelText('Knotless Braids, From \u00a3120')).toBeInTheDocument()
    expect(screen.getByLabelText('Boho Braids, From \u00a3150')).toBeInTheDocument()
    expect(screen.getByLabelText('Stitch Braids, From \u00a3130')).toBeInTheDocument()
    expect(screen.getByLabelText('Twists / Locs, From \u00a3140')).toBeInTheDocument()
    expect(screen.getByLabelText('Cornrows, From \u00a3100')).toBeInTheDocument()
    expect(screen.queryByLabelText(/kids braids/i)).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/box braids/i)).not.toBeInTheDocument()
  })

  it('renders the requested value, gallery, testimonial, and booking CTA copy', () => {
    renderRoute('/')

    expect(screen.getByText(/neat, lightweight and flawless every time/i)).toBeInTheDocument()
    expect(screen.getByText(/we come to you - home, hotel or workplace/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /see the finish before you book/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view gallery/i })).toHaveAttribute('href', '/gallery')
    expect(screen.getByText(/my braids were neat, lightweight and lasted beautifully/i)).toBeInTheDocument()
    expect(screen.getByText(/jasmine a\./i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /let's get you booked/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /book your appointment/i })).toHaveAttribute('href', '/booking')
  })

  it('defines the locked dark luxury homepage design hooks', () => {
    const styles = homeStyles()

    expect(styles).toContain('--espresso-noir: #171311;')
    expect(styles).toContain('--smoked-cocoa: #221C19;')
    expect(styles).toContain('--burnished-bronze: #B78652;')
    expect(styles).toContain('--warm-ivory: #F5EEE8;')
    expect(styles).toContain('.luxury-homepage')
    expect(styles).toContain('.signature-grid')
    expect(styles).toContain('.service-card:hover img')
    expect(styles).toContain('transform: scale(1.04);')
    expect(styles).toContain('.service-card::before')
    expect(styles).toContain('rgba(23, 19, 17, 0.78)')
    expect(styles).toContain('.luxury-homepage .btn:focus-visible')
    expect(styles).toContain('outline: 3px solid rgba(183, 134, 82, 0.45);')
    expect(styles).toContain('@media (max-width: 760px)')
    expect(styles).toContain('.signature-grid {\n    display: flex;')
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

  it('keeps booking and style CTAs route-safe', () => {
    renderRoute('/')

    screen.getAllByRole('link', { name: /book appointment/i }).forEach((link) => {
      expect(link).toHaveAttribute('href', '/booking')
    })
    screen.getAllByRole('link', { name: /book this style/i }).forEach((link) => {
      expect(link).toHaveAttribute('href', '/booking')
    })
    expect(screen.getByRole('link', { name: /view all services/i })).toHaveAttribute('href', '/booking')
    expect(screen.getByRole('link', { name: /view gallery/i })).toHaveAttribute('href', '/gallery')
  })

  it('defines smallest-phone fallbacks for the luxury homepage', () => {
    const styles = homeStyles()

    expect(styles).toContain('@media (max-width: 480px)')
    expect(styles).toContain('.luxury-trust-strip,\n  .value-row {\n    grid-template-columns: 1fr;')
    expect(styles).toContain('.signature-grid {\n    margin-inline: -0.5rem;')
    expect(styles).toContain('.site-header {\n    width: min(100% - 1rem, 1240px);')
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
    expect(mobileNav).toHaveTextContent(/services/i)
    expect(mobileNav).toHaveTextContent(/about/i)
    expect(mobileNav).toHaveTextContent(/gallery/i)
    expect(mobileNav).toHaveTextContent(/booking/i)
    expect(mobileNav).toHaveTextContent(/contact/i)
    expect(within(mobileNav).getByRole('link', { name: /^booking$/i })).toHaveClass('primary')
    expect(within(mobileNav).getByRole('link', { name: /^services$/i })).toHaveAttribute(
      'href',
      '#signature-styles',
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
    expect(screen.getByRole('heading', { name: /braid gallery/i })).toBeInTheDocument()
  })
})
