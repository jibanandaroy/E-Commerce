import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navber.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../Assets/nav_dropdown.png'
import profile_icon from '../Assets/profile.svg'
import dashboard_icon from '../Assets/dashboard.svg'
import logout_icon from '../Assets/logout.svg'
import axios from 'axios';

export const Navber = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("shop")
  const { getTotalCartItem, user, setUser } = useContext(ShopContext);
  const menuRef = useRef();
  const search = useLocation()
  // console.log(typeof(user.role));

  useEffect(() => {
    if (search.pathname === '/mens' || search.pathname === '/womens' || search.pathname === '/kids') {
      setMenu(search.pathname.split('/')[1])
    }
  }, [])


  const deopdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav_menu_visible');
    e.target.classList.toggle('open')
  }

  const handleClick = async () => {
    if (user.role === 1) {
      navigate('/admin');
    }
    else {
      navigate('/myorders')
    }
  }

  const handleLogout = async () => {

    try {
      const response = await axios.get('/api/auth/logout')
      if (response.data.error) {
        console.log(response.data.error);
      }
      localStorage.clear()
      setUser((prev) => ({ ...prev, isLogdin: false }))
      navigate('/login')

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='navber'>
      <Link style={{ textDecoration: 'none' }} to='/'>
        <div className="nav_logo">
          <img src={logo} alt="" />
          <p>DRESSIFY</p>
        </div>
      </Link>
      <img className='nav_dropdown' onClick={deopdown_toggle} src={dropdown_icon} alt="" />
      <ul ref={menuRef} className='nav_menu'>
        <li> <Link style={{ textDecoration: 'none' }} onClick={()=>setMenu("shop")} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
        <li> <Link style={{ textDecoration: 'none' }} onClick={()=>setMenu("mens")} to='/mens'>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
        <li> <Link style={{ textDecoration: 'none' }} onClick={()=>setMenu("womens")} to='/womens'>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
        <li> <Link style={{ textDecoration: 'none' }} onClick={()=>setMenu("kids")} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav_login_cart" >
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="nav_cart_count">{getTotalCartItem()}</div>
        {(!user.isLogdin) ? <button onClick={() => (navigate('/login'))}>Login</button>
          : <div className='navbar_profile'>
            <img src={profile_icon} alt="" />
            <ul className='nav_profile_dropdown'>
              <li onClick={handleClick}><img src={dashboard_icon} alt="" /><p>Dashboard</p></li>
              <hr />
              <li onClick={handleLogout}><img src={logout_icon} alt="" /><p>Log out</p></li>
            </ul>
          </div>

        }

      </div>
    </div>
  )
}
