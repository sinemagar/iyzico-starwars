import React from 'react'
import { Route, Routes } from 'react-router-dom'
//maybe navlink
//pages

import Home from '../pages/Home'
function Routers() {
  return (
    <div>
         <nav >
       
      </nav>

      <Routes className="App">
        <Route path='/' element={<Home />} />
       

      </Routes>
    </div>
  )
}

export default Routers
