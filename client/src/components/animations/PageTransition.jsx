import { useRef } from 'react'
import { animationDefaults, gsap, useGSAP } from '../../animations/gsapSetup.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

export function PageTransition({ as: Component = 'div', children, className = '', ...props }) {
  const scope = useRef(null)
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!scope.current || reducedMotion) return

      gsap.fromTo(
        scope.current,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          ease: animationDefaults.ease,
          clearProps: 'opacity,transform,visibility',
        },
      )
    },
    { dependencies: [reducedMotion], scope, revertOnUpdate: true },
  )

  return (
    <Component className={className} data-page-transition ref={scope} {...props}>
      {children}
    </Component>
  )
}
