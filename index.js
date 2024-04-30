const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const port =process.env.PORT||8000;
// const authRoute = require('./routes/authRoute.js');
// const productRoute = require('./routes/productRoute.js');

const cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("db is connected"))
.catch(()=> console.log("error"))

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use('/api/auth',authRoute);

app.listen(port,()=>{
    console.log("server is running ");
}) 