import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './light-theme-solid.css'
import './dark-theme-solid.css'
import App from './App.jsx'
import { AppProviders } from './redux/providers.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
