import React, { useEffect, useState } from 'react'
import './EditProduct.css'
import axios from 'axios'
import Sidebar from '../Sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {
    // const { all_product } = useContext(ShopContext)
    const navigate = useNavigate()
    const {id}=useParams();
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        offerPrice: ''
    })
    

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        const productGet= async()=>{
            const response = await axios.get(`api/product/product/1/${id}`)
            const {name,description,price,offerPrice}= response.data[0];
            setData({name,description ,price,offerPrice })
          
        }
        productGet();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            data.id = id ;
             const response = await axios.put('/api/product/editproduct', data );
             if(!data.name || !data.description || !data.price || !data.offerPrice)
             {
                alert("Please fill up all information")    
             }
             else{
                navigate(-1)
                alert("successfully update")
             }
            
        }
        catch (error) {
            console.log(error);
        }

    }


    return (
        <>
            <Sidebar/>
            <div className='edit_product'>
                <div className="editproduct_itemfield">
                    <p></p>
                    <input type="text" value={data.name} onChange={changeHandler} name='name' placeholder='Type here' />
                </div>
                <div className="editproduct_itemfield">
                    <p>Product Description</p>
                    <input type="text" value={data.description} onChange={changeHandler} name='description' placeholder='Type here' />

                </div>
                <div className="editproduct_price">
                    <div className="editproduct_itemfield">
                        <p>Price</p>
                        <input type="text" name='price' value={data.price} onChange={changeHandler} placeholder='Type here' />
                    </div>
                    <div className="editproduct_itemfield">
                        <p>Offer Price</p>
                        <input type="text" name='offerPrice' value={data.offerPrice} onChange={changeHandler} placeholder='Type here' />
                    </div>
                </div>
                
                
                <button className='editproduct_btn ' onClick={handleSubmit}>Edit</button>



            </div>
        </>
    )
}

export default EditProduct