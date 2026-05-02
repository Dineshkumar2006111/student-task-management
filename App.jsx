import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import "./App.css"
import { BrowserRouter as Router,Link} from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Home from './Component/Home'
import Addtask from './Component/Addtask'
import Update from './Component/Update'


function App() {
 

  return (
    <>
      <Router>
          
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/addtask/:uid' element={<Addtask/>}/>
          <Route path='/updatetask' element={<Update/>}/>
          

        </Routes>
      </Router>
    </>
  )
}

export default App
