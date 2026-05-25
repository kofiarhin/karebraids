import { useEffect, useRef, useState } from 'react'
import { CalendarCheck, List, ShieldCheck, Sparkle, X } from '@phosphor-icons/react'
import { NavLink, Outlet } from 'react-router-dom'
import { Button } from './Button.jsx'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Booking', to: '/booking' },
]

export function Layout() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const mobileMenuButtonRef = useRef(null)
  const mobileNavCloseButtonRef = useRef(null)
  const wasMobileNavOpenRef = useRef(false)

  useEffect(() => {
    document.body.classList.toggle('mobile-nav-open', isMobileNavOpen)

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileNavOpen(false)
      }
    }

    if (isMobileNavOpen) {
      document.addEventListener('keydown', handleKeyDown)
      mobileNavCloseButtonRef.current?.focus()
    } else if (wasMobileNavOpenRef.current) {
      mobileMenuButtonRef.current?.focus()
    }

    wasMobileNavOpenRef.current = isMobileNavOpen

    return () => {
      document.body.classList.remove('mobile-nav-open')
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileNavOpen])

  const closeMobileNav = () => setIsMobileNavOpen(false)

  return (
    <div className="site-shell dark-brand-shell">
      <header className="site-header">
        <NavLink className="brand-mark" to="/" aria-label="KareBraids home">
          <span className="brand-symbol">KB</span>
          <span>KareBraids</span>
        </NavLink>
        <nav className="site-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Button className="header-cta" to="/booking">
          Book Now
        </Button>
        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMobileNavOpen}
          aria-label="Open mobile navigation"
          className="mobile-menu-toggle"
          onClick={() => setIsMobileNavOpen(true)}
          ref={mobileMenuButtonRef}
          type="button"
        >
          <List aria-hidden="true" size={25} weight="bold" />
        </button>
      </header>
      {isMobileNavOpen ? (
        <div className="mobile-nav-layer">
          <button
            aria-label="Dismiss mobile navigation"
            className="mobile-nav-backdrop"
            onClick={closeMobileNav}
            type="button"
          />
          <aside className="mobile-nav-drawer" id="mobile-navigation">
            <div className="mobile-nav-header">
              <span className="brand-symbol">KB</span>
              <span>KareBraids</span>
              <button
                aria-label="Close mobile navigation"
                className="mobile-nav-close"
                onClick={closeMobileNav}
                ref={mobileNavCloseButtonRef}
                type="button"
              >
                <X aria-hidden="true" size={22} weight="bold" />
              </button>
            </div>
            <nav aria-label="Mobile navigation" className="mobile-nav">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) => {
                    const classes = ['mobile-nav-link']

                    if (isActive) {
                      classes.push('active')
                    }

                    if (item.to === '/booking') {
                      classes.push('primary')
                    }

                    return classes.join(' ')
                  }}
                  key={item.to}
                  onClick={closeMobileNav}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <p className="eyebrow">Salon and mobile braiding</p>
          <h2>Protective styles, handled with care.</h2>
        </div>
        <div className="footer-cues" aria-label="KareBraids service promises">
          <span>
            <CalendarCheck aria-hidden="true" size={20} weight="duotone" /> Mon-Sat bookings
          </span>
          <span>
            <ShieldCheck aria-hidden="true" size={20} weight="duotone" /> Gentle tension
          </span>
          <span>
            <Sparkle aria-hidden="true" size={20} weight="duotone" /> Premium finish
          </span>
        </div>
      </footer>
    </div>
  )
}
