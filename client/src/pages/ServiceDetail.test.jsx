import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { ServiceDetail } from './ServiceDetail.jsx'

vi.mock('../hooks/queries/useServices.js', () => ({
  useService: () => ({
    data: {
      id: 'knotless-braids',
      slug: 'knotless-braids',
      name: 'Knotless Braids',
      description: 'Lightweight braids.',
      shortDescription: 'Lightweight braids.',
      currency: 'GBP',
      startingPrice: 85,
      durationLabel: '4-6 hours',
      primaryImage: { alt: 'Exact knotless braids example', image: 'https://example.invalid/old.jpg' },
      galleryImages: [{ id: 'old', alt: 'Knotless example', src: 'https://example.invalid/gallery.jpg' }],
      reviews: [],
    },
    isLoading: false,
    isError: false,
  }),
}))

describe('ServiceDetail representative images', () => {
  it('uses representative inspiration instead of service-owned gallery claims', () => {
    render(
      <MemoryRouter initialEntries={['/services/knotless-braids']}>
        <Routes><Route path="/services/:slug" element={<ServiceDetail />} /></Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: 'Style inspiration' })).toBeInTheDocument()
    expect(screen.getAllByAltText('Knotless Braids representative protective styling inspiration').length).toBeGreaterThan(0)
    expect(screen.getAllByAltText('Knotless Braids styling inspiration — representative image').length).toBeGreaterThan(1)
    expect(screen.queryByAltText('Exact knotless braids example')).not.toBeInTheDocument()
    expect(screen.queryByAltText('Knotless example')).not.toBeInTheDocument()
  })
})
