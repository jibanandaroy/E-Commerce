import React, { useContext, useEffect, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'
export const ProductDisplay = (props) => {
    const [product, setProduct] = useState('')
    
    const { productId } = useParams();
    // console.log(productId);

    const getProduct = async () => {
        const response = await axios.get(`/api/product/product/1/${productId}`)
        if(response.data.length){
            setProduct(response.data[0])
        }
        // console.log(response.data[0]);
    }
    useEffect(() => {

        getProduct()
    }, [])
    const { addToCart } = useContext(ShopContext)
    
    return (
        <div className='productdisplay'>
            <div className="productdisplay_left">
                <div className="productdisplay_img_list">
                    <img src={`http://localhost:8000/images/${product.image}`} alt="" />
                    <img src={`http://localhost:8000/images/${product.image}`} alt="" />
                    <img src={`http://localhost:8000/images/${product.image}`} alt="" />
                    <img src={`http://localhost:8000/images/${product.image}`} alt="" />
                </div>
                <div className="productdisplay_img">
                    <img className='productdisplay_main_img' src={`http://localhost:8000/images/${product.image}`} alt="" />
                </div>
            </div>
            <div className="productdisplay_right">
                <h1>{product.name}</h1>
                <div className="productdisplay_right_star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>{122}</p>
                </div>
                <div className="productdisplay_right_prices">
                    <div className="productdisplay_right_price_old">${product.price}</div>
                    <div className="productdisplay_right_price_new">${product.offerPrice}</div>
                </div>
                <div className="productdisplay_right_description">
                    A lightweight, usually knitted, pullover shirt, close-fitting and with
                    a round neckline and short sleeves, worn as an undershirt or outer
                    garment.
                </div>
                <div className="productdisplay_right_size">
                    <h1>Select Size</h1>
                    <div className="productdisplay_right_sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => addToCart(productId) }>ADD TO CART</button>
                <p className='productdisplay_right_category'><span>Category:</span> Women, T-Shirt, Crop Top</p>
                <p className='productdisplay_right_category'><span>Tags:</span> Modern, Latest</p>
            </div>
        </div>
    )
}
