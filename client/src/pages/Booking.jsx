import { CheckCircle, CircleNotch, WarningCircle } from '@phosphor-icons/react'
import { useMemo, useState } from 'react'
import { Button } from '../components/Button.jsx'
import { services } from '../constants/content.js'
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

export function Booking() {
  const [form, setForm] = useState(initialForm)
  const [step, setStep] = useState('service')
  const [formError, setFormError] = useState('')
  const [confirmedBooking, setConfirmedBooking] = useState(null)
  const availability = useAvailability(form.service, form.date, step === 'time')
  const createBooking = useCreateBooking()
  const currentStepIndex = steps.indexOf(step)

  const selectedService = useMemo(
    () => services.find((service) => service.title === form.service),
    [form.service],
  )

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setFormError('')
  }

  const selectService = (service) => {
    setForm((current) => ({ ...current, service: service.title, time: '' }))
    setFormError('')
    setStep('date')
  }

  const continueToTimes = () => {
    const parsedDate = parseDate(form.date)

    if (!parsedDate) {
      setFormError('Choose a valid appointment date.')
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

  return (
    <section className="booking-page">
      <div className="page-hero-copy narrow">
        <p className="eyebrow">Booking</p>
        <h1>Book your braid appointment</h1>
        <p>
          Choose your service, preferred date, time, and location. KareBraids will confirm the final
          details after your request is received.
        </p>
      </div>

      <div className="booking-workspace">
        <aside className="booking-summary" aria-label="Booking progress">
          {steps.slice(0, 4).map((item, index) => (
            <span className={index <= currentStepIndex ? 'step-pill active' : 'step-pill'} key={item}>
              {index + 1}. {item}
            </span>
          ))}
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
              <div>
                <p className="eyebrow">Step 1</p>
                <h2>Select service</h2>
              </div>
              <div className="booking-service-grid">
                {services.map((service) => (
                  <button
                    className="booking-service"
                    key={service.title}
                    onClick={() => selectService(service)}
                    type="button"
                  >
                    <strong>{service.title}</strong>
                    <span>{service.description}</span>
                    <small>{service.duration}</small>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 'date' ? (
            <div className="booking-step">
              <div>
                <p className="eyebrow">Step 2</p>
                <h2>Select date</h2>
                <p className="step-context">{selectedService?.title}</p>
              </div>
              <label className="field-group">
                <span>Appointment date</span>
                <input
                  min={todayString()}
                  onChange={(event) => updateField('date', event.target.value)}
                  type="date"
                  value={form.date}
                />
                <small>Available Monday to Saturday.</small>
              </label>
              <button className="btn btn-primary" onClick={continueToTimes} type="button">
                <span>Continue to Times</span>
              </button>
            </div>
          ) : null}

          {step === 'time' ? (
            <div className="booking-step">
              <div>
                <p className="eyebrow">Step 3</p>
                <h2>Select time</h2>
                <p className="step-context">
                  {form.service} on {form.date}
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
              <div>
                <p className="eyebrow">Step 4</p>
                <h2>Customer details</h2>
                <p className="step-context">
                  {form.service}, {form.date} at {form.time}
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
                for {form.date} at {form.time} has been received.
              </p>
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
