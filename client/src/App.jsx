import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { RouteScrollManager } from './components/RouteScrollManager.jsx'
import { StyleRedirect } from './components/StyleRedirect.jsx'
import { About } from './pages/About.jsx'
import { Admin } from './pages/Admin.jsx'
import { Booking } from './pages/Booking.jsx'
import { Contact } from './pages/Contact.jsx'
import { Gallery } from './pages/Gallery.jsx'
import { Home } from './pages/Home.jsx'
import { Services } from './pages/Services.jsx'
import { ServiceDetail } from './pages/ServiceDetail.jsx'

const App = () => {
  return (
    <>
      <RouteScrollManager />

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="styles/:slug" element={<StyleRedirect />} />
          <Route path="booking" element={<Booking />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </>
  )
}

export default App