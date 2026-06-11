import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const clientRoot = resolve(import.meta.dirname, '../..')
const indexHtml = readFileSync(resolve(clientRoot, 'index.html'), 'utf8')
const indexCss = readFileSync(resolve(clientRoot, 'src/index.css'), 'utf8').replace(/\r\n/g, '\n')
const layoutSource = readFileSync(resolve(clientRoot, 'src/components/Layout.jsx'), 'utf8')

describe('theme bootstrap', () => {
  it('sets a validated resolved theme before the React module loads', () => {
    const bootstrapPosition = indexHtml.indexOf("karebraids-theme")
    const appPosition = indexHtml.indexOf('type="module"')

    expect(bootstrapPosition).toBeGreaterThan(-1)
    expect(bootstrapPosition).toBeLessThan(appPosition)
    expect(indexHtml).toContain("document.documentElement.dataset.theme")
    expect(indexHtml).toContain("prefers-color-scheme: dark")
    expect(indexHtml).toMatch(/system.*light.*dark/s)
  })
})

describe('semantic theme styling', () => {
  it('defines a complete light semantic palette and theme-neutral shell', () => {
    expect(indexCss).toContain(':root[data-theme="light"]')

    for (const token of [
      '--color-page-background',
      '--color-panel-background',
      '--color-card-background',
      '--color-text-primary',
      '--color-text-secondary',
      '--color-text-muted',
      '--color-border-subtle',
      '--color-border-strong',
      '--color-overlay-dark',
      '--shadow-luxury',
      '--shadow-luxury-strong',
    ]) {
      expect(indexCss).toMatch(new RegExp(`:root\\[data-theme="light"\\][\\s\\S]*${token}:`))
    }

    expect(layoutSource).toContain('theme-brand-shell')
    expect(layoutSource).not.toContain('dark-brand-shell')
    expect(indexCss).toContain('.theme-brand-shell')
  })


  it('defines explicit light and dark header roles and consumes them across navigation surfaces', () => {
    const darkThemeRule = indexCss.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
    const lightThemeRule = indexCss.match(/:root\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''

    for (const token of [
      '--color-header-background',
      '--color-header-surface',
      '--color-header-text',
      '--color-header-link',
      '--color-header-link-hover',
      '--color-header-border',
      '--color-header-shadow',
      '--color-header-overlay',
      '--color-header-cta-text',
      '--color-header-focus-ring',
    ]) {
      expect(darkThemeRule).toContain(`${token}:`)
      expect(lightThemeRule).toContain(`${token}:`)
    }

    const mobilePrimaryRule = indexCss.match(/\.mobile-nav-link\.primary\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
    expect(mobilePrimaryRule).toContain('background: var(--color-header-cta-background);')
    expect(mobilePrimaryRule).toContain('color: var(--color-header-cta-text);')

    for (const expectedStyle of [
      /\.site-header\s*\{[\s\S]*background:\s*var\(--color-header-background\);/,
      /\.brand-mark\s*\{[\s\S]*color:\s*var\(--color-header-text\);/,
      /\.nav-link\s*\{[\s\S]*color:\s*var\(--color-header-link\);/,
      /\.mobile-menu-toggle\s*\{[\s\S]*color:\s*var\(--color-header-link\);/,
      /\.mobile-nav-backdrop\s*\{[\s\S]*background:\s*var\(--color-header-overlay\);/,
      /\.mobile-nav-drawer\s*\{[\s\S]*background:\s*var\(--color-header-surface\);/,
      /\.mobile-nav-header\s*\{[\s\S]*color:\s*var\(--color-header-text\);/,
      /\.mobile-nav-link\s*\{[\s\S]*color:\s*var\(--color-header-link\);/,
      /\.theme-menu-popover,[\s\S]*?\.theme-submenu\s*\{[\s\S]*background:\s*var\(--color-header-surface\);/,
      /\.header-cta\s*\{[\s\S]*color:\s*var\(--color-header-cta-text\);/,
      /\.theme-menu-trigger:focus-visible,[\s\S]*outline:\s*3px solid var\(--color-header-focus-ring\);/,
      /\.mobile-nav-link\.primary\s*\{[\s\S]*background:\s*var\(--color-header-cta-background\);[\s\S]*color:\s*var\(--color-header-cta-text\);/,
    ]) {
      expect(indexCss).toMatch(expectedStyle)
    }
  })

  it('keeps the overflow trigger visually secondary to the booking CTA', () => {
    const triggerRule = indexCss.match(/\.theme-menu-trigger\s*\{([\s\S]*?)\n\}/)?.[1] ?? ''
    const hoverRule = indexCss.match(
      /\.theme-menu-trigger:hover,\s*\n\.theme-menu-trigger\[aria-expanded="true"\]\s*\{([\s\S]*?)\n\}/,
    )?.[1] ?? ''

    expect(triggerRule).toContain('width: 2.25rem;')
    expect(triggerRule).toContain('height: 2.25rem;')
    expect(triggerRule).toContain('border: 1px solid var(--color-header-border);')
    expect(triggerRule).toContain('background: transparent;')
    expect(triggerRule).toContain('color: var(--color-header-link);')
    expect(triggerRule).not.toContain('var(--color-panel-background-soft)')
    expect(hoverRule).toContain('background: var(--color-header-hover-surface);')
    expect(hoverRule).toContain('color: var(--color-header-link-hover);')
    expect(indexCss).toMatch(/\.desktop-theme-menu\s*\{[^}]*margin-left:\s*0\.7rem;/)
  })
})
