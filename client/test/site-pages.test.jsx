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
    expect(screen.getByRole('link', { name: /view gallery/i })).toHaveAttribute('href', '/gallery')
    expect(screen.getByRole('link', { name: /start booking/i })).toHaveAttribute('href', '/booking')
  })

  it('keeps the full homepage section story intact', () => {
    const { container } = renderRoute('/')

    expect(screen.getByText(/premium african hair braiding in london/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/karebraids trust highlights/i)).toHaveTextContent(/protective styling/i)
    expect(screen.getByText(/featured services/i)).toBeInTheDocument()
    expect(screen.getByText(/why choose karebraids/i)).toBeInTheDocument()
    expect(screen.getByText(/gallery preview/i)).toBeInTheDocument()
    expect(screen.getByText(/the parting was immaculate/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /choose your service, date/i })).toBeInTheDocument()
    expect(container.querySelectorAll('[data-reveal]').length).toBeGreaterThan(6)
    expect(container.querySelector('[data-parallax]')).toBeInTheDocument()
  })

  it('renders the about page', () => {
    renderRoute('/about')

    expect(screen.getByRole('heading', { name: /meet karen/i })).toBeInTheDocument()
  })

  it('renders the gallery page', () => {
    renderRoute('/gallery')

    expect(screen.getByRole('heading', { name: /braid gallery/i })).toBeInTheDocument()
  })
})
