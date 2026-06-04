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
  it('centers Karen and the Birmingham founder story', () => {
    renderAbout()

    expect(screen.getByRole('heading', { level: 1, name: /meet karen, the hands and heart behind karebraids/i })).toBeInTheDocument()
    expect(screen.getByText(/birmingham-based braiding service/i)).toBeInTheDocument()
    expect(screen.getByText(/Founder-led braiding care/i)).toBeInTheDocument()
  })

  it('renders trust-building sections before the final booking CTA', () => {
    renderAbout()

    expect(screen.getByRole('heading', { name: /care you can feel/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /premium braiding with a calm, personal service experience/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /a thoughtful process/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /know what happens next/i })).toBeInTheDocument()
    expect(screen.getByText(/Protective-style focused/i)).toBeInTheDocument()
  })

  it('keeps booking and gallery actions wired as links', () => {
    renderAbout()

    expect(screen.getAllByRole('link', { name: /book an appointment/i })[0]).toHaveAttribute('href', '/booking')
    expect(screen.getByRole('link', { name: /view styles/i })).toHaveAttribute('href', '/gallery')
  })
})
