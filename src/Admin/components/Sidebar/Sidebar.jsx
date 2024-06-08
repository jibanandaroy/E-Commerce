import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import addproduct_icon from '../../../Component/Assets/Product_Cart.svg'
import listproduct_icon from '../../../Component/Assets/Product_list_icon.svg'
import listorder_icon from '../../../Component/Assets/order_list.svg'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to={'/admin/addproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar_item">
                    <img src={addproduct_icon} alt="" />
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to={'/admin/listproduct'} style={{ textDecoration: "none" }}>
                <div className="sidebar_item">
                    <img src={listproduct_icon} alt="" />
                    <p>Product List</p>
                </div>
            </Link>
            <Link to={'/listorder'} style={{ textDecoration: "none" }}>
                <div className="sidebar_item orderlist">
                    <img src={listorder_icon} alt="" className='orderlist_icon'/>
                    <p>Order List</p>
                </div>
            </Link>
        </div>
    )
}

export default Sidebar