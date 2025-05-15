import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import { AuthProvider } from './context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.querySelector('[data-js="root"]')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
