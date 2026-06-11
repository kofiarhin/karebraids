import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const animationDefaults = Object.freeze({
  duration: 0.62,
  ease: 'power2.out',
  distance: 24,
  stagger: 0.075,
  start: 'top 88%',
})

export { animationDefaults, gsap, ScrollTrigger, useGSAP }
