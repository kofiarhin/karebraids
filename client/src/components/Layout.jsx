import { CalendarCheck, ShieldCheck, Sparkle } from '@phosphor-icons/react'
import { NavLink, Outlet } from 'react-router-dom'
import { Button } from './Button.jsx'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Booking', to: '/booking' },
]

export function Layout() {
  return (
    <div className="site-shell">
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
      </header>
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
