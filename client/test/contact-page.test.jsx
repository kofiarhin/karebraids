import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { readFileSync } from 'node:fs'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../src/App.jsx'
import * as contactService from '../src/services/contactService.js'

vi.mock('../src/services/contactService.js', () => ({
  createContactMessage: vi.fn(),
}))

const contactPageSource = () => readFileSync('src/pages/Contact.jsx', 'utf8')

function renderContact() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

async function completeContactForm(user) {
  await user.type(screen.getByLabelText(/full name/i), 'Amara Okafor')
  await user.type(screen.getByLabelText(/^email/i), 'amara@example.com')
  await user.type(screen.getByLabelText(/^phone/i), '+44 7000 000 000')
  await user.type(screen.getByLabelText(/^message/i), 'I would like help choosing a style.')
}

describe('contact page', () => {
  beforeEach(() => {
    contactService.createContactMessage.mockResolvedValue({
      success: true,
      message: 'Your message has been received.',
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders the branded contact route, route-safe header link, and page-local details', () => {
    const { container } = renderContact()

    expect(container.querySelector('.contact-page')).toHaveClass('dark-contact-page')
    expect(screen.getByRole('heading', { name: /let's talk about your next style/i })).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: /main navigation/i }).querySelector('a[href="/contact"]')).toHaveTextContent(/contact/i)
    const infoCard = container.querySelector('.contact-info-card')
    expect(within(infoCard).getByText('Birmingham, West Midlands')).toBeInTheDocument()
    expect(within(infoCard).getByText('Mon - Sat: 8AM - 7PM')).toBeInTheDocument()
    expect(within(infoCard).getByText('hello@karebraids.com')).toBeInTheDocument()
    expect(within(infoCard).getByText('+44 7000 000 000')).toBeInTheDocument()
    expect(within(infoCard).getByText('Premium African Hair Braiding Services')).toBeInTheDocument()
    expect(within(infoCard).getByText(/respond to enquiries within 24 hours/i)).toBeInTheDocument()
  })

  it('validates required fields before submitting', async () => {
    const user = userEvent.setup()
    renderContact()

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByRole('alert')).toHaveTextContent(/complete all required fields/i)
    expect(contactService.createContactMessage).not.toHaveBeenCalled()
  })

  it('submits through the service and replaces the form with the required success card', async () => {
    const user = userEvent.setup()
    renderContact()
    await completeContactForm(user)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(contactService.createContactMessage).toHaveBeenCalledWith({
        fullName: 'Amara Okafor',
        email: 'amara@example.com',
        phone: '+44 7000 000 000',
        message: 'I would like help choosing a style.',
      }, expect.anything())
    })
    expect(await screen.findByRole('heading', { name: 'Message Sent' })).toBeInTheDocument()
    expect(screen.getByText("Thank you for contacting KareBraids. We've received your message and will get back to you as soon as possible.")).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /send message/i })).not.toBeInTheDocument()
  })

  it('shows a loading state while the message is being sent', async () => {
    const user = userEvent.setup()
    contactService.createContactMessage.mockReturnValue(new Promise(() => {}))
    renderContact()
    await completeContactForm(user)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByRole('button', { name: /sending message/i })).toBeDisabled()
  })

  it('shows a useful API error when submission fails', async () => {
    const user = userEvent.setup()
    contactService.createContactMessage.mockRejectedValue(new Error('Please try again shortly.'))
    renderContact()
    await completeContactForm(user)

    await user.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/please try again shortly/i)
  })

  it('routes the mobile Contact navigation item to the dedicated page', async () => {
    const user = userEvent.setup()
    renderContact()

    await user.click(screen.getByRole('button', { name: /open mobile navigation/i }))

    expect(screen.getByRole('navigation', { name: /mobile navigation/i }).querySelector('a[href="/contact"]')).toHaveTextContent(/contact/i)
  })

  it('uses responsive Tailwind utilities and existing dark-luxury tokens for the Contact layout', () => {
    const source = contactPageSource()

    expect(source).toContain('lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.72fr)]')
    expect(source).toContain('bg-[var(--theme-espresso-deep-a044)]')
    expect(source).toContain('border-[var(--theme-cream-muted-a014)]')
    expect(source).toContain('lg:sticky lg:top-28')
  })
})
