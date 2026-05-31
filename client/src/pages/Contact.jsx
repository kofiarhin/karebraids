import {
  CheckCircle,
  Clock,
  EnvelopeSimple,
  MapPin,
  Phone,
  Sparkle,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { Button } from '../components/Button.jsx'
import { contactDetails } from '../constants/contact.js'
import { useCreateContactMessage } from '../hooks/mutations/useCreateContactMessage.js'
import { getApiErrorMessage } from '../lib/api.js'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const detailItems = [
  { label: 'Location', value: contactDetails.location, icon: MapPin },
  { label: 'Hours', value: contactDetails.hours, icon: Clock },
  { label: 'Email', value: contactDetails.email, icon: EnvelopeSimple },
  { label: 'Phone', value: contactDetails.phone, icon: Phone },
]

function ContactSuccess() {
  return (
    <div className="contact-success grid min-h-[28rem] content-center justify-items-start gap-5 rounded-[1.5rem] border border-[var(--theme-gold-a022)] bg-[var(--theme-espresso-deep-a044)] p-6 shadow-[0_22px_64px_var(--theme-shadow-black-a028)] sm:p-9">
      <span className="grid size-14 place-items-center rounded-full border border-[var(--theme-gold-a036)] bg-[var(--theme-gold-a012)] text-[var(--accent-300)]">
        <CheckCircle aria-hidden="true" size={30} weight="duotone" />
      </span>
      <p className="eyebrow">Enquiry received</p>
      <h2 className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">Message Sent</h2>
      <p className="max-w-[34rem] leading-7 text-[var(--text-secondary)]">
        Thank you for contacting KareBraids. We've received your message and will get back to you as soon as possible.
      </p>
    </div>
  )
}

export function Contact() {
  const [form, setForm] = useState(initialForm)
  const [formError, setFormError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const createContactMessage = useCreateContactMessage()

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const payload = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value.trim()]),
    )

    if (Object.values(payload).some((value) => !value)) {
      setFormError('Please complete all required fields before sending your message.')
      return
    }

    if (!EMAIL_PATTERN.test(payload.email)) {
      setFormError('Please enter a valid email address.')
      return
    }

    setFormError('')
    createContactMessage.mutate(payload, {
      onSuccess: () => {
        setForm(initialForm)
        setIsSubmitted(true)
      },
      onError: (error) => {
        setFormError(getApiErrorMessage(error))
      },
    })
  }

  return (
    <section className="contact-page dark-contact-page mx-auto grid w-[min(100%_-_2rem,1180px)] gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.72fr)] lg:gap-12 lg:py-20">
      <div className="grid content-start gap-7">
        <div className="page-hero-copy grid justify-items-start gap-5">
          <p className="eyebrow">Contact KareBraids</p>
          <h1>Let's talk about your next style</h1>
          <p className="max-w-[42rem] leading-7 text-[var(--text-secondary)]">
            Share your enquiry and we will help you plan a polished protective style with the care, clarity, and attention your hair deserves.
          </p>
        </div>
        {isSubmitted ? (
          <ContactSuccess />
        ) : (
          <form
            className="contact-form grid gap-5 rounded-[1.5rem] border border-[var(--theme-cream-muted-a014)] bg-[var(--theme-espresso-deep-a044)] p-5 shadow-[0_22px_64px_var(--theme-shadow-black-a028)] sm:p-8"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="field-group grid gap-2 text-sm font-bold text-[var(--text-primary)]">
                <span>Full name</span>
                <input
                  autoComplete="name"
                  className="min-h-12 rounded-xl border border-[var(--theme-cream-muted-a014)] bg-[var(--theme-espresso-deep-a044)] px-4 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--theme-gold-a044)]"
                  name="fullName"
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  type="text"
                  value={form.fullName}
                />
              </label>
              <label className="field-group grid gap-2 text-sm font-bold text-[var(--text-primary)]">
                <span>Email</span>
                <input
                  autoComplete="email"
                  className="min-h-12 rounded-xl border border-[var(--theme-cream-muted-a014)] bg-[var(--theme-espresso-deep-a044)] px-4 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--theme-gold-a044)]"
                  name="email"
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={form.email}
                />
              </label>
            </div>
            <label className="field-group grid gap-2 text-sm font-bold text-[var(--text-primary)]">
              <span>Phone</span>
              <input
                autoComplete="tel"
                className="min-h-12 rounded-xl border border-[var(--theme-cream-muted-a014)] bg-[var(--theme-espresso-deep-a044)] px-4 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--theme-gold-a044)]"
                name="phone"
                onChange={handleChange}
                placeholder="Your preferred contact number"
                required
                type="tel"
                value={form.phone}
              />
            </label>
            <label className="field-group grid gap-2 text-sm font-bold text-[var(--text-primary)]">
              <span>Message</span>
              <textarea
                className="min-h-36 resize-y rounded-xl border border-[var(--theme-cream-muted-a014)] bg-[var(--theme-espresso-deep-a044)] px-4 py-3 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--theme-gold-a044)]"
                name="message"
                onChange={handleChange}
                placeholder="Tell us how we can help"
                required
                value={form.message}
              />
            </label>
            {formError ? (
              <p className="form-alert rounded-xl border border-[var(--theme-gold-a022)] bg-[var(--theme-terracotta-a022)] px-4 py-3 text-sm text-[var(--text-primary)]" role="alert">
                {formError}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button className="disabled:cursor-wait disabled:opacity-70" disabled={createContactMessage.isPending} type="submit">
                {createContactMessage.isPending ? 'Sending Message...' : 'Send Message'}
              </Button>
              <p className="text-sm text-[var(--text-muted)]">All fields are required.</p>
            </div>
          </form>
        )}
      </div>
      <aside className="contact-info-card grid content-start gap-7 self-start rounded-[1.5rem] border border-[var(--theme-cream-muted-a014)] bg-[var(--theme-espresso-panel-a072)] p-6 shadow-[0_22px_64px_var(--theme-shadow-black-a028)] sm:p-8 lg:sticky lg:top-28">
        <div className="grid gap-3">
          <p className="eyebrow">Contact details</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">Start with a conversation</h2>
          <p className="leading-7 text-[var(--text-secondary)]">{contactDetails.businessType}</p>
        </div>
        <dl className="grid gap-5">
          {detailItems.map(({ label, value, icon: Icon }) => (
            <div className="grid grid-cols-[2.6rem_1fr] gap-3 border-t border-[var(--theme-cream-muted-a012)] pt-5" key={label}>
              <span className="grid size-10 place-items-center rounded-full border border-[var(--theme-gold-a022)] bg-[var(--theme-gold-a012)] text-[var(--accent-300)]">
                <Icon aria-hidden="true" size={19} weight="duotone" />
              </span>
              <div className="grid gap-1">
                <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</dt>
                <dd className="text-[var(--text-primary)]">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
        <p className="flex gap-3 rounded-xl border border-[var(--theme-gold-a022)] bg-[var(--theme-gold-a012)] p-4 leading-6 text-[var(--text-secondary)]">
          <Sparkle aria-hidden="true" className="mt-1 shrink-0 text-[var(--accent-300)]" size={18} weight="fill" />
          <span>{contactDetails.trustMessage}</span>
        </p>
      </aside>
    </section>
  )
}
