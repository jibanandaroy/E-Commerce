const Order = require('../models/order');
const User = require('../models/user');

const placeOrder = async (req,res) =>{
    try{
        const newOrder = new Order({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save()
        res.json({success:true,message:"Order Successful"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

module.exports = {placeOrder}