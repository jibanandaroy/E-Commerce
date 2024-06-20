const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const port =process.env.PORT||8000;
const authRoute = require('./routes/authRoute.js');
const productRoute = require('./routes/productRoute.js'); 
const cartRoute = require('./routes/cartRoute.js'); 
const orderRoute = require('./routes/orderRoute.js')
const {mailVerification,forgotPassword,resetPassword,updatePassword,resetSuccess} = require('./controllers/authController.js')
const cors = require('cors');  
const{passwordResetValidator} = require('./helper/validation.js')

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("db is connected"))
.catch(()=> console.log("error")) 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
 
app.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
        })
        )
        
        // app.set('views','./views');
        
        //middleware  
app.set('view engine','ejs');
  
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use('/images',express.static('uploads'))
 
app.use('/api/auth',authRoute);  
app.use('/api/product',productRoute); 
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRoute)


//mail verification and forget password
app.get('/mail-verification',mailVerification)
app.post('/forgot-password',passwordResetValidator,forgotPassword)
app.get('/reset-password',resetPassword)
app.post('/reset-password',updatePassword)
app.get('/reset-success',resetSuccess)
 
app.listen(port,()=>{    
    console.log("server is running ");
})  