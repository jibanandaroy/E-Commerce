import React, { useEffect, useState } from 'react'
import './ListOrder.css'
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
const ListOrder = () => {
  const [orders,setOrders] = useState([])

  const AllOrders = async () =>{
    const response = await axios.get('/api/order/list');
    if(response.data.success){
      setOrders(response.data.data);
      console.log(response.data.data);
    }else{
      alert("Error")
    }
  }

  const statusHandle = async (e,orderId) =>{
    const response = await axios.post('/api/order/status',{
      orderId,
      status:e.target.value
    })
    if(response.data.success){
      await AllOrders();
    }
  }

  useEffect(()=>{
    AllOrders()
  },[])
  return (
    <>
    <Sidebar/>
    <div className='list_order'>
        <h1>All Orders</h1>
        <div className="listorder_format_main">
          <p>Product</p>
          <p>Address</p>
          <p>Items</p>
          <p>Price</p>
          <p>Status</p>
        </div>
        <div className="order_list">
        <hr />
          {orders.map((order,index)=>{
            return(
              <>
            <div key={index} className="order_item listorder_format_main">
                
                  <p className='order_item_product'>
                    {order.items.map((item,index)=>{
                      if(index === order.items.length-1){
                        return item.name + " x "+ item.quantity
                      }else{
                        return item.name + " x "+ item.quantity + ", "
                      }
                    })}
                  </p>
                  <p>{order.address}</p>
                  <p>Items: {order.items.length}</p>
                  <p>${order.amount}</p>
                  <select onChange={(e)=>statusHandle(e,order._id)} value={order.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <hr />
                </>
            
          )})}
        </div>
    </div>
    </>
  )
}

export default ListOrder