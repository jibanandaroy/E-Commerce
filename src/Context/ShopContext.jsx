
import React, { useEffect, createContext, useState } from "react";
// import all_product from '../Component/Assets/all_product'
import axios from 'axios';
export const ShopContext = createContext(null)

const ShopContextProvider = (props) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        role: '',
        id: '',
        isVerified: false,
        isLogdin: false
    });
    const [all_product, setProducts] = useState([]);

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
    useEffect(() => {
        if (!cart) {
            for (let index = 0; index < all_product.length; index++) {
                // cart[index] = 0;
                if (all_product.length) {
                    setCart((prev) => ({ ...prev, [all_product[index].id]: 0 }));
                }
            }
        }
    }, [all_product])


    useEffect(() => {
        const getProduct = async () => {
            await axios.get('/api/product/getproduct')
                .then((res) => {
                    setProducts(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getProduct()
    }, [])

    const addToCart = (itemId) => { 

       setCart((prev) => ({ ...prev, [itemId]: cart[itemId] + 1 }))
        const localitem = JSON.parse(localStorage.getItem('cart'))

        if (localitem) {
            localitem[itemId] = localitem[itemId] + 1;
            localStorage.setItem('cart', JSON.stringify(localitem));  
        }else {
            cart[itemId] = cart[itemId] + 1;
            localStorage.setItem('cart', JSON.stringify(cart)); 
        }
    }

    const removeFromCart = (itemId) => {
        setCart((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        const LocalCartitem = JSON.parse(localStorage.getItem('cart'))
        const cartValues = Object.values(LocalCartitem);
        const oneItem = cartValues.reduce(function (a, b) { return a + b; }, 0);
        if (oneItem === 1) localStorage.removeItem('cart')
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cart) {
            if (cart[item] > 0) {

                // let itemInfo = all_product.find((product) => product.id === (item))
                // totalAmount += itemInfo.offerPrice * cart[item];
            }
        }
        return totalAmount
    }

    const getTotalCartItem = (cartItems) => {
        let totalItem = 0;
        for (const item in cart) {
            if (cart[item] > 0) {
                totalItem += cart[item]
            }
        }
        return JSON.stringify(totalItem);
    }

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get('/api/auth/profile')
            if (response.data) setUser({ ...response.data, isLogdin: true });
            // console.log(response.data);
        }

        getUser();
    }, [user.isLogdin])


    const contextValue = { getTotalCartItem, getTotalCartAmount, removeFromCart, cart, all_product, addToCart, user, setUser };



    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;