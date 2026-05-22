import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.jsx'
import { About } from './pages/About.jsx'
import { Booking } from './pages/Booking.jsx'
import { Gallery } from './pages/Gallery.jsx'
import { Home } from './pages/Home.jsx'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="booking" element={<Booking />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  )
}

export default App
