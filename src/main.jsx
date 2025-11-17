import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { PerformanceMonitor } from './utils/performanceMonitor.js'

// Initialize FPS monitor in development
if (import.meta.env.DEV) {
  // new PerformanceMonitor();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />,
)
