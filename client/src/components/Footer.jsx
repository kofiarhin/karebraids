import { InstagramLogo, MapPin, TiktokLogo } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'
import { footerGroups, socialLinks } from '../constants/homepage.js'
import { Button } from './Button.jsx'

function FooterLink({ link }) {
  if (link.href.startsWith('#')) {
    return <a href={link.href}>{link.label}</a>
  }

  return <Link to={link.href}>{link.label}</Link>
}

export function Footer() {
  return (
    <footer className="site-footer luxury-footer" id="contact">
      <div className="footer-brand">
        <p className="eyebrow">KareBraids</p>
        <h2>Luxury African braiding with care at the centre.</h2>
        <p>
          Premium salon and mobile braid appointments for polished protective styles across Birmingham and the West Midlands.
        </p>
        <div className="footer-socials" aria-label="Social links">
          {socialLinks.map((link) => (
            <a aria-label={link.label} href={link.href} key={link.label}>
              {link.label === 'TikTok' ? (
                <TiktokLogo aria-hidden="true" size={20} weight="fill" />
              ) : (
                <InstagramLogo aria-hidden="true" size={20} weight="fill" />
              )}
            </a>
          ))}
        </div>
      </div>
      {footerGroups.map((group) => (
        <div className="footer-column" key={group.title}>
          <h3>{group.title}</h3>
          {group.links.map((link) => (
            <FooterLink key={link.label} link={link} />
          ))}
        </div>
      ))}
      <div className="footer-column footer-contact">
        <h3>Contact</h3>
        <p>Mon - Sat: 8AM - 7PM</p>
        <p>
          <MapPin aria-hidden="true" size={18} weight="duotone" />
          Birmingham, West Midlands
        </p>
        <Button to="/booking">Book Appointment</Button>
      </div>
    </footer>
  )
}
