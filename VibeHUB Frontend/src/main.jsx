import { StrictMode } from 'react'
import React from 'react'; 
import { createRoot } from 'react-dom/client'
// import './index.css'
import { UserProvider } from "./context/UserContext";
import { MovieProvider } from "./context/MovieContext";
// import "..src/components/home.css"
import App from './App.jsx'
import Nav from './components/Nav.jsx'
import Home from './components/Home.jsx'
import PlayerUI from './components/PlayerUI.jsx'
import UpdateSongBlob from './components/UpdateSongBlob.jsx';
import PlaySongBlob from './components/PlaySongBlob.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
    <MovieProvider>
      <App />
    </MovieProvider>
    </UserProvider>
  </React.StrictMode>
)
