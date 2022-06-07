import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './layout/Layout'
import Inicio from './Pages/Inicio'
import NewClient from './Pages/NewClient'
import EditClient from './Pages/EditClient'
import LookClient from './Pages/LookClient'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} >
          <Route index element={<LoginForm />} />
        </Route> */}

        <Route path='/client' element={<Layout />} >
          <Route index element={<Inicio />} />
          <Route path='new' element={<NewClient />} />
          <Route path='edit/:id' element={<EditClient />} />
          <Route path=":id" element={<LookClient />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
