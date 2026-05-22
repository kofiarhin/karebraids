import { ArrowRight } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

export function Button({ children, to, variant = 'primary', type = 'button', className = '', ...props }) {
  const classes = `btn btn-${variant} ${className}`.trim()

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        <span>{children}</span>
        <ArrowRight aria-hidden="true" size={18} weight="bold" />
      </Link>
    )
  }

  return (
    <button className={classes} type={type} {...props}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={18} weight="bold" />
    </button>
  )
}
