import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { About } from './About.jsx'

function renderAbout() {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  )
}

describe('About', () => {
  it('renders the premium About hero with clear founder-led positioning', () => {
    renderAbout()

    expect(screen.getByRole('heading', { level: 1, name: /about karebraids/i })).toBeInTheDocument()
    expect(screen.getByText(/founded by karen/i)).toBeInTheDocument()
    expect(screen.getByText(/premium braiding services in birmingham/i)).toBeInTheDocument()
    expect(screen.getByText(/creating beautiful protective styles with care/i)).toBeInTheDocument()
  })

  it('renders the required service-led About page sections', () => {
    renderAbout()

    expect(screen.getByRole('heading', { name: /meet karen/i })).toBeInTheDocument()
    expect(screen.getByText(/founder of karebraids/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /why clients choose karebraids/i })).toBeInTheDocument()
    expect(screen.getByText(/more than a hairstyle/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /braiding specialties/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /what clients say/i })).toBeInTheDocument()
    expect(screen.getByText(/200\+/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /ready for your next style/i })).toBeInTheDocument()
  })

  it('keeps booking and gallery actions wired as internal links', () => {
    renderAbout()

    expect(screen.getAllByRole('link', { name: /book appointment/i })[0]).toHaveAttribute('href', '/booking')
    expect(screen.getAllByRole('link', { name: /view gallery/i })[0]).toHaveAttribute('href', '/gallery')
  })
})
