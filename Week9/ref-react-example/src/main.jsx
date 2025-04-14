import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Timer from './components/timer'
import LeafletMap from './components/map'

 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Timer />
    <LeafletMap />
  </StrictMode>,
)
