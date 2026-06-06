import { useEffect, useMemo, useState } from 'react'
import {
  getStoredTheme,
  getSystemMediaQuery,
  isThemePreference,
  resolveTheme,
  setStoredTheme,
} from './theme.js'
import { ThemeContext } from './ThemeContext.js'

function getInitialSystemPreference() {
  return getSystemMediaQuery()?.matches ?? false
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getStoredTheme)
  const [systemPrefersDark, setSystemPrefersDark] = useState(getInitialSystemPreference)
  const resolvedTheme = resolveTheme(theme, systemPrefersDark)

  useEffect(() => {
    const mediaQuery = getSystemMediaQuery()
    if (!mediaQuery) return undefined

    const handleChange = (event) => setSystemPrefersDark(event.matches)

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }

    mediaQuery.addListener?.(handleChange)
    return () => mediaQuery.removeListener?.(handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
    document.documentElement.style.colorScheme = resolvedTheme
  }, [resolvedTheme])

  const value = useMemo(
    () => ({
      resolvedTheme,
      setTheme(nextTheme) {
        if (!isThemePreference(nextTheme)) return false
        setThemeState(nextTheme)
        setStoredTheme(nextTheme)
        return true
      },
      theme,
    }),
    [resolvedTheme, theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
