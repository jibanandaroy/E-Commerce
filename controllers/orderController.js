const Order = require('../models/order');

const placeOrder = async (req, res) => {
    const { userId, items, amount, address } = req.body
    try {
        const obj = {
            userId,
            items,
            amount,
            address
        }
        const order = await Order.create(obj);
        res.json({ success: true, message: "Order Successful" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const userOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.body.userId });
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

const listOrders = async (req,res) =>{
    try{
        const orders = await Order.find({});
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
module.exports = { placeOrder, userOrders,listOrders }