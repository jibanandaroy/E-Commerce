const Product = require('../models/product')

const path = require('path')
const fs = require('fs');
const { json } = require('express');

const addProduct = async (req, res) => {
     const { name,description, userId, price, offerPrice, category } = req.body;

     try {
          if (!name) {
               return res.json({
                    error: "name is required"
               })
          }
          if (!description) {
               return res.json({
                    error: "description is required"
               })
          }
          
          if (!price) {
               return res.json({
                    error: "price is required"
               })
          }
          if (!offerPrice) {
               return res.json({
                    error: "price is required"
               })
          }
          if (!category) {
            return res.json({
                 error: "category is required"
            })
       }
          const obj = {
               name,
               description,
               userId,
               price:parseInt(price),
               offerPrice:parseInt(offerPrice),
               category, 
               image: req.file.filename
          }
          const product = await Product.create(obj);
          obj.image = `http://localhost:8000/images/${product.image}`
          obj.id=product._id
          res.json(obj);

     } catch (error) { 
          res.json({
               error: "product is not added"
          })
     }
}

const getProduct = async (req, res) => {
     const products = await Product.find();
     const newProducts = [];
     products.map((value, key) => {

          const obj = {
               'id': value._id,
               'name': value.name,
               'description':value.description,
               'userId': value.userId,
               'price': value.price,
               'offerPrice': value.offerPrice,
               'category': value.category,
               'image': `http://localhost:8000/images/${value.image}`

          }
          newProducts.push(obj)
     })
     res.json(newProducts);
}

const productGet = async (req, res) => {
     const { id } = req.params
     const products = await Product.find({ _id: id });
     res.json(products) 
}

const deleteProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const product = await Product.find({ _id: id });
          let reqPath = path.join(__dirname, '../', 'uploads/', product[0].image)
          fs.unlink(reqPath, (err) => {
               if (err) {
                    console.log(err);
                    return;
               }
               console.log("Deleted image successfully")
          });

          const dUser = await Product.deleteOne({ _id: id });
          res.json(dUser);

     } catch (error) {
          res.json({
               error: "Doctor is not Deleted",
          })
     }
}

const updateProduct = async (req, res) => {
     const { name, description, price, offerPrice,id } = req.body;
     try {
          const obj = {};
          if (name) {
               obj.name = name;
          }
          if (description) {
               obj.description = description;
          }
          if (price) {
               obj.price = price;
          }
          if (offerPrice) {
               obj.offerPrice = offerPrice;
          }
          const updateProduct = await Product.updateOne({ _id: id }, { $set: obj })
          res.json(updateProduct);

     } catch (error) {
          res.json({
               error: error
          })
     }
}


const newCollection = async (req,res) =>{
     let products = await Product.find({});
     let newcollection = products.slice(1).slice(-8);
     res.json(newcollection);
}
const popularInWomen = async (req,res) =>{
     let products = await Product.find({category:"women"});
     let popular_in_women = products.slice(0,4);
     res.json(popular_in_women);
}

module.exports = { addProduct, getProduct, deleteProduct, productGet,updateProduct,newCollection,popularInWomen}