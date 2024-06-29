import React, { useEffect, useState } from 'react'
import './Popular.css'
import { Item } from '../Item/Item'
import axios from 'axios';

export const Popular = () => {
  const [data_product, setData_product] = useState([])
    useEffect(() => {
      axios.get('/api/product/popularinwomen')
        .then((res) => {
          setData_product(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
    }, [])

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular_item">
        {data_product.map((item, i) => {
          return <Item key={i} id={item._id} name={item.name} image={`http://localhost:8000/images/${item.image}`} new_price={item.offerPrice} old_price={item.price} />
        })}
      </div>
    </div>
  )
}
