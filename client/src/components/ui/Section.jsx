export function Section({ className = '', children, ...props }) {
  return <section className={`max-w-7xl mx-auto px-6 py-20 ${className}`.trim()} {...props}>{children}</section>
}
