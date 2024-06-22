import React, { useEffect } from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'
import { useNavigate } from 'react-router-dom'

export const Offers = () => {
  const navigate = useNavigate()
  const haldleClick = async () =>{
    navigate('/womens')
    window.scrollTo(0,0)
  }
 
  return (
    <div className="offers_main">
    <div className='offers'>
        <div className="offers_left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button onClick={haldleClick}>Check Now</button>
        </div>
        <div className="offers_right">
            <img src={exclusive_image} alt="" />
        </div>
    </div>
    </div>
  )
}
