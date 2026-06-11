import { animationDefaults, gsap, useGSAP } from '../animations/gsapSetup.js'
import { useReducedMotion } from './useReducedMotion.js'

export function useScrollReveal(
  scope,
  {
    childSelector,
    delay = 0,
    distance = animationDefaults.distance,
    duration = animationDefaults.duration,
    once = true,
    stagger = 0,
    start = animationDefaults.start,
    x = 0,
  } = {},
) {
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!scope.current) return

      const targets = childSelector
        ? gsap.utils.toArray(scope.current.querySelectorAll(childSelector))
        : [scope.current]

      if (!targets.length || reducedMotion) {
        gsap.set(targets, { clearProps: 'all' })
        return
      }

      gsap.fromTo(
        targets,
        { autoAlpha: 0, x, y: distance },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          delay,
          duration,
          ease: animationDefaults.ease,
          stagger,
          scrollTrigger: {
            trigger: scope.current,
            start,
            once,
          },
        },
      )
    },
    {
      dependencies: [childSelector, delay, distance, duration, once, reducedMotion, stagger, start, x],
      scope,
      revertOnUpdate: true,
    },
  )

  return reducedMotion
}
