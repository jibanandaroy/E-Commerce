import React, { useContext,useRef, useState } from 'react'
import './Navber.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import {Link} from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../Assets/nav_dropdown.png'

export const Navber = () => {
  const [menu,setMenu] = useState("shop")
  const {getTotalCartItem} = useContext(ShopContext);
  const menuRef = useRef();

  const deopdown_toggle = (e)=>{
      menuRef.current.classList.toggle('nav_menu_visible');
      e.target.classList.toggle('open')
  }

  return (
    <div className='navber'>
        <div className="nav_logo">
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <img className='nav_dropdown' onClick={deopdown_toggle} src={dropdown_icon} alt="" />
        <ul ref={menuRef} className='nav_menu'>
            <li onClick={()=>{setMenu("shop")}}> <Link style={{textDecoration:'none'}} to='/'>Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}> <Link style={{textDecoration:'none'}} to='/mens'>Men</Link> {menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}> <Link style={{textDecoration:'none'}} to='/womens'>Women</Link> {menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}> <Link style={{textDecoration:'none'}} to='/kids'>Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav_login_cart">
          <Link to='/login'><button>Login</button></Link>
          <Link to='/cart'><img src={cart_icon} alt="" /></Link>
          <div className="nav_cart_count">{getTotalCartItem()}</div>
        </div>
    </div>
  )
}
