import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const clientRoot = resolve(import.meta.dirname, '../..')
const indexHtml = readFileSync(resolve(clientRoot, 'index.html'), 'utf8')
const indexCss = readFileSync(resolve(clientRoot, 'src/index.css'), 'utf8')
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
})
