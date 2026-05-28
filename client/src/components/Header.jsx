import { useEffect, useRef, useState } from 'react'
import { List, X } from '@phosphor-icons/react'
import { NavLink } from 'react-router-dom'
import { navItems } from '../constants/homepage.js'
import { Button } from './Button.jsx'

function NavItem({ item, className, onClick }) {
  if (item.type === 'anchor') {
    return (
      <a className={className} href={item.href} onClick={onClick}>
        {item.label}
      </a>
    )
  }

  return (
    <NavLink
      className={({ isActive }) => (isActive ? `${className} active` : className)}
      onClick={onClick}
      to={item.href}
    >
      {item.label}
    </NavLink>
  )
}

export function Header() {
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
    <header className="site-header">
      <NavLink className="brand-mark" to="/" aria-label="KareBraids home">
        <span className="brand-symbol">KB</span>
        <span>KareBraids</span>
      </NavLink>
      <nav className="site-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavItem className="nav-link" item={item} key={item.label} />
        ))}
      </nav>
      <Button className="header-cta" to="/booking">
        Book Appointment
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
                <NavItem
                  className={`mobile-nav-link${item.label === 'Booking' ? ' primary' : ''}`}
                  item={item}
                  key={item.label}
                  onClick={closeMobileNav}
                />
              ))}
            </nav>
          </aside>
        </div>
      ) : null}
    </header>
  )
}
