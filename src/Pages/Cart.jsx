import React, { useContext, useEffect } from 'react'
import { CartItems } from '../Component/CartItems/CartItems'
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
  const { user ,loading} = useContext(ShopContext);
  return (
    <div>
        <CartItems/>
    </div>
  )
}
