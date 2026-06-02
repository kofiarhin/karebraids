import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Quotes, Star } from '@phosphor-icons/react'
import { homepageTestimonials } from '../../constants/homepage.js'

const formatSlideNumber = (index) => String(index + 1).padStart(2, '0')
export function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStart = useRef(null)
  const totalTestimonials = homepageTestimonials.length
  const activeTestimonial = homepageTestimonials[activeIndex]
  const showPreviousTestimonial = useCallback(() => setActiveIndex((current) => (current - 1 + totalTestimonials) % totalTestimonials), [totalTestimonials])
  const showNextTestimonial = useCallback(() => setActiveIndex((current) => (current + 1) % totalTestimonials), [totalTestimonials])

  useEffect(() => {
    if (isPaused) return undefined
    const timer = window.setInterval(showNextTestimonial, 6000)
    return () => window.clearInterval(timer)
  }, [isPaused, showNextTestimonial])

  const finishSwipe = (event) => {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(distance) > 45) distance > 0 ? showPreviousTestimonial() : showNextTestimonial()
    touchStart.current = null
  }

  return <section className="client-love-section" aria-labelledby="client-love-title"><div className="client-love-copy" data-reveal><p className="eyebrow">Client Testimonials</p><h2 id="client-love-title">Trusted for care, clarity, and beautiful results.</h2><p className="client-love-lede">Real experiences from clients who value reliable appointments and premium protective styling.</p></div><article className="testimonial-card" data-reveal onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false) }} onFocus={() => setIsPaused(true)} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onTouchEnd={finishSwipe} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} style={{ '--index': 1 }}><Quotes aria-hidden="true" className="quote-mark" size={42} weight="fill" /><div className="testimonial-content" key={activeTestimonial.name}>{activeTestimonial.avatar ? <img alt={`${activeTestimonial.name} testimonial portrait`} src={activeTestimonial.avatar} /> : <span className="testimonial-avatar-fallback" aria-hidden="true">{activeTestimonial.initials}</span>}<blockquote><p>{activeTestimonial.review}</p><cite>{activeTestimonial.name}</cite></blockquote><div className="star-row" aria-label={`${activeTestimonial.rating} star testimonial`}>{Array.from({ length: activeTestimonial.rating }).map((_, index) => <Star aria-hidden="true" key={index} size={17} weight="fill" />)}</div></div><div className="testimonial-indicators" aria-label="Choose a testimonial">{homepageTestimonials.map((testimonial, index) => <button aria-current={index === activeIndex ? 'true' : undefined} aria-label={`Show testimonial from ${testimonial.name}`} className={`testimonial-indicator${index === activeIndex ? ' is-active' : ''}`} key={testimonial.name} onClick={() => setActiveIndex(index)} type="button">{testimonial.avatar ? <img alt="" aria-hidden="true" src={testimonial.avatar} /> : <span aria-hidden="true">{testimonial.initials}</span>}</button>)}</div><div className="testimonial-footer"><span className="testimonial-counter" aria-live="polite">{formatSlideNumber(activeIndex)} / {String(totalTestimonials).padStart(2, '0')}</span><div className="testimonial-arrows" aria-label="Testimonial carousel controls"><button aria-label="Previous testimonial" onClick={showPreviousTestimonial} type="button"><ArrowLeft aria-hidden="true" size={18} weight="bold" /></button><button aria-label="Next testimonial" onClick={showNextTestimonial} type="button"><ArrowRight aria-hidden="true" size={18} weight="bold" /></button></div></div></article></section>
}
