import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from '../src/App.jsx'

function renderRoute(route) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('service detail architecture', () => {
  it('renders a canonical service detail page with reusable sections and preselected booking CTA', () => {
    renderRoute('/services/knotless-braids')

    expect(screen.getByRole('heading', { level: 1, name: /knotless braids/i })).toBeInTheDocument()
    expect(screen.getByText(/hair included/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /care tips/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /client reviews/i })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /book this style/i })).toHaveLength(2)
    screen.getAllByRole('link', { name: /book this style/i }).forEach((link) => expect(link).toHaveAttribute('href', '/booking?style=knotless-braids'))
  })

  it('redirects a valid legacy style path to the canonical service detail page', () => {
    renderRoute('/styles/boho-braids')

    expect(screen.getByRole('heading', { level: 1, name: /boho braids/i })).toBeInTheDocument()
  })

  it('redirects an unknown service detail slug to the services listing', () => {
    renderRoute('/services/not-a-style')

    expect(screen.getByRole('heading', { level: 1, name: /signature braid services/i })).toBeInTheDocument()
  })

  it('preselects a valid booking style query and preserves the booking wizard', () => {
    renderRoute('/booking?style=stitch-braids')

    expect(screen.getByText('Stitch Braids', { selector: 'dd' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /select date/i })).toBeInTheDocument()
  })
})
