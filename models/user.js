const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    role:Number,
    isLogdin:{
        type: Boolean,
        default:false
    },
    isVerified: { 
        type: Boolean,
        default:false
    },
    cartId:{
        type:mongoose.Types.ObjectId,
        ref:"Cart"
    }
    
})



const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;