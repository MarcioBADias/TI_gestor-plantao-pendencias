import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.querySelector('[data-js="root"]')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
