import { useRef } from 'react'
import { animationDefaults, gsap, useGSAP } from '../../animations/gsapSetup.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

const variantSettings = {
  booking: { distance: 12, duration: 0.42, stagger: 0.045 },
  gallery: { distance: 28, duration: 0.72, stagger: 0.07 },
  standard: {
    distance: animationDefaults.distance,
    duration: animationDefaults.duration,
    stagger: animationDefaults.stagger,
  },
}

export function ScopedPageReveals({ children, variant = 'standard' }) {
  const scope = useRef(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!scope.current || reducedMotion) return undefined

      const settings = variantSettings[variant] || variantSettings.standard
      const animatedElements = new WeakSet()

      const revealElements = (root) => {
        const candidates = []

        if (root instanceof Element && root.matches('section, [data-motion-item]')) {
          candidates.push(root)
        }

        if (typeof root.querySelectorAll === 'function') {
          candidates.push(...root.querySelectorAll('section, [data-motion-item]'))
        }

        candidates.forEach((element, index) => {
          if (animatedElements.has(element)) return
          animatedElements.add(element)

          gsap.fromTo(
            element,
            { autoAlpha: 0, y: settings.distance },
            {
              autoAlpha: 1,
              y: 0,
              duration: settings.duration,
              delay: Math.min(index * settings.stagger, 0.24),
              ease: animationDefaults.ease,
              scrollTrigger: {
                trigger: element,
                start: animationDefaults.start,
                once: true,
              },
            },
          )
        })
      }

      revealElements(scope.current)

      const observer = new MutationObserver((records) => {
        records.forEach((record) => {
          record.addedNodes.forEach((node) => {
            if (node instanceof Element) revealElements(node)
          })
        })
      })

      observer.observe(scope.current, { childList: true, subtree: true })
      return () => observer.disconnect()
    },
    { dependencies: [reducedMotion, variant], scope, revertOnUpdate: true },
  )

  return (
    <div data-motion-variant={variant} data-page-motion ref={scope}>
      {children}
    </div>
  )
}
