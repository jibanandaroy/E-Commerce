import React, { useContext, useEffect } from 'react'
import './Listproduct.css'
import Sidebar from '../Sidebar/Sidebar'
import { ShopContext } from '../../../Context/ShopContext'
import cross_icon from '../../../Component/Assets/cross_icon.png'
const Listproduct = () => {

  const { all_product, deleteProduct } = useContext(ShopContext)


  return (
    <>
      <Sidebar />
      <div className='list_product'>
        <h1>All Products List</h1>
        <div className="listproduct_format_main">
          <p>Product</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct_allproduct">
          <hr />
          {
            console.log(all_product)
          }
          {all_product.map((product, index) => {
            return <><div key={index} className="listproduct_format_main listproduct_format">
              <img src={product.image} alt="" className='listproduct_product_icon' />
              <p>{product.name}</p>
              <p>{product.price}</p>
              <p>{product.offerPrice}</p>
              <p>{product.category}</p>
              <img className='listproduct_remove_icon' src={cross_icon} alt="" onClick={() => deleteProduct(product.id)} />
            </div>
              <hr />
            </>
          })}
        </div>
      </div>
    </>
  )
}

export default Listproduct