import { useRef } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal.js'

export function Reveal({
  as: Component = 'div',
  children,
  className = '',
  delay = 0,
  distance,
  x = 0,
  ...props
}) {
  const scope = useRef(null)
  useScrollReveal(scope, { delay, distance, x })

  return (
    <Component className={className} data-gsap-reveal ref={scope} {...props}>
      {children}
    </Component>
  )
}
