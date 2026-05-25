export function Input({ className = '', ...props }) {
  return <input className={`bg-brand-900 border border-white/10 text-text-primary placeholder:text-text-muted rounded-xl focus:border-accent-500 ${className}`.trim()} {...props} />
}
