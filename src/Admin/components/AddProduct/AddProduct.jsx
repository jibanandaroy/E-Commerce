import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../../Component/Assets/upload_area.svg'
import Sidebar from '../Sidebar/Sidebar';

const AddProduct = () => {
  const[image, setImage] = useState(false);

  const imageHandler = (e) =>{
    setImage(e.target.files[0]);
  }


  return (
    <>
    <Sidebar/>
    <div className='add_product'>
      <div className="addproduct_itemfield">
        <p>Product title</p>
        <input type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct_price">
        <div className="addproduct_itemfield">
          <p>Price</p>
          <input type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct_itemfield">
          <p>Offer Price</p>
          <input type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct_itemfield">
        <p>Product Category</p>
        <select name="category" className='addproduct_selectoer'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct_itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className='addproduct_thumnail_img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button className='addproduct_btn'>ADD</button>



    </div>
    </>
  )
}

export default AddProduct