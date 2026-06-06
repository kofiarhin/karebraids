import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from './ThemeProvider.jsx'
import { useTheme } from './ThemeContext.js'
import {
  THEME_STORAGE_KEY,
  getStoredTheme,
  resolveTheme,
  setStoredTheme,
} from './theme.js'

function installMatchMedia(initialMatches = false) {
  let matches = initialMatches
  const listeners = new Set()
  const mediaQuery = {
    get matches() {
      return matches
    },
    media: '(prefers-color-scheme: dark)',
    addEventListener: vi.fn((event, listener) => {
      if (event === 'change') listeners.add(listener)
    }),
    removeEventListener: vi.fn((event, listener) => {
      if (event === 'change') listeners.delete(listener)
    }),
    dispatch(nextMatches) {
      matches = nextMatches
      const event = { matches, media: this.media }
      listeners.forEach((listener) => listener(event))
    },
  }

  vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))
  return mediaQuery
}

function ThemeConsumer() {
  const { resolvedTheme, setTheme, theme } = useTheme()

  return (
    <div>
      <output aria-label="theme preference">{theme}</output>
      <output aria-label="resolved theme">{resolvedTheme}</output>
      <button onClick={() => setTheme('light')} type="button">Light</button>
      <button onClick={() => setTheme('dark')} type="button">Dark</button>
      <button onClick={() => setTheme('system')} type="button">System</button>
    </div>
  )
}

function renderThemeProvider() {
  return render(
    <ThemeProvider>
      <ThemeConsumer />
    </ThemeProvider>,
  )
}

describe('theme helpers', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults missing and invalid stored values to system', () => {
    expect(getStoredTheme()).toBe('system')
    localStorage.setItem(THEME_STORAGE_KEY, 'sepia')
    expect(getStoredTheme()).toBe('system')
  })

  it('persists only supported theme preferences', () => {
    expect(setStoredTheme('dark')).toBe(true)
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    expect(setStoredTheme('sepia')).toBe(false)
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })

  it('resolves explicit and system preferences', () => {
    expect(resolveTheme('light', true)).toBe('light')
    expect(resolveTheme('dark', false)).toBe('dark')
    expect(resolveTheme('system', true)).toBe('dark')
    expect(resolveTheme('system', false)).toBe('light')
  })
})

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('defaults to system mode and applies the resolved system theme', () => {
    installMatchMedia(true)
    renderThemeProvider()

    expect(screen.getByLabelText('theme preference')).toHaveTextContent('system')
    expect(screen.getByLabelText('resolved theme')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('applies and persists explicit light and dark selections', async () => {
    installMatchMedia(false)
    const user = userEvent.setup()
    renderThemeProvider()

    await user.click(screen.getByRole('button', { name: 'Dark' }))
    expect(screen.getByLabelText('theme preference')).toHaveTextContent('dark')
    expect(screen.getByLabelText('resolved theme')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')

    await user.click(screen.getByRole('button', { name: 'Light' }))
    expect(screen.getByLabelText('resolved theme')).toHaveTextContent('light')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
  })

  it('restores a persisted preference', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    installMatchMedia(false)
    renderThemeProvider()

    expect(screen.getByLabelText('theme preference')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('tracks system preference changes live while system mode is selected', () => {
    const mediaQuery = installMatchMedia(false)
    renderThemeProvider()

    expect(document.documentElement).toHaveAttribute('data-theme', 'light')

    act(() => mediaQuery.dispatch(true))

    expect(screen.getByLabelText('resolved theme')).toHaveTextContent('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
  })

  it('supports legacy media-query listeners and removes them on unmount', () => {
    let listener
    const mediaQuery = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      addListener: vi.fn((nextListener) => {
        listener = nextListener
      }),
      removeListener: vi.fn(),
    }
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { unmount } = renderThemeProvider()
    act(() => {
      mediaQuery.matches = true
      listener({ matches: true, media: mediaQuery.media })
    })

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    unmount()
    expect(mediaQuery.removeListener).toHaveBeenCalledWith(listener)
  })

  it('keeps an explicit preference when the system preference changes', async () => {
    const mediaQuery = installMatchMedia(false)
    const user = userEvent.setup()
    renderThemeProvider()

    await user.click(screen.getByRole('button', { name: 'Light' }))
    act(() => mediaQuery.dispatch(true))

    expect(screen.getByLabelText('theme preference')).toHaveTextContent('light')
    expect(screen.getByLabelText('resolved theme')).toHaveTextContent('light')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })
})
