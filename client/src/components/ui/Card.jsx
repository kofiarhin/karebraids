export function Card({ as: Tag = 'div', className = '', children, ...props }) {
  return (
    <Tag className={`bg-brand-800 rounded-3xl border border-white/5 overflow-hidden shadow-xl transition hover:-translate-y-1 ${className}`.trim()} {...props}>
      {children}
    </Tag>
  )
}
