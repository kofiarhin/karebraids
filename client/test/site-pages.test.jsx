import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../src/App.jsx'

function renderRoute(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  )
}

describe('KareBraids pages', () => {
  it('renders the home page with primary booking navigation', () => {
    renderRoute('/')

    expect(screen.getByRole('heading', { name: /karebraids/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /book now/i })).toHaveLength(2)
  })

  it('renders the about page', () => {
    renderRoute('/about')

    expect(screen.getByRole('heading', { name: /meet karen/i })).toBeInTheDocument()
  })

  it('renders the gallery page', () => {
    const { container } = renderRoute('/gallery')

    expect(screen.getByRole('heading', { name: /braid gallery/i })).toBeInTheDocument()
    expect(container.querySelectorAll('.gallery-card')).toHaveLength(9)
    expect(screen.getByRole('region', { name: /gallery image wall/i })).toHaveClass(
      'gallery-grid',
    )
  })
})
