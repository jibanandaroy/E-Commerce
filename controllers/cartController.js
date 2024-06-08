const Cart = require('../models/cart')
const User = require('../models/user')

const addToCart = async (req,res) =>{
    const {item,uid} = req.body;
 try{
    const data = await Cart.create(item);
    await User.findByIdAndUpdate({_id:uid},{$set:{cartId:data._id}})
    return res.status(201).json({
        success:true,
        data,
        message:"Create new cart"
    })
 }catch(error){
    return res.status(500).json({
        success:false,
        error,
        message:"server site error"
    })
 }
}

module.exports = {addToCart}