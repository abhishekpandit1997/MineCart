import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Singin from './components/Singin'
import ShowData from './components/ShowData'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Singup from './components/SingUp'

function App() {

  return (
    
     <BrowserRouter>
        <Routes>
          
          <Route path="/Singin" element={<Singin />} />
          <Route path="/Singup" element={<Singup />} />
          <Route path="/showdata" element={<ShowData />} />
          
        </Routes>
        </BrowserRouter>
    
  )
}

export default App
