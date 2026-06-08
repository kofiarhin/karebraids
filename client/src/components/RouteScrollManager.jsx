import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

const scrollPositions = new Map()

const getLocationKey = (location) => location.key ?? `${location.pathname}${location.search}`

const saveScrollPosition = (locationKey) => {
  scrollPositions.set(locationKey, {
    x: window.scrollX,
    y: window.scrollY,
  })
}

export function RouteScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const locationKey = getLocationKey(location)
  const previousLocationKeyRef = useRef(locationKey)

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const originalScrollRestoration = window.history.scrollRestoration
      window.history.scrollRestoration = 'manual'

      return () => {
        window.history.scrollRestoration = originalScrollRestoration
      }
    }
  }, [])

  useEffect(() => {
    const previousLocationKey = previousLocationKeyRef.current

    if (previousLocationKey && previousLocationKey !== locationKey) {
      saveScrollPosition(previousLocationKey)
    }

    previousLocationKeyRef.current = locationKey

    const frameId = window.requestAnimationFrame(() => {
      if (navigationType === 'POP') {
        const savedPosition = scrollPositions.get(locationKey)

        if (savedPosition) {
          window.scrollTo(savedPosition.x, savedPosition.y)
        }

        return
      }

      window.scrollTo(0, 0)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [locationKey, navigationType])

  return null
}
