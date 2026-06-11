import { useRef } from 'react'
import { animationDefaults, gsap, useGSAP } from '../../animations/gsapSetup.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

export function ImageReveal({ as: Component = 'div', children, className = '', ...props }) {
  const scope = useRef(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      const image = scope.current?.querySelector('img')
      if (!image || reducedMotion) return

      gsap.fromTo(
        image,
        { autoAlpha: 0, scale: 1.06 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.78,
          ease: animationDefaults.ease,
          scrollTrigger: {
            trigger: scope.current,
            start: animationDefaults.start,
            once: true,
          },
        },
      )
    },
    { dependencies: [reducedMotion], scope, revertOnUpdate: true },
  )

  return (
    <Component className={className} data-image-reveal ref={scope} {...props}>
      {children}
    </Component>
  )
}
