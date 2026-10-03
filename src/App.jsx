import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stack from './components/Stack'
import Servicios from './components/Servicios'
import Experiencia from './components/Experiencia'

function App() {
  
  return (
    <>

      <Navbar/>
      <Hero/>
      <Stack/>
      <Servicios/>
      <Experiencia/>

    </>
  )
}

export default App
