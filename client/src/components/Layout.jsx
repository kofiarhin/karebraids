import { Outlet } from 'react-router-dom'
import { Footer } from './Footer.jsx'
import { Header } from './Header.jsx'

export function Layout() {
  return (
    <div className="site-shell theme-brand-shell">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
