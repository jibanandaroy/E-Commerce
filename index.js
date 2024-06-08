const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const port =process.env.PORT||8000;
const authRoute = require('./routes/authRoute.js');
const productRoute = require('./routes/productRoute.js'); 
const cartRoute = require('./routes/cartRoute.js'); 
const cors = require('cors');  

const cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("db is connected"))
.catch(()=> console.log("error")) 

app.use(
    cors({
        credentials:true,
        origin:'http://localhost:3000'
    })
)
  
//middleware  
app.use(express.json()); 
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use('/images',express.static('uploads'))

app.use('/api/auth',authRoute);  
app.use('/api/product',productRoute); 
app.use('cart',cartRoute)


app.listen(port,()=>{    
    console.log("server is running ");
})  