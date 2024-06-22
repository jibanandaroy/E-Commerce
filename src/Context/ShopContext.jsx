
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
        isLogdin: false,
    });
    const [loading , setLoading] = useState(true);
    const [all_product, setProducts] = useState([]);
    const [token, setToken] = useState('')

    // const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))
    const [cartItems, setCartItems] = useState({})

    
    // useEffect(() => {
    //     if (!cartItems) {
    //         for (let index = 0; index < all_product.length; index++) {
    //             // cart[index] = 0;
    //             if (all_product.length) {
    //                 setCartItems((prev) => ({ ...prev, [all_product[index].id]: 0 }));
    //             }
    //         }
    //     }
    // }, [all_product])


    useEffect(() => {
        const getProduct = async () => {
            await axios.get('/api/product/getproduct')
                .then((res) => {
                    // console.log(res.data)
                    setProducts(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        getProduct()
    }, [])

    const deleteProduct = async (id) => {

        try {
            const newProduct = all_product.filter((data) => data.id !== id)
            setProducts(newProduct)
            await axios.delete(`/api/product/product/${id}`)
        } catch (error) {
            console.log(error);
        }
    }


    const addToCart = async (itemId) => {

        // setCart((prev) => ({ ...prev, [itemId]: cart[itemId] + 1 }))
        // const localitem = JSON.parse(localStorage.getItem('cart'))

        // if (localitem) {
        //     localitem[itemId] = localitem[itemId] + 1;
        //     localStorage.setItem('cart', JSON.stringify(localitem));
        // } else {
        //     cart[itemId] = cart[itemId] + 1;
        //     localStorage.setItem('cart', JSON.stringify(cart));
        // }
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post('/api/cart/add',{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            await axios.post('/api/cart/remove',{itemId},{headers:{token}})
        }
        // const LocalCartitem = JSON.parse(localStorage.getItem('cart'))
        // const cartValues = Object.values(LocalCartitem);
        // const oneItem = cartValues.reduce(function (a, b) { return a + b; }, 0);
        // if (oneItem === 1) localStorage.removeItem('cart')
    }
    const loadCartData = async (token) =>{
        const response = await axios.post('/api/cart/get',{},{headers:{token}})
        setCartItems(response.data.cartData)
    }
    useEffect(()=>{
        const loadData = async ()=>{
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData()
    },[])

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {

                const itemInfo = all_product.find((product) => product.id === (item))
                if (itemInfo !== undefined) {
                    totalAmount += itemInfo.offerPrice * cartItems[item];
                }
            }
        }
        return totalAmount
    }

    const getTotalCartItem = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (user.isLogdin && cartItems[item] > 0) {
                totalItem += cartItems[item]
            }
        }
        return JSON.stringify(totalItem);
    }

    useEffect(() => {
        const getUser = async () => {
            try{
                setLoading(true)
                const response = await axios.get('/api/auth/profile')
                if(response.data.success){
                    setUser({ ...response.data.data, isLogdin: true });
                }else{
                    setUser({data:null, isLogdin: false });
    
                }
            }catch(error){
                console.log(error)
                setLoading(false);
            }finally{
                setLoading(false);
            }
          

        }

        getUser();
    }, [user.isLogdin])




    const contextValue = { getTotalCartItem, getTotalCartAmount, removeFromCart, deleteProduct, setProducts, cartItems, all_product, addToCart, user, setUser ,token,setToken ,loading };



    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;