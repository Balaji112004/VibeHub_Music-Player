import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home'
import Nav from './components/Nav'
import AdminMovies from './components/AdminMovies'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Home/> */}
    {/* <Nav/> */}
    <AdminMovies/>
  </StrictMode>,
)
