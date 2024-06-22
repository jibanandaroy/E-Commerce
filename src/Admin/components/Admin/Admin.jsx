import React from 'react'
import './Admin.css'
import Sidebar from '../Sidebar/Sidebar'
import AddProduct from '../AddProduct/AddProduct'





const Admin = () => {
  return (
    <div className='admin'>
    
        <Sidebar/>
        <AddProduct/>
        
        
    </div>
  )
}

export default Admin