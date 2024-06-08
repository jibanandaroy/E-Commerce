import React, { useContext, useEffect, useState } from 'react'
import './AddProduct.css'
import upload_area from '../../../Component/Assets/upload_area.svg'
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios'
import { ShopContext } from '../../../Context/ShopContext';

const AddProduct = () => {
  // const[image, setImage] = useState(false);
  const { user,setProducts,all_product } = useContext(ShopContext)
  const [data, setData] = useState({
    name: '',
    userId: user.id,
    old_price: '',
    new_price: '',
    category: 'women',
    image: ''
  })

  useEffect(() => {
    data.userId = user.id;
  }, [user.id])

  // const imageHandler = (e) =>{
  //   setImage(e.target.files[0]);
  //   data.image=image
  // }

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleClick = async (e) => {
    e.preventDefault();
    // const { category } = data;
    const formdata = new FormData();
    formdata.append('image', data.image);
    formdata.append('userId', data.userId);
    formdata.append('name', data.name);
    formdata.append('category', data.category);
    formdata.append('price', data.old_price);
    formdata.append('offerPrice', data.new_price);
    try {


      const response = await axios.post('/api/product/addproduct', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log(response.data);
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log(response.data);
        // const res = response.data;
        setProducts((prev)=>([...prev,response.data]))
        alert("successfully add a product")
      }
    }
    catch (error) {
      console.log(error);
    }

  }




  return (
    <>
      <Sidebar />
      <div className='add_product'>
        <div className="addproduct_itemfield">
          <p>Product title</p>
          <input type="text" value={data.name} onChange={changeHandler} name='name' placeholder='Type here' />
        </div>
        <div className="addproduct_price">
          <div className="addproduct_itemfield">
            <p>Price</p>
            <input type="text" name='old_price' value={data.old_price} onChange={changeHandler} placeholder='Type here' />
          </div>
          <div className="addproduct_itemfield">
            <p>Offer Price</p>
            <input type="text" name='new_price' value={data.new_price} onChange={changeHandler} placeholder='Type here' />
          </div>
        </div>
        <div className="addproduct_itemfield">
          <p>Product Category</p>
          <select name="category" value={data.category} onChange={changeHandler} className='addproduct_selectoer'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="addproduct_itemfield">
          <label htmlFor="file-input">
            <img src={data.image ? URL.createObjectURL(data.image) : upload_area} className='addproduct_thumnail_img' alt="" />
          </label>
          <input onChange={(e) => setData((prev) => ({ ...prev, image: e.target.files[0] }))} type="file" name='image' id='file-input' hidden />
        </div>
        <button className='addproduct_btn' onClick={handleClick}>ADD</button>



      </div>
    </>
  )
}

export default AddProduct