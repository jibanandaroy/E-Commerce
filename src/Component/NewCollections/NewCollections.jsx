import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import { Item } from '../Item/Item'
import axios from 'axios';
export const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([])
  
  useEffect(()=>{
     axios.get('/api/product/newcollection')
                .then((res) => {
                  setNew_collection(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
  },[])
  return (
    <div className='newCollections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return <Item key={i} id={item.id} name={item.name} image={`http://localhost:8000/images/${item.image}`} new_price={item.price} old_price={item.offerPrice} />
        })}
      </div>
    </div>
  )
}
