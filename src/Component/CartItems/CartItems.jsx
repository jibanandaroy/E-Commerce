
import React, { useContext, useEffect, useState} from 'react'


import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {
    const { getTotalCartAmount, all_product,cart, removeFromCart,user} = useContext(ShopContext)
    const [all_products, setAllProducts] = useState(all_product)
    
    useEffect(() => {
        if(cart){
            const cartValues = Object.values(cart);
            const hasItems = cartValues.some(quantity => quantity > 0);
            if (!hasItems) {
                const LocalCartitem = JSON.parse(localStorage.getItem('cart'))
                if(LocalCartitem) setAllProducts(LocalCartitem);
            }else{
                localStorage.removeItem('cart')
                localStorage.setItem('cart',JSON.stringify(cart));
            }
        }
    }, [cart,setAllProducts])


    // console.log(all_products);
    return (
        <div className='cartitems'>
            <div className="cartitem_format_main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quintity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (user.isLogdin && cart && cart[e.id] > 0) {
                    return <div key={e.id}>
                        <div className="cartitem_format cartitem_format_main">
                            <img src={e.image} alt="" className='carticon_product_icon' />
                            <p>{e.name}</p>
                            <p className='cartitem_price'>${e.offerPrice}</p>
                            <button className='cartitem_quantity'>{cart[e.id]}</button>
                            <p className='cartitem_total'>${e.offerPrice * cart[e.id]}</p>
                            <img className='cartitem_remove_icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })}
            <div className="catritam_down">
                <div className="cartitem_total_price">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitem_total_item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitem_total_item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitem_total_item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitem_promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitem_promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
