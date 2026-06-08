import React from 'react'
import './Navbar.css'
import logo from '../../Images/logo.png'
// import Sidebar from '../Sidebar/Sidebar';
// import { Context } from '../../context/Context';
// import { useLocation } from 'react-router-dom';

function Navbar() {
  // const [open,setOpen] = useState(false)
  // const {sidebarOpen,setSidebarOpen} = useContext(Context);
  // const location = useLocation();
  return (
    <div className='navbar'>
      <div className='left'>
        <img src={logo} alt="logo" />
        <strong className='logo'>Pizza Point</strong>
      </div>
      <div className='right'>
        <ul>
          {/* <li><Link to="/">Home</Link></li>
          <li><Link to="/offers">Offers</Link></li>
          <li><Link to="/outlet">Outlet</Link></li> */}
          {/* <li>Meals</li>
          <li>Favorite</li>
          <li>Orders</li>
          <li>Cart</li> */}
        </ul>
      </div>
      {/* <div style={{color:'white',gap:'20px',display:'flex'}}>
          <Link to="/cart"><ShoppingCartIcon/></Link>
          <Link to="/profile"><PersonIcon/></Link>
        </div>
      <div className='menu' onClick={()=>setSidebarOpen(!sidebarOpen)}>
        {location.pathname === "/" ? <MenuIcon sx={{color:'white'}}/> : <Link to="/"><WestIcon sx={{color:'white'}}/></Link> }
      </div> */}
      {/* {open && <Sidebar/>} */}
    </div>
  )
}

export default Navbar