const express = require('express');
const cors = require('cors');
// const multer = require('multer');
const router = express.Router();
const {addProduct,getProduct,deleteProduct,productGet,newCollection,popularInWomen,updateProduct} = require('../controllers/productController')
const {upload} = require('../helper/product');

router.post('/addproduct',upload.single('image'),addProduct);
router.get('/getproduct',getProduct);
router.get('/product/1/:id',productGet);
router.delete('/product/:id',deleteProduct); 
router.put('/editproduct',updateProduct)   
router.get('/newcollection',newCollection);
router.get('/popularinwomen',popularInWomen);
   
module.exports = router;