import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from '../theme/ThemeProvider.jsx'
import { THEME_STORAGE_KEY } from '../theme/theme.js'
import { Header } from './Header.jsx'
import { ThemeMenu } from './ThemeMenu.jsx'

function installMatchMedia(matches = false) {
  const listeners = new Set()
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    matches,
    media: '(prefers-color-scheme: dark)',
    addEventListener: (event, listener) => event === 'change' && listeners.add(listener),
    removeEventListener: (event, listener) => event === 'change' && listeners.delete(listener),
  })))
}

function renderThemeMenu(props = {}) {
  return render(
    <ThemeProvider>
      <ThemeMenu {...props} />
      <button type="button">Outside</button>
    </ThemeProvider>,
  )
}

async function openThemeMenu(user) {
  const trigger = screen.getByRole('button', { name: 'Theme options' })
  await user.click(trigger)
  return { trigger }
}


describe('ThemeMenu', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
    installMatchMedia(false)
  })

  it('uses a compact overflow glyph without a visible label', () => {
    renderThemeMenu()

    const trigger = screen.getByRole('button', { name: 'Theme options' })
    const icon = trigger.querySelector('svg')

    expect(icon).toHaveAttribute('width', '20')
    expect(icon).toHaveAttribute('height', '20')
    expect(trigger).not.toHaveTextContent(/theme/i)
  })

  it('opens the menu and identifies the active system selection', async () => {
    const user = userEvent.setup()
    renderThemeMenu()

    const { trigger } = await openThemeMenu(user)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('menu', { name: 'Theme menu' })).toBeVisible()
    expect(screen.getByRole('menuitemradio', { name: 'System' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('menuitemradio', { name: 'Light' })).toHaveAttribute('aria-checked', 'false')
  })

  it('applies and persists a selection, closes all menus, and signals completion', async () => {
    const user = userEvent.setup()
    const onThemeSelected = vi.fn()
    renderThemeMenu({ onThemeSelected })

    const { trigger } = await openThemeMenu(user)
    await user.click(screen.getByRole('menuitemradio', { name: 'Dark' }))

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(screen.queryByRole('menu', { name: 'Theme menu' })).not.toBeInTheDocument()
    expect(onThemeSelected).toHaveBeenCalledWith('dark')
    expect(trigger).toHaveFocus()
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    renderThemeMenu()

    const { trigger } = await openThemeMenu(user)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu', { name: 'Theme menu' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('closes when focus and interaction move outside the menu', async () => {
    const user = userEvent.setup()
    renderThemeMenu()

    await openThemeMenu(user)
    await user.click(screen.getByRole('button', { name: 'Outside' }))

    expect(screen.queryByRole('menu', { name: 'Theme menu' })).not.toBeInTheDocument()
  })

  it('supports keyboard opening and arrow navigation', async () => {
    const user = userEvent.setup()
    renderThemeMenu()

    const trigger = screen.getByRole('button', { name: 'Theme options' })
    trigger.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('menuitemradio', { name: 'System' })).toHaveFocus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitemradio', { name: 'Light' })).toHaveFocus()
  })
})


describe('Header theme integration', () => {
  beforeEach(() => {
    localStorage.clear()
    installMatchMedia(false)
  })

  it('places the desktop menu after the booking CTA', () => {
    const { container } = render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>,
    )

    const actions = container.querySelector('.header-actions')
    expect(actions.children[0]).toHaveClass('header-cta')
    expect(actions.children[1]).toHaveClass('theme-menu')
  })

  it('closes the mobile navigation drawer after theme selection', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>,
    )

    const mobileNavTrigger = screen.getByRole('button', { name: 'Open mobile navigation' })
    await user.click(mobileNavTrigger)
    expect(screen.getByRole('complementary')).toBeInTheDocument()

    const themeTriggers = screen.getAllByRole('button', { name: 'Theme options' })
    await user.click(themeTriggers.at(-1))
    await user.click(screen.getByRole('menuitemradio', { name: 'Light' }))

    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    expect(document.body).not.toHaveClass('mobile-nav-open')
    expect(mobileNavTrigger).toHaveFocus()
  })
})
