const express = require('express');
const cors = require('cors');
// const multer = require('multer');
const router = express.Router();
const {addReview,getReview} = require('../controllers/reviewController')


router.post('/addreview',addReview);
router.get('/getreview',getReview);
// router.get('/getproduct',getProduct);
   
module.exports = router; 