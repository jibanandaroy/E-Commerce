const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    name:String,
    description:String,
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    price:Number,
    offerPrice:Number,
    category:String,
    image:String
})



const ProductModel = mongoose.model('Product',productSchema);


module.exports = ProductModel;
