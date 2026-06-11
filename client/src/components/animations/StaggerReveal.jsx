import { useRef } from 'react'
import { animationDefaults } from '../../animations/gsapSetup.js'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

export function StaggerReveal({
  as: Component = 'div',
  children,
  className = '',
  distance,
  stagger = animationDefaults.stagger,
  ...props
}) {
  const scope = useRef(null)
  useScrollReveal(scope, { childSelector: ':scope > *', distance, stagger })

  return (
    <Component className={className} data-stagger-reveal ref={scope} {...props}>
      {children}
    </Component>
  )
}
