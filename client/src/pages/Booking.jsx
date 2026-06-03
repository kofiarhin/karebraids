import {
  CalendarBlank,
  CaretLeft,
  CaretRight,
  CheckCircle,
  CircleNotch,
  Clock,
  MapPin,
  WarningCircle,
} from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../components/Button.jsx'
import { getBookableServices } from '../data/services.js'
import { useCreateBooking } from '../hooks/mutations/useCreateBooking.js'
import { useAvailability } from '../hooks/queries/useAvailability.js'
import { getApiErrorMessage } from '../lib/api.js'

const initialForm = {
  service: '',
  date: '',
  time: '',
  fullName: '',
  email: '',
  phone: '',
  preferredLocation: '',
  notes: '',
}

const steps = ['service', 'date', 'time', 'details', 'confirmation']
const workflowSteps = [
  { id: 'service', label: 'Service', detail: 'Choose the style' },
  { id: 'date', label: 'Date', detail: 'Pick from the calendar' },
  { id: 'time', label: 'Time', detail: 'Match an open slot' },
  { id: 'details', label: 'Details', detail: 'Share contact info' },
]
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
const dayLabelFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

function parseDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null
  const parsed = new Date(`${date}T00:00:00.000Z`)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

function isSunday(date) {
  return date.getUTCDay() === 0
}

function todayString() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function formatDateValue(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function dateValueToLocalDate(dateValue) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) return null
  const [year, month, day] = dateValue.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return Number.isNaN(date.getTime()) ? null : date
}

function getInitialMonth() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1)
}

function buildCalendarDays(monthDate) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startOffset = (firstDay.getDay() + 6) % 7
  const startDate = new Date(year, month, 1 - startOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + index)
    return {
      date,
      day: date.getDate(),
      inCurrentMonth: date.getMonth() === month,
      value: formatDateValue(date),
    }
  })
}

function formatReadableDate(dateValue) {
  const parsed = dateValueToLocalDate(dateValue)
  return parsed ? dayLabelFormatter.format(parsed) : 'Not selected'
}

