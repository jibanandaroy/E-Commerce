import React from 'react'
import { Home } from '../Component/Home/Home'
import { Popular } from '../Component/Popular/Popular'
import { Offers } from '../Component/Offers/Offers'
import { NewCollections } from '../Component/NewCollections/NewCollections'
import { NewsLetter } from '../Component/NewsLetter/NewsLetter'

export const Shop = () => {
  return (
    <div>
        <Home/>
        <Popular/>
        <Offers/>
        <NewCollections/>
        <NewsLetter/>
    </div>
  )
}
