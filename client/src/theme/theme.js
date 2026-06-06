export const THEME_STORAGE_KEY = 'karebraids-theme'
export const SYSTEM_THEME_QUERY = '(prefers-color-scheme: dark)'

export const THEME_PREFERENCES = Object.freeze({
  SYSTEM: 'system',
  LIGHT: 'light',
  DARK: 'dark',
})

export const THEME_OPTIONS = Object.freeze([
  THEME_PREFERENCES.SYSTEM,
  THEME_PREFERENCES.LIGHT,
  THEME_PREFERENCES.DARK,
])

export function isThemePreference(value) {
  return THEME_OPTIONS.includes(value)
}

export function getStoredTheme(storage = globalThis.localStorage) {
  try {
    const storedTheme = storage?.getItem(THEME_STORAGE_KEY)
    return isThemePreference(storedTheme) ? storedTheme : THEME_PREFERENCES.SYSTEM
  } catch {
    return THEME_PREFERENCES.SYSTEM
  }
}

export function setStoredTheme(theme, storage = globalThis.localStorage) {
  if (!isThemePreference(theme)) return false

  try {
    storage?.setItem(THEME_STORAGE_KEY, theme)
    return true
  } catch {
    return false
  }
}

export function getSystemMediaQuery(matchMedia = globalThis.matchMedia) {
  if (typeof matchMedia !== 'function') return null

  try {
    return matchMedia(SYSTEM_THEME_QUERY)
  } catch {
    return null
  }
}

export function getSystemTheme(matchMedia = globalThis.matchMedia) {
  return getSystemMediaQuery(matchMedia)?.matches
    ? THEME_PREFERENCES.DARK
    : THEME_PREFERENCES.LIGHT
}

export function resolveTheme(theme, systemPrefersDark = false) {
  if (theme === THEME_PREFERENCES.DARK) return THEME_PREFERENCES.DARK
  if (theme === THEME_PREFERENCES.LIGHT) return THEME_PREFERENCES.LIGHT
  return systemPrefersDark ? THEME_PREFERENCES.DARK : THEME_PREFERENCES.LIGHT
}
