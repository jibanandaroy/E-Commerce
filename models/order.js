const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderSchema = new Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:String,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},

})



const UserModel = mongoose.model('Order',orderSchema);

module.exports = UserModel;