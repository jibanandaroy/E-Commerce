import React, { useContext, useEffect, useState } from 'react'
import { Hero } from '../Component/Hero/Hero'
import { Popular } from '../Component/Popular/Popular'
import { Offers } from '../Component/Offers/Offers'
import { NewCollections } from '../Component/NewCollections/NewCollections'
import { ShopContext } from '../Context/ShopContext'

export const Shop = () => {
  const { user } = useContext(ShopContext);
  const[reload,setReload] = useState(false)

  useEffect(()=>{
    if(user.isLogdin){
      setReload(true)
    }
  },[reload])
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      
    </div>
  )
}
