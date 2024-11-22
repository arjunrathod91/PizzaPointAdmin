import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Admin from './pages/Admin/Admin'
import { MyContextProvider } from './context/Context'
import Adminlogin from './pages/Admin/adminlogin'
function App() {
  return (
    <div>
      <MyContextProvider>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Admin/>}/>
        <Route path='/adminlogin' element={<Adminlogin/>}/>
      </Routes>
      </BrowserRouter>
      </MyContextProvider>
    </div>
  )
}

export default App

