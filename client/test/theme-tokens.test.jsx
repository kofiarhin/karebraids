import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const styles = readFileSync('src/index.css', 'utf8')
const rootMatch = styles.match(/:root\s*\{([\s\S]*?)\n\}/)
const rootTokens = rootMatch?.[1] || ''
const darkRootMatch = styles.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)
const lightRootMatch = styles.match(/:root\[data-theme="light"\]\s*\{([\s\S]*?)\n\}/)
const selectorRules = styles
  .replace(rootMatch?.[0] || '', '')
  .replace(darkRootMatch?.[0] || '', '')
  .replace(lightRootMatch?.[0] || '', '')
const colorLiteralPattern = /#[\da-f]{3,8}\b|(?:rgb|hsl)a?\([^)]*\)/gi


function expectStylesToMatch(patterns) {
  for (const pattern of patterns) {
    expect(styles).toMatch(pattern)
  }
}

const requiredTokens = [
  '--color-page-background',
  '--gradient-shell',
  '--color-panel-background',
  '--color-surface-elevated',
  '--color-card-background',
  '--color-text-primary',
  '--color-text-secondary',
  '--color-text-muted',
  '--color-accent-gold',
  '--color-accent-gold-hover',
  '--color-accent-terracotta',
  '--color-border-subtle',
  '--color-border-strong',
  '--color-overlay-dark',
  '--color-focus-ring',
  '--shadow-luxury',
  '--color-state-success',
  '--color-state-warning',
  '--color-state-error',
  '--color-state-info',
]

describe('semantic color theme', () => {
  it('defines the required KareBraids semantic tokens in :root', () => {
    for (const token of requiredTokens) {
      expect(rootTokens).toContain(`${token}:`)
    }
  })

  it('keeps reusable color literals inside the centralized :root theme only', () => {
    expect(selectorRules.match(colorLiteralPattern) || []).toEqual([])
  })

  it('uses semantic tokens for the priority disconnected surfaces', () => {
    expectStylesToMatch([
      /\.mobile-nav-drawer\s*\{[\s\S]*?background:\s*var\(--color-header-surface\)/,
      /\.booking-panel\s*\{[\s\S]*?background:\s*var\(--color-panel-background\)/,
      /\.admin-table-panel[^}]*\{[\s\S]*?background:\s*var\(--color-panel-background\)/,
      /\.status-confirmed\s*\{[\s\S]*?var\(--color-state-success/,
      /\.status-cancelled\s*\{[\s\S]*?var\(--color-state-error/,
    ])
  })

  it('uses restrained semantic roles for Booking and Admin operational states', () => {
    expectStylesToMatch([
      /\.booking-page\s*\{[\s\S]*?background:\s*var\(--gradient-shell-subtle\)/,
      /\.theme-brand-shell \.booking-calendar[^}]*\{[\s\S]*?background:\s*var\(--color-panel-background-soft\)/,
      /\.admin-table th\s*\{[\s\S]*?background:\s*var\(--color-surface-elevated\)/,
      /\.admin-status-field select\s*\{[\s\S]*?background:\s*var\(--color-state-info-surface\)/,
      /\.theme-brand-shell \.form-alert\s*\{[\s\S]*?background:\s*var\(--color-state-error-surface\)/,
      /\.admin-page > \.empty-state\[role="status"\]\s*\{[\s\S]*?background:\s*var\(--color-state-success-surface\)/,
    ])
  })
})

describe('gallery spacing rhythm', () => {
  it('tightens the gallery top spacing while preserving the existing bottom rhythm', () => {
    expect(styles).toMatch(/\.gallery-page\s*\{[\s\S]*?padding:\s*clamp\(2rem, 4\.5vw, 3rem\) 0 clamp\(4rem, 8vw, 6rem\)/)
  })

  it('keeps the gallery title closer to the filters and grid with clamp-based spacing', () => {
    expect(styles).toMatch(/\.gallery-title-wrap\s*\{[\s\S]*?margin-bottom:\s*clamp\(1\.25rem, 3vw, 2rem\)/)
  })

  it('adds a compact mobile top offset without hardcoded pixels', () => {
    expect(styles).toMatch(/@media \(max-width: 560px\)\s*\{[\s\S]*?\.gallery-page\s*\{[\s\S]*?padding-top:\s*clamp\(1\.5rem, 7vw, 2\.25rem\)/)
  })
})
