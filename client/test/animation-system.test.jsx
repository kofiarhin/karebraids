import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { animationDefaults, gsap, ScrollTrigger } from '../src/animations/gsapSetup.js'
import { ImageReveal } from '../src/components/animations/ImageReveal.jsx'
import { PageTransition } from '../src/components/animations/PageTransition.jsx'
import { ParallaxLayer } from '../src/components/animations/ParallaxLayer.jsx'
import { Reveal } from '../src/components/animations/Reveal.jsx'
import { ScopedPageReveals } from '../src/components/animations/ScopedPageReveals.jsx'
import { StaggerReveal } from '../src/components/animations/StaggerReveal.jsx'
import { useReducedMotion } from '../src/hooks/useReducedMotion.js'

function ReducedMotionProbe() {
  const reducedMotion = useReducedMotion()
  return <output>{reducedMotion ? 'reduced' : 'full'}</output>
}

const originalMatchMedia = window.matchMedia

function useReducedMotionPreference() {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockReturnValue({
      matches: true,
      media: '(prefers-reduced-motion: reduce)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  })
}

afterEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: originalMatchMedia,
  })
})

describe('GSAP animation foundation', () => {
  it('exports centralized GSAP setup and restrained defaults', () => {
    expect(gsap).toBeDefined()
    expect(ScrollTrigger).toBeDefined()
    expect(animationDefaults).toEqual(
      expect.objectContaining({
        duration: expect.any(Number),
        ease: expect.any(String),
        distance: expect.any(Number),
        stagger: expect.any(Number),
      }),
    )
    expect(animationDefaults.distance).toBeLessThanOrEqual(32)
    expect(animationDefaults.stagger).toBeLessThanOrEqual(0.1)
  })

  it('preserves semantic markup through reusable animation primitives', () => {
    useReducedMotionPreference()

    const { container } = render(
      <PageTransition className="route-shell">
        <Reveal as="section" className="intro">
          <h1>Public page</h1>
        </Reveal>
        <StaggerReveal as="ul" className="items">
          <li>One</li>
          <li>Two</li>
        </StaggerReveal>
        <ImageReveal className="portrait">
          <img alt="Braided style" src="/images/braids_1.jpg" />
        </ImageReveal>
        <ParallaxLayer as="aside" className="accent">
          <span>Detail</span>
        </ParallaxLayer>
      </PageTransition>,
    )

    expect(screen.getByRole('heading', { name: /public page/i })).toBeInTheDocument()
    expect(screen.getByRole('list')).toHaveClass('items')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByRole('img', { name: /braided style/i })).toBeInTheDocument()
    expect(container.querySelector('.route-shell')).toHaveAttribute('data-page-transition')
    expect(container.querySelector('.intro')).toHaveAttribute('data-gsap-reveal')
    expect(container.querySelector('.portrait')).toHaveAttribute('data-image-reveal')
    expect(container.querySelector('.accent')).toHaveAttribute('data-parallax-layer')
  })

  it('reports reduced motion from the operating-system preference', () => {
    useReducedMotionPreference()

    render(<ReducedMotionProbe />)

    expect(screen.getByText('reduced')).toBeInTheDocument()
  })

  it('provides a scoped page reveal boundary for sections and dynamic items', () => {
    useReducedMotionPreference()

    const { container } = render(
      <ScopedPageReveals variant="booking">
        <section>Hero</section>
        <div data-motion-item>Form</div>
      </ScopedPageReveals>,
    )

    expect(container.querySelector('[data-page-motion]')).toHaveAttribute(
      'data-motion-variant',
      'booking',
    )
    expect(screen.getByText('Hero')).toBeVisible()
    expect(screen.getByText('Form')).toBeVisible()
  })
})
