import { Outlet, useLocation } from 'react-router-dom'
import { PageTransition } from './PageTransition.jsx'
import { ScopedPageReveals } from './ScopedPageReveals.jsx'

export function PublicRouteTransition() {
  const { pathname } = useLocation()
  const variant = pathname === '/gallery' ? 'gallery' : pathname === '/booking' ? 'booking' : 'standard'

  return (
    <PageTransition
      className="public-route-transition"
      data-public-route-transition
      key={pathname}
    >
      <ScopedPageReveals variant={variant}>
        <Outlet />
      </ScopedPageReveals>
    </PageTransition>
  )
}
