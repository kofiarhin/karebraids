export function SectionHeading({ align = 'left', eyebrow, heading, link }) {
  return (
    <div className={`section-heading luxury-section-heading ${align === 'split' ? 'split' : ''}`} data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{heading}</h2>
      </div>
      {link ? (
        <a className="text-link" href={link.href}>
          {link.label}
        </a>
      ) : null}
    </div>
  )
}
