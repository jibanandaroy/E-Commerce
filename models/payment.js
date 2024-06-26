const mongoose = require('mongoose');
const {Schema} = mongoose;

const paymentSchema = new Schema({
    userId:{type:String,required:true},
    method:{type:String,required:true},
    date:{type:Date,default:Date.now()},
})

const PaymentModel = mongoose.model('Payment',paymentSchema);

module.exports = PaymentModel;