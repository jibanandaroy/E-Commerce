import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import './MyOrders.css'
import axios from 'axios'



const MyOrders = () =>{

    const {token,user} = useContext(ShopContext)
    const [data, setData] = useState([]);
   
    const fetchOrders = async () =>{
        const response = await axios.post('/api/order/userorders',{},{headers:{token}})
        setData(response.data.data)
    }
    useEffect(()=>{
        if(token){
            fetchOrders()
        }
    },[token])
    
    return (
        <div className="my_orders">
            <h2>My Orders</h2>
            <div className='my_orders_format'>
                <p className='name'>Product</p>
                <p>Price</p>
                <p>Items</p>
                <p>Delivery Status</p>
                
            </div>
            <div className="container">
                <hr />
                {data.map((order,index)=>{
                    return(
                        <>
                        <div key={index} className="my_orders_order ">
                            <p>{order.items.map((item,index)=>{
                                if(index === order.items.length-1){
                                    return item.name+" x "+item.quantity
                                }else{
                                    return item.name+" x "+item.quantity+", "
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            {/* <button>Track Order</button> */}
                        </div>
                        <hr />
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders