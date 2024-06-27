const mongoose = require('mongoose');
const {Schema} = mongoose;

const reviewSchema = new Schema({
    name:String,
    productId:String,
    review:String,
    date:{type:Date,default:Date.now()},
})

const ReviewModel = mongoose.model('Review',reviewSchema);
module.exports = ReviewModel;
