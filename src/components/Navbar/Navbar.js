import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../Images/logo.png'
import { Link } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from '../Sidebar/Sidebar';

function Navbar() {
  const [open,setOpen] = useState(false)
  return (
    <div className='navbar'>
      <div className='left'>
        <img src={logo} alt="logo" />
        <strong className='logo'>Pizza Point</strong>
      </div>
      <div className='right'>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/offers">Offers</Link></li>
          <li><Link to="/outlet">Outlet</Link></li>
          {/* <li>Meals</li>
          <li>Favorite</li>
          <li>Orders</li>
          <li>Cart</li> */}
        </ul>
      </div>
      <div className='menu' onClick={()=>setOpen(!open)}>
        <MenuIcon/>
      </div>
      {open && <Sidebar/>}
    </div>
  )
}

export default Navbar