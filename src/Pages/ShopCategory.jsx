import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Component/Assets/dropdown_icon.png'
import { Item } from '../Component/Item/Item'

export const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext)

  return (
    <div className='shop_cetagory'>
      <div className="shopCategory_banner">
        <img src={props.banner} alt="" />

      </div>

      <div className="shopCategory_products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.offerPrice} old_price={item.price} />
          }
          else {
            return null;
          }
        })}
      </div>

    </div>
  )
}
