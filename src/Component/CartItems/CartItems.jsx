
import React, { useContext, useState } from 'react'


import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import Modal from './Modal'

export const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, user } = useContext(ShopContext)
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    
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
                if (user.isLogdin && cartItems && cartItems[e.id] > 0) {
                    return <div key={e.id}>
                        <div className="cartitem_format cartitem_format_main">
                            <img src={e.image} alt="" className='carticon_product_icon' />
                            <p>{e.name}</p>
                            <p className='cartitem_price'>${e.offerPrice}</p>
                            <button className='cartitem_quantity'>{cartItems[e.id]}</button>
                            <p className='cartitem_total'>${e.offerPrice * cartItems[e.id]}</p>
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
                    <button className='payment_btn' onClick={toggleModal}>PROCEED TO CHECKOUT</button>
                    {modal && (
                    <Modal 
                    modal={modal}
                    toggleModal={toggleModal}
                    setModal={setModal}
                    />
                )}
                    
                </div>
                {/* <div className="cartitem_promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitem_promobox">
                        <input type="text" placeholder='promo code' />
                        <button>Submit</button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
