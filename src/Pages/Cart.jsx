import React, { useContext, useEffect } from 'react'
import { CartItems } from '../Component/CartItems/CartItems'
import './CSS/Cart.css'
export const Cart = () => {

  return (
    <div className='cart'>
        <CartItems/>
    </div>
  )
}
