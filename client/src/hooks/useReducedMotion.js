import { useEffect, useState } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function getInitialPreference() {
  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia(reducedMotionQuery).matches
}

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(getInitialPreference)

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined

    const mediaQuery = window.matchMedia(reducedMotionQuery)
    const updatePreference = (event) => setReducedMotion(event.matches)

    mediaQuery.addEventListener?.('change', updatePreference)

    return () => {
      mediaQuery.removeEventListener?.('change', updatePreference)
    }
  }, [])

  return reducedMotion
}
