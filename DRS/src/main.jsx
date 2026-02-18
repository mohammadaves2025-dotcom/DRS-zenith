import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import DrsContextProvider from './Context/DrsContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DrsContextProvider>
      <App />
    </DrsContextProvider>
  </BrowserRouter>
    
  
)
