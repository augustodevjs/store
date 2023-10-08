import React from 'react'
import { App } from './App'
import Modal from 'react-modal'
import ReactDOM from 'react-dom/client'

Modal.setAppElement('#root')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
