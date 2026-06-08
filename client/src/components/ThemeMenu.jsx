import { useContext, useEffect, useId, useRef, useState } from 'react'
import { Check, DotsThreeVertical, Monitor, Moon, Sun } from '@phosphor-icons/react'
import { ThemeContext } from '../theme/ThemeContext.js'
import {
  THEME_PREFERENCES,
  getStoredTheme,
  getSystemTheme,
  resolveTheme,
  setStoredTheme,
} from '../theme/theme.js'

const themeOptions = [
  { icon: Monitor, label: 'System', value: THEME_PREFERENCES.SYSTEM },
  { icon: Sun, label: 'Light', value: THEME_PREFERENCES.LIGHT },
  { icon: Moon, label: 'Dark', value: THEME_PREFERENCES.DARK },
]

function focusRelativeItem(event, selector, direction) {
  const menu = event.currentTarget.closest('[role="menu"]')
  const items = [...(menu?.querySelectorAll(selector) ?? [])]
  const currentIndex = items.indexOf(event.currentTarget)
  if (currentIndex < 0 || items.length === 0) return

  const nextIndex = (currentIndex + direction + items.length) % items.length
  items[nextIndex].focus()
}

export function ThemeMenu({ className = '', onThemeSelected }) {
  const themeContext = useContext(ThemeContext)
  const [standaloneTheme, setStandaloneTheme] = useState(getStoredTheme)
  const theme = themeContext?.theme ?? standaloneTheme
  const setTheme = themeContext?.setTheme ?? ((nextTheme) => {
    setStandaloneTheme(nextTheme)
    setStoredTheme(nextTheme)
    const systemPrefersDark = getSystemTheme() === THEME_PREFERENCES.DARK
    const resolvedTheme = resolveTheme(nextTheme, systemPrefersDark)
    document.documentElement.dataset.theme = resolvedTheme
    document.documentElement.style.colorScheme = resolvedTheme
    return true
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef(new Map())
  const focusMenuOnOpenRef = useRef(false)
  const id = useId().replaceAll(':', '')
  const menuId = `theme-menu-${id}`

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen && focusMenuOnOpenRef.current) {
      focusMenuOnOpenRef.current = false
      const activeOption = optionRefs.current.get(theme)
      ;(activeOption ?? optionRefs.current.get(THEME_PREFERENCES.SYSTEM))?.focus()
    }
  }, [isMenuOpen, theme])

  const openMenu = () => {
    focusMenuOnOpenRef.current = true
    setIsMenuOpen(true)
  }

  const closeMenu = ({ returnFocus = true } = {}) => {
    setIsMenuOpen(false)
    if (returnFocus) triggerRef.current?.focus()
  }

  const selectTheme = (nextTheme) => {
    setTheme(nextTheme)
    closeMenu()
    onThemeSelected?.(nextTheme)
  }

  const handleContainerKeyDown = (event) => {
    if (event.key !== 'Escape') return

    event.preventDefault()
    event.stopPropagation()
    closeMenu()
  }

  return (
    <div
      className={`theme-menu ${className}`.trim()}
      onKeyDown={handleContainerKeyDown}
      ref={rootRef}
    >
      <button
        aria-controls={menuId}
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        aria-label="Theme options"
        className="theme-menu-trigger"
        onClick={() => (isMenuOpen ? closeMenu({ returnFocus: false }) : openMenu())}
        ref={triggerRef}
        type="button"
      >
        <DotsThreeVertical aria-hidden="true" size={20} weight="regular" />
      </button>

      {isMenuOpen ? (
        <div aria-label="Theme menu" className="theme-menu-popover" id={menuId} role="menu">
          {themeOptions.map(({ icon: Icon, label, value }) => {
            const isActive = theme === value

            return (
              <button
                aria-checked={isActive}
                className="theme-menu-item theme-option"
                key={value}
                onClick={() => selectTheme(value)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    focusRelativeItem(event, '[role="menuitemradio"]', 1)
                  }
                  if (event.key === 'ArrowUp') {
                    event.preventDefault()
                    focusRelativeItem(event, '[role="menuitemradio"]', -1)
                  }
                }}
                ref={(node) => {
                  if (node) optionRefs.current.set(value, node)
                  else optionRefs.current.delete(value)
                }}
                role="menuitemradio"
                type="button"
              >
                <Icon aria-hidden="true" size={18} weight="regular" />
                <span>{label}</span>
                <Check
                  aria-hidden="true"
                  className="theme-option-check"
                  size={17}
                  weight="bold"
                />
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