export function Booking() {
  const [searchParams] = useSearchParams()
  const requestedStyle = searchParams.get('style')
  const bookableServices = useMemo(() => getBookableServices(), [])
  const preselectedService = bookableServices.find((service) => service.id === requestedStyle || service.slug === requestedStyle)
  const [form, setForm] = useState(() => ({ ...initialForm, service: preselectedService?.name || '' }))
  const [step, setStep] = useState(preselectedService ? 'date' : 'service')
  const [visibleMonth, setVisibleMonth] = useState(getInitialMonth)
  const [formError, setFormError] = useState('')
  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const availability = useAvailability(form.service, form.date, step === 'time')
  const createBooking = useCreateBooking()
  const currentStepIndex = steps.indexOf(step)
  const today = todayString()

  const selectedService = useMemo(
    () => bookableServices.find((service) => service.name === form.service),
    [bookableServices, form.service],
  )

  const calendarDays = useMemo(() => buildCalendarDays(visibleMonth), [visibleMonth])
  const canShowPreviousMonth = formatDateValue(visibleMonth) > `${today.slice(0, 8)}01`

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setFormError('')
  }

  const selectService = (service) => {
    setForm((current) => ({ ...current, service: service.name, date: '', time: '' }))
    setFormError('')
    setStep('date')
  }

  const continueToTimes = () => {
    const parsedDate = parseDate(form.date)

    if (!parsedDate) {
      setFormError('Choose a valid appointment date.')
      return
    }

    if (form.date < today) {
      setFormError('Choose a future appointment date.')
      return
    }

    if (isSunday(parsedDate)) {
      setFormError('Bookings are available Monday to Saturday.')
      return
    }

    setFormError('')
    setStep('time')
  }

  const selectTime = (time) => {
    updateField('time', time)
    setStep('details')
  }

  const selectDate = (day) => {
    const parsedDate = parseDate(day.value)

    if (!parsedDate || !day.inCurrentMonth || day.value < today || isSunday(parsedDate)) return

    setForm((current) => ({ ...current, date: day.value, time: '' }))
    setFormError('')
  }

  const moveMonth = (amount) => {
    setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1))
    setFormError('')
  }

  const validateDetails = () => {
    if (!form.fullName.trim()) return 'Full name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Valid email is required.'
    if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone)) return 'Valid phone number is required.'
    if (!form.preferredLocation.trim()) return 'Preferred location is required.'
    return ''
  }

  const submitBooking = async (event) => {
    event.preventDefault()
    const validationError = validateDetails()

    if (validationError) {
      setFormError(validationError)
      return
    }

    setFormError('')

    try {
      const response = await createBooking.mutateAsync(form)
      setConfirmedBooking(response.booking)
      setStep('confirmation')
    } catch (error) {
      setFormError(getApiErrorMessage(error))
    }
  }

  const apiError = availability.isError ? getApiErrorMessage(availability.error) : ''
  const availableSlots = availability.data?.slots || []
  const readableDate = formatReadableDate(form.date)

  return (
    <section className="booking-page dark-booking-page">
      <div className="booking-hero">
        <div className="page-hero-copy narrow">
          <p className="eyebrow">Booking concierge</p>
          <h1>Book your braid appointment</h1>
          <p>
            Choose your style, select a calendar date, and request a time. KareBraids will confirm
            the final appointment details after your request is received.
          </p>
        </div>
        <div className="booking-hero-note" aria-label="Booking promise">
          <CalendarBlank aria-hidden="true" size={24} weight="duotone" />
          <span>Monday to Saturday appointments with careful, low-tension styling.</span>
        </div>
      </div>

      <div className="booking-workspace">
        <aside className="booking-summary" aria-label="Booking progress and summary">
          <div className="booking-step-list">
            {workflowSteps.map((item, index) => (
              <div
                aria-current={item.id === step ? 'step' : undefined}
                className={
                  index === currentStepIndex
                    ? 'step-pill active'
                    : index < currentStepIndex
                      ? 'step-pill completed'
                      : 'step-pill'
                }
                key={item.id}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </div>
            ))}
          </div>
          <div className="booking-live-card">
            <p className="eyebrow">Request summary</p>
            <dl>
              <div>
                <dt>Service</dt>
                <dd>{form.service || 'Select a style'}</dd>
              </div>
              <div>
                <dt>Date</dt>
                <dd>{form.date ? readableDate : 'Choose from calendar'}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{form.time || 'Pick after date'}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{form.preferredLocation || 'Shared in details'}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <div className="booking-panel">
          {formError ? (
            <p className="form-alert" role="alert">
              <WarningCircle aria-hidden="true" size={20} weight="duotone" />
              {formError}
            </p>
          ) : null}

          {step === 'service' ? (
            <div className="booking-step">
              <div className="booking-step-heading">
                <p className="eyebrow">Step 1</p>
                <h2>Select service</h2>
                <p className="step-context">Start with the braid style you want reserved.</p>
              </div>
              <div className="booking-service-grid">
                {bookableServices.map((service) => (
                  <button
                    className="booking-service"
                    key={service.id}
                    onClick={() => selectService(service)}
                    type="button"
                  >
                    <strong>{service.name}</strong>
                    <span>{service.shortDescription}</span>
                    <small>{service.durationLabel}</small>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 'date' ? (
            <div className="booking-step">
              <div className="booking-step-heading">
                <p className="eyebrow">Step 2</p>
                <h2>Select date</h2>
                <p className="step-context">
                  {selectedService?.name}. Monday to Saturday appointments.
                </p>
              </div>
              <div className="booking-calendar" aria-label="Appointment calendar">
                <div className="calendar-toolbar">
                  <button
                    aria-label="Previous appointment month"
                    className="calendar-nav-button"
                    disabled={!canShowPreviousMonth}
                    onClick={() => moveMonth(-1)}
                    type="button"
                  >
                    <CaretLeft aria-hidden="true" size={18} weight="bold" />
                  </button>
                  <strong>{monthFormatter.format(visibleMonth)}</strong>
                  <button
                    aria-label="Next appointment month"
                    className="calendar-nav-button"
                    onClick={() => moveMonth(1)}
                    type="button"
                  >
                    <CaretRight aria-hidden="true" size={18} weight="bold" />
                  </button>
                </div>
                <div className="calendar-weekdays" aria-hidden="true">
                  {weekDays.map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
                <div className="calendar-grid">
                  {calendarDays.map((day) => {
                    const parsedDate = parseDate(day.value)
                    const disabled = !day.inCurrentMonth || day.value < today || isSunday(parsedDate)
                    const selected = day.value === form.date
                    const label = disabled
                      ? `${dayLabelFormatter.format(day.date)} unavailable`
                      : `Select ${dayLabelFormatter.format(day.date)}`

                    return (
                      <button
                        aria-label={label}
                        aria-current={selected ? 'date' : undefined}
                        aria-pressed={selected}
                        className={selected ? 'calendar-day selected' : 'calendar-day'}
                        disabled={disabled}
                        key={day.value}
                        onClick={() => selectDate(day)}
                        type="button"
                      >
                        <span>{day.day}</span>
                      </button>
                    )
                  })}
                </div>
                <p className="calendar-helper">
                  {form.date
                    ? `Selected: ${readableDate}`
                    : 'Available Monday to Saturday. Past dates and Sundays are unavailable.'}
                </p>
              </div>
              <button className="btn btn-primary" onClick={continueToTimes} type="button">
                <span>Continue to Times</span>
              </button>
            </div>
          ) : null}

          {step === 'time' ? (
            <div className="booking-step">
              <div className="booking-step-heading">
                <p className="eyebrow">Step 3</p>
                <h2>Select time</h2>
                <p className="step-context">
                  {form.service} on {readableDate}
                </p>
              </div>
              {availability.isLoading ? (
                <div className="slot-skeleton" aria-label="Loading appointment times">
                  <CircleNotch aria-hidden="true" size={22} weight="bold" />
                  Checking availability
                </div>
              ) : null}
              {apiError ? (
                <p className="form-alert" role="alert">
                  <WarningCircle aria-hidden="true" size={20} weight="duotone" />
                  {apiError}
                </p>
              ) : null}
              {!availability.isLoading && !apiError ? (
                <div className="slot-grid">
                  {availableSlots.length ? (
                    availableSlots.map((time) => (
                      <button className="slot-button" key={time} onClick={() => selectTime(time)} type="button">
                        {time}
                      </button>
                    ))
                  ) : (
                    <p className="empty-state">{availability.data?.message || 'No appointments are available.'}</p>
                  )}
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 'details' ? (
            <form className="booking-step" onSubmit={submitBooking}>
              <div className="booking-step-heading">
                <p className="eyebrow">Step 4</p>
                <h2>Customer details</h2>
                <p className="step-context">
                  {form.service}, {readableDate} at {form.time}
                </p>
              </div>
              <div className="form-grid">
                <label className="field-group">
                  <span>Full Name</span>
                  <input
                    onChange={(event) => updateField('fullName', event.target.value)}
                    value={form.fullName}
                  />
                </label>
                <label className="field-group">
                  <span>Email</span>
                  <input
                    onChange={(event) => updateField('email', event.target.value)}
                    type="email"
                    value={form.email}
                  />
                </label>
                <label className="field-group">
                  <span>Phone</span>
                  <input onChange={(event) => updateField('phone', event.target.value)} value={form.phone} />
                </label>
                <label className="field-group">
                  <span>Preferred Location</span>
                  <input
                    onChange={(event) => updateField('preferredLocation', event.target.value)}
                    placeholder="Salon, postcode, or area"
                    value={form.preferredLocation}
                  />
                </label>
                <label className="field-group full">
                  <span>Notes</span>
                  <textarea
                    maxLength={500}
                    onChange={(event) => updateField('notes', event.target.value)}
                    rows="4"
                    value={form.notes}
                  />
                </label>
              </div>
              <button className="btn btn-primary" disabled={createBooking.isPending} type="submit">
                <span>{createBooking.isPending ? 'Sending Request' : 'Confirm Booking'}</span>
              </button>
            </form>
          ) : null}

          {step === 'confirmation' ? (
            <div className="booking-confirmation">
              <CheckCircle aria-hidden="true" size={46} weight="duotone" />
              <p className="eyebrow">Confirmation</p>
              <h2>Booking request received</h2>
              <p>
                Thank you, {confirmedBooking?.fullName || form.fullName}. Your {form.service} request
                for {readableDate} at {form.time} has been received.
              </p>
              <div className="confirmation-cues">
                <span>
                  <Clock aria-hidden="true" size={18} weight="duotone" />
                  We will confirm your time
                </span>
                <span>
                  <MapPin aria-hidden="true" size={18} weight="duotone" />
                  Location checked before arrival
                </span>
              </div>
              <Button to="/gallery" variant="secondary">
                View Gallery
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
