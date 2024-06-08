import React, { useContext, } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import { Breadcrum } from '../Component/Breadcrum/Breadcrum'
import { ProductDisplay } from '../Component/ProductDisplay/ProductDisplay'
import { DescriptionBox } from '../Component/DescriptionBox/DescriptionBox'
import { RelatedProducts } from '../Component/RelatedProducts/RelatedProducts'
import { LoginSignup } from './LoginSignup'

export const Product = () => {
  const { all_product, user } = useContext(ShopContext)
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === (productId))

 
  
  
  // console.log(user);

  return (
    <>
    {(user.email) ?
      <div>
        
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        <DescriptionBox />
        <RelatedProducts />
      </div>
      :
      <LoginSignup/>
      }
      </>
  )
}
