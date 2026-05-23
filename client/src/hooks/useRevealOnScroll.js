import { useEffect } from 'react'

export function useRevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement
    const revealItems = Array.from(document.querySelectorAll('[data-reveal]'))

    root.classList.add('reveal-ready')

    if (!revealItems.length) {
      return () => {
        root.classList.remove('reveal-ready')
      }
    }

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))

      return () => {
        root.classList.remove('reveal-ready')
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.16,
      },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => {
      observer.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}
