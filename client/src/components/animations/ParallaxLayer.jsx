import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsapSetup.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

export function ParallaxLayer({
  as: Component = 'div',
  children,
  className = '',
  distance = 28,
  ...props
}) {
  const scope = useRef(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!scope.current || reducedMotion) return

      gsap.fromTo(
        scope.current,
        { y: -distance / 2 },
        {
          y: distance / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        },
      )
    },
    { dependencies: [distance, reducedMotion], scope, revertOnUpdate: true },
  )

  return (
    <Component className={className} data-parallax-layer ref={scope} {...props}>
      {children}
    </Component>
  )
}
