const Order = require('../models/order');

const placeOrder = async (req,res) =>{
    const{userId,items,amount,address} = req.body
    try{
        const obj = {
            userId,
            items,
            amount,
            address
        }
         const order = await Order.create(obj);
        res.json({success:true,message:"Order Successful"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    } 
}

module.exports = {placeOrder}