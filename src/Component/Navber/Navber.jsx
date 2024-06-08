import React, { useContext,  useRef, useState } from 'react'
import './Navber.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../Assets/nav_dropdown.png'
import axios from 'axios';
 

export const Navber = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("shop")
  const {getTotalCartItem, user,setUser } = useContext(ShopContext);
  const menuRef = useRef();
  


  const deopdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav_menu_visible');
    e.target.classList.toggle('open')
  }

  
  const handleLogout = async () => {
    await axios.get('/api/auth/logout')
    setUser((prev)=>({...prev,isLogdin:false}))
    navigate('/login')
  }

 
  return (
    <div className='navber'>
      <Link style={{ textDecoration: 'none' }} to='/'>
      <div className="nav_logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      </Link>
      <img className='nav_dropdown' onClick={deopdown_toggle} src={dropdown_icon} alt="" />
      <ul ref={menuRef} className='nav_menu'>
        <li onClick={() => { setMenu("shop") }}> <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("mens") }}> <Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("womens") }}> <Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("kids") }}> <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav_login_cart" >
        {(user.isLogdin) ? <button onClick={handleLogout}>Logout</button> : <button onClick={()=>(navigate('/login'))}>Login</button>}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav_cart_count">{getTotalCartItem()}</div>
      </div>
    </div>
  )
}
