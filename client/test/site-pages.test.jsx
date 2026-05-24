import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
    const { container } = renderRoute('/gallery')

    expect(screen.getByRole('heading', { name: /braid gallery/i })).toBeInTheDocument()
    expect(container.querySelectorAll('.gallery-card')).toHaveLength(9)
    expect(screen.getByRole('region', { name: /gallery image wall/i })).toHaveClass(
      'gallery-grid',
    )
  })

  it('opens and closes the mobile navigation drawer', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    const menuButton = screen.getByRole('button', { name: /open mobile navigation/i })

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()

    await user.click(menuButton)

    const mobileNav = screen.getByRole('navigation', { name: /mobile navigation/i })
    expect(screen.getByRole('button', { name: /close mobile navigation/i })).toHaveFocus()
    expect(mobileNav).toBeInTheDocument()
    expect(mobileNav).toHaveTextContent(/home/i)
    expect(mobileNav).toHaveTextContent(/about/i)
    expect(mobileNav).toHaveTextContent(/gallery/i)
    expect(mobileNav).toHaveTextContent(/booking/i)
    expect(within(mobileNav).getByRole('link', { name: /^booking$/i })).toHaveClass('primary')
    expect(document.body).toHaveClass('mobile-nav-open')

    await user.click(screen.getByRole('button', { name: /close mobile navigation/i }))

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(document.body).not.toHaveClass('mobile-nav-open')
  })

  it('closes the mobile navigation drawer from escape, backdrop, and link selection', async () => {
    const user = userEvent.setup()
    renderRoute('/')

    const menuButton = screen.getByRole('button', { name: /open mobile navigation/i })

    await user.click(menuButton)
    await user.keyboard('{Escape}')

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(document.body).not.toHaveClass('mobile-nav-open')
    expect(menuButton).toHaveFocus()

    await user.click(menuButton)
    await user.click(screen.getByRole('button', { name: /dismiss mobile navigation/i }))

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(document.body).not.toHaveClass('mobile-nav-open')

    await user.click(menuButton)
    await user.click(
      within(screen.getByRole('navigation', { name: /mobile navigation/i })).getByRole('link', {
        name: /^gallery$/i,
      }),
    )

    expect(screen.queryByRole('navigation', { name: /mobile navigation/i })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /braid gallery/i })).toBeInTheDocument()
  })
})
