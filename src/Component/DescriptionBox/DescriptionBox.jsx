import React, { useContext, useEffect, useState } from 'react'
import './DescriptionBox.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

export const DescriptionBox = (props) => {
  const { user } = useContext(ShopContext)
  const { productId } = useParams();
  const [review, setReview] = useState([])
  const [data, setData] = useState({
    name: user.name,
    productId: productId,
    review: ''
  })
  console.log(review);
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {


      const response = await axios.post('/api/review/addreview', {
        name: data.name,
        productId: data.productId,
        review: data.review
      });
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        setReview((prev) => ([...prev, response.data]))
        alert("successfully add a review")
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  const AllReview = async () => {
    const response = await axios.get('/api/review/getreview');
    if (response.data.success) {
      setReview(response.data.data);
    } else {
      alert("Error")
    }
  }
  useEffect(() => {
    AllReview()
  }, [])
  return (
    <div className='description_box'>
      <form className='' action="" onSubmit={handleSubmit}>
        <label htmlFor="">Review</label>
        <textarea value={data.review} onChange={changeHandler} name="review" placeholder='Write a review......' required></textarea>
        <button>submit</button>
      </form>
      <h3>All Review</h3>
      <hr />
      <div className="all_reviewList">
        {
          review.map((data, index) => (
            <>
            {productId==data.productId?

              <div key={index} className="all_review">
              <h2>{data.name}</h2>
              <p>{data.review}</p>
              <hr />
            </div>
            :
            <></>
            }
            </>
          ))}
      </div>
    </div>
  )
}
