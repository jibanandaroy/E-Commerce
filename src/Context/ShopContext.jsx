
import React, {useEffect, createContext, useState } from "react";
import all_product from '../Component/Assets/all_product'
import axios from 'axios';


export const ShopContext = createContext(null)
const getDefaulCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        id:''
    });
    
    const [cartItems, setCartItems] = useState(getDefaulCart())
    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId] + 1 })) 
        const localitem = JSON.parse(localStorage.getItem('cart'))
        if(localitem){
               localStorage.removeItem('cart')
               localStorage.setItem('cart',JSON.stringify(cartItems));
        }  
        
    }
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]:prev[itemId] - 1}));
        const LocalCartitem = JSON.parse(localStorage.getItem('cart'))
         const cartValues = Object.values(LocalCartitem);
         const oneItem = cartValues.reduce(function(a, b) { return a + b; }, 0);
        if(oneItem === 1)localStorage.removeItem('cart')
    }
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            } 
        }
        return totalAmount
    }

    const getTotalCartItem = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+=cartItems[item]
            }
        }
        return totalItem;
    }

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get('/api/auth/profile')
            if (response.data) setUser(response.data);

        }
        getUser();
    }, [user.email])


    const contextValue = {getTotalCartItem, setCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart,user };



    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;